//let cookie=require("./cookie");
import {
    hashHistory
} from 'react-router';
/* @desc 自己封装的ajax，目前主要支持工作中常用的post，get请求。调用方式几乎等同于jquery的ajax封装，略有出入。
*
*  @param obj.ciUrl {string} // 请求的url
*  @param obj.method {string}//请求的方法
*  @param obj.data {obj} //需要发送的数据（json对象）
*  @param obj.async {boolean}//true:异步请求，false:同步请求
*  @return  void；
*
*  @author sam liu
*  @date 2016-07-06
* */

function ajax(obj) {
    const CONSIDER_IE=false;//因为这是移动端的项目，所以不考虑ie浏览器
    let testFlag=obj.ciUrl === "/user/v2/myBankCardInfo" || obj.ciUrl === "/user/v2/securityCenter";

     let initData={
         "imei":"23ffgffffffffffffffff",
         "opSource":"wx",
         "terminal":"wx",
         "version":"2.0"
     };



    //基于兼容考虑，创建一个XMLHttpRequest对象
    function createXHR() {
        if (window.XMLHttpRequest) {	//IE7+、Firefox、Opera、Chrome 和Safari
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {   //IE6 及以下
            var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
            for (var i = 0,len = versions.length; i<len; i++) {
                try {
                    return new ActiveXObject(version[i]);
                    break;
                } catch (e) {
                    //跳过
                }
            }
        } else {
            throw new Error('浏览器不支持XHR对象！');
        }
    }

    //名值对转换为字符串
    function params(data) {
        var arr = [];
        for (var i in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    }

    //获取该请求所在的component
    function getCurrComponent(){
        let hashStr=window.location.hash;
        let currComponent="";
        if(hashStr.indexOf("?") > -1){
            currComponent=hashStr.slice(2,hashStr.indexOf("?"));
        }else {
            currComponent=hashStr.slice(2);
        }
        return currComponent;
    }

    function callback() {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){  //判断http的交互是否成功
            let resultObj=JSON.parse(xhr.responseText);//将返回的json字符串解析返回
            if(resultObj.code === 14){//需要用户登录，而用户未登录或者登录超时
                let beforeComponent=obj.isJumpBack ? getCurrComponent() : "home";//默认的登录超时回跳地址是首页home
                hashHistory.push({
                    pathname:"/",
                    query:{
                        beforeComponent:beforeComponent
                    }
                })
            }else {
                obj.success(resultObj);
            }

        } else {
            obj.error && obj.error();
        }
    }

    var xhr = createXHR();	//创建XHR对象

    //通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题

    obj.url = obj.ciUrl + (obj.ciUrl.indexOf("?") > -1 ? "&t="+Math.random() : "?t="+Math.random()) ;
    //obj.url = "/ci" + obj.ciUrl + "?t="+Math.random() ;
    obj.method = obj.method || "post";//因为实际开发环境中的接口大部分都是post请求，所以默认是post方法。

    //开发环境中，默认要发送BASIC_DATA数据到服务器，如果调用时传入了数据参数，则先合并，然后转换为字符串
    if(obj.data){
        initData=JSON.stringify(Object.assign(initData,obj.data));
    }else {
        initData=JSON.stringify(initData);
    }
    obj.data=initData;


    if(!obj.async && obj.async !== false){
        obj.async = true; //默认使用异步请求
    }


    //若是GET请求，则将数据加到url后面
    if (obj.method === 'get') {
        obj.data = params(initData);
        obj.url += '&' + obj.data;
    }

    //true表示异步，false表示同步
    //使用异步调用的时候，需要触发readystatechange 事件
    if (obj.async === true) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {   //判断对象的状态是否交互完成
                callback();		 //回调
            }
        };

        //请求超时（超时设置为10秒）
        //如果浏览器xmlHttpRequest对象不支持timeout属性,则使用setTimeout来模仿原生timeout事件
        //note:设置timeout的代码不能暴露在全局，只能在确定是异步请求才能设置timeout，否则会报以下错误：
        // xmlhttprequest timeoutFailed to set the 'timeout' property on 'XMLHttpRequest': Timeouts cannot be set for synchronous requests made from a document
        /*if(xhr.timeout === undefined){
            setTimeout(function(){
                if(xhr.readState !== 4){
                    Message.broadcast("请求超时，请稍后再试");
                }
            },10000)
        }else {
            xhr.timeout=10000;
            xhr.ontimeout=function(){
                Message.broadcast("请求超时，请稍后再试");
            };
        }*/
    }

    //在使用XHR对象时，必须先调用open()方法，
    //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
    xhr.open(obj.method, obj.url, obj.async);


    //请求发生错误
    xhr.onerror=function(e){
        //Message.broadcast("网络异常，请检查您的网络");
    };

    if (obj.method === 'post') {
        //post方式需要自己设置http的请求头。
        //放在open方法之后，send方法之前。
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.setRequestHeader("wxauth","ntwx");
        xhr.setRequestHeader("x-requested-with","XMLHttpRequest");
        //xhr.setRequestHeader("Access-Control-Allow-Origin","*");

        //将token设置到请求头中
        /*if(cookie.getCookie("token")){
            xhr.setRequestHeader("Authorization",cookie.getCookie("token"));
        }else {
            
        }*/
        xhr.setRequestHeader("Authorization","");

        xhr.send(obj.data);		//post方式将数据放在send()方法里
    } else {
        xhr.send(null);		//get方式则填null
    }
    if (obj.async === false) {  //同步
        callback();
    }

}

module.exports=ajax;
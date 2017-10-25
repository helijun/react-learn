import {
    URL,
    Event,
    appDispatcher,
    LI
}  from '../../common.config';
import { hashHistory } from 'react-router'

const LoginStore = {
	_state: {
        timer: null, //定时器
        phoneNumber: '',
        codeVal: '',
        codeClass: 'li-btn-code',
        active: false,//获取验证码按钮不可以点击
        time: 59,
        loginBtnHL: true, //登录按钮高亮
        codeText: '获取验证码',
        tipsText: '请输入手机号码',
        tipsShow: false
	},
	getAll(){
        return this._state;
    },
    updateAll(source){
        Object.assign(this._state,source);
    },
    clearAll(){
        this._state = {};
    },
    timer() {
        this._state.timer = setInterval(()=> {
            if(typeof this._state.time != 'number'){
                this._state.time = 59;
            }
            this._state.time --;
            this._state.codeText = this._state.time + 's';
            
            if(this._state.time == 0){
                clearInterval(this._state.timer);
                this.updateAll({
                    active: true,
                    time: 59,
                    codeClass: 'li-btn-code-active',
                    codeText: '重新获取'
                })
            }
            this.trigger('change');
        }, 1000)
    }
};
Event.mixin(LoginStore);

appDispatcher.register(function(payload){
    let data = LoginStore.getAll();
	switch(payload.actionName){
        case 'login-get-code': 
            LoginStore.updateAll({
                active: false,
                codeClass: 'li-btn-code',
                codeText: data.time + 's'
            })
            LoginStore.timer()
            LoginStore.trigger('change');

            LI.ajax({
                data: {
                    mobile: LoginStore._state.phoneNumber,
                    type: 3
                },
                url : URL.H5 + "/wechat/sendMessage",
                success : function(json) {
                    var data = JSON.parse(json);
                    if (data.type == '600'){
                        LoginStore.updateAll({
                            tipsText: '发送验证码成功',
                            tipsShow: true
                        })
                    } else{
                        LoginStore.updateAll({
                            tipsText: '验证码发送失败',
                            tipsShow: true,
                            active: true,
                            time: 59,
                            codeClass: 'li-btn-code-active',
                            codeText: '重新获取'
                        })
                        clearInterval(LoginStore._state.timer);//清除定时器
                    }
                    LoginStore.trigger('change');
                }
            })
            break;
        
        case 'login-change-phone-input': 
            console.log('payload.data.phone',payload.data.phone)
            if(payload.data.phone.length == 11){
                LoginStore.updateAll({
                    active: true,
                    phoneNumber: payload.data.phone,
                    codeClass: 'li-btn-code-active'
                })
            }else{
                LoginStore.updateAll({
                    active: false,
                    phoneNumber: payload.data.phone,
                    codeClass: 'li-btn-code'
                })
            }
            LoginStore.trigger('change')
            break;
        
        case 'login-change-code-input': 
            console.log('payload.data.code',payload.data.code)
            LoginStore.updateAll({
                codeVal: payload.data.code
            })
            break;

        case 'login-do-login': 
            LI.ajax({
                data: {
                    mobile: LoginStore._state.phoneNumber,
                    random: LoginStore._state.codeVal
                },
                type : 'POST',
                url : URL.H5 + "/wechat/doLogin",
                beforeSend : function(){
                    LoginStore.updateAll({
                        tipsShow: true
                    })
                    LoginStore.trigger('change')
                },
                success: function(json){
                    var data = JSON.parse(json.data);
                    if (data.type == 600){
                        localStorage.setItem('dn_token', data.token);
                        hashHistory.push('/usercenter')
                    } else {
                        LoginStore.updateAll({
                            tipsShow: true,
                            tipsText: data.msg
                        })
                        LoginStore.trigger('change')
                    }
                }
            })
            
            break;
        
        case 'login-hide-tips': 
            console.log('tips')
            LoginStore.updateAll({
                tipsShow: false
            })
            LoginStore.trigger('change')
            break;
	}
})
export default LoginStore;
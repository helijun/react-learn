import {
    Event,
    appDispatcher,
    LI
}  from '../../common.config';

const LoginStore = {
	_state: {
        codeClass: 'li-btn-code',
        active: false,//获取验证码按钮不可以点击
        time: 59,
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
        let timer = setInterval(()=> {
            this._state.time --;
            this._state.codeText = this._state.time + 's';
            
            if(this._state.time == 0){
                clearInterval(timer);
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
		case 'toggle-code-class': 
            LoginStore.updateAll({
                active: false,
                codeClass: 'li-btn-code',
                codeText: data.time + 's'
            })
            LoginStore.timer()
            LoginStore.trigger('change')
            break;
        
        case 'change-phone-input': 
            if(payload.data.phoneLength == 11){
                LoginStore.updateAll({
                    active: true,
                    codeClass: 'li-btn-code-active'
                })
            }else{
                LoginStore.updateAll({
                    active: false,
                    codeClass: 'li-btn-code'
                })
            }
            LoginStore.trigger('change')
            break;
        
        case 'do-regist': 
            LoginStore.updateAll({
                tipsShow: true
            })
            LoginStore.trigger('change')
            break;
	}
})
export default LoginStore;
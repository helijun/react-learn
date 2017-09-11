import {
    appDispatcher
}  from '../../common.config';

const LoginAction = {
	getCode() {
		appDispatcher.dispatch({
            actionName: "login-get-code"
		})
	},
	hideTips() {
		appDispatcher.dispatch({
            actionName: "login-hide-tips"
		})
	},
	changePhoneInput(phone) {
		appDispatcher.dispatch({
			actionName: "login-change-phone-input",
			data: {
				phone: phone
			}
		})
	},
	changeCodeInput(code) {
		appDispatcher.dispatch({
			actionName: "login-change-code-input",
			data: {
				code: code
			}
		})
	},
	doLogin() {
		appDispatcher.dispatch({
			actionName: "login-do-login"
		})
	}
}

export default LoginAction;
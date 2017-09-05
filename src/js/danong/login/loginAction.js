import {
    appDispatcher
}  from '../../common.config';

const LoginAction = {
	toggleCodeClass() {
		appDispatcher.dispatch({
            actionName: "toggle-code-class"
		})
	},
	changePhoneInput(phoneLength) {
		appDispatcher.dispatch({
			actionName: "change-phone-input",
			data: {
				phoneLength: phoneLength
			}
		})
	},
	doRegist() {
		appDispatcher.dispatch({
			actionName: "do-regist"
		})
	}
}

export default LoginAction;
const appDispatcher = require("../dispatcher/dispatcher.js");

const IndexAction = {
	updatePhone() {
		appDispatcher.dispatch({
            actionName: "update_phone"
        })
	}
}

module.exports = IndexAction;
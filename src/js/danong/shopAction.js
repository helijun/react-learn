const appDispatcher = require("../dispatcher/dispatcher.js");

const IndexAction = {
	bannerList() {
		appDispatcher.dispatch({
            actionName: "banner-list"
        })
	}
}

module.exports = IndexAction;
import appDispatcher from '../dispatcher/dispatcher.js';

const ShopAction = {
	bannerList() {
		appDispatcher.dispatch({
            actionName: "banner-list"
        })
	},
	productList() {
		appDispatcher.dispatch({
			actionName: 'product-list'
		})
	}
}

export default ShopAction;
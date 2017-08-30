import appDispatcher from '../../dispatcher/dispatcher.js';

const ShopAction = {
	bannerList() {
		appDispatcher.dispatch({
            actionName: "banner-list-v2"
        })
	},
	productList() {
		appDispatcher.dispatch({
			actionName: 'product-list-v2'
		})
	}
}

export default ShopAction;
import {
    appDispatcher
}  from '../../common.config';

const ShopAction = {
	getBannerList() {
		appDispatcher.dispatch({
            actionName: "get-banner-list"
        })
	},
	getProductList() {
		appDispatcher.dispatch({
			actionName: 'get-product-list'
		})
	}
}

export default ShopAction;
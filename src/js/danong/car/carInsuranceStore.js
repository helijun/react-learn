import {
    URL,
    Event,
    appDispatcher,
    LI
}  from '../../common.config';

const ShopStore = {
	_state: {
        loadingShow: true,
        shopTitle: '特惠产品',
        bannerList: [],
        productList: [],
        WillMount: true,        
		phone: '188'
	},
	getAll(){
        return this._state;
    },
    updateAll(source){
        Object.assign(this._state,source);
    },
    clearAll(){
        this._state = {};
    }
};
Event.mixin(ShopStore);

appDispatcher.register(function(payload){
	switch(payload.actionName){
		case 'get-banner-list': 
            LI.ajax({
                url: URL.H5 + "/app/banner-list",
                success: function(data) {
                    if(typeof data == 'string'){
                        data = JSON.parse(data)
                    }
                    
                    ShopStore.updateAll({
                        bannerList: data.detail
                    });
                    ShopStore.trigger("change");
                } 
            })
            break;
        case 'get-product-list':
            LI.ajax({
                url: URL.H5 + "/insurance/get-insurance-list",
                success: function(data) {
                    if(typeof data == 'string'){
                        data = JSON.parse(data)
                    }
                    
                    ShopStore.updateAll({
                        loadingShow: false,
                        productList: data.detail
                    });
                    ShopStore.trigger("change");
                } 
            })
            break;    
            
	}
})
export default ShopStore;
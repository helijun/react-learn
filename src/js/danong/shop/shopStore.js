import {
    Event,
    appDispatcher,
    LI
}  from '../../config';

const ShopStore = {
	_state: {
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
		case 'banner-list': 
            LI.ajax({
                url: "/api/app/banner-list",
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
        case 'product-list':
            LI.ajax({
                url: "/api/insurance/get-insurance-list",
                success: function(data) {
                    if(typeof data == 'string'){
                        data = JSON.parse(data)
                    }
                    
                    ShopStore.updateAll({
                        productList: data.detail
                    });
                    ShopStore.trigger("change");
                } 
            })
            break;    
            
	}
})
export default ShopStore;
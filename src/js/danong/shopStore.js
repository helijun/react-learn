const Event = require('../../util/Event.js');
const appDispatcher = require('../dispatcher/dispatcher.js');

import LI from '../../plugin/li/li-1.0.0.js';

const IndexStore = {
	_state: {
        shopTitle: '产品列表',
        bannerList: [],
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
Event.mixin(IndexStore);

appDispatcher.register(function(payload){
	switch(payload.actionName){
		case 'banner-list': 
            LI.ajax({
                url: "/api/app/banner-list",
                success: function(data) {
                    if(typeof data == 'string'){
                        data = JSON.parse(data)
                    }
                    
                    IndexStore.updateAll({
                        bannerList: data.detail
                    });
                    IndexStore.trigger("change");
                } 
            })
			break;
	}
})
module.exports = IndexStore;
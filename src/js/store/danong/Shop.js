const Event = require('../../../util/Event.js');
const appDispatcher = require('../../dispatcher/dispatcher.js');

import LI from '../../../plugin/li/li-1.0.0.js';

const IndexStore = {
	_state: {
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
		case 'update_phone': 
            console.log('this',this);
            console.log('LI',LI);
            
            LI.ajax({
                url: "/api/app/banner-list",
                success: function(data) {
                    if(typeof data == 'string'){
                        data = JSON.parse(data)
                    }
                    console.log('success',data)
                } 
            })

			IndexStore.updateAll({
                phone: '17603001616'
            });
            IndexStore.trigger("change");
			break;
	}
})
module.exports = IndexStore;
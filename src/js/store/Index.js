const Event = require('../../util/Event.js');
const appDispatcher = require('../dispatcher/dispatcher.js');

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
			console.log('this',this)
			IndexStore.updateAll({
                phone: '17603001616'
            });
            IndexStore.trigger("change");
			break;
	}
})
module.exports = IndexStore;
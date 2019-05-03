Ext.namespace('AIR');

AIR.AirStorePool = /*Ext.extend(Object,*/ {
	
	poolStore: function(store, storeId) {
		if(!this.storePool)
			this.storePool = [];
		
		this.storePool[storeId] = store;
		var x;
	},
	
	getStore: function(storeId) {
		return this.storePool[storeId];
	}

};
//);
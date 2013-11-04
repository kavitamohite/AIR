Ext.namespace('AIR');

AIR.AirStoreManager = function() {
	return {
		setStores: function(storeMap) {
			this.storeMap = storeMap;
		},
	    
	    getStoreByName: function(name) {
	        return this.storeMap[name];
	    },
		
		addStore: function(name, store) {
			this.storeMap[name] = store;
		}
	};
}();
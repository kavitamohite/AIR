Ext.namespace('AIR');

AIR.AirStoreLoader = Ext.extend(Ext.util.Observable, {
	methodPrefix: 'create',
	
    constructor: function() {
    	AIR.AirStoreLoader.superclass.constructor.call(this);
        
        this.addEvents('storesLoaded');
    },
    
    init: function(storeIds, storeCounter) {
    	this.storeMap = {};
    	this.storeIds = storeIds;
    	
        this.storeCounter = storeCounter;// - 1;//storeIds.length - 1;
        this.loadCount = 0;
    	
    	for(var storeId in this.storeIds) {
        	var factoryMethod = this.getFactoryMethod(storeId);
        	this.storeMap[storeId] = AIR.AirStoreFactory[factoryMethod]();
    	}
                
        for(var key in this.storeMap)
           this.storeMap[key].on('load', this.onLoad, this);
    },
    
    //private
    getFactoryMethod: function(storeId) {
    	var factoryMethod = this.methodPrefix + storeId.replace(storeId.charAt(0), storeId.charAt(0).toUpperCase());
    	return factoryMethod;
    },
    
    load: function() {
        for(var key in this.storeMap) {
        	if(this.storeIds[key] && this.storeIds[key].params) {// != null
        		this.storeMap[key].load(this.storeIds[key].params);
        	} else {
        		this.storeMap[key].load();
        	}
        }
    },
    
    onLoad: function(store, records, options) {
    	this.fireEvent('storeLoaded', store, records, options);
//    	if(store.storeId === 'organisationalScopeListStore')
//    		Util.log('organisationalScopeListStore loaded');
//    	Util.log(store.storeId+' loaded');
        
        if(this.loadCount == this.storeCounter) {
            this.fireEvent('storesLoaded', this, this.storeMap);
        } else {
        	this.loadCount++;
        }
    },
    
    destroy: function() {
    	for(var key in this.storeMap) {
//    		delete this.storeMap[key];
    		this.storeMap[key].removeListener('load', this.onLoad, this);
    	}
    	
    	delete this.storeMap;
//    	delete this;
    }
});
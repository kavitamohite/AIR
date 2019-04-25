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
    	
        this.storeCounter = storeCounter;
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
    	var stores = ["currencyListStore", "licenseTypeListStore", "accountListStore", "itSetListStore", 
    	              "itSecSBIntegrityListStore", "itSecSBAvailabilityListStore", "itSecSBConfidentialityListStore", 
    	              "classInformationListStore", "slaListStore", "priorityLevelListStore",
    	              "severityLevelListStore", "businessEssentialListStore", "applicationCat2ListStore", "lifecycleStatusListStore",
    	              "operationalStatusListStore", "categoryBusinessListStore", "processListStore", "applicationCat1ListStore",
    	              "databaseDisplayNameListStore", "ciTypeListStore", "dedicatedListStore", "organisationalScopeListStore",
    	              "loadClassListStore", "serviceModelListStore", "gxpFlagListStore", "itSecGroupListStore", "itSecGroupSimpleListStore",
    	              "clusterTypesListStore", "clusterCodesListStore", "osGroupsListStore", "osTypesListStore",
    	              "osNamesListStore", "itsecMassnahmenGapClassListStore", "referencesListStore", "sisoogleSourceListStore",
    	              "languageStoreDE", "languageStoreEN", "languageHelpStore", "languageToolTipStoreDE", "languageToolTipStoreEN", "aclStore" ];
    	var notInStores = true;
    	for(var key in this.storeMap) {
    		notInStores = true;
    		Ext.each(stores, function(item) {
    			if (item==key) notInStores=false;});
    				if (notInStores) {
    					if (this.storeIds[key] && this.storeIds[key].params) {
    						this.storeMap[key].load(this.storeIds[key].params);
    					} else {
    						this.storeMap[key].load();
    					}
    				} 
    				this.loadCount++;
    				if(this.loadCount == this.storeCounter) {
			            this.fireEvent('storesLoaded', this, this.storeMap);
			        }
        	}
    },
    
    onLoad: function(store, records, options) {
    	this.fireEvent('storeLoaded', store, records, options);
        
        if(this.loadCount == this.storeCounter) {
            this.fireEvent('storesLoaded', this, this.storeMap);
        } else {
        	this.loadCount++;
        }
    },
    
    destroy: function() {
    	for(var key in this.storeMap) {
    		this.storeMap[key].removeListener('load', this.onLoad, this);
    	}
    	
    	delete this.storeMap;
    }
});
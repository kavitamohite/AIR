//var businessEssentialListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'severityLevel'},
//     {name: 'id', mapping: 'severityLevelId'}
//]);
//
//var businessEssentialListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, businessEssentialListRecordDef); 
//
//var businessEssentialListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aBusinessEssentialStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/BusinessEssentialWSPort',
//		loadMethod: 'getBusinessEssentialList',
//		timeout : 120000,
//		reader : businessEssentialListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : businessEssentialListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			businessEssentialListStore.baseParams.severityLevelId = selectedBusinessEssentialId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});


//var serviceContractListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'serviceContractName'},
//     {name: 'id', mapping: 'serviceContractId'}
//]);
//
//var serviceContractListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, serviceContractListRecordDef); 
//
//var serviceContractListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aServiceContractStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getServiceContractList',
//		timeout : 120000,
//		reader : serviceContractListReader
//	}),
//	baseParams : {
//		applicationId: -1,	
//		cwid : cwid,
//		token : '',
//		slaName : selectedSlaId
//	},
//	fields: [ 'id', 
//	          'text'	
//	          ],
//
//	reader: serviceContractListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload:  function(store, options) {
//			store.isLoaded = false;
//			serviceContractListStore.baseParams.slaName = selectedSlaId;
//			serviceContractListStore.baseParams.serviceContract = selectedServiceContractId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});



//var severityLevelListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'severityLevel'},
//     {name: 'id', mapping: 'severityLevelId'}
//]);
//
//var severityLevelListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, severityLevelListRecordDef); 
//
//var severityLevelListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aSeverityLevelStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getSeverityLevelList',
//		timeout : 120000,
//		reader : severityLevelListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : severityLevelListReader,
//	isLoaded : false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded=false;
//			severityLevelListStore.baseParams.severityLevelId = selectedSeverityLevelId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});




//var categoryBusinessListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'categoryBusinessId'},
//	{name: 'text', mapping: 'categoryBusinessName'}
//]);
//
//var categoryBusinessListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, categoryBusinessListRecordDef); 
//
//var categoryBusinessListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aCategoryBusinessStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getCategoryBusinessList',
//		timeout : 120000,
//		reader : categoryBusinessListReader
//	}),
//	fields: [ 	'id',
//				'text'	
//	          ],
//    // reader configs
//	reader : categoryBusinessListReader,
//	isLoaded : false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded=false;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});



/*
var gxpFlagListRecordDef = Ext.data.Record.create([
	{name: 'id', mapping: 'gxpFlagId'},
	{name: 'text', mapping: 'gxpFlagTxt'}
]);

var gxpFlagListReader = new Ext.data.XmlReader({
    record: 'return',
    idProperty: 'id'
}, gxpFlagListRecordDef); 

var gxpFlagListStore = new Ext.data.XmlStore({
    autoDestroy: true,
    storeId: 'gxpFlagStore',
    autoLoad: false,
    
	proxy: new Ext.ux.soap.SoapProxy({
		url: webcontext +'/ApplicationToolsWSPort',
		loadMethod: 'getGxpFlagList',
		timeout: 120000,
		reader: gxpFlagListReader
	}),
	
	fields: [ 'id',	'text' ],

	reader : gxpFlagListReader,
	isLoaded: false,
	
	listeners: {
		beforeload:  function(store, options) {
			store.isLoaded = false;
			gxpFlagListStore.baseParams.gxpFlagTxt = selectedGxpFlagTxt;
		},
		load: function (store, recs, options) {
			store.isLoaded = true;
		}
	}
});*/


/**
 * itsec group list store
 
var itSecGroupListRecordDef = Ext.data.Record.create([
	{name: 'id', mapping: 'itSecGroupId'},
	{name: 'text', mapping: 'itSecGroupName'}
]);

var itSecGroupListReader = new Ext.data.XmlReader({
    record: 'return',
    idProperty: 'id'
}, itSecGroupListRecordDef); 

var itSecGroupListStore = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'aItSecGroupStore',
    autoLoad : false,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/ApplicationToolsWSPort',
		loadMethod: 'getItSecGroupList',
		timeout : 120000,
		reader : itSecGroupListReader
	}),
	fields: [ 	'id',
				'text'	
	          ],
    // reader configs
	reader : itSecGroupListReader
	,
	isLoaded : false,
	listeners : {
		beforeload :  function(store, options) {
			store.isLoaded = false;
			itSecGroupListStore.baseParams.itSecGroupId = selectedItSecGroupId;
		},
		load: function (store, recs, options) {
			store.isLoaded = true;
		}
	}
});*/




//var itSetListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'id'},
//	{name: 'text', mapping: 'itSetName'}
//]);
//
//var itSetListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, itSetListRecordDef); 
//
//var itSetListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aItSetStore',
//    autoLoad: false,
//	proxy: new Ext.ux.soap.SoapProxy({
//		url: webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getItSetList',
//		timeout: 120000,
//		reader: itSetListReader
//	}),
//	fields: [ 'id',	'text' ],
//    // reader configs
//	reader : itSetListReader,
//	isLoaded: false,
//	listeners: {
//		beforeload:  function(store, options) {
//			store.isLoaded = false;
////			gxpFlagListStore.baseParams.gxpFlagTxt = selectedGxpFlagTxt;
//		},
//		load: function(store, records, options) {
////			Ext.getCmp('applicationUsingRegions').clearSelections(true);
////			Ext.each(selectedUsingRegions.split(","), function(item, index, all) {
////				Ext.getCmp('applicationUsingRegions').select(Ext.getCmp('applicationUsingRegions').store.getById(item), true, true);
////			});
//			
////			Ext.getCmp('licenseusingregions').doLayout();
//			
////			var licensePanel = Ext.getCmp('licensePanel');
////			licensePanel.doLayout();
//			store.isLoaded = true;
//		}
//	}
//});



//var priorityLevelListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'priorityLevel'},
//     {name: 'id', mapping: 'priorityLevelId'}
//]);
//
//var priorityLevelListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, priorityLevelListRecordDef); 
//
//var priorityLevelListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aPriorityLevelStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getPriorityLevelList',
//		timeout : 120000,
//		reader : priorityLevelListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : priorityLevelListReader
//	,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			priorityLevelListStore.baseParams.priorityLevelId = selectedPriorityLevelId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});



//var operationalStatusListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'operationalStatusEn'},
//     {name: 'id', mapping: 'operationalStatusId'}
//]);
//
//var operationalStatusListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, operationalStatusListRecordDef); 
//
//var operationalStatusListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aOperationalStatusStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getOperationalStatusList',
//		timeout : 120000,
//		reader : operationalStatusListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : operationalStatusListReader
//	,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			operationalStatusListStore.baseParams.operationalStatusId = selectedOperationalStatusId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});



//var processListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'processName'},
//     {name: 'id', mapping: 'processId'}
//]);
//
//var processListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, processListRecordDef); 
//
//var processListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aProcessStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getProcessList',
//		timeout : 120000,
//		reader : processListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : processListReader
//	,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			// processListStore.baseParams.processId = selectedProcessId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});




//var lifecycleStatusListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'lcStatus'},
//     {name: 'id', mapping: 'lcStatusId'}
//]);
//
//var lifecycleStatusListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, lifecycleStatusListRecordDef); 
//
//var lifecycleStatusListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aLifecycleStatusStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getLifecycleStatusList',
//		timeout : 120000,
//		reader : lifecycleStatusListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : lifecycleStatusListReader
//	,
//	isLoaded : false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			lifecycleStatusListStore.baseParams.lifecycleStatusId = selectedLifecycleStatusId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});



//var slaListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'slaName'},
//     {name: 'id', mapping: 'slaId'}
//]);
//
//var slaListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, slaListRecordDef); 
//
//var slaListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aSlaStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getSlaList',
//		timeout : 120000,
//		reader : slaListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : slaListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			slaListStore.baseParams.slaId = selectedSlaId;
//        },
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});




//var currencyListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'currencyName'},
//     {name: 'id', mapping: 'currencyId'}
//]);
//
//var currencyListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, currencyListRecordDef); 
//
//var currencyListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aCurrencyStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getCurrencyList',
//		timeout : 120000,
//		reader : currencyListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : currencyListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			currencyListStore.baseParams.currencyId = selectedCurrencyId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//			// TODO: Dirty trick - sobald das Laden der Useroptions zeitlich synchronisiert mit den Liststores ist, kann das hier abgebaut werden.
//			Ext.getCmp('useroptionCurrency').setValue(selectedCurrency);
//		}
//	}
//});




//var itSecSBWerteListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'sbTextEn'},
//     {name: 'id', mapping: 'itsecSBId'}
//]);
//
//var itSecSBWerteListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, itSecSBWerteListRecordDef); 

/* mehrfache Werte !!! */

//var itSecSBIntegrityListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aItSecSBIntegrityStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getItSecSBWerteList',
//		timeout : 120000,
//		reader : itSecSBWerteListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : itSecSBWerteListReader
//	,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			itSecSBIntegrityListStore.baseParams.itSecSBWerteId = selectedItSecSbIntegrityId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});

//var itSecSBAvailabilityListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aItSecSBAvailabilityStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getItSecSBWerteList',
//		timeout : 120000,
//		reader : itSecSBWerteListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : itSecSBWerteListReader
//	,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			itSecSBAvailabilityListStore.baseParams.itSecSBWerteId = selectedItSecSbAvailabilityId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});

//var itSecSBConfidentialityListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aItSecSBConfidentialityStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getItSecSBWerteList',
//		timeout : 120000,
//		reader : itSecSBWerteListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : itSecSBWerteListReader
//	,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded=false;
//			itSecSBConfidentialityListStore.baseParams.itSecSBWerteId = selectedItSecSbConfidentialityId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});




//var runAccountListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'accountName'},
//     {name: 'id', mapping: 'accountId'}
//]);
//
//var runAccountListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, runAccountListRecordDef); 
//
//var runAccountListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aRunAccountStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getAccountList',
//		timeout : 120000,
//		reader : runAccountListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : runAccountListReader
//	,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded=false;
//			runAccountListStore.baseParams.accountId = selectedRunAccountId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});



//var changeAccountListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'accountName'},
//     {name: 'id', mapping: 'accountId'}
//]);
//
//var changeAccountListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, changeAccountListRecordDef); 
//
//var changeAccountListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aChangeAccountStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getAccountList',
//		timeout : 120000,
//		reader : changeAccountListReader
//	}),
//	fields: [ 'id', 
//	          'text'	
//	          ],
//    // reader configs
//	reader : changeAccountListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			changeAccountListStore.baseParams.accountId = selectedChangeAccountId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});



//var licenseTypeListRecordDef = Ext.data.Record.create([
//     {name: 'text', mapping: 'licenseTypeName'},
//     {name: 'id', mapping: 'licenseTypeId'}
//]);
//
//var licenseTypeListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, licenseTypeListRecordDef); 
//
//var licenseTypeListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aLicenseTypeStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getLicenseTypeList',
//		timeout : 120000,
//		reader : licenseTypeListReader
//	}),
//	fields: [ 'id', 'text' ],
//    // reader configs
//	reader : licenseTypeListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			licenseTypeListStore.baseParams.licenseTypeId = selectedLicenseTypeId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});




/**
 * references list store
 
var referencesListRecordDef = Ext.data.Record.create([
	{name: 'id', mapping: 'id'},
	{name: 'text', mapping: 'name'}
]);

var referencesListReader = new Ext.data.XmlReader({
    record: 'return',
    idProperty: 'id'
}, referencesListRecordDef); 

var referencesListStore = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'aReferencesStore',
    autoLoad : false,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/ApplicationToolsWSPort',
		loadMethod: 'getReferenzList',
		timeout : 120000,
		reader : referencesListReader
	}),
	fields: [ 	'id',
				'text'	
	          ],
    // reader configs
	reader : referencesListReader,
	isLoaded: false,
	listeners : {
		beforeload :  function(store, options) {
			store.isLoaded = false;
		},
		load: function (store, recs, options) {
			store.isLoaded = true;
		}
	}
});*/




//var classInformationListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'classInformationId'},
//	{name: 'text', mapping: 'classInformationName'},
//	{name: 'classProtectionName', mapping: 'classProtectionName'}
//]);
//
//var classInformationListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, classInformationListRecordDef); 
//
//var classInformationListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aClassInformationStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getClassInformationList',
//		timeout : 120000,
//		reader : classInformationListReader
//	}),
//	fields: [ 	'id',
//				'text',
//				'classProtectionName'
//	          ],
//    // reader configs
//	reader : classInformationListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//		}
//	}
//});




//var dataClassListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'classDataId'},
//	{name: 'text', mapping: 'classDataName'}
//]);
//
//var dataClassListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, dataClassListRecordDef); 
//
//var dataClassListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aDataClassStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getClassDataList',
//		timeout : 120000,
//		reader : dataClassListReader
//	}),
//	baseParams : {
//		applicationId: -1,	
//		cwid : cwid,
//		token : '',
//		categoryBusinessId : selectedCategoryBusinessId
//	},
//	fields: [ 	'id',
//				'text'
//	          ],
//    // reader configs
//	reader : dataClassListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//			dataClassListStore.baseParams.categoryBusinessId = selectedCategoryBusinessId;
//		},
//		load: function (store, recs, options) {
//			store.isLoaded = true;
//			Ext.getCmp('cbDataClass').setValue(selectedDataClassId);
//		}
//	}
//});

// ---

//var databaseDisplayNameListRecordDef = Ext.data.Record.create([ {
//	name: 'id'
//}, {
//	name: 'text'
//}]);
//
//var databaseDisplayNameListReader = new Ext.data.XmlReader({
//	record: "return"
//	// record: 'viewdataDTO'
//}, databaseDisplayNameListRecordDef); 
//
//var databaseDisplayNameListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'aDatabaseDisplayNameStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getDatabaseDisplayName',
//		timeout : 120000,
//		reader : databaseDisplayNameListReader
//	}),
//	baseParams : {
//		applicationId: -1,	
//		cwid : cwid,
//		token : ''
//	},
//	fields: [ 	'id',
//				'text',
//				'return'
//	          ],
//    // reader configs
//	reader : databaseDisplayNameListReader,
//	isLoaded: false,
//	listeners : {
//		beforeload :  function(store, options) {
//			store.isLoaded = false;
//		},
//		load: function (store, records, options) {
//			store.isLoaded = true;
//			var databaseInfoText = records[0].data.text;
//			Ext.get('thisappdatabase').dom.innerHTML = '<br/><span style="font-size: 7pt;">' + databaseInfoText + '</span>';
//		}
//	}
//});

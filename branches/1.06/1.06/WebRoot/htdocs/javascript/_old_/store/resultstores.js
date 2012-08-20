/*var applicationListRecordDef = Ext.data.Record.create([
    {name: 'applicationId', mapping: 'applicationId'}, 
    {name: 'applicationName'}, 
    {name: 'applicationAlias'},
    {name: 'applicationCat1Txt'},
    {name: 'applicationCat2Txt'},
    {name: 'responsible'}, 
    {name: 'subResponsible'},
    {name: 'applicationOwner'},
    {name: 'applicationOwnerDelegate'},
    {name: 'tableId'}
]);

var applicationListReader = new Ext.data.XmlReader({
    totalProperty: "countResultSet",
    record: "applicationDTO",
    idProperty: 'applicationId'
}, applicationListRecordDef); 

var applicationListStore = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'ciStore',
    autoLoad: false,
    remoteSort: true,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/ApplicationWSPort',
		loadMethod: 'findApplications',
		timeout : 120000,
		reader : applicationListReader
	}),
    baseParams : {
		cwid: cwid,
		token: token,
		searchAction: searchAction,
		start: 0,	
		limit : 20
	},
	fields: ['applicationId', 
	         'applicationName', 
	         'applicationAlias',
	         'advancedsearch',
	         'responsible', 
	         'subResponsible',
   	         'applicationCat2Txt',
   	         'applicationCat1Txt',
   	         'applicationOwner',
   	         'applicationOwnerDelegate',
   	         'tableId'
	         ],
	getGroupState: Ext.emptyFn,
    // reader configs
	reader : applicationListReader
	,
	listeners : {
		beforeload :  function(store, options) {
			applicationListStore.baseParams.cwid = cwid;
			applicationListStore.baseParams.token= token;
			applicationListStore.baseParams.searchAction = searchAction;
			myLoadMask.show();
			if(!Ext.getCmp('searchfield').hasSearch) {
				Ext.getCmp('gridpanel').hide();
				//myLoadMask.hide();
			}
			searchpanel.doLayout();
		},
		load :  function(store, records, options) {
				// Wozu nötig? IMAHU und EVAFL -> nein
//				if(Ext.getCmp('searchfield').hasSearch) {
//					slideItIn('gridpanel');
//				} else {
//					slideItOut('gridpanel');
//				}
				
				// Results anzeigen
				slideItIn('gridpanel');	
				myLoadMask.hide();
				//actionButtonHandler(true);
				searchpanel.doLayout();
		}
	}
});*/


var objectAliasallowedRecordDef = Ext.data.Record.create([
     {name: 'countResultSet'}
]);

var objectAliasallowedReader = new Ext.data.XmlReader({
    record: "return"
}, objectAliasallowedRecordDef); 

var objectAliasallowedStore = new Ext.data.XmlStore({
    // store configs
    autoDestroy: false,
    storeId: 'aAliasAllowedStore',
    autoLoad : false,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/ApplicationWSPort',
		loadMethod: 'checkAllowedApplicationName',
		timeout : 120000,
		reader : objectAliasallowedReader
	}),
	baseParams: {query: ''},
	fields: ['countResultSet'],
    // reader configs
	reader : objectAliasallowedReader
});



var objectNameallowedRecordDef = Ext.data.Record.create([
     {name: 'countResultSet'}
]);

var objectNameallowedReader = new Ext.data.XmlReader({
    record: "return"
}, objectNameallowedRecordDef); 

var objectNameallowedStore = new Ext.data.XmlStore({
    // store configs
    autoDestroy: false,
    storeId: 'aNameAllowedStore',
    autoLoad : false,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/ApplicationWSPort',
		loadMethod: 'checkAllowedApplicationName',
		timeout : 120000,
		reader : objectNameallowedReader
	}),
	baseParams: {query: ''},
	fields: ['countResultSet'],
    // reader configs
	reader : objectNameallowedReader
});
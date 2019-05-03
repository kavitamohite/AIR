//var slaServiceContractListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'slaServiceContractId'},
//	{name: 'slaId', mapping: 'slaId'},
//	{name: 'serviceContractId', mapping: 'serviceContractId'}
//]);
//
//var slaServiceContractListReader = new Ext.data.XmlReader({
//    record: "return",
//    idProperty: 'id'
//}, slaServiceContractListRecordDef); 
//
//var slaServiceContractListStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: false,
//    storeId: 'aSlaServiceContractStore',
//    autoLoad : true,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'getSlaServiceContractList',
//		timeout : 120000,
//		reader : slaServiceContractListReader
//	}),
//	fields: [ 	'id',
//				'slaId',
//				'serviceContractId'	
//	          ],
//    // reader configs
//	reader : slaServiceContractListReader
//});
//
//
//
//var applicationDownstreamRecordDef = Ext.data.Record.create([
//    {name: 'id', mapping: 'id'}, 
//    {name: 'text', mapping: 'text'}
//]);
//
//var applicationDownstreamReader = new Ext.data.XmlReader({
//    record: "viewdataDTO",
//    idProperty: 'id'
//}, applicationDownstreamRecordDef); 
//
//var applicationDownstreamStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'applicationDownstreamStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationWSPort',
//		loadMethod: 'getApplicationDownstream',
//		timeout : 120000,
//		reader : applicationDownstreamReader
//	}),
//    baseParams : {
//		applicationId: -1,	
//		cwid : cwid,
//		token : ''
//	},
//	fields: ['id',
//	         'text'
//	         ],
//    // reader configs
//	reader : applicationDownstreamReader,
//	listeners : {
//		beforeload :  function(store, options) {
//			applicationDownstreamStore.baseParams.cwid = cwid;
//			applicationDownstreamStore.baseParams.token= token;
//			applicationDownstreamStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//			
//			// for next Schleife
//			
//			setConnectionsDownstreamInformation(records[0], 0);
//			setConnectionsDownstreamInformation(records[1], 1);
//			setConnectionsDownstreamInformation(records[2], 2);
//			setConnectionsDownstreamInformation(records[3], 3);
//			setConnectionsDownstreamInformation(records[4], 4);
//
//		}
//	}
//});
//
//var setConnectionsDownstreamInformation = function(myRecord, counter) {
//	
//	if (undefined !==myRecord) {
//		var contact = myRecord.data;
//		setFieldLabel(('connectionsdownstream' + counter), 'down');
//		Ext.getCmp(('connectionsdownstream' + counter)).setValue(contact['text']);
//		Ext.getCmp(('connectionsdownstream' + counter)).show();
//	}
//	else {
//		// 
//		// TODO connectionsdownstream - no data for this row - hide it?
//		//
//		Ext.getCmp(('connectionsdownstream' + counter)).hide();
//	}
//};
//
//
//var applicationProcessRecordDef = Ext.data.Record.create([
//    {name: 'id', mapping: 'id'}, 
//    {name: 'text', mapping: 'text'}
//]);
//
//var applicationProcessReader = new Ext.data.XmlReader({
//    record: "viewdataDTO",
//    idProperty: 'id'
//}, applicationProcessRecordDef); 
//
//var applicationProcessStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'applicationProcessStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationWSPort',
//		loadMethod: 'getApplicationProcess',
//		timeout : 120000,
//		reader : applicationProcessReader
//	}),
//    baseParams : {
//		applicationId: -1,	
//		cwid : cwid,
//		token : ''
//	},
//	fields: ['id',
//	         'text'
//	         ],
//    // reader configs
//	reader : applicationProcessReader
//	,
//	listeners : {
//		beforeload :  function(store, options) {
//			applicationProcessStore.baseParams.cwid = cwid;
//			applicationProcessStore.baseParams.token= token;
//			applicationProcessStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//			
//			// for next Schleife
//			
//			setConnectionsProcessInformation(records[0], 0);
//			setConnectionsProcessInformation(records[1], 1);
//			setConnectionsProcessInformation(records[2], 2);
//			setConnectionsProcessInformation(records[3], 3);
//			setConnectionsProcessInformation(records[4], 4);
//
//		}
//	}
//});
//
//var setConnectionsProcessInformation = function(myRecord, counter) {
//	
//	if (undefined !==myRecord) {
//		var contact = myRecord.data;
//		setFieldLabel(('connectionsprocess' + counter), 'process');
//		Ext.getCmp(('connectionsprocess' + counter)).setValue(contact['text']);
//		Ext.getCmp(('connectionsprocess' + counter)).show();
//	}
//	else {
//		// 
//		// TODO connectionsprocessstream - no data for this row - hide it?
//		//
//		Ext.getCmp(('connectionsprocess' + counter)).hide();
//	}
//};
//
//
//
//var applicationItSystemsRecordDef = Ext.data.Record.create([
//    {name: 'id', mapping: 'id'}, 
//    {name: 'text', mapping: 'text'}
//]);
//
//var applicationItSystemsReader = new Ext.data.XmlReader({
//    record: "viewdataDTO",
//    idProperty: 'id'
//}, applicationItSystemsRecordDef); 
//
//var applicationItSystemsStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'applicationItSystemsStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationWSPort',
//		loadMethod: 'getApplicationItSystems',
//		timeout : 120000,
//		reader : applicationItSystemsReader
//	}),
//    baseParams : {
//		applicationId: -1,	
//		cwid : cwid,
//		token : ''
//	},
//	fields: ['id',
//	         'text'
//	         ],
//    // reader configs
//	reader : applicationItSystemsReader,
//	listeners : {
//		beforeload :  function(store, options) {
//			applicationItSystemsStore.baseParams.cwid = cwid;
//			applicationItSystemsStore.baseParams.token= token;
//			applicationItSystemsStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//			
//			// for next Schleife
//			
//			setConnectionsItSystemsInformation(records[0], 0);
//			setConnectionsItSystemsInformation(records[1], 1);
//			setConnectionsItSystemsInformation(records[2], 2);
//			setConnectionsItSystemsInformation(records[3], 3);
//			setConnectionsItSystemsInformation(records[4], 4);
//		}
//	}
//});
//
//var setConnectionsItSystemsInformation = function(myRecord, counter) {
//	
//	if (undefined !==myRecord) {
//		var contact = myRecord.data;
//		setFieldLabel(('connectionsitsystems' + counter), 'its');
//		Ext.getCmp(('connectionsitsystems' + counter)).setValue(contact['text']);
//		Ext.getCmp(('connectionsitsystems' + counter)).show();
//	}
//	else {
//		// 
//		// TODO connectionsupstream - no data for this row - hide it?
//		//
//		Ext.getCmp(('connectionsitsystems' + counter)).hide();
//	}
//};
//
//
//
//
//var applicationUpstreamRecordDef = Ext.data.Record.create([
//    {name: 'id', mapping: 'id'}, 
//    {name: 'text', mapping: 'text'}
//]);
//
//var applicationUpstreamReader = new Ext.data.XmlReader({
//    record: "viewdataDTO",
//    idProperty: 'id'
//}, applicationUpstreamRecordDef); 
//
//var applicationUpstreamStore = new Ext.data.XmlStore({
//    // store configs
//    autoDestroy: true,
//    storeId: 'applicationUpstreamStore',
//    autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext +'/ApplicationWSPort',
//		loadMethod: 'getApplicationUpstream',
//		timeout : 120000,
//		reader : applicationUpstreamReader
//	}),
//    baseParams : {
//		applicationId: -1,	
//		cwid : cwid,
//		token : ''
//	},
//	fields: ['id',
//	         'text'
//	         ],
//    // reader configs
//	reader : applicationUpstreamReader,
//	listeners : {
//		beforeload :  function(store, options) {
//			applicationUpstreamStore.baseParams.cwid = cwid;
//			applicationUpstreamStore.baseParams.token= token;
//			applicationUpstreamStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//			
//			// for next Schleife
//			
//			setConnectionsUpstreamInformation(records[0], 0);
//			setConnectionsUpstreamInformation(records[1], 1);
//			setConnectionsUpstreamInformation(records[2], 2);
//			setConnectionsUpstreamInformation(records[3], 3);
//			setConnectionsUpstreamInformation(records[4], 4);
//		}
//	}
//});
//
//var setConnectionsUpstreamInformation = function(myRecord, counter) {
//	
//	if (undefined !==myRecord) {
//		var contact = myRecord.data;
//		setFieldLabel(('connectionsupstream' + counter), 'up');
//		Ext.getCmp(('connectionsupstream' + counter)).setValue(contact['text']);
//		Ext.getCmp(('connectionsupstream' + counter)).show();
//	}
//	else {
//		// 
//		// TODO connectionsupstream - no data for this row - hide it?
//		//
//		Ext.getCmp(('connectionsupstream' + counter)).hide();
//	}
//};
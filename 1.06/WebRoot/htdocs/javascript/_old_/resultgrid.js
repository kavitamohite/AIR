//var CI_TYPE_APPLICATION = 2;
//
//var colModel = new Ext.grid.ColumnModel([
////	{ header: "ID", dataIndex: 'applicationId', width: 65, sortable: true},
//	{ header: "Name", id: 'searchResultName', dataIndex: 'applicationName', width: 200, sortable: true},
//	{ header: "Alias", id: 'searchResultAlias', dataIndex: 'applicationAlias', width: 200, sortable: true},
//	{ header: "Type", id: 'searchResultType', dataIndex: 'applicationCat1Txt', width: 200, sortable: true},
//	{ header: "Category", id: 'searchResultCategory', dataIndex: 'applicationCat2Txt', width: 200, sortable: true},
//	{ header: "Responsible", id: 'searchResultResponsible', dataIndex: 'responsible', width: 200, sortable: true},
//	{ header: "Sub responsible", id: 'searchResultSubResponsible', dataIndex: 'subResponsible', width: 200, sortable: true},
//	{ header: "App owner", id: 'searchResultAppOwner', dataIndex: 'applicationOwner', width: 200, sortable: true},
//	{ header: "App owner delegate", id: 'searchResultAppOwnerDelegate', dataIndex: 'applicationOwnerDelegate', width: 200, sortable: true}
//]);
//
//var selModel = new Ext.grid.RowSelectionModel({
//	singleSelect : true
//});
//
//var grid = new Ext.grid.GridPanel({
//	id : 'grid',
//	frame : false,
//	border : false,
//	store : applicationListStore,
//	enableColumnHide: false,
//	colModel : colModel,
//	selModel : selModel,
//	loadMask : false,
//	autoScroll: true,
//	width : Ext.getBody().getViewSize().width - 240,
//	stripeRows : true,
//	stateful : true,
//	stateID : 'gridpanel',
//	layout: 'fit',
//	viewConfig : {
//		//autoFill : true,
//		emptyText : 'Nothing found'
//	},
//    bbar : pagingBar,
//	listeners : {
//		rowclick : function (grid, rowIndex, e) {
////			selectedCIId = grid.store.getAt(rowIndex).id;
////			actionButtonHandler(false, false);
//			
//			if('Application' == grid.store.getAt(rowIndex).data.applicationCat1Txt) {
//				selectedCIId = grid.store.getAt(rowIndex).id;
//				actionButtonHandler(false, false);
//			} else {
//				actionButtonHandler(true, false);
//				var ciTypeWarningWindow = createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
//				ciTypeWarningWindow.show();
//			}
//		},
//		rowdblclick : function (grid, rowIndex,e ) {
//			//selectedCIId = grid.store.getAt(rowIndex).id;
//			actionButtonHandler(false, true);
//		}
//	} 
//});
//
//var grideins = new Ext.grid.GridPanel({
//	id : 'grideins',
//	frame : false,
//	border : true,
//	store : applicationListStore,
//	enableColumnHide: false,
//	colModel : colModel,
//	selModel : selModel,
//	loadMask : false,
//	autoScroll: true,
//	width : Ext.getBody().getViewSize().width - 240,
//	stripeRows : true,
//	stateful : true,
//	stateID : 'gridpanel1',
//	layout: 'fit',
//	viewConfig : {
//		//autoFill : true,
//		emptyText : 'Nothing found'
//	},
//    bbar : pagingBarEins   ,
//	listeners : {
//		rowclick : function (grid, rowIndex, e) {
////			selectedCIId = grid.store.getAt(rowIndex).id;
////			actionButtonHandler(false, false);
//			
//			if('Application' == grid.store.getAt(rowIndex).data.applicationCat1Txt) {
//				selectedCIId = grid.store.getAt(rowIndex).id;
//				actionButtonHandler(false, false);
//			} else {
//				actionButtonHandler(true, false);
//				var ciTypeWarningWindow = createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
//				ciTypeWarningWindow.show();
//			}
//		},
//		rowdblclick : function (grid, idx,e ) {
//			selectedCIId = grid.store.getAt(idx).id;
//			actionButtonHandler(false, true);
//		}
//	} 
//});
//
//var gridzwei = new Ext.grid.GridPanel({
//	id : 'gridzwei',
//	frame : false,
//	border : true,
//	store : applicationListStore,
//	enableColumnHide: false,
//	colModel : colModel,
//	selModel : selModel,
//	loadMask : false,
//	autoScroll: true,
//	width : Ext.getBody().getViewSize().width - 240,
//	stripeRows : true,
//	stateful : true,
//	stateID : 'gridpanel2',
//	layout: 'fit',
//	viewConfig : {
//		//autoFill : true,
//		emptyText : 'Nothing found'
//	},
//    bbar : pagingBarZwei,
//	listeners : {
//		rowclick : function (grid, rowIndex, e) {
////			selectedCIId = grid.store.getAt(rowIndex).id;
////			actionButtonHandler(false, false);
//			
//			//if('Application' == grid.store.getAt(rowIndex).data.applicationCat1Txt) {
//			var record = grid.store.getAt(rowIndex);
//			
//			if(record.data.tableId == CI_TYPE_APPLICATION) {
//				selectedCIId = grid.store.getAt(rowIndex).id;
//				actionButtonHandler(false, false);
//			} else {
//				actionButtonHandler(true, false);
//				var ciTypeWarningWindow = createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
//				ciTypeWarningWindow.show();
//			}
//		},
//		rowdblclick : function (grid, idx,e ) {
//			selectedCIId = grid.store.getAt(idx).id;
//			actionButtonHandler(false, true);
//		}
//	} 
//});
//
//var gridadvsearchresult = new Ext.grid.GridPanel({
//	id : 'gridadvsearchresult',
//	frame : false,
//	border : true,
//	store : applicationListStore,
//	enableColumnHide: false,
//	colModel : colModel,
//	selModel : selModel,
//	loadMask : true,
//	autoScroll: true,
//	width : Ext.getBody().getViewSize().width - 240,
//	stripeRows : true,
//	stateful : true,
//	stateID : 'gridpaneladv',
//	layout: 'fit',
//	viewConfig : {
//		//autoFill : true,
//		emptyText : 'Nothing found'
//	},
//    bbar : pagingBarZwei,
//	listeners : {
//		rowclick : function (grid, rowIndex, e) {
////			selectedCIId = grid.store.getAt(rowIndex).id;
////			actionButtonHandler(false, false);
//			
//			if('Application' == grid.store.getAt(rowIndex).data.applicationCat1Txt) {
//				selectedCIId = grid.store.getAt(rowIndex).id;
//				actionButtonHandler(false, false);
//			} else {
//				var ciTypeWarningWindow = createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
//				ciTypeWarningWindow.show();
//			}
//		},
//		rowdblclick : function (grid, idx,e ) {
//			selectedCIId = grid.store.getAt(idx).id;
//			actionButtonHandler(false, true);
//		}
//	} 
//});
//
//var gridpanel = new Ext.Panel({
//    title: 'Results',
//	id : 'gridpanel',
//	//region: 'center',
//	x: 50,
//	y: 100,
//	monitorResize: true,
//    split: false,
//    height: 500,
//    margins: '0 0 0 0',
//    border: true,
//    hidden: true,
//    bodyStyle : {
//    	backgroundColor: panelbgcolor,
//    	color: fontColor,
//    	fontFamily: fontType},
//    layout: 'fit',
//    //align:'stretch',
//    //renderTo: 'searchgrid',
//    items: [ grid ]
//});
//
//var gridpaneleins = new Ext.Panel({
//    title: 'Results',
//	id : 'gridpaneleins',
//	//region: 'center',
//	x: 50,
//	y: 100,
//	monitorResize: true,
//    split: false,
//    height: 500,
//    margins: '0 0 0 0',
//    border: true,
//    hidden: false,
//    bodyStyle : {
//    	backgroundColor: panelbgcolor,
//    	color: fontColor,
//    	fontFamily: fontType},
//    layout: 'fit',
//    //align:'stretch',
//    //renderTo: 'searchgrid',
//    items: [ grideins ]
//});
//
//var gridpanelzwei = new Ext.Panel({
//    title: 'Results',
//	id : 'gridpanelzwei',
//	//region: 'center',
//	x: 50,
//	y: 100,
//	monitorResize: true,
//    split: false,
//    height: 500,
//    margins: '0 0 0 0',
//    border: true,
//    hidden: false,
//    bodyStyle : {
//    	backgroundColor: panelbgcolor,
//    	color: fontColor,
//    	fontFamily: fontType},
//    layout: 'fit',
//    //align:'stretch',
//    //renderTo: 'searchgrid',
//    items: [ gridzwei ]
//});
//
//
//
//var gridpaneladvsearchresult = new Ext.Panel({
//    title: 'Results',
//	id : 'gridpaneladvsearchresult',
//	//region: 'center',
//	x: 50,
//	y: 100,
//	monitorResize: true,
//    split: false,
//    height: 500,
//    margins: '0 0 0 0',
//    border: false,
//    hidden: false,
//    bodyStyle : {
//    	backgroundColor: panelbgcolor,
//    	color: fontColor,
//    	fontFamily: fontType},
//    layout: 'fit',
//    //align:'stretch',
//    //renderTo: 'searchgrid',
//    items: [ gridadvsearchresult ]
//});

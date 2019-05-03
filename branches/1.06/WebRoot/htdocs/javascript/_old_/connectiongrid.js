/**
 * CI connections list store
 */
/*var ciConnectionRecordDef = Ext.data.Record.create([
    {name: 'id'},
    {name: 'type'}, 
    {name: 'name'}, 
    {name: 'alias'},
    {name: 'responsible'},
    {name: 'subResponsible'},
    {name: 'category'}, 
    {name: 'tableId'},
    {name: 'ciId'},
    {name: 'direction'},
    {name: 'groupsort'},
    {name: 'status'}
]);

var ciConnectionListReader = new Ext.data.XmlReader({
    totalProperty: "countResultSet",
    record: "viewdataDTO",
    idProperty: 'id'
}, ciConnectionRecordDef); 

var ciConnectionListStore = new Ext.data.GroupingStore({
    // store configs
    autoDestroy: true,
    storeId: 'ciConnectionStore',
    autoLoad: false,
    remoteSort: true,
    pruneModifiedRecords: true,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/ApplicationWSPort',
		loadMethod: 'getAllConnections',
		timeout : 120000,
		reader : ciConnectionListReader
	}),
    baseParams : {
		cwid: cwid,
		token: token,
		id: -1,
		start: 0,	
		limit : 20
	},
	fields: ['id',
	         'type',
	         'name',
	         'alias',
	         'responsible',
	         'subResponsible',
	         'category',
	         'tableId',
	         'ciId',
	         'direction',
	         'groupsort',
	         'status'
	         ],
	groupField: 'groupsort',

    // reader configs
	reader : ciConnectionListReader
	,
	listeners : {
		beforeload :  function(store, options) {
			ciConnectionListStore.baseParams.cwid = cwid;
			ciConnectionListStore.baseParams.token= token;
			ciConnectionListStore.baseParams.applicationId = selectedCIId;
		}
	}
});


var cgColModel = new Ext.grid.ColumnModel([
	{
		xtype : 'actioncolumn',
		width : 35,
		resizable : false,
		fixed : true,
		hidden : true,
		menuDisabled: true,
		header: '&#160;', 
		items : [ {
			icon   : img_RemoveSelectedConnection,
	        tooltip: 'Remove connection',
			handler : function(grid, rowIndex, colIndex) {
				if (grid.store.getAt(rowIndex).get('type')==='Process') {
					titletext = 'Remove connection?';
					msgtext = 'Do you really want to remove the connection to the ' + grid.store.getAt(rowIndex).get('type') +
						' "' + grid.store.getAt(rowIndex).get('name') + '"?';
					Ext.Msg.show({
					   title: titletext,
					   msg: msgtext,
					   buttons: Ext.Msg.YESNO,
					   fn: function(btn, text) {
						   if (btn==='yes') {
							   grid.store.getAt(rowIndex).set('status', 'D');
							   activateButtonSaveApplication();
						   }
					   },
					   icon: Ext.MessageBox.QUESTION
					});
				} else {
					Ext.Msg.alert('Remove connection not allowed', 'You may not delete this connection.');
				}
			}
		}] 
	},
	{ header: "ID", dataIndex: 'id',  sortable: false, menuDisabled: true, hidden: true},
	{ header: "Type", dataIndex: 'type',  sortable: false, menuDisabled: true, hidden: true},
	{ header: "Name", dataIndex: 'name',  width: 200, sortable: false, menuDisabled: true, hidden: false},
	{ header: "Alias", dataIndex: 'alias',  width: 200, sortable: false, menuDisabled: true, hidden: false},
	{ header: "Primary Person", dataIndex: 'responsible',   sortable: false, menuDisabled: true, hidden: true},
	{ header: "Delegate", dataIndex: 'subResponsible',  sortable: false, menuDisabled: true, hidden: true},
	{ header: "Category", dataIndex: 'category', sortable: false, menuDisabled: true, hidden: true},
	{ header: "TableID", dataIndex: 'tableId',  sortable: false, menuDisabled: true, hidden: true},
	{ header: "CIId", dataIndex: 'ciId',  sortable: false, menuDisabled: true, hidden: true},
	{ header: "Direction", dataIndex: 'direction',  sortable: false, menuDisabled: true, hidden: true},
	{ header: "GroupSort", dataIndex: 'groupsort',  sortable: false, menuDisabled: true, hidden: true},
	{ header: "Status", dataIndex: 'status',  sortable: false, menuDisabled: true, hidden: true}
]);

var cgSelModel = new Ext.grid.RowSelectionModel({
	singleSelect : false
});

function markRecords(view, store) {
	Ext.each(store.getRange(), function (item, index, allItems) {
		switch (item.get('status')) {
		case 'N':
			view.getRow(index).classList.add('connectioninserted');
			break;
		case 'D':
			view.getRow(index).classList.add('connectiondeleted');
			break;
		}
	});
//	store.filter([
//	     {
//	    	 fn: function(record) {
//	    		 return record.get('status') !=='D';
//	    	 }
//	     }
//	]);
}

var connectionGrid = new Ext.grid.GridPanel({
	id : 'connections',
	frame : true,
	border : true,
	store : ciConnectionListStore,
	enableColumnHide: false,
	colModel : cgColModel,
	selModel : cgSelModel,
	loadMask : false,
	autoScroll: true,
	width : 600,
	height: 400,
	stripeRows : true,
	stateful : true,
	stateID : 'cggridpanel',
	layout: 'fit',
	view: new Ext.grid.GroupingView({
        //forceFit:true,
		showGroupName: false,
        groupTextTpl: '{[values.text.charAt(0)=="H"?"Upstream ":"Downstream "]} connections to: {[values.text.slice(3)]}',
        listeners: {
        	rowsinserted: function(view, first, last) {
        		markRecords(this, connectionGrid.store);
        	},
        	rowupdated: function(view, first, record) {
        		markRecords(this, connectionGrid.store);
        	}
        }
        	
    }),

	viewConfig : {
		emptyText : 'Nothing found'
	},
    bbar : pagingBar,
    tbar: [
       '->',
       { xtype: 'button',
    	 enableToggle: true,
      	 id: 'connectionsRemoveButton',
      	 text: 'Remove connections...',
      	 hidden: true,
      	 listeners: {
      		 toggle: function(but, pressed) {
      			connectionGrid.getColumnModel().setHidden(0, !pressed);
      		 }
      	 }
       },
       { xtype: 'button',
    	 id: 'connectionsAddButton',
    	 text: 'Add new connection...',
    	 hidden: true,
    	 handler: function(but, evt) {
    		 createRecordPickerTip(evt, 'connections');
    	 }
       }
           ]
});*/

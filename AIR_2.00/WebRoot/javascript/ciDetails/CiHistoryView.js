Ext.namespace('AIR');

AIR.CiHistoryView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
		    title: 'History',
		    border: false,
		    
		    items: [{
		    	xtype: 'grid',
		        id: 'historyListView',
		        layout: 'fit',
		        height: 600,
		    	store: AIR.AirStoreFactory.createHistoryListStore(),
		        emptyText: 'No data',
		        border: false,
		        autoScroll: true,
		        
		        columns: [{
		            header: 'datetime',
		            dataIndex: 'datetime',
		            id: 'historyDatetime',
					menuDisabled: true,
					width: 150
		        },{
		            header: 'changeSource',
		            dataIndex: 'changeSource',
		            id: 'historyChangeSource',
					menuDisabled: true,
					width: 150
		        },{
		            header: 'changeDBUser',
		            dataIndex: 'changeDBUser',
		           	id: 'historyChangeDBUser',
					menuDisabled: true,
					width: 150
		        },{
		            header: 'changeUserCWID',
		            dataIndex: 'changeUserCWID',
		            id: 'historyChangeUserCWID',
					menuDisabled: true,
					width: 150
		    	},{
		            header: 'attribute name',
		            dataIndex: 'changeAttributeName',
		            id: 'historyChangeAttributeName',
					menuDisabled: true,
					width: 150
		        },{
		            header: 'CI id',
		            dataIndex: 'ciId',
		            id: 'ciId',
					menuDisabled: true,
					width: 150
		    	},{
		    		header: 'old value',
		            dataIndex: 'changeAttributeOldValue',
		            id: 'historyChangeAttributeOldValue',
					menuDisabled: true,
					width: 150
		    	},{
		            header: 'new value',
		            dataIndex: 'changeAttributeNewValue',
		            id: 'historyChangeAttributeNewValue',
					menuDisabled: true,
					width: 150
		        },{
		        	header: 'Info Type',
		        	dataIndex: 'infoType',
		        	id: 'infoType',
					hidden: true,
					menuDisabled: true
		        }],
				
				view: new Ext.grid.GroupingView({})
		    }]
		});
		
		AIR.CiHistoryView.superclass.initComponent.call(this);
		
	},
	
	update: function() {
		var loadMask = Util.createMask('Loading', Ext.get('historyListView'));
		loadMask.show();
	//	AIR.CiHistoryView.superclass.initComponent.call(this);
	//	var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();
		var historyListStore = this.getComponent('historyListView').getStore();
		//var historyListStore = AIR.AirStoreManager.getStoreByName('historyListView');
		
	//var historyListStore =AAM.AirStoreFactory.createHistoryListStore();
		 

		var params = {
			cwid: AAM.getCwid(),
			token: AAM.getToken(),
			id: AAM.getCiId(),
			tableId: AAM.getTableId()
		};
		
		historyListStore.addListener('load', function() {loadMask.hide();});
		
		
		historyListStore.load({
			params: params
		});
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.historyPanelTitle);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(0,labels.historyDatetime);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(1,labels.historyChangeSource);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(2,labels.historyChangeDBUser);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(3,labels.historyChangeUserCWID);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(4,labels.historyChangeAttributeName);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(5,labels.historyChangeAttributeNewValue);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(6,labels.historyChangeAttributeOldValue);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(7,labels.infoType);
		Ext.getCmp("historyListView").getColumnModel().setColumnHeader(8,labels.ciId);
	}
});
Ext.reg('AIR.CiHistoryView', AIR.CiHistoryView);
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
		        
		        height: 400,
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
		var historyListStore = this.getComponent('historyListView').getStore();

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
		
		this.getComponent('historyListView').getColumnModel().setColumnHeader(0, labels.historyDatetime);
		this.getComponent('historyListView').getColumnModel().setColumnHeader(1, labels.historyChangeSource);
		this.getComponent('historyListView').getColumnModel().setColumnHeader(2, labels.historyChangeUserCWID);
		this.getComponent('historyListView').getColumnModel().setColumnHeader(3, labels.historyChangeDBUser);
		this.getComponent('historyListView').getColumnModel().setColumnHeader(4, labels.historyChangeAttributeName);
		this.getComponent('historyListView').getColumnModel().setColumnHeader(5, labels.ciId);
		this.getComponent('historyListView').getColumnModel().setColumnHeader(6, labels.historyChangeAttributeOldValue);//5
		this.getComponent('historyListView').getColumnModel().setColumnHeader(7, labels.historyChangeAttributeNewValue);//6
	}
});
Ext.reg('AIR.CiHistoryView', AIR.CiHistoryView);
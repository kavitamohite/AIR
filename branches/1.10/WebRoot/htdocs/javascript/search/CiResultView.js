Ext.namespace('AIR');

AIR.CiResultView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			hidden: true,

	        items: [{
	        	xtype: 'button',
	        	id: 'bUpdateCiSearchResult',
	        	
	        	cls: 'x-btn-text-icon',
	        	icon: 'images/refresh_16x16.png',
	        	
	        	text: 'Update'
	        },{
	        	xtype: 'tabpanel',
	        	id: 'tpCiSearchResultTables',

				enableTabScroll: true,
				resizeTabs: true,
				
	            plain: true,
	            defaults: { autoScroll: true },
//	            hidden: true
	        	
	        	style: {
	            	marginTop: 5
	            }
	        }]
		});
		
		AIR.CiResultView.superclass.initComponent.call(this);
		this.ciResultGridParamSets = {};
		
//		this.addEvents('tabclose');
	},
	
	search: function(params, isUpdate) {
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		
		var ciResultGrid;
		var ciResultGridId;
		
		if(isUpdate) {
			ciResultGrid = tpCiSearchResultTables.getActiveTab();
			ciResultGridId = ciResultGrid.getId();
			this.ciResultGridParamSets[ciResultGridId] = params;
		} else {
			var tabCount = tpCiSearchResultTables.items.items.length;
			ciResultGridId = params.searchType + '_' + tabCount;
			this.ciResultGridParamSets[ciResultGridId] = params;
			
			ciResultGrid = new AIR.CiResultGrid({
		    	id: ciResultGridId,
		    	layout: 'fit',
		    	border: false,
		    	closable: true
	//	    	loadMask: new Ext.LoadMask(tpCiSearchResultTables.getEl(), { msg: 'Loading...' })
			});
			
			this.setVisible(true);//tpCiSearchResultTables
			tpCiSearchResultTables.add(ciResultGrid);
			tpCiSearchResultTables.getItem(ciResultGridId).setTitle(ciResultGridId);
			tpCiSearchResultTables.setActiveTab(ciResultGridId);
			this.updateColumnLabels(AIR.AirApplicationManager.getLabels());

			ciResultGrid.on('close', this.onTabClose, this);
			ciResultGrid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
			ciResultGrid.getStore().on('load', this.onGridLoaded, this);
			ciResultGrid.on('rowclick', this.onRowClick, this);
			ciResultGrid.on('rowdblclick', this.onRowDoubleClick, this);
		}
		
//		this.ciResultGridParamSets[ciResultGridId] = params;
		ciResultGrid.getStore().load({
	    	params: params
	    });
	    
		delete params.start;
		delete params.limit;
		ciResultGrid.setPagingParams(params);
	},
	
	onRowClick: function(grid, rowIndex, e) {
		this.fireEvent('beforeCiSelect');//if(this.fireEvent('beforeCiSelect') == false) return;
		
		var record = grid.getStore().getAt(rowIndex);
		var ciId = record.id;
		
		if(record.data.tableId == AC.TABLE_ID_APPLICATION) {
			AIR.AirApplicationManager.setCiId(ciId);
			AIR.AirApplicationManager.setTableId(AC.TABLE_ID_APPLICATION);
		} else {
			AIR.AirApplicationManager.setCiId(-1);
			AIR.AirApplicationManager.setTableId(-1);
			
			var ciTypeWarningWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
			ciTypeWarningWindow.show();
		}
		
		this.fireEvent('ciSelect', this, ciId);
	},
	
	onRowDoubleClick: function (grid, rowIndex, e) {
		this.onRowClick(grid, rowIndex, e);
		this.fireEvent('externalNavigation', this, grid, 'clCiDetails');
	},
	
	onGridBeforeLoaded: function(store, options) {
//		if(!this.loadMask)
			this.loadMask = Util.createMask('Loading data...', this.getComponent('tpCiSearchResultTables').getActiveTab().getEl());//this.getComponent('tpCiSearchResultTables').getEl()
		this.loadMask.show();
		
//		AIR.AirApplicationManager.getMask('loadMask').show();
//		myLoadMask.show();
	},
	
	onGridLoaded: function(store, records, options) {
		this.loadMask.hide();
		
//		AIR.AirApplicationManager.getMask('loadMask').hide();
//		myLoadMask.hide();
	},
	
	
	
	
	
	onTabClose: function(tab) {
		tab.getStore().removeAll();
		delete this.ciResultGridParamSets[tab.getId()];
		
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		var tabCount = tpCiSearchResultTables.items.items.length;
		
		if(tabCount === 1)//0, 1 weil tab erst nach dem event zerstört wird
			this.setVisible(false);//tpCiSearchResultTables
	},
	
	getSearchParams: function(tabId) {
		if(!tabId) {
			var tab = this.getComponent('tpCiSearchResultTables').getActiveTab();
			if(tab)
				tabId = tab.getId();			
		}
		
		var params = tabId ? this.ciResultGridParamSets[tabId] : null;
		
		return params;
	},
	
	updateLabels: function(labels) {
		this.getComponent('bUpdateCiSearchResult').setText(labels.bUpdateCiSearchResult);
		
		this.updateColumnLabels(labels);
	},
	
	updateColumnLabels: function(labels) {
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		
		var ciSearchGrid;
		for(var i = 0; i < tpCiSearchResultTables.items.items.length; i++) {
			ciSearchGrid = tpCiSearchResultTables.items.items[i];
//			ciSearchGrid.setTitle(labels.searchResultPanelTitle);
			
			ciSearchGrid.getColumnModel().setColumnHeader(0, labels.searchResultName);
			ciSearchGrid.getColumnModel().setColumnHeader(1, labels.searchResultAlias);
			ciSearchGrid.getColumnModel().setColumnHeader(2, labels.searchResultType);
			ciSearchGrid.getColumnModel().setColumnHeader(3, labels.searchResultCategory);
			ciSearchGrid.getColumnModel().setColumnHeader(4, labels.searchResultAppOwner);
			ciSearchGrid.getColumnModel().setColumnHeader(5, labels.searchResultAppOwnerDelegate);
			ciSearchGrid.getColumnModel().setColumnHeader(6, labels.searchResultAppSteward);
			ciSearchGrid.getColumnModel().setColumnHeader(7, labels.searchResultResponsible);
			ciSearchGrid.getColumnModel().setColumnHeader(8, labels.searchResultSubResponsible);
		}
	}
});
Ext.reg('AIR.CiResultView', AIR.CiResultView);
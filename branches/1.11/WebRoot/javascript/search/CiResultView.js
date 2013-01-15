Ext.namespace('AIR');

AIR.CiResultView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			hidden: true,

	        items: [{
	        	xtype: 'panel',
	        	id: 'pSearchResultOptions',
	        	layout: 'column',
	        	border: false,
	        	
	        	items: [{
		        	xtype: 'button',
		        	id: 'bExpandAdvSearchParams',//bUpdateCiSearchResult
		    		enableToggle: true,
		    		
	//	        	cls: 'x-btn-text-icon',
	//	        	icon: 'images/refresh_16x16.png',
		        	
		        	text: 'Update'
		        },{
		        	xtype: 'button',
		        	id: 'bSearchReset',
		    		
		        	cls: 'x-btn-text-icon',
		        	icon: 'images/reset_16x16.png',
		        	
		        	style: {
		        		marginLeft: 5
		        	},
		        	
		        	text: 'Reset'
		        }]
	        },{
	        	xtype: 'tabpanel',
	        	id: 'tpCiSearchResultTables',

				enableTabScroll: true,
				resizeTabs: true,
				tabWidth: 145,
				
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
		this.tabCount = 0;
		
//		this.addEvents('tabclose');
	},
	
	search: function(params, isUpdate, callback) {//ownerView
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		
		var ciResultGrid;
		var ciResultGridId;
		
		if(isUpdate) {
			ciResultGrid = tpCiSearchResultTables.getActiveTab();
			ciResultGridId = ciResultGrid.getId();
			this.ciResultGridParamSets[ciResultGridId] = params;
		} else {
			var tabCount = ++this.tabCount;//tpCiSearchResultTables.items.items.length;
			ciResultGridId = params.searchType + '_' + tabCount;
			this.ciResultGridParamSets[ciResultGridId] = params;
			
			ciResultGrid = new AIR.CiResultGrid({
		    	id: ciResultGridId,
		    	layout: 'fit',
		    	ownerPrefix: ciResultGridId,
		    	border: false,
		    	closable: true
	//	    	loadMask: new Ext.LoadMask(tpCiSearchResultTables.getEl(), { msg: 'Loading...' })
			});
			
			this.setVisible(true);//tpCiSearchResultTables
			tpCiSearchResultTables.add(ciResultGrid);
			tpCiSearchResultTables.getItem(ciResultGridId).setTitle(this.getTabTitle(ciResultGridId) + '_' + tabCount);//ciResultGridId
			tpCiSearchResultTables.setActiveTab(ciResultGridId);
			this.updateColumnLabels(AAM.getLabels());

			ciResultGrid.on('close', this.onTabClose, this);
			ciResultGrid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
			ciResultGrid.getStore().on('load', this.onGridLoaded, this);
			ciResultGrid.on('rowclick', this.onRowClick, this);
			ciResultGrid.on('rowdblclick', this.onRowDoubleClick, this);
			
			var pagingBar = ciResultGrid.getBottomToolbar();
			var clExcelExport = pagingBar.getComponent(ciResultGridId + '_clExcelExport');//ciSearchGrid_clExcelExport
			clExcelExport.on('click', callback);//ownerView.onExcelExport, ownerView
		}
		
//		this.ciResultGridParamSets[ciResultGridId] = params;
		ciResultGrid.getStore().load({
	    	params: params
	    });
	    
//		delete params.start;
//		delete params.limit;
		ciResultGrid.setPagingParams(params);
	},
	
	getTabTitle: function(ciResultGridId) {
		var searchType = ciResultGridId.substring(0, ciResultGridId.indexOf('_'));
		var label;
		
		switch(searchType) {
			case AC.SEARCH_TYPE_SEARCH:
				label = AAM.getLabels().searchTypeSearch;
				break;
			case AC.SEARCH_TYPE_ADV_SEARCH:
				label = AAM.getLabels().searchTypeAdvancedSearch;
				break;
			case AC.SEARCH_TYPE_OU_SEARCH:
				label = AAM.getLabels().searchTypeOuSearch;
				break;
		}
		
		return label;
	},
	
	onRowClick: function(grid, rowIndex, e) {
		this.fireEvent('beforeCiSelect');//if(this.fireEvent('beforeCiSelect') == false) return;
		
		var record = grid.getStore().getAt(rowIndex);
		var ciId = record.id;
		
		if(record.data.tableId == AC.TABLE_ID_APPLICATION) {
			AAM.setCiId(ciId);
			AAM.setTableId(AC.TABLE_ID_APPLICATION);
		} else {
			AAM.setCiId(-1);
			AAM.setTableId(-1);
			
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
		
//		AAM.getMask('loadMask').show();
//		myLoadMask.show();
	},
	
	onGridLoaded: function(store, records, options) {
		this.loadMask.hide();
		
//		AAM.getMask('loadMask').hide();
//		myLoadMask.hide();
	},
	
	
	onTabClose: function(tab) {
		var grid = tab;
		grid.getStore().removeAll();
		delete this.ciResultGridParamSets[grid.getId()];
		
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
	
	getCurrentSearchType: function() {
		var tab = this.getComponent('tpCiSearchResultTables').getActiveTab();
		
		return tab.getId() || null;
	},
	
	updateLabels: function(labels) {
//		this.getComponent('bUpdateCiSearchResult').setText(labels.bUpdateCiSearchResult);
		
		var bExpandAdvSearchParams = this.getComponent('pSearchResultOptions').getComponent('bExpandAdvSearchParams').setText(labels.bExpandAdvSearchParams);
		if(bExpandAdvSearchParams.pressed) {
			bExpandAdvSearchParams.setText(labels.bExpandAdvSearchParams);
		} else {
			bExpandAdvSearchParams.setText(labels.bCollapseAdvSearchParams);
		}
		
		var tabs = this.getComponent('tpCiSearchResultTables').items.items;
		if(tabs) {
			for(var i = 0; i < tabs.length; i++) {
				var title = this.getTabTitle(tabs[i].getId()) + '_' + (i + 1);
				tabs[i].setTitle(title);
			}
		}
		
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
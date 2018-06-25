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
		        	id: 'bExpandAdvSearchParams',
		    		enableToggle: true,
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
		        },{
		        	xtype: 'button',
		        	id: 'bMassUpdate',
		        	disabled: true,
		        	hidden: true,
		    				        	
		        	style: {
		        		marginLeft: 5
		        	},
		        	
		        	text: 'Start Mass Update'
		        },{
		        	xtype: 'button',
		        	id: 'bSelectDeselectAll',
		        	disabled: true,
		        	hidden: true,
		    				        	
		        	style: {
		        		marginLeft: 5		        		
		        		
		        	},
		        	
		        	text: 'Select/Deselect All'
		        },
		        {
			    	xtype: 'checkbox',
			        id: 'cbIsMultipleSelect',
			        hidden: true,
		    	    
		        	style: {
		        		marginLeft: 10
		        	}
			        
		    	},
		    	{
		    		xtype: 'label',
		    		id: 'lIsMultipleSelect',
		    		text: 'Multiple Selection',
		    		hidden: true,
		    		
		    		style: {
		    			margingLeft: 5,
		    	        'font': '12px arial,tahoma,verdana,helvetica',
		    	        'padding-top':'3px'
		    		}
		    	}		    	
		        ]
	        },	        
	    	{
	        	xtype: 'panel',
	        	id: 'pcbmassUpdateType',
	        	layout: 'form',
	        	border: false,
	        	style: {
	        		marginTop: 10
	        	 
	        	},
	        	labelWidth: 130,	        	
	        	items: [		        
	        	 {
					xtype: 'filterCombo',
			        id: 'cbmassUpdateType',
			        width: 320,
			        hideLabel: false,
			        fieldLabel: 'Mass Update Mode',
					lastQuery: '',
			        store: AIR.AirStoreFactory.createMassUpdateTypeStore(),
			        valueField: 'id',
			        displayField: 'text',
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local',
		        	disabled: true,
		        	hidden: true
		        	
				}]
	        	},{
	        	xtype: 'tabpanel',
	        	id: 'tpCiSearchResultTables',

				enableTabScroll: true,
				resizeTabs: true,
				tabWidth: 145,
				stateful: false,
				
	            plain: true,
	            defaults: { autoScroll: true },
        	
	        	style: {
	            	marginTop: 5,
	            	'font': '11px arial,tahoma,verdana,helvetica'
	            }
	        }]
		});
		
		AIR.CiResultView.superclass.initComponent.call(this);
		this.getComponent('pSearchResultOptions').getComponent('cbIsMultipleSelect').on('check', this.enableButtonAndMultipleSelect, this);

		this.ciResultGridParamSets = {};
		this.tabCount = 0;
	},
	
	enableButtonAndMultipleSelect: function(checkbox, isChecked){
		
		var bMassUpdate = this.getComponent('pSearchResultOptions').getComponent('bMassUpdate');
		var bSelectDeselectAll = this.getComponent('pSearchResultOptions').getComponent('bSelectDeselectAll');
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		var  cbmassUpdateType = this.getComponent('pcbmassUpdateType').getComponent('cbmassUpdateType');
		
		if(isChecked){
			bMassUpdate.setDisabled(false);
			bSelectDeselectAll.setDisabled(false);
			cbmassUpdateType.setDisabled(false);
			//cbIsMultipleSelect.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=false;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
		}
		else{
			bMassUpdate.setDisabled(true);
			bSelectDeselectAll.setDisabled(true);
			cbmassUpdateType.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=true;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
		}
		
		
	},
	
	search: function(params, isUpdate, callback) {//ownerView
		this.ciTypeId = params.ciTypeId;
		this.ciSubTypeId = params.ciSubTypeId;
		
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		var bMassUpdate = this.getComponent('pSearchResultOptions').getComponent('bMassUpdate');
		var bSelectDeselectAll = this.getComponent('pSearchResultOptions').getComponent('bSelectDeselectAll');
		var cbIsMultipleSelect = this.getComponent('pSearchResultOptions').getComponent('cbIsMultipleSelect');
		var lIsMultipleSelect = this.getComponent('pSearchResultOptions').getComponent('lIsMultipleSelect');
		var  cbmassUpdateType = this.getComponent('pcbmassUpdateType').getComponent('cbmassUpdateType');	 

		var ciResultGrid;
		var ciResultGridId;
		
		if(isUpdate) {
			ciResultGrid = tpCiSearchResultTables.getActiveTab();
			ciResultGridId = ciResultGrid.getId();
			var pagingBar = ciResultGrid.getBottomToolbar();
			params.limit=pagingBar.pageSize;
			this.ciResultGridParamSets[ciResultGridId] = params;
		} else {
			var tabCount = ++this.tabCount;
			ciResultGridId = params.searchAction + '_' + tabCount;//searchType
			this.ciResultGridParamSets[ciResultGridId] = params;
			
			ciResultGrid = new AIR.CiResultGrid({
		    	id: ciResultGridId,
		    	layout: 'fit',
		    	ownerPrefix: ciResultGridId,
		    	border: false,
		    	closable: true
		    	
			});
			
			
			this.setVisible(true);
			tpCiSearchResultTables.add(ciResultGrid);
			tpCiSearchResultTables.getItem(ciResultGridId).setTitle(this.getTabTitle(ciResultGridId) + '_' + tabCount);//ciResultGridId
			tpCiSearchResultTables.setActiveTab(ciResultGridId);
			
			this.updateColumnLabels(AAM.getLabels());

			ciResultGrid.on('close', this.onTabClose, this);
			ciResultGrid.on('activate', this.onTabActivate, this);
			ciResultGrid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
			ciResultGrid.getStore().on('load', this.onGridLoaded, this);
			ciResultGrid.on('rowclick', this.onRowClick, this);
			ciResultGrid.on('rowdblclick', this.onRowDoubleClick, this);			
			
			var pagingBar = ciResultGrid.getBottomToolbar();
			var clExcelExport = pagingBar.getComponent(ciResultGridId + '_clExcelExport');
			clExcelExport.on('click', callback);
		}
		if((this.getTabTitle(ciResultGridId) === AC.SEARCH_TYPE_ADV_SEARCH || this.getTabTitle(ciResultGridId) === AC.SEARCH_TYPE_ADV_SEARCH_GER)&& (this.ciTypeId!=AC.TABLE_ID_BUSINESS_APPLICATION)) {  //IM0006769857
			
			bMassUpdate.setVisible(true);
			bSelectDeselectAll.setVisible(true);
			cbIsMultipleSelect.setVisible(true);
			lIsMultipleSelect.setVisible(true);
			cbmassUpdateType.setVisible(true);
			bMassUpdate.setDisabled(true);
			bSelectDeselectAll.setDisabled(true);
			cbmassUpdateType.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=true;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
			cbIsMultipleSelect.setValue(false);
		}else{
			bMassUpdate.setVisible(false);
			bSelectDeselectAll.setVisible(false);
			cbIsMultipleSelect.setVisible(false);
			lIsMultipleSelect.setVisible(false);
			cbmassUpdateType.setVisible(false);
			Ext.getCmp('cbIsMultipleSelect').setValue(false);
			
		}

		ciResultGrid.getStore().load({
	    	params: params
	    });
		ciResultGrid.setPagingParams(params);
	},
	onTabActivate: function(tab){	
		
		var ciResultGridId = tab.getId();		
		var searchAction = ciResultGridId.substring(0, ciResultGridId.indexOf('_'));
		var bMassUpdate = this.getComponent('pSearchResultOptions').getComponent('bMassUpdate');
		var bSelectDeselectAll = this.getComponent('pSearchResultOptions').getComponent('bSelectDeselectAll');
		var cbIsMultipleSelect = this.getComponent('pSearchResultOptions').getComponent('cbIsMultipleSelect');
		var lIsMultipleSelect = this.getComponent('pSearchResultOptions').getComponent('lIsMultipleSelect');
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		var  cbmassUpdateType = this.getComponent('pcbmassUpdateType').getComponent('cbmassUpdateType');

		
		if((searchAction === AC.SEARCH_TYPE_ADV_SEARCH) && (this.ciResultGridParamSets[ciResultGridId].ciTypeId!=AC.TABLE_ID_BUSINESS_APPLICATION)) {
			bMassUpdate.setVisible(true);
			bSelectDeselectAll.setVisible(true);
			cbIsMultipleSelect.setVisible(true);
			lIsMultipleSelect.setVisible(true);
			bMassUpdate.setDisabled(true);
			bSelectDeselectAll.setDisabled(true);
			cbmassUpdateType.setVisible(true);
			cbmassUpdateType.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=true;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
			cbIsMultipleSelect.setValue(false);
		}else{
			bMassUpdate.setVisible(false);
			bSelectDeselectAll.setVisible(false);
			cbIsMultipleSelect.setVisible(false);
			lIsMultipleSelect.setVisible(false);
			cbmassUpdateType.setVisible(false);
			Ext.getCmp('cbIsMultipleSelect').setValue(false);
		}
	},
	
	onGridLoaded: function(store, records, options) {
		this.loadMask.hide();
		
		
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		ciResultGrid = tpCiSearchResultTables.getActiveTab();
		var cm = ciResultGrid.getColumnModel();
		
		switch(this.ciTypeId) {
			case AC.TABLE_ID_APPLICATION:
				cm.setHidden(cm.getIndexById('applicationCat2Txt'), false);
				cm.setHidden(cm.getIndexById('location'), true);
				cm.setHidden(cm.getIndexById('applicationOwner'), false);
				cm.setHidden(cm.getIndexById('applicationOwnerDelegate'), false);
				cm.setHidden(cm.getIndexById('applicationSteward'), false);
				break;
			case AC.TABLE_ID_IT_SYSTEM:
				cm.setHidden(cm.getIndexById('applicationCat2Txt'), true);
				cm.setHidden(cm.getIndexById('location'), true);
				cm.setHidden(cm.getIndexById('applicationOwner'), true);
				cm.setHidden(cm.getIndexById('applicationOwnerDelegate'), true);
				cm.setHidden(cm.getIndexById('applicationSteward'), true);
				break;
			case AC.TABLE_ID_POSITION:
			case AC.TABLE_ID_ROOM:
			case AC.TABLE_ID_BUILDING_AREA:
			case AC.TABLE_ID_BUILDING:
			case AC.TABLE_ID_TERRAIN:
			case AC.TABLE_ID_SITE:
				cm.setHidden(cm.getIndexById('applicationCat2Txt'), true);
				cm.setHidden(cm.getIndexById('location'), false);
				cm.setHidden(cm.getIndexById('applicationOwner'), true);
				cm.setHidden(cm.getIndexById('applicationOwnerDelegate'), true);
				cm.setHidden(cm.getIndexById('applicationSteward'), true);
				break;
			case AC.TABLE_ID_HARDWARE_COMPONENT: break;
			default: break;
		}
	},
	
	getTabTitle: function(ciResultGridId) {
		var searchAction = ciResultGridId.substring(0, ciResultGridId.indexOf('_'));
		var label;
		
		switch(searchAction) {
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
		this.fireEvent('beforeCiSelect');
		
		var record = grid.getStore().getAt(rowIndex);
		var ciId = record.id;
		
		
		if(record.data.tableId == AC.TABLE_ID_APPLICATION ||
		   record.data.tableId == AC.TABLE_ID_ROOM ||
		   record.data.tableId == AC.TABLE_ID_BUILDING ||
		   record.data.tableId == AC.TABLE_ID_BUILDING_AREA ||
		   record.data.tableId == AC.TABLE_ID_POSITION ||
		   record.data.tableId == AC.TABLE_ID_TERRAIN ||
		   record.data.tableId == AC.TABLE_ID_SITE ||
		   record.data.tableId == AC.TABLE_ID_IT_SYSTEM ||
		   record.data.tableId == AC.TABLE_ID_FUNCTION||
		   record.data.tableId == AC.TABLE_ID_PATHWAY ||
		   record.data.tableId == AC.TABLE_ID_SERVICE || 
		   record.data.tableId == AC.TABLE_ID_BUSINESS_APPLICATION) {//Added by vandana
			
			var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
			
			var ciSubType;
			var cat1Txt = record.get('applicationCat1Txt');
			if(cat1Txt == AC.APP_WO_CAT || cat1Txt.length === 0) {
				ciSubType = AC.APP_CAT1_APPLICATION;
			} else {
				var r = Util.getStoreRecord(store, 'text', record.get('applicationCat1Txt'));
				ciSubType = r.get('ciSubTypeId');
			}
			AAM.setCiTypeId(record.data.applicationCat1Txt);		
			AAM.setCiId(ciId);
			AAM.setTableId(parseInt(record.data.tableId));
			AAM.setCiSubTypeId(ciSubType);
		} else {
			AAM.setCiId(-1);
			AAM.setTableId(-1);
			AAM.setCiSubTypeId(-1);
			
			ciId = -1;//damit Ci Detail-Menu ausgeblendet wird
			
			var ciTypeWarningWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
			ciTypeWarningWindow.show();
		}
		
		this.fireEvent('ciSelect', this, ciId, null, record);//grid this
	},
	
	onRowDoubleClick: function (grid, rowIndex, e) {
		this.onRowClick(grid, rowIndex, e);
		this.fireEvent('externalNavigation', this, grid, 'clCiDetails');
	},
	
	onGridBeforeLoaded: function(store, options) {
		this.loadMask = Util.createMask('Loading data...', this.getComponent('tpCiSearchResultTables').getActiveTab().getEl());//this.getComponent('tpCiSearchResultTables').getEl()
		this.loadMask.show();

	},

	
	onTabClose: function(tab) {
		var grid = tab;
		grid.getStore().removeAll();
		delete this.ciResultGridParamSets[grid.getId()];
		
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		var tabCount = tpCiSearchResultTables.items.items.length;
		
		if(tabCount === 1)//0, 1 weil tab erst nach dem event zerst�rt wird
			this.setVisible(false);
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
			
			//if (ciSearchGrid.getColumnModel().getColumnAt(0).id != 'name') {
				
				ciSearchGrid.getColumnModel().setColumnHeader(0, "&#160;");
			//}
				
			ciSearchGrid.getColumnModel().setColumnHeader(1, labels.searchResultName);
			ciSearchGrid.getColumnModel().setColumnHeader(2, labels.searchResultAlias);
			ciSearchGrid.getColumnModel().setColumnHeader(3, labels.searchResultType);
			ciSearchGrid.getColumnModel().setColumnHeader(4, labels.searchResultCategory);
			ciSearchGrid.getColumnModel().setColumnHeader(5, labels.searchResultLocation);
			ciSearchGrid.getColumnModel().setColumnHeader(6, labels.searchResultAppOwner);
			ciSearchGrid.getColumnModel().setColumnHeader(7, labels.searchResultAppOwnerDelegate);
			ciSearchGrid.getColumnModel().setColumnHeader(8, labels.searchResultAppSteward);
			ciSearchGrid.getColumnModel().setColumnHeader(9, labels.searchResultResponsible);
			ciSearchGrid.getColumnModel().setColumnHeader(10, labels.searchResultSubResponsible);
		}
	}
});
Ext.reg('AIR.CiResultView', AIR.CiResultView);
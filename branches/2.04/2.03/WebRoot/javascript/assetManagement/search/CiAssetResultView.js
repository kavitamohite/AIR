Ext.namespace('AIR');

AIR.CiAssetResultView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			hidden: true,

	        items: [{
	        	xtype: 'panel',
	        	id: 'pAssetSearchResultOptions',
	        	layout: 'column',
	        	border: false,
	        	
	        	items: [{
		        	xtype: 'button',
		        	id: 'bAssetSelectDeselectAll',
		        	disabled: true,
		        	hidden: true,
		    				        	
		        	style: {
		        		marginLeft: 5		        		
		        		
		        	},
		        	
		        	text: 'Select/Deselect All'
		        },
		        {
			    	xtype: 'checkbox',
			        id: 'cbAssetIsMultipleSelect',
			        hidden: true,
		    	    
		        	style: {
		        		marginLeft: 10
		        	}
			        
		    	},
		    	{
		    		xtype: 'label',
		    		id: 'lAssetIsMultipleSelect',
		    		text: 'Multiple Selection',
		    		hidden: true,
		    		
		    		style: {
		    			margingLeft: 5,
		    	        'font': '12px arial,tahoma,verdana,helvetica',
		    	        'padding-top':'3px'
		    		}
		    	}		    	
		        ]
	        },{
	        	xtype: 'tabpanel',
	        	id: 'tpCiAssetSearchResultTables',

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
		
		AIR.CiAssetResultView.superclass.initComponent.call(this);
		this.getComponent('pAssetSearchResultOptions').getComponent('cbAssetIsMultipleSelect').on('check', this.enableButtonAndMultipleSelect, this);

		this.ciResultGridParamSets = {};
		this.tabCount = 0;
	},
	
	enableButtonAndMultipleSelect: function(checkbox, isChecked){
		
		var bSelectDeselectAll = this.getComponent('pAssetSearchResultOptions').getComponent('bAssetSelectDeselectAll');
		var tpCiSearchResultTables = this.getComponent('tpCiAssetSearchResultTables');
		
		if(isChecked){
			bSelectDeselectAll.setDisabled(false);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=false;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
		}
		else{
			bSelectDeselectAll.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=true;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
		}
		
		
	},
	
	search: function(params, isUpdate, callback) {//ownerView
		this.ciTypeId = params.ciTypeId;
		this.ciSubTypeId = params.ciSubTypeId;
		
		var tpCiSearchResultTables = this.getComponent('tpCiAssetSearchResultTables');
		var bSelectDeselectAll = this.getComponent('pAssetSearchResultOptions').getComponent('bAssetSelectDeselectAll');
		var cbIsMultipleSelect = this.getComponent('pAssetSearchResultOptions').getComponent('cbAssetIsMultipleSelect');
		var lIsMultipleSelect = this.getComponent('pAssetSearchResultOptions').getComponent('lAssetIsMultipleSelect');

		var ciResultGrid;
		var ciResultGridId;
		
		if(isUpdate) {
			ciResultGrid = tpCiSearchResultTables.getActiveTab();
			ciResultGridId = ciResultGrid.getId();
			this.ciResultGridParamSets[ciResultGridId] = params;
		} else {
			var tabCount = ++this.tabCount;
			ciResultGridId = params.searchAction + '_' + tabCount;//searchType
			this.ciResultGridParamSets[ciResultGridId] = params;
			
			ciResultGrid = new AIR.CiAssetResultGrid({
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
		
		}
		if(this.getTabTitle(ciResultGridId) === AC.SEARCH_TYPE_ADV_SEARCH) {
			bSelectDeselectAll.setVisible(true);
			cbIsMultipleSelect.setVisible(true);
			lIsMultipleSelect.setVisible(true);
			bMassUpdate.setDisabled(true);
			bSelectDeselectAll.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=true;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
			cbIsMultipleSelect.setValue(false);
		}else{
			bSelectDeselectAll.setVisible(false);
			cbIsMultipleSelect.setVisible(false);
			lIsMultipleSelect.setVisible(false);
		}

		ciResultGrid.getStore().load({
	    	params: params
	    });
		ciResultGrid.setPagingParams(params);
	},
	onTabActivate: function(tab){		
		var ciResultGridId = tab.getId();		
		var searchAction = ciResultGridId.substring(0, ciResultGridId.indexOf('_'));
		var bSelectDeselectAll = this.getComponent('pAssetSearchResultOptions').getComponent('bAssetSelectDeselectAll');
		var cbIsMultipleSelect = this.getComponent('pAssetSearchResultOptions').getComponent('cbAssetIsMultipleSelect');
		var lIsMultipleSelect = this.getComponent('pAssetSearchResultOptions').getComponent('lAssetIsMultipleSelect');
		var tpCiSearchResultTables = this.getComponent('tpCiAssetSearchResultTables');

		if(searchAction === AC.SEARCH_TYPE_ADV_SEARCH) {
			bSelectDeselectAll.setVisible(true);
			cbIsMultipleSelect.setVisible(true);
			lIsMultipleSelect.setVisible(true);
			bSelectDeselectAll.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=true;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
			cbIsMultipleSelect.setValue(false);
		}else{
			bSelectDeselectAll.setVisible(false);
			cbIsMultipleSelect.setVisible(false);
			lIsMultipleSelect.setVisible(false);
		}
	},
	
	onGridLoaded: function(store, records, options) {
		this.loadMask.hide();
		
		
		var tpCiSearchResultTables = this.getComponent('tpCiAssetSearchResultTables');
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
		   record.data.tableId == AC.TABLE_ID_PATHWAY) {//Added by vandana
			
			var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
			
			var ciSubType;
			var cat1Txt = record.get('applicationCat1Txt');
			if(cat1Txt == AC.APP_WO_CAT || cat1Txt.length === 0) {
				ciSubType = AC.APP_CAT1_APPLICATION;
			} else {
				var r = Util.getStoreRecord(store, 'text', record.get('applicationCat1Txt'));
				ciSubType = r.get('ciSubTypeId');
			}
			AAM.setCiTypeId(this.ciTypeId);
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
		this.loadMask = Util.createMask('Loading data...', this.getComponent('tpCiAssetSearchResultTables').getActiveTab().getEl());//this.getComponent('tpCiSearchResultTables').getEl()
		this.loadMask.show();

	},

	
	onTabClose: function(tab) {
		var grid = tab;
		grid.getStore().removeAll();
		delete this.ciResultGridParamSets[grid.getId()];
		
		var tpCiSearchResultTables = this.getComponent('tpCiAssetSearchResultTables');
		var tabCount = tpCiSearchResultTables.items.items.length;
		
		if(tabCount === 1)//0, 1 weil tab erst nach dem event zerst�rt wird
			this.setVisible(false);
	},

	
	getSearchParams: function(tabId) {
		if(!tabId) {
			var tab = this.getComponent('tpCiAssetSearchResultTables').getActiveTab();
			if(tab)
				tabId = tab.getId();			
		}
		
		var params = tabId ? this.ciResultGridParamSets[tabId] : null;
		
		return params;
	},
	
	getCurrentSearchType: function() {
		var tab = this.getComponent('tpCiAssetSearchResultTables').getActiveTab();
		
		return tab.getId() || null;
	},
	
	updateLabels: function(labels) {
		
		var tabs = this.getComponent('tpCiAssetSearchResultTables').items.items;
		if(tabs) {
			for(var i = 0; i < tabs.length; i++) {
				var title = this.getTabTitle(tabs[i].getId()) + '_' + (i + 1);
				tabs[i].setTitle(title);
			}
		}
		
		this.updateColumnLabels(labels);
	},
	
	updateColumnLabels: function(labels) {
		var tpCiSearchResultTables = this.getComponent('tpCiAssetSearchResultTables');
		
		var ciSearchGrid;
		
		for(var i = 0; i < tpCiSearchResultTables.items.items.length; i++) {
			ciSearchGrid = tpCiSearchResultTables.items.items[i];		
				ciSearchGrid.getColumnModel().setColumnHeader(0, "&#160;");
				
			ciSearchGrid.getColumnModel().setColumnHeader(1, labels.assetManufacturer);
			ciSearchGrid.getColumnModel().setColumnHeader(2, labels.assetSAPDesc);
			ciSearchGrid.getColumnModel().setColumnHeader(3, labels.assetSerialNo);
			ciSearchGrid.getColumnModel().setColumnHeader(4, labels.assetCostCenterManager);
			ciSearchGrid.getColumnModel().setColumnHeader(5, labels.assetOrganizationalUnit);
			ciSearchGrid.getColumnModel().setColumnHeader(6, labels.assetCostCenter);
			ciSearchGrid.getColumnModel().setColumnHeader(7, labels.assetInventoryNumber);
			ciSearchGrid.getColumnModel().setColumnHeader(8, labels.assetPSPElement);
			ciSearchGrid.getColumnModel().setColumnHeader(9, labels.assetRequester);
			ciSearchGrid.getColumnModel().setColumnHeader(10, labels.assetTechnicalMaster);
			ciSearchGrid.getColumnModel().setColumnHeader(11, labels.assetAcquisitionValue);
			ciSearchGrid.getColumnModel().setColumnHeader(12, labels.assetSite);
			ciSearchGrid.getColumnModel().setColumnHeader(13, labels.assetOrderNumber);
			ciSearchGrid.getColumnModel().setColumnHeader(14, labels.assetChecked);
			ciSearchGrid.getColumnModel().setColumnHeader(15, labels.sapAssetClass);
			ciSearchGrid.getColumnModel().setColumnHeader(16, labels.assetSubCategory);
			ciSearchGrid.getColumnModel().setColumnHeader(17, labels.assetType);
			ciSearchGrid.getColumnModel().setColumnHeader(18, labels.assetModel);
			ciSearchGrid.getColumnModel().setColumnHeader(19, labels.assetSystemPlatformName);
			ciSearchGrid.getColumnModel().setColumnHeader(20, labels.assetHardwareSystem);
			ciSearchGrid.getColumnModel().setColumnHeader(21, labels.assetHardwareTransientSystem);
			ciSearchGrid.getColumnModel().setColumnHeader(22, labels.assetAlias);
			ciSearchGrid.getColumnModel().setColumnHeader(23, labels.assetOsName);
		}
	}
});
Ext.reg('AIR.CiAssetResultView', AIR.CiAssetResultView);
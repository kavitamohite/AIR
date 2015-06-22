Ext.namespace('AIR');

AIR.MyPlaceTabView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			layout: 'card',
			border: false,
			
			items: [{ 
				id: 'card-mycis',
				border: false,
				height: 1200,
				layout: 'fit',
				
			    items: [{
				    	xtype: 'AIR.CiResultGrid',
				    	id: 'myOwnCIsGrid',
				    	ownerPrefix: 'myCis',
				    	title: 'Results'
			    }]
			}, {
				id: 'card-myapps',
				border: false,
				height: 1200,
				layout: 'fit',
				
			    items: [{
				    	xtype: 'AIR.CiResultGrid',
				    	id: 'myDelegateCIsGrid',
				    	ownerPrefix: 'myCisSubstitute',
				    	title: 'Results'
		    	}] 
			}]
		});
		
		AIR.MyPlaceTabView.superclass.initComponent.call(this);
		
		this.addEvents('ciSelect', 'beforeCiSelect');
		
		this.myOwnCIsGrid = this.getComponent('card-mycis').getComponent('myOwnCIsGrid');
		this.myOwnCIsGrid.getStore().on('beforeload', this.onGridBeforeLoaded, this);
		this.myOwnCIsGrid.getStore().on('load', this.onMyOwnCIsGridLoaded, this);
		this.myOwnCIsGrid.on('rowclick', this.onRowClick, this);
		this.myOwnCIsGrid.on('rowdblclick', this.onRowDoubleClick, this);
		
		this.myDelegateCIsGrid = this.getComponent('card-myapps').getComponent('myDelegateCIsGrid');
		this.myDelegateCIsGrid.getStore().on('beforeload', this.onGridBeforeLoaded, this);
		this.myDelegateCIsGrid.getStore().on('load', this.onMyDelegateCIsGridLoaded, this);
		this.myDelegateCIsGrid.on('rowclick', this.onRowClick, this);
		this.myDelegateCIsGrid.on('rowdblclick', this.onRowDoubleClick, this);
		
		var pagingBar = this.myOwnCIsGrid.getBottomToolbar();
		var clExcelExport = pagingBar.getComponent('myCis_clExcelExport');
		clExcelExport.on('click', this.onExcelExport, this);
		
		var pagingBar = this.myDelegateCIsGrid.getBottomToolbar();
		var clExcelExport = pagingBar.getComponent('myCisSubstitute_clExcelExport');
		clExcelExport.on('click', this.onExcelExport, this);
	},
	
	onExcelExport: function(link, event) {
		
		var exportForm = AAM.getExportForm();
		
		exportForm.action = '/AIR/excelexport';
		exportForm.method = 'POST';
		exportForm.target = '_blank';
		
		exportForm.searchAction.value = link.getId().substring(0, link.getId().indexOf('_'));
		exportForm.cwid.value = AAM.getCwid();
		exportForm.token.value = AAM.getToken();
		
		exportForm.submit();
	},
	
	loadMyOwnCIsGrid: function(searchAction) {
		var start = this.myOwnCIsGrid.getBottomToolbar().cursor;
		var pageSize = this.myOwnCIsGrid.pageSize;
		
		var params = {
			start: start,
			limit: pageSize,
			cwid: AAM.getCwid(),
			token: AAM.getToken(),
			searchAction: searchAction
		};
		
		if(Ext.isIE && !this.isMoved2) {
			this.isMoved2 = true; 

			//ohne dies vertauscht der IE willk�rlich Spalten
			this.myOwnCIsGrid.getColumnModel().setConfig(AIR.AirConfigFactory.createCiResultGridConfig(true));
			this.updateLabels(AAM.getLabels());
		}
		
		this.myOwnCIsGrid.getStore().load({
			params: params
		});
		

		this.myOwnCIsGrid.setPagingParams(params);
	},
	
	loadDelegateCIsGrid: function(searchAction) {
		var params = {
			start: this.myDelegateCIsGrid.getBottomToolbar().cursor,//0,//
			limit: this.myDelegateCIsGrid.pageSize,//20,
			cwid: AAM.getCwid(),
			token: AAM.getToken(),
			searchAction: searchAction
		};
		
		if(Ext.isIE && !this.isMoved) {
			this.isMoved = true; 

			//ohne dies vertauscht der IE willk�rlich Spalten
	
			this.myDelegateCIsGrid.getColumnModel().setConfig(AIR.AirConfigFactory.createCiResultGridConfig(true));
			this.updateLabels(AAM.getLabels());
		}
		

		this.myDelegateCIsGrid.getStore().load({
			params: params
		});		

		this.myDelegateCIsGrid.setPagingParams(params);
	},
	
	onGridBeforeLoaded: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
		this.myOwnCIsGrid.selModel = undefined;
		var col = this.myOwnCIsGrid.colModel.config[0];
		if(col.dataIndex=='')
		this.myOwnCIsGrid.colModel.config.remove(col);
		this.myDelegateCIsGrid.selModel = undefined;
		var col = this.myDelegateCIsGrid.colModel.config[0];
		if(col.dataIndex=='')
		this.myDelegateCIsGrid.colModel.config.remove(col);		
	},
	
	onMyOwnCIsGridLoaded: function(store, records, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
		this.myOwnCIsGrid.updateHeight();
	},
	
	onMyDelegateCIsGridLoaded: function(store, records, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
		this.myDelegateCIsGrid.updateHeight();
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
		   record.data.tableId == AC.TABLE_ID_IT_SYSTEM) {
			
			var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
			var r = Util.getStoreRecord(store, 'text', record.get('applicationCat1Txt'));
			var ciSubTypeId = r ? r.get('ciSubTypeId') : AC.APP_CAT1_APPLICATION;
			AAM.setCiTypeId(record.data.applicationCat1Txt);
			AAM.setCiId(ciId);
			AAM.setTableId(parseInt(record.data.tableId));
			AAM.setCiSubTypeId(ciSubTypeId);
		} else {
			AAM.setCiId(-1);
			AAM.setTableId(-1);
			AAM.setCiSubTypeId(-1);
			
			ciId = -1;//damit Ci Detail-Menu ausgeblendet wird
			
			var ciTypeWarningWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
			ciTypeWarningWindow.show();
		}
		
		this.fireEvent('ciSelect', this, ciId, null, record);
	},
	
	onRowDoubleClick: function (grid, rowIndex, e) {
		this.onRowClick(grid, rowIndex, e);
		this.fireEvent('externalNavigation', this, grid, 'clCiDetails');
	},

	
	updateLabels: function(labels) {
		var myOwnCisView = this.getComponent('card-mycis');
		myOwnCisView.setTitle(labels.searchResultPanelTitle);
		//var cmhOffset = 1;
//		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(0, ' ');
//		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(0, '&#160;');
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(1, labels.searchResultName);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(2, labels.searchResultAlias);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(3, labels.searchResultType);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(4, labels.searchResultCategory);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(5, labels.searchResultLocation);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(6, labels.searchResultAppOwner);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(7, labels.searchResultAppOwnerDelegate);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(8, labels.searchResultAppSteward);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(9, labels.searchResultResponsible);
		myOwnCisView.getComponent('myOwnCIsGrid').getColumnModel().setColumnHeader(10, labels.searchResultSubResponsible);

		
		var myDelegateCisView = this.getComponent('card-myapps');
		myDelegateCisView.setTitle(labels.searchResultPanelTitle);
//		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(0, ' ');
//		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(0, '&#160;');
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(1, labels.searchResultName);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(2, labels.searchResultAlias);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(3, labels.searchResultType);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(4, labels.searchResultCategory);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(5, labels.searchResultLocation);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(6, labels.searchResultAppOwner);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(7, labels.searchResultAppOwnerDelegate);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(8, labels.searchResultAppSteward);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(9, labels.searchResultResponsible);
		myDelegateCisView.getComponent('myDelegateCIsGrid').getColumnModel().setColumnHeader(10, labels.searchResultSubResponsible);
	}
	
});
Ext.reg('AIR.MyPlaceTabView', AIR.MyPlaceTabView);
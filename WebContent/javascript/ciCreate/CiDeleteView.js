Ext.namespace('AIR');

AIR.CiDeleteView = Ext.extend(Ext.Panel, {
	CI_TYPE_APPLICATION: 2,
	
	initComponent: function() {
		Ext.apply(this, {
			title: 'Select CI to delete',
			
			autoHeight: true,

			
			border: false,
			layout: 'form',
			
			items: [{
					xtype: 'button',
					id: 'bDelete',
					text: 'Delete',
					hidden: true,
					
					width: 50,
					style: {
						marginTop: 10,
						marginBottom: 10
					}

        	},{
        		xtype: 'compositefield',
        		items: [{
		        	xtype: 'textfield',
		        	id: 'tfDeleteSearch',
		        	emptyText: 'Enter CI name or alias...',
		        	width: 300,
		        	hideLabel: true,
		        	sytle: {
		        		marginLeft: -50,
		        		marginRight: 0,
		        		marginTop: 5,
		        		marginBottom: 5
		        	},
		        	hasSearch: false,
		        	maxLength: 656
		        },{
					xtype: 'button',//commandlink
					id: 'clDeleteSearch',
		        	cls: 'x-btn-text-icon',
		        	icon: imgcontext+'/search_16x16.png',//'images/search_16x16.png'
		        	text: '',
					style: {
						marginLeft: 5
					}
				}]
        		
        	}, {
				xtype: 'AIR.CiResultGrid',//hier nur applications anzeigen
				id: 'CiDeleteResultGrid',
				anchor: '100%'
			}
			]
		});

		AIR.CiDeleteView.superclass.initComponent.call(this);
		
		
		var bDelete = this.getComponent('bDelete');
		var bDeleteSearchButton = Ext.getCmp('clDeleteSearch');
		bDeleteSearchButton.on('click', this.onSearch, this);
		bDelete.on('click', this.onDelete, this);
		
		var grid = this.getComponent('CiDeleteResultGrid');
		grid.on('rowclick', this.onRowClick, this);
		grid.on('rowdblclick', Ext.emptyFn);
		grid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
		grid.getStore().on('load', this.onGridLoaded, this);
		//EUGXS
        //IM0008472651 - Excel export button on delete CI list is not working for AIR
		var pagingBar = grid.getBottomToolbar();
		var clExcelExport = pagingBar.getComponent('undefined_clExcelExport');
		clExcelExport.on('click', this.onExcelExport, this);
		
	},
	
	onExcelExport: function(link, event) {
		var form = AIR.AirApplicationManager.getExportForm();
		
		form.action = '/AIR/excelexport';
		form.method = 'POST';
		form.target = '_blank';
		
	    if(this.isOuSearch) {
	    	var params = this.getOuSearchParams();
	    	
	    	form.searchAction.value = params.searchAction;
	    	
	    	for(var key in params)
	    		if(form['h'+key])
	    			form['h'+key].value = params[key];
	    } else {
	    	
			var params = this.getSearchParams();
			params.limit = 100000;
			form.hciNameAliasQuery.value = params.ciNameAliasQuery;
			
	    	for(var key in params)
	    		if(form[key])
	    			form[key].value = params[key];
    	
		    if(this.isAdvSearch) {
		    	form.isAdvancedSearch.value = "true";
		    	var params = this.getAdvancedSearchParams(params);
		    	for(var key in params)
		    		if(form['h'+key])
		    			form['h'+key].value = params[key];
		    }
	    }

	    form.submit();
	    
	},
	
	onSearch: function() {
		var params = this.getSearchParams();
		
	    this.processSearch(params);
	},
	
	getSearchParams: function() {
	    var params = { 
    		start: 0,
    		limit: 20,
    		ciNameAliasQuery: Ext.getCmp('tfDeleteSearch').getValue(),
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
		 	searchAction: 'myCisForDelete'
    	};
	    
	    return params;
	},
	
	processSearch: function(params) {
		var grid = this.getComponent('CiDeleteResultGrid');
		grid.getStore().load({
			params: params
		});
	},
	
	onDelete: function(button, event) {
		var yesCallback = function() {
			this.deleteCallback();
		};

		var callbackMap = {
			'yes': yesCallback.createDelegate(this)
		};
		
		var data = {
			applicationName: this.applicationName,
			applicationCat1Txt: this.applicationCat1Txt
		};
		
		var deleteConfirmWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DELETE_CONFIRMATION', callbackMap, data);
		deleteConfirmWindow.show();
	},
	
	deleteCallback: function() {
		var store = AIR.AirStoreFactory.createCiDeleteStore();
		store.on('load', this.onCiDeleted, this);
		
		var params = { 
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
		 	ciId: this.ciId,//id applicationId	Flag f�r Owner und Delegate Apps!
			tableId: this.tableId
		};

		store.load({
			params: params
		});
	},
	
	onCiDeleted: function(store, records, options) {
		//delete row from grid
		
		if(records[0].get('result') == 'OK') {
			var grid = this.getComponent('CiDeleteResultGrid');
			
			var record = grid.getStore().getAt(this.selectedCiIndex);
			grid.getStore().remove(record);
			
			var data = {
				name: record.data.name,//applicationName
				applicationCat1: record.data.applicationCat1Txt
			};
			this.fireEvent('airAction', this, 'appDeleteSuccess', data);
			
			var bDelete = this.getComponent('bDelete');
			bDelete.hide();
		} else {
			var title = 'Error deleting CI';
			var message = records[0].get('messages');
			
			var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('GENERIC_ERROR', null, message, title);
			dynamicWindow.show();	
		}
	},
	
	onRowClick: function(grid, rowIndex, e) {
		var record = grid.getStore().getAt(rowIndex);
		this.selectedCiIndex = rowIndex;
		this.ciId = record.data.id;
		this.applicationName = record.data.name;
		this.applicationCat1Txt = record.data.applicationCat1Txt;
		
		var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
		var r = Util.getStoreRecord(store, 'text', record.get('applicationCat1Txt'));
		this.tableId = r.get('ciTypeId');
		
		var bDelete = this.getComponent('bDelete');
		bDelete.show();
	},

	
	loadDeleteGrid: function() {
		this.reset();
		
		var params = {
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
			start: 0,
			limit: 20,
			searchAction: 'myCisForDelete'// Parameter f�r Owner und Delegate Apps anstatt myCis!
		};
		
		var grid = this.getComponent('CiDeleteResultGrid');
		grid.getStore().load({
			params: params
		});
		
		delete params.start;
		delete params.limit;
		grid.setPagingParams(params);
	},
	
	
	onGridBeforeLoaded: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
		// Added by enqmu
		var grid = this.getComponent('CiDeleteResultGrid');
		grid.selModel = undefined;
		var col = grid.colModel.config[0];
		if(col.dataIndex=='')
		grid.colModel.config.remove(col);
		// end
	},
	
	onGridLoaded: function(store, records, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
		
		var grid = this.getComponent('CiDeleteResultGrid');
		grid.setVisible(true);
		grid.updateHeight();
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.CiDeleteViewTitle);
		
		var bDelete = this.getComponent('bDelete');//.getComponent('pTop')
		if(!bDelete.hidden)
			bDelete.setText(labels.CiDeleteViewButtonDelete);
		
		var grid = this.getComponent('CiDeleteResultGrid');
//		grid.getColumnModel().setColumnHeader(0, labels.searchResultName);
		grid.getColumnModel().setColumnHeader(1, labels.searchResultName);    // Index incremented by 1 by enqmu
		grid.getColumnModel().setColumnHeader(2, labels.searchResultAlias);
		grid.getColumnModel().setColumnHeader(3, labels.searchResultType);
		grid.getColumnModel().setColumnHeader(4, labels.searchResultCategory);
		grid.getColumnModel().setColumnHeader(5, labels.searchResultAppOwner);
		grid.getColumnModel().setColumnHeader(6, labels.searchResultAppOwnerDelegate);
		grid.getColumnModel().setColumnHeader(7, labels.searchResultAppSteward);
		grid.getColumnModel().setColumnHeader(8, labels.applicationManager);
		grid.getColumnModel().setColumnHeader(9, labels.applicationManagerDelegate);
	},
	
	reset: function() {
//		var pSpace1 = this.getComponent('pSpace1');
//		pSpace1.hide();
//		
//		var bDelete = this.getComponent('bDelete');//this.getComponent('pDeleteCiSearch').getComponent('bDelete');
//		bDelete.hide();
		
//		var pTop = this.getComponent('pTop');
//		pTop.hide();
		
		var bDelete = this.getComponent('bDelete');
		bDelete.hide();
		
		this.doLayout();
	}
});
Ext.reg('AIR.CiDeleteView', AIR.CiDeleteView);
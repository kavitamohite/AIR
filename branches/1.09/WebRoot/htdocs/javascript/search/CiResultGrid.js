Ext.namespace('AIR');

AIR.CiResultGrid = Ext.extend(Ext.grid.GridPanel, {
	complete: true,
	boxReady: false,
	
	initComponent: function() {
	    var expander = new Ext.ux.grid.RowExpander({
	        tpl: new Ext.Template(
	            '<p><b>Lifecycle status:</b> {applicationCat2Txt}</p>'
	        )
	    });
	    
	    /*
	    var columns = [];
	    
//		var columns = [
////		    expander,
//			{ header: 'Name', dataIndex: 'applicationName', width: 150, sortable: true},//, menuDisabled: true
//			{ header: 'Alias', dataIndex: 'applicationAlias', width: 150, sortable: true},//, menuDisabled: true
//			{ header: 'Type', dataIndex: 'applicationCat1Txt', width: 150, sortable: true}//, menuDisabled: true
//		];
		
		columns.push({ id: 'applicationName', header: 'Name', dataIndex: 'applicationName', width: 150, sortable: true});
		columns.push({ id: 'applicationAlias', header: 'Alias', dataIndex: 'applicationAlias', width: 150, sortable: true});
		columns.push({ id: 'applicationCat1Txt', header: 'Type', dataIndex: 'applicationCat1Txt', width: 150, sortable: true});
		
		if(this.complete) {
			columns.push({ id: 'applicationCat2Txt', header: 'Category', dataIndex: 'applicationCat2Txt', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ id: 'applicationOwner', header: 'App owner', dataIndex: 'applicationOwner', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ id: 'applicationOwnerDelegate', header: 'App owner delegate', dataIndex: 'applicationOwnerDelegate', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ id: 'applicationSteward', header: 'App steward', dataIndex: 'applicationSteward', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ id: 'responsible', header: 'Responsible', dataIndex: 'responsible', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ id: 'subResponsible', header: 'Sub responsible', dataIndex: 'subResponsible', width: 150, sortable: true});//, menuDisabled: true
		}*/
		
	    var columns = AIR.AirConfigFactory.createCiResultGridConfig(this.complete);
		this.defaultColumnConfig = columns;
	    
		var colModel = new Ext.grid.ColumnModel(columns);
		var selModel = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});

		var applicationListStore = AIR.AirStoreFactory.createApplicationListStore();
		
		
		var pagingBar = new AIR.AirPagingToolbar({
			store: applicationListStore,
			complete: this.complete,
			ownerPrefix: this.ownerPrefix
			
//			pagingParams: this.pagingParams
//			pageSize: 25
		});
		
		
		Ext.apply(this, {
			colModel: colModel,
			selModel: selModel,
			store: applicationListStore,
			
			frame: false,
			border: false,
//			enableColumnHide: false,
			loadMask: false,
			autoScroll: true,
			stripeRows: true,
			stateful: true,
//			plugins: expander,

			
			viewConfig: {
				emptyText: 'Nothing found'
			},
			
		    bbar: pagingBar
		});
		
		AIR.CiResultGrid.superclass.initComponent.call(this);
		
		if(this.complete) {
			var rbgPageSize = pagingBar.getComponent('rbg' + pagingBar.getId());//items.items[14];//14 12
			rbgPageSize.on('change', this.onPageSizeChange, this);
		}
		
		this.updateHeight();
	},

	
	onPageSizeChange: function (group, radio) {
		if(radio != null) {
			this.pageSize = parseInt(radio.inputValue);
			var pagingBar = this.getBottomToolbar();
			pagingBar.pageSize = this.pageSize;
			
			var params = {
				start: 0,
				limit: this.pageSize
			};
			
			if(this.pagingParams)
				for(var key in this.pagingParams)
					params[key] = this.pagingParams[key];
			
//			params.start = 0;
//			params.limit = this.pageSize;
			
			this.getStore().load({
				params: params,
				callback: function() {
					this.updateHeight();
				}.createDelegate(this)
			});
		}
	},
	
	updateHeight: function() {
		if(!this.pageSize)
			this.pageSize = 20;//25
		
		switch(this.pageSize) {
			case 10:
				this.setHeight(305);//280
				break;
			case 20://25
				this.setHeight(520);//490
				break;
			case 50:
			case 100:
				this.setHeight(1145);//1120
				break;
			default: break;
		}
	},
	
	setPagingParams: function(pagingParams) {
		this.pagingParams = pagingParams;
		var pagingBar = this.getBottomToolbar();
		pagingBar.pagingParams = pagingParams;
	},
	
	getDefaultColumnConfig: function() {
		return this.defaultColumnConfig;
	}
});
Ext.reg('AIR.CiResultGrid', AIR.CiResultGrid);
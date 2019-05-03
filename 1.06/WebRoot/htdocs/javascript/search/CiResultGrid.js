Ext.namespace('AIR');

AIR.CiResultGrid = Ext.extend(Ext.grid.GridPanel, {
	complete: true,
	boxReady: false,
	
	initComponent: function() {
		var columns = [
			{ header: 'Name', dataIndex: 'applicationName', width: 150, sortable: true},//, menuDisabled: true
			{ header: 'Alias', dataIndex: 'applicationAlias', width: 150, sortable: true},//, menuDisabled: true
			{ header: 'Type', dataIndex: 'applicationCat1Txt', width: 150, sortable: true}//, menuDisabled: true
		];
		
		if(this.complete) {
			columns.push({ header: 'Category', dataIndex: 'applicationCat2Txt', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ header: 'Responsible', dataIndex: 'responsible', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ header: 'Sub responsible', dataIndex: 'subResponsible', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ header: 'App owner', dataIndex: 'applicationOwner', width: 150, sortable: true});//, menuDisabled: true
			columns.push({ header: 'App owner delegate', dataIndex: 'applicationOwnerDelegate', width: 150, sortable: true});//, menuDisabled: true
		}
		
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
			
			viewConfig: {
				emptyText : 'Nothing found'
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
				this.setHeight(265);
				break;
			case 20://25
				this.setHeight(480);//595
				break;
			case 50:
			case 100:
				this.setHeight(1120);
				break;
		}
	},
	
	setPagingParams: function(pagingParams) {
		this.pagingParams = pagingParams;
		var pagingBar = this.getBottomToolbar();
		pagingBar.pagingParams = pagingParams;
	}
});
Ext.reg('AIR.CiResultGrid', AIR.CiResultGrid);
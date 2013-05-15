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
	    		
	    var columns = AIR.AirConfigFactory.createCiResultGridConfig(this.complete);
	    
	    for(var i = 0; i <  columns.length; i++)
	    	columns[i].renderer = this.columnRenderer;
	    
		this.defaultColumnConfig = columns;
	    
		var colModel = new Ext.grid.ColumnModel(columns);
		var selModel = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});

		var applicationListStore = AIR.AirStoreFactory.createCiItemListStore();//createApplicationListStore
		
		
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
			params.limit = this.pageSize;
			
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
	},
	
	columnRenderer: function(value, metadata, record, rowIndex, colIndex, store) {
		var deleteQuelle = record.get('deleteQuelle') || '';
		var isDeleted = deleteQuelle === 'No' || deleteQuelle.length === 0 ? false : true;
		if(isDeleted)
			metadata.css += ' gridCellMarkedAsDeleted';//'style="color:red;';
		return value;
	}
});
Ext.reg('AIR.CiResultGrid', AIR.CiResultGrid);
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
	    var selModel = new Ext.grid.CheckboxSelectionModel({
	    	   checkOnly : true,
	    	   sortable: true,
	    	   singleSelect: true,
//	    	   singleSelect: this.getId().substring(0, this.getId().indexOf('_')) === AC.SEARCH_TYPE_ADV_SEARCH ? false : true 
	    		listeners: {
	    			beforerowselect : function(selModel, rowIndex, keepExisting, record ){
	    				if(selModel.grid.ownerCt.ownerCt.getComponent('pSearchResultOptions').getComponent('cbIsMultipleSelect').getValue()){
		    				if(record.data.isTemplate=='-1')
			    				return false;
			    				else {
			    					var isAdmin = AIR.AirApplicationManager.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR);
			    					if(isAdmin)
			    						return true;
			    					else{
			    						var cwid=AAM.getCwid();
			    					    if(record.data.ciOwner===cwid || record.data.ciOwnerDelegate===cwid || record.data.applicationOwner===cwid  || record.data.applicationSteward==cwid || record.data.applicationOwnerDelegate===cwid )    						
			    							return true;
			    						else{
			    				    		Ext.Msg.show({
			    				    			title: 'Mass Update Authorisation',
			    				    			msg: 'You are not authorised to update this CI',
			    				    			buttons: Ext.MessageBox.OK,
			    				    			icon: Ext.MessageBox.INFO			
			    				    		});
			    							return false;	    					

			    						}
			    					    
			    					}
			    				}	    					
	    				}else
	    					return true;

	    			}	    			
	    		}});
	    
	    
	    var columns = AIR.AirConfigFactory.createCiResultGridConfig(this.complete,selModel);
	    
	    for(var i = 1; i <  columns.length; i++)
	    	columns[i].renderer = this.columnRenderer;
	    
		this.defaultColumnConfig = columns;
	    
		var colModel = new Ext.grid.ColumnModel(columns);
		
//		if (columns[0].id != 'name') {
//			selModel = AC.resultGridSelModel;
//		} else {
//			selModel = new Ext.grid.RowSelectionModel({
//				singleSelect: true
//			});
//		}

		var applicationListStore = AIR.AirStoreFactory.createCiItemListStore();//createApplicationListStore
		
		
		var pagingBar = new AIR.AirPagingToolbar({
			store: applicationListStore,
			complete: this.complete,
			ownerPrefix: this.ownerPrefix
		});
		
		
		Ext.apply(this, {
			colModel: colModel,
			selModel: selModel,
			store: applicationListStore,
			frame: false,
			border: false,
			loadMask: false,
			autoScroll: true,
			stripeRows: true,
			stateful: false,
			viewConfig: {
				emptyText: 'Nothing found or no filter set'
			},
			
		    bbar: pagingBar
		});
		
		AIR.CiResultGrid.superclass.initComponent.call(this);
		
		if(this.complete) {
			var rbgPageSize = pagingBar.getComponent('rbg' + pagingBar.getId());
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
			this.pageSize = 20;
		
		switch(this.pageSize) {
			case 10:
				this.setHeight(305);
				break;
			case 20:
				this.setHeight(520);
				break;
			case 50:
			case 100:
			case 500:
			case 1000:
			case 10000:	
				this.setHeight(1145);
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
			metadata.css += ' gridCellMarkedAsDeleted';
		return value;
	}
});
Ext.reg('AIR.CiResultGrid', AIR.CiResultGrid);
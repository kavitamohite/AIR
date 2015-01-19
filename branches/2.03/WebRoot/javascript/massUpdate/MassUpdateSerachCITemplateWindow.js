Ext.namespace('AIR');


//http://by02wr:8080/AIR/ItsecMassnahmenWSPort?wsdl
AIR.MassUpdateSerachCITemplateWindow = Ext.extend(Ext.Window,{
	
	constructor: function(ciTypeId,ciSubTypeId,selectedCIs){
		this.ciTypeId = ciTypeId;
		this.selectedCIs = selectedCIs;
		this.ciSubTypeId = ciSubTypeId;
		
		AIR.MassUpdateSerachCITemplateWindow.superclass.constructor.call(this);
	},
    
    initComponent :function(){
    	Ext.apply(this,{
    		plain: true,
			modal: true,
    		flex: 1,
    		closeAction:'hide',
    		border: false,
    		title: 'Selection of Template Parameters',
    		
    		width: 1000,
    		height: 650,
    		
			layout: 'card',//anchor border anchor vbox
			activeItem: 0,
    		
    		items: [{
    			region: 'center',
				xtype: 'panel',
				id: 'pMassUpdateFromSearchCard',
				
				layout: 'form',//fit: dadurch fehlte die pagingBar der Tabelle (?!)
				border: false,
    		  
        		
        		items: [{
    				xtype: 'panel',
    				id: 'pMassUpdateTemplateCISearchCard',
    				
    				layout: 'form',//fit: dadurch fehlte die pagingBar der Tabelle (?!)
    				border: false,
    				padding: 20,
    				items: [{
    					xtype: 'panel',
    					id: 'pTemplateCISearch',
    					title: 'Select element as template',//languagestore.data.items[0].data['ciCopyFromViewTitle'],//
    					
    	//				anchor: '100%',
    					border: false,
    					
    		            layout: 'table',//USE column oder hbox layout here!!
    					layoutConfig: {
    						columns: 3
    					},
    					
    					padding: 5,
    					
    					items: [{
    						xtype: 'textfield',
    						id: 'tfTemplateCiSearch',
    						maskRe: /[\w\d\-+\/ ,&]/,
    						border: false,
    						
    						enableKeyEvents: true,
    						listeners: {
    			                specialkey: function(field, e){
    			                    if (e.getKey() == e.ENTER) {
    			                    	var pTemplateCISearch = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('pTemplateCISearch').getComponent('bTemplateCISearch');
    			                    	pTemplateCISearch.fireEvent('click', pTemplateCISearch);
    			                    }
    			                }.createDelegate(this)
    						},
    						
    						style: {
    							width: 200,
    							marginTop: 5
    						}
    					}, {
    						xtype: 'button',
    						id: 'bTemplateCISearch',
    						text: 'Search',
    						width: 50,
    						
    						style: {
    							marginTop: 5,
    							marginLeft: 5
    						}
    					}, {
    						xtype: 'button',
    						text: 'Next',
    						id: 'bCopyFromNext',
    						hidden: true,
    						width: 50,
    						
    						style: {
    							marginTop: 5,
    							marginLeft: 5
    						}
    					}]
    				},{
    					xtype: 'AIR.CiResultGrid',//soll hier nur applications anzeigen
    					id: 'templateCISearchGrid',//load mask starten/stoppen
    					anchor: '100%',
    					ownerPrefix: 'ciTemplateFromSearchGrid',
    					hidden: true,    					
    					style: {
    						marginTop: 20
    					}
    				}]
    			}]
        			  

    		}]
  
    		
    	});
    	AIR.DirectLinkCITemplateWindow.superclass.initComponent.call(this);
    	
		var grid = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('templateCISearchGrid');
		grid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
		grid.getStore().on('load', this.onGridLoaded, this);
		grid.on('rowclick', this.onRowClick, this);
		grid.on('rowdblclick', Ext.emptyFn);

    	
    	var bTemplateCISearch = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('pTemplateCISearch').getComponent('bTemplateCISearch');
    	bTemplateCISearch.on('click',this.onSearch,this);
    	
		var bCopyFromNext = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('pTemplateCISearch').getComponent('bCopyFromNext');
		bCopyFromNext.on('click', this.onNext,this);
		//bCopyFromNext.on('click', this.onNext, this);
    	
    	
    },
	onRowClick: function(grid, rowIndex, e) {
		var record = grid.getStore().getAt(rowIndex);
		this.ciId = record.data.id;//applicationId
		this.applicationName = record.data.name;
		this.applicationCat1 = record.data.applicationCat1Txt;
		this.applicationCat2 = record.data.applicationCat2Txt;
		this.tableId = record.data.tableId;
		
		var bCopyFromNext = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('pTemplateCISearch').getComponent('bCopyFromNext');
		bCopyFromNext.show();
//		bCopyFromNext.enable();
	},
	onGridLoaded: function(store, records, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
		
		var grid = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('templateCISearchGrid');
		grid.setVisible(true);
		grid.updateHeight();

	},
	onGridBeforeLoaded: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
		var grid = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('templateCISearchGrid');
		grid.selModel = undefined;
		var col = grid.colModel.config[0];
		if(col.dataIndex=='')
		grid.colModel.config.remove(col);
	},  
	
	onNext: function(button,event) {
		AIR.AirApplicationManager.setCiId(this.ciId);
		AIR.AirApplicationManager.setTableId(this.tableId);
		AIR.AirApplicationManager.setCiSubTypeId(this.ciSubTypeId);
		AIR.AirApplicationManager.setSelectedCiIds(this.selectedCIs);
		
		Ext.Msg.show({
			   title:'Start mass update',
			   msg: 'You are in mass update mode. Are you sure that you want to update all elements marked in the list with the data you have just entered?',
			   buttons: Ext.Msg.YESNO,
			   fn: this.openMassUpdateValueTransferWindow,
			   //animEl: 'elId',
			   icon: Ext.MessageBox.INFO
			});
			
	},
	
	openMassUpdateValueTransferWindow: function(button,object){
		if(button=='yes'){
			var massUpdateAttributesStore = AIR.AirStoreFactory.createMassUpdateAttributesStore();
			
			var params = {
					cwid: AIR.AirApplicationManager.getCwid(),
					token: AIR.AirApplicationManager.getToken(),
				 	ciId: AIR.AirApplicationManager.getCiId(),
				 	ciTypeId: AIR.AirApplicationManager.getTableId()
			};
			massUpdateAttributesStore.load({
				params: params
			});
			var valueTransferWindow = new AIR.MassUpdateAttributeValueTransferWindow(this.tableId,this.selectedCIs,this.ciSubTypeId,this.templateCIId, massUpdateAttributesStore);
			valueTransferWindow.show();
		}
	},
	
	onSearch: function(button, event) {
		var bCopyFromNext = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('pTemplateCISearch').getComponent('bCopyFromNext');
		bCopyFromNext.hide();
		
		this.query = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('pTemplateCISearch').getComponent('tfTemplateCiSearch').getValue().trim();

		if(this.query.length > 0) {
		    while(this.query.indexOf('*') > -1)
		    	this.query = this.query.replace('*', '%');
		    
		    while(this.query.indexOf('?') > -1)
		    	this.query = this.query.replace('?', '_');
		
	    
			var params = {
				start: 0,
				limit: 20,
				ciNameAliasQuery: this.query,//query
				queryMode: 'CONTAINS',
				searchAction: 'search',
				ciTypeId: this.ciTypeId,
				ciSubTypeId: this.ciSubTypeId,
				isTemplate: 'Y',
				isAdvSearch: 'true',
   			 	cwid: AIR.AirApplicationManager.getCwid(),
   			 	token: AIR.AirApplicationManager.getToken()
			};
			
			var grid = this.getComponent('pMassUpdateFromSearchCard').getComponent('pMassUpdateTemplateCISearchCard').getComponent('templateCISearchGrid');
			
			grid.getStore().load({
				params: params
//				callback: function() {
//					grid.setVisible(true);
//					grid.updateHeight();
//				}
			});
			
//			delete params.start;
//			delete params.limit;
			grid.setPagingParams(params);
		}
	}    

});
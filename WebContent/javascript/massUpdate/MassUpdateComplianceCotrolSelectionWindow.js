Ext.namespace('AIR');



AIR.MassUpdateComplianceCotrolSelectionWindow = Ext.extend(Ext.Window,{
	
	constructor: function(massUpdateComplianceControlsStore){
		this.massUpdateComplianceControlsStore = massUpdateComplianceControlsStore;		
		AIR.MassUpdateComplianceCotrolSelectionWindow.superclass.constructor.call(this);
	},
	
    
    initComponent :function(){
    	var selection = new Ext.grid.CheckboxSelectionModel();
    	Ext.apply(this,{
    		plain: true,
			modal: true,
    		flex: 1,
    		closeAction:'close',
    		border: false,
    		title: 'Selection of Single Controls',
    		
    		width: 600,
    		height: 540,
    		
			layout: 'card',//anchor border anchor vbox
			activeItem: 0,
    		
    		items: [{
    			region: 'center',
				xtype: 'panel',
				id: 'pMassUpdateComplianceCotrolSelectionCard',				
				layout: 'form',//fit: dadurch fehlte die pagingBar der Tabelle (?!)
				border: false,
    		  
        		
        		items: [
        		        {
    				xtype: 'panel',
    				id: 'pMassUpdateValueTransferGridCard',
    				
    				layout: 'form',//fit: dadurch fehlte die pagingBar der Tabelle (?!)
    				border: false,
    				padding: 20,
    				items: [
      				        {
    				        	xtype: 'panel',
    				        	id:  'presultGrid',
    							border: true,
        						style: {
        							
        							marginTop: 10
 						       },
    				        	
    				        	items:  [
    			    				        {
    			    				        	xtype: 'label',
    			    				        	id: 'label1',
    			    				        	text: 'Select from list all controls whose status values are to be accepted.',
    			    				        	width: 100,
    			        						style: {
    			        							
    			        							marginTop: 10,
    			        							fontSize: 16
    			 						       }
    			    				        	
    			    				        },
    			    				        
    			    				        new Ext.grid.GridPanel({
    			                                id:  'massUpdateComplianceCotrolResultGrid',
    			    	    					height: 400,
    			    	    					selModel: selection,
    			    	    					store: this.massUpdateComplianceControlsStore,
    			    	    					border: true,
    			    	    					autoScroll: true,
    			    	    					columns: [
    			    	    					selection,
    			    	    					{
    			    	    						header: 'Ident',
    			    	    						dataIndex: 'ident',
    			    	    						id: 'ident',
    			    	    						width: 70	
    			    	    					},
    			    	    					{
    			    	    						header: 'Control',
    			    	    						dataIndex: 'Control',
    			    	    						id: 'Control',
    			    	    						width: 320
    			    	    					},
    			    	    					{
    			    	    						header: 'Compliance Status',
    			    	    						dataIndex: 'compliance_status',
    			    	    						id: 'compliance_status',
    			    	    						width: 130	
    			    	    					}    	    					
    			    	    		          ]
    			    	    				
    			    				        	
    			    				        }),
    				        	         ]
      				        },


    				        {
    				        	xtype: 'panel',
    				        	id:  'pbuttons',
    							layout: 'hbox',
    							border: false,
        						style: {
        							
        							marginTop: 20
 						       },
    				        	
    				        	items:  [
    			    				              {
    			    				            	  xtype: 'button',
    			    				            	  text: 'Cancel',
    			    				            	  id: 'bComplianceMassUpdateCancel',
    			    				            	  width: 75,
    			    				            	  
    			    	        						style: {
    			    	        							fontSize: 14,
    			    	        							marginLeft: 300
    			    	        						}
    			    				            	  
    			    				              },
    			    				              
    			    				              {
    			    				            	  xtype: 'button',
    			    				            	  text: 'Start Mass Update',
    			    				            	  id: 'bComplianceStartMassUpdate',
    			    				            	  width: 100,
    			    				            	  
   			    	        						style: {
    			    	        							fontSize: 14,
    			    	        							marginLeft: 330
    			    	        						}
    			    				            	  
    			    				              }
    				        	       ]
    				        	
    				        }
      				        
    				        ]
    			}]
        			  

    		}]
  
    		
    	});
    	AIR.MassUpdateComplianceCotrolSelectionWindow.superclass.initComponent.call(this);
    	var bComplianceMassUpdateCancel = this.getComponent('pMassUpdateComplianceCotrolSelectionCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pbuttons').getComponent('bComplianceMassUpdateCancel');
    	var bComplianceStartMassUpdate = this.getComponent('pMassUpdateComplianceCotrolSelectionCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pbuttons').getComponent('bComplianceStartMassUpdate');

    	bComplianceMassUpdateCancel.on('click',this.cancelComplianceControlWindow,this);
    	bComplianceStartMassUpdate.on('click',this.massUpdateComplianceControl,this);
    	    	
    },
    cancelComplianceControlWindow: function(){
    	this.close();
        Ext.Msg.show({
            title: 'Mass Update',
            msg: 'Compliance Status Transfer cancelled!',
            modal: false,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
        },
    
     massUpdateComplianceControl: function(){
    	 
    	var massUpdateComplianceCotrolResultGrid = this.getComponent('pMassUpdateComplianceCotrolSelectionCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('presultGrid').getComponent('massUpdateComplianceCotrolResultGrid');
    	var selModel = massUpdateComplianceCotrolResultGrid.getSelectionModel();
    	var selectedElements = selModel.getCount();
    	if(selectedElements === 0){
	        Ext.Msg.show({
	            title: 'Mass Update',
	            msg: 'Select at least on element for mass update.',
	            modal: false,
	            icon: Ext.Msg.INFO,
	            buttons: Ext.Msg.OK,
				fn: this.massUpdateComplianceControl,
				scope: this
	        });
    	}else{
			var selectedRows = selModel.getSelections();
			var ids = selectedRows[0].id;
			var size= selectedRows.length;
			if(size > 1){
				for( var i = 1; i < selectedRows.length; i++) {
					ids=ids+','+selectedRows[i].id; // Do whatever you want to do
				}
			}
	 		var massUpdateData = AIR.AirApplicationManager.getMassUpdateData();
			var massUpdateComplianceControlSaveStore = AIR.AirStoreFactory.createMassUpdateComplianceControlSaveStore();
			massUpdateComplianceControlSaveStore.on('beforeload', this.onBeforeComplianceControlMassUpdate, this);
			massUpdateComplianceControlSaveStore.on('load', this.onComplianceControlMassUpdate, this);
			var params = {
					cwid: massUpdateData.cwid,
					token: massUpdateData.token,
					templateCiId: massUpdateData.templateCiId,
				 	ciTypeId: massUpdateData.ciTypeId,
				 	selectedCIs: massUpdateData.selectedCIs,
				 	selectedItsecMassnStIds: ids
			};
			
			massUpdateComplianceControlSaveStore.load({
    			params: params
    		});
    	}

     },
     onBeforeComplianceControlMassUpdate :function(store, options){
 		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
 		saveMask.show();
     },
     onComplianceControlMassUpdate :function(store, records, options){
		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		saveMask.hide();
		switch(records[0].data.result) {
		case 'OK':
	    		Ext.Msg.show({
	    			title: 'Mass update',
	    			msg: 'Compliance Status Transfer successfully!.',
	    			buttons: Ext.MessageBox.OK,
	    			icon: Ext.MessageBox.INFO			
	    		});			
    		break;
		case 'ERROR':
			var msg = records[0].data.messages[0];
    		Ext.Msg.show({
    			title: 'Error',
    			msg: msg,
    			buttons: Ext.MessageBox.OK,
    			icon: Ext.MessageBox.ERROR			
    		});
    		break;
			
		}
		this.close();
		
	}     
    


});
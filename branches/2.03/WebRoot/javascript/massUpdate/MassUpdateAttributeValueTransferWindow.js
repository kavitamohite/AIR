Ext.namespace('AIR');



AIR.MassUpdateAttributeValueTransferWindow = Ext.extend(Ext.Window,{
	
	constructor: function(ciTypeId,ciSubTypeId,selectedCIs,templateCIId,massUpdateAttributesStore){
		this.ciTypeId = ciTypeId;
		this.selectedCIs = selectedCIs;
		this.ciSubTypeId = ciSubTypeId;
		this.templateCIId = templateCIId,
		this.massUpdateAttributesStore = massUpdateAttributesStore,
		
		AIR.MassUpdateAttributeValueTransferWindow.superclass.constructor.call(this);
	},
	
    
    initComponent :function(){
    	var i = 0;
    	var selection = new Ext.grid.CheckboxSelectionModel({
    		    checkOnly: true,    		 
    			listeners: {
    				rowselect: function(selection, rowIndex,record ){
    					if(record.get('attributeValue')==undefined ||record.get('attributeValue')==''){
        					record.set('attributeValue','[Delecte contents]');
   					}
    				},
    				rowdeselect: function(selection, rowIndex,record){
    					if(record.get('attributeValue')=='[Delecte contents]'){
        					record.set('attributeValue','');
    					}
    				}
    			}});
    	Ext.apply(this,{
    		plain: true,
			modal: true,
    		flex: 1,
    		closeAction:'close',
    		border: false,
    		title: 'Definition of relevent fields for transfer of values',
    		
    		width: 600,
    		height: 520,
    		
			layout: 'card',//anchor border anchor vbox
			activeItem: 0,
    		
    		items: [{
    			region: 'center',
				xtype: 'panel',
				id: 'pMassUpdateAttribueValueTransferCard',				
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
    				        	xtype: 'label',
    				        	id: 'label1',
    				        	text: 'Select fields to be updated.(To delete contents, select field without prior selection of new contents)',
    				        	width: 100	
    				        	
    				        },
    				        new Ext.grid.GridPanel({
                                id:  'massUpdateAttribueValueResultGrid',
    	    					height: 350,
    	    					selModel: selection,
    	    					store: this.massUpdateAttributesStore,
    	    					border: false,
    	    					autoScroll: true,
    	    					columns: [
    	    					selection,
    	    					{
    	    						header: 'Field designation',
    	    						dataIndex: 'attributeName',
    	    						id: 'attributeName',
    	    						width: 250	
    	    					},
    	    					{
    	    						header: 'New contents',
    	    						dataIndex: 'attributeValue',
    	    						id: 'attributeValue',
    	    						width: 250
    	    					}
    	    		          ]
    	    				
    				        	
    				        }),
    				        {
    				        	xtype: 'panel',
    				        	id:  'pgpsccontact',
    				        	border: false,
    				        	layout: 'hbox',
        						style: {
        							
        							marginTop: 20
 						       },
    				        	
    				        	items:  [
    				   				        {
    			    					    	xtype: 'checkbox',
    			    					        id: 'cbGPSCContact',
    			    					        hideLabel: true,
    			        						style: {
    			        						       }

    			    				    	},
    			    				        {
    			    				        	xtype: 'fieldset',
    			    				        	id: 'fgpscContact',
    			    				        	title: 'GPSC Contacts',
    			    				        	anchor: '50%',
    			    				        	layout: 'hbox',
    			    				        	width: 300,
    			    				        	disabled: true,
    			        						style: {
    			        						},
    			    				        	items: [
    			    				        	        
    			    				        	 {
    			    				        	     xtype: 'radiogroup',
    			    				        	     id: 'rgGPSCContact',
    			    				        	     width: 200,
    			    				        	     hideLabel: true,
    			    				        	     vertical: true,
    			    				        	        	
    			    				        	     columns: 1,
    			    				        	     items: [
    			    				        	        	        
    			    				     {id: 'allContactsId',boxLabel: 'all Contacts', name: 'contact', inputValue: 'allContact', checked: true  },
    			    				     {id: 'nonEmptyContactId', boxLabel: 'only non-empty Contacts', name: 'contact', inputValue: 'nonEmptyContact'}
    			    				        	        	        
    			    				        	          ]
    			    				        	  }
    			    				        	    
    			    				        	        
    			    				        	  ]
    			    				        	
    			    				              },
    			    				              {
    			    				            	  xtype: 'button',
    			    				            	  text: 'Cancel',
    			    				            	  id: 'bMassUpdateCancel',
    			    				            	  width: 75,
    			    				            	  
    			    	        						style: {
    			    	        							fontSize: 14,
    			    	        							marginTop: 45,
    			    	        							marginLeft: 25
    			    	        						}
    			    				            	  
    			    				              },
    			    				              
    			    				              {
    			    				            	  xtype: 'button',
    			    				            	  text: 'Next',
    			    				            	  id: 'bMassUpdateNext',
    			    				            	  width: 75,
    			    				            	  
    			    	        						style: {
    			    	        							fontSize: 14,
    			    	        							marginTop: 45,
    			    	        							marginLeft: 35
    			    	        						}
    			    				            	  
    			    				              }
    				        	         
    				        	         
    				        	       ]
    				        	
    				        }



    				              
    				       ]
    			}]
        			  

    		}]
  
    		
    	});
    	AIR.MassUpdateAttributeValueTransferWindow.superclass.initComponent.call(this);
    	var cbGPSCContact = this.getComponent('pMassUpdateAttribueValueTransferCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pgpsccontact').getComponent('cbGPSCContact');
    	var bMassUpdateCancel = this.getComponent('pMassUpdateAttribueValueTransferCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pgpsccontact').getComponent('bMassUpdateCancel');
    	var bMassUpdateNext = this.getComponent('pMassUpdateAttribueValueTransferCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pgpsccontact').getComponent('bMassUpdateNext');
    	cbGPSCContact.on('check', this.enableGPSCContact, this);
    	bMassUpdateCancel.on('click',this.closeAttributeValueTransferWindow,this);
    	bMassUpdateNext.on('click',this.massUpdate,this);
    	    	
    },
	enableGPSCContact: function(checkbox, isChecked){
		
		fgpscContact = this.getComponent('pMassUpdateAttribueValueTransferCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pgpsccontact').getComponent('fgpscContact');		
		if(isChecked){
			fgpscContact.enable();
		}else{
			fgpscContact.disable();
		}
	},
    
    closeAttributeValueTransferWindow :function(button, event){
    	this.close();
        Ext.Msg.show({
            title: 'mass update',
            msg: 'Transfer cancelled!',
            modal: false,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    },
	
	massUpdate :function(button, event){
		var massUpdateData = new Object();
		massUpdateData.token = AAM.getToken();
		massUpdateData.cwid = AAM.getCwid();
		massUpdateData.templateCiId = AAM.getCiId();
		massUpdateData.ciTypeId = AAM.getTableId();
		massUpdateData.ciSubTypeId = AAM.getCiSubTypeId();
		massUpdateData.selectedCIs = AAM.getSelectedCiIds();
		var cbGPSCContact =this.getComponent('pMassUpdateAttribueValueTransferCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pgpsccontact').getComponent('cbGPSCContact');
		if(cbGPSCContact.getValue()){
			var rgGPSCContact = this.getComponent('pMassUpdateAttribueValueTransferCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('pgpsccontact').getComponent('fgpscContact').getComponent('rgGPSCContact');
			if(rgGPSCContact.getValue().inputValue=='allContact'){
				massUpdateData.allGPSCContacts=true;
			}else{
				massUpdateData.nonEmptyGPSCContacts=true;
			}			
		}
		var selModel = this.getComponent('pMassUpdateAttribueValueTransferCard').getComponent('pMassUpdateValueTransferGridCard').getComponent('massUpdateAttribueValueResultGrid').getSelectionModel();
		var selectedRows = selModel.getSelections();
		for( var i = 0; i < selectedRows.length; i++) {
			var attribute = selectedRows[i].id;
			massUpdateData[attribute]=true;
		}
		
		AAM.setMassUpdateData(massUpdateData);
		
		Ext.Msg.show({
			title: 'Start mass update',
			msg: 'You are  in mass update mode. Are you sure that you want to update all elements marked in the listwith the data that you have just entered.',
			buttons: Ext.Msg.YESNO,
			fn: this.massUpdateValueTransfer,
			scope: this,
			   //animEl: 'elId',
			icon: Ext.MessageBox.INFO			
		});		
		
	},
    
    massUpdateValueTransfer :function(button){
    	var massUpdateSaveStore;
    	if(button == 'yes'){
    		massUpdateSaveStore = AIR.AirStoreFactory.createMassUpdateSaveStore();
    		massUpdateSaveStore.on('beforeload', this.onBeforeMassUpdate, this);
    		massUpdateSaveStore.on('load', this.onMassUpdate, this);
    		massUpdateSaveStore.load({
    			params: AAM.getMassUpdateData()
    		});
    		
    	}else{
    		Ext.Msg.show({
    			title: 'Transfer Canceled',
    			msg: 'Transfer Canceled.',
    			buttons: Ext.MessageBox.OK,
    			icon: Ext.MessageBox.INFO			
    		});
    		this.close();
    	}
    },
    onBeforeMassUpdate :function(store, options){
		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		saveMask.show();
    },
	onMassUpdate :function(store, records, options){
		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		saveMask.hide();
		switch(records[0].data.result) {
		case 'OK':
			var massUpdateData=AAM.getMassUpdateData();
			if(massUpdateData.itsecGroupId){
	    		Ext.Msg.show({
	    			title: 'Mass update completed',
	    			msg: 'Mass update completed.',
	    			buttons: Ext.MessageBox.OK,
	    			fn: this.massUpdateConfirmation,
	    			scope: this,
	    			icon: Ext.MessageBox.INFO			
	    		});
			}else{
	    		Ext.Msg.show({
	    			title: 'Mass update completed',
	    			msg: 'Mass update completed.',
	    			buttons: Ext.MessageBox.OK,
	    			icon: Ext.MessageBox.INFO			
	    		});
			}
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
		
	},
	massUpdateConfirmation :function(button){
		Ext.Msg.show({
			title: 'Compliance Status',
			msg: 'Do you want to select single compliance statuses only?',
			buttons: Ext.Msg.YESNOCANCEL,
			fn: this.massUpdateComplianceStatusTransfer,
			scope: this,
			   //animEl: 'elId',
			icon: Ext.MessageBox.INFO			
		});	
	},
    
    massUpdateComplianceStatusTransfer :function(button){
    	if(button == 'yes'){
    		var massUpdateData = AIR.AirApplicationManager.getMassUpdateData();
    		var massUpdateComplianceControlsStore = AIR.AirStoreFactory.createMassUpdateComplianceControlsStore();
    		var params = {
					cwid: massUpdateData.cwid,
					token: massUpdateData.token,
				 	ciId: massUpdateData.templateCiId,
				 	ciTypeId: massUpdateData.ciTypeId
    		};
    		massUpdateComplianceControlsStore.load({
    			params: params
    		});
    		var  complianceCotrolSelectionWindow = new AIR.MassUpdateComplianceCotrolSelectionWindow(massUpdateComplianceControlsStore);
    		complianceCotrolSelectionWindow.show();
    		
    	}else{
    		if(button == 'no'){
    			alert('NO');
    		}else{
	    		Ext.Msg.show({
	    			title: 'Compliance Status',
	    			msg: 'Compliance Status Transfer cancelled.',
	    			buttons: Ext.MessageBox.OK,
	    			icon: Ext.MessageBox.INFO			
	    		});
    		}
    	}
    }

});
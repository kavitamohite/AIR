Ext.namespace('AIR');

AIR.CiCopyFromDetailView = Ext.extend(AIR.AirView, {//Ext.Panel
	SAP_APP_CAT1: 'SAP Application only',
	SAP_APP_CAT2: 'SAP other',
	
	MAX_NUMBER_LENGTH: 4,
	
	initComponent: function() {
		this.objectNameAllowedStore = AIR.AirStoreFactory.createObjectNameAllowedStore();//getObjectNameAllowedStore
		this.objectAliasAllowedStore = AIR.AirStoreFactory.createObjectAliasAllowedStore();//getObjectAliasAllowedStore
		
		this.objectNameAllowedStore.on('load', this.onNameValidated, this);
		this.objectAliasAllowedStore.on('load', this.onAliasValidated, this);
		
		
		Ext.apply(Ext.form.VTypes, {
			numberLength: this.validateNumberLength.createDelegate(this)
			//numberLengthText: 'Wert muss eine Dezimalzahl sein'//language Datei!
		});
		
		Ext.apply(this, {
//	    	layout: 'fit',////(*1)
			layout: 'form',
	    	title: 'Details',
	    	
	    	height: 300,

	    	monitorResize: true,
	        border: false,
	        
	        bodyStyle: {
	        	backgroundColor: panelbgcolor,
	        	color: fontColor,
	        	fontFamily: fontType,
	        	padding: 5
	        },
	        
	        items: [{
	        	xtype: 'panel',
	        	id: 'p1CopyFrom',
	        	  
	        	layout: 'form',
	        	border: false,
        		  
	        	items: [{
	  	        	xtype: 'panel',
	  	        	id: 'pCopyFromTemplate',
	  	        	border: false,
	  	            layout: 'hbox',
	  	            
//			    	style: {
//				    	marginTop: 5
//				    },
	  	            
	  				items: [{
	  					id: 'lCopyFromTemplate',
	  					xtype: 'label',
	  					width: 200,
	  					
	  				    style: {
	  				    	fontSize: '12px'
	  				    }
	  		        },{
//	  					id: 'lCopyFromCiTemplateName',
//	  					xtype: 'label',
//	  				    style: {
//	  				    	fontSize: '12px'
//	  				    }
	  		        	
	  		        	
	  		        	xtype: 'textfield',
	  		        	id: 'tfCopyFromTemplate',
	  		        	width: 240,
	  		        	disabled: true
	  		        	
//	  		        	fieldLabel: 'Template',
//	  		        	labelWidth: 200,
	  		        }]
	        	  },{
	        		  xtype: 'panel',
	        		  id: 'p11CopyFrom',
	        		  
	        		  layout: 'hbox',
	        		  border: false,

			    	style: {
				    	marginTop: 5
				    },
	        		  
		        	  items: [{
							id: 'l11CopyFrom',
							xtype: 'label',
							text: 'Name',
							width: 200,
							cls: ' x-form-text-required',
							
						    style: {
						    	fontSize: '12px',
						    	fontWeight: 'bold'
						    }
		        	  },{
		        		  xtype: 'panel',
		        		  id: 'p111CopyFrom',
		        		  
		        		  layout: 'card',
		        		  activeItem: 0,
		        		  border: false,
		        			  
		        		  items: [{
			        		  xtype: 'panel',
			        		  id: 'pSapName',
			        		  
			        		  layout: 'fit',
			        		  border: false,
			        		  
			        		  items: [{
				        		  xtype: 'textfield',
				        		  id: 'tfSapNameCopyFrom1',
				        		  
				        		  maskRe: /[0-9a-zA-Z#=\+\-\_\/\\. ]/,
				        		  allowBlank: false,
				        		  
			        			  width: 100
				        	  }, {
				        		  xtype: 'textfield',
				        		  width: 20,
			        			  value: 'M',
			        			  disabled: true
				        	  }, {
				        		  xtype: 'textfield',
				        		  id: 'tfSapNameCopyFrom2',
				        		  
				        		  maskRe: /[0-9]/,
				        		  vtype: 'numberLength',
				        		  allowBlank: false,
				        		  
			        			  width: 50
				        	  }, {
				        		  xtype: 'textfield',
				        		  width: 20,
			        			  value: 'C',
			        			  disabled: true
				        	  }, {
				        		  xtype: 'textfield',
				        		  id: 'tfSapNameCopyFrom3',
				        		  
				        		  maskRe: /[0-9]/,
				        		  vtype: 'numberLength',
				        		  allowBlank: false,
				        		  
			        			  width: 50
			        		  }]
		        		  },{
			        		  xtype: 'textfield',
			        		  id: 'tfCopyFromApplicationName',
			        		  
			        		  allowBlank: false,
			        		  //vtype: 'allowedNameCopyFrom',//allowedName
			        		  			        		  
		        			  width: 240,
		        			  
		        			  listeners: {
		        				  change: function(field, newValue, oldValue) {
		        					  this.objectNameAllowedStore.setBaseParam('query', newValue);
		        					  this.objectNameAllowedStore.load();
		        				  }.createDelegate(this)
		        			  }
		        		  }]
		        	  }]
	        	  }, {
	        		  xtype: 'panel',
	        		  id: 'p12CopyFrom',
	        		  
	        		  layout: 'hbox',
	        		  border: false,
	        		  
		        	  items: [{
		        		  id: 'lCopyFromApplicationAlias',
		        		  xtype: 'label',
		        		  text: 'Alias',
		        		  width: 200,
		        		  cls: ' x-form-text-required',

		        		  margins: '5 0 0 0',
		        		  style: {
		        			  fontSize: '12px',
		        			  fontWeight: 'bold'
		        		  }
		        	  }, {
		        		  xtype: 'textfield',
		        		  id: 'tfCopyFromApplicationAlias',
		        		  
		        		  allowBlank: false,
		        		  //vtype: 'allowedAliasCopyFrom',//allowedAlias 
		        		  
	        			  width: 240,
	        			  margins: '5 0 0 0',
	        				  
        				  listeners: {
        					  change: function (field, newValue, oldValue) {
								  this.objectAliasAllowedStore.setBaseParam('query', newValue);
								  this.objectAliasAllowedStore.load();
        					  }.createDelegate(this)
        				  }
		        	  }]
	        	  }]
	        },{
	        	xtype: 'panel',
	        	id: 'pCopyFromDetailsSouthRegion',
	        	border: false,
	        	
	            layout: 'table',//USE column oder hbox layout here!!
				layoutConfig: {
					columns: 3
				},
				
				style: {
					marginTop: 20
				},
	        	
	        	items: [{
					xtype: 'button',
					id: 'bCopyFromBack',
					text: 'Back',
					width: 50
		        }, {
					xtype: 'button',
					id: 'bCopyFromCancel',
					text: 'Cancel',
					width: 50,
					
					style: {
						marginLeft: 5
					}
		        }, {
					xtype: 'button',
					id: 'bCopyFromCopy',
					text: 'Kopieren',
					width: 50,
					
					style: {
						marginLeft: 5
					}
		        }]
	        }]
	        
	        
//	        items: [{//(*1)
//	        	xtype: 'tabpanel',
//	            activeTab: 0,
//	            border: false,
//	            
//	            items: [{
//	            	id: 'CopyFromCiDetails',
//	                title: 'CiDetails',
//	                xtype: 'AIR.CiDetailsView',
//	                border: false
//	            }, {
//					id: 'CopyFromCiSpecifics',
//	            	title: 'Ci Specifics',
//					xtype: 'AIR.CiSpecificsView',
//					border: false
//	            }, {
//					id: 'CopyFromCiContacts',
//	            	title: 'Ci Contacts',
//					xtype: 'AIR.CiContactsView',
//					border: false
//	            }, {
//					id: 'CopyFromCiAgreements',
//	            	title: 'Ci Agreements',
//					xtype: 'AIR.CiAgreementsView',
//					border: false
//	            }, {
//					id: 'CopyFromCiProtection',
//	            	title: 'Ci Protection',
//					xtype: 'AIR.CiProtectionView',
//					border: false
//	            }, {
//					id: 'CopyFromCiCompliance',
//	            	title: 'Ci Compliance',
//					xtype: 'AIR.CiComplianceView',
//					border: false
//	            }, {
//					id: 'CopyFromCiLicense',
//	            	title: 'Ci License',
//					xtype: 'AIR.CiLicenseView',
//					border: false
//	            }, {
//					id: 'CopyFromCiConnections',
//	            	title: 'Ci Connections',
//					xtype: 'AIR.CiConnectionsView',
//					border: false
//	            }, {
//					id: 'CopyFromCiSupportStuff',
//	            	title: 'Ci SupportStuff',
//					xtype: 'AIR.CiSupportStuffView',
//					border: false
//	            }]
//	        }]
		});
		
		this.addEvents('copyApplication');
		
		AIR.CiCopyFromDetailView.superclass.initComponent.call(this);
	},
	
	onNameValidated: function(store, records, options) {
		var isValid = store.getAt(0) ? this.objectNameAllowedStore.getAt(0).data.countResultSet == 0 : false;
		
		var tfCopyFromApplicationName = this.getComponent('p1CopyFrom').getComponent('p11CopyFrom').getComponent('p111CopyFrom').getComponent('tfCopyFromApplicationName');
		if(isValid) {
			tfCopyFromApplicationName.clearInvalid();
		} else {
			var message = AC.VALIDATION_MESSAGE_NAME.replace('{0}', tfCopyFromApplicationName.getValue());
			tfCopyFromApplicationName.markInvalid(message);
		}
	},
	onAliasValidated: function(store, records, options) {
		var isValid = store.getAt(0) ? this.objectAliasAllowedStore.getAt(0).data.countResultSet == 0 : false;
		
		var tfCopyFromApplicationAlias = this.getComponent('p1CopyFrom').getComponent('p12CopyFrom').getComponent('tfCopyFromApplicationAlias');
		if(isValid) {
			tfCopyFromApplicationAlias.clearInvalid();
		} else {
			var message = AC.VALIDATION_MESSAGE_ALIAS.replace('{0}', tfCopyFromApplicationAlias.getValue());
			tfCopyFromApplicationAlias.markInvalid(message);
		}
	},
	
	onCopyApplication: function(button, event) {
//		if(this.applicationCat2 == this.SAP_APP_CAT) {
		
//		var tfCopyFromApplicationName = this.getComponent('tfCopyFromApplicationName');
//		var tfCopyFromApplicationAlias = this.getComponent('tfCopyFromApplicationAlias');
//		
//		var appName = tfCopyFromApplicationName.getValue();
//		var appAlias = tfCopyFromApplicationAlias.getValue();
		
		
		var errorFields = this.isCopyFromDataValid();
		if(errorFields.length == 0) {//tfCopyFromApplicationName.isValid()
//			this.fireEvent('copyApplication', appName, appAlias);
			
			var tfCopyFromApplicationAlias = this.getComponent('p1CopyFrom').getComponent('p12CopyFrom').getComponent('tfCopyFromApplicationAlias');
			var pName = this.getComponent('p1CopyFrom').getComponent('p11CopyFrom').getComponent('p111CopyFrom');
			var appName;
			
			var data = {
				ciAliasTarget: tfCopyFromApplicationAlias.getValue()
//				ciIdSource: this.ciId,
//				ciNameTarget: appName,
//				tableIdSource: this.CI_TYPE_APPLICATION
			};
			
			if(this.applicationCat2 == this.SAP_APP_CAT1 || this.applicationCat2 == this.SAP_APP_CAT2) {//implement as Business Rule!
				var tfSapNameCopyFrom1 = pName.getComponent('pSapName').getComponent('tfSapNameCopyFrom1');
				var tfSapNameCopyFrom2 = pName.getComponent('pSapName').getComponent('tfSapNameCopyFrom2');
				var tfSapNameCopyFrom3 = pName.getComponent('pSapName').getComponent('tfSapNameCopyFrom3');
				
				appName = tfSapNameCopyFrom1.getValue() + 'M' + tfSapNameCopyFrom2.getValue() + 'C' + tfSapNameCopyFrom3.getValue();
			} else {
				var tfCopyFromApplicationName = pName.getComponent('tfCopyFromApplicationName');
				
				appName = tfCopyFromApplicationName.getValue();
			}
			
			data.ciNameTarget = appName;
			
			this.fireEvent('copyApplication', data);
		} else {
			var message = 'Please correct the following:';//languagestore.data.items[0].data['wizardDataNotValid'].replace(/##/, '');
			message += '<br/>' + errorFields;//this.getComponent('tfCopyFromApplicationName').fieldLabel;//Ext.getCmp('lCopyFromTemplate').getValue();//this.getComponent('pCopyFromTemplate').getComponent('lCopyFromCiTemplateName').getValue();
			
			Ext.MessageBox.show({
			   title: 'Error',
			   msg: message,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.ERROR
			});
		}
	},
	
	
	update: function(applicationName, applicationCat2) {
		this.applicationCat2 = applicationCat2;
		var pName = this.getComponent('p1CopyFrom').getComponent('p11CopyFrom').getComponent('p111CopyFrom');
		
//		var pCopyFromTemplate = this.getComponent('pCopyFromTemplate');
//		var lCopyFromCiTemplateName = pCopyFromTemplate.getComponent('lCopyFromCiTemplateName');
//		lCopyFromCiTemplateName.setText(applicationName);
		
		this.getComponent('p1CopyFrom').getComponent('pCopyFromTemplate').getComponent('tfCopyFromTemplate').setValue(applicationName);

		var tfCopyFromApplicationAlias = this.getComponent('p1CopyFrom').getComponent('p12CopyFrom').getComponent('tfCopyFromApplicationAlias');
		tfCopyFromApplicationAlias.reset();
		
		var labels = AIR.AirApplicationManager.getLabels();
		
		if(this.applicationCat2 == this.SAP_APP_CAT1 || this.applicationCat2 == this.SAP_APP_CAT2) {
			pName.getLayout().setActiveItem(0);
			
			var tfSapNameCopyFrom1 = pName.getComponent('pSapName').getComponent('tfSapNameCopyFrom1');
			tfSapNameCopyFrom1.reset();
			var tfSapNameCopyFrom2 = pName.getComponent('pSapName').getComponent('tfSapNameCopyFrom2');
			tfSapNameCopyFrom2.reset();
			var tfSapNameCopyFrom3 = pName.getComponent('pSapName').getComponent('tfSapNameCopyFrom3');
			tfSapNameCopyFrom3.reset();
			
			var label = labels.wizardapplicationNameSAP1 + ', ' + labels.wizardapplicationNameSAP2 + ', ' + labels.wizardapplicationNameSAP3;
		} else {
			pName.getLayout().setActiveItem(1);
			
			var tfCopyFromApplicationName = pName.getComponent('tfCopyFromApplicationName');//this
			tfCopyFromApplicationName.reset();
			
			label = labels.wizardapplicationName;
		}
		
		this.getComponent('p1CopyFrom').getComponent('p11CopyFrom').getComponent('l11CopyFrom').setText(label);
	},
	
	isCopyFromDataValid: function() {
		var errorFields = '';
		
		var p111CopyFrom = this.getComponent('p1CopyFrom').getComponent('p11CopyFrom').getComponent('p111CopyFrom');
		
		if(this.applicationCat2 == this.SAP_APP_CAT1 || this.applicationCat2 == this.SAP_APP_CAT2) {
			var tfSapNameCopyFrom1 = p111CopyFrom.getComponent('pSapName').getComponent('tfSapNameCopyFrom1');
			var tfSapNameCopyFrom2 = p111CopyFrom.getComponent('pSapName').getComponent('tfSapNameCopyFrom2');
			var tfSapNameCopyFrom3 = p111CopyFrom.getComponent('pSapName').getComponent('tfSapNameCopyFrom3');
			
			if(!tfSapNameCopyFrom1.isValid())
				errorFields += 'SAP Name1';
			if(!tfSapNameCopyFrom2.isValid()) {
				if(errorFields.length > 0)
					errorFields += '<br/>';
				errorFields += 'SAP Name2';
			}
			if(!tfSapNameCopyFrom3.isValid()) {
				if(errorFields.length > 0)
					errorFields += '<br/>';
				errorFields += 'SAP Name3';
			}
		} else {
			var tfCopyFromApplicationName = p111CopyFrom.getComponent('tfCopyFromApplicationName');
			
			if(!tfCopyFromApplicationName.isValid()) {
				if(errorFields.length > 0)
					errorFields += '<br/>';
				errorFields += 'Name';
			}
		}
		
		var tfAlias = this.getComponent('p1CopyFrom').getComponent('p12CopyFrom').getComponent('tfCopyFromApplicationAlias');
		
		if(!tfAlias.isValid()) {
			if(errorFields.length > 0)
				errorFields += '<br/>';
			errorFields += 'Alias';
		}
		
		return errorFields;
		
//		var tfCopyFromApplicationName = this.getComponent('tfCopyFromApplicationName');
//		return tfCopyFromApplicationName.isValid();
		
//		var tfCopyFromApplicationName = this.getComponent('tfCopyFromApplicationName');
//		var tfCopyFromApplicationAlias = this.getComponent('tfCopyFromApplicationAlias');
	},
	
	validateNumberLength: function(value, field) {
		if(value.length > this.MAX_NUMBER_LENGTH) {
			value = value.substring(0, this.MAX_NUMBER_LENGTH);
			field.setRawValue(value);
		}
		
		return value.length <= this.MAX_NUMBER_LENGTH && value.length > 0;
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCopyFromDetailViewTitle);
		
		this.getComponent('p1CopyFrom').getComponent('pCopyFromTemplate').getComponent('lCopyFromTemplate').setText(labels.ciCopyFromDetailViewHeaderLabel);
				
		this.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromBack').setText(labels.button_general_back);
		this.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromCancel').setText(labels.button_general_cancel);
		this.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromCopy').setText(labels.button_general_copy);
		
		if(this.applicationCat2 == this.SAP_APP_CAT1 || this.applicationCat2 == this.SAP_APP_CAT2) {
			var sapNameLabel = labels.wizardapplicationNameSAP1 + ', ' + labels.wizardapplicationNameSAP2 + ', ' + labels.wizardapplicationNameSAP3;
			this.getComponent('p1CopyFrom').getComponent('p11CopyFrom').getComponent('l11CopyFrom').setText(sapNameLabel);
		} else {
			this.getComponent('p1CopyFrom').getComponent('p11CopyFrom').getComponent('l11CopyFrom').setText(labels.wizardapplicationName);
		}
	}
});
Ext.reg('AIR.CiCopyFromDetailView', AIR.CiCopyFromDetailView);
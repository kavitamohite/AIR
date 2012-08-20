Ext.namespace('AIR');

AIR.CiSupportStuffView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Support Stuff',
		    
		    autoScroll: true,
		    border: false,
		    padding: 10,
		    
		    layout: 'anchor',//form
		    
		    
		    items: [{
		        xtype: 'fieldset',
		        id: 'supportStuffApplication',
		        title: 'Application',
		        labelWidth: 200,
		        height: 160,//160 180
		        
		        layout: 'form',
		        anchor: '60%',
		        
				items: [/*{
					xtype: 'panel',
					id: 'pSupportstuffAppDoc',
					layout: 'hbox',
					anchor: '100%',
					border: false,
					
					items: [{
						xtype: 'label',
						id: 'labelsupportstuffAppDoc',
						text: 'ApplicationDocu',
						width: 205,
//						flex: 5,
						
					    style: {
					    	fontSize: '12px'
					    }
			    	},{
				    	xtype: 'textfield',
				        id: 'supportstuffAppDoc',
				        // fieldLabel: 'ApplicationDocu',
				        
//				    	flex: 25,
				    	width: 240,
				    	
				        enableKeyEvents: true,
				        allowBlank: true
					}, {
				    	xtype: 'commandlink',
				    	id: 'supportstuffAppDocTestButton',
				    	img: img_TestLink,
				    	
				    	hidden: true,
				    	margins: '0 0 0 5'
//				    	flex: 1
				    }]
				},*/
				{
					xtype: 'container',
					id: 'pSupportstuffAppDoc',
					
//					layout: 'table',
//					layoutConfig: {
//						columns: 3
//					},
//					layout: 'hbox',
					layout: 'column',
					
			        style: {
			        	marginBottom: 5
			        },
					
					items: [{
						xtype: 'label',
						id: 'labelsupportstuffAppDoc',
						text: 'ApplicationDocu',
						width: 205,
//						flex: 5,
						
					    style: {
					    	fontSize: 12
					    }
					},{
				    	xtype: 'textfield',
				        id: 'supportstuffAppDoc',

//				    	anchor: '100%',
//				    	width: 240,
				    	columnWidth: .90,
				    	
//				        fieldLabel: 'ApplicationDocu',
				        enableKeyEvents: true,
				        allowBlank: true
			        },{
				    	xtype: 'commandlink',
				    	id: 'supportstuffAppDocTestButton',
				    	img: img_TestLink,
				    	
				    	columnWidth: .10,
				    	
				    	hidden: true
			        }]
				},{
			    	xtype: 'textfield',
			    	anchor: '93%',
//			    	width: 240,
			        fieldLabel: 'RootDirectory',
			        id: 'supportstuffAppRootDir'
			        
//			        enableKeyEvents: true,
//			        allowBlank: true
				},{
			    	xtype: 'textfield',
			    	anchor: '93%',
//			    	width: 240,
			        fieldLabel: 'DataDirectory',
			        id: 'supportstuffAppDataDir'
			        
//			        enableKeyEvents: true,
//			        allowBlank: true
				},{
			    	xtype: 'textfield',
			    	anchor: '93%',
//			    	width: 240,
			    	fieldLabel: 'Provided Services',
			        id: 'supportstuffAppProvidedServices'
			        
//			        enableKeyEvents: true,
//			        allowBlank: true
				},{
			    	xtype: 'textfield',
			    	anchor: '93%',
//			    	width: 240,
			        fieldLabel: 'Provided Machine Users',
			        id: 'supportstuffAppProvidedMUser'
			        
//			        enableKeyEvents: true,
//			        allowBlank: true
				}]
			}/*,{
		        xtype: 'fieldset',
		        id: 'supportStuffChangeManagement',
		        title: 'ChangeManagement',
		        labelWidth: 200,
		        hidden: true,
		        
		        layout: 'form',
		        anchor: '80%',
		        
				items: [{
					xtype: 'container',
					id: 'pSupportStuffChangeManagement',
					layout: 'hbox',
					
					items: [{
						xtype: 'label',
						id: 'labelsupportstuffCMSupportingTool',
						text: 'ChangeMan. by Tool',
						width: 205,
						flex: 5,
						
					    style: {
					    	fontSize: '12px'
					    }
			    	},{
				    	xtype: 'textfield',
				    	id: 'supportstuffCMSupportingTool',
				        // fieldLabel: 'ChangeMan. by Tool',
				    	
				    	flex: 20,
				        
				        enableKeyEvents: true,
				        allowBlank: true,
	  	   		        listeners: {
				    		change: function(textfield, newValue, oldValue) {
				    			this.activateTestLinkButton('supportstuffCMSupportingTool', 'supportstuffCMSupportingToolTestButton');
//				    			activateButtonSaveApplication();
			    				this.fireEvent('ciChange', this, textfield, newValue);
				    		}.createDelegate(this)
			        	}
					}, {
						xtype: 'panel',
						layout: 'fit',
						margins: '0 0 0 2',
						

//						items: [{
//							xtype: 'panel',
//							layout: 'fit',
							
							items: [{
						    	html: '<img src="' + img_TestLink + '" onclick="testLink(\'supportstuffCMSupportingTool\');" >',
						    	id: 'supportstuffCMSupportingToolTestButton',
						    	cls: 'aircontactbuttonenabled'
							}]
//						}]
				    }]
				}]
			}*//*, {
				//damit das letzte Element sauber dargestellt wird. Keine Zeit den wahren Grund zu finden,
				//warum das nicht ohne geht.
				xtype: 'container',
//				height: 10
				html: '&nbsp;'
			}*/]
		});
		
		AIR.CiSupportStuffView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		var clSupportstuffAppDocTest = this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDocTestButton');
		clSupportstuffAppDocTest.on('click', this.onSupportstuffAppDocTest, this);
		
		
		var tfSupportstuffAppDoc = this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDoc');
		var tfSupportstuffAppRootDir = this.getComponent('supportStuffApplication').getComponent('supportstuffAppRootDir');
		var tfSupportstuffAppDataDir = this.getComponent('supportStuffApplication').getComponent('supportstuffAppDataDir');
		var tfSupportstuffAppProvidedServices = this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedServices');
		var tfSupportstuffAppProvidedMUser = this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedMUser');
		
		tfSupportstuffAppDoc.on('change', this.onSupportstuffAppDocChange, this);
		tfSupportstuffAppRootDir.on('change', this.onSupportstuffAppRootDirChange, this);
		tfSupportstuffAppDataDir.on('change', this.onSupportstuffAppDataDirChange, this);
		tfSupportstuffAppProvidedServices.on('change', this.onSupportstuffAppProvidedServicesChange, this);
		tfSupportstuffAppProvidedMUser.on('change', this.onSupportstuffAppProvidedMUserChange, this);
	},
	
	onSupportstuffAppDocChange: function(textfield, newValue, oldValue) {
//		this.activateTestLinkButton('supportstuffAppDoc', 'supportstuffAppDocTestButton');
		var tfSupportstuffAppDoc = this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDoc');
		var clSupportstuffAppDoc = this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDocTestButton');
		
		this.activateTestLinkButton(tfSupportstuffAppDoc, clSupportstuffAppDoc);
		
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
	},
	onSupportstuffAppRootDirChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
	},
	onSupportstuffAppDataDirChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
	},
	onSupportstuffAppProvidedServicesChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
	},
	onSupportstuffAppProvidedMUserChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
	},
	
	
	onSupportstuffAppDocTest: function(link, event) {
		this.testLink('supportstuffAppDoc');
	},
	
	activateTestLinkButton: function(cmpValueName, cmpButtonName) {
		// field = this.getComponent(cmpValueName);
		// field disabled ?

//		var button = this.getComponent(cmpButtonName);
//		var value = this.getComponent(cmpValueName).getValue();
		
		var button = cmpButtonName;
		var value = cmpValueName.getValue();

		if (undefined !== value) {
			value = value.toLowerCase();
			if (value.indexOf('http://') > -1 || value.indexOf('https://') > -1 || value.indexOf('notes://') > -1) {
				button.setVisible(true);//show() setVisible(true);
			} else {
				button.setVisible(false);//hide() setVisible(false);
			}
			
			this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').doLayout();
		} else {
			button.hide();
		}
	},
	
	testLink: function(cmp) {
		url = Ext.get(cmp).getValue();
		// alert(url);
		
		window.open(url,'','scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,location=no,status=no');
	},
	
	update: function(data) {
		this.doLayout();//.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc')
		
//		this.activateTestLinkButton('supportstuffAppDoc', 'supportstuffAppDocTestButton');
		var tfSupportstuffAppDoc = this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDoc');
		var clSupportstuffAppDoc = this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDocTestButton');
		
		this.activateTestLinkButton(tfSupportstuffAppDoc, clSupportstuffAppDoc);

		//setzen der Felder erfolgt in CiEditTabView.onLoadApplication in for Schleife. Auch hier dezentralisieren?
		if (data.pSupportstuffAppDoc && data.pSupportstuffAppDoc != 0) {
			this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDoc').setValue(data.supportstuffAppDoc);
		} else {
			this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDoc').setValue('');
		}
		if (data.supportstuffAppRootDir && data.supportstuffAppRootDir != 0) {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppRootDir').setValue(data.supportstuffAppRootDir);
		} else {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppRootDir').setValue('');
		}
		if (data.supportstuffAppDataDir && data.supportstuffAppDataDir != 0) {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppDataDir').setValue(data.supportstuffAppDataDir);
		} else {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppDataDir').setValue('');
		}
		if (data.supportstuffAppProvidedServices && data.supportstuffAppProvidedServices != 0) {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedServices').setValue(data.supportstuffAppProvidedServices);
		} else {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedServices').setValue('');
		}
		if (data.supportstuffAppProvidedMUser && data.supportstuffAppProvidedMUser != 0) {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedMUser').setValue(data.supportstuffAppProvidedMUser);
		} else {
			this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedMUser').setValue('');
		}
		
		this.updateAccessMode(data);
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDoc'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('supportStuffApplication').getComponent('supportstuffAppRootDir'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('supportStuffApplication').getComponent('supportstuffAppDataDir'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedServices'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedMUser'), data);
	},
	
	//getData: function() {
	setData: function(data) {
		//var data = {};
		
			// SUPPORT_STUFF
	//		field = this.getComponent('supportstuffUASupportingDoc');
	//		if (!field.disabled) {
	//			applicationSaveStore.setBaseParam('ciSupportStuffUserAuthorizationSupportedByDocumentation', field.getValue());
	//		}
	//		field = this.getComponent('supportstuffUAProcess');
	//		if (!field.disabled) {
	//			applicationSaveStore.setBaseParam('ciSupportStuffUserAuthorizationProcess', field.getValue());
	//		}
	//		field = this.getComponent('supportstuffUMProcess');
	//		if (!field.disabled) {
	//			applicationSaveStore.setBaseParam('ciSupportStuffUserManagementProcess', field.getValue());
	//		}

		
//		var field = this.getComponent('supportStuffChangeManagement').getComponent('pSupportStuffChangeManagement').getComponent('supportstuffCMSupportingTool');
//		if(!field.disabled)
//			data.ciSupportStuffChangeManagementSupportedByTool = field.getValue();
		
		field = this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('supportstuffAppDoc');
		if(!field.disabled)
			data.ciSupportStuffApplicationDocumentation = field.getValue();
		
		field = this.getComponent('supportStuffApplication').getComponent('supportstuffAppRootDir');
		if(!field.disabled)
			data.ciSupportStuffRootDirectory = field.getValue();
		
		field = this.getComponent('supportStuffApplication').getComponent('supportstuffAppDataDir');
		if(!field.disabled)
			data.ciSupportStuffDataDirectory = field.getValue();
		
		field = this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedServices');
		if(!field.disabled)
			data.ciSupportStuffProvidedServices = field.getValue();
		
		field = this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedMUser');
		if(!field.disabled)
			data.ciSupportStuffProvidedMachineUsers = field.getValue();		
		
		
		return data;
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.supportStuffPanelTitle);
		this.getComponent('supportStuffApplication').setTitle(labels.supportStuffApplication);
		
		this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('labelsupportstuffAppDoc').setText(labels.supportstuffAppDoc);
		this.setFieldLabel(this.getComponent('supportStuffApplication').getComponent('supportstuffAppRootDir'), labels.supportstuffAppRootDir);
		this.setFieldLabel(this.getComponent('supportStuffApplication').getComponent('supportstuffAppDataDir'), labels.supportstuffAppDataDir);
		this.setFieldLabel(this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedServices'), labels.supportstuffAppProvidedServices);
		this.setFieldLabel(this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedMUser'), labels.supportstuffAppProvidedMUser);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.getComponent('supportStuffApplication').getComponent('pSupportstuffAppDoc').getComponent('labelsupportstuffAppDoc'), toolTips.supportstuffAppDoc, toolTips.supportstuffAppDocText);//'labelsupportstuffAppDoc'
		this.setTooltipData(this.getComponent('supportStuffApplication').getComponent('supportstuffAppRootDir').label, toolTips.supportstuffAppRootDir, toolTips.supportstuffAppRootDirText);
		this.setTooltipData(this.getComponent('supportStuffApplication').getComponent('supportstuffAppDataDir').label, toolTips.supportstuffAppDataDir, toolTips.supportstuffAppDataDirText);
		this.setTooltipData(this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedServices').label, toolTips.supportstuffAppProvidedServices, toolTips.supportstuffAppProvidedServicesText);
		this.setTooltipData(this.getComponent('supportStuffApplication').getComponent('supportstuffAppProvidedMUser').label, toolTips.supportstuffAppProvidedMUser, toolTips.supportstuffAppProvidedMUserText);
		
//		this.setTooltipData('supportstuffUASupportingDoc', toolTips.supportstuffUASupportingDoc, toolTips.supportstuffUASupportingDocText);
//		this.setTooltipData('supportstuffUAProcess', toolTips.supportstuffUAProcess, toolTips.supportstuffUAProcessText);
//		this.setTooltipData('supportstuffCMSupportingTool', toolTips.supportstuffCMSupportingTool, toolTips.supportstuffCMSupportingToolText);
//		this.setTooltipData('supportstuffUMProcess', toolTips.supportstuffUMProcess, toolTips.supportstuffUMProcessText);
	}
});
Ext.reg('AIR.CiSupportStuffView', AIR.CiSupportStuffView);
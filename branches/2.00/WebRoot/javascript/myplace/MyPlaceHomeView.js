Ext.namespace('AIR');

AIR.MyPlaceHomeView = Ext.extend(AIR.AirView, {//Ext.Panel
	
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
			border: false,
			buttonAlign: 'left',
			padding: 20,
			
		    layout: 'form',
		    height: 450,
		    
		    items: [{
		    	xtype: 'label',
		    	id: 'myplacepanelheader',
				
				style: {
					textAlign: 'left',
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '12pt'
				}
			}, { 
				xtype: 'container',	  
				html: '',
				id: 'myplacepanelsubheader',
		        height: 24,
				cls: 'x-plain',
				style: {
			  	  	textAlign: 'left',
			  	  	backgroundColor: AC.AIR_BG_COLOR,
			  	  	color: AC.AIR_FONT_COLOR,
			  	  	fontFamily: AC.AIR_FONT_TYPE,
			  	  	fontWeight: 'bold',
			  	  	fontSize: '8pt'
				}
			}, { 
				xtype: 'container',	  
				html: '<hr>',
				id: 'myplacepanelhr',
				cls: 'x-plain',
				style: {
					color: '#d0d0d0',
					backgroundColor: '#d0d0d0',
					height: '1px',
					
					marginBottom: 20
				}
			}, {
				xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'User',
//		        name: 'myplaceuser',
		        id: 'myplaceuser',
		        maxLength: 32,
		        disabled: true
		        
//		        style: {
//		        	marginTop: 20
//		        }
			}, {
				xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'CWID',
//		        name: 'myplacecwid',
		        id: 'myplacecwid',
		        maxLength: 32,
		        disabled: true
			}, {
				xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'lastlogon',
//		        name: 'myplacelastlogon',
		        id: 'myplacelastlogon',
		        maxLength: 32,
		        disabled: true
			}, {
				xtype: 'textarea',
		        fieldLabel: 'Role',
//		        name: 'myplaceroleperson',
		        id: 'myplaceroleperson',
		        
		        width: 230,
		        height: 50,
		        
//		        growMin: 20,
//		        growMax: 60,
//		        allowBlank: true,
		        disabled: true
			}/*, {
				xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Business essential editor',
		        name: 'myplacerolebusinessessentialeditor',
		        id: 'myplacerolebusinessessentialeditor',
		        maxLength: 32,
		        allowBlank: true,
		        disabled: true,
		        hidden: true
		        // TODO Feld entfernen
			}*/, {
		        xtype: 'fieldset',
		        id: 'fsUserOptions',
		        title: 'User options',
		        labelWidth: 200,
		        
		        style: {
		        	marginTop: 40
		        },
		        
				items: [{
			    	xtype: 'checkbox',
			        fieldLabel: 'Language EN',
			        name: 'useroptionLanguage',
			        id: 'useroptionLanguage',
			        allowBlank: true,
			        
		          	listeners: {
			    		check: function() {
			    			this.activateButtonSaveUserOptions();
			    		}.createDelegate(this)
			    	}
				}, {
					xtype: 'checkbox',
			        fieldLabel: 'Number Format DE',
			        name: 'useroptionNumberFormat',
			        id: 'useroptionNumberFormat',
			        allowBlank: true,
		          	listeners: {
			    		check: function() {
			    			this.activateButtonSaveUserOptions();
			    		}.createDelegate(this)
			    	}
				}, {
			        xtype: 'combo',
			        width: 230,
			        fieldLabel: 'Currency',
			        id: 'useroptionCurrency',
			        store: AIR.AirStoreManager.getStoreByName('currencyListStore'),//currencyListStore,
			        valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local',
			        
			        style: {
			        	marginBottom: 30
			        },
			        
			        listeners: {
		                select: function(combo, record, index) {
		                	this.activateButtonSaveUserOptions();
//	                        combo.setValue(record.data['text']);
		                }.createDelegate(this),
		                change: function(combo, newValue, oldValue) {
		                	if(this.isComboValueValid(combo, newValue, oldValue))
		                		this.activateButtonSaveUserOptions();
		                }.createDelegate(this)
			        }
			    }, {
			    	xtype: 'checkbox',
			        fieldLabel: 'Close help window',
			        name: 'useroptionHelp',
			        id: 'useroptionHelp',
			        
//			        style: {
//			        	marginTop: 20
//			        },
			        
		          	listeners: {
			    		check: function() {
			    			this.activateButtonSaveUserOptions();
			    		}.createDelegate(this)
			    	}
		        }, {
			    	xtype: 'checkbox',
			        fieldLabel: 'Skip wizard message',
			        name: 'useroptionSkipWizardMessage',
			        id: 'useroptionSkipWizardMessage',
			        allowBlank: true,
		          	listeners: {
			    		check: function() {
			    			this.activateButtonSaveUserOptions();
			    		}.createDelegate(this)
			    	}
				}, {
			    	xtype: 'checkbox',
			        fieldLabel: 'Disable Tooltip',
			        name: 'useroptionDisableTooltip',
			        id: 'useroptionDisableTooltip',
			        allowBlank: true,
		          	listeners: {
			    		check: function() {
			    			this.activateButtonSaveUserOptions();
			    		}.createDelegate(this)
			    	}
				}]
			},{
				id: 'saveuseroptionbutton',
				xtype: 'button',
		    	text: 'Save',
		    	
		    	width: 50,
		    	hidden: true,
		    	
		    	handler: function(button, event) {
	    	   		this.saveUserOptions();//button, event
	    		}.createDelegate(this)
			}]
//			buttons: [{
//				id: 'saveuseroptionbutton',
//		    	text: 'Save',
//		    	hidden: true,
//		    	handler: function(button, event) {
//	    	   		this.saveUserOptions(button, event);
//	    		}.createDelegate(this)
//	    	}]
		});
		
		AIR.MyPlaceHomeView.superclass.initComponent.call(this);
	},
	
	saveUserOptions: function(isSkipWizard) {//button, event, 
		var userOptionSaveStore = AIR.AirStoreFactory.createUserOptionSaveStore();
		
		userOptionSaveStore.on('beforeload', this.onUserOptionBeforeSaved, this);
		userOptionSaveStore.on('load', this.onUserOptionSaved, this);
		
		var field = this.getComponent('fsUserOptions').getComponent('useroptionLanguage');
		
		var params = {
			cwid: AIR.AirApplicationManager.getCwid(),
			token: AIR.AirApplicationManager.getToken(),
			language: field.getValue() ? 'DE' : 'EN'
		};
		
		field = this.getComponent('fsUserOptions').getComponent('useroptionNumberFormat');
		params.numberFormat = field.getValue() ? 'DE' : 'US';
		
		field = this.getComponent('fsUserOptions').getComponent('useroptionHelp');
		params.help = field.getValue() ? 'YES' : 'NO';
		
		field = this.getComponent('fsUserOptions').getComponent('useroptionSkipWizardMessage');
//		var field2 = Ext.getCmp('wizardcbskip');
		params.skipWizard = field.getValue() || isSkipWizard ? 'YES' : 'NO';// || field2.getValue()
		
		field = this.getComponent('fsUserOptions').getComponent('useroptionDisableTooltip');
		params.tooltip = field.getValue() ? 'YES' : 'NO';
		
		field = this.getComponent('fsUserOptions').getComponent('useroptionCurrency');
		params.currency = field.getValue();
		
		
		userOptionSaveStore.load({
			params: params
		});
		
		var itsecUserOptionListStore = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
		params = {
			cwid: AIR.AirApplicationManager.getCwid()
		};
		
		itsecUserOptionListStore.load({
			params: params
		});
	},
	
	onUserOptionBeforeSaved: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_SAVE).show();
	},
	
	onUserOptionSaved: function(store, records, options) {
		AAM.getMask(AC.MASK_TYPE_SAVE).hide();
		
		this.update(AIR.AirStoreFactory.createItsecUserOptionListStore());
	},
	
	activateButtonSaveUserOptions: function() {
		this/*.getFooterToolbar()*/.getComponent('saveuseroptionbutton').show();
	},

	inactivateButtonSaveUserOptions: function() {
		this/*.getFooterToolbar()*/.getComponent('saveuseroptionbutton').hide();
	},
	
	updateLabels: function(labels) {
//		var myplacepanelheader = this.getComponent('myplacepanelheader');
//		myplacepanelheader.el.dom.innerHTML = labels.label_menu_myplacemenuitem;
//		this.getComponent('myplaceuser').label.dom.textContent = labels.label_myplace_user;//innerHTML textContent
		
		var myplacepanelheader = this.getComponent('myplacepanelheader');
		myplacepanelheader.setText(labels.label_menu_myplacemenuitem);
		
		this.setFieldLabel(this.getComponent('myplaceuser'), labels.label_myplace_user);
		this.setFieldLabel(this.getComponent('myplacecwid'), labels.label_myplace_cwid);
		this.setFieldLabel(this.getComponent('myplacelastlogon'), labels.label_myplace_lastlogon);
		this.setFieldLabel(this.getComponent('myplaceroleperson'), labels.label_myplace_roleperson);

		this.getComponent('fsUserOptions').setTitle(labels.label_myplace_useroption);
		this.setFieldLabel(this.getComponent('fsUserOptions').getComponent('useroptionLanguage'), labels.label_useroptions_language);
		this.setFieldLabel(this.getComponent('fsUserOptions').getComponent('useroptionHelp'), labels.label_useroptions_help);
		this.setFieldLabel(this.getComponent('fsUserOptions').getComponent('useroptionSkipWizardMessage'), labels.label_useroptions_createwizard);
		this.setFieldLabel(this.getComponent('fsUserOptions').getComponent('useroptionCurrency'), labels.label_useroptions_currency);
		this.setFieldLabel(this.getComponent('fsUserOptions').getComponent('useroptionNumberFormat'), labels.label_useroptions_numberformat);
		this.setFieldLabel(this.getComponent('fsUserOptions').getComponent('useroptionDisableTooltip'), labels.label_useroptions_disableTooltip);
		
		this.getComponent('saveuseroptionbutton').setText(labels['button_general_save']);//this.getFooterToolbar()
	},
	
	update: function(store) {
		this.getComponent('myplaceuser').setValue(AIR.AirApplicationManager.getUserName());
		this.getComponent('myplacecwid').setValue(AIR.AirApplicationManager.getCwid().toUpperCase());
		this.getComponent('myplacelastlogon').setValue(AIR.AirApplicationManager.getLastLogon());

		
		if(store) {
			var itsecUserOptionListStore = store;//AIR.AirStoreFactory.createItsecUserOptionListStore();
			itsecUserOptionListStore.on('load', this.handleUserOptions, this);
			//replace this new itsecUserOptionListStore with the old of the AirStoreManager?
			
			var params = {
				cwid: AIR.AirApplicationManager.getCwid()
			};
			
			itsecUserOptionListStore.load({
				params: params
			});
		} else {
			this.handleUserOptions(AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore'));
		}
//		this.handleUserOptions();
		
		
		
//		var rolePersonListStore = AIR.AirStoreFactory.createRolePersonListStore();
//		rolePersonListStore.on('load', this.handleUserRoles, this);
//		
//		rolePersonListStore.load({
//			params: params
//		});
		this.handleUserRoles();
	},
	
	handleUserOptions: function(store, records, options) {
		var itsecUserOptionListStore = store;//AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
		
		itsecUserOptionListStore.each(function(item, index, allItems) {
//		Ext.each(records, function(item, index, allItems) {
			var key = item.data.itsecUserOptionName;
			var value = item.data.itsecUserOptionValue;
			
			if ('AIR_APPLICATION_ONLY' === key) {
			}
			else if ('AIR_LANGUAGE' === key) {
				if ('DE' == value) {
					this.getComponent('fsUserOptions').getComponent('useroptionLanguage').setValue(true);
				}
				else if('EN' === value) {
					this.getComponent('fsUserOptions').getComponent('useroptionLanguage').setValue(false);
				}
			}
			else if ('AIR_HELP_ACTIVATE' === key) {
				if ('YES' === value) {
					Ext.getCmp('eastpanel').collapse();
					this.getComponent('fsUserOptions').getComponent('useroptionHelp').setValue(true);
				}
				else {
					Ext.getCmp('eastpanel').expand();
					this.getComponent('fsUserOptions').getComponent('useroptionHelp').setValue(false);
				}
			}
			else if ('AIR_SKIP_WIZARD' === key) {
				if ('YES' === value) {
					isSkipCreateWizardMessage = true;
					this.getComponent('fsUserOptions').getComponent('useroptionSkipWizardMessage').setValue(true);
				}
				else {
					isSkipCreateWizardMessage = false;
					this.getComponent('fsUserOptions').getComponent('useroptionSkipWizardMessage').setValue(false);
				}
			}
			else if ('AIR_TOOLTIP' === key) {
				if ('YES' == value) {
					this.getComponent('fsUserOptions').getComponent('useroptionDisableTooltip').setValue(true);					
				}
				else {
					this.getComponent('fsUserOptions').getComponent('useroptionDisableTooltip').setValue(false);
				}
			}
			else if ('AIR_NUMBER_FORMAT' === key) {
				if ('DE' == value) {
					this.getComponent('fsUserOptions').getComponent('useroptionNumberFormat').setValue(true);
				}
				else if('EN' === value) {
					this.getComponent('fsUserOptions').getComponent('useroptionNumberFormat').setValue(false);
				}
			}
			else if ('AIR_CURRENCY' === key) {
				this.getComponent('fsUserOptions').getComponent('useroptionCurrency').setValue(value);
			}
		}.createDelegate(this));
		
		this.inactivateButtonSaveUserOptions();
	},
	
	handleUserRoles: function(store, records, options) {
		var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');

		
		var anzeigetext = '';

//		Ext.each(records, function(item, index, allItems) {
		rolePersonListStore.each(function(item, index, allItems) {
			var key = item.data.id;
			var value = item.data.roleName;
			
			if(anzeigetext.length > 1)
				anzeigetext = anzeigetext + '\n';
			
			anzeigetext = anzeigetext + value;
		});
				
		this.getComponent('myplaceroleperson').setValue(anzeigetext);
	}

});
Ext.reg('AIR.MyPlaceHomeView', AIR.MyPlaceHomeView);
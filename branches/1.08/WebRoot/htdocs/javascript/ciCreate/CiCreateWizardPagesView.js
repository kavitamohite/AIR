Ext.namespace('AIR');

AIR.CiCreateWizardPagesView = Ext.extend(Ext.Panel, {
	wizardCurrentStep: 0,
	wizardMaxSteps: 3,
	
	initComponent: function() {
		Ext.apply(this, {
			layout: 'card',
			activeItem: this.wizardCurrentStep,
			hidden: false,
			plain: true,
			border: false,
			height: 380,
			
			items: [{ 
				title: 'Wizard',
				xtype: 'AIR.CiCreateWizardPage0',
				id: 'ciCreateWizardPage0'
			},{
				title: 'Wizard - Step 1: Essential',
				xtype: 'AIR.CiCreateWizardPage1',
	        	id: 'ciCreateWizardPage1'
			},{
		    	title: 'Wizard - Step 2: Details',
	        	id: 'ciCreateWizardPage2',
				xtype: 'AIR.CiCreateWizardPage2'
			},{ 
				title: 'Wizard - Step 3: Contacts',
	        	id: 'ciCreateWizardPage3',
				xtype: 'AIR.CiCreateWizardPage3'
			}],
		     
			buttonAlign: 'left',
			buttons: [{
				id: 'createstartbutton',
	    		text: 'Start',
	    		handler: function(button, event) {
	    			var isSkipWizard = this.getComponent('ciCreateWizardPage0').getComponent('wizardcbskip').getValue();
	    			if(isSkipWizard)
	    				this.fireEvent('userOptionsChange', isSkipWizard);//, button, event
//	    				saveUserOptions(button, event);//refac
	    			
	    			this.wizardStart(true);
	    			
	    			//refac: use/create dynamicWindow like the Cancel Button started from CiCenterView.
	    			//Current state: standard detail page 3 button dynamicWindow with a false save Button is shown. Must be treated differently!
//	    			showCiDetailDataChanged = true;
	    		}.createDelegate(this)
			},{
				id: 'createbackbutton',
				text: 'Back',
				hidden: true,
				handler: function(button, event) {
					if(this.wizardCurrentStep == 2)
						this.getFooterToolbar().getComponent('createbackbutton').hide();
					
					this.getFooterToolbar().getComponent('createfinishbutton').hide();
					this.getFooterToolbar().getComponent('createcancelbutton').show();
					this.getFooterToolbar().getComponent('createnextbutton').show();
			   		this.wizardCurrentStep = this.wizardCurrentStep - 1;
			   		
//			   		var createtabpanel = Ext.getCmp('ciCreateWizardPagesView');
//			   		createtabpanel.layout.setActiveItem(this.wizardCurrentStep);
			   		
			   		this.getLayout().setActiveItem(this.wizardCurrentStep);
				}.createDelegate(this)
			},{
				id: 'createcancelbutton',
				text: 'Cancel',
				hidden: true
//				handler: function(button, event) {
//			   		cancelApplicationCreate(button, event);
//				}
			},{
				id: 'createnextbutton',
				text: 'Next',
				hidden: true,
				handler: function(button, event) {
//					window.setTimeout("nextStep()", 500);
					this.nextStep();
				}.createDelegate(this)
			},{
				id: 'createfinishbutton',
				text: 'Finish',
				hidden: true,
				handler: this.createApplication.createDelegate(this)
				
//				handler: function(button, event) {
//			   		this.createApplication(button, event);//orig: ohne this
//				}
			}]
		});
		
		AIR.CiCreateWizardPagesView.superclass.initComponent.call(this);
		
		this.addEvents('externalNavigation', 'userOptionsChange');

		var bCancelApplicationCreate = this.getFooterToolbar().getComponent('createcancelbutton');
		bCancelApplicationCreate.on('click', this.onCancelApplicationCreate, this);
		
		var tfWizardapplicationName = this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName');
		var tfWizardapplicationAlias = this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias');
		
		tfWizardapplicationName.on('change', this.onAppNameChange, this);
		tfWizardapplicationAlias.on('change', this.onAppAliasChange, this);
		
		this.objectNameAllowedStore = AIR.AirStoreFactory.getObjectNameAllowedStore();
		this.objectAliasAllowedStore = AIR.AirStoreFactory.getObjectAliasAllowedStore();
		
		
		
		this.objectNameAllowedStore.on('load', this.onNameAllowedCheck, this);
		this.objectAliasAllowedStore.on('load', this.onAliasAllowedCheck, this);
	},
	
	onNameAllowedCheck: function(records, options, success) {
		
	},
	
	onAliasAllowedCheck: function(records, options, success) {
		
	},
	
	onAppNameChange: function(field, newValue, oldValue) {
		this.objectNameAllowedStore.isLoaded = false;
		this.objectNameAllowedStore.setBaseParam('query', newValue.trim());
		this.objectNameAllowedStore.load();
		
		var tfAlias = this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias');
		if(tfAlias.getValue().length == 0) {
			tfAlias.setValue(newValue);
		
			this.objectAliasAllowedStore.isLoaded = false;
			this.objectAliasAllowedStore.setBaseParam('query', newValue.trim());
			this.objectAliasAllowedStore.load();
		}
	},
	
	onAppAliasChange: function(field, newValue, oldValue) {
		if(newValue.length > 0) {
			this.objectAliasAllowedStore.isLoaded = false;
			this.objectAliasAllowedStore.setBaseParam('query', newValue.trim());
			this.objectAliasAllowedStore.load();
		}
	},
	
	
	tfWizardapplicationAlias: function (field, newValue, oldValue) {
		if(newValue.length > 0) {
			this.objectAliasAllowedStore.isLoaded = false;
			this.objectAliasAllowedStore.setBaseParam('query', newValue.trim());
			this.objectAliasAllowedStore.load();
		}
	},
	
	onCancelApplicationCreate: function(button, event) {//ORIG createnew.js::cancelApplicationCreate()
		var yesCallback = function() {
			this.wizardStarted = false;
			this.fireEvent('externalNavigation', this, null, 'clSearch');
		};

		var callbackMap = {
			'yes': yesCallback.createDelegate(this)
		};
		
		var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CANCEL_WIZARD', callbackMap);
		dynamicWindow.show();
	},
	
	createApplication: function(but, ev) {
		var applicationCreateStore = AIR.AirStoreFactory.createApplicationCreateStore();
		applicationCreateStore.on('load', this.onApplicationCreate, this);
		applicationCreateStore.on('beforeload', this.onApplicationBeforeCreate, this);
		
		
		// STEP 0
		var field = this.getComponent('ciCreateWizardPage0').getComponent('wizardcbskip');
		applicationCreateStore.setBaseParam('wizardSkipStepZero', field.getValue());
		
		
		// STEP 1
		field = this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType');
		applicationCreateStore.setBaseParam('applicationCat1Id', field.getValue());
		
//		field = this.getComponent('ciCreateWizardPage1').getComponent('wizardBasics').getComponent('wizardapplicationCat2');//ciCreateWizardPage1:wizardapplicationCat2, ciCreateWizardPage2:wizardapplicationBusinessCat
		field = this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationCat2');
		applicationCreateStore.setBaseParam('applicationCat2Id', field.getValue());		
		
		if (wizardSAPName) {
			fieldvalue = this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[0].getValue().trim()//wizardapplicationNameSAP1
						+ 'M' + this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[1].getValue()//wizardapplicationNameSAP2
						+ 'C' + this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[2].getValue();//wizardapplicationNameSAP3
			applicationCreateStore.setBaseParam('applicationName', fieldvalue);
		} else {
			field = this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName');
			applicationCreateStore.setBaseParam('applicationName', field.getValue().trim());
		}
		
		field = this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias');
		applicationCreateStore.setBaseParam('applicationAlias', field.getValue().trim());
		
		field = this.getComponent('ciCreateWizardPage1').getComponent('wizardcomments');
		applicationCreateStore.setBaseParam('comments', field.getValue());
		
		
		var cbgWizardRegulations = this.getComponent('ciCreateWizardPage1').getComponent('wizardRelevance').getComponent('cbgWizardRegulations');
		
		for(var i = 0; i < cbgWizardRegulations.items.items.length; i++) {//checkedRegulations.length
			var regulationId = 'relevance' + cbgWizardRegulations.items.items[i].boxLabel;
			var regulationStatus = cbgWizardRegulations.items.items[i].getValue() ? 'Y' : 'N';
			
			applicationCreateStore.setBaseParam(regulationId, regulationStatus);
//				data[regulationId] = regulationStatus;
		}
		
//		field = Ext.getCmp('wizardrelevanceGR1920');
//		applicationCreateStore.setBaseParam('relevanceGR1920', field.getValue()?"Y":"N");
//		field = Ext.getCmp('wizardrelevanceGR1435');
//		applicationCreateStore.setBaseParam('relevanceGR1435', field.getValue()?"Y":"N");
//		field = Ext.getCmp('wizardrelevanceGR1775');
//		applicationCreateStore.setBaseParam('relevanceGR1775', field.getValue()?"Y":"N");
//		field = Ext.getCmp('wizardrelevanceGR2008');
//		applicationCreateStore.setBaseParam('relevanceGR2008', field.getValue()?"Y":"N");
		
		field = this.getComponent('ciCreateWizardPage1').getComponent('wizardRelevance').getComponent('wizardrelevanceGxp');
		applicationCreateStore.setBaseParam('gxpFlag', field.getValue());
		
		field = this.getComponent('ciCreateWizardPage1').getComponent('wizardisTemplate');
		applicationCreateStore.setBaseParam('template', field.getValue() ? '-1' : '0');
		

		
		// STEP 2
		field = this.getComponent('ciCreateWizardPage2').getComponent('wizardBasics').getComponent('wizardlifecycleStatus');
		applicationCreateStore.setBaseParam('lifecycleStatusId', field.getValue());
		
		field = this.getComponent('ciCreateWizardPage2').getComponent('wizardBasics').getComponent('wizardoperationalStatus');
		applicationCreateStore.setBaseParam('operationalStatusId', field.getValue());
		
		field = this.getComponent('ciCreateWizardPage2').getComponent('wizardBasics').getComponent('wizardapplicationBusinessCat');
		applicationCreateStore.setBaseParam('categoryBusinessId', field.getValue());//categoryBusinessId categoryBusiness
		//es wird categoryBusinessId='1' zum Speichern übertragen aber es kommt CiEditTabView::onLoadApplication() in appDetail categoryBusinessId='0' zurück.
		//Deswegen wird Category Business nicht angezeigt auf den Detail- und Specifics Seiten. DB Diskrepanz zwischen id 0 und 1?
		
		field = this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardsla');
		applicationCreateStore.setBaseParam('slaName', field.getValue());
		
		field = this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardserviceContract');
		applicationCreateStore.setBaseParam('serviceContract', field.getValue());
		
		field = this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardseverityLevel');
		applicationCreateStore.setBaseParam('severityLevel', field.getValue());
		
		field = this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardbusinessEssential');
		applicationCreateStore.setBaseParam('businessEssentialId', field.getValue());
		
		
		// STEP 3
		field = this.getComponent('ciCreateWizardPage3').getComponent('wizardAppowner').getComponent('tbWizardAppowner').getComponent('wizardapplicationOwnerHidden');
		applicationCreateStore.setBaseParam('applicationOwnerHidden', field.getValue());
		field = this.getComponent('ciCreateWizardPage3').getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegateHidden');
		applicationCreateStore.setBaseParam('applicationOwnerDelegateHidden', field.getValue());
		field = this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciResponsible').getComponent('wizardciResponsibleHidden');
		applicationCreateStore.setBaseParam('responsibleHidden', field.getValue());
		field = this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsibleHidden');
		applicationCreateStore.setBaseParam('subResponsibleHidden', field.getValue());
		

		field = this.getComponent('ciCreateWizardPage3').getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegate');
		applicationCreateStore.setBaseParam('applicationOwnerDelegate', field.getValue());
		field = this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsible');
		applicationCreateStore.setBaseParam('subResponsible', field.getValue());
		

		applicationCreateStore.setBaseParam('cwid', AIR.AirApplicationManager.getCwid());
		applicationCreateStore.setBaseParam('token', AIR.AirApplicationManager.getToken());
		
		
		// Frage: was ist mit den Einstellungen in den user options?
		// Z.B. wenn in der MyPlace Maske eine currency als Standardwert für alle neu angelegten CIs
		// gesetzt ist, müssen diese bei der Speicherung auch übertragen werden.
		applicationCreateStore.load();
	},
	
	onApplicationCreate: function(store, records, options) {
		//eine gemeinsame Funktion mit CiCopyFromView::onApplicationCopy ?!
		mySaveMask.hide();
		
		switch(records[0].data.result) {
			case 'OK':
				selectedCIId = records[0].data.applicationId;
				AIR.AirApplicationManager.setCiId(records[0].data.applicationId);
				
				var data = {
					applicationName: this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName').getValue(),
					applicationCat1: this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').getRawValue()
				};
				this.fireEvent('airAction', this, 'appCreateSuccess', data);
	
				var continueEditingCallback = function() {
//					showCiDetailDataChanged = false;
					this.wizardStarted = false;

//					this.fireEvent('applicationCopy', this, 'continueEditing');
					this.fireEvent('externalNavigation', this, null, 'clCiDetails');
				}.createDelegate(this);
				
				var createNewCiCallback = function() {
//					wizardStart(true);
					
//					this.fireEvent('externalNavigation', this, null, 'clCiCreateWizard');
					this.wizardStart(true);
				}.createDelegate(this);
				
				var redirectToSearchCallback = function() {
					selectedCIId = -1;
					AIR.AirApplicationManager.setCiId(-1);
					this.wizardStarted = false;

//					this.fireEvent('applicationCopy', this, 'redirectToSearch');
					this.fireEvent('externalNavigation', this, null, 'clSearch');
				}.createDelegate(this);
	
				var callbackMap = {
					'continueEditing': continueEditingCallback,
					'createNewCi': createNewCiCallback,
					'redirectToSearch': redirectToSearchCallback
				};
				
				var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE', callbackMap);
				afterSaveAppWindow.show();
				break;
				
			case 'ERROR':
				var afterSaveAppFailWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.displayMessage);
				afterSaveAppFailWindow.show();
				break;
		}
	},
	
	onApplicationBeforeCreate: function(store, options) {
		mySaveMask.show({
			msg: AIR.AirApplicationManager.getLabels().gerneral_message_saving
		});
	},
	
	
	wizardStart: function(startbuttonpressed, previousView) {
		this.wizardEmptyFields();
		
		if(isSkipCreateWizardMessage || startbuttonpressed) {
			this.setupAcl();
			
			this.getFooterToolbar().getComponent('createstartbutton').hide();
			this.getFooterToolbar().getComponent('createcancelbutton').show();
			this.getFooterToolbar().getComponent('createnextbutton').show();
			this.getFooterToolbar().getComponent('createbackbutton').hide();
			this.getFooterToolbar().getComponent('createfinishbutton').hide();
	   		
	   		this.wizardCurrentStep = 1;

	   		this.getLayout().setActiveItem(this.wizardCurrentStep);
	   		var ciCreateWizardPage1 = this.getComponent('ciCreateWizardPage1');
	   		ciCreateWizardPage1.doLayout();
		} else {
			this.getFooterToolbar().getComponent('createstartbutton').show();
	   		this.getFooterToolbar().getComponent('createcancelbutton').show();
	   		this.getFooterToolbar().getComponent('createnextbutton').hide();
	   		this.getFooterToolbar().getComponent('createbackbutton').hide();
	   		this.getFooterToolbar().getComponent('createfinishbutton').hide();
	   		
	   		this.wizardCurrentStep = 0;
	   		
	   		this.getLayout().setActiveItem(this.wizardCurrentStep);
		}
		
		if (hasRoleApplicationLayer) {
			// only applications
			this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').setValue(applicationObjectTypeId);
			this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').setReadOnly(true);
			
			// reload the labels
//			setCommonTextLabelDetails();//siehe commonfunctions.js
			
			// the cat2 must be editable, so activate it
			wizardApplicationKat1Id = applicationObjectTypeId;
			loadStoreAndActivateCat2();
		} else {
			this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').setReadOnly(false);
			this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').enable();
		}
	},
	
	setupAcl: function() {
		var aclData = AIR.AirStoreManager.getStoreByName('aclStore').data.items;
		
		Ext.each(aclData, function(item, index, allItems) {
			if(item.data.UseInWizard === 'Y') {
				var aclItemCmp = Ext.getCmp('wizard' + item.data.id);
    			if(aclItemCmp) {
    				switch(aclItemCmp.getXType()) {
    					case 'textfield':
    					case 'textarea':
    					case 'combo':
    					case 'checkbox':
    					case 'listview':	
    					case 'grid':	
    						AIR.AirAclManager.setMandatory(aclItemCmp, item.data.Mandatory);
    						AIR.AirAclManager.setAttributeProperty(
								aclItemCmp,
								item.data.attributeType,
								item.data.attributeLength,
								item.data.attributeMask
							);

    						break;
    					default: break;
    				}
    			}
			}
		});
	},
	
	wizardEmptyFields: function() {
		// STEP 1
		this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').reset();
		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationCat2').reset();
		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationCat2').disable();
//		Ext.getCmp('wizardapplicationCat2').setHideTrigger(true);
		wizardSAPName = false;
		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName').show();
		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').hide();
		
		var aclItemCmp = Ext.getCmp('wizardapplicationNameSAP1');//this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[0];//Ext.getCmp('wizardapplicationNameSAP1')//
		AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
		
		aclItemCmp = Ext.getCmp('wizardapplicationNameSAP2');//this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[1];//Ext.getCmp('wizardapplicationNameSAP2')//
		AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
		
		aclItemCmp = Ext.getCmp('wizardapplicationNameSAP3');//this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[2];//Ext.getCmp('wizardapplicationNameSAP3')//
		AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
		
		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName').reset();
		
		
//		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[0].
		Ext.getCmp('wizardapplicationNameSAP1').reset();//wizardapplicationNameSAP1
//		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[1].
		Ext.getCmp('wizardapplicationNameSAP2').reset();//wizardapplicationNameSAP2
//		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationNameSAP').items.items[2].
		Ext.getCmp('wizardapplicationNameSAP3').reset();//wizardapplicationNameSAP3
		
		
		this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias').reset();
		this.getComponent('ciCreateWizardPage1').getComponent('wizardcomments').reset();
		
		var cbgWizardRegulations = this.getComponent('ciCreateWizardPage1').getComponent('wizardRelevance').getComponent('cbgWizardRegulations');
		var values = [ true, false, false, false ];
		cbgWizardRegulations.setValue(values);
		
//		Ext.getCmp('wizardrelevanceGR1920').setValue(false);
//		Ext.getCmp('wizardrelevanceGR1435').setValue(true);
//		Ext.getCmp('wizardrelevanceGR1775').setValue(false);
//		Ext.getCmp('wizardrelevanceGR2008').setValue(false);
				
		this.getComponent('ciCreateWizardPage1').getComponent('wizardRelevance').getComponent('wizardrelevanceGxp').reset();
		this.getComponent('ciCreateWizardPage1').getComponent('wizardisTemplate').setValue(false);

		
		// STEP 2 
		this.getComponent('ciCreateWizardPage2').getComponent('wizardBasics').getComponent('wizardlifecycleStatus').reset();
		this.getComponent('ciCreateWizardPage2').getComponent('wizardBasics').getComponent('wizardoperationalStatus').reset();
		this.getComponent('ciCreateWizardPage2').getComponent('wizardBasics').getComponent('wizardapplicationBusinessCat').reset();
		this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardsla').reset();
		this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardserviceContract').reset();
//		this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardserviceContract').disable();
//		this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardserviceContract').setHideTrigger(true);
		this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardseverityLevel').reset();
		this.getComponent('ciCreateWizardPage2').getComponent('wizardAgreements').getComponent('wizardbusinessEssential').reset();
		
		
		// STEP 3
		this.getComponent('ciCreateWizardPage3').getComponent('wizardAppowner').getComponent('tbWizardAppowner').getComponent('wizardapplicationOwner').reset();
		this.getComponent('ciCreateWizardPage3').getComponent('wizardAppowner').getComponent('tbWizardAppowner').getComponent('wizardapplicationOwnerHidden').reset();
		this.getComponent('ciCreateWizardPage3').getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegate').reset();
		this.getComponent('ciCreateWizardPage3').getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegateHidden').reset();
		this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciResponsible').getComponent('wizardciResponsible').reset();
		this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciResponsible').getComponent('wizardciResponsibleHidden').reset();
		this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsible').reset();
		this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsibleHidden').reset();
		
		
		/*
		// STEP 1
		Ext.getCmp('wizardobjectType').clearInvalid();
		Ext.getCmp('wizardapplicationName').clearInvalid();
		Ext.getCmp('wizardapplicationNameSAP1').clearInvalid();
		Ext.getCmp('wizardapplicationNameSAP2').clearInvalid();
		Ext.getCmp('wizardapplicationNameSAP3').clearInvalid();
		Ext.getCmp('wizardapplicationAlias').clearInvalid();
		Ext.getCmp('wizardcomments').clearInvalid();
//		Ext.getCmp('wizardrelevanceGR1920').clearInvalid();
//		Ext.getCmp('wizardrelevanceGR1435').clearInvalid();
		Ext.getCmp('wizardrelevanceGxp').clearInvalid();
		Ext.getCmp('wizardisTemplate').clearInvalid();

		// STEP 2
		Ext.getCmp('wizardlifecycleStatus').clearInvalid();
		Ext.getCmp('wizardoperationalStatus').clearInvalid();
		Ext.getCmp('wizardapplicationCat2').clearInvalid();
		Ext.getCmp('wizardsla').clearInvalid();
		Ext.getCmp('wizardserviceContract').clearInvalid();
		Ext.getCmp('wizardseverityLevel').clearInvalid();
		Ext.getCmp('wizardbusinessEssential').clearInvalid();
		
		// STEP 3
		field = Ext.getCmp('wizardapplicationOwner').clearInvalid();
		field = Ext.getCmp('wizardapplicationOwnerHidden').clearInvalid();
		field = Ext.getCmp('wizardapplicationOwnerDelegate').clearInvalid();
		field = Ext.getCmp('wizardapplicationOwnerDelegateHidden').clearInvalid();
		field = Ext.getCmp('wizardciResponsible').clearInvalid();
		field = Ext.getCmp('wizardciResponsibleHidden').clearInvalid();
		field = Ext.getCmp('wizardciSubResponsible').clearInvalid();
		field = Ext.getCmp('wizardciSubResponsibleHidden').clearInvalid();*/
	},
	
	
	isStepValid: function(step) {
		switch(step) {
			case 1:
//				if (wizardSAPName) {
//					Ext.getCmp('wizardapplicationNameSAP1').setValue(Ext.getCmp('wizardapplicationNameSAP1').getValue().trim());
//					Ext.getCmp('wizardapplicationNameSAP1').clearInvalid();
//				} else {
//					Ext.getCmp('wizardapplicationName').setValue(Ext.getCmp('wizardapplicationName').getValue().trim());
//					Ext.getCmp('wizardapplicationName').clearInvalid();
//				}
				
//				Ext.getCmp('wizardapplicationAlias').setValue(Ext.getCmp('wizardapplicationAlias').getValue().trim());
//				Ext.getCmp('wizardapplicationAlias').clearInvalid();
//				Ext.getCmp('wizardobjectType').clearInvalid();
//				Ext.getCmp('wizardapplicationCat2').clearInvalid();
				
//				Ext.getCmp('wizardcomments').setValue(Ext.getCmp('wizardcomments').getValue().trim());
//				Ext.getCmp('wizardcomments').clearInvalid();
//				Ext.getCmp('wizardrelevanceGR1920').clearInvalid();
//				Ext.getCmp('wizardrelevanceGR1435').clearInvalid();
//				Ext.getCmp('wizardrelevanceGR1775').clearInvalid();
//				Ext.getCmp('wizardrelevanceGR2008').clearInvalid();
//				Ext.getCmp('wizardrelevanceGxp').clearInvalid();
//				Ext.getCmp('wizardisTemplate').clearInvalid();
				
				var b1 = this.objectNameAllowedStore.getAt(0);
				var b11 = b1 === undefined ? true : b1.data.countResultSet == 0 ? true : false;
				
				var b2 = this.objectAliasAllowedStore.getAt(0);
				var b22 = b2 === undefined ? true : b2.data.countResultSet == 0 ? true : false;

				
				var isValid = Ext.getCmp('wizardobjectType').isValid() &&
						Ext.getCmp('wizardapplicationCat2').isValid() &&
						Ext.getCmp('wizardapplicationName').isValid() &&
						
						b11 &&
						b22 &&
//						this.objectNameAllowedStore.getAt(0) === undefined ? true : this.objectNameAllowedStore.getAt(0).data.countResultSet==0 ? true : false &&
//						this.objectAliasAllowedStore.getAt(0) === undefined ? true : this.objectAliasAllowedStore.getAt(0).data.countResultSet==0 ? true : false &&
						
						Ext.getCmp('wizardapplicationNameSAP1').isValid() &&
						Ext.getCmp('wizardapplicationNameSAP2').isValid() &&
						Ext.getCmp('wizardapplicationNameSAP3').isValid() &&
						Ext.getCmp('wizardapplicationAlias').isValid() &&
						Ext.getCmp('wizardcomments').isValid();// &&
//						Ext.getCmp('wizardrelevanceGR1920').isValid() &&
//						Ext.getCmp('wizardrelevanceGR1435').isValid() &&
//						Ext.getCmp('wizardrelevanceGR2008').isValid() &&
//						Ext.getCmp('wizardrelevanceGR1775').isValid() &&
//						Ext.getCmp('wizardrelevanceGxp').isValid() &&
//						Ext.getCmp('wizardisTemplate').isValid();
				
				return isValid;
			case 2:
				Ext.getCmp('wizardlifecycleStatus').clearInvalid();
				Ext.getCmp('wizardoperationalStatus').clearInvalid();
				Ext.getCmp('wizardapplicationBusinessCat').clearInvalid();
				Ext.getCmp('wizardsla').clearInvalid();
				Ext.getCmp('wizardserviceContract').clearInvalid();
				Ext.getCmp('wizardseverityLevel').clearInvalid();
				Ext.getCmp('wizardbusinessEssential').clearInvalid();
				
				return Ext.getCmp('wizardlifecycleStatus').isValid() &&
						Ext.getCmp('wizardoperationalStatus').isValid() &&
						Ext.getCmp('wizardapplicationBusinessCat').isValid() &&
						Ext.getCmp('wizardsla').isValid() &&
						Ext.getCmp('wizardserviceContract').isValid() &&
						Ext.getCmp('wizardseverityLevel').isValid() &&
						Ext.getCmp('wizardbusinessEssential').isValid();
			case 3: 
				Ext.getCmp('wizardapplicationOwner').clearInvalid();
				Ext.getCmp('wizardapplicationOwnerDelegate').clearInvalid();
				Ext.getCmp('wizardciResponsible').clearInvalid();
				Ext.getCmp('wizardciSubResponsible').clearInvalid();
				
				return Ext.getCmp('wizardapplicationOwner').isValid() &&
						Ext.getCmp('wizardapplicationOwnerDelegate').isValid() &&
						Ext.getCmp('wizardciResponsible').isValid() &&
						Ext.getCmp('wizardciSubResponsible').isValid();
			default: return false;
		} 
	},

	nextStep: function() {
		if (this.isStepValid(this.wizardCurrentStep)) {
			if (this.wizardCurrentStep == this.wizardMaxSteps - 1) {
				this.getFooterToolbar().getComponent('createnextbutton').hide();
				this.getFooterToolbar().getComponent('createfinishbutton').show();
			}
			if (this.wizardCurrentStep == 1) {
				wizardApplicationKat1Id = Ext.getCmp('wizardobjectType').getValue();
				wizardApplicationKat1Name = Ext.getCmp('wizardobjectType').getRawValue();
				//selectedCiCat1Id = wizardApplicationKat1Id;
//				applicationCat2ListStore.load();
//				lifecycleStatusListStore.load();
//				operationalStatusListStore.load();
				
				wizardAliasName = '';
				if(Ext.getCmp('wizardapplicationAlias').getValue().trim().length > 0)
					wizardAliasName = ' (' + Ext.getCmp('wizardapplicationAlias').getValue().trim() + ')';
				
				wizardHeaderName = '';
				if(wizardSAPName) {
					wizardHeaderName = Ext.getCmp('wizardapplicationNameSAP1').getValue() + 'M' 
									+ Ext.getCmp('wizardapplicationNameSAP2').getValue() + 'C'  
									+ Ext.getCmp('wizardapplicationNameSAP3').getValue() 
									+ wizardAliasName +'<br>'
									+ '<span style="font-size: 10px;">'
									+ wizardApplicationKat1Name + '</span>';
				} else {
					wizardHeaderName = Ext.getCmp('wizardapplicationName').getValue() 
									+ wizardAliasName +'<br>'
									+ '<span style="font-size: 10px;">'
									+ wizardApplicationKat1Name + '</span>';
				}
				Ext.get('wizardStepTwoName').dom.innerHTML = wizardHeaderName;
				Ext.get('wizardStepThreeName').dom.innerHTML = wizardHeaderName;
				
				if(Ext.getCmp('wizardbusinessEssential').getValue().length == 0)
					Ext.getCmp('wizardbusinessEssential').setValue('16');
				
				
				if(hasRoleBusinessEssentialEditor) {
					Ext.getCmp('wizardbusinessEssential').show();
				} else {
					Ext.getCmp('wizardbusinessEssential').hide();
				}
			}
			if(this.wizardCurrentStep == 2) {
				var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
				
				rolePersonListStore.each(function(item, index, allItems) {
					var key 	= item.data.id;//rolePersonListStore.getAt(index).data.id;
					var value 	= item.data.roleName;//rolePersonListStore.getAt(index).data.roleName;
					
					if(rolenameApplicationLayer === value || rolenameDeveloper === value) {
						if(Ext.getCmp('wizardapplicationOwnerHidden').getValue().length == 0) {
							Ext.getCmp('wizardapplicationOwner').setValue(username + ' ('+AIR.AirApplicationManager.getCwid().toUpperCase()+')');
							Ext.getCmp('wizardapplicationOwnerHidden').setValue(AIR.AirApplicationManager.getCwid().toUpperCase());
						}
					}
				});
				
				if(Ext.getCmp('wizardciResponsibleHidden').getValue()=='') {
					Ext.getCmp('wizardciResponsible').setValue(username + ' ('+AIR.AirApplicationManager.getCwid().toUpperCase()+')');
					Ext.getCmp('wizardciResponsibleHidden').setValue(AIR.AirApplicationManager.getCwid().toUpperCase());
				}
				
				var labels = AIR.AirApplicationManager.getLabels();
				var objectTypeName = this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').getRawValue();
				var label = objectTypeName === 'Application' ? labels.applicationManager : labels.wizardCiowner;
				this.getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').setTitle(label);
			}
			
			this.getFooterToolbar().getComponent('createcancelbutton').show();
			this.getFooterToolbar().getComponent('createbackbutton').show();
	   		this.wizardCurrentStep += 1;
	   		
//	   		createtabpanel.layout.setActiveItem(this.wizardCurrentStep);
//			var createtabPanel = Ext.getCmp('createtabPanel');
//	   		var createtabPanel = Ext.getCmp('ciCreateWizardPagesView');
//			createtabPanel.layout.setActiveItem(this.wizardCurrentStep);
	   		
	   		this.getLayout().setActiveItem(this.wizardCurrentStep);
		} else {
			var msgtext = AIR.AirApplicationManager.getLabels().wizardDataNotValid.replace(/##/, this.wizardCurrentStep);//languagestore.data.items[0].data['wizardDataNotValid'].replace(/##/, this.wizardCurrentStep);
			
			switch(this.wizardCurrentStep) {
				case 1:
					if(!Ext.getCmp('wizardobjectType').isValid())
						msgtext += '<br/>' + this.getComponent('ciCreateWizardPage1').getComponent('wizardobjectType').fieldLabel;
					
					if(!Ext.getCmp('wizardapplicationCat2').isValid())
						msgtext += '<br/>' + this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationCat2').fieldLabel;
					
					if(wizardSAPName) {	
						if(!(this.objectNameAllowedStore.getAt(0) === undefined ? true : this.objectNameAllowedStore.getAt(0).data.countResultSet == 0 ? true : false)) {
							Ext.getCmp('wizardapplicationNameSAP1').markInvalid();
							msgtext += '<br/>' + AIR.AirApplicationManager.getLabels().wizardallowedNameText;//Ext.form.VTypes.allowedNameText;
						} else {
							if(!Ext.getCmp('wizardapplicationNameSAP1').isValid())
								msgtext += '<br/>' + Ext.getCmp('wizardapplicationNameSAP1').fieldLabel;
									
							if(!Ext.getCmp('wizardapplicationNameSAP2').isValid())
								msgtext += '<br/>' + Ext.getCmp('wizardapplicationNameSAP2').fieldLabel;
							
//							if(!Ext.getCmp('wizardapplicationNameSAP3').isValid())
//								msgtext += '<br/>' + Ext.getCmp('wizardapplicationNameSAP3').fieldLabel;
						}
					} else {
						if(!(this.objectNameAllowedStore.getAt(0) === undefined ? true : this.objectNameAllowedStore.getAt(0).data.countResultSet == 0 ? true : false)) {
							Ext.getCmp('wizardapplicationName').markInvalid();
							
							var nameError = AIR.AirApplicationManager.getLabels().wizardallowedNameText;//Ext.form.VTypes.allowedNameText;
							nameError = nameError.replace('{0}', this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName').getValue());//this.objectNameAllowedStore.data.items[0].data.informationText
							nameError = nameError.replace('{1}', this.objectNameAllowedStore.data.items[0].data.informationText);
							
							msgtext += '<br/>' + nameError;
							
//							msgtext += '<br/>' + Ext.form.VTypes.allowedNameText;
						} else if(!this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName').isValid()) {
							msgtext += '<br/>' + this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationName').fieldLabel;
						}
					}
					if (!(this.objectAliasAllowedStore.getAt(0) === undefined ? true : this.objectAliasAllowedStore.getAt(0).data.countResultSet == 0 ? true : false)) {
						this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias').markInvalid();
						
						//use String.format instead of String.replace and {x}!
						var aliasError = AIR.AirApplicationManager.getLabels().wizardallowedAliasText;//Ext.form.VTypes.allowedAliasText;
						aliasError = aliasError.replace('{0}', this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias').getValue());//this.objectAliasAllowedStore.data.items[0].data.informationText
						aliasError = aliasError.replace('{1}', this.objectAliasAllowedStore.data.items[0].data.informationText);
						
						msgtext += '<br/>' + aliasError;
						
//						msgtext += '<br/>' + Ext.form.VTypes.allowedAliasText;
					} else if(!this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias').isValid()) {
						msgtext += '<br/>' + this.getComponent('ciCreateWizardPage1').getComponent('wizardapplicationAlias').fieldLabel;
					}

					break;
				
				case 2:
					if(!Ext.getCmp('wizardlifecycleStatus').isValid())
						msgtext += '<br/>' + this.getComponent('ciCreateWizardPage2').getComponent('wizardlifecycleStatus').fieldLabel;
					if(!Ext.getCmp('wizardsla').isValid())
						msgtext += '<br/>' + this.getComponent('ciCreateWizardPage2').getComponent('wizardsla').fieldLabel;
					break;
			}
			
			Ext.MessageBox.show({
				title: 'Error',
				msg: msgtext,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
		}	
	},
	
	updateLabels: function(labels) {
		this.getFooterToolbar().getComponent('createstartbutton').setText(labels.createstartbutton);
		this.getFooterToolbar().getComponent('createbackbutton').setText(labels.createbackbutton);
		this.getFooterToolbar().getComponent('createcancelbutton').setText(labels.createcancelbutton);
		this.getFooterToolbar().getComponent('createnextbutton').setText(labels.createnextbutton);
		
		this.getComponent('ciCreateWizardPage0').updateLabels(labels);
		this.getComponent('ciCreateWizardPage1').updateLabels(labels);
		this.getComponent('ciCreateWizardPage2').updateLabels(labels);
		this.getComponent('ciCreateWizardPage3').updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
		this.getComponent('ciCreateWizardPage1').updateToolTips(toolTips);
		this.getComponent('ciCreateWizardPage2').updateToolTips(toolTips);
		this.getComponent('ciCreateWizardPage3').updateToolTips(toolTips);
	},

	isWizardStarted: function() {
//		this.wizardStarted = this.getLayout().getActiveItem() == 1;
		return this.wizardStarted;
	}
	
//	saveWizardOptions: function() {
//		var isSkipWizard = Ext.getCmp('wizardcbskip').getValue();
//		
//		var userOptionSaveStore = AIR.AirStoreFactory.createUserOptionSaveStore();
//		var params = {
//			cwid: AIR.AirApplicationManager.getCwid(),
//			token: AIR.AirApplicationManager.getToken(),
//			skipWizard: isSkipWizard ? 'YES' : 'NO'
//		};
//		
//		userOptionSaveStore.load({
//			params: params
//		});
//	}
});
Ext.reg('AIR.CiCreateWizardPagesView', AIR.CiCreateWizardPagesView);

//var wizardCurrentStep = 0;
//var wizardMaxSteps = 3;
var wizardApplicationKat1Id = 0;
var wizardApplicationKat1Name = '';
var wizardSAPName = false;

function loadStoreAndActivateCat2() {
	selectedCiCat1Id = wizardApplicationKat1Id;
//	Ext.getCmp('wizardapplicationCat2').store.load();
	//selectedServiceContractId = 0;
	Ext.getCmp('wizardapplicationCat2').reset();
	Ext.getCmp('wizardapplicationCat2').enable();
	Ext.getCmp('wizardapplicationCat2').setHideTrigger(false);
//	Ext.get('wizardapplicationCat2').dom.className='x-form-field x-form-text';
	var cbWizardapplicationCat2 = Ext.getCmp('wizardapplicationCat2');
	var el = cbWizardapplicationCat2.getEl();//null/undefined da noch nicht gerendert
	el.dom.className='x-form-field x-form-text';
	
}
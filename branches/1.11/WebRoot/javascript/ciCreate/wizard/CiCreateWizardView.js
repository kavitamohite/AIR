Ext.namespace('AIR');

AIR.CiCreateWizardView = Ext.extend(AIR.AirView, {
	page: 0,
	
	initComponent: function() {
		Ext.apply(this, {
			layout: 'card',
			activeItem: this.page,
			
//			height: 620,
			border: false,
		    
		    items: [{
		    	xtype: 'AIR.CiCreateWizardP1',
		    	id: 'ciCreateWizardP1'
			},{
		    	xtype: 'AIR.CiCreateWizardP2',
		    	id: 'ciCreateWizardP2'
			}],
			
			buttonAlign: 'left',
			buttons: [{
				id: 'bCancelW',
				text: ''
			},{
				id: 'bBackW',
				text: '',
				hidden: true
			},{
				id: 'bNextW',
				text: ''
			},{
				id: 'bFinishW',
				text: ''
			}]
		});
		
		AIR.CiCreateWizardView.superclass.initComponent.call(this);

		var bBackW = this.getFooterToolbar().getComponent('bBackW');
		var bCancelW = this.getFooterToolbar().getComponent('bCancelW');
		var bNextW = this.getFooterToolbar().getComponent('bNextW');
		var bFinishW = this.getFooterToolbar().getComponent('bFinishW');
		
		bBackW.on('click', this.onBack, this);
		bCancelW.on('click', this.onCancel, this);
		bNextW.on('click', this.onNext, this);
		bFinishW.on('click', this.onFinish, this);
		
		var tfCiNameW = this.getComponent('ciCreateWizardP1').getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').getComponent('tfCiNameW');
		tfCiNameW.on('change', this.onCiNameChange, this);
		
		
		this.objectNameAllowedStore = AIR.AirStoreFactory.getObjectNameAllowedStore();
		this.objectAliasAllowedStore = AIR.AirStoreFactory.getObjectAliasAllowedStore();
		
		this.objectNameAllowedStore.on('load', this.onNameAllowedCheck, this);
		this.objectAliasAllowedStore.on('load', this.onAliasAllowedCheck, this);
	},
	
	onCiNameChange: function(textfield, newValue, oldValue) {
		var tfApplicationAliasW = this.getComponent('ciCreateWizardP2').getComponent('ciCreateAppRequiredView').getComponent('tfApplicationAliasW');
		tfApplicationAliasW.setValue(newValue);
	},
	
	onBack: function(button, event) {
		if(this.page > 0)
			this.page--;
		this.getLayout().setActiveItem(this.page);
		button.setVisible(false);
		
		var bNextW = this.getFooterToolbar().getComponent('bNextW');
		bNextW.setVisible(true);
		
		this.setHeight(640);//620 470 440 420 360 400
	},
	
	onCancel: function(button, event) {
		var yesCallback = function() {
			this.wizardStarted = false;
			this.fireEvent('externalNavigation', this, null, 'clSearch');
		};

		var callbackMap = {
			yes: yesCallback.createDelegate(this)
		};
		
		var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CANCEL_WIZARD', callbackMap);
		dynamicWindow.show();
	},
	
	onNext: function(button, event) {
		this.page++;
		
		var labels = AIR.AirApplicationManager.getLabels();
		var title = this.getComponent('ciCreateWizardP1').getComponent('cbAppCat1W').getValue() === AC.APP_CAT1_APPLICATION ? labels.contactsCIOwnerApplication : labels.contactsCIOwner;
		
		this.getComponent('ciCreateWizardP2').getComponent('ciCreateAppRequiredView').getComponent('fsCiOwnerW').setTitle(title);
		this.getLayout().setActiveItem(this.page);
		button.setVisible(false);
		
		var bBackW = this.getFooterToolbar().getComponent('bBackW');
		bBackW.setVisible(true);
		
		this.setHeight(950);//620
	},
	
	onFinish: function(button, event) {
		var params = {
			cwid: AIR.AirApplicationManager.getCwid(),
			token: AIR.AirApplicationManager.getToken()
		};
		
		this.getComponent('ciCreateWizardP1').setData(params);
		this.getComponent('ciCreateWizardP2').setData(params);

		this.validateNewCiData(params);
	},
	
	validateNewCiData: function(params) {
		var labels = AIR.AirApplicationManager.getLabels();
		var errorData = [];
		
		if(this.isSAPApplication()) {
			if(params.applicationName.match(AC.REGEX_SAP_NAME) == null) {
				var sapNameLabel = labels.wizardapplicationNameSAP + ' (' + labels.wizardapplicationNameSAP1 + ', ' + labels.wizardapplicationNameSAP2 + ', ' + labels.wizardapplicationNameSAP3 + ')';
				errorData.push(sapNameLabel);
//				errorData.push(labels.wizardapplicationName);
			}
		} else {
			if(params.applicationName.length === 0)
				errorData.push(labels.wizardapplicationName);
			else if(params.applicationName.match(AC.REGEX_SAP_NAME) != null) {
				errorData.push(labels.wizardapplicationNameSAPillegal.replace('{0}', this.getComponent('ciCreateWizardP1').getComponent('cbAppCat1W').getRawValue()).replace('{1}', this.getComponent('ciCreateWizardP1').getComponent('cbAppCat2W').getRawValue()));
			}
		}
		
		if(!params.barRelevance || params.barRelevance === 'U')
			errorData.push(labels.rgBARrelevance);
		
		if(params.comments.length === 0)
			errorData.push(labels.comments);
		
		if(params.lifecycleStatusId.length === 0)
			errorData.push(labels.lifecycleStatus);
		
		if(params.applicationOwnerHidden.length === 0)
			errorData.push(labels.applicationOwner);
		
		if(params.applicationStewardHidden.length === 0)
			errorData.push(labels.applicationSteward);
		
		if(params.applicationOwnerDelegateHidden.length === 0)
			errorData.push(labels.applicationOwnerDelegate);
		
		
		if(errorData.length === 0) {
			var checkParams = {};
			this.params = params;
			
			this.objectNameAllowedStore.isLoaded = false;
			this.objectNameAllowedStore.load({
				params: { query: params.applicationName }
//				callback: function(store, records, options) {
//					store.isLoaded = true;
//					
//					if(this.objectAliasAllowedStore.isLoaded)
//						this.checkAlreadyExists(params);
//				}.createDelegate(this)
			});
			
			this.objectAliasAllowedStore.isLoaded = false;
			this.objectAliasAllowedStore.load({
				params: { query: params.applicationAlias }
//				callback: function(store, records, options) {
//					store.isLoaded = true;
//					
//					if(this.objectNameAllowedStore.isLoaded)
//						this.checkAlreadyExists(params);
//				}.createDelegate(this)
			});

		} else {
			this.params = null;
			var message = '<b>' + AIR.AirApplicationManager.getLabels().wizardDataNotValid.replace(/##/, 'Mandatory') + '</b><br><br>';
			
			for(var i = 0; i < errorData.length; i++)
				message += errorData[i] + '<br>';
			
			Ext.MessageBox.show({
				title: 'Error',
				msg: message,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
		}
	},
	
	onNameAllowedCheck: function(store, records, options) {
		store.isLoaded = true;
		
		if(this.objectAliasAllowedStore.isLoaded)
			this.checkAlreadyExists(this.params);
	},
	
	onAliasAllowedCheck: function(store, records, options) {
		store.isLoaded = true;
		
		if(this.objectNameAllowedStore.isLoaded)
			this.checkAlreadyExists(this.params);
	},
	
	checkAlreadyExists: function(params) {
		var nameNotExists = this.objectNameAllowedStore.data.items[0].data.countResultSet === '0';
		var aliasNotExists = this.objectAliasAllowedStore.data.items[0].data.countResultSet === '0';
		
		if(nameNotExists && aliasNotExists) {
			this.createApplication(params);
		} else {
			var message = '';
			
			if(!nameNotExists) {
				var text = AIR.AirApplicationManager.getLabels().wizardallowedNameText;
				text = text.replace('{0}', this.objectNameAllowedStore.lastOptions.params.query);
				text = text.replace('{1}', this.objectNameAllowedStore.data.items[0].data.informationText);
				message = text;//'Name <b>' + this.objectNameAllowedStore.lastOptions.params.query + '</b> already exists as <b>' + this.objectNameAllowedStore.data.items[0].data.informationText + '</b><br>Please choose another name or ask ITILcenter@bayer.com for help to enable this name<br>';
			}
			if(!aliasNotExists) {
				var text = AIR.AirApplicationManager.getLabels().wizardallowedAliasText;
				text = text.replace('{0}', this.objectAliasAllowedStore.lastOptions.params.query);
				text = text.replace('{1}', this.objectAliasAllowedStore.data.items[0].data.informationText);
				message += text;//+= AIR.AirApplicationManager.getLabels().wizardallowedAliasText.format();//'Alias <b>' + this.objectAliasAllowedStore.lastOptions.params.query + '</b> already exists as <b>' + this.objectAliasAllowedStore.data.items[0].data.informationText + '</b><br>Please choose another alias or ask ITILcenter@bayer.com for help to enable this alias<br>';
			}
			
			Ext.MessageBox.show({
				title: 'Error',
				msg: message,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
		}
	},
	
	createApplication: function(params) {
		var applicationCreateStore = AIR.AirStoreFactory.createApplicationCreateStore();
		applicationCreateStore.on('load', this.onApplicationCreate, this);
		applicationCreateStore.on('beforeload', this.onApplicationBeforeCreate, this);
		
		applicationCreateStore.load({
			params: params
		});
	},
	
	
	onApplicationBeforeCreate: function(store, options) {
		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		saveMask.show();
	},
	
	onApplicationCreate: function(store, records, options) {
		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		saveMask.hide();
		
		switch(records[0].data.result) {
			case 'OK':
//				selectedCIId = records[0].data.applicationId;
				AIR.AirApplicationManager.setCiId(records[0].data.applicationId);
				AIR.AirApplicationManager.setTableId(AC.TABLE_ID_APPLICATION);
				
				var data = {
					applicationName: this.getComponent('ciCreateWizardP1').getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').getComponent('tfCiNameW').getValue(),
					applicationCat1: this.getComponent('ciCreateWizardP1').getComponent('cbAppCat1W').getRawValue()
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
					
					this.fireEvent('externalNavigation', this, null, 'clCiCreateWizard');
//					this.wizardStart(true);
				}.createDelegate(this);
				
				var redirectToSearchCallback = function() {
//					selectedCIId = -1;
					AIR.AirApplicationManager.setCiId(-1);
					AIR.AirApplicationManager.setTableId(-1);
					
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
				//hier weiter mit neuen buttons: ja, (nein wie bisher OK)
				var isMarkedDeleted = records[0].data.displayMessage.indexOf('marked as deleted') > 0;
				
				if(isMarkedDeleted) {
					var reactivateCallback = function() {
						this.params.forceOverride = 'true';
						this.createApplication(this.params);
					}.createDelegate(this);
					
					var callbackMap = {
						'yes': reactivateCallback
					};
					
					var afterSaveAppFailWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', callbackMap, AIR.AirApplicationManager.getLabels().dynamicWindowCIreactivationPrompt);
					afterSaveAppFailWindow.show();
				} else {
					var afterSaveAppFailWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.displayMessage);
					afterSaveAppFailWindow.show();
				}
				break;
		}
	},
	
	reset: function() {
		this.wizardStarted = true;
//		if(this.page > 0) {
//			var bBackW = this.getFooterToolbar().getComponent('bBackW');
//			bBackW.fireEvent('click');
//		}
		
		this.getComponent('ciCreateWizardP1').reset();
		this.getComponent('ciCreateWizardP2').reset();
		
		this.page = 0;
//		this.getLayout().setActiveItem(this.page);
		var bBackW = this.getFooterToolbar().getComponent('bBackW');
		this.onBack(bBackW);
	},
	
	isWizardStarted: function() {
		return this.wizardStarted;
	},
	
	isSAPApplication: function() {
		var cat2Id = this.getComponent('ciCreateWizardP1').getComponent('cbAppCat2W').getValue();
		var isSapCat2 = this.getComponent('ciCreateWizardP1').getComponent('cbAppCat2W').getStore().getById(cat2Id).get('guiSAPNameWizard') === 'Y';//AC.CI_CAT1_SAP_CAT2_ID.indexOf(cat2Id) > -1;
		
		return isSapCat2;
	},
	
	updateLabels: function(labels) {
		this.getComponent('ciCreateWizardP1').updateLabels(labels);
		this.getComponent('ciCreateWizardP2').updateLabels(labels);
		
		this.getFooterToolbar().getComponent('bBackW').setText(labels.createbackbutton);
		this.getFooterToolbar().getComponent('bCancelW').setText(labels.createcancelbutton);
		this.getFooterToolbar().getComponent('bNextW').setText(labels.createnextbutton);
		this.getFooterToolbar().getComponent('bFinishW').setText(labels.createfinishbutton);
	}
});
Ext.reg('AIR.CiCreateWizardView', AIR.CiCreateWizardView);
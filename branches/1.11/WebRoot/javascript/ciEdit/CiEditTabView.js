Ext.namespace('AIR');

AIR.CiEditTabView = Ext.extend(Ext.Panel, {
	
	initComponent: function() {
		
		Ext.apply(this, {
			layout: 'card',
			activeItem: 0,
		    margins: '5 5 5 5',
			hidden: false,
			plain: true,
			border: false,
			buttonAlign: 'left',
			
			autoScroll: true,
			style: {
				marginTop: 30
			},
			
			items: [{ 
				id: 'clCiDetails',
				xtype: 'AIR.CiDetailsView'
		     }, {
		    	 id: 'clCiSpecifics',
	    		 xtype: 'AIR.CiSpecificsView'
		     }, {
	    		 id: 'clCiContacts',
	    		 xtype: 'AIR.CiContactsView'
		     }, {
	    		 id: 'clCiAgreements',
	    		 xtype: 'AIR.CiAgreementsView'
		     }, {
	    		 id: 'clCiProtection',
	    		 xtype: 'AIR.CiProtectionView'
		     }, {
	    		 id: 'clCiCompliance',
	    		 xtype: 'AIR.CiComplianceView'
		     }, {
	    		 id: 'clCiLicense',
	    		 xtype: 'AIR.CiLicenseView'
		     }, {
	    		 id: 'clCiConnections',
	    		 xtype: 'AIR.CiConnectionsView'
		     }, {
	    		 id: 'clCiSupportStuff',
	    		 xtype: 'AIR.CiSupportStuffView'
		     }, {
	    		 id: 'clCiHistory',
	    		 xtype: 'AIR.CiHistoryView'
		     }],
		     buttons: [{
				id: 'savebutton',
				text: 'Save',
				hidden: true
			}, {
				id: 'cancelbutton',
				text: 'Cancel',
				hidden: true
			}]
		});
		
		AIR.CiEditTabView.superclass.initComponent.call(this);
		
		this.addEvents('airAction');
		
		
		var bSave = this.getFooterToolbar().getComponent('savebutton');
		bSave.on('click', this.onSaveApplication, this);
		
		var bCancel = this.getFooterToolbar().getComponent('cancelbutton');
		bCancel.on('click', this.cancelApplication, this);
		
		
		var ciDetailsView = this.getComponent('clCiDetails');
		ciDetailsView.on('ciChange', this.onCiChange, this);
		
		var ciSpecificsView = this.getComponent('clCiSpecifics');
		ciSpecificsView.on('ciChange', this.onCiChange, this);
		ciSpecificsView.on('ciInvalid', this.onCiInvalid, this);
		
		var ciContactsView = this.getComponent('clCiContacts');
		ciContactsView.on('ciChange', this.onCiChange, this);
		
		var ciAgreementsView = this.getComponent('clCiAgreements');
		ciAgreementsView.on('ciChange', this.onCiChange, this);

		var ciProtectionView = this.getComponent('clCiProtection');
		ciProtectionView.on('ciChange', this.onCiChange, this);		
		
		var ciComplianceView = this.getComponent('clCiCompliance');
		ciComplianceView.on('ciChange', this.onCiChange, this);
		ciComplianceView.on('complianceTypeChange', this.onComplianceTypeChange, this);
		
		var ciLicenseView = this.getComponent('clCiLicense');
		ciLicenseView.on('ciChange', this.onCiChange, this);
		
		var ciConnectionsView = this.getComponent('clCiConnections');
		ciConnectionsView.on('ciChange', this.onCiChange, this);

		var ciSupportStuffView = this.getComponent('clCiSupportStuff');
		ciSupportStuffView.on('ciChange', this.onCiChange, this);

		var ciHistoryView = this.getComponent('clCiHistory');
		ciHistoryView.on('ciChange', this.onCiChange, this);
		
		this.isLoaded = false;
		this.isUserChange = false;
		this.ciModified = false;
	},
	
	onCiChange: function(view, viewElement, changedViewItems) {
		if(this.isUserChange) {
			this.enableButtons();
			this.ciModified = true;
		}
	},
	
	onCiInvalid: function(view, viewElement, changedViewItems) {
		this.disableButtons();
	},

	
	onNavigation: function(viewId, link) {
		this.getLayout().setActiveItem(viewId);
		if(!this.isLoaded) {
			this.isLoaded = true;
			this.loadCiDetails();
		}
	},
	
	loadCiDetails: function() {
		var appDetailStore = AIR.AirStoreFactory.createApplicationDetailStore();
		appDetailStore.on('beforeload', this.onBeforeLoadApplication, this);
		appDetailStore.on('load', this.onLoadApplication, this);
		
		appDetailStore.load({
			params: {
				applicationId: AIR.AirApplicationManager.getCiId(),
   			 	cwid: AIR.AirApplicationManager.getCwid(),
   			 	token: AIR.AirApplicationManager.getToken()
			}
		});
	},
	
	onBeforeLoadApplication: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
	},
	
	onLoadApplication: function(store, records, options) {
		this.ciModified = false;
		
		var appDetail = records[0].data;
		AIR.AirApplicationManager.setAppDetail(appDetail);
		
		
		//update all detail pages' textfield,textarea Elements. Rafac with findByXType('textfield') for if...
		for(var k = 0; k < records[0].fields.keys.length; ++k)
			if(Ext.getCmp(records[0].fields.keys[k]) !== undefined)
				Ext.getCmp(records[0].fields.keys[k]).setValue(appDetail[records[0].fields.keys[k]]);
		//update all detail pages' textfield,textarea(,combo?) Elements
		
		
//		//Refac after CentralController creation
//		Ext.get('editpanelheader').dom.innerHTML = appDetail.applicationName;
//		Ext.get('editpanelsubheader').dom.innerHTML = appDetail.applicationCat1Txt;
		Ext.getCmp('editpanelheader').setText(appDetail.applicationName);
		Ext.getCmp('editpanelsubheader').setText(appDetail.applicationCat1Txt);

		//---------------------------------------------------------------------------------------------------------
		AIR.AirAclManager.updateAcl(appDetail);// RFC 8225: added appDetail param
//		AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft());
		
		
		var store = AIR.AirStoreManager.getStoreByName('applicationCat2ListStore');
		var applicationCat2 = AIR.AirApplicationManager.getAppDetail().applicationCat2;
		applicationCat2 = applicationCat2.length > 0 && applicationCat2 != '0' && store.getById(AIR.AirApplicationManager.getAppDetail().applicationCat2) ? store.getById(AIR.AirApplicationManager.getAppDetail().applicationCat2).data.text : '';
		
		store = AIR.AirStoreManager.getStoreByName('categoryBusinessListStore');
		var categoryBusiness = AIR.AirApplicationManager.getAppDetail().categoryBusinessId;
		categoryBusiness = categoryBusiness.length > 0 && categoryBusiness != '0' && store.getById(AIR.AirApplicationManager.getAppDetail().categoryBusinessId) ? store.getById(AIR.AirApplicationManager.getAppDetail().categoryBusinessId).data.text : '';
		
		store = AIR.AirStoreManager.getStoreByName('slaListStore');
		var slaName = AIR.AirApplicationManager.getAppDetail().slaId;
		slaName = slaName.length > 0 && slaName != '0' && store.getById(AIR.AirApplicationManager.getAppDetail().slaId) ? store.getById(AIR.AirApplicationManager.getAppDetail().slaId).data.text : '';

		store = AIR.AirStoreManager.getStoreByName('businessEssentialListStore');
		var businessEssential = AIR.AirApplicationManager.getAppDetail().businessEssentialId;
		businessEssential = businessEssential.length > 0 && businessEssential != '0' && store.getById(AIR.AirApplicationManager.getAppDetail().businessEssentialId) ? store.getById(AIR.AirApplicationManager.getAppDetail().businessEssentialId).data.text : '';

		
		var detailsData = {
			applicationCat1Txt: AIR.AirApplicationManager.getAppDetail().applicationCat1Txt,
			applicationAlias: AIR.AirApplicationManager.getAppDetail().applicationAlias,
			barApplicationId: AIR.AirApplicationManager.getAppDetail().barApplicationId,
			applicationCat2: applicationCat2,
			categoryBusiness: categoryBusiness,
			ciResponsible: AIR.AirApplicationManager.getAppDetail().ciResponsible,
			applicationOwner: AIR.AirApplicationManager.getAppDetail().applicationOwner,
			slaName: slaName,//AIR.AirStoreManager.getStoreByName('slaListStore').getById(AIR.AirApplicationManager.getAppDetail().slaId).data.text,
			businessEssential: businessEssential,//AIR.AirStoreManager.getStoreByName('businessEssentialListStore').getById(AIR.AirApplicationManager.getAppDetail().businessEssentialId).data.text,
			
			insertQuelle: AIR.AirApplicationManager.getAppDetail().insertQuelle,
			insertUser: AIR.AirApplicationManager.getAppDetail().insertUser,
			insertTimestamp: AIR.AirApplicationManager.getAppDetail().insertTimestamp,
			updateQuelle: AIR.AirApplicationManager.getAppDetail().updateQuelle,
			updateUser: AIR.AirApplicationManager.getAppDetail().updateUser,
			updateTimestamp: AIR.AirApplicationManager.getAppDetail().updateTimestamp,
			
			//mailTemplate
			applicationName: AIR.AirApplicationManager.getAppDetail().applicationName,
			ciSubResponsible: AIR.AirApplicationManager.getAppDetail().ciSubResponsible
		};

		
		var ciDetailsView = this.getComponent('clCiDetails');
		ciDetailsView.update(detailsData);
		
		var ciSpecificsView = this.getComponent('clCiSpecifics');
//		ciSpecificsView.getComponent('applicationCat2').getStore().filter('applicationCat1Id', appDetail.applicationCat1Id);
		ciSpecificsView.update(AIR.AirApplicationManager.getAppDetail());
//		ciSpecificsView.doLayout();
		
		var ciContactsView = this.getComponent('clCiContacts');
		ciContactsView.update(AIR.AirApplicationManager.getAppDetail());
//		ciContactsView.doLayout();//wegen CommandLinks: wenn zuvor CI ohne Editrechte ausgeählt war und anschl. eine CI mit Editrechten, war Layout zerschossen
		
		var ciAgreementsView = this.getComponent('clCiAgreements');
		ciAgreementsView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciProtectionView = this.getComponent('clCiProtection');
		ciProtectionView.update(AIR.AirApplicationManager.getAppDetail());
		

		var ciLicenseView = this.getComponent('clCiLicense');
		ciLicenseView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciComplianceView = this.getComponent('clCiCompliance');
		ciComplianceView.update(AIR.AirApplicationManager.getAppDetail());
//		ciComplianceView.updateAcl();
//		ciComplianceView.doLayout(true,true);//wegen IE .getComponent('fsComplianceDetails')
		
		var ciConnectionsView = this.getComponent('clCiConnections');
		ciConnectionsView.update();
		
		var ciSupportStuff = this.getComponent('clCiSupportStuff');
		ciSupportStuff.update();
//		ciSupportStuff.doLayout();
		
		var ciHistory = this.getComponent('clCiHistory');
		ciHistory.update();
		
		
		var task = new Ext.util.DelayedTask(function() {
			AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft());
//			AIR.AirAclManager.updateAcl();
		}.createDelegate(this));
		task.delay(1500);
		
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
		
		
		//das Akzeptieren von User Bedienaktionen (textfeld Änderungen, combo Auswahlen, ...) erst jetzt wieder freischalten für
		//den Empfang von ciChange Events
//		this.isUserChange = true;
		var task = new Ext.util.DelayedTask(function() {
			this.isUserChange = true;
			this.doLayout();

		}.createDelegate(this));
		task.delay(1000);//1000 2000
		
		this.disableButtons();
		

//		this.fireEvent('airAction', this, 'appLoadSuccess');
	},
	
	
	//move to CiCenterView CiEditView ?
	onSaveApplication: function(button, event) {
//		this.disableButtons();
		
		//mySaveMask.show();
		this.saveApplication();
	},
	
	//move to CiCenterView ?
	saveApplication: function(options) {//button, event
		if(!options)//damit nach compl. status Wechsel von Undefined auf External nicht der save button deaktiviert bleibt
			this.isUserChange = false;
		this.ciModified = false;
		
//		var labels = AIR.AirApplicationManager.getLabels();
		
		if(!AIR.AirAclManager.isEditMaskValid()) {
			msgtext = AIR.AirApplicationManager.getLabels().editDataNotValid.replace(/##/, AIR.AirApplicationManager.getAppDetail().applicationName);//this.getComponent('applicationName').getValue()
			Ext.MessageBox.show({
				title: 'Error',
				msg: msgtext,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		}

		var applicationSaveStore = AIR.AirStoreFactory.createApplicationSaveStore();
		var callback = options && options.callback ? options.callback : this.onApplicationSave;
		applicationSaveStore.on('load', callback, this);
		this.skipLoading = options && options.skipLoading ? true : false;

		
		var data = {};
		
		var ciSpecificsView = this.getComponent('clCiSpecifics');
		ciSpecificsView.setData(data);
		//var data = ciSpecificsView.getData();
		//for(var key in data)
			//applicationSaveStore.setBaseParam(key, data[key]);
		
		
		var ciContactsView = this.getComponent('clCiContacts');
		ciContactsView.setData(data);
		/*var data = ciContactsView.getData();
		for(var key in data)
			applicationSaveStore.setBaseParam(key, data[key]);*/
		
		
		var ciAgreementsView = this.getComponent('clCiAgreements');
		ciAgreementsView.setData(data);
		/*var data = ciAgreementsView.getData();
		for(var key in data)
			applicationSaveStore.setBaseParam(key, data[key]);*/
		

		var ciProtectionView = this.getComponent('clCiProtection');
		ciProtectionView.setData(data);
		/*var data = ciProtectionView.getData();
		for(var key in data)
			applicationSaveStore.setBaseParam(key, data[key]);*/
		
		
		var ciComplianceView = this.getComponent('clCiCompliance');
		ciComplianceView.setData(data);
		/*var data = ciComplianceView.getData();//use updatedCiData object and pass it as params to the applicationSaveStore.load method!
		for(var key in data)
			applicationSaveStore.setBaseParam(key, data[key]);*/
		
		
		var ciLicenseView = this.getComponent('clCiLicense');
		ciLicenseView.setData(data);
		/*var data = ciLicenseView.getData();//use updatedCiData object and pass it as params to the applicationSaveStore.load method!
		for(var key in data)
			applicationSaveStore.setBaseParam(key, data[key]);*/
		
		
		var ciConnectionsView = this.getComponent('clCiConnections');
		var modifiedCiConnectionData = ciConnectionsView.getCiConnectionDataChanges();
		for(var key in modifiedCiConnectionData)
			if(modifiedCiConnectionData[key].length > 0)
				data.key = modifiedCiConnectionData[key];
		/*for(var key in modifiedCiConnectionData)
			if(modifiedCiConnectionData[key].length > 0)
				applicationSaveStore.setBaseParam(key, modifiedCiConnectionData[key]);*/
		
		
		var ciSupportStuffView = this.getComponent('clCiSupportStuff');
		ciSupportStuffView.setData(data);
		/*var data = ciSupportStuffView.getData();//use updatedCiData object and pass it as params to the applicationSaveStore.load method!
		for(var key in data)
			applicationSaveStore.setBaseParam(key, data[key]);*/
		
		

		// the save action is called by loading the saveStore
		/*var options = {
			callback: function() {
				var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED');
				dynamicWindow.show();
			}
		};*/
		
		//applicationSaveStore.load();
		
		
		var saveCallback = function() {
			mySaveMask.show();
			applicationSaveStore.load({
				params: data
			});
			
			//applicationSaveStore.load();
		}
		
		this.checkItsecGroup(data, AIR.AirApplicationManager.getAppDetail(), saveCallback);
	},
	
	checkItsecGroup: function(newAppDetail, appDetail, saveCallback) {
		if(newAppDetail.itSecGroupId && appDetail.itsecGroupId !== newAppDetail.itSecGroupId) {
			var callbackMap = {
				'yes': saveCallback
			};
			
			var title = 'ITSec Group';
			var message = 'You changed the ITSec Group of this application CI. Are you sure to delete all ITSec Controls of the previously selected ITSec Group?';
			
			var confirmItsecGroupSaveWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CONFIRM_ITSEC_GROUP_SAVE', callbackMap, message,title);
			confirmItsecGroupSaveWindow.show();
		} else {
			saveCallback();
		}
	},
	
	cancelApplication: function() {
		var verwerfenCallback = function() {
//			cancelApplicationDetail(button, event); //ORIG
			
//			actionButtonHandler(true, false);//first refactor measure
			
			//just open CiSearchView, refac: use event to notify ciCenterView and CiNavigationView
//			var ciCenterView = this.getComponent('workpanel');
//			ciCenterView.getLayout().setActiveItem('searchpanel');
			
//			var ciNavigationView = this.getComponent('ciNavigationCiew');
//			ciNavigationView.onApplicationCancel();
			
			this.ciModified = false;
			this.fireEvent('externalNavigation', this, null, 'clSearch');
		};
		
		var callbackMap = {
			'yes': verwerfenCallback.createDelegate(this)
		};
		
		var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CANCEL_CONFIRMATION', callbackMap);
		dynamicWindow.show();
	},
	
	updateLabels: function(labels) {
		//start label language changes of all detail views here?
		
		this.getFooterToolbar().getComponent('savebutton').setText(labels.button_general_save);
		this.getFooterToolbar().getComponent('cancelbutton').setText(labels.button_general_cancel);
	},
	
	enableButtons: function() {
		var panelMsg = AIR.AirAclManager.listRequiredFields();
		
		if(panelMsg.length == 0) {
			this.setPanelMessage(panelMsg);
			
			var bSave = this.getFooterToolbar().getComponent('savebutton');
			var bCancel = this.getFooterToolbar().getComponent('cancelbutton');
			
			bSave.show();
			bCancel.show();
			
			this.fireEvent('airAction', this, 'clear');
		} else {
			this.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));
			
			this.disableButtons();
		}
		
		/*
		//geht nicht mehr richtig seit neuem Wizard und neuen Wizard items in der AttributeProperties.xml. Siehe AIR.AirAclManager::isEditMaskValid: valid = valid && aclItemCmp.isValid();
//		if(AIR.AirAclManager.isEditMaskValid()) {
		if(panelMsg.length == 0) {
			var bSave = this.getFooterToolbar().getComponent('savebutton');
			var bCancel = this.getFooterToolbar().getComponent('cancelbutton');
			
			bSave.show();
			bCancel.show();
		
//			showCiDetailDataChanged = true;
//			showCiDetailDataChanged = false;//!! used by checkDataChanged function
		} else {
			this.disableButtons();
		}*/
	},
	
	disableButtons: function() {
		var bSave = this.getFooterToolbar().getComponent('savebutton');
		var bCancel = this.getFooterToolbar().getComponent('cancelbutton');
		
		bSave.hide();
		bCancel.hide();
	},
	
	onApplicationSave: function(store, records, options) {
		mySaveMask.hide();
		
		if('OK' === records[0].data.result) {
//			deactivateButtonSaveApplication();
			this.disableButtons();
			
			var ciConnectionsView = this.getComponent('clCiConnections');
			ciConnectionsView.commitChanges();

			if(!this.skipLoading)
				this.loadCiDetails();
			
			this.fireEvent('airAction', this, 'appSaveSuccess');//(bestimmte) appDetail Daten mitgeben?
			
			
			//refactor remove global bIsDynamicWindowSpeichern and delegateCallback. See also commonfunctions::AIR.AirWindowFactory.createDynamicMessageWindow
			//--> case 'DATA_CHANGED', case 'DATA_SAVED'
//			if(bIsDynamicWindowSpeichern) {
//				delegateCallback();//wird durch commonfunctions::AIR.AirWindowFactory.createDynamicMessageWindow: case 'DATA_CHANGED' delegateCallback = callbackMap['verwerfen']; gesetzt
//				bIsDynamicWindowSpeichern = false;//see commonvars.js
//			}
		} else {
			var dataSavedErrorWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.messages);//callbackMap
			dataSavedErrorWindow.show();
		}
	},
	
	onComplianceTypeChange: function(ciConnectionsView, rgb, previousComplianceType, complianceType) {
//		this.disableButtons();//see  (*1) in CiConnectionsView. No effect since this.enableButtons() is called afterwards
		
		var callback = function(store, records, options) {
			ciConnectionsView.getComponent('fsComplianceDetails').setVisible(false);
			ciConnectionsView.getComponent('fsComplianceInfo').setVisible(true);
			
			this.onCiChange();
		};
		
		var options = {
			callback: callback.createDelegate(this)
		};
		
		this.saveApplication(options);
	},
	
	update: function() {

	},
	
	updateLabels: function(labels) {
		var ciDetailsView = this.getComponent('clCiDetails');
		ciDetailsView.updateLabels(labels);
		
		var ciSpecificsView = this.getComponent('clCiSpecifics');
		ciSpecificsView.updateLabels(labels);
		
		var ciContactsView = this.getComponent('clCiContacts');
		ciContactsView.updateLabels(labels);

		var ciAgreementsView = this.getComponent('clCiAgreements');
		ciAgreementsView.updateLabels(labels);

		var ciProtectionView = this.getComponent('clCiProtection');
		ciProtectionView.updateLabels(labels);
		
		var ciComplianceView = this.getComponent('clCiCompliance');
		ciComplianceView.updateLabels(labels);
		
		var ciConnectionsView = this.getComponent('clCiConnections');
		ciConnectionsView.updateLabels(labels);

		var ciLicenseView = this.getComponent('clCiLicense');
		ciLicenseView.updateLabels(labels);

		var ciSupportStuffView = this.getComponent('clCiSupportStuff');
		ciSupportStuffView.updateLabels(labels);
		
		var ciHistoryView = this.getComponent('clCiHistory');
		ciHistoryView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
//		var ciDetailsView = this.getComponent('clCiDetails');
//		ciDetailsView.updateToolTips(toolTips);
		
		var ciSpecificsView = this.getComponent('clCiSpecifics');
		ciSpecificsView.updateToolTips(toolTips);
		
		var ciContactsView = this.getComponent('clCiContacts');
		ciContactsView.updateToolTips(toolTips);

		var ciAgreementsView = this.getComponent('clCiAgreements');
		ciAgreementsView.updateToolTips(toolTips);

		var ciProtectionView = this.getComponent('clCiProtection');
		ciProtectionView.updateToolTips(toolTips);
		
		var ciComplianceView = this.getComponent('clCiCompliance');
		ciComplianceView.updateToolTips(toolTips);
		
		var ciConnectionsView = this.getComponent('clCiConnections');
		ciConnectionsView.updateToolTips(toolTips);

		var ciLicenseView = this.getComponent('clCiLicense');
		ciLicenseView.updateToolTips(toolTips);

		var ciSupportStuffView = this.getComponent('clCiSupportStuff');
		ciSupportStuffView.updateToolTips(toolTips);
		
//		var ciHistoryView = this.getComponent('clCiHistory');
//		ciHistoryView.updateToolTips(toolTips);
	},
	
	onCiSelected: function() {
		this.reset();
	},
	
	reset: function() {
		this.isLoaded = false;
		this.isUserChange = false;
		
//		this.disableButtons();
	},


	setPanelMessage: function(message) {
		if(message && message.length > 0) {
			Ext.getCmp('editpanelmessage').setText(message);
			Ext.getCmp('editpanelmessage').show();
		} else {
			Ext.getCmp('editpanelmessage').hide();
		}
	},
	
	isCiModified: function() {
		return this.ciModified;
	}
	
//	afterRender: function(ct) {
//		Util.log(ct.getId);
//		AIR.CiEditTabView.superclass.afterRender.call(this);
//		
//		//wegen rgRelevanceBYTSEC und cbgRegulations Layout Problem: keine Abstände zwischen radio buttons/checkboxen
//		this.doLayout();
//		
//	}
});
Ext.reg('AIR.CiEditTabView', AIR.CiEditTabView);
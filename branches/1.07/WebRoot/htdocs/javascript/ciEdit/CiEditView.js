Ext.namespace('AIR');

AIR.CiEditView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			padding: 20,
			autoScroll: true,
		    
			layout: 'form',//urspr. kein layout
		    border: false,
//		    cls: 'x-plain',
		    
		    items: [{
		    	xtype: 'label',
		    	id: 'editpanelheader',
				
				style: {
//					textAlign: 'left',
					backgroundColor: panelbgcolor,
					color: fontColor,
					fontFamily: fontType,
					fontWeight: 'bold',
					fontSize: '12pt'
//					float: 'left'
				}
			},{
				xtype: 'container'
			},{
		    	xtype: 'label',
		    	id: 'editpanelsubheader',
				
				style: {
//					textAlign: 'left',
					backgroundColor: panelbgcolor,
					color: fontColor,
					fontFamily: fontType,
					fontWeight: 'bold',
					fontSize: '8pt'
//					float: 'left'
				}
			},{ 
				xtype: 'container',	  
				html: '<hr>',
				id: 'editpanelhr',
				cls: 'x-plain',
				
				style: {
					color: '#d0d0d0',
//					backgroundColor: '#d0d0d0',
//					height: '1px',
					
					marginBottom: 10
				}
			},{
				xtype: 'label',
				id: 'editpaneldraft',
				
				style: {
//					textAlign: 'right',
					backgroundColor: panelbgcolor,
					color: panelDraftMsgColor,
					
					fontFamily: fontType,
					fontWeight: 'bold',
					fontSize: '10pt',
					
					float: 'right'
//					marginBottom: 20
				}
			},{
				//Layout verbessern: nach unten, ist zu weit oben
				xtype: 'label',
				id: 'editpanelmessage',
				hidden: true,
				
				style: {
					textAlign: 'left',
					borderStyle: 'solid',
					borderWidth: '1pt',
					borderColor: panelErrorMsgColor,
					backgroundColor: panelbgcolor,
					
					color: panelErrorMsgColor,
					padding: 3,//'2 5 2 5',
					
					fontFamily: fontType,
					fontWeight: 'bold',
					fontSize: 12
					
//					marginTop: 40
				}
			},{
				xtype: 'panel',
				id: 'ciEditTabView',
			
				layout: 'card',
				activeItem: 0,
				margins: '5 5 5 5',
				hidden: false,
				plain: true,
				border: false,
				
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
				buttonAlign: 'left',
				buttons: [{
					id: 'savebutton',
					text: 'Save',
					hidden: true
				}, {
					id: 'cancelbutton',
					text: 'Cancel',
					hidden: true
				}]
			}]
		});
		
		AIR.CiEditView.superclass.initComponent.call(this);
		
		this.addEvents('airAction');
		
		
		var bSave = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('savebutton');
		bSave.on('click', this.onSaveApplication, this);
		
		var bCancel = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('cancelbutton');
		bCancel.on('click', this.cancelApplication, this);
		
		
		var ciDetailsView = this.getComponent('ciEditTabView').getComponent('clCiDetails');
		ciDetailsView.on('ciChange', this.onCiChange, this);
		
		var ciSpecificsView = this.getComponent('ciEditTabView').getComponent('clCiSpecifics');
		ciSpecificsView.on('ciChange', this.onCiChange, this);
		ciSpecificsView.on('ciInvalid', this.onCiInvalid, this);
		
		var ciContactsView = this.getComponent('ciEditTabView').getComponent('clCiContacts');
		ciContactsView.on('ciChange', this.onCiChange, this);
		
		var ciAgreementsView = this.getComponent('ciEditTabView').getComponent('clCiAgreements');
		ciAgreementsView.on('ciChange', this.onCiChange, this);

		var ciProtectionView = this.getComponent('ciEditTabView').getComponent('clCiProtection');
		ciProtectionView.on('ciChange', this.onCiChange, this);		
		
		var ciComplianceView = this.getComponent('ciEditTabView').getComponent('clCiCompliance');
		ciComplianceView.on('ciChange', this.onCiChange, this);
		ciComplianceView.on('complianceTypeChange', this.onComplianceTypeChange, this);
		ciComplianceView.on('itsecGroupEdit', this.onItsecGroupEdit, this);
		
		var ciLicenseView = this.getComponent('ciEditTabView').getComponent('clCiLicense');
		ciLicenseView.on('ciChange', this.onCiChange, this);
		
		var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
		ciConnectionsView.on('ciChange', this.onCiChange, this);

		var ciSupportStuffView = this.getComponent('ciEditTabView').getComponent('clCiSupportStuff');
		ciSupportStuffView.on('ciChange', this.onCiChange, this);

		var ciHistoryView = this.getComponent('ciEditTabView').getComponent('clCiHistory');
		ciHistoryView.on('ciChange', this.onCiChange, this);
		
		this.isLoaded = false;
		this.isUserChange = false;
		this.ciModified = false;
		
		this.callContext = {};
	},
	
	updateLabels: function(labels) {
		this.getComponent('editpanelmessage').setText(labels.header_applicationIsIncomplete.replace('##', incompleteFieldList));
    	this.getComponent('editpaneldraft').setText(labels.header_applicationIsDraft.replace('##', draftFlag));
    	
		var ciEditTabView = this.getComponent('ciEditTabView');
		if(ciEditTabView)
			ciEditTabView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
		var ciEditTabView = this.getComponent('ciEditTabView');
		if(ciEditTabView)
			ciEditTabView.updateToolTips(toolTips);
	},
	
	/*update: function(data) {
		this.getComponent('editpanelheader').setText(data.applicationName);
		this.getComponent('editpanelsubheader').setText(data.applicationCat1Txt);
	},*/
	
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
		this.getComponent('ciEditTabView').getLayout().setActiveItem(viewId);
		
		this.handleNavigation(viewId);
		if(this.isLoaded) {
			//this.handleNavigation(viewId);
		} else {
			this.isLoaded = true;
			this.loadCiDetails();
		}
	},
	
	handleNavigation: function(viewId) {
		switch(viewId) {
			case 'clCiHistory':
				var ciHistory = this.getComponent('ciEditTabView').getComponent('clCiHistory');
				ciHistory.update();
				break;
			default: break;
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
		myLoadMask.show();
	},
	
	onLoadApplication: function(store, records, options) {
		this.ciModified = false;
		
		var appDetail = records[0].data;
		if(appDetail.applicationCat1Id == '0')
			appDetail.applicationCat1Id = '5';
		AIR.AirApplicationManager.setAppDetail(appDetail);
		
		
		//update all detail pages' textfield,textarea Elements. Rafac with findByXType('textfield') for if...
		/*for(var k = 0; k < records[0].fields.keys.length; ++k)
			if(Ext.getCmp(records[0].fields.keys[k]) !== undefined)
				Ext.getCmp(records[0].fields.keys[k]).setValue(appDetail[records[0].fields.keys[k]]);*/
		//update all detail pages' textfield,textarea(,combo?) Elements
		

		this.getComponent('editpanelheader').setText(appDetail.applicationName);
		this.getComponent('editpanelsubheader').setText(appDetail.applicationCat1Txt);

		//---------------------------------------------------------------------------------------------------------
		//AIR.AirAclManager.updateAcl(appDetail);// RFC 8225: added appDetail param
		
		
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

		
		var ciDetailsView = this.getComponent('ciEditTabView').getComponent('clCiDetails');
		ciDetailsView.update(detailsData);
		
		var ciSpecificsView = this.getComponent('ciEditTabView').getComponent('clCiSpecifics');
		ciSpecificsView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciContactsView = this.getComponent('ciEditTabView').getComponent('clCiContacts');
		ciContactsView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciAgreementsView = this.getComponent('ciEditTabView').getComponent('clCiAgreements');
		ciAgreementsView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciProtectionView = this.getComponent('ciEditTabView').getComponent('clCiProtection');
		ciProtectionView.update(AIR.AirApplicationManager.getAppDetail());

		var ciLicenseView = this.getComponent('ciEditTabView').getComponent('clCiLicense');
		ciLicenseView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciComplianceView = this.getComponent('ciEditTabView').getComponent('clCiCompliance');
		ciComplianceView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
		ciConnectionsView.update(AIR.AirApplicationManager.getAppDetail());
		
		var ciSupportStuff = this.getComponent('ciEditTabView').getComponent('clCiSupportStuff');
		ciSupportStuff.update(AIR.AirApplicationManager.getAppDetail());
		
		//var ciHistory = this.getComponent('ciEditTabView').getComponent('clCiHistory');
		//ciHistory.update();
		
		
		var task = new Ext.util.DelayedTask(function() {
			AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft());
//			AIR.AirAclManager.updateAcl();
		}.createDelegate(this));
		task.delay(1500);
		
		myLoadMask.hide();
		
		
		//das Akzeptieren von User Bedienaktionen (textfeld Änderungen, combo Auswahlen, ...) erst jetzt wieder freischalten für
		//den Empfang von ciChange Events
//		this.isUserChange = true;
		var task = new Ext.util.DelayedTask(function() {
			this.isUserChange = true;
			this.doLayout();

		}.createDelegate(this));
		task.delay(1000);//1000 2000
		
		this.disableButtons();
		
		var panelMsg = AIR.AirAclManager.listRequiredFields(AIR.AirApplicationManager.getAppDetail());
		if(panelMsg.length > 0) {
			this.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));
		} else {
			this.setPanelMessage(panelMsg);
		}

		if(this.callContext.itsecGroupEdit) {
			var callback = this.callContext.itsecGroupEdit.callback.createDelegate(ciComplianceView);
			var params = this.callContext.itsecGroupEdit.params;

			callback(params);
			delete this.callContext.itsecGroupEdit;
		}
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
		
		var ciSpecificsView = this.getComponent('ciEditTabView').getComponent('clCiSpecifics');
		ciSpecificsView.setData(data);

		var ciContactsView = this.getComponent('ciEditTabView').getComponent('clCiContacts');
		ciContactsView.setData(data);

		var ciAgreementsView = this.getComponent('ciEditTabView').getComponent('clCiAgreements');
		ciAgreementsView.setData(data);

		var ciProtectionView = this.getComponent('ciEditTabView').getComponent('clCiProtection');
		ciProtectionView.setData(data);

		var ciComplianceView = this.getComponent('ciEditTabView').getComponent('clCiCompliance');
		ciComplianceView.setData(data);

		var ciLicenseView = this.getComponent('ciEditTabView').getComponent('clCiLicense');
		ciLicenseView.setData(data);
		
		var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
		ciConnectionsView.setData(data);
		
		var ciSupportStuffView = this.getComponent('ciEditTabView').getComponent('clCiSupportStuff');
		ciSupportStuffView.setData(data);

		var saveCallback = function() {
			mySaveMask.show();
			applicationSaveStore.load({
				params: data
			});
		};
		
		this.checkItsecGroup(data, AIR.AirApplicationManager.getAppDetail(), saveCallback);
	},
	
	checkItsecGroup: function(newAppDetail, appDetail, saveCallback) {
		if(newAppDetail.itSecGroupId && newAppDetail.itSecGroupId !== AC.CI_GROUP_ID_NON_BYTSEC && newAppDetail.itSecGroupId !== AC.CI_GROUP_ID_DELETE_ID && newAppDetail.itSecGroupId !== AC.CI_GROUP_ID_EMPTY && appDetail.itsecGroupId !== newAppDetail.itSecGroupId) {
			var callbackMap = {
				yes: saveCallback
			};
			
			var labels = AIR.AirApplicationManager.getLabels();
			
			var confirmItsecGroupSaveWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CONFIRM_ITSEC_GROUP_SAVE', callbackMap, labels.checkItsecGroupWindowMessage, labels.checkItsecGroupWindowTitle);
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
		
		this.getComponent('ciEditTabView').getFooterToolbar().getComponent('savebutton').setText(labels.button_general_save);
		this.getComponent('ciEditTabView').getFooterToolbar().getComponent('cancelbutton').setText(labels.button_general_cancel);
	},
	
	enableButtons: function() {
		var panelMsg = AIR.AirAclManager.listRequiredFields(AIR.AirApplicationManager.getAppDetail());
		
		if(panelMsg.length == 0) {
			this.setPanelMessage(panelMsg);
			
			var bSave = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('savebutton');
			var bCancel = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('cancelbutton');
			
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
		var bSave = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('savebutton');
		var bCancel = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('cancelbutton');
		
		bSave.hide();
		bCancel.hide();
	},
	
	onApplicationSave: function(store, records, options) {
		mySaveMask.hide();
		
		if('OK' === records[0].data.result) {
//			deactivateButtonSaveApplication();
			this.disableButtons();
			
			var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
			ciConnectionsView.commitChanges();

			if(!this.skipLoading)
				this.loadCiDetails();//hier ein itsecGroupCallback übergeben (das ComplianceControlWindow), wenn er nach dem Neuladen aufgerufen werden soll
			
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
	
	onComplianceTypeChange: function(ciComplianceView, rgb, previousComplianceType, complianceType) {
//		this.disableButtons();//see  (*1) in CiConnectionsView. No effect since this.enableButtons() is called afterwards
		
		var callback = function(store, records, options) {
			ciComplianceView.getComponent('fsComplianceDetails').setVisible(false);
			ciComplianceView.getComponent('fsComplianceInfo').setVisible(true);
			
			this.onCiChange();
			mySaveMask.hide();
		};
		
		var options = {
			callback: callback.createDelegate(this)
		};
		
		this.saveApplication(options);
	},
	
	onItsecGroupEdit: function(ciComplianceView, itsecGroupCallback, newItSecGroup) {
		var callback = function(params) {
			mySaveMask.hide();
			itsecGroupCallback(params);
		};
		
		var options = {
			callback: callback.createDelegate(this),
			params: { itSecGroup: newItSecGroup }
		};
		
		//anstatt den itsecGroupCallback den loadCallback und dann den itsecGroupCallback aufraufen ODER 
		// die neue itsecGroupId dem itsecGroupCallback geben
		//a) mit callback und params
		//b) mit call centext
		
		//a)
		//this.saveApplication(options);
		
		//b)
		this.callContext.itsecGroupEdit = options;
		this.saveApplication();
	},
	
	update: function() {

	},
	
	updateLabels: function(labels) {
		var ciDetailsView = this.getComponent('ciEditTabView').getComponent('clCiDetails');
		ciDetailsView.updateLabels(labels);
		
		var ciSpecificsView = this.getComponent('ciEditTabView').getComponent('clCiSpecifics');
		ciSpecificsView.updateLabels(labels);
		
		var ciContactsView = this.getComponent('ciEditTabView').getComponent('clCiContacts');
		ciContactsView.updateLabels(labels);

		var ciAgreementsView = this.getComponent('ciEditTabView').getComponent('clCiAgreements');
		ciAgreementsView.updateLabels(labels);

		var ciProtectionView = this.getComponent('ciEditTabView').getComponent('clCiProtection');
		ciProtectionView.updateLabels(labels);
		
		var ciComplianceView = this.getComponent('ciEditTabView').getComponent('clCiCompliance');
		ciComplianceView.updateLabels(labels);
		
		var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
		ciConnectionsView.updateLabels(labels);

		var ciLicenseView = this.getComponent('ciEditTabView').getComponent('clCiLicense');
		ciLicenseView.updateLabels(labels);

		var ciSupportStuffView = this.getComponent('ciEditTabView').getComponent('clCiSupportStuff');
		ciSupportStuffView.updateLabels(labels);
		
		var ciHistoryView = this.getComponent('ciEditTabView').getComponent('clCiHistory');
		ciHistoryView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
//		var ciDetailsView = this.getComponent('clCiDetails');
//		ciDetailsView.updateToolTips(toolTips);
		
		var ciSpecificsView = this.getComponent('ciEditTabView').getComponent('clCiSpecifics');
		ciSpecificsView.updateToolTips(toolTips);
		
		var ciContactsView = this.getComponent('ciEditTabView').getComponent('clCiContacts');
		ciContactsView.updateToolTips(toolTips);

		var ciAgreementsView = this.getComponent('ciEditTabView').getComponent('clCiAgreements');
		ciAgreementsView.updateToolTips(toolTips);

		var ciProtectionView = this.getComponent('ciEditTabView').getComponent('clCiProtection');
		ciProtectionView.updateToolTips(toolTips);
		
		var ciComplianceView = this.getComponent('ciEditTabView').getComponent('clCiCompliance');
		ciComplianceView.updateToolTips(toolTips);
		
		var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
		ciConnectionsView.updateToolTips(toolTips);

		var ciLicenseView = this.getComponent('ciEditTabView').getComponent('clCiLicense');
		ciLicenseView.updateToolTips(toolTips);

		var ciSupportStuffView = this.getComponent('ciEditTabView').getComponent('clCiSupportStuff');
		ciSupportStuffView.updateToolTips(toolTips);
		
//		var ciHistoryView = this.getComponent('ciEditTabView').getComponent('clCiHistory');
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
			this.getComponent('editpanelmessage').setText(message);
			this.getComponent('editpanelmessage').show();
		} else {
			this.getComponent('editpanelmessage').hide();
		}
	},
	
	isCiModified: function() {
		return this.ciModified;
	}
});
Ext.reg('AIR.CiEditView', AIR.CiEditView);
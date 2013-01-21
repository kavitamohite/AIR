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
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
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
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
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
					backgroundColor: AC.AIR_BG_COLOR,
					color: '#FF0000',//panelDraftMsgColor, (#8)
					
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '10pt',
					
					float: 'right'
//					marginBottom: 20
				}
			},{
				xtype: 'label',
				id: 'editpanelmessage',
				hidden: true,
				
				style: {
					textAlign: 'left',
					borderStyle: 'solid',
					borderWidth: '1pt',
					borderColor: '#FF0000', //panelErrorMsgColor, (#8)
					backgroundColor: AC.AIR_BG_COLOR,
					
					color: '#FF0000', //panelErrorMsgColor, (#8)
					padding: 3,//'2 5 2 5',
					
					fontFamily: AC.AIR_FONT_TYPE,
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
		
		var ciEditTabView = this.getComponent('ciEditTabView');
		
		var bSave = ciEditTabView.getFooterToolbar().getComponent('savebutton');
		bSave.on('click', this.onSaveApplication, this);
		
		var bCancel = ciEditTabView.getFooterToolbar().getComponent('cancelbutton');
		bCancel.on('click', this.cancelApplication, this);
		
		
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.on('ciChange', this.onCiChange, this);
		
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.on('ciChange', this.onCiChange, this);
		ciSpecificsView.on('ciInvalid', this.onCiInvalid, this);
		
		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.on('ciChange', this.onCiChange, this);
		
		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.on('ciChange', this.onCiChange, this);

		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.on('ciChange', this.onCiChange, this);		
		
		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.on('ciChange', this.onCiChange, this);
		ciComplianceView.on('complianceTypeChange', this.onComplianceTypeChange, this);
		ciComplianceView.on('itsecGroupEdit', this.onItsecGroupEdit, this);
		
		var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
		ciLicenseView.on('ciChange', this.onCiChange, this);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.on('ciChange', this.onCiChange, this);

		var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuffView.on('ciChange', this.onCiChange, this);

		var ciHistoryView = ciEditTabView.getComponent('clCiHistory');
		ciHistoryView.on('ciChange', this.onCiChange, this);
		
		this.isLoaded = false;
		this.isUserChange = false;
		this.ciModified = false;
		
		this.callContext = {};
	},

	
	updateToolTips: function(toolTips) {
		var ciEditTabView = this.getComponent('ciEditTabView');
		if(ciEditTabView)
			ciEditTabView.updateToolTips(toolTips);
	},


	
	onCiChange: function(view, viewElement, changedViewItems) {
		if(this.isUserChange) {
			this.enableButtons();
			this.ciModified = true;
			this.validateCiChange(view, viewElement, changedViewItems);
		}
	},
	
	onCiInvalid: function(view, viewElement, changedViewItems) {
		this.disableButtons();
	},

	
	onNavigation: function(viewId, link, options) {
		this.getComponent('ciEditTabView').getLayout().setActiveItem(viewId);
		
		this.handleNavigation(viewId);
		if(this.isLoaded || (options && options.skipReload)) {
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
	
	validateCiChange: function(view, viewElement, changedViewItems) {
		switch(view.getId()) {
			case 'clCiSpecifics':
				if(viewElement.getId() === 'rgBARrelevance') {
					var ciComplianceView = this.getComponent('ciEditTabView').getComponent('clCiCompliance');
					ciComplianceView.validate(viewElement);
					
					//show warning toolbar message or warningWindow
				}
				
				break;
			case 'clCiCompliance':
				if(viewElement.getId() === 'cbIsTemplate') {
					var ciSpecificsView = this.getComponent('ciEditTabView').getComponent('clCiSpecifics');
					ciSpecificsView.validate(viewElement);
					
					//show warning toolbar message or warningWindow
				}
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
				applicationId: AAM.getCiId(),
   			 	cwid: AAM.getCwid(),
   			 	token: AAM.getToken()
			}
		});
	},
	
	onBeforeLoadApplication: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
	},
	
	onLoadApplication: function(store, records, options) {
		this.ciModified = false;
		
		var appDetail = records[0].data;
		appDetail.ciTableId = this.ciTableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;

		AAM.setAppDetail(appDetail);
		

		this.getComponent('editpanelheader').setText(appDetail.applicationName);
		this.getComponent('editpanelsubheader').setText(appDetail.applicationCat1Txt);

		//---------------------------------------------------------------------------------------------------------
		//AIR.AirAclManager.updateAcl(appDetail);// RFC 8225: added appDetail param
		var ciEditTabView = this.getComponent('ciEditTabView');
		
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.update(appDetail);//detailsData
		
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.update(appDetail);
		
		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.update(appDetail);
		
		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.update(appDetail);
		
		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.update(appDetail);

		var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
		ciLicenseView.update(appDetail);
		
		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.update(appDetail);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.update(appDetail);
		
		var ciSupportStuff = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuff.update(appDetail);
		
		//var ciHistory = ciEditTabView.getComponent('clCiHistory');
		//ciHistory.update();
		
		
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
		
		var panelMsg = ACM.getRequiredFields(appDetail);
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
		
		var appDetail = AAM.getAppDetail();
		
		if(!AIR.AirAclManager.isEditMaskValid()) {
			msgtext = AIR.AirApplicationManager.getLabels().editDataNotValid.replace(/##/, appDetail.applicationName);//this.getComponent('applicationName').getValue()
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

		var ciEditTabView = this.getComponent('ciEditTabView');
		var data = {};
		var tableId = this.ciTableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;//Test: AC.TABLE_ID_TERRAIN
		data.ciTableId = tableId;
		
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.setData(data);

		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.setData(data);

		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.setData(data);

		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.setData(data);

		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.setData(data);

		var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
		ciLicenseView.setData(data);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.setData(data);
		
		var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuffView.setData(data);
		
		data.tableId = AAM.getTableId();//oder this.ciTableId?

		var saveCallback = function() {
			AAM.getMask(AC.MASK_TYPE_SAVE).show();
			
			/*
			Util.log('new template? data.template='+data.template+'   appDetail.isTemplate='+appDetail.template);
			//isTemplate
			if(data.template !== appDetail.template) {//new template or removed template of the changed CI?
				var referencesListStore = AIR.AirStoreManager.getStoreByName('referencesListStore');
				referencesListStore.load();
			}*/
			this.templateChanged = data.template !== appDetail.template;
			
//			this.mergeCiChanges(data);//(noch) nicht notwendig, da noch keine Fälle in denen Daten zusammengeführt werden müssen
			
			applicationSaveStore.load({
				params: data
			});
		}.createDelegate(this);
		
		this.checkItsecGroup(data, appDetail, saveCallback);
	},
	
	checkItsecGroup: function(newAppDetail, appDetail, saveCallback) {
		if(appDetail.itsecGroupId.length > 0 &&
		   appDetail.itsecGroupId !== AC.CI_GROUP_ID_DEFAULT_ITSEC && // wenn itsecGroupId = 10136 (Default ITsec Group), wird cbItSecGroup nicht gesetzt. Sie ist in diesem Fall leer. Die Überprüfung findet aber über appDetail.itsecGroupId statt
		   appDetail.itsecGroupId !== newAppDetail.itSecGroupId &&
		   newAppDetail.itSecGroupId &&
		   newAppDetail.itSecGroupId !== AC.CI_GROUP_ID_NON_BYTSEC &&
		   newAppDetail.itSecGroupId !== AC.CI_GROUP_ID_DELETE_ID &&
		   newAppDetail.itSecGroupId !== AC.CI_GROUP_ID_EMPTY) {
			
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
	
	mergeCiChanges: function(data) {
		if(data.template == '-1' && data.barRelevance !== 'Y')//RFC 8727: nicht notwendig, da von 'No' nicht auf 'Undefined' gewechselt werden kann
			data.barRelevance = 'N';
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

	
	enableButtons: function() {
		var panelMsg = ACM.getRequiredFields(AIR.AirApplicationManager.getAppDetail());
		
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
		AAM.getMask(AC.MASK_TYPE_SAVE).hide();
		
		if('OK' === records[0].data.result) {
//			deactivateButtonSaveApplication();
			this.disableButtons();
			
			var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
			ciConnectionsView.commitChanges();
			
			this.checkTemplateChange();

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
						
			this.onCiChange(ciComplianceView, rgb);
			
			this.checkTemplateChange();
			
			AAM.getMask(AC.MASK_TYPE_SAVE).hide();
		};
		
		var options = {
			callback: callback.createDelegate(this)
		};
		
		this.saveApplication(options);
	},
	
	checkTemplateChange: function() {
		if(this.templateChanged) {//new template or removed template?
			var referencesListStore = AIR.AirStoreManager.getStoreByName('referencesListStore');
			referencesListStore.load();
		}
	},
	
	
	onItsecGroupEdit: function(ciComplianceView, itsecGroupCallback, newItSecGroup) {
		var callback = function(params) {
			AAM.getMask(AC.MASK_TYPE_SAVE).hide();
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
	
//	update: function() {
//
//	},
	
	updateLabels: function(labels) {
//		this.getComponent('editpanelmessage').setText(labels.header_applicationIsIncomplete.replace('##', ACM.getRequiredFields(AAM.getAppDetail())));
//    	this.getComponent('editpaneldraft').setText(labels.header_applicationIsDraft.replace('##', ''));//draftFlag '' (#8)
    	
    	var ciEditTabView = this.getComponent('ciEditTabView');
    	
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.updateLabels(labels);
		
		//falls kein CI vor dem Start ausgewählt war, gibt es natürlich keine gesicherte tableId. Folge: kein specificsView Label kann gesetzt werden
		//ODER die Lebels aller specificsView CI Typ Seiten müssen gesetzt werden ODER CiSpecificsAnwendungView Labels werden per Default gesetzt, wie hier:
		var tableId = this.ciTableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;//Test: AC.TABLE_ID_TERRAIN
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.updateLabels(labels, tableId);
		
		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.updateLabels(labels);

		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.updateLabels(labels);

		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.updateLabels(labels);
		
		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.updateLabels(labels);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.updateLabels(labels);

		var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
		ciLicenseView.updateLabels(labels);

		var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuffView.updateLabels(labels);
		
		var ciHistoryView = ciEditTabView.getComponent('clCiHistory');
		ciHistoryView.updateLabels(labels);
		
		ciEditTabView.getFooterToolbar().getComponent('savebutton').setText(labels.button_general_save);
		ciEditTabView.getFooterToolbar().getComponent('cancelbutton').setText(labels.button_general_cancel);
	},
	
	updateToolTips: function(toolTips) {
		var ciEditTabView = this.getComponent('ciEditTabView');
		
//		var ciDetailsView = this.getComponent('clCiDetails');
//		ciDetailsView.updateToolTips(toolTips);
		
		var tableId = this.ciTableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;//Test: AC.TABLE_ID_TERRAIN
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.updateToolTips(toolTips, tableId);
		
		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.updateToolTips(toolTips);

		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.updateToolTips(toolTips);

		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.updateToolTips(toolTips);
		
		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.updateToolTips(toolTips);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.updateToolTips(toolTips);

		var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
		ciLicenseView.updateToolTips(toolTips);

		var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuffView.updateToolTips(toolTips);
		
//		var ciHistoryView = ciEditTabView.getComponent('clCiHistory');
//		ciHistoryView.updateToolTips(toolTips);
	},
	
	onCiSelected: function(sourceView, ciId, target, record) {
		this.ciTableId = record.get('tableId');//grid.getStore().getAt(rowIndex).get('tableId');
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
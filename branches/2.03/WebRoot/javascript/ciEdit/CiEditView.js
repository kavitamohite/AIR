Ext.namespace('AIR');

AIR.CiEditView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			padding: 20,
		    
			layout: 'form',
		    border: false,
		    
		    items: [{
		    	xtype: 'label',
		    	id: 'lCiName',
				
				style: {
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '12pt'
				}
			},{
				xtype: 'container'
			},{
		    	xtype: 'label',
		    	id: 'lCiType',
				
				style: {
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '8pt'
				}
			},{
				xtype: 'container'
			},{
		    	xtype: 'label',
		    	id: 'lCiIsSecure',
		    	html: '<center style="background-color: '+AC.AIR_BG_COLOR_SECURE+';"><img src="/AIR/images/secured_24x24.png" border=0>&nbsp;&nbsp;Secure&nbsp;System&nbsp;&nbsp;<img src="/AIR/images/secured_24x24.png" border=0></center>',
				hidden: true,

				style: {
					color: 'black',
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: 18,
					marginTop: 5
				}
			},{
				xtype: 'container'
			},{
		    	xtype: 'label',
		    	id: 'lCiIsDeleted',
		    	text: 'DELETED',
				hidden: true,

				style: {
					backgroundColor: AC.AIR_BG_COLOR,
					color: 'red',
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: 18,
					marginTop: 5
				}
			},{ 
				xtype: 'container',	  
				html: '<hr>',
				id: 'editpanelhr',
				cls: 'x-plain',
				
				style: {
					color: '#d0d0d0',
					marginBottom: 10
				}
			},{
				xtype: 'label',
				id: 'editpaneldraft',
				
				style: {
					backgroundColor: AC.AIR_BG_COLOR,
					color: '#FF0000',
					
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '10pt',
					position: 'absolute',
					right: '20px'
				}
			},{
				xtype: 'textfield',
				id: 'editpanelmessage',
				hidden: true,
				
				position: 'absolute',
				left: '20px',
				anchor: '90%',
				readOnly: true,
				hideLabel: true,
				style: {
					color: '#FF0000',
					borderColor: '#FF0000',
					fontWeight: 'bold'
				}
			},{
				xtype: 'panel',
				id: 'ciEditTabView',
			
				layout: 'card',
				activeItem: 0,
				margins: '5 5 5 5',
				border: false,
				
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
					id: 'clCiSpecialAttributes',
					xtype: 'AIR.CiSpecialAttributesView'
				},{
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
		ciSpecificsView.on('viewInitialized', this.onViewInitialized, this);
		
		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.on('ciChange', this.onCiChange, this);
		ciContactsView.on('afterCiUpdate', this.onAfterCiUpdate, this);
		
		
		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.on('ciChange', this.onCiChange, this);

		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.on('ciChange', this.onCiChange, this);
		
		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.on('ciChange', this.onCiChange, this);
		ciComplianceView.on('complianceTypeChange', this.onComplianceTypeChange, this);
		ciComplianceView.on('itsecGroupEdit', this.onItsecGroupEdit, this);
		
		var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
		if(ciLicenseView)
			ciLicenseView.on('ciChange', this.onCiChange, this);
		
		var clCiSpecialAttributesView = ciEditTabView.getComponent('clCiSpecialAttributes');
		clCiSpecialAttributesView.on('ciChange', this.onCiChange, this);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.on('ciChange', this.onCiChange, this);

		var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuffView.on('ciChange', this.onCiChange, this);

		var ciHistoryView = ciEditTabView.getComponent('clCiHistory');
		ciHistoryView.on('ciChange', this.onCiChange, this);
		
		
		this.isLoaded = false;
		this.isUserChange = false;
		this.ciModified = false;
		this.itsecChanged = false;
		
		this.callContext = {};
	},

	prepareCiCreation: function(viewId, options) {
		options.name = AAM.getLabels().New;
		this.update(options);
		
		AAM.setAppDetail(options);
		
		this.getComponent('ciEditTabView').getLayout().setActiveItem(viewId);
		var ciEditTabView = this.getComponent('ciEditTabView');
		
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.clear(options);
		
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.clear(options);
		
		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.clear(options);
		
		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.clear(options);
		
		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.clear(options);

		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.clear(options);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.clear(options);
		
		var task = new Ext.util.DelayedTask(function() {
			this.isUserChange = true;

		}.createDelegate(this));
		task.delay(100);
		
		
		var panelMsg = ACM.getRequiredFields(options);
		if(panelMsg.length > 0) {
			this.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));
		} else {
			this.setPanelMessage(panelMsg);
		}
		
		AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft(options));//.tableId
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
			
			if (viewElement && viewElement.getId && 
			   (viewElement.getId() == 'cbReferencedTemplate' || viewElement.getId() == 'cbItSecGroup') && 
			   AAM.getAppDetail().refId.length > 0 && 
			   AAM.getAppDetail().itsecGroupId.length > 0 && 
			   AAM.getAppDetail().itsecGroupId != AC.CI_GROUP_ID_DEFAULT_ITSEC && 
			   AAM.getAppDetail().itsecGroupId != AC.CI_GROUP_ID_NON_BYTSEC)
				this.itsecChanged = true;
			
			this.validateCiChange(view, viewElement, changedViewItems);
		}
	},
	
	onCiInvalid: function(view, viewElement, changedViewItems) {
		this.disableButtons();
	},

	
	onNavigation: function(viewId, link, options) {
		if(options.isCiCreate) {
			options.relevanceOperational = 'Y';
			this.prepareCiCreation(viewId, options);//createCi
			
			this.isLoaded = true;
			this.disableButtons();
		}
		
		
		this.getComponent('ciEditTabView').getLayout().setActiveItem(viewId);

		this.handleNavigation(viewId, options);
		if(this.isLoaded || (options && options.skipReload)) {
		} else {
			this.isLoaded = true;
			this.loadCiDetails();
		}
	},
	
	handleNavigation: function(viewId, options) {
		
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
		if(Util.isCiId(AAM.getCiId())) {//check URL CI-Einsprung Daten
			var ciDetailStore = AIR.AirStoreFactory.createCiDetailStore(AAM.getTableId());//createApplicationDetailStore
			ciDetailStore.on('beforeload', this.onBeforeCiLoad, this);
			ciDetailStore.on('load', this.onCiLoad, this);
			
			ciDetailStore.load({
				params: {
					ciId: AAM.getCiId(),
					id: AAM.getCiId(),
	   			 	cwid: AAM.getCwid(),
	   			 	token: AAM.getToken()
				}
			});
		} else {
			var labels = AAM.getLabels();
			var message = labels.CiEinsprungCiIdInvalidMessage.replace('{0}', AAM.getCiId() || '');
			this.openEinsprungDataWarnungWindow(message);
		}
	},
	
	onBeforeCiLoad: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
	},
	
	onCiLoad: function(store, records, options) {
		this.ciModified = false;
		
		var ciData = records[0].data;
		ciData.tableId = this.tableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;

		this.loadCi(ciData);
	},
	
	loadCi: function(ciData) {
		ciData.templateChanged = this.templateChanged;
		AAM.setAppDetail(ciData);
		
		if(ciData.id.length === 0 && !ciData.isCiCreate) {//applicationId
			//wenn die ciId f�r den gegebenen ciType/tableId nicht existiert (z.B. aufgrund schlechter URL CI Einsprungdaten),
			//OK Hinweisfenster mit navigation callback zur Search
			
			var labels = AAM.getLabels();
			var message = labels.CiEinsprungCiIdDoesNotExistMessage.replace('{0}', AAM.getCiId());
			this.openEinsprungDataWarnungWindow(message);
		} else {
			this.update(ciData);
			
			//---------------------------------------------------------------------------------------------------------
			var ciEditTabView = this.getComponent('ciEditTabView');
			
			var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
			ciDetailsView.update(ciData);//detailsData
			
			var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
			ciSpecificsView.update(ciData);
			
			var ciContactsView = ciEditTabView.getComponent('clCiContacts');
			ciContactsView.update(ciData);
			
			var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
			ciAgreementsView.update(ciData);
			
			var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
			ciProtectionView.update(ciData);
	
			var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
			if(ciLicenseView)
				ciLicenseView.update(ciData);
			
			var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
			ciComplianceView.update(ciData);
			
			var ciSpecialAttributes = ciEditTabView.getComponent('clCiSpecialAttributes');
			ciSpecialAttributes.update(ciData);
			
			var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
			ciConnectionsView.update(ciData);
			
			var ciSupportStuff = ciEditTabView.getComponent('clCiSupportStuff');
			ciSupportStuff.update(ciData);
			
			var task = new Ext.util.DelayedTask(function() {
				AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft(ciData));
			}.createDelegate(this));
			task.delay(100);
			
			//das Akzeptieren von User Bedienaktionen (textfeld �nderungen, combo Auswahlen, ...) erst jetzt wieder freischalten f�r
			//den Empfang von ciChange Events
			var task = new Ext.util.DelayedTask(function() {
				this.isUserChange = true;
	
			}.createDelegate(this));
			task.delay(100);
			
			this.disableButtons();
			
			
			var isUnkownLocationCI = AAM.isLocationCi(ciData.tableId) && ciData.name === AC.UNKNOWN;
			var isRelevance = ciData.relevanceOperational == 'Y' || (ciData.relevanceStrategic && ciData.relevanceStrategic == 'Y');
			
			var panelMsg = isUnkownLocationCI || !isRelevance ? '' : ACM.getRequiredFields(ciData);
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
		}
		
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
	},
	
	openEinsprungDataWarnungWindow: function(message) {
		var callback = function() {
			this.fireEvent('externalNavigation', this, null, 'clSearch');
		};
		
		var callbackMap = {
			ok: callback.createDelegate(this)
		};

		
		var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('WARNING_OK', callbackMap, message, AAM.getLabels().CiEinsprungInvalidTitle);
		dynamicWindow.show();		
	},
	
	//move to CiCenterView CiEditView ?
	onSaveApplication: function(button, event) {
		
		var ciData = AAM.getAppDetail();
		
		if(ciData.isCiCreate) {
			this.tableId = ciData.tableId;
			this.createCi(ciData);
		} else {
			//keine itsec �nderungspr�fung, wenn schon vorher Warnung wegen �nderungen, wenn anderer Menupunkt
			//vor Speichern gew�hlt
			if(!button)
				this.itsecChanged = false;
			this.saveApplication();
		}
	},
	
	createCi: function(data) {
		var ciCreateStore = AIR.AirStoreFactory.createCiCreateStore(data.tableId);
		ciCreateStore.on('load', this.onCiCreated, this);
		
		this.isUserChange = false;
		
		this.setCiData(data);
		AAM.getMask(AC.MASK_TYPE_SAVE).show();
		
		ciCreateStore.load({
			params: data
		});
	},
	
	onCiCreated: function(store, records, options) {
		AAM.setCiId(records[0].data.ciId);
		AAM.setTableId(parseInt(records[0].data.tableId));
		AAM.setCiSubTypeId(records[0].get('ciSubTypeId'));
		
		this.afterCiSave(store, records, options);
	},
	
	
	setCiData: function(data) {
		var ciEditTabView = this.getComponent('ciEditTabView');

		data.cwid = AAM.getCwid();
		data.token = AAM.getToken();
		
		if(!data.tableId) {
			var tableId = this.tableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;//Test: AC.TABLE_ID_TERRAIN
			data.tableId = tableId;
		}
		
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

		if(data.tableId == AC.TABLE_ID_APPLICATION) {
			var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
			if(ciLicenseView)
				ciLicenseView.setData(data);
		}
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.setData(data);
		
		if(data.tableId == AC.TABLE_ID_APPLICATION) {
			var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
			ciSupportStuffView.setData(data);
		}
	},
	
	//move to CiCenterView ?
	saveApplication: function(options) {//button, event
		if(!options)//damit nach compl. status Wechsel von Undefined auf External nicht der save button deaktiviert bleibt
			this.isUserChange = false;
		
		var ciData = AAM.getAppDetail();
		
		if(!AIR.AirAclManager.isEditMaskValid()) {
			var msgtext = AIR.AirApplicationManager.getLabels().editDataNotValid.replace(/##/, ciData.applicationName);
			
			Ext.MessageBox.show({
				title: 'Error',
				msg: msgtext,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			
			return;
		}

		var ciSaveStore = AIR.AirStoreFactory.createCiSaveStore(ciData.tableId);//AIR.AirStoreFactory.createApplicationSaveStore();
		var callback = options && options.callback ? options.callback : this.onApplicationSave;
		ciSaveStore.on('load', callback, this);
		this.skipLoading = options && options.skipLoading ? true : false;

		var data = {};
		this.setCiData(data);
		
		
		var saveCallback = function() {
			AAM.getMask(AC.MASK_TYPE_SAVE).show();
			
			// wurde dieses CI zu einem Template gemacht oder war es ein Template und wurde der Template Status entfernt?
			this.templateChanged = data.template != ciData.template;
			
			ciSaveStore.load({
				params: data
			});
		}.createDelegate(this);
		
		this.checkItsecGroup(data, ciData, saveCallback);
	},
	
	checkItsecGroup: function(newCiDetail, ciData, saveCallback) {
		var isNewItSecGroup =	ciData.itsecGroupId && ciData.itsecGroupId.length > 0 &&
								ciData.itsecGroupId !== AC.CI_GROUP_ID_DEFAULT_ITSEC && // wenn itsecGroupId = 10136 (Default ITsec Group), wird cbItSecGroup nicht gesetzt. Sie ist in diesem Fall leer. Die �berpr�fung findet aber �ber ciData.itsecGroupId statt
								ciData.itsecGroupId !== newCiDetail.itSecGroupId &&
								newCiDetail.itSecGroupId &&
								newCiDetail.itSecGroupId !== AC.CI_GROUP_ID_NON_BYTSEC &&
								newCiDetail.itSecGroupId !== AC.CI_GROUP_ID_DELETE_ID &&
								newCiDetail.itSecGroupId !== AC.CI_GROUP_ID_EMPTY;
		
		var isNewTemplate =		ciData.refId != undefined && ciData.refId != 0 && newCiDetail.refId != undefined && 
								(ciData.refId != '' && newCiDetail.refId == -1 ||
								 ciData.refId == '' && newCiDetail.refId != -1 || 
								 (ciData.refId != newCiDetail.refId && newCiDetail.refId != -1));
		
		
		
		if((isNewTemplate || isNewItSecGroup) && this.itsecChanged) {
			var callbackMap = {
				yes: saveCallback
			};
			
			var labels = AIR.AirApplicationManager.getLabels();
			var message = isNewTemplate ? labels.checkTemplateWindowMessage : labels.checkItsecGroupWindowMessage;
			var title = isNewTemplate ? labels.checkTemplateWindowTitle : labels.checkItsecGroupWindowTitle;
			
			var confirmItsecGroupSaveWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CONFIRM_ITSEC_GROUP_SAVE', callbackMap, message, title);
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
			
			this.ciModified = false;
			this.itsecChanged = false;
			this.fireEvent('externalNavigation', this, null, 'clSearch');
		};
		
		var callbackMap = {
			yes: verwerfenCallback.createDelegate(this)
		};
		
		var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CANCEL_CONFIRMATION', callbackMap);
		dynamicWindow.show();
	},

	
	enableButtons: function() {
		// RFC 11052
        var bSave = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('savebutton');
        var bCancel = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('cancelbutton');   		
		if((AAM.getTableId() == AC.TABLE_ID_APPLICATION || AAM.getTableId() == AC.TABLE_ID_IT_SYSTEM) &&  
                AAM.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR))//USER_ROLE_AIR_ADMINISTRATOR
          {     bSave.show();
                bCancel.show();                       
                this.fireEvent('airAction', this, 'clear');
           }else{       	   
       		var panelMsg = ACM.getRequiredFields(AAM.getAppDetail());    		
    		if(panelMsg.length == 0) {
    			this.setPanelMessage(panelMsg);			
    			bSave.show();
    			bCancel.show();
    			
    			this.fireEvent('airAction', this, 'clear');
    		} else {
    			this.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));
    			this.disableButtons();
    		}
           }

	},
	
	disableButtons: function() {
		var bSave = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('savebutton');
		var bCancel = this.getComponent('ciEditTabView').getFooterToolbar().getComponent('cancelbutton');
		
		bSave.hide();
		bCancel.hide();
	},
	
	onApplicationSave: function(store, records, options) {
		this.afterCiSave(store, records, options);
	},
	
	afterCiSave: function(store, records, options) {
		this.ciModified = false;
		AAM.getMask(AC.MASK_TYPE_SAVE).hide();
		
		if('OK' === records[0].data.result) {
			this.disableButtons();
			
			var ciConnectionsView = this.getComponent('ciEditTabView').getComponent('clCiConnections');
			ciConnectionsView.commitChanges();

			if(!this.skipLoading)
				this.loadCiDetails();//hier ein itsecGroupCallback �bergeben (das ComplianceControlWindow), wenn er nach dem Neuladen aufgerufen werden soll
			
			this.fireEvent('airAction', this, 'appSaveSuccess');//(bestimmte) ciData Daten mitgeben?
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
			
//			this.checkTemplateChange();
			
			AAM.getMask(AC.MASK_TYPE_SAVE).hide();
		};
		
		var options = {
			callback: callback.createDelegate(this)
		};
		
		this.saveApplication(options);
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
	
	update: function(data) {
		var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
		var record;
		
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_APPLICATION:
				if(data.applicationCat1Id == 0)
					data.applicationCat1Id = AC.APP_CAT1_APPLICATION;
				record = Util.getStoreRecord(store, 'ciSubTypeId', data.applicationCat1Id);
				break;
			case AC.TABLE_ID_IT_SYSTEM:
				record = Util.getStoreRecord(store, 'ciSubTypeId', data.ciSubTypeId);
				break;
			default:
				record = Util.getStoreRecord(store, 'ciTypeId', data.tableId);
				break;
		}

		this.getComponent('lCiName').setText(data.name + (data.alias!=undefined && data.alias!=""?" ( " + data.alias + " )":""));
		this.getComponent('lCiType').setText(record.get('text'));
		
		var isDeleted = data.deleteTimestamp && data.deleteTimestamp.length > 0;
		this.getComponent('lCiIsDeleted').setVisible(isDeleted);
		if (!isDeleted) {
			// RFC 9176 show message editInGPSC
			if ('editInGPSC' === data.messageText) {
				this.getComponent('lCiIsDeleted').setText(AIR.AirApplicationManager.getLabels().editInGPSC);
				this.getComponent('lCiIsDeleted').setVisible(true);
			}
		}
		
		// RFC 10057 show secure System
		if ('secureSystem' === data.messageTextSecureSystem) {
			this.getComponent('lCiIsSecure').setVisible(true);
			//var i = this.getComponent('lCiName').getSytle();
		} else {
			this.getComponent('lCiIsSecure').setVisible(false);
		}
	},
	
	updateLabels: function(labels) {

    	

		
    	var ciEditTabView = this.getComponent('ciEditTabView');
    	
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.updateLabels(labels);
		
		//falls kein CI vor dem Start ausgew�hlt war, gibt es nat�rlich keine gesicherte tableId. Folge: kein specificsView Label kann gesetzt werden
		//ODER die Lebels aller specificsView CI Typ Seiten m�ssen gesetzt werden ODER CiSpecificsAnwendungView Labels werden per Default gesetzt, wie hier:
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.updateLabels(labels);//, tableId
		
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
		if(ciLicenseView)
			ciLicenseView.updateLabels(labels);

		var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuffView.updateLabels(labels);
		
		var ciHistoryView = ciEditTabView.getComponent('clCiHistory');
		ciHistoryView.updateLabels(labels);
		
		ciEditTabView.getFooterToolbar().getComponent('savebutton').setText(labels.button_general_save);
		ciEditTabView.getFooterToolbar().getComponent('cancelbutton').setText(labels.button_general_cancel);

		this.getComponent('lCiIsDeleted').setText(labels.deleted);
		
		if(this.isUserChange) {
			this.updatePanelMessage();
			this.getComponent('editpaneldraft').setText(labels.header_applicationIsDraft.replace('##', ''));
		}
	},
	
	updateToolTips: function(toolTips) {
		var ciEditTabView = this.getComponent('ciEditTabView');
		
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.updateToolTips(toolTips);
		
		var tableId = this.tableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;
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
		if(ciLicenseView)
			ciLicenseView.updateToolTips(toolTips);

		var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
		ciSupportStuffView.updateToolTips(toolTips);
		
	},
	
	onCiSelected: function(sourceView, ciId, target, record) {
		this.reset();
		this.tableId = record.get('tableId');
	},
	
	reset: function() {
		this.isLoaded = false;
		this.isUserChange = false;

		this.tableId = AAM.getTableId();//f�r reset nach applicationCopy ContinueEditing Button Klick
	},


	setPanelMessage: function(message) {
		var data = AAM.getAppDetail();
		
		if(message && message.length > 0) {
			this.getComponent('editpanelmessage').setValue(message);//setText
			
			//nur wenn der Anwender Rechte hat
			if(data.isCiCreate || (data.relevanceOperational && data.relevanceOperational == 'Y') || (data.relevanceStrategic && data.relevanceStrategic == 'Y'))
				this.getComponent('editpanelmessage').show();
		} else {
			this.getComponent('editpanelmessage').hide();
		}
	},
	
	isCiModified: function() {
		return this.ciModified;
	},
	
	onAfterCiUpdate: function(view) {
		this.updatePanelMessage();
	},
	
	updatePanelMessage: function() {
		var panelMsg = ACM.getRequiredFields(AAM.getAppDetail());
		
		if(panelMsg.length > 0) {
			this.setPanelMessage(AAM.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));
		} else {
			this.setPanelMessage(panelMsg);
		}
	},
	
	onViewInitialized: function(childView) {
		var options = AAM.getAppDetail();
		
		var panelMsg = ACM.getRequiredFields(options);
		if(panelMsg.length > 0) {
			this.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));
		} else {
			this.setPanelMessage(panelMsg);
		}
		
		var task = new Ext.util.DelayedTask(function() {
			this.isUserChange = true;
			this.ciModified = false;
			this.itsecChanged = false;
			
			this.disableButtons();
		}.createDelegate(this));
		task.delay(100);
	}
	
});
Ext.reg('AIR.CiEditView', AIR.CiEditView);
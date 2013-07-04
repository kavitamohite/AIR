Ext.namespace('AIR');

AIR.CiEditView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			padding: 20,
//			autoScroll: true,
//			height: 600,
		    
			layout: 'form',//urspr. kein layout
		    border: false,
//		    cls: 'x-plain',
		    
		    items: [{
		    	xtype: 'label',
		    	id: 'lCiName',
				
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
//				html: '<br/>'
			},{
		    	xtype: 'label',
		    	id: 'lCiType',
				
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
				xtype: 'container'
//				html: '<br/>'
			},{
		    	xtype: 'label',
		    	id: 'lCiIsDeleted',
		    	text: 'DELETED',
				hidden: true,

				style: {
//					textAlign: 'left',
					backgroundColor: AC.AIR_BG_COLOR,
					color: 'red',
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: 18,
					marginTop: 5
					
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
				xtype: 'textfield',//label
				id: 'editpanelmessage',
				hidden: true,
				
				/*
				style: {
					textAlign: 'left',
					borderStyle: 'solid',
					borderWidth: '1pt',
					borderColor: '#FF0000', //panelErrorMsgColor, (#8)
					backgroundColor: AC.AIR_BG_COLOR,
					
					color: '#FF0000', //panelErrorMsgColor, (#8)
					padding: 3,//'2 5 2 5',//
//					height: 70,
					
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: 12
					
//					marginTop: 40
				}*/
				
				float: 'left',
//				width: 300,
				anchor: '90%',
//				padding: 0
//				disabled: true,
				readOnly: true,
				hideLabel: true,
				style: {
					color: '#FF0000',
					borderColor: '#FF0000',
//					marginLeft: 0,
					fontWeight: 'bold'
				}
			},{
				xtype: 'panel',
				id: 'ciEditTabView',
			
				layout: 'card',
				activeItem: 0,
				margins: '5 5 5 5',
				border: false,
				
//				height: 430,
//				autoScroll: true,
				
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

//	createCi: function(data) {
//	createCi: function(viewId, link, options) {
	prepareCiCreation: function(viewId, options) {
		options.name = AAM.getLabels().New;//data		
		this.update(options);//data
		
		AAM.setAppDetail(options);
		
		this.getComponent('ciEditTabView').getLayout().setActiveItem(viewId);
		var ciEditTabView = this.getComponent('ciEditTabView');
		
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.clear(options);//detailsData
		
		var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
		ciSpecificsView.clear(options);
		
		var ciContactsView = ciEditTabView.getComponent('clCiContacts');
		ciContactsView.clear(options);
		
		var ciAgreementsView = ciEditTabView.getComponent('clCiAgreements');
		ciAgreementsView.clear(options);
		
		var ciProtectionView = ciEditTabView.getComponent('clCiProtection');
		ciProtectionView.clear(options);

//		var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
//		if(ciLicenseView)
//			ciLicenseView.update(ciData);
		
		var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
		ciComplianceView.clear(options);
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.clear(options);
		
		/*
//		var ciSupportStuff = ciEditTabView.getComponent('clCiSupportStuff');
//		ciSupportStuff.update(ciData);
		
		var ciHistory = ciEditTabView.getComponent('clCiHistory');
		ciHistory.update();*/
		
		
//		this.isUserChange = true;
		var task = new Ext.util.DelayedTask(function() {
			this.isUserChange = true;
//			this.doLayout();

		}.createDelegate(this));
		task.delay(2000);//1000
		
		
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
			
			if(viewElement && viewElement.getId && (viewElement.getId() == 'cbReferencedTemplate' || viewElement.getId() == 'cbItSecGroup') && 
			   AAM.getAppDetail().refId.length > 0 && AAM.getAppDetail().itsecGroupId.length > 0 && AAM.getAppDetail().itsecGroupId != AC.CI_GROUP_ID_DEFAULT_ITSEC && AAM.getAppDetail().itsecGroupId != AC.CI_GROUP_ID_NON_BYTSEC)
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
//			options.relevanceStrategic = 'Y';
			this.prepareCiCreation(viewId, options);//createCi
			
			this.isLoaded = true;
			this.disableButtons();
		}
		
		
		//ORIG
		this.getComponent('ciEditTabView').getLayout().setActiveItem(viewId);

		this.handleNavigation(viewId, options);
		if(this.isLoaded || (options && options.skipReload)) {
			//this.handleNavigation(viewId);
		} else {
			this.isLoaded = true;
			this.loadCiDetails();
		}
	},
	
	handleNavigation: function(viewId, options) {
		//TEST dynamisches Laden der Detailseiten anhand clCiLicense
//		var ciEditTabView = this.getComponent('ciEditTabView');
//		var ciDetailView = ciEditTabView.getComponent(viewId);
//		
//		if(ciDetailView) {
//			this.navigate(options);
//			delete this.options;
//		} else {
//			//hier das view dem ciEditTabView hinzufügen und danach loadCiDetails().
//			this.options = options;
//			
//			var ciLicenseView = new AIR.CiLicenseView({ id: 'clCiLicense', height: 600 });
//			ciEditTabView.on('afterlayout', this.navigate, this);// this.onViewAdded ciEditView afterrender .getComponent('clCiCompliance')
//			ciEditTabView.add(ciLicenseView);
//		}
		
		//ORIG
		switch(viewId) {
			case 'clCiHistory':
				var ciHistory = this.getComponent('ciEditTabView').getComponent('clCiHistory');
				ciHistory.update();
				break;
			default: break;
		}
	},
	
//	navigate: function(parentCt, layout, options) {
//		var options = options ? options : this.options;
//		
//		if(this.isLoaded || (options && options.skipReload)) {
//			//this.handleNavigation(viewId);
//		} else {
//			this.isLoaded = true;
//			this.loadCiDetails();
//		}
//	},
	
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
					ciId: AAM.getCiId(),//applicationId
					id: AAM.getCiId(),//applicationId	NUR übergangsweise
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
//		this.itsecChanged = false;
		
		var ciData = records[0].data;
		ciData.tableId = this.tableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;

		this.loadCi(ciData);
	},
	
	loadCi: function(ciData) {
		ciData.templateChanged = this.templateChanged;
		AAM.setAppDetail(ciData);
		
		if(ciData.id.length === 0 && !ciData.isCiCreate) {//applicationId
			//wenn die ciId für den gegebenen ciType/tableId nicht existiert (z.B. aufgrund schlechter URL CI Einsprungdaten),
			//OK Hinweisfenster mit navigation callback zur Search
			
			var labels = AAM.getLabels();
			var message = labels.CiEinsprungCiIdDoesNotExistMessage.replace('{0}', AAM.getCiId());
			this.openEinsprungDataWarnungWindow(message);
//		} else if(ciData.deleteTimestamp && ciData.deleteTimestamp.length > 0) {
//			var labels = AAM.getLabels();
//			var message = labels.CiEinsprungCiIdMarkedAsDeleted.replace('{0}', AAM.getCiId());
//			this.openEinsprungDataWarnungWindow(message);
		} else {
			this.update(ciData);
			
			//---------------------------------------------------------------------------------------------------------
			//AIR.AirAclManager.updateAcl(ciData);// RFC 8225: added ciData param
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
			
			//-------- TEST -------
//			var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
//			if(!ciLicenseView) {
//				ciLicenseView = new AIR.CiLicenseView({ id: 'clCiLicense', height: 600 });
////				AIR.CiDetailsCommon.initView(ciEditTabView, ciLicenseView);
//				this.initView(ciEditTabView, ciLicenseView);
//			}
			//-------- TEST -------
			
			var ciComplianceView = ciEditTabView.getComponent('clCiCompliance');
			ciComplianceView.update(ciData);
			
			var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
			ciConnectionsView.update(ciData);
			
			var ciSupportStuff = ciEditTabView.getComponent('clCiSupportStuff');
			ciSupportStuff.update(ciData);
			
			//var ciHistory = ciEditTabView.getComponent('clCiHistory');
			//ciHistory.update();
			
			
			var task = new Ext.util.DelayedTask(function() {
				AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft(ciData));//ciData.tableId
	//			AIR.AirAclManager.updateAcl();
			}.createDelegate(this));
			task.delay(1500);
			
//			AAM.getMask(AC.MASK_TYPE_LOAD).hide();
			
			
			//das Akzeptieren von User Bedienaktionen (textfeld Änderungen, combo Auswahlen, ...) erst jetzt wieder freischalten für
			//den Empfang von ciChange Events
	//		this.isUserChange = true;
			var task = new Ext.util.DelayedTask(function() {
				this.isUserChange = true;
//				this.doLayout();
	
			}.createDelegate(this));
			task.delay(1000);//1000 2000
			
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
	//		this.fireEvent('airAction', this, 'appLoadSuccess');
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
//		this.disableButtons();
		
		var ciData = AAM.getAppDetail();
		
		if(ciData.isCiCreate) {//ciData.tableId === AC.TABLE_ID_APPLICATION
			this.tableId = ciData.tableId;
			this.createCi(ciData);
		} else {
			//mySaveMask.show();
			//keine itsec Änderungsprüfung, wenn schon vorher Warnung wegen Änderungen, wenn anderer Menupunkt
			//vor Speichern gewählt
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
	
	
	setCiData: function(data) {//getCiData	ciData
		var ciEditTabView = this.getComponent('ciEditTabView');
		
//		var data = {
//		 	cwid: AIR.AirApplicationManager.getCwid(),
//		 	token: AIR.AirApplicationManager.getToken()
//		};
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

		if(data.tableId == AC.TABLE_ID_APPLICATION) {//ciData && ciData.ciSubTypeId === AC.APP_CAT1_APPLICATION?
			var ciLicenseView = ciEditTabView.getComponent('clCiLicense');
			if(ciLicenseView)
				ciLicenseView.setData(data);
		}
		
		var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
		ciConnectionsView.setData(data);
		
		if(data.tableId == AC.TABLE_ID_APPLICATION) {//ciData && ciData.ciSubTypeId === AC.APP_CAT1_APPLICATION?
			var ciSupportStuffView = ciEditTabView.getComponent('clCiSupportStuff');
			ciSupportStuffView.setData(data);
		}
		
//		return data;
	},
	
	//move to CiCenterView ?
	saveApplication: function(options) {//button, event
		if(!options)//damit nach compl. status Wechsel von Undefined auf External nicht der save button deaktiviert bleibt
			this.isUserChange = false;
//		this.ciModified = false;
//		this.itsecChanged = false;
		
//		var labels = AIR.AirApplicationManager.getLabels();
		
		var ciData = AAM.getAppDetail();//ciData
		
		if(!AIR.AirAclManager.isEditMaskValid()) {
			var msgtext = AIR.AirApplicationManager.getLabels().editDataNotValid.replace(/##/, ciData.applicationName);//this.getComponent('applicationName').getValue()
			
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

		
//		var data = this.getCiData(ciData);
		var data = {};
		this.setCiData(data);
		
		
		var saveCallback = function() {
			AAM.getMask(AC.MASK_TYPE_SAVE).show();
			
			// wurde dieses CI zu einem Template gemacht oder war es ein Template und wurde der Template Status entfernt?
			this.templateChanged = data.template != ciData.template;
			
//			this.mergeCiChanges(data);//(noch) nicht notwendig, da noch keine Fälle in denen Daten zusammengeführt werden müssen
			
			ciSaveStore.load({
				params: data
			});
		}.createDelegate(this);
		
		this.checkItsecGroup(data, ciData, saveCallback);
	},
	
	checkItsecGroup: function(newCiDetail, ciData, saveCallback) {
		var isNewItSecGroup =	ciData.itsecGroupId && ciData.itsecGroupId.length > 0 &&
								ciData.itsecGroupId !== AC.CI_GROUP_ID_DEFAULT_ITSEC && // wenn itsecGroupId = 10136 (Default ITsec Group), wird cbItSecGroup nicht gesetzt. Sie ist in diesem Fall leer. Die Überprüfung findet aber über ciData.itsecGroupId statt
								ciData.itsecGroupId !== newCiDetail.itSecGroupId &&
								newCiDetail.itSecGroupId &&
								newCiDetail.itSecGroupId !== AC.CI_GROUP_ID_NON_BYTSEC &&
								newCiDetail.itSecGroupId !== AC.CI_GROUP_ID_DELETE_ID &&
								newCiDetail.itSecGroupId !== AC.CI_GROUP_ID_EMPTY;
		
		var isNewTemplate =		ciData.refId != undefined && ciData.refId != 0 && newCiDetail.refId != undefined && 
//								ciData.refId.length > 0 && newCiDetail.refId.length > 0 && 
//								ciData.refId !== newCiDetail.refId;
								(ciData.refId != '' && newCiDetail.refId == -1 ||//newCiDetail.refId.length === 0
								 ciData.refId == '' && newCiDetail.refId != -1 || 
								 (ciData.refId != newCiDetail.refId && newCiDetail.refId != -1));//newCiDetail.refId.length > 0
		
		
		
		if((isNewTemplate || isNewItSecGroup) && this.itsecChanged) {// && !this.itsecChanged  && this.ciModified
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
//			cancelApplicationDetail(button, event); //ORIG
			
//			actionButtonHandler(true, false);//first refactor measure
			
			//just open CiSearchView, refac: use event to notify ciCenterView and CiNavigationView
//			var ciCenterView = this.getComponent('workpanel');
//			ciCenterView.getLayout().setActiveItem('searchpanel');
			
//			var ciNavigationView = this.getComponent('ciNavigationCiew');
//			ciNavigationView.onApplicationCancel();
			
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
		var panelMsg = ACM.getRequiredFields(AAM.getAppDetail());
		
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
			
//			this.checkTemplateChange();

			if(!this.skipLoading)
				this.loadCiDetails();//hier ein itsecGroupCallback übergeben (das ComplianceControlWindow), wenn er nach dem Neuladen aufgerufen werden soll
			
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
	
	//siehe CiComplianceView.updateComplianceDetails
//	checkTemplateChange: function() {
//		if(this.templateChanged) {//new template or removed template?
//			var referencesListStore = AIR.AirStoreManager.getStoreByName('referencesListStore');
//			referencesListStore.load();
//		}
//	},
	
	
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
				record = Util.getStoreRecord(store, 'ciSubTypeId', parseInt(data.applicationCat1Id));
				break;
			case AC.TABLE_ID_IT_SYSTEM:
				record = Util.getStoreRecord(store, 'ciSubTypeId', parseInt(data.ciSubTypeId));
				break;
			default:
				record = Util.getStoreRecord(store, 'ciTypeId', parseInt(data.tableId));
				break;
		}

		this.getComponent('lCiName').setText(data.name);//name data.name applicationName
		this.getComponent('lCiType').setText(record.get('text'));//ciData.applicationCat1Txt applicationName
		
		var isDeleted = data.deleteTimestamp && data.deleteTimestamp.length > 0;
		this.getComponent('lCiIsDeleted').setVisible(isDeleted);
	},
	
	updateLabels: function(labels) {
//		this.getComponent('editpanelmessage').setText(labels.header_applicationIsIncomplete.replace('##', ACM.getRequiredFields(AAM.getAppDetail())));
//    	this.getComponent('editpaneldraft').setText(labels.header_applicationIsDraft.replace('##', ''));//draftFlag '' (#8)
    	

		
    	var ciEditTabView = this.getComponent('ciEditTabView');
    	
		var ciDetailsView = ciEditTabView.getComponent('clCiDetails');
		ciDetailsView.updateLabels(labels);
		
		//falls kein CI vor dem Start ausgewählt war, gibt es natürlich keine gesicherte tableId. Folge: kein specificsView Label kann gesetzt werden
		//ODER die Lebels aller specificsView CI Typ Seiten müssen gesetzt werden ODER CiSpecificsAnwendungView Labels werden per Default gesetzt, wie hier:
//		var tableId = this.tableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;//Test: AC.TABLE_ID_TERRAIN
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
		
		var tableId = this.tableId || AAM.getTableId() || AC.TABLE_ID_APPLICATION;//Test: AC.TABLE_ID_TERRAIN
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
		
//		var ciHistoryView = ciEditTabView.getComponent('clCiHistory');
//		ciHistoryView.updateToolTips(toolTips);
	},
	
	onCiSelected: function(sourceView, ciId, target, record) {
		this.reset();
		this.tableId = record.get('tableId');//grid.getStore().getAt(rowIndex).get('tableId');
	},
	
	reset: function() {
		this.isLoaded = false;
		this.isUserChange = false;
		
//		this.disableButtons();
		this.tableId = AAM.getTableId();//für reset nach applicationCopy ContinueEditing Button Klick
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
	
	onViewInitialized: function(childView) {//view,
		var options = AAM.getAppDetail();
		
		var panelMsg = ACM.getRequiredFields(options);
		if(panelMsg.length > 0) {
			this.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));
		} else {
			this.setPanelMessage(panelMsg);
		}
		
//		this.disableButtons();
		var task = new Ext.util.DelayedTask(function() {
			this.isUserChange = true;
			this.ciModified = false;
			this.itsecChanged = false;
			
			this.disableButtons();
		}.createDelegate(this));
		task.delay(2000);// 1000
	}
	
	//============================================================
//	initView: function(parentView, childView, callback) {
//		parentView.on('afterlayout', this.onViewAdded, this);//ciEditView afterrender .getComponent('clCiCompliance')
//		parentView.add(childView);
//	},
//	
//	onViewAdded: function(parentCt, layout) {
//		Util.log('CiEditView::onViewAdded(): '+parentCt.getId());
//		//ciLicenseView.on('ciChange', this.onCiChange, this);
//		//ciLicenseView.update(ciData);
//		//ciLicenseView.updateLabels(labels);
////		parentCt.doLayout();
//	}
	//============================================================
});
Ext.reg('AIR.CiEditView', AIR.CiEditView);
Ext.namespace('AIR');

AIR.AirApplicationManager = function() {
	
	return {
		DATE_FORMAT_DE: 'd.m.Y',
		DATE_FORMAT_EN: 'm/d/Y',
		DATE_FORMAT_INTERNATIONAL: 'dMY',
		
		toolbarMessageTpl: new Ext.XTemplate('<table><tr><td><img src="images/{icon}"/></td><td>{text}</td></tr><table>'),//images/{icon}

		
		processLogin: function(initAirCallback, loginCallback) {
		
			var airCookie = Ext.state.Manager.get('airCookie');
			
			if(airCookie) {
				var checkAuthStore = AIR.AirStoreFactory.createCheckAuthStore();
//				checkAuthStore.on('load', this.onAuthCheck, this);
				
				if(this.isAnwendungsEinsprung()) {
					var einsprungData = this.getEinsprungData();
					
					this.updateCookie(einsprungData);
				}
				
				checkAuthStore.load({
					params: {
						cwid: airCookie.cwid,
						token: airCookie.token
					},
					callback: function(records, options, isSuccess) {
//						Util.log('Login Status: '+records[0].data.result);
						
						if(isSuccess && records[0].data.result === 'OK') {
							initAirCallback(airCookie);
						} else {
							loginCallback();
						}
					}
				});
			} else {
				loginCallback();
			}
		},
		
		init: function(loginData) {
			Ext.apply(Ext.form.VTypes, {
				sapNamePart2_3: this.validateSapNamePart2_3.createDelegate(this),
				sapNamePart1: this.validateSapNamePart1.createDelegate(this)
				//sapNamePart2_3Text: 'Wert muss eine Dezimalzahl sein'//language Datei!
			});
			
        	this.setCwid(loginData.cwid);
        	this.setToken(loginData.token);
        	this.setUserName(loginData.username);
        	
        	var lastlogon;
        	if(loginData.lastlogon) {
        		lastlogon = loginData.lastlogon;
        	} else {
        		var airCookie = Ext.state.Manager.get('airCookie');
        		lastlogon = airCookie.lastlogon;
        	}
        	this.setLastLogon(lastlogon);
			
			this.initLoadMasks();
			this.loadConnectionProperties();
//			this.registerVTypes();
			
			this.loadStoreIds();
		},
		
//		registerVTypes: function() {
//			Ext.apply(Ext.form.VTypes, {
//			    allowedName: function(val, field) {
//			    	var objectAliasAllowedStore = AIR.AirStoreFactory.createObjectAliasAllowedStore();
//			    	
//			    	var isValid = objectAliasAllowedStore.getAt(0) === undefined ? true :
//			    				  objectAliasAllowedStore.getAt(0).data.countResultSet == 0 ? true : false;
//			    	
//			        return isValid;
//			    },
//			    allowedNameText: '"Name" already exists. Please chose another name for this application.'
//			});
//		},
		
		initLoadMasks: function() {
			this.masks = {};
			this.masks.start = new Ext.LoadMask(Ext.getBody(), { msg: 'Initializing AIR...' });
			this.masks.load = new Ext.LoadMask(Ext.getBody(), { msg: 'Loading data...' });
			this.masks.save = new Ext.LoadMask(Ext.getBody(), { msg: 'Saving data...' });//msg: AIR.AirApplicationManager.getLabels().gerneral_message_saving
		},
		getMask: function(type) {
			return this.masks[type];
		},
		
		
		loadStoreIds: function() {
			this.storeIds = {
				ciTypeListStore: null,
				aclStore: null,
				currencyListStore: null,
				licenseTypeListStore: null,
				accountListStore: null,
				itSetListStore: null,
				itSecSBAvailabilityListStore: null,
				itSecSBConfidentialityListStore: null,
				classInformationListStore: null,
				slaListStore: null,
				serviceContractListStore: null,
				priorityLevelListStore: null,
				severityLevelListStore: null,
				businessEssentialListStore: null,
				applicationCat2ListStore: null,
				lifecycleStatusListStore: null,
				operationalStatusListStore: null,
				categoryBusinessListStore: null,
				dataClassListStore: { params: { params: { categoryBusinessId: 1 } } },//null, selectedCategoryBusinessId

				itSecGroupListStore: null,
				itSecGroupSimpleListStore: null,
				referencesListStore: null,
				itsecMassnahmenGapClassListStore: null,
//				signeeListStore: null,//vom itSet abh�ngig, daher hier nicht ODER lokal filtern mit itSet nach �ffnen des ComplianceControlsWindow
				
				rolePersonListStore: { params: { params: { cwid: this.getCwid() } } },
				itsecUserOptionListStore: { params: { params: { cwid: this.getCwid() } } },
//				rolePersonBusinessEssentialListStore: { params: { params: { cwid: this.getCwid() } } },//not used, wo zu verwenden?
			
				processListStore: null,
				applicationCat1ListStore: null,
				databaseDisplayNameListStore: null,
				
//				languageToolTipStore: null,//muss sp�ter auch zu languageHelpStoreEN, languageHelpStoreDE werden
				languageToolTipStoreEN: null,
				languageToolTipStoreDE: null,
				languageHelpStore: null,//muss sp�ter auch zu languageHelpStoreEN, languageHelpStoreDE werden
				languageStoreEN: null,
				languageStoreDE: null,
				gxpFlagListStore: null,
				loadClassListStore: null,
				serviceModelListStore: null,
				dedicatedListStore: null,
				organisationalScopeListStore: null,
    			sisoogleSourceListStore: null,//{ params: { params: { type: AC.SISOOGLE_ATTR_TYPE_INSERT_QUELLE } } },
				linkCiTypeListStore: null,
				groupTypesListStore: null,
				
				sapAssetListStore: null,
				sapAssetSoftwareListStore: null,
				landListStore: null, 
				manufactureListStore: null, 
				subCategoryListStore: null,
				typeListStore: null,
				modelListStore: null,
				costCenterListStore: null, 
				pspElementListStore: null,
				osListStore: null,
				softwaremanufacturerListStore:null,
				legalentityListStore:null
			};
			
			this.storeCount = 0;
			for(var key in this.storeIds)
				this.storeCount++;
		},
		
		getStoreCount: function() {
			return this.storeCount;
		},
		
		getStoreIds: function() {
			return this.storeIds;
		},
		
		afterInit: function(airViewport) {
//	    	var language = this.getUserOptions(AC.USER_OPTION_LANGUAGE);
//	    	this.setLanguage(language);//zu sp�t...
	    	
			this.lSouthToolbar = airViewport.getBottomToolbar().getComponent('lSouthToolbar');
			this.registerComponents(airViewport);
		},
		
		//move to CiCenterView
		registerComponents: function(airViewport) {
//			var lastRenderedView = airViewport.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView').getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciResponsible');//this.airMainPanel.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('CiDeleteView');//ciCenterView
//			lastRenderedView.on('afterrender', this.onAirRendered , this);//render
			
			//navigation
			var navigationView = airViewport.getComponent('ciNavigationView');
			this.dirtyNavRef = navigationView;//REFAC!
			
			//center
			var ciCenterView = airViewport.getCenterView();
			var ciInfoView = airViewport.getComponent('eastpanel');
			var myPlaceTabView = ciCenterView.getComponent('myPlaceView').getComponent('myPlaceTabView');
			var ciSearchView = ciCenterView.getComponent('ciSearchView');
			
			//replace rowclick registration by event(ciSelect) fired by MyPlaceTabView and register on this
//			var myOwnCIsGrid = myPlaceTabView.getComponent('card-mycis')/*.getComponent('myOwnCisView')*/.getComponent('myOwnCIsGrid');
//			var myDelegateCIsGrid = myPlaceTabView.getComponent('card-myapps')/*.getComponent('myDelegateCisView')*/.getComponent('myDelegateCIsGrid');
			//var ciSearchGrid = ciSearchView/*.getComponent('ciSearchResultView')*/.getComponent('ciSearchGrid');
			
			this.exportForm = ciCenterView.getComponent('exportForm');

			
			var ciEditView = ciCenterView.getComponent('ciEditView');
			//var ciEditTabView = ciEditView.getComponent('ciEditTabView');
			//if(ciEditTabView)
				this.registerCiEditView(ciCenterView);
			
			
			
			myPlaceTabView.on('ciSelect', navigationView.onCiSelected, navigationView);
//			ciSearchView.on('ciSelect', navigationView.onCiSelected, navigationView);
			ciSearchView.getComponent('ciSearchResultView').on('ciSelect', navigationView.onCiSelected, navigationView);
			ciSearchView.getComponent('ciSearchResultView').on('ciSelect', ciEditView.onCiSelected, ciEditView);
			ciSearchView.getComponent('ciSearchResultView').on('externalNavigation', navigationView.onExternalNavigation, navigationView);//doubleclick on ci in ci search table AND onTabChange
			ciSearchView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
//			myPlaceTabView.on('ciSelect', ciCenterView.onCiSelected, ciCenterView);
//			ciSearchView.on('ciSelect', ciCenterView.onCiSelected, ciCenterView);
			
			
//			navigationView.on('navigation', ciEditView.onNavigation, ciEditView);
//			navigationView.on('navigation', ciEditTabView.onNavigation, ciEditTabView);
	
			navigationView.on('navigation', ciInfoView.onNavigation, ciInfoView);
			navigationView.on('navigation', ciCenterView.onNavigation, ciCenterView);
			navigationView.on('airAction', this.onAirAction, this);

			
			var ciTitleView = airViewport.getComponent('ciTitleView');
			var clLanguage = ciTitleView.getComponent('pCiTitleViewNorth').getComponent('clLanguage');
			var clLogOut = ciTitleView.getComponent('pCiTitleViewNorth').getComponent('clLogOut');
			
			clLanguage.on('click', airViewport.switchLanguage, airViewport);//oder wieder hier im AirAppMgr ?
			clLogOut.on('click', this.logout, this);

			//----------------------------------------------------------------------------------------------------
			//external navigation (CiNavigationView perspective)
			//new wizard
			
			var ciCreateWizardView = airViewport.getCenterView().getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardView');//.getComponent('ciCreateWizardP1').getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView')
			if(ciCreateWizardView) {
				ciCreateWizardView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
				ciCreateWizardView.on('airAction', this.onAirAction, this);
			}
			//new wizard
			var ciNewAssetView = airViewport.getCenterView().getComponent('ciNewAssetView');
			ciNewAssetView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
			
			var ciNewHardwareAsset = airViewport.getCenterView().getComponent('ciNewHardwareAsset');
			ciNewHardwareAsset.on('externalNavigation', navigationView.onExternalNavigation, navigationView);

			var ciNewSoftwareAsset = airViewport.getCenterView().getComponent('ciNewSoftwareAsset');
			ciNewSoftwareAsset.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
			
			var ciCreateView = airViewport.getCenterView().getComponent('ciCreateView');
			var ciCopyFromView = ciCreateView.getComponent('ciCreatePagesView').getComponent('CiCopyFromView');
			var ciCreateWizardPagesView = ciCreateView.getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView');
			
			ciCreateView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//ciCreateWizardPagesView applicationCopy
			ciCopyFromView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//applicationCopy
			if(ciCreateWizardPagesView)
				ciCreateWizardPagesView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
			
			airViewport.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//restore navigation from cookie
			myPlaceTabView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//doubleclick on ci in ci search table
//			ciSearchView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//doubleclick on ci in ci search table
			
			var myPlaceHomeView = airViewport.getCenterView().getComponent('myPlaceHomeView');
			if(ciCreateWizardPagesView)
				ciCreateWizardPagesView.on('userOptionsChange', myPlaceHomeView.saveUserOptions, myPlaceHomeView);
			
			
			ciCenterView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);

			this.historyManager = new AIR.AirHistoryManager();
			var hHistory = airViewport.getComponent('ciTitleView').getComponent('pCiTitleViewNorth').getComponent('hHistory');
			this.historyManager.init(navigationView, ciTitleView, hHistory);
			
			this.callbackManager = new AIR.AirCallbackManager();
			this.callbackManager.init(airViewport);
//			AIR.AirHistoryManager.init(navigationView, ciTitleView);
			//----------------------------------------------------------------------------------------------------
			
			//airAction
			var ciDeleteView = ciCreateView.getComponent('ciCreatePagesView').getComponent('ciDeleteView');
			
			ciCopyFromView.on('airAction', this.onAirAction, this);
			if(ciCreateWizardPagesView)
				ciCreateWizardPagesView.on('airAction', this.onAirAction, this);
			ciDeleteView.on('airAction', this.onAirAction, this);
			
			//Asset Management
			var ciAssetSearchResultView = ciCenterView.getComponent('ciAssetManagementView').getComponent('ciAssetSearchResultView');
			ciAssetSearchResultView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
		},
		
		getCallbackManager: function() {
			return this.callbackManager;
		},
		
		registerCiEditView: function(ciCenterView) {
			var ciEditView = ciCenterView.getComponent('ciEditView');
			var ciEditTabView = ciEditView.getComponent('ciEditTabView');
			
			var myPlaceTabView = ciCenterView.getComponent('myPlaceView').getComponent('myPlaceTabView');
			var ciSearchView = ciCenterView.getComponent('ciSearchView');
			
//			var myOwnCIsGrid = myPlaceTabView.getComponent('card-mycis')/*.getComponent('myOwnCisView')*/.getComponent('myOwnCIsGrid');
//			var myDelegateCIsGrid = myPlaceTabView.getComponent('card-myapps')/*.getComponent('myDelegateCisView')*/.getComponent('myDelegateCIsGrid');
			//var ciSearchGrid = ciSearchView/*.getComponent('ciSearchResultView')*/.getComponent('ciSearchGrid');
			

			//ciSearchGrid.on('rowclick', ciEditView.onCiSelected, ciEditView);
			
//			myOwnCIsGrid.on('rowclick', ciConnectionsView.onCiSelected, ciConnectionsView);
//			myOwnCIsGrid.on('rowclick', ciComplianceView.onCiSelected, ciComplianceView);
//			myDelegateCIsGrid.on('rowclick', ciConnectionsView.onCiSelected, ciConnectionsView);
//			myDelegateCIsGrid.on('rowclick', ciComplianceView.onCiSelected, ciComplianceView);
			//ciSearchGrid.on('rowclick', ciConnectionsView.onCiSelected, ciConnectionsView);
			//ciSearchGrid.on('rowclick', ciComplianceView.onCiSelected, ciComplianceView);
			
			var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
			var ciComplianceView  = ciEditTabView.getComponent('clCiCompliance');
			
			myPlaceTabView.on('ciSelect', ciEditView.onCiSelected, ciEditView);
			myPlaceTabView.on('ciSelect', ciConnectionsView.onCiSelected, ciConnectionsView);
			myPlaceTabView.on('ciSelect', ciComplianceView.onCiSelected, ciComplianceView);
			
			
			var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
			ciSpecificsView.on('airAction', this.onAirAction, this);
			ciComplianceView.on('airAction', this.onAirAction, this);
			
			var navigationView = this.dirtyNavRef;
			ciEditView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
			ciEditView.on('airAction', this.onAirAction, this);
		},
		
		addHistoryItem: function(link, isExternalNavigation) {
			this.historyManager.add(link, isExternalNavigation);
		},
		
		onAirAction: function(source, airActionType, data) {
			var icon = 'ok_type2_16x16.png';
			var message = '';
			
			var tableId = this.appDetail ? this.appDetail.tableId : AAM.getTableId();
			var r = (tableId==undefined?"":Util.getCiTypeByTableId(tableId));
			
			switch(airActionType) {
				case 'appSaveSuccess':
					message = r.get('text') + ' ' + this.appDetail.name + ' saved';//this.appDetail.applicationCat1Txt
					break;
				case 'appCopySuccess':
					var message = data.applicationCat1 + ' ' + data.nameNew + ' as copy of ' + data.name + ' created';
					break;
				case 'appCreateSuccess':
					message = 'New ' + data.applicationCat1 + ' ' + data.name + ' created';
					break;
				case 'appDeleteSuccess':
					message = data.applicationCat1 + ' ' + data.name + ' deleted';
					break;
				case 'appLoadSuccess':
					message = r.get('text') + ' ' + this.appDetail.name + ' loaded';//this.appDetail.applicationCat1Txt
					break;
				case 'airReady':
					message = 'AIR ready';
					break;
				case 'airError':
					icon = 'failed_type2_16x16.png';
					
					switch(data.airErrorId) {
						case AC.AIR_ERROR_INVALID_CAT2_SAP:
							message = data.isSapApp ? this.getLabels().SAPNameToStandardNameInvalid : this.getLabels().StandardNameToSAPNameInvalid;
							message = message.replace('{0}', data.name).replace('{1}', data.sapApplicationCat2);//message.replace('{0}', data.applicationCat1).replace('{1}', data.applicationName);
							if(data.isSapApp)
								message = message.replace('{2}', data.applicationCat2);
//							message = this.getLabels().ToolbarInvalidCat2SAP;
//							message = message.replace('{0}', data.applicationCat1).replace('{1}', data.applicationName).replace('{3}', data.applicationCat2);
//							message = message.replace('{2}', data.isSapApp ? this.getLabels().indefinite_article : this.getLabels().indefinite_article_no);
//							//data.applicationCat1 + ' ' + data.applicationName + ' is no SAP application. Therefore, the IT Category ' + data.applicationCat2 + ' is not valid';
							break;
						case AC.AIR_ERROR_INVALID_TEMPLATE:
							message = this.getLabels().ToolbarInvalidTemplate;
							message = message.replace('{0}', data.applicationCat1).replace('{1}', data.name);
							break;
						default: break;
					}
					break;
				case 'clear':
				default: icon = 'Transparent.png';
			}
			
			this.updateStatusBar(message, icon);
		},
		
		updateStatusBar: function(message, icon) {
			var data = {
				text: message,
				icon: icon
			};
			
			this.toolbarMessageTpl.overwrite(this.lSouthToolbar.getEl(), data);
		},
		
		loadConnectionProperties: function() {
			if(this.connectionProperties)
				return;
			
			var connectionPropertiesStore = AIR.AirStoreFactory.createConnectionPropertiesStore();
			var records = connectionPropertiesStore.getRange();
			//connectionPropertiesStore.on('load', this.onConnectionPropertiesLoaded, this);
	
			//connectionPropertiesStore.load();
			var connectionProperties = {};
			
			for(var i = 0; i < records.length; i++)
				if(!connectionProperties[records[i].data.Source])
					connectionProperties[records[i].data.Source] = [];
			
			for(var i = 0; i < records.length; i++)
				connectionProperties[records[i].data.Source][connectionProperties[records[i].data.Source].length] = records[i].data;
			
			this.connectionProperties = connectionProperties;
		},
	
		/*onConnectionPropertiesLoaded: function(store, records, options) {
			var connectionProperties = {};
			
			for(var i = 0; i < records.length; i++)
				if(!connectionProperties[records[i].data.Source])
					connectionProperties[records[i].data.Source] = [];
			
			for(var i = 0; i < records.length; i++)
				connectionProperties[records[i].data.Source][connectionProperties[records[i].data.Source].length] = records[i].data;
			
			this.connectionProperties = connectionProperties;
		},*/
		
		isNewConnectionAllowed: function(ciTypeSource, ciTypeDest, direction) {
			for(var source in this.connectionProperties)
				if(source == ciTypeSource)
					for(var i = 0; i < this.connectionProperties[source].length; i++)
						if(this.connectionProperties[source][i].Destination == ciTypeDest && this.connectionProperties[source][i][direction] == 'Y')
							return true;
			
//			for(var i = 0; i < this.connectionProperties[ciTypeSource].length; i++)
//				if(this.connectionProperties[ciTypeSource][i].Destination == ciTypeDest && this.connectionProperties[ciTypeSource][i][direction] == 'Y')
//					return true;
			
			return false;
		},
		
		validateCreateConnection: function(exists, newCiType, newCiName, ciType, ciName, direction) {//exists, ciType, ciName, newCiType, newCiName, direction
			var result = { 
				isSuccessful: false,
				messageType: 'warning'
			};
			
			if(exists) {
				result.message = '<b>'+this.getLabels().CiConnectionsViewMsgAlreadyExists+'</b>';//languagestore.data.items[0].data['CiConnectionsViewMsgAlreadyExists']//direction + ' connection ' + newCiType + ' ' + newCiName + '<br/>already exists for ' + ciType + ' ' + ciName;
			} else {
				if(this.isNewConnectionAllowed(ciType, newCiType, direction)) {
					result.messageType = 'info';
					result.message = '<b>'+this.getLabels().CiConnectionsViewMsgSuccessfullyAdded+'</b>';//direction + ' connection ' + newCiType + ' ' + newCiName + '<br/>successfully added to ' + ciType + ' ' + ciName;
					result.isSuccessful = true;
				} else {
					result.message = '<b>'+this.getLabels().CiConnectionsViewMsgNotAllowed+'</b>';//direction + ' connection ' + newCiType + ' ' + newCiName + '<br/>is not allowed to be added to ' + ciType + ' ' + ciName;
				}
			}
			
			return result;
		},
		
		isConnectionCiTypeAllowed: function(ciTypeSource, ciTypeDest) {
			for(var source in this.connectionProperties)
				if(source == ciTypeSource)
					for(var i = 0; i < this.connectionProperties[source].length; i++)
						if(this.connectionProperties[source][i].Destination == ciTypeDest && 
						   (this.connectionProperties[source][i].Upstream == 'Y' || this.connectionProperties[source][i].Downstream == 'Y'))
							return true;
			
			return false;
		},
		
		validateDeleteConnection: function() {
			var result = {
				isSuccessful: true,
				messageType: 'info'
			};
			
			result.message = '<b>'+this.getLabels().CiConnectionsViewMsgSuccessfullyDeleted+'</b>';
			
			return result;
		},
		
		getExportForm: function() {
			var hiddenFields = this.exportForm.findByType('hidden');
			for(var i = 0; i < hiddenFields.length; i++)
				hiddenFields[i].reset();
			
			return this.exportForm.getEl().dom.children[0].children[0];
		},
		
		getExportFormAsExtElement: function() {
			//evtl. alle hidden Felder Werte l�schen vor dem zur�ckgeben
			
			return this.exportForm;
		},
		
		getDateFormat: function(language) {
//			if(!language)
//				language = this.getLanguage();
				
			switch(language) {
				case 'EN':
				case 'en':
					return this.DATE_FORMAT_EN;
				case 'DE':
				case 'de':
					return this.DATE_FORMAT_DE;
				default:
					return this.DATE_FORMAT_INTERNATIONAL;
			}
		},
		
		isDate: function(value) {
			var regExp = new RegExp(this.getDateFormat());
			return value.match(regExp);
		},
		
		getDefaultCurrency: function() {
			var itsecUserOptionListStore = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
			var index = itsecUserOptionListStore.findExact('itsecUserOptionName', 'AIR_CURRENCY');
			var defaultCurrencyId = index > -1 ? itsecUserOptionListStore.getAt(index).data.itsecUserOptionValue : '';
			
//			var defaultCurrencyId = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore').data.items[0].data.itsecUserOptionValue;
			return defaultCurrencyId;
		},
		
		setAppDetail: function(appDetail) {
			//n�tig/besser?
			this.appDetail = null;
			delete this.appDetail;
			
			this.appDetail = appDetail;
		},
		
		getAppDetail: function() {
			return this.appDetail;
		},
		
		
		setCwid: function(cwid) {
			this.cwid = cwid;
		},
		
		setToken: function(token) {
			this.token = token;
		},
		
		setLanguage: function(language) {
			if(!language) {
				this.language = this.getUserOptions(AC.USER_OPTION_LANGUAGE);
				
				if(!this.language || this.language.length == 0)
					this.language = 'EN';
			} else {
				this.language = language;
			}
		},
		
		
		getCwid: function() {
			return this.cwid;
		},
		
		getToken: function() {
			return this.token;
		},
		
		
		setUserName: function(userName) {
			this.userName = userName;
			var array = userName.split(' ');
			this.firstName = array[0];
			this.lastName = array[1];
		},
		
		getUserName: function() {
			return this.userName;
		},
		getFirstName: function() {
			return this.firstName;
		},
		getLastName: function() {
			return this.lastName;
		},
		getFullName: function(){
			return AAM.lastName+', '+AAM.firstName+' ('+AAM.cwid+')';
		},
		
		
		setLastLogon: function(lastLogon) {
			this.lastLogon = lastLogon;
		},
		
		getLastLogon: function() {
			return this.lastLogon;
		},

		getLanguage: function() {
			return this.language;
		},
		setCiTypeId: function(ciTypeId){
			this.ciTypeId = ciTypeId;
		},
		getCiTypeId: function () {
			return this.ciTypeId;
		},
		getCiId: function() {
			return this.ciId;
		},		
		setCiId: function(ciId) {
			this.ciId = ciId;
		},
		getTableId: function() {
			return this.tableId;
		},
		setTableId: function(tableId) {
			this.tableId = tableId;
		},
		getCiSubTypeId: function() {
			return this.ciSubTypeId;
		},
		setCiSubTypeId: function(ciSubTypeId) {
			this.ciSubTypeId = ciSubTypeId;
		},
		getSelectedCiIds: function() {
			return this.selectedCiIds;
		},
		setSelectedCiIds: function(selectedCiIds) {
			this.selectedCiIds = selectedCiIds;
		},
		
		getAssetId: function(){
			return this.assetId;
		},
		
		setAssetId: function(assetId){
			this.assetId = assetId;
		},
		
		getComponentType: function(){
			return this.componentType;
		},
		
		setComponentType: function(componentType){
			this.componentType = componentType;
		},
		
		getHelpText: function(helpTextId) {
			var languageHelpStore = AIR.AirStoreManager.getStoreByName('languageHelpStore');
			var helpText = languageHelpStore.data.items[0].data[helpTextId];
			
			return helpText;
		},
		
		getLabels: function() {
			var storeId = 'languageStore' + this.getLanguage();
			var languageStore = AIR.AirStoreManager.getStoreByName(storeId);
			
			return languageStore.data.items[0].data;
		},

		getToolTips: function() {
			var storeId = 'languageToolTipStore' + this.getLanguage();
			var languageToolTipStore = AIR.AirStoreManager.getStoreByName(storeId);
			
			return languageToolTipStore.data.items[0].data;
		},
		
		getUserOptions: function(itsecUserOptionName) {
			var itsecUserOptionListStore = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
			var userOptions = itsecUserOptionListStore.data.items;//.data;
			for(var i = 0; i < userOptions.length; i++)
				if(userOptions[i].data.itsecUserOptionName === itsecUserOptionName)
					return userOptions[i].data.itsecUserOptionValue;
			
			return null;
		},
		
		updateCookie: function(data, removeOthers) {
			var airCookie = Ext.state.Manager.get('airCookie') || {};
			
			if(removeOthers)
				airCookie = {};
			
			for(var key in data)
				airCookie[key] = data[key];
			
			Ext.state.Manager.set('airCookie', airCookie);
		},
		
		logout: function() {
			Ext.state.Manager.clear('airCookie');

			//alle stores leeren und alles andere delete/null setzen
			window.location = 'jsp/logoutAction.jsp?cwid='+this.getCwid()+'&token='+this.getToken();// ../logoutAction.jsp
		},
		
		restoreUiState: function(airViewport) {
			var airCookie = Ext.state.Manager.get('airCookie');
			
			if(airCookie.ciId) {
				this.setCiId(airCookie.ciId);
				this.setCiSubTypeId(airCookie.ciSubTypeId);
				this.setTableId(airCookie.tableId);
			}
		},
		
		restoreUi: function(airViewport) {
			var airCookie = Ext.state.Manager.get('airCookie');
			
			if(airCookie.navigation)
				airViewport.fireEvent('externalNavigation', airViewport, null, airCookie.navigation);
			else this.historyManager.afterInit();
		},
		
		//RFC 8231 Einrichten der Rolle "Administrator"
		hasRole: function(roleName) {
			var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
			var index = rolePersonListStore.findExact('roleName', roleName);
			return index > -1;
		},
		//RFC 8231 Einrichten der Rolle "Administrator"
		
		
		disableInvalidKeys: function(event, el, options) {
			var keyCode = event.keyCode;//Ext.isIE ? event.charCode : event.keyCode;
			
			switch(keyCode) {
				case 116: //F5
				case 117: //F6
					// Standard DOM (Mozilla): 
					if(event.preventDefault)
						event.preventDefault(); 
//					
					//IE (exclude Opera with !event.preventDefault): 
					if(document.all && window.event && !event.preventDefault) {
//						event.cancelBubble = true;
//						event.returnValue = false;
						event.keyCode = 0;//WHY NECESSARY?
					} 
					return false;
				
				case 8: //backspace
					var uiElement = Ext.isIE ? event.srcElement : event.target;
					var tagName = uiElement.tagName;
					
		            if(tagName == 'BODY' || tagName == 'HTML' || tagName == 'DIV' || (tagName == 'INPUT' && uiElement.readOnly)) {//event.originalTarget.id.indexOf('tf') == -1
						if(event.preventDefault)
							event.preventDefault(); 
		            
		                return false;
		            }
			};
			
			return true;
		},
		
		validateSapNamePart1: function(value, field) {
			if(value.length > AC.REGEX_SAP_NAME_PART_1) {
				value = value.substring(0, AC.REGEX_SAP_NAME_PART_1);
				field.setRawValue(value);
			}
			
			return value.length <= AC.REGEX_SAP_NAME_PART_1 && value.length > 0;
		},
		
		validateSapNamePart2_3: function(value, field) {
			if(value.length > AC.REGEX_SAP_NAME_PART_2_3) {
				value = value.substring(0, AC.REGEX_SAP_NAME_PART_2_3);
				field.setRawValue(value);
			}
			
			return value.length <= AC.REGEX_SAP_NAME_PART_2_3 && value.length > 0;
		},
		
		isAnwendungsEinsprung: function() {
			var baseURI = document.URL || document.location ;
			return baseURI.indexOf('?') > -1;
		},
		
		getEinsprungData: function() {
			var baseURI = document.URL || document.location;
			
			if(baseURI.indexOf('#') > -1)
				baseURI = baseURI.split('#')[0];
			
			var tableIdCiId = baseURI.indexOf('?') > 0 && baseURI.indexOf('=') > -1 ? baseURI.split('?')[1].split('=')[1] : '0';
			var isPair = tableIdCiId.indexOf('-') > -1;
			if(isPair) {
				tableIdCiId = tableIdCiId.split('-');
				//tableIdCiId[0] = 'APP';//solange noch nicht alle CI Typen unterst�tzt werden. Siehe RFC 9022
			}
				
			
			var einsprungData = {
				tableId: isPair ? this.getTableIdByTLA(tableIdCiId[0]) : AC.TABLE_ID_APPLICATION,
				ciId: isPair ? tableIdCiId[1] : tableIdCiId,
				navigation: 'clCiDetails'
			};
			
			return einsprungData;
		},
		
		getTableIdByTLA: function(ciTypeTLA) {
			return AC.CI_TYPE_TLA[ciTypeTLA];
		},
		
		isLocationCi: function(tableId) {
			var t = parseInt(tableId);
			
			var is =
				t === AC.TABLE_ID_POSITION ||
				t === AC.TABLE_ID_ROOM ||
				t === AC.TABLE_ID_BUILDING_AREA ||
				t === AC.TABLE_ID_BUILDING ||
				t === AC.TABLE_ID_TERRAIN ||
				t === AC.TABLE_ID_SITE;
			
			return is;
		},
		
		getCreationCiTypes: function() {
			return this.getCreationCiTypesByUserRoles(AC.USE_CASE_CI_CREATION);
		},
		
		getAdvSearchCiTypes: function() {
			return this.getCreationCiTypesByUserRoles(AC.USE_CASE_CI_ADV_SEARCH);
		},
		
		getCreationCiTypesByUserRoles: function(useCase) {
			var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
			var records = rolePersonListStore.getRange();
			
			var creationCiTypes = [];
			for(var i = 0; i < records.length; i++) {
				var roleName = records[i].get('roleName').replace(/ /g, '');
				var roleCiTypes = useCase === AC.USE_CASE_CI_CREATION ?
												AC.CI_TYPE_CREATION_BY_ROLE[roleName] :
												AC.CI_TYPE_ADV_SEARCH_BY_ROLE[roleName];
				
				if(roleCiTypes)
					creationCiTypes.push(roleCiTypes);
			}
			
			return creationCiTypes;
		},
		
		filterCiTypes: function(combo, ciTypesByRole) {
			var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
			var records = store.getRange();
			
			for(var j = 0; j < ciTypesByRole.length; j++) {
				for(var i = 0; i < records.length; i++) {
					var ciTypeId = records[i].get('ciTypeId');
					var ciType = ciTypesByRole[j][ciTypeId];
					if(ciType) {
						if(ciType.length === 0) {
							combo.getStore().add(records[i]);
						} else {
							for(var k = 0; k < ciType.length; k++)
								if(records[i].get('ciSubTypeId') == ciType[k])
									combo.getStore().add(records[i]);
						}
					}
				}
			}
			
			combo.getStore().commitChanges();
			combo.getStore().sort('sortId');//sort singleSort
		},
		
		setMassUpdateData: function(massUpdateData) {
			//n�tig/besser?
			this.massUpdateData = null;
			delete this.massUpdateData;
			
			this.massUpdateData = massUpdateData;
		},
		
		getMassUpdateData: function() {
			return this.massUpdateData;
		},
		
		setSlaInValid: function(salInValid){
			this.salInValid = salInValid;
		},
		
		isSlaInvalid: function(){
			if(this.salInValid == undefined){
				return false;
			}else{
				return this.salInValid;
			}
		}
		
	};
}();

AAM = AIR.AirApplicationManager;
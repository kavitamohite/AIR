Ext.namespace('AIR');

AIR.AirApplicationManager = function() {
	
	return {
		DATE_FORMAT_DE: 'd.m.Y',
		DATE_FORMAT_EN: 'm/d/Y',
		
		toolbarMessageTpl: new Ext.XTemplate('<table><tr><td><img src="images/{icon}"/></td><td>{text}</td></tr><table>'),

		
		processLogin: function(initAirCallback, loginCallback) {
			var airCookie = Ext.state.Manager.get('airCookie');
			
			if(airCookie) {
				var checkAuthStore = AIR.AirStoreFactory.createCheckAuthStore();
//				checkAuthStore.on('load', this.onAuthCheck, this);
				
				checkAuthStore.load({
					params: {
						cwid: airCookie.cwid,
						token: airCookie.token
					},
					callback: function(records, options, isSuccess) {
						Util.log('Login Status: '+records[0].data.result);
						
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
			
        	AIR.AirApplicationManager.setCwid(loginData.cwid);
        	AIR.AirApplicationManager.setToken(loginData.token);
        	AIR.AirApplicationManager.setUserName(loginData.username);
        	
        	var lastlogon;
        	if(loginData.lastlogon) {
        		lastlogon = loginData.lastlogon;
        	} else {
        		var airCookie = Ext.state.Manager.get('airCookie');
        		lastlogon = airCookie.lastlogon;
        	}
        	AIR.AirApplicationManager.setLastLogon(lastlogon);
			
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
			this.masks.startupMask = new Ext.LoadMask(Ext.getBody(), { msg: 'Initializing AIR...' });
			this.masks.loadMask = new Ext.LoadMask(Ext.getBody(), { msg: 'Loading data...' });
			this.masks.saveMask = new Ext.LoadMask(Ext.getBody(), { msg: 'Saving data...' });//msg: AIR.AirApplicationManager.getLabels().gerneral_message_saving
		},

		
		

		getMask: function(type) {
			return this.masks[type];
		},
		
		loadStoreIds: function() {
//			this.storeIds = [ 
//                'currencyListStore', 'licenseTypeListStore', 'changeAccountListStore', 'runAccountListStore', 'itSetListStore',
//                'itSecSBAvailabilityListStore', 'classInformationListStore', 'slaListStore', 'serviceContractListStore',
//                'priorityLevelListStore', 'severityLevelListStore', 'businessEssentialListStore',
//                'applicationCat2ListStore', 'lifecycleStatusListStore', 'operationalStatusListStore', 'categoryBusinessListStore', 'dataClassListStore'
//            ];
			
//			this.storeIds = [ 
//				{ storeId: 'currencyListStore' }, { storeId: 'licenseTypeListStore' }, { storeId: 'changeAccountListStore' }, { storeId: 'runAccountListStore' }, { storeId: 'itSetListStore' },
//				{ storeId: 'itSecSBAvailabilityListStore' }, { storeId: 'classInformationListStore' }, { storeId: 'slaListStore' }, { storeId: 'serviceContractListStore' },
//				{ storeId: 'priorityLevelListStore' }, { storeId: 'severityLevelListStore' }, { storeId: 'businessEssentialListStore' },
//				{ storeId: 'applicationCat2ListStore' }, { storeId: 'lifecycleStatusListStore' }, { storeId: 'operationalStatusListStore' }, { storeId: 'categoryBusinessListStore' }, { storeId: 'dataClassListStore' }
////				{ storeId: 'rolePersonListStore', params: { cwid: AIR.AirApplicationManager.getCwid() } }
//            ];
			
			this.storeIds = {
				aclStore: null,
				dataClassListStore: { params: { params: { categoryBusinessId: 1 } } },//null, selectedCategoryBusinessId
				currencyListStore: null,
				licenseTypeListStore: null,
				changeAccountListStore: null,
				runAccountListStore: null,
				itSetListStore: null,
				itSecSBAvailabilityListStore: null,
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
				
				itSecGroupListStore: null,
				referencesListStore: null,
				
				rolePersonListStore: { params: { params: { cwid: AIR.AirApplicationManager.getCwid() } } },
				itsecUserOptionListStore: { params: { params: { cwid: AIR.AirApplicationManager.getCwid() } } },
//				rolePersonBusinessEssentialListStore: { params: { params: { cwid: AIR.AirApplicationManager.getCwid() } } },//not used, wo zu verwenden?
			
				processListStore: null,
				applicationCat1ListStore: null,
				databaseDisplayNameListStore: null,
				
//				languageToolTipStore: null,//muss später auch zu languageHelpStoreEN, languageHelpStoreDE werden
				languageToolTipStoreEN: null,
				languageToolTipStoreDE: null,
				languageHelpStore: null,//muss später auch zu languageHelpStoreEN, languageHelpStoreDE werden
				languageStoreEN: null,
				languageStoreDE: null,
				gxpFlagListStore: null,
				loadClassListStore: null,
				serviceModelListStore: null,
				dedicatedListStore: null,
				organisationalScopeListStore: null,
				
				sisoogleOsTypeListStore: { params: { params: { type: AC.SISOOGLE_ATTR_TYPE_OS_TYP } } },
				sisoogleOsNameListStore: { params: { params: { type: AC.SISOOGLE_ATTR_TYPE_OS_NAME } } },
				sisoogleSourceListStore: { params: { params: { type: AC.SISOOGLE_ATTR_TYPE_INSERT_QUELLE } } },
				sisoogleGapResponsibleListStore: { params: { params: { type: AC.SISOOGLE_ATTR_TYPE_GAP_RESPONSIBLE } } },
				
//				sisoogleGapEndDateListStore: { params: { params: { type: AC.SISOOGLE_ATTR_TYPE_GAP_END_DATE } } },
//				sisoogleActiveStateListStore: { params: { params: { type: AC.SISOOGLE_ATTR_TYPE_ACTIVE_Y_N } } },
//				sisoogleGpscOwnerListStore: { params: { params: { type: AC.SISOOGLE_ATTR_TYPE_GPSC_OWNER } } }
				
				ciTypeListStore: null
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
//	    	this.setLanguage(language);//zu spät...
	    	
			this.lSouthToolbar = airViewport.getBottomToolbar().getComponent('lSouthToolbar');
			this.registerComponents(airViewport);
		},
		
		//move to CiCenterView
		registerComponents: function(airViewport) {
			var hHistory = airViewport.getComponent('ciTitleView').getComponent('pCiTitleViewNorth').getComponent('hHistory');
			Ext.History.fieldId = hHistory;
			

			
//			var lastRenderedView = airViewport.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView').getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciResponsible');//this.airMainPanel.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('CiDeleteView');//ciCenterView
//			lastRenderedView.on('afterrender', this.onAirRendered , this);//render
			
			//navigation
			var navigationView = airViewport.getComponent('ciNavigationCiew');
			this.dirtyNavRef = navigationView;//REFAC!
			
			//center
			var ciCenterView = airViewport.getComponent('ciCenterView');
			var ciInfoView = airViewport.getComponent('eastpanel');
			var myPlaceTabView = ciCenterView.getComponent('myPlaceView').getComponent('myPlaceTabView');
			var ciSearchView = ciCenterView.getComponent('ciSearchView');
			
			//replace rowclick registration by event(ciSelect) fired by MyPlaceTabView and register on this
			var myOwnCIsGrid = myPlaceTabView.getComponent('card-mycis').getComponent('myOwnCisView').getComponent('myOwnCIsGrid');
			var myDelegateCIsGrid = myPlaceTabView.getComponent('card-myapps').getComponent('myDelegateCisView').getComponent('myDelegateCIsGrid');
			var ciSearchGrid = ciSearchView.getComponent('ciSearchResultView').getComponent('ciSearchGrid');
			
			this.exportForm = ciCenterView.getComponent('exportForm');

			
			var ciEditView = ciCenterView.getComponent('ciEditView');
			//var ciEditTabView = ciEditView.getComponent('ciEditTabView');
			//if(ciEditTabView)
				this.registerCiEditView(ciCenterView);
			
			
			
			myPlaceTabView.on('ciSelect', navigationView.onCiSelected, navigationView);
			ciSearchView.on('ciSelect', navigationView.onCiSelected, navigationView);
//			myPlaceTabView.on('ciSelect', ciCenterView.onCiSelected, ciCenterView);
//			ciSearchView.on('ciSelect', ciCenterView.onCiSelected, ciCenterView);
			
			
//			navigationView.on('navigation', ciEditView.onNavigation, ciEditView);
//			navigationView.on('navigation', ciEditTabView.onNavigation, ciEditTabView);
	
			navigationView.on('navigation', ciInfoView.onNavigation, ciInfoView);
			navigationView.on('navigation', ciCenterView.onNavigation, ciCenterView);
			navigationView.on('airAction', this.onAirAction, this);

			
			var ciTitleView = airViewport.getComponent('ciTitleView').getComponent('pCiTitleViewNorth');
			var clLanguage = ciTitleView.getComponent('clLanguage');
			var clLogOut = ciTitleView.getComponent('clLogOut');
			
			clLanguage.on('click', airViewport.switchLanguage, airViewport);//oder wieder hier im AirAppMgr ?
			clLogOut.on('click', this.logout, this);

			//----------------------------------------------------------------------------------------------------
			//external navigation (CiNavigationView perspective)
			//new wizard
			
			var ciCreateWizardView = airViewport.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardView');//.getComponent('ciCreateWizardP1').getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView')
			if(ciCreateWizardView) {
				ciCreateWizardView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
				ciCreateWizardView.on('airAction', this.onAirAction, this);
			}
			//new wizard
			
			
			
			var ciCreateView = airViewport.getComponent('ciCenterView').getComponent('ciCreateView');
			var ciCopyFromView = ciCreateView.getComponent('ciCreatePagesView').getComponent('CiCopyFromView');
			var ciCreateWizardPagesView = ciCreateView.getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView');
			
			ciCreateView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//ciCreateWizardPagesView applicationCopy
			ciCopyFromView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//applicationCopy
			if(ciCreateWizardPagesView)
				ciCreateWizardPagesView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
			
			airViewport.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//restore navigation from cookie
			myPlaceTabView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//doubleclick on ci in ci search table
			ciSearchView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);//doubleclick on ci in ci search table
			
			var myPlaceHomeView = airViewport.getComponent('ciCenterView').getComponent('myPlaceHomeView');
			if(ciCreateWizardPagesView)
				ciCreateWizardPagesView.on('userOptionsChange', myPlaceHomeView.saveUserOptions, myPlaceHomeView);
			
			
			ciCenterView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
//        	Ext.History.init(); //Fehler in IE bei ext-all-debug.js Z. 32840: iframe existiert nicht --> Laufzeitfehler
//        	Ext.History.on('change', ciCenterView.onBackForwardClick, ciCenterView);
			//----------------------------------------------------------------------------------------------------
			
			//airAction
			var ciDeleteView = ciCreateView.getComponent('ciCreatePagesView').getComponent('ciDeleteView');
			
			ciCopyFromView.on('airAction', this.onAirAction, this);
			if(ciCreateWizardPagesView)
				ciCreateWizardPagesView.on('airAction', this.onAirAction, this);
			ciDeleteView.on('airAction', this.onAirAction, this);
		},
		
		registerCiEditView: function(ciCenterView) {
			var ciEditView = ciCenterView.getComponent('ciEditView');
			var ciEditTabView = ciEditView.getComponent('ciEditTabView');
			
			var myPlaceTabView = ciCenterView.getComponent('myPlaceView').getComponent('myPlaceTabView');
			var ciSearchView = ciCenterView.getComponent('ciSearchView');
			
			var myOwnCIsGrid = myPlaceTabView.getComponent('card-mycis').getComponent('myOwnCisView').getComponent('myOwnCIsGrid');
			var myDelegateCIsGrid = myPlaceTabView.getComponent('card-myapps').getComponent('myDelegateCisView').getComponent('myDelegateCIsGrid');
			var ciSearchGrid = ciSearchView.getComponent('ciSearchResultView').getComponent('ciSearchGrid');
			
			var ciConnectionsView = ciEditTabView.getComponent('clCiConnections');
			var ciComplianceView  = ciEditTabView.getComponent('clCiCompliance');
			myOwnCIsGrid.on('rowclick', ciEditView.onCiSelected, ciEditView);
			myDelegateCIsGrid.on('rowclick', ciEditView.onCiSelected, ciEditView);
			ciSearchGrid.on('rowclick', ciEditView.onCiSelected, ciEditView);
			
			myOwnCIsGrid.on('rowclick', ciConnectionsView.onCiSelected, ciConnectionsView);
			myOwnCIsGrid.on('rowclick', ciComplianceView.onCiSelected, ciComplianceView);
			myDelegateCIsGrid.on('rowclick', ciConnectionsView.onCiSelected, ciConnectionsView);
			myDelegateCIsGrid.on('rowclick', ciComplianceView.onCiSelected, ciComplianceView);
			ciSearchGrid.on('rowclick', ciConnectionsView.onCiSelected, ciConnectionsView);
			ciSearchGrid.on('rowclick', ciComplianceView.onCiSelected, ciComplianceView);
			
			var ciSpecificsView = ciEditTabView.getComponent('clCiSpecifics');
			ciSpecificsView.on('airAction', this.onAirAction, this);
			ciComplianceView.on('airAction', this.onAirAction, this);
			
			var navigationView = this.dirtyNavRef;
			ciEditView.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
			ciEditView.on('airAction', this.onAirAction, this);
		},
		
		onAirAction: function(source, airActionType, data) {
			var icon = 'ok_type2_16x16.png';
			var message = '';
			
			switch(airActionType) {
				case 'appSaveSuccess':
					message = this.appDetail.applicationCat1Txt + ' ' + this.appDetail.applicationName + ' saved';
					break;
				case 'appCopySuccess':
					var message = data.applicationCat1 + ' ' + data.applicationNameNew + ' as copy of ' + data.applicationName + ' created';
					break;
				case 'appCreateSuccess':
					message = 'New ' + data.applicationCat1 + ' ' + data.applicationName + ' created';
					break;
				case 'appDeleteSuccess':
					message = data.applicationCat1 + ' ' + data.applicationName + ' deleted';
					break;
				case 'appLoadSuccess':
					message = this.appDetail.applicationCat1Txt + ' ' + this.appDetail.applicationName + ' loaded';
					break;
				case 'airReady':
					message = 'AIR ready';
					break;
				case 'airError':
					icon = 'failed_type2_16x16.png';
					
					switch(data.airErrorId) {
						case AC.AIR_ERROR_INVALID_CAT2_SAP:
							message = data.isSapApp ? this.getLabels().SAPNameToStandardNameInvalid : this.getLabels().StandardNameToSAPNameInvalid;
							message = message.replace('{0}', data.applicationName).replace('{1}', data.sapApplicationCat2);//message.replace('{0}', data.applicationCat1).replace('{1}', data.applicationName);
							if(data.isSapApp)
								message = message.replace('{2}', data.applicationCat2);
//							message = this.getLabels().ToolbarInvalidCat2SAP;
//							message = message.replace('{0}', data.applicationCat1).replace('{1}', data.applicationName).replace('{3}', data.applicationCat2);
//							message = message.replace('{2}', data.isSapApp ? this.getLabels().indefinite_article : this.getLabels().indefinite_article_no);
//							//data.applicationCat1 + ' ' + data.applicationName + ' is no SAP application. Therefore, the IT Category ' + data.applicationCat2 + ' is not valid';
							break;
						case AC.AIR_ERROR_INVALID_TEMPLATE:
							message = this.getLabels().ToolbarInvalidTemplate;
							message = message.replace('{0}', data.applicationCat1).replace('{1}', data.applicationName);
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
			connectionPropertiesStore.on('load', this.onConnectionPropertiesLoaded, this);
	
			connectionPropertiesStore.load();
		},
	
		onConnectionPropertiesLoaded: function(store, records, options) {
			var connectionProperties = {};
			
			for(var i = 0; i < records.length; i++)
				if(!connectionProperties[records[i].data.Source])
					connectionProperties[records[i].data.Source] = [];
			
			for(var i = 0; i < records.length; i++)
				connectionProperties[records[i].data.Source][connectionProperties[records[i].data.Source].length] = records[i].data;
			
			this.connectionProperties = connectionProperties;
		},
		
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
		
		validateCreateConnection: function(exists, ciType, ciName, newCiType, newCiName, direction) {
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
			//evtl. alle hidden Felder Werte löschen vor dem zurückgeben
			
			return this.exportForm;
		},
		
		getDateFormat: function(language) {
			if(!language)
				language = this.getLanguage();
				
			switch(language) {
				case 'DE':
				case 'de':
					return this.DATE_FORMAT_DE;
				default:
					return this.DATE_FORMAT_EN;
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
			//nötig/besser?
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
		
		
		setLastLogon: function(lastLogon) {
			this.lastLogon = lastLogon;
		},
		
		getLastLogon: function() {
			return this.lastLogon;
		},

		getLanguage: function() {
			return this.language;
		},
		
		getToken: function() {
			return this.token;
		},
		
		getCiId: function() {
			return this.ciId;
		},
		
		setCiId: function(ciId) {
			this.ciId = ciId;
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
			window.location = '../logoutAction.jsp?cwid='+this.getCwid()+'&token='+this.getToken();
		},
		
		restoreUiState: function(airViewport) {
			var airCookie = Ext.state.Manager.get('airCookie');
			
			if(airCookie.ciId)
				this.setCiId(airCookie.ciId);
				
			if(airCookie.navigation)
				airViewport.fireEvent('externalNavigation', airViewport, null, airCookie.navigation);
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
						event.keyCode = 0;//WHY IS THIS NECESSARY ??
					} 
					return false;
				
				case 8: //backspace
					var tagName = Ext.isIE ? event.srcElement.tagName : event.target.tagName;
					
		            if(tagName == 'BODY' || tagName == 'HTML' || tagName == 'DIV') {//event.originalTarget.id.indexOf('tf') == -1
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
		}
	};
}();

//AAM = AIR.AirApplicationManager;
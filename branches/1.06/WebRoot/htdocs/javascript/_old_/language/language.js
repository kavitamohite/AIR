//function setFieldLabel(comp, label) {
//	
//	if (Ext.getCmp(comp)!==undefined) {
//		label = label + (Ext.getCmp(comp).labelSeparator===undefined?'':Ext.getCmp(comp).labelSeparator);
//		Ext.getCmp(comp).el.up('.x-form-item', 10, true).child('.x-form-item-label').update(label);
//	}
//}
//
//function setBoxLabel(comp, label) {
//	if (Ext.getCmp(comp)!==undefined) {
//		Ext.getCmp(comp).el.dom.nextSibling.childNodes[0].nodeValue = label;
//	}
//}

//var languagestore = new Ext.data.XmlStore({
//    // store configs
//    autoLoad: false,
//    storeId: 'languageStore',
//    url: 'lang/german.xml', // automatically configures a HttpProxy
//    // reader configs
//    record: 'Items', // records will have an "Item" tag
//    fields: [
//        // set up the fields mapping into the xml doc
//        {name: 'general_yes'},
//        {name: 'general_no'},
//        
//        {name: 'dynamicWindowOKButtonText'},
//        
//        {name: 'label_menu_loggedinas'},
//        {name: 'label_menu_myplacemenuitem'},
//        {name: 'label_menu_myplacemycismenuitem'},
//        {name: 'label_menu_myplacemycissubsmenuitem'},
//        
//        {name: 'label_menu_searchmenuitem'},
//        {name: 'label_menu_advancedsearchmenuitem'},
//
//        {name: 'label_menu_createmenuitem'},
//        {name: 'label_menu_wizardmenuitem'},
//        {name: 'label_menu_copyfrommenuitem'},
//        {name: 'label_menu_delete'},
//        
//        {name: 'label_menu_detailsdetails'},
//        {name: 'label_menu_detailsspecific'},
//        {name: 'label_menu_detailscontacts'},
//        {name: 'label_menu_detailsagreements'},
//        {name: 'label_menu_detailscompliance'},
//        {name: 'label_menu_detailsprotection'},
//        {name: 'label_menu_detailslicense'},
//        {name: 'label_menu_detailsconnections'},
//        {name: 'label_menu_detailssupportstuff'},
//        {name: 'label_menu_detailshistory'},
//
//		// myPlace
//        {name: 'label_myplace_user'},
//        {name: 'label_myplace_cwid'},
//        {name: 'label_myplace_roleperson'},
//        
//        // user options
//        {name: 'label_myplace_useroption'},
//        {name: 'label_useroptions_currency'},
//        {name: 'label_useroptions_language'},
//        {name: 'label_useroptions_numberformat'},
//        {name: 'label_useroptions_help'},
//        {name: 'label_useroptions_createwizard'},
//        {name: 'label_useroptions_disableTooltip'},
//        
//        //validation Messages
//        {name: 'editDataNotValid'},
//        
//        //applicationEditor
//        {name: 'header_applicationIsDraft'},
//        {name: 'header_applicationIsIncomplete'},
//        
//		// details
//        {name: 'detailsPanelTitle'},
//        {name: 'label_details_alias'},
//        {name: 'label_details_category_business'},
//        {name: 'label_details_category'},
//        {name: 'label_details_ciOwner'},
//        {name: 'label_details_applicationOwner'},
//        {name: 'label_details_sla'},
//        {name: 'label_details_businessessential'},
//        {name: 'label_details_insertdata'},
//        {name: 'label_details_updatedata'},
//        
//        // specific
//        {name: 'specificsPanelTitle'},
//        {name: 'applicationName'},
//        {name: 'applicationAlias'},
//        {name: 'applicationVersion'},
//        {name: 'applicationCat2'},
//        {name: 'lifecycleStatus'},
//        {name: 'operationalStatus'},
//        {name: 'comments'},
//        
//        {name: 'specificsCategory'},
//        {name: 'applicationBusinessCat'},
//        {name: 'dataClass'},
//        {name: 'applicationCat2'},
//        {name: 'businessProcess'},
//
//        // contacts
//        {name: 'contactsPanelTitle'},
//        {name: 'contactsCIOwner'},
//        {name: 'contactsCIOwnerApplication'}, // for applications only
//        {name: 'ciResposnible'},
//        {name: 'ciSubResposnible'},
//        {name: 'contactsApplicationOwner'},
//        {name: 'applicationOwner'},        
//        {name: 'applicationOwnerDelegate'},
//        {name: 'contactsGPSC'},
//        {name: 'gpsccontactResponsibleAtCustomerSide'},
//        {name: 'gpsccontactSupportGroup'},
//        {name: 'gpsccontactChangeTeam'},
//        {name: 'gpsccontactServiceCoordinator'},
//        {name: 'gpsccontactEscalation'},
//        {name: 'gpsccontactCiOwner'},
//        {name: 'gpsccontactOwningBusinessGroup'},
//        {name: 'gpsccontactImplementationTeam'},
//        {name: 'gpsccontactServiceCoordinatorIndiv'},
//        {name: 'gpsccontactEscalationIndiv'},
//        {name: 'gpsccontactSystemResponsible'},
//        {name: 'gpsccontactImpactedBusiness'},
//        {name: 'gpsccontactBusinessOwnerRepresentative'},
//
//        // agreements
//        {name: 'agreementsPanelTitle'},
//        {name: 'sla'},
//        {name: 'priorityLevel'},
//        {name: 'serviceContract'},
//        {name: 'severityLevel'},
//        {name: 'businessEssential'},
//        
//        // protection
//		{name: 'protectionPanelTitle'},
//		{name: 'itSecSbAvailabilityId'},
//		{name: 'itSecSbAvailabilityDescription'},
//		{name: 'protectionClassInformation'},
//		{name: 'protectionClassInformationExplanation'},
//		{name: 'protectionApplicationProtection'},
//		
//        
//		// compliance
//		{name: 'compliancePanelTitle'},
//		{name: 'complianceBYTSEC'},
//		{name: 'complianceNonBYTSEC'},
//		{name: 'complianceUndefined'},
//		{name: 'complianceManagementText'},
//		{name: 'complianceInfoText'},
//		
//		{name: 'complianceprocedures'},
//		{name: 'isTemplate'},
//		{name: 'compliancerelevance'},
//		{name: 'compliancecontrols'},
//		{name: 'itsetName'},
//        {name: 'relevanceGR1920'},
//        {name: 'relevanceGR1435'},
//        {name: 'relevanceGR1775'},
//        {name: 'relevanceGR2008'},
//        {name: 'relevanceEditButton'},
//        {name: 'relevance1435EditButton'},
//        {name: 'relevanceEditMsg'},
//        {name: 'gxpFlag'},
//        {name: 'riskAnalysisYN'},
//        {name: 'itsecGroup'},
//        {name: 'referencedTemplate'},
//
//		// license			
//		{name: 'licensePanelTitle'},
//		{name: 'licenselicense'},
//		{name: 'licensecosts'},
//		{name: 'licenseType'},
//		{name: 'applicationAccessingUserCount'},
//		{name: 'version'},
//		{name: 'costRunPa'},
//		{name: 'costChangePa'},
//		{name: 'currency'},
//        {name: 'runAccount'},
//        {name: 'changeAccount'},
//        {name: 'usingRegions'},
//
//        // support stuff
//        {name: 'supportStuffPanelTitle'},
//        {name: 'supportStuffApplication'},
//        {name: 'supportStuffUserAuthorisation'},
//        {name: 'supportStuffChangeManagement'},
//        {name: 'supportStuffUserManagement'},
//        {name: 'supportstuffUASupportingDoc'},
//        {name: 'supportstuffUAProcess'},
//        {name: 'supportstuffCMSupportingTool'},
//        {name: 'supportstuffUMProcess'},
//        {name: 'supportstuffAppDoc'},
//        {name: 'supportstuffAppRootDir'},
//        {name: 'supportstuffAppDataDir'},
//        {name: 'supportstuffAppProvidedServices'},
//        {name: 'supportstuffAppProvidedMUser'},
//        
//        // history
//        {name: 'historyPanelTitle'},
//        {name: 'historyDatetime'},
//        {name: 'historyChangeSource'},
//        {name: 'historyChangeDBUser'},
//        {name: 'historyChangeUserCWID'},
//        {name: 'historyChangeAttributeName'},
//        {name: 'historyChangeAttributeNewValue'},
//        {name: 'historyChangeAttributeOldValue'},
//
//
//        // buttons        
//        {name: 'button_general_save'},
//        {name: 'button_general_back'},
//        {name: 'button_general_cancel'},
//        {name: 'button_general_search'},
//        {name: 'button_general_next'},
//        {name: 'button_general_copy'},
//        
//        // general
//        {name: 'gerneral_message_loading'},
//        {name: 'gerneral_message_saving'},
//        
//        // special
//        {name: 'searchfield'},
//        {name: 'searchpanelheader'},
//        {name: 'advancedsearchpanelheader'},
//        {name: 'advancedsearchlink'},
//        {name: 'advancedsearchpluslink'},
//        {name: 'advancedsearchminuslink'},
//        
//        // search
//        {name: 'advsearchPanelTitle'},
//        {name: 'advsearchObjectType'},
//        {name: 'advsearchdescription'},
//        
//        {name: 'advsearchowner'},
//        {name: 'advsearchappowner'},
//        {name: 'advsearchappownerdelegate'},
//        {name: 'advsearchciowner'},
//        {name: 'advsearchcidelegate'},
//        
//        {name: 'advsearchplusfieldset'},
//        
//        {name: 'rbgQueryModeContains'},
//        {name: 'rbgQueryModeBeginsWith'},
//        {name: 'rbgQueryModeExact'},
//        
//        // search result
//        {name: 'searchResultPanelTitle'},
//        {name: 'searchResultName'},
//        {name: 'searchResultAlias'},
//        {name: 'searchResultType'},
//        {name: 'searchResultCategory'},
//        {name: 'searchResultResponsible'},
//        {name: 'searchResultSubResponsible'},
//        {name: 'searchResultAppOwner'},
//        {name: 'searchResultAppOwnerDelegate'},
//        
//        // wizard
//        {name: 'createpanelheader'},
//        {name: 'createstartbutton'},
//        {name: 'createbackbutton'},
//        {name: 'createcancelbutton'},
//        {name: 'createnextbutton'},
//        {name: 'createfinishbutton'},
//        {name: 'wizardStepZeroPanelTitle'},
//        {name: 'createIntroText'},
//        {name: 'wizardcbskip'},
//        
//        {name: 'wizardStepOnePanelTitle'},
//        {name: 'wizardobjectType'},
//        {name: 'wizardapplicationName'},
//        {name: 'wizardapplicationNameSAP'},
//        {name: 'wizardapplicationNameSAP1'},
//        {name: 'wizardapplicationNameSAP2'},
//        {name: 'wizardapplicationNameSAP3'},
//        {name: 'wizardapplicationAlias'},
//        {name: 'wizardcomments'},
//        {name: 'wizardRelevance'},
//        {name: 'labelwizardrelevanceGR1920'},
//        {name: 'labelwizardrelevanceGR1435'},
//        {name: 'labelwizardrelevanceGR1775'},
//        {name: 'labelwizardrelevanceGR2008'},
//        {name: 'labelwizardrelevanceGxp'},
//        {name: 'wizardisTemplate'},
//        
//        {name: 'wizardStepTwoPanelTitle'},
//        {name: 'wizardBasics'},
//        {name: 'wizardlifecycleStatus'},
//        {name: 'wizardoperationalStatus'},
//        {name: 'wizardapplicationCat2'},wizardapplicationBusinessCat?
//        {name: 'wizardAgreements'},
//        {name: 'wizardsla'},
//        {name: 'wizardserviceContract'},
//        {name: 'wizardseverityLevel'},
//        {name: 'wizardbusinessEssential'},
//        
//        {name: 'wizardStepThreePanelTitle'},
//        {name: 'wizardAppowner'},
//        {name: 'labelwizardapplicationOwner'},
//        {name: 'labelwizardapplicationOwnerDelegate'},
//        {name: 'wizardCiowner'},
//        {name: 'wizardCiownerApplication'},
//        {name: 'labelwizardciResponsible'},
//        {name: 'labelwizardciSubResponsible'},
//        
//        {name: 'wizardallowedNameText'},
//        {name: 'wizardallowedAliasText'},
//        {name: 'wizardRequiredField'},
//        
//        {name: 'wizardDataNotValid'},
//        {name: 'wizardCancelQuestion'},
//        {name: 'wizardCancelTitle'},
//        {name: 'wizardSaveSuccessTitle'},
//        {name: 'wizardSaveSuccess'},
//        {name: 'wizardSaveFailTitle'},
//        {name: 'wizardSaveFail'},
//        
//        {name: 'dynamicWindowDataChangedTitle'},
//        {name: 'dynamicWindowDataChangedText'},
//        {name: 'dynamicWindowDataChangedSaveButtonText'},
//        {name: 'dynamicWindowDataChangedSaveButtonDiscard'},
//        {name: 'dynamicWindowDataChangedSaveButtonBack'},
//
//        {name: 'dynamicWindowDataSavedTitle'},
//        {name: 'dynamicWindowDataSavedText'},
//        {name: 'dynamicWindowDataSavedOKButtonText'},
//        {name: 'dynamicWindowDataSaveFailTitle'},
//
//        {name: 'dynamicWindowDataSavedErrorTitle'},
//        {name: 'dynamicWindowDataSavedErrorOKButtonText'},
//        
//        {name: 'dynamicWindowCiTypeNotSupportedWarningTitle'},
//        {name: 'dynamicWindowCiTypeNotSupportedWarningText'},
//        {name: 'dynamicWindowCiTypeNotSupportedWarningOKButtonText'},
//        
//        {name: 'dynamicWindowCancelConfirmationTitle'},
//        {name: 'dynamicWindowCancelConfirmationText'},
//        {name: 'dynamicWindowCancelConfirmationButtonOKText'},
//        {name: 'dynamicWindowCancelConfirmationButtonNOText'},
//        
//        {name: 'dynamicWindowAfterAppSaveContinueEditingButtonText'},
//        {name: 'dynamicWindowAfterAppSaveNewCiButtonText'},
//        {name: 'dynamicWindowAfterAppSaveBackToSearchButtonText'},
//        
//        {name: 'dynamicWindowNonBYTsecTitle'},
//        {name: 'dynamicWindowNonBYTsecText'},
//        
//        {name: 'dynamicWindowConfirmDeleteTitle'},
//        {name: 'dynamicWindowConfirmDeleteText'},
//        
//        
//        {name: 'ciCopyFromViewTitle'},
//        {name: 'ciCopyFromDetailViewHeaderLabel'},
//        {name: 'ciCopyFromDetailViewTitle'},
//        
//        {name: 'createstartpagewizardtext'},
//        {name: 'createstartpagewizardbutton'},
//        {name: 'createstartpagecopyfromtext'},
//        {name: 'createstartpagecopyfrombutton'},
//
//        
//        {name: 'compliance1435WindowTitle'},
//        {name: 'compliance1435WindowItSet'},
//        {name: 'compliance1435WindowUseAsTemplate'},
//        {name: 'compliance1435WindowLink'},
//        {name: 'compliance1435WindowItSecGroup'},
//        
//        {name: 'complianceWindowTitle'},
//        {name: 'complianceWindowControls'},
//        {name: 'complianceWindowStatement'},
//        {name: 'complianceWindowStatementUntreated'},
//        {name: 'complianceWindowStatementDispensable'},
//        {name: 'complianceWindowCompliant'},
//        {name: 'complianceWindowJustification'},
//        {name: 'complianceStatementInfo'},
//        
//        
//        {name: 'CiConnectionsViewTitle'},
//        {name: 'CiConnectionsViewUpStreamConnections'},
//        {name: 'CiConnectionsViewDownStreamConnections'},
//        {name: 'CiConnectionsViewEditConnections'},
//        {name: 'CiConnectionsViewObjectType'},
//        {name: 'CiConnectionsViewQuickSearch'},
//        {name: 'CiConnectionsViewSearch'},
//        
//        {name: 'CiConnectionsViewMsgSuccessfullyAdded'},
//        {name: 'CiConnectionsViewMsgSuccessfullyDeleted'},
//        {name: 'CiConnectionsViewMsgAlreadyExists'},
//        {name: 'CiConnectionsViewMsgNotAllowed'},
//        
//        {name: 'dynamicWindowFForIETitle'},
//        {name: 'dynamicWindowFForIEText'},
//        {name: 'dynamicWindowFForIEContinueFFButtonText'},
//        {name: 'dynamicWindowFForIEKeepIEButtonText'},
//
//        {name: 'CiDeleteViewTitle'},
//        {name: 'CiDeleteViewButtonDelete'}
//    ],
//    isLoaded: false,
//    listeners: {
//		beforeload: function(store, options) {
//			if (null != urlLanguage) {
//				languagestore.proxy.api.read.url = urlLanguage;
//			}
//		},
//		load: function(store, records, options) {
//        	//Menu elements
//			Ext.get("label_menu_loggedinas").dom.innerHTML = records[0].data['label_menu_loggedinas'];
//			// MyPlace
//        	/*Ext.get("languageMyplacemenuitem").dom.innerHTML = records[0].data['label_menu_myplacemenuitem'];
//        	Ext.get("languageMyplacemycismenuitem").dom.innerHTML = records[0].data['label_menu_myplacemycismenuitem'];
//        	Ext.get("languageMyplacemycissubsmenuitem").dom.innerHTML = records[0].data['label_menu_myplacemycissubsmenuitem'];
//        	// Search
//        	Ext.get("languageSearchmenuitem").dom.innerHTML = records[0].data['label_menu_searchmenuitem'];
//        	Ext.get("languageAdvancedsearchmenuitem").dom.innerHTML = records[0].data['label_menu_advancedsearchmenuitem'];
//        	// New
//        	Ext.get("languageCreateceheader").dom.innerHTML = records[0].data['label_menu_createmenuitem'];
//        	// Details
//        	Ext.get("languageDetailsheader").dom.innerHTML = records[0].data['label_menu_detailsdetails'];
//            Ext.get("languageDetailsspecific").dom.innerHTML = records[0].data['label_menu_detailsspecific'];
//            Ext.get("languageDetailsagreements").dom.innerHTML = records[0].data['label_menu_detailsagreements'];
//            Ext.get("languageDetailscompliance").dom.innerHTML = records[0].data['label_menu_detailscompliance'];
//            Ext.get("languageDetailslicense").dom.innerHTML = records[0].data['label_menu_detailslicense'];
//            Ext.get("languageDetailsconnections").dom.innerHTML = records[0].data['label_menu_detailsconnections'];
//            Ext.get("languageDetailssupportstuff").dom.innerHTML = records[0].data['label_menu_detailssupportstuff'];
//            Ext.get("languageDetailshistory").dom.innerHTML = records[0].data['label_menu_detailshistory'];
//
//			// MyPlace - Header
//        	Ext.get("myplacepanelheader").dom.innerHTML = records[0].data['label_menu_myplacemenuitem'];*/
//			
//			var ciNavigationView = Ext.getCmp('workBar');
//			ciNavigationView.updateLabels(records[0].data);
//			
//			var myPlaceHomeView = Ext.getCmp('myplaceHomePanel');
//			myPlaceHomeView.updateLabels(records[0].data);
//			
//			var myPlaceView = Ext.getCmp('myplacePanel');
//			myPlaceView.updateLabels(records[0].data);
//			
//			var ciEditView = Ext.getCmp('editPanel');
//			ciEditView.updateLabels(records[0].data);
//			
//			var ciDeleteView = Ext.getCmp('CiDeleteView');
//			ciDeleteView.updateLabels(records[0].data);
//			
//			
//			
////			var ciNavigationView = airMainPanel.getComponent('westpanel').getComponent('workBar');
////			var clSearch = ciNavigationView.getComponent('searchmenuitem');
////			clSearch.fireEvent('click', clSearch);
//			
//			
//
//			setFieldLabel('myplaceuser', records[0].data['label_myplace_user']);
//			setFieldLabel('myplacecwid', records[0].data['label_myplace_cwid']);
//			setFieldLabel('myplaceroleperson', records[0].data['label_myplace_roleperson']);
//        	
//			// user options
//        	Ext.getCmp('useroptions').setTitle(records[0].data['label_myplace_useroption']);
//        	setFieldLabel('useroptionLanguage', records[0].data['label_useroptions_language']);
//        	setFieldLabel('useroptionHelp', records[0].data['label_useroptions_help']);
//        	setFieldLabel('useroptionSkipWizardMessage', records[0].data['label_useroptions_createwizard']);
//        	setFieldLabel('useroptionCurrency', records[0].data['label_useroptions_currency']);
//        	setFieldLabel('useroptionNumberFormat', records[0].data['label_useroptions_numberformat']);
//        	setFieldLabel('useroptionDisableTooltip', records[0].data['label_useroptions_disableTooltip']);
//
//        	//appilcationEditor
//        	Ext.getCmp('editpaneldraft').el.dom.innerHTML = records[0].data['header_applicationIsDraft'].replace('##', draftFlag);
//        	Ext.getCmp('editpanelmessage').el.dom.innerHTML = records[0].data['header_applicationIsIncomplete'].replace('##', incompleteFieldList);
//        	
//            // details
//            Ext.getCmp('detailsPanel').setTitle(records[0].data['detailsPanelTitle']);
//
//        	setFieldLabel('detailsApplicationAlias', records[0].data['label_details_alias']);
//			setFieldLabel('detailsApplicationBusinessCat', records[0].data['label_details_category_business']);
//        	setFieldLabel('detailsApplicationCat2', records[0].data['label_details_category']);
//            setFieldLabel('detailsCiOwner', records[0].data['label_details_ciOwner']);
//            setFieldLabel('detailsApplicationOwner', records[0].data['label_details_applicationOwner']);
//            setFieldLabel('detailsSlaName', records[0].data['label_details_sla']);
//            setFieldLabel('detailsBusinessEssential', records[0].data['label_details_businessessential']);
//            setFieldLabel('detailsInsertdata', records[0].data['label_details_insertdata']);
//            setFieldLabel('detailsUpdatedata', records[0].data['label_details_updatedata']);
//            
//            // specifics
//            Ext.getCmp('specificsPanel').setTitle(records[0].data['specificsPanelTitle']);
//            setFieldLabel('applicationName', records[0].data['applicationName']);
//            setFieldLabel('applicationAlias', records[0].data['applicationAlias']);
//            setFieldLabel('applicationVersion', records[0].data['applicationVersion']);
//            setFieldLabel('lifecycleStatus', records[0].data['lifecycleStatus']);
//			setFieldLabel('operationalStatus', records[0].data['operationalStatus']);
//			setFieldLabel('comments', records[0].data['comments']);
//			
//			Ext.getCmp('specificsCategory').setTitle(records[0].data['specificsCategory']);
//			setFieldLabel('cbApplicationBusinessCat', records[0].data['applicationBusinessCat']);
// 			setFieldLabel('cbDataClass', records[0].data['dataClass']);
// 			
// 			
//			setFieldLabel('applicationCat2', records[0].data['applicationCat2']);
//			Ext.getCmp('labelbusinessProcess').el.dom.innerHTML = records[0].data['businessProcess'];
//			
//			// contacts
//			Ext.getCmp('contactsPanel').setTitle(records[0].data['contactsPanelTitle']);
//			Ext.getCmp('contactsCIOwner').setTitle(records[0].data['contactsCIOwner']);
//			Ext.getCmp('labelciResponsible').el.dom.innerHTML = records[0].data['ciResposnible'];
//			Ext.getCmp('labelciSubResponsible').el.dom.innerHTML = records[0].data['ciSubResposnible'];
//			
//			Ext.getCmp('contactsApplicationOwner').setTitle(records[0].data['contactsApplicationOwner']);
//			Ext.getCmp('labelapplicationOwner').el.dom.innerHTML = records[0].data['applicationOwner'];
//			Ext.getCmp('labelapplicationOwnerDelegate').el.dom.innerHTML = records[0].data['applicationOwnerDelegate'];
//			
//			Ext.getCmp('contactsGPSC').setTitle(records[0].data['contactsGPSC']);
//			Ext.getCmp('labelgpsccontactResponsibleAtCustomerSide').el.dom.innerHTML = records[0].data['gpsccontactResponsibleAtCustomerSide'];
//			Ext.getCmp('labelgpsccontactCiOwner').el.dom.innerHTML = records[0].data['gpsccontactCiOwner'];
//			Ext.getCmp('labelgpsccontactSystemResponsible').el.dom.innerHTML = records[0].data['gpsccontactSystemResponsible'];
//			Ext.getCmp('labelgpsccontactSupportGroup').el.dom.innerHTML = records[0].data['gpsccontactSupportGroup'];
//			Ext.getCmp('labelgpsccontactChangeTeam').el.dom.innerHTML = records[0].data['gpsccontactChangeTeam'];
//			Ext.getCmp('labelgpsccontactServiceCoordinator').el.dom.innerHTML = records[0].data['gpsccontactServiceCoordinator'];
//			Ext.getCmp('labelgpsccontactServiceCoordinatorIndiv').el.dom.innerHTML = records[0].data['gpsccontactServiceCoordinatorIndiv'];
//			Ext.getCmp('labelgpsccontactImplementationTeam').el.dom.innerHTML = records[0].data['gpsccontactImplementationTeam'];
//			Ext.getCmp('labelgpsccontactEscalation').el.dom.innerHTML = records[0].data['gpsccontactEscalation'];
//			Ext.getCmp('labelgpsccontactEscalationIndiv').el.dom.innerHTML = records[0].data['gpsccontactEscalationIndiv'];
//			Ext.getCmp('labelgpsccontactImpactedBusiness').el.dom.innerHTML = records[0].data['gpsccontactImpactedBusiness'];
//			Ext.getCmp('labelgpsccontactOwningBusinessGroup').el.dom.innerHTML = records[0].data['gpsccontactOwningBusinessGroup'];
//			Ext.getCmp('labelgpsccontactBusinessOwnerRepresentative').el.dom.innerHTML = records[0].data['gpsccontactBusinessOwnerRepresentative'];
//			
//			// agreements
//			Ext.getCmp('agreementsPanel').setTitle(records[0].data['agreementsPanelTitle']);
//			setFieldLabel('sla', records[0].data['sla']);
//			setFieldLabel('priorityLevel', records[0].data['priorityLevel']);
//			setFieldLabel('serviceContract', records[0].data['serviceContract']);
//			setFieldLabel('severityLevel', records[0].data['severityLevel']);
//			setFieldLabel('businessEssential', records[0].data['businessEssential']);
//
//			// protection
//			Ext.getCmp('protectionPanel').setTitle(records[0].data['protectionPanelTitle']);
//			setFieldLabel('protectionAvailability', records[0].data['itSecSbAvailabilityId']);
//			setFieldLabel('protectionAvailabilityDescription', records[0].data['itSecSbAvailabilityDescription']);
//			
//			setFieldLabel('protectionClassInformation', records[0].data['protectionClassInformation']);
//			setFieldLabel('protectionClassInformationExplanation', records[0].data['protectionClassInformationExplanation']);
//			setFieldLabel('protectionApplicationProtection', records[0].data['protectionApplicationProtection']);
//			
//			// compliance
//			Ext.getCmp('compliancePanel').setTitle(records[0].data['compliancePanelTitle']);
//			setBoxLabel('rgitBYTSEC', records[0].data['complianceBYTSEC']);
//			setBoxLabel('rgitNonBYTSEC', records[0].data['complianceNonBYTSEC']);			
//			setBoxLabel('rgitUndefined', records[0].data['complianceUndefined']);
//			
//			Ext.get('complianceManagementText').dom.innerHTML  = records[0].data['complianceManagementText'];
//			Ext.getCmp('lComplianceInfo').setText(records[0].data['complianceInfoText']);
//
//			
//			/*Ext.getCmp('fsComplianceRelevance').setTitle(records[0].data['compliancerelevance']);
//			setBoxLabel('relevanceGR1435', records[0].data['relevanceGR1435']);
//			setBoxLabel('relevanceGR1775', records[0].data['relevanceGR1775']);
//			setBoxLabel('relevanceGR1920', records[0].data['relevanceGR1920']);
//			setBoxLabel('relevanceGR2008', records[0].data['relevanceGR2008']);
//			Ext.getCmp('bRelevanceGR1435').setText(records[0].data['relevance1435EditButton']);
//			Ext.getCmp('bRelevanceGR1775').setText(records[0].data['relevanceEditButton']);
//			Ext.getCmp('bRelevanceGR1920').setText(records[0].data['relevanceEditButton']);
//			Ext.getCmp('bRelevanceGR2008').setText(records[0].data['relevanceEditButton']);
//			Ext.getCmp('msgrelevanceGR1435').setText(records[0].data['relevanceEditMsg']);
//			Ext.getCmp('msgrelevanceGR1775').setText(records[0].data['relevanceEditMsg']);
//			Ext.getCmp('msgrelevanceGR1920').setText(records[0].data['relevanceEditMsg']);
//			Ext.getCmp('msgrelevanceGR2008').setText(records[0].data['relevanceEditMsg']);
//			
//			Ext.getCmp('complianceprocedures').setTitle(records[0].data['complianceprocedures']);
//			//Ext.getCmp('compliancerelevance').setTitle(records[0].data['compliancerelevance']);
//			//Ext.getCmp('compliancecontrols').setTitle(records[0].data['compliancecontrols']);
//
//			setFieldLabel('itsetName', records[0].data['itsetName']);
//			setFieldLabel('isTemplate', records[0].data['isTemplate']);
//			setFieldLabel('referencedTemplate', records[0].data['referencedTemplate']);
//			setFieldLabel('itsecGroup', records[0].data['itsecGroup']);
//
////			
////			Ext.get('labelrelevanceGR1920').dom.innerHTML = records[0].data['relevanceGR1920'];
////			Ext.get('labelrelevanceGR1435').dom.innerHTML = records[0].data['relevanceGR1435'];
////			Ext.get('labelrelevanceGxp').dom.innerHTML = records[0].data['gxpFlag'];
////			Ext.get('labelrelevanceRiskAnalysis').dom.innerHTML = records[0].data['riskAnalysisYN'];*/
////			
//
//			// license
//			Ext.getCmp('licensePanel').setTitle(records[0].data['licensePanelTitle']);
//			Ext.getCmp('licenselicense').setTitle(records[0].data['licenselicense']);
//			Ext.getCmp('licensecosts').setTitle(records[0].data['licensecosts']);
//			setFieldLabel('licenseType', records[0].data['licenseType']);
//			setFieldLabel('applicationAccessingUserCount', records[0].data['applicationAccessingUserCount']);
//			setFieldLabel('costRunPa', records[0].data['costRunPa']);
//			setFieldLabel('costChangePa', records[0].data['costChangePa']);
//			setFieldLabel('currency', records[0].data['currency']);
//			setFieldLabel('runAccount', records[0].data['runAccount']);
//			setFieldLabel('changeAccount', records[0].data['changeAccount']);
//			Ext.getCmp('licenseusingregions').setTitle(records[0].data['usingRegions']);
//			
//			// support stuff
//			Ext.getCmp('supportStuffPanel').setTitle(records[0].data['supportStuffPanelTitle']);
//			Ext.getCmp('supportStuffApplication').setTitle(records[0].data['supportStuffApplication']);
//			//Ext.getCmp('supportStuffUserAuthorisation').setTitle(records[0].data['supportStuffUserAuthorisation']);
////			Ext.getCmp('supportStuffChangeManagement').setTitle(records[0].data['supportStuffChangeManagement']);
//			//Ext.getCmp('supportStuffUserManagement').setTitle(records[0].data['supportStuffUserManagement']);
//
//			//Ext.get('labelsupportstuffUASupportingDoc').dom.innerHTML = records[0].data['supportstuffUASupportingDoc'];
//			//Ext.get('labelsupportstuffUAProcess').dom.innerHTML = records[0].data['supportstuffUAProcess'];
////			Ext.get('labelsupportstuffCMSupportingTool').dom.innerHTML = records[0].data['supportstuffCMSupportingTool'];
//			//Ext.get('labelsupportstuffUMProcess').dom.innerHTML = records[0].data['supportstuffUMProcess'];
////			Ext.get('labelsupportstuffAppDoc').dom.innerHTML = records[0].data['supportstuffAppDoc'];
//
//
//			Ext.getCmp('labelsupportstuffAppDoc').setText(records[0].data['supportstuffAppDoc']);
//			setFieldLabel('supportstuffAppRootDir', records[0].data['supportstuffAppRootDir']);
//			setFieldLabel('supportstuffAppDataDir', records[0].data['supportstuffAppDataDir']);
//			setFieldLabel('supportstuffAppProvidedServices', records[0].data['supportstuffAppProvidedServices']);
//			setFieldLabel('supportstuffAppProvidedMUser', records[0].data['supportstuffAppProvidedMUser']);
//			
//	        // history
//			Ext.getCmp('historyPanel').setTitle(records[0].data['historyPanelTitle']);
//			Ext.getCmp('historyListView').getColumnModel().setColumnHeader(0, records[0].data['historyDatetime']);
//			Ext.getCmp('historyListView').getColumnModel().setColumnHeader(1, records[0].data['historyChangeSource']);
//			Ext.getCmp('historyListView').getColumnModel().setColumnHeader(2, records[0].data['historyChangeDBUser']);
//			Ext.getCmp('historyListView').getColumnModel().setColumnHeader(3, records[0].data['historyChangeUserCWID']);
//			Ext.getCmp('historyListView').getColumnModel().setColumnHeader(4, records[0].data['historyChangeAttributeName']);
//			Ext.getCmp('historyListView').getColumnModel().setColumnHeader(5, records[0].data['historyChangeAttributeOldValue']);
//			Ext.getCmp('historyListView').getColumnModel().setColumnHeader(6, records[0].data['historyChangeAttributeNewValue']);
//			
//			
//			
//			
//			// wizard
//			Ext.get('createpanelheader').dom.innerHTML = records[0].data['createpanelheader'];
//			
//			
//			//wizardStepZeroPanelTitle
//			/**/
////			var wizardStepZeroPanel = Ext.getCmp('wizardStepZeroPanelTitle');
////			wizardStepZeroPanel.updateLabels(records[0].data);
//			
//			/**/
//			Ext.getCmp('wizardStepZeroPanelTitle').setTitle(records[0].data['wizardStepZeroPanelTitle']);
//			
//			Ext.get('createIntroText').dom.innerHTML = records[0].data['createIntroText'];
////			var x = pageZero.getComponent('createIntroText');
////			x.el.dom.innerHTML = records[0].data['createIntroText'];
//			
//			setBoxLabel('wizardcbskip', records[0].data['wizardcbskip']);
//			//wizardStepZeroPanelTitle
//			
//			
//			
//			
//			//wizardStepOnePanelTitle
//			var wizardStepOnePanel = Ext.getCmp('wizardStepOnePanelTitle');
////			wizardStepOnePanel.updateLabels(records[0].data);
//			
//			/**/wizardStepOnePanel.setTitle(records[0].data['wizardStepOnePanelTitle']);
//			setFieldLabel('wizardobjectType', records[0].data['wizardobjectType']);
//			Ext.getCmp('wizardobjectType').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardapplicationName', records[0].data['wizardapplicationName']);
//			Ext.getCmp('wizardapplicationName').blankText = records[0].data['wizardRequiredField'];
//			// -- Reihenfolge wichtig
//			setFieldLabel('wizardapplicationNameSAP1', records[0].data['wizardapplicationNameSAP1']);
//			Ext.getCmp('wizardapplicationNameSAP1').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardapplicationNameSAP2', records[0].data['wizardapplicationNameSAP2']);
//			Ext.getCmp('wizardapplicationNameSAP2').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardapplicationNameSAP3', records[0].data['wizardapplicationNameSAP3']);
//			Ext.getCmp('wizardapplicationNameSAP3').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardapplicationNameSAP', records[0].data['wizardapplicationNameSAP']);
//			//--
//			setFieldLabel('wizardapplicationAlias', records[0].data['wizardapplicationAlias']);
//			Ext.getCmp('wizardapplicationName').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardcomments', records[0].data['wizardcomments']);
//			Ext.getCmp('wizardRelevance').setTitle(records[0].data['wizardRelevance']);
//			Ext.get('labelwizardrelevanceGR1920').dom.innerHTML = records[0].data['labelwizardrelevanceGR1920'];
//			Ext.get('labelwizardrelevanceGR1435').dom.innerHTML = records[0].data['labelwizardrelevanceGR1435'];
//			Ext.get('labelwizardrelevanceGR1775').dom.innerHTML = records[0].data['labelwizardrelevanceGR1775'];
//			Ext.get('labelwizardrelevanceGR2008').dom.innerHTML = records[0].data['labelwizardrelevanceGR2008'];
//			Ext.get('labelwizardrelevanceGxp').dom.innerHTML = records[0].data['labelwizardrelevanceGxp'];
//			setFieldLabel('wizardisTemplate', records[0].data['wizardisTemplate']);
//			
//			//wizardStepTwoPanelTitle
//			Ext.getCmp('wizardStepTwoPanelTitle').setTitle(records[0].data['wizardStepTwoPanelTitle']);
//			Ext.getCmp('wizardBasics').setTitle(records[0].data['wizardBasics']);
//			setFieldLabel('wizardlifecycleStatus', records[0].data['wizardlifecycleStatus']);
//			Ext.getCmp('wizardlifecycleStatus').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardoperationalStatus', records[0].data['wizardoperationalStatus']);
//			Ext.getCmp('wizardoperationalStatus').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardapplicationCat2', records[0].data['wizardapplicationCat2']);
//			Ext.getCmp('wizardapplicationCat2').blankText = records[0].data['wizardRequiredField'];
//	        Ext.getCmp('wizardAgreements').setTitle(records[0].data['wizardAgreements']);
//			setFieldLabel('wizardsla', records[0].data['wizardsla']);
//			Ext.getCmp('wizardsla').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardserviceContract', records[0].data['wizardserviceContract']);
//			Ext.getCmp('wizardserviceContract').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardseverityLevel', records[0].data['wizardseverityLevel']);
//			Ext.getCmp('wizardseverityLevel').blankText = records[0].data['wizardRequiredField'];
//			setFieldLabel('wizardbusinessEssential', records[0].data['wizardbusinessEssential']);
//			Ext.getCmp('wizardbusinessEssential').blankText = records[0].data['wizardRequiredField'];
//			
//			
//			Ext.getCmp('wizardStepThreePanelTitle').setTitle(records[0].data['wizardStepThreePanelTitle']);
//			Ext.getCmp('wizardAppowner').setTitle(records[0].data['wizardAppowner']);
//			Ext.get('labelwizardapplicationOwner').dom.innerHTML = records[0].data['labelwizardapplicationOwner'];
//			Ext.get('labelwizardapplicationOwnerDelegate').dom.innerHTML = records[0].data['labelwizardapplicationOwnerDelegate'];
//	        Ext.getCmp('wizardCiowner').setTitle(records[0].data['wizardCiowner']);
//			Ext.get('labelwizardciResponsible').dom.innerHTML = records[0].data['labelwizardciResponsible'];
//			Ext.get('labelwizardciSubResponsible').dom.innerHTML = records[0].data['labelwizardciSubResponsible'];
//
//			Ext.form.VTypes.allowedNameText = records[0].data['wizardallowedNameText'];
//			Ext.form.VTypes.allowedAliasText = records[0].data['wizardallowedAliasText'];
//
//			Ext.getCmp('createstartbutton').setText(records[0].data['createstartbutton']);
//			Ext.getCmp('createbackbutton').setText(records[0].data['createbackbutton']);
//			Ext.getCmp('createcancelbutton').setText(records[0].data['createcancelbutton']);
//			Ext.getCmp('createnextbutton').setText(records[0].data['createnextbutton']);
//			Ext.getCmp('createfinishbutton').setText(records[0].data['createfinishbutton']);
//			// wizard
//			
//			
//			
//
//			// Buttons
//			Ext.getCmp('savebutton').setText(records[0].data['button_general_save']);
//			Ext.getCmp('cancelbutton').setText(records[0].data['button_general_cancel']);
//			Ext.getCmp('saveuseroptionbutton').setText(records[0].data['button_general_save']);
//			
//			
//			
//			// Searchpanel
//			Ext.getCmp('searchfield').emptyText = records[0].data['searchfield'];
//			Ext.getCmp('searchfield').setRawValue(records[0].data['searchfield']);
//			Ext.getCmp('searchfield').startValue = '';
//			Ext.get("searchpanelheader").dom.innerHTML  = records[0].data['searchpanelheader'];
//			if (selectedAdvancedSearchplus) {
//				Ext.get('advancedsearchlink').dom.innerHTML = records[0].data['advancedsearchpluslink'];
//			} else {
//				Ext.get('advancedsearchlink').dom.innerHTML = records[0].data['advancedsearchlink'];
//			}
//			
//			Ext.getCmp('advsearchpanel').setTitle(records[0].data['advsearchPanelTitle']);
//			
//			setFieldLabel('advsearchObjectType', records[0].data['advsearchObjectType']);
//			setFieldLabel('advsearchdescription', records[0].data['advsearchdescription']);
//	
//			setBoxLabel('rbgQueryModeContains', records[0].data['rbgQueryModeContains']);
//			setBoxLabel('rbgQueryModeBeginsWith', records[0].data['rbgQueryModeBeginsWith']);
//			setBoxLabel('rbgQueryModeExact', records[0].data['rbgQueryModeExact']);
//			
//			Ext.getCmp('advsearchowner').setTitle(records[0].data['advsearchowner']);
//			setFieldLabel('advsearchappowner', records[0].data['advsearchappowner']);
//			setFieldLabel('advsearchappownerdelegate', records[0].data['advsearchappownerdelegate']);
//			setFieldLabel('advsearchciowner', records[0].data['advsearchciowner']);
//			setFieldLabel('advsearchcidelegate', records[0].data['advsearchcidelegate']);
//
//			Ext.getCmp('advsearchplusfieldset').setTitle(records[0].data['advsearchplusfieldset']);
//
//			// search results / myPlace: my Own, my Delegates usw.
//			// Änderungen immer in den drei Blöcken durchführen!!!
//			Ext.getCmp('myOwnCisView').setTitle(records[0].data['searchResultPanelTitle']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(0, records[0].data['searchResultName']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(1, records[0].data['searchResultAlias']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(2, records[0].data['searchResultType']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(3, records[0].data['searchResultCategory']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(4, records[0].data['searchResultResponsible']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(5, records[0].data['searchResultSubResponsible']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(6, records[0].data['searchResultAppOwner']);
//			Ext.getCmp('myOwnCIsGrid').getColumnModel().setColumnHeader(7, records[0].data['searchResultAppOwnerDelegate']);
//			// ---
//			Ext.getCmp('myDelegateCisView').setTitle(records[0].data['searchResultPanelTitle']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(0, records[0].data['searchResultName']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(1, records[0].data['searchResultAlias']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(2, records[0].data['searchResultType']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(3, records[0].data['searchResultCategory']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(4, records[0].data['searchResultResponsible']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(5, records[0].data['searchResultSubResponsible']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(6, records[0].data['searchResultAppOwner']);
//			Ext.getCmp('myDelegateCIsGrid').getColumnModel().setColumnHeader(7, records[0].data['searchResultAppOwnerDelegate']);
//			// ---
//			Ext.getCmp('ciSearchResultView').setTitle(records[0].data['searchResultPanelTitle']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(0, records[0].data['searchResultName']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(1, records[0].data['searchResultAlias']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(2, records[0].data['searchResultType']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(3, records[0].data['searchResultCategory']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(4, records[0].data['searchResultResponsible']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(5, records[0].data['searchResultSubResponsible']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(6, records[0].data['searchResultAppOwner']);
//			Ext.getCmp('ciSearchGrid').getColumnModel().setColumnHeader(7, records[0].data['searchResultAppOwnerDelegate']);
//			// ---
//			
//
//			Ext.get('cicreateIntroTextWizard').dom.innerHTML = records[0].data['createstartpagewizardtext'];
//			Ext.getCmp('cicreateIntoWizardButton').setText(records[0].data['createstartpagewizardbutton']);
//			Ext.get('cicreateIntroTextCopyFrom').dom.innerHTML = records[0].data['createstartpagecopyfromtext'];
//			Ext.getCmp('cicreateIntoCopyFromButton').setText(records[0].data['createstartpagecopyfrombutton']);
//
//			//Copy From Labels
//			Ext.getCmp('CiCopyFromView').setTitle(records[0].data['ciCopyFromViewTitle']);
//			Ext.getCmp('CiCopyFromDetailView').setTitle(records[0].data['ciCopyFromDetailViewTitle']);
//			Ext.getCmp('bCopyFromSearch').setText(records[0].data['button_general_search']);
//			Ext.getCmp('bCopyFromNext').setText(records[0].data['button_general_next']);
//			
//			Ext.getCmp('lCopyFromCiTemplateHeaderText').setText(records[0].data['ciCopyFromDetailViewHeaderLabel']);
//			
//			Ext.getCmp('bCopyFromBack').setText(records[0].data['button_general_back']);
//			Ext.getCmp('bCopyFromCancel').setText(records[0].data['button_general_cancel']);
//			Ext.getCmp('bCopyFromCopy').setText(records[0].data['button_general_copy']);
//			
//			
//			var ciConnectionsView = Ext.getCmp('connectionsPanel');
//			ciConnectionsView.updateLabels(records[0].data);
//			
//			
//			//compliance1435Window
////			Ext.getCmp('tfItsetName').fieldLabel = records[0].data['compliance1435ItSet'];
////			Ext.getCmp('cbIsTemplate').fieldLabel = records[0].data['compliance1435UseAsTemplate'];
//			
//			// set the text labels
//			setCommonTextLabelDetails();
//			
//			// Sonderfunktionen
//			myLoadMask = new Ext.LoadMask(Ext.getBody(), {msg: records[0].data['gerneral_message_loading']});
//			mySaveMask = new Ext.LoadMask(Ext.getBody(), {msg: records[0].data['gerneral_message_saving']});
//			isLoaded = true;
//		}
//    }
//});


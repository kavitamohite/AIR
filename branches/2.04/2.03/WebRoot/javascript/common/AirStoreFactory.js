Ext.namespace('AIR');

AIR.AirStoreFactory = function() {
	return {
	
		//====================== initial stores ======================
		createGroupTypesListStore: function() {
			var groupTypesListRecord = Ext.data.Record.create([
				{name: 'groupTypeId'},
			    {name: 'groupTypeName'}, 
			    {name: 'individualContact'}, 
				{name: 'minContacts'},
			    {name: 'maxContacts'}, 
			    {name: 'visibleApplication'}, 
				{name: 'visibleItsystem'},
			    {name: 'visibleLocation'}
	        ]);
	
			var groupTypesListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'groupTypeId'
			}, groupTypesListRecord); 
	
			var groupTypesListStore = new Ext.data.XmlStore({
				autoDestroy: true,
	           	storeId: 'groupTypesListStore',
	           	autoLoad: false,
	           	
	       		proxy: new Ext.ux.soap.SoapProxy({
		       		url: webcontext + '/AIRToolsWSPort',
		       		loadMethod: 'getGroupTypesList',
		       		timeout: 120000,
		       		reader: groupTypesListReader
		       	}),
		       	
		       	fields: [ 
		       	   'groupTypeId',
		       	   'groupTypeName',
		       	   'individualContact',
		       		'minContacts',
		       		'maxContacts',
		       		'visibleApplication',
		       		'visibleItsystem',
		       		'visibleLocation'
		       	],
	
		       	reader: groupTypesListReader
	       });
			
			return groupTypesListStore;
		},
		
		
		createCurrencyListStore: function() {
			var currencyListStore = new Ext.data.ArrayStore(
			{
				storeId: 'currencyListStore',
				fields : ['id', 'text', 'symbol'],
				idIndex: 0,
				data : currencyData
			});
			
	        return currencyListStore;
		},
		
		
		createLicenseTypeListStore: function() {
			var licenseTypeListStore = new Ext.data.ArrayStore(
			{
				storeId: 'licenseTypeListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : licenseTypeData
			});
			
	        return licenseTypeListStore;
		},
		
		createAccountListStore: function() {
			var accountListStore = new Ext.data.ArrayStore(
			{
				storeId: 'accountListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : accountData
			});
			
	        return accountListStore;
		},
		
		createMassUpdateTypeStore: function(){
			var massupdateTypeData = [['1','Link a Template'],['2','Copy Attributes from a Template'],['3','Change Attributes']];
			var massupdateTypeStore = new Ext.data.ArrayStore(
					{
						storeId: 'massupdateTypeStore',
						fields : ['id', 'text'],
						idIndex: 0,
						data : massupdateTypeData
					});
			return massupdateTypeStore;
		},
	        
		createItSetListStore: function() {
			var itSetListStore = new Ext.data.ArrayStore(
			{
				storeId: 'itSetListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : itsetData
			});
			
	        return itSetListStore;
		},
		
		createItSecSBWerteListStore: function() {
			var itSecSBIntegrityListStore = new Ext.data.ArrayStore(
			{
				storeId: 'itSecSBIntegrityListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : itsecSBWerteData
			});
			
	        return itSecSBIntegrityListStore;
		},
		
		createItSecSBAvailabilityListStore: function() {
			var itSecSBAvailabilityListStore = new Ext.data.ArrayStore(
			{
				storeId: 'itSecSBAvailabilityListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : itsecSBWerteData
			});
	        return itSecSBAvailabilityListStore;
		},
		
		createItSecSBConfidentialityListStore: function() {
			var itSecSBConfidentialityListStore = new Ext.data.ArrayStore(
			{
				storeId: 'itSecSBConfidentialityListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : confidentialityData
			});
	        return itSecSBConfidentialityListStore;
		},
		
		createClassInformationListStore: function() {
			var classInformationListStore = new Ext.data.ArrayStore(
			{
				storeId: 'classInformationListStore',
				fields : ['id', 'text', 'classProtectionName'],
				idIndex: 0,
				data : classinformationData
			});
	        return classInformationListStore;
		},
		
		createSlaListStore: function() {
			var slaListStore = new Ext.data.ArrayStore(
			{
				storeId: 'slaListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : slaData
			});
	        return slaListStore;
		},
		
		createServiceContractListStore: function() {
			var serviceContractListStore = new Ext.data.ArrayStore(
			{
				storeId: 'serviceContractListStore',
				fields : ['id', 'text', 'slaId'],
				idIndex: 0,
				data : serviceContractData
			});
	        return serviceContractListStore;
		},
		
		createPriorityLevelListStore: function() {
			var priorityLevelListStore = new Ext.data.ArrayStore(
			{
				storeId: 'priorityLevelListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : priorityLevelData
			});
	        return priorityLevelListStore;
		},
		
		createSeverityLevelListStore: function() {
			var severityLevelListStore = new Ext.data.ArrayStore(
			{
				storeId: 'severityLevelListStore',
				fields : ['text', 'id'],
				idIndex: 1,
				data : severityLevelData
			});
			
			return severityLevelListStore;
		},
	
		createBusinessEssentialListStore: function() {
			var businessEssentialListStore = new Ext.data.ArrayStore(
			{
				storeId: 'businessEssentialListStore',
				fields : ['text', 'id'],
				idIndex: 1,
				data : beData
			});
			
	        return businessEssentialListStore;
		},
		
		createApplicationCat2ListStore: function() {
			var applicationCat2ListStore = new Ext.data.ArrayStore(
			{
				storeId: 'applicationCat2ListStore',
				fields : ['id', 'applicationCat1Id', 'text', 'guiSAPNameWizard'],
				idIndex: 0,
				data : applicationCat2Data
			});
			
	        return applicationCat2ListStore;
	
		},
		
		createLifecycleStatusListStore: function() {
			var lifecycleStatusListStore = new Ext.data.ArrayStore(
			{
				storeId: 'lifecycleStatusListStore',
				fields : ['id', 'lcSubStatusId', 'tableId', 'text'],
				idIndex: 0,
				data : lifecycleStatusData
			});
			
	        return lifecycleStatusListStore;
		},
		
		createOperationalStatusListStore: function() {
			var operationalStatusListStore = new Ext.data.ArrayStore(
			{
				storeId: 'operationalStatusListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : oprationalStatusData
			});
			
	        return operationalStatusListStore;
		},
		
		createCategoryBusinessListStore: function() {
			var categoryBusinessListStore = new Ext.data.ArrayStore(
			{
				storeId: 'categoryBusinessListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : categoryBusinessData
			});
			
	        return categoryBusinessListStore;
		},
		
		createDataClassListStore: function() {
			var dataClassListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'classDataId'},
	         	{name: 'text', mapping: 'classDataName'}
	        ]);
	
			var dataClassListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'id'
			}, dataClassListRecord); 
	
			var dataClassListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'dataClassListStore',
				autoLoad: false,
				
	     		proxy: new Ext.ux.soap.SoapProxy({
	         		url: webcontext +'/ApplicationToolsWSPort',
	         		loadMethod: 'getClassDataList',
	         		timeout: 120000,
	         		reader: dataClassListReader
	         	}),
	         	
	         	fields: [ 'id', 'text' ],
	
	         	reader: dataClassListReader
			});
	         
			return dataClassListStore;
		},
		
		createItsecUserOptionListStore: function() {
			var itsecUserOptionListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'itsecUserOptionId'},
	            {name: 'itsecUserOptionName', mapping: 'itsecUserOptionName'},
	            {name: 'itsecUserOptionValue', mapping: 'itsecUserOptionValue'}
	        ]);
	
			var itsecUserOptionListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, itsecUserOptionListRecord); 
	
			var itsecUserOptionListStore = new Ext.data.XmlStore({
				autoDestroy: false,
				storeId: 'itsecUserOptionListStore',
				autoLoad: false,
	           
	       		proxy: new Ext.ux.soap.SoapProxy({
	       			url: webcontext +'/AIRWSPort',
		       		loadMethod: 'getItsecUserOption',
		       		timeout: 120000,
		       		reader: itsecUserOptionListReader
		       	}),
		       
		       	reader: itsecUserOptionListReader
		       	
			});
			
			return itsecUserOptionListStore;
		},
		
		createUserOptionSaveStore: function() {
			var userOptionSaveRecord = Ext.data.Record.create([
	            {name: 'result'},
	            {name: 'displayMessage'},
	            {name: 'messages'}
	      	]);
	
			var userOptionSaveReader = new Ext.data.XmlReader({
				record: 'return'
			}, userOptionSaveRecord); 
	
			var userOptionSaveStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'userOptionSaveStore',
				autoLoad: false,
	          
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRWSPort',
		      		loadMethod: 'saveUserOption',
		      		timeout: 120000,
		      		reader: userOptionSaveReader
		      	}),
	      	
	      		fields: [ 'result', 'displayMessage', 'messages' ],
	      	         
	      		reader: userOptionSaveReader
			});
			
			return userOptionSaveStore;
		},
		
		createRolePersonListStore: function() {
			var rolePersonListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'roleId'},
	            {name: 'cwid', mapping: 'cwid'},
	            {name: 'roleName', mapping: 'roleName'}
	        ]);
	
			var rolePersonListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, rolePersonListRecord); 
	
			var rolePersonListStore = new Ext.data.XmlStore({
				autoDestroy: false,
				storeId: 'rolePersonListStore',
				autoLoad: false,
	          
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRWSPort',
		      		loadMethod: 'getRolePerson',
		      		timeout: 120000,
		      		reader: rolePersonListReader
		      	}),
		      	
		      	fields: [ 'id',	'roleId', 'cwid', 'roleName' ],
		
		      	reader: rolePersonListReader
			});
			
			return rolePersonListStore;
		},
		
		
		createProcessListStore: function() {
			var processListStore = new Ext.data.ArrayStore(
			{
				storeId: 'processListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : processData
			});
			
	        return processListStore;

		},
		
		createApplicationCat1ListStore: function() {
			
			var applicationCat1ListStore = new Ext.data.ArrayStore(
			{
				storeId: 'applicationCat1ListStore',
				fields : ['id', 'text', 'english'],
				idIndex: 0,
				data : appCat1Data
			});
			
	        return applicationCat1ListStore;
		},
		
		createDatabaseDisplayNameListStore: function() {
			var databaseDisplayNameListStore = new Ext.data.ArrayStore(
			{
				storeId: 'databaseDisplayNameListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : databaseData
			});
			
	        return databaseDisplayNameListStore;
		},
		
		createLanguageHelpStore: function() {
			var languageHelpStore = new Ext.data.XmlStore({
			    autoLoad: false,
			    storeId: 'languageHelpStore',
			    //url: 'conf/lang/german_help.xml',
			    data: Util.String2XML(conf_lang_german_help_xml),

			    record: 'Items',
			    
			    fields: [
			        {name: 'help_infotext'},
			        {name: 'help_myplace'},
			        {name: 'help_search'},
			        {name: 'help_search_advanced'},
			        {name: 'help_create_ci'},
			        {name: 'help_details_details'},
			        {name: 'help_details_specific'},
			        {name: 'help_details_contacts'},
			        {name: 'help_details_agreements'},
			        {name: 'help_details_protection'},
			        {name: 'help_details_compliance'},
			        {name: 'help_details_licensecosts'},
			        {name: 'help_details_connections'},
			        {name: 'help_details_specialattributes'},
			        {name: 'help_details_supportstuff'},
			        {name: 'help_details_history'},
			    	{ name : 'help_details_assetManagement'},
			    	{ name : 'help_details_assetSearch'},
			    	{ name : 'help_details_newAsset'},
			    	{ name : 'help_details_intangible'},
			    	{ name : 'help_details_tangible'},
			    	{ name : 'help_details_assetWithInventory'},
			    	{ name : 'help_details_assetWoInventory'}
			    ]
			});
			
			return languageHelpStore;
		},
		
		createLanguageStoreEN: function() {
			return this.createLanguageStore('EN');
		},
		createLanguageStoreDE: function() {
			return this.createLanguageStore('DE');
		},
		createLanguageStore: function(language) {
			//var url = language == 'de' || language == 'DE' ? 'conf/lang/german.xml' : 'conf/lang/english.xml';
			
			var languageStore = new Ext.data.XmlStore({
			    autoLoad: false,
			    storeId: 'languageStore_' + language,
			    //url: url,
			    data: Util.String2XML((language == 'de' || language == 'DE' ? conf_lang_german_xml : conf_lang_english_xml)),
	
			    record: 'Items',
			    
			    fields: [
	             	{name: 'applicationManager'},
			             
			             
			        {name: 'general_yes'},
			        {name: 'general_no'},
			        {name: 'indefinite_article'},
			        {name: 'indefinite_article_no'},
			        {name: 'OR'},
			        'New',
			        'deleted',
			        
			        {name: 'dynamicWindowOKButtonText'},
			        {name: 'objectType'},
					{name: 'notRelevant'},
			        {name: 'both'},
			        {name: 'lifecycleStatus'},
			        {name: 'organisationalScope'},
			        {name: 'operationalStatus'},
			        {name: 'applicationCat2'},
			        {name: 'businessProcess'},
			        {name: 'osType'},
			        {name: 'osName'},
			        {name: 'source'},
			        {name: 'gapResponsible'},
			        {name: 'itSet'},
			        {name: 'bUpdateCiSearchResult'},
			        {name: 'bExpandAdvSearchParams'},
			        {name: 'bCollapseAdvSearchParams'},
			        {name: 'bReset'},
			        {name: 'searchTypeSearch'},
			        {name: 'searchTypeAdvancedSearch'},
			        {name: 'searchTypeOuSearch'},
			        
			        {name: 'label_menu_loggedinas'},
			        {name: 'label_menu_myplacemenuitem'},
			        {name: 'label_menu_myplacemycismenuitem'},
			        {name: 'label_menu_myplacemycissubsmenuitem'},
			        
			        {name: 'label_menu_searchmenuitem'},
			        {name: 'label_menu_advancedsearchmenuitem'},
			        {name: 'lMenuItemOuSearch'},
	
			        {name: 'label_menu_createmenuitem'},
			        {name: 'label_menu_wizardmenuitem'},
			        {name: 'label_menu_copyfrommenuitem'},
			        {name: 'label_menu_delete'},
			        
			        {name: 'label_menu_detailsdetails'},
			        {name: 'label_menu_detailsspecific'},
			        {name: 'label_menu_detailscontacts'},
			        {name: 'label_menu_detailsagreements'},
			        {name: 'label_menu_detailscompliance'},
			        {name: 'label_menu_detailsprotection'},
			        {name: 'label_menu_detailslicense'},
			        {name: 'label_menu_specialAttribute'},
			        {name: 'label_menu_detailsconnections'},
			        {name: 'label_menu_detailssupportstuff'},
			        {name: 'label_menu_detailshistory'},
	
					// myPlace
			        {name: 'label_myplace_user'},
			        {name: 'label_myplace_cwid'},
			        {name: 'label_myplace_lastlogon'},
			        {name: 'label_myplace_roleperson'},
			        
			        // user options
			        {name: 'label_myplace_useroption'},
			        {name: 'label_useroptions_currency'},
			        {name: 'label_useroptions_language'},
			        {name: 'label_useroptions_numberformat'},
			        {name: 'label_useroptions_help'},
			        {name: 'label_useroptions_createwizard'},
			        {name: 'label_useroptions_disableTooltip'},
			        {name: 'label_useroptions_showDeleted'},
			        
			        //validation Messages
			        {name: 'editDataNotValid'},
			        
			        //applicationEditor
			        {name: 'header_applicationIsDraft'},
			        {name: 'header_applicationIsIncomplete'},
			        
					// details
			        {name: 'detailsPanelTitle'},
			        {name: 'label_details_alias'},
			        {name: 'label_details_category_business'},
			        {name: 'label_details_category'},
			        {name: 'label_details_ciOwner'},
			        {name: 'label_details_applicationOwner'},
			        {name: 'label_details_sla'},
			        {name: 'label_details_businessessential'},
			        {name: 'label_details_insertdata'},
			        {name: 'label_details_updatedata'},
			        {name: 'label_details_deletedata'},
			        
			        // specific
			        {name: 'specificsPanelTitle'},
//			        {name: 'applicationName'},
			        'name',
			        {name: 'applicationAlias'},
			        {name: 'barApplicationId'},
			        {name: 'rgBARrelevance'},
			        {name: 'applicationVersion'},
			        {name: 'applicationCat2'},
			        {name: 'lifecycleStatus'},
			        {name: 'operationalStatus'},
			        {name: 'comments'},
			        
			        {name: 'specificsCategory'},
			        {name: 'applicationBusinessCat'},
			        {name: 'dataClass'},
			        {name: 'applicationCat2'},
			        {name: 'businessProcess'},
	
			        // contacts
			        {name: 'provider'},
			        {name: 'idProviderName'},//vandana
			        {name: 'idProviderAddress'},//vandana
			        {name: 'contactsPanelTitle'},
			        {name: 'contactsCIOwner'},
			        {name: 'contactsCIOwnerApplication'}, // for applications only
			        {name: 'ciResponsible'},
			        {name: 'ciSubResponsible'},	     
			        {name: 'fsApplicationOwner'},
			        {name: 'applicationOwner'},        
			        {name: 'applicationOwnerDelegate'},
			        {name: 'applicationSteward'},
			        {name: 'contactsGPSC'},
			        {name: 'gpsccontactResponsibleAtCustomerSide'},
			        {name: 'gpsccontactSupportGroup'},
			        {name: 'gpsccontactChangeTeam'},
			        {name: 'gpsccontactServiceCoordinator'},
			        {name: 'gpsccontactEscalation'},
			        {name: 'gpsccontactCiOwner'},
			        {name: 'gpsccontactOwningBusinessGroup'},
			        {name: 'gpsccontactImplementationTeam'},
			        {name: 'gpsccontactServiceCoordinatorIndiv'},
			        {name: 'gpsccontactEscalationIndiv'},
			        {name: 'gpsccontactSystemResponsible'},
			        {name: 'gpsccontactImpactedBusiness'},
			        {name: 'gpsccontactBusinessOwnerRepresentative'},
	
			        // agreements
			        {name: 'agreementsPanelTitle'},
			        {name: 'sla'},
			        {name: 'priorityLevel'},
			        {name: 'serviceContract'},
			        {name: 'severityLevel'},
			        {name: 'businessEssential'},
			        
			        // protection
					{name: 'protectionPanelTitle'},
					{name: 'itSecSbAvailabilityId'},
					{name: 'itSecSbAvailabilityDescription'},//itSecSbAvailabilityDescription
					{name: 'protectionClassInformation'},
					{name: 'protectionClassInformationExplanation'},
					{name: 'protectionApplicationProtection'},
					{name: 'itSecSbIntegrityId'},
					{name: 'itSecSbIntegrityDescription'},
					{name: 'itSecSbConfidentialityId'},
					{name: 'itSecSbConfidentialityDescription'},
			        
					// compliance
					{name: 'compliancePanelTitle'},
					{name: 'complianceBYTSEC'},
					{name: 'complianceNonBYTSEC'},
					{name: 'complianceUndefined'},
					{name: 'complianceManagementText'},
					{name: 'complianceInfoText'},
					
					{name: 'complianceprocedures'},
					{name: 'isTemplate'},
					{name: 'compliancerelevance'},
					{name: 'compliancecontrols'},
					{name: 'itsetName'},
			        {name: 'relevanceGR1920'},
			        {name: 'relevanceGR1435'},
			        {name: 'relevanceGR2059'},
			        {name: 'relevanceGR2008'},
			        {name: 'relevanceEditButton'},
					{name: 'relevanceViewButton'},
			        {name: 'relevance1435EditButton'},
			        {name: 'relevanceEditMsg'},
			        {name: 'gxpFlag'},
			        {name: 'riskAnalysisYN'},
			        {name: 'itsecGroup'},
			        {name: 'referencedTemplate'},
					{name: 'referencedTemplateInvalid'},
					{name: 'templateBARrelevanceValidationTitle'},
					{name: 'templateBARrelevanceValidationBARrelevance1'},
					{name: 'templateBARrelevanceValidationBARrelevance2'},
					{name: 'templateBARrelevanceValidationBARtemplate'},
					
					{name: 'signeeApproval'},
					{name: 'checkItsecGroupWindowTitle'},
					{name: 'checkItsecGroupWindowMessage'},
					{name: 'checkTemplateWindowTitle'},
					{name: 'checkTemplateWindowMessage'},
					
					{name: 'invalidMassnameWindowTitleIncomplete'},
					{name: 'invalidMassnameWindowTitleGapClass'},
					{name: 'invalidMassnameWindowTitleDamagePerYear'},
					{name: 'invalidMassnameWindowTitleGapClassTargetDateChange'},
					
					{name: 'invalidMassnameWindowIncomplete'},
					{name: 'invalidMassnameWindowDamagePerYear'},
					{name: 'invalidMassnameWindowTargetDatePast'},
					{name: 'invalidMassnameWindowGapClassReplace'},
					{name: 'invalidMassnameWindowGapClassTargetDateChange'},
					{name: 'invalidMassnameWindowTargetDate'},
	
					// license			
					{name: 'licensePanelTitle'},
					{name: 'licenselicense'},
					{name: 'licensecosts'},
					{name: 'licenseType'},
					{name: 'applicationAccessingUserCount'},
					{name: 'applicationAccessingUserCountMeasured'},
					{name: 'applicationDedicatedShared'},
					{name: 'applicationLoadClass'},
					{name: 'applicationServiceModel'},
					{name: 'version'},
					{name: 'costRunPa'},
					{name: 'costChangePa'},
					{name: 'currency'},
			        {name: 'runAccount'},
			        {name: 'changeAccount'},
			        {name: 'usingRegions'},
	
			        // support stuff
			        {name: 'supportStuffPanelTitle'},
			        {name: 'supportStuffApplication'},
			        {name: 'supportStuffUserAuthorisation'},
			        {name: 'supportStuffChangeManagement'},
			        {name: 'supportStuffUserManagement'},
			        {name: 'supportstuffUASupportingDoc'},
			        {name: 'supportstuffUAProcess'},
			        {name: 'supportstuffCMSupportingTool'},
			        {name: 'supportstuffUMProcess'},
			        {name: 'supportstuffAppDoc'},
			        {name: 'supportstuffAppRootDir'},
			        {name: 'supportstuffAppDataDir'},
			        {name: 'supportstuffAppProvidedServices'},
			        {name: 'supportstuffAppProvidedMUser'},
			        
			        // history
			        {name: 'historyPanelTitle'},
			        {name: 'historyDatetime'},
			        {name: 'historyChangeSource'},
			        {name: 'historyChangeDBUser'},
			        {name: 'historyChangeUserCWID'},
			        {name: 'historyChangeAttributeName'},
			        {name: 'historyChangeAttributeNewValue'},
			        {name: 'historyChangeAttributeOldValue'},
			        {name: 'infoType'},
					{name: 'ciId'},
	
			        // buttons        
			        {name: 'button_general_save'},
			        {name: 'button_general_back'},
			        {name: 'button_general_cancel'},
			        {name: 'button_general_search'},
			        {name: 'button_general_next'},
			        {name: 'button_general_copy'},
			        {name: 'newSearch'},
			        {name: 'findFirst'},
			        {name: 'findAll'},
			        {name: 'browserOptimization'},
			        {name: 'secureSystem'},
			        {name: 'editInGPSC'},
			        
			        // general
			        {name: 'gerneral_message_loading'},
			        {name: 'gerneral_message_saving'},
			        
			        // special
			        {name: 'searchfield'},
			        {name: 'searchpanelheader'},
			        {name: 'advancedsearchpanelheader'},
			        {name: 'advancedsearchlink'},
			        {name: 'advancedsearchpluslink'},
			        {name: 'advancedsearchminuslink'},
			        
			        // search
			        {name: 'advsearchPanelTitle'},
			        {name: 'cbCiType'},
			        {name: 'advsearchdescription'},
			        
			        {name: 'advsearchowner'},
			        {name: 'advsearchappowner'},
			        {name: 'advsearchappownerdelegate'},
			        {name: 'advsearchciowner'},
			        {name: 'advsearchcidelegate'},
			        {name: 'advsearchsteward'},
			        
			        {name: 'advsearchplusfieldset'},
			        
			        {name: 'rbgQueryModeContains'},
			        {name: 'rbgQueryModeBeginsWith'},
			        {name: 'rbgQueryModeExact'},
			        
			        // search result
			        {name: 'searchResultPanelTitle'},
			        {name: 'searchResultName'},
			        {name: 'searchResultAlias'},
			        {name: 'searchResultType'},
			        {name: 'searchResultCategory'},
			        {name: 'searchResultLocation'},
			        {name: 'searchResultResponsible'},
			        {name: 'searchResultSubResponsible'},
			        {name: 'searchResultAppOwner'},
			        {name: 'searchResultAppSteward'},
			        {name: 'searchResultAppOwnerDelegate'},
			        {name: 'applicationManager'},
			        {name: 'applicationManagerDelegate'},
			        
			        // wizard
			        {name: 'createpanelheader'},
			        {name: 'createstartbutton'},
			        {name: 'createbackbutton'},
			        {name: 'createcancelbutton'},
			        {name: 'createnextbutton'},
			        {name: 'createfinishbutton'},
			        {name: 'ciCreateWizardPage0'},
			        {name: 'createIntroText'},
			        {name: 'wizardcbskip'},
			        
			        {name: 'ciCreateWizardPage1'},
			        {name: 'wizardobjectType'},
			        {name: 'wizardapplicationName'},
			        {name: 'wizardapplicationNameSAP'},
			        {name: 'wizardapplicationNameSAP1'},
			        {name: 'wizardapplicationNameSAP2'},
			        {name: 'wizardapplicationNameSAP3'},
			        {name: 'wizardapplicationAlias'},
			        {name: 'wizardcomments'},
			        {name: 'wizardRelevance'},
			        {name: 'wizardisTemplate'},
			        {name: 'tfApplicationIdW'},
			        {name: 'labeltfApplicationOwnerCompanyW'},
			        {name: 'wizardapplicationNameSAPillegal'},
			        
			        
			        {name: 'ciCreateWizardPage2'},
			        {name: 'wizardBasics'},
			        {name: 'wizardlifecycleStatus'},
			        {name: 'wizardoperationalStatus'},
			        {name: 'wizardapplicationBusinessCat'},
			        {name: 'wizardapplicationCat2'},
			        {name: 'wizardAgreements'},
			        {name: 'wizardsla'},
			        {name: 'wizardserviceContract'},
			        {name: 'wizardseverityLevel'},
			        {name: 'wizardbusinessEssential'},
			        {name: 'lvApplicationUsingRegionsW'},

			        {name: 'ciCreateWizardPage3'},
			        {name: 'wizardAppowner'},
			        {name: 'labelwizardapplicationOwner'},
			        {name: 'labelwizardapplicationOwnerDelegate'},
			        {name: 'wizardCiowner'},
			        {name: 'wizardCiownerApplication'},
			        {name: 'labelwizardciResponsible'},
			        {name: 'labelwizardciSubResponsible'},
			        
			        {name: 'wizardallowedNameText'},
			        {name: 'wizardallowedAliasText'},
			        {name: 'wizardRequiredField'},
			        
			        {name: 'wizardDataNotValid'},
			        {name: 'wizardCancelQuestion'},
			        {name: 'wizardCancelTitle'},
			        {name: 'wizardSaveSuccessTitle'},
			        {name: 'wizardSaveSuccess'},
			        {name: 'wizardSaveFailTitle'},
			        {name: 'wizardSaveFail'},
			        
			        {name: 'dynamicWindowDataChangedTitle'},
			        {name: 'dynamicWindowDataChangedText'},
			        {name: 'dynamicWindowDataChangedSaveButtonText'},
			        {name: 'dynamicWindowDataChangedSaveButtonDiscard'},
			        {name: 'dynamicWindowDataChangedSaveButtonBack'},
	
			        {name: 'dynamicWindowDataSavedTitle'},
			        {name: 'dynamicWindowDataSavedText'},
			        {name: 'dynamicWindowDataSavedOKButtonText'},
			        {name: 'dynamicWindowDataSaveFailTitle'},
	
			        {name: 'dynamicWindowDataSavedErrorTitle'},
			        {name: 'dynamicWindowDataSavedErrorOKButtonText'},
			        
			        {name: 'dynamicWindowCiTypeNotSupportedWarningTitle'},
			        {name: 'dynamicWindowCiTypeNotSupportedWarningText'},
			        {name: 'dynamicWindowCiTypeNotSupportedWarningOKButtonText'},
			        
			        {name: 'dynamicWindowCancelConfirmationTitle'},
			        {name: 'dynamicWindowCancelConfirmationText'},
			        {name: 'dynamicWindowCancelConfirmationButtonOKText'},
			        {name: 'dynamicWindowCancelConfirmationButtonNOText'},
			        
			        {name: 'dynamicWindowAfterAppSaveContinueEditingButtonText'},
			        {name: 'dynamicWindowAfterAppSaveNewCiButtonText'},
			        {name: 'dynamicWindowAfterAppSaveBackToSearchButtonText'},
			        
			        {name: 'dynamicWindowNonBYTsecTitle'},
			        {name: 'dynamicWindowNonBYTsecText'},
			        
			        {name: 'dynamicWindowConfirmDeleteTitle'},
			        {name: 'dynamicWindowConfirmDeleteText'},
			        
			        
			        {name: 'ciCopyFromViewTitle'},
			        {name: 'ciCopyFromDetailViewHeaderLabel'},
			        {name: 'ciCopyFromDetailViewTitle'},
			        
			        {name: 'createstartpagewizardtext'},
			        {name: 'createstartpagewizardbutton'},
			        {name: 'createstartpagecopyfromtext'},
			        {name: 'createstartpagecopyfrombutton'},
			        {name: 'createstartpagedeletetext'},
			        {name: 'createstartpagedeletebutton'},
	
			        
			        {name: 'compliance1435WindowTitle'},
			        {name: 'compliance1435WindowItSet'},
			        {name: 'compliance1435WindowUseAsTemplate'},
			        {name: 'compliance1435WindowLink'},
			        {name: 'compliance1435WindowItSecGroup'},
			        
			        {name: 'complianceWindowTitle'},
			        {name: 'complianceWindowControls'},
			        {name: 'directLinkCIPanelTitle'},
			        {name: 'directLinkagesCIPanelTitle'},
			        
			        {name: 'RelevanceICSSecurityManagement'},
			        {name: 'RelevanceICSAccessManagement'},
			        {name: 'RelevanceICSITOperations'},
			        {name: 'RelevanceICSChangeManagement'},
			        {name: 'LinkCiType'},
			        {name: 'LinkCi'},
			        
			        {name: 'complianceWindowStatement'},
			        {name: 'complianceWindowStatementUntreated'},
			        {name: 'complianceWindowStatementDispensable'},
			        {name: 'complianceWindowCompliant'},
			        {name: 'complianceWindowJustification'},
			        {name: 'complianceStatementInfo'},
			        
			        {name: 'complianceWindowGap'},
			        {name: 'complianceWindowGapDescription'},
			        {name: 'complianceWindowGapElimination'},
			        {name: 'complianceWindowGapResponsible'},
			        {name: 'complianceWindowGapClass'},
			        {name: 'complianceWindowPlanOfAction'},
			        {name: 'complianceWindowGapClass'},
			        {name: 'complianceWindowTargetDate'},
			        
			        {name: 'complianceWindowRiskAnalysisAndMgmt'},
			        {name: 'complianceWindowRiskAnalysisByFreeText'},
			        {name: 'complianceWindowOccurenceOfDamagePerYear'},
			        {name: 'complianceWindowMaximumDamagePerEvent'},
			        {name: 'complianceWindowMitigationPotential'},
			        {name: 'complianceWindowRiskMitigation'},
			        {name: 'complianceWindowExpensePerYear'},
			        {name: 'complianceWindowSignee'},
			        {name: 'complianceWindowDateOfApproval'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeSelectTitle'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeSelectMessage'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeFreeText'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeNonFreeText'},
			        
			        
			        {name: 'CiConnectionsViewTitle'},
			        {name: 'CiConnectionsViewUpStreamConnections'},
			        {name: 'CiConnectionsViewDownStreamConnections'},
			        {name: 'CiConnectionsViewEditConnections'},
			        {name: 'CiConnectionsViewObjectType'},
			        {name: 'CiConnectionsViewQuickSearch'},
			        {name: 'CiConnectionsViewSearch'},
			        
			        {name: 'CiConnectionsViewMsgSuccessfullyAdded'},
			        {name: 'CiConnectionsViewMsgSuccessfullyDeleted'},
			        {name: 'CiConnectionsViewMsgAlreadyExists'},
			        {name: 'CiConnectionsViewMsgNotAllowed'},
			        
			        {name: 'dynamicWindowFForIETitle'},
			        {name: 'dynamicWindowFForIEText'},
			        {name: 'dynamicWindowFForIEContinueFFButtonText'},
			        {name: 'dynamicWindowFForIEKeepIEButtonText'},
	
			        {name: 'CiDeleteViewTitle'},
			        {name: 'CiDeleteViewButtonDelete'},
			        
			        {name: 'CiOuSearchViewTitle'},
			        {name: 'CiOuSearchViewOrgUnit'},
			        {name: 'CiOuSearchViewOUSearchQueryMode'},
			        {name: 'CiOuSearchViewOUSearchOwnerType'},
			        
			        {name: 'ToolbarInvalidCat2SAP'},
			        {name: 'SAPNameToStandardNameInvalid'},
			        {name: 'StandardNameToSAPNameInvalid'},
			        
					{name: 'ToolbarInvalidTemplate'},
			        {name: 'dynamicWindowCIreactivationPrompt'},
					
					{name: 'CiEinsprungInvalidTitle'},
					{name: 'CiEinsprungCiIdInvalidMessage'},
					{name: 'CiEinsprungCiIdDoesNotExistMessage'},
					{name: 'CiEinsprungInvalidCiTypeMessage'},
					{name: 'CiEinsprungCiIdMarkedAsDeleted'},
					
					//CiSpecificsLocationItemView
					{name: 'alias'},
					{name: 'floor'},
					{name: 'code'},
					{name: 'nameEn'},
					{name: 'room'},
					{name: 'buildingArea'},
					{name: 'building'},
					{name: 'terrain'},
					{name: 'site'},
					{name: 'country'},
					{name: 'streetAndNumber'},
					{name: 'postalCodeLocation'},
					{name: 'tfStreet'},
					{name: 'tfStreetNumber'},
					{name: 'tfPostalCode'},
					{name: 'tfLocation'},
					
					//CiSpecificsItItemView
					{name: 'osGroup'},
					{name: 'clusterCode'},
					{name: 'clusterType'},
					{name: 'virtualHardwareClient'},
					{name: 'virtualHardwareHost'},
					{name: 'virtualHardwareSoftware'},
					{name: 'primaryFunction'},
					{name: 'licenseScanning'},

					//AssetManagement
					{name : 'assetManufacturer'},
					{name : 'assetSAPDesc'},
					{name : 'assetSerialNo'},
					{name : 'assetCostCenterManager'},
					{name : 'assetOrganizationalUnit'},
					{name : 'assetCostCenter'},
					{name : 'assetInventoryNumber'},
					{name : 'assetPSPElement'},
					{name : 'assetRequester'},
					{ name : 'assetTechnicalMaster'}, 
					{name : 'assetIdentNumber'},
					{ name : 'assetTechnicalNumber'}, 
					{ name : 'assetAcquisitionValue'}, 
					{ name : 'assetSite'}, 
					{ name : 'assetOrderNumber'}, 
					{ name : 'assetChecked'}, 
					{ name : 'sapAssetClass'}, 
					{ name : 'assetSubCategory'}, 
					{ name : 'assetType'}, 
					{ name : 'assetModel'}, 
					{ name : 'assetSystemPlatformName'}, 
					{ name : 'assetHardwareSystem'}, 
					{ name : 'assetHardwareTransientSystem'}, 
					{name : 'assetAlias'}, 
					{name : 'assetOsName'},
					{name : 'assetIndentnumber'},
					{name : 'assetInventoryNumber'},
					{name : 'assetDescription'},
					{name : 'assetReason'},
					{name : 'assetManufacture'},
					{name : 'assetSubcategory'},
					{name : 'assetType'},
					{name : 'assetModel'},
					{name : 'assetSapDescription'},
					{name : 'assetSoftwareProduct'},
					{name : 'assetReset'},
					{name : 'assetTechnicalNumber'},
					{name : 'assetTechnicalMaster'},
					{name : 'assetSystemPlatformName'},
					{name : 'assetHardwareSystem'},
					{name : 'assetOsname'},
					{name : 'assetWorflowstatus'},
					{name : 'assettransient'},
					{name : 'assetWorflowstatustechnical'},
					{name : 'assetGeneral'},
					{name : 'assetITSecurity'},
					{name : 'assetComment'},
					{name : 'assetCountry'},
					{name : 'assetSite'},
					{name : 'assetBuilding'},
					{name : 'assetRoom'},
					{name : 'assetPosition'},
					{name : 'assetOrdernumber'},
					{name : 'assetInventory'},
					{name : 'assetPSP'},
					{name : 'assetPsptext'},
					{name : 'assetCost'},
					{name : 'assetRequester'},
					{name : 'assetCostManager'},
					{name : 'assetOrganisation'},
					{name : 'assetOwner'},
					{name : 'assetSapClass'},
					{name : 'assetEditor'},
					
					//AssetManagement Links
					{name : 'lMenuAssetManagement'},
					{name : 'lMenuSearch'},
					{name : 'lNewAsset'},
					{name : 'lAssetwithInventory'},
					{name : 'lAssetwithoutInventory'},
					{name : 'rHardwarecomponent'},
					{name : 'rSoftwarecomponent'},
					{name : 'createhardwarepanelheader'},
					{name : 'lAssetwithInventoryText'},
					{name : 'lAssetwithoutInventoryText'}
			    ]
			});
		
			return languageStore;
		},
		
		
		createLanguageToolTipStoreEN: function() {
			return this.createLanguageToolTipStore('EN');
		},
		createLanguageToolTipStoreDE: function() {
			return this.createLanguageToolTipStore('DE');
		},
		createLanguageToolTipStore: function(language) {
			//var url = language == 'de' || language == 'DE' ? 'conf/lang/german_tooltips.xml' : 'conf/lang/english_tooltips.xml';
			
			var languageToolTipStore = new Ext.data.XmlStore({
			    autoLoad: false,
			    storeId: 'languageToolTipStore_' + language,
				//url: url,
			    data: Util.String2XML((language == 'de' || language == 'DE' ? conf_lang_german_tooltips_xml : conf_lang_english_tooltips_xml)),
			    
			    record: 'Items',
			    
			    fields: [
			        //details
			        {name: 'insertData'},
			        {name: 'insertDataText'},
			        {name: 'updateData'},
			        {name: 'updateDataText'},
			        {name: 'deleteDataText'},
			        
			        //specifics
			        {name: 'applicationName'},
			        {name: 'applicationNameText'},
			        {name: 'applicationAlias'},
			        {name: 'applicationAliasText'},
			        {name: 'barApplicationRelevant'},
			        {name: 'barApplicationRelevantText'},
			        {name: 'barApplicationId'},
			        {name: 'barApplicationIdText'},
			        {name: 'version'},
			        {name: 'versionText'},
			        {name: 'applicationCat2'},
			        {name: 'applicationCat2Text'},
			        {name: 'lifecycleStatus'},
			        {name: 'lifecycleStatusText'},
			        {name: 'organisationalScope'},
			        {name: 'organisationalScopeText'},
			        {name: 'operationalStatus'},
			        {name: 'operationalStatusText'},
			        {name: 'comments'},
			        {name: 'commentsText'},
			        
			        {name: 'applicationBusinessCat'},
			        {name: 'applicationBusinessCatText'},
			        {name: 'dataClass'},
			        {name: 'dataClassText'},
			        {name: 'businessProcess'},
			        {name: 'businessProcessText'},
	
			        // contacts
        	        {name: 'idProviderName'},//vandana
			        {name: 'idProviderNameText'},//vandana
			        {name: 'idProviderAddress'},//vandana
			        {name: 'idProviderAddressText'},//vandana
			        {name: 'applicationOwner'},
			        {name: 'applicationOwnerText'},
			        {name: 'applicationSteward'},
			        {name: 'applicationStewardText'},
			        {name: 'applicationOwnerDelegate'},
			        {name: 'applicationOwnerDelegateText'},
			        
			        {name: 'ciResponsible'},
			        {name: 'ciResponsibleText'},
			        {name: 'ciSubResponsible'},
			        {name: 'ciSubResponsibleText'},
			       
			        
			        {name: 'gpsccontactCiOwner'},
			        {name: 'gpsccontactCiOwnerText'},
			        {name: 'gpsccontactResponsibleAtCustomerSide'},
			        {name: 'gpsccontactResponsibleAtCustomerSideText'},
			        {name: 'gpsccontactSystemResponsible'},
			        {name: 'gpsccontactSystemResponsibleText'},
			        {name: 'gpsccontactSupportGroup'},
			        {name: 'gpsccontactSupportGroupText'},
			        {name: 'gpsccontactChangeTeam'},
			        {name: 'gpsccontactChangeTeamText'},
			        {name: 'gpsccontactServiceCoordinator'},
			        {name: 'gpsccontactServiceCoordinatorText'},
			        {name: 'gpsccontactServiceCoordinatorIndiv'},
			        {name: 'gpsccontactServiceCoordinatorIndivText'},
			        {name: 'gpsccontactImplementationTeam'},
			        {name: 'gpsccontactImplementationTeamText'},
			        {name: 'gpsccontactEscalation'},
			        {name: 'gpsccontactEscalationText'},
			        {name: 'gpsccontactEscalationIndiv'},
			        {name: 'gpsccontactEscalationIndivText'},
			        {name: 'gpsccontactImpactedBusiness'},
			        {name: 'gpsccontactImpactedBusinessText'},
			        {name: 'gpsccontactOwningBusinessGroup'},
			        {name: 'gpsccontactOwningBusinessGroupText'},
			        {name: 'gpsccontactBusinessOwnerRepresentative'},
			        {name: 'gpsccontactBusinessOwnerRepresentativeText'},
			        
	
			        // agreements
			        {name: 'slaName'},
			        {name: 'slaNameText'},
			        {name: 'priorityLevel'},
			        {name: 'priorityLevelText'},
			        {name: 'serviceContract'},
			        {name: 'serviceContractText'},
			        {name: 'severityLevel'},
			        {name: 'severityLevelText'},
			        {name: 'businessEssential'},
			        {name: 'businessEssentialText'},
			        
			        // protection
					{name: 'itSecSbAvailabilityId'},
					{name: 'itSecSbAvailabilityIdText'},
					{name: 'itSecSbAvailabilityDescription'},
					{name: 'itSecSbAvailabilityDescriptionText'},
			        {name: 'itSecSbAppProtection'},
			        {name: 'itSecSbAppProtectionText'},
			        {name: 'protectionClassInformation'},
			        {name: 'protectionClassInformationText'},
					{name: 'protectionClassInformationExplanation'},
			        {name: 'protectionClassInformationExplanationText'},
			        
	
					
					// compliance
					{name: 'itsetName'},
					{name: 'itsetNameText'},
					{name: 'isTemplate'},
					{name: 'isTemplateText'},
					{name: 'referencedTemplate'},
					{name: 'referencedTemplateText'},
					{name: 'itsecGroup'},
					{name: 'itsecGroupText'},
					
			        {name: 'relevanceGR1435'},
			        {name: 'relevanceGR1435Text'},
			        {name: 'relevanceGR2059'},
			        {name: 'relevanceGR2059Text'},
			        {name: 'relevanceGR1920'},
			        {name: 'relevanceGR1920Text'},
			        {name: 'relevanceGR2008'},
			        {name: 'relevanceGR2008Text'},
			        {name: 'gxpFlag'},
			        {name: 'gxpFlagText'},
			        {name: 'riskAnalysisYN'},
			        {name: 'riskAnalysisYNText'},
			        {name: 'itsecGroup'},
			        {name: 'itsecGroupText'},
			        {name: 'references'},
			        {name: 'referencesText'},
			        
			        
					// license
					{name: 'licenseType'},
					{name: 'licenseTypeText'},
			        {name: 'applicationAccessingUserCount'},
					{name: 'applicationAccessingUserCountText'},
		        	{name: 'applicationAccessingUserCountMeasured'},
		    		{name: 'applicationAccessingUserCountMeasuredText'},
		    		{name: 'dedicated'},
		    		{name: 'dedicatedText'},
		    		{name: 'loadClass'},
		    		{name: 'loadClassText'},
		    		{name: 'serviceModel'},
		    		{name: 'serviceModelText'},
					{name: 'costRunPa'},
					{name: 'costRunPaText'},
					{name: 'costChangePa'},
					{name: 'costChangePaText'},
					{name: 'currency'},
					{name: 'currencyText'},
					{name: 'runAccount'},
					{name: 'runAccountText'},
					{name: 'changeAccount'},
					{name: 'changeAccountText'},
					{name: 'applicationUsingRegions'},
					{name: 'applicationUsingRegionsText'},
					
			        // support stuff
					{name: 'supportstuffAppDoc'},
					{name: 'supportstuffAppDocText'},
			        {name: 'supportstuffAppRootDir'},
			        {name: 'supportstuffAppRootDirText'},
			        {name: 'supportstuffAppDataDir'},
			        {name: 'supportstuffAppDataDirText'},
			        {name: 'supportstuffAppProvidedServices'},
			        {name: 'supportstuffAppProvidedServicesText'},
			        {name: 'supportstuffAppProvidedMUser'},
			        {name: 'supportstuffAppProvidedMUserText'},
			        {name: 'supportstuffUASupportingDoc'},
			        {name: 'supportstuffUASupportingDocText'},
			        {name: 'supportstuffUAProcess'},
			        {name: 'supportstuffUAProcessText'},
			        {name: 'supportstuffCMSupportingTool'},
			        {name: 'supportstuffCMSupportingToolText'},
			        {name: 'supportstuffUMProcess'},
			        {name: 'supportstuffUMProcessText'}
			    ]
			});
			
			return languageToolTipStore;
		},
		
		createApplicationContactsStore: function() {
			var applicationContactsRecord = Ext.data.Record.create([{
				name: 'groupId',
				mapping: 'applicationContactEntryDTO > groupId'
			}, {
				name: 'groupName',
				mapping: 'applicationContactEntryDTO > groupName'
			}, {
				name: 'personName',
				mapping: 'applicationContactEntryDTO > personName'
			}, {
				name: 'cwid',
				mapping: 'applicationContactEntryDTO > cwid'
			}, {
				name: 'groupTypeId',
				mapping: 'groupTypeId'
			}, {
				name: 'groupTypeName',
				mapping: 'groupTypeName'
			}, {
				name: 'individualContactYN',
				mapping: 'individualContactYN'
			}, {
				name: 'maxContacts',
				mapping: 'maxContacts'
			}, {
				name: 'minContacts',
				mapping: 'minContacts'
			}]);
	
			var applicationContactsReader = new Ext.data.XmlReader({
				record: 'applicationContactGroupDTO'
			}, applicationContactsRecord);
	
			var applicationContactsStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationContactsStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'getApplicationContacts',
					timeout: 120000,
					reader: applicationContactsReader
				}),
				
				fields: [ 'groupId', 'groupName', 'personName', 'groupTypeId', 'groupTypeName', 'individualContactYN',	'maxContacts', 'minContacts' ],

				reader: applicationContactsReader
			});
			
			return applicationContactsStore;
		},
		
		createHistoryListStore: function() {
			var historyListRecord = Ext.data.Record.create([ {
				name : 'id',
				mapping : 'id'
			}, {
				name : 'tableId',
				mapping : 'tableId'
			}, {
				name : 'datetime',
				mapping : 'datetime'
			}, {
				name : 'changeSource',
				mapping : 'changeSource'
			}, {
				name : 'changeDBUser',
				mapping : 'changeDBUser'
			}, {
				name : 'changeUserCWID',
				mapping : 'changeUserCWID'
			}, {
				name : 'changeUserName',
				mapping : 'changeUserName'
			}, {
				name : 'changeAttributeName',
				mapping : 'changeAttributeName'
			}, {
				name : 'ciId',
				mapping : 'ciId'
			}, {
				name : 'changeAttributeOldValue',
				mapping : 'changeAttributeOldValue'
			}, {
				name : 'changeAttributeNewValue',
				mapping : 'changeAttributeNewValue'
			}, {
				name: 'infoType',
				mapping: 'infoType'
			}]);
	
	
			var historyListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, historyListRecord);
	
			var historyListStore = new Ext.data.GroupingStore({//XmlStore
				autoDestroy: false,
				storeId: 'historyListStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'getApplicationHistory',
					timeout: 120000,
					reader: historyListReader
				}),
				
				fields: [ 'id', 'tableId', 'ciId', 'datetime', 'changeSource', 'changeDBUser', 'changeUserCWID', 'changeUserName', 'changeAttributeNewValue', 'changeAttributeOldValue', 'infoType'],

				reader: historyListReader,
				groupField: 'infoType'
			});
			
			return historyListStore;
		},
		
		createCiTypeListStore: function(shortlist) {
			var ciTypeListStore = new Ext.data.ArrayStore(
			{
				storeId: 'ciTypeListStore',
				fields : ['id', 'text', 'ciTypeId', 'ciSubTypeId', 'sortId'],
				idIndex: 0,
				data : (shortlist?ciTypeShortData:ciTypeData)
			});
			
			return ciTypeListStore;
			
		},
		
		createDwhEntityListStore: function() {
			var dwhEntityListRecord = Ext.data.Record.create([
		        {name: 'ciId'},
		        {name: 'ciType'},
		        {name: 'ciName'},
		        {name: 'dwhEntityId'},
		        {name: 'ciAlias'},
		        {name: 'tableId'},
		        {name: 'ciOwner'},
		        {name: 'ciOwnerDelegate'},
		        {name: 'appOwner'},
		        {name: 'appOwnerDelegate'},
		        {name: 'appSteward'},
		        {name: 'operationalStatus'},
		        {name: 'categoryIt'},
		        {name: 'gxpRelevance'},
		        {name: 'itSet'},
		        {name: 'serviceContract'},
		        {name: 'severityLevel'},
		        {name: 'priorityLevel'},
		        {name: 'sla'},
		        {name: 'lifecycleStatus'},
		        {name: 'source'},
		        {name: 'businessEssential'},
		        {name: 'template'}
		    ]);
		
		    var dwhEntityListReader = new Ext.data.XmlReader({
		    	record: 'dwhEntityDTO',//return ciTypeDTO
		    	totalProperty: 'total',
		        idProperty: 'ciId',
		        	
		        fields: ['ciId', 'ciType', 'ciName', 'ciAlias', 'dwhEntityId', 'tableId', 'ciOwner', 'ciOwnerDelegate', 'appOwner', 'appOwnerDelegate', 'appSteward', 'operationalStatus', 'categoryIt', 'gxpRelevance', 'itSet', 'serviceContract', 'severityLevel', 'priorityLevel', 'sla', 'lifecycleStatus', 'source', 'businessEssential', 'template']
		    }, dwhEntityListRecord); 
			
		    var dwhEntityListStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: ['ciId', 'ciType', 'ciName', 'ciAlias', 'dwhEntityId', 'tableId', 'ciOwner', 'ciOwnerDelegate', 'appOwner', 'appOwnerDelegate', 'appSteward', 'operationalStatus', 'categoryIt', 'gxpRelevance', 'itSet', 'serviceContract', 'severityLevel', 'priorityLevel', 'sla', 'lifecycleStatus', 'source', 'businessEssential', 'template'],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/CiEntityWSPort',
		      		loadMethod: 'findByTypeAndName',
		      		timeout: 120000,
		      		reader: dwhEntityListReader
		      	}),
		    	
		      	reader: dwhEntityListReader
		    });
		    
		    return dwhEntityListStore;
		},
		
		//====================== initial stores ====================== 
		
		createAclStore: function() {
			var aclStore = new Ext.data.XmlStore({
			    autoLoad: false,//false true
			    storeId: 'aclStore',
			    //url: 'conf/AttributeProperties.xml',
			    data: Util.String2XML(conf_AttributeProperties_xml),

			    record: 'Identifier', // records will have an 'Identifier' tag
			    
			    fields: [ 'id', 'ciTypeId', 'ciSubTypeId', 'Mandatory', 'Relevance', 'EditableIfSource', 'attributeType', 'attributeLength', 'attributeMask', 'UseInWizard', 'rolesAllowed' ]//restrictionLevel
			});
			
			return aclStore;
		},
		
		createDedicatedListStore: function() {
			var dedicatedListRecord = Ext.data.Record.create([
			     { name: 'text', mapping: 'dedicatedTxt' },
			     { name: 'id', mapping: 'dedicatedId' }
			]);
			
			var dedicatedListReader = new Ext.data.XmlReader({
			    record: 'return',
			    idProperty: 'id'
			}, dedicatedListRecord); 
			
			var dedicatedListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'dedicatedListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AIRToolsWSPort',
					loadMethod: 'getDedicatedList',
					timeout: 120000,
					reader: dedicatedListReader
				}),
				
				fields: [ 'id', 'text' ],

				reader: dedicatedListReader
			});
			
			return dedicatedListStore;
		},
		
		createOrganisationalScopeListStore: function() {
			var organisationalScopeListStore = new Ext.data.ArrayStore(
				{
					storeId: 'organisationalScopeListStore',
					fields : ['id', 'name'],
					idIndex: 0,
					data : oScopeData
				});
			
			return organisationalScopeListStore;
 		},
		
		createLoadClassListStore: function() {
			var loadClassListStore = new Ext.data.ArrayStore(
			{
				storeId: 'loadClassListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : loadClassData
			});
		
			return loadClassListStore;
		},
		
		createServiceModelListStore: function() {
			var serviceModelListStore = new Ext.data.ArrayStore(
			{
				storeId: 'serviceModelListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : serviceModelData
			});
		
			return serviceModelListStore;
		},

		createApplicationProcessStore: function() {
			var applicationProcessRecord = Ext.data.Record.create([
			    { name: 'id' },
			    { name: 'text' }
			]);
			
			var applicationProcessReader = new Ext.data.XmlReader({
				record: 'viewdataDTO'
			}, applicationProcessRecord);
			
			var applicationProcessStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationProcessStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'getApplicationProcess',
					timeout: 120000,
					reader: applicationProcessReader
				}),
	
				fields: [ 'id', 'text' ],
				reader: applicationProcessReader
			});
			
			return applicationProcessStore;
		},
		
		//====================== store refacs ======================
		createGxpFlagListStore: function() {
			var gxpFlagListStore = new Ext.data.ArrayStore(
			{
				storeId: 'gxpFlagListStore',
				fields : ['id', 'text'],
				idIndex: 0,
				data : gxpFlagData
			});
		
			return gxpFlagListStore;
		},
		//====================== store refacs ======================
			
		

		
		createCiItemListStore: function() {
			var ciItemListRecord = Ext.data.Record.create([
			    {name: 'id'},
			    {name: 'name'},
			    {name: 'alias'},
			    {name: 'applicationCat1Txt'},
			    {name: 'applicationCat2Txt'},
			    {name: 'location'},
			    {name: 'isTemplate'},
			    {name: 'ciOwner'},
			    {name: 'ciOwnerDelegate'},
			    {name: 'applicationOwner'},
			    {name: 'applicationSteward'},
			    {name: 'applicationOwnerDelegate'},
			    {name: 'tableId'},
			    {name: 'deleteQuelle'}
			]);
	
			var ciItemListReader = new Ext.data.XmlReader({
			    totalProperty: 'countResultSet',
			    record: 'ciItemDTO',
			    idProperty: 'id'
			}, ciItemListRecord); 
	
			var ciItemListStore = new Ext.data.GroupingStore({//XmlStore
			    autoDestroy: true,
			    autoLoad: false,
			    remoteSort: true,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/CiEntityWSPort',
					loadMethod: 'findCis',
					timeout: 120000,
					reader: ciItemListReader
				}),
				
				reader: ciItemListReader//zum Sortieren !!
			});
			
			return ciItemListStore;
		},
		
		createApplicationListStore: function() {
			var applicationListRecord = Ext.data.Record.create([
			    'id',//applicationId
			    'name',//applicationName
			    'alias',//applicationAlias
			    'applicationCat1Txt',
			    'applicationCat2Txt',
			    'ciOwner',//responsible
			    'ciOwnerDelegate',//subResponsible
			    'applicationOwner',
			    'applicationSteward',
			    'applicationOwnerDelegate',
			    'tableId',
			    'deleteQuelle'
			]);
	
			var applicationListReader = new Ext.data.XmlReader({
			    totalProperty: 'countResultSet',
			    record: 'applicationDTO',
			    idProperty: 'id'//applicationId
			}, applicationListRecord); 
	
			var applicationListStore = new Ext.data.GroupingStore({//XmlStore
			    autoDestroy: true,
			    autoLoad: false,
			    remoteSort: true,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/ApplicationWSPort',
					loadMethod: 'findApplications',
					timeout: 120000,
					reader: applicationListReader
				}),
				
				reader: applicationListReader
			});
			
			return applicationListStore;
		},
		
		createApplicationStore: function() {
			var applicationDetailRecord = Ext.data.Record.create([{
				name: 'applicationId',
				mapping: 'applicationDTO > applicationId'
			}, {
				name: 'barApplicationId',
				mapping: 'applicationDTO > barApplicationId'
			}, {
				name: 'name',
				mapping: 'applicationDTO > name'
			}, {
				name: 'alias',
				mapping: 'applicationDTO > alias'
			}, {
				name: 'itsecGroupId',
				mapping: 'applicationDTO > itsecGroupId'
			}]);
			
			var applicationReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationRecord);

			var applicationStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod : 'getApplication',
					timeout: 120000,
					reader: applicationDetailReader
				}),
				
				reader: applicationReader
			});
			
			return applicationStore;
		},
		
		createSchrankListStore: function() {
			var record = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name'
 			]);

 			var reader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'
 			}, record);

 			var store = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'schrankListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/SchrankWSPort',
 					loadMethod: 'findSchrankByRoomId',
 					timeout: 120000,
 					reader: reader
 				})
 			});
 			
 			return store;
 		},
		
		createRoomListStore: function() {
			var record = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name'
 			]);

 			var reader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'//return keyValueDTO
 			}, record);

 			var store = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'roomListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/RoomWSPort',
 					loadMethod: 'findRoomsByBuildingAreaId',
 					timeout: 120000,
 					reader: reader
 				})
 			});
 			
 			return store;
 		},
		
 		createRoomListStoreFromBuildingId: function() {
			var record = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name'
 			]);

 			var reader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'//return keyValueDTO
 			}, record);

 			var store = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'roomListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/RoomWSPort',
 					loadMethod: 'findRoomsByBuildingId',
 					timeout: 120000,
 					reader: reader
 				})
 			});
 			
 			return store;
 		},
 		
 		createBuildingAreaListStore: function() {
			var record = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name'
 			]);

 			var reader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'//return keyValueDTO
 			}, record);

 			var store = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'buildingAreaListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/BuildingWSPort',
 					loadMethod: 'findBuildingAreasByBuildingId',
 					timeout: 120000,
 					reader: reader
 				})
 			});
 			
 			return store;
 		},
		
 		createBuildingListStore: function() {
			var record = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name'
 			    
 			]);

 			var reader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'//return keyValueDTO
 			}, record);

 			var store = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'buildingListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/BuildingWSPort',
 					loadMethod: 'findBuildingsByTerrainId',
 					timeout: 120000,
 					reader: reader
 				})
 			});
 			
 			return store;
 		},
 		
 		createBuildingListStoreFromSiteId: function() {
			var record = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name'
 			    
 			]);

 			var reader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'//return keyValueDTO
 			}, record);

 			var store = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'buildingListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/BuildingWSPort',
 					loadMethod: 'findBuildingsBySiteId',
 					timeout: 120000,
 					reader: reader
 				})
 			});
 			
 			return store;
 		},
		
 		createTerrainListStore: function() {
			var record = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name'
 			]);

 			var reader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'//return keyValueDTO
 			}, record);

 			var store = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'terrainListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/TerrainWSPort',
 					loadMethod: 'findTerrainsBySiteId',
 					timeout: 120000,
 					reader: reader
 				})
 			});
 			
 			return store;
 		},
 		
		
		createSiteListStore: function() {
			var siteRecord = Ext.data.Record.create([
 			    { name: 'id', type: 'int' },
 			    'name',
 			    'nameEn'
 			]);

 			var siteReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'//return keyValueEnDTO
 			}, siteRecord);

 			var siteStore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'siteListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/StandortWSPort',
 					loadMethod: 'findSitesByLandId',
 					timeout: 120000,
 					reader: siteReader
 				})
 			});
 			
 			return siteStore;
 		},

 		
		createLandListStore: function() {
			var landRecord = Ext.data.Record.create([
			    { name: 'id', type: 'int' },
			    { name: 'itSetId', type: 'int' },
			    'locale',
			    'name',
			    'nameEn'
			]);

			var landReader = new Ext.data.XmlReader({
				idProperty: 'id',
				record: 'return'
			}, landRecord);

			var landStore = new Ext.data.XmlStore({
				autoDestroy: true,
				autoLoad: false,
				storeId: 'landListStore',
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/AIRToolsWSPort',
					loadMethod: 'getLaender',
					timeout: 120000,
					reader: landReader
				}),
				
				fields: [ 'id', 'itSetId', 'locale', 'name', 'nameEn' ]
			});
			
			return landStore;
		},
		
		createCiDetailStore: function(tableId) {
			var ciDetailStore = null;
			
			switch(tableId) {
				case AC.TABLE_ID_APPLICATION:
					ciDetailStore = this.createApplicationDetailStore();
					break;
				case AC.TABLE_ID_ROOM:
					ciDetailStore = this.createRoomDetailStore();
					break;
				case AC.TABLE_ID_BUILDING:
					ciDetailStore = this.createGebaeudeDetailStore();
					break;
				case AC.TABLE_ID_BUILDING_AREA:
					ciDetailStore = this.createBuildingAreaDetailStore();
					break;
				case AC.TABLE_ID_POSITION:
					ciDetailStore = this.createSchrankDetailStore();
					break;
				case AC.TABLE_ID_TERRAIN:
					ciDetailStore = this.createTerrainDetailStore();
					break;
				case AC.TABLE_ID_SITE:
					ciDetailStore = this.createStandortDetailStore();
					break;
				case AC.TABLE_ID_IT_SYSTEM:
					ciDetailStore = this.createItSystemDetailStore();
					break;
				case AC.TABLE_ID_PATHWAY://Added by vandana
					ciDetailStore = this.createPathwayDetailStore();////Added by vandana
				 break;
				case AC.TABLE_ID_FUNCTION:
					ciDetailStore = this.createFunctionDetailStore();
				default: break;
				}
			
			return ciDetailStore;
		},
		
		createItSystemDetailStore: function() {
			var itSystemRecord = AIR.AirConfigFactory.createItSystemCiRecord();

			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, itSystemRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'itSystemStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getItSystem',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		

		createGebaeudeDetailStore: function() {
			var gebaeudeRecord = AIR.AirConfigFactory.createBuildingCiRecord();

			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, gebaeudeRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciBuildingStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getBuilding',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		
		createBuildingAreaDetailStore: function() {
			var ciDetailRecord = AIR.AirConfigFactory.createBuildingAreaCiRecord();//new AIR.CiLocationRecord();

			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, ciDetailRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciBuildingAreaStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getBuildingArea',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		
		createRoomDetailStore: function() {
			var ciDetailRecord = AIR.AirConfigFactory.createRoomCiRecord();
			
			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'//return room
			}, ciDetailRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciRoomStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getRoom',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		
		createSchrankDetailStore: function() {
			var ciDetailRecord = AIR.AirConfigFactory.createSchrankCiRecord();

			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, ciDetailRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciSchrankStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getSchrank',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		
		createStandortDetailStore: function() {
			var ciDetailRecord = AIR.AirConfigFactory.createStandortCiRecord();

			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, ciDetailRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciStandortStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getStandort',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		
		createTerrainDetailStore: function() {
			var ciDetailRecord = AIR.AirConfigFactory.createTerrainCiRecord();

			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, ciDetailRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciTerrainStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getTerrain',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		
		createFunctionDetailStore: function(){
			
			var ciDetailRecord = AIR.AirConfigFactory.createFunctionCiRecord();
			
			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, ciDetailRecord);
			
			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciFunctonStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getFunction',
					timeout: 120000,
					reader: ciDetailReader					
				})
			});
			
			return ciDetailStore;
			
		},
		//Added by vandana
		createPathwayDetailStore: function() {
			var ciDetailRecord = AIR.AirConfigFactory.createPathwayCiRecord();

			var ciDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, ciDetailRecord);

			var ciDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'ciPathwayStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'getWays',
					timeout: 120000,
					reader: ciDetailReader
				})
			});
			
			return ciDetailStore;
		},
		//Added by vandana
		
		createApplicationDetailStore: function() {
			var applicationDetailRecord = Ext.data.Record.create([{
				name : 'id',//applicationId
				mapping : 'applicationDTO > id'
			}, {
				name : 'barApplicationId',
				mapping : 'applicationDTO > barApplicationId'
			}, {
				name : 'barRelevance',
				mapping : 'applicationDTO > barRelevance'
			}, {
				name : 'name',//applicationName
				mapping : 'applicationDTO > name'
			}, {
				name : 'alias',//applicationAlias
				mapping : 'applicationDTO > alias'
			}, {
				name : 'categoryBusinessId',
				mapping : 'applicationDTO > categoryBusinessId'
			}, {
				name : 'categoryBusiness',
				mapping : 'applicationDTO > categoryBusiness'
			}, {
				name : 'dataClassId',
				mapping : 'applicationDTO > classDataId'
			}, {
				name : 'dataClass',
				mapping : 'applicationDTO > classData'
			}, {
				name : 'applicationCat1Id',
				mapping : 'applicationDTO > applicationCat1Id'
			}, {
				name : 'applicationCat1Txt',
				mapping : 'applicationDTO > applicationCat1Txt'
			}, {
				name : 'applicationCat2',
				mapping : 'applicationDTO > applicationCat2Id'
			}, {
				name : 'applicationCat2Txt',
				mapping : 'applicationDTO > applicationCat2Txt'
			}, {
				name : 'lifecycleStatusId',
				mapping : 'applicationDTO > lifecycleStatusId'
			}, {
				name : 'lifecycleStatusTxt',
				mapping : 'applicationDTO > lifecycleStatusTxt'
			}, {
				name : 'organisationalScope',
				mapping : 'applicationDTO > organisationalScope'
			}, {
				name : 'operationalStatusId',
				mapping : 'applicationDTO > operationalStatusId'
			}, {
				name : 'operationalStatusTxt',
				mapping : 'applicationDTO > operationalStatusTxt'
			}, {
				name : 'ciOwner',//ciResponsible ciOwner
				mapping : 'applicationDTO > ciOwner'//responsible
			}, {
				name : 'ciOwnerHidden',//ciResponsibleHidden ciOwnerHidden
				mapping : 'applicationDTO > ciOwnerHidden'//responsibleHidden
			}, {
				name : 'ciOwnerDelegate',//ciSubResponsible ciOwnerDelegate
				mapping : 'applicationDTO > ciOwnerDelegate'//subResponsible
			}, {
				name : 'ciOwnerDelegateHidden',//ciSubResponsibleHidden ciOwnerDelegateHidden
				mapping : 'applicationDTO > ciOwnerDelegateHidden'//subResponsibleHidden
			}, {
				name : 'applicationOwner',
				mapping : 'applicationDTO > applicationOwner'
			}, {
				name : 'applicationOwnerHidden',
				mapping : 'applicationDTO > applicationOwnerHidden'
			}, {
				name : 'applicationOwnerDelegate',
				mapping : 'applicationDTO > applicationOwnerDelegate'
			}, {
				name : 'applicationOwnerDelegateHidden',
				mapping : 'applicationDTO > applicationOwnerDelegateHidden'
			}, {
				name : 'applicationSteward',
				mapping : 'applicationDTO > applicationSteward'
			}, {
				name : 'applicationStewardHidden',
				mapping : 'applicationDTO > applicationStewardHidden'
			}, {
				name : 'itset',
				mapping : 'applicationDTO > itset'
			}, {
				name : 'itsetName',
				mapping : 'applicationDTO > itsetName'
			}, {
				name : 'template',
				mapping : 'applicationDTO > template'
			}, {
				name : 'isTemplateReferencedByItem',
				mapping : 'applicationDTO > templateReferencedByItem'
			},{
				name : 'templateLinkWithCIs',
				mapping : 'applicationDTO > templateLinkWithCIs'
			}, {
				name : 'relevanceGR1435',
				mapping : 'applicationDTO > relevanceGR1435'
			}, {
				name : 'relevanceGR2059',
				mapping : 'applicationDTO > relevanceGR2059'
			}, {
				name : 'relevanceGR1920',
				mapping : 'applicationDTO > relevanceGR1920'
			}, {
				name : 'relevanceGR2008',
				mapping : 'applicationDTO > relevanceGR2008'
			}, {
				name : 'ciComplianceRequestId1435',
				mapping : 'applicationDTO > ciComplianceRequestId1435'
			}, {
				name : 'ciComplianceRequestId2059',
				mapping : 'applicationDTO > ciComplianceRequestId2059'
			}, {
				name : 'ciComplianceRequestId1920',
				mapping : 'applicationDTO > ciComplianceRequestId1920'
			}, {
				name : 'ciComplianceRequestId2008',
				mapping : 'applicationDTO > ciComplianceRequestId2008'
			}, {
				name : 'gxpFlagId',
				mapping : 'applicationDTO > gxpFlagId'
			}, {
				name : 'gxpFlagTxt',
				mapping : 'applicationDTO > gxpFlagTxt'
			}, {
				name : 'itsecGroupId',
				mapping : 'applicationDTO > itsecGroupId'
			}, {
				name : 'itsecGroupTxt',
				mapping : 'applicationDTO > itsecGroup'
			}, {
				name : 'refId',
				mapping : 'applicationDTO > refId'
			}, {
				name : 'refTxt',
				mapping : 'applicationDTO > refTxt'
			}, {
				name : 'slaId',
				mapping : 'applicationDTO > slaId'
			}, {
				name : 'sla',
				mapping : 'applicationDTO > slaName'
			}, {
				name : 'serviceContractId',
				mapping : 'applicationDTO > serviceContractId'
			}, {
				name : 'serviceContract',
				mapping : 'applicationDTO > serviceContract'
			}, {
				name : 'comments',
				mapping : 'applicationDTO > comments'
			}, {
				name : 'isEditable',
				mapping : 'applicationDTO > isEditable'
			}, {
				name : 'priorityLevelId',
				mapping : 'applicationDTO > priorityLevelId'
			}, {
				name : 'priorityLevel',
				mapping : 'applicationDTO > priorityLevel'
			}, {
				name : 'severityLevelId',
				mapping : 'applicationDTO > severityLevelId'
			}, {
				name : 'severityLevel',
				mapping : 'applicationDTO > severityLevel'
			}, {
				name : 'locationPath',
				mapping : 'applicationDTO > locationPath'
			}, {
				name : 'businessEssentialId',
				mapping : 'applicationDTO > businessEssentialId'
			}, {
				name : 'businessEssential',
				mapping : 'applicationDTO > businessEssential'
			}, {
				name : 'riskAnalysisYN',
				mapping : 'applicationDTO > riskAnalysisYN'
			}, {
				name : 'licenseType',
				mapping : 'applicationDTO > licenseTypeTxt'
			}, {
				name : 'licenseTypeId',
				mapping : 'applicationDTO > licenseTypeId'
			}, {
				name : 'applicationAccessingUserCount',
				mapping : 'applicationDTO > accessingUserCount'
			}, {
				name : 'applicationAccessingUserCountMeasured',
				mapping : 'applicationDTO > accessingUserCountMeasured'
			}, {
				name : 'loadClass',
				mapping : 'applicationDTO > loadClass'
			}, {
				name : 'serviceModel',
				mapping : 'applicationDTO > serviceModel'
			}, {
				name : 'dedicated',
				mapping : 'applicationDTO > dedicated'
			},
			
			
			{
				name : 'applicationVersion',
				mapping : 'applicationDTO > version'
			}, {
				name : 'costRunPa',
				mapping : 'applicationDTO > costRunPa'
			}, {
				name : 'costChangePa',
				mapping : 'applicationDTO > costChangePa'
			}, {
				name : 'currencyId',
				mapping : 'applicationDTO > currencyId'
			}, {
				name : 'currency',
				mapping : 'applicationDTO > currencyTxt'
			}, {
				name : 'costRunAccountId',
				mapping : 'applicationDTO > costRunAccountId'
			}, {
				name : 'costRunAccountTxt',
				mapping : 'applicationDTO > costRunAccountTxt'
			}, {
				name : 'costChangeAccountId',
				mapping : 'applicationDTO > costChangeAccountId'
			}, {
				name : 'costChangeAccountTxt',
				mapping : 'applicationDTO > costChangeAccountTxt'
			}, {
				name : 'licenseUsingRegions',
				mapping : 'applicationDTO > licenseUsingRegions'
			},

			// itSec
			{
				name : 'itSecSbAvailabilityId',
				mapping : 'applicationDTO > itSecSbAvailabilityId'
			}, {
				name : 'itSecSbAvailabilityTxt',//itSecSbAvailabilityTxt itSecSbAvailabilityDescription
				mapping : 'applicationDTO > itSecSbAvailabilityTxt'//itSecSbAvailabilityTxt itSecSbAvailabilityDescription
			}, {
				name : 'itSecSbConfidentialityId',
				mapping : 'applicationDTO > itSecSbConfidentialityId'
			}, {
				name : 'itSecSbConfidentialityTxt',
				mapping : 'applicationDTO > itSecSbConfidentialityTxt'
			}, {
				name : 'classInformationId',
				mapping : 'applicationDTO > classInformationId'
			}, {
				name : 'classInformationTxt',
				mapping : 'applicationDTO > classInformationTxt'
			}, {
				name : 'protectionClassInformationExplanation',
				mapping : 'applicationDTO > classInformationExplanation'
			}, {
				name : 'protectionApplicationProtection',
				mapping : 'applicationDTO > applicationProtection'
			},


			// support stuff
			{
				name : 'supportstuffUASupportingDoc',
				mapping : 'applicationDTO > ciSupportStuffUserAuthorizationSupportedByDocumentation'
			}, {
				name : 'supportstuffUAProcess',
				mapping : 'applicationDTO > ciSupportStuffUserAuthorizationProcess'
			}, {
				name : 'supportstuffCMSupportingTool',
				mapping : 'applicationDTO > ciSupportStuffChangeManagementSupportedByTool'
			}, {
				name : 'supportstuffUMProcess',
				mapping : 'applicationDTO > supportstuffUMProcess'
			}, {
				name : 'supportstuffAppDoc',
				mapping : 'applicationDTO > ciSupportStuffApplicationDocumentation'
			}, {
				name : 'supportstuffAppRootDir',
				mapping : 'applicationDTO > ciSupportStuffRootDirectory'
			}, {
				name : 'supportstuffAppDataDir',
				mapping : 'applicationDTO > ciSupportStuffDataDirectory'
			}, {
				name : 'supportstuffAppProvidedServices',
				mapping : 'applicationDTO > ciSupportStuffProvidedServices'
			}, {
				name : 'supportstuffAppProvidedMUser',
				mapping : 'applicationDTO > ciSupportStuffProvidedMachineUsers'
			}, {
				name : 'ciSupportStuffUserManagement',
				mapping : 'applicationDTO > ciSupportStuffUserManagement'
			},

			// insert / update infos
			{
				name : 'insertQuelle',
				mapping : 'applicationDTO > insertQuelle'
			}, {
				name : 'insertTimestamp',
				mapping : 'applicationDTO > insertTimestamp'
			}, {
				name : 'insertUser',
				mapping : 'applicationDTO > insertUser'
			}, {
				name : 'updateQuelle',
				mapping : 'applicationDTO > updateQuelle'
			}, {
				name : 'updateTimestamp',
				mapping : 'applicationDTO > updateTimestamp'
			}, {
				name : 'updateUser',
				mapping : 'applicationDTO > updateUser'
			}, {
				name : 'deleteQuelle',
				mapping : 'applicationDTO > deleteQuelle'
			}, {
				name : 'deleteTimestamp',
				mapping : 'applicationDTO > deleteTimestamp'
			}, {
				name : 'deleteUser',
				mapping : 'applicationDTO > deleteUser'
			}, {
				name : 'messageTextSecureSystem',
				mapping : 'applicationDTO > messageTextSecureSystem'
			}, {
				name : 'messageText',
				mapping : 'applicationDTO > messageText'
			},

			// access rights acl
			// =================
			{
				name : 'relevanceOperational',
				mapping : 'applicationAccessDTO > relevanceOperational'
			}, {
				name : 'relevanceStrategic',
				mapping : 'applicationAccessDTO > relevanceStrategic'
			}, {
				name : 'aclBusiness_Essential_Id',
				mapping : 'applicationAccessDTO > business_Essential_Id'
			}, {
				name : 'aclGxp_Flag',
				mapping : 'applicationAccessDTO > gxp_Flag'
			}, {
				name : 'aclItsec_Gruppe_Id',
				mapping : 'applicationAccessDTO > itsec_Gruppe_Id'
			}, {
				name : 'aclItsec_SB_Integ_ID',
				mapping : 'applicationAccessDTO > itsec_SB_Integ_ID'
			}, {
				name : 'aclItsec_SB_Integ_Txt',
				mapping : 'applicationAccessDTO > itsec_SB_Integ_Txt'
			}, {
				name : 'aclItsec_SB_Verfg_ID',
				mapping : 'applicationAccessDTO > itsec_SB_Verfg_ID'
			}, {
				name : 'aclItsec_SB_Verfg_Txt',
				mapping : 'applicationAccessDTO > itsec_SB_Verfg_Txt'
			}, {
				name : 'aclItsec_SB_Vertr_ID',
				mapping : 'applicationAccessDTO > itsec_SB_Vertr_ID'
			}, {
				name : 'aclItsec_SB_Vertr_Txt',
				mapping : 'applicationAccessDTO > itsec_SB_Vertr_Txt'
			}, {
				name : 'aclLicense_Scanning',
				mapping : 'applicationAccessDTO > license_Scanning'
			}, {
				name : 'aclPriority_Level_Id',
				mapping : 'applicationAccessDTO > priority_Level_Id'
			}, {
				name : 'aclRef_Id',
				mapping : 'applicationAccessDTO > ref_Id'
			}, {
				name : 'aclRelevance_Ics',
				mapping : 'applicationAccessDTO > relevance_Ics'
			}, {
				name : 'aclRelevanz_Itsec',
				mapping : 'applicationAccessDTO > relevanz_Itsec'
			}, {
				name : 'aclResponsible',
				mapping : 'applicationAccessDTO > responsible'
			}, {
				name : 'aclSample_Test_Date',
				mapping : 'applicationAccessDTO > sample_Test_Date'
			}, {
				name : 'aclSample_Test_Result',
				mapping : 'applicationAccessDTO > sample_Test_Result'
			}, {
				name : 'aclService_Contract_Id',
				mapping : 'applicationAccessDTO > service_Contract_Id'
			}, {
				name : 'aclSeverity_Level_Id',
				mapping : 'applicationAccessDTO > severity_Level_Id'
			}, {
				name : 'aclSla_Id',
				mapping : 'applicationAccessDTO > sla_Id'
			}, {
				name : 'aclSub_Responsible',
				mapping : 'applicationAccessDTO > sub_Responsible'
			}]);

			var applicationDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationDetailRecord);

			var applicationDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationDetailStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod : 'getApplicationDetail',
					timeout: 120000,
					reader: applicationDetailReader
				}),

				reader: applicationDetailReader
			});
			
			return applicationDetailStore;
		},
		
		createApplicationCreateStore: function() {
			var applicationCreateRecord = Ext.data.Record.create([ {
					name: 'result'
				}, {
					name: 'displayMessage'
				}, {
					name: 'messages'
				}, {
					name: 'applicationId'
				}]
			);
			
			var applicationCreateReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationCreateRecord);
			
			var applicationCreateStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'appCreateStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'createApplication',
					timeout: 120000,
					reader: applicationCreateReader
				}),
				
				fields: [ 'result', 'displayMessage', 'messages' ],
	
				reader: applicationCreateReader
			});
			
			return applicationCreateStore;
		},
		
		createCiCreateStore: function(ciType) {
			return this.createCiSaveStore(ciType, true);
		},
		
		createCiSaveStore: function(ciType, isCreate) {
			var ciSaveRecord = Ext.data.Record.create(['result', 'displayMessage', 'messages', 'ciId', 'tableId', 'ciSubTypeId']);
			
			var ciSaveReader = new Ext.data.XmlReader({
				record: 'return'
			}, ciSaveRecord);
			
			var wsName;
			switch(parseInt(ciType)) {
				case AC.TABLE_ID_IT_SYSTEM:			wsName = 'ItSystem'; break;
				case AC.TABLE_ID_APPLICATION:		wsName = 'Application'; break;
				case AC.TABLE_ID_ROOM:				wsName = 'Room'; break;
				case AC.TABLE_ID_BUILDING_AREA:		//wsName = 'BuildingArea'; break;
				case AC.TABLE_ID_BUILDING:			wsName = 'Building'; break;
				case AC.TABLE_ID_SITE:				wsName = 'Standort'; break;
				case AC.TABLE_ID_POSITION:			wsName = 'Schrank'; break;
				case AC.TABLE_ID_TERRAIN:			wsName = 'Terrain'; break;
				case AC.TABLE_ID_FUNCTION:          wsName = 'Function'; break;
				case AC.TABLE_ID_PATHWAY:          wsName = 'Ways'; break;//Added by vandana
				default: wsName = 'Application'; break;
			}
	
			var url = webcontext + '/'+ wsName +'WSPort';//AC.TABLE_ID_CI_NAME[ciType]
			
			if(parseInt(ciType) === AC.TABLE_ID_BUILDING_AREA)
				wsName = 'BuildingArea';
			var loadMethod = (isCreate ? 'create' : 'save') + wsName;//AC.TABLE_ID_CI_NAME[ciType]
			
			
			var ciSaveStore = new Ext.data.XmlStore({
				autoDestroy: true,
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: url,
					loadMethod: loadMethod,
					timeout: 120000,
					reader: ciSaveReader
				})
			});
			
			return ciSaveStore;
		},
		
		createApplicationSaveStore: function() {
			var applicationSaveRecord = Ext.data.Record.create(['result', 'displayMessage', 'messages']);
	
			var applicationSaveReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationSaveRecord);
	
			var applicationSaveStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'appSaveStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'saveApplication',
					timeout: 120000,
					reader: applicationSaveReader
				}),
				
				fields: [ 'result', 'displayMessage', 'messages' ],
	
				reader: applicationSaveReader
			});
			
			return applicationSaveStore;
		},
		
	
		createApplicationByCopyStore: function() {
			var applicationByCopyRecord = Ext.data.Record.create([
			    {name: 'result'},
			    {name: 'displayMessage'},
			    {name: 'messages'},
			    {name: 'applicationId'}
	        ]);
	
	        var applicationByCopyReader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, applicationByCopyRecord); 
	
	        var applicationByCopyStore = new Ext.data.Store({//Grouping
	            autoDestroy: true,
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/ApplicationWSPort',
	        		loadMethod: 'createApplicationByCopy',
	        		timeout: 120000,
	        		reader: applicationByCopyReader
	        	}),
	        	
	        	fields: [ 'result', 'displayMessage', 'messages' ],
	        	
	        	reader: applicationByCopyReader
	        });
	        
	        return applicationByCopyStore;
		},
		
		createComplianceControlsStore: function() {
			//return record
			var complianceControls = Ext.data.Record.create([
			    {name: 'complianceRequestId'},
			    {name: 'complianceControlId'},
			    {name: 'complianceControlName'},
			    {name: 'complianceControlDelTimestamp'},
			    {name: 'ciComplianceStatementId'},
			    {name: 'ciComplianceRequestId'},
			    {name: 'compliantStatus'},
			    {name: 'justification'}
	        ]);
	
	        var complianceControlsReader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, complianceControls); 
	
	        var complianceControlsStore = new Ext.data.Store({//Grouping
	            autoDestroy: true,
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/ApplicationWSPort',
	        		loadMethod: 'getComplianceControls',
	        		timeout: 120000,
	        		reader: complianceControlsReader
	        	}),
	        	
	        	//return fields
	        	fields: [ 
					'complianceRequestId', 'complianceControlId', 'complianceControlName', 'complianceControlDelTimestamp', 
					'ciComplianceStatementId', 'ciComplianceRequestId', 'compliantStatus', 'justification'
	        	],
	
	        	reader: complianceControlsReader
	        });
	        
	        return complianceControlsStore;
		},
		
		createSaveComplianceControlsStore: function() {
			//return record
			var saveComplianceControls = Ext.data.Record.create([
			    {name: 'complianceRequestId'},
			    {name: 'complianceControlId'}
	        ]);
	
	        var saveComplianceControlsReader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, saveComplianceControls); 
	
	        var saveComplianceControlsStore = new Ext.data.Store({
	            autoDestroy: true,
	            autoLoad: false,
	
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/ApplicationWSPort',
	        		loadMethod: 'saveComplianceControls',
	        		timeout: 120000,
	        		reader: saveComplianceControlsReader
	        	}),
	        	
	        	//return fields
	        	fields: [ 
					'complianceRequestId', 'complianceControlId'
	        	],
	        	
	//        	groupField: 'groupsort',
	
	        	reader: saveComplianceControlsReader
	        });
	        
	        return saveComplianceControlsStore;
		},
		
		createReferencesListStore: function() {
			var referencesListStore = new Ext.data.ArrayStore(
			{
				storeId: 'referencesListStore',
				fields : ['id' ,'name' , 'tableId', 'itsetId', 'itsecGroupId' ,'delTimestamp', 'ciKat1'],
				idIndex: 0,
				data : templateData
			});
			
	        return referencesListStore;
		},
		
		createItSecGroupListStore: function() {
			var itSecGroupListStore = new Ext.data.ArrayStore(
			{
				storeId: 'itSecGroupListStore',
				fields : ['isgid', 'id', 'name', 'itsetId', 'ciKat1', 'tableId'],
				idIndex: 0,
				data : itsecGroupData
			});
			
	        return itSecGroupListStore;
		},
		
		createItSecGroupSimpleListStore: function() {
			var itSecGroupSimpleListStore = new Ext.data.ArrayStore(
			{
				storeId: 'itSecGroupSimpleListStore',
				fields : ['id', 'name', 'ciKat1', 'tableId'],
				idIndex: 0,
				data : itsecGroupSimpleData
			});
			
	        return itSecGroupSimpleListStore;
			
		},
		
		
		createIdNameStore: function() {
		    var genericIdNameStore = new Ext.data.ArrayStore({
		      	fields: ['id', 'name'],
		      	idIndex: 0
		    });
		    
		    return genericIdNameStore;
		},
		
		createCiConnectionsStore: function() {//isUpStream
			var method = 'getDwhEntityRelations';
			
			var ciConnectionsRecord = Ext.data.Record.create([
		        {name: 'id'},
		        {name: 'ciName'},//name
		        {name: 'ciType'},//type
		        {name: 'source'},
		        {name: 'dwhEntityId'},
		        {name: 'isReferenced', type: 'boolean'}
		    ]);
		
		    var ciConnectionsReader = new Ext.data.XmlReader({
		    	record: 'dwhEntityDTO',//viewdataDTO
		        idProperty: 'dwhEntityId',//id
		        	
		        fields: ['id', 'ciName', 'ciType', 'source', 'dwhEntityId', 'isReferenced']//name type
		    }, ciConnectionsRecord);
			
		    var ciConnectionsStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/CiEntityWSPort',//ApplicationWSPort
		      		loadMethod: method,
		      		timeout: 120000,
		      		reader: ciConnectionsReader
		      	}),
		    	
		      	reader: ciConnectionsReader
		    });
		    
		    return ciConnectionsStore;
		},
		
		createConnectionPropertiesStore: function() {
			
			var store = new Ext.data.XmlStore({
			    autoLoad: false,
			    //url: 'conf/ConnectionProperties.xml',//(*9) config/ /AIR/htdocs/config/
			    data: Util.String2XML(conf_ConnectionProperties_xml),
			    // reader configs
			    record: 'Identifier',
			    fields: [ 'Source', 'Destination', 'Relevance', 'Upstream', 'Downstream' ]
			});
			
			return store;
		},
		
		
		//ItSystem Stores
		createClusterTypesListStore: function() {
			var clusterTypesListStore = new Ext.data.ArrayStore(
			{
				storeId: 'clusterTypesListStore',
				fields : ['id', 'name'],
				idIndex: 0,
				data : clusterTypeData
			});
			
	        return clusterTypesListStore;
		},
		
		createClusterCodesListStore: function() {
			var clusterCodesListStore = new Ext.data.ArrayStore(
			{
				storeId: 'clusterCodesListStore',
				fields : ['id', 'name', 'type'],
				idIndex: 0,
				data : clusterCodeData
			});
			
	        return clusterCodesListStore;
			        
		},
		
		createOsGroupsListStore: function() {
			var osGroupsListStore = new Ext.data.ArrayStore(
			{
				storeId: 'osGroupsListStore',
				fields : ['id', 'name', 'type'],
				idIndex: 0,
				data : osGroupData
			});
			
	        return osGroupsListStore;
		},
		
		createOsTypesListStore: function() {
			var osTypesListStore = new Ext.data.ArrayStore(
			{
				storeId: 'osTypesListStore',
				fields : ['osTypeId', 'osName', 'osGroup', 'itSystemType', 'licenseScanning'],
				idIndex: 0,
				data : osTypeData
			});
			
	        return osTypesListStore;
		},
		
		createOsNamesListStore: function() {
			var osNamesListStore = new Ext.data.ArrayStore(
			{
				storeId: 'osNamesListStore',
				fields : ['osNameId', 'name', 'osTypeId', 'itSystemType'],
				idIndex: 0,
				data : osNameData
			});
					
			return osNamesListStore;
		},
		
		createVirtualSoftwareListStore: function() {
			var virtualHardwareSoftwareTypesRecord = Ext.data.Record.create([
  		      	{ name: 'id', type: 'int' },
  		      	{ name: 'name' }
  		    ]);
  		
  		    var virtualHardwareSoftwareTypesReader = new Ext.data.XmlReader({
  				record: 'return',
  				idProperty: 'id'
  		    }, virtualHardwareSoftwareTypesRecord); 
  		
  		    var virtualHardwareSoftwareTypesStore = new Ext.data.XmlStore({
  		    	autoDestroy: true,
  				autoLoad: false,
  				storeId: 'virtualSoftwareListStore',
  				
  		      	proxy: new Ext.ux.soap.SoapProxy({
  		      		url: webcontext +'/AIRToolsWSPort',
  		      		loadMethod: 'getVirtualHardwareSoftwareTypes',
  		      		timeout: 120000,
  		      		reader: virtualHardwareSoftwareTypesReader
  		      	}),
  		      	fields: [ 'id', 'name' ]
  		    });
  		    
  		    return virtualHardwareSoftwareTypesStore;
		},
		
		createItSystemPrimaryFunctionsListStore: function() {
			var virtualHardwareSoftwareTypesRecord = Ext.data.Record.create([
  		      	{ name: 'id', type: 'int' },
  		      	{ name: 'name' }
  		    ]);
  		
  		    var virtualHardwareSoftwareTypesReader = new Ext.data.XmlReader({
  				record: 'return',
  				idProperty: 'id'
  		    }, virtualHardwareSoftwareTypesRecord); 
  		
  		    var virtualHardwareSoftwareTypesStore = new Ext.data.XmlStore({
  		    	autoDestroy: true,
  				autoLoad: false,
  				storeId: 'itSystemPrimaryFunctionsListStore',
  				
  		      	proxy: new Ext.ux.soap.SoapProxy({
  		      		url: webcontext +'/AIRToolsWSPort',
  		      		loadMethod: 'getItSystemPrimaryFunctions',
  		      		timeout: 120000,
  		      		reader: virtualHardwareSoftwareTypesReader
  		      	}),
  		      	fields: [ 'id', 'name' ]
  		    });
  		    
  		    return virtualHardwareSoftwareTypesStore;
		},
		
		createItSystemLicenseScanningsListStore: function() {
			var itSystemLicenseScanningsRecord = Ext.data.Record.create([
  		      	{ name: 'id', type: 'int' },
  		      	{ name: 'name' }
  		    ]);
  		
  		    var itSystemLicenseScanningsReader = new Ext.data.XmlReader({
  				record: 'return',
  				idProperty: 'id'
  		    }, itSystemLicenseScanningsRecord); 
  		
  		    var itSystemLicenseScanningsStore = new Ext.data.XmlStore({
  		    	autoDestroy: true,
  				autoLoad: false,
  				storeId: 'itSystemLicenseScanningsListStore',
  				
  		      	proxy: new Ext.ux.soap.SoapProxy({
  		      		url: webcontext +'/AIRToolsWSPort',
  		      		loadMethod: 'getItSystemLicenseScannings',
  		      		timeout: 120000,
  		      		reader: itSystemLicenseScanningsReader
  		      	}),
  		      	fields: [ 'id', 'name' ]
  		    });
  		    
  		    return itSystemLicenseScanningsStore;
		},
		






		createSisoogleSourceListStore: function() {
			var sisoogleSourceListStore = new Ext.data.ArrayStore(
			{
				storeId: 'sisoogleSourceListStore',
				fields : ['id', 'name'],
				idIndex: 0,
				data : interfacesData
			});
			
	        return sisoogleSourceListStore;
		},












		






























		createLinkCiTypeListStore: function() {
			var linkCiTypeListRecord = Ext.data.Record.create([
		      	{ name: 'id' },
		      	{ name: 'type' },
		      	{ name: 'language' },
		      	{ name: 'tableId' }
		    ]);
		
		    var linkCiTypeListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
		    }, linkCiTypeListRecord);
		
		    var linkCiTypeListStore = new Ext.data.XmlStore({
				autoLoad: false,
				storeId: 'linkCiTypeListStore',
				
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getLinkCITypeList',
		      		timeout: 120000,
		      		reader: linkCiTypeListReader
		      	}),
		      	fields: [ 'id', 'type', 'language', 'tableId' ],	
		      	reader: linkCiTypeListReader
		    });
		    
		    return linkCiTypeListStore;
		},
		
		createLinkCiListStore: function() {
			var linkCiListRecord = Ext.data.Record.create([
		      	{ name: 'id' },
		      	{ name: 'name' },
		      	{ name: 'subTypeId' },
		      	{ name: 'sort' }
		    ]);
		
		    var linkCiListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
		    }, linkCiListRecord);
		
		    var linkCiListStore = new Ext.data.XmlStore({
				autoLoad: false,
				storeId: 'linkCiListStore',
				
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getLinkCIList',
		      		timeout: 120000,
		      		reader: linkCiListReader
		      	}),
		      	fields: [ 'id', 'name', 'sort', 'subTypeId' ],
	
		      	reader: linkCiListReader
		    });
		    
		    return linkCiListStore;
		},
		
		//==============================================================================================================================
		
		createItsecMassnahmenStore: function(language) {
			var statusWertDisplayField = language == 'EN' ? 'statusWertEn' : 'statusWert';
			
			var itsecMassnahmenRecord = Ext.data.Record.create([
		        'ident', 'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'massnahmeTitel', 'statusWert', 'statusWertEn', 'zobId', 'massnahmeLink', 'chocoMerkmal'
		    ]);
		
		    var itsecMassnahmenReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmenDTO',
		        idProperty: 'itsecMassnahmenStatusId'
		    }, itsecMassnahmenRecord); 
			
		    var itsecMassnahmenStore = new Ext.data.GroupingStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getItsecMassnahmen',
		      		timeout: 120000,
		      		reader: itsecMassnahmenReader
		      	}),
		    	
		      	reader: itsecMassnahmenReader,
		      	
		      	groupField: statusWertDisplayField
		    });
		    
		    return itsecMassnahmenStore;
		},
		
		createItsecMassnahmeDetailStore: function() {
			var itsecMassnahmeDetailRecord = Ext.data.Record.create([
		        'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapResponsibleHidden','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'chmgRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId'
		    ]);
			
		    var itsecitsecMassnahmeDetailReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmeDetailDTO',
		        idProperty: 'itsecMassnahmenStatusId'
		    }, itsecMassnahmeDetailRecord); 
			
		    var itsecMassnahmeDetailStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: [ 'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapResponsibleHidden','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'chmgRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId' ],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getItsecMassnahmeDetail',
		      		timeout: 120000,
		      		reader: itsecitsecMassnahmeDetailReader
		      	}),
		    	
		      	reader: itsecitsecMassnahmeDetailReader
		    });
		    
		    return itsecMassnahmeDetailStore;
		},
		
		createItsecMassnahmenDetailsSaveStore: function() {
			var itsecMassnahmenDetailsSaveRecord = Ext.data.Record.create([
	 	        'result'
	 	    ]);
	 	
	 	    var itsecMassnahmenDetailsSaveReader = new Ext.data.XmlReader({
	 	    	record: 'return'
	 	    }, itsecMassnahmenDetailsSaveRecord); 
	 		
	 	    var itsecMassnahmenDetailsSaveStore = new Ext.data.XmlStore({
	 	    	autoDestroy: true,
	 	    	autoLoad: false,
	 	    	
	 	      	fields: [ 'result' ],
	 	      	
	 	      	proxy: new Ext.ux.soap.SoapProxy({
	 	      		url: webcontext + '/ItsecMassnahmenWSPort',
	 	      		loadMethod: 'saveItsecMassnahmenDetails',
	 	      		timeout: 120000,
	 	      		reader: itsecMassnahmenDetailsSaveReader
	 	      	}),
	 	    	
	 	      	reader: itsecMassnahmenDetailsSaveReader
	 	    });
	 	    
	 	    return itsecMassnahmenDetailsSaveStore;
		},
		
		createItsecMassnahmenDetailCompleteSaveStore: function() {
			var itsecMassnahmenDetailCompleteSaveRecord = Ext.data.Record.create([
	 	        'result'
	 	    ]);
	 	
	 	    var itsecMassnahmenDetailCompleteSaveReader = new Ext.data.XmlReader({
	 	    	record: 'return'
	 	    }, itsecMassnahmenDetailCompleteSaveRecord); 
	 		
	 	    var itsecMassnahmenDetailCompleteSaveStore = new Ext.data.XmlStore({
	 	    	autoDestroy: true,
	 	    	autoLoad: false,
	 	    	
	 	      	fields: [ 'result' ],
	 	      	
	 	      	proxy: new Ext.ux.soap.SoapProxy({
	 	      		url: webcontext + '/ItsecMassnahmenWSPort',
	 	      		loadMethod: 'saveItsecMassnahmenDetailComplete',
	 	      		timeout: 120000,
	 	      		reader: itsecMassnahmenDetailCompleteSaveReader
	 	      	}),
	 	    	
	 	      	reader: itsecMassnahmenDetailCompleteSaveReader
	 	    });
	 	    
	 	    return itsecMassnahmenDetailCompleteSaveStore;
		},
		
		/**
		 * Tabelle: ITSEC_MASSN_STWERT
		 */
		createItsecMassnahmenStatusWerteStore: function() {
			var itsecMassnahmenStatusWerteRecord = Ext.data.Record.create([
	             'itsecMassnahmenWertId', 'statusWert', 'statusWertEn'
		    ]);
		
		    var itsecMassnahmenStatusWerteReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmenStatusWerteDTO',
		        idProperty: 'itsecMassnahmenWertId'
		    }, itsecMassnahmenStatusWerteRecord);
			
		    var itsecMassnahmenStatusWerteStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: [ 'itsecMassnahmenWertId', 'statusWert', 'statusWertEn' ],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getItsecMassnahmenStatusWerte',
		      		timeout: 120000,
		      		reader: itsecMassnahmenStatusWerteReader
		      	}),
		    	
		      	reader: itsecMassnahmenStatusWerteReader
		    });
		    
		    return itsecMassnahmenStatusWerteStore;
		},
		
		createItsecMassnahmenGapClassListStore: function() {
			var itsecMassnahmenGapClassStore = new Ext.data.ArrayStore(
					{
						storeId: 'itsecMassnahmenGapClassStore',
						fields : ['gapPriority', 'gapClassTextDE', 'gapClassTextEN'],
						idIndex: 0,
						data : gapClassData
					});
		    
		    return itsecMassnahmenGapClassStore;
		},
		
		createLinkedMassnahmeDetailListStore: function() {
			var itsecMassnahmeDetailRecord = Ext.data.Record.create([
		        'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapResponsibleHidden','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'chmgRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId'
		    ]);
			
		    var itsecMassnahmeDetailReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmeDetailDTO',
		        idProperty: 'itsecMassnahmenStatusId'
		    }, itsecMassnahmeDetailRecord); 
			
		    var itsecMassnahmeDetailStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: [ 'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapResponsibleHidden','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'chmgRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId' ],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getLinkedMassnahmeDetail',
		      		timeout: 120000,
		      		reader: itsecMassnahmeDetailReader
		      	}),
		    	
		      	reader: itsecMassnahmeDetailReader
		    });
		    
		    return itsecMassnahmeDetailStore;
		},
		
		/*createCurrencyStore: function() {
			var currencyRecord = Ext.data.Record.create([
	 	        'currencyId', 'currencyName', 'currencySymbol'
	        ]);
			
			var currencyReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'currencyId'
			}, currencyRecord); 
			
			var currencyStore = new Ext.data.XmlStore({
				storeId: 'currencyStore',
				autoLoad: false,
				
			   	proxy: new Ext.ux.soap.SoapProxy({
			   		url: webcontext +'/AIRToolsWSPort',
			   		loadMethod: 'getCurrencyList',
			   		timeout: 120000,
			   		reader: currencyReader
			   	}),
			   	
			   	fields: [ 'currencyId', 'currencyName', 'currencySymbol' ],
	
			   	reader: currencyReader
			});
			
			currencyStore.load();
			
			return currencyStore;
		},*/
		
		createCiDeleteStore: function() {
			var record = Ext.data.Record.create([
			    {name: 'result'},
			    {name: 'displayMessage'},
			    {name: 'messages'},
			    {name: 'ciId'}
	        ]);
	
	        var reader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, record); 
	
	        var store = new Ext.data.Store({
	            autoDestroy: true,
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/CiEntityWSPort',
	        		loadMethod: 'deleteCi',
	        		timeout: 120000,
	        		reader: reader
	        	}),
	        	
	        	fields: [ 'result', 'displayMessage', 'messages' ],
	        	
	
	        	reader: reader
	        });
	        
	        return store;
		},
		
		createObjectAliasAllowedStore: function() {
			var objectAliasAllowedRecord = Ext.data.Record.create([
			    { name: 'countResultSet' },
			    { name: 'informationText' }
	        ]);
	
			var objectAliasAllowedReader = new Ext.data.XmlReader({
	             record: 'return'
			}, objectAliasAllowedRecord);
			
			var objectAliasAllowedStore = new Ext.data.XmlStore({
			    autoDestroy: false,
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'checkAllowedApplicationName',
					timeout: 120000,
					reader: objectAliasAllowedReader
				}),
				
				baseParams: { query: '' },
				fields: [ 'countResultSet', 'informationText' ],
				reader: objectAliasallowedReader
			});
			
			return objectAliasAllowedStore;
		},
		
		createObjectNameAllowedStore: function() {
			var objectNameAllowedRecord = Ext.data.Record.create([
	             { name: 'countResultSet' },
			     { name: 'informationText' }
	        ]);
	
	        var objectNameAllowedReader = new Ext.data.XmlReader({
	            record: 'return'
	        }, objectNameAllowedRecord); 
	
	        var objectNameAllowedStore = new Ext.data.XmlStore({
	            autoDestroy: false,
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/ApplicationWSPort',
	        		loadMethod: 'checkAllowedApplicationName',
	        		timeout: 120000,
	        		reader: objectNameAllowedReader
	        	}),
	        	
	        	baseParams: { query: '' },
	        	fields: ['countResultSet', 'informationText'],
	
	        	reader: objectNameAllowedReader
	        });
	        
	        return objectNameAllowedStore;
		},
		
		createPersonPickerStore: function() {
			var personPickerRecord = Ext.data.Record.create([{
				name: 'cwid',
				mapping: 'cwid'
			}, {
				name: 'lastname',
				mapping: 'lastname'
			}, {
				name: 'firstname',
				mapping: 'firstname'
			}]);
	
			var personPickerRecordReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'cwid'
			}, personPickerRecord);
	
			var personPickerStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'personPickerStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/PersonsWSPort',
					loadMethod: 'findPersonsByCWID',
					timeout: 120000,
					reader: personPickerRecordReader
				}),
				
				fields: [ 'cwid', 'firstname', 'lastname' ],

				reader: personPickerRecordReader,
				
				baseParams: {
					cwid: '',
					primaryCWID: 'Y'
				}
			});
			
			return personPickerStore;
		},
		
		createGroupPickerStore: function() {
			var groupPickerStoreRecord = Ext.data.Record.create([
	       		{name: 'groupname', mapping: 'groupName'},
	       		{name: 'groupid', mapping: 'groupId'},
	       		{name: 'managercwid', mapping: 'managerCwid'}
	       	]);
	
			var groupPickerRecordReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'groupid'
			}, groupPickerStoreRecord); 
	
			var groupPickerStore = new Ext.data.XmlStore({
	           autoDestroy: true,
	           storeId: 'groupPickerStore',
	           autoLoad: false,
	           
		       	proxy: new Ext.ux.soap.SoapProxy({
		       		url: webcontext +'/GroupsWSPort',
		       		loadMethod: 'findGroups',
		       		timeout: 120000,
		       		reader: groupPickerRecordReader
		       	}),
	       	
		       	fields: [ 'groupname', 'groupid', 'managercwid' ],
	
		       	reader: groupPickerRecordReader
			});
			
			return groupPickerStore;
		},
		
		createRemovePickerStore: function() {
			var removePickerStore = new Ext.data.ArrayStore({
				idIndex: 0,
				storeId: 'removePickerStore',
				fields: [ 'id', 'hidden', 'value' ]
			});
			
			return removePickerStore;
		},
		
		createRecordPickerStore: function() {
			var recordPickerRecord = Ext.data.Record.create([
				{name: 'id'},
			    {name: 'type'}, 
			    {name: 'name'}, 
			    {name: 'alias'},
			    {name: 'responsible'},
			    {name: 'subResponsible'},
			    {name: 'category'}, 
			    {name: 'tableId'},
			    {name: 'ciId'},
			    {name: 'direction'},
			    {name: 'groupsort'}
			]);
	
			var recordPickerRecordReader = new Ext.data.XmlReader({
			    record: 'viewdataDTO',
			    idProperty: 'id'
			}, recordPickerRecord); 
	
			var recordPickerStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'recordPickerStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/CiEntityWSPort',
					loadMethod: 'findCiEntities',
					timeout: 120000,
					reader: recordPickerRecordReader
				}),
				
				fields: [ 'id','type','name','alias','responsible','subResponsible','category','tableId','ciId' ],

				reader: recordPickerRecordReader,
				baseParams: {query:''}
			});
			
			return recordPickerStore;
		},
		
		createRecordTypeStore: function() {
			var recordTypeStore = new Ext.data.ArrayStore({
				idIndex: 0,
		        fields: [ 'type', 'displayText' ],
		        
		        data: [
		            ['Process', 'Process']//['Process', 'Business Process']
//		            ['Application', 'Application'],
//		            ['Application Platform', 'Application Platform'],
//		            ['Common Service', 'Common Service'],
//		            ['Middleware', 'Middleware']
		        ]
			});
			
			return recordTypeStore;
		},
		
		getObjectAliasAllowedStore: function() {
			var objectAliasAllowedStore = AIR.AirStoreManager.getStoreByName('objectAliasAllowedStore');
			
			if(!objectAliasAllowedStore) {
				objectAliasAllowedStore = this.createObjectAliasAllowedStore();
				AIR.AirStoreManager.addStore(objectAliasAllowedStore.storeId, objectAliasAllowedStore);
			}
		     
		    return objectAliasAllowedStore;
		},
		
		createObjectAliasAllowedStore: function() {
			var objectAliasAllowedRecord = Ext.data.Record.create([
				  {name: 'countResultSet'},
				  {name: 'informationText'}
			 ]);
		
			 var objectAliasAllowedReader = new Ext.data.XmlReader({
				 record: 'return'
			 }, objectAliasAllowedRecord); 
		
			 objectAliasAllowedStore = new Ext.data.XmlStore({
				 autoDestroy: false,
				 storeId: 'objectAliasAllowedStore',
				 autoLoad: false,
				 
				 proxy: new Ext.ux.soap.SoapProxy({
					 url: webcontext +'/ApplicationWSPort',
					 loadMethod: 'checkAllowedApplicationName',
					 timeout: 120000,
					 reader: objectAliasAllowedReader
				}),
				
				baseParams: {query: ''},
				fields: ['countResultSet', 'informationText'],

				reader : objectAliasAllowedReader
			 });
			 
			return objectAliasAllowedStore;
		},
	
		getObjectNameAllowedStore: function() {
			var objectNameAllowedStore = AIR.AirStoreManager.getStoreByName('objectNameAllowedStore');
			
			if(!objectNameAllowedStore) {
				objectNameAllowedStore = this.createObjectNameAllowedStore();
			    AIR.AirStoreManager.addStore(objectNameAllowedStore.storeId, objectNameAllowedStore);
			}
		     
		    return objectNameAllowedStore;
		},
		
		createObjectNameAllowedStore: function() {
			 var objectNameAllowedRecord = Ext.data.Record.create([
				 {name: 'countResultSet'},
				 {name: 'informationText'}
			 ]);
		
			 var objectNameAllowedReader = new Ext.data.XmlReader({
				 record: 'return'
			 }, objectNameAllowedRecord); 
		
			 objectNameAllowedStore = new Ext.data.XmlStore({
				 autoDestroy: false,
				 storeId: 'objectNameAllowedStore',
				 autoLoad: false,
				 
				 proxy: new Ext.ux.soap.SoapProxy({
					 url: webcontext +'/ApplicationWSPort',
					 loadMethod: 'checkAllowedApplicationName',
					 timeout: 120000,
					 reader: objectNameAllowedReader
				}),
				
				baseParams: {query: ''},
				fields: ['countResultSet', 'informationText'],

				reader: objectNameAllowedReader
			 });
			 
			 return objectNameAllowedStore;
		},		
		
		createCheckAuthStore: function(cwid, token) {//cwid, token
			var checkAuthRecord = Ext.data.Record.create([{
				name: 'result'
			}, {
				name: 'displayMessage'
			}, {
				name: 'messages'
			}]);

			var checkAuthReader = new Ext.data.XmlReader({
				record: 'return'
			}, checkAuthRecord);
			
			var checkAuthStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'checkAuthStore',
				autoLoad: false,
				
				fields : [ 'result', 'displayMessage', 'messages' ],

				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/LDAPAuthWSPort',
					loadMethod: 'isStillLoggedIn',
					reader: checkAuthReader
				})
				
			});
			
			return checkAuthStore;
		},
		
		createSigneeListStore: function() {
			var signeeRecord = Ext.data.Record.create([
 	            'cwid', 'firstname', 'lastname'
	        ]);
	
			var signeeReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'cwid'
			}, signeeRecord); 
	
			var signeeStore = new Ext.data.XmlStore({
				autoDestroy: true,
	           	storeId: 'signeeListStore',
	           	autoLoad: false,
	           	
	       		proxy: new Ext.ux.soap.SoapProxy({
		       		url: webcontext +'/PersonsWSPort',
		       		loadMethod: 'findPersonByFunctionSignee',
		       		timeout: 120000,
		       		reader: signeeReader
		       	}),
		       	
		       	fields: [ 'cwid', 'firstname', 'lastname' ],
	
		       	reader: signeeReader
	       });
			
			return signeeStore;
		},
		createMassUpdateAttributesStore :function(){
			
			var massUpdateAttributeRecord = new Ext.data.Record.create([
                  {name: 'id' },                                                     
			      {name: 'attributeName'},
			      {name: 'attributeValue'}]);
			
			var massUpdateAttributeReader = new Ext.data.XmlReader({
				record: 'massUpdateAttributeDTO',
				idProperty: 'id'
				
			},massUpdateAttributeRecord);
			
			var massUpdateAttributesStore = new Ext.data.XmlStore({
				
				autoDestroy: true,
				storeId: 'massUpdateAttributesStoreId',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
				url: webcontext + '/CiEntityWSPort',
				loadMethod: 'getCIAttributesForMassUpdate',
				timeout: 120000,
				reader: massUpdateAttributeReader
				}),
				fields: [ 'id','attributeName','attributeValue'],
				reader: massUpdateAttributeReader
				
			});
			
			return massUpdateAttributesStore;
			
		},
		createDirectLinkCIStore :function(){
			var directLinkCIRecord = Ext.data.Record.create([
			    { name: 'id' },
			    { name: 'name' }
			     ]
			);
			var directLinkCIReader = new Ext.data.XmlReader({
				record: 'directLinkCIDTO',
				idProperty: 'id'
			},directLinkCIRecord);
			
			var directLinkCIStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'directLinkCIList',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/CiEntityWSPort',
					loadMethod: 'findAllDirectLinkCIWithTemplate',
					timeout: 120000,
					reader: directLinkCIReader
				}), 
				fields: [ 'id','name'],
				reader: directLinkCIReader
			});
			return directLinkCIStore;
		},
		createDirectLinkageCIsAnswerStore :function(){
			var directLinkageCIAnswerRecord = new Ext.data.Record.create([
			          {name: 'id'},
			          {name: 'identAndControl'},
			          {name: 'answerCIInfo'}
			          ]);
			var directLinkageCIAnswerReader = new Ext.data.XmlReader({
				record: 'directLinkageCIsAnswerDTO',
				idProperty: 'id'
			},directLinkageCIAnswerRecord);
			var directLinkageCIAnswersStore = new Ext.data.GroupingStore({
				autoDestroy: true,
				storeId: 'directLinkageCIAnswers',
				autoLoad: false,
			proxy: new Ext.ux.soap.SoapProxy({
				url: webcontext + '/ItsecMassnahmenWSPort',
				loadMethod: 'getDirectLinkageFromOtherCIsAnswer',
				timeout: 120000,
				reader: directLinkageCIAnswerReader
			}),	
			fields: [ 'id','identAndControl','answerCIInfo'],
	      	reader: directLinkageCIAnswerReader,
	      	
	      	groupField: 'identAndControl'
				
			});
			
			return directLinkageCIAnswersStore;
		},
		createMassUpdateSaveStore: function() {
			var massUpdateSaveRecord = Ext.data.Record.create([
			         {name: 'result'}, 
			         {name: 'displayMessage'}, 
			         {name: 'messages'}
			         ]);
	
			var massUpdateSaveReader = new Ext.data.XmlReader({
				record: 'return'
			}, massUpdateSaveRecord);
	
			var massUpdateSaveStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'massUpdateSaveStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/CiEntityWSPort',
					loadMethod: 'massUpdate',
					timeout: 120000,
					reader: massUpdateSaveReader
				}),
				
				fields: [ 'result', 'displayMessage', 'messages' ],
	
				reader: massUpdateSaveReader
			});
			
			return massUpdateSaveStore;
		},
		createMassUpdateComplianceControlsStore: function(){
			
			var complianceControlRecord = Ext.data.Record.create(
					[
					 {name: 'ident'},
					 {name: 'itsec_Massn_St_Id'},
					 {name: 'control'},
					 {name: 'compliance_status'},
					 ]);
			var complianceControlReader = new Ext.data.XmlReader({
				record: 'copmlianceControlDTOs',
				idProperty: 'itsec_Massn_St_Id'
			},complianceControlRecord);
			
			var massUpdateComplianceControlStore = new Ext.data.XmlStore(
					{
						autoDestroy: true,
						storeId: 'massUpdateComplianceControlsStore',
						autoLoad: false,
						
						proxy: new Ext.ux.soap.SoapProxy({
							url: webcontext + '/CiEntityWSPort',
							loadMethod: 'findAllCIComplianceControlForMassUpdate',
							timeout: 120000,
							reader: complianceControlReader
						}),
						fields: [ 'ident','itsec_Massn_St_Id', 'control', 'compliance_status' ],
						reader: complianceControlReader
					});
			return massUpdateComplianceControlStore;
		},
		createMassUpdateTemplateLinkSaveStore: function(){
			var massUpdateLinkTemplateSaveRecord = new Ext.data.Record.create([
			                 {name: 'result'},
			                 {name: 'displayMessage'},
			                 {name: 'messages'}
			        ]);
			var massUpdateLinkTemplateSaveReader = new Ext.data.XmlReader(
			{
				record: 'return'
			}, massUpdateLinkTemplateSaveRecord);
			var massUpdateLinkTemplateSaveStore = new Ext.data.XmlStore(
					{
						autoDestroy: true,
						storeId: 'massUpdateLinkTemplateSaveStore',
						autoLoad: false,
						
						proxy: new Ext.ux.soap.SoapProxy({
							url: webcontext + '/CiEntityWSPort',
							loadMethod: 'linkTemplateWithCIs',
							timeout: 12000,
							reader: massUpdateLinkTemplateSaveReader
							
						})
					});
			
			return massUpdateLinkTemplateSaveStore;		     	
			
		},
		createMassUpdateChangeAttrSaveStore: function(){
			var massUpdateChangeAttrSaveRecord = new Ext.data.Record.create([
			                 {name: 'result'},
			                 {name: 'displayMessage'},
			                 {name: 'messages'}
			        ]);
			var massUpdateChangeAttrSaveReader = new Ext.data.XmlReader(
			{
				record: 'return'
			}, massUpdateChangeAttrSaveRecord);
			var massUpdateChangeAttrSaveStore = new Ext.data.XmlStore(
					{
						autoDestroy: true,
						storeId: 'massUpdateChangeAttrSaveStore',
						autoLoad: false,
						
						proxy: new Ext.ux.soap.SoapProxy({
							url: webcontext + '/CiEntityWSPort',
							loadMethod: 'changeAttrMassUpdateSave',
							timeout: 12000,
							reader: massUpdateChangeAttrSaveReader
							
						})
					});
			
			return massUpdateChangeAttrSaveStore;		     	
			
		},
		createMassUpdateComplianceControlSaveStore : function() {
			var massUpdateComplianceControlSaveRecord = Ext.data.Record.create([ {
				name : 'result'
			}, {
				name : 'displayMessage'
			}, {
				name : 'messages'
			} ]);
			var massUpdateComplianceControlSaveReader = new Ext.data.XmlReader({
				record: 'return'
			}, massUpdateComplianceControlSaveRecord);
			
			var massUpdateComplianceControlSaveStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'massUpdateComplianceControlSaveStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ItsecMassnahmenWSPort',
					loadMethod: 'saveMassUpdateComplianceControl',
					timeout: 120000,
					reader: massUpdateComplianceControlSaveReader
				}),
				
				fields: [ 'result', 'displayMessage', 'messages' ],
	
				reader: massUpdateComplianceControlSaveReader
			});
			
			return massUpdateComplianceControlSaveStore;
		},
		
		createAssetListStore: function() {
			var ciItemListRecord = Ext.data.Record.create([
					//Asset Information
					{ name : 'isSoftwareComponent'},
					{ name : 'isHardwareWithInventory'},
					{ name : 'isHardwareWithoutInventory'},
					{ name : 'id'},
					{ name : 'identNumber'},
					{ name : 'inventoryNumber'},
					{ name : 'sapDescription'},
					
					//Product
					{ name : 'manufacturer'},
					{ name : 'manufacturerId'},
					
					{ name : 'subCategory'},
					{ name : 'subcategoryId'},
					
					{ name : 'type'},
					{ name : 'typeId'},
					
					{ name : 'model'},
					{ name : 'modelId'},
					
					//Technicas
					{ name : 'technicalNumber'},
					{ name : 'technicalMaster'},
					{ name : 'systemPlatformName'},
					
					{ name : 'osName'},
					{ name : 'osNameId'},
					{ name : 'hardwareTransientSystem'},
					{ name : 'workflowStatusId'},
					{ name : 'generalUsageId'},
					{ name : 'itSecurityRelevance'},
					{ name : 'comment'},
					
					//Location
					{ name : 'country'},
					{ name : 'countryId'},
					
					{ name : 'site'},
					{ name : 'siteId'},
					
					{ name : 'building'},
					{ name : 'buildingId'},
					
					{ name : 'room'},
					{ name : 'roomId'},
					
					{ name : 'rack'},
					{ name : 'rackId'},
					
					// Business Information
					{ name : 'orderNumber'},
					{ name : 'costCenter'},
					{ name : 'costCenterId'},
					{ name : 'pspElement'},
					{ name : 'pspElementId'},
					{ name : 'pspText'},
					{ name : 'requester'},
					{ name : 'requesterId'},
					{ name : 'costCenterManager'},
					{ name : 'costCenterManagerId'},
					{ name : 'organizationalunit'},
					{ name : 'owner'},
					{ name : 'ownerId'},
					{ name : 'sapAssetClass'},
					{ name : 'sapAssetClassId'},
					
					// Contacts
					{ name : 'editorsGroupId'},
					{ name : 'editorsGroup'},
					
					//Others
					{ name : 'serialNumber'},
			]);
	
			var ciItemListReader = new Ext.data.XmlReader({
			    totalProperty: 'countResultSet',
			    record: 'assetViewDataDTO',
			    idProperty: 'id'
			}, ciItemListRecord); 
	
			var ciItemListStore = new Ext.data.GroupingStore({//XmlStore
			    autoDestroy: true,
			    autoLoad: false,
			    remoteSort: true,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AssetManagementWSPort',
					loadMethod: 'searchAsset',
					timeout: 120000,
					reader: ciItemListReader
				}),
				
				reader: ciItemListReader//zum Sortieren !!
			});
			
			return ciItemListStore;
		},
		

		createManufactureListStore: function() {
			var ciManufactureRecord = Ext.data.Record.create([
				{ name: 'manufacturerId', type: 'int' },
 			    'manufacturer'				
 			]);

 			var ciManufactureReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'
 			}, ciManufactureRecord);
 			
 			var ciManufacturestore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'manufactureListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/ProductWSPort',
 					loadMethod: 'findManufacturerList',
 					timeout: 120000,
 					reader: ciManufactureReader
 				})
 			});
 			
 			return ciManufacturestore;
 		},

		
		createSubCategoryListStore: function() {
			var ciSubCategoryRecord = Ext.data.Record.create([
				{ name: 'subcategoryId', type: 'int' },
 			    'subcategory'					
 			]);

 			var ciSubCategoryReader = new Ext.data.XmlReader({
  				idProperty: 'id',

 				record: 'return'
 			}, ciSubCategoryRecord);
 			
 			var ciSubCategorystore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'subCategoryListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/ProductWSPort',
 					loadMethod: 'findSubCategoryList',
 					timeout: 120000,
 					reader: ciSubCategoryReader
 				})
 			});
 			
 			return ciSubCategorystore;
 		},
 		
 		createTypeListStore: function() {
			var ciTypeListRecord = Ext.data.Record.create([
				{ name: 'manufacturerId', type: 'int' },
				'manufacturer',	
				{ name: 'subcategoryId', type: 'int' },
				'subcategory',
				{ name: 'typeId', type: 'int' },
				'type'					
 			]);

 			var ciTypeListReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'
 			}, ciTypeListRecord);
 			
 			var ciTypeListstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'typeListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/ProductWSPort',
 					loadMethod: 'findTypeList',
 					timeout: 120000,
 					reader: ciTypeListReader
 				})
 			});
 			
 			return ciTypeListstore;
 		},
		
		createModelListStore: function() {
			var ciModelListRecord = Ext.data.Record.create([
				{ name: 'manufacturerId', type: 'int' },
				'manufacturer',	
				{ name: 'subcategoryId', type: 'int' },
				'subcategory',
				{ name: 'typeId', type: 'int' },
				'type',					
				{ name: 'modelId', type: 'int' },
 			    'model'					
 			]);

 			var ciModelListReader = new Ext.data.XmlReader({
				idProperty: 'id',
 				record: 'return'

 			}, ciModelListRecord);
 			
 			var ciModelListstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'modelListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/ProductWSPort',
 					loadMethod: 'findModelList',
 					timeout: 120000,
 					reader: ciModelListReader
 				})
 			});

 			return ciModelListstore;
 		},

 		createEditorGroupListStore: function() {

			var ciEditorGroupRecord = Ext.data.Record.create([
				{ name: 'name',  },
 			    'members'
 			]);

 			var ciEditorGroupReader = new Ext.data.XmlReader({
 				//idProperty: 'id',
 				record: 'return'
 			}, ciEditorGroupRecord);
 			
 			var ciEditorGroupstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'editorGroupListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/ContactWSPort',
 					loadMethod: 'findEditorGroupList',
 					timeout: 120000,
 					reader: ciEditorGroupReader
 				})
 			});
 			
 			return ciEditorGroupstore;
 		},
 		
 		createCostCenterListStore: function() {
			var ciCostcenterListRecord = Ext.data.Record.create([
				{ name: 'id', type: 'int' },
 			    'name',
 			    'cwid'		
 			]);

 			var ciCostcenterListReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'

 			}, ciCostcenterListRecord);

 			var ciCostcenterListstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'costCenterListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/BusinessAdministrationWSPort',
 					loadMethod: 'findCostcenterList',
 					timeout: 120000,
 					reader: ciCostcenterListReader
 				})
 			});
 			return ciCostcenterListstore;
 		},
 		
 		createPersonStore: function() {
			var personPickerRecord = Ext.data.Record.create([{
				name: 'cwid',
				mapping: 'cwid'
			}, {
				name: 'lastname',
				mapping: 'lastname'
			}, {
				name: 'firstname',
				mapping: 'firstname'
			},{
				name: 'orgUnit',
				mapping: 'orgUnit'
			}]);
	
			var personPickerRecordReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'cwid'
			}, personPickerRecord);
	
			var personPickerStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'personPickerStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/PersonsWSPort',
					loadMethod: 'findPersonByCWID',
					timeout: 120000,
					reader: personPickerRecordReader
				}),
				
				fields: [ 'cwid', 'firstname', 'lastname' ],
				reader: personPickerRecordReader,
				baseParams: {
					cwid: '',
					primaryCWID: 'Y'
				}
			});
			
			return personPickerStore;
		},
		
		createOperationalStatusListStore: function() {
			var operationalStatusListRecord = Ext.data.Record.create([
				{ name: 'operationalStatusId', type: 'int' },
 			    'operationalStatus',
 			    'operationalStatusEn'		
 			]);

 			var operationalStatusListReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'
 			}, operationalStatusListRecord);

 			var operationalStatusListstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/OperationalStatusWSPort',
 					loadMethod: 'getOperationalStatusList',
 					timeout: 120000,
 					reader: operationalStatusListReader
 				})
 			});
 			return operationalStatusListstore;
 		},
 		
 		createPspElementListStore: function() {
			var ciPspElementListRecord = Ext.data.Record.create([
				{ name: 'id', type: 'int' },
 			    'name',
 			    'nameEn'
 			]);
 			var ciPspElementListReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'

 			}, ciPspElementListRecord);
 			var ciPspElementListstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'pspElementListStore',
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/BusinessAdministrationWSPort',

 					loadMethod: 'findPspElementList',
 					timeout: 120000,

 					reader: ciPspElementListReader
 				})
 			});
 			return ciPspElementListstore;
 		},
 		
 		createSapAssetListStore: function() {
			var ciSapAssetListRecord = Ext.data.Record.create([
				{ name: 'id', type: 'int' },
 			    'name',
 			    'nameEn'
 			]);
 			var ciSapAssetListReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'

 			}, ciSapAssetListRecord);
 			var ciSapAssetListstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'sapAssetListStore',
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/BusinessAdministrationWSPort',
 					loadMethod: 'findSapAssetList',
 					timeout: 120000,
 					reader: ciSapAssetListReader
 				})
 			});
 			return ciSapAssetListstore;
 		},
 		
 		createSapAssetSoftwareListStore: function() {
			var ciSapAssetListRecord = Ext.data.Record.create([
				{ name: 'id', type: 'int' },
 			    'name',
 			    'nameEn'
 			]);
 			var ciSapAssetListReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'

 			}, ciSapAssetListRecord);
 			var ciSapAssetListstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				storeId: 'sapAssetListStore',
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/BusinessAdministrationWSPort',
 					loadMethod: 'findSapAssetSoftwareList',
 					timeout: 120000,
 					reader: ciSapAssetListReader
 				})
 			});
 			return ciSapAssetListstore;
 		},
 		
 		createSaveAssetStore: function() {
			var ciSaveAssetRecord = Ext.data.Record.create([
				'result','id','identNumber','inventoryNumber','error'
 			]);

 			var ciSaveAssetReader = new Ext.data.XmlReader({
 				idProperty: 'id',
 				record: 'return'
 			}, ciSaveAssetRecord);
 			
 			var ciSaveAssetstore = new Ext.data.XmlStore({
 				autoDestroy: true,
 				autoLoad: false,
 				
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext + '/AssetManagementWSPort',
 					loadMethod: 'saveAsset',
 					timeout: 120000,
 					reader: ciSaveAssetReader
 				})
 			});
 			return ciSaveAssetstore;
		},
		
		createAttributeValueListStore: function() {
			var attributeValueRecord = Ext.data.Record.create([ {
				name : 'id',
				mapping : 'id',
				type : 'int'
			}, {
				name : 'name',
				mapping : 'name',
				type: 'text'
			}, {
				name : 'attributeId',
				mapping : 'attributeId',
				type: 'int'
			}]);
	
			var attributeValueReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, attributeValueRecord);
	
			var attributeValueListStore = new Ext.data.XmlStore({//XmlStore
				autoDestroy: false,
				storeId: 'attributeValueListStore',
				autoLoad: false,
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'getAttributeValue',
					timeout: 120000,
					reader: attributeValueReader
				}),
				
				fields: [ 'id', 'name', 'attributeId'],

				reader: attributeValueReader,
				baseParams:{
					query : 1 //use query to pass param
				}
			});
			
			return attributeValueListStore;
		},
		
		createSpecialAttributeSaveStore: function() {
			var specialAttributeSaveRecord = Ext.data.Record.create([
	 	        'result'
	 	    ]);
	 	
	 	    var specialAttributeSaveReader = new Ext.data.XmlReader({
	 	    	record: 'return'
	 	    }, specialAttributeSaveRecord); 
	 		
	 	    var specialAttributeSaveStore = new Ext.data.XmlStore({
	 	    	autoDestroy: true,
	 	    	autoLoad: false,
	 	    	
	 	      	fields: [ 'result' ],
	 	      	
	 	      	proxy: new Ext.ux.soap.SoapProxy({
	 	      		url: webcontext + '/SpecialAttributeWSPort',
	 	      		loadMethod: 'saveSpecialAttributes',
	 	      		timeout: 120000,
	 	      		reader: specialAttributeSaveReader
	 	      	}),
	 	    	
	 	      	reader: specialAttributeSaveReader
	 	    });
	 	    
	 	    return specialAttributeSaveStore;
		},
		
		createSpecialAttributesListStore: function() {
			var specialAttributeRecord = Ext.data.Record.create([ {
				name : 'attributeId',
				mapping : 'attributeId'
			}, {
				name : 'attributeName',
				mapping : 'attributeName'
			}, {
				name : 'toBeValueId',
				mapping : 'toBeValueId',
				type: 'int'
			}, {
				name : 'asIsValueId',
				mapping : 'asIsValueId',
				type: 'int'
			}, {
				name : 'group',
				mapping : 'group'
			}]);
	
	
			var specialAttributeReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, specialAttributeRecord);
	
			var specialAttributeListStore = new Ext.data.XmlStore({//XmlStore
				autoDestroy: false,
				storeId: 'specialAttributeListStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/SpecialAttributeWSPort',
					loadMethod: 'getSpecialAttributes',
					timeout: 120000,
					reader: specialAttributeReader
				}),
				
				fields: [ 'attributeId', 'attributeName', 'toBeValueId', 'asIsValueId', 'group'],

				reader: specialAttributeReader
			});
			
			return specialAttributeListStore;
		},
		
		createOsListStore: function(){
			var osRecord = Ext.data.Record.create([ {
				name : 'osId',
				mapping : 'id'
			}, {
				name : 'osName',
				mapping : 'name'
			}]);
	
	
			var osReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, osRecord);
	
			var osListStore = new Ext.data.XmlStore({//XmlStore
				autoDestroy: false,
				storeId: 'osListStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/BusinessAdministrationWSPort',
					loadMethod: 'getOsNames',
					timeout: 120000,
					reader: osReader
				}),
				
				fields: [ 'osId', 'osName'],

				reader: osReader
			});
			
			return osListStore;
		},
		   createSoftwaremanufacturerListStore: function(){
			   var ciSoftwaremanufacturerRecord = Ext.data.Record.create([
	                   { name: 'id', type: 'int' },
  				    'name'				
  				]);

  				var ciSoftwaremanufacturerReader = new Ext.data.XmlReader({
  					idProperty: 'id',
  					record: 'return'
  				}, ciSoftwaremanufacturerRecord);
  				
  				var ciSoftwaremanufacturerstore = new Ext.data.XmlStore({
  					autoDestroy: true,
  					autoLoad: false,
  					storeId: 'softwaremanufacturerListStore',
  					
  					proxy: new Ext.ux.soap.SoapProxy({
  						url: webcontext + '/ProductWSPort',
  						loadMethod: 'findSoftwareManufacturerList',
  						timeout: 120000,
  						reader: ciSoftwaremanufacturerReader
  					})
  				});
  				
  				return ciSoftwaremanufacturerstore;
  		},
		  		
		createSoftwareProductListStore: function() {
			var ciSoftwareproductRecord = Ext.data.Record.create([
				{ name: 'id', type: 'int' },
				    'name'				
				]);

				var ciSoftwareproductReader = new Ext.data.XmlReader({
					idProperty: 'id',
					record: 'return'
				}, ciSoftwareproductRecord);
				
				var ciSoftwareproductstore = new Ext.data.XmlStore({
					autoDestroy: true,
					autoLoad: false,
					storeId: 'softwareproductListStore',
					
					proxy: new Ext.ux.soap.SoapProxy({
						url: webcontext + '/ProductWSPort',
						loadMethod: 'findSoftwareProductList',
						timeout: 120000,
						reader: ciSoftwareproductReader
					})
				});
				
				return ciSoftwareproductstore;
		},
		
		createLegalentityListStore: function(){

			var ciLegalentityRecord = Ext.data.Record.create([
				{ name: 'id', type: 'int' },
				    'name'				
				]);

				var ciLegalentityReader = new Ext.data.XmlReader({
					idProperty: 'id',
					record: 'return'
				}, ciLegalentityRecord);
				
				var ciLegalentitystore = new Ext.data.XmlStore({
					autoDestroy: true,
					autoLoad: false,
					storeId: 'legalentityListStore',
					
					proxy: new Ext.ux.soap.SoapProxy({
						url: webcontext + '/BusinessAdministrationWSPort',
						loadMethod: 'findLegalEntityList',
						timeout: 120000,
						reader: ciLegalentityReader
					})
				});
				
				return ciLegalentitystore;
		
		}
		

	};
}();
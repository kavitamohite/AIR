Ext.namespace('AIR');


AIR.AirConstants = {
		
	SERVERNAME_PROD : "air.de.bayer.cnb",
	SERVERNAME_QA:"air-q.de.bayer.cnb",
	SERVERNAME_D : "air-d.de.bayer.cnb",
	HELP_ID_INFOTEXT: 'help_infotext',
	HELP_ID_MYPLACE: 'help_myplace',
	HELP_ID_SEARCH: 'help_search',
	HELP_ID_SEARCH_ADVANCED: 'help_search_advanced',
	HELP_ID_CREATE_CI: 'help_create_ci',
	HELP_ID_DETAILS_DETAILS: 'help_details_details',
	HELP_ID_DETAILS_SPECIFIC: 'help_details_specific',
	HELP_ID_DETAILS_CONTACTS: 'help_details_contacts',
	HELP_ID_DETAILS_AGREEMENTS: 'help_details_agreements',
	HELP_ID_DETAILS_PROTECTION: 'help_details_protection',
	HELP_ID_DETAILS_COMPLIANCE: 'help_details_compliance',
	HELP_ID_DETAILS_LICENSECOSTS: 'help_details_licensecosts',
	HELP_ID_DETAILS_SPECIALATTIRUBTES: 'help_details_specialattributes',
	HELP_ID_DETAILS_NETWORK: 'help_details_network',
	HELP_ID_DETAILS_CONNECTIONS: 'help_details_connections',
	HELP_ID_DETAILS_SPECIALATTIRUBTES: 'help_details_specialattributes',
	HELP_ID_DETAILS_SUPPORTSTUFF: 'help_details_supportstuff',
	HELP_ID_DETAILS_HISTORY: 'help_details_history',
	HELP_ID_ASSET_MANAGEMENT: 'help_details_assetManagement',
	HELP_ID_INTANGIBLE_ASSET: 'help_details_intangible',
	HELP_ID_TANGIBLE_ASSET: 'help_details_tangible',
	HELP_ID_ASSET_WITH_INVENTORY: 'help_details_assetWithInventory',
	HELP_ID_ASSET_WO_INVENTORY: 'help_details_assetWoInventory',
	
	LOGIN_WINDOW_INFO_TEXT: 
		'<div style="color: darkblue; font-family: Arial, Helvetica, sans-serif !important; font-size: 7pt !important; font-weight: bold !important;">'+
			'AIR uses the Bayer AD password (Microsoft Active Directory)<br/>' +
			'for user authentication.<br/> You can set up, proof, change or reset this password on<br/>' +
			'<a href="https://by-baysec.bayer-ag.com/baysecsetpwd/secure/checkUser.do" target="_blank">Intranet-Password-Management</a>.<br/>' +
			'Additional information regarding the application login<br/>' +
			'can be found in our <a href="http://sp-coll-bbs.bayer-ag.com/sites/000127/ConfigMgmt/Forum/Benutzerhandbuch%20AIR.docx" target="_blank">manual</a>.<br/>' +
			'If you need access <a href="mailto:ITILcenter@bayer.com&subject=AIR:%20Request%20for%20access">contact the administrator</a>.' +
		'</div>',

	IMG_COUNTRY_EN: 'country_EN.png',
	IMG_COUNTRY_DE: 'country_DE.png',
	
	USER_OPTION_CURRENCY: 'AIR_CURRENCY',
	USER_OPTION_LANGUAGE: 'AIR_LANGUAGE',
	USER_OPTION_NUMBER_FORMAT: 'AIR_NUMBER_FORMAT',
	USER_OPTION_HELP_ACTIVATE: 'AIR_HELP_ACTIVATE',
	USER_OPTION_SKIP_WIZARD: 'AIR_SKIP_WIZARD',
	USER_OPTION_TOOLTIP: 'AIR_TOOLTIP',
	
	/*USER_ROLE_AIR_DEFAULT: 'AIR Default',
	USER_ROLE_AIR_APPLICATION_LAYER: 'AIR Application Layer',
	USER_ROLE_AIR_INFRASTRUCTURE_LAYER: 'AIR Infrastructure Layer',
	USER_ROLE_AIR_APPLICATION_MANAGER: 'AIR Application Manager',
	USER_ROLE_AIR_INFRASTRUCTURE_MANAGER: 'AIR Infrastructure Manager',
	USER_ROLE_AIR_ADMINISTRATOR: 'AIR Administrator',//AIR Administrator RFC 8231
	USER_ROLE_AIR_LOCATION_DATA_MAINTENANCE: 'AIR Location Data Maintenance',
	USER_ROLE_DEVELOPER: 'AIR Developer',
	USER_ROLE_AIR_BUSINESS_ESSENTIAL_EDITOR: 'AIR BusinessEssential-Editor',//AIR
	USER_ROLE_AIR_COMPLIANCE_EDITOR: 'AIR Compliance Editor',
	USER_ROLE_AIR_ASSET_MANAGER:'AIR Asset Manager',
	USER_ROLE_AIR_ASSET_EDITOR:'AIR Asset Editor',
	USER_ROLE_AIR_BAR_EDITOR:'AIR BAR Editor',*/
	
	USER_ROLE_AIR_DEFAULT: 'AIR_Default',
	USER_ROLE_AIR_APPLICATION_LAYER: 'AIR Application Layer',
	USER_ROLE_AIR_INFRASTRUCTURE_LAYER: 'AIR Infrastructure Layer',
	USER_ROLE_AIR_APPLICATION_MANAGER: 'AIR Application Manager',
	USER_ROLE_AIR_INFRASTRUCTURE_MANAGER: 'AIR Infrastructure Manager',
	USER_ROLE_AIR_ADMINISTRATOR: 'AIR Administrator',//AIR Administrator RFC 8231
	USER_ROLE_AIR_LOCATION_DATA_MAINTENANCE: 'AIR_Location_Data_Maintenance',
	USER_ROLE_DEVELOPER: 'AIR Developer',
	USER_ROLE_AIR_BUSINESS_ESSENTIAL_EDITOR: 'AIR BusinessEssential-Editor',//AIR
	USER_ROLE_AIR_COMPLIANCE_EDITOR: 'AIR Compliance Editor',
	USER_ROLE_AIR_ASSET_MANAGER:'AIR Asset Manager',
	USER_ROLE_AIR_ASSET_EDITOR:'AIR_Asset_Editor',
	USER_ROLE_AIR_BAR_EDITOR:'AIR BAR Editor',
	
	
	//--
	USER_ROLE_BOV_ADMIN: 'BOV Admin',
	USER_ROLE_BOV_EDITOR: 'BOV Editor',
	
	// TABLE_ID's
	// ----------
	TABLE_ID_APPLICATION: 2,
	TABLE_ID_IT_SYSTEM: 1,
	TABLE_ID_POSITION: 13,
	TABLE_ID_ROOM: 3,
	TABLE_ID_BUILDING_AREA: 88,
	TABLE_ID_BUILDING: 4,
	TABLE_ID_TERRAIN: 30,
	TABLE_ID_SITE: 12,
	TABLE_ID_HARDWARE_COMPONENT: 19,
	TABLE_ID_FUNCTION: 33,
	TABLE_ID_PATHWAY:  37,
//	TABLE_ID_WAY: 37,
	TABLE_ID_SERVICE: 123,
	TABLE_ID_BUSINESS_APPLICATION: 183,	
	
	// CI-SUB-TYPES
	// ------------
	CI_SUB_TYPE_APPLICATION: 5,
	CI_SUB_TYPE_APPLICATION_PLATFORM: -10006,
	CI_SUB_TYPE_MIDDLEWARE: -10007,
	CI_SUB_TYPE_COMMON_SERVICE: -10013,
	CI_SUB_TYPE_TRANSIENT_SYSTEM: 2,
	
	
	
	APP_CAT1_APPLICATION: '5',//'Application',
	APP_CAT1_APPLICATION_PLATFORM: '-10006',//'Application Platform',
	APP_CAT1_COMMON_SERVICE: '-10013',//'Common Service',
	APP_CAT1_MIDDLEWARE: '-10007',//'Middleware'
	APP_CAT1_ONLY_FIELDS: 'applicationOwner,applicationOwnerDelegate,applicationSteward,rgBARrelevance,organisationalScope',
	APP_WO_CAT: 'App w/o Cat.',
	
	APP_CAT2_DEFAULT_UNKOWN: '468',
	APP_CAT2_SHAREPOINT: 'Sharepoint',
	
	AIR_ERROR_INVALID_CAT2_SAP: 'AIR_ERROR_INVALID_CAT2_SAP',
	AIR_ERROR_INVALID_TEMPLATE: 'AIR_ERROR_INVALID_TEMPLATE',
	
	SISOOGLE_ATTR_TYPE_OS_TYP: 'OS_TYP',
	SISOOGLE_ATTR_TYPE_OS_NAME: 'OS_NAME',
	SISOOGLE_ATTR_TYPE_INSERT_QUELLE: 'INSERT_QUELLE',
	SISOOGLE_ATTR_TYPE_GAP_RESPONSIBLE: 'GAP_RESPONSIBLE',
	SISOOGLE_ATTR_TYPE_GAP_END_DATE: 'GAP_END_DATE',
	SISOOGLE_ATTR_TYPE_ACTIVE_Y_N: 'ACTIVE_Y_N',
	SISOOGLE_ATTR_TYPE_GPSC_OWNER: 'GPSC_OWNER',
	
	
	REGEX_CWID: '[a-zA-Z]+',
	REGEX_SAP_NAME: '[0-9a-zA-Z]+M[0-9]+C[0-9]+',//'[0-9a-zA-Z#=\+\-\_\/\\. ]+M[0-9]+C[0-9]+',
	REGEX_SAP_NAME_PART_1: 3,
	REGEX_SAP_NAME_PART_2_3: 4,
	
	CI_CAT1_SAP_CAT2_ID: '457',
	
	CI_GROUP_ID_DEFAULT_ITSEC: '10136',
	CI_GROUP_ID_NON_BYTSEC: '11493',//11504,
	CI_GROUP_ID_DELETE_ID: '-1',
	CI_GROUP_ID_EMPTY: '0',
	
	ORG_SCOPE_DEFAULT: 'Bayer Group',
	
	
	ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE: 0,
	ITSEC_MASSN_INVALIDITY_TYPE_DAMAGE_PER_YEAR: 1,
	ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1: 2,
	
	GAP_CLASS_MID_TERM_ID2_PLUS_6_MONTHS: 6,
	GAP_CLASS_MID_TERM_ID3_PLUS_3_MONTHS: 3,
	
	MAX_MITIGATION_POTENTIAL: 100,
	LABEL_INVALID: 'INVALID: ',
	
	VALIDATION_MESSAGE_ALIAS: '"Alias" {0} already exists. Please choose another name or ask ITILcenter@bayer.com for help to enable this alias.',// '+this.objectAliasAllowedStore.getAt(0).data.application+'
	VALIDATION_MESSAGE_NAME: '"Name" {0} already exists. Please choose another name or ask ITILcenter@bayer.com for help to enable this name.',// '+this.objectNameAllowedStore.getAt(0).data.application+'
//	SUPPORTED_COUNTRIES: [AIR.AirConstants.IMG_COUNTRY_EN, AIR.AirConstants.IMG_COUNTRY_DE]
	
	INSERT_QUELLE_SHAREPOINT: 'SHAREPOINT',
	UPSTREAM: 'Upstream',
	DOWNSTREAM: 'Downstream',
	UNKNOWN: 'unknown',
	
	SEARCH_TYPE_SEARCH: 'Search',
	SEARCH_TYPE_ADV_SEARCH: 'Advanced Search',//Adv. Search
	SEARCH_TYPE_OU_SEARCH: 'Ou Search',//OU Search
	
	
	//commonvars.js Ersetzung
	SEARCH_MODE_CONTAINS: 'CONTAINS',
	
//	ROLE_AIR_APPLICATION_LAYER: 'AIR Application Layer',
//	ROLE_AIR_DEFAULT: 'AIR Default',
//	ROLE_AIR_INFRASTRUCTURE_LAYER: 'AIR Infrastructure Layer',
//	ROLE_AIR_APPLICATION_MANAGER: 'AIR Application Manager',
//	ROLE_AIR_ADMINISTRATOR: 'AIR Administrator',
//	ROLE_AIR_DEVELOPER: 'AIR Developer',
//	ROLE_AIR_BUSINESS_ESSENTIAL_EDITOR: 'AIR BusinessEssential-Editor',
	
	AIR_BG_COLOR: '#FFFFFF',
	AIR_BG_COLOR_SECURE: 'Salmon',
	AIR_FONT_COLOR: '#085E8B',
	AIR_FONT_TYPE: 'Arial, Helvetica, sans-serif',//fontType
	
	MASK_TYPE_START: 'start',
	MASK_TYPE_LOAD: 'load',
	MASK_TYPE_SAVE: 'save',
	
	CI_TYPE_TLA: {
		SPL: 1,
		APP: 2,
		ROM: 3,
		GEB: 4,
		COU: 11,
		SIT: 12,
		POS: 13,
//		HWK: 19,
		TER: 30,
//		WAY: 37,
//		NWA: 53,
		ARE: 88
//		DNS: 106,
//		PRC: 118,
//		SVC: 123
	},
	
	
	COMPANY_REGULATION_ITSEC: '1435',
	COMPANY_REGULATION_ICS: '1920',
	COMPANY_REGULATION_2059: '2059',
	COMPANY_REGULATION_2008: '2008',
	
	USE_CASE_CI_ADV_SEARCH: 10,
	USE_CASE_CI_CREATION: 11,
	AIR_USER_PROFILE_COLUMNS_PREFERENCE: 'serialNumber;pspElement;costCenter;sapDescription;site;technicalMaster;technicalNumber;inventoryNumber;organizationalunit' // Added by enqmu
};
AC = AIR.AirConstants;

AC.SUPPORTED_COUNTRIES = [AC.IMG_COUNTRY_EN, AC.IMG_COUNTRY_DE];

AC.CI_TYPE_ADV_SEARCH_BY_ROLE = {
	// The definiton which ci types can be selected in the advanced search by a defined role
	// this changes for example the behavior of the select box "Type"

	AIRDefault: {
		1: [],
		2: [ AC.CI_SUB_TYPE_APPLICATION, AC.CI_SUB_TYPE_APPLICATION_PLATFORM, AC.CI_SUB_TYPE_MIDDLEWARE, AC.CI_SUB_TYPE_COMMON_SERVICE ],
		13: [],
		3: [],
		88: [],
		4: [],
		30: [],
		12: []
	},
		
	AIRApplicationLayer: {
		2: [ AC.CI_SUB_TYPE_APPLICATION ],
		13: [],
		3: [],
		88: [],
		4: [],
		30: [],
		12: []
	},
	
	AIRApplicationManager: {
		2: [ AC.CI_SUB_TYPE_APPLICATION ],
		13: [],
		3: [],
		88: [],
		4: [],
		30: [],
		12: []
	},
	
	AIRInfrastructureLayer: {
		1: [],
		2: [ AC.CI_SUB_TYPE_APPLICATION_PLATFORM, AC.CI_SUB_TYPE_MIDDLEWARE, AC.CI_SUB_TYPE_COMMON_SERVICE ],
		13: [],
		3: [],
		88: [],
		4: [],
		30: [],
		12: []
	},
	
	AIRInfrastructureManager: {
		1: [],
		2: [ AC.CI_SUB_TYPE_APPLICATION_PLATFORM, AC.CI_SUB_TYPE_MIDDLEWARE, AC.CI_SUB_TYPE_COMMON_SERVICE ],
		13: [],
		3: [],
		88: [],
		4: [],
		30: [],
		12: []
	}
	
};

AC.CI_TYPE_CREATION_BY_ROLE = {
	// The definiton which ci types can be created by a defined role
	// this changes for example the behavior of the select box "Type"
	// the tableId is not used, only the entries are urgent
		
	AIRDefault: {
		1: [],
		2: [ AC.CI_SUB_TYPE_APPLICATION, AC.CI_SUB_TYPE_APPLICATION_PLATFORM, AC.CI_SUB_TYPE_MIDDLEWARE, AC.CI_SUB_TYPE_COMMON_SERVICE ]
	},
	
	AIRApplicationLayer: {
		2: [ !AC.CI_SUB_TYPE_APPLICATION ]
	},

	AIRApplicationManager: {
		2: [ AC.CI_SUB_TYPE_APPLICATION ]
	},

	AIRInfrastructureLayer: {
		1: [],
		2: [ AC.CI_SUB_TYPE_APPLICATION_PLATFORM, AC.CI_SUB_TYPE_MIDDLEWARE, AC.CI_SUB_TYPE_COMMON_SERVICE ]
	},
	
	AIRInfrastructureManager: {
		1: [],
		2: [ AC.CI_SUB_TYPE_APPLICATION_PLATFORM, AC.CI_SUB_TYPE_MIDDLEWARE, AC.CI_SUB_TYPE_COMMON_SERVICE ]
	},
	
	AIRLocationDataMaintenance: {
		13: [],
		3: [],
		88: [],
		4: [],
		30: [],
		12: []
	}

};

AC.resultGridSelModel = new Ext.grid.CheckboxSelectionModel();
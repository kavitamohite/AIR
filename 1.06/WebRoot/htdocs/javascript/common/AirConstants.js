Ext.namespace('AIR');

//var languagestore = null;

AIR.AirConstants = {
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
	HELP_ID_DETAILS_CONNECTIONS: 'help_details_connections',
	HELP_ID_DETAILS_SUPPORTSTUFF: 'help_details_supportstuff',
	HELP_ID_DETAILS_HISTORY: 'help_details_history',

	IMG_COUNTRY_EN: 'country_EN.png',
	IMG_COUNTRY_DE: 'country_DE.png',
	
	USER_OPTION_CURRENCY: 'AIR_CURRENCY',
	USER_OPTION_LANGUAGE: 'AIR_LANGUAGE',
	USER_OPTION_NUMBER_FORMAT: 'AIR_NUMBER_FORMAT',
	USER_OPTION_HELP_ACTIVATE: 'AIR_HELP_ACTIVATE',
	USER_OPTION_SKIP_WIZARD: 'AIR_SKIP_WIZARD',
	USER_OPTION_TOOLTIP: 'AIR_TOOLTIP',
	
	USER_ROLE_DEFAULT: 'AIR Default',
	USER_ROLE_AIR_APPLICATION_LAYER: 'AIR Application Layer',
	USER_ROLE_AIR_INFRASTRUCTURE_LAYER: 'AIR Infrastructure Layer',
	USER_ROLE_AIR_APPLICATION_MANAGER: 'AIR Application Manager',
	USER_ROLE_ADMINISTRATOR: 'AIR Administrator',//AIR Administrator RFC 8231
	USER_ROLE_DEVELOPER: 'AIR Developer',
	
	APP_CAT1_APPLICATION: '5',//'Application',
	APP_CAT1_APPLICATION_PLATFORM: '-10006',//'Application Platform',
	APP_CAT1_COMMON_SERVICE: '-10013',//'Common Service',
	APP_CAT1_MIDDLEWARE: '-10007',//'Middleware'
	
	APP_CAT2_DEFAULT_UNKOWN: '468',
	APP_CAT2_SHAREPOINT: 'Sharepoint',
	
	AIR_ERROR_INVALID_CAT2_SAP: 'AIR_ERROR_INVALID_CAT2_SAP',
	AIR_ERROR_INVALID_TEMPLATE: 'AIR_ERROR_INVALID_TEMPLATE',
	
	REGEX_SAP_NAME: '[0-9a-zA-Z#=\+\-\_\/\\. ]+M[0-9]+C[0-9]+',
	CI_CAT1_SAP_CAT2_ID: '457,458,460',
	
	CI_GROUP_ID_DEFAULT_ITSEC: '10136',
	CI_GROUP_ID_NON_BYTSEC: '11493',//11504,
	CI_GROUP_ID_DELETE_ID: '-1',
	CI_GROUP_ID_EMPTY: '0',
	
	MAX_MITIGATION_POTENTIAL: 10,
	LABEL_INVALID: 'INVALID: ',
	
	VALIDATION_MESSAGE_ALIAS: '"Alias" {0} already exists. Please choose another name or ask ITILcenter@bayer.com for help to enable this alias.',// '+this.objectAliasAllowedStore.getAt(0).data.application+'
	VALIDATION_MESSAGE_NAME: '"Name" {0} already exists. Please choose another name or ask ITILcenter@bayer.com for help to enable this name.',// '+this.objectNameAllowedStore.getAt(0).data.application+'
//	SUPPORTED_COUNTRIES: [AIR.AirConstants.IMG_COUNTRY_EN, AIR.AirConstants.IMG_COUNTRY_DE]
	
	INSERT_QUELLE_SHAREPOINT: 'SHAREPOINT'
};
AC = AIR.AirConstants;

AC.SUPPORTED_COUNTRIES = [AC.IMG_COUNTRY_EN, AC.IMG_COUNTRY_DE];
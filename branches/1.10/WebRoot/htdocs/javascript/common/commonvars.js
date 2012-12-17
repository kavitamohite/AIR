/*
 * Common variables and functions
 * 
 */
//ExtJS internal settings
Ext.BLANK_IMAGE_URL = 'lib/extjs/resources/images/default/s.gif';
Ext.SSL_SECURE_URL = 'lib/extjs/resources/images/default/s.gif'; 

Ext.isSecure = true;
Ext.Ajax.timeout = 3000000;
// No configurations will be saved
//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

// Constants
var rolenameApplicationLayer = 'AIR Application Layer';
var rolenameDefault = 'AIR Default';
var rolenameInfrastructure = 'AIR Infrastructure Layer';
var rolenameApplicationManager = 'AIR Application Manager';
var rolenameAdministrator = 'AIR Administrator';
var rolenameDeveloper = 'AIR Developer';
var rolenameBusinessEssentialEditor = 'AIR BusinessEssential-Editor';
var applicationObjectTypeId = 5;//CI Typ Application
var applicationObjectTypeText = 'Application';


// Variables
//var cwid = '';
//var token = '';
var username = '';
// roles
var hasRoleApplicationLayer = false;
var hasRoleDefault = false;
var hasRoleInfrastructure = false;
var hasRoleApplicationManager = false;
var hasRoleAdministrator = false;
var hasRoleDeveloper = false;
var hasRoleBusinessEssentialEditor = false;

var isSkipCreateWizardMessage = false;
//var isDisableTooltip = false;
//var currentMenuItem = Ext.getCmp('searchmenuitem');

var searchAction = 'search';	// use for search or myPlace
var searchQueryModeContains = 'CONTAINS';
var showCiDetailDataChanged = false; // the ci detail data was changed, but the it was not written yet!
var selectedCIId = -1;
var selectedCICat1Id = 0;
var selectedBusinessEssentialId = 0;
var selectedCategoryBusinessId = 0;//0 1
var selectedDataClassId = '';
var selectedGxpFlagTxt = '';
//var selectedItSecGroupId = 0;
var selectedReferencesId = 0;
var selectedServiceContractId = 0;
var selectedSeverityLevelId = 0;
var selectedPriorityLevelId = 0;
var selectedOperationalStatusId = 0;
var selectedLifecycleStatusId = 0;
var selectedSlaId = 0;
var selectedCurrencyId = 0;
// itSecSbWerte
var selectedItSecSbIntegrityId = 0;
var selectedItSecSbAvailabilityId = 0;
var selectedClassInformationId = 0;
var selectedItSecSbConfidentialityId = 0;

var selectedRunAccountId = 0;
var selectedChangeAccountId = 0;
var selectedLicenseTypeId = 0;

var selectedUsingRegions = '';

var selectedOnlyApplications = false;
//var selectedAdvancedSearch = false;
//var selectedAdvancedSearchplus = false;//true

var selectedLanguage = 'EN';
var selectedNumberFormat = 'DE';
var selectedCurrency = '1';
var urlLanguage = lng_EN;
var urlLanguageTooltips = lng_ENTooltips;
var urlLanguageHelp = lng_ENHelp;
var urlFlagLanguage = img_LangDE;

var panelbgcolor = '#FFFFFF';
var fontColor = '#085E8B';
var fontType = 'Arial, Helvetica, sans-serif';
var panelErrorMsgColor = '#FF0000'; // red
var panelDraftMsgColor = '#FF0000'; // red
var sessionvars;
var bUndoMove = false;
//var lVIconPath = share + 'images/icons/Listview/';
var navOn = img_NavOn;
var navOff = img_NavOff;
var filterSet = [];

// the variables for the help messages
//var helpMyPlace = '';
//var helpMyPlaceMyCis = '';
//var helpMyPlaceMyCisSubstitute = '';
//var helpSearch = '';
//var helpAdvancedSearch = '';
//var helpNewCI = '';
//var helpDetailsDetails = '';
//var helpDetailsSpecific = '';
//var helpDetailsContacts = '';
//var helpDetailsAgreements = '';
//var helpDetailsProtection = '';
//var helpDetailsCompliance = '';
//var helpDetailsLicenseCosts = '';
//var helpDetailsConnections = '';
//var helpDetailsSupportStuff = '';
//var helpDetailsHistory = '';

var incompleteFieldList = '';
var draftFlag = '';
var myStartupMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Initializing AIR...'});
var myLoadMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Loading data...'});
var mySaveMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Saving data...'});

//var gpscContactsMap = [
//    "", // 0 not mapped
//	"gpsccontactSupportGroup", // 1
//	"gpsccontactChangeTeam", //2
//	"gpsccontactServiceCoordinator", //3
//	"gpsccontactEscalation", //4
//	"gpsccontactCiOwner", //5
//	"gpsccontactOwningBusinessGroup", //6
//	"", // 7 not mapped
//	"gpsccontactImplementationTeam", //8
//	"gpsccontactServiceCoordinatorIndiv", //9
//	"gpsccontactEscalationIndiv", //10
//	"gpsccontactResponsibleAtCustomerSide", //11
//	"", // 12 not mapped
//	"gpsccontactSystemResponsible", //13
//	"gpsccontactImpactedBusiness", //14
//	"gpsccontactBusinessOwnerRepresentative" //15
//];

//================================
//var bIsDynamicWindowSpeichern = false;
//var selectedMenuItem = '';


//var REFERENCES_LIST_STORE = 'referencesListStore';
//var ITSEC_GROUP_LIST_STORE = 'itSecGroupListStore';
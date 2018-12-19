package com.bayerbbs.applrepos.constants;

import java.util.HashMap;
import java.util.Map;


public final class AirKonstanten {
	public final static String AIR_VERSION = "6.04.00";
	public final static String COMPRESSEDCODEDIR = "compressed";
	
	public final static String CACHENAME = "com.bayerbbs.applrepos.LogonData";
	//public final static String SERVERNAME_PROD = "byzreg.bayer-ag.com";
	public final static String SERVERNAME_PROD = "by0p9p.de.bayer.cnb";
	//public final static String SERVERNAME_QA = "byzreh.bayer-ag.com";
	public final static String SERVERNAME_QA = "by0p9q.de.bayer.cnb";
	public final static String SERVERNAME_DEV = "by0nh9.de.bayer.cnb";
	public final static String SERVERNAME_BMS_PROD = "mdelevs0300.ad.glpoly.net";
	public final static String SERVERNAME_BMS_QA = "mdelevs0475.ad.glpoly.net";
	public final static String TRANSBASE_PROD_HOST = "by0ok6.de.bayer.cnb";
	public final static String TRANSBASE_QA_HOST = "by0ot4.de.bayer.cnb";
	public final static String TRANSBASE_BMS_PROD_HOST_SERVICENAME = "MTRANSBP";
	public final static String TRANSBASE_BMS_QA_HOST_SERVICENAME = "MTRANSBQ";
	
	
	public final static Long IT_SET_DEFAULT = new Long(11397);
	public final static Long IT_SET_GERMANY = new Long(10002);
	public final static Long BUSINESS_ESSENTIAL_DEFAULT = new Long(16);
	public final static Integer  IS_TEMPLATE = new Integer(-1);
	
	
	
	public static final int TABLE_ID_IT_SYSTEM		= 1;
	public static final int TABLE_ID_APPLICATION	= 2;
	public static final int TABLE_ID_POSITION		= 13;
	public static final int TABLE_ID_ROOM			= 3;
	public static final int TABLE_ID_BUILDING		= 4;
	public static final int TABLE_ID_BUILDING_AREA	= 88;
	public static final int TABLE_ID_TERRAIN		= 30;
	public static final int TABLE_ID_SITE			= 12;
	public static final int TABLE_ID_WAYS			= 37;
	public static final int TABLE_ID_FUNCTION       = 33;
	public static final int TABLE_ID_SERVICE        = 123;
	public static final int TABLE_ID_BUSINESS_APPLICATION	= 183;
	
	public static final String CITypes_IT_SYSTEM	= "'Transient System Platform', 'Hardware System'";
	public static final String CITypes_ANWENDUNG	= "'Application', 'Application Platform', 'Middleware', 'Common Service'";
	public static final String CITypes_SCHRANK		= "'Position'";
	public static final String CITypes_RAUM			= "'Room'";
	public static final String CITypes_GEBAEUDE		= "'Building'";
	public static final String CITypes_BUILDING_AREA= "'Building Area'";
	public static final String CITypes_TERRAIN		= "'Terrain'";
	public static final String CITypes_STANDORT		= "'Site'";
	public static final String CITypes_WAYS			= "'Way'";
	public static final String CITypes_FUNCTION		= "'Function'";
	public static final String CITypes_SERVICE      = "'Service'";
	public static final String NOT_BUSINESS_ESSENTIAL = "Not Business Essential";
	public static final String CITypes_BUSINESS_APPLICATION	=  "'Business Application'";
	
	public static final String APPLICATION_GUI_NAME = "AIR";
	public static final String UNKNOWN = "unknown";

	public static final String INSERT_QUELLE_ANT 	= "ANT";
	public static final String INSERT_QUELLE_GSDB 	= "GSDB";
	public static final String INSERT_QUELLE_RFC 	= "RFC";
	public static final String INSERT_QUELLE_SISEC 	= "SISecGUI";
	
	public static final String SERVICE_ENVIRONMENT_OWNER_SE_BCBS = "SE_BCBS";
	
	public static final String RESULT_OK = "OK";
	
	public static final String RESULT_ERROR = "ERROR";
	
	public static final String YES_SHORT = "Y";
	public static final String NO_SHORT = "N";
	public static final String YES = "Yes";
	public static final String NO = "No";
	
	public static final String QUESTION_MARK = "?";
	public static final String EQUAL = "=";
	public static final String KOMMA = ",";
	public static final String STRING_0 = "0";
	public static final String STRING_1 = "1";
	public static final String STRING_EMPTY = "";
	public static final String STRING_ONE_BLANK = " ";
	public static final String STRING_TRUE = "true";
	public static final String LOCATION_SEPARATOR = " / ";
	
	public static final String VERSION_PARAM = "app_version";

	public static final String PARAMETER_QUERYMODE_BEGINS_WITH = "BEGINS_WITH";
	public static final String PARAMETER_QUERYMODE_CONTAINS = "CONTAINS";
	public static final String PARAMETER_QUERYMODE_EMPTYSTRING = "";
	public static final String PARAMETER_QUERYMODE_EXACT = "EXACT";
	

	// request functions
	public static final String MY_CIS_SUBSTITUTE = "myCisSubstitute";
	public static final String MY_CIS = "myCis";
	public static final String MY_CIS_FOR_DELETE = "myCisForDelete";
	public static final String SEARCH_ACTION_OU = "ouSearch";
	
//	public static final String SEARCH_TYPE_SEARCH = "Search";
//	public static final String SEARCH_TYPE_ADV_SEARCH = "Advanced Search";//Adv. Search
	public static final String SEARCH_TYPE_OU_SEARCH = "Ou Search";//OU Search
	
	
	// ROLEs
	/*public static final String ROLE_AIR_ADMINISTRATOR 				= "AIR Administrator";
	public static final String ROLE_AIR_APPLICATION_LAYER 			= "AIR Application Layer";
	public static final String ROLE_AIR_APPLICATION_MANAGER 		= "AIR Application Manager";
	public static final String ROLE_AIR_COMPLIANCE_EDITOR			= "AIR Compliance Editor";
	public static final String ROLE_AIR_DEFAULT			 			= "AIR Default";
	public static final String ROLE_AIR_DEVELOPER			 		= "AIR Developer";
	public static final String ROLE_AIR_INFRASTRUCTURE_LAYER 		= "AIR Infrastructure Layer";
	public static final String ROLE_AIR_INFRASTRUCTURE_MANAGER 		= "AIR Infrastructure Manager";	
	public static final String ROLE_AIR_LOCATION_DATA_MAINTENANCE	= "AIR Location Data Maintenance";
	public static final String ROLE_BUSINESS_ESSENTIAL_EDITOR		= "AIR BusinessEssential-Editor";
	public static final String ROLE_AIR_BAR_EDITOR					= "AIR BAR Editor";
	public static final String ROLE_AIR_SPECIAL_ATTRIBUTE_EDITOR	= "AIR_SPECIAL_ATTRIBUTE_EDITOR";*/
	
	public static final String ROLE_AIR_ADMINISTRATOR 				= "AIR_Administrator";
	public static final String ROLE_AIR_APPLICATION_LAYER 			= "AIR_Application_Layer";
	public static final String ROLE_AIR_APPLICATION_MANAGER 		= "AIR_Application_Manager";
	public static final String ROLE_AIR_COMPLIANCE_EDITOR			= "AIR_Compliance_Editor";
	public static final String ROLE_AIR_DEFAULT			 			= "AIR_Default";
	public static final String ROLE_AIR_DEVELOPER			 		= "AIR_Developer";
	public static final String ROLE_AIR_INFRASTRUCTURE_LAYER 		= "AIR_Infrastructure_Layer";
	public static final String ROLE_AIR_INFRASTRUCTURE_MANAGER 		= "AIR_Infrastructure_Manager";	
	public static final String ROLE_AIR_LOCATION_DATA_MAINTENANCE	= "AIR_Location_Data_Maintenance";
	public static final String ROLE_BUSINESS_ESSENTIAL_EDITOR		= "AIR_BusinessEssential-Editor";
	public static final String ROLE_AIR_BAR_EDITOR					= "AIR_BAR_Editor";
	public static final String ROLE_AIR_SPECIAL_ATTRIBUTE_EDITOR	= "AIR_SPECIAL_ATTRIBUTE_EDITOR";
	public static final String ROLE_AIR_ASSET_EDITOR				= "AIR_Asset_Editor";
	public static final String ROLE_AIR_ASSET_MANAGER				= "AIR_Asset_Manager";
	
	
	//ISMS Roles 
	public static final String ROLE_ISM_MANAGER	= "ISM_MANAGER";
	public static final String ROLE_ISM_EDITOR  = "ISM_EDITOR";
	public static final String ROLE_ISM_READER = "ISM_READER";
	
	
	
	
	// --
	public static final String ROLE_BOV_ADMIN						= "BOV Admin";
	public static final String ROLE_BOV_EDITOR						= "BOV Editor";

	public static final String ROLE_SUBSTITUTE = "Substitute";

	public static final Long CI_SUPPORT_STUFF_TYPE_UserAuthorizationSupportedByDocumentation = new Long(1);
	public static final Long CI_SUPPORT_STUFF_TYPE_UserAuthorizationProcess = new Long(2);
	public static final Long CI_SUPPORT_STUFF_TYPE_ChangeManagementSupportedByTool = new Long(3);
	public static final Long CI_SUPPORT_STUFF_TYPE_UserManagementProcess = new Long(4);
	public static final Long CI_SUPPORT_STUFF_TYPE_ApplicationDocumentation = new Long(5);
	public static final Long CI_SUPPORT_STUFF_TYPE_RootDirectory = new Long(6);
	public static final Long CI_SUPPORT_STUFF_TYPE_DataDirectory = new Long(7);
	public static final Long CI_SUPPORT_STUFF_TYPE_ProvidedServices = new Long(8);
	public static final Long CI_SUPPORT_STUFF_TYPE_ProvidedMachineUsers = new Long(9);

	public static final Long COMPLIANCE_REQUEST_GR1435 = new Long(1);
	public static final Long COMPLIANCE_REQUEST_GR2059 = new Long(2);
	public static final Long COMPLIANCE_REQUEST_GR1920 = new Long(3);
	public static final Long COMPLIANCE_REQUEST_GR2008 = new Long(4);
	
	public static final Long CONFIDENTIALITY_SECRET = new Long(4);
	
	
	public static final Long ITSEC_GROUP_ID = new Long(11322);
	public static final Long REF_ID = new Long(81176);
	
	public static final String GPSCGROUP_DISABLED_MARKER = "DISABLED";
	public static final String GPSCGROUP_HIDDEN_DESCRIPTOR = "Hidden";
	public static final String[][] GPSCGROUP_MAPPING = new String [][] {
		{"1", "gpsccontactSupportGroup", "N", "SUPPORT GROUP - IM RESOLVER", "1,2,3,4,12,13,30,88"},
		{"2", "gpsccontactChangeTeam", "N", "CHANGE TEAM", "1,2,3,4,12,13,30,88"},
		{"3", "gpsccontactServiceCoordinator", "N", "SERVICE COORDINATOR", "1,2,3,4,12,13,30,88"},
		{"4", "gpsccontactEscalation", "N", "ESCALATION LIST", "1,2,3,4,12,13,30,88"},
		{"5", "gpsccontactCiOwner", "N", "CI OWNER", "1,2,3,4,12,13,30,88"},
		{"6", "gpsccontactOwningBusinessGroup", "N", "OWNING BUSINESS GROUP", "2"},
		{"8", "gpsccontactImplementationTeam", "N", "IMPLEMENTATION TEAM", "2"},
		{"9", "gpsccontactServiceCoordinatorIndiv", "Y", "(INDIV) SERVICE COORDINATOR", "1,2,3,4,12,13,30,88"},
		{"10", "gpsccontactEscalationIndiv", "Y", "(INDIV) ESCALATION LIST", "1,2,3,4,12,13,30,88"},
		{"11", "gpsccontactResponsibleAtCustomerSide", "Y", "RESPONSIBLE AT CUSTOMER SIDE", "1,2,3,4,12,13,30,88"},
		{"13", "gpsccontactSystemResponsible", "Y", "SYSTEM RESPONSIBLE", "1,2,3,4,12,13,30,88"},
		{"14", "gpsccontactImpactedBusiness", "N", "Impacted Business Group", "1,2,3,4,12,13,30,88"},
		{"15", "gpsccontactBusinessOwnerRepresentative", "Y", "Business Owner Representative", "2"}
	};
	public static final Integer CONTACT_TYPE_CI_OWNER = new Integer(5);
	public static final Integer CONTACT_TYPE_OWNING_BUSINESS_GROUP = new Integer(6);
	
	public static final Integer APPLICATION_CAT1_APPLICATION = new Integer(5);
	public static final Integer APPLICATION_CAT1_COMMON_SERVICE = new Integer(-10013);
	public static final Integer APPLICATION_CAT1_COMMON_MIDDLEWARE = new Integer(-10007);
	public static final Integer APPLICATION_CAT1_COMMON_APPLICATIONPLATFORM = new Integer(-10006);
	
	public static final Integer IT_SYSTEM_TYPE_HARDWARE_SYSTEM_IDENTIFIYING = new Integer(1);
	public static final Integer IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT = new Integer(2);
	
	public static final String IT_SYSTEM_TYPE_HARDWARE_SYSTEM = "Hardware System";
	public static final String IT_SYSTEM_TYPE_SYSTEM_PLATFORM = "Transient System Platform";
	public static final String IT_SYSTEM_TYPE_BUSINESS_APPLICATION = "Business Application";
	
	public static final Map<String, Integer> CI_TYPE_ORDERING = new HashMap<String, Integer>();
	
	static {
		CI_TYPE_ORDERING.put("Application", 1);
		CI_TYPE_ORDERING.put("Application Platform", 2);
		CI_TYPE_ORDERING.put("Middleware", 3);
		CI_TYPE_ORDERING.put("Common Service", 4);
		CI_TYPE_ORDERING.put("Transient System Platform", 5);
		CI_TYPE_ORDERING.put("Hardware System", 6);
		CI_TYPE_ORDERING.put("Position", 7);
		CI_TYPE_ORDERING.put("Room", 8);
		CI_TYPE_ORDERING.put("Building Area", 9);
		CI_TYPE_ORDERING.put("Building", 10);
		CI_TYPE_ORDERING.put("Terrain", 11);
		CI_TYPE_ORDERING.put("Site", 12);
		CI_TYPE_ORDERING.put("Function", 13);
		CI_TYPE_ORDERING.put("Way", 14);
		CI_TYPE_ORDERING.put("Service", 15);
		CI_TYPE_ORDERING.put("Business Application", 16);
	}
	
	public static final String PRODUCTIONSERVER = "BYZREG";
	public static final String PRODUCTIONURL = "https://air.de.bayer.cnb/AIR/P";
	public static final String QASERVER = "BYZREH";
	public static final String QAURL = "https://air-q.de.bayer.cnb/AIR/Q";
	
	public static final String UP = "UPSTREAM";
	public static final String DN = "DOWNSTREAM";
	public static final String APPLICATION_CATEGORY_2 = "Application Category 2";
	public static final String LIFE_CYCLE_STATUS = "Life Cycle";
	public static final String OPERATIONAL_STATUS = "General Usage";
	public static final String PRIORITY_LEVEL = "Priority Level";
	public static final String SEVERITY_LEVEL = "Severity Level";
	public static final String CLUSTER_CODE = "Cluster Code";
	public static final String CLUSTER_TYPE = "Cluster Type";
	public static final String PRIMARY_PERSON = "CI Owner - Primary Person";
	public static final String DELEGATE_PERSON_GROUP = "CI Owner - Delegate";
	public static final String APPLICATION_OWNER = "Application Owner";
	public static final String APPLICATION_OWNER_DELEGATE = "Application Owner Delegate";
	public static final String APPLICATION_STEWARD = "Application Steward";
	public static final String BUSINESS_CATEGORY = "Business Category";
	public static final String DESCRIPTION = "Description";
	public static final String VERSION = "Version";
	public static final String ORGANISATIONAL_SCOPE = "Organisational Scope";
	public static final String BAR_RELEVANCE = "BAR Relevance";
	public static final String DATA_CLASS = "Data Class";
	public static final String BUSINESS_ESSENTIAL = "Business Essential";
	public static final String OS_NAME = "OS Name";
	public static final String VIRTUAL_HARDWARE_CLIENT = "Virtual Hardware Client";
	//C0000181270-Appliance Flag
	public static final String Appliance_Flag = "Appliance Flag";
	public static final String VIRTUAL_HARDWARE_HOST = "Virtual Hardware Host";
	public static final String VIRTUAL_SOFTWARE = "Virtual Software";
	public static final String PRIMARY_FUNCTION = "Primary Function";
	public static final String PROVIDER_NAME = "PROVIDER_NAME";
	public static final String PROVIDER_ADDRESS = "PROVIDER_ADDRESS";
	public static final String IT_HEAD = "IT_HEAD";
	
	public static final String LINK = "Link";
	public static final String GR1435 = "GR1435";
	public static final String GR1920 = "GR1920";
	public static final String GR2059 = "GR2059";
	public static final String GR2008 = "GR2008";
	public static final String GXP = "GxP";
	public static final String ITSEC_GROUP = "ITSec Group";
	public static final String SLA = "SLA";
	public static final String SERVICE_CONTRACT = "Service Contract";
	public static final String PROTECTION_LEVEL_INTEGRITY = "Protection Level Integrity";
	public static final String EXPLANATION_FOR_PROTECTION_LEVEL = "Explanation for Protection Level";
	public static final String PROTECTION_LEVEL_CONFIDENTIALITY = "Protection Level Information Class";//RFC 11441
	public static final String EXPLANATION_FOR_PROTECTION_LEVEL_CONFIDENTIALITY = "Explanation for Information Class"; //RFC 11441
	public static final String PROTECTION_LEVEL_AVAILABILITY = "Protection Level Availability";
	public static final String EXPLANATION_FOR_PROTECTION_LEVEL_AVAILABILITY = "Explanation for Protection Level Availability";
	public static final String INFORMATION_CLASS = "Information Class";
	public static final String EXPLANATION_FOR_INFORMATION_CLASS = "Explanation for Information Class";
	
	//Table Names
	public static final String TABLE_BUSINESS_APPLICATION="BUSINESS_APPLICATION";
	
}
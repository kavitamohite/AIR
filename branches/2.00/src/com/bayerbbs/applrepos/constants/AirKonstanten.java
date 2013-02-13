package com.bayerbbs.applrepos.constants;


public final class AirKonstanten {
	public final static Long IT_SET_DEFAULT = new Long(10002);
	public final static Long BUSINESS_ESSENTIAL_DEFAULT = new Long(16);
	
	public final static int TABLE_ID_IT_SYSTEM		= 1;
	public final static int TABLE_ID_APPLICATION	= 2;
	public final static int TABLE_ID_ROOM			= 3;
	public final static int TABLE_ID_BUILDING		= 4;
	public final static int TABLE_ID_POSITION		= 13;
	public final static int TABLE_ID_TERRAIN		= 30;
	public final static int TABLE_ID_WAYS			= 37;
	public final static int TABLE_ID_BUILDING_AREA	= 88;
	public final static int TABLE_ID_SITE			= 12;

	
	public final static String APPLICATION_GUI_NAME = "AIR";
	
	public final static String INSERT_QUELLE_ANT 	= "ANT";
	public final static String INSERT_QUELLE_RFC 	= "RFC";
	public final static String INSERT_QUELLE_SISEC 	= "SISecGUI";
	
	public final static String RESULT_OK = "OK";
	
	public final static String RESULT_ERROR = "ERROR";
	
	public final static String YES_SHORT = "Y";
	public final static String NO_SHORT = "N";
	
	public final static String STRING_0 = "0";
	public final static String STRING_EMPTY = "";
	public final static String STRING_ONE_BLANK = " ";
	public final static String STRING_TRUE = "true";
	
	// ROLEs
	public final static String ROLE_AIR_ADMINISTRATOR 			= "AIR Administrator";
	public final static String ROLE_AIR_APPLICATION_LAYER 		= "AIR Application Layer";
	public final static String ROLE_AIR_APPLICATION_MANAGER 	= "AIR Application Manager";
	public final static String ROLE_AIR_DEFAULT			 		= "AIR Default";
	public final static String ROLE_AIR_DEVELOPER			 	= "AIR Developer";
	public final static String ROLE_AIR_INFRASTRUCTURE_LAYER 	= "AIR Infrastructure Layer";
	public final static String ROLE_AIR_INFRASTRUCTURE_MANAGER 	= "AIR Infrastructure Manager";
	
	public final static String ROLE_BUSINESS_ESSENTIAL_EDITOR = "AIR BusinessEssential-Editor";

	public final static String ROLE_SUBSTITUTE = "Substitute";

	public final static Long CI_SUPPORT_STUFF_TYPE_UserAuthorizationSupportedByDocumentation = new Long(1);
	public final static Long CI_SUPPORT_STUFF_TYPE_UserAuthorizationProcess = new Long(2);
	public final static Long CI_SUPPORT_STUFF_TYPE_ChangeManagementSupportedByTool = new Long(3);
	public final static Long CI_SUPPORT_STUFF_TYPE_UserManagementProcess = new Long(4);
	public final static Long CI_SUPPORT_STUFF_TYPE_ApplicationDocumentation = new Long(5);
	public final static Long CI_SUPPORT_STUFF_TYPE_RootDirectory = new Long(6);
	public final static Long CI_SUPPORT_STUFF_TYPE_DataDirectory = new Long(7);
	public final static Long CI_SUPPORT_STUFF_TYPE_ProvidedServices = new Long(8);
	public final static Long CI_SUPPORT_STUFF_TYPE_ProvidedMachineUsers = new Long(9);

	public final static Long COMPLIANCE_REQUEST_GR1435 = new Long(1);
	public final static Long COMPLIANCE_REQUEST_GR2059 = new Long(2);
	public final static Long COMPLIANCE_REQUEST_GR1920 = new Long(3);
	public final static Long COMPLIANCE_REQUEST_GR2008 = new Long(4);
	
	
	public final static String GPSCGROUP_DISABLED_MARKER = "DISABLED";
	public final static String GPSCGROUP_HIDDEN_DESCRIPTOR = "Hidden";
	public final static String[][] GPSCGROUP_MAPPING = new String [][] {
		{"1", "gpsccontactSupportGroup", "N", "SUPPORT GROUP - IM RESOLVER"},
		{"2", "gpsccontactChangeTeam", "N", "CHANGE TEAM"},
		{"3", "gpsccontactServiceCoordinator", "N", "SERVICE COORDINATOR"},
		{"4", "gpsccontactEscalation", "N", "ESCALATION LIST"},
		{"5", "gpsccontactCiOwner", "N", "CI OWNER"},
		{"6", "gpsccontactOwningBusinessGroup", "N", "OWNING BUSINESS GROUP"},
		{"8", "gpsccontactImplementationTeam", "N", "IMPLEMENTATION TEAM"},
		{"9", "gpsccontactServiceCoordinatorIndiv", "Y", "(INDIV) SERVICE COORDINATOR"},
		{"10", "gpsccontactEscalationIndiv", "Y", "(INDIV) ESCALATION LIST"},
		{"11", "gpsccontactResponsibleAtCustomerSide", "Y", "RESPONSIBLE AT CUSTOMER SIDE"},
		{"13", "gpsccontactSystemResponsible", "Y", "SYSTEM RESPONSIBLE"},
		{"14", "gpsccontactImpactedBusiness", "N", "Impacted Business Group"},
		{"15", "gpsccontactBusinessOwnerRepresentative", "Y", "Business Owner Representative"}
	};
	
	public final static Long APPLICATION_CAT1_APPLICATION = new Long(5);
	public final static Long APPLICATION_CAT1_COMMON_SERVICE = new Long(-10013);
	public final static Long APPLICATION_CAT1_COMMON_MIDDLEWARE = new Long(-10007);
	public final static Long APPLICATION_CAT1_COMMON_APPLICATIONPLATFORM = new Long(-10006);
	

}

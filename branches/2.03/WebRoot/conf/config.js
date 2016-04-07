// Application Name and Contacts
var app_name 			= 'Application Infrastructure Repository';
var app_shortname 		= 'AIR';
var app_vendor			= 'BBS';
var app_contact  		= 'ITILcenter@bayer.com';
var app_interfacename 	= 'AIR';
	
// Directories
var webcontext = '/AIR';
var imgcontext = 'images/';
var lngcontext = 'conf/lang/';
var doccontext = 'doc/';

//Languages 
var lng_DE 			= lngcontext + 'german.xml';
var lng_DETooltips 	= lngcontext + 'german_tooltips.xml';
var lng_DEHelp 		= lngcontext + 'german_help.xml';
var lng_EN 			= lngcontext + 'english.xml';
var lng_ENTooltips 	= lngcontext + 'english_tooltips.xml';
var lng_ENHelp 		= lngcontext + 'english_help.xml';


// Downloadable documents
var manual_en = doccontext + 'Manual.pdf';
var manual_de = doccontext + 'Manual.pdf';


// Images
var img_AppLogo = imgcontext + 'AIR_Logo_48x50.png';

var img_HeaderTop		= imgcontext + 'header_colorgradient_blue_1x65.jpg';
var img_HeaderBottom	= imgcontext + 'header_colorgradient_blue_1x25.jpg';
var img_HeaderBottom2	= imgcontext + 'header_colorgradient_blue_r_155x25.png'; // muss noch angepasst werden im Code
var img_CornerLeft		= imgcontext + 'rounding_left_blue_15x15.jpg';
var img_CornerRight		= imgcontext + 'rounding_right_blue_15x15.jpg';
var img_MenuLeft		= imgcontext + 'menu_left_155x200.jpg';//muss breiter gemacht werden, wenn Menu breiter werden muss
var img_MenuRight		= imgcontext + 'menu_right_155x200.jpg';
var img_Footer			= '';

var img_NavOn  = imgcontext + 'navmarker_on.png';
var img_NavOff = imgcontext + 'navmarker_off.png';

var img_Logon  = imgcontext + 'login_1_32x32.png';
var img_Logoff = imgcontext + 'logout_type2_16x16.png';

var img_LangEN = imgcontext + 'country_EN.png';// 'Flag_EnglishLanguage_16x16.png';
var img_LangDE = imgcontext + 'country_DE.png';//'Flag_GermanLanguage_16x16.png';

var img_Help = imgcontext + 'help_16x16.png';
var img_Info = imgcontext + 'Info_16x16.png';

var img_OK 		= imgcontext + 'ok_type2_48x48.png';
var img_Failed 	= imgcontext + 'failed_type2_48x48.png';
var img_Warning	= imgcontext + 'warning_type2_48x48.png';

var img_Search_offMouse = imgcontext + 'button_search.jpg';
var img_Search_onMouse  = imgcontext + 'button_search_mo.jpg';

var img_Email = imgcontext + 'email_type1_24x24.png';
var img_Print = '';

var img_gradientNavi_Info = imgcontext + 'gradientNavi_Info.png';

var img_AddPerson					= imgcontext + 'add_user_16x16.png';
var img_RemovePerson				= imgcontext + 'failed_type1_16x16.png';
var img_AddGroup					= imgcontext + 'add_group_16x16.png';
var img_RemoveGroup					= imgcontext + 'failed_type1_16x16.png';
var img_RemovePersonGroup			= imgcontext + 'failed_type1_16x16.png';
var img_AddSelectedPerson			= imgcontext + 'add_cwid_14x14.png';
var img_AddSelectedGroup			= imgcontext + 'add_cwid_14x14.png';
var img_AddConnection				= '';
var img_RemoveConnection			= '';
var img_AddSelectedConnection		= imgcontext + 'add_type2_16x16.png';
var img_RemoveSelectedConnection	= imgcontext + 'failed_type1_16x16.png';
var img_AddBusinessProcess          = imgcontext + 'add_type1_16x16.png';
var img_RemoveBusinessProcess       = imgcontext + 'failed_type1_16x16.png';


var img_TestLink	= imgcontext + 'configuration_type2_16x16.png';

// Mailtemplate
var mail_Subject	= "Your%20Todo%20for%20the%20CI%20<CIName>";
var mail_Text		= "Dear%20CI%20Owner,%0A%0APlease%20update%20your%20information%20to%20the%20CI%20%20<CIName>%20%20in%20the%20Application%20Infrastructure%20Repository%20(https://air.de.bayer.cnb)%20to%20the%20following:%0A%20-%20add%20text%20here%0A%0ABest%20regards,%0A<Username>";

// Check on DB-Connection
var dbLoginCheckInterval = 1000 * 60; //1000 milliSecs = 1 sec. * 60 = 1 min. (check every minute)

//Mailtemplate
var mail_Subject_product	= "Master%20data%20for%20the%20Manufacturer,%20Subcategory,%20Type,%20Model%20must%20be%20created.";
var mail_Text_product		= "Dear%20Sir%20or%20Madam,%0A%0APlease%20create%20new%20object%20as%20follows:%0A%0AManufacturer:%20%20<manufacturer>%0A%0ASubcategory:%20%20<subcategory>%0A%0AType:%20%20<type>%0A%0AModel:%20%20<model>%0A%0ABest%20Regards,%0A<Username>";

var mail_Subject_location	= "Master%20data%20for%20the%20Country,%20 Site,%20Building,%20Room,%20Rack - Position %20must%20be%20created.";
var mail_Text_location		= "Dear%20Sir%20or%20Madam,%0A%0APlease%20create%20new%20object%20as%20follows:%0A%0ACountry:%20%20<country>%0A%0ASite:%20%20<site>%0A%0ABuilding:%20%20<building>%0A%0ARoom:%20%20<room>%0A%0ARack:%20%20<rack>%0A%0ABest%20Regards,%0A<Username>";

var mail_Subject_Costcenter = "Master%20data%20for%20Cost%20Center,%20PSP-Element,%20must%20be%20created.";
var mail_blank_Text_Costcenter = "Dear%20Sir%20or%20Madam,%0A%0APlease%20create%20new%20object%20as%20follows:%0A%0ACost%20Center[KST]:%0A%0APSP-Element[PSP]:%0A%0ABest%20Regards,%0A<Username>";

var mail_Subject_softwareproduct	= "Master%20data%20for%20the%20Manufacturer,%20Product%20Name%20must%20be%20created.";
var mail_Text_softwareproduct		= "Dear%20Sir%20or%20Madam,%0A%0APlease%20create%20new%20object%20as%20follows:%0A%0AManufacturer:%20%20<manufacturer>%0A%0AProduct Name:%20%20<productName>%0A%0ABest%20Regards,%0A<Username>";

var mail_subject_hardware_asset = "Change%20notice";
var mail_blank_text_hardware_asset = "Dear%20Sir%20or%20Madam,%0A%0APlease%20find%20updated%20asset%20details%20as%20follow%20:%0A%0AProduct%20:%0AManufacturer:%20<manufacturer>%0ASubcategory:%20<subcategory>%0AType:%20<type>%0AModel:%20<model>%0ASAP%20Description:%20<sapDescription>%0A%0ABusiness%20Information%0AOrder%20Number:%20<orderNumber>%0ACost%20center:%20<costCenter>%0ALegal%20Entity:%20<legalEntity>%0A%0ATechnics%0ASerial%20Number:%20<serialNumber>%0ATechnical%20Master:%20<technicaMaster>%0ATechnical%20Number:%20<technicalNumber>%0AGeneral%20Usage:%20<generalUsage>%0ALifecycle%20status:%20<lifecycleStatus>%0A%0ALocation%0ACountry:%20<country>%0ASite:%20<site>%0ABuilding:%20<building>%0ARoom%20<room>%0ARack-position:%20<rack>%0A%0AContact%0ACost%20center%20manager:%20<costCenterManager>%0A%0ABest%20Regards,%0A<username>";
var mail_blank_text_software_asset = "Dear%20Sir%20or%20Madam,%0A%0APlease%20find%20updated%20asset%20details%20as%20follow%20:%0A%0AProduct%20:%0AManufacturer:%20<manufacturer>%0AProduct%20Name:%20<productName>%0ASAP%20Description:%20<sapDescription>%0A%0ABusiness%20Information%0AOrder%20Number:%20<orderNumber>%0ACost%20center:%20<costCenter>%0ALegal%20Entity:%20<legalEntity>%0A%0AContact%0ACost%20Center%20Manager:%20<costCenterManager>%0A%0ABest%20Regards,%0A<username>";
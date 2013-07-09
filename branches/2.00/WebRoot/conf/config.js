// Application Name, Version and Contacts
var app_version 		= '2.00.017';
var app_name 			= 'Application Infrastructure Repository';
var app_shortname 		= 'AIR';
var app_vendor			= 'BBS';
var app_contact  		= 'ITILcenter@bayer.com';
var app_interfacename 	= 'AIR';
	
// Directories
var webcontext = '/AIR';
var imgcontext = 'images/';//images/ /AIR/htdocs/images/
var lngcontext = 'conf/lang/';//lang/
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
var mail_Text		= "Dear%20CI%20Owner,%0A%0Aplease%20update%20your%20information%20to%20the%20CI%20%20<CIName>%20%20in%20the%20Application%20Infrastructure%20Repository%20(https://air-q.de.bayer.cnb)%20to%20the%20following:%0A%20-%20add%20text%20here%0A%0ABest%20regards,%0A<Username>";

// Check on DB-Connection
var dbLoginCheckInterval = 1000 * 60 * 10; //1000 milliSekunden = 1 Sekunde * 60 = 1 Minute * 10 = 10 Minuten
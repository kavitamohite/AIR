//var languagehelpstore = new Ext.data.XmlStore({
//    // store configs
//    autoLoad: false,
//    storeId: 'languageHelpStore',
//    url: 'lang/german_help.xml', // automatically configures a HttpProxy
//    // reader configs
//    record: 'Items', // records will have an "Item" tag
//    fields: [
//        // set up the fields mapping into the xml doc
//        {name: 'help_infotext'},
//        {name: 'help_myplace'},
//        {name: 'help_search'},
//        {name: 'help_search_advanced'},
//        {name: 'help_create_ci'},
//        {name: 'help_details_details'},
//        {name: 'help_details_specific'},
//        {name: 'help_details_contacts'},
//        {name: 'help_details_agreements'},
//        {name: 'help_details_protection'},
//        {name: 'help_details_compliance'},
//        {name: 'help_details_licensecosts'},
//        {name: 'help_details_connections'},
//        {name: 'help_details_supportstuff'},
//        {name: 'help_details_history'}
//
//    ],
//    isLoaded: false,
//    listeners: {
//		beforeload :  function(store, options) {
//			if (null != urlLanguage) {
//				languagehelpstore.proxy.api.read.url = urlLanguageHelp;
//			}
//		},load :  function(store, records, options) {
//
//			//Help elements
//
//			Ext.get("infotext").dom.innerHTML  = records[0].data['help_infotext'];
//			
//			helpMyPlace = records[0].data['help_myplace'];
//			helpMyPlaceMyCis = records[0].data['help_myplace'];
//			helpMyPlaceMyCisSubstitute = records[0].data['help_myplace'];
//			helpSearch = records[0].data['help_search'];
//			helpAdvancedSearch = records[0].data['help_search_advanced'];
//			helpNewCI = records[0].data['help_create_ci'];
//			helpDetailsDetails = records[0].data['help_details_details'];
//			helpDetailsSpecific = records[0].data['help_details_specific'];
//			helpDetailsContacts = records[0].data['help_details_contacts'];
//			helpDetailsAgreements = records[0].data['help_details_agreements'];
//			helpDetailsProtection = records[0].data['help_details_protection'];
//			helpDetailsCompliance = records[0].data['help_details_compliance'];
//			helpDetailsLicenseCosts = records[0].data['help_details_licensecosts'];
//			helpDetailsConnections = records[0].data['help_details_connections'];
//			helpDetailsSupportStuff = records[0].data['help_details_supportstuff'];
//			helpDetailsHistory = records[0].data['help_details_history'];
//
//			isLoaded = true;
//		}
//    }
//});
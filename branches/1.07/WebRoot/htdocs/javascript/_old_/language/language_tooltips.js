
//function setTooltipData(targetId, tooltipTitle, tooltipText) {
//	if (isDisableTooltip) {
//		// disable tooltip
//		Ext.QuickTips.unregister(targetId);
//	}
//	else {
//		Ext.QuickTips.register({
//			    target: targetId,
//			    title: tooltipTitle,
//			    text: tooltipText,
//			    width: 200,
//			    dismissDelay: 99000 // Hide after 99 seconds hover
//			});
//	}
//}



//var languagetooltipstore = new Ext.data.XmlStore({
//    // store configs
//    autoLoad: false,
//    storeId: 'languageTooltipStore',
//    // url: 'lang/german_tooltips.xml', // automatically configures a HttpProxy
//    url: 'lang/english_tooltips.xml', // automatically configures a HttpProxy
//    // reader configs
//    record: 'Items', // records will have an "Item" tag
//    fields: [
//        // set up the fields mapping into the xml doc
//
//        // specific
//        {name: 'applicationName'},
//        {name: 'applicationNameText'},
//        {name: 'applicationAlias'},
//        {name: 'applicationAliasText'},
//        {name: 'version'},
//        {name: 'versionText'},
//        {name: 'applicationCat2'},
//        {name: 'applicationCat2Text'},
//        {name: 'lifecycleStatus'},
//        {name: 'lifecycleStatusText'},
//        {name: 'operationalStatus'},
//        {name: 'operationalStatusText'},
//        {name: 'comments'},
//        {name: 'commentsText'},
//        
//        {name: 'applicationBusinessCat'},
//        {name: 'applicationBusinessCatText'},
//        {name: 'dataClassText'},
//        {name: 'dataClassText'},
//
//        // contacts
//        {name: 'ciResposnible'},
//        {name: 'ciResposnibleText'},
//        {name: 'ciSubResposnible'},
//        {name: 'ciSubResposnibleText'},
//
//        // agreements
//        {name: 'slaName'},
//        {name: 'slaNameText'},
//        {name: 'priorityLevel'},
//        {name: 'priorityLevelText'},
//        {name: 'serviceContract'},
//        {name: 'serviceContractText'},
//        {name: 'severityLevel'},
//        {name: 'severityLevelText'},
//        {name: 'businessEssential'},
//        {name: 'businessEssentialText'},
//        
//        // protection
//		{name: 'itSecSbAvailabilityId'},
//		{name: 'itSecSbAvailabilityIdText'},
//		{name: 'itSecSbAvailabilityDescription'},
//		{name: 'itSecSbAvailabilityDescriptionText'},
//        {name: 'itSecSbAppProtection'},
//        {name: 'itSecSbAppProtectionText'},
//        {name: 'protectionClassInformation'},
//        {name: 'protectionClassInformationText'},
//		{name: 'protectionClassInformationExplanation'},
//        {name: 'protectionClassInformationExplanationText'},
//        
//
//		
//		// compliance
//		{name: 'itsetName'},
//		{name: 'itsetNameText'},
//		{name: 'template'},
//		{name: 'templateText'},
//        {name: 'relevanceGR1920'},
//        {name: 'relevanceGR1920Text'},
//        {name: 'relevanceGR1435'},
//        {name: 'relevanceGR1435Text'},
//        {name: 'gxpFlag'},
//        {name: 'gxpFlagText'},
//        {name: 'riskAnalysisYN'},
//        {name: 'riskAnalysisYNText'},
//        {name: 'itsecGroup'},
//        {name: 'itsecGroupText'},
//        {name: 'references'},
//        {name: 'referencesText'},
//        
//        
//		// license
//		{name: 'licenseType'},
//		{name: 'licenseTypeText'},
//        {name: 'applicationAccessingUserCount'},
//		{name: 'applicationAccessingUserCountText'},
//		{name: 'costRunPa'},
//		{name: 'costRunPaText'},
//		{name: 'costChangePa'},
//		{name: 'costChangePaText'},
//		{name: 'currency'},
//		{name: 'currencyText'},
//		{name: 'runAccount'},
//		{name: 'runAccountText'},
//		{name: 'changeAccount'},
//		{name: 'changeAccountText'},
//
//		
//        // support stuff
//		{name: 'supportstuffAppDoc'},
//		{name: 'supportstuffAppDocText'},
//        {name: 'supportstuffAppRootDir'},
//        {name: 'supportstuffAppRootDirText'},
//        {name: 'supportstuffAppDataDir'},
//        {name: 'supportstuffAppDataDirText'},
//        {name: 'supportstuffAppProvidedServices'},
//        {name: 'supportstuffAppProvidedServicesText'},
//        {name: 'supportstuffAppProvidedMUser'},
//        {name: 'supportstuffAppProvidedMUserText'},
//        {name: 'supportstuffUASupportingDoc'},
//        {name: 'supportstuffUASupportingDocText'},
//        {name: 'supportstuffUAProcess'},
//        {name: 'supportstuffUAProcessText'},
//        {name: 'supportstuffCMSupportingTool'},
//        {name: 'supportstuffCMSupportingToolText'},
//        {name: 'supportstuffUMProcess'},
//        {name: 'supportstuffUMProcessText'}
//
//    ],
//    isLoaded: false,
//    listeners: {
//		beforeload :  function(store, options) {
//			if (null != urlLanguageTooltips) {
//				languagetooltipstore.proxy.api.read.url = urlLanguageTooltips;
//			}
//		},load :  function(store, records, options) {
//            
//			// Specific
//            setTooltipData('applicationName',  records[0].data['applicationName'],  records[0].data['applicationNameText']);
//            setTooltipData('applicationAlias',  records[0].data['applicationAlias'],  records[0].data['applicationAliasText']);
//			setTooltipData('applicationVersion', records[0].data['version'], records[0].data['versionText']);
//			setTooltipData('applicationCat2',  records[0].data['applicationCat2'],  records[0].data['applicationCat2Text']);
//            setTooltipData('lifecycleStatus', records[0].data['lifecycleStatus'], records[0].data['lifecycleStatusText']);
//			setTooltipData('operationalStatus', records[0].data['operationalStatus'], records[0].data['operationalStatusText']);
//			setTooltipData('comments', records[0].data['comments'], records[0].data['commentsText']);
//
//			setTooltipData('applicationBusinessCat', records[0].data['applicationBusinessCat'], records[0].data['applicationBusinessCatText']);
//			setTooltipData('dataClass', records[0].data['dataClass'], records[0].data['dataClassText']);
//
//            
//			// contacts
//			setTooltipData('ciResponsible', records[0].data['ciResposnible'], records[0].data['ciResposnibleText']);
//			setTooltipData('ciSubResponsible', records[0].data['ciSubResposnible'], records[0].data['ciSubResposnibleText']);
//
//			
//			// agreements
//			setTooltipData('sla', records[0].data['slaName'], records[0].data['slaNameText']);
//			setTooltipData('priorityLevel', records[0].data['priorityLevel'], records[0].data['priorityLevelText']);
//			setTooltipData('serviceContract', records[0].data['serviceContract'], records[0].data['serviceContractText']);
//			setTooltipData('severityLevel', records[0].data['severityLevel'], records[0].data['severityLevelText']);
//			setTooltipData('businessEssential', records[0].data['businessEssential'], records[0].data['businessEssentialText']);
//
//			
//			// protection
//			setTooltipData('protectionAvailability', records[0].data['itSecSbAvailabilityId'], records[0].data['itSecSbAvailabilityIdText']);
//			setTooltipData('protectionAvailabilityDescription', records[0].data['itSecSbAvailabilityDescription'], records[0].data['itSecSbAvailabilityDescriptionText']);
//			setTooltipData('protectionApplicationProtection', records[0].data['itSecSbAppProtection'], records[0].data['itSecSbAppProtectionText']);
//			setTooltipData('protectionClassInformation', records[0].data['protectionClassInformation'], records[0].data['protectionClassInformationText']);
//			setTooltipData('protectionClassInformationExplanation', records[0].data['protectionClassInformationExplanation'], records[0].data['protectionClassInformationExplanationText']);
//
//
//			// compliance
//			setTooltipData('itsetName', records[0].data['itsetName'], records[0].data['itsetNameText']);
//			setTooltipData('isTemplate', records[0].data['template'], records[0].data['templateText']);
//			setTooltipData('relevanceGR1920', records[0].data['relevanceGR1920'], records[0].data['relevanceGR1920Text']);
//			setTooltipData('relevanceGR1435', records[0].data['relevanceGR1435'], records[0].data['relevanceGR1435Text']);
//			setTooltipData('relevanceGxp', records[0].data['gxpFlag'], records[0].data['gxpFlagText']);
//			setTooltipData('applicationRiskAnalysis', records[0].data['riskAnalysisYN'], records[0].data['riskAnalysisYNText']);
//			setTooltipData('itsecGroup', records[0].data['itsecGroup'], records[0].data['itsecGroupText']);
//			setTooltipData('referencedTemplate', records[0].data['references'], records[0].data['referencesText']);
//			
//			
//			// license
//			setTooltipData('licenseType', records[0].data['licenseType'], records[0].data['licenseTypeText']);        
//			setTooltipData('applicationAccessingUserCount', records[0].data['applicationAccessingUserCount'], records[0].data['applicationAccessingUserCountText']);
//			setTooltipData('costRunPa', records[0].data['costRunPa'], records[0].data['costRunPaText']);
//			setTooltipData('costChangePa', records[0].data['costChangePa'], records[0].data['costChangePaText']);
//			setTooltipData('currency', records[0].data['currency'], records[0].data['currencyText']);
//			setTooltipData('runAccount', records[0].data['runAccount'], records[0].data['runAccountText']);
//			setTooltipData('changeAccount', records[0].data['changeAccount'], records[0].data['changeAccountText']);
//			
//			
//			// support stuff
//			setTooltipData('supportstuffAppDoc', records[0].data['supportstuffAppDoc'], records[0].data['supportstuffAppDocText']);
//			setTooltipData('supportstuffAppRootDir', records[0].data['supportstuffAppRootDir'], records[0].data['supportstuffAppRootDirText']);
//			setTooltipData('supportstuffAppDataDir', records[0].data['supportstuffAppDataDir'], records[0].data['supportstuffAppDataDirText']);
//			setTooltipData('supportstuffAppProvidedServices', records[0].data['supportstuffAppProvidedServices'], records[0].data['supportstuffAppProvidedServicesText']);
//			setTooltipData('supportstuffAppProvidedMUser', records[0].data['supportstuffAppProvidedMUser'], records[0].data['supportstuffAppProvidedMUserText']);
//			setTooltipData('supportstuffUASupportingDoc', records[0].data['supportstuffUASupportingDoc'], records[0].data['supportstuffUASupportingDocText']);
//			setTooltipData('supportstuffUAProcess', records[0].data['supportstuffUAProcess'], records[0].data['supportstuffUAProcessText']);
//			setTooltipData('supportstuffCMSupportingTool', records[0].data['supportstuffCMSupportingTool'], records[0].data['supportstuffCMSupportingToolText']);
//			setTooltipData('supportstuffUMProcess', records[0].data['supportstuffUMProcess'], records[0].data['supportstuffUMProcessText']);
//
//			isLoaded = true;
//		}
//    }
//});
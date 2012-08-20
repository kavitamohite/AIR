//var applicationProcessRecordDef = Ext.data.Record.create([ {
//	name: 'id'
//}, {
//	name: 'text'
//}]);
//
//var applicationProcessReader = new Ext.data.XmlReader({
//	record: 'viewdataDTO'
//}, applicationProcessRecordDef);
//
//var applicationProcessStore = new Ext.data.XmlStore({
//	// store configs
//	autoDestroy : true,
//	storeId : 'applicationProcessStore',
//	autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext + '/ApplicationWSPort',
//		loadMethod : 'getApplicationProcess',
//		timeout : 120000,
//		reader : applicationProcessReader
//	}),
//	baseParams : {
//		applicationId : -1,
//		cwid : cwid,
//		token : ''
//	},
//	fields : [ 'id', 'text' ],
//	// reader configs
//	reader : applicationProcessReader,
//	listeners : {
//		beforeload : function(store, options) {
//			applicationProcessStore.baseParams.cwid = cwid;
//			applicationProcessStore.baseParams.token = token;
//			applicationProcessStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//			var values = '';
//			var hiddenValues = '';
//			maxWidth = 25;
//			for(i=0;i<records.length;++i) {
////				if (maxWidth<records[i].data.text.length) {
////					maxWidth=records[i].data.text.length;
////				}
//				if (i===0) {
//					values = records[i].data.text;
//					hiddenValues = records[i].data.id;
//				} else {
//					values += '\n' + records[i].data.text;
//					hiddenValues += ',' + records[i].data.id;
//				}
//			}
////			if (maxWidth>50) {
////				maxWidth = 50;
////			}
////			Ext.getCmp('businessProcess').setWidth(maxWidth*7);
//			Ext.getCmp('businessProcess').setValue(values);
//			Ext.getCmp('businessProcessHidden').setValue(hiddenValues);
//		}
//	}
//});


//var applicationContactsRecordDef = Ext.data.Record.create([ {
//	name : 'groupId',
//	mapping : 'applicationContactEntryDTO > groupId'
//}, {
//	name : 'groupName',
//	mapping : 'applicationContactEntryDTO > groupName'
//}, {
//	name : 'personName',
//	mapping : 'applicationContactEntryDTO > personName'
//}, {
//	name : 'cwid',
//	mapping : 'applicationContactEntryDTO > cwid'
//}, {
//	name : 'groupTypeId',
//	mapping : 'groupTypeId'
//}, {
//	name : 'groupTypeName',
//	mapping : 'groupTypeName'
//}, {
//	name : 'individualContactYN',
//	mapping : 'individualContactYN'
//}, {
//	name : 'maxContacts',
//	mapping : 'maxContacts'
//}, {
//	name : 'minContacts',
//	mapping : 'minContacts'
//}]);
//
//var applicationContactsReader = new Ext.data.XmlReader({
//	record : 'applicationContactGroupDTO'
//}, applicationContactsRecordDef);
//
//var applicationContactsStore = new Ext.data.XmlStore({
//	// store configs
//	autoDestroy : true,
//	storeId : 'applicationContactsStore',
//	autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext + '/ApplicationWSPort',
//		loadMethod : 'getApplicationContacts',
//		timeout : 120000,
//		reader : applicationContactsReader
//	}),
//	baseParams : {
//		applicationId : -1,
//		cwid : cwid,
//		token : ''
//	},
//	fields : [ 'groupId', 'groupName', 'personName', 'groupTypeId', 'groupTypeName', 'individualContactYN',
//			'maxContacts', 'minContacts' ],
//	// reader configs
//	reader : applicationContactsReader,
//	listeners : {
//		beforeload : function(store, options) {
//			applicationContactsStore.baseParams.cwid = cwid;
//			applicationContactsStore.baseParams.token = token;
//			applicationContactsStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//
//			// for next Schleife
//			for ( var i = 0; i < records.length; ++i) {
//				setContactInformation(records[i]);
//			}
//			fillDetailsInformation();
//		}
//	}
//});

//var setContactInformation = function(myRecord) {
//
//	if (undefined !== myRecord) {
//		var contact = myRecord.data;
//		if ('Y' === contact['individualContactYN']) {
//			contactcwid = contact['cwid'];
//			personName = contact['personName'];
//			Ext.getCmp(gpscContactsMap[contact['groupTypeId']]).setValue(personName);
//			Ext.getCmp(gpscContactsMap[contact['groupTypeId']] + 'Hidden').setValue(contactcwid);
//		} else {
//			groupName = contact['groupName'];
//			groupId = contact['groupId'];
//			Ext.getCmp(gpscContactsMap[contact['groupTypeId']]).setValue(groupName);
//			Ext.getCmp(gpscContactsMap[contact['groupTypeId']] + 'Hidden').setValue(groupId);
//		}
//	}
//	Ext.getCmp(gpscContactsMap[contact['groupTypeId']]).show();
//
//};



//var applicationCat1ListRecordDef = Ext.data.Record.create([ {
//	name : 'id',
//	mapping : 'applicationCat1Id'
//}, {
//	name : 'text',
//	mapping : 'applicationCat1Text'
//}, {
//	name : 'english',
//	mapping : 'applicationCat1En'
//}]);
//
//var applicationCat1ListReader = new Ext.data.XmlReader({
//	record : "return",
//	idProperty : 'id'
//}, applicationCat1ListRecordDef);
//
//var applicationCat1ListStore = new Ext.data.XmlStore({
//	// store configs
//	autoDestroy : false,
//	storeId : 'aCat1Store',
//	autoLoad : true,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext + '/ApplicationCat1WSPort',
//		loadMethod : 'getApplicationCat1List',
//		timeout : 120000,
//		reader : applicationCat1ListReader
//	}),
//	fields : [ 'id', 'text', 'english' ],
//	// reader configs
//	reader : applicationCat1ListReader
//});



//var applicationCat2ListRecordDef = Ext.data.Record.create([ {
//	name : 'applicationCat1Id'
//}, {
//	name : 'id',
//	mapping : 'applicationCat2Id'
//}, {
//	name : 'text',
//	mapping : 'applicationCat2Text'
//}, {
//	name : 'guiSAPNameWizard',
//	mapping : 'guiSAPNameWizard'
//}]);
//
//var applicationCat2ListReader = new Ext.data.XmlReader({
//	record : "return",
//	idProperty : 'id'
//}, applicationCat2ListRecordDef);
//
//var applicationCat2ListStore = new Ext.data.XmlStore({
//	// store configs
//	autoDestroy : true,
//	storeId : 'aCat2Store',
//	autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext + '/ApplicationCat2WSPort',
//		loadMethod : 'findApplicationCat2ByApplicationKat1Id',
//		timeout : 120000,
//		reader : applicationCat2ListReader
//	}),
//	baseParams : {
//		anwendungKat1Id : 0
//	},
//	fields : [ 'applicationCat1Id', 'id', 'text', 'guiSAPNameWizard' ],
//	// reader configs
//	reader : applicationCat2ListReader,
//	listeners : {
//		beforeload : function(store, options) {
//			applicationCat2ListStore.baseParams.anwendungKat1Id = selectedCiCat1Id;
//		}
//	}
//});



//var applicationCreateRecordDef = Ext.data.Record.create([ {
//	name : 'result'
//}, {
//	name : 'displayMessage'
//}, {
//	name : 'messages'
//}, {
//	name: 'applicationId'
//}]);
//
//var applicationCreateReader = new Ext.data.XmlReader({
//	record : "return"
//}, applicationCreateRecordDef);
//
//var applicationCreateStore = new Ext.data.XmlStore({
//	autoDestroy : true,
//	storeId : 'appCreateStore',
//	autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext + '/ApplicationWSPort',
//		loadMethod : 'createApplication',
//		timeout : 120000,
//		reader : applicationCreateReader
//	}),
//	baseParams : {
//		cwid : cwid,
//		token : '',
//		applicationId : 0
//	},
//	fields: [ 'result', 'displayMessage', 'messages' ],
//	// reader configs
//	reader: applicationCreateReader,
//	listeners: {
//		beforeload : function(store, options) {
////			saveMsg = languagestore.getAt(0).data['gerneral_message_saving'];
//			mySaveMask.show({
//				msg : languagestore.getAt(0).data['gerneral_message_saving']
//			});
//		},
//		load: function(store, records, options) {
//			mySaveMask.hide();
//			switch(records[0].data.result) {
//				case 'OK':
//					selectedCIId = records[0].data.applicationId;
//		
//					var continueEditingCallback = function() {
//						showCiDetailDataChanged = false;
//						actionButtonHandler(false, true);
//					};
//					
//					var createNewCiCallback = function() {
//						wizardStart(true);
//					};
//					
//					var redirectToSearchCallback = function() {
//						selectedCIId = -1;
//						actionButtonHandler(true, false);
//					};
//		
//					var callbackMap = {
//						'continueEditing': continueEditingCallback,
//						'createNewCi': createNewCiCallback,
//						'redirectToSearch': redirectToSearchCallback
//					};
//					
//					var afterSaveAppWindow = createDynamicMessageWindow('AFTER_APP_SAVE', callbackMap);
//					afterSaveAppWindow.show();
//					break;
//					
//				case 'ERROR':
//					var afterSaveAppFailWindow = createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.displayMessage);
//					afterSaveAppFailWindow.show();
//					break;
//			}
//			/*if ('OK' === records[0].data.result) {
//				// save ok
//				// MessageBox
//				msgTextTitle = languagestore.getAt(0).data['wizardSaveSuccessTitle'];
//				msgText = languagestore.getAt(0).data['wizardSaveSuccess'];
//				selectedCIId = records[0].data.applicationId;
//				// Show a dialog using config options:
//				Ext.Msg.show({
//					title : msgTextTitle,
//					msg : msgText,
//					buttons : Ext.Msg.YESNO,
//					fn : function(btn, text, opt) {
//						showCiDetailDataChanged = false;
//						if (btn === 'yes') {//zur Editmaske
//							actionButtonHandler(false, true);
//						} else if (btn === 'no') {//zur Suche
//							actionButtonHandler(true, false);
//							selectedCIId = -1;
//						}
//					},
//					icon : 'ext-mb-wizard-saved'
//				});
//			}
//
//			if ('ERROR' === records[0].data.result) {
//				// error when creating
//				msgTextTitle = languagestore.getAt(0).data['wizardSaveFailTitle'];
//				msgText = languagestore.getAt(0).data['wizardFailSuccess'];
//				Ext.Msg.show({
//					title : msgTextTitle,
//					msg : msgText + records[0].data.displayMessage,
//					buttons : Ext.Msg.OK,
//					fn : function(btn, text, opt) {
//						Ext.emptyFn();
//					},
//					icon : Ext.MessageBox.OK
//				});
//			}*/
//		}
//	}
//});



//var applicationDetailRecordDef = Ext.data.Record.create([ {
//	name : 'applicationId',
//	mapping : 'applicationDTO > applicationId'
//}, {
//	name : 'applicationName',
//	mapping : 'applicationDTO > applicationName'
//}, {
//	name : 'applicationAlias',
//	mapping : 'applicationDTO > applicationAlias'
//}, {
//	name : 'categoryBusinessId',
//	mapping : 'applicationDTO > categoryBusinessId'
//}, {
//	name : 'categoryBusiness',
//	mapping : 'applicationDTO > categoryBusiness'
//}, {
//	name : 'dataClassId',
//	mapping : 'applicationDTO > classDataId'
//}, {
//	name : 'dataClass',
//	mapping : 'applicationDTO > classData'
//}, {
//	name : 'applicationCat1Id',
//	mapping : 'applicationDTO > applicationCat1Id'
//}, {
//	name : 'applicationCat1Txt',
//	mapping : 'applicationDTO > applicationCat1Txt'
//}, {
//	name : 'applicationCat2',
//	mapping : 'applicationDTO > applicationCat2Id'
//}, {
//	name : 'applicationCat2Txt',
//	mapping : 'applicationDTO > applicationCat2Txt'
//}, {
//	name : 'clusterCode',
//	mapping : 'applicationDTO > clusterCode'
//}, {
//	name : 'clusterType',
//	mapping : 'applicationDTO > clusterType'
//}, {
//	name : 'lifecycleStatusId',
//	mapping : 'applicationDTO > lifecycleStatusId'
//}, {
//	name : 'lifecycleStatusTxt',
//	mapping : 'applicationDTO > lifecycleStatusTxt'
//}, {
//	name : 'operationalStatusId',
//	mapping : 'applicationDTO > operationalStatusId'
//}, {
//	name : 'operationalStatusTxt',
//	mapping : 'applicationDTO > operationalStatusTxt'
//}, {
//	name : 'ciResponsible',
//	mapping : 'applicationDTO > responsible'
//}, {
//	name : 'ciResponsibleHidden',
//	mapping : 'applicationDTO > responsibleHidden'
//}, {
//	name : 'ciSubResponsible',
//	mapping : 'applicationDTO > subResponsible'
//}, {
//	name : 'ciSubResponsibleHidden',
//	mapping : 'applicationDTO > subResponsibleHidden'
//}, {
//	name : 'applicationOwner',
//	mapping : 'applicationDTO > applicationOwner'
//}, {
//	name : 'applicationOwnerHidden',
//	mapping : 'applicationDTO > applicationOwnerHidden'
//}, {
//	name : 'applicationOwnerDelegate',
//	mapping : 'applicationDTO > applicationOwnerDelegate'
//}, {
//	name : 'applicationOwnerDelegateHidden',
//	mapping : 'applicationDTO > applicationOwnerDelegateHidden'
//}, {
//	name : 'itset',
//	mapping : 'applicationDTO > itset'
//}, {
//	name : 'itsetName',
//	mapping : 'applicationDTO > itsetName'
//}, {
//	name : 'isTemplate',
//	mapping : 'applicationDTO > template'
//}, {
//	name : 'isTemplateReferencedByItem',
//	mapping : 'applicationDTO > templateReferencedByItem'
//}, {
//	name : 'relevanceGR1435',
//	mapping : 'applicationDTO > relevanceGR1435'
//}, {
//	name : 'relevanceGR1775',
//	mapping : 'applicationDTO > relevanceGR1775'
//}, {
//	name : 'relevanceGR1920',
//	mapping : 'applicationDTO > relevanceGR1920'
//}, {
//	name : 'relevanceGR2008',
//	mapping : 'applicationDTO > relevanceGR2008'
//}, {
//	name : 'ciComplianceRequestId1435',
//	mapping : 'applicationDTO > ciComplianceRequestId1435'
//}, {
//	name : 'ciComplianceRequestId1775',
//	mapping : 'applicationDTO > ciComplianceRequestId1775'
//}, {
//	name : 'ciComplianceRequestId1920',
//	mapping : 'applicationDTO > ciComplianceRequestId1920'
//}, {
//	name : 'ciComplianceRequestId2008',
//	mapping : 'applicationDTO > ciComplianceRequestId2008'
//}, {
//	name : 'gxpFlagId',
//	mapping : 'applicationDTO > gxpFlagId'
//}, {
//	name : 'gxpFlagTxt',
//	mapping : 'applicationDTO > gxpFlagTxt'
//}, {
//	name : 'itsecGroupId',
//	mapping : 'applicationDTO > itsecGroupId'
//}, {
//	name : 'itsecGroupTxt',
//	mapping : 'applicationDTO > itsecGroup'
//}, {
//	name : 'refId',
//	mapping : 'applicationDTO > refId'
//}, {
//	name : 'references',
//	mapping : 'applicationDTO > refTxt'
//}, {
//	name : 'slaId',
//	mapping : 'applicationDTO > slaId'
//}, {
//	name : 'sla',
//	mapping : 'applicationDTO > slaName'
//}, {
//	name : 'serviceContractId',
//	mapping : 'applicationDTO > serviceContractId'
//}, {
//	name : 'serviceContract',
//	mapping : 'applicationDTO > serviceContract'
//}, {
//	name : 'comments',
//	mapping : 'applicationDTO > comments'
//}, {
//	name : 'isEditable',
//	mapping : 'applicationDTO > isEditable'
//}, {
//	name : 'priorityLevelId',
//	mapping : 'applicationDTO > priorityLevelId'
//}, {
//	name : 'priorityLevel',
//	mapping : 'applicationDTO > priorityLevel'
//}, {
//	name : 'severityLevelId',
//	mapping : 'applicationDTO > severityLevelId'
//}, {
//	name : 'severityLevel',
//	mapping : 'applicationDTO > severityLevel'
//}, {
//	name : 'locationPath',
//	mapping : 'applicationDTO > locationPath'
//}, {
//	name : 'businessEssentialId',
//	mapping : 'applicationDTO > businessEssentialId'
//}, {
//	name : 'businessEssential',
//	mapping : 'applicationDTO > businessEssential'
//}, {
//	name : 'riskAnalysisYN',
//	mapping : 'applicationDTO > riskAnalysisYN'
//}, {
//	name : 'licenseType',
//	mapping : 'applicationDTO > licenseTypeTxt'
//}, {
//	name : 'licenseTypeId',
//	mapping : 'applicationDTO > licenseTypeId'
//}, {
//	name : 'applicationAccessingUserCount',
//	mapping : 'applicationDTO > accessingUserCount'
//}, {
//	name : 'applicationVersion',
//	mapping : 'applicationDTO > version'
//}, {
//	name : 'costRunPa',
//	mapping : 'applicationDTO > costRunPa'
//}, {
//	name : 'costChangePa',
//	mapping : 'applicationDTO > costChangePa'
//}, {
//	name : 'currencyId',
//	mapping : 'applicationDTO > currencyId'
//}, {
//	name : 'currency',
//	mapping : 'applicationDTO > currencyTxt'
//}, {
//	name : 'costRunAccountId',
//	mapping : 'applicationDTO > costRunAccountId'
//}, {
//	name : 'costRunAccountTxt',
//	mapping : 'applicationDTO > costRunAccountTxt'
//}, {
//	name : 'costChangeAccountId',
//	mapping : 'applicationDTO > costChangeAccountId'
//}, {
//	name : 'costChangeAccountTxt',
//	mapping : 'applicationDTO > costChangeAccountTxt'
//}, {
//	name : 'licenseUsingRegions',
//	mapping : 'applicationDTO > licenseUsingRegions'
//},
//
//// itSec
//{
//	name : 'itSecSbAvailabilityId',
//	mapping : 'applicationDTO > itSecSbAvailabilityId'
//}, {
//	name : 'itSecSbAvailabilityTxt',
//	mapping : 'applicationDTO > itSecSbAvailabilityTxt'
//}, {
//	name : 'protectionAvailabilityDescription',
//	mapping : 'applicationDTO > itSecSbAvailabilityDescription'
//}, {
//	name : 'classInformationId',
//	mapping : 'applicationDTO > classInformationId'
//}, {
//	name : 'classInformationTxt',
//	mapping : 'applicationDTO > classInformationTxt'
//}, {
//	name : 'protectionClassInformationExplanation',
//	mapping : 'applicationDTO > classInformationExplanation'
//}, {
//	name : 'protectionApplicationProtection',
//	mapping : 'applicationDTO > applicationProtection'
//},
//
//
//// support stuff
//{
//	name : 'supportstuffUASupportingDoc',
//	mapping : 'applicationDTO > ciSupportStuffUserAuthorizationSupportedByDocumentation'
//}, {
//	name : 'supportstuffUAProcess',
//	mapping : 'applicationDTO > ciSupportStuffUserAuthorizationProcess'
//}, {
//	name : 'supportstuffCMSupportingTool',
//	mapping : 'applicationDTO > ciSupportStuffChangeManagementSupportedByTool'
//}, {
//	name : 'supportstuffUMProcess',
//	mapping : 'applicationDTO > supportstuffUMProcess'
//}, {
//	name : 'supportstuffAppDoc',
//	mapping : 'applicationDTO > ciSupportStuffApplicationDocumentation'
//}, {
//	name : 'supportstuffAppRootDir',
//	mapping : 'applicationDTO > ciSupportStuffRootDirectory'
//}, {
//	name : 'supportstuffAppDataDir',
//	mapping : 'applicationDTO > ciSupportStuffDataDirectory'
//}, {
//	name : 'supportstuffAppProvidedServices',
//	mapping : 'applicationDTO > ciSupportStuffProvidedServices'
//}, {
//	name : 'supportstuffAppProvidedMUser',
//	mapping : 'applicationDTO > ciSupportStuffProvidedMachineUsers'
//}, {
//	name : 'ciSupportStuffUserManagement',
//	mapping : 'applicationDTO > ciSupportStuffUserManagement'
//},
//
//// insert / update infos
//{
//	name : 'insertQuelle',
//	mapping : 'applicationDTO > insertQuelle'
//}, {
//	name : 'insertTimestamp',
//	mapping : 'applicationDTO > insertTimestamp'
//}, {
//	name : 'insertUser',
//	mapping : 'applicationDTO > insertUser'
//}, {
//	name : 'updateQuelle',
//	mapping : 'applicationDTO > updateQuelle'
//}, {
//	name : 'updateTimestamp',
//	mapping : 'applicationDTO > updateTimestamp'
//}, {
//	name : 'updateUser',
//	mapping : 'applicationDTO > updateUser'
//},
//
//// access rights acl
//// =================
//{
//	name : 'relevanceOperational',
//	mapping : 'applicationAccessDTO > relevanceOperational'
//}, {
//	name : 'relevanceStrategic',
//	mapping : 'applicationAccessDTO > relevanceStrategic'
//}, {
//	name : 'aclBusiness_Essential_Id',
//	mapping : 'applicationAccessDTO > business_Essential_Id'
//}, {
//	name : 'aclGxp_Flag',
//	mapping : 'applicationAccessDTO > gxp_Flag'
//}, {
//	name : 'aclItsec_Gruppe_Id',
//	mapping : 'applicationAccessDTO > itsec_Gruppe_Id'
//}, {
//	name : 'aclItsec_SB_Integ_ID',
//	mapping : 'applicationAccessDTO > itsec_SB_Integ_ID'
//}, {
//	name : 'aclItsec_SB_Integ_Txt',
//	mapping : 'applicationAccessDTO > itsec_SB_Integ_Txt'
//}, {
//	name : 'aclItsec_SB_Verfg_ID',
//	mapping : 'applicationAccessDTO > itsec_SB_Verfg_ID'
//}, {
//	name : 'aclItsec_SB_Verfg_Txt',
//	mapping : 'applicationAccessDTO > itsec_SB_Verfg_Txt'
//}, {
//	name : 'aclItsec_SB_Vertr_ID',
//	mapping : 'applicationAccessDTO > itsec_SB_Vertr_ID'
//}, {
//	name : 'aclItsec_SB_Vertr_Txt',
//	mapping : 'applicationAccessDTO > itsec_SB_Vertr_Txt'
//}, {
//	name : 'aclLicense_Scanning',
//	mapping : 'applicationAccessDTO > license_Scanning'
////}, {
////	name : 'aclPrimary_Function_Id',
////	mapping : 'applicationAccessDTO > primary_Function_Id'
//}, {
//	name : 'aclPriority_Level_Id',
//	mapping : 'applicationAccessDTO > priority_Level_Id'
//}, {
//	name : 'aclRef_Id',
//	mapping : 'applicationAccessDTO > ref_Id'
//}, {
//	name : 'aclRelevance_Ics',
//	mapping : 'applicationAccessDTO > relevance_Ics'
//}, {
//	name : 'aclRelevanz_Itsec',
//	mapping : 'applicationAccessDTO > relevanz_Itsec'
//}, {
//	name : 'aclResponsible',
//	mapping : 'applicationAccessDTO > responsible'
//}, {
//	name : 'aclSample_Test_Date',
//	mapping : 'applicationAccessDTO > sample_Test_Date'
//}, {
//	name : 'aclSample_Test_Result',
//	mapping : 'applicationAccessDTO > sample_Test_Result'
//}, {
//	name : 'aclService_Contract_Id',
//	mapping : 'applicationAccessDTO > service_Contract_Id'
//}, {
//	name : 'aclSeverity_Level_Id',
//	mapping : 'applicationAccessDTO > severity_Level_Id'
//}, {
//	name : 'aclSla_Id',
//	mapping : 'applicationAccessDTO > sla_Id'
//}, {
//	name : 'aclSub_Responsible',
//	mapping : 'applicationAccessDTO > sub_Responsible'
//}]);
//
//var applicationDetailReader = new Ext.data.XmlReader({
//	record: 'return'
//}, applicationDetailRecordDef);
//
//var applicationDetailStore = new Ext.data.XmlStore({
//	autoDestroy: true,
//	storeId: 'adStore',
//	autoLoad: false,
//	
//	proxy: new Ext.ux.soap.SoapProxy({
//		url: webcontext + '/ApplicationWSPort',
//		loadMethod : 'getApplicationDetail',
//		timeout: 120000,
//		reader: applicationDetailReader
//	}),
//	
//	baseParams : {
//		applicationId: -1,
//		cwid: cwid,
//		token: ''
//	},
//	
//	fields: [ 
//		'applicationDTO', 'applicationId', 'applicationName', 'applicationAlias', 'applicationCat1Id',
//		'applicationCat1Txt', 'applicationCat2', 'applicationCat2Txt', 'isEditable'
//	],
//
//	reader: applicationDetailReader,
//	
//	listeners: {
//		beforeload: function(store, options) {
//			myLoadMask.show();
//		},
//		load: function(store, records, options) {
//			AIR.AirApplicationManager.setAppDetail(records[0].data);
//			
//			var rec = records[0].data;
//			for(var k = 0; k < records[0].fields.keys.length; ++k) {
//				if(Ext.getCmp(records[0].fields.keys[k]) !== undefined)
//					Ext.getCmp(records[0].fields.keys[k]).setValue(rec[records[0].fields.keys[k]]);
//			}
//			Ext.get('editpanelheader').dom.innerHTML = rec['applicationName'];
//			Ext.get('editpanelsubheader').dom.innerHTML = rec['applicationCat1Txt'];
//
//			selectedCiCat1Id = rec['applicationCat1Id'];
//			Ext.getCmp('objectType').setValue(selectedCiCat1Id);
//
//			Ext.getCmp('applicationCat2').store.load({
//				baseParams: {
//					anwendungKat1Id : selectedCiCat1Id
//				}
//			});
//			if (rec['applicationCat2'] !== undefined && rec['applicationCat2'] != 0) {
//				Ext.getCmp('applicationCat2').setRawValue(rec['applicationCat2Txt']);
//			} else {
//				Ext.getCmp('applicationCat2').setValue('');
//			}
//
//			// ------
//			selectedCategoryBusinessId = rec['categoryBusinessId'];
//			if (selectedCategoryBusinessId !== undefined && selectedCategoryBusinessId != 0) {
//				Ext.getCmp('cbApplicationBusinessCat').setValue(selectedCategoryBusinessId);
//			} else {
//				Ext.getCmp('cbApplicationBusinessCat').setValue('');
//			}
//
//			// ------
//			selectedDataClassId = rec['dataClassId'];
//			if (selectedDataClassId !== undefined && selectedDataClassId != 0 && selectedDataClassId != '0') {
//				Ext.getCmp('cbDataClass').setValue(selectedDataClassId);
//				// reload the list store to refresh the values
////				dataClassListStore.load();//überflüssig ?
//			} else {
////				Ext.getCmp('cbDataClass').setValue('0');
////				dataClassListStore.load();
//				selectedDataClassId = '';
//				Ext.getCmp('cbDataClass').setDisabled(true);
//			}
//			
//			// ------
//			selectedBusinessEssentialId = rec['businessEssentialId'];
//			if (selectedBusinessEssentialId !== undefined && selectedBusinessEssentialId != 0) {
//				Ext.getCmp('businessEssential').setValue(rec['businessEssential']);
//			} else {
//				Ext.getCmp('businessEssential').setValue('');
//			}
//			
//			var ciSpecificsView = Ext.getCmp('specificsPanel');
//			ciSpecificsView.update(records[0].data);
//
//			
//			// ------ CiComplianceView
//			//ComplianceMgmt
//			var ciComplianceView = Ext.getCmp('compliancePanel');//this.getComponent('compliancePanel');
//			ciComplianceView.update(records[0].data);
//			
//			
////			if(undefined!==rec['relevanceGR1435']) {
////				Ext.getCmp('relevanceGR1435').setValue(rec['relevanceGR1435']==='Y'?true:false);
////			}
////			if(undefined!==rec['relevanceGR1775']) {
////				Ext.getCmp('relevanceGR1775').setValue(rec['relevanceGR1775']==='Y'?true:false);
////				// set the button
////				var buttonChecked = rec['relevanceGR1775']==='Y'?1:0;
////				toggleEditButton(buttonChecked, Ext.getCmp('bRelevanceGR1775'), Ext.getCmp('msgrelevanceGR1775'));
////			}
////			if(undefined!==rec['relevanceGR1920']) {
////				Ext.getCmp('relevanceGR1920').setValue(rec['relevanceGR1920']==='Y'?true:false);
////				// set the button
////				buttonChecked = rec['relevanceGR1920']==='Y'?1:0;
////				toggleEditButton(buttonChecked, Ext.getCmp('bRelevanceGR1920'), Ext.getCmp('msgrelevanceGR1920'));
////			}
////			if(undefined!==rec['relevanceGR2008']) {
////				Ext.getCmp('relevanceGR2008').setValue(rec['relevanceGR2008']==='Y'?true:false);
////				// set the button
////				buttonChecked = rec['relevanceGR2008']==='Y'?1:0;
////				toggleEditButton(buttonChecked, Ext.getCmp('bRelevanceGR2008'), Ext.getCmp('msgrelevanceGR2008'));
////			}
////			selectedGxpFlagTxt = rec['gxpFlagId'];
////			if (selectedGxpFlagTxt !== undefined && selectedGxpFlagTxt != 0) {
////				Ext.getCmp('relevanceGxp').setValue(true);
////				Ext.getCmp('CBrelevanceGxp').setValue(selectedGxpFlagTxt);
////			} else {
////				Ext.getCmp('relevanceGxp').setValue(false);
////				Ext.getCmp('CBrelevanceGxp').setValue('');
////			}
////			
////			Ext.getCmp('bRelevanceGR1435').enable();
////			Ext.getCmp('bRelevanceGR1435').show();
////			Ext.getCmp('rgRelevanceBYTSEC').enable();
////			
////			if (CI_GROUP_ID_NON_BYTSEC !== selectedItSecGroupId && CI_GROUP_ID_DELETE_ID !== selectedItSecGroupId && CI_GROUP_ID_EMPTY !== selectedItSecGroupId) {
////				Ext.getCmp('rgRelevanceBYTSEC').disable();
////				Ext.getCmp('rgRelevanceBYTSEC').setValue(CI_GROUP_ID_DEFAULT_ITSEC);
////			}
////			else if (CI_GROUP_ID_NON_BYTSEC === selectedItSecGroupId) {
////				Ext.getCmp('rgRelevanceBYTSEC').enable();
////				Ext.getCmp('bRelevanceGR1435').disable();
////				Ext.getCmp('rgRelevanceBYTSEC').setValue(CI_GROUP_ID_NON_BYTSEC);
////			}
////			else if (CI_GROUP_ID_DELETE_ID === selectedItSecGroupId || CI_GROUP_ID_EMPTY === selectedItSecGroupId) {
////				Ext.getCmp('rgRelevanceBYTSEC').setValue(CI_GROUP_ID_EMPTY);
////				Ext.getCmp('bRelevanceGR1435').disable();
////			}
//			
//			
//			var ciConnectionsView = Ext.getCmp('connectionsPanel');//this.getComponent('card-connections').getComponent('connectionsPanel');//
//			ciConnectionsView.update();
//			
//
//			// ------
//			// licenseUsingRegions - itSetUsingRegions
//			// allways clear first - because the listener resets the value!
//			Ext.getCmp('applicationUsingRegions').enable();
//			Ext.getCmp('applicationUsingRegions').clearSelections(true);
//			selectedUsingRegions = rec['licenseUsingRegions'];
//			// set the values
//			Ext.getCmp('applicationUsingRegions').clearSelections(true);
//			Ext.each(selectedUsingRegions.split(","), function(item, index, all) {
//				Ext.getCmp('applicationUsingRegions').select(Ext.getCmp('applicationUsingRegions').store.getById(item), true, true);
//			});
//
//
//
//			// ------
//			// TODO: Maskenüberarbeitung nachziehen
//			selectedItSecGroupId = rec['itsecGroupId'];
//			
//
//
//			
//				
////			if (selectedItSecGroupId !== undefined && selectedItSecGroupId != 0) {
////				Ext.getCmp('itsecGroup').setValue(selectedItSecGroupId);
////			} else {
////				Ext.getCmp('itsecGroup').setValue('');
////			}
//
//			// ------
////			selectedReferencesId = rec['refId'];
////			if (selectedReferencesId !== undefined && selectedReferencesId != 0) {
////				Ext.getCmp('referencedTemplate').setRawValue(rec['references']);
////			} else {
////				Ext.getCmp('referencedTemplate').setValue('');
////			}
//
//			// ------
//			selectedPriorityLevelId = rec['priorityLevelId'];
//			if (selectedPriorityLevelId !== undefined && selectedPriorityLevelId != 0) {
//				Ext.getCmp('priorityLevel').setValue(selectedPriorityLevelId);
//			} else {
//				Ext.getCmp('priorityLevel').setValue('');
//			}
//
//			// ------
//			selectedSlaId = rec['slaId'];
//			if (selectedSlaId !== undefined && selectedSlaId != 0) {
//				Ext.getCmp('sla').setValue(selectedSlaId);
//			} else {
//				Ext.getCmp('sla').setValue('');
//			}
//			index = Ext.getCmp('sla').getStore().findExact('id', Ext.getCmp('sla').getValue());
//			Ext.getCmp('sla').fireEvent('select', Ext.getCmp('sla'), Ext.getCmp('sla').getStore().getAt(index), index);
//
//			// ------
//			selectedServiceContractId = rec['serviceContractId'];
//			if (selectedServiceContractId !== undefined && selectedServiceContractId != 0) {
//				Ext.getCmp('serviceContract').setRawValue(rec['serviceContract']);
//			} else {
//				Ext.getCmp('serviceContract').setValue('');
//			}
//
//			// ------
//			selectedSeverityLevelId = rec['severityLevelId'];
//			if (selectedSeverityLevelId !== undefined && selectedSeverityLevelId != 0) {
//				Ext.getCmp('severityLevel').setValue(selectedSeverityLevelId);
//			} else {
//				Ext.getCmp('severityLevel').setValue('');
//			}
//
//			// ------
//			selectedOperationalStatusId = rec['operationalStatusId'];
//			if (selectedOperationalStatusId !== undefined && selectedOperationalStatusId != 0) {
//				Ext.getCmp('operationalStatus').setValue(selectedOperationalStatusId);
//			} else {
//				Ext.getCmp('operationalStatus').setValue('');
//			}
//
//			// ------
//			selectedLifecycleStatusId = rec['lifecycleStatusId'];
//			if (selectedLifecycleStatusId !== undefined && selectedLifecycleStatusId != 0) {
//				Ext.getCmp('lifecycleStatus').setValue(selectedLifecycleStatusId);
//			} else {
//				Ext.getCmp('lifecycleStatus').setValue('');
//			}
//
//			// ------
//			selectedCurrencyId = rec['currencyId'];
//			if (selectedCurrencyId !== undefined && selectedCurrencyId != 0) {
//				Ext.getCmp('currency').setValue(selectedCurrencyId);
//			} else {
//				var cbUseroptionCurrency = Ext.getCmp('useroptionCurrency');
//				Ext.getCmp('currency').setValue(cbUseroptionCurrency.getValue());//''
//			}
//
//			// ------
//			selectedItSecSbAvailabilityId = rec['itSecSbAvailabilityId'];
//			if (selectedItSecSbAvailabilityId !== undefined && selectedItSecSbAvailabilityId != 0) {
//				Ext.getCmp('protectionAvailability').setValue(selectedItSecSbAvailabilityId);
//			} else {
//				Ext.getCmp('protectionAvailability').setValue('');
//			}
//
//			// ------
//			selectedClassInformationId = rec['classInformationId'];
//			if (selectedClassInformationId !== undefined && selectedClassInformationId != 0) {
//				Ext.getCmp('protectionClassInformation').setValue(selectedClassInformationId);
//			} else {
//				Ext.getCmp('protectionClassInformation').setValue('');
//			}
//			
//			// ------
//			selectedRunAccountId = rec['costRunAccountId'];
//			if (selectedRunAccountId !== undefined && selectedRunAccountId != 0) {
//				Ext.getCmp('runAccount').setValue(selectedRunAccountId);
//			} else {
//				Ext.getCmp('runAccount').setValue('');
//			}
//
//			// ------
//			selectedChangeAccountId = rec['costChangeAccountId'];
//			if (selectedChangeAccountId !== undefined && selectedChangeAccountId != 0) {
//				Ext.getCmp('changeAccount').setValue(selectedChangeAccountId);
//			} else {
//				Ext.getCmp('changeAccount').setValue('');
//			}
//
//			// ------
//			selectedLicenseTypeId = rec['licenseTypeId'];
//			if (selectedLicenseTypeId !== undefined && selectedLicenseTypeId != 0) {
//				Ext.getCmp('licenseType').setValue(selectedLicenseTypeId);
//			} else {
//				Ext.getCmp('licenseType').setValue('');
//			}
//
//			// ------
//			insdata = rec['insertQuelle'] + ' ' + rec['insertUser'] + ' ' + rec['insertTimestamp'];
//			Ext.getCmp('detailsInsertdata').setValue(insdata);
//
//			insdata = rec['updateQuelle'] + ' ' + rec['updateUser'] + ' ' + rec['updateTimestamp'];
//			Ext.getCmp('detailsUpdatedata').setValue(insdata);
//
//			// ---- load application Processes
//			applicationProcessStore.load();
//			
//			// ------ load application contacts
//			applicationContactsStore.load();
//
////			var ciConnectionGrid = Ext.getCmp('connections');
////			var ciConnectionListStore = ciConnectionGrid.getStore();
////			ciConnectionListStore.load();
////
////			// ------ load application compliance control status
////			complianceControlStatusStore.load();
//
//			
//			
//			// ============================
//			// ========== ACL =============
//			// ============================
////			aclstore.load();
////			AIR.AirAclManager.loadAcl();
//			AIR.AirAclManager.updateAcl();
//			
//			// Default values
//			// ==============
//			// currency // TODO get Info from UserOptions
//			if ('0' === Ext.getCmp('currency').getValue()) {
//				Ext.getCmp('currency').setValue(selectedCurrency);
//			}
//
//			// dependency validation
//			// =====================
//			// if sla name is not set - deactive service contract
//			if (undefined === rec['slaName'] || '' === rec['slaName']) {
//				Ext.getCmp('serviceContract').disable();
//				Ext.getCmp('serviceContract').setHideTrigger(true);
//			}
//
//			// fill the detail information
////			fillDetailsInformation();
//			
//			// fill the labels
////			setCommonTextLabelDetails();
//
//			// support stuff - activate Test Link Buttons
//			activateTestLinkButton('supportstuffAppDoc', 'supportstuffAppDocTestButton');
//			// TODO Maskenänderung nachziehen 
//			//activateTestLinkButton('supportstuffUASupportingDoc', 'supportstuffUASupportingDocTestButton');
//			//activateTestLinkButton('supportstuffUAProcess', 'supportstuffUAProcessTestButton');
//			activateTestLinkButton('supportstuffCMSupportingTool', 'supportstuffCMSupportingToolTestButton');
//			//activateTestLinkButton('supportstuffUMProcess', 'supportstuffUMProcessTestButton');
//
//			// mail to ci owner
//			var mailtemplate = 'mailto:';
//			// check value
//			mailtemplate += Ext.getCmp('ciResponsibleHidden').getValue();
//			mailtemplate += '?';
//
//			// mail copy to sub responsible
//			if ('' !== Ext.getCmp('ciSubResponsibleHidden').getValue()) {
//				mailtemplate += 'cc=' + Ext.getCmp('ciSubResponsibleHidden').getValue();
//				mailtemplate += '&';
//			}
//
//			var tempSubj = mail_Subject.replace('<CIName>', Ext.getCmp('applicationName').getValue());
//			
//			mailtemplate += 'subject=' + tempSubj + '';
//
//			var tempText = mail_Text.replace('<CIName>', Ext.getCmp('applicationName').getValue());
//			
//			tempText = tempText.replace('<Username>', username);
//			
//			mailtemplate += ('&body=' + tempText);
//			
//			Ext.get('mailtociowner').dom.href = mailtemplate;
//
//			// still no change, so deactivate Button
//			deactivateButtonSaveApplication();
//
//			// init tooltip (singleton)
////			Ext.QuickTips.init();
//
//			// set the config properties
////			Ext.apply(Ext.QuickTips.getQuickTip(), {
////				maxWidth: 200,
////				minWidth: 100,
////				showDelay: 2000, // Show 2000ms after entering target
////				trackMouse: true
////			});
//
////			languagetooltipstore.load();
////			languagehelpstore.load();
//			
//
//			// workaround after load we go to the details..
//			// hideCiDetailsActionButtons();
//
//			// reset buttons
////			Ext.getCmp('connectionsRemoveButton').toggle(false);
//			myLoadMask.hide();
//		}
//	}
//});


/*
var applicationSaveRecordDef = Ext.data.Record.create([{
	name : 'result'
}, {
	name : 'displayMessage'
}, {
	name : 'messages'
}]);

var applicationSaveReader = new Ext.data.XmlReader({
	record : 'return'
}, applicationSaveRecordDef);

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
	
	baseParams: {
		cwid: cwid,
		token: '',
		applicationId: -1
	},
	fields: [ 'result', 'displayMessage', 'messages' ],

	reader: applicationSaveReader,
	listeners: {
		beforeload: function(store, options) {
			applicationSaveStore.baseParams.cwid = cwid;
			applicationSaveStore.baseParams.token = token;
			mySaveMask.show();
		},
		load: function(store, records, options) {
			mySaveMask.hide();
			if ('OK' === records[0].data.result) {
				deactivateButtonSaveApplication();
				
				// abhängig vom Ergebnis
				// applicationDetailStore.load();
				//refresh updated ci
				applicationDetailStore.load({
					params: {
						applicationId: selectedCIId,	
						cwid: cwid,
						token: token
					}
				});

//				var yesCallback = function() {
//					ciConnectionListStore.load();
					
					//oder als erstes in der load function
					var ciConnectionsView = Ext.getCmp('connectionsPanel');
					ciConnectionsView.commitChanges();
//				};

//				var noCallback = function() {
//					actionButtonHandler(true, false);
//				};
//
//				var callbackMap = {
//					'yes': yesCallback,
//					'no': noCallback
//				};
//				
//				var dataSavedWindow = createDynamicMessageWindow('DATA_SAVED', callbackMap);//kein DATA_SAVED mehr anzeigen
//				dataSavedWindow.show();
			}

			if ('ERROR' === records[0].data.result) {
				// error when creating
//				Ext.Msg.show({
//					title : 'Data not saved',
//					msg : 'Could not save the ci<br><br>' + records[0].data.displayMessage,
//					buttons : Ext.Msg.OK,
//					fn : function(btn, text, opt) {
//						Ext.emptyFn();
//					},
//					icon : Ext.MessageBox.OK
//				});
				
				
				
//				var okCallback = function() {
//					actionButtonClick(null, Ext.getCmp(selectedMenuItem), null);// passiert nichts. Warum?
//					//applicationListStore.load();//ciConnectionListStore.load();
//				};
//				
//				var callbackMap = {
//					'ok': okCallback
//				};
				
				var dataSavedErrorWindow = createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.messages);//callbackMap
				dataSavedErrorWindow.show();
			}
		}
	}
});*/



//var complianceControlStatusRecordDef = Ext.data.Record.create([ {
//	name : 'controlStatus',
//	mapping : 'controlStatus'
//}, {
//	name : 'quantity',
//	mapping : 'quantity'
//}, {
//	name : 'rate',
//	mapping : 'rate'
//} ]);
//
//var complianceControlStatusReader = new Ext.data.XmlReader({
//	record : "return"
//}, complianceControlStatusRecordDef);
//
//var complianceControlStatusStore = new Ext.data.XmlStore({
//	// store configs
//	autoDestroy : true,
//	storeId : 'complianceControlStatusStore',
//	autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext + '/ApplicationWSPort',
//		loadMethod : 'getApplicationComplianceControlStatus',
//		timeout : 120000,
//		reader : complianceControlStatusReader
//	}),
//	baseParams : {
//		applicationId : -1,
//		cwid : cwid,
//		token : ''
//	},
//	fields : [ 'controlStatus', 'quantity', 'rate' ],
//	// reader configs
//	reader : complianceControlStatusReader,
//	listeners : {
//		beforeload : function(store, options) {
//			complianceControlStatusStore.baseParams.cwid = cwid;
//			complianceControlStatusStore.baseParams.token = token;
//			complianceControlStatusStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//
//// TODO Maskenänderungen überarbeiten
//			// for next Schleife
////			setComplianceInformation(records[0], 0);
////			setComplianceInformation(records[1], 1);
////			setComplianceInformation(records[2], 2);
////			setComplianceInformation(records[3], 3);
////			setComplianceInformation(records[4], 4);
////			setComplianceInformation(records[5], 5);
////			setComplianceInformation(records[6], 6);
////			setComplianceInformation(records[7], 7);
////			setComplianceInformation(records[8], 8);
////			setComplianceInformation(records[9], 9);
//
//		}
//	}
//});

//var setComplianceInformation = function(myRecord, counter) {
//
//	// don't show the values actually
//	Ext.getCmp(('compliancencontrol' + counter)).hide();
//
//	// if (undefined !==myRecord) {
//	// var contact = myRecord.data;
//	//		
//	// var text = contact['quantity'] + ' ' + contact['rate'];
//	//		
//	// setFieldLabel(('compliancencontrol' + counter),
//	// contact['controlStatus']);
//	// Ext.getCmp(('compliancencontrol' + counter)).setValue(text);
//	// Ext.getCmp(('compliancencontrol' + counter)).show();
//	// }
//	// else {
//	// // no data for this row - hide it
//	// Ext.getCmp(('compliancencontrol' + counter)).hide();
//	// }
//};



//var historyListRecordDef = Ext.data.Record.create([ {
//	name : 'id',
//	mapping : 'id'
//}, {
//	name : 'tableId',
//	mapping : 'tableId'
//}, {
//	name : 'ciId',
//	mapping : 'ciId'
//}, {
//	name : 'datetime',
//	mapping : 'datetime'
//}, {
//	name : 'changeSource',
//	mapping : 'changeSource'
//}, {
//	name : 'changeDBUser',
//	mapping : 'changeDBUser'
//}, {
//	name : 'changeUserCWID',
//	mapping : 'changeUserCWID'
//}, {
//	name : 'changeUserName',
//	mapping : 'changeUserName'
//}, {
//	name : 'changeAttributeName',
//	mapping : 'changeAttributeName'
//}, {
//	name : 'changeAttributeOldValue',
//	mapping : 'changeAttributeOldValue'
//}, {
//	name : 'changeAttributeNewValue',
//	mapping : 'changeAttributeNewValue'
//}]);
//
//
//var historyListReader = new Ext.data.XmlReader({
//	record : "return",
//	idProperty : 'id'
//}, historyListRecordDef);
//
//var historyListStore = new Ext.data.XmlStore({
//	// store configs
//	autoDestroy : false,
//	storeId : 'aHistoryStore',
//	autoLoad : false,
//	proxy : new Ext.ux.soap.SoapProxy({
//		url : webcontext + '/ApplicationWSPort',
//		loadMethod : 'getApplicationHistory',
//		timeout : 120000,
//		reader : historyListReader
//	}),
//	fields : [ 'id', 'tableId', 'ciId', 'datetime', 'changeSource', 'changeDBUser', 'changeUserCWID', 'changeUserName', 'changeAttributeNewValue', 'changeAttributeOldValue'],
//	// reader configs
//	reader : historyListReader,
//	listeners : {
//		beforeload : function(store, options) {
//			historyListStore.baseParams.cwid = cwid;
//			historyListStore.baseParams.token = token;
//			historyListStore.baseParams.applicationId = selectedCIId;
//		},
//		load : function(store, records, options) {
//
//			Ext.getCmp('edittabPanel').layout.setActiveItem('card-history');
//			
//			// for next Schleife
//			// zum setzen der Werte?
//		}
//	}
//});

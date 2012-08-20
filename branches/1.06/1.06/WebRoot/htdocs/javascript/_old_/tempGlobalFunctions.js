
//from: myplace.js, usedby: createnew.js, MyPlaceHomeView.js, CiCreateWizardPagesView.js
//function saveUserOptions (but, ev) {
//	var field = Ext.getCmp('useroptionLanguage');
//	userOptionSaveStore.setBaseParam('language', field.getValue() ? 'DE' : 'EN');
//	
//	field = Ext.getCmp('useroptionNumberFormat');
//	userOptionSaveStore.setBaseParam('numberFormat', field.getValue() ? 'DE' : 'US');
//
//	field = Ext.getCmp('useroptionHelp');
//	userOptionSaveStore.setBaseParam('help', field.getValue() ? 'YES' : 'NO');
//
//	field = Ext.getCmp('useroptionSkipWizardMessage');
//	var field2 = Ext.getCmp('wizardcbskip');
//	userOptionSaveStore.setBaseParam('skipWizard', field.getValue() || field2.getValue() ? 'YES' : 'NO');
//	field.setValue(field.getValue()||field2.getValue());
//	
//	field = Ext.getCmp('useroptionDisableTooltip');
//	userOptionSaveStore.setBaseParam('tooltip', field.getValue() ? 'YES' : 'NO');
//	
//	field = Ext.getCmp('useroptionCurrency');
//	if (field.store.findExact('text', field.getValue()) === -1) {
//		// message
//	}
//	else {
//		userOptionSaveStore.setBaseParam('currency', field.store.getAt(field.store.findExact('text', field.getValue())).data.id);
//	}
//
//	userOptionSaveStore.load();
//}

////from: myplace.js, usedby: 
//function activateButtonSaveUserOptions() {
//	Ext.getCmp('saveuseroptionbutton').show();
//}
//
////from: myplace.js, usedby: 
//function inactivateButtonSaveUserOptions() {
//	Ext.getCmp('saveuseroptionbutton').hide();
//}


//from: editfunctions.js, usedby: commonfunctions.js, applicationstores.js
//function fillDetailsInformation() {
//
//	Ext.getCmp('detailsApplicationAlias').setValue(Ext.getCmp('applicationAlias').getRawValue());
//
//	var categoryBusiness = Ext.getCmp('cbApplicationBusinessCat').getRawValue();
//
//	Ext.getCmp('detailsApplicationBusinessCat').setValue(categoryBusiness);
//
//	var categoryIT = Ext.getCmp('applicationCat2').getRawValue();
//
//	Ext.getCmp('detailsApplicationCat2').setValue(categoryIT);
//
//	Ext.getCmp('detailsCiOwner').setValue(Ext.getCmp('ciResponsible').getValue());
//
//	Ext.getCmp('detailsApplicationOwner').setValue(Ext.getCmp('applicationOwner').getValue());
//
//	Ext.getCmp('detailsSlaName').setValue(Ext.getCmp('sla').getRawValue());
//
//	Ext.getCmp('detailsBusinessEssential').setValue(Ext.getCmp('businessEssential').getRawValue());
//}

//from: editfunctions.js, usedby: CiSupportStuffView.js, applicationstores.js
//function activateTestLinkButton(cmpValueName, cmpButtonName) {
//	// field = Ext.getCmp(cmpValueName);
//	// field disabled ?
//
//	var button = Ext.getCmp(cmpButtonName);
//	var value = Ext.getCmp(cmpValueName).getValue();
//
//	if (undefined !== value) {
//		value = value.toLowerCase();
//		if (value.indexOf('http://') > -1 || value.indexOf('https://') > -1 || value.indexOf('notes://') > -1) {
//			button.show();//show() setVisible(true);
//		} else {
//			button.hide();//hide() setVisible(false);
//		}
//	} else {
//		button.hide();
//	}
//}


//from: editfunctions.js, usedby: alle in ciDetails, commonfunctions.js, alle *picker.js in commen, applicationstores.js, userstores.js
//function activateButtonSaveApplication() {
////	setDraft(isDraft());
//	AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft());
//	
////	panelMsg = listRequiredFields();
//	var panelMsg = AIR.AirAclManager.listRequiredFields();
//	
//	if (panelMsg == '') {
////		setPanelMessage(panelMsg);
//		AIR.AirAclManager.setPanelMessage(panelMsg);
//	} else {
////		setPanelMessage(languagestore.data.items[0].data['header_applicationIsIncomplete'].replace('##', panelMsg));
//		AIR.AirAclManager.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));//languagestore.data.items[0].data['header_applicationIsIncomplete']
//	}
//	
//	
////	if (isEditMaskValid()) {
//	if (AIR.AirAclManager.isEditMaskValid()) {
//		Ext.getCmp('savebutton').show();//enable
//		Ext.getCmp('cancelbutton').show();
//		showCiDetailDataChanged = true;
//	} else {
//		deactivateButtonSaveApplication();
//	}
//}

//from: editfunctions.js, usedby: applicationstores.js, userstores.js
//function deactivateButtonSaveApplication() {
////	setDraft(isDraft());
//	AIR.AirAclManager.setDraft(AIR.AirAclManager.isDraft());
//	
////	panelMsg = listRequiredFields();
//	var panelMsg = AIR.AirAclManager.listRequiredFields();
//	
//	if (panelMsg == '') {
////		setPanelMessage(panelMsg);
//		AIR.AirAclManager.setPanelMessage(panelMsg);
//	} else {
////		setPanelMessage(languagestore.data.items[0].data['header_applicationIsIncomplete'].replace('##', panelMsg));
//		AIR.AirAclManager.setPanelMessage(AIR.AirApplicationManager.getLabels().header_applicationIsIncomplete.replace('##', panelMsg));//languagestore.data.items[0].data['header_applicationIsIncomplete']
//	}
//	
//	
//	Ext.getCmp('savebutton').hide();//disable
//	Ext.getCmp('cancelbutton').hide();
//	showCiDetailDataChanged = false;
//}

//from: editfunctions.js, usedby: commonfunctions.js
//function checkDataChanged(callbackMap) {
//	var dataChanged = false;
//		
//	if (showCiDetailDataChanged) {
//		dataChanged = true;
//		
//		var dynamicWindow = createDynamicMessageWindow('DATA_CHANGED', callbackMap);
//		dynamicWindow.show();
//	}
//	
//	return dataChanged;
//}

//from: editfunctions.js, usedby: editfunctions.js
//function isEditMaskValid() {
//	valid = true;
//	Ext.each(aclstore.getRange(), function(item, index, allItems) {
//		aclItemCmp = Ext.getCmp(item.data.id);
//		if (aclItemCmp !== undefined && !aclItemCmp.disabled) {
//			switch (aclItemCmp.getXType()) {
//			case "textfield":
//			case "textarea":
//				if (aclItemCmp.getValue() !== aclItemCmp.getValue().trim()) {
//					aclItemCmp.setValue(aclItemCmp.getValue().trim());
//				}
//				// no break!
//			case "combo":
//			case "checkbox":
//				valid = valid && aclItemCmp.isValid();
//				break;
//			default:
//				break;
//			}
//		}
//	});
//	return valid;
//}

//from: editfunctions.js, usedby: (editpanel.js), CiEditTabView.js, commonfunctions.js, applicationstores.js
/*function saveApplication(but, ev) {
	if (!isEditMaskValid()) {
		msgtext = languagestore.data.items[0].data['editDataNotValid'].replace(/##/, Ext.getCmp('applicationName').getValue());
		Ext.MessageBox.show({
			title : 'Error',
			msg : msgtext,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return;
	}


	// BASICS
	// ======
	field = Ext.getCmp('applicationId');
	applicationSaveStore.setBaseParam('applicationId', field.getValue());

	field = Ext.getCmp('applicationName');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('applicationName', field.getValue());
	}

	field = Ext.getCmp('applicationAlias');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('applicationAlias', field.getValue());
	}

	field = Ext.getCmp('applicationVersion');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('version', field.getValue());
	}

	field = Ext.getCmp('cbApplicationBusinessCat');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('categoryBusinessId', field.getValue());
		}
	}

	field = Ext.getCmp('cbDataClass');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('classDataId', field.getValue());
		}
	}
	
	field = Ext.getCmp('applicationCat2');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('applicationCat2Id', field.getValue());
		}
	}

	// primary function - display only

	field = Ext.getCmp('lifecycleStatus');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('lifecycleStatusId', field.getValue());
		}
	}

	field = Ext.getCmp('operationalStatus');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('operationalStatusId', field.getValue());
		}
	}

	field = Ext.getCmp('comments');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('comments', field.getValue());
	}
	
	field = Ext.getCmp('businessProcess');
	if (!field.disabled) {
		var value = field.getValue();
		applicationSaveStore.setBaseParam('businessProcess', field.getValue());
	}

	field = Ext.getCmp('businessProcessHidden');
	if (!field.disabled) {
		value = field.getValue();
		applicationSaveStore.setBaseParam('businessProcessHidden', field.getValue());
	}

	// CONTACTS
	// ========

	field = Ext.getCmp('applicationOwnerHidden');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('applicationOwner', field.getValue());
		applicationSaveStore.setBaseParam('applicationOwnerHidden', field.getValue());
	}

	field = Ext.getCmp('applicationOwnerDelegateHidden');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('applicationOwnerDelegateHidden', field.getValue());
		field = Ext.getCmp('applicationOwnerDelegate');
		applicationSaveStore.setBaseParam('applicationOwnerDelegate', field.getValue());
	}

	field = Ext.getCmp('ciResponsibleHidden');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('responsible', field.getValue());
		applicationSaveStore.setBaseParam('responsibleHidden', field.getValue());
	}

	field = Ext.getCmp('ciSubResponsibleHidden');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('subResponsibleHidden', field.getValue());
		// Sonderfall ciSubResponsible benötigt den Gruppennamen!
		field = Ext.getCmp('ciSubResponsible');
		applicationSaveStore.setBaseParam('subResponsible', field.getValue());
	}

	field = Ext.getCmp('gpsccontactCiOwner');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactCiOwner', field.getValue());
		field = Ext.getCmp('gpsccontactCiOwnerHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactCiOwnerHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactCiOwnerHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactResponsibleAtCustomerSide');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactResponsibleAtCustomerSide', field.getValue());
		field = Ext.getCmp('gpsccontactResponsibleAtCustomerSideHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactResponsibleAtCustomerSideHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactResponsibleAtCustomerSide', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactSupportGroup');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactSupportGroup', field.getValue());
		field = Ext.getCmp('gpsccontactSupportGroupHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactSupportGroupHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactSupportGroup', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactChangeTeam');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactChangeTeam', field.getValue());
		field = Ext.getCmp('gpsccontactChangeTeamHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactChangeTeamHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactChangeTeamHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactServiceCoordinator');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactServiceCoordinator', field.getValue());
		field = Ext.getCmp('gpsccontactServiceCoordinatorHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactServiceCoordinatorHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactImplementationTeamHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactEscalation');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactEscalation', field.getValue());
		field = Ext.getCmp('gpsccontactEscalationHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactEscalationHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactImplementationTeamHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactOwningBusinessGroup');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactOwningBusinessGroup', field.getValue());
		field = Ext.getCmp('gpsccontactOwningBusinessGroupHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactOwningBusinessGroupHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactOwningBusinessGroupHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactImplementationTeam');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactImplementationTeam', field.getValue());
		field = Ext.getCmp('gpsccontactImplementationTeamHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactImplementationTeamHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactImplementationTeamHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactServiceCoordinatorIndiv');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactServiceCoordinatorIndiv', field.getValue());
		field = Ext.getCmp('gpsccontactServiceCoordinatorIndivHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactServiceCoordinatorIndivHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactServiceCoordinatorIndivHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactEscalationIndiv');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactEscalationIndiv', field.getValue());
		field = Ext.getCmp('gpsccontactEscalationIndivHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactEscalationIndivHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactEscalationIndivHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactSystemResponsible');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactSystemResponsible', field.getValue());
		field = Ext.getCmp('gpsccontactSystemResponsibleHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactSystemResponsibleHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactSystemResponsibleHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactImpactedBusiness');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactImpactedBusiness', field.getValue());
		field = Ext.getCmp('gpsccontactImpactedBusinessHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactImpactedBusinessHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactImpactedBusinessHidden', 'DISABLED');
	}

	field = Ext.getCmp('gpsccontactBusinessOwnerRepresentative');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('gpsccontactBusinessOwnerRepresentative', field.getValue());
		field = Ext.getCmp('gpsccontactBusinessOwnerRepresentativeHidden');
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('gpsccontactBusinessOwnerRepresentativeHidden', field.getValue());
		}
	} else {
		applicationSaveStore.setBaseParam('gpsccontactBusinessOwnerRepresentativeHidden', 'DISABLED');
	}

	// AGREEMENTS
	// ==========
	field = Ext.getCmp('sla');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('slaName', field.getValue());
		}
	}

	field = Ext.getCmp('priorityLevel');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('priorityLevel', field.getValue());
		}
	}
	field = Ext.getCmp('serviceContract');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam(field.id, field.getValue());
		}
	}
	field = Ext.getCmp('severityLevel');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('severityLevel', field.getValue());
		}
	}
	field = Ext.getCmp('businessEssential');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('businessEssentialId', field.getValue());
		}
	}

	// PROTECTION
	// ==========
	field = Ext.getCmp('protectionAvailability');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('itSecSbAvailability', field.getValue());
		}
		else {
			applicationSaveStore.setBaseParam('itSecSbAvailability', -1);
		}
	}
	field = Ext.getCmp('protectionAvailabilityDescription');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('itSecSbAvailabilityDescription', field.getValue());
	}
	
	field = Ext.getCmp('protectionClassInformation');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('classInformationId', field.getValue());
		}
		else {
			applicationSaveStore.setBaseParam('classInformationId', -1);
		}

	}
	
	field = Ext.getCmp('protectionClassInformationExplanation');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('classInformationExplanation', field.getValue());
	}

	
	
	
	// Compliance
	// ==========
//	field = Ext.getCmp('itsetName');
//	if (!field.disabled) {
//		if (undefined !== field.getValue() && '' !== field.getValue()) {
//			applicationSaveStore.setBaseParam(field.id, field.getValue());
//		}
//	}
//	field = Ext.getCmp('isTemplate');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('template', field.getValue() ? -1 : 0);
//	}

//	field = Ext.getCmp('relevanceGR1435');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('itSecGroupId', selectedItSecGroupId);
//	}
//	field = Ext.getCmp('bRelevanceNonBYTsec');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('itSecGroupId', selectedItSecGroupId);
//	}
//	applicationSaveStore.setBaseParam('itSecGroupId', selectedItSecGroupId);

//	field = Ext.getCmp('itsecGroup');
//	if (!field.disabled) {
//		if (undefined !== field.getValue() && '' !== field.getValue()) {
//			applicationSaveStore.setBaseParam('itSecGroupId', field.getValue());
//		}
//	}
//
//	field = Ext.getCmp('referencedTemplate');
//	if (!field.disabled) {
//		if (undefined !== field.getValue() && '' !== field.getValue()) {
//			applicationSaveStore.setBaseParam('refId', field.getValue());
//		}
//	}
//	field = Ext.getCmp('relevanceGR1920');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('relevanceGR1920', field.getValue() ? 'Y' : 'N');
//	}
//	field = Ext.getCmp('relevanceGR1435');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('relevanceGR1435', field.getValue() ? 'Y' : 'N');
//	}
//	field = Ext.getCmp('relevanceGR1775');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('relevanceGR1775', field.getValue() ? 'Y' : 'N');
//	}
//	field = Ext.getCmp('relevanceGR2008');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('relevanceGR2008', field.getValue() ? 'Y' : 'N');
//	}
//	field = Ext.getCmp('CBrelevanceGxp');
//	if (!field.disabled) {
//		// old value = "" if (undefined !== field.getValue() && '' !== field.getValue()) {
//		if (undefined !== field.getValue()) {
//			applicationSaveStore.setBaseParam('gxpFlag', field.getValue());
//		}
//	}
//	field = Ext.getCmp('applicationRiskAnalysis');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('riskAnalysisYN', field.getValue() ? 'Y' : 'N');
//	}
	// TODO 'itsecGroup'

	
	
	// LICENSE & COSTS
	// ===============

	// TODO License Model
	field = Ext.getCmp('licenseType');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('licenseTypeId', field.getValue());
		}
	}
	field = Ext.getCmp('applicationAccessingUserCount');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('accessingUserCount', field.getValue());
	}
	field = Ext.getCmp('costRunPa');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam(field.id, field.getValue());
	}
	field = Ext.getCmp('costChangePa');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam(field.id, field.getValue());
	}
	field = Ext.getCmp('currency');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('currencyId', field.getValue());
		}
	}
	field = Ext.getCmp('runAccount');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('costRunAccountId', field.getValue());
		}
	}
	field = Ext.getCmp('changeAccount');
	if (!field.disabled) {
		if (undefined !== field.getValue() && '' !== field.getValue()) {
			applicationSaveStore.setBaseParam('costChangeAccountId', field.getValue());
		}
	}

	field = Ext.getCmp('applicationUsingRegions');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('licenseUsingRegions', selectedUsingRegions);
	}

	// CONNECTION
	// ==========
//	field = Ext.getCmp('connections');
//	if (!field.disabled) {
//		ciConnectionListStore = field.getStore();
//		
//		// ciConnectionListStore.clearFilter();
//		modifiedConnections = ciConnectionListStore.getModifiedRecords();
//		connectionSave = {};
//		Ext.each(modifiedConnections, function(item, index, allItems) {
//			conType = item.get('type').toLowerCase().replace(' ', '_');
//			if (connectionSave['connection_' + conType + '_' + item.get('status')] === undefined) {
//				connectionSave['connection_' + conType + '_' + item.get('status')] = item.get('ciId');
//			} else {
//				connectionSave['connection_' + conType + '_' + item.get('status')] = connectionSave['connection_'
//						+ conType + '_' + item.get('status')]
//						+ ',' + item.get('ciId');
//			}
//		});
//		for (key in connectionSave) {
//			applicationSaveStore.setBaseParam(key, connectionSave[key]);
//		}
//		Ext.getCmp('connectionsRemoveButton').toggle(false);
//	}
	
	var ciConnectionsView = Ext.getCmp('connectionsPanel');//CiConnectionsView
	var modifiedCiConnectionData = ciConnectionsView.getCiConnectionDataChanges();
	for(var key in modifiedCiConnectionData)
		if(modifiedCiConnectionData[key].length > 0)
			applicationSaveStore.setBaseParam(key, modifiedCiConnectionData[key]);
	

	// SUPPORT_STUFF
//	field = Ext.getCmp('supportstuffUASupportingDoc');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('ciSupportStuffUserAuthorizationSupportedByDocumentation', field.getValue());
//	}
//	field = Ext.getCmp('supportstuffUAProcess');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('ciSupportStuffUserAuthorizationProcess', field.getValue());
//	}
	field = Ext.getCmp('supportstuffCMSupportingTool');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('ciSupportStuffChangeManagementSupportedByTool', field.getValue());
	}
//	field = Ext.getCmp('supportstuffUMProcess');
//	if (!field.disabled) {
//		applicationSaveStore.setBaseParam('ciSupportStuffUserManagementProcess', field.getValue());
//	}
	field = Ext.getCmp('supportstuffAppDoc');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('ciSupportStuffApplicationDocumentation', field.getValue());
	}
	field = Ext.getCmp('supportstuffAppRootDir');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('ciSupportStuffRootDirectory', field.getValue());
	}
	field = Ext.getCmp('supportstuffAppDataDir');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('ciSupportStuffDataDirectory', field.getValue());
	}
	field = Ext.getCmp('supportstuffAppProvidedServices');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('ciSupportStuffProvidedServices', field.getValue());
	}
	field = Ext.getCmp('supportstuffAppProvidedMUser');
	if (!field.disabled) {
		applicationSaveStore.setBaseParam('ciSupportStuffProvidedMachineUsers', field.getValue());
	}

	// the save action is called by loading the saveStore
//	var options = {
//		callback: function() {
//			var dynamicWindow = createDynamicMessageWindow('DATA_SAVED');
//			dynamicWindow.show();
//		}
//	};
	
	applicationSaveStore.load();//options
}*/

//from: editfunctions.js, usedby: (editpanel.js), CiCopyFromView.js(?), CiEditTabView.js
/*function cancelApplicationDetail(but, ev) {
	// activate input fields
	actionButtonHandler(true, false);
	Ext.emptyFn();
}*/


//from: editfunctions.js, usedby: CiComplianceView.js, applicationstores.js
//function toggleEditButton(checked, button, msg) {
//	if (checked) {
//		button.show();
//		//msg.show();
//	} else {
//		button.hide();
//		msg.hide();
//	}
//}
//
////from: editfunctions.js, usedby: CiComplianceView.js
//function toggleGxpBox(checked, box) {
//	if (checked) {
//		box.show();
//	} else {
//		box.hide();
//	}
//}



//from: navigation.js, usedby: commonfunctions.js
//function hideDetailsMenuItem() {
//	Ext.getCmp('detailsseparator').hide();
//	Ext.getCmp('detailsheader').hide();
//	Ext.getCmp('detailsheader').hide();
//	Ext.getCmp('detailsspecific').hide();
//	Ext.getCmp('detailscontacts').hide();
//	Ext.getCmp('detailsagreements').hide();
//	Ext.getCmp('detailsprotection').hide();
//	Ext.getCmp('detailscompliance').hide();
//	Ext.getCmp('detailslicense').hide();
//	Ext.getCmp('detailsconnections').hide();
//	Ext.getCmp('detailssupportstuff').hide();
//	Ext.getCmp('detailshistoryseparator').hide();
//	Ext.getCmp('detailshistory').hide();
//}


//from: header.js, usedby: AirBootstrap.js, CiTitleView.js, userstores.js, 
//function switchLanguage() {//==> in CiTitleView!
//	if ('EN' === selectedLanguage) {
//		selectedLanguage = 'DE';
//		urlLanguage = lng_DE;
//		urlLanguageTooltips = lng_DETooltips;
//		urlLanguageHelp = lng_DEHelp;
//		// urlFlagLanguage = img_LangDE;
//		urlFlagLanguage = img_LangEN;
//	} else {
//		selectedLanguage = 'EN';
//		urlLanguage = lng_EN;
//		urlLanguageTooltips = lng_ENTooltips;
//		urlLanguageHelp = lng_ENHelp;
//		// urlFlagLanguage = img_LangEN;
//		urlFlagLanguage = img_LangDE;
//	}
//	 
//	languagestore.load();
//	languagetooltipstore.load();
//	languagehelpstore.load();
//	
//	Ext.get('languageDetailslanguagePNG').dom.src = urlFlagLanguage;
// }

//function setFieldLabel(comp, label) {
//	
//	if (Ext.getCmp(comp)!==undefined) {
//		label = label + (Ext.getCmp(comp).labelSeparator===undefined?'':Ext.getCmp(comp).labelSeparator);
//		Ext.getCmp(comp).el.up('.x-form-item', 10, true).child('.x-form-item-label').update(label);
//	}
//}
//
//function setBoxLabel(comp, label) {
//	if (Ext.getCmp(comp)!==undefined) {
//		Ext.getCmp(comp).el.dom.nextSibling.childNodes[0].nodeValue = label;
//	}
//}
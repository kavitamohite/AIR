Ext.namespace('AIR');

AIR.AirWindowFactory = function() {
	return {
		createDynamicMessageWindow: function(windowType, callbackMap, message, title, options, iconType) {
			var labels = AIR.AirApplicationManager.getLabels();
			
			switch(windowType) {
				case 'DATA_CHANGED':
					var windowTitle = labels.dynamicWindowDataChangedTitle;
					var windowText = labels.dynamicWindowDataChangedText;
					var windowIcon = img_Warning;
					
					var buttonConfigs = [{
						text: labels.dynamicWindowDataChangedSaveButtonText,
						disabled: options && options.isCiInvalid,
						handler: function() {
//							 bIsDynamicWindowSpeichern = true;//see commonvars.js
//							 delegateCallback = callbackMap['verwerfen'];//required after DATA_SAVED:OK action to switch to seleted menuitem's page
							
							var callback = callbackMap['speichern'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.dynamicWindowDataChangedSaveButtonDiscard,
						handler: function() {
							showCiDetailDataChanged = false;
							var callback = callbackMap['verwerfen'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.dynamicWindowDataChangedSaveButtonBack,
						handler: function() {
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'DATA_SAVED':
					var windowTitle = labels.dynamicWindowDataSavedTitle;
					var windowText = labels.dynamicWindowDataSavedText;
					var windowIcon = img_OK;

					var buttonConfigs = [/*{
						text: 'Yes',
						handler: function() {
							var callback = callbackMap['yes'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: 'No',
						handler: function() {
							var callback = callbackMap['no'];
							callback();
							dynamicWindow.close();
						}
					}*/{
						text: labels.dynamicWindowDataSavedOKButtonText,
						handler: function() {
							if(bIsDynamicWindowSpeichern) {
								delegateCallback();
								bIsDynamicWindowSpeichern = false;//see commonvars.js
							}
							
							var callback = callbackMap['yes'];
							callback();
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'DATA_SAVED_ERROR':
					var windowTitle = labels.dynamicWindowDataSavedErrorTitle;
					var windowText = message;
					var windowIcon = img_Failed;

					var buttonConfigs = [{
						text: labels.dynamicWindowDataSavedErrorOKButtonText,
						handler: function() {		
//							var callback = callbackMap['ok'];
//							callback();
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'CI_TYPE_NOT_SUPPORTED_WARNING':
					var windowTitle = labels.dynamicWindowCiTypeNotSupportedWarningTitle;
					var windowText = labels.dynamicWindowCiTypeNotSupportedWarningText;
					var windowIcon = img_Warning;
					
					var buttonConfigs = [{
						text: labels.dynamicWindowCiTypeNotSupportedWarningOKButtonText,
						handler: function() {
							dynamicWindow.close();
						}
					}];
					break;
					
				case 'CANCEL_CONFIRMATION':						
					var windowTitle = labels.dynamicWindowCancelConfirmationTitle;
					var windowText = labels.dynamicWindowCancelConfirmationText;
					var windowIcon = img_Warning;
					
					var buttonConfigs = [{
						text: labels.dynamicWindowCancelConfirmationButtonOKText,
						handler: function() {
							showCiDetailDataChanged = false;
							var callback = callbackMap['yes'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.dynamicWindowCancelConfirmationButtonNOText,
						handler: function() {
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'AFTER_APP_SAVE':
					var windowTitle = labels.wizardSaveSuccessTitle;
					var windowText = labels.wizardSaveSuccess;
					var windowIcon = img_OK;
					
					var buttonConfigs = [{
						text: labels.dynamicWindowAfterAppSaveContinueEditingButtonText,
						handler: function() {
							var callback = callbackMap['continueEditing'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.dynamicWindowAfterAppSaveNewCiButtonText,
						handler: function() {
							var callback = callbackMap['createNewCi'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.dynamicWindowAfterAppSaveBackToSearchButtonText,
						handler: function() {
							var callback = callbackMap['redirectToSearch'];
							callback();
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'CANCEL_WIZARD':
					var windowTitle = labels.wizardCancelTitle;
					var windowText = labels.wizardCancelQuestion;
					var windowIcon = img_Warning;
					
					var buttonConfigs = [{
						text: labels.general_yes,
						handler: function() {
							var callback = callbackMap['yes'];
							
							dynamicWindow.close();//close hide
							callback();
						}
					}, {
						text: labels.general_no,
						handler: function() {
							dynamicWindow.close();//close close
						}
					}];
					
					break;
				case 'AFTER_APP_SAVE_FAIL':
					var windowTitle = labels.dynamicWindowDataSaveFailTitle;
					var windowText = message;
					var windowIcon = img_Failed;
					
//					var buttonConfigs = [{
//						text: labels.dynamicWindowOKButtonText,
//						handler: function() {
//							dynamicWindow.close();
//						}
//					}];
					
					var buttonConfigs = [];
					if(callbackMap)	{
						buttonConfigs.push({
							text: labels.general_yes,
							handler: function() {
								var callback = callbackMap['yes'];
								
								dynamicWindow.close();
								callback();
							}
						});
					}
					
					buttonConfigs.push({
						text: callbackMap ? labels.general_no : labels.dynamicWindowOKButtonText,
						handler: function() {
							dynamicWindow.close();
						}
					});
					
					break;
					
				case 'NON_BYTSEC':
					var windowTitle = labels.dynamicWindowNonBYTsecTitle;
					var windowText = labels.dynamicWindowNonBYTsecText;
					var windowIcon = img_Warning;

					var buttonConfigs = [{
						text: labels.general_yes,
						handler: function() {
							var callback = callbackMap['nonBYTsecYES'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.general_no,
						handler: function() {
							var callback = callbackMap['nonBYTsecNO'];
							callback();
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'FF_OR_IE':
					var windowTitle = 'Microsoft Internet Explorer';//labels.dynamicWindowFForIETitle'];
					var windowText = 'Firefox is recommended for better performance!';//labels.dynamicWindowFForIEText'];
					var windowIcon = img_Warning;
					
					var buttonConfigs = [/*{
						text: 'Start Firefox',//labels.dynamicWindowFForIEContinueFFButtonText'],
						handler: function() {
							var callback = callbackMap.continueFF;
							callback();
							dynamicWindow.close();
						}
					},*/ {
						text: 'Continue using IE',//labels.dynamicWindowFForIEKeepIEButtonText'],
						handler: function() {
							var callback = callbackMap['continueIE'];
							callback();
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'DELETE_CONFIRMATION':
					var windowTitle = labels.dynamicWindowConfirmDeleteTitle;
					var windowText = labels.dynamicWindowConfirmDeleteText;
					var windowIcon = img_Warning;
					
					windowText = windowText.replace('{0}', message.applicationCat1Txt);
					windowText = windowText.replace('{1}', '<b>'+message.applicationName+'</b>');//hier message=Application name
					
					var buttonConfigs = [{
						text: labels.general_yes,
						handler: function() {
							var callback = callbackMap['yes'];
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.general_no,
						handler: function() {
							dynamicWindow.close();
						}
					}];
					
					break;
				case 'CONFIRM_ITSEC_GROUP_SAVE':
				case 'RISK_ANALYSIS_AND_MGMT_TYPE_SELECT':
				case 'GENERIC_YES_NO':
					var windowTitle = title;
					var windowText = message;
					var windowIcon = img_Warning;
					
					var buttonConfigs = [{
						text: labels.general_yes,
						handler: function() {
							var callback = callbackMap.yes;
							callback();
							dynamicWindow.close();
						}
					}, {
						text: labels.general_no,
						handler: function() {
							var callback = callbackMap.no;
							if(callback) {
								callback();
//								dynamicWindow.close();
							} else {
								dynamicWindow.close();
							}
						}
					}];
					break;
				case 'INVALID_MASSNAHME':
					var windowTitle = title;
					var windowText = message;
					var windowIcon = iconType ? iconType : img_Warning;
					
					var buttonConfigs = [{
						text: labels.dynamicWindowOKButtonText,
						handler: function() {
							if(callbackMap) {
								var okCallback = callbackMap.ok;
								okCallback();
							}
							dynamicWindow.close();
						}
					}/*,{
						text: labels.button_general_cancel,
						handler: function() {
							var callback = callbackMap.cancel;
							callback();
							//wenn grid.getSelectionModel().on('beforerowselect', this.onBeforeMassnahmeSelect, this);
							//nicht verwendet wird wegen des Problems des falschen Erscheinenes des Fensters im Hintergrund
							//ist das Verhalten genau umgekehrt. D.h. die unvollständige Massnahme muss wieder ausgewählt
							//werden, anstatt das verhnidert wird die näcshte zu selektieren.
							dynamicWindow.close();
						}
					}*/];
					break;
			}

			var dynamicWindow = new AIR.DynamicWindow(windowTitle, windowText, windowIcon, buttonConfigs);
			switch(buttonConfigs.length) {
				case 1:
					dynamicWindow.setWidth(250);
					break;
				case 2:
					dynamicWindow.setWidth(300);
					break;
				case 3:
					dynamicWindow.setWidth(350);
					break;
			}
			
//			if(dynamicWindow.getHeight() < 50)
//				dynamicWindow.setHeight(55);
			
			return dynamicWindow;
			
//			return new AIR.DynamicWindow(windowTitle, windowText, windowIcon, buttonConfigs);
		}

	};
}();
//};
Ext.reg('AIR.AirWindowFactory', AIR.AirWindowFactory);
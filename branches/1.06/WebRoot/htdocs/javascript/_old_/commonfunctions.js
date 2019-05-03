//function logout() {
//	window.location = '../logoutAction.jsp?cwid='+cwid;
//}

//function gup(name) {
//  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
//  var regexS = '[\\?&]'+name+'=([^&#]*)';
//  var regex = new RegExp( regexS );
//  var results = regex.exec(window.location.href);
//  if(results == null)
//    return '';
//  else
//    return results[1];
//}

/*
function actionButtonHandler(hideButtons, hideSearchPanel) {
	var navigationV = Ext.getCmp('workBar');
	
	Ext.each(navigationV.items.items, function(item, index, allItems) {
		//if (item.getXType()==='button') {
			if (item.isVisible() && (item.isHideable !== undefined && item.isHideable===true ) && hideButtons) {
				item.hide();
			} else if (!item.isVisible() && !hideButtons) {
				if(item.getId().indexOf('myplace') < 0)//dont open myplace sub menuitmes
					item.show();
			}
		//}
	});
	
	var searchpanel = Ext.getCmp('searchpanel');
	var createpanel = Ext.getCmp('createPanel');
	var editpanel = Ext.getCmp('editPanel');
	var workpanel = Ext.getCmp('workpanel');

	if (hideSearchPanel) {
		//Ext.get('detailsspecific').dom.children[0].src = navOn;
		actionButtonClick(null, Ext.getCmp('detailsheader'), null);
		searchpanel.hide();
		createpanel.hide();
		//editpanel.show();
		//workpanel.getLayout().setActiveItem('editPanel');
		slideItIn('editPanel');
		workpanel.doLayout();
	} 
	if (hideButtons && !hideSearchPanel) {
		//Ext.get('detailsspecific').dom.children[0].src = navOn;
		actionButtonClick(null, Ext.getCmp('searchmenuitem'), null);
		editpanel.hide();
		createpanel.hide();
		//editpanel.show();
		//workpanel.getLayout().setActiveItem('editPanel');
		slideItIn('searchpanel');
		workpanel.doLayout();
	}
	
	navigationV.doLayout();
}*/

/*
function actionButtonClick (e, t, o) {
	var navigationV = Ext.getCmp('workBar');
	var pid = (t.parentNode===undefined?t.id:t.parentNode.id);
	selectedMenuItem = pid;
	
	var searchpanel = Ext.getCmp('searchpanel');
	var myplacepanel = Ext.getCmp('myplacePanel');
	var myplaceHomePanel = Ext.getCmp('myplaceHomePanel');
	var editpanel = Ext.getCmp('editPanel');
	var createpanel = Ext.getCmp('createPanel');

	Ext.each(navigationV.items.items, function(item, index, allItems) {
		if (Ext.get(item.id).dom.children[0]!== undefined && Ext.get(item.id).dom.children[0].src!==undefined) {
			if (item.id===pid) {
				
				switch (pid) {
					case 'myplacemenuitem':
					    var ciSearchResultView = Ext.getCmp('ciSearchResultView');
					    ciSearchResultView.setVisible(false);
					    
						var verwerfenCallback = function() {
							myplacepanel.hide();
							searchpanel.hide();
							editpanel.hide();
							createpanel.hide();
							//slideItIn('myplacePanel');
							slideItIn('myplaceHomePanel');
	
							// My Place - show functions
							var miOwnerCis = Ext.getCmp('myplacemycismenuitem');
							miOwnerCis.show();
							
							var miDelegateCis = Ext.getCmp('myplacemycissubsmenuitem');
							miDelegateCis.show();
							
							setHelptext(helpMyPlace);
							currentMenuItem = Ext.getCmp(pid);
							
							hideDetailsMenuItem();
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						
						break;
					case 'myplacemycismenuitem':
						var verwerfenCallback = function() {
							searchAction = 'myCis';
							Ext.get('mycispanelheader').dom.innerHTML = labels.label_menu_myplacemycismenuitem'];
//							applicationListStore.load();//alt
							myplaceHomePanel.hide();
							searchpanel.hide();
							editpanel.hide();
							createpanel.hide();
							slideItIn('myplacePanel');
							
							
//							Ext.getCmp('myplacetabPanel').layout.setActiveItem('card-mycis');
							var myPlaceTabView = Ext.getCmp('myplacetabPanel');
							myPlaceTabView.getLayout().setActiveItem('card-mycis');
							myPlaceTabView.loadMyOwnCIsGrid();
							
							setHelptext(helpMyPlaceMyCis);
							currentMenuItem = Ext.getCmp(pid);
							
							hideDetailsMenuItem();
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						
						break;
					case 'myplacemycissubsmenuitem':
						var verwerfenCallback = function() {
							searchAction = 'myCisSubstitute';
							Ext.get('mycispanelheader').dom.innerHTML = labels.label_menu_myplacemycissubsmenuitem'];
//							applicationListStore.load();//alt
							myplaceHomePanel.hide();
							searchpanel.hide();
							editpanel.hide();
							createpanel.hide();
							slideItIn('myplacePanel');
							
							
//							Ext.getCmp('myplacetabPanel').layout.setActiveItem('card-myapps');
							var myPlaceTabView = Ext.getCmp('myplacetabPanel');
							myPlaceTabView.getLayout().setActiveItem('card-myapps');
							myPlaceTabView.loadDelegateCIsGrid();

							setHelptext(helpMyPlaceMyCisSubstitute);
							currentMenuItem = Ext.getCmp(pid);
							
							hideDetailsMenuItem();
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						
						break;
					case 'searchmenuitem':
						var verwerfenCallback = function() {
							searchAction = 'search';
							selectedAdvancedSearch = false;
							myplaceHomePanel.hide();
							myplacepanel.hide();
							editpanel.hide();
							createpanel.hide();
							
							slideItIn('searchpanel');
							Ext.getCmp('advsearchpanel').hide();
							// My Place - hide functions
							Ext.getCmp('myplacemycismenuitem').hide();
							Ext.getCmp('myplacemycissubsmenuitem').hide();
							
							Ext.get("searchpanelheader").dom.innerHTML = labels.searchpanelheader'];
							setHelptext(helpSearch);
							currentMenuItem = Ext.getCmp(pid);
							
							var rbgQueryMode = Ext.getCmp('rbgQueryMode');
							rbgQueryMode.setValue(searchQueryModeContains);
							rbgQueryMode.setVisible(false);
							
							var html = labels.advancedsearchlink'];
							Ext.get('advancedsearchlink').dom.innerHTML = html;
							
							
							hideDetailsMenuItem();
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						
						break;
					case 'advancedsearchmenuitem':
						selectedAdvancedSearchplus = false;
						
						// alert('adv search');
						// Menu 'Search'
//						if (checkDataChanged()) {
//							// sorry, sava data first
//						}
//						else {
//							advancedsearch();
//							currentMenuItem = Ext.getCmp(pid);
//						}
						
						var verwerfenCallback = function() {
							advancedsearch();
							currentMenuItem = Ext.getCmp(pid);
							
							hideDetailsMenuItem();
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						
						break;
					case 'createceheader':
						var verwerfenCallback = function() {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							editpanel.hide();
							
							// My Place - hide functions
							Ext.getCmp('myplacemycismenuitem').hide();
							Ext.getCmp('myplacemycissubsmenuitem').hide();
							setHelptext(helpNewCI);
							currentMenuItem = Ext.getCmp(pid);
							
							hideDetailsMenuItem();
							slideItIn('createPanel');
							
//							wizardStart(false);
							var ciCreationCardPanel = Ext.getCmp('ciCreationCardPanel');//CiCreationCardPanel
							ciCreationCardPanel.getLayout().setActiveItem('CiCreateInfoView');
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						
						break;
					case 'menuItemWizard':
						var verwerfenCallback = function() {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							editpanel.hide();
							createpanel.hide();

							// My Place - hide functions
							Ext.getCmp('myplacemycismenuitem').hide();
							Ext.getCmp('myplacemycissubsmenuitem').hide();
							setHelptext(helpNewCI);
							currentMenuItem = Ext.getCmp(pid);
							
							slideItIn('createPanel');
							hideDetailsMenuItem();
							var ciCreationCardPanel = Ext.getCmp('ciCreationCardPanel');//CiCreationCardPanel
							ciCreationCardPanel.getLayout().setActiveItem('CiCreateWizardView');
							
							wizardStart(false);
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						break;
						
					case 'menuItemCopyFrom':
						var verwerfenCallback = function() {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							editpanel.hide();
							createpanel.hide();

							// My Place - hide functions
							Ext.getCmp('myplacemycismenuitem').hide();
							Ext.getCmp('myplacemycissubsmenuitem').hide();
							setHelptext(helpNewCI);
							currentMenuItem = Ext.getCmp(pid);
							
							slideItIn('createPanel');
							hideDetailsMenuItem();
							var ciCreationCardPanel = Ext.getCmp('ciCreationCardPanel');//CiCreationCardPanel
							ciCreationCardPanel.getLayout().setActiveItem('CiCopyFromView');
						};
						
						var callbackMap = {
							'verwerfen': verwerfenCallback,
							'speichern': saveApplication
						};
						
						if(!checkDataChanged(callbackMap)) {
							verwerfenCallback();
						}
						break;
					case 'detailsheader':
						// Menu 'Details/Specific'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-details');
						fillDetailsInformation();
						hideCiDetailsActionButtons();
						setHelptext(helpDetailsDetails);
						currentMenuItem = Ext.getCmp(pid);
						break;
					case 'detailsspecific':
						// Menu 'Details/Specific'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-specifics');
//						showCiDetailsActionButtons();
						setHelptext(helpDetailsSpecific);
						currentMenuItem = Ext.getCmp(pid);
						break;
					case 'detailscontacts':
						// Menu 'Details/Contacts'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-contacts');
//						showCiDetailsActionButtons();
						setHelptext(helpDetailsContacts);
						currentMenuItem = Ext.getCmp(pid);
						break;
					case 'detailsagreements':
						// Menu 'Details/Agreement'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-agreements');
//						showCiDetailsActionButtons();
						setHelptext(helpDetailsAgreements);
						currentMenuItem = Ext.getCmp(pid);
						break;
					case 'detailsprotection':
						// Menu 'Details/Protection'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-protection');
//						showCiDetailsActionButtons();
						setHelptext(helpDetailsProtection);
						currentMenuItem = Ext.getCmp(pid);
						break;		
					case 'detailscompliance':
						// Menu 'Details/Compliance'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-compliance');
						setHelptext(helpDetailsCompliance);
						currentMenuItem = Ext.getCmp(pid);
						break;		
					case 'detailslicense':
						// Menu 'Details/License & costs'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-license');
//						showCiDetailsActionButtons();
						setHelptext(helpDetailsLicenseCosts);
						currentMenuItem = Ext.getCmp(pid);
						break;
					case 'detailsconnections':
						// Menu 'Details/Connections'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-connections');
//						showCiDetailsActionButtons();
						setHelptext(helpDetailsConnections);
						currentMenuItem = Ext.getCmp(pid);
						
						var ciConnectionsView = Ext.getCmp('connectionsPanel');
						ciConnectionsView.update();
//						ciConnectionsView.getComponent('p1').getComponent('pConnectionsCiSearchV').collapse();
						
						break;
					case 'detailssupportstuff':
						// Menu 'Details/Compliance'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}
						
						Ext.getCmp('workpanel').layout.setActiveItem('editPanel');
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-supportstuff');
//						showCiDetailsActionButtons();
						setHelptext(helpDetailsSupportStuff);
						currentMenuItem = Ext.getCmp(pid);
						break;
						
					case 'detailshistory':
						// Menu 'Details/Compliance'
						if (editpanel.hidden) {
							myplaceHomePanel.hide();
							myplacepanel.hide();
							searchpanel.hide();
							createpanel.hide();
							slideItIn('editPanel');
						}

						// load history data
						historyListStore.load();
						Ext.getCmp('edittabPanel').layout.setActiveItem('card-history');
						// setHelptext(helpDetailsHistory);
						currentMenuItem = Ext.getCmp(pid);
						break;
				}
			} 
		}
	});
	Ext.each(navigationV.items.items, function(item, index, allItems) {
		if (Ext.get(item.id).dom.children[0]!== undefined && Ext.get(item.id).dom.children[0].src!==undefined) {
			if (item.id===currentMenuItem.id) {
				Ext.get(item.id).dom.children[0].src = navOn;
			} else {
				Ext.get(item.id).dom.children[0].src = navOff;
			}
		}
	});
	//navigationV.doLayout();//notwendig?
}*/



//function calculateHeightOffset() {
//	var offset = 15;
//	if (viewport !== undefined) {
//		offset += viewport.get('northpanel').height;
//		offset += viewport.get('southpanel').height;
//	} else {
//		offset += 201;
//	}
//	return offset;
//};


//function calculateWidthOffset() {
//	var offset = 25;
//	if (viewport !== undefined) {
//		offset += viewport.get('westpanel').width;
//		offset += viewport.get('eastpanel').getWidth();
//	} else {
//		offset += 255;
//	}
//	return offset;
//}


//function slideItIn(cmpname) {
//	var cmp = Ext.getCmp(cmpname);
//	cmp.show();
////	cmp.getEl().fadeIn({
////	    endOpacity: 1, //can be any value between 0 and 1 (e.g. .5)
////	    easing: 'easeOut',
////	    duration: 1
////	});
//}


//function slideItOut(cmpname) {
//	var cmp = Ext.getCmp(cmpname);
////	cmp.getEl().fadeOut({
////	    endOpacity: 0, //can be any value between 0 and 1 (e.g. .5)
////	    easing: 'easeIn',
////	    duration: 1
////	});
//	cmp.hide();
//}


//function setHelptext(helptext) {
//	Ext.get("infotext").dom.innerHTML = helptext;
////	viewport.doLayout();
//	
//	var eastpanel = Ext.getCmp('eastpanel');
//	eastpanel.doLayout();
//	
//	var westpanel = Ext.getCmp('westpanel');
//	westpanel.doLayout();
//	
//	var edittabPanel = Ext.getCmp('edittabPanel');//editPanel
//	edittabPanel.doLayout();
//}



//function hideCiDetailsActionButtons() {
//	if (showCiDetailDataChanged) {
//		// we shall show the buttons, 
//		// because the data was changed and needs to be saved
//		Ext.getCmp('savebutton').show();
//		Ext.getCmp('cancelbutton').show();
//	}
//	else {
//		Ext.getCmp('savebutton').hide();
//		Ext.getCmp('cancelbutton').hide();
//	}
//}
//
//
//
//function showCiDetailsActionButtons() {
//	Ext.getCmp('savebutton').show();
//	Ext.getCmp('cancelbutton').show();
//}



//function removeValueFromField(evt, cmp) {
//	if (undefined===Ext.getCmp(cmp).getValue() || ""===Ext.getCmp(cmp).getValue()) {
//		Ext.emptyFn();
//	} else if (undefined!==Ext.getCmp(cmp).maxContacts && Ext.getCmp(cmp).maxContacts===1) {
//		Ext.Msg.show({
//		   title: Ext.get('label'+cmp).dom.innerHTML,
//		   msg: 'Do you really want to delete entry?',
//		   buttons: Ext.Msg.YESNO,
//		   fn: function (btn) {
//			   if (btn==='yes') {
//				   if (Ext.getCmp(cmp)!==undefined) {
//					   Ext.getCmp(cmp).setValue('');
//				   }
//				   if (Ext.getCmp(cmp+'Hidden')!==undefined) {
//					   Ext.getCmp(cmp+'Hidden').setValue('');
//				   }
//				   activateButtonSaveApplication();
//			   }
//		   },
//		   icon: Ext.MessageBox.QUESTION
//		});
//	} else {
//		createRecordRemoverTip(evt, cmp);
//	}
//}


//function testLink(cmp) {
//	url = Ext.get(cmp).getValue();
//	// alert(url);
//	
//	window.open(url,'','scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,location=no,status=no');
//}



/**
 * fills the currency with the default value, if currency is empty
 */
//function fillEmptyCurrency() {
//	val = Ext.getCmp('currency');
//	if (val.getValue()=='') {
//		if ('' == selectedCurrency) {
//			selectedCurrency = 1;
//		}
//		val.setValue(selectedCurrency);
//	}
//}

//function createDynamicMessageWindow(windowType, callbackMap, message) {//replace by factory or builder pattern
//	var labels = AIR.AirApplicationManager.getLabels();
//	
//	switch(windowType) {
//		case 'DATA_CHANGED':
//			var windowTitle = labels.dynamicWindowDataChangedTitle;//languagestore.data.items[0].data['dynamicWindowDataChangedTitle']
//			var windowText = labels.dynamicWindowDataChangedText;
//			var windowIcon = img_Warning;
//			
//			var buttonConfigs = [{
//				text: labels.dynamicWindowDataChangedSaveButtonText,
//				handler: function() {
//					 bIsDynamicWindowSpeichern = true;//see commonvars.js
//					 delegateCallback = callbackMap['verwerfen'];//required after DATA_SAVED:OK action to switch to seleted menuitem's page
//					
//					var callback = callbackMap['speichern'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.dynamicWindowDataChangedSaveButtonDiscard,
//				handler: function() {
//					showCiDetailDataChanged = false;
//					var callback = callbackMap['verwerfen'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.dynamicWindowDataChangedSaveButtonBack,
//				handler: function() {
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'DATA_SAVED':
//			var windowTitle = labels.dynamicWindowDataSavedTitle;
//			var windowText = labels.dynamicWindowDataSavedText;
//			var windowIcon = img_OK;
//
//			var buttonConfigs = [/*{
//				text: 'Yes',
//				handler: function() {
//					var callback = callbackMap['yes'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: 'No',
//				handler: function() {
//					var callback = callbackMap['no'];
//					callback();
//					dynamicWindow.close();
//				}
//			}*/{
//				text: labels.dynamicWindowDataSavedOKButtonText,
//				handler: function() {
//					if(bIsDynamicWindowSpeichern) {
//						delegateCallback();
//						bIsDynamicWindowSpeichern = false;//see commonvars.js
//					}
//					
//					var callback = callbackMap['yes'];
//					callback();
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'DATA_SAVED_ERROR':
//			var windowTitle = labels.dynamicWindowDataSavedErrorTitle;
//			var windowText = message;
//			var windowIcon = img_Failed;
//
//			var buttonConfigs = [{
//				text: labels.dynamicWindowDataSavedErrorOKButtonText,
//				handler: function() {		
////					var callback = callbackMap['ok'];
////					callback();
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'CI_TYPE_NOT_SUPPORTED_WARNING':
//			var windowTitle = labels.dynamicWindowCiTypeNotSupportedWarningTitle;
//			var windowText = labels.dynamicWindowCiTypeNotSupportedWarningText;
//			var windowIcon = img_Warning;
//			
//			var buttonConfigs = [{
//				text: labels.dynamicWindowCiTypeNotSupportedWarningOKButtonText,
//				handler: function() {
//					dynamicWindow.close();
//				}
//			}];
//			break;
//			
//		case 'CANCEL_CONFIRMATION':						
//			var windowTitle = labels.dynamicWindowCancelConfirmationTitle;
//			var windowText = labels.dynamicWindowCancelConfirmationText;
//			var windowIcon = img_Warning;
//			
//			var buttonConfigs = [{
//				text: labels.dynamicWindowCancelConfirmationButtonOKText,
//				handler: function() {
//					showCiDetailDataChanged = false;
//					var callback = callbackMap['yes'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.dynamicWindowCancelConfirmationButtonNOText,
//				handler: function() {
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'AFTER_APP_SAVE':
//			var windowTitle = labels.wizardSaveSuccessTitle;
//			var windowText = labels.wizardSaveSuccess;
//			var windowIcon = img_OK;
//			
//			var buttonConfigs = [{
//				text: labels.dynamicWindowAfterAppSaveContinueEditingButtonText,
//				handler: function() {
//					var callback = callbackMap['continueEditing'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.dynamicWindowAfterAppSaveNewCiButtonText,
//				handler: function() {
//					var callback = callbackMap['createNewCi'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.dynamicWindowAfterAppSaveBackToSearchButtonText,
//				handler: function() {
//					var callback = callbackMap['redirectToSearch'];
//					callback();
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'CANCEL_WIZARD':
//			var windowTitle = labels.wizardCancelTitle;
//			var windowText = labels.wizardCancelQuestion;
//			var windowIcon = img_Warning;
//			
//			var buttonConfigs = [{
//				text: labels.general_yes,
//				handler: function() {
//					var callback = callbackMap['yes'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.general_no,
//				handler: function() {
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'AFTER_APP_SAVE_FAIL':
//			var windowTitle = labels.dynamicWindowDataSaveFailTitle;
//			var windowText = message;
//			var windowIcon = img_Failed;
//			
//			var buttonConfigs = [{
//				text: labels.dynamicWindowOKButtonText,
//				handler: function() {
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//			
//		case 'NON_BYTSEC':
//			var windowTitle = labels.dynamicWindowNonBYTsecTitle;
//			var windowText = labels.dynamicWindowNonBYTsecText;
//			var windowIcon = img_Warning;
//
//			var buttonConfigs = [{
//				text: labels.general_yes,
//				handler: function() {
//					var callback = callbackMap['nonBYTsecYES'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.general_no,
//				handler: function() {
//					var callback = callbackMap['nonBYTsecNO'];
//					callback();
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'FF_OR_IE':
//			var windowTitle = 'Microsoft Internet Explorer';//labels.dynamicWindowFForIETitle'];
//			var windowText = 'Firefox is recommended for better performance!';//labels.dynamicWindowFForIEText'];
//			var windowIcon = img_Warning;
//			
//			var buttonConfigs = [/*{
//				text: 'Start Firefox',//labels.dynamicWindowFForIEContinueFFButtonText'],
//				handler: function() {
//					var callback = callbackMap.continueFF;
//					callback();
//					dynamicWindow.close();
//				}
//			},*/ {
//				text: 'Continue using IE',//labels.dynamicWindowFForIEKeepIEButtonText'],
//				handler: function() {
//					var callback = callbackMap['continueIE'];
//					callback();
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//		case 'DELETE_CONFIRMATION':
//			var windowTitle = labels.dynamicWindowConfirmDeleteTitle;
//			var windowText = labels.dynamicWindowConfirmDeleteText;
//			var windowIcon = img_Warning;
//			
//			windowText = windowText.replace('{0}', message.applicationCat1Txt);
//			windowText = windowText.replace('{1}', '<b>'+message.applicationName+'</b>');//hier message=Application name
//			
//			var buttonConfigs = [{
//				text: labels.general_yes,
//				handler: function() {
//					var callback = callbackMap['yes'];
//					callback();
//					dynamicWindow.close();
//				}
//			}, {
//				text: labels.general_no,
//				handler: function() {
//					dynamicWindow.close();
//				}
//			}];
//			
//			break;
//
//	}
//
//	var dynamicWindow = new AIR.DynamicWindow(windowTitle, windowText, windowIcon, buttonConfigs);
//	return dynamicWindow;
//}

/*
function startTheFunctionWizard() {
	var searchpanel = Ext.getCmp('searchpanel');
	var createpanel = Ext.getCmp('createPanel');
	var editpanel = Ext.getCmp('editPanel');
	var myplaceHomePanel = Ext.getCmp('myplaceHomePanel');
	var myplacepanel = Ext.getCmp('myplacePanel');
	
	
	myplaceHomePanel.hide();
	myplacepanel.hide();
	searchpanel.hide();
	editpanel.hide();
	createpanel.hide();
	
	// My Place - hide functions
	Ext.getCmp('myplacemycismenuitem').hide();
	Ext.getCmp('myplacemycissubsmenuitem').hide();
	setHelptext(helpNewCI);
	//							currentMenuItem = Ext.getCmp(pid);
	
	slideItIn('createPanel');
	hideDetailsMenuItem();
	var ciCreationCardPanel = Ext.getCmp('ciCreationCardPanel');//CiCreationCardPanel
	ciCreationCardPanel.getLayout().setActiveItem('CiCreateWizardView');
}

function startTheFunctionCopyFrom() {
	var searchpanel = Ext.getCmp('searchpanel');
	var createpanel = Ext.getCmp('createPanel');
	var editpanel = Ext.getCmp('editPanel');
	var myplaceHomePanel = Ext.getCmp('myplaceHomePanel');
	var myplacepanel = Ext.getCmp('myplacePanel');
	
	myplaceHomePanel.hide();
	myplacepanel.hide();
	searchpanel.hide();
	editpanel.hide();
	createpanel.hide();

	// My Place - hide functions
	Ext.getCmp('myplacemycismenuitem').hide();
	Ext.getCmp('myplacemycissubsmenuitem').hide();
	setHelptext(helpNewCI);
	// currentMenuItem = Ext.getCmp(pid);
	
	slideItIn('createPanel');
	hideDetailsMenuItem();
	var ciCreationCardPanel = Ext.getCmp('ciCreationCardPanel');//CiCreationCardPanel
	ciCreationCardPanel.getLayout().setActiveItem('CiCopyFromView');
}*/

/*
function setCommonTextLabelDetails() {
	var labels = AIR.AirApplicationManager.getLabels();
	
	// get the application Cat1 Text
	if (!(undefined === AIR.AirApplicationManager.getAppDetail())) {//AIR.AirApplicationManager.getAppDetail();(#3) applicationDetailStore.data.items[0]
		var selectedApplicationCat1Txt = AIR.AirApplicationManager.getAppDetail().applicationCat1Txt;//AIR.AirApplicationManager.getAppDetail();(#3) applicationDetailStore.data.items[0].data['applicationCat1Txt']
	
		if (applicationObjectTypeText === selectedApplicationCat1Txt) {
			Ext.getCmp('contactsCIOwner').setTitle(labels.contactsCIOwnerApplication);
		}
		else {
			Ext.getCmp('contactsCIOwner').setTitle(labels.contactsCIOwner);
		}
	}
	
	// for the wizard
	if ((applicationObjectTypeId ===  Ext.getCmp('wizardobjectType').getValue()) || (applicationObjectTypeId === selectedCiCat1Id)) {
		Ext.getCmp('wizardCiowner').setTitle(labels.wizardCiownerApplication);	
	}
	else {
		Ext.getCmp('wizardCiowner').setTitle(labels.wizardCiowner);
	}
}*/
//function handleUserRoles() {
//	if (undefined !== rolePersonListStore && undefined !== rolePersonListStore.data) {
//		var anzeigetext = '';
//		
//		Ext.each(rolePersonListStore.data, function(item, index, allItems) {
//			var key = rolePersonListStore.getAt(index).data.id;
//			var value = rolePersonListStore.getAt(index).data.roleName;
//			
//			if(anzeigetext.length > 1)
//				anzeigetext = anzeigetext + '\n';
//			
//			anzeigetext = anzeigetext + value;
//			
//			if(rolenameApplicationLayer === value) {
//				selectedOnlyApplications = true;
//				hasRoleApplicationLayer = true;
//			} else if(rolenameDefault === value) {
//				hasRoleDefault = true;
//			} else if(rolenameInfrastructure === value) {
//				hasRoleInfrastructure = true;
//			} else if(rolenameApplicationManager === value) {
//				hasRoleApplicationManager = true;
//			} else if(rolenameAdministrator === value) {
//				hasRoleAdministrator = true;
//			} else if(rolenameDeveloper === value) {
//				hasRoleDeveloper = true;
//			} else if(rolenameBusinessEssentialEditor === value) {
//				hasRoleBusinessEssentialEditor = true;
//			}
//		});
//				
//		Ext.getCmp('myplaceroleperson').setValue(anzeigetext);
//	}
//}

//function handleUserOptions() {
//	if (undefined !== itsecUserOptionListStore && undefined !== itsecUserOptionListStore.data) {
//		Ext.each(itsecUserOptionListStore.data, function(item, index, allItems) {
//			key 	= itsecUserOptionListStore.getAt(index).data.itsecUserOptionName;
//			value 	= itsecUserOptionListStore.getAt(index).data.itsecUserOptionValue;
//			
//			if ('AIR_APPLICATION_ONLY' === key) {
//				selectedOnlyApplications = true;
//			}
//			else if ('AIR_LANGUAGE' === key) {
//				// invert selected language and switch
//				if ('DE' == value) {
//					selectedLanguage = 'EN';
//					Ext.getCmp('useroptionLanguage').setValue(true);
//				}
//				else if('EN' === value) {
//					selectedLanguage = 'DE';
//					Ext.getCmp('useroptionLanguage').setValue(false);
//				}
//				// toggle language
//				switchLanguage();//notwendig?
//			}
//			else if ('AIR_HELP_ACTIVATE' === key) {
//				if ('YES' === value) {
//					Ext.getCmp('eastpanel').collapse();
//					Ext.getCmp('useroptionHelp').setValue(true);
//				}
//				else {
//					Ext.getCmp('eastpanel').expand();
//					Ext.getCmp('useroptionHelp').setValue(false);
//				}
//			}
//			else if ('AIR_SKIP_WIZARD' === key) {
//				if ('YES' === value) {
//					isSkipCreateWizardMessage = true;
//					Ext.getCmp('useroptionSkipWizardMessage').setValue(true);
//				}
//				else {
//					isSkipCreateWizardMessage = false;
//					Ext.getCmp('useroptionSkipWizardMessage').setValue(false);
//				}
//			}
//			else if ('AIR_TOOLTIP' === key) {
//				if ('YES' == value) {
//					isDisableTooltip = true;
//					Ext.getCmp('useroptionDisableTooltip').setValue(true);					
//				}
//				else {
//					isDisableTooltip = false;
//					Ext.getCmp('useroptionDisableTooltip').setValue(false);
//				}
//			}
//			else if ('AIR_NUMBER_FORMAT' === key) {
//				// invert selected language and switch
//				if ('DE' == value) {
//					selectedNumberFormat = 'DE';
//					Ext.getCmp('useroptionNumberFormat').setValue(true);
//				}
//				else if('EN' === value) {
//					selectedNumberFormat = 'US';
//					Ext.getCmp('useroptionNumberFormat').setValue(false);
//				}
//			}
//			else if ('AIR_CURRENCY' === key) {
//				// set the currency				
//				Ext.getCmp('useroptionCurrency').setValue(value);
//				selectedCurrency = value;
//			}
//		});
//	}
//}


//var itsecUserOptionListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'itsecUserOptionId'},
//	{name: 'itsecUserOptionName', mapping: 'itsecUserOptionName'},
//	{name: 'itsecUserOptionValue', mapping: 'itsecUserOptionValue'}
//]);
//
//var itsecUserOptionListReader = new Ext.data.XmlReader({
//    record: "return",
//    idProperty: 'id'
//}, itsecUserOptionListRecordDef); 
//
//var itsecUserOptionListStore = new Ext.data.XmlStore({
//    autoDestroy: false,
//    storeId: 'aItsecUserOptionStore',
//    autoLoad: false,
//    
//	proxy: new Ext.ux.soap.SoapProxy({
//		url: webcontext +'/ApplicationWSPort',
//		loadMethod: 'getItsecUserOption',
//		timeout: 120000,
//		reader: itsecUserOptionListReader
//	}),
//	
//    baseParams: {
//		cwid: cwid
//	},
//	
//	fields: [ 'id', 'itsecUserOptionId', 'itsecUserOptionName',	'itsecUserOptionValue' ],
//
//	reader: itsecUserOptionListReader,
//	
//	listeners: {
//		beforeload: function(store, options) {
//			itsecUserOptionListStore.baseParams.cwid = cwid;
//		},
//		load: function(store, records, options) {
//		   	handleUserOptions();
//		   	inactivateButtonSaveUserOptions();
//		}
//	}
//});


//var rolePersonBusinessEssentialListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'roleId'},
//	{name: 'cwid', mapping: 'cwid'},
//	{name: 'roleName', mapping: 'roleName'}
//]);
//
//var rolePersonBusinessEssentialListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, rolePersonBusinessEssentialListRecordDef); 
//
//var rolePersonBusinessEssentialListStore = new Ext.data.XmlStore({
//    autoDestroy: false,
//    storeId: 'aRolePersonBusinessEssentialStore',
//    autoLoad: false,
//    
//	proxy: new Ext.ux.soap.SoapProxy({
//		url: webcontext +'/ApplicationWSPort',
//		loadMethod: 'getRolePersonBusinessEssentialEditor',
//		timeout: 120000,
//		reader: rolePersonBusinessEssentialListReader
//	}),
//	
//    baseParams: {
//		cwid: cwid
//	},
//	
//	fields: [ 'id',	'roleId', 'cwid', 'roleName' ],
//
//	reader: rolePersonBusinessEssentialListReader,
//	
//	listeners: {
//		beforeload: function(store, options) {
//			rolePersonBusinessEssentialListStore.baseParams.cwid = cwid;
//		},
//		load: function(store, records, options) {
//			var beinfo = 'NO';
//			hasRoleBusinessEssentialEditor = false;
//			
//		   	if (undefined !== records && records.hasOwnProperty('0') && 'BusinessEssential-Editor' === records[0].data.roleName) {
//	       		hasRoleBusinessEssentialEditor = true;
//	       		beinfo = 'YES';
//          	}
//		   	
//		   	Ext.getCmp('myplacerolebusinessessentialeditor').setValue(beinfo);
//		}
//	}
//});


//var userOptionSaveRecordDef = Ext.data.Record.create([
//	{name: 'result'},
//	{name: 'displayMessage'},
//	{name: 'messages'}
//]);
//
//var userOptionSaveReader = new Ext.data.XmlReader({
//    record: 'return'
//}, userOptionSaveRecordDef); 
//
//var userOptionSaveStore = new Ext.data.XmlStore({
//    autoDestroy: true,
//    storeId: 'userOptionSaveStore',
//    autoLoad: false,
//    
//	proxy: new Ext.ux.soap.SoapProxy({
//		url: webcontext +'/ApplicationToolsWSPort',
//		loadMethod: 'saveUserOption',
//		timeout: 120000,
//		reader: userOptionSaveReader
//	}),
//	
//    baseParams: {
//		cwid: cwid,
//		token: '',	
//		applicationId : -1
//	},
//	
//	fields: [ 'result', 'displayMessage', 'messages' ],
//	         
//	reader: userOptionSaveReader,
//	
//	listeners: {
//		beforeload: function(store, options) {
//			userOptionSaveStore.baseParams.cwid = cwid;
//			userOptionSaveStore.baseParams.token = token;
//						
//			mySaveMask.show();
//		},
//		load: function(store, records, options) {
//			mySaveMask.hide();
//			itsecUserOptionListStore.load();
//			
////			if ('OK' === records[0].data.result) {
//				// save ok				
//				// MessageBox
//				
//				// Show a dialog using config options:
////				Ext.Msg.show({
////				   title:'Data saved',
////				   msg: 'Do you like to continue editing this record?',
////				   buttons: Ext.Msg.YESNO,
////				   fn: function(btn, text, opt) {
////						if (btn === 'yes' ) {
////							Ext.emptyFn();
////						} else if (btn === 'no') {
////							actionButtonHandler(true, false);
////						}
////				   },
////				   icon: Ext.MessageBox.QUESTION
////				});
//
//				// deactivate save button / message
////				deactivateButtonSaveApplication();
////			}
////			if ('ERROR' === records[0].data.result) {
////				// error when creating
////				Ext.Msg.show({
////					title:'Data not saved',
////					msg: 'Could not save the ci<br><br>' + records[0].data.displayMessage,
////					buttons: Ext.Msg.OK,
////					fn: function(btn, text, opt) {
////						Ext.emptyFn();
////					},
////					icon: Ext.MessageBox.OK
////				});
////			}
//		}
//	}
//});


//var rolePersonListRecordDef = Ext.data.Record.create([
//	{name: 'id', mapping: 'roleId'},
//	{name: 'cwid', mapping: 'cwid'},
//	{name: 'roleName', mapping: 'roleName'}
//]);
//
//var rolePersonListReader = new Ext.data.XmlReader({
//    record: 'return',
//    idProperty: 'id'
//}, rolePersonListRecordDef); 
//
//var rolePersonListStore = new Ext.data.XmlStore({
//    autoDestroy: false,
//    storeId: 'aRolePersonStore',
//    autoLoad: false,
//    
//	proxy: new Ext.ux.soap.SoapProxy({
//		url: webcontext +'/ApplicationWSPort',
//		loadMethod: 'getRolePerson',
//		timeout: 120000,
//		reader: rolePersonListReader
//	}),
//	
//    baseParams: {
//		cwid: cwid
//	},
//	
//	fields: [ 'id',	'roleId', 'cwid', 'roleName' ],
//
//	reader: rolePersonListReader,
//	
//	listeners: {
//		beforeload: function(store, options) {
//			rolePersonListStore.baseParams.cwid = cwid;
//		},
//		load: function(store, records, options) {
//			handleUserRoles();
//		}
//	}
//});
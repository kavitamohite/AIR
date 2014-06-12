Ext.namespace('AIR');


//http://by02wr:8080/AIR/ItsecMassnahmenWSPort?wsdl
AIR.ComplianceControlsWindow = Ext.extend(Ext.Window, {
	toolbarMessageTpl: new Ext.XTemplate('<table><tr><td><img src="images/{icon}"/></td><td>{text}</td></tr><table>'),//images/{icon}
	
	constructor: function(massnahmenStore, massnahmeDetailStore, config) {//, statusWertDisplayField, massnahmeDetailStore language
		this.massnahmenStore = massnahmenStore;
		this.massnahmeDetailStore = massnahmeDetailStore;
		this.config = config;
		
		this.statusWertDisplayField = this.config.language.toUpperCase() == 'EN' ? 'statusWertEn' : 'statusWert';//statusWertDisplayField;//'statusWertEn';
		this.gapClassDisplayField = this.config.language.toUpperCase() == 'EN' ? 'gapClassTextEN' : 'gapClassTextDE';
		this.hasNoGapAnalysis = this.config.complianceType == AC.CI_GROUP_ID_NON_BYTSEC || this.config.complianceType == AC.CI_GROUP_ID_DELETE_ID || this.config.complianceType == AC.CI_GROUP_ID_EMPTY;
		
//		this.massnahmeDetailStore = AIR.AirStoreFactory.createItsecMassnahmeDetailStore(this.statusWertDisplayField);
		this.isWarningMassnahmenDone = true;
		this.warningMassnahmen = [];
		
		
		this.editedMassnahmen = {};//[]
		
		Ext.apply(Ext.form.VTypes, {
			decimal: this.validateDecimal.createDelegate(this),
			decimalText: 'Wert muss eine Dezimalzahl sein',//language Datei!
			
			decimalSmallerConstantValue: this.validateDecimalSmallerConstantValue.createDelegate(this),
			decimalSmallerConstantValueText: 'Wert muss eine Dezimalzahl kleiner oder gleich '+AC.MAX_MITIGATION_POTENTIAL+' sein'//language Datei!
		});
		
		
		AIR.ComplianceControlsWindow.superclass.constructor.call(this);
	},
	
	initComponent: function() {
//		var compliantStatusStore = AIR.AirStoreFactory.createCompliantStatusStore();
		
		var itsecMassnahmenStatusWerteStore = AIR.AirStoreFactory.createItsecMassnahmenStatusWerteStore();//auslagern und asynchrone load listener Funktion?
		var currencyStore = AIR.AirStoreFactory.createCurrencyListStore();//AIR.AirStoreManager.getStoreByName('currencyListStore');//AIR.AirStoreFactory.createCurrencyStore();//

		var params = {
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken()
		};
		itsecMassnahmenStatusWerteStore.load({
			params: params
		});
		
		//AIR.AirStoreFactory.createCurrencyListStore() weil wenn AIR.AirStoreManager.getStoreByName('currencyListStore') sind die store data=null
		//wenn das Fenster ein weiteres Mal geöffnet wird. Grund?
		//currencyStore.load();
		
		
		var signeeListStore = AIR.AirStoreFactory.createSigneeListStore();
		var signeeStoreParams = {
			itSet: this.config.itSet
		};
		signeeListStore.load({
			params: signeeStoreParams,
			callback: function() {//callback ONLY for TESTING
				/*var signee = new Ext.data.Record({
					cwid: 'ercva',
					firstname: 'Simon',
					lastname: 'Pepping'
				});
				
				signeeListStore.add(signee);*/
			}
		});
		

		
		
		var labels = AAM.getLabels();
//		var linkCiTypeListStore = AIR.AirStoreManager.getStoreByName('linkCiTypeListStore');
//		var pComplianceLinkTypeConfig = AIR.AirUiFactory.createComplianceLinkTypeConfigPanel(labels, linkCiTypeListStore);//, AIR.AirStoreManager.getStoreByName('linkCiTypeListStore')

		
		Ext.apply(this, {
			plain: true,
			modal: true,
			closable: false,
			border: false,
			resizable: false,
			title: labels.complianceWindowTitle,

			width: 1000,
			height: 500,//600 840
			
			layout: 'border',//fit
			
			items: [{
				region: 'center',
				
				xtype: 'panel',
				id: 'pLayout',
				layout: 'hbox',
				border: false,
				defaults: { margins: '0 10 0 0' },
				
//				autoScroll: true,
//				height: 650,
				
				items: [{
					xtype: 'fieldset',
					id: 'fsComplianceControls',
					title: labels.complianceWindowControls,//'Controls',
//					layout: 'fit',
					flex: 1,//2
					
					items: [{
						xtype: 'grid',
						id: 'lvComplianceControls',
						store: this.massnahmenStore,
				        
						
				        border: false,
				        height: 380,//400 500 660 635
//				        maxHeight: 2000,
				        
						columns: [{
							xtype: 'actioncolumn',
							id: 'cLinkType',
							width: 30,
							menuDisabled: true,
							
							getClass: function(v, meta, record) {
								var isCItypeFunctionLinkable = parseInt(record.get('chocoMerkmal')) > 0;
								return isCItypeFunctionLinkable ? 'choco-actioncolumn' : '';
								//http://www.sencha.com/forum/showthread.php?117409-ActionColumn-first-parameter-of-getClass-function-always-empty
								//http://docs.sencha.com/ext-js/3-4/source/Column.html#Ext-grid-ActionColumn
							}
//							
//							items: [{
//								icon: 'images/itSecMassnahmeLinkType.png'
//							}]
						},{
							header: 'Ident',
							dataIndex: 'ident',
							width: 60,
							menuDisabled: true
						},{
							header: 'Control',
							dataIndex: 'massnahmeTitel',
							width: 320,
							menuDisabled: true
						},{
							header: 'Implemented',
							dataIndex: this.statusWertDisplayField,//'statusWert', this.statusWertDisplayField
							width: 100,
							
							hidden: true
						},{
							xtype: 'actioncolumn',
							id: 'cMassnahmeInfo',
							width: 30,
							menuDisabled: true,
							
							items: [{
//								icon: 'images/Info_16x16.png'//images/Info_16x16.png
								iconCls: 'icon-info'
							}]
						}],
						
			            view: new Ext.grid.GroupingView({
//			                forceFit: true,
//			                groupTextTpl: '{text}'// ({[values.rs.length]} {[values.rs.length > 1 ? 'Items' : 'Item']})
			            })
					}]
				}, {
					xtype: 'panel',
					id: 'pMassnahmeDetails',
					layout: 'form',
					flex: 1,//3
//					hidden: true,
					border: false,
					
					autoScroll: true,
					
					height: 410,//420 540 840 620
					
					items: [/*{
						xtype: 'panel',
						id: 'pComplianceStatementInfo',
						layout: 'hbox',
						anchor: '95%',
						
						border: false,
						
						items: [{
							xtype: 'label',
							id: 'lComplianceStatementInfo',
							text: labels.complianceStatementInfo,
//							anchor: '90%',
							
							margins: '10 0 10 0',
							style: {
						    	fontSize: 12
							}
						}]
					},*/
//				        pComplianceLinkTypeConfig,
			        {
			        	xtype: 'AIR.ComplianceLinkView',
			        	id: 'complianceLinkView',
			        	hidden: true
			        },{
						xtype: 'fieldset',
						id: 'fsComplianceStatement',
						title: labels.complianceWindowStatement,
						
						hidden: true,
						layout: 'form',
						labelWidth: 100,
						anchor: '95%',
						
						// Muss leider auf Elementebene gemacht werden, da auf fieldset/panel Ebene diese unerwünscht grau hinterlegt werden
//						disabled: true,//this.hasNoUserRights
	
						items: [{
							xtype: 'panel',
							id: 'pCompliantStatus',
							border: false,
							
							layout: 'hbox',
							anchor: '100%',
							
							items: [{
					    		xtype: 'label',
					    		id: 'lCompliantStatus',
					    		text: labels.complianceWindowCompliant,//'Compliant',
					    		flex: 2,
//					    		width: 100,
					    		
					    		margins: '0 5 5 0',
					    		
								style: {
							    	fontSize: 12
								}
					    	},{
								xtype: 'combo',
								id: 'cbCompliantStatus',
//								fieldLabel: languagestore.getAt(0).data['complianceWindowCompliant'],//'Compliant',
								
								store: itsecMassnahmenStatusWerteStore,//compliantStatusStore,
								displayField: this.statusWertDisplayField,//'compliantStatusText',
								valueField: 'itsecMassnahmenWertId',//compliantStatusId
								
								anchor: '100%',
								flex: 7,
								margins: '0 0 0 0',
								
//								typeAhead: true,
//								forceSelection: true,
//								selectOnFocus: true,
								
								triggerAction: 'all',
								lazyInit: false,//damit cbCompliantStatus.view nicht erst bei fokussierung initialisiert wird
								mode: 'local',
								editable: false
					    	}]
						}, {
							xtype: 'panel',
							id: 'pJustification',
							border: false,
							
							layout: 'hbox',
							anchor: '100%',
							
							items: [{
					    		xtype: 'label',
					    		id: 'lJustification',
					    		text: labels.complianceWindowJustification,//'Justification'
					    		flex: 2,
//					    		width: 100,
					    		
					    		margins: '5 5 5 0',
					    		
								style: {
							    	fontSize: 12
								}
					    	},{
								xtype: 'textarea',
								id: 'taJustification',
								enableKeyEvents: true,
								allowBlank: false,
								
								height: 50,
								anchor: '100%',
								margins: '5 0 0 0',
								flex: 7,
								
								fieldLabel: labels.complianceWindowJustification//'Justification'
					    	}]
						}]
					},{
						xtype: 'fieldset',
						id: 'fsGap',
						title: labels.complianceWindowGap,//languagestore.getAt(0).data['complianceWindowStatement'],
						
						layout: 'form',
						labelWidth: 100,
						hidden: true,//this.hasNoGapAnalysis,
						anchor: '95%',//100 95% bei allen pMassnahmeDetails fieldsets falls dieses Fenster höher werden muss
						
						items: [{
							xtype: 'panel',
							id: 'pGapDescription',
							border: false,
							
							layout: 'hbox',
							anchor: '100%',
							
							items: [{
					    		xtype: 'label',
					    		id: 'lGapDescription',
					    		text: labels.complianceWindowGapDescription,
					    		flex: 2,
//					    		width: 100,
					    		
					    		margins: '0 5 5 0',
					    		
								style: {
							    	fontSize: 12
								}
					    	},{
								xtype: 'textarea',
								id: 'taGapDescription',
								enableKeyEvents: true,
								allowBlank: false,
								height: 50,
								
								flex: 6,
								margins: '0 0 0 0'
								
//								anchor: '100%',
//								fieldLabel: 'Description'
					    	}]
						},{
							xtype: 'fieldset',
							id: 'fsGapElimination',
							title: labels.complianceWindowGapElimination,
							
							layout: 'form',
							anchor: '100%',
							
							items: [{
								xtype: 'panel',
								id: 'pGapResponsible',
								border: false,
								
								layout: 'column',//column hbox
								anchor: '100%',
								
								items: [{
						    		xtype: 'label',
						    		id: 'labeltfGapResponsible',//lGapResponsible
						    		text: labels.complianceWindowGapResponsible,
//						    		flex: 5,//5 4
						    		
						    		width: 92,//92 100
//						    		margins: '0 2 0 0',
						    		
									style: {
								    	fontSize: 12
									}
						    	},{
									xtype: 'textfield',
									id: 'tfGapResponsible',
									allowBlank: false,
									
									width: 240,
									
									style: {
						    			marginLeft: 5
						    		},
									

									readOnly: true
								},{
									xtype: 'hidden',//nur für/wegen personPicker
							        id: 'tfGapResponsibleHidden'
							    },{
					                xtype: 'button',//commandlink
					                id: 'clGapResponsibleAddPicker',
					                
					                cls: 'x-btn-text-icon',
					                iconCls: 'icon-add-user',
					                style: {
							    		marginLeft: 3
							    	}
					                
								},{
									xtype: 'button',//commandlink
					                id: 'clGapResponsibleDeletePicker',
					                
					                cls: 'x-btn-text-icon',
				                	iconCls: 'icon-delete-user',
					                style: {
							    		marginLeft: 3
							    	}
					                
								}]
							},{
								xtype: 'panel',
								id: 'pPlanOfAction',
								border: false,
								
								layout: 'hbox',
								anchor: '100%',
								
								items: [{
						    		xtype: 'label',
						    		id: 'lPlanOfAction',
						    		text: labels.complianceWindowPlanOfAction,
						    		flex: 2,
//						    		width: 100,
						    		
						    		margins: '5 5 5 0',
						    		
									style: {
								    	fontSize: 12
									}
						    	},{
									xtype: 'textarea',
									id: 'taPlanOfAction',
									enableKeyEvents: true,
									allowBlank: false,
									height: 50,
									
									flex: 7,
									margins: '5 0 0 0'
									
						    	}]
							},{
								xtype: 'panel',
								id: 'pGapClass',
								border: false,
								
								layout: 'hbox',
								anchor: '100%',
								
								style: {
							    	marginTop: 5
								},
								
								items: [{
						    		xtype: 'label',
						    		id: 'lGapClass',
						    		text: labels.complianceWindowGapClass,
						    		
						    		width: 92,
						    		
									style: {
										marginTop: 5,
								    	fontSize: 12
									}
						    	},{
									xtype: 'combo',
									id: 'cbGapClass',
									store: AIR.AirStoreManager.getStoreByName('itsecMassnahmenGapClassListStore'),
									allowBlank: false,
									msgTarget: 'under',
						
									width: 300,
									style: {
								    	marginLeft: 5
									},
									
									fieldLabel: 'Gap class',
							        valueField: 'gapPriority',
							        displayField: this.gapClassDisplayField,
							        
							        mode: 'local',
							        triggerAction: 'all',
							        lazyRender: true,
							        lazyInit: false,
							        
							        editable: false
						    	}]
							},{
								xtype: 'panel',
								id: 'pTargetDate',
								border: false,
								
								layout: 'hbox',
								anchor: '100%',
								
								style: {
							    	marginTop: 5
								},
								
								items: [{
						    		xtype: 'label',
						    		id: 'lTargetDate',
						    		text: labels.complianceWindowTargetDate,
						    		
//						    		flex: 2,
//						    		margins: '5 5 5 0',
						    		
						    		width: 92,//100
						    		
									style: {
										marginTop: 5,
								    	fontSize: 12
									}
						    	},{
									xtype: 'datefield',
									id: 'dfTargetDate',
									
									format: AIR.AirApplicationManager.getDateFormat(),//this.config.language
									altFormats: AIR.AirApplicationManager.getDateFormat(),//only accept this format
									allowBlank: false,
									enableKeyEvents: true,
									msgTarget: 'under',
//									readOnly: true,//sonst kein Datem auswählbar
									
//									flex: 7,
//									margins: '5 0 0 0'
									
									width: 120,
									style: {
//								    	marginTop: 5,
								    	marginLeft: 5
									}
									
									
								}/*,{
									xtype: 'textfield',
									id: 'tfTargetDate',
									margins: '0 0 5 0',
									
//									disabled: true,
									readOnly: true,
									flex: 2
								},{
					                xtype: 'commandlink',
					                id: 'clTargetDatePicker',
					                img: 'images/date.png',//date_16x16.png add_user_16x16.png
					                margins: '0 0 5 0',
					                	
				                	flex: 5
								}*/]
							}]
						}]
					},{
						xtype: 'fieldset',
						id: 'fsRiskAnalysisAndMgmt',
						title: labels.complianceWindowRiskAnalysisAndMgmt,//languagestore.getAt(0).data['complianceWindowStatement'],
//						height: 150,//wenn einem Kind Panel ein card layout ist
						
						layout: 'form',
						hidden: true,//this.hasNoGapAnalysis,
						anchor: '95%',
						
						items: [{
							xtype: 'panel',
							id: 'pRiskAnalysisType',
							border: false,
							
							layout: 'hbox',
							height: 22,
														
							items: [{
								xtype: 'checkbox',
								id: 'chbRiskAnalysisType',
								checked: false,
								
								boxLabel: labels.complianceWindowRiskAnalysisByFreeText,
								flex: 1
							},{
								xtype: 'spacer',
								flex: 1
							}]
						},{
							xtype: 'panel',
							id: 'pRiskAnalysisAndMgmtDetail',
							border: false,
							
							layout: 'form',
							labelWidth: 195,
							
							style: {
						    	marginTop: 20
							},
								
							items: [{
								xtype: 'panel',
								id: 'pRiskAnalysisAndMgmtCard',
								border: false,
								
								layout: 'card',
								activeItem: 0,
								

								style: {
							    	marginBottom: 3
								},
								
								items: [{
									xtype: 'panel',
									id: 'pRiskAnalysisAndMgmtNonFreeText',
									
									layout: 'form',
									border: false,
									height: 140,
									//warum wird die Höhe nicht automatisch berechnet wie bei pRiskAnalysisAndMgmtFreeText ohne height: 220
									
									items: [{
										xtype: 'panel',
										id: 'pOccurenceOfDamagePerYear',
										border: false,
										
										layout: 'hbox',
										anchor: '100%',
										
										items: [{
								    		xtype: 'label',
								    		id: 'lOccurenceOfDamagePerYear',
								    		text: labels.complianceWindowOccurenceOfDamagePerYear,
								    		
								    		width: 180,
//								    		flex: 5,
//								    		margins: '15 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfOccurenceOfDamagePerYear',//ITSEC_MASSN_STATUS::PROB_OCCURENCE:NUMBER(10,3)
											enableKeyEvents: true,
											allowBlank: false,
//											maskRe: /[0-9][0-9]?([.][0-9][0-9])?/g,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimal',
											
								    		width: 150,
								    		style: {
								    			textAlign: 'right'
								    		}
//											flex: 6,
//											margins: '15 0 0 0'
										}]
									},{
										xtype: 'panel',
										id: 'pMaxDamagePerEvent',
										border: false,
										
										layout: 'hbox',
										anchor: '100%',
										
										style: {
									    	marginTop: 5
										},
										
										items: [{
								    		xtype: 'label',
								    		id: 'lMaxDamagePerEvent',
								    		text: labels.complianceWindowMaximumDamagePerEvent,
								    		
//								    		flex: 5,
//								    		margins: '0 0 0 0',//5 4 0 0
								    		
								    		width: 180,//199
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfMaxDamagePerEvent',
											enableKeyEvents: true,
											allowBlank: false,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimal',
											
								    		width: 150,//116
								    		style: {
								    			textAlign: 'right'
								    		}
								    	
//											flex: 3,
//											margins: '0 0 0 0'//5 0 0 0
										},{
											xtype: 'combo',
											id: 'cbMaxDamagePerEventCurrency',
											store: currencyStore,//AIR.AirStoreManager.getStoreByName('currencyListStore'),//currencyStore,//currencyListStore,//AIR.AirStoreFactory.createGxpFlagListStore(),//gxpFlagListStore,
											allowBlank: false,
											
//											flex: 3,
//											margins: '5 0 0 5',
											
											width: 80,//116
											style: {
//										    	marginTop: 5,
										    	marginLeft: 5
											},
											
									        valueField: 'id',//id currencyId
									        displayField: 'symbol',//text currencyName


									        triggerAction: 'all',
									        lazyRender: true,
									        lazyInit: false,
									        mode: 'local',
									        
								        	editable: false
										}]
									},{
										xtype: 'panel',
										id: 'pMitigationPotential',
										border: false,
										
										layout: 'hbox',
										anchor: '100%',
			//						    layoutConfig: {
			//						        padding: '5'
			//						    },
										
										style: {
									    	marginTop: 5
										},
									    
										
										items: [{
								    		xtype: 'label',
								    		id: 'lMitigationPotential',
								    		text: labels.complianceWindowMitigationPotential,
								    		
								    		width: 180,
//								    		flex: 5,
//								    		margins: '5 4 0 0',
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfMitigationPotential',
											enableKeyEvents: true,
											allowBlank: false,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimalSmallerConstantValue',//'decimalSmallerConstantValue',
											
								    		width: 150,
								    		style: {
								    			textAlign: 'right'
								    		}
								    		
//											flex: 5,
//											margins: '5 0 0 0'
										},{
								    		xtype: 'label',
			//					    		id: 'lMitigationPotential',
								    		text: '%',
								    		
								    		flex: 1,
								    		margins: '5 0 0 5',
								    		
											style: {
										    	fontSize: 12
											}
								    	}]
									},{
										xtype: 'panel',
										id: 'pRiskMitigation',
										border: false,
										
										layout: 'hbox',
										anchor: '100%',
										
										style: {
									    	marginTop: 5
										},
										
										items: [{
								    		xtype: 'label',
								    		id: 'lRiskMitigation',
								    		text: labels.complianceWindowRiskMitigation,
								    		
								    		width: 180,
//								    		flex: 5,
//								    		margins: '5 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfRiskMitigation',
											enableKeyEvents: true,
//											allowBlank: false,
											disabled: true,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimal',
								    		
								    		style: {
								    			textAlign: 'right'
								    		},
											
								    		width: 150
								    		
//											flex: 6,
//											margins: '5 0 0 0'
										}]
									},{
										xtype: 'panel',
										id: 'pExpensePerYear',
										border: false,
										
										layout: 'hbox',
										anchor: '100%',
										
										style: {
									    	marginTop: 5
										},
										
										items: [{
								    		xtype: 'label',
								    		id: 'lExpensePerYear',
								    		text: labels.complianceWindowExpensePerYear,
								    		
								    		width: 180,
//								    		flex: 5,
//								    		margins: '5 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfDamagePerYear',
											enableKeyEvents: true,
											allowBlank: false,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimal',
								    		
								    		style: {
								    			textAlign: 'right'
								    		},
											
								    		width: 150
								    		
//											flex: 6,
//											margins: '5 0 0 0'
										}]
									}]
								},{
									xtype: 'panel',
									id: 'pRiskAnalysisAndMgmtFreeText',
									border: false,
									
									layout: 'form',
									height: 240,//sonst wird letzte textarea nicht angezeigt
									
									items: [{
										xtype: 'container',
										height: 15
									},{
										xtype: 'panel',
										id: 'pOccurenceOfDamagePerYear2',
										border: false,
										
										layout: 'hbox',
//										anchor: '100%',
										height: 55,
										
										items: [{
								    		xtype: 'label',
								    		id: 'lOccurenceOfDamagePerYear2',
								    		text: labels.complianceWindowOccurenceOfDamagePerYear,
								    		
								    		flex: 5,
								    		margins: '0 0 0 0',//15 0 0 0
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textarea',
											id: 'taOccurenceOfDamagePerYear2',
											enableKeyEvents: true,
											allowBlank: false,
											height: 50,
											
											flex: 6,
											margins: '0 0 0 0'//15 0 0 0
										}]
									},{
										xtype: 'panel',
										id: 'pMaxDamagePerEvent2',
										border: false,
										
										layout: 'hbox',
//										anchor: '100%',
										height: 55,
										
										items: [{
								    		xtype: 'label',
								    		id: 'lMaxDamagePerEvent2',
								    		text: labels.complianceWindowMaximumDamagePerEvent,
								    		
								    		flex: 5,
								    		margins: '0 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textarea',
											id: 'taMaxDamagePerEvent2',
											enableKeyEvents: true,
											allowBlank: false,
											height: 50,
											
											flex: 6,
											margins: '0 0 0 0'
										}]
									},{
										xtype: 'panel',
										id: 'pMitigationPotential2',
										border: false,
										
										layout: 'hbox',
//										anchor: '100%',
									    height: 55,
										
										items: [{
								    		xtype: 'label',
								    		id: 'lMitigationPotential2',
								    		text: labels.complianceWindowMitigationPotential,
								    		
								    		flex: 5,
								    		margins: '0 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textarea',
											id: 'taMitigationPotential2',
											enableKeyEvents: true,
											allowBlank: false,
											height: 50,
											
											flex: 6,
											margins: '0 0 0 0'
										}]
									},{
										xtype: 'panel',
										id: 'pRiskMitigation2',
										border: false,
										
										layout: 'hbox',
//										anchor: '100%',
										height: 55,
										
										items: [{
								    		xtype: 'label',
								    		id: 'lRiskMitigation2',
								    		text: labels.complianceWindowRiskMitigation,
								    		
								    		flex: 5,
								    		margins: '0 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textarea',
											id: 'taDamagePerYear2',
											enableKeyEvents: true,
											allowBlank: false,
											height: 50,
											
											flex: 6,
											margins: '0 0 0 0'
										}]
									}]
								}]
							},{
								xtype: 'panel',
								id: 'pSignee',
								border: false,
								layout: 'hbox',//column
								
								items: [{
									xtype: 'label',
									id: 'lSignee',
									text: labels.complianceWindowSignee,
									width: 180,//195
									
									style: {
										fontSize: 12
									}
								},{	
									xtype: 'filterCombo',//combo
									id: 'cbSignee',
									store: signeeListStore,//signeeListStore,//AIR.AirStoreFactory.createSigneeListStore()
									allowBlank: false,
									
							        valueField: 'cwid',//id currencyId
							        displayField: 'lastname',//text currencyName
							        
	//						        itemSelector: 'x-combo-list-item',
							        tpl: '<tpl for="."><div ext:qtip="{cwid}" class="x-combo-list-item">{lastname}, {firstname}</div></tpl>',//'<tpl for="."><div class="x-combo-list-item">{' + this.displayField + '}</div></tpl>',//
							        enableKeyEvents: true,
							        
							        triggerAction: 'all',
							        lazyRender: true,
							        lazyInit: false,
							        mode: 'local',
									
									width: 150//145 195
//									fieldLabel: labels.complianceWindowSignee
	//								editable: false
									
	//								style: {
	//									marginTop: 5
	//								}
								},{
									xtype: 'button',
									id: 'bSigneeApproval',
									hidden: true,
									
						        	cls: 'x-btn-text-icon',
						        	iconCls: 'icon-ok',
//						        	icon: 'images/ok_type1_16x16.png',//images/ok_type1_16x16.png
						        	text: labels.signeeApproval,
						        	
									style: {
										marginLeft: 3
									}
								}]
							},{
								xtype: 'panel',
								id: 'pDateOfApproval',
								border: false,
								
								layout: 'hbox',
								anchor: '100%',
								
								style: {
							    	marginTop: 5
								},
								
								items: [{
						    		xtype: 'label',
						    		id: 'lDateOfApproval',
						    		text: labels.complianceWindowDateOfApproval,
						    		
//						    		flex: 5,
//						    		margins: '5 0 0 0',
						    		
						    		width: 180,//195
									style: {
										marginTop: 5,
								    	fontSize: 12
									}
						    	},{
									xtype: 'datefield',
									id: 'dfDateOfApproval',
									
									format: AIR.AirApplicationManager.getDateFormat(),//this.config.language
									altFormats: AIR.AirApplicationManager.getDateFormat(),//only accept this format
//									readOnly: true,//sonst kein Datem auswählbar
									
//									margins: '5 0 0 0',
//									flex: 6
									
//									disabled: true,
//									hideTrigger: true,
									
									width: 120,
									style: {
//								    	marginTop: 5,
//								    	marginLeft: 5
									}
								}]
							}]
						}]
					}]
				}]
			}, {
				region: 'south',
				xtype: 'panel',
				id: 'pComplianceToolbar',
				
				border: false,
				height: 25,
//				margins: '20 0 0 0',
				
		    	items: [{
//		    		xtype: 'commandlink',
		    		
			    	xtype: 'label',
			    	id: 'lComplianceToolbar'
//			    	html: this.toolbarEmptyMessage
		    	}]
			}],
			
			buttonAlign: 'center',
			buttons: [{
				id: 'bComplianceControlsSave',
				text: 'Save and Close',
				disabled: true
			},{
				id: 'bComplianceControlsApply',
				text: 'Save',
				disabled: true
			},{
				id: 'bComplianceControlsCancel',
				text: 'Cancel'
			},{
				id: 'bOpenInvalidMassnahmeWindow',
//				text: ''
				hidden: true
			}]
		});
		
		AIR.ComplianceControlsWindow.superclass.initComponent.call(this);
		
		this.addEvents('massnahmeSaved');
		
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		var cMassnahmeInfo = grid.getColumnModel().getColumnById('cMassnahmeInfo');
		grid.on('rowclick', this.onMassnahmeSelected, this);//click
		grid.getSelectionModel().on('beforerowselect', this.onBeforeMassnahmeSelect, this);
		cMassnahmeInfo.on('click', this.onMassnahmeInfoClick, this);
		
		var bComplianceControlsSave = this.getFooterToolbar().getComponent('bComplianceControlsSave');//items.map.bComplianceControlsSave
		var bComplianceControlsApply = this.getFooterToolbar().getComponent('bComplianceControlsApply');
		var bComplianceControlsCancel = this.getFooterToolbar().getComponent('bComplianceControlsCancel');
		var bOpenInvalidMassnahmeWindow = this.getFooterToolbar().getComponent('bOpenInvalidMassnahmeWindow');
		
		bComplianceControlsSave.on('click', this.onSave, this);
		bComplianceControlsApply.on('click', this.onApply, this);
		bComplianceControlsCancel.on('click', this.onCancel, this);
//		bOpenInvalidMassnahmeWindow.on('click', this.openInvalidMassnahmeWindow, this);//onOpenInvalidMassnahmeWindow
		
		
		var cbCompliantStatus = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification').getComponent('taJustification');
		
//		cbCompliantStatus.on('beforeselect', this.onCompliantStatusBeforeChange, this);
		cbCompliantStatus.on('select', this.onCompliantStatusChange, this);//onMassnahmeChange
		taJustification.on('keyup', this.onMassnahmeChange, this);
		
		this.massnahmeDetailStore.on('load', this.onMassnahmenDetailLoaded, this);
		
		
		//-----------------------------------------------------------------------------------------------------------------------
		var chbRiskAnalysisType = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType');
		chbRiskAnalysisType.on('check', this.onRiskAnalysisTypeCheck, this);
		
		var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
		taGapDescription.on('keyup', this.onMassnahmeChange, this);
		
		
		var clGapResponsibleAddPicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleAddPicker');
		clGapResponsibleAddPicker.on('click', this.onGapResponsibleAddPicker, this);
		
		var clGapResponsibleDeletePicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleDeletePicker');
		clGapResponsibleDeletePicker.on('click', this.onGapResponsibleDeletePicker, this);
		
		
//		var clSigneeAddPicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pSignee').getComponent('clSigneeAddPicker');
//		clSigneeAddPicker.on('click', this.onSigneeAddPicker, this);
//		
//		var clSigneeDeletePicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pSignee').getComponent('clSigneeDeletePicker');
//		clSigneeDeletePicker.on('click', this.onSigneeDeletePicker, this);
		
		var cbGapClass = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapClass').getComponent('cbGapClass');//Ext.getCmp('cbGapClass');//
		cbGapClass.on('select', this.onGapClassSelect, this);//select change

		
		var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
		var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');

		var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
		var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
		var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
		var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').getComponent('tfDamagePerYear');
		var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');

		tfOccurenceOfDamagePerYear.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onOccurenceOfDamagePerYearChange onMassnahmeChange
		tfOccurenceOfDamagePerYear.on('change', this.onOccurenceOfDamagePerYearChange, this);
		tfMaxDamagePerEvent.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onMaxDamagePerEventChange onMassnahmeChange
		tfMaxDamagePerEvent.on('change', this.onMaxDamagePerEventChange, this);
		tfMitigationPotential.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onMitigationPotentialChange onMassnahmeChange
		tfMitigationPotential.on('change', this.onMitigationPotentialChange, this);
		tfDamagePerYear.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onDamagePerYearChange onMassnahmeChange
		tfDamagePerYear.on('change', this.onDamagePerYearChange, this);//change blur
		cbMaxDamagePerEventCurrency.on('select', this.onRiskAnalysisAndMgmtChange, this);//onMaxDamagePerEventCurrencySelect
		
		
		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
		var taPlanOfAction = fsGapElimination.getComponent('pPlanOfAction').getComponent('taPlanOfAction');
		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
		
		
		var pRiskAnalysisAndMgmtFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtFreeText');
		var taOccurenceOfDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pOccurenceOfDamagePerYear2').getComponent('taOccurenceOfDamagePerYear2');
		var taMaxDamagePerEvent2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMaxDamagePerEvent2').getComponent('taMaxDamagePerEvent2');
		var taMitigationPotential2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMitigationPotential2').getComponent('taMitigationPotential2');
		var taDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2');

		tfGapResponsible.on('change', this.onMassnahmeChange, this);
		taPlanOfAction.on('keyup', this.onMassnahmeChange, this);
		dfTargetDate.on('select', this.onMassnahmeChange, this);
		dfTargetDate.on('change', this.onTargetDateChange, this);//change keyup
		dfTargetDate.on('keyup', this.onTargetDateKeyUp, this);
		dfTargetDate.on('blur', this.onTargetDateFocusLost, this);
		
		
		taOccurenceOfDamagePerYear2.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onMassnahmeChange
		taMaxDamagePerEvent2.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onMassnahmeChange
		taMitigationPotential2.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onMassnahmeChange
		taDamagePerYear2.on('keyup', this.onRiskAnalysisAndMgmtChange, this);//onMassnahmeChange
		
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
//		var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
		var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('cbSignee');
		var bSigneeApproval = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('bSigneeApproval');
		var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
		
//		tfSignee.on('change', this.onMassnahmeChange, this);
		cbSignee.on('select', this.onSigneeSelect, this);
//		cbSignee.on('change', this.onSigneeChange, this);
		cbSignee.on('keyup', this.onSigneeChange, this);
		bSigneeApproval.on('click', this.onSigneeApprove, this);
		dfDateOfApproval.on('select', this.onMassnahmeChange, this);
		dfDateOfApproval.on('change', this.onDateChange, this);//change keyup
		
		var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');
		complianceLinkView.on('linkCiSelect', this.onLinkCiSelect, this);
		complianceLinkView.on('linkCiTypeSelect', this.onLinkCiTypeSelect, this);
		
//		this.on('massnahmenWarning', this.onMassnahmenWarning, this);
	},
	
	onTargetDateKeyUp: function(field, event) {
		this.isWarningMassnahmenDone = false;
		this.onMassnahmeChange();
	},
	
	onTargetDateChange: function(field, newValue, oldValue) {
		this.onDateChange(field, newValue, oldValue);
		
		/*this.isTargetDateValid(field.getValue());
//		this.loadedMassnahme.isValid = this.isTargetDateValid(field.getValue());
		
		this.onMassnahmeChange();*/
	},
	
	onTargetDateFocusLost: function(field) {
		if(field.getValue().length === 0) {
			field.clearInvalid();
			return;
		}
		
		var result = this.isTargetDateValid(field.getValue());
		
		if(result.message) {
			if(result.isValid) {//Massnahmen Validierungsfenster für Warnungen sollen nur einmal kommen
				if(this.warningMassnahmen.length > 0 && !this.skipFocusLost) {
					this.warningMassnahmen.splice(0, this.warningMassnahmen.length);
					this.openMassnahmeValidationWindow(result.gapClass, result.title, result.iconType, result.message, result.isValid);
				}
			} else
				this.openMassnahmeValidationWindow(result.gapClass, result.title, result.iconType, result.message, result.isValid);
		}
	},
	
	isTargetDateValid: function(date) {//, skip
		//wenn es keine editierten Massnahmen gibt, sprich die Massnahme nach einer Speicherung neu geladen wurde,
		//kann das target nicht falsch sein. Daher keine Prüfung, damit beim Zugriff auf die nicht existierende
		//Massnahme kein Fehler kommt: var gapClass = this.editedMassnahmen[this.previousSelection].gapPriority
		if(!this.editedMassnahmen[this.previousSelection])
			return true;
		
		var isValid = true;
		var isWarning = false;
		var labels = AAM.getLabels();
		
		var title = labels.invalidMassnameWindowTitleGapClass,
			message;
		
		var now = new Date();
		if(date < now) {
			message = labels.invalidMassnameWindowTargetDatePast;
			isValid = false;
		} else {
			var gapClass = this.editedMassnahmen[this.previousSelection].gapPriority;//this.loadedMassnahme.gapPriority;// cbGapClass.getValue();
			
			var oldMonth = now.getMonth();
			var oldYear = now.getFullYear();
			var newMonth = date.getMonth();
			var newYear = date.getFullYear();
			
			var monthDifference;
			var yearDifference = newYear - oldYear;

			
			if(yearDifference > 1) {
				var dates = this.getValidTargetDates(oldMonth, oldYear);
				
				message = labels.invalidMassnameWindowTargetDate;
				message = message.replace('{0}', dates[0].format(AAM.getDateFormat())).replace('{1}', dates[1].format(AAM.getDateFormat())).replace('{2}', dates[2].format(AAM.getDateFormat()));
				
				field.markInvalid('');
				isValid = false;
			} else if(yearDifference === 1) {
				if(newMonth > oldMonth) {
					monthDifference = 12 + (newMonth - oldMonth);
				} else if(newMonth < oldMonth) {
					monthDifference = 12 - (oldMonth - newMonth);
				} else {
					monthDifference = 12;
				}
			} else {
				monthDifference = newMonth - oldMonth;
			}
	
	
			var newGapClass,
				iconType;
			
			if(monthDifference > 12) {
				var dates = this.getValidTargetDates(oldMonth, oldYear);
				
				message = labels.invalidMassnameWindowTargetDate;
				message = message.replace('{0}', dates[0].format(AAM.getDateFormat())).replace('{1}', dates[1].format(AAM.getDateFormat())).replace('{2}', dates[2].format(AAM.getDateFormat()));
				
				field.markInvalid('');
				isValid = false;
			} else {
				switch(gapClass) {
					case '1'://long-term
						if(monthDifference > 12) {
							message = labels.invalidMassnameWindowTargetDate;
							
							field.markInvalid('');
							isValid = false;
						}
						break;
					case '2'://mid-term
						if(monthDifference > AC.GAP_CLASS_MID_TERM_ID2_PLUS_6_MONTHS && monthDifference < 13) {
							newGapClass = '1';
							message = labels.invalidMassnameWindowGapClassReplace.replace('{0}', date.format(AAM.getDateFormat())).replace('{1}', 'long-term to solve').replace('{2}', 'mid-term to solve');
							iconType = img_OK;
							isWarning = true;
						}
												
						break;
					case '3'://short-term
						if(monthDifference > AC.GAP_CLASS_MID_TERM_ID3_PLUS_3_MONTHS && monthDifference <= AC.GAP_CLASS_MID_TERM_ID2_PLUS_6_MONTHS) {
							newGapClass = '2';

							message = labels.invalidMassnameWindowGapClassReplace.replace('{0}', date.format(AAM.getDateFormat())).replace('{1}', 'mid-term to solve').replace('{2}', 'short-term to solve');
							field.markInvalid('');
							iconType = img_OK;
							isWarning = true;
						} else if(monthDifference > AC.GAP_CLASS_MID_TERM_ID2_PLUS_6_MONTHS && monthDifference < 13) {
							newGapClass = '1';
							
							message = labels.invalidMassnameWindowGapClassReplace.replace('{0}', date.format(AAM.getDateFormat())).replace('{1}', 'long-term to solve').replace('{2}', 'short-term to solve');
							field.markInvalid('');
							iconType = img_OK;
							isWarning = true;
						}
						
						break;
					default: break;
				}
			}
		}
		
		if(isValid && newGapClass) {
			var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
			var cbGapClass = fsGapElimination.getComponent('pGapClass').getComponent('cbGapClass');
			
			cbGapClass.setValue(newGapClass);
		}
		
		var result = {
			isValid: isValid,
			isWarning: isWarning,
			gapClass: newGapClass,
			title: title,
			iconType: iconType,
			message: message
		};
		
		return result;//isValid;
	},
	
	checkEconomicallySolvable: function (massnahme) {
		if (parseFloat(massnahme.damage) * parseFloat(massnahme.probOccurence) * parseFloat(massnahme.mitigationPotential) >= parseFloat(massnahme.expense)) {
			var labels = AAM.getLabels();
			Ext.Msg.show({
				   title:'Information',
				   msg: labels.invalidMassnameWindowDamagePerYear,
				   buttons: Ext.Msg.OK,
				   icon: Ext.Msg.INFO
				});
		}
	},
	
	
	openMassnahmeValidationWindow: function(newGapClass, title, iconType, message, isValid) {
		var okCallback = function() {
			this.isMessageWindowOpen = false;
			
			if(!isValid) {
				var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
				var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
				
				dfTargetDate.focus();
				dfTargetDate.markInvalid();
			}
		};
		
		var callbackMap = {
			ok: okCallback.createDelegate(this)
		};
		

		if(!this.isMessageWindowOpen) {
			Util.log('isTargetDateValid isMessageWindowOpen='+this.isMessageWindowOpen);

        	this.isMessageWindowOpen = true;
			var invalidMassnahmeWindow = AIR.AirWindowFactory.createDynamicMessageWindow('INVALID_MASSNAHME', callbackMap, message, title, null, iconType);
			invalidMassnahmeWindow.show(this.getEl());
			invalidMassnahmeWindow.setWidth(400);
		}
	},
	
	
	onDateChange: function(field, newValue, oldValue) {
		if(typeof newValue === 'string')//damit kein Mist eingegeben werden kann
			if(newValue.length === 0 && field.el.dom.value.length > 0 && !field.parseDate(field.el.dom.value))
				field.setValue(oldValue);
			else this.onMassnahmeChange();
	},
	
	onCompliantStatusBeforeChange: function(combo, record, index) {
//		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
//		var rowEl = grid.getView().getRow(this.previousSelection);//this.previousSelection = this.getSelectedGridIndex();
//		
//		var rowPosY = rowEl.getScrolls().y;//getPosition
//		Util.log('before: previousSelection='+this.previousSelection+' rowPosY='+rowPosY);//rowEl.getY()
	},
	onCompliantStatusChange: function(combo, record, index) {
		if(!this.editedMassnahmen[this.previousSelection])
			this.saveMassnahme(this.previousSelection);
		
		var options = { compliantStatusClearInvalid: true };
		this.onMassnahmeChange(options);
		
		this.updateMassnahmenTable(status, record.data[this.statusWertDisplayField]);//this.statusWertDisplayField record.data.statusWert
//		this.onMassnahmeChange();
		
		
		var gapClass = this.editedMassnahmen[this.previousSelection].gapPriority;
		this.updateGapRelevance(record.data.itsecMassnahmenWertId, gapClass, true);//'-1'
		
//		this.onMassnahmeChange();
	},
	/*scrollToMassnahme: function() {
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		var view = grid.getView();
		var rowEl = grid.getView().getRow(this.getSelectedGridIndex());//this.previousSelection
		var rowElParent = rowEl.getParent();

		var rowPosY = rowEl.getScrolls().y;//getPosition
		Util.log('after: previousSelection='+this.previousSelection+' rowPosY='+rowPosY);
		
		var direction = 'top';
//		grid.getEl().scroll(direction, 500);//rowPosY
//		view.el.scrollTo(0, 300);//rowPosY rowElParent
		view.el.dom.scrollTop = 100;
		grid.getEl().dom.scrollTop = 100;
	},*/
	
	updateMassnahmenTable: function(status, statusWert, index) {
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		
		grid.getStore().getAt(this.previousSelection).data[this.statusWertDisplayField] = statusWert;//data.statusWert data.statusWertEn
		var itsecMassnahmenStatusId = grid.getStore().getAt(this.previousSelection).data.itsecMassnahmenStatusId;
		
		this.ignoreInvalidMassnahme = true;
		
		
//		grid.getStore().skipDataChanged = true;
//		grid.getStore().clearGrouping();
		grid.getStore().groupBy(this.statusWertDisplayField, true);//'statusWert'  multisort in Z. 24730 löst mit this.fireEvent('datachanged', this); selectionModel's beforeselect event aus 
//		grid.getView().refresh();
//		grid.getStore().skipDataChanged = false;
		
		
		if(this.isLinkCiSelect) {
			//wenn updateMassnahmenTable NICHT durch user mit cbCompliantStatus Selektion ausgelöst wurde, z.B. durch Klick auf cbLinkCiList
			//muss der neue grid index der ausgewählten massnahme gesichert werden, damit die neuen template massnahmen
			//Daten nicht unter der falschen Massnahme=rowIndex abgelegt werden!
			this.previousSelection = this.getSelectedGridIndex();
		} else {
//			var i = index ? index : this.previousSelection;
//			if(index)
//				this.previousSelection = index;
			
			if(this.editedMassnahmen[this.previousSelection]) {//this.previousSelection
				//get new index after regrouping for this.editedMassnahmen[this.previousSelection] and delete it under the old and save it under this new index
				var newIndex = grid.getStore().indexOfId(itsecMassnahmenStatusId);
				
				this.editedMassnahmen[this.previousSelection].statusId = parseInt(status);//this.previousSelection; record.data.id;
				var massnahme = this.editedMassnahmen[this.previousSelection];//this.previousSelection;
				delete this.editedMassnahmen[this.previousSelection];//this.previousSelection;
				this.editedMassnahmen[newIndex] = massnahme;
				this.previousSelection = newIndex;//this.previousSelection;
			}
		}
		

//		this.scrollToMassnahme();
		
		//siehe auch links-AIR.txt
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		grid.getView().focusRow(this.getSelectedGridIndex());
		//auskommentiert wegen: grid.getSelectionModel().getSelected() is undefined und nicht mehr nötig da beforeselect aktiv (?)
	},
	
	onSigneeSelect: function(combo, record, index) {
		var value = record.data.lastname + ', ' + record.data.firstname;
		combo.setValue(value);//setValue setRawValue anstatt setValue damit beim auslesen die cwid mit getValue verfügbar ist
		combo.cwid = record.data.cwid;//.value
		
		this.onMassnahmeChange();
		
		this.resetMassnahmeDates();
		this.checkApprovable(this.editedMassnahmen[this.previousSelection]);//combo.cwid
	},
	
//	onSigneeChange: function (combo, newValue, oldValue) {//change event
	onSigneeChange: function (combo, event) {//keyup event
		var newValue = combo.getRawValue();//getRawValue keyup event
		var oldValue = combo.startValue;
		
		if(newValue.length === 0) {
			combo.reset();
			combo.markInvalid();
//			this.editedMassnahmen[this.previousSelection].signee = newValue;
			
			this.onMassnahmeChange();
			
			this.checkApprovable(this.editedMassnahmen[this.previousSelection]);//combo.cwid
		} else {
			combo.getStore().clearFilter();
			
			var value = newValue.indexOf(',') > -1 ? newValue.substring(0, newValue.indexOf(',')) : oldValue.substring(0, oldValue.indexOf(','));
			var index = combo.getStore().findExact('lastname', value);
			var record = index > -1 ? combo.getStore().getAt(index) : combo.getStore().getById(combo.cwid);
			
//			this.onSigneeSelect(combo, record, index);
			
			if(record)
				this.onSigneeSelect(combo, record, index);
			else
				combo.reset();
		}
		
//		this.checkApprovable(combo.cwid);
		
//		Util.isComboValueValid(combo, newValue, oldValue);
	},
	
//	onSigneeChange: function (combo, newValue, oldValue) {
//		if(Util.isComboValueValid(combo, newValue, oldValue)) {
//			if(newValue.length === 0) {
//				combo.reset();
//				combo.markInvalid();
////				this.editedMassnahmen[this.previousSelection].signee = newValue;
//				
//				this.onMassnahmeChange();
//				
//				this.checkApprovable(this.editedMassnahmen[this.previousSelection]);//combo.cwid
//			} else {
//				combo.getStore().clearFilter();
//				
//				var value = newValue.indexOf(',') > -1 ? newValue.substring(0, newValue.indexOf(',')) : oldValue.substring(0, oldValue.indexOf(','));
//				var index = combo.getStore().findExact('lastname', value);
//				var record = index > -1 ? combo.getStore().getAt(index) : combo.getStore().getById(combo.cwid);
//				
//				this.onSigneeSelect(combo, record, index);
//			}
//		}
//	},
	
	
	onSigneeApprove: function(button, event) {
		var now = new Date();
		
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
		
		dfDateOfApproval.setValue(now);
		
		
		//Target Date wird genau 1 Jahr in die Zukunft gesetzt:
		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
		
		var month = now.getMonth();
		var year = now.getFullYear();
		var newDate = new Date(year + 1, month + 1, 0);//month + 1 weil datefield bei 1 anfängt
		
		dfTargetDate.setValue(newDate);
		this.onMassnahmeChange();
	},
	checkApprovable: function(massnahme) {//selectedCwid, isNotApprovable
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var bSigneeApproval = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('bSigneeApproval');
		
		var isNotApprovable = this.existsInvalidMassnahme > 0 || this.isDamagePerYearFalse(massnahme);
		
		if(!isNotApprovable && AAM.getCwid().toUpperCase() === massnahme.signee) {//newValue	selectedCwid
			bSigneeApproval.show();
		} else {
			bSigneeApproval.hide();
		}
		pRiskAnalysisAndMgmtDetail.getComponent('pSignee').doLayout();
	},
	
	updateGapRelevance: function(compliantStatusId, gapClassId, doMarkInvalid) {
//		if(!this.hasNoGapAnalysis) {//--> complianceType
			var fsGap = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap');

			var pJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification');
			pJustification.setVisible(true);
			if(doMarkInvalid)
				this.markInvalid(pJustification);
			
			
			switch(compliantStatusId) {
				case 3:
				case '3':
				case 4:
				case '4':
					if(!this.hasNoGapAnalysis) {//--> complianceType
						
						
						if(doMarkInvalid) {
							var exceptions = [ 'dfTargetDate' ];
							this.markInvalid(fsGap, exceptions);
						}
						
						fsGap.setVisible(true);
					}
					break;
				case 5:
				case '5':
					pJustification.getComponent('taJustification').reset();
					pJustification.setVisible(false);
				case 1:
				case '1':
				case 2:
				case '2':
				default:
					if(!this.hasNoGapAnalysis) {//--> complianceType
						var fsRiskAnalysisAndMgmt = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt');//.getComponent('pRiskAnalysisAndMgmtDetail');
						var pRiskAnalysisAndMgmtNonFreeText = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getComponent('pRiskAnalysisAndMgmtNonFreeText');
						var pRiskAnalysisAndMgmtFreeText = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getComponent('pRiskAnalysisAndMgmtFreeText');

						
						var massnahme = /*this.editedMassnahmen[this.getSelectedGridIndex()]  this.editedMassnahmen[this.previousSelection] ? this.editedMassnahmen[this.previousSelection] :*/ this.loadedMassnahme;
						this.deleteGapValues(massnahme, compliantStatusId);
						this.deleteRiskAnalysisAndMgmtValues(massnahme, '-1');
						
						this.clearPanelItemValues(fsGap);
						this.clearPanelItemValues(pRiskAnalysisAndMgmtNonFreeText);
						this.clearPanelItemValues(pRiskAnalysisAndMgmtFreeText);
						this.clearPanelItemValues(fsRiskAnalysisAndMgmt);
						
						fsGap.setVisible(false);
						
						if(doMarkInvalid)
							this.markInvalid(pJustification);
					}
					break;
			}
			
//			var isGapRelevant = this.isGapRelevant(compliantStatusId);
//			this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').setVisible(isGapRelevant);
			
			if(Ext.isIE)
				this.getComponent('pLayout').getComponent('pMassnahmeDetails').doLayout();//true, true
//		}
		
//		if(gapClassId.length == 0)
//			gapClassId = '-1';
		
		
		this.updateRiskAnalysisAndMgmt(gapClassId, compliantStatusId);
	},
	
	isGapRelevant: function(compliantStatusId) {
		return compliantStatusId == '3' || compliantStatusId == '4';//business rule
	},
	
	onMassnahmeSelected: function(grid, rowIndex, event) {
		/*if(this.existsInvalidMassnahme > 0) {
			this.onBeforeMassnahmeSelect();
			return;
		}*/
		
		//funktioniert nur mit warnung Fenstern solange, die Warnung nicht bei einem focusLost/blur event kommen muss. Beipsiel: isDamagePerYearFalse
		//funktioniert nicht bei isTargetDateValid, die valid ergeben weil warnung Fenster bei einem focusLost/blur event 
		if(this.warningMassnahmen.length > 0) {
			this.onMassnahmenWarning(this.warningMassnahmen);
			this.skipFocusLost = false;
		}
		
		this.selectMassnahme(grid, rowIndex);
		
//		this.validateMassnahmen();
	},
	
	selectMassnahme: function(grid, rowIndex, massnahmeId) {
//		Util.log('selectMassnahme1 rowIndex='+rowIndex);

		if(this.previousSelection === rowIndex && !massnahmeId)//this.existsInvalidMassnahme === 0 !this.existsInvalidMassnahme > 0
			return;
		
		//save previously edited massnahmenDetails (clientseitig, noch nicht serverseitig),
		//wenn rechts bei fsComplianceStatement etwas geändert wurde
		if(this.massnahmeChanged && this.previousSelection > -1 && this.existsInvalidMassnahme === 0) {//!this.existsInvalidMassnahme > 0
			this.massnahmeChanged = false;
			this.saveMassnahme(this.previousSelection);
		}
		
		//nur dann neu laden, wenn die Massnahme noch nicht bearbeitet wurde. Wird eine Massnahme bearbeitet, dann eine andere und dann
		//wieder die vorherige soll NICHT neu geladen werden, damit die gemachten Änderungen nicht durch das Laden verloren gehen 
		var massnahme = this.editedMassnahmen[rowIndex];
		var isMassnahmeAlreadyEdited = massnahme ? true : false;
		
		if(isMassnahmeAlreadyEdited) {
			this.updateComplianceDetails(massnahme);//massnahme.statusId, massnahme.statusKommentar
		} else {
			var id = massnahmeId ? massnahmeId : grid.getStore().getAt(rowIndex).data.itsecMassnahmenStatusId;
			this.loadMassnahme(id, this.config.complianceType);
		}
		
		this.previousSelection = rowIndex;
	},
	
	loadMassnahme: function(itsecMassnahmenStatusId, itsecGruppenId) {
//		Util.log('loadMassnahme itsecMassnahmenStatusId='+itsecMassnahmenStatusId);
		
		var params = {
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
			itsecMassnahmenStatusId: itsecMassnahmenStatusId,
			itsecGruppenId: itsecGruppenId//this.CI_GROUP_ID_DEFAULT_ITSEC
		};
		
		this.massnahmeDetailStore.load({
			params: params
		});
	},
	
//	getIdByCompliantStatus: function(store, compliantStatus) {
//		for(var i = 0; i < store.data.items.length; i++)
//			if(store.data.items[i].data.compliantStatusText == compliantStatus)
//				return parseInt(store.data.items[i].data.compliantStatusId);
//		
//		return null;
//	},
	
	onSave: function(button, event) {
		this.onApply();
		this.close();
		//clear currencyListStore filter here instead of initComponent?
	},
	
	
	/**
	 * previousSelection:
	 * den letzten selektierten oder den ersten nicht selektierten Eintrag (Tabellen ComplianceControl Element) speichern.
	 * Das Zwischenspeichern der Maske auf der rechten Seite zu dem selektierten Eintrag auf der linken Seite erfolgt
	 * nachdem ein neuer Eintrag auf der linken Seite selektiert wurde.
	 */
	onApply: function(button, event) {
		if(!this.previousSelection)
			this.previousSelection = 0;

		
		if(this.massnahmeChanged) {
			this.massnahmeChanged = false;
			
			this.saveMassnahme(this.previousSelection);
		}
		
		var linkedCiType = this.editedMassnahmen[this.previousSelection].refTableID;
		var linkedCi = this.editedMassnahmen[this.previousSelection].refPKID;
		if(linkedCiType == -1 || linkedCi == -1) {
			var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');//.setVisible(true);
			var cbLinkCiType = complianceLinkView.getComponent('cbLinkCiType');
			cbLinkCiType.reset();
			this.enableMassnahmeDetails();
		}
			

		
		//nur das Array zum (Server) Speichern übergeben
		var massnahmen = [];
		for(var key in this.editedMassnahmen) {
			massnahmen[massnahmen.length] = this.editedMassnahmen[key];
			delete this.editedMassnahmen[key];
		}
		
//		var bComplianceControlsSave = this.getFooterToolbar().items.map.bComplianceControlsSave;
//		var bComplianceControlsApply = this.getFooterToolbar().items.map.bComplianceControlsApply;
		
//		bComplianceControlsSave.disable();
//		bComplianceControlsApply.disable();
		this.deactivateButtons();
		
		
		this.fireEvent('massnahmeSaved', this, massnahmen);//this.editedMassnahmen
//		this.editedMassnahmen.splice(0, this.editedMassnahmen.length);
	},
	
	onCancel: function(button, event) {
		if(this.massnahmeChanged) {
			this.massnahmeChanged = false;
			
			this.saveMassnahme(this.previousSelection);
		}
		
		var verwerfenCallback = function() {
			delete this.editedMassnahmen;
			
			this.close();
			//clear currencyListStore filter here instead of initComponent?
		}.createDelegate(this);
		
		
		if(this.hasEditedMassnahmen(this.editedMassnahmen)) {//if(this.hasEditedMassnahmen(this.editedMassnahmen)) this.massnahmeChanged
			var callbackMap = {
				verwerfen: verwerfenCallback,
				speichern: this.onSave.createDelegate(this)
			};
			
			var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_CHANGED', callbackMap);
			
			if(this.existsInvalidMassnahme) {
				var tbFooter = dynamicWindow.getFooterToolbar();
				var bSave = tbFooter.items.items[0];
				bSave.disable();
			}
			
			dynamicWindow.show();
			return;
		}
		
//		this.editedMassnahmen.splice(0, this.editedMassnahmen.length);
		verwerfenCallback();
	},
	
	hasEditedMassnahmen: function(o) {
	    for(var key in o)
	        if(o.hasOwnProperty(key))
	            return true;

	    return false;
	},
	
	
	onMassnahmenDetailLoaded: function(store, records, options) {
		if(!this.windowRendered) {
			if(!this.hasNoGapAnalysis) {
				var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');
				complianceLinkView.update(this.config);
				complianceLinkView.setVisible(true);
			}
//			this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView').setVisible(true);
			
			
			
			var fsComplianceStatement = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement');
			fsComplianceStatement.setVisible(true);
			
//			if(!this.hasNoGapAnalysis)
//				this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').setVisible(true);
			
			this.update();
			this.updateLabels(AIR.AirApplicationManager.getLabels());
			
			this.getComponent('pLayout').doLayout();
			this.windowRendered = true;
		}

		
//		var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');
//		complianceLinkView.update(this.config);
		
		
		
//		if(!this.existsInvalidMassnahme || this.existsInvalidMassnahme === 0)// this.existsInvalidMassnahme  && !this.previousLoadedMassnahme
//			this.previousLoadedMassnahme = records[0].data;
		
		this.updateComplianceDetails(records[0].data);
	},
	
	
	onMassnahmeChange: function(options) {//source, event
		this.massnahmeChanged = true;
		this.activateButtons();
		
		if(!options || !options.skipLinkCiValidation)
			this.validateMassnahmen(options);
	},
	
	
	//ORDER: alle validierten Werte/Felder aller this.editedMassnahmen validieren. 
	//Hier this.editedMassnahmen[i].mitigationPotential und Datumsfelder/-werte this.editedMassnahmen[i].dateOfApproval,targetDate
	//Zusatz: eine Statusbar mit Meldung welche editierten Massnahmen fehlerhafte Werte enthalten, z.B. Ident: Masnhamen 06.004, 11.651 enthalten Fehler
	validateMassnahmen: function(options) {
		//gerade gmachte Änderungen der aktuell ausgewählten Massnahme nach der letzen und vor der nächsten Massnahmenauswahl sichern
		this.saveMassnahme(this.getSelectedGridIndex());
		
//		this.existsInvalidMassnahme = true;
		var invalidMassnahmen = [],
			warningMassnahmen = [];
		
		for(var key in this.editedMassnahmen) {
			var massnahme = this.editedMassnahmen[key];
			
			//wenn massnahme verlinkt ist keine Validierungsprüfungen, damit gespeichert werden kann
			if(massnahme.refTableID > -1 || massnahme.refTableID.length > 0)
				continue;
			
			if(massnahme.statusId != 5 && massnahme.statusKommentar.length === 0) {
				massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE;
				this.addInvalidMassnahme(invalidMassnahmen, massnahme);
				continue;
			}
			
			if(this.hasNoGapAnalysis)
				continue;
			
			if(massnahme.statusId === 3 || massnahme.statusId === 4) {
				if(massnahme.gap.length === 0 || massnahme.gapResponsible.length === 0 || massnahme.gapMeasure.length === 0 || 
				   massnahme.gapPriority.length === 0) {// || massnahme.gapEndDate === -1
					massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE;
					this.addInvalidMassnahme(invalidMassnahmen, massnahme);
					continue;
				}
				

				//wenn massnahme.gapEndDate > -1 (d.h. gapEndDate nicht zurückgesetzt und immer wenn gapClass NICHT 4 oder 5, muss das targetDate geprüft werden)
				var toBeChecked = (!options || !options.skipTargetDate) && massnahme.gapEndDate > -1;
				//oder umgekehrt: option für die targetDate gecheckt werden muss: wenn manuell dfTargetDate geändert
				
				if(toBeChecked) {
//					var isValid = this.isTargetDateValid(new Date(parseInt(massnahme.gapEndDate)), true);
					var result = this.isTargetDateValid(new Date(parseInt(massnahme.gapEndDate)));
					
					if(result.isValid) {//isValid
						if(result.isWarning && !this.isWarningMassnahmenDone) {//damit keine Warnung kommt, wenn etwas anderes als das targetDate geändert wurde
							massnahme.warningId = AC.ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1;
							this.addWarningMassnahme(warningMassnahmen, massnahme);
						}
					} else {
						massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1;
						this.addInvalidMassnahme(invalidMassnahmen, massnahme);
						continue;
					}
				}
				
				if(massnahme.gapPriority == '4' || massnahme.gapPriority == '5') {
//					var chbRiskAnalysisType = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType');
					var isChecked = massnahme.riskAnalysisAsFreetext == '-1' ? true : false;//chbRiskAnalysisType.getValue();
					
					if(!isChecked) {
						if(massnahme.probOccurence.length === 0 || massnahme.damage.length === 0 || massnahme.currency.length === 0 || 
						   massnahme.mitigationPotential.length === 0 || massnahme.signee.length === 0) {
							massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE;
							this.addInvalidMassnahme(invalidMassnahmen, massnahme);
							continue;
						}
						
						if(massnahme.gapPriority == '5') {
							if(massnahme.expense.length === 0) {
								massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE;
								this.addInvalidMassnahme(invalidMassnahmen, massnahme);
								continue;	
							}
							
							if(this.isDamagePerYearFalse(massnahme) && !this.isWarningMassnahmenDone) {
//								massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_DAMAGE_PER_YEAR;
//								this.addInvalidMassnahme(invalidMassnahmen, massnahme);

								massnahme.warningId = AC.ITSEC_MASSN_INVALIDITY_TYPE_DAMAGE_PER_YEAR;
								this.addWarningMassnahme(warningMassnahmen, massnahme);
								
								continue;
							}
						}
					} else {
						if(massnahme.probOccurenceText.length === 0 || massnahme.damageText.length === 0 ||
						   massnahme.mitigationPotentialText.length === 0 || massnahme.signee.length === 0) {
							massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE;
							this.addInvalidMassnahme(invalidMassnahmen, massnahme);
							continue;
						}
						
						if(massnahme.gapPriority == '5') {
							if(massnahme.expenseText.length === 0) {
								massnahme.invalidityId = AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE;
								this.addInvalidMassnahme(invalidMassnahmen, massnahme);
								continue;
							}
						}
					}
				}
			}
			
			/*
			var mp = this.editedMassnahmen[key].mitigationPotential;
			
			if(mp && mp >= 10) {//globales validators = { mitigationPotential: validateMitigationPotential } Object. mit feld: function
				var ident = grid.getStore().getById(this.editedMassnahmen[key].itsecMassnahmenStatusId).data.ident;
				invalidMassnahmen.push(ident);
			}*/
		}
		

		var sInvalidMassnahmen = '';
		
		if(invalidMassnahmen.length > 0) {
			this.deactivateButtons();
						
			
			for(var i = 0; i < invalidMassnahmen.length; i++) {
				if(sInvalidMassnahmen.length > 0)
					sInvalidMassnahmen += ', ';
				sInvalidMassnahmen += invalidMassnahmen[i];
			}
		} else {
			delete massnahme.invalidityId;
		}
		
		this.updateToolbar(sInvalidMassnahmen);
		
		this.existsInvalidMassnahme = invalidMassnahmen.length;//invalidMassnahmen.length + 1; > 0;
		
		
//		if(warningMassnahmen.length > 0)
//		this.fireEvent('massnahmenWarning', warningMassnahmen);
		this.warningMassnahmen = warningMassnahmen;
	},
	
	/**
	 * Anders als ursprünglich implementiert, soll nicht jede ungültige=unvollständige Massnahme ZWISCHENgespeichert 
	 * werden um beliebig weiterarbeiten und später korrigieren zu können, sondern der User sofort gewarnt werden 
	 * die Massnahme entweder zu vervollständigen oder alle Änderungen zu verwerfen!
	 * 
	 * Hier sind zwei vom Ansatz her zwei Möglichkeiten vorhanden dieses Ergebnis zu erreichen.
	 * 1. V O R  der Auswahl der neuen Massnahme (Klick auf eine Zeile in der Massnahmentabelle) die Prüfung 
	 * und das Warnungsfenster öffnen 
	 * (mit grid.getSelectionModel().on('beforerowselect', this.onBeforeMassnahmeSelect, this))
	 * Vorteil: der saubere, gewünschte Weg
	 * Nachteil: das Fenster wird aus unbekanntem Grund hinter/unter dem Compliance Details Hauptfenster geöffnet
	 * 			 und ist somit unsichtbar/unbedienbar
	 * 
	 * 2. N A C H  der Auswahl der neuen Massnahme. onBeforeMassnahmeSelect() wird direkt von onMassnahmeSelected()
	 * und nicht durch das event aus Möglichkeit 1 aufgerufen, wenn ungültige Massnahmen existieren, d.h.
	 * existsInvalidMassnahme=true.
	 * Vorteil: umgeht den Nachteil aus Möglichkeit 1
	 * Nachteil: weniger konsequente Implementierung
	 */
	onBeforeMassnahmeSelect: function(selModel, rowIndex, keepExisting, record) {
		//warningMassnahmen Fesnter die nur einmal kommen sollen. 
		//Sowohl auf der Massnahme Detail Seite als auch auf der Massnahmen Tabellen Seite
		if(this.warningMassnahmen.length > 0)//geht nur, wenn beforeselect event VOR dem blur event des dfTargetDate gefeuert wird!
			this.skipFocusLost = true;

		
		if(this.existsInvalidMassnahme > 0 && !this.ignoreInvalidMassnahme) {
			var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
			
			var massnahme = this.editedMassnahmen[this.previousSelection];
			
			if(massnahme.invalidityId !== AC.ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1)
				this.openInvalidMassnahmeWindow(grid.getEl());
			
			return false;
		} else {
			this.ignoreInvalidMassnahme = false;
			
			return true;
		}
	},
	
	openInvalidMassnahmeWindow: function() {
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');

		/*var cancelCallback = function() {
			this.updateToolbar('');
			var rowIndex = this.getSelectedGridIndex();

			var previousMassnahmeId = this.editedMassnahmen[this.previousSelection].itsecMassnahmenStatusId;
			delete this.editedMassnahmen[this.previousSelection];
			
			//vorherige falsche Massnahme mit Hilfe der itsecMassnahmenStatusId neu laden
			this.selectMassnahme(grid, this.previousSelection, previousMassnahmeId);//den alten falschen/unvollständigen neu laden
//			this.selectMassnahme(grid, this.previousSelection, this.previousLoadedMassnahme.itsecMassnahmenStatusId);//den alten falschen/unvollständigen neu laden
			
			//es muss wohl sichergestellt werden, dass dieser this.selectMassnahme Aufruf per event/callback sicher NACH
			//dem ersten erst statffindet, da es komplett absurden Situationen kommt, wenn sich updateComplianceDetails
			//Aufrufe die nach den Ladeergebnissen kommen, überlappen.
//			this.selectMassnahme(grid, rowIndex);//dann den neu ausgewählten neu laden
		};*/
		
		var okCallback = function() {
//			this.existsInvalidMassnahme = 0;//0 -1
			
//			if(this.editedMassnahmen[this.previousSelection].invalidityId === AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE)
//				grid.getSelectionModel().selectRow(this.previousSelection);//wenn beforeselect von selModel NICHT verwendet wird, muss zurückgesetzt werden
		};
		
		var callbackMap/* = {
//			cancel: cancelCallback.createDelegate(this),
			ok: okCallback.createDelegate(this)
		}*/;
		
		var labels = AIR.AirApplicationManager.getLabels();
		
		var title, message;
		
		switch(this.editedMassnahmen[this.previousSelection].invalidityId) {//massnahme
			case AC.ITSEC_MASSN_INVALIDITY_TYPE_INCOMPLETE:
				title = labels.invalidMassnameWindowTitleIncomplete;
				message = labels.invalidMassnameWindowIncomplete;
				break;
				
			case AC.ITSEC_MASSN_INVALIDITY_TYPE_DAMAGE_PER_YEAR:
				title = labels.invalidMassnameWindowTitleDamagePerYear;
				message = labels.invalidMassnameWindowDamagePerYear;
				break;
				
//			case AC.ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1:
//				message = 'ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1';//labels.invalidMassnameDamagePerYear;
//				break;
			default: break;
		}
		
		var invalidMassnahmeWindow = AIR.AirWindowFactory.createDynamicMessageWindow('INVALID_MASSNAHME', callbackMap, message, title);
		invalidMassnahmeWindow.show(this.getEl());
	},
	
	getSelectedGridIndex: function() {
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
//		var rowIndex = grid.getStore().indexOfId(grid.getSelectionModel().getSelected().get('itsecMassnahmenStatusId'));
		
		//a)
		var r = this.getSelectedGridRecord();
		var rowIndex = r ? grid.getStore().indexOfId(r.get('itsecMassnahmenStatusId')) : this.previousSelection;
		
		//b)
//		var rowIndex,
//			r = this.getSelectedGridRecord();
//		
//		if(r) {
//			rowIndex = grid.getStore().indexOfId(r.get('itsecMassnahmenStatusId'));
//		} else {
//			rowIndex = this.previousSelection;
//			grid.getView().focusRow(rowIndex);
//		}
		
		
		return rowIndex;
	},
	getSelectedGridRecord: function() {
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		var r = grid.getSelectionModel().getSelected();
		
		return r;
	},
	
	addInvalidMassnahme: function(invalidMassnahmen, massnahme) {
//		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
//		var ident = grid.getStore().getById(massnahme.itsecMassnahmenStatusId).data.ident;
		var ident = this.getMassnahmeHeaderValueByAttr(massnahme, 'ident');
		invalidMassnahmen.push(ident);
	},
	
	addWarningMassnahme: function(warningMassnahmen, massnahme) {
//		var ident = this.getMassnahmeHeaderValueByAttr(massnahme, 'ident');
		warningMassnahmen.push(massnahme);//ident
	},
	
	
	
	/**
	 * es muss unterschieden werden was die Quelle der massnahme ist:
	 * - eine neu gelandene Massnahme (Details) durch Klick auf Massnahmentabelle
	 * - eine bereits gelandene Massnahme (Details) durch Klick auf Massnahmentabelle
	 * - eine durch Verlinkung neu geladene Massnahme
	 * 
	 * Letzterer Fall muss gesondert behandelt werden, da die itsecMassnahmenStatusId der
	 * verlinkten Massnahme nicht in der Massnahmen Tabelle existiert.
	 */
	getMassnahmeHeaderValueByAttr: function(massnahme, attr) {
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		
		var r = grid.getStore().getById(massnahme.itsecMassnahmenStatusId);
		
		//wenn Massnahme verlinkt ist, ist die itsecMassnahmenStatusId natürlich nicht im gridStore vorhanden, daher:
		if(!r)
			r = this.getSelectedGridRecord();
		
		var attrValue = r.data[attr];
		return attrValue;
	},
	
	
	saveMassnahme: function(rowIndex) {
		var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');//.setVisible(true);
		var cbLinkCiType = complianceLinkView.getComponent('cbLinkCiType');
		var cbLinkCiList = complianceLinkView.getComponent('cbLinkCiList');
		
		var cbCompliantStatus = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification').getComponent('taJustification');
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		
		var linkCiSubType;
		var linkCiType;
		var linkCi;
		
//		if(cbLinkCiType.getValue().length > 0) {//ORIG
		if(cbLinkCiType.getValue().length > 0 && cbLinkCiList.getValue().length > 0) {
			var r = cbLinkCiType.getStore().getAt(cbLinkCiType.getStore().findExact('id', cbLinkCiType.getValue()));
			
			var tableId = r.get('tableId');
			if(tableId == AC.TABLE_ID_APPLICATION)//oder generische Hilfsfunktion für theoretisch andere CI Typen mit Subtypen
				linkCiSubType = r.get('id');
				
			linkCiType = tableId;// cbLinkCiType.getValue();//getValue getRawValue
			linkCi = cbLinkCiList.getValue();
		} else {
//			if(options && options.isLinkDelete) {
				linkCiType = -1;
				linkCi = -1;
//			}
		}
		
		var itsecMassnahmenStatusId = grid.getStore().getAt(this.previousSelection).data.itsecMassnahmenStatusId;
		var massnahmeGstoolId = grid.getStore().getAt(this.previousSelection).data.massnahmeGstoolId;
		var compliantStatusId = parseInt(cbCompliantStatus.getValue());
		var justification = taJustification.getValue();

		
		this.editedMassnahmen[rowIndex] = {
//			refTableID: linkCiType,
//			refPKID: linkCi,
				
			itsecMassnahmenStatusId: itsecMassnahmenStatusId,
			massnahmeGstoolId: massnahmeGstoolId,
			statusId: compliantStatusId,
			statusKommentar: justification
		};
		
		if(linkCiType) {
			this.editedMassnahmen[rowIndex].refTableID = linkCiType;
			this.editedMassnahmen[rowIndex].refPKID = linkCi;
			
			if(linkCiSubType)
				this.editedMassnahmen[rowIndex].refCiSubTypeId = linkCiSubType;
		}
		
		if(!this.hasNoGapAnalysis && (compliantStatusId === 3 || compliantStatusId === 4)) {
			var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
			this.editedMassnahmen[rowIndex].gap = taGapDescription.getValue();
			
			
			var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
			var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
			var tfGapResponsibleHidden = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsibleHidden');
			var taPlanOfAction = fsGapElimination.getComponent('pPlanOfAction').getComponent('taPlanOfAction');
			var cbGapClass = fsGapElimination.getComponent('pGapClass').getComponent('cbGapClass');
			var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
			var gapClassId = cbGapClass.getValue();
			
			this.editedMassnahmen[rowIndex].gapResponsible = tfGapResponsible.getValue();
			this.editedMassnahmen[rowIndex].gapResponsibleHidden = tfGapResponsibleHidden.getValue();
			this.editedMassnahmen[rowIndex].gapMeasure = taPlanOfAction.getValue();
			this.editedMassnahmen[rowIndex].gapPriority = cbGapClass.getValue();
			this.editedMassnahmen[rowIndex].gapEndDate = dfTargetDate.getValue() && dfTargetDate.getValue() instanceof Date ? dfTargetDate.getValue().getTime() : -1;//dfTargetDate.getValue().length > 0  -1 für SoapProxy, bei null statt -1 kommt JS Fehler
			
			if(gapClassId == '4' || gapClassId == '5') {
				var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
				var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');
				
				var chbRiskAnalysisType = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType');
				
				var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
				var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
				var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
				var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
				var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').getComponent('tfDamagePerYear');
				
				
				this.editedMassnahmen[rowIndex].riskAnalysisAsFreetext = chbRiskAnalysisType.getValue() ? -1 : 0;
				
				this.editedMassnahmen[rowIndex].probOccurence = tfOccurenceOfDamagePerYear.getValue();
				this.editedMassnahmen[rowIndex].damage = tfMaxDamagePerEvent.getValue();
				
//				var currency = cbMaxDamagePerEventCurrency.getStore().getById(cbMaxDamagePerEventCurrency.getValue()).data.currencyName;//ergibt undefined				
				var currency = cbMaxDamagePerEventCurrency.getValue();
				var currencySymbol = currency.length == 0 ? currency : cbMaxDamagePerEventCurrency.getStore().getById(currency).data.symbol;//symbol currencySymbol '';// findExact('currencySymbol', currency).data.currencySymbol;
//				Util.log('saving '+cbMaxDamagePerEventCurrency.getValue()+'='+cbMaxDamagePerEventCurrency.getStore().getById(currency).data.currencySymbol);
				this.editedMassnahmen[rowIndex].currency = currencySymbol;//'';//currency;//weder currencyId/currencyName können gesichert werden. cbMaxDamagePerEventCurrency.getValue(); --> 1,2,3: ORA-20000: Invalid currency,ORA-06512: at "TBADM.TRG_045_BIU", line 109,ORA-04088: error during execution of trigger 'TBADM.TRG_045_BIU'


				var m = tfMitigationPotential.getValue();
				var v;
				if(m.length > 0) {
					if(parseFloat(m) >= 1) {
						v = parseFloat(m) / 100;
						v = v.toString();
					} else {
						v = m;
					}
				} else {
					v = '';
				}
				this.editedMassnahmen[rowIndex].mitigationPotential = v;
				
//				this.editedMassnahmen[rowIndex].mitigationPotential = tfMitigationPotential.getValue().length > 0 ? tfMitigationPotential.getValue() : '';//parseInt(tfMitigationPotential.getValue())
				
				
				
				var pRiskAnalysisAndMgmtFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtFreeText');
				var taOccurenceOfDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pOccurenceOfDamagePerYear2').getComponent('taOccurenceOfDamagePerYear2');
				var taMaxDamagePerEvent2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMaxDamagePerEvent2').getComponent('taMaxDamagePerEvent2');
				var taMitigationPotential2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMitigationPotential2').getComponent('taMitigationPotential2');
				var taDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2');
				
				this.editedMassnahmen[rowIndex].probOccurenceText = taOccurenceOfDamagePerYear2.getValue();
				this.editedMassnahmen[rowIndex].damageText = taMaxDamagePerEvent2.getValue();
				this.editedMassnahmen[rowIndex].mitigationPotentialText = taMitigationPotential2.getValue();
				
//				if(gapClassId == '5') {
					this.editedMassnahmen[rowIndex].expense = tfDamagePerYear.getValue();
					this.editedMassnahmen[rowIndex].expenseText = taDamagePerYear2.getValue();
//				}
				
				var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
//				var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
				var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('cbSignee');
				var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
				
//				this.editedMassnahmen[rowIndex].signee = tfSignee.getValue();
				this.editedMassnahmen[rowIndex].signee = cbSignee.getValue().length == 0 ? cbSignee.getValue() : this.getSigneeCwid(cbSignee);//cbSignee.cwid;//cbSignee.getValue();
				this.editedMassnahmen[rowIndex].gapClassApproved = dfDateOfApproval.getValue() ? dfDateOfApproval.getValue().getTime() : -1;//-1 für SoapProxy, bei null statt -1 kommt JS Fehler
				
			}
		}
	},
	
	//massnahme kann entweder die gerade aus der Tabelle ausgewählte sein oder die durch die combobox Link - CI ausgewählte.
	//Im letzteren Fall dürfen die cbLinkCiType und cbLinkCiList nicht aktualisiert werden, da diese ja neu gesetzt wurden
	//und sonst der alte Wert fälschlicherweise wieder zurückgesetzt wird! Dies ist dann der Fall wenn this.isLinkCiSelect=true.
	updateComplianceDetails: function(massnahme) {
		if(!this.isLinkCiSelect)
			this.loadedMassnahme = massnahme;

		if(!this.hasNoGapAnalysis) {
			var cbgIcsRelevances = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView').getComponent('cbgComplianceLinkTypeRelevance');
			var icsRelevances = [ massnahme.secuRelevance == '-1', massnahme.accsRelevance == '-1', massnahme.itopRelevance == '-1', massnahme.chmgRelevance == '-1' ];
			cbgIcsRelevances.setValue(icsRelevances);
			
			var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');//.setVisible(true);
			var cbLinkCiType = complianceLinkView.getComponent('cbLinkCiType');
			var cbLinkCiList = complianceLinkView.getComponent('cbLinkCiList');
			
			this.config.massnahmeGstoolId = massnahme.massnahmeGstoolId;
	
			if(!this.isLinkCiSelect) {
				var isMassnahmeLinked = this.isMassnahmeLinked(massnahme);
				
				if(isMassnahmeLinked) {
					var ciType;
					
					//oder mit einer Funktion, wenn es neben CI Typ Anwendung mehrere CI Typen mit Subtypen gibt: this.isComplexCiType(massnahme.refTableID)
					if(massnahme.refTableID == AC.TABLE_ID_APPLICATION) {
						ciType = massnahme.refCiSubTypeId;
					} else {
						var ciTypeStore = cbLinkCiType.getStore();
						var r = ciTypeStore.getAt(ciTypeStore.findExact('tableId', massnahme.refTableID));
						ciType = r.get('id');
					}
	//				var ciType = massnahme.refTableID == AC.TABLE_ID_APPLICATION ? massnahme.refCiSubTypeId : massnahme.refTableID;
					
					cbLinkCiType.setValue(ciType);//ciType massnahme.refCiSubTypeId
		
					
					var callback = function() {
						cbLinkCiList.setValue(massnahme.refPKID);
					};
					//override combo.setValue() or combo's internal load listener to choose wether to fire the select event or not
					//to avoid undesired expanding of the combos's inner list after the link CI was changed?
					complianceLinkView.loadLinkCiList(ciType, callback);
					
					this.disableMassnahmeDetails(this.config.hasEditRights);
				} else {
		//			cbLinkCiType.reset();
		//			cbLinkCiList.reset();
					cbLinkCiType.setValue('');
					cbLinkCiList.setValue('');
					cbLinkCiList.getStore().removeAll();
					
					if(this.config.hasEditRights)
						this.enableMassnahmeDetails();//(*2) Release Defaultdeaktivierung
				}
			}
		}
			
		
		var fsComplianceStatement = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement');
		var cbCompliantStatus = fsComplianceStatement.getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = fsComplianceStatement.getComponent('pJustification').getComponent('taJustification');

		cbCompliantStatus.setValue(massnahme.statusId);//compliantStatus
		taJustification.setValue(massnahme.statusKommentar);//justification
		
		
		if(this.isLinkCiSelect || this.existsInvalidMassnahme > 0) {// || this.getSelectedGridRecord().get('itsecMassnahmenStatusId') != massnahme.statusId wenn massnahme.statusId !=  der compliant statusId aus der Tabelle
			//zur Unterscheidung ob der Status der vorherigen falschen/unvollständigen Massnahme erst dieses flag
			//false setzen, wenn der letzte Schritt erledigt ist und nicht schon in der Ursprungs callback 
			//cancelCallback von openInvalidMassnahmeWindow
//			this.existsInvalidMassnahme = false;
//			--this.existsInvalidMassnahme;
			
//			var isStatusChanged = this.getSelectedGridRecord().get('itsecMassnahmenStatusId') != massnahme.statusId;
//			var index = 

//			if(this.previousLoadedMassnahme) {
//				this.updateMassnahmenTable(this.previousLoadedMassnahme.statusId, cbCompliantStatus.getStore().getById(massnahme.statusId).get('statusWert'));
//				delete this.previousLoadedMassnahme;
//			} else {
				this.updateMassnahmenTable(massnahme.statusId, cbCompliantStatus.getStore().getById(massnahme.statusId).get(this.statusWertDisplayField));//fire compliantStatus change/select event
//			}
		}
		
		if(!this.hasNoGapAnalysis) {
			var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
			taGapDescription.setValue(massnahme.gap);
						
			//folgendes nur wenn massnahme.statusId no/nein oder partly/tweilweise (?, Ja!). Sonst panel wieder deaktivieren
			var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
			var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
			var tfGapResponsibleHidden = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsibleHidden');
			var taPlanOfAction = fsGapElimination.getComponent('pPlanOfAction').getComponent('taPlanOfAction');
			var cbGapClass = fsGapElimination.getComponent('pGapClass').getComponent('cbGapClass');
			var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
			
			tfGapResponsible.setValue(massnahme.gapResponsible);
			tfGapResponsibleHidden.setValue(massnahme.gapResponsibleHidden);
			taPlanOfAction.setValue(massnahme.gapMeasure);
			if(massnahme.gapPriority != 0 || massnahme.gapPriority.length == 0) {//massnahme.gapPriority != '0' && 
				cbGapClass.setValue(massnahme.gapPriority);
			} else {
				cbGapClass.reset();
			}
			
			var date = parseInt(massnahme.gapEndDate);
			if(date > 0)
				dfTargetDate.setValue(new Date(date));//Util.setDateFieldValue(dfTargetDate, new Date(date));
			else dfTargetDate.reset();
			
			var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
			var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');
			
			var chbRiskAnalysisType = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType');
			var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
			var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
			var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
			var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
			var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').getComponent('tfDamagePerYear');
			
			var pRiskAnalysisAndMgmtFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtFreeText');
			var taOccurenceOfDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pOccurenceOfDamagePerYear2').getComponent('taOccurenceOfDamagePerYear2');
			var taMaxDamagePerEvent2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMaxDamagePerEvent2').getComponent('taMaxDamagePerEvent2');
			var taMitigationPotential2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMitigationPotential2').getComponent('taMitigationPotential2');
			var taDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2');
			
			var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
			var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('cbSignee');
//			var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
			var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
			
			
			var gapClassId = cbGapClass.getValue();
			if(gapClassId == '4' || gapClassId == '5') {
//				chbRiskAnalysisType.setValue(massnahme.riskAnalysisAsFreetext && massnahme.riskAnalysisAsFreetext == '-1' ? true : false);
				chbRiskAnalysisType.el.dom.checked = massnahme.riskAnalysisAsFreetext && massnahme.riskAnalysisAsFreetext == '-1' ? true : false;
				chbRiskAnalysisType.checked = chbRiskAnalysisType.el.dom.checked;
				
				if(chbRiskAnalysisType.el.dom.checked) {
					pRiskAnalysisAndMgmtDetail.getComponent('pRiskAnalysisAndMgmtCard').getLayout().setActiveItem('pRiskAnalysisAndMgmtFreeText');
				} else {
					pRiskAnalysisAndMgmtDetail.getComponent('pRiskAnalysisAndMgmtCard').getLayout().setActiveItem('pRiskAnalysisAndMgmtNonFreeText');
				}
				
				
				tfOccurenceOfDamagePerYear.setValue(massnahme.probOccurence);
				tfMaxDamagePerEvent.setValue(massnahme.damage);
				
				if(massnahme.currency && massnahme.currency.length > 0) {
//					//wenn store = createCurrencyStore()
//					var currencyId = Util.findStoreKeyValueByAttributeValue(cbMaxDamagePerEventCurrency.getStore(), 'currencySymbol', massnahme.currency, 'currencyId');
//					cbMaxDamagePerEventCurrency.setValue(currencyId);
					
					//wenn store = createCurrencyListStore()
					var currencyId = Util.findStoreKeyValueByAttributeValue(cbMaxDamagePerEventCurrency.getStore(), 'symbol', massnahme.currency, 'id');//symbol id
					cbMaxDamagePerEventCurrency.setValue(currencyId);
				} else {
					cbMaxDamagePerEventCurrency.reset();
				}
				
				//z.B. wenn 0,00001 aus der DB kommt was als 1.0E-4 geladen wird.
				var n = parseInt(massnahme.mitigationPotential);
				if(n > 0 && n < 0.01)
					massnahme.mitigationPotential = '0';
				
				tfMitigationPotential.setValue(parseFloat(massnahme.mitigationPotential) * 100);//massnahme.mitigationPotential
//				tfDamagePerYear.setValue(massnahme.expense);
				
				taOccurenceOfDamagePerYear2.setValue(massnahme.probOccurenceText);
				taMaxDamagePerEvent2.setValue(massnahme.damageText);
				taMitigationPotential2.setValue(massnahme.mitigationPotentialText);
//				taDamagePerYear2.setValue(massnahme.expenseText);
				
				var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
				var bSigneeApproval = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('bSigneeApproval');
				bSigneeApproval.hide();
				

				if(gapClassId == '5') {//economically not solvable
//					tfDamagePerYear.setVisible(true);
					pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').setVisible(true);
					tfDamagePerYear.setValue(massnahme.expense);
					
//					taDamagePerYear2.setVisible(true);
					pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').setVisible(true);
					taDamagePerYear2.setValue(massnahme.expenseText);
					
					pRiskAnalysisAndMgmtNonFreeText.doLayout();
					pRiskAnalysisAndMgmtFreeText.doLayout();
				} else {
//					tfDamagePerYear.setVisible(false);
					pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').setVisible(false);
					tfDamagePerYear.reset();//reset setValue('')
					
//					taDamagePerYear2.setVisible(false);
					pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').setVisible(false);
					taDamagePerYear2.reset();//reset setValue('')
				}
				
				cbSignee.cwid = massnahme.signee;
//				cbSignee.value = massnahme.signee;
				
				//orig
				if(massnahme.signee.length > 0)
					cbSignee.setValue(this.getSigneeValueByCwid(cbSignee, massnahme.signee));//setRawValue
				

				var isSigneeUser = cbSignee.getStore().getById(AIR.AirApplicationManager.getCwid().toUpperCase());
				if(isSigneeUser && !this.config.hasEditRights) {
//					var signee = cbSignee.getValue();
					if(massnahme.signee === AIR.AirApplicationManager.getCwid().toUpperCase()) {//signee
//						Util.enableCombo(dfDateOfApproval);
						bSigneeApproval.show();
					} else {
//						Util.disableCombo(dfDateOfApproval);
					}
				} else {
//					Util.disableCombo(cbSignee);
//					Util.disableCombo(dfDateOfApproval);
				}
				//new
//				cbSignee.setValue(massnahme.signee);//setRawValue
//				cbSignee.setRawValue(massnahme.signee.length == 0 ? massnahme.signee : this.getSigneeValueByCwid(cbSignee, massnahme.signee));
				
				
//				tfSignee.setValue(massnahme.signee);
				
				var date = parseInt(massnahme.gapClassApproved);
				if(date > 0)
					dfDateOfApproval.setValue(new Date(date));
				else dfDateOfApproval.reset();
				
				
				this.calculateRiskMitigation(massnahme);//nachdem der signee gesetzt ist sonst wird massnahme als ungpltig von validateMassnahmen()!
			} else {
				tfOccurenceOfDamagePerYear.reset();
				tfMaxDamagePerEvent.reset();
				cbMaxDamagePerEventCurrency.reset();
				tfMitigationPotential.reset();
				tfDamagePerYear.reset();
				
				
				taOccurenceOfDamagePerYear2.reset();
				taMaxDamagePerEvent2.reset();
				taMitigationPotential2.reset();
				taDamagePerYear2.reset();
				
				cbSignee.reset();
//				tfSignee.setValue(massnahme.signee);
				dfDateOfApproval.reset();
			}
			
//			this.updateGapRelevance(massnahme.statusId, gapClassId);
		}
		
		this.updateGapRelevance(massnahme.statusId, gapClassId);
		
		if(this.isLinkCiSelect) {
			//hier muss gespeichert werden, wenn durch skipLinkCiValidation: true direkt nach der Änderung der Einzelverlinkung
			//nicht sofort gespeichert werden soll! Siehe onLinkCiSelect()
			this.onMassnahmeChange();//wird durch klick auf andere massnahme in massnahmen grid/tabelle ausgelöst
			
			this.isLinkCiSelect = false;
		}
	},
	
	onMassnahmeInfoClick: function(column, grid, rowIndex, event) {
		
		if(this.existsInvalidMassnahme > 0 && !this.ignoreInvalidMassnahme && this.previousSelection!==rowIndex) {
			var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
			var massnahme = this.editedMassnahmen[this.previousSelection];
			if(massnahme.invalidityId !== AC.ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1)
			this.openInvalidMassnahmeWindow(grid.getEl());
			return false;
		} else { 
			var massnahme = grid.getStore().getAt(rowIndex);
			window.open('/AIR/massnbeschreibung?massnahmeGstoolId='+massnahme.get('massnahmeGstoolId')+'&lang='+AAM.getLanguage());
			return true;
		}
	},
	
	//-----------------------------------------------------------------------------------------------------------------------
	onRiskAnalysisTypeCheck: function(checkbox, isChecked) {
		//nach einem reload muss keine Userinteraktion durch riskAnalysisAndMgmtTypeSelectWindow erfolgen.
		//wenn die checkbox resetet wird, wird das check event aber gefeuert, wenn sich der alte und neue Wert
		//unterscheiden. Daher prüfen ob ein reload stattgefunden hat. Entweder durch eine zuvor nicht gewählt
		//Massnahme aus der Tabelle oder durch Auswahl einer verlinkten Massnahme.
		if(this.linkCiSelected) {
			this.linkCiSelected = false;
			return;
		}
		
		var fsRiskAnalysisAndMgmt = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt');
		
		var massnahme = /*this.editedMassnahmen[this.getSelectedGridIndex()] ||*/ this.loadedMassnahme;//oder einkommentieren siehe getMassnahmeHeaderValueByAttr()? 03122012
		
		var yesCallback = function() {
			this.deleteRiskAnalysisAndMgmtDamageData(massnahme, isChecked);
			
			if(isChecked) {
				var pRiskAnalysisAndMgmtNonFreeText = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getComponent('pRiskAnalysisAndMgmtNonFreeText');
				
				this.clearPanelItemValues(pRiskAnalysisAndMgmtNonFreeText);
				this.markInvalid(pRiskAnalysisAndMgmtNonFreeText, [ 'tfRiskMitigation' ]);
				
				fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getLayout().setActiveItem('pRiskAnalysisAndMgmtFreeText');
			} else {
				var pRiskAnalysisAndMgmtFreeText = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getComponent('pRiskAnalysisAndMgmtFreeText');
				
				this.clearPanelItemValues(pRiskAnalysisAndMgmtFreeText);
				this.markInvalid(pRiskAnalysisAndMgmtFreeText);
				
				fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getLayout().setActiveItem('pRiskAnalysisAndMgmtNonFreeText');
			}
			
			this.resetMassnahmeDates();
			this.onMassnahmeChange();
		};
		
		var noCallback = function() {
			fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType').el.dom.checked = !isChecked;
			fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType').checked = !isChecked;
			riskAnalysisAndMgmtTypeSelectWindow.close();
		};
		
		var callbackMap = {
			yes: yesCallback.createDelegate(this),
			no: noCallback.createDelegate(this)
		};
		
		var labels = AIR.AirApplicationManager.getLabels();
		
		
		var ident = this.getMassnahmeHeaderValueByAttr(massnahme, 'ident');
		var complianceRiskAnalysisAndMgmtTypeSelectMessage = labels.complianceRiskAnalysisAndMgmtTypeSelectMessage.replace('{0}', isChecked ? labels.complianceRiskAnalysisAndMgmtTypeNonFreeText : labels.complianceRiskAnalysisAndMgmtTypeFreeText).replace('{1}', ident);
		var complianceRiskAnalysisAndMgmtTypeSelectTitle = labels.complianceRiskAnalysisAndMgmtTypeSelectTitle;
		
		var riskAnalysisAndMgmtTypeSelectWindow = AIR.AirWindowFactory.createDynamicMessageWindow('RISK_ANALYSIS_AND_MGMT_TYPE_SELECT', callbackMap, complianceRiskAnalysisAndMgmtTypeSelectMessage, complianceRiskAnalysisAndMgmtTypeSelectTitle);
		riskAnalysisAndMgmtTypeSelectWindow.show();
		
		
//		var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
//		
//		if(isChecked) {
//			pRiskAnalysisAndMgmtCard.getLayout().setActiveItem('pRiskAnalysisAndMgmtFreeText');
//		} else {
//			pRiskAnalysisAndMgmtCard.getLayout().setActiveItem('pRiskAnalysisAndMgmtNonFreeText');
//		}
//		
//		this.onMassnahmeChange();
	},
	
	onGapClassSelect: function(combo, record, index) {
		var fsComplianceStatement = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement');
		var cbCompliantStatus = fsComplianceStatement.getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var gapClass = combo.getValue();
		
		var massnahme = /*this.editedMassnahmen[this.previousSelection] ? this.editedMassnahmen[this.previousSelection] :*/ this.loadedMassnahme;
		this.deleteRiskAnalysisAndMgmtValues(massnahme, gapClass);
		this.updateRiskAnalysisAndMgmt(gapClass, cbCompliantStatus.getValue(), true);

		
//		this.isWarningMassnahmenDone = false;
		this.setTargetDate(gapClass);
		
		//Achtung bei Aufruf von isTargetDateValid(): diese Funktion ist momentan spezialisiert auf (manuelle in Zusammenhang
		//mit onFocusLost) Änderungen des targetDate und die Anpassung der gapClass. 
		//Aber nicht umgekehrt wenn die gapClass geändert wird! Sie würde aber ohne den skipTargetDate option Parameter
		//in beiden Fällen durch/nach onMassnahmeChange() aufgerufen. Daher der options Parameter skipTargetDate für 
		//validateMassnahmen, um den Aufruf von isTargetDateValid() zu unterbinden.
		//Da hier das Hinweisfenster immer kommen soll, muss das targetDate nicht validiert werden.
		var options = { skipTargetDate: true };
		this.onMassnahmeChange(options);//options
	},
	
	
	onRiskAnalysisAndMgmtChange: function(field, event) {
		this.isWarningMassnahmenDone = false;
		
		this.resetMassnahmeDates();
		this.onMassnahmeChange();
		var massnahme = this.editedMassnahmen[this.previousSelection];

		var isChecked = massnahme.riskAnalysisAsFreetext == '-1' ? true : false;
		if(!isChecked)
			this.calculateRiskMitigation(massnahme);

//		var isNotApprovable = field.getValue().length === 0 || this.existsInvalidMassnahme > 0 || this.isDamagePerYearFalse(massnahme);
//		this.checkApprovable(massnahme.signee, isNotApprovable);
		this.checkApprovable(massnahme);
	},
	
	onDamagePerYearChange: function() {//change event
		
		var massnahme = this.editedMassnahmen[this.previousSelection] ? this.editedMassnahmen[this.previousSelection] : this.loadedMassnahme;
		this.checkEconomicallySolvable (massnahme);
		
	},
	
	onOccurenceOfDamagePerYearChange: function() {
		var massnahme = this.editedMassnahmen[this.previousSelection] ? this.editedMassnahmen[this.previousSelection] : this.loadedMassnahme;
		this.checkEconomicallySolvable (massnahme);
	},
	onMaxDamagePerEventChange: function() {
		var massnahme = this.editedMassnahmen[this.previousSelection] ? this.editedMassnahmen[this.previousSelection] : this.loadedMassnahme;
		this.checkEconomicallySolvable (massnahme);
	},
	onMitigationPotentialChange: function(field, event) {
		var massnahme = this.editedMassnahmen[this.previousSelection] ? this.editedMassnahmen[this.previousSelection] : this.loadedMassnahme;
		this.checkEconomicallySolvable (massnahme);
	},
//	onDamagePerYearChange: function(field, event) {//newValue, oldValue
//		this.resetMassnahmeDates();
//		this.onMassnahmeChange();
//	},
	
	isDamagePerYearFalse: function(massnahme) {
//		if(this.isWarningMassnahmenDone)
//			return true;
		
//		var massnahme = this.editedMassnahmen[this.getSelectedGridIndex()];
		var isChecked = massnahme.riskAnalysisAsFreetext == '-1' ? true : false;
		var isFalse = false;
		
		if(!isChecked && massnahme.gapPriority == 5) {
			var probOccurence = parseInt(massnahme.probOccurence);
			var damagePerEvent = parseInt(massnahme.damage);
			var mitigationPotential = parseFloat(massnahme.mitigationPotential);//parseInt
			var damagePerYear = parseInt(massnahme.expense);//field.getEl().dom.value
			
			isFalse = damagePerYear < probOccurence * damagePerEvent * mitigationPotential;
		}
		
		return isFalse;
	},
	onMassnahmenWarning: function(warningMassnahmen) {
		var callbackMap;
		var title, message;
		var labels = AIR.AirApplicationManager.getLabels();
		
		switch(warningMassnahmen[0].warningId) {
			case AC.ITSEC_MASSN_INVALIDITY_TYPE_DAMAGE_PER_YEAR:
				title = labels.invalidMassnameWindowTitleDamagePerYear;
				message = labels.invalidMassnameWindowDamagePerYear;
				
				var invalidMassnahmeWindow = AIR.AirWindowFactory.createDynamicMessageWindow('INVALID_MASSNAHME', callbackMap, message, title);
				invalidMassnahmeWindow.show(this.getEl());
				break;
				
			case AC.ITSEC_MASSN_INVALIDITY_TYPE_TARGET_DATE1:
				var result = this.isTargetDateValid(new Date(parseInt(warningMassnahmen[0].gapEndDate)));
				
				if(this.warningMassnahmen.length > 0)
					this.openMassnahmeValidationWindow(result.gapClass, result.title, result.iconType, result.message, result.isValid);

				break;
			default: break;
		}
		
		//Massnahmen Validierungsfenster für Warnungen sollen nur einmal kommen
		this.isWarningMassnahmenDone = true;//mit warningMassnahmen.splice vereinheitlichen? Siehe isDamagePerYearFalse()
		this.warningMassnahmen.splice(0, this.warningMassnahmen.length);//entspricht auch this.isWarningMassnahmenDone = true;
	},
	
	
	onMaxDamagePerEventCurrencySelect: function(combo, record, index) {
		this.resetMassnahmeDates();
		this.onMassnahmeChange();
	},
	
	deleteGapValues: function(massnahme, compliantStatus) {
		switch(compliantStatus) {
			case 3:
			case 4:
			case '3':
			case '4':
				break;
			default:
				delete massnahme.gap;
				delete massnahme.gapResponsible;
				delete massnahme.gapMeasure;
				delete massnahme.gapPriority;
				delete massnahme.gapEndDate;
				break;
		}
	},
	
	deleteRiskAnalysisAndMgmtValues: function(massnahme, gapClass) {
		switch(gapClass) {
			case '-1':
			case '1':
			case '2':
			case '3':
				delete massnahme.riskAnalysisAsFreetext;
				
//				delete massnahme.currency;
//				delete massnahme.probOccurence;
//				delete massnahme.damage;
//				delete massnahme.mitigationPotential;
//				delete massnahme.expense;
//				
//				delete massnahme.probOccurenceText;
//				delete massnahme.damageText;
//				delete massnahme.mitigationPotentialText;
//				delete massnahme.expenseText;
				this.deleteRiskAnalysisAndMgmtDamageData(massnahme);
				
				delete massnahme.signee;
				delete massnahme.gapClassApproved;
			case '4':
				delete massnahme.expense;
				delete massnahme.expenseText;
				break;
			default: break;
		}
	},
	
	deleteRiskAnalysisAndMgmtDamageData: function(massnahme, isChecked) {
		if(isChecked !== true) {
			delete massnahme.probOccurenceText;
			delete massnahme.damageText;
			delete massnahme.mitigationPotentialText;
			delete massnahme.expenseText;
		}
		if(isChecked !== false) {
			delete massnahme.currency;
			delete massnahme.probOccurence;
			delete massnahme.damage;
			delete massnahme.mitigationPotential;
			delete massnahme.expense;
		}
	},
	

	updateRiskAnalysisAndMgmt: function(gapClassId, compliantStatusId, doMarkInvalid) {
		var fsRiskAnalysisAndMgmt = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt');//.getComponent('pRiskAnalysisAndMgmtDetail');
		var pRiskAnalysisAndMgmtNonFreeText = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getComponent('pRiskAnalysisAndMgmtNonFreeText');
		var pRiskAnalysisAndMgmtFreeText = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard').getComponent('pRiskAnalysisAndMgmtFreeText');
		
		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
		
		if(this.isGapRelevant(compliantStatusId)) {
			switch(gapClassId) {
				/*case '1':
				case '2':
				case '3':
//					this.setTargetDate(gapClassId);
					
//					this.clearPanelItemValues(pRiskAnalysisAndMgmtNonFreeText);
//					this.clearPanelItemValues(pRiskAnalysisAndMgmtFreeText);
//					pRiskAnalysisAndMgmtNonFreeText.setVisible(false);
//					pRiskAnalysisAndMgmtFreeText.setVisible(false);
//					fsRiskAnalysisAndMgmt.setVisible(false);
					break;*/
				case '4':
					pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').getComponent('tfDamagePerYear').reset();
					pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2').reset();
					
					pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').setVisible(false);
					pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').setVisible(false);
					
					fsRiskAnalysisAndMgmt.setVisible(true);
					fsRiskAnalysisAndMgmt.doLayout();
					
					Util.disableCombo(dfTargetDate);
					this.checkApprovable(this.loadedMassnahme);//this.editedMassnahmen[this.previousSelection]
					
					if(doMarkInvalid) {
						this.clearPanelItemValues(fsRiskAnalysisAndMgmt, doMarkInvalid);
						var pRiskAnalysisAndMgmtCard = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
						pRiskAnalysisAndMgmtCard.getLayout().setActiveItem('pRiskAnalysisAndMgmtNonFreeText');
						
						this.markInvalid(fsRiskAnalysisAndMgmt, [ 'dfDateOfApproval' ]);
						this.markInvalid(pRiskAnalysisAndMgmtNonFreeText, [ 'tfRiskMitigation' ]);
						this.markInvalid(pRiskAnalysisAndMgmtFreeText);
					}
					break;
				case '5':
					fsRiskAnalysisAndMgmt.setVisible(true);
					fsRiskAnalysisAndMgmt.doLayout();
					
					pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').setVisible(true);
					pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').setVisible(true);
					pRiskAnalysisAndMgmtNonFreeText.doLayout();
					pRiskAnalysisAndMgmtFreeText.doLayout();
					
					Util.disableCombo(dfTargetDate);
					this.checkApprovable(this.loadedMassnahme);//this.editedMassnahmen[this.previousSelection]
					
					if(doMarkInvalid) {
						this.clearPanelItemValues(fsRiskAnalysisAndMgmt, doMarkInvalid);
						var pRiskAnalysisAndMgmtCard = fsRiskAnalysisAndMgmt.getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
						pRiskAnalysisAndMgmtCard.getLayout().setActiveItem('pRiskAnalysisAndMgmtNonFreeText');
						
						this.markInvalid(fsRiskAnalysisAndMgmt, [ 'dfDateOfApproval' ]);
						this.markInvalid(pRiskAnalysisAndMgmtNonFreeText, [ 'tfRiskMitigation' ]);
						this.markInvalid(pRiskAnalysisAndMgmtFreeText);
					}
					break;
				default:
					this.clearPanelItemValues(pRiskAnalysisAndMgmtNonFreeText, doMarkInvalid);
					this.clearPanelItemValues(pRiskAnalysisAndMgmtFreeText, doMarkInvalid);
					this.clearPanelItemValues(fsRiskAnalysisAndMgmt, doMarkInvalid);
//					pRiskAnalysisAndMgmtNonFreeText.setVisible(false);
//					pRiskAnalysisAndMgmtFreeText.setVisible(false);
//					fsRiskAnalysisAndMgmt.setVisible(false);
//					fsRiskAnalysisAndMgmt.setVisible(false);
					
					
					fsRiskAnalysisAndMgmt.setVisible(false);
					
//					dfTargetDate.enable();
					if(!this.config.hasEditRights && !this.loadedMassnahme.refPKID)
						Util.enableCombo(dfTargetDate);
					
//					this.existsInvalidMassnahme = 0;
					//wenn von compliantStatus 4,5 auf 1,2,3 gewechselt wird, können die Fehler unausgefüllten
					//Felder ignoriert werden. Dies erzeugt jedoch einen Widerspruch, wenn andere Massnahmen mit
					//compliantStatus=1,2,3 ausgewählt werden. Dann sollte this.existsInvalidMassnahme nicht 0
					//gesetzt werden.
					
					break;
			}
		} else {
			fsRiskAnalysisAndMgmt.setVisible(false);
			
			//reset cbMaxDamagePerEventCurrency to delete the previous massnahme's currency
			var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
			var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');
			var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
			cbMaxDamagePerEventCurrency.reset();
		}
		
		if(Ext.isIE)
			this.getComponent('pLayout').getComponent('pMassnahmeDetails').doLayout();//true, true
	},
	
	clearPanelItemValues: function(panel, doMarkInvalid) {
		var items = panel.findByType('combo');
		for(var i = 0; i < items.length; i++) {
			items[i].reset();//setValue('');//reset();//
			if(doMarkInvalid)
				items[i].markInvalid();
		}
		
		items = panel.findByType('textfield');
		for(var i = 0; i < items.length; i++) {
			items[i].reset();//setValue('');//reset();//
			if(doMarkInvalid)
				items[i].markInvalid();
		}
		
		items = panel.findByType('textarea');
		for(var i = 0; i < items.length; i++) {
			items[i].reset();//setValue('');//reset();//
			if(doMarkInvalid)
				items[i].markInvalid();
		}
		
//		items = panel.findByType('datefield');
//		for(var i = 0; i < items.length; i++)
//			items[i].reset();
		
		items = panel.findByType('checkbox');
		for(var i = 0; i < items.length; i++) {
//			items[i].reset();//(*checkbox1) oder manuell zurücksetzen, damit kein check event gefeuert wird
			items[i].checked = false;
			items[i].el.dom.checked = false;
		}
	},
	
	markInvalid: function(panel, exceptionIds) {
		var items = panel.findByType('combo');
		this.setItemInvalid(items, exceptionIds);
		
		items = panel.findByType('textfield');
		this.setItemInvalid(items, exceptionIds);
		
		items = panel.findByType('textarea');
		this.setItemInvalid(items, exceptionIds);
	},
	setItemInvalid: function(items, exceptionIds) {
		for(var i = 0; i < items.length; i++) {
			var isException = false;
			if(exceptionIds) {
				for(var j = 0; j < exceptionIds.length; j++) {
					if(items[i].getId() === exceptionIds[j]) {
						isException = true;
						break;
					}
				}
			}
			if(!isException && items[i].getValue().length === 0)
				items[i].markInvalid();
			else items[i].clearInvalid();
		}
	},
	
	
	setTargetDate: function(gapClassId) {
		var now = new Date();
		var month = now.getMonth();
		var year = now.getFullYear();
		
		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');

		var labels = AAM.getLabels();
		
		switch(gapClassId) {
			case '1'://long-term
				year++;
				month++;
				//sonst wird vom datefield ein Monat zu früh gesetzt wenn nur das jahr erhöht wird.
				//für das datefield ist im Gegensatz zum Date() der erste Monat die 1
				
				var oldDate = dfTargetDate.getValue();
				var newDate = new Date(year, month, 0);
				
				dfTargetDate.setValue(newDate);
				Util.enableCombo(dfTargetDate);
				
//				var result = this.isTargetDateValid(newDate);
//				this.openMassnahmeValidationWindow(result.gapClass, result.title, result.iconType, result.message, result.isValid);
				
				if(oldDate instanceof Date) {
					var title = labels.invalidMassnameWindowTitleGapClassTargetDateChange;
					var iconType = img_OK;
					var message = labels.invalidMassnameWindowGapClassTargetDateChange.replace('{0}', oldDate.format(AAM.getDateFormat())).replace('{1}', newDate.format(AAM.getDateFormat()));
					
					this.openMassnahmeValidationWindow(gapClassId, title, iconType, message, true);
				}
				
				break;
			case '2'://mid-term
				month += AC.GAP_CLASS_MID_TERM_ID2_PLUS_6_MONTHS;
				
				if(month > 11) {
					month -= 11;//month = plus - (11 - month)
					year++;
				}
				
				var oldDate = dfTargetDate.getValue();
				var newDate = new Date(year, month, 0);//0 für den letzten Tag des Monats
				
				dfTargetDate.setValue(newDate);
				Util.enableCombo(dfTargetDate);
				
				if(oldDate instanceof Date) {
					var title = labels.invalidMassnameWindowTitleGapClassTargetDateChange;
					var iconType = img_OK;
					var message = labels.invalidMassnameWindowGapClassTargetDateChange.replace('{0}', oldDate.format(AAM.getDateFormat())).replace('{1}', newDate.format(AAM.getDateFormat()));
					
					this.openMassnahmeValidationWindow(gapClassId, title, iconType, message, true);
				}
				
				break;
			case '3'://short-term
				month += AC.GAP_CLASS_MID_TERM_ID3_PLUS_3_MONTHS;
				
				if(month > 11) {
					month -= 11;//month = plus - (11 - month)
					year++;
				}
				
				var oldDate = dfTargetDate.getValue();
				var newDate = new Date(year, month, 0);//0 für den letzten Tag des Monats
				
				dfTargetDate.setValue(newDate);
				Util.enableCombo(dfTargetDate);
				
				if(oldDate instanceof Date) {
					var title = labels.invalidMassnameWindowTitleGapClassTargetDateChange;
					var iconType = img_OK;
					var message = labels.invalidMassnameWindowGapClassTargetDateChange.replace('{0}', oldDate.format(AAM.getDateFormat())).replace('{1}', newDate.format(AAM.getDateFormat()));
					
					this.openMassnahmeValidationWindow(gapClassId, title, iconType, message, true);
				}
				
				break;
			case '4':
			case '5':
				this.resetMassnahmeDates();
				
				break;
			default: break;
		}
	},
	
	calculateRiskMitigation: function(massnahme) {
//		var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
//		var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
//		var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
//		var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').getComponent('tfDamagePerYear');


		var probOccurence = massnahme.probOccurence.length > 0 ? parseInt(massnahme.probOccurence) : -1;
		var damagePerEvent = massnahme.damage.length > 0 ? parseInt(massnahme.damage) : -1;
		var mitigationPotential = massnahme.mitigationPotential.length > 0 ? parseFloat(massnahme.mitigationPotential) : -1;
		
		var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
		var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');
		var tfRiskMitigation = pRiskAnalysisAndMgmtNonFreeText.getComponent('pRiskMitigation').getComponent('tfRiskMitigation');
		
		if(probOccurence > -1 && damagePerEvent > -1 && mitigationPotential > -1) {
			var riskMitigation = (probOccurence * damagePerEvent * mitigationPotential);
			riskMitigation = Math.round(riskMitigation * 100) / 100;//auf zwei Nachkommastellen runden
			
			var value = riskMitigation;
			if(massnahme.currency && massnahme.currency.length > 0)
				value += ' ' + massnahme.currency;
			tfRiskMitigation.setValue(value);
		} else {
			tfRiskMitigation.reset();
		}
	},

	resetMassnahmeDates: function() {
		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
		
		dfTargetDate.reset();
		Util.disableCombo(dfTargetDate);
		
		
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
		
		dfDateOfApproval.reset();
	},
	
	getValidTargetDates: function(oldMonth, oldYear) {
		var dates = [];
		
		var month = oldMonth + AC.GAP_CLASS_MID_TERM_ID3_PLUS_3_MONTHS;
		var year = oldYear;
		if(month > 11) {
			month -= 11;
			year++;
		}
		
		var shotTermDate = new Date(year, month, 0);
		dates.push(shotTermDate);
		
		month = oldMonth + AC.GAP_CLASS_MID_TERM_ID2_PLUS_6_MONTHS;
		year = oldYear;
		if(month > 11) {
			month -= 11;
			year++;
		}
		
		var shotTermDate = new Date(year, month, 0);
		dates.push(shotTermDate);
		
		var longTermDate = new Date(oldYear + 1, oldMonth + 1, 0);
		dates.push(longTermDate);
		
		return dates;
	},

	
	
	
//	onDateOfApprovalPicker: function(commandlink, event) {
//		new Ext.DatePicker();
//	},
//	
//	onTargetDatePicker: function(commandlink, event) {
//		new Ext.DatePicker();
//	},
	
	
	
	onGapResponsibleAddPicker: function(commandlink, event) {
		var pickerConfig = {
			cwidOnly: false,
			functionCWID: 'N',
			callback: this.onMassnahmeChange.createDelegate(this)
		};
		
		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
		
		AIR.AirPickerManager.openPersonPicker(
			null, tfGapResponsible, event, pickerConfig);//oder onMassnahmeChange anstatt null?

//		createPersonPickerTip(event, 'tfGapResponsible', pickerConfig);
	},

	onGapResponsibleDeletePicker: function(commandlink, event) {
		var pickerConfig = {
			callback: this.onMassnahmeChange.createDelegate(this)
		};
		
		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
		
		AIR.AirPickerManager.openRemovePicker(
			null, tfGapResponsible, event, pickerConfig);

//		createRecordRemoverTip(event, 'tfGapResponsible', pickerConfig);
	},
	
	/*
	onSigneeAddPicker: function(commandlink, event) {
		var pickerConfig = {
			cwidOnly: true,
			functionCWID: 'Y',
			callback: this.onMassnahmeChange.createDelegate(this)
		};
		
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
		
		AIR.AirPickerManager.openPersonPicker(
			null, tfSignee, event, pickerConfig);//oder onMassnahmeChange anstatt null?
		
//		createPersonPickerTip(event, 'tfSignee', pickerConfig);
	},
	
	onSigneeDeletePicker: function(commandlink, event) {
		var pickerConfig = {
			callback: this.onMassnahmeChange.createDelegate(this)
		};
		
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
		
		AIR.AirPickerManager.openRemovePicker(
			null, tfSignee, event, pickerConfig);
		
//		createRecordRemoverTip(event, 'tfSignee', pickerConfig);
	},*/
	
	removeDispensableDots: function(value) {
		var dotCount = 0;
		var c;
	
		for(var i = 0; i < value.length; i++) {
			c = value.charAt(i);
			if(c == '.')
				dotCount++;
				
			if(dotCount > 1) {
				value = value.substr(0, i);
				break;
			}
		}
		
		if(value.charAt(value.length - 1) == '.')
			value += '0';
		if(value.charAt(0) == '.')
			value = '0' + value;
		
		return value;
	},
	
	validateDecimalSmallerConstantValue: function(value, field) {
		value = this.removeDispensableDots(value);
		
//		var isValid = parseInt(value) <= AC.MAX_MITIGATION_POTENTIAL || value.length == 0;//or use var MAX_VALUES = { field.getId(): 4711, ... } to make it dynamic if needed
		var v = parseInt(value);
		var isFalse = false;
		
		if(v > 100) {
			value = '100';
			isFalse = true;
		} else if(v < 1 && v > 0) {
			value = '1';
			isFalse = true;
		}
		
		field.setRawValue(value);//setRawValue field.setValue(value) --> Endlosschleife in ext-all-debug.js 40684
		
		if(isFalse) {
			var massnahme = this.editedMassnahmen[this.previousSelection] ? this.editedMassnahmen[this.previousSelection] : this.loadedMassnahme;
			massnahme.mitigationPotential = value;
			this.calculateRiskMitigation(massnahme);
		}
		
		return true;
		
//		if(isValid) {
//			this.activateButtons();
//		} else {
//			this.deactivateButtons();
//		}
		
//		if(!isValid) {
//			field.reset();
//			isValid = true;
//		}
		
//		return isValid;
	},
	
	validateDecimal: function(value, field) {
		value = this.removeDispensableDots(value);
		field.setRawValue(value);
		
		return true;
	},
	
	deactivateButtons: function() {
		var bComplianceControlsSave = this.getFooterToolbar().items.map.bComplianceControlsSave;
		var bComplianceControlsApply = this.getFooterToolbar().items.map.bComplianceControlsApply;
		
		bComplianceControlsSave.disable();
		bComplianceControlsApply.disable();
	},
	
	activateButtons: function() {
		var bComplianceControlsSave = this.getFooterToolbar().items.map.bComplianceControlsSave;
		var bComplianceControlsApply = this.getFooterToolbar().items.map.bComplianceControlsApply;
		
		bComplianceControlsSave.enable();
		bComplianceControlsApply.enable();
	},
	
	
	getSigneeValueByCwid: function(combo, cwid) {
		var r = combo.getStore().getById(cwid);
		//falls r undefined Warnmeldung auf Statusbar, dass signee cwid zu dieser Massnahme nicht mehr gültig ist, da nicht
		//(mehr) von PersonsWSPort.findPersonByFunctionSignee geliefert wird?
		var userName = r ? r.data.lastname + ', '+r.data.firstname : cwid;
		
//		var index = combo.view.getSelectedIndexes()[0];
//		var userName = combo.getStore().getAt(index).data.lastname + ', '+combo.getStore().getAt(index).data.firstname;
		
		return userName;
	},
	
	getSigneeCwid: function(combo) {
		//orig
//		var index = combo.view.getSelectedIndexes()[0];
//		var userName = combo.getStore().getAt(index).data.cwid;
		
//		var userName = combo.getValue();
		
		var userName = combo.cwid;//.value
		
		return userName;
	},
	
	onLinkCiSelect: function(linkCiId, linkCiTableId) {//massnahmeGstoolId
		if(linkCiId.length > 0 && linkCiTableId.length > 0) {
	//		this.onMassnahmeChange();
			this.isLinkCiSelect = true;
			
			var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
			var massnahmeGstoolId = grid.getSelectionModel().getSelected().get('massnahmeGstoolId');
			
			var params = {
			 	cwid: AIR.AirApplicationManager.getCwid(),
			 	token: AIR.AirApplicationManager.getToken(),
			 	linkCiId: linkCiId,
				linkCiTableId: linkCiTableId,
				massnahmeGstoolId: massnahmeGstoolId
			};
			
	//		this.linkCiSelected = true;// siehe auch (*checkbox1)
			var store = AIR.AirStoreFactory.createLinkedMassnahmeDetailListStore();
			store.on('load', this.onMassnahmenDetailLoaded, this);
			store.load({
				params: params
			});
			
			var options = {
				skipLinkCiValidation: true
			};
			this.onMassnahmeChange(options);
			
	//		this.onMassnahmeChange();//ORIG
			this.disableMassnahmeDetails(this.config.hasEditRights);//kann schon vor dem fertigen store load event gemacht werden
		} else {
			if(this.config.hasEditRights)
				this.enableMassnahmeDetails();
		}
		
		
		//sonst wird die Massnahme durch onMassnahmeChange()->validateMassnahmen()->saveMassnahme() gespeichert und nochmal durch
		//die Auswahl einer anderen Massnahme. In diesem Fall soll erst nach Auswahl einer anderen Massnahme gespeichert
		//werden! Deshalb soll die Validierung durch Veränderung der Einzelverlinkung der Massnahme nicht durchgeführt
		//werden, weil dies fachlich auch nicht notwendig ist. Die Massnahme auf die die ausgewählte Massnahme verweisen soll
		//ist zwangsläufig valide, sonst hätte sie nicht irgendwann gesichert werden können.
//		var options = {
//			skipLinkCiValidation: true
//		};
//		this.onMassnahmeChange(options);
		
//		this.onMassnahmeChange();
		
		
		
		//1. tableId 2. ciId des templates, 3. massnahmeGsToolId, 4. ciSubType (cat1Id des template CIs) --> modForms.getCIType/modAppType.getCITypeFromItem
//		frm_S_Massnahmen, deReference und cboLink_AfterUpdate
	},
	
	isMassnahmeLinked: function(massnahme) {
		return massnahme.refTableID &&
			   massnahme.refTableID.length > 0 &&
			   massnahme.refTableID != 0 &&
			   massnahme.refPKID &&
			   massnahme.refPKID.length > 0 &&
			   massnahme.refPKID != 0 ? true : false;// && massnahme.refTableID.length > 0	 && massnahme.refPKID.length > 0
	},
	
	onLinkCiTypeSelect: function() {
		this.deactivateButtons();
		this.disableMassnahmeDetails(this.config.hasEditRights);
	},
	
	disableMassnahmeDetails: function(hasEditRights) {
		var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');//.setVisible(true);
		var cbLinkCiType = complianceLinkView.getComponent('cbLinkCiType');
		var cbLinkCiList = complianceLinkView.getComponent('cbLinkCiList');
		
		var cbCompliantStatus = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification').getComponent('taJustification');
		var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
		var cbGapClass = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapClass').getComponent('cbGapClass');//Ext.getCmp('cbGapClass');//
		var clGapResponsibleAddPicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleAddPicker');
		var clGapResponsibleDeletePicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleDeletePicker');

		var chbRiskAnalysisType = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType');

		var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
		var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');

		var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
		var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
		var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
		var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
		var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').getComponent('tfDamagePerYear');


		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
		var taPlanOfAction = fsGapElimination.getComponent('pPlanOfAction').getComponent('taPlanOfAction');
		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
		
		
		var pRiskAnalysisAndMgmtFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtFreeText');
		var taOccurenceOfDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pOccurenceOfDamagePerYear2').getComponent('taOccurenceOfDamagePerYear2');
		var taMaxDamagePerEvent2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMaxDamagePerEvent2').getComponent('taMaxDamagePerEvent2');
		var taMitigationPotential2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMitigationPotential2').getComponent('taMitigationPotential2');
		var taDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2');


		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('cbSignee');
		var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');

		
		/*var isSignee = cbSignee.getStore().getById(AIR.AirApplicationManager.getCwid());
		if(!isSignee) {
			Util.disableCombo(cbSignee);
			dfDateOfApproval.setHideTrigger(true);
			dfDateOfApproval.disable();
		}*/
		
		if(!hasEditRights) {
			Util.disableCombo(cbLinkCiType);
			Util.disableCombo(cbLinkCiList);
		}
		
		Util.disableCombo(cbCompliantStatus);
		
//		if(Ext.isIE)
//			taJustification.setReadOnly(true);
//		else
			taJustification.disable();
		
		taGapDescription.disable();
		Util.disableCombo(cbGapClass);
		clGapResponsibleAddPicker.hide();
		clGapResponsibleDeletePicker.hide();

		chbRiskAnalysisType.disable();
		tfOccurenceOfDamagePerYear.disable();
		tfMaxDamagePerEvent.disable();
		Util.disableCombo(cbMaxDamagePerEventCurrency);
		tfMitigationPotential.disable();
		tfDamagePerYear.disable();

		
		tfGapResponsible.disable();//getEl().dom.disabled = true;//wenn disable() verschwindet der parent panel mit tfGapResponsible. Warum??!!
//		fsGapElimination.getComponent('pGapResponsible').setVisible(true);
//		fsGapElimination.doLayout();//oder fsGapElimination.doLayout() ? .getComponent('pGapResponsible')
		
		taPlanOfAction.disable();
//		dfTargetDate.disable();
//		dfTargetDate.setHideTrigger(true);
		Util.disableCombo(dfTargetDate);

		taOccurenceOfDamagePerYear2.disable();
		taMaxDamagePerEvent2.disable();
		taMitigationPotential2.disable();
		taDamagePerYear2.disable();

		Util.disableCombo(cbSignee);
		Util.disableCombo(dfDateOfApproval);

//		dfDateOfApproval.disable();
//		dfDateOfApproval.setHideTrigger(true);
//		Util.disableCombo(dfDateOfApproval);
	},
	
	enableMassnahmeDetails: function() {
		var complianceLinkView = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView');//.setVisible(true);
		var cbLinkCiType = complianceLinkView.getComponent('cbLinkCiType');
		var cbLinkCiList = complianceLinkView.getComponent('cbLinkCiList');
		
		var cbCompliantStatus = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification').getComponent('taJustification');
		var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
		var cbGapClass = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapClass').getComponent('cbGapClass');//Ext.getCmp('cbGapClass');//
		var clGapResponsibleAddPicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleAddPicker');
		var clGapResponsibleDeletePicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleDeletePicker');

		var chbRiskAnalysisType = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType');

		var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
		var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');

		var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
		var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
		var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
		var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
		var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pExpensePerYear').getComponent('tfDamagePerYear');


		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
		var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
		var taPlanOfAction = fsGapElimination.getComponent('pPlanOfAction').getComponent('taPlanOfAction');
		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
		
		
		var pRiskAnalysisAndMgmtFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtFreeText');
		var taOccurenceOfDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pOccurenceOfDamagePerYear2').getComponent('taOccurenceOfDamagePerYear2');
		var taMaxDamagePerEvent2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMaxDamagePerEvent2').getComponent('taMaxDamagePerEvent2');
		var taMitigationPotential2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMitigationPotential2').getComponent('taMitigationPotential2');
		var taDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2');


		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('cbSignee');
		var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');

		
		/*var isSignee = cbSignee.getStore().getById(AIR.AirApplicationManager.getCwid());
		if(!isSignee) {
			Util.disableCombo(cbSignee);
			dfDateOfApproval.setHideTrigger(true);
			dfDateOfApproval.disable();
		}*/
		
		if(this.config.hasEditRights) {
			Util.enableCombo(cbLinkCiType);
			Util.enableCombo(cbLinkCiList);
		}
		
		Util.enableCombo(cbCompliantStatus);
		
//		if(Ext.isIE)
//			taJustification.setReadOnly(false);
//		else
			taJustification.enable();
		
		taGapDescription.enable();
		Util.enableCombo(cbGapClass);
		clGapResponsibleAddPicker.show();
		clGapResponsibleDeletePicker.show();

		chbRiskAnalysisType.enable();
		tfOccurenceOfDamagePerYear.enable();
		tfMaxDamagePerEvent.enable();
		Util.enableCombo(cbMaxDamagePerEventCurrency);
		tfMitigationPotential.enable();
		tfDamagePerYear.enable();

		tfGapResponsible.enable();
//		fsGapElimination.getComponent('pGapResponsible').setVisible(true);
//		fsGapElimination.getComponent('pGapResponsible').doLayout();//oder fsGapElimination.doLayout() ? getComponent('pGapResponsible')
		taPlanOfAction.enable();
//		dfTargetDate.enable();
//		dfTargetDate.setHideTrigger(false);
		if(this.editedMassnahmen[this.previousSelection] && parseInt(this.editedMassnahmen[this.previousSelection].gapPriority) < 4)
			Util.enableCombo(dfTargetDate);

		taOccurenceOfDamagePerYear2.enable();
		taMaxDamagePerEvent2.enable();
		taMitigationPotential2.enable();
		taDamagePerYear2.enable();

		Util.enableCombo(cbSignee);
//		dfDateOfApproval.enable();
//		dfDateOfApproval.setHideTrigger(false);
//		Util.enableCombo(dfDateOfApproval);
		Util.disableCombo(dfDateOfApproval);
	},
	
	update: function() {
		if(!this.config.hasEditRights)//(*2) Release Defaultdeaktivierung
			this.disableMassnahmeDetails(this.config.hasEditRights);
	},
	
	updateToolbar: function(message) {
		var lComplianceToolbar = this.getComponent('pComplianceToolbar').getComponent('lComplianceToolbar');
		
		var icon = message.length === 0 ? 'Transparent.png' : 'warning_type2_16x16.png';
		
		var data = {
			icon: icon,
			text: message
		};
		
		this.toolbarMessageTpl.overwrite(lComplianceToolbar.el, data);
	},
	
	updateLabels: function(labels) {
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		
//		var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('cbSignee');
//		Util.setFieldLabel(cbSignee, labels.complianceWindowSignee);
		pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('lSignee').setText(labels.complianceWindowSignee);
		
		this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('complianceLinkView').updateLabels(labels);
//		Util.setFieldLabel(this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('pComplianceLinkTypeConfig').getComponent('cbLinkCiType'), labels.LinkCiType);
//		Util.setFieldLabel(this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('pComplianceLinkTypeConfig').getComponent('cbLinkCi'), labels.LinkCi);
	}
	

});
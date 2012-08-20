Ext.namespace('AIR');


//http://by02wr:8080/AIR/ItsecMassnahmenWSPort?wsdl
AIR.ComplianceControlsWindow = Ext.extend(Ext.Window, {
	constructor: function(massnahmenStore, massnahmeDetailStore, config) {//, statusWertDisplayField, massnahmeDetailStore language
		this.massnahmenStore = massnahmenStore;
		this.massnahmeDetailStore = massnahmeDetailStore;
		this.config = config;
		
		this.statusWertDisplayField = this.config.language == 'EN' ? 'statusWertEn' : 'statusWert';//statusWertDisplayField;//'statusWertEn';
		this.gapClassDisplayField = this.config.language == 'EN' ? 'gapClassTextEN' : 'gapClassTextDE';
		this.hasNoGapAnalysis = this.config.complianceType == AC.CI_GROUP_ID_NON_BYTSEC || this.config.complianceType == AC.CI_GROUP_ID_DELETE_ID || this.config.complianceType == AC.CI_GROUP_ID_EMPTY;
		

//		this.massnahmeDetailStore = AIR.AirStoreFactory.createItsecMassnahmeDetailStore(this.statusWertDisplayField);
		
		
		this.editedMassnahmen = {};//[]
		
		Ext.apply(Ext.form.VTypes, {
			decimal: this.validateDecimal.createDelegate(this),
			decimalText: 'Wert muss eine Dezimalzahl sein',//language Datei!
			
			decimalSmallerConstantValue: this.validateDecimalSmallerConstantValue.createDelegate(this),
			decimalSmallerConstantValueText: 'Wert muss eine Dezimalzahl kleiner '+AC.MAX_MITIGATION_POTENTIAL+' sein'//language Datei!
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
		//wenn das Fenster ein weiteres Mal ge�ffnet wird. Grund?
		currencyStore.load();
		
		
		var signeeListStore = AIR.AirStoreFactory.createSigneeListStore();
		var signeeStoreParams = {
			itSet: this.config.itSet
		};
		signeeListStore.load({
			params: signeeStoreParams
		});
		
		
		var labels = AIR.AirApplicationManager.getLabels();
		
		Ext.apply(this, {
			plain: true,
			modal: true,
			closable: false,
			border: false,
			resizable: false,
			title: labels.complianceWindowTitle,

			width: 1000,
			height: 500,//600 840
			
			layout: 'fit',
			
			items: [{
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
				        height: 400,//500 660 635
				        
						columns: [{
							header: 'Ident',
							dataIndex: 'ident',
							width: 60
						},{
							header: 'Control',
							dataIndex: 'massnahmeTitel',
							width: 320
						},{
							header: 'Implemented',
							dataIndex: 'statusWert',//'statusWert', this.statusWertDisplayField
							width: 100,
							
							hidden: true
						},{
							xtype: 'actioncolumn',
							id: 'cMassnahmeInfo',
							width: 30,
							
							items: [{
								icon: 'images/Info_16x16.png'
							}
//							{
//								getClass: function(v, meta, record) {
//									return 'icon-info';//Funktioniert nicht! Auch nicht was beschreiben ist in: http://www.sencha.com/forum/showthread.php?117409-ActionColumn-first-parameter-of-getClass-function-always-empty
									//der renderer von ActionColumn benutzt zwar die icon-info Klasse, aber das hat keinen Effekt. (http://docs.sencha.com/ext-js/3-4/source/Column.html#Ext-grid-ActionColumn)
//								}
//							}
							]
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
					
					height: 440,//540 840 620
					
					items: [{
						xtype: 'panel',
						id: 'pComplianceStatementInfo',
						layout: 'hbox',
						anchor: '95%',
						
						border: false,
						
						items: [/*{
							xtype: 'container',
							height: 10,
							anchor: '90%'
						},*/{
							xtype: 'label',
							id: 'lComplianceStatementInfo',
							text: labels.complianceStatementInfo,
//							anchor: '90%',
							
							margins: '10 0 10 0',
							style: {
						    	fontSize: 12
							}
						}/*,{
							xtype: 'container',
							height: 10,
							anchor: '90%'
						}*/]
					},{
						xtype: 'fieldset',
						id: 'fsComplianceStatement',
						title: labels.complianceWindowStatement,
						
						hidden: true,
						layout: 'form',
						labelWidth: 100,
						anchor: '95%',
						
						// Muss leider auf Elementebene gemacht werden, da auf fieldset/panel Ebene diese unerw�nscht grau hinterlegt werden
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
								
								typeAhead: true,
								forceSelection: true,
								selectOnFocus: true,
								
								triggerAction: 'all',
								mode: 'local',
								lazyInit: false,//damit cbCompliantStatus.view nicht erst bei fokussierung initialisiert wird
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
						anchor: '95%',//100 95% bei allen pMassnahmeDetails fieldsets falls dieses Fenster h�her werden muss
						
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
								
								layout: 'hbox',
								anchor: '100%',
								
								items: [{
						    		xtype: 'label',
						    		id: 'labeltfGapResponsible',//lGapResponsible
						    		text: labels.complianceWindowGapResponsible,
//						    		flex: 5,//5 4
						    		
						    		width: 92,//100
						    		margins: '0 2 0 0',
						    		
									style: {
								    	fontSize: 12
									}
						    	},{
									xtype: 'textfield',
									id: 'tfGapResponsible',
//									enableKeyEvents: true,
									
									flex: 14,//14 15
									margins: '0 0 0 3',
									
//									fieldLabel: 'Responsible',
									readOnly: true
								},{
									xtype: 'hidden',//nur f�r/wegen personPicker
							        id: 'tfGapResponsibleHidden'
							    },{
					                xtype: 'commandlink',
					                id: 'clGapResponsibleAddPicker',
					                img: 'images/add_user_16x16.png',
					                	
				                	flex: 1
								},{
					                xtype: 'commandlink',
					                id: 'clGapResponsibleDeletePicker',
					                img: 'images/failed_type1_16x16.png',
					                
				                	flex: 1
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
									height: 50,
									
									flex: 7,
									margins: '5 0 0 0'
									
//									anchor: '100%',
//									fieldLabel: 'Plan of action'
						    	}]
							},{
								xtype: 'panel',
								id: 'pGapClass',
								border: false,
								
								layout: 'hbox',
								anchor: '100%',
								
								items: [{
						    		xtype: 'label',
						    		id: 'lGapClass',
						    		text: labels.complianceWindowGapClass,
						    		flex: 2,
//						    		width: 100,
						    		
						    		margins: '5 5 5 0',
						    		
									style: {
								    	fontSize: 12
									}
						    	},{
									xtype: 'combo',
									id: 'cbGapClass',
									store: AIR.AirStoreFactory.createItsecMassnahmenGapClassStore(),
									
									anchor: '100%',
									flex: 7,
									margins: '5 0 0 0',
									
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
								
								items: [{
						    		xtype: 'label',
						    		id: 'lTargetDate',
						    		text: labels.complianceWindowTargetDate,
						    		flex: 2,
//						    		width: 100,
						    		
						    		margins: '5 5 5 0',
						    		
									style: {
								    	fontSize: 12
									}
						    	},{
									xtype: 'datefield',
									id: 'dfTargetDate',
									margins: '5 0 0 0',
									format: AIR.AirApplicationManager.getDateFormat(),//this.config.language
									altFormats: AIR.AirApplicationManager.getDateFormat(),//only accept this format
									
//									readOnly: true,//sonst kein Datem ausw�hlbar
									flex: 7
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
									height: 120,
									//warum wird die H�he nicht automatisch berechnet wie bei pRiskAnalysisAndMgmtFreeText ohne height: 220
									
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
								    		
								    		flex: 5,
								    		margins: '15 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfOccurenceOfDamagePerYear',//ITSEC_MASSN_STATUS::PROB_OCCURENCE:NUMBER(10,3)
											enableKeyEvents: true,
//											maskRe: /[0-9][0-9]?([.][0-9][0-9])?/g,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimal',
											
											flex: 6,
											margins: '15 0 0 0'
										}]
									},{
										xtype: 'panel',
										id: 'pMaxDamagePerEvent',
										border: false,
										
										layout: 'hbox',
										anchor: '100%',
										
										items: [{
								    		xtype: 'label',
								    		id: 'lMaxDamagePerEvent',
								    		text: labels.complianceWindowMaximumDamagePerEvent,
								    		flex: 5,
								    		margins: '5 4 0 0',
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfMaxDamagePerEvent',
											enableKeyEvents: true,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimal',
											
											flex: 3,
											margins: '5 0 0 0'
										},{
											xtype: 'combo',
											id: 'cbMaxDamagePerEventCurrency',
											store: currencyStore,//AIR.AirStoreManager.getStoreByName('currencyListStore'),//currencyStore,//currencyListStore,//AIR.AirStoreFactory.createGxpFlagListStore(),//gxpFlagListStore,
											
											flex: 3,
											margins: '5 0 0 5',
											
									        valueField: 'id',//id currencyId
									        displayField: 'text',//text currencyName


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
									    
										
										items: [{
								    		xtype: 'label',
								    		id: 'lMitigationPotential',
								    		text: labels.complianceWindowMitigationPotential,
								    		
								    		flex: 5,
								    		margins: '5 4 0 0',
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfMitigationPotential',
											enableKeyEvents: true,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimalSmallerConstantValue',//'decimalSmallerConstantValue',
											
											flex: 5,
											margins: '5 0 0 0'
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
										
										items: [{
								    		xtype: 'label',
								    		id: 'lRiskMitigation',
								    		text: labels.complianceWindowRiskMitigation,
								    		
								    		flex: 5,
								    		margins: '5 0 0 0',
								    		height: 22,
								    		
											style: {
										    	fontSize: 12
											}
								    	},{
											xtype: 'textfield',
											id: 'tfDamagePerYear',
											enableKeyEvents: true,
											
								    		maskRe: /[\d\\.]/,
								    		vtype: 'decimal',
											
											flex: 6,
											margins: '5 0 0 0'
										}]
									}]
								},{
									xtype: 'panel',
									id: 'pRiskAnalysisAndMgmtFreeText',
									border: false,
									
									layout: 'form',
									border: false,
//									height: 220,
									
									
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
											height: 50,
											
											flex: 6,
											margins: '0 0 0 0'
										}]
									}]
								}]
							},
							{
								xtype: 'combo',
								id: 'cbSignee',
								store: signeeListStore,//signeeListStore,//AIR.AirStoreFactory.createSigneeListStore()
								
						        valueField: 'cwid',//id currencyId
						        displayField: 'lastname',//text currencyName
						        
//						        itemSelector: 'x-combo-list-item',
						        tpl: '<tpl for="."><div ext:qtip="{cwid}" class="x-combo-list-item">{lastname}, {firstname}</div></tpl>',//'<tpl for="."><div class="x-combo-list-item">{' + this.displayField + '}</div></tpl>',//

						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local',
								
								width: 195,
								fieldLabel: labels.complianceWindowSignee
//								editable: false
								
//								style: {
//									marginTop: 5
//								}
							},
//							{
//								xtype: 'panel',
//								id: 'pSignee',
//								border: false,
//								
//								layout: 'hbox',
//								anchor: '100%',
//								
//								items: [{
//						    		xtype: 'label',
//						    		id: 'labeltfSignee',//lSignee
//						    		text: 'Signee',
//						    		
//						    		flex: 10,
//						    		margins: '15 0 0 0',
//						    		height: 22,
//						    		
//									style: {
//								    	fontSize: 12
//									}
//						    	},{
//									xtype: 'textfield',
//									id: 'tfSignee',
////									enableKeyEvents: true,
//									
//									flex: 10,
//									margins: '15 0 0 0',
//									
////									fieldLabel: 'Responsible',
//									readOnly: true
//								},{
//									xtype: 'hidden',
//							        id: 'tfSigneeHidden'
//							    },{
//					                xtype: 'commandlink',
//					                id: 'clSigneeAddPicker',
//					                img: 'images/add_user_16x16.png',
//					                	
//				                	flex: 1,
//				                	margins: '15 0 0 0'
//								},{
//					                xtype: 'commandlink',
//					                id: 'clSigneeDeletePicker',
//					                img: 'images/failed_type1_16x16.png',
//					                
//				                	flex: 1,
//				                	margins: '15 0 0 0'
//								}]
//							},
							{
								xtype: 'panel',
								id: 'pDateOfApproval',
								border: false,
								
								layout: 'hbox',
								anchor: '100%',
								
								items: [{
						    		xtype: 'label',
						    		id: 'lDateOfApproval',
						    		text: labels.complianceWindowDateOfApproval,
						    		flex: 5,
						    		
						    		margins: '5 0 0 0',
						    		
									style: {
								    	fontSize: 12
									}
						    	},{
									xtype: 'datefield',
									id: 'dfDateOfApproval',
									margins: '5 0 0 0',
									format: AIR.AirApplicationManager.getDateFormat(),//this.config.language
									altFormats: AIR.AirApplicationManager.getDateFormat(),//only accept this format
									
//									readOnly: true,//sonst kein Datem ausw�hlbar
									flex: 6
								}]
							}]
						}]
					}]
				}]
			}],
			
			buttonAlign: 'center',
			buttons: [{
				id: 'bComplianceControlsSave',
				text: 'Save and Close',
				disabled: true
			}, {
				id: 'bComplianceControlsApply',
				text: 'Save',
				disabled: true
			}, {
				id: 'bComplianceControlsCancel',
				text: 'Cancel'
			}]
		});
		
		AIR.ComplianceControlsWindow.superclass.initComponent.call(this);
		
		this.addEvents('massnahmeSaved');
		
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		var cMassnahmeInfo = grid.getColumnModel().getColumnById('cMassnahmeInfo');
		grid.on('rowclick', this.onMassnahmeSelected, this);//click
		cMassnahmeInfo.on('click', this.onMassnahmeInfoClick, this);
		
		var bComplianceControlsSave = this.getFooterToolbar().getComponent('bComplianceControlsSave');//items.map.bComplianceControlsSave
		var bComplianceControlsApply = this.getFooterToolbar().items.map.bComplianceControlsApply;
		var bComplianceControlsCancel = this.getFooterToolbar().items.map.bComplianceControlsCancel;
		
		bComplianceControlsSave.on('click', this.onSave, this);
		bComplianceControlsApply.on('click', this.onApply, this);
		bComplianceControlsCancel.on('click', this.onCancel, this);
		
		
		
		var cbCompliantStatus = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification').getComponent('taJustification');
		
		cbCompliantStatus.on('select', this.onCompliantStatusChange, this);//onMassnahmeChange
		taJustification.on('keyup', this.onMassnahmeChange, this);
		
		this.massnahmeDetailStore.on('load', this.onMassnahmenDetailLoaded, this);
		
		
		//-----------------------------------------------------------------------------------------------------------------------
		var chbRiskAnalysisType = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisType').getComponent('chbRiskAnalysisType');
		chbRiskAnalysisType.on('check', this.onRiskAnalysisTypeCheck, this);
		
		var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
		taGapDescription.on('keyup', this.onMassnahmeChange, this);
		
		
		
		var cbGapClass = Ext.getCmp('cbGapClass');//this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapClass').getComponent('cbGapClass');
		cbGapClass.on('select', this.onGapClassSelect, this);//select change
		
		
		var clGapResponsibleAddPicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleAddPicker');
		clGapResponsibleAddPicker.on('click', this.onGapResponsibleAddPicker, this);
		
		var clGapResponsibleDeletePicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleDeletePicker');
		clGapResponsibleDeletePicker.on('click', this.onGapResponsibleDeletePicker, this);
		
		
//		var clSigneeAddPicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pSignee').getComponent('clSigneeAddPicker');
//		clSigneeAddPicker.on('click', this.onSigneeAddPicker, this);
//		
//		var clSigneeDeletePicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pSignee').getComponent('clSigneeDeletePicker');
//		clSigneeDeletePicker.on('click', this.onSigneeDeletePicker, this);
		

		
		var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
		var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');

		var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
		var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
		var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
		var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
		var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pRiskMitigation').getComponent('tfDamagePerYear');

		tfOccurenceOfDamagePerYear.on('keyup', this.onMassnahmeChange, this);
		tfMaxDamagePerEvent.on('keyup', this.onMassnahmeChange, this);
		tfMitigationPotential.on('keyup', this.onMassnahmeChange, this);
		tfDamagePerYear.on('keyup', this.onMassnahmeChange, this);
		
		cbMaxDamagePerEventCurrency.on('select', this.onMaxDamagePerEventCurrencySelect, this);
		
		
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
		dfTargetDate.on('change', this.onDateChange, this);//change keyup
	
		
		
		taOccurenceOfDamagePerYear2.on('keyup', this.onMassnahmeChange, this);
		taMaxDamagePerEvent2.on('keyup', this.onMassnahmeChange, this);
		taMitigationPotential2.on('keyup', this.onMassnahmeChange, this);
		taDamagePerYear2.on('keyup', this.onMassnahmeChange, this);
		
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
//		var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
		var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('cbSignee');
		var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
		
//		tfSignee.on('change', this.onMassnahmeChange, this);
		cbSignee.on('select', this.onSigneeSelect, this);
		cbSignee.on('change', this.onSigneeChange, this);
		dfDateOfApproval.on('select', this.onMassnahmeChange, this);
		dfDateOfApproval.on('change', this.onDateChange, this);//change keyup
		
		

	},
	
	onDateChange: function(field, newValue, oldValue) {
		if(typeof newValue === 'string')
			if(newValue.length === 0 && field.el.dom.value.length > 0 && !field.parseDate(field.el.dom.value))
				field.setValue(oldValue);
			else this.onMassnahmeChange();
	},
	
	onCompliantStatusChange: function(combo, record, index) {
		if(!this.editedMassnahmen[this.previousSelection])
			this.saveMassnahme(this.previousSelection);
		
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		
		grid.getStore().getAt(this.previousSelection).data.statusWert = record.data.statusWert;
		var itsecMassnahmenStatusId = grid.getStore().getAt(this.previousSelection).data.itsecMassnahmenStatusId;
		
//		grid.getStore().clearGrouping();
		grid.getStore().groupBy('statusWert', true);
//		grid.getView().refresh();
		
		
		//get new index after regrouping for this.editedMassnahmen[this.previousSelection] and delete it under the old and save it under this new index
		var newIndex = grid.getStore().indexOfId(itsecMassnahmenStatusId);
		
		this.editedMassnahmen[this.previousSelection].statusId = parseInt(combo.getValue());// record.data.id;
		this.editedMassnahmen[newIndex] = this.editedMassnahmen[this.previousSelection];
		delete this.editedMassnahmen[this.previousSelection];
		this.previousSelection = newIndex;
		
		this.onMassnahmeChange();
		
		
		//wenn CompliantStatus ge�ndert ist die gapClass (-1) zur�ckzusetzen auch wenn die Massnahme zuvor ein CompliantStatus hatte,
		//der eine gapClass erm�glichte.
		this.updateGapRelevance(record.data.itsecMassnahmenWertId, '-1');
		
//		var isGapRelevant = record.data.itsecMassnahmenWertId == '3' || record.data.itsecMassnahmenWertId == '4';
//		if(!this.hasNoGapAnalysis) {//--> complianceType
//			this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').setVisible(isGapRelevant);
//			if(!isGapRelevant)
//				this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').setVisible(false);
//		}
	},
	
	onSigneeSelect: function(combo, record, index) {
		var value = record.data.lastname + ', ' + record.data.firstname;
		combo.setValue(value);//setValue setRawValue anstatt setValue damit beim auslesen die cwid mit getValue verf�gbar ist
		combo.cwid = record.data.cwid;//.value
		
		this.onMassnahmeChange();
	},
	onSigneeChange: function (combo, newValue, oldValue) {
		if(newValue.length === 0) {
			combo.reset();
			this.onMassnahmeChange();
		} else {
			combo.getStore().clearFilter();
			
			var value = newValue.indexOf(',') > -1 ? newValue.substring(0, newValue.indexOf(',')) : oldValue.substring(0, oldValue.indexOf(','));
			var index = combo.getStore().findExact('lastname', value);
			var record = index > -1 ? combo.getStore().getAt(index) : combo.getStore().getById(combo.cwid);
			
			this.onSigneeSelect(combo, record, index);
		}
		
		
//		Util.checkComboValueValid(combo, newValue, oldValue);
	},
	
	updateGapRelevance: function(compliantStatusId, gapClassId) {
		if(!this.hasNoGapAnalysis) {//--> complianceType
			var isGapRelevant = this.isGapRelevant(compliantStatusId);
			this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').setVisible(isGapRelevant);
			
			if(Ext.isIE)
				this.getComponent('pLayout').getComponent('pMassnahmeDetails').doLayout();//true, true
		}
		
		if(gapClassId.length == 0)
			gapClassId = '-1';
		
		
		this.updateRiskAnalysisAndMgmt(gapClassId, compliantStatusId);
		
//		if(gapClassId || gapClassId.length == 0)
//			this.updateRiskAnalysisAndMgmt(gapClassId || '-1');
	},
	
	isGapRelevant: function(compliantStatusId) {
		return compliantStatusId == '3' || compliantStatusId == '4';//business rule
	},
	
	onMassnahmeSelected: function(grid, rowIndex, event) {
		this.selectedComplianceControl = rowIndex;
		if(this.previousSelection == this.selectedComplianceControl)
			return;
		
		//save previously edited massnahmenDetails (clientseitig, noch nicht serverseitig),
		//wenn rechts bei fsComplianceStatement etwas ge�ndert wurde
		if(this.massnahmeChanged && this.previousSelection > -1) {
			this.massnahmeChanged = false;
			this.saveMassnahme(this.previousSelection);
		}
		
		//nur dann neu laden, wenn die Massnahme noch nicht bearbeitet wurde. Wird eine Massnahme bearbeitet, dann eine andere und dann
		//wieder die vorherige soll NICHT neu geladen werden, damit die gemachten �nderungen nicht durch das Laden verloren gehen 
		var massnahme = this.editedMassnahmen[rowIndex];
		var isMassnahmeAlreadyEdited = massnahme ? true : false;
		
		if(isMassnahmeAlreadyEdited) {
			this.updateComplianceDetails(massnahme);//massnahme.statusId, massnahme.statusKommentar
		} else {
			var params = {
			 	cwid: AIR.AirApplicationManager.getCwid(),
			 	token: AIR.AirApplicationManager.getToken(),
				itsecMassnahmenStatusId: grid.getStore().getAt(rowIndex).data.itsecMassnahmenStatusId,
				itsecGruppenId: this.config.complianceType//this.CI_GROUP_ID_DEFAULT_ITSEC
			};
			
			this.massnahmeDetailStore.load({
				params: params
			});
		}
		
		this.previousSelection = rowIndex;
		
//		this.checkDataValid();
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
		
		//nur das Array zum (Server) Speichern �bergeben
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
//			var fsComplianceStatement = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement');
//			fsComplianceStatement.setVisible(true);
			
			var fsComplianceStatement = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement');
			fsComplianceStatement.setVisible(true);
			
//			if(!this.hasNoGapAnalysis)
//				this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').setVisible(true);
			
			this.update();
			this.updateLabels(AIR.AirApplicationManager.getLabels());
			
			this.getComponent('pLayout').doLayout();
			this.windowRendered = true;
		} 

		this.updateComplianceDetails(records[0].data);
	},
	
	
	onMassnahmeChange: function(source, event) {
//		if(source.getXType() == 'textfield')
//			if(!source.isValid()) {
////				this.massnahmeChanged = false;
//				this.deactivateButtons();
//				return;
//			}
		
//		if(this.checkDataValid()) {
////			this.massnahmeChanged = true;
//			this.activateButtons();
//		} else {
////			this.massnahmeChanged = true;//false true
//			this.deactivateButtons();
//		}
		
		this.massnahmeChanged = true;
		this.activateButtons();
		
		this.checkDataValid();
	},
	
	
	//ORDER: alle validierten Werte/Felder aller this.editedMassnahmen validieren. 
	//Hier this.editedMassnahmen[i].mitigationPotential und Datumsfelder/-werte this.editedMassnahmen[i].dateOfApproval,targetDate
	//Zusatz: eine Statusbar mit Meldung welche editierten Massnahmen fehlerhafte Werte enthalten, z.B. Ident: Masnhamen 06.004, 11.651 enthalten Fehler
	checkDataValid: function() {
		//A)
		//Fehler: wenn erste Massnahme gespeichert wird, werden danch keine �ndeurngen gesichert weil diese Methode false zur�ckgibt. 
		//Neue Werte derselben Massnahme w�rden erst gespeichert, wenn true zur�ckgegeben wird. Henne Ei Problem
//		if(!this.editedMassnahmen[this.previousSelection])
			this.saveMassnahme(this.previousSelection);
		
		
		var falseMassnahmen = [];
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		
		for(var key in this.editedMassnahmen) {
			var mp = this.editedMassnahmen[key].mitigationPotential;
			
			if(mp && mp >= 10) {//globales validators = { mitigationPotential: validateMitigationPotential } Object. mit feld: function
				var ident = grid.getStore().getById(this.editedMassnahmen[key].itsecMassnahmenStatusId).data.ident;
				falseMassnahmen[falseMassnahmen.length] = ident;
			}
		}
		
		if(falseMassnahmen.length > 0) {
			this.deactivateButtons();
			//set error message somewhere
		}
			
//		return falseMassnahmen.length == 0;

		
		//B)
//		var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
//		var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');
//		var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
//		
//		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
//		var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
//		
//		var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
//		var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
//		
//		return tfMitigationPotential.isValid() && dfDateOfApproval.isValid() && dfTargetDate.isValid();
	},
	
	saveMassnahme: function(rowIndex) {
		var cbCompliantStatus = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification').getComponent('taJustification');
		var grid = this.getComponent('pLayout').getComponent('fsComplianceControls').getComponent('lvComplianceControls');
		
		var itsecMassnahmenStatusId = grid.getStore().getAt(this.previousSelection).data.itsecMassnahmenStatusId;
		var compliantStatus = cbCompliantStatus.getValue();
		var compliantStatusId = parseInt(compliantStatus);
		var justification = taJustification.getValue();

		
		this.editedMassnahmen[rowIndex] = {
			itsecMassnahmenStatusId: itsecMassnahmenStatusId,
			statusId: compliantStatusId,//compliantStatus:
			statusKommentar: justification//justification:
		};
		
		if(!this.hasNoGapAnalysis) {
			this.editedMassnahmen[rowIndex].massnahmeGstoolId = grid.getStore().getAt(this.previousSelection).data.massnahmeGstoolId;
			
			var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
			this.editedMassnahmen[rowIndex].gap = taGapDescription.getValue();
			
			
			var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
			var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
			var taPlanOfAction = fsGapElimination.getComponent('pPlanOfAction').getComponent('taPlanOfAction');
			var cbGapClass = fsGapElimination.getComponent('pGapClass').getComponent('cbGapClass');
			var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
			var gapClassId = cbGapClass.getValue();
			
			this.editedMassnahmen[rowIndex].gapResponsible = tfGapResponsible.getValue();
			this.editedMassnahmen[rowIndex].gapMeasure = taPlanOfAction.getValue();
			this.editedMassnahmen[rowIndex].gapPriority = cbGapClass.getValue();
			this.editedMassnahmen[rowIndex].gapEndDate = dfTargetDate.getValue() ? dfTargetDate.getValue().getTime() : -1;//-1 f�r SoapProxy, bei null statt -1 kommt JS Fehler
			
			
			if(gapClassId == '4' || gapClassId == '5') {
				var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
				var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');
				
				
				var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
				var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
				var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
				var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
				var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pRiskMitigation').getComponent('tfDamagePerYear');
				
				this.editedMassnahmen[rowIndex].probOccurence = tfOccurenceOfDamagePerYear.getValue();
				this.editedMassnahmen[rowIndex].damage = tfMaxDamagePerEvent.getValue();
				
				
//				var currency = cbMaxDamagePerEventCurrency.getStore().getById(cbMaxDamagePerEventCurrency.getValue()).data.currencyName;//ergibt undefined				
				var currency = cbMaxDamagePerEventCurrency.getValue();
				var currencySymbol = currency.length == 0 ? currency : cbMaxDamagePerEventCurrency.getStore().getById(currency).data.symbol;//symbol currencySymbol '';// findExact('currencySymbol', currency).data.currencySymbol;
//				Util.log('saving '+cbMaxDamagePerEventCurrency.getValue()+'='+cbMaxDamagePerEventCurrency.getStore().getById(currency).data.currencySymbol);

				
				
				this.editedMassnahmen[rowIndex].currency = currencySymbol;//'';//currency;//weder currencyId/currencyName k�nnen gesichert werden. cbMaxDamagePerEventCurrency.getValue(); --> 1,2,3: ORA-20000: Invalid currency,ORA-06512: at "TBADM.TRG_045_BIU", line 109,ORA-04088: error during execution of trigger 'TBADM.TRG_045_BIU'
				this.editedMassnahmen[rowIndex].mitigationPotential = tfMitigationPotential.getValue().length > 0 ? parseInt(tfMitigationPotential.getValue()) : '';
				this.editedMassnahmen[rowIndex].expense = tfDamagePerYear.getValue();
				
				
				var pRiskAnalysisAndMgmtFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtFreeText');
				var taOccurenceOfDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pOccurenceOfDamagePerYear2').getComponent('taOccurenceOfDamagePerYear2');
				var taMaxDamagePerEvent2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMaxDamagePerEvent2').getComponent('taMaxDamagePerEvent2');
				var taMitigationPotential2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMitigationPotential2').getComponent('taMitigationPotential2');
				var taDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2');
				
				this.editedMassnahmen[rowIndex].probOccurenceText = taOccurenceOfDamagePerYear2.getValue();
				this.editedMassnahmen[rowIndex].damageText = taMaxDamagePerEvent2.getValue();
				this.editedMassnahmen[rowIndex].mitigationPotentialText = taMitigationPotential2.getValue();
				this.editedMassnahmen[rowIndex].expenseText = taDamagePerYear2.getValue();
				
				
				var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
//				var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
				var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('cbSignee');
				var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
				
//				this.editedMassnahmen[rowIndex].signee = tfSignee.getValue();
				this.editedMassnahmen[rowIndex].signee = cbSignee.getValue().length == 0 ? cbSignee.getValue() : this.getSigneeCwid(cbSignee);//cbSignee.cwid;//cbSignee.getValue();
				this.editedMassnahmen[rowIndex].gapClassApproved = dfDateOfApproval.getValue() ? dfDateOfApproval.getValue().getTime() : -1;//-1 f�r SoapProxy, bei null statt -1 kommt JS Fehler
			}
		}
	},
	
	updateComplianceDetails: function(massnahme) {//compliantStatus, justification
		var fsComplianceStatement = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement');
		var cbCompliantStatus = fsComplianceStatement.getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		var taJustification = fsComplianceStatement.getComponent('pJustification').getComponent('taJustification');

		cbCompliantStatus.setValue(massnahme.statusId);//compliantStatus
		taJustification.setValue(massnahme.statusKommentar);//justification
		
		if(!this.hasNoGapAnalysis) {
			var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
			taGapDescription.setValue(massnahme.gap);
						
			//folgendes nur wenn massnahme.statusId no/nein oder partly/tweilweise (?, Ja!). Sonst panel wieder deaktivieren
			var fsGapElimination = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination');
			var tfGapResponsible = fsGapElimination.getComponent('pGapResponsible').getComponent('tfGapResponsible');
			var taPlanOfAction = fsGapElimination.getComponent('pPlanOfAction').getComponent('taPlanOfAction');
			var cbGapClass = fsGapElimination.getComponent('pGapClass').getComponent('cbGapClass');
			var dfTargetDate = fsGapElimination.getComponent('pTargetDate').getComponent('dfTargetDate');
			
			tfGapResponsible.setValue(massnahme.gapResponsible);
			taPlanOfAction.setValue(massnahme.gapMeasure);
			if(massnahme.gapPriority != 0 || massnahme.gapPriority.length == 0) {//massnahme.gapPriority != '0' && 
				cbGapClass.setValue(massnahme.gapPriority);
			} else {
				cbGapClass.reset();
			}
			
			var date = parseInt(massnahme.gapEndDate);
			if(date > 0)
				dfTargetDate.setValue(new Date(date));
			else dfTargetDate.reset();
			
			var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
			var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');
			
			
			var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
			var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
			var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
			var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
			var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pRiskMitigation').getComponent('tfDamagePerYear');
			
			var pRiskAnalysisAndMgmtFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtFreeText');
			var taOccurenceOfDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pOccurenceOfDamagePerYear2').getComponent('taOccurenceOfDamagePerYear2');
			var taMaxDamagePerEvent2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMaxDamagePerEvent2').getComponent('taMaxDamagePerEvent2');
			var taMitigationPotential2 = pRiskAnalysisAndMgmtFreeText.getComponent('pMitigationPotential2').getComponent('taMitigationPotential2');
			var taDamagePerYear2 = pRiskAnalysisAndMgmtFreeText.getComponent('pRiskMitigation2').getComponent('taDamagePerYear2');
			
			var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
			var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('cbSignee');
//			var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
			var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');
			
			
			var gapClassId = cbGapClass.getValue();
			if(gapClassId == '4' || gapClassId == '5') {
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
				
				tfMitigationPotential.setValue(massnahme.mitigationPotential);
				tfDamagePerYear.setValue(massnahme.expense);
				
				
				taOccurenceOfDamagePerYear2.setValue(massnahme.probOccurenceText);
				taMaxDamagePerEvent2.setValue(massnahme.damageText);
				taMitigationPotential2.setValue(massnahme.mitigationPotentialText);
				taDamagePerYear2.setValue(massnahme.expenseText);
				
				cbSignee.cwid = massnahme.signee;
//				cbSignee.value = massnahme.signee;
				
				//orig

				cbSignee.setValue(massnahme.signee.length == 0 ? massnahme.signee : this.getSigneeValueByCwid(cbSignee, massnahme.signee));//setRawValue
				var isSigneeUser = cbSignee.getStore().getById(AIR.AirApplicationManager.getCwid());
				if(isSigneeUser && !this.config.hasTemplate) {
					Util.enableCombo(cbSignee);
					
					var signee = cbSignee.getValue();
					if(signee === AIR.AirApplicationManager.getCwid()) {
						Util.enableCombo(dfDateOfApproval);
					} else {
						Util.disableCombo(dfDateOfApproval);
					}
				} else {
					Util.disableCombo(cbSignee);
					Util.disableCombo(dfDateOfApproval);
				}
				//new
//				cbSignee.setValue(massnahme.signee);//setRawValue
//				cbSignee.setRawValue(massnahme.signee.length == 0 ? massnahme.signee : this.getSigneeValueByCwid(cbSignee, massnahme.signee));
				
				
//				tfSignee.setValue(massnahme.signee);
				
				var date = parseInt(massnahme.gapClassApproved);
				if(date > 0)
					dfDateOfApproval.setValue(new Date(date));
				else dfDateOfApproval.reset();
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
			
//			cbGapClass.fireEvent('select', cbGapClass);
//			this.updateRiskAnalysisAndMgmt(gapClassId);
			this.updateGapRelevance(massnahme.statusId, gapClassId);
		}
	},
	
	onMassnahmeInfoClick: function(column, grid, rowIndex, event) {
		var massnahme = grid.getStore().getAt(rowIndex);
		var x;
	},
	
	//-----------------------------------------------------------------------------------------------------------------------
	onRiskAnalysisTypeCheck: function(checkbox, isChecked) {
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
		
		if(isChecked) {
			pRiskAnalysisAndMgmtDetail.getLayout().setActiveItem('pRiskAnalysisAndMgmtFreeText');
		} else {
			pRiskAnalysisAndMgmtDetail.getLayout().setActiveItem('pRiskAnalysisAndMgmtNonFreeText');
		}
	},
	
	onGapClassSelect: function(combo, record, index) {
		var fsComplianceStatement = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement');
		var cbCompliantStatus = fsComplianceStatement.getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
		
		this.updateRiskAnalysisAndMgmt(combo.getValue(), cbCompliantStatus.getValue());
		
		this.onMassnahmeChange();
	},
	
	onMaxDamagePerEventCurrencySelect: function(combo, record, index) {
		this.onMassnahmeChange();
	},
	
	//compliantStatusId auch auswerten, wenn z.B. von no/nein auf yes/ja ge�ndert, werden die �nderungen unter no/nein
	//nicht wieder gel�scht (gewollt?). Wenn compliantStatusId yes/ja mit ausgewertet wird, kann der Risk analysis panel
	//trotzdem entfernt werden. Der Bug ist das dieser stehenbleibt trotz compliantStatus=yes/ja.
	updateRiskAnalysisAndMgmt: function(gapClassId, compliantStatusId) {
		var fsRiskAnalysisAndMgmt = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt');//.getComponent('pRiskAnalysisAndMgmtDetail');
				
		if(this.isGapRelevant(compliantStatusId)) {
			switch(gapClassId) {
				case '4':
				case '5':
					fsRiskAnalysisAndMgmt.setVisible(true);
					break;
				default:
					fsRiskAnalysisAndMgmt.setVisible(false);
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
		field.setRawValue(value);//field.setValue(value) --> Endlosschleife
		
		var isValid = parseInt(value) < AC.MAX_MITIGATION_POTENTIAL || value.length == 0;//or use var MAX_VALUES = { field.getId(): 4711, ... } to make it dynamic if needed
//		if(isValid) {
//			this.activateButtons();
//		} else {
//			this.deactivateButtons();
//		}
		
//		if(!isValid) {
//			field.reset();
//			isValid = true;
//		}
		
		return isValid;
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
		var userName = r.data.lastname + ', '+r.data.firstname;
		
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
	
	update: function() {
		//if(this.config.hasTemplate) {
			var cbCompliantStatus = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pCompliantStatus').getComponent('cbCompliantStatus');
			var taJustification = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsComplianceStatement').getComponent('pJustification').getComponent('taJustification');
			var taGapDescription = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('pGapDescription').getComponent('taGapDescription');
			var cbGapClass = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapClass').getComponent('cbGapClass');//Ext.getCmp('cbGapClass');//
			var clGapResponsibleAddPicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleAddPicker');
			var clGapResponsibleDeletePicker = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsGap').getComponent('fsGapElimination').getComponent('pGapResponsible').getComponent('clGapResponsibleDeletePicker');


			var pRiskAnalysisAndMgmtCard = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail').getComponent('pRiskAnalysisAndMgmtCard');
			var pRiskAnalysisAndMgmtNonFreeText = pRiskAnalysisAndMgmtCard.getComponent('pRiskAnalysisAndMgmtNonFreeText');

			var tfOccurenceOfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pOccurenceOfDamagePerYear').getComponent('tfOccurenceOfDamagePerYear');
			var tfMaxDamagePerEvent = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('tfMaxDamagePerEvent');
			var cbMaxDamagePerEventCurrency = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMaxDamagePerEvent').getComponent('cbMaxDamagePerEventCurrency');
			var tfMitigationPotential = pRiskAnalysisAndMgmtNonFreeText.getComponent('pMitigationPotential').getComponent('tfMitigationPotential');
			var tfDamagePerYear = pRiskAnalysisAndMgmtNonFreeText.getComponent('pRiskMitigation').getComponent('tfDamagePerYear');


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
	//		var tfSignee = pRiskAnalysisAndMgmtDetail.getComponent('pSignee').getComponent('tfSignee');
			var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('cbSignee');
			var dfDateOfApproval = pRiskAnalysisAndMgmtDetail.getComponent('pDateOfApproval').getComponent('dfDateOfApproval');

			
			/*var isSignee = cbSignee.getStore().getById(AIR.AirApplicationManager.getCwid());
			if(!isSignee) {
				Util.disableCombo(cbSignee);
				dfDateOfApproval.setHideTrigger(true);
				dfDateOfApproval.disable();
			}*/
			
			
			Util.disableCombo(cbCompliantStatus);
			taJustification.disable();
			taGapDescription.disable();
			Util.disableCombo(cbGapClass);
			clGapResponsibleAddPicker.hide();
			clGapResponsibleDeletePicker.hide();

			tfOccurenceOfDamagePerYear.disable();
			tfMaxDamagePerEvent.disable();
			Util.disableCombo(cbMaxDamagePerEventCurrency);
			tfMitigationPotential.disable();
			tfDamagePerYear.disable();

			tfGapResponsible.disable();
			taPlanOfAction.disable();
			dfTargetDate.disable();
			dfTargetDate.setHideTrigger(true);

			taOccurenceOfDamagePerYear2.disable();
			taMaxDamagePerEvent2.disable();
			taMitigationPotential2.disable();
			taDamagePerYear2.disable();

			Util.disableCombo(cbSignee);
			dfDateOfApproval.disable();
			dfDateOfApproval.setHideTrigger(true);
		//}
	},
	
	updateLabels: function(labels) {
		var pRiskAnalysisAndMgmtDetail = this.getComponent('pLayout').getComponent('pMassnahmeDetails').getComponent('fsRiskAnalysisAndMgmt').getComponent('pRiskAnalysisAndMgmtDetail');
		var cbSignee = pRiskAnalysisAndMgmtDetail.getComponent('cbSignee');
		
		Util.setFieldLabel(cbSignee, labels.complianceWindowSignee);
	}
});
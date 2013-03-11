Ext.namespace('AIR');

AIR.CiAdvancedSearchView = Ext.extend(AIR.AirView, {
	
	initComponent: function() {
		this.ownerId = 'AdvSearch';
		var options = {
			fsApplicationOwner: {
				padding: Ext.isIE ? 0 : 10
				/*items: [{
					id: 'pAdvSearchApplicationOwnerDelegate',
					style: {
						marginLeft: 5
					}
				}]*/
//				marginLeft: Ext.isIE ? 5 : 0
			},
			
			fsApplicationSteward: {
				padding: Ext.isIE ? 0 : 10
			},
			
			fsCIOwner: {
				padding: Ext.isIE ? 0 : 10
			}
		};
		
		if(Ext.isIE) {
			options.fsApplicationOwner.items = [];
			options.fsApplicationSteward.items = [];
			options.fsCIOwner.items = [];
			
			var item = {
//				id: 'pAdvSearchApplicationOwnerDelegate',
				style: {
					marginLeft: 5
				}
			};
			
			options.fsApplicationOwner.items.push(item);
			options.fsApplicationOwner.items.push(item);
			
			options.fsApplicationSteward.items.push(item);
			
			options.fsCIOwner.items.push(item);
			options.fsCIOwner.items.push(item);
		}
		
		var appOwnerStewardFieldsets = AIR.AirUiFactory.createAppOwnerStewardFieldsets(this.ownerId, options);
		
		Ext.apply(this, {
			title: 'Advanced Search',
//		    padding: 10,
		    border: false,
		    
		    layout: 'form',
//		    labelWidth: 100,
			
			autoScroll: true,
			collapsible: true,
			collapsed: false,
		    
		    bodyStyle: {
		    	backgroundColor: AC.AIR_BG_COLOR,
		    	color: AC.AIR_FONT_COLOR,
		    	fontFamily: AC.AIR_FONT_TYPE
		    },

			items: [{
				xtype: 'panel',
				id: 'pAdvSearchSingleAttrsFrame',
				layout: 'column',
				border: false,
				
				items: [{
					xtype: 'panel',
					id: 'pAdvSearchSingleAttrs',
					layout: 'form',
					
					border: false,
					labelWidth: 100,
					
					style: {
						marginTop: 15//10
					},
					
					items: [{
						xtype: 'filterCombo',//combo
						id: 'cbCiType',
					    store: AIR.AirStoreManager.getStoreByName('ciTypeListStore'),//applicationCat1ListStore
						
					    fieldLabel: 'Type',
					    valueField: 'id',//id ciTypeName
				        displayField: 'text',//english ciTypeName
				        width: 240,

		//			        typeAhead: true,
		//			        autoSelect: false,
		//			        triggerAction: 'all',
				        
				        forceSelection: true,
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local'
				    },{
						xtype: 'filterCombo',
						id: 'cbAdvSearchITset',
						store: AIR.AirStoreManager.getStoreByName('itSetListStore'),
						
					    fieldLabel: 'IT Set',
					    valueField: 'id',
				        displayField: 'text',
				        width: 240,
				        
		//			        typeAhead: true,
		//			        autoSelect: false,
		//			        triggerAction: 'all',
				        
				        forceSelection: true,
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local'
				    },{
			        	xtype: 'textfield',
			        	id: 'advsearchdescription',
			        	
			        	width: 240,
			        	hidden: false,
			        	hasSearch: false,
			        	
			        	//um zu verhindern, dass die Labels der cbAdvSearchITset und cbCiType ungewollt verschwinden,
			        	//wenn rgAdvSearchBARrelevance und advsearchdescription aufgrund der entspr. CI-Typen
			        	//ausgeblendet werden
			        	hideMode: 'visibility'
			        },{
			            xtype: 'radiogroup',
		    			id: 'rgAdvSearchBARrelevance',
		    			width: 240,
		    			fieldLabel: 'BAR relevant',
		    			
		    			columns: 3,
//		    			hideMode: 'visibility',
		
			            items: [
		                    { id: 'rgAdvSearchBARrelevanceYes',		itemId: 'rgAdvSearchBARrelevanceYes', 			boxLabel: 'Yes',		name: 'rgAdvSearchBARrelevance', inputValue: 'Y', width: 80 },//, width: 80 wenn gedatscht
			                { id: 'rgAdvSearchBARrelevanceNo',		itemId: 'rgAdvSearchBARrelevanceNo',			boxLabel: 'No',			name: 'rgAdvSearchBARrelevance', inputValue: 'N', width: 80 },
			                { id: 'rgAdvSearchBARrelevanceUndefined',itemId: 'rgAdvSearchBARrelevanceUndefined', 	boxLabel: 'Undefined',	name: 'rgAdvSearchBARrelevance', inputValue: 'U', width: 80 }//, checked: true
			            ]
			        }/*,{
//			        	xtype: 'textfield',
//			        	width: 240,
//			        	hidden: true
			        	xtype: 'spacer',
			        	width: 240
			        }*/]
				}, {
					xtype: 'panel',
					id: 'pAdvSearchSingleAttrsOptions',
					layout: 'form',
					border: false,
					
	    			style: {
						marginLeft: 10
//						marginTop: 10
					},
					
					items: [{
						xtype: 'label',
						id: 'lCiTypeOptions',
						text: 'not',
						
		    			style: {
							fontSize: 10
						}
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchCiTypeOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 5
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchCiTypeOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchItSetOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 10
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchItSetOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchDescriptionOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 10
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchDescriptionOptions', width: 30 }
	                    ]
					}/*,{
						xtype: 'spacer'
//						id: 'sAdvSearchCIOwnerOptions',
//		    			style: {
//							marginTop: 35
//						}
					}*//*,{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchSpace',
		    			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchSpace', width: 30 }
	                    ],
		                    
		    			hidden: true
					}*/]
				}]
		    }, {
				xtype: 'panel',
				id: 'pAdvSearchAppOwnerFrame',
				layout: 'column',
				border: false,
				
    			style: {
		    		marginTop: 10//marginBottom
				},
				
				items: [
			        appOwnerStewardFieldsets.fsApplicationOwner,
		        {
					xtype: 'panel',
					id: 'pAdvSearchAppOwnerOptions',
					layout: 'form',
					
	    			style: {
						marginLeft: 10
//						marginTop: 10
					},
					
					border: false,
					
					items: [{
						xtype: 'label',
						id: 'lAdvSearchAppOwnerOptions',
						text: 'not',
						
		    			style: {
							fontSize: 10,
							marginTop: 15
						}
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchAppOwnerOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 20
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchAppOwnerOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchAppOwnerDelegateOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 10
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchAppOwnerDelegateOptions', width: 30 }
	                    ]
					}]
				}]
		    },{
				xtype: 'panel',
				id: 'pAdvSearchAppStewardFrame',
				layout: 'column',
				border: false,
				
				style: {
		    		marginTop: 10//marginBottom
				},
				
				items: [
		        	appOwnerStewardFieldsets.fsApplicationSteward,
		        {
					xtype: 'panel',
					id: 'pAdvSearchAppStewardOptions',
					layout: 'form',
					
	    			style: {
						marginLeft: 10
//						marginTop: 10
					},
					
					border: false,
					
					items: [/*{
						xtype: 'label',
						id: 'lAdvSearchAppStewardOptions',
						text: 'not',
						
						hidden: true,
						
		    			style: {
							fontSize: 10,
							marginTop: 5
						}
					},*/{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchAppStewardOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: Ext.isIE ? 10 : 20
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchAppStewardOptions', width: 30 }
	                    ]
					}]
				}]
		    },{
				xtype: 'panel',
				id: 'pAdvSearchCIOwnerFrame',
				layout: 'column',
				border: false,
				
    			style: {
					marginTop: 10//marginBottom
				},
				
				items: [
			        appOwnerStewardFieldsets.fsCIOwner,
		        {
					xtype: 'panel',
					id: 'pAdvSearchCIOwnerOptions',
					layout: 'form',
					
	    			style: {
						marginLeft: 10
//						marginTop: 10
					},
					
					border: false,
					
					items: [{
						xtype: 'label',
						id: 'lAdvSearchCIOwnerOptions',
						text: 'not',
						
						hidden: true,
						
		    			style: {
							fontSize: 10
//							marginTop: 10
						}
					},{
						xtype: 'spacer',
						id: 'sAdvSearchCIOwnerOptions',
		    			style: {
							marginTop: 35
						}
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchCIOwnerOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 25
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchCIOwnerOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchCIOwnerDelegateOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 10
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchCIOwnerDelegateOptions', width: 30 }
	                    ]
					}]
				}]
	    	},{
	        	xtype: 'panel',
	        	id: 'pAdditionalSearchAttributes',
	        	layout: 'column',//column hbox
	        	border: false,
	        	
	        	style: {
	    			marginTop: 20
	    		},
	        		
	        	items: [{
					xtype: 'fieldset',
					id: 'fsCategoriesAndStatus',
					title: 'Categories and Status',//Kategorien und Status; Advanced Search Plus
					
					layout: 'form',
					width: 430,
					padding: Ext.isIE ? 0 : 10,

					//hidden: true,
					
					style: {
	        			marginTop: 10,
		    			paddingLeft: Ext.isIE ? 5 : 0
//						marginRight: 10,
//						marginBottom: 10
					},
					
					layout: 'form',//form fit
					labelWidth: 150,
//				    width: 300,
					
					items: [{
						xtype: 'filterCombo',
						id: 'cbAdvSearchGeneralUsageW',
						store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),
						width: 230,

						fieldLabel: 'General Usage',
						valueField: 'id',
						displayField: 'text',
						
//				        typeAhead: true,
//				        forceSelection: true,
//				        autoSelect: false,
						
//						style: {
//							marginLeft: Ext.isIE ? 5 : 0//20//
//						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					},{
						xtype: 'filterCombo',
						id: 'cbAdvSearchITCategoryW',
						store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),
						width: 230,

						fieldLabel: 'IT Category',
						valueField: 'id',
						displayField: 'text',
						
//				        typeAhead: true,
//				        forceSelection: true,
//				        autoSelect: false,
						
//						style: {
//							marginLeft: Ext.isIE ? 5 : 0
//						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					}, {
						xtype: 'filterCombo',
						id: 'cbAdvSearchLifecycleStatusW',
						store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),
						width: 230,
						
						fieldLabel: 'Lifecycle status',
						valueField: 'id',
						displayField: 'text',
						
//				        typeAhead: true,
//				        forceSelection: true,
//				        autoSelect: false,
						
//						style: {
//							marginLeft: Ext.isIE ? 5 : 0
//						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					},{
				        xtype: 'listview',
				        width: 80,

				        border: false,
				        fieldLabel: 'Organisational scope',

				        id: 'lvAdvSearchOrganisationalScope',
				        store: AIR.AirStoreManager.getStoreByName('organisationalScopeListStore'),
				        
//				        style: {
//							marginLeft: Ext.isIE ? 5 : 0
//						},
				        
				        singleSelect: false,
				        multiSelect: true,
				        simpleSelect: true,
				        hideHeaders: true,
				        
				        columns: [
							{dataIndex: 'id', hidden: true, hideLabel: true, width: .001},
							{dataIndex: 'name'}
				        ]
					}]
				},{
					xtype: 'panel',
					id: 'pAdvSearchCategoriesAndStatusOptions',
					layout: 'form',
					
	    			style: {
						marginLeft: 10
//						marginTop: 10
					},
					
					border: false,
					
					items: [{
						xtype: 'label',
						id: 'lAdvSearchCategoriesAndStatusOptions',
						text: 'not',
						
		    			style: {
							fontSize: 10,
							marginTop: 15
						}
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchCategoriesAndStatusGeneralUsageOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 25
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchCategoriesAndStatusGeneralUsageOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchCategoriesAndStatusITCategoryOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: Ext.isIE ? 5 : 8
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchCategoriesAndStatusITCategoryOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: Ext.isIE ? 5 : 8
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: Ext.isIE ? 5 : 8
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions', width: 30 }
	                    ]
					}]
				},{
					xtype: 'fieldset',
					id: 'fsSpecialSearchAttributes',
					title: 'Other Search Attributes',
					
					layout: 'form',
	//				columnWidth: 0.33,//0.45
					width: 480,

					padding: Ext.isIE ? 0 : 10,
	//			    hidden: true,
					
					style: {
	        			marginTop: 10,
		    			paddingLeft: Ext.isIE ? 5 : 0
					},
					
					layout: 'form',//form fit
					labelWidth: 120,
	//			    width: 300,

					
					items: [{
						xtype: 'filterCombo',
						id: 'cbAdvSearchITSecGroupW',
						store: AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),//new Ext.data.Store(),//
						width: 300,

						fieldLabel: 'ITSec Group',
						valueField: 'id',
						displayField: 'name',
						
	//			        typeAhead: true,
	//			        forceSelection: true,
	//			        autoSelect: false,
						
				        style: {
							marginLeft: Ext.isIE ? 5 : 0
						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					},{
						xtype: 'filterCombo',
						id: 'cbAdvSearchProcessW',
						store: AIR.AirStoreManager.getStoreByName('processListStore'),
					    fieldLabel: 'Business Prozess',

				        tpl: '<tpl for="."><div ext:qtip="{text}" class="x-combo-list-item">{text}</div></tpl>',
						valueField: 'id',
						displayField: 'text',
						width: 300,

	//			        typeAhead: true,
	//			        forceSelection: true,
	//			        autoSelect: false,
						
				        style: {
							marginLeft: Ext.isIE ? 5 : 0
						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					}/*,{
						xtype: 'filterCombo',
						id: 'cbAdvSearchOStypeW',
						store: AIR.AirStoreManager.getStoreByName('sisoogleOsTypeListStore'),//new Ext.data.Store(),//
						width: 300,

						fieldLabel: 'OS type',
						valueField: 'id',
						displayField: 'name',
						
	//			        typeAhead: true,
	//			        forceSelection: true,
	//			        autoSelect: false,
	
				        style: {
							marginLeft: Ext.isIE ? 5 : 0
						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					},{
						xtype: 'filterCombo',
						id: 'cbAdvSearchOSnameW',
						store: AIR.AirStoreManager.getStoreByName('sisoogleOsNameListStore'),//new Ext.data.Store(),//
						width: 300,

						fieldLabel: 'OS name',
						valueField: 'id',
						displayField: 'name',
						
	//			        typeAhead: true,
	//			        forceSelection: true,
	//			        autoSelect: false,
	
				        style: {
							marginLeft: Ext.isIE ? 5 : 0
						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					}*/,{
						xtype: 'filterCombo',
						id: 'cbAdvSearchSourceW',
						store: AIR.AirStoreManager.getStoreByName('sisoogleSourceListStore'),//new Ext.data.Store(),//
						width: 300,

						fieldLabel: 'Source',
						valueField: 'id',
						displayField: 'name',
						
	//			        typeAhead: true,
	//			        forceSelection: true,
	//			        autoSelect: false,
						
				        style: {
							marginLeft: Ext.isIE ? 5 : 0
						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					},{
						xtype: 'filterCombo',
						id: 'cbAdvSearchBusinessEssentialW',
						store: AIR.AirStoreManager.getStoreByName('businessEssentialListStore'),
						width: 300,

						fieldLabel: 'Business Essential',
						valueField: 'id',
						displayField: 'text',
						
	//			        typeAhead: true,
	//			        forceSelection: true,
	//			        autoSelect: false,
						
				        style: {
							marginLeft: Ext.isIE ? 5 : 0
						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					}/*,{
						xtype: 'filterCombo',
						id: 'cbAdvSearchGapResponsibleW',
						store: AIR.AirStoreManager.getStoreByName('sisoogleGapResponsibleListStore'),//new Ext.data.Store(),//
						width: 300,

						fieldLabel: 'Gap Responsible',
						valueField: 'id',
						displayField: 'name',
						
	//			        typeAhead: true,
	//			        forceSelection: true,
	//			        autoSelect: false,
	
				        style: {
							marginLeft: Ext.isIE ? 5 : 0
						},
						
						triggerAction: 'all',
						lazyRender: true,
						lazyInit: false,
						mode: 'local'
					},{
						xtype: 'datefield',
						id: 'dfAdvSearchTargetDate',
						fieldLabel: 'Gap End Date',
						width: 150
					}*/]
				},{
					xtype: 'panel',
					id: 'pAdvSearchSpecialSearchAttributesOptions',
					layout: 'form',
					
	    			style: {
						marginLeft: 10
//						marginTop: 10
					},
					
					border: false,
					
					items: [{
						xtype: 'label',
						id: 'lAdvSearchSpecialSearchAttributesOptions',
						text: 'not',
						
		    			style: {
							fontSize: 10,
							marginTop: 15
						}
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchSpecialSearchAttributesITSecGroupOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: 25
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchSpecialSearchAttributesITSecGroupOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchSpecialSearchAttributesProcessOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: Ext.isIE ? 5 : 8
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchSpecialSearchAttributesProcessOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchSpecialSearchAttributesSourceOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: Ext.isIE ? 5 : 8
						},
						
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchSpecialSearchAttributesSourceOptions', width: 30 }
	                    ]
					},{
			            xtype: 'checkboxgroup',
		    			id: 'cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions',
		    			
		    			columns: 1,
		    			
		    			hideLabel: true,
		    			style: {
							marginTop: Ext.isIE ? 5 : 8
						},
	        			
	        			items: [
							{ boxLabel: '', name: 'cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions', width: 30 }
	                    ]
					}]
				}]
	        }]
		});
		
		AIR.CiAdvancedSearchView.superclass.initComponent.call(this);
		
		var cbCiType = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType');
		cbCiType.on('select', this.onCiTypeSelect, this);//select beforeselect
		cbCiType.on('change', this.onCiTypeChange, this);
		
		var cbAdvSearchITset = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbAdvSearchITset');
		cbAdvSearchITset.on('change', this.onItSetChange, this);
		cbAdvSearchITset.on('select', this.onItSetChange, this);

		
		var cbAdvSearchGeneralUsageW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchGeneralUsageW');
		cbAdvSearchGeneralUsageW.on('change', this.onComboChange, this);

		var cbCat2 = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
		cbCat2.on('change', this.onComboChange, this);//onCat2Change
		
		var cbAdvSearchLifecycleStatusW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchLifecycleStatusW');
		cbAdvSearchLifecycleStatusW.on('change', this.onComboChange, this);
		
		
		var cbAdvSearchITSecGroupW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchITSecGroupW');
		cbAdvSearchITSecGroupW.on('change', this.onComboChange, this);
		var cbAdvSearchProcessW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchProcessW');
		cbAdvSearchProcessW.on('change', this.onComboChange, this);
//		var cbAdvSearchOStypeW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchOStypeW');
//		cbAdvSearchOStypeW.on('change', this.onComboChange, this);
//		var cbAdvSearchOSnameW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchOSnameW');
//		cbAdvSearchOSnameW.on('change', this.onComboChange, this);
		var cbAdvSearchSourceW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchSourceW');
		cbAdvSearchSourceW.on('change', this.onComboChange, this);
		var cbAdvSearchBusinessEssentialW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchBusinessEssentialW');
		cbAdvSearchBusinessEssentialW.on('change', this.onComboChange, this);
//		var cbAdvSearchGapResponsibleW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchGapResponsibleW');
//		cbAdvSearchGapResponsibleW.on('change', this.onComboChange, this);
//		var dfAdvSearchTargetDate = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('dfAdvSearchTargetDate');
//		dfAdvSearchTargetDate.on('change', this.onComboChange, this);
		
		var lvAdvSearchOrganisationalScope = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('lvAdvSearchOrganisationalScope');
		lvAdvSearchOrganisationalScope.on('selectionchange', this.onOrganisationalScopeChange, this);
		
		
//		var pAdvSearchAppOwner = this.getComponent('advsearchowner').getComponent('pAdvSearchAppOwner');
//		var pAdvSearchAppOwnerDelegate = this.getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate');
//		var pAdvSearchCiOwner = this.getComponent('advsearchowner').getComponent('pAdvSearchCiOwner');
//		var pAdvSearchCiOwnerDelegate = this.getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate');
//		var pAdvSearchSteward = this.getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward');		
		
		var clAdvSearchAppOwnerAddPerson = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerAdd');//pAdvSearchAppOwner.getComponent('clAdvSearchAppOwnerAddPerson');
		var clAdvSearchAppOwnerRemove = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerRemove');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddPerson');

		var clAdvSearchAppOwnerDelegateAddPerson = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateAdd');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddPerson');
		var clAdvSearchAppOwnerDelegateAddGroup = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateAddGroup');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddGroup');
		var clAdvSearchAppOwnerDelegateRemove = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateRemove');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddPerson');
		
		var clAdvSearchStewardAddPerson = this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardAdd');//pAdvSearchSteward.getComponent('clAdvSearchStewardAddPerson');
		var clAdvSearchStewardRemove = this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardRemove');//pAdvSearchSteward.getComponent('clAdvSearchStewardAddPerson');
		
		var clAdvSearchCiOwnerAddPerson = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleAdd');//pAdvSearchAppOwner.getComponent('clAdvSearchAppOwnerAddPerson');//pAdvSearchCiOwner.getComponent('clAdvSearchCiOwnerAddPerson');
		var clAdvSearchCiOwnerRemove = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleRemove');//pAdvSearchAppOwner.getComponent('clAdvSearchAppOwnerAddPerson');//pAdvSearchCiOwner.getComponent('clAdvSearchCiOwnerAddPerson');
		
		var clAdvSearchCiOwnerDelegateAddPerson = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleAdd');//pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddPerson');
		var clAdvSearchCiOwnerDelegateAddGroup = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleAddGroup');//pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddGroup');
		var clAdvSearchCiOwnerDelegateRemove = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleRemove');//pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddPerson');		

		
		clAdvSearchAppOwnerAddPerson.on('click', this.onAdvSearchAppOwnerAddPerson, this);
		clAdvSearchAppOwnerRemove.on('click', this.onAdvSearchAppOwnerRemove, this);
		
		clAdvSearchAppOwnerDelegateAddPerson.on('click', this.onAdvSearchAppOwnerDelegateAddPerson, this);
		clAdvSearchAppOwnerDelegateAddGroup.on('click', this.onAdvSearchAppOwnerDelegateAddGroup, this);
		clAdvSearchAppOwnerDelegateRemove.on('click', this.onAdvSearchAppOwnerDelegateRemove, this);
		
		clAdvSearchStewardAddPerson.on('click', this.onAdvSearchStewardAddPerson, this);
		clAdvSearchStewardRemove.on('click', this.onAdvSearchStewardRemove, this);

		clAdvSearchCiOwnerAddPerson.on('click', this.onAdvSearchCiOwnerAddPerson, this);
		clAdvSearchCiOwnerRemove.on('click', this.onAdvSearchCiOwnerRemove, this);
		
		clAdvSearchCiOwnerDelegateAddPerson.on('click', this.onAdvSearchCiOwnerDelegateAddPerson, this);
		clAdvSearchCiOwnerDelegateAddGroup.on('click', this.onAdvSearchCiOwnerDelegateAddGroup, this);
		clAdvSearchCiOwnerDelegateRemove.on('click', this.onAdvSearchCiOwnerDelegateRemove, this);
	},
	
	filterCiTypesByUserRole: function(cbCiType) {
		var isApplicationAllowed = AAM.hasRole(AC.USER_ROLE_AIR_DEFAULT) || AAM.hasRole(AC.USER_ROLE_AIR_APPLICATION_LAYER) || AAM.hasRole(AC.USER_ROLE_AIR_APPLICATION_MANAGER) || AAM.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR);
		var isInfrastructureAllowed = AAM.hasRole(AC.USER_ROLE_AIR_DEFAULT) || AAM.hasRole(AC.USER_ROLE_AIR_INFRASTRUCTURE_LAYER) || AAM.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR);
		
		var filterFn = function(record, id) {
			var tableId = record.get('ciTypeId');
			
			switch(tableId) {
				case AC.TABLE_ID_APPLICATION:
					return isApplicationAllowed;
				case AC.TABLE_ID_IT_SYSTEM:
				case AC.TABLE_ID_ROOM:
				case AC.TABLE_ID_BUILDING:
				case AC.TABLE_ID_SITE:
				case AC.TABLE_ID_POSITION:
				case AC.TABLE_ID_HARDWARE_COMPONENT:
				case AC.TABLE_ID_TERRAIN:
				case AC.TABLE_ID_WAY:
				case AC.TABLE_ID_BUILDING_AREA:
				case AC.TABLE_ID_SERVICE:
					return isInfrastructureAllowed;
				default: return false;
			}
		};//.createDelegate(this)
		
		cbCiType.getStore().filterBy(filterFn);
		cbCiType.view.refresh();
	},
	
	onOrganisationalScopeChange: function(listview, selections) {
		AIR.CiDetailsCommon.orgScopeChange(listview, selections);
	},
	
	onCiTypeSelect: function(combo, record, options) {
//		var cbAdvSearchITCategoryW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
//
//		var filterData = {
//			applicationCat1Id: record.get('id')
//		};
//		cbAdvSearchITCategoryW.filterByData(filterData);
//		cbAdvSearchITCategoryW.clearValue();
		
		this.processCiTypeChange(combo, record.get('id'));
	},
	onCiTypeChange: function(combo, newValue, oldValue) {
		this.isComboValueValid(combo, newValue, oldValue);
		this.processCiTypeChange(combo, newValue);
	},
	
	onItSetChange: function(combo) {//, record, options
		var cbAdvSearchITSecGroupW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchITSecGroupW');
		var cbCiType = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType');
		var record = cbCiType.getStore().getById(cbCiType.getValue());
		this.filterItSecGroup(cbAdvSearchITSecGroupW, combo.getValue(), record);
	},
	
	processCiTypeChange: function(cbCiType, newValue) {
//		cbCiType.view.refresh();
		var cbAdvSearchITCategoryW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
		
		
		var record;
		if(typeof newValue == 'number') {
			cbAdvSearchITCategoryW.setVisible(true);

			record = cbCiType.getStore().getById(newValue);
			if(record && record.get('ciTypeId') === AC.TABLE_ID_APPLICATION) {//newValue.length === 0
				var filterData = {
					applicationCat1Id: record.get('ciSubTypeId')
				};
//				cbAdvSearchITCategoryW.reset();
				cbAdvSearchITCategoryW.filterByData(filterData);
			} else {
//				cbAdvSearchITCategoryW.reset();
			}
		} else {
			cbAdvSearchITCategoryW.setVisible(false);
//			cbAdvSearchITCategoryW.reset();
		}
		cbAdvSearchITCategoryW.reset();
		
    	
    	var fsCIOwner = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner');
    	var fsApplicationOwner = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner');
    	var fsApplicationSteward = this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward');
    	var pAdvSearchAppOwnerOptions = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('pAdvSearchAppOwnerOptions');
    	var pAdvSearchAppStewardOptions = this.getComponent('pAdvSearchAppStewardFrame').getComponent('pAdvSearchAppStewardOptions');
//    	var lAdvSearchAppStewardOptions = pAdvSearchAppStewardOptions.getComponent('lAdvSearchAppStewardOptions');
    	var lAdvSearchCIOwnerOptions = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('pAdvSearchCIOwnerOptions').getComponent('lAdvSearchCIOwnerOptions');
    	var sAdvSearchCIOwnerOptions = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('pAdvSearchCIOwnerOptions').getComponent('sAdvSearchCIOwnerOptions');
    	
    	var lAdvSearchSingleAttrs = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('lAdvSearchSingleAttrs');
    	var rgAdvSearchBARrelevance = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('rgAdvSearchBARrelevance');
    	var lvAdvSearchOrganisationalScope = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('lvAdvSearchOrganisationalScope');
    	var cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchCategoriesAndStatusOptions').getComponent('cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions');
    	
    	
    	var labels = AIR.AirApplicationManager.getLabels();
    	var label = labels.label_details_ciOwner;
    	
    	
    	//------------------------------------------------------------------------------------------
    	//NEU
    	var pAdvSearchSingleAttrsFrame = this.getComponent('pAdvSearchSingleAttrsFrame');
    	var tfDescription = pAdvSearchSingleAttrsFrame.getComponent('pAdvSearchSingleAttrs').getComponent('advsearchdescription');
    	var cbgAdvSearchDescriptionOptions = pAdvSearchSingleAttrsFrame.getComponent('pAdvSearchSingleAttrsOptions').getComponent('cbgAdvSearchDescriptionOptions');
    	
    	
//    	var cbAdvSearchITCategoryW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
    	var fsCategoriesAndStatus = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
    	var fsSpecialSearchAttributes = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
    	
    	var pAdvSearchCategoriesAndStatusOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchCategoriesAndStatusOptions');
    	var pAdvSearchSpecialSearchAttributesOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchSpecialSearchAttributesOptions');
    	
    	var cbAdvSearchProcessW = fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW');
    	var cbgAdvSearchSpecialSearchAttributesProcessOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesProcessOptions');
    	var cbAdvSearchBusinessEssentialW = fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW');
    	var cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions');

    	
    	
    	//2: wenn kein CI-Typ oder wenn Anwendung CI-Typ mit appCat1 = 5 (Anwendung)
    	//1: wenn kein CI-Typ oder wenn Anwendung CI-Typ mit appCat1 != 5 (Anwendung) 
    	//0: alle anderen Lokation CI-Typen
    	var searchMode = !record || record.get('ciSubTypeId') == AC.APP_CAT1_APPLICATION ? 2 : 
						 record.get('ciTypeId') == AC.TABLE_ID_APPLICATION ? 1 : 0;
    	var isActive = false;
    	
    	switch(searchMode) {
    		case 2://ANWENDUNG::Application
    			label = labels.applicationManager;
    			isActive = true;

    			tfDescription.setVisible(true);
    			cbgAdvSearchDescriptionOptions.setVisible(true);
    			rgAdvSearchBARrelevance.setVisible(true);
//    			cbAdvSearchITCategoryW.setVisible(true);
    			
    			fsCategoriesAndStatus.setVisible(true);
    			pAdvSearchCategoriesAndStatusOptions.setVisible(true);
    			cbAdvSearchProcessW.setVisible(true);
    			cbgAdvSearchSpecialSearchAttributesProcessOptions.setVisible(true);
    			
				cbAdvSearchBusinessEssentialW.setVisible(true);
				cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions.setVisible(true);
    			break;
    		case 1://ANWENDUNG::non Application
    			tfDescription.setVisible(true);
    			cbgAdvSearchDescriptionOptions.setVisible(true);
    			rgAdvSearchBARrelevance.setVisible(false);
//    			cbAdvSearchITCategoryW.setVisible(true);
    			
    			fsCategoriesAndStatus.setVisible(true);
    			pAdvSearchCategoriesAndStatusOptions.setVisible(true);
    			
    			cbAdvSearchProcessW.setVisible(false);
    			cbgAdvSearchSpecialSearchAttributesProcessOptions.setVisible(false);
				cbAdvSearchBusinessEssentialW.setVisible(true);
				cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions.setVisible(true);
    			break;
    		case 0://non ANWENDUNG
    			tfDescription.setVisible(false);
    			cbgAdvSearchDescriptionOptions.setVisible(false);
    			rgAdvSearchBARrelevance.setVisible(false);
    			
//    			cbAdvSearchITCategoryW.setVisible(false);
    			fsCategoriesAndStatus.setVisible(false);
    			pAdvSearchCategoriesAndStatusOptions.setVisible(false);
    			cbAdvSearchProcessW.setVisible(false);
    			cbgAdvSearchSpecialSearchAttributesProcessOptions.setVisible(false);
    			
    			var tableId = record.get('ciTypeId');
    			if(tableId == AC.TABLE_ID_ROOM || tableId == AC.TABLE_ID_POSITION) {
    				cbAdvSearchBusinessEssentialW.setVisible(true);
    				cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions.setVisible(true);
    			} else {
    				cbAdvSearchBusinessEssentialW.setVisible(false);
    				cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions.setVisible(false);
    			}
    			break;
    	}
    	
    	fsCIOwner.setTitle(label);
		fsApplicationOwner.setVisible(isActive);
		fsApplicationSteward.setVisible(isActive);
		
		pAdvSearchAppOwnerOptions.setVisible(isActive);
		pAdvSearchAppStewardOptions.setVisible(isActive);
		
		lAdvSearchCIOwnerOptions.setVisible(!isActive);
		sAdvSearchCIOwnerOptions.setVisible(isActive);

//		rgAdvSearchBARrelevance.setVisible(isActive);
		lvAdvSearchOrganisationalScope.setVisible(isActive);
		cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions.setVisible(isActive);
		
		var cbAdvSearchITset = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbAdvSearchITset');
		var cbAdvSearchITSecGroupW = fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW');
		this.filterItSecGroup(cbAdvSearchITSecGroupW, cbAdvSearchITset.getValue(), record);
		//------------------------------------------------------------------------------------------
    	
    	
    	//ORIG:
//    	var isCat1AppOrNone = !record || record.get('ciSubTypeId') == AC.APP_CAT1_APPLICATION ? true : false;
    	
    	//zuvor auskommentiert
	//    	if(isApplication) {
	//			label = labels.applicationManager;
	//		} else {
	//			if(typeof newValue == 'number')
	//				isCat1AppOrNone = false;
	//		}
    	
//    	
//    	fsCIOwner.setTitle(label);
//		fsApplicationOwner.setVisible(isCat1AppOrNone);
//		fsApplicationSteward.setVisible(isCat1AppOrNone);
//		
//		pAdvSearchAppOwnerOptions.setVisible(isCat1AppOrNone);
////		pAdvSearchAppOwnerOptions.getComponent('lAdvSearchAppOwnerOptions').setVisible(true);
//		pAdvSearchAppStewardOptions.setVisible(isCat1AppOrNone);
//		
//		lAdvSearchCIOwnerOptions.setVisible(!isCat1AppOrNone);
//		sAdvSearchCIOwnerOptions.setVisible(isCat1AppOrNone);
//
//		rgAdvSearchBARrelevance.setVisible(isCat1AppOrNone);
//		lvAdvSearchOrganisationalScope.setVisible(isCat1AppOrNone);
//		cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions.setVisible(isCat1AppOrNone);
		
    	this.doLayout();
	},
	
	
	onComboChange: function(combo, newValue, oldValue) {//onCat2Change
		this.isComboValueValid(combo, newValue, oldValue);
	},
	
	onAdvSearchAppOwnerAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner'), event);
	},
	onAdvSearchAppOwnerRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner'), event);
	},
	
	
	onAdvSearchAppOwnerDelegateAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate'), event);
	},
	onAdvSearchAppOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(
			null, this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate'), event, 'none');
	},
	onAdvSearchAppOwnerDelegateRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate'), event, 'none');
	},
	
	
	onAdvSearchStewardAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward'), event);
	},
	onAdvSearchStewardRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward'), event);
	},
	
	
	onAdvSearchCiOwnerAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible'), event);
	},
	onAdvSearchCiOwnerRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible'), event);
	},
	
	
	onAdvSearchCiOwnerDelegateAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible'), event);
	},
	onAdvSearchCiOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(
			null, this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible'), event, 'none');
	},
	onAdvSearchCiOwnerDelegateRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible'), event);
	},

	
	onPersonAdded: function(record, element, hiddenElement) {
		element.setValue(record.data.cwid);
	},
	
	
	filterItSecGroup: function(combo, itset, ciTypeRecord) {
		var filterData = {};
		
		if(itset)
			filterData.itsetId = itset;
	
		
		if(ciTypeRecord.get('ciTypeId') == AC.TABLE_ID_APPLICATION) {
			filterData.ciKat1 = ciTypeRecord.get('ciSubTypeId');
		} else {
			filterData.tableId = ciTypeRecord.get('ciTypeId');
		}
		
		combo.filterByData(filterData);
	},
	
	
	updateLabels: function(labels) {
		this.setTitle(labels.advsearchPanelTitle);
		
		this.setFieldLabel(this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType'), labels.cbCiType);
		this.setFieldLabel(this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('advsearchdescription'), labels.advsearchdescription);
		this.setFieldLabel(this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbAdvSearchITset'), labels.itSet);
		this.setFieldLabel(this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('rgAdvSearchBARrelevance'), labels.rgBARrelevance);
		this.setBoxLabel(this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('rgAdvSearchBARrelevance').items.items[0], labels.general_yes);
		this.setBoxLabel(this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('rgAdvSearchBARrelevance').items.items[1], labels.general_no);
		this.setBoxLabel(this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('rgAdvSearchBARrelevance').items.items[2], labels.complianceUndefined);
		
		this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent('label' + this.ownerId + 'applicationOwner').setText(labels.applicationOwner);
		this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent('label' + this.ownerId + 'applicationSteward').setText(labels.applicationSteward);
		this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent('label' + this.ownerId + 'applicationOwnerDelegate').setText(labels.applicationOwnerDelegate);

		this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent('label' + this.ownerId + 'ciResponsible').setText(labels.ciResponsible);
		this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent('label' + this.ownerId + 'ciSubResponsible').setText(labels.ciSubResponsible);

		var fsCategoriesAndStatus = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
		var fsSpecialSearchAttributes = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
		
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW'), labels.operationalStatus);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW'), labels.applicationCat2);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW'), labels.lifecycleStatus);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('lvAdvSearchOrganisationalScope'), labels.organisationalScope);
		
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW'), labels.compliance1435WindowItSecGroup);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW'), labels.businessProcess);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW'), labels.businessEssential);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW'), labels.osType);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW'), labels.osName);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW'), labels.source);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate'), labels.applicationCat2);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW'), labels.gapResponsible);
	},
	
	update: function(data) {
		var pAdvSearchSingleAttrs = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs');
		
		//CI-Typen filtern, die je nach User Rolle AirApplicationLayer, AirInfrastructureLayer, AirDefault, AirAdministrator
		//auswählbar sein sollen oder nicht. Wo Filtern? Direkt nach dem Anmelden bereits in AIRToolsWS/CiEntitiesHbn.getCiTypes
		//oder AirApplicationManager::ciTypeListStore, CiAdvancedSearchView?
	    var field = pAdvSearchSingleAttrs.getComponent('cbCiType');
//	    var value = Util.getComboRecord(field, 'text', field.getRawValue()).get('id');
	    field.setValue(data.cbCiTypesId);//value data.advsearchObjectTypeId
	    
	    field = pAdvSearchSingleAttrs.getComponent('advsearchdescription');
	    field.setValue(data.description);
	    
	    field = pAdvSearchSingleAttrs.getComponent('cbAdvSearchITset');
    	field.setValue(data.itSetId);
	    
    	var cbCiType = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType');
    	this.processCiTypeChange(cbCiType, data.cbCiTypesId);//data.advsearchObjectTypeId
    	
    	
		var pAdvSearchSingleAttrsOptions = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrsOptions');
		var cbgAdvSearchCiTypeOptions = pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchCiTypeOptions');
		var cbgAdvSearchItSetOptions = pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchItSetOptions');
		var cbgAdvSearchDescriptionOptions = pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchDescriptionOptions');
		
    	Util.setChbGroup(cbgAdvSearchCiTypeOptions, data.ciTypeOptions);
    	Util.setChbGroup(cbgAdvSearchItSetOptions, data.itSetOptions);
    	Util.setChbGroup(cbgAdvSearchDescriptionOptions, data.descriptionOptions);
    	
    	
    	if(data.tableId === AC.TABLE_ID_APPLICATION && data.ciSubTypeId == AC.APP_CAT1_APPLICATION) {
//	    if(data.advsearchObjectTypeId === AC.APP_CAT1_APPLICATION || data.advsearchObjectTypeId.length === 0) {
	    	pAdvSearchSingleAttrs.getComponent('rgAdvSearchBARrelevance').setValue(data.barRelevance);

	    	var pAdvSearchAppOwnerFrame = this.getComponent('pAdvSearchAppOwnerFrame');
	    	var pAdvSearchAppStewardFrame = this.getComponent('pAdvSearchAppStewardFrame');
	    	var pAdvSearchCIOwnerFrame = this.getComponent('pAdvSearchCIOwnerFrame');
	    	

	    	
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner');
	    	if(data.advsearchappowner && data.advsearchappowner.length > 0)
	    		field.setValue(data.advsearchappowner);
	    	else field.reset();
	    	
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerHidden');
	    	if(data.advsearchappownerHidden && data.advsearchappownerHidden.length > 0)
	    		field.setValue(data.advsearchappownerHidden);
	    	else field.reset();

	    	
	    	
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate');
	    	if(data.advsearchappdelegate && data.advsearchappdelegate.length > 0)
	    		field.setValue(data.advsearchappdelegate);
	    	else field.reset();
	    	
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateHidden');
	    	if(data.advsearchappdelegateHidden && data.advsearchappdelegateHidden.length > 0)
	    		field.setValue(data.advsearchappdelegateHidden);
	    	else field.reset();

	    	
	    	
	    	field = pAdvSearchAppStewardFrame.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward');
	    	if(data.advsearchsteward && data.advsearchsteward.length > 0)
	    		field.setValue(data.advsearchsteward);
	    	else field.reset();
	    	
	    	field = pAdvSearchAppStewardFrame.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardHidden');
	    	if(data.advsearchstewardHidden && data.advsearchstewardHidden.length > 0)
	    		field.setValue(data.advsearchstewardHidden);
	    	else field.reset();
	    	
	    	
	    	
	    	var pAdvSearchAppOwnerOptions = pAdvSearchAppOwnerFrame.getComponent('pAdvSearchAppOwnerOptions');
	    	var cbgAdvSearchAppOwnerOptions = pAdvSearchAppOwnerOptions.getComponent('cbgAdvSearchAppOwnerOptions');
	    	var cbgAdvSearchAppOwnerDelegateOptions = pAdvSearchAppOwnerOptions.getComponent('cbgAdvSearchAppOwnerDelegateOptions');
	    	
	    	var pAdvSearchAppStewardOptions = pAdvSearchAppStewardFrame.getComponent('pAdvSearchAppStewardOptions');
	    	var cbgAdvSearchAppStewardOptions = pAdvSearchAppStewardOptions.getComponent('cbgAdvSearchAppStewardOptions');

			var pAdvSearchCIOwnerOptions = pAdvSearchCIOwnerFrame.getComponent('pAdvSearchCIOwnerOptions');
			var cbgAdvSearchCIOwnerOptions = pAdvSearchCIOwnerOptions.getComponent('cbgAdvSearchCIOwnerOptions');
			var cbgAdvSearchCIOwnerDelegateOptions = pAdvSearchCIOwnerOptions.getComponent('cbgAdvSearchCIOwnerDelegateOptions');
	    	
			
			Util.setChbGroup(cbgAdvSearchAppOwnerOptions, data.appOwnerOptions);
	    	Util.setChbGroup(cbgAdvSearchAppOwnerDelegateOptions, data.appOwnerDelegateOptions);
	    	
	    	Util.setChbGroup(cbgAdvSearchAppStewardOptions, data.appStewardOptions);
	    	
	    	Util.setChbGroup(cbgAdvSearchCIOwnerOptions, data.ciOwnerOptions);
	    	Util.setChbGroup(cbgAdvSearchCIOwnerDelegateOptions, data.ciOwnerDelegateOptions);
	    }
	    
    	
    	field = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible');
    	if(data.advsearchciowner && data.advsearchciowner.length > 0)
    		field.setValue(data.advsearchciowner);
    	else field.reset();
    	
    	field = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleHidden');
    	if(data.advsearchciownerHidden && data.advsearchciownerHidden.length > 0)
    		field.setValue(data.advsearchciownerHidden);
    	else field.reset();
    	
	    
    	
    	field = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible');
    	if(data.advsearchcidelegate && data.advsearchcidelegate.length > 0)
    		field.setValue(data.advsearchcidelegate);
    	else field.reset();
    	
    	field = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleHidden');
    	if(data.advsearchcidelegateHidden && data.advsearchcidelegateHidden.length > 0)
    		field.setValue(data.advsearchcidelegateHidden);
    	else field.reset();
    	
	    
	    
	    var pAdditionalSearchAttributes = this.getComponent('pAdditionalSearchAttributes');
	    
	    if(data.isAdvSearchExt) {//this.
	    	var fsCategoriesAndStatus = pAdditionalSearchAttributes.getComponent('fsCategoriesAndStatus');
	    	var fsSpecialSearchAttributes = pAdditionalSearchAttributes.getComponent('fsSpecialSearchAttributes');
	    	
	    	
			var pAdvSearchCategoriesAndStatusOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchCategoriesAndStatusOptions');
			var pAdvSearchSpecialSearchAttributesOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchSpecialSearchAttributesOptions');
	    	
			var cbgAdvSearchCategoriesAndStatusGeneralUsageOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusGeneralUsageOptions');
			var cbgAdvSearchCategoriesAndStatusITCategoryOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusITCategoryOptions');
			var cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions');
			var cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions');

			var cbgAdvSearchSpecialSearchAttributesITSecGroupOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesITSecGroupOptions');
			var cbgAdvSearchSpecialSearchAttributesProcessOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesProcessOptions');
			var cbgAdvSearchSpecialSearchAttributesSourceOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesSourceOptions');
			var cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions');

	    	
	    	
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW');
			if(data.operationalStatusId && data.operationalStatusId.length > 0)
				field.setValue(data.operationalStatusId);
			else field.reset();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW');
			if(data.applicationCat2Id && data.applicationCat2Id.length > 0)
				field.setValue(data.applicationCat2Id);
			else field.reset();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW');
			if(data.lifecycleStatusId && data.lifecycleStatusId.length > 0)
				field.setValue(data.lifecycleStatusId);
			else field.reset();
			
			
			var lvOrganisationalScope = fsCategoriesAndStatus.getComponent('lvAdvSearchOrganisationalScope');
			lvOrganisationalScope.clearSelections();
			
			if(data.organisationalScope && data.organisationalScope.length > 0) {
				var scopes = data.organisationalScope.split(',');
				var store = lvOrganisationalScope.getStore();
				
				Ext.each(scopes, function(item, index, all) {
					var r = store.getAt(store.findExact('name', item));
					lvOrganisationalScope.select(r, true, true);
				});
			}
			
	    	
	    	
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW');
			if(data.itSecGroupId && data.itSecGroupId.length > 0)
				field.setValue(data.itSecGroupId);
			else field.reset();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW');
			if(data.processId && data.processId.length > 0)
				field.setValue(data.processId);
			else field.reset();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW');
//			if(data.osType && data.osType.length > 0)
//				field.setValue(data.osType);
//			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW');
//			if(data.osName && data.osName.length > 0)
//				field.setValue(data.osName);
//			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW');
			if(data.source && data.source.length > 0)
				field.setRawValue(data.source);
			else field.reset();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW');
			if(data.businessEssentialId && data.businessEssentialId.length > 0)
				field.setValue(data.businessEssentialId);
			else field.reset();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW');
//			if(data.gapResponsible && data.gapResponsible.length > 0)
//				field.setValue(data.gapResponsible);
//			else field.reset();
//			
//			field = fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate');
//			if(data.gapEndDate && data.gapEndDate.length > 0)
//				field.setValue(data.gapEndDate);
//			else field.reset();
			
			
			Util.setChbGroup(cbgAdvSearchCategoriesAndStatusGeneralUsageOptions, data.generalUsageOptions);
			Util.setChbGroup(cbgAdvSearchCategoriesAndStatusITCategoryOptions, data.itCategoryOptions);
			Util.setChbGroup(cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions, data.lifecycleStatusOptions);
			Util.setChbGroup(cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions, data.organisationalScopeOptions);
			
			Util.setChbGroup(cbgAdvSearchSpecialSearchAttributesITSecGroupOptions, data.itSecGroupOptions);
			Util.setChbGroup(cbgAdvSearchSpecialSearchAttributesProcessOptions, data.processOptions);
			Util.setChbGroup(cbgAdvSearchSpecialSearchAttributesSourceOptions, data.sourceOptions);
			Util.setChbGroup(cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions, data.businessEssentialOptions);
	    }
	},
	
	setData: function(params) {
		var pAdvSearchSingleAttrs = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs');
		var fsApplicationOwner = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner');
		var fsCIOwner = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner');
		

		
		params.onlyapplications = 'false';
		
	    var field = pAdvSearchSingleAttrs.getComponent('cbCiType');
//	    params.advsearchObjectTypeId = field.getValue();
//	    params.advsearchObjectTypeText = field.getRawValue().trim();
	    var value = field.getValue();//field.getEl().dom.value;
	    if(typeof value == 'number') {
		    var record = field.getStore().getById(value);//getAt(field.getStore().findExact('text', value));
		    params.ciTypeId = record.get('ciTypeId');//params.tableId
		    params.ciSubTypeId = record.get('ciSubTypeId');
		    params.cbCiTypesId = value;
	    }
	    
	    field = pAdvSearchSingleAttrs.getComponent('advsearchdescription');
	    params.description = field.getRawValue().trim();
	    
	    field = pAdvSearchSingleAttrs.getComponent('cbAdvSearchITset');
	    if(field.getValue().length > 0)
	    	params.itSetId = field.getValue();
	    

	    
	    
		var pAdvSearchSingleAttrsOptions = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrsOptions');
		var cbgAdvSearchCiTypeOptions = pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchCiTypeOptions');
		var cbgAdvSearchItSetOptions = pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchItSetOptions');
		var cbgAdvSearchDescriptionOptions = pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchDescriptionOptions');
		
		params.ciTypeOptions = Util.getChbYesNoValues(cbgAdvSearchCiTypeOptions);
		params.itSetOptions = Util.getChbYesNoValues(cbgAdvSearchItSetOptions);
		params.descriptionOptions = Util.getChbYesNoValues(cbgAdvSearchDescriptionOptions);
	    
		
////	    var cbCiType = pAdvSearchSingleAttrs.getComponent('cbCiType');
//	    var cat1 = params.ciSubTypeId;//params.advsearchObjectTypeId;//cbCiType.getValue();
	    if(params.ciTypeId === AC.TABLE_ID_APPLICATION && params.ciSubTypeId == AC.APP_CAT1_APPLICATION) {//params.tableId cat1 === AC.APP_CAT1_APPLICATION || cat1.length === 0
	    	var barRelevance = pAdvSearchSingleAttrs.getComponent('rgAdvSearchBARrelevance').getValue();
	    	if(barRelevance)
	    		params.barRelevance = barRelevance.inputValue;
	    	
	    	//params.xHidden = ...getComponent('x'); und params.x = ...getComponent('xHidden'); sind vertauscht 
	    	//weil es momtan in ApplicationWS.findApplications nur ein Feld x (ohne Hidden) gibt und die cwid im Feld x dort ausgelesen wird
		    params.appOwner = fsApplicationOwner.getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner').getValue();//params.advsearchappowner applicationOwner
		    params.appOwnerHidden = fsApplicationOwner.getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerHidden').getValue();//params.advsearchappownerHidden
		    params.appOwnerDelegate = fsApplicationOwner.getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate').getValue();//params.advsearchappdelegate applicationOwnerDelegate
		    params.appOwnerDelegateHidden = fsApplicationOwner.getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateHidden').getValue();//params.advsearchappdelegateHidden
		    params.appSteward = this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward').getValue();//params.advsearchsteward applicationSteward
		    params.appStewardHidden = this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardHidden').getValue();//params.advsearchstewardHidden
		    
//		    params.advsearchappdelegate = params.advsearchappdelegateHidden && params.advsearchappdelegateHidden.length > 0 && params.advsearchappdelegateHidden.indexOf(')') === -1 ? params.advsearchappdelegateHidden : params.advsearchappdelegate;
		    
		    
			var pAdvSearchAppOwnerOptions = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('pAdvSearchAppOwnerOptions');
			var cbgAdvSearchAppOwnerOptions = pAdvSearchAppOwnerOptions.getComponent('cbgAdvSearchAppOwnerOptions');
			var cbgAdvSearchAppOwnerDelegateOptions = pAdvSearchAppOwnerOptions.getComponent('cbgAdvSearchAppOwnerDelegateOptions');
			
			var pAdvSearchAppStewardOptions = this.getComponent('pAdvSearchAppStewardFrame').getComponent('pAdvSearchAppStewardOptions');
			var cbgAdvSearchAppStewardOptions = pAdvSearchAppStewardOptions.getComponent('cbgAdvSearchAppStewardOptions');
						
			
			params.appOwnerOptions = Util.getChbYesNoValues(cbgAdvSearchAppOwnerOptions);
			params.appOwnerDelegateOptions = Util.getChbYesNoValues(cbgAdvSearchAppOwnerDelegateOptions);
			
			params.appStewardOptions = Util.getChbYesNoValues(cbgAdvSearchAppStewardOptions);
	    }
	    
	    params.ciOwner = fsCIOwner.getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible').getValue();//ciResponsible
	    params.ciOwnerHidden = fsCIOwner.getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleHidden').getValue();
	    params.ciOwnerDelegate = fsCIOwner.getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible').getValue();
	    params.ciOwnerDelegateHidden = fsCIOwner.getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleHidden').getValue();
	    
	    
		var pAdvSearchCIOwnerOptions = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('pAdvSearchCIOwnerOptions');
		var cbgAdvSearchCIOwnerOptions = pAdvSearchCIOwnerOptions.getComponent('cbgAdvSearchCIOwnerOptions');
		var cbgAdvSearchCIOwnerDelegateOptions = pAdvSearchCIOwnerOptions.getComponent('cbgAdvSearchCIOwnerDelegateOptions');
	    
		params.ciOwnerOptions = Util.getChbYesNoValues(cbgAdvSearchCIOwnerOptions);
		params.ciOwnerDelegateOptions = Util.getChbYesNoValues(cbgAdvSearchCIOwnerDelegateOptions);

	    
	    if(params.isAdvSearchExt) {//this.isAdvSearchExt
			var pAdvSearchCategoriesAndStatusOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchCategoriesAndStatusOptions');
			var pAdvSearchSpecialSearchAttributesOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchSpecialSearchAttributesOptions');
			
	    	
	    	var fsCategoriesAndStatus = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
	    	var fsSpecialSearchAttributes = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
	    	
	    	
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW');
			if(field.getValue().length > 0)
				params.operationalStatusId = field.getValue();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW');
			if(field.getValue().length > 0)
				params.applicationCat2Id = field.getValue();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW');
			if(field.getValue().length > 0)
				params.lifecycleStatusId = field.getValue();
			
			var scopeRecords = fsCategoriesAndStatus.getComponent('lvAdvSearchOrganisationalScope').getSelectedRecords();
			var scopes = '';
			for(var i = 0; i < scopeRecords.length; i++) {
				if(scopes.length > 0)
					scopes += ',';
				
				scopes += scopeRecords[i].get('id');
			}
			if(scopes.length > 0)
				params.organisationalScope = scopes;
			
	    	
	    	
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW');
			if(field.getValue().length > 0)
				params.itSecGroupId = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW');
			if(field.getValue().length > 0)
				params.processId = field.getValue();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW');
//			if(field.getValue().length > 0)
//				params.osType = field.getValue();
//			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW');
//			if(field.getValue().length > 0)
//				params.osName = field.getValue();

			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW');
			if(field.getValue().length > 0)
				params.source = field.getRawValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW');
			if(field.getValue().length > 0)
				params.businessEssentialId = field.getValue();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW');
//			if(field.getValue().length > 0)
//				params.gapResponsible = field.getValue();
//			
//			field = fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate');
//			if(field.getValue().length > 0)
//				params.gapEndDate = field.getValue();
			
			
			
			var cbgAdvSearchCategoriesAndStatusGeneralUsageOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusGeneralUsageOptions');
			var cbgAdvSearchCategoriesAndStatusITCategoryOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusITCategoryOptions');
			var cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions');
			var cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions = pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions');

			var cbgAdvSearchSpecialSearchAttributesITSecGroupOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesITSecGroupOptions');
			var cbgAdvSearchSpecialSearchAttributesProcessOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesProcessOptions');
			var cbgAdvSearchSpecialSearchAttributesSourceOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesSourceOptions');
			var cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions = pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions');

			params.generalUsageOptions = Util.getChbYesNoValues(cbgAdvSearchCategoriesAndStatusGeneralUsageOptions);
			params.itCategoryOptions = Util.getChbYesNoValues(cbgAdvSearchCategoriesAndStatusITCategoryOptions);
			params.lifecycleStatusOptions = Util.getChbYesNoValues(cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions);
			params.organisationalScopeOptions = Util.getChbYesNoValues(cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions);
			
			params.itSecGroupOptions = Util.getChbYesNoValues(cbgAdvSearchSpecialSearchAttributesITSecGroupOptions);
			params.processOptions = Util.getChbYesNoValues(cbgAdvSearchSpecialSearchAttributesProcessOptions);
			params.sourceOptions = Util.getChbYesNoValues(cbgAdvSearchSpecialSearchAttributesSourceOptions);
			params.businessEssentialOptions = Util.getChbYesNoValues(cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions);
	    }
	},
	

	
	reset: function() {//link
		/*if(!link) {
			var cbCiType = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType');
			cbCiType.reset();
			
			var cbCat2 = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
			cbCat2.reset();
		
	    	var fsCIOwner = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner');
	    	var fsApplicationOwner = this.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + this.ownerId + 'ApplicationOwner');
	    	var fsApplicationSteward = this.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + this.ownerId + 'ApplicationSteward');
	    	
	    	var labels = AIR.AirApplicationManager.getLabels();
	    	fsCIOwner.setTitle(labels.label_details_ciOwner);
	    	
	    	fsApplicationOwner.setVisible(true);//false
	    	fsApplicationSteward.setVisible(true);//false
	    	
//	    	this.expand(false);//wenn nach neuer Suche und neuem Tab kein expand()!!
//	    	this.setVisible(true);
		} else {*/
			var pAdvSearchSingleAttrs = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs');
			
		    var field = pAdvSearchSingleAttrs.getComponent('cbCiType');
		    field.setValue('');
//		    field.reset();
		    field = pAdvSearchSingleAttrs.getComponent('advsearchdescription');
		    field.reset();
		    field = pAdvSearchSingleAttrs.getComponent('cbAdvSearchITset');
		    field.reset();
		    field = pAdvSearchSingleAttrs.getComponent('rgAdvSearchBARrelevance');
		    field.reset();
		    
		    
	    	var pAdvSearchAppOwnerFrame = this.getComponent('pAdvSearchAppOwnerFrame');
	    	var pAdvSearchAppStewardFrame = this.getComponent('pAdvSearchAppStewardFrame');
	    	var pAdvSearchCIOwnerFrame = this.getComponent('pAdvSearchCIOwnerFrame');
	    	
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner');
	    	field.reset();
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerHidden');
	    	field.reset();
	    	
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate');
	    	field.reset();
	    	field = pAdvSearchAppOwnerFrame.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateHidden');
	    	field.reset();
	    	
	    	field = pAdvSearchAppStewardFrame.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward');
	    	field.reset();
	    	field = pAdvSearchAppStewardFrame.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardHidden');
	    	field.reset();
		    
		    
		    var fsCIOwner = this.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + this.ownerId + 'CIOwner');
		    
	    	field = fsCIOwner.getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible');
	    	field.reset();
	    	field = fsCIOwner.getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleHidden');
	    	field.reset();
	    	
	    	field = fsCIOwner.getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible');
	    	field.reset();
	    	field = fsCIOwner.getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleHidden');
	    	field.reset();
		    
		    
		    
	    	var fsCategoriesAndStatus = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
	    	var fsSpecialSearchAttributes = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
	    	
	    	
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW');
			field.reset();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW');
			field.reset();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW');
			field.reset();
			
			field = fsCategoriesAndStatus.getComponent('lvAdvSearchOrganisationalScope');
			field.clearSelections();
	    	
	    	
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW');
			field.reset();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW');
			field.reset();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW');
//			field.reset();
//			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW');
//			field.reset();
//			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW');
			field.reset();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW');
			field.reset();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW');
//			field.reset();
//			
//			field = fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate');
//			field.reset();
		    
			
			var chbGroups = [];
			
			var pAdvSearchSingleAttrsOptions = this.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrsOptions');
			chbGroups.push(pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchCiTypeOptions'));
			chbGroups.push(pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchItSetOptions'));
			chbGroups.push(pAdvSearchSingleAttrsOptions.getComponent('cbgAdvSearchDescriptionOptions'));
			
			
	    	var pAdvSearchAppOwnerOptions = pAdvSearchAppOwnerFrame.getComponent('pAdvSearchAppOwnerOptions');
	    	chbGroups.push(pAdvSearchAppOwnerOptions.getComponent('cbgAdvSearchAppOwnerOptions'));
	    	chbGroups.push(pAdvSearchAppOwnerOptions.getComponent('cbgAdvSearchAppOwnerDelegateOptions'));
	    	
	    	var pAdvSearchAppStewardOptions = pAdvSearchAppStewardFrame.getComponent('pAdvSearchAppStewardOptions');
	    	chbGroups.push(pAdvSearchAppStewardOptions.getComponent('cbgAdvSearchAppStewardOptions'));

			var pAdvSearchCIOwnerOptions = pAdvSearchCIOwnerFrame.getComponent('pAdvSearchCIOwnerOptions');
			chbGroups.push(pAdvSearchCIOwnerOptions.getComponent('cbgAdvSearchCIOwnerOptions'));
			chbGroups.push(pAdvSearchCIOwnerOptions.getComponent('cbgAdvSearchCIOwnerDelegateOptions'));

			
			var pAdvSearchCategoriesAndStatusOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchCategoriesAndStatusOptions');
			var pAdvSearchSpecialSearchAttributesOptions = this.getComponent('pAdditionalSearchAttributes').getComponent('pAdvSearchSpecialSearchAttributesOptions');
	    	
			chbGroups.push(pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusGeneralUsageOptions'));
			chbGroups.push(pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusITCategoryOptions'));
			chbGroups.push(pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusLifecycleStatusOptions'));
			chbGroups.push(pAdvSearchCategoriesAndStatusOptions.getComponent('cbgAdvSearchCategoriesAndStatusOrganisationalScopeOptions'));

			chbGroups.push(pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesITSecGroupOptions'));
			chbGroups.push(pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesProcessOptions'));
			chbGroups.push(pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesSourceOptions'));
			chbGroups.push(pAdvSearchSpecialSearchAttributesOptions.getComponent('cbgAdvSearchSpecialSearchAttributesBusinessEssentialOptions'));

			for(var i = 0; i < chbGroups.length; i++)
				chbGroups[i].reset();
//		}
	}
});
Ext.reg('AIR.CiAdvancedSearchView', AIR.CiAdvancedSearchView);
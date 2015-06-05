Ext.namespace('AIR');

AIR.CiNewAssetView = Ext.extend(AIR.AirView, {

	initComponent : function() {
		Ext.apply(this, {
			border: false,
		    autoScroll: true,
		    padding: 20,
		    bodyStyle: {
		    	backgroundColor: AC.AIR_BG_COLOR,
		    	color: AC.AIR_FONT_COLOR,
		    	fontFamily: AC.AIR_FONT_TYPE
		    },
			items : [{
		    	xtype: 'label',
		    	id: 'assetPanelHeader',
				text : 'New Asset',
				style: {
					textAlign: 'left',
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '12pt'
				}
			}, { 
				xtype: 'container',	  
				html: '<hr>',
				cls: 'x-plain',
				style: {
					color: '#d0d0d0',
					backgroundColor: '#d0d0d0',
					height: '1px',
					marginTop: 25,
					marginBottom: 20
				}
			}, {
				xtype : 'panel',
				id: 'topPanel',
				layout : 'form',
				autoScroll : true,
				autoHeight : true,
				layoutConfig : {
					columns : 2
				},
				bodyStyle : 'padding:10px 5px 0px 10px',
				items : [ {
					xtype : 'textfield',
					id : 'identNumber',
					fieldLabel : 'Indent number',
					lazyRender : true,
					lazyInit : false,
					width : 450,
					style : {
						marginBottom : 10,
						fontSize : 12
					}
				}, {
					xtype : 'textfield',
					id : 'tinventory',
					fieldLabel : 'Inventory Number',
					width : 450,
					style : {
						marginBottom : 10,
						fontSize : 12
					}
				}, {
					xtype : 'textfield',
					id : 'tDescription',
					fieldLabel : 'Description',
					width : 450,
					style : {
						marginBottom : 10,
						fontSize : 12
					}
				}, {
			    	xtype: 'panel',
					id: 'pReason',
					border: false,
					layout: 'table',
					width: 770,
					items: [{
							xtype: 'label',
							fieldLabel : 'lReason',
							text:'Reason for Asset without Inventory:',
							width: 200,
							style: {
								fontSize: 12,
								'padding-right': '20px'
							}
			    		}, {
							xtype : 'combo',
							id : 'cbReason',
							//fieldLabel : 'Reason for Asset without Inventory',
							lazyRender : true,
							lazyInit : false,
							width : 530,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}]
				}]
			}, {
				xtype : 'panel',
				id: 'bottomPanel',
				border: false,
				layout: {
			        type: 'table',
			        columns: 2
			    },
				items : [{
					xtype : 'panel',
					id: 'leftPanel',
					border: false,
					width: 590,
					items : [{
						xtype : 'fieldset',
						title : 'Product',
						id : 'product',
						hidden:true,
						autoHeight : true,
						style : {
							margin : '5 5 0 0'
						},
						items : [
						         {
							xtype : 'container',
							html: '<a id="mailtoproduct" href="mailto:&subject=' + mail_Subject_product + '"><img src="' + img_Email + '"></a>',
							id: 'mailproduct',
							cls: 'x-plain',
							isHideable: true,
							
							style: {
								//textAlign: 'left',
								color: AC.AIR_FONT_COLOR,
								fontFamily: AC.AIR_FONT_TYPE,
								fontWeight: 'normal',
								fontSize: '8pt',
								cursor:'pointer',
								//'margin-left' : 300,
								 'padding-left':'500'
							}
						},{
							id: 'cbManufacturer',
					        xtype: 'filterCombo',
					        fieldLabel: 'Manufacturer',
					        width: 370,
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createManufactureListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        minChars: 0,
					        triggerAction: 'all',
					        mode: 'local',
							style : {
								marginBottom : 10
							}
						},{
							id: 'cbSubCategory',
					        xtype: 'filterCombo',
					        fieldLabel: 'Sub Category',
					        width: 370,
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createSubCategoryListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        minChars: 0,
					        triggerAction: 'all',
					        mode: 'local',
							style : {
								marginBottom : 10
							}
						},{
							id: 'cbType',
					        xtype: 'filterCombo',
					        fieldLabel: 'Type',
					        width: 370,
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createTypeListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        minChars: 0,
					        triggerAction: 'all',
					        mode: 'local',
							style : {
								marginBottom : 10
							}
						},{
							id: 'cbModel',
					        xtype: 'filterCombo',
					        fieldLabel: 'Model',
					        width: 370,
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createModelListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        minChars: 0,
					        triggerAction: 'all',
					        mode: 'local',
							style : {
								marginBottom : 10
							}
						},{
							xtype: 'textfield',
							id: 'tsapDescription',
							fieldLabel: 'SAP Description of the asset',
						    width: 370,
						    style: {
						    	marginBottom: 10,
						    	fontSize: 12
						    }
						}, {
							xtype : 'button',
							id : 'bReset',
							text : 'Reset all Entries',
							style : {
								'margin-left' : 350,
								fontSize : 12
							}
						},
						]
					}, {
						xtype : 'fieldset',
						id: 'technics',
						title : 'Technics',
						hidden:true,
						autoHeight : true,
						style : {
							margin : '5 5 0 0'
						},
						items : [ {
							xtype : 'textfield',
							id : 'tTechnicalNumber',
							fieldLabel : 'Technical Number / Asset-ID',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tTechnicalMaster',
							fieldLabel : 'Technical Master',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tSystemPlatform',
							fieldLabel : 'System platform name',
							width : 370,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tHardware',
							fieldLabel : 'Hardwaresystem (HWS)',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tOsName',
							fieldLabel : 'OS-Name',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tWorkflowHWS',
							fieldLabel : 'Worflowstatus technical HWS',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tTransient',
							fieldLabel : 'HW-transient systems',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'combo',
							id : 'cbWorkflowTechnical',
							fieldLabel : 'Worflowstatus technical',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							id: 'cbGeneralUsage',
					        xtype: 'filterCombo',
					        fieldLabel: 'General Usage',
					        width: 370,
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createOperationalStatusListStore(),
					        valueField: 'operationalStatusId',
					        displayField: 'operationalStatus',
							lastQuery: '',
					        minChars: 0,
					        triggerAction: 'all',
					        mode: 'local',
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'radiogroup',
							id : 'rbItSecurity',
							fieldLabel : 'IT-Security-Relevance',
							width : 370,
							columns : 2,
							items : [{
								name : 'itsecurity',
								boxLabel : 'Yes',
								inputValue : 'START',
								width : 50
							}, {
								id : 'itsecurity',
								boxLabel : 'No',
								inputValue : 'EXACT',
								width : 50
							}],
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tComment',
							fieldLabel : 'Comment',
							lazyRender : true,
							lazyInit : false,
							width : 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}]
					},{
						xtype : 'fieldset',
						title : 'Location',
						id : 'location',
						autoHeight : true,
						hidden:true,
						style : {
							margin : '5 5 0 0'
						},
						items : [{
							xtype : 'container',
							html: '<a id="mailtolocation" href="mailto:&subject=' + mail_Text_location + '"><img src="' + img_Email + '"></a>',
							id: 'maillocation',
							cls: 'x-plain',
							isHideable: true,
							
							style: {
								//textAlign: 'left',
								color: AC.AIR_FONT_COLOR,
								fontFamily: AC.AIR_FONT_TYPE,
								fontWeight: 'normal',
								fontSize: '8pt',
								cursor:'pointer',
								//'margin-left' : 300,
								 'padding-left':'500'
							}
						},{
							id: 'cbCountry',
					        xtype: 'filterCombo',
					        fieldLabel: 'Country',
					        width: 370,
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createLandListStore(),
					        valueField: 'id',
					        displayField: AAM.getLanguage() == 'DE' ? 'name' : 'nameEn',
							lastQuery: '',
					        minChars: 0,
					        triggerAction: 'all',
					        mode: 'local',
							style : {
								marginBottom : 10
							}
						},{
					        id: 'cbSite',
					    	xtype: 'filterCombo',
					        fieldLabel: 'Site',
					        width: 370,
					        store: AIR.AirStoreFactory.createSiteListStore(),
					        valueField: 'id',
					        displayField: AAM.getLanguage() == 'DE' ? 'name' : 'nameEn',
							lastQuery: '',
							minChars: 0,
					        triggerAction: 'all',
					        mode: 'local',
					        queryParam: 'id',
							style : {
								marginBottom : 10
							}
					    },{
					        xtype: 'filterCombo',
					        id: 'cbBuilding',
					        width: 370,
					        fieldLabel: 'Building',
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createBuildingListStoreFromSiteId(), //needs to be changed for building
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        triggerAction: 'all',
					        lazyInit: false,
					        mode: 'local',
					        queryParam: 'id',
					        style : {
								marginBottom : 10
							}
			        	}, {
					        xtype: 'filterCombo',//combo
					        id: 'cbRoom',
					        width: 370,
					        fieldLabel: 'Room',
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createRoomListStoreFromBuildingId(), //AIR.AirStoreFactory.createRoomListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        triggerAction: 'all',//all query
					        mode: 'local',
					        queryParam: 'id',
					        style : {
								marginBottom : 10
							}
				        }, {
					        xtype: 'filterCombo',//combo
					        id: 'cbRack',
					        width: 370,
					        fieldLabel: 'Rack - Position',
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createSchrankListStore(), //AIR.AirStoreFactory.createRoomListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        triggerAction: 'all',//all query
					        mode: 'local',
					        queryParam: 'id',
					        style : {
								marginBottom : 10
							}
				        }]
					}]
				}, {
					xtype : 'panel',
					id: 'rightPanel',
					border: false,
					width: 590,
					items : [{
						id: 'businessInformation',
						xtype : 'fieldset',
						title : 'Business Information',
						hidden:true,
						autoHeight : true,
						style : {
							margin : '5 0 0 0'
						},
						items : [ {
							xtype : 'combo',
							id : 'cbOrderNumber',
							fieldLabel : 'Order Number',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tInventorynumber',
							fieldLabel : 'Inventory Number',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							style : {
								marginBottom : 10
							}
						}, {
					        xtype: 'filterCombo',//combo
					        id: 'cbPsp',
					        width: 370,
					        fieldLabel: 'PSP-Element',
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.creatPspElementListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        triggerAction: 'all',//all query
					        mode: 'local',
					        queryParam: 'id',
					        style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tPsptext',
							fieldLabel : 'PSP-Text',
							width: 370,
							style : {
								marginBottom : 10
							}
						}, {
					        xtype: 'filterCombo',//combo
					        id: 'cbCostcenter',
					        width: 370,
					        fieldLabel: 'Cost center',
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.createCostcenterListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        triggerAction: 'all',//all query
					        mode: 'local',
					        queryParam: 'id',
					        style : {
								marginBottom : 10
							}
				        }, {
					    	xtype: 'panel',
							id: 'pRequester',
							border: false,
							layout: 'column',
							style : {
								marginBottom : 10,
								fontSize : 12
							},
							items: [{
								xtype: 'label',
								fieldLabel : 'Requester',
								text:'Requester:',
								width: 105,
								style: {
									fontSize: 12
								}
				    		},{
								xtype: 'textfield',
						        id: 'tfRequester',
						        width: 325,
						        lazyRender : true,
								lazyInit : false
						    },{
								xtype: 'hidden',
						        id: 'tfRequesterHidden'
						    },{
						    	xtype: 'commandlink',
						    	id: 'clRequesterAdd',
						    	img: img_AddPerson
						    },{
						    	xtype: 'commandlink',
						    	id: 'clRequesterRemove',
						    	img: img_RemovePerson
						    }]
						
						}, {
							xtype : 'textfield',
							id : 'tCostCenterMgr',
							fieldLabel : 'Cost Center Manager',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tOrganisation',
							fieldLabel : 'Organizational Unit',
							width: 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tOwner',
							fieldLabel : 'Owner(legal)',
							width: 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						},  {
					        xtype: 'filterCombo',//combo
					        id: 'cbSapAsset',
					        width: 370,
					        fieldLabel: 'SAP Asset Class',
					        enableKeyEvents: true,
					        store: AIR.AirStoreFactory.creatSapAssetListStore(),
					        valueField: 'id',
					        displayField: 'name',
							lastQuery: '',
					        triggerAction: 'all',//all query
					        mode: 'local',
					        queryParam: 'id',
					        style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tAquisition',
							fieldLabel : 'Aquisition Value(Euro)',
							width: 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tBook',
							fieldLabel : 'Book Value(Euro)',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tDate',
							fieldLabel : 'Date of book value',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tDepreciation',
							fieldLabel : 'Start date depreciation',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tEconomic',
							fieldLabel : 'Useful economic life (months)',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tRetirment',
							fieldLabel : 'Retirement date',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						} ]
					},{
						xtype : 'fieldset',
						id : 'contacts',
						title : 'Contacts',
						hidden:true,
						autoHeight : true,
						style : {
							margin : '5 0 0 0'
						},
						items : [ {
							xtype : 'textfield',
							id : 'tCostcentermanager',
							fieldLabel : 'Cost center manager',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tOrganizationalunit',
							fieldLabel : 'Organizational unit',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'combo',
							id : 'cbeditor',
							fieldLabel : 'Editors group',
							lazyRender : true,
							lazyInit : false,
							width: 370,
							style : {
								marginBottom : 10
							}
						}]
					}]
				}]
			},{
				xtype : 'panel',
				id: 'buttonPanel',
				layout : 'column',
				border: false,
				autoScroll : true,
				autoHeight : true,
				bodyStyle : 'padding:10px 5px 0px 10px',
				items : [{
					xtype : 'button',
					id : 'saveBtn',
					text : 'Save',
					style : {
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					},
					handler: function(button, event) {
		    	   		this.saveAsset();//button, event
		    		}.createDelegate(this)
				},{
					xtype : 'button',
					id : 'cancelBtn',
					text : 'Cancel',
					style : {
						//marginBottom : 10,
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					}
				},{
					xtype : 'button',
					id : 'inventoryBtn',
					text : 'Apply for inventory number',
					style : {
						//marginBottom : 10,
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					}
				},{
					xtype : 'button',
					id : 'savecloseBtn',
					text : 'Save & Close',
					style : {
						//marginBottom : 10,
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					}
				},
				{
					xtype : 'button',
					id : 'masterBtn',
					text : 'Request for new master data',
					style : {
						//marginBottom : 10,
						fontSize : 14,
						margin : '8 10 0 0',
						width:80
					}
				},
				{
					xtype : 'button',
					id : 'changemasterBtn',
					text : 'Change master data',
					style : {
						//marginBottom : 10,
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					}
				},
				{
					xtype : 'button',
					id : 'assetCheck',
					text : 'Asset Checked',
					style : {
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
						
					}
				},]
			}]
		});
		
		AIR.CiNewAssetView.superclass.initComponent.call(this);
		this.addEvents('ciBeforeChange', 'ciChange'); //required : needs to check
		
		var clRequesterAdd = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('clRequesterAdd');
		var clRequesterRemove = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('clRequesterRemove');
		clRequesterAdd.on('click', this.onRequesterAdd, this);
		clRequesterRemove.on('click', this.onRequesterRemove, this);
		
		var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
		cbSapAsset.on('select', this.onSapAssetSelect, this);
		cbSapAsset.on('keyup', this.onFieldKeyUp, this);
		
		var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
		cbPsp.on('select', this.onPSPSelect, this);
		cbPsp.on('keyup', this.onFieldKeyUp, this);
		
		var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
		cbCostcenter.on('select', this.onCostCenterSelect, this);
		cbCostcenter.on('keyup', this.onFieldKeyUp, this);
		
		var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
		cbCountry.on('select', this.onCountrySelect, this);
		cbCountry.on('keyup', this.onFieldKeyUp, this);
		
		var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
		cbSite.on('select', this.onSiteSelect, this);
		cbSite.on('keyup', this.onFieldKeyUp, this);
		
		var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');//.getComponent('pBuilding')
		cbBuilding.on('select', this.onBuildingSelect, this);
		cbBuilding.on('keyup', this.onFieldKeyUp, this);
		
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		cbRoom.on('select', this.onRoomSelect, this);
		cbRoom.on('keyup', this.onFieldKeyUp, this);
		
		var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
		cbManufacturer.on('select', this.onManufacturerSelect, this);
		cbManufacturer.on('keyup', this.onFieldKeyUp, this);
		
		var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
		cbSubCategory.on('select', this.onSubCategorySelect, this);
		cbSubCategory.on('keyup', this.onFieldKeyUp, this);
		
		var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
		cbType.on('select', this.onTypeSelect, this);
		cbType.on('keyup', this.onFieldKeyUp, this);
		
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel');
		cbModel.on('select', this.onModelSelect, this);
		cbModel.on('keyup', this.onFieldKeyUp, this);
		
		var bReset = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('bReset');
		bReset.on('click',this.resetProduct, this);
		
	
	},
		
	onRequesterAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester'), event);
	},
	
	onRequesterRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester'), event);
	},
	
	onSapAssetSelect: function(combo, record, index) {
		var value = record.get('nameEn');
		var tEconomic = Ext.getCmp('ciNewAssetView').getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic')
        tEconomic.setValue(value);
	},
	
	onPSPSelect: function(combo, record, index) {
		var value = record.get('nameEn');
		var tPsptext = Ext.getCmp('ciNewAssetView').getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tPsptext')
        tPsptext.setValue(value);
	},
	
	resetProduct: function(){
		var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
		var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
		var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel');
		var tsapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
		var tDescription = this.getComponent('topPanel').getComponent('tDescription');
		
		cbManufacturer.reset();
		cbSubCategory.reset();
		cbType.reset();
		cbModel.reset();
		tsapDescription.setValue("");
		tDescription.setValue("");
	},
	
	
	loadComboboxData : function(){
		this.loadCountryData();
		this.loadManufacturerData();
		this.loadCategoryData();
		this.loadCostcenterData();
		this.loadOperationalStatusData();
		this.loadPspElementData();
		this.loadSapAssetData();
	},
	
	updateLabels: function(labels){
		this.loadComboboxData();
	},
	
	onManufacturerSelect: function(combo, record, index) {
		this.manufacturerChanged(record.get('id'));
		this.fireEvent('ciChange', this, combo, record);
	},
	
	manufacturerChanged: function(value) {
		var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
		var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel');
		cbModel.reset();
		cbSubCategory.reset();
		cbType.reset();
		this.updateMailTemplateProduct();
	},
	
	onSubCategorySelect: function(combo, record, index) {
		this.subCategoryChanged(record.get('id'));
		this.fireEvent('ciChange', this, combo, record);
	},
	
	subCategoryChanged: function(value) {
		var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
		var partnerIdValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getValue();	
		var kategoryIdValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getValue();
		cbType.allQuery = value;
		cbType.reset();
		cbType.getStore().load({
			params: {
				partnerId: partnerIdValue,
				kategory2Id: kategoryIdValue
			}
		});
		this.updateMailTemplateProduct();
	},
	
	onTypeSelect: function(combo, record, index) {
		this.typeChanged(record.get('id'));
		this.fireEvent('ciChange', this, combo, record);
	},
	
	typeChanged: function(value) {
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel');
		cbModel.reset();
		cbModel.allQuery = value;
		cbModel.getStore().load({
			params: {
				id: value
			}
		});
		this.updateMailTemplateProduct();
	},
	
	onModelSelect: function(combo, record, index) {
		this.modelChanged(record.get('id'));
		this.fireEvent('ciChange', this, combo, record);
	},
	
	modelChanged: function(value) {
		var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getRawValue();
		var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType').getRawValue();
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel').getRawValue();
		var tsapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
		var tDescription = this.getComponent('topPanel').getComponent('tDescription');
		var description = cbManufacturer+" "+cbType+" "+cbModel;
		tsapDescription.setValue(description);
		tDescription.setValue(description);
		this.updateMailTemplateProduct();
	},
	
	onCountrySelect: function(combo, record, index) {
		this.countryChanged(record.get('id'));
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	countryChanged: function(value) {
		var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
		var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuilding.reset();
		cbSite.reset();
		
		cbRoom.getStore().removeAll();
		cbBuilding.getStore().removeAll();
		cbSite.getStore().removeAll();
		
		cbSite.getStore().setBaseParam('id', value);
		cbSite.allQuery = value;
		cbSite.reset();
		cbSite.getStore().load({
			params: {
				id: value
			}
		});
		this.updateMailTemplateLocation();
	},
	
	onSiteSelect: function(combo, record, index) {
		this.siteChanged(record.get('id'));
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	siteChanged: function(value) {
		var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuilding.reset();
		
		cbRoom.getStore().removeAll();
		cbBuilding.getStore().removeAll();
		
		cbBuilding.getStore().setBaseParam('id', value);
		cbBuilding.allQuery = value;
		cbBuilding.reset();
		cbBuilding.getStore().load({
			params: {
				id: value
			}
		});
		Util.enableCombo(cbRoom);
		this.updateMailTemplateLocation();
	},
	
	onBuildingSelect: function(combo, record, index) {
		this.buildingChanged(record.get('id'));
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	buildingChanged: function(value) {
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		cbRoom.reset();
		cbRoom.getStore().removeAll();
		
		cbRoom.getStore().setBaseParam('id', value);
		cbRoom.allQuery = value;
		cbRoom.reset();
		cbRoom.getStore().load({
			params: {
				id: value
			}
		});
		Util.enableCombo(cbRoom);
		this.updateMailTemplateLocation();
	},
	
	onRoomSelect: function(combo, record, index) {
		this.roomChanged(record.get('id'));
		this.ownerCt.fireEvent('ciChange', this, combo, record);	
	},
	
	roomChanged: function(value){
		var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRack');
		cbRack.reset();
		cbRack.getStore().removeAll();
		
		cbRack.getStore().setBaseParam('id', value);
		cbRack.allQuery = value;
		cbRack.reset();
		cbRack.getStore().load({
			params: {
				id: value
			}
		});
		Util.enableCombo(cbRack);
		this.updateMailTemplateLocation();
	},
	
	onFieldKeyUp: function(textfield, event) {
		this.ownerCt.fireEvent('ciChange', this, textfield);
	},
	
	onCostCenterSelect: function(combo, record, index) {
		personStore = AIR.AirStoreFactory.createPersonStore();
		personStore.load({
			params:{
				query: record.get('cwid')
			},
			callback: function (records, options, success) {
				var value = this.getAt(0).data.firstname+" "+this.getAt(0).data.lastname+"/"+this.getAt(0).data.cwid;
				var costCenterManager = Ext.getCmp('ciNewAssetView').getComponent('bottomPanel').getComponent('rightPanel')	.getComponent('contacts').getComponent('tCostcentermanager')
				costCenterManager.setValue(value);
			}
		});
	},
	
	loadManufacturerData: function(){	
		var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
		cbManufacturer.getStore().load();
	},
	
	loadCategoryData: function(){	
		var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
		cbSubCategory.getStore().load();
	},

	loadCountryData: function(){
		var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
		cbCountry.displayField = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
		cbCountry.getStore().load({
			callback: function() {
				var field = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
				cbCountry.getStore().sort(field, 'ASC');
			}
		});
	},
	
	loadCostcenterData: function(){	
		var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
		cbCostcenter.getStore().load();
	},
	
	loadOperationalStatusData: function(){
		var cbGeneralUsage = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbGeneralUsage');
		cbGeneralUsage.getStore().load();
	},
	
	loadPspElementData: function(){	
		var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
		cbPsp.getStore().load();
	},
	
	loadSapAssetData: function(){	
		var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
		cbSapAsset.getStore().load();
		
	},
	
	updateMailTemplateProduct: function() {
		var html = '<a id="mailtoproduct" href="{href}"><img src="' + img_Email + '"></a>';
		
		var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
		var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
		var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel');
		
		var mailText = mail_Text_product.replace('<manufacturer>', cbManufacturer.getRawValue());
		mailText = mailText.replace('<subcategory>', cbSubCategory.getRawValue());
		mailText = mailText.replace('<model>', cbModel.getRawValue());
		mailText = mailText.replace('<type>', cbType.getRawValue());
		mailText = mailText.replace('<Username>', 'Vandana Hemnani');//username
		
		var mailtemplate = 'mailto:vandana.hemnani@bayer.com';
		mailtemplate += '&subject=' + mail_Subject_product + '';
		mailtemplate += ('&body=' + mailText);
		html = html.replace('{href}',mailtemplate);
		Ext.getCmp('mailproduct').update(html);
	},
	
	updateMailTemplateLocation: function() {
		var html = '<a id="mailtoproduct" href="{href}"><img src="' + img_Email + '"></a>';
		
		var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
		var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
		var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRack');
		
		var mailText = mail_Text_location.replace('<country>', cbCountry.getRawValue());
		mailText = mailText.replace('<site>', cbSite.getRawValue());
		mailText = mailText.replace('<building>', cbBuilding.getRawValue());
		mailText = mailText.replace('<room>', cbRoom.getRawValue());
		mailText = mailText.replace('<rack>', cbRack.getRawValue());
		mailText = mailText.replace('<Username>', 'Vandana Hemnani');//username
		
		var mailtemplate = 'mailto:vandana.hemnani@bayer.com';
		mailtemplate += '&subject=' + mail_Subject_location + '';
		mailtemplate += ('&body=' + mailText);
		html = html.replace('{href}',mailtemplate);
		Ext.getCmp('maillocation').update(html);
	},
	
	update: function(assetData){
		console.log(assetData);
		//Asset Description
		var tDescription = this.getComponent('topPanel').getComponent('tDescription');
		tDescription.setValue(assetData.sapDescription);
		
		var identNumber = this.getComponent('topPanel').getComponent('identNumber');
		identNumber.setValue(assetData.identNumber);
		
		var tinventory = this.getComponent('topPanel').getComponent('tinventory');
		tinventory.setValue(assetData.inventoryNumber);
		
		var tReason = this.getComponent('topPanel').getComponent('tReason');
		
		//Product
		var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
		cbManufacturer.setValue(assetData.manufacturerId);
		
		var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
		cbSubCategory.setValue(assetData.subcategoryId);
		this.subCategoryChanged(assetData.subcategoryId);
		
		var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
		cbType.setValue(assetData.typeId);
		cbType.setRawValue(assetData.type);
		this.typeChanged(assetData.typeId);
		
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel');
		cbModel.setValue(assetData.modelId);
		cbModel.setRawValue(assetData.model);
		
		var tsapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
		tsapDescription.setValue(assetData.sapDescription);
		
		//Technics
		var tTechnicalNumber = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalNumber');
		tTechnicalNumber.setValue(assetData.technicalNumber);
		
		var tTechnicalMaster = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalMaster');
		tTechnicalMaster.setValue(assetData.technicalMaster);
		
		var tSystemPlatform = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tSystemPlatform');
		tSystemPlatform.setValue(assetData.systemPlatformName);
		
		var tHardware = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tHardware');
		tHardware.setValue(assetData.hardwareSystem);
		
		var tOsName = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tOsName');
		tOsName.setValue(assetData.osName);
		
		var tWorkflowHWS = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tWorkflowHWS');
		tWorkflowHWS.setValue(assetData.workflowTechnicalStatus);
		
		var tTransient = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTransient');
		tTransient.setValue(assetData.hardwareTransientSystem);
		
		var cbWorkflowTechnical = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbWorkflowTechnical');
		cbWorkflowTechnical.setValue(assetData.workflowStatusId);
		
		var cbGeneralUsage = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbGeneralUsage');
		cbGeneralUsage.setValue(assetData.generalUsageId);
		
		var rbItSecurity = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('rbItSecurity');
		rbItSecurity.setValue("START");
		
		var tComment = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tComment');
		tComment.setValue(assetData.generalUsageId);
		
		// Location
		var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
		var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
		var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRack');
		
		//Business Information
		var cbOrderNumbr = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbOrderNumbr');
		
		var tInventorynumber= this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber');
		tInventorynumber.setValue(assetData.inventoryNumber);
		
		var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
		cbPsp.setValue(assetData.pspElementId);
		cbPsp.setRawValue(assetData.pspElement);
		
		var tPsptext = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tPsptext');
		tPsptext.setValue(assetData.pspText);
		
		var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');					
		cbCostcenter.setValue(assetData.costCenterId);
		
		var tfRequester = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester');
		tfRequester.setValue(assetData.requester);
		
		var tfRequesterHidden = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequesterHidden'); 
		tfRequesterHidden.setValue(assetData.requesterId);
		
		var tCostCenterMgr = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tCostCenterMgr');			  
		tCostCenterMgr.setValue(assetData.costCenterManager);

		var tOrganisation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOrganisation');
		tOrganisation.setValue(assetData.organizationalunit);
		
		var tOwner = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOwner');	       
		tOwner.setValue(assetData.owner);
		
		var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
		cbSapAsset.setValue(assetData.sapAssetClassId);
		
		var tAquisition = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tAquisition');
		tAquisition.setValue(assetData.acquisitionValue);
		
		var tBook = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tBook');
		tBook.setValue(assetData.bookValue);
		
		var tDate = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDate');
		tDate.setValue(assetData.bookValueDate);
		
		var tDepreciation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDepreciation');
		tDepreciation.setValue(assetData.depreciationStartDate);
		
		var tEconomic = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic');
		tEconomic.setValue(assetData.usefulEconomicLife);
		
		var tRetirement = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tRetirment');
		tRetirement.setValue(assetData.retirementDate);
		
		var tCostcentermanager = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('contacts').getComponent('tCostcentermanager');
		tCostcentermanager.setValue(assetData.costCenterManager);
		
		var tOrganizationalunit = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('contacts').getComponent('tOrganizationalunit');
		tOrganizationalunit.setValue(assetData.organizationalunit);
		
		var cbeditor = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('contacts').getComponent('cbeditor');
		cbeditor.setValue(assetData.editorsGroupId);
		
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
	},
	
	saveAsset:function(){
		newAssetstore= AIR.AirStoreFactory.createSaveAssetStore();
		var manufacturerValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getValue();
		var subCategoryValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getValue();
		var typeValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType').getValue();
		var modelValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel').getValue();
		var pspValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp').getValue();
		var costcentervalue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter').getValue();
		var  sapAssetvalue=this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset').getValue();
		var requesterValue=this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester').getValue();
		var economicValue=this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic').getValue();
		
		newAssetstore.load({
			params:{
			id: manufacturerValue,
			hardwareCategory2_id:subCategoryValue,
			hardwareCategory3_id:typeValue,
			hardwareCategory4_id:modelValue,
			kontoid:costcentervalue,
			pspElement:pspValue,
			hardwareCategory1_id:sapAssetvalue,
			requester:requesterValue,
			month:economicValue
		}
		});
	}

});
Ext.reg('AIR.CiNewAssetView', AIR.CiNewAssetView);

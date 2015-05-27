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
					id : 'identnumber',
					fieldLabel : 'Indent number',
					lazyRender : true,
					lazyInit : false,
					width : 300,
					style : {
						marginBottom : 10,
						fontSize : 12
					}
				}, {
					xtype : 'textfield',
					id : 'tinventory',
					fieldLabel : 'Inventory',
					width : 400,
					style : {
						marginBottom : 10,
						fontSize : 12
					}
				}, {
					xtype : 'textfield',
					id : 'tDescription',
					fieldLabel : 'Description',
					width : 400,
					style : {
						marginBottom : 10,
						fontSize : 12
					}
				}, {
					xtype : 'combo',
					id : 'resson',
					fieldLabel : 'Reason for asset',
					lazyRender : true,
					lazyInit : false,
					width : 300,
					style : {
						marginBottom : 10,
						fontSize : 12
					}
				} ]
			}, {
				xtype : 'panel',
				id: 'bottomPanel',
				layout: {
			        type: 'table',
			        columns: 2,
			        tableAttrs: {
			            style: {
			                width: '100%' // To make the cell width 100% 
			            }
			        }
			    },
				items : [{
					xtype : 'panel',
					id: 'leftPanel',
					border: false,
					width: '100%',
					items : [{
						xtype : 'fieldset',
						title : 'Product',
						id : 'product',
						autoHeight : true,
						style : {
							margin : '0 0 0 10'
						},
						items : [{
							id: 'cbManufacturer',
					        xtype: 'filterCombo',
					        fieldLabel: 'Manufacturer',
					        width: 230,
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
					        width: 230,
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
					        width: 230,
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
					        width: 230,
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
						    width: 230,
						    style: {
						    	marginBottom: 10,
						    	fontSize: 12
						    }
						}, {
							xtype : 'button',
							id : 'breset',
							text : 'Reset all Entries',
							style : {
								'margin-left' : 250,
								fontSize : 12
							}
						} ]
					}, {

						xtype : 'fieldset',
						title : 'Technics',// title, header, or checkboxToggle
						// creates fieldset header
						autoHeight : true,
//						width : 400,
						collapsible : true,
						style : {
							margin : '0 0 0 10'
						},
						items : [ {
							xtype : 'textfield',
							id : 'tassetid',
							fieldLabel : 'Technical Number / Asset-ID',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tTechncalmaster',
							fieldLabel : 'Technical Master',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tsystem',
							fieldLabel : 'System platform name',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'thardware',
							fieldLabel : 'Hardwaresystem (HWS)',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tOsname',
							fieldLabel : 'OS-Name',
							lazyRender : true,
							lazyInit : false,

//							width : 230,



							style : {

								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tbworkflow',
							fieldLabel : 'Worflowstatus technical HWS',
							lazyRender : true,
							lazyInit : false,
//							width : 230,
							style : {
								marginBottom : 10,
								fontSize : 12
							}

						}, {



							xtype : 'textfield',
							id : 'ttransient',
							fieldLabel : 'HW-transient systems',
							lazyRender : true,
							lazyInit : false,
//							width : 230,
							style : {
								marginBottom : 10,
								fontSize : 12
							}

						}, {
							xtype : 'combo',
							id : 'cbworkflowtechnical',
							fieldLabel : 'Worflowstatus technical',
							lazyRender : true,
							lazyInit : false,
//							width : 230,
							style : {
								marginBottom : 10,
								fontSize : 12
							}

						}, {
							xtype : 'combo',
							id : 'cbworkflowtechnical',
							fieldLabel : 'Worflowstatus technical',
							lazyRender : true,
							lazyInit : false,
//							width : 230,
							style : {
								marginBottom : 10,
								fontSize : 12
							}

						},

						{
							xtype : 'combo',
							id : 'cbgeneralusage',
							fieldLabel : 'General Usage',
							lazyRender : true,
							lazyInit : false,
//							width : 230,
							style : {
								marginBottom : 10,
								fontSize : 12
							}

						}, {
							xtype : 'radiogroup',
							id : 'rbitsecurity',
							fieldLabel : 'IT-Security-Relevance',
							/*
							 * lazyRender: true, lazyInit: false,
							 */
//							width : 230,
							columns : 2,

							items : [ {
								id : 'yitsecurity',
								boxLabel : 'Yes',
								inputValue : 'START',
//								width : 50
							// BEGINS_WITH
							}, {
								id : 'nitsecurity',
								boxLabel : 'No',
								inputValue : 'EXACT',
//								width : 50
							} ],
							style : {
								marginBottom : 10,
								fontSize : 12
							}

						}, {
							xtype : 'textfield',
							id : 'tcomment',
							fieldLabel : 'Comment',
							lazyRender : true,
							lazyInit : false,
//							width : 230,
							style : {
								marginBottom : 10,
								fontSize : 12
							}

						},

						]
					},{

						xtype : 'fieldset',
						title : 'Location',
						id : 'location',
						autoHeight : true,
//						width : 400,
						style : {
							margin : '0 0 0 10'
						},

						items : [

						{
							id: 'cbCountry',
					        xtype: 'filterCombo',
					        fieldLabel: 'Country',
					        width: 230,
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
					        width: 230,
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
					        width: 230,
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
					        width: 230,
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
					        width: 230,
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
					width: '100%',
					items : [{

						xtype : 'fieldset',
						title : 'Business Information',
						autoHeight : true,
						style : {
							margin : '0 0 0 10'
						},

						items : [ {
							xtype : 'combo',
							id : 'cbOrder',
							fieldLabel : 'Order Number',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tInventorynumber',

							fieldLabel : 'Inventory Number',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						},

						{
							xtype : 'combo',
							id : 'cbPsp',
							fieldLabel : 'PSP-Element',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tPsptext',
							fieldLabel : 'PSP-Text',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'combo',
							id : 'cbCostcenter',
							fieldLabel : 'Cost center',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'combo',
							id : 'cbRequester',
							fieldLabel : 'Requester',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tcost',
							fieldLabel : 'Cost Center Manager',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'textfield',
							id : 'tOrganisation',
							fieldLabel : 'Organizational Unit',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						},

						{
							xtype : 'textfield',
							id : 'tOwner',
							fieldLabel : 'Owner(legal)',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							height : 50,


							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {
							xtype : 'combo',
							id : 'cbSapAsset',
							fieldLabel : 'SAP Asset Class',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						}, {



							xtype : 'textfield',
							id : 'tAquisition',
							fieldLabel : 'Aquisition Value(Euro)',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

//							width : 230,
							height : 50,
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
							// /mode: 'local',

//							width : 230,
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
							// /mode: 'local',

//							width : 230,





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
							// /mode: 'local',

//							width : 230,
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
							// /mode: 'local',

//							width : 230,
							height : 50,
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
							// /mode: 'local',

//							width : 230,
							height : 50,
							style : {
								marginBottom : 10,
								fontSize : 12
							}
						} ]
					
					},{

						xtype : 'fieldset',
						title : 'Contacts',


						autoHeight : true,
//						width : 400,
						style : {
							margin : '0 0 0 10'
						},
						items : [ {
							xtype : 'textfield',
							id : 'tCostcentermanager',
							fieldLabel : 'Cost center manager',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',

















//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {
							xtype : 'textfield',
							id : 'tOrganizationalunit',
							fieldLabel : 'Organizational unit',
							lazyRender : true,
							lazyInit : false,
							// /mode: 'local',


//							width : 230,
							style : {
								marginBottom : 10
							}
						}, {



















































							xtype : 'combo',
							id : 'cbeditor',
							fieldLabel : 'Editors group',
							lazyRender : true,








































							lazyInit : false,
//							width : 230,
							style : {
								marginBottom : 10



















							}
						} ]
					}]
				}















































































































































































































































































































































































































				]









































			} ]


























































































































		});
		
		AIR.CiNewAssetView.superclass.initComponent.call(this);
		this.addEvents('ciBeforeChange', 'ciChange'); //required : needs to check
		
		var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
		cbCountry.on('select', this.onCountrySelect, this);
		cbCountry.on('change', this.onCountryChange, this);//onComboChange
		cbCountry.on('keyup', this.onFieldKeyUp, this);
		
		var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
		cbSite.on('select', this.onSiteSelect, this);
		cbSite.on('change', this.onSiteChange, this);//onComboChange
		cbSite.on('keyup', this.onFieldKeyUp, this);
		
		var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');//.getComponent('pBuilding')
		cbBuilding.on('select', this.onBuildingSelect, this);
		cbBuilding.on('change', this.onBuildingChange, this);//onComboChange
		cbBuilding.on('keyup', this.onFieldKeyUp, this);
		
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		cbRoom.on('select', this.onRoomSelect, this);
		cbRoom.on('change', this.onComboChange, this);
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

	},
	
//	init: function() {
//		var cbCountry = this.getComponent('cbCountry');
//		cbCountry.getStore().load({
//			callback: function() {
//				var field = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
//				cbCountry.getStore().sort(field, 'ASC');//, 'ASC'
//			}
//		});
//	},
	
	loadComboboxData : function(){
		this.loadCountryData();
		this.loadManufacturerData();
		this.loadCategoryData();
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
		cbSubCategory.reset();
		cbType.reset();
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
	},
	
	onTypeSelect: function(combo, record, index) {
		this.typeChanged(record.get('id'));
		this.fireEvent('ciChange', this, combo, record);
	},
	
	onCountrySelect: function(combo, record, index) {
		this.countryChanged(record.get('id'));
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	typeChanged: function(value) {
		var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel');
		cbModel.reset();
		cbModel.allQuery = value;
		cbModel.reset();
		cbModel.getStore().load({
			params: {
				id: value
			}
		});
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
		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbSite);
		} else {
			cbSite.getStore().setBaseParam('id', value);
			cbSite.allQuery = value;
			cbSite.reset();
			cbSite.getStore().load({
				params: {
					id: value
				}
			});
		}
	},
	
	onSiteSelect: function(combo, record, index) {
		this.siteChanged(record.get('id'));
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	onSiteChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(typeof newValue === 'string' && newValue.length === 0)
				this.siteChanged(newValue);
			this.ownerCt.fireEvent('ciChange', this, combo);
		}
	},
	
	siteChanged: function(value) {
		var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuilding.reset();
		
		cbRoom.getStore().removeAll();
		cbBuilding.getStore().removeAll();
		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbBuilding);
		} else {
			cbBuilding.getStore().setBaseParam('id', value);
			cbBuilding.allQuery = value;
			cbBuilding.reset();
			cbBuilding.getStore().load({
				params: {
					id: value
				}
			});
			
			Util.enableCombo(cbRoom);
		}



	},
	
	onBuildingSelect: function(combo, record, index) {
		this.buildingChanged(record.get('id'));
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onBuildingChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(typeof newValue === 'string' && newValue.length === 0)
				this.buildingChanged(newValue);
			this.ownerCt.fireEvent('ciChange', this, combo);
		}
	},
	buildingChanged: function(value) {
		var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
		
		cbRoom.reset();
		
		cbRoom.getStore().removeAll();
		
		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbRoom);
		} else {
			cbRoom.getStore().setBaseParam('id', value);
			cbRoom.allQuery = value;
			cbRoom.reset();
			cbRoom.getStore().load({
				params: {
					id: value
				}
			});
			
			Util.enableCombo(cbRoom);
		}
	},
	
	onRoomSelect: function(combo, record, index) {
		this.roomChanged(record.get('id'));
		this.ownerCt.fireEvent('ciChange', this, combo, record);	



	},
	
	onRoomChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(typeof newValue === 'string' && newValue.length === 0)
				this.roomChanged(newValue);
			this.ownerCt.fireEvent('ciChange', this, combo);
		}



	},
	
	roomChanged: function(value){

		var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRack');
		
		cbRack.reset();
		
		cbRack.getStore().removeAll();
		

		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbRack);
		} else {
			cbRack.getStore().setBaseParam('id', value);
			cbRack.allQuery = value;
			cbRack.reset();
			cbRack.getStore().load({
				params: {
					id: value
				}
			});
			
			Util.enableCombo(cbRack);
		}
	},





	
	onFieldKeyUp: function(textfield, event) {
		this.ownerCt.fireEvent('ciChange', this, textfield);




	}



});
Ext.reg('AIR.CiNewAssetView', AIR.CiNewAssetView);

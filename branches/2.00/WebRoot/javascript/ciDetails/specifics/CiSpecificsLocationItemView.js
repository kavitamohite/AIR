Ext.namespace('AIR');

AIR.CiSpecificsLocationItemView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    
		    border: false,
		    layout: 'form',
		    
		    items: [{
		        id: 'tfLocationCiName',
		    	xtype: 'textfield',
		        fieldLabel: 'Name',
		        width: 230,
		        enableKeyEvents: true
//		        hidden: true
	        },{
		        id: 'tfLocationCiAlias',
		    	xtype: 'textfield',
		        fieldLabel: 'Alias',
		        width: 230,
		        enableKeyEvents: true
	        },{
		        id: 'tfStandortCode',
		    	xtype: 'textfield',
		        fieldLabel: 'Code',
		        width: 230,
		        enableKeyEvents: true
		    },{
		        id: 'tfStandortNameEn',
		    	xtype: 'textfield',
		        fieldLabel: 'English',
		        width: 230,
		        enableKeyEvents: true
		    },{
		        id: 'tfRoomFloor',
		    	xtype: 'textfield',
		        fieldLabel: 'Floor',
		        width: 230,
		        enableKeyEvents: true
		    },{
//		        id: 'cbRoom',
//		    	xtype: 'textfield',
//		        fieldLabel: 'Room',
//		        disabled: true,
//		        width: 230
		    	
		        xtype: 'filterCombo',//combo
		        id: 'cbRoom',
//		        disabled: true,
//		        hideTrigger: true,
		        
		        width: 230,
		        fieldLabel: 'Room',
		        enableKeyEvents: true,
		        
		        store: AIR.AirStoreFactory.createRoomListStore(),//AIR.AirStoreFactory.createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local',
		        queryParam: 'id'
	        },{
		        xtype: 'filterCombo',//combo
		        id: 'cbBuildingArea',
//		        disabled: true,
//		        hideTrigger: true,
		        
		        width: 230,
		        fieldLabel: 'Building Area',
		        enableKeyEvents: true,
		        
		        store: AIR.AirStoreFactory.createBuildingAreaListStore(),//AIR.AirStoreFactory.createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
//				isFilterLocal: true,
		        triggerAction: 'all',//all query
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local',
		        queryParam: 'id'
	        },{
		        xtype: 'filterCombo',//combo filterCombo
		        id: 'cbBuilding',
//		        disabled: true,
//		        hideTrigger: true,
		        
		        width: 230,
		        fieldLabel: 'Building',
		        enableKeyEvents: true,
		        
//		        style: {
//        			marginLeft: 160
//        		},
		        
		        store: AIR.AirStoreFactory.createBuildingListStore(),//AIR.AirStoreFactory.createBuildingsByBuildingAreaStore(),//createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
//		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local',//local
		        queryParam: 'id'
        	},{
	        	xtype: 'panel',
	        	id: 'pBuilding',
	        	
	        	border: false,
	        	layout: 'table',//hbox column
	            layoutConfig: {
//		            tableAttrs: {
//			            style: {
//			                width: '100%'
//			            }
//			        },
	                columns: 2//4
	            },
	        	
	        	style: {
	        		marginBottom: 5,
	        		marginLeft: 205
	        	},
//	        	lableWidth: 205,
	        	
	        	items: [/*{
			        xtype: 'label',//combo filterCombo
			        id: 'lBuilding',
			        width: 205,
			        text: 'Building',
			        
			        style: {
	        			fontSize: 12,
	        			marginTop: 2,
	        			marginRight: 160//wegen table layout. width wird ignoriert
	        		}
	        	},*/{
			        xtype: 'label',//combo filterCombo
			        id: 'lbtStreetAndNumber',
			        text: ' ',
			        
			        style: {
	        			fontSize: 12,
	        			marginTop: 3,
//	        			marginLeft: 5
	        			marginRight: 20
	        		}
	        	},{
			        xtype: 'label',//combo filterCombo
			        id: 'lbtPostalCodeLocation',
			        text: ' ',
			        
			        style: {
	        			fontSize: 12,
	        			marginTop: 3
//	        			marginLeft: 20//15
	        		}
	        	}]
		    },{
		        id: 'cbTerrain',//tfTerrain
		    	xtype: 'filterCombo',//combo textfield
		        fieldLabel: 'Terrain',
		        enableKeyEvents: true,
//		        disabled: true,
//		        hideTrigger: true,
		        
		        width: 230,
		        store: AIR.AirStoreFactory.createTerrainListStore(),//new Ext.data.Store(),//AIR.AirStoreFactory.createBuildingsByBuildingAreaStore(),//createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
//		        lazyRender: true,
//		        lazyInit: false
		        mode: 'local',//local
		        queryParam: 'id'//id landId
	        },{
		        id: 'cbSite',
		    	xtype: 'filterCombo',//combo textfield
		        fieldLabel: 'Site',
//		        disabled: true,
//		        hideTrigger: true,
		        width: 230,

		        store: AIR.AirStoreFactory.createSiteListStore(),//new Ext.data.Store(),//AIR.AirStoreFactory.createBuildingsByBuildingAreaStore(),//createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
//				isFilterLocal: true,//custom combo field
				minChars: 0,
		        triggerAction: 'all',//all query
//		        lazyRender: true,
//		        lazyInit: false
		        mode: 'local',//local remote
		        queryParam: 'id'//id landId
		    },{
		        id: 'cbCountry',
		        xtype: 'filterCombo',//'textfield',
		    	
		        fieldLabel: 'Country',
		        width: 230,
		        enableKeyEvents: true,
		        
		        store: AIR.AirStoreFactory.createLandListStore(),//new Ext.data.Store(),//AIR.AirStoreFactory.createBuildingsByBuildingAreaStore(),//createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: AAM.getLanguage() == 'DE' ? 'name' : 'nameEn',//'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        //!! sonst findet kein filtern bei manueller Eingabe statt, da default minChars:4.
		        //Siehe ab FilterComboBox.initQuery()
//				isFilterLocal: true,//custom combo field
		        minChars: 0,
		        triggerAction: 'all',//all query
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local'//local remote
//		        queryParam: 'locale'//id
		    },{
		    	xtype: 'panel',
		    	id: 'pSpecificsLocationStreet',
		    	border: false,
		    	layout: 'column',
		    	hidden: true,
		    	
		    	items: [{
		    		xtype: 'label',
		    		id: 'lStreetAndNumber',
		    		text: 'Street / Number',
		    		
					width: 205,
					style: {
						fontSize: 12,
						marginTop: 3
					}
		    	}, {
			    	xtype: 'textfield',
			        id: 'tfStreet',
			    	width: 250,
			    	disabled: true,
			        enableKeyEvents: true
		    	},{
			    	xtype: 'textfield',
			        id: 'tfStreetNumber',
			    	width: 50,
			    	
			    	style: {
						marginLeft: 5
					},
			    	disabled: true,
			        enableKeyEvents: true
		    	}]
		    },{
		    	xtype: 'panel',
		    	id: 'pSpecificsLocationAddress',
		    	border: false,
		    	layout: 'column',
		    	hidden: true,
		    	
		    	style: {
					marginTop: 5
				},
		    	
		    	items: [{
		    		xtype: 'label',
		    		id: 'lPostalCodeLocation',
		    		text: 'Postal Code / Location',
		    		
					width: 205,
					style: {
						fontSize: 12,
						marginTop: 3
					}
		    	}, {
			    	xtype: 'textfield',
			        id: 'tfPostalCode',
			    	width: 50,
			    	disabled: true,
			        enableKeyEvents: true
		    	},{
			    	xtype: 'textfield',
			        id: 'tfLocation',
			    	width: 150,
			    	
			    	style: {
						marginLeft: 5
					},
			    	disabled: true,
			        enableKeyEvents: true
		    	}]
		    }]
		});
		
		AIR.CiSpecificsLocationItemView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		var tfLocationCiName = this.getComponent('tfLocationCiName');
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		var tfStandortCode = this.getComponent('tfStandortCode');
		var tfStandortNameEn = this.getComponent('tfStandortNameEn');
		var tfRoomFloor = this.getComponent('tfRoomFloor');
		
		var tfStreet = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreet');
		var tfStreetNumber = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreetNumber');
		var tfPostalCode = this.getComponent('pSpecificsLocationAddress').getComponent('tfPostalCode');
		var tfLocation = this.getComponent('pSpecificsLocationAddress').getComponent('tfLocation');

		
		
		tfLocationCiName.on('change', this.onFieldChange, this);
		tfLocationCiAlias.on('change', this.onFieldChange, this);
		tfStandortCode.on('change', this.onFieldChange, this);
		tfStandortNameEn.on('change', this.onFieldChange, this);
		tfRoomFloor.on('change', this.onFieldChange, this);
		
		tfStreet.on('change', this.onFieldChange, this);
		tfStreetNumber.on('change', this.onFieldChange, this);
		tfPostalCode.on('change', this.onFieldChange, this);
		tfLocation.on('change', this.onFieldChange, this);
		
		
		tfLocationCiName.on('keyup', this.onFieldKeyUp, this);
		tfLocationCiAlias.on('keyup', this.onFieldKeyUp, this);
		tfStandortCode.on('keyup', this.onFieldKeyUp, this);
		tfStandortNameEn.on('keyup', this.onFieldKeyUp, this);
		tfRoomFloor.on('keyup', this.onFieldKeyUp, this);
		
		tfStreet.on('keyup', this.onFieldKeyUp, this);
		tfStreetNumber.on('keyup', this.onFieldKeyUp, this);
		tfPostalCode.on('keyup', this.onFieldKeyUp, this);
		tfLocation.on('keyup', this.onFieldKeyUp, this);
		
		
		var cbCountry = this.getComponent('cbCountry');
		cbCountry.allQuery = 'CONSTANT';
		cbCountry.on('select', this.onCountrySelect, this);
		cbCountry.on('change', this.onCountryChange, this);//onComboChange
		cbCountry.on('keyup', this.onFieldKeyUp, this);
		
		var cbSite = this.getComponent('cbSite');
		cbSite.on('select', this.onSiteSelect, this);
		cbSite.on('change', this.onSiteChange, this);//onComboChange
		cbSite.on('keyup', this.onFieldKeyUp, this);
		
		var cbTerrain = this.getComponent('cbTerrain');
		cbTerrain.on('select', this.onTerrainSelect, this);
		cbTerrain.on('change', this.onTerrainChange, this);//onComboChange
		cbTerrain.on('keyup', this.onFieldKeyUp, this);
		
		var cbBuilding = this.getComponent('cbBuilding');//.getComponent('pBuilding')
		cbBuilding.on('select', this.onBuildingSelect, this);
		cbBuilding.on('change', this.onBuildingChange, this);//onComboChange
		cbBuilding.on('keyup', this.onFieldKeyUp, this);
		
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		cbBuildingArea.on('select', this.onBuildingAreaSelect, this);
		cbBuildingArea.on('change', this.onBuildingAreaChange, this);//onComboChange
//		cbBuildingArea.getStore().on('load', this.onStoreLoad, this);
//		cbBuildingArea.on('expand', this.onStoreLoad, this);
		cbBuildingArea.on('keyup', this.onFieldKeyUp, this);
		
		var cbRoom = this.getComponent('cbRoom');
		cbRoom.on('select', this.onRoomSelect, this);
		cbRoom.on('change', this.onComboChange, this);
		cbRoom.on('keyup', this.onFieldKeyUp, this);
	},
	
	onStoreLoad: function(combo) {//store, records, options
		if(combo.mode === 'remote') {
			combo.mode = 'local';
//			combo.isUpdateInit = true;
		}
	},
	
	onRoomSelect: function(combo, record, index) {
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	onBuildingAreaSelect: function(combo, record, index) {
		/*var cbRoom = this.getComponent('cbRoom');
		
		cbRoom.getStore().setBaseParam('id', record.get('id'));
		cbRoom.allQuery = record.get('id');
		cbRoom.reset();
		cbRoom.getStore().load({
			params: {
				id: record.get('id')
			}
		});
		
		Util.enableCombo(cbRoom);*/
		this.buildingAreaChanged(record.get('id'));
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onBuildingAreaChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(typeof newValue === 'string' && newValue.length === 0)
				this.buildingAreaChanged(newValue);
			this.ownerCt.fireEvent('ciChange', this, combo);
		}
	},
	buildingAreaChanged: function(value) {
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbRoom = this.getComponent('cbRoom');
		
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
	
	
	
	
	onBuildingSelect: function(combo, record, index) {
		/*this.getComponent('cbRoom').reset();
		
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		
		cbBuildingArea.getStore().setBaseParam('id', record.get('id'));
		cbBuildingArea.allQuery = record.get('id');
		cbBuildingArea.reset();
		cbBuildingArea.getStore().load({
			params: {
				id: record.get('id')
			}
		});
		
		Util.enableCombo(cbBuildingArea);*/
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
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbRoom = this.getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuildingArea.reset();
		
		cbRoom.getStore().removeAll();
		cbBuildingArea.getStore().removeAll();
		
		Util.disableCombo(cbRoom);
		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbBuildingArea);
		} else {
			cbBuildingArea.getStore().setBaseParam('id', value);
			cbBuildingArea.allQuery = value;
			cbBuildingArea.reset();
			cbBuildingArea.getStore().load({
				params: {
					id: value
				}
			});
			
			Util.enableCombo(cbBuildingArea);
		}
	},
	
	
	
	
	onTerrainSelect: function(combo, record, index) {
		/*this.getComponent('cbRoom').reset();
		this.getComponent('cbBuildingArea').reset();

		
		var cbBuilding = this.getComponent('cbBuilding');//.getComponent('pBuilding')
		
		cbBuilding.getStore().setBaseParam('id', record.get('id'));
		cbBuilding.allQuery = record.get('id');
		cbBuilding.reset();
		cbBuilding.getStore().load({
			params: {
				id: record.get('id')
			}
		});
		
		Util.enableCombo(cbBuilding);*/
		this.terrainChanged(record.get('id'));
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onTerrainChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(typeof newValue === 'string' && newValue.length === 0)
				this.terrainChanged(newValue);
			this.ownerCt.fireEvent('ciChange', this, combo);
		}
	},
	terrainChanged: function(value) {
		var cbBuilding = this.getComponent('cbBuilding');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbRoom = this.getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuildingArea.reset();
		cbBuilding.reset();//.getComponent('pBuilding')
		
		cbRoom.getStore().removeAll();
		cbBuildingArea.getStore().removeAll();
		cbBuilding.getStore().removeAll();//.getComponent('pBuilding')
		
		Util.disableCombo(cbRoom);
		Util.disableCombo(cbBuildingArea);
		
		
		if(this.tableId == AC.TABLE_ID_BUILDING_AREA || this.tableId == AC.TABLE_ID_ROOM || this.tableId == AC.TABLE_ID_POSITION) {
			Util.disableCombo(cbBuilding);
			if(typeof value === 'string' && value.length === 0) {
				Util.disableCombo(cbBuilding);
			} else {
				//TEST
//				cbBuilding.onBeforeLoad();
//				cbBuilding.innerList.update(cbBuilding.loadingText ?
//			               '<div class="loading-indicator">'+cbBuilding.loadingText+'</div>' : '');
				//TEST
				
				cbBuilding.getStore().setBaseParam('id', value);
				cbBuilding.allQuery = value;
				cbBuilding.reset();
				/* auskommentiert wenn cbBuilding mode: 'remote' ansonsten: */		
				cbBuilding.getStore().load({
					params: {
						id: value
					},
					callback: function() { Util.enableCombo(cbBuilding); }
				});
//				Util.enableCombo(cbBuilding);
			}
		}
		
//		if(this.tableId == AC.TABLE_ID_BUILDING_AREA || this.tableId == AC.TABLE_ID_ROOM || this.tableId == AC.TABLE_ID_POSITION)
//			Util.enableCombo(cbBuilding);
	},
	
	
	onSiteSelect: function(combo, record, index) {
		/*this.getComponent('cbRoom').reset();
		this.getComponent('cbBuildingArea').reset();
		this.getComponent('cbBuilding').reset();//.getComponent('pBuilding')
		
		var cbTerrain = this.getComponent('cbTerrain');
		
		cbTerrain.getStore().setBaseParam('id', record.get('id'));//landId ciId
		cbTerrain.allQuery = record.get('id');
		cbTerrain.reset();
		cbTerrain.getStore().load({
			params: {
				id: record.get('id')
			}
		});
		
		Util.enableCombo(cbTerrain);*/
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
		var cbTerrain = this.getComponent('cbTerrain');
		var cbBuilding = this.getComponent('cbBuilding');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbRoom = this.getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuildingArea.reset();
		cbBuilding.reset();//.getComponent('pBuilding')
		cbTerrain.reset();
		
		cbRoom.getStore().removeAll();
		cbBuildingArea.getStore().removeAll();
		cbBuilding.getStore().removeAll();//.getComponent('pBuilding')
		cbTerrain.getStore().removeAll();
		
		Util.disableCombo(cbRoom);
		Util.disableCombo(cbBuildingArea);
		Util.disableCombo(cbBuilding);
		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbTerrain);
		} else {
			cbTerrain.getStore().setBaseParam('id', value);//landId ciId
			cbTerrain.allQuery = value;
			cbTerrain.reset();
			cbTerrain.getStore().load({
				params: {
					id: value
				}
			});
			
			Util.enableCombo(cbTerrain);
		}
	},
	
	
	
	onCountrySelect: function(combo, record, index) {
		/*this.getComponent('cbRoom').reset();
		this.getComponent('cbBuildingArea').reset();
		this.getComponent('cbBuilding').reset();//.getComponent('pBuilding')
		this.getComponent('cbTerrain').reset();
		
		var cbSite = this.getComponent('cbSite');
		
		cbSite.getStore().setBaseParam('id', record.get('id'));//landId ciId
		cbSite.allQuery = record.get('id');
		cbSite.reset();
		cbSite.getStore().load({
			params: {
				id: record.get('id')
			}
		});
		
		Util.enableCombo(cbSite);*/
		this.countryChanged(record.get('id'));
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onCountryChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(typeof newValue === 'string' && newValue.length === 0)
				this.countryChanged(newValue);
			this.ownerCt.fireEvent('ciChange', this, combo);
		}
	},
	
	countryChanged: function(value) {
		var cbSite = this.getComponent('cbSite');
		var cbTerrain = this.getComponent('cbTerrain');
		var cbBuilding = this.getComponent('cbBuilding');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbRoom = this.getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuildingArea.reset();
		cbBuilding.reset();//.getComponent('pBuilding')
		cbTerrain.reset();
		cbSite.reset();
		
		cbRoom.getStore().removeAll();
		cbBuildingArea.getStore().removeAll();
		cbBuilding.getStore().removeAll();//.getComponent('pBuilding')
		cbTerrain.getStore().removeAll();
		cbSite.getStore().removeAll();
		
		Util.disableCombo(cbRoom);
		Util.disableCombo(cbBuildingArea);
		Util.disableCombo(cbBuilding);
		Util.disableCombo(cbTerrain);
		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbSite);
		} else {
			cbSite.getStore().setBaseParam('id', value);//record.get('id') landId ciId
			cbSite.allQuery = value;//record.get('id');
			cbSite.reset();
			cbSite.getStore().load({
				params: {
					id: value//record.get('id')
				}
			});
			
			Util.enableCombo(cbSite);
		}
	},

	onComboSelect: function(combo, record, index) {
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onComboChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.ownerCt.fireEvent('ciChange', this, combo);
	},

	onFieldChange: function(textfield, newValue, oldValue) {
		this.ownerCt.fireEvent('ciChange', this, textfield, newValue);
	},
	onFieldKeyUp: function(textfield, event) {
		this.ownerCt.fireEvent('ciChange', this, textfield);
	},
	
//	clear: function(data) {
//		
//	},
	
	init: function() {
		var cbCountry = this.getComponent('cbCountry');
		cbCountry.getStore().load();
		
        //!! sonst findet das Filtern bei manueller Eingabe unerwünschterweise immer per remote Load statt.
        //Siehe minChars: 0 bei cbCountry Definition,
//		cbCountry.mode = 'local';
		
        this.update(AAM.getAppDetail());
	},
    
	update: function(data) {
		this.tableId = parseInt(data.tableId);
		this.ciId = data.id;
		this.name = data.name;
		
		this.updateAccessMode(data);
		
		var tfLocationCiName = this.getComponent('tfLocationCiName');
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		
		var tfRoomFloor = this.getComponent('tfRoomFloor');
		var tfStandortCode = this.getComponent('tfStandortCode');
		var tfStandortNameEn = this.getComponent('tfStandortNameEn');
		var cbRoom = this.getComponent('cbRoom');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var pBuilding = this.getComponent('pBuilding');
		var cbBuilding = this.getComponent('cbBuilding');//pBuilding.getComponent('cbBuilding');
		var cbTerrain = this.getComponent('cbTerrain');
		var cbSite = this.getComponent('cbSite');
		var cbCountry = this.getComponent('cbCountry');
//		cbCountry.displayField = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
//		cbCountry.view.refresh();
		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		
		if(data.isCiCreate) {
//			tfLocationCiName.setVisible(true);
			tfLocationCiName.reset();
			
			//wegen filterung bei Buchstabeneingabe. Um remote Filtern/Neu laden zu verhindern
//			cbRoom.mode = 'local';
//			cbBuildingArea.mode = 'local';
//			cbBuilding.mode = 'local';
//			cbTerrain.mode = 'local';
//			cbSite.mode = 'local';
		} else {
//			tfLocationCiName.setVisible(false);
			tfLocationCiName.setValue(data.name);//tfLocationCiName ist mandatory. Deshalb für update setzen
			
			//bei update soll erst geladen wernde, wenn der anwender die entspr. combo benutzt
//			cbRoom.mode = 'remote';
//			cbBuildingArea.mode = 'remote';
//			cbBuildingArea.isUpdateInit = false;
//			cbBuilding.mode = 'remote';
//			cbTerrain.mode = 'remote';
//			cbSite.mode = 'remote';
		}
		
		
		//use builder pattern managing each field depending on tableId instead of switch/case?
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_POSITION:
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfStandortCode.setVisible(false);
				tfStandortCode.reset();
				tfStandortNameEn.setVisible(false);
				tfStandortNameEn.reset();
				
				
				cbRoom.setVisible(true);
				cbBuildingArea.setVisible(true);
				cbBuilding.setVisible(true);
//				pBuilding.setVisible(false);//true
				
				cbTerrain.setVisible(true);
				cbSite.setVisible(true);
				cbCountry.setVisible(true);
				cbRoom.reset();
				
				if(data.isCiCreate) {
					pBuilding.setVisible(false);
					Util.clearCombo(cbRoom);
					Util.clearCombo(cbBuildingArea);
					Util.clearCombo(cbBuilding);
					Util.clearCombo(cbTerrain);
					Util.clearCombo(cbSite);
//					Util.clearCombo(cbCountry);
//					cbRoom.reset();
//					cbBuildingArea.reset();//remote statt local combo?
//					cbBuilding.reset();
//					cbTerrain.reset();
//					cbSite.reset();
					cbCountry.reset();
					
					Util.disableCombo(cbRoom);//enableCombo
					Util.disableCombo(cbBuildingArea);//enableCombo
					Util.disableCombo(cbBuilding);//enableCombo
					Util.disableCombo(cbTerrain);//enableCombo
					Util.disableCombo(cbSite);//enableCombo
					Util.enableCombo(cbCountry);
				} else {
					pBuilding.setVisible(true);
					
//					ORA-20000: Rack 101526 cannot be moved to another room. Set parameter CHECK_LOCATION_INTEGRITY to N to disable this check.
//					ORA-06512: at "TBADM.TRG_013_BIU", line 224
					
//					if(AIR.AirAclManager.isRelevance(cbRoom, data)) {
//						Util.enableCombo(cbRoom);
//						cbRoom.getStore().setBaseParam('id', data.areaId);
//						cbRoom.allQuery = data.areaId;
//					} else {
//						Util.disableCombo(cbRoom);
//					}
					
					
					cbRoom.setValue(data.raumName);
					cbBuildingArea.setValue(data.areaName);
					cbBuilding.setValue(data.gebaeudeName);
					cbTerrain.setValue(data.terrainName);
					cbSite.setValue(data.standortName);
					cbCountry.setValue(AAM.getLanguage() == 'DE' ? data.landName : data.landNameEn);//data.landNameEn
					
					Util.disableCombo(cbRoom);
					Util.disableCombo(cbBuildingArea);
					Util.disableCombo(cbBuilding);
					Util.disableCombo(cbTerrain);
					Util.disableCombo(cbSite);
					Util.disableCombo(cbCountry);
				}

				this.updateBuildingData(data);
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
			case AC.TABLE_ID_ROOM:
				tfLocationCiAlias.setVisible(true);
				tfRoomFloor.setVisible(true);
				tfStandortCode.setVisible(false);
				tfStandortNameEn.setVisible(false);
				cbRoom.setVisible(false);
				cbBuildingArea.setVisible(true);
				cbBuilding.setVisible(true);
//				pBuilding.setVisible(false);//true
				cbTerrain.setVisible(true);
				cbSite.setVisible(true);
				cbCountry.setVisible(true);
				cbRoom.reset();

				
				if(data.isCiCreate) {
					tfLocationCiAlias.reset();
					tfRoomFloor.reset();
					pBuilding.setVisible(false);
					
					Util.clearCombo(cbBuildingArea);
					Util.clearCombo(cbBuilding);
					Util.clearCombo(cbTerrain);
					Util.clearCombo(cbSite);
//					Util.clearCombo(cbCountry);
//					cbBuildingArea.reset();//remote statt local combo?
//					cbBuilding.reset();
//					cbTerrain.reset();
//					cbSite.reset();
					cbCountry.reset();
					
					Util.disableCombo(cbBuildingArea);//enableCombo
					Util.disableCombo(cbBuilding);//enableCombo
					Util.disableCombo(cbTerrain);//enableCombo
					Util.disableCombo(cbSite);//enableCombo
					Util.enableCombo(cbCountry);
				} else {
					pBuilding.setVisible(true);
					
					if(AIR.AirAclManager.isRelevance(cbBuildingArea, data)) {
						Util.enableCombo(cbBuildingArea);
						cbBuildingArea.reset();
						cbBuildingArea.getStore().removeAll();
						cbBuildingArea.getStore().setBaseParam('id', data.gebaeudeId);
						cbBuildingArea.allQuery = data.gebaeudeId;
						
						//Alternative zu remote loading: um Eingabefilterung local zu machen.
						//Alternativ beim remote loading müsste auf combo.mode = 'local' zurückgesetzt
						//werden direkt nachdem der combo hideTrigger betätigt wurde
						cbBuildingArea.getStore().load();
						
//						cbBuildingArea.isUpdateInit = true;
					} else {
						Util.disableCombo(cbBuildingArea);
					}
					
					/*
					var buildingAreas = data.buildingAreaData.split(',');
					var buildingAreaObjects = [];
					for(var i = 0; i < buildingAreas.length; i++) {
						var buildingArea = buildingAreas[i].split('=');
						buildingAreaObjects.push(buildingArea);
					}
					cbBuildingArea.getStore().loadData(buildingAreaObjects);
					*/
					
					tfLocationCiAlias.setValue(data.alias);
					tfRoomFloor.setValue(data.floor);
					cbBuildingArea.setValue(data.areaName);//areaId
					cbBuilding.setValue(data.gebaeudeName);
					cbTerrain.setValue(data.terrainName);
					cbSite.setValue(data.standortName);
					cbCountry.setValue(AAM.getLanguage() == 'DE' ? data.landName : data.landNameEn);//data.landNameEn
					
					Util.disableCombo(cbBuilding);
					Util.disableCombo(cbTerrain);
					Util.disableCombo(cbSite);
					Util.disableCombo(cbCountry);
				}
				
				this.updateBuildingData(data);
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);//!data.isCiCreate true 
				break;
			case AC.TABLE_ID_BUILDING_AREA://Test Areas: E 39 I400,E 39 T001
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfStandortCode.setVisible(false);
				tfStandortCode.reset();
				tfStandortNameEn.setVisible(false);
				tfStandortNameEn.reset();
				cbRoom.setVisible(false);
				cbRoom.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				
				
				cbBuilding.setVisible(true);
//				pBuilding.setVisible(true);
				cbTerrain.setVisible(true);
				
				if(data.isCiCreate) {
					cbSite.setVisible(true);
					cbCountry.setVisible(true);
					pBuilding.setVisible(false);
					
					Util.clearCombo(cbBuilding);
					Util.clearCombo(cbTerrain);
					Util.clearCombo(cbSite);
//					Util.clearCombo(cbCountry);
//					cbBuilding.reset();
//					cbTerrain.reset();
//					cbSite.reset();
					cbCountry.reset();
					
					Util.disableCombo(cbBuilding);//enableCombo
					Util.disableCombo(cbTerrain);//enableCombo
					Util.disableCombo(cbSite);//enableCombo
					Util.enableCombo(cbCountry);
				} else {
					pBuilding.setVisible(true);
					
//					cbBuilding.setValue(data.areaId);
//					cbBuilding.setRawValue(data.areaName);
//					cbBuilding.query = data.areaId;
//					cbBuilding.lastQuery = data.areaId;
					
//					cbBuilding.getStore().setBaseParam('ciId', data.areaId);
//					cbBuilding.allQuery = data.areaId;
					
					/*
					cbBuilding.getStore().setBaseParam('id', data.terrainId);
					cbBuilding.allQuery = data.terrainId;
					
					if(AIR.AirAclManager.isRelevance(cbBuilding, data)) {
						Util.enableCombo(cbBuilding);

						cbBuilding.reset();
						cbBuilding.getStore().removeAll();
						cbBuilding.getStore().setBaseParam('id', data.terrainId);
						cbBuilding.allQuery = data.terrainId;
	
						cbBuilding.getStore().load();
					} else
						Util.disableCombo(cbBuilding);
					*/
					Util.disableCombo(cbBuilding);
					
					
					cbBuilding.setValue(data.gebaeudeName);
					cbTerrain.setValue(data.terrainName);
					cbSite.setValue(data.standortName);
					cbCountry.setValue(AAM.getLanguage() == 'DE' ? data.landName : data.landNameEn);//data.landNameEn
					
					
					Util.disableCombo(cbTerrain);
					Util.disableCombo(cbSite);
					Util.disableCombo(cbCountry);
				}
				

				this.updateBuildingData(data);
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);//false !data.isCiCreate
				break;
			case AC.TABLE_ID_BUILDING:
				tfLocationCiAlias.setValue(data.alias);
				tfLocationCiAlias.setVisible(true);
				cbRoom.setVisible(false);
				cbRoom.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfStandortCode.setVisible(false);
				tfStandortCode.reset();
				tfStandortNameEn.setVisible(false);
				tfStandortNameEn.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				cbBuilding.setVisible(false);
				pBuilding.setVisible(false);
				cbBuilding.reset();
				
				cbTerrain.setVisible(true);
				cbSite.setVisible(true);
				cbCountry.setVisible(true);
				
				if(data.isCiCreate) {
					Util.clearCombo(cbTerrain);
					Util.clearCombo(cbSite);
//					Util.clearCombo(cbCountry);
//					cbTerrain.reset();
//					cbSite.reset();
					cbCountry.reset();
					
					Util.disableCombo(cbTerrain);//enableCombo
					Util.disableCombo(cbSite);//enableCombo
					Util.enableCombo(cbCountry);
				} else {
					/*cbTerrain.getStore().setBaseParam('id', data.standortId);
					cbTerrain.allQuery = data.terrainId;
					
					if(AIR.AirAclManager.isRelevance(cbTerrain, data)) {
						Util.enableCombo(cbBuilding);

						cbTerrain.reset();
						cbTerrain.getStore().removeAll();
						cbTerrain.getStore().setBaseParam('id', data.standortId);
						cbTerrain.allQuery = data.standortId;
	
						cbTerrain.getStore().load();
					} else
						Util.disableCombo(cbTerrain);*/
					
					
					if(AIR.AirAclManager.isRelevance(pSpecificsLocationStreet.getComponent('tfStreet'), data)) {
						pSpecificsLocationStreet.getComponent('tfStreet').enable();
						pSpecificsLocationStreet.getComponent('tfStreetNumber').enable();
						
						pSpecificsLocationAddress.getComponent('tfPostalCode').enable();
						pSpecificsLocationAddress.getComponent('tfLocation').enable();
					} else {
						pSpecificsLocationStreet.getComponent('tfStreet').disable();
						pSpecificsLocationStreet.getComponent('tfStreetNumber').disable();
						
						pSpecificsLocationAddress.getComponent('tfPostalCode').disable();
						pSpecificsLocationAddress.getComponent('tfLocation').disable();
					}
					
					
					cbTerrain.setValue(data.terrainName);
					cbSite.setValue(data.standortName);
					cbCountry.setValue(AAM.getLanguage() == 'DE' ? data.landName : data.landNameEn);//data.landNameEn
					
					Util.disableCombo(cbTerrain);
					Util.disableCombo(cbSite);
					Util.disableCombo(cbCountry);
				}
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, true);//true !data.isCiCreate
				break;
			case AC.TABLE_ID_TERRAIN:
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				cbRoom.setVisible(false);
				cbRoom.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfStandortCode.setVisible(false);
				tfStandortCode.reset();
				tfStandortNameEn.setVisible(false);
				tfStandortNameEn.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				cbBuilding.setVisible(false);
				pBuilding.setVisible(false);
				cbBuilding.reset();
				

				cbSite.setVisible(true);
				cbCountry.setVisible(true);
				
				if(data.isCiCreate) {
					Util.clearCombo(cbSite);
//					Util.clearCombo(cbCountry);
//					cbSite.reset();
					cbCountry.reset();
					
					Util.disableCombo(cbSite);//enableCombo
					Util.enableCombo(cbCountry);
				} else {
					cbSite.setValue(data.standortName);
					cbCountry.setValue(AAM.getLanguage() == 'DE' ? data.landName : data.landNameEn);//data.landNameEn
					
					Util.disableCombo(cbSite);
					Util.disableCombo(cbCountry);
				}
				
				cbTerrain.setVisible(false);
				cbTerrain.reset();
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
			case AC.TABLE_ID_SITE:
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				cbRoom.setVisible(false);
				cbRoom.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfStandortCode.setVisible(true);
				tfStandortCode.reset();
				tfStandortNameEn.setVisible(true);
				tfStandortNameEn.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				cbBuilding.setVisible(false);
				pBuilding.setVisible(false);
				cbBuilding.reset();
				
				cbTerrain.setVisible(false);
				cbTerrain.reset();
				cbSite.setVisible(false);
				cbSite.reset();
				
				cbCountry.setVisible(true);
				
				if(data.isCiCreate) {
//					Util.clearCombo(cbCountry);
					cbCountry.reset();
					tfStandortCode.reset();
					tfStandortNameEn.reset();
					
					Util.enableCombo(cbCountry);
				} else {
					cbCountry.setValue(AAM.getLanguage() == 'DE' ? data.landName : data.landNameEn);//data.landNameEn
					tfStandortCode.setValue(data.standortCode);
					tfStandortNameEn.setValue(data.nameEn);
					
					Util.disableCombo(cbCountry);
				}
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
		}
		
//		this.doLayout();//nötig wegen cbBuildingArea, ansonsten wird deren width=20 gesetzt?
		this.getComponent('pBuilding').doLayout();
	},
	
	updateBuildingData: function(data) {
		var pBuilding = this.getComponent('pBuilding');
		
		if(!data.street)
			data.street = '';
		if(!data.streetNumber)
			data.streetNumber = '';
		if(!data.postalCode)
			data.postalCode = '';
		if(!data.location)
			data.location = '';
			
		pBuilding.getComponent('lbtStreetAndNumber').setText(data.street + ' ' + data.streetNumber);
		pBuilding.getComponent('lbtPostalCodeLocation').setText(data.postalCode + ' ' + data.location);
	},
	
	updateLocation: function(pSpecificsLocationStreet, pSpecificsLocationAddress, data, exists) {
		if(exists) {
			pSpecificsLocationStreet.setVisible(true);
			pSpecificsLocationAddress.setVisible(true);
			
			if(data.isCiCreate) {
				pSpecificsLocationStreet.getComponent('tfStreet').reset();
				pSpecificsLocationStreet.getComponent('tfStreetNumber').reset();
				
				pSpecificsLocationAddress.getComponent('tfPostalCode').reset();
				pSpecificsLocationAddress.getComponent('tfLocation').reset();
				
				if(data.tableId == AC.TABLE_ID_BUILDING) {
					pSpecificsLocationStreet.getComponent('tfStreet').enable();
					pSpecificsLocationStreet.getComponent('tfStreetNumber').enable();
					
					pSpecificsLocationAddress.getComponent('tfPostalCode').enable();
					pSpecificsLocationAddress.getComponent('tfLocation').enable();
				} else {
					pSpecificsLocationStreet.getComponent('tfStreet').disable();
					pSpecificsLocationStreet.getComponent('tfStreetNumber').disable();
					
					pSpecificsLocationAddress.getComponent('tfPostalCode').disable();
					pSpecificsLocationAddress.getComponent('tfLocation').disable();
				}
			} else {
				pSpecificsLocationStreet.getComponent('tfStreet').setValue(data.street);
				pSpecificsLocationStreet.getComponent('tfStreetNumber').setValue(data.streetNumber);
				
				pSpecificsLocationAddress.getComponent('tfPostalCode').setValue(data.postalCode);
				pSpecificsLocationAddress.getComponent('tfLocation').setValue(data.location);
			}
		} else {
			pSpecificsLocationStreet.getComponent('tfStreet').reset();
			pSpecificsLocationStreet.getComponent('tfStreetNumber').reset();
			pSpecificsLocationStreet.setVisible(false);
			
			pSpecificsLocationAddress.getComponent('tfPostalCode').reset();
			pSpecificsLocationAddress.getComponent('tfLocation').reset();
			pSpecificsLocationAddress.setVisible(false);
		}
	},

	setData: function(data) {

		if(data.isCiCreate) {
			data.id = 0;
//			data.name = this.getComponent('tfLocationCiName').getValue();
		} else {
			data.id = this.ciId;
//			data.name = this.name;
		}
		
		var tfLocationCiName = this.getComponent('tfLocationCiName');
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		var cbRoom = this.getComponent('cbRoom');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbBuilding = this.getComponent('cbBuilding');//this.getComponent('pBuilding').getComponent('cbBuilding');
		var cbTerrain = this.getComponent('cbTerrain');
		var cbSite = this.getComponent('cbSite');
		var cbCountry = this.getComponent('cbCountry');
		

		data.name = tfLocationCiName.getValue();
		
//		typeof cbRoom.getValue() === 'string' - wichtig weil: wurde die Combobox durch Bedienung geladen und ergibt daher combo.getValue()
//		einen Integer Wert und keinen String wie wenn der Combobox Wert nur mit einem String gesetzt wurde.
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_POSITION:
				//if(!cbRoom.disabled)
					data.roomId = data.isCiCreate ?
									cbRoom.getValue() :
									typeof cbRoom.getValue() === 'string' ? AAM.getAppDetail().raumId : cbRoom.getValue();
				break;
			case AC.TABLE_ID_ROOM:
//				if(!tfLocationCiAlias.disabled)
					data.alias = tfLocationCiAlias.getValue();
				
				var tfRoomFloor = this.getComponent('tfRoomFloor');
				if(!tfRoomFloor.disabled)
					data.floor = tfRoomFloor.getValue();
				
//				if(!cbBuildingArea.disabled)
					data.areaId = data.isCiCreate ? 
									cbBuildingArea.getValue() :
									typeof cbBuildingArea.getValue() === 'string' ? AAM.getAppDetail().areaId : cbBuildingArea.getValue();
				//2. Möglichkeit: 
				//3. Möglichkeit: nur untersuchen ob cbBuildingArea.getValue() String ist oder nicht. Wenn ja, areadId von getAppDetail()
									
				break;
			case AC.TABLE_ID_BUILDING_AREA:
				//BuildingHbn.saveBuildingArea(String, BuildingAreaDTO): ORA-20000: Building area 1157 cannot be moved to another building. Set parameter CHECK_LOCATION_INTEGRITY to N to disable this check.
//				if(!cbBuilding.disabled)
//					data.buildingId = cbBuilding.getValue();
				
				data.buildingId = data.isCiCreate ? 
									cbBuilding.getValue() :
									typeof cbBuilding.getValue() === 'string' ? AAM.getAppDetail().gebaeudeId : cbBuilding.getValue();
				
				break;
			case AC.TABLE_ID_BUILDING:
				if(!tfLocationCiAlias.disabled)
					data.alias = tfLocationCiAlias.getValue();
				
//				if(!cbTerrain.disabled)
//					data.terrainId = cbTerrain.getValue();
				
				data.terrainId = data.isCiCreate ? 
									cbTerrain.getValue() :
									typeof cbTerrain.getValue() === 'string' ? AAM.getAppDetail().terrainId : cbTerrain.getValue();

				
//				if(data.isCiCreate) {
					var tfStreet = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreet');
					var tfStreetNumber = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreetNumber');
	
					var tfPostalCode = this.getComponent('pSpecificsLocationAddress').getComponent('tfPostalCode');
					var tfLocation = this.getComponent('pSpecificsLocationAddress').getComponent('tfLocation');
					
					data.street = tfStreet.getValue();
					data.streetNumber = tfStreetNumber.getValue();
					data.postalCode = tfPostalCode.getValue();
					data.location = tfLocation.getValue();
//				}
				
				break;
			case AC.TABLE_ID_TERRAIN:
//				if(!cbSite.disabled)
//					data.standortId = cbSite.getValue();
				
				data.standortId = data.isCiCreate ? 
									cbSite.getValue() :
									typeof cbSite.getValue() === 'string' ? AAM.getAppDetail().standortId : cbSite.getValue();

				break;
			case AC.TABLE_ID_SITE:
				var tfStandortCode = this.getComponent('tfStandortCode');
				if(!tfStandortCode.disabled)
					data.standortCode = tfStandortCode.getValue();
				
				var tfStandortNameEn = this.getComponent('tfStandortNameEn');
				if(!tfStandortNameEn.disabled)
					data.nameEn = tfStandortNameEn.getValue();
				
//				if(!cbCountry.disabled)
//					data.landId = cbCountry.getValue();
				data.landId = data.isCiCreate ? 
								cbCountry.getValue() :
								typeof cbCountry.getValue() === 'string' ? AAM.getAppDetail().landId : cbCountry.getValue();

				break;
			default: break;
		}
	},

	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('tfLocationCiName'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfLocationCiAlias'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfRoomFloor'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfStandortCode'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfStandortNameEn'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbBuildingArea'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbBuilding'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('pBuilding').getComponent('lBuilding'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('cbRoom'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbTerrain'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbSite'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbCountry'), data);
		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationStreet.getComponent('tfStreet'), data);
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationStreet.getComponent('tfStreetNumber'), data);
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationAddress.getComponent('tfPostalCode'), data);
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationAddress.getComponent('tfLocation'), data);
		
		AIR.AirAclManager.setAccessMode(pSpecificsLocationStreet.getComponent('lStreetAndNumber'), data);
		AIR.AirAclManager.setAccessMode(pSpecificsLocationAddress.getComponent('lPostalCodeLocation'), data);
	},
	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {
		var pBuilding = this.getComponent('pBuilding');
		
		this.setFieldLabel(this.getComponent('tfLocationCiName'), labels.name);
		this.setFieldLabel(this.getComponent('tfLocationCiAlias'), labels.alias);
		this.setFieldLabel(this.getComponent('tfRoomFloor'), labels.floor);
		this.setFieldLabel(this.getComponent('tfStandortCode'), labels.code);
		this.setFieldLabel(this.getComponent('tfStandortNameEn'), labels.nameEn);
		this.setFieldLabel(this.getComponent('cbRoom'), labels.room);
		this.setFieldLabel(this.getComponent('cbBuildingArea'), labels.buildingArea);
		this.setFieldLabel(this.getComponent('cbBuilding'), labels.building);
//		pBuilding.getComponent('lBuilding').setText(labels.building);
		this.setFieldLabel(this.getComponent('cbTerrain'), labels.terrain);
		this.setFieldLabel(this.getComponent('cbSite'), labels.site);
		this.setFieldLabel(this.getComponent('cbCountry'), labels.country);
		
		var cbCountry = this.getComponent('cbCountry');
		cbCountry.displayField = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
		delete cbCountry.list;
		delete cbCountry.tpl;
		cbCountry.initList();
		
		var c = (AAM.getLanguage() == 'DE' ? AAM.getAppDetail().landName : AAM.getAppDetail().landNameEn) || cbCountry.getValue();
		cbCountry.setValue(c);//data.landNameEn
		
		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		pSpecificsLocationStreet.getComponent('lStreetAndNumber').setText(labels.streetAndNumber);
		pSpecificsLocationAddress.getComponent('lPostalCodeLocation').setText(labels.postalCodeLocation);
		
//		pBuilding.getComponent('lbStreetAndNumber').setText(labels.streetAndNumber);
//		pBuilding.getComponent('lbPostalCodeLocation').setText(labels.postalCodeLocation);
	},
	
	updateToolTips: function(toolTips) {

	}
});
Ext.reg('AIR.CiSpecificsLocationItemView', AIR.CiSpecificsLocationItemView);
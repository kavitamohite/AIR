Ext.namespace('AIR');

AIR.CiSpecificsLocationItemView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    
		    border: false,
		    layout: 'form',
		    
		    items: [{
		        id: 'tfLocationCiAlias',
		    	xtype: 'textfield',
		        fieldLabel: 'Alias',
		        width: 230
//		        anchor: '70%',
	        },{
		        id: 'tfRoomFloor',
		    	xtype: 'textfield',
		        fieldLabel: 'Floor',
		        width: 230
//		        anchor: '70%',
		    },{
		        id: 'tfRoom',
		    	xtype: 'textfield',
		        fieldLabel: 'Room',
		        disabled: true,
//		        anchor: '70%'
		        width: 230
	        },{
//		        id: 'cbBuildingArea',
//		    	xtype: 'textfield',
//		        fieldLabel: 'BuildingArea',
//		        anchor: '70%',
//		        disabled: true
////			        width: 230,
	        	
		        xtype: 'filterCombo',//combo
		        id: 'cbBuildingArea',

		        width: 230,
//		        anchor: '70%',
		        fieldLabel: 'Building Area',
		        disabled: true,
		        hideTrigger: true,
		        
		        store: AIR.AirStoreFactory.createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
	        },{
//		        id: 'cbBuilding',
//		    	xtype: 'textfield',
//		        fieldLabel: 'Building',
//		        anchor: '70%',
//		        disabled: true
////			        width: 230,
	        	
	        	
		        xtype: 'filterCombo',//combo filterCombo
		        id: 'cbBuilding',
		        disabled: true,
		        hideTrigger: true,
		        
		        width: 230,
//		        anchor: '70%',
		        fieldLabel: 'Building',
				
		        
		        store: AIR.AirStoreFactory.createBuildingsByBuildingAreaStore(),//createIdNameStore(),//new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
//		        lazyRender: true,
//		        lazyInit: false
//		        mode: 'remote'//local
		        queryParam: 'id'
		    },{
		        id: 'tfTerrain',
		    	xtype: 'textfield',
		        fieldLabel: 'Terrain',
		        disabled: true,
//		        anchor: '70%'
		        width: 230
	        },{
		        id: 'tfSite',
		    	xtype: 'textfield',
		        fieldLabel: 'Site',
		        disabled: true,
//		        anchor: '70%'
		        width: 230
		    },{
		        id: 'tfCountry',
		    	xtype: 'textfield',
		        fieldLabel: 'Country',
		        disabled: true,
//		        anchor: '70%'
		        width: 230
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
			    	disabled: true
		    	},{
			    	xtype: 'textfield',
			        id: 'tfStreetNumber',
			    	width: 50,
			    	
			    	style: {
						marginLeft: 5
					},
			    	disabled: true
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
			    	disabled: true
		    	},{
			    	xtype: 'textfield',
			        id: 'tfLocation',
			    	width: 150,
			    	
			    	style: {
						marginLeft: 5
					},
			    	disabled: true
		    	}]
		    }]
		});
		
		AIR.CiSpecificsLocationItemView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
//		var cbBuilding = this.getComponent('cbBuilding');
//		cbBuilding.on('beforequery', this.onBeforeBuildingSelect, this);
//		cbBuilding.on('select', this.onBuildingSelect, this);
		
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		var tfRoomFloor = this.getComponent('tfRoomFloor');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
//		var cbBuilding = this.getComponent('cbBuilding');
		
		cbBuildingArea.on('select', this.onComboSelect, this);
		cbBuildingArea.on('change', this.onComboChange, this);
//		cbBuilding.on('select', this.onComboSelect, this);
//		cbBuilding.on('change', this.onComboChange, this);
		
		tfLocationCiAlias.on('change', this.onFieldChange, this);
		tfRoomFloor.on('change', this.onFieldChange, this);
	},
	
//	onBeforeBuildingSelect: function(queryEvent) {
//		return this.isInitial;
//	},
//	onBuildingSelect: function(combo, record, index) {
//		this.isInitial = false;
//	},

	onComboSelect: function(combo, record, index) {
		this.ownerCt.fireEvent('ciChange', this, combo);
	},
	onComboChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.ownerCt.fireEvent('ciChange', this, combo);
	},

	onFieldChange: function(textfield, newValue, oldValue) {
		this.ownerCt.fireEvent('ciChange', this, textfield, newValue);
	},
	
	init: function() {
		
	},
    
	update: function(data) {
		this.ciId = data.id;
		this.name = data.name;
		
//		this.isInitial = true;
		this.updateAccessMode(data);
		
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		
		var tfRoomFloor = this.getComponent('tfRoomFloor');
		var tfRoom = this.getComponent('tfRoom');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbBuilding = this.getComponent('cbBuilding');
		var tfTerrain = this.getComponent('tfTerrain');
		var tfSite = this.getComponent('tfSite');
		var tfCountry = this.getComponent('tfCountry');
		
//		Util.disableCombo(cbBuilding);
		Util.disableCombo(cbBuildingArea);

		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		//use builder pattern managing each field depending on tableId instead of switch/case?
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_ROOM:
				tfLocationCiAlias.setVisible(true);
				tfLocationCiAlias.setValue(data.alias);
				tfRoomFloor.setVisible(true);
				tfRoomFloor.setValue(data.floor);
				
				
				tfRoom.setVisible(false);
				tfRoom.reset();
				cbBuildingArea.setVisible(true);
				cbBuildingArea.setValue(data.areaId);
//				cbBuildingArea.setRawValue(data.areaName);
				if(AIR.AirAclManager.isRelevance(cbBuildingArea, data))
					Util.enableCombo(cbBuildingArea);
				
				
				var buildingAreas = data.buildingAreaData.split(',');
				var buildingAreaObjects = [];
				for(var i = 0; i < buildingAreas.length; i++) {
					var buildingArea = buildingAreas[i].split('=');
					buildingAreaObjects.push(buildingArea);
				}
				cbBuildingArea.getStore().loadData(buildingAreaObjects);
				
				
				cbBuilding.setVisible(true);
				cbBuilding.setValue(data.gebaeudeName);
				
				tfTerrain.setVisible(true);
				tfTerrain.setValue(data.terrainName);
				tfSite.setVisible(true);
				tfSite.setValue(data.standortName);
				tfCountry.setVisible(true);
				tfCountry.setValue(data.landNameEn);
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, true);
				break;
			case AC.TABLE_ID_BUILDING_AREA://Test Areas: E 39 I400,E 39 T001
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfRoom.setVisible(false);
				tfRoom.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				
				cbBuilding.setValue(data.areaId);
//				cbBuilding.setRawValue(data.areaName);
				cbBuilding.getStore().setBaseParam('ciId', data.areaId);
//				cbBuilding.query = data.areaId;
//				cbBuilding.id = data.areaId;
//				cbBuilding.lastQuery = data.areaId;
				cbBuilding.allQuery = data.areaId;
				
//				cbBuilding.setValue(data.gebaeudeName);
				cbBuilding.setVisible(true);
//				if(AIR.AirAclManager.isRelevance(cbBuilding, data))
//					Util.enableCombo(cbBuilding);
				
				
//				var buildings = data.buildingData.split(',');
//				var buildingObjects = [];
//				for(var i = 0; i < buildings.length; i++) {
//					var building = buildings[i].split('=');
//					buildingObjects.push(building);
//				}
//				cbBuilding.getStore().loadData(buildingObjects);
				
				
				tfTerrain.setVisible(true);
				tfTerrain.setValue(data.terrainName);
				tfSite.setVisible(true);
				tfSite.setValue(data.standortName);
				
				tfCountry.setVisible(false);
				tfCountry.reset();
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
			case AC.TABLE_ID_BUILDING:
				tfLocationCiAlias.setValue(data.alias);
				tfLocationCiAlias.setVisible(true);
				tfRoom.setVisible(false);
				tfRoom.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				cbBuilding.setVisible(false);
				cbBuilding.reset;
				
				tfTerrain.setVisible(true);
				tfTerrain.setValue(data.terrainName);
				tfSite.setVisible(true);
				tfSite.setValue(data.standortName);
				tfCountry.setVisible(true);
				tfCountry.setValue(data.landNameEn);
				
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, true);
				break;
			case AC.TABLE_ID_POSITION:
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfRoom.setVisible(true);
				tfRoom.setValue(data.raumName);
				cbBuildingArea.setVisible(true);
				cbBuildingArea.setValue(data.areaName);
				cbBuilding.setVisible(true);
				cbBuilding.setValue(data.gebaeudeName);
				
				tfTerrain.setVisible(true);
				tfTerrain.setValue(data.terrainName);
				tfSite.setVisible(true);
				tfSite.setValue(data.standortName);
				
				tfCountry.setVisible(false);
				tfCountry.reset();
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
			case AC.TABLE_ID_TERRAIN:
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				tfRoom.setVisible(false);
				tfRoom.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				cbBuilding.setVisible(false);
				cbBuilding.reset();
				
				tfTerrain.setVisible(false);
				tfTerrain.reset();
				tfSite.setVisible(true);
				tfSite.setValue(data.standortName);
				tfCountry.setVisible(true);
				tfCountry.setValue(data.landNameEn);
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
			case AC.TABLE_ID_SITE:
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				tfRoom.setVisible(false);
				tfRoom.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				cbBuildingArea.setVisible(false);
				cbBuildingArea.reset();
				cbBuilding.setVisible(false);
				cbBuilding.reset();
				
				tfTerrain.setVisible(false);
				tfTerrain.reset();
				tfSite.setVisible(false);
				tfSite.reset();
				tfCountry.setVisible(true);
				tfCountry.setValue(data.landNameEn);
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
//			default:
//				tfLocationCiAlias.setVisible(false);
//				tfLocationCiAlias.reset();
//				tfRoomFloor.setVisible(false);
//				tfRoomFloor.reset();
//				tfRoom.setVisible(false);
//				tfRoom.reset();
//				cbBuildingArea.setVisible(false);
//				cbBuildingArea.reset();
//				cbBuilding.setVisible(false);
//				cbBuilding.reset();
//				
//				tfTerrain.setVisible(false);
//				tfTerrain.reset();
//				tfSite.setVisible(false);
//				tfSite.reset();
//				
//				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
//				break;
		}
		
		this.doLayout();//nötig wegen cbBuildingArea, ansonsten wird deren width=20 gesetzt?
	},
	
	updateLocation: function(pSpecificsLocationStreet, pSpecificsLocationAddress, data, exists) {
		if(exists) {
			pSpecificsLocationStreet.getComponent('tfStreet').setValue(data.street);
			pSpecificsLocationStreet.getComponent('tfStreetNumber').setValue(data.streetNumber);
			pSpecificsLocationStreet.setVisible(true);
			
			pSpecificsLocationAddress.getComponent('tfPostalCode').setValue(data.postalCode);
			pSpecificsLocationAddress.getComponent('tfLocation').setValue(data.location);
			pSpecificsLocationAddress.setVisible(true);
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
		data.id = this.ciId;
		data.name = this.name;
		
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		var tfRoomFloor = this.getComponent('tfRoomFloor');
		var tfRoom = this.getComponent('tfRoom');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbBuilding = this.getComponent('cbBuilding');
		var tfTerrain = this.getComponent('tfTerrain');
		var tfSite = this.getComponent('tfSite');
		var tfCountry = this.getComponent('tfCountry');
		
//		var tfStreet = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreet');
//		var tfStreetNumber = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreetNumber');
//
//		var tfPostalCode = this.getComponent('pSpecificsLocationAddress').getComponent('tfPostalCode');
//		var tfLocation = this.getComponent('pSpecificsLocationAddress').getComponent('tfLocation');
		
//		var field = this.getComponent('applicationId');
//		data.id = field.getValue();
		
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_POSITION:
				break;
			case AC.TABLE_ID_ROOM:
				if(!tfLocationCiAlias.disabled)
					data.alias = tfLocationCiAlias.getValue();
				
				if(!tfRoomFloor.disabled)
					data.floor = tfRoomFloor.getValue();
				
				if(!cbBuildingArea.disabled)
					data.areaId = cbBuildingArea.getValue();
				
//				if(!tfStreet.disabled)
//					data.street = tfStreet.getValue();
//				
//				if(!tfStreetNumber.disabled)
//					data.streetNumber = tfStreetNumber.getValue();
//				
//				if(!tfPostalCode.disabled)
//					data.postalCode = tfPostalCode.getValue();
//				
//				if(!tfLocation.disabled)
//					data.location = tfLocation.getValue();
				
				break;
			case AC.TABLE_ID_BUILDING:
				if(!tfLocationCiAlias.disabled)
					data.alias = tfLocationCiAlias.getValue();
				break;
			case AC.TABLE_ID_BUILDING_AREA:
				//BuildingHbn.saveBuildingArea(String, BuildingAreaDTO): ORA-20000: Building area 1157 cannot be moved to another building. Set parameter CHECK_LOCATION_INTEGRITY to N to disable this check.
//				data.buildingId = cbBuilding.getValue();
				break;
		}
	},

	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('tfLocationCiAlias'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfRoomFloor'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('cbBuildingArea'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('cbBuilding'), data);
		
		//werden nie geändert:
//		AIR.AirAclManager.setAccessMode(this.getComponent('tfRoom'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('tfTerrain'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('tfSite'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('tfCountry'), data);
		
//		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
//		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
//		
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationStreet.getComponent('tfStreet'), data);
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationStreet.getComponent('tfStreetNumber'), data);
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationAddress.getComponent('tfPostalCode'), data);
//		AIR.AirAclManager.setAccessMode(pSpecificsLocationAddress.getComponent('tfLocation'), data);
	},
	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {
		this.setFieldLabel(this.getComponent('tfLocationCiAlias'), labels.alias);
		this.setFieldLabel(this.getComponent('tfRoomFloor'), labels.floor);
		this.setFieldLabel(this.getComponent('tfRoom'), labels.room);
		this.setFieldLabel(this.getComponent('cbBuildingArea'), labels.buildingArea);
		this.setFieldLabel(this.getComponent('cbBuilding'), labels.building);
		this.setFieldLabel(this.getComponent('tfTerrain'), labels.terrain);
		this.setFieldLabel(this.getComponent('tfSite'), labels.site);
		this.setFieldLabel(this.getComponent('tfCountry'), labels.country);
		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		pSpecificsLocationStreet.getComponent('lStreetAndNumber').setText(labels.streetAndNumber);
		pSpecificsLocationAddress.getComponent('lPostalCodeLocation').setText(labels.postalCodeLocation);
	},
	
	updateToolTips: function(toolTips) {

	}
});
Ext.reg('AIR.CiSpecificsLocationItemView', AIR.CiSpecificsLocationItemView);
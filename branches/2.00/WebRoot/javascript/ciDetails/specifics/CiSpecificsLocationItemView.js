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
		        anchor: '70%'
//			        width: 230,
	        },{
		        id: 'tfRoomFloor',
		    	xtype: 'textfield',
		        fieldLabel: 'Floor',
		        anchor: '70%'
//			        width: 230,
		    },{
		        id: 'tfRoom',
		    	xtype: 'textfield',
		        fieldLabel: 'Room',
		        anchor: '70%'
//			        width: 230,
	        },{
		        id: 'tfBuildingArea',
		    	xtype: 'textfield',
		        fieldLabel: 'BuildingArea',
		        anchor: '70%'
//			        width: 230,
	        },{
		        id: 'tfBuilding',
		    	xtype: 'textfield',
		        fieldLabel: 'Building',
		        anchor: '70%'
//			        width: 230,
		    },{
		        id: 'tfTerrain',
		    	xtype: 'textfield',
		        fieldLabel: 'Terrain',
		        anchor: '70%'
//			        width: 230,
	        },{
		        id: 'tfSite',
		    	xtype: 'textfield',
		        fieldLabel: 'Site',
		        anchor: '70%'
//			        width: 230,
		    },{
		        id: 'tfCountry',
		    	xtype: 'textfield',
		        fieldLabel: 'Country',
		        anchor: '70%'
//			        width: 230,
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
			    	width: 250
		    	},{
			    	xtype: 'textfield',
			        id: 'tfStreetNumber',
			    	width: 50,
			    	
			    	style: {
						marginLeft: 5
					}
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
			    	width: 50
		    	},{
			    	xtype: 'textfield',
			        id: 'tfLocation',
			    	width: 150,
			    	
			    	style: {
						marginLeft: 5
					}
		    	}]
		    }]
		});
		
		AIR.CiSpecificsLocationItemView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
	},

    
	update: function(data) {
		this.updateAccessMode(data);
		
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		
		var tfRoomFloor = this.getComponent('tfRoomFloor');
		var tfRoom = this.getComponent('tfRoom');
		var tfBuildingArea = this.getComponent('tfBuildingArea');
		var tfBuilding = this.getComponent('tfBuilding');
		var tfTerrain = this.getComponent('tfTerrain');
		var tfSite = this.getComponent('tfSite');
		var tfCountry = this.getComponent('tfCountry');

		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_ROOM:
				tfLocationCiAlias.setVisible(true);
				tfLocationCiAlias.setValue(data.alias);
				tfRoomFloor.setVisible(true);
				tfRoomFloor.setValue(data.floor);
				
				tfRoom.setVisible(false);
				tfRoom.reset();
				tfBuildingArea.setVisible(true);
				tfBuildingArea.setValue(data.areaName);
				tfBuilding.setVisible(true);
				tfBuilding.setValue(data.gebaeudeName);
				
				tfTerrain.setVisible(true);
				tfTerrain.setValue(data.terrainName);
				tfSite.setVisible(true);
				tfSite.setValue(data.standortName);
				tfCountry.setVisible(true);
				tfCountry.setValue(data.landNameEn);
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, true);
				break;
			case AC.TABLE_ID_BUILDING_AREA:
				tfLocationCiAlias.setVisible(false);
				tfLocationCiAlias.reset();
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfRoom.setVisible(false);
				tfRoom.reset();
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(true);
				tfBuilding.setValue(data.gebaeudeName);
				
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
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(false);
				tfBuilding.reset;
				
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
				tfBuildingArea.setVisible(true);
				tfBuildingArea.setValue(data.areaName);
				tfBuilding.setVisible(true);
				tfBuilding.setValue(data.gebaeudeName);
				
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
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(false);
				tfBuilding.reset();
				
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
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(false);
				tfBuilding.reset();
				
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
//				tfBuildingArea.setVisible(false);
//				tfBuildingArea.reset();
//				tfBuilding.setVisible(false);
//				tfBuilding.reset();
//				
//				tfTerrain.setVisible(false);
//				tfTerrain.reset();
//				tfSite.setVisible(false);
//				tfSite.reset();
//				
//				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
//				break;
		}
		

		
		
		

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
		
	},

	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('tfLocationCiAlias'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfRoomFloor'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfRoom'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfBuildingArea'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfBuilding'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfTerrain'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfSite'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfCountry'), data);
		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		AIR.AirAclManager.setAccessMode(pSpecificsLocationStreet.getComponent('tfStreet'), data);
		AIR.AirAclManager.setAccessMode(pSpecificsLocationStreet.getComponent('tfStreetNumber'), data);
		AIR.AirAclManager.setAccessMode(pSpecificsLocationAddress.getComponent('tfPostalCode'), data);
		AIR.AirAclManager.setAccessMode(pSpecificsLocationAddress.getComponent('tfLocation'), data);
	},
	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {
		this.setFieldLabel(this.getComponent('tfLocationCiAlias'), labels.alias);
		this.setFieldLabel(this.getComponent('tfRoomFloor'), labels.floor);
		this.setFieldLabel(this.getComponent('tfRoom'), labels.floor);
		this.setFieldLabel(this.getComponent('tfBuildingArea'), labels.buildingArea);
		this.setFieldLabel(this.getComponent('tfBuilding'), labels.building);
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
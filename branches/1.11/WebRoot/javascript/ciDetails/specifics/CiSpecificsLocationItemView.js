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
		var field = this.getComponent('tfLocationCiAlias');
		field.setValue(data.alias);
		
		var tfRoomFloor = this.getComponent('tfRoomFloor');
		var tfBuildingArea = this.getComponent('tfBuildingArea');
		var tfBuilding = this.getComponent('tfBuilding');
		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_ROOM:
				tfRoomFloor.setVisible(true);
				tfRoomFloor.setValue(data.floor);
				tfBuildingArea.setVisible(true);
				tfBuildingArea.setValue(data.areaName);
				tfBuilding.setVisible(true);
				tfBuilding.setValue(data.gebaeudeName);
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data);
				break;
			case AC.TABLE_ID_BUILDING_AREA:
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(true);
				tfBuilding.setValue(data.gebaeudeName);
				
				pSpecificsLocationStreet.setVisible(false);
				pSpecificsLocationAddress.setVisible(false);
				break;
			case AC.TABLE_ID_BUILDING:
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(false);
				tfBuilding.reset;
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data);
				break;
			default:
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(false);
				tfBuilding.reset();
				
				pSpecificsLocationStreet.setVisible(false);
				pSpecificsLocationAddress.setVisible(false);
				break;
		}
		
		field = this.getComponent('tfTerrain');
		field.setValue(data.terrainName);
		
		field = this.getComponent('tfSite');
		field.setValue(data.standortName);
		
		field = this.getComponent('tfCountry');
		field.setValue(data.landNameEn);
	},
	
	updateLocation: function(pSpecificsLocationStreet, pSpecificsLocationAddress, data) {
		pSpecificsLocationStreet.setVisible(true);
		pSpecificsLocationStreet.getComponent('tfStreet').setValue(data.street);
		pSpecificsLocationStreet.getComponent('tfStreetNumber').setValue(data.streetNumber);
		
		pSpecificsLocationAddress.setVisible(true);
		pSpecificsLocationAddress.getComponent('tfPostalCode').setValue(data.postalCode);
		pSpecificsLocationAddress.getComponent('tfLocation').setValue(data.location);
	},

	setData: function(data) {
		
	},

	
	updateAccessMode: function(data) {

	},
	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {

	},
	
	updateToolTips: function(toolTips) {

	}
});
Ext.reg('AIR.CiSpecificsLocationItemView', AIR.CiSpecificsLocationItemView);
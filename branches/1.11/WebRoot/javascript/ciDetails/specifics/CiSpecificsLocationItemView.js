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
		
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_ROOM:
				tfRoomFloor.setVisible(true);
				tfRoomFloor.setValue(data.floor);
				tfBuildingArea.setVisible(true);
				tfBuildingArea.setValue(data.areaName);
				tfBuilding.setVisible(true);
				tfBuilding.setValue(data.gebaeudeName);
				break;
			default:
				tfRoomFloor.setVisible(false);
				tfRoomFloor.reset();
				tfBuildingArea.setVisible(false);
				tfBuildingArea.reset();
				tfBuilding.setVisible(false);
				tfBuilding.reset();
				break;
		}
		
		field = this.getComponent('tfTerrain');
		field.setValue(data.terrainName);
		
		field = this.getComponent('tfSite');
		field.setValue(data.standortName);
		
		field = this.getComponent('tfCountry');
		field.setValue(data.landNameEn);
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
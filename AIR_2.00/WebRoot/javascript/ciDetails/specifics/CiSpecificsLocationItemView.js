Ext.namespace('AIR');

AIR.CiSpecificsLocationItemView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    
		    border: false,
		    layout: 'form',
		    
			height: 300,
			autoScroll: true,
		    
		    items: [{
		        id: 'tfLocationCiName',
		    	xtype: 'textfield',
		        fieldLabel: 'Name',
		        width: 230,
		        enableKeyEvents: true
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
		        xtype: 'filterCombo',//combo
		        id: 'cbRoom',
		        width: 230,
		        fieldLabel: 'Room',
		        enableKeyEvents: true,
		        
		        store: AIR.AirStoreFactory.createRoomListStore(),
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        triggerAction: 'all',//all query
		        mode: 'local',
		        queryParam: 'id'
	        },{
		        xtype: 'filterCombo',//combo
		        id: 'cbBuildingArea',
		        width: 230,
		        fieldLabel: 'Building Area',
		        enableKeyEvents: true,
		        
		        store: AIR.AirStoreFactory.createBuildingAreaListStore(),
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        triggerAction: 'all',//all query
		        mode: 'local',
		        queryParam: 'id'
	        },{
		        xtype: 'filterCombo',
		        id: 'cbBuilding',
		        width: 230,
		        fieldLabel: 'Building',
		        enableKeyEvents: true,
		        store: AIR.AirStoreFactory.createBuildingListStore(),
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        triggerAction: 'all',
		        lazyInit: false,
		        mode: 'local',
		        queryParam: 'id'
        	},{
	        	xtype: 'panel',
	        	id: 'pBuilding',
	        	
	        	border: false,
	        	layout: 'table',
	            layoutConfig: {
	                columns: 2
	            },
	        	
	        	style: {
	        		marginBottom: 5,
	        		marginLeft: 205
	        	},
	        	
	        	items: [{
			        xtype: 'label',
			        id: 'lbtStreetAndNumber',
			        text: ' ',
			        
			        style: {
	        			fontSize: 12,
	        			marginTop: 3,
	        			marginRight: 20
	        		}
	        	},{
			        xtype: 'label',
			        id: 'lbtPostalCodeLocation',
			        text: ' ',
			        
			        style: {
	        			fontSize: 12,
	        			marginTop: 3
	        		}
	        	}]
		    },{
		        id: 'cbTerrain',
		    	xtype: 'filterCombo',
		        fieldLabel: 'Terrain',
		        enableKeyEvents: true,
		        width: 230,
		        store: AIR.AirStoreFactory.createTerrainListStore(),
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        triggerAction: 'all',
		        mode: 'local',
		        queryParam: 'id'
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
		        queryParam: 'id'
		    },{
		        id: 'cbCountry',
		        xtype: 'filterCombo',
		    	
		        fieldLabel: 'Country',
		        width: 230,
		        enableKeyEvents: true,
		        
		        store: AIR.AirStoreFactory.createLandListStore(),
		        valueField: 'id',
		        displayField: AAM.getLanguage() == 'DE' ? 'name' : 'nameEn',
				lastQuery: '',
		        //!! sonst findet kein filtern bei manueller Eingabe statt, da default minChars:4.
		        //Siehe ab FilterComboBox.initQuery()
		        minChars: 0,
		        triggerAction: 'all',
		        mode: 'local'
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
		cbBuildingArea.on('keyup', this.onFieldKeyUp, this);
		
		var cbRoom = this.getComponent('cbRoom');
		cbRoom.on('select', this.onRoomSelect, this);
		cbRoom.on('change', this.onComboChange, this);
		cbRoom.on('keyup', this.onFieldKeyUp, this);
	},
	
	onStoreLoad: function(combo) {//store, records, options
		if(combo.mode === 'remote') {
			combo.mode = 'local';
		}
	},
	
	onRoomSelect: function(combo, record, index) {
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	onBuildingAreaSelect: function(combo, record, index) {
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
			}
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
		var cbTerrain = this.getComponent('cbTerrain');
		var cbBuilding = this.getComponent('cbBuilding');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbRoom = this.getComponent('cbRoom');
		
		cbRoom.reset();
		cbBuildingArea.reset();
		cbBuilding.reset();
		cbTerrain.reset();
		
		cbRoom.getStore().removeAll();
		cbBuildingArea.getStore().removeAll();
		cbBuilding.getStore().removeAll();
		cbTerrain.getStore().removeAll();
		
		Util.disableCombo(cbRoom);
		Util.disableCombo(cbBuildingArea);
		Util.disableCombo(cbBuilding);
		
		if(typeof value === 'string' && value.length === 0) {
			Util.disableCombo(cbTerrain);
		} else {
			cbTerrain.getStore().setBaseParam('id', value);
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
		cbBuilding.reset();
		cbTerrain.reset();
		cbSite.reset();
		
		cbRoom.getStore().removeAll();
		cbBuildingArea.getStore().removeAll();
		cbBuilding.getStore().removeAll();
		cbTerrain.getStore().removeAll();
		cbSite.getStore().removeAll();
		
		Util.disableCombo(cbRoom);
		Util.disableCombo(cbBuildingArea);
		Util.disableCombo(cbBuilding);
		Util.disableCombo(cbTerrain);
		
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
	
	init: function() {
		var cbCountry = this.getComponent('cbCountry');
		cbCountry.getStore().load({
			callback: function() {
				var field = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
				cbCountry.getStore().sort(field, 'ASC');//, 'ASC'
			}
		});

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
		var cbBuilding = this.getComponent('cbBuilding');
		var cbTerrain = this.getComponent('cbTerrain');
		var cbSite = this.getComponent('cbSite');
		var cbCountry = this.getComponent('cbCountry');

		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		
		if(data.isCiCreate) {
			tfLocationCiName.reset();
		} else {
			tfLocationCiName.setValue(data.name);
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
					cbCountry.reset();
					
					Util.disableCombo(cbRoom);
					Util.disableCombo(cbBuildingArea);
					Util.disableCombo(cbBuilding);
					Util.disableCombo(cbTerrain);
					Util.disableCombo(cbSite);
					Util.enableCombo(cbCountry);
				} else {
					pBuilding.setVisible(true);
					cbRoom.setValue(data.raumName);
					cbBuildingArea.setValue(data.areaName);
					cbBuilding.setValue(data.gebaeudeName);
					cbTerrain.setValue(data.terrainName);
					cbSite.setValue(data.standortName);
					cbCountry.setValue(AAM.getLanguage() == 'DE' ? data.landName : data.landNameEn);
					
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
					} else {
						Util.disableCombo(cbBuildingArea);
					}

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
					cbCountry.reset();
					
					Util.disableCombo(cbBuilding);//enableCombo
					Util.disableCombo(cbTerrain);//enableCombo
					Util.disableCombo(cbSite);//enableCombo
					Util.enableCombo(cbCountry);
				} else {
					pBuilding.setVisible(true);
					
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
					cbCountry.reset();
					
					Util.disableCombo(cbTerrain);//enableCombo
					Util.disableCombo(cbSite);//enableCombo
					Util.enableCombo(cbCountry);
				} else {
					
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
			case AC.TABLE_ID_FUNCTION:
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
				
				cbTerrain.setVisible(false);
				cbTerrain.reset();
				cbSite.setVisible(false);
				cbSite.reset();
				
				cbCountry.setVisible(false);
				
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
				//Added by vandana
			case AC.TABLE_ID_PATHWAY:
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
				
				cbTerrain.setVisible(false);
				cbTerrain.reset();
				cbSite.setVisible(false);
				cbSite.reset();
				
				cbCountry.setVisible(false);
				
				
				this.updateLocation(pSpecificsLocationStreet, pSpecificsLocationAddress, data, false);
				break;
				//Ended by vandana
				
		}		
				
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
		} else {
			data.id = this.ciId;
		}
		
		var tfLocationCiName = this.getComponent('tfLocationCiName');
		var tfLocationCiAlias = this.getComponent('tfLocationCiAlias');
		var cbRoom = this.getComponent('cbRoom');
		var cbBuildingArea = this.getComponent('cbBuildingArea');
		var cbBuilding = this.getComponent('cbBuilding');		var cbTerrain = this.getComponent('cbTerrain');
		var cbSite = this.getComponent('cbSite');
		var cbCountry = this.getComponent('cbCountry');
		

		data.name = tfLocationCiName.getValue();
		
//		typeof cbRoom.getValue() === 'string' - wichtig weil: wurde die Combobox durch Bedienung geladen und ergibt daher combo.getValue()
//		einen Integer Wert und keinen String wie wenn der Combobox Wert nur mit einem String gesetzt wurde.
		switch(parseInt(data.tableId)) {
			case AC.TABLE_ID_POSITION:
				data.roomId = data.isCiCreate ?
									cbRoom.getValue() :
									typeof cbRoom.getValue() === 'string' ? AAM.getAppDetail().raumId : cbRoom.getValue();
				break;
			case AC.TABLE_ID_ROOM:
				data.alias = tfLocationCiAlias.getValue();
				
				var tfRoomFloor = this.getComponent('tfRoomFloor');
				if(!tfRoomFloor.disabled)
					data.floor = tfRoomFloor.getValue();
				
					data.areaId = data.isCiCreate ? 
									cbBuildingArea.getValue() :
									typeof cbBuildingArea.getValue() === 'string' ? AAM.getAppDetail().areaId : cbBuildingArea.getValue();
				//2. Möglichkeit: 
				//3. Möglichkeit: nur untersuchen ob cbBuildingArea.getValue() String ist oder nicht. Wenn ja, areadId von getAppDetail()
									
				break;
			case AC.TABLE_ID_BUILDING_AREA:
				data.buildingId = data.isCiCreate ? 
									cbBuilding.getValue() :
									typeof cbBuilding.getValue() === 'string' ? AAM.getAppDetail().gebaeudeId : cbBuilding.getValue();
				
				break;
			case AC.TABLE_ID_BUILDING:
				if(!tfLocationCiAlias.disabled)
					data.alias = tfLocationCiAlias.getValue();
				
			
				data.terrainId = data.isCiCreate ? 
									cbTerrain.getValue() :
									typeof cbTerrain.getValue() === 'string' ? AAM.getAppDetail().terrainId : cbTerrain.getValue();

				
					var tfStreet = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreet');
					var tfStreetNumber = this.getComponent('pSpecificsLocationStreet').getComponent('tfStreetNumber');
	
					var tfPostalCode = this.getComponent('pSpecificsLocationAddress').getComponent('tfPostalCode');
					var tfLocation = this.getComponent('pSpecificsLocationAddress').getComponent('tfLocation');
					
					data.street = tfStreet.getValue();
					data.streetNumber = tfStreetNumber.getValue();
					data.postalCode = tfPostalCode.getValue();
					data.location = tfLocation.getValue();
				
				break;
			case AC.TABLE_ID_TERRAIN:
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
		this.setFieldLabel(this.getComponent('cbTerrain'), labels.terrain);
		this.setFieldLabel(this.getComponent('cbSite'), labels.site);
		this.setFieldLabel(this.getComponent('cbCountry'), labels.country);
		
		var cbCountry = this.getComponent('cbCountry');
		cbCountry.displayField = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
		delete cbCountry.list;
		delete cbCountry.tpl;
		cbCountry.initList();
		
		var field = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
		cbCountry.getStore().sort(field);//, 'ASC'
		
		var c = (AAM.getLanguage() == 'DE' ? AAM.getAppDetail().landName : AAM.getAppDetail().landNameEn) || cbCountry.getValue();
		cbCountry.setValue(c);//data.landNameEn
		
		
		var pSpecificsLocationStreet = this.getComponent('pSpecificsLocationStreet');
		var pSpecificsLocationAddress = this.getComponent('pSpecificsLocationAddress');
		
		pSpecificsLocationStreet.getComponent('lStreetAndNumber').setText(labels.streetAndNumber);
		pSpecificsLocationAddress.getComponent('lPostalCodeLocation').setText(labels.postalCodeLocation);

	},
	
	updateToolTips: function(toolTips) {

	}
});
Ext.reg('AIR.CiSpecificsLocationItemView', AIR.CiSpecificsLocationItemView);
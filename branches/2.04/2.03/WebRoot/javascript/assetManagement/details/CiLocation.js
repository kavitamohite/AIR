Ext.namespace('AIR');

AIR.CiLocation = Ext.extend(Ext.form.FieldSet, {

	initComponent : function() {
		Ext.apply(this, {
			title : 'Location',
			autoHeight : true,
			hidden:true,
			style : {
				margin : '5 5 0 0'
			},
			items : [{
				itemId: 'cbCountry',
		        xtype: 'filterCombo',
		        fieldLabel: 'Country',
		        width: 370,
		        enableKeyEvents: true,
		        forceSelection: true,
		        store: AIR.AirStoreManager.getStoreByName('landListStore'),
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
		        itemId: 'cbSite',
		    	xtype: 'filterCombo',
		        fieldLabel: 'Site',
		        width: 370,
		        enableKeyEvents: true,
		        forceSelection: true,
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
		        itemId: 'cbBuilding',
		        width: 370,
		        fieldLabel: 'Building',
		        enableKeyEvents: true,
		        forceSelection: true,
		        store: AIR.AirStoreFactory.createBuildingListStoreFromSiteId(), 
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
		        xtype: 'filterCombo',
		        itemId: 'cbRoom',
		        width: 370,
		        fieldLabel: 'Room',
		        enableKeyEvents: true,
		        forceSelection: true,
		        store: AIR.AirStoreFactory.createRoomListStoreFromBuildingId(),
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        triggerAction: 'all',
		        mode: 'local',
		        queryParam: 'id',
		        style : {
					marginBottom : 10
				}
	        }, {
		    	xtype: 'panel',
				itemId: 'pRackposition',
				border: false,
				layout:'hbox',						
				style : {
					fontSize : 12,
				},
				items: [{
					itemId: 'cbFieldRack',
					text: 'Rack - Position *',
					xtype: 'label',
					fieldLabel : 'Rack Position',
					width: 105,
					style: {
						fontSize: 12
					}
	    		},{
			        xtype: 'filterCombo',
			        itemId: 'cbRack',
			        width: 332,
			        enableKeyEvents: true,
			        forceSelection: true,
			        store: AIR.AirStoreFactory.createSchrankListStore(),
			        valueField: 'id',
			        displayField: 'name',
					lastQuery: '',
			        triggerAction: 'all',
			        mode: 'local',
			        queryParam: 'id',
			        style : {
						marginBottom : 10
					}
		        },{
					xtype : 'container',
					html: '<a id="mailtolocation" href="mailto:ITILcenter@bayer.com&subject=' + mail_Subject_product + '"><img src="' + img_Email + '"></a>',
					itemId: 'maillocation',
					cls: 'x-plain',
					isHideable: true,
					style: {
						color: AC.AIR_FONT_COLOR,
						fontFamily: AC.AIR_FONT_TYPE,
						fontWeight: 'normal',
						fontSize: '8pt',
						cursor:'pointer',
						 'padding-left':'15px'
					}	
		        }]
			}]
		});

		AIR.CiLocation.superclass.initComponent.call(this);
		
		var cbCountry = this.getComponent('cbCountry');
        cbCountry.on('select', this.onCountrySelect, this);
        
        var cbSite = this.getComponent('cbSite');
        cbSite.on('select', this.onSiteSelect, this);
        
        var cbBuilding = this.getComponent('cbBuilding'); 
        cbBuilding.on('select', this.onBuildingSelect, this);

        var cbRoom = this.getComponent('cbRoom');
        cbRoom.on('select', this.onRoomSelect, this);
        
        var cbRack = this.getComponent('pRackposition').getComponent('cbRack');

	},
	
	onCountrySelect: function(combo, record, index) {
		var value = record.get('id');
		
		var cbSite = this.getComponent('cbSite');
        var cbBuilding = this.getComponent('cbBuilding');
        var cbRoom = this.getComponent('cbRoom');
        var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
        
        cbSite.reset();
        cbBuilding.reset();
        cbRoom.reset();
        cbRack.reset();

        cbRoom.getStore().removeAll();
        cbBuilding.getStore().removeAll();
        cbSite.getStore().removeAll();
        cbRack.getStore().removeAll();

        this.loadSiteStore(value);
        this.updateMailTemplateLocation();
	},
	
	loadSiteStore: function(value){
		var cbSite = this.getComponent('cbSite');
		
		cbSite.getStore().load({
            params: {
                id: value
            }
		});
	},
	
	onSiteSelect: function(combo, record, index) {
        var value = record.get('id');
        
        var cbBuilding = this.getComponent('cbBuilding');
        var cbRoom = this.getComponent('cbRoom');
        var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
        
        cbBuilding.reset();
        cbRoom.reset();
        cbRack.reset();
        
        cbRoom.getStore().removeAll();
        cbBuilding.getStore().removeAll();
        cbRack.getStore().removeAll();

        cbBuilding.getStore().setBaseParam('id', value);
        cbBuilding.allQuery = value;
        cbBuilding.reset();
        cbBuilding.getStore().load({
            params: {
                id: value
            }
        });
        this.updateMailTemplateLocation();
	},
	
	loadBuildingStore: function(value){
		 var cbBuilding = this.getComponent('cbBuilding');
		
		 cbBuilding.getStore().load({
		    params: {
		        id: value
		    }
		 });
	},
	
	onBuildingSelect: function(combo, record, index) {
        var value = record.get('id');
        
        var cbRoom = this.getComponent('cbRoom');
        var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
        
        cbRoom.reset();
        cbRack.reset();
        
        cbRoom.getStore().removeAll();
        cbRack.getStore().removeAll();

        this.loadRoomStore(value);
        this.updateMailTemplateLocation();
	},
	
	loadRoomStore: function(value){
		var cbRoom = this.getComponent('cbRoom');
		
		cbRoom.getStore().load({
            params: {
                id: value
            }
        });
		
	},
	
	onRoomSelect: function(combo, record, index) {
        var value = record.get('id');
        
        var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
        cbRack.reset();
        cbRack.getStore().removeAll();

        this.loadRackStore(value);
        this.updateMailTemplateLocation();
	},
	
	loadRackStore: function(value){
		var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
		
		cbRack.getStore().load({
            params: {
                id: value
            }
        });
	},

	updateMailTemplateLocation: function() {
		var html = '<a id="mailtolocation" href="{href}"><img src="' + img_Email + '"></a>';
		
		var cbCountry = this.getComponent('cbCountry');
		var cbSite = this.getComponent('cbSite');
		var cbBuilding = this.getComponent('cbBuilding');
		var cbRoom = this.getComponent('cbRoom');
		var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
		
		var mailText = mail_Text_location.replace('<country>', cbCountry.getRawValue());
		mailText = mailText.replace('<site>', cbSite.getRawValue());
		mailText = mailText.replace('<building>', cbBuilding.getRawValue());
		mailText = mailText.replace('<room>', cbRoom.getRawValue());
		mailText = mailText.replace('<rack>', cbRack.getRawValue());
		mailText = mailText.replace('<Username>', AAM.getUserName());
		
		var mailtemplate = 'mailto:ITILcenter@bayer.com';
		mailtemplate += '&subject=' + mail_Subject_location + '';
		mailtemplate += ('&body=' + mailText);
		html = html.replace('{href}', mailtemplate);
		this.getComponent('pRackposition').getComponent('maillocation').update(html);
		
	},
	
	update: function(assetData){
    	var cbCountry = this.getComponent('cbCountry');
        cbCountry.setValue(assetData.countryId);
        
        var cbSite = this.getComponent('cbSite');
        cbSite.setValue(assetData.siteId);
        cbSite.setRawValue(assetData.site);
        
        var cbBuilding = this.getComponent('cbBuilding');
        cbBuilding.setValue(assetData.buildingId);
        cbBuilding.setRawValue(assetData.building);
        
        var cbRoom = this.getComponent('cbRoom');
        cbRoom.setValue(assetData.roomId);
        cbRoom.setRawValue(assetData.room);
        
        var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
        cbRack.setValue(assetData.rackId);
        cbRack.setRawValue(assetData.rack);
        
        if(assetData.countryId){
        	this.loadSiteStore(assetData.countryId);
        	this.loadBuildingStore(assetData.siteId);
        	this.loadRoomStore(assetData.buildingId);
        	this.loadRackStore(assetData.roomId);
        }

        this.updateMailTemplateLocation();
	},
		
	updateParam: function(assetData){
		var cbCountry = this.getComponent('cbCountry');
		assetData.country = cbCountry.getRawValue();
		assetData.countryId = cbCountry.getValue();
        
        var cbSite = this.getComponent('cbSite');
        assetData.site = cbSite.getRawValue();
        assetData.siteId = cbSite.getValue();
        
        var cbBuilding = this.getComponent('cbBuilding');
        assetData.building = cbBuilding.getRawValue();
        assetData.buildingId = cbBuilding.getValue();
        
        var cbRoom = this.getComponent('cbRoom');
        assetData.room = cbRoom.getRawValue();
        assetData.roomId = cbRoom.getValue();
        
        var cbRack = this.getComponent('pRackposition').getComponent('cbRack');
        assetData.rack = cbRack.getRawValue();
        assetData.rackId = cbRack.getValue();

        return assetData;
	},
	
	updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('cbCountry'), labels.assetCountry); 
    	Util.updateFieldLabel(this.getComponent('cbSite'), labels.assetSite);  
    	Util.updateFieldLabel(this.getComponent('cbBuilding'), labels.assetBuilding);  
    	Util.updateFieldLabel(this.getComponent('cbRoom'), labels.assetRoom); 
    	Util.updateLabel(this.getComponent('pRackposition').getComponent('cbFieldRack'), labels.assetPosition);
	}
	
});
Ext.reg('AIR.CiLocation', AIR.CiLocation);
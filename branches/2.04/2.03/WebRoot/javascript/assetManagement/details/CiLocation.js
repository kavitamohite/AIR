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
		        itemId: 'cbRoom',
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
		    	xtype: 'panel',
				itemId: 'pRackposition',
				border: false,
				layout:'hbox',						
				style : {
					fontSize : 12,
				},
				items: [{
						xtype: 'label',
						fieldLabel : 'RackPosition',
						text:'Rack - Position:',
						width: 105,
						style: {
							fontSize: 12
						}
		    		},{
			        xtype: 'filterCombo',//combo
			        itemId: 'cbRack',
			        width: 332,
			        fieldLabel: 'Rack - Position',
			        enableKeyEvents: true,
			        store: AIR.AirStoreFactory.createSchrankListStore(),
			        valueField: 'id',
			        displayField: 'name',
					lastQuery: '',
			        triggerAction: 'all',//all query
			        mode: 'local',
			        queryParam: 'id',
			        style : {
						marginBottom : 10
					}
		        },{
					xtype : 'container',
					html: '<a id="mailtolocation" href="mailto:&subject=' + mail_Subject_product + '"><img src="' + img_Email + '"></a>',
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

	}
});
Ext.reg('AIR.CiLocation', AIR.CiLocation);
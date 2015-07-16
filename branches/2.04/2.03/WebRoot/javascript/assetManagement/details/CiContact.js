Ext.namespace('AIR');

AIR.CiContact = Ext.extend(Ext.form.FieldSet, {

	initComponent : function() {
		Ext.apply(this, {
			title : 'Contacts',
			hidden:true,
			autoHeight : true,
			style : {
				margin : '5 5 0 0'
			},
			items : [ {
				xtype : 'textfield',
				itemId: 'tCostcentermanager',
				fieldLabel : 'Cost center manager',
				disabled: true,
				width: 370,
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				itemId: 'tOrganizationalunit',
				fieldLabel : 'Organizational unit',
				disabled: true,
				width: 370,
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'combo',
				itemId: 'cbeditor',
				fieldLabel : 'Editors group',
				width: 370,
				enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('editorGroupListStore'),
		        //valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        minChars: 0,
		        triggerAction: 'all',
		        mode: 'local',
				style : {
					marginBottom : 10
				}
			}]
		});

		AIR.CiContact.superclass.initComponent.call(this);

	},
	
	update: function(assetData){
		
    	var tCostcentermanager = this.getComponent('tCostcentermanager');
        tCostcentermanager.setValue(assetData.costCenterManager);

        var tOrganizationalunit = this.getComponent('tOrganizationalunit');
        tOrganizationalunit.setValue(assetData.organizationalunit);

        var cbeditor = this.getComponent('cbeditor');
        cbeditor.setRawValue(assetData.editorsGroup);

	},
	
	updateParam: function(assetData){
		var tCostcentermanager = this.getComponent('tCostcentermanager');
		assetData.costCenterManager = tCostcentermanager.getValue();

        var tOrganizationalunit = this.getComponent('tOrganizationalunit');
        assetData.organizationalunit = tOrganizationalunit.getValue();

        var cbeditor = this.getComponent('cbeditor');
        assetData.editorsGroup = cbeditor.getRawValue();
		
        return assetData;
	},
	
	updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('tCostcentermanager'), labels.assetCostManager); 
    	Util.updateFieldLabel(this.getComponent('tOrganizationalunit'), labels.assetOrganisation);  
    	Util.updateFieldLabel(this.getComponent('cbeditor'), labels.assetEditor);  
	}
});
Ext.reg('AIR.CiContact', AIR.CiContact);
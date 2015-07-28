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
			items : [{
				xtype : 'textfield',
				itemId: 'tCostcentermanager',
				fieldLabel : 'Cost center manager',
				readOnly: true,
				width: 370,
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				itemId: 'tOrganizationalunit',
				fieldLabel : 'Organizational unit',
				readOnly: true,
				width: 370,
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
	},
	
	updateParam: function(assetData){
		var tCostcentermanager = this.getComponent('tCostcentermanager');
		assetData.costCenterManager = tCostcentermanager.getValue();

        var tOrganizationalunit = this.getComponent('tOrganizationalunit');
        assetData.organizationalunit = tOrganizationalunit.getValue();

        return assetData;
	},
	
	updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('tCostcentermanager'), labels.assetCostManager); 
    	Util.updateFieldLabel(this.getComponent('tOrganizationalunit'), labels.assetOrganisation);  
	}
});
Ext.reg('AIR.CiContact', AIR.CiContact);
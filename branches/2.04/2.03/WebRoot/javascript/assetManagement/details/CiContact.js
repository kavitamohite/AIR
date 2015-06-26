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
				labelSeparator : ': <span style="color:red">*</span>',
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
				labelSeparator : ': <span style="color:red">*</span>',
				fieldLabel : 'Editors group',
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

        var cbeditor = this.getComponent('cbeditor');
        cbeditor.setValue(assetData.editorsGroupId);

	}
});
Ext.reg('AIR.CiContact', AIR.CiContact);
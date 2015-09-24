Ext.namespace('AIR');

AIR.CiTopPanel = Ext.extend(AIR.AirView, {

	initComponent : function() {
		Ext.apply(this, {
			layout : 'form',
			autoScroll : true,
			autoHeight : true,
			layoutConfig : {
				columns : 2
			},
			bodyStyle : 'padding:10px 5px 0px 10px',
			items : [ {
				xtype : 'textfield',
				itemId: 'identNumber',
				readOnly : true,
				fieldLabel : 'Indent number',
				width : 450,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tinventory',
				readOnly : true,
				fieldLabel : 'Inventory Number',
				width : 450,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype: 'hidden',
				itemId: 'assetId'//query
			}]
		});

		AIR.CiTopPanel.superclass.initComponent.call(this);
	},
	
	update: function(assetData){
		var assetId = this.getComponent('assetId');
		assetId.setValue(assetData.id);
		
		var identNumber = this.getComponent('identNumber');
        identNumber.setValue(assetData.identNumber);

        var tinventory = this.getComponent('tinventory');
        tinventory.setValue(assetData.inventoryNumber);
	},
	
	updateParam: function(assetData){
		var assetId = this.getComponent('assetId');
		assetData.id = assetId.getValue();
		
		var identNumber = this.getComponent('identNumber');
        assetData.identNumber = identNumber.getValue();

        var tinventory = this.getComponent('tinventory');
        assetData.inventoryNumber = tinventory.getValue();
        
        return assetData;
	},
	
	updateLabels: function(labels) {
		Util.updateFieldLabel(this.getComponent('identNumber'), labels.assetIndentnumber);
		Util.updateFieldLabel(this.getComponent('tinventory'), labels.assetInventoryNumber);
	}
});
Ext.reg('AIR.CiTopPanel', AIR.CiTopPanel);
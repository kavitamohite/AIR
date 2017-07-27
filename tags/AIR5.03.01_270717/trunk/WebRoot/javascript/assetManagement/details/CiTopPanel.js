Ext.namespace('AIR');

AIR.CiTopPanel = Ext.extend(Ext.form.FieldSet, {

	initComponent : function() {
		Ext.apply(this, {
			layout : 'hbox',
			autoScroll : true,
			autoHeight : true,
			bodyStyle : 'padding:10px 5px 0px 10px',
			items : [ 
			   {
			    	xtype: 'label',
			    	itemId: 'identNumberLabel',
			    	text: 'Ident number',
			    	width: 120,
			    	style: {
			    		fontSize: 12
			    	}
			   },         
			  {
				xtype : 'textfield',
				itemId: 'identNumber',
				readOnly : true,
				fieldLabel : 'Ident number',
				width : 200,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, 
			
			{
			    xtype: 'label',
			    itemId: 'inventoryNumberLabel',
			    text: 'Inventory Number',
			    width: 180,
			    style: {
			    	marginLeft : 50,
			    	marginRight: 15,
			        fontSize: 12
			    }
			},
							{
				xtype : 'textfield',
				itemId: 'tinventory',
				readOnly : true,
				//fieldLabel : 'Inventory Number',
				width : 200,
				style : {
					marginLeft : 10,
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
		Util.updateLabel(this.getComponent('identNumberLabel'), labels.assetIndentnumber);
		Util.updateLabel(this.getComponent('inventoryNumberLabel'), labels.assetInventoryNumber);
		
	}
});
Ext.reg('AIR.CiTopPanel', AIR.CiTopPanel);
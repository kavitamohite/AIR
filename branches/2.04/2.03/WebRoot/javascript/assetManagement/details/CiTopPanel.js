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
				disabled : true,
				fieldLabel : 'Indent number',
				width : 450,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tinventory',
				disabled : true,
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
	}
});
Ext.reg('AIR.CiTopPanel', AIR.CiTopPanel);
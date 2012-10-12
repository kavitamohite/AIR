Ext.namespace('AIR');

AIR.CiResultView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {

	        items: [{
	        	xtype: 'button',
	        	id: 'bUpdateCiSearchResultTable',
	        	
	        	text: 'Update'
	        },{
	        	xtype: 'tabpanel',
	        	id: 'tpCiSearchResultTables',
	        	
	        	layout: 'fit'
	        }]

		});
		
		AIR.CiResultView.superclass.initComponent.call(this);
	}
});
Ext.reg('AIR.CiResultView', AIR.CiResultView);
Ext.namespace('AIR');

AIR.CiCreateCommonServiceView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    
		    items: [{
		    	
			}]
		});
		
		AIR.CiCreateCommonServiceView.superclass.initComponent.call(this);

	}
});
Ext.reg('AIR.CiCreateCommonServiceView', AIR.CiCreateCommonServiceView);
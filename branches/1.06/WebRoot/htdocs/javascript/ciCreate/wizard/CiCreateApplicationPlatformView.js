Ext.namespace('AIR');

AIR.CiCreateApplicationPlatformView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    
		    items: [{
		    	
			}]
		});
		
		AIR.CiCreateApplicationPlatformView.superclass.initComponent.call(this);

	}
});
Ext.reg('AIR.CiCreateApplicationPlatformView', AIR.CiCreateApplicationPlatformView);
Ext.namespace('AIR');

AIR.CiCreateMiddlewareView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    
		    items: [{
		    	html: 'CiCreateMiddlewareView',
	    		border: false
			}]
		});
		
		AIR.CiCreateMiddlewareView.superclass.initComponent.call(this);

	}
});
Ext.reg('AIR.CiCreateMiddlewareView', AIR.CiCreateMiddlewareView);
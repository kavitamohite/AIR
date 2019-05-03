Ext.namespace('AIR');

AIR.CiTemplateView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    
		    items: [{
		    	
			}]
		});
		
		AIR.CiTemplateView.superclass.initComponent.call(this);

	}
});
Ext.reg('AIR.CiTemplateView', AIR.CiTemplateView);
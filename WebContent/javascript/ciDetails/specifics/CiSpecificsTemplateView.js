Ext.namespace('AIR');

AIR.CiSpecificsTemplateView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    
		    border: false,
		    layout: 'form',
		    
		    items: [
			]
		});
		
		AIR.CiSpecificsTemplateView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
	},
	

    
	update: function(data) {

	},
	
	updateAccessMode: function(data) {

	},
	
	setData: function(data) {
		
	},

	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {

	},
	
	updateToolTips: function(toolTips) {

	}
});
Ext.reg('AIR.CiSpecificsTemplateView', AIR.CiSpecificsTemplateView);
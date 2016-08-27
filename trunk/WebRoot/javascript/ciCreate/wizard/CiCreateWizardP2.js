Ext.namespace('AIR');

AIR.CiCreateWizardP2 = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			layout: 'form',
			title: '-',

			
			labelWidth: 180,
			padding: 10,
			
			items: [{
			    	xtype: 'AIR.CiCreateAppRequiredView',
			    	id: 'ciCreateAppRequiredView'
		    }]
		});
		
		AIR.CiCreateWizardP2.superclass.initComponent.call(this);

	},
	
	setData: function(params) {
		this.getComponent('ciCreateAppRequiredView').setData(params);
	},
	
	reset: function() {
		this.getComponent('ciCreateAppRequiredView').reset();
	},

	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage2);
		
		this.getComponent('ciCreateAppRequiredView').updateLabels(labels);
		
	}
	
});
Ext.reg('AIR.CiCreateWizardP2', AIR.CiCreateWizardP2);
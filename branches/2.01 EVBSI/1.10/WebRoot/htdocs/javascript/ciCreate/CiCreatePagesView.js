Ext.namespace('AIR');

AIR.CiCreatePagesView = Ext.extend(Ext.Panel, {// NOT USED. See createnew.js
	
	initComponent: function() {
		Ext.apply(this, {
			layout: 'card',
			activeItem: 0,
//		    margins: '5 5 5 5',
			hidden: false,
			plain: true,
			border: false,
			buttonAlign: 'left',
			
			autoScroll: true,
			
			items: [{
				id: 'CiCreateInfoView',
		    	xtype: 'AIR.CiCreateInfoView'
			}, { 
				id: 'ciCreateWizardPagesView',
				xtype: 'AIR.CiCreateWizardPagesView'
			}, { 
				id: 'CiCopyFromView',
				xtype: 'AIR.CiCopyFromView'
			}, {
				id: 'CiDeleteView',
				xtype: 'AIR.CiDeleteView'
			}]
		});
		
		AIR.CiCreatePagesView.superclass.initComponent.call(this);
		
		var bStartWizzard = this.getComponent('bStartWizzardDelegate');
		var bCopyFrom = this.getComponent('bCopyFromDelegate');
		var bDelete = this.getComponent('bCopyFromDelegate');
		
		bStartWizzard.on('click', this.startTheFunctionWizard, this);
		bCopyFrom.on('click', this.startTheFunctionCopyFrom, this);
	}
});
Ext.reg('AIR.CiCreatePagesView', AIR.CiCreatePagesView);
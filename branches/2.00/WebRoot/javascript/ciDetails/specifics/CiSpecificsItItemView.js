Ext.namespace('AIR');

AIR.CiSpecificsItItemView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    
		    border: false,
		    layout: 'form',
		    
		    items: [{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Site',
		        
		        id: 'cbSite1',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName(''),
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    },{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Country',
		        
		        id: 'cbCountry1',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName(''),
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    }]
		});
		
		AIR.CiSpecificsItItemView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
	},
	

    
	update: function(data) {
		this.getComponent('cbSite1').setRawValue(data.alias);
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
Ext.reg('AIR.CiSpecificsItItemView', AIR.CiSpecificsItItemView);
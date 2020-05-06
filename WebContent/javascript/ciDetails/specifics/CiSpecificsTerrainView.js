Ext.namespace('AIR');

AIR.CiSpecificsTerrainView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    
		    border: false,
		    layout: 'form',
		    
		    items: [{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Site',
		        
		        id: 'cbSite',
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
		        
		        id: 'cbCountry',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName(''),
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    }]
		});
		
		AIR.CiSpecificsTerrainView.superclass.initComponent.call(this);
		
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
Ext.reg('AIR.CiSpecificsTerrainView', AIR.CiSpecificsTerrainView);
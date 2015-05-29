Ext.namespace('AIR');

AIR.CiAssetManageSearchView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			border: false,
			layout: 'form',
			
			items: [{
				id: 'pAssetSearch',
				border: false,
				
				layout: 'table',
			    layoutConfig: {
			    	columns: 4
			    },
			    
			    items: [{
		        	xtype: 'textfield',
		        	id: 'tfAssetSearch',
		        	
		        	emptyText: 'Enter Asset name...',
		        	width: 350,
		        	
		        	hideLabel: true,
		        	padding: 5,
		        	
		        	hasSearch: false,
		        	maxLength: 656
		        },{
					xtype: 'button',
					id: 'clAssetSearch',
					
		        	cls: 'x-btn-text-icon',
		        	icon: imgcontext+'/search_16x16.png',
		        	text: '',
					
					style: {
						marginLeft: 5
					}
				},{
		        	xtype: 'button',
		        	id: 'bUpdateCiAssetSearchResult',
		        	hidden: true,
		        	
		        	cls: 'x-btn-text-icon',
		        	icon: imgcontext+'/refresh_16x16.png',
		        	
		        	text: 'Update',
		        	
					style: {
						marginLeft: 5
					}
		        },{
		        	xtype: 'button',
		        	id: 'bAssetSearchReset',
		    		
		        	cls: 'x-btn-text-icon',
		        	icon: 'images/reset_16x16.png',		        	
		        	
		        	style: {
		        		marginLeft: 5
		        	},
		        	
		        	text: 'Reset'
		        }]
	        }]
		});
		
		AIR.CiAssetManageSearchView.superclass.initComponent.call(this);
	},
	
	reset: function() {
		this.getComponent('pAssetSearch').getComponent('tfAssetSearch').reset();
	},
	
	updateLabels: function(labels) {
		this.getComponent('pAssetSearch').getComponent('clAssetSearch').setText(labels.newSearch);
		this.getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult').setText(labels.bUpdateCiSearchResult);
		
	}
	
});
Ext.reg('AIR.CiAssetManageSearchView', AIR.CiAssetManageSearchView);
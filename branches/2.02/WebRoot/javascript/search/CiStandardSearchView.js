Ext.namespace('AIR');

AIR.CiStandardSearchView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			border: false,
			layout: 'form',
			
			items: [{
				id: 'pSearch',
				border: false,
				
				layout: 'table',
			    layoutConfig: {
			    	columns: 3
			    },
			    
			    items: [{
		        	xtype: 'textfield',
		        	id: 'tfSearch',
		        	
		        	emptyText: 'Enter CI name or alias...',
		        	width: 350,
		        	
		        	hideLabel: true,
		        	padding: 5,
		        	
		        	hasSearch: false,
		        	maxLength: 656
		        },{
					xtype: 'button',
					id: 'clSearch',
					
		        	cls: 'x-btn-text-icon',
		        	icon: imgcontext+'/search_16x16.png',
		        	text: '',
					
					style: {
						marginLeft: 5
					}
				},{
		        	xtype: 'button',
		        	id: 'bUpdateCiSearchResult',
		        	hidden: true,
		        	
		        	cls: 'x-btn-text-icon',
		        	icon: imgcontext+'/refresh_16x16.png',
		        	
		        	text: 'Update',
		        	
					style: {
						marginLeft: 5
					}
		        },{
		            xtype: 'radiogroup',
					id: 'rbgQueryMode',
					hidden: true,
		            items: [{
		            	id: 'rbgQueryModeContains', name: 'queryMode', boxLabel: 'Contains', inputValue: 'CONTAINS', checked: true
		            }, {
		            	id: 'rbgQueryModeBeginsWith', name: 'queryMode', boxLabel: 'Begins with', inputValue: 'BEGINS_WITH'
		            },{ 
		            	id: 'rbgQueryModeExact', name: 'queryMode', boxLabel: 'Exact', inputValue: 'EXACT'
		            }]
				}]
	        },{
		    	xtype: 'AIR.CiAdvancedSearchView',
		    	id: 'ciAdvancedSearchView',

		    	hidden: true,
		    	
		    	style: {
		    		marginTop: 15
		    	}
			}]
		});
		
		AIR.CiStandardSearchView.superclass.initComponent.call(this);
	},
	
	reset: function() {
		this.getComponent('pSearch').getComponent('tfSearch').reset();
	},
	
	update: function(data) {
		this.getComponent('ciAdvancedSearchView').update(data);
	},
	
	setData: function(params) {
		this.getComponent('ciAdvancedSearchView').setData(params);
	},
	
	updateLabels: function(labels) {
		var clSearch = this.getComponent('pSearch').getComponent('clSearch');
		clSearch.setText(labels.newSearch);
		
		this.getComponent('pSearch').getComponent('bUpdateCiSearchResult').setText(labels.bUpdateCiSearchResult);
		
		var ciAdvancedSearchView = this.getComponent('ciAdvancedSearchView');
		ciAdvancedSearchView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
		
	}
});
Ext.reg('AIR.CiStandardSearchView', AIR.CiStandardSearchView);
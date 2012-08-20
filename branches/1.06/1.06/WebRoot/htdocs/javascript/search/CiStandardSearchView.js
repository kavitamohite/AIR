Ext.namespace('AIR');

AIR.CiStandardSearchView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			border: false,
			layout: 'form',
			
			items: [{
				id: 'pSearchField',
				border: false,
				
				layout: 'table',
			    layoutConfig: {
			    	columns: 2
			    },
				
	//			layout: 'column',
			    
			    items: [{
		        	xtype: 'textfield',
		        	id: 'searchfield',
		        	
		        	emptyText: 'Enter CI name or alias...',
		        	width: 300,
		        	height: 28,
		        	
		        	hideLabel: true,
		        	padding: '5',
		        	
		        	hasSearch: false,
		        	maskRe: /[0-9a-zA-Z%#=\+\-\_\/\\.:*? ]/,
		        	maxLength: 656
		        }, {
					xtype: 'commandlink',
					id: 'clSearch',
					
	                img: img_Search_offMouse,
					
					style: {
						marginLeft: 2
//						marginTop: 15
					}
				}, {
		            xtype: 'radiogroup',
					id: 'rbgQueryMode',
					hidden: true,
	
		            items: [{
		            	id: 'rbgQueryModeContains', boxLabel: 'Contains', name: 'queryMode', inputValue: 'CONTAINS', checked: true
		            }, {
		            	id: 'rbgQueryModeBeginsWith', boxLabel: 'Begins with', name: 'queryMode', inputValue: 'BEGINS_WITH'
		            }, { 
		            	id: 'rbgQueryModeExact', boxLabel: 'Exact', name: 'queryMode', inputValue: 'EXACT'
		            }]
				}, {
					xtype: 'commandlink',
					id: 'clAdvancedSearch',
					
					text: 'Advanced Search',
	                img: 'lib/extjs/docs/resources/s.gif',
	                cls: 'menuSubLink',
	                
	                style: {
	                	float: 'right'
	                }
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
	
	updateLabels: function(labels) {
		var ciAdvancedSearchView = this.getComponent('ciAdvancedSearchView');
		ciAdvancedSearchView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
		
	}
});
Ext.reg('AIR.CiStandardSearchView', AIR.CiStandardSearchView);
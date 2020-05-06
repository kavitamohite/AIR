Ext.namespace('AIR');

AIR.AirViewport = Ext.extend(Ext.Viewport, {
	
	constructor: function(airMainPanel) {
		this.airMainPanel = airMainPanel;
		
		AIR.AirViewport.superclass.constructor.call(this);
	},

	initComponent: function() {
		Ext.apply(this, {
			layout: 'fit',
			
		    style: {
				backgroundColor: AC.AIR_BG_COLOR,
				color: AC.AIR_FONT_COLOR,
		    	fontFamily: AC.AIR_FONT_TYPE
			},
			
			items: [ this.airMainPanel ]
		});
		
		AIR.AirViewport.superclass.initComponent.call(this);
	}
});


/*
AIR.AirViewport = Ext.extend(Ext.Viewport, {
    layout: 'border',
    border: false,
    autoDestroy: true,
    
    style: {
		backgroundColor: AC.AIR_BG_COLOR,
		color: AC.AIR_FONT_COLOR,
    	fontFamily: AC.AIR_FONT_TYPE
	},

	initComponent: function() {
		Ext.apply(this, {
//			renderTo: 'content',
			
		    items: [{
		        region: 'north',
//		        id: 'northpanel', 
//		        autoScroll: false,
//		        split: false,
//		        height: 90,
//		        collapsible: false,
//		        margins: '0 0 0 0',  
//		        border: false,
//		        baseCls: 'x-plain',
//		        
//		        items: [{
					xtype: 'AIR.CiTitleView',//titlePanel
					height: 90
		//			id: ''
//				}]
		    },{
		        region: 'west',
		        id: 'westpanel', 
		        autoScroll: true,
//		        split: false,
//		        autoHeight: true,
//		        collapsible: false,
//		        border: false,
//		        margins: '0 0 0 0',  
//		        baseCls: 'x-plain',
		        layout: 'fit',
		        width: 155,//155 200
		        border: false,
		        		        
		        items: [{
		        	xtype: 'AIR.CiNavigationView',//workbar
		        	id: 'workBar',
		        	border: false
//		        	layout: 'fit'
		        }]
		    },{
				xtype: 'AIR.CiCenterView',//workpanel,
				id: 'workpanel'
		    },{
		    	xtype: 'panel',
		    	
		    	region: 'east',
		        id: 'eastpanel', 
		        title: '<span id="languageHelpHeaderText">Help</span>',
		        autoScroll: false,
//		        split: true,
		        width: 155,
		        collapsible: true,
		        collapsed: false,
		        //collapseMode: 'mini',
		        margins: '0 0 0 0',
		        border: false,
		        
		        style: {
		        	border: 0
		        },
		        
				headerStyle: {
				    backgroundImage: 'url(' + img_HeaderBottom + ')',
				    backgroundRepeat: 'repeat',
				  	backgroundColor: '#FFFFFF',
			    	fontFamily: AC.AIR_FONT_TYPE,
			    	borderBottomColor: '#FFFFFF'
				},
		        
		        items: [{//info
		        	layout: 'hbox',
		        	layoutConfig: {
		                padding: '0 5 5 3',
		                align: 'left'
		            },
		            
		            bodyStyle: {
		            	backgroundColor: AC.AIR_BG_COLOR,
		            	color: AC.AIR_FONT_COLOR,
		            	fontFamily:AC. AIR_FONT_TYPE
		            },
		            
		            defaults: {margins: '0 0 0 0'},
		            height: 500,
		            width: 155,
		            border: false,
		            
		            items: [{
		                xtype: 'container',
		                contentEl: 'infotext',
		                
		                style: {
		                	backgroundColor: AC.AIR_BG_COLOR,
		                	color: AC.AIR_FONT_COLOR,
		                	fontFamily: AC.AIR_FONT_TYPE,
		                	backgroundImage: 'url("' + img_MenuRight + '")',
		                	backgroundRepeat: 'no-repeat',
		                	backgroundPosition: 'left top'
		                }
		            }]
		        }]
		    },{
		        region: 'south',
		        id: 'southpanel', 
		        autoScroll: false,
		        split: false,
		        height: 15,
		        collapsible: false,
		        collapsed: false,
		        border: false,
		        baseCls: 'x-plain',
		        
		        items: [{
		            xtype: 'panel',
				    layout: 'hbox',
				    
					layoutConfig: {
				        padding: '5',
				        pack: 'end',
				        align: 'middle'
				    },
				    
				    defaults: { margins:'0 5 0 0' },
				    baseCls: 'x-plain',
				    border: false,
				    
					items: [{
						xtype: 'container',
						html: '&nbsp;',
						style: {
						   	backgroundColor: '#043453',
					    	fontFamily: AC.AIR_FONT_TYPE
						}
					}],
					bodyStyle: {
						backgroundColor: '#043453',
						color: '#CEE7F7',
				    	fontFamily: AC.AIR_FONT_TYPE
					}
				}]
		    }]
		});
		
		AIR.AirViewport.superclass.initComponent.call(this);
	}
});*/
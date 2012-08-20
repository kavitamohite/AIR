/*var viewport = new Ext.Viewport({
    layout: 'border',
    border: false,
    autoDestroy: true,

    items: [{
        region: 'north',
        id: 'northpanel', 
        autoScroll: false,
        split: false,
        height: 90,
        collapsible: false,
        margins: '0 0 0 0',  
        border: false,
        baseCls: 'x-plain',
        
        items: [{
			xtype: 'AIR.CiTitleView'//titlePanel
//			id: ''
		}]
    },{
        region: 'west',
        id: 'westpanel', 
        autoScroll : false,
        split: false,
        width: 155,
        autoHeight: true,
        collapsible: false,
        border: false,
        margins: '0 0 0 0',  
        baseCls: 'x-plain',
        
        items: [{
        	xtype: 'AIR.CiNavigationView',//workbar
        	id: 'workBar'
        }]
    },{
		xtype: 'AIR.CiCenterView',//workpanel,
		id: 'workpanel'
    },{
    	region: 'east',
        id: 'eastpanel', 
        title: '<span id="languageHelpHeaderText">Help</span>',
        autoScroll: false,
        split: true,
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
	    	fontFamily: fontType,
	    	borderBottomColor: '#FFFFFF'
		},
        
        items: [{//info
        	layout: 'hbox',
        	layoutConfig: {
                padding: '0 5 5 3',
                align: 'left'
            },
            
            bodyStyle: {
            	backgroundColor: panelbgcolor,
            	color: fontColor,
            	fontFamily: fontType
            },
            
            defaults: {margins: '0 0 0 0'},
            height: 500,
            width: 155,
            border: false,
            
            items: [{
                xtype: 'container',
                contentEl: 'infotext',
                
                style: {
                	backgroundColor: panelbgcolor,
                	color: fontColor,
                	fontFamily: fontType,
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
		        padding:'5',
		        pack:'end',
		        align:'middle'
		    },
		    
		    defaults: { margins:'0 5 0 0' },
		    baseCls: 'x-plain',
		    border: false,
		    
			items: [{
				xtype: 'container',
				html: '&nbsp;',
				style: {
				   	backgroundColor: '#043453',
			    	fontFamily: fontType
				}
			}],
			bodyStyle: {
				backgroundColor: '#043453',
				color: '#CEE7F7',
		    	fontFamily: fontType
			}
		}]
    }],
    style: {
		backgroundColor: panelbgcolor,
		color: fontColor,
    	fontFamily: fontType
	}
});*/
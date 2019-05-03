/*var workbar = new Ext.Panel({
	id: 'workBar',
	layout: 'vbox',
	
	layoutConfig: {
        //padding:'10',
        pack:'start',
        align:'left'
    },
    
    height: 500,
    width: 155,
    margins: '0 0 0 0',
	border: false,
	autoScroll: true,
	baseCls: 'x-plain',
	
	style: {
    	backgroundColor: panelbgcolor,
    	color: fontColor,
    	fontFamily: fontType,
    	backgroundImage: 'url("' + img_MenuLeft + '")',
    	backgroundRepeat: 'no-repeat',
    	//backgroundPosition: '152px 26px'
    	backgroundPosition: 'left top'
    },
    
    items: [{
		xtype: 'container',
		html: '<i><span id="label_menu_loggedinas">Logged in as</span></i><br><span id="username">-</span>',
		id: 'usernamecontainer',
		height: 25,
		width: 155,
		style: {
			color: '#ededed',
			fontWeight: 'bold',
			fontSize: '7pt',
			fontFamily: fontType,
			width: 155,
			padding:'0',
			textAlign: 'center',
			backgroundImage: 'url("' + img_HeaderBottom + '")',
			backgroundRepeat: 'repeat-x'
		  }
    },{ 
		xtype: 'container',
		html: '&nbsp;',
		id: 'headerworkseparator',
		height: 12,
		width: '135',
		hidden: false,
		isHideable: false
	},{ 
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageMyplacemenuitem">My Place</span>',
        id: 'myplacemenuitem',
		height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: false,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '12pt',
			cursor:'pointer'
		}
	},{ 
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageMyplacemycismenuitem">My CIs</span>',
		id: 'myplacemycismenuitem',
	    height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: true,
		hidden: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor:'pointer'
		}
	},{ 
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageMyplacemycissubsmenuitem">My CIs (Delegate)</span>',
		id: 'myplacemycissubsmenuitem',
	    height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: true,
		hidden: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{ 
		xtype: 'container',
		html: '<hr>',
		height: 12,
		width: '135'
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOn + '">&nbsp;<span id="languageSearchmenuitem">Search</span>',
		id: 'searchmenuitem',
        height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: false,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '12pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageAdvancedsearchmenuitem">Advanced Search</span>',
		id: 'advancedsearchmenuitem',
	    height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: false,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',
		html: '<hr>',
		height: 12,
		width: '135'
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageCreateceheader">New Record</span>',
		id: 'createceheader',
        height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: false,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '12pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageMenuItemWizard">Wizard</span>',
		id: 'menuItemWizard',
	    height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: false,
//			hidden: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageMenuItemCopyFrom">Copy From</span>',
		id: 'menuItemCopyFrom',
	    height: 24,
		width: '135',
		cls: 'x-plain',
		isHideable: false,
//			hidden: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',
		html: '<hr>',
		id: 'detailsseparator',
		height: 12,
		width: '135',
		hidden: true,
		isHideable: true
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '"/>&nbsp;<span id="languageDetailsheader">Details</span>',
		id: 'detailsheader',
        //height: 24,
		width: 135,
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '12pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailsspecific">Specifics</span>',
		id: 'detailsspecific',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style : {
		  	textAlign: 'left',
//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailscontacts">Contacts</span>',
		id: 'detailscontacts',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailsagreements">Agreements</span>',
		id: 'detailsagreements',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailsprotection">Protection</span>',
		id: 'detailsprotection',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailscompliance">Compliance</span>',
		id: 'detailscompliance',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailslicense">License</span>',
		id: 'detailslicense',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailsconnections">Connections</span>',
		id: 'detailsconnections',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		  }
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailssupportstuff">Support Stuff</span>',
		id: 'detailssupportstuff',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	},{
		xtype: 'container',
		html: '<hr>',
		id: 'detailshistoryseparator',
		height: 12,
		width: '95',
		hidden: true,
		isHideable: true,
		style: {
			margin: '0 0 0 16'
		}
	},{
		xtype: 'container',	  
		html: '<img src="' + img_NavOff + '">&nbsp;<span id="languageDetailshistory">History</span>',
		id: 'detailshistory',
        height: 24,
		width: '135',
		cls: 'x-plain',
		hidden: true,
		isHideable: true,
		style: {
			textAlign: 'left',
			//			  	  backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'normal',
			fontSize: '8pt',
			cursor: 'pointer'
		}
	}]
});*/

/*
function hideDetailsMenuItem() {
	Ext.getCmp('detailsseparator').hide();
	Ext.getCmp('detailsheader').hide();
	Ext.getCmp('detailsheader').hide();
	Ext.getCmp('detailsspecific').hide();
	Ext.getCmp('detailscontacts').hide();
	Ext.getCmp('detailsagreements').hide();
	Ext.getCmp('detailsprotection').hide();
	Ext.getCmp('detailscompliance').hide();
	Ext.getCmp('detailslicense').hide();
	Ext.getCmp('detailsconnections').hide();
	Ext.getCmp('detailssupportstuff').hide();
	Ext.getCmp('detailshistoryseparator').hide();
	Ext.getCmp('detailshistory').hide();
}*/

/*var workpanel = new Ext.Panel({
	//title: 'Work Area',
	id: 'workpanel',
    layout: 'card',
    region: 'center',
    activeItem: 2,
    deferredRender: false,
    border: false,

    autoScroll: true,

    items: [
        myplacepanel,
//		{
//			xtype: 'AIR.MyPlaceView',
//			id: 'myplacepanel'
//		},
        
        
//		myplaceHomePanel,
		{
			xtype: 'AIR.MyPlaceHomeView',
			id: 'myplaceHomePanel'
		},
		
		
//        searchpanel,
		{
        	xtype: 'AIR.CiSearchView',
        	id: 'searchpanel'
		},
		
		
        editpanel,
        
        
        createpanel
    ]
});*/
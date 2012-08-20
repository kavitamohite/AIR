/*var edittabpanel = new Ext.Panel({
	id: 'edittabPanel',
	layout: 'card',
	activeItem: 0,
    margins: '5 5 5 5',
	hidden: false,
	plain: true,
	border: false,
	buttonAlign: 'left',
	
	autoScroll: true,
	
	items: [{ 
		id: 'card-details',
		border: false,
        items: [detailsPanel]
	
//		items: [{
//			id: 'detailsPanel',
//			xtype: 'AIR.CiDetailsView'
//		}]
     }, { 
    	 id: 'card-specifics',
    	 border: false,
//    	 items: [specificsPanel]
    	 
    	 items: [{
    		 id: 'specificsPanel',
    		 xtype: 'AIR.CiSpecificsView'
    	 }]
     }, { 
    	 id: 'card-contacts',
    	 border: false,
//        	 height: 'auto',
//    	 items: [contactsPanel]
    	 
    	 items: [{
    		 id: 'contactsPanel',
    		 xtype: 'AIR.CiContactsView'
    	 }]
     }, { 
    	 id: 'card-agreements',
    	 border: false,
//    	 items: [agreementsPanel] 
    	 
    	 items: [{
    		 id: 'agreementsPanel',
    		 xtype: 'AIR.CiAgreementsView'
    	 }]
     }, { 
    	 id: 'card-protection',
    	 border: false,
//    	 items: [protectionPanel]
    	 
    	 items: [{
    		 id: 'protectionPanel',
    		 xtype: 'AIR.CiProtectionView'
    	 }]
     }, { 
    	 id: 'card-compliance',
    	 border: false,
//    	 items: [compliancePanel]
    	 
    	 items: [{
    		 id: 'compliancePanel',
    		 xtype: 'AIR.CiComplianceView'
    	 }]
     }, { 
    	 id: 'card-license',
    	 border: false,
//    	 items: [licensePanel]
    	 
    	 items: [{
    		 id: 'licensePanel',
    		 xtype: 'AIR.CiLicenseView'
    	 }]
     }, { 
    	 id: 'card-connections',
    	 border: false,
//    	 items: [connectionsPanel]
    	 
    	 items: [{
    		 id: 'connectionsPanel',
    		 xtype: 'AIR.CiConnectionsView'
    	 }]
     }, { 
    	 id: 'card-supportstuff',
    	 border: false,
//    	 items: [supportStuffPanel]
    	 
    	 items: [{
    		 id: 'supportStuffPanel',
    		 xtype: 'AIR.CiSupportStuffView'
    	 }]
     }, { 
    	 id: 'card-history',
    	 border: false,
    	 items: [historyPanel]
     }],
     buttons: [{
		id: 'savebutton',
		text: 'Save',
		hidden: true,
		handler: function(button, event) {
			saveApplication(button, event);
		}
	}, {
		id: 'cancelbutton',
		text: 'Cancel',
		hidden: true,
		handler: function(button, event) {
//			showCiDetailDataChanged = false;//schon in cancelApplicationDetail gemacht
//			cancelApplicationDetail(button, event);
			
			var verwerfenCallback = function() {
				cancelApplicationDetail(button, event);
			};			
			
			var callbackMap = {
				'yes': verwerfenCallback
			};
			
			var dynamicWindow = createDynamicMessageWindow('CANCEL_CONFIRMATION', callbackMap);
			dynamicWindow.show();
		}
	}]
});*/


/*var editpanel = new Ext.Panel({
	id: 'editPanel',
	
	padding: 20,
	autoScroll: true,
    
    border: false,
    cls: 'x-plain',
    
    items: [{ 
		xtype: 'container',	  
		html: 'Header',
		id: 'editpanelheader',
        height: 'auto',
		width: 800,
		cls: 'x-plain',
		style: {
			textAlign: 'left',
			backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '12pt'
		}
	},{ 
		xtype: 'container',	  
		html: 'SubHeader',
		id: 'editpanelsubheader',
        height: 24,
		cls: 'x-plain',
		style: {
			textAlign: 'left',
			backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '8pt'
		}
	},{ 
		xtype: 'container',	  
		html: '<hr>',
		id: 'editpanelhr',
		cls: 'x-plain',
		style: {
			color: '#d0d0d0',
			backgroundColor: '#d0d0d0',
			height: '1px'
		}
	},{ 
		xtype: 'container',	  
		html: '-',
		id: 'editpaneldraft',
        height: 16,
		hidden: true,
		cls: 'x-plain',
		style: {
			textAlign: 'right',
			backgroundColor: panelbgcolor,
			color: panelDraftMsgColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '10pt'
		}
	},{ 
		xtype: 'container',	  
		html: '-',
		id: 'editpanelmessage',
        autoHeight: true,
		hidden: true,
		cls: 'x-plain',
		style: {
			textAlign: 'left',
			borderStyle: 'solid',
			borderWidth: '1pt',
			borderColor: panelErrorMsgColor,
			backgroundColor: panelbgcolor,
			color: panelErrorMsgColor,
			padding: '2 5 2 5',
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '10pt'
		}
	},{ 
		xtype: 'container',	  
		html: '&nbsp;',
		id: 'editpanelspace',
		cls: 'x-plain',
		style: {
			height: '16px'
		}
	},{//edittabpanel
		xtype: 'AIR.CiEditTabView',
		id: 'edittabPanel'
	}],
    listeners: {
    	beforeshow: function (t) {
	   		 applicationDetailStore.load({
	   			 params: {
	   				 applicationId: selectedCIId,	
		   			 cwid : cwid,
		   			 token : token
	   			 }
	   		 });
    	},
   	 	beforehide : function (pa) {
 			if (Ext.getCmp('personpickertip')!==undefined) {
 				ppHandleToolClick(null, null, null, null);
 			}
 			if (Ext.getCmp('grouppickertip')!==undefined) {
 				gpHandleToolClick(null, null, null, null);
 			}
   	 	}
    }
});*/
Ext.namespace('AIR');

AIR.CiInfoView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
	        title: 'Help',//'<span id="languageHelpHeaderText">Help</span>',
	        autoScroll: true,
	        padding: 5,
	        border: false,
	        layout: 'fit',
	        
	        headerStyle: {//headerStyle bodyStyle
			    backgroundImage: 'url(' + img_HeaderBottom + ')',
//			    backgroundRepeat: 'repeat',
//			  	backgroundColor: '#FFFFFF',
		    	fontFamily: fontType,
//		    	borderBottomColor: '#FFFFFF',
		    	color: '#ededed'
			},
	            
            bodyStyle: {
		    	backgroundImage: 'url("' + img_gradientNavi_Info + '")',//img_MenuLeft
		    	backgroundRepeat: 'repeat-x',//'no-repeat',
		    	backgroundPosition: 'left top'
            },
            
            items: [{
            	xtype: 'label',
            	
            	id: 'lInfoText',
            	
        		style: {
                	color: fontColor,
                	fontFamily: fontType,
                	fontSize: 10,
                	background: 'transparent'
        		}
            }]
		});
		
		AIR.CiInfoView.superclass.initComponent.call(this);
	},
	
	onNavigation: function(viewId) {
		var helpTextId;
		
		switch(viewId) {
			case 'clMyPlace':
				helpTextId = AC.HELP_ID_MYPLACE;
				break;
			case 'clMyPlaceMyCIs':
				helpTextId = AC.HELP_ID_MYPLACE;
				break;
			case 'clMyPlaceMyCIsDelegate':
				helpTextId = AC.HELP_ID_MYPLACE;
				break;
			case 'clSearch':
				helpTextId = AC.HELP_ID_SEARCH;
				break;
			case 'clAdvancedSearch':
				helpTextId = AC.HELP_ID_SEARCH_ADVANCED;
				break;
			case 'clCiCreate':
				helpTextId = AC.HELP_ID_CREATE_CI;
				break;
//			case 'menuItemWizard':
//				helpTextId = AC.HELP_ID_INFOTEXT;
//				break;
//			case 'menuItemCopyFrom':
//				helpTextId = AC.HELP_ID_INFOTEXT;
//				break;
//			case 'menuItemDelete':
//				helpTextId = AC.HELP_ID_INFOTEXT;
//				break;
			case 'clCiDetails':
				helpTextId = AC.HELP_ID_DETAILS_DETAILS;
				break;
			case 'clCiSpecifics':
				helpTextId = AC.HELP_ID_DETAILS_SPECIFIC;
				break;
			case 'clCiContacts':
				helpTextId = AC.HELP_ID_DETAILS_CONTACTS;
				break;
			case 'clCiAgreements':
				helpTextId = AC.HELP_ID_DETAILS_AGREEMENTS;
				break;
			case 'clCiProtection':
				helpTextId = AC.HELP_ID_DETAILS_PROTECTION;
				break;
			case 'clCiCompliance':
				helpTextId = AC.HELP_ID_DETAILS_COMPLIANCE;
				break;
			case 'clCiLicense':
				helpTextId = AC.HELP_ID_DETAILS_LICENSECOSTS;
				break;
			case 'clCiConnections':
				helpTextId = AC.HELP_ID_DETAILS_CONNECTIONS;
				break;
			case 'clCiSupportStuff':
				helpTextId = AC.HELP_ID_DETAILS_SUPPORTSTUFF;
				break;
			case 'clCiHistory':
				helpTextId = AC.HELP_ID_DETAILS_HISTORY;
				break;
			default:
//				helpTextId = AC.HELP_ID_INFOTEXT;
				break;
		}
		
		this.update(helpTextId);
	},
	
	update: function(helpTextId) {
		if(!helpTextId)
			return;
		
		var helpText = AIR.AirApplicationManager.getHelpText(helpTextId);
		
		var lInfoText = this.getComponent('lInfoText');//.getComponent('pInfo')
//		lInfoText.setText(helpText, true);
		
		//nach dem Rendern
		if(lInfoText.getEl()) {
			lInfoText.el.dom.innerHTML = helpText;
		} else {//vor dem Rendern
			lInfoText.html = helpText;
		}
	}
});
Ext.reg('AIR.CiInfoView', AIR.CiInfoView);
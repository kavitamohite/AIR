Ext.namespace('AIR');

AIR.CiNavigationView = Ext.extend(Ext.Panel, {
	
	initComponent: function() {
		Ext.apply(this, {
        	border: false,
			layout: 'form',//vbox

			autoScroll: true,
			
//			layoutConfig: {
//		        pack: 'start',
//		        align: 'left'
//		    },
		    
			bodyStyle: {//style: kein Effekt
		    	backgroundColor: panelbgcolor,
		    	color: fontColor,
		    	fontFamily: fontType,
		    	backgroundImage: 'url("' + img_gradientNavi_Info + '")',//img_MenuLeft
		    	backgroundRepeat: 'repeat-x',//'no-repeat',
		    	backgroundPosition: 'left top'
		    },
		    
		    items: [{
				xtype: 'container',
				html: '<i><span id="label_menu_loggedinas">Logged in as</span></i><br><span id="username">-</span><br><span id="label_menu_lastlogin">Last login: </span><span id="lastlogin">-</span><br>',
				id: 'usernamecontainer',
				height: 45,
				
				style: {
					color: '#ededed',
					fontWeight: 'bold',
					fontSize: '7pt',
					fontFamily: fontType,
					textAlign: 'center',
					
					//entweder a)
					color: fontColor
					//oder b)
//					backgroundImage: 'url("' + img_HeaderBottom + '")',
//					backgroundRepeat: 'repeat-x'
				}
		    }, {
                xtype: 'commandlink',
                id: 'clMyPlace',//myplacemenuitem myplacemenu
                text: 'My Place',
                img: 'images/Transparent.png',//images/Transparent.png
                cls: 'menuMainLink',
                style: {
                	marginTop: 5
                }
			}, {
				xtype: 'panel',
				id: 'pMyPlaceMenuItems',
				border: false,
				hidden: true,
				bodyStyle: {
					background: 'transparent'
				},
				
				items: [{
	                xtype: 'commandlink',
	                id: 'clMyPlaceMyCIs',
	                text: 'My CIs',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clMyPlaceMyCIsDelegate',
	                text: 'My CIs (Delegate)',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				}]
			},{ 
				xtype: 'container',
				html: '<hr>',
//				height: 12,
				width: 160
			},{
                xtype: 'commandlink',
                id: 'clSearch',//clSearch searchmenuitem
                text: 'Search',
                img: 'images/Transparent.png',//images/Transparent.png
                cls: 'menuMainLink',
                bodyStyle: {
                	marginTop: 5
                }
			},{
                xtype: 'commandlink',
                id: 'clAdvancedSearch',
                text: 'Advanced Search',
                img: 'images/Transparent.png',//images/Transparent.png
                cls: 'menuSubLink'
			},{
                xtype: 'commandlink',
                id: 'clOuSearch',
                text: 'Org. Unit Search',
                img: 'images/Transparent.png',//images/Transparent.png
                cls: 'menuSubLink'
			},{ 
				xtype: 'container',
				html: '<hr>',
				width: 160
			},{
                xtype: 'commandlink',
                id: 'clCiCreate',
                text: 'New',
                img: 'images/Transparent.png',//images/Transparent.png
                cls: 'menuMainLink',
                style: {
                	marginTop: 5
                }
			},{
				xtype: 'panel',
				id: 'pCreateDeleteMenuItems',
				border: false,
				hidden: true,
				bodyStyle: {
					background: 'transparent'
				},
                
                items: [{
	                xtype: 'commandlink',
	                id: 'clCiCreateWizard',
	                text: 'Wizard',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiCreateCopyFrom',
	                text: 'Copy From',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiDelete',
	                text: 'Delete',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				}]
			},{
				xtype: 'panel',
				id: 'pCiDetailsMenuItems',
				border: false,
				hidden: true,
				bodyStyle: {
					background: 'transparent'
				},
				
				items: [{ 
					xtype: 'container',
					html: '<hr>',
					width: 160
				},{
	                xtype: 'commandlink',
	                id: 'clCiDetails',
	                text: 'Details',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuMainLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiSpecifics',
	                text: 'Specifics',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiContacts',
	                text: 'Contacts',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiAgreements',
	                text: 'Agreements',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiProtection',
	                text: 'Protection',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiCompliance',
	                text: 'Compliance',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiLicense',
	                text: 'License',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiConnections',
	                text: 'Connections',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
	                xtype: 'commandlink',
	                id: 'clCiSupportStuff',
	                text: 'Support Stuff',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				},{
					xtype: 'container',
					html: '<hr>',
					width: 120
				},{
	                xtype: 'commandlink',
	                id: 'clCiHistory',
	                text: 'History',
	                img: 'images/Transparent.png',//images/Transparent.png
	                cls: 'menuSubLink'
				}]
			}]
		});
		
		AIR.CiNavigationView.superclass.initComponent.call(this);
		
		
		var links = this.findByType('commandlink');
		for(var i = 0; i < links.length; i++)
			links[i].on('click', this.onMenuSelect , this);

		
		this.addEvents('beforeNavigation', 'navigation');
	},
	
	onMenuSelect: function(link, event, options) {
		//add beforeNavigation handlers evtl. returning false to stop navigation
				
		//evtl. Problem wenn nach Wizard Finish auf new record gelickt wird, dass dann die automatische Weiterleitung zur ersten Wizard Seite nicht geht.
		if(this.previousSelected && link.getId() == this.previousSelected.getId() && (!options || !options.forceNavigation))//(options && !options.forceFireEvent) || 
			return;
		
		
		var pMyPlaceMenuItems = this.getComponent('pMyPlaceMenuItems');
		var pCiDetailsMenuItems = this.getComponent('pCiDetailsMenuItems');
		var pCreateDeleteMenuItems = this.getComponent('pCreateDeleteMenuItems');
		
		var navigationCallback = function() {
			switch(link.getId()) {//ORIG: no surrounding callback
				case 'clMyPlace':
				case 'clMyPlaceMyCIs':
				case 'clMyPlaceMyCIsDelegate':
					pMyPlaceMenuItems.setVisible(true);
					pCiDetailsMenuItems.setVisible(false);
					pCreateDeleteMenuItems.setVisible(false);
					break;
				case 'clSearch':
				case 'clAdvancedSearch':
				case 'clOuSearch':
					pCreateDeleteMenuItems.setVisible(false);
					pMyPlaceMenuItems.setVisible(false);
					pCiDetailsMenuItems.setVisible(false);
					break;
				case 'clCiCreate':
				case 'clCiCreateWizard':
				case 'clCiCreateCopyFrom':
				case 'clCiDelete':
					pCreateDeleteMenuItems.setVisible(true);
					pMyPlaceMenuItems.setVisible(false);
					pCiDetailsMenuItems.setVisible(false);
					break;

				default:
					break;
			}
			
			AIR.AirApplicationManager.updateCookie({ navigation: link.getId() });//, true
//			AIR.AirHistoryManager.add(link);
			
			
//			for(var key in options) {
//			   var value = options[key];
//			   
//			   if(typeof value !== 'function')
//				   Util.log('CiNavigationView::onMenuSelect() options: link='+link.getId()+' '+key+'='+value);
//			   else
//				   Util.log('CiNavigationView::onMenuSelect() options: link='+link.getId() + ' key='+key);
//			}
			if(!options || !options.skipHistory) {
//				Util.log('CiNavigationView::onMenuSelect() adding history: link='+link.getId());
				
				AIR.AirApplicationManager.addHistoryItem(link);
			}
			
			link.updateIcon('images/navmarker_on3.png');//images/navmarker_on3.png
			if(this.previousSelected && link.getId() != this.previousSelected.getId())
				this.previousSelected.updateIcon('images/Transparent.png');//images/Transparent.png
			
			this.doLayout();
			this.previousSelected = link;
			this.fireEvent('airAction', this, 'clear');
		}.createDelegate(this);
		
		if(!options) {
			options = {
				callback: navigationCallback
			};
		} else {
			options.callback = navigationCallback;
		}
		
		this.fireEvent('navigation', link.getId(), link, options);//navigationCallback
	},
	
	onExternalNavigation: function(source, uiComponent, target, options) {
		switch(target) {
			case 'clCiDetails':
			case 'clCiSpecifics':
			case 'clCiContacts':
			case 'clCiAgreements':
			case 'clCiProtection':
			case 'clCiCompliance':
			case 'clCiLicense':
			case 'clCiConnections':
			case 'clCiSupportStuff':
			case 'clCiHistory':
				var pCiDetailsMenuItems = this.getComponent('pCiDetailsMenuItems');
				pCiDetailsMenuItems.setVisible(true);
				
				var link = this.getComponent('pCiDetailsMenuItems').getComponent(target);//clCiDetails
				
				if(options) {
//					options.reset = true;
					//auskommentiert damit kein reload bei klick auf ci detail menupunkt. Siehe AirHistoryManager.onBackForwardClick
				} else {
					var options = {
						reset: true
					};
				}
				link.fireEvent('click', link, null, options);
				break;
			case 'clSearch':
			case 'clAdvancedSearch':
			case 'clOuSearch':
			case 'clMyPlace':
			case 'clCiCreate':
				var link = this.getComponent(target);
				link.fireEvent('click', link, null, options);
				break;
			case 'clMyPlaceMyCIs':
			case 'clMyPlaceMyCIsDelegate':
				var link = this.getComponent('pMyPlaceMenuItems').getComponent(target);
				link.fireEvent('click', link, null, options);
				break;
			case 'clCiCreateCopyFrom':
			case 'clCiDelete':
			case 'clCiCreateWizard':
				var link = this.getComponent('pCreateDeleteMenuItems').getComponent(target);
				link.fireEvent('click', link, null, options);
				break;
			default: break;
		}
	},
	
	onCiSelected: function(source, ciId, target) {
		switch(ciId) {
			case -1:
				var pCiDetailsMenuItems = this.getComponent('pCiDetailsMenuItems');
				pCiDetailsMenuItems.setVisible(false);
				
				break;
			default:
				if(target) {
					this.onExternalNavigation(source, target);
				} else {
					var pCiDetailsMenuItems = this.getComponent('pCiDetailsMenuItems');
					pCiDetailsMenuItems.setVisible(true);
				}
				break;
		}
		
		this.doLayout();
	},

	
//	onApplicationCancel: function() {
//		var searchMenuItem = this.getComponent('clSearch');
//		searchMenuItem.onClick();
//	},
	
	update: function() {
    	var userNameC = this.getComponent('usernamecontainer');
    	var usernameSpan = userNameC.el.dom.children[2];
    	        	
    	username = AIR.AirApplicationManager.getUserName();//responseData.username;//username ist global
    	var showLoginData = AIR.AirApplicationManager.getUserName() +' (' + AIR.AirApplicationManager.getCwid().toUpperCase() + ')';//username cwid.toUpperCase()
    	        	
    	var usernameSpan = Ext.get('username');//username usernamecontainer
    	usernameSpan.dom.innerHTML = showLoginData;
    	
    	var lastloginSpan = Ext.get('lastlogin');
    	lastloginSpan.dom.innerHTML = AIR.AirApplicationManager.getLastLogon();
	},
	
	updateLabels: function(labels) {
		Ext.get('label_menu_loggedinas').dom.innerHTML = labels.label_menu_loggedinas;
		
		var link = this.getComponent('clMyPlace');
		link.updateText(labels.label_menu_myplacemenuitem);
		
		link = this.getComponent('pMyPlaceMenuItems').getComponent('clMyPlaceMyCIs');
		link.updateText(labels.label_menu_myplacemycismenuitem);
		
		link = this.getComponent('pMyPlaceMenuItems').getComponent('clMyPlaceMyCIsDelegate');
		link.updateText(labels.label_menu_myplacemycissubsmenuitem);

		link = this.getComponent('clSearch');
		link.updateText(labels.label_menu_searchmenuitem);
		
		link = this.getComponent('clAdvancedSearch');
		link.updateText(labels.label_menu_advancedsearchmenuitem);
		
		link = this.getComponent('clOuSearch');
		link.updateText(labels.lMenuItemOuSearch);
		
		
		
		link = this.getComponent('clCiCreate');
		link.updateText(labels.label_menu_createmenuitem);
		
		link = this.getComponent('pCreateDeleteMenuItems').getComponent('clCiCreateWizard');
		link.updateText(labels.label_menu_wizardmenuitem);
		
		link = this.getComponent('pCreateDeleteMenuItems').getComponent('clCiCreateCopyFrom');
		link.updateText(labels.label_menu_copyfrommenuitem);
		
		link = this.getComponent('pCreateDeleteMenuItems').getComponent('clCiDelete');
		link.updateText(labels.label_menu_delete);
		
		

		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiDetails');
		link.updateText(labels.label_menu_detailsdetails);
		
		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiSpecifics');
		link.updateText(labels.label_menu_detailsspecific);

		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiContacts');
		link.updateText(labels.label_menu_detailscontacts);
		
		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiAgreements');
		link.updateText(labels.label_menu_detailsagreements);
		
		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiProtection');
		link.updateText(labels.label_menu_detailsprotection);

		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiCompliance');
		link.updateText(labels.label_menu_detailscompliance);
		
		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiLicense');
		link.updateText(labels.label_menu_detailslicense);
		
		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiConnections');
		link.updateText(labels.label_menu_detailsconnections);
		
		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiSupportStuff');
		link.updateText(labels.label_menu_detailssupportstuff);
		
		link = this.getComponent('pCiDetailsMenuItems').getComponent('clCiHistory');
		link.updateText(labels.label_menu_detailshistory);
	}
	
});
Ext.reg('AIR.CiNavigationView', AIR.CiNavigationView);
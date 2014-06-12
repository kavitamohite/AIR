Ext.namespace('AIR');

AIR.AirMainPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    autoDestroy: true,
    
	toolbarEmptyMessage: '<table><tr><td>&nbsp;</td></tr><table>',
    
//    style: {
//		backgroundColor: AC.AIR_BG_COLOR,
//		color: AC.AIR_FONT_COLOR,
//    	fontFamily: AC.AIR_FONT_TYPE
//	},
	
	initComponent: function() {
		Ext.apply(this, {
		    items: [{
		        region: 'north',
				id: 'ciTitleView',
				
				xtype: 'AIR.CiTitleView',
				height: 90
		    },{
		        region: 'west',
	        	id: 'ciNavigationView',

	        	xtype: 'AIR.CiNavigationView',
		        width: 180//155 200
		    },{
			    region: 'center',
				id: 'ciCenterView',
				xtype: 'AIR.CiCenterView'
		    	
		    	
//		    	region: 'center',
//		    	xtype: 'panel',
//		    	id: 'pLCiCenterView',
//		    	
////				layout: 'form',//fit form
//				border: false,
//				
//				bodyStyle: {
//		    		backgroundColor: '#12638e'
//		    	},
//		    	
//		    	items: [
//		    	{
//		    		html: '<div style="background-color: white; border-radius:25px 25px 0px 0px; height: 25px;"></div>'
//		    	},
//		    	{
//		    		xtype: 'panel',
//		    		border: false,
////		    		height: 25,
//		    		
//				    bodyStyle: {
//			    		borderRadius: '25px 25px 0px 0px'
////			    		backgroundColor: '#12638e'
//			    	}
//		    	},{
//					id: 'ciCenterView',
//					xtype: 'AIR.CiCenterView'
//		    	}]
		    },{
		    	region: 'east',
		        id: 'eastpanel',
		    	
		        xtype: 'AIR.CiInfoView',
	        	width: 180,
	        	
		        collapsible: true,
		        collapsed: false
//		        collapseMode: 'mini'
		    }],
		    
		    bbar: {
		    	xtype: 'toolbar',
		    	
		    	items: [{
			    	xtype: 'label',
			    	id: 'lSouthToolbar',
			    	html: this.toolbarEmptyMessage
		    	}]
		    }
		});
		
		AIR.AirMainPanel.superclass.initComponent.call(this);
		
//		this.testRenderSequence();
		this.addEvents('externalNavigation');
	},

	
	update: function() {
//		toolbar status message updates
//		var toolbar = this.getFooterToolbar();
//		var lStatus = toolbar.getComponent('lStatus');
		
		var ciInfoView = this.getComponent('eastpanel');
		var ciTitleView = this.getComponent('ciTitleView');
		var navigationV = this.getComponent('ciNavigationView');
		var myPlaceHomeView = this/*.getComponent('pLCiCenterView')*/.getComponent('ciCenterView').getComponent('myPlaceHomeView');
		
		ciInfoView.update(AC.HELP_ID_INFOTEXT);
		ciTitleView.update(AAM.getLanguage());
		myPlaceHomeView.update();
		navigationV.update();
		
//		AIR.AirApplicationManager.restoreUiState(this);
	},
	
	
	switchLanguage: function(link, event) {
		var newLanguage;
		
		switch(link.img) {
			case img_LangDE:
				newLanguage = img_LangEN;
				break;
			default:
				newLanguage = img_LangDE;
				break;
		}
		
		var countryCode = link.img.substring(link.img.indexOf('_') + 1, link.img.indexOf('.'));//newLanguage
		link.updateIcon(newLanguage);
		
		AIR.AirApplicationManager.setLanguage(countryCode);
		
		this.updateLabels(AIR.AirApplicationManager.getLabels());
		this.updateToolTips(AIR.AirApplicationManager.getToolTips());//countryCode AIR.AirApplicationManager.getToolTips()
	},
		

	updateLabels: function(labels) {
		var ciTitleView = this.getComponent('ciTitleView');
		ciTitleView.updateLabels(labels);
		
		var ciNavigationView = this.getComponent('ciNavigationView');
		ciNavigationView.updateLabels(labels);
		
		var ciCenterView = this/*.getComponent('pLCiCenterView')*/.getComponent('ciCenterView');
		ciCenterView.updateLabels(labels);
	},

	updateToolTips: function(toolTips) {
		var ciCenterView = this/*.getComponent('pLCiCenterView')*/.getComponent('ciCenterView');
		ciCenterView.updateToolTips(toolTips);
	},
	
	
	testRenderSequence: function() {
		var ciViews = [
		    this,
            Ext.getCmp('ciTitleView'),
            Ext.getCmp('ciNavigationView'),
            Ext.getCmp('ciCenterView'),
            Ext.getCmp('myPlaceView'),
            Ext.getCmp('myPlaceHomeView'),
            
            Ext.getCmp('ciSearchView'),
            Ext.getCmp('ciEditView'),
//            Ext.getCmp('ciEditTabView'),
            Ext.getCmp('clCiDetails'),
            Ext.getCmp('clCiSpecifics'),
            Ext.getCmp('clCiSpecificsAnwendung'),
            Ext.getCmp('clCiSpecificsTerrain'),
            Ext.getCmp('clCiContacts'),
            Ext.getCmp('clCiAgreements'),
            Ext.getCmp('clCiProtection'),
            Ext.getCmp('clCiCompliance'),            
            Ext.getCmp('clCiLicense'),
            Ext.getCmp('clCiConnections'),
            Ext.getCmp('clCiSupportStuff'),
            Ext.getCmp('clCiHistory'),
            
            Ext.getCmp('ciCreateView'),
            Ext.getCmp('CiCreateInfoView'),
//            Ext.getCmp('ciCreateWizardPagesView'),
            Ext.getCmp('CiCopyFromView'),
            Ext.getCmp('CiCopyFromDetailView'),
            Ext.getCmp('CiDeleteView'),
            Ext.getCmp('CiCreateInfoView'),
            Ext.getCmp('CiCopyFromView'),
            Ext.getCmp('ciCreateWizardView'),
            Ext.getCmp('ciCreateWizardP1'),
            Ext.getCmp('ciCreateAppMandatoryView'),
            Ext.getCmp('ciCreateWizardP2'),
            Ext.getCmp('ciCreateAppRequiredView'),
            
//            Ext.getCmp('ciCreateWizardPage0'),
//            Ext.getCmp('ciCreateWizardPage1'),
//            Ext.getCmp('ciCreateWizardPage2'),
//            Ext.getCmp('ciCreateWizardPage3'),
            
            Ext.getCmp('myPlaceTabView'),
            Ext.getCmp('myOwnCisView'),
            Ext.getCmp('myDelegateCisView'),
            Ext.getCmp('wizardRelevance'),
            Ext.getCmp('tbWizardRelevance'),
            Ext.getCmp('wizardBasics'),
            Ext.getCmp('wizardRelevance'),
            Ext.getCmp('wizardAgreements'),
            Ext.getCmp('wizardAppowner'),
            Ext.getCmp('tbWizardAppowner'),
            Ext.getCmp('tbWizardAppownerDelegate'),
            Ext.getCmp('wizardCiowner'),
            Ext.getCmp('tbWizardciResponsible'),
            Ext.getCmp('eastpanel')
		];
		
		Ext.each(ciViews, function(item, items, index) {
			if(item)
				item.on('afterrender', this.onAfterRender, this);
		}.createDelegate(this));
	},
	
	onAfterRender: function(ct) {
		Util.log(ct.getId());
	}
});
Ext.reg('AIR.AirMainPanel', AIR.AirMainPanel);
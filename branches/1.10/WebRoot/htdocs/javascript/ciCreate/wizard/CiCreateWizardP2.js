Ext.namespace('AIR');

AIR.CiCreateWizardP2 = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			layout: 'form',
//			border: false,
			title: '-',
			
//			height: 620,
			
			labelWidth: 180,
			padding: 10,//bodyStyle: {}
			
			items: [{
//		    	xtpye: 'panel',
//		    	id: 'wizardCat1RequiredPages',
//		    	
//			    layout: 'card',
//			    activeItem: 0,
//			    
//			    border: false,
////		        style: {
////		        	marginTop: 20
////		        },
//		        
//			    items: [{
			    	xtype: 'AIR.CiCreateAppRequiredView',
			    	id: 'ciCreateAppRequiredView'
//			    }
			    		/*,{
			    	xtype: 'AIR.CiCreateApplicationPlatformView',
			    	id: 'ciCreateAppPlatformView'
			    },{
			    	xtype: 'AIR.CiCreateCommonServiceView',
			    	id: 'ciCreateCommonServiceView'
			    },{
			    	xtype: 'AIR.CiCreateMiddlewareView',
			    	id: 'ciCreateMiddlewareView'
			    }]*/
		    }]
		});
		
		AIR.CiCreateWizardP2.superclass.initComponent.call(this);

	},
	
	setData: function(params) {
		this.getComponent('ciCreateAppRequiredView').setData(params);
	},
	
	reset: function() {
		this.getComponent('ciCreateAppRequiredView').reset();
	},

	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage2);
		
		this./*getComponent('wizardCat1RequiredPages').*/getComponent('ciCreateAppRequiredView').updateLabels(labels);
		
//		this.setFieldLabel(this.getComponent('cbAppCat1W'), labels.wizardobjectType);
//		this.setFieldLabel(this.getComponent('cbAppCat2W'), labels.label_details_category);
//		
//		AIR.AirAclManager.setNecessity(this.getComponent('cbAppCat1W'));
//		AIR.AirAclManager.setNecessity(this.getComponent('cbAppCat2W'));
//		
//		
//		this.getComponent('wizardCat1Pages').getComponent('ciCreateApplicationView').updateLabels(labels);
		//...
//		this.getComponent('wizardCat1Pages').getComponent('ciCreateMiddlewareView').updateLabels(labels);
	}
	
});
Ext.reg('AIR.CiCreateWizardP2', AIR.CiCreateWizardP2);
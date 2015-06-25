Ext.namespace('AIR');

AIR.CiCreateView = Ext.extend(Ext.Panel, {
	
	initComponent: function() {
		this.objectNameAllowedStore = AIR.AirStoreFactory.getObjectNameAllowedStore();
		this.objectAliasAllowedStore = AIR.AirStoreFactory.getObjectAliasAllowedStore();
		
		Ext.apply(Ext.form.VTypes, {
		    allowedName: function(val, field) {
		    	var isValid = this.objectNameAllowedStore.getAt(0) === undefined ? true : this.objectNameAllowedStore.getAt(0).data.countResultSet == 0 ? true : false; 
		        return isValid;
		    }.createDelegate(this),
		    allowedNameText: '"Name" {0} already exists. Please choose another name or ask ITILcenter@bayer.com for help to enable this name.'// '+this.objectNameAllowedStore.getAt(0).data.application+'
		});

		Ext.apply(Ext.form.VTypes, {
		    allowedAlias: function(val, field) {
		        return this.objectAliasAllowedStore.getAt(0) === undefined ? true : this.objectAliasAllowedStore.getAt(0).data.countResultSet == 0 ? true : false;
		    }.createDelegate(this),
		    allowedAliasText: '"Alias" {0} already exists. Please choose another name or ask ITILcenter@bayer.com for help to enable this alias.'// '+this.objectAliasAllowedStore.getAt(0).data.application+'
		});
		
		
		Ext.apply(this, {
			border: false,
			padding: 20,
			
			layout: 'form',//form card
			autoScroll: true,
			
		    items: [{ 
//				xtype: 'container',
//				html: 'Create new Application',
//				id: 'createpanelheader',
//		        height: 24,
//				width: 800,
//				cls: 'x-plain',
		    	
		    	xtype: 'label',
		    	id: 'createpanelheader',
				
				style: {
					textAlign: 'left',
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '12pt'
				}
			}, { 
				xtype: 'container',	  
				html: '',
				id: 'createpanelsubheader',
		        height: 24,
				cls: 'x-plain',
				style: {
					textAlign: 'left',
				  	backgroundColor: AC.AIR_BG_COLOR,
				  	color: AC.AIR_FONT_COLOR,
				    fontFamily: AC.AIR_FONT_TYPE,
				  	fontWeight: 'bold',
				  	fontSize: '8pt'
				}
			}, { 
				xtype: 'container',	  
				html: '<hr>',
				id: 'createpanelhr',
				cls: 'x-plain',
				style: {
					color: '#d0d0d0',
					backgroundColor: '#d0d0d0',
					height: '1px',
					marginBottom: 15
				}
			},
//			{
//				xytpe: 'AIR.CiCreationWizardCardView',
//				id: 'ciCreatePagesView'
////				layout: 'fit'//card
//			}
			
//			{
//				xytpe: 'AIR.CiTestView',
//				id: 'ciCreatePagesView'//testView
//			}
			
			{
				id: 'ciCreatePagesView',
				layout: 'card',
				activeItem: 0,
//			    margins: '5 5 5 5',
				hidden: false,
				plain: true,
				border: false,
				buttonAlign: 'left',
				
//				height: 620,//!
				
//				autoScroll: true,
				
				items: [{
					id: 'CiCreateInfoView',
			    	xtype: 'AIR.CiCreateInfoView'
				}, { 
					id: 'ciCreateWizardView',
					xtype: 'AIR.CiCreateWizardView'
				}, { 
					id: 'CiCopyFromView',
					xtype: 'AIR.CiCopyFromView'
				}, {
					id: 'ciDeleteView',
					xtype: 'AIR.CiDeleteView'
				}]
			}
			]
		});
		
		AIR.CiCreateView.superclass.initComponent.call(this);
		
		this.addEvents('externalNavigation');
		
		var bStartWizzardDelegate = this.getComponent('ciCreatePagesView').getComponent('CiCreateInfoView').getComponent('bWizardDelegate');
		var bCopyFromDelegate = this.getComponent('ciCreatePagesView').getComponent('CiCreateInfoView').getComponent('bCopyFromDelegate');
		var bDeleteDelegate = this.getComponent('ciCreatePagesView').getComponent('CiCreateInfoView').getComponent('bDeleteDelegate');
		
		bStartWizzardDelegate.on('click', this.startWizard, this);
		bCopyFromDelegate.on('click', this.startCopyFrom, this);
		bDeleteDelegate.on('click', this.startDelete, this);
	},
	
	
	
	startWizard: function(button, event) {
		this.fireEvent('externalNavigation', this, button, 'clCiCreateWizard');
	},
	
	startCopyFrom: function(button, event) {
		this.fireEvent('externalNavigation', this, button, 'clCiCreateCopyFrom');
	},
	
	startDelete: function(button, event) {
		this.fireEvent('externalNavigation', this, button, 'clCiDelete');
	},
	
	updateLabels: function(labels) {
		this.getComponent('createpanelheader').setText(labels.createpanelheader);
		
		var ciCreateInfoView = this.getComponent('ciCreatePagesView').getComponent('CiCreateInfoView');
		ciCreateInfoView.updateLabels(labels);
		
//		var ciCreateWizardPagesView = this.getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView');
//		if(ciCreateWizardPagesView)
//			ciCreateWizardPagesView.updateLabels(labels);
		
		var ciCreateWizardView = this.getComponent('ciCreatePagesView').getComponent('ciCreateWizardView');
		if(ciCreateWizardView)
			ciCreateWizardView.updateLabels(labels);
		
		var ciCopyFromView = this.getComponent('ciCreatePagesView').getComponent('CiCopyFromView');
		ciCopyFromView.updateLabels(labels);
		
		var ciDeleteView = this.getComponent('ciCreatePagesView').getComponent('ciDeleteView');
		ciDeleteView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
		var ciCreateWizardPagesView = this.getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView');
		if(ciCreateWizardPagesView)
			ciCreateWizardPagesView.updateToolTips(toolTips);
	}
	

});
Ext.reg('AIR.CiCreateView', AIR.CiCreateView);
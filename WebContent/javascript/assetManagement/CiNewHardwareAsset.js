Ext.namespace('AIR');

AIR.CiNewHardwareAsset = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			border: false,
			padding: 20,
			layout: 'form',
			autoHeight : true,
			autoScroll: true,
			 items: [{ 
		    	xtype: 'label',
		    	itemId: 'hardwarepanelheader',
				style: {
					textAlign: 'left',
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '12pt'
				}
			},{ 
				xtype: 'container',	  
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
			},{
				xtype: 'container',	  
				html: '<hr>',
				cls: 'x-plain',
				style: {
					color: '#d0d0d0',
					backgroundColor: '#d0d0d0',
					height: '1px',
					marginBottom: 15
				}
			},{
				itemId: 'ciHardwareInfoView',
				layout: 'card',
				activeItem: 0,
				hidden: false,
				plain: true,
				border: false,
				buttonAlign: 'left',
				items: [{
					itemId: 'ciHardwareInfo',
			    	xtype: 'AIR.CiHardwareInfo'
				}]
			}]
		});

		AIR.CiNewHardwareAsset.superclass.initComponent.call(this);
		this.addEvents('externalNavigation');
		
		var bAssetwithInventory = this.getComponent('ciHardwareInfoView').getComponent('ciHardwareInfo').getComponent('bAssetwithInventory');
		var bAssetwithoutInventory = this.getComponent('ciHardwareInfoView').getComponent('ciHardwareInfo').getComponent('bAssetwithoutInventory');
		
		bAssetwithInventory.on('click', this.startWithInventory, this);
		bAssetwithoutInventory.on('click', this.startWithoutInventory, this);
	},
	
	startWithInventory: function(button, event) {
		this.fireEvent('externalNavigation', this, button, 'clCiAssetwithInventory');
	},
	
	startWithoutInventory: function(button, event) {
		this.fireEvent('externalNavigation', this, button, 'clCiAssetwithoutInventory');
	},

	updateLabels: function(labels) {
		this.getComponent('hardwarepanelheader').setText(labels.createhardwarepanelheader);
		
		var ciHardwareInfo = this.getComponent('ciHardwareInfoView').getComponent('ciHardwareInfo');
		ciHardwareInfo.updateLabels(labels);
	}

});
Ext.reg('AIR.CiNewHardwareAsset', AIR.CiNewHardwareAsset);
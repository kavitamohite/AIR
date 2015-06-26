Ext.namespace('AIR');

AIR.CiHardwareInfo = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    style: {
		    	fontSize: '12px'
		    },
		    items: [{
		    	xtype: 'label',
		        itemId: 'AssetwithInventory',
		        style:{
		        	textAlign: 'left',
				  	backgroundColor: AC.AIR_BG_COLOR,
				  	color: AC.AIR_FONT_COLOR,
				    fontFamily: AC.AIR_FONT_TYPE,
				  	fontSize: '10pt'
 		        }
		    },{
				xtype: 'button',
				visible: true,
				itemId: 'bAssetwithInventory',
			},{ 
				xtype: 'container',	  
				html: '',
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
		    	xtype: 'label',
		        itemId: 'AssetwithoutInventory',
		        style:{
		        	textAlign: 'left',
				  	backgroundColor: AC.AIR_BG_COLOR,
				  	color: AC.AIR_FONT_COLOR,
				    fontFamily: AC.AIR_FONT_TYPE,
				  	fontSize: '10pt',
 		        }
		    },{
				xtype: 'button',
				visible: true,
				itemId: 'bAssetwithoutInventory',
			}]
		});
		
		AIR.CiHardwareInfo.superclass.initComponent.call(this);
	},

	updateLabels: function(labels) {
		this.getComponent('AssetwithInventory').el.dom.innerHTML = labels.lAssetwithInventoryText;
		this.getComponent('bAssetwithInventory').setText(labels.lAssetwithInventory);
		
		this.getComponent('AssetwithoutInventory').el.dom.innerHTML = labels.lAssetwithoutInventoryText;
		this.getComponent('bAssetwithoutInventory').setText(labels.lAssetwithoutInventory);
	}
	
});
Ext.reg('AIR.CiHardwareInfo', AIR.CiHardwareInfo);
Ext.namespace('AIR');

AIR.CiTestView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			border: false,
			padding: 20,
			
//			layout: 'form',//card

			
		    items: [{ 
				xtype: 'container',	  
				html: 'Create new Application',
				id: 'createpanelheader',
		        height: 24,
				width: 800,
				cls: 'x-plain',
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
					height: '1px'
				}
			}, { 
				xtype: 'container',
				html: '&nbsp;',
				id: 'createpanelspace',
				cls: 'x-plain',
				style: {
					height: '16px'
				}
			}, //CiCreationCardPanel
			{
				xytpe: 'AIR.CiCreationWizardCardView',
				id: 'ciCreatePagesView'
//				layout: 'fit'//card
			}
			
//			{
//				xytpe: 'AIR.CiTestView',
//				id: 'ciCreatePagesView'//testView
//			}
			
//			{
//				id: 'ciCreatePagesView',
//				layout: 'card',
//				activeItem: 0,
////			    margins: '5 5 5 5',
//				hidden: false,
//				plain: true,
//				border: false,
//				buttonAlign: 'left',
//				
//				autoScroll: true,
//				
//				items: [{
//					id: 'CiCreateInfoView',
//			    	xtype: 'AIR.CiCreateInfoView'
//				}, { 
//					id: 'CiCreateWizardView',
//					xtype: 'AIR.CiCreationWizardPagesTabView'
//				}, { 
//					id: 'CiCopyFromView',
//					xtype: 'AIR.CiCopyFromView'
//				}, {
//					id: 'CiCopyFromDetailView',
//					xtype: 'AIR.CiCopyFromDetailView'
//				}, {
//					id: 'CiDeleteView',
//					xtype: 'AIR.CiDeleteView'
//				}]
//			}
			]
		});
		
		AIR.CiTestView.superclass.initComponent.call(this);
	}
});
Ext.reg('AIR.CiTestView', AIR.CiTestView);
Ext.namespace('AIR');

AIR.MyPlaceView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			border: false,
			padding: 20,
			autoScroll: true,
//			layout: 'anchor',
		   
		    items: [{ 
		    	xtype: 'label',
		    	id: 'mycispanelheader',
				
				style: {
//					textAlign: 'left',
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '12pt'
				}
			}, { 
				xtype: 'container',
				html: '',
				id: 'mycispanelsubheader',
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
				id: 'mycispanelhr',
				cls: 'x-plain',
				style: {
					color: '#d0d0d0',
					backgroundColor: '#d0d0d0',
					height: '1px'
				}
			}, { 
				xtype: 'container',
				html: '&nbsp;',
				id: 'mycispanelspace',
				cls: 'x-plain',
				style: {
					height: '16px'
				}
			}, {//myPlaceTabView
		    	xtype: 'AIR.MyPlaceTabView',
		    	id: 'myPlaceTabView'
//		    	layout: 'anchor'
//		    	anchor: '100%'
			}]
		});
		
		AIR.MyPlaceView.superclass.initComponent.call(this);
	},
	
	update: function(viewId) {
		this.viewId = viewId;
//		var myPlaceTabView = this.getComponent('myPlaceTabView');
//		
//		switch(this.viewId) {
//			case 'clMyPlaceMyCIs':
//				myPlaceTabView.getLayout().setActiveItem('card-mycis');
//				myPlaceTabView.loadDelegateCIsGrid();
//				break;
//			case 'clMyPlaceMyCIsDelegate':
//				myPlaceTabView.getLayout().setActiveItem('card-myapps');
//				myPlaceTabView.loadMyOwnCIsGrid();
//				break;
//		}
	},
	
	updateLabels: function(labels) {
		var headerLabel;
		
		switch(this.viewId) {
			case 'clMyPlaceMyCIs':
				headerLabel = labels.label_menu_myplacemycismenuitem;
				break;
			case 'clMyPlaceMyCIsDelegate':
				headerLabel = labels.label_menu_myplacemycissubsmenuitem;
				break;
		}
			
		var myplacepanelheader = this.getComponent('mycispanelheader');
		myplacepanelheader.setText(headerLabel);
	}
});
Ext.reg('AIR.MyPlaceView', AIR.MyPlaceView);
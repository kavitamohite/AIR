Ext.namespace('AIR');

AIR.DynamicWindow = Ext.extend(Ext.Window, {

	constructor: function(windowTitle, windowText, windowIcon, buttonConfigs) {
		this.windowTitle = windowTitle;
		this.windowText = windowText;
		this.windowIcon = windowIcon;
		this.buttonConfigs = buttonConfigs;
		
		AIR.DynamicWindow.superclass.constructor.call(this);
	},
	
	initComponent: function() {
		Ext.apply(this, {
			layout: 'fit',//fit hbox
//			cls: 'ext-mb-content',
			
//			minWidth: 200,//350,//this.minWidth,//
//			minHeight: 80, //kein Effekt
			height: 80,
			width: 200,//this.minWidth + 50,//
			
//			autoHeight: true,
//			autoWidth: true,
			
			plain: true,
			modal: true,
			closable: false,
			border: false,
			title: this.windowTitle,

			items: [
//			{
//				html: '<img src="' + this.windowIcon + '">',
//				border: false
//			},
			{
//				xtype: 'label',
//				text: this.windowText,
//				cls: 'ext-mb-text',
//				style: {
//					fontSize: 12
//				}
				
				id: 'dynamicWindowContent',
				border: false,
				html: '<table><tr><td><img src="' + this.windowIcon + '"></td><td><div class="ext-mb-content"><span class="ext-mb-text" style="font-size: 12">' + this.windowText + '</span></div></td></tr></table>'//'<table><tr><td><img src="' + this.windowIcon + '"></td><td>'+this.windowText+'</td></tr></table>'
			}],
			
			buttons: this.buttonConfigs,
			buttonAlign: 'center'
		});
		
		AIR.DynamicWindow.superclass.initComponent.call(this);
	},
	
	afterRender: function(windowDom) {
		AIR.DynamicWindow.superclass.afterRender.call(this);
		
		var dynamicWindowContent = this.getComponent('dynamicWindowContent');
		if(dynamicWindowContent.getHeight() < 50)
			dynamicWindowContent.setHeight(55);
		
		
//		var dynamicWindowContent = Ext.getCmp('dynamicWindowContent');//Ext.getCmp ersetzen
//		var height = dynamicWindowContent.getHeight();
//		
//		//eine Mindesgröße muss > 17 sein. Beim ersten Öffnen dieses Fensters ist die Größe
//		//von dynamicWindowContent 17. Wie auch immer diese Zahl ermittelt wird.
//		if(height < 50)
//			height = 55;
//		
//		var width = dynamicWindowContent.getWidth();
//		
//		if(this.buttons.length > 2) {
//			var minWidth = 0;
//			for(var i = 0; i < this.buttons.length; i++)
//				minWidth += this.buttons[i].getWidth();
//				
//			this.minWidth = minWidth;
//			width = minWidth + 50;
//			
//			height += 60;
//			if(height > 120)
//				height *= 0.75;
//		} else {
//			height += 100;
//			width += 60;
//		}
//
//		this.setWidth(width);
//		this.setHeight(height);
	},
	
	show: function() {
//		switch(this.buttonConfigs.length) {//this.getBottomToolbar().items.items.length
//			case 1:
//				this.setWidth(250);
//				break;
//			case 2:
//				this.setWidth(300);
//				break;
//			case 3:
//				this.setWidth(350);
//				break;
//		}
		
		AIR.DynamicWindow.superclass.show.call(this);
		//this.hide();
		//this.setVisible(false);// calls show --> infinite recursion loop
		//this.setVisible(true);
	}
});
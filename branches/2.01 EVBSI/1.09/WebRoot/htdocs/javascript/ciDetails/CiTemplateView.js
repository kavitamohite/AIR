Ext.namespace('AIR');

AIR.CiTemplateView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
	    	layout: 'fit',
	    	title: '',//get from languagestore, language.js

	    	monitorResize: true,
	        split: false,
	        border: true,
	        
	        bodyStyle: {
	        	backgroundColor: panelbgcolor,
	        	color: fontColor,
	        	fontFamily: fontType
	        },
	        
	        items: [{
	        	html: 'template'
	        }]
		});
		
		AIR.CiTemplateView.superclass.initComponent.call(this);
	}
});
Ext.reg('AIR.CiTemplateView', AIR.CiTemplateView);
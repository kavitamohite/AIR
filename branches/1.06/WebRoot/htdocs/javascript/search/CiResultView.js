Ext.namespace('AIR');

AIR.CiResultView = Ext.extend(Ext.Panel, {
	CI_TYPE_APPLICATION: 2,
	
	initComponent: function() {
		Ext.apply(this, {
	    	xtype: 'panel',
	    	layout: 'fit',
	    	title: 'Results',//get from languagestore, language.js

//    		x: 50,
//    		y: 100,
//    		height: 500,
//	        margins: '0 0 0 0',
//
//	    	monitorResize: true,
//	        split: false,
//	        border: true,
	    	
	    	border: false,
	        
	        bodyStyle: {
	        	backgroundColor: panelbgcolor,
	        	color: fontColor,
	        	fontFamily: fontType
	        }
		});
		
		AIR.CiResultView.superclass.initComponent.call(this);
	}
});
Ext.reg('AIR.CiResultView', AIR.CiResultView);
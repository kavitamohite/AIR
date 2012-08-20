
/**
 * enables the save user options button when one user option was changed.
 
function activateButtonSaveUserOptions() {
	Ext.getCmp('saveuseroptionbutton').show();
}

function inactivateButtonSaveUserOptions() {
	Ext.getCmp('saveuseroptionbutton').hide();
}*/


/*var myplacetabpanel = new AIR.MyPlaceTabView();new Ext.Panel({
	id: 'myplacetabPanel',
	layout: 'card',
	activeItem: 0,
//    padding: '5 5 5 5',
//	padding: 20,
	
	hidden: false,
	plain: true,
	border: false,
	items: [{ 
		id: 'card-mycis',
		border: false,
		
//		items: [
//            gridpaneleins
//	    ] 
		
	    items: [{
	    	xtype: 'AIR.CiResultView',
	    	id: 'myOwnCisView',
	        
	    	items: [{
		    	xtype: 'AIR.CiResultGrid',
		    	id: 'myOwnCIsGrid'
	    	}]
	    }]
	 }, { 
		id: 'card-myapps',
		border: false,
		
//		items: [
//            gridpanelzwei
//	    ] 
		
	    items: [{
	    	xtype: 'AIR.CiResultView',
	    	id: 'myDelegateCisView',
	        
	    	items: [{
		    	xtype: 'AIR.CiResultGrid',
		    	id: 'myDelegateCIsGrid'
	    	}]
	    }] 
	 }]
});*/

/*
var myplacepanel = new Ext.Panel({
	id : 'myplacePanel',
	border: false,
	padding: 20,
//	autoScroll: true,
	
//	layout: 'table',
//    layoutConfig: {
//    	columns:1
//    },
//    
//    style: {
//    	position: 'absolute',
//    	left: '50px',
//    	top: '15px'
//    },
//    height: 600,
   
    items: [{ 
		xtype: 'container',	  
		html: 'My CIs',
		id: 'mycispanelheader',
        height: 24,
		width: 800,
		cls: 'x-plain',
		style: {
			textAlign: 'left',
			backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
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
			backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
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
	}, {//myplacetabpanel
    	xtype: 'AIR.MyPlaceTabView',
    	id: 'myplacetabPanel'
	}]
});*/


/*var myplaceHomePanel = new Ext.Panel({
	labelWidth: 200, // label settings here cascade unless overridden
    id: 'myplaceHomePanel',
	border: false,
	buttonAlign: 'left',
	padding: 20,
	
    layout: 'form',
    
    items: [{ 
		xtype: 'container',	  
		html: 'My Place',
		id: 'myplacepanelheader',
        height: 24,
		width: 800,
		cls: 'x-plain',
		style: {
			textAlign: 'left',
			backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '12pt'
		}
	}, { 
		xtype: 'container',	  
		html: '',
		id: 'myplacepanelsubheader',
        height: 24,
		cls: 'x-plain',
		style: {
	  	  	textAlign: 'left',
	  	  	backgroundColor: panelbgcolor,
	  	  	color: fontColor,
	  	  	fontFamily: fontType,
	  	  	fontWeight: 'bold',
	  	  	fontSize: '8pt'
		}
	}, { 
		xtype: 'container',	  
		html: '<hr>',
		id: 'myplacepanelhr',
		cls: 'x-plain',
		style : {
			color: '#d0d0d0',
			backgroundColor: '#d0d0d0',
			height: '1px'
		}
	}, { 
		xtype: 'container',	  
		html: '&nbsp;',
		id: 'myplacepanelspace',
		cls: 'x-plain',
		style: {
			height: '16px'
		}
	}, {
		xtype: 'textfield',
        width: 230,
        fieldLabel: 'User',
        name: 'myplaceuser',
        id: 'myplaceuser',
        maxLength: 32,
        allowBlank: true,
        disabled: true
	}, {
		xtype: 'textfield',
        width: 230,
        fieldLabel: 'CWID',
        name: 'myplacecwid',
        id: 'myplacecwid',
        maxLength: 32,
        allowBlank: true,
        disabled: true
	}, {
		xtype: 'textarea',
        width: 230,
        fieldLabel: 'Role',
        name: 'myplaceroleperson',
        id: 'myplaceroleperson',
        growMin: 20,
        growMax: 60,
        allowBlank: true,
        disabled: true
	}, {
		xtype: 'textfield',
        width: 230,
        fieldLabel: 'Business essential editor',
        name: 'myplacerolebusinessessentialeditor',
        id: 'myplacerolebusinessessentialeditor',
        maxLength: 32,
        allowBlank: true,
        disabled: true,
        hidden: true
        // TODO Feld entfernen
	}, {
    	xtype: 'container',
    	html: '&nbsp;'
    }, {
        xtype: 'fieldset',
        id: 'useroptions',
        title: 'User options',
        labelWidth: 200,
        
		items: [{
	    	xtype: 'checkbox',
	        fieldLabel: 'Language EN',
	        name: 'useroptionLanguage',
	        id: 'useroptionLanguage',
	        allowBlank: true,
	          	listeners: {
		    		check: function() {
		    			activateButtonSaveUserOptions();
		    		}
		    	}
			}, {
				xtype: 'checkbox',
		        fieldLabel: 'Number Format DE',
		        name: 'useroptionNumberFormat',
		        id: 'useroptionNumberFormat',
		        allowBlank: true,
		          	listeners: {
			    		check: function() {
			    			activateButtonSaveUserOptions();
			    		}
			    	}
			}, {
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Currency',
		        id: 'useroptionCurrency',
		        store: currencyListStore,
		        valueField: 'id',
		        displayField: 'text',
		        typeAhead: true,
		        forceSelection: true,
		        autoSelect: false,
		        triggerAction: 'all',
		        lazyRender:true,
		        lazyInit:false,
		        mode: 'local',
		        listeners: {
	                select: function(combo, record, index) {
						activateButtonSaveUserOptions();
                        combo.setValue(record.data['text']);
	                }
		        }
		    }, {
		    	xtype: 'container',
		    	html: '&nbsp;'
		    }, {
		    	xtype: 'checkbox',
		        fieldLabel: 'Close help window',
		        name: 'useroptionHelp',
		        id: 'useroptionHelp',
		        allowBlank: true,
	          	listeners: {
		    		check: function() {
		    			activateButtonSaveUserOptions();
		    		}
		    	}
	        }, {
		    	xtype: 'checkbox',
		        fieldLabel: 'Skip wizard message',
		        name: 'useroptionSkipWizardMessage',
		        id: 'useroptionSkipWizardMessage',
		        allowBlank: true,
	          	listeners: {
		    		check: function() {
		    			activateButtonSaveUserOptions();
		    		}
		    	}
			}, {
		    	xtype: 'checkbox',
		        fieldLabel: 'Disable Tooltip',
		        name: 'useroptionDisableTooltip',
		        id: 'useroptionDisableTooltip',
		        allowBlank: true,
	          	listeners: {
		    		check: function() {
		    			activateButtonSaveUserOptions();
		    		}
		    	}
			}]
		}],
		buttons: [{
			id: 'saveuseroptionbutton',
	    	text: 'Save',
	    	hidden: true,
	    	handler: function(button, event) {
    	   		saveUserOptions(button, event);
    		}
    	}]
});*/


/**
 * saves the configured user options from myPlace
 * @param {Object} but
 * @param {Object} ev
 
function saveUserOptions (but, ev) {

	// user options
	// ============
	field = Ext.getCmp('useroptionLanguage');
	userOptionSaveStore.setBaseParam('language', field.getValue()?'DE':'EN');
	
	field = Ext.getCmp('useroptionNumberFormat');
	userOptionSaveStore.setBaseParam('numberFormat', field.getValue()?'DE':'US');

	field = Ext.getCmp('useroptionHelp');
	userOptionSaveStore.setBaseParam('help', field.getValue()?'YES':'NO');

	field = Ext.getCmp('useroptionSkipWizardMessage');
	field2 = Ext.getCmp('wizardcbskip');
	userOptionSaveStore.setBaseParam('skipWizard', field.getValue()||field2.getValue()?'YES':'NO');
	field.setValue(field.getValue()||field2.getValue());
	
	field = Ext.getCmp('useroptionDisableTooltip');
	userOptionSaveStore.setBaseParam('tooltip', field.getValue()?'YES':'NO');
	
	field = Ext.getCmp('useroptionCurrency');
	if (-1 === field.store.findExact('text', field.getValue())) {
		// message
	}
	else {
		userOptionSaveStore.setBaseParam('currency', field.store.getAt(field.store.findExact('text', field.getValue())).data.id);
	}


	userOptionSaveStore.load();
}*/
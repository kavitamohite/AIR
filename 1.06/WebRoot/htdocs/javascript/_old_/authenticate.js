Ext.onReady(function () {
	if(Ext.isIE) {
		Ext.Msg.show({
			title: 'Microsoft Internet Explorer',
			msg: 'Microsoft Internet Explorer is not supported by AIR. Please use Mozilla Firefox.<br/>Microsoft Internet Explorer wird von AIR nicht unterst&uuml;zt. Bitte benutzen Sie Mozilla Firefox.',
//			msg: '',
			buttons: Ext.Msg.OK
		});
		return;
	}
//		
//		
//		var continueFFCallback = function() {
//			
//		};
//		
//		var continueIECallback = function() {
//			startAir();
//		};
//
//		var callbackMap = {
//			'continueFF': continueFFCallback,
//			'continueIE': continueIECallback
//		};
//		
//		var ffOrIeWindow = createDynamicMessageWindow('FF_OR_IE', callbackMap);
//		ffOrIeWindow.show();
//	} else {
//		startAir();
//	}
	
	startAir();
});

function startAir() {
	var recipient_admin = 'itsecuritycenter@bayerbbs.com';
	var sharelib = 'lib/';
	
	Ext.QuickTips.init();
	
    //ExtJS internal settings
    Ext.BLANK_IMAGE_URL = sharelib + 'extjs/resources/images/default/s.gif';
    Ext.SSL_SECURE_URL = sharelib + 'extjs/resources/images/default/s.gif';
    
    var login = new Ext.FormPanel({ 
        labelWidth: 105,
        url: '../loginAction.jsp', 
        frame: true, 
        title: app_shortname + ' Login - ' + app_version, 
        defaultType: 'textfield',
		monitorValid: true,
		
		id: 'pLogin',
		
        items: [{
        	id: 'tfCwid',
            fieldLabel: 'CWID',
            name: 'cwid', 
            enableKeyEvents: true,
            
            listeners: {
                specialkey: function (field, el) {
                    if (el.getKey() === Ext.EventObject.ENTER && login.items.items[0].isValid()) {
                        Ext.getCmp('loginButton').fireEvent('click');
                    }
                }
            }
        }, { 
            fieldLabel: 'Intranet Password',
            id: 'tfPassword',
            name: 'password', 
            inputType: 'password', 
            allowBlank: true,
            enableKeyEvents: true,
            
            listeners: {
                specialkey: function (field, el) {
                    if (el.getKey() === Ext.EventObject.ENTER && login.items.items[0].isValid()) {
                        Ext.getCmp('loginButton').fireEvent('click');
                    }
                }
            }
        }],
        buttons: [{ 
            text: 'Login',
            formBind: true,	
            id: 'loginButton',

            listeners: {
                click: function () { 
                	login.getForm().submit({ 
		                method: 'POST', 
		                waitTitle: 'Connecting', 
		                waitMsg: 'Sending data...',
		                
                        success: function (form, action) { 
                        	var el = Ext.get('loginMask');
//                            el.fadeOut({
//                                endOpacity: 0.1, 
//                                easing: 'easeIn',
//                                duration: 0.25
//                            });
                            
                            obj = Ext.util.JSON.decode(action.response.responseText);
                            
//                                var password = form.findField('tfPassword').getValue();//form.getComponent('tfPassword').getValue();//form.items.items[1].getValue();
//                                var airTaskManager = new AIR.AirTaskManager();
//                                airTaskManager.startDbSessionCheckTask(obj.cwid, obj.token, password);
                            
                            window.location = "index.html?token=" + obj.token + '&cwid=' + obj.cwid;
		                },
		                failure: function (form, action) { 
		                    if (action.failureType === 'server') { 
                                obj = Ext.util.JSON.decode(action.response.responseText);
                                
                                Ext.Msg.alert('Login ' + obj.errors.title + '!', obj.errors.reason + '<br\> If you need support contact the <a href="mailto:' + 
		                   							recipient_admin + '?subject=' + app_name + ' - User ' + obj.errors.cwid + ' has problems!">' +
		                   							app_name + ' administrator</a>.', function (btn, text) {
									if (btn === 'ok' || btn === 'cancel') {
                                    	var el = Ext.get('loginMask');
//                                        el.fadeOut({
//                                            endOpacity: 0.1, 
//                                            easing: 'easeIn',
//                                            duration: 0.25
//                                        });
//        		 	            	   	window.location = window.location;
                                    }
                                });
		                    } else { 
		                    	Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
		                    }
		                    login.getForm().reset(); 
		                } 
                    }); 
                }
            } 
        }]
    });
 
    
    var win = new Ext.Window({
	    layout: 'fit',
	    id: 'loginMask',
	    width: 300,
	    height: 235,
	    closable: false,
	    resizable: false,
	    plain: true,
	    border: false,
	    items: [login],
        bbar: {
        	height: 80,
        	items: [{
                xtype: 'container',
                contentEl: 'pwtext',
                style: {display: 'block', clear: 'both'}
            }]
        }
	});
    win.show();
    
    var tfCwid = win.getComponent('pLogin').getComponent('tfCwid');
    tfCwid.focus(true, 500);
}
Ext.namespace('AIR');

AIR.AirBootstrap = Ext.extend(Object, {
	run: function() {
		if(Ext.isIE) {
			var winW = 630, winH = 460;
			if (document.body && document.body.offsetWidth) {
			 winW = document.body.offsetWidth;
			 winH = document.body.offsetHeight;
			}
			if (document.compatMode=='CSS1Compat' &&
			    document.documentElement &&
			    document.documentElement.offsetWidth ) {
			 winW = document.documentElement.offsetWidth;
			 winH = document.documentElement.offsetHeight;
			}
			if (window.innerWidth && window.innerHeight) {
			 winW = window.innerWidth;
			 winH = window.innerHeight;
			}
			if (winW<360) {
				winW = 360;
			}
		}
		
		this.init();
		AIR.AirApplicationManager.processLogin(this.initAir.createDelegate(this), this.initLogin.createDelegate(this));
	
	},
	
	initLogin: function() {
		this.airLoginWindow = new AIR.AirLoginWindow();
		this.airLoginWindow.on('login', this.onLogin, this);
		this.airLoginWindow.show();	
	},
	
	init: function() {
		Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		
		Ext.QuickTips.init();
		Ext.apply(Ext.QuickTips.getQuickTip(), {
			maxWidth: 200,
			minWidth: 100,
			showDelay: 2000,
			trackMouse: true
		});
		
		
	    Ext.BLANK_IMAGE_URL = 'javascript/lib/extjs/resources/images/default/s.gif';
	    Ext.SSL_SECURE_URL = 'javascript/lib/extjs/resources/images/default/s.gif';
	    
		Ext.form.Field.prototype.msgTarget = 'side';
		Ext.isSecure = true;
		Ext.Ajax.timeout = 3000000;
		
		
		//disable F5,F6
		if(Ext.isIE) {
			document.attachEvent('onkeydown', AIR.AirApplicationManager.disableInvalidKeys, true);//onkeydown onkeypress
			document.attachEvent('onunload', AIR.AirApplicationManager.disableInvalidKeys, true);
		} else {
			document.addEventListener('keypress', AIR.AirApplicationManager.disableInvalidKeys, true);
			document.addEventListener('unload', AIR.AirApplicationManager.disableInvalidKeys, true);
		}
	},
	
	onLogin: function(cwid, password) {
        var params = {
    		cwid: cwid,
            password: password
        };
    	
        Ext.Ajax.request({
            url: 'jsp/loginAction.jsp',
            params: params,
            success: this.onLoginSuccessful.createDelegate(this),
            failure: this.airLoginWindow.onLoginFailure.createDelegate(this)
        });
	},
	
	onLoginSuccessful: function(response, options) {
        var responseData = Ext.util.JSON.decode(response.responseText);
        
        if(responseData.success) {
			var tokenCheckUrl = 'jsp/checkTokenAction.jsp';
			
	        var params = {
	    		cwid: responseData.cwid,
	    		token: responseData.token
	        };
			
			Ext.Ajax.request({
		        url: tokenCheckUrl,
		        params: params,
		        success: this.onTokenCheckSuccessful.createDelegate(this),
		        failure: this.airLoginWindow.onLoginFailure.createDelegate(this)
		    });
        } else {
        	this.airLoginWindow.onLoginFailure(response, options);//handled server error
        }
	},
	
	onTokenCheckSuccessful: function(response, options) {
        var loginData = Ext.util.JSON.decode(response.responseText);
        
        if(loginData.success) {
        	this.createCookie(loginData);
        	this.initAir(loginData);
        } else {
        	this.airLoginWindow.onLoginFailure(response, options);//handled server error
        }
	},
	
	createCookie: function(loginData) {
		var cookieData = {
			cwid: loginData.cwid,
			token: loginData.token,
			username: loginData.username,
			lastlogon: loginData.lastlogon
		};
		
		if(AAM.isAnwendungsEinsprung()) {
			var einsprungData = AAM.getEinsprungData();
			
			cookieData.tableId = einsprungData.tableId;
			cookieData.ciId = einsprungData.ciId;
			cookieData.navigation = einsprungData.navigation;
		}
		
		AAM.updateCookie(cookieData);
	},
	
	initAir: function(loginData) {
    	AIR.AirApplicationManager.init(loginData);
    	AIR.AirPickerManager.init();
    	
    	var storeIds = AIR.AirApplicationManager.getStoreIds();
    	var storeCount = AIR.AirApplicationManager.getStoreCount();
    	
        var storeLoader = new AIR.AirStoreLoader();
        storeLoader.on('storesLoaded', this.onStoresLoaded, this);

        if(this.airLoginWindow) {
	        this.airLoginWindow.setStoreCount(storeCount);
	        storeLoader.on('storeLoaded', this.airLoginWindow.onStoreLoaded, this.airLoginWindow);
        }
        
        storeLoader.init(storeIds, storeCount);
        storeLoader.load();
	},
	
	updateTheme: function() {
		Ext.util.CSS.removeStyleSheet('standardTheme');
		Ext.util.CSS.swapStyleSheet('extAllNotheme', 'lib/extjs/resources/css/ext-all-notheme.css');
		Ext.util.CSS.swapStyleSheet('appRepTheme', 'lib/extjs/resources/css/appreptheme.css');
	},
	
    onStoresLoaded: function(storeLoader, storeMap) {        
        AIR.AirStoreManager.setStores(storeMap);
        storeLoader.destroy();
		
        this.checkItsecUserOptions(this.launchAir.createDelegate(this));
    },
    
    launchAir: function() {
    	AIR.AirApplicationManager.setLanguage();
        AIR.AirAclManager.init();
                
        var task = new Ext.util.DelayedTask(function() {
        	if(this.airLoginWindow)
        		this.airLoginWindow.close();
        	
	    		var startMask = AAM.getMask(AC.MASK_TYPE_START);
	    		startMask.show();
        }.createDelegate(this));
        task.delay(0);
	    
        task = new Ext.util.DelayedTask(this.openUi.createDelegate(this));
        task.delay(0);
    },
    
    
    checkItsecUserOptions: function(callback) {
    	var itsecUserOptionListStore = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
    	
    	if(itsecUserOptionListStore.getCount() == 0) {
    		var loadCallback = function() {
	    		var params = {
	    			cwid: AIR.AirApplicationManager.getCwid()
	    		};
	    		
	    		itsecUserOptionListStore.load({
	    			params: params,
	    			callback: callback
	    		});
    		}.createDelegate(this);
    		
    		this.createDefaultItsecUserOptions(loadCallback);
    	} else {
    		callback();
    	}
    },
    
    createDefaultItsecUserOptions: function(loadCallback) {
    	var params = {
			cwid: AIR.AirApplicationManager.getCwid(),
			token: AIR.AirApplicationManager.getToken(),
			save: false 
		};
		
		var userOptionSaveStore = AIR.AirStoreFactory.createUserOptionSaveStore();
		userOptionSaveStore.load({
			params: params,
			callback: loadCallback
		});
    },
	
	openUi: function() {
		
		this.airMainPanel = new AIR.AirMainPanel();
		AIR.AirApplicationManager.afterInit(this.airMainPanel);

		//move to AirApplicationManager::afterInit ?	ciCreateWizardView
		var lastRenderedView = this.airMainPanel.getCenterView().getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardView').getComponent('ciCreateWizardP2').getComponent('ciCreateAppRequiredView').getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('labeltaGPSCOwningBusinessGroup');//this.airMainPanel.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('CiCopyFromView');//this.airMainPanel.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciDeleteView');////this.airMainPanel.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView').getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciResponsible');//this.airMainPanel.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('CiDeleteView');//this.airMainPanel.getComponent('ciCenterView').getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView').getComponent('ciCreateWizardPage3').getComponent('wizardCiowner').getComponent('tbWizardciResponsible');
		lastRenderedView.on('afterrender', this.onAirRendered , this);//render
		
		var viewPort = new AIR.AirViewport(this.airMainPanel);
	
		var delayedTask = new Ext.util.DelayedTask(function() {
			var airTaskManager = new AIR.AirTaskManager();
			airTaskManager.startDbSessionCheckTask(AIR.AirApplicationManager.getCwid(), AIR.AirApplicationManager.getToken());//orig: keine params
		});
		delayedTask.delay(0);
	},
	
	onTokenCheckFailure: function(response, options) {
		AAM.logout();
	},
	
	onBeforeAirRendered: function(ct) {
		if(window.console)
			window.console.log('onBeforeAirRendered');
		
	},
	
	onAirRendered: function(lastRenderedView) {//airMainPanel
		AAM.restoreUiState(this.airMainPanel);//schon hier, da nötig für CiEditView.updateLabels() wegen tableId
		
		this.airMainPanel.update();
		this.airMainPanel.updateLabels(AAM.getLabels());
		//performance Verbesserung: erst rendern wenn user zum ersten Mal über einem Label anhält, anstatt alles nach App Start.
		this.airMainPanel.updateToolTips(AAM.getToolTips());
		
		var delayedTask = new Ext.util.DelayedTask(function() {
			var startMask = AAM.getMask(AC.MASK_TYPE_START);
			startMask.hide();
		});
		delayedTask.delay(0);
		AAM.restoreUi(this.airMainPanel);
	}
});
Ext.reg('AIR.AirBootstrap', AIR.AirBootstrap);
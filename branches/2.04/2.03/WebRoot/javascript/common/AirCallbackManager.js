Ext.namespace('AIR');

AIR.AirCallbackManager = Ext.extend(Ext.util.Observable, {
	
	init: function(rootView) {
		this.rootView = rootView;
	},

	getSpecificNavigationCallback: function(viewId) {
		var externalNavigationCallback;
		var callbackOwner;
	
		switch(viewId) {
			case 'clSearch':
			case 'clAdvancedSearch':
			case 'clOuSearch':
				var callbackOwner = this.rootView.getComponent('ciCenterView').getComponent('ciSearchView');
				externalNavigationCallback = callbackOwner.onTabChange;
				break;
			default: break;
		}
		
		return externalNavigationCallback ? externalNavigationCallback.createDelegate(callbackOwner) : externalNavigationCallback;
	},
	
	getSpecificNavigationOptions: function(viewId, options) {
		switch(viewId) {
			case 'clCiDetails':
			case 'clCiSpecifics':
			case 'clCiContacts':
			case 'clCiAgreements':
			case 'clCiProtection':
			case 'clCiCompliance':
			case 'clCiLicense':
			case 'clCiSpecialAttributes':
			case 'clCiConnections':
			case 'clCiSupportStuff':
			case 'clCiHistory':
				if(options) {
					options.skipReload = true;
				} else {
					options = { skipReload: true };
				}
				break;
			default: break;
		}
		
		return options;
	}

});
Ext.reg('AIR.AirCallbackManager', AIR.AirCallbackManager);
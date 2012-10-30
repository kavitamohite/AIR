Ext.namespace('AIR');

AIR.AirHistoryManager = Ext.extend(Ext.util.Observable, {
	
	init: function(navigationView, ciTitleView) {
    	Ext.History.init();
    	Ext.History.on('change', this.onBackForwardClick, this);
    	
    	if(Ext.isIE) {//Ext.isIE
    		this.ciTitleView = ciTitleView;
    		this.ciTitleView.getComponent('pCiTitleViewNorth').getComponent('clBack').on('click', this.onBack, this);
    		this.ciTitleView.getComponent('pCiTitleViewNorth').getComponent('clForward').on('click', this.onForward, this);
    		
			this.history = [];//[] 'clSearch'
			this.historyIndex = -1;//0 1
    	}
    	
		this.addEvents('externalNavigation');
		this.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
	},
	
	afterInit: function() {
//		if(Ext.isIE) //Ext.isIE
			this.fireEvent('externalNavigation', this, null, 'clSearch');
	},
	
	add: function(link) {
		if(Ext.isIE) {//Ext.isIE
			/*if(this.historyIndex < this.history.length - 2) {//-1
//				var howMany = this.history.length - 2 - this.historyIndex;
//				this.history.splice(this.historyIndex, hoxMany);//length - 1 - index
				
				var temp = [];
				var start = 0;
				var end = this.history.length + 1 - (this.history.length - this.historyIndex);
				
				for(var i = start; i < end; i++) {
					temp.push(this.history[i]);
//					delete this.history[i];
				}
				
				delete this.history;
				this.history = temp;
				this.historyIndex = this.history.length - 1;//this.history.length - 1 | length - 1
			}*/
			
			this.history.push(link);//link link.getId()
			this.historyIndex++;
			
//			Util.log('AirHistoryManager::add link='+link.getId()+' history.length='+this.history.length+' historyIndex='+this.historyIndex);
			
			this.ciTitleView.onHistoryChange(this.history, link.getId(), this.historyIndex);//this.historyIndex
		} else {
			this.skip = true;
			Ext.History.add(link.getId());
		}
	},
	
	onBack: function(link, event) {
		this.historyIndex--;
		
//		var link = this.history[this.historyIndex];
//		var index = this.historyIndex;
		
		this.ciTitleView.onHistoryChange(this.history, this.history[this.historyIndex], this.historyIndex);
		this.delegateNavigation();

//		var options = { skipHistory: true, forceNavigation: true, skipReload: true };
//		this.fireEvent('externalNavigation', this, null, this.history[this.historyIndex].getId(), options);//this.historyIndex
	},
	
	onForward: function(link, event) {
		this.historyIndex++;
		
//		var link = this.history[this.historyIndex];
//		var index = this.historyIndex;
		
		this.ciTitleView.onHistoryChange(this.history, this.history[this.historyIndex], this.historyIndex);
		if(this.history[this.historyIndex]) {
			this.delegateNavigation();
			
//			var options = { skipHistory: true, forceNavigation: true, skipReload: true };
//			this.fireEvent('externalNavigation', this, null, this.history[this.historyIndex].getId(), options);
		} else this.historyIndex--;
	},
	
	/**
	 * Problematik: wie unterscheiden, ob es sich um einen Klick auf einen Navigationsmenupunkt oder einen back/forward
	 * Browserbutton Klick handelt. Diese Funktion soll nur aufgerufen werden, wenn letzteres passiert. Da dieser 
	 * Ext.History.add change event handler aber immer aufgerufen wird, sobald ein History Eintrag hinzugefügt wurde,
	 * ausgelöst durch CiNavigationView.onMenuSelect, wird er zwangsläufig in beiden Fällen aufgerufen.
	 * Es muss dafür gesorgt werden, dass wenn ein einfacher Klick auf einen Navigationsmenupunkt keinen delegateNavigation
	 * Aufruf durch den onBackForwardClick Ext.History change event handler auslöst.
	 * Dies erfolgt am besten in CiNavigationView wenn bei einem onMenuSelect Aufruf zur vor KEIN onExternalNavigation
	 * Aufruf stattgefunden hat, weil bei onMenuSelect keine weitere/gesonderte Navigationsereignisbehandlung durch 
	 * AirHistoryManager erforderlich ist.
	 */
	onBackForwardClick: function(token) {
		if(this.skip && !Ext.isIE) {
			this.skip = false;
			return;
		}
		
		if(!Ext.isIE && token !== 'null') {
			this.delegateNavigation(token);
			
//			var options = { skipReload: true };
//			this.fireEvent('externalNavigation', this, null, token, options);
		}
	},
	
	delegateNavigation: function(token) {
		var viewId = token ? token : this.history[this.historyIndex].getId();
		
		var cbm = AAM.getCallbackManager();
		var options = cbm.getSpecificNavigationOptions(viewId);
		var specificCallback = cbm.getSpecificNavigationCallback(viewId);
		
		if(options) {
			options.skipHistory = true;
			options.forceNavigation = true;
		} else {
			options = { skipHistory: true, forceNavigation: true };
		}
		
		
		if(specificCallback) {
			options.viewId = viewId;
			specificCallback(null, null, options);
		} else {
			this.fireEvent('externalNavigation', this, null, viewId, options);
		}
	}

});
Ext.reg('AIR.AirHistoryManager', AIR.AirHistoryManager);
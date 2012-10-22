Ext.namespace('AIR');

AIR.AirHistoryManager = Ext.extend(Ext.util.Observable, {
	
	init: function(navigationView, ciTitleView) {
    	Ext.History.init();
    	Ext.History.on('change', this.onBackForwardClick, this);
    	
    	if(true) {//Ext.isIE
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
		if(Ext.isIE) //Ext.isIE
			this.fireEvent('externalNavigation', this, null, 'clSearch');
	},
	
	add: function(link) {
		if(Ext.isIE) {//Ext.isIE
			if(this.historyIndex < this.history.length - 2) {//-1
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
			}
			
			this.history.push(link);//link link.getId()
			this.historyIndex++;
			
			this.ciTitleView.onHistoryChange(this.history, link.getId(), this.historyIndex);//this.historyIndex
		} else {
			Ext.History.add(link.getId());
		}
	},
	
	onBack: function(link, event) {
		this.historyIndex--;
		
		var link = this.history[this.historyIndex];
		var index = this.historyIndex;
		
		this.ciTitleView.onHistoryChange(this.history, this.history[this.historyIndex], this.historyIndex);

		var options = { skipHistory: true, forceNavigation: true, skipReload: true };
		this.fireEvent('externalNavigation', this, null, this.history[this.historyIndex].getId(), options);//this.historyIndex
	},
	
	onForward: function(link, event) {
		this.historyIndex++;
		
		var link = this.history[this.historyIndex];
		var index = this.historyIndex;
		
		this.ciTitleView.onHistoryChange(this.history, this.history[this.historyIndex], this.historyIndex);
		if(this.history[this.historyIndex]) {
			var options = { skipHistory: true, forceNavigation: true, skipReload: true };
			this.fireEvent('externalNavigation', this, null, this.history[this.historyIndex].getId(), options);
		}
	},
	
	
	onBackForwardClick: function(token) {
		if(!Ext.isIE && token !== 'null') {
			var options = { skipReload: true };
			this.fireEvent('externalNavigation', this, null, token, options);
		}
	}

});
Ext.reg('AIR.AirHistoryManager', AIR.AirHistoryManager);
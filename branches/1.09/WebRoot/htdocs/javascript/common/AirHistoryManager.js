Ext.namespace('AIR');

AIR.AirHistoryManager = Ext.extend(Ext.util.Observable, {
	
	init: function(navigationView, ciTitleView) {
    	Ext.History.init();
    	Ext.History.on('change', this.onBackForwardClick, this);
    	
    	if(Ext.isIE) {
    		this.ciTitleView = ciTitleView;
    		this.ciTitleView.getComponent('pCiTitleViewNorth').getComponent('clBack').on('click', this.onBack, this);
    		this.ciTitleView.getComponent('pCiTitleViewNorth').getComponent('clForward').on('click', this.onForward, this);
    		
			this.history = [];//[] 'clSearch'
			this.historyIndex = 1;//0 1
    	}
    	
		this.addEvents('externalNavigation');
		this.on('externalNavigation', navigationView.onExternalNavigation, navigationView);
	},
	
	afterInit: function() {
//		this.fireEvent('externalNavigation', this, null, 'clSearch');
	},
	
	add: function(link) {
		if(Ext.isIE) {
			if(this.historyIndex < this.history.length - 1) {
				var index = this.historyIndex;
				var length = this.history.length;
				
				this.history.splice(index, length - 1 - index);
				length = this.history.length;
				this.historyIndex = length - 1;//this.history.length - 1;
			}
			
			this.history.push(link);//link link.getId()
			length = this.history.length;
			this.historyIndex++;
			
			this.ciTitleView.onHistoryChange(this.history, link.getId(), this.historyIndex);
		} else {
			Ext.History.add(link.getId());
		}
	},
	
	onBack: function(link, event) {
		this.historyIndex--;
		this.ciTitleView.onHistoryChange(this.history, this.history[this.historyIndex], this.historyIndex);
//		link.fireEvent('click', this.history[this.historyIndex]);
		var options = { skipHistory: true };
		this.fireEvent('externalNavigation', this, null, this.history[this.historyIndex].getId(), options);
	},
	
	onForward: function(link, event) {
		this.historyIndex++;
		
		this.ciTitleView.onHistoryChange(this.history, this.history[this.historyIndex], this.historyIndex);
		if(this.history[this.historyIndex]) {
			var options = { skipHistory: true };
			this.fireEvent('externalNavigation', this, null, this.history[this.historyIndex].getId(), options);
		}
	},
	
	
	onBackForwardClick: function(token) {
		if(!Ext.isIE && token !== 'null')
			this.fireEvent('externalNavigation', this, null, token);
	}

});
Ext.reg('AIR.AirHistoryManager', AIR.AirHistoryManager);
Ext.namespace('AIR');

AIR.CiResultView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {

	        items: [/*{
	        	xtype: 'button',
	        	id: 'bUpdateCiSearchResultTable',
	        	
	        	text: 'Update'
	        },*/{
	        	xtype: 'tabpanel',
	        	id: 'tpCiSearchResultTables',

				enableTabScroll: true,
				resizeTabs: true,
				
	            plain: true,
	            defaults: { autoScroll: true },
	            hidden: true
	        }]
		});
		
		AIR.CiResultView.superclass.initComponent.call(this);
		this.ciResultGridParamSets = {};
		
//		this.addEvents('tabclose');
	},
	
	search: function(params, searchType) {
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		var tabCount = tpCiSearchResultTables.items.items.length;
		
		var ciResultGridId = searchType + '_' + tabCount;
		
		var ciResultGrid = new AIR.CiResultGrid({
	    	id: ciResultGridId,
	    	layout: 'fit',
	    	border: false,
	    	closable: true
//	    	loadMask: new Ext.LoadMask(tpCiSearchResultTables.getEl(), { msg: 'Loading...' })
		});
		this.ciResultGridParamSets[ciResultGridId] = params;
		ciResultGrid.on('close', this.onTabClose, this);

		
		tpCiSearchResultTables.setVisible(true);
		tpCiSearchResultTables.add(ciResultGrid);
		tpCiSearchResultTables.getItem(ciResultGridId).setTitle(ciResultGridId);
		tpCiSearchResultTables.setActiveTab(ciResultGridId);
		
		ciResultGrid.getStore().load({
	    	params: params
	    });
	    
		delete params.start;
		delete params.limit;
		ciResultGrid.setPagingParams(params);
	},
	
	onTabClose: function(tab) {
		tab.getStore().removeAll();
		delete this.ciResultGridParamSets[tab.getId()];
		
		var tpCiSearchResultTables = this.getComponent('tpCiSearchResultTables');
		var tabCount = tpCiSearchResultTables.items.items.length;
		
		if(tabCount === 1)//0, 1 weil tab erst nach dem event zerstört wird
			tpCiSearchResultTables.setVisible(false);
	},
	
	getSearchParams: function(tabId) {
		if(!tabId) {
			var tab = this.getComponent('tpCiSearchResultTables').getActiveTab();
			if(tab)
				tabId = tab.getId();			
		}
		
		var params = tabId ? this.ciResultGridParamSets[tabId] : null;
		
		return params;
	}
});
Ext.reg('AIR.CiResultView', AIR.CiResultView);
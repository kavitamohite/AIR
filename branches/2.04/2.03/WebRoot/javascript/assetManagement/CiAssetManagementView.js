Ext.namespace('AIR');

AIR.CiAssetManagementView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    border: false,
		    autoScroll: true,
		    padding: 20,
		    bodyStyle: {
		    	backgroundColor: AC.AIR_BG_COLOR,
		    	color: AC.AIR_FONT_COLOR,
		    	fontFamily: AC.AIR_FONT_TYPE
		    },
		    items: [{
		    	xtype: 'label',
		    	id: 'assetsearchpanelheader',
				style: {
					textAlign: 'left',
					backgroundColor: AC.AIR_BG_COLOR,
					color: AC.AIR_FONT_COLOR,
					fontFamily: AC.AIR_FONT_TYPE,
					fontWeight: 'bold',
					fontSize: '12pt'
				}
			}, { 
				xtype: 'container',	  
				html: '<hr>',
				cls: 'x-plain',
				style: {
					color: '#d0d0d0',
					backgroundColor: '#d0d0d0',
					height: '1px',
					marginTop: 25,
					marginBottom: 20
				}
			},{
				xtype: 'panel',
				id: 'ciAssetSearchViewPages',
			    layout: 'card',
			    activeItem: 0,
			    border: false,
			    items: [{
					xtype: 'AIR.CiAssetManageSearchView',
					id: 'ciAssetManageSearchView'
				}]
			}, {
		    	xtype: 'AIR.CiAssetResultView',
		    	id: 'ciAssetSearchResultView',
		    	border: false
			}]
		});
		
		AIR.CiAssetManagementView.superclass.initComponent.call(this);
		
		this.addEvents('ciSelect', 'beforeCiSelect', 'externalNavigation');
		
		var assetSearch = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch');
		assetSearch.getComponent('clAssetSearch').on('click', this.onSearch, this);
		assetSearch.getComponent('tfAssetSearch').on('specialkey', this.onSearchEnter, this);
		assetSearch.getComponent('bAssetSearchReset').on('click', this.onReset, this);

		var ciSearchResultView = this.getComponent('ciAssetSearchResultView');
		ciSearchResultView.getComponent('tpCiAssetSearchResultTables').on('tabchange', this.onTabChange, this);
		
		ciSearchResultView.getComponent('pAssetSearchResultOptions').getComponent('bAssetSelectDeselectAll').on('click', this.selectDeselectAll, this);
		
		this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult').on('click', this.onUpdateCiSearchResult, this);
	},
	
	selectDeselectAll: function(button, event){
		var ciResultGrid = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab();
		var selModel = ciResultGrid.getSelectionModel();
		if(selModel.getCount() > 0){
			selModel.clearSelections();			
		}else{
			selModel.selectAll();
		}
	},

	onSearchEnter: function(field, e) {
        if(e.getKey() == e.ENTER) {
	    	var clSearch = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('clAssetSearch');
	    	clAssetSearch.fireEvent('click', clSearch);
	    }
	},
	
	onSearch: function() {
		var params = this.getSearchParams();

	    var searchAction =  AC.SEARCH_TYPE_SEARCH;//searchType
	    params.searchAction = searchAction;//searchType
	    
	    this.processSearch(params);
	},
	
	getBaseSearchParams: function() {
	    var params = { 
    		start: 0,
    		limit: 20,
    		
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
			searchAction: 'search'
    	};
	    
	    return params;
	},
	getSearchParams: function() {
		searchAction = 'search';
		this.getComponent('ciAssetSearchViewPages').doLayout();
		var field = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('tfAssetSearch');
		var searchString = field.getRawValue().trim();
	    if (searchString != field.getRawValue())
	    	field.setValue(searchString);

	    while(searchString.indexOf('*') > -1)
	    	searchString = searchString.replace('*', '%');
	    
	    while(searchString.indexOf('?') > -1)
	    	searchString = searchString.replace('?', '_');
	    
	    var i = searchString.indexOf('\'');
	    if(i > -1) {
	    	var hasSecondApos = searchString.charAt(i + 1) === '\'';
	    	if(!hasSecondApos)
	    		searchString = searchString.replace('\'', '\'\'');
	    }
	    
	    var rbgQueryMode = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('rbgQueryMode');
		var rbQueryMode = rbgQueryMode.getValue();
		var queryMode = rbQueryMode.inputValue;
	
	    var params = this.getBaseSearchParams();
				       
	    var store = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');

	    params.showDeleted = 'N';
	    if (this.isShowDeleted()) {
		    params.showDeleted = 'Y';
		}
	    
	    params.query = searchString;
	    params.queryMode = queryMode;
	    params.isAdvSearch = 'false';
		
		return params;
	},
		
	handleSearch: function(link) {
		
		var ciSearchResultView = this.getComponent('ciAssetSearchResultView');
		var params = ciSearchResultView.getSearchParams();
		
		if(params)
			this.setUpdateSearchAvailable(link, this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult'));

		var ciSearchViewPages = this.getComponent('ciAssetSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciAssetManageSearchView');
		
		ciSearchViewPages.getLayout().setActiveItem(0);
		ciStandardSearchView.setHeight(100);//60
		ciSearchViewPages.setHeight(100);//60
		ciSearchViewPages.doLayout();
		
		
		var rbgQueryMode = ciAssetSearchView.getComponent('pAssetSearch').getComponent('rbgQueryMode');
		rbgQueryMode.setValue(AC.SEARCH_MODE_CONTAINS);//searchQueryModeContains (#8)
		rbgQueryMode.setVisible(false);
		
	},
	setUpdateSearchAvailable: function(link, button) {
		var tabSearchType = this.getComponent('ciSearchAssetResultView').getCurrentSearchType().replace(' ', '');//z.B. Advanced Search --> AdvancedSearch //oder über params.searchType?
		var navigationSearchType = link.getId().substring(2, link.getId().length);
		
		var isUpdateSearchAvailable = tabSearchType.indexOf(navigationSearchType) === 0;

		if(isUpdateSearchAvailable) {
			button.show();
		} else {
			button.hide();
		}
	},
	processSearch: function(params, isUpdate) {
		if(Ext.isIE && !this.isMoved) {
			this.isMoved = true; 
		}
		this.getComponent('ciAssetSearchResultView').search(params, isUpdate);
	},
	onTabChange: function(tabPanel, tab, options) {
		if(tabPanel) {
			var bUpdateCiSearchResult = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult');

			
			if(tabPanel.items.items.length > 0) {
				bUpdateCiSearchResult.setVisible(true);
			} else {
				bUpdateCiSearchResult.setVisible(false);
			}
		}
		
		
		if(!tab) {
			tab = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab();
			if(!tab) {
				if(options)
					this.fireEvent('externalNavigation', this, tab, options.viewId, options);
				return;
			}
		}
		
		var searchType = tab.getId().substring(0, tab.getId().indexOf('_'));
		var params = this.getComponent('ciAssetSearchResultView').getSearchParams(tab.getId());
		var viewId;
		
		switch(searchType) {
			case AC.SEARCH_TYPE_SEARCH:
				viewId = 'clSearch';
				break;
			case AC.SEARCH_TYPE_ADV_SEARCH:
				viewId = 'clAdvancedSearch';
				break;
			case AC.SEARCH_TYPE_OU_SEARCH:
				viewId = 'clOuSearch';
				break;
			default:
				break;
		};
		
		if(options) {
			options.forceNavigation = true;
			options.skipHistory = true;
		} else {
			options = { forceNavigation: true, skipHistory: true };
		}
		
		this.updateParams(params, searchType);
		if(options.viewId && options.viewId !== viewId)//wenn durch MenuLinkklick und Adv. Seach Tab Klick versch. navMenuLink IDs in den options stehen, gleichsetzen. Nötig/sinnvoll ?
			viewId = options.viewId;
		
		this.fireEvent('externalNavigation', this, tab, viewId, options);
	},
	
	updateParams: function(params, searchAction) {
		var ciStandardSearchView = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView');
		
		switch(searchAction) {
			case AC.SEARCH_TYPE_SEARCH:
				
				var tfSearch = ciStandardSearchView.getComponent('pAssetSearch').getComponent('tfAssetSearch');
				tfSearch.setValue(params.ciNameAliasQuery);//query
				
				break;

			default:
				break;
		};
	},
	onUpdateCiSearchResult: function(button, event) {
		var params = this.getComponent('ciAssetSearchResultView').getSearchParams();
		
		var searchAction = params.searchAction;
		
		switch(searchAction) {
			case AC.SEARCH_TYPE_ADV_SEARCH://!!
			case AC.SEARCH_TYPE_SEARCH:
				params = this.getSearchParams();
				
				if(searchAction === AC.SEARCH_TYPE_SEARCH)
					break;
				break;
		};
		
		params.searchAction = searchAction;
		this.processSearch(params, true);
	},
	onReset: function(button, event) {
		var ciStandardSearchView = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView');
		
		ciStandardSearchView.reset();
	},
	updateLabels: function(labels) {
		this.getComponent('assetsearchpanelheader').setText(labels.searchpanelheader);
		
		var ciSearchViewPages = this.getComponent('ciAssetSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciAssetManageSearchView');
		var ciStandardSearchView = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView');
		ciStandardSearchView.updateLabels(labels);
		var ciSearchResultView = this.getComponent('ciAssetSearchResultView');
		ciSearchResultView.updateLabels(labels);
	},
	updateToolTips: function(toolTips) {
		this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').updateToolTips(toolTips);
	},
	isShowDeleted: function() {
		var isShowDeleted = false;
		var store = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
	    var userOptionRecord = Util.getStoreRecord(store, 'itsecUserOptionName', 'AIR_SHOW_DELETED');

	    if (userOptionRecord && 'YES' == userOptionRecord.get('itsecUserOptionValue')) {
	    	isShowDeleted = true;
		}
	    return isShowDeleted;
	}
});
Ext.reg('AIR.CiAssetManagementView', AIR.CiAssetManagementView);
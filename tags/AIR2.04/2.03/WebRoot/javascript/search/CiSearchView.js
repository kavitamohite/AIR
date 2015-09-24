Ext.namespace('AIR');

AIR.CiSearchView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    border: false,
		    autoScroll: true,//hier ein muss

		    padding: 20,
		    
		    bodyStyle: {
		    	backgroundColor: AC.AIR_BG_COLOR,
		    	color: AC.AIR_FONT_COLOR,
		    	fontFamily: AC.AIR_FONT_TYPE
		    },
		    
		    items: [{
		    	xtype: 'label',
		    	id: 'searchpanelheader',
				
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
					height: '1px',//ohne: grauer Hintergrund und schwarze Strichfarbe
					
					marginTop: 25,
					marginBottom: 20
				}
			}, {
				xtype: 'panel',
				id: 'ciSearchViewPages',
				
			    layout: 'card',
			    activeItem: 0,
			    border: false,

			    items: [{
					xtype: 'AIR.CiStandardSearchView',
					id: 'ciStandardSearchView'
				},{
					xtype: 'AIR.CiOuSearchView',
					id: 'ciOuSearchView'
				}]
			}, {
		    	xtype: 'AIR.CiResultView',
		    	id: 'ciSearchResultView',
		    	border: false
		    	
		    }]
		});
		
		AIR.CiSearchView.superclass.initComponent.call(this);
		var callback =null;
		this.addEvents('ciSelect', 'beforeCiSelect', 'externalNavigation');

		var clSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('clSearch');
		clSearch.on('click', this.onSearch, this);

		var tfSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('tfSearch');
	    tfSearch.on('specialkey', this.onSearchEnter, this);
	
		var clOrgUnitAdd = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('clOrgUnitAdd');
		var clOrgUnitRemove = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('clOrgUnitRemove');
		clOrgUnitAdd.on('click', this.onOrgUnitAdd, this);
		clOrgUnitRemove.on('click', this.onOrgUnitRemove, this);
		
		var bOuSearch = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOuSearch').getComponent('bOuSearch');
		bOuSearch.on('click', this.onOuSearch, this);
		var bUpdateOuSearch = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOuSearch').getComponent('bUpdateOuSearch');
		bUpdateOuSearch.on('click', this.onUpdateCiSearchResult, this);
		
		
		var ciAdvancedSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView');
		ciAdvancedSearchView.on('expand', this.onAdvSearchExpand, this);
		ciAdvancedSearchView.on('collapse', this.onAdvSearchCollapse, this);
		
		var cbCiType = ciAdvancedSearchView.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType');
		cbCiType.on('select', this.onCat1Select, this);
		cbCiType.on('change', this.onCat1Change, this);
		
		var ciSearchResultView = this.getComponent('ciSearchResultView');
		ciSearchResultView.getComponent('tpCiSearchResultTables').on('tabchange', this.onTabChange, this);
		
		
		ciSearchResultView.getComponent('pSearchResultOptions').getComponent('bExpandAdvSearchParams').on('click', this.onExpandAdvSearchParams, this);
		ciSearchResultView.getComponent('pSearchResultOptions').getComponent('bSearchReset').on('click', this.onReset, this);
		ciSearchResultView.getComponent('pSearchResultOptions').getComponent('bSelectDeselectAll').on('click', this.selectDeselectAll, this);
		ciSearchResultView.getComponent('pSearchResultOptions').getComponent('bMassUpdate').on('click', this.startMassUpdate, this);
		
		this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('bUpdateCiSearchResult').on('click', this.onUpdateCiSearchResult, this);
	},
	
	selectDeselectAll: function(button, event){
		var ciResultGrid = this.getComponent('ciSearchResultView').getComponent('tpCiSearchResultTables').getActiveTab();
		var selModel = ciResultGrid.getSelectionModel();
		if(selModel.getCount() > 0){
			selModel.clearSelections();			
		}else{
			selModel.selectAll();
		}
	},
	
	startMassUpdate: function(button, event){
		var ciResultGrid = this.getComponent('ciSearchResultView').getComponent('tpCiSearchResultTables').getActiveTab();
		var cbmassUpdateType = this.getComponent('ciSearchResultView').getComponent('pcbmassUpdateType').getComponent('cbmassUpdateType');
		var massUpdateMode = cbmassUpdateType.getValue();
		var selModel = ciResultGrid.getSelectionModel();
		this.callback = function() {
			var bMassUpdate = this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('bMassUpdate');
			var bSelectDeselectAll = this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('bSelectDeselectAll');
			var tpCiSearchResultTables = this.getComponent('ciSearchResultView').getComponent('tpCiSearchResultTables');
			bMassUpdate.setDisabled(true);
			bSelectDeselectAll.setDisabled(true);
			tpCiSearchResultTables.getActiveTab().getSelectionModel().singleSelect=true;
			tpCiSearchResultTables.getActiveTab().getSelectionModel().clearSelections();
			this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('cbIsMultipleSelect').setValue(false);
			//this.fireEvent('externalNavigation', this, null, 'clSearch');
		}.createDelegate(this);
		var callbackMap = {
			ok: this.callback
		};
		var selectedElements = selModel.getCount();
		if(selectedElements === 0){
			var message='Select at least one element for mass update.';
/*			var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('WARNING_OK', callbackMap, message, 'Mass update');
			dynamicWindow.show()*/;
	        Ext.Msg.show({
	            title: 'Mass Update',
	            msg: 'Select at least one element for mass update.',
	            modal: false,
	            icon: Ext.Msg.INFO,
	            buttons: Ext.Msg.OK
	        });
		}else{		
			if(massUpdateMode===''){
					        Ext.Msg.show({
					            title: 'Mass Update',
					            msg: 'Select Mass Update Mode.',
					            modal: false,
					            icon: Ext.Msg.INFO,
					            buttons: Ext.Msg.OK
					        });
			}else{
				
				var message='Are you sure you want to perform the mass update with the marked elements ('+selectedElements+')?';
				var windowToitle= 'Start Mass Update ('+selectedElements+' elements)';
				Ext.Msg.show({
					   title: windowToitle,
					   msg: message,
					   buttons: Ext.Msg.YESNO,
					   fn: this.massUpdateMethodSelection,
					   scope: this,
					   icon: Ext.MessageBox.INFO
					});
			}

			
			
/*			var verwerfenCallback = function() {
				var selectedRows = selModel.getSelections();
				var ids = selectedRows[0].id;
				var size= selectedRows.length;
				if(size > 1){
					for( var i = 1; i < selectedRows.length; i++) {
						ids=ids+','+selectedRows[i].id; // Do whatever you want to do
					}
				}
				var massUpdateSerachCITemplateWindow = new AIR.MassUpdateSerachCITemplateWindow(this.getComponent('ciSearchResultView').ciTypeId,this.getComponent('ciSearchResultView').ciSubTypeId,ids,this.callback);
				massUpdateSerachCITemplateWindow.show();
			}.createDelegate(this);			
			
			var callbackMap = {
				'yes': verwerfenCallback,
				'no': this.callback
				
			};			
			var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('MASSUPDATE_CONFIRMATION', callbackMap,message,windowToitle);
			dynamicWindow.show();*/
		}
	},
	massUpdateMethodSelection :function(button,object){
		if(button=='yes'){
			var ciSearchResultView = this.getComponent('ciSearchResultView');
			var ciTypeId = ciSearchResultView.ciTypeId;
			var ciSubTypeId = ciSearchResultView.ciSubTypeId;
			var cbmassUpdateType = this.getComponent('ciSearchResultView').getComponent('pcbmassUpdateType').getComponent('cbmassUpdateType');
			var massUpdateMode = cbmassUpdateType.getValue();
			var ciResultGrid = ciSearchResultView.getComponent('tpCiSearchResultTables').getActiveTab();
			var selModel = ciResultGrid.getSelectionModel();			
			var selectedRows = selModel.getSelections();
			var ids = selectedRows[0].id;
			var size= selectedRows.length;
			if(size > 1){
				for( var i = 1; i < selectedRows.length; i++) {
					ids=ids+','+selectedRows[i].id; // Do whatever you want to do
				}
			}
			if(massUpdateMode==='3'){
				var selectAttributeValueWindow = new AIR.MassUpdateSelectAttributeValueWindow(ciTypeId,ciSubTypeId,ids,this.callback);
				selectAttributeValueWindow.show();
			}else{
				var massUpdateSerachCITemplateWindow = new AIR.MassUpdateSerachCITemplateWindow(ciTypeId,ciSubTypeId,ids,this.callback,massUpdateMode);
				massUpdateSerachCITemplateWindow.show();
			}
		}else{
			this.callback();
		}
	},	
	onCat1Select: function(store, record, options) {
		this.updateAdvSearchHeight(this.isAdvSearchExt, true);
	},
	onCat1Change: function(combo, newValue, oldValue) {
		this.updateAdvSearchHeight(this.isAdvSearchExt, true);
	},
	
	onAdvSearchExpand: function(panel) {
		var bExpandAdvSearchParams = this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('bExpandAdvSearchParams');
		bExpandAdvSearchParams.setText(AAM.getLabels().bCollapseAdvSearchParams);
		bExpandAdvSearchParams.toggle(true, true);
		
		this.updateAdvSearchHeight(this.isAdvSearchExt, true);
	},
	onAdvSearchCollapse: function(panel) {
		var bExpandAdvSearchParams = this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('bExpandAdvSearchParams');
		bExpandAdvSearchParams.setText(AAM.getLabels().bExpandAdvSearchParams);
		bExpandAdvSearchParams.toggle(false, true);
		
		this.collapseAdvSearch();
	},
	
	
	onExcelExport: function(link, event) {
		var form = AIR.AirApplicationManager.getExportForm();
		
		form.action = '/AIR/excelexport';
		form.method = 'POST';
		form.target = '_blank';
		
	    if(this.isOuSearch) {
	    	var params = this.getOuSearchParams();
	    	
	    	form.searchAction.value = params.searchAction;
	    	
	    	for(var key in params)
	    		if(form['h'+key])
	    			form['h'+key].value = params[key];
	    } else {
			var params = this.getSearchParams();
			params.limit = 100000;
			
	    	for(var key in params)
	    		if(form[key])
	    			form[key].value = params[key];
    	
		    if(this.isAdvSearch) {
		    	form.isAdvancedSearch.value = "true";
		    	var params = this.getAdvancedSearchParams(params);
		    	for(var key in params)
		    		if(form['h'+key])
		    			form['h'+key].value = params[key];
		    }
	    }

	    form.submit();
	    
	},
	
	onSearchEnter: function(field, e) {
        if(e.getKey() == e.ENTER) {
	    	var clSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('clSearch');
	    	clSearch.fireEvent('click', clSearch);
	    }
	},
	
	onOrgUnitAdd: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(
			null, this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('tfOrgUnit'), event, 'none');
	},
	
	onOrgUnitRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('tfOrgUnit'), event);
	},
	
	onSearch: function() {
		var params = this.getSearchParams();
		
	    if(this.isAdvSearch)
	    	params = this.getAdvancedSearchParams(params);

	    var ciAdvancedSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView');
	    ciAdvancedSearchView.collapse(false);
	    
	    var searchAction = this.isAdvSearch ? AC.SEARCH_TYPE_ADV_SEARCH : AC.SEARCH_TYPE_SEARCH;//searchType
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
		this.getComponent('ciSearchViewPages').doLayout();
		
		var field = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('tfSearch');
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
	    
		
		var rbgQueryMode = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('rbgQueryMode');
		var rbQueryMode = rbgQueryMode.getValue();
		var queryMode = rbQueryMode.inputValue;
		
		
	    var params = this.getBaseSearchParams();
	    
	    var store = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
	    // Start RFC 11131 (EOKEG)
	    //var isAppOnly = AAM.hasRole(AC.USER_ROLE_AIR_APPLICATION_LAYER) || store.findExact('itsecUserOptionName', 'AIR_APPLICATION_ONLY') > -1;
	    //params.isOnlyApplications = '' + isAppOnly;
	    //  End RFC 11131 (EOKEG)

	    params.showDeleted = 'N';
	    if (this.isShowDeleted()) {
		    params.showDeleted = 'Y';
		}
	    
	    params.ciNameAliasQuery = searchString;
	    params.queryMode = queryMode;
		params.isAdvSearch = '' + this.isAdvSearch;
		
		return params;
	},
	
	getAdvancedSearchParams: function(params) {
		params.isAdvSearch = this.isAdvSearch;
		params.isAdvSearchExt = this.isAdvSearchExt;
		
	    params.showDeleted = 'N';
	    if (this.isShowDeleted()) {
		    params.showDeleted = 'Y';
		}
		var ciStandardSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView');
		ciStandardSearchView.setData(params);
		
		return params;
	},
	
	isCat1OrNoneSelected: function() {
		var params = this.getComponent('ciSearchResultView').getSearchParams();
		var cat1;
		
		if(params) {
			cat1 = params.advsearchObjectTypeId;
		} else {
			var ciAdvancedSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView');
		    var cbCat1 = ciAdvancedSearchView.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType');
		    cat1 = cbCat1.getValue();
		}
		
	    return cat1 === undefined || cat1 === AC.APP_CAT1_APPLICATION || cat1.length === 0;
	},

	
	handleSearch: function(link) {
		this.isOuSearch = false;
		this.isAdvSearch = false;
		
		var ciSearchResultView = this.getComponent('ciSearchResultView');
		var params = ciSearchResultView.getSearchParams();
		
		if(params)
			this.setUpdateSearchAvailable(link, this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('bUpdateCiSearchResult'));

		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciStandardSearchView');
		
		ciSearchViewPages.getLayout().setActiveItem(0);
		ciStandardSearchView.setHeight(100);//60
		ciSearchViewPages.setHeight(100);//60
		ciSearchViewPages.doLayout();
		
		ciStandardSearchView.getComponent('ciAdvancedSearchView').setVisible(false);
		
		var rbgQueryMode = ciStandardSearchView.getComponent('pSearch').getComponent('rbgQueryMode');
		rbgQueryMode.setValue(AC.SEARCH_MODE_CONTAINS);//searchQueryModeContains (#8)
		rbgQueryMode.setVisible(false);
		
		var bExpandAdvSearchParams = this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('bExpandAdvSearchParams');
		bExpandAdvSearchParams.setVisible(false);
	},
	
	handleUiAdvancedSearch: function(link, event) {
		var ciSearchResultView = this.getComponent('ciSearchResultView');
		var params = ciSearchResultView.getSearchParams();
		
		if(params)
			this.setUpdateSearchAvailable(link, this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('bUpdateCiSearchResult'));
		

		searchAction = 'search';
		this.isOuSearch = false;
		this.isAdvSearch = true;
		
		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciStandardSearchView');
		var ciAdvancedSearchView = ciStandardSearchView.getComponent('ciAdvancedSearchView');
		ciSearchViewPages.getLayout().setActiveItem(0);
		
		
		var rbgQueryMode = ciStandardSearchView.getComponent('pSearch').getComponent('rbgQueryMode');
		rbgQueryMode.setVisible(true);
		
		var cbCiType = ciAdvancedSearchView.getComponent('pAdvSearchSingleAttrsFrame').getComponent('pAdvSearchSingleAttrs').getComponent('cbCiType');

		ciAdvancedSearchView.processCiTypeChange(cbCiType, cbCiType.getValue());
		
		var record = Util.getComboRecord(cbCiType, 'ciTypeId', AC.TABLE_ID_APPLICATION);
		var isCat1OrNone = record && record.get('ciSubTypeId') == AC.APP_CAT1_APPLICATION || cbCiType.getValue().length === 0 ? true : false;
		
		var bExpandAdvSearchParams = this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('bExpandAdvSearchParams');
		bExpandAdvSearchParams.setVisible(true);
		
		
		this.isAdvSearchExt = true;
		var isAdvSearchExt = params ? params.isAdvSearchExt : this.isAdvSearchExt;
		ciAdvancedSearchView.getComponent('pAdditionalSearchAttributes').setVisible(isAdvSearchExt);
		ciAdvancedSearchView.show();
		
		var isAdditionalSearchAttributes = true;
		this.updateAdvSearchHeight(isAdditionalSearchAttributes, isCat1OrNone);
	},
	
	handleUiOuSearch: function(link, event) {
		var ciSearchResultView = this.getComponent('ciSearchResultView');
		var params = ciSearchResultView.getSearchParams();
		
		if(params)
			this.setUpdateSearchAvailable(link, this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOuSearch').getComponent('bUpdateOuSearch'));
		
		this.isOuSearch = true;
		this.isAdvSearch = false;
		this.isAdvSearchExt = false;
		
		
		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var height = ciSearchViewPages.getComponent('ciOuSearchView').getHeight() + 30;
		
		ciSearchViewPages.setHeight(250);//300 460 | height=0 direkt nach startup oder zum ersten Mal auf clOuSearch. Warum?
		ciSearchViewPages.getLayout().setActiveItem(1);
		ciSearchViewPages.getComponent('ciOuSearchView').doLayout();
		
		var bExpandAdvSearchParams = this.getComponent('ciSearchResultView').getComponent('pSearchResultOptions').getComponent('bExpandAdvSearchParams');
		bExpandAdvSearchParams.setVisible(false);
	},
	
	setUpdateSearchAvailable: function(link, button) {
		var tabSearchType = this.getComponent('ciSearchResultView').getCurrentSearchType().replace(' ', '');//z.B. Advanced Search --> AdvancedSearch //oder über params.searchType?
		var navigationSearchType = link.getId().substring(2, link.getId().length);
		
		var isUpdateSearchAvailable = tabSearchType.indexOf(navigationSearchType) === 0;

		if(isUpdateSearchAvailable) {
			button.show();
		} else {
			button.hide();
		}
	},
	
	
	updateAdvSearchHeight: function(isAdditionalSearchAttributes, isCat1OrNone) {
		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciStandardSearchView');
		var ciAdvancedSearchView = ciStandardSearchView.getComponent('ciAdvancedSearchView');
		
		var height;
		
		if(ciAdvancedSearchView.collapsed) {
			height = 100;
		} else {
			height = 280 + ciAdvancedSearchView.getComponent('pAdvSearchCIOwnerFrame').getComponent('fs' + ciAdvancedSearchView.ownerId + 'CIOwner').getHeight();
			if(isCat1OrNone)
				height += ciAdvancedSearchView.getComponent('pAdvSearchAppOwnerFrame').getComponent('fs' + ciAdvancedSearchView.ownerId + 'ApplicationOwner').getHeight() +
						  ciAdvancedSearchView.getComponent('pAdvSearchAppStewardFrame').getComponent('fs' + ciAdvancedSearchView.ownerId + 'ApplicationSteward').getHeight();
			
			if(isAdditionalSearchAttributes || this.isAdditionalSearchAttributesActive()) {
				var pAdditionalSearchAttributes = ciAdvancedSearchView.getComponent('pAdditionalSearchAttributes');
				height += pAdditionalSearchAttributes.getHeight();
			}
			
			if(ciAdvancedSearchView.getWidth() < 955)//wenn niedrige (Beamer) Auslösung, die Höhe vergrößern
				height += 30;
		}
		
		ciStandardSearchView.setHeight(height);
		ciSearchViewPages.setHeight(height);
		ciSearchViewPages.doLayout();//because of setHeight() in navigation handling
	},
	collapseAdvSearch: function() {
		this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView').collapse();

		this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').setHeight(100);
		this.getComponent('ciSearchViewPages').setHeight(100);
	},
	
	
	
	onOuSearch: function(link, event) {
		this.isOuSearch = true;
		this.isAdvSearch = false;
		this.isAdvSearchExt = false;
		var params = this.getOuSearchParams();
		if(params.ouUnit.length > 0)
			this.processSearch(params);
		
	},
	
	getOuSearchParams: function() {
		var ciOuSearchView = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView');
		var rbgOUSearchQueryMode = ciOuSearchView.getComponent('pOrgUnit').getComponent('pOrgUnit2').getComponent('rbgOUSearchQueryMode');
		var rbgOUSearchOwnerType = ciOuSearchView.getComponent('pOrgUnit').getComponent('pOrgUnit2').getComponent('rbgOUSearchOwnerType');
		var cbOuSearchObjectType = ciOuSearchView.getComponent('cbOuSearchObjectType');
		var tfOrgUnit = ciOuSearchView.getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('tfOrgUnit');
		
	    var params = this.getBaseSearchParams();
		
	    params.ouUnit = tfOrgUnit.getValue();
		params.ouCiType = cbOuSearchObjectType.getRawValue();
		params.ciOwnerType = rbgOUSearchOwnerType.getValue().inputValue;
		params.ouQueryMode = rbgOUSearchQueryMode.getValue().inputValue;
		params.searchAction = AC.SEARCH_TYPE_OU_SEARCH;
		params.isOuSearch = true;
		
		return params;
	},
	
	
	processSearch: function(params, isUpdate) {
		if(Ext.isIE && !this.isMoved) {
			this.isMoved = true; 
		}
		params.isAdvSearchExt = this.isAdvSearchExt;
		this.getComponent('ciSearchResultView').search(params, isUpdate, this.onExcelExport.createDelegate(this));
	},
	
	onTabChange: function(tabPanel, tab, options) {
		if(tabPanel) {
			var bUpdateCiSearchResult = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('bUpdateCiSearchResult');
			var bUpdateOuSearch = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOuSearch').getComponent('bUpdateOuSearch');
			
			if(tabPanel.items.items.length > 0) {
				bUpdateCiSearchResult.setVisible(true);
				bUpdateOuSearch.setVisible(true);
			} else {
				bUpdateCiSearchResult.setVisible(false);
				bUpdateOuSearch.setVisible(false);
				this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView').expand(false);
			}
		}
		
		
		if(!tab) {
			tab = this.getComponent('ciSearchResultView').getComponent('tpCiSearchResultTables').getActiveTab();
			if(!tab) {
				if(options)
					this.fireEvent('externalNavigation', this, tab, options.viewId, options);
				return;
			}
		}
		
		var searchType = tab.getId().substring(0, tab.getId().indexOf('_'));
		var params = this.getComponent('ciSearchResultView').getSearchParams(tab.getId());
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
		var ciStandardSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView');
		
		switch(searchAction) {
			case AC.SEARCH_TYPE_ADV_SEARCH:
				
				ciStandardSearchView.update(params);
			case AC.SEARCH_TYPE_SEARCH:
				
				var tfSearch = ciStandardSearchView.getComponent('pSearch').getComponent('tfSearch');
				tfSearch.setValue(params.ciNameAliasQuery);//query
				
				break;

			case AC.SEARCH_TYPE_OU_SEARCH:
				this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').update(params);
				
				break;
			default:
				break;
		};
	},
	
	onUpdateCiSearchResult: function(button, event) {
		var params = this.getComponent('ciSearchResultView').getSearchParams();
		
		var searchAction = params.searchAction;
		
		switch(searchAction) {
			case AC.SEARCH_TYPE_ADV_SEARCH://!!
			case AC.SEARCH_TYPE_SEARCH:
				params = this.getSearchParams();
				
				if(searchAction === AC.SEARCH_TYPE_SEARCH)
					break;
			case AC.SEARCH_TYPE_ADV_SEARCH:
				params = this.getAdvancedSearchParams(params);
				
			    var ciAdvancedSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView');
			    ciAdvancedSearchView.collapse(false);
			    
				break;
			case AC.SEARCH_TYPE_OU_SEARCH:
				params = this.getOuSearchParams();
				break;
			default:
				break;
		};
		
		params.searchAction = searchAction;
		this.processSearch(params, true);
	},
	
	onExpandAdvSearchParams: function(button, event) {
		var ciAdvancedSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView');

		if(button.pressed) {
			ciAdvancedSearchView.expand(false);
			button.setText(AAM.getLabels().bCollapseAdvSearchParams);
		} else {
			ciAdvancedSearchView.collapse(false);
			button.setText(AAM.getLabels().bExpandAdvSearchParams);
		}
	},
	
	onReset: function(button, event) {
		var ciStandardSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView');
		
		if(this.isOuSearch) {
			searchView = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').reset();
		} else if(this.isAdvSearch) {
			ciStandardSearchView.reset();
			ciStandardSearchView.getComponent('ciAdvancedSearchView').reset();
		} else {
			ciStandardSearchView.reset();
		}
	},
	
	isAdditionalSearchAttributesActive: function() {
		return true;

	},
	
	updateLabels: function(labels) {
		this.getComponent('searchpanelheader').setText(labels.searchpanelheader);
		
		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciStandardSearchView');
		var ciAdvancedSearchView = ciStandardSearchView.getComponent('ciAdvancedSearchView');
		
		var pAdditionalSearchAttributes = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView').getComponent('pAdditionalSearchAttributes');
		
		//var rbgQueryMode = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearch').getComponent('rbgQueryMode');

		this.setBoxLabel(Ext.getCmp('rbgQueryModeContains'), labels.rbgQueryModeContains);
		this.setBoxLabel(Ext.getCmp('rbgQueryModeBeginsWith'), labels.rbgQueryModeBeginsWith);
		this.setBoxLabel(Ext.getCmp('rbgQueryModeExact'), labels.rbgQueryModeExact);


		var ciStandardSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView');
		ciStandardSearchView.updateLabels(labels);
		var ciOuSearchView = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView');
		ciOuSearchView.updateLabels(labels);
		var ciSearchResultView = this.getComponent('ciSearchResultView');
		ciSearchResultView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
		this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').updateToolTips(toolTips);
		this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').updateToolTips(toolTips);
	},
	
	setAdvSearch: function(isAdvSearch) {
		this.isAdvSearch = isAdvSearch;
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
Ext.reg('AIR.CiSearchView', AIR.CiSearchView);
Ext.namespace('AIR');

AIR.CiSearchView = Ext.extend(AIR.AirView, {
	CI_TYPE_APPLICATION: 2,
	
	initComponent: function() {
		Ext.apply(this, {
		    border: false,
		    autoScroll: true,//hier ein muss

		    padding: 20,
		    
		    bodyStyle: {
		    	backgroundColor: panelbgcolor,
		    	color: fontColor,
		    	fontFamily: fontType
		    },
		    
		    items: [{
		    	xtype: 'label',
		    	id: 'searchpanelheader',
				
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
				html: '<hr>',
//				id: 'searchpanelhr',
				
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
			    //height: 50,//300! 50
				//autoScroll: true,

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
		    	border: false,
		    	hidden: true,
//		    	height: 1000,
		    	
		    	style: {
		    		marginTop: 20
		    	},
		    	
		    	items: [{
			    	xtype: 'AIR.CiResultGrid',
			    	id: 'ciSearchGrid',
			    	ownerPrefix: 'ciSearchGrid',
			    	border: false
		    	}]
		    }]
		});
		
		AIR.CiSearchView.superclass.initComponent.call(this);
		
		this.addEvents('ciSelect', 'beforeCiSelect');
		
		this.ciSearchGrid = this.getComponent('ciSearchResultView').getComponent('ciSearchGrid');//  findById=depr
		this.ciSearchGrid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
		this.ciSearchGrid.getStore().on('load', this.onGridLoaded, this);
		this.ciSearchGrid.on('rowclick', this.onRowClick, this);
		this.ciSearchGrid.on('rowdblclick', this.onRowDoubleClick, this);//onRowDoubleClick onRowClick
		
		var clSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('clSearch');
		clSearch.on('click', this.onSearch, this);
		
	    var clAdvancedSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('clAdvancedSearch');
	    clAdvancedSearch.on('click', this.handleUiAdvancedSearch, this);
	    
	    var tfSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('searchfield');
	    tfSearch.on('specialkey', this.onSearchEnter, this);
	    
//		var clOrgUnit = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('clOrgUnit');
//		clOrgUnit.on('click', this.onOrgUnitClick, this);
	    
		
		var clOrgUnitAdd = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('clOrgUnitAdd');
		var clOrgUnitRemove = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('clOrgUnitRemove');
		clOrgUnitAdd.on('click', this.onOrgUnitAdd, this);
		clOrgUnitRemove.on('click', this.onOrgUnitRemove, this);
		
		
		var clOuSearch = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('clOuSearch');
		clOuSearch.on('click', this.onOuSearch, this);
		
		var pagingBar = this.ciSearchGrid.getBottomToolbar();
		var clExcelExport = pagingBar.getComponent('ciSearchGrid_clExcelExport');
		clExcelExport.on('click', this.onExcelExport, this);
	},
	
	
	onExcelExport: function(link, event) {
		//a)
//		var tfSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('searchfield');
//		var exportWindow = window.open('/AIR/excelexport?query='+tfSearch.getValue()+'&cwid='+AIR.AirApplicationManager.getCwid()+'&searchPoint=Search');
		
		//b)
//		var exportForm = AIR.AirApplicationManager.getExportFormAsExtElement();//AIR.AirApplicationManager.getExportForm();//this.getComponent('ciSearchResultView').getComponent('exportForm').getEl().dom.children[0].children[0];//document.createElement('form');//
		var form = AIR.AirApplicationManager.getExportForm();//exportForm.getEl().dom.children[0].children[0];
		
		form.action = '/AIR/excelexport';//exportForm
		form.method = 'POST';//exportForm
		form.target = '_blank';//exportForm
		
		//query searchPoint cwid: already rendered <hidden> fields!
//		exportForm.query.value = tfSearch.getValue();
//		exportForm.cwid.value = AIR.AirApplicationManager.getCwid();
//		exportForm.searchPoint.value = 'Search';
		
	    if(this.isOuSearch) {
	    	var params = this.getOuSearchParams();
//	    	params.limit = 100000;
	    	
	    	form.searchAction.value = params.searchAction;
	    	
	    	for(var key in params)
	    		if(form['h'+key])
	    			form['h'+key].value = params[key];
	    } else {
			var params = this.getSearchParams();
			params.limit = 100000;//delete params.limit;
			
	    	for(var key in params)
	    		if(form[key])
	    			form[key].value = params[key];//exportForm
	//    		exportForm.getComponent(key).setValue(params[key]);
	    	
	    	
		    if(this.isAdvSearch) {
		    	var params = this.getAdvancedSearchParams(params);
		    	for(var key in params)
		    		if(form['h'+key])
		    			form['h'+key].value = params[key];//exportForm
	//	    		if(exportForm.getComponent('h'+key))
	//	    			exportForm.getComponent('h'+key).setValue(params[key]);
		    }
	    }

	    form.submit();
	    
//		exportForm.getForm().submit();//exportForm.submit()
	},
	
//	onExcelExportSuccess: function(response, options) {
//		Util.log('export success');
//	},
//	
//	onExcelExportFailure: function(response, options) {
//		Util.log('export failure');
//	},
	
	onSearchEnter: function(field, e) {
        if(e.getKey() == e.ENTER) {
	    	var clSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('clSearch');
	    	clSearch.fireEvent('click', clSearch);
	    }
	},
	
	
//	onOrgUnitClick: function(link, event) {
//		AIR.AirPickerManager.openGroupPicker(
//			null, this.getComponent('ciAdvancedSearchView').getComponent('pOrgUnit').getComponent('tfOrgUnit'), event, 'none');
//	},
	
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
	    
//	    ciAdvancedSearchView.collapse();
	    
	    this.processSearch(params);
	},
	
	getSearchParams: function() {
		searchAction = 'search';//still needed?
		this.getComponent('ciSearchViewPages').doLayout();//because auf setHeight() in navigation handling
		
		var field = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('searchfield');
		var searchString = field.getRawValue().trim();
		
	    if (searchString != field.getRawValue())
	    	field.setValue(searchString);

	    while(searchString.indexOf('*') > -1)
	    	searchString = searchString.replace('*', '%');
	    
	    while(searchString.indexOf('?') > -1)
	    	searchString = searchString.replace('?', '_');
	    
		
		var rbgQueryMode = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('rbgQueryMode');
		var rbQueryMode = rbgQueryMode.getValue();
		var queryMode = rbQueryMode.inputValue;
		
		
	    var params = { 
    		start: 0,
    		limit: this.getComponent('ciSearchResultView').getComponent('ciSearchGrid').pageSize,//20,
    		
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
			searchAction: 'search'
    	};
	    
	    params.query = searchString;
	    params.onlyapplications = '' + selectedOnlyApplications;
	    params.queryMode = queryMode;
		params.advancedsearch = '' + this.isAdvSearch;
		
		return params;
	},
	
	getAdvancedSearchParams: function(params) {
		var ciAdvancedSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView');
		params.onlyapplications = 'false';
		
	    var field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchObjectType');
	    params.advsearchObjectTypeId = field.getValue();
	    params.advsearchObjectTypeText = field.getRawValue().trim();
	    
	    field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('cbAdvSearchITset');
	    params.itSetId = field.getValue();
	    
	    params.advsearchappowner = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fs' + ciAdvancedSearchView.ownerId + 'ApplicationOwner').getComponent('p' + ciAdvancedSearchView.ownerId + 'ApplicationOwner').getComponent(ciAdvancedSearchView.ownerId + 'applicationOwnerHidden').getValue();
	    params.advsearchappdelegate = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fs' + ciAdvancedSearchView.ownerId + 'ApplicationOwner').getComponent('p' + ciAdvancedSearchView.ownerId + 'ApplicationOwnerDelegate').getComponent(ciAdvancedSearchView.ownerId + 'applicationOwnerDelegate').getValue();
	    params.advsearchappdelegateHidden = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fs' + ciAdvancedSearchView.ownerId + 'ApplicationOwner').getComponent('p' + ciAdvancedSearchView.ownerId + 'ApplicationOwnerDelegate').getComponent(ciAdvancedSearchView.ownerId + 'applicationOwnerDelegateHidden').getValue();
	    params.advsearchsteward = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fs' + ciAdvancedSearchView.ownerId + 'ApplicationSteward').getComponent('p' + ciAdvancedSearchView.ownerId + 'ApplicationSteward').getComponent(ciAdvancedSearchView.ownerId + 'applicationStewardHidden').getValue();
	    params.advsearchciowner = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fs' + ciAdvancedSearchView.ownerId + 'CIOwner').getComponent('p' + ciAdvancedSearchView.ownerId + 'CIOwner').getComponent(ciAdvancedSearchView.ownerId + 'ciResponsibleHidden').getValue();
	    params.advsearchcidelegate = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fs' + ciAdvancedSearchView.ownerId + 'CIOwner').getComponent('p' + ciAdvancedSearchView.ownerId + 'CiSubResponsible').getComponent(ciAdvancedSearchView.ownerId + 'ciSubResponsible').getValue();
	    params.advsearchcidelegateHidden = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fs' + ciAdvancedSearchView.ownerId + 'CIOwner').getComponent('p' + ciAdvancedSearchView.ownerId + 'CiSubResponsible').getComponent(ciAdvancedSearchView.ownerId + 'ciSubResponsibleHidden').getValue();
		
	    if(!this.isAdvSearchExt) {
	    	var fsCategoriesAndStatus = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
	    	var fsSpecialSearchAttributes = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
	    	
	    	
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW');
			if(field.getValue().length > 0)
				params.advsearchoperationalStatusid = field.getValue();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW');
			if(field.getValue().length > 0)
				params.advsearchapplicationcat2id = field.getValue();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW');
			if(field.getValue().length > 0)
				params.advsearchlifecyclestatusid = field.getValue();
	    	
	    	
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW');
			if(field.getValue().length > 0)
				params.itsecGroup = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW');
			if(field.getValue().length > 0)
				params.advsearchprocessid = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW');
			if(field.getValue().length > 0)
				params.osType = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW');
			if(field.getValue().length > 0)
				params.osName = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW');
			if(field.getValue().length > 0)
				params.source = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW');
			if(field.getValue().length > 0)
				params.businessEssential = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW');
			if(field.getValue().length > 0)
				params.gapResponsible = field.getValue();
			
			field = fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate');
			if(field.getValue().length > 0)
				params.gapEndDate = field.getValue();
	    }
	    
		return params;
	},
	
	/*
	getAdvancedSearchParams: function(params) {
		var ciAdvancedSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView');
		params.onlyapplications = 'false';
    	
	    field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchdescription');
	    params.advsearchdescription = field.getRawValue().trim();
		
	    field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchObjectType');
	    params.advsearchObjectTypeId = field.getValue();
	    params.advsearchObjectTypeText = field.getRawValue().trim();
		
		
	    
	    this.setAdvSearchParam('advsearchappowner', params, ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwner').getComponent('advsearchappowner'), ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwner').getComponent('advsearchappownerHidden'));
	    this.setAdvSearchParam('advsearchappdelegate', params, ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate').getComponent('advsearchappownerdelegate'), ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate').getComponent('advsearchappownerdelegateHidden'));
	    this.setAdvSearchParam('advsearchciowner', params, ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwner').getComponent('advsearchciowner'), ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwner').getComponent('advsearchciownerHidden'));
	    this.setAdvSearchParam('advsearchcidelegate', params, ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate').getComponent('advsearchcidelegate'), ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate').getComponent('advsearchcidelegateHidden'));
	    
	    this.setAdvSearchParam('advsearchsteward', params, ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward').getComponent('tfAdvSearchSteward'), ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward').getComponent('tfAdvSearchStewardHidden'));
	    
	    
//    	field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwner').getComponent('advsearchappownerHidden');//advsearchappowner advsearchappownerHidden
//    	params.advsearchappowner = field.getValue().trim();
//    	
//	    field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate').getComponent('advsearchappownerdelegateHidden');//advsearchappownerdelegate advsearchappownerdelegateHidden
//	    params.advsearchappdelegate = field.getValue().trim();//getRawValue getValue
//		
//		field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwner').getComponent('advsearchciownerHidden');//advsearchciowner advsearchciownerHidden
//	    params.advsearchciowner = field.getValue().trim();//getRawValue getValue //.replace(/%/g,'*')
//		
//	    field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate').getComponent('advsearchcidelegateHidden');//advsearchcidelegate advsearchcidelegateHidden
//	    params.advsearchcidelegate = field.getValue().trim();//getRawValue getValue
//	    
//	    field = ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward').getComponent('tfAdvSearchStewardHidden');//tfAdvSearchSteward tfAdvSearchStewardHidden
//	    params.advsearchsteward = field.getValue().trim();//getRawValue getValue
	
	    
	    

		//this.isAdvSearchExt muss negiert verwendet werden, da sie auch zum Umschalten in handleUiAdvancedSearch() verwendet wird
	    //für Ein- und Ausblenden der erweiterten Adv Search mit zusätzlichen fieldsets neben owner. Aktuell sind dies
	    //Enhanced options und Organizational Unit
		if(!this.isAdvSearchExt) {
			field = ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchoperationalStatus');
			if(field.getValue().length > 0)
				params.advsearchoperationalStatusid = field.getValue();
			
			
			field = ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchcategory');
			if(field.getValue().length > 0)
				params.advsearchapplicationcat2id = field.getValue();
			
	
			field = ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchlifecyclestatus');
			if(field.getValue().length > 0)
				params.advsearchlifecyclestatusid = field.getValue();
			
	
			field = ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchprocess');
			if(field.getValue().length > 0)
				params.advsearchprocessid = field.getValue();
		}
		
		return params;
	},
	
	setAdvSearchParam: function(paramName, params, field, hiddenField) {
    	var checkType = Util.isCWID(field.getValue());
    	
    	switch(checkType) {
	    	case 1://cwid maskre OK but to long or to short
	    	case 0://cwid ok
	    		hiddenField.reset();
	    		params[paramName] = field.getValue();
	    		break;
	    	case -1://no cwid, full name from picker. scheme: <lastname>, <firstname> (<CWID>)
	    		params[paramName] = hiddenField.getValue().length > 0 ? hiddenField.getValue() : field.getValue();
	    		
	    		break;
    	}
	},*/

	
	onGridBeforeLoaded: function(store, options) {
		myLoadMask.show();
	},
	
	onGridLoaded: function(store, records, options) {
		myLoadMask.hide();
		var ciSearchResultView = this.getComponent('ciSearchResultView');
		ciSearchResultView.setVisible(true);
		
		ciSearchResultView.getComponent('ciSearchGrid').updateHeight();
	},
	
	onRowClick: function(grid, rowIndex, e) {
		this.fireEvent('beforeCiSelect');//if(this.fireEvent('beforeCiSelect') == false) return;
		
		var record = grid.getStore().getAt(rowIndex);
		var ciId = record.id;
		
		if(record.data.tableId == this.CI_TYPE_APPLICATION) {
//			selectedCIId = ciId;//grid.store.getAt(rowIndex).id;
			AIR.AirApplicationManager.setCiId(ciId);
		} else {
//			selectedCIId = -1;
			AIR.AirApplicationManager.setCiId(-1);
			
//			if(Ext.isIE) {
//				var windowTitle = labels.dynamicWindowCiTypeNotSupportedWarningTitle;//languagestore.data.items[0].data['dynamicWindowCiTypeNotSupportedWarningTitle']
//				var windowText = labels.dynamicWindowCiTypeNotSupportedWarningText;
//				
//				alert(windowTitle, windowText);//Fenster zerschossen bei IE. Grund unbekannt.
//			} else {
				var ciTypeWarningWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CI_TYPE_NOT_SUPPORTED_WARNING');
				ciTypeWarningWindow.show();
//			}
		}
		
		this.fireEvent('ciSelect', this, ciId);//selectedCIId ciId
	},
	
	onRowDoubleClick: function (grid, rowIndex, e) {
//		var ciId = grid.store.getAt(rowIndex).id;
//		selectedCIId = ciId;
//		AIR.AirApplicationManager.setCiId(ciId);
//		
//		this.fireEvent('ciSelect', this, ciId, 'clCiDetails');//selectedCIId ciId
		
//		this.onRowClick(grid, rowIndex, e);
		
		this.onRowClick(grid, rowIndex, e);
		this.fireEvent('externalNavigation', this, grid, 'clCiDetails');
	},
	
	handleSearch: function() {
		this.isOuSearch = false;
		
		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciStandardSearchView');
		
		ciSearchViewPages.getLayout().setActiveItem(0);
		ciStandardSearchView.setHeight(60);
		ciSearchViewPages.setHeight(60);
		ciSearchViewPages.doLayout();
		
		
		var link = ciStandardSearchView.getComponent('pSearchField').getComponent('clAdvancedSearch');//.getComponent('pSearchField').getComponent('clAdvancedSearch')
		link.updateText(AIR.AirApplicationManager.getLabels().advancedsearchlink);
		
		ciStandardSearchView.getComponent('ciAdvancedSearchView').setVisible(false);
		
		var rbgQueryMode = ciStandardSearchView.getComponent('pSearchField').getComponent('rbgQueryMode');//.getComponent('pSearchField').getComponent('rbgQueryMode')
		rbgQueryMode.setValue(searchQueryModeContains);
		rbgQueryMode.setVisible(false);
	},
	
	handleUiAdvancedSearch: function(link, event) {
		searchAction = 'search';
		this.isOuSearch = false;
		this.isAdvSearch = true;
//		this.isAdvSearchExt = false;
		
		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciStandardSearchView');
		var ciAdvancedSearchView = ciStandardSearchView.getComponent('ciAdvancedSearchView');

//		this.updateAdvSearchHeight(ciSearchViewPages, ciStandardSearchView);
		ciSearchViewPages.getLayout().setActiveItem(0);
		
		
		var rbgQueryMode = ciStandardSearchView.getComponent('pSearchField').getComponent('rbgQueryMode');
		rbgQueryMode.setVisible(true);
		
		if(!link) {//wenn Menüpunkt Advanced Search geklickt
			link = ciStandardSearchView.getComponent('pSearchField').getComponent('clAdvancedSearch');
			this.isAdvSearchExt = false;
		}
		
		ciAdvancedSearchView.show();
		
		if(this.isAdvSearchExt) {
			this.isAdvSearchExt = false;
			link.updateText(AIR.AirApplicationManager.getLabels().advancedsearchminuslink);
			 
			ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes').setVisible(true);
			
//			ciAdvancedSearchView.getComponent('advsearchplusfieldset').setVisible(true);//advsearchplusfieldset show();
		} else {
			this.isAdvSearchExt = true;
			link.updateText(AIR.AirApplicationManager.getLabels().advancedsearchpluslink);

			ciAdvancedSearchView.getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes').setVisible(false);
			
//			ciAdvancedSearchView.getComponent('advsearchplusfieldset').setVisible(false);//advsearchplusfieldset hide();
//			ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchoperationalStatus').reset();
//			ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchcategory').reset();
//			ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchlifecyclestatus').reset();
//			ciAdvancedSearchView.getComponent('advsearchplusfieldset').getComponent('advsearchprocess').reset();
		}
		
		this.updateAdvSearchHeight(ciSearchViewPages, ciStandardSearchView);
		
//		ciAdvancedSearchView.expand();
	},
	
	handleUiOuSearch: function() {
		this.isOuSearch = true;
		this.getComponent('ciSearchViewPages').setHeight(300);//300 460
//		this.updateAdvSearchHeight(this.getComponent('ciSearchViewPages'));
		
		this.getComponent('ciSearchViewPages').getLayout().setActiveItem(1);
		this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').doLayout();
	},
	
	updateAdvSearchHeight: function(ciSearchViewPages, ciStandardSearchView) {
		var resolutionWidth = Ext.getBody().getWidth();
		var height = 410;//50 + this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView').getHeight();//150;//200 300 400 630

		
		if(this.isAdditionalSearchAttributesActive())
			height += this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView').getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes').getHeight();// - 300;//300;//250
		
//		if(resolutionWidth <= 1024)//<=
//			height += 100;//250 150
		
		ciStandardSearchView.setHeight(height);
		ciSearchViewPages.setHeight(height);
		
		ciSearchViewPages.doLayout();//because auf setHeight() in navigation handling
	},
	
	
	
	onOuSearch: function(link, event) {
		searchAction = 'search';//still needed?

		field = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit1').getComponent('tfOrgUnit');
		if(field.getValue().length > 0) {
			var params = this.getOuSearchParams();
			
			this.processSearch(params);
		}
	},
	
	getOuSearchParams: function() {
		var rbgOUSearchQueryMode = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit2').getComponent('rbgOUSearchQueryMode');
		var rbgOUSearchOwnerType = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('pOrgUnit').getComponent('pOrgUnit2').getComponent('rbgOUSearchOwnerType');
		var cbOuSearchObjectType = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').getComponent('cbOuSearchObjectType');
		
	    var params = { 
    		start: 0,
    		limit: this.getComponent('ciSearchResultView').getComponent('ciSearchGrid').pageSize,//20,
    		
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
			searchAction: 'ouSearch'//search
    	};
		
		params.ciType = cbOuSearchObjectType.getRawValue();
		params.ouUnit = field.getValue();
		params.ciOwnerType = rbgOUSearchOwnerType.getValue().inputValue;
		params.ouQueryMode = rbgOUSearchQueryMode.getValue().inputValue;
		
		return params;
	},
	
	
	processSearch: function(params) {
		if(Ext.isIE && !this.isMoved) {
			this.isMoved = true; 
			//-----------------
			//ohne dies vertauscht der IE willkürlich Spalten
//			this.ciSearchGrid.getColumnModel().setConfig(this.ciSearchGrid.getDefaultColumnConfig());//this.myOwnCIsGrid.getColumnModel().config
			
			var ciSearchGrid = this.getComponent('ciSearchResultView').getComponent('ciSearchGrid');
			ciSearchGrid.getColumnModel().setConfig(AIR.AirConfigFactory.createCiResultGridConfig(true));
			this.updateColumnLabels(AIR.AirApplicationManager.getLabels());
		}
		
	    this.ciSearchGrid.getStore().load({
	    	params: params
	    });
	    
		delete params.start;
		delete params.limit;
		this.ciSearchGrid.setPagingParams(params);
	},
	
	isAdditionalSearchAttributesActive: function() {
		var pAdditionalSearchAttributes = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView').getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes');
		return pAdditionalSearchAttributes.isVisible();
	},
	
	updateColumnLabels: function(labels) {
		var ciSearchResultView = this.getComponent('ciSearchResultView');
		var ciSearchGrid = ciSearchResultView.getComponent('ciSearchGrid');
		
		ciSearchResultView.setTitle(labels.searchResultPanelTitle);
		ciSearchGrid.getColumnModel().setColumnHeader(0, labels.searchResultName);
		ciSearchGrid.getColumnModel().setColumnHeader(1, labels.searchResultAlias);
		ciSearchGrid.getColumnModel().setColumnHeader(2, labels.searchResultType);
		ciSearchGrid.getColumnModel().setColumnHeader(3, labels.searchResultCategory);
		ciSearchGrid.getColumnModel().setColumnHeader(4, labels.searchResultAppOwner);
		ciSearchGrid.getColumnModel().setColumnHeader(5, labels.searchResultAppOwnerDelegate);
		ciSearchGrid.getColumnModel().setColumnHeader(6, labels.searchResultAppSteward);
		ciSearchGrid.getColumnModel().setColumnHeader(7, labels.searchResultResponsible);
		ciSearchGrid.getColumnModel().setColumnHeader(8, labels.searchResultSubResponsible);
	},
	
	updateLabels: function(labels) {
		this.getComponent('searchpanelheader').setText(labels.searchpanelheader);
		
		var ciSearchViewPages = this.getComponent('ciSearchViewPages');
		var ciStandardSearchView = ciSearchViewPages.getComponent('ciStandardSearchView');
		var ciAdvancedSearchView = ciStandardSearchView.getComponent('ciAdvancedSearchView');
		
		var pAdditionalSearchAttributes = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('ciAdvancedSearchView').getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes');
		var clAdvancedSearch = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('clAdvancedSearch');
		
		if(pAdditionalSearchAttributes.isVisible()) {//this.isAdvSearchExt
			clAdvancedSearch.updateText(labels.advancedsearchpluslink);
		} else {
			clAdvancedSearch.updateText(labels.advancedsearchlink);
		}
		
		var rbgQueryMode = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').getComponent('pSearchField').getComponent('rbgQueryMode');
		this.setBoxLabel(rbgQueryMode.items.items[0], labels.rbgQueryModeContains);
		this.setBoxLabel(rbgQueryMode.items.items[1], labels.rbgQueryModeBeginsWith);
		this.setBoxLabel(rbgQueryMode.items.items[2], labels.rbgQueryModeExact);
		
		this.updateColumnLabels(labels);
		
		var ciStandardSearchView = this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView');
		ciStandardSearchView.updateLabels(labels);
		var ciOuSearchView = this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView');
		ciOuSearchView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips) {
		this.getComponent('ciSearchViewPages').getComponent('ciStandardSearchView').updateToolTips(toolTips);
		this.getComponent('ciSearchViewPages').getComponent('ciOuSearchView').updateToolTips(toolTips);
	},
	
	setAdvSearch: function(isAdvSearch) {
		this.isAdvSearch = isAdvSearch;
	}
});
Ext.reg('AIR.CiSearchView', AIR.CiSearchView);
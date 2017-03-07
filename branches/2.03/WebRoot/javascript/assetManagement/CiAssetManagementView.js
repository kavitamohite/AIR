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
            }, {
                xtype: 'panel',
                id: 'ciAssetSearchViewPages',
                layout: 'card',
                activeItem: 0,
                border: false,
                items: [{
                    xtype: 'AIR.CiAssetManageSearchView',
                    id: 'ciAssetManageSearchView'
                }]
            }, 
            {   // Added by enqmu
            	xtype: 'window',
            	id: 'assetsFormWindow',
            	closeAction: 'hide',
            	modal: true,
            	title: 'Upload File:',
            	hidden: true,
            	width: 300,
            	items: [ {   
            		xtype: 'panel',
            		id: 'assetsImportPanel',
            		html: "<form id='importAssetsExcelFile' action='AirExcelImportServlet' method='post' target='_blank' enctype='multipart/form-data'><input id='file' name='file' type='file' /><input type='hidden' id='importCwid' name='importCwid' /></form>"
            			},
                {
    				xtype : 'button',
    				itemId : 'uploadAssetsBtn',
    				text : 'Upload',
    				style : {
    					fontSize : 12,
    					margin : '8 10 0 0',
    					width:80
    				}
    			} ]
            },{   // Added by emria
            	xtype: 'window',
            	id: 'assetsFormWindowUp',
            	closeAction: 'hide',
            	modal: true,
            	title: 'Upload File:',
            	hidden: true,
            	width: 300,
            	items: [ {   
            		xtype: 'panel',
            		id: 'assetsImportPanel1',
            		html: "<form id='importAssetsExcelFileUpdate' action='AirExcelImportServletUpdate' method='post' target='_blank' enctype='multipart/form-data'><input id='file' name='file' type='file' /><input type='hidden' id='importCwid' name='importCwid' /></form>"
            			},					
                {
    				xtype : 'button',
    				itemId : 'uploadAssetsBtn1',
    				text : 'Upload',
    				style : {
    					fontSize : 12,
    					margin : '8 10 0 0',
    					width:80
    				}
    			} ]
            
            	
            },
            {
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

        var ciSearchResultView = this.getComponent('ciAssetSearchResultView');
        ciSearchResultView.getComponent('tpCiAssetSearchResultTables').on('tabchange', this.onTabChange, this);

        ciSearchResultView.getComponent('pAssetSearchResultOptions').getComponent('bAssetSelectDeselectAll').on('click', this.selectDeselectAll, this);

        this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult').on('click', this.onUpdateCiSearchResult, this);
        this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bSaveColumnsPreference').on('click', this.updateUserProfileColumnsPreference, this);  // added by enqmu
        this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bExportAssets').on('click', this.exportAssetAlert, this);  // added by enqmu
        this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bImportAssets').on('click', this.importAssetAlert, this);  // added by enqmu
        this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bImportAssetsUp').on('click', this.importAssetAlertUp, this); //added emria
        this.getComponent('assetsFormWindow').getComponent('uploadAssetsBtn').on('click', this.importAssetsExcel, this);  // added by enqmu
        this.getComponent('assetsFormWindowUp').getComponent('uploadAssetsBtn1').on('click', this.importAssetsExcelUp, this);//added by emria
        
        this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bDeleteAssets').on('click',this.deleteAssetAlert,this);
    },

    selectDeselectAll: function(button, event) {
        var ciResultGrid = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab();
        var selModel = ciResultGrid.getSelectionModel();
        if (selModel.getCount() > 0) {
            selModel.clearSelections();
        } else {
            selModel.selectAll();
        }
    },

    onSearchEnter: function(field, e) {
        if (e.getKey() == e.ENTER) {
            var clAssetSearch = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('clAssetSearch');
            clAssetSearch.fireEvent('click', clAssetSearch);
        }
    },

    onSearch: function() {
        var params = this.getSearchParams();

        var searchAction = AC.SEARCH_TYPE_SEARCH; //searchType
        params.searchAction = searchAction; //searchType

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

        var searchMode = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('searchMode');
        var rbQueryMode = searchMode.getValue();
        var queryMode = rbQueryMode.inputValue;

        if (searchString != field.getRawValue())
            field.setValue(searchString);

        while (searchString.indexOf('*') > -1)
            searchString = searchString.replace('*', '%');

        while (searchString.indexOf('?') > -1)
            searchString = searchString.replace('?', '_');

        var i = searchString.indexOf('\'');
        if (i > -1) {
            var hasSecondApos = searchString.charAt(i + 1) === '\'';
            if (!hasSecondApos)
                searchString = searchString.replace('\'', '\'\'');
        }

        var params = this.getBaseSearchParams();

        params.showDeleted = 'N';
        if (this.isShowDeleted()) {
            params.showDeleted = 'Y';
        }

        params.query = searchString;

        params.queryMode = queryMode;
        AAM.setComponentType(queryMode);

        params.isAdvSearch = 'false';

        return params;
    },

    handleSearch: function(link) {

        var ciSearchResultView = this.getComponent('ciAssetSearchResultView');
        var params = ciSearchResultView.getSearchParams();

        if (params)
            this.setUpdateSearchAvailable(link, this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult'));

        var ciSearchViewPages = this.getComponent('ciAssetSearchViewPages');
        var ciStandardSearchView = ciSearchViewPages.getComponent('ciAssetManageSearchView');

        ciSearchViewPages.getLayout().setActiveItem(0);
        ciStandardSearchView.setHeight(100);
        ciSearchViewPages.setHeight(100);
        ciSearchViewPages.doLayout();

    },
    setUpdateSearchAvailable: function(link, button) {
        var tabSearchType = this.getComponent('ciSearchAssetResultView').getCurrentSearchType().replace(' ', ''); //z.B. Advanced Search --> AdvancedSearch //oder über params.searchType?
        var navigationSearchType = link.getId().substring(2, link.getId().length);

        var isUpdateSearchAvailable = tabSearchType.indexOf(navigationSearchType) === 0;

        if (isUpdateSearchAvailable) {
            button.show();
            this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bSaveColumnsPreference').show();  // added by enqmu
        } else {
            button.hide();
        }
    },
    processSearch: function(params, isUpdate) {
        if (Ext.isIE && !this.isMoved) {
            this.isMoved = true;
        }
        this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bSaveColumnsPreference').show();  // added by enqmu
        var bImportAssets = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bImportAssets');
        var bImportAssetsUp = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bImportAssetsUp');
        var bExportAssets = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bExportAssets');
        var bDeleteAssets = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bDeleteAssets');
        var searchMode = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('searchMode');
        
        if(searchMode.getValue().inputValue=='hardware'){
        	bImportAssets.show();
        	bImportAssetsUp.show();
        	bExportAssets.show();
    		if(AIR.AirApplicationManager.hasRole(AC.USER_ROLE_AIR_ASSET_MANAGER)){
    			bDeleteAssets.show();
   		}    		
        }else{
        	bImportAssets.hide();
        	bImportAssetsUp.hide();
        	bExportAssets.hide();
        	bDeleteAssets.hide();
        }     
        this.getComponent('ciAssetSearchResultView').search(params, isUpdate, this.onExcelExport.createDelegate(this));
    },
    onTabChange: function(tabPanel, tab, options) {
        var bImportAssets = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bImportAssets');
        var bImportAssetsUp = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bImportAssetsUp');
        var bExportAssets = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bExportAssets');
        var bDeleteAssets = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bDeleteAssets');
        var searchMode = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('searchMode');
        var params = this.getComponent('ciAssetSearchResultView').getSearchParams(tab.getId());
        
        if(params.queryMode=='hardware'){
        	bImportAssets.show();
        	bImportAssetsUp.show();
        	bExportAssets.show();
    		if(AIR.AirApplicationManager.hasRole(AC.USER_ROLE_AIR_ASSET_MANAGER)){
    			bDeleteAssets.show();
   		}    		
        }else{
        	bImportAssets.hide();
        	bImportAssetsUp.hide();
        	bExportAssets.hide();
        	bDeleteAssets.hide();
        }
    	
        if (tabPanel) {
            var bUpdateCiSearchResult = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult');

            if (tabPanel.items.items.length > 0) {
                bUpdateCiSearchResult.setVisible(true);
            } else {
                bUpdateCiSearchResult.setVisible(false);
            }
        }

        if (!tab) {
            tab = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab();
            if (!tab) {
                if (options)
                    this.fireEvent('externalNavigation', this, tab, options.viewId, options);
                return;
            }
        }

        var searchType = tab.getId().substring(0, tab.getId().indexOf('_'));
        var viewId;

        switch (searchType) {
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
        }

        if (options) {
            options.forceNavigation = true;
            options.skipHistory = true;
        } else {
            options = {
                forceNavigation: true,
                skipHistory: true
            };
        }

        this.updateParams(params, searchType);
        if (options.viewId && options.viewId !== viewId) //wenn durch MenuLinkklick und Adv. Seach Tab Klick versch. navMenuLink IDs in den options stehen, gleichsetzen. Nötig/sinnvoll ?
            viewId = options.viewId;

        this.fireEvent('externalNavigation', this, tab, viewId, options);
    },

    updateParams: function(params, searchAction) {
        var ciStandardSearchView = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView');

        switch (searchAction) {
            case AC.SEARCH_TYPE_SEARCH:

                var tfSearch = ciStandardSearchView.getComponent('pAssetSearch').getComponent('tfAssetSearch');
                tfSearch.setValue(params.query); //query

                break;

            default:
                break;
        };
    },
    onUpdateCiSearchResult: function(button, event) {
        var params = this.getComponent('ciAssetSearchResultView').getSearchParams();

        var searchAction = params.searchAction;

        switch (searchAction) {
            case AC.SEARCH_TYPE_ADV_SEARCH: //!!
            case AC.SEARCH_TYPE_SEARCH:
                params = this.getSearchParams();

                if (searchAction === AC.SEARCH_TYPE_SEARCH)
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
    },

    onExcelExport: function(link, event) {
        var form = AIR.AirApplicationManager.getExportForm();

        form.action = '/AIR/assetExcelExport';
        form.method = 'POST';
        form.target = '_blank';

        var params = this.getSearchParams(); // this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().getBottomToolbar().initialConfig.store.lastOptions.params
        var sortInfo = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().getBottomToolbar().initialConfig.store.getSortState();
        var pagination = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().getBottomToolbar().initialConfig.store.lastOptions.params;
        
        params.start = pagination.start;
        params.limit = pagination.limit;
        
        if(sortInfo){
        	params.sort = sortInfo.field;
        	params.dir = sortInfo.direction;
        }
        
        for (var key in params)
            if (form[key])
                form[key].value = params[key];

        if (this.isAdvSearch) {
            form.isAdvancedSearch.value = "true";
            var params = this.getAdvancedSearchParams(params);
            for (var key in params)
                if (form['h' + key])
                    form['h' + key].value = params[key];
        }
        
        form.submit();

    }, 
    exportAssetAlert :function(link, event){
		var message='Are you sure you want to perform the export for the updated Asset details?';
		var windowTitle= 'Start Export of Assets';
		Ext.Msg.show({
			   title: windowTitle,
			   msg: message,
			   buttons: Ext.Msg.YESNO,
			   fn: this.exportSearchAssets,
			   scope: this,
			   icon: Ext.MessageBox.INFO
			});
    },
    importAssetAlert :function(){
		var message='Are you sure you want to perform the import for the updated Asset details?';
		var windowTitle= 'Start Import of Assets';
		Ext.Msg.show({
			   title: windowTitle,
			   msg: message,
			   buttons: Ext.Msg.YESNO,
			   fn: this.importAssets,
			   scope: this,
			   icon: Ext.MessageBox.INFO
			});
    },
    //emria
    importAssetAlertUp :function(){
		var message='Are you sure you want to perform the import for the updated Asset details update?';
		var windowTitle= 'Start Import of Assets Update';
		Ext.Msg.show({
			   title: windowTitle,
			   msg: message,
			   buttons: Ext.Msg.YESNO,
			   fn: this.importAssetsUp,
			   scope: this,
			   icon: Ext.MessageBox.INFO
			});
    },

    
    deleteAssetAlert: function(){
    	var message='Are you sure, you want to perform the deletion of assets?';
    	var windowTitle = 'Start deletion of assets';
    	Ext.Msg.show({
			   title: windowTitle,
			   msg: message,
			   buttons: Ext.Msg.YESNO,
			   fn: this.deleteAssets,
			   scope: this,
			   icon: Ext.MessageBox.INFO
			});
    	
    },
    
    deleteAssets: function(button,event){
    	if(button != 'yes'){
    		return;
    	}
    	
    	var selectedRecords = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().selModel;
    	var selectedRecordsCount = selectedRecords.getCount();
    	 var selectedHwAssets = '';
    	if(selectedRecordsCount == 0){
    		Ext.Msg.alert('Message', 'Please select any hardware component');
    		return
    	}else{
    		selectedHwAssets=this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().selModel.getSelections()[0].data.id ;
            for(var i = 1; i < selectedRecordsCount; i++)
            {
            	selectedHwAssets += ","+this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().selModel.getSelections()[i].data.id ;
            }
    	}    	
    	var deleteAssetStore = AIR.AirStoreFactory.createAssetDeleteStore();
    	deleteAssetStore.on('beforeload',this.onBeforeDeleteAsset,this);
    	deleteAssetStore.on('load',this.onDeleteAsset,this);
		var params = {
				cwid: AAM.getCwid(),
				token: AAM.getToken(),
				selectedAssets: selectedHwAssets
		};
    	deleteAssetStore.load({
    		params: params
    	}
    	); 
    },
    
    onBeforeDeleteAsset: function(store,options){
		var deeteMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		deeteMask.show();
    },
    
    onDeleteAsset: function(store, records, options){
		var deeteMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		deeteMask.hide();
		if(records[0].data.result=='OK'){
			this.onUpdateCiSearchResult();
    		Ext.Msg.show({
    			title: 'Asset Deletion Completed',
    			msg: 'Asset Deletion Completed.',
    			buttons: Ext.MessageBox.OK,
    			icon: Ext.MessageBox.INFO			
    		});	
    		
		}else{
			var msg = records[0].data.messages;
	   		Ext.Msg.show({
    			title: 'Error',
    			msg: msg,
    			buttons: Ext.MessageBox.OK,
    			icon: Ext.MessageBox.ERROR			
    		});

		}

    },
    importAssetsExcel : function(button, event) {
    	this.getComponent('assetsFormWindow').hide();
   		document.getElementById('importCwid').value = AIR.AirApplicationManager.getCwid();
       	var importExcelFile = document.getElementById('importAssetsExcelFile');
       	importExcelFile.submit();
    	
    },
    importAssetsExcelUp : function(button, event) {
    	this.getComponent('assetsFormWindowUp').hide();
   		document.getElementById('importCwid').value = AIR.AirApplicationManager.getCwid();
       	var importExcelFileUp = document.getElementById('importAssetsExcelFileUpdate');
       	importExcelFileUp.submit();

     	var updateSearch = this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult');
     	this.getComponent('ciAssetSearchViewPages').getComponent('ciAssetManageSearchView').getComponent('pAssetSearch').getComponent('bUpdateCiAssetSearchResult');
     	
     	setTimeout(function myFunction(){updateSearch.fireEvent('click', updateSearch);},
     			5000);
       
    	
    },
    importAssets : function(button, event) {
    	if(button == 'yes') {
    		this.getComponent('assetsFormWindow').show();
    	}
    },
    importAssetsUp : function(button, event) {  //emria
    	if(button == 'yes') {
    		this.getComponent('assetsFormWindowUp').show();
    	}
    },
    exportSearchAssets : function(button, event) { // 
    	
    	if(button != 'yes')
    	{
    		return;
    	}
    		
    	var selectedRecords = this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().selModel;
    	var form = AIR.AirApplicationManager.getExportForm();

        form.action = '/AIR/assetExcelExport';
        form.method = 'POST';
        form.target = '_blank';
        var selectedHwAssets = '';
        var selectedRecordsCount = selectedRecords.getCount();
        if(selectedRecordsCount == 0)
        {
        	Ext.Msg.alert('Message', 'Please select any hardware component.');
        	return;
        }
        
        for(var i = 0; i < selectedRecordsCount; i++)
        {
        	selectedHwAssets += this.getComponent('ciAssetSearchResultView').getComponent('tpCiAssetSearchResultTables').getActiveTab().selModel.getSelections()[i].data.id + "~";
        }
        form.selectedHwAssets.value = selectedHwAssets; 
        form.language.value = AAM.getLanguage();
        form.submit();

    }
    ,
	    updateUserProfileColumnsPreference : function(button, event) { 
		var tpCiSearchResultTables = this.getComponent(
				'ciAssetSearchResultView').getComponent(
				'tpCiAssetSearchResultTables');
		var columns = "";
		for (var i = 1; i < 10; i++) {
			columns += tpCiSearchResultTables.getActiveTab().getColumnModel()
					.getColumnId(i)
					+ ";";
		}
		AAM.setAssetColumns(columns);

		this.saveUserColumnsPreferenceOptions();
	},

	saveUserColumnsPreferenceOptions : function() { // added by enqmu
		var userOptionSaveStore = AIR.AirStoreFactory
				.createUserOptionColumnsPreferenceSaveStore();

		var params = {
			cwid : AIR.AirApplicationManager.getCwid(),
			token : AIR.AirApplicationManager.getToken()
		};

		params.userColumnsPreference = AAM.getAssetColumns();

		userOptionSaveStore.load({
			params : params
		});
		Ext.Msg.alert('Message',
				'User profile columns preference has been updated.');
	}
    
});
Ext.reg('AIR.CiAssetManagementView', AIR.CiAssetManagementView);
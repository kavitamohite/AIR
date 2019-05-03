//function search() {
	/*var field = Ext.getCmp('searchfield');
	var searchString = field.getRawValue().trim();
	
    if (searchString != field.getRawValue())
    	field.setValue(searchString);

    while(searchString.indexOf('*') > -1)
    	searchString = searchString.replace('*', '%');
    
    while(searchString.indexOf('?') > -1)
    	searchString = searchString.replace('?', '_');
    
	
	var rbgQueryMode = Ext.getCmp('rbgQueryMode');
	var rbQueryMode = rbgQueryMode.getValue();
	var queryMode = rbQueryMode.inputValue;
	
	
	var ciSearchGridStore = Ext.getCmp('ciSearchGridStore').getStore();//applicationListStore
    var o = {start: 0};
    
    ciSearchGridStore.baseParams = ciSearchGridStore.baseParams || {};
    ciSearchGridStore.baseParams['query'] = searchString;

    ciSearchGridStore.baseParams['onlyapplications'] = '' + selectedOnlyApplications;
	
	ciSearchGridStore.baseParams['queryMode'] = queryMode;
	
	ciSearchGridStore.baseParams.cwid = cwid;
	ciSearchGridStore.baseParams.token= token;
	ciSearchGridStore.baseParams.searchAction = searchAction;
	
    // advanced attribs (only if active)
	ciSearchGridStore.baseParams['advancedsearch'] = '' + selectedAdvancedSearch;
    if (selectedAdvancedSearch) {
    	ciSearchGridStore.baseParams['onlyapplications'] = 'false';
    	
	    field = Ext.getCmp('advsearchdescription');
		ciSearchGridStore.baseParams['advsearchdescription'] = field.getRawValue().trim();
	    field = Ext.getCmp('advsearchObjectType');
		ciSearchGridStore.baseParams['advsearchObjectTypeId'] = field.getValue();
		ciSearchGridStore.baseParams['advsearchObjectTypeText'] = field.getRawValue().trim();

    	
    	field = Ext.getCmp('advsearchappowner');
		ciSearchGridStore.baseParams['advsearchappowner'] = field.getRawValue().trim();
	    field = Ext.getCmp('advsearchappownerdelegate');
		ciSearchGridStore.baseParams['advsearchappdelegate'] = field.getRawValue().trim();
		field = Ext.getCmp('advsearchciowner');
		ciSearchGridStore.baseParams['advsearchciowner'] = field.getRawValue().trim();
	    field = Ext.getCmp('advsearchcidelegate');
		ciSearchGridStore.baseParams['advsearchcidelegate'] = field.getRawValue().trim();
		
		if (selectedAdvancedSearchplus) {
			field = Ext.getCmp('advsearchoperationalStatus');
			if (undefined !== field.getValue() && '' !== field.getValue()) {
				ciSearchGridStore.baseParams['advsearchoperationalStatusid'] = field.getValue();
			}
			
			field = Ext.getCmp('advsearchcategory');
			if (undefined !== field.getValue() && '' !== field.getValue()) {
				ciSearchGridStore.baseParams['advsearchapplicationcat2id'] = field.getValue();
			}

			field = Ext.getCmp('advsearchlifecyclestatus');
			if (undefined !== field.getValue() && '' !== field.getValue()) {
				ciSearchGridStore.baseParams['advsearchlifecyclestatusid'] = field.getValue();
			}

//			field = Ext.getCmp('advsearchprocess');
//			if (undefined !== field.getValue() && '' !== field.getValue()) {
//				ciSearchGridStore.baseParams['advsearchprocessid'] = field.getValue();
//			}
			
		}
	}

    myLoadMask.show();
    advsearchpanel.collapse();
    
    
    var setVisibleCallback = function() {
        var ciSearchResultView = Ext.getCmp('ciSearchResultView');
        ciSearchResultView.setVisible(true);
        myLoadMask.hide();
    };
    
    myLoadMask.show();
    ciSearchGridStore.load({
    	params: o,
    	callback: setVisibleCallback
    });*/
	
//	var ciSearchView = Ext.getCmp('searchpanel');//ciSearchView
//	ciSearchView.onSearch();

//    field.hasSearch = true;//??
//}


//function advancedsearch() {
//	
//	// adv. search darf wieder alle CI's sehen
//	// if (rolenameApplicationLayer === Ext.getCmp('myplaceroleperson').getValue() || selectedOnlyApplications == true) {
//		// only applications !!!
//		// Ext.getCmp('advsearchObjectType').setValue(applicationObjectTypeId);
//		// Ext.getCmp('advsearchObjectType').setReadOnly(true);
//	// }
//	
//	// if (rolenameApplicationLayer === Ext.getCmp('myplaceroleperson').getValue()) {
//		// only applications !!!
//		// Ext.getCmp('advsearchObjectType').setValue(applicationObjectTypeId);
//	// }
//	
//	var myplaceHomePanel = Ext.getCmp('myplaceHomePanel');
////	var searchpanel = Ext.getCmp('searchpanel');
//	var myplacepanel = Ext.getCmp('myplacePanel');
//	var editpanel = Ext.getCmp('editPanel');
//	var createpanel = Ext.getCmp('createPanel');
//	
//	var rbgQueryMode = Ext.getCmp('rbgQueryMode');
//	rbgQueryMode.setVisible(true);
//	
//	Ext.get('searchmenuitem').dom.children[0].src = navOff;
//	Ext.get('advancedsearchmenuitem').dom.children[0].src = navOn;
//	searchAction = 'search';
//	selectedAdvancedSearch = true;
//	myplaceHomePanel.hide();
//	myplacepanel.hide();
//	editpanel.hide();
//	createpanel.hide();
////	gridpanel.hide();
//	slideItIn('searchpanel');
//	slideItIn('advsearchpanel');
//	// My Place - hide functions
//	Ext.getCmp('myplacemycismenuitem').hide();
//	Ext.getCmp('myplacemycissubsmenuitem').hide();
//	Ext.get("searchpanelheader").dom.innerHTML = languagestore.data.items[0].data['advancedsearchpanelheader'];
//	
//	/*if (!selectedAdvancedSearchplus) {
//		Ext.getCmp('advsearchplusfieldset').show();
//		Ext.get('advancedsearchlink').dom.innerHTML = languagestore.data.items[0].data['advancedsearchlink'];
//		selectedAdvancedSearchplus = true;
//	} else {
//		Ext.getCmp('advsearchplusfieldset').hide();
//		Ext.get('advancedsearchlink').dom.innerHTML = languagestore.data.items[0].data['advancedsearchpluslink'];
//		selectedAdvancedSearchplus = false;
//		Ext.getCmp('advsearchoperationalStatus').setValue('');
//		Ext.getCmp('advsearchcategory').setValue('');
//		Ext.getCmp('advsearchlifecyclestatus').setValue('');
//		Ext.getCmp('advsearchprocess').setValue('');
//	}*/
//	
//	if (selectedAdvancedSearchplus) {
//		selectedAdvancedSearchplus = false;
//		
//		var html = languagestore.data.items[0].data['advancedsearchminuslink'];
//		Ext.get('advancedsearchlink').dom.innerHTML = html;
//		
//		Ext.getCmp('advsearchplusfieldset').show();
//		
//	} else {
//		selectedAdvancedSearchplus = true;
//		
//		html = languagestore.data.items[0].data['advancedsearchpluslink'];
//		Ext.get('advancedsearchlink').dom.innerHTML = html;
//		
//		Ext.getCmp('advsearchplusfieldset').hide();
//		
//		Ext.getCmp('advsearchoperationalStatus').setValue('');
//		Ext.getCmp('advsearchcategory').setValue('');
//		Ext.getCmp('advsearchlifecyclestatus').setValue('');
//		Ext.getCmp('advsearchprocess').setValue('');
//	}
//	
//	advsearchpanel = Ext.getCmp('advsearchpanel');
//	advsearchpanel.expand();
//	setHelptext(helpAdvancedSearch);
//}

/*
var advsearchpanel = new Ext.Panel({
	labelWidth: 150, // label settings here cascade unless overridden
	id : 'advsearchpanel',
	title: 'Advanced Search Options',
	//region: 'center',
	//monitorResize: true,
    //split: false,
    //height: '95%',
    //width: '850',
    //margins: '0 0 0 0',
    padding: 10,
    border: false,
    hidden: true,
    layout: 'column',
    collapsible: true,
    
    bodyStyle: {
    	backgroundColor: panelbgcolor,
    	color: fontColor,
    	fontFamily: fontType
    },
    
    items: [{
		columnwidth: 0.45,
		xtype: 'form',
		border: false,
		
		items: [{
			xtype: 'combo',
			id: 'advsearchObjectType',
		    fieldLabel: 'Type',
		    valueField: 'id',
	        displayField: 'english',
	        typeAhead: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 230,
		    store: applicationCat1ListStore
	    }, {
        	xtype: 'textfield',
        	fieldLabel: 'Description',
        	name: 'advsearchdescription',
        	id: 'advsearchdescription',
        	emptyText: '',
        	width: 230,
        	hidden: false,
        	hasSearch: false,
        	listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                    	search();
                    }
                }
            }
        }, {
	        xtype: 'fieldset',
	        id: 'advsearchowner',
	        title: 'Owner',
	        padding: 5,
	        
			items: [{
	        	xtype: 'textfield',
	        	fieldLabel: 'App owner',
	        	name: 'advsearchappowner',
	        	id: 'advsearchappowner',
	        	emptyText: '',
	        	width: 200,
	        	hidden: false,
	        	hasSearch: false,
	        	listeners: {
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	search();
	                    }
	                }
	            }
	        }, {
	        	xtype: 'textfield',
	        	fieldLabel: 'App owner delegate',
	        	name: 'advsearchappownerdelegate',
	        	id: 'advsearchappownerdelegate',
	        	emptyText: '',
	        	width: 200,
	        	hidden: false,
	        	hasSearch: false,
	        	listeners: {
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	search();
	                    }
	                }
	            }
	        }, {
	        	xtype: 'textfield',
	        	fieldLabel: 'CI owner',
	        	name: 'advsearchciowner',
	        	id: 'advsearchciowner',
	        	emptyText: '',
	        	width: 200,
	        	hidden: false,
	        	hasSearch: false,
	        	listeners: {
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	search();
	                    }
	                }
	            }
	        }, {
	        	xtype: 'textfield',
	        	fieldLabel: 'CI Delegate',
	        	name: 'advsearchcidelegate',
	        	id: 'advsearchcidelegate',
	        	emptyText: '',
	        	width: 200,
	        	hidden: false,
	        	hasSearch: false,
	        	listeners: {
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	search();
	                    }
	                }
	            }
	        }]
        }]
    }, {
		 columnwidth: 0.1,
		 border: false,
		 html:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    }, {
		columnwidth: 0.45,
	    xtype: 'fieldset',
	    id: 'advsearchplusfieldset',
	    title: 'Advanced Search Plus',
	    padding: 5,
	    hidden: true,
		items: [{
			xtype: 'combo',
			id: 'advsearchoperationalStatus',
		    fieldLabel: 'Operational Status',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 200,
	        labelSeparator: ' ',
		    store: operationalStatusListStore
	    }, {
			xtype: 'combo',
			id: 'advsearchcategory',
		    fieldLabel: 'Category',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 200,
	        labelSeparator: ' ',
		    store: applicationCat2ListStore
	    }, {
			xtype: 'combo',
			id: 'advsearchlifecyclestatus',
		    fieldLabel: 'Lifecycle status',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 200,
	        labelSeparator: ' ',
		    store: lifecycleStatusListStore
	    
	    }, {
			xtype: 'combo',
			id: 'advsearchprocess',
		    fieldLabel: 'Business Prozess',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 200,
	        labelSeparator: ' ',
		    store: processListStore
	    }, {
			xtype: 'textfield',
			fieldLabel: '',
			name: 'advsearchcategoryOLD',
			id: 'advsearchcategoryOLD',
			emptyText: '',
			width: 200,
			hidden: false,
			disabled: true,
			hasSearch: false,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() == e.ENTER)
						search();  			 
				}
	    	 }
	    }]
    }]
});*/

/*
var searchpanel = new Ext.Panel({
	id: 'searchpanel',
    border: false,
    autoScroll: true,

//    margins: {top:20, right:20, bottom:20, left:20},//'25 25 25 25',
    padding: 20,
    
    bodyStyle: {
    	backgroundColor: panelbgcolor,
    	color: fontColor,
    	fontFamily: fontType
    },
    
//    layout: 'table',
//    layoutConfig: {
//    	columns: 1
//    },
    
//    style: {
//    	position: 'absolute',
//    	left: '50px',
//    	top: '15px'
//    },
    
    
    items: [{ 
		xtype: 'container',	  
		html: 'Search',
		id: 'searchpanelheader',
        height: 24,
		width: 800,
		cls: 'x-plain',
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
		html: '',
		id: 'searchpanelsubheader',
        height: 24,
		//width: '135',
		cls: 'x-plain',
		style: {
			textAlign: 'left',
			backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '8pt'
		}
	}, { 
		xtype: 'container',	  
		html: '<hr>',
		id: 'searchpanelhr',
		cls: 'x-plain',
		style: {
			color: '#d0d0d0',
			backgroundColor: '#d0d0d0',
			height: '1px'
		}
	}, { 
		xtype: 'container',	  
		html: '&nbsp;',
		id: 'searchpanelspace',
		cls: 'x-plain',
		style: {
			height: '16px'
		}
	}, {
		name: 'searchfieldpanel',
		id: 'searchfieldpanel',
		border: false,
		
		layout: 'table',
	    layoutConfig: {
	    	columns: 3
	    },
	    
	    items: [{
        	xtype: 'textfield',
        	name: 'searchfield',
        	id: 'searchfield',
        	emptyText: 'Enter CI name or alias...',
        	width: 300,
        	height: 28,
        	hidden: false,
        	hideLabel: true,
        	padding: '5',
        	hasSearch: false,
        	maskRe: /[0-9a-zA-Z%#=\+\-\_\/\\.*? ]/,
        	maxLength: 656,
        	listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                    	search();
                    }
                }
//		                keydown: function(field, e) {
//		    				attributeLength = Ext.getCmp('searchfield')
//		                	if (attributeLength!==undefined && attributeLength > 0) {
//		    					if (field.getValue().length>=attributeLength && allowedKeys.indexOf(e.getKey())===-1 ) {
//		    						e.stopEvent();
//		    					}
            }
        }, {
        	xtype: 'container',	  
			html: '&nbsp;'
		}, {
			xtype: 'container',	  
			html: '<img src="' + img_Search_offMouse + '" onclick="search();" onmouseover="this.src=\'' + img_Search_onMouse + '\'" onmouseout="this.src=\'' + img_Search_offMouse + '\'">',
			style: {
				cursor:'pointer'
			}
		}, { 	
			xtype: 'container',
			items: [{
	            xtype: 'radiogroup',
				id: 'rbgQueryMode',
				name: 'rbgQueryMode',
				hidden: true,

	            items: [{
	            	id: 'rbgQueryModeContains', boxLabel: 'Contains', name: 'queryMode', inputValue: 'CONTAINS', checked: true
	            }, {
	            	id: 'rbgQueryModeBeginsWith', boxLabel: 'Begins with', name: 'queryMode', inputValue: 'BEGINS_WITH'
	            }, { 
	            	id: 'rbgQueryModeExact', boxLabel: 'Exact', name: 'queryMode', inputValue: 'EXACT'
	            }]
			}]
		}, {
			xtype: 'container',	  
			html: '&nbsp;'
		}, {
        	xtype: 'container',
        	html: '<a href="#" onclick="advancedsearch();" id="advancedsearchlink">Advanced Search</a>',
        	style: {
				textAlign: 'left',
				backgroundColor: panelbgcolor,
				color: fontColor,
				fontFamily: fontType,
				fontWeight: 'normal',
				fontSize: '8pt'
        	}
        }]
	}, { 
		xtype: 'container',	  
		html: '&nbsp;',
		cls: 'x-plain',
		style: {
			height: '16px'
		}
	},
//    advsearchpanel,//gridpanel
	{
    	xtype: 'AIR.CiAdvancedSearchView',
    	id: 'advsearchpanel'//'CiAdvancedSearchView'
	}, {
    	xtype: 'AIR.CiResultView',
    	id: 'ciSearchResultView',
    	hidden: true,
    	
    	items: [{
	    	xtype: 'AIR.CiResultGrid',
	    	id: 'ciSearchGridStore'
    	}]
    }]
});*/
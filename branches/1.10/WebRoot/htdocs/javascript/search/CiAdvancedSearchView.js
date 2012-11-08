Ext.namespace('AIR');

AIR.CiAdvancedSearchView = Ext.extend(AIR.AirView, {
	
	initComponent: function() {
		this.ownerId = 'AdvSearch';
		var appOwnerStewardFieldsets = AIR.AirUiFactory.createAppOwnerStewardFieldsets(this.ownerId);
		
		Ext.apply(this, {
			title: 'Advanced Search',
		    padding: 10,
		    border: false,
		    
		    layout: 'form',
		    labelWidth: 100,
			
			autoScroll: true,
			collapsible: true,
			collapsed: false,
		    
		    bodyStyle: {
		    	backgroundColor: panelbgcolor,
		    	color: fontColor,
		    	fontFamily: fontType
		    },
		    
//		    items: [{
//				xtype: 'panel',
//				id: 'pAdvancedSearch',
//				layout: 'form',
//				
//				border: false,
//				labelWidth: 100,
//				
//			    style: {
//			    	marginRight: 10
//			    },

				items: [{
					xtype: 'filterCombo',//combo
					id: 'advsearchObjectType',
				    store: AIR.AirStoreManager.getStoreByName('applicationCat1ListStore'),
					
				    fieldLabel: 'Type',
				    valueField: 'id',
			        displayField: 'english',
			        
//			        typeAhead: true,
//			        autoSelect: false,
//			        triggerAction: 'all',
			        
			        forceSelection: true,
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local',
			        
			        width: 230
			    },{
					xtype: 'filterCombo',
					id: 'cbAdvSearchITset',
					store: AIR.AirStoreManager.getStoreByName('itSetListStore'),
					
				    fieldLabel: 'IT Set',
				    valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        autoSelect: false,
//			        triggerAction: 'all',
			        
			        forceSelection: true,
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local',
			        
			        width: 230
			    },{
		        	xtype: 'textfield',
		        	id: 'advsearchdescription',
		        	
		        	width: 230,
		        	hidden: false,
		        	hasSearch: false
		        },{
		            xtype: 'radiogroup',
	    			id: 'rgAdvSearchBARrelevance',
	    			width: 250,
	    			fieldLabel: 'BAR relevant',
	    			
//	    			hidden: true,
	    			columns: 3,

		            items: [
	                    { id: 'rgAdvSearchBARrelevanceYes',		itemId: 'rgAdvSearchBARrelevanceYes', 			boxLabel: 'Yes',		name: 'rgAdvSearchBARrelevance', inputValue: 'Y', width: 80 },//, width: 80 wenn gedatscht
		                { id: 'rgAdvSearchBARrelevanceNo',		itemId: 'rgAdvSearchBARrelevanceNo',			boxLabel: 'No',			name: 'rgAdvSearchBARrelevance', inputValue: 'N', width: 80 },
		                { id: 'rgAdvSearchBARrelevanceUndefined',itemId: 'rgAdvSearchBARrelevanceUndefined', 	boxLabel: 'Undefined',	name: 'rgAdvSearchBARrelevance', inputValue: 'U', width: 80 }//, checked: true
		            ]
			    },
		        appOwnerStewardFieldsets.fsApplicationOwner,
		        appOwnerStewardFieldsets.fsApplicationSteward,
		        appOwnerStewardFieldsets.fsCIOwner,
		        
		        {
		        	xtype: 'panel',
		        	id: 'pAdditionalSearchAttributes',
		        	layout: 'column',//column hbox
		        	border: false,
		        	
//		        	anchor: '100%',
//		        	width: 900,
		        		
		        	items: [{
						xtype: 'fieldset',
						id: 'fsCategoriesAndStatus',
						title: 'Categories and Status',//Kategorien und Status; Advanced Search Plus
						
						layout: 'form',
						width: 420,
						padding: 10,
	
						//hidden: true,
						
						style: {
							marginRight: 10,
							marginBottom: 10
						},
						
						layout: 'form',//form fit
						labelWidth: 150,
	//				    width: 300,
						
						items: [{
							xtype: 'filterCombo',
							id: 'cbAdvSearchGeneralUsageW',
							store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),
							width: 230,
	
							fieldLabel: 'General Usage',
							valueField: 'id',
							displayField: 'text',
							
	//				        typeAhead: true,
	//				        forceSelection: true,
	//				        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						},{
							xtype: 'filterCombo',
							id: 'cbAdvSearchITCategoryW',
							store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),
							width: 230,
	
							fieldLabel: 'IT Category',
							valueField: 'id',
							displayField: 'text',
							
	//				        typeAhead: true,
	//				        forceSelection: true,
	//				        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						}, {
							xtype: 'filterCombo',
							id: 'cbAdvSearchLifecycleStatusW',
							store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),
							width: 230,
							
							fieldLabel: 'Lifecycle status',
							valueField: 'id',
							displayField: 'text',
							
	//				        typeAhead: true,
	//				        forceSelection: true,
	//				        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						},{
					        xtype: 'listview',
					        width: 80,

					        border: false,
					        fieldLabel: 'Organisational scope',

					        id: 'lvAdvSearchOrganisationalScope',
					        store: AIR.AirStoreManager.getStoreByName('organisationalScopeListStore'),
					        
					        singleSelect: false,
					        multiSelect: true,
					        simpleSelect: true,
					        hideHeaders: true,
					        
					        columns: [
								{dataIndex: 'id', hidden: true, hideLabel: true, width: .001},
								{dataIndex: 'name'}
					        ]
						}]
					},{
						xtype: 'fieldset',
						id: 'fsSpecialSearchAttributes',
						title: 'Other Search Attributes',
						
						layout: 'form',
		//				columnWidth: 0.33,//0.45
						width: 480,

						padding: 10,
		//			    hidden: true,
						
						layout: 'form',//form fit
						labelWidth: 120,
		//			    width: 300,

						
						items: [{
							xtype: 'filterCombo',
							id: 'cbAdvSearchITSecGroupW',
							store: AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),//new Ext.data.Store(),//
							width: 300,

							fieldLabel: 'ITSec Group',
							valueField: 'id',
							displayField: 'name',
							
		//			        typeAhead: true,
		//			        forceSelection: true,
		//			        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						},{
							xtype: 'filterCombo',
							id: 'cbAdvSearchProcessW',
							store: AIR.AirStoreManager.getStoreByName('processListStore'),
						    fieldLabel: 'Business Prozess',

					        tpl: '<tpl for="."><div ext:qtip="{text}" class="x-combo-list-item">{text}</div></tpl>',
							valueField: 'id',
							displayField: 'text',
							width: 300,

		//			        typeAhead: true,
		//			        forceSelection: true,
		//			        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						}/*,{
							xtype: 'filterCombo',
							id: 'cbAdvSearchOStypeW',
							store: AIR.AirStoreManager.getStoreByName('sisoogleOsTypeListStore'),//new Ext.data.Store(),//
							width: 300,

							fieldLabel: 'OS type',
							valueField: 'id',
							displayField: 'name',
							
		//			        typeAhead: true,
		//			        forceSelection: true,
		//			        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						},{
							xtype: 'filterCombo',
							id: 'cbAdvSearchOSnameW',
							store: AIR.AirStoreManager.getStoreByName('sisoogleOsNameListStore'),//new Ext.data.Store(),//
							width: 300,

							fieldLabel: 'OS name',
							valueField: 'id',
							displayField: 'name',
							
		//			        typeAhead: true,
		//			        forceSelection: true,
		//			        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						}*/,{
							xtype: 'filterCombo',
							id: 'cbAdvSearchSourceW',
							store: AIR.AirStoreManager.getStoreByName('sisoogleSourceListStore'),//new Ext.data.Store(),//
							width: 300,

							fieldLabel: 'Source',
							valueField: 'id',
							displayField: 'name',
							
		//			        typeAhead: true,
		//			        forceSelection: true,
		//			        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						},{
							xtype: 'filterCombo',
							id: 'cbAdvSearchBusinessEssentialW',
							store: AIR.AirStoreManager.getStoreByName('businessEssentialListStore'),
							width: 300,

							fieldLabel: 'Business Essential',
							valueField: 'id',
							displayField: 'text',
							
		//			        typeAhead: true,
		//			        forceSelection: true,
		//			        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						}/*,{
							xtype: 'filterCombo',
							id: 'cbAdvSearchGapResponsibleW',
							store: AIR.AirStoreManager.getStoreByName('sisoogleGapResponsibleListStore'),//new Ext.data.Store(),//
							width: 300,

							fieldLabel: 'Gap Responsible',
							valueField: 'id',
							displayField: 'name',
							
		//			        typeAhead: true,
		//			        forceSelection: true,
		//			        autoSelect: false,
							
							triggerAction: 'all',
							lazyRender: true,
							lazyInit: false,
							mode: 'local'
						},{
							xtype: 'datefield',
							id: 'dfAdvSearchTargetDate',
							fieldLabel: 'Gap End Date',
							width: 150
						}*/]
					}]
		        }]
//		    }]
		});
		
		AIR.CiAdvancedSearchView.superclass.initComponent.call(this);
		
		var cbCat1 = this.getComponent('advsearchObjectType');
		cbCat1.on('select', this.onCat1Select, this);//select beforeselect
		cbCat1.on('change', this.onCat1Change, this);
		
		var cbAdvSearchITset = this.getComponent('cbAdvSearchITset');
		cbAdvSearchITset.on('change', this.onComboChange, this);
		

		
		var cbAdvSearchGeneralUsageW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchGeneralUsageW');
		cbAdvSearchGeneralUsageW.on('change', this.onComboChange, this);

		var cbCat2 = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
		cbCat2.on('change', this.onComboChange, this);//onCat2Change
		
		var cbAdvSearchLifecycleStatusW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchLifecycleStatusW');
		cbAdvSearchLifecycleStatusW.on('change', this.onComboChange, this);
		
		
		var cbAdvSearchITSecGroupW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchITSecGroupW');
		cbAdvSearchITSecGroupW.on('change', this.onComboChange, this);
		var cbAdvSearchProcessW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchProcessW');
		cbAdvSearchProcessW.on('change', this.onComboChange, this);
//		var cbAdvSearchOStypeW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchOStypeW');
//		cbAdvSearchOStypeW.on('change', this.onComboChange, this);
//		var cbAdvSearchOSnameW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchOSnameW');
//		cbAdvSearchOSnameW.on('change', this.onComboChange, this);
		var cbAdvSearchSourceW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchSourceW');
		cbAdvSearchSourceW.on('change', this.onComboChange, this);
		var cbAdvSearchBusinessEssentialW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchBusinessEssentialW');
		cbAdvSearchBusinessEssentialW.on('change', this.onComboChange, this);
//		var cbAdvSearchGapResponsibleW = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('cbAdvSearchGapResponsibleW');
//		cbAdvSearchGapResponsibleW.on('change', this.onComboChange, this);
//		var dfAdvSearchTargetDate = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes').getComponent('dfAdvSearchTargetDate');
//		dfAdvSearchTargetDate.on('change', this.onComboChange, this);
		
		var lvAdvSearchOrganisationalScope = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('lvAdvSearchOrganisationalScope');
		lvAdvSearchOrganisationalScope.on('selectionchange', this.onOrganisationalScopeChange, this);
		
		
//		var pAdvSearchAppOwner = this.getComponent('advsearchowner').getComponent('pAdvSearchAppOwner');
//		var pAdvSearchAppOwnerDelegate = this.getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate');
//		var pAdvSearchCiOwner = this.getComponent('advsearchowner').getComponent('pAdvSearchCiOwner');
//		var pAdvSearchCiOwnerDelegate = this.getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate');
//		var pAdvSearchSteward = this.getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward');		
		
		var clAdvSearchAppOwnerAddPerson = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerAdd');//pAdvSearchAppOwner.getComponent('clAdvSearchAppOwnerAddPerson');
		var clAdvSearchAppOwnerRemove = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerRemove');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddPerson');

		var clAdvSearchAppOwnerDelegateAddPerson = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateAdd');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddPerson');
		var clAdvSearchAppOwnerDelegateAddGroup = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateAddGroup');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddGroup');
		var clAdvSearchAppOwnerDelegateRemove = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateRemove');//pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddPerson');
		
		var clAdvSearchStewardAddPerson = this.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardAdd');//pAdvSearchSteward.getComponent('clAdvSearchStewardAddPerson');
		var clAdvSearchStewardRemove = this.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardRemove');//pAdvSearchSteward.getComponent('clAdvSearchStewardAddPerson');
		
		var clAdvSearchCiOwnerAddPerson = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleAdd');//pAdvSearchAppOwner.getComponent('clAdvSearchAppOwnerAddPerson');//pAdvSearchCiOwner.getComponent('clAdvSearchCiOwnerAddPerson');
		var clAdvSearchCiOwnerRemove = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleRemove');//pAdvSearchAppOwner.getComponent('clAdvSearchAppOwnerAddPerson');//pAdvSearchCiOwner.getComponent('clAdvSearchCiOwnerAddPerson');
		
		var clAdvSearchCiOwnerDelegateAddPerson = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleAdd');//pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddPerson');
		var clAdvSearchCiOwnerDelegateAddGroup = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleAddGroup');//pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddGroup');
		var clAdvSearchCiOwnerDelegateRemove = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleRemove');//pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddPerson');		

		
		clAdvSearchAppOwnerAddPerson.on('click', this.onAdvSearchAppOwnerAddPerson, this);
		clAdvSearchAppOwnerRemove.on('click', this.onAdvSearchAppOwnerRemove, this);
		
		clAdvSearchAppOwnerDelegateAddPerson.on('click', this.onAdvSearchAppOwnerDelegateAddPerson, this);
		clAdvSearchAppOwnerDelegateAddGroup.on('click', this.onAdvSearchAppOwnerDelegateAddGroup, this);
		clAdvSearchAppOwnerDelegateRemove.on('click', this.onAdvSearchAppOwnerDelegateRemove, this);
		
		clAdvSearchStewardAddPerson.on('click', this.onAdvSearchStewardAddPerson, this);
		clAdvSearchStewardRemove.on('click', this.onAdvSearchStewardRemove, this);

		clAdvSearchCiOwnerAddPerson.on('click', this.onAdvSearchCiOwnerAddPerson, this);
		clAdvSearchCiOwnerRemove.on('click', this.onAdvSearchCiOwnerRemove, this);
		
		clAdvSearchCiOwnerDelegateAddPerson.on('click', this.onAdvSearchCiOwnerDelegateAddPerson, this);
		clAdvSearchCiOwnerDelegateAddGroup.on('click', this.onAdvSearchCiOwnerDelegateAddGroup, this);
		clAdvSearchCiOwnerDelegateRemove.on('click', this.onAdvSearchCiOwnerDelegateRemove, this);
	},
	
	onOrganisationalScopeChange: function(listview, selections) {
		AIR.CiDetailsCommon.orgScopeChange(listview, selections);
	},
	
	onCat1Select: function(store, record, options) {
		var cbCat2 = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
		//cbCat2.getStore().filter('applicationCat1Id', record.get('id'));
		var filterData = {
			applicationCat1Id: record.get('id')
		};
		cbCat2.filterByData(filterData);
		cbCat2.clearValue();
		
		this.processCat1Change(record.get('id'));
	},
	onCat1Change: function(combo, newValue, oldValue) {
		this.isComboValueValid(combo, newValue, oldValue);
		this.processCat1Change(newValue);
	},
	
	processCat1Change: function(newValue) {
    	var labels = AIR.AirApplicationManager.getLabels();
    	
    	var fsCIOwner = this.getComponent('fs' + this.ownerId + 'CIOwner');
    	var fsApplicationOwner = this.getComponent('fs' + this.ownerId + 'ApplicationOwner');
    	var fsApplicationSteward = this.getComponent('fs' + this.ownerId + 'ApplicationSteward');
    	
    	var rgAdvSearchBARrelevance = this.getComponent('rgAdvSearchBARrelevance');
    	var lvAdvSearchOrganisationalScope = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('lvAdvSearchOrganisationalScope');
    	
    	var label;
    	
    	
//		fsApplicationOwner.setVisible(true);
//		fsApplicationSteward.setVisible(true);
		label = labels.label_details_ciOwner;
		var isCat1AppOrNone = true;
		
    	
    	switch(newValue) {
    		case '':
	    		var cbCat2 = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
	    		cbCat2.reset();
	    		
	    		break;
    		case AC.APP_CAT1_APPLICATION:
        		label = labels.applicationManager;
    			break;
    		default:
//        		fsApplicationOwner.setVisible(false);
//    			fsApplicationSteward.setVisible(false);
    			isCat1AppOrNone = false;
    			break;
    	}
    	
    	fsCIOwner.setTitle(label);
		fsApplicationOwner.setVisible(isCat1AppOrNone);
		fsApplicationSteward.setVisible(isCat1AppOrNone);
		
		rgAdvSearchBARrelevance.setVisible(isCat1AppOrNone);
		lvAdvSearchOrganisationalScope.setVisible(isCat1AppOrNone);
		
    	this.doLayout();
	},
	
	
	onComboChange: function(combo, newValue, oldValue) {//onCat2Change
		this.isComboValueValid(combo, newValue, oldValue);
	},
	
	onAdvSearchAppOwnerAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner'), event);
	},
	onAdvSearchAppOwnerRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner'), event);
	},
	
	
	onAdvSearchAppOwnerDelegateAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate'), event);
	},
	onAdvSearchAppOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(
			null, this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate'), event, 'none');
	},
	onAdvSearchAppOwnerDelegateRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate'), event, 'none');
	},
	
	
	onAdvSearchStewardAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward'), event);
	},
	onAdvSearchStewardRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward'), event);
	},
	
	
	onAdvSearchCiOwnerAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible'), event);
	},
	onAdvSearchCiOwnerRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible'), event);
	},
	
	
	onAdvSearchCiOwnerDelegateAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible'), event);
	},
	onAdvSearchCiOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(
			null, this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible'), event, 'none');
	},
	onAdvSearchCiOwnerDelegateRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			null, this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible'), event);
	},

	
	onPersonAdded: function(record, element, hiddenElement) {
		element.setValue(record.data.cwid);
	},
	
	
	updateLabels: function(labels) {
		this.setTitle(labels.advsearchPanelTitle);
		
		this.setFieldLabel(this.getComponent('advsearchObjectType'), labels.advsearchObjectType);
		this.setFieldLabel(this.getComponent('advsearchdescription'), labels.advsearchdescription);
		this.setFieldLabel(this.getComponent('cbAdvSearchITset'), labels.itSet);
		this.setFieldLabel(this.getComponent('rgAdvSearchBARrelevance'), labels.rgBARrelevance);
		this.setBoxLabel(this.getComponent('rgAdvSearchBARrelevance').items.items[0], labels.general_yes);
		this.setBoxLabel(this.getComponent('rgAdvSearchBARrelevance').items.items[1], labels.general_no);
		this.setBoxLabel(this.getComponent('rgAdvSearchBARrelevance').items.items[2], labels.complianceUndefined);
		
		this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent('label' + this.ownerId + 'applicationOwner').setText(labels.applicationOwner);
		this.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent('label' + this.ownerId + 'applicationSteward').setText(labels.applicationSteward);
		this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent('label' + this.ownerId + 'applicationOwnerDelegate').setText(labels.applicationOwnerDelegate);

		this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent('label' + this.ownerId + 'ciResponsible').setText(labels.ciResponsible);
		this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent('label' + this.ownerId + 'ciSubResponsible').setText(labels.ciSubResponsible);

		var fsCategoriesAndStatus = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
		var fsSpecialSearchAttributes = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
		
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW'), labels.operationalStatus);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW'), labels.applicationCat2);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW'), labels.lifecycleStatus);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('lvAdvSearchOrganisationalScope'), labels.organisationalScope);
		
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW'), labels.compliance1435WindowItSecGroup);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW'), labels.businessProcess);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW'), labels.businessEssential);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW'), labels.osType);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW'), labels.osName);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW'), labels.source);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate'), labels.applicationCat2);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW'), labels.gapResponsible);
	},
	
	update: function(data) {
		
	
		
	    var field = this.getComponent('advsearchObjectType');
	    field.setValue(data.advsearchObjectTypeId);
	    
	    field = this.getComponent('advsearchdescription');
	    field.setValue(data.advsearchdescription);
	    
	    field = this.getComponent('cbAdvSearchITset');
    	field.setValue(data.itSetId);
	    
    	this.processCat1Change(data.advsearchObjectTypeId);
    	
	    if(data.advsearchObjectTypeId === AC.APP_CAT1_APPLICATION || data.advsearchObjectTypeId.length === 0) {
	    	this.getComponent('rgAdvSearchBARrelevance').setValue(data.barRelevance);

	    	field = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwner');
	    	if(data.advsearchappowner && data.advsearchappowner.length > 0)
	    		field.setValue(data.advsearchappowner);
	    	else field.reset();
	    	
	    	field = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent(this.ownerId + 'applicationOwnerHidden');
	    	if(data.advsearchappownerHidden && data.advsearchappownerHidden.length > 0)
	    		field.setValue(data.advsearchappownerHidden);
	    	else field.reset();
	    	
	    	
	    	field = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegate');
	    	if(data.advsearchappdelegate && data.advsearchappdelegate.length > 0)
	    		field.setValue(data.advsearchappdelegate);
	    	else field.reset();
	    	
	    	field = this.getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent(this.ownerId + 'applicationOwnerDelegateHidden');
	    	if(data.advsearchappdelegateHidden && data.advsearchappdelegateHidden.length > 0)
	    		field.setValue(data.advsearchappdelegateHidden);
	    	else field.reset();
	    	
	    	
	    	field = this.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationSteward');
	    	if(data.advsearchsteward && data.advsearchsteward.length > 0)
	    		field.setValue(data.advsearchsteward);
	    	else field.reset();
	    	
	    	field = this.getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent(this.ownerId + 'applicationStewardHidden');
	    	if(data.advsearchstewardHidden && data.advsearchstewardHidden.length > 0)
	    		field.setValue(data.advsearchstewardHidden);
	    	else field.reset();
	    }
	    
    	field = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsible');
    	if(data.advsearchciowner && data.advsearchciowner.length > 0)
    		field.setValue(data.advsearchciowner);
    	else field.reset();
    	
    	field = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent(this.ownerId + 'ciResponsibleHidden');
    	if(data.advsearchciownerHidden && data.advsearchciownerHidden.length > 0)
    		field.setValue(data.advsearchciownerHidden);
    	else field.reset();
	    
    	
    	field = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsible');
    	if(data.advsearchcidelegate && data.advsearchcidelegate.length > 0)
    		field.setValue(data.advsearchcidelegate);
    	else field.reset();
    	
    	field = this.getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent(this.ownerId + 'ciSubResponsibleHidden');
    	if(data.advsearchcidelegateHidden && data.advsearchcidelegateHidden.length > 0)
    		field.setValue(data.advsearchcidelegateHidden);
    	else field.reset();
    	
	    
	    
	    var pAdditionalSearchAttributes = this.getComponent('pAdditionalSearchAttributes');
	    
	    if(data.isAdvSearchExt) {//!
	    	var fsCategoriesAndStatus = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
	    	var fsSpecialSearchAttributes = this.getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
	    	
	    	
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW');
			if(data.advsearchoperationalstatusid && data.advsearchoperationalstatusid.length > 0)
				field.setValue(data.advsearchoperationalstatusid);
			else field.reset();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW');
			if(data.advsearchapplicationcat2id && data.advsearchapplicationcat2id.length > 0)
				field.setValue(data.advsearchapplicationcat2id);
			else field.reset();
			
			field = fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW');
			if(data.advsearchlifecyclestatusid && data.advsearchlifecyclestatusid.length > 0)
				field.setValue(data.advsearchlifecyclestatusid);
			else field.reset();
			
			var lvOrganisationalScope = fsCategoriesAndStatus.getComponent('lvAdvSearchOrganisationalScope');
			if(data.organisationalScope && data.organisationalScope.length > 0) {
				var scopes = data.organisationalScope.split(',');
				var store = lvOrganisationalScope.getStore();
				
				Ext.each(scopes, function(item, index, all) {
					var r = store.getAt(store.findExact('name', item));
					lvOrganisationalScope.select(r, true, true);
				});
			} else
				lvOrganisationalScope.clearSelections();
			
	    	
	    	
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW');
			if(data.itSecGroupId && data.itSecGroupId.length > 0)
				field.setValue(data.itSecGroupId);
			else field.reset();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW');
			if(data.advsearchprocessid && data.advsearchprocessid.length > 0)
				field.setValue(data.advsearchprocessid);
			else field.reset();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW');
//			if(data.osType && data.osType.length > 0)
//				field.setValue(data.osType);
//			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW');
//			if(data.osName && data.osName.length > 0)
//				field.setValue(data.osName);
//			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW');
			if(data.source && data.source.length > 0)
				field.setRawValue(data.source);
			else field.reset();
			
			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW');
			if(data.businessEssentialId && data.businessEssentialId.length > 0)
				field.setValue(data.businessEssentialId);
			else field.reset();
			
//			field = fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW');
//			if(data.gapResponsible && data.gapResponsible.length > 0)
//				field.setValue(data.gapResponsible);
//			else field.reset();
//			
//			field = fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate');
//			if(data.gapEndDate && data.gapEndDate.length > 0)
//				field.setValue(data.gapEndDate);
//			else field.reset();
	    }
	},
	
	reset: function(link) {
		if(!link) {
			var cbCat1 = this.getComponent('advsearchObjectType');
			cbCat1.reset();
			
			var cbCat2 = this.getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus').getComponent('cbAdvSearchITCategoryW');
			cbCat2.reset();
		
	    	var fsCIOwner = this.getComponent('fs' + this.ownerId + 'CIOwner');
	    	var fsApplicationOwner = this.getComponent('fs' + this.ownerId + 'ApplicationOwner');
	    	var fsApplicationSteward = this.getComponent('fs' + this.ownerId + 'ApplicationSteward');
	    	
	    	var labels = AIR.AirApplicationManager.getLabels();
	    	fsCIOwner.setTitle(labels.label_details_ciOwner);
	    	
	    	fsApplicationOwner.setVisible(true);//false
	    	fsApplicationSteward.setVisible(true);//false
	    	
//	    	this.expand(false);//wenn nach neuer Suche und neuem Tab kein expand()!!
//	    	this.setVisible(true);
		}
	}
});
Ext.reg('AIR.CiAdvancedSearchView', AIR.CiAdvancedSearchView);
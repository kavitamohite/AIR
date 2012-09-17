Ext.namespace('AIR');

AIR.CiAdvancedSearchView = Ext.extend(AIR.AirView, {
	
	initComponent: function() {
		this.ownerId = 'AdvSearch';
		var appOwnerStewardFieldsets = AIR.AirUiFactory.createAppOwnerStewardFieldsets(this.ownerId);
		
		Ext.apply(this, {
			title: 'Advanced Search Options',
		    padding: 10,
		    border: false,
		    hidden: true,
		    layout: 'column',
			
			autoScroll: true,

		    
		    bodyStyle: {
		    	backgroundColor: panelbgcolor,
		    	color: fontColor,
		    	fontFamily: fontType
		    },
		    
		    items: [{
				xtype: 'panel',
				id: 'pAdvancedSearch',
				layout: 'form',
				
				border: false,
				labelWidth: 100,
				
			    style: {
			    	marginRight: 10
			    },

				items: [{
					xtype: 'combo',
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
					xtype: 'combo',
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
			    }/*, {
		        	xtype: 'textfield',
		        	id: 'advsearchdescription',
		        	
		        	emptyText: '',
		        	width: 230,
		        	hidden: false,
		        	hasSearch: false
		        }*/,
		        appOwnerStewardFieldsets.fsApplicationOwner,
		        appOwnerStewardFieldsets.fsApplicationSteward,
		        appOwnerStewardFieldsets.fsCIOwner,
		        
		        {
		        	xtype: 'panel',
		        	id: 'pAdditionalSearchAttributes',
		        	layout: 'column',
		        	border: false,
		        		
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
							xtype: 'combo',
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
							xtype: 'combo',
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
							xtype: 'combo',
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
							xtype: 'combo',
							id: 'cbAdvSearchITSecGroupW',
							store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),
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
							xtype: 'combo',
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
						},{
							xtype: 'combo',
							id: 'cbAdvSearchOStypeW',
							store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),
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
							xtype: 'combo',
							id: 'cbAdvSearchOSnameW',
							store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),
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
						},{
							xtype: 'combo',
							id: 'cbAdvSearchSourceW',
							store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),
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
							xtype: 'combo',
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
						},{
							xtype: 'combo',
							id: 'cbAdvSearchGapResponsibleW',
							store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),
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
						}]			
					}]
		        }
		        	
			    
			    /*, {
			        xtype: 'fieldset',
			        id: 'advsearchowner',
			        title: 'Owner',
			        
//			        layout: 'form',//kein Layout form fit
			        labelWidth: 130,
//			        height: 300,
			        
			        
					items: [{
						xtype: 'container',
						id: 'pAdvSearchAppOwner',
						
						layout: 'column',
						style: {
							marginBottom: 5
						},
						
						items: [{
							xtype: 'label',
							id: 'labeladvsearchappowner',
							text: 'App owner',
							
							width: 130,
							style: {
								fontSize: 12
							}
			    		},{
							xtype: 'textfield',
					        width: 230,
					        id: 'advsearchappowner',
					        allowBlank: true,
					        
					        maskRe: /[a-zA-Z]/
//					        disabled: false,
//					        readOnly: true
					    },{
							xtype: 'hidden',
					        id: 'advsearchappownerHidden'
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchAppOwnerAddPerson',
					    	img: img_AddPerson
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchAppOwnerRemove',
					    	img: img_RemovePerson
					    }]
					},{
						xtype: 'container',
						id: 'pAdvSearchAppOwnerDelegate',
						
						layout: 'column',
						style: {
							marginBottom: 5
						},
						
						items: [{
							xtype: 'label',
							id: 'labeladvsearchappownerdelegate',
							text: 'App owner delegate',
							
							width: 130,
							style: {
								fontSize: 12
							}
			    		},{
							xtype: 'textfield',
					        width: 230,
					        id: 'advsearchappownerdelegate',
					        allowBlank: true,
					        
					        maskRe: /[a-zA-Z]/
//					        disabled: false,
//					        readOnly: true
					    },{
							xtype: 'hidden',
					        id: 'advsearchappownerdelegateHidden'
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchAppOwnerDelegateAddPerson',
					    	img: img_AddPerson
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchAppOwnerDelegateAddGroup',
					    	img: img_AddGroup
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchAppOwnerDelegateRemove',
					    	img: img_RemovePerson
					    }]
					},{
						xtype: 'container',
						id: 'pAdvSearchCiOwner',
						
						layout: 'column',
						style: {
							marginBottom: 5
						},
						
						items: [{
							xtype: 'label',
							id: 'labeladvsearchciowner',
							text: 'CI owner',
							
							width: 130,
							style: {
								fontSize: 12
							}
			    		},{
							xtype: 'textfield',
					        width: 230,
					        id: 'advsearchciowner',
					        allowBlank: true,
					        
					        maskRe: /[a-zA-Z]/
//					        disabled: false,
//					        readOnly: true
					    },{
							xtype: 'hidden',
					        id: 'advsearchciownerHidden'
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchCiOwnerAddPerson',
					    	img: img_AddPerson
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchCiOwnerRemove',
					    	img: img_RemovePerson
					    }]
					},{
						xtype: 'container',
						id: 'pAdvSearchCiOwnerDelegate',
						
						layout: 'column',
						style: {
							marginBottom: 5
						},
						
						items: [{
							xtype: 'label',
							id: 'labeladvsearchcidelegate',
							text: 'CI delegate',
							
							width: 130,
							style: {
								fontSize: 12
							}
			    		},{
							xtype: 'textfield',
					        width: 230,
					        id: 'advsearchcidelegate',
					        allowBlank: true,
					        
					        maskRe: /[a-zA-Z]/
//					        disabled: false,
//					        readOnly: true
					    },{
							xtype: 'hidden',
					        id: 'advsearchcidelegateHidden'
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchCiOwnerDelegateAddPerson',
					    	img: img_AddPerson
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchCiOwnerDelegateAddGroup',
					    	img: img_AddGroup
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchAppOwnerDelegateRemove',
					    	img: img_RemovePerson
					    }]
					}]
		        }, {
			        xtype: 'fieldset',
			        id: 'fsAdvSearchSteward',
			        
//			        layout: 'form',//kein Layout form fit
			        labelWidth: 130,
//			        height: 300,
			        
			        
					items: [{
						xtype: 'container',
						id: 'pAdvSearchSteward',
						
						layout: 'column',
						style: {
							marginBottom: 5
						},
						
						items: [{
							xtype: 'label',
							id: 'labeltfAdvSearchSteward',
//							text: 'x',
							
							width: 130,
							style: {
								fontSize: 12
							}
			    		},{
							xtype: 'textfield',
					        width: 230,
					        id: 'tfAdvSearchSteward',
					        allowBlank: true,
					        
					        maskRe: /[a-zA-Z]/
//					        disabled: false,
//					        readOnly: true
					    },{
							xtype: 'hidden',
					        id: 'tfAdvSearchStewardHidden'
					    },{
					    	xtype: 'commandlink',
					    	id: 'clAdvSearchStewardAddPerson',
					    	img: img_AddPerson
					    }]
					}]
		        }*/]
		    }
		    
		    
		    /*, {
			    xtype: 'fieldset',
			    id: 'advsearchplusfieldset',
			    title: 'Advanced Search Plus',
			    
//				columnWidth: 0.33,//0.45
			    width: 530,

			    padding: 10,
			    hidden: true,
			    
			    layout: 'form',//form fit
			    labelWidth: 180,
			    
				items: [{
					xtype: 'combo',
					id: 'advsearchoperationalStatus',
				    store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),
			        width: 300,

				    fieldLabel: 'Operational Status',
				    valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			    }, {
					xtype: 'filterCombo',//combo
					id: 'advsearchcategory',
				    store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),
			        width: 300,

					lastQuery: '',
				    fieldLabel: 'Category',
				    valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			    }, {
					xtype: 'combo',
					id: 'advsearchlifecyclestatus',
				    store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),
			        width: 300,
					
				    fieldLabel: 'Lifecycle status',
				    valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			    }, {
					xtype: 'combo',
					id: 'advsearchprocess',
				    store: AIR.AirStoreManager.getStoreByName('processListStore'),
			        width: 300,

			        tpl: '<tpl for="."><div ext:qtip="{text}" class="x-combo-list-item">{text}</div></tpl>',
				    fieldLabel: 'Business Prozess',
				    valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			    }]
		    }*/]
		});
		
		AIR.CiAdvancedSearchView.superclass.initComponent.call(this);
		
		var cbCat1 = this.getComponent('pAdvancedSearch').getComponent('advsearchObjectType');
		cbCat1.on('select', this.onCat1Select, this);
		cbCat1.on('change', this.onCat1Change, this);
		
		/*
		var cbCat2 = this.getComponent('advsearchplusfieldset').getComponent('advsearchcategory');
		cbCat2.on('change', this.onCat2Change, this);
		
		
		
		var pAdvSearchAppOwner = this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwner');
		var pAdvSearchAppOwnerDelegate = this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate');
		var pAdvSearchCiOwner = this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwner');
		var pAdvSearchCiOwnerDelegate = this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate');
		var pAdvSearchSteward = this.getComponent('pAdvancedSearch').getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward');		
		
		var clAdvSearchAppOwnerAddPerson = pAdvSearchAppOwner.getComponent('clAdvSearchAppOwnerAddPerson');
		var clAdvSearchAppOwnerDelegateAddPerson = pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddPerson');
		var clAdvSearchAppOwnerDelegateAddGroup = pAdvSearchAppOwnerDelegate.getComponent('clAdvSearchAppOwnerDelegateAddGroup');
		
		var clAdvSearchCiOwnerAddPerson = pAdvSearchCiOwner.getComponent('clAdvSearchCiOwnerAddPerson');
		var clAdvSearchCiOwnerDelegateAddPerson = pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddPerson');
		var clAdvSearchCiOwnerDelegateAddGroup = pAdvSearchCiOwnerDelegate.getComponent('clAdvSearchCiOwnerDelegateAddGroup');
		
		var clAdvSearchStewardAddPerson = pAdvSearchSteward.getComponent('clAdvSearchStewardAddPerson');

		
		clAdvSearchAppOwnerAddPerson.on('click', this.onAdvSearchAppOwnerAddPerson, this);
		clAdvSearchAppOwnerDelegateAddPerson.on('click', this.onAdvSearchAppOwnerDelegateAddPerson, this);
		clAdvSearchAppOwnerDelegateAddGroup.on('click', this.onAdvSearchAppOwnerDelegateAddGroup, this);
		
		clAdvSearchCiOwnerAddPerson.on('click', this.onAdvSearchCiOwnerAddPerson, this);
		clAdvSearchCiOwnerDelegateAddPerson.on('click', this.onAdvSearchCiOwnerDelegateAddPerson, this);
		clAdvSearchCiOwnerDelegateAddGroup.on('click', this.onAdvSearchCiOwnerDelegateAddGroup, this);
		
		clAdvSearchStewardAddPerson.on('click', this.onAdvSearchStewardAddPerson, this);
		*/
	},
	
	onCat1Select: function(store, record, options) {
		var cbCat2 = this.getComponent('advsearchplusfieldset').getComponent('advsearchcategory');
		//cbCat2.getStore().filter('applicationCat1Id', record.get('id'));
		var filterData = {
			applicationCat1Id: record.get('id')
		};
		cbCat2.filterByData(filterData);
		cbCat2.clearValue();
	},
	onCat1Change: function(combo, newValue, oldValue) {
		this.isComboValueValid(combo, newValue, oldValue);
		
    	if(newValue.length === 0) {
    		var cbCat2 = this.getComponent('advsearchplusfieldset').getComponent('advsearchcategory');
    		cbCat2.reset();
    		cbCat2.getStore().clearFilter();
    	}
	},
	
	onCat2Change: function(combo, newValue, oldValue) {
		this.isComboValueValid(combo, newValue, oldValue);
	},
	
	onAdvSearchAppOwnerAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwner').getComponent('advsearchappowner'), event);
	},
	onAdvSearchAppOwnerDelegateAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate').getComponent('advsearchappownerdelegate'), event);
	},
	onAdvSearchAppOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(
			null, this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate').getComponent('advsearchappownerdelegate'), event, 'none');
	},
	
	
	onAdvSearchCiOwnerAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwner').getComponent('advsearchciowner'), event);
	},
	onAdvSearchCiOwnerDelegateAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate').getComponent('advsearchcidelegate'), event);
	},
	onAdvSearchCiOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(
			null, this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate').getComponent('advsearchcidelegate'), event, 'none');
	},
	
	onAdvSearchStewardAddPerson: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			null /*this.onPersonAdded*/, this.getComponent('pAdvancedSearch').getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward').getComponent('tfAdvSearchSteward'), event);
	},
	
	onPersonAdded: function(record, element, hiddenElement) {
		element.setValue(record.data.cwid);
	},
	
	
	updateLabels: function(labels) {
		this.setTitle(labels.advsearchPanelTitle);
		
		this.setFieldLabel(this.getComponent('pAdvancedSearch').getComponent('advsearchObjectType'), labels.advsearchObjectType);
//		this.setFieldLabel(this.getComponent('pAdvancedSearch').getComponent('advsearchdescription'), labels.advsearchdescription);
		
		
		this.getComponent('pAdvancedSearch').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwner').getComponent('label' + this.ownerId + 'applicationOwner').setText(labels.applicationOwner);
		this.getComponent('pAdvancedSearch').getComponent('fs' + this.ownerId + 'ApplicationSteward').getComponent('p' + this.ownerId + 'ApplicationSteward').getComponent('label' + this.ownerId + 'applicationSteward').setText(labels.applicationSteward);
		this.getComponent('pAdvancedSearch').getComponent('fs' + this.ownerId + 'ApplicationOwner').getComponent('p' + this.ownerId + 'ApplicationOwnerDelegate').getComponent('label' + this.ownerId + 'applicationOwnerDelegate').setText(labels.applicationOwnerDelegate);

		this.getComponent('pAdvancedSearch').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CIOwner').getComponent('label' + this.ownerId + 'ciResponsible').setText(labels.ciResponsible);
		this.getComponent('pAdvancedSearch').getComponent('fs' + this.ownerId + 'CIOwner').getComponent('p' + this.ownerId + 'CiSubResponsible').getComponent('label' + this.ownerId + 'ciSubResponsible').setText(labels.ciSubResponsible);

		var fsCategoriesAndStatus = this.getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes').getComponent('fsCategoriesAndStatus');
		var fsSpecialSearchAttributes = this.getComponent('pAdvancedSearch').getComponent('pAdditionalSearchAttributes').getComponent('fsSpecialSearchAttributes');
		
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW'), labels.operationalStatus);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchITCategoryW'), labels.applicationCat2);
		this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchLifecycleStatusW'), labels.lifecycleStatus);
		
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchITSecGroupW'), labels.compliance1435WindowItSecGroup);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchProcessW'), labels.businessProcess);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchOStypeW'), labels.lifecycleStatus);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchOSnameW'), labels.operationalStatus);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchSourceW'), labels.applicationCat2);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchBusinessEssentialW'), labels.businessEssential);
		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('cbAdvSearchGapResponsibleW'), labels.complianceWindowGapResponsible);
//		this.setFieldLabel(fsSpecialSearchAttributes.getComponent('dfAdvSearchTargetDate'), labels.applicationCat2);
		
//		itsetName
		/*
		//pAdvancedSearch/advsearchowner
		this.getComponent('pAdvancedSearch').getComponent('advsearchowner').setTitle(labels.advsearchowner);
		this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwner').getComponent('labeladvsearchappowner').setText(labels.advsearchappowner);
		this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchAppOwnerDelegate').getComponent('labeladvsearchappownerdelegate').setText(labels.advsearchappownerdelegate);
		this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwner').getComponent('labeladvsearchciowner').setText(labels.advsearchciowner);
		this.getComponent('pAdvancedSearch').getComponent('advsearchowner').getComponent('pAdvSearchCiOwnerDelegate').getComponent('labeladvsearchcidelegate').setText(labels.advsearchcidelegate);
		this.getComponent('pAdvancedSearch').getComponent('fsAdvSearchSteward').getComponent('pAdvSearchSteward').getComponent('labeltfAdvSearchSteward').setText(labels.advsearchsteward);
		
		
		this.getComponent('advsearchplusfieldset').setTitle(labels.advsearchplusfieldset);
		this.setFieldLabel(this.getComponent('advsearchplusfieldset').getComponent('advsearchlifecyclestatus'), labels.lifecycleStatus);
		this.setFieldLabel(this.getComponent('advsearchplusfieldset').getComponent('advsearchoperationalStatus'), labels.operationalStatus);
		this.setFieldLabel(this.getComponent('advsearchplusfieldset').getComponent('advsearchcategory'), labels.applicationCat2);
		this.setFieldLabel(this.getComponent('advsearchplusfieldset').getComponent('advsearchprocess'), labels.businessProcess);
		*/
	}
});
Ext.reg('AIR.CiAdvancedSearchView', AIR.CiAdvancedSearchView);
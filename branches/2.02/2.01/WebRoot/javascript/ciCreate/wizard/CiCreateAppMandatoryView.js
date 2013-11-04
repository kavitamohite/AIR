Ext.namespace('AIR');

AIR.CiCreateAppMandatoryView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    
//			height: 300,
		    labelWidth: 250,//200 180
		    
		    items: [/*{
				xtype: 'combo',
				id: 'wizardapplicationCat2',
			    fieldLabel: 'Category',
			    valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
//		        editable: false,
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        
		        mode: 'local',
		        allowBlank: false,
		        width: 250,
		        msgTarget: 'under',
		        
		        store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore')
		    },{
		    	xtype: 'container',
		    	html: '&nbsp;'
		    },*/{
		    	xtype: 'textfield',
		        id: 'tfCiNameW',

		        width: 250,
		        fieldLabel: 'Name'

//		        allowBlank: false//true,
//		        vtype: 'allowedName',
//		        validationDelay: 500,//500 100
//		        msgTarget: 'under'
		    },{
	      		xtype: 'panel',
	    		id: 'pSapNameW',
	    		  
	    		layout: 'column',//fit
	    		border: false,
	    		hidden: true,

	    		style: {
	    			marginBottom: 4
	    		},
	    		  
	    		items: [{
	    			xtype: 'label',
	    			id: 'lSapName1W',
	    			
	    			width: 255,//205 185
	    			style: {
	    				fontSize: 12.5
	    			}
	    		},{
	        		xtype: 'textfield',
	        		id: 'tfSapName1W',
	        		  
	        		maskRe: /[0-9A-Z]/, // /[0-9a-zA-Z#=\+\-\_\/\\. ]/,
	        		vtype: 'sapNamePart1',
	        		allowBlank: false,
	        		  
	    			width: 110
	        	}, {
	        		xtype: 'textfield',
	        		width: 20,
	    			value: 'M',
	    			disabled: true
	        	}, {
	        		xtype: 'textfield',
	        		id: 'tfSapName2W',
	        		  
	        		maskRe: /[0-9]/,
	        		vtype: 'sapNamePart2_3',
	        		allowBlank: false,
	        		  
	    			width: 50
	        	}, {
	        		xtype: 'textfield',
	        		width: 20,
	    			value: 'C',
	    			disabled: true
	        	}, {
	        		xtype: 'textfield',
	        		id: 'tfSapName3W',
	        		  
	        		maskRe: /[0-9]/,
	        		vtype: 'sapNamePart2_3',
	        		allowBlank: false,
	        		  
	    			width: 50
	    		}]
		    },{
	            xtype: 'radiogroup',
    			id: 'rgBARrelevanceW',
    			width: 250,
    			fieldLabel: 'BAR relevant',
    			
    			columns: 3,

	            items: [
                    { id: 'rgBARrelevanceYesW',		itemId: 'rgBARrelevanceYesW', 			boxLabel: 'Yes',		name: 'rgBARrelevanceW', inputValue: 'Y', width: 80, checked: true },
	                { id: 'rgBARrelevanceNoW',		itemId: 'rgBARrelevanceNoW',			boxLabel: 'No',			name: 'rgBARrelevanceW', inputValue: 'N', width: 80 }
	            ]
	        },{
		    	xtype: 'textarea',
		        width: 250,
		        height: 75,
		        
		        fieldLabel: 'Description',
		        id: 'taCiDescriptionW',//wizardcomments
		        allowBlank: true,
		        msgTarget: 'under'
		    },{
		        xtype: 'filterCombo',//combo
		        width: 250,
//		        anchor: '70%',//siehe (*1)
		        fieldLabel: 'Lifecycle',
		        
		        id: 'cbLifecycleStatusW',
		        store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),//lifecycleStatusListStore,
		        valueField: 'id',
		        displayField: 'text',
//		        editable: false,
		        
//		        typeAhead: true,
		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    },{
		        xtype: 'listview',//grid
		        width: 80,
		        //height: 170,//150
//		        frame: true,
		        border: false,
		        fieldLabel: 'Organisational scope',
		        
		        id: 'lvOrganisationalScopeW',
		        store: AIR.AirStoreManager.getStoreByName('organisationalScopeListStore'),
		        
		        singleSelect: false,
		        multiSelect: true,
		        simpleSelect: true,
		        hideHeaders: true,
		        
		        columns: [
					{ dataIndex: 'id', hidden: true, hideLabel: true, width: .001 },
					{ dataIndex: 'name' }
		        ]
	    	}/*,{
		        xtype: 'combo',
		        width: 250,
//		        anchor: '70%',//siehe (*1)
//		        fieldLabel: 'Organisational Scope',
		        
		        id: 'cbOrganisationalScopeW',//cbOrganisationalScopeW
		        store: AIR.AirStoreManager.getStoreByName('organisationalScopeListStore'),
		        valueField: 'id',
		        displayField: 'name',
		        editable: false,
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    }*/,{
		        xtype: 'fieldset',
		        id: 'fsApplicationOwnerW',
		        title: 'Application Owner',
		        labelWidth: 200,
		        width: 600,
		        
//		        layout: 'form',//fit
		        style: {
		        	marginTop: 20
		        },
		        
				items: [{
			    	xtype: 'panel',
					id: 'pApplicationOwnerW',
					border: false,
					
					layout: 'column',//toolbar hbox
					
					items: [{
						xtype: 'label',
						id: 'labeltfApplicationOwnerW',
						
						width: 245,//255 205 185
						style: {
							fontSize: 12.5
						}
		    		},{
						xtype: 'textfield',
				        width: 250,
				        id: 'tfApplicationOwnerW',//value: 'Pepping, Simon (ERCVA)',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'tfApplicationOwnerWHidden' //value: 'ERCVA'
				    },{
				    	xtype: 'commandlink',
				    	id: 'clApplicationOwnerAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'clApplicationOwnerRemove',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'panel',
					id: 'pApplicationOwnerDelegateW',
					border: false,
					
					layout: 'column',//toolbar hbox
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labeltfApplicationOwnerDelegateW',
						
						width: 245,//255 205 185
						style: {
							fontSize: 12.5
						}
		    		},{
						xtype: 'textfield',
				        width: 250,
				        id: 'tfApplicationOwnerDelegateW',//value: 'Pepping, Simon (ERCVA)',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'tfApplicationOwnerDelegateWHidden'//,value: 'ERCVA'
				    },{
				    	xtype: 'commandlink',
				    	id: 'clApplicationOwnerDelegateAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'clApplicationOwnerDelegateAddGroup',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'clApplicationOwnerDelegateRemove',
				    	img: img_RemovePerson
				    }]
				}]
			},{
		        xtype: 'fieldset',
		        id: 'fsApplicationStewardW',
		        labelWidth: 200,
		        width: 600,
				
				items: [{
					xtype: 'panel',
					id: 'pApplicationStewardW',
					border: false,
					
					layout: 'column',//toolbar hbox
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labeltfApplicationStewardW',
						
						width: 245,//255 205 185
						style: {
							fontSize: 12.5
						}
		    		},{
						xtype: 'textfield',
				        width: 250,
				        id: 'tfApplicationStewardW',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'tfApplicationStewardWHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'clApplicationStewardAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'clApplicationStewardRemove',
				    	img: img_RemovePerson
				    }]
				}]
			}]
		});
		
		AIR.CiCreateAppMandatoryView.superclass.initComponent.call(this);
		
		var clApplicationOwnerAdd = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('clApplicationOwnerAdd');
		var clApplicationOwnerRemove = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('clApplicationOwnerRemove');
		clApplicationOwnerAdd.on('click', this.onApplicationOwnerAdd, this);
		clApplicationOwnerRemove.on('click', this.onApplicationOwnerRemove, this);
		
		var clApplicationStewardAdd = this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('clApplicationStewardAdd');//fsApplicationOwnerW
		var clApplicationStewardRemove = this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('clApplicationStewardRemove');//fsApplicationOwnerW
		clApplicationStewardAdd.on('click', this.onApplicationStewardAdd, this);
		clApplicationStewardRemove.on('click', this.onApplicationStewardRemove, this);
		
		var clApplicationOwnerDelegateAdd = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('clApplicationOwnerDelegateAdd');
		var clApplicationOwnerDelegateAddGroup = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('clApplicationOwnerDelegateAddGroup');
		var clApplicationOwnerDelegateRemove = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('clApplicationOwnerDelegateRemove');
		clApplicationOwnerDelegateAdd.on('click', this.onApplicationOwnerDelegateAdd, this);
		clApplicationOwnerDelegateAddGroup.on('click', this.onApplicationOwnerDelegateAddGroup, this);
		clApplicationOwnerDelegateRemove.on('click', this.onApplicationOwnerDelegateRemove, this);
		
		
//		var clApplicationOwnerCompanyAdd = this.getComponent('pApplicationOwnerCompanyW').getComponent('clApplicationOwnerCompanyAdd');
//		var clApplicationOwnerCompanyAddGroup = this.getComponent('pApplicationOwnerCompanyW').getComponent('clApplicationOwnerCompanyAddGroup');
//		var clApplicationOwnerCompanyRemove = this.getComponent('pApplicationOwnerCompanyW').getComponent('clApplicationOwnerCompanyRemove');
//		clApplicationOwnerCompanyAdd.on('click', this.onApplicationOwnerCompanyAdd, this);
//		clApplicationOwnerCompanyAddGroup.on('click', this.onApplicationOwnerCompanyAddGroup, this);
//		clApplicationOwnerCompanyRemove.on('click', this.onApplicationOwnerCompanyRemove, this);
		
		var lvOrganisationalScope = this.getComponent('lvOrganisationalScopeW');
		lvOrganisationalScope.on('selectionchange', this.onOrganisationalScopeChange, this);
	},
	
	update: function(data) {
		var isApplicationCi = data.applicationCat1Id == AC.APP_CAT1_APPLICATION;
		
		var rgBARrelevanceW = this.getComponent('rgBARrelevanceW');
		var lvOrganisationalScope = this.getComponent('lvOrganisationalScopeW');
		
		var fsApplicationOwnerW = this.getComponent('fsApplicationOwnerW');
		var fsApplicationStewardW = this.getComponent('fsApplicationStewardW');
		
		rgBARrelevanceW.setVisible(isApplicationCi);
		lvOrganisationalScope.setVisible(isApplicationCi);
		fsApplicationOwnerW.setVisible(isApplicationCi);
		fsApplicationStewardW.setVisible(isApplicationCi);
		
		var cbLifecycleStatusW = this.getComponent('cbLifecycleStatusW');
		
		var filterData = { tableId: AC.TABLE_ID_APPLICATION };
		cbLifecycleStatusW.filterByData(filterData);
	},

	
	onOrganisationalScopeChange: function(listview, selections) {
		var scopeRecords = listview.getSelectedRecords();

		var firstRecord = scopeRecords[0];
		var lastRecord = scopeRecords[scopeRecords.length - 1];
		
		if(scopeRecords.length > 0 && (firstRecord.get('name') === AC.ORG_SCOPE_DEFAULT || lastRecord.get('name') === AC.ORG_SCOPE_DEFAULT)) {
			var defaultRecord = firstRecord;
			if(defaultRecord.get('name') !== AC.ORG_SCOPE_DEFAULT)
				defaultRecord = lastRecord;
				
			listview.clearSelections();
			listview.select(defaultRecord, true, true);
		}
		
		this.fireEvent('ciChange', this, listview, selections);
	},
	
	onApplicationOwnerAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW'), event);
	},
	onApplicationOwnerRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW'), event);
	},
	
	
	onApplicationStewardAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('tfApplicationStewardW'), event);//fsApplicationOwnerW
	},
	onApplicationStewardRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('tfApplicationStewardW'), event);//fsApplicationOwnerW
	},
	
	
	onApplicationOwnerDelegateAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW'), event);
	},
	onApplicationOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW'), event, 'none');
	},
	onApplicationOwnerDelegateRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW'), event);
	},
	
	
//	onApplicationOwnerCompanyAdd: function(link, event) {
//		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW'), event);
//	},
//	onApplicationOwnerCompanyAddGroup: function(link, event) {
//		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW'), event, 'none');
//	},
//	onApplicationOwnerCompanyRemove: function(link, event) {
//		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW'), event);
//	},
	
	
	setData: function(params) {
//		switch(applicationCat1Id) {
//			case '':
			if(params.isCat2Sap) {
				var fieldValue = this.getComponent('pSapNameW').getComponent('tfSapName1W').getValue().trim()
								+ 'M' + this.getComponent('pSapNameW').getComponent('tfSapName2W').getValue()
								+ 'C' + this.getComponent('pSapNameW').getComponent('tfSapName3W').getValue();
				params.name = fieldValue;
			} else {
				var field = this.getComponent('tfCiNameW');
				params.name = field.getValue().trim();
			}
			
			if(this.getComponent('rgBARrelevanceW').getValue())
				params.barRelevance = this.getComponent('rgBARrelevanceW').getValue().inputValue;
			
			params.comments = this.getComponent('taCiDescriptionW').getValue();
			params.lifecycleStatusId = this.getComponent('cbLifecycleStatusW').getValue();
//			params.organisationalScope = this.getComponent('cbOrganisationalScopeW').getValue();
			params.applicationOwnerHidden = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerWHidden').getValue();
			params.applicationOwner = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW').getValue();
			params.applicationStewardHidden = this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('tfApplicationStewardWHidden').getValue();//fsApplicationOwnerW
			params.applicationSteward = this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('tfApplicationStewardW').getValue();//fsApplicationOwnerW
			params.applicationOwnerDelegateHidden = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateWHidden').getValue();
			params.applicationOwnerDelegate = this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW').getValue();
			delete params.isCat2Sap;
			
			var lvOrganisationalScopeW = this.getComponent('lvOrganisationalScopeW');
			var scopeRecords = lvOrganisationalScopeW.getSelectedRecords();
			var scopes = '';
			
			for(var i = 0; i < scopeRecords.length; i++) {
				if(scopes.length > 0)
					scopes += ',';
				
				scopes += scopeRecords[i].get('id');
			}
			
			if(scopes.length > 0)
				params.organisationalScope = scopes;

//				break;
//		}
		
	},
	
	reset: function() {
		this.getComponent('tfCiNameW').reset();
		this.getComponent('pSapNameW').getComponent('tfSapName1W').reset();
		this.getComponent('pSapNameW').getComponent('tfSapName2W').reset();
		this.getComponent('pSapNameW').getComponent('tfSapName3W').reset();
		this.getComponent('rgBARrelevanceW').setValue('Y');
		this.getComponent('taCiDescriptionW').reset();
		this.getComponent('cbLifecycleStatusW').reset();
		this.getComponent('lvOrganisationalScopeW').clearSelections();
		
		
		
		this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW').reset();
		this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerWHidden').reset();
		this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('tfApplicationStewardW').setValue(AIR.AirApplicationManager.getLastName() + ', ' + AIR.AirApplicationManager.getFirstName() + ' (' + AIR.AirApplicationManager.getCwid().toUpperCase()+')');//fsApplicationOwnerW
		this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('tfApplicationStewardWHidden').setValue(AIR.AirApplicationManager.getCwid().toUpperCase());//fsApplicationOwnerW
		this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW').reset();
		this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateWHidden').reset();
		
//		this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW').reset();
//		this.getComponent('tfApplicationIdW').reset();
		
		
	},
	
	updateLabels: function(labels) {
		this.setFieldLabel(this.getComponent('tfCiNameW'), labels.wizardapplicationName);
		
		var sapNameLabel = labels.wizardapplicationNameSAP + ' (' + labels.wizardapplicationNameSAP1 + ', ' + labels.wizardapplicationNameSAP2 + ', ' + labels.wizardapplicationNameSAP3 + ')';
		var lSapName1W = this.getComponent('pSapNameW').getComponent('lSapName1W');
		lSapName1W.setText(sapNameLabel);
		
		this.setFieldLabel(this.getComponent('taCiDescriptionW'), labels.comments);
		
		
		AIR.AirAclManager.setNecessity(this.getComponent('tfCiNameW'));
		if(lSapName1W.getEl())
			AIR.AirAclManager.setNecessity(this.getComponent('pSapNameW').getComponent('lSapName1W'));
		this.setFieldLabel(this.getComponent('rgBARrelevanceW'), labels.rgBARrelevance);
		this.setBoxLabel(this.getComponent('rgBARrelevanceW').items.items[0], labels.general_yes);
		this.setBoxLabel(this.getComponent('rgBARrelevanceW').items.items[1], labels.general_no);
		AIR.AirAclManager.setNecessity(this.getComponent('rgBARrelevanceW'));
		AIR.AirAclManager.setNecessity(this.getComponent('taCiDescriptionW'));
		
		
		this.setFieldLabel(this.getComponent('cbLifecycleStatusW'), labels.lifecycleStatus);
		AIR.AirAclManager.setNecessity(this.getComponent('cbLifecycleStatusW'));
		
//		this.setFieldLabel(this.getComponent('cbOrganisationalScopeW'), labels.organisationalScope);
//		AIR.AirAclManager.setNecessity(this.getComponent('cbOrganisationalScopeW'));
		this.setFieldLabel(this.getComponent('lvOrganisationalScopeW'), labels.organisationalScope);
		AIR.AirAclManager.setNecessity(this.getComponent('lvOrganisationalScopeW'));
		
		this.getComponent('fsApplicationOwnerW').setTitle(labels.fsApplicationOwner);
		this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('labeltfApplicationOwnerW').setText(labels.applicationOwner);//.el.dom.innerHTML = labels.applicationOwner;
		this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('labeltfApplicationStewardW').setText(labels.applicationSteward);//fsApplicationOwnerW
		this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('labeltfApplicationOwnerDelegateW').setText(labels.applicationOwnerDelegate);//.el.dom.innerHTML = labels.applicationOwnerDelegate;

		AIR.AirAclManager.setNecessity(this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerW').getComponent('labeltfApplicationOwnerW'));
		AIR.AirAclManager.setNecessity(this.getComponent('fsApplicationStewardW').getComponent('pApplicationStewardW').getComponent('labeltfApplicationStewardW'));//fsApplicationOwnerW
		AIR.AirAclManager.setNecessity(this.getComponent('fsApplicationOwnerW').getComponent('pApplicationOwnerDelegateW').getComponent('labeltfApplicationOwnerDelegateW'));
	}


});
Ext.reg('AIR.CiCreateAppMandatoryView', AIR.CiCreateAppMandatoryView);
Ext.namespace('AIR');

AIR.CiSpecificsAnwendungView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		this.objectAliasAllowedStore = AIR.AirStoreFactory.getObjectAliasAllowedStore();
		
		Ext.apply(this, {
			labelWidth: 200, // label settings here cascade unless overridden
		    
		    border: false,
		    layout: 'form',
		    
		    items: [{
		        xtype: 'textfield',
		    	fieldLabel: 'Application ID',
		        id: 'applicationId',
		        disabled: true,
		        hideLabel: true,
		        hidden: true,
//		        width: 230,
		        anchor: '70%'
		    },{
		        xtype: 'textfield',
		    	fieldLabel: 'Object Type',
		        id: 'objectType',
		        disabled: true,
		        hideLabel: true,
		        hidden: true,
//		        width: 230,
		        anchor: '70%'
		    }/*,{
		    	xtype: 'textfield',
//		        width: 230,
		        fieldLabel: 'Application Name',
		        id: 'applicationName',
		        hidden: true,
		        anchor: '70%',
		        
		        enableKeyEvents: true
		    }*/
		    ,{
	            xtype: 'radiogroup',
    			id: 'rgBARrelevance',
    			width: 250,
    			fieldLabel: 'BAR relevant',
    			
    			columns: 3,

	            items: [
                    { id: 'rgBARrelevanceYes',		itemId: 'rgBARrelevanceYes', 		boxLabel: 'Yes',	name: 'rgBARrelevance', inputValue: 'Y', width: 80 },//, width: 80 wenn gedatscht
	                { id: 'rgBARrelevanceNo',		itemId: 'rgBARrelevanceNo',			boxLabel: 'No',	name: 'rgBARrelevance', inputValue: 'N', width: 80 },
	                { id: 'rgBARrelevanceUndefined',itemId: 'rgBARrelevanceUndefined', 	boxLabel: 'Undefined',	name: 'rgBARrelevance', inputValue: 'U', width: 80, checked: true }//, checked: true
	            ]
		    },{
		    	xtype: 'textfield',
//		        width: 230,
		        fieldLabel: 'BAR Application Id',
		        anchor: '70%',
		        disabled: true,
//		        cls: 'required',
		        
		        id: 'barApplicationId'
	        },{
		    	xtype: 'textfield',
//		        width: 230,
		        fieldLabel: 'Application Alias',
		        anchor: '70%',
		        
		        cls: 'required',
		        
		        id: 'applicationAlias'
//		        enableKeyEvents: true //Stop IE to always set the cursor at the end when pushing left/right or setting the cursor with the mouse
		    },{
		    	xtype: 'textfield',
//		    	width: 230,
		    	anchor: '70%',
		        fieldLabel: 'Version',
		        id: 'applicationVersion',
		        enableKeyEvents: true,
		        allowBlank: true,
		        
		        style: {
		        	marginBottom: 10
		        }
		    },{
		        xtype: 'filterCombo',//combo
		        width: 230,
//		        anchor: '70%',//siehe (*1)
		        fieldLabel: 'Category',
				
				//transform: this.getEl(),
				//disabledClass: Ext.isIE ? 'x-item-disabled-ie' : 'x-item-disabled',
		        
		        id: 'applicationCat2',
		        store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
		        valueField: 'id',
		        displayField: 'text',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
		        xtype: 'combo',
		        width: 230,
//		        anchor: '70%',//siehe (*1)
		        fieldLabel: 'Lifecycle',
		        
		        id: 'lifecycleStatus',
		        store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),//lifecycleStatusListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    },{
		        xtype: 'combo',
		        width: 230,
//		        anchor: '70%',//siehe (*1)
		        fieldLabel: 'Operational status',

//		        style: {
//		    		marginTop: 20
//		    	},
		        
		        id: 'operationalStatus',
		        store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),//operationalStatusListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    },{
//		        xtype: 'fieldset',
//		        id: 'fsOrganisationalScope',
//		        title: ' ',
//		        labelWidth: 5,//5 200
////		        anchor: '60%',
//		        width: 120,
//		        
//		        style: {
//		    		marginTop: 20
//		    	},
//		        
//				items: [{
			        xtype: 'listview',//grid
			        width: 80,
			        //height: 170,//150
	//		        frame: true,
			        border: false,
			        fieldLabel: 'Organisational scope',

//			        style: {
//			    		marginBottom: 20
//			    	},
			        
			        id: 'organisationalScope',
			        store: AIR.AirStoreManager.getStoreByName('organisationalScopeListStore'),
			        
			        singleSelect: false,
			        multiSelect: true,
			        simpleSelect: true,
			        hideHeaders: true,
			        
			        columns: [
						{dataIndex: 'id', hidden: true, hideLabel: true, width: .001},
						{dataIndex: 'name'}
			        ]
		    	},{
		    		//because listview applicationUsingRegions is still editable when using applicationUsingRegions.disable();
		    		xtype: 'textarea',
		        	id: 'organisationalScopeHidden',
		        	fieldLabel: 'Organisational scope',		    		

//			        style: {
//			    		marginBottom: 20
//			    	},
			        
		        	width: 80,
		        	height: 130,
		        	hidden: true,
		        	disabled: true
//		    	}]
	        },{
		    	xtype: 'textarea',
		        id: 'comments',

		        anchor: '70%',
//		        grow: true,
		        height: 50,
		        fieldLabel: 'Comments',
		        
		        enableKeyEvents: true,
		        allowBlank: true,
		        autoScroll: true
		    },{
		        xtype: 'fieldset',
		        id: 'specificsCategory',
		        
		        title: 'Categories',
		        labelWidth: 190,
//		        height: 170,//sollte nicht notwendig sein!
		        anchor: '70%',
		        layout: 'form',//orig: auskommentiert, anchor
		        
				items: [{
	    			xtype: 'filterCombo',//combo
	    	        id: 'cbApplicationBusinessCat',
	    	        
	    	        store: AIR.AirStoreManager.getStoreByName('categoryBusinessListStore'),//categoryBusinessListStore,
	    	        valueField: 'id',
	    	        displayField: 'text',
	    	        fieldLabel: 'applicationBusinessCat',
	    	        
//	    	        anchor: '100%',
	    	        width: 250,
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',//all query
	    	        lazyRender: true,
	    	        lazyInit: false,
	    	        mode: 'local'
				},{
	    			xtype: 'combo',
	    	        id: 'cbDataClass',
	    	        
	    	        store: AIR.AirStoreManager.getStoreByName('dataClassListStore'),//dataClassListStore,//dataClassListStore operationalStatusListStore,
	    	        valueField: 'id',
	    	        displayField: 'text',
	    	        fieldLabel: 'dataClass',	        
	    	        
//	    	        anchor: '100%',
	    	        width: 250,
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',//all query
	    	        lazyRender: true,
	    	        lazyInit: false,
	    	        mode: 'local'
    			},{
    				xtype: 'panel',
    				id: 'pBusiness',
//    				width: 250,
    				anchor: '100%',
    				layout: 'column',//hbox
//    				pack: 'start',
    				border: false,
    				
    				items: [{
    					xtype: 'label',
    					id: 'labelbusinessProcess',
    					width: 195,
    					
    					style: {
    						fontSize: 12
    					}
		    		}, {
						xtype: 'textarea',
				        id: 'businessProcess',
//						anchor: '70%',
				        width: 300,
				        height: 100,
				        
				        autoScroll: true,
				        readOnly: true
//				        flex: 20
				    },{
						xtype: 'hidden',
				        id: 'businessProcessHidden'
//				        flex: 1
				    }, {
				    	xtype: 'commandlink',
				    	id: 'businessProcessAdd',
				    	img: img_AddBusinessProcess
				    },{
				    	xtype: 'commandlink',
				    	id: 'businessProcessRemove',
				    	img: img_RemoveBusinessProcess
				    }]
    			}]
			}]
		});
		
		AIR.CiSpecificsAnwendungView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange', 'ciInvalid');
		
//		var tfApplicationName = this.getComponent('applicationName');
		var tfApplicationAlias = this.getComponent('applicationAlias');
		var tfApplicationVersion = this.getComponent('applicationVersion');
		var rgBARrelevance = this.getComponent('rgBARrelevance');
		
		var cbApplicationCat2 = this.getComponent('applicationCat2');
		var cbLifecycleStatus = this.getComponent('lifecycleStatus');
//		var cbOrganisationalScope = this.getComponent('organisationalScope');
		var lvOrganisationalScope = this.getComponent('organisationalScope');//.getComponent('fsOrganisationalScope')
		lvOrganisationalScope.on('selectionchange', this.onOrganisationalScopeChange, this);
		var cbOperationalStatus = this.getComponent('operationalStatus');
		
		var tfComments = this.getComponent('comments');
		
		var cbApplicationBusinessCat = this.getComponent('specificsCategory').getComponent('cbApplicationBusinessCat');
		var cbDataClass = this.getComponent('specificsCategory').getComponent('cbDataClass');
			
		
//		tfApplicationName.on('change', this.onApplicationNameChange, this);
		tfApplicationAlias.on('change', this.onApplicationAliasChange, this);
		tfApplicationVersion.on('change', this.onApplicationVersionChange, this);
		
		rgBARrelevance.on('change', this.onBARrelevanceChange, this);
		
		cbApplicationCat2.on('select', this.onApplicationCat2Select, this);
		cbApplicationCat2.on('beforeselect', this.onApplicationCat2BeforeSelect, this);
		cbApplicationCat2.on('change', this.onApplicationCat2Change, this);
//		cbApplicationCat2.getStore().on('datachanged', this.updateInternal, this);
//		cbApplicationCat2.getStore().clearFilter(true);
//		cbApplicationCat2.getStore().filter('applicationCat1Id', '5');
		
		
		
		cbLifecycleStatus.on('select', this.onLifecycleStatusSelect, this);
		cbLifecycleStatus.on('change', this.onLifecycleStatusChange, this);
		
//		cbOrganisationalScope.on('select', this.onOrganisationalScopeSelect, this);
//		cbOrganisationalScope.on('change', this.onOrganisationalScopeChange, this);
		
		cbOperationalStatus.on('select', this.onOperationalStatusSelect, this);
		cbOperationalStatus.on('change', this.onOperationalStatusChange, this);
		
		tfComments.on('change', this.onCommentsChange, this);
		
		cbApplicationBusinessCat.on('select', this.onApplicationBusinessCatSelect, this);
		cbApplicationBusinessCat.on('change', this.onApplicationBusinessCatChange, this);
		
		cbDataClass.on('select', this.onDataClassSelect, this);
		cbDataClass.on('change', this.onDataClassChange, this);
		
		
		var pBusiness = this.getComponent('specificsCategory').getComponent('pBusiness');
		var clBusinessProcessAdd = pBusiness.getComponent('businessProcessAdd');
		var clBusinessProcessRemove = pBusiness.getComponent('businessProcessRemove');
		clBusinessProcessAdd.on('click', this.onBusinessProcessAdd, this);
		clBusinessProcessRemove.on('click', this.onBusinessProcessRemove, this);
	},
	
	onOrganisationalScopeChange: function(listview, selections) {
//		var scopeRecords = listview.getSelectedRecords();
//
//		var firstRecord = scopeRecords[0];
//		var lastRecord = scopeRecords[scopeRecords.length - 1];
//		
//		if(scopeRecords.length > 0 && (firstRecord.get('name') === AC.ORG_SCOPE_DEFAULT || lastRecord.get('name') === AC.ORG_SCOPE_DEFAULT)) {
//			var defaultRecord = firstRecord;
//			if(defaultRecord.get('name') !== AC.ORG_SCOPE_DEFAULT)
//				defaultRecord = lastRecord;
//				
//			listview.clearSelections();
//			listview.select(defaultRecord, true, true);
//		}
		
		AIR.CiDetailsCommon.orgScopeChange(listview, selections);
		
		this.ownerCt.fireEvent('ciChange', this, listview, selections);//parentView.ciChange this.fireEvent
	},
	
	onApplicationNameChange: function(textfield, newValue, oldValue) {
		this.ownerCt.fireEvent('ciChange', this, textfield, newValue);//this
	},
	
	onApplicationAliasChange: function (textfield, newValue, oldValue) {
//		// data changed - activate save button
//		activateButtonSaveApplication();
//
//		// set the value back to default
//		this.getComponent('applicationAlias').clearInvalid();
		
    	// check vor valid application alias name. Funktioniert noch nicht. Wenn bereits erxistierender Alias (z.B. Test) eingegeben wird:
		//geht das Speicehrn bis zum Server durhc. Muss sofort kommen und ggf. save/canel Buttons deaktiviert werden
		if(newValue.length > 0 && newValue != AIR.AirApplicationManager.getAppDetail().alias) {//applicationAlias nur aufrufen wenn alias != geladenem alias
			this.objectAliasAllowedStore.setBaseParam('query', newValue);
			this.objectAliasAllowedStore.load({
				callback: function() {
					// the function to handle the response
	        		if(this.objectAliasAllowedStore.getAt(0) === undefined ? true : this.objectAliasAllowedStore.getAt(0).data.countResultSet == 0 ? true : false) {
						this.getComponent('applicationAlias').clearInvalid();
		    			// data changed - activate save button	
		    			// activateButtonSaveApplication();
						this.ownerCt.fireEvent('ciChange', this, textfield, newValue);//this
					} else {
						this.getComponent('applicationAlias').markInvalid();
		    			// data changed - but not valid deactivate save button
		    			// deactivateButtonSaveApplication();
						
						this.ownerCt.fireEvent('ciInvalid', this, textfield, newValue);//this
					}
				}.createDelegate(this)
			});
		}
	},
	
	
	onApplicationVersionChange: function(textfield, newValue, oldValue) {
		this.ownerCt.fireEvent('ciChange', this, textfield, newValue);//this
	},
	
	onBARrelevanceChange: function(rgb, checkedRadio) {
		if(!checkedRadio) return;//wenn rgbBarRelevance aufgrund des CI types nicht sichtbar ist 
		
		if(checkedRadio.inputValue === 'U')
			rgb.setValue(AIR.AirApplicationManager.getAppDetail().barRelevance);
		
		this.ownerCt.fireEvent('ciChange', this, rgb, checkedRadio);//this
	},

	
	onApplicationCat2Select: function(combo, record, index) {
//		var applicationName = AIR.AirApplicationManager.getAppDetail().applicationName;
//		
//		
//		var sapRegex = '[0-9a-zA-Z#=\+\-\_\/\\. ]+M[0-9]+C[0-9]+';
//		var isSapName = applicationName.match(AC.REGEX_SAP_NAME) != null;
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);//this
    },
	onApplicationCat2BeforeSelect: function(combo, record, index) {
		return this.checkSapName(record);		
    },
    onApplicationCat2Change: function(combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue)) {
//    		var record = combo.getStore().getById(newValue);
//    		if(!record)
//    			combo.getStore().getAt(combo.getStore().findExact('text', newValue));
    		
    		var record = combo.getStore().getById(newValue) || combo.getStore().getAt(combo.getStore().findExact('text', newValue));
    		
    		if(record)
    			if(this.checkSapName(record))
    				this.ownerCt.fireEvent('ciChange', this, combo, newValue);//this
    			else
    				combo.setValue(oldValue);//record.get('id')
    	}
    },
    
    checkSapName: function(record) {
    	var applicationName = AIR.AirApplicationManager.getAppDetail().applicationName;
    	
		var isSapCat2 = record.get('guiSAPNameWizard') === 'Y';//this.getComponent('applicationCat2').getStore().getById(cat2Id).get('guiSAPNameWizard') === 'Y';//AC.CI_CAT1_SAP_CAT2_ID.indexOf(cat2Id) > -1;
		var isSapName = applicationName.match(AC.REGEX_SAP_NAME) != null;
		
		var isValidCat2 = (isSapCat2 && !isSapName) || (!isSapCat2 && isSapName) ? false : true;
		
		if(!isValidCat2) {
			var data = {
				airErrorId: AC.AIR_ERROR_INVALID_CAT2_SAP,
				applicationName: applicationName,
//				applicationCat1: AIR.AirApplicationManager.getAppDetail().applicationCat1Txt,
				isSapApp: !isSapCat2 && isSapName,
				sapApplicationCat2: isSapCat2 ? record.get('text') : AIR.AirApplicationManager.getAppDetail().applicationCat2Txt,
				applicationCat2: isSapCat2 ? AIR.AirApplicationManager.getAppDetail().applicationCat2Txt : record.get('text')
			};
			this.ownerCt.fireEvent('airAction', this, 'airError', data);//this
		}
		
		return isValidCat2;
    },
    
    onLifecycleStatusSelect: function(combo, record, index) {
    	this.ownerCt.fireEvent('ciChange', this, combo, record);//this
    },
    onLifecycleStatusChange: function (combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.ownerCt.fireEvent('ciChange', this, combo, newValue);//this
    },
    
    
//    onOrganisationalScopeSelect: function(combo, record, index) {
//    	this.fireEvent('ciChange', this, combo, record);
//    },
//    onOrganisationalScopeChange: function (combo, newValue, oldValue) {
//    	if(this.isComboValueValid(combo, newValue, oldValue))
//    		this.fireEvent('ciChange', this, combo, newValue);
//    },
    
    
    onOperationalStatusSelect: function(combo, record, index) {
    	this.ownerCt.fireEvent('ciChange', this, combo, record);//this
    },
    onOperationalStatusChange: function(combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.ownerCt.fireEvent('ciChange', this, combo, newValue);//this
    },
    
    
    onCommentsChange: function(textarea, newValue, oldValue) {
    	this.ownerCt.fireEvent('ciChange', this, textarea, newValue);//this
	},
    
    
	onApplicationBusinessCatSelect: function(combo, record, index) {
		this.ownerCt.fireEvent('ciChange', this, combo, record);//this
            
        if(record) {
        	var data = {
    			categoryBusinessId: record.data.id
        	};
        	
            this.getComponent('specificsCategory').getComponent('cbDataClass').store.load({
            	params: data
            });
            
            this.getComponent('specificsCategory').getComponent('cbDataClass').setValue('');
            

            var appDetail = AIR.AirApplicationManager.getAppDetail();
            if (AIR.AirAclManager.isRelevance(this.getComponent('specificsCategory').getComponent('cbDataClass'), appDetail)) {
            	Util.enableCombo(this.getComponent('specificsCategory').getComponent('cbDataClass'));
			} else {
				Util.disableCombo(this.getComponent('specificsCategory').getComponent('cbDataClass'));
			}
        }
        else {
        	this.getComponent('specificsCategory').getComponent('cbDataClass').setValue('');
        }
    },
    onApplicationBusinessCatChange: function(combo, newValue, oldValue) { 
		if (newValue !== oldValue)
			this.getComponent('specificsCategory').getComponent('cbDataClass').setValue('');
		
		if(newValue.length === 0)
			Util.disableCombo(this.getComponent('specificsCategory').getComponent('cbDataClass'));
		
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.ownerCt.fireEvent('ciChange', this, combo, newValue);//this
    },

    onDataClassSelect: function(combo, record, index) {
    	this.fireEvent('ciChange', this, combo, record);//this
    },
    onDataClassChange: function(combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.ownerCt.fireEvent('ciChange', this, combo, newValue);//this
    },
    
    
    
	
	onBusinessProcessAdd: function(link, event) {
		AIR.AirPickerManager.openRecordPicker(
			this.onRecordAdded.createDelegate(this), this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('businessProcess'), event, 'process');
	},
	onBusinessProcessRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('businessProcess'), event);
	},
	
	onRecordAdded: function(element, hiddenElement) {
		this.ownerCt.fireEvent('ciChange', this, element, hiddenElement);//this
	},
	onRecordRemoved: function(element, hiddenElement) {
		this.ownerCt.fireEvent('ciChange', this, element, hiddenElement);//this
	},
	
	update: function(data) {
		//this.updateAccessMode(data);
//		var isApplication = AAM.getTableId() === AC.TABLE_ID_APPLICATION && data.applicationCat1Id === AC.APP_CAT1_APPLICATION;
		
		this.getComponent('objectType').setValue(data.applicationCat1Id);
		this.getComponent('applicationId').setValue(data.id);//applicationId
		this.getComponent('applicationAlias').setValue(data.alias);//applicationAlias
		this.getComponent('applicationVersion').setValue(data.applicationVersion);
		
		
		var rgBARrelevance = this.getComponent('rgBARrelevance');
		var tfBarApplicationId = this.getComponent('barApplicationId');
		
		var lvOrganisationalScope = this.getComponent('organisationalScope');//.getComponent('fsOrganisationalScope')
		var taOrganisationalScope = this.getComponent('organisationalScopeHidden');//.getComponent('fsOrganisationalScope')


		
		
		var cbApplicationCat2 = this.getComponent('applicationCat2');
		//cbApplicationCat2.getStore().filter('applicationCat1Id', data.applicationCat1Id);
		var filterData = {//falls app w/o cat soll trotzdem die cat2 von cat1=Application auswählbar sein
			applicationCat1Id: data.applicationCat1Id != '0' ? data.applicationCat1Id : AC.APP_CAT1_APPLICATION
		};
		cbApplicationCat2.filterByData(filterData);
		cbApplicationCat2.getStore().sort('text', 'ASC');
		
		if(data.applicationCat2 !== '0') cbApplicationCat2.setValue(data.applicationCat2);
		else cbApplicationCat2.clearValue();
		
		
		// ------
//		selectedCategoryBusinessId = data.categoryBusinessId;//muss gesetzt werden für andere Codestellen?
		if (data.categoryBusinessId && data.categoryBusinessId != 0) {
			this.getComponent('specificsCategory').getComponent('cbApplicationBusinessCat').setValue(data.categoryBusinessId);
		} else {
			this.getComponent('specificsCategory').getComponent('cbApplicationBusinessCat').setValue('');
		}
		
//		selectedDataClassId = data.dataClassId;//muss gesetzt werden für andere Codestellen?
		if (data.dataClassId && data.dataClassId != 0) {// && data.dataClassId != '0'	selectedDataClassId statt data.dataClassId
			this.getComponent('specificsCategory').getComponent('cbDataClass').setValue(data.dataClassId);//selectedDataClassId
			
			//wenn cbApplicationBusinessCat geändert wird, müssen die Werte für dataClassListStore aktualisiert werden
//			dataClassListStore.load();
		} else {
			this.getComponent('specificsCategory').getComponent('cbDataClass').clearValue();
			Util.disableCombo(this.getComponent('specificsCategory').getComponent('cbDataClass'));
		}
				
//		selectedLifecycleStatusId = data.lifecycleStatusId;
		if (data.lifecycleStatusId && data.lifecycleStatusId != 0) {
			this.getComponent('lifecycleStatus').setValue(data.lifecycleStatusId);
		} else {
			this.getComponent('lifecycleStatus').setValue('');
		}
		
//		if (data.organisationalScope && data.organisationalScope != 0) {
//			this.getComponent('organisationalScope').setValue(data.organisationalScope);
//		} else {
//			this.getComponent('organisationalScope').setValue('');
//		}
		

		
		
//		selectedOperationalStatusId = data.operationalStatusId;
		if (data.operationalStatusId && data.operationalStatusId != 0) {
			this.getComponent('operationalStatus').setValue(data.operationalStatusId);
		} else {
			this.getComponent('operationalStatus').setValue('');
		}

		if (data.comments && data.comments != 0) {
			this.getComponent('comments').setValue(data.comments);
		} else {
			this.getComponent('comments').setValue('');
		}
		
		this.updateAccessMode(data);
		
		
		lvOrganisationalScope.clearSelections(true);
		taOrganisationalScope.reset();
		
		if(this.isApplicationCI(data.applicationCat1Id)) {
			rgBARrelevance.setVisible(true);
			
			if(data.barRelevance.length === 0)
				data.barRelevance = 'U';
	
			rgBARrelevance.setValue(data.barRelevance);
			
			
			tfBarApplicationId.setVisible(true);
			if(data.barRelevance === 'Y') {
				tfBarApplicationId.setValue(data.barApplicationId);
				rgBARrelevance.disable();
			} else {
				if(data.barRelevance === 'N' && data.template == '1')//-1
					rgBARrelevance.disable();
				
				tfBarApplicationId.setValue('');
			}
			
			//durch AirAclManager erledigt 
//			lvOrganisationalScope.setVisible(true);
//			taOrganisationalScope.setVisible(true);
			
			if(data.organisationalScope.length > 0) {
				var scopes = data.organisationalScope.split(',');
				var store = lvOrganisationalScope.getStore();
				
				
				if(AIR.AirAclManager.isRelevance(lvOrganisationalScope, data)) {//lvApplicationUsingRegions.isVisible()
					Ext.each(scopes, function(item, index, all) {
						var r = store.getAt(store.findExact('name', item));
						lvOrganisationalScope.select(r, true, true);//r
					});
				} else {
					var organisationalScope = data.organisationalScope;
					
					Ext.each(scopes, function(item, index, all) {
						var r = store.getAt(store.findExact('name', item));
						organisationalScope = organisationalScope.replace(item, r.data.name);
					});
					taOrganisationalScope.setValue(organisationalScope.replace(/,/g,'\n'));//data.licenseUsingRegions.replace(',','\n')
				}
			}
		} else {
			rgBARrelevance.reset();
			rgBARrelevance.setVisible(false);
			
			tfBarApplicationId.reset();
			tfBarApplicationId.setVisible(false);
			
			lvOrganisationalScope.setVisible(false);
			taOrganisationalScope.setVisible(false);
		}
		
		this.loadApplicationBusinessProcesses(data.id);//applicationId
		
		//kein Effekt zur Verhinderung der Verkleinerung der combo Breite nachdem wenn auf Contacts die Primary Person
		//gelöscht und wieder hinzugefügt wurde. (*1)
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('applicationAlias'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('barApplicationId'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('rgBARrelevance'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('applicationVersion'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('applicationCat2'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('lifecycleStatus'), data);
		
//		AIR.AirAclManager.setAccessMode(this.getComponent('fsOrganisationalScope').getComponent('organisationalScope'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('organisationalScope'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('organisationalScopeHidden'), data);
//		AIR.AirAclManager.setNecessity(this.getComponent('organisationalScopeHidden'));
		AIR.AirAclManager.setNecessityInternal(this.getComponent('organisationalScopeHidden').label, 'mandatory');
		
		
		AIR.AirAclManager.setAccessMode(this.getComponent('operationalStatus'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('comments'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('specificsCategory').getComponent('cbApplicationBusinessCat'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('specificsCategory').getComponent('cbDataClass'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('businessProcess'), data);
	},

	
	loadApplicationBusinessProcesses: function(id) {//applicationId
		var applicationProcessStore = AIR.AirStoreFactory.createApplicationProcessStore();
		applicationProcessStore.on('load', this.onApplicationProcessLoad, this);
		
		var params = {
			cwid: AIR.AirApplicationManager.getCwid(),
			token: AIR.AirApplicationManager.getToken(),
			id: id//applicationId	AIR.AirApplicationManager.getCiId()
		};
		
		applicationProcessStore.load({
			params: params
		});
	},
	
	onApplicationProcessLoad: function(store, records, options) {
		var values = '';
		var hiddenValues = '';
		
		for(var i = 0; i < records.length; ++i) {
			if(i === 0) {
				values = records[i].data.text;
				hiddenValues = records[i].data.id;
			} else {
				values += '\n' + records[i].data.text;
				hiddenValues += ',' + records[i].data.id;
			}
		}
		
		field = this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('businessProcess');
		field.setValue(values);

		field = this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('businessProcessHidden');
		field.setValue(hiddenValues);
	},
	

	setData: function(data) {
		var field = this.getComponent('applicationId');
		data.id = field.getValue();//applicationId

//		field = this.getComponent('applicationName');
//		if(!field.disabled)
//			data.name = field.getValue();//applicationName
		

		field = this.getComponent('applicationAlias');
		if(!field.disabled)
			data.alias = field.getValue();//applicationAlias
		

		field = this.getComponent('applicationVersion');
		if(!field.disabled)
			data.version = field.getValue();
		
		if(this.isApplicationCI(AAM.getAppDetail().applicationCat1Id)) {//data.applicationCat1Id is undefined
			field = this.getComponent('rgBARrelevance');
			if(!field.disabled)//wenn tableId != 2 || ciType != 5
				data.barRelevance = field.getValue().inputValue;
		}

		field = this.getComponent('specificsCategory').getComponent('cbApplicationBusinessCat');
		if(!field.disabled)
			if(field.getValue().length > 0)
				data.categoryBusinessId = field.getValue();
			else 
				data.categoryBusinessId = -1;
		

		field = this.getComponent('specificsCategory').getComponent('cbDataClass');
		if(!field.disabled)
			if(field.getValue().length > 0)
				data.classDataId = field.getValue();
			else 
				data.classDataId = -1;
		
		field = this.getComponent('applicationCat2');
		if(!field.disabled)
			if (field.getValue().length > 0)
				data.applicationCat2Id = field.getValue();
			else data.applicationCat2Id = -1;

		field = this.getComponent('lifecycleStatus');
		if(!field.disabled)
			if(field.getValue().length > 0)
				data.lifecycleStatusId = field.getValue();
			else 
				data.lifecycleStatusId = -1;
		
		if(this.isApplicationCI(AAM.getAppDetail().applicationCat1Id)) {//data.applicationCat1Id is undefined
			var lvOrganisationalScope = this.getComponent('organisationalScope');
			if(!lvOrganisationalScope.disabled) {
				var scopeRecords = lvOrganisationalScope.getSelectedRecords();
				var scopes = '';
				for(var i = 0; i < scopeRecords.length; i++) {
					if(scopes.length > 0)
						scopes += ',';
					
					scopes += scopeRecords[i].get('id');
				}
				if(scopes.length > 0)
					data.organisationalScope = scopes;
				else
					data.organisationalScope = '-1';
			}
		}
		
		field = this.getComponent('operationalStatus');
		if(!field.disabled)
			if(field.getValue().length > 0)
				data.operationalStatusId = field.getValue();
			else 
				data.operationalStatusId = -1;

		field = this.getComponent('comments');
		if(!field.disabled)
			data.comments = field.getValue();
		
		field = this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('businessProcess');
		if(!field.disabled)
			data.businessProcess = field.getValue();

		field = this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('businessProcessHidden');
		if(!field.disabled)
			data.businessProcessHidden = field.getValue();
		
		return data;
	},
	
	isApplicationCI: function(applicationCat1Id) {
		return AAM.getTableId() === AC.TABLE_ID_APPLICATION && applicationCat1Id === AC.APP_CAT1_APPLICATION;
	},
	
	validate: function(item) {
		switch(item.getId()) {
			case 'cbIsTemplate':
				var isChecked = item.getValue();
				var rgBARrelevance = this.getComponent('rgBARrelevance');
				
				if(AIR.AirAclManager.isRelevance(rgBARrelevance, AAM.getAppDetail())) {
					var labels = AAM.getLabels();
					var infoTitle = labels.templateBARrelevanceValidationTitle,
						infoText;
					
					if(isChecked) {
						rgBARrelevance.setValue('N');
						rgBARrelevance.disable();
						
						infoText = labels.templateBARrelevanceValidationBARrelevance1;
					} else {
						var barRelevance = AAM.getAppDetail().barRelevance;
						rgBARrelevance.setValue(barRelevance);
						
						if(barRelevance !== 'Y')
							rgBARrelevance.enable();
						
						infoText = labels.templateBARrelevanceValidationBARrelevance2;
					}
					
					var infoWindow = AIR.AirWindowFactory.createDynamicMessageWindow('GENERIC_OK', null, infoText, infoTitle);
					infoWindow.show();
				}
				break;
			default: break;
		}
	},
	
	updateLabels: function(labels) {
//		this.setTitle(labels.specificsPanelTitle);
//		this.setFieldLabel(this.getComponent('applicationName'), labels.applicationName);
		this.setFieldLabel(this.getComponent('applicationAlias'), labels.applicationAlias);
		this.setFieldLabel(this.getComponent('barApplicationId'), labels.barApplicationId);
		this.setFieldLabel(this.getComponent('rgBARrelevance'), labels.rgBARrelevance);
		this.setBoxLabel(this.getComponent('rgBARrelevance').items.items[0], labels.general_yes);
		this.setBoxLabel(this.getComponent('rgBARrelevance').items.items[1], labels.general_no);
		this.setBoxLabel(this.getComponent('rgBARrelevance').items.items[2], labels.complianceUndefined);
		
		this.setFieldLabel(this.getComponent('applicationVersion'), labels.applicationVersion);
		this.setFieldLabel(this.getComponent('applicationCat2'), labels.applicationCat2);
		this.setFieldLabel(this.getComponent('lifecycleStatus'), labels.lifecycleStatus);
		
//		this.getComponent('fsOrganisationalScope').setTitle(labels.organisationalScope);
		this.setFieldLabel(this.getComponent('organisationalScope'), labels.organisationalScope);
		this.setFieldLabel(this.getComponent('organisationalScopeHidden'), labels.organisationalScope);
		
		this.setFieldLabel(this.getComponent('operationalStatus'), labels.operationalStatus);
		this.setFieldLabel(this.getComponent('comments'), labels.comments);
		
		this.getComponent('specificsCategory').setTitle(labels.specificsCategory);
		this.setFieldLabel(this.getComponent('specificsCategory').getComponent('cbApplicationBusinessCat'), labels.applicationBusinessCat);
		this.setFieldLabel(this.getComponent('specificsCategory').getComponent('cbDataClass'), labels.dataClass);
		this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('labelbusinessProcess').setText(labels.businessProcess);
	},
	
	updateToolTips: function(toolTips) {
//		this.setTooltipData(this.getComponent('applicationName').label,  toolTips.applicationName,  toolTips.applicationNameText);
		this.setTooltipData(this.getComponent('applicationAlias').label,  toolTips.applicationAlias, toolTips.applicationAliasText);
		this.setTooltipData(this.getComponent('rgBARrelevance').label,  toolTips.barApplicationRelevant, toolTips.barApplicationRelevantText);
		this.setTooltipData(this.getComponent('barApplicationId').label,  toolTips.barApplicationId, toolTips.barApplicationIdText);
      	this.setTooltipData(this.getComponent('applicationVersion').label, toolTips.version, toolTips.versionText);
		this.setTooltipData(this.getComponent('applicationCat2').label,  toolTips.applicationCat2, toolTips.applicationCat2Text);
		this.setTooltipData(this.getComponent('lifecycleStatus').label, toolTips.lifecycleStatus, toolTips.lifecycleStatusText);
		this.setTooltipData(this.getComponent('organisationalScope').label, toolTips.organisationalScope, toolTips.organisationalScopeText);
		this.setTooltipData(this.getComponent('organisationalScopeHidden').label, toolTips.organisationalScope, toolTips.organisationalScopeText);
		this.setTooltipData(this.getComponent('operationalStatus').label, toolTips.operationalStatus, toolTips.operationalStatusText);
		this.setTooltipData(this.getComponent('comments').label, toolTips.comments, toolTips.commentsText);
		this.setTooltipData(this.getComponent('specificsCategory').getComponent('cbApplicationBusinessCat').label, toolTips.applicationBusinessCat, toolTips.applicationBusinessCatText);
		this.setTooltipData(this.getComponent('specificsCategory').getComponent('cbDataClass').label, toolTips.dataClass, toolTips.dataClassText);
		this.setTooltipData(this.getComponent('specificsCategory').getComponent('pBusiness').getComponent('labelbusinessProcess'), toolTips.businessProcess, toolTips.businessProcessText);
	}
});
Ext.reg('AIR.CiSpecificsAnwendungView', AIR.CiSpecificsAnwendungView);
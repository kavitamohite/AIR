Ext.namespace('AIR');

AIR.CiLicenseView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200, // label settings here cascade unless overridden
//		    frame: true,
//		    id: 'licensePanel',
		    title: 'License',
		    border: false,
		    bodyStyle: 'padding:10px',
		    
		    layout: 'form',
		    
		    items: [{
		        xtype: 'fieldset',
		        id: 'licenselicense',
		        title: 'License',
		        labelWidth: 150,
		        anchor: '60%',
		        
				items: [{
			    	xtype: 'combo',
			        width: 230,
			        fieldLabel: 'LicenseType',
			        id: 'licenseType',
			        
			        store: AIR.AirStoreManager.getStoreByName('licenseTypeListStore'),//licenseTypeListStore,
			        valueField: 'id',
			        displayField: 'text',
//			        hideTrigger: true,
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			        
			        /*
			        listeners: {
		                select: function(combo, record, index) {
	                        //combo.setValue(record.data['text']);
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, record);
		                }.createDelegate(this),
		                change: function (combo, newValue, oldValue) {
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, newValue);
		                }.createDelegate(this)
			        }*/
			    },{
					xtype: 'textfield',
			        width: 230,
			        fieldLabel: 'Accessing user count',
			        id: 'applicationAccessingUserCount',
			        
			        enableKeyEvents: true,
			        allowBlank: true
			        
			        /*
			        listeners: {
			    		change: function(textfield, newValue, oldValue) {
//			    			activateButtonSaveApplication();
			    			this.fireEvent('ciChange', this, textfield, newValue);
			    		}.createDelegate(this)
			        }*/
			    },{
					xtype: 'textfield',
			        width: 230,
			        fieldLabel: 'Accessing user count measured',
			        id: 'applicationAccessingUserCountMeasured',
			        
			        enableKeyEvents: true,
			        allowBlank: true
			        
//			        listeners: {
//			    		change: function() {
//			    			activateButtonSaveApplication();
//			    		}
//			        }
			    },{
			        xtype: 'combo',
			        width: 230,
			        fieldLabel: 'Dedicated',
			        id: 'dedicated',
			        
			        store: AIR.AirStoreManager.getStoreByName('dedicatedListStore'),//dedicatedListStore,
			        valueField: 'id',
			        displayField: 'text',
			        editable: false,
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			        
//			        listeners: {
//		                select: function(combo, record, index) {
//	                        //combo.setValue(record.data['text']);
//	                        activateButtonSaveApplication();
//		                },
//		                change: function (fld, newValue, oldValue) {
//	                		activateButtonSaveApplication();
//		                }
//			        }
			    },{
			        xtype: 'combo',
			        width: 230,
			        fieldLabel: 'Load Class',
			        id: 'loadClass',
			        
			        store: AIR.AirStoreManager.getStoreByName('loadClassListStore'),//loadClassListStore,
			        valueField: 'id',
			        displayField: 'text',
			        editable: false,
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			        
//			        listeners: {
//		                select: function(combo, record, index) {
//	                        //combo.setValue(record.data['text']);
//	                        activateButtonSaveApplication();
//		                },
//		                change: function (fld, newValue, oldValue) {
//	                		activateButtonSaveApplication();
//		                }
//			        }
			    },{
			        xtype: 'combo',
			        width: 230,
			        fieldLabel: 'Service Model',
			        id: 'serviceModel',
			        
			        store: AIR.AirStoreManager.getStoreByName('serviceModelListStore'),//loadClassListStore,
			        valueField: 'id',
			        displayField: 'text',
			        editable: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			        
			    }]
		    }, {
		        xtype: 'fieldset',
		        id: 'licensecosts',
		        title: 'Costs',
		        labelWidth: 150,
		        anchor: '60%',
		        
				items: [{
					xtype: 'textfield',
			        width: 230,
			        fieldLabel: 'Cost run p.a.',
			        id: 'costRunPa',
			        
			        enableKeyEvents: true,
			        allowBlank: true
			        
			        /*
	  		        listeners: {
			    		change: function(textfield, newValue, oldValue) {
//			    			activateButtonSaveApplication();
			    			this.fireEvent('ciChange', this, textfield, newValue);
			    			this.fillEmptyCurrency();
			    		}.createDelegate(this)
			        }*/
			    },{
					xtype: 'textfield',
			        width: 230,
			        fieldLabel: 'Cost change p.a.',
			        id: 'costChangePa',
			        
			        enableKeyEvents: true,
			        allowBlank: true
			        
			        /*
	  		        listeners: {
			    		change: function(textfield, newValue, oldValue) {
//			    			activateButtonSaveApplication();
			    			this.fireEvent('ciChange', this, textfield, newValue);
			    			this.fillEmptyCurrency();
			    		}.createDelegate(this)
			        }*/
			    },{
			        xtype: 'combo',
			        width: 230,
			        fieldLabel: 'Currency',
			        id: 'currency',
			        
			        store: AIR.AirStoreManager.getStoreByName('currencyListStore'),//currencyListStore,
			        valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			        
			        /*
			        listeners: {
		                select: function(combo, record, index) {
	                        //combo.setValue(record.data['text']);
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, record);
		                }.createDelegate(this),
		                change: function (combo, newValue, oldValue) {
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, newValue);
		                }.createDelegate(this)
			        }*/
			    },{
			        xtype: 'combo',
			        width: 230,
			        fieldLabel: 'Cost run account',
			        id: 'runAccount',
			        
			        store: AIR.AirStoreManager.getStoreByName('runAccountListStore'),//runAccountListStore,
			        valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			        
			        /*
			        listeners: {
		                select: function(combo, record, index) {
	                        //combo.setValue(record.data['text']);
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, record);
		                }.createDelegate(this),
		                change: function (combo, newValue, oldValue) {
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, newValue);
		                }.createDelegate(this)
			        }*/
			    },{
			        xtype: 'combo',
			        width: 230,
			        fieldLabel: 'Cost change account',
			        id: 'changeAccount',
			        
			        store: AIR.AirStoreManager.getStoreByName('changeAccountListStore'),//changeAccountListStore,
			        valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
			        
			        /*
			        listeners: {
		                select: function(combo, record, index) {
	                        //combo.setValue(record.data['text']);
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, record);
		                }.createDelegate(this),
		                change: function (combo, newValue, oldValue) {
//	                        activateButtonSaveApplication();
		                	this.fireEvent('ciChange', this, combo, newValue);
		                }.createDelegate(this)
			        }*/
				}]
		    },{
		        xtype: 'fieldset',
		        id: 'licenseusingregions',
		        title: 'Using regions',
		        labelWidth: 5,
		        anchor: '60%',
		        
				items: [{
			        xtype: 'listview',//grid
			        width: 80,
			        //height: 170,//150
			        fieldLabel: '',
//			        frame: true,
			        border: false,
			        
			        id: 'applicationUsingRegions',
			        store: AIR.AirStoreManager.getStoreByName('itSetListStore'),//itSetListStore,
			        
			        singleSelect: false,
			        multiSelect: true,
			        simpleSelect: true,
			        hideHeaders: true,
			        
			        columns: [
						{dataIndex: 'id', hidden: true, hideLabel: true, width: .001},
						{dataIndex: 'text'}
			        ]
			        
			        /*
			        listeners: {
		                selectionchange: function(listview, selections) {
		                	var tRegs = [];
		                	Ext.each(listview.getSelectedRecords(), function(item, index, all) {
		                		tRegs.push(item.id);
		                	});
		                	selectedUsingRegions = tRegs.join(',');//this.selectedUsingRegions
//		                    activteButtonSaveApplication();
		                	this.fireEvent('ciChange', this, listview, selections);
		                }.createDelegate(this)
			        }*/
		    	},{
		    		//because listview applicationUsingRegions is still editable when using applicationUsingRegions.disable();
		    		xtype: 'textarea',//textarea hidden
		        	//width: 120,
		        	height: 130,
		        	id: 'applicationUsingRegionsHidden',
		        	hidden: true,
		        	disabled: true
		        }]
		    }]
		});
		
		AIR.CiLicenseView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		
		var cbLicenseType = this.getComponent('licenselicense').getComponent('licenseType');
		var tfApplicationAccessingUserCount = this.getComponent('licenselicense').getComponent('applicationAccessingUserCount');
		var tfApplicationAccessingUserCountMeasured = this.getComponent('licenselicense').getComponent('applicationAccessingUserCountMeasured');
		var cbDedicated = this.getComponent('licenselicense').getComponent('dedicated');
		var cbLoadClass = this.getComponent('licenselicense').getComponent('loadClass');
		var cbServiceModel = this.getComponent('licenselicense').getComponent('serviceModel');
		
		var tfCostRunPa = this.getComponent('licensecosts').getComponent('costRunPa');
		var tfCostChangePa = this.getComponent('licensecosts').getComponent('costChangePa');
		var cbCurrency = this.getComponent('licensecosts').getComponent('currency');
		var cbRunAccount = this.getComponent('licensecosts').getComponent('runAccount');
		var cbChangeAccount = this.getComponent('licensecosts').getComponent('changeAccount');
		
		var lvApplicationUsingRegions = this.getComponent('licenseusingregions').getComponent('applicationUsingRegions');
		
		
		cbLicenseType.on('select', this.onLicenseTypeSelect, this);
		cbLicenseType.on('change', this.onLicenseTypeChange, this);
		tfApplicationAccessingUserCount.on('change', this.onApplicationAccessingUserCountChange, this);
		tfApplicationAccessingUserCountMeasured.on('change', this.onApplicationAccessingUserCountMeasuredChange, this);
		cbDedicated.on('select', this.onDedicatedSelect, this);
		cbLoadClass.on('select', this.onLoadClassSelect, this);
		cbServiceModel.on('select', this.onServiceModelSelect, this);
		
		tfCostRunPa.on('change', this.onCostRunPaChange, this);
		tfCostChangePa.on('change', this.onCostChangePaChange, this);
		
		cbCurrency.on('select', this.onCurrencySelect, this);
		cbCurrency.on('change', this.onCurrencyChange, this);
		cbRunAccount.on('select', this.onRunAccountSelect, this);
		cbRunAccount.on('change', this.onRunAccountChange, this);
		cbChangeAccount.on('select', this.onChangeAccountSelect, this);
		cbChangeAccount.on('change', this.onChangeAccountChange, this);
		
		lvApplicationUsingRegions.on('selectionchange', this.onApplicationUsingRegionsSelectionChange, this);
//		lvApplicationUsingRegions.getSelectionModel().on('selectionchange', this.onApplicationUsingRegionsSelectionChange, this);
	},
	
	
	onLicenseTypeSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//        activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo, record);
    },
    onLicenseTypeChange: function (combo, newValue, oldValue) {
//        activateButtonSaveApplication();
    	
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
    },
    onDedicatedSelect: function (combo, newValue, oldValue) {
//      activateButtonSaveApplication();
	  	this.fireEvent('ciChange', this, combo, newValue);
    },
    onLoadClassSelect: function (combo, newValue, oldValue) {
//      activateButtonSaveApplication();
	  	this.fireEvent('ciChange', this, combo, newValue);
    },
    onServiceModelSelect: function (combo, newValue, oldValue) {
//      activateButtonSaveApplication();
	  	this.fireEvent('ciChange', this, combo, newValue);
    },
	
    onApplicationAccessingUserCountChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
	},
	onCostRunPaChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
		this.fillEmptyCurrency();
	},
	onCostChangePaChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
		this.fillEmptyCurrency();
	},
	onApplicationAccessingUserCountMeasuredChange: function(textfield, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textfield, newValue);
	},
	
	onCurrencySelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//        activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo, record);
    },
    onCurrencyChange: function (combo, newValue, oldValue) {
//        activateButtonSaveApplication();
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
    },
	
    onRunAccountSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//        activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo, record);
    },
    onRunAccountChange: function (combo, newValue, oldValue) {
//        activateButtonSaveApplication();
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
    },
    
    onChangeAccountSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//        activateButtonSaveApplication();
    	
		this.fireEvent('ciChange', this, combo, record);
    },
    onChangeAccountChange: function (combo, newValue, oldValue) {
//        activateButtonSaveApplication();
    	
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
    },
	
    onApplicationUsingRegionsSelectionChange: function(listview, selections) {
    	var tRegs = [];
    	Ext.each(listview.getSelectedRecords(), function(item, index, all) {//listview.getSelectedRecords() listview.getSelections()--> wenn grid statt listview
    		tRegs.push(item.id);
    	});
    	selectedUsingRegions = tRegs.join(',');//this.selectedUsingRegions
//        activteButtonSaveApplication();
    	this.fireEvent('ciChange', this, listview, selections);
    },
	
	
	fillEmptyCurrency: function() {
		var cbCurrency = this.getComponent('licensecosts').getComponent('currency');
		if(cbCurrency.getValue() == '') {
			if('' == selectedCurrency)
				selectedCurrency = 1;
			
			cbCurrency.setValue(selectedCurrency);
		}
	},
	
	update: function(data) {
		this.updateAccessMode(data);
	
		
//		selectedLicenseTypeId = data.licenseTypeId;
		if (data.licenseTypeId && data.licenseTypeId != 0) {
			this.getComponent('licenselicense').getComponent('licenseType').setValue(data.licenseTypeId);
		} else {
			this.getComponent('licenselicense').getComponent('licenseType').setValue('');
		}
		
		
		if (data.dedicated && data.dedicated != 0) {
			this.getComponent('licenselicense').getComponent('applicationAccessingUserCount').setValue(data.applicationAccessingUserCount);
		} else {
			this.getComponent('licenselicense').getComponent('applicationAccessingUserCount').setValue('');
		}
		if (data.dedicated && data.dedicated != 0) {
			this.getComponent('licenselicense').getComponent('applicationAccessingUserCountMeasured').setValue(data.applicationAccessingUserCountMeasured);
		} else {
			this.getComponent('licenselicense').getComponent('applicationAccessingUserCountMeasured').setValue('');
		}
		
		
		if (data.dedicated && data.dedicated != 0) {
			this.getComponent('licenselicense').getComponent('dedicated').setValue(data.dedicated);
		} else {
			this.getComponent('licenselicense').getComponent('dedicated').setValue('');
		}
		
		if (data.loadClass && data.loadClass != 0) {
			this.getComponent('licenselicense').getComponent('loadClass').setValue(data.loadClass);//kein id Feld in der DB für loadClass. Nur Stringwert
		} else {
			this.getComponent('licenselicense').getComponent('loadClass').setValue('');
		}
		
		if (data.serviceModel && data.serviceModel != 0) {
			this.getComponent('licenselicense').getComponent('serviceModel').setValue(data.serviceModel);//kein id Feld in der DB für serviceModel. Nur Stringwert
		} else {
			this.getComponent('licenselicense').getComponent('serviceModel').setValue('');
		}
		
		
		
		

		if (data.costRunAccountId && data.costRunAccountId != 0) {
			this.getComponent('licensecosts').getComponent('costRunPa').setValue(data.costRunPa);
		} else {
			this.getComponent('licensecosts').getComponent('costRunPa').setValue('');
		}
		if (data.costRunAccountId && data.costRunAccountId != 0) {
			this.getComponent('licensecosts').getComponent('costChangePa').setValue(data.costChangePa);
		} else {
			this.getComponent('licensecosts').getComponent('costChangePa').setValue('');
		}
		
	
//		selectedCurrencyId = data.currencyId;
		if (data.currencyId && data.currencyId != 0) {
			this.getComponent('licensecosts').getComponent('currency').setValue(data.currencyId);
		} else {
//			var cbUseroptionCurrency = this.getComponent('useroptionCurrency');
			var defaultCurrencyId = AIR.AirApplicationManager.getDefaultCurrency();
			this.getComponent('licensecosts').getComponent('currency').setValue(defaultCurrencyId);//'' cbUseroptionCurrency.getValue()
		}
//		this.getComponent('licensecosts').getComponent('currency').setVisible(false);
		
		//FF OK, IE fails: all combos shot
//		if(AIR.AirAclManager.isRelevance(this.getComponent('licensecosts').getComponent('currency'), data))
//			this.getComponent('licensecosts').getComponent('currency').setVisible(true);
//		else
//			this.getComponent('licensecosts').getComponent('currency').setVisible(false);
//		this.getComponent('licensecosts').getComponent('currency').doLayout();
		
		
//		selectedRunAccountId = data.costRunAccountId;
		if (data.costRunAccountId && data.costRunAccountId != 0) {
			this.getComponent('licensecosts').getComponent('runAccount').setValue(data.costRunAccountId);
		} else {
			this.getComponent('licensecosts').getComponent('runAccount').setValue('');
		}

//		selectedChangeAccountId = data.costChangeAccountId;
		if (data.costChangeAccountId && data.costChangeAccountId != 0) {
			this.getComponent('licensecosts').getComponent('changeAccount').setValue(data.costChangeAccountId);
		} else {
			this.getComponent('licensecosts').getComponent('changeAccount').setValue('');
		}


		/*
		var lvApplicationUsingRegions = this.getComponent('licenseusingregions').getComponent('applicationUsingRegions');
		lvApplicationUsingRegions.getSelectionModel().unlock();// to make lvApplicationUsingRegions.getSelectionModel().clearSelections(); possible
		
		if(data.licenseUsingRegions.length > 0) {
			var regions = [];
			Ext.each(data.licenseUsingRegions.split(','), function(item, index, all) {
	//			lvApplicationUsingRegions.select(lvApplicationUsingRegions.getStore().getById(item), true, true);
				
				var r = lvApplicationUsingRegions.getStore().getById(item);
				if(r)
					regions.push(r);
	//			lvApplicationUsingRegions.getSelectionModel().selectRow(lvApplicationUsingRegions.getStore().indexOf(r), false);//selectRow selectRecords
			});
			lvApplicationUsingRegions.getSelectionModel().selectRecords(regions, false);//selectRow
		} else {
			lvApplicationUsingRegions.getSelectionModel().clearSelections();
		}
		
		if(!AIR.AirAclManager.isRelevance(lvApplicationUsingRegions, data)) {
			lvApplicationUsingRegions.getSelectionModel().lock();
			
			if(Ext.isIE) {
				lvApplicationUsingRegions.getEl().addClass('ie8Opacity');
			} else {
				new Fx.Morph(lvApplicationUsingRegions.getId()).set({
					'opacity': 0.5//[0,5],
				});
			}
		} else {
			if(Ext.isIE) {
				lvApplicationUsingRegions.getEl().removeClass('ie8Opacity');
			} else {
				new Fx.Morph(lvApplicationUsingRegions.getId()).set({
					'opacity': 1
				});
			}
		}*/
		
		var lvApplicationUsingRegions = this.getComponent('licenseusingregions').getComponent('applicationUsingRegions');
		lvApplicationUsingRegions.clearSelections(true);
		var tfApplicationUsingRegions = this.getComponent('licenseusingregions').getComponent('applicationUsingRegionsHidden');
		tfApplicationUsingRegions.reset();
		
		if(data.licenseUsingRegions.length > 0) {
			var regions = data.licenseUsingRegions.split(',');
			var store = lvApplicationUsingRegions.getStore();
			
			if(AIR.AirAclManager.isRelevance(lvApplicationUsingRegions,data)) {//lvApplicationUsingRegions.isVisible()
				Ext.each(regions, function(item, index, all) {
					lvApplicationUsingRegions.select(store.getById(item), true, true);
				});
			} else {
				var licenseUsingRegions = data.licenseUsingRegions;
				
				Ext.each(regions, function(item, index, all) {
					licenseUsingRegions = licenseUsingRegions.replace(item, store.getById(item).data.text);
				});
				tfApplicationUsingRegions.setValue(licenseUsingRegions.replace(/,/g,'\n'));//data.licenseUsingRegions.replace(',','\n')
			}
		}
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('licenselicense').getComponent('licenseType'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licenselicense').getComponent('applicationAccessingUserCount'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licenselicense').getComponent('applicationAccessingUserCountMeasured'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licenselicense').getComponent('dedicated'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licenselicense').getComponent('loadClass'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licenselicense').getComponent('serviceModel'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('licensecosts').getComponent('costRunPa'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licensecosts').getComponent('costChangePa'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licensecosts').getComponent('currency'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licensecosts').getComponent('runAccount'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('licensecosts').getComponent('changeAccount'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('licenseusingregions').getComponent('applicationUsingRegions'), data);
	},
	
	//getData: function() {
	setData: function(data) {
		//var data = {};
			
		
		field = this.getComponent('licenselicense').getComponent('licenseType');
		if(!field.disabled)
			if(field.getValue().length > 0) {
				data.licenseTypeId = field.getValue();
			} else {
				data.licenseTypeId = -1;
			}
////			if(undefined !== field.getValue() && '' !== field.getValue())
//				data.licenseTypeId = field.getValue();
		

		
		
		
		field = this.getComponent('licenselicense').getComponent('applicationAccessingUserCount');
		if(!field.disabled)
			data.accessingUserCount = field.getValue().length > 0 ? field.getValue() : -1;
		
		
		
		field = this.getComponent('licenselicense').getComponent('applicationAccessingUserCountMeasured');
		if(!field.disabled)
			data.accessingUserCountMeasured = field.getValue().length > 0 ? field.getValue() : -1;
		
		field = this.getComponent('licenselicense').getComponent('dedicated');
		if(!field.disabled)
			if(undefined !== field.getValue() && '' !== field.getValue())
				data.dedicated = field.getValue();
			
		
		field = this.getComponent('licenselicense').getComponent('loadClass');
		if(!field.disabled)
			if(undefined !== field.getValue() && '' !== field.getValue())
				data.loadClass = field.getValue();
			
		field = this.getComponent('licenselicense').getComponent('serviceModel');
		if(!field.disabled)
			if(undefined !== field.getValue() && '' !== field.getValue())
				data.serviceModel = field.getValue();
		
		
		
		
		
		field = this.getComponent('licensecosts').getComponent('costRunPa');
		if(!field.disabled)
			data[field.id] = field.getValue().length > 0 ? field.getValue() : -1;
		
		field = this.getComponent('licensecosts').getComponent('costChangePa');
		if(!field.disabled)
			data[field.id] = field.getValue().length > 0 ? field.getValue() : -1;
		
		
		field = this.getComponent('licensecosts').getComponent('currency');
		if(!field.disabled)
//			if (undefined !== field.getValue() && '' !== field.getValue())
//				data.currencyId = field.getValue();
			if(field.getValue().length > 0) {
				data.currencyId = field.getValue();
			} else {
				data.currencyId = -1;
			}
		

		field = this.getComponent('licensecosts').getComponent('runAccount');
		if(!field.disabled)
//			if (undefined !== field.getValue() && '' !== field.getValue())
//				data.costRunAccountId = field.getValue();
			if(field.getValue().length > 0) {
				data.costRunAccountId = field.getValue();
			} else {
				data.costRunAccountId = -1;
			}
		
		
		field = this.getComponent('licensecosts').getComponent('changeAccount');
		if(!field.disabled)
//			if (undefined !== field.getValue() && '' !== field.getValue())
//				data.costChangeAccountId = field.getValue();
			if(field.getValue().length > 0) {
				data.costChangeAccountId = field.getValue();
			} else {
				data.costChangeAccountId = -1;
			}
		
		
		field = this.getComponent('licenseusingregions').getComponent('applicationUsingRegions');
		if(!field.disabled)
			data.licenseUsingRegions = selectedUsingRegions;//this.selectedUsingRegions
		
		
		//return data;
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.licensePanelTitle);
		this.get('licenselicense').setTitle(labels.licenselicense);//get aus Superklasse (Test zur Vereinfachung von getComponent)
		this.get('licensecosts').setTitle(labels.licensecosts);
		this.get('licenseusingregions').setTitle(labels.usingRegions);
		
		this.setFieldLabel(this.getComponent('licenselicense').getComponent('licenseType'), labels.licenseType);
		this.setFieldLabel(this.getComponent('licenselicense').getComponent('applicationAccessingUserCount'), labels.applicationAccessingUserCount);
		this.setFieldLabel(this.getComponent('licenselicense').getComponent('applicationAccessingUserCountMeasured'), labels.applicationAccessingUserCountMeasured);
		this.setFieldLabel(this.getComponent('licenselicense').getComponent('dedicated'), labels.applicationDedicatedShared);
		this.setFieldLabel(this.getComponent('licenselicense').getComponent('loadClass'), labels.applicationLoadClass);
		this.setFieldLabel(this.getComponent('licenselicense').getComponent('serviceModel'), labels.applicationServiceModel);
		
		this.setFieldLabel(this.getComponent('licensecosts').getComponent('costRunPa'), labels.costRunPa);
		this.setFieldLabel(this.getComponent('licensecosts').getComponent('costChangePa'), labels.costChangePa);
		this.setFieldLabel(this.getComponent('licensecosts').getComponent('currency'), labels.currency);
		this.setFieldLabel(this.getComponent('licensecosts').getComponent('runAccount'), labels.runAccount);
		this.setFieldLabel(this.getComponent('licensecosts').getComponent('changeAccount'), labels.changeAccount);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.getComponent('licenselicense').getComponent('licenseType').label, toolTips.licenseType, toolTips.licenseTypeText);        
		this.setTooltipData(this.getComponent('licenselicense').getComponent('applicationAccessingUserCount').label, toolTips.applicationAccessingUserCount, toolTips.applicationAccessingUserCountText);
		this.setTooltipData(this.getComponent('licenselicense').getComponent('applicationAccessingUserCountMeasured').label, toolTips.applicationAccessingUserCountMeasured, toolTips.applicationAccessingUserCountMeasuredText);
		this.setTooltipData(this.getComponent('licenselicense').getComponent('dedicated').label, toolTips.dedicated, toolTips.dedicatedText);
		this.setTooltipData(this.getComponent('licenselicense').getComponent('loadClass').label, toolTips.loadClass, toolTips.loadClassText);
		this.setTooltipData(this.getComponent('licenselicense').getComponent('serviceModel').label, toolTips.serviceModel, toolTips.serviceModelText);

		this.setTooltipData(this.getComponent('licensecosts').getComponent('costRunPa').label, toolTips.costRunPa, toolTips.costRunPaText);
		this.setTooltipData(this.getComponent('licensecosts').getComponent('costChangePa').label, toolTips.costChangePa, toolTips.costChangePaText);
		this.setTooltipData(this.getComponent('licensecosts').getComponent('currency').label, toolTips.currency, toolTips.currencyText);
		this.setTooltipData(this.getComponent('licensecosts').getComponent('runAccount').label, toolTips.runAccount, toolTips.runAccountText);
		this.setTooltipData(this.getComponent('licensecosts').getComponent('changeAccount').label, toolTips.changeAccount, toolTips.changeAccountText);
		
//		this.setTooltipData(this.getComponent('licenseusingregions').getComponent('applicationUsingRegions').label, toolTips.applicationUsingRegions, toolTips.applicationUsingRegionsText);
	}
});
Ext.reg('AIR.CiLicenseView', AIR.CiLicenseView);
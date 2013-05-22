Ext.namespace('AIR');

AIR.CiSpecificsItItemView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 190,
		    
		    border: false,
		    layout: 'form',
		    autoScroll: true,
		    
		    items: [{
		        id: 'tfItSystemCiName',
		    	xtype: 'textfield',
		        fieldLabel: 'Alias',
		        width: 230,
		        enableKeyEvents: true
//		        hidden: true
	        },{
		        id: 'tfItSystemCiAlias',
		    	xtype: 'textfield',
		        fieldLabel: 'Alias',
		        width: 230,
		        enableKeyEvents: true
	        },{
		    	xtype: 'fieldset',
		        id: 'fsOs',
		        layout: 'form',//form hbox
		        
		        title: 'OS',
		        width: 440,
		        labelWidth: 180,
		        
				items: [/*{
		            xtype: 'radiogroup',
        			id: 'rgItSystemType',
        			width: 200,
        			
        			columns: 2,
        			fieldLabel: 'HW relation',
//        			hideLabel: true,

		            items: [
		                { id: 'rgIdentifying',	itemId: 'rgIdentifying', 	boxLabel: 'identifying',	name: 'rgItSystemType', inputValue: 1, width: 80 },
		                { id: 'rgTransient',	itemId: 'rgTransient',		boxLabel: 'transient',		name: 'rgItSystemType', inputValue: 2, width: 80 }
		            ]
				},*/{
					xtype: 'filterCombo',//combo
			        id: 'cbOsGroup',
					
//					enableKeyEvents: true,
			        
			        width: 230,
			        fieldLabel: 'Group',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
//					editable: false,
			        
					lastQuery: '',
			        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
			        valueField: 'id',
			        displayField: 'name',
			        
//			        validateOnBlur: false,
//			        clearFilterOnReset: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				},{
					xtype: 'filterCombo',//combo
			        id: 'cbOsType',
					
//					enableKeyEvents: true,
			        
			        width: 230,
			        fieldLabel: 'Type',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
//			        editable: false,
			        
					lastQuery: '',
			        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
			        valueField: 'osTypeId',
			        displayField: 'osName',
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				},{
					xtype: 'filterCombo',//filterCombo combo
			        id: 'cbOsName',
					
//					enableKeyEvents: true,
			        
			        width: 230,
			        fieldLabel: 'Name',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
//			        editable: false,
			        
					lastQuery: '',
			        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
			        valueField: 'osNameId',//id
			        displayField: 'osName',//name
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				}]
		    },{
				xtype: 'filterCombo',//combo
		        id: 'cbClusterCode',
				
//				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'Cluster Code',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        
				lastQuery: '',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbClusterType',
				
//				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'Cluster Type',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        
				lastQuery: '',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
	            xtype: 'radiogroup',
    			id: 'rgVirtualHWClient',
    			width: 200,
    			
    			columns: 2,
    			fieldLabel: 'Virtual Hardware Client',
//    			hideLabel: true,

	            items: [
	                { id: 'rgVirtualHWClientYes',	itemId: 'rgVirtualHWClientYes', 	boxLabel: 'Yes',	name: 'rgVirtualHWClient', inputValue: 'Y', width: 50 },
	                { id: 'rgVirtualHWClientNo',	itemId: 'rgVirtualHWClientNo',		boxLabel: 'No',		name: 'rgVirtualHWClient', inputValue: 'N', width: 50 }
	            ]
			},{
	            xtype: 'radiogroup',
    			id: 'rgVirtualHWHost',
    			width: 200,
    			
    			columns: 2,
    			fieldLabel: 'Virtual Hardware Host',
//    			hideLabel: true,

	            items: [
	                { id: 'rgVirtualHWHostYes',	itemId: 'rgVirtualHWHostYes', 	boxLabel: 'Yes',	name: 'rgVirtualHWHost', inputValue: 'Y', width: 50 },
	                { id: 'rgVirtualHWHostNo',	itemId: 'rgVirtualHWHostNo',	boxLabel: 'No',		name: 'rgVirtualHWHost', inputValue: 'N', width: 50 }
	            ]
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbVirtualSoftware',
				
//				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'Virtual Software',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        
				lastQuery: '',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbItSystemLifecycleStatus',
				
//				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'Lifecycle',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        
				lastQuery: '',
		        store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbItSystemOperationalStatus',
				
//				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'Operational Status',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        
				lastQuery: '',
		        store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbPrimaryFunction',
				
//				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'Primary Function',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        
				lastQuery: '',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbLicenseScanning',
				
//				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'License Scanning',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        disabled: true,
		        hideTrigger: true,
		        
				lastQuery: '',
		        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			}]
		});
		
		AIR.CiSpecificsItItemView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		var tfItSystemCiName = this.getComponent('tfItSystemCiName');
		var tfItSystemCiAlias = this.getComponent('tfItSystemCiAlias');
		tfItSystemCiName.on('change', this.onCiNameChange, this);//onFieldChange
		tfItSystemCiAlias.on('change', this.onFieldChange, this);
		tfItSystemCiName.on('keyup', this.onFieldKeyUp, this);//onFieldKeyUp onCiNameKeyUp
		tfItSystemCiAlias.on('keyup', this.onFieldKeyUp, this);
		
		var cbItSystemLifecycleStatus = this.getComponent('cbItSystemLifecycleStatus');
		var cbItSystemOperationalStatus = this.getComponent('cbItSystemOperationalStatus');
		
		cbItSystemLifecycleStatus.on('select', this.onSelect, this);
		cbItSystemOperationalStatus.on('select', this.onSelect, this);
        cbItSystemLifecycleStatus.on('change', this.onChange, this);
        cbItSystemOperationalStatus.on('change', this.onChange, this);
        
		var rgVirtualHWClient = this.getComponent('rgVirtualHWClient');
		var rgVirtualHWHost = this.getComponent('rgVirtualHWHost');
		
		rgVirtualHWClient.on('change', this.onRadioGroupChange, this);
		rgVirtualHWHost.on('change', this.onRadioGroupChange, this);
	},
	
	clear: function(data) {
		
	},
	
	init: function() {
		var storeIds = {
			osGroupsListStore: null,
			osTypesListStore: null,
			osNamesListStore: null,
			clusterCodesListStore: null,
			clusterTypesListStore: null,
			virtualSoftwareListStore: null,
			itSystemPrimaryFunctionsListStore: null,
			itSystemLicenseScanningsListStore: null
		};
		
		var storeCount = 0;
		for(var key in this.storeIds)
			storeCount++;
		
		var storeLoader = new AIR.AirStoreLoader();
        storeLoader.init(storeIds, storeCount);
        storeLoader.on('storesLoaded', this.onStoresLoaded, this);
        storeLoader.load();
	},
	
    onStoresLoaded: function(storeLoader, storeMap) {
		for(var key in storeMap)
			AIR.AirStoreManager.addStore(key, storeMap[key]);

		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
		var cbClusterCode = this.getComponent('cbClusterCode');
		var cbClusterType = this.getComponent('cbClusterType');
		var cbVirtualSoftware = this.getComponent('cbVirtualSoftware');
		var cbPrimaryFunction = this.getComponent('cbPrimaryFunction');
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		
		cbOsGroup.bindStore(AIR.AirStoreManager.getStoreByName('osGroupsListStore'));
		cbOsType.bindStore(AIR.AirStoreManager.getStoreByName('osTypesListStore'));
		cbOsName.bindStore(AIR.AirStoreManager.getStoreByName('osNamesListStore'));
		cbClusterCode.bindStore(AIR.AirStoreManager.getStoreByName('clusterCodesListStore'));
		cbClusterType.bindStore(AIR.AirStoreManager.getStoreByName('clusterTypesListStore'));
		cbVirtualSoftware.bindStore(AIR.AirStoreManager.getStoreByName('virtualSoftwareListStore'));
		cbPrimaryFunction.bindStore(AIR.AirStoreManager.getStoreByName('itSystemPrimaryFunctionsListStore'));
		cbLicenseScanning.bindStore(AIR.AirStoreManager.getStoreByName('itSystemLicenseScanningsListStore'));
		Util.disableCombo(cbLicenseScanning);

        
        cbOsGroup.on('select', this.onOsGroupSelect, this);
        cbOsType.on('select', this.onOsTypeSelect, this);
        cbOsName.on('select', this.onOsNameSelect, this);//onOsNameSelect onSelect
        cbClusterCode.on('select', this.onSelect, this);
        cbClusterType.on('select', this.onSelect, this);
        cbVirtualSoftware.on('select', this.onSelect, this);
        cbPrimaryFunction.on('select', this.onSelect, this);
//        cbLicenseScanning.on('select', this.onSelect, this);
        
        cbOsGroup.on('change', this.onOsGroupChange, this);
        cbOsType.on('change', this.onOsTypeChange, this);
        cbOsName.on('change', this.onOsNameChange, this);//onChange
        cbClusterCode.on('change', this.onChange, this);
        cbClusterType.on('change', this.onChange, this);
        cbVirtualSoftware.on('change', this.onChange, this);
        cbPrimaryFunction.on('change', this.onChange, this);
//        cbLicenseScanning.on('change', this.onChange, this);
                
        storeLoader.destroy();
		var ciDetail = AAM.getAppDetail();
//		cbOsGroup.getStore().filter('type', ciDetail.ciSubTypeId);
        
//        this.update(ciDetail);
		var delayedTask = new Ext.util.DelayedTask(function() {
			this.update(ciDetail);
			this.updateAccessMode(ciDetail);
			this.ownerCt.fireEvent('viewInitialized', this);//ciChange .ownerCt
		}.createDelegate(this));
		delayedTask.delay(1000);//1000
	},
	
	//onCiNameKeyUp: function(textfield, event) {
	onCiNameChange: function(textfield, newValue, oldValue) {
		var tfItSystemCiAlias = this.getComponent('tfItSystemCiAlias');
		if(tfItSystemCiAlias.getValue().length === 0)
			tfItSystemCiAlias.setValue(textfield.getValue());
		
		this.ownerCt.fireEvent('ciChange', this, textfield);
	},
	
	onFieldChange: function(textfield, newValue, oldValue) {
		this.ownerCt.fireEvent('ciChange', this, textfield, newValue);
	},
	onFieldKeyUp: function(textfield, event) {
		this.ownerCt.fireEvent('ciChange', this, textfield);
	},
	onFieldKeyUp: function(textfield, event) {
		this.ownerCt.fireEvent('ciChange', this, textfield);
	},
	onRadioGroupChange: function(rgb, checkedRadio) {
		this.ownerCt.fireEvent('ciChange', this, rgb, checkedRadio);
	},

	/*onOsGroupSelect: function(combo, record, index) {
		this.setOsType(record);
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onOsTypeSelect: function(combo, record, index) {
		this.setOsName(record);
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},*/
//	onOsNameSelect: function(combo, record, index) {
//		
//	},
	
	
//	onOsGroupKeyUp: function(combo, event) {
//		combo.getStore().filter('type', AAM.getAppDetail().ciSubTypeId);
//	},
	
	onOsGroupChange: function(combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue)) {
    		this.ownerCt.fireEvent('ciChange', this, combo, newValue);
    	
//	    	combo.getStore().filter('type', AAM.getAppDetail().ciSubTypeId);
	    	
	    	var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
	    	var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		cbOsType.reset();
	    		cbOsName.reset();
	    		
	    		var fd1 = { itSystemType: AAM.getAppDetail().ciSubTypeId };
	    		cbOsType.filterByData(fd1);
	    		cbOsName.filterByData(fd1);
//	    		cbOsType.getStore().filter('itSystemType', AAM.getAppDetail().ciSubTypeId);
//	    		cbOsName.getStore().filter('itSystemType', AAM.getAppDetail().ciSubTypeId);
	    		
	    		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
//	    		cbLicenseScanning.reset();
//	    		cbLicenseScanning.setValue('');
	    		cbLicenseScanning.setRawValue('');
	    	} else {
	    		this.setOsGroup(combo, combo.getStore().getById(newValue));
	    	}
		}/* else {
//			combo.reset();
    		combo.getStore().filter('type', AAM.getAppDetail().ciSubTypeId);
    	}*/
    	
//    	combo.getStore().filter('type', AAM.getAppDetail().ciSubTypeId);
//    	combo.view.refresh();
		
		
    	
//		combo.reset();
//    	combo.getStore().filter('type', AAM.getAppDetail().ciSubTypeId);
    	
    	
//    	var osGroupRecord = combo.getStore().getById(newValue);
//    	var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
//		var osTypeRecord = Util.getComboRecord(cbOsType, 'osGroup', osGroupRecord.get('name'));
		
//		var osNameRecord = Util.getComboRecord(cbOsName, 'id', parseInt(data.osNameId));
//		var osTypeRecord = Util.getComboRecord(cbOsType, 'osTypeId', osNameRecord.get('type'));
//		var osGroupRecord = Util.getComboRecord(cbOsGroup, 'name', osTypeRecord.get('osGroup'));//
//
//		
//		this.setOsType(osGroupRecord);//osTypeRecord
	},
	onOsTypeChange: function(combo, newValue, oldValue) {
		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		
    	if(this.isComboValueValid(combo, newValue, oldValue)) {
    		this.ownerCt.fireEvent('ciChange', this, combo, newValue);
    	
	    	
	    	var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		cbOsName.reset();
	    		
	    		var fd1 = { itSystemType: AAM.getAppDetail().ciSubTypeId };
	    		cbOsName.filterByData(fd1);
//	    		cbOsName.getStore().filter('itSystemType', AAM.getAppDetail().ciSubTypeId);
	    		
	    		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
//	    		cbLicenseScanning.reset();
//	    		cbLicenseScanning.setValue('');
	    		cbLicenseScanning.setRawValue('');
	    	} else {
	    		this.setOsType(combo, combo.getStore().getById(newValue));
	    	}
    	} else {
    		if(cbOsGroup.getValue()) {
    			var r = cbOsGroup.getStore().getById(cbOsGroup.getValue());
    			
    			var fd1 = { osGroup: r.get('name') };
    			combo.filterByData(fd1);
//    			combo.getStore().filter('osGroup', r.get('name'));
    		} else {
    			var fd1 = { itSystemType: AAM.getAppDetail().ciSubTypeId };
    			combo.filterByData(fd1);
//    			combo.getStore().filter('itSystemType', AAM.getAppDetail().ciSubTypeId);
    		}
    	}
	},
	onOsNameChange: function(combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue)) {
    		this.ownerCt.fireEvent('ciChange', this, combo, newValue);
    		
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    	} else {
	    		this.setOsName(combo, combo.getStore().getById(newValue));
	    	}
    	}
	},
	/*
	setOsType: function(record) {
		var filterData = {
			osGroup: record.get('name'),
			itSystemType: record.get('type')
		};
		
		var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
		cbOsType.filterByData(filterData);
		cbOsType.setValue('');
		
		var osTypeRecord = Util.getComboRecord(cbOsType, 'osGroup', record.get('name'));
		
		this.setOsName(osTypeRecord);
	},
	setOsName: function(record) {
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
		cbOsName.getStore().filter('type', record.get('osTypeId'));
		cbOsName.setValue('');
	},*/
	
	onSelect: function(combo, record, index) {
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.ownerCt.fireEvent('ciChange', this, combo, newValue, oldValue);
	},
	
	
	
	update: function(data) {
		this.ciId = data.id;
		this.name = data.name;
		
		var tfItSystemCiName = this.getComponent('tfItSystemCiName');
		var tfItSystemCiAlias = this.getComponent('tfItSystemCiAlias');
		
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
		var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		
		var cbClusterCode = this.getComponent('cbClusterCode');
		var cbClusterType = this.getComponent('cbClusterType');
		var cbVirtualSoftware = this.getComponent('cbVirtualSoftware');
		var cbItSystemLifecycleStatus = this.getComponent('cbItSystemLifecycleStatus');
		var cbItSystemOperationalStatus = this.getComponent('cbItSystemOperationalStatus');
		var cbPrimaryFunction = this.getComponent('cbPrimaryFunction');
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		
		var rgVirtualHWClient = this.getComponent('rgVirtualHWClient');
		var rgVirtualHWHost = this.getComponent('rgVirtualHWHost');
		
		cbOsName.reset();
		cbOsType.reset();
		cbOsGroup.reset();
		

		
//		cbOsGroup.getStore().filter('type', data.ciSubTypeId);
//		cbOsType.getStore().filter('itSystemType', data.ciSubTypeId);
//		cbOsName.getStore().filter('itSystemType', data.ciSubTypeId);
		
//		cbItSystemLifecycleStatus.getStore().filter('tableId', data.tableId);
		
//		this.updateAccessMode(data);//es reicht bei der Initialisierung

		
		if(data.isCiCreate) {
//			tfItSystemCiName.setVisible(true);
			tfItSystemCiName.reset();
			tfItSystemCiAlias.enable();
			tfItSystemCiAlias.reset();
			
			
			cbClusterCode.reset();
			cbClusterType.reset();
			cbVirtualSoftware.reset();
			cbItSystemLifecycleStatus.reset();
			cbItSystemOperationalStatus.reset();
			cbPrimaryFunction.reset();
//			cbLicenseScanning.reset();
//			cbLicenseScanning.setValue('');
			cbLicenseScanning.setRawValue('');
			
			rgVirtualHWClient.reset();
			rgVirtualHWHost.reset();
			
			Util.enableCombo(cbOsGroup);
			Util.enableCombo(cbOsType);
			Util.enableCombo(cbOsName);
			
			Util.enableCombo(cbClusterCode);
			Util.enableCombo(cbClusterType);
			Util.enableCombo(cbVirtualSoftware);
			Util.enableCombo(cbItSystemLifecycleStatus);
			Util.enableCombo(cbItSystemOperationalStatus);
			Util.enableCombo(cbPrimaryFunction);
//			Util.enableCombo(cbLicenseScanning);
			
			rgVirtualHWClient.enable();
			rgVirtualHWHost.enable();
		} else {
//			tfItSystemCiName.setVisible(false);
			tfItSystemCiName.setValue(data.name);//wegen mandatory fields check setzen!
			tfItSystemCiAlias.setValue(data.alias);
			
			
			var osNameRecord = Util.getComboRecord(cbOsName, 'osNameId', parseInt(data.osNameId));//id
			var osTypeRecord = Util.getComboRecord(cbOsType, 'osTypeId', osNameRecord.get('osTypeId'));//type
			if(data.osNameId) {
				var osGroupRecord = Util.getComboRecord(cbOsGroup, 'name', osTypeRecord.get('osGroup'));
				
				
				var fd1 = { osGroup: osGroupRecord.get('name') };
				var fd2 = { osTypeId: osTypeRecord.get('osTypeId') };
				cbOsType.filterByData(fd1);
				cbOsName.filterByData(fd2);
//				cbOsType.getStore().filter('osGroup', osGroupRecord.get('name'));
//				cbOsName.getStore().filter('osTypeId', osTypeRecord.get('osTypeId'));//type
		
				cbOsName.setValue(data.osNameId);
				cbOsType.setValue(osTypeRecord.get('osTypeId'));
				cbOsGroup.setValue(osGroupRecord.get('id'));
			}
			
			var clusterCodeRecord = Util.getComboRecord(cbClusterCode, 'type', data.clusterCode);
			
			cbClusterCode.setValue(clusterCodeRecord.get('id'));//data.clusterCode
			cbClusterType.setValue(data.clusterType);
			cbVirtualSoftware.setValue(data.virtualHardwareSoftware);
			
			
			cbItSystemLifecycleStatus.setValue(data.lifecycleStatusId);
			cbItSystemOperationalStatus.setValue(data.einsatzStatusId);
			
			cbPrimaryFunction.setValue(data.primaryFunctionId);
			if(typeof data.licenseScanningId === 'string' && data.licenseScanningId.length === 0) {
//				cbLicenseScanning.setRawValue('');
				cbLicenseScanning.setValue(osTypeRecord.get('licenseScanning'));
			} else {
				cbLicenseScanning.setValue(data.licenseScanningId);
			}
			
			
			if(data.isVirtualHardwareClient) {
				rgVirtualHWClient.setValue(data.isVirtualHardwareClient);
			} else {
				rgVirtualHWClient.reset();
			}
			
			if(data.isVirtualHardwareHost) {
				rgVirtualHWHost.setValue(data.isVirtualHardwareHost);
			} else {
				rgVirtualHWHost.reset();
			}
		}
		
		var fd1 = { type: data.ciSubTypeId };
		var fd2 = { itSystemType: data.ciSubTypeId };
		
		cbOsGroup.filterByData(fd1);
		cbOsType.filterByData(fd2);
		cbOsName.filterByData(fd2);
		
		var filterData = { tableId: data.tableId };
		cbItSystemLifecycleStatus.filterByData(filterData);
	},
	
	
	setData: function(data) {
		if(data.isCiCreate) {
			data.id = 0;
			data.name = this.getComponent('tfItSystemCiName').getValue();
		} else {
			data.name = this.name;
			data.id = this.ciId;
		}
		
		var ciDetail = AAM.getAppDetail();
		data.ciSubTypeId = ciDetail.ciSubTypeId;
		
		
		var field = this.getComponent('tfItSystemCiAlias');
		if(!field.disabled)
			data.alias = field.getValue();
		
		field = this.getComponent('fsOs').getComponent('cbOsName');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.osNameId = field.getValue();
			else 
				data.osNameId = -1;
		
		field = this.getComponent('cbClusterCode');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.clusterCode = field.getStore().getById(field.getValue()).get('type');
			else
				data.clusterCode = '-1';
		
		field = this.getComponent('cbClusterType');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.clusterType = field.getRawValue();
			else
				data.clusterType = '-1';
		
		
		field = this.getComponent('cbVirtualSoftware');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.virtualHardwareSoftware = field.getRawValue();
			else
				data.virtualHardwareSoftware = '-1';
		 
		
		field = this.getComponent('cbItSystemLifecycleStatus');
		if(!field.disabled)
			if(field.getValue().length > 0)
				data.lifecycleStatusId = field.getValue();
			else
				data.lifecycleStatusId = -1;
		
		field = this.getComponent('cbItSystemOperationalStatus');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.einsatzStatusId = field.getValue();//operationalStatusId
			else
				data.einsatzStatusId = -1;//operationalStatusId
		
		
		field = this.getComponent('cbPrimaryFunction');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.primaryFunctionId = field.getValue();
			else 
				data.primaryFunctionId = -1;
		
		field = this.getComponent('cbLicenseScanning');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.licenseScanningId = field.getValue();
			else
				data.licenseScanningId = -1;
		
		
		field = this.getComponent('rgVirtualHWClient');
		if(!field.disabled)
			if(field.getValue() && field.getValue().inputValue)//.length > 0
				data.isVirtualHardwareClient = field.getValue().inputValue;
		
		field = this.getComponent('rgVirtualHWHost');
		if(!field.disabled)
			if(field.getValue() && field.getValue().inputValue)//.length > 0
				data.isVirtualHardwareHost = field.getValue().inputValue;
	},

	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('tfItSystemCiName'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfItSystemCiAlias'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsOs').getComponent('cbOsGroup'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsOs').getComponent('cbOsType'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsOs').getComponent('cbOsName'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbClusterCode'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbClusterType'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('rgVirtualHWClient'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('rgVirtualHWHost'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbVirtualSoftware'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbItSystemLifecycleStatus'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbItSystemOperationalStatus'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbPrimaryFunction'), data);
//		AIR.AirAclManager.setAccessMode(this.getComponent('cbLicenseScanning'), data);
	},
	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {
		this.setFieldLabel(this.getComponent('tfItSystemCiName'), labels.name);
		this.setFieldLabel(this.getComponent('tfItSystemCiAlias'), labels.applicationAlias);
		
		this.setFieldLabel(this.getComponent('fsOs').getComponent('cbOsGroup'), labels.osGroup);
		this.setFieldLabel(this.getComponent('fsOs').getComponent('cbOsType'), labels.osType);
		this.setFieldLabel(this.getComponent('fsOs').getComponent('cbOsName'), labels.osName);
		
		this.setFieldLabel(this.getComponent('cbClusterCode'), labels.clusterCode);
		this.setFieldLabel(this.getComponent('cbClusterType'), labels.clusterType);
		this.setFieldLabel(this.getComponent('rgVirtualHWClient'), labels.virtualHardwareClient);
		this.setFieldLabel(this.getComponent('rgVirtualHWHost'), labels.virtualHardwareHost);
		this.setBoxLabel(this.getComponent('rgVirtualHWClient').items.items[0], labels.general_yes);
		this.setBoxLabel(this.getComponent('rgVirtualHWClient').items.items[1], labels.general_no);
		this.setBoxLabel(this.getComponent('rgVirtualHWHost').items.items[0], labels.general_yes);
		this.setBoxLabel(this.getComponent('rgVirtualHWHost').items.items[1], labels.general_no);
		this.setFieldLabel(this.getComponent('cbVirtualSoftware'), labels.virtualHardwareSoftware);
		this.setFieldLabel(this.getComponent('cbItSystemLifecycleStatus'), labels.lifecycleStatus);
		this.setFieldLabel(this.getComponent('cbItSystemOperationalStatus'), labels.operationalStatus);
		this.setFieldLabel(this.getComponent('cbPrimaryFunction'), labels.primaryFunction);
		this.setFieldLabel(this.getComponent('cbLicenseScanning'), labels.licenseScanning);
	},
	
	updateToolTips: function(toolTips) {

	},
	
	
	onOsGroupSelect: function(combo, record, index) {
		this.setOsGroup(combo, record);
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onOsTypeSelect: function(combo, record, index) {
		this.setOsType(combo, record);
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onOsNameSelect: function(combo, record, index) {
		this.setOsName(combo, record);
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	
	setOsGroup: function(combo, record) {
		var filterData = {
			osGroup: record.get('name'),
			itSystemType: record.get('type')
		};
		
		var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
		cbOsType.filterByData(filterData);
		cbOsType.setValue('');
		
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
//			cbOsName.getStore().filter('type', record.get('osTypeId'));
//		cbOsName.reset();
		
		var fd1 = { itSystemType: AAM.getAppDetail().ciSubTypeId };
		cbOsName.filterByData(fd1);
//		cbOsName.getStore().filter('itSystemType', AAM.getAppDetail().ciSubTypeId);
		cbOsName.setValue('');
		
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
//		cbLicenseScanning.reset();
//		cbLicenseScanning.setValue('');
		cbLicenseScanning.setRawValue('');
	},
	
	setOsType: function(combo, record) {
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
		cbOsName.reset();
		
		var filterData = {
			osTypeId: record.get('osTypeId')//type
		};
		cbOsName.filterByData(filterData);
//		cbOsName.getStore().filter('type', record.get('osTypeId'));
		cbOsName.setValue('');
		
		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		var osGroupRecord = Util.getComboRecord(cbOsGroup, 'name', record.get('osGroup'));
		cbOsGroup.setValue(osGroupRecord.get('id'));
		
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		cbLicenseScanning.setValue(record.get('licenseScanning'));
	},
	setOsName: function(combo, record) {
		var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
		cbOsType.reset();
		var osTypeRecord = Util.getComboRecord(cbOsType, 'osTypeId', record.get('osTypeId'));//type
		cbOsType.setValue(osTypeRecord.get('osTypeId'));
		
		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		cbOsGroup.reset();
		var osGroupRecord = Util.getComboRecord(cbOsGroup, 'name', osTypeRecord.get('osGroup'));
		cbOsGroup.setValue(osGroupRecord.get('id'));
		
		
		var fd1 = { type: AAM.getAppDetail().ciSubTypeId };
		cbOsGroup.filterByData(fd1);
//		cbOsGroup.getStore().filter('type', AAM.getAppDetail().ciSubTypeId);
		
//		cbOsType.getStore().filter('itSystemType', AAM.getAppDetail().ciSubTypeId);
		
		var fd2 = { osGroup: osGroupRecord.get('name') };
		cbOsType.filterByData(fd2);
//		cbOsType.getStore().filter('osGroup', osGroupRecord.get('name'));
		
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		cbLicenseScanning.setValue(osTypeRecord.get('licenseScanning'));
	}
});
Ext.reg('AIR.CiSpecificsItItemView', AIR.CiSpecificsItItemView);
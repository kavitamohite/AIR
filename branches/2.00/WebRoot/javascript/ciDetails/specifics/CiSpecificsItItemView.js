Ext.namespace('AIR');

AIR.CiSpecificsItItemView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 190,
		    
		    border: false,
		    layout: 'form',
		    
		    items: [{
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
					
					enableKeyEvents: true,
			        
			        width: 230,
			        fieldLabel: 'Group',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
					
			        
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
			        id: 'cbOsType',
					
					enableKeyEvents: true,
			        
			        width: 230,
			        fieldLabel: 'Type',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
					
			        
					lastQuery: '',
			        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
			        valueField: 'osTypeId',
			        displayField: 'osName',
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				},{
					xtype: 'filterCombo',//combo
			        id: 'cbOsName',
					
					enableKeyEvents: true,
			        
			        width: 230,
			        fieldLabel: 'Name',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
					
			        
					lastQuery: '',
			        store: new Ext.data.Store(),//AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
			        valueField: 'id',
			        displayField: 'name',
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				}]
		    },{
				xtype: 'filterCombo',//combo
		        id: 'cbClusterCode',
				
				enableKeyEvents: true,
		        
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
				
				enableKeyEvents: true,
		        
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
				
				enableKeyEvents: true,
		        
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
		        id: 'cbLifecycle',
				
				enableKeyEvents: true,
		        
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
				
				enableKeyEvents: true,
		        
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
				
				enableKeyEvents: true,
		        
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
				
				enableKeyEvents: true,
		        
		        width: 230,
		        fieldLabel: 'License Scanning',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
				
		        
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
		
		cbOsGroup.bindStore(AIR.AirStoreManager.getStoreByName('osGroupsListStore'), true);
		cbOsType.bindStore(AIR.AirStoreManager.getStoreByName('osTypesListStore'), true);
		cbOsName.bindStore(AIR.AirStoreManager.getStoreByName('osNamesListStore'), true);
		cbClusterCode.bindStore(AIR.AirStoreManager.getStoreByName('clusterCodesListStore'), true);
		cbClusterType.bindStore(AIR.AirStoreManager.getStoreByName('clusterTypesListStore'), true);
		cbVirtualSoftware.bindStore(AIR.AirStoreManager.getStoreByName('virtualSoftwareListStore'), true);
		cbPrimaryFunction.bindStore(AIR.AirStoreManager.getStoreByName('itSystemPrimaryFunctionsListStore'), true);
		cbLicenseScanning.bindStore(AIR.AirStoreManager.getStoreByName('itSystemLicenseScanningsListStore'), true);
		
		cbOsGroup.getStore().filter('type', AAM.getAppDetail().ciSubTypeId);
        storeLoader.destroy();
        
        cbOsGroup.on('select', this.onOsGroupSelect, this);
        cbOsType.on('select', this.onOsTypeSelect, this);
        cbOsName.on('select', this.onOsNameSelect, this);
        cbClusterCode.on('select', this.onSelect, this);
        cbClusterType.on('select', this.onSelect, this);
        cbVirtualSoftware.on('select', this.onSelect, this);
        cbPrimaryFunction.on('select', this.onSelect, this);
        cbLicenseScanning.on('select', this.onSelect, this);
        
//        cbOsGroup.on('change', this.onOsGroupChange, this);
//        cbOsType.on('change', this.onOsTypeChange, this);
//        cbOsName.on('change', this.onOsNameChange, this);
	},
	
	onSelect: function(combo, record, index) {
		//fire ciChange
	},
	
	onOsGroupSelect: function(combo, record, index) {
		var filterData = {
			osGroup: record.get('name'),
			itSystemType: record.get('type')
		};
		
		var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
		cbOsType.filterByData(filterData);
	},
	onOsTypeSelect: function(combo, record, index) {
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
		cbOsName.getStore().filter('type', record.get('osTypeId'));
	},
	onOsNameSelect: function(combo, record, index) {
		
	},
	
	
	update: function(data) {
//		this.getComponent('cbSite1').setRawValue(data.alias);
		
		//select event triggern, um filterung so wie erwartet, aber nicht geschehen, beim ersten Mal wirksam zu machen?
		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		cbOsGroup.getStore().filter('type', data.ciSubTypeId);//parseInt(data.ciSubTypeId)
		
		
	},
	
	
	updateAccessMode: function(data) {

	},
	
	setData: function(data) {
		
	},

	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {
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
		this.setFieldLabel(this.getComponent('cbLifecycle'), labels.lifecycleStatus);
		this.setFieldLabel(this.getComponent('cbItSystemOperationalStatus'), labels.operationalStatus);
		this.setFieldLabel(this.getComponent('cbPrimaryFunction'), labels.primaryFunction);
		this.setFieldLabel(this.getComponent('cbLicenseScanning'), labels.licenseScanning);
	},
	
	updateToolTips: function(toolTips) {

	}
});
Ext.reg('AIR.CiSpecificsItItemView', AIR.CiSpecificsItItemView);
Ext.namespace('AIR');

AIR.CiSpecificsItItemView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 190,
		    
		    border: false,
		    layout: 'form',

			height: 360,
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
		        layout: 'form',
		        
		        title: 'OS',
		        width: 440,
		        labelWidth: 180,
		        
				items: [{
					xtype: 'filterCombo',
			        id: 'cbOsGroup',
			        width: 230,
			        fieldLabel: 'Group',
					lastQuery: '',
			        store: new Ext.data.Store(),
			        valueField: 'id',
			        displayField: 'name',
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				},{
					xtype: 'filterCombo',
			        id: 'cbOsType',
			        width: 230,
			        fieldLabel: 'Type',
					lastQuery: '',
			        store: new Ext.data.Store(),
			        valueField: 'osTypeId',
			        displayField: 'osName',
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				},{
					xtype: 'filterCombo',
			        id: 'cbOsName',
			        width: 230,
			        fieldLabel: 'Name',
					lastQuery: '',
			        store: new Ext.data.Store(),
			        valueField: 'osNameId',
			        displayField: 'name',
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				},{
					xtype: 'filterCombo',
			        id: 'cbServicePack',
			        width: 230,
			       // fieldLabel: 'Service Pack',
					lastQuery: '',
			        store: new Ext.data.Store(),
			        valueField: 'name',
			        displayField: 'name',
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local'
				}]
		    },{
				xtype: 'filterCombo',
		        id: 'cbClusterCode',
				enableKeyEvents: true,
		        width: 230,
		        fieldLabel: 'Cluster Code',
				lastQuery: '',
		        store: new Ext.data.Store(),
		        valueField: 'id',
		        displayField: 'name',
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',
		        id: 'cbClusterType',
		        width: 230,
		        fieldLabel: 'Cluster Type',
				lastQuery: '',
		        store: new Ext.data.Store(),
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',
		        id: 'cbBackupType',
		        width: 230,
		        //fieldLabel: 'Backup Type',
				lastQuery: '',
		        store: new Ext.data.Store(),
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

	            items: [
	                { id: 'rgVirtualHWHostYes',	itemId: 'rgVirtualHWHostYes', 	boxLabel: 'Yes',	name: 'rgVirtualHWHost', inputValue: 'Y', width: 50 },
	                { id: 'rgVirtualHWHostNo',	itemId: 'rgVirtualHWHostNo',	boxLabel: 'No',		name: 'rgVirtualHWHost', inputValue: 'N', width: 50 }
	            ]
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbVirtualSoftware',
				
		        width: 230,
		        //fieldLabel: 'Virtual Software',
				
		        
				lastQuery: '',
		        store: new Ext.data.Store(),
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbItSystemLifecycleStatus',
				
		        width: 230,
		        fieldLabel: 'Lifecycle',
				
		        
				lastQuery: '',
		        store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbItSystemOperationalStatus',
		        width: 230,
		        fieldLabel: 'Operational Status',
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

		        width: 230,
		        fieldLabel: 'Primary Function',
		        lastQuery: '',
		        store: new Ext.data.Store(),
		        valueField: 'id',
		        displayField: 'name',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'filterCombo',//combo
		        id: 'cbLicenseScanning',

		        width: 350,
		        fieldLabel: 'License Scanning',				
		        disabled: true,
		        hideTrigger: true,
		        
				lastQuery: '',
		        store: new Ext.data.Store(),
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
		tfItSystemCiName.on('change', this.onCiNameChange, this);
		tfItSystemCiAlias.on('change', this.onFieldChange, this);
		tfItSystemCiName.on('keyup', this.onFieldKeyUp, this);
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
			itSystemLicenseScanningsListStore: null,
			backupTypeListStore: null,
			servicePackListStore: null
		};
		
		var storeCount = 0;
		for(var key in storeIds)
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
		var cbServicePack = this.getComponent('fsOs').getComponent('cbServicePack');
		var cbClusterCode = this.getComponent('cbClusterCode');
		var cbClusterType = this.getComponent('cbClusterType');
		var cbBackupType = this.getComponent('cbBackupType');
		var cbVirtualSoftware = this.getComponent('cbVirtualSoftware');
		var cbPrimaryFunction = this.getComponent('cbPrimaryFunction');
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		
		cbOsGroup.bindStore(AIR.AirStoreManager.getStoreByName('osGroupsListStore'));
		cbOsType.bindStore(AIR.AirStoreManager.getStoreByName('osTypesListStore'));
		cbOsName.bindStore(AIR.AirStoreManager.getStoreByName('osNamesListStore'));
		cbServicePack.bindStore(AIR.AirStoreManager.getStoreByName('servicePackListStore'));
		cbClusterCode.bindStore(AIR.AirStoreManager.getStoreByName('clusterCodesListStore'));
		cbClusterType.bindStore(AIR.AirStoreManager.getStoreByName('clusterTypesListStore'));
		cbBackupType.bindStore(AIR.AirStoreManager.getStoreByName('backupTypeListStore'));
		cbVirtualSoftware.bindStore(AIR.AirStoreManager.getStoreByName('virtualSoftwareListStore'));
		cbPrimaryFunction.bindStore(AIR.AirStoreManager.getStoreByName('itSystemPrimaryFunctionsListStore'));
		cbLicenseScanning.bindStore(AIR.AirStoreManager.getStoreByName('itSystemLicenseScanningsListStore'));
		Util.disableCombo(cbLicenseScanning);

        
        cbOsGroup.on('select', this.onOsGroupSelect, this);
        cbOsType.on('select', this.onOsTypeSelect, this);
        cbOsName.on('select', this.onOsNameSelect, this);//onOsNameSelect onSelect
        cbServicePack.on('select', this.onSelect, this);
        cbClusterCode.on('select', this.onClusterCodeSelect, this);
        cbClusterType.on('select', this.onSelect, this);
        cbVirtualSoftware.on('select', this.onSelect, this);
        cbPrimaryFunction.on('select', this.onSelect, this);
        cbBackupType.on('select', this.onSelect, this);
        
        cbOsGroup.on('change', this.onOsGroupChange, this);
        cbOsType.on('change', this.onOsTypeChange, this);
        cbOsName.on('change', this.onOsNameChange, this);//onChange
        cbServicePack.on('change', this.onChange, this);
        cbClusterCode.on('change', this.onClusterCodeChange, this);
        cbClusterType.on('change', this.onChange, this);
        cbVirtualSoftware.on('change', this.onChange, this);
        cbPrimaryFunction.on('change', this.onChange, this);
        cbBackupType.on('change', this.onChange, this);
        cbClusterCode.on('keyup', this.onClusterCodeKeyUp, this);

        
                
        storeLoader.destroy();
		var ciDetail = AAM.getAppDetail();

		var delayedTask = new Ext.util.DelayedTask(function() {
			this.updateAccessMode(ciDetail);
			this.update(ciDetail);
			this.ownerCt.fireEvent('viewInitialized', this);
		}.createDelegate(this));
		delayedTask.delay(500);
	},

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

	onOsGroupChange: function(combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue)) {
    		this.ownerCt.fireEvent('ciChange', this, combo, newValue);
	    	
	    	var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
	    	var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		cbOsType.reset();
	    		cbOsName.reset();
	    		
	    		var fd1 = { itSystemType: AAM.getAppDetail().ciSubTypeId };
	    		cbOsType.filterByData(fd1);
	    		cbOsName.filterByData(fd1);
	    		
	    		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
	    		cbLicenseScanning.setRawValue('');
	    	} else {
	    		this.setOsGroup(combo, combo.getStore().getById(newValue));
	    	}
		}
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

	    		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
	    		cbLicenseScanning.setRawValue('');
	    	} else {
	    		this.setOsType(combo, combo.getStore().getById(newValue));
	    	}
    	} else {
    		if(cbOsGroup.getValue()) {
    			var r = cbOsGroup.getStore().getById(cbOsGroup.getValue());
    			
    			var fd1 = { osGroup: r.get('name') };
    			combo.filterByData(fd1);
    		} else {
    			var fd1 = { itSystemType: AAM.getAppDetail().ciSubTypeId };
    			combo.filterByData(fd1);
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
		
	onSelect: function(combo, record, index) {
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.ownerCt.fireEvent('ciChange', this, combo, newValue, oldValue);
	},
	
	onClusterCodeSelect: function(combo, record, index) {
		var cbClusterType = this.getComponent('cbClusterType');
		
		if(record.get('type') == 'N') {
			Util.disableCombo(cbClusterType);
			cbClusterType.reset();
		} else {
			Util.enableCombo(cbClusterType);
		}
		
		this.ownerCt.fireEvent('ciChange', this, combo, record);
	},
	onClusterCodeChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(typeof newValue === 'number') {
				var cbClusterType = this.getComponent('cbClusterType');
				if(combo.getStore().getById(newValue).get('type') == 'N')
					Util.disableCombo(cbClusterType);
				else
					Util.enableCombo(cbClusterType);
			}
			this.ownerCt.fireEvent('ciChange', this, combo, newValue, oldValue);
		}
	},
	onClusterCodeKeyUp: function(combo, event) {
		if(combo.getRawValue().length === 0) {
			Util.enableCombo(this.getComponent('cbClusterType'));
			this.ownerCt.fireEvent('ciChange', this, combo);
		}
	},
	
	
	update: function(data) {
		this.ciId = data.id;
		this.name = data.name;
		
		var tfItSystemCiName = this.getComponent('tfItSystemCiName');
		var tfItSystemCiAlias = this.getComponent('tfItSystemCiAlias');
		
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
		var cbOsType = this.getComponent('fsOs').getComponent('cbOsType');
		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		var cbServicePack = this.getComponent('fsOs').getComponent('cbServicePack');
		var cbClusterCode = this.getComponent('cbClusterCode');
		var cbClusterType = this.getComponent('cbClusterType');
		var cbBackupType = this.getComponent('cbBackupType');
		var cbVirtualSoftware = this.getComponent('cbVirtualSoftware');
		var cbItSystemLifecycleStatus = this.getComponent('cbItSystemLifecycleStatus');
		var cbItSystemOperationalStatus = this.getComponent('cbItSystemOperationalStatus');
		var cbPrimaryFunction = this.getComponent('cbPrimaryFunction');
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		
		var rgVirtualHWClient = this.getComponent('rgVirtualHWClient');
		var rgVirtualHWHost = this.getComponent('rgVirtualHWHost');
		
		cbServicePack.reset();
		cbOsName.reset();
		cbOsType.reset();
		cbOsGroup.reset();
		
		var filterData = {
				itSystemType: data.ciSubTypeId
			};
		cbOsType.filterByData(filterData);
		cbOsName.filterByData(filterData);
		filterData={
				type: data.ciSubTypeId
		};
		cbOsGroup.filterByData(filterData);
	
		if(data.isCiCreate) {
			tfItSystemCiName.enable();
			tfItSystemCiName.reset();
			tfItSystemCiAlias.enable();
			tfItSystemCiAlias.reset();
			
			//cbServicePack.reset();
			cbVirtualSoftware.reset();
			cbBackupType.reset();
			cbItSystemLifecycleStatus.reset();
			cbItSystemOperationalStatus.reset();
			cbPrimaryFunction.reset();

			cbLicenseScanning.setRawValue('');
			
			rgVirtualHWClient.reset();
			rgVirtualHWHost.reset();
			
			Util.enableCombo(cbOsGroup);
			Util.enableCombo(cbOsType);
			Util.enableCombo(cbOsName);
			
			Util.enableCombo(cbClusterCode);
			Util.enableCombo(cbServicePack);
			Util.enableCombo(cbVirtualSoftware);
			Util.enableCombo(cbBackupType);
			Util.enableCombo(cbItSystemLifecycleStatus);
			Util.enableCombo(cbItSystemOperationalStatus);
			Util.enableCombo(cbPrimaryFunction);

			
			rgVirtualHWClient.enable();
			rgVirtualHWHost.enable();
			
			cbClusterCode.setValue(4);// Default: N / no Cluster
			cbClusterType.reset();
			Util.disableCombo(cbClusterType);
		} else {
			this.updateAccessMode(data);

			tfItSystemCiName.setValue(data.name);//wegen mandatory fields check setzen!
			tfItSystemCiAlias.setValue(data.alias);
			
			if(data.osNameId && data.osNameId.length > 0) {
				var osNameRecord = Util.getComboRecord(cbOsName, 'osNameId', data.osNameId);
				if(osNameRecord) {
					var osTypeRecord = Util.getComboRecord(cbOsType, 'osTypeId', osNameRecord.get('osTypeId'));//type
					var osGroupRecord = Util.getComboRecord(cbOsGroup, 'name', osTypeRecord.get('osGroup'));
					
					
					var fd1 = { osGroup: osGroupRecord.get('name') };
					var fd2 = { osTypeId: osTypeRecord.get('osTypeId') };
					cbOsType.filterByData(fd1);
					cbOsName.filterByData(fd2);
			
					cbOsName.setValue(data.osNameId);
					cbOsType.setValue(osTypeRecord.get('osTypeId'));
					cbOsGroup.setValue(osGroupRecord.get('id'));
				}
			}
			
			var clusterCodeRecord = Util.getComboRecord(cbClusterCode, 'type', data.clusterCode);
			if(clusterCodeRecord!=undefined)
			cbClusterCode.setValue(clusterCodeRecord.get('id'));

			if(data.clusterCode == 'N') {
				cbClusterType.reset();
				Util.disableCombo(cbClusterType);
			} else {
				cbClusterType.setValue(data.clusterType);
			}
			
			cbVirtualSoftware.setValue(data.virtualHardwareSoftware);
			cbBackupType.setValue(data.backupType);
			cbItSystemLifecycleStatus.setValue(data.lifecycleStatusId);
			cbItSystemOperationalStatus.setValue(data.einsatzStatusId);
			cbServicePack.setValue(data.servicePack);
			cbPrimaryFunction.setValue(data.primaryFunctionId);
			if(typeof data.licenseScanningId === 'string' && data.licenseScanningId.length === 0) {
				if(osTypeRecord)
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
		} else {
			data.id = this.ciId;
		}
		
		var v = this.getComponent('tfItSystemCiName').getValue();
		if(v.length > 0)
			data.name = v;
		
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
		 
		field = this.getComponent('fsOs').getComponent('cbServicePack');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.servicePackFor = field.getRawValue();
			else
				data.servicePackFor = '-1';
		
		field = this.getComponent('cbBackupType');
		if(!field.disabled)
			if(field.getValue())//.length > 0
				data.backupType = field.getRawValue();
			else
				data.backupType = '-1';
		
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
		AIR.AirAclManager.setAccessMode(this.getComponent('cbBackupType'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsOs').getComponent('cbServicePack'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbItSystemLifecycleStatus'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbItSystemOperationalStatus'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('cbPrimaryFunction'), data);
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
		this.setFieldLabel(this.getComponent('cbBackupType'), labels.backupType);
		this.setFieldLabel(this.getComponent('fsOs').getComponent('cbServicePack'), labels.servicePack);
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
		
		var fd1 = { itSystemType: AAM.getAppDetail().ciSubTypeId };
		cbOsName.filterByData(fd1);
		cbOsName.setValue('');
		
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		cbLicenseScanning.setRawValue('');
	},
	
	setOsType: function(combo, record) {
		var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
		cbOsName.reset();
		
		var filterData = {
			osTypeId: record.get('osTypeId')//type
		};
		cbOsName.filterByData(filterData);
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
		
		var fd2 = { osGroup: osGroupRecord.get('name') };
		cbOsType.filterByData(fd2);
		
		var cbLicenseScanning = this.getComponent('cbLicenseScanning');
		cbLicenseScanning.setValue(osTypeRecord.get('licenseScanning'));
	}
});
Ext.reg('AIR.CiSpecificsItItemView', AIR.CiSpecificsItItemView);
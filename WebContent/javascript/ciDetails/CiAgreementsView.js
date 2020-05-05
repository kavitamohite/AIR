Ext.namespace('AIR');

AIR.CiAgreementsView = Ext.extend(AIR.AirView, {//Ext.Panel
	
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Agreements',
		    border: false,
		    bodyStyle: 'padding:10px',
		    
		    layout: 'form',
		    height: 150,
		    
		    items: [{
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'SLA',
		        id: 'sla',
		        store: AIR.AirStoreManager.getStoreByName('slaListStore'),//slaListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
		        enableKeyEvents: true,
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local'
		    }, /* emria{  IM0006263625 : Issue saving Contract in AIR
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Service Contract1',
		        id: 'serviceContract1',
		        //store: new Ext.data.Store(),//serviceContractListStore,
		        store: AIR.AirStoreManager.getStoreByName('serviceContractListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        disabled: true,
		        editable: false,

		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local',
		        
		        listEmptyText: 'No matching items found'
		    },*/{

		        id: 'serviceContract',
		    	xtype: 'filterCombo',
		        fieldLabel: 'Service Contract',
		        width: 230,
		        enableKeyEvents: true,
		        forceSelection: true,
		        //store: AIR.AirStoreFactory.createServiceContractListStore(),
		        store: AIR.AirStoreManager.getStoreByName('serviceContractListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        triggerAction: 'all',
		        mode: 'local',
		        //queryParam: 'id',
		        listEmptyText: 'No matching items found'
			
		    },{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Priority Level',
//		        name: 'priorityLevel',
		        
		        id: 'priorityLevel',
		        store: AIR.AirStoreManager.getStoreByName('priorityLevelListStore'),//priorityLevelListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local'
		    },{
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Severity Level',
		        
		        id: 'severityLevel',
		        store: AIR.AirStoreManager.getStoreByName('severityLevelListStore'),//severityLevelListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local'
		    },{
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Business Essential',
//		        name: 'businessEssential',
		        
		        id: 'businessEssential',
		        store: AIR.AirStoreManager.getStoreByName('businessEssentialListStore'),//businessEssentialListStore,
		        valueField: 'id',
		        displayField: 'text',		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',
//		        lazyRender: true,
//		        lazyInit: false,
		        mode: 'local'
		        
//		        disabledClass: 'x-item-disabled disabled'
		    }]
		});
		
		AIR.CiAgreementsView.superclass.initComponent.call(this);
		
		//in eine AirDetailView f�r alle CI Detail Seiten?
		this.addEvents('ciBeforeChange', 'ciChange');
		
		var cbSla = this.getComponent('sla');
		var cbServiceContract = this.getComponent('serviceContract');
		var cbPriorityLevel = this.getComponent('priorityLevel');
		var cbSeverityLevel = this.getComponent('severityLevel');
		var cbBusinessEssential = this.getComponent('businessEssential');
		
		
		cbSla.on('select', this.onSlaSelect, this);
		cbSla.on('change', this.onSlaChange, this);
		
		cbServiceContract.on('select', this.onServiceContractSelect, this);
		cbServiceContract.on('change', this.onServiceContractChange, this);
		cbServiceContract.on('keyup', this.onServiceContractKeyUp, this);

		cbPriorityLevel.on('select', this.onPriorityLevelSelect, this);
		cbPriorityLevel.on('change', this.onPriorityLevelChange, this);
		
		cbSeverityLevel.on('select', this.onSeverityLevelSelect, this);
		cbSeverityLevel.on('change', this.onSeverityLevelChange, this);
		
		cbBusinessEssential.on('select', this.onBusinessEssentialSelect, this);
		cbBusinessEssential.on('change', this.onBusinessEssentialChange, this);
		var storeIds = {
				serviceContractListStore: null

		};		
		var storeCount = 0;
		for(var key in storeIds)
			storeCount++;
		
		var storeLoader = new AIR.AirStoreLoader();
        storeLoader.init(storeIds, storeCount);
        storeLoader.on('storesLoaded', this.onStoresLoaded, this);
        storeLoader.load();
	},
	
	onBusinessEssentialSelect: function(combo, record, index) {
    	this.fireEvent('ciChange', this, combo);
    },
    onBusinessEssentialChange: function (combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo);
    },
	
	
	onSeverityLevelSelect: function(combo, record, index) {
    	this.fireEvent('ciChange', this, combo);
    },
    onSeverityLevelChange: function (combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo);
    },
	
	onPriorityLevelSelect: function(combo, record, index) {
    	this.fireEvent('ciChange', this, combo);
    },
    onPriorityLevelChange: function (combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo);
    },
	
	
	onServiceContractSelect: function(combo, record, index) {
		var cbSla = this.getComponent('sla');
		cbSla.setValue(record.get('slaId'));
		
		this.fireEvent('ciChange', this, combo);
	},
	onServiceContractChange: function (combo, newValue, oldValue) {/* emria  IM0006263625 : Issue saving Contract in AIR
		var cbSla = this.getComponent('sla');
		
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			this.fireEvent('ciChange', this, combo);
			
			var r = Util.getComboRecord(combo, 'id', parseInt(newValue));//cbServiceContract.getStore().getById(parseInt(data.serviceContractId));
			if(r)
				cbSla.setValue(r.get('slaId'));
		} else {
			var v = cbSla.getValue();
			if(!v) {
				combo.reset();
				delete combo.filterData;
			}
		}
	*/},
	
	onServiceContractKeyUp: function(combo, event) {
		if(combo.getRawValue().length === 0) {
			combo.reset(); 
			delete combo.filterData;
		}
	},
	
	onSlaSelect: function(combo, record, index) {
		var cbServiceContract = this.getComponent('serviceContract');
		// var cbServiceContract1 = this.getComponent('serviceContract1');//emria
		cbServiceContract.enable();
		cbServiceContract.reset(); 
		
		

		var filterData = { slaId: record.data.id };
		cbServiceContract.filterByData(filterData); 
		
		this.loadServiceContractStore(record.data.id);//emria
		if(cbServiceContract.getStore().getCount() === 1)
			cbServiceContract.setValue(cbServiceContract.getStore().getAt(0).get('id'));
    	console.log('SLA id '+record.data.id);
    	this.fireEvent('ciChange', this, combo);
	},
	loadServiceContractStore: function(value){  //emria  IM0006263625 : Issue saving Contract in AIR
		var cbServiceContract1 = this.getComponent('serviceContract');
		
		cbServiceContract1.getStore().load({
            params: {
                id: value
            }
		});
	},
	
	
	onSlaChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.fireEvent('ciChange', this, combo);
		
		var cbServiceContract = this.getComponent('serviceContract');
		cbServiceContract.enable();

		if(typeof newValue === 'string' && newValue.length === 0) {
			combo.reset();
			cbServiceContract.reset(); 
		} else {
			 cbServiceContract.reset(); 

			newValue = typeof newValue === 'string' ? newValue : oldValue;
			
			var filterData = { slaId: newValue };
			cbServiceContract.filterByData(filterData);
			
			if(cbServiceContract.getStore().getCount() === 1)
				cbServiceContract.setValue(cbServiceContract.getStore().getAt(0).get('id'));
		}
	},

	
	clear: function(data) {
		this.update(data);
	},
    onStoresLoaded: function(storeLoader, storeMap) {
		for(var key in storeMap)
			AIR.AirStoreManager.addStore(key, storeMap[key]);
		var cbServiceContract = this.getComponent('serviceContract');
		cbServiceContract.bindStore(AIR.AirStoreManager.getStoreByName('serviceContractListStore'));
        
		storeLoader.destroy();
    },
	
	
	update: function(data) {
		var cbSla = this.getComponent('sla');
		var cbServiceContract = this.getComponent('serviceContract');
		var filterData = { slaId: data.slaId };

		if (data.slaId != 0 && !data.isCiCreate) {//selectedSlaId !== undefined && selectedSlaId != 0
			if(!AIR.AirApplicationManager.isSlaInvalid()){
				this.getComponent('sla').setValue(data.slaId);
				cbServiceContract.filterByData(filterData);
			}else{
				cbSla.reset();//setValue('');
				cbServiceContract.reset();//.setValue('');  
			}
		} else {
			cbSla.reset();//setValue('');
			cbServiceContract.reset();//.setValue(''); 
		}
		
		if (data.serviceContractId && data.serviceContractId != 0 && !data.isCiCreate) {
			if(!AIR.AirApplicationManager.isSlaInvalid()){
				console.log("Debug 1"+data.serviceContractId);
				cbServiceContract.setValue(data.serviceContractId);
				
				var sla = cbSla.getValue();
				if(!sla || sla.length === 0) {
					var r = Util.getComboRecord(cbServiceContract, 'id', parseInt(data.serviceContractId));//cbServiceContract.getStore().getById(parseInt(data.serviceContractId));
					if(r)
						cbSla.setValue(r.get('slaId'));
				}
			}

		} else {
			 cbServiceContract.setValue(''); 
		}
		
		
		var cbPriorityLevel = this.getComponent('priorityLevel');
		if(data.tableId == AC.TABLE_ID_APPLICATION ||
		   data.tableId == AC.TABLE_ID_IT_SYSTEM ) {
			cbPriorityLevel.setVisible(true);
			
			if (data.priorityLevelId && data.priorityLevelId != 0 && !data.isCiCreate) {
				cbPriorityLevel.setValue(data.priorityLevelId);
			} else {
				cbPriorityLevel.setValue('');
			}
		} else {
			cbPriorityLevel.reset();
			cbPriorityLevel.setVisible(false);
		}
		
		

		var cbSeverityLevel = this.getComponent('severityLevel');
		var cbBusinessEssential = this.getComponent('businessEssential');
		
		if(data.tableId == AC.TABLE_ID_APPLICATION ||
		   data.tableId == AC.TABLE_ID_ROOM ||
		   data.tableId == AC.TABLE_ID_POSITION ||
		   data.tableId == AC.TABLE_ID_IT_SYSTEM) {
			
			cbSeverityLevel.setVisible(true);
			cbBusinessEssential.setVisible(true);
			
			if (data.severityLevelId && data.severityLevelId != 0 && !data.isCiCreate) {
				cbSeverityLevel.setValue(data.severityLevelId);
			} else {
				cbSeverityLevel.setValue('');
			}
			this.updateAccessMode(data);
			if(data.isCiCreate)
				cbBusinessEssential.setValue('');
			else{
				if(data.businessEssentialId==='3'){
					cbBusinessEssential.setValue('inherited: Business Essential');
					Util.disableCombo(cbBusinessEssential);
				}else{
					if(data.businessEssentialId==='4'){
						cbBusinessEssential.setValue('inherited: Pandemic Business Essential');
						Util.disableCombo(cbBusinessEssential);
					}else
						cbBusinessEssential.setValue(data.businessEssentialId);

				}

			}
			
		} else {
			cbSeverityLevel.reset();
			cbBusinessEssential.reset();
			cbSeverityLevel.setVisible(false);
			cbBusinessEssential.setVisible(false);
			this.updateAccessMode(data);
		}
		
		if((data.tableId ==AC.TABLE_ID_FUNCTION)|| (data.tableId == AC.TABLE_ID_BUSINESS_APPLICATION)){
			cbSla.setVisible(false);
			cbServiceContract.setVisible(false);
			cbPriorityLevel.setVisible(false);
			cbSeverityLevel.setVisible(false);
			cbBusinessEssential.setVisible(false);
		}	
		
		//Added by vandana
		if(data.tableId == AC.TABLE_ID_PATHWAY){
/*			cbSla.setVisible(false);
			cbServiceContract.setVisible(false);*/
			cbPriorityLevel.setVisible(false);
			cbSeverityLevel.setVisible(false);
			cbBusinessEssential.setVisible(false);
		}	
		//Ended by vandana
		
		this.doLayout();
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('sla'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('serviceContract'), data);
		
		if(data.tableId == AC.TABLE_ID_APPLICATION ||
		   data.tableId == AC.TABLE_ID_IT_SYSTEM )
			AIR.AirAclManager.setAccessMode(this.getComponent('priorityLevel'), data);
		
		if(data.tableId == AC.TABLE_ID_APPLICATION ||
		   data.tableId == AC.TABLE_ID_ROOM ||
		   data.tableId == AC.TABLE_ID_POSITION ||
		   data.tableId == AC.TABLE_ID_IT_SYSTEM) {
			AIR.AirAclManager.setAccessMode(this.getComponent('severityLevel'), data);
			
			var cbBusinessEssential = this.getComponent('businessEssential');
			if(AAM.hasRole(AC.USER_ROLE_AIR_BUSINESS_ESSENTIAL_EDITOR)) {

				// nur f�r die Rolle BusinessEssential-Editor
				// unter Pr�fung der Insert-Source mittels isEditable
				if (AIR.AirAclManager.isEditable(cbBusinessEssential)) {
					Util.enableCombo(cbBusinessEssential);
					
					//alt
//					AIR.AirAclManager.setMandatory(cbBusinessEssential, 'mandatory');
					//neu
//					AIR.AirAclManager.setNecessity(cbBusinessEssential);
					AIR.AirAclManager.setNecessityInternal(cbBusinessEssential.label, 'mandatory');
					
					// this.setEditable(aclItemCmp); // diese Methode pr�ft die Rechte und verhindert das Editieren...
					// deshalb setzen wir das FormElement einzeln auf true
	//				AIR.AirAclManager.setFormElementEnable(cbBusinessEssential, true);
				}
			} else {
				//cbBusinessEssential.disable();
				Util.disableCombo(cbBusinessEssential);
				
//				AIR.AirAclManager.setMandatory(cbBusinessEssential, 'optional');
				AIR.AirAclManager.setNecessityInternal(cbBusinessEssential.label, 'optional');
			}


			if ('' === data.deleteTimestamp) {
				// normal ci data
			}
			else {
				// we can't edit deleted entries
				Util.disableCombo(cbBusinessEssential);
			}
			
		}
	},
	
	setData: function(data) {
		var field = this.getComponent('sla');
//		if (!field.disabled)
//			if(field.getValue().length > 0)
//				data.slaId = field.getValue();
		if (!field.disabled) {
			if(field.getValue()) {//.length > 0
				data.slaId = field.getValue();
			} else {
				data.slaId = -1;
			}
		}
		
		field = this.getComponent('serviceContract');
//		if (!field.disabled)
//			if(field.getValue().length > 0)
//				data.serviceContractId = field.getValue();
		if (!field.disabled) {
			if(field.getValue()) {//.length > 0
				data.serviceContractId = field.getValue();
			} else {
				data.serviceContractId = -1;
			}
		}
		
		if(data.tableId == AC.TABLE_ID_APPLICATION ||
		   data.tableId == AC.TABLE_ID_IT_SYSTEM ) {
			field = this.getComponent('priorityLevel');
			if (!field.disabled) {
				if(field.getValue().length > 0) {
					data.priorityLevelId = field.getValue();
				} else {
					data.priorityLevelId = -1;
				}
			}
		}
		
		if(data.tableId == AC.TABLE_ID_APPLICATION ||
		   data.tableId == AC.TABLE_ID_ROOM ||
		   data.tableId == AC.TABLE_ID_POSITION ||
		   data.tableId == AC.TABLE_ID_IT_SYSTEM ) {
		
			field = this.getComponent('severityLevel');
			if (!field.disabled) {
				if(field.getValue().length > 0) {
					data.severityLevelId = field.getValue();
				} else {
					data.severityLevelId = -1;
				}
			}
			
			field = this.getComponent('businessEssential');
			if (!field.disabled)
				if(field.getValue().length > 0)
					data.businessEssentialId = field.getValue();
		}
		
		return data;
	},
	
	onServiceContractLoad: function(store, records, options) {
		var data = AIR.AirApplicationManager.getAppDetail();
		
		if (data.serviceContractId && data.serviceContractId != 0) {
			this.getComponent('serviceContract').setValue(data.serviceContractId);//setRawValue data.serviceContract
		} else {
			this.getComponent('serviceContract').setValue('');
		}
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.agreementsPanelTitle);
		this.setFieldLabel(this.getComponent('sla'), labels.sla);
		this.setFieldLabel(this.getComponent('priorityLevel'), labels.priorityLevel);
		this.setFieldLabel(this.getComponent('serviceContract'), labels.serviceContract);
		this.setFieldLabel(this.getComponent('severityLevel'), labels.severityLevel);
		this.setFieldLabel(this.getComponent('businessEssential'), labels.businessEssential);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.getComponent('sla').label, toolTips.slaName, toolTips.slaNameText);
		this.setTooltipData(this.getComponent('priorityLevel').label, toolTips.priorityLevel, toolTips.priorityLevelText);
		this.setTooltipData(this.getComponent('serviceContract').label, toolTips.serviceContract, toolTips.serviceContractText);
		this.setTooltipData(this.getComponent('severityLevel').label, toolTips.severityLevel, toolTips.severityLevelText);
		this.setTooltipData(this.getComponent('businessEssential').label, toolTips.businessEssential, toolTips.businessEssentialText);
	}
});
Ext.reg('AIR.CiAgreementsView', AIR.CiAgreementsView);
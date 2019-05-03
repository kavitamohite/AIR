Ext.namespace('AIR');

AIR.CiAgreementsView = Ext.extend(AIR.AirView, {//Ext.Panel
	
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Agreements',
		    
		    border: false,
		    bodyStyle: 'padding:10px',
		    layout: 'form',
		    
		    items: [{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'SLA',
		        id: 'sla',
		        store: AIR.AirStoreManager.getStoreByName('slaListStore'),//slaListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
		        typeAhead: true,
//		        forceSelection: true,
		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    }, {
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Service Contract',
		        id: 'serviceContract',
		        store: AIR.AirStoreManager.getStoreByName('serviceContractListStore'),//serviceContractListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
		        typeAhead: true,
//		        forceSelection: true,
		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local',
		        
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
		        
		        typeAhead: true,
//		        forceSelection: true,
		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    },{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Severity Level',
		        
		        id: 'severityLevel',
		        store: AIR.AirStoreManager.getStoreByName('severityLevelListStore'),//severityLevelListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
		        typeAhead: true,
//		        forceSelection: true,
		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    },{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Business Essential',
//		        name: 'businessEssential',
		        
		        id: 'businessEssential',
		        store: AIR.AirStoreManager.getStoreByName('businessEssentialListStore'),//businessEssentialListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
		        typeAhead: true,
//		        forceSelection: true,
		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		        
//		        disabledClass: 'x-item-disabled disabled'
		    }]
		});
		
		AIR.CiAgreementsView.superclass.initComponent.call(this);
		
		//in eine AirDetailView für alle CI Detail Seiten?
		this.addEvents('ciBeforeChange', 'ciChange');
		
		var cbSla = this.getComponent('sla');
		var cbServiceContract = this.getComponent('serviceContract');
		var cbPriorityLevel = this.getComponent('priorityLevel');
		var cbSeverityLevel = this.getComponent('severityLevel');
		var cbBusinessEssential = this.getComponent('businessEssential');
		
		
		cbSla.on('select', this.onSlaSelect, this);
		cbSla.on('change', this.onSlaChange, this);
//		cbSla.on('blur', this.onSlaBlur, this);
		
		cbServiceContract.on('select', this.onServiceContractSelect, this);
		cbServiceContract.on('change', this.onServiceContractChange, this);
		
		cbPriorityLevel.on('select', this.onPriorityLevelSelect, this);
		cbPriorityLevel.on('change', this.onPriorityLevelChange, this);
		
		cbSeverityLevel.on('select', this.onSeverityLevelSelect, this);
		cbSeverityLevel.on('change', this.onSeverityLevelChange, this);
		
		cbBusinessEssential.on('select', this.onBusinessEssentialSelect, this);
		cbBusinessEssential.on('change', this.onBusinessEssentialChange, this);
		
		//Deaktiviert, damit beim Laden des Stores von combo wizardsla load handler von Wizard Seite 2
		//(durch ehemals an Stelle this.getComponent('wizardAgreements').getComponent('wizardserviceContract').store.load();)
		//kein Fehler in Methode this.onServiceContractLoad kommt und diese Methode erst sinnvollerweise gar nicht
		//automatisch aufgerufen wird wie es beim folgendem Statement der Fall wäre. Statt dessen wird jeweils ein callback
		//listener in der this.getComponent('serviceContract').getStore().load() Funktion verwendet, wo der serviceContract oder
		//wizardserviceContract combo store geladen werden muss. Dieser Store ist durch
		//store: AIR.AirStoreManager.getStoreByName('serviceContractListStore') immer der SELBE! Evtl. muss hier eine stabilere
		//Lösung als die callbacks gefunden werden, wenn diese SLA - SERVICECONTRACT combo Abhängigkeitskonstalltion häufiger
		//oder bei anderen combos und deren stores auftritt/benötigt wird.
//		this.getComponent('serviceContract').getStore().on('load', this.onServiceContractLoad, this);
	},
	
	onBusinessEssentialSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//    	activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo);
    },
    onBusinessEssentialChange: function (combo, newValue, oldValue) {
//    	activateButtonSaveApplication();
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo);
    },
	
	
	onSeverityLevelSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//    	activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo);
    },
    onSeverityLevelChange: function (combo, newValue, oldValue) {
//    	activateButtonSaveApplication();
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo);
    },
	
	onPriorityLevelSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//    	activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo);
    },
    onPriorityLevelChange: function (combo, newValue, oldValue) {
//    	activateButtonSaveApplication();
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo);
    },
	
	
	onServiceContractSelect: function(combo, record, index) {
//        combo.setValue(record.data['text']);
//		activateButtonSaveApplication();
//		this.fireEvent('ciChange', this, combo);
	},
	onServiceContractChange: function (combo, newValue, oldValue) {
//		activateButtonSaveApplication();
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.fireEvent('ciChange', this, combo);
	},
	
	onSlaSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
		if(!record || !record.data)
			return;
    	
        //sollte nicht aufgerufen werden, wenn nach Speichern und continueEditing der Wert automatisch gesetzt wird!!
    	//Oder direkt nach dem Neuladen der CI Detail Daten. Entschieden werden muss im CiEditTabView/CiEditView,
    	//ob eine Änderung tatsächlich eine User Interaktion nach dem Laden war oder das Event durch das Setzen
    	//eines UI Elements durch das CI Detail Datenladen ausgelöst wurde.
//        activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo);
    	
    	
    	
    	
//		var index = this.getComponent('sla').getStore().findExact('id', this.getComponent('sla').getValue());
//		this.getComponent('sla').fireEvent('select', this.getComponent('sla'), this.getComponent('sla').getStore().getAt(index), index);

    	
		this.getComponent('serviceContract').getStore().load({
			params: { 
				slaName: record.data.id
			},
			callback: function(records, options, success) {
				switch(records.length) {
					case 1:
						var serviceContractId = records[0].data.id;
						this.getComponent('serviceContract').setValue(serviceContractId);
						break;
//					case 0:
					default:
						this.getComponent('serviceContract').reset();
						break;
				}
			}.createDelegate(this)
		});
    	
    	/*
//    	var slaId = record.data.id;
//    	this.getComponent('serviceContract').getStore().load({
//    		params: {
//    			slaName: slaId,
//    			serviceContract: 0
//    		}
//    	});
    	
    	
        // reload service contracts
        if (record) {// !== undefined
            selectedSlaId = record.data['id'];
            this.getComponent('serviceContract').store.load();
            selectedServiceContractId = 0;
            this.getComponent('serviceContract').setValue('');
            
     		// activate service contract
//            if (isRelevance(this.getComponent('serviceContract'))) {
            
            var appDetail = AIR.AirApplicationManager.getAppDetail();
            if (AIR.AirAclManager.isRelevance(this.getComponent('serviceContract'), appDetail)) {
            	this.getComponent('serviceContract').enable();
            	this.getComponent('serviceContract').setHideTrigger(false);
			}
			else {
				this.getComponent('serviceContract').disable();
				this.getComponent('serviceContract').setHideTrigger(true);
			}
        }*/
	},
	
	onSlaChange: function(combo, newValue, oldValue) {
		/*if (newValue!==oldValue) {
			this.getComponent('serviceContract').setValue('');
		}
		
		if (newValue=='') {
			this.getComponent('serviceContract').store.removeAll();
			this.getComponent('serviceContract').disable();
			this.getComponent('serviceContract').setHideTrigger(true);
		}
		
//    		activateButtonSaveApplication();*/
		if(this.isComboValueValid(combo, newValue, oldValue))
			this.fireEvent('ciChange', this, combo);
	},
	
//	onSlaBlur: function(field) {		
//		if(1 == this.getComponent('serviceContract').store.getCount()) {
//			// Vorbelegung
//			// TODO LAYOUT REFRESH
//        	selectedServiceContractId = this.getComponent('serviceContract').store.getAt(0).data.id;
//        	this.getComponent('serviceContract').setValue(selectedServiceContractId);
//        }
//    },
    
	
	
	update: function(data) {
		//selectedSlaId = data.slaId;
		if (data.slaId != 0) {//selectedSlaId !== undefined && selectedSlaId != 0
			this.getComponent('sla').setValue(data.slaId);
		} else {
			this.getComponent('sla').setValue('');
		}
		
		
//		this.getComponent('serviceContract').getStore().on('load', this.onServiceContractLoad, this);
		this.getComponent('serviceContract').getStore().load({
			params: {
				slaName: data.slaId
			},
			callback: this.onServiceContractLoad.createDelegate(this)
		});
		
		
//		selectedServiceContractId = data.serviceContractId;
//		if (selectedServiceContractId !== undefined && selectedServiceContractId != 0) {
//			this.getComponent('serviceContract').setValue(data.serviceContractId);//setRawValue data.serviceContract
//		} else {
//			this.getComponent('serviceContract').setValue('');
//		}


		//selectedPriorityLevelId = data.priorityLevelId;
		if (data.priorityLevelId && data.priorityLevelId != 0) {
			this.getComponent('priorityLevel').setValue(data.priorityLevelId);
		} else {
			this.getComponent('priorityLevel').setValue('');
		}
		
		

		//selectedSeverityLevelId = data.severityLevelId;
		if (data.severityLevelId && data.severityLevelId != 0) {
			this.getComponent('severityLevel').setValue(data.severityLevelId);
		} else {
			this.getComponent('severityLevel').setValue('');
		}
		
		
		
		
		var cbBusinessEssential = this.getComponent('businessEssential');
		this.getComponent('businessEssential').setValue(data.businessEssentialId);
		
		this.updateAccessMode(data);
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('sla'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('serviceContract'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('priorityLevel'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('severityLevel'), data);
		
		
		var cbBusinessEssential = this.getComponent('businessEssential');
		if(hasRoleBusinessEssentialEditor) {
			// nur für die Rolle BusinessEssential-Editor !!!
			// unter Prüfung der Insert-Source mittels isEditable
			if (AIR.AirAclManager.isEditable(cbBusinessEssential)) {
				cbBusinessEssential.enable();
				cbBusinessEssential.setHideTrigger(false);
				AIR.AirAclManager.setMandatory(cbBusinessEssential, 'mandatory');
				// this.setEditable(aclItemCmp); // diese Methode prüft die Rechte und verhindert das Editieren...
				// deshalb setzen wir das FormElement einzeln auf true
				AIR.AirAclManager.setFormElementEnable(cbBusinessEssential, true);
			}
		} else {
			//cbBusinessEssential.disable();
			if(Ext.isIE)
				cbBusinessEssential.el.dom.disabled = true;
			else
				cbBusinessEssential.disable();
				
			cbBusinessEssential.setHideTrigger(true);
			AIR.AirAclManager.setMandatory(cbBusinessEssential, 'optional');
		}
	},
	
	//getData: function() {
	setData: function(data) {
		//var data = {};
		
		var field = this.getComponent('sla');
		if (!field.disabled)
			if(field.getValue().length > 0)
				data.slaName = field.getValue();
		
		field = this.getComponent('serviceContract');
		if (!field.disabled)
//			if(field.getValue().length > 0)
				data[field.id] = field.getValue();
		
		
		field = this.getComponent('priorityLevel');
		if (!field.disabled) {
			if(field.getValue().length > 0) {
				data.priorityLevel = field.getValue();
			} else {
				data.priorityLevel = -1;
			}
		}
		
		field = this.getComponent('severityLevel');
		if (!field.disabled) {
			if(field.getValue().length > 0) {
				data.severityLevel = field.getValue();
			} else {
				data.severityLevel = -1;
			}
		}
		
		field = this.getComponent('businessEssential');
		if (!field.disabled)
			if(field.getValue().length > 0)
				data.businessEssentialId = field.getValue();
		
		
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
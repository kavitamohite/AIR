Ext.namespace('AIR');

AIR.CiProtectionView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Protection',
		    border: false,
		    bodyStyle: 'padding:10px',
		    
		    layout: 'form',
		    
		    items: [{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Availability',
		        id: 'protectionAvailability',
		        
		        store: AIR.AirStoreManager.getStoreByName('itSecSBAvailabilityListStore'),//itSecSBAvailabilityListStore,
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
		    	xtype: 'textarea',
		        id: 'protectionAvailabilityDescription',

		        width: 230,
		        fieldLabel: 'Explanation',
		        enableKeyEvents: true,
		        allowBlank: true
		    },{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Information Class',
		        id: 'protectionClassInformation',
		        
		        store: AIR.AirStoreManager.getStoreByName('classInformationListStore'),//classInformationListStore,
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
		    	xtype: 'textarea',
		        width: 230,
		        fieldLabel: 'Info Class',
		        id: 'protectionClassInformationExplanation',
		        
		        enableKeyEvents: true,
		        allowBlank: true
		    },{
		    	xtype: 'textfield',
		    	width: 230,
		        fieldLabel: 'Application Protection',
		        id: 'protectionApplicationProtection',
		        
		        enableKeyEvents: true,
		        allowBlank: true,
		        disabled: true
			}]
		});
		
		AIR.CiProtectionView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		
		var cbProtectionAvailability = this.getComponent('protectionAvailability');
		var taProtectionAvailabilityDescription = this.getComponent('protectionAvailabilityDescription');
		var cbProtectionClassInformation = this.getComponent('protectionClassInformation');
		var taProtectionClassInformationExplanation = this.getComponent('protectionClassInformationExplanation');
		
		
		cbProtectionAvailability.on('select', this.onProtectionAvailabilitySelect, this);
		cbProtectionAvailability.on('change', this.onProtectionAvailabilityChange, this);
		
		taProtectionAvailabilityDescription.on('change', this.onProtectionAvailabilityDescriptionChange, this);
		
		cbProtectionClassInformation.on('select', this.onProtectionClassInformationSelect, this);
		cbProtectionClassInformation.on('change', this.onProtectionClassInformationChange, this);
		
		taProtectionClassInformationExplanation.on('change', this.onProtectionClassInformationExplanationChange, this);
	},
	
	onProtectionAvailabilitySelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
//        activateButtonSaveApplication();
    	this.fireEvent('ciChange', this, combo, record);
    },
    onProtectionAvailabilityChange: function(combo, newValue, oldValue) {
//        activateButtonSaveApplication();
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
    },
	
    onProtectionAvailabilityDescriptionChange: function(textarea, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textarea, newValue);
	},
	
	onProtectionClassInformationSelect: function(combo, record, index) {
        //combo.setValue(record.data['text']);
		this.getComponent('protectionApplicationProtection').setValue(record.data['classProtectionName']);
//        activateButtonSaveApplication();
		this.fireEvent('ciChange', this, combo, record);
    },
    onProtectionClassInformationChange: function (combo, newValue, oldValue) {
//        activateButtonSaveApplication();
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
		
		if(newValue == '')
			this.getComponent('protectionApplicationProtection').setValue('');
    },
    
    onProtectionClassInformationExplanationChange: function(textarea, newValue, oldValue) {
//		activateButtonSaveApplication();
		this.fireEvent('ciChange', this, textarea, newValue);
	},
    
	
	update: function(data) {
		this.updateAccessMode(data);
		
//		selectedItSecSbAvailabilityId = data.itSecSbAvailabilityId;
		if (data.itSecSbAvailabilityId && data.itSecSbAvailabilityId != 0) {
			this.getComponent('protectionAvailability').setValue(data.itSecSbAvailabilityId);
		} else {
			this.getComponent('protectionAvailability').setValue('');
		}
		
		if (data.protectionAvailabilityDescription && data.protectionAvailabilityDescription != 0) {
			this.getComponent('protectionAvailabilityDescription').setValue(data.protectionAvailabilityDescription);
		} else {
			this.getComponent('protectionAvailabilityDescription').setValue('');
		}
	
//		selectedClassInformationId = data.classInformationId;
		if (data.classInformationId && data.classInformationId != 0) {
			this.getComponent('protectionClassInformation').setValue(data.classInformationId);
		} else {
			this.getComponent('protectionClassInformation').setValue('');
		}
		
		if (data.protectionClassInformationExplanation && data.protectionClassInformationExplanation != 0) {
			this.getComponent('protectionClassInformationExplanation').setValue(data.protectionClassInformationExplanation);
		} else {
			this.getComponent('protectionClassInformationExplanation').setValue('');
		}
		
		if (data.protectionApplicationProtection && data.protectionApplicationProtection != 0) {
			this.getComponent('protectionApplicationProtection').setValue(data.protectionApplicationProtection);
		} else {
			this.getComponent('protectionApplicationProtection').setValue('');
		}
		
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionAvailability'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionAvailabilityDescription'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionClassInformation'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionClassInformationExplanation'), data);
		//AIR.AirAclManager.setAccessMode(this.getComponent('protectionApplicationProtection'), data);
	},
	
	//getData: function() {
	setData: function(data) {
		//var data = {};
		
		field = this.getComponent('protectionAvailability');
		if (!field.disabled) {
			if (undefined !== field.getValue() && '' !== field.getValue()) {
				data.itSecSbAvailability = field.getValue();
			}
			else {
				data.itSecSbAvailability = -1;
			}
		}
		field = this.getComponent('protectionAvailabilityDescription');
		if (!field.disabled) {
			data.itSecSbAvailabilityDescription = field.getValue();
		}
		
		field = this.getComponent('protectionClassInformation');
		if (!field.disabled) {
			if (undefined !== field.getValue() && '' !== field.getValue()) {
				data.classInformationId = field.getValue();
			}
			else {
				data.classInformationId = -1;
			}

		}
		
		field = this.getComponent('protectionClassInformationExplanation');
		if (!field.disabled) {
			data.classInformationExplanation = field.getValue();
		}
		
		return data;
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.protectionPanelTitle);
		this.setFieldLabel(this.getComponent('protectionAvailability'), labels.itSecSbAvailabilityId);
		this.setFieldLabel(this.getComponent('protectionAvailabilityDescription'), labels.itSecSbAvailabilityDescription);
		this.setFieldLabel(this.getComponent('protectionClassInformation'), labels.protectionClassInformation);
		this.setFieldLabel(this.getComponent('protectionClassInformationExplanation'), labels.protectionClassInformationExplanation);
		this.setFieldLabel(this.getComponent('protectionApplicationProtection'), labels.protectionApplicationProtection);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.getComponent('protectionAvailability').label, toolTips.itSecSbAvailabilityId, toolTips.itSecSbAvailabilityIdText);
		this.setTooltipData(this.getComponent('protectionAvailabilityDescription').label, toolTips.itSecSbAvailabilityDescription, toolTips.itSecSbAvailabilityDescriptionText);
		this.setTooltipData(this.getComponent('protectionApplicationProtection').label, toolTips.itSecSbAppProtection, toolTips.itSecSbAppProtectionText);
		this.setTooltipData(this.getComponent('protectionClassInformation').label, toolTips.protectionClassInformation, toolTips.protectionClassInformationText);
		this.setTooltipData(this.getComponent('protectionClassInformationExplanation').label, toolTips.protectionClassInformationExplanation, toolTips.protectionClassInformationExplanationText);
	}

});
Ext.reg('AIR.CiProtectionView', AIR.CiProtectionView);
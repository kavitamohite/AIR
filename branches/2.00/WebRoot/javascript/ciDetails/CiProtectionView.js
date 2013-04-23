Ext.namespace('AIR');

AIR.CiProtectionView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Protection',
		    border: false,
		    bodyStyle: 'padding:10px',
		    
		    layout: 'form',
		    height: 280,
		    
		    items: [{
		        xtype: 'filterCombo',//combo
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
		        xtype: 'filterCombo',//combo
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
			},{
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Integrity',
		        id: 'protectionIntegrity',
		        
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
		        id: 'protectionIntegrityDescription',

		        width: 230,
		        fieldLabel: 'Explanation',
		        enableKeyEvents: true,
		        allowBlank: true
		    },{
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Confidentiality',
		        id: 'protectionConfidentiality',
		        
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
		        id: 'protectionConfidentialityDescription',

		        width: 230,
		        fieldLabel: 'Explanation',
		        enableKeyEvents: true,
		        allowBlank: true
		    }]
		});
		
		AIR.CiProtectionView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		
		var cbProtectionAvailability = this.getComponent('protectionAvailability');
		var taProtectionAvailabilityDescription = this.getComponent('protectionAvailabilityDescription');
		var cbProtectionClassInformation = this.getComponent('protectionClassInformation');
		var taProtectionClassInformationExplanation = this.getComponent('protectionClassInformationExplanation');
		
		
		cbProtectionAvailability.on('select', this.onComboSelect, this);
		cbProtectionAvailability.on('change', this.onComboChange, this);
		taProtectionAvailabilityDescription.on('change', this.onTextAreaChange, this);
		
		cbProtectionClassInformation.on('select', this.onProtectionClassInformationSelect, this);
		cbProtectionClassInformation.on('change', this.onProtectionClassInformationChange, this);
		taProtectionClassInformationExplanation.on('change', this.onProtectionClassInformationExplanationChange, this);
		
		
		
		var cbProtectionIntegrity = this.getComponent('protectionIntegrity');
		var taProtectionIntegrityDescription = this.getComponent('protectionIntegrityDescription');

		var cbProtectionConfidentiality = this.getComponent('protectionConfidentiality');
		var taProtectionConfidentialityDescription = this.getComponent('protectionConfidentialityDescription');

		
		cbProtectionIntegrity.on('select', this.onComboSelect, this);
		cbProtectionIntegrity.on('change', this.onComboChange, this);
		taProtectionIntegrityDescription.on('change', this.onTextAreaChange, this);
		
		cbProtectionConfidentiality.on('select', this.onComboSelect, this);
		cbProtectionConfidentiality.on('change', this.onComboChange, this);
		taProtectionConfidentialityDescription.on('change', this.onTextAreaChange, this);
		
	},
	
	onComboSelect: function(combo, record, index) {
    	this.fireEvent('ciChange', this, combo, record);
    },
    onComboChange: function(combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
    },
	
    onTextAreaChange: function(textarea, newValue, oldValue) {
		this.fireEvent('ciChange', this, textarea, newValue);
	},
	
	onProtectionClassInformationSelect: function(combo, record, index) {
		this.getComponent('protectionApplicationProtection').setValue(record.data['classProtectionName']);
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
    
	clear: function(data) {
		this.update(data);
	},
	
	update: function(data) {
		this.updateAccessMode(data);
		
		if (data.itSecSbAvailabilityId && data.itSecSbAvailabilityId != 0 && !data.isCiCreate) {
			this.getComponent('protectionAvailability').setValue(data.itSecSbAvailabilityId);
		} else {
			this.getComponent('protectionAvailability').setValue('');
		}
		
		if (data.itSecSbAvailabilityTxt && data.itSecSbAvailabilityTxt != 0 && !data.isCiCreate) {//protectionAvailabilityDescription
			this.getComponent('protectionAvailabilityDescription').setValue(data.itSecSbAvailabilityTxt);//protectionAvailabilityDescription
		} else {
			this.getComponent('protectionAvailabilityDescription').setValue('');
		}
		


		var cbProtectionClassInformation = this.getComponent('protectionClassInformation');
		var taProtectionClassInformationExplanation = this.getComponent('protectionClassInformationExplanation');
		var tfProtectionApplicationProtection = this.getComponent('protectionApplicationProtection');
		
		var cbProtectionIntegrity = this.getComponent('protectionIntegrity');
		var taProtectionIntegrityDescription = this.getComponent('protectionIntegrityDescription');

		var cbProtectionConfidentiality = this.getComponent('protectionConfidentiality');
		var taProtectionConfidentialityDescription = this.getComponent('protectionConfidentialityDescription');

		
		if(data.tableId == AC.TABLE_ID_APPLICATION) {
			cbProtectionClassInformation.setVisible(true);
			taProtectionClassInformationExplanation.setVisible(true);
			tfProtectionApplicationProtection.setVisible(true);
			
			if (data.classInformationId && data.classInformationId != 0 && !data.isCiCreate) {
				cbProtectionClassInformation.setValue(data.classInformationId);
			} else {
				cbProtectionClassInformation.setValue('');
			}
			
			if (data.protectionClassInformationExplanation && data.protectionClassInformationExplanation != 0 && !data.isCiCreate) {
				taProtectionClassInformationExplanation.setValue(data.protectionClassInformationExplanation);
			} else {
				taProtectionClassInformationExplanation.setValue('');
			}
			
			if (data.protectionApplicationProtection && data.protectionApplicationProtection != 0 && !data.isCiCreate) {
				tfProtectionApplicationProtection.setValue(data.protectionApplicationProtection);
			} else {
				tfProtectionApplicationProtection.setValue('');
			}
			
			cbProtectionIntegrity.setVisible(false);
			cbProtectionIntegrity.reset();
			taProtectionIntegrityDescription.setVisible(false);
			taProtectionIntegrityDescription.reset();
			
			cbProtectionConfidentiality.setVisible(false);
			cbProtectionConfidentiality.reset();
			taProtectionConfidentialityDescription.setVisible(false);
			taProtectionConfidentialityDescription.reset();
		} else {
			cbProtectionClassInformation.setVisible(false);
			taProtectionClassInformationExplanation.setVisible(false);
			tfProtectionApplicationProtection.setVisible(false);
			
			cbProtectionClassInformation.reset();
			taProtectionClassInformationExplanation.reset();
			tfProtectionApplicationProtection.reset();
			
			cbProtectionIntegrity.setVisible(true);
			taProtectionIntegrityDescription.setVisible(true);
			
			cbProtectionConfidentiality.setVisible(true);
			taProtectionConfidentialityDescription.setVisible(true);
			
			
			if (data.itSecSbIntegrityId && data.itSecSbIntegrityId != 0 && !data.isCiCreate) {
				cbProtectionIntegrity.setValue(data.itSecSbIntegrityId);
			} else {
				cbProtectionIntegrity.setValue('');
			}
			if (data.itSecSbConfidentialityId && data.itSecSbConfidentialityId != 0 && !data.isCiCreate) {
				cbProtectionConfidentiality.setValue(data.itSecSbConfidentialityId);
			} else {
				cbProtectionConfidentiality.setValue('');
			}
			
			
			if (data.itSecSbIntegrityTxt && data.itSecSbIntegrityTxt != 0 && !data.isCiCreate) {//protectionAvailabilityDescription
				taProtectionIntegrityDescription.setValue(data.itSecSbIntegrityTxt);//protectionAvailabilityDescription
			} else {
				taProtectionIntegrityDescription.setValue('');
			}
			if (data.itSecSbConfidentialityTxt && data.itSecSbConfidentialityTxt != 0 && !data.isCiCreate) {//protectionAvailabilityDescription
				taProtectionConfidentialityDescription.setValue(data.itSecSbConfidentialityTxt);//protectionAvailabilityDescription
			} else {
				taProtectionConfidentialityDescription.setValue('');
			}
		}
		
		this.doLayout();
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionAvailability'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionAvailabilityDescription'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionIntegrity'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionIntegrityDescription'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionConfidentiality'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionConfidentialityDescription'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionClassInformation'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionClassInformationExplanation'), data);
		//AIR.AirAclManager.setAccessMode(this.getComponent('protectionApplicationProtection'), data);
	},
	
	setData: function(data) {
		field = this.getComponent('protectionAvailability');
		if (!field.disabled) {
			if (field.getValue() && field.getValue().length > 0) {
				data.itSecSbAvailabilityId = field.getValue();
			} else {
				data.itSecSbAvailabilityId = -1;
			}
		}
		field = this.getComponent('protectionAvailabilityDescription');
		if (!field.disabled) {
			data.itSecSbAvailabilityTxt = field.getValue();
		}
		
		if(data.tableId == AC.TABLE_ID_APPLICATION) {
			field = this.getComponent('protectionClassInformation');
			if (!field.disabled) {
				if (field.getValue() && field.getValue().length > 0) {
					data.classInformationId = field.getValue();
				} else {
					data.classInformationId = -1;
				}
			}
			field = this.getComponent('protectionClassInformationExplanation');
			if (!field.disabled) {
				data.classInformationExplanation = field.getValue();
			}
		} else {
			field = this.getComponent('protectionIntegrity');
			if (!field.disabled) {
				if (field.getValue() && field.getValue().length > 0) {
					data.itSecSbIntegrityId = field.getValue();
				} else {
					data.itSecSbIntegrityId = -1;
				}
			}
			field = this.getComponent('protectionIntegrityDescription');
			if (!field.disabled) {
				data.itSecSbIntegrityTxt = field.getValue();
			}
			
			
			field = this.getComponent('protectionConfidentiality');
			if (!field.disabled) {
				if (field.getValue() && field.getValue().length > 0) {
					data.itSecSbConfidentialityId = field.getValue();
				} else {
					data.itSecSbConfidentialityId = -1;
				}
			}
			field = this.getComponent('protectionConfidentialityDescription');
			if (!field.disabled) {
				data.itSecSbConfidentialityTxt = field.getValue();
			}
		}
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.protectionPanelTitle);
		this.setFieldLabel(this.getComponent('protectionAvailability'), labels.itSecSbAvailabilityId);
		this.setFieldLabel(this.getComponent('protectionAvailabilityDescription'), labels.itSecSbAvailabilityDescription);
		this.setFieldLabel(this.getComponent('protectionClassInformation'), labels.protectionClassInformation);
		this.setFieldLabel(this.getComponent('protectionClassInformationExplanation'), labels.protectionClassInformationExplanation);
		this.setFieldLabel(this.getComponent('protectionApplicationProtection'), labels.protectionApplicationProtection);
		
		this.setFieldLabel(this.getComponent('protectionIntegrity'), labels.itSecSbIntegrityId);
		this.setFieldLabel(this.getComponent('protectionIntegrityDescription'), labels.itSecSbIntegrityDescription);
		this.setFieldLabel(this.getComponent('protectionConfidentiality'), labels.itSecSbConfidentialityId);
		this.setFieldLabel(this.getComponent('protectionConfidentialityDescription'), labels.itSecSbConfidentialityDescription);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.getComponent('protectionAvailability').label, toolTips.itSecSbAvailabilityId, toolTips.itSecSbAvailabilityIdText);
		this.setTooltipData(this.getComponent('protectionAvailabilityDescription').label, toolTips.itSecSbAvailabilityDescription, toolTips.itSecSbAvailabilityDescriptionText);
		this.setTooltipData(this.getComponent('protectionClassInformation').label, toolTips.protectionClassInformation, toolTips.protectionClassInformationText);
		this.setTooltipData(this.getComponent('protectionClassInformationExplanation').label, toolTips.protectionClassInformationExplanation, toolTips.protectionClassInformationExplanationText);
		this.setTooltipData(this.getComponent('protectionApplicationProtection').label, toolTips.itSecSbAppProtection, toolTips.itSecSbAppProtectionText);
	}

});
Ext.reg('AIR.CiProtectionView', AIR.CiProtectionView);
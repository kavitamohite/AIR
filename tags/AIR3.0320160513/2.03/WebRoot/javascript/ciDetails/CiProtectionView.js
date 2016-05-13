Ext.namespace('AIR');

AIR.CiProtectionView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Protection',
		    border: false,
		    bodyStyle: 'padding:10px',
		    
		    layout: 'form',
		    height: 300,
		    
		    items: [{
		        xtype: 'filterCombo',
		        width: 230,
		        fieldLabel: 'Availability',
		        id: 'protectionAvailability',
		        
		        store: AIR.AirStoreManager.getStoreByName('itSecSBAvailabilityListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        
		        triggerAction: 'all',
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
		        xtype: 'filterCombo',
		        width: 230,
		        fieldLabel: 'Information Class',
		        id: 'protectionClassInformation',
		        
		        store: AIR.AirStoreManager.getStoreByName('itSecSBConfidentialityListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        
		        triggerAction: 'all',
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
		        xtype: 'filterCombo',
		        width: 230,
		        fieldLabel: 'Integrity',
		        id: 'protectionIntegrity',
		        
		        store: AIR.AirStoreManager.getStoreByName('itSecSBAvailabilityListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        
		        triggerAction: 'all',
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
		    }]
		});
		
		AIR.CiProtectionView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		
		var cbProtectionAvailability = this.getComponent('protectionAvailability');
		var taProtectionAvailabilityDescription = this.getComponent('protectionAvailabilityDescription');
		var cbProtectionClassInformation = this.getComponent('protectionClassInformation');
		var taProtectionClassInformationExplanation = this.getComponent('protectionClassInformationExplanation');
		cbProtectionClassInformation.getStore().sort('id', 'ASC');
		
		cbProtectionAvailability.on('select', this.onComboSelect, this);
		cbProtectionAvailability.on('change', this.onComboChange, this);
		taProtectionAvailabilityDescription.on('change', this.onTextAreaChange, this);
		taProtectionAvailabilityDescription.on('keyup', this.onFieldKeyUp, this);
		
		cbProtectionClassInformation.on('select', this.onProtectionClassInformationSelect, this);
		cbProtectionClassInformation.on('change', this.onProtectionClassInformationChange, this);
		taProtectionClassInformationExplanation.on('change', this.onProtectionClassInformationExplanationChange, this);
		taProtectionClassInformationExplanation.on('keyup', this.onFieldKeyUp, this);
		
		
		var cbProtectionIntegrity = this.getComponent('protectionIntegrity');
		var taProtectionIntegrityDescription = this.getComponent('protectionIntegrityDescription');

		
		cbProtectionIntegrity.on('select', this.onComboSelect, this);
		cbProtectionIntegrity.on('change', this.onComboChange, this);
		taProtectionIntegrityDescription.on('change', this.onTextAreaChange, this);
		taProtectionIntegrityDescription.on('keyup', this.onFieldKeyUp, this);
		
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
		this.fireEvent('ciChange', this, combo, record);
    },
    onProtectionClassInformationChange: function (combo, newValue, oldValue) {
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue);
    },
    
    onProtectionClassInformationExplanationChange: function(textarea, newValue, oldValue) {
		this.fireEvent('ciChange', this, textarea, newValue);
	},
	
	onFieldKeyUp: function(textfield, event) {
		this.fireEvent('ciChange', this, textfield);
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
		
		if (data.itSecSbAvailabilityTxt && data.itSecSbAvailabilityTxt != 0 && !data.isCiCreate) {
			this.getComponent('protectionAvailabilityDescription').setValue(data.itSecSbAvailabilityTxt);
		} else {
			this.getComponent('protectionAvailabilityDescription').setValue('');
		}
		
		var cbProtectionClassInformation = this.getComponent('protectionClassInformation');
		var taProtectionClassInformationExplanation = this.getComponent('protectionClassInformationExplanation');
		
		var cbProtectionIntegrity = this.getComponent('protectionIntegrity');
		var taProtectionIntegrityDescription = this.getComponent('protectionIntegrityDescription');
		
		if (data.classInformationId && data.classInformationId != 0 && !data.isCiCreate) {
			cbProtectionClassInformation.setValue(data.classInformationId);
		} else {
			cbProtectionClassInformation.setValue('');
		}
		
		if (data.classInformationTxt && data.classInformationTxt != 0 && !data.isCiCreate) {
			taProtectionClassInformationExplanation.setValue(data.classInformationTxt);
		} else {
			taProtectionClassInformationExplanation.setValue('');
		}
		
		if (data.itSecSbIntegrityId && data.itSecSbIntegrityId != 0 && !data.isCiCreate) {
			cbProtectionIntegrity.setValue(data.itSecSbIntegrityId);
		} else {
			cbProtectionIntegrity.setValue('');
		}
		
		if (data.itSecSbIntegrityTxt && data.itSecSbIntegrityTxt != 0 && !data.isCiCreate) {
			taProtectionIntegrityDescription.setValue(data.itSecSbIntegrityTxt);
		} else {
			taProtectionIntegrityDescription.setValue('');
		}

		if(data.tableId == AC.TABLE_ID_FUNCTION || data.tableId == AC.TABLE_ID_SERVICE){
			this.getComponent('protectionAvailability').setVisible(false);
			this.getComponent('protectionAvailabilityDescription').setVisible(false);
			this.getComponent('protectionClassInformation').setVisible(false);
			this.getComponent('protectionClassInformationExplanation').setVisible(false);
			this.getComponent('protectionIntegrity').setVisible(false);
			this.getComponent('protectionIntegrityDescription').setVisible(false);
		}else{
			this.getComponent('protectionAvailability').setVisible(true);
			this.getComponent('protectionAvailabilityDescription').setVisible(true);
			this.getComponent('protectionClassInformation').setVisible(true);
			this.getComponent('protectionClassInformationExplanation').setVisible(true);
			this.getComponent('protectionIntegrity').setVisible(true);
			this.getComponent('protectionIntegrityDescription').setVisible(true);
		}	
		this.doLayout();
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionAvailability'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionAvailabilityDescription'), data);		
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionIntegrity'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionIntegrityDescription'), data);		
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionClassInformation'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('protectionClassInformationExplanation'), data);
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
		
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.protectionPanelTitle);
		this.setFieldLabel(this.getComponent('protectionAvailability'), labels.itSecSbAvailabilityId);
		this.setFieldLabel(this.getComponent('protectionAvailabilityDescription'), labels.itSecSbAvailabilityDescription);
		this.setFieldLabel(this.getComponent('protectionClassInformation'), labels.protectionClassInformation);
		this.setFieldLabel(this.getComponent('protectionClassInformationExplanation'), labels.protectionClassInformationExplanation);		
		this.setFieldLabel(this.getComponent('protectionIntegrity'), labels.itSecSbIntegrityId);
		this.setFieldLabel(this.getComponent('protectionIntegrityDescription'), labels.itSecSbIntegrityDescription);

	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.getComponent('protectionAvailability').label, toolTips.itSecSbAvailabilityId, toolTips.itSecSbAvailabilityIdText);
		this.setTooltipData(this.getComponent('protectionAvailabilityDescription').label, toolTips.itSecSbAvailabilityDescription, toolTips.itSecSbAvailabilityDescriptionText);
		this.setTooltipData(this.getComponent('protectionClassInformation').label, toolTips.protectionClassInformation, toolTips.protectionClassInformationText);
		this.setTooltipData(this.getComponent('protectionClassInformationExplanation').label, toolTips.protectionClassInformationExplanation, toolTips.protectionClassInformationExplanationText);
	}

});
Ext.reg('AIR.CiProtectionView', AIR.CiProtectionView);
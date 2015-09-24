Ext.namespace('AIR');

AIR.CiTechnics = Ext.extend(Ext.form.FieldSet, {

	initComponent : function() {
		Ext.apply(this, {
			title : 'Technics',
			hidden:true,
			autoHeight : true,
			style : {
				margin : '5 5 0 0'
			},
			items : [ {
				xtype : 'textfield',
				id : 'tTechnicalNumber',
				fieldLabel : 'Technical Number / Asset-ID',
				width : 370,
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				id : 'tTechnicalMaster',
				fieldLabel : 'Technical Master',
				width : 370,
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				id : 'tSystemPlatform',
				fieldLabel : 'System platform name',
				width : 370,
				style : {
					marginBottom : 10
				}
			}, {
				id: 'tOsName',
		        xtype: 'filterCombo',
		        fieldLabel: 'OS-Name',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('osListStore'),
		        valueField: 'osId',
		        displayField: 'osName',
				lastQuery: '',
		        minChars: 0,
		        triggerAction: 'all',
		        mode: 'local',
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				id : 'tTransient',
				fieldLabel : 'HW-transient systems',
				width : 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				id : 'cbWorkflowTechnical',
				xtype: 'filterCombo',
				fieldLabel : 'Worflowstatus technical',
				width : 370,
				store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),//lifecycleStatusListStore,
		        valueField: 'id',
		        displayField: 'text',
		        triggerAction: 'all',
		        mode: 'local',
		        style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				id: 'cbGeneralUsage',
		        xtype: 'filterCombo',
		        fieldLabel: 'General Usage',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),
		        valueField: 'id',
		        displayField: 'text',
		        triggerAction: 'all',
		        mode: 'local',
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'radiogroup',
				id : 'rbItSecurity',
				fieldLabel : 'IT-Security-Relevance',
				width : 370,
				columns : 2,
				items : [{
					name : 'itsecurity',
					boxLabel : 'Yes',
					inputValue : '-1',
					width : 50
				}, {
					id : 'itsecurity',
					boxLabel : 'No',
					checked: true,
					inputValue : '0',
					width : 50
				}],
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				id : 'tComment',
				fieldLabel : 'Comment',
				width : 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}]
		});
		
		AIR.CiTechnics.superclass.initComponent.call(this);
		
		var tOsName = this.getComponent('tOsName');
		tOsName.on('change', this.onComboChange, this);

		var cbWorkflowTechnical = this.getComponent('cbWorkflowTechnical');
		cbWorkflowTechnical.on('change', this.onComboChange, this);
		
		var cbGeneralUsage = this.getComponent('cbGeneralUsage');
		cbGeneralUsage.on('change', this.onComboChange, this);
	},
	
	onComboChange: function(combo, newValue, oldValue) {
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		combo.reset();
	    		combo.setValue("");
	    		this.ownerCt.ownerCt.ownerCt.enableAssetButtons();
	    	} 
		}
	},
	
	update: function(assetData){

		var tTechnicalNumber = this.getComponent('tTechnicalNumber');
        tTechnicalNumber.setValue(assetData.technicalNumber);

        var tTechnicalMaster = this.getComponent('tTechnicalMaster');
        tTechnicalMaster.setValue(assetData.technicalMaster);

        var tSystemPlatform = this.getComponent('tSystemPlatform');
        tSystemPlatform.setValue(assetData.systemPlatformName);

        var tOsName = this.getComponent('tOsName');
        tOsName.setValue(assetData.osNameId);

        var tTransient = this.getComponent('tTransient');
        tTransient.setValue(assetData.hardwareTransientSystem);

        var cbWorkflowTechnical = this.getComponent('cbWorkflowTechnical');
        cbWorkflowTechnical.setValue(assetData.workflowStatusId);
        
        var filterData = { tableId: AC.TABLE_ID_HARDWARE_COMPONENT };
        cbWorkflowTechnical.filterByData(filterData);

        var cbGeneralUsage = this.getComponent('cbGeneralUsage');
        cbGeneralUsage.setValue(assetData.generalUsageId);

        var rbItSecurity = this.getComponent('rbItSecurity');
        if(assetData.itSecurityRelevance == -1){
            rbItSecurity.items.items[0].setValue(true);
        } else {
        	rbItSecurity.items.items[1].setValue(true);
        }

        var tComment = this.getComponent('tComment');
        tComment.setValue(assetData.comment);

	},
	
	updateParam: function(assetData){

		var tTechnicalNumber = this.getComponent('tTechnicalNumber');
		assetData.technicalNumber = tTechnicalNumber.getValue();

        var tTechnicalMaster = this.getComponent('tTechnicalMaster');
        assetData.technicalMaster = tTechnicalMaster.getValue();

        var tSystemPlatform = this.getComponent('tSystemPlatform');
        assetData.systemPlatformName = tSystemPlatform.getValue();

        var tOsName = this.getComponent('tOsName');
        assetData.osName = tOsName.getRawValue();
        assetData.osNameId = tOsName.getValue();
        
        var tTransient = this.getComponent('tTransient');
        assetData.hardwareTransientSystem = tTransient.getValue();

        var cbWorkflowTechnical = this.getComponent('cbWorkflowTechnical');
        assetData.workflowStatus = cbWorkflowTechnical.getRawValue();
        assetData.workflowStatusId = cbWorkflowTechnical.getValue();

        var cbGeneralUsage = this.getComponent('cbGeneralUsage');
        assetData.generalUsage = cbGeneralUsage.getRawValue();
        assetData.generalUsageId = cbGeneralUsage.getValue();

        var rbItSecurity = this.getComponent('rbItSecurity');
        assetData.itSecurityRelevance = rbItSecurity.getValue().inputValue;

        var tComment = this.getComponent('tComment');
        assetData.comment = tComment.getValue();

        return assetData;
	},
	
	updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('tTechnicalNumber'), labels.assetTechnicalNumber); 
    	Util.updateFieldLabel(this.getComponent('tTechnicalMaster'), labels.assetTechnicalMaster);  
    	Util.updateFieldLabel(this.getComponent('tSystemPlatform'), labels.assetSystemPlatformName);  
    	Util.updateFieldLabel(this.getComponent('tOsName'), labels.assetOsname);  
    	Util.updateFieldLabel(this.getComponent('tTransient'), labels.assettransient);  
    	Util.updateFieldLabel(this.getComponent('cbWorkflowTechnical'), labels.assetWorflowstatustechnical);  
    	Util.updateFieldLabel(this.getComponent('cbGeneralUsage'), labels.assetGeneral);  
    	Util.updateFieldLabel(this.getComponent('rbItSecurity'), labels.assetITSecurity);  
    	Util.updateFieldLabel(this.getComponent('tComment'), labels.assetComment);  
	}
	
});
Ext.reg('AIR.CiTechnics', AIR.CiTechnics);
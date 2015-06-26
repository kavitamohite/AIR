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
				xtype : 'textfield',
				id : 'tHardware',
				fieldLabel : 'Hardwaresystem (HWS)',
				width : 370,
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				id : 'tOsName',
				fieldLabel : 'OS-Name',
				width : 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				id : 'tWorkflowHWS',
				fieldLabel : 'Worflowstatus technical HWS',
				width : 370,
				style : {
					marginBottom : 10,
					fontSize : 12
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
				xtype : 'combo',
				id : 'cbWorkflowTechnical',
				labelSeparator : ': <span style="color:red">*</span>',
				fieldLabel : 'Worflowstatus technical',
				width : 370,
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
		        valueField: 'operationalStatusId',
		        displayField: 'operationalStatus',
				lastQuery: '',
		        minChars: 0,
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

	},
	
	update: function(assetData){

		var tTechnicalNumber = this.getComponent('tTechnicalNumber');
        tTechnicalNumber.setValue(assetData.technicalNumber);

        var tTechnicalMaster = this.getComponent('tTechnicalMaster');
        tTechnicalMaster.setValue(assetData.technicalMaster);

        var tSystemPlatform = this.getComponent('tSystemPlatform');
        tSystemPlatform.setValue(assetData.systemPlatformName);

        var tHardware = this.getComponent('tHardware');
        tHardware.setValue(assetData.hardwareSystem);

        var tOsName = this.getComponent('tOsName');
        tOsName.setValue(assetData.osName);

        var tWorkflowHWS = this.getComponent('tWorkflowHWS');
        tWorkflowHWS.setValue(assetData.workflowTechnicalStatus);

        var tTransient = this.getComponent('tTransient');
        tTransient.setValue(assetData.hardwareTransientSystem);

        var cbWorkflowTechnical = this.getComponent('cbWorkflowTechnical');
        cbWorkflowTechnical.setValue(assetData.workflowStatusId);

        var cbGeneralUsage = this.getComponent('cbGeneralUsage');
        cbGeneralUsage.setValue(assetData.generalUsageId);

        var rbItSecurity = this.getComponent('rbItSecurity');
        rbItSecurity.setValue([true, false]);

        var tComment = this.getComponent('tComment');
        tComment.setValue(assetData.generalUsageId);

	}
});
Ext.reg('AIR.CiTechnics', AIR.CiTechnics);
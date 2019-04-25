Ext.namespace('AIR');

AIR.CiCreateAppRequiredView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    
		    labelWidth: 180,
		    
		    items: [{
		    	xtype: 'textfield',
		        id: 'tfApplicationAliasW',

		        width: 250,
		        fieldLabel: 'Application Alias'
			},{
				xtype: 'panel',
				id: 'pBusinessW',
//				width: 250,
				anchor: '100%',
				layout: 'column',//hbox
//				pack: 'start',
				border: false,
				
				items: [{
					xtype: 'label',
					id: 'labeltaBusinessProcessW',
					width: 185,
					
					style: {
						fontSize: 12
					}
	    		}, {
					xtype: 'textarea',
			        id: 'taBusinessProcessW',
//					anchor: '70%',
			        width: 300,
			        height: 100,
			        
			        autoScroll: true,
			        readOnly: true
//			        flex: 20
			    },{
					xtype: 'hidden',
			        id: 'taBusinessProcessWHidden'
//			        flex: 1
			    }, {
			    	xtype: 'commandlink',
			    	id: 'clBusinessProcessAdd',
			    	img: img_AddBusinessProcess
			    },{
			    	xtype: 'commandlink',
			    	id: 'clBusinessProcessRemove',
			    	img: img_RemoveBusinessProcess
			    }]
			},{
		        xtype: 'fieldset',
		        id: 'fsCiOwnerW',
		        title: 'CI Owner',//if cat1=applciation --> Application Manager
		        
		        width: 500,
//		        labelWidth: 200,
		        
				style: {
					marginTop: 20
				},
		        
				items: [{
					xtype: 'container',
					id: 'pCiOwnerW',
					
					layout: 'column',
					
					items: [{
						xtype: 'label',
						id: 'labeltfResponsibleW',
						
						width: 175,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'tfResponsibleW',//ciResponsible
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'tfResponsibleWHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'clResponsibleWAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'clResponsibleWRemove',
				    	img: img_RemovePerson
				    }]
				}]
			},{
		        xtype: 'fieldset',
		        id: 'fsContactsGPSCW',
		        title: 'GPSC contacts',
		        
		        width: 500,
//		        labelWidth: 200,
		        
				style: {
					marginTop: 20,
					marginBottom: 20
				},
		        
				items: [{
					xtype: 'container',
					id: 'pGPSCSupportGroup',
					
					layout: 'column',

					items: [{
						xtype: 'label',
						id: 'labeltaGPSCSupportGroup',
						
						width: 175,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: 250,
				        id: 'taGPSCSupportGroup',
				        
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },{
						xtype: 'hidden',
				        id: 'taGPSCSupportGroupHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'clGPSCSupportGroupAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'clGPSCSupportGroupRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGPSCOwningBusinessGroup',
					
					layout: 'column',
					style: {
						marginTop: 5
					},

					items: [{
						xtype: 'label',
						id: 'labeltaGPSCOwningBusinessGroup',
						
						width: 175,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: 250,
				        id: 'taGPSCOwningBusinessGroup',
				        
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },{
						xtype: 'hidden',
				        id: 'taGPSCOwningBusinessGroupHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'clGPSCOwningBusinessGroupAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'clGPSCOwningBusinessGroupRemove',
				    	img: img_RemoveGroup
				    }]
				}]
			},{
	        	xtype: 'checkboxgroup',
	        	id: 'cbgRegulationsW',
	        	
	        	columns: 2,//4
    			width: 300,//400 300 200
//    			hideLabel: true,
				style: {
					marginBottom: 20
				},
    			
    			items: [
			        { boxLabel: 'GR1435', name: 'cbgWizardRegulationsW', width: 100 },
			        { boxLabel: 'GR1920', name: 'cbgWizardRegulationsW', width: 100 },
			        { boxLabel: 'GR2059', name: 'cbgWizardRegulationsW', width: 100 },
			        { boxLabel: 'GR2008', name: 'cbgWizardRegulationsW', width: 100 }
		        ]
	        },{
		        xtype: 'combo',
		        width: 250,
		        fieldLabel: 'SLA',
		        id: 'cbSlaW',
		        store: AIR.AirStoreManager.getStoreByName('slaListStore'),//slaListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
		        forceSelection: true,     // Added by enqmu
//		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
		        xtype: 'combo',
		        width: 250,
		        fieldLabel: 'Severity Level',
		        
		        id: 'cbSeverityLevelW',
		        store: AIR.AirStoreManager.getStoreByName('severityLevelListStore'),//severityLevelListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
		        forceSelection: true,        // Added by enqmu
//		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
		        xtype: 'combo',
		        width: 250,
		        fieldLabel: 'Business Essential',
//		        name: 'businessEssential',
		        
		        id: 'cbBusinessEssentialW',
		        store: AIR.AirStoreManager.getStoreByName('businessEssentialListStore'),//businessEssentialListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
		        forceSelection: true,    // Added by enqmu
//		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
				xtype: 'container',
				height: 20
			},{
		        xtype: 'combo',
		        width: 250,
		        fieldLabel: 'Availability',
		        id: 'cbProtectionAvailabilityW',
		        
		        store: AIR.AirStoreManager.getStoreByName('itSecSBAvailabilityListStore'),//itSecSBAvailabilityListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//				style: {
//					marginTop: 20
//				},
		        
//		        typeAhead: true,
		        forceSelection: true,      // Added by enqmu
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
		    	xtype: 'textarea',
		        id: 'taProtectionAvailabilityDescriptionW',

		        width: 250,
		        height: 50,
		        fieldLabel: 'Explanation',
		        enableKeyEvents: true,
		        allowBlank: true
			},{
		        xtype: 'combo',
		        width: 250,
		        fieldLabel: 'Information Class',
		        id: 'cbProtectionClassInformationW',
		        //RFC 11441
		        store: AIR.AirStoreManager.getStoreByName('itSecSBConfidentialityListStore'),//classInformationListStore,
		        valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,		        
		        forceSelection: true,       // Added by enqmu
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
			},{
		        xtype: 'listview',//grid
		        width: 100,
		        height: 150,//150
		        fieldLabel: 'UsingRegions',
		        border: false,
		        
				style: {
					marginTop: 20
				},
		        
		        id: 'lvApplicationUsingRegionsW',
		        store: AIR.AirStoreManager.getStoreByName('itSetListStore'),//itSetListStore,
		        
		        singleSelect: false,
		        multiSelect: true,
		        simpleSelect: true,
		        hideHeaders: true,
		        
		        columns: [
					{dataIndex: 'id', hidden: true, hideLabel: true, width: .001},
					{dataIndex: 'text'}
		        ]
			}]
		});
		
		AIR.CiCreateAppRequiredView.superclass.initComponent.call(this);
		
		
//		var taBusinessProcessW = this.getComponent('pBusinessW').getComponent('taBusinessProcessW');
		var clBusinessProcessAdd = this.getComponent('pBusinessW').getComponent('clBusinessProcessAdd');
		var clBusinessProcessRemove = this.getComponent('pBusinessW').getComponent('clBusinessProcessRemove');
		clBusinessProcessAdd.on('click', this.onBusinessProcessAdd, this);
		clBusinessProcessRemove.on('click', this.onBusinessProcessRemove, this);
		
		
		var clResponsibleWAdd = this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('clResponsibleWAdd');
		var clResponsibleWRemove = this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('clResponsibleWRemove');
		clResponsibleWAdd.on('click', this.onResponsibleAdd, this);
		clResponsibleWRemove.on('click', this.onResponsibleRemove, this);
		
		
		var clGPSCSupportGroupAdd = this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('clGPSCSupportGroupAdd');
		var clGPSCSupportGroupRemove = this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('clGPSCSupportGroupRemove');
		clGPSCSupportGroupAdd.on('click', this.onGPSCSupportGroupAdd, this);
		clGPSCSupportGroupRemove.on('click', this.onGPSCSupportGroupRemove, this);
		
		
		var clGPSCOwningBusinessGroupAdd = this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('clGPSCOwningBusinessGroupAdd');
		var clGPSCOwningBusinessGroupRemove = this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('clGPSCOwningBusinessGroupRemove');
		clGPSCOwningBusinessGroupAdd.on('click', this.onGPSCOwningBusinessGroupAdd, this);
		clGPSCOwningBusinessGroupRemove.on('click', this.onGPSCOwningBusinessGroupRemove, this);
		
		// Added by enqmu
		this.getComponent('cbProtectionAvailabilityW').on('select', this.onComboInformationChange, this);
		this.getComponent('cbProtectionAvailabilityW').on('change', this.onComboInformationChange, this);
		
		this.getComponent('cbSeverityLevelW').on('select', this.onComboInformationChange, this);
		this.getComponent('cbSeverityLevelW').on('change', this.onComboInformationChange, this);
		
		this.getComponent('cbSlaW').on('select', this.onComboInformationChange, this);
		this.getComponent('cbSlaW').on('change', this.onComboInformationChange, this);
		
		this.getComponent('cbProtectionClassInformationW').on('select', this.onComboInformationChange, this);
		this.getComponent('cbProtectionClassInformationW').on('change', this.onComboInformationChange, this);
		
		this.getComponent('cbBusinessEssentialW').on('select', this.onComboInformationChange, this);
		this.getComponent('cbBusinessEssentialW').on('change', this.onComboInformationChange, this);
		this.getComponent('cbBusinessEssentialW').getStore().sort('text','ASC');
		this.getComponent('cbProtectionAvailabilityW').getStore().sort('text','ASC');
		this.getComponent('cbProtectionClassInformationW').getStore().sort('text','ASC');
		this.getComponent('cbSeverityLevelW').getStore().sort('text','ASC');
		// end by enqmu
		
		
	},
	
	// Added by enqmu
	onComboInformationChange: function(combo, newValue, oldValue) {
		this.isComboValueValid(combo, newValue, oldValue);
	},
	
	onBusinessProcessAdd: function(link, event) {
		AIR.AirPickerManager.openRecordPicker(null, this.getComponent('pBusinessW').getComponent('taBusinessProcessW'), event, 'process');
	},
	onBusinessProcessRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('pBusinessW').getComponent('taBusinessProcessW'), event);
	},
	
	
	onResponsibleAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('tfResponsibleW'), event);
	},
	onResponsibleRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('tfResponsibleW'), event);
	},
	
	
	onGPSCSupportGroupAdd: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('taGPSCSupportGroup'), event, 'supportGroupIMResolver');
	},
	onGPSCSupportGroupRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('taGPSCSupportGroup'), event);
	},
	

	onGPSCOwningBusinessGroupAdd: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('taGPSCOwningBusinessGroup'), event, 'owningBusinessGroup');
	},
	onGPSCOwningBusinessGroupRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('taGPSCOwningBusinessGroup'), event);
	},
	
	
	setData: function(params) {
		params.alias = this.getComponent('tfApplicationAliasW').getValue();//applicationAlias
		params.businessProcessHidden = this.getComponent('pBusinessW').getComponent('taBusinessProcessWHidden').getValue();
		
		
		params.ciOwnerHidden = this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('tfResponsibleWHidden').getValue();//responsibleHidden
		params.ciOwner = this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('tfResponsibleW').getValue();//responsible
		params.gpsccontactSupportGroupHidden = this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('taGPSCSupportGroupHidden').getValue();
		params.gpsccontactSupportGroup = this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('taGPSCSupportGroup').getValue();
		params.gpsccontactOwningBusinessGroupHidden = this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('taGPSCOwningBusinessGroupHidden').getValue();
		params.gpsccontactOwningBusinessGroup = this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('taGPSCOwningBusinessGroup').getValue();
		
		
		var cbgRegulations = this.getComponent('cbgRegulationsW');
		for(var i = 0; i < cbgRegulations.items.items.length; i++) {//checkedRegulations.length
			var regulationId = 'relevance' + cbgRegulations.items.items[i].boxLabel;
			var regulationStatus = cbgRegulations.items.items[i].getValue() ? 'Y' : 'N';
			
			params[regulationId] = regulationStatus;
		}
		
		
		params.slaName = this.getComponent('cbSlaW').getValue();
		params.severityLevelId = this.getComponent('cbSeverityLevelW').getValue();
		params.businessEssentialId = this.getComponent('cbBusinessEssentialW').getValue();
		
		
		params.itSecSbAvailability = this.getComponent('cbProtectionAvailabilityW').getValue();
		params.itSecSbAvailabilityDescription = this.getComponent('taProtectionAvailabilityDescriptionW').getValue();
		params.classInformationId = this.getComponent('cbProtectionClassInformationW').getValue();
		
		
		var lvApplicationUsingRegionsW = this.getComponent('lvApplicationUsingRegionsW');
    	var regions = '';
    	Ext.each(lvApplicationUsingRegionsW.getSelectedRecords(), function(item, index, records) {//listview.getSelectedRecords() listview.getSelections()--> wenn grid statt listview
    		regions += item.get('id');
    		if(index < records.length - 1)
    			regions += ',';
    	});
		params.licenseUsingRegions = regions;
	},
	
	reset: function() {
		this.getComponent('tfApplicationAliasW').reset();
		this.getComponent('pBusinessW').getComponent('taBusinessProcessW').reset();
		this.getComponent('pBusinessW').getComponent('taBusinessProcessWHidden').reset();
		
		this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('tfResponsibleW').reset();
		this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('tfResponsibleWHidden').reset();
		this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('taGPSCOwningBusinessGroup').reset();
		this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('taGPSCOwningBusinessGroupHidden').reset();
		this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('taGPSCSupportGroup').reset();
		this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('taGPSCSupportGroupHidden').reset();
		
		var cbgRegulationsW = this.getComponent('cbgRegulationsW');
//		cbgRegulationsW.reset();
		cbgRegulationsW.setValue([true, false, false, false]);
		
		this.getComponent('cbSlaW').reset();
		this.getComponent('cbSeverityLevelW').reset();
		this.getComponent('cbBusinessEssentialW').reset();
		
		var cbBusinessEssentialW = this.getComponent('cbBusinessEssentialW');
		// Sonderbearbeitung Rechte Business Essential
		if(AAM.hasRole(AC.USER_ROLE_AIR_BUSINESS_ESSENTIAL_EDITOR)) {

			// nur f�r die Rolle BusinessEssential-Editor
			// unter Pr�fung der Insert-Source mittels isEditable
			if (AIR.AirAclManager.isEditable(cbBusinessEssentialW)) {
				Util.enableCombo(cbBusinessEssentialW);
				AIR.AirAclManager.setNecessityInternal(cbBusinessEssentialW.label, 'mandatory');
			}
		} else {
			Util.disableCombo(cbBusinessEssentialW);
			AIR.AirAclManager.setNecessityInternal(cbBusinessEssentialW.label, 'optional');
		}
		
		
		this.getComponent('cbProtectionAvailabilityW').reset();
		this.getComponent('taProtectionAvailabilityDescriptionW').reset();
		this.getComponent('cbProtectionClassInformationW').reset();
		
		this.getComponent('lvApplicationUsingRegionsW').clearSelections();
	},
	
	updateLabels: function(labels) {
		this.setFieldLabel(this.getComponent('tfApplicationAliasW'), labels.applicationAlias);
		this.getComponent('pBusinessW').getComponent('labeltaBusinessProcessW').setText(labels.businessProcess);
		
		AIR.AirAclManager.setNecessity(this.getComponent('tfApplicationAliasW'));
		AIR.AirAclManager.setNecessity(this.getComponent('pBusinessW').getComponent('labeltaBusinessProcessW'));
		
//		labels.contactsCIOwnerApplication : labels.contactsCIOwner
//		this.getComponent('fsCiOwnerW').setTitle(labels.contactsCIOwnerApplication);
		this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('labeltfResponsibleW').setText(labels.ciResponsible);
		AIR.AirAclManager.setNecessity(this.getComponent('fsCiOwnerW').getComponent('pCiOwnerW').getComponent('labeltfResponsibleW'));
		
		
		this.getComponent('fsContactsGPSCW').setTitle(labels.contactsGPSC);
		this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('labeltaGPSCOwningBusinessGroup').setText(labels.gpsccontactOwningBusinessGroup);
		AIR.AirAclManager.setNecessity(this.getComponent('fsContactsGPSCW').getComponent('pGPSCOwningBusinessGroup').getComponent('labeltaGPSCOwningBusinessGroup'));
		this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('labeltaGPSCSupportGroup').setText(labels.gpsccontactSupportGroup);
		AIR.AirAclManager.setNecessity(this.getComponent('fsContactsGPSCW').getComponent('pGPSCSupportGroup').getComponent('labeltaGPSCSupportGroup'));
	
		
		var cbgRegulations = this.getComponent('cbgRegulationsW');
		this.setBoxLabel(cbgRegulations.items.items[0], labels.relevanceGR1435);
		this.setBoxLabel(cbgRegulations.items.items[1], labels.relevanceGR2059);
		this.setBoxLabel(cbgRegulations.items.items[2], labels.relevanceGR1920);
		this.setBoxLabel(cbgRegulations.items.items[3], labels.relevanceGR2008);
		this.setFieldLabel(cbgRegulations, labels.compliancerelevance);
		AIR.AirAclManager.setNecessity(cbgRegulations);
		
		
		this.setFieldLabel(this.getComponent('cbSlaW'), labels.sla);
		AIR.AirAclManager.setNecessity(this.getComponent('cbSlaW'));
		
		this.setFieldLabel(this.getComponent('cbSeverityLevelW'), labels.severityLevel);
		AIR.AirAclManager.setNecessity(this.getComponent('cbSeverityLevelW'));
		
		this.setFieldLabel(this.getComponent('cbBusinessEssentialW'), labels.businessEssential);
		AIR.AirAclManager.setNecessity(this.getComponent('cbBusinessEssentialW'));
		
		
		this.setFieldLabel(this.getComponent('cbProtectionAvailabilityW'), labels.itSecSbAvailabilityId);
		AIR.AirAclManager.setNecessity(this.getComponent('cbProtectionAvailabilityW'));
		
		this.setFieldLabel(this.getComponent('taProtectionAvailabilityDescriptionW'), labels.itSecSbAvailabilityDescription);
		AIR.AirAclManager.setNecessity(this.getComponent('taProtectionAvailabilityDescriptionW'));
		
		this.setFieldLabel(this.getComponent('cbProtectionClassInformationW'), labels.protectionClassInformation);
		AIR.AirAclManager.setNecessity(this.getComponent('cbProtectionClassInformationW'));
		
		
		this.setFieldLabel(this.getComponent('lvApplicationUsingRegionsW'), labels.lvApplicationUsingRegionsW);
		AIR.AirAclManager.setNecessity(this.getComponent('lvApplicationUsingRegionsW'));
	}
});
Ext.reg('AIR.CiCreateAppRequiredView', AIR.CiCreateAppRequiredView);
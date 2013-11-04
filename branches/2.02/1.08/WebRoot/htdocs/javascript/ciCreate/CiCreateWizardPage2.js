Ext.namespace('AIR');

AIR.CiCreateWizardPage2 = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',

//		    frame: true,
		    bodyStyle: {
		    	padding: 5
//		    	backgroundColor: '#DFE8F6'//#DFE8F6 #99BBE8
		    },
		    
			labelWidth: 200,
		    
		    items: [{
		    	xtype: 'container',
		    	id: 'wizardStepTwoName',
		    	html: 'Name (Type)'
		    }, {
		    	xtype: 'container',
		    	html: '<hr>'
		    }, {
		        xtype: 'fieldset',
		        id: 'wizardBasics',
		        title: 'Basics',
		        labelWidth: 200,
		        
				items: [{
					xtype: 'combo',
					id: 'wizardlifecycleStatus',
				    fieldLabel: 'Lifecycle',
				    valueField: 'id',
			        displayField: 'text',
			        
			        typeAhead: true,
//			        forceSelection: true,
			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        
			        mode: 'local',
			        allowBlank: true,
			        width: 230,
			        labelSeparator: '',
			        msgTarget: 'under',
				    store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),//lifecycleStatusListStore
				    
				    listeners: {
			            change: function (combo, newValue, oldValue) {
			            	if(this.isComboValueValid(combo, newValue, oldValue));
			            }.createDelegate(this)
				    }
			    }, {
					xtype: 'combo',
					id: 'wizardoperationalStatus',
				    fieldLabel: 'Operational Status',
				    valueField: 'id',
			        displayField: 'text',
			        
			        typeAhead: true,
//			        forceSelection: true,
			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        
			        mode: 'local',
			        allowBlank: true,
			        width: 230,
			        labelSeparator: ' ',
			        msgTarget: 'under',
				    store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),//operationalStatusListStore
				    
				    listeners: {
			            change: function (combo, newValue, oldValue) {
			            	if(this.isComboValueValid(combo, newValue, oldValue));
			            }.createDelegate(this)
				    }
			    }, {
					xtype: 'combo',
					id: 'wizardapplicationBusinessCat',
				    fieldLabel: 'Category Business',
				    valueField: 'id',
			        displayField: 'text',
			        
			        typeAhead: true,
//			        forceSelection: true,
			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        
			        mode: 'local',
			        allowBlank: true,
			        width: 230,
			        labelSeparator: '',
			        msgTarget: 'under',
		            store: AIR.AirStoreManager.getStoreByName('categoryBusinessListStore'),//categoryBusinessListStore
		            
				    listeners: {
			            change: function (combo, newValue, oldValue) {
			            	if(this.isComboValueValid(combo, newValue, oldValue));
			            }.createDelegate(this)
				    }
			    }]
		    },{
		        xtype: 'fieldset',
		        id: 'wizardAgreements',
		        title: 'Agreements',
		        labelWidth: 200,
		        
				items: [{
					xtype: 'combo',
					id: 'wizardsla',
				    fieldLabel: 'SLA',
				    valueField: 'id',
			        displayField: 'text',
			        
			        typeAhead: true,
//			        forceSelection: true,
			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        
			        mode: 'local',
			        allowBlank: true,
			        width: 230,
			        labelSeparator: '',
			        msgTarget: 'under',
				    store: AIR.AirStoreManager.getStoreByName('slaListStore'),//slaListStore,
				    
			        listeners: {
		                select: function(combo, record, index) {
		            		this.getComponent('wizardAgreements').getComponent('wizardserviceContract').getStore().load({
		            			params: { 
		            				slaName: record.data.id
		            			},
		            			callback: function(records, options, success) {
		            				switch(records.length) {
		            					case 1:
		            						var serviceContractId = records[0].data.id;
		            						this.getComponent('wizardAgreements').getComponent('wizardserviceContract').setValue(serviceContractId);
		            						break;
//		            					case 0:
		            					default:
		            						this.getComponent('wizardAgreements').getComponent('wizardserviceContract').reset();
		            						break;
		            				}
		            			}.createDelegate(this)
		            		});
		                	
		                	
//		                    selectedSlaId = record.data['id'];
//		                    this.getComponent('wizardAgreements').getComponent('wizardserviceContract').store.load();
//		                    selectedServiceContractId = 0;
//		                    this.getComponent('wizardAgreements').getComponent('wizardserviceContract').setValue('');
//							this.getComponent('wizardAgreements').getComponent('wizardserviceContract').enable();
//							this.getComponent('wizardAgreements').getComponent('wizardserviceContract').setHideTrigger(false);
//							Ext.get('wizardserviceContract').dom.className="x-form-field x-form-text";
		                }.createDelegate(this),
//		                change: function (combo, newValue, oldValue) {
//		            		if (newValue!==oldValue) {
//		            			this.getComponent('wizardAgreements').getComponent('wizardserviceContract').setValue('');
//		            		}
//		            		if (newValue=='') {
//		            			this.getComponent('wizardAgreements').getComponent('wizardserviceContract').store.removeAll();
//		            			this.getComponent('wizardAgreements').getComponent('wizardserviceContract').disable();
//								this.getComponent('wizardAgreements').getComponent('wizardserviceContract').setHideTrigger(true);
//								Ext.get('wizardserviceContract').dom.className="x-form-text";
//		            		}
//		            		if (0 == this.getComponent('wizardAgreements').getComponent('wizardserviceContract').store.getCount()) {
//		                    	this.getComponent('wizardAgreements').getComponent('wizardserviceContract').disable();
//								this.getComponent('wizardAgreements').getComponent('wizardserviceContract').setHideTrigger(true);
//								Ext.get('wizardserviceContract').dom.className="x-form-text";
//		                    }
//		                }.createDelegate(this),
			            change: function (combo, newValue, oldValue) {
			            	if(this.isComboValueValid(combo, newValue, oldValue));
			            }.createDelegate(this)
//		                blur: function (field) {
//		                    if (1 == this.getComponent('wizardAgreements').getComponent('wizardserviceContract').store.getCount()) {
//								// Vorbelegung
//								// TODO LAYOUT REFRESH
//		                    	selectedServiceContractId = this.getComponent('wizardAgreements').getComponent('wizardserviceContract').store.data.items[0].data.id;
//		                    	this.getComponent('wizardAgreements').getComponent('wizardserviceContract').setValue(this.getComponent('wizardAgreements').getComponent('wizardserviceContract').store.data.items[0].data.id);
//		                    }
//		                }
			        }
			    }, {
					xtype: 'combo',
					id: 'wizardserviceContract',
				    fieldLabel: 'Service Contract',
				    valueField: 'id',
			        displayField: 'text',
			        
//			        typeAhead: true,
//			        forceSelection: true,
//			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        
			        mode: 'local',
			        allowBlank: true,
			        listEmptyText: 'No matching items found',
			        
//			        disabled: true,
//			        fieldClass: 'x-item-disabled disabled',
//			        hideTrigger: true,
			        
			        width: 230,
			        labelSeparator: ' ',
				    store: AIR.AirStoreManager.getStoreByName('serviceContractListStore'),//serviceContractListStore
				    
				    listeners: {
			            change: function (combo, newValue, oldValue) {
			            	if(this.isComboValueValid(combo, newValue, oldValue));
			            }.createDelegate(this)
				    }
			    }, {
					xtype: 'combo',
					id: 'wizardseverityLevel',
				    fieldLabel: 'Severity Level',
				    valueField: 'id',
			        displayField: 'text',
			        
			        typeAhead: true,
//			        forceSelection: true,
			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        
			        mode: 'local',
			        allowBlank: true,
			        width: 230,
			        labelSeparator: '',
			        msgTarget: 'under',
		            store: AIR.AirStoreManager.getStoreByName('severityLevelListStore'),//severityLevelListStore
		            
				    listeners: {
			            change: function (combo, newValue, oldValue) {
			            	if(this.isComboValueValid(combo, newValue, oldValue));
			            }.createDelegate(this)
				    }
			    }, {
					xtype: 'combo',
					id: 'wizardbusinessEssential',
				    fieldLabel: 'Business Essential',
				    valueField: 'id',
			        displayField: 'text',
			        
			        typeAhead: true,
//			        forceSelection: true,
			        autoSelect: false,
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        
			        mode: 'local',
			        allowBlank: true,
			        width: 230,
			        labelSeparator: ' ',
			        msgTarget: 'under',
		            store: AIR.AirStoreManager.getStoreByName('businessEssentialListStore'),//businessEssentialListStore
		            
				    listeners: {
			            change: function (combo, newValue, oldValue) {
			            	if(this.isComboValueValid(combo, newValue, oldValue));
			            }.createDelegate(this)
				    }
			    }]
		    }]
		});
		
		AIR.CiCreateWizardPage2.superclass.initComponent.call(this);
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage2);
		
		this.getComponent('wizardBasics').setTitle(labels.wizardBasics);
		this.setFieldLabel(this.getComponent('wizardBasics').getComponent('wizardlifecycleStatus'), labels.wizardlifecycleStatus);
		this.getComponent('wizardBasics').getComponent('wizardlifecycleStatus').blankText = labels.wizardRequiredField;
		this.setFieldLabel(this.getComponent('wizardBasics').getComponent('wizardoperationalStatus'), labels.wizardoperationalStatus);
		this.getComponent('wizardBasics').getComponent('wizardoperationalStatus').blankText = labels.wizardRequiredField;
		this.setFieldLabel(this.getComponent('wizardBasics').getComponent('wizardapplicationBusinessCat'), labels.wizardapplicationBusinessCat);
		this.getComponent('wizardBasics').getComponent('wizardapplicationBusinessCat').blankText = labels.wizardRequiredField;
		
		this.getComponent('wizardAgreements').setTitle(labels.wizardAgreements);
		this.setFieldLabel(this.getComponent('wizardAgreements').getComponent('wizardsla'), labels.wizardsla);
		this.getComponent('wizardAgreements').getComponent('wizardsla').blankText = labels.wizardRequiredField;
		this.setFieldLabel(this.getComponent('wizardAgreements').getComponent('wizardserviceContract'), labels.wizardserviceContract);
		this.getComponent('wizardAgreements').getComponent('wizardserviceContract').blankText = labels.wizardRequiredField;
		this.setFieldLabel(this.getComponent('wizardAgreements').getComponent('wizardseverityLevel'), labels.wizardseverityLevel);
		this.getComponent('wizardAgreements').getComponent('wizardseverityLevel').blankText = labels.wizardRequiredField;
		this.setFieldLabel(this.getComponent('wizardAgreements').getComponent('wizardbusinessEssential'), labels.wizardbusinessEssential);
		this.getComponent('wizardAgreements').getComponent('wizardbusinessEssential').blankText = labels.wizardRequiredField;
	},
	
	updateToolTips: function(toolTips) {
		
	}
});
Ext.reg('AIR.CiCreateWizardPage2', AIR.CiCreateWizardPage2);
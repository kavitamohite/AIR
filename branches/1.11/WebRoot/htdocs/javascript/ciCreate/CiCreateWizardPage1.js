Ext.namespace('AIR');

AIR.CiCreateWizardPage1 = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',

//		    frame: true,//Hintergrundfarbe ist blau
		    bodyStyle: {
		    	padding: 5
//		    	backgroundColor: '#DFE8F6'
		    },
		    
			labelWidth: 200,
		    
		    items: [{
				xtype: 'combo',
				id: 'wizardobjectType',
			    fieldLabel: 'Type',
			    
			    valueField: 'id',
		        displayField: 'english',
		        editable: false,
//		        readOnly: true,
		        
		        typeAhead: true,
		        forceSelection: true,
		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local',
		        
		        allowBlank: true,
		        //labelSeparator: '',
		        msgTarget: 'under',
		        width: 250,
		        
			    store: AIR.AirStoreManager.getStoreByName('applicationCat1ListStore'),//applicationCat1ListStore,
			    
		        listeners: {
		            select: function(combo, record, index) {
		        		wizardApplicationKat1Id = record.data['id'];
		        		selectedCiCat1Id = wizardApplicationKat1Id;
		        		
		        		// reload the labels
//						setCommonTextLabelDetails();//siehe commonfunctions.js
		        		loadStoreAndActivateCat2();
		            },
		            change: function (combo, newValue, oldValue) {
		        		if (newValue!==oldValue) {
		        			this.getComponent('wizardapplicationCat2').setValue('');
		        		}
		        		if (newValue=='') {
		        			this.getComponent('wizardapplicationCat2').disable();
							this.getComponent('wizardapplicationCat2').setHideTrigger(true);
//							Ext.get('wizardapplicationCat2').dom.className='x-form-text';
							this.getComponent('wizardapplicationCat2').el.dom.className='x-form-text';
		        		}
		        		
		                if (1 == this.getComponent('wizardapplicationCat2').store.getCount()) {
							// Vorbelegung
							// TODO LAYOUT REFRESH
		                	//selectedServiceContractId = this.getComponent('wizardapplicationCat2').store.data.items[0].data.id;
		                	this.getComponent('wizardapplicationCat2').setValue(this.getComponent('wizardapplicationCat2').store.data.items[0].data.id);
		                }

		                if(this.isComboValueValid(combo, newValue, oldValue));
                		// reload the labels
//						setCommonTextLabelDetails();//siehe commonfunctions.js
		            }.createDelegate(this)
		        }
		    }, {
				xtype: 'combo',
				id: 'wizardapplicationCat2',
			    fieldLabel: 'Category',
			    valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
//		        editable: false,
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        
		        mode: 'local',
		        allowBlank: false,
		        width: 250,
		        //labelSeparator: '',
		        msgTarget: 'under',
		        
		        store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),
		        
		        listeners: {
		            select: function(combo, record, index) {
		            	var wizardaclstore = AIR.AirStoreManager.getStoreByName('aclStore');
		            	if(!wizardaclstore.data || wizardaclstore.data.items.length == 0)
		            		wizardaclstore.load();
		            	
		            	if ('Y'===record.data.guiSAPNameWizard) {
		        			var item = {};
		        			wizardSAPName = true;
		        			this.getComponent('wizardapplicationName').hide();
		        			this.getComponent('wizardapplicationName').allowBlank = true;
		        			this.getComponent('wizardapplicationNameSAP').show();
		        			
		        			var aclItemCmp = this.getComponent('wizardapplicationName');
		        			AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
		        			item = this.getComponent('wizardapplicationNameSAP');
		        			item.label.dom.style.fontWeight = 'bold';
		    				if (item.label.dom.className.indexOf('x-form-text-required')==-1) {
		    					item.label.dom.className += ' x-form-text-required';
		    				}
		    				
		        			aclItemCmp = this.getComponent('wizardapplicationNameSAP').items.items[0];//wizardapplicationNameSAP1
		        			var recitemid = wizardaclstore.findExact('id', 'applicationName');
		        			var recitem = wizardaclstore.getAt(recitemid);
		        			AIR.AirAclManager.setMandatory(aclItemCmp, recitem.data.Mandatory);
		        			AIR.AirAclManager.setAttributeProperty(aclItemCmp, 
									recitem.data.attributeType, 
									recitem.data.attributeLength, 
									recitem.data.attributeMask,
									recitem.data.Mandatory);
		        			
//							aclItemCmp = Ext.getCmp('wizardapplicationNameSAP2');
		        			aclItemCmp = this.getComponent('wizardapplicationNameSAP').items.items[1];//wizardapplicationNameSAP2
							AIR.AirAclManager.setMandatory(aclItemCmp, recitem.data.Mandatory);
							AIR.AirAclManager.setAttributeProperty(aclItemCmp, 
									recitem.data.attributeType, 
									4, 
									'/[0-9]/g',
									recitem.data.Mandatory);
							
//							aclItemCmp = Ext.getCmp('wizardapplicationNameSAP3');
							aclItemCmp = this.getComponent('wizardapplicationNameSAP').items.items[2];//wizardapplicationNameSAP3
							AIR.AirAclManager.setMandatory(aclItemCmp, recitem.data.Mandatory);
							AIR.AirAclManager.setAttributeProperty(aclItemCmp, 
									recitem.data.attributeType, 
									4, 
									'/[0-9]/g',
									recitem.data.Mandatory);
		        		} else {
		        			var item = {};
		        			wizardSAPName = false;
		        			this.getComponent('wizardapplicationName').show();
		        			var aclItemCmp = this.getComponent('wizardapplicationName');
		        			var recitemid = wizardaclstore.findExact('id', 'applicationName');
		        			var recitem = wizardaclstore.getAt(recitemid);
		        			if(!recitem.data)
		        				alert(recitemid);
		        			AIR.AirAclManager.setMandatory(aclItemCmp, recitem.data.Mandatory);
		        			AIR.AirAclManager.setAttributeProperty(aclItemCmp, 
									recitem.data.attributeType, 
									recitem.data.attributeLength, 
									recitem.data.attributeMask,
									recitem.data.Mandatory);
							item = this.getComponent('wizardapplicationNameSAP');
							item.label.dom.style.fontWeight = 'normal';
							if (item.label.dom.className.indexOf('x-form-text-required')==-1) {
								item.label.dom.className += ' x-form-text-required';
							}
		        			this.getComponent('wizardapplicationNameSAP').hide();
		        			aclItemCmp = this.getComponent('wizardapplicationNameSAP').items.items[0];//Ext.getCmp('wizardapplicationNameSAP1');
		        			AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
							aclItemCmp = this.getComponent('wizardapplicationNameSAP').items.items[1];//Ext.getCmp('wizardapplicationNameSAP2');
							AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
							aclItemCmp = this.getComponent('wizardapplicationNameSAP').items.items[2];//Ext.getCmp('wizardapplicationNameSAP3');
							AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
		        		}
		            }.createDelegate(this),
		            change: function (combo, newValue, oldValue) {
		            	if(this.isComboValueValid(combo, newValue, oldValue));
		            }.createDelegate(this)
		        }
		    },{
		    	xtype: 'container',
		    	html: '&nbsp;'
		    },{
		    	xtype: 'textfield',
		        width: 250,
		        fieldLabel: 'Name',
		        id: 'wizardapplicationName',
		        allowBlank: true,
		        vtype: 'allowedName',
		        validationDelay: 500,//500 100
		        //labelSeparator: '',
		        msgTarget: 'under'
//		        enableKeyEvents: true,//Stop IE to always set the cursor at the end when pushing left/right or setting the cursor with the mouse
		        
//		        listeners: {
//		        	change: function (field, newValue, oldValue) {
//		        		this.objectNameAllowedStore.isLoaded = false;
//		        		this.objectNameAllowedStore.setBaseParam('query', newValue.trim());
//		        		this.objectNameAllowedStore.load();
//		        		
//		        		var tfAlias = this.getComponent('wizardapplicationAlias');
//		        		if(tfAlias.getValue().length == 0) {
//		        			tfAlias.setValue(newValue);
//		        		
//		        			this.objectAliasAllowedStore.isLoaded = false;
//		        			this.objectAliasAllowedStore.setBaseParam('query', newValue.trim());
//		        			this.objectAliasAllowedStore.load();
//		        		}
//		        	}.createDelegate(this)
//		        }
		    },{
		    	xtype: 'compositefield',
		    	//fieldLabel: 'Name',
		    	id: 'wizardapplicationNameSAP',
		    	hidden: true,
		    	width: 250,
		    	vtype: 'allowedName',
		    	
		    	items: [{
		    		xtype: 'textfield',
		    		fieldLabel: 'Name',
		    		id: 'wizardapplicationNameSAP1',
		    		
		    		enableKeyEvents: true,
		    		width: 98,
		    		allowBlank: true,
		    		msgTarget: 'under',
		    		
		            listeners: {
		            	change: function (field, newValue, oldValue) {
		            		this.isSapNameAllowed();
		            	}.createDelegate(this)
		            }
		    	},{
		    		xtype: 'textfield',
		    		value: 'M',
		    		disabled: true,
		    		width: 18
		    	},{
		    		xtype: 'textfield',
		    		id: 'wizardapplicationNameSAP2',
		    		fieldLabel: 'Mandant',
		    		
		    		enableKeyEvents: true,
		    		width: 48,
		    		allowBlank: true,
		    		
		            listeners: {
		            	change: function (field, newValue, oldValue) {
		            		if (newValue.length < 4) {
		            			newValue = '0000' + newValue;
		            			newValue = newValue.substring(newValue.length-4);
		            			field.setValue(newValue);
		            		}
		            		this.isSapNameAllowed();
		            	}.createDelegate(this)
		            }
		    	},{
		    		xtype: 'textfield',
		    		value: 'C',
		    		disabled: true,
		    		width: 18
		    	},{
		    		xtype: 'textfield',
		    		id: 'wizardapplicationNameSAP3',
		    		fieldLabel: 'Company',
		    		
		    		enableKeyEvents: true,
		    		width: 48,
		    		allowBlank: true,
		    		
		            listeners: {
		            	change: function (field, newValue, oldValue) {
		            		this.isSapNameAllowed();
		            	}.createDelegate(this)
		            }
		    	}]
		    }, {
		    	xtype: 'textfield',
		        width: 250,
		        fieldLabel: 'Alias',
		        id: 'wizardapplicationAlias',
		        
		        allowBlank: true,
		        vtype: 'allowedAlias',
		        validationDelay: 500,//500 100
//		        enableKeyEvents: true,//Stop IE to always set the cursor at the end when pushing left/right or setting the cursor with the mouse
		        labelSeparator: ' ',
		        msgTarget: 'under'
		        
//		        listeners: {
//		        	change: function (field, newValue, oldValue) {
//		        		if(newValue.length > 0) {
//		        			this.objectAliasAllowedStore.isLoaded = false;
//		        			this.objectAliasAllowedStore.setBaseParam('query', newValue.trim());
//		        			this.objectAliasAllowedStore.load();
//		        		}
//		        	}.createDelegate(this)
//		        }
		    },{
		    	xtype: 'textarea',
		        width: 250,
		        height: 75,
		        
//		        grow: true,
//		        growMin: 75,
//		        growMax: 75,
		        
		        fieldLabel: 'Description',
		        id: 'wizardcomments',
		        allowBlank: true,
		        labelSeparator: ' ',
		        msgTarget: 'under'
		    }, {
		        xtype: 'fieldset',
		        id: 'wizardRelevance',
		        title: 'Relevant Regulations',
		        
		        layout: 'hbox',//toolbar column
//		        anchor: '70%',//50%
		        
		        items: [{
		        	xtype: 'checkboxgroup',
		        	id: 'cbgWizardRegulations',
		        	
		        	columns: 4,
        			width: 400,//300 200
        			hideLabel: true,
        			
        			items: [
    			        { boxLabel: 'GR1435', name: 'cbgWizardRegulations' },
    			        { boxLabel: 'GR1775', name: 'cbgWizardRegulations' },
    			        { boxLabel: 'GR1920', name: 'cbgWizardRegulations' },
    			        { boxLabel: 'GR2008', name: 'cbgWizardRegulations' }
			        ]
		        },{
		    		xtype: 'label',
		    		id: 'lWizardGXP',
		    		text: 'GXP',
		    		
					style: {
				    	fontSize: 12,
				    	marginTop: 4
//				    	marginRight: 5
					}
		    	},{
					xtype: 'combo',
					id: 'wizardrelevanceGxp',
					store: AIR.AirStoreManager.getStoreByName('gxpFlagListStore'),//AIR.AirStoreFactory.createGxpFlagListStore(),//gxpFlagListStore,
			        editable: false,

					width: 80,

			        valueField: 'id',
			        displayField: 'text',
			        
			        triggerAction: 'all',
			        lazyRender: true,
			        lazyInit: false,
			        mode: 'local',
			        
			        margins: '0 0 0 10'
//					style: {
//				    	marginLeft: 5
//					}
		    	}]
		    	
		    	
		    	/* OK
		        xtype: 'fieldset',
		        id: 'wizardRelevance',
		        title: 'Relevance',
		        labelWidth: 200,
		        
				items: [{
					xtype: 'container',
					id: 'tbWizardRelevance',
					layout: 'toolbar',//toolbar column
					
					items: [{
						xtype: 'checkbox',
						id: 'wizardrelevanceGR1435'
		        	},{
						id: 'labelwizardrelevanceGR1435',
						xtype: 'label',
						style: {
							fontSize: 12,
							marginRight: 20
						}
		    		},{
						xtype: 'checkbox',
						id: 'wizardrelevanceGR1775'
		        	},{
						id: 'labelwizardrelevanceGR1775',
						xtype: 'label',
						style: {
							fontSize: 12,
							marginRight: 20
						}
		    		},{
						xtype: 'checkbox',
						id: 'wizardrelevanceGR1920'
		        	},{
						id: 'labelwizardrelevanceGR1920',
						xtype: 'label',
						style: {
							fontSize: 12,
							marginRight: 20
						}
		    		},{
						xtype: 'checkbox',
						id: 'wizardrelevanceGR2008'
		        	},{
						id: 'labelwizardrelevanceGR2008',
						xtype: 'label',
						style: {
							fontSize: 12,
							marginRight: 20
						}
		    		},{
						id: 'labelwizardrelevanceGxp',
						xtype: 'label',
						style: {
							fontSize: 12,
							marginRight: 20
						}
		    		}, {
						xtype: 'combo',
						id: 'wizardrelevanceGxp',
						store: AIR.AirStoreManager.getStoreByName('gxpFlagListStore'),//AIR.AirStoreFactory.createGxpFlagListStore(),//gxpFlagListStore,
						
						width: 60,
				        valueField: 'id',
				        displayField: 'text',
				        msgTarget: 'under',
				        
//				        typeAhead: true,
//				        forceSelection: true,
//				        autoSelect: true,
				        
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local'
		        	}]
				}]*/
			}, {
		    	xtype: 'checkbox',
		        fieldLabel: 'Object is Template',
		        id: 'wizardisTemplate',
		        labelSeparator: ' ',
		        allowBlank: true
		    }]
		});
		
		AIR.CiCreateWizardPage1.superclass.initComponent.call(this);
		
		this.objectNameAllowedStore = AIR.AirStoreFactory.getObjectNameAllowedStore();
		this.objectAliasAllowedStore = AIR.AirStoreFactory.getObjectAliasAllowedStore();
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage1);
		
		this.setFieldLabel(this.getComponent('wizardobjectType'), labels.wizardobjectType);
		this.getComponent('wizardobjectType').blankText = labels.wizardRequiredField;
		this.getComponent('wizardobjectType').validate();
		
		this.setFieldLabel(this.getComponent('wizardapplicationCat2'), labels.label_details_category);
		this.getComponent('wizardapplicationCat2').blankText = labels.wizardRequiredField;
		this.getComponent('wizardapplicationCat2').validate();
		
		this.setFieldLabel(this.getComponent('wizardapplicationName'), labels.wizardapplicationName);
		this.getComponent('wizardapplicationName').blankText = labels.wizardRequiredField;
		
		var sapNameLabel = labels.wizardapplicationNameSAP + ' (' + labels.wizardapplicationNameSAP1 + ', ' + labels.wizardapplicationNameSAP2 + ', ' + labels.wizardapplicationNameSAP3 + ')';
		this.setFieldLabel(this.getComponent('wizardapplicationNameSAP'), sapNameLabel);
		this.setFieldLabel(this.getComponent('wizardapplicationName'), labels.wizardapplicationName);
		this.getComponent('wizardapplicationName').validate();
		
		/*
		// -- Reihenfolge wichtig	this.getComponent('wizardapplicationNameSAP').items.items[1]
		this.setFieldLabel(this.getComponent('wizardapplicationNameSAP'), labels.wizardapplicationNameSAP1);//.getComponent('wizardapplicationNameSAP1') .items.items[0]
//		this.getComponent('wizardapplicationNameSAP').items.items[0].blankText = labels.wizardRequiredField;
		this.setFieldLabel(this.getComponent('wizardapplicationNameSAP').items.items[1], labels.wizardapplicationNameSAP2);
//		this.getComponent('wizardapplicationNameSAP').items.items[1].blankText = labels.wizardRequiredField;
		this.setFieldLabel(this.getComponent('wizardapplicationNameSAP').items.items[2], labels.wizardapplicationNameSAP3);
//		this.getComponent('wizardapplicationNameSAP').items.items[2].blankText = labels.wizardRequiredField;
//		this.setFieldLabel(this.getComponent('wizardapplicationNameSAP').getComponent('wizardapplicationNameSAP'), labels.wizardapplicationNameSAP);
		*/
		
		this.setFieldLabel(this.getComponent('wizardapplicationAlias'), labels.wizardapplicationAlias);
		this.getComponent('wizardapplicationAlias').blankText = labels.wizardRequiredField;
		this.getComponent('wizardapplicationAlias').validate();
		
		this.setFieldLabel(this.getComponent('wizardcomments'), labels.wizardcomments);
		
		this.getComponent('wizardRelevance').setTitle(labels.wizardRelevance);
		
		
		var cbgWizardRegulations = this.getComponent('wizardRelevance').getComponent('cbgWizardRegulations');
		this.setBoxLabel(cbgWizardRegulations.items.items[0], labels.labelwizardrelevanceGR1435);
		this.setBoxLabel(cbgWizardRegulations.items.items[1], labels.labelwizardrelevanceGR1775);
		this.setBoxLabel(cbgWizardRegulations.items.items[2], labels.labelwizardrelevanceGR1920);
		this.setBoxLabel(cbgWizardRegulations.items.items[3], labels.labelwizardrelevanceGR2008);
		
//		this.getComponent('wizardRelevance')/*.getComponent('tbWizardRelevance')*/.getComponent('labelwizardrelevanceGR1920').setText(labels.labelwizardrelevanceGR1920);
//		this.getComponent('wizardRelevance')/*.getComponent('tbWizardRelevance')*/.getComponent('labelwizardrelevanceGR1435').setText(labels.labelwizardrelevanceGR1435);
//		this.getComponent('wizardRelevance')/*.getComponent('tbWizardRelevance')*/.getComponent('labelwizardrelevanceGR1775').setText(labels.labelwizardrelevanceGR1775);
//		this.getComponent('wizardRelevance')/*.getComponent('tbWizardRelevance')*/.getComponent('labelwizardrelevanceGR2008').setText(labels.labelwizardrelevanceGR2008);
//		this.getComponent('wizardRelevance')/*.getComponent('tbWizardRelevance')*/.getComponent('labelwizardrelevanceGxp').setText(labels.labelwizardrelevanceGxp);
		
		
		this.setFieldLabel(this.getComponent('wizardisTemplate'), labels.wizardisTemplate);
	},
	
	updateToolTips: function(toolTips) {
		
	},
	
	isSapNameAllowed: function() {//this.getComponent('wizardapplicationNameSAP').items.items[0];
		if(this.getComponent('wizardapplicationNameSAP').items.items[0].getValue().length > 0 &&
		   this.getComponent('wizardapplicationNameSAP').items.items[1].getValue().length > 0 &&
		   this.getComponent('wizardapplicationNameSAP').items.items[2].getValue().length > 0) {
			this.objectNameAllowedStore.setBaseParam('query', 
				this.getComponent('wizardapplicationNameSAP').items.items[0].getValue() + 'C' +
			    this.getComponent('wizardapplicationNameSAP').items.items[1].getValue() + 'M' +
				this.getComponent('wizardapplicationNameSAP').items.items[2].getValue());
			
			this.objectNameAllowedStore.load();
		}
		
//		if (Ext.getCmp('wizardapplicationNameSAP1').getValue().trim()!=='' 
//				&& Ext.getCmp('wizardapplicationNameSAP2').getValue() !== ''
//				&& Ext.getCmp('wizardapplicationNameSAP3').getValue() !== '') {
//			this.objectNameAllowedStore.setBaseParam('query', Ext.getCmp('wizardapplicationNameSAP1').getValue().trim()+'C' 
//				    +Ext.getCmp('wizardapplicationNameSAP2').getValue()+'M'
//					+Ext.getCmp('wizardapplicationNameSAP3').getValue());
//			this.objectNameAllowedStore.load();
//		}
	}
	
//	setFieldLabel: function(comp, label) {
//		
//		if (Ext.getCmp(comp)!==undefined) {
//			label = label + (Ext.getCmp(comp).labelSeparator===undefined?'':Ext.getCmp(comp).labelSeparator);
//			Ext.getCmp(comp).el.up('.x-form-item', 10, true).child('.x-form-item-label').update(label);
//		}
//	}
	
//	setBoxLabel: function(comp, label) {
//		if (Ext.getCmp(comp)!==undefined) {
//			Ext.getCmp(comp).el.dom.nextSibling.childNodes[0].nodeValue = label;
//		}
//	}
});
Ext.reg('AIR.CiCreateWizardPage1', AIR.CiCreateWizardPage1);
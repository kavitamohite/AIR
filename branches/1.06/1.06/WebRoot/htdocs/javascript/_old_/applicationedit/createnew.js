var wizardCurrentStep = 0;
var wizardMaxSteps = 3;
var wizardApplicationKat1Id = 0;
var wizardApplicationKat1Name = '';
var wizardSAPName = false;


//Ext.apply(Ext.form.VTypes, {
//    allowedName: function(val, field) {
//    	var isValid = objectNameallowedStore.getAt(0)===undefined?true:objectNameallowedStore.getAt(0).data.countResultSet==0?true:false; 
//        return isValid;
//    },
//    allowedNameText: '"Name" already exists. Please choose another name or ask itsecuritycenter@bayerbbs.com for help to enable this name.'
//});
//
//Ext.apply(Ext.form.VTypes, {
//    allowedAlias: function(val, field) {
//        return objectAliasallowedStore.getAt(0)===undefined?true:objectAliasallowedStore.getAt(0).data.countResultSet==0?true:false;
//    },
//    allowedAliasText: '"Alias" already exists. Please choose another name or ask itsecuritycenter@bayerbbs.com for help to enable this name.'
//});


//function sapNameAllowed() {
//	if (Ext.getCmp('wizardapplicationNameSAP1').getValue().trim()!=='' 
//			&& Ext.getCmp('wizardapplicationNameSAP2').getValue() !== ''
//			&& Ext.getCmp('wizardapplicationNameSAP3').getValue() !== '') {
//		objectNameallowedStore.setBaseParam('query', Ext.getCmp('wizardapplicationNameSAP1').getValue().trim()+'C' 
//			    +Ext.getCmp('wizardapplicationNameSAP2').getValue()+'M'
//				+Ext.getCmp('wizardapplicationNameSAP3').getValue());
//		objectNameallowedStore.load();
//	}
//}


//function isStepValid(step) {
//	switch(step) {
//		case 1:
//			if (wizardSAPName) {
//				Ext.getCmp('wizardapplicationNameSAP1').setValue(Ext.getCmp('wizardapplicationNameSAP1').getValue().trim());
//				Ext.getCmp('wizardapplicationNameSAP1').clearInvalid();
//			} else {
//				Ext.getCmp('wizardapplicationName').setValue(Ext.getCmp('wizardapplicationName').getValue().trim());
//				Ext.getCmp('wizardapplicationName').clearInvalid();
//			}
//			Ext.getCmp('wizardapplicationAlias').setValue(Ext.getCmp('wizardapplicationAlias').getValue().trim());
//			Ext.getCmp('wizardapplicationAlias').clearInvalid(); 
//			Ext.getCmp('wizardobjectType').clearInvalid(); 
//			Ext.getCmp('wizardapplicationCat2').clearInvalid();
//			Ext.getCmp('wizardcomments').setValue(Ext.getCmp('wizardcomments').getValue().trim());
//			Ext.getCmp('wizardcomments').clearInvalid(); 
//			Ext.getCmp('wizardrelevanceGR1920').clearInvalid(); 
//			Ext.getCmp('wizardrelevanceGR1435').clearInvalid(); 
//			Ext.getCmp('wizardrelevanceGR1775').clearInvalid(); 
//			Ext.getCmp('wizardrelevanceGR2008').clearInvalid(); 
//			Ext.getCmp('wizardrelevanceGxp').clearInvalid(); 
//			Ext.getCmp('wizardisTemplate').clearInvalid(); 
//			return Ext.getCmp('wizardobjectType').isValid() &&
//					Ext.getCmp('wizardapplicationCat2').isValid() &&
//					Ext.getCmp('wizardapplicationName').isValid() &&
//					(objectNameallowedStore.getAt(0)===undefined?true:objectNameallowedStore.getAt(0).data.countResultSet==0?true:false) &&
//					(objectAliasallowedStore.getAt(0)===undefined?true:objectAliasallowedStore.getAt(0).data.countResultSet==0?true:false) &&
//					Ext.getCmp('wizardapplicationNameSAP1').isValid() && 
//					Ext.getCmp('wizardapplicationNameSAP2').isValid() && 
//					Ext.getCmp('wizardapplicationNameSAP3').isValid() && 
//					Ext.getCmp('wizardapplicationAlias').isValid() && 
//					Ext.getCmp('wizardcomments').isValid() &&
//					Ext.getCmp('wizardrelevanceGR1920').isValid() &&
//					Ext.getCmp('wizardrelevanceGR1435').isValid() &&
//					Ext.getCmp('wizardrelevanceGR2008').isValid() &&
//					Ext.getCmp('wizardrelevanceGR1775').isValid() &&
//					Ext.getCmp('wizardrelevanceGxp').isValid() &&
//					Ext.getCmp('wizardisTemplate').isValid();
//			break;
//
//		case 2:
//			Ext.getCmp('wizardlifecycleStatus').clearInvalid(); 
//			Ext.getCmp('wizardoperationalStatus').clearInvalid();
//			Ext.getCmp('wizardapplicationBusinessCat').clearInvalid(); 
//			Ext.getCmp('wizardsla').clearInvalid(); 
//			Ext.getCmp('wizardserviceContract').clearInvalid(); 
//			Ext.getCmp('wizardseverityLevel').clearInvalid(); 
//			Ext.getCmp('wizardbusinessEssential').clearInvalid(); 
//			return Ext.getCmp('wizardlifecycleStatus').isValid() &&
//						Ext.getCmp('wizardoperationalStatus').isValid() &&
//						Ext.getCmp('wizardapplicationBusinessCat').isValid() &&
//						Ext.getCmp('wizardsla').isValid() &&
//						Ext.getCmp('wizardserviceContract').isValid() &&
//						Ext.getCmp('wizardseverityLevel').isValid() &&
//						Ext.getCmp('wizardbusinessEssential').isValid();
//			break;
//
//		case 3: 
//			Ext.getCmp('wizardapplicationOwner').clearInvalid(); 
//			Ext.getCmp('wizardapplicationOwnerDelegate').clearInvalid(); 
//			Ext.getCmp('wizardciResponsible').clearInvalid(); 
//			Ext.getCmp('wizardciSubResponsible').clearInvalid(); 
//			return Ext.getCmp('wizardapplicationOwner').isValid() &&
//						Ext.getCmp('wizardapplicationOwnerDelegate').isValid() &&
//						Ext.getCmp('wizardciResponsible').isValid() &&
//						Ext.getCmp('wizardciSubResponsible').isValid();
//			break;
//		default: false;
//	} 
//}
//
//
//function nextStep() {
//	if (isStepValid(wizardCurrentStep)) {
//		if (wizardCurrentStep == wizardMaxSteps-1) {
//			Ext.getCmp('createnextbutton').hide();
//			Ext.getCmp('createfinishbutton').show();
//		}
//		if (wizardCurrentStep == 1) {
//			wizardApplicationKat1Id = Ext.getCmp('wizardobjectType').getValue();
//			wizardApplicationKat1Name = Ext.getCmp('wizardobjectType').getRawValue();
//			//selectedCiCat1Id = wizardApplicationKat1Id;
////			applicationCat2ListStore.load();
////			lifecycleStatusListStore.load();
////			operationalStatusListStore.load();
//			
//			wizardAliasName = '';
//			if (Ext.getCmp('wizardapplicationAlias').getValue()!==undefined && Ext.getCmp('wizardapplicationAlias').getValue()!=='') {
//				wizardAliasName = ' (' + Ext.getCmp('wizardapplicationAlias').getValue() + ')';
//			}
//			wizardHeaderName = '';
//			if (wizardSAPName) {
//				wizardHeaderName = Ext.getCmp('wizardapplicationNameSAP1').getValue() + 'M' 
//								+ Ext.getCmp('wizardapplicationNameSAP2').getValue() + 'C'  
//								+ Ext.getCmp('wizardapplicationNameSAP3').getValue() 
//								+ wizardAliasName +'<br>'
//								+ '<span style="font-size: 10px;">'
//								+ wizardApplicationKat1Name + '</span>';
//			} else {
//				wizardHeaderName = Ext.getCmp('wizardapplicationName').getValue() 
//								+ wizardAliasName +'<br>'
//								+ '<span style="font-size: 10px;">'
//								+ wizardApplicationKat1Name + '</span>';
//			}
//			Ext.get('wizardStepTwoName').dom.innerHTML = wizardHeaderName;
//			Ext.get('wizardStepThreeName').dom.innerHTML = wizardHeaderName;
//			if (Ext.getCmp('wizardbusinessEssential').getValue()=='') {
//				Ext.getCmp('wizardbusinessEssential').setValue('16');
//			}
//			if (hasRoleBusinessEssentialEditor) {
//				Ext.getCmp('wizardbusinessEssential').show();
//			} else {
//				Ext.getCmp('wizardbusinessEssential').hide();
//			}
//		}
//		if (wizardCurrentStep == 2) {
////			if (undefined !== rolePersonListStore && undefined !== rolePersonListStore.data) {
//				
//				var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
//				
////				Ext.each(rolePersonListStore.data, function(item, index, allItems) {
//				rolePersonListStore.each(function(item, index, allItems) {
//					var key 	= item.data.id;//rolePersonListStore.getAt(index).data.id;
//					var value 	= item.data.roleName;//rolePersonListStore.getAt(index).data.roleName;
//					
//					if(rolenameApplicationLayer === value || rolenameDeveloper === value) {
//						if (Ext.getCmp('wizardapplicationOwnerHidden').getValue()=='') {
//							Ext.getCmp('wizardapplicationOwner').setValue(username + ' ('+cwid.toUpperCase()+')');
//							Ext.getCmp('wizardapplicationOwnerHidden').setValue(cwid.toUpperCase());
//						}
//					}
//					
//				});
////			}
//			if (Ext.getCmp('wizardciResponsibleHidden').getValue()=='') {
//				Ext.getCmp('wizardciResponsible').setValue(username + ' ('+cwid.toUpperCase()+')');
//				Ext.getCmp('wizardciResponsibleHidden').setValue(cwid.toUpperCase());
//			}
//			
//		}
//   		Ext.getCmp('createcancelbutton').show();
//   		Ext.getCmp('createbackbutton').show();
//   		wizardCurrentStep = wizardCurrentStep + 1;
//   		
////   		createtabpanel.layout.setActiveItem(wizardCurrentStep);
////		var createtabPanel = Ext.getCmp('createtabPanel');
//   		var createtabPanel = Ext.getCmp('CiCreateWizardView');
//		createtabPanel.layout.setActiveItem(wizardCurrentStep);
//	} else {
//		var msgtext = AIR.AirApplicationManager.getLabels().wizardDataNotValid.replace(/##/, wizardCurrentStep);//languagestore.data.items[0].data['wizardDataNotValid'].replace(/##/, wizardCurrentStep);
//		
//		switch (wizardCurrentStep) {
//			case 1: 
//			if (!Ext.getCmp('wizardobjectType').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardobjectType').fieldLabel;
//			if (!Ext.getCmp('wizardapplicationCat2').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardapplicationCat2').fieldLabel;
//			if (wizardSAPName) {	
//				if (!(objectNameallowedStore.getAt(0)===undefined?true:objectNameallowedStore.getAt(0).data.countResultSet==0?true:false)) {
//					Ext.getCmp('wizardapplicationNameSAP1').markInvalid();
//					msgtext += '<br/>' + Ext.form.VTypes.allowedNameText;
//				} else {
//					if (!Ext.getCmp('wizardapplicationNameSAP1').isValid())
//						msgtext += '<br/>' + Ext.getCmp('wizardapplicationNameSAP1').fieldLabel;
//							
//					if (!Ext.getCmp('wizardapplicationNameSAP2').isValid())
//						msgtext += '<br/>' + Ext.getCmp('wizardapplicationNameSAP2').fieldLabel;
//					if (!Ext.getCmp('wizardapplicationNameSAP3').isValid())
//						msgtext += '<br/>' + Ext.getCmp('wizardapplicationNameSAP3').fieldLabel;
//				}
//			} else {
//				if (!(objectNameallowedStore.getAt(0)===undefined?true:objectNameallowedStore.getAt(0).data.countResultSet==0?true:false)) {
//					Ext.getCmp('wizardapplicationName').markInvalid();
//					msgtext += '<br/>' + Ext.form.VTypes.allowedNameText;
//				} else if (!Ext.getCmp('wizardapplicationName').isValid()) {
//					msgtext += '<br/>' + Ext.getCmp('wizardapplicationName').fieldLabel;
//				}
//			}
//			if (!(objectAliasallowedStore.getAt(0)===undefined?true:objectAliasallowedStore.getAt(0).data.countResultSet==0?true:false)) {
//				Ext.getCmp('wizardapplicationAlias').markInvalid();
//				msgtext += '<br/>' + Ext.form.VTypes.allowedAliasText;
//			} else if (!Ext.getCmp('wizardapplicationAlias').isValid()) {
//				msgtext += '<br/>' + Ext.getCmp('wizardapplicationAlias').fieldLabel;
//			}
//			if (!Ext.getCmp('wizardcomments').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardcomments').fieldLabel;
//			if (!Ext.getCmp('wizardrelevanceGR1920').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardrelevanceGR1920').fieldLabel;
//			if (!Ext.getCmp('wizardrelevanceGR1435').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardrelevanceGR1435').fieldLabel;
//			if (!Ext.getCmp('wizardrelevanceGxp').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardrelevanceGxp').fieldLabel;
//			if (!Ext.getCmp('wizardisTemplate').isValid())  {
//				msgtext += '<br/>' + Ext.getCmp('wizardisTemplate').fieldLabel;
//			}
//			break;
//			case 2:
//			if (!Ext.getCmp('wizardlifecycleStatus').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardlifecycleStatus').fieldLabel;
//			if (!Ext.getCmp('wizardsla').isValid())
//				msgtext += '<br/>' + Ext.getCmp('wizardsla').fieldLabel;
//			break;
//		}
//		
//		Ext.MessageBox.show({
//		   title:'Error',
//		   msg: msgtext,
//		   buttons: Ext.MessageBox.OK,
//		   icon: Ext.MessageBox.ERROR
//		});
//	}	
//}



/*
var wizardStepZeroPanel = new Ext.Panel({
	labelWidth: 0, // label settings here cascade unless overridden
    frame: true,
    // bodyStyle:'padding:5px 5px 0',
    layout: 'form',
    style: {
    	fontSize: '12px'
    },
    
    items: [{
    	xtype: 'container',
        id: 'createIntroText',
        html: 'This wizard will guide you through the first steps creating a new object / CI.<br/><br/>'
        	+ 'Step 1: Setup essential information like  type and name<br/>'
        	+ 'Step 2: Apply  required details <br/>'
        	+ 'Step 3: Apply contacts<br/><br/>'
        	+ 'Afterwards,  additional information can be added to the new CI. '
        	+ 'The maintenance of connections to  other Objects is  recommended as well.'
    }, {
    	xtype: 'checkbox',
    	id: 'wizardcbskip',
    	boxLabel: 'Skip this page next time.',
    	labelWidth: 0
    }]
});*/


/*
var wizardStepOnePanel = new Ext.Panel({
	labelWidth: 200, // label settings here cascade unless overridden
    frame: true,
    // bodyStyle:'padding:5px 5px 0',
    layout: 'form',
    items: [{
		xtype: 'combo',
		id: 'wizardobjectType',
	    fieldLabel: 'Type',
	    valueField: 'id',
        displayField: 'english',
        
        disabled: true,
        typeAhead: true,
        forceSelection: true,
        autoSelect: false,
        triggerAction: 'all',
        lazyRender:true,
        lazyInit:false,
        mode: 'local',
        allowBlank: true,
        labelSeparator: '',
        width: 250,
        
	    store: applicationCat1ListStore,
	    
        listeners: {
            select: function(combo, record, index) {
        		wizardApplicationKat1Id = record.data['id'];
        		selectedCiCat1Id = wizardApplicationKat1Id;
        		loadStoreAndActivateCat2();
            },
            change: function (combo, newValue, oldValue) { 
        		if (newValue!==oldValue) {
        			Ext.getCmp('wizardapplicationCat2').setValue('');
        		}
        		if (newValue=='') {
        			Ext.getCmp('wizardapplicationCat2').disable();
					Ext.getCmp('wizardapplicationCat2').setHideTrigger(true);
					Ext.get('wizardapplicationCat2').dom.className='x-form-text';
        		}
        		
                if (1 == Ext.getCmp('wizardapplicationCat2').store.getCount()) {
					// Vorbelegung
					// TODO LAYOUT REFRESH
                	//selectedServiceContractId = Ext.getCmp('wizardapplicationCat2').store.data.items[0].data.id;
                	Ext.getCmp('wizardapplicationCat2').setValue(Ext.getCmp('wizardapplicationCat2').store.data.items[0].data.id);
                }
            }
        }
    }, {
		xtype: 'combo',
		id: 'wizardapplicationCat2',
	    fieldLabel: 'Category',
	    valueField: 'id',
        displayField: 'text',
        typeAhead: true,
        forceSelection: true,
        autoSelect: false,
        triggerAction: 'all',
        lazyRender:true,
        lazyInit:false,
        mode: 'local',
        allowBlank: true,
        width: 250,
        labelSeparator: '',
        store: applicationCat2ListStore,
        listeners: {
            select: function(combo, record, index) {
            	if ('Y'===record.data.guiSAPNameWizard) {
        			var item = {};
        			wizardSAPName = true;
        			Ext.getCmp('wizardapplicationName').hide();
        			Ext.getCmp('wizardapplicationName').allowBlank = true;
        			Ext.getCmp('wizardapplicationNameSAP').show();
        			
        			aclItemCmp = Ext.getCmp('wizardapplicationName');
        			setMandatory(aclItemCmp, 'optional');
        			item = Ext.getCmp('wizardapplicationNameSAP');
        			item.label.dom.style.fontWeight = 'bold';
    				if (item.label.dom.className.indexOf('x-form-text-required')==-1) {
    					item.label.dom.className += ' x-form-text-required';
    				}
        			aclItemCmp = Ext.getCmp('wizardapplicationNameSAP1');
        			recitemid = wizardaclstore.findExact('id', 'applicationName');
        			recitem = wizardaclstore.getAt(recitemid);
        			setMandatory(aclItemCmp, recitem.data.Mandatory);
					setAttributeProperty(aclItemCmp, 
							recitem.data.attributeType, 
							recitem.data.attributeLength, 
							recitem.data.attributeMask,
							recitem.data.Mandatory);
					aclItemCmp = Ext.getCmp('wizardapplicationNameSAP2');
        			setMandatory(aclItemCmp, recitem.data.Mandatory);
					setAttributeProperty(aclItemCmp, 
							recitem.data.attributeType, 
							4, 
							'/[0-9]/g',
							recitem.data.Mandatory);
					aclItemCmp = Ext.getCmp('wizardapplicationNameSAP3');
        			setMandatory(aclItemCmp, recitem.data.Mandatory);
					setAttributeProperty(aclItemCmp, 
							recitem.data.attributeType, 
							4, 
							'/[0-9]/g',
							recitem.data.Mandatory);
        		} else {
        			var item = {};
        			wizardSAPName = false;
        			Ext.getCmp('wizardapplicationName').show();
        			aclItemCmp = Ext.getCmp('wizardapplicationName');
        			recitemid = wizardaclstore.findExact('id', 'applicationName');
        			recitem = wizardaclstore.getAt(recitemid);
        			setMandatory(aclItemCmp, recitem.data.Mandatory);
					setAttributeProperty(aclItemCmp, 
							recitem.data.attributeType, 
							recitem.data.attributeLength, 
							recitem.data.attributeMask,
							recitem.data.Mandatory);
					item = Ext.getCmp('wizardapplicationNameSAP');
					item.label.dom.style.fontWeight = 'normal';
					if (item.label.dom.className.indexOf('x-form-text-required')==-1) {
						item.label.dom.className += ' x-form-text-required';
					}
        			Ext.getCmp('wizardapplicationNameSAP').hide();
        			aclItemCmp = Ext.getCmp('wizardapplicationNameSAP1');
        			setMandatory(aclItemCmp, 'optional');
					aclItemCmp = Ext.getCmp('wizardapplicationNameSAP2');
					setMandatory(aclItemCmp, 'optional');
					aclItemCmp = Ext.getCmp('wizardapplicationNameSAP3');
					setMandatory(aclItemCmp, 'optional');
        		}
            }
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
        validationDelay: 500,
        labelSeparator: '',
        enableKeyEvents: true,
        listeners: {
        	change: function (field, newValue, oldValue) {
        		objectNameallowedStore.setBaseParam('query', newValue);
        		objectNameallowedStore.load();
        		
        		var tfAlias = Ext.getCmp('wizardapplicationAlias');
        		if(tfAlias.getValue().length == 0)
        			tfAlias.setValue(newValue);
        	}
        }
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
            listeners: {
            	change: function (field, newValue, oldValue) {
            		sapNameAllowed();
            	}
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
            		if (newValue.length<4) {
            			newValue = '0000' + newValue;
            			newValue = newValue.substring(newValue.length-4);
            			field.setValue(newValue);
            		}
            		sapNameAllowed();
            	}
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
            		sapNameAllowed();
            	}
            }
    	}]
    }, {
    	xtype: 'textfield',
        width: 250,
        fieldLabel: 'Alias',
        id: 'wizardapplicationAlias',
        allowBlank: true,
        vtype: 'allowedAlias',
        validationDelay: 500,
        enableKeyEvents: true,
        labelSeparator: ' ',
        listeners: {
        	change: function (field, newValue, oldValue) {
        		if(undefined!==newValue && newValue!=='') {
        			objectAliasallowedStore.setBaseParam('query', newValue);
        			objectAliasallowedStore.load();
        		}
        	}
        }
    },{
    	xtype: 'textarea',
        width: 250,
        grow: true,
        growMin: 75,
        growMax: 75,
        fieldLabel: 'Description',
        id: 'wizardcomments',
        allowBlank: true,
        labelSeparator: ' '
    }, {
        xtype:'fieldset',
        id: 'wizardRelevance',
        title: 'Relevance',
        labelWidth: 200,
        
		items: [{
			xtype: 'container',
			layout: 'toolbar',
			items: [{
				xtype: 'checkbox',
				id: 'wizardrelevanceGR1435'
        	},{
				xtype: 'container',
				width: 90,
				id: 'labelwizardrelevanceGR1435',
				html: '1435',
				style: {
					textAlign: 'left',
					marginBottom: '-4px'						
				},
				cls: 'x-form-item'
    		},{
				xtype: 'checkbox',
				id: 'wizardrelevanceGR1775'
        	},{
				xtype: 'container',
				width: 90,
				id: 'labelwizardrelevanceGR1775',
				html: '1775',
				style: {
					textAlign: 'left',
					marginBottom: '-4px'						
				},
				cls: 'x-form-item'
    		},{
				xtype: 'checkbox',
				id: 'wizardrelevanceGR1920'
        	},{
				xtype: 'container',
				width: 90,
				id: 'labelwizardrelevanceGR1920',
				html: '1920',
				style: {
					textAlign: 'left',
					marginBottom: '-4px'						
				},
				cls: 'x-form-item'
    		},{
				xtype: 'checkbox',
				id: 'wizardrelevanceGR2008'
        	},{
				xtype: 'container',
				width: 90,
				id: 'labelwizardrelevanceGR2008',
				html: '2008',
				style: {
					textAlign: 'left',
					marginBottom: '-4px'						
				},
				cls: 'x-form-item'
    		},{
				xtype: 'container',
				width: 50,
				id: 'labelwizardrelevanceGxp',
				html: 'GXP',
				style: {
					textAlign: 'center',
					marginBottom: '-4px'						
				},
				cls: 'x-form-item'
    		}, {
				xtype: 'combo',
				id: 'wizardrelevanceGxp',
				store: gxpFlagListStore,
				width: 95,
		        valueField: 'id',
		        displayField: 'text',
		        typeAhead: true,
		        forceSelection: true,
		        autoSelect: true,
		        triggerAction: 'all',
		        lazyRender:true,
		        lazyInit:false,
		        mode: 'local'
        	}]
		}]
	}, {
    	xtype: 'checkbox',
        fieldLabel: 'Object is Template',
        id: 'wizardisTemplate',
        labelSeparator: ' ',
        allowBlank: true
    }]
});*/


/*
var wizardStepTwoPanel = new Ext.Panel({
	labelWidth: 120, // label settings here cascade unless overridden
    frame: true,
    // bodyStyle:'padding:5px 5px 0',
    layout: 'form',
    
    items: [{
    	xtype: 'container',
    	id: 'wizardStepTwoName',
    	html: 'Name (Type)'
    }, {
    	xtype: 'container',
    	html: '<hr>'
    }, {
        xtype:'fieldset',
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
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 230,
	        labelSeparator: '',
		    store: lifecycleStatusListStore
	    }, {
			xtype: 'combo',
			id: 'wizardoperationalStatus',
		    fieldLabel: 'Operational Status',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 230,
	        labelSeparator: ' ',
		    store: operationalStatusListStore
	    }, {
			xtype: 'combo',
			id: 'wizardapplicationBusinessCat',
		    fieldLabel: 'Category Business',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 230,
	        labelSeparator: '',
            store: categoryBusinessListStore
	    }]
    },{
        xtype:'fieldset',
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
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 230,
	        labelSeparator: '',
		    store: slaListStore,
	        listeners: {
                select: function(combo, record, index) {
                    selectedSlaId = record.data['id'];
                    Ext.getCmp('wizardserviceContract').store.load();
                    selectedServiceContractId = 0;
                    Ext.getCmp('wizardserviceContract').setValue('');
					Ext.getCmp('wizardserviceContract').enable();
					Ext.getCmp('wizardserviceContract').setHideTrigger(false);
					Ext.get('wizardserviceContract').dom.className='x-form-field x-form-text';
                },
                change: function (combo, newValue, oldValue) { 
            		if (newValue!==oldValue) {
            			Ext.getCmp('wizardserviceContract').setValue('');
            		}
            		if (newValue=='') {
            			Ext.getCmp('wizardserviceContract').store.removeAll();
            			Ext.getCmp('wizardserviceContract').disable();
						Ext.getCmp('wizardserviceContract').setHideTrigger(true);
						Ext.get('wizardserviceContract').dom.className='x-form-text';
            		}
            		if (0 == Ext.getCmp('wizardserviceContract').store.getCount()) {
                    	Ext.getCmp('wizardserviceContract').disable();
						Ext.getCmp('wizardserviceContract').setHideTrigger(true);
						Ext.get('wizardserviceContract').dom.className='x-form-text';
                    }
                },
                blur: function (field) {
                    if (1 == Ext.getCmp('wizardserviceContract').store.getCount()) {
						// Vorbelegung
						// TODO LAYOUT REFRESH
                    	selectedServiceContractId = Ext.getCmp('wizardserviceContract').store.data.items[0].data.id;
                    	Ext.getCmp('wizardserviceContract').setValue(Ext.getCmp('wizardserviceContract').store.data.items[0].data.id);
                    }
                }
	        }
	    }, {
			xtype: 'combo',
			id: 'wizardserviceContract',
		    fieldLabel: 'Service Contract',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        listEmptyText: 'No matching items found',
	        disabled: true,
	        fieldClass: 'x-item-disabled disabled',
	        hideTrigger: true,
	        width: 230,
	        labelSeparator: ' ',
		    store: serviceContractListStore
	    }, {
			xtype: 'combo',
			id: 'wizardseverityLevel',
		    fieldLabel: 'Severity Level',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        width: 230,
	        labelSeparator: '',
            store: severityLevelListStore
	    }, {
			xtype: 'combo',
			id: 'wizardbusinessEssential',
		    fieldLabel: 'Business Essential',
		    valueField: 'id',
	        displayField: 'text',
	        typeAhead: true,
	        forceSelection: true,
	        autoSelect: false,
	        triggerAction: 'all',
	        lazyRender:true,
	        lazyInit:false,
	        mode: 'local',
	        allowBlank: true,
	        autoSelect: true,
	        width: 230,
	        labelSeparator: ' ',
            store: businessEssentialListStore
	    }]
    }]
});*/


/*
var wizardStepThreePanel = new Ext.Panel({
	labelWidth: 100, // label settings here cascade unless overridden
    frame:true,
    // bodyStyle:'padding:5px 5px 0',
    layout: 'form',
    items: [{
    	xtype: 'container',
    	id: 'wizardStepThreeName',
    	html: 'Name (Type)'
    }, {
    	xtype: 'container',
    	html: '<hr>'
    },{
        xtype:'fieldset',
        id: 'wizardAppowner',
        title: 'Application Owner',
        labelWidth: 200,
		items: [{
			xtype: 'container',
			layout: 'toolbar',
			items: [{
				xtype: 'container',
				width: 200,
				id: 'labelwizardapplicationOwner',
				html: 'Primary Person',
				cls: 'x-form-item'
    		},{
				xtype: 'textfield',
		        width: 230,
		        id: 'wizardapplicationOwner',
		        allowBlank: true,
		        disabled: false,
		        readOnly: true
		    },{
				xtype: 'hidden',
		        id: 'wizardapplicationOwnerHidden'
		    },
		    {xtype: 'tbtext', html:'&nbsp;'},
		    {
		    	xtype: 'tbitem',
		    	html: '<img src='' + img_AddPerson + '' onclick='createPersonPickerTip(event, \'wizardapplicationOwner\');' >',
		    	id: 'wizardapplicationOwneraddimg',
		    	disabled: false,
		    	cls: 'aircontactbuttonenabled' 
		    }]
		},
		{xtype:'container', html:'&nbsp;', height: '8px'},
		{
			xtype: 'container',
			layout: 'toolbar',
			items: [{
				xtype: 'container',
				width: 200,
				id: 'labelwizardapplicationOwnerDelegate',
				html: 'Stewart/Delegate',
				cls: 'x-form-item'
    		},{
				xtype: 'textfield',
		        width: 230,
		        id: 'wizardapplicationOwnerDelegate',
		        allowBlank: true, 
		        disabled: false,
		        readOnly: true
		    },{
				xtype: 'hidden',
		        id: 'wizardapplicationOwnerDelegateHidden'
		    },
		    {xtype: 'tbtext', html:'&nbsp;'},
		    {
		    	xtype: 'tbitem',
		    	html: '<img src='' + img_AddPerson + '' onclick='createPersonPickerTip(event, \'wizardapplicationOwnerDelegate\');' >',
		    	id: 'wizardapplicationOwnerDelegateaddimg',
		    	disabled: false,
		    	cls: 'aircontactbuttonenabled' 
		    },
		    {xtype: 'tbtext', html:'&nbsp;'},
		    {
		    	xtype: 'tbitem',
		    	html: '<img src='' + img_AddGroup + '' onclick='createGroupPickerTip(event, \'wizardapplicationOwnerDelegate\', \'none\');' >',
		    	id: 'wizardapplicationOwnerDelegateaddgroupimg',
		    	disabled: false,
		    	cls: 'aircontactbuttonenabled' 
		    }]
		}]
	},{
        xtype:'fieldset',
        id: 'wizardCiowner',
        title: 'CI Owner',
        labelWidth: 200,
		items: [{
			xtype: 'container',
			layout: 'toolbar',
			
			items: [{
				xtype: 'container',
				width: 200,
				id: 'labelwizardciResponsible',
				html: 'Responsible',
				cls: 'x-form-item'
    		},{
				xtype: 'textfield',
		        width: 230,
		        id: 'wizardciResponsible',
		        allowBlank: false,
		        disabled: false,
		        readOnly: true
		    },{
				xtype: 'hidden',
		        id: 'wizardciResponsibleHidden'
		    },
		    {xtype: 'tbtext', html:'&nbsp;'},
		    {
		    	xtype: 'tbitem',
		    	html: '<img src='' + img_AddPerson + '' onclick='createPersonPickerTip(event, \'wizardciResponsible\');' >',
		    	id: 'wizardciResponsibleaddimg',
		    	disabled: false,
		    	cls: 'aircontactbuttonenabled' 
		    }]
		},
		{xtype:'container', html:'&nbsp;'},
		{
			xtype: 'container',
			layout: 'toolbar',
			items: [{
				xtype: 'container',
				width: 200,
				id: 'labelwizardciSubResponsible',
				html: 'SubResponsible',
				cls: 'x-form-item'
    		},{
				xtype: 'textfield',
		        width: 230,
		        id: 'wizardciSubResponsible',
		        allowBlank: true,
		        disabled: false,
		        readOnly: true
		    },{
				xtype: 'hidden',
		        id: 'wizardciSubResponsibleHidden'
		    },
		    {xtype: 'tbtext', html:'&nbsp;'},
		    {
		    	xtype: 'tbitem',
		    	html: '<img src='' + img_AddPerson + '' onclick='createPersonPickerTip(event, \'wizardciSubResponsible\');' >',
		    	id: 'wizardciSubResponsibleaddimg',
		    	disabled: false,
		    	cls: 'aircontactbuttonenabled' 
		    }, {
		    	xtype: 'tbitem',
		    	html: '<img src='' + img_AddGroup + '' onclick='createGroupPickerTip(event, \'wizardciSubResponsible\'. \'none\');' >',
		    	id: 'wizardciSubResponsibleaddgroupimg',
		    	disabled: false,
		    	cls: 'aircontactbuttonenabled' 
		    }]
		}]
	}]
});*/



//function wizardEmptyFields() {
//	// STEP 1
//	Ext.getCmp('wizardobjectType').setValue('');
//	Ext.getCmp('wizardapplicationCat2').setValue('');
//	Ext.getCmp('wizardapplicationCat2').disable();
//	Ext.getCmp('wizardapplicationCat2').setHideTrigger(true);
//	wizardSAPName = false;
//	Ext.getCmp('wizardapplicationName').show();
//	Ext.getCmp('wizardapplicationNameSAP').hide();
//	aclItemCmp = Ext.getCmp('wizardapplicationNameSAP1');
//	AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
//	aclItemCmp = Ext.getCmp('wizardapplicationNameSAP2');
//	AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
//	aclItemCmp = Ext.getCmp('wizardapplicationNameSAP3');
//	AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
//	Ext.getCmp('wizardapplicationName').setValue('');
//	Ext.getCmp('wizardapplicationNameSAP1').setValue('');
//	Ext.getCmp('wizardapplicationNameSAP2').setValue('');
//	Ext.getCmp('wizardapplicationNameSAP3').setValue('');
//	Ext.getCmp('wizardapplicationAlias').setValue('');
//	Ext.getCmp('wizardcomments').setValue('');
//	Ext.getCmp('wizardrelevanceGR1920').setValue(false);
//	Ext.getCmp('wizardrelevanceGR1435').setValue(true);
//	Ext.getCmp('wizardrelevanceGR1775').setValue(false);
//	Ext.getCmp('wizardrelevanceGR2008').setValue(false);
//	Ext.getCmp('wizardrelevanceGxp').setValue('');
//	Ext.getCmp('wizardisTemplate').setValue(false);
//
//	// STEP 2
//	Ext.getCmp('wizardlifecycleStatus').setValue('');
//	Ext.getCmp('wizardoperationalStatus').setValue('');
//	
//	Ext.getCmp('wizardsla').setValue('');
//	Ext.getCmp('wizardserviceContract').setValue('');
//	Ext.getCmp('wizardserviceContract').disable();
//	Ext.getCmp('wizardserviceContract').setHideTrigger(true);
//	Ext.getCmp('wizardseverityLevel').setValue('');
//	Ext.getCmp('wizardbusinessEssential').setValue('');
//	
//	// STEP 3
//	field = Ext.getCmp('wizardapplicationOwner').setValue('');
//	field = Ext.getCmp('wizardapplicationOwnerHidden').setValue('');
//	field = Ext.getCmp('wizardapplicationOwnerDelegate').setValue('');
//	field = Ext.getCmp('wizardapplicationOwnerDelegateHidden').setValue('');
//	field = Ext.getCmp('wizardciResponsible').setValue('');
//	field = Ext.getCmp('wizardciResponsibleHidden').setValue('');
//	field = Ext.getCmp('wizardciSubResponsible').setValue('');
//	field = Ext.getCmp('wizardciSubResponsibleHidden').setValue('');
//	
//	// STEP 1
//	Ext.getCmp('wizardobjectType').clearInvalid();
//	Ext.getCmp('wizardapplicationName').clearInvalid();
//	Ext.getCmp('wizardapplicationNameSAP1').clearInvalid();
//	Ext.getCmp('wizardapplicationNameSAP2').clearInvalid();
//	Ext.getCmp('wizardapplicationNameSAP3').clearInvalid();
//	Ext.getCmp('wizardapplicationAlias').clearInvalid();
//	Ext.getCmp('wizardcomments').clearInvalid();
//	Ext.getCmp('wizardrelevanceGR1920').clearInvalid();
//	Ext.getCmp('wizardrelevanceGR1435').clearInvalid();
//	Ext.getCmp('wizardrelevanceGxp').clearInvalid();
//	Ext.getCmp('wizardisTemplate').clearInvalid();
//
//	// STEP 2
//	Ext.getCmp('wizardlifecycleStatus').clearInvalid();
//	Ext.getCmp('wizardoperationalStatus').clearInvalid();
//	Ext.getCmp('wizardapplicationCat2').clearInvalid();
//	Ext.getCmp('wizardsla').clearInvalid();
//	Ext.getCmp('wizardserviceContract').clearInvalid();
//	Ext.getCmp('wizardseverityLevel').clearInvalid();
//	Ext.getCmp('wizardbusinessEssential').clearInvalid();
//	
//	// STEP 3
//	field = Ext.getCmp('wizardapplicationOwner').clearInvalid();
//	field = Ext.getCmp('wizardapplicationOwnerHidden').clearInvalid();
//	field = Ext.getCmp('wizardapplicationOwnerDelegate').clearInvalid();
//	field = Ext.getCmp('wizardapplicationOwnerDelegateHidden').clearInvalid();
//	field = Ext.getCmp('wizardciResponsible').clearInvalid();
//	field = Ext.getCmp('wizardciResponsibleHidden').clearInvalid();
//	field = Ext.getCmp('wizardciSubResponsible').clearInvalid();
//	field = Ext.getCmp('wizardciSubResponsibleHidden').clearInvalid();
//}



//function createApplication(but, ev) {
//	field = Ext.getCmp('wizardcbskip');
//	applicationCreateStore.setBaseParam('wizardSkipStepZero', field.getValue());
//	
//	// STEP 1
//	field = Ext.getCmp('wizardobjectType');
//	applicationCreateStore.setBaseParam('applicationCat1Id', field.getValue());
//	if (wizardSAPName) {
//		fieldvalue = Ext.getCmp('wizardapplicationNameSAP1').getValue() 
//					+ 'M' + Ext.getCmp('wizardapplicationNameSAP2').getValue() 
//					+ 'C' + Ext.getCmp('wizardapplicationNameSAP3').getValue();
//		applicationCreateStore.setBaseParam('applicationName', fieldvalue);
//	} else {
//		field = Ext.getCmp('wizardapplicationName');
//		applicationCreateStore.setBaseParam('applicationName', field.getValue());
//	}
//	field = Ext.getCmp('wizardapplicationAlias');
//	applicationCreateStore.setBaseParam('applicationAlias', field.getValue());
//	field = Ext.getCmp('wizardcomments');
//	applicationCreateStore.setBaseParam('comments', field.getValue());
//	field = Ext.getCmp('wizardrelevanceGR1920');
//	applicationCreateStore.setBaseParam('relevanceGR1920', field.getValue()?'Y':'N');
//	field = Ext.getCmp('wizardrelevanceGR1435');
//	applicationCreateStore.setBaseParam('relevanceGR1435', field.getValue()?'Y':'N');
//	field = Ext.getCmp('wizardrelevanceGR1775');
//	applicationCreateStore.setBaseParam('relevanceGR1775', field.getValue()?'Y':'N');
//	field = Ext.getCmp('wizardrelevanceGR2008');
//	applicationCreateStore.setBaseParam('relevanceGR2008', field.getValue()?'Y':'N');
//	field = Ext.getCmp('wizardrelevanceGxp');
//	applicationCreateStore.setBaseParam('gxpFlag', field.getValue()); 
//	field = Ext.getCmp('wizardisTemplate');
//	applicationCreateStore.setBaseParam('template', field.getValue()?'-1':'0');
//
//	// STEP 2
//	field = Ext.getCmp('wizardlifecycleStatus');
//	applicationCreateStore.setBaseParam('lifecycleStatusId', field.getValue());
//	field = Ext.getCmp('wizardoperationalStatus');
//	applicationCreateStore.setBaseParam('operationalStatusId', field.getValue());
//	field = Ext.getCmp('wizardapplicationCat2');
//	applicationCreateStore.setBaseParam('applicationCat2Id', field.getValue());
//	field = Ext.getCmp('wizardsla');
//	applicationCreateStore.setBaseParam('slaName', field.getValue());
//	field = Ext.getCmp('wizardserviceContract');
//	applicationCreateStore.setBaseParam('serviceContract', field.getValue());
//	field = Ext.getCmp('wizardseverityLevel');
//	applicationCreateStore.setBaseParam('severityLevel', field.getValue());
//	field = Ext.getCmp('wizardbusinessEssential');
//	applicationCreateStore.setBaseParam('businessEssentialId', field.getValue());
//	
//	// STEP 3
//	field = Ext.getCmp('wizardapplicationOwnerHidden');
//	applicationCreateStore.setBaseParam('applicationOwnerHidden', field.getValue());
//	field = Ext.getCmp('wizardapplicationOwnerDelegateHidden');
//	applicationCreateStore.setBaseParam('applicationOwnerDelegateHidden', field.getValue());
//	field = Ext.getCmp('wizardciResponsibleHidden');
//	applicationCreateStore.setBaseParam('responsibleHidden', field.getValue());
//	field = Ext.getCmp('wizardciSubResponsibleHidden');
//	applicationCreateStore.setBaseParam('subResponsibleHidden', field.getValue());
//	
//	// CWID
//	applicationCreateStore.setBaseParam('cwid', cwid);
//	applicationCreateStore.setBaseParam('token', token);
//	
//	
//	// Frage: was ist mit den Einstellungen in den user options?
//	// Z.B. wenn in der MyPlace Maske eine currency als Standardwert für alle neu angelegten CIs
//	// gesetzt ist, müssen diese bei der Speicherung auch übertragen werden.
//	applicationCreateStore.load(/*{
//		callback: afterApplicationCreate
//	}*/);
//};

/*function afterApplicationCreate(store, records, options) {
	mySaveMask.hide();
	if ('OK' === records[0].data.result) {
		// save ok
		// MessageBox
		msgTextTitle = languagestore.getAt(0).data['wizardSaveSuccessTitle'];
		msgText = languagestore.getAt(0).data['wizardSaveSuccess'];
		selectedCIId = records[0].data.applicationId;
		// Show a dialog using config options:
		Ext.Msg.show({
			title : msgTextTitle,
			msg : msgText,
			buttons : Ext.Msg.YESNO,
			fn : function(btn, text, opt) {
				showCiDetailDataChanged = false;
				if (btn === 'yes') {
					actionButtonHandler(false, true);
				} else if (btn === 'no') {
					actionButtonHandler(true, false);
					selectedCIId = -1;
				}
			},
			icon : 'ext-mb-wizard-saved'
		});
	}

	if ('ERROR' === records[0].data.result) {
		// error when creating
		msgTextTitle = languagestore.getAt(0).data['wizardSaveFailTitle'];
		msgText = languagestore.getAt(0).data['wizardFailSuccess'];
		Ext.Msg.show({
			title : msgTextTitle,
			msg : msgText + records[0].data.displayMessage,
			buttons : Ext.Msg.OK,
			fn : function(btn, text, opt) {
				Ext.emptyFn();
			},
			icon : Ext.MessageBox.OK
		});
	}
}*/

/*
function cancelApplicationCreate (but, ev) {
	var yesCallback = function() {
		showCiDetailDataChanged = false;
		actionButtonHandler(true, false);
	};

	var callbackMap = {
		'yes': yesCallback
	};
	
	var dynmicYesNoWindow = createDynamicMessageWindow('CANCEL_WIZARD', callbackMap);
	dynmicYesNoWindow.show();
};*/

/*
var createtabpanel = new Ext.Panel({
	id: 'createtabPanel',
	layout: 'card',
	activeItem: wizardCurrentStep,
    margins: '0 0 0 0',
	hidden: false,
	plain: true,
	border: false,
	height: 350,
	
	items: [{ 
		title: 'Wizard',
		id: 'wizardStepZeroPanelTitle',
		items: [wizardStepZeroPanel
//		{
//			xtype: 'AIR.CiCreationWizardPage0'
//		}
		]
	},{ 
		title: 'Wizard - Step 1: Essential',
//		id: 'wizardStepOnePanelTitle',
		items: [//wizardStepOnePanel
        {
        	id: 'wizardStepOnePanelTitle',
			xtype: 'AIR.CiCreationWizardPage1'
		}
        ]
     },{ 
    	title: 'Wizard - Step 2: Details',
    	id: 'wizardStepTwoPanelTitle',
        items:  [wizardStepTwoPanel] 
     },{ 
		title: 'Wizard - Step 3: Contacts',
		id: 'wizardStepThreePanelTitle',
		items: [wizardStepThreePanel] 
     }],
     
     buttonAlign: 'left',
     buttons: [{
    	 id: 'createstartbutton',
    	 text: 'Start',
    	 handler: function(button, event) {
			 if(Ext.getCmp('wizardcbskip').getValue()) { // Nur speichern, wenn Häkchen gesetzt wurde.
				 saveUserOptions(button, event);
			 }
	    	 wizardStart(true);
    	 }
	},{
		id: 'createbackbutton',
		text: 'Back',
		hidden: true,
		handler: function(button, event) {
			if (wizardCurrentStep == 2) {
				Ext.getCmp('createbackbutton').hide();
			}
			Ext.getCmp('createfinishbutton').hide();
	   		Ext.getCmp('createcancelbutton').show();
	   		Ext.getCmp('createnextbutton').show();
	   		wizardCurrentStep = wizardCurrentStep - 1;
	   		createtabpanel.layout.setActiveItem(wizardCurrentStep);
		}
	},{
		id: 'createcancelbutton',
		text: 'Cancel',
		hidden: true,
		handler: function(button, event) {
	   		cancelApplicationCreate(button, event);
		}
	},{
		id: 'createnextbutton',
		text: 'Next',
		hidden: true,
		handler: function(button, event) {
			window.setTimeout('nextStep()', 500);
		}
	},{
		id: 'createfinishbutton',
		text: 'Finish',
		hidden: true,
		handler: function(button, event) {
	   		createApplication(button, event);
		}
	}]
});*/

/*
var CiCreationCardPanel = new Ext.Panel({
	id: 'ciCreationCardPanel',
	layout: 'card',
	activeItem: 0,
//    margins: '5 5 5 5',
	hidden: false,
	plain: true,
	border: false,
	buttonAlign: 'left',
	
	autoScroll: true,
	
	items: [{
		id: 'CiCreateInfoView',
    	xtype: 'AIR.CiCreateInfoView'
	}, { 
		id: 'CiCreateWizardView',
		xtype: 'AIR.CiCreationWizardPagesTabView'
	}, { 
		id: 'CiCopyFromView',
		xtype: 'AIR.CiCopyFromView'
	}, {
		id: 'CiCopyFromDetailView',
		xtype: 'AIR.CiCopyFromDetailView'
	}]
});*/

/*
function getCicreateNewStartpagePanel() {
	var infoPanel = new Ext.Panel({
		labelWidth: 0, // label settings here cascade unless overridden
	    frame: false,
	    // bodyStyle:'padding:5px 5px 0',
	    layout: 'form',
	    border: false,
	    style: {
	    	fontSize: '12px'
	    },
	    
	    items: [{
	    	xtype: 'container',
	        id: 'cicreateIntroTextWizard',
	        html: 'Wizard<br/><br/>Use the wizard to create a new item<br/>'
	    },{
			xtype: 'button',
			id: 'cicreateIntoWizardButton',
			text: 'Wizard',
			handler: function(button, event) {
				startTheFunctionWizard();
		  	}
		},{
	    	xtype: 'container',
	        id: 'cicreateIntroTextBlank',
	        html: '<br/>'
	    },{
	    	xtype: 'container',
	        id: 'cicreateIntroTextCopyFrom',
	        html: 'Copy From<br/><br/>'
	        	+ 'Use this function to copy an existing item.<br/>'
	        	+ 'After the creation you can update the ci detail information.<br/>'
	    },{
			xtype: 'button',
			id: 'cicreateIntoCopyFromButton',
			text: 'Copy From',
			handler: function(button, event) {
    	 		startTheFunctionCopyFrom();
    	 	}
		}]
	});
	
	return infoPanel;
}*/

/*
var createpanel = new Ext.Panel({
	id: 'createPanel',
	border: false,
	padding: 20,
	
//	layout: 'card',

	
    items: [{ 
		xtype: 'container',	  
		html: 'Create new Application',
		id: 'createpanelheader',
        height: 24,
		width: 800,
		cls: 'x-plain',
		style: {
			textAlign: 'left',
			backgroundColor: panelbgcolor,
			color: fontColor,
			fontFamily: fontType,
			fontWeight: 'bold',
			fontSize: '12pt'
		}
	}, { 
		xtype: 'container',	  
		html: '',
		id: 'createpanelsubheader',
        height: 24,
		cls: 'x-plain',
		style: {
		  	  textAlign: 'left',
		  	  backgroundColor: panelbgcolor,
		  	  color: fontColor,
		      fontFamily: fontType,
		  	  fontWeight: 'bold',
		  	  fontSize: '8pt'
		  }
	}, { 
		xtype: 'container',	  
		html: '<hr>',
		id: 'createpanelhr',
		cls: 'x-plain',
		style: {
			color: '#d0d0d0',
			backgroundColor: '#d0d0d0',
			height: '1px'
		}
	}, { 
		xtype: 'container',	  
		html: '&nbsp;',
		id: 'createpanelspace',
		cls: 'x-plain',
		style: {
			height: '16px'
		}
	}, {
		id: 'CiCreationCardPanel',
		xytpe: 'AIR.CiCreationCardPanel'
	}
//		CiCreationCardPanel
        //createtabpanel OLD
    ]
});*/


//var wizardaclstore = new Ext.data.XmlStore({
//    // store configs
//    autoLoad: false,
//    storeId: 'wizardAclStore',
//    url: 'config/AttributeProperties.xml', // automatically configures a HttpProxy
//    // reader configs
//    record: 'Identifier', // records will have an 'Identifier' tag
//    fields: [
//        // set up the fields mapping into the xml doc
//        {name: 'id'},
//        {name: 'Mandatory'},
//        {name: 'UseInWizard'},
//        {name: 'attributeType'},
//		{name: 'attributeLength'},
//		{name: 'attributeMask'}
//    ],
//    listeners: {
//    	beforeload : function(store, options) {
//    		myLoadMask.show();
//    	},
//		load :  function(store, records, options) {
//			Ext.each(records, function(item, index, allItems) {
//    			if (item.data.UseInWizard==='Y') {
//					aclItemCmp = Ext.getCmp('wizard' + item.data.id);
//	    			if (aclItemCmp!==undefined) {
//	    				switch(aclItemCmp.getXType()) {
//	    					case 'textfield':
//	    					case 'textarea':
//	    					case 'combo':
//	    					case 'checkbox':
//	    					case 'listview':	
//	    					case 'grid':	
//	    						AIR.AirAclManager.setMandatory(aclItemCmp, item.data.Mandatory);
//	    						AIR.AirAclManager.setAttributeProperty(
//									aclItemCmp,
//									item.data.attributeType,
//									item.data.attributeLength,
//									item.data.attributeMask
//								);
//
//	    						break;
//	    					default: break;
//	    				}
//	    			}
//    			}
//	        });
//			
//			// Special for business Essential
//			if (!hasRoleBusinessEssentialEditor) {
//				aclItemCmp = Ext.getCmp('wizardbusinessEssential');
//				AIR.AirAclManager.setMandatory(aclItemCmp, 'optional');
//				aclItemCmp.disable();
//				aclItemCmp.setHideTrigger(true);
//			};
//			myLoadMask.hide();
//		}
//    }
//});


/**
 * 	loads the cat2 store and activates the field
 */
function loadStoreAndActivateCat2() {
	selectedCiCat1Id = wizardApplicationKat1Id;
//	Ext.getCmp('wizardapplicationCat2').store.load();
	//selectedServiceContractId = 0;
	Ext.getCmp('wizardapplicationCat2').setValue('');
	Ext.getCmp('wizardapplicationCat2').enable();
	Ext.getCmp('wizardapplicationCat2').setHideTrigger(false);
//	Ext.get('wizardapplicationCat2').dom.className='x-form-field x-form-text';
	var cbWizardapplicationCat2 = Ext.getCmp('wizardapplicationCat2');
	var el = cbWizardapplicationCat2.getEl();//null/undefined da noch nicht gerendert
	el.dom.className='x-form-field x-form-text';
	
}



//function wizardStart(startbuttonpressed, previousView) {
//	wizardEmptyFields();
//	if (isSkipCreateWizardMessage || startbuttonpressed) {
////		wizardaclstore.data = AIR.AirStoreManager.getStoreByName('aclStore').data;
//		
//		wizardaclstore.load();
////		slaListStore.load();
////		priorityLevelListStore.load();
////		severityLevelListStore.load();
////		businessEssentialListStore.load();
////		gxpFlagListStore.load();
//		
//   		Ext.getCmp('createstartbutton').hide();
//   		Ext.getCmp('createcancelbutton').show();
//   		Ext.getCmp('createnextbutton').show();
//   		Ext.getCmp('createbackbutton').hide();
//   		Ext.getCmp('createfinishbutton').hide();
//   		
//   		
//   		wizardCurrentStep = 1;
//   		if(previousView) {
//	   		switch(previousView) {
//	   			case 'CiCopyFromDetailView':
//	   				var ciCreationCardPanel = Ext.getCmp('ciCreationCardPanel');
//	   				ciCreationCardPanel.getLayout().setActiveItem('CiCreateInfoView');//CiCreateWizardView
//	   				
////	   				wizardCurrentStep = 0;
//	   				break;
//	   			default: break;
//	   		}
//   		} else {
////   			wizardCurrentStep = 1;//Orig: eingkommentiert!! OLD!
//   			
////   			createtabpanel.layout.setActiveItem(wizardCurrentStep);
////   			var createtabPanel = Ext.getCmp('createtabPanel');
//   			var createtabPanel = Ext.getCmp('CiCreateWizardView');
//   			createtabPanel.layout.setActiveItem(wizardCurrentStep);
//   		}
//	} else {
//		Ext.getCmp('createstartbutton').show();
//   		Ext.getCmp('createcancelbutton').show();
//   		Ext.getCmp('createnextbutton').hide();
//   		Ext.getCmp('createbackbutton').hide();
//   		Ext.getCmp('createfinishbutton').hide();
//   		wizardCurrentStep = 0;
//   		
////   		createtabpanel.layout.setActiveItem(wizardCurrentStep);
////		var createtabPanel = Ext.getCmp('createtabPanel');
//   		var createtabPanel = Ext.getCmp('CiCreateWizardView');
//		createtabPanel.layout.setActiveItem(wizardCurrentStep);
//	}
//	
//	if (hasRoleApplicationLayer) {
//		// only applications !!!
//		Ext.getCmp('wizardobjectType').setValue(applicationObjectTypeId);
//		Ext.getCmp('wizardobjectType').setReadOnly(true);
//		
//		// reload the labels
//		setCommonTextLabelDetails();
//		
//		// the cat2 must be editable, so activate it
//		wizardApplicationKat1Id = applicationObjectTypeId;
//		loadStoreAndActivateCat2();
//	} else {
//		Ext.getCmp('wizardobjectType').setReadOnly(false);
//		Ext.getCmp('wizardobjectType').enable();
//	}
//}
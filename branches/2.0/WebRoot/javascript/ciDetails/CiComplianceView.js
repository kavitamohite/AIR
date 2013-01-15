Ext.namespace('AIR');

AIR.CiComplianceView = Ext.extend(AIR.AirView, {//Ext.Panel
	isInitialized: false,
	
	initComponent: function() {
//		var referencesListStore = AIR.AirStoreFactory.createReferencesListStore();
//		referencesListStore.load();
		
		/*Ext.apply(Ext.form.VTypes, {
			ciTemplateValid: this.validateCiTemplate.createDelegate(this),
			ciTemplateValidText: AIR.AirApplicationManager.getLabels().referencedTemplateInvalid
		});*/
		
		Ext.apply(this, {
		    title: 'Compliance',//language Datei/updateLabels benutzen
		    
		    border: false,
		    padding: 10,
		    height: 500,//430
		    
		    layout: 'form',//form vbox anchor
		    
		    items: [{
		        xtype: 'fieldset',
		        id: 'fsComplianceMgmt',
		        title: 'Compliance Management',
		        anchor: '100%',
		        layout: 'form',
		        
		        items: [{
		            xtype: 'radiogroup',
        			id: 'rgRelevanceBYTSEC',
        			width: 250,
        			hideLabel: true,
        			
        			columns: 3,

		            items: [
		                {id: 'rgitBYTSEC',		itemId: 'rgitBYTSEC', 		boxLabel: 'Integrated',	name: 'rgRelevanceBYTSEC', inputValue: AC.CI_GROUP_ID_DEFAULT_ITSEC, width: 80 },//, width: 100 wenn gedatscht
		                {id: 'rgitNonBYTSEC',	itemId: 'rgitNonBYTSEC',	boxLabel: 'External',	name: 'rgRelevanceBYTSEC', inputValue: AC.CI_GROUP_ID_NON_BYTSEC, width: 80 },
		                {id: 'rgitUndefined',	itemId: 'rgitUndefined', 	boxLabel: 'Undefined',	name: 'rgRelevanceBYTSEC', inputValue: AC.CI_GROUP_ID_DELETE_ID, width: 80 }//, checked: true
		            ]
		        },{
					id: 'complianceManagementText',		        	
		    		html: 'Choosing "Integrated" AIR covers all issues of compliance management,<br> whereas "External" manages only the references to an compliance management outside of AIR.',
		    		border: false,
					style: {
				    	fontSize: 12,
				    	marginTop: 10
					}
		    	}]
		    }, {
		    	xtype: 'fieldset',
		    	id: 'fsComplianceInfo',
		    	layout: 'form',
		    	anchor: '100%',
		    	hidden: true,
		    	
		    	items: [{
		    		xtype: 'button',
		    		id: 'bEditNonBytSec',
		    		text: 'Edit',
		    		width: 50,
//		    		disabled: true,
		    		
					style: {
						marginTop: 10,
				    	marginBottom: 10
					}
		    	},{
		    		xtype: 'label',
		    		id: 'lComplianceInfo',
		    		text: 'Compliance Statements may be given per control.',
		    		
					style: {
				    	fontSize: 12
//				    	marginBottom: 10,
//			    		marginTop: 20
					}
		    	}]
		    },{
		        xtype: 'fieldset',
		        id: 'fsComplianceDetails',
		        layout: 'form',//form hbox
		        
		        title: 'Compliance Details',
		        anchor: '100%',//50%
		        hidden: true,
		        
				items: [{
					xtype: 'panel',
					id: 'pItSet',
					layout: 'hbox',
					border: false,
					margins: '5 5 0 0',
					anchor: '100%',
					
					items: [{
			    		xtype: 'label',
			    		id: 'lItSet',
			    		text: 'IT Set',
			    		flex: 1,//2
//			    		width: 200,
			    		
						style: {
					    	fontSize: '12px'
						}
			    	},{
				    	xtype: 'textfield',
				        id: 'tfItsetName',
				        
				        flex: 8,
				        				        
				        allowBlank: true,
				        disabled: true	// keine �nderung zulassen - nur ANZEIGE
			    	}/*, {
						xtype: 'spacer',
						id: 'spItsetName',
						flex: 2,
						margins: '5 0 0 5',
						
						hidden: true
					}*/]
				},{
					xtype: 'panel',
					id: 'pAsTemplate',
					layout: 'hbox',//hbox form auto
					border: false,
					margins: '5 5 0 0',
//					anchor: '100%',
					
					items: [{
			    		xtype: 'label',
			    		id: 'lAsTemplate',
			    		text: 'As template',
			    		flex: 1,//2
//			    		width: 200,
			    		
						style: {
					    	fontSize: '12px'
						},
						margins: '8 0 10 0'
			    	},{
				    	xtype: 'checkbox',
				        id: 'cbIsTemplate',

//					        fieldLabel: 'As Template',//languagestore.getAt(0).data['compliance1435WindowUseAsTemplate'],//'Use as template',
//					        labelWidth: 200,
	//			        anchor: '100%',
				    	
				    	flex: 4,
				    	margins: '5 0 10 0'
				    	
//				        boxLabel: 'As Template',
				        
	//			        checked: this.viewData.isTemplate,
//				        disabled: true,	// keine �nderung zulassen - nur ANZEIGE
//				        allowBlank: true
			    	},/*
			        {
			        	xtype: 'checkboxgroup',
			        	id: 'cbgIsTemplate',
			        	columns: 1,
//	        			width: 200,
	        			
	        			items: [
	    			        { boxLabel: 'As Template', name: 'cbgIsTemplate' }
				        ]
			        }*/
			    	{
						xtype: 'spacer',
						id: 'spIsTemplate',
						flex: 4,
						margins: '5 0 10 0'
						
//						hidden: true
					}
			    	]
				},{
					xtype: 'panel',
					id: 'pReferencedTemplate',
					
					layout: 'hbox',//hbox column table
//				    layoutConfig: {
//				        columns: 2,
//				        tableAttrs: {
//				            style: {
//				                width: '100%'
//				            }
//				        }
//				    },
					
					border: false,
					
					margins: '0 5 0 0',
//					anchor: '100%',
//					height: 25,//sonst im FF H�he 45 (?)
					
					items: [{
			    		xtype: 'label',
			    		id: 'lReferencedTemplate',
			    		text: 'Link',
			    		
//			    		region: 'west',
			    		
//			    		flex: 2,//hbox
			    		width: 130,//170 layout: 'column' || 200
			    		
						style: {
					    	fontSize: 12
						}
			    	},{
						xtype: 'filterCombo',//combo
				        id: 'cbReferencedTemplate',
						
						enableKeyEvents: true,
				        
//				        flex: 8,//hbox
				        width: 350,//layout: 'column'
//				        columnWidth: 0.75,

				        fieldLabel: 'Link',//labels.compliance1435WindowLink,//languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
//				        labelWidth: 200,
//				        anchor: '100%',//50%

						//vtype: 'ciTemplateValid',
						//msgTarget: 'under',//side
						
				        
						lastQuery: '',
				        store: AIR.AirStoreManager.getStoreByName('referencesListStore'),//referencesListStore,//AIR.AirStoreFactory.createReferencesListStore(),//this.referencesListStore,
				        valueField: 'id',
				        displayField: 'name',
	//			        value: this.viewData.link,
				        
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local'
				        
//				        editable: false
//				        disabled: true
					}/*, {
						xtype: 'label',//spacer
						id: 'lReferencedTemplateError',//spReferencedTemplate
						
						//width: '',
						//columnWidth: 0.125,
//						flex: 2,
//						margins: '5 0 0 5',

						tpl: '<img src="images/warning_type2_16x16.png"/> {value}',

						style: {
							fontSize: 12,
							marginTop: 3,
							marginLeft: 5
						},
						
						hidden: true
					}*/]
		    	},{
					xtype: 'panel',
					id: 'pItSecGroup',
					
					layout: 'hbox',//hbox column
//				    layoutConfig: {
//				        columns: 3,
//				        tableAttrs: {
//				            style: {
//				                width: '100%'
//				            }
//				        }
//				    },
					
					border: false,
					
					style: {
						marginTop: 5
					},
					
//					margins: '5 5 0 0',
//					anchor: '100%',
					
					items: [{
			    		xtype: 'label',
			    		id: 'lItSecGroup',
			    		text: 'ITSecGroup',
			    		
//			    		region: 'west',
			    		
//			    		flex: 2,//hbox
			    		width: 130,//170 layout: 'column' || 200
//			    		columnWidth: 0.125,
			    		
						style: {
					    	fontSize: 12
						}
//						margins: '5 0 0 0'
			    	},{
						xtype: 'filterCombo',//combo
				        id: 'cbItSecGroup',
				        
//				        region: 'center',
				        
//				        flex: 8,//hbox
				        width: 350,//layout: 'column'
//				        columnWidth: 0.75,

				        fieldLabel: 'ItSecGroup',//labels.compliance1435WindowItSecGroup,//languagestore.getAt(0).data['compliance1435WindowItSecGroup'],//'ITSec Group',
//				        labelWidth: 200,
//				        anchor: '100%',//50%
				        
						lastQuery: '',
				        store: AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),//AIR.AirStoreFactory.createItSecGroupListStore(),//this.itSecGroupListStore,//
				        valueField: 'id',//itSecGroupId
				        displayField: 'name',//itSecGroupName
	//			        value: this.viewData.itSecGroupText,
						lastQuery: '',
				        
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local'
				        
//				        editable: false,
//				        disabled: true
//				        margins: '5 0 0 0'
			    	}, {
						xtype: 'button',
						id: 'bEditItSecGroup',
						
						//text: 'Edit',
//						region: 'east',
						
						width: 50,
//						columnWidth: 0.125,
						
						style: {
							marginLeft: 5
						}
							
//						flex: 2,
//						hidden: true
//						margins: '5 0 0 5'
					}]
				}]
		    },{
		        xtype: 'fieldset',
		        id: 'fsRelevantRegulations',
		        title: 'Relevant Regulations',
		        
		        layout: 'form',
		        anchor: '100%',//50%
		        
		        items: [{
		        	xtype: 'checkboxgroup',
		        	id: 'cbgRegulations',
		        	columns: 2,
        			width: 200,
        			hideLabel: true,
        			
        			items: [
//    			        { boxLabel: 'GR1435', name: 'cbgRegulations', width: 100 },
//    			        { boxLabel: 'GR1775', name: 'cbgRegulations', width: 100 },
//    			        { boxLabel: 'GR2008', name: 'cbgRegulations', width: 100 },
//    			        { boxLabel: 'GR1920', name: 'cbgRegulations', width: 100 }
						{ boxLabel: 'GR1435', name: 'cbgRegulations', width: 100 },
    			        { boxLabel: 'GR1920', name: 'cbgRegulations', width: 100 },
    			        { boxLabel: 'GR1775', name: 'cbgRegulations', width: 100 },
    			        { boxLabel: 'GR2008', name: 'cbgRegulations', width: 100 }
			        ]
		        }, {
		        	xtype: 'panel',
		        	id: 'pGxp',
		        	border: false,
		        	
		        	layout: 'hbox',//column
//		        	anchor: '20%',//50%
		        	
		        	items: [{
			    		xtype: 'label',
			    		id: 'lGXP',
			    		text: 'GXP',
			    		
//			    		flex: 1,
						style: {
					    	fontSize: 12
						},
						
						margins: '4 0 0 0'
			    	},{
						xtype: 'combo',
						id: 'CBrelevanceGxp',
						store: AIR.AirStoreManager.getStoreByName('gxpFlagListStore'),//AIR.AirStoreFactory.createGxpFlagListStore(),//gxpFlagListStore,
						
						width: 80,
//						columns: 2,
						
//						flex: 3,//2 3
						margins: '0 0 0 10',
						
//						fieldLabel: 'Category',
				        valueField: 'id',
				        displayField: 'text',
				        
				        typeAhead: true,
				        forceSelection: true,
				        autoSelect: false,
				        
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local',
				        	
				        editable: false
		        	}]
		        }]
		    }]
		});
		
		AIR.CiComplianceView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange', 'complianceTypeChange', 'itsecGroupEdit');
		
		var rgRelevanceBYTSEC = this.getComponent('fsComplianceMgmt').getComponent('rgRelevanceBYTSEC');
		var bEditNonBytSec = this.getComponent('fsComplianceInfo').getComponent('bEditNonBytSec');
		
		var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');
		
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');

		var cbgRegulations = this.getComponent('fsRelevantRegulations').getComponent('cbgRegulations');
		var cbRelevanceGxp = this.getComponent('fsRelevantRegulations').getComponent('pGxp').getComponent('CBrelevanceGxp');

		rgRelevanceBYTSEC.on('change', this.onRadioGroupRelevanceBYTSEC, this);
		bEditNonBytSec.on('click', this.onEditNonBytSec, this);

		cbIsTemplate.on('check', this.onIsTemplateCheck, this);
		
		cbReferencedTemplate.on('beforeselect', this.onReferencedTemplateBeforeSelect, this);
		cbReferencedTemplate.on('select', this.onReferencedTemplateSelect, this);
		cbReferencedTemplate.on('change', this.onReferencedTemplateChange, this);
		cbReferencedTemplate.on('keyup', this.onReferencedTemplateKeyUp, this);
		
		cbItSecGroup.on('select', this.onItSecGroupSelect, this);
		cbItSecGroup.on('change', this.onItSecGroupChange, this);
		bEditItSecGroup.on('click', this.onEditItSecGroup, this);

		cbgRegulations.on('change', this.onRegulationsChange, this);
		cbRelevanceGxp.on('select', this.onRelevanceGxpSelect, this);
	},
	
	//============================================================================================================================
	
	onRadioGroupRelevanceBYTSEC: function(rgb, checkedRadio) {
//		if(this.fireEvent('ciBeforeChange', this, rgb, checkedRadio) !== false)
//			return;
		
		this.complianceType = checkedRadio.inputValue;
//		this.isChanged = true;
		
		switch(this.complianceType) {
			case AC.CI_GROUP_ID_DEFAULT_ITSEC:
				this.getComponent('fsComplianceInfo').setVisible(false);
				this.getComponent('fsComplianceDetails').setVisible(true);
				rgb.disable();
				
				this.updateComplianceDetails(AIR.AirApplicationManager.getAppDetail());
				
				this.fireEvent('ciChange', this, rgb, checkedRadio);
				break;
			case AC.CI_GROUP_ID_NON_BYTSEC:
//				this.getComponent('fsComplianceDetails').setVisible(false);
//				this.getComponent('fsComplianceInfo').setVisible(true);
				
				//wenn original DB update Wert Undefined (0,-1) stand (siehe update function), k�nnen die Massnahmen zu diesem CI noch 
				//nicht angelegt worden sein,
				//da diese entweder noch nie vorhanden waren, oder zwischenzeitlich wieder gel�scht wurden, nachdem der compliance Status
				//zwischenzeitlich wieder auf Undefined (0,-1) stand. Diese Methode wird aufgerufen, wenn der user auf diese rbg klickt und
				//wenn rbg.setValue() programmatisch aufgerufen wird.
				if(this.previousComplianceType != this.complianceType) {
					this.fireEvent('complianceTypeChange', this, rgb, this.previousComplianceType, this.complianceType);
					
//					this.isChanged = false;
					//use additional internal class variable to stop ciChange event from bering fired? Do so, if the save/cancel buttons are not
					//supposed to appear in a complianceTypeChange triggered saveApplication by CiEditTabView (*1)
					//Alternative: just disable the save/cancel buttons again within CiEditTabView.onComplianceTypeChange after they are appear
					//always after each arbitrary user edit action
				} else {
					this.getComponent('fsComplianceDetails').setVisible(false);
					this.getComponent('fsComplianceInfo').setVisible(true);
				}
				
				break;
			case AC.CI_GROUP_ID_EMPTY:
			case AC.CI_GROUP_ID_DELETE_ID:
				this.getComponent('fsComplianceInfo').setVisible(false);
				this.getComponent('fsComplianceDetails').setVisible(false);
				
				this.fireEvent('ciChange', this, rgb, checkedRadio);
				break;
			default: break;
		}
		
		this.previousComplianceType = this.complianceType;
		this.doLayout();
	},
	
	
	updateComplianceDetails: function(data) {
		var tfItsetName = this.getComponent('fsComplianceDetails').getComponent('pItSet').getComponent('tfItsetName');
		tfItsetName.setValue(data.itsetName);
		
		var isTemplate = data.template === '1';
		var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');
		cbIsTemplate.setValue(isTemplate);
		if(data.barRelevance === 'Y')
			cbIsTemplate.disable();//BAR relevante CIs d�rfen keine templates sein
		
		
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');

		this.filterCombo(cbReferencedTemplate);
		this.filterCombo(cbItSecGroup);
		
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		var text = AIR.AirApplicationManager.getLabels().relevanceViewButton;
		
		if(isTemplate) {
			cbReferencedTemplate.setValue('');//reset();
			Util.disableCombo(cbReferencedTemplate);
			
			if(AIR.AirAclManager.isRelevance(cbItSecGroup, data))
				Util.enableCombo(cbItSecGroup);
			
			if(AIR.AirAclManager.isRelevance(bEditItSecGroup, data))
				text = AIR.AirApplicationManager.getLabels().relevanceEditButton;
		} else {
			var hasTemplate = data.refId !== '0';
			if(hasTemplate) {
				Util.disableCombo(cbItSecGroup);
				
				//nicht getStore().getById() damit gegen die gefilterten Daten gepr�ft wird
				var isTemplateValid = cbReferencedTemplate.getStore().data.key(data.refId);
				if(isTemplateValid) {
					cbReferencedTemplate.setValue(data.refId);
					//lReferencedTemplateError.hide();
					//cbReferencedTemplate.isInvalid = false;
				} else {
					//cbReferencedTemplate.setRawValue(data.refTxt);
					cbReferencedTemplate.setRawValue(AC.LABEL_INVALID+data.refTxt);
					//lReferencedTemplateError.show();
					//cbReferencedTemplate.isInvalid = true;
	
					//var message = AIR.AirApplicationManager.getLabels().referencedTemplateInvalid;
					//lReferencedTemplateError.setText(message);
				}
			} else {
				//cbReferencedTemplate.clearValue();//setValue('');//
				//AIR.AirAclManager.setRelevance(cbItSecGroup, data);//setEditable(cbItSecGroup);
				
				if(AIR.AirAclManager.isRelevance(cbItSecGroup, data))
					Util.enableCombo(cbItSecGroup);
					
				if(AIR.AirAclManager.isRelevance(bEditItSecGroup, data))
					text = AIR.AirApplicationManager.getLabels().relevanceEditButton;
	//			
				//cbReferencedTemplate.isInvalid = false;
			}
		}
		bEditItSecGroup.setText(text);
		
		
		//is itsecGroupId a real BYTsec ItSecGroup?
		if(data.itsecGroupId !== AC.CI_GROUP_ID_DEFAULT_ITSEC && data.itsecGroupId != 0 && data.itsecGroupId != -1) {//evtl. mit cbItSecGroup.setRawValue('Default_ItSecGroup'); setzen falls der Name dieser Default itsecGruppe angezeigt werden soll
			//cbItSecGroup.setValue(data.itsecGroupId);
			
			//weil store ein mapping bei id/itsecGroupId hat geht cbItSecGroup.getStore().getById() nicht. Andersrum, das mapping client+serverseitig rausnehmen hat nicht geklappt.
			var isItsecGroupValid = cbItSecGroup.getStore().findExact('id', data.itsecGroupId) > -1;//cbItSecGroup.getStore().getAt(cbItSecGroup.getStore().findExact('id', data.itsecGroupId));//cbItSecGroup.getStore().getById(data.itsecGroupId);//.data.key(data.itsecGroupId)
			if(isItsecGroupValid || cbReferencedTemplate.getValue().length > 0) {//wenn template gesetzt und dessen itsecgruppe sonst invalid w�re
				cbItSecGroup.setValue(data.itsecGroupId);
				//lReferencedTemplateError.hide();
				//cbReferencedTemplate.isInvalid = false;
			} else {
				//cbReferencedTemplate.setRawValue(data.refTxt);
				cbItSecGroup.setRawValue(AC.LABEL_INVALID+data.itsecGroupTxt);
			}
		} else
			cbItSecGroup.setValue('');//clearValue();
	},
	
	onEditNonBytSec: function(button, event) {
		this.loadItsecMassnahmenStore();
	},
	
	onIsTemplateCheck: function(checkbox, isChecked) {
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		
//		var text = AIR.AirApplicationManager.getLabels().relevanceViewButton;
//		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');

		if(isChecked) {
			var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
			if(AIR.AirAclManager.isRelevance(bEditItSecGroup, AAM.getAppDetail())) {
				var text = AIR.AirApplicationManager.getLabels().relevanceEditButton;
				bEditItSecGroup.setText(text);
			}
			
			//Template darf nicht auf ein weiteres template verweisen
			cbReferencedTemplate.setValue('');//reset();
			Util.disableCombo(cbReferencedTemplate);
			Util.enableCombo(cbItSecGroup);
		} else {
			Util.enableCombo(cbReferencedTemplate);
			Util.enableCombo(cbItSecGroup);
		}
		
		this.fireEvent('ciChange', this, checkbox, isChecked);
	},
	
	onEditItSecGroup: function(button, event) {
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');

		var newTemplate = cbReferencedTemplate.getValue();
		var template = AIR.AirApplicationManager.getAppDetail().refId;
		
		var newItSecGroup = cbItSecGroup.getValue();
		var itSecGroup = AIR.AirApplicationManager.getAppDetail().itsecGroupId;

		
		/**
		* ohne vorheriges Speichern das ComplianceControlsWindow laden, wenn
		* - cbReferencedTemplate ODER cbItSecGroup ein INVALID: haben
		* - cbReferencedTemplate UND cbItSecGroup leer sind
		* - die itSecGroup NICHT ge�ndert wurde
		*/
		var isNewTemplate = newTemplate !== template && (newTemplate.length > 0 || template != '0') && cbReferencedTemplate.el.dom.value.indexOf(AC.LABEL_INVALID) === -1;
		var isNewItSecGroup = newItSecGroup !== itSecGroup && (newItSecGroup.length > 0 || itSecGroup !== AC.CI_GROUP_ID_DEFAULT_ITSEC) && cbItSecGroup.el.dom.value.indexOf(AC.LABEL_INVALID) === -1;
		
		
		if(isNewTemplate || isNewItSecGroup) {//isOld  || isNewTemplate
			this.fireEvent('itsecGroupEdit', this, this.loadItsecMassnahmenStore.createDelegate(this), newItSecGroup);//, options callback
		} else {
			this.loadItsecMassnahmenStore();
		}
	},
	
	loadItsecMassnahmenStore: function(params) {
		var massnahmenStore = AIR.AirStoreFactory.createItsecMassnahmenStore(AAM.getLanguage());//this.getStatusWertDisplayField()
		massnahmenStore.on('load', this.onItsecMassnahmenStoreLoaded, this);
		
		var params = {
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
			ciId: AIR.AirApplicationManager.getCiId(),//selectedCIId,
			language: AAM.getLanguage(),//'en',//selectedLanguage
			tableId: 2//2=CI Typ Application (?)
		};
		
		massnahmenStore.load({
			params: params
		});
	},
	
	onItsecMassnahmenStoreLoaded: function(massnahmenStore, records, options) {
		var massnahmeDetailStore = AIR.AirStoreFactory.createItsecMassnahmeDetailStore();
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		
		var hasTemplate = 	cbReferencedTemplate.getValue().length > 0 ||
						  	cbReferencedTemplate.el.dom.value.indexOf(AC.LABEL_INVALID) > -1 ||
						  	cbItSecGroup.el.dom.value.indexOf(AC.LABEL_INVALID) > -1;
						  	
	  	var hasEditRights = AIR.AirAclManager.isRelevance(bEditItSecGroup, AAM.getAppDetail());
	  	
		
		var config = {
			complianceType: this.complianceType,
			language: AAM.getLanguage(),//selectedLanguage,
			itSet: AAM.getAppDetail().itset,//this.getComponent('fsComplianceDetails').getComponent('pItSet').getComponent('tfItsetName').getValue()
//			itSetId: AAM.getAppDetail().itsetId,
			ciId: AAM.getAppDetail().applicationId,
			applicationCat1Id: AAM.getAppDetail().applicationCat1Id,
			hasEditRights: !hasTemplate && hasEditRights
		};
		
		var complianceControlsWindow = new AIR.ComplianceControlsWindow(massnahmenStore, massnahmeDetailStore, config);//this.getStatusWertDisplayField()	, massnahmeDetailStore	selectedLanguage in commonvars.js
		complianceControlsWindow.on('massnahmeSaved', this.onMassnahmeSaved, this);
		complianceControlsWindow.show();
//		complianceControlsWindow.updateLabels(AIR.AirApplicationManager.getLabels());
	},
	
	/*onEditItSecGroup: function(button, event) {
		this.loadItsecMassnahmenStore();
	},*/

	
	onRegulationsChange: function(checkboxGroup, checkedBoxes) {
		this.fireEvent('ciChange', this, checkboxGroup, checkedBoxes);
	},
	
	onRelevanceGxpSelect: function(combo, record, index) {
		this.fireEvent('ciChange', this, combo, record);
	},
	
	onReferencedTemplateBeforeSelect: function(combo, record, index) {
		//wenn app template verhindern, dass app template ci auf sich selbst referenziert
		var isTemplateValid = record.data.id != AIR.AirApplicationManager.getAppDetail().applicationId;
		
		if(!isTemplateValid) {
			var data = {
				airErrorId: AC.AIR_ERROR_INVALID_TEMPLATE,
				applicationCat1: AIR.AirApplicationManager.getAppDetail().applicationCat1Txt,
				applicationName: AIR.AirApplicationManager.getAppDetail().applicationName
			};
			this.fireEvent('airAction', this, 'airError', data);
		}
		
		return isTemplateValid;
	},
	
	onReferencedTemplateSelect: function(combo, record, index) {
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		cbItSecGroup.setValue(record.get('itsecGroupId'));
		Util.disableCombo(cbItSecGroup);
		
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		bEditItSecGroup.setText(AIR.AirApplicationManager.getLabels().relevanceViewButton);
		
		//this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('lReferencedTemplateError').hide();
		//combo.isInvalid = false;
		
		this.fireEvent('ciChange', this, combo, record);
	},
	onReferencedTemplateChange: function(combo, newValue, oldValue) {
		if(newValue.indexOf(AC.LABEL_INVALID) > -1) {
		//if(combo.isInvalid && newValue.length > 0) {//!this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('lReferencedTemplateError').getEl().isVisible()) {//!combo.isValid() combo.getErrors('').length > 0
			//sollte nicht n�tig sein, aber ciTemplateValidText vom vtype ciTemplateValid �berschreibt den invalid message text immer mit den Platzhaltern {0} und {1}
			//var message = AIR.AirApplicationManager.getLabels().referencedTemplateInvalid;
			//message = message.replace('{0}', AIR.AirApplicationManager.getAppDetail().itsetName).replace('{1}', AIR.AirApplicationManager.getAppDetail().applicationCat1Txt);//data.
			//combo.markInvalid(message);
			return false;
		}
		
		//combo.isInvalid = false;
		//this.filterCombo(combo);//change event schmeisst den filter raus? Warum?
		
//		if(newValue.length === 0) {
//			var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
//			Util.enableCombo(cbItSecGroup);
//			
//			var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
//			bEditItSecGroup.setText(AIR.AirApplicationManager.getLabels().relevanceEditButton);
//		}
		
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			//this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('lReferencedTemplateError').hide();
			this.fireEvent('ciChange', this, combo, newValue, oldValue);
		}
	},
	onReferencedTemplateKeyUp: function(combo, event) {
		if(combo.getRawValue().length === 0) {
			var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
			Util.enableCombo(cbItSecGroup);
			
			var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
			bEditItSecGroup.setText(AIR.AirApplicationManager.getLabels().relevanceEditButton);
		}
		
		this.filterCombo(combo);
	},

	
	onItSecGroupSelect: function(combo, record, index) {
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		bEditItSecGroup.setVisible(true);
		
		this.getComponent('fsComplianceDetails').doLayout();
		this.fireEvent('ciChange', this, combo, record);
	},
	
	onItSecGroupChange: function(combo, newValue, oldValue) {
		if(newValue.indexOf(AC.LABEL_INVALID) > -1)
			return;
		
    	if(this.isComboValueValid(combo, newValue, oldValue))
    		this.fireEvent('ciChange', this, combo, newValue, oldValue);
	},
	
//	getStatusWertDisplayField: function() {
//		var statusWertDisplayField = 'statusWertEn';
//		
//		switch(selectedLanguage) {
//			case 'DE':
//				statusWertDisplayField = 'statusWert';
//				break;
//		}
//		
//		return statusWertDisplayField;
//	},
	
	update: function(data) {
		this.updateAccessMode(data);
	
		var value = data.itsecGroupId ? data.itsecGroupId : AC.CI_GROUP_ID_DELETE_ID;//AC.CI_GROUP_ID_EMPTY;
		var rgRelevanceBYTSEC = this.getComponent('fsComplianceMgmt').getComponent('rgRelevanceBYTSEC');
		
		this.previousComplianceType = value;
		
		switch(value) {
			case AC.CI_GROUP_ID_NON_BYTSEC:
//			case AC.CI_GROUP_ID_EMPTY:
			case AC.CI_GROUP_ID_DELETE_ID:
				rgRelevanceBYTSEC.setValue(value);
//				rgRelevanceBYTSEC.enable();

				break;
			case AC.CI_GROUP_ID_EMPTY:
				rgRelevanceBYTSEC.setValue(AC.CI_GROUP_ID_DELETE_ID);
//				rgRelevanceBYTSEC.enable();

				break;
			default: //Integrated/BYTsec default value oder anderer Wert als 0,-1,10136,11504
				this.bytSecValue = value;
				rgRelevanceBYTSEC.setValue(AC.CI_GROUP_ID_DEFAULT_ITSEC);
//				rgRelevanceBYTSEC.fireEvent('change', rgRelevanceBYTSEC, rgRelevanceBYTSEC.getValue()??);//wenn fsComplianceMgmt unverst�ndlicherweise nicht angezeigt wird. Das ausgew�hlte checkbox Element muss mit�bergeben werden
				rgRelevanceBYTSEC.disable();
				
				this.updateComplianceDetails(data);
			
				break;
		}
		
		var cbgRegulations = this.getComponent('fsRelevantRegulations').getComponent('cbgRegulations');
		
		var values = [];
		for(var i = 0; i < cbgRegulations.items.items.length; i++) {
			var regulationId = 'relevance' + cbgRegulations.items.items[i].boxLabel;
			values[values.length] = data[regulationId] == 'Y' ? true : false;
		}
		
		cbgRegulations.setValue(values);
		
		var pGxp = this.getComponent('fsRelevantRegulations').getComponent('pGxp');
		var cbRelevanceGxp = pGxp.getComponent('CBrelevanceGxp');
		cbRelevanceGxp.setValue(data.gxpFlagId);
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceMgmt').getComponent('rgRelevanceBYTSEC'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceInfo').getComponent('bEditNonBytSec'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup'), data);
		//Compliance Controls sind nur sichtbar, nicht editierbar. Sie sollen immer �ber bEditItSecGroup zu �ffnen sein
		//AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('fsRelevantRegulations').getComponent('cbgRegulations'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsRelevantRegulations').getComponent('pGxp').getComponent('CBrelevanceGxp'), data);
	},
	
	//getData: function() {
	setData: function(data) {
		//var data = {};

		var rgRelevanceBYTSEC = this.getComponent('fsComplianceMgmt').getComponent('rgRelevanceBYTSEC');
		var bytSecStatus = rgRelevanceBYTSEC.getValue().inputValue;
		
					
		data.itSecGroupId = 
			bytSecStatus == AC.CI_GROUP_ID_DEFAULT_ITSEC ?
						   		this.bytSecValue ? this.bytSecValue : AC.CI_GROUP_ID_DEFAULT_ITSEC
			   				: bytSecStatus;
		
		this.bytSecValue = null;

		
		//ComplianceDetails
		if(bytSecStatus == AC.CI_GROUP_ID_DEFAULT_ITSEC) {
			var tfItsetName = this.getComponent('fsComplianceDetails').getComponent('pItSet').getComponent('tfItsetName');
			if (!tfItsetName.disabled && tfItsetName.getValue().length > 0)
				data.itsetName = tfItsetName.getValue();
			
			var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');
			if (!cbIsTemplate.disabled)
				data.template = cbIsTemplate.getValue() ? -1 : 0;//isTemplate
			
			var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
			if (!cbReferencedTemplate.disabled && cbReferencedTemplate.getValue().length > 0)
				data.refId = cbReferencedTemplate.getValue();
			else
				if(cbReferencedTemplate.el.dom.value.indexOf(AC.LABEL_INVALID) === -1)
					data.refId = '-1';
			
			var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
			if(cbItSecGroup.getValue().length > 0)
				data.itSecGroupId = cbItSecGroup.getValue();
			else
				if(cbItSecGroup.el.dom.value.indexOf(AC.LABEL_INVALID) === -1)
					data.itSecGroupId = AC.CI_GROUP_ID_DEFAULT_ITSEC;
		}
		
		
		//RelevantRegulations
		var cbgRegulations = this.getComponent('fsRelevantRegulations').getComponent('cbgRegulations');
		
		if (!cbgRegulations.disabled) {
			for(var i = 0; i < cbgRegulations.items.items.length; i++) {//checkedRegulations.length
				var regulationId = 'relevance' + cbgRegulations.items.items[i].boxLabel;
				var regulationStatus = cbgRegulations.items.items[i].getValue() ? 'Y' : 'N';
				
				data[regulationId] = regulationStatus;
			}
		}
		
		var cbRelevanceGxp = this.getComponent('fsRelevantRegulations').getComponent('pGxp').getComponent('CBrelevanceGxp');
		data.gxpFlag = cbRelevanceGxp.getValue();
		
		return data;
	},
	
	onMassnahmeSaved: function(complianceControlsWindow, massnahmen) {//complianceControls, ciComplianceRequestId		
		for(var i = 0; i < massnahmen.length; i++) {
			var params = {
				itsecMassnahmeDetailsDTO: massnahmen[i],
			 	cwid: AIR.AirApplicationManager.getCwid(),
			 	token: AIR.AirApplicationManager.getToken()
			};
			
			var hasNoGapAnalysis = this.complianceType == AC.CI_GROUP_ID_NON_BYTSEC || this.complianceType == AC.CI_GROUP_ID_DELETE_ID || this.complianceType == AC.CI_GROUP_ID_EMPTY;
			
			var store = hasNoGapAnalysis ? AIR.AirStoreFactory.createItsecMassnahmenDetailsSaveStore() : AIR.AirStoreFactory.createItsecMassnahmenDetailCompleteSaveStore();
			store.on('load', this.onItsecMassnahmenDetailsSaveStoreLoad, this);
			store.load({
				params: params
			});
		}
	},
	
	onItsecMassnahmenDetailsSaveStoreLoad: function(store, records, options) {
		var x;
	},
	
	onCiSelected: function(grid, rowIndex, e) {
		this.reset();
	},
	
	reset: function() {
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		cbItSecGroup.setValue('');//clearValue();//reset --> l�scht den filter
		
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		cbReferencedTemplate.setValue('');//clearValue();//reset --> l�scht den filter
	},
	
	filterByItSet: function(combo, itsetId) {
		if(itsetId && itsetId.length > 0) {
			combo.getStore().filter('itsetId', itsetId);
		} else {
			combo.getStore().clearFilter();
		}
	},
	
	
	filterCombo: function(combo) {
		var filterData = {
			ciKat1: AIR.AirApplicationManager.getAppDetail().applicationCat1Id,
			itsetId: AIR.AirApplicationManager.getAppDetail().itset
		};
		combo.filterByData(filterData);
	},
	
	validate: function(item) {
		switch(item.getId()) {
			case 'rgBARrelevance':
				var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');
				
				if(AIR.AirAclManager.isRelevance(cbIsTemplate, AAM.getAppDetail())) {
					var barRelevance = item.getValue().inputValue;
					
					if(barRelevance === 'Y') {
						cbIsTemplate.disable();
					} else {
						cbIsTemplate.enable();
					}
				}
				break;
				
			default: break;
		}
	},

	/*
	validateCiTemplate: function(value, field) {
		//this.filterCombo(field);
		
		var isTemplateValid = field.getStore().data.key(value);//data. .getById(data.refId);
		if(isTemplateValid) {
			field.setValue(AIR.AirApplicationManager.getAppDetail().refId);//data.
			field.clearInvalid();
			
			return true;
		} else {
			field.setRawValue(AIR.AirApplicationManager.getAppDetail().refTxt);//data.
			var message = AIR.AirApplicationManager.getLabels().referencedTemplateInvalid;
			//message = message.replace('{0}', AIR.AirApplicationManager.getAppDetail().itsetName).replace('{1}', AIR.AirApplicationManager.getAppDetail().applicationCat1Txt);//data.
			
			field.markInvalid(message);
			return false;
		}
		//this.filterCombo(field);
	},*/
	
	
	updateLabels: function(labels) {
		this.setTitle(labels.compliancePanelTitle);
		
		var rgRelevanceBYTSEC = this.get('fsComplianceMgmt').get('rgRelevanceBYTSEC');
		
		this.setBoxLabel(rgRelevanceBYTSEC.items.items[0], labels.complianceBYTSEC);
		this.setBoxLabel(rgRelevanceBYTSEC.items.items[1], labels.complianceNonBYTSEC);
		this.setBoxLabel(rgRelevanceBYTSEC.items.items[2], labels.complianceUndefined);

		
//		this.getComponent('fsComplianceMgmt').getComponent('complianceManagementText').dom.innerHTML = labels.complianceManagementText;
		this.get('fsComplianceInfo').get('lComplianceInfo').setText(labels.complianceInfoText);
		
		this.get('fsComplianceDetails').get('pItSet').get('lItSet').setText(labels.compliance1435WindowItSet);
		this.get('fsComplianceDetails').get('pAsTemplate').get('lAsTemplate').setText(labels.compliance1435WindowUseAsTemplate);
		this.get('fsComplianceDetails').get('pReferencedTemplate').get('lReferencedTemplate').setText(labels.compliance1435WindowLink);
		this.get('fsComplianceDetails').get('pItSecGroup').get('lItSecGroup').setText(labels.compliance1435WindowItSecGroup);
		
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		var text = AIR.AirApplicationManager.getLabels().relevanceViewButton;
		
		var data = AIR.AirApplicationManager.getAppDetail();
		if(data) {
			var hasTemplate = data.refId !== '0';
			
			if(!hasTemplate && AIR.AirAclManager.isRelevance(bEditItSecGroup, data))
				text = labels.relevanceEditButton;
			
//			if(hasTemplate)
//				bEditItSecGroup.setText(labels.relevanceViewButton);
//			else
//				bEditItSecGroup.setText(labels.relevanceEditButton);
		}
		
		bEditItSecGroup.setText(text);
		
		
		this.get('fsRelevantRegulations').setTitle(labels.compliancerelevance);
		var cbgRegulations = this.get('fsRelevantRegulations').get('cbgRegulations');
		this.setBoxLabel(cbgRegulations.items.items[0], labels.relevanceGR1435);
		this.setBoxLabel(cbgRegulations.items.items[1], labels.relevanceGR1775);
		this.setBoxLabel(cbgRegulations.items.items[2], labels.relevanceGR1920);
		this.setBoxLabel(cbgRegulations.items.items[3], labels.relevanceGR2008);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.get('fsComplianceDetails').get('pItSet').get('lItSet'), toolTips.itsetName, toolTips.itsetNameText);
		this.setTooltipData(this.get('fsComplianceDetails').get('pAsTemplate').get('lAsTemplate'), toolTips.isTemplate, toolTips.isTemplateText);
		this.setTooltipData(this.get('fsComplianceDetails').get('pReferencedTemplate').get('lReferencedTemplate'), toolTips.referencedTemplate, toolTips.referencedTemplateText);
		this.setTooltipData(this.get('fsComplianceDetails').get('pItSecGroup').get('lItSecGroup'), toolTips.itsecGroup, toolTips.itsecGroupText);
		
		
		var lGXP = this.getComponent('fsRelevantRegulations').getComponent('pGxp').getComponent('lGXP');
		var cbgRegulations = this.get('fsRelevantRegulations').get('cbgRegulations');
		
		this.setTooltipData(lGXP, toolTips.gxpFlag, toolTips.gxpFlagText);
		
//		Util.log(cbgRegulations.items.items[0].label.dom.nextSibling.children.length);
		var label = Ext.isIE ? cbgRegulations.items.items[0].label.dom.nextSibling.children[0] : cbgRegulations.items.items[0].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR1435, toolTips.relevanceGR1435Text);//oder nur f�r checkbox el.dom
		
		label = Ext.isIE ? cbgRegulations.items.items[1].label.dom.nextSibling.children[0] : cbgRegulations.items.items[1].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR1775, toolTips.relevanceGR1775Text);
		
		label = Ext.isIE ? cbgRegulations.items.items[2].label.dom.nextSibling.children[0] : cbgRegulations.items.items[2].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR1920, toolTips.relevanceGR1920Text);
		
		label = Ext.isIE ? cbgRegulations.items.items[3].label.dom.nextSibling.children[0] : cbgRegulations.items.items[3].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR2008, toolTips.relevanceGR2008Text);
	}
});
Ext.reg('AIR.CiComplianceView', AIR.CiComplianceView);
Ext.namespace('AIR');

AIR.CiComplianceView = Ext.extend(AIR.AirView, {//Ext.Panel
	isInitialized: false,
	
	initComponent: function() {
	
		Ext.apply(this, {
		    title: 'Compliance',//language Datei/updateLabels benutzen
		    
		    border: false,
		    padding: 10,
		    height: 420,
		    autoScroll: true,
		    
		    layout: 'form',
		    
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
		                {id: 'rgitNonBYTSEC',	itemId: 'rgitNonBYTSEC',	boxLabel: 'External',	name: 'rgRelevanceBYTSEC', inputValue: AC.CI_GROUP_ID_NON_BYTSEC, width: 80 }
		            ]
		        },{
					id: 'complianceManagementText',		        	
		    		html: '<span style="color:red;">*</span>&nbsp;"Compliance Management" requires to be set to "Integrated" or "External".<br>Choosing "Integrated" AIR covers all issues of compliance management,<br> whereas "External" manages only the references to an compliance management outside of AIR.',
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
		    		
						style: {
					    	fontSize: '12px'
						}
			    	},{
				    	xtype: 'textfield',
				        id: 'tfItsetName',
				        
				        flex: 8,
				        				        
				        allowBlank: true,
				        disabled: true	// keine �nderung zulassen - nur ANZEIGE
			    	}]
				},{
					xtype: 'panel',
					id: 'pAsTemplate',
					layout: 'hbox',
					border: false,
					margins: '5 5 0 0',
					
					items: [{
			    		xtype: 'label',
			    		id: 'lAsTemplate',
			    		text: 'As template',
			    		width: 110,
			    		
						style: {
					    	fontSize: '12px'
						},
						margins: '0 5 0 0'
			    	},{
				    	xtype: 'checkbox',
				        id: 'cbIsTemplate',
			    	    margins: '5 0 10 0',
			    	    left: 136
			    	},
			    	{
						xtype: 'button',
						id: 'bIsDirecLinkWithTemplate',
						text: 'Link CIS',
						width: 70,
						hidden: true,
						style: {
							marginLeft: 5,
							left:136
						}
					}
			    	]
				},{
					xtype: 'panel',
					id: 'pReferencedTemplate',
					
					layout: 'hbox',
					
					border: false,
					
					margins: '0 5 0 0',
					
					items: [{
			    		xtype: 'label',
			    		id: 'lReferencedTemplate',
			    		text: 'Link',
			    		width: 130,
			    		
						style: {
					    	fontSize: 12
						}
			    	},{
						xtype: 'filterCombo',//combo
				        id: 'cbReferencedTemplate',
						enableKeyEvents: true,
				        width: 350,
				        listWidth: 600,
				        fieldLabel: 'Link',
						lastQuery: '',
				        store: AIR.AirStoreManager.getStoreByName('referencesListStore'),
				        valueField: 'id',
				        displayField: 'name',
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local'
					}]
		    	},{
					xtype: 'panel',
					id: 'pItSecGroup',
					
					layout: 'hbox',
					border: false,
					
					style: {
						marginTop: 5
					},
					
					items: [{
			    		xtype: 'label',
			    		id: 'lItSecGroup',
			    		text: 'ITSecGroup',
			    		width: 130,
						style: {
					    	fontSize: 12
						}
			    	},{
						xtype: 'filterCombo',//combo
				        id: 'cbItSecGroup',
				        listWidth: 600,
				        enableKeyEvents: true,
				        width: 350,//layout: 'column'

				        fieldLabel: 'ItSecGroup',
						lastQuery: '',
				        store: AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),
				        valueField: 'id',//itSecGroupId
				        displayField: 'name',//itSecGroupName
				        
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local'
			    	}, {
						xtype: 'button',
						id: 'bEditItSecGroup',
						width: 60,
						style: {
							marginLeft: 5
						}
					}, {
						xtype: 'button',
						id: 'bDirectCIAnswerlinkages',
						text: 'linkages',
						width: 80,
						style: {
							marginLeft: 25
						}
					}
					]
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
        			width: 220,
        			hideLabel: true,
        			
        			items: [
						{ id: 'chbGR1435', boxLabel: 'GR1435', name: 'cbgRegulations', width: 110 },
    			        { id: 'chbGR1920', boxLabel: 'GR1920', name: 'cbgRegulations', width: 110 },
    			        { id: 'chbGR2059', boxLabel: 'GR2059', name: 'cbgRegulations', width: 110 },
    			        { id: 'chbGR2008', boxLabel: 'GR2008', name: 'cbgRegulations', width: 110 }
			        ]
		        }, {
		        	xtype: 'panel',
		        	id: 'pGxp',
		        	border: false,
		        	
		        	layout: 'hbox',//column
		        	items: [{
			    		xtype: 'label',
			    		id: 'lGXP',
			    		text: 'GXP',
						style: {
					    	fontSize: 12
						},
						
						margins: '4 0 0 0'
			    	},{
						xtype: 'combo',
						id: 'CBrelevanceGxp',
						store: AIR.AirStoreManager.getStoreByName('gxpFlagListStore'),
						
						width: 80,
						margins: '0 0 0 10',
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
		var bIsDirecLinkWithTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('bIsDirecLinkWithTemplate');
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		var bDirectCIAnswerlinkages = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bDirectCIAnswerlinkages');

		var cbgRegulations = this.getComponent('fsRelevantRegulations').getComponent('cbgRegulations');
		var cbRelevanceGxp = this.getComponent('fsRelevantRegulations').getComponent('pGxp').getComponent('CBrelevanceGxp');

		rgRelevanceBYTSEC.on('change', this.onRadioGroupRelevanceBYTSEC, this);
		bEditNonBytSec.on('click', this.onEditNonBytSec, this);

		cbIsTemplate.on('check', this.onIsTemplateCheck, this);
		
		cbReferencedTemplate.on('beforeselect', this.onReferencedTemplateBeforeSelect, this);
		cbReferencedTemplate.on('select', this.onReferencedTemplateSelect, this);
		cbReferencedTemplate.on('change', this.onReferencedTemplateChange, this);
		cbReferencedTemplate.on('keyup', this.onReferencedTemplateKeyUp, this);
		bIsDirecLinkWithTemplate.on('click',this.onDisplayDirectLinkCI,this);
		
		cbItSecGroup.on('select', this.onItSecGroupSelect, this);
		cbItSecGroup.on('change', this.onItSecGroupChange, this);
		cbItSecGroup.on('keyup', this.onItSecGroupKeyUp, this);
		bEditItSecGroup.on('click', this.onEditItSecGroup, this);
		bDirectCIAnswerlinkages.on('click',this.onDisplayDirectCIAnswerLinkages,this);

		cbgRegulations.on('change', this.onRegulationsChange, this);
		cbRelevanceGxp.on('select', this.onRelevanceGxpSelect, this);
	},
	
	//============================================================================================================================
	
	onRadioGroupRelevanceBYTSEC: function(rgb, checkedRadio) {
		
		if (null != checkedRadio && typeof checkedRadio!='undefined') {
			this.complianceType = checkedRadio.inputValue;
		} else {
			this.complianceType = null;
		}
		
		switch(this.complianceType) {
			case AC.CI_GROUP_ID_DEFAULT_ITSEC:
				this.getComponent('fsComplianceInfo').setVisible(false);
				this.getComponent('fsComplianceDetails').setVisible(true);
				rgb.disable();
				
				this.updateComplianceDetails(AIR.AirApplicationManager.getAppDetail());
				
				this.fireEvent('ciChange', this, rgb, checkedRadio);
				break;
			case AC.CI_GROUP_ID_NON_BYTSEC:
				
				//wenn original DB update Wert Undefined (0,-1) stand (siehe update function), k�nnen die Massnahmen zu diesem CI noch 
				//nicht angelegt worden sein,
				//da diese entweder noch nie vorhanden waren, oder zwischenzeitlich wieder gel�scht wurden, nachdem der compliance Status
				//zwischenzeitlich wieder auf Undefined (0,-1) stand. Diese Methode wird aufgerufen, wenn der user auf diese rbg klickt und
				//wenn rbg.setValue() programmatisch aufgerufen wird.
				if(this.previousComplianceType != this.complianceType) {
					this.fireEvent('complianceTypeChange', this, rgb, this.previousComplianceType, this.complianceType);
					
					//use additional internal class variable to stop ciChange event from being fired? Do so, if the save/cancel buttons are not
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
		if(data.tableId == AC.TABLE_ID_APPLICATION) {
			tfItsetName.setValue(data.itsetName);
		} else if(!data.isCiCreate) {
			var itsetStore = AIR.AirStoreManager.getStoreByName('itSetListStore');
			if(itsetStore.getById(data.itset)!=undefined){
				var itsetName = itsetStore.getById(data.itset).get('text');
				tfItsetName.setValue(itsetName);
			}

		}
		
		var isTemplate = data.template == '1' || data.template == '-1';
		var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');
		var bIsDirecLinkWithTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('bIsDirecLinkWithTemplate');

		cbIsTemplate.setValue(isTemplate);
		//if(data.barRelevance === 'Y')
		//	cbIsTemplate.disable();//BAR relevante CIs d�rfen keine templates sein
		if(data.templateLinkWithCIs === 'Y'){
			cbIsTemplate.disable();
		}else{
			cbIsTemplate.enable();
		}
		 if(isTemplate){
			 bIsDirecLinkWithTemplate.setVisible(true);
		 }	 
		 else{
			 bIsDirecLinkWithTemplate.setVisible(false);
		 }
			 
		
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');

		
		/*if(data.templateChanged) {
			cbReferencedTemplate.getStore().load({
				callback: function() {
					this.filterCombo(cbReferencedTemplate);
				}.createDelegate(this)
			});
		} else {*/
			this.filterCombo(cbReferencedTemplate);
		//}
		this.filterCombo(cbItSecGroup);
		
		
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		
		var hasEditRights = AIR.AirAclManager.isRelevance(bEditItSecGroup, data);
		var hasItSecGroup = cbItSecGroup.getStore().getCount() > 0;
		if(hasEditRights && hasItSecGroup && data.itsecGroupId.length > 0 && data.itsecGroupId !== AC.CI_GROUP_ID_NON_BYTSEC && data.itsecGroupId !== AC.CI_GROUP_ID_DEFAULT_ITSEC && data.itsecGroupId != 0 && data.itsecGroupId != -1)//&& data.itsecGroupId && data.itsecGroupId.length > 0
			bEditItSecGroup.enable();
		else
			bEditItSecGroup.disable();


		
		var text = AIR.AirApplicationManager.getLabels().relevanceViewButton;
		
		if(isTemplate) {
			cbReferencedTemplate.setValue('');//reset();
			Util.disableCombo(cbReferencedTemplate);
			
			if(AIR.AirAclManager.isRelevance(cbItSecGroup, data))
				Util.enableCombo(cbItSecGroup);
			
			if(hasEditRights)
				text = AIR.AirApplicationManager.getLabels().relevanceEditButton;
		} else if(!data.isCiCreate) {
			cbReferencedTemplate.setValue('');//reset();
			var hasTemplate = data.refId !== '0' && data.refId.length > 0;
			if(hasTemplate) {
				Util.disableCombo(cbItSecGroup);
				
				//nicht getStore().getById() damit gegen die gefilterten Daten gepr�ft wird
				//snapshot.key statt data.key, da nur nicht l�schmarkierte Templates g�ltig sind. Siehe auch 
				//filterCombo(cbReferencedTemplate) mit deleteTimestamp.
				
				var storeData = cbReferencedTemplate.getStore().snapshot ? cbReferencedTemplate.getStore().snapshot : cbReferencedTemplate.getStore().data;
				var templateRecord = storeData.key(data.refId);//data.key snapshot.key
				
				
				var isTemplateValid = templateRecord && templateRecord.get('delTimestamp').length === 0;
				if(isTemplateValid) {
					cbReferencedTemplate.setValue(data.refId);
				} else {
					var invalidTemplateName = templateRecord ? templateRecord.get('name') : data.refTxt || data.refId;
					cbReferencedTemplate.setRawValue(AC.LABEL_INVALID + invalidTemplateName);//data.refTxt
				}
			} else {
				if(AIR.AirAclManager.isRelevance(cbItSecGroup, data))
					Util.enableCombo(cbItSecGroup);
					
				if(AIR.AirAclManager.isRelevance(bEditItSecGroup, data))
					text = AIR.AirApplicationManager.getLabels().relevanceEditButton;
			}
		}
		bEditItSecGroup.setText(text);

		//always enable view button if the button text is 'View' 
		if(text == AIR.AirApplicationManager.getLabels().relevanceViewButton){
			bEditItSecGroup.enable();
		}
		
		//is itsecGroupId a real BYTsec ItSecGroup?
		if(data.itsecGroupId !== AC.CI_GROUP_ID_NON_BYTSEC && data.itsecGroupId !== AC.CI_GROUP_ID_DEFAULT_ITSEC && data.itsecGroupId != 0 && data.itsecGroupId != -1) {//evtl. mit cbItSecGroup.setRawValue('Default_ItSecGroup'); setzen falls der Name dieser Default itsecGruppe angezeigt werden soll
			
			//weil store ein mapping bei id/itsecGroupId hat geht cbItSecGroup.getStore().getById() nicht. Andersrum, das mapping client+serverseitig rausnehmen hat nicht geklappt.
			var isItsecGroupValid = cbItSecGroup.getStore().findExact('id', data.itsecGroupId) > -1;//cbItSecGroup.getStore().getAt(cbItSecGroup.getStore().findExact('id', data.itsecGroupId));//cbItSecGroup.getStore().getById(data.itsecGroupId);//.data.key(data.itsecGroupId)
			if(isItsecGroupValid || cbReferencedTemplate.getValue().length > 0) {//wenn template gesetzt und dessen itsecgruppe sonst invalid w�re
				cbItSecGroup.setValue(data.itsecGroupId);
			} else if(!data.isCiCreate) {
				cbItSecGroup.setRawValue(AC.LABEL_INVALID + data.itsecGroupTxt);
			}
		} else {
			cbItSecGroup.setValue('');
		}
	},
	
	onEditNonBytSec: function(button, event) {
		this.loadItsecMassnahmenStore();
	},
	
	onIsTemplateCheck: function(checkbox, isChecked) {
		//emria
		var bIsDirecLinkWithTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('bIsDirecLinkWithTemplate');
		console.log("bIsDirecLinkWithTemplate "+bIsDirecLinkWithTemplate.hidden);//hidden
		
		
		//emria
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');

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
			//emria
			if(! bIsDirecLinkWithTemplate.hidden){
				console.log(" Inside uncheck "+checkbox +"  "+this);
				
				var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');
				

				cbIsTemplate.setValue(true);
				Ext.Msg.show({
	    			title: 'Info',
	    			msg: 'This Template is already linked to other CIs, Uchecking is not allowed.',
	    			buttons: Ext.MessageBox.OK,
	    			icon: Ext.MessageBox.INFO			
	    		});
			}
			//emria
			var r = cbReferencedTemplate.getStore().getById(AAM.getAppDetail().id);
			cbReferencedTemplate.getStore().remove(r);
			AAM.getAppDetail().templateChanged = true;

			
			Util.enableCombo(cbReferencedTemplate);
			Util.enableCombo(cbItSecGroup);
		}
		
		this.fireEvent('ciChange', this, checkbox, isChecked);
	},
	
	onDisplayDirectLinkCI: function(button, event){
		var directLinkCIStore = AIR.AirStoreFactory.createDirectLinkCIStore();
		
		var params = {
				cwid: AIR.AirApplicationManager.getCwid(),
				token: AIR.AirApplicationManager.getToken(),
			 	ciId: AAM.getAppDetail().ciId || AAM.getCiId(),
			 	ciTypeId: AAM.getTableId()
		};
		directLinkCIStore.load({
			params: params
		});
		var directLinkCITemplateWindow = new AIR.DirectLinkCITemplateWindow(directLinkCIStore);
		directLinkCITemplateWindow.show();
	},
	
	onEditItSecGroup: function(button, event) {
		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');

		var newTemplate = cbReferencedTemplate.getValue();
		var template = AAM.getAppDetail().refId;
		
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
		
		
		if(isNewTemplate || isNewItSecGroup) {
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
		 	ciId: AAM.getAppDetail().ciId || AAM.getCiId(),
			language: AAM.getLanguage(),
			tableId: AAM.getAppDetail().tableId
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
			language: AAM.getLanguage(),
			itSet: AAM.getAppDetail().itset,
			ciId: AAM.getAppDetail().ciId || AAM.getCiId(),
			applicationCat1Id: AAM.getAppDetail().applicationCat1Id,
			hasEditRights: !hasTemplate && hasEditRights
		};
		
		var complianceControlsWindow = new AIR.ComplianceControlsWindow(massnahmenStore, massnahmeDetailStore, config);
		complianceControlsWindow.on('massnahmeSaved', this.onMassnahmeSaved, this);
		complianceControlsWindow.show();
	},
	
	onDisplayDirectCIAnswerLinkages: function(button, event){
		var directLinkageCIAnswersStore = AIR.AirStoreFactory.createDirectLinkageCIsAnswerStore();
		var params = {
			 	cwid: AIR.AirApplicationManager.getCwid(),
			 	token: AIR.AirApplicationManager.getToken(),
			 	ciId: AAM.getAppDetail().ciId || AAM.getCiId(),
				language: AAM.getLanguage(),
				tableId: AAM.getAppDetail().tableId
			};
		directLinkageCIAnswersStore.load({
			params: params
		});
		var directLinkageCIsAnswerWindow = new AIR.DirectLinkageCIsAnswerWindow(directLinkageCIAnswersStore);
		directLinkageCIsAnswerWindow.show();		
		
	},
	
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
				applicationName: AIR.AirApplicationManager.getAppDetail().name
			};
			this.fireEvent('airAction', this, 'airError', data);
		}
		
		return isTemplateValid;
	},
	
	onReferencedTemplateSelect: function(combo, record, index) {
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		var itSecGroupId = record.get('itsecGroupId');
		if(itSecGroupId != AC.CI_GROUP_ID_DEFAULT_ITSEC)
			cbItSecGroup.setValue(itSecGroupId);
		
		Util.disableCombo(cbItSecGroup);
		
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		bEditItSecGroup.setText(AIR.AirApplicationManager.getLabels().relevanceViewButton);
		bEditItSecGroup.enable();
		
		this.fireEvent('ciChange', this, combo, record);
	},
	onReferencedTemplateChange: function(combo, newValue, oldValue) {
		if(newValue.indexOf(AC.LABEL_INVALID) > -1) {
			//sollte nicht n�tig sein, aber ciTemplateValidText vom vtype ciTemplateValid �berschreibt den invalid message text immer mit den Platzhaltern {0} und {1}
			//var message = AIR.AirApplicationManager.getLabels().referencedTemplateInvalid;
			//message = message.replace('{0}', AIR.AirApplicationManager.getAppDetail().itsetName).replace('{1}', AIR.AirApplicationManager.getAppDetail().applicationCat1Txt);//data.
			//combo.markInvalid(message);
			return false;
		}
		
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
			bEditItSecGroup.enable();
			this.fireEvent('ciChange', this, combo, newValue, oldValue);
		}
		
		this.filterCombo(combo);
	},
	onReferencedTemplateKeyUp: function(combo, event) {
		if(combo.getRawValue().length === 0) {
			var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
			Util.enableCombo(cbItSecGroup);
			
			var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
			bEditItSecGroup.setText(AIR.AirApplicationManager.getLabels().relevanceEditButton);
		}

	},

	
	onItSecGroupSelect: function(combo, record, index) {
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
		bEditItSecGroup.setVisible(true);
		bEditItSecGroup.enable();
		
		this.getComponent('fsComplianceDetails').doLayout();
		this.fireEvent('ciChange', this, combo, record);
	},
	
	onItSecGroupChange: function(combo, newValue, oldValue) {
		if(newValue.indexOf(AC.LABEL_INVALID) > -1)
			return;
		
		var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');

		if(this.isItsetGroupComboValueValid(combo, newValue, oldValue)) {
    		bEditItSecGroup.enable();
    		this.fireEvent('ciChange', this, combo, newValue, oldValue);
    	}
    	
    	if(typeof newValue === 'string' && newValue.length === 0)
    		bEditItSecGroup.disable();
	},
	
	onItSecGroupKeyUp: function(combo, event) {
		if(combo.getRawValue().length === 0) {
			var bEditItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('bEditItSecGroup');
			bEditItSecGroup.disable();
		}
	},
	
	clear: function(data) {
		this.update(data);
	},
	
	update: function(data) {
		/*var fsComplianceDetails = this.getComponent('fsComplianceDetails');
		
		var fsComplianceMgmt = this.getComponent('fsComplianceMgmt');
		if(data.tableId === AC.TABLE_ID_BUSINESS_APPLICATION){
			
			fsComplianceDetails.setVisible(false);
			
			fsComplianceMgmt.setVisible(false);
			
		}else{
			fsComplianceDetails.setVisible(true);
			
			fsComplianceMgmt.setVisible(true);
			
		}*/
		var rgRelevanceBYTSEC = this.getComponent('fsComplianceMgmt').getComponent('rgRelevanceBYTSEC');
		
		var tfItsetName = this.getComponent('fsComplianceDetails').getComponent('pItSet').getComponent('tfItsetName');
		var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');

		var cbReferencedTemplate = this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate');
		var cbItSecGroup = this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup');
		
		var cbgRegulations = this.getComponent('fsRelevantRegulations').getComponent('cbgRegulations');
		var pGxp = this.getComponent('fsRelevantRegulations').getComponent('pGxp');
		var cbRelevanceGxp = pGxp.getComponent('CBrelevanceGxp');

		this.updateAccessMode(data);
	
		var value = data.isCiCreate ? AC.CI_GROUP_ID_DELETE_ID :
					data.itsecGroupId ? data.itsecGroupId : AC.CI_GROUP_ID_DELETE_ID;//AC.CI_GROUP_ID_EMPTY;
		
		this.previousComplianceType = value;
		
		switch(value) {
			case AC.CI_GROUP_ID_NON_BYTSEC:
			case AC.CI_GROUP_ID_DELETE_ID:
				rgRelevanceBYTSEC.setValue(value);
				break;
			case AC.CI_GROUP_ID_EMPTY:
				rgRelevanceBYTSEC.setValue(AC.CI_GROUP_ID_DELETE_ID);
				break;
			default: //Integrated/BYTsec default value oder anderer Wert als 0,-1,10136,11504
				this.bytSecValue = value;
				rgRelevanceBYTSEC.setValue(AC.CI_GROUP_ID_DEFAULT_ITSEC);
				rgRelevanceBYTSEC.disable();
				
				this.updateComplianceDetails(data);
			
				break;
		}
		

		
		if(data.isCiCreate) {
			cbgRegulations.reset();
			cbgRegulations.setValue([true, false, false, false]);
			cbRelevanceGxp.reset();
			

			tfItsetName.reset();
			cbIsTemplate.reset();
			cbReferencedTemplate.reset();
			cbItSecGroup.reset();
		} else {
			var values = [];
			for(var i = 0; i < cbgRegulations.items.items.length; i++) {
				var regulation = cbgRegulations.items.items[i].boxLabel;
				var regulationId = 'relevance' + regulation;
				values[values.length] = data[regulationId] == 'Y' ? true : false;
			}
			
			cbgRegulations.setValue(values);
			cbRelevanceGxp.setValue(data.gxpFlagId);
		}
		
		for(var i = 0; i < cbgRegulations.items.items.length; i++) {
			var regulation = cbgRegulations.items.items[i].boxLabel;
			var exists = AIR.AirBusinessRules.existsItsecRegulationByCiType(data.tableId, regulation);
			cbgRegulations.items.items[i].setVisible(exists);
		}
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceMgmt').getComponent('rgRelevanceBYTSEC'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceInfo').getComponent('bEditNonBytSec'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pReferencedTemplate').getComponent('cbReferencedTemplate'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('lItSecGroup'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsComplianceDetails').getComponent('pItSecGroup').getComponent('cbItSecGroup'), data);
		//Compliance Controls sind nur sichtbar, nicht editierbar. Sie sollen immer �ber bEditItSecGroup zu �ffnen sein

		var cbgRegulations = this.getComponent('fsRelevantRegulations').getComponent('cbgRegulations');
		AIR.AirAclManager.setAccessMode(cbgRegulations.items.items[0], data);//1435
		AIR.AirAclManager.setAccessMode(cbgRegulations.items.items[2], data);//1920
		AIR.AirAclManager.setAccessMode(cbgRegulations.items.items[1], data);
		AIR.AirAclManager.setAccessMode(cbgRegulations.items.items[3], data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('fsRelevantRegulations').getComponent('pGxp').getComponent('CBrelevanceGxp'), data);
	},
	
	setData: function(data) {
/*		if(data.tableId === AC.TABLE_ID_SERVICE){
			var fsComplianceDetails = this.getComponent('fsComplianceDetails');
			var fsRelevantRegulations = this.getComponent('fsRelevantRegulations');
			var fsComplianceMgmt = this.getComponent('fsComplianceMgmt');
			fsComplianceDetails.setVisible(false);
			fsRelevantRegulations.setVisible(false);
			fsComplianceMgmt.setVisible(false);
			return;
		}*/
		
		var rgRelevanceBYTSEC = this.getComponent('fsComplianceMgmt').getComponent('rgRelevanceBYTSEC');

		if (null === rgRelevanceBYTSEC.getValue()) {
			// alert('bytSecStatus = null');
			;
		}
		else {
			var bytSecStatus = rgRelevanceBYTSEC.getValue().inputValue;
		
			data.itSecGroupId = 
				bytSecStatus == AC.CI_GROUP_ID_DEFAULT_ITSEC ?
						   		this.bytSecValue ? this.bytSecValue : AC.CI_GROUP_ID_DEFAULT_ITSEC
			   				: bytSecStatus;
		}
		
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
		var ciDetail = AIR.AirApplicationManager.getAppDetail();
		
		var filterData = {
			itsetId: ciDetail.itset
		};
		
		if(combo.getId() === 'cbReferencedTemplate')
			filterData.delTimestamp = '';

		if(ciDetail.tableId == AC.TABLE_ID_APPLICATION) {
			filterData.ciKat1 = ciDetail.applicationCat1Id;
		} else {
			filterData.tableId = ciDetail.tableId;
		}
		
		combo.filterByData(filterData);
	},
	
	validate: function(item) {
		switch(item.getId()) {
			case 'rgBARrelevance':
				var cbIsTemplate = this.getComponent('fsComplianceDetails').getComponent('pAsTemplate').getComponent('cbIsTemplate');
				
				/*if(AIR.AirAclManager.isRelevance(cbIsTemplate, AAM.getAppDetail())) {
					var barRelevance = item.getValue().inputValue;
					
					if(barRelevance === 'Y') {
						cbIsTemplate.disable();
					} else {
						cbIsTemplate.enable();
					}
				}*/
				break;
				
			default: break;
		}
	},

	updateLabels: function(labels) {
		this.setTitle(labels.compliancePanelTitle);
		
		var rgRelevanceBYTSEC = this.get('fsComplianceMgmt').get('rgRelevanceBYTSEC');
		
		this.setBoxLabel(rgRelevanceBYTSEC.items.items[0], labels.complianceBYTSEC);
		this.setBoxLabel(rgRelevanceBYTSEC.items.items[1], labels.complianceNonBYTSEC);
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
		}
		
		bEditItSecGroup.setText(text);
		
		
		this.get('fsRelevantRegulations').setTitle(labels.compliancerelevance);
		var cbgRegulations = this.get('fsRelevantRegulations').get('cbgRegulations');
		this.setBoxLabel(cbgRegulations.items.items[0], labels.relevanceGR1435);
		this.setBoxLabel(cbgRegulations.items.items[1], labels.relevanceGR2059);
		this.setBoxLabel(cbgRegulations.items.items[2], labels.relevanceGR1920);
		this.setBoxLabel(cbgRegulations.items.items[3], labels.relevanceGR2008);
	},
	
	isItsetGroupComboValueValid: function(combo, newValue, oldValue){
		
		 //wenn blur listener auf combo kann newValue und oldValue undefined sein
		if (newValue != undefined && newValue != "") {
		var index = combo.getStore().indexOf(combo.getStore().getByIsgid(newValue));
		if (index !== -1)
		return true;
		}
		var nValue = parseInt(newValue);
		//parseInt Bugfix: if newValue is i.e. '111Bayer Group' nValue would successfully converted to int, namely 111. This must must not happen
		var nValueString = newValue.toString();
		var isReallyNoInt = (nValueString.length !== newValue.length) || nValueString === 'NaN';
		//parseInt Bugfix: if newValue is i.e. '111Bayer Group' nValue would successfully converted to int, namely 111. This must must not happen
		//wenn die combo einen Filter hat, muss immer gefiltert werden, bevor der letzte g�ltige Wert zur�ckgesetzt wird,
		//sonst verschwindet der Filter, bzw. combo.data array ist leer (wodurch?).
		if(combo.lastQuery)
		combo.filterByData();
		if(isReallyNoInt && isNaN(isReallyNoInt ? newValue : nValue) && newValue.length > 0) {//nValue nValueString
		index = combo.getStore().findExact('name', nValue);
		if(index === -1)
		this.restorePreviousValue(combo, oldValue);
		return false;
		} else {//if numbers or other nonsense is directly entered in the combo
		var index = combo.getStore().findExact('name', newValue);
		//if(index === -1)
		//index = combo.getStore().findExact('id', newValue);
		//index = combo.getStore().indexOf(combo.getStore().getById(newValue));
		//if item is selected it must be searched for the id, otherwise valid values would be treated as invalid
		if(newValue.length > 0 && index === -1) {
		this.restorePreviousValue(combo, oldValue);
		return false;
		}
		return true;
		}

		
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.get('fsComplianceDetails').get('pItSet').get('lItSet'), toolTips.itsetName, toolTips.itsetNameText);
		this.setTooltipData(this.get('fsComplianceDetails').get('pAsTemplate').get('lAsTemplate'), toolTips.isTemplate, toolTips.isTemplateText);
		this.setTooltipData(this.get('fsComplianceDetails').get('pReferencedTemplate').get('lReferencedTemplate'), toolTips.referencedTemplate, toolTips.referencedTemplateText);
		this.setTooltipData(this.get('fsComplianceDetails').get('pItSecGroup').get('lItSecGroup'), toolTips.itsecGroup, toolTips.itsecGroupText);
		
		
		var lGXP = this.getComponent('fsRelevantRegulations').getComponent('pGxp').getComponent('lGXP');
		var cbgRegulations = this.get('fsRelevantRegulations').get('cbgRegulations');
		
		this.setTooltipData(lGXP, toolTips.gxpFlag, toolTips.gxpFlagText);
		
		var label = Ext.isIE ? cbgRegulations.items.items[0].label.dom.nextSibling.children[0] : cbgRegulations.items.items[0].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR1435, toolTips.relevanceGR1435Text);//oder nur f�r checkbox el.dom
		
		label = Ext.isIE ? cbgRegulations.items.items[1].label.dom.nextSibling.children[0] : cbgRegulations.items.items[1].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR2059, toolTips.relevanceGR2059Text);
		
		label = Ext.isIE ? cbgRegulations.items.items[2].label.dom.nextSibling.children[0] : cbgRegulations.items.items[2].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR1920, toolTips.relevanceGR1920Text);
		
		label = Ext.isIE ? cbgRegulations.items.items[3].label.dom.nextSibling.children[0] : cbgRegulations.items.items[3].label.dom.nextElementSibling.children[0];
		this.setTooltipData(label, toolTips.relevanceGR2008, toolTips.relevanceGR2008Text);
	}
});
Ext.reg('AIR.CiComplianceView', AIR.CiComplianceView);
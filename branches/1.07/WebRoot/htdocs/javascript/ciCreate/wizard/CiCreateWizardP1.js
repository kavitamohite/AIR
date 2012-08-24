Ext.namespace('AIR');

AIR.CiCreateWizardP1 = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			layout: 'form',
//			border: false,
			title: '-',
			
//			height: 350,
			labelWidth: 250,//200
			padding: 10,//bodyStyle: {}
			
			items: [{
				xtype: 'filterCombo',
				id: 'cbAppCat1W',//wizardobjectType
			    fieldLabel: 'Type',
			    
			    valueField: 'id',
		        displayField: 'english',
		        editable: false,
		        lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local',
		        
		        //disabled: true,
		        //hideTrigger: true,
		        
		        msgTarget: 'under',
		        width: 250,
		        
			    store: AIR.AirStoreManager.getStoreByName('applicationCat1ListStore')
		    },{
				xtype: 'filterCombo',
				id: 'cbAppCat2W',
			    fieldLabel: 'Category',
			    
			    valueField: 'id',
		        displayField: 'text',
				lastQuery: '',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        
		        mode: 'local',
//		        allowBlank: false,
		        width: 250,
		        msgTarget: 'under',
		        
		        store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore')
		    },{
		    	xtpye: 'panel',
		    	id: 'wizardCat1MandatoryPages',
		    	
			    layout: 'card',
			    activeItem: 0,
			    
			    border: false,
		        style: {
		        	marginTop: 20
		        },
		        
			    items: [{
			    	xtype: 'AIR.CiCreateAppMandatoryView',
			    	id: 'ciCreateAppMandatoryView'
			    }/*,{
			    	xtype: 'AIR.CiCreateApplicationPlatformView',
			    	id: 'ciCreateAppPlatformView'
			    },{
			    	xtype: 'AIR.CiCreateCommonServiceView',
			    	id: 'ciCreateCommonServiceView'
			    },{
			    	xtype: 'AIR.CiCreateMiddlewareView',
			    	id: 'ciCreateMiddlewareView'
			    }*/]
		    }]
		});
		
		AIR.CiCreateWizardP1.superclass.initComponent.call(this);
		
		var cbAppCat1W = this.getComponent('cbAppCat1W');
		cbAppCat1W.on('select', this.onAppCat1Select, this);
		cbAppCat1W.setValue(AC.APP_CAT1_APPLICATION);
		
		var cbAppCat2W = this.getComponent('cbAppCat2W');
		cbAppCat2W.on('select', this.onAppCat2Select, this);
		cbAppCat2W.on('change', this.onAppCat2Change, this);
//		cbAppCat2W.getStore().filter('applicationCat1Id', cbAppCat1W.getValue());//AC.APP_CAT1_APPLICATION
		var filterData = {
			applicationCat1Id: cbAppCat1W.getValue()
		};
		cbAppCat2W.filterByData(filterData);
		
		cbAppCat2W.setValue(AC.APP_CAT2_DEFAULT_UNKOWN);
		this.switchNameFields(false);
		
//		this.objectNameAllowedStore = AIR.AirStoreFactory.getObjectNameAllowedStore();
//		this.objectAliasAllowedStore = AIR.AirStoreFactory.getObjectAliasAllowedStore();
	},
	
	onAppCat1Select: function(store, record, index) {
		var appCat1Id = record.get('id');
		
		switch(appCat1Id) {
			case AC.APP_CAT1_APPLICATION:
				this.getComponent('wizardCat1MandatoryPages').getLayout().setActiveItem('ciCreateAppMandatoryView');
				break;
			case AC.APP_CAT1_MIDDLEWARE:
				this.getComponent('wizardCat1MandatoryPages').getLayout().setActiveItem('ciCreateAppMandatoryView');
				break;
			case AC.APP_CAT1_APPLICATION_PLATFORM:
			case AC.APP_CAT1_COMMON_SERVICE:
			default: break;
		}
		
		//reload cbAppCat2W...
	},
	
	
	onAppCat2Select: function(store, record, index) {
		this.isCat2Sap = record.get('guiSAPNameWizard') === 'Y';

		this.switchNameFields();
	},
	onAppCat2Change: function(combo, newValue, oldValue) {
		this.isComboValueValid(combo, newValue, oldValue);
	},
	switchNameFields: function() {
		var ciCreateApplicationView = this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView');
		var pSapNameW = ciCreateApplicationView.getComponent('pSapNameW');
		var tfCiNameW = ciCreateApplicationView.getComponent('tfCiNameW');
		
		if(this.isCat2Sap) {
			pSapNameW.setVisible(true);
			tfCiNameW.setVisible(false);
			AIR.AirAclManager.setNecessity(ciCreateApplicationView.getComponent('pSapNameW').getComponent('lSapName1W'));
		} else {
			pSapNameW.setVisible(false);
			tfCiNameW.setVisible(true);
		}
	},
	
	setData: function(params) {
		params.applicationCat1Id = this.getComponent('cbAppCat1W').getValue();
		params.applicationCat2Id = this.getComponent('cbAppCat2W').getValue();
		params.isCat2Sap = this.isCat2Sap;
		
		this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').setData(params);
	},
	
	reset: function() {
		this.wizardStarted = true;
		this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').reset();
		this.isCat2Sap = false;
		
		//falls durch CI Auswahl mit Kat1 != Application eine für Application unpassende Kat2 Liste gefiltert wurde,
		//für den Wizard wieder zurücksetzen:
		this.getComponent('cbAppCat2W').getStore().filter('applicationCat1Id', this.getComponent('cbAppCat1W').getValue());
		this.getComponent('cbAppCat2W').setValue(AC.APP_CAT2_DEFAULT_UNKOWN);
		this.switchNameFields();
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage1);
		
		//gehört hier eigentlich nicht hin. Da aber keine update Methode gibt und der IE diese cb zerschiesst 
		//oder gar nicht darstellt wenn cb mit den Attributen disabled: true, und hideTrigger: true konfiguriert wird:
		//AIR.AirAclManager.setAccessMode(this.getComponent('cbAppCat1W'), null); appDetail müsste übergeben werden, gibt es hier aber nicht
		Util.disableCombo(this.getComponent('cbAppCat1W'));
		
		this.setFieldLabel(this.getComponent('cbAppCat1W'), labels.wizardobjectType);
		this.setFieldLabel(this.getComponent('cbAppCat2W'), labels.label_details_category);
		
		AIR.AirAclManager.setNecessity(this.getComponent('cbAppCat1W'));
		AIR.AirAclManager.setNecessity(this.getComponent('cbAppCat2W'));
		
		
		this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').updateLabels(labels);
		//...
//		this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateMiddlewareView').updateLabels(labels);
	}
	
});
Ext.reg('AIR.CiCreateWizardP1', AIR.CiCreateWizardP1);
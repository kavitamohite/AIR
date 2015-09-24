Ext.namespace('AIR');

AIR.CiCreateWizardP1 = Ext.extend(AIR.AirView, {
	initComponent: function() {
		var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
		shortlist = true;
		rolePersonListStore.each(function(item, index, allItems) {
			var value = item.data.roleName;
			if (value == AC.USER_ROLE_AIR_LOCATION_DATA_MAINTENANCE)
				shortlist = false;
		});
			
		Ext.apply(this, {
			layout: 'form',
			title: '-',

			labelWidth: 250,
			padding: 10,
			
			items: [{
				xtype: 'filterCombo',
				id: 'cbCiTypeW',
			    fieldLabel: 'Type',
			    
			    valueField: 'ciSubTypeId',
		        displayField: 'text',
		        editable: false,
		        lastQuery: '',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local',
		        
		        msgTarget: 'under',
		        width: 250,
		        
			    store: AIR.AirStoreFactory.createCiTypeListStore(shortlist)
		    },{
				xtype: 'filterCombo',
				id: 'cbAppCat2W',
			    fieldLabel: 'Category',
			    
			    valueField: 'id',
		        displayField: 'text',
				lastQuery: '',
		        
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        
		        mode: 'local',
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
			    }]
		    }]
		});
		
		AIR.CiCreateWizardP1.superclass.initComponent.call(this);
		
		var cbCiTypeW = this.getComponent('cbCiTypeW');
		cbCiTypeW.on('select', this.onCiTypeSelect, this);
		
		this.filterCiTypes(cbCiTypeW);
		
		var cbAppCat2W = this.getComponent('cbAppCat2W');
		cbAppCat2W.on('select', this.onAppCat2Select, this);
		cbAppCat2W.on('change', this.onAppCat2Change, this);
		var filterData = {
			applicationCat1Id: cbCiTypeW.getValue()
		};
		cbAppCat2W.filterByData(filterData);
		cbAppCat2W.getStore().sort('text', 'ASC');
		
		this.switchNameFields(false);
		
	},
	
	filterCiTypes: function(combo) {
		var ciTypesByRole = AAM.getCreationCiTypes();

		AAM.filterCiTypes(combo, ciTypesByRole);
		
	},
	
	onCiTypeSelect: function(combo, record, index) {
		if(record.get('ciTypeId') == AC.TABLE_ID_APPLICATION) {
			var data = {
				applicationCat1Id: record.get('ciSubTypeId')
			};
			
			this.update(data);
		} 
		
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
	
	update: function(data) {
		//reload cbAppCat2W...
		
		var cbAppCat2W = this.getComponent('cbAppCat2W');
		cbAppCat2W.filterByData(data);
		cbAppCat2W.getStore().sort('text', 'ASC');
		
		var r = cbAppCat2W.getStore().getAt(0);
		var v = data.applicationCat1Id == AC.APP_CAT1_APPLICATION ? AC.APP_CAT2_DEFAULT_UNKOWN : r.get('id');
		
		cbAppCat2W.setValue(v);

		//show/hide BAR relevance, Organisational Scope, Primary Person, Delegate, Steward
		var ciCreateAppMandatoryView = this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView');
		ciCreateAppMandatoryView.update(data);

	},
	
	setData: function(params) {
		params.applicationCat1Id = this.getComponent('cbCiTypeW').getValue();
		params.applicationCat2Id = this.getComponent('cbAppCat2W').getValue();
		params.isCat2Sap = this.isCat2Sap;
		
		this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').setData(params);
	},
	
	reset: function() {
		this.wizardStarted = true;
		this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').reset();
		this.isCat2Sap = false;
		
		var cbCiTypeW = this.getComponent('cbCiTypeW');
		var r = Util.getComboRecord(cbCiTypeW, 'ciTypeId', AC.TABLE_ID_APPLICATION);
		
		if(r) {
			cbCiTypeW.setValue(r.get('ciSubTypeId'));
			
			var data = {
				applicationCat1Id: r.get('ciSubTypeId')
			};
			this.update(data);
			
			//falls durch CI Auswahl mit Kat1 != Application eine für Application unpassende Kat2 Liste gefiltert wurde,
			//für den Wizard wieder zurücksetzen:
			this.getComponent('cbAppCat2W').getStore().filter('applicationCat1Id', r.get('ciSubTypeId'));//cbCiTypeW.getValue()
			this.getComponent('cbAppCat2W').setValue(AC.APP_CAT2_DEFAULT_UNKOWN);
			this.switchNameFields();
		}
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage1);
		
		//gehört hier eigentlich nicht hin. Da aber keine update Methode gibt und der IE diese cb zerschiesst 
		//oder gar nicht darstellt wenn cb mit den Attributen disabled: true, und hideTrigger: true konfiguriert wird:
		//AIR.AirAclManager.setAccessMode(this.getComponent('cbCiTypeW'), null); appDetail müsste übergeben werden, gibt es hier aber nicht
		
		//AIR 2.0 RFC 9022
//		Util.disableCombo(this.getComponent('cbCiTypeW'));
		
		this.setFieldLabel(this.getComponent('cbCiTypeW'), labels.wizardobjectType);
		this.setFieldLabel(this.getComponent('cbAppCat2W'), labels.label_details_category);
		
		AIR.AirAclManager.setNecessity(this.getComponent('cbCiTypeW'));
		AIR.AirAclManager.setNecessity(this.getComponent('cbAppCat2W'));
		
		
		this.getComponent('wizardCat1MandatoryPages').getComponent('ciCreateAppMandatoryView').updateLabels(labels);

	}
	
});
Ext.reg('AIR.CiCreateWizardP1', AIR.CiCreateWizardP1);
Ext.namespace('AIR');

AIR.ComplianceLinkView = Ext.extend(AIR.AirView, {//Ext.Panel
	
	initComponent: function() {
//		var linkCiTypeListStore = AIR.AirStoreManager.getStoreByName('linkCiTypeListStore');
//		var pComplianceLinkTypeConfig = AIR.AirUiFactory.createComplianceLinkTypeConfigPanel(labels, linkCiTypeListStore);//, AIR.AirStoreManager.getStoreByName('linkCiTypeListStore')
		
		var labels = AIR.AirApplicationManager.getLabels();
	
		Ext.apply(this, {
			layout: 'form',
			border: false,
			
			
			anchor: '95%',
			labelWidth: 130,
			
			style: {
				marginTop: 5
			},
		    
		    items: [{
	        	xtype: 'checkboxgroup',
	        	id: 'cbgComplianceLinkTypeRelevance',
	        	
	        	columns: 1,//1 3
//	        	fieldLabel: 'Relevance ICS',
	        	
//    			width: 200,
	        	anchor: '100%',
    			hideLabel: true,
    			disabled: true,
    			
    			items: [
			        { boxLabel: labels.RelevanceICSSecurityManagement, name: 'cbgComplianceLinkTypeRelevance'},//, width: 100 
			        { boxLabel: labels.RelevanceICSAccessManagement, name: 'cbgComplianceLinkTypeRelevance'},//, width: 100 
			        { boxLabel: labels.RelevanceICSITManagement, name: 'cbgComplianceLinkTypeRelevance'}//, width: 100 
		        ]
			},{
				xtype: 'filterCombo',//filterCombo combo
				id: 'cbLinkCiType',
				store: AIR.AirStoreManager.getStoreByName('linkCiTypeListStore'),//linkCiTypeListStore,//new Ext.data.Store(),//
				
				anchor: '100%',
//				flex: 7,
//				margins: '5 0 0 0',
				
				fieldLabel: labels.LinkCiType,
		        valueField: 'id',//id tableId
		        displayField: 'type',
		        
		        mode: 'local',
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false
		        
//		        editable: false
		        
		        //(*2) Release Defaultdeaktivierung
//		        disabled: true,
//		        hideTrigger: true
			},{
				xtype: 'filterCombo',//filterCombo combo
				id: 'cbLinkCiList',
				store: AIR.AirStoreFactory.createLinkCiListStore(),//new Ext.data.Store(),//
				
				anchor: '100%',
//				flex: 7,
//				margins: '5 0 0 0',
				
				fieldLabel: labels.LinkCi,
		        valueField: 'id',
		        displayField: 'name',
		        
		        mode: 'local',
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false
		        
//		        editable: false
		        
		        //(*2) Release Defaultdeaktivierung
//		        disabled: true,
//		        hideTrigger: true
			}
//	            pComplianceLinkTypeConfig
            ]
		});
		
		AIR.ComplianceLinkView.superclass.initComponent.call(this);
		
		this.addEvents('linkCiSelect', 'linkCiTypeSelect');
		
//		this.getComponent('cbLinkCiType').getStore().filter('language', AAM.getLanguage().toLowerCase());
		
		
		var cbLinkCiType = this.getComponent('cbLinkCiType');
		cbLinkCiType.on('select', this.onLinkCiTypeSelect, this);
		cbLinkCiType.on('change', this.onLinkCiTypeChange, this);
		
		var filterData = {
			language: AAM.getLanguage().toLowerCase()
		};
		cbLinkCiType.filterByData(filterData);
		
		var cbLinkCiList = this.getComponent('cbLinkCiList');
		cbLinkCiList.on('select', this.onLinkCiListSelect, this);
		cbLinkCiList.on('change', this.onLinkCiListChange, this);
	},
	
	
	onLinkCiTypeSelect: function(combo, record, index) {
		var ciTypeId = record.get('id');
		
		this.loadLinkCiList(ciTypeId);
	},
	
	onLinkCiTypeChange: function(combo, newValue, oldValue) {
		if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(newValue.length === 0) {
				this.clearLinkCISettings();
			} else {
				this.loadLinkCiList(newValue);
			}
		}
	},
	
	loadLinkCiList: function(ciTypeId, callback) {
		//hier schon zur Vermeidung von Fehlerfällen wenn Link CI-Typ ausgewählt, Massnahme auf unbearbeitet
		//zurücksetzen 
		this.fireEvent('linkCiTypeSelect');

		var params = {
			zielotypGSToolId: ciTypeId,
			itSetId: this.ciData.itSet,
			applicationId: this.ciData.ciId,
			massnahmeId: this.ciData.massnahmeGstoolId
//				applicationCat1Id: record.get('id')
		};
		
		if(this.isCiApplication())
			params.applicationCat1Id = ciTypeId;//this.ciData.applicationCat1Id;
		
//		this.linkCiSelected = callback ? false : true;
		
		var cbLinkCiList = this.getComponent('cbLinkCiList');
		cbLinkCiList.reset();
		cbLinkCiList.getStore().load({
			params: params,
			callback: callback ? callback : function() {}
		});
	},
	
	onLinkCiListSelect: function(combo, record, index) {
		var linkCiId = record.get('id');
		this.linkCiListSelected(linkCiId);
	},
	
	onLinkCiListChange: function(combo, newValue, oldValue) {
		/*if(this.isComboValueValid(combo, newValue, oldValue)) {
			if(newValue.length === 0) {
				this.clearLinkCISettings();
			} else {
				this.linkCiListSelected(newValue);
			}
		}
		Problem wenn this.linkCiListSelected(newValue); zweimal ausgeführt wird durch select und change wenn combo mittels
		select bedient wird. Durch das geworfene linkCiSelect event wird updateComplianceDetails und updateMassnahmenTable
		zweimal ausgeführt, was zu falschen/irritierenden compliant Status Änderungen in der Massnahmentabelle. 
		Daher das change erstmal deaktiviert. Evtl. ein flag nutzen um beides zu unterstützen. Siehe if(this.isLinkCiSelect)
		in updateComplianceDetails()
		*/
	},
	
	linkCiListSelected: function(linkCiId) {
		var cbLinkCiType = this.getComponent('cbLinkCiType');
		var linkCiTableId = cbLinkCiType.getStore().getAt(cbLinkCiType.getStore().findExact('id', cbLinkCiType.getValue())).get('tableId');//cbLinkCiType.getValue();//
		
//		if(this.linkCiSelected)// vorher auskommentiert
			this.fireEvent('linkCiSelect', linkCiId, linkCiTableId);//, this.ciData.massnahmeGstoolId
	},
	
	clearLinkCISettings: function() {
		var cbLinkCiType = this.getComponent('cbLinkCiType');
		var cbLinkCiList = this.getComponent('cbLinkCiList');
		
		cbLinkCiType.setValue('');
		cbLinkCiList.setValue('');
		cbLinkCiList.getStore().removeAll();
		
		this.fireEvent('linkCiSelect', '', '');
	},
	
//	setMassnahme: function(massnahmeId) {
//		this.massnahmeId = massnahmeId;
//	},
//	setCiData: function(ciData) {
//		this.ciData = ciData;
//	},
	
	isCiApplication: function(ciTypeId) {
		return AAM.getTableId() === AC.TABLE_ID_APPLICATION;
	},
	
	update: function(data) {
		this.ciData = data;
		
		//update relevance checkboxes, linkCiType, linkCi
	},
	
	setData: function(massnahmeDetail) {
		massnahmeDetail.linkCiType = '';
		massnahmeDetail.linkCi = '';
	},
	
	updateLabels: function(labels) {
		Util.setFieldLabel(this.getComponent('cbLinkCiType'), labels.LinkCiType);
		Util.setFieldLabel(this.getComponent('cbLinkCiList'), labels.LinkCi);
	}
});
Ext.reg('AIR.ComplianceLinkView', AIR.ComplianceLinkView);
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
		        valueField: 'id',
		        displayField: 'type',
		        
		        mode: 'local',
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        
		        editable: false
			},{
				xtype: 'combo',
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
		        lazyInit: false,
		        
		        editable: false
			}
//	            pComplianceLinkTypeConfig
            ]
		});
		
		AIR.ComplianceLinkView.superclass.initComponent.call(this);
		
		this.addEvents('linkCiSelect');
		
//		this.getComponent('cbLinkCiType').getStore().filter('language', AAM.getLanguage().toLowerCase());
		
		
		var cbLinkCiType = this.getComponent('cbLinkCiType');
		cbLinkCiType.on('select', this.onLinkCiTypeSelect, this);
		
		var filterData = {
			language: AAM.getLanguage().toLowerCase()
		};
		cbLinkCiType.filterByData(filterData);
		
		var cbLinkCiList = this.getComponent('cbLinkCiList');
		cbLinkCiList.on('select', this.onLinkCiListSelect, this);
	},
	
	
	onLinkCiTypeSelect: function(combo, record, index) {
		var ciTypeId = record.get('id');
		
		var params = {
			zielotypGSToolId: ciTypeId,
			itSetId: this.ciData.itSet,
			applicationId: this.ciData.ciId,
			massnahmeId: this.ciData.massnahmeGstoolId
//			applicationCat1Id: record.get('id')
		};
		
		if(this.isCiApplication())
			params.applicationCat1Id = this.ciData.applicationCat1Id;
		
		var cbLinkCiList = this.getComponent('cbLinkCiList');
		cbLinkCiList.getStore().load({
			params: params
		});
	},
	
	onLinkCiListSelect: function(combo, record, index) {
		var linkCiId = record.get('id');
		var cbLinkCiType = this.getComponent('cbLinkCiType');
		var linkCiTabledId = cbLinkCiType.getStore().getAt(cbLinkCiType.getStore().findExact('id', cbLinkCiType.getValue())).get('tableId');//record.get('tabledId');
		
		
//		var linkCiTabledId = cbLinkCiType.getStore().find('id', cbLinkCiType.getValue());//.get('tabledId');
		
		
		this.fireEvent('linkCiSelect', linkCiId, linkCiTabledId);//, this.ciData.massnahmeGstoolId
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
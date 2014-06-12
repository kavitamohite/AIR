Ext.namespace('AIR');

AIR.ComplianceControl1435Window = Ext.extend(Ext.Window, {
	constructor: function(referencesListStore, itSecGroupListStore, viewData) {
		this.referencesListStore = referencesListStore;
		this.itSecGroupListStore = itSecGroupListStore;
		this.viewData = viewData;
		
		AIR.ComplianceControlsWindow.superclass.constructor.call(this);
	},
	
	initComponent: function() {
		Ext.apply(this, {
			layout: 'fit',
			width: 410,
			height: 200,
			
//			bodyStyle: {
//				backgroundColor: AC.AIR_BG_COLOR
//			},
			
			plain: true,
			modal: true,
			closable: false,
			border: false,
			resizable: false,
			title: languagestore.getAt(0).data['compliance1435WindowTitle']+this.viewData.ciComplianceControlType,

			items: [{
				xtype: 'form',
				id: 'pLayout',
				border: false,
				padding: 5,
				defaults: { margins: '0 10 0 0' },
				
				items: [{
			    	xtype: 'textfield',
			        width: 230,
			        fieldLabel: languagestore.getAt(0).data['compliance1435WindowItSet'],//'It Set',
			        labelWidth: 200,
			        id: 'tfItsetName',
			        
			        value: this.viewData.itsetName,
			        
			        enableKeyEvents: true,
			        allowBlank: true,
//			        editable: false
			        disabled: true	// keine Änderung zulassen - nur ANZEIGE
				},{
			    	xtype: 'checkbox',
			        fieldLabel: languagestore.getAt(0).data['compliance1435WindowUseAsTemplate'],//'Use as template',
//			        labelWidth: 200,
//			        anchor: '100%',
			        id: 'cbIsTemplate',
			        checked: this.viewData.isTemplate,
			        disabled: true,	// keine Änderung zulassen - nur ANZEIGE
			        allowBlank: true
				}, {
					xtype: 'container',
					border: false,
					html: '&nbsp;'
				},{
					xtype: 'combo',
			        id: 'cbReferencedTemplate',
			        width: 280,
			        fieldLabel: languagestore.getAt(0).data['compliance1435WindowLink'],//'Link',
			        labelWidth: 200,
			        store: this.referencesListStore,
//			        valueField: 'id',
			        displayField: 'name',
			        value: this.viewData.link,
			        
			        triggerAction: 'all',
			        editable: false,
			        disabled: true
		    	},{
					xtype: 'combo',
			        id: 'cbItSecGroup',
			        width: 280,
			        fieldLabel: languagestore.getAt(0).data['compliance1435WindowItSecGroup'],//'ITSec Group',
			        labelWidth: 200,
			        store: this.itSecGroupListStore,
//			        valueField: 'itSecGroupId',
			        displayField: 'itSecGroupName',
			        value: this.viewData.itSecGroupText,
			        
			        triggerAction: 'all',
			        editable: false,
			        disabled: true
				}]
			}],
			
			buttonAlign: 'center',
			buttons: [/*{
				id: 'bComplianceControl1435Apply',
				text: 'Apply',
				handler: this.onApply.createDelegate(this)
			},*/ {
				id: 'bComplianceControl1435Cancel',
				text: languagestore.getAt(0).data['button_general_cancel'],//'Cancel',
				handler: this.onCancel.createDelegate(this)
			}]
		});
		
		AIR.ComplianceControl1435Window.superclass.initComponent.call(this);

//		this.addEvents('complianceControl1435Saved');
	},

	onApply: function(button, event) {
		//get formValues...
		this.fireEvent('complianceControl1435Saved', this);
	},
	
	onCancel: function(button, event) {
		this.close();
	},
	
	close: function() {
//		this.referencesListStore.destroy();
//		this.itSecGroupListStore.destroy();
		AIR.ComplianceControl1435Window.superclass.close.call(this);
	}
});
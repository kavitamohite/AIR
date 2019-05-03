Ext.namespace('AIR');

AIR.CiCreateWizardPage0 = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
//			title: 'Wizard',
			
		    layout: 'form',

//		    frame: true,//Hintergrundfarbe ist blau
		    bodyStyle: {
		    	padding: 5
//		    	backgroundColor: '#DFE8F6'
		    },
		    
		    items: [{
		    	xtype: 'label',
		        id: 'createIntroText',
		        	
		    	style: {
		    		fontSize: 12
		    	}
		    }, {
		    	xtype: 'checkbox',
		    	id: 'wizardcbskip',
		    	fieldLabel: 'Skip this page next time',//fieldLabel boxLabel
		    	
		    	labelStyle: 'width:180;margin-top:20;',//margin-top:20;
		    	
		    	
		    	style: {
//		    		paddingLeft: 0
		    		marginTop: 23
//		    		paddingRight: 100
		    	}
		    }]
		});
		
		AIR.CiCreateWizardPage0.superclass.initComponent.call(this);
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage0);
		
//		var createIntroText = this.getComponent('createIntroText');
//		this.getComponent('createIntroText').el.dom.innerHTML = labels['createIntroText'];
//		setBoxLabel('wizardcbskip', labels['wizardcbskip']);
		
//		this.getComponent('createIntroText').setText(labels.createIntroText);
		
		var lIntroText = this.getComponent('createIntroText');
		
		if(this.getComponent('createIntroText').getEl()) {
			lIntroText.el.dom.innerHTML = labels.createIntroText;
		} else {//vor dem Rendern
			lIntroText.html = labels.createIntroText;
		}
		
		this.setFieldLabel(this.getComponent('wizardcbskip'), labels.wizardcbskip);
	}
	
//	afterRender: function() {
//		var createIntroText = this.getComponent('createIntroText');
//		this.getComponent('createIntroText').el.dom.innerHTML = labels['createIntroText'];
//	},
	
//	setFieldLabel: function(comp, label) {
//		
//		if (Ext.getCmp(comp)!==undefined) {
//			label = label + (Ext.getCmp(comp).labelSeparator===undefined?'':Ext.getCmp(comp).labelSeparator);
//			Ext.getCmp(comp).el.up('.x-form-item', 10, true).child('.x-form-item-label').update(label);
//		}
//	},
//	
//	setBoxLabel: function(comp, label) {
//		if (Ext.getCmp(comp)!==undefined) {
//			Ext.getCmp(comp).el.dom.nextSibling.childNodes[0].nodeValue = label;
//		}
//	}
});
Ext.reg('AIR.CiCreateWizardPage0', AIR.CiCreateWizardPage0);
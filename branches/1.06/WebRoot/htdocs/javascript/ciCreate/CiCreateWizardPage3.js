Ext.namespace('AIR');

AIR.CiCreateWizardPage3 = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',

//		    frame: true,
		    bodyStyle: {
		    	padding: 5
//		    	backgroundColor: '#DFE8F6'//#DFE8F6 #99BBE8
		    },
		    
			labelWidth: 200,
		    
		    items: [{
		    	xtype: 'container',
		    	id: 'wizardStepThreeName',
		    	html: 'Name (Type)'
		    }, {
		    	xtype: 'container',
		    	html: '<hr>'
		    },{
		        xtype: 'fieldset',
		        id: 'wizardAppowner',
		        
		        layout: 'form',
		        
		        title: 'Application Owner',
		        labelWidth: 200,
		        
				items: [{
					xtype: 'panel',
					id: 'tbWizardAppowner',
					
					layout: 'hbox',//toolbar
					border: false,
					
					items: [{
						xtype: 'label',
						id: 'labelwizardapplicationOwner',
						width: 200,
						
						style: {
							fontSize: 12
						}
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
				    },{
				    	xtype: 'commandlink',
				    	id: 'wizardapplicationOwneraddimg',
				    	img: img_AddPerson
				    	
//				    	xtype: 'tbitem',
//				    	html: '<img src="' + img_AddPerson + '" onclick="createPersonPickerTip(event, \'wizardapplicationOwner\');" >',
//				    	id: 'wizardapplicationOwneraddimg',
//				    	disabled: false,
//				    	cls: 'aircontactbuttonenabled' 
				    }]
				},{
					xtype: 'container',
					id: 'tbWizardAppownerDelegate',
					
					layout: 'hbox',//toolbar
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelwizardapplicationOwnerDelegate',
						width: 200,
						
						style: {
							fontSize: 12
						}
						
//						xtype: 'container',
//						width: 200,
//						id: 'labelwizardapplicationOwnerDelegate',
//						html: 'Stewart/Delegate',
//						cls: 'x-form-item'
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
				    },{
				    	xtype: 'commandlink',
				    	id: 'wizardapplicationOwnerDelegateaddimg',
				    	img: img_AddPerson
				    	
//				    	xtype: 'tbitem',
//				    	html: '<img src="' + img_AddPerson + '" onclick="createPersonPickerTip(event, \'wizardapplicationOwnerDelegate\');" >',
//				    	id: 'wizardapplicationOwnerDelegateaddimg',
//				    	disabled: false,
//				    	cls: 'aircontactbuttonenabled' 
				    },{
				    	xtype: 'commandlink',
				    	id: 'wizardapplicationOwnerDelegateaddgroupimg',
				    	img: img_AddGroup
				    	
//				    	xtype: 'tbitem',
//				    	html: '<img src="' + img_AddGroup + '" onclick="createGroupPickerTip(event, \'wizardapplicationOwnerDelegate\', \'none\');" >',
//				    	id: 'wizardapplicationOwnerDelegateaddgroupimg',
//				    	disabled: false,
//				    	cls: 'aircontactbuttonenabled' 
				    }]
				}]
			},{
		        xtype: 'fieldset',
		        id: 'wizardCiowner',
		        
//		        layout: 'form',
		        
		        title: 'CI Owner',
		        
				items: [{
					xtype: 'container',
					id: 'tbWizardciResponsible',
					
					layout: 'hbox',//toolbar
					
					items: [{
						xtype: 'label',
						id: 'labelwizardciResponsible',
						width: 200,
						
						style: {
							fontSize: 12
						}
						
//						xtype: 'container',
//						width: 200,
//						id: 'labelwizardciResponsible',
//						html: 'Responsible',
//						cls: 'x-form-item'
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
				    },{
				    	xtype: 'commandlink',
				    	id: 'wizardciResponsibleaddimg',
				    	img: img_AddPerson
				    	
//				    	xtype: 'tbitem',
//				    	html: '<img src="' + img_AddPerson + '" onclick="createPersonPickerTip(event, \'wizardciResponsible\');" >',
//				    	id: 'wizardciResponsibleaddimg',
//				    	disabled: false,
//				    	cls: 'aircontactbuttonenabled' 
				    }]
				},{
					xtype: 'container',
					id: 'tbWizardciSubResponsible',
					
					layout: 'hbox',//toolbar
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelwizardciSubResponsible',
						width: 200,
						
						style: {
							fontSize: 12
						}
						
//						xtype: 'container',
//						width: 200,
//						id: 'labelwizardciSubResponsible',
//						html: 'SubResponsible',
//						cls: 'x-form-item'
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
				    },{
				    	xtype: 'commandlink',
				    	id: 'wizardciSubResponsibleaddimg',
				    	img: img_AddPerson
				    	
//				    	xtype: 'tbitem',
//				    	html: '<img src="' + img_AddPerson + '" onclick="createPersonPickerTip(event, \'wizardciSubResponsible\');" >',
//				    	id: 'wizardciSubResponsibleaddimg',
//				    	disabled: false,
//				    	cls: 'aircontactbuttonenabled' 
				    }, {
				    	xtype: 'commandlink',
				    	id: 'wizardciSubResponsibleaddgroupimg',
				    	img: img_AddGroup
				    	
//				    	xtype: 'tbitem',
//				    	html: '<img src="' + img_AddGroup + '" onclick="createGroupPickerTip(event, \'wizardciSubResponsible\', \'none\');" >',
//				    	id: 'wizardciSubResponsibleaddgroupimg',
//				    	disabled: false,
//				    	cls: 'aircontactbuttonenabled' 
				    }]
				}]
			}]
		});
		
		AIR.CiCreateWizardPage3.superclass.initComponent.call(this);
		
		var clWizardApplicationOwner = this.getComponent('wizardAppowner').getComponent('tbWizardAppowner').getComponent('wizardapplicationOwneraddimg');
		clWizardApplicationOwner.on('click', this.onAddWizardApplicationOwner, this);

		var clWizardApplicationOwnerDelegate = this.getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegateaddimg');
		var clWizardApplicationOwnerDelegateGroup = this.getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegateaddgroupimg');
		
		clWizardApplicationOwnerDelegate.on('click', this.onAddWizardApplicationOwnerDelegate, this);
		clWizardApplicationOwnerDelegateGroup.on('click', this.onAddWizardApplicationOwnerDelegateGroup, this);
		
		

		var clWizardCiResponsible = this.getComponent('wizardCiowner').getComponent('tbWizardciResponsible').getComponent('wizardciResponsibleaddimg');
		clWizardCiResponsible.on('click', this.onAddWizardCiResponsible, this);

		var clWizardCiSubResponsible = this.getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsibleaddimg');
		var clWizardCiSubResponsibleGroup = this.getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsibleaddgroupimg');
		
		clWizardCiSubResponsible.on('click', this.onAddWizardCiSubResponsible, this);
		clWizardCiSubResponsibleGroup.on('click', this.onAddWizardCiSubResponsibleGroup, this);
	},
	
	onAddWizardApplicationOwner: function(link, event) {
//		createPersonPickerTip(event, 'wizardapplicationOwner', {});//, {}: temp work around to avoid activation of save/cancel buttons
		AIR.AirPickerManager.openPersonPicker(
			Ext.emptyFn, this.getComponent('wizardAppowner').getComponent('tbWizardAppowner').getComponent('wizardapplicationOwner'), event);
	},
	
	onAddWizardApplicationOwnerDelegate: function(link, event) {
//		createPersonPickerTip(event, 'wizardapplicationOwnerDelegate', {});
		AIR.AirPickerManager.openPersonPicker(
			Ext.emptyFn, this.getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegate'), event);
	},
	
	onAddWizardApplicationOwnerDelegateGroup: function(link, event) {
//		createGroupPickerTip(event, 'wizardapplicationOwnerDelegate', 'none', {});
		AIR.AirPickerManager.openGroupPicker(
			Ext.emptyFn, this.getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('wizardapplicationOwnerDelegate'), event, 'none');
	},
	
	
	onAddWizardCiResponsible: function(link, event) {
//		createPersonPickerTip(event, 'wizardciResponsible', {});
		AIR.AirPickerManager.openPersonPicker(
			Ext.emptyFn, this.getComponent('wizardCiowner').getComponent('tbWizardciResponsible').getComponent('wizardciResponsible'), event);
	},
	
	onAddWizardCiSubResponsible: function(link, event) {
//		createPersonPickerTip(event, 'wizardciSubResponsible', {});
		AIR.AirPickerManager.openPersonPicker(
			Ext.emptyFn, this.getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsible'), event);
	},
	
	onAddWizardCiSubResponsibleGroup: function(link, event) {
//		createGroupPickerTip(event, 'wizardciSubResponsible', 'none', {});
		AIR.AirPickerManager.openGroupPicker(
			Ext.emptyFn, this.getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('wizardciSubResponsible'), event, 'none');
	},
	
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCreateWizardPage3);
		
		this.getComponent('wizardAppowner').setTitle(labels.wizardAppowner);
		this.getComponent('wizardAppowner').getComponent('tbWizardAppowner').getComponent('labelwizardapplicationOwner').setText(labels.labelwizardapplicationOwner);
		this.getComponent('wizardAppowner').getComponent('tbWizardAppownerDelegate').getComponent('labelwizardapplicationOwnerDelegate').setText(labels.labelwizardapplicationOwnerDelegate);
//		this.getComponent('wizardCiowner').setTitle(labels.wizardCiowner);
		this.getComponent('wizardCiowner').getComponent('tbWizardciResponsible').getComponent('labelwizardciResponsible').setText(labels.labelwizardciResponsible);
		this.getComponent('wizardCiowner').getComponent('tbWizardciSubResponsible').getComponent('labelwizardciSubResponsible').setText(labels.labelwizardciSubResponsible);
	},
	
	updateToolTips: function(toolTips) {
		
	}
});
Ext.reg('AIR.CiCreateWizardPage3', AIR.CiCreateWizardPage3);
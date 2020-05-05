Ext.namespace('AIR');

AIR.CiCreateInfoView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
//		    frame: false,

		    layout: 'form',
		    
		    border: false,
		    style: {
		    	fontSize: '12px'
		    },
		    
		    items: [{
		    	xtype: 'label',//container
		        id: 'cicreateIntroTextWizard'
//		        html: '<b>Wizard<b/><br/>Use the wizard to create a new item<br/>'
		    },{
				xtype: 'button',
				id: 'bWizardDelegate',
				text: 'Wizard'
			}/*,{
		    	xtype: 'container',
		        id: 'cicreateIntroTextBlank',
		        html: '<br/>'
		    }*/,{
		    	xtype: 'label',//container
		        id: 'cicreateIntroTextCopyFrom'
//		        html: '<b>Copy From<b/><br/>'
//		        	+ 'Use this function to copy an existing item.<br/>'
//		        	+ 'After the creation you can update the ci detail information.<br/>'
		    },{
				xtype: 'button',
				id: 'bCopyFromDelegate',
				text: 'Copy From'
			},{
		    	xtype: 'label',//container
		        id: 'cicreateIntroTextDelete'
//		        html: '<b>Delete</b><br/>Use the wizard to create delete an item<br/>'
		    },{
				xtype: 'button',
				id: 'bDeleteDelegate',
				text: 'Delete'
			}]
		});
		
		AIR.CiCreateInfoView.superclass.initComponent.call(this);
		
//		var bStartWizzard = this.getComponent('bWizardDelegate');
//		var bCopyFrom = this.getComponent('bCopyFromDelegate');
//		
//		bStartWizzard.on('click', this.startTheFunctionWizard, this);
//		bCopyFrom.on('click', this.startTheFunctionCopyFrom, this);
	},
	
	updateLabels: function(labels) {
		this.getComponent('cicreateIntroTextWizard').el.dom.innerHTML = labels.createstartpagewizardtext;//.setText(labels.createstartpagewizardtext);
//		this.getComponent('cicreateIntroTextWizard').setText(labels.createstartpagewizardtext);
		this.getComponent('bWizardDelegate').setText(labels.createstartpagewizardbutton);
		
		this.getComponent('cicreateIntroTextCopyFrom').el.dom.innerHTML = labels.createstartpagecopyfromtext;//.setText(labels.createstartpagecopyfromtext);
//		this.getComponent('cicreateIntroTextCopyFrom').setText(labels.createstartpagecopyfromtext);
		this.getComponent('bCopyFromDelegate').setText(labels.createstartpagecopyfrombutton);
		
		this.getComponent('cicreateIntroTextDelete').el.dom.innerHTML = labels.createstartpagedeletetext;//.setText(labels.createstartpagecopyfromtext);
//		this.getComponent('cicreateIntroTextDelete').setText(labels.createstartpagedeletetext);
		this.getComponent('bDeleteDelegate').setText(labels.createstartpagedeletebutton);
		
		
//		Ext.get('cicreateIntroTextWizard').dom.innerHTML = labels.createstartpagewizardtext;
//		Ext.getCmp('cicreateIntoWizardButton').setText(labels.createstartpagewizardbutton);
//		Ext.get('cicreateIntroTextCopyFrom').dom.innerHTML = labels.createstartpagecopyfromtext;
//		Ext.getCmp('cicreateIntoCopyFromButton').setText(labels.createstartpagecopyfrombutton);
	}
	
});
Ext.reg('AIR.CiCreateInfoView', AIR.CiCreateInfoView);
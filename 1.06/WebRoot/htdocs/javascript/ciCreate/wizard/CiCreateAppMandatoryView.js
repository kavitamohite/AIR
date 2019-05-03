Ext.namespace('AIR');

AIR.CiCreateAppMandatoryView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'form',
		    border: false,
		    
//			height: 300,
		    labelWidth: 250,//200 180
		    
		    items: [/*{
				xtype: 'combo',
				id: 'wizardapplicationCat2',
			    fieldLabel: 'Category',
			    valueField: 'id',
		        displayField: 'text',
		        
//		        typeAhead: true,
//		        forceSelection: true,
//		        autoSelect: false,
		        
//		        editable: false,
		        triggerAction: 'all',
		        lazyRender: true,
		        lazyInit: false,
		        
		        mode: 'local',
		        allowBlank: false,
		        width: 250,
		        msgTarget: 'under',
		        
		        store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore')
		    },{
		    	xtype: 'container',
		    	html: '&nbsp;'
		    },*/{
		    	xtype: 'textfield',
		        id: 'tfCiNameW',

		        width: 250,
		        fieldLabel: 'Name'

//		        allowBlank: false//true,
//		        vtype: 'allowedName',
//		        validationDelay: 500,//500 100
//		        msgTarget: 'under'
		    },{
	      		xtype: 'panel',
	    		id: 'pSapNameW',
	    		  
	    		layout: 'column',//fit
	    		border: false,
	    		hidden: true,

	    		style: {
	    			marginBottom: 4
	    		},
	    		  
	    		items: [{
	    			xtype: 'label',
	    			id: 'lSapName1W',
	    			
	    			width: 255,//205 185
	    			style: {
	    				fontSize: 12.5
	    			}
	    		},{
	        		xtype: 'textfield',
	        		id: 'tfSapName1W',
	        		  
	        		maskRe: /[0-9a-zA-Z#=\+\-\_\/\\. ]/,
	        		allowBlank: false,
	        		  
	    			width: 110
	        	}, {
	        		xtype: 'textfield',
	        		width: 20,
	    			value: 'M',
	    			disabled: true
	        	}, {
	        		xtype: 'textfield',
	        		id: 'tfSapName2W',
	        		  
	        		maskRe: /[0-9]/,
	        		vtype: 'numberLength',
	        		allowBlank: false,
	        		  
	    			width: 50
	        	}, {
	        		xtype: 'textfield',
	        		width: 20,
	    			value: 'C',
	    			disabled: true
	        	}, {
	        		xtype: 'textfield',
	        		id: 'tfSapName3W',
	        		  
	        		maskRe: /[0-9]/,
	        		vtype: 'numberLength',
	        		allowBlank: false,
	        		  
	    			width: 50
	    		}]
		    },{
		    	xtype: 'textarea',
		        width: 250,
		        height: 75,
		        
		        fieldLabel: 'Description',
		        id: 'taCiDescriptionW',//wizardcomments
		        allowBlank: true,
		        msgTarget: 'under'
		    },{
		        xtype: 'combo',
		        width: 250,
//		        anchor: '70%',//siehe (*1)
		        fieldLabel: 'Lifecycle',
		        
		        id: 'cbLifecycleStatusW',
		        store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),//lifecycleStatusListStore,
		        valueField: 'id',
		        displayField: 'text',
//		        editable: false,
		        
//		        typeAhead: true,
		        forceSelection: true,
//		        autoSelect: false,
		        
		        triggerAction: 'all',//all query
		        lazyRender: true,
		        lazyInit: false,
		        mode: 'local'
		    },{
		    	xtype: 'panel',
				id: 'pApplicationOwnerW',
				border: false,
				
				layout: 'column',//toolbar hbox
		        style: {
		        	marginTop: 20
		        },
				
				items: [{
					xtype: 'label',
					id: 'labeltfApplicationOwnerW',
					
					width: 255,//205 185
					style: {
						fontSize: 12.5
					}
	    		},{
					xtype: 'textfield',
			        width: 250,
			        id: 'tfApplicationOwnerW',//value: 'Pepping, Simon (ERCVA)',
			        readOnly: true
			    },{
					xtype: 'hidden',
			        id: 'tfApplicationOwnerWHidden' //value: 'ERCVA'
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerAdd',
			    	img: img_AddPerson
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerRemove',
			    	img: img_RemovePerson
			    }]
			},{
				xtype: 'panel',
				id: 'pApplicationOwnerDelegateW',
				border: false,
				
				layout: 'column',//toolbar hbox
				style: {
					marginTop: 5
				},
				
				items: [{
					xtype: 'label',
					id: 'labeltfApplicationOwnerDelegateW',
					
					width: 255,//205 185
					style: {
						fontSize: 12.5
					}
	    		},{
					xtype: 'textfield',
			        width: 250,
			        id: 'tfApplicationOwnerDelegateW',//value: 'Pepping, Simon (ERCVA)',
			        readOnly: true
			    },{
					xtype: 'hidden',
			        id: 'tfApplicationOwnerDelegateWHidden'//,value: 'ERCVA'
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerDelegateAdd',
			    	img: img_AddPerson
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerDelegateAddGroup',
			    	img: img_AddGroup
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerDelegateRemove',
			    	img: img_RemovePerson
			    }]
			}/*,{
		    	xtype: 'panel',
				id: 'pApplicationOwnerCompanyW',
				border: false,
				
				layout: 'column',//toolbar hbox
		        style: {
		        	marginTop: 5,
					marginBottom: 20
		        },
				
				items: [{
					xtype: 'label',
					id: 'labeltfApplicationOwnerCompanyW',
					
					width: 205,//185
					style: {
						fontSize: 12.5
					}
	    		},{
					xtype: 'textfield',
			        width: 250,
			        id: 'tfApplicationOwnerCompanyW',
			        readOnly: true
			    },{
					xtype: 'hidden',
			        id: 'tfApplicationOwnerCompanyWHidden'
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerCompanyAdd',
			    	img: img_AddPerson
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerCompanyAddGroup',
			    	img: img_AddGroup
			    },{
			    	xtype: 'commandlink',
			    	id: 'clApplicationOwnerCompanyRemove',
			    	img: img_RemovePerson
			    }]
			}*//*,{
		    	xtype: 'textfield',
		        id: 'tfApplicationIdW',

		        width: 250,
		        fieldLabel: 'Application ID',

		        allowBlank: true,
		        msgTarget: 'under'
			}*/]
		});
		
		AIR.CiCreateAppMandatoryView.superclass.initComponent.call(this);
		
		var clApplicationOwnerAdd = this.getComponent('pApplicationOwnerW').getComponent('clApplicationOwnerAdd');
		var clApplicationOwnerRemove = this.getComponent('pApplicationOwnerW').getComponent('clApplicationOwnerRemove');
		clApplicationOwnerAdd.on('click', this.onApplicationOwnerAdd, this);
		clApplicationOwnerRemove.on('click', this.onApplicationOwnerRemove, this);
		
		
		var clApplicationOwnerDelegateAdd = this.getComponent('pApplicationOwnerDelegateW').getComponent('clApplicationOwnerDelegateAdd');
		var clApplicationOwnerDelegateAddGroup = this.getComponent('pApplicationOwnerDelegateW').getComponent('clApplicationOwnerDelegateAddGroup');
		var clApplicationOwnerDelegateRemove = this.getComponent('pApplicationOwnerDelegateW').getComponent('clApplicationOwnerDelegateRemove');
		clApplicationOwnerDelegateAdd.on('click', this.onApplicationOwnerDelegateAdd, this);
		clApplicationOwnerDelegateAddGroup.on('click', this.onApplicationOwnerDelegateAddGroup, this);
		clApplicationOwnerDelegateRemove.on('click', this.onApplicationOwnerDelegateRemove, this);
		
		
//		var clApplicationOwnerCompanyAdd = this.getComponent('pApplicationOwnerCompanyW').getComponent('clApplicationOwnerCompanyAdd');
//		var clApplicationOwnerCompanyAddGroup = this.getComponent('pApplicationOwnerCompanyW').getComponent('clApplicationOwnerCompanyAddGroup');
//		var clApplicationOwnerCompanyRemove = this.getComponent('pApplicationOwnerCompanyW').getComponent('clApplicationOwnerCompanyRemove');
//		clApplicationOwnerCompanyAdd.on('click', this.onApplicationOwnerCompanyAdd, this);
//		clApplicationOwnerCompanyAddGroup.on('click', this.onApplicationOwnerCompanyAddGroup, this);
//		clApplicationOwnerCompanyRemove.on('click', this.onApplicationOwnerCompanyRemove, this);
	},
	
	onApplicationOwnerAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW'), event);
	},
	onApplicationOwnerRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW'), event);
	},
	
	
	onApplicationOwnerDelegateAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW'), event);
	},
	onApplicationOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW'), event, 'none');
	},
	onApplicationOwnerDelegateRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW'), event);
	},
	
	
//	onApplicationOwnerCompanyAdd: function(link, event) {
//		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW'), event);
//	},
//	onApplicationOwnerCompanyAddGroup: function(link, event) {
//		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW'), event, 'none');
//	},
//	onApplicationOwnerCompanyRemove: function(link, event) {
//		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW'), event);
//	},
	
	
	setData: function(params) {
//		switch(applicationCat1Id) {
//			case '':
			if(params.isCat2Sap) {
				var fieldValue = this.getComponent('pSapNameW').getComponent('tfSapName1W').getValue().trim()
								+ 'M' + this.getComponent('pSapNameW').getComponent('tfSapName2W').getValue()
								+ 'C' + this.getComponent('pSapNameW').getComponent('tfSapName3W').getValue();
				params.applicationName = fieldValue;
			} else {
				var field = this.getComponent('tfCiNameW');
				params.applicationName = field.getValue().trim();
			}
			
			params.comments = this.getComponent('taCiDescriptionW').getValue();
			params.lifecycleStatusId = this.getComponent('cbLifecycleStatusW').getValue();
			params.applicationOwnerHidden = this.getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerWHidden').getValue();
			params.applicationOwner = this.getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW').getValue();
			params.applicationOwnerDelegateHidden = this.getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateWHidden').getValue();
			params.applicationOwnerDelegate = this.getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW').getValue();
			delete params.isCat2Sap;
//				break;
//		}
		
	},
	
	reset: function() {
		this.getComponent('tfCiNameW').reset();
		this.getComponent('taCiDescriptionW').reset();
		this.getComponent('cbLifecycleStatusW').reset();
		
		this.getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerW').reset();
		this.getComponent('pApplicationOwnerW').getComponent('tfApplicationOwnerWHidden').reset();
		this.getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateW').reset();
		this.getComponent('pApplicationOwnerDelegateW').getComponent('tfApplicationOwnerDelegateWHidden').reset();
		
//		this.getComponent('pApplicationOwnerCompanyW').getComponent('tfApplicationOwnerCompanyW').reset();
//		this.getComponent('tfApplicationIdW').reset();
	},
	
	updateLabels: function(labels) {
		this.setFieldLabel(this.getComponent('tfCiNameW'), labels.wizardapplicationName);
		
		var sapNameLabel = labels.wizardapplicationNameSAP + ' (' + labels.wizardapplicationNameSAP1 + ', ' + labels.wizardapplicationNameSAP2 + ', ' + labels.wizardapplicationNameSAP3 + ')';
		var lSapName1W = this.getComponent('pSapNameW').getComponent('lSapName1W');
		lSapName1W.setText(sapNameLabel);
		
		this.setFieldLabel(this.getComponent('taCiDescriptionW'), labels.comments);
		
		
		AIR.AirAclManager.setNecessity(this.getComponent('tfCiNameW'));
		if(lSapName1W.getEl())
			AIR.AirAclManager.setNecessity(this.getComponent('pSapNameW').getComponent('lSapName1W'));
		AIR.AirAclManager.setNecessity(this.getComponent('taCiDescriptionW'));

		
		this.setFieldLabel(this.getComponent('cbLifecycleStatusW'), labels.lifecycleStatus);
		AIR.AirAclManager.setNecessity(this.getComponent('cbLifecycleStatusW'));
		
		
		this.getComponent('pApplicationOwnerW').getComponent('labeltfApplicationOwnerW').setText(labels.applicationOwner);//.el.dom.innerHTML = labels.applicationOwner;
		this.getComponent('pApplicationOwnerDelegateW').getComponent('labeltfApplicationOwnerDelegateW').setText(labels.applicationOwnerDelegate);//.el.dom.innerHTML = labels.applicationOwnerDelegate;

		AIR.AirAclManager.setNecessity(this.getComponent('pApplicationOwnerW').getComponent('labeltfApplicationOwnerW'));
		AIR.AirAclManager.setNecessity(this.getComponent('pApplicationOwnerDelegateW').getComponent('labeltfApplicationOwnerDelegateW'));
		
		
//		this.getComponent('pApplicationOwnerCompanyW').getComponent('labeltfApplicationOwnerCompanyW').setText(labels.labeltfApplicationOwnerCompanyW);
//		this.setFieldLabel(this.getComponent('tfApplicationIdW'), labels.tfApplicationIdW);
		
//		AIR.AirAclManager.setNecessity(this.getComponent('pApplicationOwnerCompanyW').getComponent('labeltfApplicationOwnerCompanyW'));
//		AIR.AirAclManager.setNecessity(this.getComponent('tfApplicationIdW'));

		
		
//		var sapNameLabel = labels.wizardapplicationNameSAP1 + ', ' + labels.wizardapplicationNameSAP2 + ', ' + labels.wizardapplicationNameSAP3;
//		this.setFieldLabel(this.getComponent('wizardapplicationNameSAP'), sapNameLabel);
//		this.setFieldLabel(this.getComponent('wizardapplicationName'), labels.wizardapplicationName);
//		this.getComponent('wizardapplicationName').validate();
	}


});
Ext.reg('AIR.CiCreateAppMandatoryView', AIR.CiCreateAppMandatoryView);
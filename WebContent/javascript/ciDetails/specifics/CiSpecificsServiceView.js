Ext.namespace('AIR');

/**
 * @author equuw
 * this  used to show specifics view for Service CI type
 */

AIR.CiSpecificsServiceView = Ext.extend(AIR.AirView, {
	initComponent: function(){
		Ext.apply(this,{
			labelWidth: 190,
			
			border: false,
			layout: 'form',
			height: 360,
			autoScroll: true,
			
			items: [
			        {
			        	id: 'tfServiceCiName',
			        	xtype: 'textfield',
			        	fieldLabel: 'Name',
			        	width: 230,
			        	enableKeyEvents: true			        	
			        },
			        {
			        	id: 'tfServiceCiAlias',
			        	xtype: 'textfield',
			        	fieldLabel: 'Alias',
			        	width: 230,
			        	enableKeyEvents: true
			        },
			        {
			        	id: 'tfServiceCiPrjectName',
			        	xtype: 'textfield',
			        	fieldLabel: 'Project Name',
			        	width: 230,
			        	enableKeyEvents: true
			        },
			        {
			        	id: 'lvServiceOrganisationalScope',
			        	xtype: 'listview',
				        store: AIR.AirStoreManager.getStoreByName('organisationalScopeListStore'),
			        	singleSelect: true,
			        	multiSelect: false,
			        	hideHeaders: true,
			        	border: false,
			        	width: 80,
			        	fieldLabel: 'Organisational Scope' ,
			        	
			        	columns: [
			        	          {dataIndex: 'id', hidden: true, hideLabel: true, width: .001},
			        	          {dataIndex: 'name'}
			        	          ]
			        },
			        {
			        	id: 'tfServiceCompanyCode',
			        	xtype: 'textfield',
			        	fieldLabel: 'Company Code',
			        	width: 230,
			        	enableKeyEvents: true
			        },
			        {
			        	id: 'tfServiceDescription',
			        	xtype: 'textarea',
			        	fieldLabel: 'description',
			        	width: 400,
			        	height: 50,
			        	allowBlank: true,
			        	autoScroll: true,
			        	enableKeyEvents: true			        				        		        		        	
			        }
			        
			        
			        ]
		
		});
		AIR.CiSpecificsServiceView.superclass.initComponent.call(this);
		this.addEvents('ciBeforeChange', 'ciChange');
		var tfServiceCiName = this.getComponent('tfServiceCiName');
		var tfServiceCiAlias = this.getComponent('tfServiceCiAlias');
		var tfServiceCiPrjectName = this.getComponent('tfServiceCiPrjectName');
		var lvServiceOrganisationalScope = this.getComponent('lvServiceOrganisationalScope');
		var tfServiceCompanyCode = this.getComponent('tfServiceCompanyCode');
		var tfServiceDescription = this.getComponent('tfServiceDescription');
		
		tfServiceCiName.on('change',this.onServiceNameChange,this);
		tfServiceCiAlias.on('change', this.onServiceAliasChange, this);
		tfServiceCiPrjectName.on('change', this.onServiceProjectNameChange, this);
		lvServiceOrganisationalScope.on('selectionchange', this.onServiceOrganisationScopeChane, this);
		tfServiceCompanyCode.on('change',this.onServiceCompanyCodeChange, this );
		tfServiceDescription.on('change',this.onServiceDescriptionChange, this);
		
	},
	
	init: function() {
		this.update(AAM.getAppDetail());
		this.updateAccessMode(AAM.getAppDetail());
	},
	onFieldKeyUp: function(textfield,event){
		this.ownerCt.fireEvent('ciChange',this,textfield);
	},
	onFieldChange: function(textfield,event){
		this.ownerCt.fireEvent('ciChage',this,textfield);
	},
	onServiceNameChange: function(textfield,newValue, oldValue){
		this.ownerCt.fireEvent('ciChange',this,textfield,newValue);
	},
	onServiceAliasChange: function(textfield,newValue, oldValue){
		this.ownerCt.fireEvent('ciChange',this,textfield,newValue);
	},
	onServiceProjectNameChange: function(textfield,newValue, oldValue){
		this.ownerCt.fireEvent('ciChange',this,textfield,newValue);
	},
	onServiceCompanyCodeChange: function(textfield,newValue, oldValue){
		this.ownerCt.fireEvent('ciChange',this,textfield,newValue);
	},
	onServiceDescriptionChange: function(textfield,newValue, oldValue){
		this.ownerCt.fireEvent('ciChange',this,textfield,newValue);
	},
	update: function(data) {

		
		var tfServiceCiName = this.getComponent('tfServiceCiName');
		var tfServiceCiAlias = this.getComponent('tfServiceCiAlias');
		var tfServiceCiPrjectName = this.getComponent('tfServiceCiPrjectName');
		var serviceOrganisationalScope = this.getComponent('lvServiceOrganisationalScope');
		var tfServiceCompanyCode = this.getComponent('tfServiceCompanyCode');
		var tfServiceDescription = this.getComponent('tfServiceDescription');
		
		tfServiceCiName.reset();
		tfServiceCiAlias.reset();
		tfServiceCiPrjectName.reset();
		serviceOrganisationalScope.clearSelections(true);
		tfServiceDescription.reset();
		tfServiceCompanyCode.reset();
		if(data.isCiCreate== undefined && !data.isCiCreate ){
			this.ciId = data.id;
			this.name = data.name;
			tfServiceCiName.setValue(data.name);
			tfServiceCiAlias.setValue(data.alias);
			tfServiceCiPrjectName.setValue(data.projectName);
			tfServiceDescription.setValue(data.serviceDescription);
			tfServiceCompanyCode.setValue(data.companyCode);
			var store = serviceOrganisationalScope.getStore();
			var orgScp = store.getAt(store.findExact('name', data.organisationalScope));
			serviceOrganisationalScope.select(orgScp,true,true);
		}
				
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('tfServiceCiName'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfServiceCiAlias'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfServiceCiPrjectName'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfServiceCompanyCode'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('tfServiceDescription'), data);


	},
	
	setData: function(data) {
		if(data.isCiCreate){
			data.id = 0;
		}else{
			data.id = this.ciId;
		}
		
		var field = this.getComponent('tfServiceCiName');
		if(field.getValue())
		   data.name = field.getValue();
		
		field = this.getComponent('tfServiceCiAlias');
		if(field.getValue())
			data.serviceAias = field.getValue();
		
		field = this.getComponent('tfServiceCiPrjectName');
		if(field.getValue())
			data.projectName = field.getValue();
		
		field = this.getComponent('lvServiceOrganisationalScope');
		if(field.getSelectedRecords().length>0)
			data.organisationalScope = field.getSelectedRecords()[0].get('id');;
		
		field = this.getComponent('tfServiceCompanyCode');
		if(field.getValue())
			data.companyCode = field.getValue();
		
		field = this.getComponent('tfServiceDescription');
		if(field.getValue())
			data.serviceDescription = field.getValue();
		
		
	},

	
	validate: function(item) {
		
	},
	
	updateLabels: function(labels) {

	},
	
	updateToolTips: function(toolTips) {

	}
	
});
Ext.reg('AIR.CiSpecificsServiceView', AIR.CiSpecificsServiceView);
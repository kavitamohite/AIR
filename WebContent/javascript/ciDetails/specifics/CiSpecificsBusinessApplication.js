Ext.namespace('AIR');

/**
 * @author equuw
 * this  used to show specifics view for Service CI type
 */

AIR.CiSpecificsBusinessApplication = Ext.extend(AIR.AirView, {
	initComponent: function(){
		Ext.apply(this,{
			labelWidth: 190,
			
			border: false,
			layout: 'form',
			height: 360,
			autoScroll: true,
			
			items: [
			        {
			        	id: 'baServiceCiName',
			        	xtype: 'textfield',
			        	fieldLabel: 'Name',
			        	width: 230,
			        	disabled: true
			        },
			        {
				    	xtype: 'textfield',
				        width: 230,
				        fieldLabel: 'BAR Id',
				        id: 'baServiceBarAppId',
				        disabled: true,
				       
					},
			        {
			        	id: 'baServiceCiAlias',
			        	xtype: 'textfield',
			        	fieldLabel: 'Alias',
			        	width: 230,
			        	disabled: true
			        },
			      
			        {
			        	id: 'baServiceDescription',
			        	xtype: 'textarea',
			        	fieldLabel: 'description',
			        	width: 400,
			        	height: 50,
			        	allowBlank: true,
			        	autoScroll: true,
			        	disabled: true			        				        		        		        	
			        },
			        {
						xtype: 'filterCombo',//combo
				        id: 'baItSystemLifecycleStatus',
						
				        width: 230,
				        fieldLabel: 'Lifecycle',
						
				        
						lastQuery: '',
				        store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),
				        valueField: 'id',
				        displayField: 'text',
				        
				        triggerAction: 'all',
				        lazyRender: true,
				        lazyInit: false,
				        mode: 'local',
				        disabled: true
					},
					{
				    	xtype: 'checkbox',
				    	fieldLabel: 'Externally Hosted',
					    id: 'baServiceExternallyHosted',
					    disabled: true,
			    	    margins: '5 0 10 0'
			    	},
					/* {
				    	xtype: 'textfield',
				        width: 230,
				        fieldLabel: 'Externally Hosted',
				        id: 'baServiceExternallyHosted',
				        disabled: true,
				       
					},*/
					 {
				    	xtype: 'textfield',
				        width: 230,
				        fieldLabel: 'Last Modification',
				        id: 'baServiceLastModification',
				        disabled: true,
				       
					},
					
					]
		
		});
		AIR.CiSpecificsBusinessApplication.superclass.initComponent.call(this);
		this.addEvents('ciBeforeChange', 'ciChange');
		var baServiceCiName = this.getComponent('baServiceCiName');
		var baServiceCiAlias = this.getComponent('baServiceCiAlias');
		
		var baServiceDescription = this.getComponent('baServiceDescription');
		var baItSystemLifecycleStatus = this.getComponent('baItSystemLifecycleStatus');
		
	
		
		
	
		
		
		
		
		
		
	},
	
	init: function() {
		this.update(AAM.getAppDetail());
		
	},
	
	

	
	update: function(data) {

		
		var baServiceCiName = this.getComponent('baServiceCiName');
		var baServiceCiAlias = this.getComponent('baServiceCiAlias');
		
		var baServiceDescription = this.getComponent('baServiceDescription');
		var baItSystemLifecycleStatus = this.getComponent('baItSystemLifecycleStatus');
		var baApplicationUsingRegionsW = this.getComponent('baApplicationUsingRegionsW');
		var baServiceBarAppId = this.getComponent('baServiceBarAppId');	
		var baServiceExternallyHosted = this.getComponent('baServiceExternallyHosted');	
		var baServiceLastModification = this.getComponent('baServiceLastModification');	
		
		
		if (data.lifecycleStatusId && data.lifecycleStatusId != 0) {
			baItSystemLifecycleStatus.setValue(data.lifecycleStatusId);
		} else {
			baItSystemLifecycleStatus.setValue('');
		}
		
		baServiceCiName.reset();
		baServiceCiAlias.reset();
		
		baServiceDescription.reset();
		baItSystemLifecycleStatus.reset();
		baServiceBarAppId.reset();
		baServiceLastModification.reset();
		baServiceExternallyHosted.reset();
		
		// Updated by ENFZM===Need to update once data for BUSSINESS APPLICATION is available in lifecycle sub status table.
		
		/*var filterData = { tableId: data.tableId };
		baItSystemLifecycleStatus.filterByData(filterData);*/
		
		if(data.isCiCreate== undefined && !data.isCiCreate ){
			this.ciId = data.id;
			this.name = data.applicationName;
			baServiceCiName.setValue(data.name);
			baServiceCiAlias.setValue(data.alias);
			baServiceDescription.setValue(data.applicationDescription);
			baItSystemLifecycleStatus.setValue(data.lifecycleStatusId);
			baServiceBarAppId.setValue(data.barAppId);
			baServiceLastModification.setValue(data.lastModification);
			var isExternallyHosted = data.externallyHosted == '-1';
			baServiceExternallyHosted.setValue(isExternallyHosted);
			
		}
		
		
	},
	
	/*updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('baServiceCiName'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('baServiceCiAlias'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('baServiceOrganisationalScope'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('baServiceDescription'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('baItSystemLifecycleStatus'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('bBusiness').getComponent('businessProcess'), data);

	},
	*/
	
	updateLabels : function(labels){
		
	}
	
	
});
Ext.reg('AIR.CiSpecificsBusinessApplication', AIR.CiSpecificsBusinessApplication);
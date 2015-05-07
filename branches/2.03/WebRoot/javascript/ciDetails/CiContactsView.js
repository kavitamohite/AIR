Ext.namespace('AIR');

AIR.CiContactsView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		
		// The Mapping between Transbase V_MD_GROUP_TYPE und local field names
		this.groupTypeMapping = new Array(
				new Array('SUPPORT GROUP - IM RESOLVER', 		'gpsccontactSupportGroup'),
				new Array('CHANGE TEAM', 						'gpsccontactChangeTeam'),
				new Array('SERVICE COORDINATOR', 				'gpsccontactServiceCoordinator'),
				new Array('ESCALATION LIST', 					'gpsccontactEscalation'),
				new Array('CI OWNER', 							'gpsccontactCiOwner'),
				new Array('OWNING BUSINESS GROUP', 				'gpsccontactOwningBusinessGroup'),
				new Array('IMPLEMENTATION TEAM', 				'gpsccontactImplementationTeam'),
				new Array('(INDIV) SERVICE COORDINATOR', 		'gpsccontactServiceCoordinatorIndiv'),
				new Array('(INDIV) ESCALATION LIST', 			'gpsccontactEscalationIndiv'),
				new Array('RESPONSIBLE AT CUSTOMER SIDE', 		'gpsccontactResponsibleAtCustomerSide'),
				new Array('SYSTEM RESPONSIBLE', 				'gpsccontactSystemResponsible'),
				new Array('Impacted Business Group', 			'gpsccontactImpactedBusiness'),
				new Array('Business Owner Representative', 		'gpsccontactBusinessOwnerRepresentative')
							
				
		);
		
		this.gpscContactsMap = [
    	    '', // 0 not mapped
           	'gpsccontactSupportGroup', // 1
           	'gpsccontactChangeTeam', //2
           	'gpsccontactServiceCoordinator', //3
           	'gpsccontactEscalation', //4
           	'gpsccontactCiOwner', //5
           	'gpsccontactOwningBusinessGroup', //6
           	'', // 7 not mapped
           	'gpsccontactImplementationTeam', //8
           	'gpsccontactServiceCoordinatorIndiv', //9
           	'gpsccontactEscalationIndiv', //10
           	'gpsccontactResponsibleAtCustomerSide', //11
           	'', // 12 not mapped
           	'gpsccontactSystemResponsible', //13
           	'gpsccontactImpactedBusiness', //14
           	'gpsccontactBusinessOwnerRepresentative', //15
       	];
		
		var taWidth = Ext.isIE ? 224 : 230;//230 224 wegen IE und index.html DOCTYPE! Dies hat Auswirkungen auf die Breite der textarea
		
		
		var appOwnerStewardFieldsets = AIR.AirUiFactory.createAppOwnerStewardFieldsets('');
		
		Ext.apply(this, {
		    title: 'Contacts',
		    layout: 'form',
		    border: false,
//		    bodyStyle: 'padding:10px',
//		    autoScroll: true,
		    
			height: 360,//900 600
			autoScroll: true,
		    
		    items: [
		        appOwnerStewardFieldsets.fsApplicationOwner,
		        appOwnerStewardFieldsets.fsApplicationSteward,
		        appOwnerStewardFieldsets.fsCIOwner,
		        
		       //new vandana
		        {
					xtype: 'fieldset',
				    id: 'provider',
				    title:'PROVIDER',
				   layout: 'column',//toolbar
				   labelWidth: 200,
				   anchor: '90%',
				    
					items: [
					{
	xtype: 'container',
	id: 'pProviderName',
	layout: 'column',
	
	
	items: [
{
	xtype: 'label',
	id: 'labelProviderName',
	width: 200,
						style: {
							fontSize: 12
						}
		    			},	
						{
					xtype: 'textfield',
					id:'idProviderName',
					allowBlank: true ,
					 width: 230,
					style: {
						fontSize: 12
					
	    		}} , {
					xtype: 'hidden',
			        id: 'idProviderNameHidden'
			    
				}      
	
]
	},{
	
		xtype: 'container',
		id: 'pProviderAddress',
	layout: 'column',
	width: 500,
		
		items: [
	{
		xtype: 'label',
		id: 'labelProviderAddress',
						
						width: 200,
						style: {
							fontSize: 12
						}

	},	        
		       {
					xtype: 'textfield',
					id:'idProviderAddress',
					allowBlank: true ,
					 width: 230,
					style: {
						fontSize: 12,
					    'margin-top': '5px'
					
	    		}},{
		xtype: 'hidden',
	    id: 'PidroviderAddressHidden' 
	}
	]}]
		},
		        //end vandana
	        {
		        xtype: 'fieldset',
		        id: 'contactsGPSC',
		        title: 'GPSC contacts',
		        labelWidth: 200,
		        //autoScroll: true,
		        anchor: '90%',
		        
				items: [{
					xtype: 'container',
					id: 'pGpsccontactResponsibleAtCustomerSide',
					
					layout: 'column',//toolbar
//					width: 500,
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactResponsibleAtCustomerSide',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
				        width: taWidth,
				        id: 'gpsccontactResponsibleAtCustomerSide',
				        
				        height: 50,
				        autoScroll: true,
				        allowBlank: true,
				        disabled: false,
				        readOnly: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactResponsibleAtCustomerSideHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactResponsibleAtCustomerSideAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactResponsibleAtCustomerSideRemove',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactCiOwner',

					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactCiOwner',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'gpsccontactCiOwner',
				        allowBlank: true,
				        disabled: false,
				        readOnly: true,
				        minContacts: 1,
				        maxContacts: 1
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactCiOwnerHidden'
				    },
//				    {xtype: 'tbtext', html:'&nbsp;'},
				    {
				    	xtype: 'commandlink',
				    	id: 'gpsccontactCiOwnerAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactCiOwnerRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactSystemResponsible',

					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactSystemResponsible',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',//
						width: taWidth,
				        id: 'gpsccontactSystemResponsible',
				        allowBlank: true,
				        disabled: false,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactSystemResponsibleHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactSystemResponsibleAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactSystemResponsibleRemove',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactSupportGroup',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactSupportGroup',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'gpsccontactSupportGroup',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        minContacts: 1,
				        maxContacts: 1
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactSupportGroupHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactSupportGroupAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactSupportGroupRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactChangeTeam',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactChangeTeam',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'gpsccontactChangeTeam',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        minContacts: 0,
				        maxContacts: 1
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactChangeTeamHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactChangeTeamAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactChangeTeamRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactServiceCoordinator',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactServiceCoordinator',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: taWidth,
				        id: 'gpsccontactServiceCoordinator',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactServiceCoordinatorHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactServiceCoordinatorAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactServiceCoordinatorRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactServiceCoordinatorIndiv',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactServiceCoordinatorIndiv',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: taWidth,
				        id: 'gpsccontactServiceCoordinatorIndiv',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactServiceCoordinatorIndivHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactServiceCoordinatorIndivAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactServiceCoordinatorIndivRemove',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactImplementationTeam',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactImplementationTeam',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'gpsccontactImplementationTeam',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        minContacts: 0,
				        maxContacts: 1
				    },
				    {
						xtype: 'hidden',
				        id: 'gpsccontactImplementationTeamHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactImplementationTeamAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactImplementationTeamRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactEscalation',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactEscalation',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: taWidth,
				        id: 'gpsccontactEscalation',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },
				    {
						xtype: 'hidden',
				        id: 'gpsccontactEscalationHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactEscalationAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactEscalationRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactEscalationIndiv',

					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactEscalationIndiv',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: taWidth,
				        id: 'gpsccontactEscalationIndiv',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactEscalationIndivHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactEscalationIndivAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactEscalationIndivRemove',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactImpactedBusiness',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactImpactedBusiness',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: taWidth,
				        id: 'gpsccontactImpactedBusiness',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },
				    {
						xtype: 'hidden',
				        id: 'gpsccontactImpactedBusinessHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactImpactedBusinessAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactImpactedBusinessRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactOwningBusinessGroup',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactOwningBusinessGroup',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textarea',
						width: taWidth,
				        id: 'gpsccontactOwningBusinessGroup',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        
				        height: 50,
				        autoScroll: true,
				        minContacts: 0,
				        maxContacts: 99999
				    },
				    {
						xtype: 'hidden',
				        id: 'gpsccontactOwningBusinessGroupHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactOwningBusinessGroupAdd',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactOwningBusinessGroupRemove',
				    	img: img_RemoveGroup
				    }]
				},{
					xtype: 'container',
					id: 'pGpsccontactBusinessOwnerRepresentative',
					
					layout: 'column',//toolbar
//					width: 500,
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelgpsccontactBusinessOwnerRepresentative',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'gpsccontactBusinessOwnerRepresentative',
				        allowBlank: true,
				        disabled: true,
				        readOnly: true,
				        minContacts: 0,
				        maxContacts: 1
				    },{
						xtype: 'hidden',
				        id: 'gpsccontactBusinessOwnerRepresentativeHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactBusinessOwnerRepresentativeAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactBusinessOwnerRepresentativeRemove',
				    	img: img_RemovePerson
				    }]
				}]
		    }]
		});
		
		AIR.CiContactsView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange', 'afterCiUpdate');
		
		var pApplicationOwner = this.getComponent('fsApplicationOwner').getComponent('pApplicationOwner');
		var clApplicationOwnerAdd = pApplicationOwner.getComponent('applicationOwnerAdd');
		var clApplicationOwnerRemove = pApplicationOwner.getComponent('applicationOwnerRemove');
		clApplicationOwnerAdd.on('click', this.onApplicationOwnerAdd, this);
		clApplicationOwnerRemove.on('click', this.onApplicationOwnerRemove, this);
		
		var pApplicationSteward = this.getComponent('fsApplicationSteward').getComponent('pApplicationSteward');//fsApplicationOwner
		var clApplicationStewardAdd = pApplicationSteward.getComponent('applicationStewardAdd');
		var clApplicationStewardRemove = pApplicationSteward.getComponent('applicationStewardRemove');
		clApplicationStewardAdd.on('click', this.onApplicationStewardAdd, this);
		clApplicationStewardRemove.on('click', this.onApplicationStewardRemove, this);
		
		
		var pApplicationOwnerDelegate = this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate');
		var clApplicationOwnerDelegateAdd = pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateAdd');
		var clApplicationOwnerDelegateAddgroup = pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateAddGroup');
		var clApplicationOwnerDelegateRemove = pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateRemove');
		clApplicationOwnerDelegateAdd.on('click', this.onApplicationOwnerDelegateAdd, this);
		clApplicationOwnerDelegateAddgroup.on('click', this.onApplicationOwnerDelegateAddgroup, this);
		clApplicationOwnerDelegateRemove.on('click', this.onApplicationOwnerDelegateRemove, this);
		
		
		var pCIOwner = this.getComponent('fsCIOwner').getComponent('pCIOwner');
		var clCiResponsibleAdd = pCIOwner.getComponent('ciResponsibleAdd');
		var clCiResponsibleRemove = pCIOwner.getComponent('ciResponsibleRemove');
		clCiResponsibleAdd.on('click', this.onCiResponsibleAdd, this);
		clCiResponsibleRemove.on('click', this.onCiResponsibleRemove, this);
		
		var pCiSubResponsible = this.getComponent('fsCIOwner').getComponent('pCiSubResponsible');
		var clCiSubResponsibleAdd = pCiSubResponsible.getComponent('ciSubResponsibleAdd');
		var clCiSubResponsibleAddgroup = pCiSubResponsible.getComponent('ciSubResponsibleAddGroup');
		var clCiSubResponsibleRemove = pCiSubResponsible.getComponent('ciSubResponsibleRemove');
		clCiSubResponsibleAdd.on('click', this.onCiSubResponsibleAdd, this);
		clCiSubResponsibleAddgroup.on('click', this.onCiSubResponsibleAddgroup, this);
		clCiSubResponsibleRemove.on('click', this.onCiSubResponsibleRemove, this);
		
		//added vandana
		var pProviderName = this.getComponent('provider').getComponent('pProviderName');
		var pProviderAddress = this.getComponent('provider').getComponent('pProviderAddress');
		
		//ended vandana
		var pGpsccontactResponsibleAtCustomerSide = this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide');
		var clGpsccontactResponsibleAtCustomerSideAdd = pGpsccontactResponsibleAtCustomerSide.getComponent('gpsccontactResponsibleAtCustomerSideAdd');
		var clGpsccontactResponsibleAtCustomerSideRemove = pGpsccontactResponsibleAtCustomerSide.getComponent('gpsccontactResponsibleAtCustomerSideRemove');
		clGpsccontactResponsibleAtCustomerSideAdd.on('click', this.onGpsccontactResponsibleAtCustomerSideAdd, this);
		clGpsccontactResponsibleAtCustomerSideRemove.on('click', this.onGpsccontactResponsibleAtCustomerSideRemove, this);
		
		var pGpsccontactCiOwner = this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner');
		var clGpsccontactCiOwnerAdd = pGpsccontactCiOwner.getComponent('gpsccontactCiOwnerAdd');
		var clGpsccontactCiOwnerRemove = pGpsccontactCiOwner.getComponent('gpsccontactCiOwnerRemove');
		clGpsccontactCiOwnerAdd.on('click', this.onGpsccontactCiOwnerAdd, this);
		clGpsccontactCiOwnerRemove.on('click', this.onGpsccontactCiOwnerRemove, this);
		
		var pGpsccontactSystemResponsible = this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible');
		var clGpsccontactSystemResponsibleAdd = pGpsccontactSystemResponsible.getComponent('gpsccontactSystemResponsibleAdd');
		var clGpsccontactSystemResponsibleRemove = pGpsccontactSystemResponsible.getComponent('gpsccontactSystemResponsibleRemove');
		clGpsccontactSystemResponsibleAdd.on('click', this.onGpsccontactSystemResponsibleAdd, this);
		clGpsccontactSystemResponsibleRemove.on('click', this.onGpsccontactSystemResponsibleRemove, this);
		
		var pGpsccontactSupportGroup = this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup');
		var clGpsccontactSupportGroupAdd = pGpsccontactSupportGroup.getComponent('gpsccontactSupportGroupAdd');
		var clGpsccontactSupportGroupRemove = pGpsccontactSupportGroup.getComponent('gpsccontactSupportGroupRemove');
		clGpsccontactSupportGroupAdd.on('click', this.onGpsccontactSupportGroupAdd, this);
		clGpsccontactSupportGroupRemove.on('click', this.onGpsccontactSupportGroupRemove, this);
		
		var pGpsccontactChangeTeam = this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam');
		var clGpsccontactChangeTeamAdd = pGpsccontactChangeTeam.getComponent('gpsccontactChangeTeamAdd');
		var clGpsccontactChangeTeamRemove = pGpsccontactChangeTeam.getComponent('gpsccontactChangeTeamRemove');
		clGpsccontactChangeTeamAdd.on('click', this.onGpsccontactChangeTeamAdd, this);
		clGpsccontactChangeTeamRemove.on('click', this.onGpsccontactChangeTeamRemove, this);
		
		var pGpsccontactServiceCoordinator = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator');
		var clGpsccontactServiceCoordinatorAdd = pGpsccontactServiceCoordinator.getComponent('gpsccontactServiceCoordinatorAdd');
		var clGpsccontactServiceCoordinatorRemove = pGpsccontactServiceCoordinator.getComponent('gpsccontactServiceCoordinatorRemove');
		clGpsccontactServiceCoordinatorAdd.on('click', this.onGpsccontactServiceCoordinatorAdd, this);
		clGpsccontactServiceCoordinatorRemove.on('click', this.onGpsccontactServiceCoordinatorRemove, this);
		
		var pGpsccontactServiceCoordinatorIndiv = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv');
		var clGpsccontactServiceCoordinatorIndivAdd = pGpsccontactServiceCoordinatorIndiv.getComponent('gpsccontactServiceCoordinatorIndivAdd');
		var clGpsccontactServiceCoordinatorIndivRemove = pGpsccontactServiceCoordinatorIndiv.getComponent('gpsccontactServiceCoordinatorIndivRemove');
		clGpsccontactServiceCoordinatorIndivAdd.on('click', this.onGpsccontactServiceCoordinatorIndivAdd, this);
		clGpsccontactServiceCoordinatorIndivRemove.on('click', this.onGpsccontactServiceCoordinatorIndivRemove, this);
		
		var pGpsccontactImplementationTeam = this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam');
		var clGpsccontactImplementationTeamAdd = pGpsccontactImplementationTeam.getComponent('gpsccontactImplementationTeamAdd');
		var clGpsccontactImplementationTeamRemove = pGpsccontactImplementationTeam.getComponent('gpsccontactImplementationTeamRemove');
		clGpsccontactImplementationTeamAdd.on('click', this.onGpsccontactImplementationTeamAdd, this);
		clGpsccontactImplementationTeamRemove.on('click', this.onGpsccontactImplementationTeamRemove, this);
		
		var pGpsccontactEscalation = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation');
		var clGpsccontactEscalationAdd = pGpsccontactEscalation.getComponent('gpsccontactEscalationAdd');
		var clGpsccontactEscalationRemove = pGpsccontactEscalation.getComponent('gpsccontactEscalationRemove');
		clGpsccontactEscalationAdd.on('click', this.onGpsccontactEscalationAdd, this);
		clGpsccontactEscalationRemove.on('click', this.onGpsccontactEscalationRemove, this);
		
		var pGpsccontactEscalationIndiv = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv');
		var clGpsccontactEscalationIndivAdd = pGpsccontactEscalationIndiv.getComponent('gpsccontactEscalationIndivAdd');
		var clGpsccontactEscalationIndivRemove = pGpsccontactEscalationIndiv.getComponent('gpsccontactEscalationIndivRemove');
		clGpsccontactEscalationIndivAdd.on('click', this.onGpsccontactEscalationIndivAdd, this);
		clGpsccontactEscalationIndivRemove.on('click', this.onGpsccontactEscalationIndivRemove, this);
		
		var pGpsccontactImpactedBusiness = this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness');
		var clGpsccontactImpactedBusinessAdd = pGpsccontactImpactedBusiness.getComponent('gpsccontactImpactedBusinessAdd');
		var clGpsccontactImpactedBusinessRemove = pGpsccontactImpactedBusiness.getComponent('gpsccontactImpactedBusinessRemove');
		clGpsccontactImpactedBusinessAdd.on('click', this.onGpsccontactImpactedBusinessAdd, this);
		clGpsccontactImpactedBusinessRemove.on('click', this.onGpsccontactImpactedBusinessRemove, this);
		
		var pGpsccontactOwningBusinessGroup = this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup');
		var clGpsccontactOwningBusinessGroupAdd = pGpsccontactOwningBusinessGroup.getComponent('gpsccontactOwningBusinessGroupAdd');
		var clGpsccontactOwningBusinessGroupRemove = pGpsccontactOwningBusinessGroup.getComponent('gpsccontactOwningBusinessGroupRemove');
		clGpsccontactOwningBusinessGroupAdd.on('click', this.onGpsccontactOwningBusinessGroupAdd, this);
		clGpsccontactOwningBusinessGroupRemove.on('click', this.onGpsccontactOwningBusinessGroupRemove, this);
		
		var pGpsccontactBusinessOwnerRepresentative = this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative');
		var clGpsccontactBusinessOwnerRepresentativeAdd = pGpsccontactBusinessOwnerRepresentative.getComponent('gpsccontactBusinessOwnerRepresentativeAdd');
		var clGpsccontactBusinessOwnerRepresentativeRemove = pGpsccontactBusinessOwnerRepresentative.getComponent('gpsccontactBusinessOwnerRepresentativeRemove');
		clGpsccontactBusinessOwnerRepresentativeAdd.on('click', this.onGpsccontactBusinessOwnerRepresentativeAdd, this);
		clGpsccontactBusinessOwnerRepresentativeRemove.on('click', this.onGpsccontactBusinessOwnerRepresentativeRemove, this);
	},
	
	onGpsccontactBusinessOwnerRepresentativeAdd: function(link, event) {
//		createPersonPickerTip(event, 'gpsccontactBusinessOwnerRepresentative');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentative'), event);
	},
	onGpsccontactBusinessOwnerRepresentativeRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactBusinessOwnerRepresentative');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentative'), event);
	},
	
	onGpsccontactOwningBusinessGroupAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactOwningBusinessGroup', 'owningBusinessGroup');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroup'), event, 'owningBusinessGroup');
	},
	onGpsccontactOwningBusinessGroupRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactOwningBusinessGroup');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroup'), event);
	},
	
	onGpsccontactImpactedBusinessAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactImpactedBusiness', 'impactedBusinessGroup');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('gpsccontactImpactedBusiness'), event, 'impactedBusinessGroup');
	},
	onGpsccontactImpactedBusinessRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactImpactedBusiness');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('gpsccontactImpactedBusiness'), event);
	},
	
	onGpsccontactEscalationIndivAdd: function(link, event) {
//		createPersonPickerTip(event, 'gpsccontactEscalationIndiv');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('gpsccontactEscalationIndiv'), event);
	},
	onGpsccontactEscalationIndivRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactEscalationIndiv');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('gpsccontactEscalationIndiv'), event);
	},
	
	onGpsccontactEscalationAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactEscalation', 'escalationList');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('gpsccontactEscalation'), event, 'escalationList');
	},
	onGpsccontactEscalationRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactEscalation');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('gpsccontactEscalation'), event);
	},
	
	onGpsccontactImplementationTeamAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactImplementationTeam', 'implementationTeam');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeam'), event, 'implementationTeam');
	},
	onGpsccontactImplementationTeamRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactImplementationTeam');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeam'), event);
	},
	
	onGpsccontactServiceCoordinatorIndivAdd: function(link, event) {
//		createPersonPickerTip(event, 'gpsccontactServiceCoordinatorIndiv');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('gpsccontactServiceCoordinatorIndiv'), event);
	},
	onGpsccontactServiceCoordinatorIndivRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactServiceCoordinatorIndiv');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('gpsccontactServiceCoordinatorIndiv'), event);
	},
	
	onGpsccontactServiceCoordinatorAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactServiceCoordinator', 'serviceCoordinator');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('gpsccontactServiceCoordinator'), event, 'serviceCoordinator');
	},
	onGpsccontactServiceCoordinatorRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactServiceCoordinator');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('gpsccontactServiceCoordinator'), event);
	},
	
	onGpsccontactChangeTeamAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactChangeTeam', 'changeTeam');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('gpsccontactChangeTeam'), event, 'changeTeam');
	},
	onGpsccontactChangeTeamRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactChangeTeam');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('gpsccontactChangeTeam'), event);
	},
	
	onGpsccontactSupportGroupAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactSupportGroup', 'supportGroupIMResolver');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroup'), event, 'supportGroupIMResolver');
	},
	onGpsccontactSupportGroupRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactSupportGroup');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroup'), event);
	},
	
	onGpsccontactSystemResponsibleAdd: function(link, event) {
//		createPersonPickerTip(event, 'gpsccontactSystemResponsible');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('gpsccontactSystemResponsible'), event);
	},
	onGpsccontactSystemResponsibleRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactSystemResponsible');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('gpsccontactSystemResponsible'), event);
	},
	
	onGpsccontactCiOwnerAdd: function(link, event) {
//		createGroupPickerTip(event, 'gpsccontactCiOwner', 'ciOwner');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner'), event, 'ciOwner');
	},
	onGpsccontactCiOwnerRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactCiOwner');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner'), event);
	},
	
	onGpsccontactResponsibleAtCustomerSideAdd: function(link, event) {
//		createPersonPickerTip(event, 'gpsccontactResponsibleAtCustomerSide');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('gpsccontactResponsibleAtCustomerSide'), event);
	},
	onGpsccontactResponsibleAtCustomerSideRemove: function(link, event) {
//		removeValueFromField(event, 'gpsccontactResponsibleAtCustomerSide');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('gpsccontactResponsibleAtCustomerSide'), event);
	},
	
	
	onCiSubResponsibleAdd: function(link, event) {
//		createPersonPickerTip(event, 'ciSubResponsible');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('fsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), event);
	},
	onCiSubResponsibleAddgroup: function(link, event) {
//		createGroupPickerTip(event, 'ciSubResponsible', 'none');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('fsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), event, 'none');
	},
	onCiSubResponsibleRemove: function(link, event) {
//		removeValueFromField(event, 'ciSubResponsible');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('fsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), event);
	},
	
	
	onCiResponsibleAdd: function(link, event) {
//		createPersonPickerTip(event, 'ciResponsible');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('fsCIOwner').getComponent('pCIOwner').getComponent('ciResponsible'), event);
	},
	onCiResponsibleRemove: function(link, event) {
//		removeValueFromField(event, 'applicationOwnerDelegate');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('fsCIOwner').getComponent('pCIOwner').getComponent('ciResponsible'), event);
	},
	
	
	onApplicationOwnerDelegateAdd: function(link, event) {
//		createPersonPickerTip(event, 'applicationOwnerDelegate');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), event);
	},
	onApplicationOwnerDelegateAddgroup: function(link, event) {
//		createGroupPickerTip(event, 'applicationOwnerDelegate', 'none');
		AIR.AirPickerManager.openGroupPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), event, 'none');
	},
	onApplicationOwnerDelegateRemove: function(link, event) {
//		removeValueFromField(event, 'applicationOwnerDelegate');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), event);
	},
	
	
	onApplicationStewardAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('fsApplicationSteward').getComponent('pApplicationSteward').getComponent('applicationSteward'), event);//fsApplicationOwner
	},
	onApplicationStewardRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('fsApplicationSteward').getComponent('pApplicationSteward').getComponent('applicationSteward'), event);//fsApplicationOwner
	},
	

	onApplicationOwnerAdd: function(link, event) {
//		createPersonPickerTip(event, 'applicationOwner');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('fsApplicationOwner').getComponent('pApplicationOwner').getComponent('applicationOwner'), event);
	},
	onApplicationOwnerRemove: function(link, event) {
//		removeValueFromField(event, 'applicationOwner');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('fsApplicationOwner').getComponent('pApplicationOwner').getComponent('applicationOwner'), event);
	},
	
	
	onPersonAdded: function(element, hiddenElement) {
		this.fireEvent('ciChange', this, element, hiddenElement);
	},
	onGroupAdded: function(element, hiddenElement) {
		this.fireEvent('ciChange', this, element, hiddenElement);
	},
	onRecordRemoved: function(element, hiddenElement) {
		this.fireEvent('ciChange', this, element, hiddenElement);
	},
	
	setContactInformation: function(record) {
		if (record) {
			var contact = record.data;
			
			if ('Y' === contact.individualContactYN) {
				if(AAM.getAppDetail().isCiCreate) {
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).reset();
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId] + 'Hidden').reset();
				} else {
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).setValue(contact.personName);
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId] + 'Hidden').setValue(contact.cwid);
				}
			} else {
				if(AAM.getAppDetail().isCiCreate) {
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).reset();
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId] + 'Hidden').reset();
				} else {
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).setValue(contact.groupName);
					Ext.getCmp(this.gpscContactsMap[contact.groupTypeId] + 'Hidden').setValue(contact.groupId);
				}
			}
		}
		
		Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).show();
	},
	
	clear: function(data) {
		this.update(data);
	},
	
	update: function(data) {

		var fsApplicationOwner = this.getComponent('fsApplicationOwner');
		var fsApplicationSteward = this.getComponent('fsApplicationSteward');
		
		if(data.tableId == AC.TABLE_ID_APPLICATION && data.applicationCat1Id === AC.APP_CAT1_APPLICATION) {
			fsApplicationOwner.setVisible(true);
			fsApplicationSteward.setVisible(true);
			
			var pApplicationOwner = fsApplicationOwner.getComponent('pApplicationOwner');
			if(data.applicationOwnerHidden) {// && data.applicationOwnerHidden != 0
				if(data.isCiCreate) {
					pApplicationOwner.getComponent('applicationOwnerHidden').reset();
					pApplicationOwner.getComponent('applicationOwner').reset();
				} else {
					pApplicationOwner.getComponent('applicationOwnerHidden').setValue(data.applicationOwnerHidden);
					pApplicationOwner.getComponent('applicationOwner').setValue(data.applicationOwner);
				}
			} else {
				pApplicationOwner.getComponent('applicationOwnerHidden').setValue('');
				pApplicationOwner.getComponent('applicationOwner').setValue('');
			}
			
			var pApplicationSteward = fsApplicationSteward.getComponent('pApplicationSteward');
			if(data.applicationStewardHidden) {// && data.applicationStewardHidden != 0
				if(data.isCiCreate) {
					pApplicationSteward.getComponent('applicationStewardHidden').reset();
					pApplicationSteward.getComponent('applicationSteward').reset();
				} else {
					pApplicationSteward.getComponent('applicationStewardHidden').setValue(data.applicationStewardHidden);//applicationOwnerHidden
					pApplicationSteward.getComponent('applicationSteward').setValue(data.applicationSteward);//applicationOwner
				}
			} else {
				pApplicationSteward.getComponent('applicationStewardHidden').setValue('');
				pApplicationSteward.getComponent('applicationSteward').setValue('');
			}
			
			var pApplicationOwnerDelegate = fsApplicationOwner.getComponent('pApplicationOwnerDelegate');
			if(data.applicationOwnerDelegateHidden && data.applicationOwnerDelegateHidden != 0) {
				if(data.isCiCreate) {
					pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateHidden').reset();
					pApplicationOwnerDelegate.getComponent('applicationOwnerDelegate').reset();					
				} else {
					pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateHidden').setValue(data.applicationOwnerDelegateHidden);
					pApplicationOwnerDelegate.getComponent('applicationOwnerDelegate').setValue(data.applicationOwnerDelegate);
				}
			} else {
				pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateHidden').setValue('');
				pApplicationOwnerDelegate.getComponent('applicationOwnerDelegate').setValue('');
			}
		} else {
			fsApplicationOwner.setVisible(false);
			fsApplicationSteward.setVisible(false);
			
			var pApplicationOwner = fsApplicationOwner.getComponent('pApplicationOwner');
			var pApplicationOwnerDelegate = fsApplicationOwner.getComponent('pApplicationOwnerDelegate');
			var pApplicationSteward = fsApplicationSteward.getComponent('pApplicationSteward');
			
			pApplicationOwner.getComponent('applicationOwnerHidden').setValue('');
			pApplicationOwner.getComponent('applicationOwner').setValue('');
			pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateHidden').setValue('');
			pApplicationOwnerDelegate.getComponent('applicationOwnerDelegate').setValue('');
			pApplicationSteward.getComponent('applicationStewardHidden').setValue('');
			pApplicationSteward.getComponent('applicationSteward').setValue('');
		}

		

		var pCIOwner = this.getComponent('fsCIOwner').getComponent('pCIOwner');
		if(data.ciOwner) {//ciResponsible && data.ciResponsible != 0
			pCIOwner.getComponent('ciResponsible').setValue(data.ciOwner);//ciResponsible
			pCIOwner.getComponent('ciResponsibleHidden').setValue(data.ciOwnerHidden);//ciResponsibleHidden
		} else {
			pCIOwner.getComponent('ciResponsible').setValue('');
			pCIOwner.getComponent('ciResponsibleHidden').setValue('');
		}
		
	/*	//added conditionset vandana
		var pProviderName = this.getComponent('provider').getComponent('pProviderName');
		if(data.Provider_Name) {
			pProviderName.getComponent('idProviderName').setValue(data.Provider_Name);
			//pProviderName.getComponent('ProviderNameHidden').setValue(data.ProviderNameHidden);
		} else {
			pProviderName.getComponent('idProviderName').setValue('');
			//pProviderName.getComponent('ProviderNameHidden').setValue('');
		}
		//ended conditionset vandana
		//added conditionsProvider_Addresset vandana
		var pProviderAddress = this.getComponent('provider').getComponent('pProviderAddress');
		if(data.Provider_Address) {
			pProviderAddress.getComponent('idProviderAddress').setValue(data.Provider_Address);
			//pProviderAddress.getComponent('ProviderAddressHidden').setValue(data.ProviderAddressHidden);
		} else {
			pProviderAddress.getComponent('idProviderAddress').setValue('');
			//pProviderAddress.getComponent('ProviderAddressHidden').setValue('');
		}
		//ended conditionset vandana
*/
		
		var pCiSubResponsible = this.getComponent('fsCIOwner').getComponent('pCiSubResponsible');
		if(data.ciOwnerDelegate) {//ciSubResponsible && data.ciSubResponsible != 0
			pCiSubResponsible.getComponent('ciSubResponsible').setValue(data.ciOwnerDelegate);//ciSubResponsible
			pCiSubResponsible.getComponent('ciSubResponsibleHidden').setValue(data.ciOwnerDelegateHidden);//ciSubResponsibleHidden
		} else {
			pCiSubResponsible.getComponent('ciSubResponsible').setValue('');
			pCiSubResponsible.getComponent('ciSubResponsibleHidden').setValue('');
		}
	
		this.updateAccessMode(data);
	
	
		var labels = AIR.AirApplicationManager.getLabels();
//		var label = data.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.label_details_ciOwner;
//		var label = AAM.getAppDetail().tableId == AC.TABLE_ID_APPLICATION && AAM.getAppDetail().applicationCat1Id && AAM.getAppDetail().applicationCat1Id == AC.APP_CAT1_APPLICATION ? labels.applicationManager : labels.label_details_ciOwner;
		var ciTypeId = AAM.getAppDetail() ? AAM.getAppDetail().tableId : AAM.getTableId();
		var ciSubTypeId = AAM.getAppDetail() ? AAM.getAppDetail().applicationCat1Id ? AAM.getAppDetail().applicationCat1Id : AAM.getAppDetail().ciSubTypeId : AAM.getCiSubTypeId();
		var label = ciTypeId == AC.TABLE_ID_APPLICATION && ciSubTypeId == AC.APP_CAT1_APPLICATION ? labels.applicationManager : labels.label_details_ciOwner;

		this.getComponent('fsCIOwner').setTitle(label);
//		this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('labelgpsccontactCiOwner').setText(label);
		
		var fsContactsGPSC = this.getComponent('contactsGPSC');
		fsContactsGPSC.setVisible(true);
		
		
		var applicationContactsStore = AIR.AirStoreFactory.createApplicationContactsStore();
		applicationContactsStore.on('load', this.applicationContactsLoaded, this);
		
		var params = {
			cwid: AAM.getCwid(),
			token: AAM.getToken(),
			applicationId: AAM.getCiId(),
			tableId: data.tableId//AAM.getTableId()
		};
		
		applicationContactsStore.load({
			params: params
		});
	},
	
	updateAccessMode: function(data) {
		if(data.tableId == AC.TABLE_ID_APPLICATION && data.applicationCat1Id === AC.APP_CAT1_APPLICATION) {
			AIR.AirAclManager.setAccessMode(this.getComponent('fsApplicationOwner').getComponent('pApplicationOwner').getComponent('applicationOwner'), data);
			AIR.AirAclManager.setAccessMode(this.getComponent('fsApplicationSteward').getComponent('pApplicationSteward').getComponent('applicationSteward'), data);//fsApplicationOwner
			AIR.AirAclManager.setAccessMode(this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), data);
		}
		
//
		AIR.AirAclManager.setAccessMode(this.getComponent('fsCIOwner').getComponent('pCIOwner').getComponent('ciResponsible'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('fsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), data);
		//added by vandana
		AIR.AirAclManager.setAccessMode(this.getComponent('provider').getComponent('pProviderName').getComponent('idProviderName'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('provider').getComponent('pProviderAddress').getComponent('idProviderAddress'), data);
		
		//Ended by vandana
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('gpsccontactResponsibleAtCustomerSide'), data);
//
		if(data.applicationCat1Id !== AC.APP_CAT1_APPLICATION) {
			AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner'), data);
		}
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('gpsccontactSystemResponsible'), data);
//
		if(data.applicationCat1Id !== AC.APP_CAT1_APPLICATION) {
			AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroup'), data);
		}
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('gpsccontactChangeTeam'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('gpsccontactServiceCoordinator'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('gpsccontactServiceCoordinatorIndiv'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeam'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('gpsccontactEscalation'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('gpsccontactEscalationIndiv'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('gpsccontactImpactedBusiness'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroup'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentative'), data);
		
		
		var tfGpsccontactCiOwner = this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner');
		var tfGpsccontactSupportGroup = this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroup');
		var tfCiOwner = this.getComponent('fsCIOwner').getComponent('pCIOwner').getComponent('ciResponsible');
		
		
		// RFC 9459 set Mandatory/Necessity from the store /database not xml
		var groupTypesStore = AIR.AirStoreManager.getStoreByName('groupTypesListStore');
		// groupTypesStore.load();
		var gtdata = groupTypesStore.data;
		
		for (var i = 0 ; i < gtdata.items.length ; i++){
			
			// check if the field is visible by tableId and group_type visibility
			var isFieldVisible = false;
			if (data.tableId == AC.TABLE_ID_APPLICATION && '1' == gtdata.items[i].data.visibleApplication) {
				isFieldVisible = true;
			}
			else if (data.tableId == AC.TABLE_ID_IT_SYSTEM && '1' == gtdata.items[i].data.visibleItsystem) {
				isFieldVisible = true;
			}
			else if (data.tableId == AC.TABLE_ID_POSITION || data.tableId == AC.TABLE_ID_ROOM
					|| data.tableId == AC.TABLE_ID_BUILDING_AREA || data.tableId == AC.TABLE_ID_BUILDING
					|| data.tableId == AC.TABLE_ID_TERRAIN || data.tableId == AC.TABLE_ID_SITE) {
				if ('1' == gtdata.items[i].data.visibleLocation) {
					isFieldVisible = true;
				}
			}
			
			// set the visibility and the necessity
			for (var gt = 0; gt < this.groupTypeMapping.length ; gt++) {
				if (this.groupTypeMapping[gt][0] === gtdata.items[i].data.groupTypeName) {
					
					if (isFieldVisible) {
						// fieldname = groupTypeMapping[gt][1]
						this.setGPSCVisible(this.groupTypeMapping[gt][1], true);
						var modus = null;
						if ('0' == gtdata.items[i].data.minContacts) {
							// nothing
						}
						else {
							modus = 'mandatory';
							this.setGPSCNecessity(this.groupTypeMapping[gt][1], modus);
						}
					}
					else {
						this.setGPSCVisible(this.groupTypeMapping[gt][1], false);
					}
				}
			}
			
		}
		

		// RFC 9459 special case - applications are only "required"
		if(data.tableId == AC.TABLE_ID_APPLICATION && data.applicationCat1Id === AC.APP_CAT1_APPLICATION) { 
			this.setGPSCNecessityInternal('fsCIOwner', 'pCIOwner', 'labelciResponsible', 'required');
			
			this.setGPSCNecessityInternal('contactsGPSC', 'pGpsccontactCiOwner', 'labelgpsccontactCiOwner', 'required');
			this.setGPSCNecessityInternal('contactsGPSC', 'pGpsccontactSupportGroup', 'labelgpsccontactSupportGroup', 'required');
			
			tfGpsccontactCiOwner.clearInvalid();
			tfGpsccontactSupportGroup.clearInvalid();
		}
		
	},
	setGPSCVisible: function (compname, visible) {
		var fsContactsGPSC = this.getComponent('contactsGPSC');
		var subcompname = 'p'+compname;
		subcompname = subcompname.replace('pgpsccontact', 'pGpsccontact');

		var pGpsccontact = fsContactsGPSC.getComponent(subcompname);
		pGpsccontact.setVisible(visible);

	},
	setGPSCNecessity: function (compname, modus) {
		var subcompname = 'p'+compname;
		subcompname = subcompname.replace('pgpsccontact', 'pGpsccontact');
		this.setGPSCNecessityInternal('contactsGPSC', subcompname, 'label'+compname, modus);
	},
	setGPSCNecessityInternal: function (mastercompname, subcompname, compname, modus) {
		var lGpsccontact = this.getComponent(mastercompname).getComponent(subcompname).getComponent(compname);
		AIR.AirAclManager.setNecessityInternal(lGpsccontact.el, modus);
	},
	
	applicationContactsLoaded: function(store, records, options) {
		for(var i = 0; i < records.length; ++i)
			this.setContactInformation(records[i]);
		
		if(AAM.getAppDetail() == AC.TABLE_ID_APPLICATION) {
			var tfGpsccontactCiOwner = this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner');
			var tfGpsccontactSupportGroup = this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroup');

			tfGpsccontactCiOwner.clearInvalid();
			tfGpsccontactSupportGroup.clearInvalid();
		}
		
		this.fireEvent('afterCiUpdate', this);
	},
	
	
	setData: function(data) {
		if(this.getComponent('fsApplicationOwner').isVisible() && this.getComponent('fsApplicationSteward').isVisible()) {//AIR.AirApplicationManager.getAppDetail().applicationCat1Id !== AC.APP_CAT1_APPLICATION
			var field = this.getComponent('fsApplicationOwner').getComponent('pApplicationOwner').getComponent('applicationOwnerHidden');
			if (!field.disabled) {
				data.applicationOwner = field.getValue();
				data.applicationOwnerHidden = field.getValue();
			}
			
			field = this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegateHidden');
			if (!field.disabled) {
				data.applicationOwnerDelegateHidden = field.getValue();
				field = this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate');
				data.applicationOwnerDelegate = field.getValue();
			}
			
			var field = this.getComponent('fsApplicationSteward').getComponent('pApplicationSteward').getComponent('applicationStewardHidden');//fsApplicationOwner
			if (!field.disabled) {
				data.applicationSteward = field.getValue();
				data.applicationStewardHidden = field.getValue();
			}
		}
		
		
		

		field = this.getComponent('fsCIOwner').getComponent('pCIOwner').getComponent('ciResponsibleHidden');
		if (!field.disabled) {
			data.ciOwner = field.getValue();
			data.ciOwnerHidden = field.getValue();
		}


		field = this.getComponent('fsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsibleHidden');
		if (!field.disabled) {
			data.ciOwnerDelegateHidden = field.getValue();
			// Sonderfall ciSubResponsible benötigt den Gruppennamen!
			field = this.getComponent('fsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible');
			data.ciOwnerDelegate = field.getValue();
		}
		//added by vandana
		
		field = this.getComponent('provider').getComponent('pProviderName').getComponent('idProviderName');
		if (!field.disabled) {
			data.providerName = field.getValue();
			alert("provider name  ----"+field.getValue());
			/*field = this.getComponent('provider').getComponent('pProviderName').getComponent('ProviderNameHidden');			
			if (field.getValue()) {
				
				data.ProviderNameHidden = field.getValue();
				alert("data.ProviderNameHidden   ----"+data.ProviderNameHidden);
				alert("ProviderNameHidden   ----"+field.getValue());
			}*/
		} /*else {
			data.ProviderName = 'DISABLED';
		}*/
		//ended by vandana
		//added by vandana
		field = this.getComponent('provider').getComponent('pProviderAddress').getComponent('idProviderAddress');
		if (!field.disabled) {
			data.providerAddress = field.getValue();
			alert("ProviderAddress  ----"+field.getValue());
			alert("ProviderAddress  ----"+data.providerAddress);
			/*field = this.getComponent('provider').getComponent('pProviderAddress').getComponent('ProviderAddressHidden');			
			if (field.getValue()) {
				
				data.ProviderAddressHidden = field.getValue();
				alert("data.ProviderAddressHidden   ----"+data.ProviderAddressHidden);
				alert("ProviderAddressHidden   ----"+field.getValue());
			}*/
		} /*else {
			data.ProviderAddress = 'DISABLED';
		}*/
		//ended by vandana
	
//		if(AAM.getTableId() == AC.TABLE_ID_APPLICATION || AAM.getTableId() == AC.TABLE_ID_IT_SYSTEM) {
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('gpsccontactResponsibleAtCustomerSide');
			if (!field.disabled) {
	//			var value = field.getValue();
				data.gpsccontactResponsibleAtCustomerSide = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('gpsccontactResponsibleAtCustomerSideHidden');
	//			var value2 = field.getValue();
				if (field.getValue()) {// && field.getValue().length > 0
					//Entfernt, weil bei mit personpicker hinzugefügten Einträgen und durch den recordremover wieder entfernten
					//Einträgen hier mit applicationSaveStore.setBaseParam nichts gesetzt wird, wenn ALLE Einträge gelöscht werden sollen
					//Wenn '' nicht gesetzt/übertragen wird, werden die alten Daten wieder geladen.
					data.gpsccontactResponsibleAtCustomerSideHidden = field.getValue();
				}
			} else {
				data.gpsccontactResponsibleAtCustomerSide = 'DISABLED';
			}

		
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner');
			if (!field.disabled) {
				data.gpsccontactCiOwner = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwnerHidden');
				if (field.getValue() && field.getValue().length > 0)
					data.gpsccontactCiOwnerHidden = field.getValue();
			} else {
				data.gpsccontactCiOwnerHidden = 'DISABLED';
			}
	
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('gpsccontactSystemResponsible');
			if (!field.disabled) {
				data.gpsccontactSystemResponsible = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('gpsccontactSystemResponsibleHidden');
				if(field.getValue() && field.getValue().length > 0)
					data.gpsccontactSystemResponsibleHidden = field.getValue();
			} else {
				data.gpsccontactSystemResponsibleHidden = 'DISABLED';
			}
	
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroup');
//			if (!field.disabled) {
				data.gpsccontactSupportGroup = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroupHidden');
				if(field.getValue() && field.getValue().length > 0)
					data.gpsccontactSupportGroupHidden = field.getValue();
//			} else {
//				data.gpsccontactSupportGroup = 'DISABLED';
//			}
	
			
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('gpsccontactChangeTeam');
			if (!field.disabled) {
				data.gpsccontactChangeTeam = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('gpsccontactChangeTeamHidden');
				if(field.getValue() && field.getValue().length > 0)
					data.gpsccontactChangeTeamHidden = field.getValue();
			} else {
				data.gpsccontactChangeTeamHidden = 'DISABLED';
			}
			
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('gpsccontactServiceCoordinator');
			if (!field.disabled) {
				data.gpsccontactServiceCoordinator = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('gpsccontactServiceCoordinatorHidden');
				if(field.getValue() && field.getValue().length > 0)
					data.gpsccontactServiceCoordinatorHidden = field.getValue();
			} else {
				data.gpsccontactImplementationTeamHidden = 'DISABLED';
			}
	
			
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('gpsccontactServiceCoordinatorIndiv');
			if (!field.disabled) {
	//			var v = field.getValue();
				data.gpsccontactServiceCoordinatorIndiv = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('gpsccontactServiceCoordinatorIndivHidden');
	//			var v2 = field.getValue();
				if(field.getValue())// && field.getValue().length > 0
					data.gpsccontactServiceCoordinatorIndivHidden = field.getValue();
			} else {
				data.gpsccontactServiceCoordinatorIndivHidden = 'DISABLED';
			}
	
			
			if(AAM.getTableId() == AC.TABLE_ID_APPLICATION) {
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeam');
				if (!field.disabled) {
					data.gpsccontactImplementationTeam = field.getValue();
					field = this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeamHidden');
					if(field.getValue() && field.getValue().length > 0)
						data.gpsccontactImplementationTeamHidden = field.getValue();
				} else {
					data.gpsccontactImplementationTeamHidden = 'DISABLED';
				}
				
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroup');
				if (!field.disabled) {
					data.gpsccontactOwningBusinessGroup = field.getValue();
					field = this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroupHidden');
					if(field.getValue() && field.getValue().length > 0)
						data.gpsccontactOwningBusinessGroupHidden = field.getValue();
				} else {
					data.gpsccontactOwningBusinessGroupHidden = 'DISABLED';
				}
				
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentative');
				if (!field.disabled) {
					data.gpsccontactBusinessOwnerRepresentative = field.getValue();
					field = this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentativeHidden');
					if(field.getValue() && field.getValue().length > 0)
						data.gpsccontactBusinessOwnerRepresentativeHidden = field.getValue();
				} else {
					data.gpsccontactBusinessOwnerRepresentativeHidden = 'DISABLED';
				}
			}
			//====================================================================================================
			
			
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('gpsccontactEscalation');
			if (!field.disabled) {
				data.gpsccontactEscalation = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('gpsccontactEscalationHidden');
				if(field.getValue() && field.getValue().length > 0)
					data.gpsccontactEscalationHidden = field.getValue();
			} else {
				data.gpsccontactImplementationTeamHidden = 'DISABLED';
			}
	
	
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('gpsccontactEscalationIndiv');
			if (!field.disabled) {
				data.gpsccontactEscalationIndiv = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('gpsccontactEscalationIndivHidden');
				if(field.getValue())// && field.getValue().length > 0
					data.gpsccontactEscalationIndivHidden = field.getValue();
			} else {
				data.gpsccontactEscalationIndivHidden = 'DISABLED';
			}


			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('gpsccontactImpactedBusiness');
			if (!field.disabled) {
				data.gpsccontactImpactedBusiness = field.getValue();
				field = this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('gpsccontactImpactedBusinessHidden');
				if(field.getValue() && field.getValue().length > 0)
					data.gpsccontactImpactedBusinessHidden = field.getValue();
			} else {
				data.gpsccontactImpactedBusinessHidden = 'DISABLED';
			}
//		}
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.contactsPanelTitle);
		this.getComponent('fsApplicationOwner').setTitle(labels.fsApplicationOwner);
		
//		var appDetail = AIR.AirApplicationManager.getAppDetail();
//		if(appDetail) {
//			var label = appDetail.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.contactsCIOwner;
//			this.getComponent('fsCIOwner').setTitle(label);//labels.contactsCIOwner
//		}
		
		this.getComponent('contactsGPSC').setTitle(labels.contactsGPSC);

		
		this.getComponent('fsApplicationOwner').getComponent('pApplicationOwner').getComponent('labelapplicationOwner').setText(labels.applicationOwner);//.el.dom.innerHTML = labels.applicationOwner;
		this.getComponent('fsApplicationSteward').getComponent('pApplicationSteward').getComponent('labelapplicationSteward').setText(labels.applicationSteward);//fsApplicationOwner
		this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('labelapplicationOwnerDelegate').setText(labels.applicationOwnerDelegate);//.el.dom.innerHTML = labels.applicationOwnerDelegate;

		this.getComponent('fsCIOwner').getComponent('pCIOwner').getComponent('labelciResponsible').setText(labels.ciResponsible);
		this.getComponent('fsCIOwner').getComponent('pCiSubResponsible').getComponent('labelciSubResponsible').setText(labels.ciSubResponsible);
//added by vandana
		this.getComponent('provider').getComponent('pProviderName').getComponent('labelProviderName').setText(labels.idProviderName);
		this.getComponent('provider').getComponent('pProviderAddress').getComponent('labelProviderAddress').setText(labels.idProviderAddress);
		//ended by vandana
		this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('labelgpsccontactResponsibleAtCustomerSide').setText(labels.gpsccontactResponsibleAtCustomerSide);
//		var ciTypeId = AAM.getAppDetail() ? AAM.getAppDetail().tableId : AAM.getTableId();
//		var ciSubTypeId = AAM.getAppDetail() ? AAM.getAppDetail().applicationCat1Id ? AAM.getAppDetail().applicationCat1Id : AAM.getAppDetail().ciSubTypeId : AAM.getCiSubTypeId();
//		var label = ciTypeId == AC.TABLE_ID_APPLICATION && ciSubTypeId == AC.APP_CAT1_APPLICATION ? labels.applicationManager : labels.label_details_ciOwner;
		
		this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('labelgpsccontactCiOwner').setText(labels.gpsccontactCiOwner);// label
		this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('labelgpsccontactSystemResponsible').setText(labels.gpsccontactSystemResponsible);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('labelgpsccontactSupportGroup').setText(labels.gpsccontactSupportGroup);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('labelgpsccontactChangeTeam').setText(labels.gpsccontactChangeTeam);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('labelgpsccontactServiceCoordinator').setText(labels.gpsccontactServiceCoordinator);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('labelgpsccontactServiceCoordinatorIndiv').setText(labels.gpsccontactServiceCoordinatorIndiv);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('labelgpsccontactImplementationTeam').setText(labels.gpsccontactImplementationTeam);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('labelgpsccontactEscalation').setText(labels.gpsccontactEscalation);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('labelgpsccontactEscalationIndiv').setText(labels.gpsccontactEscalationIndiv);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('labelgpsccontactImpactedBusiness').setText(labels.gpsccontactImpactedBusiness);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('labelgpsccontactOwningBusinessGroup').setText(labels.gpsccontactOwningBusinessGroup);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('labelgpsccontactBusinessOwnerRepresentative').setText(labels.gpsccontactBusinessOwnerRepresentative);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData('labelciResponsible', toolTips.ciResponsible, toolTips.ciResponsibleText);
		this.setTooltipData('labelciSubResponsible', toolTips.ciSubResponsible, toolTips.ciSubResponsibleText);
		
		this.setTooltipData(this.getComponent('fsApplicationOwner').getComponent('pApplicationOwner').getComponent('labelapplicationOwner'), toolTips.applicationOwner, toolTips.applicationOwnerText);
		this.setTooltipData(this.getComponent('fsApplicationSteward').getComponent('pApplicationSteward').getComponent('labelapplicationSteward'), toolTips.applicationSteward, toolTips.applicationStewardText);//fsApplicationOwner
		this.setTooltipData(this.getComponent('fsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('labelapplicationOwnerDelegate'), toolTips.applicationOwnerDelegate, toolTips.applicationOwnerDelegateText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('labelgpsccontactImpactedBusiness'), toolTips.gpsccontactImpactedBusiness, toolTips.gpsccontactImpactedBusinessText);
		//Added by vandana
		this.setTooltipData(this.getComponent('provider').getComponent('pProviderName').getComponent('labelProviderName'), toolTips.idProviderName, toolTips.idProviderNameText);
		this.setTooltipData(this.getComponent('provider').getComponent('pProviderAddress').getComponent('labelProviderAddress'), toolTips.idProviderAddress, toolTips.idProviderAddressText);
		
		//Ended by vandana		
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('labelgpsccontactResponsibleAtCustomerSide'), toolTips.gpsccontactResponsibleAtCustomerSide, toolTips.gpsccontactResponsibleAtCustomerSideText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('labelgpsccontactOwningBusinessGroup'), toolTips.gpsccontactOwningBusinessGroup, toolTips.gpsccontactOwningBusinessGroupText);

		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('labelgpsccontactCiOwner'), toolTips.gpsccontactCiOwner, toolTips.gpsccontactCiOwnerText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('labelgpsccontactSystemResponsible'), toolTips.gpsccontactSystemResponsible, toolTips.gpsccontactSystemResponsibleText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('labelgpsccontactSupportGroup'), toolTips.gpsccontactSupportGroup, toolTips.gpsccontactSupportGroupText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('labelgpsccontactChangeTeam'), toolTips.gpsccontactChangeTeam, toolTips.gpsccontactChangeTeamText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('labelgpsccontactServiceCoordinator'), toolTips.gpsccontactServiceCoordinator, toolTips.gpsccontactServiceCoordinatorText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('labelgpsccontactServiceCoordinatorIndiv'), toolTips.gpsccontactServiceCoordinatorIndiv, toolTips.gpsccontactServiceCoordinatorIndivText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('labelgpsccontactImplementationTeam'), toolTips.gpsccontactImplementationTeam, toolTips.gpsccontactImplementationTeamText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('labelgpsccontactEscalation'), toolTips.gpsccontactEscalation, toolTips.gpsccontactEscalationText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('labelgpsccontactEscalationIndiv'), toolTips.gpsccontactEscalationIndiv, toolTips.gpsccontactEscalationIndivText);
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('labelgpsccontactBusinessOwnerRepresentative'), toolTips.gpsccontactBusinessOwnerRepresentative, toolTips.gpsccontactBusinessOwnerRepresentativeText);
	}
});
Ext.reg('AIR.CiContactsView', AIR.CiContactsView);
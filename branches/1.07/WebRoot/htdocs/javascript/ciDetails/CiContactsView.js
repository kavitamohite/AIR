Ext.namespace('AIR');

AIR.CiContactsView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		
		//Bestätigungsabfrage beim Löschen über den AirRemoverPicker gibt es nicht mehr
		//War ursprünglich vorhanden in commonfunctions.js::removeValueFromField() 
		
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
           	'gpsccontactBusinessOwnerRepresentative' //15
       	];
		
		var taWidth = Ext.isIE ? 224 : 230;//230 224 wegen IE und index.html DOCTYPE! Dies hat Auswirkungen auf die Breite der textarea ??!!
		
		Ext.apply(this, {
		    title: 'Contacts',
		    layout: 'form',
		    height: 900,
		    border: false,
		    bodyStyle: 'padding:10px',
//		    autoScroll: true,
		    
		    items: [{
		        xtype: 'fieldset',
		        id: 'contactsApplicationOwner',
		        title: 'Application Owner',
		        labelWidth: 200,
		        
//		        layout: 'form',//fit
		        
				items: [{
					xtype: 'panel',
					id: 'pContactsApplicationOwner',
					border: false,
					
					layout: 'column',//toolbar hbox
					
					items: [{
						xtype: 'label',
						id: 'labelapplicationOwner',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'applicationOwner',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'applicationOwnerHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'applicationOwneraddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'applicationOwnerremoveimg',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'panel',
					id: 'pApplicationSteward',
					border: false,
					
					layout: 'column',//toolbar hbox
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelapplicationSteward',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'applicationSteward',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'applicationStewardHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'applicationStewardaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'applicationStewardremoveimg',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'panel',
					id: 'pApplicationOwnerDelegate',
					border: false,
					
					layout: 'column',//toolbar hbox
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'labelapplicationOwnerDelegate',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'applicationOwnerDelegate',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'applicationOwnerDelegateHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'applicationOwnerDelegateaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'applicationOwnerDelegateaddgroupimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'applicationOwnerDelegateremoveimg',
				    	img: img_RemovePerson
				    }]
				}]
			},{
		        xtype:'fieldset',
		        id: 'contactsCIOwner',
		        title: 'CI Owner',
		        labelWidth: 200,
		        
				items: [{
					xtype: 'container',
					id: 'pContactsCIOwner',
					
					layout: 'column',//toolbar
//					width: 500,
					
					items: [{
						xtype: 'label',
						id: 'labelciResponsible',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'ciResponsible',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        name: 'ciResponsibleHidden',
				        id: 'ciResponsibleHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'ciResponsibleaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'ciResponsibleremoveimg',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'container',
					id: 'pCiSubResponsible',
					
					layout: 'column',//toolbar
					style: {
						marginTop: 5
					},
//					width: 500,
					
					items: [{
						xtype: 'label',
						id: 'labelciSubResponsible',
						
						width: 200,
						style: {
							fontSize: 12
//							marginRight: 120
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: 'ciSubResponsible',
				        allowBlank: true,
				        disabled: false,
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: 'ciSubResponsibleHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: 'ciSubResponsibleaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'ciSubResponsibleaddgroupimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'ciSubResponsibleremoveimg',
				    	img: img_RemovePerson
				    }]
				}]
			},{
		        xtype: 'fieldset',
		        id: 'contactsGPSC',
		        title: 'GPSC contacts',
		        labelWidth: 200,
		        //autoScroll: true,
		        
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
				    	id: 'gpsccontactResponsibleAtCustomerSideaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactResponsibleAtCustomerSideremoveimg',
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
				    	id: 'gpsccontactCiOwneraddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactCiOwnerremoveimg',
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
						xtype: 'textarea',
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
				    	id: 'gpsccontactSystemResponsibleaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactSystemResponsibleremoveimg',
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
				    	id: 'gpsccontactSupportGroupaddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactSupportGroupremoveimg',
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
				    	id: 'gpsccontactChangeTeamaddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactChangeTeamremoveimg',
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
				    	id: 'gpsccontactServiceCoordinatoraddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactServiceCoordinatorremoveimg',
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
				    	id: 'gpsccontactServiceCoordinatorIndivaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactServiceCoordinatorIndivremoveimg',
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
				    	id: 'gpsccontactImplementationTeamaddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactImplementationTeamremoveimg',
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
				    	id: 'gpsccontactEscalationaddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactEscalationremoveimg',
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
				    	id: 'gpsccontactEscalationIndivaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactEscalationIndivremoveimg',
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
				    	id: 'gpsccontactImpactedBusinessaddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactImpactedBusinessremoveimg',
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
				    	id: 'gpsccontactOwningBusinessGroupaddimg',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactOwningBusinessGroupremoveimg',
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
				    	id: 'gpsccontactBusinessOwnerRepresentativeaddimg',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: 'gpsccontactBusinessOwnerRepresentativeremoveimg',
				    	img: img_RemovePerson
				    }]
				}]
		    }]
		});
		
		AIR.CiContactsView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		var pContactsApplicationOwner = this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner');
		var clApplicationOwnerAdd = pContactsApplicationOwner.getComponent('applicationOwneraddimg');
		var clApplicationOwnerRemove = pContactsApplicationOwner.getComponent('applicationOwnerremoveimg');
		clApplicationOwnerAdd.on('click', this.onApplicationOwnerAdd, this);
		clApplicationOwnerRemove.on('click', this.onApplicationOwnerRemove, this);
		
		var pApplicationSteward = this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward');
		var clApplicationStewardAdd = pApplicationSteward.getComponent('applicationStewardaddimg');
		var clApplicationStewardRemove = pApplicationSteward.getComponent('applicationStewardremoveimg');
		clApplicationStewardAdd.on('click', this.onApplicationStewardAdd, this);
		clApplicationStewardRemove.on('click', this.onApplicationStewardRemove, this);
		
		
		var pApplicationOwnerDelegate = this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate');
		var clApplicationOwnerDelegateAdd = pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateaddimg');
		var clApplicationOwnerDelegateAddgroup = pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateaddgroupimg');
		var clApplicationOwnerDelegateRemove = pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateremoveimg');
		clApplicationOwnerDelegateAdd.on('click', this.onApplicationOwnerDelegateAdd, this);
		clApplicationOwnerDelegateAddgroup.on('click', this.onApplicationOwnerDelegateAddgroup, this);
		clApplicationOwnerDelegateRemove.on('click', this.onApplicationOwnerDelegateRemove, this);
		
		
		var pContactsCIOwner = this.getComponent('contactsCIOwner').getComponent('pContactsCIOwner');
		var clCiResponsibleAdd = pContactsCIOwner.getComponent('ciResponsibleaddimg');
		var clCiResponsibleRemove = pContactsCIOwner.getComponent('ciResponsibleremoveimg');
		clCiResponsibleAdd.on('click', this.onCiResponsibleAdd, this);
		clCiResponsibleRemove.on('click', this.onCiResponsibleRemove, this);
		
		var pCiSubResponsible = this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible');
		var clCiSubResponsibleAdd = pCiSubResponsible.getComponent('ciSubResponsibleaddimg');
		var clCiSubResponsibleAddgroup = pCiSubResponsible.getComponent('ciSubResponsibleaddgroupimg');
		var clCiSubResponsibleRemove = pCiSubResponsible.getComponent('ciSubResponsibleremoveimg');
		clCiSubResponsibleAdd.on('click', this.onCiSubResponsibleAdd, this);
		clCiSubResponsibleAddgroup.on('click', this.onCiSubResponsibleAddgroup, this);
		clCiSubResponsibleRemove.on('click', this.onCiSubResponsibleRemove, this);
		
		
		var pGpsccontactResponsibleAtCustomerSide = this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide');
		var clGpsccontactResponsibleAtCustomerSideAdd = pGpsccontactResponsibleAtCustomerSide.getComponent('gpsccontactResponsibleAtCustomerSideaddimg');
		var clGpsccontactResponsibleAtCustomerSideRemove = pGpsccontactResponsibleAtCustomerSide.getComponent('gpsccontactResponsibleAtCustomerSideremoveimg');
		clGpsccontactResponsibleAtCustomerSideAdd.on('click', this.onGpsccontactResponsibleAtCustomerSideAdd, this);
		clGpsccontactResponsibleAtCustomerSideRemove.on('click', this.onGpsccontactResponsibleAtCustomerSideRemove, this);
		
		var pGpsccontactCiOwner = this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner');
		var clGpsccontactCiOwnerAdd = pGpsccontactCiOwner.getComponent('gpsccontactCiOwneraddimg');
		var clGpsccontactCiOwnerRemove = pGpsccontactCiOwner.getComponent('gpsccontactCiOwnerremoveimg');
		clGpsccontactCiOwnerAdd.on('click', this.onGpsccontactCiOwnerAdd, this);
		clGpsccontactCiOwnerRemove.on('click', this.onGpsccontactCiOwnerRemove, this);
		
		var pGpsccontactSystemResponsible = this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible');
		var clGpsccontactSystemResponsibleAdd = pGpsccontactSystemResponsible.getComponent('gpsccontactSystemResponsibleaddimg');
		var clGpsccontactSystemResponsibleRemove = pGpsccontactSystemResponsible.getComponent('gpsccontactSystemResponsibleremoveimg');
		clGpsccontactSystemResponsibleAdd.on('click', this.onGpsccontactSystemResponsibleAdd, this);
		clGpsccontactSystemResponsibleRemove.on('click', this.onGpsccontactSystemResponsibleRemove, this);
		
		var pGpsccontactSupportGroup = this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup');
		var clGpsccontactSupportGroupAdd = pGpsccontactSupportGroup.getComponent('gpsccontactSupportGroupaddimg');
		var clGpsccontactSupportGroupRemove = pGpsccontactSupportGroup.getComponent('gpsccontactSupportGroupremoveimg');
		clGpsccontactSupportGroupAdd.on('click', this.onGpsccontactSupportGroupAdd, this);
		clGpsccontactSupportGroupRemove.on('click', this.onGpsccontactSupportGroupRemove, this);
		
		var pGpsccontactChangeTeam = this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam');
		var clGpsccontactChangeTeamAdd = pGpsccontactChangeTeam.getComponent('gpsccontactChangeTeamaddimg');
		var clGpsccontactChangeTeamRemove = pGpsccontactChangeTeam.getComponent('gpsccontactChangeTeamremoveimg');
		clGpsccontactChangeTeamAdd.on('click', this.onGpsccontactChangeTeamAdd, this);
		clGpsccontactChangeTeamRemove.on('click', this.onGpsccontactChangeTeamRemove, this);
		
		var pGpsccontactServiceCoordinator = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator');
		var clGpsccontactServiceCoordinatorAdd = pGpsccontactServiceCoordinator.getComponent('gpsccontactServiceCoordinatoraddimg');
		var clGpsccontactServiceCoordinatorRemove = pGpsccontactServiceCoordinator.getComponent('gpsccontactServiceCoordinatorremoveimg');
		clGpsccontactServiceCoordinatorAdd.on('click', this.onGpsccontactServiceCoordinatorAdd, this);
		clGpsccontactServiceCoordinatorRemove.on('click', this.onGpsccontactServiceCoordinatorRemove, this);
		
		var pGpsccontactServiceCoordinatorIndiv = this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv');
		var clGpsccontactServiceCoordinatorIndivAdd = pGpsccontactServiceCoordinatorIndiv.getComponent('gpsccontactServiceCoordinatorIndivaddimg');
		var clGpsccontactServiceCoordinatorIndivRemove = pGpsccontactServiceCoordinatorIndiv.getComponent('gpsccontactServiceCoordinatorIndivremoveimg');
		clGpsccontactServiceCoordinatorIndivAdd.on('click', this.onGpsccontactServiceCoordinatorIndivAdd, this);
		clGpsccontactServiceCoordinatorIndivRemove.on('click', this.onGpsccontactServiceCoordinatorIndivRemove, this);
		
		var pGpsccontactImplementationTeam = this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam');
		var clGpsccontactImplementationTeamAdd = pGpsccontactImplementationTeam.getComponent('gpsccontactImplementationTeamaddimg');
		var clGpsccontactImplementationTeamRemove = pGpsccontactImplementationTeam.getComponent('gpsccontactImplementationTeamremoveimg');
		clGpsccontactImplementationTeamAdd.on('click', this.onGpsccontactImplementationTeamAdd, this);
		clGpsccontactImplementationTeamRemove.on('click', this.onGpsccontactImplementationTeamRemove, this);
		
		var pGpsccontactEscalation = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation');
		var clGpsccontactEscalationAdd = pGpsccontactEscalation.getComponent('gpsccontactEscalationaddimg');
		var clGpsccontactEscalationRemove = pGpsccontactEscalation.getComponent('gpsccontactEscalationremoveimg');
		clGpsccontactEscalationAdd.on('click', this.onGpsccontactEscalationAdd, this);
		clGpsccontactEscalationRemove.on('click', this.onGpsccontactEscalationRemove, this);
		
		var pGpsccontactEscalationIndiv = this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv');
		var clGpsccontactEscalationIndivAdd = pGpsccontactEscalationIndiv.getComponent('gpsccontactEscalationIndivaddimg');
		var clGpsccontactEscalationIndivRemove = pGpsccontactEscalationIndiv.getComponent('gpsccontactEscalationIndivremoveimg');
		clGpsccontactEscalationIndivAdd.on('click', this.onGpsccontactEscalationIndivAdd, this);
		clGpsccontactEscalationIndivRemove.on('click', this.onGpsccontactEscalationIndivRemove, this);
		
		var pGpsccontactImpactedBusiness = this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness');
		var clGpsccontactImpactedBusinessAdd = pGpsccontactImpactedBusiness.getComponent('gpsccontactImpactedBusinessaddimg');
		var clGpsccontactImpactedBusinessRemove = pGpsccontactImpactedBusiness.getComponent('gpsccontactImpactedBusinessremoveimg');
		clGpsccontactImpactedBusinessAdd.on('click', this.onGpsccontactImpactedBusinessAdd, this);
		clGpsccontactImpactedBusinessRemove.on('click', this.onGpsccontactImpactedBusinessRemove, this);
		
		var pGpsccontactOwningBusinessGroup = this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup');
		var clGpsccontactOwningBusinessGroupAdd = pGpsccontactOwningBusinessGroup.getComponent('gpsccontactOwningBusinessGroupaddimg');
		var clGpsccontactOwningBusinessGroupRemove = pGpsccontactOwningBusinessGroup.getComponent('gpsccontactOwningBusinessGroupremoveimg');
		clGpsccontactOwningBusinessGroupAdd.on('click', this.onGpsccontactOwningBusinessGroupAdd, this);
		clGpsccontactOwningBusinessGroupRemove.on('click', this.onGpsccontactOwningBusinessGroupRemove, this);
		
		var pGpsccontactBusinessOwnerRepresentative = this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative');
		var clGpsccontactBusinessOwnerRepresentativeAdd = pGpsccontactBusinessOwnerRepresentative.getComponent('gpsccontactBusinessOwnerRepresentativeaddimg');
		var clGpsccontactBusinessOwnerRepresentativeRemove = pGpsccontactBusinessOwnerRepresentative.getComponent('gpsccontactBusinessOwnerRepresentativeremoveimg');
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
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner'), event, 'none');
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
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), event);
	},
	onCiSubResponsibleAddgroup: function(link, event) {
//		createGroupPickerTip(event, 'ciSubResponsible', 'none');
		AIR.AirPickerManager.openGroupPicker(
			this.onGroupAdded.createDelegate(this), this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), event, 'none');
	},
	onCiSubResponsibleRemove: function(link, event) {
//		removeValueFromField(event, 'ciSubResponsible');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), event);
	},
	
	
	onCiResponsibleAdd: function(link, event) {
//		createPersonPickerTip(event, 'ciResponsible');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsCIOwner').getComponent('pContactsCIOwner').getComponent('ciResponsible'), event);
	},
	onCiResponsibleRemove: function(link, event) {
//		removeValueFromField(event, 'applicationOwnerDelegate');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsCIOwner').getComponent('pContactsCIOwner').getComponent('ciResponsible'), event);
	},
	
	
	onApplicationOwnerDelegateAdd: function(link, event) {
//		createPersonPickerTip(event, 'applicationOwnerDelegate');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), event);
	},
	onApplicationOwnerDelegateAddgroup: function(link, event) {
//		createGroupPickerTip(event, 'applicationOwnerDelegate', 'none');
		AIR.AirPickerManager.openGroupPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), event, 'none');
	},
	onApplicationOwnerDelegateRemove: function(link, event) {
//		removeValueFromField(event, 'applicationOwnerDelegate');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), event);
	},
	
	
	onApplicationStewardAdd: function(link, event) {
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward').getComponent('applicationSteward'), event);
	},
	onApplicationStewardRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward').getComponent('applicationSteward'), event);
	},
	

	onApplicationOwnerAdd: function(link, event) {
//		createPersonPickerTip(event, 'applicationOwner');
		AIR.AirPickerManager.openPersonPicker(
			this.onPersonAdded.createDelegate(this), this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner').getComponent('applicationOwner'), event);
	},
	onApplicationOwnerRemove: function(link, event) {
//		removeValueFromField(event, 'applicationOwner');
		AIR.AirPickerManager.openRemovePicker(
			this.onRecordRemoved.createDelegate(this), this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner').getComponent('applicationOwner'), event);
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
	
	setContactInformation: function(myRecord) {
		if (myRecord) {
			var contact = myRecord.data;
			if ('Y' === contact.individualContactYN) {
				contactcwid = contact.cwid;
				personName = contact.personName;
				Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).setValue(personName);
				Ext.getCmp(this.gpscContactsMap[contact.groupTypeId] + 'Hidden').setValue(contactcwid);
			} else {
				groupName = contact.groupName;
				groupId = contact.groupId;
				Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).setValue(groupName);
				Ext.getCmp(this.gpscContactsMap[contact.groupTypeId] + 'Hidden').setValue(groupId);
			}
		}
		
		Ext.getCmp(this.gpscContactsMap[contact.groupTypeId]).show();
	},
	
	update: function(data) {
		var pContactsApplicationOwner = this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner');
		if(data.applicationOwnerHidden) {// && data.applicationOwnerHidden != 0
			pContactsApplicationOwner.getComponent('applicationOwnerHidden').setValue(data.applicationOwnerHidden);
			pContactsApplicationOwner.getComponent('applicationOwner').setValue(data.applicationOwner);
		} else {
			pContactsApplicationOwner.getComponent('applicationOwnerHidden').setValue('');
			pContactsApplicationOwner.getComponent('applicationOwner').setValue('');
		}
		
		var pApplicationSteward = this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward');
		if(data.applicationStewardHidden) {// && data.applicationStewardHidden != 0
			pApplicationSteward.getComponent('applicationStewardHidden').setValue(data.applicationStewardHidden);
			pApplicationSteward.getComponent('applicationSteward').setValue(data.applicationSteward);
		} else {
			pApplicationSteward.getComponent('applicationStewardHidden').setValue('');
			pApplicationSteward.getComponent('applicationSteward').setValue('');
		}
		
		var pApplicationOwnerDelegate = this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate');
		if(data.applicationOwnerDelegateHidden && data.applicationOwnerDelegateHidden != 0) {
			pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateHidden').setValue(data.applicationOwnerDelegateHidden);
			pApplicationOwnerDelegate.getComponent('applicationOwnerDelegate').setValue(data.applicationOwnerDelegate);
		} else {
			pApplicationOwnerDelegate.getComponent('applicationOwnerDelegateHidden').setValue('');
			pApplicationOwnerDelegate.getComponent('applicationOwnerDelegate').setValue('');
		}

		

		var pContactsCIOwner = this.getComponent('contactsCIOwner').getComponent('pContactsCIOwner');
		if(data.ciResponsible) {// && data.ciResponsible != 0
			pContactsCIOwner.getComponent('ciResponsible').setValue(data.ciResponsible);
			pContactsCIOwner.getComponent('ciResponsibleHidden').setValue(data.ciResponsibleHidden);
		} else {
			pContactsCIOwner.getComponent('ciResponsible').setValue('');
			pContactsCIOwner.getComponent('ciResponsibleHidden').setValue('');
		}
		
		var pCiSubResponsible = this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible');
		if(data.ciSubResponsible) {// && data.ciSubResponsible != 0
			pCiSubResponsible.getComponent('ciSubResponsible').setValue(data.ciSubResponsible);
			pCiSubResponsible.getComponent('ciSubResponsibleHidden').setValue(data.ciSubResponsibleHidden);
		} else {
			pCiSubResponsible.getComponent('ciSubResponsible').setValue('');
			pCiSubResponsible.getComponent('ciSubResponsibleHidden').setValue('');
		}
	
		this.updateAccessMode(data);
	
	
		var labels = AIR.AirApplicationManager.getLabels();
		var label = data.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.label_details_ciOwner;
		this.getComponent('contactsCIOwner').setTitle(label);
		
		var applicationContactsStore = AIR.AirStoreFactory.createApplicationContactsStore();
		applicationContactsStore.on('load', this.applicationContactsLoaded, this);
		
		var params = {
			cwid: AIR.AirApplicationManager.getCwid(),
			token: AIR.AirApplicationManager.getToken(),
			applicationId: AIR.AirApplicationManager.getCiId()//selectedCIId
		};
		
		applicationContactsStore.load({
			params: params
		});
	},
	
	updateAccessMode: function(data) {
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner').getComponent('applicationOwner'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward').getComponent('applicationSteward'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsCIOwner').getComponent('pContactsCIOwner').getComponent('ciResponsible'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible'), data);
		
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('gpsccontactResponsibleAtCustomerSide'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('gpsccontactCiOwner'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactSystemResponsible').getComponent('gpsccontactSystemResponsible'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroup'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactChangeTeam').getComponent('gpsccontactChangeTeam'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinator').getComponent('gpsccontactServiceCoordinator'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactServiceCoordinatorIndiv').getComponent('gpsccontactServiceCoordinatorIndiv'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeam'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalation').getComponent('gpsccontactEscalation'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactEscalationIndiv').getComponent('gpsccontactEscalationIndiv'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('gpsccontactImpactedBusiness'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroup'), data);
		AIR.AirAclManager.setAccessMode(this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentative'), data);
	},
	
	applicationContactsLoaded: function(store, records, options) {
		for(var i = 0; i < records.length; ++i)
			this.setContactInformation(records[i]);
	},
	
	
	//getData: function() {
	setData: function(data) {
		//var data = {};
		
		var field = this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner').getComponent('applicationOwnerHidden');
		if (!field.disabled) {
			data.applicationOwner = field.getValue();
			data.applicationOwnerHidden = field.getValue();
		}
		
		var field = this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward').getComponent('applicationStewardHidden');
		if (!field.disabled) {
			data.applicationSteward = field.getValue();
			data.applicationStewardHidden = field.getValue();
		}

		field = this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegateHidden');
		if (!field.disabled) {
			data.applicationOwnerDelegateHidden = field.getValue();
			field = this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('applicationOwnerDelegate');
			data.applicationOwnerDelegate = field.getValue();
		}
		
		
		

		field = this.getComponent('contactsCIOwner').getComponent('pContactsCIOwner').getComponent('ciResponsibleHidden');
		if (!field.disabled) {
			data.responsible = field.getValue();
			data.responsibleHidden = field.getValue();
		}


		field = this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsibleHidden');
		if (!field.disabled) {
			data.subResponsibleHidden = field.getValue();
			// Sonderfall ciSubResponsible benötigt den Gruppennamen!
			field = this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible').getComponent('ciSubResponsible');
			data.subResponsible = field.getValue();
		}
		
		
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
			if (field.getValue() && field.getValue().length > 0) {
				data.gpsccontactCiOwnerHidden = field.getValue();
			}
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
		if (!field.disabled) {
			data.gpsccontactSupportGroup = field.getValue();
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactSupportGroup').getComponent('gpsccontactSupportGroupHidden');
			if(field.getValue() && field.getValue().length > 0)
				data.gpsccontactSupportGroupHidden = field.getValue();
			
		} else {
			data.gpsccontactSupportGroup = 'DISABLED';
		}

		
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

		
		field = this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeam');
		if (!field.disabled) {
			data.gpsccontactImplementationTeam = field.getValue();
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactImplementationTeam').getComponent('gpsccontactImplementationTeamHidden');
			if(field.getValue() && field.getValue().length > 0)
				data.gpsccontactImplementationTeamHidden = field.getValue();
			
		} else {
			data.gpsccontactImplementationTeamHidden = 'DISABLED';
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


		field = this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroup');
		if (!field.disabled) {
			data.gpsccontactOwningBusinessGroup = field.getValue();
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactOwningBusinessGroup').getComponent('gpsccontactOwningBusinessGroupHidden');
			if(field.getValue() && field.getValue().length > 0)
				data.gpsccontactOwningBusinessGroupHidden = field.getValue();
			
		} else {
			data.gpsccontactOwningBusinessGroupHidden = 'DISABLED';
		}
		//--------------
//		this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent
		
		
		field = this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentative');
		if (!field.disabled) {
			data.gpsccontactBusinessOwnerRepresentative = field.getValue();
			field = this.getComponent('contactsGPSC').getComponent('pGpsccontactBusinessOwnerRepresentative').getComponent('gpsccontactBusinessOwnerRepresentativeHidden');
			if(field.getValue() && field.getValue().length > 0)
				data.gpsccontactBusinessOwnerRepresentativeHidden = field.getValue();
			
		} else {
			data.gpsccontactBusinessOwnerRepresentativeHidden = 'DISABLED';
		}

		//return data;
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.contactsPanelTitle);
		this.getComponent('contactsApplicationOwner').setTitle(labels.contactsApplicationOwner);
		
//		var appDetail = AIR.AirApplicationManager.getAppDetail();
//		if(appDetail) {
//			var label = appDetail.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.contactsCIOwner;
//			this.getComponent('contactsCIOwner').setTitle(label);//labels.contactsCIOwner
//		}
		
		this.getComponent('contactsGPSC').setTitle(labels.contactsGPSC);

		
		this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner').getComponent('labelapplicationOwner').setText(labels.applicationOwner);//.el.dom.innerHTML = labels.applicationOwner;
		this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward').getComponent('labelapplicationSteward').setText(labels.applicationSteward);//.el.dom.innerHTML = labels.applicationOwnerDelegate;
		this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('labelapplicationOwnerDelegate').setText(labels.applicationOwnerDelegate);//.el.dom.innerHTML = labels.applicationOwnerDelegate;

		this.getComponent('contactsCIOwner').getComponent('pContactsCIOwner').getComponent('labelciResponsible').setText(labels.ciResponsible);
		this.getComponent('contactsCIOwner').getComponent('pCiSubResponsible').getComponent('labelciSubResponsible').setText(labels.ciSubResponsible);

		this.getComponent('contactsGPSC').getComponent('pGpsccontactResponsibleAtCustomerSide').getComponent('labelgpsccontactResponsibleAtCustomerSide').setText(labels.gpsccontactResponsibleAtCustomerSide);
		this.getComponent('contactsGPSC').getComponent('pGpsccontactCiOwner').getComponent('labelgpsccontactCiOwner').setText(labels.gpsccontactCiOwner);
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
		
		this.setTooltipData(this.getComponent('contactsApplicationOwner').getComponent('pContactsApplicationOwner').getComponent('labelapplicationOwner'), toolTips.applicationOwner, toolTips.applicationOwnerText);
		this.setTooltipData(this.getComponent('contactsApplicationOwner').getComponent('pApplicationSteward').getComponent('labelapplicationSteward'), toolTips.applicationSteward, toolTips.applicationStewardText);
		this.setTooltipData(this.getComponent('contactsApplicationOwner').getComponent('pApplicationOwnerDelegate').getComponent('labelapplicationOwnerDelegate'), toolTips.applicationOwnerDelegate, toolTips.applicationOwnerDelegateText);
				
		
		this.setTooltipData(this.getComponent('contactsGPSC').getComponent('pGpsccontactImpactedBusiness').getComponent('labelgpsccontactImpactedBusiness'), toolTips.gpsccontactImpactedBusiness, toolTips.gpsccontactImpactedBusinessText);
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
Ext.namespace('AIR');


AIR.MassUpdateSelectAttributeValueWindow = Ext.extend(Ext.Window,{
	
	constructor: function(ciTypeId,ciSubTypeId,selectedCIs,callbackFunction){
		this.ciTypeId = ciTypeId;
		this.selectedCIs = selectedCIs;
		this.ciSubTypeId = ciSubTypeId;
		this.callbackFunction = callbackFunction;
		
		
		AIR.MassUpdateSelectAttributeValueWindow.superclass.constructor.call(this);
        this.initSelectAttr();
	},
    
    initComponent :function(){
    	Ext.apply(this,{

			resizable: false,
    		plain: true,
			modal: true,
			closable: false,
    		closeAction:'close',
    		border: false,
    		footer: true,
    		title: 'Selection of attribute for mass update ',
    		autoScroll: true,
    		width: 1200,
    		height: 650,
    		
			//layout: 'form',//anchor border anchor vbox
			labelWidth: 180,
		    layout:'column', // arrange items in columns
		    defaults: {      // defaults applied to items
		        layout: 'form',
		        border: true
		    },		
		    buttonAlign: 'right', // anything but 'center' or 'right' and you can use '-', and '->'
		                                  // to control the alignment of fbar items
		    fbar: [{
		    	id: 'selectAttrSave',
		        text: 'Save'
		    }
		    ,{
		    	id: 'selectAttrCancel',
		        text: 'Cancel'
		    }],
    		
    		items: [
    				
    				{
    					xtype: 'fieldset',
    				    id: 'selectAttrProtection',
    				    columnWidth: 0.5,
    				    height: 300,
    				    layout: 'form',
    				    title: 'Protection',
    				    labelWidth: 180,
    				    
    					items: [
    						    {
    						        xtype: 'filterCombo',
    						        width: 230,
    						        fieldLabel: 'Availability',
    						        id: 'selectAttrprotectionAvailability',
    						        
    						        store: AIR.AirStoreManager.getStoreByName('itSecSBAvailabilityListStore'),
    						        valueField: 'id',
    						        displayField: 'text',
    						        
    						        triggerAction: 'all',
    						        lazyRender: true,
    						        lazyInit: false,
    						        mode: 'local'
    						    },{
    						    	xtype: 'textarea',
    						        id: 'selectAttrprotectionAvailabilityDescription',

    						        width: 230,
    						        fieldLabel: 'Explanation',
    						        enableKeyEvents: true,
    						        allowBlank: true
    						    },{
    						        xtype: 'filterCombo',
    						        width: 230,
    						        fieldLabel: 'Confidentiality',
    						        id: 'selectAttrprotectionConfidentiality',
    						        
    						        store: AIR.AirStoreManager.getStoreByName('itSecSBConfidentialityListStore'),  // itSecSBConfidentialityListStore
    						        
    						        valueField: 'id',
    						        displayField: 'text',
    						        
    						        triggerAction: 'all',
    						        lazyRender: true,
    						        lazyInit: false,
    						        mode: 'local'
    						    },{
    						    	xtype: 'textarea',
    						        id: 'selectAttrprotectionConfidentialityDescription',

    						        width: 230,
    						        fieldLabel: 'Explanation',
    						        allowBlank: true
    						    },{
    						        xtype: 'filterCombo',
    						        width: 230,
    						        fieldLabel: 'Information Class',
    						        id: 'selectAttrprotectionClassInformation',
    						        hidden: true,
    						        store: AIR.AirStoreManager.getStoreByName('classInformationListStore'),
    						        valueField: 'id',
    						        displayField: 'text',
    						        
    						        triggerAction: 'all',
    						        lazyRender: true,
    						        lazyInit: false,
    						        mode: 'local'
    						    },{
    						    	xtype: 'textarea',
    						        width: 230,
    						        fieldLabel: 'Info Class',
    						        id: 'selectAttrprotectionClassInformationExplanation',
    						        hidden: true,
    						        allowBlank: true
    						    },{
    						        xtype: 'filterCombo',
    						        width: 230,
    						        fieldLabel: 'Integrity',
    						        id: 'selectAttrprotectionIntegrity',
    						        hidden: true,
    						        store: AIR.AirStoreManager.getStoreByName('itSecSBAvailabilityListStore'),
    						        valueField: 'id',
    						        displayField: 'text',
    						        
    						        triggerAction: 'all',
    						        lazyRender: true,
    						        lazyInit: false,
    						        mode: 'local'
    						    },{
    						    	xtype: 'textarea',
    						        id: 'selectAttrprotectionIntegrityDescription',
    						        hidden: true,
    						        width: 230,
    						        fieldLabel: 'Explanation',
    						        allowBlank: true
    						    }					        
    					        ]
    				},

				{
					xtype: 'fieldset',
				    id: 'selectAttrAgreement',
				    layout: 'form',
				    height: 300,
				    title: 'Agreements',
				    columnWidth: 0.45,
				    labelWidth: 180,
			        style: {
		    		marginLeft: '10px'		    	
		    		},
				    
					items: [
			 {
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'SLA',
		        id: 'selectAttrsla',
		        store: AIR.AirStoreManager.getStoreByName('slaListStore'),//slaListStore,
		        valueField: 'id',
		        displayField: 'text',
		        	        
		        triggerAction: 'all',
		        mode: 'local'
		    }, {
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Service Contract',
		        id: 'selectAttrserviceContract',
		        store: AIR.AirStoreManager.getStoreByName('serviceContractListStore'),//serviceContractListStore,
		        valueField: 'id',
		        displayField: 'text',
		        triggerAction: 'all',

		        mode: 'local',
		        
		        listEmptyText: 'No matching items found'
		    },{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Priority Level',		        
		        id: 'selectAttrselectAttrpriorityLevel',
		        store: AIR.AirStoreManager.getStoreByName('priorityLevelListStore'),//priorityLevelListStore,
		        valueField: 'id',
		        displayField: 'text',		        
		        triggerAction: 'all',
		        mode: 'local'
		    },{
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Severity Level',
		        
		        id: 'selectAttrselectAttrseverityLevel',
		        store: AIR.AirStoreManager.getStoreByName('severityLevelListStore'),//severityLevelListStore,
		        valueField: 'id',
		        displayField: 'text',		        
		        triggerAction: 'all',
		        mode: 'local'
		    },
		    ]
				},
				{
					xtype: 'fieldset',
				    id: 'selectAttrfsSpecifics',
				    layout: 'form',
				    title: 'Specifics',
				    columnWidth: 0.5,
				    labelWidth: 180,
				    
					items: [	
							{
							    xtype: 'radiogroup',
								id: 'selectAttrrgBARrelevanceW',
								width: 200,
								
								columns: 2,
								fieldLabel: 'BAR Relevant',

							    items: [
							        { id: 'rgBARrelevanceYesWsa',		itemId: 'rgBARrelevanceYesWsa', 			boxLabel: 'Yes',		name: 'rgBARrelevanceW', inputValue: 'Y', width: 50},
							        { id: 'rgBARrelevanceNoWsa',		itemId: 'rgBARrelevanceNoWsa',			boxLabel: 'No',			name: 'rgBARrelevanceW', inputValue: 'N', width: 50 }
							    ]
							}	,	
							{
						    	xtype: 'textfield',
						        width: 230,
						    	
						        fieldLabel: 'Version',
						        id: 'selectAttrapplicationVersion',
						        allowBlank: true,
						        
						        style: {
						        	marginBottom: 10
						        }
						    },							
				    {
				    	xtype: 'textarea',
				        width: 230,
				        height: 75,
				        
				        fieldLabel: 'Description',
				        id: 'selectAttrtaCiDescriptionW',//wizardcomments
				        allowBlank: true
				    },
				    {
									  		 
					    	    xtype: 'filterCombo',//combo
					    	    id: 'selectAttrapplicationCat',
					    	    width: 230,
					    	    fieldLabel: 'IT Category / Technology',	    	    
					    	    store: AIR.AirStoreManager.getStoreByName('applicationCat2ListStore'),//applicationCat2ListStore,
					    	    valueField: 'id',
					    	    displayField: 'text',
					    		lastQuery: '',

					    	    
					    	    triggerAction: 'all',//all query
					    	    lazyInit: false,
					    	    mode: 'local'
					    	},
					    	{
								xtype: 'filterCombo',
						        id: 'cbOsGroup',
						        width: 230,
						        hidden: true,
						        fieldLabel: 'OS Group',
								lastQuery: '',
						        store: AIR.AirStoreFactory.createOsGroupsListStore(),
						        valueField: 'id',
						        displayField: 'name',
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},{
								xtype: 'filterCombo',
						        id: 'cbOsType',
						        hidden: true,
						        width: 230,
						        fieldLabel: 'OS Type',
								lastQuery: '',
						        store: AIR.AirStoreFactory.createOsTypesListStore(),
						        valueField: 'osTypeId',
						        displayField: 'osName',
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},{
								xtype: 'filterCombo',
						        id: 'cbOsName',
						        hidden: true,
						        width: 230,
						        fieldLabel: 'OS Name',
								lastQuery: '',
						        store: AIR.AirStoreFactory.createOsNamesListStore(),
						        valueField: 'osNameId',
						        displayField: 'name',
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},
					    	{
								xtype: 'filterCombo',
						        id: 'selectAttrcbClusterCode',
						        hidden: true,
						        width: 230,
						        fieldLabel: 'Cluster Code',
								lastQuery: '',
						        store: AIR.AirStoreFactory.createClusterTypesListStore(),
						        valueField: 'id',
						        displayField: 'name',
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},{
								xtype: 'filterCombo',
						        id: 'selectAttrcbClusterType',
						        hidden: true,
						        width: 230,
						        fieldLabel: 'Cluster Type',
								lastQuery: '',
						        store: AIR.AirStoreFactory.createClusterCodesListStore(),
						        valueField: 'id',
						        displayField: 'name',
						        
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},							
							{
					            xtype: 'radiogroup',
				    			id: 'rgVirtualHWClient',
				    			hidden: true,
				    			width: 200,
				    			
				    			columns: 2,
				    			fieldLabel: 'Virtual Hardware Client',

					            items: [
					                { id: 'rgVirtualHWClientYes',	itemId: 'rgVirtualHWClientYes', 	boxLabel: 'Yes',	name: 'rgVirtualHWClient', inputValue: 'Y', width: 50 },
					                { id: 'rgVirtualHWClientNo',	itemId: 'rgVirtualHWClientNo',		boxLabel: 'No',		name: 'rgVirtualHWClient', inputValue: 'N', width: 50 }
					            ]
							},{
					            xtype: 'radiogroup',
				    			id: 'rgVirtualHWHost',
				    			hidden: true,
				    			width: 200,
				    			
				    			columns: 2,
				    			fieldLabel: 'Virtual Hardware Host',

					            items: [
					                { id: 'rgVirtualHWHostYes',	itemId: 'rgVirtualHWHostYes', 	boxLabel: 'Yes',	name: 'rgVirtualHWHost', inputValue: 'Y', width: 50 },
					                { id: 'rgVirtualHWHostNo',	itemId: 'rgVirtualHWHostNo',	boxLabel: 'No',		name: 'rgVirtualHWHost', inputValue: 'N', width: 50 }
					            ]
							},{
								xtype: 'filterCombo',//combo
						        id: 'selectAttrcbVirtualSoftware',
								hidden: true,
						        width: 230,
						        fieldLabel: 'Virtual Software',
								
						        
								lastQuery: '',
						        store: new Ext.data.Store(),
						        valueField: 'id',
						        displayField: 'name',
						        
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: true,
						        mode: 'local'
							},
					    	{
						        xtype: 'filterCombo',//combo
						        width: 230,
						        fieldLabel: 'Lifecycle',
						        
						        id: 'selectAttrlifecycleStatus',
						        store: AIR.AirStoreManager.getStoreByName('lifecycleStatusListStore'),//lifecycleStatusListStore,
						        valueField: 'id',
						        displayField: 'text',
						        triggerAction: 'all',//all query
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
						    },{
						        xtype: 'combo',
						        width: 230,
						        fieldLabel: 'General  Usage',

//						        style: {
//						    		marginTop: 20
//						    	},
						        
						        id: 'selectAttroperationalStatus',
						        store: AIR.AirStoreManager.getStoreByName('operationalStatusListStore'),//operationalStatusListStore,
						        valueField: 'id',
						        displayField: 'text',		        
						        triggerAction: 'all',//all query
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
						    },
						    {
						        xtype: 'listview',//grid
						        width: 80,
						        //height: 170,//150
//						        frame: true,
						        border: false,
						        fieldLabel: 'Organisational scope',
						        hidden: true,
						        id: 'selectAttrlvOrganisationalScopeW',
						        store: AIR.AirStoreManager.getStoreByName('organisationalScopeListStore'),
						        
						        singleSelect: false,
						        multiSelect: true,
						        simpleSelect: true,
						        hideHeaders: true,
						        
						        columns: [
									{ dataIndex: 'id', hidden: true, hideLabel: true, width: .001 },
									{ dataIndex: 'name' }
						        ]
					    	},
					    	{
				    			xtype: 'filterCombo',//combo
				    	        id: 'selectAttrcbApplicationBusinessCat',
				    	        
				    	        store: AIR.AirStoreManager.getStoreByName('categoryBusinessListStore'),//categoryBusinessListStore,
				    	        valueField: 'id',
				    	        displayField: 'text',
				    	        fieldLabel: 'Business category',
				    	        
				    	        width: 230,
						        
//						        typeAhead: true,
//						        forceSelection: true,
//						        autoSelect: false,
						        
						        triggerAction: 'all',//all query
				    	        lazyRender: true,
				    	        lazyInit: false,
				    	        mode: 'local'
							},
							{
				    			xtype: 'filterCombo',//combo
				    	        id: 'selectAttrcbDataClass',
				    	        
				    	        store: AIR.AirStoreManager.getStoreByName('dataClassListStore'),//dataClassListStore,//dataClassListStore operationalStatusListStore,
				    	        valueField: 'id',
				    	        displayField: 'text',
				    	        fieldLabel: 'Data Class',	        
				    	        
				    	        width: 230,
						        
//						        typeAhead: true,
//						        forceSelection: true,
//						        autoSelect: false,
						        
						        triggerAction: 'all',//all query
				    	        lazyRender: true,
				    	        lazyInit: false,
				    	        mode: 'local'
			    			},
			    			{
			    				xtype: 'filterCombo',//combo
			    		        id: 'selectAttrcbPrimaryFunction',
                                hidden: true,
			    		        width: 230,
			    		        fieldLabel: 'Primary Function',
			    		        lastQuery: '',
			    		        store: new Ext.data.Store(),
			    		        valueField: 'id',
			    		        displayField: 'name',
			    		        
			    		        triggerAction: 'all',
			    		        lazyRender: true,
			    		        lazyInit: false,
			    		        mode: 'local'
			    			}
					]},
				

				{
					xtype: 'fieldset',
				    id: 'selectAttrCompliance',
				    layout: 'form',
				    height: 300,
				    columnWidth: 0.45,
				    labelWidth: 180,
			        style: {
		    		marginLeft: '10px'		    	
		    		},
				    
				    title: 'Contacts/Compliance',
				    
					items: [
{
	xtype: 'panel',
	id: 'pSelectAttrCiOwner',
	layout: 'hbox',
	hidden: true,
	border: false,
	style: {
		backgroundColor: '#ccd9e8',
		marginBottom: '5px',
		marginTop: '5px'
	},
	items: [
{
	xtype: 'label',
	id: 'PselectAttrCiOwner',
	text: 'Application Owner:',
	width: 180	

},	        
	       {

	xtype: 'textfield',
    width: 230,
    //fieldLabel: 'Primary Owner',
    hideLabel: true,
    id: 'tfSelectAttrCiOwnerW',//value: 'Pepping, Simon (ERCVA)',
    readOnly: true
},{
	xtype: 'hidden',
    id: 'tfSelectAttrCiOwnerWHidden' //value: 'ERCVA'
},{
	xtype: 'commandlink',
	id: 'clSelectAttrCiOwnerAdd',
	img: img_AddPerson
},{
	xtype: 'commandlink',
	id: 'clSelectAttrCiOwnerRemove',
	img: img_RemovePerson
}
]
	},
	{
		xtype: 'panel',
		id: 'pSelectAttrDelegate',
		hidden: true,
		layout: 'hbox',
		border: false,
		style: {
			backgroundColor: '#ccd9e8',
			marginBottom: '5px'
		},
		items: [
	{
		xtype: 'label',
		text: 'Application Owner Delegate:',
		width: 180	

	},	        
	{
		xtype: 'textfield',
	    width: 230,
	    hideLabel: true,
	    id: 'tfSelectDelegateW',
	    readOnly: true
	},{
		xtype: 'hidden',
	    id: 'tfSelectDelegateWHidden' //value: 'ERCVA'
	},{
		xtype: 'commandlink',
		id: 'clSelectAttrDelegaterAdd',
		img: img_AddPerson
	},
	{
    	xtype: 'commandlink',
    	id: 'clApplicationOwnerDelegateAddGroup',
    	img: img_AddGroup
    },{
		xtype: 'commandlink',
		id: 'clSelectAttrDelegaterRemove',
		img: img_RemovePerson
	}
	]
		},
		{
			xtype: 'panel',
			id: 'pSelectAttrSteward',
			hidden: true,
			layout: 'hbox',
			border: false,
			style: {
				backgroundColor: '#ccd9e8',
				marginBottom: '5px'
			},
			items: [
		{
			xtype: 'label',
			text: 'Application Steward:',
			width: 180	

		},	        
		{
			xtype: 'textfield',
		    width: 230,
		    hideLabel: true,
		    id: 'tfselectAttrStewardW',
		    readOnly: true
		},{
			xtype: 'hidden',
		    id: 'tfselectAttrStewardWHidden'
		},{
			xtype: 'commandlink',
			id: 'clSelectAttrStewardAdd',
			img: img_AddPerson
		},{
			xtype: 'commandlink',
			id: 'clSelectAttrStewardRemove',
			img: img_RemovePerson
		}
		]
		},	
			{
				xtype: 'panel',
				id: 'pSelectciOwnerPrimaryPerson',
				layout: 'hbox',
				border: false,
				style: {
					backgroundColor: '#ccd9e8',
					marginBottom: '5px'
				},
				items: [
			{
				xtype: 'label',
				text: 'CI Owner - Primary Person:',
				width: 180	

			},	        
	       {
				xtype: 'textfield',
			    width: 230,
			    hideLabel: true,
			    id: 'tfselectCiOwnerPrimaryPersonW',
			    readOnly: true
			},{
				xtype: 'hidden',
			    id: 'tfselectCiOwnerPrimaryPersonWHidden' //value: 'ERCVA'
			},{
				xtype: 'commandlink',
				id: 'clSelectCiOwnerPrimaryPersonAdd',
				img: img_AddPerson
			},{
				xtype: 'commandlink',
				id: 'clSelectCiOwnerPrimaryPersonRemove',
				img: img_RemovePerson
			}
			]
				
			},{
				xtype: 'panel',
				id: 'pSelectCiOwnerDelegate',
				layout: 'hbox',
				border: false,
				style: {
					backgroundColor: '#ccd9e8',
					marginBottom: '5px'
				},
				items: [
			{
				xtype: 'label',
				text: 'CI Owner - Delegate:',
				width: 180	

			},	        
		   {
				xtype: 'textfield',
			    width: 230,
			    hideLabel: true,
			    id: 'tfselectCiOwnerDelegateW',
			    readOnly: true
			},{
				xtype: 'hidden',
			    id: 'tfselectCiOwnerDelegateWHidden' //value: 'ERCVA'
			},{
				xtype: 'commandlink',
				id: 'clSelectCiOwnerDelegateAdd',
				img: img_AddPerson
			},	{
		    	xtype: 'commandlink',
		    	id: 'clSelectCiOwnerDelegateAddGroup',
		    	img: img_AddGroup
		    },{
				xtype: 'commandlink',
				id: 'clSelectCiOwnerDelegateRemove',
				img: img_RemovePerson
			}
			]
				
			
			},	
		                    {
								xtype: 'filterCombo',
						        id: 'cbselectAttrItSecGroup',
						        listWidth: 600,
						        width: 230,
						        fieldLabel: 'ITSec Group',
								lastQuery: '',
						        store: AIR.AirStoreManager.getStoreByName('itSecGroupListStore'),
						        valueField: 'id',
						        displayField: 'name',
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
					    	},
					    	{
					        	xtype: 'checkboxgroup',
					        	id: 'selectAttrcbgRegulationsW',
					        	fieldLabel: 'Relevant Regulation',
					        	columns: 2,
				    			width: 230,
								style: {
									marginBottom: 10
								},
				    			
				    			items: [
										{ id: 'selectAttrchbGR15435', boxLabel: 'GR1435', name: 'cbgRegulations', width: 100 },
				    			        { id: 'selectAttrchbGR1920', boxLabel: 'GR1920', name: 'cbgRegulations', width: 100 },
				    			        { id: 'selectattrchbGR2059', boxLabel: 'GR2059', name: 'cbgRegulations', width: 100 },
				    			        { id: 'selectAttrchbGR2008', boxLabel: 'GR2008', name: 'cbgRegulations', width: 100 }
						        ]
					        },
					        {
								xtype: 'combo',
								id: 'selectAttrCBrelevanceGxp',
								store: AIR.AirStoreManager.getStoreByName('gxpFlagListStore'),
								fieldLabel: 'GXP',
								width: 80,
								margins: '0 0 0 10',
						        valueField: 'id',
						        displayField: 'text',
						        
						        typeAhead: true,
						        forceSelection: true,
						        autoSelect: false,
						        
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local',
						        editable: false
				        	}
                            ]
				}
				
				
 		    ]
  
    		
    	});
    	AIR.MassUpdateSelectAttributeValueWindow.superclass.initComponent.call(this);
    	var selectAttrSave = this.getFooterToolbar().getComponent('selectAttrSave');
    	var selectAttrCancel = this.getFooterToolbar().getComponent('selectAttrCancel');
    	var selectAttrcbClusterCode= this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterCode');
    	var clSelectAttrStewardAdd=  this.getComponent('selectAttrCompliance').getComponent('pSelectAttrSteward').getComponent('clSelectAttrStewardAdd');
    	var clSelectAttrStewardRemove=  this.getComponent('selectAttrCompliance').getComponent('pSelectAttrSteward').getComponent('clSelectAttrStewardRemove');
    	var clSelectAttrDelegaterAdd=  this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('clSelectAttrDelegaterAdd');
    	var clApplicationOwnerDelegateAddGroup = this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('clApplicationOwnerDelegateAddGroup');
    	var clSelectAttrDelegaterRemove=  this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('clSelectAttrDelegaterRemove');
    	var clSelectAttrCiOwnerAdd=  this.getComponent('selectAttrCompliance').getComponent('pSelectAttrCiOwner').getComponent('clSelectAttrCiOwnerAdd');
    	var clSelectAttrCiOwnerRemove=  this.getComponent('selectAttrCompliance').getComponent('pSelectAttrCiOwner').getComponent('clSelectAttrCiOwnerRemove');
    	var clSelectCiOwnerPrimaryPersonAdd = this.getComponent('selectAttrCompliance').getComponent('pSelectciOwnerPrimaryPerson').getComponent('clSelectCiOwnerPrimaryPersonAdd');
    	var clSelectCiOwnerPrimaryPersonRemove = this.getComponent('selectAttrCompliance').getComponent('pSelectciOwnerPrimaryPerson').getComponent('clSelectCiOwnerPrimaryPersonRemove');
    	var clSelectCiOwnerDelegateAdd = this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('clSelectCiOwnerDelegateAdd');
    	var clSelectCiOwnerDelegateAddGroup = this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('clSelectCiOwnerDelegateAddGroup');
    	var clSelectCiOwnerDelegateRemove = this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('clSelectCiOwnerDelegateRemove');
    	var cbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsGroup');
    	var cbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsType');
		var cbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsName');

    	

    	selectAttrSave.on('click', this.onSave, this);
    	selectAttrCancel.on('click', this.onCancle, this);
    	clSelectAttrStewardAdd.on('click',this.onSelectAttrStewardAdd,this);
    	clSelectAttrStewardRemove.on('click',this.onSelectAttrStewardRemove,this);
    	clSelectAttrDelegaterAdd.on('click',this.onSelectAttrDelegaterAdd,this);
    	clSelectAttrDelegaterRemove.on('click',this.onSelectAttrDelegaterRemove,this);
    	clApplicationOwnerDelegateAddGroup.on('click',this.onApplicationOwnerDelegateAddGroup,this);
    	clSelectAttrCiOwnerAdd.on('click',this.onSelectAttrCiOwnerAdd,this);
    	clSelectAttrCiOwnerRemove.on('click',this.onSelectAttrCiOwnerRemove,this);
    	clSelectCiOwnerPrimaryPersonAdd.on('click',this.onSelectCiOwnerPrimaryPersonAdd,this);
    	clSelectCiOwnerPrimaryPersonRemove.on('click',this.onSelectCiOwnerPrimaryPersonRemove,this);
    	clSelectCiOwnerDelegateAdd.on('click',this.onSelectCiOwnerDelegateAdd,this);
    	clSelectCiOwnerDelegateAddGroup.on('click',this.onSelectCiOwnerDelegateAddGroup,this);
    	clSelectCiOwnerDelegateRemove.on('click',this.onSelectCiOwnerDelegateRemove,this);
        cbOsGroup.on('select', this.onOsGroupSelect, this);
        cbOsType.on('select', this.onOsTypeSelect, this);
        cbOsName.on('select', this.onOsNameSelect, this);//onOsNameSelect onSelect
        
        cbOsGroup.on('change', this.onOsGroupChange, this);
        cbOsType.on('change', this.onOsTypeChange, this);
        cbOsName.on('change', this.onOsNameChange, this);//onChange



    	    	
    },
	onOsGroupSelect: function(combo, record, index) {
		this.setOsGroup(combo, record);
		
	},
	onOsTypeSelect: function(combo, record, index) {
		this.setOsType(combo, record);
		
	},
	onOsNameSelect: function(combo, record, index) {
		this.setOsName(combo, record);
		
	},
	setOsGroup: function(combo, record) {
		var filterData = {
			osGroup: record.get('name'),
			itSystemType: record.get('type')
		};
		
		var cbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsType');
		cbOsType.filterByData(filterData);
		cbOsType.setValue('');
		
		var cbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsName');
		
		var fd1 = { itSystemType: this.ciSubTypeId };
		cbOsName.filterByData(fd1);
		cbOsName.setValue('');
		
	},	
	setOsType: function(combo, record) {
		var cbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsName');
		cbOsName.reset();
		
		var filterData = {
			osTypeId: record.get('osTypeId')//type
		};
		cbOsName.filterByData(filterData);
		cbOsName.setValue('');
		
		var cbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsGroup');
		var osGroupRecord = Util.getComboRecord(cbOsGroup, 'name', record.get('osGroup'));
		cbOsGroup.setValue(osGroupRecord.get('id'));
		
	},
	setOsName: function(combo, record) {
		var cbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsType');
		cbOsType.reset();
		var osTypeRecord = Util.getComboRecord(cbOsType, 'osTypeId', record.get('osTypeId'));//type
		cbOsType.setValue(osTypeRecord.get('osTypeId'));
		
		var cbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsGroup');
		cbOsGroup.reset();
		var osGroupRecord = Util.getComboRecord(cbOsGroup, 'name', osTypeRecord.get('osGroup'));
		cbOsGroup.setValue(osGroupRecord.get('id'));
		
		
		var fd1 = { type: this.ciSubTypeId  };
		cbOsGroup.filterByData(fd1);
		
		var fd2 = { osGroup: osGroupRecord.get('name') };
		cbOsType.filterByData(fd2);

	},
	onOsGroupChange: function(combo, newValue, oldValue) {
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
	    	
	    	var cbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsType');
	    	var cbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsName');
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		cbOsType.reset();
	    		cbOsName.reset();
	    		
	    		var fd1 = { itSystemType: this.ciSubTypeId };
	    		cbOsType.filterByData(fd1);
	    		cbOsName.filterByData(fd1);

	    	} else {
	    		this.setOsGroup(combo, combo.getStore().getById(newValue));
	    	}
		}
	},
	onOsTypeChange: function(combo, newValue, oldValue) {
		var cbOsGroup = this.getComponent('fsOs').getComponent('cbOsGroup');
		
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
    	
	    	
	    	var cbOsName = this.getComponent('fsOs').getComponent('cbOsName');
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		cbOsName.reset();
	    		
	    		var fd1 = { itSystemType: this.ciSubTypeId };
	    		cbOsName.filterByData(fd1);

	    	} else {
	    		this.setOsType(combo, combo.getStore().getById(newValue));
	    	}
    	} else {
    		if(cbOsGroup.getValue()) {
    			var r = cbOsGroup.getStore().getById(cbOsGroup.getValue());
    			
    			var fd1 = { osGroup: r.get('name') };
    			combo.filterByData(fd1);
    		} else {
    			var fd1 = { itSystemType: this.ciSubTypeId };
    			combo.filterByData(fd1);
    		}
    	}
	},
	onOsNameChange: function(combo, newValue, oldValue) {
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
    		
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    	} else {
	    		this.setOsName(combo, combo.getStore().getById(newValue));
	    	}
    	}
	},
	initSelectAttr: function() {
		var pSelectAttrCiOwner = this.getComponent('selectAttrCompliance').getComponent('pSelectAttrCiOwner');
        var pSelectAttrDelegate = this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate');
        var pSelectAttrSteward = this.getComponent('selectAttrCompliance').getComponent('pSelectAttrSteward');
        var cbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsGroup');
        var cbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsType');
        var cbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsName');
        var selectAttrcbClusterCode = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterCode');
        var selectAttrcbClusterType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterType');
        var rgVirtualHWClient = this.getComponent('selectAttrfsSpecifics').getComponent('rgVirtualHWClient');
        var rgVirtualHWHost = this.getComponent('selectAttrfsSpecifics').getComponent('rgVirtualHWHost');
        var selectAttrcbVirtualSoftware = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbVirtualSoftware');
        var selectAttrlvOrganisationalScopeW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrlvOrganisationalScopeW');
        var selectAttrrgBARrelevanceW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrrgBARrelevanceW');
        var selectAttrcbPrimaryFunction = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbPrimaryFunction');
		if(this.ciTypeId==AC.TABLE_ID_APPLICATION ){
			if(this.ciSubTypeId==AC.CI_SUB_TYPE_APPLICATION){
				pSelectAttrCiOwner.setVisible(true);
				pSelectAttrDelegate.setVisible(true);
				pSelectAttrSteward.setVisible(true);
				selectAttrlvOrganisationalScopeW.setVisible(true);
				selectAttrrgBARrelevanceW.setVisible(true);
			}
			
		}
		if(this.ciTypeId==AC.TABLE_ID_IT_SYSTEM ){
			cbOsGroup.setVisible(true);
			cbOsType.setVisible(true);
			cbOsName.setVisible(true);
			selectAttrcbClusterCode.setVisible(true);
			selectAttrcbClusterType.setVisible(true);
			rgVirtualHWClient.setVisible(true);
			rgVirtualHWHost.setVisible(true);
			selectAttrcbVirtualSoftware.setVisible(true);
			selectAttrcbPrimaryFunction.setVisible(true);
		}
		
		var storeIds = {
			virtualSoftwareListStore: null,
			itSystemPrimaryFunctionsListStore: null
		};
		
		var storeCount = 0;
		for(var key in storeIds)
			storeCount++;
		
		var storeLoader = new AIR.AirStoreLoader();
        storeLoader.init(storeIds, storeCount);
        storeLoader.on('storesLoaded', this.onStoresLoaded, this);
        storeLoader.load();
	},
	
    onStoresLoaded: function(storeLoader, storeMap) {
		for(var key in storeMap)
			AIR.AirStoreManager.addStore(key, storeMap[key]);
		var selectAttrcbVirtualSoftware = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbVirtualSoftware');
		var selectAttrcbPrimaryFunction = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbPrimaryFunction');
		var virtualSoftwareListStore = AIR.AirStoreManager.getStoreByName('virtualSoftwareListStore');
		var itSystemPrimaryFunctionsListStore = AIR.AirStoreManager.getStoreByName('itSystemPrimaryFunctionsListStore');
/*		if(virtualSoftwareListStore.data!=null){
			selectAttrcbVirtualSoftware.bindStore(virtualSoftwareListStore);
		}
		if(itSystemPrimaryFunctionsListStore.data!= null){
			selectAttrcbPrimaryFunction.bindStore(itSystemPrimaryFunctionsListStore);
		}*/
		storeLoader.destroy();
    },
    onSave: function(button, event){
		var msgText = 'You are in mass update mode. Are you sure that you update all elements marked in the list with the selected attributes ?';
		Ext.Msg.show({
			title: 'Start mass update',
			msg: msgText,
			buttons: Ext.Msg.YESNO,
			fn: this.attributesMassUpdate,
			scope: this,
			icon: Ext.MessageBox.INFO
		});
   },
   onSelectAttrDelegaterAdd: function(link, event) {
	   AIR.AirPickerManager.openPersonPicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('tfSelectDelegateW'), event);//fsApplicationOwnerW
	},
	onSelectAttrCiOwnerAdd: function(link, event) {
	   AIR.AirPickerManager.openPersonPicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectAttrCiOwner').getComponent('tfSelectAttrCiOwnerW'), event);//fsApplicationOwnerW
	},
   onSelectAttrStewardAdd: function(link, event) {
	   AIR.AirPickerManager.openPersonPicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectAttrSteward').getComponent('tfselectAttrStewardW'), event);//fsApplicationOwnerW
	},
	onSelectAttrStewardRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectAttrSteward').getComponent('tfselectAttrStewardW'), event);//fsApplicationOwnerW	},
	},
	onSelectAttrCiOwnerRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectAttrCiOwner').getComponent('tfSelectAttrCiOwnerW'), event);
	},
	onSelectAttrDelegaterRemove: function(link, event) {
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('tfSelectDelegateW'), event);//fsApplicationOwnerW
	},	
	onApplicationOwnerDelegateAddGroup: function(link, event) {
		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('tfSelectDelegateW'), event, 'none');
	},
	onSelectCiOwnerPrimaryPersonAdd: function(link, event){
		   AIR.AirPickerManager.openPersonPicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectciOwnerPrimaryPerson').getComponent('tfselectCiOwnerPrimaryPersonW'), event);//fsApplicationOwnerW
	},
	onSelectCiOwnerPrimaryPersonRemove: function(link, event){
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectciOwnerPrimaryPerson').getComponent('tfselectCiOwnerPrimaryPersonW'), event);//fsApplicationOwnerW		
	},
	onSelectCiOwnerDelegateAdd: function(link, event){
		AIR.AirPickerManager.openPersonPicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('tfselectCiOwnerDelegateW'), event);//fsApplicationOwnerW		
	},
	onSelectCiOwnerDelegateAddGroup: function(link, event){
		AIR.AirPickerManager.openGroupPicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('tfselectCiOwnerDelegateW'), event, 'none');		
	},
	onSelectCiOwnerDelegateRemove: function(link, event){
		AIR.AirPickerManager.openRemovePicker(null, this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('tfselectCiOwnerDelegateW'), event);//fsApplicationOwnerW		
	},

	attributesMassUpdate: function(button, object){
		if(button==='yes'){
			var massUpdateChangeAttrSaveStore=AIR.AirStoreFactory.createMassUpdateChangeAttrSaveStore();
			massUpdateChangeAttrSaveStore.on('beforeload',this.onBeforeChangeAttrmassUpdate,this);
			massUpdateChangeAttrSaveStore.on('load',this.onChangeAttrMassUpdate,this);
			
			var selectAttrapplicationCat =this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrapplicationCat');
			var  selectAttrcbClusterCode=this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterCode');
			var selectAttrcbClusterType=this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterType');
			var selectAttrlifecycleStatus = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrlifecycleStatus');
            var selectAttroperationalStatus = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttroperationalStatus');
            
			var selectAttrsla =this.getComponent('selectAttrAgreement').getComponent('selectAttrsla');
			var  selectAttrserviceContract=this.getComponent('selectAttrAgreement').getComponent('selectAttrserviceContract');
			var selectAttrselectAttrpriorityLevel=this.getComponent('selectAttrAgreement').getComponent('selectAttrselectAttrpriorityLevel');
			var selectAttrselectAttrseverityLevel = this.getComponent('selectAttrAgreement').getComponent('selectAttrselectAttrseverityLevel');
			
			var selectAttrprotectionAvailability =this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionAvailability');
			var  selectAttrprotectionAvailabilityDescription=this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionAvailabilityDescription');
			var selectAttrprotectionConfidentiality=this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionConfidentiality');
			var selectAttrprotectionConfidentialityDescription = this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionConfidentialityDescription');
            var selectAttrprotectionClassInformation = this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionClassInformation');           
			var selectAttrprotectionClassInformationExplanation =this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionClassInformationExplanation');
			var selectAttrprotectionIntegrity=this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionIntegrity');
			var selectAttrprotectionIntegrityDescription=this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionIntegrityDescription');
			var cbselectAttrItSecGroup =this.getComponent('selectAttrCompliance').getComponent('cbselectAttrItSecGroup');
			var clusterCodeRecord = selectAttrcbClusterCode.getStore().getById(selectAttrcbClusterCode.getValue());
			var clusterTypeRecord = selectAttrcbClusterType.getStore().getById(selectAttrcbClusterType.getValue());
			var tfSelectDelegateWHidden =this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('tfSelectDelegateWHidden');
			var tfSelectDelegateW = this.getComponent('selectAttrCompliance').getComponent('pSelectAttrDelegate').getComponent('tfSelectDelegateW');
			var tfSelectAttrCiOwnerWHidden =this.getComponent('selectAttrCompliance').getComponent('pSelectAttrCiOwner').getComponent('tfSelectAttrCiOwnerWHidden');
			var  tfselectAttrStewardWHidden=this.getComponent('selectAttrCompliance').getComponent('pSelectAttrSteward').getComponent('tfselectAttrStewardWHidden');
			var tfselectCiOwnerPrimaryPersonWHidden = this.getComponent('selectAttrCompliance').getComponent('pSelectciOwnerPrimaryPerson').getComponent('tfselectCiOwnerPrimaryPersonWHidden');
			var tfselectCiOwnerDelegateW = this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('tfselectCiOwnerDelegateW');
			var tfselectCiOwnerDelegateWHidden = this.getComponent('selectAttrCompliance').getComponent('pSelectCiOwnerDelegate').getComponent('tfselectCiOwnerDelegateWHidden');
			var selectAttrCBrelevanceGxp = this.getComponent('selectAttrCompliance').getComponent('selectAttrCBrelevanceGxp');
			var selectAttrcbApplicationBusinessCat = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbApplicationBusinessCat');
			var selectAttrcbVirtualSoftware = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbVirtualSoftware');
			var rgVirtualHWHost = this.getComponent('selectAttrfsSpecifics').getComponent('rgVirtualHWHost');
			var rgVirtualHWClient = this.getComponent('selectAttrfsSpecifics').getComponent('rgVirtualHWClient');
			var cbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('cbOsName');
			var selectAttrtaCiDescriptionW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrtaCiDescriptionW');
			var selectAttrlvOrganisationalScopeW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrlvOrganisationalScopeW');
			var selectAttrcbDataClass = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbDataClass');
			var selectAttroperationalStatus = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttroperationalStatus');
            var selectAttrapplicationVersion = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrapplicationVersion');
            var selectAttrrgBARrelevanceW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrrgBARrelevanceW');
            var selectAttrcbgRegulationsW = this.getComponent('selectAttrCompliance').getComponent('selectAttrcbgRegulationsW');
            var selectAttrcbPrimaryFunction = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbPrimaryFunction');
            
			var clusterCode = '';
			var clusterType = '';
			if(clusterCodeRecord!=undefined){
				clusterCode = clusterCodeRecord.get('type');
			}
			if(clusterTypeRecord!=undefined){
				clusterType = clusterTypeRecord.get('name'); 
			}
			var scopeRecords = selectAttrlvOrganisationalScopeW.getSelectedRecords();
			var scopes = '';
			
			for(var i = 0; i < scopeRecords.length; i++) {
				if(scopes.length > 0)
					scopes += ',';
				
				scopes += scopeRecords[i].get('id');
			}
			
			var params ={
					cwid: AIR.AirApplicationManager.getCwid(),
					token: AIR.AirApplicationManager.getToken(),
				 	ciTypeId: this.ciTypeId,
				 	selectedCIs: this.selectedCIs,
				 	applicationCat2Id: selectAttrapplicationCat.getValue(),
				 	lifecycleStatusId: selectAttrlifecycleStatus.getValue(),
				 	operationalStatusId: selectAttroperationalStatus.getValue(),
				 	clusterCode: clusterCode,
				 	clusterType: clusterType,	
				 	slaId: selectAttrsla.getValue(),
				 	priorityLevelId: selectAttrselectAttrpriorityLevel.getValue(),
				 	serviceContractId: selectAttrserviceContract.getValue(),
				 	severityLevelId: selectAttrselectAttrseverityLevel.getValue(),
				 	itSecSbAvailability: selectAttrprotectionAvailability.getValue(),
				 	itSecSbAvailabilityTxt: selectAttrprotectionAvailabilityDescription.getValue(),
				 	itSecSbIntegrityId: selectAttrprotectionIntegrity.getValue(),
				 	itSecSbIntegrityTxt: selectAttrprotectionIntegrityDescription.getValue(),
				 	itSecSbConfidentialityId: selectAttrprotectionConfidentiality.getValue(),
				    itSecSbConfidentialityTx: selectAttrprotectionConfidentialityDescription.getValue(),
				 	classInformationId: selectAttrprotectionClassInformation.getValue(),
				 	classInformationExplanation: selectAttrprotectionClassInformationExplanation.getValue(),
				 	itsecGroupId: cbselectAttrItSecGroup.getValue(),
				 	applicationOwner: tfSelectAttrCiOwnerWHidden.getValue(),
				 	applicationDelegateHidden: tfSelectDelegateWHidden.getValue(),
				 	applicationDelegate: tfSelectDelegateW.getValue(),
				 	applicationSteward: tfselectAttrStewardWHidden.getValue(),
				 	ciOwnerPrimaryPerson: tfselectCiOwnerPrimaryPersonWHidden.getValue(),
				 	ciOwnerDelegateHidden: tfselectCiOwnerDelegateWHidden.getValue(),
				 	ciOwnerDelegate: tfselectCiOwnerDelegateW.getValue(),
				 	gxpFlag: selectAttrCBrelevanceGxp.getValue(),
				 	osNameId: cbOsName.getValue(),
			        categoryBusinessId: selectAttrcbApplicationBusinessCat.getValue(),
			        classDataId: selectAttrcbDataClass.getValue(),
			        comments: selectAttrtaCiDescriptionW.getValue(),
			        operationalStatusId: selectAttroperationalStatus.getValue(),
			        version: selectAttrapplicationVersion.getValue(),
			        barRelevance: selectAttrrgBARrelevanceW.getValue()!= null ? selectAttrrgBARrelevanceW.getValue().inputValue : '',
			        isVirtualHardwareClient: rgVirtualHWClient.getValue()!= null ? rgVirtualHWClient.getValue().inputValue : '',
			        isVirtualHardwareHost:	rgVirtualHWHost.getValue()!= null ? rgVirtualHWHost.getValue().inputValue : '',
			        virtualHardwareSoftware: selectAttrcbVirtualSoftware.getValue(),
			        relevanceGR1435: selectAttrcbgRegulationsW.items.items[0].getValue() ? 'Y' : 'N',
			        relevanceGR1920: selectAttrcbgRegulationsW.items.items[1].getValue() ? 'Y' : 'N',
			        relevanceGR2059: selectAttrcbgRegulationsW.items.items[2].getValue() ? 'Y' : 'N',
			        relevanceGR2008: selectAttrcbgRegulationsW.items.items[3].getValue() ? 'Y' : 'N',
			        primaryFunctionId: selectAttrcbPrimaryFunction.getValue()		
			};
			if(scopes.length > 0)
				params.organisationalScope = scopes;			
			massUpdateChangeAttrSaveStore.load({
				params: params
			});
			
		}
		else{
   		Ext.Msg.show({
   			title: ' Canceled mass update', 
   			msg: 'mass update Canceled.',
   			buttons: Ext.MessageBox.OK,
   			icon: Ext.MessageBox.INFO			
   		});
   		this.callbackFunction();
   		this.close();
   	}
	},
	onBeforeChangeAttrmassUpdate: function(store, options){
		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		saveMask.show();
	},
	onChangeAttrMassUpdate: function(store, records, options){
		var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		saveMask.hide();
		switch(records[0].data.result) {
		case 'OK':
	    		Ext.Msg.show({
	    			title: 'Mass update completed',
	    			msg: 'Mass Update completed.',
	    			buttons: Ext.MessageBox.OK,
	    			icon: Ext.MessageBox.INFO			
	    		});			
    		break;
		case 'ERROR':
			var msg = records[0].data.messages[0];
    		Ext.Msg.show({
    			title: 'Error',
    			msg: msg,
    			buttons: Ext.MessageBox.OK,
    			icon: Ext.MessageBox.ERROR			
    		});
    		break;
			
		}
		this.callbackFunction();
		this.close();
	},	  
    
   onCancle: function(button, event){
	   this.callbackFunction();
 	   this.close();

    }
    

});
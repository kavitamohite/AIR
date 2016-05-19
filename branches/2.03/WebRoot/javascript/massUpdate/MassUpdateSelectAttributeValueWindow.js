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
    						        fieldLabel: 'Information Class',
    						        id: 'selectAttrprotectionClassInformation',
    						        hidden: false,
    						        store: AIR.AirStoreManager.getStoreByName('itSecSBConfidentialityListStore'),// RFC 11441
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
    						        hidden: false,
    						        allowBlank: true
    						    },{
    						        xtype: 'filterCombo',
    						        width: 230,
    						        fieldLabel: 'Integrity',
    						        id: 'selectAttrprotectionIntegrity',
    						        hidden: false,
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
    						        hidden: false,
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
		        store: new Ext.data.Store(),//serviceContractListStore,
		        valueField: 'id',
		        displayField: 'text',
		        triggerAction: 'all',
		        disabled: true,
		        editable: false,

		        mode: 'local',
		        
		        listEmptyText: 'No matching items found'
		    },{
		        xtype: 'combo',
		        width: 230,
		        fieldLabel: 'Priority Level',		        
		        id: 'selectAttrselectAttrpriorityLevel',
		        store: AIR.AirStoreManager.getStoreByName('priorityLevelListStore'),//priorityLevelListStore,
		        hidden: true,
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
		        hidden: true,
		        displayField: 'text',		        
		        triggerAction: 'all',
		        mode: 'local'
		    },
		    {
		        xtype: 'filterCombo',//combo
		        width: 230,
		        fieldLabel: 'Business Essential',
		        
		        id: 'selectAttrBusinessEssential',
		        store: AIR.AirStoreManager.getStoreByName('businessEssentialListStore'),//businessEssentialListStore,
		        hidden: true,
		        valueField: 'id',
		        displayField: 'text',		        
		        triggerAction: 'all',
		        mode: 'local'
		        
		    }
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
								hidden: true,								
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
						        hidden: true,
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
				        hidden: true,				        
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
					    		hidden: true,
					    	    triggerAction: 'all',//all query
					    	    lazyInit: false,
					    	    mode: 'local'
					    	},
					    	{
								xtype: 'filterCombo',
						        id: 'selectcAttCbOsGroup',
						        width: 230,
						        hidden: true,
						        fieldLabel: 'OS Group',
								lastQuery: '',
						        store: new Ext.data.Store(),
						        valueField: 'id',
						        displayField: 'name',
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},{
								xtype: 'filterCombo',
						        id: 'selectAttrCbOsType',
						        hidden: true,
						        width: 230,
						        fieldLabel: 'OS Type',
								lastQuery: '',
						        store: new Ext.data.Store(),
						        valueField: 'osTypeId',
						        displayField: 'osName',
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},{
								xtype: 'filterCombo',
						        id: 'selectAttrCbOsName',
						        hidden: true,
						        width: 230,
						        fieldLabel: 'OS Name',
								lastQuery: '',
						        store: new Ext.data.Store(),
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
						        store: new Ext.data.Store(),
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
						        store: new Ext.data.Store(),
						        valueField: 'id',
						        displayField: 'name',
						        
						        triggerAction: 'all',
						        lazyRender: true,
						        lazyInit: false,
						        mode: 'local'
							},							
							{
					            xtype: 'radiogroup',
				    			id: 'selectAttrRgVirtualHWClient',
				    			hidden: true,
				    			width: 200,
				    			
				    			columns: 2,
				    			fieldLabel: 'Virtual Hardware Client',

					            items: [
					                { id: 'selectAttrRgVirtualHWClientYes',	itemId: 'selectAttrRgVirtualHWClientYes', 	boxLabel: 'Yes',	name: 'selectAttrRgVirtualHWClient', inputValue: 'Y', width: 50 },
					                { id: 'selectAttrRgVirtualHWClientNo',	itemId: 'selectAttrRgVirtualHWClientNo',		boxLabel: 'No',		name: 'selectAttrRgVirtualHWClient', inputValue: 'N', width: 50 }
					            ]
							},{
					            xtype: 'radiogroup',
				    			id: 'selectAttrgVirtualHWHost',
				    			hidden: true,
				    			width: 200,
				    			
				    			columns: 2,
				    			fieldLabel: 'Virtual Hardware Host',

					            items: [
					                { id: 'selectAttrgVirtualHWHostYes',	itemId: 'selectAttrgVirtualHWHostYes', 	boxLabel: 'Yes',	name: 'selectAttrgVirtualHWHost', inputValue: 'Y', width: 50 },
					                { id: 'selectAttrgVirtualHWHostNo',	itemId: 'selectAttrgVirtualHWHostNo',	boxLabel: 'No',		name: 'selectAttrgVirtualHWHost', inputValue: 'N', width: 50 }
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
						        hidden: true,
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
						        hidden: true,
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
				    	        hidden: true,
				    	        width: 230,
						        
						        
						        triggerAction: 'all',//all query
				    	        lazyRender: true,
				    	        lazyInit: false,
				    	        mode: 'local'
							},
/*							{
				    			xtype: 'filterCombo',//combo
				    	        id: 'selectAttrcbDataClass',
				    	        
				    	        store: AIR.AirStoreManager.getStoreByName('dataClassListStore'),//dataClassListStore,//dataClassListStore operationalStatusListStore,
				    	        valueField: 'id',
				    	        displayField: 'text',
				    	        fieldLabel: 'Data Class',	        
				    	        
						        
						        triggerAction: 'all',//all query
				    	        lazyRender: true,
				    	        lazyInit: false,
				    	        mode: 'local'
			    			},*/
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
										{ id: 'selectAttrchbGR15435', boxLabel: 'GR1435', name: 'selectAttrcbgRegulationsW', width: 100 },
				    			        { id: 'selectAttrchbGR1920', boxLabel: 'GR1920', name: 'selectAttrcbgRegulationsW', width: 100 },
				    			        { id: 'selectattrchbGR2059', boxLabel: 'GR2059', name: 'selectAttrcbgRegulationsW', width: 100,hidden: this.ciTypeId==AC.TABLE_ID_APPLICATION || this.ciTypeId==AC.TABLE_ID_IT_SYSTEM ? false : true },
				    			        { id: 'selectAttrchbGR2008', boxLabel: 'GR2008', name: 'selectAttrcbgRegulationsW', width: 100,hidden: this.ciTypeId==AC.TABLE_ID_APPLICATION || this.ciTypeId==AC.TABLE_ID_IT_SYSTEM ? false : true  }
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
						        
//						        typeAhead: true,
//						        forceSelection: true,
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
    	var selectcAttCbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('selectcAttCbOsGroup');
    	var selectAttrCbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsType');
		var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
		var selectAttrsla = this.getComponent('selectAttrAgreement').getComponent('selectAttrsla');
		var selectAttrserviceContract = this.getComponent('selectAttrAgreement').getComponent('selectAttrserviceContract');

    	

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
    	selectcAttCbOsGroup.on('select', this.onOsGroupSelect, this);
    	selectAttrCbOsType.on('select', this.onOsTypeSelect, this);
    	selectAttrCbOsName.on('select', this.onOsNameSelect, this);//onOsNameSelect onSelect
        
        selectcAttCbOsGroup.on('change', this.onOsGroupChange, this);
        selectAttrCbOsType.on('change', this.onOsTypeChange, this);
        selectAttrCbOsName.on('change', this.onOsNameChange, this);//onChange
        
        selectAttrsla.on('select', this.onSlaSelect, this);
        selectAttrsla.on('change', this.onSlaChange, this);
		
        selectAttrserviceContract.on('select', this.onServiceContractSelect, this);
        selectAttrserviceContract.on('change', this.onServiceContractChange, this);
        selectAttrserviceContract.on('keyup', this.onServiceContractKeyUp, this);
        this.getComponent('selectAttrAgreement').getComponent('selectAttrselectAttrpriorityLevel').getStore().sort('text','ASC');
        this.getComponent('selectAttrAgreement').getComponent('selectAttrBusinessEssential').getStore().sort('text','ASC');
        this.getComponent('selectAttrCompliance').getComponent('selectAttrCBrelevanceGxp').getStore().sort('text','ASC');
        
        




    	    	
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
		
		var selectAttrCbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsType');
		selectAttrCbOsType.filterByData(filterData);
		selectAttrCbOsType.setValue('');
		
		var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
		
		var fd1 = { itSystemType: this.ciSubTypeId };
		selectAttrCbOsName.filterByData(fd1);
		selectAttrCbOsName.setValue('');
		
	},	
	setOsType: function(combo, record) {
		var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
		selectAttrCbOsName.reset();
		
		var filterData = {
			osTypeId: record.get('osTypeId')//type
		};
		selectAttrCbOsName.filterByData(filterData);
		selectAttrCbOsName.setValue('');
		
		var selectcAttCbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('selectcAttCbOsGroup');
		var osGroupRecord = Util.getComboRecord(selectcAttCbOsGroup, 'name', record.get('osGroup'));
		selectcAttCbOsGroup.setValue(osGroupRecord.get('id'));
		
	},
	setOsName: function(combo, record) {
		var selectAttrCbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsType');
		selectAttrCbOsType.reset();
		var osTypeRecord = Util.getComboRecord(selectAttrCbOsType, 'osTypeId', record.get('osTypeId'));//type
		selectAttrCbOsType.setValue(osTypeRecord.get('osTypeId'));
		
		var selectcAttCbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('selectcAttCbOsGroup');
		selectcAttCbOsGroup.reset();
		var osGroupRecord = Util.getComboRecord(selectcAttCbOsGroup, 'name', osTypeRecord.get('osGroup'));
		selectcAttCbOsGroup.setValue(osGroupRecord.get('id'));
		
		
		var fd1 = { type: this.ciSubTypeId  };
		selectcAttCbOsGroup.filterByData(fd1);
		
		var fd2 = { osGroup: osGroupRecord.get('name') };
		selectAttrCbOsType.filterByData(fd2);

	},
	onOsGroupChange: function(combo, newValue, oldValue) {
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
	    	
	    	var selectAttrCbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsType');
	    	var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		selectAttrCbOsType.reset();
	    		selectAttrCbOsName.reset();
	    		
	    		var fd1 = { itSystemType: this.ciSubTypeId };
	    		selectAttrCbOsType.filterByData(fd1);
	    		selectAttrCbOsName.filterByData(fd1);

	    	} else {
	    		this.setOsGroup(combo, combo.getStore().getById(newValue));
	    	}
		}
	},
	onOsTypeChange: function(combo, newValue, oldValue) {
		var selectcAttCbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('selectcAttCbOsGroup');
		
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
    	
	    	
	    	var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		selectAttrCbOsName.reset();
	    		
	    		var fd1 = { itSystemType: this.ciSubTypeId };
	    		selectAttrCbOsName.filterByData(fd1);

	    	} else {
	    		this.setOsType(combo, combo.getStore().getById(newValue));
	    	}
    	} else {
    		if(selectcAttCbOsGroup.getValue()) {
    			var r = selectcAttCbOsGroup.getStore().getById(selectcAttCbOsGroup.getValue());
    			
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
        var selectcAttCbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('selectcAttCbOsGroup');
        var selectAttrCbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsType');
        var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
        var selectAttrcbClusterCode = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterCode');
        var selectAttrcbClusterType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterType');
        var selectAttrRgVirtualHWClient = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrRgVirtualHWClient');
        var selectAttrgVirtualHWHost = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrgVirtualHWHost');
        var selectAttrcbVirtualSoftware = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbVirtualSoftware');
        var selectAttrlvOrganisationalScopeW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrlvOrganisationalScopeW');
        var selectAttrcbPrimaryFunction = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbPrimaryFunction');
        var selectAttrrgBARrelevanceW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrrgBARrelevanceW');
        var selectAttrapplicationVersion = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrapplicationVersion');
        var selectAttrtaCiDescriptionW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrtaCiDescriptionW');
        var selectAttrapplicationCat = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrapplicationCat');
        var selectAttrprotectionClassInformation = this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionClassInformation');
        var selectAttrprotectionClassInformationExplanation = this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionClassInformationExplanation');
        var selectAttrprotectionIntegrity = this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionIntegrity');
        var selectAttrprotectionIntegrityDescription = this.getComponent('selectAttrProtection').getComponent('selectAttrprotectionIntegrityDescription');
        var selectAttrcbgRegulationsW = this.getComponent('selectAttrCompliance').getComponent('selectAttrcbgRegulationsW');
        var cbselectAttrItSecGroup = this.getComponent('selectAttrCompliance').getComponent('cbselectAttrItSecGroup');
        var selectAttrselectAttrpriorityLevel = this.getComponent('selectAttrAgreement').getComponent('selectAttrselectAttrpriorityLevel');
        var selectAttrselectAttrseverityLevel = this.getComponent('selectAttrAgreement').getComponent('selectAttrselectAttrseverityLevel');
        var selectAttrlifecycleStatus = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrlifecycleStatus');
        var selectAttroperationalStatus = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttroperationalStatus');
        var selectAttrcbApplicationBusinessCat = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbApplicationBusinessCat');
        var selectAttrBusinessEssential = this.getComponent('selectAttrAgreement').getComponent('selectAttrBusinessEssential');
        
        
        this.filterCombo(cbselectAttrItSecGroup);
		var filterData = { tableId: this.ciTypeId };
		selectAttrlifecycleStatus.filterByData(filterData);
        
        
		if(this.ciTypeId==AC.TABLE_ID_APPLICATION ){
			if(this.ciSubTypeId==AC.CI_SUB_TYPE_APPLICATION){
				pSelectAttrCiOwner.setVisible(true);
				pSelectAttrDelegate.setVisible(true);
				pSelectAttrSteward.setVisible(true);
				selectAttrlvOrganisationalScopeW.setVisible(true);
				selectAttrrgBARrelevanceW.setVisible(true);
			}
			selectAttrapplicationVersion.setVisible(true);
			selectAttrtaCiDescriptionW.setVisible(true);
			selectAttrapplicationCat.setVisible(true);
			selectAttrselectAttrseverityLevel.setVisible(true);
			selectAttrselectAttrpriorityLevel.setVisible(true);
			selectAttrlifecycleStatus.setVisible(true);
			selectAttroperationalStatus.setVisible(true);
			selectAttrcbApplicationBusinessCat.setVisible(true);
			
		}else{
			selectAttrprotectionIntegrity.setVisible(true);
			selectAttrprotectionIntegrityDescription.setVisible(true);
		}		
		if(this.ciTypeId==AC.TABLE_ID_IT_SYSTEM ){
			selectcAttCbOsGroup.setVisible(true);
			selectAttrCbOsType.setVisible(true);
			selectAttrCbOsName.setVisible(true);
			selectAttrcbClusterCode.setVisible(true);
			selectAttrcbClusterType.setVisible(true);
			selectAttrRgVirtualHWClient.setVisible(true);
			selectAttrgVirtualHWHost.setVisible(true);
			selectAttrcbVirtualSoftware.setVisible(true);
			selectAttrcbPrimaryFunction.setVisible(true);
			selectAttrselectAttrseverityLevel.setVisible(true);
			selectAttrselectAttrpriorityLevel.setVisible(true);
			selectAttrlifecycleStatus.setVisible(true);
			selectAttroperationalStatus.setVisible(true);			
		}
		if(this.ciTypeId==AC.TABLE_ID_ROOM || this.ciTypeId==AC.TABLE_ID_POSITION ){
			selectAttrselectAttrseverityLevel.setVisible(true);
		}
		if((this.ciTypeId==AC.TABLE_ID_APPLICATION  || this.ciTypeId==AC.TABLE_ID_IT_SYSTEM || this.ciTypeId==AC.TABLE_ID_ROOM || this.ciTypeId==AC.TABLE_ID_POSITION) && AAM.hasRole(AC.USER_ROLE_AIR_BUSINESS_ESSENTIAL_EDITOR)){
			selectAttrBusinessEssential.setVisible(true);
		}
		var storeIds = {
				osGroupsListStore: null,
				osTypesListStore: null,
				osNamesListStore: null,
				clusterCodesListStore: null,
				clusterTypesListStore: null,
				virtualSoftwareListStore: null,
				itSystemPrimaryFunctionsListStore: null,
				serviceContractListStore: null
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
        var selectcAttCbOsGroup = this.getComponent('selectAttrfsSpecifics').getComponent('selectcAttCbOsGroup');
        var selectAttrCbOsType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsType');
        var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
        var selectAttrcbClusterCode = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterCode');
        var selectAttrcbClusterType = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbClusterType');
		var selectAttrserviceContract = this.getComponent('selectAttrAgreement').getComponent('selectAttrserviceContract');
		selectcAttCbOsGroup.bindStore(AIR.AirStoreManager.getStoreByName('osGroupsListStore'));
		selectAttrCbOsType.bindStore(AIR.AirStoreManager.getStoreByName('osTypesListStore'));
		selectAttrCbOsName.bindStore(AIR.AirStoreManager.getStoreByName('osNamesListStore'));
        selectAttrcbClusterCode.bindStore(AIR.AirStoreManager.getStoreByName('clusterCodesListStore'));
        selectAttrcbClusterType.bindStore(AIR.AirStoreManager.getStoreByName('clusterTypesListStore'));
        selectAttrcbVirtualSoftware.bindStore(AIR.AirStoreManager.getStoreByName('virtualSoftwareListStore'));
        selectAttrcbPrimaryFunction.bindStore(AIR.AirStoreManager.getStoreByName('itSystemPrimaryFunctionsListStore'));
        selectAttrserviceContract.bindStore(AIR.AirStoreManager.getStoreByName('serviceContractListStore'));
        
		storeLoader.destroy();
		if(this.ciTypeId==AC.TABLE_ID_IT_SYSTEM){
			var filterData = {
					itSystemType: this.ciSubTypeId
				};
			selectAttrCbOsType.filterByData(filterData);
			selectAttrCbOsName.filterByData(filterData);
			filterData={
					type: this.ciSubTypeId
			};
			selectcAttCbOsGroup.filterByData(filterData);
			
		}
    },
    onSave: function(button, event){
		var msgText = 'You are in mass update mode. Are you sure that you update all elements marked in the list with the selected attributes ?';
		Ext.Msg.show({
			title: 'Start Mass Update',
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
			var selectAttrgVirtualHWHost = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrgVirtualHWHost');
			var selectAttrRgVirtualHWClient = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrRgVirtualHWClient');
			var selectAttrCbOsName = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrCbOsName');
			var selectAttrtaCiDescriptionW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrtaCiDescriptionW');
			var selectAttrlvOrganisationalScopeW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrlvOrganisationalScopeW');
			//var selectAttrcbDataClass = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbDataClass');
			var selectAttroperationalStatus = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttroperationalStatus');
            var selectAttrapplicationVersion = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrapplicationVersion');
            var selectAttrrgBARrelevanceW = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrrgBARrelevanceW');
            var selectAttrcbgRegulationsW = this.getComponent('selectAttrCompliance').getComponent('selectAttrcbgRegulationsW');
            var selectAttrcbPrimaryFunction = this.getComponent('selectAttrfsSpecifics').getComponent('selectAttrcbPrimaryFunction');
            var selectAttrBusinessEssential = this.getComponent('selectAttrAgreement').getComponent('selectAttrBusinessEssential');

            
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
				 	osNameId: selectAttrCbOsName.getValue(),
			        categoryBusinessId: selectAttrcbApplicationBusinessCat.getValue(),
			        //classDataId: selectAttrcbDataClass.getValue(),
			        comments: selectAttrtaCiDescriptionW.getValue(),
			        operationalStatusId: selectAttroperationalStatus.getValue(),
			        version: selectAttrapplicationVersion.getValue(),
			        barRelevance: selectAttrrgBARrelevanceW.getValue()!= null ? selectAttrrgBARrelevanceW.getValue().inputValue : '',
			        isVirtualHardwareClient: selectAttrRgVirtualHWClient.getValue()!= null ? selectAttrRgVirtualHWClient.getValue().inputValue : '',
			        isVirtualHardwareHost:	selectAttrgVirtualHWHost.getValue()!= null ? selectAttrgVirtualHWHost.getValue().inputValue : '',
			        virtualHardwareSoftware: selectAttrcbVirtualSoftware.getValue(),
			        relevanceGR1435: selectAttrcbgRegulationsW.items.items[0].getValue() ? 'Y' : 'N',
			        relevanceGR1920: selectAttrcbgRegulationsW.items.items[2].getValue() ? 'Y' : 'N',
			        relevanceGR2059: selectAttrcbgRegulationsW.items.items[1].getValue() ? 'Y' : 'N',
			        relevanceGR2008: selectAttrcbgRegulationsW.items.items[3].getValue() ? 'Y' : 'N',
			        primaryFunctionId: selectAttrcbPrimaryFunction.getValue(),
			        businessEssentialId: selectAttrBusinessEssential.getValue()
			        
			};
			if(scopes.length > 0)
				params.organisationalScope = scopes;			
			massUpdateChangeAttrSaveStore.load({
				params: params
			});
			
		}
		else{
   		Ext.Msg.show({
   			title: ' Canceled Mass Update', 
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
	    			title: 'Mass Update Completed',
	    			msg: 'Mass Update completed.',
	    			buttons: Ext.MessageBox.OK,
	    			icon: Ext.MessageBox.INFO			
	    		});			
    		break;
		case 'ERROR':
			var msg = records[0].data.messages;
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

    },
	filterCombo: function(combo) {
		
		var filterData = {
				itsetId: '10002'
		};
	
		if(this.ciTypeId == AC.TABLE_ID_APPLICATION) {
			filterData.ciKat1 = this.ciSubTypeId;
			filterData.tableId = this.ciTypeId;
		} else {
			filterData.tableId = this.ciTypeId;
		}
		
		combo.filterByData(filterData);
	},
	onSlaSelect: function(combo, record, index) {
		var selectAttrserviceContract = this.getComponent('selectAttrAgreement').getComponent('selectAttrserviceContract');
		selectAttrserviceContract.enable();

		selectAttrserviceContract.reset();

		var filterData = { slaId: record.data.id };
		selectAttrserviceContract.filterByData(filterData);
		
		if(selectAttrserviceContract.getStore().getCount() === 1)
			selectAttrserviceContract.setValue(selectAttrserviceContract.getStore().getAt(0).get('id'));
    	
	},
	
	onSlaChange: function(combo, newValue, oldValue) {
		
		var selectAttrserviceContract = this.getComponent('selectAttrAgreement').getComponent('selectAttrserviceContract');
		selectAttrserviceContract.enable();

		if(typeof newValue === 'string' && newValue.length === 0) {
			combo.reset();
			selectAttrserviceContract.reset();
		} else {
			selectAttrserviceContract.reset();

			newValue = typeof newValue === 'string' ? newValue : oldValue;
			
			var filterData = { slaId: newValue };
			selectAttrserviceContract.filterByData(filterData);
			
			if(selectAttrserviceContract.getStore().getCount() === 1)
				selectAttrserviceContract.setValue(selectAttrserviceContract.getStore().getAt(0).get('id'));
		}
	},
	onServiceContractSelect: function(combo, record, index) {
		
		var selectAttrsla = this.getComponent('selectAttrAgreement').getComponent('selectAttrsla');
		selectAttrsla.setValue(record.get('slaId'));
		
	},
	onServiceContractChange: function (combo, newValue, oldValue) {
		var selectAttrsla = this.getComponent('selectAttrAgreement').getComponent('selectAttrsla');			
			var r = Util.getComboRecord(combo, 'id', parseInt(newValue));//cbServiceContract.getStore().getById(parseInt(data.serviceContractId));
			if(r)
				selectAttrsla.setValue(r.get('slaId'));
	},
	
	onServiceContractKeyUp: function(combo, event) {
		if(combo.getRawValue().length === 0) {
			combo.reset();
			delete combo.filterData;
		}
	}

});
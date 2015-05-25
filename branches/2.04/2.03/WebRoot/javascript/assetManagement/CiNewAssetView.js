Ext.namespace('AIR');

AIR.CiNewAssetView = Ext.extend(AIR.AirView, {
	
	initComponent: function() {
		Ext.apply(this, {
			 title: 'ASSET',
			 
			 width: 1800,
			height: 1400,
				autoScroll: true,
				border: false,
			//	layout: 'card',//anchor border anchor vbox
			   activeItem: 0,
				
		    items:[
                    {
                    xtype: 'panel',
                      layout: 'form',
                    	autoScroll: true,
                    	 
             			autoHeight:true,
                    	layoutConfig: {
                        	columns:2
                        	},
                        	bodyStyle: 'padding:10px 5px 0 10px',
                    	items:[
   							{
   								xtype: 'textfield',
								id: 'identnumber',
								 fieldLabel: 'Indent number',
								 lazyRender: true,
							    lazyInit: false,
							    width:300,
							    
							    //bodyStyle: 'padding:10px 5px 0 20px',
							   
							    style: {
							    	
							    	marginBottom: 10,
							    	fontSize: 12
							    }
   							},
   							{
								xtype: 'textfield',
								id: 'tinventory',
								 fieldLabel: 'Inventory',
								 width:300,
							    
							    style: {
							    	marginBottom: 10,
							    	fontSize: 12
							    }
   							},
   							{
								xtype: 'textfield',
								id: 'tdescription',
								 fieldLabel: 'Description',
								 width:300,
								 colspan:1,
							    
							    height:50,
							    style: {
							    	marginBottom: 10,
							    	fontSize: 12
							    }
   							},
   							{
   								xtype: 'combo',
								id: 'resson',
								 fieldLabel: 'Reason for asset',
								 lazyRender: true,
							    lazyInit: false,
							    width:300,

							    style: {
							    	marginBottom: 10,
							    	fontSize: 12
							    }
   							}
   							]
                    },
              //Fieldset panel  
                   {
						xtype: 'panel',
						//border: false,
                    layout: 'table',
                    layoutConfig: {
                    	columns:2
                    	},
                    	autoScroll: true,

                    	//defaults: {frame:true, width:200, height: 200},

				 items: [  
					   {
					xtype:'fieldset',
			        title: 'Product', // title, header, or checkboxToggle creates fieldset header
			        autoHeight:true,
			        width: 400,
			    	height: 250,
			    	autoScroll: true,
			    	style:{
					    margin: '0 0 0 10'
					     },
			    	
			    	items:[
							{
								xtype: 'combo',
								id: 'cbManufacturer',
								 fieldLabel: 'Manufacturer',
								 lazyRender: true,
							    lazyInit: false,
							    ///mode: 'local',
							    
							    width: 230,
							    style: {
							    	marginBottom: 10
							    }
							},
							{
								xtype: 'combo',
								id: 'cbSubCategory',
								 fieldLabel: 'SubCategory',
								 lazyRender: true,
							    lazyInit: false,
							    ///mode: 'local',
							    
							    width: 230,
							    style: {
							    	marginBottom: 10
							    }
							},
							{
								xtype: 'combo',
								id: 'cbType',
								 fieldLabel: 'Type',
								 lazyRender: true,
							    lazyInit: false,
							    ///mode: 'local',
							    
							    width: 230,
							    style: {
							    	marginBottom: 10
							    }
							},
							{
								xtype: 'combo',
								id: 'cbModel',
								 fieldLabel: 'Model',
								 lazyRender: true,
							    lazyInit: false,
							    ///mode: 'local',
							    
							    width: 230,
							    style: {
							    	marginBottom: 10
							    }
							},
							{
								xtype: 'textfield',
								id: 'tsapdescription',
								 fieldLabel: 'SAP Description of the asset',
								 lazyRender: true,
							    lazyInit: false,
							    ///mode: 'local',
							    
							    width: 230,
							    height:50,
							    style: {
							    	marginBottom: 10,
							    	fontSize: 12
							    }
							},
							{
								xtype: 'button',
								id: 'breset',
								text: 'Reset all Entries',
								
							    //height:50,
							    style: {
							    	'margin-left': 250,
							    	fontSize: 12
							    }
							}
			    	      ]
		              },
		              {
						xtype:'fieldset',
					     title: 'Business Information', // title, header, or checkboxToggle creates fieldset header
					     autoHeight:true,
					    width: 600,
					     height: 350,
					     style:{
					    margin: '0 0 0 10'
					     },
					     
					     items:[
								{
									xtype: 'combo',
									id: 'cbOrder',
									 fieldLabel: 'Order Number',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'textfield',
									id: 'tInventorynumber',
									 fieldLabel: 'Inventory Number',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								
								{
									xtype: 'combo',
									id: 'cbPsp',
									 fieldLabel: 'PSP-Element',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'textfield',
									id: 'tPsptext',
									 fieldLabel: 'PSP-Text',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'combo',
									id: 'cbCostcenter',
									 fieldLabel: 'Cost center',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'combo',
									id: 'cbRequester',
									 fieldLabel: 'Requester',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tcost',
									 fieldLabel: 'Cost Center Manager',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tOrganisation',
									 fieldLabel: 'Organizational Unit',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								
								{
									xtype: 'textfield',
									id: 'tOwner',
									 fieldLabel: 'Owner(legal)',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'combo',
									id: 'cbSapAsset',
									 fieldLabel: 'SAP Asset Class',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tAquisition',
									 fieldLabel: 'Aquisition Value(Euro)',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tBook',
									 fieldLabel: 'Book Value(Euro)',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tDate',
									 fieldLabel: 'Date of book value',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tDepreciation',
									 fieldLabel: 'Start date depreciation',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tEconomic',
									 fieldLabel: 'Useful economic life (months)',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
								{
									xtype: 'textfield',
									id: 'tRetirment',
									 fieldLabel: 'Retirement date',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    height:50,
								    style: {
								    	marginBottom: 10,
								    	fontSize: 12
								    }
								},
					            ]
		              },
		              {
							xtype:'fieldset',
					        title: 'Technics',// title, header, or checkboxToggle creates fieldset header
					        colspan:2,
                            autoHeight:true,
					        width: 400,
					    	height: 250,
					    	collapsible: true,
					    	style:{
							    margin: '0 0 0 10'
							     },
					    	items:[
									{
										xtype: 'textfield',
										id: 'tassetid',
										 fieldLabel: 'Technical Number / Asset-ID',
										 lazyRender: true,
									    lazyInit: false,
									    ///mode: 'local',
									    
									    width: 230,
									    style: {
									    	marginBottom: 10
									    }
									},
									{
										xtype: 'textfield',
										id: 'tTechncalmaster',
										 fieldLabel: 'Technical Master',
										 lazyRender: true,
									    lazyInit: false,
									    ///mode: 'local',
									    
									    width: 230,
									    style: {
									    	marginBottom: 10
									    }
									},
									{
										xtype: 'textfield',
										id: 'tsystem',
										 fieldLabel: 'System platform name',
										 lazyRender: true,
									    lazyInit: false,
									    ///mode: 'local',
									    
									    width: 230,
									    style: {
									    	marginBottom: 10
									    }
									},
									{
										xtype: 'textfield',
										id: 'thardware',
										 fieldLabel: 'Hardwaresystem (HWS)',
										 lazyRender: true,
									    lazyInit: false,
									    ///mode: 'local',
									    
									    width: 230,
									    style: {
									    	marginBottom: 10
									    }
									},
									{
										xtype: 'textfield',
										id: 'tOsname',
										 fieldLabel: 'OS-Name',
										 lazyRender: true,
									    lazyInit: false,
									   
									    width: 230,
									    style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }
									},
									{
										xtype: 'textfield',
										id: 'tbworkflow',
										fieldLabel: 'Worflowstatus technical HWS',
									    lazyRender: true,
									    lazyInit: false,
										width: 230,
										style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }	    
												    
									},
									{
										xtype: 'textfield',
										id: 'ttransient',
										fieldLabel: 'HW-transient systems',
									    lazyRender: true,
									    lazyInit: false,
										width: 230,
										style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }	    
												    
									},
									{
										xtype: 'combo',
										id: 'cbworkflowtechnical',
										fieldLabel: 'Worflowstatus technical',
									    lazyRender: true,
									    lazyInit: false,
										width: 230,
										style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }	    
												    
									},
									{
										xtype: 'combo',
										id: 'cbworkflowtechnical',
										fieldLabel: 'Worflowstatus technical',
									    lazyRender: true,
									    lazyInit: false,
										width: 230,
										style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }	    
												    
									},
									
									{
										xtype: 'combo',
										id: 'cbgeneralusage',
										fieldLabel: 'General Usage',
									    lazyRender: true,
									    lazyInit: false,
										width: 230,
										style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }	    
												    
									},
									{
										xtype: 'radiogroup',
										id: 'rbitsecurity',
										fieldLabel: 'IT-Security-Relevance',
									   /* lazyRender: true,
									    lazyInit: false,*/
										width: 230,
										columns: 2,

										items: [{
											id: 'yitsecurity', boxLabel: 'Yes',  inputValue: 'START',  width: 50//BEGINS_WITH
										}, { 
											id: 'nitsecurity', boxLabel: 'No', inputValue: 'EXACT', width: 50
										}],
										style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }	    
												    
									},
									{
										xtype: 'textfield',
										id: 'tcomment',
										fieldLabel: 'Comment',
									    lazyRender: true,
									    lazyInit: false,
										width: 230,
										style: {
									    	marginBottom: 10,
									    	fontSize: 12
									    }	    
												    
									},
					    	      
					    	       
					    	       ]
				       },
				       {
							xtype:'fieldset',
					        title: 'Location',
					        	
					        autoHeight:true,
					        width: 400,
							height: 250,
							style:{
							    margin: '0 0 0 10'
							     },
				       
				       items:[

								{
									xtype: 'combo',
									id: 'cbcountry',
									 fieldLabel: 'Country',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'combo',
									id: 'cbSite',
									 fieldLabel: 'Site',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'combo',
									id: 'cbbuilding',
									 fieldLabel: 'Building',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'combo',
									id: 'cbroom',
									 fieldLabel: 'Room',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'combo',
									id: 'cbrackposition',
									 fieldLabel: 'Rack - Position',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								
								]
				       },
				       {
							xtype:'fieldset',
					        title: 'Contacts',
					        
					        autoHeight:true,
					        	width: 400,
						    	height: 250,
						    	style:{
								    margin: '0 0 0 10'
								     },
				       items:[
								{
									xtype: 'textfield',
									id: 'tCostcentermanager',
									 fieldLabel: 'Cost center manager',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'textfield',
									id: 'tOrganizationalunit',
									 fieldLabel: 'Organizational unit',
									 lazyRender: true,
								    lazyInit: false,
								    ///mode: 'local',
								    
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								{
									xtype: 'combo',
									id: 'cbeditor',
									 fieldLabel: 'Editors group',
									 lazyRender: true,
								    lazyInit: false,
								    width: 230,
								    style: {
								    	marginBottom: 10
								    }
								},
								]
				       },        
				              
		        
		       ]
	
} 
		           ]
		});
		
		AIR.CiNewAssetView.superclass.initComponent.call(this);

	}
			
});
Ext.reg('AIR.CiNewAssetView', AIR.CiNewAssetView); 

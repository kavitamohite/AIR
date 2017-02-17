Ext.namespace('AIR');

AIR.CiNewAssetView = Ext.extend(AIR.AirView, {

    initComponent: function() {
        Ext.apply(this, {
            border: false,
            autoScroll: true,
            layout: 'form',
            padding: 20,
            bodyStyle: {
                backgroundColor: AC.AIR_BG_COLOR,
                color: AC.AIR_FONT_COLOR,
                fontFamily: AC.AIR_FONT_TYPE
            },
            items: [{
                xtype: 'label',
                id: 'assetPanelHeader',
                text: 'New Asset',
                style: {
                    textAlign: 'left',
                    backgroundColor: AC.AIR_BG_COLOR,
                    color: AC.AIR_FONT_COLOR,
                    fontFamily: AC.AIR_FONT_TYPE,
                    fontWeight: 'bold',
                    fontSize: '12pt'
                }
            }, {
                xtype: 'container',
                html: '<hr>',
                cls: 'x-plain',
                style: {
                    color: '#d0d0d0',
                    backgroundColor: '#d0d0d0',
                    height: '1px',
                    marginTop: 25,
                    marginBottom: 20
                }
            },
            {   // Added by enqmu
            	xtype: 'window',
            	id: 'formWindow',
            	closeAction: 'hide',
            	modal: true,
            	title: 'Upload File:',
            	hidden: true,
            	width: 300,
            	items: [ {   
            		xtype: 'panel',
            		id: 'importPanel',
            		html: "<form id='importExcelFile' action='AirExcelImportServlet' method='post' target='_blank' enctype='multipart/form-data'><input id='file' name='file' type='file' /><input type='hidden' id='usercwid' name='usercwid' /></form>"
            			},
                {
    				xtype : 'button',
    				itemId : 'uploadBtn',
    				text : 'Upload',
    				style : {
    					fontSize : 12,
    					margin : '8 10 0 0',
    					width:80
    				}
    			} ]
            },{
                xtype: 'AIR.CiTopPanel',
                id: 'topPanel'
            }, {
                xtype: 'panel',
                id: 'bottomPanel',
                border: false,
                height: 700,
                //autoScroll: true,
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [{
                    xtype: 'panel',
                    id: 'leftPanel',
                    border: false,
                    width: 590,
                    items: [{
                        xtype: 'AIR.CiProduct',
                        id: 'product'
                    }, {
                        xtype: 'AIR.CiTechnics',
                        id: 'technics'
                    }, {
                        xtype: 'AIR.CiContact',
                        id: 'contacts'
                    }]
                }, {
                    xtype: 'panel',
                    id: 'rightPanel',
                    border: false,
                    width: 590,
                    items: [{
                        xtype: 'AIR.CiBusiness',
                        id: 'businessInformation'
                    }, {
                        xtype: 'AIR.CiLocation',
                        id: 'location'
                    }]
                }]
            },{
            	itemId: 'assetHistoryView',
				xtype: 'AIR.CiHistoryView',
				hidden: true
			},{
				xtype : 'panel',
				itemId: 'buttonPanel',
				layout : 'column',
				border: false,
				autoScroll : true,
				autoHeight : true,
				bodyStyle : 'padding:10px 5px 0px 10px',
				items : [{
					xtype : 'button',
					itemId : 'saveBtn',
					text : 'Save',
					hidden: true,
					style : {
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					},
					handler: function(button, event) {
		    	   		this.saveAsset();//button, event
		    		}.createDelegate(this)
				},{
					xtype : 'button',
					itemId : 'copyBtn',
					text : 'Copy',
					hidden: true,
					style : {
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					},
					handler: function(button, event) {
		    	   		this.copyAsset();//button, event
		    		}.createDelegate(this)
				},{
					xtype : 'button',
					itemId : 'cancelBtn',
					text : 'Cancel',
					style : {
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					}
				},{
					xtype : 'button',
					itemId : 'bReset',
					text : 'Reset all Entries',
					style : {
						fontSize : 14,
						margin : '8 10 0 0',
						width:80
					}
				},
				{
					xtype : 'button',
					itemId : 'bImport',
					text : 'Import',
					hidden: false,
					style : {
						fontSize : 14,
						margin : '8 10 0 0',
						width:80
					}
				},
				{
					xtype : 'button',
					itemId : 'bExport',
					text : 'Export',
					hidden: false,
					style : {
						fontSize : 14,
						margin : '8 10 0 0',
						width:80
					}
				},{
					xtype : 'button',
					itemId : 'bHistory',
					text : 'Asset History',
					hidden: true,
					listeners: {
                        click: {
                            fn: this.onAssetHistoryButton,
                            scope: this
                        }
					},
					style : {
						fontSize : 14,
						margin : '8 10 0 0',
						width:80
					}
				}]
			}]
        });

        AIR.CiNewAssetView.superclass.initComponent.call(this);
        this.addEvents('externalNavigation');
        
        var bExport=this.getComponent('buttonPanel').getComponent('bExport');
        bExport.on('click', this.exportAssetAlert, this);  
        this.multipleAssetChecked = false;
        
        var bImport=this.getComponent('buttonPanel').getComponent('bImport');
        bImport.on('click', this.importAssetAlert, this);
        // added by enqmu
        var uploadBtn=this.getComponent('formWindow').getComponent('uploadBtn');
        uploadBtn.on('click', this.importExcel, this);
        this.generateDCFlag = false;
        var btnDCName = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('pSystemPlatform').getComponent('dcName');
        btnDCName.on('click', this.generateDCNumbers, this);

        // end
        var bReset = this.getComponent('buttonPanel').getComponent('bReset');
        bReset.on('click', this.resetFormFields, this);

        var cancelBtn = this.getComponent('buttonPanel').getComponent('cancelBtn');
        cancelBtn.on('click', this.goToAssetManagement, this);
        
    	var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
    	cbManufacturer.on('select', this.onFieldKeyUp, this);
    	cbManufacturer.on('keypress', this.onFieldKeyUp, this);
        
        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
        cbSubCategory.on('select', this.onFieldKeyUp, this);
        cbSubCategory.on('keypress', this.onFieldKeyUp, this);
        
        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
        cbType.on('select', this.onFieldKeyUp, this);
        cbType.on('keypress', this.onFieldKeyUp, this);

        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
        cbModel.on('select', this.onFieldKeyUp, this);
        cbModel.on('keypress', this.onFieldKeyUp, this);
        cbModel.on('select', this.onModelSelect, this);
        
        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
        cbCostcenter.on('select', this.onFieldKeyUp, this);
        cbCostcenter.on('keypress', this.onFieldKeyUp, this);
           
        var tfRequester = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester');
        tfRequester.on('change', this.onFieldKeyUp, this);
        tfRequester.on('select', this.onFieldKeyUp, this);
        
        var cbRoom = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbRoom');
        cbRoom.on('select', this.onFieldKeyUp, this);
        cbRoom.on('keypress', this.onFieldKeyUp, this);
        
        var cbBuilding =this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbBuilding');
        cbBuilding.on('select', this.onFieldKeyUp, this);
        cbBuilding.on('keypress', this.onFieldKeyUp, this);
        
        var cbSite = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbSite');
        cbSite.on('select', this.onFieldKeyUp, this);
        cbSite.on('keypress', this.onFieldKeyUp, this);
        
        var cbCountry = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbCountry');
        cbCountry.on('select', this.onFieldKeyUp, this);
        cbCountry.on('keypress', this.onFieldKeyUp, this);
        
        var cbRack = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack');
        cbRack.on('select', this.onFieldKeyUp, this);
        cbRack.on('keypress', this.onFieldKeyUp, this);
        
        var checkmultipleasset=this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pMultipleAsset').getComponent('checkmultipleasset');
        checkmultipleasset.on('check', this.onCheckMultipleAsset, this);
            
    },
    
    
    
    
    
    //C0000049066
    onCheckMultipleAsset: function(checkbox, isChecked){
    	this.multipleAssetChecked = isChecked;
		var bExport = this.getComponent('buttonPanel').getComponent('bExport');
		var bImport = this.getComponent('buttonPanel').getComponent('bImport');
		var tmultipleasset=this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pMultipleAsset').getComponent('tmultipleasset');
		if(isChecked) {
			tmultipleasset.enable();
			/*bExport.show();
			bImport.show();*/
		}
		else if(!isChecked){
			tmultipleasset.disable();
			tmultipleasset.setValue('');
			/*bExport.hide();
			bImport.hide();*/
		}				
	},
	
	assetsExcelExport:function(link, event){
		
		if(link != 'yes')
		{
			return;
		}
		
    	var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
    	var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
  	    var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
    	var cbmodel=this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
    	var tsapDescription=this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
    	var tmultipleasset=this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pMultipleAsset').getComponent('tmultipleasset');  
    	console.log('tmultipleasset--'+tmultipleasset.getRawValue())
    	// Added by anit
    	var cbCostcenterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter').getRawValue();
    	var cbPspValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pPSPElement').getComponent('cbPsp').getRawValue();
    	var cbSiteValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbSite').getRawValue();
    	var tTechnicalMasterValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalMaster').getRawValue();
    	var tSerialNumberValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tSerialNumber').getRawValue();
    	var tTechnicalNumberValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalNumber').getRawValue();
    	var tInventorynumberValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber').getRawValue();
    	var tOrderNumberValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbOrderNumber').getRawValue();
    	var tOrganisationValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOrganisation').getRawValue();     // 
    	var tOwnerValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOwner').getRawValue();
    	
    	var tCountryValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbCountry').getRawValue();
    	var tSiteValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbSite').getRawValue();
    	var tBuildingValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbBuilding').getRawValue(); 
    	var tRoomValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbRoom').getRawValue();
    	var tRackPositionValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack').getRawValue();
    	// end by anit
    	var exportForm = AAM.getExportForm();
		
		exportForm.action = '/AIR/newExcelExport';
		exportForm.method = 'POST';
		exportForm.target = '_blank';
		
		exportForm.searchAction.value = this.searchActionValue; // link.getId().substring(0, link.getId().indexOf('_')); // by enqmu
		exportForm.cwid.value = AAM.getCwid();
		
		if(cbManufacturer.getRawValue() == null || cbManufacturer.getRawValue() == '' || cbManufacturer.getRawValue() == 'unknown')
		{
			Ext.Msg.alert('Error', 'Manufacturer must be provided.');
			return;
		}
		else {
			exportForm.manufacturer.value = cbManufacturer.getRawValue();
		}
		
		if(cbSubCategory.getRawValue() == null || cbSubCategory.getRawValue() == '' || cbSubCategory.getRawValue() == 'unknown')
		{
			Ext.Msg.alert('Error', 'SubCategory must be provided.');
			return;
		}
		else {
			exportForm.subCategory.value = cbSubCategory.getRawValue();
		}
		
		if(cbType.getRawValue() == null || cbType.getRawValue() == '' || cbType.getRawValue() == 'unknown')
		{
			Ext.Msg.alert('Error', 'Type must be provided.');
			return;
		}
		else {
			exportForm.type.value = cbType.getRawValue();
		}
		
		if(cbmodel.getRawValue() == null || cbmodel.getRawValue() == '' || cbmodel.getRawValue() == 'unknown')
		{
			Ext.Msg.alert('Error', 'Model must be provided.');
			return;
		}
		else {
			exportForm.model.value = cbmodel.getRawValue();
		}
		
		var tCheckmultipleassetValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pMultipleAsset').getComponent('checkmultipleasset').getValue();
		
		if(tCheckmultipleassetValue == false)
		{
			exportForm.multipleasset.value = 1;
		}
		else
		{
			exportForm.multipleasset.value = tmultipleasset.getRawValue();
		}
		
		if(exportForm.multipleasset.value < 1 || exportForm.multipleasset.value % 1 != 0) {
			Ext.Msg.alert('Message', 'Number of assets should be a number and not be less than 1.');
			return;
		}
		
		exportForm.sapDescription.value = tsapDescription.getRawValue();
		
		// Added by anit
		exportForm.cwid.value = AIR.AirApplicationManager.getCwid();
		exportForm.pspElement.value = cbPspValue;
		exportForm.costCenter.value = cbCostcenterValue;
		exportForm.site.value = cbSiteValue;
		exportForm.serialNumber.value = tSerialNumberValue;
		exportForm.technicalMaster.value = tTechnicalMasterValue;
		exportForm.technicalNumber.value = tTechnicalNumberValue;
		exportForm.inventorynumber.value = tInventorynumberValue;
		exportForm.orderNumber.value = tOrderNumberValue;
		exportForm.organisation.value = tOrganisationValue;
		exportForm.country.value = tCountryValue;
		exportForm.site.value = tSiteValue;
		exportForm.building.value = tBuildingValue;
		if(tRoomValue != null && tRoomValue.indexOf(',') > -1)
		{
			exportForm.room.value = tRoomValue.split(',')[0];
		}
		else
		{
			exportForm.room.value = tRoomValue;
		}
		exportForm.rackPosition.value = tRackPositionValue;
		exportForm.generateDCFlag.value = this.generateDCFlag;
		if(tOwnerValue != '' && tOwnerValue.indexOf('-') > -1)
		{
			var i = tOwnerValue.lastIndexOf("-");
			var strArr = tOwnerValue.substring(0,i);
			var strArr1 = tOwnerValue.substring(i);
			//var strArr = tOwnerValue.split('-');
			if(strArr[0] != null) {
				exportForm.companyName.value = strArr[0].trim();
			}
			if(strArr[1] != null) {
				exportForm.companyCode.value = strArr1[1].trim();
			}
		}
		this.generateDCFlag = false;
		// End by anit
		exportForm.submit();
    	
    },
    //C0000049066
    exportAssetAlert :function(link, event){
    	
    	this.searchActionValue = link.getId().substring(0, link.getId().indexOf('_'));
    	
		var message='Are you sure you want to perform the export for the updated Asset details?';
		var windowTitle= 'Start Export of Assets';
		Ext.Msg.show({
			   title: windowTitle,
			   msg: message,
			   buttons: Ext.Msg.YESNO,
			   fn: this.assetsExcelExport,
			   scope: this,
			   icon: Ext.MessageBox.INFO
			});
    },
    
    importAssetAlert :function(){
		var message='Are you sure you want to perform the import for the updated Asset details?';
		var windowTitle= 'Start Import of Assets';
		Ext.Msg.show({
			   title: windowTitle,
			   msg: message,
			   buttons: Ext.Msg.YESNO,
			   fn: this.testExcelImport,
			   scope: this,
			   icon: Ext.MessageBox.INFO
			});
    },
    
    testExcelImport:function(button,object) {
    	if(button=='yes'){
        	this.getComponent('formWindow').show();
        	document.getElementById('importExcelFile').value='';
    	}
    },
    importExcel:function(link, event) {
    	this.getComponent('formWindow').hide();
    	document.getElementById('usercwid').value = AIR.AirApplicationManager.getCwid();
    	var importExcelFile = document.getElementById('importExcelFile');
    	importExcelFile.submit();
    }, 
    generateDCNumbers:function(button, event) {
    	var cbSubCategoryValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getRawValue();
    	
    	if(cbSubCategoryValue == 'Server')
    	{
    		Ext.Msg.alert('Message', 'DC Names are generated and available in the Export file. Please click on Export below.');
    	}
    	
        if(cbSubCategoryValue == 'Server' && this.multipleAssetChecked == false)
		{
        	this.generateDCFlag = true;
        	var dcConstantStore = AIR.AirStoreFactory.getMaximumDCConstantStore();
        	dcConstantStore.on('load', this.updateDCConstant, this);
        	dcConstantStore.load();
        }
        else if(cbSubCategoryValue == 'Server' && this.multipleAssetChecked == true)
        {
        	this.generateDCFlag = true;
        }
        else if(cbSubCategoryValue != 'Server')
        {
        	this.generateDCFlag = false;
        	Ext.Msg.alert('Message', 'DC Name button can only be used for server category asset.');
        }
    },
    updateDCConstant: function(store, records, options) {
    	this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('pSystemPlatform').getComponent('cbSystemPlatform').setValue(records[0].data.dcConstant);
    },
    onModelSelect:function(field, newValue, oldValue) {
    	var cbSubCategoryValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getRawValue();
		if(cbSubCategoryValue == 'Server')
		{
			Ext.Msg.alert('Message', 'Press DC Name button to auto generate DC numbers otherwise it will not be generated.');
		}
		
    },
    
    onAssetHistoryButton: function(){
    	var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();
    	if(assetId){
        	AAM.getMask(AC.MASK_TYPE_LOAD).show();
    		var historyListStore = AIR.AirStoreFactory.createHistoryListStore();

    		var params = {
    			cwid: AAM.getCwid(),
    			token: AAM.getToken(),
    			id:  assetId,
    			tableId: 19
    		};
    		
    		historyListStore.addListener('load', function() {
    	    	AAM.getMask(AC.MASK_TYPE_LOAD).hide();

    			assetHistoryWindow = new Ext.Window({
    	            title: 'History',
    	            layout: 'fit',
    	            width: 1210,
    	            height: 600,
    	            modal: true,
    	            closeAction: 'hide',
    	            items: [{
    	          		    	xtype: 'grid',
    	        		        id: 'historyListView',
    	        		        layout: 'fit',
    	        		        height: 400,
    	        		    	store: this,
    	        		        emptyText: 'No data',
    	        		        border: false,
    	        		        
    	        		        columns: [{
    	        		            header: 'Date Time',
    	        		            dataIndex: 'datetime',
    	        		            id: 'historyDatetime',
    	        					menuDisabled: true,
    	        					width: 150
    	        		        },{
    	        		            header: 'Change Source',
    	        		            dataIndex: 'changeSource',
    	        		            id: 'historyChangeSource',
    	        					menuDisabled: true,
    	        					width: 150
    	        		        },{
    	        		            header: 'Change User',
    	        		            dataIndex: 'changeDBUser',
    	        		           	id: 'historyChangeDBUser',
    	        					menuDisabled: true,
    	        					width: 150
    	        		        },{
    	        		            header: 'Change user CWID',
    	        		            dataIndex: 'changeUserCWID',
    	        		            id: 'historyChangeUserCWID',
    	        					menuDisabled: true,
    	        					width: 150
    	        		    	},{
    	        		            header: 'Attribute Name',
    	        		            dataIndex: 'changeAttributeName',
    	        		            id: 'historyChangeAttributeName',
    	        					menuDisabled: true,
    	        					width: 150
    	        		        },{
    	        		            header: 'Asset id',
    	        		            dataIndex: 'ciId',
    	        		            id: 'ciId',
    	        					menuDisabled: true,
    	        					width: 150
    	        		    	},{
    	        		    		header: 'Old value',
    	        		            dataIndex: 'changeAttributeOldValue',
    	        		            id: 'historyChangeAttributeOldValue',
    	        					menuDisabled: true,
    	        					width: 150
    	        		    	},{
    	        		            header: 'New value',
    	        		            dataIndex: 'changeAttributeNewValue',
    	        		            id: 'historyChangeAttributeNewValue',
    	        		            css: 'color: red;',
    	        					menuDisabled: true,
    	        					width: 150
    	        		        },{
    	        		        	header: 'Info Type',
    	        		        	dataIndex: 'infoType',
    	        		        	id: 'infoType',
    	        					hidden: true,
    	        					menuDisabled: true
    	        		        }],
    	        				
    	        				view: new Ext.grid.GroupingView({})
    	        		    }]
    	    	});
    	    	assetHistoryWindow.show();
    		});
    		
    		historyListStore.load({
    			params: params
    		});
    		
    	}
    },
    
    goToAssetManagement: function(button, event) {
		this.fireEvent('externalNavigation', this, button, 'clAssetManagement');
	},

    resetFormFields: function(assetData) {

    	if(!assetData){
    		assetData = {};
    		assetData.requester = AAM.getFullName();
    		assetData.requesterId = AAM.cwid;
    		assetData.insertUser = AAM.cwid;
    		assetData.insertSource = 'AIR';
       		assetData.owner = 'Bayer Business Services GmbH - 907820';
    		assetData.ownerId = '161';
    		assetData.workflowStatus = 'ORDER :: assigned for delivery';
    		assetData.workflowStatusId = '1009';
    		assetData.countryId = '1';
    		assetData.country = 'Germany';
    		this.update(assetData);
    	} else {
        	var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();
        	//var insertSource = this.getComponent('')
        	if(assetId){
        		var ciDetailStore = AIR.AirStoreFactory.createAssetListStore();
        		ciDetailStore.on('beforeload', this.onBeforeAssetLoad, this);
        		ciDetailStore.on('load', this.onAssetLoad, this);
        		ciDetailStore.load({
        			params: {
        				assetId: assetId,
        				queryMode: AAM.getComponentType()
        			}
        		});
        	} else {
        		assetData = {};
        		assetData.requester = AAM.getFullName();
        		assetData.requesterId = AAM.cwid;
        		assetData.insertUser = AAM.cwid;
        		assetData.insertSource = 'AIR';
           		assetData.owner = 'Bayer Business Services GmbH - 907820';
        		assetData.ownerId = '161';
        		assetData.workflowStatus = 'ORDER :: assigned for delivery';
        		assetData.workflowStatusId = '1009';
        		assetData.countryId = '1';
        	//	assetData.country = 'Germany';
        		this.update(assetData);
        	}
    	}
    },
    
    onBeforeAssetLoad: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
	},
	
	onAssetLoad: function(store, records, options) {
		var assetData = records[0].data;
		this.update(assetData);
	},

    updateLabels: function(labels) {
    	var topPanel = this.getComponent('topPanel');
    	topPanel.updateLabels(labels);

    	var product = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
    	product.updateLabels(labels);
    	
    	var location = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location');
    	location.updateLabels(labels);
    	
    	var business = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
    	business.updateLabels(labels);
    	
    	var contact = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
    	contact.updateLabels(labels);
    	
    	var technics = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics');
    	technics.updateLabels(labels);
    },

    onFieldKeyUp: function(field, newValue, oldValue) {
		this.enableAssetButtons();
	},
	
	enableAssetButtons: function() {	
		var saveBtn = this.getComponent('buttonPanel').getComponent('saveBtn');
		var copyBtn = this.getComponent('buttonPanel').getComponent('copyBtn');
		var bHistory = this.getComponent('buttonPanel').getComponent('bHistory');
		
		var cbManufacturerValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getValue();
		var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
		var cbSubCategoryValue = cbSubCategory.getValue();
		var cbTypeValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType').getValue();
		var cbLifeCycleStatusValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbWorkflowTechnical').getValue();
		var cbModelValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel').getValue();
		var cbRoomValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbRoom').getValue();
		var cbBuildingValue =this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbBuilding').getValue();
		var cbSiteValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbSite').getValue();
		var cbCountryValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbCountry').getValue();
		var cbRackValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack').getValue();
		var cbCostcenterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter').getValue();
		var tfRequesterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester').getRawValue();
		
		var cbOrderNumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbOrderNumber');
		var tInventorynumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber');
		var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pPSPElement').getComponent('cbPsp');
		
		if (cbManufacturerValue > 0 && cbSubCategoryValue > 0
				&& cbTypeValue > 0 && cbModelValue > 0
				&& cbCountryValue > 0 && cbSiteValue > 0
				&& cbBuildingValue > 0 && cbRoomValue > 0
				&& cbRackValue > 0 && cbCostcenterValue > 0
				&& tfRequesterValue.length > 0) {
			var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
			
			rolePersonListStore.each(function(item) {
				var value = item.data.roleName;
				if(value === AC.USER_ROLE_AIR_ASSET_MANAGER){
					saveBtn.show();
					copyBtn.show();
					
					cbOrderNumber.setReadOnly(false);
					tInventorynumber.setReadOnly(false);
					cbPsp.enable();
				} else if(value === AC.USER_ROLE_AIR_ASSET_EDITOR){
					saveBtn.show();
					
					cbOrderNumber.setReadOnly(true);
					tInventorynumber.setReadOnly(true);;
					cbPsp.disable();
					
					if(cbLifeCycleStatusValue == 1007){
						saveBtn.hide();
					}
				}
			});
			
		} else {
			saveBtn.hide();
			copyBtn.hide();
		}
		
		var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();

		if(assetId){
    		bHistory.show();
    	} else {
    		bHistory.hide();
    	}
	},

    update: function(assetData) {
    	var topPanel = this.getComponent('topPanel');
    	topPanel.update(assetData);

    	var product = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
    	product.update(assetData);
    	
    	var location = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location');
    	location.update(assetData);
    	
    	var business = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
    	business.update(assetData);
    	
    	var contact = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
    	contact.update(assetData);
    	
    	var technics = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics');
    	technics.update(assetData);

    	this.enableAssetButtons();
        AAM.getMask(AC.MASK_TYPE_LOAD).hide();
    },

    saveAsset: function() {
    	AAM.getMask(AC.MASK_TYPE_LOAD).show();
    	
        newAssetstore = AIR.AirStoreFactory.createSaveAssetStore();
        var assetData = this.getUpdateParam();
        
    	newAssetstore.on('load', this.onSaved, this);
        newAssetstore.load({
            params: assetData
        });
        
    },
    
    copyAsset: function() {
    	AAM.getMask(AC.MASK_TYPE_LOAD).show();
    	
        newAssetstore = AIR.AirStoreFactory.createSaveAssetStore();
        var assetData = this.getUpdateParam();
        
        assetData.id=undefined;
        assetData.identNumber=undefined;
        assetData.serialNumber=undefined;
        assetData.technicalNumber=undefined;
        assetData.technicalMaster=undefined;
        assetData.systemPlatformName=undefined;
        assetData.inventoryNumber=undefined;
        
        
    	newAssetstore.on('load', this.onCopy, this);
        newAssetstore.load({
            params: assetData
        });
        
    },
    
    
    getUpdateParam: function(){
    	
    	var assetData = {};
    	
    	assetData.insertUser = AAM.cwid;
		assetData.insertSource = 'AIR';
        
        assetData.cwid = AIR.AirApplicationManager.getCwid();
        
        var topPanel = this.getComponent('topPanel');
        topPanel.updateParam(assetData);
    	
    	var product = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
    	product.updateParam(assetData);
    	
    	var location = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location');
    	location.updateParam(assetData);
    	
    	var business = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
    	business.updateParam(assetData);
    	
    	var contact = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
    	contact.updateParam(assetData);
    	
    	var technics = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics');
    	technics.updateParam(assetData);
    	
    	return assetData;
    },
    
    onSaved: function(store, records, options) {
    	var success = (records[0].data.result == 'true');
    	var yesCallback = function() {
			this.wizardStarted = false;
			this.fireEvent('externalNavigation', this, null, 'clCiNewAssetView');
		};
    	
    	var callbackMap = {
			yes: yesCallback.createDelegate(this)
		};
    	
    	AAM.getMask(AC.MASK_TYPE_LOAD).hide();
    	if (success) {
    		this.sendEmail();
    		
    		var topPanel = this.getComponent('topPanel');
	    	topPanel.update(records[0].data);
	    	
        	var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED', callbackMap);
			afterSaveAppWindow.show();
        } else {
        	var dataSavedErrorWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.error);
			dataSavedErrorWindow.show();
        }
    },
    
    onCopy: function(store, records, options) {
    	var assetData = this.getUpdateParam();
    	this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tSerialNumber').setValue('');
    	this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalNumber').setValue('');
    	this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalMaster').setValue('');
    	this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber').setValue('');
    	this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('pSystemPlatform').getComponent('cbSystemPlatform').setValue('');
    	this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tOsName').setValue('');
    	var tInsertUser = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInsertUser').setValue('');
    	var tInsertSource = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInsertSource').setValue('');
    	
    	
    	 tInsertUser.setValue(assetData.insertUser);
    	 tInsertSource.setValue(assetData.insertSource);
    	var success = (records[0].data.result == 'true');
    	var yesCallback = function() {
			this.wizardStarted = false;
			this.fireEvent('externalNavigation', this, null, 'clCiNewAssetView');
		};
    	
    	var callbackMap = {
			yes: yesCallback.createDelegate(this)
		};
    	
    	AAM.getMask(AC.MASK_TYPE_LOAD).hide();
    	if (success) {
    		var topPanel = this.getComponent('topPanel');
	    	topPanel.update(records[0].data);
	    	
	    	/*var businessInformation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInsertUser');
	    	businessInformation.update(records[0].data);*/
	    	//businessInformation.value = "";
	    	//businessInformation.setValue(assetData.insertSource);
	    	
        	var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('ASSET_COPY', callbackMap);
			afterSaveAppWindow.show();
        } else {
        	var dataSavedErrorWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.error);
			dataSavedErrorWindow.show();
        }
    },
    
    sendEmail: function(){
    	var assetData = this.getUpdateParam();
    	if(assetData.id &&  assetData.inventoryNumber !=undefined && assetData.inventoryNumber !=''){
    		var mailText = mail_blank_text_hardware_asset.replace('<username>', AAM.getUserName());
        	mailText = mailText.replace('<manufacturer>',assetData.manufacturer);
        	mailText = mailText.replace('<subcategory>',assetData.subcategory);
        	mailText = mailText.replace('<type>',assetData.type);
        	mailText = mailText.replace('<model>',assetData.model);
        	mailText = mailText.replace('<sapDescription>',assetData.sapDescription);
        	
        	//var legalEntity = assetData.owner;
        	mailText = mailText.replace('<inventoryNumber>',assetData.inventoryNumber);
        	mailText = mailText.replace('<orderNumber>',assetData.orderNumber);
        	mailText = mailText.replace('<costCenter>',assetData.costCenter);
        	mailText = mailText.replace('<legalEntity>',assetData.owner);
        	
        	mailText = mailText.replace('<serialNumber>', assetData.serialNumber);   // added by enqmu
        	mailText = mailText.replace('<technicalNumber>',assetData.technicalNumber);
        	mailText = mailText.replace('<technicaMaster>',assetData.technicalMaster);
        	mailText = mailText.replace('<generalUsage>',assetData.generalUsage);
        	mailText = mailText.replace('<lifecycleStatus>',assetData.workflowStatus);

        	mailText = mailText.replace('<country>',assetData.country);
        	mailText = mailText.replace('<site>',assetData.site);
        	mailText = mailText.replace('<building>',assetData.building);
        	mailText = mailText.replace('<room>',assetData.room);
        	mailText = mailText.replace('<rack>',assetData.rack);

        	mailText = mailText.replace('<costCenterManager>',assetData.costCenterManager);
        		
        	var email = 'mailto:iao-bestellwesen@bayer.com&subject='+mail_subject_hardware_asset+'&body='+mailText;
        	window.location.href = email;
    	}
    	
    }

});
Ext.reg('AIR.CiNewAssetView', AIR.CiNewAssetView);
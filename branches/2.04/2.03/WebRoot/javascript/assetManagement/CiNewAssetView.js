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
            }, {
                xtype: 'AIR.CiTopPanel',
                id: 'topPanel',
            }, {
                xtype: 'panel',
                id: 'bottomPanel',
                border: false,
                height: 420,
                autoScroll: true,
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
                    },{
                    	xtype: 'panel',
                    	height: 25,
                    	border: false
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
				xtype : 'panel',
				id: 'buttonPanel',
				layout : 'column',
				border: false,
				autoScroll : true,
				autoHeight : true,
				bodyStyle : 'padding:10px 5px 0px 10px',
				items : [{
					xtype : 'button',
					id : 'saveBtn',
					text : 'Save',
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
					id : 'cancelBtn',
					text : 'Cancel',
					style : {
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					}
				},{
					xtype : 'button',
					id : 'inventoryBtn',
					text : 'Apply for inventory number',
					style : {
						//marginBottom : 10,
						fontSize : 12,
						margin : '8 10 0 0',
						width:80
					}
				},{
					xtype : 'button',
					id : 'bReset',
					text : 'Reset all Entries',
					style : {
						//marginBottom : 10,
						fontSize : 14,
						margin : '8 10 0 0',
						width:80
					}
				}]
			}]
        });

        AIR.CiNewAssetView.superclass.initComponent.call(this);

        var bReset = this.getComponent('buttonPanel').getComponent('bReset');
        bReset.on('click', this.resetFormFields, this);

        var saveBtn = this.getComponent('buttonPanel').getComponent('saveBtn');
		var cancelBtn = this.getComponent('buttonPanel').getComponent('cancelBtn');
		
		saveBtn.hide();
		cancelBtn.hide();
    },

    resetFormFields: function() {
        //product
        var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
        var tsapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
        //BusinessInformation
        var cbOrderNumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbOrderNumber');
        var tInventorynumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber');
        var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
        var tPsptext = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tPsptext');
        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pCost').getComponent('cbCostcenter');
        var tfRequester = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester');
        var tCostCenterMgr = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tCostCenterMgr');
        var tOrganisation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOrganisation');
        var tOwner = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOwner');
        var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
        var tAquisition = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tAquisition');
        var tBook = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tBook');
        var tDate = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDate');
        var tDepreciation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDepreciation');
        var tEconomic = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic');
        var tRetirment = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tRetirment');
        //Technics
        var tTechnicalNumber = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalNumber');
        var tTechnicalMaster = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalMaster');
        var tSystemPlatform = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tSystemPlatform');
        var tHardware = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tHardware');
        var tOsName = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tOsName');
        var tWorkflowHWS = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tWorkflowHWS');
        var tTransient = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTransient');
        var cbWorkflowTechnical = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbWorkflowTechnical');
        var cbGeneralUsage = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbGeneralUsage');
        var rbItSecurity = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('rbItSecurity');
        var tComment = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tComment');
        //Location
        var cbCountry = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbCountry');
        var cbSite = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbSite');
        var cbBuilding = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbBuilding');
        var cbRoom = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbRoom');
        var cbRack = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack');
        //contacts
        var tCostcentermanager = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('tCostcentermanager');
        var tOrganizationalunit = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('tOrganizationalunit');
        var cbeditor = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('cbeditor');

        //product reset

        cbManufacturer.reset();
        cbSubCategory.reset();
        cbType.reset();
        cbModel.reset();
        tsapDescription.setValue("");
        //business reset
        cbOrderNumber.reset();
        tInventorynumber.setValue("");
        cbPsp.reset();
        tPsptext.setValue("");
        cbCostcenter.reset();
        tfRequester.setValue("");
        tCostCenterMgr.setValue("");
        tOrganisation.setValue("");
        tOwner.setValue("");
        cbSapAsset.reset();
        tAquisition.setValue("");
        tBook.setValue("");
        tDate.setValue("");
        tDepreciation.setValue("");
        tEconomic.setValue("");
        tRetirment.setValue("");
        //technics reset
        tTechnicalNumber.setValue("");
        tTechnicalMaster.setValue("");
        tSystemPlatform.setValue("");
        tHardware.setValue("");
        tOsName.setValue("");
        tWorkflowHWS.setValue("");
        tTransient.setValue("");
        cbWorkflowTechnical.reset();
        cbGeneralUsage.reset();
        rbItSecurity.reset();
        tComment.setValue("");
        //Location reset
        cbCountry.reset();
        cbSite.reset();
        cbBuilding.reset();
        cbRoom.reset();
        cbRack.reset();
        //contacts reset
        cbeditor.reset();
        tCostcentermanager.setValue("");
        tOrganizationalunit.setValue("");
    },

    loadComboboxData: function() {
        this.loadCountryData();
        this.loadManufacturerData();
        this.loadCategoryData();
        this.loadCostcenterData();
        this.loadOperationalStatusData();
        this.loadPspElementData();
        this.loadSapAssetData();
    },

    updateLabels: function(labels) {
//    	this.getComponent('topPanel').getComponent('identNumber').fieldLabel = labels.assetIndentnumber;
//    	Util.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), labels.assetIndentnumber);
//    	this.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), "abcd");
        /*this.setTitle(labels.lNewAsset);
		this.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), labels.assetIndentnumber);
		this.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), labels.assetInventoryNumber);
		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer'), labels.assetManufacture);
		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory'), labels.assetSubcategory);
		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType'), labels.assetType);
		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel'), labels.assetModel);
		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription'), labels.assetSapDescription);
		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('bReset'), labels.assetReset);
		*/
        //this.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), labels.assetIndentnumber);

        //AIR.AirAclManager.setNecessity(this.getComponent('topPanel').getComponent('identNumber'));*/

        //var textindentnumber = this.getComponent('topPanel').getComponent('identNumber');

        //this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW'), labels.operationalStatus);

        //Ext.getBody('topPanel').getComponent('identNumber').el.up('.x-form-item', 10, true).child('.x-form-item-label').update(labels.assetIndentnumber);

        /*	link =this.getComponent('topPanel').getComponent('tinventory');
		link.updateText(labels.assetInventoryNumber);*/


        //this.getComponent('topPanel').getComponent('identNumber').fieldLabel =labels.assetIndentnumber;
        //this.getComponent('topPanel').getComponent('tinventory').fieldLabel =labels.assetInventoryNumber;

    },

    onFieldKeyUp: function(textfield, event) {
		this.onCiAssetChange();
	},
	
	onCiAssetChange:function() {		
		this.enableAssetButtons();
		this.ciModified = true;
	},
	
	enableAssetButtons: function() {	
		var saveBtn = this.getComponent('buttonPanel').getComponent('saveBtn');
		var cancelBtn = this.getComponent('buttonPanel').getComponent('cancelBtn');
		var cbManufacturerValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getRawValue();
		var cbSubCategoryValue=this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getRawValue();
		var cbTypeValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType').getRawValue();
		var cbModelValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel').getRawValue();
		var cbRoomValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbRoom').getRawValue();
		var cbBuildingValue =this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbBuilding').getRawValue();
		var cbSiteValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbSite').getRawValue();
		var cbCountryValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbCountry').getRawValue();
		var cbRackValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack').getRawValue();
		var cbCostcenterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pCost').getComponent('cbCostcenter').getRawValue();
		var cbSapAssetValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset').getRawValue();
		var tfRequesterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester').getRawValue();
		
			if(cbManufacturerValue.length>0 && cbSubCategoryValue.length>0 && cbTypeValue.length>0 && cbModelValue .length>0
				&& cbCountryValue.length>0 && cbSiteValue.length>0 && cbBuildingValue.length>0 && cbRoomValue.length && cbRackValue.length>0 
				&& cbCostcenterValue.length>0 && cbSapAssetValue.length>0 ){
			saveBtn.show();
			cancelBtn.show();
			
			this.fireEvent('airAction', this, 'clear');
		} else {
			saveBtn.hide();
			cancelBtn.hide();
		}
       
	},

    update: function(assetData) {
    	console.log(assetData);

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

        AAM.getMask(AC.MASK_TYPE_LOAD).hide();
    },

    saveAsset: function() {
        newAssetstore = AIR.AirStoreFactory.createSaveAssetStore();
        var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();
        
        var manufacturerId = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getValue();
        var subcategoryId = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getValue();
        var typeId = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType').getValue();
        var modelId = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel').getValue();
        var sapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription').getValue();
        
        var technicalNumber = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalNumber').getValue();
        var technicalMaster = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTechnicalMaster').getValue();
//        var tSystemPlatform = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tSystemPlatform');
//        var tHardware = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tHardware');
//        var tOsName = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tOsName');
//        var tWorkflowHWS = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tWorkflowHWS');
//        var tTransient = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tTransient');
//        var cbWorkflowTechnical = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbWorkflowTechnical');
        var generalUsageId = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbGeneralUsage').getValue();
        var itSecurityRelevance = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('rbItSecurity').getValue().inputValue;
        var comment = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('tComment').getValue();
        
        
        var pspValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp').getValue();
        var costcentervalue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pCost').getComponent('cbCostcenter').getValue();
        var sapAssetvalue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset').getValue();
        var requesterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester').getValue();
        var economicValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic').getValue();
        var generalUsageValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('cbGeneralUsage').getValue();
        var itSecurityValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics').getComponent('rbItSecurity').getValue().inputValue;

        console.log(itSecurityRelevance);
//        newAssetstore.load({
//            params: {
//        		assetId: assetId,
//            	manufacturerId: manufacturerId,
//            	subcategoryId: subcategoryId,
//            	typeId: typeId,
//            	modelId: modelId,
//            	sapDescription: sapDescription,
//            	
//            	technicalNumber: technicalNumber,
//            	technicalMaster: technicalMaster,
//            	generalUsageId: generalUsageId,
//            	itSecurityRelevance: itSecurityRelevance,
//            	comment: comment,
//            	
//                kontoid: costcentervalue,
//                pspElement: pspValue,
//                hardwareCategory1_id: sapAssetvalue,
//                requester: requesterValue,
//                month: economicValue,
//                generalUsageId: generalUsageValue,
//                itSecurityRelevance: itSecurityValue
//            }
//        });
    }

});
Ext.reg('AIR.CiNewAssetView', AIR.CiNewAssetView);
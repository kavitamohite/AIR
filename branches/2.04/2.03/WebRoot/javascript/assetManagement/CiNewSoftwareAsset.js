Ext.namespace('AIR');

AIR.CiNewSoftwareAsset = Ext.extend(AIR.AirView, {

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
                itemId: 'assetPanelHeader',
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
                itemId: 'topPanel',
            }, {
                xtype: 'panel',
                itemId: 'bottomPanel',
                border: false,
                height: 420,
                autoScroll: true,
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [{
                    xtype: 'panel',
                    itemId: 'leftPanel',
                    border: false,
                    width: 590,
                    items: [{
                        xtype: 'AIR.CiProduct',
                        itemId: 'product'
                    }, {
                        xtype: 'AIR.CiContact',
                        itemId: 'contacts'
                    }, {
                        xtype: 'AIR.CiLocation',
                        itemId: 'location'
                    },{
                    	xtype: 'panel',
                    	height: 30,
                    	border: false
                    }]
                }, {
                    xtype: 'panel',
                    itemId: 'rightPanel',
                    border: false,
                    width: 590,
                    items: [{
                        xtype: 'AIR.CiBusiness',
                        itemId: 'businessInformation'
                    }]
                }]
            }, {
                xtype: 'panel',
                itemId: 'buttonPanel',
                layout: 'column',
                border: false,
                autoScroll: true,
                autoHeight: true,
                bodyStyle: 'padding:10px 5px 0px 10px',
                items: [{
                    xtype: 'button',
                    itemId: 'saveBtn',
                    text: 'Save',
                    style: {
                        fontSize: 12,
                        margin: '8 10 0 0',
                        width: 80
                    },
                    handler: function(button, event) {
                        this.saveAsset(); //button, event
                    }.createDelegate(this)
                }, {
                    xtype: 'button',
                    itemId: 'cancelBtn',
                    text: 'Cancel',
                    style: {
                        fontSize: 12,
                        margin: '8 10 0 0',
                        width: 80
                    }
                }, {
                    xtype: 'button',
                    itemId: 'inventoryBtn',
                    text: 'Apply for inventory number',
                    style: {
                        //marginBottom : 10,
                        fontSize: 12,
                        margin: '8 10 0 0',
                        width: 80
                    }
                }, {
                    xtype: 'button',
                    itemId: 'savecloseBtn',
                    text: 'Save & Close',
                    style: {
                        //marginBottom : 10,
                        fontSize: 12,
                        margin: '8 10 0 0',
                        width: 80
                    }
                }, {
                    xtype: 'button',
                    itemId: 'bReset',
                    text: 'Reset all Entries',
                    style: {
                        //marginBottom : 10,
                        fontSize: 14,
                        margin: '8 10 0 0',
                        width: 80
                    }
                }, {
                    xtype: 'button',
                    itemId: 'masterBtn',
                    text: 'Request for new master data',
                    style: {
                        //marginBottom : 10,
                        fontSize: 14,
                        margin: '8 10 0 0',
                        width: 80
                    }
                }, {
                    xtype: 'button',
                    itemId: 'changemasterBtn',
                    text: 'Change master data',
                    style: {
                        //marginBottom : 10,
                        fontSize: 12,
                        margin: '8 10 0 0',
                        width: 80
                    }
                }, {
                    xtype: 'button',
                    itemId: 'assetCheck',
                    text: 'Asset Checked',
                    style: {
                        fontSize: 12,
                        margin: '8 10 0 0',
                        width: 80

                    }
                }]
            }]
        });

        AIR.CiNewSoftwareAsset.superclass.initComponent.call(this);

//        var clRequesterAdd = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('clRequesterAdd');
//        var clRequesterRemove = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('clRequesterRemove');
//        clRequesterAdd.on('click', this.onRequesterAdd, this);
//        clRequesterRemove.on('click', this.onRequesterRemove, this);
//
//        var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
//        cbSapAsset.on('select', this.onSapAssetSelect, this);
//        cbSapAsset.on('keyup', this.onFieldKeyUp, this);
//
//        var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
//        cbPsp.on('select', this.onPSPSelect, this);
//        cbPsp.on('keyup', this.onFieldKeyUp, this);
//
//        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
//        cbCostcenter.on('select', this.onCostCenterSelect, this);
//        cbCostcenter.on('keyup', this.onFieldKeyUp, this);
//
//        var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
//        cbCountry.on('select', this.onCountrySelect, this);
//        cbCountry.on('keyup', this.onFieldKeyUp, this);
//
//        var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
//        cbSite.on('select', this.onSiteSelect, this);
//        cbSite.on('keyup', this.onFieldKeyUp, this);
//
//        var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding'); //.getComponent('pBuilding')
//        cbBuilding.on('select', this.onBuildingSelect, this);
//        cbBuilding.on('keyup', this.onFieldKeyUp, this);
//
//        var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
//        cbRoom.on('select', this.onRoomSelect, this);
//        cbRoom.on('keyup', this.onFieldKeyUp, this);
//
//        var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
//        cbManufacturer.on('select', this.onManufacturerSelect, this);
//        cbManufacturer.on('keyup', this.onFieldKeyUp, this);
//
//        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
//        cbSubCategory.on('select', this.onSubCategorySelect, this);
//        cbSubCategory.on('keyup', this.onFieldKeyUp, this);
//
//        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
//        cbType.on('select', this.onTypeSelect, this);
//        cbType.on('keyup', this.onFieldKeyUp, this);
//
//        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
//        cbModel.on('select', this.onModelSelect, this);
//        cbModel.on('keyup', this.onFieldKeyUp, this);
//
//        var bReset = this.getComponent('buttonPanel').getComponent('bReset');
//        bReset.on('click', this.resetFormFields, this);

    },

//    onRequesterAdd: function(link, event) {
//        AIR.AirPickerManager.openPersonPicker(null, this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester'), event);
//    },
//
//    onRequesterRemove: function(link, event) {
//        AIR.AirPickerManager.openRemovePicker(null, this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester'), event);
//    },
//
//    onSapAssetSelect: function(combo, record, index) {
//        var value = record.get('nameEn');
//        var tEconomic = Ext.getCmp('CiNewSoftwareAsset').getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic');
//        tEconomic.setValue(value);
//    },
//
//    onPSPSelect: function(combo, record, index) {
//        var value = record.get('nameEn');
//        var tPsptext = Ext.getCmp('CiNewSoftwareAsset').getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tPsptext');
//        tPsptext.setValue(value);
//    },
//
//    resetFormFields: function() {
//        //product
//        var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
//        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
//        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
//        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
//        var tsapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
//        var tDescription = this.getComponent('topPanel').getComponent('tDescription');
//        //BusinessInformation
//        var cbOrderNumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbOrderNumber');
//        var tInventorynumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber');
//        var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
//        var tPsptext = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tPsptext');
//        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
//        var tfRequester = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester');
//        var tCostCenterMgr = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tCostCenterMgr');
//        var tOrganisation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOrganisation');
//        var tOwner = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOwner');
//        var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
//        var tAquisition = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tAquisition');
//        var tBook = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tBook');
//        var tDate = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDate');
//        var tDepreciation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDepreciation');
//        var tEconomic = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic');
//        var tRetirment = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tRetirment');
//        //Location
//        var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
//        var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
//        var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
//        var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
//        var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack');
//        //contacts
//        var tCostcentermanager = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('tCostcentermanager');
//        var tOrganizationalunit = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('tOrganizationalunit');
//        var cbeditor = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('cbeditor');
//
//        //product reset
//
//        cbManufacturer.reset();
//        cbSubCategory.reset();
//        cbType.reset();
//        cbModel.reset();
//        tsapDescription.setValue("");
//        tDescription.setValue("");
//        //business reset
//        cbOrderNumber.reset();
//        tInventorynumber.setValue("");
//        cbPsp.reset();
//        tPsptext.setValue("");
//        cbCostcenter.reset();
//        tfRequester.setValue("");
//        tCostCenterMgr.setValue("");
//        tOrganisation.setValue("");
//        tOwner.setValue("");
//        cbSapAsset.reset();
//        tAquisition.setValue("");
//        tBook.setValue("");
//        tDate.setValue("");
//        tDepreciation.setValue("");
//        tEconomic.setValue("");
//        tRetirment.setValue("");
//        //Location reset
//        cbCountry.reset();
//        cbSite.reset();
//        cbBuilding.reset();
//        cbRoom.reset();
//        cbRack.reset();
//        //contacts reset
//        cbeditor.reset();
//        tCostcentermanager.setValue("");
//        tOrganizationalunit.setValue("");
//    },
//
    loadComboboxData: function() {
        this.loadCountryData();
        this.loadManufacturerData();
        this.loadCategoryData();
        this.loadCostcenterData();
        this.loadPspElementData();
        this.loadSapAssetData();
    },
//
//    updateLabels: function(labels) {
//    	AIR.getStoreByName('manufactureListStore');
//        /*this.setTitle(labels.lNewAsset);
//		this.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), labels.assetIndentnumber);
//		this.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), labels.assetInventoryNumber);
//		this.setFieldLabel(this.getComponent('topPanel').getComponent('tDescription'), labels.assetDescription);
//		this.setFieldLabel(this.getComponent('topPanel').getComponent('pReason').getComponent('lReason'), labels.assetReason);
//		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer'), labels.assetManufacture);
//		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory'), labels.assetSubcategory);
//		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType'), labels.assetType);
//		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel'), labels.assetModel);
//		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription'), labels.assetSapDescription);
//		this.setFieldLabel(this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('bReset'), labels.assetReset);
//		*/
//        //this.setFieldLabel(this.getComponent('topPanel').getComponent('identNumber'), labels.assetIndentnumber);
//
//        //AIR.AirAclManager.setNecessity(this.getComponent('topPanel').getComponent('identNumber'));*/
//
//        //var textindentnumber = this.getComponent('topPanel').getComponent('identNumber');
//
//        //this.setFieldLabel(fsCategoriesAndStatus.getComponent('cbAdvSearchGeneralUsageW'), labels.operationalStatus);
//
//        //Ext.getBody('topPanel').getComponent('identNumber').el.up('.x-form-item', 10, true).child('.x-form-item-label').update(labels.assetIndentnumber);
//
//        /*	link =this.getComponent('topPanel').getComponent('tinventory');
//		link.updateText(labels.assetInventoryNumber);*/
//
//
//        //this.getComponent('topPanel').getComponent('identNumber').fieldLabel =labels.assetIndentnumber;
//        //this.getComponent('topPanel').getComponent('tinventory').fieldLabel =labels.assetInventoryNumber;
//
//        this.loadComboboxData();
//    },
//
    onManufacturerSelect: function(combo, record, index) {
        this.manufacturerChanged(record.get('id'));
        this.fireEvent('ciChange', this, combo, record);
    },

    manufacturerChanged: function(value) {
        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
        cbModel.reset();
        cbSubCategory.reset();
        cbType.reset();
        this.updateMailTemplateProduct();
    },

    onSubCategorySelect: function(combo, record, index) {
        this.subCategoryChanged(record.get('id'));
        this.fireEvent('ciChange', this, combo, record);
    },

    subCategoryChanged: function(value) {
        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
        var partnerIdValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getValue();
        var kategoryIdValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getValue();
        cbType.allQuery = value;
        cbType.reset();
        cbType.getStore().load({
            params: {
                partnerId: partnerIdValue,
                kategory2Id: kategoryIdValue
            }
        });
        this.updateMailTemplateProduct();
    },

    onTypeSelect: function(combo, record, index) {
        this.typeChanged(record.get('id'));
        this.fireEvent('ciChange', this, combo, record);
    },

    typeChanged: function(value) {
        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
        cbModel.reset();
        cbModel.allQuery = value;
        cbModel.getStore().load({
            params: {
                itemId: value
            }
        });
        this.updateMailTemplateProduct();
    },

    onModelSelect: function(combo, record, index) {
        this.modelChanged(record.get('id'));
        this.fireEvent('ciChange', this, combo, record);
    },

    modelChanged: function(value) {
        var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getRawValue();
        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType').getRawValue();
        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel').getRawValue();
        var tsapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
        var tDescription = this.getComponent('topPanel').getComponent('tDescription');
        var description = cbManufacturer + " " + cbType + " " + cbModel;
        tsapDescription.setValue(description);
        tDescription.setValue(description);
        this.updateMailTemplateProduct();
    },

    onCountrySelect: function(combo, record, index) {
        this.countryChanged(record.get('id'));
        this.ownerCt.fireEvent('ciChange', this, combo, record);
    },

    countryChanged: function(value) {
        var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
        var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
        var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');

        cbRoom.reset();
        cbBuilding.reset();
        cbSite.reset();

        cbRoom.getStore().removeAll();
        cbBuilding.getStore().removeAll();
        cbSite.getStore().removeAll();

        cbSite.getStore().setBaseParam('id', value);
        cbSite.allQuery = value;
        cbSite.reset();
        cbSite.getStore().load({
            params: {
                itemId: value
            }
        });
        this.updateMailTemplateLocation();
    },

    onSiteSelect: function(combo, record, index) {
        this.siteChanged(record.get('id'));
        this.ownerCt.fireEvent('ciChange', this, combo, record);
    },

    siteChanged: function(value) {
        var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
        var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');

        cbRoom.reset();
        cbBuilding.reset();

        cbRoom.getStore().removeAll();
        cbBuilding.getStore().removeAll();

        cbBuilding.getStore().setBaseParam('id', value);
        cbBuilding.allQuery = value;
        cbBuilding.reset();
        cbBuilding.getStore().load({
            params: {
                itemId: value
            }
        });
        Util.enableCombo(cbRoom);
        this.updateMailTemplateLocation();
    },

    onBuildingSelect: function(combo, record, index) {
        this.buildingChanged(record.get('id'));
        this.ownerCt.fireEvent('ciChange', this, combo, record);
    },

    buildingChanged: function(value) {
        var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
        cbRoom.reset();
        cbRoom.getStore().removeAll();

        cbRoom.getStore().setBaseParam('id', value);
        cbRoom.allQuery = value;
        cbRoom.reset();
        cbRoom.getStore().load({
            params: {
                itemId: value
            }
        });
        Util.enableCombo(cbRoom);
        this.updateMailTemplateLocation();
    },
//
//    onRoomSelect: function(combo, record, index) {
//        this.roomChanged(record.get('id'));
//        this.ownerCt.fireEvent('ciChange', this, combo, record);
//    },
//
//    roomChanged: function(value) {
//        var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack');
//        cbRack.reset();
//        cbRack.getStore().removeAll();
//
//        cbRack.getStore().setBaseParam('id', value);
//        cbRack.allQuery = value;
//        cbRack.reset();
//        cbRack.getStore().load({
//            params: {
//                itemId: value
//            }
//        });
//        Util.enableCombo(cbRack);
//        this.updateMailTemplateLocation();
//    },
//
//    onCostCenterSelect: function(combo, record, index) {
//        personStore = AIR.AirStoreFactory.createPersonStore();
//        personStore.load({
//            params: {
//                query: record.get('cwid')
//            },
//            callback: function(records, options, success) {
//                var value = this.getAt(0).data.firstname + " " + this.getAt(0).data.lastname + "/" + this.getAt(0).data.cwid;
//                var costCenterManager = Ext.getCmp('CiNewSoftwareAsset').getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('tCostcentermanager');
//                costCenterManager.setValue(value);
//            }
//        });
//    },
//
    loadManufacturerData: function() {
        var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
        cbManufacturer.getStore().load();
    },

    loadCategoryData: function() {
        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
        cbSubCategory.getStore().load();
    },

    loadCountryData: function() {
        var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
        cbCountry.displayField = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
        cbCountry.getStore().load({
            callback: function() {
                var field = AAM.getLanguage() == 'DE' ? 'name' : 'nameEn';
                cbCountry.getStore().sort(field, 'ASC');
            }
        });
    },

    loadCostcenterData: function() {
        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
        cbCostcenter.getStore().load();
    },

    loadPspElementData: function() {
        var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
        cbPsp.getStore().load();
    },

    loadSapAssetData: function() {
        var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
        cbSapAsset.getStore().load();

    },

//    updateMailTemplateProduct: function() {
//        var html = '<a id="mailtoproduct" href="{href}"><img src="' + img_Email + '"></a>';
//
//        var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
//        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
//        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
//        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
//        var mailText = mail_Text_product.replace('<manufacturer>', cbManufacturer.getRawValue());
//
//        mailText = mailText.replace('<subcategory>', cbSubCategory.getRawValue());
//        mailText = mailText.replace('<model>', cbModel.getRawValue());
//        mailText = mailText.replace('<type>', cbType.getRawValue());
//        mailText = mailText.replace('<Username>', 'Vandana Hemnani'); //username
//
//        var mailtemplate = 'mailto:vandana.hemnani@bayer.com';
//        mailtemplate += '&subject=' + mail_Subject_product + '';
//        mailtemplate += ('&body=' + mailText);
//        html = html.replace('{href}', mailtemplate);
//        Ext.getCmp('mailproduct').update(html);
//    },
//
//    updateMailTemplateLocation: function() {
//        var html = '<a id="mailtoproduct" href="{href}"><img src="' + img_Email + '"></a>';
//
//        var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
//        var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
//        var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
//        var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
//        var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack');
//
//        var mailText = mail_Text_location.replace('<country>', cbCountry.getRawValue());
//        mailText = mailText.replace('<site>', cbSite.getRawValue());
//        mailText = mailText.replace('<building>', cbBuilding.getRawValue());
//        mailText = mailText.replace('<room>', cbRoom.getRawValue());
//        mailText = mailText.replace('<rack>', cbRack.getRawValue());
//        mailText = mailText.replace('<Username>', 'Vandana Hemnani'); //username
//
//        var mailtemplate = 'mailto:vandana.hemnani@bayer.com';
//        mailtemplate += '&subject=' + mail_Subject_location + '';
//        mailtemplate += ('&body=' + mailText);
//        html = html.replace('{href}', mailtemplate);
//        Ext.getCmp('maillocation').update(html);
//    },
//
//    update: function(assetData) {
//
//        if (assetData.isSoftwareComponent) {
//            this.setIntangibleView();
//        } else if (assetData.isHardwareWithInventory) {
//            this.setTangibleView(true);
//        } else if (assetData.isHardwareWithoutInventory) {
//            this.setTangibleView(false);
//        }
//        //Asset Description
//        var tDescription = this.getComponent('topPanel').getComponent('tDescription');
//        tDescription.setValue(assetData.sapDescription);
//
//        var identNumber = this.getComponent('topPanel').getComponent('identNumber');
//        identNumber.setValue(assetData.identNumber);
//
//        var tinventory = this.getComponent('topPanel').getComponent('tinventory');
//        tinventory.setValue(assetData.inventoryNumber);
//
//        var tReason = this.getComponent('topPanel').getComponent('tReason');
//
//        //Product
//        var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
//        cbManufacturer.setValue(assetData.manufacturerId);
//
//        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
//        cbSubCategory.setValue(assetData.subcategoryId);
//        this.subCategoryChanged(assetData.subcategoryId);
//
//        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
//        cbType.setValue(assetData.typeId);
//        cbType.setRawValue(assetData.type);
//        this.typeChanged(assetData.typeId);
//
//        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
//        cbModel.setValue(assetData.modelId);
//        cbModel.setRawValue(assetData.model);
//
//        var tsapDescription = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('tsapDescription');
//        tsapDescription.setValue(assetData.sapDescription);
//
//        // Location
//        var cbCountry = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbCountry');
//        var cbSite = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbSite');
//        var cbBuilding = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbBuilding');
//        var cbRoom = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('cbRoom');
//        var cbRack = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack');
//
//        //Business Information
//        var cbOrderNumbr = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbOrderNumbr');
//
//        var tInventorynumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber');
//        tInventorynumber.setValue(assetData.inventoryNumber);
//
//        var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp');
//        cbPsp.setValue(assetData.pspElementId);
//        cbPsp.setRawValue(assetData.pspElement);
//
//        var tPsptext = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tPsptext');
//        tPsptext.setValue(assetData.pspText);
//
//        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
//        cbCostcenter.setValue(assetData.costCenterId);
//
//        var tfRequester = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester');
//        tfRequester.setValue(assetData.requester);
//
//        var tfRequesterHidden = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequesterHidden');
//        tfRequesterHidden.setValue(assetData.requesterId);
//
//        var tCostCenterMgr = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tCostCenterMgr');
//        tCostCenterMgr.setValue(assetData.costCenterManager);
//
//        var tOrganisation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOrganisation');
//        tOrganisation.setValue(assetData.organizationalunit);
//
//        var tOwner = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tOwner');
//        tOwner.setValue(assetData.owner);
//
//        var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
//        cbSapAsset.setValue(assetData.sapAssetClassId);
//
//        var tAquisition = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tAquisition');
//        tAquisition.setValue(assetData.acquisitionValue);
//
//        var tBook = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tBook');
//        tBook.setValue(assetData.bookValue);
//
//        var tDate = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDate');
//        tDate.setValue(assetData.bookValueDate);
//
//        var tDepreciation = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tDepreciation');
//        tDepreciation.setValue(assetData.depreciationStartDate);
//
//        var tEconomic = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic');
//        tEconomic.setValue(assetData.usefulEconomicLife);
//
//        var tRetirement = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tRetirment');
//        tRetirement.setValue(assetData.retirementDate);
//
//        var tCostcentermanager = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('tCostcentermanager');
//        tCostcentermanager.setValue(assetData.costCenterManager);
//
//        var tOrganizationalunit = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('tOrganizationalunit');
//        tOrganizationalunit.setValue(assetData.organizationalunit);
//
//        var cbeditor = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts').getComponent('cbeditor');
//        cbeditor.setValue(assetData.editorsGroupId);
//
//        AAM.getMask(AC.MASK_TYPE_LOAD).hide();
//    },
//
//    saveAsset: function() {
//        newAssetstore = AIR.AirStoreFactory.createSaveAssetStore();
//        var manufacturerValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getValue();
//        var subCategoryValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory').getValue();
//        var typeValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType').getValue();
//        var modelValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbModel').getValue();
//        var pspValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbPsp').getValue();
//        var costcentervalue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter').getValue();
//        var sapAssetvalue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset').getValue();
//        var requesterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester').getValue();
//        var economicValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tEconomic').getValue();
//
//        newAssetstore.load({
//            params: {
//                itemId: manufacturerValue,
//                hardwareCategory2_itemId: subCategoryValue,
//                hardwareCategory3_itemId: typeValue,
//                hardwareCategory4_itemId: modelValue,
//                kontoitemId: costcentervalue,
//                pspElement: pspValue,
//                hardwareCategory1_itemId: sapAssetvalue,
//                requester: requesterValue,
//                month: economicValue,
//            }
//        });
//    }

});
Ext.reg('AIR.CiNewSoftwareAsset', AIR.CiNewSoftwareAsset);
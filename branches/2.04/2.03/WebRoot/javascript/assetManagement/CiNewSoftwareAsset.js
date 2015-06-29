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
                text: 'New Asset - Software Component',
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

        var bReset = this.getComponent('buttonPanel').getComponent('bReset');
        bReset.on('click', this.resetFormFields, this);

    },

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
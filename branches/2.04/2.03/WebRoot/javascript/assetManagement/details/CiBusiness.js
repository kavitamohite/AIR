Ext.namespace('AIR');

AIR.CiBusiness = Ext.extend(Ext.form.FieldSet, {

	initComponent : function() {
		Ext.apply(this, {
			title : 'Business Information',
			hidden:true,
			autoHeight : true,
			style : {
				margin : '5 5 0 0'
			},
			items : [ {
				xtype : 'textfield',
				itemId: 'cbOrderNumber',
				fieldLabel : 'Order Number',
				width: 370,
				style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				itemId: 'tInventorynumber',
				disabled: true,
				fieldLabel : 'Inventory Number',
				width: 370,
				style : {
					marginBottom : 10
				}
			}, {
		        xtype: 'filterCombo',//combo
		        itemId: 'cbPsp',
		        labelSeparator : ': <span style="color:red">*</span>',
		        width: 370,
		        fieldLabel: 'PSP-Element',
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('pspElementListStore'),
		        valueField: 'id',
		        minChars: 0,
		        displayField: 'name',
				lastQuery: '',
		        triggerAction: 'all',
		        mode: 'local',
		        style : {
					marginBottom : 10
				}
			},{
				xtype : 'textfield',
				itemId: 'tPsptext',
				disabled: true,
				fieldLabel : 'PSP-Text',
				width: 370,
				style : {
					marginBottom : 10
				}
			}, {
		    	xtype: 'panel',
		    	itemId: 'pCost',
				border: false,
				layout:'hbox',						
				style : {
					marginBottom : 10,
					fontSize : 12,
				},
				items: [{
					xtype: 'label',
					itemId:'lcost',
					fieldLabel : 'Cost center',
					text:'Cost center:',
					width: 105,
					style: {
						fontSize: 12
					}
	    		},{
	    			xtype: 'filterCombo',
	    			itemId: 'cbCostcenter',
			        width: 330,
			        enableKeyEvents: true,
			        store: AIR.AirStoreManager.getStoreByName('costCenterListStore'),
			        valueField: 'id',
			        displayField: 'name',
					lastQuery: '',
			        minChars: 0,
			        triggerAction: 'all',
			        mode: 'local',
					style : {
						marginBottom : 10
					}
			    },{
					xtype : 'container',
					html: '<a id="mailtocostcenter" href="mailto:ITILcenter@bayer.com&subject=' + mail_Subject_Costcenter + '&body='+ mail_blank_Text_Costcenter +'"><img src="' + img_Email + '"></a>',
					itemId: 'mailCostcenter',
					cls: 'x-plain',
					isHideable: true,
					style: {
						color: AC.AIR_FONT_COLOR,
						fontFamily: AC.AIR_FONT_TYPE,
						fontWeight: 'normal',
						fontSize: '8pt',
						cursor:'pointer',
						'padding-left':'15px'
					}	
			    }]
			},{
		    	xtype: 'panel',
				itemId: 'pRequester',
				border: false,
				layout: 'column',
				style : {
					marginBottom : 10,
					fontSize : 12
				},
				items: [{
					xtype: 'label',
					itemId: 'labeltfRequester',
					html:'Requester: <span style="color:red">*</span>',
					width: 105,
					style: {
						fontSize: 12
					}
	    		},{
					xtype: 'textfield',
			        itemId: 'tfRequester',
			        label: 'Requester',
			        width: 325,
					lazyInit : false
			    },{
					xtype: 'hidden',
			        itemId: 'tfRequesterHidden'
			    },{
			    	xtype: 'commandlink',
			    	itemId: 'clRequesterAdd',
			    	img: img_AddPerson
			    },{
			    	xtype: 'commandlink',
			    	itemId: 'clRequesterRemove',
			    	img: img_RemovePerson
			    }]
			}, {
				xtype : 'textfield',
				itemId: 'tCostCenterMgr',
				fieldLabel : 'Cost Center Manager',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tOrganisation',
				fieldLabel : 'Organizational Unit',
				disabled: true,
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tOwner',
				labelSeparator : ': <span style="color:red">*</span>',
				fieldLabel : 'Owner(legal)',
				disabled: true,
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			},  {
		        xtype: 'filterCombo',
		        itemId: 'cbSapAsset',
		        labelSeparator : ': <span style="color:red">*</span>',
		        width: 370,
		        fieldLabel: 'SAP Asset Class',
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('sapAssetListStore'),
		        valueField: 'id',
		        displayField: 'name',
				lastQuery: '',
		        triggerAction: 'all',//all query
		        mode: 'local',
		        queryParam: 'id',
		        style : {
					marginBottom : 10
				}
			}, {
				xtype : 'textfield',
				itemId: 'tAquisition',
				disabled: true,
				fieldLabel : 'Aquisition Value(Euro)',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tBook',
				disabled: true,
				fieldLabel : 'Book Value(Euro)',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tDate',
				disabled: true,
				fieldLabel : 'Date of book value',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tDepreciation',
				disabled: true,
				fieldLabel : 'Start date depreciation',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tEconomic',
				disabled: true,
				fieldLabel : 'Useful economic life (months)',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'textfield',
				itemId: 'tRetirment',
				disabled: true,
				fieldLabel : 'Retirement date',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}]
		});

		AIR.CiBusiness.superclass.initComponent.call(this);
		
		var clRequesterAdd = this.getComponent('pRequester').getComponent('clRequesterAdd');
        var clRequesterRemove = this.getComponent('pRequester').getComponent('clRequesterRemove');
        clRequesterAdd.on('click', this.onRequesterAdd, this);
        clRequesterRemove.on('click', this.onRequesterRemove, this);

        var cbPsp = this.getComponent('cbPsp');
        cbPsp.on('select', this.onPSPSelect, this);
//        cbPsp.on('keyup', this.onFieldKeyUp, this);
        
        var cbCostcenter = this.getComponent('pCost').getComponent('cbCostcenter');
        cbCostcenter.on('select', this.onCostCenterSelect, this);
//        cbCostcenter.on('keyup', this.onFieldKeyUp, this);
        
        var cbSapAsset = this.getComponent('cbSapAsset');
        cbSapAsset.on('select', this.onSapAssetSelect, this);
//        cbSapAsset.on('keyup', this.onFieldKeyUp, this);

	}, 
	
    onRequesterAdd: function(link, event) {
        AIR.AirPickerManager.openPersonPicker(null, this.getComponent('pRequester').getComponent('tfRequester'), event);
    },

    onRequesterRemove: function(link, event) {
        AIR.AirPickerManager.openRemovePicker(null, this.getComponent('pRequester').getComponent('tfRequester'), event);
    },
    
    onPSPSelect: function(combo, record, index) {
        var value = record.get('nameEn');
        var tPsptext = this.getComponent('tPsptext');
        tPsptext.setValue(value);
    },
    
    onCostCenterSelect: function(combo, record, index) {
    	var costCenterManager = this.ownerCt.ownerCt.getComponent('leftPanel').getComponent('contacts').getComponent('tCostcentermanager');
    	var costCenterManager1 = this.getComponent('tCostCenterMgr');

    	personStore = AIR.AirStoreFactory.createPersonStore();
        personStore.load({
            params: {
                query: record.get('cwid')
            },
            callback: function(records, options, success) {
                var value = this.getAt(0).data.firstname + " " + this.getAt(0).data.lastname + "/" + this.getAt(0).data.cwid;
                costCenterManager.setValue(value);
                costCenterManager1.setValue(value);
            }
        });
    },
    
    onSapAssetSelect: function(combo, record, index) {
        var value = record.get('nameEn');
        var tEconomic = this.getComponent('tEconomic');
        tEconomic.setValue(value);
    },
    
    update: function(assetData){
    	var tOrderNumber = this.getComponent('cbOrderNumber');
    	tOrderNumber.setValue(assetData.orderNumber);

        var tInventorynumber = this.getComponent('tInventorynumber');
        tInventorynumber.setValue(assetData.inventoryNumber);

        var cbPsp = this.getComponent('cbPsp');
        cbPsp.setValue(assetData.pspElementId);
        cbPsp.setRawValue(assetData.pspElement);

        var tPsptext = this.getComponent('tPsptext');
        tPsptext.setValue(assetData.pspText);

        var cbCostcenter = this.getComponent('pCost').getComponent('cbCostcenter');
        cbCostcenter.setValue(assetData.costCenterId);

        var tfRequester = this.getComponent('pRequester').getComponent('tfRequester');
        tfRequester.setValue(assetData.requester);

        var tfRequesterHidden = this.getComponent('pRequester').getComponent('tfRequesterHidden');
        tfRequesterHidden.setValue(assetData.requesterId);

        var tCostCenterMgr = this.getComponent('tCostCenterMgr');
        tCostCenterMgr.setValue(assetData.costCenterManager);

        var tOrganisation = this.getComponent('tOrganisation');
        tOrganisation.setValue(assetData.organizationalunit);

        var tOwner = this.getComponent('tOwner');
        tOwner.setValue(assetData.owner);

        var cbSapAsset = this.getComponent('cbSapAsset');
        cbSapAsset.setValue(assetData.sapAssetClassId);

        var tAquisition = this.getComponent('tAquisition');
        tAquisition.setValue(assetData.acquisitionValue);

        var tBook = this.getComponent('tBook');
        tBook.setValue(assetData.bookValue);

        var tDate = this.getComponent('tDate');
        tDate.setValue(assetData.bookValueDate);

        var tDepreciation = this.getComponent('tDepreciation');
        tDepreciation.setValue(assetData.depreciationStartDate);

        var tEconomic = this.getComponent('tEconomic');
        tEconomic.setValue(assetData.usefulEconomicLife);

        var tRetirement = this.getComponent('tRetirment');
        tRetirement.setValue(assetData.retirementDate);

    }
});
Ext.reg('AIR.CiBusiness', AIR.CiBusiness);
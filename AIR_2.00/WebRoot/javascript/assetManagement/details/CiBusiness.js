Ext.namespace('AIR');

AIR.CiBusiness = Ext.extend(Ext.form.FieldSet, {

    initComponent: function() {
        Ext.apply(this, {
            title: 'Business Information',
            hidden: true,
            height:450,
            autoScroll: true,
            style: {
                margin: '5 5 0 0'
            },
            items: [{
                xtype: 'textfield',
                itemId: 'cbOrderNumber',
                fieldLabel: 'Order Number',
                width: 370,
                style: {
                    marginBottom: 10
                }
            }, {
                xtype: 'textfield',
                itemId: 'tInventorynumber',
                fieldLabel: 'Inventory Number',
                width: 370,
                style: {
                    marginBottom: 10
                }
            },
            {
                xtype: 'panel',
                itemId: 'pPSPElement',
                border: false,
                layout: 'hbox',
                style: {
                    fontSize: 12
                },
                items: [{
                    xtype: 'label',
                    itemId: 'lPSPelement',
                    text: 'PSP-Element',
                    width: 105,
                    style: {
                        fontSize: 12
                    }
                }, {
                    xtype: 'filterCombo', //combo
                    itemId: 'cbPsp',
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
                    style: {
                        marginBottom: 10
                    }
                }, {
                    xtype: 'checkbox',
                    itemId: 'checkPspElement',
                    style: {
                	 'margin-left': '15px'
                    }
                }]
            }, {
                xtype: 'textfield',
                itemId: 'tPsptext',
                readOnly: true,
                fieldLabel: 'PSP-Text',
                width: 370,
                style: {
                    marginBottom: 10
                }
            }, {
                xtype: 'filterCombo', //combo
                itemId: 'cbCostcenter',
                width: 370,
                fieldLabel: 'Cost center *',
                enableKeyEvents: true,
                store: AIR.AirStoreManager.getStoreByName('costCenterListStore'),
                valueField: 'id',
                minChars: 0,
                displayField: 'name',
                lastQuery: '',
                triggerAction: 'all',
                mode: 'local',
                style: {
                    marginBottom: 10
                }
            }, {
                xtype: 'panel',
                itemId: 'pRequester',
                border: false,
                layout: 'column',
                style: {
                    marginBottom: 10,
                    fontSize: 12
                },
                items: [{
                    xtype: 'label',
                    itemId: 'labeltfRequester',
                    text: 'Requester *',
                    width: 105,
                    style: {
                        fontSize: 12
                    }
                }, {
                    xtype: 'textfield',
                    itemId: 'tfRequester',
                    label: 'Requester',
                    width: 325,
                    readOnly: true
                }, {
                    xtype: 'hidden',
                    itemId: 'tfRequesterHidden'
                }, {
                    xtype: 'commandlink',
                    itemId: 'clRequesterAdd',
                    img: img_AddPerson
                }, {
                    xtype: 'commandlink',
                    itemId: 'clRequesterRemove',
                    img: img_RemovePerson
                }]
            }, {
                xtype: 'textfield',
                itemId: 'tCostCenterMgr',
                readOnly: true,
                fieldLabel: 'Cost Center Manager',
                width: 370,
                style: {
                    marginBottom: 10,
                    fontSize: 12
                }
            }, {
                xtype: 'hidden',
                itemId: 'costCenterManagerHidden'
            }, {
                xtype: 'textfield',
                itemId: 'tOrganisation',
                fieldLabel: 'Organizational Unit',
                readOnly: true,
                width: 370,
                style: {
                    marginBottom: 10,
                    fontSize: 12
                }
            }, {
                xtype: 'filterCombo',
                itemId: 'tOwner',
                width: 370,
                enableKeyEvents: true,
                store: AIR.AirStoreManager.getStoreByName('legalentityListStore'),
                valueField: 'id',
                displayField: 'name',
                lastQuery: '',
                triggerAction: 'all',
                mode: 'local',
                queryParam: 'id',
                style: {
                    marginBottom: 10,
                    fontSize: 12
                }
            }, {
                xtype: 'filterCombo',
                itemId: 'cbSapAsset',
                width: 370,
                fieldLabel: 'SAP Asset Class *',
                enableKeyEvents: true,
                store: AIR.AirStoreManager.getStoreByName('sapAssetListStore'),
                valueField: 'id',
                displayField: 'name',
                lastQuery: '',
                triggerAction: 'all',
                mode: 'local',
                queryParam: 'id',
                style: {
                    marginBottom: 10
                }
            },
            {
                xtype: 'textfield',
                itemId: 'tInsertUser',
                readOnly: true,
                fieldLabel: 'Insert User',
                width: 370,
                style: {
                    marginBottom: 10,
                    fontSize: 12
                }
            },
            {
                xtype: 'textfield',
                itemId: 'tInsertSource',
                readOnly: true,
                fieldLabel: 'Insert Source',
                width: 370,
                style: {
                    marginBottom: 5,
                    fontSize: 12
                }
            } ,
            {
                xtype: 'textfield',
                itemId: 'tILOAdKey',
                fieldLabel: 'ILO Advanced Key',
                width: 370,
                style: {
                    marginBottom: 5,
                    fontSize: 12
                }
            },
            {
                xtype: 'textfield',
                itemId: 'tOrdNum',
                fieldLabel: 'One View Order Number',
                width: 370,
                style: {
                    marginBottom: 5,
                    fontSize: 12
                }
            },
            {
                xtype: 'textfield',
                itemId: 'tTypeContract',
                fieldLabel: 'Type Of Contract',
                width: 370,
                style: {
                    marginBottom: 5,
                    fontSize: 12
                }
            },
            
            
            {
                xtype: 'datefield',
                itemId: 'cEndContrctDate',
                fieldLabel: 'End Of Contract',
                format: 'm/d/Y',
                width: 370,
                style: {
                    marginBottom: 5,
                    fontSize: 12
                }
            }
            ]
        });

        AIR.CiBusiness.superclass.initComponent.call(this);

        var clRequesterAdd = this.getComponent('pRequester').getComponent('clRequesterAdd');
        var clRequesterRemove = this.getComponent('pRequester').getComponent('clRequesterRemove');
        clRequesterAdd.on('click', this.onRequesterAdd, this);
        clRequesterRemove.on('click', this.onRequesterRemove, this);

        var cbPsp = this.getComponent('pPSPElement').getComponent('cbPsp');
        cbPsp.on('select', this.onPSPSelect, this);
        cbPsp.on('change', this.onComboChange, this);
        
        var checkPspElement = this.getComponent('pPSPElement').getComponent('checkPspElement');
        checkPspElement.on('check', this.onCheckPsp, this);

        var cbCostcenter = this.getComponent('cbCostcenter');
        cbCostcenter.on('select', this.onCostCenterSelect, this);
        cbCostcenter.on('change', this.onComboChange, this);

        var cbSapAsset = this.getComponent('cbSapAsset');
        cbSapAsset.on('select', this.onSapAssetSelect, this);
        cbSapAsset.on('change', this.onComboChange, this);

        var tOwner = this.getComponent('tOwner');
        tOwner.on('change', this.onComboChange, this);
        
		Ext.QuickTips.register({
		    target: this.getComponent('pPSPElement').getComponent('checkPspElement'),
		    title: 'Incl Technically Completed',
		    text: '',
		    width: 180,
		    showDelay: 1,      // Show 50ms after entering target
		    trackMouse: true,
		    dismissDelay: 99000 // Hide after 99 seconds hover
		});//avanti
    },

    onComboChange: function(combo, newValue, oldValue) {
        if (Util.isComboValueValid(combo, newValue, oldValue)) {

            if (typeof newValue === 'string' && newValue.length === 0) {
                combo.reset();
                combo.setValue("");
                this.ownerCt.ownerCt.ownerCt.enableAssetButtons();
            }
        }
    },

    onRequesterAdd: function(link, event) {
        AIR.AirPickerManager.openPersonPicker(this.onRequesterChange.createDelegate(this), this.getComponent('pRequester').getComponent('tfRequester'), event);
    },

    onRequesterRemove: function(link, event) {
        AIR.AirPickerManager.openRemovePicker(this.onRequesterChange.createDelegate(this), this.getComponent('pRequester').getComponent('tfRequester'), event);
    },

    onPSPSelect: function(combo, record, index) {
        var value = record.get('nameEn');
        var tPsptext = this.getComponent('tPsptext');
        tPsptext.setValue(value);
    },
    
    onCheckPsp: function(checkbox,isChecked,record){
    	var checkPspElement = this.getComponent('pPSPElement').getComponent('checkPspElement');
    	var cbPsp = this.getComponent('pPSPElement').getComponent('cbPsp');
    	var cpPspStore = cbPsp.getStore();
    	cpPspStore.on('beforeload',this.cpPspStoreOnBeforeLoad,this);
    	cpPspStore.on('load',this.cpPspStoreOnLoad,this);
    	cbPsp.reset();
    	
    	var value={
      		name:'true'
      	};
    	if(!isChecked) {
	    	value.name = 'false';
    	}
    	cpPspStore.load({
			params: value
		});
    },
    cpPspStoreOnBeforeLoad: function(store, options){
		var loadMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_LOAD);
		loadMask.show();
	},
	cpPspStoreOnLoad: function(store,options){
		var loadMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_LOAD);
		loadMask.hide();
	},
    

    onRequesterChange: function() {
        this.ownerCt.ownerCt.ownerCt.enableAssetButtons();
    },

    onCostCenterSelect: function(combo, record, index) {
        var costCenterManager = this.ownerCt.ownerCt.getComponent('leftPanel').getComponent('contacts').getComponent('tCostcentermanager');
        var costCenterManager1 = this.getComponent('tCostCenterMgr');
        var costCenterManagerHidden = this.getComponent('costCenterManagerHidden');
        var tOwner = this.getComponent('tOwner');
        var tOrganisation = this.ownerCt.ownerCt.getComponent('leftPanel').getComponent('contacts').getComponent('tOrganizationalunit');
        var tOrganisation1 = this.getComponent('tOrganisation');

        personStore = AIR.AirStoreFactory.createPersonStore();
        personStore.load({
            params: {
                query: record.get('cwid')
            },
            callback: function(records, options, success) {
                if (this.getAt(0)) {
                    var cwid = this.getAt(0).data.cwid;
                    var value = this.getAt(0).data.lastname + ", " + this.getAt(0).data.firstname + " (" + cwid + ")";
                    var orgUnit = this.getAt(0).data.orgUnit;

                    costCenterManager.setValue(value);
                    costCenterManager1.setValue(value);
                    costCenterManagerHidden.setValue(cwid);
                    //tOwner.setValue(value);
                    tOrganisation.setValue(orgUnit);
                    tOrganisation1.setValue(orgUnit);
                }
            }
        });

        if (this.getComponent('cbCostcenter').getRawValue() == 'out-of-scope') {
            tOwner.setValue('');
            tOrganisation1.setValue('');
            costCenterManager1.setValue('');
            costCenterManager.setValue('');
            costCenterManagerHidden.setValue('');
            tOrganisation.setValue('');
        }
    },

    onSapAssetSelect: function(combo, record, index) {
        var value = record.get('nameEn');
    },

    update: function(assetData) {
        var tOrderNumber = this.getComponent('cbOrderNumber');
        tOrderNumber.setValue(assetData.orderNumber);

        var tInventorynumber = this.getComponent('tInventorynumber');
        tInventorynumber.setValue(assetData.inventoryNumber);

        var cbPsp = this.getComponent('pPSPElement').getComponent('cbPsp');
        cbPsp.setValue(assetData.pspElementId);
        cbPsp.setRawValue(assetData.pspElement);

        var tPsptext = this.getComponent('tPsptext');
        tPsptext.setValue(assetData.pspText);

        var cbCostcenter = this.getComponent('cbCostcenter');
        cbCostcenter.setValue(assetData.costCenterId);

        var costCenterManagerHidden = this.getComponent('costCenterManagerHidden');
        costCenterManagerHidden.setValue(assetData.costCenterManagerId);

        var tfRequester = this.getComponent('pRequester').getComponent('tfRequester');
        tfRequester.setValue(assetData.requester);

        var tfRequesterHidden = this.getComponent('pRequester').getComponent('tfRequesterHidden');
        tfRequesterHidden.setValue(assetData.requesterId);

        var tCostCenterMgr = this.getComponent('tCostCenterMgr');
        tCostCenterMgr.setValue(assetData.costCenterManager);

        var tOrganisation = this.getComponent('tOrganisation');
        tOrganisation.setValue(assetData.organizationalunit);

        var tOwner = this.getComponent('tOwner');
        tOwner.setValue(assetData.ownerId);
        tOwner.setRawValue(assetData.owner);

        var cbSapAsset = this.getComponent('cbSapAsset');
        cbSapAsset.setValue(assetData.sapAssetClassId);
        
        var tInsertUser = this.getComponent('tInsertUser');
        tInsertUser.setValue(assetData.insertUser);
        
        var tInsertSource = this.getComponent('tInsertSource');
        tInsertSource.setValue(assetData.insertSource);
    },

    updateParam: function(assetData) {
        var tOrderNumber = this.getComponent('cbOrderNumber');
        assetData.orderNumber = tOrderNumber.getValue();

        var tInventorynumber = this.getComponent('tInventorynumber');
        assetData.inventoryNumber = tInventorynumber.getValue();

        var cbPsp = this.getComponent('pPSPElement').getComponent('cbPsp');
        assetData.pspElementId = cbPsp.getValue();
        assetData.pspElement = cbPsp.getRawValue();

        var tPsptext = this.getComponent('tPsptext');
        assetData.pspText = tPsptext.getValue();

        var cbCostcenter = this.getComponent('cbCostcenter');
        assetData.costCenter = cbCostcenter.getRawValue();
        assetData.costCenterId = cbCostcenter.getValue();

        var tfRequester = this.getComponent('pRequester').getComponent('tfRequester');
        assetData.requester = tfRequester.getValue();

        var tfRequesterHidden = this.getComponent('pRequester').getComponent('tfRequesterHidden');
        assetData.requesterId = tfRequesterHidden.getValue();

        var tCostCenterMgr = this.getComponent('tCostCenterMgr');
        assetData.costCenterManager = tCostCenterMgr.getValue();

        var costCenterManagerHidden = this.getComponent('costCenterManagerHidden');
        assetData.costCenterManagerId = costCenterManagerHidden.getValue();

        var tOrganisation = this.getComponent('tOrganisation');
        assetData.organizationalunit = tOrganisation.getValue();

        var tOwner = this.getComponent('tOwner');
        assetData.ownerId = tOwner.getValue();
        assetData.owner = tOwner.getRawValue();

        var cbSapAsset = this.getComponent('cbSapAsset');
        assetData.sapAssetClassId = cbSapAsset.getValue();
        
        //emria   change#C0000202453
        
    	
        var tILOAdKey = this.getComponent('tILOAdKey');
        assetData.iloAdvancedKey = tILOAdKey.getValue();
        
        var tOrdNum = this.getComponent('tOrdNum');
        assetData.oneViewOrderNumber = tOrdNum.getValue();
        
        var tTypeContract = this.getComponent('tTypeContract');
        assetData.typeOfContract = tTypeContract.getValue();
        
        /*var tServiceAgrmntId = this.getComponent('tServiceAgrmntId');
        assetData.serviceAgreementId = tServiceAgrmntId.getValue();*/
        
    /*    var tServiceContGrp = this.getComponent('tServiceContGrp');
        assetData.serviceContractGroup = tServiceContGrp.getValue();*/
        
        var cEndContrctDate = this.getComponent('cEndContrctDate');
        assetData.endOfContract = cEndContrctDate.getValue();
        
        //emria end  change#C0000202453

        return assetData;
    },

    updateLabels: function(labels) {
        Util.updateFieldLabel(this.getComponent('cbOrderNumber'), labels.assetOrdernumber);
        Util.updateFieldLabel(this.getComponent('tInventorynumber'), labels.assetInventory);
        Util.updateLabel(this.getComponent('pPSPElement').getComponent('lPSPelement'), labels.assetPSP);
        Util.updateFieldLabel(this.getComponent('tPsptext'), labels.assetPsptext);
        Util.updateFieldLabel(this.getComponent('tCostCenterMgr'), labels.assetCostManager);
        Util.updateFieldLabel(this.getComponent('tOrganisation'), labels.assetOrganisation);
        Util.updateFieldLabel(this.getComponent('tOwner'), labels.assetOwner);
        Util.updateFieldLabel(this.getComponent('cbSapAsset'), labels.assetSapClass);
        Util.updateFieldLabel(this.getComponent('cbCostcenter'), labels.assetCost);
        Util.updateLabel(this.getComponent('pRequester').getComponent('labeltfRequester'), labels.assetRequester);
        Util.updateFieldLabel(this.getComponent('tInsertUser'), labels.assetInsertUser);
        Util.updateFieldLabel(this.getComponent('tInsertSource'),labels.assetInsertSource);
        
        //emria
        Util.updateFieldLabel(this.getComponent('tILOAdKey'),labels.assetILOAdKey);
        Util.updateFieldLabel(this.getComponent('tOrdNum'),labels.assetOrdNum);
        Util.updateFieldLabel(this.getComponent('tTypeContract'),labels.assetTypeContract);
      //  Util.updateFieldLabel(this.getComponent('tServiceAgrmntId'),labels.assetServiceAgrmntId);
     //   Util.updateFieldLabel(this.getComponent('tServiceContGrp'),labels.assetServiceContGrp);
        Util.updateFieldLabel(this.getComponent('cEndContrctDate'),labels.assecEndContrctDate);
          
        //end emria
    }

});
Ext.reg('AIR.CiBusiness', AIR.CiBusiness);
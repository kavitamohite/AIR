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
				fieldLabel : 'Inventory Number',
				width: 370,
				style : {
					marginBottom : 10
				}
			}, {
		        xtype: 'filterCombo',//combo
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
		        style : {
					marginBottom : 10
				}
			},{
				xtype : 'textfield',
				itemId: 'tPsptext',
				readOnly: true,
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
					text:'Cost center *',
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
					text:'Requester *',
					width: 105,
					style: {
						fontSize: 12
					}
	    		},{
					xtype: 'textfield',
			        itemId: 'tfRequester',
			        label: 'Requester',
			        width: 325,
			        readOnly: true
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
				readOnly: true,
				fieldLabel : 'Cost Center Manager',
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype: 'hidden',
				itemId: 'costCenterManagerHidden'
			}, {
				xtype : 'textfield',
				itemId: 'tOrganisation',
				fieldLabel : 'Organizational Unit',
				readOnly: true,
				width: 370,
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			}, {
				xtype : 'filterCombo',
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
				style : {
					marginBottom : 10,
					fontSize : 12
				}
			},  {
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
		        style : {
					marginBottom : 10
				}
			},]
		});

		AIR.CiBusiness.superclass.initComponent.call(this);
		
		var clRequesterAdd = this.getComponent('pRequester').getComponent('clRequesterAdd');
        var clRequesterRemove = this.getComponent('pRequester').getComponent('clRequesterRemove');
        clRequesterAdd.on('click', this.onRequesterAdd, this);
        clRequesterRemove.on('click', this.onRequesterRemove, this);

        var cbPsp = this.getComponent('cbPsp');
        cbPsp.on('select', this.onPSPSelect, this);
        
        var cbCostcenter = this.getComponent('pCost').getComponent('cbCostcenter');
        cbCostcenter.on('select', this.onCostCenterSelect, this);
        
        var cbSapAsset = this.getComponent('cbSapAsset');
        cbSapAsset.on('select', this.onSapAssetSelect, this);

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
    
    onRequesterChange: function(a, b, c){
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
            	if(this.getAt(0)){
                	var cwid = this.getAt(0).data.cwid;
                    var value = this.getAt(0).data.lastname + ", "+ this.getAt(0).data.firstname + " (" + cwid + ")";
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
        
        if(this.getComponent('pCost').getComponent('cbCostcenter').getRawValue()=='out-of-scope')
         {
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

        this.updateMailTemplate();
    },
    
    updateMailTemplate: function() {
        var html = '<a id="mailtocostcenter" href="{href}"><img src="' + img_Email + '"></a>';
        var mailText = mail_blank_Text_Costcenter.replace('<Username>', AAM.getUserName());
        var mailtemplate = 'mailto:ITILcenter@bayer.com';
        mailtemplate += '&subject=' + mail_Subject_Costcenter + '';
        mailtemplate += ('&body=' + mailText);
        html = html.replace('{href}', mailtemplate);
        this.getComponent('pCost').getComponent('mailCostcenter').update(html);
    },
    
    updateParam: function(assetData){
    	var tOrderNumber = this.getComponent('cbOrderNumber');
    	assetData.orderNumber = tOrderNumber.getValue();

        var tInventorynumber = this.getComponent('tInventorynumber');
        assetData.inventoryNumber = tInventorynumber.getValue();

        var cbPsp = this.getComponent('cbPsp');
        assetData.pspElementId = cbPsp.getValue();
        assetData.pspElement = cbPsp.getRawValue();

        var tPsptext = this.getComponent('tPsptext');
        assetData.pspText = tPsptext.getValue();

        var cbCostcenter = this.getComponent('pCost').getComponent('cbCostcenter');
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

        return assetData;
    },
    
    updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('cbOrderNumber'), labels.assetOrdernumber); 
    	Util.updateFieldLabel(this.getComponent('tInventorynumber'), labels.assetInventory);  
    	Util.updateFieldLabel(this.getComponent('cbPsp'), labels.assetPSP);  
    	Util.updateFieldLabel(this.getComponent('tPsptext'), labels.assetPsptext);  
    	Util.updateFieldLabel(this.getComponent('tCostCenterMgr'), labels.assetCostManager);  
    	Util.updateFieldLabel(this.getComponent('tOrganisation'), labels.assetOrganisation);  
    	Util.updateFieldLabel(this.getComponent('tOwner'), labels.assetOwner);  
    	Util.updateFieldLabel(this.getComponent('cbSapAsset'), labels.assetSapClass);  
    	Util.updateLabel(this.getComponent('pCost').getComponent('lcost'), labels.assetCost);  
    	Util.updateLabel(this.getComponent('pRequester').getComponent('labeltfRequester'), labels.assetRequester); 
	}

});
Ext.reg('AIR.CiBusiness', AIR.CiBusiness);
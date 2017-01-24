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
                itemId: 'topPanel'
            }, {
                xtype: 'panel',
                itemId: 'bottomPanel',
                border: false,
                height: 480,
                autoScroll: false,
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
                        xtype: 'AIR.CiSoftwareProduct',
                        itemId: 'product'
                    }, {
                        xtype: 'AIR.CiContact',
                        itemId: 'contacts'
                    },{
                    	xtype: 'panel',
                    	height: 250,
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
                    hidden: true,
                    style: {
                        fontSize: 12,
                        margin: '8 10 0 0',
                        width: 80
                    },
                    handler: function(button, event) {
                        this.saveAsset(); 
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
                },  {
                    xtype: 'button',
                    itemId: 'bReset',
                    text: 'Reset all Entries',
                    style: {
                        fontSize: 14,
                        margin: '8 10 0 0',
                        width: 80
                    }
                },  {
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

        AIR.CiNewSoftwareAsset.superclass.initComponent.call(this);
        this.addEvents('externalNavigation');

	    var bReset = this.getComponent('buttonPanel').getComponent('bReset');
	    bReset.on('click', this.resetFormFields, this);

	    var cancelBtn = this.getComponent('buttonPanel').getComponent('cancelBtn');
        cancelBtn.on('click', this.goToAssetManagement, this);
        
	    var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
	    cbManufacturer.on('select', this.enableAssetButtons, this);
	    cbManufacturer.on('keypress', this.enableAssetButtons, this);
	    
	    var cbProductName = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pProductName').getComponent('cbProductName');
	    cbProductName.on('select', this.enableAssetButtons, this);
	    cbProductName.on('keypress', this.enableAssetButtons, this);
	    
        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter');
        cbCostcenter.on('select', this.enableAssetButtons, this);
        cbCostcenter.on('keypress', this.enableAssetButtons, this); 
        
        var tfRequester = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester');
        tfRequester.on('change', this.enableAssetButtons, this);
        
    },
    
    onAssetHistoryButton: function(){
    	var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();

    	AAM.getMask(AC.MASK_TYPE_LOAD).show();
		var historyListStore = AIR.AirStoreFactory.createHistoryListStore();

		var params = {
			cwid: AAM.getCwid(),
			token: AAM.getToken(),
			id:  assetId,
			tableId: 20
		};
		
		historyListStore.addListener('load', function() {
			AAM.getMask(AC.MASK_TYPE_LOAD).hide();
			assetHistoryWindow = new Ext.Window({
	            title: 'History',
	            layout: 'fit',
	            width: 1230,
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
    		
    		this.update(assetData);
    	} else {
        	var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();
        	
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
    
    update: function(assetData) {
    	var topPanel = this.getComponent('topPanel');
    	topPanel.update(assetData);

    	var product = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
    	product.update(assetData);
    	
    	var business = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
    	business.update(assetData);
    	
    	var contact = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
    	contact.update(assetData);

    	this.enableAssetButtons();
        AAM.getMask(AC.MASK_TYPE_LOAD).hide();
        
    },
    
	enableAssetButtons: function() {	
		var saveBtn = this.getComponent('buttonPanel').getComponent('saveBtn');
		var bHistory = this.getComponent('buttonPanel').getComponent('bHistory');
		
		var cbManufacturerValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer').getValue();
		var cbProductNameValue = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pProductName').getComponent('cbProductName').getValue();
		
		var cbCostcenterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbCostcenter').getValue();
		var tfRequesterValue = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester').getRawValue();
		
		var cbOrderNumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbOrderNumber');
		var tInventorynumber = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('tInventorynumber');
		var cbPsp = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pPSPElement').getComponent('cbPsp');

		if (cbManufacturerValue > 0 && cbProductNameValue > 0 && cbCostcenterValue > 0 && tfRequesterValue.length > 0) {
			var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
			
			rolePersonListStore.each(function(item) {
				var value = item.data.roleName;
				//if(value === 'AIR Asset Manager'){
				if(value ===AC.USER_ROLE_AIR_ASSET_MANAGER){
					saveBtn.show();
				
					cbOrderNumber.setReadOnly(false);
					tInventorynumber.setReadOnly(false);
					cbPsp.enable();
				//} else if(value === 'AIR Asset Editor'){
				} else if(value ===AC.USER_ROLE_AIR_ASSET_EDITOR ){
					saveBtn.show();
					
					cbOrderNumber.setReadOnly(true);
					tInventorynumber.setReadOnly(true);;
					cbPsp.disable();
				}
			});
		} else {
			saveBtn.hide();
			
		}
		
		var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();
    	
    	if(assetId){
    		bHistory.show();
    	} else {
    		bHistory.hide();
    	}
	},

    updateLabels: function(labels) {

    	var topPanel = this.getComponent('topPanel');
    	topPanel.updateLabels(labels);

    	var product = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
    	product.updateLabels(labels);
    	
    	var business = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
    	business.updateLabels(labels);
    	
    	var contact = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
    	contact.updateLabels(labels);
    	
    },

	saveAsset: function() {
        newAssetstore = AIR.AirStoreFactory.createSaveAssetStore();
        
    	var assetData = this.getUpdateParam();
    	
    	newAssetstore.on('load', this.onSaved, this);
        newAssetstore.load({
            params: assetData
        });
        
    },
    
 
    getUpdateParam: function(){
    	var assetData = {};
        
        assetData.cwid = AIR.AirApplicationManager.getCwid();
        assetData.isSoftwareComponent = true;
        
        var topPanel = this.getComponent('topPanel');
        assetData = topPanel.updateParam(assetData);
    	
    	var product = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
    	product.updateParam(assetData);
    	
    	var business = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
    	business.updateParam(assetData);
    	
    	var contact = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
    	contact.updateParam(assetData);
    	
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
        	var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED_ERROR', callbackMap);
			afterSaveAppWindow.show();
        }
    },
    
    sendEmail: function(){
    	var assetData = this.getUpdateParam();
    	
    	if(assetData.id &&  assetData.inventoryNumber !=undefined && assetData.inventoryNumber !=''){
        	var mailText = mail_blank_text_software_asset.replace('<username>', AAM.getUserName());
        	mailText = mailText.replace('<manufacturer>',assetData.manufacturer);
        	mailText = mailText.replace('<productName>',assetData.subcategory);
        	mailText = mailText.replace('<sapDescription>',assetData.sapDescription);

        	mailText = mailText.replace('<orderNumber>',assetData.orderNumber);
        	mailText = mailText.replace('<costCenter>',assetData.costCenter);
        	mailText = mailText.replace('<legalEntity>',assetData.owner);

        	mailText = mailText.replace('<costCenterManager>',assetData.costCenterManager);
        		
        	var email = 'mailto:iao-bestellwesen@bayer.com&subject='+mail_subject_hardware_asset+'&body='+mailText;
        	window.location.href = email;
    	}
    }


});
Ext.reg('AIR.CiNewSoftwareAsset', AIR.CiNewSoftwareAsset);
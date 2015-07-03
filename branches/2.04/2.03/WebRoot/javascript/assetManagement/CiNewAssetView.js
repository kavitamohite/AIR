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
					itemId : 'cancelBtn',
					text : 'Cancel',
					hidden: true,
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
				},{
					xtype : 'button',
					itemId : 'bHistory',
					text : 'Asset History',
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

        var bReset = this.getComponent('buttonPanel').getComponent('bReset');
        bReset.on('click', this.resetFormFields, this);
        
    	var cbManufacturer = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbManufacturer');
    	cbManufacturer.on('select', this.onFieldKeyUp, this);
        
        var cbSubCategory = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbSubCategory');
        cbSubCategory.on('select', this.onFieldKeyUp, this);
        
        var cbType = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('cbType');
        cbType.on('select', this.onFieldKeyUp, this);

        var cbModel = this.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product').getComponent('pmodel').getComponent('cbModel');
        cbModel.on('select', this.onFieldKeyUp, this);
        
        var cbCostcenter = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pCost').getComponent('cbCostcenter');
        cbCostcenter.on('select', this.onFieldKeyUp, this);
           
        var cbSapAsset = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('cbSapAsset');
        cbSapAsset.on('select', this.onFieldKeyUp, this);
         
        var tfRequester = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation').getComponent('pRequester').getComponent('tfRequester');
        tfRequester.on('select', this.onFieldKeyUp, this);
        
        var cbRoom = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbRoom');
        cbRoom.on('select', this.onFieldKeyUp, this);
        
        var cbBuilding =this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbBuilding');
        cbBuilding.on('select', this.onFieldKeyUp, this);
        
        var cbSite = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbSite');
        cbSite.on('select', this.onFieldKeyUp, this);
        
        var cbCountry = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('cbCountry');
        cbCountry.on('select', this.onFieldKeyUp, this);
        
        var cbRack = this.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location').getComponent('pRackposition').getComponent('cbRack');
        cbRack.on('select', this.onFieldKeyUp, this);
    },
    
    onAssetHistoryButton: function(){
    	var assetId = this.getComponent('topPanel').getComponent('assetId').getValue();
    	console.log(assetId);

    	AAM.getMask(AC.MASK_TYPE_LOAD).show();
		var historyListStore = AIR.AirStoreFactory.createHistoryListStore();

		var params = {
			cwid: AAM.getCwid(),
			token: AAM.getToken(),
			id:  AAM.getAssetId(),
			tableId: 19
		};
		
		console.log(params);
		
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

    resetFormFields: function(assetData) {
    	
    	var saveBtn = this.getComponent('buttonPanel').getComponent('saveBtn');
		var cancelBtn = this.getComponent('buttonPanel').getComponent('cancelBtn');
    	
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
    	
    	saveBtn.hide();
		cancelBtn.hide();
        
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
				&& cbCostcenterValue.length>0 && cbSapAssetValue.length>0 &&tfRequesterValue.length>0 ){
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
        var assetData = {};
        
        assetData.cwid = AIR.AirApplicationManager.getCwid();
        
        var topPanel = this.getComponent('topPanel');
        assetData = topPanel.updateParam(assetData);
    	
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
        
    	console.log(assetData);
        
        newAssetstore.load({
            params: assetData
        });
    }

});
Ext.reg('AIR.CiNewAssetView', AIR.CiNewAssetView);
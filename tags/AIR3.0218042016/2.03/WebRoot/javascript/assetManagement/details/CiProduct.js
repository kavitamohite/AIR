Ext.namespace('AIR');

AIR.CiProduct = Ext.extend(Ext.form.FieldSet, {

	initComponent : function() {
		Ext.apply(this, {
			title : 'Product',
			hidden:true,
			autoHeight : true,
			style : {
				margin : '5 5 0 0'
			},
			items : [{
				itemId: 'cbManufacturer',
		        xtype: 'filterCombo',
		        fieldLabel: 'Manufacturer',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('manufactureListStore'),
		        valueField: 'manufacturerId',
		        displayField: 'manufacturer',
				lastQuery: '',
		        minChars: 0,
		        triggerAction: 'all',
		        mode: 'local',
				style : {
					marginBottom : 10
				}
			},{
				itemId: 'cbSubCategory',
		        xtype: 'filterCombo',
		        fieldLabel: 'Sub Category',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('subCategoryListStore'),
		        valueField: 'subcategoryId',
		        displayField: 'subcategory',
				lastQuery: '',
		        minChars: 0,
		        triggerAction: 'all',
		        mode: 'local',
				style : {
					marginBottom : 10
				}
			},{
				itemId: 'cbType',
		        xtype: 'filterCombo',
		        fieldLabel: 'Type',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('typeListStore'),
		        valueField: 'typeId',
		        displayField: 'type',
				lastQuery: '',
				mode: 'local',
		        minChars: 0,
		        triggerAction: 'all',
				style : {
					marginBottom : 10
				}
			},{
		    	xtype: 'panel',
				itemId: 'pmodel',
				border: false,
				layout:'hbox',						
				items: [{
					itemId: 'cbFieldModel',
					xtype: 'label',
					text: 'Model *',
					fieldLabel : 'Model',
					width: 105,
					style: {
						fontSize: 12
					}
	    		},{
	    			itemId: 'cbModel',
			        xtype: 'filterCombo',
			        fieldLabel: 'Model',
			        width: 330,
			        enableKeyEvents: true,
			        store: AIR.AirStoreManager.getStoreByName('modelListStore'),
			        valueField: 'modelId',
			        displayField: 'model',
					lastQuery: '',
			        minChars: 0,
			        triggerAction: 'all',
			        mode: 'local',
					style : {
						marginBottom : 10
					}
			    },{
					xtype : 'container',
					html: '<a id="mailtoproduct" href="mailto:ITILcenter@bayer.com&subject=' + mail_Subject_product +'"><img src="' + img_Email + '"></a>',
					itemId: 'mailproduct',
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
			},
			{
				xtype: 'panel',
                itemId: 'pMultipleAsset',
                border: false,
                layout: 'hbox',
                style: {
                    fontSize: 12,
                    'padding-bottom':'5px'
                },
                items: [{
    				xtype : 'label',
    				itemId : 'multipleAsset',
    				text : 'Multiple Assets',
    				style : {
    					fontSize : 12,
    					'margin-left': '15px',
    					'font-weight': 'bold'
    				}    			
    			}, 
                { 	
    				xtype: 'checkbox',
                    itemId: 'checkmultipleasset',  
                    style: {
                   	 'margin-left': '40px'
                       }
    			  },
                  {
                	  xtype: 'textfield',
                      itemId: 'tmultipleasset',
                      emptyText: 'Number of Assets',
                      disabled: true,
                      style: {
                        	 'margin-left': '25px'
                            }
                   }
    			  
                  ]   
                
			}
			,{
				xtype: 'textfield',
				itemId: 'tsapDescription',
				fieldLabel: 'SAP Description of the asset',
			    width: 370,
			    style: {
			    	marginBottom: 10,
			    	fontSize: 12
			    }
			}]
		});

		AIR.CiProduct.superclass.initComponent.call(this);
		
		var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.on('select', this.onManufacturerSelect, this);
        cbManufacturer.on('change', this.onComboChange, this);
        
        var cbSubCategory = this.getComponent('cbSubCategory');
        cbSubCategory.on('select', this.onSubCategorySelect, this);
        cbSubCategory.on('change', this.onComboChange, this);
        
        var cbType = this.getComponent('cbType');
        cbType.on('select', this.onTypeSelect, this);
        cbType.on('change', this.onComboChange, this);
        
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        cbModel.on('select', this.onModelSelect, this);
        cbModel.on('change', this.onComboChange, this);

	},
	
	onManufacturerSelect: function(combo, record, index) {
        var partnerIdValue = this.getComponent('cbManufacturer').getValue();
        var kategoryIdValue = this.getComponent('cbSubCategory').getValue();
        
        var cbType = this.getComponent('cbType');
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        var tsapDescription = this.getComponent('tsapDescription');
        
        cbModel.reset();
        cbType.reset();
        tsapDescription.setValue("");
        
        cbType.getStore().removeAll();
        
        this.loadTypeStore(partnerIdValue, kategoryIdValue);
        this.updateMailTemplateProduct();
    },
    
    onSubCategorySelect: function(combo, record, index) {
        var partnerIdValue = this.getComponent('cbManufacturer').getValue();
        var kategoryIdValue = this.getComponent('cbSubCategory').getValue();
        
        var cbType = this.getComponent('cbType');
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        var tsapDescription = this.getComponent('tsapDescription');
        
        cbModel.reset();
        cbType.reset();
        tsapDescription.setValue("");
        
        cbType.getStore().removeAll();
        
        this.loadTypeStore(partnerIdValue, kategoryIdValue);
        this.updateMailTemplateProduct();
    },
    
    loadTypeStore: function(partnerIdValue, kategoryIdValue){
        var cbType = this.getComponent('cbType');
        cbType.getStore().load({
            params: {
                partnerId: partnerIdValue,
                kategory2Id: kategoryIdValue
            }
        });
    },
    
    onTypeSelect: function(combo, record, index) {
    	var value = record.get('typeId');
    	
    	this.setManufacturer(record);
    	this.setSubCategory(record);
    	this.setType(record);
    	
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        var tsapDescription = this.getComponent('tsapDescription');
        
        cbModel.reset();
        cbModel.getStore().removeAll();
        tsapDescription.setValue("");
        
        this.loadModelStore(value);
        this.updateMailTemplateProduct();
    },
    
    loadModelStore: function(value){
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        
        cbModel.getStore().load({
            params: {
                id: value
            }
        });
    },
    
    onModelSelect: function(combo, record, index) {
    	this.setManufacturer(record);
    	this.setSubCategory(record);
    	this.setType(record);
    	this.setModel(record);
    	this.setSapDescription(record);
        this.updateMailTemplateProduct();
    },
    
    onComboChange: function(combo, newValue, oldValue) {
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		combo.reset();
	    		combo.setValue("");
	    		this.ownerCt.ownerCt.ownerCt.enableAssetButtons();
	    	} 
		}
	},
	
    setManufacturer: function(record){
    	var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.setValue(record.get('manufacturerId'));
        cbManufacturer.setRawValue(record.get('manufacturer'));
    },
    
    setSubCategory: function(record){
        var cbSubCategory = this.getComponent('cbSubCategory');
        cbSubCategory.setValue(record.get('subcategoryId'));
        cbSubCategory.setRawValue(record.get('subcategory'));
    },
    
    setType: function(record){
    	var cbType = this.getComponent('cbType');
        cbType.setValue(record.get('typeId'));
        cbType.setRawValue(record.get('type'));
    },
    
    setModel: function(record){
    	var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        cbModel.setValue(record.get('modelId'));
        cbModel.setRawValue(record.get('model'));    	
    },
    
    setSapDescription: function(record){
        var tsapDescription = this.getComponent('tsapDescription');
        var description = record.get('manufacturer') + " " + record.get('type') + " " + record.get('model');
        tsapDescription.setValue(description);
    },
    
    updateMailTemplateProduct: function() {
        var html = '<a id="mailtoproduct" href="{href}"><img src="' + img_Email + '"></a>';

        var cbManufacturer = this.getComponent('cbManufacturer');
        var cbSubCategory = this.getComponent('cbSubCategory');
        var cbType = this.getComponent('cbType');
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        var mailText = mail_Text_product.replace('<manufacturer>', cbManufacturer.getRawValue());
        mailText = mailText.replace('<subcategory>', cbSubCategory.getRawValue());
        mailText = mailText.replace('<model>', cbModel.getRawValue());
        mailText = mailText.replace('<type>', cbType.getRawValue());
        mailText = mailText.replace('<Username>', AAM.getUserName());

        var mailtemplate = 'mailto:ITILcenter@bayer.com';
        mailtemplate += '&subject=' + mail_Subject_product + '';
        mailtemplate += ('&body=' + mailText);
        html = html.replace('{href}', mailtemplate);
        this.getComponent('pmodel').getComponent('mailproduct').update(html);
    },
    
    update: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.setValue(assetData.manufacturerId);

        var cbSubCategory = this.getComponent('cbSubCategory');
        cbSubCategory.setValue(assetData.subcategoryId);

        var cbType = this.getComponent('cbType');
        cbType.setValue(assetData.typeId);
        cbType.setRawValue(assetData.type);
        
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        cbModel.setValue(assetData.modelId);
        cbModel.setRawValue(assetData.model);

        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.setValue(assetData.sapDescription);
        
        // Added by enqmu
        this.getComponent('pMultipleAsset').getComponent('checkmultipleasset').setValue(false);
        this.getComponent('pMultipleAsset').getComponent('tmultipleasset').setValue("");
        this.getComponent('pMultipleAsset').getComponent('tmultipleasset').disable();
        // end
        
        if(assetData.manufacturerId){
        	this.loadTypeStore(assetData.manufacturerId, assetData.subcategoryId);
        	this.loadModelStore(assetData.typeId);
        } else {
        	this.loadTypeStore();
        	this.loadModelStore();
        }
        
        this.updateMailTemplateProduct();
    },
    
    updateParam: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
    	assetData.manufacturer = cbManufacturer.getRawValue();
    	assetData.manufacturerId = cbManufacturer.getValue();

        var cbSubCategory = this.getComponent('cbSubCategory');
        assetData.subcategory = cbSubCategory.getRawValue();
        assetData.subcategoryId = cbSubCategory.getValue();

        var cbType = this.getComponent('cbType');
        assetData.type = cbType.getRawValue();
        assetData.typeId = cbType.getValue();

        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        assetData.model = cbModel.getRawValue();
        assetData.modelId = cbModel.getValue();

        var tsapDescription = this.getComponent('tsapDescription');
        assetData.sapDescription = tsapDescription.getValue();
        
        return assetData;
    },
    
    updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('cbManufacturer'), labels.assetManufacture); 
    	Util.updateFieldLabel(this.getComponent('cbSubCategory'), labels.assetSubcategory);  
    	Util.updateFieldLabel(this.getComponent('cbType'), labels.assetType);  
    	Util.updateFieldLabel(this.getComponent('tsapDescription'), labels.assetSapDescription);  
    	Util.updateLabel(this.getComponent('pmodel').getComponent('cbFieldModel'), labels.assetModel);
	}

});
Ext.reg('AIR.CiProduct', AIR.CiProduct);
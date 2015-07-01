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
		        labelSeparator : ': <span style="color:red">*</span>',
		        fieldLabel: 'Manufacturer',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('manufactureListStore'),
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
				itemId: 'cbSubCategory',
		        xtype: 'filterCombo',
		        labelSeparator : ': <span style="color:red">*</span>',
		        fieldLabel: 'Sub Category',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('subCategoryListStore'),
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
				itemId: 'cbType',
		        xtype: 'filterCombo',
		        labelSeparator : ': <span style="color:red">*</span>',
		        fieldLabel: 'Type',
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreFactory.createTypeListStore(),
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
		    	xtype: 'panel',
				itemId: 'pmodel',
				border: false,
				layout:'hbox',						
				
				items: [{
					xtype: 'label',
					fieldLabel : 'Model',
					html: 'Model: <span style="color:red">*</span>',
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
			        store: AIR.AirStoreFactory.createModelListStore(),
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
					html: '<a id="mailtoproduct" href="mailto:ITILcenter@bayer.com&subject=' + mail_Subject_product + '&body='+ mail_blank_Text_product +'"><img src="' + img_Email + '"></a>',
					itemId: 'mailproduct',
					cls: 'x-plain',
					isHideable: true,
					style: {
						//textAlign: 'left',
						color: AC.AIR_FONT_COLOR,
						fontFamily: AC.AIR_FONT_TYPE,
						fontWeight: 'normal',
						fontSize: '8pt',
						cursor:'pointer',
						//'margin-left' : 300,
						 'padding-left':'15px'
					}	
			    }]
			},{
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
//        cbManufacturer.on('keyup', this.onFieldKeyUp, this);
        
        var cbSubCategory = this.getComponent('cbSubCategory');
        cbSubCategory.on('select', this.onSubCategorySelect, this);
//        cbSubCategory.on('keyup', this.onFieldKeyUp, this);
        
        var cbType = this.getComponent('cbType');
        cbType.on('select', this.onTypeSelect, this);
//        cbType.on('keyup', this.onFieldKeyUp, this);

        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        cbModel.on('select', this.onModelSelect, this);
//        cbModel.on('keyup', this.onFieldKeyUp, this);

	},
	
	onManufacturerSelect: function(combo, record, index) {
        var value = record.get('id');
        
        var cbType = this.getComponent('cbType');
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        var tsapDescription = this.getComponent('tsapDescription');
        
        cbModel.reset();
        cbType.reset();
        tsapDescription.setValue("");
        
        cbType.getStore().removeAll();
        cbModel.getStore().removeAll();
        
        this.loadTypeStore(cbType);
        this.updateMailTemplateProduct();
    },

    onSubCategorySelect: function(combo, record, index) {
        var value = record.get('id');

        var cbType = this.getComponent('cbType');
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        var tsapDescription = this.getComponent('tsapDescription');
        
        cbModel.reset();
        cbType.reset();
        tsapDescription.setValue("");
        
        cbType.getStore().removeAll();
        cbModel.getStore().removeAll();
        
        this.loadTypeStore(cbType);
        this.updateMailTemplateProduct();
    },
    
    loadTypeStore: function(cbType){
        var partnerIdValue = this.getComponent('cbManufacturer').getValue();
        var kategoryIdValue = this.getComponent('cbSubCategory').getValue();
        
        cbType.getStore().load({
            params: {
                partnerId: partnerIdValue,
                kategory2Id: kategoryIdValue
            }
        });
    },
    
    onTypeSelect: function(combo, record, index) {
        var value = record.get('id');
        
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        var tsapDescription = this.getComponent('tsapDescription');
        
        cbModel.reset();
        cbModel.getStore().removeAll();
        tsapDescription.setValue("");
        
        cbModel.getStore().load({
            params: {
                id: value
            }
        });
        
        this.updateMailTemplateProduct();
    },

    onModelSelect: function(combo, record, index) {
        var value = record.get('id');
        
        var cbManufacturer = this.getComponent('cbManufacturer').getRawValue();
        var cbType = this.getComponent('cbType').getRawValue();
        var cbModel = this.getComponent('pmodel').getComponent('cbModel').getRawValue();
        
        var tsapDescription = this.getComponent('tsapDescription');
        
        var description = cbManufacturer + " " + cbType + " " + cbModel;
        tsapDescription.setValue(description);
        
        this.updateMailTemplateProduct();
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
    },
    
    resetFormFields: function(){
    	var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.reset();

        var cbSubCategory = this.getComponent('cbSubCategory');
        cbSubCategory.reset();

        var cbType = this.getComponent('cbType');
        cbType.reset();

        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        cbModel.reset();

        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.reset();
    }

});
Ext.reg('AIR.CiProduct', AIR.CiProduct);
Ext.namespace('AIR');

AIR.CiSoftwareProduct = Ext.extend(Ext.form.FieldSet, {

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
		    	xtype: 'panel',
				itemId: 'pProductName',
				border: false,
				layout:'hbox',						
				
				items: [{
					itemId: 'labelProductName',
					xtype: 'label',
					fieldLabel : 'ProductName',
					width: 105,
					style: {
						fontSize: 12
					}
	    		},{
	    			itemId: 'cbProductName',
			        xtype: 'filterCombo',
			        width: 330,
			        enableKeyEvents: true,
			        store: AIR.AirStoreManager.getStoreByName('softwareproductListStore'),
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

		AIR.CiSoftwareProduct.superclass.initComponent.call(this);
		
		var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.on('select', this.onManufacturerSelect, this);


        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        cbProductName.on('select', this.onProductSelect, this);

	},
	
	onManufacturerSelect: function(combo, record, index) {
        var value = record.get('id');
        
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        var tsapDescription = this.getComponent('tsapDescription');
        
        cbProductName.reset();
        
        tsapDescription.setValue("");
        cbProductName.getStore().removeAll();
        
    
        this.updateMailTemplateProduct();
    },

    onProductSelect: function(combo, record, index) {
        
        var cbManufacturer = this.getComponent('cbManufacturer').getRawValue();
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName').getRawValue();
        var description = cbManufacturer + "  " + cbProductName;
        
        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.setValue(description);
        
        this.updateMailTemplateProduct();
    },

    updateMailTemplateProduct: function() {
        var html = '<a id="mailtoproduct" href="{href}"><img src="' + img_Email + '"></a>';

        var cbManufacturer = this.getComponent('cbManufacturer').getRawValue();
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName').getRawValue();
  
        var mailText = mail_Text_product.replace('<manufacturer>', cbManufacturer);
        mailText = mailText.replace('<model>', cbProductName);
        mailText = mailText.replace('<Username>', AAM.getUserName());

        var mailtemplate = 'mailto:ITILcenter@bayer.com';
        mailtemplate += '&subject=' + mail_Subject_product + '';
        mailtemplate += ('&body=' + mailText);
        html = html.replace('{href}', mailtemplate);
        this.getComponent('pProductName').getComponent('mailproduct').update(html);
    },
    
    update: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.setValue(assetData.manufacturerId);
/*
        var cbModel = this.getComponent('pmodel').getComponent('cbModel');
        cbModel.setValue(assetData.modelId);
        cbModel.setRawValue(assetData.model);*/

        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.setValue(assetData.sapDescription);
    },
    
    updateParam: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
    	assetData.manufacturerId = cbManufacturer.getValue();

   
        
        return assetData;
    },
    
    updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('cbManufacturer'), labels.assetManufacture); 
    	Util.updateLabel(this.getComponent('pProductName').getComponent('labelProductName'), labels.assetSubcategory);  
    	Util.updateFieldLabel(this.getComponent('tsapDescription'), labels.assetSapDescription);  
    },


});
Ext.reg('AIR.CiSoftwareProduct', AIR.CiSoftwareProduct);
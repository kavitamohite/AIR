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
		        width: 370,
		        enableKeyEvents: true,
		        store: AIR.AirStoreManager.getStoreByName('softwaremanufacturerListStore'),
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
					text : 'Product Name *',
					width: 105,
					style: {
						fontSize: 12
					}
	    		},{
	    			itemId: 'cbProductName',
			        xtype: 'filterCombo',
			        width: 330,
			        enableKeyEvents: true,
			        store: AIR.AirStoreFactory.createSoftwareProductListStore(),
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
					html: '<a id="mailtoproductsoftware" href="mailto:ITILcenter@bayer.com&subject=' + mail_Subject_softwareproduct +'"><img src="' + img_Email + '"></a>',
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
    	cbManufacturer.on('change', this.onComboChange, this);
    	 
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        cbProductName.on('select', this.onProductSelect, this);
        cbProductName.on('change', this.onComboChange, this);

	},
	
	onComboChange: function(combo, newValue, oldValue) {
    	if(Util.isComboValueValid(combo, newValue, oldValue)) {
	    	
	    	if(typeof newValue === 'string' && newValue.length === 0) {
	    		combo.reset();
	    		combo.setValue(null);
	    		this.ownerCt.ownerCt.ownerCt.enableAssetButtons();
	    	} 
		}
	},
	
	onManufacturerSelect: function(combo, record, index) {
		var value = record.get('id');
        this.loadProductStore(value);
        this.updateMailTemplateProduct();
        
        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.setValue('');
    },
	
	
	loadProductStore: function(value){
		var cbProduct = this.getComponent('pProductName').getComponent('cbProductName');
		cbProduct.getStore().removeAll();
		cbProduct.reset();
		cbProduct.getStore().load({
            params: {
                id: value
            }
		});
	},
	
    onProductSelect: function(combo, record, index) {
        
        var cbManufacturer = this.getComponent('cbManufacturer').getRawValue();
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName').getRawValue();
        var description = cbManufacturer + "  " + cbProductName;
        
        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.setValue(description);
    },
    
    update: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.setValue(assetData.manufacturerId);
        this.loadProductStore(assetData.manufacturerId);
        
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        cbProductName.setValue(assetData.subcategoryId);
        cbProductName.setRawValue(assetData.subCategory);
        
        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.setValue(assetData.sapDescription);
        
        this.updateMailTemplateProduct();
    },
    
    updateMailTemplateProduct: function() {
    	var html = '<a id="mailtoproduct" href="{href}"><img src="' + img_Email + '"></a>';

        var cbManufacturer = this.getComponent('cbManufacturer');
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        var mailText = mail_Text_softwareproduct.replace('<manufacturer>', cbManufacturer.getRawValue());
        mailText = mailText.replace('<productName>', cbProductName.getRawValue());
        mailText = mailText.replace('<Username>', AAM.getUserName());

        var mailtemplate = 'mailto:ITILcenter@bayer.com';
        mailtemplate += '&subject=' + mail_Subject_softwareproduct + '';
        mailtemplate += ('&body=' + mailText);
        html = html.replace('{href}', mailtemplate);
        this.getComponent('pProductName').getComponent('mailproduct').update(html);
    },
    
    updateParam: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
    	assetData.manufacturer = cbManufacturer.getRawValue();
    	assetData.manufacturerId = cbManufacturer.getValue();

    	var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
    	assetData.subcategory = cbProductName.getRawValue();
        assetData.subcategoryId = cbProductName.getValue();
        
        var tsapDescription = this.getComponent('tsapDescription');
        assetData.sapDescription = tsapDescription.getValue();
        return assetData;
    },
    
    updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('cbManufacturer'), labels.assetManufacture); 
    	Util.updateLabel(this.getComponent('pProductName').getComponent('labelProductName'), labels.assetSoftwareProduct);  
    	Util.updateFieldLabel(this.getComponent('tsapDescription'), labels.assetSapDescription);  
    }

});
Ext.reg('AIR.CiSoftwareProduct', AIR.CiSoftwareProduct);
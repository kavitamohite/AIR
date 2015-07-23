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
					html: '<a id="mailtoproductsoftware" href="mailto:ITILcenter@bayer.com&subject=' + mail_Subject_softwareproduct + '&body='+ mail_blank_Text_softwareproduct +'"><img src="' + img_Email + '"></a>',
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
        
        /*var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        var tsapDescription = this.getComponent('tsapDescription');
        
       // cbProductName.reset();
        
        tsapDescription.setValue("");
        cbProductName.getStore().removeAll();*/
        
    
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
        var html = '<a id="mailtoproductsoftware" href="{href}"><img src="' + img_Email + '"></a>';

        var cbManufacturer = this.getComponent('cbManufacturer').getRawValue();
        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName').getRawValue();
  

        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        var mailText = mail_Text_softwareproduct.replace('<softwaremanufacturer>', cbManufacturer);

        mailText = mailText.replace('<ProductName>', cbProductName);
      

        var mailText = mail_Text_product.replace('<softwaremanufacturer>', cbManufacturer);
        mailText = mailText.replace('<ProductName>', cbProductName);

        mailText = mailText.replace('<Username>', AAM.getUserName());

        var mailtemplate = 'mailto:ITILcenter@bayer.com';
        mailtemplate += '&subject=' + mail_Subject_softwareproduct + '';
        mailtemplate += ('&body=' + mailText);
        html = html.replace('{href}', mailtemplate);
        this.getComponent('pProductName').getComponent('mailproduct').update(html);
    },
    
    update: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
        cbManufacturer.setValue(assetData.manufacturerId);

        var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        cbProductName.setValue(assetData.softwareId);
     

        var tsapDescription = this.getComponent('tsapDescription');
        tsapDescription.setValue(assetData.sapDescription);
    },
    
    updateParam: function(assetData){
    	var cbManufacturer = this.getComponent('cbManufacturer');
    	assetData.manufacturerId = cbManufacturer.getValue();

    	/*  var cbProductName = this.getComponent('pProductName').getComponent('cbProductName');
        
        assetData.softwareId = cbProductName.getValue();
*/
        var tsapDescription = this.getComponent('tsapDescription');
        assetData.sapDescription = tsapDescription.getValue();
        
        return assetData;
        
        
    },
    
    updateLabels: function(labels) {
    	Util.updateFieldLabel(this.getComponent('cbManufacturer'), labels.assetManufacture); 
    	Util.updateLabel(this.getComponent('pProductName').getComponent('labelProductName'), labels.assetSoftwareProduct);  
    	Util.updateFieldLabel(this.getComponent('tsapDescription'), labels.assetSapDescription);  
    },


});
Ext.reg('AIR.CiSoftwareProduct', AIR.CiSoftwareProduct);
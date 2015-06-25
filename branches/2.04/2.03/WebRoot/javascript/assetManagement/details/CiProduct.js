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
					html: '<a id="mailtoproduct" href="mailto:&subject=' + mail_Subject_product + '"><img src="' + img_Email + '"></a>',
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

	}
});
Ext.reg('AIR.CiProduct', AIR.CiProduct);
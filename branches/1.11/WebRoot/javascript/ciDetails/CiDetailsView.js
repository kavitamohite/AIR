Ext.namespace('AIR');

AIR.CiDetailsView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Details',

		    border: false,
		    layout: 'form',
		    
		    items: [/*{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Application Alias',
		        id: 'detailsApplicationAlias',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Category bus',
		        id: 'detailsApplicationBusinessCat',
		        disabled: true
			},*/{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Category it',
		        id: 'detailsApplicationCat2',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Application Owner',
		        id: 'detailsApplicationOwner',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'CI Owner primary person',
		        id: 'detailsCiOwner',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'SLA',
		        id: 'detailsSlaName',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Business Essential',
		        id: 'detailsBusinessEssential',
		        disabled: true
			},{
		    	xtype: 'container',
		    	html: '&nbsp;'
		    },{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Insert data',
		        id: 'detailsInsertdata',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Update data',
		        id: 'detailsUpdatedata',
		        disabled: true
			}],
		    tbar: {
		    	style: {
		            backgroundColor: '#FFFFFF',
		            background: 'none repeat-x scroll left top',
		            borderBottomWidth: '0'
		        },
		    	
				items: ['->', { 
					xtype: 'container',//replace with CommandLink
					html: '<a id="mailtociowner" href="mailto:&subject=' + mail_Subject + '"><img src="' + img_Email + '"></a>',
					id: 'detailsEmailCiOwner',
			        height: 24,
					width: 135,
					cls: 'x-plain',
//					hidden: false,
					isHideable: true,
					
					style: {
						textAlign: 'left',
						color: AC.AIR_FONT_COLOR,
						fontFamily: AC.AIR_FONT_TYPE,
						fontWeight: 'normal',
						fontSize: '8pt',
						cursor:'pointer'
					}
				}]
		    }
//		 	listeners: {
//		 		beforeshow : function (pa) {
//					if (Ext.getCmp('personpickertip')!==undefined) {
//						ppHandleToolClick(null, null, null, null);
//					}
//					if (Ext.getCmp('grouppickertip')!==undefined) {
//						gpHandleToolClick(null, null, null, null);
//					}
//		 		}
//		 	}
		});
		
		AIR.CiDetailsView.superclass.initComponent.call(this);
		
//		this.addEvents('ciBeforeChange', 'ciChange');
	},
	
	update: function(ciDetail) {//data
		var store = AIR.AirStoreManager.getStoreByName('slaListStore');
//		var slaName = ciDetail.slaId;
//		slaName = slaName.length > 0 && slaName != '0' && store.getById(ciDetail.slaId) ? store.getById(ciDetail.slaId).data.text : '';
		var slaName = ciDetail.slaId && ciDetail.slaId != 0 ? store.getById(ciDetail.slaId).data.text : '';

		store = AIR.AirStoreManager.getStoreByName('businessEssentialListStore');
//		var businessEssential = ciDetail.businessEssentialId;
//		businessEssential = businessEssential.length > 0 && businessEssential != '0' && store.getById(ciDetail.businessEssentialId) ? store.getById(ciDetail.businessEssentialId).data.text : '';
		var businessEssential = ciDetail.businessEssentialId && ciDetail.businessEssentialId != 0 ? store.getById(ciDetail.businessEssentialId).data.text : '';
		
		
		var data = {
			applicationCat1Txt: ciDetail.applicationCat1Txt,
			applicationAlias: ciDetail.applicationAlias,
			barApplicationId: ciDetail.barApplicationId,
//				applicationCat2: applicationCat2,
//				categoryBusiness: categoryBusiness,
			ciResponsible: ciDetail.ciOwner,//ciResponsible
			applicationOwner: ciDetail.applicationOwner,
			slaName: slaName,//AIR.AirStoreManager.getStoreByName('slaListStore').getById(ciDetail.slaId).data.text,
			businessEssential: businessEssential,//AIR.AirStoreManager.getStoreByName('businessEssentialListStore').getById(ciDetail.businessEssentialId).data.text,
			
			insertQuelle: ciDetail.insertQuelle,
			insertUser: ciDetail.insertUser,
			insertTimestamp: ciDetail.insertTimestamp,
			updateQuelle: ciDetail.updateQuelle,
			updateUser: ciDetail.updateUser,
			updateTimestamp: ciDetail.updateTimestamp,
			
			//mailTemplate
			applicationName: ciDetail.applicationName,
			ciSubResponsible: ciDetail.ciOwnerDelegate//ciSubResponsible
		};

		
//		var tfAlias = this.getComponent('detailsApplicationAlias');
//		var tfBusinessCat = this.getComponent('detailsApplicationBusinessCat');
		var tfAppCat2 = this.getComponent('detailsApplicationCat2');
		var tfAppOwner = this.getComponent('detailsApplicationOwner');
		
		if(ciDetail.tableId == AC.TABLE_ID_APPLICATION) {
			store = AIR.AirStoreManager.getStoreByName('applicationCat2ListStore');
			var applicationCat2 = ciDetail.applicationCat2;
			applicationCat2 = applicationCat2.length > 0 && applicationCat2 != '0' && store.getById(ciDetail.applicationCat2) ? store.getById(ciDetail.applicationCat2).data.text : '';
			data.applicationCat2 = applicationCat2;
			
			
			store = AIR.AirStoreManager.getStoreByName('categoryBusinessListStore');
			var categoryBusiness = ciDetail.categoryBusinessId;
			categoryBusiness = categoryBusiness.length > 0 && categoryBusiness != '0' && store.getById(ciDetail.categoryBusinessId) ? store.getById(ciDetail.categoryBusinessId).data.text : '';
			data.categoryBusiness = categoryBusiness;
			
			
			
			
//			tfAlias.setValue(data.applicationAlias);
//			tfBusinessCat.setValue(data.categoryBusiness);
			tfAppCat2.setValue(data.applicationCat2);
			tfAppOwner.setValue(data.applicationOwner);
			
//			tfAlias.setVisible(true);
//			tfBusinessCat.setVisible(true);
			tfAppCat2.setVisible(true);
			tfAppOwner.setVisible(true);
		} else {
//			tfAlias.reset();
//			tfBusinessCat.reset();
			tfAppCat2.reset();
			tfAppOwner.reset();
			
//			tfAlias.setVisible(false);
//			tfBusinessCat.setVisible(false);
			tfAppCat2.setVisible(false);
			tfAppOwner.setVisible(false);
		}
		
		var cbBusinessEssential = this.getComponent('detailsBusinessEssential');
		
		if(parseInt(ciDetail.tableId) === AC.TABLE_ID_APPLICATION ||
		   parseInt(ciDetail.tableId) === AC.TABLE_ID_ROOM ||
		   parseInt(ciDetail.tableId) === AC.TABLE_ID_POSITION) {
			
			cbBusinessEssential.setValue(data.businessEssential);
			cbBusinessEssential.setVisible(true);
		} else {
			cbBusinessEssential.reset();
			cbBusinessEssential.setVisible(false);
		}
		
		var field = this.getComponent('detailsCiOwner');
		field.setValue(data.ciResponsible);
		var labels = AIR.AirApplicationManager.getLabels();
		var label = data.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.label_details_ciOwner;
		this.setFieldLabel(field, label);
		
		
		field = this.getComponent('detailsSlaName');
		field.setValue(data.slaName);
		

		

		var value = ciDetail.insertQuelle + ' ' + ciDetail.insertUser + ' ' + ciDetail.insertTimestamp;
		this.getComponent('detailsInsertdata').setValue(value);

		value = ciDetail.updateQuelle + ' ' + ciDetail.updateUser + ' ' + ciDetail.updateTimestamp;
		this.getComponent('detailsUpdatedata').setValue(value);
		
		
		this.updateMailTemplate(data);
	},
	
	updateMailTemplate: function(data) {
		var mailtemplate = 'mailto:';
		// check value
		mailtemplate += data.ciResponsible;//Ext.getCmp('ciResponsibleHidden').getValue();
		mailtemplate += '?';

		// mail copy to sub responsible
		if ('' !== data.ciSubResponsible) {//Ext.getCmp('ciSubResponsibleHidden').getValue()
			mailtemplate += 'cc=' + data.ciSubResponsible;//Ext.getCmp('ciSubResponsibleHidden').getValue()
			mailtemplate += '&';
		}

		var tempSubj = mail_Subject.replace('<CIName>', data.applicationName);//Ext.getCmp('applicationName').getValue()
		var tempText = mail_Text.replace('<CIName>', data.applicationName);//Ext.getCmp('applicationName').getValue()
		tempText = tempText.replace('<Username>', AIR.AirApplicationManager.getUserName());//username
		
		mailtemplate += 'subject=' + tempSubj + '';
		mailtemplate += ('&body=' + tempText);
		
		Ext.get('mailtociowner').dom.href = mailtemplate;//replace with CommandLink
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.detailsPanelTitle);
//		this.setFieldLabel(this.getComponent('detailsApplicationAlias'), labels.label_details_alias);
//		this.setFieldLabel(this.getComponent('detailsApplicationBusinessCat'), labels.label_details_category_business);
		this.setFieldLabel(this.getComponent('detailsApplicationCat2'), labels.label_details_category);
		
//		var ciDetail = AIR.AirApplicationManager.getciDetail();
//		if(ciDetail) {
//			var label = ciDetail.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.label_details_ciOwner;
//			this.setFieldLabel(this.getComponent('detailsCiOwner'), label);//labels.label_details_ciOwner
//		}
		
		this.setFieldLabel(this.getComponent('detailsApplicationOwner'), labels.label_details_applicationOwner);
		this.setFieldLabel(this.getComponent('detailsSlaName'), labels.label_details_sla);
		this.setFieldLabel(this.getComponent('detailsBusinessEssential'), labels.label_details_businessessential);
		this.setFieldLabel(this.getComponent('detailsInsertdata'), labels.label_details_insertdata);
		this.setFieldLabel(this.getComponent('detailsUpdatedata'), labels.label_details_updatedata);
	}
	
//	fillDetailsInformation: function () {
//		Ext.getCmp('detailsApplicationAlias').setValue(Ext.getCmp('applicationAlias').getRawValue());
//		
//		var categoryBusiness = Ext.getCmp('cbApplicationBusinessCat').getRawValue();
//		Ext.getCmp('detailsApplicationBusinessCat').setValue(categoryBusiness);
//		
//		var categoryIT = Ext.getCmp('applicationCat2').getRawValue();
//		Ext.getCmp('detailsApplicationCat2').setValue(categoryIT);
//
//		Ext.getCmp('detailsCiOwner').setValue(Ext.getCmp('ciResponsible').getValue());
//		Ext.getCmp('detailsApplicationOwner').setValue(Ext.getCmp('applicationOwner').getValue());
//		Ext.getCmp('detailsSlaName').setValue(Ext.getCmp('sla').getRawValue());
//		Ext.getCmp('detailsBusinessEssential').setValue(Ext.getCmp('businessEssential').getRawValue());
//	}
});
Ext.reg('AIR.CiDetailsView', AIR.CiDetailsView);
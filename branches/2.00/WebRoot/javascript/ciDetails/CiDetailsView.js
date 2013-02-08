Ext.namespace('AIR');

AIR.CiDetailsView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200,
		    title: 'Details',

		    border: false,
		    layout: 'form',
		    
		    items: [{
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
			},{
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
		var slaName = ciDetail.slaId && ciDetail.slaId != 0 ? store.getById(ciDetail.slaId).data.text : '';

		store = AIR.AirStoreManager.getStoreByName('businessEssentialListStore');
		var businessEssential = ciDetail.businessEssentialId && ciDetail.businessEssentialId != 0 ? store.getById(ciDetail.businessEssentialId).data.text : '';
		
		
		var data = {
			applicationCat1Id: ciDetail.applicationCat1Id,
			alias: ciDetail.alias,//applicationAlias
			barApplicationId: ciDetail.barApplicationId,
			applicationCat2: applicationCat2,
			categoryBusiness: categoryBusiness,
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
			name: ciDetail.name,//applicationName
			ciOwnerDelegate: ciDetail.ciOwnerDelegate//ciSubResponsible
		};

		
		var tfBusinessCat = this.getComponent('detailsApplicationBusinessCat');
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
			
			
			tfBusinessCat.setValue(data.categoryBusiness);
			tfAppCat2.setValue(data.applicationCat2);
			
			tfBusinessCat.setVisible(true);
			tfAppCat2.setVisible(true);
			
			if(data.applicationCat1Id == AC.APP_CAT1_APPLICATION) {
				tfAppOwner.setValue(data.applicationOwner);
				tfAppOwner.setVisible(true);
			} else {
				tfAppOwner.reset();
				tfAppOwner.setVisible(false);
			}
		} else {
			tfBusinessCat.reset();
			tfAppCat2.reset();
			tfAppOwner.reset();
			
			tfBusinessCat.setVisible(false);
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
		
		var tfAlias = this.getComponent('detailsApplicationAlias');
		tfAlias.setValue(data.alias);

		
		var field = this.getComponent('detailsCiOwner');
		field.setValue(data.ciResponsible);
		var labels = AIR.AirApplicationManager.getLabels();
		var label = data.applicationCat1Id == AC.APP_CAT1_APPLICATION ? labels.applicationManager : labels.label_details_ciOwner;
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
		mailtemplate += data.ciOwner;//ciResponsible
		mailtemplate += '?';

		// mail copy to sub responsible
		if ('' !== data.ciOwnerDelegate) {//ciSubResponsible
			mailtemplate += 'cc=' + data.ciOwnerDelegate;//ciSubResponsible
			mailtemplate += '&';
		}

		var tempSubj = mail_Subject.replace('<CIName>', data.name);//applicationName
		var tempText = mail_Text.replace('<CIName>', data.name);//applicationName
		tempText = tempText.replace('<Username>', AIR.AirApplicationManager.getUserName());//username
		
		mailtemplate += 'subject=' + tempSubj + '';
		mailtemplate += ('&body=' + tempText);
		
		Ext.get('mailtociowner').dom.href = mailtemplate;//replace with CommandLink
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.detailsPanelTitle);
		this.setFieldLabel(this.getComponent('detailsApplicationAlias'), labels.label_details_alias);
		this.setFieldLabel(this.getComponent('detailsApplicationBusinessCat'), labels.label_details_category_business);
		this.setFieldLabel(this.getComponent('detailsApplicationCat2'), labels.label_details_category);
		
		var ciDetail = AIR.AirApplicationManager.getAppDetail();
		if(ciDetail) {
			var label = ciDetail.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.label_details_ciOwner;
			this.setFieldLabel(this.getComponent('detailsCiOwner'), label);//labels.label_details_ciOwner
		}
		
		this.setFieldLabel(this.getComponent('detailsApplicationOwner'), labels.label_details_applicationOwner);
		this.setFieldLabel(this.getComponent('detailsSlaName'), labels.label_details_sla);
		this.setFieldLabel(this.getComponent('detailsBusinessEssential'), labels.label_details_businessessential);
		this.setFieldLabel(this.getComponent('detailsInsertdata'), labels.label_details_insertdata);
		this.setFieldLabel(this.getComponent('detailsUpdatedata'), labels.label_details_updatedata);
	},
	
	updateToolTips: function(toolTips) {
		this.setTooltipData(this.getComponent('detailsApplicationAlias').label, toolTips.applicationAlias, toolTips.applicationAliasText);
		this.setTooltipData(this.getComponent('detailsApplicationBusinessCat').label, toolTips.applicationBusinessCat, toolTips.applicationBusinessCatText);
		this.setTooltipData(this.getComponent('detailsApplicationCat2').label, toolTips.applicationCat2, toolTips.applicationCat2Text);
		this.setTooltipData(this.getComponent('detailsApplicationOwner').label, toolTips.applicationOwner, toolTips.applicationOwnerText);
		this.setTooltipData(this.getComponent('detailsBusinessEssential').label, toolTips.businessEssential, toolTips.businessEssentialText);
		this.setTooltipData(this.getComponent('detailsCiOwner').label, toolTips.ciResponsible, toolTips.ciResponsibleText);
		this.setTooltipData(this.getComponent('detailsSlaName').label, toolTips.slaName, toolTips.slaNameText);
		
		this.setTooltipData(this.getComponent('detailsInsertdata').label, toolTips.insertData, toolTips.insertDataText);
		this.setTooltipData(this.getComponent('detailsUpdatedata').label, toolTips.updateData, toolTips.updateDataText);
	}
});
Ext.reg('AIR.CiDetailsView', AIR.CiDetailsView);
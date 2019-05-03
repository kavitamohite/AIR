Ext.namespace('AIR');

AIR.CiDetailsView = Ext.extend(AIR.AirView, {//Ext.Panel
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 200, // label settings here cascade unless overridden
//		    frame: true,
//		    id: 'detailsPanel',
		    title: 'Details',

		    border: false,
		    layout: 'form',
		    
		    items: [{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Application Alias',
		        name: 'detailsApplicationAlias',
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
		        name: 'detailsApplicationOwner',
		        id: 'detailsApplicationOwner',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'CI Owner primary person',
		        name: 'detailsCiOwner',
		        id: 'detailsCiOwner',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'SLA',
		        name: 'detailsSlaName',
		        id: 'detailsSlaName',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Business Essential',
		        name: 'detailsBusinessEssential',
		        id: 'detailsBusinessEssential',
		        disabled: true
			},{
		    	xtype: 'container',
		    	html: '&nbsp;'
		    },{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Insert data',
		        name: 'detailsInsertdata',
		        id: 'detailsInsertdata',
		        disabled: true
			},{
		    	xtype: 'textfield',
		        width: 230,
		        fieldLabel: 'Update data',
		        name: 'detailsUpdatedata',
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
						color: fontColor,
						fontFamily: fontType,
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
	
	update: function(detailsData) {
//		this.fillDetailsInformation();
//		var appDetail = AIR.AirApplicationManager.getAppDetail();
		
		
		var field = this.getComponent('detailsApplicationAlias');
		field.setValue(detailsData.applicationAlias);
		
		field = this.getComponent('detailsApplicationBusinessCat');
		field.setValue(detailsData.categoryBusiness);
		
		field = this.getComponent('detailsApplicationCat2');
		field.setValue(detailsData.applicationCat2);
		
		field = this.getComponent('detailsCiOwner');
		field.setValue(detailsData.ciResponsible);
		var labels = AIR.AirApplicationManager.getLabels();
		var label = detailsData.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.label_details_ciOwner;
		this.setFieldLabel(field, label);
		
		field = this.getComponent('detailsApplicationOwner');
		field.setValue(detailsData.applicationOwner);
		
		
		field = this.getComponent('detailsSlaName');
		field.setValue(detailsData.slaName);
		
		field = this.getComponent('detailsBusinessEssential');
		field.setValue(detailsData.businessEssential);
		

		var data = detailsData.insertQuelle + ' ' + detailsData.insertUser + ' ' + detailsData.insertTimestamp;
		this.getComponent('detailsInsertdata').setValue(data);

		data = detailsData.updateQuelle + ' ' + detailsData.updateUser + ' ' + detailsData.updateTimestamp;
		this.getComponent('detailsUpdatedata').setValue(data);
		
		
		this.updateMailTemplate(detailsData);
	},
	
	updateMailTemplate: function(detailsData) {
		var mailtemplate = 'mailto:';
		// check value
		mailtemplate += detailsData.ciResponsible;//Ext.getCmp('ciResponsibleHidden').getValue();
		mailtemplate += '?';

		// mail copy to sub responsible
		if ('' !== detailsData.ciSubResponsible) {//Ext.getCmp('ciSubResponsibleHidden').getValue()
			mailtemplate += 'cc=' + detailsData.ciSubResponsible;//Ext.getCmp('ciSubResponsibleHidden').getValue()
			mailtemplate += '&';
		}

		var tempSubj = mail_Subject.replace('<CIName>', detailsData.applicationName);//Ext.getCmp('applicationName').getValue()
		var tempText = mail_Text.replace('<CIName>', detailsData.applicationName);//Ext.getCmp('applicationName').getValue()
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
		
//		var appDetail = AIR.AirApplicationManager.getAppDetail();
//		if(appDetail) {
//			var label = appDetail.applicationCat1Txt === 'Application' ? labels.applicationManager : labels.label_details_ciOwner;
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
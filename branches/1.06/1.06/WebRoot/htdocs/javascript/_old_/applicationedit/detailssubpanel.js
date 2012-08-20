/*var detailsPanel = new Ext.Panel({
	labelWidth: 200, // label settings here cascade unless overridden
    frame: true,
    id: 'detailsPanel',
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
			xtype: 'container',	  
			html: '<a id="mailtociowner" href="mailto:&subject=' + mail_Subject + '"><img src="' + img_Email + '"></a>',
			id: 'detailsEmailCiOwner',
	        height: 24,
			width: '135',
			cls: 'x-plain',
			hidden: false,
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
    },
 	listeners: {
 		beforeshow : function (pa) {
			if (Ext.getCmp('personpickertip')!==undefined) {
				ppHandleToolClick(null, null, null, null);
			}
			if (Ext.getCmp('grouppickertip')!==undefined) {
				gpHandleToolClick(null, null, null, null);
			}
 		}
 	}
});*/
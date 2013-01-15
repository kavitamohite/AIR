Ext.namespace('AIR');

AIR.CiSpecificsView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    border: false,
		    padding: 10,
		    
//		    title: '',
		    header: true,

		    layout: 'card',
		    activeItem: 0,
		    
		    items: [{
		    	id: 'clCiSpecificsAnwendung',
		        xtype: 'AIR.CiSpecificsAnwendungView',
		        parentView: this
			}]
		});
		
		AIR.CiSpecificsView.superclass.initComponent.call(this);
	},
	

	ciChange: function(event, view, item, values) {
		this.fireEvent(event, this, item, values);
	},

	update: function(data) {
		switch(parseInt(data.ciTableId)) {
			case AC.TABLE_ID_APPLICATION:
				this.getComponent('clCiSpecificsAnwendung').update(data);
				break;
		}
	},
	
	
	setData: function(data) {
		switch(parseInt(data.ciTableId)) {
			case AC.TABLE_ID_APPLICATION:
				this.getComponent('clCiSpecificsAnwendung').setData(data);
				break;
		}
	},

	
	validate: function(item) {
		/*switch(item.getId()) {
			case 'cbIsTemplate':
				var isChecked = item.getValue();
				var rgBARrelevance = this.getComponent('rgBARrelevance');
				
				if(AIR.AirAclManager.isRelevance(rgBARrelevance, AAM.getAppDetail())) {
					var labels = AAM.getLabels();
					var infoTitle = labels.templateBARrelevanceValidationTitle,
						infoText;
					
					if(isChecked) {
						rgBARrelevance.setValue('N');
						rgBARrelevance.disable();
						
						infoText = labels.templateBARrelevanceValidationBARrelevance1;
					} else {
						var barRelevance = AAM.getAppDetail().barRelevance;
						rgBARrelevance.setValue(barRelevance);
						
						if(barRelevance !== 'Y')
							rgBARrelevance.enable();
						
						infoText = labels.templateBARrelevanceValidationBARrelevance2;
					}
					
					var infoWindow = AIR.AirWindowFactory.createDynamicMessageWindow('GENERIC_OK', null, infoText, infoTitle);
					infoWindow.show();
				}
				break;
			default: break;
		}*/
	},
	
	updateLabels: function(labels, ciTableId) {
		this.setTitle(labels.specificsPanelTitle);

		switch(parseInt(ciTableId)) {
			case AC.TABLE_ID_APPLICATION:
				this.getComponent('clCiSpecificsAnwendung').updateLabels(labels);
				break;
		}
	},
	
	updateToolTips: function(toolTips, ciTableId) {
		switch(parseInt(ciTableId)) {
			case AC.TABLE_ID_APPLICATION:
				this.getComponent('clCiSpecificsAnwendung').updateToolTips(toolTips);
				break;
		}
	}
});
Ext.reg('AIR.CiSpecificsView', AIR.CiSpecificsView);
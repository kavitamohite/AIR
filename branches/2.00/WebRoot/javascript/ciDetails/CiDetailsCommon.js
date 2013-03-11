Ext.namespace('AIR');

AIR.CiDetailsCommon = function() {
	return {
		orgScopeChange: function(listview, selections) {
			var scopeRecords = listview.getSelectedRecords();
	
			var firstRecord = scopeRecords[0];
			var lastRecord = scopeRecords[scopeRecords.length - 1];
			
			if(scopeRecords.length > 0 && (firstRecord.get('name') === AC.ORG_SCOPE_DEFAULT || lastRecord.get('name') === AC.ORG_SCOPE_DEFAULT)) {
				var defaultRecord = firstRecord;
				if(defaultRecord.get('name') !== AC.ORG_SCOPE_DEFAULT)
					defaultRecord = lastRecord;
					
				listview.clearSelections();
				listview.select(defaultRecord, true, true);
			}
		},
		
		initView: function(parentView, childView, callback) {
			childView.on('afterlayout', this.onViewAdded, this);//ciEditView afterrender .getComponent('clCiCompliance')
			parentView.add(childView);
		},
		
		onViewAdded: function(parentCt, layout) {
			Util.log('CiDetailsCommon::onViewAdded(): '+parentCt.getId());
			//ciLicenseView.on('ciChange', this.onCiChange, this);
			//ciLicenseView.update(ciDetail);
		}
	};

}();
Ext.reg('AIR.CiDetailsCommon', AIR.CiDetailsCommon);
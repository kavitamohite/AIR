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
		}
	};
}();
Ext.reg('AIR.CiDetailsCommon', AIR.CiDetailsCommon);
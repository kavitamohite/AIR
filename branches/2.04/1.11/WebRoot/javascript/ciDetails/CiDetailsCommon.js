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
		
		/*createRoomFields: function() {
			var fields = this;
			fields.push('floor');
			fields.push('roomType');
			
			return fields;
		},
		
		createCiLokationBaseFields: function() {
			var fields = [{
				name: 'id', type: 'int'
			},{
				name: 'tableId', type: 'int'
			},{
				name: 'areaId', type: 'int'
			}, 'name', 'alias', 'ciOwner', 'ciOwnerDelegate', 'insertQuelle', 'insertTimestamp', 'insertUser', 'updateQuelle', 'updateTimestamp', 'updateUser', 'slaId', 'businessEssentialId',
				'hasMarkedDeletedItems',{
				name: 'standordLoeschung', type: 'int'
			},{
				name: 'terrainLoeschung', type: 'int'
			},{
				name: 'gebaeudeLoeschung', type: 'int'
			},{
				name: 'aereaLoeschung', type: 'int'
			},{
				name: 'raumLoeschung', type: 'int'
			},{
				name: 'schrankLoeschung', type: 'int'
			},{
				name: 'landId', type: 'int'
			}, 'landName', 'landNameEn', 'landKennzeichen',{
				name: 'standortId', type: 'int'
			}, 'standortName', 'standortCode',{
				name: 'terrainId', type: 'int'
			},'terrainName',{
				name: 'gebaeudeId', type: 'int'
			},'gebaeudeName',{
				name: 'areaId', type: 'int'
			},'areaName',{
				name: 'raumId', type: 'int'
			},'raumName',{
				name: 'schrankId', type: 'int'
			},'schrankName'];
			
			return fields;
		}*/
	};

}();
Ext.reg('AIR.CiDetailsCommon', AIR.CiDetailsCommon);
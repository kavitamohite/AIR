Ext.namespace('AIR');

AIR.CiLocationRecord = Ext.data.Record.create([{
		name: 'id', type: 'int'
	},{
		name: 'tableId', type: 'int'
	},{
		name: 'areaId', type: 'int'
	}, 'name', 'alias', 'ciOwner', 'ciOwnerDelegate', 'insertQuelle', 'insertTimestamp', 'insertUser', 'updateQuelle', 'updateTimestamp', 'updateUser', 'businessEssentialId',
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
	},'schrankName'
]);
Ext.reg('AIR.CiLocationRecord', AIR.CiLocationRecord);
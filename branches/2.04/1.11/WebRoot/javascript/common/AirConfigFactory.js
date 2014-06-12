Ext.namespace('AIR');

AIR.AirConfigFactory = function() {
	return {
		createCiResultGridConfig: function(isComplete) {
		    var columnConfig = [];
		    		
			columnConfig.push({ id: 'name', header: 'Name', dataIndex: 'name', width: 150, sortable: true});//applicationName
			columnConfig.push({ id: 'alias', header: 'Alias', dataIndex: 'alias', width: 150, sortable: true});//applicationAlias
			columnConfig.push({ id: 'applicationCat1Txt', header: 'Type', dataIndex: 'applicationCat1Txt', width: 150, sortable: true});
			
			if(isComplete) {
				columnConfig.push({ id: 'applicationCat2Txt', header: 'Category', dataIndex: 'applicationCat2Txt', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'applicationOwner', header: 'App owner', dataIndex: 'applicationOwner', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'applicationOwnerDelegate', header: 'App owner delegate', dataIndex: 'applicationOwnerDelegate', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'applicationSteward', header: 'App steward', dataIndex: 'applicationSteward', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'ciOwner', header: 'Responsible', dataIndex: 'ciOwner', width: 150, sortable: true});//responsible , menuDisabled: true
				columnConfig.push({ id: 'ciOwnerDelegate', header: 'Sub responsible', dataIndex: 'ciOwnerDelegate', width: 150, sortable: true});//subResponsible , menuDisabled: true
			}
			
			return columnConfig;
		},
		
		createDwhEntityGridConfig: function(isComplete) {
		    var columnConfig = [];
		    		
			columnConfig.push({ id: 'ciName', header: 'Name', dataIndex: 'ciName', width: 150, sortable: true});
			columnConfig.push({ id: 'ciAlias', header: 'Alias', dataIndex: 'ciAlias', width: 150, sortable: true});
			columnConfig.push({ id: 'ciType', header: 'Type', dataIndex: 'ciType', width: 150, sortable: true});
			
			if(isComplete) {
				columnConfig.push({ id: 'categoryIt', header: 'Category', dataIndex: 'categoryIt', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'lifecycleStatus', header: 'Lifecycle Status', dataIndex: 'lifecycleStatus', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'appOwner', header: 'App owner', dataIndex: 'appOwner', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'appOwnerDelegate', header: 'App owner delegate', dataIndex: 'appOwnerDelegate', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'appSteward', header: 'App steward', dataIndex: 'appSteward', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'ciOwner', header: 'Responsible', dataIndex: 'ciOwner', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'ciOwnerDelegate', header: 'Sub responsible', dataIndex: 'ciOwnerDelegate', width: 150, sortable: true});//, menuDisabled: true
			}
			
			return columnConfig;
		},
		
		createBuildingCiRecord: function() {
			var buildingCiFields = this.getLocationCiFields();
			
			buildingCiFields.push('buildingCode');
			buildingCiFields.push('street');
			buildingCiFields.push('streetNumber');
			buildingCiFields.push('postalCode');
			buildingCiFields.push('location');
			
			return Ext.data.Record.create(buildingCiFields);
		},
		
		createBuildingAreaCiRecord: function() {
			var buildingAreaCiFields = this.getLocationCiFields();
			
			return Ext.data.Record.create(buildingAreaCiFields);
		},
		
		createRoomCiRecord: function() {
			var roomCiFields = this.getLocationCiFields();
			
			roomCiFields.push('floor');
			roomCiFields.push('roomType');
			roomCiFields.push('street');
			roomCiFields.push('streetNumber');
			roomCiFields.push('location');
			roomCiFields.push('postalCode');
			
			roomCiFields.push('severityLevelId');
			roomCiFields.push('businessEssentialId');
			
			roomCiFields.push('severityLevelIdAcl');
			roomCiFields.push('businessEssentialIdAcl');
			
			return Ext.data.Record.create(roomCiFields);
		},
		
		//von Feldern id bis tableId wie BaseDTO in function verlagern
		getLocationCiFields: function() {
			var locationCiFields = [{
				name: 'id', type: 'int'
			}, 'name', 'alias', 'relevanceOperational', 'ciOwner', 'ciOwnerDelegate', 'insertQuelle', 'insertTimestamp', 'insertUser', 
			   'updateQuelle', 'updateTimestamp', 'updateUser', 'deleteQuelle', 'deleteTimestamp', 'deleteUser',
			   'slaId', 'serviceContractId', 'itset', 'template', 'itsecGroupId', 'refId', 'relevanceGR1435', 'relevanceGR1920',
			   
			   'ciOwnerAcl', 'ciOwnerDelegateAcl', 'relevanceGR1435Acl', 'relevanceGR1920Acl', 'gxpFlagIdAcl',
			   'refIdAcl', 'itsecGroupIdAcl', 'slaIdAcl', 'serviceContractIdAcl', {
				name: 'tableId', type: 'int'
			},{
				name: 'areaId', type: 'int'//nötig, da schon vorhanden --> nur Room??
			},
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
			
			return locationCiFields;
		}
	};
}();
//};
Ext.reg('AIR.AirConfigFactory', AIR.AirConfigFactory);
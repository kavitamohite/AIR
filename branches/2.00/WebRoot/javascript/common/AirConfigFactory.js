Ext.namespace('AIR');

AIR.AirConfigFactory = function() {
	return {
		createCiResultGridConfig: function(isComplete) {
		    var columnConfig = [];
		    		
			columnConfig.push({ id: 'name', header: 'Name', dataIndex: 'name', width: 150, sortable: true});// applicationName
			columnConfig.push({ id: 'alias', header: 'Alias', dataIndex: 'alias', width: 150, sortable: true});// applicationAlias
			columnConfig.push({ id: 'applicationCat1Txt', header: 'Type', dataIndex: 'applicationCat1Txt', width: 150, sortable: true});
			
			if(isComplete) {
				columnConfig.push({ id: 'applicationCat2Txt', header: 'Category', dataIndex: 'applicationCat2Txt', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'applicationOwner', header: 'App owner', dataIndex: 'applicationOwner', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'applicationOwnerDelegate', header: 'App owner delegate', dataIndex: 'applicationOwnerDelegate', width: 150, sortable: true});// ,																																	// true
				columnConfig.push({ id: 'applicationSteward', header: 'App steward', dataIndex: 'applicationSteward', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'ciOwner', header: 'Responsible', dataIndex: 'ciOwner', width: 150, sortable: true});// responsible
				columnConfig.push({ id: 'ciOwnerDelegate', header: 'Sub responsible', dataIndex: 'ciOwnerDelegate', width: 150, sortable: true});// subResponsible
			}
			
			return columnConfig;
		},
		
		createDwhEntityGridConfig: function(isComplete) {
		    var columnConfig = [];
		    		
			columnConfig.push({ id: 'ciName', header: 'Name', dataIndex: 'ciName', width: 150, sortable: true});
			columnConfig.push({ id: 'ciAlias', header: 'Alias', dataIndex: 'ciAlias', width: 150, sortable: true});
			columnConfig.push({ id: 'ciType', header: 'Type', dataIndex: 'ciType', width: 150, sortable: true});
			
			if(isComplete) {
				columnConfig.push({ id: 'categoryIt', header: 'Category', dataIndex: 'categoryIt', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'lifecycleStatus', header: 'Lifecycle Status', dataIndex: 'lifecycleStatus', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'appOwner', header: 'App owner', dataIndex: 'appOwner', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'appOwnerDelegate', header: 'App owner delegate', dataIndex: 'appOwnerDelegate', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'appSteward', header: 'App steward', dataIndex: 'appSteward', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'ciOwner', header: 'Responsible', dataIndex: 'ciOwner', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'ciOwnerDelegate', header: 'Sub responsible', dataIndex: 'ciOwnerDelegate', width: 150, sortable: true});// ,																																					// true
			}
			
			return columnConfig;
		},
		
		createItSystemCiRecord: function() {
			var itSystemCiFields = this.getBaseCiFields();
			
			itSystemCiFields.push('ciSubTypeId');
			itSystemCiFields.push('osNameId');//bestimmt gleichzeitig auch noch osType und osGroup
			itSystemCiFields.push('clusterCode');
			itSystemCiFields.push('clusterType');
			itSystemCiFields.push('isVirtualHardwareClient');
			itSystemCiFields.push('isVirtualHardwareHost');
			itSystemCiFields.push('virtualHardwareSoftware');
			itSystemCiFields.push('lifecycleStatusId');
			itSystemCiFields.push('einsatzStatusId');
			itSystemCiFields.push('primaryFunctionId');
			itSystemCiFields.push('licenseScanningId');
			
			return itSystemCiFields;
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
			
			buildingAreaCiFields.push('buildingData');
			
			return Ext.data.Record.create(buildingAreaCiFields);
		},
		
		createSchrankCiRecord: function() {
			var schrankCiFields = this.getLocationCiFields();
			
			schrankCiFields.push('severityLevelId');
			schrankCiFields.push('businessEssentialId');
			
			return Ext.data.Record.create(schrankCiFields);
		},
		
		createTerrainCiRecord: function() {
			var terrainCiFields = this.getLocationCiFields();
			
			return Ext.data.Record.create(terrainCiFields);
		},
		
		createStandortCiRecord: function() {
			var standortCiFields = this.getLocationCiFields();
			
			return Ext.data.Record.create(standortCiFields);
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
			roomCiFields.push('buildingAreaData');
			
			return Ext.data.Record.create(roomCiFields);
		},
		

		getLocationCiFields: function() {
			var locationCiFields = this.getBaseCiFields();
			
			locationCiFields.push('hasMarkedDeletedItems');
			locationCiFields.push({	name: 'standordLoeschung', type: 'int' });
			locationCiFields.push({	name: 'terrainLoeschung', type: 'int' });
			locationCiFields.push({	name: 'gebaeudeLoeschung', type: 'int' });
			locationCiFields.push({	name: 'aereaLoeschung', type: 'int' });
			locationCiFields.push({	name: 'raumLoeschung', type: 'int' });
			locationCiFields.push({	name: 'schrankLoeschung', type: 'int' });
			locationCiFields.push({	name: 'landId', type: 'int' });
			locationCiFields.push('landName');
			locationCiFields.push('landNameEn');
			locationCiFields.push('landKennzeichen');
			locationCiFields.push({	name: 'standortId', type: 'int' });
			locationCiFields.push('standortName');
			locationCiFields.push('standortCode');
			locationCiFields.push({ name: 'terrainId', type: 'int' });
			locationCiFields.push('terrainName');
			locationCiFields.push({ name: 'gebaeudeId', type: 'int' });
			locationCiFields.push('gebaeudeName');
			locationCiFields.push({ name: 'areaId', type: 'int' });
			locationCiFields.push('areaName');
			locationCiFields.push({ name: 'raumId', type: 'int' });
			locationCiFields.push('raumName');
			locationCiFields.push({ name: 'schrankId', type: 'int' });
			locationCiFields.push('schrankName');
			
			return locationCiFields;
		},
		
		getBaseCiFields: function() {
			var baseCiFields = [{
				name: 'id', type: 'int'
			}, 'name', 'alias', 'relevanceOperational', 'ciOwner', 'ciOwnerHidden', 'ciOwnerDelegate', 'ciOwnerDelegateHidden', 'insertQuelle', 'insertTimestamp', 'insertUser', 
			   'updateQuelle', 'updateTimestamp', 'updateUser', 'deleteQuelle', 'deleteTimestamp', 'deleteUser', 'itSecSbAvailabilityId', 'itSecSbAvailabilityDescription',
			   'slaId', 'serviceContractId', 'itset', 'template', 'itsecGroupId', 'refId', 'relevanceGR1435', 'relevanceGR1920',
			   
			   'ciOwnerAcl', 'ciOwnerDelegateAcl', 'relevanceGR1435Acl', 'relevanceGR1920Acl', 'gxpFlag', 'gxpFlagId', 'gxpFlagIdAcl',
			   'refIdAcl', 'itsecGroupIdAcl', 'slaIdAcl', 'serviceContractIdAcl', {
				name: 'tableId', type: 'int'
			}];
			
			return baseCiFields;
		}
	};
}();
// };
Ext.reg('AIR.AirConfigFactory', AIR.AirConfigFactory);
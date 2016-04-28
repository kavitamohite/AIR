Ext.namespace('AIR');

AIR.AirConfigFactory = function() {
	return {
		createCiResultGridConfig: function(isComplete,selModel) {
		    var columnConfig = [];
		    columnConfig.push(selModel);
			columnConfig.push({ id: 'name', header: 'Name', dataIndex: 'name', width: 150, sortable: true});// applicationName
			columnConfig.push({ id: 'alias', header: 'Alias', dataIndex: 'alias', width: 150, sortable: true});// applicationAlias
			columnConfig.push({ id: 'applicationCat1Txt', header: 'Type', dataIndex: 'applicationCat1Txt', width: 150, sortable: true});
			
			if(isComplete) {
				columnConfig.push({ id: 'applicationCat2Txt', header: 'Category', dataIndex: 'applicationCat2Txt', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'location', header: 'Location', dataIndex: 'location', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'applicationOwner', header: 'App owner', dataIndex: 'applicationOwner', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'applicationOwnerDelegate', header: 'App owner delegate', dataIndex: 'applicationOwnerDelegate', width: 150, sortable: true});// ,																																	// true
				columnConfig.push({ id: 'applicationSteward', header: 'App steward', dataIndex: 'applicationSteward', width: 150, sortable: true});// ,
				columnConfig.push({ id: 'ciOwner', header: 'Responsible', dataIndex: 'ciOwner', width: 150, sortable: true});// responsible
				columnConfig.push({ id: 'ciOwnerDelegate', header: 'Sub responsible', dataIndex: 'ciOwnerDelegate', width: 150, sortable: true});// subResponsible
				columnConfig.push({ id: 'isTemplate', header: 'Template', dataIndex: 'isTemplate', hidden:true});
				columnConfig.push({ id: 'providerName', header: 'Provider Name', dataIndex: 'providerName', width: 150, sortable: true});// vandana
				columnConfig.push({ id: 'providerAddress', header: 'Provider Address', dataIndex: 'providerAddress', width: 150, sortable: true});// vandana
				columnConfig.push({ id: 'itHead', header: 'IT Head', dataIndex: 'itHead', width: 150, sortable: true});// vandana
				
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
			itSystemCiFields.push('osNameId');
			itSystemCiFields.push('clusterCode');
			itSystemCiFields.push('clusterType');
			itSystemCiFields.push('isVirtualHardwareClient');
			itSystemCiFields.push('isVirtualHardwareHost');
			itSystemCiFields.push('virtualHardwareSoftware');
			itSystemCiFields.push('lifecycleStatusId');
			itSystemCiFields.push('einsatzStatusId');
			itSystemCiFields.push('primaryFunctionId');
			itSystemCiFields.push('licenseScanningId');
			itSystemCiFields.push('upStreamAdd');
			itSystemCiFields.push('upStreamDelete');
			itSystemCiFields.push('backupType');
			itSystemCiFields.push('servicePack')
			itSystemCiFields.push('severityLevelId');
			itSystemCiFields.push('priorityLevelId');
			itSystemCiFields.push('businessEssentialId');
			
			return itSystemCiFields;
		},
		
		createBuildingCiRecord: function() {
			var buildingCiFields = this.getLocationCiFields();
			
			buildingCiFields.push('buildingCode');
			buildingCiFields.push('street');
			buildingCiFields.push('streetNumber');
			buildingCiFields.push('postalCode');
			buildingCiFields.push('location');
			buildingCiFields.push('providerName');//vandana
			buildingCiFields.push('providerAddress');//vandana
			
			return Ext.data.Record.create(buildingCiFields);
		},
		
		createBuildingAreaCiRecord: function() {
			var buildingAreaCiFields = this.getLocationCiFields();
			
			buildingAreaCiFields.push('buildingData');
			buildingAreaCiFields.push('street');
			buildingAreaCiFields.push('streetNumber');
			buildingAreaCiFields.push('location');
			buildingAreaCiFields.push('postalCode');
			buildingAreaCiFields.push('providerName');//vandana
			buildingAreaCiFields.push('providerAddress');//vandana
			
			return Ext.data.Record.create(buildingAreaCiFields);
		},
		
		createSchrankCiRecord: function() {
			var schrankCiFields = this.getLocationCiFields();
			
			schrankCiFields.push('severityLevelId');
			schrankCiFields.push('businessEssentialId');
			schrankCiFields.push('street');
			schrankCiFields.push('streetNumber');
			schrankCiFields.push('location');
			schrankCiFields.push('postalCode');
			
			return Ext.data.Record.create(schrankCiFields);
		},
		
		createTerrainCiRecord: function() {
			var terrainCiFields = this.getLocationCiFields();
			
			return Ext.data.Record.create(terrainCiFields);
		},
		
		createStandortCiRecord: function() {
			var standortCiFields = this.getLocationCiFields();
			
			standortCiFields.push('standortCode');
			standortCiFields.push('nameEn');
			
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
			roomCiFields.push('providerName');
			roomCiFields.push('providerAddress');
			roomCiFields.push('itHead');
			roomCiFields.push('itHeadHidden');
						
			return Ext.data.Record.create(roomCiFields);
		},
		
		createFunctionCiRecord: function(){
			
			var functionCiFields = this.getBaseCiFields();
			return Ext.data.Record.create(functionCiFields);
						
		},
		
		  //Added by vandana		
			createPathwayCiRecord: function(){
					
					var pathwayCiFields = this.getBaseCiFields();
					return Ext.data.Record.create(pathwayCiFields);
								
				},
		  //Ended by vandana
		
		createServiceCiRecord: function(){
			var serviceCiFields = this.getBaseCiFields();
			serviceCiFields.push('serviceAias');
			serviceCiFields.push('orderNumber');
			serviceCiFields.push('projectName');
			serviceCiFields.push('serviceDescription');
			serviceCiFields.push('organisationalScope');
			serviceCiFields.push('companyCode');
			return Ext.data.Record.create(serviceCiFields);
			
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
			   'updateQuelle', 'updateTimestamp', 'updateUser', 'deleteQuelle', 'deleteTimestamp', 'deleteUser', 'itSecSbAvailabilityId', 'itSecSbAvailabilityTxt',
			   'itSecSbIntegrityId', 'itSecSbIntegrityTxt', 'classInformationId', 'classInformationTxt', 'messageTextSecureSystem',
			   'slaId', 'serviceContractId', 'itset', 'template', 'itsecGroupId', 'refId', 'relevanceGR1435', 'relevanceGR1920',
			   
			   'ciOwnerAcl', 'ciOwnerDelegateAcl', 'relevanceGR1435Acl', 'relevanceGR1920Acl', 'gxpFlag', 'gxpFlagId', 'gxpFlagIdAcl',
			   'refIdAcl', 'itsecGroupIdAcl', 'slaIdAcl', 'serviceContractIdAcl', 'templateLinkWithCIs', {
				name: 'tableId', type: 'int'
			}, 'downStreamAdd', 'downStreamDelete'];

			
			return baseCiFields;
		},
		
		createAssetManagementGridConfig : function(selModel) {

			var columnConfig = [];
			var columns = AAM.getAssetColumns();
			var label = AIR.AirApplicationManager.getLabels();

			if (columns == undefined || columns.length == 0) {
				var itsecUserOptionListStore = AIR.AirStoreManager
						.getStoreByName('itsecUserOptionListStore');
				var index = itsecUserOptionListStore.findExact(
						'itsecUserOptionName',
						'AIR_USER_PROFILE_COLUMNS_PREFERENCE');
				if (index >= 0) {
					columns = itsecUserOptionListStore.getAt(index).get(
							'itsecUserOptionValue');
				} else {
					columns = AC.AIR_USER_PROFILE_COLUMNS_PREFERENCE;
				}

			}

			columnConfig.push(selModel);
			var columnsArr = columns.split(';');
			for (var i = 0; i < columnsArr.length; i++) {
				switch (columnsArr[i]) {
				case 'sapDescription':
					columnConfig.push({
						id : 'sapDescription',
						header : label.assetSapDescription,
						dataIndex : 'sapDescription',
						width : 150,
						sortable : true
					});
					break;
				case 'pspElement':
					columnConfig.push({
						id : 'pspElement',
						header : label.assetPSP,
						dataIndex : 'pspElement',
						width : 150,
						sortable : true
					});
					break;
				case 'costCenter':
					columnConfig.push({
						id : 'costCenter',
						header : label.assetCostCenter,
						dataIndex : 'costCenter',
						width : 150,
						sortable : true
					});
					break;
				case 'site':
					columnConfig.push({
						id : 'site',
						header : label.site,
						dataIndex : 'site',
						width : 150,
						sortable : false
					});
					break;
				case 'serialNumber':
					columnConfig.push({
						id : 'serialNumber',
						header : label.assetSerialNo,
						dataIndex : 'serialNumber',
						width : 150,
						sortable : true
					});
					break;
				case 'technicalMaster':
					columnConfig.push({
						id : 'technicalMaster',
						header : label.assetTechnicalMaster,
						dataIndex : 'technicalMaster',
						width : 150,
						sortable : true
					});
					break;
				case 'technicalNumber':
					columnConfig.push({
						id : 'technicalNumber',
						header : label.assetTechnicalNumber,
						dataIndex : 'technicalNumber',
						width : 150,
						sortable : true
					});
					break;
				case 'inventoryNumber':
					columnConfig.push({
						id : 'inventoryNumber',
						header : label.assetInventoryNumber,
						dataIndex : 'inventoryNumber',
						width : 150,
						sortable : true
					});
					break;
				case 'organizationalunit':
					columnConfig.push({
						id : 'organizationalunit',
						header : 'Org Unit',
						dataIndex : label.assetOrganisation,
						width : 150,
						sortable : true
					});
					break;
				}
			}

			return columnConfig;
		}
	}
}();
// };
Ext.reg('AIR.AirConfigFactory', AIR.AirConfigFactory);
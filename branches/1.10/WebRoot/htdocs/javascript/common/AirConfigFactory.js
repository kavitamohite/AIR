Ext.namespace('AIR');

AIR.AirConfigFactory = function() {
	return {
		createCiResultGridConfig: function(isComplete) {
		    var columnConfig = [];
		    		
			columnConfig.push({ id: 'applicationName', header: 'Name', dataIndex: 'applicationName', width: 150, sortable: true});
			columnConfig.push({ id: 'applicationAlias', header: 'Alias', dataIndex: 'applicationAlias', width: 150, sortable: true});
			columnConfig.push({ id: 'applicationCat1Txt', header: 'Type', dataIndex: 'applicationCat1Txt', width: 150, sortable: true});
			
			if(isComplete) {
				columnConfig.push({ id: 'applicationCat2Txt', header: 'Category', dataIndex: 'applicationCat2Txt', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'applicationOwner', header: 'App owner', dataIndex: 'applicationOwner', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'applicationOwnerDelegate', header: 'App owner delegate', dataIndex: 'applicationOwnerDelegate', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'applicationSteward', header: 'App steward', dataIndex: 'applicationSteward', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'responsible', header: 'Responsible', dataIndex: 'responsible', width: 150, sortable: true});//, menuDisabled: true
				columnConfig.push({ id: 'subResponsible', header: 'Sub responsible', dataIndex: 'subResponsible', width: 150, sortable: true});//, menuDisabled: true
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
		}
	};
}();
//};
Ext.reg('AIR.AirConfigFactory', AIR.AirConfigFactory);
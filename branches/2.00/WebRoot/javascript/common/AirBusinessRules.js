Ext.namespace('AIR');

AIR.AirBusinessRules = function() {
	return {
		existsItsecRegulationByCiType: function(tableId, regulation) {
			return tableId != AC.TABLE_ID_APPLICATION && (regulation.indexOf(AC.COMPANY_REGULATION_2059) > -1 || regulation.indexOf(AC.COMPANY_REGULATION_2008) > -1);
		}
	};
}();
Ext.reg('AIR.AirBusinessRules', AIR.AirBusinessRules);
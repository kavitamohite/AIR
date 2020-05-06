Ext.namespace('AIR');

AIR.AirBusinessRules = function() {
	return {
		existsItsecRegulationByCiType: function(tableId, regulation) {
		//EUGXS
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
		
			
			//wenn tabled = 2, d.h. CI ist Application, dann ist zus�tzlich zu GR1435 und GR1920 auch GR2059 und GR2008 erlaubt (> -1), bei allen anderen CI-Typen nur die beiden ersten
			//return tableId == AC.TABLE_ID_APPLICATION && (regulation.indexOf(AC.COMPANY_REGULATION_2059) > -1 || regulation.indexOf(AC.COMPANY_REGULATION_2008) > -1);
			return false == true ? true : (regulation.indexOf(AC.COMPANY_REGULATION_2059) > -1 || regulation.indexOf(AC.COMPANY_REGULATION_2008) > -1) ? false : true;
		}
	};
}();
Ext.reg('AIR.AirBusinessRules', AIR.AirBusinessRules);
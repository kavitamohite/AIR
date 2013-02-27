package com.bayerbbs.applrepos.hibernate;

import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;

public class BuildingHbn extends LokationItemHbn {
//	private static final Log log = LogFactory.getLog(BuildingHbn.class);
	
	public static Building findById(Long id) {
		return findById(Building.class, id);
	}
	public static BuildingArea findBuildingAreaById(Long id) {
		return findById(BuildingArea.class, id);
	}
	
	
	public static CiItemsResultDTO findBuildingsBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("gebaeude_id", "gebaeude_name", "alias", "Bulding", "gebaeude", AirKonstanten.TABLE_ID_BUILDING);
		return findLocationCisBy(input, metaData);
	}
	public static CiItemsResultDTO findBuildingAreasBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("area_id", "area_name", null, "Bulding Area", "building_area", AirKonstanten.TABLE_ID_BUILDING_AREA);
		return findLocationCisBy(input, metaData);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.GEBAEUDE_TYPE_LOCATION, ciId);
	}
	public static CiLokationsKette findLokationsKetteByAreaId(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.BUILDING_AREA_TYPE_LOCATION, ciId);
	}
}
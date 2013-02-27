package com.bayerbbs.applrepos.hibernate;

import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;

public class TerrainHbn extends LokationItemHbn {
//	private static final Log log = LogFactory.getLog(TerrainHbn.class);
	
	public static Terrain findById(Long id) {
		return findById(Terrain.class, id);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.TERRAIN_TYPE_LOCATION, ciId);
	}


	public static CiItemsResultDTO findTerrainsBy(ApplicationSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("terrain_id", "terrain_name", null, "Terrain", "terrain", AirKonstanten.TABLE_ID_TERRAIN);
		return findLocationCisBy(input, metaData);
	}


}
package com.bayerbbs.applrepos.hibernate;

import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;

public class SchrankHbn extends LokationItemHbn {
//	private static final Log log = LogFactory.getLog(BuildingHbn.class);
	
	public static Schrank findById(Long id) {
		return findById(Schrank.class, id);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.SCHRANK_TYPE_LOCATION, ciId);
	}


	public static CiItemsResultDTO findSchraenkeBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("schrank_id", "schrank_name", null, "Position", "schrank", AirKonstanten.TABLE_ID_POSITION);
		return findLocationCisBy(input, metaData);
	}


}
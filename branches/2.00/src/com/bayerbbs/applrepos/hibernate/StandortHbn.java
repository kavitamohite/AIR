package com.bayerbbs.applrepos.hibernate;

import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;

public class StandortHbn extends LokationItemHbn {
//	private static final Log log = LogFactory.getLog(StandortHbn.class);
	
	public static Standort findById(Long id) {
		return findById(Standort.class, id);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.STANDORT_TYPE_LOCATION, ciId);
	}


	public static CiItemsResultDTO findSitesBy(ApplicationSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("standort_id", "standort_name", null, "site", "standort", AirKonstanten.TABLE_ID_SITE);
		return findLocationCisBy(input, metaData);
	}


}
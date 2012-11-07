package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CiPersonsDTO;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;

public class CiPersonsWS {

	public CiPersonsDTO[] getPersonsList(Long ciId, Long groupTypeId) {
		return CiPersonsHbn.getArrayFromList(CiPersonsHbn.findCiPersonsBy(ciId, groupTypeId));
	}
}

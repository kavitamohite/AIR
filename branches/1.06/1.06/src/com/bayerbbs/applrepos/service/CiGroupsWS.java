package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CiGroupsDTO;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;

public class CiGroupsWS {

	public CiGroupsDTO[] getGroupsList(Long ciId, Long groupTypeId) {
		return CiGroupsHbn.getArrayFromList(CiGroupsHbn.findCiGroupsBy(ciId, groupTypeId));
	}
	
}

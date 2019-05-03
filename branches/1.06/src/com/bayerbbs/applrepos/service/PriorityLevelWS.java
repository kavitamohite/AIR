package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.PriorityLevelDTO;
import com.bayerbbs.applrepos.hibernate.PriorityLevelHbn;

public class PriorityLevelWS {

	public PriorityLevelDTO[] getPriorityLevelList() {
		return PriorityLevelHbn.getArrayFromList(PriorityLevelHbn.getListPriorityLevel());
	}
	
}

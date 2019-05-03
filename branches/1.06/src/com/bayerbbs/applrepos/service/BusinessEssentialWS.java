package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.hibernate.BusinessEssentialHbn;

public class BusinessEssentialWS {

	public BusinessEssentialDTO[] getBusinessEssentialList() {
		return BusinessEssentialHbn.getBEArrayFromList(BusinessEssentialHbn.listBusinessEssentialHbn());
	}

	
}

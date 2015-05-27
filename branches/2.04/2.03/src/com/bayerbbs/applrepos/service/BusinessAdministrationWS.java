package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.hibernate.CostcenterHbn;


public class BusinessAdministrationWS {
	public KeyValueDTO[] findCostcenterList(Long id) {
		return CostcenterHbn.getCostcenterById(id);
	}
}

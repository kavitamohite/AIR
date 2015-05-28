package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CostCenterDTO;
import com.bayerbbs.applrepos.hibernate.CostcenterHbn;


public class BusinessAdministrationWS {
	public CostCenterDTO[] findCostcenterList(Long id) {
		return CostcenterHbn.getCostcenterList(id);
	}
}

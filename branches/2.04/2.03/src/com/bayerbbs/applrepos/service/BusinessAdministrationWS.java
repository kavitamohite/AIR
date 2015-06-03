package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CostCenterDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.KeyValueEnDTO;
import com.bayerbbs.applrepos.hibernate.CostcenterHbn;
import com.bayerbbs.applrepos.hibernate.PspElementHbn;
import com.bayerbbs.applrepos.hibernate.SapAssetHbn;

public class BusinessAdministrationWS {
	public CostCenterDTO[] findCostcenterList(Long id) {
		return CostcenterHbn.getCostcenterList(id);
	}

	public KeyValueEnDTO[] findPspElementList(Long id) {
		return PspElementHbn.getPspElementById(id);
	}

	public KeyValueEnDTO[] findSapAssetList(Long id) {
		return SapAssetHbn.getSapAssetById(id);
	}

}

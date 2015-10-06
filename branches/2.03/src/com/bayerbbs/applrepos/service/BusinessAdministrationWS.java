package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CostCenterDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.KeyValueEnDTO;
import com.bayerbbs.applrepos.hibernate.CostcenterHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;
import com.bayerbbs.applrepos.hibernate.ManufacturerHbn;
import com.bayerbbs.applrepos.hibernate.PspElementHbn;
import com.bayerbbs.applrepos.hibernate.SapAssetHbn;

public class BusinessAdministrationWS {
	public CostCenterDTO[] findCostcenterList(Long id) {
		return CostcenterHbn.getCostcenterList(id);
	}

	public KeyValueEnDTO[] findPspElementList(Boolean isChecked) {
		return PspElementHbn.findPspElementList(isChecked);
	}

	public KeyValueEnDTO[] findSapAssetList(Long id) {
		return SapAssetHbn.getSapAssetById(id);
	}
	
	public KeyValueDTO[] getOsNames(){
		return ItSystemHbn.getOsNames();
	}
	
	public KeyValueEnDTO[] findSapAssetSoftwareList(Long id) {
		return SapAssetHbn.getSapAssetSoftwareList();
	}
	
	public KeyValueDTO[] findLegalEntityList(Long id) {
		return ManufacturerHbn.findLegalEntityList();
	}
	
	public KeyValueDTO[] getSystemPlatformListById(Long id) {
		return ItSystemHbn.getSystemPlatformListById(id);
	}
	
}

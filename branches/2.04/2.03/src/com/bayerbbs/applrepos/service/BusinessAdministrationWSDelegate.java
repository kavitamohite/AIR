package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CostCenterDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.KeyValueEnDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "BusinessAdministrationWSService", portName = "BusinessAdministrationWSPort")
public class BusinessAdministrationWSDelegate {

	BusinessAdministrationWS businessAdministrationWS = new BusinessAdministrationWS();

	public CostCenterDTO[] findCostcenterList(DefaultDataInput input) {
		return businessAdministrationWS.findCostcenterList(input.getId());
	}

	public KeyValueEnDTO[] findPspElementList(DefaultDataInput input) {
		return businessAdministrationWS.findPspElementList(input.getId());
	}

	public KeyValueEnDTO[] findSapAssetList(DefaultDataInput input) {
		return businessAdministrationWS.findSapAssetList(input.getId());
	}
	
	public KeyValueDTO[] getOsNames(){
		return businessAdministrationWS.getOsNames();
	}

	public KeyValueEnDTO[] findSapAssetSoftwareList(Long id) {
		return businessAdministrationWS.findSapAssetSoftwareList(id);
	}
}

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
		Boolean isChecked = input.getName() != null ? (input.getName().equalsIgnoreCase("true") ? true : false) : false;
		return businessAdministrationWS.findPspElementList(isChecked);
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
	
	public KeyValueDTO[] findLegalEntityList(Long id) {
		return businessAdministrationWS.findLegalEntityList(id);
	}
	
	public KeyValueDTO[] getSystemPlatformListById(DefaultDataInput input) {
		return businessAdministrationWS.getSystemPlatformListById(input.getId());
	}
}

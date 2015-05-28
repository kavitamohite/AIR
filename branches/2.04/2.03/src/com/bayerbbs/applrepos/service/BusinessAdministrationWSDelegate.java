package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CostCenterDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "BusinessAdministrationWSService", portName = "BusinessAdministrationWSPort")

public class BusinessAdministrationWSDelegate {
	
	BusinessAdministrationWS businessAdministrationWSWS=new BusinessAdministrationWS();
	
	public CostCenterDTO[] findCostcenterList(
			DefaultDataInput input) {
		return businessAdministrationWSWS.findCostcenterList(input.getId());
	}


}

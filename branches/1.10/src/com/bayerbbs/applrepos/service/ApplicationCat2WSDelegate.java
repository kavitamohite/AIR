package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ApplicationCat2DTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ApplicationCat2WSService", portName = "ApplicationCat2WSPort")
public class ApplicationCat2WSDelegate {

	com.bayerbbs.applrepos.service.ApplicationCat2WS applicationCat2WS = new com.bayerbbs.applrepos.service.ApplicationCat2WS();

	public ApplicationCat2DTO[] getApplicationCat2List() {
		return applicationCat2WS.getApplicationCat2List();
	}

	public ApplicationCat2DTO[] findApplicationCat2ByApplicationKat1Id(
			ApplicationCat2ParameterInput input) {
		return applicationCat2WS.findApplicationCat2ByApplicationKat1Id(input);
	}

}
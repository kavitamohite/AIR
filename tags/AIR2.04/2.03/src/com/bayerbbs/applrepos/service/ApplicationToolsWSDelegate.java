package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ClassDataDTO;
import com.bayerbbs.applrepos.dto.ServiceContractDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ApplicationToolsWSService", portName = "ApplicationToolsWSPort")
public class ApplicationToolsWSDelegate {

	com.bayerbbs.applrepos.service.ApplicationToolsWS applicationToolsWS = new com.bayerbbs.applrepos.service.ApplicationToolsWS();

	public ServiceContractDTO[] getServiceContractList() {//ApplicationEditParameterInput editInput
		return applicationToolsWS.getServiceContractList();//editInput
	}

	public ClassDataDTO[] getClassDataList(
			ApplicationEditParameterInput editInput) {
		return applicationToolsWS.getClassDataList(editInput);
	}

}
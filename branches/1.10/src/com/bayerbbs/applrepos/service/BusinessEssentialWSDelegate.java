package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.hibernate.BusinessEssentialHbn;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "BusinessEssentialWSService", portName = "BusinessEssentialWSPort")
public class BusinessEssentialWSDelegate {

	com.bayerbbs.applrepos.service.BusinessEssentialWS businessEssentialWS = new com.bayerbbs.applrepos.service.BusinessEssentialWS();

	public BusinessEssentialDTO[] getBusinessEssentialList() {
		return businessEssentialWS.getBusinessEssentialList();
	}

}
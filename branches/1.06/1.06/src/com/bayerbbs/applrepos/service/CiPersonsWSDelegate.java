package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CiPersonsDTO;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "CiPersonsWSService", portName = "CiPersonsWSPort")
public class CiPersonsWSDelegate {

	com.bayerbbs.applrepos.service.CiPersonsWS ciPersonsWS = new com.bayerbbs.applrepos.service.CiPersonsWS();

	public CiPersonsDTO[] getPersonsList(Long ciId, Long groupTypeId) {
		return ciPersonsWS.getPersonsList(ciId, groupTypeId);
	}

}
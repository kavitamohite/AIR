package com.bayerbbs.applrepos.service;

import java.util.List;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitesHbn;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "CiEntityWSService", portName = "CiEntityWSPort")
public class CiEntityWSDelegate {

	com.bayerbbs.applrepos.service.CiEntityWS ciEntityWS = new com.bayerbbs.applrepos.service.CiEntityWS();

	public CiEntityParameterOutput findCiEntities(CiEntityParameterInput input) {
		return ciEntityWS.findCiEntities(input);
	}

}
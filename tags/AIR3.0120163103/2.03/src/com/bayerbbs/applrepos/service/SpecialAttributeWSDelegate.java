package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.SpecialAttributeViewDataDTO;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "SpecialAttributeWSService", portName = "SpecialAttributeWSPort")
public class SpecialAttributeWSDelegate {

	SpecialAttributeWS specialAttributeWS = new SpecialAttributeWS();

	public SpecialAttributeViewDataDTO[] getSpecialAttributes(SpecialAttributeParameterInput input){
		return specialAttributeWS.getSpecialAttributes(input);
	}
	
	public Boolean saveSpecialAttributes(SpecialAttributeParameterInput input){
		return specialAttributeWS.saveSpecialAttribute(input);
	}
}
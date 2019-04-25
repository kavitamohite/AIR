package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.domain.BusinessApplicationEditParameterInput;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "BusinessApplicationWSService", portName = "BusinessApplicationWSPort")

public class BusinessApplicationWSDelegate {
	//com.bayerbbs.applrepos.service.BusinessApplicationWS businessApplicationWS = new com.bayerbbs.applrepos.service.BusinessApplicationWS();
	BusinessApplicationWS businessApplicationWS = new BusinessApplicationWS();
	
	/*public CiEntityEditParameterOutput createBusinessApplication(BusinessApplicationEditParameterInput input) {
		return businessApplicationWS.createBusinessApplication(input);
	};*/
	
	public CiEntityEditParameterOutput saveBusinessApplication(BusinessApplicationEditParameterInput input){
		return businessApplicationWS.saveBusinessApplication(input);
	}
		
}



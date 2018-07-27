/**
 * 
 */
package com.bayerbbs.applrepos.service;

/**
 * @author eokeg
 *
 */
@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "WaysWSService", portName = "WaysWSPort")
public class WaysWSDelegate {

	WaysWS pathwayWS = new  WaysWS();
	
	public CiEntityEditParameterOutput createWays(BaseEditParameterInput editInput) {
		return pathwayWS.createWays(editInput);
	}
	
	public CiEntityEditParameterOutput saveWays(BaseEditParameterInput input){
		return pathwayWS.saveWays(input);
	}
}

/**
 * 
 */
package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.domain.ServiceEditParameterInput;

/**
 * @author equuw
 *
 */

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ServiceWSService", portName = "ServiceWSPort")
public class ServiceWSDelegate {
	ServiceWS serviceWS = new ServiceWS();
	
	public CiEntityEditParameterOutput createService(ServiceEditParameterInput input){
            return serviceWS.createService(input);
	}
	
	public CiEntityEditParameterOutput saveService(ServiceEditParameterInput input){
		   return serviceWS.saveService(input);
	}

}

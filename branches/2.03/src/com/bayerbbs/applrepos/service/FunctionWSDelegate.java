/**
 * 
 */
package com.bayerbbs.applrepos.service;

/**
 * @author equuw
 *
 */
@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "FunctionWSService", portName = "FunctionWSPort")
public class FunctionWSDelegate {

	FunctionWS functionWS = new  FunctionWS();
	
	public CiEntityEditParameterOutput createFunction(BaseEditParameterInput editInput) {
		return functionWS.createFunction(editInput);
	}	
}

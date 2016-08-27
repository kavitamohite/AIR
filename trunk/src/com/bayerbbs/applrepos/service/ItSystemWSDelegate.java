package com.bayerbbs.applrepos.service;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ItSystemWSService", portName = "ItSystemWSPort")
public class ItSystemWSDelegate {
	ItSystemWS itSystemWS = new ItSystemWS();
	
	public CiEntityEditParameterOutput createItSystem(ItSystemEditParameterInput editInput) {
		return itSystemWS.createItSystem(editInput);
	}

	public CiEntityEditParameterOutput createItSystemByCopy(ItSystemEditParameterInput editInput) {
//		return itSystemWS.createItSystemByCopy(editInput);
		return null;
	}
	
	public CiEntityEditParameterOutput deleteItSystem(ItSystemEditParameterInput editInput) {
		return itSystemWS.deleteItSystem(editInput);
	}

	public CiEntityEditParameterOutput saveItSystem(ItSystemEditParameterInput editInput) {
		return itSystemWS.saveItSystem(editInput);
	}
	
	public CiEntityEditParameterOutput getNextDCNumber() {
		return itSystemWS.getNextDCNumber();
	}
	
	public ItSytemNetworkInformationOutPut getDNSDetailQIP(CiDetailParameterInput input){
		return itSystemWS.getDNSDetailQIP(input);
		
	}
	public ItSytemNetworkInformationOutPut getNetworkTcpIp(CiDetailParameterInput input){
		return itSystemWS.getNetworkTcpIp(input);
		
	}

}
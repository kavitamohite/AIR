package com.bayerbbs.applrepos.service;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "HistoryComplianceWSService", portName = "HistoryComplianceWSPort")
public class HistoryComplianceWSDelegate {

	com.bayerbbs.applrepos.service.HistoryComplianceWS historyComplianceWS = new com.bayerbbs.applrepos.service.HistoryComplianceWS();
	
	public HistoryComplianceParameterOutput findHistoryList(
			HistoryComplianceParameterInput input) {
		return historyComplianceWS.findHistoryList(input);
	}
}

package com.bayerbbs.applrepos.service;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "LDAPAuthWSService", portName = "LDAPAuthWSPort")
public class LDAPAuthWSDelegate {

	com.bayerbbs.applrepos.service.LDAPAuthWS lDAPAuthWS = new com.bayerbbs.applrepos.service.LDAPAuthWS();

	public LDAPAuthParameterOutput login(LDAPAuthParameterInput paramInput) {
		return lDAPAuthWS.login(paramInput);
	}

	public LDAPAuthParameterOutput isTokenValid(
			LDAPAuthParameterInput paramInput) {
		return lDAPAuthWS.isTokenValid(paramInput);
	}

	public LDAPAuthParameterOutput isStillLoggedIn(
			LDAPAuthParameterInput paramInput) {
		return lDAPAuthWS.isStillLoggedIn(paramInput);
	}

	public boolean isLoginValid(String username, String token) {
		return LDAPAuthWS.isLoginValid(username, token);
	}

	public void logout(String username, String token) {
		lDAPAuthWS.logout(username, token);
	}

}
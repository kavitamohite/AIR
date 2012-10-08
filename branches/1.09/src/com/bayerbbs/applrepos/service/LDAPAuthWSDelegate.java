package com.bayerbbs.applrepos.service;

import java.util.List;
import java.util.Random;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import com.bayerbbs.applrepos.common.LDAPAuthCeye;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.AppRepAuthData;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.ItSecUserHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;

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
		return lDAPAuthWS.isLoginValid(username, token);
	}

	public void logout(String username, String token) {
		lDAPAuthWS.logout(username, token);
	}

}
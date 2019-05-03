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

public class LDAPAuthWS {

	private final static String CACHENAME = "com.bayerbbs.applrepos.LogonData";

	/**
	 * login checks the username / password combination by accessing the
	 * LDAP-Server
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public LDAPAuthParameterOutput login(LDAPAuthParameterInput paramInput) {
		
		String cwid = paramInput.getCwid();
		String password = paramInput.getPassword();
		
		LDAPAuthParameterOutput output = new LDAPAuthParameterOutput();
		
		List<RolePersonDTO> listAIRRolesDTO = ApplReposHbn.findRolePerson(cwid);
		
		if (listAIRRolesDTO.isEmpty()) {
			output.setResult(ApplreposConstants.RESULT_ERROR);
			output.setMessages(new String[] { "AIR roles are needed to access the application" });
		}
		else {
			LDAPAuthCeye ldapAuthCeye = new LDAPAuthCeye();
			int rcCode = ldapAuthCeye.login(cwid, password);
			output.setRcCode(new Long(rcCode));
	
			String key = null;
			if (1 == rcCode) {
				// login successful
				output.setResult(ApplreposConstants.RESULT_OK);
				output.setMessages(new String[] { "login successful" });
				Cache myCache = (Cache) CacheManager.getInstance().getCache(
						CACHENAME);
				if (null != myCache) {
	
					Random random = new Random();
	
					// genereate token
					StringBuffer sb = new StringBuffer();
					sb.append(cwid);
					sb.append(":");
					sb.append(random.nextLong());
					sb.append(random.nextFloat());
					sb.append(random.nextLong());
					sb.append(random.nextFloat());
	
					key = cwid;
					String token = sb.toString();
					
					AppRepAuthData authData = new AppRepAuthData();
					authData.setCwid(cwid);
					authData.setToken(token);
	
					// find Person for Personname
					PersonsWS personWS = new PersonsWS();
					
					// PersonsDTO[] aPersonsDTO = personWS.findPersonsByCWID(cwid);
					PersonsDTO[] aPersonsDTO =  PersonsHbn.getArrayFromList(PersonsHbn.findPersonByCWID(cwid));
					
					
					
					if (null != aPersonsDTO && 1 == aPersonsDTO.length) {
						String username = aPersonsDTO[0].getFirstname() + " " + aPersonsDTO[0].getLastname();
						authData.setUsername(username);
						
						String lastLogon = ItSecUserHbn.findItSecUserLastLogon(cwid);
						if (null == lastLogon) {
							lastLogon = "";
						}
						output.setLastLogon(lastLogon);
						authData.setLastlogon(lastLogon);
						ItSecUserHbn.updateItSecUserLastLogon(cwid);
					}
					
					Element element = new Element(key, authData);
					myCache.put(element);
					output.setToken(authData.getToken());
					output.setCwid(authData.getCwid());
					output.setUsername(authData.getUsername());
				}
	
			}
			else {
				output.setResult(ApplreposConstants.RESULT_ERROR);
				output.setMessages(new String[] { "Login failed. Please check username and password!" });
			}
		}

		return output;
	}

	/**
	 * isTokenValid checks if the user token is still valid (and refreshes the valid count timer)
	 * 
	 * @return
	 */
	public LDAPAuthParameterOutput isTokenValid(LDAPAuthParameterInput paramInput) {
		return isTokenValidInternal(paramInput, true);
	}

	/**
	 * checks if the user is still logged in (without refreshing the login-data)
	 * @param paramInput
	 * @return
	 */
	public LDAPAuthParameterOutput isStillLoggedIn(LDAPAuthParameterInput paramInput) {
		return isTokenValidInternal(paramInput, false);
	}

	
	private static LDAPAuthParameterOutput isTokenValidInternal(LDAPAuthParameterInput paramInput, boolean withRefresh) {
		LDAPAuthParameterOutput output = new LDAPAuthParameterOutput();
		output.setResult(ApplreposConstants.RESULT_ERROR);
		int rcCode = 0;
		
		String username = paramInput.getCwid();
		String token = paramInput.getToken();

		if (null != token) {
		
			Cache myCache = (Cache) CacheManager.getInstance().getCache(CACHENAME);
			if (null != myCache) {
				Element element = myCache.get(username);
				if (null != element) {
					
					AppRepAuthData authData = (AppRepAuthData) element.getObjectValue();
					
					
					
					String cachedToken = authData.getToken();
	
					if (token.equals(cachedToken)) {
						// isTokenValid = true;
						rcCode = 1;
						output.setResult(ApplreposConstants.RESULT_OK);
						output.setCwid(authData.getCwid());
						output.setToken(authData.getToken());
						output.setUsername(authData.getUsername());
						output.setLastLogon(authData.getLastlogon());
						
						if (withRefresh) {
							// replace in Cache
							Element tempElement = new Element(username, authData);
							myCache.put(tempElement);
						}
					}
				}
			}
		
		}
		
		output.setRcCode(new Long(rcCode));
		return output;

	}
	
	
	public static boolean isLoginValid(String username, String token) {
		boolean isLoginValid = false;
		
		if (null != token) {
			
			Cache myCache = (Cache) CacheManager.getInstance().getCache(CACHENAME);
			if (null != myCache) {
				Element element = myCache.get(username);
				if (null != element) {
					
					AppRepAuthData authData = (AppRepAuthData) element.getObjectValue();
					
					String cachedToken = authData.getToken();
	
					if (token.equals(cachedToken)) {
						isLoginValid = true;
						
						// replace in Cache to prevent timeouts
						Element tempElement = new Element(username, authData);
						myCache.put(tempElement);
					}
				}
			}
		
		}
		return isLoginValid;
	}
	
	/**
	 * logout removes the valid token information
	 * 
	 * @param username
	 */
	public void logout(String cwid) {
		Cache myCache = (Cache) CacheManager.getInstance().getCache(CACHENAME);
		if (null != myCache) {
			myCache.remove(cwid);
		}

		if (null != cwid && !"".equals(cwid)) {
			ItSecUserHbn.updateItSecUserLastLogoff(cwid);
		}
	}
}

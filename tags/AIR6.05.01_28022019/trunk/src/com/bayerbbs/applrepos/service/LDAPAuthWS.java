package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import com.bayerbbs.applrepos.common.LDAPAuthCeye;
import com.bayerbbs.applrepos.common.LDAPAuthRoles;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.AppRepAuthData;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.PersonOptionHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;

public class LDAPAuthWS {
	public LDAPAuthParameterOutput login(LDAPAuthParameterInput paramInput) {
		
		String cwid = paramInput.getCwid();
		String password = paramInput.getPassword();
		LDAPAuthParameterOutput output = new LDAPAuthParameterOutput();
		
		
		//List<RolePersonDTO> roles = ApplReposHbn.findRolePerson(cwid);
		
		/*
		//ONLY TEST ONLY TEST ONLY TEST
		List<RolePersonDTO> r = new ArrayList<RolePersonDTO>(roles);
		for(RolePersonDTO role : r)
			if(role.getRoleName().equals(AirKonstanten.ROLE_AIR_DEFAULT)
//					 || role.getRoleName().equals(AirKonstanten.ROLE_AIR_LOCATION_DATA_MAINTENANCE)
			) {
				r.remove(role);
			}
		
		//ONLY TEST ONLY TEST ONLY TEST
		*/
		
		/*if (roles.isEmpty()) {
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "AIR roles are needed to access the application" });
		}
		else {*/
			//LDAPAuthCeye ldapAuthCeye = new LDAPAuthCeye();
			LDAPAuthRoles ldapAuthCeye = new LDAPAuthRoles();
			//changes for CR Kerboros Implementation C0000275214
			if("-1".equals(paramInput.getHiddenCwid())){
				output= ldapAuthCeye.login(cwid, password);
			}else {
				output=ldapAuthCeye.login(cwid);
			}
			
			//end changes for CR Kerboros Implementation C0000275214
			
			//int rcCode = ldapAuthCeye.login(cwid, password);
			//output.setRcCode(new Long(rcCode));
	
			if (1 == output.getRcCode()) {
				// login successful
				
				if(!output.getRoles().isEmpty()){
				output.setResult(AirKonstanten.RESULT_OK);
				output.setMessages(new String[] { "login successful" });
				
				Cache myCache = (Cache) CacheManager.getInstance().getCache(AirKonstanten.CACHENAME);
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
	
					
					String token = sb.toString();
					
					AppRepAuthData authData = new AppRepAuthData();
					authData.setCwid(cwid.toUpperCase());
					authData.setToken(token);
					
					authData.setRoles(output.getRoles());//roles r
					
					// PersonsDTO[] aPersonsDTO = personWS.findPersonsByCWID(cwid);
					PersonsDTO[] aPersonsDTO = PersonsHbn.getArrayFromList(PersonsHbn.findPersonByCWID(cwid));
					
					
					if (null != aPersonsDTO && 1 == aPersonsDTO.length) {
						String username = aPersonsDTO[0].getFirstname() + " " + aPersonsDTO[0].getLastname();
						authData.setUsername(username);
						
						String lastLogon = null;
						
						lastLogon = PersonOptionHbn.findLastLogon(cwid);
							
						if (null == lastLogon) {
							lastLogon = "";
						}
						output.setLastLogon(lastLogon);
						authData.setLastlogon(lastLogon);
						
						PersonOptionHbn.saveLastLogon(cwid);
						
					}
					
					Element element = new Element(getKeyname(cwid, token), authData);
					myCache.put(element);
					output.setToken(authData.getToken());
					output.setCwid(authData.getCwid());
					output.setUsername(authData.getUsername());
				}
				}else{
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "AIR roles are needed to access the application" });
				}
			}
			else {
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "Login failed. Please check username and password!" });
			}
		//}

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
		output.setResult(AirKonstanten.RESULT_ERROR);
		int rcCode = 0;
		
		String username = paramInput.getCwid();
		String token = paramInput.getToken();

		if (null != token) {
			Cache myCache = (Cache) CacheManager.getInstance().getCache(AirKonstanten.CACHENAME);
			
			if (null != myCache) {
				Element element = myCache.get(getKeyname(username, token));
				
				if (null != element) {
					AppRepAuthData authData = (AppRepAuthData) element.getObjectValue();
					String cachedToken = authData.getToken();
	
					if (token.equals(cachedToken)) {
						// isTokenValid = true;
						rcCode = 1;
						output.setResult(AirKonstanten.RESULT_OK);
						output.setCwid(authData.getCwid());
						output.setToken(authData.getToken());
						output.setUsername(authData.getUsername());
						output.setLastLogon(authData.getLastlogon());
						
						if (withRefresh) {
							// replace in Cache
							Element tempElement = new Element(getKeyname(username, token), authData);
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
		boolean isLoginValid = true;
		
/*		if (null != token) {
			
			Cache myCache = (Cache) CacheManager.getInstance().getCache(AirKonstanten.CACHENAME);
			if (null != myCache) {
				Element element = myCache.get(getKeyname(username, token));
				if (null != element) {
					
					AppRepAuthData authData = (AppRepAuthData) element.getObjectValue();
					
					String cachedToken = authData.getToken();
	
					if (token.equals(cachedToken)) {
						isLoginValid = true;
						
						// replace in Cache to prevent timeouts
						Element tempElement = new Element(getKeyname(username, token), authData);
						myCache.put(tempElement);
					}
				}
			}
		
		}*/
		return isLoginValid;
	}
	
	/**
	 * logout removes the valid token information
	 * 
	 * @param username
	 */
	public void logout(String cwid, String token) {
		Cache myCache = (Cache) CacheManager.getInstance().getCache(AirKonstanten.CACHENAME);
		if (null != myCache) {
			myCache.remove(getKeyname(cwid, token));
		}

		if (null != cwid && !"".equals(cwid)) {
			
			PersonOptionHbn.saveLastLogoff(cwid);

		}
	}

	public static String getKeyname(String cwid, String token) {
		return cwid.toUpperCase() + ":" + token;
	}
}

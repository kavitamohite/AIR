package com.bayerbbs.applrepos.common;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Set;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NameClassPair;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.hibernate.cfg.AnnotationConfiguration;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.service.LDAPAuthParameterOutput;
import com.sun.tools.ws.processor.model.Request;

/**
 * LDAPAuthCeye - builds a wrapper for C-Eye for authorisation against LDAP
 * 
 * @author evafl
 * 
 */
public class LDAPAuthRoles {

	private static final String LDAP_FACTORY = "com.sun.jndi.ldap.LdapCtxFactory";

	private static final String MASCHINE_USER = "CN=MXSNT,OU=Non-PersonalMailboxAccounts,OU=DE,OU=Resources,OU=_DomainOperations,DC=bayer,DC=cnb";

	private static final String MASCHINE_USER_PWD = "isbb2007";

	private static final String MX_SEARCH_CONTEXT = "";

	// private static final String ldapURL = "ldaps://ldaps.bayer-ag.com:636/";
	//ldaps://DE.bayer.cnb:3269/
	// // IBM LDAP Service
	private static final String ldapURL = "ldaps://bayer.cnb:3269/"; // Microsoft
	//private static final String ldapURL = "ldaps://DE.bayer.cnb:3269/"; // Microsoft																	// AD
																		// (über
																		// LDAP)//389

	private Hashtable<String, String> env = new Hashtable<String, String>();
	

	/** hashtable for ldap handling */
	private DirContext ctx = null;

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		LDAPAuthRoles auth = new LDAPAuthRoles();

		int rccode = -1;

		if (2 != args.length) {
			System.out.println("LDAP Wrapper");
			System.out.println("LDAPAuthCeye <cwid> <password>");
			rccode = -99;
		} else {

			String username = args[0];
			String password = args[1];

			auth.login(username, password);

			System.out.println("result code: " + rccode);
		}

		System.exit(rccode);
	}

	/**
	 * Finds the userDN in LDAP
	 * 
	 * @param cwid
	 * @return userDN as String
	 * @throws NamingException
	 */
	private String findDnByUID(String cwid) throws NamingException {
		String dn = null;

		try {

			env.put(Context.INITIAL_CONTEXT_FACTORY, LDAP_FACTORY);
			env.put(Context.PROVIDER_URL, ldapURL);

			env.put(Context.SECURITY_PRINCIPAL, MASCHINE_USER);
			env.put(Context.SECURITY_CREDENTIALS, MASCHINE_USER_PWD);
			env.put(Context.SECURITY_PROTOCOL, "ssl");

			env.put(Context.SECURITY_AUTHENTICATION, "simple");

			// Create the initial context
			ctx = new InitialDirContext(env);

			SearchControls controls = new SearchControls(
					SearchControls.SUBTREE_SCOPE, 0, 0, null, false, false);

			String searchString = "(cn=" + cwid + ")";

			NamingEnumeration<SearchResult> answer = ctx.search("",
					searchString, controls);
			if (answer.hasMore()) {
				SearchResult sr = answer.next();
				dn = sr.getName();

			}

		} finally {
			try {
				if (ctx != null)
					ctx.close();
			} catch (Exception e) {
				System.out.println("Unable to close connection!" + e);
			}
		}

		return dn;
	}

	/**
	 * checks the username and password against LDAP
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public LDAPAuthParameterOutput login(String username, String password) {
		Hashtable<String, String> authEnv = new Hashtable<String, String>(11);
		LDAPAuthParameterOutput authDataParameter = new LDAPAuthParameterOutput();
		ArrayList<RolePersonDTO> roles = new ArrayList<RolePersonDTO>();

		if (password == null || "".equals(password) || username == null
				|| "".equals(username)) {
			authDataParameter.setRcCode(-9L);
			return authDataParameter;
		}
		// user search
		String userDN = null;
		try {
			userDN = findDnByUID(username);
		} catch (Exception e1) {
			System.out.println("Unknown error during username search: "
					+ e1.getMessage());
			System.out.println(e1.getCause().getMessage());
			System.out.println(e1.getCause().getStackTrace());
		}

		if (null == userDN) {
			System.out.println("Authentication cwid unknown");
			authDataParameter.setRcCode(-9L);
			return authDataParameter;
		} else {

			authEnv.put(Context.INITIAL_CONTEXT_FACTORY,
					"com.sun.jndi.ldap.LdapCtxFactory");
			authEnv.put(Context.PROVIDER_URL, ldapURL);

			authEnv.put(Context.SECURITY_PRINCIPAL, "uid=" + MASCHINE_USER
					+ "," + MX_SEARCH_CONTEXT);
			authEnv.put(Context.SECURITY_CREDENTIALS, MASCHINE_USER_PWD);

			authEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
			authEnv.put(Context.SECURITY_PRINCIPAL, userDN);
			authEnv.put(Context.SECURITY_CREDENTIALS, password);

			try {
				DirContext authContext = new InitialDirContext(authEnv);

				String[] attrIDs = { "memberOf" };

				SearchControls controls = new SearchControls(
						SearchControls.SUBTREE_SCOPE, 0, 0, null, false, false);

				String searchString = "(cn=" + username + ")";

				controls.setReturningAttributes(attrIDs);

				NamingEnumeration<SearchResult> answer = authContext.search("",
						searchString, controls);

				if (answer.hasMore()) {
					SearchResult sr = answer.next();
					Attribute test = sr.getAttributes().get("memberOf");
					Collection<String> values = getAllAttributeValues(test);
					roles=hasRole(values, username);

				}

				if (null != authContext) {
					System.out.println("Authentication ok");
					authDataParameter.setRoles(roles);

					authDataParameter.setRcCode(1L);
				}
			} catch (AuthenticationException authEx) {
				System.out.println("Authentication failed");
				authDataParameter.setRcCode(-9L);

			} catch (NamingException namEx) {
				System.out
						.println("ldap error - check connection, parameters...");
				namEx.printStackTrace();
				authDataParameter.setRcCode(-2L);

			}
		}

		return authDataParameter;
	}

	public ArrayList<RolePersonDTO> hasRole(Collection<String> values, String username) {
		
		ArrayList<RolePersonDTO> roles = new ArrayList<RolePersonDTO>();		
		for (String role : values) {
			System.out.println("hasRole method==" + role);
			role = role.toUpperCase();
			int beginIndex=-1;
			if(role.indexOf("AIR")!=-1){
				
				beginIndex=role.indexOf("AIR");
			} 
			/*if(role.indexOf("ISM")!=-1){
				beginIndex=role.indexOf("ISM");
			}*/
			//beginIndex = role.indexOf("AIR");
			if (beginIndex != -1) {
				String airUserRole = role.substring(beginIndex - 2,
						role.indexOf(",OU="));
				if ("P".equalsIgnoreCase(getEnvironment())) {
					if (!airUserRole.startsWith("Q_")&& !airUserRole.startsWith("D_")){
						
						RolePersonDTO dto = new RolePersonDTO();
						dto.setCwid(username.toUpperCase());
						dto.setRoleName(userRole(airUserRole.substring(2)));
						if(dto.getRoleName()!=null){
						roles.add(dto);
						}
					
				}
				} else {
					if (airUserRole.startsWith(getEnvironment() + "_")) {
						RolePersonDTO dto = new RolePersonDTO();
						dto.setCwid(username.toUpperCase());
						dto.setRoleName(userRole(airUserRole.substring(2)));
						roles.add(dto);
					}
				}

			}

		}
		return roles;
	}

	public String getEnvironment() {
		String env = "";
		InetAddress iAddress;
		String hostName = "";
		try {
			iAddress = InetAddress.getLocalHost();
			hostName = iAddress.getHostName();
			} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		System.out.println("Running on Host: " + hostName);
		if (hostName.equals(AirKonstanten.SERVERNAME_PROD)) {
			env = "P";
		}
		if (hostName.equals(AirKonstanten.SERVERNAME_QA)) {
			env = "Q";
		}
		if (hostName.equals(AirKonstanten.SERVERNAME_DEV)) {
			env = "D";
		}
		return env;
	}

	public Collection<String> getAllAttributeValues(Attribute attr)
			throws NamingException {
		Set<String> values = new HashSet<String>();
		for (NamingEnumeration e = attr.getAll(); e.hasMore();) {
			String value = (String) e.next();
			values.add(value);
		}
		return values;
	}

	public String userRole(String airRole) {
		
		String rtRole = null;
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_ADMINISTRATOR)) {
			rtRole = AirKonstanten.ROLE_AIR_ADMINISTRATOR;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_APPLICATION_LAYER)) {
			rtRole = AirKonstanten.ROLE_AIR_APPLICATION_LAYER;
		}
		if (airRole
				.equalsIgnoreCase(AirKonstanten.ROLE_AIR_APPLICATION_MANAGER)) {
			rtRole = AirKonstanten.ROLE_AIR_APPLICATION_MANAGER;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_BAR_EDITOR)) {
			rtRole = AirKonstanten.ROLE_AIR_BAR_EDITOR;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_COMPLIANCE_EDITOR)) {
			rtRole = AirKonstanten.ROLE_AIR_COMPLIANCE_EDITOR;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_DEFAULT)) {
			rtRole = AirKonstanten.ROLE_AIR_DEFAULT;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_DEVELOPER)) {
			rtRole = AirKonstanten.ROLE_AIR_DEVELOPER;
		}
		if (airRole
				.equalsIgnoreCase(AirKonstanten.ROLE_AIR_INFRASTRUCTURE_LAYER)) {
			rtRole = AirKonstanten.ROLE_AIR_INFRASTRUCTURE_LAYER;
		}
		if (airRole
				.equalsIgnoreCase(AirKonstanten.ROLE_AIR_INFRASTRUCTURE_MANAGER)) {
			rtRole = AirKonstanten.ROLE_AIR_INFRASTRUCTURE_MANAGER;
		}
		if (airRole
				.equalsIgnoreCase(AirKonstanten.ROLE_AIR_LOCATION_DATA_MAINTENANCE)) {
			rtRole = AirKonstanten.ROLE_AIR_LOCATION_DATA_MAINTENANCE;
		}
		if (airRole
				.equalsIgnoreCase(AirKonstanten.ROLE_AIR_SPECIAL_ATTRIBUTE_EDITOR)) {
			rtRole = AirKonstanten.ROLE_AIR_SPECIAL_ATTRIBUTE_EDITOR;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_ASSET_EDITOR)) {
			rtRole = AirKonstanten.ROLE_AIR_ASSET_EDITOR;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_AIR_ASSET_MANAGER)) {
			rtRole = AirKonstanten.ROLE_AIR_ASSET_MANAGER;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_BUSINESS_ESSENTIAL_EDITOR)) {
			rtRole = AirKonstanten.ROLE_BUSINESS_ESSENTIAL_EDITOR;
		}
		
		//ISM Role addition
		
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_ISM_EDITOR)) {
			rtRole = AirKonstanten.ROLE_ISM_EDITOR;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_ISM_MANAGER)) {
			rtRole = AirKonstanten.ROLE_ISM_MANAGER;
		}
		if (airRole.equalsIgnoreCase(AirKonstanten.ROLE_ISM_READER)) {
			rtRole = AirKonstanten.ROLE_ISM_READER;
		}

		return rtRole;
	}
}

package com.bayerbbs.applrepos.common;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Set;
import java.net.InetAddress;




import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;



public class LDAPAuthCeye {
	
	private static final String LDAP_FACTORY = "com.sun.jndi.ldap.LdapCtxFactory";
	
	private static final String ldapURL = "ldaps://DE.bayer.cnb:3269/";	// IBM LDAP Service
	private static final String MASCHINE_USER = "CN=MXSNT,OU=Non-PersonalMailboxAccounts,OU=Resources,OU=_DomainOperations,DC=DE,DC=bayer,DC=cnb";
	private static final String MASCHINE_USER_PWD = "isbb2007";
	public static final String ROLE_CEYE_USER ="C-Eye User";
	public static final String ROLE_CEYE_ADMIN_USER = "C-Eye-Admin User";
	public static final String ROLE_CEYE_ADMIN_READER = "C-Eye-Admin Reader";
	public static final String ROLE_CEYE_ADMIN_STAMMDATEN_PFLEGE = "C-Eye-Admin Stammdaten-Pflege";
	public static final String ROLE_CEYE_ADMIN_STAMMDATEN_LESER = "C-Eye-Admin Stammdaten-Leser";
	public static final String ROLE_REPORTING_READER = "Reporting Reader";
	public static final String ROLE_CEYE_ADMIN_USER_MANAGEMENT = "C-Eye-Admin User-Management";
	public final static String SERVERNAME_PROD = "BY0JZA.de.bayer.cnb";
	public final static String SERVERNAME_QA = "BY0GMV.de.bayer.cnb";
	public final static String SERVERNAME_DEV = "BY0N7A.DE.bayer.cnb";
	
	private static final String MX_SEARCH_CONTEXT = "";
	private Hashtable<String, String> env = new Hashtable<String, String>();
	private DirContext ctx = null;
	/**
	 * @param args
	 */
	
	public class RolePersonDTO {

		
		private String cwid;
		private String roleName;
	
		
		public String getCwid() {
			return cwid;
		}
		public void setCwid(String cwid) {
			this.cwid = cwid;
		}
		public String getRoleName() {
			return roleName;
		}
		public void setRoleName(String roleName) {
			this.roleName = roleName;
		}
		
	}
	
	
	public class LDAPAuthParameterOutput {
		
		private Long rcCode;
		private String token;
		private String cwid;

		private String username;
		private String lastLogon;
		
		private String result;
		private String messages[];
		
		private ArrayList<RolePersonDTO> roles;
		
		
		public Long getRcCode() {
			return rcCode;
		}
		public void setRcCode(Long rcCode) {
			this.rcCode = rcCode;
		}
		public String getToken() {
			return token;
		}
		public void setToken(String token) {
			this.token = token;
		}
		
		public String getResult() {
			return result;
		}
		public void setResult(String result) {
			this.result = result;
		}
		public String[] getMessages() {
			return messages;
		}
		public void setMessages(String[] messages) {
			this.messages = messages;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getCwid() {
			return cwid;
		}
		public void setCwid(String cwid) {
			this.cwid = cwid;
		}
		public String getLastLogon() {
			return lastLogon;
		}
		public void setLastLogon(String lastLogon) {
			this.lastLogon = lastLogon;
		}
		public ArrayList<RolePersonDTO> getRoles() {
			return roles;
		}
		public void setRoles(ArrayList<RolePersonDTO> roles) {
			this.roles = roles;
		}
	}

	
	public static void main(String[] args) {

		LDAPAuthCeye auth = new LDAPAuthCeye();

		int rccode = -1;

		if (2 != args.length) {
			System.out.println("LDAP Wrapper");
			System.out.println("LDAPAuthCeye <cwid> <password>");
			rccode = -99;
		} else {

			String username = args[0];
			String password = args[1];

			rccode =auth.login(username, password);
			

			System.out.println("result code: " + rccode);
		}

		System.exit(rccode);
	}

	

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
	public int login(String username, String password) {
		Hashtable<String, String> authEnv = new Hashtable<String, String>(11);
		LDAPAuthParameterOutput authDataParameter = new LDAPAuthParameterOutput();
		ArrayList<RolePersonDTO> roles = new ArrayList<RolePersonDTO>();

		int returncode = -1;
		
		if (password == null || "".equals(password) || username == null
				|| "".equals(username)) {
			//authDataParameter.setRcCode(-9L);
			//return authDataParameter;
			return -9;
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
			//authDataParameter.setRcCode(-9L);
			//return authDataParameter;
			returncode = -9; 
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
					System.out.println("Role ==" + roles);
					returncode = 1;
					
					//authDataParameter.setRcCode(1L);
				}
			} catch (AuthenticationException authEx) {
				System.out.println("Authentication failed");
				//authDataParameter.setRcCode(-9L);
				returncode = -1;

			} catch (NamingException namEx) {
				System.out
						.println("ldap error - check connection, parameters...");
				namEx.printStackTrace();
				//authDataParameter.setRcCode(-2L);
				returncode = -2;

			}
		}

		return returncode;
	};
	
	public Collection<String> getAllAttributeValues(Attribute attr)
			throws NamingException {
		Set<String> values = new HashSet<String>();
		for (NamingEnumeration e = attr.getAll(); e.hasMore();) {
			String value = (String) e.next();
			values.add(value);
		}
		return values;
	}
	
	public String getEnvironment() {
		String env = "Q";
		InetAddress iAddress;
		String hostName = "";
		try {
			iAddress = InetAddress.getLocalHost();
			hostName = iAddress.getHostName();
			} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		System.out.println("Running on Host: " + hostName);
		if (hostName.equals(SERVERNAME_PROD)) {
			env = "P";
		}
		if (hostName.equals(SERVERNAME_QA)) {
			env = "Q";
		}
		if (hostName.equals(SERVERNAME_DEV)) {
			env = "D";
		}
		return env;
	};
	
	public ArrayList<RolePersonDTO> hasRole(Collection<String> values, String username) {
		
		ArrayList<RolePersonDTO> roles = new ArrayList<RolePersonDTO>();		
		for (String role : values) {
			System.out.println("hasRole method==" + role);
			role = role.toUpperCase();
			int beginIndex = role.indexOf("C-Eye");
			if (beginIndex != -1) {
				String ceyeUserRole = role.substring(beginIndex - 2,
						role.indexOf(",OU="));
				if ("P".equalsIgnoreCase(getEnvironment())) {
					if (!ceyeUserRole.startsWith("QA_")&& !ceyeUserRole.startsWith("D_")){
						
						RolePersonDTO dto = new RolePersonDTO();
						dto.setCwid(username.toUpperCase());
						dto.setRoleName(userRole(ceyeUserRole.substring(2)));
						if(dto.getRoleName()!=null){
						roles.add(dto);
						}
					
				}
				} else {
					if (ceyeUserRole.startsWith(getEnvironment() + "_")) {
						RolePersonDTO dto = new RolePersonDTO();
						dto.setCwid(username.toUpperCase());
						dto.setRoleName(userRole(ceyeUserRole.substring(2)));
						roles.add(dto);
					}
				}

			}

		}
		return roles;
	}
	
	public String userRole(String ceyeRole) {
		
		String rtRole = null;
		
		if (ceyeRole.equalsIgnoreCase(ROLE_CEYE_USER)) {
			rtRole = ROLE_CEYE_USER;
		}
		if (ceyeRole.equalsIgnoreCase(ROLE_CEYE_ADMIN_USER)) {
			rtRole = ROLE_CEYE_ADMIN_USER;
		}
		if (ceyeRole.equalsIgnoreCase(ROLE_CEYE_ADMIN_READER)) {
			rtRole = ROLE_CEYE_ADMIN_READER;
		}
		if (ceyeRole.equalsIgnoreCase(ROLE_CEYE_ADMIN_STAMMDATEN_PFLEGE)) {
			rtRole = ROLE_CEYE_ADMIN_STAMMDATEN_PFLEGE;
		}
		if (ceyeRole.equalsIgnoreCase(ROLE_CEYE_ADMIN_STAMMDATEN_LESER)) {
			rtRole = ROLE_CEYE_ADMIN_STAMMDATEN_LESER;
		}
		if (ceyeRole.equalsIgnoreCase(ROLE_REPORTING_READER)) {
			rtRole = ROLE_REPORTING_READER;
		}
		if (ceyeRole.equalsIgnoreCase(ROLE_CEYE_ADMIN_USER_MANAGEMENT)) {
			rtRole = ROLE_CEYE_ADMIN_USER_MANAGEMENT;
		}
		return rtRole;}
}

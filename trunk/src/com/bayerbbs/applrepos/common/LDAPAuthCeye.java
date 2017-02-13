package com.bayerbbs.applrepos.common;

import java.util.ArrayList;
import java.util.Hashtable;
import java.text.MessageFormat;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;


/**
 * LDAPAuthCeye - builds a wrapper for C-Eye for authorisation against LDAP
 * 
 * @author evafl
 *
 */
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

			rccode=auth.login(username, password);
			

			System.out.println("result code: " + rccode);
		}

		System.exit(rccode);
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

		int returncode = -1;
		if (password == null || "".equals(password) || username == null || "".equals(username))
			return -9;
			authEnv.put(Context.INITIAL_CONTEXT_FACTORY,
					LDAP_FACTORY);
			authEnv.put(Context.PROVIDER_URL, ldapURL);

			
			authEnv.put(Context.SECURITY_PROTOCOL, "ssl"); 

			authEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
			authEnv.put(Context.SECURITY_PRINCIPAL, MessageFormat.format("uid={0},ou=people,O=bayer", username));
			authEnv.put(Context.SECURITY_CREDENTIALS, password);

			try {
				DirContext authContext = new InitialDirContext(authEnv);
				if (null != authContext) {
					System.out.println("Authentication ok");
					returncode = 1;
				}
			} catch (AuthenticationException authEx) {
			System.out.println("authEX"+authEx);
				System.out.println("Authentication failed");
				returncode = -1;

			} catch (NamingException namEx) {
				System.out
						.println("ldap error - check connection, parameters...");
				namEx.printStackTrace();
				returncode = -2;
			}
	

		return returncode;
	}
	
	
}

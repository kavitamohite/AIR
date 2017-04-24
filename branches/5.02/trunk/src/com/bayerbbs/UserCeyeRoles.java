package com.bayerbbs;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Set;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;



public class UserCeyeRoles {
	
	private static final String LDAP_FACTORY = "com.sun.jndi.ldap.LdapCtxFactory";
	
	private static final String ldapURL = "ldaps://DE.bayer.cnb:3269/";	
	private static final String MASCHINE_USER = "CN=MXSNT,OU=Non-PersonalMailboxAccounts,OU=Resources,OU=_DomainOperations,DC=DE,DC=bayer,DC=cnb";
	private static final String MASCHINE_USER_PWD = "isbb2007";
	public static final String ROLE_CEYE_USER ="C-Eye User";
	public static final String ROLE_CEYE_ADMIN_USER = "C-Eye-Admin User";
	public static final String ROLE_CEYE_ADMIN_READER = "C-Eye-Admin Reader";
	public static final String ROLE_CEYE_ADMIN_STAMMDATEN_PFLEGE = "C-Eye-Admin Stammdaten-Pflege";
	public static final String ROLE_CEYE_ADMIN_STAMMDATEN_LESER = "C-Eye-Admin Stammdaten-Leser";
	public static final String ROLE_REPORTING_READER = "Reporting Reader";
	public static final String ROLE_CEYE_ADMIN_USER_MANAGEMENT = "C-Eye-Admin User-Management";

	
	
	private Hashtable<String, String> env = new Hashtable<String, String>();
	private DirContext ctx = null;
	
	
	
	
	public static void main(String[] args) {

		UserCeyeRoles userRoles = new UserCeyeRoles();

		int rccode = -1;

		if (1 != args.length) {
			
			System.out.println("UserCeyeRoles <cwid>");
			rccode = -99;
		} else {

			String username = args[0];
			
			try {
					rccode =userRoles.findByCwid(username);
				} catch (NamingException e) {
					
					e.printStackTrace();
				}
			

			
		}

		System.exit(rccode);
	}

	
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
	
	

	private int findByCwid(String cwid) throws NamingException {
		
		int returncode = -1;
		ArrayList<RolePersonDTO> roles = new ArrayList<RolePersonDTO>();

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
				Attribute test = sr.getAttributes().get("memberOf");
				Collection<String> values = getAllAttributeValues(test);
				roles=hasRole(values, cwid);

			}

		} finally {
			try {
				if (ctx != null)
					ctx.close();
			}
			catch (AuthenticationException authEx) {
				System.out.println("Authentication failed");
			}
			
		}
		return returncode;
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
	
	
	
	public ArrayList<RolePersonDTO> hasRole(Collection<String> values, String username) {
		
		ArrayList<RolePersonDTO> roles = new ArrayList<RolePersonDTO>();		
		for (String role : values) {
			if(role.contains("C-Eye") || role.contains("c-eye") || role.contains("Reporting_Reader") )
			{
				System.out.println("hasRole method==" + role);
			}
			
			role = role.toUpperCase();
			int beginIndex = role.indexOf("C-Eye");
			if (beginIndex != -1) {
				String ceyeUserRole = role.substring(beginIndex - 2,
						role.indexOf(",OU="));
				
						RolePersonDTO dto = new RolePersonDTO();
						dto.setCwid(username.toUpperCase());
						dto.setRoleName(userRole(ceyeUserRole.substring(2)));
						if(dto.getRoleName()!=null){
						roles.add(dto);
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

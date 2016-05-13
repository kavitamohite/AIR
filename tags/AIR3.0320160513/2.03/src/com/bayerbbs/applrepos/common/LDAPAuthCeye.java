package com.bayerbbs.applrepos.common;

import java.util.Hashtable;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

/**
 * LDAPAuthCeye - builds a wrapper for C-Eye for authorisation against LDAP
 * 
 * @author evafl
 *
 */
public class LDAPAuthCeye {

	private static final String LDAP_FACTORY = "com.sun.jndi.ldap.LdapCtxFactory";

	// private static final String MASCHINE_USER = "MXSNT";
	private static final String MASCHINE_USER = "CN=MXSNT,OU=Non-PersonalMailboxAccounts,OU=Resources,OU=_DomainOperations,DC=DE,DC=bayer,DC=cnb";
	
	
	private static final String MASCHINE_USER_PWD = "isbb2007";

	// private static final String MX_SEARCH_CONTEXT = "ou=itaccounts,o=bayer"; // IBM LDAP Service
	private static final String MX_SEARCH_CONTEXT = "";

	// private static final String ldapURL = "ldaps://ldaps.bayer-ag.com:636/";	// IBM LDAP Service
	private static final String ldapURL = "ldaps://bayer.cnb:3269/";			// Microsoft AD (über LDAP)

	private Hashtable<String, String> env = new Hashtable<String, String>();

	/** hashtable for ldap handling */
	private DirContext ctx = null;

	/**
	 * @param args
	 */
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

			rccode = auth.login(username, password);

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

//			env.put(Context.SECURITY_PRINCIPAL, "uid=" + MASCHINE_USER + ","
//					+ MX_SEARCH_CONTEXT);	// IBM LDAP Service

			env.put(Context.SECURITY_PRINCIPAL, MASCHINE_USER);
			env.put(Context.SECURITY_CREDENTIALS, MASCHINE_USER_PWD);

			// Create the initial context
			ctx = new InitialDirContext(env);

			SearchControls controls = new SearchControls(
					SearchControls.SUBTREE_SCOPE, 0, 0, null, false, false);
			// String searchString = "(uid=" + cwid + ")";		// IBM LDAP Service
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

		int returncode = -1;
		if (password == null || "".equals(password) || username == null || "".equals(username))
			return -9;

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
				if (null != authContext) {
					System.out.println("Authentication ok");
					returncode = 1;
				}
			} catch (AuthenticationException authEx) {
				System.out.println("Authentication failed");
				returncode = -1;

			} catch (NamingException namEx) {
				System.out
						.println("ldap error - check connection, parameters...");
				namEx.printStackTrace();
				returncode = -2;
			}
		}

		return returncode;
	}

}

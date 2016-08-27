package com.bayerbbs.applrepos.common;

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
	
	private static final String ldapURL = "ldaps://ldaps.bayer-ag.com:636/o=bayer";	// IBM LDAP Service
	 
	
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

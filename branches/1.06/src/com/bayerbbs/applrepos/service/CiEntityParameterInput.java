package com.bayerbbs.applrepos.service;

public class CiEntityParameterInput {

	/** the cwid logged in*/
	String cwid;

	/** the token - session */
	String token;
	
	/** the type of the entity */
	String type;
	
	/** the query we are searching for */
	String query;

	public String getCwid() {
		return cwid;
	}

	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	
}

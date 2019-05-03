package com.bayerbbs.applrepos.service;

public class PersonsParameterInput {

	private String query;
	private String queryMethod;
	
	private String primaryCWID;
	private String secondaryCWID;
	private String machineCWID;
	
	private String functionCWID;
	
	private Long itSet;	// the itSet for the search by function -> compliance signee

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getQueryMethod() {
		return queryMethod;
	}

	public void setQueryMethod(String queryMethod) {
		this.queryMethod = queryMethod;
	}

	public String getPrimaryCWID() {
		return primaryCWID;
	}

	public void setPrimaryCWID(String primaryCWID) {
		this.primaryCWID = primaryCWID;
	}

	public String getSecondaryCWID() {
		return secondaryCWID;
	}

	public void setSecondaryCWID(String secondaryCWID) {
		this.secondaryCWID = secondaryCWID;
	}

	public String getMachineCWID() {
		return machineCWID;
	}

	public void setMachineCWID(String machineCWID) {
		this.machineCWID = machineCWID;
	}

	public String getFunctionCWID() {
		return functionCWID;
	}

	public void setFunctionCWID(String functionCWID) {
		this.functionCWID = functionCWID;
	}

	public Long getItSet() {
		return itSet;
	}

	public void setItSet(Long itSet) {
		this.itSet = itSet;
	}
	
}

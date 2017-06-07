package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class OrganisationalScopeDTO implements Serializable {

	private static final long serialVersionUID = -2138068635704362610L;

	private String organisationalScopeId;
	private String organisationalScopeTxt;

	public OrganisationalScopeDTO() {
	}
	
	public OrganisationalScopeDTO(String organisationalScopeTxt) {
		this(organisationalScopeTxt, organisationalScopeTxt);
	}
	
	public OrganisationalScopeDTO(String organisationalScopeId, String organisationalScopeTxt) {
		this.organisationalScopeId = organisationalScopeId;
		this.organisationalScopeTxt = organisationalScopeTxt;
	}

	public String getOrganisationalScopeId() {
		return organisationalScopeId;
	}

	public void setOrganisationalScopeId(String organisationalScopeId) {
		this.organisationalScopeId = organisationalScopeId;
	}

	public String getOrganisationalScopeTxt() {
		return organisationalScopeTxt;
	}

	public void setOrganisationalScopeTxt(String organisationalScopeTxt) {
		this.organisationalScopeTxt = organisationalScopeTxt;
	}
	
}

package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class CiBase2 extends CiBase {
	private String ciOwner;
	
	@Column(name = "CWID_VERANTW_BETR")
	public String getCiOwner() {
		return ciOwner;
	}

	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}

}
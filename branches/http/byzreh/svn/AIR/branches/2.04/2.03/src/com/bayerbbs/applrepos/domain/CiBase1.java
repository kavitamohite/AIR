package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class CiBase1 extends CiBase {
	private String ciOwner;
	
	@Column(name = "RESPONSIBLE")
	public String getCiOwner() {
		return ciOwner;
	}

	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}
}
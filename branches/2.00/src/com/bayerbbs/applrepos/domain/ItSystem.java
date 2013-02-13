package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "IT_SYSTEM")
public class ItSystem extends CiBase implements Serializable {
	private static final long serialVersionUID = -9152390693208339445L;

	

	@Id
	@Column(name = "IT_SYSTEM_ID")
	public Long getItSystemId() {
		return getId();
	}
	public void setItSystemId(Long itSystemId) {
		setId(itSystemId);
	}

	@Column(name = "IT_SYSTEM_NAME")
	public String getItSystemName() {
		return getName();
	}
	public void setItSystemName(String itSystemName) {
		setName(itSystemName);
	}

	@Column(name = "ALIAS")
	public String getAlias() {
		return getAlias();
	}
	public void setAlias(String alias) {
		setAlias(alias);
	}
}
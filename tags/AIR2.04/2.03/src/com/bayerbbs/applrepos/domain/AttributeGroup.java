package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ATTRIBUTE_GROUP")
public class AttributeGroup extends DeletableRevisionInfo implements
		Serializable {

	private static final long serialVersionUID = -5235125394194472210L;

	private Long id;
	private String name;

	@Id
	@GeneratedValue
	@Column(name = "ATTRIBUTE_GROUP_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "ATTRIBUTE_GROUP_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}

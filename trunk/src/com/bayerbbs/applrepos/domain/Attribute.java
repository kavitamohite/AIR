package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ATTRIBUTE")
public class Attribute extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -1147496255308686001L;

	private Long id;
	private String name;
	private AttributeGroup attributeGroup;

	public Attribute() {

	}

	public Attribute(Long id) {
		this.id = id;
	}

	@Id
	@GeneratedValue
	@Column(name = "ATTRIBUTE_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "ATTRIBUTE_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@ManyToOne
	@JoinColumn(name = "ATTRIBUTE_GROUP_ID")
	public AttributeGroup getAttributeGroup() {
		return attributeGroup;
	}

	public void setAttributeGroup(AttributeGroup attributeGroup) {
		this.attributeGroup = attributeGroup;
	}

}

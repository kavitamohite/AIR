package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "ATTRIBUTE_VALUE")
public class AttributeValue extends DeletableRevisionInfo implements
		Serializable {

	private static final long serialVersionUID = -8274987801789767718L;
	private Long id;
	private String name;
	private Attribute attribute;
	private Character applicationSelectable;
	private Character inheritanceOverwritable;

	public AttributeValue() {

	}

	public AttributeValue(Long id) {
		this.id = id;
	}

	@Id
	@GeneratedValue
	@Column(name = "ATTRIBUTE_VALUE_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "ATTRIBUTE_VALUE_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@ManyToOne
	@JoinColumn(name = "ATTRIBUTE_ID")
	public Attribute getAttribute() {
		return attribute;
	}

	public void setAttribute(Attribute attribute) {
		this.attribute = attribute;
	}

	@Type(type = "yes_no")
	@Column(name = "APPLICATION_SELECTABLE_YN")
	public Boolean getApplicationSelectable() {
		if (applicationSelectable == null)
			return null;
		return applicationSelectable == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setApplicationSelectable(Boolean applicationSelectable) {
		if (applicationSelectable == null) {
			this.applicationSelectable = null;
		} else {
			this.applicationSelectable = applicationSelectable == true ? 'Y'
					: 'N';
		}
	}

	@Type(type = "yes_no")
	@Column(name = "INHERITANCE_OVERWRITEABLE_YN")
	public Boolean getInheritanceOverwritable() {
		if (inheritanceOverwritable == null)
			return null;
		return inheritanceOverwritable == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setInheritanceOverwritable(Boolean inheritanceOverwritable) {
		if (inheritanceOverwritable == null) {
			this.inheritanceOverwritable = null;
		} else {
			this.inheritanceOverwritable = inheritanceOverwritable == true ? 'Y'
					: 'N';
		}
	}

}

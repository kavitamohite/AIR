package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "CI_ATTRIBUTE_VALUE_RELATION")
@org.hibernate.annotations.Entity(dynamicInsert = true)
public class SpecialAttribute extends DeletableRevisionInfo implements
		Serializable {

	private static final long serialVersionUID = 7583590013437830193L;
	private Long id;
	private Long ciId;
	private Long tableId;
	private Attribute attribute;
	private AttributeValue attributeValue;
	private String status;
	
	@Id
	@Column(name = "CI_ATTRIBUTE_VALUE_RELATION_ID")
	public Long getSpecialAttributeId() {
		return getId();
	}
	public void setSpecialAttributeId(Long specialAttributeId) {
		this.setId(specialAttributeId);
	}
		
	@Transient
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	

	@Column(name = "CI_ID")
	public Long getCiId() {
		return ciId;
	}

	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}

	@Column(name = "TABLE_ID")
	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "ATTRIBUTE_ID")
	public Attribute getAttribute() {
		return attribute;
	}

	public void setAttribute(Attribute attribute) {
		this.attribute = attribute;
	}

	@ManyToOne
	@JoinColumn(name = "ATTRIBUTE_VALUE_ID")
	public AttributeValue getAttributeValue() {
		return attributeValue;
	}

	public void setAttributeValue(AttributeValue attributeValue) {
		this.attributeValue = attributeValue;
	}

	@Column(name = "STATUS")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "SpecialAttribute [id=" + id + ", ciId=" + ciId + ", tableId="
				+ tableId + ", attribute=" + attribute + ", attributeValue="
				+ attributeValue + ", status=" + status + "]";
	}
	
}

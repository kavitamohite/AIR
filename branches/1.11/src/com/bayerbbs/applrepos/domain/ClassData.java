package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
@Entity
@Table(name = "V_MD_CLASS_DATA")
public class ClassData implements Serializable {
	private static final long serialVersionUID = -2102335301485680999L;

	private Long classDataId;
	private String classDataName;
	private Long categoryBusinessId;
	

	@Transient
	public Long getId() {
		return getClassDataId();
	}
	
	@Id
	@Column(name = "CLASS_DATA_ID")
	public Long getClassDataId() {
		return classDataId;
	}
	public void setClassDataId(Long classDataId) {
		this.classDataId = classDataId;
	}

	@Column(name = "CLASS_DATA_NAME")
	public String getClassDataName() {
		return classDataName;
	}
	public void setClassDataName(String classDataName) {
		this.classDataName = classDataName;
	}

	@Column(name = "CATEGORY_BUSINESS_ID")
	public Long getCategoryBusinessId() {
		return categoryBusinessId;
	}

	public void setCategoryBusinessId(Long categoryBusinessId) {
		this.categoryBusinessId = categoryBusinessId;
	}
}
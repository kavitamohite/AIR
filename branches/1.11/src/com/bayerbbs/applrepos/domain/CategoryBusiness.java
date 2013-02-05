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
@Table(name = "V_MD_CATEGORY_BUSINESS")
public class CategoryBusiness implements Serializable {

	private static final long serialVersionUID = 3316219570981186638L;
	
	private Long categoryBusinessId;
	private String categoryBusinessName;

	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public CategoryBusiness() {
	}

	// ------------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------------

	/**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 */
	@Transient
	public Long getId() {
		return getCategoryBusinessId();
	}

	/**
	 * Returns the value of the field {@link #categoryBusinessId}.
	 * 
	 * @return Value of the {@link #categoryBusinessId} field.
	 */
	@Id
	@Column(name = "CATEGORY_BUSINESS_ID")
	public Long getCategoryBusinessId() {
		return categoryBusinessId;
	}

	/**
	 * Sets the value of the {@link #categoryBusinessId} field.
	 * 
	 * @param categoryBusinessId
	 *            The value to set.
	 */
	public void setCategoryBusinessId(Long categoryBusinessId) {
		this.categoryBusinessId = categoryBusinessId;
	}
	
	/**
	 * Returns the value of the field {@link #categoryBusinessName}.
	 * 
	 * @return Value of the {@link #categoryBusinessName} field.
	 */
	@Column(name = "CATEGORY_BUSINESS_NAME")
	public String getCategoryBusinessName() {
		return categoryBusinessName;
	}

	/**
	 * Sets the value of the {@link #categoryBusinessName} field.
	 * 
	 * @param categoryBusinessName
	 *            The value to set.
	 */
	public void setCategoryBusinessName(String categoryBusinessName) {
		this.categoryBusinessName = categoryBusinessName;
	}

}

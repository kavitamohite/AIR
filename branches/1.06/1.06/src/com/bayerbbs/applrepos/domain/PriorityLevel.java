package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "PRIORITY_LEVEL")
public class PriorityLevel extends DeletableRevisionInfo implements Serializable {


	private static final long serialVersionUID = -4150814818241850811L;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long priorityLevelId;
	
	String priorityLevel;
	
	
	/**
	 * Creates a new instance.
	 */
	public PriorityLevel() {
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
		return getPriorityLevelId();
	}

	/**
	 * Returns the value of the field {@link #priorityLevelId}.
	 * 
	 * @return Value of the {@link #priorityLevelId} field.
	 */
	@Id
	@Column(name = "PRIORITY_LEVEL_ID")
	public Long getPriorityLevelId() {
		return priorityLevelId;
	}

	/**
	 * Sets the value of the {@link #priorityLevelId} field.
	 * 
	 * @param priorityLevelId
	 *            The value to set.
	 */
	public void setPriorityLevelId(Long priorityLevelId) {
		this.priorityLevelId = priorityLevelId;
	}

	/**
	 * Returns the value of the field {@link #priorityLevel}.
	 * 
	 * @return Value of the {@link #priorityLevel} field.
	 */
	@Column(name = "PRIORITY_LEVEL")
	public String getPriorityLevel() {
		return priorityLevel;
	}

	/**
	 * Sets the value of the {@link #priorityLevel} field.
	 * 
	 * @param priorityLevel
	 *            The value to set.
	 */
	public void setPriorityLevel(String priorityLevel) {
		this.priorityLevel = priorityLevel;
	}

}

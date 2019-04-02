package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "CI_GROUPS")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "MySeqCiGroups", sequenceName = "SEQ_CI_GROUPS")
public class CiGroups extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -2584056008889694445L;

	private Long ciGroupsId;
	private Long tableId;
	private Long ciId;
	private Long groupId;
	private Long groupTypeId;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public CiGroups() {
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
		return getCiGroupsId();
	}

	/**
	 * Returns the value of the field {@link #ciGroupsId}.
	 * 
	 * @return Value of the {@link #ciGroupsId} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqCiGroups")
	@Column(name = "CI_GROUPS_ID")
	public Long getCiGroupsId() {
		return ciGroupsId;
	}

	/**
	 * Sets the value of the {@link #ciGroupsId} field.
	 * 
	 * @param ciGroupsId
	 *            The value to set.
	 */
	public void setCiGroupsId(Long ciGroupsId) {
		this.ciGroupsId = ciGroupsId;
	}
	
	/**
	 * Returns the value of the field {@link #tableId}.
	 * 
	 * @return Value of the {@link #tableId} field.
	 */
	@Column(name = "TABLE_ID")
	public Long getTableId() {
		return tableId;
	}

	/**
	 * Sets the value of the {@link #tableId} field.
	 * 
	 * @param tableId
	 *            The value to set.
	 */
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	/**
	 * Returns the value of the field {@link #ciId}.
	 * 
	 * @return Value of the {@link #ciId} field.
	 */
	@Column(name = "CI_ID")
	public Long getCiId() {
		return ciId;
	}

	/**
	 * Sets the value of the {@link #ciId} field.
	 * 
	 * @param ciId
	 *            The value to set.
	 */
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}

	/**
	 * Returns the value of the field {@link #groupId}.
	 * 
	 * @return Value of the {@link #groupId} field.
	 */
	@Column(name = "GROUP_ID")
	public Long getGroupId() {
		return groupId;
	}

	/**
	 * Sets the value of the {@link #groupId} field.
	 * 
	 * @param groupId
	 *            The value to set.
	 */
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	/**
	 * Returns the value of the field {@link #groupTypeId}.
	 * 
	 * @return Value of the {@link #groupTypeId} field.
	 */
	@Column(name = "GROUP_TYPE_ID")
	public Long getGroupTypeId() {
		return groupTypeId;
	}

	/**
	 * Sets the value of the {@link #groupTypeId} field.
	 * 
	 * @param groupTypeId
	 *            The value to set.
	 */
	public void setGroupTypeId(Long groupTypeId) {
		this.groupTypeId = groupTypeId;
	}

}

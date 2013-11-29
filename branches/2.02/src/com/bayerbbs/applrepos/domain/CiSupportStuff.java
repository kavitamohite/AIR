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
@Table(name = "CI_SUPPORT_STUFF")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "MySeqCiSupportStuff", sequenceName = "SEQ_CI_SUPPORT_STUFF")
public class CiSupportStuff  extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 5175397620726967672L;

	private Long ciSupportStuffId;
	private Long ciSupportStuffTypeId;
	private Integer tableId;
	private Long ciId;
	private String ciSupportStuffValue;

	
	@Transient
	public Long getId() {
		return getCiSupportStuffId();
	}

	/**
	 * Returns the value of the field {@link #ciSupportStuffId}.
	 * 
	 * @return Value of the {@link #ciSupportStuffId} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqCiSupportStuff")
	@Column(name = "CI_SUPPORT_STUFF_ID")
	public Long getCiSupportStuffId() {
		return ciSupportStuffId;
	}

	/**
	 * Sets the value of the {@link #ciSupportStuffId} field.
	 * 
	 * @param ciSupportStuffId
	 *            The value to set.
	 */
	public void setCiSupportStuffId(Long ciSupportStuffId) {
		this.ciSupportStuffId = ciSupportStuffId;
	}
	
	/**
	 * Returns the value of the field {@link #ciSupportStuffTypeId}.
	 * 
	 * @return Value of the {@link #ciSupportStuffTypeId} field.
	 */
	@Column(name = "CI_SUPPORT_STUFF_TYPE_ID")
	public Long getCiSupportStuffTypeId() {
		return ciSupportStuffTypeId;
	}

	/**
	 * Sets the value of the {@link #ciSupportStuffTypeId} field.
	 * 
	 * @param ciSupportStuffTypeId
	 *            The value to set.
	 */
	public void setCiSupportStuffTypeId(Long ciSupportStuffTypeId) {
		this.ciSupportStuffTypeId = ciSupportStuffTypeId;
	}

	/**
	 * Returns the value of the field {@link #tableId}.
	 * 
	 * @return Value of the {@link #tableId} field.
	 */
	@Column(name = "TABLE_ID")
	public Integer getTableId() {
		return tableId;
	}

	/**
	 * Sets the value of the {@link #tableId} field.
	 * 
	 * @param tableId
	 *            The value to set.
	 */
	public void setTableId(Integer tableId) {
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
	 * Returns the value of the field {@link #ciSupportStuffValue}.
	 * 
	 * @return Value of the {@link #ciSupportStuffValue} field.
	 */
	@Column(name = "CI_SUPPORT_STUFF_VALUE")
	public String getCiSupportStuffValue() {
		return ciSupportStuffValue;
	}

	/**
	 * Sets the value of the {@link #ciSupportStuffValue} field.
	 * 
	 * @param ciSupportStuffValue
	 *            The value to set.
	 */
	public void setCiSupportStuffValue(String ciSupportStuffValue) {
		this.ciSupportStuffValue = ciSupportStuffValue;
	}


}

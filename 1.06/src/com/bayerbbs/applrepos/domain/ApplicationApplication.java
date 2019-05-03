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
@Table(name = "ANW_ANW")
@SequenceGenerator(name = "MySeqAnwendungAnwendung", sequenceName = "TBADM.SEQ_ANW_ANW")
public class ApplicationApplication extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 2579895208160477908L;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long applicationApplicationId;
	
	Long applicationHigherId;
	Long applicationLowerId;
	String commentary;
	
	
	/**
	 * Creates a new instance.
	 */
	public ApplicationApplication() {
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
		return getApplicationApplicationId();
	}

	/**
	 * Returns the value of the field {@link #applicationApplicationId}.
	 * 
	 * @return Value of the {@link #applicationApplicationId} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqAnwendungAnwendung")
	@Column(name = "ANW_ANW_ID")
	public Long getApplicationApplicationId() {
		return applicationApplicationId;
	}

	/**
	 * Sets the value of the {@link #applicationApplicationId} field.
	 * 
	 * @param applicationApplicationId
	 *            The value to set.
	 */
	public void setApplicationApplicationId(Long applicationApplicationId) {
		this.applicationApplicationId = applicationApplicationId;
	}

	/**
	 * Returns the value of the field {@link #applicationHigherId}.
	 * 
	 * @return Value of the {@link #applicationHigherId} field.
	 */
	@Column(name = "APP_HIGHER_ID")
	public Long getApplicationHigherId() {
		return applicationHigherId;
	}

	/**
	 * Sets the value of the {@link #applicationHigherId} field.
	 * 
	 * @param applicationHigherId
	 *            The value to set.
	 */
	public void setApplicationHigherId(Long applicationHigherId) {
		this.applicationHigherId = applicationHigherId;
	}
	
	/**
	 * Returns the value of the field {@link #applicationLowerId}.
	 * 
	 * @return Value of the {@link #applicationLowerId} field.
	 */
	@Column(name = "APP_LOWER_ID")
	public Long getApplicationLowerId() {
		return applicationLowerId;
	}

	/**
	 * Sets the value of the {@link #applicationLowerId} field.
	 * 
	 * @param applicationLowerId
	 *            The value to set.
	 */
	public void setApplicationLowerId(Long applicationLowerId) {
		this.applicationLowerId = applicationLowerId;
	}
	
	/**
	 * Returns the value of the field {@link #commentary}.
	 * 
	 * @return Value of the {@link #commentary} field.
	 */
	@Column(name = "COMMENTARY")
	public String getCommentary() {
		return commentary;
	}

	/**
	 * Sets the value of the {@link #commentary} field.
	 * 
	 * @param commentary
	 *            The value to set.
	 */
	public void setCommentary(String commentary) {
		this.commentary = commentary;
	}
	
}

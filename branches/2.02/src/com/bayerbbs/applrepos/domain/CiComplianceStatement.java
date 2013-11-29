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
@Table(name = "CI_COMPLIANCE_STATEMENT")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "MySeqCiComplianceStatement", sequenceName = "SEQ_CI_COMPLIANCE_STATEMENT")
public class CiComplianceStatement extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 3279797039958072077L;

	private Long ciComplianceStatementId;
	private Long ciComplianceRequestId;
	private Long complianceControlId;
	private String compliantStatus;
	private String justification;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public CiComplianceStatement() {
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
		return getCiComplianceStatementId();
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqCiComplianceStatement")
	@Column(name = "CI_COMPLIANCE_STATEMENT_ID")
	public Long getCiComplianceStatementId() {
		return ciComplianceStatementId;
	}

	public void setCiComplianceStatementId(Long ciComplianceStatementId) {
		this.ciComplianceStatementId = ciComplianceStatementId;
	}


	@Column(name = "CI_COMPLIANCE_REQUEST_ID")
	public Long getCiComplianceRequestId() {
		return ciComplianceRequestId;
	}

	public void setCiComplianceRequestId(Long ciComplianceRequestId) {
		this.ciComplianceRequestId = ciComplianceRequestId;
	}

	@Column(name = "COMPLIANCE_CONTROL_ID")
	public Long getComplianceControlId() {
		return complianceControlId;
	}

	public void setComplianceControlId(Long complianceControlId) {
		this.complianceControlId = complianceControlId;
	}

	@Column(name = "COMPLIANT_STATUS")
	public String getCompliantStatus() {
		return compliantStatus;
	}

	public void setCompliantStatus(String compliantStatus) {
		this.compliantStatus = compliantStatus;
	}

	@Column(name = "JUSTIFICATION")
	public String getJustification() {
		return justification;
	}

	public void setJustification(String justification) {
		this.justification = justification;
	}

}

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
@Table(name = "CI_COMPLIANCE_REQUEST")
@SequenceGenerator(name = "MySeqCiComplianceRequest", sequenceName = "TBADM.SEQ_CI_COMPLIANCE_REQUEST")
public class CiComplianceRequest extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 1999222508852960139L;

	private Long ciComplianceRequestId;
	private Long complianceRequestId;
	private Long ciId;
	private Long tableId;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public CiComplianceRequest() {
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
		return getCiComplianceRequestId();
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqCiComplianceRequest")
	@Column(name = "CI_COMPLIANCE_REQUEST_ID")
	public Long getCiComplianceRequestId() {
		return ciComplianceRequestId;
	}

	public void setCiComplianceRequestId(Long ciComplianceRequestId) {
		this.ciComplianceRequestId = ciComplianceRequestId;
	}

	@Column(name = "COMPLIANCE_REQUEST_ID")
	public Long getComplianceRequestId() {
		return complianceRequestId;
	}

	public void setComplianceRequestId(Long complianceRequestId) {
		this.complianceRequestId = complianceRequestId;
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
	
}

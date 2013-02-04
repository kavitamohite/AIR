package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

@MappedSuperclass
public abstract class CiBase extends DeletableRevisionInfo {
	private Long id;
	private String name;
	private String alias;
	
	private String responsible;
	private String subResponsible;
	
	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanceITSEC;
	private String gxpFlag;
	
	private Long slaId;
	private Long serviceContractId;
	
	
	
	@Transient
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	@Transient
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Transient
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	
	
	@Column(name = "RESPONSIBLE")
	public String getResponsible() {
		return responsible;
	}

	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}

	@Column(name = "SUB_RESPONSIBLE")
	public String getSubResponsible() {
		return subResponsible;
	}

	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}
	
	@Column(name = "ITSET")
	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}

	@Column(name = "TEMPLATE")
	public Long getTemplate() {
		return template;
	}

	public void setTemplate(Long template) {
		this.template = template;
	}

	@Column(name = "ITSEC_GRUPPE_ID")
	public Long getItsecGroupId() {
		return itsecGroupId;
	}

	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}

	@Column(name = "REF_ID")
	public Long getRefId() {
		return refId;
	}

	public void setRefId(Long refId) {
		this.refId = refId;
	}
	
	
	@Column(name = "RELEVANCE_ICS")
	public Long getRelevanceICS() {
		return relevanceICS;
	}

	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}

	@Column(name = "RELEVANZ_ITSEC")
	public Long getRelevanceITSEC() {
		return relevanceITSEC;
	}

	public void setRelevanceITSEC(Long relevanceITSEC) {
		this.relevanceITSEC = relevanceITSEC;
	}

	@Column(name = "GXP_FLAG")
	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	
	
	@Column(name = "SERVICE_CONTRACT_ID")
	public Long getServiceContractId() {
		return serviceContractId;
	}

	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}


	
	@Column(name = "SLA_ID")
	public Long getSlaId() {
		return slaId;
	}

	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}
}
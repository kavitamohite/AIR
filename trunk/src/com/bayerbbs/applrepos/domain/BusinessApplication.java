package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name ="BUSINESS_APPLICATION")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name="MySeqBusinessApplication" ,sequenceName="SEQ_BUSINESS_APPLICATION")
@NamedQueries({
@NamedQuery(name="findBusinessApplicationByNameORAlias", query="FROM BusinessApplication b where b.applicationName = :applicationName")
}
		)

public class BusinessApplication  extends DeletableRevisionInfo implements Serializable {
	
	private static final long serialVersionUID = -2978204751107056476L;
	
	private Long id;
	private Long barAppid; 
	private String applicationName;
	private String applicationAlias;
	private String applicationDescription;
	private String applicationOwner;
	
	private String applicationSteward;
	private Long lifecycleStatusId;
	
	private Long relevanceICS;
	private Long relevanceITSEC;
	private String gxpFlag;
	private Long externallyHosted;
	private String lastModification;
	

	
	
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqBusinessApplication")	
	//@Transient
	@Column(name = "BUSINESS_APPLICATION_ID")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "BAR_APPLICATION_ID")
	public Long getBarAppid() {
		return barAppid;
	}
	
	public void setBarAppid(Long barAppid) {
		this.barAppid = barAppid;
	}
	
	@Column(name = "APPLICATION_NAME")
	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}
	
	@Column(name = "APPLICATION_DESCRIPTION")
	public String getApplicationDescription() {
		return applicationDescription;
	}
	
	public void setApplicationDescription(String applicationDescription) {
		this.applicationDescription = applicationDescription;
	}
	
	@Column(name = "APPLICATION_ALIAS")
	public String getApplicationAlias() {
		return applicationAlias;
	}
	
	public void setApplicationAlias(String applicationAlias) {
		this.applicationAlias = applicationAlias;
	}
	
	
	
	@Column(name = "APPLICATION_OWNER")
	public String getApplicationOwner() {
		return applicationOwner;
	}
	
	public void setApplicationOwner(String applicationOwner) {
		this.applicationOwner = applicationOwner;
	}
	
	@Column(name = "APPLICATION_STEWARD")
	public String getApplicationSteward() {
		return applicationSteward;
	}
	
	public void setApplicationSteward(String applicationSteward) {
		this.applicationSteward = applicationSteward;
	}
	
	@Column(name = "LIFE_CYCLE_STATUS")
	public Long getLifecycleStatusId() {
		return lifecycleStatusId;
	}
	
	public void setLifecycleStatusId(Long lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
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
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	@Column(name = "EXTERNALLY_HOSTED")
	public Long getExternallyHosted() {
		return externallyHosted;
	}
	public void setExternallyHosted(Long externallyHosted) {
		this.externallyHosted = externallyHosted;
	}
	
	@Column(name = "LAST_MODIFICATION")
	public String getLastModification() {
		return lastModification;
	}
	public void setLastModification(String lastModification) {
		this.lastModification = lastModification;
	}
		
}

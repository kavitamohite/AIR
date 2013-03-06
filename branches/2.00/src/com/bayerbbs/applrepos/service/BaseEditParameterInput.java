package com.bayerbbs.applrepos.service;

public class BaseEditParameterInput {
	private String cwid;
	private String token;
	

	private Long id;
	private String name;
	
	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;

	
	private Long slaId;
	private Long serviceContractId;
	
	private Long itset;
	private Long template;
	private Long itSecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanzITSEC;
	private String relevanceGR1435;
	private String relevanceGR1920;
	private String gxpFlag;
	private String gxpFlagId;	// falls später über id referenziert wird
	
	private Long itSecSbAvailabilityId;
//	private String itSecSbAvailabilityTxt;
	private String itSecSbAvailabilityDescription;
	private Long classInformationId;
	private String classInformationExplanation;


	
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


	public String getCiOwner() {
		return ciOwner;
	}
	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}
	public String getCiOwnerHidden() {
		return ciOwnerHidden;
	}
	public void setCiOwnerHidden(String ciOwnerHidden) {
		this.ciOwnerHidden = ciOwnerHidden;
	}
	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}
	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}
	public String getCiOwnerDelegateHidden() {
		return ciOwnerDelegateHidden;
	}
	public void setCiOwnerDelegateHidden(String ciOwnerDelegateHidden) {
		this.ciOwnerDelegateHidden = ciOwnerDelegateHidden;
	}
	

	public Long getSlaId() {
		return slaId;
	}
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}
	public Long getServiceContractId() {
		return serviceContractId;
	}
	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}
	

	public Long getItset() {
		return itset;
	}
	public void setItset(Long itset) {
		this.itset = itset;
	}
	public Long getTemplate() {
		return template;
	}
	public void setTemplate(Long template) {
		this.template = template;
	}
	public Long getItSecGroupId() {
		return itSecGroupId;
	}
	public void setItSecGroupId(Long itSecGroupId) {
		this.itSecGroupId = itSecGroupId;
	}
	public Long getRefId() {
		return refId;
	}
	public void setRefId(Long refId) {
		this.refId = refId;
	}
	public Long getRelevanceICS() {
		return relevanceICS;
	}
	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
	public Long getRelevanzITSEC() {
		return relevanzITSEC;
	}
	public void setRelevanzITSEC(Long relevanzITSEC) {
		this.relevanzITSEC = relevanzITSEC;
	}
	public String getRelevanceGR1435() {
		return relevanceGR1435;
	}
	public void setRelevanceGR1435(String relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
	}
	public String getRelevanceGR1920() {
		return relevanceGR1920;
	}
	public void setRelevanceGR1920(String relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
	}
	public String getGxpFlag() {
		return gxpFlag;
	}
	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	public String getGxpFlagId() {
		return gxpFlagId;
	}
	public void setGxpFlagId(String gxpFlagId) {
		this.gxpFlagId = gxpFlagId;
	}
	
	
	public Long getItSecSbAvailabilityId() {
		return itSecSbAvailabilityId;
	}
	public void setItSecSbAvailabilityId(Long itSecSbAvailabilityId) {
		this.itSecSbAvailabilityId = itSecSbAvailabilityId;
	}
//	public String getItSecSbAvailabilityTxt() {
//		return itSecSbAvailabilityTxt;
//	}
//	public void setItSecSbAvailabilityTxt(String itSecSbAvailabilityTxt) {
//		this.itSecSbAvailabilityTxt = itSecSbAvailabilityTxt;
//	}
	public String getItSecSbAvailabilityDescription() {
		return itSecSbAvailabilityDescription;
	}
	public void setItSecSbAvailabilityDescription(String itSecSbAvailabilityDescription) {
		this.itSecSbAvailabilityDescription = itSecSbAvailabilityDescription;
	}

	public Long getClassInformationId() {
		return classInformationId;
	}
	public void setClassInformationId(Long classInformationId) {
		this.classInformationId = classInformationId;
	}
	public String getClassInformationExplanation() {
		return classInformationExplanation;
	}
	public void setClassInformationExplanation(String classInformationExplanation) {
		this.classInformationExplanation = classInformationExplanation;
	}
}
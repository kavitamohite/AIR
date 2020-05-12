package com.bayerbbs.applrepos.service;

import java.io.Serializable;

public class SisoogleParameterInput implements Serializable {

	private static final long serialVersionUID = 2893884855221589067L;

	/* the attribute to look for */
	String targetAttribut;
	
	/* the attributes for filtering */
	String ciType;
	String responsible;
	String responsibleOE;
	String subResponsible;
	String subResponsibleOE;
	/*--ELERJ ICS--*/
//	String relevanceICS;
	String relevanceItsec;
	String itsecGroup;
	String itSet;
	String operationalStatus;
	String lifecycle;
	String osTyp;
	String osName;
	String applicationCat2;
	String activeYN;
	String insertQuelle;
	String severityLevel;
	String gapResponsible;
	String gapEndDate;
	
	public String getTargetAttribut() {
		return targetAttribut;
	}
	public void setTargetAttribut(String targetAttribut) {
		this.targetAttribut = targetAttribut;
	}
	public String getCiType() {
		return ciType;
	}
	public void setCiType(String ciType) {
		this.ciType = ciType;
	}
	public String getResponsible() {
		return responsible;
	}
	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}
	public String getResponsibleOE() {
		return responsibleOE;
	}
	public void setResponsibleOE(String responsibleOE) {
		this.responsibleOE = responsibleOE;
	}
	public String getSubResponsible() {
		return subResponsible;
	}
	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}
	public String getSubResponsibleOE() {
		return subResponsibleOE;
	}
	public void setSubResponsibleOE(String subResponsibleOE) {
		this.subResponsibleOE = subResponsibleOE;
	}
/*	public String getRelevanceICS() {
		return relevanceICS;
	}
	public void setRelevanceICS(String relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
*/	public String getRelevanceItsec() {
		return relevanceItsec;
	}
	public void setRelevanceItsec(String relevanceItsec) {
		this.relevanceItsec = relevanceItsec;
	}
	public String getItsecGroup() {
		return itsecGroup;
	}
	public void setItsecGroup(String itsecGroup) {
		this.itsecGroup = itsecGroup;
	}
	public String getItSet() {
		return itSet;
	}
	public void setItSet(String itSet) {
		this.itSet = itSet;
	}
	public String getOperationalStatus() {
		return operationalStatus;
	}
	public void setOperationalStatus(String operationalStatus) {
		this.operationalStatus = operationalStatus;
	}
	public String getLifecycle() {
		return lifecycle;
	}
	public void setLifecycle(String lifecycle) {
		this.lifecycle = lifecycle;
	}
	public String getOsTyp() {
		return osTyp;
	}
	public void setOsTyp(String osTyp) {
		this.osTyp = osTyp;
	}
	public String getOsName() {
		return osName;
	}
	public void setOsName(String osName) {
		this.osName = osName;
	}
	public String getApplicationCat2() {
		return applicationCat2;
	}
	public void setApplicationCat2(String applicationCat2) {
		this.applicationCat2 = applicationCat2;
	}
	public String getActiveYN() {
		return activeYN;
	}
	public void setActiveYN(String activeYN) {
		this.activeYN = activeYN;
	}
	public String getInsertQuelle() {
		return insertQuelle;
	}
	public void setInsertQuelle(String insertQuelle) {
		this.insertQuelle = insertQuelle;
	}
	public String getSeverityLevel() {
		return severityLevel;
	}
	public void setSeverityLevel(String severityLevel) {
		this.severityLevel = severityLevel;
	}
	public String getGapResponsible() {
		return gapResponsible;
	}
	public void setGapResponsible(String gapResponsible) {
		this.gapResponsible = gapResponsible;
	}
	public String getGapEndDate() {
		return gapEndDate;
	}
	public void setGapEndDate(String gapEndDate) {
		this.gapEndDate = gapEndDate;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}

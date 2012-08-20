package com.bayerbbs.applrepos.dto;

import com.bayerbbs.applrepos.constants.ApplreposConstants;

public class ApplicationAccessDTO {

	private String relevanceOperational = ApplreposConstants.NO_SHORT;
	private String relevanceStrategic = ApplreposConstants.NO_SHORT;
	
	private String License_Scanning = ApplreposConstants.NO_SHORT;
	private String Responsible = ApplreposConstants.NO_SHORT;
	private String Sub_Responsible = ApplreposConstants.NO_SHORT;
	private String Relevance_Ics = ApplreposConstants.NO_SHORT;
	private String Relevanz_Itsec = ApplreposConstants.NO_SHORT;
	private String Gxp_Flag = ApplreposConstants.NO_SHORT;
	private String Ref_Id = ApplreposConstants.NO_SHORT;
	private String Itsec_Gruppe_Id = ApplreposConstants.NO_SHORT;
	private String Sample_Test_Date = ApplreposConstants.NO_SHORT;
	private String Sample_Test_Result = ApplreposConstants.NO_SHORT;
	private String Sla_Id = ApplreposConstants.NO_SHORT;
	private String Service_Contract_Id = ApplreposConstants.NO_SHORT;
	private String Priority_Level_Id = ApplreposConstants.NO_SHORT;
	private String Severity_Level_Id = ApplreposConstants.NO_SHORT;
	private String Business_Essential_Id = ApplreposConstants.NO_SHORT;
	private String Itsec_SB_Integ_ID = ApplreposConstants.NO_SHORT;
	private String Itsec_SB_Integ_Txt = ApplreposConstants.NO_SHORT;
	private String Itsec_SB_Verfg_ID = ApplreposConstants.NO_SHORT;
	private String Itsec_SB_Verfg_Txt = ApplreposConstants.NO_SHORT;
	private String Itsec_SB_Vertr_ID = ApplreposConstants.NO_SHORT;
	private String Itsec_SB_Vertr_Txt = ApplreposConstants.NO_SHORT;
	
	public void setAllEditable() {
		License_Scanning = ApplreposConstants.YES_SHORT;
		Responsible = ApplreposConstants.YES_SHORT;
		Sub_Responsible = ApplreposConstants.YES_SHORT;
		Relevance_Ics = ApplreposConstants.YES_SHORT;
		Relevanz_Itsec = ApplreposConstants.YES_SHORT;
		Gxp_Flag = ApplreposConstants.YES_SHORT;
		Ref_Id = ApplreposConstants.YES_SHORT;
		Itsec_Gruppe_Id = ApplreposConstants.YES_SHORT;
		Sample_Test_Date = ApplreposConstants.YES_SHORT;
		Sample_Test_Result = ApplreposConstants.YES_SHORT;
		Sla_Id = ApplreposConstants.YES_SHORT;
		Service_Contract_Id = ApplreposConstants.YES_SHORT;
		Priority_Level_Id = ApplreposConstants.YES_SHORT;
		Severity_Level_Id = ApplreposConstants.YES_SHORT;
		// Business_Essential_Id = ApplreposConstants.YES_SHORT; only by group
		Itsec_SB_Integ_ID = ApplreposConstants.YES_SHORT;
		Itsec_SB_Integ_Txt = ApplreposConstants.YES_SHORT;
		Itsec_SB_Verfg_ID = ApplreposConstants.YES_SHORT;
		Itsec_SB_Verfg_Txt = ApplreposConstants.YES_SHORT;
		Itsec_SB_Vertr_ID = ApplreposConstants.YES_SHORT;
		Itsec_SB_Vertr_Txt = ApplreposConstants.YES_SHORT;
	}
	
	public String getLicense_Scanning() {
		return License_Scanning;
	}
	public void setLicense_Scanning(String licenseScanning) {
		License_Scanning = licenseScanning;
	}
	public String getResponsible() {
		return Responsible;
	}
	public void setResponsible(String responsible) {
		Responsible = responsible;
	}
	public String getSub_Responsible() {
		return Sub_Responsible;
	}
	public void setSub_Responsible(String subResponsible) {
		Sub_Responsible = subResponsible;
	}
	public String getRelevance_Ics() {
		return Relevance_Ics;
	}
	public void setRelevance_Ics(String relevanceIcs) {
		Relevance_Ics = relevanceIcs;
	}
	public String getRelevanz_Itsec() {
		return Relevanz_Itsec;
	}
	public void setRelevanz_Itsec(String relevanzItsec) {
		Relevanz_Itsec = relevanzItsec;
	}
	public String getGxp_Flag() {
		return Gxp_Flag;
	}
	public void setGxp_Flag(String gxpFlag) {
		Gxp_Flag = gxpFlag;
	}
	public String getRef_Id() {
		return Ref_Id;
	}
	public void setRef_Id(String refId) {
		Ref_Id = refId;
	}
	public String getItsec_Gruppe_Id() {
		return Itsec_Gruppe_Id;
	}
	public void setItsec_Gruppe_Id(String itsecGruppeId) {
		Itsec_Gruppe_Id = itsecGruppeId;
	}
	public String getSample_Test_Date() {
		return Sample_Test_Date;
	}
	public void setSample_Test_Date(String sampleTestDate) {
		Sample_Test_Date = sampleTestDate;
	}
	public String getSample_Test_Result() {
		return Sample_Test_Result;
	}
	public void setSample_Test_Result(String sampleTestResult) {
		Sample_Test_Result = sampleTestResult;
	}
	public String getSla_Id() {
		return Sla_Id;
	}
	public void setSla_Id(String slaId) {
		Sla_Id = slaId;
	}
	public String getService_Contract_Id() {
		return Service_Contract_Id;
	}
	public void setService_Contract_Id(String serviceContractId) {
		Service_Contract_Id = serviceContractId;
	}
	public String getPriority_Level_Id() {
		return Priority_Level_Id;
	}
	public void setPriority_Level_Id(String priorityLevelId) {
		Priority_Level_Id = priorityLevelId;
	}
	public String getSeverity_Level_Id() {
		return Severity_Level_Id;
	}
	public void setSeverity_Level_Id(String severityLevelId) {
		Severity_Level_Id = severityLevelId;
	}
	public String getBusiness_Essential_Id() {
		return Business_Essential_Id;
	}
	public void setBusiness_Essential_Id(String businessEssentialId) {
		Business_Essential_Id = businessEssentialId;
	}
	public String getItsec_SB_Integ_ID() {
		return Itsec_SB_Integ_ID;
	}
	public void setItsec_SB_Integ_ID(String itsecSBIntegID) {
		Itsec_SB_Integ_ID = itsecSBIntegID;
	}
	public String getItsec_SB_Integ_Txt() {
		return Itsec_SB_Integ_Txt;
	}
	public void setItsec_SB_Integ_Txt(String itsecSBIntegTxt) {
		Itsec_SB_Integ_Txt = itsecSBIntegTxt;
	}
	public String getItsec_SB_Verfg_ID() {
		return Itsec_SB_Verfg_ID;
	}
	public void setItsec_SB_Verfg_ID(String itsecSBVerfgID) {
		Itsec_SB_Verfg_ID = itsecSBVerfgID;
	}
	public String getItsec_SB_Verfg_Txt() {
		return Itsec_SB_Verfg_Txt;
	}
	public void setItsec_SB_Verfg_Txt(String itsecSBVerfgTxt) {
		Itsec_SB_Verfg_Txt = itsecSBVerfgTxt;
	}
	public String getItsec_SB_Vertr_ID() {
		return Itsec_SB_Vertr_ID;
	}
	public void setItsec_SB_Vertr_ID(String itsecSBVertrID) {
		Itsec_SB_Vertr_ID = itsecSBVertrID;
	}
	public String getItsec_SB_Vertr_Txt() {
		return Itsec_SB_Vertr_Txt;
	}
	public void setItsec_SB_Vertr_Txt(String itsecSBVertrTxt) {
		Itsec_SB_Vertr_Txt = itsecSBVertrTxt;
	}

	public String getRelevanceOperational() {
		return relevanceOperational;
	}

	public void setRelevanceOperational(String relevanceOperational) {
		this.relevanceOperational = relevanceOperational;
	}

	public String getRelevanceStrategic() {
		return relevanceStrategic;
	}

	public void setRelevanceStrategic(String relevanceStrategic) {
		this.relevanceStrategic = relevanceStrategic;
	}
	
}

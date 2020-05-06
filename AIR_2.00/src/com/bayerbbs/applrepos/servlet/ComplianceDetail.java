/**
 * 
 */
package com.bayerbbs.applrepos.servlet;

/**
 * @author equuw
 *
 */
public class ComplianceDetail {
	
	private String indent;
	private String control;
	private String complianceStatus;
	private String justification;
//	private String ReICSSecurity;
	private String GStoolId;
	
	//IM0006372483 partly implemented controls not in AIR Report  GAP
	private String gap;
	private String gapResponsible;
	private String planOfAction;
	private String gapEndDate;
	private String gapPriority;
	//end IM0006372483
	
	/**
	 * @return the indent
	 */
	public String getIndent() {
		return indent;
	}
	/**
	 * @param indent the indent to set
	 */
	public void setIndent(String indent) {
		this.indent = indent;
	}
	/**
	 * @return the control
	 */
	public String getControl() {
		return control;
	}
	/**
	 * @param control the control to set
	 */
	public void setControl(String control) {
		this.control = control;
	}
	/**
	 * @return the complianceStatus
	 */
	public String getComplianceStatus() {
		return complianceStatus;
	}
	/**
	 * @param complianceStatus the complianceStatus to set
	 */
	public void setComplianceStatus(String complianceStatus) {
		this.complianceStatus = complianceStatus;
	}
	/**
	 * @return the justification
	 */
	public String getJustification() {
		return justification;
	}
	/**
	 * @param justification the justification to set
	 */
	public void setJustification(String justification) {
		this.justification = justification;
	}
	/**
	 * @return the reICSSecurity
	 */
	
	/*ELERJ ICS*/
	/*public String getReICSSecurity() {
		return ReICSSecurity;
	}
	*//**
	 * @param reICSSecurity the reICSSecurity to set
	 *//*
	public void setReICSSecurity(String reICSSecurity) {
		ReICSSecurity = reICSSecurity;
	}*/
	/**
	 * @return the gStoolId
	 */
	public String getGStoolId() {
		return GStoolId;
	}
	/**
	 * @param gStoolId the gStoolId to set
	 */
	public void setGStoolId(String gStoolId) {
		GStoolId = gStoolId;
	}
	public String getGap() {
		return gap;
	}
	public void setGap(String gap) {
		this.gap = gap;
	}
	public String getGapResponsible() {
		return gapResponsible;
	}
	public void setGapResponsible(String gapResponsible) {
		this.gapResponsible = gapResponsible;
	}
	public String getPlanOfAction() {
		return planOfAction;
	}
	public void setPlanOfAction(String planOfAction) {
		this.planOfAction = planOfAction;
	}
	public String getGapEndDate() {
		return gapEndDate;
	}
	public void setGapEndDate(String gapEndDate) {
		this.gapEndDate = gapEndDate;
	}
	public String getGapPriority() {
		return gapPriority;
	}
	public void setGapPriority(String gapPriority) {
		this.gapPriority = gapPriority;
	}
	
	
	

}

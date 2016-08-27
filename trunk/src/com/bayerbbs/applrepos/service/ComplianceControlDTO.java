/**
 * 
 */
package com.bayerbbs.applrepos.service;

/**
 * @author EQUUW
 *
 */
public class ComplianceControlDTO {

	private Long itsec_Massn_St_Id;
	private String control;
	private String compliance_status;
	private String justification;
	private String ident;

	
	/**
	 * @return the itsec_Massn_St_Id
	 */
	public Long getItsec_Massn_St_Id() {
		return itsec_Massn_St_Id;
	}
	/**
	 * @param itsec_Massn_St_Id the itsec_Massn_St_Id to set
	 */
	public void setItsec_Massn_St_Id(Long itsec_Massn_St_Id) {
		this.itsec_Massn_St_Id = itsec_Massn_St_Id;
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
	 * @return the compliance_status
	 */
	public String getCompliance_status() {
		return compliance_status;
	}
	/**
	 * @param compliance_status the compliance_status to set
	 */
	public void setCompliance_status(String compliance_status) {
		this.compliance_status = compliance_status;
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
	 * @return the ident
	 */
	public String getIdent() {
		return ident;
	}
	/**
	 * @param ident the ident to set
	 */
	public void setIdent(String ident) {
		this.ident = ident;
	}
	
	
}

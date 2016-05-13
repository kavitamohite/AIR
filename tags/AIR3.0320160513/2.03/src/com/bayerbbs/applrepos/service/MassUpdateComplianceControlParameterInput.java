/**
 * 
 */
package com.bayerbbs.applrepos.service;

/**
 * @author EQUUW
 * 
 */
public class MassUpdateComplianceControlParameterInput {

	private String selectedItsecMassnStIds;
	private String token;
	private String cwid;
	private Long templateCiId;
	private Long ciTypeId;
	private Long ciSubTypeId;
	private String selectedCIs;
	

	/**
	 * @return the selectedItsecMassnStIds
	 */
	public String getSelectedItsecMassnStIds() {
		return selectedItsecMassnStIds;
	}

	/**
	 * @param selectedItsecMassnStIds
	 *            the selectedItsecMassnStIds to set
	 */
	public void setSelectedItsecMassnStIds(String selectedItsecMassnStIds) {
		this.selectedItsecMassnStIds = selectedItsecMassnStIds;
	}

	/**
	 * @return the token
	 */
	public String getToken() {
		return token;
	}

	/**
	 * @param token
	 *            the token to set
	 */
	public void setToken(String token) {
		this.token = token;
	}

	/**
	 * @return the cwid
	 */
	public String getCwid() {
		return cwid;
	}

	/**
	 * @param cwid
	 *            the cwid to set
	 */
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	/**
	 * @return the templateCiId
	 */
	public Long getTemplateCiId() {
		return templateCiId;
	}

	/**
	 * @param templateCiId
	 *            the templateCiId to set
	 */
	public void setTemplateCiId(Long templateCiId) {
		this.templateCiId = templateCiId;
	}

	/**
	 * @return the ciTypeId
	 */
	public Long getCiTypeId() {
		return ciTypeId;
	}

	/**
	 * @param ciTypeId
	 *            the ciTypeId to set
	 */
	public void setCiTypeId(Long ciTypeId) {
		this.ciTypeId = ciTypeId;
	}

	/**
	 * @return the ciSubTypeId
	 */
	public Long getCiSubTypeId() {
		return ciSubTypeId;
	}

	/**
	 * @param ciSubTypeId
	 *            the ciSubTypeId to set
	 */
	public void setCiSubTypeId(Long ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
	}

	/**
	 * @return the selectedCIs
	 */
	public String getSelectedCIs() {
		return selectedCIs;
	}

	/**
	 * @param selectedCIs
	 *            the selectedCIs to set
	 */
	public void setSelectedCIs(String selectedCIs) {
		this.selectedCIs = selectedCIs;
	}

}

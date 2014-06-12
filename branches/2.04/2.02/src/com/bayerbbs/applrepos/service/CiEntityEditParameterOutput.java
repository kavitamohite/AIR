package com.bayerbbs.applrepos.service;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.constants.AirKonstanten;

public class CiEntityEditParameterOutput {
	private String result;
	private String displayMessage;	// one message, that should be displayed to the user
	private String messages[];
	private Long ciId;
	private Integer tableId;
	private Integer ciSubTypeId;
	
	
	public CiEntityEditParameterOutput() {
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String[] getMessages() {
		return messages;
	}

	public void setMessages(String[] messages) {
		this.messages = messages;
	}

	public String getDisplayMessage() {
		return displayMessage;
	}

	public void setDisplayMessage(String displayMessage) {
		this.displayMessage = displayMessage;
	}

	public Long getCiId() {
		return ciId;
	}
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}

	public Integer getTableId() {
		return tableId;
	}
	public void setTableId(Integer tableId) {
		this.tableId = tableId;
	}
	
	public Integer getCiSubTypeId() {
		return ciSubTypeId;
	}
	public void setCiSubTypeId(Integer ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
	}

	
	public void setErrorMessage(String code) {
		setErrorMessage(code, null);
	}
	public void setErrorMessage(String code, String replacement) {
		setResult(AirKonstanten.RESULT_ERROR);
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();
		String detailedMessage = errorCodeManager.getErrorMessage(code, replacement);
		setMessages(new String[] { detailedMessage });		
	}

}

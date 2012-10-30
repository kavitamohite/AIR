package com.bayerbbs.applrepos.dto;

public class HistorySISecViewDataDTO {

	private Long historyEventId;
	private String change_Timestamp = null;
	private String userName = null;
	private String insUpdDel = null;
	// detail attributes
	private Long historyDetailId;
	private String chgAttributeLog = null;
	private String oldValue = null;
	private String newValue = null;
	private Integer displayType = null;
	
	public HistorySISecViewDataDTO(Long historyEventId, String change_Timestamp, String userName, String insUpdDel, Long historyDetailId, String chgAttributeLog, String oldValue, String newValue, Integer displayType) {
		this.historyEventId = historyEventId;
		this.change_Timestamp = change_Timestamp;
		this.userName = userName;
		this.insUpdDel = insUpdDel;
		this.historyDetailId = historyDetailId;
		this.chgAttributeLog = chgAttributeLog;
		this.oldValue = oldValue;
		this.newValue = newValue;
		this.displayType = displayType;
	}

	public Long getHistoryEventId() {
		return historyEventId;
	}
	public void setHistoryEventId(Long historyEventId) {
		this.historyEventId = historyEventId;
	}
	public String getChange_Timestamp() {
		return change_Timestamp;
	}
	public void setChange_Timestamp(String change_Timestamp) {
		this.change_Timestamp = change_Timestamp;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getInsUpdDel() {
		return insUpdDel;
	}
	public void setInsUpdDel(String insUpdDel) {
		this.insUpdDel = insUpdDel;
	}
	
}

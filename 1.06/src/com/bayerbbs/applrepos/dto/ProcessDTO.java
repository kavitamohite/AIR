package com.bayerbbs.applrepos.dto;

public class ProcessDTO {

	private Long processId;
	private String processName;
	private String processOwner;
	private String processManager;
	
	public Long getProcessId() {
		return processId;
	}
	public void setProcessId(Long processId) {
		this.processId = processId;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getProcessOwner() {
		return processOwner;
	}
	public void setProcessOwner(String processOwner) {
		this.processOwner = processOwner;
	}
	public String getProcessManager() {
		return processManager;
	}
	public void setProcessManager(String processManager) {
		this.processManager = processManager;
	}
	
}

package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.HistorySISecViewDataDTO;

public class HistoryComplianceParameterOutput {

	private HistorySISecViewDataDTO aHistoryDTO[];

	public HistoryComplianceParameterOutput() {
	}
	
	public HistorySISecViewDataDTO[] getHistoryDTO() {
		return aHistoryDTO;
	}

	public void setHistoryDTO(HistorySISecViewDataDTO[] aHistoryDTO) {
		this.aHistoryDTO = aHistoryDTO;
	}
	
}

package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.dto.HistorySISecViewDataDTO;
import com.bayerbbs.applrepos.hibernate.HistoryHbn;

public class HistoryComplianceWS {

	
	public HistoryComplianceParameterOutput findHistoryList(HistoryComplianceParameterInput input) {
		HistoryComplianceParameterOutput output = new HistoryComplianceParameterOutput();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {

			List<HistorySISecViewDataDTO> listHistory = HistoryHbn.findHistoryList(input.getTableId(), input.getTablePkId());

			HistorySISecViewDataDTO arrayResult[] = new HistorySISecViewDataDTO[listHistory.size()];
			output.setHistoryDTO(listHistory.toArray(arrayResult));
		}
		
		return output;
	}

}

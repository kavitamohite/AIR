package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.dto.DwhEntityDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitesHbn;

public class CiEntityWS {

	public CiEntityParameterOutput findCiEntities(CiEntityParameterInput input) {
		
		CiEntityParameterOutput output = new CiEntityParameterOutput();
		
		List<ViewDataDTO> listDTO = CiEntitesHbn.findCisByTypeAndNameOrAlias(input.getType(), input.getQuery());
		
		if (listDTO.size() > 0) {
			output.setViewdataDTO(getViewDataArray(listDTO));
		}
		return output;
	}

	
	private static ViewDataDTO[] getViewDataArray(List<ViewDataDTO> listDTO) {
		ViewDataDTO aViewDataDTO[] = null;
		if (null != listDTO && !listDTO.isEmpty()) {
			aViewDataDTO = new ViewDataDTO[listDTO.size()];
			for (int i = 0; i < aViewDataDTO.length; i++) {
				aViewDataDTO[i] = listDTO.get(i);
			}
		}
		return aViewDataDTO;
	}
	
	public DwhEntityDTO[] findByTypeAndName(CiEntityParameterInput input) {//String ciType, String ciName
		DwhEntityDTO[] dwhEntities = new DwhEntityDTO[0];
		
		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			dwhEntities = CiEntitesHbn.findByTypeAndName(input.getType(), input.getQuery(), input.getStart(), input.getLimit());
		
		
		return dwhEntities;
	}
}
package com.bayerbbs.applrepos.service;


import java.util.ArrayList;
import java.util.List;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.BusinessApplicationDTO;
import com.bayerbbs.applrepos.domain.BusinessApplicationEditParameterInput;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.BusinessApplicationHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;


public class BusinessApplicationWS {

	/*public CiEntityEditParameterOutput createBusinessApplication(BusinessApplicationEditParameterInput input) {
		
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ){
			BusinessApplicationDTO businessApplicationDTO = getBusinessApplicationDTOFromFromEditInput(input);
			output = BusinessApplicationHbn.createBusinessApplication(input.getCwid(), businessApplicationDTO, true);			
		}
		return output;
	}*/


	public CiEntityEditParameterOutput saveBusinessApplication(BusinessApplicationEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))){
			BusinessApplicationDTO businessApplicationDTO = getBusinessApplicationDTOFromFromEditInput(input);
			output = BusinessApplicationHbn.saveBusinessApplication(businessApplicationDTO,input.getCwid());
		}
		return output;
		
	}
	
	protected BusinessApplicationDTO getBusinessApplicationDTOFromFromEditInput(BusinessApplicationEditParameterInput input){
		BusinessApplicationDTO businessApplicationDTO = new BusinessApplicationDTO();
		//functionDTO.setTableId(AirKonstanten.TABLE_ID_SITE);
		businessApplicationDTO.setTableId(AirKonstanten.TABLE_ID_BUSINESS_APPLICATION);
		//Specifics
		businessApplicationDTO.setId(input.getId());
		
		// connections
		businessApplicationDTO.setUpStreamAdd(input.getUpStreamAdd());
		businessApplicationDTO.setUpStreamDelete(input.getUpStreamDelete());
		businessApplicationDTO.setDownStreamAdd(input.getDownStreamAdd());
		businessApplicationDTO.setDownStreamDelete(input.getDownStreamDelete());
		
		
		
		return businessApplicationDTO;
		
	}
	
	
		
}


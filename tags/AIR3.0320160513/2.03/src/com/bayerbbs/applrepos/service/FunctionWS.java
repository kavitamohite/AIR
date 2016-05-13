/**
 * 
 */
package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Function;
import com.bayerbbs.applrepos.domain.FunctionDTO;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.hibernate.PathwayHbn;
import com.bayerbbs.applrepos.hibernate.functionHbn;

/**
 * @author equuw
 *
 */
public class FunctionWS {
	
	
	public CiEntityEditParameterOutput createFunction(BaseEditParameterInput input) {
		
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ){
			FunctionDTO functionDTO = getFunctionDTOFromFromEditInput(input);
			output = functionHbn.createFunction(input.getCwid(), functionDTO, true);			
		}
		return output;
	}
	
	public CiEntityEditParameterOutput saveFunction(BaseEditParameterInput input){
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))){
			FunctionDTO functionDTO = getFunctionDTOFromFromEditInput(input);
			output = functionHbn.saveFunction(functionDTO,input.getCwid());
		}
		return output;
		
	}
	
	protected FunctionDTO getFunctionDTOFromFromEditInput(BaseEditParameterInput input){
		FunctionDTO functionDTO = new FunctionDTO();
		//functionDTO.setTableId(AirKonstanten.TABLE_ID_SITE);//commented by vandana
		functionDTO.setTableId(AirKonstanten.TABLE_ID_FUNCTION);
		//Specifics
		functionDTO.setId(input.getId());
		functionDTO.setName(input.getName());


		
		//Contacts
		functionDTO.setCiOwner(input.getCiOwner());
		functionDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		functionDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		functionDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());


		
		//Compliance
		functionDTO.setItset(input.getItset());
		functionDTO.setTemplate(input.getTemplate());
		functionDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		functionDTO.setRefId(input.getRefId());
		
		functionDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		functionDTO.setRelevanceGR1920(input.getRelevanceGR1920());

		functionDTO.setGxpFlag(input.getGxpFlag());
		functionDTO.setGxpFlagId(input.getGxpFlag());
		
		return functionDTO;
		
	}
}

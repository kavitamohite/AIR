/**
 * 
 */
package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Function;
import com.bayerbbs.applrepos.domain.FunctionDTO;
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
			if(AirKonstanten.RESULT_OK.equals(output.getResult())){
				Function function = functionHbn.findByName(input.getName());
				output.setCiId(function.getId());
			}
			
		}
		return output;
	}
	
	protected FunctionDTO getFunctionDTOFromFromEditInput(BaseEditParameterInput input){
		FunctionDTO functionDTO = new FunctionDTO();
		functionDTO.setTableId(AirKonstanten.TABLE_ID_SITE);
		
		//Specifics
		functionDTO.setId(input.getId());
		functionDTO.setName(input.getName());


		
		//Contacts
		functionDTO.setCiOwner(input.getCiOwner());
		functionDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		functionDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		functionDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		functionDTO.setSlaId(input.getSlaId());
		functionDTO.setServiceContractId(input.getServiceContractId());

		
		//Protection
		functionDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		functionDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
//		functionDTO.setClassInformationId(input.getClassInformationId());
//		functionDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		functionDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		functionDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());
		functionDTO.setItSecSbConfidentialityId(input.getItSecSbConfidentialityId());
		functionDTO.setItSecSbConfidentialityTxt(input.getItSecSbConfidentialityTxt());
		
		//Compliance
		functionDTO.setItset(input.getItset());
		functionDTO.setTemplate(input.getTemplate());
		functionDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		functionDTO.setRefId(input.getRefId());
		
		functionDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		functionDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		functionDTO.setRelevanceICS(input.getRelevanceICS());
//		functionDTO.setRelevanzItsec(input.getRelevanzITSEC());
		functionDTO.setGxpFlag(input.getGxpFlag());
		functionDTO.setGxpFlagId(input.getGxpFlag());
		
		functionDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		functionDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		functionDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		functionDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		functionDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		functionDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		functionDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		functionDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		functionDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		functionDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		functionDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		functionDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		functionDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		functionDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		functionDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		functionDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		functionDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		functionDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		functionDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		functionDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		functionDTO.setDownStreamAdd(input.getDownStreamAdd());
		functionDTO.setDownStreamDelete(input.getDownStreamDelete());
		return functionDTO;
		
	}

}

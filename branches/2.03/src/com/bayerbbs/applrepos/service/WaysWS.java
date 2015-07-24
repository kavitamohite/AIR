/**
 * 
 */
package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.PathwayHbn;

/**
 * @author eokeg
 *
 */
public class WaysWS {
	
	
	public CiEntityEditParameterOutput createWays(BaseEditParameterInput input) {
		
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ){
			PathwayDTO pathwayDTO = getPathwayDTOFromFromEditInput(input);
			
			String strItSet = ApplReposHbn.getItSetFromCwid(input.getCwid());
			if (null != strItSet) {
				pathwayDTO.setItset(Long.valueOf(strItSet));
			}else{
				pathwayDTO.setItset(AirKonstanten.IT_SET_DEFAULT);
			}
			output = PathwayHbn.createPathway(input.getCwid(), pathwayDTO, true);
			if(AirKonstanten.RESULT_OK.equals(output.getResult())){
				Ways way = PathwayHbn.findByName(input.getName());
				output.setCiId(way.getId());
			}
			
		}
		return output;
	}
	
	public CiEntityEditParameterOutput saveWays(BaseEditParameterInput input){
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))){
			PathwayDTO pathwayDTO = getPathwayDTOFromFromEditInput(input);
			output = PathwayHbn.saveWays(pathwayDTO,input.getCwid());
		}
		return output;
	}
	
	protected PathwayDTO getPathwayDTOFromFromEditInput(BaseEditParameterInput input){
		PathwayDTO pathwayDTO = new PathwayDTO();
		//pathwayDTO.setTableId(AirKonstanten.TABLE_ID_SITE);//commented by vandana
		pathwayDTO.setTableId(AirKonstanten.TABLE_ID_WAYS);
		//Specifics
		pathwayDTO.setId(input.getId());
		pathwayDTO.setName(input.getName());


		
		//Contacts
		pathwayDTO.setCiOwner(input.getCiOwner());
		pathwayDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		pathwayDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		pathwayDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		pathwayDTO.setSlaId(input.getSlaId());
		pathwayDTO.setServiceContractId(input.getServiceContractId());

		
		//Protection
		pathwayDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		pathwayDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
//		pathwayDTO.setClassInformationId(input.getClassInformationId());
//		pathwayDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		pathwayDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		pathwayDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());
		pathwayDTO.setItSecSbConfidentialityId(input.getItSecSbConfidentialityId());
		pathwayDTO.setItSecSbConfidentialityTxt(input.getItSecSbConfidentialityTxt());
		
		//Compliance
		pathwayDTO.setItset(input.getItset());
		pathwayDTO.setTemplate(input.getTemplate());
		pathwayDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		pathwayDTO.setRefId(input.getRefId());
		
		pathwayDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		pathwayDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		pathwayDTO.setRelevanceICS(input.getRelevanceICS());
//		pathwayDTO.setRelevanzItsec(input.getRelevanzITSEC());
		pathwayDTO.setGxpFlag(input.getGxpFlag());
		pathwayDTO.setGxpFlagId(input.getGxpFlag());
		
		pathwayDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		pathwayDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		pathwayDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		pathwayDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		pathwayDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		pathwayDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		pathwayDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		pathwayDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		pathwayDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		pathwayDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		pathwayDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		pathwayDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		pathwayDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		pathwayDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		pathwayDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		pathwayDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		pathwayDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		pathwayDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		pathwayDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		pathwayDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		pathwayDTO.setDownStreamAdd(input.getDownStreamAdd());
		pathwayDTO.setDownStreamDelete(input.getDownStreamDelete());
		return pathwayDTO;
		
	}

}

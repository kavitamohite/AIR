/**
 * 
 */
package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.ComplianceHbn;
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
	//	pathwayDTO.setSlaId(input.getSlaId());
		//pathwayDTO.setServiceContractId(input.getServiceContractId());

		
		//Protection
		pathwayDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		pathwayDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
		pathwayDTO.setClassInformationId(input.getClassInformationId());
		pathwayDTO.setClassInformationTxt(input.getClassInformationExplanation());
		pathwayDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		pathwayDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());

		
		//Compliance
		pathwayDTO.setItset(input.getItset());
		pathwayDTO.setTemplate(input.getTemplate());
		pathwayDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		pathwayDTO.setRefId(input.getRefId());
		
		pathwayDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		/*--ELERJ ICS--*/
//		pathwayDTO.setRelevanceGR1920(input.getRelevanceGR1920());
		//EUGXS
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
		pathwayDTO.setRelevanceCD3010(input.getRelevanceCD3010());
		pathwayDTO.setRelevanceCD3011(input.getRelevanceCD3011());
		/*--ELERJ GXP---*/
//		pathwayDTO.setGxpFlag(input.getGxpFlag());
//		pathwayDTO.setGxpFlagId(input.getGxpFlag());
		
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
	//Added by vandana for ways copy
	public static void createWayByCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			PathwayDTO dto = new PathwayDTO();
			Ways waySource = PathwayHbn.findById(copyInput.getCiIdSource());

			if (null != waySource) {
				PathwayHbn.getWays(dto, waySource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(waySource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(waySource.getCiOwnerDelegate());
				dto.setTemplate(waySource.getTemplate());
				
				dto.setRelevanzItsec(waySource.getRelevanceITSEC());
				/*--ELERJ ICS--*/
//				dto.setRelevanceICS(waySource.getRelevanceICS());
				//EUGXS
				//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
				List<CiComplianceRequest> ComplianceIDS = ComplianceHbn.getCiCompliance_request(AirKonstanten.TABLE_ID_WAYS,waySource.getId());

				for(int i =0; i<ComplianceIDS.size(); i++ ){

					if(ComplianceIDS.get(i).getComplianceRequestId() == 5){
						dto.setRelevanceCD3010(AirKonstanten.YES_SHORT);
					}

					if(ComplianceIDS.get(i).getComplianceRequestId() == 6){
						dto.setRelevanceCD3011(AirKonstanten.YES_SHORT);
					}
				}


				if(waySource.getRelevanceITSEC() == -1)
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}

				/*if(waySource.getRelevanceICS() == -1)
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}*/
				
				// save / create itSystem
				dto.setId(waySource.getWaysId());
				CiEntityEditParameterOutput createOutput = PathwayHbn.createPathway(copyInput.getCwid(), dto, true);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Ways ways = PathwayHbn.findByName(copyInput.getCiNameTarget());
					if (null != ways) {
						dto.setId(ways.getId());
						
						Long ciId = ways.getId();
						Ways wayTarget = PathwayHbn.findById(ciId);
						
						if (null != wayTarget) {
							CiEntityEditParameterOutput temp = PathwayHbn.copyPathway(copyInput.getCwid(), waySource.getId(), wayTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
							
							if (null != temp) {
								output.setCiId(temp.getCiId());
								output.setResult(temp.getResult());
								output.setMessages(temp.getMessages());
								output.setDisplayMessage(temp.getDisplayMessage());
							}
						}
					}
				}
				else {
					output.setCiId(createOutput.getCiId());
					output.setResult(createOutput.getResult());
					output.setMessages(createOutput.getMessages());
					output.setDisplayMessage(createOutput.getDisplayMessage());
				}
			}
		}

		if (null == output.getDisplayMessage() && null != output.getMessages()) {
			output.setDisplayMessage(output.getMessages()[0]);
		}
	}




}

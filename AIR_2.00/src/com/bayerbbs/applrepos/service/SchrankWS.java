package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.SchrankDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.ComplianceHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;

public class SchrankWS {
	protected SchrankDTO getSchrankDTOFromEditInput(SchrankEditParameterInput input) {
		SchrankDTO schrankDTO = new SchrankDTO();
		schrankDTO.setTableId(AirKonstanten.TABLE_ID_POSITION);
		
		schrankDTO.setId(input.getId());
		schrankDTO.setName(input.getName());
		schrankDTO.setRoomId(input.getRoomId());
		
		schrankDTO.setCiOwner(input.getCiOwner());
		schrankDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		schrankDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		schrankDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//schrankDTO.setSlaId(input.getSlaId());
		//schrankDTO.setServiceContractId(input.getServiceContractId());
		//schrankDTO.setSeverityLevelId(input.getSeverityLevelId());
		schrankDTO.setBusinessEssentialId(input.getBusinessEssentialId());
		
		schrankDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		schrankDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
		schrankDTO.setClassInformationId(input.getClassInformationId());
		schrankDTO.setClassInformationTxt(input.getClassInformationExplanation());
		schrankDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		schrankDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());		
		
		schrankDTO.setItset(input.getItset());
		schrankDTO.setTemplate(input.getTemplate());
		schrankDTO.setItsecGroupId(input.getItSecGroupId());
		schrankDTO.setRefId(input.getRefId());
		
		schrankDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		schrankDTO.setRelevanceGR1920(input.getRelevanceGR1920());
		//EUGXS
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
		schrankDTO.setRelevanceCD3010(input.getRelevanceCD3010());
		schrankDTO.setRelevanceCD3011(input.getRelevanceCD3011());
//		ELERJ GXP
		/*schrankDTO.setGxpFlag(input.getGxpFlag());
		schrankDTO.setGxpFlagId(input.getGxpFlag());*/
		
		schrankDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		schrankDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		schrankDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		schrankDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		schrankDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		schrankDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		schrankDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		schrankDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		schrankDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		schrankDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		schrankDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		schrankDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		schrankDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		schrankDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		schrankDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		schrankDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		schrankDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		schrankDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		schrankDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		schrankDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		schrankDTO.setDownStreamAdd(input.getDownStreamAdd());
		schrankDTO.setDownStreamDelete(input.getDownStreamDelete());

		return schrankDTO;
	}
	
	public CiEntityEditParameterOutput saveSchrank(SchrankEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			SchrankDTO dto = getSchrankDTOFromEditInput(input);
			output = SchrankHbn.saveSchrank(input.getCwid(), dto);
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input.getCwid());
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput deleteSchrank(SchrankEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				SchrankDTO dto = getSchrankDTOFromEditInput(input);

				output = SchrankHbn.deleteSchrank(input.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}

	
	public CiEntityEditParameterOutput createSchrank(SchrankEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			SchrankDTO dto = getSchrankDTOFromEditInput(input);



			// save / create application
			output = SchrankHbn.createSchrank(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				Schrank schrank = SchrankHbn.findByNameAndRoomId(dto.getName(), dto.getRoomId());
				output.setCiId(schrank.getId());
				output.setTableId(AirKonstanten.TABLE_ID_POSITION);
				
				dto.setId(schrank.getId());
				BaseHbn.saveGpscContacts(dto, input.getCwid());
				
			} else {
				// TODO errorcodes / Texte
				if (null != output.getMessages() && output.getMessages().length > 0) {
					output.setDisplayMessage(output.getMessages()[0]);
				}
			}
		}

		return output;
	}

	public static void createPositionCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			SchrankDTO dto = new SchrankDTO();
			Schrank positionSource = SchrankHbn.findById(copyInput.getCiIdSource());

			if (null != positionSource) {
				SchrankHbn.getSchrank(dto, positionSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(positionSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(positionSource.getCiOwnerDelegate());
				dto.setTemplate(positionSource.getTemplate());
				
				dto.setRelevanzItsec(positionSource.getRelevanceITSEC());
				/*ELERJ ICS*/
//				dto.setRelevanceICS(positionSource.getRelevanceICS());
				//EUGXS
				//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
				List<CiComplianceRequest> ComplianceIDS = ComplianceHbn.getCiCompliance_request(AirKonstanten.TABLE_ID_POSITION,positionSource.getId());
				
				for(int i =0; i<ComplianceIDS.size(); i++ ){
				
					if(ComplianceIDS.get(i).getComplianceRequestId() == 5){
						dto.setRelevanceCD3010(AirKonstanten.YES_SHORT);
					}
					
					if(ComplianceIDS.get(i).getComplianceRequestId() == 6){
						dto.setRelevanceCD3011(AirKonstanten.YES_SHORT);
					}
				}
				
				if(positionSource.getRelevanceITSEC() == -1)
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}
				/*ELERJ ICS*/
			/*	if(positionSource.getRelevanceICS() == -1)
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}*/
				
				// save / create itSystem
				dto.setRoomId(positionSource.getRoomId());
				CiEntityEditParameterOutput createOutput = SchrankHbn.createSchrank(copyInput.getCwid(), dto, null);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Schrank schrank = SchrankHbn.findByNameAndRoomId(copyInput.getCiNameTarget(), positionSource.getRoomId());
					if (null != schrank) {
						dto.setId(schrank.getId());
						
						Long ciId = schrank.getId();
						Schrank schrankTarget = SchrankHbn.findById(ciId);
						
						if (null != schrankTarget) {
							CiEntityEditParameterOutput temp = SchrankHbn.copyPosition(copyInput.getCwid(), positionSource.getId(), schrankTarget.getId(), copyInput.getCiNameTarget());
							
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

	public KeyValueDTO[] findSchrankByRoomId(Long id) {
		return SchrankHbn.findSchrankByRoomId(id);
	}

}

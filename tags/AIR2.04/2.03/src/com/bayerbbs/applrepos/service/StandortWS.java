package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.KeyValueEnDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;

public class StandortWS {
	
	protected StandortDTO getStandortDTOFromEditInput(StandortEditParameterInput input) {
		StandortDTO standortDTO = new StandortDTO();
		standortDTO.setTableId(AirKonstanten.TABLE_ID_SITE);
		
		//Specifics
		standortDTO.setId(input.getId());//für RoomHbn.saveRoom
		standortDTO.setName(input.getName());//für RoomHbn.validateRoom
		standortDTO.setStandortCode(input.getStandortCode());
		standortDTO.setNameEn(input.getNameEn());
		standortDTO.setLandId(input.getLandId());

		
		//Contacts
		standortDTO.setCiOwner(input.getCiOwner());
		standortDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		standortDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		standortDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		standortDTO.setSlaId(input.getSlaId());
		standortDTO.setServiceContractId(input.getServiceContractId());

		
		//Protection
		standortDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		standortDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
//		standortDTO.setClassInformationId(input.getClassInformationId());
//		standortDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		standortDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		standortDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());
		standortDTO.setItSecSbConfidentialityId(input.getItSecSbConfidentialityId());
		standortDTO.setItSecSbConfidentialityTxt(input.getItSecSbConfidentialityTxt());
		
		//Compliance
		standortDTO.setItset(input.getItset());
		standortDTO.setTemplate(input.getTemplate());
		standortDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		standortDTO.setRefId(input.getRefId());
		
		standortDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		standortDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		standortDTO.setRelevanceICS(input.getRelevanceICS());
//		standortDTO.setRelevanzItsec(input.getRelevanzITSEC());
		standortDTO.setGxpFlag(input.getGxpFlag());
		standortDTO.setGxpFlagId(input.getGxpFlag());
		
		standortDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		standortDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		standortDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		standortDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		standortDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		standortDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		standortDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		standortDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		standortDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		standortDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		standortDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		standortDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		standortDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		standortDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		standortDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		standortDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		standortDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		standortDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		standortDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		standortDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		standortDTO.setDownStreamAdd(input.getDownStreamAdd());
		standortDTO.setDownStreamDelete(input.getDownStreamDelete());
		
		return standortDTO;
	}
	
	public CiEntityEditParameterOutput saveStandort(StandortEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			StandortDTO dto = getStandortDTOFromEditInput(input);
			output = StandortHbn.saveStandort(input.getCwid(), dto);
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input.getCwid());
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput deleteStandort(StandortEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				StandortDTO dto = getStandortDTOFromEditInput(input);

				output = StandortHbn.deleteStandort(input.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}

	
	public CiEntityEditParameterOutput createStandort(StandortEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			StandortDTO dto = getStandortDTOFromEditInput(input);

			// create Application - fill attributes
			if (null == dto.getCiOwner()) {
				dto.setCiOwner(input.getCwid().toUpperCase());
				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
			}


			// save / create application
			output = StandortHbn.createStandort(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				Standort standort = StandortHbn.findByNameAndCountryId(dto.getName(), dto.getLandId());
				output.setCiId(standort.getId());
				output.setTableId(AirKonstanten.TABLE_ID_SITE);
				
				dto.setId(standort.getId());
				BaseHbn.saveGpscContacts(dto, input.getCwid());
				
				/*
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_SITE, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
					output.setTableId(AirKonstanten.TABLE_ID_SITE);
				} else {
					// unknown?
					output.setCiId(new Long(-1));
				}*/
			} else {
				// TODO errorcodes / Texte
				if (null != output.getMessages() && output.getMessages().length > 0) {
					output.setDisplayMessage(output.getMessages()[0]);
				}
			}
		}

		return output;
	}

	public KeyValueEnDTO[] findSitesByLandId(Long id) {//DefaultDataInput input
		return StandortHbn.findSitesByLandId(id);//input
	}
	
	public static void createSiteCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			StandortDTO dto = new StandortDTO();
			Standort siteSource = StandortHbn.findById(copyInput.getCiIdSource());

			if (null != siteSource) {
				StandortHbn.getSite(dto, siteSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(siteSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(siteSource.getCiOwnerDelegate());
				dto.setTemplate(siteSource.getTemplate());
				
				dto.setRelevanzItsec(siteSource.getRelevanceITSEC());
				dto.setRelevanceICS(siteSource.getRelevanceICS());
				
				// save / create itSystem
				dto.setLandId(siteSource.getLandId());
				CiEntityEditParameterOutput createOutput = StandortHbn.createStandort(copyInput.getCwid(), dto, null);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Standort site = StandortHbn.findByNameAndCountryId(copyInput.getCiNameTarget(), siteSource.getLandId());
					if (null != site) {
						dto.setId(site.getId());
						
						Long ciId = site.getId();
						Standort siteTarget = StandortHbn.findById(ciId);
						
						if (null != siteTarget) {
							CiEntityEditParameterOutput temp = StandortHbn.copySite(copyInput.getCwid(), siteSource.getId(), siteTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
							
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

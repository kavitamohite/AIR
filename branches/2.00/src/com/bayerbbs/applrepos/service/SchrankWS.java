package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.SchrankDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
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

		schrankDTO.setSlaId(input.getSlaId());
		schrankDTO.setServiceContractId(input.getServiceContractId());
		schrankDTO.setSeverityLevelId(input.getSeverityLevelId());
		schrankDTO.setBusinessEssentialId(input.getBusinessEssentialId());
		
		schrankDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		schrankDTO.setItSecSbAvailabilityDescription(input.getItSecSbAvailabilityDescription());
//		schrankDTO.setClassInformationId(input.getClassInformationId());
//		schrankDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		
		schrankDTO.setItset(input.getItset());
		schrankDTO.setTemplate(input.getTemplate());
		schrankDTO.setItsecGroupId(input.getItSecGroupId());
		schrankDTO.setRefId(input.getRefId());
		
		schrankDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		schrankDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		schrankDTO.setRelevanceICS(input.getRelevanceICS());
//		schrankDTO.setRelevanzItsec(input.getRelevanzITSEC());
		schrankDTO.setGxpFlag(input.getGxpFlag());
		schrankDTO.setGxpFlagId(input.getGxpFlag());

		return schrankDTO;
	}
	
	public CiEntityEditParameterOutput saveSchrank(SchrankEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			SchrankDTO dto = getSchrankDTOFromEditInput(input);
			output = SchrankHbn.saveSchrank(input.getCwid(), dto);
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

			// create Application - fill attributes
//			if (null == dto.getCiOwner()) {
//				dto.setCiOwner(input.getCwid().toUpperCase());
//				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
//			}
			
//			if (null == dto.getBusinessEssentialId()) {
//				dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
//			}

			// save / create application
			output = SchrankHbn.createSchrank(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_POSITION, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
					output.setTableId(AirKonstanten.TABLE_ID_POSITION);
				} else {
					// unknown?
					output.setCiId(new Long(-1));
				}
			} else {
				// TODO errorcodes / Texte
				if (null != output.getMessages() && output.getMessages().length > 0) {
					output.setDisplayMessage(output.getMessages()[0]);
				}
			}
		}

		return output;
	}

}

package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;

public class StandortWS {
	
	protected StandortDTO getStandortDTOFromEditInput(StandortEditParameterInput input) {
		StandortDTO standortDTO = new StandortDTO();
		
		//Specifics
		standortDTO.setId(input.getId());//für RoomHbn.saveRoom
		standortDTO.setName(input.getName());//für RoomHbn.validateRoom

		
//		standortDTO.setStreet(input.getStreet());
//		standortDTO.setStreetNumber(input.getStreetNumber());
//		standortDTO.setPostalCode(input.getPostalCode());
//		standortDTO.setLocation(input.getLocation());
		
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
		standortDTO.setItSecSbAvailabilityDescription(input.getItSecSbAvailabilityDescription());
//		standortDTO.setClassInformationId(input.getClassInformationId());
//		standortDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		
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
		
		return standortDTO;
	}
	
	public CiEntityEditParameterOutput saveStandort(StandortEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			StandortDTO dto = getStandortDTOFromEditInput(input);
			output = StandortHbn.saveStandort(input.getCwid(), dto);
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
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
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

	public KeyValueDTO[] findSitesByLandId(Long id) {//DefaultDataInput input
		return StandortHbn.findSitesByLandId(id);//input
	}
}

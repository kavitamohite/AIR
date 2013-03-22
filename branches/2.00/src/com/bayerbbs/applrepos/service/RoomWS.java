package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;

public class RoomWS {
	
	protected RoomDTO getRoomDTOFromEditInput(RoomEditParameterInput input) {
		RoomDTO roomDTO = new RoomDTO();
		
		//Specifics
		roomDTO.setId(input.getId());//für RoomHbn.saveRoom
		roomDTO.setName(input.getName());//für RoomHbn.validateRoom
		roomDTO.setAlias(input.getAlias());
		roomDTO.setFloor(input.getFloor());
		roomDTO.setAreaId(input.getAreaId());
		
//		roomDTO.setStreet(input.getStreet());
//		roomDTO.setStreetNumber(input.getStreetNumber());
//		roomDTO.setPostalCode(input.getPostalCode());
//		roomDTO.setLocation(input.getLocation());
		
		//Contacts
		roomDTO.setCiOwner(input.getCiOwner());
		roomDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		roomDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		roomDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		roomDTO.setSlaId(input.getSlaId());
		roomDTO.setServiceContractId(input.getServiceContractId());
		roomDTO.setSeverityLevelId(input.getSeverityLevelId());
		roomDTO.setBusinessEssentialId(input.getBusinessEssentialId());
		
		//Protection
		roomDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		roomDTO.setItSecSbAvailabilityDescription(input.getItSecSbAvailabilityDescription());
//		roomDTO.setClassInformationId(input.getClassInformationId());
//		roomDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		
		//Compliance
		roomDTO.setItset(input.getItset());
		roomDTO.setTemplate(input.getTemplate());
		roomDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		roomDTO.setRefId(input.getRefId());
		
		roomDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		roomDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		roomDTO.setRelevanceICS(input.getRelevanceICS());
//		roomDTO.setRelevanzItsec(input.getRelevanzITSEC());
		roomDTO.setGxpFlag(input.getGxpFlag());
		roomDTO.setGxpFlagId(input.getGxpFlag());
		
		return roomDTO;
	}
	
	public CiEntityEditParameterOutput saveRoom(RoomEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			RoomDTO dto = getRoomDTOFromEditInput(input);
			output = RoomHbn.saveRoom(input.getCwid(), dto);
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput deleteRoom(RoomEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				RoomDTO dto = getRoomDTOFromEditInput(input);

				output = RoomHbn.deleteRoom(input.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}

	
	public CiEntityEditParameterOutput createRoom(RoomEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			RoomDTO dto = getRoomDTOFromEditInput(input);

			// create Application - fill attributes
			if (null == dto.getCiOwner()) {
				dto.setCiOwner(input.getCwid().toUpperCase());
				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
			}
			if (null == dto.getBusinessEssentialId()) {
				dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
			}

			// save / create application
			output = RoomHbn.createRoom(input.getCwid(), dto, true);

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

	public KeyValueDTO[] findRoomsByBuildingAreaId(Long id) {
		return RoomHbn.findRoomsByBuildingAreaId(id);//input
	}

}

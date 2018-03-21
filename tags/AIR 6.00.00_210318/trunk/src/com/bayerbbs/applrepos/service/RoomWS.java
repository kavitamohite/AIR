package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;

public class RoomWS {
	
	protected RoomDTO getRoomDTOFromEditInput(RoomEditParameterInput input) {
		RoomDTO roomDTO = new RoomDTO();
		roomDTO.setTableId(AirKonstanten.TABLE_ID_ROOM);
		
		//Specifics
		roomDTO.setId(input.getId());//für RoomHbn.saveRoom
		roomDTO.setName(input.getName());//für RoomHbn.validateRoom
		roomDTO.setAlias(input.getAlias());
		roomDTO.setFloor(input.getFloor());
		roomDTO.setAreaId(input.getAreaId());
		
		
		//Contacts
		roomDTO.setCiOwner(input.getCiOwner());
		roomDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		roomDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		roomDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());
		//vandana
		roomDTO.setProviderName(input.getProviderName());
		roomDTO.setProviderNameHidden(input.getProviderNameHidden());
		roomDTO.setProviderAddress(input.getProviderAddress());
		roomDTO.setProviderAddressHidden(input.getProviderAddressHidden());
		roomDTO.setItHead(input.getItHead());
		roomDTO.setItHeadHidden(input.getItHeadHidden());
		//vandana

		//Agreements
		roomDTO.setSlaId(input.getSlaId());
		roomDTO.setServiceContractId(input.getServiceContractId());
		roomDTO.setSeverityLevelId(input.getSeverityLevelId());
		roomDTO.setBusinessEssentialId(input.getBusinessEssentialId());
		
		//Protection
		roomDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		roomDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
		roomDTO.setClassInformationId(input.getClassInformationId());
		roomDTO.setClassInformationTxt(input.getClassInformationExplanation());
		roomDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		roomDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());		
		//Compliance
		roomDTO.setItset(input.getItset());
		roomDTO.setTemplate(input.getTemplate());
		roomDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		roomDTO.setRefId(input.getRefId());
		
		roomDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		roomDTO.setRelevanceGR1920(input.getRelevanceGR1920());

		roomDTO.setGxpFlag(input.getGxpFlag());
		roomDTO.setGxpFlagId(input.getGxpFlag());
		
		roomDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		roomDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		roomDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		roomDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		roomDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		roomDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		roomDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		roomDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		roomDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		roomDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		roomDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		roomDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		roomDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		roomDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		roomDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		roomDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		roomDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		roomDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		roomDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		roomDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		roomDTO.setDownStreamAdd(input.getDownStreamAdd());
		roomDTO.setDownStreamDelete(input.getDownStreamDelete());
		
		return roomDTO;
	}
	
	public CiEntityEditParameterOutput saveRoom(RoomEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			RoomDTO dto = getRoomDTOFromEditInput(input);
			output = RoomHbn.saveRoom(input.getCwid(), dto);
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input.getCwid());
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
			output = RoomHbn.createRoom(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				Room room = RoomHbn.findByNameAndBuildingAreaId(dto.getName(), dto.getAreaId());
				output.setCiId(room.getId());
				output.setTableId(AirKonstanten.TABLE_ID_ROOM);
				
				dto.setId(room.getId());
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

	public KeyValueDTO[] findRoomsByBuildingAreaId(Long id) {
		return RoomHbn.findRoomsByBuildingAreaId(id);//input
	}

	public static void createRoomCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			RoomDTO dto = new RoomDTO();
			Room roomSource = RoomHbn.findById(copyInput.getCiIdSource());

			if (null != roomSource) {
				RoomHbn.getRoom(dto, roomSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(roomSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(roomSource.getCiOwnerDelegate());
				dto.setTemplate(roomSource.getTemplate());
				
				dto.setRelevanzItsec(roomSource.getRelevanceITSEC());
				dto.setRelevanceICS(roomSource.getRelevanceICS());
				
				// save / create itSystem
				dto.setAreaId(roomSource.getBuildingAreaId());
				CiEntityEditParameterOutput createOutput = RoomHbn.createRoom(copyInput.getCwid(), dto, null);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Room room = RoomHbn.findByNameAndBuildingAreaId(copyInput.getCiNameTarget(), roomSource.getBuildingAreaId());
					if (null != room) {
						dto.setId(room.getId());
						
						Long ciId = room.getId();
						Room roomTarget = RoomHbn.findById(ciId);
						
						if (null != roomTarget) {
							CiEntityEditParameterOutput temp = RoomHbn.copyRoom(copyInput.getCwid(), roomSource.getId(), roomTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
							
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

	public KeyValueDTO[] findRoomsByBuildingId(Long id) {
		return RoomHbn.findRoomsByBuildingId(id);
	}

	
}

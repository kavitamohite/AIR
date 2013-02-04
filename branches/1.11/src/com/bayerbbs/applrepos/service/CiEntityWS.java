package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;

public class CiEntityWS {
	static final String YES = "Y";
	static final String NO = "N";

	public CiEntityParameterOutput findCiEntities(CiEntityParameterInput input) {		
		CiEntityParameterOutput output = new CiEntityParameterOutput();
		List<ViewDataDTO> listDTO = CiEntitiesHbn.findCisByTypeAndNameOrAlias(input.getType(), input.getQuery());
		
		if (listDTO.size() > 0) {
			output.setViewdataDTO(getViewDataArray(listDTO));
		}
		return output;
	}

	
	private static ViewDataDTO[] getViewDataArray(List<ViewDataDTO> listDTO) {
		ViewDataDTO aViewDataDTO[] = null;
		if (null != listDTO && !listDTO.isEmpty()) {
			aViewDataDTO = new ViewDataDTO[listDTO.size()];
			for (int i = 0; i < aViewDataDTO.length; i++) {
				aViewDataDTO[i] = listDTO.get(i);
			}
		}
		return aViewDataDTO;
	}
	
	public DwhEntityParameterOutput findByTypeAndName(CiEntityParameterInput input) {//String ciType, String ciName
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();
		
		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			output = CiEntitiesHbn.findByTypeAndName(input.getType(), input.getQuery(), input.getStart(), input.getLimit());
		
		return output;
	}
	
	public DwhEntityParameterOutput getDwhEntityRelations(CiEntityParameterInput input) {
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();
		
		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			output = CiEntitiesHbn.getDwhEntityRelations(input.getTableId(), input.getCiId(), input.getDirection());
		
		return output;
	}
	
	
	public BuildingDTO getBuilding(CiDetailParameterInput detailInput) {//CiDetailParameterOutput
		BuildingDTO buildingDTO = new BuildingDTO();
//		CiDetailParameterOutput output = new CiDetailParameterOutput();

		if(LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			Building building = BuildingHbn.findById(detailInput.getCiId());
			CiLokationsKette lokationsKette = BuildingHbn.findLokationsKetteById(detailInput.getCiId());
			
			buildingDTO.setId(building.getId());
			buildingDTO.setName(building.getName());
			buildingDTO.setAlias(building.getAlias());
			
			
			//			applicationDTO.setItsecGroupId(application.getItsecGroupId());
			buildingDTO.setInsertQuelle(building.getInsertQuelle());
			buildingDTO.setInsertUser(building.getInsertUser());
			
			if (null != building.getInsertTimestamp())
				buildingDTO.setInsertTimestamp(building.getInsertTimestamp().toString());
			
			buildingDTO.setUpdateQuelle(building.getUpdateQuelle());
			buildingDTO.setUpdateUser(building.getUpdateUser());
			
			if (null != building.getUpdateTimestamp())
				buildingDTO.setUpdateTimestamp(building.getUpdateTimestamp().toString());
			
			buildingDTO.setDeleteQuelle(building.getDeleteQuelle());
			buildingDTO.setDeleteUser(building.getDeleteUser());
			
			if (null != building.getDeleteTimestamp())
				buildingDTO.setDeleteTimestamp(building.getDeleteTimestamp().toString());

			buildingDTO.setCiOwnerHidden(building.getResponsible());
			buildingDTO.setCiOwnerDelegateHidden(building.getSubResponsible());
			
			buildingDTO.setSlaId(building.getSlaId());
			
			
			buildingDTO.setItset(building.getItset());
			buildingDTO.setTemplate(building.getTemplate());
			buildingDTO.setItsecGroupId(building.getItsecGroupId());
			
			Long template = building.getTemplate();
			if (-1 == template.longValue()) {
				// TODO -1 != 1 - Achtung beim Speichern
				template = new Long(1);
				//FEHLT NOCH siehe ApplicationWS!!
			}

			buildingDTO.setRefId(building.getRefId());
			
			
			if (StringUtils.isNotNullOrEmpty(buildingDTO.getCiOwnerHidden())) {
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(buildingDTO.getCiOwnerHidden());
				if (null != persons && 1 == persons.size()) {
					PersonsDTO person = persons.get(0);
					buildingDTO.setCiOwner(person.getDisplayNameFull());
				}
			}

			if (StringUtils.isNotNullOrEmpty(buildingDTO.getCiOwnerDelegateHidden())) {
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(buildingDTO.getCiOwnerDelegateHidden());
				if (null != persons && 1 == persons.size()) {
					PersonsDTO person = persons.get(0);
					buildingDTO.setCiOwnerDelegate(person.getDisplayNameFull());
				}
			}
			
			
			Long releItsec = building.getRelevanceITSEC();
			Long releICS = building.getRelevanceICS();
			
			if (-1 == releItsec) {
				buildingDTO.setRelevanceGR1435(YES);
			}
			else if (0 == releItsec) {
				buildingDTO.setRelevanceGR1435(NO);
			}
			if (-1 == releICS) {
				buildingDTO.setRelevanceGR1920(YES);
			}
			else if (0 == releICS) {
				buildingDTO.setRelevanceGR1920(NO);
			}
			
			
			buildingDTO.setCiLokationsKette(lokationsKette);
		}
		
//		output.setCiDetailDTO(roomDTO);
//		return output;
		return buildingDTO;
	}
	
	
	public RoomDTO getRoom(CiDetailParameterInput detailInput) {
		RoomDTO roomDTO = new RoomDTO();
//		CiDetailParameterOutput<RoomDTO> output = new CiDetailParameterOutput<RoomDTO>();

		if(LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			Room room = RoomHbn.findById(detailInput.getCiId());
			CiLokationsKette lokationsKette = RoomHbn.findLokationsKetteById(detailInput.getCiId());

			roomDTO.setId(room.getId());
			roomDTO.setName(room.getRoomName());
			roomDTO.setAlias(room.getRoomAlias());
			roomDTO.setRoomType(room.getRoomType());
			roomDTO.setFloor(room.getFloor());
			roomDTO.setAreaId(room.getAreaId());

			//			applicationDTO.setItsecGroupId(application.getItsecGroupId());
			roomDTO.setInsertQuelle(room.getInsertQuelle());
			roomDTO.setInsertUser(room.getInsertUser());
			
			if (null != room.getInsertTimestamp())
				roomDTO.setInsertTimestamp(room.getInsertTimestamp().toString());
			
			roomDTO.setUpdateQuelle(room.getUpdateQuelle());
			roomDTO.setUpdateUser(room.getUpdateUser());
			
			if (null != room.getUpdateTimestamp())
				roomDTO.setUpdateTimestamp(room.getUpdateTimestamp().toString());
			
			roomDTO.setDeleteQuelle(room.getDeleteQuelle());
			roomDTO.setDeleteUser(room.getDeleteUser());
			
			if (null != room.getDeleteTimestamp())
				roomDTO.setDeleteTimestamp(room.getDeleteTimestamp().toString());

			roomDTO.setCiOwnerHidden(room.getResponsible());
			roomDTO.setCiOwnerDelegateHidden(room.getSubResponsible());
			
			roomDTO.setSlaId(room.getSlaId());
//			roomDTO.setSlaName("");
			roomDTO.setSeverityLevelId(room.getSeverityLevelId());
			roomDTO.setBusinessEssentialId(room.getBusinessEssentialId());
			
			roomDTO.setItset(room.getItset());
			roomDTO.setTemplate(room.getTemplate());
			roomDTO.setItsecGroupId(room.getItsecGroupId());
			
			Long template = room.getTemplate();
			if (-1 == template.longValue()) {
				// TODO -1 != 1 - Achtung beim Speichern
				template = new Long(1);
				//FEHLT NOCH siehe ApplicationWS!!
			}

			roomDTO.setRefId(room.getRefId());
			
			
			if (StringUtils.isNotNullOrEmpty(roomDTO.getCiOwnerHidden())) {
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(roomDTO.getCiOwnerHidden());
				if (null != persons && 1 == persons.size()) {
					PersonsDTO person = persons.get(0);
					roomDTO.setCiOwner(person.getDisplayNameFull());
				}
			}

			if (StringUtils.isNotNullOrEmpty(roomDTO.getCiOwnerDelegateHidden())) {
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(roomDTO.getCiOwnerDelegateHidden());
				if (null != persons && 1 == persons.size()) {
					PersonsDTO person = persons.get(0);
					roomDTO.setCiOwnerDelegate(person.getDisplayNameFull());
				}
			}
			
			
			Long releItsec = room.getRelevanceITSEC();
			Long releICS = room.getRelevanceICS();
			
			if (-1 == releItsec) {
				roomDTO.setRelevanceGR1435(YES);
			}
			else if (0 == releItsec) {
				roomDTO.setRelevanceGR1435(NO);
			}
			if (-1 == releICS) {
				roomDTO.setRelevanceGR1920(YES);
			}
			else if (0 == releICS) {
				roomDTO.setRelevanceGR1920(NO);
			}
			
			
			roomDTO.setCiLokationsKette(lokationsKette);
		}
		
//		output.setCiDetailDTO(roomDTO);//setRoomDTO setCiDetailDTO
		return roomDTO;
	}

	protected RoomDTO getRoomDTOFromEditInput(RoomEditParameterInput editInput) {
		RoomDTO roomDTO = new RoomDTO();
		roomDTO.setId(editInput.getId());
		roomDTO.setName(editInput.getName());
		roomDTO.setAlias(editInput.getAlias());
		roomDTO.setFloor(editInput.getFloor());
		roomDTO.setAreaId(editInput.getAreaId());
		
		roomDTO.setCiOwner(editInput.getCiOwner());
		roomDTO.setCiOwnerHidden(editInput.getCiOwnerHidden());
		roomDTO.setCiOwnerDelegate(editInput.getCiOwnerDelegate());
		roomDTO.setCiOwnerDelegateHidden(editInput.getCiOwnerDelegateHidden());

		roomDTO.setBusinessEssentialId(editInput.getBusinessEssentialId());
		
		roomDTO.setItset(editInput.getItset());
		roomDTO.setTemplate(editInput.getTemplate());
		roomDTO.setItsecGroupId(editInput.getItsecGroupId());
		roomDTO.setRefId(editInput.getRefId());
		
		roomDTO.setRelevanceICS(editInput.getRelevanceICS());
		roomDTO.setRelevanzItsec(editInput.getRelevanzITSEC());
		roomDTO.setGxpFlag(editInput.getGxpFlag());
		roomDTO.setGxpFlagId(editInput.getGxpFlagId());

		return roomDTO;
	}
	
	public CiEntityEditParameterOutput saveRoom(RoomEditParameterInput editInput) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != editInput) {
			RoomDTO dto = getRoomDTOFromEditInput(editInput);
			output = RoomHbn.saveRoom(editInput.getCwid(), dto);
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput deleteRoom(RoomEditParameterInput editInput) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != editInput) {
			if (LDAPAuthWS.isLoginValid(editInput.getCwid(), editInput.getToken())) {
				RoomDTO dto = getRoomDTOFromEditInput(editInput);

				output = RoomHbn.deleteRoom(editInput.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}

	
	public CiEntityEditParameterOutput createRoom(RoomEditParameterInput editInput) {

		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != editInput && (LDAPAuthWS.isLoginValid(editInput.getCwid(), editInput.getToken())) ) {
			RoomDTO dto = getRoomDTOFromEditInput(editInput);

			// create Application - fill attributes
			if (null == dto.getCiOwner()) {
				dto.setCiOwner(editInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(editInput.getCwid().toUpperCase());
			}
			if (null == dto.getBusinessEssentialId()) {
				dto.setBusinessEssentialId(ApplreposConstants.BUSINESS_ESSENTIAL_DEFAULT);
			}

			// save / create application
			output = RoomHbn.createRoom(editInput.getCwid(), dto, true);

			if (ApplreposConstants.RESULT_OK.equals(output.getResult())) {
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), ApplreposConstants.TABLE_ID_ROOM, false);
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

	
}
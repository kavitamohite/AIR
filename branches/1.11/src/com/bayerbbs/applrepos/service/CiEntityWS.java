package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;

public class CiEntityWS {

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
	
	
	public CiDetailParameterOutput getRoom(CiDetailParameterInput detailInput) {
		RoomDTO roomDTO = new RoomDTO();
		CiDetailParameterOutput output = new CiDetailParameterOutput();

		if(true || LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			
			Room room = RoomHbn.findById(detailInput.getCiId());

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

			roomDTO.setCiOwner(room.getResponsible());
			roomDTO.setCiOwnerDelegate(room.getSubResponsible());
		}
		
		output.setRoomDTO(roomDTO);
		return output;
	}

}
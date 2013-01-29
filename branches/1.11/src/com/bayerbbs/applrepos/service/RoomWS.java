package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.RoomDTO;

public class RoomWS {

	public CiDetailParameterOutput getRoom(CiDetailParameterInput detailInput) {
		RoomDTO roomDTO = new RoomDTO();
		CiDetailParameterOutput output = new CiDetailParameterOutput();

		if(true || LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			
			// Application application = AnwendungHbn.findApplicationById(detailInput.getApplicationId());

			roomDTO.setId(123);
			roomDTO.setName("name");
			roomDTO.setAlias("alias");
//			applicationDTO.setItsecGroupId(application.getItsecGroupId());
			//evtl. weitere falls diese Methode noch woanders benötigt wird

		}
		
		output.setRoomDTO(roomDTO);
		return output;
	}

	
}

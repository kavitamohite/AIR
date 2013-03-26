package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;

public class BuildingWS {
	
	protected BuildingDTO getBuildingDTOFromEditInput(BuildingEditParameterInput input) {
		BuildingDTO buildingDTO = new BuildingDTO();
		buildingDTO.setTableId(AirKonstanten.TABLE_ID_BUILDING);
		
		//Specifics
		buildingDTO.setId(input.getId());//für BuildingHbn.saveBuilding
		buildingDTO.setName(input.getName());//für BuildingHbn.validateBuilding
		buildingDTO.setAlias(input.getAlias());
		buildingDTO.setTerrainId(input.getTerrainId());
		
		
		buildingDTO.setStreet(input.getStreet());
		buildingDTO.setStreetNumber(input.getStreetNumber());
		buildingDTO.setPostalCode(input.getPostalCode());
		buildingDTO.setLocation(input.getLocation());
		
		//Contacts
		buildingDTO.setCiOwner(input.getCiOwner());
		buildingDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		buildingDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		buildingDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		buildingDTO.setSlaId(input.getSlaId());
		buildingDTO.setServiceContractId(input.getServiceContractId());

		//Protection
		buildingDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		buildingDTO.setItSecSbAvailabilityDescription(input.getItSecSbAvailabilityDescription());
//		buildingDTO.setClassInformationId(input.getClassInformationId());
//		buildingDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		
		//Compliance
		buildingDTO.setItset(input.getItset());
		buildingDTO.setTemplate(input.getTemplate());
		buildingDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		buildingDTO.setRefId(input.getRefId());
		
		buildingDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		buildingDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		buildingDTO.setRelevanceICS(input.getRelevanceICS());
//		buildingDTO.setRelevanzItsec(input.getRelevanzITSEC());
		buildingDTO.setGxpFlag(input.getGxpFlag());
		buildingDTO.setGxpFlagId(input.getGxpFlag());
		
		return buildingDTO;
	}
	
	protected BuildingAreaDTO getBuildingAreaDTOFromEditInput(BuildingAreaEditParameterInput input) {
		BuildingAreaDTO buildingAreaDTO = new BuildingAreaDTO();
		buildingAreaDTO.setTableId(AirKonstanten.TABLE_ID_BUILDING_AREA);
		
		//Specifics
		buildingAreaDTO.setId(input.getId());//für BuildingHbn.saveBuilding
		buildingAreaDTO.setName(input.getName());//für BuildingHbn.validateBuilding
		buildingAreaDTO.setBuildingId(input.getBuildingId());
		
		
		//Contacts
		buildingAreaDTO.setCiOwner(input.getCiOwner());
		buildingAreaDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		buildingAreaDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		buildingAreaDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		buildingAreaDTO.setSlaId(input.getSlaId());
		buildingAreaDTO.setServiceContractId(input.getServiceContractId());

		//Protection
		buildingAreaDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		buildingAreaDTO.setItSecSbAvailabilityDescription(input.getItSecSbAvailabilityDescription());
//		buildingAreaDTO.setClassInformationId(input.getClassInformationId());
//		buildingAreaDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		
		//Compliance
		buildingAreaDTO.setItset(input.getItset());
		buildingAreaDTO.setTemplate(input.getTemplate());
		buildingAreaDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		buildingAreaDTO.setRefId(input.getRefId());
		
		buildingAreaDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		buildingAreaDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		buildingAreaDTO.setRelevanceICS(input.getRelevanceICS());
//		buildingAreaDTO.setRelevanzItsec(input.getRelevanzITSEC());
		buildingAreaDTO.setGxpFlag(input.getGxpFlag());
		buildingAreaDTO.setGxpFlagId(input.getGxpFlag());
		
		return buildingAreaDTO;
	}
	
	public CiEntityEditParameterOutput saveBuilding(BuildingEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			BuildingDTO dto = getBuildingDTOFromEditInput(input);
			output = BuildingHbn.saveBuilding(input.getCwid(), dto);
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput saveBuildingArea(BuildingAreaEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			BuildingAreaDTO dto = getBuildingAreaDTOFromEditInput(input);
			output = BuildingHbn.saveBuildingArea(input.getCwid(), dto);
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput deleteBuilding(BuildingEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				BuildingDTO dto = getBuildingDTOFromEditInput(input);
				output = BuildingHbn.deleteBuilding(input.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}
	
	public CiEntityEditParameterOutput deleteBuildingArea(BuildingAreaEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				BuildingAreaDTO dto = getBuildingAreaDTOFromEditInput(input);

				output = BuildingHbn.deleteBuildingArea(input.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}

	public CiEntityEditParameterOutput createBuilding(BuildingEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			BuildingDTO dto = getBuildingDTOFromEditInput(input);

			// create Application - fill attributes
//			if (null == dto.getCiOwner()) {
//				dto.setCiOwner(input.getCwid().toUpperCase());
//				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
//			}

			// save / create application
			output = BuildingHbn.createBuilding(input.getCwid(), dto, true);

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

	public CiEntityEditParameterOutput createBuildingArea(BuildingAreaEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			BuildingAreaDTO dto = getBuildingAreaDTOFromEditInput(input);

			// create Application - fill attributes
//			if (null == dto.getCiOwner()) {
//				dto.setCiOwner(input.getCwid().toUpperCase());
//				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
//			}

			// save / create application
			output = BuildingHbn.createBuildingArea(input.getCwid(), dto, true);

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
	
	public KeyValueOutput getBuildingsByBuildingArea(CiDetailParameterInput detailInput) {//DefaultDataInput input
		return BuildingHbn.getBuildingsByBuildingArea(detailInput);//input
	}

	public KeyValueDTO[] findBuildingsByTerrainId(Long id) {
		return BuildingHbn.findBuildingsByTerrainId(id);
	}

	public KeyValueDTO[] findBuildingAreasByBuildingId(Long id) {
		return BuildingHbn.findBuildingAreasByBuildingId(id);
	}
}

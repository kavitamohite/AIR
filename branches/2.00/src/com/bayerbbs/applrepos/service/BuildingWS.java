package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;

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
		buildingDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
//		buildingDTO.setClassInformationId(input.getClassInformationId());
//		buildingDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		buildingDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		buildingDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());
		buildingDTO.setItSecSbConfidentialityId(input.getItSecSbConfidentialityId());
		buildingDTO.setItSecSbConfidentialityTxt(input.getItSecSbConfidentialityTxt());
		
		
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
		
		buildingDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		buildingDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		buildingDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		buildingDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		buildingDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		buildingDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		buildingDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		buildingDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		buildingDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		buildingDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		buildingDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		buildingDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		buildingDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		buildingDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		buildingDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		buildingDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		buildingDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		buildingDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		buildingDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		buildingDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		buildingDTO.setDownStreamAdd(input.getDownStreamAdd());
		buildingDTO.setDownStreamDelete(input.getDownStreamDelete());
		
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
		buildingAreaDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
//		buildingAreaDTO.setItSecSbAvailabilityDescription(input.getItSecSbAvailabilityDescription());
//		buildingAreaDTO.setClassInformationId(input.getClassInformationId());
//		buildingAreaDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		buildingAreaDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		buildingAreaDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());
		buildingAreaDTO.setItSecSbConfidentialityId(input.getItSecSbConfidentialityId());
		buildingAreaDTO.setItSecSbConfidentialityTxt(input.getItSecSbConfidentialityTxt());
		
		
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
		
		buildingAreaDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		buildingAreaDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		buildingAreaDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		buildingAreaDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		buildingAreaDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		buildingAreaDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		buildingAreaDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		buildingAreaDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		buildingAreaDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		buildingAreaDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		buildingAreaDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		buildingAreaDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		buildingAreaDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		buildingAreaDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		buildingAreaDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		buildingAreaDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		buildingAreaDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		buildingAreaDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		buildingAreaDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		buildingAreaDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		buildingAreaDTO.setDownStreamAdd(input.getDownStreamAdd());
		buildingAreaDTO.setDownStreamDelete(input.getDownStreamDelete());
		
		return buildingAreaDTO;
	}
	
	public CiEntityEditParameterOutput saveBuilding(BuildingEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			BuildingDTO dto = getBuildingDTOFromEditInput(input);
			output = BuildingHbn.saveBuilding(input.getCwid(), dto);
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input);
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput saveBuildingArea(BuildingAreaEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			BuildingAreaDTO dto = getBuildingAreaDTOFromEditInput(input);
			output = BuildingHbn.saveBuildingArea(input.getCwid(), dto);
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input);
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
				Building building = BuildingHbn.findByNameAndTerrainId(dto.getName(), dto.getTerrainId());
				output.setCiId(building.getId());
				output.setTableId(AirKonstanten.TABLE_ID_BUILDING);
				
				dto.setId(building.getId());
				BaseHbn.saveGpscContacts(dto, input);
				
				/*
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_BUILDING, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
					output.setTableId(AirKonstanten.TABLE_ID_BUILDING);
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
				BuildingArea buildingArea = BuildingHbn.findByNameAndBuildingId(dto.getName(), dto.getBuildingId());
				output.setCiId(buildingArea.getId());
				output.setTableId(AirKonstanten.TABLE_ID_BUILDING_AREA);
				
				dto.setId(buildingArea.getId());
				BaseHbn.saveGpscContacts(dto, input);
				
				/*
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_BUILDING_AREA, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
					output.setTableId(AirKonstanten.TABLE_ID_BUILDING_AREA);
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

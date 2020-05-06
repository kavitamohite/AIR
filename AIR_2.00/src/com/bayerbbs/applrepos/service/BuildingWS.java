package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.ComplianceHbn;

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
		//vandana
		buildingDTO.setProviderName(input.getProviderName());
		buildingDTO.setProviderNameHidden(input.getProviderNameHidden());
		buildingDTO.setProviderAddress(input.getProviderAddress());
		buildingDTO.setProviderAddressHidden(input.getProviderAddressHidden());
		//vandana

		//Agreements
		//buildingDTO.setSlaId(input.getSlaId());
		//buildingDTO.setServiceContractId(input.getServiceContractId());

		//Protection
		buildingDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		buildingDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
		buildingDTO.setClassInformationId(input.getClassInformationId());
		buildingDTO.setClassInformationTxt(input.getClassInformationExplanation());
		buildingDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		buildingDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());
		
		
		//Compliance
		buildingDTO.setItset(input.getItset());
		buildingDTO.setTemplate(input.getTemplate());
		buildingDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		buildingDTO.setRefId(input.getRefId());
		
		buildingDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		buildingDTO.setRelevanceGR1920(input.getRelevanceGR1920());
		//EUGXS
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
		buildingDTO.setRelevanceCD3010(input.getRelevanceCD3010());
		buildingDTO.setRelevanceCD3011(input.getRelevanceCD3011());
//		buildingDTO.setRelevanceICS(input.getRelevanceICS());
//		buildingDTO.setRelevanzItsec(input.getRelevanzITSEC());
//		ELERJ GXP
		/*buildingDTO.setGxpFlag(input.getGxpFlag());
		buildingDTO.setGxpFlagId(input.getGxpFlag());*/
		
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
		//Added by vandana
		buildingDTO.setProviderName(input.getProviderName());
		buildingDTO.setProviderNameHidden(input.getProviderNameHidden());
		
		buildingDTO.setProviderAddress(input.getProviderAddress());
		buildingDTO.setProviderAddressHidden(input.getProviderAddressHidden());
		//Ended by vandana
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
		//vandana
		buildingAreaDTO.setProviderName(input.getProviderName());
		buildingAreaDTO.setProviderNameHidden(input.getProviderNameHidden());
		buildingAreaDTO.setProviderAddress(input.getProviderAddress());
		buildingAreaDTO.setProviderAddressHidden(input.getProviderAddressHidden());
		//vandana


		//Agreements
	//	buildingAreaDTO.setSlaId(input.getSlaId());
		//buildingAreaDTO.setServiceContractId(input.getServiceContractId());

		//Protection
		buildingAreaDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		buildingAreaDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
		buildingAreaDTO.setClassInformationId(input.getClassInformationId());
		buildingAreaDTO.setClassInformationTxt(input.getClassInformationExplanation());
		buildingAreaDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		buildingAreaDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());

		
		
		//Compliance
		buildingAreaDTO.setItset(input.getItset());
		buildingAreaDTO.setTemplate(input.getTemplate());
		buildingAreaDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		buildingAreaDTO.setRefId(input.getRefId());
		
		buildingAreaDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		buildingAreaDTO.setRelevanceGR1920(input.getRelevanceGR1920());
		//EUGXS
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
		buildingAreaDTO.setRelevanceCD3010(input.getRelevanceCD3010());
		buildingAreaDTO.setRelevanceCD3011(input.getRelevanceCD3011());

//		ELERJ GXP
		/*buildingAreaDTO.setGxpFlag(input.getGxpFlag());
		buildingAreaDTO.setGxpFlagId(input.getGxpFlag());*/
		
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
				BaseHbn.saveGpscContacts(dto, input.getCwid());
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput saveBuildingArea(BuildingAreaEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			BuildingAreaDTO dto = getBuildingAreaDTOFromEditInput(input);
			output = BuildingHbn.saveBuildingArea(input.getCwid(), dto);
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input.getCwid());
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

			// save / create application
			output = BuildingHbn.createBuilding(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {				
				dto.setId(output.getCiId());
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

	public CiEntityEditParameterOutput createBuildingArea(BuildingAreaEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			BuildingAreaDTO dto = getBuildingAreaDTOFromEditInput(input);

			// save / create application
			output = BuildingHbn.createBuildingArea(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {				
				dto.setId(output.getCiId());
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
	
	public KeyValueOutput getBuildingsByBuildingArea(CiDetailParameterInput detailInput) {//DefaultDataInput input
		return BuildingHbn.getBuildingsByBuildingArea(detailInput);//input
	}

	public KeyValueDTO[] findBuildingsByTerrainId(Long id) {
		return BuildingHbn.findBuildingsByTerrainId(id);
	}

	public KeyValueDTO[] findBuildingAreasByBuildingId(Long id) {
		return BuildingHbn.findBuildingAreasByBuildingId(id);
	}
	
	public static void createBuildingByCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			BuildingDTO dto = new BuildingDTO();
			Building buildingSource = BuildingHbn.findById(copyInput.getCiIdSource());

			if (null != buildingSource) {
				BuildingHbn.getBuilding(dto, buildingSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(buildingSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(buildingSource.getCiOwnerDelegate());
				dto.setTemplate(buildingSource.getTemplate());
				
				dto.setRelevanzItsec(buildingSource.getRelevanceITSEC());
				/*ELERJ ICS*/
//				dto.setRelevanceICS(buildingSource.getRelevanceICS());
				//EUGXS
				//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
				List<CiComplianceRequest> ComplianceIDS = ComplianceHbn.getCiCompliance_request(AirKonstanten.TABLE_ID_BUILDING,buildingSource.getId());
				
				for(int i =0; i<ComplianceIDS.size(); i++ ){
				
					if(ComplianceIDS.get(i).getComplianceRequestId() == 5){
						dto.setRelevanceCD3010(AirKonstanten.YES_SHORT);
					}
					
					if(ComplianceIDS.get(i).getComplianceRequestId() == 6){
						dto.setRelevanceCD3011(AirKonstanten.YES_SHORT);
					}
				}
				
				
				if(buildingSource.getRelevanceITSEC() == -1)
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}
				
				/*if(buildingSource.getRelevanceICS() == -1)
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}
				*/
				// save / create itSystem
				CiEntityEditParameterOutput createOutput = BuildingHbn.createBuilding(copyInput.getCwid(), dto, null);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Long ciId = createOutput.getCiId();
					if (null != ciId && 0 != ciId) {
						dto.setId(ciId);						
						Building buildingTarget = BuildingHbn.findById(ciId);						
						if (null != buildingTarget) {
							CiEntityEditParameterOutput temp = BuildingHbn.copyBuilding(copyInput.getCwid(), buildingSource.getId(), buildingTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());							
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

	public static void createBuildingAreaByCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			BuildingAreaDTO dto = new BuildingAreaDTO();
			BuildingArea buildingAreaSource = BuildingHbn.findBuildingAreaById(copyInput.getCiIdSource());

			if (null != buildingAreaSource) {
				BuildingHbn.getBuildingArea(dto, buildingAreaSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(buildingAreaSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(buildingAreaSource.getCiOwnerDelegate());
				dto.setTemplate(buildingAreaSource.getTemplate());
				
				dto.setRelevanzItsec(buildingAreaSource.getRelevanceITSEC());
//				dto.setRelevanceICS(buildingAreaSource.getRelevanceICS());
				//EUGXS
				//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
				List<CiComplianceRequest> ComplianceIDS = ComplianceHbn.getCiCompliance_request(AirKonstanten.TABLE_ID_BUILDING_AREA,buildingAreaSource.getId());

				for(int i =0; i<ComplianceIDS.size(); i++ ){

					if(ComplianceIDS.get(i).getComplianceRequestId() == 5){
						dto.setRelevanceCD3010(AirKonstanten.YES_SHORT);
					}

					if(ComplianceIDS.get(i).getComplianceRequestId() == 6){
						dto.setRelevanceCD3011(AirKonstanten.YES_SHORT);
					}
				}


				if(buildingAreaSource.getRelevanceITSEC() == -1)
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}

				/*if(buildingAreaSource.getRelevanceICS() == -1)
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}*/
				
				// save / create itSystem
				dto.setBuildingId(buildingAreaSource.getBuildingId());
				CiEntityEditParameterOutput createOutput = BuildingHbn.createBuildingArea(copyInput.getCwid(), dto, null);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					// Problem keine gefundene BuildingArea!!!
					Long ciId = createOutput.getCiId();

					if (null != ciId && 0 != ciId) {
						dto.setId(ciId);
						
						BuildingArea buildingAreaTarget = BuildingHbn.findBuildingAreaById(ciId);
						
						if (null != buildingAreaTarget) {
							CiEntityEditParameterOutput temp = BuildingHbn.copyBuildingArea(copyInput.getCwid(), buildingAreaSource.getId(), buildingAreaTarget.getId(), copyInput.getCiNameTarget());
							
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

	public KeyValueDTO[] findBuildingsBySiteId(Long id) {
		return BuildingHbn.findBuildingsBySiteId(id);
	}

}

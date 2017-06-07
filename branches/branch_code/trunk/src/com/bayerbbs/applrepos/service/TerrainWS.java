package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.TerrainDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.TerrainHbn;

public class TerrainWS {
	
	protected TerrainDTO getTerrainDTOFromEditInput(TerrainEditParameterInput input) {
		TerrainDTO terrainDTO = new TerrainDTO();
		terrainDTO.setTableId(AirKonstanten.TABLE_ID_TERRAIN);
		
		//Specifics
		terrainDTO.setId(input.getId());//für RoomHbn.saveRoom
		terrainDTO.setName(input.getName());//für RoomHbn.validateRoom
		terrainDTO.setStandortId(input.getStandortId());

		//Contacts
		terrainDTO.setCiOwner(input.getCiOwner());
		terrainDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		terrainDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		terrainDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		terrainDTO.setSlaId(input.getSlaId());
		terrainDTO.setServiceContractId(input.getServiceContractId());

		
		//Protection
		terrainDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		terrainDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
		terrainDTO.setClassInformationId(input.getClassInformationId());
		terrainDTO.setClassInformationTxt(input.getClassInformationExplanation());
		terrainDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		terrainDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());
		
		//Compliance
		terrainDTO.setItset(input.getItset());
		terrainDTO.setTemplate(input.getTemplate());
		terrainDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		terrainDTO.setRefId(input.getRefId());
		
		terrainDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		terrainDTO.setRelevanceGR1920(input.getRelevanceGR1920());

		terrainDTO.setGxpFlag(input.getGxpFlag());
		terrainDTO.setGxpFlagId(input.getGxpFlag());
		
		terrainDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		terrainDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		terrainDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		terrainDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		terrainDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		terrainDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		terrainDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		terrainDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		terrainDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		terrainDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		terrainDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		terrainDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		terrainDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		terrainDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		terrainDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		terrainDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		terrainDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		terrainDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		terrainDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		terrainDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness());
		
		terrainDTO.setDownStreamAdd(input.getDownStreamAdd());
		terrainDTO.setDownStreamDelete(input.getDownStreamDelete());
		
		return terrainDTO;
	}
	
	public CiEntityEditParameterOutput saveTerrain(TerrainEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			TerrainDTO dto = getTerrainDTOFromEditInput(input);
			output = TerrainHbn.saveTerrain(input.getCwid(), dto);
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input.getCwid());
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput deleteTerrain(TerrainEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				TerrainDTO dto = getTerrainDTOFromEditInput(input);

				output = TerrainHbn.deleteTerrain(input.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}

	
	public CiEntityEditParameterOutput createTerrain(TerrainEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			TerrainDTO dto = getTerrainDTOFromEditInput(input);

			// create Application - fill attributes
//			if (null == dto.getCiOwner()) {
//				dto.setCiOwner(input.getCwid().toUpperCase());
//				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
//			}


			// save / create application
			output = TerrainHbn.createTerrain(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				Terrain terrain = TerrainHbn.findByNameAndSiteId(dto.getName(), dto.getStandortId());
				output.setCiId(terrain.getId());
				output.setTableId(AirKonstanten.TABLE_ID_TERRAIN);
				
				dto.setId(terrain.getId());
				BaseHbn.saveGpscContacts(dto, input.getCwid());
				
				/*
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_TERRAIN, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
					output.setTableId(AirKonstanten.TABLE_ID_TERRAIN);
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

	public KeyValueDTO[] findTerrainsBySiteId(Long id) {//DefaultDataInput input
		return TerrainHbn.findTerrainsBySiteId(id);//input
	}
	
	public static void createTerrainCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			TerrainDTO dto = new TerrainDTO();
			Terrain terrainSource = TerrainHbn.findById(copyInput.getCiIdSource());

			if (null != terrainSource) {
				TerrainHbn.getTerrain(dto, terrainSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(terrainSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(terrainSource.getCiOwnerDelegate());
				dto.setTemplate(terrainSource.getTemplate());
				
				dto.setRelevanzItsec(terrainSource.getRelevanceITSEC());
				dto.setRelevanceICS(terrainSource.getRelevanceICS());
				
				// save / create itSystem
				dto.setStandortId(terrainSource.getStandortId());
				CiEntityEditParameterOutput createOutput = TerrainHbn.createTerrain(copyInput.getCwid(), dto, null);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Terrain terrain = TerrainHbn.findByNameAndSiteId(copyInput.getCiNameTarget(), terrainSource.getStandortId());
					if (null != terrain) {
						dto.setId(terrain.getId());
						
						Long ciId = terrain.getId();
						Terrain terrainTarget = TerrainHbn.findById(ciId);
						
						if (null != terrainTarget) {
							CiEntityEditParameterOutput temp = TerrainHbn.copyTerrain(copyInput.getCwid(), terrainSource.getId(), terrainTarget.getId(), copyInput.getCiNameTarget());
							
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

}

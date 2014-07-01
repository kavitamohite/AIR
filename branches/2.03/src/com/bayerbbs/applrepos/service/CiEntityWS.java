package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiBase1;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.dto.SchrankDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.dto.TerrainDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;
import com.bayerbbs.applrepos.hibernate.TerrainHbn;

public class CiEntityWS {
	static final String YES = "Y";
	static final String NO = "N";
	static final String KOMMA = ",";
	static final String EQUAL = "=";

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
	
	
	public ItSystemDTO getItSystem(CiDetailParameterInput input) {
		ItSystemDTO itSystemDTO = new ItSystemDTO();

		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			ItSystem itSystem = ItSystemHbn.findById(ItSystem.class, input.getCiId());
			
			itSystemDTO.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
			Integer ciSubType = itSystem.getCiSubTypeId() != null ? itSystem.getCiSubTypeId() : AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT;
			itSystemDTO.setCiSubTypeId(ciSubType);

			setCiBaseData(itSystemDTO, itSystem);

			itSystemDTO.setOsNameId(itSystem.getOsNameId());
			itSystemDTO.setClusterCode(itSystem.getClusterCode());
			itSystemDTO.setClusterType(itSystem.getClusterType());
			itSystemDTO.setIsVirtualHardwareClient(itSystem.getIsVirtualHardwareClient());
			itSystemDTO.setIsVirtualHardwareHost(itSystem.getIsVirtualHardwareHost());
			itSystemDTO.setVirtualHardwareSoftware(itSystem.getVirtualHardwareSoftware());
			itSystemDTO.setLifecycleStatusId(itSystem.getLifecycleStatusId());
			itSystemDTO.setEinsatzStatusId(itSystem.getEinsatzStatusId());
			itSystemDTO.setPrimaryFunctionId(itSystem.getPrimaryFunctionId());
			itSystemDTO.setLicenseScanningId(itSystem.getLicenseScanningId());
			
			itSystemDTO.setPriorityLevelId(itSystem.getPriorityLevelId());
			itSystemDTO.setSeverityLevelId(itSystem.getSeverityLevelId());
			itSystemDTO.setBusinessEssentialId(itSystem.getBusinessEssentialId());
			
			
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), input.getToken(), itSystem)) {
				itSystemDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				itSystemDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}
		
		return itSystemDTO;
	}
	
	public StandortDTO getStandort(CiDetailParameterInput input) {
		StandortDTO standortDTO = new StandortDTO();

		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Standort standort = StandortHbn.findById(Standort.class, input.getCiId());
			CiLokationsKette lokationsKette = StandortHbn.findLokationsKetteById(input.getCiId());
			
//			Set<Terrain> terrains = standort.getTerrains();
			standortDTO.setStandortCode(standort.getStandortCode());
			standortDTO.setTableId(AirKonstanten.TABLE_ID_SITE);
			
			setCiBaseData(standortDTO, standort);
			standortDTO.setCiLokationsKette(lokationsKette);
			standortDTO.setNameEn(standort.getNameEn());
			
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), input.getToken(), standort)) {
				standortDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				standortDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}
		
		return standortDTO;
	}
	
	public TerrainDTO getTerrain(CiDetailParameterInput input) {
		TerrainDTO terrainDTO = new TerrainDTO();

		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Terrain terrain = TerrainHbn.findById(Terrain.class, input.getCiId());
			CiLokationsKette lokationsKette = TerrainHbn.findLokationsKetteById(input.getCiId());
			
//			Set<Building> building = terrain.getBuildings();
			terrainDTO.setTableId(AirKonstanten.TABLE_ID_TERRAIN);
			
			setCiBaseData(terrainDTO, terrain);
			terrainDTO.setCiLokationsKette(lokationsKette);
			
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), input.getToken(), terrain)) {
				terrainDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				terrainDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}
		
		return terrainDTO;
	}
	
	public SchrankDTO getSchrank(CiDetailParameterInput input) {
		SchrankDTO schrankDTO = new SchrankDTO();

		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Schrank schrank = SchrankHbn.findById(input.getCiId());
			
			/*
			//wenn bei Schrank Neuanlage ein reload vor dem Speichern gemacht wird, gibt es nich keine ID. Es wird die ID des
			//zuletzt geladenen CIs aus den Cookie Daten in input.getCiId() geliefert. Es gibt sehr wahrscheinlich kein Schrank
			//mit der ID des zuletzt geladenen CIs. Daher ein leeres schrankDTO zur�ckgeben.
			if(schrank == null)
				return schrankDTO;*/
			
			CiLokationsKette lokationsKette = SchrankHbn.findLokationsKetteById(input.getCiId());
			Building building = BuildingHbn.findById(lokationsKette.getGebaeudeId());
			
			//wenn noch alle R�ume irgendwie auf die GUI sollen
//			Set<Room> rooms = buildingArea.getRooms();
			schrankDTO.setSeverityLevelId(schrank.getSeverityLevelId());
			schrankDTO.setBusinessEssentialId(schrank.getBusinessEssentialId());
			schrankDTO.setTableId(AirKonstanten.TABLE_ID_POSITION);			
			setCiBaseData(schrankDTO, schrank);
			schrankDTO.setCiLokationsKette(lokationsKette);
			schrankDTO.setStreet(building.getStreet());
			schrankDTO.setStreetNumber(building.getStreetNumber());
			schrankDTO.setPostalCode(building.getPostalCode());
			schrankDTO.setLocation(building.getLocation());
			
			//Standard Zugriffsrechte setzen.
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), input.getToken(), schrank)) {
				schrankDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				schrankDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}
		
		return schrankDTO;
	}
	
	public BuildingDTO getBuilding(CiDetailParameterInput input) {
		BuildingDTO buildingDTO = new BuildingDTO();

		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Building building = BuildingHbn.findById(Building.class, input.getCiId());
			CiLokationsKette lokationsKette = BuildingHbn.findLokationsKetteById(input.getCiId());
			
			//wenn noch alle R�ume aller BuildingAreas irgendwie auf die GUI sollen
//			Set<BuildingArea> buildingAreas = building.getBuildingAreas();
			
			buildingDTO.setAlias(building.getAlias());
			buildingDTO.setStreet(building.getStreet());
			buildingDTO.setStreetNumber(building.getStreetNumber());
			buildingDTO.setPostalCode(building.getPostalCode());
			buildingDTO.setLocation(building.getLocation());
			buildingDTO.setTableId(AirKonstanten.TABLE_ID_BUILDING);
			
			setCiBaseData(buildingDTO, building);
			buildingDTO.setCiLokationsKette(lokationsKette);
			
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), input.getToken(), building)) {
				buildingDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				buildingDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return buildingDTO;
	}
	
	public BuildingAreaDTO getBuildingArea(CiDetailParameterInput input) {
		BuildingAreaDTO buildingAreaDTO = new BuildingAreaDTO();

		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			BuildingArea buildingArea = BuildingHbn.findById(BuildingArea.class, input.getCiId());//BuildingHbn.findBuildingAreaById(detailInput.getCiId());
			CiLokationsKette lokationsKette = BuildingHbn.findLokationsKetteByAreaId(input.getCiId());
			Building building = BuildingHbn.findById(lokationsKette.getGebaeudeId());
			
			//wenn noch alle R�ume irgendwie auf die GUI sollen
//			Set<Room> rooms = buildingArea.getRooms();

			buildingAreaDTO.setTableId(AirKonstanten.TABLE_ID_BUILDING_AREA);			
			setCiBaseData(buildingAreaDTO, buildingArea);
			buildingAreaDTO.setCiLokationsKette(lokationsKette);
			
			buildingAreaDTO.setStreet(building.getStreet());
			buildingAreaDTO.setStreetNumber(building.getStreetNumber());
			buildingAreaDTO.setPostalCode(building.getPostalCode());
			buildingAreaDTO.setLocation(building.getLocation());
			/*
			Terrain terrain = buildingArea.getBuilding().getTerrain();
			Set<Building> buildings = terrain.getBuildings();
			
			if(buildings != null && buildings.size() > 0) {
//				BuildingDTO area = null;
//				Set<BuildingDTO> areas = new HashSet<BuildingDTO>();
//				for(Building building : buildings) {
//					building = new BuildingAreaDTO();
//					building.setAreaId(building.getId());
//					building.setName(building.getName());
//					buildings.add(building);
//				}
//				buildingAreaDTO.setBuildingAreas(buildings);
				
				StringBuilder data = new StringBuilder();
				for(Building building : buildings) {
					if(data.length() > 0)
						data.append(KOMMA);
					data.append(building.getId()).append(EQUAL).append(building.getName());
				}
				buildingAreaDTO.setBuildingData(data.toString());
			}*/
			
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), input.getToken(), buildingArea)) {
				buildingAreaDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				buildingAreaDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return buildingAreaDTO;
	}
		
	
	public RoomDTO getRoom(CiDetailParameterInput input) {
		RoomDTO roomDTO = new RoomDTO();
//		CiDetailParameterOutput<RoomDTO> output = new CiDetailParameterOutput<RoomDTO>();

		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Room room = RoomHbn.findById(input.getCiId());
			CiLokationsKette lokationsKette = RoomHbn.findLokationsKetteById(input.getCiId());
			Building building = room.getBuildingArea().getBuilding();
//			Set<BuildingArea> buildingAreas = building.getBuildingAreas();
			roomDTO.setTableId(AirKonstanten.TABLE_ID_ROOM);
			setCiBaseData(roomDTO, room);
			roomDTO.setAlias(room.getAlias());
			roomDTO.setSeverityLevelId(room.getSeverityLevelId());
			roomDTO.setBusinessEssentialId(room.getBusinessEssentialId());
			roomDTO.setRoomType(room.getRoomType());
			roomDTO.setFloor(room.getFloor());
			roomDTO.setAreaId(room.getBuildingAreaId());
			
			roomDTO.setCiLokationsKette(lokationsKette);
			
			roomDTO.setStreet(building.getStreet());
			roomDTO.setStreetNumber(building.getStreetNumber());
			roomDTO.setPostalCode(building.getPostalCode());
			roomDTO.setLocation(building.getLocation());
			
			
			//Standard Zugriffsrechte setzen.
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), input.getToken(), room)) {
				roomDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				roomDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
			
			//spezifisches Rechte-Setzen pro Feld. �berschreibt Standard Zugriffsrechte f�r ausgew�hlte Felder.
			//Bisher in AttributeProperties.xml clientseitig gemacht.
			//Wenn RFC 9161 AIR_editable umgesetzt ist, kann folgendes f�r jeden CI-Typ vervollst�ndigt werden:
			//--------------------------
			String source = room.getInsertQuelle();
			if(!source.equals(AirKonstanten.INSERT_QUELLE_SISEC) && !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {
				roomDTO.setSeverityLevelIdAcl(AirKonstanten.NO_SHORT);
			}
			

			//...
			//--------------------------
			
			/*
			if(buildingAreas != null && buildingAreas.size() > 0) {
//				BuildingAreaDTO area = null;
//				Set<BuildingAreaDTO> areas = new HashSet<BuildingAreaDTO>();
//				for(BuildingArea buildingArea : buildingAreas) {
//					area = new BuildingAreaDTO();
//					area.setAreaId(buildingArea.getId());
//					area.setName(buildingArea.getName());
//					areas.add(area);
//				}
//				roomDTO.setBuildingAreas(areas);
				
				StringBuilder data = new StringBuilder();
				for(BuildingArea buildingArea : buildingAreas) {
					if(data.length() > 0)
						data.append(KOMMA);
					data.append(buildingArea.getId()).append(EQUAL).append(buildingArea.getName());
				}
				roomDTO.setBuildingAreaData(data.toString());
			}*/
		}
		
//		output.setCiDetailDTO(roomDTO);//setRoomDTO setCiDetailDTO
		return roomDTO;
	}
	
//	public ItSystemDTO[] getSystemPlatformsById(CiEntityParameterInput detailInput) {
//		List<ItSystem> itSystems = RoomHbn.getSystemPlatformsById(detailInput.getCiId());
//		
//		return null;
//	}
	
	
	
	public CiItemsResultDTO findCis(ApplicationSearchParamsDTO input) {//CiSearchParamsDTO <T extends CiSearchParamsDTO>
//		CiItemDTO[] ciItemDTOs = null;
		CiItemsResultDTO result = null;
		
		if(input.getCiTypeId() != null) {
			switch(input.getCiTypeId()) {
				case AirKonstanten.TABLE_ID_APPLICATION:
					return new ApplicationWS().findApplications(input);//(ApplicationSearchParamsDTO)
					
				case AirKonstanten.TABLE_ID_IT_SYSTEM:
					result = ItSystemHbn.findItSystemsBy(input);
					break;
				case AirKonstanten.TABLE_ID_POSITION:
					result = SchrankHbn.findSchraenkeBy(input);//ciItemDTOs
					break;
				case AirKonstanten.TABLE_ID_ROOM:
					result = RoomHbn.findRoomsBy(input);//ciItemDTOs
					break;
				case AirKonstanten.TABLE_ID_BUILDING_AREA:
					result = BuildingHbn.findBuildingAreasBy(input);//ciItemDTOs
					break;
				case AirKonstanten.TABLE_ID_BUILDING:
					result = BuildingHbn.findBuildingsBy(input);//ciItemDTOs
					break;
				case AirKonstanten.TABLE_ID_TERRAIN:
					result = TerrainHbn.findTerrainsBy(input);//ciItemDTOs
					break;
				case AirKonstanten.TABLE_ID_SITE:
					result = StandortHbn.findSitesBy(input);//ciItemDTOs
					break;
				default:
					//ciItemDTOs = new CiItemDTO[0];
					result = new CiItemsResultDTO();
					break;
			}
			
			return result;
		} else {
			return new ApplicationWS().findApplications(input);
		}
	}
	
	public CiEntityEditParameterOutput deleteCi(CiEntityParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			switch(input.getTableId().intValue()) {
				case AirKonstanten.TABLE_ID_APPLICATION:
					output = new ApplicationWS().deleteApplication(input);
					break;
				case AirKonstanten.TABLE_ID_IT_SYSTEM:
					output = ItSystemHbn.deleteCi(input.getCwid(), input.getCiId(), ItSystem.class);
					break;
				case AirKonstanten.TABLE_ID_POSITION:
					output = SchrankHbn.deleteCi(input.getCwid(), input.getCiId(), Schrank.class);
					break;
				case AirKonstanten.TABLE_ID_ROOM:
					output = RoomHbn.deleteCi(input.getCwid(), input.getCiId(), Room.class);
					break;
				case AirKonstanten.TABLE_ID_BUILDING_AREA:
					output = BuildingHbn.deleteCi(input.getCwid(), input.getCiId(), BuildingArea.class);
					break;
				case AirKonstanten.TABLE_ID_BUILDING:
					output = BuildingHbn.deleteCi(input.getCwid(), input.getCiId(), Building.class);
					break;
				case AirKonstanten.TABLE_ID_TERRAIN:
					output = TerrainHbn.deleteCi(input.getCwid(), input.getCiId(), Terrain.class);
					break;
				case AirKonstanten.TABLE_ID_SITE:
					output = StandortHbn.deleteCi(input.getCwid(), input.getCiId(), Standort.class);
					break;
			}
		}
		
		return output;
	}
	
	private void setCiBaseData(CiBaseDTO ciBaseDTO, CiBase1 ciBase) {
		ciBaseDTO.setId(ciBase.getId());
		ciBaseDTO.setName(ciBase.getName());
		
		
		//			applicationDTO.setItsecGroupId(application.getItsecGroupId());
		ciBaseDTO.setInsertQuelle(ciBase.getInsertQuelle());
		ciBaseDTO.setInsertUser(ciBase.getInsertUser());
		
		if (null != ciBase.getInsertTimestamp())
			ciBaseDTO.setInsertTimestamp(ciBase.getInsertTimestamp().toString());
		
		ciBaseDTO.setUpdateQuelle(ciBase.getUpdateQuelle());
		ciBaseDTO.setUpdateUser(ciBase.getUpdateUser());
		
		if (null != ciBase.getUpdateTimestamp())
			ciBaseDTO.setUpdateTimestamp(ciBase.getUpdateTimestamp().toString());
		
		ciBaseDTO.setDeleteQuelle(ciBase.getDeleteQuelle());
		ciBaseDTO.setDeleteUser(ciBase.getDeleteUser());
		
		if (null != ciBase.getDeleteTimestamp())
			ciBaseDTO.setDeleteTimestamp(ciBase.getDeleteTimestamp().toString());

		
		ciBaseDTO.setCiOwnerHidden(ciBase.getCiOwner());
		ciBaseDTO.setCiOwnerDelegateHidden(ciBase.getCiOwnerDelegate());
		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerHidden())) {//getCiOwner
			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerHidden());//getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				ciBaseDTO.setCiOwner(tempPers.getDisplayNameFull());
			}
		}

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegateHidden())) {//getCiOwnerDelegate
			List<PersonsDTO> listPersons = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerDelegateHidden());//getCiOwnerDelegate
			if (null != listPersons && 1 == listPersons.size()) {
				PersonsDTO tempPers = listPersons.get(0);
				ciBaseDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
			}
			else ciBaseDTO.setCiOwnerDelegate(ciBaseDTO.getCiOwnerDelegateHidden());//Delegate is Group
		}
		
		
		ciBaseDTO.setSlaId(ciBase.getSlaId());
		ciBaseDTO.setServiceContractId(ciBase.getServiceContractId());
		
		ciBaseDTO.setItSecSbAvailabilityId(ciBase.getItSecSbAvailability());
		ciBaseDTO.setItSecSbAvailabilityTxt(ciBase.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription
		ciBaseDTO.setItSecSbIntegrityId(ciBase.getItSecSbIntegrityId());
		ciBaseDTO.setItSecSbIntegrityTxt(ciBase.getItSecSbIntegrityTxt());
		ciBaseDTO.setItSecSbConfidentialityId(ciBase.getItSecSbConfidentialityId());
		ciBaseDTO.setItSecSbConfidentialityTxt(ciBase.getItSecSbConfidentialityTxt());

		
		ciBaseDTO.setItset(ciBase.getItset());
		ciBaseDTO.setItsecGroupId(ciBase.getItsecGroupId());
		
		Long template = ciBase.getTemplate();
		if (-1 == template.longValue()) {
			//RFC 9478 
			//check this room is if template then go for is related with other CI or not
		     String IsCIsLinkwithTemplate=CiEntitiesHbn.findCIisLinkWithTemplate(ciBase.getId(),ciBaseDTO.getTableId());
		     ciBaseDTO.setTemplateLinkWithCIs(IsCIsLinkwithTemplate);
			
		}
/*		if (null == template) {
			template = -1L;

		}*/
		ciBaseDTO.setTemplate(template);
		

		Long refID = ciBase.getRefId();
		if (null == refID) {
			refID = 0L;
		}
		ciBaseDTO.setRefId(refID);
		
		
		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerHidden())) {
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerHidden());
			if (null != persons && 1 == persons.size()) {
				PersonsDTO person = persons.get(0);
				ciBaseDTO.setCiOwner(person.getDisplayNameFull());
			}
		}

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegateHidden())) {
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerDelegateHidden());
			if (null != persons && 1 == persons.size()) {
				PersonsDTO person = persons.get(0);
				ciBaseDTO.setCiOwnerDelegate(person.getDisplayNameFull());
			}
		}
		
		
		Long relevanceItsec = ciBase.getRelevanceITSEC();
		Long relevanceICS = ciBase.getRelevanceICS();
		
		if (-1 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(YES);
		}
		else {// if (0 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(NO);
		}
		if (-1 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(YES);
		}
		else {//(0 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(NO);
		}
		
		ciBaseDTO.setGxpFlagId(ciBase.getGxpFlag());
		ciBaseDTO.setGxpFlag(ciBase.getGxpFlag());

		
		String source = ciBaseDTO.getInsertQuelle();
		if(!source.equals(AirKonstanten.INSERT_QUELLE_SISEC) &&
		   !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {
			
			ciBaseDTO.setCiOwnerAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setCiOwnerDelegateAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1435Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1920Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setGxpFlagIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRefIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setItsecGroupIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setSlaIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setServiceContractIdAcl(AirKonstanten.NO_SHORT);
			
			//fehlt, n�tig?
//			License_Scanning,Sample_Test_Date,Sample_Test_Result,Itsec_SB_Integ_ID,Itsec_SB_Integ_Txt,
//			Itsec_SB_Verfg_ID,Itsec_SB_Verfg_Txt,Itsec_SB_Vertr_ID,Itsec_SB_Vertr_Txt
		}
	}
	
	//Doppelt weil: siehe @Column(name = "CWID_VERANTW_BETR") ciOwner Feld in Hibernateklasse ItSystem
	//anstatt @Column(name = "RESPONSIBLE") wie in allen anderen Transbase CI Tabellen
	private void setCiBaseData(ItSystemDTO ciBaseDTO, ItSystem ciBase) {
		ciBaseDTO.setId(ciBase.getId());
		ciBaseDTO.setName(ciBase.getName());
		ciBaseDTO.setAlias(ciBase.getAlias());
		
		
		//			applicationDTO.setItsecGroupId(application.getItsecGroupId());
		ciBaseDTO.setInsertQuelle(ciBase.getInsertQuelle());
		ciBaseDTO.setInsertUser(ciBase.getInsertUser());
		
		if (null != ciBase.getInsertTimestamp())
			ciBaseDTO.setInsertTimestamp(ciBase.getInsertTimestamp().toString());
		
		ciBaseDTO.setUpdateQuelle(ciBase.getUpdateQuelle());
		ciBaseDTO.setUpdateUser(ciBase.getUpdateUser());
		
		if (null != ciBase.getUpdateTimestamp())
			ciBaseDTO.setUpdateTimestamp(ciBase.getUpdateTimestamp().toString());
		
		ciBaseDTO.setDeleteQuelle(ciBase.getDeleteQuelle());
		ciBaseDTO.setDeleteUser(ciBase.getDeleteUser());
		
		if (null != ciBase.getDeleteTimestamp())
			ciBaseDTO.setDeleteTimestamp(ciBase.getDeleteTimestamp().toString());

		
		ciBaseDTO.setCiOwnerHidden(ciBase.getCiOwner());
		ciBaseDTO.setCiOwnerDelegateHidden(ciBase.getCiOwnerDelegate());
		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerHidden())) {//getCiOwner
			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerHidden());//getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				ciBaseDTO.setCiOwner(tempPers.getDisplayNameFull());
			}
		}

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegateHidden())) {//getCiOwnerDelegate
			List<PersonsDTO> listPersons = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerDelegateHidden());//getCiOwnerDelegate
			if (null != listPersons && 1 == listPersons.size()) {
				PersonsDTO tempPers = listPersons.get(0);
				ciBaseDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
			}
			else ciBaseDTO.setCiOwnerDelegate(ciBaseDTO.getCiOwnerDelegateHidden());//Delegate is Group
		}
		
		
		
		
		ciBaseDTO.setSlaId(ciBase.getSlaId());
		ciBaseDTO.setServiceContractId(ciBase.getServiceContractId());
		
		ciBaseDTO.setItSecSbAvailabilityId(ciBase.getItSecSbAvailability());
		ciBaseDTO.setItSecSbAvailabilityTxt(ciBase.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription
		ciBaseDTO.setItSecSbIntegrityId(ciBase.getItSecSbIntegrityId());
		ciBaseDTO.setItSecSbIntegrityTxt(ciBase.getItSecSbIntegrityTxt());
		ciBaseDTO.setItSecSbConfidentialityId(ciBase.getItSecSbConfidentialityId());
		ciBaseDTO.setItSecSbConfidentialityTxt(ciBase.getItSecSbConfidentialityTxt());
		
		ciBaseDTO.setItset(ciBase.getItset());
		ciBaseDTO.setTemplate(ciBase.getTemplate());
		ciBaseDTO.setItsecGroupId(ciBase.getItsecGroupId());
		
		
		Long template = ciBase.getTemplate();
		if (-1 == template.longValue()) {
			// TODO -1 != 1 - Achtung beim Speichern
			template = new Long(1);
			//FEHLT NOCH siehe ApplicationWS!!
			//RFC 9478 
			//check this room is if template then go for is related with other CI or not
		     String IsCIsLinkwithTemplate=CiEntitiesHbn.findCIisLinkWithTemplate(ciBase.getId(),ciBaseDTO.getTableId());
		     ciBaseDTO.setTemplateLinkWithCIs(IsCIsLinkwithTemplate);

			
		}

		ciBaseDTO.setRefId(ciBase.getRefId());
		
		
		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerHidden())) {
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerHidden());
			if (null != persons && 1 == persons.size()) {
				PersonsDTO person = persons.get(0);
				ciBaseDTO.setCiOwner(person.getDisplayNameFull());
			}
		}

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegateHidden())) {
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerDelegateHidden());
			if (null != persons && 1 == persons.size()) {
				PersonsDTO person = persons.get(0);
				ciBaseDTO.setCiOwnerDelegate(person.getDisplayNameFull());
			}
		}
		
		
		Long relevanceItsec = ciBase.getRelevanceITSEC();
		Long relevanceICS = ciBase.getRelevanceICS();
		
		if (-1 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(YES);
		}
		else {// if (0 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(NO);
		}
		if (-1 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(YES);
		}
		else {//(0 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(NO);
		}
		
		ciBaseDTO.setGxpFlagId(ciBase.getGxpFlag());
		ciBaseDTO.setGxpFlag(ciBase.getGxpFlag());

		
		String source = ciBaseDTO.getInsertQuelle();
		if(!source.equals(AirKonstanten.INSERT_QUELLE_SISEC) &&
		   !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {
			
			ciBaseDTO.setCiOwnerAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setCiOwnerDelegateAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1435Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1920Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setGxpFlagIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRefIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setItsecGroupIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setSlaIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setServiceContractIdAcl(AirKonstanten.NO_SHORT);
			
			//fehlt, n�tig?
//			License_Scanning,Sample_Test_Date,Sample_Test_Result,Itsec_SB_Integ_ID,Itsec_SB_Integ_Txt,
//			Itsec_SB_Verfg_ID,Itsec_SB_Verfg_Txt,Itsec_SB_Vertr_ID,Itsec_SB_Vertr_Txt
		}
	}
}
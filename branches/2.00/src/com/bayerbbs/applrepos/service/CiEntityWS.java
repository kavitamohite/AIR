package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiBase;
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
import com.bayerbbs.applrepos.dto.KeyValueDTO;
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
			
			setCiBaseData(itSystemDTO, itSystem);
			itSystemDTO.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
			Integer ciSubType = itSystem.getCiSubType() != null ? itSystem.getCiSubType() : AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT;
			itSystemDTO.setCiSubTypeId(ciSubType);
			
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), itSystem)) {
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
			CiLokationsKette lokationsKette = TerrainHbn.findLokationsKetteById(input.getCiId());
			
//			Set<Terrain> terrains = standort.getTerrains();
			standortDTO.setTableId(AirKonstanten.TABLE_ID_SITE);
			
			setCiBaseData(standortDTO, standort);
			standortDTO.setCiLokationsKette(lokationsKette);
			
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), standort)) {
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
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), terrain)) {
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
			CiLokationsKette lokationsKette = SchrankHbn.findLokationsKetteById(input.getCiId());
			
			//wenn noch alle Räume irgendwie auf die GUI sollen
//			Set<Room> rooms = buildingArea.getRooms();
			schrankDTO.setTableId(AirKonstanten.TABLE_ID_POSITION);
			
			setCiBaseData(schrankDTO, schrank);
			schrankDTO.setCiLokationsKette(lokationsKette);
			
			//Standard Zugriffsrechte setzen.
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), schrank)) {
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
			
			//wenn noch alle Räume aller BuildingAreas irgendwie auf die GUI sollen
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
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), building)) {
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

			
			//wenn noch alle Räume irgendwie auf die GUI sollen
//			Set<Room> rooms = buildingArea.getRooms();
			buildingAreaDTO.setTableId(AirKonstanten.TABLE_ID_BUILDING_AREA);
			
			setCiBaseData(buildingAreaDTO, buildingArea);
			buildingAreaDTO.setCiLokationsKette(lokationsKette);
			
			
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
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(), buildingArea)) {
				buildingAreaDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				buildingAreaDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return buildingAreaDTO;
	}
	
	public KeyValueOutput getBuildingsByBuildingArea(CiDetailParameterInput detailInput) {
		KeyValueOutput output = new KeyValueOutput();
		List<KeyValueDTO> buildingDataList = new ArrayList<KeyValueDTO>();
		
		BuildingArea buildingArea = BuildingHbn.findById(BuildingArea.class, detailInput.getCiId());//findBuildingAreaById(detailInput.getCiId());
		Terrain terrain = buildingArea.getBuilding().getTerrain();
		Set<Building> buildings = terrain.getBuildings();
		
		if(buildings != null && buildings.size() > 0)
			for(Building building : buildings)
				buildingDataList.add(new KeyValueDTO(building.getId(), building.getName()));
		
		Collections.sort(buildingDataList);
		output.setKeyValueDTO(buildingDataList.toArray(new KeyValueDTO[0]));
		
		return output;
	}
	
	
	public RoomDTO getRoom(CiDetailParameterInput detailInput) {
		RoomDTO roomDTO = new RoomDTO();
//		CiDetailParameterOutput<RoomDTO> output = new CiDetailParameterOutput<RoomDTO>();

		if(LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			Room room = RoomHbn.findById(detailInput.getCiId());
			CiLokationsKette lokationsKette = RoomHbn.findLokationsKetteById(detailInput.getCiId());
			Building building = room.getBuildingArea().getBuilding();
			Set<BuildingArea> buildingAreas = building.getBuildingAreas();

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
			roomDTO.setTableId(AirKonstanten.TABLE_ID_ROOM);
			
			
			//Standard Zugriffsrechte setzen.
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(detailInput.getCwid().toUpperCase(), room)) {
				roomDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				roomDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
			
			//spezifisches Rechte-Setzen pro Feld. Überschreibt Standard Zugriffsrechte für ausgewählte Felder.
			//Bisher in AttributeProperties.xml clientseitig gemacht.
			//Wenn RFC 9161 AIR_editable umgesetzt ist, kann folgendes für jeden CI-Typ vervollständigt werden:
			//--------------------------
			String source = room.getInsertQuelle();
			if(!source.equals(AirKonstanten.INSERT_QUELLE_SISEC) && !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {
				roomDTO.setSeverityLevelIdAcl(AirKonstanten.NO_SHORT);
			}
			//...
			//--------------------------
			
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
			}
		}
		
//		output.setCiDetailDTO(roomDTO);//setRoomDTO setCiDetailDTO
		return roomDTO;
	}
	
	public ItSystemDTO[] getSystemPlatformsById(CiEntityParameterInput detailInput) {
		List<ItSystem> itSystems = RoomHbn.getSystemPlatformsById(detailInput.getCiId());
		
		return null;
	}
	
	
	
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
	
	
	private void setCiBaseData(CiBaseDTO ciBaseDTO, CiBase ciBase) {
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
//		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwner())) {
//			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwner());
//			if (null != listPers && 1 == listPers.size()) {
//				PersonsDTO tempPers = listPers.get(0);
//				ciBaseDTO.setCiOwner(tempPers.getDisplayNameFull());
//			}
//		}
//
//		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegate())) {
//			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerDelegate());
//			if (null != listPers && 1 == listPers.size()) {
//				PersonsDTO tempPers = listPers.get(0);
//				ciBaseDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
//			}
//		}
		
		
		ciBaseDTO.setSlaId(ciBase.getSlaId());
		ciBaseDTO.setServiceContractId(ciBase.getServiceContractId());
		
		ciBaseDTO.setItSecSbAvailabilityId(ciBase.getItSecSbAvailability());
		ciBaseDTO.setItSecSbAvailabilityDescription(ciBase.getItSecSbAvailabilityText());
		
		ciBaseDTO.setItset(ciBase.getItset());
		ciBaseDTO.setTemplate(ciBase.getTemplate());
		ciBaseDTO.setItsecGroupId(ciBase.getItsecGroupId());
		
		Long template = ciBase.getTemplate();
		if (-1 == template.longValue()) {
			// TODO -1 != 1 - Achtung beim Speichern
			template = new Long(1);
			//FEHLT NOCH siehe ApplicationWS!!
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
			
			//fehlt, nötig?
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
//		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwner())) {
//			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwner());
//			if (null != listPers && 1 == listPers.size()) {
//				PersonsDTO tempPers = listPers.get(0);
//				ciBaseDTO.setCiOwner(tempPers.getDisplayNameFull());
//			}
//		}
//
//		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegate())) {
//			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO.getCiOwnerDelegate());
//			if (null != listPers && 1 == listPers.size()) {
//				PersonsDTO tempPers = listPers.get(0);
//				ciBaseDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
//			}
//		}
		
		
		ciBaseDTO.setSlaId(ciBase.getSlaId());
		ciBaseDTO.setServiceContractId(ciBase.getServiceContractId());
		
		ciBaseDTO.setItSecSbAvailabilityId(ciBase.getItSecSbAvailability());
		ciBaseDTO.setItSecSbAvailabilityDescription(ciBase.getItSecSbAvailabilityText());
		
		ciBaseDTO.setItset(ciBase.getItset());
		ciBaseDTO.setTemplate(ciBase.getTemplate());
		ciBaseDTO.setItsecGroupId(ciBase.getItsecGroupId());
		
		Long template = ciBase.getTemplate();
		if (-1 == template.longValue()) {
			// TODO -1 != 1 - Achtung beim Speichern
			template = new Long(1);
			//FEHLT NOCH siehe ApplicationWS!!
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
			
			//fehlt, nötig?
//			License_Scanning,Sample_Test_Date,Sample_Test_Result,Itsec_SB_Integ_ID,Itsec_SB_Integ_Txt,
//			Itsec_SB_Verfg_ID,Itsec_SB_Verfg_Txt,Itsec_SB_Vertr_ID,Itsec_SB_Vertr_Txt
		}
	}
}
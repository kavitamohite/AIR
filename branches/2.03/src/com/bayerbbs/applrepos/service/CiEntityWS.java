package com.bayerbbs.applrepos.service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.hibernate.CacheMode;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.ApplicationCat2;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiBase1;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.dto.ApplicationContact;
import com.bayerbbs.applrepos.dto.ApplicationContactEntryDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactGroupDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactsDTO;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.DirectLinkCIDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.dto.MassUpdateAttributeDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.dto.SchrankDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.dto.TerrainDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationCat2Hbn;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;
import com.bayerbbs.applrepos.hibernate.HibernateUtil;
import com.bayerbbs.applrepos.hibernate.ItSecGroupHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;
import com.bayerbbs.applrepos.hibernate.OperationalStatusHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.PriorityLevelHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.ServiceContractHbn;
import com.bayerbbs.applrepos.hibernate.SeverityLevelHbn;
import com.bayerbbs.applrepos.hibernate.SlaHbn;
import com.bayerbbs.applrepos.hibernate.SlaServiceContractHbn;
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
			//mit der ID des zuletzt geladenen CIs. Daher ein leeres schrankDTO zurückgeben.
			if(schrank == null)
				return schrankDTO;*/
			
			CiLokationsKette lokationsKette = SchrankHbn.findLokationsKetteById(input.getCiId());
			Building building = BuildingHbn.findById(lokationsKette.getGebaeudeId());
			
			//wenn noch alle Räume irgendwie auf die GUI sollen
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
			
			//wenn noch alle Räume irgendwie auf die GUI sollen
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
			//check this CI is if template then go for is related with other CI or not
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
			//check this CI is if template then go for is related with other CI or not
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
			
			//fehlt, nötig?
//			License_Scanning,Sample_Test_Date,Sample_Test_Result,Itsec_SB_Integ_ID,Itsec_SB_Integ_Txt,
//			Itsec_SB_Verfg_ID,Itsec_SB_Verfg_Txt,Itsec_SB_Vertr_ID,Itsec_SB_Vertr_Txt
		}
	}
	public ComplianceTemplateParameterOutput findAllDirectLinkCIWithTemplate(CiDetailParameterInput input){
		ComplianceTemplateParameterOutput output = new ComplianceTemplateParameterOutput();
		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			List<DirectLinkCIDTO> list = CiEntitiesHbn.findAllDirectLinkCIWithTemplate(input.getCiTypeId(),input.getCiId());
			if(!list.isEmpty()){
				output.setDirectLinkCIDTO(getAllDirectLinkCIArray(list));
			}
		}
		return output;
	}
	private static DirectLinkCIDTO[] getAllDirectLinkCIArray(List<DirectLinkCIDTO> listDTO) {
		 DirectLinkCIDTO[] directLinkCIDTO = new DirectLinkCIDTO[listDTO.size()];
			for (int i = 0; i < directLinkCIDTO.length; i++) {
				directLinkCIDTO[i] = listDTO.get(i);
			}
		return directLinkCIDTO;
	}

	public MassUpdateParameterOutput getCIAttributesForMassUpdate(
			CiDetailParameterInput input) {
		MassUpdateParameterOutput massUpdateParameterOutput = new MassUpdateParameterOutput();
		List<MassUpdateAttributeDTO> massUpdateAttriubteDTOs = null;
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			if(input.getCiTypeId() == AirKonstanten.TABLE_ID_APPLICATION){
				Application application = AnwendungHbn.findApplicationById(input.getCiId());
				ApplicationCat2 applicationCat2 = ApplicationCat2Hbn.findById(application.getApplicationCat2Id());
				massUpdateAttriubteDTOs = getApplicationAttributeDTOList(application,applicationCat2);				
			}
			if (input.getCiTypeId() == AirKonstanten.TABLE_ID_ROOM) {
				Room room = RoomHbn.findById(input.getCiId()); 
				massUpdateAttriubteDTOs = getAttributeDTOList(room,
						AirKonstanten.TABLE_ID_ROOM);
			}
			if (input.getCiTypeId() == AirKonstanten.TABLE_ID_BUILDING_AREA) {
				BuildingArea buildingArea = BuildingHbn
						.findBuildingAreaById(input.getCiId());
				massUpdateAttriubteDTOs = getAttributeDTOList(buildingArea,
						AirKonstanten.TABLE_ID_BUILDING_AREA);
			}
			if (input.getCiTypeId() == AirKonstanten.TABLE_ID_BUILDING) {
				Building building = BuildingHbn.findById(input.getCiId());
				massUpdateAttriubteDTOs = getAttributeDTOList(building,
						AirKonstanten.TABLE_ID_BUILDING);
			}
			if (input.getCiTypeId() == AirKonstanten.TABLE_ID_TERRAIN) {
				Terrain terrain = TerrainHbn.findById(Terrain.class,
						input.getCiId());
				massUpdateAttriubteDTOs = getAttributeDTOList(terrain,
						AirKonstanten.TABLE_ID_TERRAIN);
			}
			if (input.getCiTypeId() == AirKonstanten.TABLE_ID_POSITION) {
				Schrank schrank = SchrankHbn.findById(input.getCiId());
				massUpdateAttriubteDTOs = getAttributeDTOList(schrank,
						AirKonstanten.TABLE_ID_POSITION);
			}
			if (input.getCiTypeId() == AirKonstanten.TABLE_ID_IT_SYSTEM) {
				ItSystem itSystem = ItSystemHbn.findById(ItSystem.class,
						input.getCiId());				
			}
		}
		massUpdateParameterOutput
				.setMassUpdateAttributeDTO(getMassUpdateAttriuteDTOs(massUpdateAttriubteDTOs));

		return massUpdateParameterOutput;
	}
	
	private MassUpdateAttributeDTO[] getMassUpdateAttriuteDTOs(List<MassUpdateAttributeDTO> massUpdateAttriuteDTOs){
		MassUpdateAttributeDTO[] massUpdateAttriuteDTOArray = new MassUpdateAttributeDTO[massUpdateAttriuteDTOs.size()];
		for(int i=0; i<massUpdateAttriuteDTOs.size(); i++){
			MassUpdateAttributeDTO masAttributeDTO = massUpdateAttriuteDTOs.get(i);
			massUpdateAttriuteDTOArray[i] = masAttributeDTO;
		}
		return massUpdateAttriuteDTOArray;
	}
	
	private List<MassUpdateAttributeDTO> getAttributeDTOList(CiBase1 ciBase1, int tableId){
		List<MassUpdateAttributeDTO> massUpdateAttriuteDTOs = new ArrayList<MassUpdateAttributeDTO>();
		MassUpdateAttributeDTO maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.PRIMARY_PERSON);
		maDto.setAttributeValue(ciBase1.getCiOwner());
		maDto.setId("responsible");
		massUpdateAttriuteDTOs.add(maDto);
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.DELEGATE_PERSON_GROUP);
		maDto.setAttributeValue(ciBase1.getCiOwnerDelegate());
		maDto.setId("subResponsible");
		massUpdateAttriuteDTOs.add(maDto);
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.LINK);
		maDto.setAttributeValue(CiEntitiesHbn.getCIName(tableId,ciBase1.getRefId()));
		maDto.setId("refId");
		massUpdateAttriuteDTOs.add(maDto);
   		maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.GR1435);
        if (-1 == ciBase1.getRelevanceITSEC()) {
        	maDto.setAttributeValue("Yes");
        }else{
        	maDto.setAttributeValue("No");
        }
		maDto.setId("relevanzITSEC");
        massUpdateAttriuteDTOs.add(maDto);
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.GXP);
        maDto.setAttributeValue(ciBase1.getGxpFlag());
		maDto.setId("gxpFlag");
        massUpdateAttriuteDTOs.add(maDto);
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.ITSEC_GROUP);
        maDto.setAttributeValue(ItSecGroupHbn.getItSecGroup(ciBase1.getItsecGroupId()));
		maDto.setId("itsecGroupId");
        massUpdateAttriuteDTOs.add(maDto);
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.SLA);
        maDto.setAttributeValue(SlaHbn.getSlaName(ciBase1.getSlaId()));
        maDto.setId("slaId");
        massUpdateAttriuteDTOs.add(maDto);        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.SERVICE_CONTRACT);
        maDto.setAttributeValue(ServiceContractHbn.getServiceContract(ciBase1.getServiceContractId()));
        maDto.setId("serviceContractId");
        massUpdateAttriuteDTOs.add(maDto);                
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.PROTECTION_LEVEL_INTEGRITY);
        maDto.setAttributeValue(getValue(ciBase1.getItSecSbIntegrityId()));
		maDto.setId("itSecSbIntegrityId");
        massUpdateAttriuteDTOs.add(maDto);
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_PROTECTION_LEVEL);
        maDto.setAttributeValue(ciBase1.getItSecSbIntegrityTxt());
		maDto.setId("itSecSbIntegrityTxt");
        massUpdateAttriuteDTOs.add(maDto);
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.PROTECTION_LEVEL_CONFIDENTIALITY);
        maDto.setAttributeValue(getValue(ciBase1.getItSecSbConfidentialityId()));
		maDto.setId("itSecSbConfidentiality");
        massUpdateAttriuteDTOs.add(maDto);
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_PROTECTION_LEVEL_CONFIDENTIALITY);
        maDto.setAttributeValue(ciBase1.getItSecSbConfidentialityTxt());
		maDto.setId("itSecSbConfidentialityTxt");
        massUpdateAttriuteDTOs.add(maDto);
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.PROTECTION_LEVEL_AVAILABILITY);
        maDto.setAttributeValue(getValue(ciBase1.getItSecSbAvailability()));
		maDto.setId("itSecSbAvailability");
        massUpdateAttriuteDTOs.add(maDto);       
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_PROTECTION_LEVEL_AVAILABILITY);
        maDto.setAttributeValue(ciBase1.getItSecSbAvailabilityTxt());
		maDto.setId("itSecSbAvailabilityTxt");
        massUpdateAttriuteDTOs.add(maDto);
		
		
		return massUpdateAttriuteDTOs;
	}
	
	private List<MassUpdateAttributeDTO> getApplicationAttributeDTOList(Application application, ApplicationCat2 cat2){
		List<MassUpdateAttributeDTO> massUpdateAttriuteDTOs = new ArrayList<MassUpdateAttributeDTO>();
		
		MassUpdateAttributeDTO maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.APPLICATION_CATEGORY_2);
        maDto.setAttributeValue(cat2.getAnwendungKat2Text());
        maDto.setId("applicationCat2Id");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new  MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.LIFE_CYCLE_STATUS);
        if(application.getLifecycleStatusId()!= null)
        maDto.setAttributeValue(LifecycleStatusHbn.findById(application.getLifecycleStatusId()).getlcStatusEn());
        maDto.setId("lifecycleStatusId");
        massUpdateAttriuteDTOs.add(maDto);

                
        maDto = new  MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.OPERATIONAL_STATUS);
        if(application.getOperationalStatusId() != null)
        maDto.setAttributeValue(OperationalStatusHbn.findById(application.getOperationalStatusId()).getOperationalStatusEn());
        maDto.setId("operationalStatusId");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.PRIORITY_LEVEL);
        if(application.getPriorityLevelId() != null)
        maDto.setAttributeValue(PriorityLevelHbn.findById(application.getPriorityLevelId()).getPriorityLevel());
        maDto.setId("priorityLevelId");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.SEVERITY_LEVEL);
        if(application.getSeverityLevelId() != null)
        maDto.setAttributeValue(SeverityLevelHbn.findById(application.getSeverityLevelId()).getSeverityLevelName());
        maDto.setId("severityLevelId");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.CLUSTER_CODE);
        maDto.setAttributeValue(application.getClusterCode());
        maDto.setId("clusterCode");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.CLUSTER_TYPE);
        maDto.setAttributeValue(application.getClusterType());
        maDto.setId("clusterType");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.PRIMARY_PERSON);
        maDto.setAttributeValue(application.getResponsible());
        maDto.setId("responsible");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.DELEGATE_PERSON_GROUP);
        maDto.setAttributeValue(application.getSubResponsible());
        maDto.setId("subResponsible");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.LINK);
        if(application.getRefId() != null)
        maDto.setAttributeValue(CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_APPLICATION,application.getRefId()));
        maDto.setId("refId");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.GR1435);
        if (-1 == application.getRelevanzITSEC()) {
        	maDto.setAttributeValue("Yes");
        }else{
        	maDto.setAttributeValue("No");
        }
        maDto.setId("relevanzITSEC");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.GXP);
        maDto.setAttributeValue(application.getGxpFlag());
        maDto.setId("gxpFlag");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.ITSEC_GROUP);
        if(application.getItsecGroupId() != null)
        maDto.setAttributeValue(ItSecGroupHbn.getItSecGroup(application.getItsecGroupId()));
        maDto.setId("itsecGroupId");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.SLA);
        maDto.setAttributeValue(SlaHbn.getSlaName(application.getSlaId()));
        maDto.setId("slaId");
        massUpdateAttriuteDTOs.add(maDto);
        
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.SERVICE_CONTRACT);
        maDto.setAttributeValue(ServiceContractHbn.getServiceContract(application.getServiceContractId()));
        maDto.setId("serviceContractId");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.PROTECTION_LEVEL_AVAILABILITY);
        maDto.setAttributeValue(getValue(application.getItSecSbAvailability()));
        maDto.setId("itSecSbAvailability");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_PROTECTION_LEVEL_AVAILABILITY);
        maDto.setAttributeValue(application.getItSecSbAvailabilityTxt());
        maDto.setId("itSecSbAvailabilityTxt");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.PROTECTION_LEVEL_CONFIDENTIALITY);
        maDto.setAttributeValue(getValue(application.getItSecSbConfidentiality()));
        maDto.setId("itSecSbConfidentiality");
        massUpdateAttriuteDTOs.add(maDto);
        
        maDto = new MassUpdateAttributeDTO();
        maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_PROTECTION_LEVEL_CONFIDENTIALITY);
        maDto.setAttributeValue(application.getItSecSbConfidentialityTxt());
        maDto.setId("itSecSbConfidentialityTxt");
        massUpdateAttriuteDTOs.add(maDto);
                
		return massUpdateAttriuteDTOs;

	}
	
	private static String getValue(Long id) {
		if (id == null)
			return "";
		else if (id == 3)
			return "high";
		else if (id == 2)
			return "medium";
		else if (id == 1)
			return "low";
		else
			return "";

	}
	
	public MassUpdateValueTransferParameterOutPut massUpdate(MassUpdateParameterInput  massUpdateParameterInput){
		MassUpdateValueTransferParameterOutPut maParameterOutPut = new MassUpdateValueTransferParameterOutPut();
		
		try {
			
			if(LDAPAuthWS.isLoginValid(massUpdateParameterInput.getCwid(), massUpdateParameterInput.getToken())){
				if(massUpdateParameterInput.getCiTypeId() == AirKonstanten.TABLE_ID_APPLICATION){
					maParameterOutPut =applicationMassUpdate(massUpdateParameterInput);
				}else{
					Long ciTypeId = massUpdateParameterInput.getCiTypeId();
					String sql="";
					CiBase1 templaeLocationCI=null;
					if(ciTypeId == AirKonstanten.TABLE_ID_POSITION){
						templaeLocationCI= SchrankHbn.findById(massUpdateParameterInput.getTemplateCiId());
						 sql = "select h from Schrank as h where h.id in(" + massUpdateParameterInput.getSelectedCIs()+ ")";				
					}else{
						if(ciTypeId == AirKonstanten.TABLE_ID_ROOM){
							templaeLocationCI = RoomHbn.findById(massUpdateParameterInput.getTemplateCiId());
							sql = "select h from Room as h where h.id in(" + massUpdateParameterInput.getSelectedCIs()+ ")";
						}else{
							if(ciTypeId == AirKonstanten.TABLE_ID_BUILDING){
								templaeLocationCI = BuildingHbn.findById(massUpdateParameterInput.getTemplateCiId());
								sql = "select h from Building as h where h.id in(" + massUpdateParameterInput.getSelectedCIs()+ ")";							
							}else{
								if(ciTypeId == AirKonstanten.TABLE_ID_BUILDING_AREA){
									templaeLocationCI = BuildingHbn.findBuildingAreaById(massUpdateParameterInput.getTemplateCiId());
									sql = "select h from BuildingArea as h where h.id in(" + massUpdateParameterInput.getSelectedCIs()+ ")";							
								}else{
									if(ciTypeId == AirKonstanten.TABLE_ID_TERRAIN){
										templaeLocationCI = TerrainHbn.findById(massUpdateParameterInput.getTemplateCiId());
										sql = "select h from Terrain as h where h.id in(" + massUpdateParameterInput.getSelectedCIs()+ ")";							
									}else{
										if(ciTypeId == AirKonstanten.TABLE_ID_SITE){
											templaeLocationCI = StandortHbn.findById(Standort.class, massUpdateParameterInput.getTemplateCiId());
											sql = "select h from Standort as h where h.id in(" + massUpdateParameterInput.getSelectedCIs()+ ")";							
										}
									}
								}
								
							}
						}
						maParameterOutPut =locationCIMassUpdate(massUpdateParameterInput, sql,
								templaeLocationCI);
					}
				}
				
				//update GPSC Contacts
				updateGPSCContacts(massUpdateParameterInput);
				
			}

			
		} catch (Exception e) {
			// handle exception
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getMessage() });
		}

		
		return maParameterOutPut;
	}


	/**
	 * @param massUpdateParameterInput
	 */
	private void updateGPSCContacts(
			MassUpdateParameterInput massUpdateParameterInput) {
		if(massUpdateParameterInput.getAllGPSCContacts() || massUpdateParameterInput.getNonEmptyGPSCContacts()){
			List<ApplicationContactGroupDTO> applicationContactGroupDTOs = getGPSCContacts(massUpdateParameterInput.getTemplateCiId(), massUpdateParameterInput.getCiTypeId().intValue());
			String selectedCis[] = massUpdateParameterInput.getSelectedCIs().split(",");
			for(int i=0; i<selectedCis.length; i++){
				if(org.apache.commons.lang.StringUtils.isNotEmpty(selectedCis[i])){
					for(ApplicationContactGroupDTO apGroupDTO : applicationContactGroupDTOs){
						if(apGroupDTO.getApplicationContactEntryDTO().length > 0){
							ApplicationContactEntryDTO apEntryDTO = apGroupDTO.getApplicationContactEntryDTO()[0];
							if(org.apache.commons.lang.StringUtils.isNotEmpty(apEntryDTO.getGroupName())){
								CiGroupsHbn.saveCiGroup(massUpdateParameterInput.getCwid(), massUpdateParameterInput.getCiTypeId().intValue(),
										Long.valueOf(selectedCis[i]), apGroupDTO.getGroupTypeId(), apGroupDTO.getGroupTypeName(),
										apEntryDTO.getGroupName());
							}else{
								if(org.apache.commons.lang.StringUtils.isNotEmpty(apEntryDTO.getPersonName())){
									CiPersonsHbn.saveCiPerson(massUpdateParameterInput.getCwid(), massUpdateParameterInput.getCiTypeId().intValue(),
											Long.valueOf(selectedCis[i]), apGroupDTO.getGroupTypeId(), apGroupDTO.getGroupTypeName(),
											apEntryDTO.getCwid());
								}
							}
						}						
					}
				}
			}
		}
	}


	/**
	 * @param massUpdateParameterInput
	 * @param sql
	 * @param templaeLocationCI
	 */
	private MassUpdateValueTransferParameterOutPut locationCIMassUpdate(
			MassUpdateParameterInput massUpdateParameterInput, String sql,
			CiBase1 templaeLocationCI) {
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		MassUpdateValueTransferParameterOutPut maParameterOutPut = new MassUpdateValueTransferParameterOutPut();
		boolean toCommit = false;
		try {
			ScrollableResults locationCIS = session.createQuery(sql)
		    .setCacheMode(CacheMode.IGNORE)
		    .scroll(ScrollMode.FORWARD_ONLY);
		int count=0;
		while (locationCIS.next()) {
			CiBase1 locationCi = (CiBase1) locationCIS.get(0);

			if(massUpdateParameterInput.getResponsible()){
				locationCi.setCiOwner(templaeLocationCI.getCiOwner());
			}
			if(massUpdateParameterInput.getSubResponsible()){
				locationCi.setCiOwnerDelegate(templaeLocationCI.getCiOwnerDelegate());
			}
			if(massUpdateParameterInput.getRefId()){
				locationCi.setRefId(templaeLocationCI.getRefId());
			}
			if(massUpdateParameterInput.getRelevanzITSEC()){
				locationCi.setRelevanceITSEC(templaeLocationCI.getRelevanceITSEC());
			}
			if(massUpdateParameterInput.getGxpFlag()){
				locationCi.setGxpFlag(templaeLocationCI.getGxpFlag());
			}
			if(massUpdateParameterInput.getItsecGroupId()){
				locationCi.setItsecGroupId(templaeLocationCI.getItsecGroupId());
			}
			if(massUpdateParameterInput.getSlaId()){
				locationCi.setSlaId(templaeLocationCI.getSlaId());
			}
			if(massUpdateParameterInput.getServiceContractId()){
				locationCi.setServiceContractId(templaeLocationCI.getServiceContractId());
			}
			if(massUpdateParameterInput.getItSecSbAvailability()){
				locationCi.setItSecSbAvailability(templaeLocationCI.getItSecSbAvailability());
			}
			if(massUpdateParameterInput.getItSecSbAvailabilityTxt()){
				locationCi.setItSecSbAvailabilityTxt(templaeLocationCI.getItSecSbAvailabilityTxt());
			}
			if(massUpdateParameterInput.getItSecSbConfidentiality()){
				locationCi.setItSecSbConfidentialityId(templaeLocationCI.getItSecSbConfidentialityId());
			}
			if(massUpdateParameterInput.getItSecSbConfidentialityTxt()){
				locationCi.setItSecSbConfidentialityTxt(templaeLocationCI.getItSecSbConfidentialityTxt());
			}
			if(massUpdateParameterInput.isItSecSbIntegrityId()){
				locationCi.setItSecSbIntegrityId(templaeLocationCI.getItSecSbIntegrityId());
			}
			if(massUpdateParameterInput.isItSecSbIntegrityTxt()){
				locationCi.setItSecSbIntegrityTxt(templaeLocationCI.getItSecSbIntegrityTxt());
			}
			
		    if ( ++count % 20 == 0 ) {
		        session.flush();
		        session.clear();
		    }
		}
		session.flush();
		session.clear();
		tx.commit();
		if(massUpdateParameterInput.getItsecGroupId()){
			tx = session.beginTransaction();
			String sqlItsec = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";
			
			Connection conn = session.connection();
			
			CallableStatement stmt = conn.prepareCall(sqlItsec);
			String selectedCIsArray[] = massUpdateParameterInput.getSelectedCIs().split(",");
			int size = selectedCIsArray.length;
			for(int i=0;i<size; i++ ){
				stmt.setLong(1, massUpdateParameterInput.getCiTypeId());
				stmt.setLong(2, Long.valueOf(selectedCIsArray[i]));
				stmt.setLong(3, Long.valueOf(templaeLocationCI.getItsecGroupId()));
				stmt.addBatch();
			}
			int [] updateCounts = stmt.executeBatch();
			tx.commit();
			System.out.println(updateCounts);
		}		

		toCommit = true;
		} catch (Exception e) {
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getMessage() });
		}finally {
			String hbnMessage = HibernateUtil.close(tx, session, toCommit);
			if (toCommit) {
				if (null == hbnMessage) {
					maParameterOutPut.setResult(AirKonstanten.RESULT_OK);
					maParameterOutPut.setMessages(new String[] { "" });
				} else {
					maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
					maParameterOutPut.setMessages(new String[] { hbnMessage });
				}
			}
		}
		
		return maParameterOutPut;   

	}


	private MassUpdateValueTransferParameterOutPut applicationMassUpdate(
			MassUpdateParameterInput massUpdateParameterInput) {
		MassUpdateValueTransferParameterOutPut maParameterOutPut = new MassUpdateValueTransferParameterOutPut();		
		Application templateApplication = AnwendungHbn.findApplicationById(massUpdateParameterInput.getTemplateCiId());		
		Session session = HibernateUtil.getSession();;
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			ScrollableResults applications = session.createQuery("select h from Application as h where h.applicationId in(" + massUpdateParameterInput.getSelectedCIs()+ ")")
		    .setCacheMode(CacheMode.IGNORE)
		    .scroll(ScrollMode.FORWARD_ONLY);
		int count=0;
		while (applications.next()) {
			
			Application application = (Application) applications.get(0);
			if(massUpdateParameterInput.getApplicationCat2Id()){
				application.setApplicationCat2Id(templateApplication.getApplicationCat2Id());
			}
			if(massUpdateParameterInput.getLifecycleStatusId()){
				application.setLifecycleStatusId(templateApplication.getLifecycleStatusId());
			}
			if(massUpdateParameterInput.getOperationalStatusId()){
				application.setOperationalStatusId(templateApplication.getOperationalStatusId());
			}
			if(massUpdateParameterInput.getPriorityLevelId()){
				application.setPriorityLevelId(templateApplication.getPriorityLevelId());
			}
			if(massUpdateParameterInput.getSeverityLevelId()){
				application.setSeverityLevelId(templateApplication.getSeverityLevelId());
			}
			if(massUpdateParameterInput.getClusterCode()){
				application.setClusterCode(templateApplication.getClusterCode());
			}
			if(massUpdateParameterInput.getClusterType()){
				application.setClusterType(templateApplication.getClusterType());
			}
			if(massUpdateParameterInput.getResponsible()){
				application.setResponsible(templateApplication.getResponsible());
			}
			if(massUpdateParameterInput.getSubResponsible()){
				application.setSubResponsible(templateApplication.getSubResponsible());
			}
			if(massUpdateParameterInput.getRefId()){
				application.setRefId(templateApplication.getRefId());
			}
			if(massUpdateParameterInput.getRelevanzITSEC()){
				application.setRelevanzITSEC(templateApplication.getRelevanzITSEC());
			}
			if(massUpdateParameterInput.getGxpFlag()){
				application.setGxpFlag(templateApplication.getGxpFlag());
			}
			if(massUpdateParameterInput.getItsecGroupId()){
				application.setItsecGroupId(templateApplication.getItsecGroupId());
			}
			if(massUpdateParameterInput.getSlaId()){
				application.setSlaId(templateApplication.getSlaId());
			}
			if(massUpdateParameterInput.getServiceContractId()){
				application.setServiceContractId(templateApplication.getServiceContractId());
			}
			if(massUpdateParameterInput.getItSecSbAvailability()){
				application.setItSecSbAvailability(templateApplication.getItSecSbAvailability());
			}
			if(massUpdateParameterInput.getItSecSbAvailabilityTxt()){
				application.setItSecSbAvailabilityTxt(templateApplication.getItSecSbAvailabilityTxt());
			}
			if(massUpdateParameterInput.getItSecSbConfidentiality()){
				application.setItSecSbConfidentiality(templateApplication.getItSecSbConfidentiality());
			}
			if(massUpdateParameterInput.getItSecSbConfidentialityTxt()){
				application.setItSecSbConfidentialityTxt(templateApplication.getItSecSbConfidentialityTxt());
			}
		    if ( ++count % 20 == 0 ) {
		        session.flush();
		        session.clear();
		    }
		}
		session.flush();
		session.clear();
		tx.commit();
		if(massUpdateParameterInput.getItsecGroupId()){
			tx = session.beginTransaction();
			String sql = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";
			
			Connection conn = session.connection();
			
			CallableStatement stmt = conn.prepareCall(sql);
			String selectedCIsarray[] = massUpdateParameterInput.getSelectedCIs().split(",");
			int size = selectedCIsarray.length;
			for(int i=0;i<size; i++ ){
				stmt.setLong(1, massUpdateParameterInput.getCiTypeId());
				stmt.setLong(2, Long.valueOf(selectedCIsarray[i]));
				stmt.setLong(3, Long.valueOf(templateApplication.getItsecGroupId()));
				stmt.addBatch();
			}
			int [] updateCounts = stmt.executeBatch();
			tx.commit();
			System.out.println(updateCounts);
		}		
		toCommit = true;
			
		} catch (Exception e) {
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getMessage() });
		}finally{
			if (toCommit) {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (null == hbnMessage) {
					maParameterOutPut.setResult(AirKonstanten.RESULT_OK);
					maParameterOutPut.setMessages(new String[] { "" });
				} else {
					maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
					maParameterOutPut.setMessages(new String[] { hbnMessage });
				}
			}
		}
		return maParameterOutPut ;		   
	}
	
	public List<ApplicationContactGroupDTO>  getGPSCContacts(Long ciId, Integer tableId){

		List<ApplicationContact> listContacts = AnwendungHbn.findApplicationContacts(ciId, tableId);

		String lastGroupTypeName = AirKonstanten.STRING_EMPTY;

		ArrayList<ApplicationContactGroupDTO> listGroups = new ArrayList<ApplicationContactGroupDTO>();
		ArrayList<ApplicationContactEntryDTO> listEntries = new ArrayList<ApplicationContactEntryDTO>();
		ApplicationContactGroupDTO group = new ApplicationContactGroupDTO();

		Iterator<ApplicationContact> itContacts = listContacts.iterator();

		ApplicationContact contact = null;
		ApplicationContactEntryDTO entry = new ApplicationContactEntryDTO();

		while (itContacts.hasNext()) {
			contact = itContacts.next();

			if (!lastGroupTypeName.equals(contact.getGroupTypeName()) || !itContacts.hasNext()) {
				if ("".equals(lastGroupTypeName)) {
					// handle the first group - nothing more to do
					group.setGroupTypeId(contact.getGroupTypeId());
					group.setGroupTypeName(contact.getGroupTypeName());					
					
					lastGroupTypeName = contact.getGroupTypeName();
					
				} else {
					if (null != entry) {
						listEntries.add(entry);
					}
					// the group is finished - set entries
					ApplicationContactEntryDTO temp[] = new ApplicationContactEntryDTO[listEntries.size()];
					for (int i = 0; i < temp.length; i++) {
						temp[i] = listEntries.get(i);
					}
					group.setApplicationContactEntryDTO(temp);
					listGroups.add(group);
					lastGroupTypeName = contact.getGroupTypeName();
					// new group
					group = new ApplicationContactGroupDTO();
					group.setGroupTypeId(contact.getGroupTypeId());
					group.setGroupTypeName(contact.getGroupTypeName());					

					listEntries = new ArrayList<ApplicationContactEntryDTO>();
					entry = new ApplicationContactEntryDTO();

				}
			}
			if (null != contact.getCwid()) { 
				// contact has valid entry
				//entry = new ApplicationContactEntryDTO();
				entry.setCwid(contact.getCwid());
			}
				// entry.setPersonName(contact.getPersonName());
			if ( null != contact.getGroupName()) {
				entry.setGroupId(contact.getGroupId().toString());
				entry.setGroupName(contact.getGroupName());
			}

		}


		return listGroups;

	}
	public ComplianceControlParameterOutput findAllCIComplianceControlForMassUpdate(CiDetailParameterInput input){
		ComplianceControlParameterOutput output = new ComplianceControlParameterOutput();
		if(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			List<ComplianceControlDTO> list = CiEntitiesHbn.findAllCIComplianceControl(input.getCiTypeId(),input.getCiId());
			if(!list.isEmpty()){
				int size = list.size();
				int i=0;
				ComplianceControlDTO[] controlDTOs = new ComplianceControlDTO[size];
				for(ComplianceControlDTO coDto : list){
					controlDTOs[i] = coDto;
					i++;
				}
				output.setCopmlianceControlDTOs(controlDTOs);
			}
		}
		return output;
	}
}
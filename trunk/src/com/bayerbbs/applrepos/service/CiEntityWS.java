package com.bayerbbs.applrepos.service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.CacheMode;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.ApplicationCat2;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.BusinessApplication;
import com.bayerbbs.applrepos.domain.BusinessApplicationDTO;
import com.bayerbbs.applrepos.domain.CiBase1;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Function;
import com.bayerbbs.applrepos.domain.FunctionDTO;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.LifecycleStatus;
import com.bayerbbs.applrepos.domain.OperationalStatus;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Service;
import com.bayerbbs.applrepos.domain.ServiceDTO;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.ApplicationContact;
import com.bayerbbs.applrepos.dto.ApplicationContactEntryDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactGroupDTO;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.DirectLinkCIDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.MassUpdateAttributeDTO;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.dto.SchrankDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.dto.TerrainDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationCat2Hbn;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.BusinessApplicationHbn;
import com.bayerbbs.applrepos.hibernate.BusinessEssentialHbn;
import com.bayerbbs.applrepos.hibernate.CategoryBusinessHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;
import com.bayerbbs.applrepos.hibernate.ClassInformationHbn;
import com.bayerbbs.applrepos.hibernate.ConfidentialityHbn;
import com.bayerbbs.applrepos.hibernate.HibernateUtil;
import com.bayerbbs.applrepos.hibernate.ItSecGroupHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;
import com.bayerbbs.applrepos.hibernate.ItsecMassnahmeStatusHbn;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;
import com.bayerbbs.applrepos.hibernate.OperationalStatusHbn;
import com.bayerbbs.applrepos.hibernate.PathwayHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.PriorityLevelHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.ServiceContractHbn;
import com.bayerbbs.applrepos.hibernate.ServiceHbn;
import com.bayerbbs.applrepos.hibernate.SeverityLevelHbn;
import com.bayerbbs.applrepos.hibernate.SlaHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;
import com.bayerbbs.applrepos.hibernate.TerrainHbn;
import com.bayerbbs.applrepos.hibernate.functionHbn;

public class CiEntityWS {
	static final String YES = "Y";
	static final String NO = "N";
	static final String KOMMA = ",";
	static final String EQUAL = "=";

	public CiEntityParameterOutput findCiEntities(CiEntityParameterInput input) {
		CiEntityParameterOutput output = new CiEntityParameterOutput();
		List<ViewDataDTO> listDTO = CiEntitiesHbn.findCisByTypeAndNameOrAlias(
				input.getType(), input.getQuery());

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

	public DwhEntityParameterOutput findByTypeAndName(
			CiEntityParameterInput input) {// String ciType, String ciName
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			output = CiEntitiesHbn.findByTypeAndName(input.getType(),
					input.getQuery(), input.getStart(), input.getLimit());

		return output;
	}

	public DwhEntityParameterOutput getDwhEntityRelations(
			CiEntityParameterInput input) {
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			output = CiEntitiesHbn.getDwhEntityRelations(input.getTableId(),
					input.getCiId(), input.getDirection());

		return output;
	}

	public ItSystemDTO getItSystem(CiDetailParameterInput input) {
		ItSystemDTO itSystemDTO = new ItSystemDTO();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			ItSystem itSystem = ItSystemHbn.findById(ItSystem.class,
					input.getCiId());

			itSystemDTO.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
			Integer ciSubType = itSystem.getCiSubTypeId() != null ? itSystem
					.getCiSubTypeId()
					: AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT;
			itSystemDTO.setCiSubTypeId(ciSubType);

			setCiBaseData(itSystemDTO, itSystem);

			itSystemDTO.setOsNameId(itSystem.getOsNameId());
			itSystemDTO.setClusterCode(itSystem.getClusterCode());
			itSystemDTO.setClusterType(itSystem.getClusterType());
			itSystemDTO.setIsVirtualHardwareClient(itSystem
					.getIsVirtualHardwareClient());
			itSystemDTO.setIsVirtualHardwareHost(itSystem
					.getIsVirtualHardwareHost());
			itSystemDTO.setVirtualHardwareSoftware(itSystem
					.getVirtualHardwareSoftware());
			itSystemDTO.setBackupType(itSystem.getBackupType());
			itSystemDTO.setServicePack(itSystem.getServicePack());
			itSystemDTO.setLifecycleStatusId(itSystem.getLifecycleStatusId());
			itSystemDTO.setEinsatzStatusId(itSystem.getEinsatzStatusId());
			itSystemDTO.setPrimaryFunctionId(itSystem.getPrimaryFunctionId());
			itSystemDTO.setLicenseScanningId(itSystem.getLicenseScanningId());

			itSystemDTO.setPriorityLevelId(itSystem.getPriorityLevelId());
			itSystemDTO.setSeverityLevelId(itSystem.getSeverityLevelId());
			itSystemDTO.setBusinessEssentialId(itSystem
					.getBusinessEssentialId());

			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), itSystem)) {
				itSystemDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				itSystemDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return itSystemDTO;
	}

	public StandortDTO getStandort(CiDetailParameterInput input) {
		StandortDTO standortDTO = new StandortDTO();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Standort standort = StandortHbn.findById(Standort.class,
					input.getCiId());
			CiLokationsKette lokationsKette = StandortHbn
					.findLokationsKetteById(input.getCiId());

			// Set<Terrain> terrains = standort.getTerrains();
			standortDTO.setStandortCode(standort.getStandortCode());
			standortDTO.setTableId(AirKonstanten.TABLE_ID_SITE);

			setCiBaseData(standortDTO, standort);
			standortDTO.setCiLokationsKette(lokationsKette);
			standortDTO.setNameEn(standort.getNameEn());

			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), standort)) {
				standortDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				standortDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return standortDTO;
	}

	public TerrainDTO getTerrain(CiDetailParameterInput input) {
		TerrainDTO terrainDTO = new TerrainDTO();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Terrain terrain = TerrainHbn.findById(Terrain.class,
					input.getCiId());
			CiLokationsKette lokationsKette = TerrainHbn
					.findLokationsKetteById(input.getCiId());

			// Set<Building> building = terrain.getBuildings();
			terrainDTO.setTableId(AirKonstanten.TABLE_ID_TERRAIN);

			setCiBaseData(terrainDTO, terrain);
			terrainDTO.setCiLokationsKette(lokationsKette);

			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), terrain)) {
				terrainDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				terrainDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return terrainDTO;
	}

	public SchrankDTO getSchrank(CiDetailParameterInput input) {
		SchrankDTO schrankDTO = new SchrankDTO();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Schrank schrank = SchrankHbn.findById(input.getCiId());

			/*
			 * //wenn bei Schrank Neuanlage ein reload vor dem Speichern gemacht
			 * wird, gibt es nich keine ID. Es wird die ID des //zuletzt
			 * geladenen CIs aus den Cookie Daten in input.getCiId() geliefert.
			 * Es gibt sehr wahrscheinlich kein Schrank //mit der ID des zuletzt
			 * geladenen CIs. Daher ein leeres schrankDTO zurückgeben.
			 * if(schrank == null) return schrankDTO;
			 */

			CiLokationsKette lokationsKette = SchrankHbn
					.findLokationsKetteById(input.getCiId());
			Building building = BuildingHbn.findById(lokationsKette
					.getGebaeudeId());

			// wenn noch alle Räume irgendwie auf die GUI sollen
			// Set<Room> rooms = buildingArea.getRooms();
			schrankDTO.setSeverityLevelId(schrank.getSeverityLevelId());
			schrankDTO.setBusinessEssentialId(schrank.getBusinessEssentialId());
			schrankDTO.setTableId(AirKonstanten.TABLE_ID_POSITION);
			setCiBaseData(schrankDTO, schrank);
			schrankDTO.setCiLokationsKette(lokationsKette);
			schrankDTO.setStreet(building.getStreet());
			schrankDTO.setStreetNumber(building.getStreetNumber());
			schrankDTO.setPostalCode(building.getPostalCode());
			schrankDTO.setLocation(building.getLocation());

			// Standard Zugriffsrechte setzen.
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), schrank)) {
				schrankDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				schrankDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return schrankDTO;
	}

	public BuildingDTO getBuilding(CiDetailParameterInput input) {
		BuildingDTO buildingDTO = new BuildingDTO();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Building building = BuildingHbn.findById(Building.class,
					input.getCiId());
			CiLokationsKette lokationsKette = BuildingHbn
					.findLokationsKetteById(input.getCiId());

			// wenn noch alle Räume aller BuildingAreas irgendwie auf die GUI
			// sollen
			// Set<BuildingArea> buildingAreas = building.getBuildingAreas();

			buildingDTO.setAlias(building.getAlias());
			buildingDTO.setStreet(building.getStreet());
			buildingDTO.setStreetNumber(building.getStreetNumber());
			buildingDTO.setPostalCode(building.getPostalCode());
			buildingDTO.setLocation(building.getLocation());
			// vandana
			buildingDTO.setProviderName(building.getProvider_Name());
			buildingDTO.setProviderAddress(building.getProvider_Address());
			// vandana
			buildingDTO.setTableId(AirKonstanten.TABLE_ID_BUILDING);

			setCiBaseData(buildingDTO, building);
			buildingDTO.setCiLokationsKette(lokationsKette);

			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), building)) {
				buildingDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				buildingDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return buildingDTO;
	}

	public BuildingAreaDTO getBuildingArea(CiDetailParameterInput input) {
		BuildingAreaDTO buildingAreaDTO = new BuildingAreaDTO();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			BuildingArea buildingArea = BuildingHbn.findById(
					BuildingArea.class, input.getCiId());// BuildingHbn.findBuildingAreaById(detailInput.getCiId());
			CiLokationsKette lokationsKette = BuildingHbn
					.findLokationsKetteByAreaId(input.getCiId());
			Building building = BuildingHbn.findById(lokationsKette
					.getGebaeudeId());

			// wenn noch alle Räume irgendwie auf die GUI sollen
			// Set<Room> rooms = buildingArea.getRooms();

			buildingAreaDTO.setTableId(AirKonstanten.TABLE_ID_BUILDING_AREA);
			setCiBaseData(buildingAreaDTO, buildingArea);
			buildingAreaDTO.setCiLokationsKette(lokationsKette);

			buildingAreaDTO.setStreet(building.getStreet());
			buildingAreaDTO.setStreetNumber(building.getStreetNumber());
			buildingAreaDTO.setPostalCode(building.getPostalCode());
			buildingAreaDTO.setLocation(building.getLocation());
			// vandana
			buildingAreaDTO.setProviderName(buildingArea.getProvider_Name());
			buildingAreaDTO.setProviderAddress(buildingArea
					.getProvider_Address());
			// vandana
	
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), buildingArea)) {
				buildingAreaDTO
						.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				buildingAreaDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		}

		return buildingAreaDTO;
	}

	public RoomDTO getRoom(CiDetailParameterInput input) {
		RoomDTO roomDTO = new RoomDTO();


		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Room room = RoomHbn.findById(input.getCiId());
			CiLokationsKette lokationsKette = RoomHbn
					.findLokationsKetteById(input.getCiId());
			Building building = room.getBuildingArea().getBuilding();
			// Set<BuildingArea> buildingAreas = building.getBuildingAreas();
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
			roomDTO.setProviderName(room.getProvider_Name());
			roomDTO.setProviderAddress(room.getProvider_Address());
			
			//C0000069237
			roomDTO.setItHeadHidden(room.getIt_Head());
			if (StringUtils.isNotNullOrEmpty(room.getIt_Head())) {// ItHead
				List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(room.getIt_Head());// ItHead
				if (null != listPers && 1 == listPers.size()) {
					PersonsDTO tempPers = listPers.get(0);
					roomDTO.setItHead(tempPers.getDisplayNameFull());
				}
			}
			//C0000069237

			// Standard Zugriffsrechte setzen.
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), room)) {
				roomDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				roomDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}

			// spezifisches Rechte-Setzen pro Feld. Überschreibt Standard
			// Zugriffsrechte für ausgewählte Felder.
			// Bisher in AttributeProperties.xml clientseitig gemacht.
			// Wenn RFC 9161 AIR_editable umgesetzt ist, kann folgendes für
			// jeden CI-Typ vervollständigt werden:
			// --------------------------
			String source = room.getInsertQuelle();
			if (!source.equals(AirKonstanten.INSERT_QUELLE_SISEC)
					&& !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {
				roomDTO.setSeverityLevelIdAcl(AirKonstanten.NO_SHORT);
			}


		}

		// output.setCiDetailDTO(roomDTO);//setRoomDTO setCiDetailDTO
		return roomDTO;
	}



	public FunctionDTO getFunction(CiDetailParameterInput input) {
		FunctionDTO functionDTO = new FunctionDTO();
		String cwid = input.getCwid();
		if (LDAPAuthWS.isLoginValid(cwid, input.getToken())) {

			Function function = functionHbn.findById(input.getCiId());
			functionDTO.setTableId(AirKonstanten.TABLE_ID_FUNCTION);
			setFunctionDTO(function, functionDTO);
			boolean isEditable = false;
			if (null != function && null == function.getDeleteQuelle()) {

				if (null == function.getCiOwner() && null == function.getCiOwnerDelegate()) {
					//wenn kein owner oder delegate, dürfen alle editieren
					isEditable = true;
				}

				if (!isEditable && (cwid.equals(function.getCiOwner()) || 
						   cwid.equals(function.getCiOwnerDelegate()))) {
					isEditable = true;
				}
				
				if (!isEditable && null != function.getCiOwnerDelegate()) {
					if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(function.getCiOwnerDelegate(), cwid))) {
						isEditable = true;
					}
				}
			}
			if (isEditable) {
				functionDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				functionDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
			


		}
		return functionDTO;
	}

	//Added by ENFZM
	public BusinessApplicationDTO getBusinessApplication(
			ApplicationDetailParameterInput input) {
		BusinessApplicationDTO businessApplicationDTO = new BusinessApplicationDTO();
		String cwid = input.getCwid();
		if (LDAPAuthWS.isLoginValid(cwid, input.getToken())) {

			BusinessApplication businessApplication = BusinessApplicationHbn
					.findById(input.getId());
			businessApplicationDTO
					.setTableId(AirKonstanten.TABLE_ID_BUSINESS_APPLICATION);
			setBusinessApplicationDTO(businessApplication,
					businessApplicationDTO);

			boolean isEditable = false;
			if (null != businessApplication
					&& null == businessApplication.getDeleteQuelle()) {

				if ((cwid.equals(businessApplication.getApplicationOwner()))
						|| (cwid.equals(businessApplication
								.getApplicationSteward()))||(AccessRightChecker.hasRole(cwid, input.getToken(), AirKonstanten.ROLE_AIR_BAR_EDITOR))) {
					isEditable = true;
				}

			}
			if (isEditable) {
				businessApplicationDTO
						.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				businessApplicationDTO
						.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}

		}
		return businessApplicationDTO;
	}
	// Ended
	
	// Added by vandana
	public PathwayDTO getWays(CiDetailParameterInput input) {
		PathwayDTO pathwayDTO = new PathwayDTO();
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {

			Ways pathway = PathwayHbn.findById(input.getCiId());
			pathwayDTO.setTableId(AirKonstanten.TABLE_ID_WAYS);
			setCiBaseData(pathwayDTO, pathway);
			AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), pathway)) {
				pathwayDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				pathwayDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}
		
		}
		return pathwayDTO;
	}

	// Added by vandana

	public ServiceDTO getService(CiDetailParameterInput input) {
		ServiceDTO serviceDTO = new ServiceDTO();
		String cwid=input.getCwid();
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			Service service = ServiceHbn.findById(Service.class,
					input.getCiId());
			serviceDTO.setTableId(AirKonstanten.TABLE_ID_SERVICE);
			serviceDTO.setAlias(service.getServiceAias());
			serviceDTO.setServiceDescription(service.getServiceDescription());
			serviceDTO.setProjectName(service.getProjectName());
			serviceDTO.setOrderNumber(service.getOrderNumber());
			serviceDTO.setOrganisationalScope(service.getOrganisationalScope());
			serviceDTO.setCompanyCode(service.getCompanyCode());
			setCiBaseData(serviceDTO, service);
			/*AccessRightChecker checker = new AccessRightChecker();
			if (checker.isRelevanceOperational(input.getCwid().toUpperCase(),
					input.getToken(), service)) {
				serviceDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
			} else {
				serviceDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
			}*/
			
			
			
			
			boolean isEditable = false;
			if (null != service && null == service.getDeleteQuelle()) {

				if (null == service.getCiOwner() && null == service.getCiOwnerDelegate()) {
					//wenn kein owner oder delegate, dürfen alle editieren
					isEditable = true;
				}

				if (!isEditable && (cwid.equals(service.getCiOwner()) || 
						   cwid.equals(service.getCiOwnerDelegate()))) {
					isEditable = true;
				}
				
				if (!isEditable && null != service.getCiOwnerDelegate()) {
					if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(service.getCiOwnerDelegate(), cwid))) {
						isEditable = true;
					}
				}
		}
		}
		return serviceDTO;
	}

	public CiItemsResultDTO findCis(ApplicationSearchParamsDTO input) {// CiSearchParamsDTO
																		// <T
																		// extends
																		// CiSearchParamsDTO>
	// CiItemDTO[] ciItemDTOs = null;
		CiItemsResultDTO result = null;
		if (input.getIsTemplate() != null
				&& input.getIsTemplate().equals(AirKonstanten.YES_SHORT)) {
			List<RolePersonDTO> listRolePerson = ApplReposHbn
					.findRolePersonAirAdministrator(input.getCwid(),input.getToken());
			if (listRolePerson.isEmpty()) {
				String strItSet = ApplReposHbn
						.getItSetFromCwid(input.getCwid());
				if (null != strItSet) {
					input.setItSetId(strItSet);
				} else {
					input.setItSetId(AirKonstanten.IT_SET_DEFAULT.toString());
				}
			}
		}

		if (input.getCiTypeId() != null) {
			switch (input.getCiTypeId()) {
			case AirKonstanten.TABLE_ID_APPLICATION:
				return new ApplicationWS().findApplications(input);// (ApplicationSearchParamsDTO)
				
			case AirKonstanten.TABLE_ID_IT_SYSTEM:
				result = ItSystemHbn.findItSystemsBy(input);
				break;
			case AirKonstanten.TABLE_ID_POSITION:
				result = SchrankHbn.findSchraenkeBy(input);// ciItemDTOs
				break;
			case AirKonstanten.TABLE_ID_ROOM:
				result = RoomHbn.findRoomsBy(input);// ciItemDTOs
				break;
			case AirKonstanten.TABLE_ID_BUILDING_AREA:
				result = BuildingHbn.findBuildingAreasBy(input);// ciItemDTOs
				break;
			case AirKonstanten.TABLE_ID_BUILDING:
				result = BuildingHbn.findBuildingsBy(input);// ciItemDTOs
				break;
			case AirKonstanten.TABLE_ID_TERRAIN:
				result = TerrainHbn.findTerrainsBy(input);// ciItemDTOs
				break;
			case AirKonstanten.TABLE_ID_SITE:
				result = StandortHbn.findSitesBy(input);// ciItemDTOs
				break;
			case AirKonstanten.TABLE_ID_FUNCTION:
				result = functionHbn.findFunctionBy(input);
				break;
			// Added by vandana
			case AirKonstanten.TABLE_ID_SERVICE:
				result = ServiceHbn.findServiceBy(input);// ciItemDTOs
				break;
			case AirKonstanten.TABLE_ID_WAYS:
				result = PathwayHbn.findPathwayBy(input);
				break;
				// Ended by vandana
				//Added by ENFZM
			case AirKonstanten.TABLE_ID_BUSINESS_APPLICATION:
				result = BusinessApplicationHbn.findBusinessApplicationBy(input);//ApplicationSearchParamsDTO
				
				break;
			
			default:
				// ciItemDTOs = new CiItemDTO[0];
				result = new CiItemsResultDTO();
				break;
			}
			Runtime.getRuntime().gc();
			return result;
		} else {
			Runtime.getRuntime().gc();
			return new ApplicationWS().findApplications(input);
		}

	}

	public CiEntityEditParameterOutput deleteCi(CiEntityParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			switch (input.getTableId().intValue()) {
			case AirKonstanten.TABLE_ID_APPLICATION:
				output = new ApplicationWS().deleteApplication(input);
				break;
			case AirKonstanten.TABLE_ID_IT_SYSTEM:
				output = ItSystemHbn.deleteCi(input.getCwid(), input.getCiId(),
						ItSystem.class);
				break;
			case AirKonstanten.TABLE_ID_POSITION:
				output = SchrankHbn.deleteCi(input.getCwid(), input.getCiId(),
						Schrank.class);
				break;
			case AirKonstanten.TABLE_ID_ROOM:
				output = RoomHbn.deleteCi(input.getCwid(), input.getCiId(),
						Room.class);
				break;
			case AirKonstanten.TABLE_ID_BUILDING_AREA:
				output = BuildingHbn.deleteCi(input.getCwid(), input.getCiId(),
						BuildingArea.class);
				break;
			case AirKonstanten.TABLE_ID_BUILDING:
				output = BuildingHbn.deleteCi(input.getCwid(), input.getCiId(),
						Building.class);
				break;
			case AirKonstanten.TABLE_ID_TERRAIN:
				output = TerrainHbn.deleteCi(input.getCwid(), input.getCiId(),
						Terrain.class);
				break;
			case AirKonstanten.TABLE_ID_SITE:
				output = StandortHbn.deleteCi(input.getCwid(), input.getCiId(),
						Standort.class);
				break;
			}
		}

		return output;
	}
	
	private void setBusinessApplicationDTO(
			BusinessApplication businessApplication,
			BusinessApplicationDTO businessApplicationDTO) {

		businessApplicationDTO.setId(businessApplication.getId());
		businessApplicationDTO.setBarAppId(businessApplication.getBarAppid());
		businessApplicationDTO
				.setName(businessApplication.getApplicationName());

		if (StringUtils.isNotNullOrEmpty((businessApplication
				.getApplicationAlias()))) {
			businessApplicationDTO.setAlias(businessApplication
					.getApplicationAlias());
		}

		if (StringUtils.isNotNullOrEmpty(businessApplication
				.getApplicationDescription())) {
			businessApplicationDTO
					.setApplicationDescription(businessApplication
							.getApplicationDescription());
		}

		businessApplicationDTO.setInsertQuelle(businessApplication
				.getInsertQuelle());
		businessApplicationDTO.setInsertUser(businessApplication
				.getInsertUser());

		if (null != businessApplication.getInsertTimestamp())
			businessApplicationDTO.setInsertTimestamp(businessApplication
					.getInsertTimestamp().toString());
		if (null != businessApplication.getExternallyHosted()) {
			businessApplicationDTO.setExternallyHosted(businessApplication
					.getExternallyHosted());
		}

		businessApplicationDTO.setLastModification(businessApplication
				.getLastModification());

		businessApplicationDTO.setUpdateQuelle(businessApplication
				.getUpdateQuelle());
		businessApplicationDTO.setUpdateUser(businessApplication
				.getUpdateUser());

		if (null != businessApplication.getUpdateTimestamp())
			businessApplicationDTO.setUpdateTimestamp(businessApplication
					.getUpdateTimestamp().toString());

		businessApplicationDTO.setDeleteQuelle(businessApplication
				.getDeleteQuelle());
		businessApplicationDTO.setDeleteUser(businessApplication
				.getDeleteUser());

		if (null != businessApplication.getDeleteTimestamp())
			businessApplicationDTO.setDeleteTimestamp(businessApplication
					.getDeleteTimestamp().toString());

		businessApplicationDTO.setApplicationOwnerHidden(businessApplication
				.getApplicationOwner());

		if (StringUtils.isNotNullOrEmpty(businessApplicationDTO
				.getApplicationOwnerHidden())) {// getCiOwner
			List<PersonsDTO> listPers = PersonsHbn
					.findPersonByCWID(businessApplicationDTO
							.getApplicationOwnerHidden());// getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				businessApplicationDTO.setApplicationOwner(tempPers
						.getDisplayNameFull());
			}
		}

		businessApplicationDTO.setCiOwnerHidden(businessApplication
				.getApplicationOwner());

		if (StringUtils.isNotNullOrEmpty(businessApplicationDTO
				.getCiOwnerHidden())) {// getCiOwner
			List<PersonsDTO> listPers = PersonsHbn
					.findPersonByCWID(businessApplicationDTO.getCiOwnerHidden());// getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				businessApplicationDTO
						.setCiOwner(tempPers.getDisplayNameFull());
			}
		}

		businessApplicationDTO.setApplicationStewardHidden(businessApplication
				.getApplicationSteward());

		if (StringUtils.isNotNullOrEmpty(businessApplicationDTO
				.getApplicationStewardHidden())) {// getCiOwner
			List<PersonsDTO> listPers = PersonsHbn
					.findPersonByCWID(businessApplicationDTO
							.getApplicationStewardHidden());// getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				businessApplicationDTO.setApplicationSteward(tempPers
						.getDisplayNameFull());
			}
		}

		businessApplicationDTO.setLifecycleStatusId(businessApplication
				.getLifecycleStatusId());
		Long relevanceItsec = businessApplication.getRelevanceITSEC();
		Long relevanceICS = businessApplication.getRelevanceICS();

		if (-1 == relevanceItsec) {
			businessApplicationDTO.setRelevanceGR1435(YES);
		} else {// if (0 == relevanceItsec) {
			businessApplicationDTO.setRelevanceGR1435(NO);
		}
		if (-1 == relevanceICS) {
			businessApplicationDTO.setRelevanceGR1920(YES);
		} else {// (0 == relevanceICS) {
			businessApplicationDTO.setRelevanceGR1920(NO);
		}

		businessApplicationDTO.setGxpFlagId(businessApplication.getGxpFlag());
		businessApplicationDTO.setGxpFlag(businessApplication.getGxpFlag());

		String source = businessApplicationDTO.getInsertQuelle();
		if (!source.equals(AirKonstanten.INSERT_QUELLE_SISEC)
				&& !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {

			businessApplicationDTO.setCiOwnerAcl(AirKonstanten.NO_SHORT);
			businessApplicationDTO
					.setCiOwnerDelegateAcl(AirKonstanten.NO_SHORT);
			businessApplicationDTO
					.setRelevanceGR1435Acl(AirKonstanten.NO_SHORT);
			businessApplicationDTO
					.setRelevanceGR1920Acl(AirKonstanten.NO_SHORT);
			businessApplicationDTO.setGxpFlagIdAcl(AirKonstanten.NO_SHORT);
			businessApplicationDTO.setRefIdAcl(AirKonstanten.NO_SHORT);
			businessApplicationDTO.setItsecGroupIdAcl(AirKonstanten.NO_SHORT);
			businessApplicationDTO.setSlaIdAcl(AirKonstanten.NO_SHORT);
			businessApplicationDTO
					.setServiceContractIdAcl(AirKonstanten.NO_SHORT);

		}
	}

	private void setFunctionDTO(Function function, FunctionDTO functionDTO) {
		functionDTO.setId(function.getId());
		functionDTO.setName(function.getName());

		functionDTO.setInsertQuelle(function.getInsertQuelle());
		functionDTO.setInsertUser(function.getName());

		if (null != function.getInsertTimestamp())
			functionDTO.setInsertTimestamp(function.getInsertTimestamp()
					.toString());

		functionDTO.setUpdateQuelle(function.getUpdateQuelle());
		functionDTO.setUpdateUser(function.getUpdateUser());

		if (null != function.getUpdateTimestamp())
			functionDTO.setUpdateTimestamp(function.getUpdateTimestamp()
					.toString());

		functionDTO.setDeleteQuelle(function.getDeleteQuelle());
		functionDTO.setDeleteUser(function.getDeleteUser());

		if (null != function.getDeleteTimestamp())
			functionDTO.setDeleteTimestamp(function.getDeleteTimestamp()
					.toString());

		functionDTO.setCiOwnerHidden(function.getCiOwner());
		functionDTO.setCiOwnerDelegateHidden(function.getCiOwnerDelegate());
		if (StringUtils.isNotNullOrEmpty(functionDTO.getCiOwnerHidden())) {// getCiOwner
			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(functionDTO
					.getCiOwnerHidden());// getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				functionDTO.setCiOwner(tempPers.getDisplayNameFull());
			}
		}

		if (StringUtils
				.isNotNullOrEmpty(functionDTO.getCiOwnerDelegateHidden())) {// getCiOwnerDelegate
			List<PersonsDTO> listPersons = PersonsHbn
					.findPersonByCWID(functionDTO.getCiOwnerDelegateHidden());// getCiOwnerDelegate
			if (null != listPersons && 1 == listPersons.size()) {
				PersonsDTO tempPers = listPersons.get(0);
				functionDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
			} else
				functionDTO.setCiOwnerDelegate(functionDTO
						.getCiOwnerDelegateHidden());// Delegate is Group
		}

		functionDTO.setItset(function.getItset());
		functionDTO.setItsecGroupId(function.getItsecGroupId());

		Long template = function.getTemplate();
		if (-1 == template.longValue()) {
			// check this CI is if template then go for is related with other CI
			// or not
			String IsCIsLinkwithTemplate = CiEntitiesHbn
					.findCIisLinkWithTemplate(function.getId(),
							functionDTO.getTableId());
			functionDTO.setTemplateLinkWithCIs(IsCIsLinkwithTemplate);

		}
		functionDTO.setTemplate(template);

		Long refID = function.getRefId();
		if (null == refID) {
			refID = 0L;
		}
		functionDTO.setRefId(refID);

		Long relevanceItsec = function.getRelevanceITSEC();
		Long relevanceICS = function.getRelevanceICS();

		if (-1 == relevanceItsec) {
			functionDTO.setRelevanceGR1435(YES);
		} else {// if (0 == relevanceItsec) {
			functionDTO.setRelevanceGR1435(NO);
		}
		if (-1 == relevanceICS) {
			functionDTO.setRelevanceGR1920(YES);
		} else {// (0 == relevanceICS) {
			functionDTO.setRelevanceGR1920(NO);
		}

		functionDTO.setGxpFlagId(function.getGxpFlag());
		functionDTO.setGxpFlag(function.getGxpFlag());

		String source = functionDTO.getInsertQuelle();
		if (!source.equals(AirKonstanten.INSERT_QUELLE_SISEC)
				&& !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {

			functionDTO.setCiOwnerAcl(AirKonstanten.NO_SHORT);
			functionDTO.setCiOwnerDelegateAcl(AirKonstanten.NO_SHORT);
			functionDTO.setRelevanceGR1435Acl(AirKonstanten.NO_SHORT);
			functionDTO.setRelevanceGR1920Acl(AirKonstanten.NO_SHORT);
			functionDTO.setGxpFlagIdAcl(AirKonstanten.NO_SHORT);
			functionDTO.setRefIdAcl(AirKonstanten.NO_SHORT);
			functionDTO.setItsecGroupIdAcl(AirKonstanten.NO_SHORT);
			functionDTO.setSlaIdAcl(AirKonstanten.NO_SHORT);
			functionDTO.setServiceContractIdAcl(AirKonstanten.NO_SHORT);

		}
	}
/*
	// Added by vandana
	private void setWaysDTO(Ways pathway, PathwayDTO pathwayDTO) {
		pathwayDTO.setId(pathway.getId());
		pathwayDTO.setName(pathway.getName());

		pathwayDTO.setInsertQuelle(pathway.getInsertQuelle());
		pathwayDTO.setInsertUser(pathway.getName());

		if (null != pathway.getInsertTimestamp())
			pathwayDTO.setInsertTimestamp(pathway.getInsertTimestamp()
					.toString());

		pathwayDTO.setUpdateQuelle(pathway.getUpdateQuelle());
		pathwayDTO.setUpdateUser(pathway.getUpdateUser());

		if (null != pathway.getUpdateTimestamp())
			pathwayDTO.setUpdateTimestamp(pathway.getUpdateTimestamp()
					.toString());

		pathwayDTO.setDeleteQuelle(pathway.getDeleteQuelle());
		pathwayDTO.setDeleteUser(pathway.getDeleteUser());

		if (null != pathway.getDeleteTimestamp())
			pathwayDTO.setDeleteTimestamp(pathway.getDeleteTimestamp()
					.toString());

		pathwayDTO.setCiOwnerHidden(pathway.getCiOwner());
		pathwayDTO.setCiOwnerDelegateHidden(pathway.getCiOwnerDelegate());
		if (StringUtils.isNotNullOrEmpty(pathwayDTO.getCiOwnerHidden())) {// getCiOwner
			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(pathwayDTO
					.getCiOwnerHidden());// getCiOwner
			if (StringUtils.isNotNullOrEmpty(pathwayDTO.getCiOwnerHidden())) {// getCiOwner
				List<PersonsDTO> listPers1 = PersonsHbn
						.findPersonByCWID(pathwayDTO.getCiOwnerHidden());// getCiOwner
				if (null != listPers1 && 1 == listPers1.size()) {
					PersonsDTO tempPers = listPers1.get(0);
					pathwayDTO.setCiOwner(tempPers.getDisplayNameFull());
				}
			}
		}

		if (StringUtils.isNotNullOrEmpty(pathwayDTO.getCiOwnerDelegateHidden())) {// getCiOwnerDelegate
			List<PersonsDTO> listPersons = PersonsHbn
					.findPersonByCWID(pathwayDTO.getCiOwnerDelegateHidden());// getCiOwnerDelegate
			if (null != listPersons && 1 == listPersons.size()) {
				PersonsDTO tempPers = listPersons.get(0);
				pathwayDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
			} else
				pathwayDTO.setCiOwnerDelegate(pathwayDTO
						.getCiOwnerDelegateHidden());// Delegate is Group
		}

		pathwayDTO.setItset(pathway.getItset());
		pathwayDTO.setItsecGroupId(pathway.getItsecGroupId());

		Long template = pathway.getTemplate();
		if (-1 == template.longValue()) {
			// check this CI is if template then go for is related with other CI
			// or not
			String IsCIsLinkwithTemplate = CiEntitiesHbn
					.findCIisLinkWithTemplate(pathway.getId(),
							pathwayDTO.getTableId());
			pathwayDTO.setTemplateLinkWithCIs(IsCIsLinkwithTemplate);
		}
		pathwayDTO.setTemplate(template);
		Long refID = pathway.getRefId();
		if (null == refID) {
			refID = 0L;
		}
		pathwayDTO.setRefId(refID);
		Long relevanceItsec = pathway.getRelevanceITSEC();
		Long relevanceICS = pathway.getRelevanceICS();

		if (-1 == relevanceItsec) {
			pathwayDTO.setRelevanceGR1435(YES);
		} else {// if (0 == relevanceItsec) {
			pathwayDTO.setRelevanceGR1435(NO);
		}
		if (-1 == relevanceICS) {
			pathwayDTO.setRelevanceGR1920(YES);
		} else {// (0 == relevanceICS) {
			pathwayDTO.setRelevanceGR1920(NO);
		}
		pathwayDTO.setGxpFlagId(pathway.getGxpFlag());
		pathwayDTO.setGxpFlag(pathway.getGxpFlag());
		pathwayDTO.setSlaId(pathway.getSlaId());
		pathwayDTO.setServiceContractId(pathway.getServiceContractId());
		pathwayDTO.setItSecSbAvailabilityId(pathway.getItSecSbAvailability());
		pathwayDTO.setItSecSbAvailabilityTxt(pathway
				.getItSecSbAvailabilityTxt());
		pathwayDTO.setItSecSbConfidentialityId(pathway
				.getItSecSbConfidentialityId());
		pathwayDTO.setItSecSbConfidentialityTxt(pathway
				.getItSecSbConfidentialityTxt());
		pathwayDTO.setItSecSbIntegrityId(pathway.getItSecSbIntegrityId());
		pathwayDTO.setItSecSbIntegrityTxt(pathway.getItSecSbIntegrityTxt());
	}// Ended by vandana
*/
	private void setCiBaseData(CiBaseDTO ciBaseDTO, CiBase1 ciBase) {
		ciBaseDTO.setId(ciBase.getId());
		ciBaseDTO.setName(ciBase.getName());

		// applicationDTO.setItsecGroupId(application.getItsecGroupId());
		ciBaseDTO.setInsertQuelle(ciBase.getInsertQuelle());
		ciBaseDTO.setInsertUser(ciBase.getInsertUser());

		if (null != ciBase.getInsertTimestamp())
			ciBaseDTO
					.setInsertTimestamp(ciBase.getInsertTimestamp().toString());

		ciBaseDTO.setUpdateQuelle(ciBase.getUpdateQuelle());
		ciBaseDTO.setUpdateUser(ciBase.getUpdateUser());

		if (null != ciBase.getUpdateTimestamp())
			ciBaseDTO
					.setUpdateTimestamp(ciBase.getUpdateTimestamp().toString());

		ciBaseDTO.setDeleteQuelle(ciBase.getDeleteQuelle());
		ciBaseDTO.setDeleteUser(ciBase.getDeleteUser());

		if (null != ciBase.getDeleteTimestamp())
			ciBaseDTO
					.setDeleteTimestamp(ciBase.getDeleteTimestamp().toString());

		ciBaseDTO.setCiOwnerHidden(ciBase.getCiOwner());
		ciBaseDTO.setCiOwnerDelegateHidden(ciBase.getCiOwnerDelegate());
		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerHidden())) {// getCiOwner
			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO
					.getCiOwnerHidden());// getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				ciBaseDTO.setCiOwner(tempPers.getDisplayNameFull());
			}
		}

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegateHidden())) {// getCiOwnerDelegate
			List<PersonsDTO> listPersons = PersonsHbn
					.findPersonByCWID(ciBaseDTO.getCiOwnerDelegateHidden());// getCiOwnerDelegate
			if (null != listPersons && 1 == listPersons.size()) {
				PersonsDTO tempPers = listPersons.get(0);
				ciBaseDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
			} else
				ciBaseDTO.setCiOwnerDelegate(ciBaseDTO
						.getCiOwnerDelegateHidden());// Delegate is Group
		}

		ciBaseDTO.setSlaId(ciBase.getSlaId());
		ciBaseDTO.setServiceContractId(ciBase.getServiceContractId());

		ciBaseDTO.setItSecSbAvailabilityId(ciBase.getItSecSbAvailability());
		ciBaseDTO.setItSecSbAvailabilityTxt(ciBase.getItSecSbAvailabilityTxt());// setItSecSbAvailabilityDescription
		ciBaseDTO.setItSecSbIntegrityId(ciBase.getItSecSbIntegrityId());
		ciBaseDTO.setItSecSbIntegrityTxt(ciBase.getItSecSbIntegrityTxt());
        ciBaseDTO.setClassInformationId(ciBase.getClassInformationId());
        ciBaseDTO.setClassInformationTxt(ciBase.getClassInformationTxt());

		ciBaseDTO.setItset(ciBase.getItset());
		ciBaseDTO.setItsecGroupId(ciBase.getItsecGroupId());

		Long template = ciBase.getTemplate();
		if (-1 == template.longValue()) {
			// RFC 9478
			// check this CI is if template then go for is related with other CI
			// or not
			String IsCIsLinkwithTemplate = CiEntitiesHbn
					.findCIisLinkWithTemplate(ciBase.getId(),
							ciBaseDTO.getTableId());
			ciBaseDTO.setTemplateLinkWithCIs(IsCIsLinkwithTemplate);

		}
		/*
		 * if (null == template) { template = -1L;
		 * 
		 * }
		 */
		ciBaseDTO.setTemplate(template);

		Long refID = ciBase.getRefId();
		if (null == refID) {
			refID = 0L;
		}
		ciBaseDTO.setRefId(refID);
		Long relevanceItsec = ciBase.getRelevanceITSEC();
		Long relevanceICS = ciBase.getRelevanceICS();

		if (-1 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(YES);
		} else {// if (0 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(NO);
		}
		if (-1 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(YES);
		} else {// (0 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(NO);
		}

		ciBaseDTO.setGxpFlagId(ciBase.getGxpFlag());
		ciBaseDTO.setGxpFlag(ciBase.getGxpFlag());

		String source = ciBaseDTO.getInsertQuelle();
		if (!source.equals(AirKonstanten.INSERT_QUELLE_SISEC)
				&& !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {

			ciBaseDTO.setCiOwnerAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setCiOwnerDelegateAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1435Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1920Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setGxpFlagIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRefIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setItsecGroupIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setSlaIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setServiceContractIdAcl(AirKonstanten.NO_SHORT);

			// fehlt, nötig?
			// License_Scanning,Sample_Test_Date,Sample_Test_Result,Itsec_SB_Integ_ID,Itsec_SB_Integ_Txt,
			// Itsec_SB_Verfg_ID,Itsec_SB_Verfg_Txt,Itsec_SB_Vertr_ID,Itsec_SB_Vertr_Txt
		}
	}

	// Doppelt weil: siehe @Column(name = "CWID_VERANTW_BETR") ciOwner Feld in
	// Hibernateklasse ItSystem
	// anstatt @Column(name = "RESPONSIBLE") wie in allen anderen Transbase CI
	// Tabellen
	private void setCiBaseData(ItSystemDTO ciBaseDTO, ItSystem ciBase) {
		ciBaseDTO.setId(ciBase.getId());
		ciBaseDTO.setName(ciBase.getName());
		ciBaseDTO.setAlias(ciBase.getAlias());

		// applicationDTO.setItsecGroupId(application.getItsecGroupId());
		ciBaseDTO.setInsertQuelle(ciBase.getInsertQuelle());
		ciBaseDTO.setInsertUser(ciBase.getInsertUser());

		if (null != ciBase.getInsertTimestamp())
			ciBaseDTO
					.setInsertTimestamp(ciBase.getInsertTimestamp().toString());

		ciBaseDTO.setUpdateQuelle(ciBase.getUpdateQuelle());
		ciBaseDTO.setUpdateUser(ciBase.getUpdateUser());

		if (null != ciBase.getUpdateTimestamp())
			ciBaseDTO
					.setUpdateTimestamp(ciBase.getUpdateTimestamp().toString());

		ciBaseDTO.setDeleteQuelle(ciBase.getDeleteQuelle());
		ciBaseDTO.setDeleteUser(ciBase.getDeleteUser());

		if (null != ciBase.getDeleteTimestamp())
			ciBaseDTO
					.setDeleteTimestamp(ciBase.getDeleteTimestamp().toString());

		ciBaseDTO.setCiOwnerHidden(ciBase.getCiOwner());
		ciBaseDTO.setCiOwnerDelegateHidden(ciBase.getCiOwnerDelegate());
		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerHidden())) {// getCiOwner
			List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(ciBaseDTO
					.getCiOwnerHidden());// getCiOwner
			if (null != listPers && 1 == listPers.size()) {
				PersonsDTO tempPers = listPers.get(0);
				ciBaseDTO.setCiOwner(tempPers.getDisplayNameFull());
			}
		}

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegateHidden())) {// getCiOwnerDelegate
			List<PersonsDTO> listPersons = PersonsHbn
					.findPersonByCWID(ciBaseDTO.getCiOwnerDelegateHidden());// getCiOwnerDelegate
			if (null != listPersons && 1 == listPersons.size()) {
				PersonsDTO tempPers = listPersons.get(0);
				ciBaseDTO.setCiOwnerDelegate(tempPers.getDisplayNameFull());
			} else
				ciBaseDTO.setCiOwnerDelegate(ciBaseDTO
						.getCiOwnerDelegateHidden());// Delegate is Group
		}

		ciBaseDTO.setSlaId(ciBase.getSlaId());
		ciBaseDTO.setServiceContractId(ciBase.getServiceContractId());

		ciBaseDTO.setItSecSbAvailabilityId(ciBase.getItSecSbAvailability());
		ciBaseDTO.setItSecSbAvailabilityTxt(ciBase.getItSecSbAvailabilityTxt());// setItSecSbAvailabilityDescription
		ciBaseDTO.setItSecSbIntegrityId(ciBase.getItSecSbIntegrityId());
		ciBaseDTO.setItSecSbIntegrityTxt(ciBase.getItSecSbIntegrityTxt());
        ciBaseDTO.setClassInformationId(ciBase.getClassInformationId());
        ciBaseDTO.setClassInformationTxt(ciBase.getClassInformationTxt());

		ciBaseDTO.setItset(ciBase.getItset());
		ciBaseDTO.setTemplate(ciBase.getTemplate());
		ciBaseDTO.setItsecGroupId(ciBase.getItsecGroupId());

		Long template = ciBase.getTemplate();
		if (-1 == template.longValue()) {
			// TODO -1 != 1 - Achtung beim Speichern
			template = new Long(1);
			// FEHLT NOCH siehe ApplicationWS!!
			// RFC 9478
			// check this CI is if template then go for is related with other CI
			// or not
			String IsCIsLinkwithTemplate = CiEntitiesHbn
					.findCIisLinkWithTemplate(ciBase.getId(),
							ciBaseDTO.getTableId());
			ciBaseDTO.setTemplateLinkWithCIs(IsCIsLinkwithTemplate);

		}

		ciBaseDTO.setRefId(ciBase.getRefId());

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerHidden())) {
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(ciBaseDTO
					.getCiOwnerHidden());
			if (null != persons && 1 == persons.size()) {
				PersonsDTO person = persons.get(0);
				ciBaseDTO.setCiOwner(person.getDisplayNameFull());
			}
		}

		if (StringUtils.isNotNullOrEmpty(ciBaseDTO.getCiOwnerDelegateHidden())) {
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(ciBaseDTO
					.getCiOwnerDelegateHidden());
			if (null != persons && 1 == persons.size()) {
				PersonsDTO person = persons.get(0);
				ciBaseDTO.setCiOwnerDelegate(person.getDisplayNameFull());
			}
		}

		Long relevanceItsec = ciBase.getRelevanceITSEC();
		Long relevanceICS = ciBase.getRelevanceICS();

		if (-1 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(YES);
		} else {// if (0 == relevanceItsec) {
			ciBaseDTO.setRelevanceGR1435(NO);
		}
		if (-1 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(YES);
		} else {// (0 == relevanceICS) {
			ciBaseDTO.setRelevanceGR1920(NO);
		}

		ciBaseDTO.setGxpFlagId(ciBase.getGxpFlag());
		ciBaseDTO.setGxpFlag(ciBase.getGxpFlag());

		String source = ciBaseDTO.getInsertQuelle();
		if (!source.equals(AirKonstanten.INSERT_QUELLE_SISEC)
				&& !source.equals(AirKonstanten.APPLICATION_GUI_NAME)) {

			ciBaseDTO.setCiOwnerAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setCiOwnerDelegateAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1435Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRelevanceGR1920Acl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setGxpFlagIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setRefIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setItsecGroupIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setSlaIdAcl(AirKonstanten.NO_SHORT);
			ciBaseDTO.setServiceContractIdAcl(AirKonstanten.NO_SHORT);

			// fehlt, nötig?
			// License_Scanning,Sample_Test_Date,Sample_Test_Result,Itsec_SB_Integ_ID,Itsec_SB_Integ_Txt,
			// Itsec_SB_Verfg_ID,Itsec_SB_Verfg_Txt,Itsec_SB_Vertr_ID,Itsec_SB_Vertr_Txt
		}
	}

	public ComplianceTemplateParameterOutput findAllDirectLinkCIWithTemplate(
			CiDetailParameterInput input) {
		ComplianceTemplateParameterOutput output = new ComplianceTemplateParameterOutput();
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			List<DirectLinkCIDTO> list = CiEntitiesHbn
					.findAllDirectLinkCIWithTemplate(input.getCiTypeId(),
							input.getCiId());
			if (!list.isEmpty()) {
				output.setDirectLinkCIDTO(getAllDirectLinkCIArray(list));
			}
		}
		return output;
	}

	private static DirectLinkCIDTO[] getAllDirectLinkCIArray(
			List<DirectLinkCIDTO> listDTO) {
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
			if (input.getCiTypeId() == AirKonstanten.TABLE_ID_APPLICATION) {
				Application application = AnwendungHbn
						.findApplicationById(input.getCiId());
				ApplicationCat2 applicationCat2 = ApplicationCat2Hbn
						.findById(application.getApplicationCat2Id());
				massUpdateAttriubteDTOs = getApplicationAttributeDTOList(
						application, applicationCat2, input.getCiSubTypeId());
			} else {
				if (input.getCiTypeId() == AirKonstanten.TABLE_ID_IT_SYSTEM) {
					ItSystem itSystem = ItSystemHbn.findById(ItSystem.class,
							input.getCiId());
					massUpdateAttriubteDTOs = getItSystemAttributeDTOList(itSystem);
				} else if (input.getCiTypeId() == AirKonstanten.TABLE_ID_ROOM) {
					Room room = RoomHbn.findById(input.getCiId());
					massUpdateAttriubteDTOs = getAttributeDTOList(room,
							AirKonstanten.TABLE_ID_ROOM);
				} else if (input.getCiTypeId() == AirKonstanten.TABLE_ID_BUILDING_AREA) {
					BuildingArea buildingArea = BuildingHbn
							.findBuildingAreaById(input.getCiId());
					massUpdateAttriubteDTOs = getAttributeDTOList(buildingArea,
							AirKonstanten.TABLE_ID_BUILDING_AREA);
				} else if (input.getCiTypeId() == AirKonstanten.TABLE_ID_BUILDING) {
					Building building = BuildingHbn.findById(input.getCiId());
					massUpdateAttriubteDTOs = getAttributeDTOList(building,
							AirKonstanten.TABLE_ID_BUILDING);
				} else if (input.getCiTypeId() == AirKonstanten.TABLE_ID_TERRAIN) {
					Terrain terrain = TerrainHbn.findById(Terrain.class,
							input.getCiId());
					massUpdateAttriubteDTOs = getAttributeDTOList(terrain,
							AirKonstanten.TABLE_ID_TERRAIN);
				} else if (input.getCiTypeId() == AirKonstanten.TABLE_ID_POSITION) {
					Schrank schrank = SchrankHbn.findById(input.getCiId());
					massUpdateAttriubteDTOs = getAttributeDTOList(schrank,
							AirKonstanten.TABLE_ID_POSITION);
				}
			}

		}
		massUpdateParameterOutput
				.setMassUpdateAttributeDTO(getMassUpdateAttriuteDTOs(massUpdateAttriubteDTOs));

		return massUpdateParameterOutput;
	}

	private MassUpdateAttributeDTO[] getMassUpdateAttriuteDTOs(
			List<MassUpdateAttributeDTO> massUpdateAttriuteDTOs) {
		MassUpdateAttributeDTO[] massUpdateAttriuteDTOArray = new MassUpdateAttributeDTO[massUpdateAttriuteDTOs
				.size()];
		for (int i = 0; i < massUpdateAttriuteDTOs.size(); i++) {
			MassUpdateAttributeDTO masAttributeDTO = massUpdateAttriuteDTOs
					.get(i);
			massUpdateAttriuteDTOArray[i] = masAttributeDTO;
		}
		return massUpdateAttriuteDTOArray;
	}

	private List<MassUpdateAttributeDTO> getItSystemAttributeDTOList(
			ItSystem itSystem) {
		List<MassUpdateAttributeDTO> massUpdateAttriuteDTOs = new ArrayList<MassUpdateAttributeDTO>();

		MassUpdateAttributeDTO maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.PRIMARY_PERSON);
		maDto.setAttributeValue(itSystem.getCiOwner());
		maDto.setId("responsible");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.BUSINESS_ESSENTIAL);
		maDto.setAttributeValue(BusinessEssentialHbn.getBusinessEssential(
				itSystem.getBusinessEssentialId()).getBusinessEssentialName());
		maDto.setId("businessEssentialId1");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.DELEGATE_PERSON_GROUP);
		maDto.setAttributeValue(itSystem.getCiOwnerDelegate());
		maDto.setId("subResponsible");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.LIFE_CYCLE_STATUS);
		if (itSystem.getLifecycleStatusId() != null
				&& itSystem.getLifecycleStatusId() != 0) {
			LifecycleStatusDTO lifecycleStatusDTO = new LifecycleStatusDTO();
			List<LifecycleStatusDTO> input = LifecycleStatusHbn
					.listLifecycleStatus(AirKonstanten.TABLE_ID_APPLICATION);
			for (final LifecycleStatusDTO data : input) {
				if (data.getLcSubStatusId().intValue() == itSystem
						.getLifecycleStatusId().intValue()) {
					lifecycleStatusDTO = data;
				}
			}

			maDto.setAttributeValue(lifecycleStatusDTO.getLcStatus());
		}

		maDto.setId("lifecycleStatusId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.OPERATIONAL_STATUS);
		if (itSystem.getEinsatzStatusId() != null
				&& itSystem.getEinsatzStatusId() != 0) {
			OperationalStatus operationalStatus = OperationalStatusHbn
					.findById(Long.valueOf(itSystem.getEinsatzStatusId()));
			if (operationalStatus != null) {
				maDto.setAttributeValue(operationalStatus
						.getOperationalStatusEn());
			}
		}
		maDto.setId("operationalStatusId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.PRIORITY_LEVEL);
		if (itSystem.getPriorityLevelId() != null
				&& itSystem.getPriorityLevelId() != 0)
			maDto.setAttributeValue(PriorityLevelHbn.findById(
					itSystem.getPriorityLevelId()).getPriorityLevel());
		maDto.setId("priorityLevelId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SEVERITY_LEVEL);
		if (itSystem.getSeverityLevelId() != null
				&& itSystem.getSeverityLevelId() != 0)
			maDto.setAttributeValue(SeverityLevelHbn.findById(
					itSystem.getSeverityLevelId()).getSeverityLevelName());
		maDto.setId("severityLevelId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.OS_NAME);
		if (itSystem.getOsNameId() != null && itSystem.getOsNameId() != 0)
			maDto.setAttributeValue(ItSystemHbn.findItSystemOsNameById(itSystem
					.getOsNameId()));
		maDto.setId("osNameId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.VIRTUAL_HARDWARE_CLIENT);
		maDto.setAttributeValue(itSystem.getIsVirtualHardwareClient());
		maDto.setId("isVirtualHardwareClient");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.VIRTUAL_HARDWARE_HOST);
		maDto.setAttributeValue(itSystem.getIsVirtualHardwareHost());
		maDto.setId("isVirtualHardwareHost");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.VIRTUAL_SOFTWARE);
		maDto.setAttributeValue(itSystem.getVirtualHardwareSoftware());
		maDto.setId("virtualHardwareSoftware");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.PRIMARY_FUNCTION);
		if (itSystem.getPrimaryFunctionId() != null
				&& itSystem.getPrimaryFunctionId() != 0)
			maDto.setAttributeValue(ItSystemHbn
					.getItSystemPrimaryFunctionById(itSystem
							.getPrimaryFunctionId()));
		maDto.setId("primaryFunctionId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.CLUSTER_CODE);
		maDto.setAttributeValue(itSystem.getClusterCode());
		maDto.setId("clusterCode");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.CLUSTER_TYPE);
		maDto.setAttributeValue(itSystem.getClusterType());
		maDto.setId("clusterType");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR1435);
		if (-1 == itSystem.getRelevanceITSEC()) {
			maDto.setAttributeValue("Yes");
		} else {
			maDto.setAttributeValue("No");
		}
		maDto.setId("relevanzITSEC");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR1920);
		if (-1 == itSystem.getRelevanceICS()) {
			maDto.setAttributeValue("Yes");
		} else {
			maDto.setAttributeValue("No");
		}
		maDto.setId("relevanceICS");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.ITSEC_GROUP);
		if (itSystem.getItsecGroupId() != null
				&& itSystem.getItsecGroupId() != 0)
			maDto.setAttributeValue(ItSecGroupHbn.getItSecGroup(itSystem
					.getItsecGroupId()));
		maDto.setId("itsecGroupId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SLA);
		if (itSystem.getSlaId() != null && itSystem.getSlaId() != 0)
			maDto.setAttributeValue(SlaHbn.getSlaName(itSystem.getSlaId()));
		maDto.setId("slaId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SERVICE_CONTRACT);
		if (itSystem.getServiceContractId() != null
				&& itSystem.getServiceContractId() != 0)
			maDto.setAttributeValue(ServiceContractHbn
					.getServiceContract(itSystem.getServiceContractId()));
		maDto.setId("serviceContractId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.PROTECTION_LEVEL_INTEGRITY);
		maDto.setAttributeValue(getValue(itSystem.getItSecSbIntegrityId()));
		maDto.setId("itSecSbIntegrityId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_PROTECTION_LEVEL);
		maDto.setAttributeValue(itSystem.getItSecSbIntegrityTxt());
		maDto.setId("itSecSbIntegrityTxt");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.INFORMATION_CLASS);
		if (itSystem.getClassInformationId() != null
				&& itSystem.getClassInformationId() != 0)
			maDto.setAttributeValue(ConfidentialityHbn.getConfidentialityById(
					itSystem.getClassInformationId())
					.getConfidentialityNameEn());
		maDto.setId("itSecSbConfidentiality");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_INFORMATION_CLASS);
		maDto.setAttributeValue(itSystem.getClassInformationTxt());
		maDto.setId("itSecSbConfidentialityTxt");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.PROTECTION_LEVEL_AVAILABILITY);
		maDto.setAttributeValue(getValue(itSystem.getItSecSbAvailability()));
		maDto.setId("itSecSbAvailability");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_PROTECTION_LEVEL_AVAILABILITY);
		maDto.setAttributeValue(itSystem.getItSecSbAvailabilityTxt());
		maDto.setId("itSecSbAvailabilityTxt");
		massUpdateAttriuteDTOs.add(maDto);

		return massUpdateAttriuteDTOs;

	}

	private List<MassUpdateAttributeDTO> getAttributeDTOList(CiBase1 ciBase1,
			int tableId) {
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
		/*
		 * maDto = new MassUpdateAttributeDTO();
		 * maDto.setAttributeName(AirKonstanten.LINK);
		 * maDto.setAttributeValue(CiEntitiesHbn
		 * .getCIName(tableId,ciBase1.getRefId())); maDto.setId("refId");
		 * massUpdateAttriuteDTOs.add(maDto);
		 */
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR1435);
		if (null != ciBase1.getRelevanceITSEC()) {
			if (-1 == ciBase1.getRelevanceITSEC()) {
				maDto.setAttributeValue("Yes");
			} else {
				maDto.setAttributeValue("No");
			}
		}
		maDto.setId("relevanzITSEC");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR1920);
		if (null != ciBase1.getRelevanceICS()) {
			if (-1 == ciBase1.getRelevanceICS()) {
				maDto.setAttributeValue("Yes");
			} else {
				maDto.setAttributeValue("No");
			}
		}
		maDto.setId("relevanceICS");
		massUpdateAttriuteDTOs.add(maDto);
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GXP);
		maDto.setAttributeValue(ciBase1.getGxpFlag());
		maDto.setId("gxpFlag");
		massUpdateAttriuteDTOs.add(maDto);
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.ITSEC_GROUP);
		if (ciBase1.getItsecGroupId() != null && ciBase1.getItsecGroupId() != 0)
			maDto.setAttributeValue(ItSecGroupHbn.getItSecGroup(ciBase1
					.getItsecGroupId()));
		maDto.setId("itsecGroupId");
		massUpdateAttriuteDTOs.add(maDto);
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SLA);
		if (ciBase1.getSlaId() != null && ciBase1.getSlaId() != 0)
			maDto.setAttributeValue(SlaHbn.getSlaName(ciBase1.getSlaId()));
		maDto.setId("slaId");
		massUpdateAttriuteDTOs.add(maDto);
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SERVICE_CONTRACT);
		if (ciBase1.getServiceContractId() != null
				&& ciBase1.getServiceContractId() != 0)
			maDto.setAttributeValue(ServiceContractHbn
					.getServiceContract(ciBase1.getServiceContractId()));
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
		maDto.setAttributeName(AirKonstanten.INFORMATION_CLASS);
		if (ciBase1.getClassInformationId() != null
				&& ciBase1.getClassInformationId() != 0)
			maDto.setAttributeValue(ConfidentialityHbn.getConfidentialityById(
					ciBase1.getClassInformationId())
					.getConfidentialityNameEn());
		maDto.setId("itSecSbConfidentiality");
		massUpdateAttriuteDTOs.add(maDto);
		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_INFORMATION_CLASS);
		maDto.setAttributeValue(ciBase1.getClassInformationTxt());
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

	private List<MassUpdateAttributeDTO> getApplicationAttributeDTOList(
			Application application, ApplicationCat2 cat2, String ciSubTypeId) {
		List<MassUpdateAttributeDTO> massUpdateAttriuteDTOs = new ArrayList<MassUpdateAttributeDTO>();

		MassUpdateAttributeDTO maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.APPLICATION_CATEGORY_2);
		maDto.setAttributeValue(cat2.getAnwendungKat2Text());
		maDto.setId("applicationCat2Id");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.DESCRIPTION);
		maDto.setAttributeValue(application.getComments());
		maDto.setId("comments");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.VERSION);
		maDto.setAttributeValue(application.getVersion());
		maDto.setId("version");
		if (ciSubTypeId == "5") {
			massUpdateAttriuteDTOs.add(maDto);
			maDto = new MassUpdateAttributeDTO();
			//ENFZM: C0000145157
			//maDto.setAttributeName(AirKonstanten.BAR_RELEVANCE);
			//maDto.setAttributeValue(application.getBarRelevance());
			//ENFZM: C0000145157
			//maDto.setId("barRelevance");
			massUpdateAttriuteDTOs.add(maDto);

			maDto = new MassUpdateAttributeDTO();
			maDto.setAttributeName(AirKonstanten.ORGANISATIONAL_SCOPE);
			maDto.setAttributeValue(application.getOrganisationalScope());
			maDto.setId("organisationalScope");
			massUpdateAttriuteDTOs.add(maDto);

		}

		/*
		 * maDto = new MassUpdateAttributeDTO();
		 * maDto.setAttributeName(AirKonstanten.DATA_CLASS);
		 * maDto.setAttributeValue("Data Classes will be defined later");
		 * maDto.setId("classDataId"); massUpdateAttriuteDTOs.add(maDto);
		 */

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.LIFE_CYCLE_STATUS);
		LifecycleStatusDTO lifecycleStatusDTO = new LifecycleStatusDTO();
		if (application.getLifecycleStatusId() != null
				&& application.getLifecycleStatusId() != 0) {
			List<LifecycleStatusDTO> input = LifecycleStatusHbn
					.listLifecycleStatus(AirKonstanten.TABLE_ID_APPLICATION);
			for (final LifecycleStatusDTO data : input) {
				if (data.getLcSubStatusId().intValue() == application
						.getLifecycleStatusId().intValue()) {
					lifecycleStatusDTO = data;
				}
			}
		}
		maDto.setAttributeValue(lifecycleStatusDTO.getLcStatus());
		maDto.setId("lifecycleStatusId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.OPERATIONAL_STATUS);
		if (application.getOperationalStatusId() != null
				&& application.getOperationalStatusId() != 0)
			maDto.setAttributeValue(OperationalStatusHbn.findById(
					application.getOperationalStatusId())
					.getOperationalStatusEn());
		maDto.setId("operationalStatusId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.PRIORITY_LEVEL);
		if (application.getPriorityLevelId() != null
				&& application.getPriorityLevelId() != 0)
			maDto.setAttributeValue(PriorityLevelHbn.findById(
					application.getPriorityLevelId()).getPriorityLevel());
		maDto.setId("priorityLevelId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SEVERITY_LEVEL);
		if (application.getSeverityLevelId() != null
				&& application.getSeverityLevelId() != 0)
			maDto.setAttributeValue(SeverityLevelHbn.findById(
					application.getSeverityLevelId()).getSeverityLevelName());
		maDto.setId("severityLevelId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.BUSINESS_ESSENTIAL);
		maDto.setAttributeValue(BusinessEssentialHbn.getBusinessEssential(
				application.getBusinessEssentialId())
				.getBusinessEssentialName());
		maDto.setId("businessEssentialId1");
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

		if (ciSubTypeId == "5") {

			maDto = new MassUpdateAttributeDTO();
			maDto.setAttributeName(AirKonstanten.APPLICATION_OWNER);
			maDto.setAttributeValue(application.getApplicationOwner());
			maDto.setId("applicationOwner");
			massUpdateAttriuteDTOs.add(maDto);

			maDto = new MassUpdateAttributeDTO();
			maDto.setAttributeName(AirKonstanten.APPLICATION_OWNER_DELEGATE);
			maDto.setAttributeValue(application.getApplicationOwnerDelegate());
			maDto.setId("applicationOwnerDelegate");
			massUpdateAttriuteDTOs.add(maDto);

			maDto = new MassUpdateAttributeDTO();
			maDto.setAttributeName(AirKonstanten.APPLICATION_STEWARD);
			maDto.setAttributeValue(application.getApplicationSteward());
			maDto.setId("applicationSteward");
			massUpdateAttriuteDTOs.add(maDto);

		}

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.BUSINESS_CATEGORY);
		if (application.getCategoryBusiness() != null
				&& application.getCategoryBusiness() != 0)
			maDto.setAttributeValue(CategoryBusinessHbn.findById(
					application.getCategoryBusiness())
					.getCategoryBusinessName());
		maDto.setId("categoryBusiness");
		massUpdateAttriuteDTOs.add(maDto);

		/*
		 * maDto = new MassUpdateAttributeDTO();
		 * maDto.setAttributeName(AirKonstanten.LINK); if(application.getRefId()
		 * != null)
		 * maDto.setAttributeValue(CiEntitiesHbn.getCIName(AirKonstanten
		 * .TABLE_ID_APPLICATION,application.getRefId())); maDto.setId("refId");
		 * massUpdateAttriuteDTOs.add(maDto);
		 */

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR1435);
		if (-1 == application.getRelevanzITSEC()) {
			maDto.setAttributeValue("Yes");
		} else {
			maDto.setAttributeValue("No");
		}
		maDto.setId("relevanzITSEC");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR1920);
		if (null != application.getRelevanceICS()) {
			if (-1 == application.getRelevanceICS()) {
				maDto.setAttributeValue("Yes");
			} else {
				maDto.setAttributeValue("No");
			}
		}
		maDto.setId("relevanceICS");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR2059);
		if (null != application.getRelevance2059()) {
			if (-1 == application.getRelevance2059()) {
				maDto.setAttributeValue("Yes");
			} else {
				maDto.setAttributeValue("No");
			}
		}
		maDto.setId("relevance2059");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GR2008);
		if (null != application.getRelevance2008()) {
			if (-1 == application.getRelevance2008()) {
				maDto.setAttributeValue("Yes");
			} else {
				maDto.setAttributeValue("No");
			}
		}
		maDto.setId("relevance2008");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.GXP);
		maDto.setAttributeValue(application.getGxpFlag());
		maDto.setId("gxpFlag");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.ITSEC_GROUP);
		if (application.getItsecGroupId() != null)
			if (application.getItsecGroupId() != null
					&& application.getItsecGroupId() != 0)
				maDto.setAttributeValue(ItSecGroupHbn.getItSecGroup(application
						.getItsecGroupId()));
		maDto.setId("itsecGroupId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SLA);
		if (application.getSlaId() != null && application.getSlaId() != 0)
			maDto.setAttributeValue(SlaHbn.getSlaName(application.getSlaId()));
		maDto.setId("slaId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.SERVICE_CONTRACT);
		if (application.getServiceContractId() != null
				&& application.getServiceContractId() != 0)
			maDto.setAttributeValue(ServiceContractHbn
					.getServiceContract(application.getServiceContractId()));
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
		maDto.setAttributeName(AirKonstanten.INFORMATION_CLASS);
		if (application.getClassInformationId() != null
				&& application.getClassInformationId() != 0)
			maDto.setAttributeValue(ConfidentialityHbn.getConfidentialityById(
							application.getClassInformationId())
					.getConfidentialityNameEn());
		maDto.setId("classInformationId");
		massUpdateAttriuteDTOs.add(maDto);

		maDto = new MassUpdateAttributeDTO();
		maDto.setAttributeName(AirKonstanten.EXPLANATION_FOR_INFORMATION_CLASS);
		maDto.setAttributeValue(application.getClassInformationExplanation());
		maDto.setId("classInformationExplanation");
		massUpdateAttriuteDTOs.add(maDto);

		return massUpdateAttriuteDTOs;

	}

	private static String getBusinessEssential(Long id) {
		if (id == AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT) {
			return AirKonstanten.NOT_BUSINESS_ESSENTIAL;
		} else {
			return "Bussiness Essential";
		}
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

	public MassUpdateValueTransferParameterOutPut massUpdate(
			MassUpdateParameterInput massUpdateParameterInput) {
		MassUpdateValueTransferParameterOutPut maParameterOutPut = new MassUpdateValueTransferParameterOutPut();

		try {

			if (LDAPAuthWS.isLoginValid(massUpdateParameterInput.getCwid(),
					massUpdateParameterInput.getToken())) {
				if (massUpdateParameterInput.getCiTypeId() == AirKonstanten.TABLE_ID_APPLICATION) {
					maParameterOutPut = applicationMassUpdate(massUpdateParameterInput);
				} else if (massUpdateParameterInput.getCiTypeId() == AirKonstanten.TABLE_ID_IT_SYSTEM)
					maParameterOutPut = itSystemMassUpdate(massUpdateParameterInput);

				else {
					Long ciTypeId = massUpdateParameterInput.getCiTypeId();
					String sql = "";
					CiBase1 templaeLocationCI = null;
					if (ciTypeId == AirKonstanten.TABLE_ID_POSITION) {
						templaeLocationCI = SchrankHbn
								.findById(massUpdateParameterInput
										.getTemplateCiId());
						sql = "select h from Schrank as h where h.id in("
								+ massUpdateParameterInput.getSelectedCIs()
								+ ")";
					} else {
						if (ciTypeId == AirKonstanten.TABLE_ID_ROOM) {
							templaeLocationCI = RoomHbn
									.findById(massUpdateParameterInput
											.getTemplateCiId());
							sql = "select h from Room as h where h.id in("
									+ massUpdateParameterInput.getSelectedCIs()
									+ ")";
						} else {
							if (ciTypeId == AirKonstanten.TABLE_ID_BUILDING) {
								templaeLocationCI = BuildingHbn
										.findById(massUpdateParameterInput
												.getTemplateCiId());
								sql = "select h from Building as h where h.id in("
										+ massUpdateParameterInput
												.getSelectedCIs() + ")";
							} else {
								if (ciTypeId == AirKonstanten.TABLE_ID_BUILDING_AREA) {
									templaeLocationCI = BuildingHbn
											.findBuildingAreaById(massUpdateParameterInput
													.getTemplateCiId());
									sql = "select h from BuildingArea as h where h.id in("
											+ massUpdateParameterInput
													.getSelectedCIs() + ")";
								} else {
									if (ciTypeId == AirKonstanten.TABLE_ID_TERRAIN) {
										templaeLocationCI = TerrainHbn
												.findById(massUpdateParameterInput
														.getTemplateCiId());
										sql = "select h from Terrain as h where h.id in("
												+ massUpdateParameterInput
														.getSelectedCIs() + ")";
									} else {
										if (ciTypeId == AirKonstanten.TABLE_ID_SITE) {
											templaeLocationCI = StandortHbn
													.findById(
															Standort.class,
															massUpdateParameterInput
																	.getTemplateCiId());
											sql = "select h from Standort as h where h.id in("
													+ massUpdateParameterInput
															.getSelectedCIs()
													+ ")";
										}
									}
								}

							}
						}
						maParameterOutPut = locationCIMassUpdate(
								massUpdateParameterInput, sql,
								templaeLocationCI);
					}
				}
				// update GPSC Contacts
				updateGPSCContacts(massUpdateParameterInput);
			}

		} catch (Exception e) {
			// handle exception
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getCause().getMessage() });
		}

		return maParameterOutPut;
	}

	/**
	 * @param massUpdateParameterInput
	 */
	private void updateGPSCContacts(
			MassUpdateParameterInput massUpdateParameterInput) {
		if (massUpdateParameterInput.getAllGPSCContacts()
				|| massUpdateParameterInput.getNonEmptyGPSCContacts()) {
			List<ApplicationContactGroupDTO> applicationContactGroupDTOs = getGPSCContacts(
					massUpdateParameterInput.getTemplateCiId(),
					massUpdateParameterInput.getCiTypeId().intValue());
			String selectedCis[] = massUpdateParameterInput.getSelectedCIs()
					.split(",");
			for (int i = 0; i < selectedCis.length; i++) {
				if (org.apache.commons.lang.StringUtils
						.isNotEmpty(selectedCis[i])) {
					for (ApplicationContactGroupDTO apGroupDTO : applicationContactGroupDTOs) {
						if (apGroupDTO.getApplicationContactEntryDTO().length > 0) {
							ApplicationContactEntryDTO apEntryDTO = apGroupDTO
									.getApplicationContactEntryDTO()[0];
							if (org.apache.commons.lang.StringUtils
									.isNotEmpty(apEntryDTO.getGroupName())) {
								CiGroupsHbn.saveCiGroup(
										massUpdateParameterInput.getCwid(),
										massUpdateParameterInput.getCiTypeId()
												.intValue(), Long
												.valueOf(selectedCis[i]),
										apGroupDTO.getGroupTypeId(), apGroupDTO
												.getGroupTypeName(), apEntryDTO
												.getGroupName());
							} else {
								if (org.apache.commons.lang.StringUtils
										.isNotEmpty(apEntryDTO.getPersonName())) {
									CiPersonsHbn.saveCiPerson(
											massUpdateParameterInput.getCwid(),
											massUpdateParameterInput
													.getCiTypeId().intValue(),
											Long.valueOf(selectedCis[i]),
											apGroupDTO.getGroupTypeId(),
											apGroupDTO.getGroupTypeName(),
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
			int count = 0;
			while (locationCIS.next()) {
				CiBase1 locationCi = (CiBase1) locationCIS.get(0);

				if (massUpdateParameterInput.getResponsible()) {
					locationCi.setCiOwner(templaeLocationCI.getCiOwner());
					Long itSet = null;
					String strItSet = ApplReposHbn.getItSetFromCwid(templaeLocationCI.getCiOwner());
					if (null != strItSet) {
						itSet = Long.parseLong(strItSet);
						locationCi.setItset(itSet);
					}
				}
				if (massUpdateParameterInput.getSubResponsible()) {
					locationCi.setCiOwnerDelegate(templaeLocationCI
							.getCiOwnerDelegate());
				}
				if (massUpdateParameterInput.getRelevanzITSEC()) {
					locationCi.setRelevanceITSEC(templaeLocationCI
							.getRelevanceITSEC());
				}
				if (massUpdateParameterInput.isRelevanceICS()) {
					locationCi.setRelevanceICS(templaeLocationCI
							.getRelevanceICS());
				}
				if (massUpdateParameterInput.getGxpFlag()) {
					locationCi.setGxpFlag(templaeLocationCI.getGxpFlag());
				}
				if (massUpdateParameterInput.getItsecGroupId()) {
					locationCi.setRefId(null);
					if (locationCi.getItsecGroupId() == 10136) {
						locationCi.setItsecGroupId(templaeLocationCI
								.getItsecGroupId());
						ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
								massUpdateParameterInput.getCiTypeId()
										.intValue(), locationCi.getId(),
								templaeLocationCI.getServiceContractId());
					} else {
						locationCi.setItsecGroupId(templaeLocationCI
								.getItsecGroupId());
					}

				}
				if (massUpdateParameterInput.getSlaId()) {
					locationCi.setSlaId(templaeLocationCI.getSlaId());
				}
				if (massUpdateParameterInput.getServiceContractId()) {
					locationCi.setServiceContractId(templaeLocationCI
							.getServiceContractId());

				}
				if (massUpdateParameterInput.getItSecSbAvailability()) {
					locationCi.setItSecSbAvailability(templaeLocationCI
							.getItSecSbAvailability());
				}
				if (massUpdateParameterInput.getItSecSbAvailabilityTxt()) {
					locationCi.setItSecSbAvailabilityTxt(templaeLocationCI
							.getItSecSbAvailabilityTxt());
				}
				if (massUpdateParameterInput.getItSecSbConfidentiality()) {
					locationCi.setClassInformationId(templaeLocationCI
							.getClassInformationId());
				}
				if (massUpdateParameterInput.getItSecSbConfidentialityTxt()) {
					locationCi.setClassInformationTxt(templaeLocationCI
							.getClassInformationTxt());
				}
				if (massUpdateParameterInput.isItSecSbIntegrityId()) {
					locationCi.setItSecSbIntegrityId(templaeLocationCI
							.getItSecSbIntegrityId());
				}
				if (massUpdateParameterInput.isItSecSbIntegrityTxt()) {
					locationCi.setItSecSbIntegrityTxt(templaeLocationCI
							.getItSecSbIntegrityTxt());
				}
				locationCi.setUpdateUser(massUpdateParameterInput.getCwid());
				locationCi.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				locationCi
						.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());

				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			if (massUpdateParameterInput.getItsecGroupId()) {
				tx = session.beginTransaction();
				String sqlItsec = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";

				Connection conn = session.connection();

				CallableStatement stmt = conn.prepareCall(sqlItsec);
				String selectedCIsArray[] = massUpdateParameterInput
						.getSelectedCIs().split(",");
				int size = selectedCIsArray.length;
				for (int i = 0; i < size; i++) {
					stmt.setLong(1, massUpdateParameterInput.getCiTypeId());
					stmt.setLong(2, Long.valueOf(selectedCIsArray[i]));
					stmt.setLong(3,
							Long.valueOf(templaeLocationCI.getItsecGroupId()));
					stmt.addBatch();
				}
				int[] updateCounts = stmt.executeBatch();
				tx.commit();
				System.out.println(updateCounts);
			}

			toCommit = true;
		} catch (Exception e) {
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getMessage() });
		} finally {
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
		Application templateApplication = AnwendungHbn
				.findApplicationById(massUpdateParameterInput.getTemplateCiId());
		Session session = HibernateUtil.getSession();
		;
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			ScrollableResults applications = session
					.createQuery(
							"select h from Application as h where h.applicationId in("
									+ massUpdateParameterInput.getSelectedCIs()
									+ ")").setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (applications.next()) {

				Application application = (Application) applications.get(0);
				if (massUpdateParameterInput.getApplicationCat2Id()) {
					application.setApplicationCat2Id(templateApplication
							.getApplicationCat2Id());
				}
				if (massUpdateParameterInput.getBusinessEssentialId1()) {
					application.setBusinessEssentialId(templateApplication
							.getBusinessEssentialId());
				}
				if (massUpdateParameterInput.getLifecycleStatusId()) {
					application.setLifecycleStatusId(templateApplication
							.getLifecycleStatusId());
				}
				if (massUpdateParameterInput.getOperationalStatusId()) {
					application.setOperationalStatusId(templateApplication
							.getOperationalStatusId());
				}
				if (massUpdateParameterInput.getPriorityLevelId()) {
					application.setPriorityLevelId(templateApplication
							.getPriorityLevelId());
				}
				if (massUpdateParameterInput.getSeverityLevelId()) {
					application.setSeverityLevelId(templateApplication
							.getSeverityLevelId());
				}
				if (massUpdateParameterInput.getResponsible()) {
					application.setResponsible(templateApplication
							.getResponsible());
				}
				if (massUpdateParameterInput.getSubResponsible()) {
					application.setSubResponsible(templateApplication
							.getSubResponsible());
				}
				if (massUpdateParameterInput.getRefId()) {
					application.setRefId(templateApplication.getRefId());
				}
				if (massUpdateParameterInput.getRelevanzITSEC()) {
					application.setRelevanzITSEC(templateApplication
							.getRelevanzITSEC());
				}
				if (massUpdateParameterInput.isRelevanceICS()) {
					application.setRelevanceICS(templateApplication
							.getRelevanceICS());
				}
				if (massUpdateParameterInput.isRelevance2059()) {
					application.setRelevance2059(templateApplication
							.getRelevance2059());
				}
				if (massUpdateParameterInput.isRelevance2008()) {
					application.setRelevance2008(templateApplication
							.getRelevance2008());
				}
				if (massUpdateParameterInput.getGxpFlag()) {
					application.setGxpFlag(templateApplication.getGxpFlag());
				}
				if (massUpdateParameterInput.getItsecGroupId()) {
					application.setRefId(null);
					if (application.getItsecGroupId()!=null && application.getItsecGroupId() == 10136) {
						application.setItsecGroupId(templateApplication
								.getItsecGroupId());
						ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
								AirKonstanten.TABLE_ID_APPLICATION,
								application.getApplicationId(),
								templateApplication.getItsecGroupId());
					} else {
						application.setItsecGroupId(templateApplication
								.getItsecGroupId());

					}

				}
				if (massUpdateParameterInput.getSlaId()) {
					application.setSlaId(templateApplication.getSlaId());
				}
				if (massUpdateParameterInput.getServiceContractId()) {
					application.setServiceContractId(templateApplication
							.getServiceContractId());
				}
				if (massUpdateParameterInput.getItSecSbAvailability()) {
					application.setItSecSbAvailability(templateApplication
							.getItSecSbAvailability());
				}
				if (massUpdateParameterInput.getItSecSbAvailabilityTxt()) {
					application.setItSecSbAvailabilityTxt(templateApplication
							.getItSecSbAvailabilityTxt());
				}
				if (massUpdateParameterInput.isClassInformationId()) {
					application.setClassInformationId(templateApplication
							.getClassInformationId());
				}
				if (massUpdateParameterInput.isClassInformationExplanation()) {
					application
							.setClassInformationExplanation(templateApplication
									.getClassInformationExplanation());
				}
				if (massUpdateParameterInput.isApplicationOwner()) {
					application.setApplicationOwner(templateApplication
							.getApplicationOwner());
					String itSet=ApplReposHbn.getItSetFromCwid(templateApplication.getApplicationOwner());
					if (null != itSet) {
						application.setItset(Long.parseLong(itSet));//getItset(responsible, subResponsible, tableId, itemId, source);
					}
					if (null == itSet) {
						// set default itSet
						application.setItset(new Long(AirKonstanten.IT_SET_GERMANY));//nicht IT_SET_DEFAULT ?
					}
				}
				if (massUpdateParameterInput.isApplicationOwnerDelegate()) {
					application.setApplicationOwnerDelegate(templateApplication
							.getApplicationOwnerDelegate());
				}
				if (massUpdateParameterInput.isApplicationSteward()) {
					application.setApplicationSteward(templateApplication
							.getApplicationSteward());
				}
				if (massUpdateParameterInput.isComments()) {
					application.setComments(templateApplication.getComments());
				}
				if (massUpdateParameterInput.isOrganisationalScope()) {
					application.setOrganisationalScope(templateApplication
							.getOrganisationalScope());
				}
				if (massUpdateParameterInput.isVersion()) {
					application.setVersion(templateApplication.getVersion());
				}
				//ENFZM: C0000145157
				/*if (massUpdateParameterInput.isBarRelevance()) {
					application.setBarRelevance(templateApplication
							.getBarRelevance());
				}*/
				//ENFZM: C0000145157
				if (massUpdateParameterInput.isCategoryBusiness()) {
					application.setCategoryBusiness(templateApplication
							.getCategoryBusiness());
				}
				if (massUpdateParameterInput.isClassDataId()) {
					application.setClassDataId(templateApplication
							.getClassDataId());
				}
				application.setUpdateUser(massUpdateParameterInput.getCwid());
				application.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				application.setUpdateTimestamp(ApplReposTS
						.getCurrentTimestamp());
				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			if (massUpdateParameterInput.getItsecGroupId()) {
				tx = session.beginTransaction();
				String sql = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";

				Connection conn = session.connection();

				CallableStatement stmt = conn.prepareCall(sql);
				String selectedCIsarray[] = massUpdateParameterInput
						.getSelectedCIs().split(",");
				int size = selectedCIsarray.length;
				for (int i = 0; i < size; i++) {
					stmt.setLong(1, massUpdateParameterInput.getCiTypeId());
					stmt.setLong(2, Long.valueOf(selectedCIsarray[i]));
					stmt.setLong(3,
							Long.valueOf(templateApplication.getItsecGroupId()));
					stmt.addBatch();
				}
				int[] updateCounts = stmt.executeBatch();
				tx.commit();
				System.out.println(updateCounts);
			}
			toCommit = true;

		} catch (Exception e) {
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getCause()
					.getMessage() });
		} finally {
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
		return maParameterOutPut;
	}

	private MassUpdateValueTransferParameterOutPut itSystemMassUpdate(
			MassUpdateParameterInput massUpdateParameterInput) {
		MassUpdateValueTransferParameterOutPut maParameterOutPut = new MassUpdateValueTransferParameterOutPut();
		ItSystem templateItSystem = ItSystemHbn.findById(ItSystem.class,
				massUpdateParameterInput.getTemplateCiId());
		Session session = HibernateUtil.getSession();
		;
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			ScrollableResults itSystems = session
					.createQuery(
							"select h from ItSystem as h where h.id in("
									+ massUpdateParameterInput.getSelectedCIs()
									+ ")").setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (itSystems.next()) {

				ItSystem itSystem = (ItSystem) itSystems.get(0);
				if (massUpdateParameterInput.getLifecycleStatusId()) {
					itSystem.setLifecycleStatusId(templateItSystem
							.getLifecycleStatusId());
				}
				if (massUpdateParameterInput.getBusinessEssentialId1()) {
					itSystem.setBusinessEssentialId(templateItSystem
							.getBusinessEssentialId());
				}
				if (massUpdateParameterInput.getOperationalStatusId()) {
					itSystem.setEinsatzStatusId(templateItSystem
							.getEinsatzStatusId());
				}
				if (massUpdateParameterInput.getPriorityLevelId()) {
					itSystem.setPriorityLevelId(templateItSystem
							.getPriorityLevelId());
				}
				if (massUpdateParameterInput.getSeverityLevelId()) {
					itSystem.setSeverityLevelId(templateItSystem
							.getSeverityLevelId());
				}
				if (massUpdateParameterInput.isOsNameId()) {
					itSystem.setOsNameId(templateItSystem.getOsNameId());
				}
				if (massUpdateParameterInput.getClusterCode()) {
					itSystem.setClusterCode(templateItSystem.getClusterCode());
				}
				if (massUpdateParameterInput.getClusterType()) {
					itSystem.setClusterType(templateItSystem.getClusterType());
				}
				if (massUpdateParameterInput.isPrimaryFunctionId()) {
					itSystem.setPrimaryFunctionId(templateItSystem
							.getPrimaryFunctionId());
				}
				if (massUpdateParameterInput.isVirtualHardwareSoftware()) {
					itSystem.setVirtualHardwareSoftware(templateItSystem
							.getVirtualHardwareSoftware());
				}
				if (massUpdateParameterInput.isVirtualHardwareHost()) {
					itSystem.setIsVirtualHardwareHost(templateItSystem
							.getIsVirtualHardwareHost());
				}
				if (massUpdateParameterInput.isVirtualHardwareClient()) {
					itSystem.setIsVirtualHardwareClient(templateItSystem
							.getIsVirtualHardwareClient());
				}
				if (massUpdateParameterInput.getResponsible()) {
					itSystem.setCiOwner(templateItSystem.getCiOwner());
					Long itSet = null;
					String strItSet = ApplReposHbn.getItSetFromCwid(templateItSystem.getCiOwner());
					if (null != strItSet) {
						itSet = Long.parseLong(strItSet);
					}
					if (null == itSet) {
						// set default itSet
						itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
					}
					itSystem.setItset(itSet);
				}
				if (massUpdateParameterInput.getSubResponsible()) {
					itSystem.setCiOwnerDelegate(templateItSystem
							.getCiOwnerDelegate());
				}
				if (massUpdateParameterInput.getRelevanzITSEC()) {
					itSystem.setRelevanceITSEC(templateItSystem
							.getRelevanceITSEC());
				}
				if (massUpdateParameterInput.isRelevanceICS()) {
					itSystem.setRelevanceICS(templateItSystem.getRelevanceICS());
				}
				if (massUpdateParameterInput.getGxpFlag()) {
					itSystem.setGxpFlag(templateItSystem.getGxpFlag());
				}
				if (massUpdateParameterInput.getItsecGroupId()) {
					itSystem.setRefId(null);
					if (itSystem.getItsecGroupId() == 10136) {
						itSystem.setItsecGroupId(templateItSystem
								.getItsecGroupId());
						// Anlegen der ITSec Massnahmen
						ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
								AirKonstanten.TABLE_ID_IT_SYSTEM,
								itSystem.getId(), itSystem.getItsecGroupId());
						massUpdateParameterInput.setItsecGroupId(false);
					} else {
						itSystem.setItsecGroupId(templateItSystem
								.getItsecGroupId());

					}

				}
				if (massUpdateParameterInput.getGxpFlag()) {
					itSystem.setGxpFlag(templateItSystem.getGxpFlag());
				}
				if (massUpdateParameterInput.getSlaId()) {
					itSystem.setSlaId(templateItSystem.getSlaId());
				}
				if (massUpdateParameterInput.getServiceContractId()) {
					itSystem.setServiceContractId(templateItSystem
							.getServiceContractId());
				}
				if (massUpdateParameterInput.getItSecSbAvailability()) {
					itSystem.setItSecSbAvailability(templateItSystem
							.getItSecSbAvailability());
				}
				if (massUpdateParameterInput.getItSecSbAvailabilityTxt()) {
					itSystem.setItSecSbAvailabilityTxt(templateItSystem
							.getItSecSbAvailabilityTxt());
				}
				if (massUpdateParameterInput.getItSecSbConfidentiality()) {
					itSystem.setClassInformationId(templateItSystem
							.getClassInformationId());
				}
				if (massUpdateParameterInput.getItSecSbConfidentialityTxt()) {
					itSystem.setClassInformationTxt(templateItSystem
							.getClassInformationTxt());
				}
				itSystem.setUpdateUser(massUpdateParameterInput.getCwid());
				itSystem.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				itSystem.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			if (massUpdateParameterInput.getItsecGroupId()) {
				tx = session.beginTransaction();
				String sql = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";

				Connection conn = session.connection();

				CallableStatement stmt = conn.prepareCall(sql);
				String selectedCIsarray[] = massUpdateParameterInput
						.getSelectedCIs().split(",");
				int size = selectedCIsarray.length;
				for (int i = 0; i < size; i++) {
					stmt.setLong(1, massUpdateParameterInput.getCiTypeId());
					stmt.setLong(2, Long.valueOf(selectedCIsarray[i]));
					stmt.setLong(3,
							Long.valueOf(templateItSystem.getItsecGroupId()));
					stmt.addBatch();
				}
				int[] updateCounts = stmt.executeBatch();
				tx.commit();
				System.out.println(updateCounts);
			}
			toCommit = true;

		} catch (Exception e) {
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getCause()
					.getMessage() });
		} finally {
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
		return maParameterOutPut;
	}

	public List<ApplicationContactGroupDTO> getGPSCContacts(Long ciId,
			Integer tableId) {

		List<ApplicationContact> listContacts = AnwendungHbn
				.findApplicationContacts(ciId, tableId);

		String lastGroupTypeName = AirKonstanten.STRING_EMPTY;

		ArrayList<ApplicationContactGroupDTO> listGroups = new ArrayList<ApplicationContactGroupDTO>();
		ArrayList<ApplicationContactEntryDTO> listEntries = new ArrayList<ApplicationContactEntryDTO>();
		ApplicationContactGroupDTO group = new ApplicationContactGroupDTO();

		Iterator<ApplicationContact> itContacts = listContacts.iterator();

		ApplicationContact contact = null;
		ApplicationContactEntryDTO entry = new ApplicationContactEntryDTO();

		while (itContacts.hasNext()) {
			contact = itContacts.next();

			if (!lastGroupTypeName.equals(contact.getGroupTypeName())
					|| !itContacts.hasNext()) {
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
					ApplicationContactEntryDTO temp[] = new ApplicationContactEntryDTO[listEntries
							.size()];
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
				// entry = new ApplicationContactEntryDTO();
				entry.setCwid(contact.getCwid());
			}
			// entry.setPersonName(contact.getPersonName());
			if (null != contact.getGroupName()) {
				entry.setGroupId(contact.getGroupId().toString());
				entry.setGroupName(contact.getGroupName());
			}

		}

		return listGroups;

	}

	public ComplianceControlParameterOutput findAllCIComplianceControlForMassUpdate(
			CiDetailParameterInput input) {
		ComplianceControlParameterOutput output = new ComplianceControlParameterOutput();
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			List<ComplianceControlDTO> list = CiEntitiesHbn
					.findAllCIComplianceControl(input.getCiTypeId(),
							input.getCiId());
			if (!list.isEmpty()) {
				int size = list.size();
				int i = 0;
				ComplianceControlDTO[] controlDTOs = new ComplianceControlDTO[size];
				for (ComplianceControlDTO coDto : list) {
					controlDTOs[i] = coDto;
					i++;
				}
				output.setCopmlianceControlDTOs(controlDTOs);
			}
		}
		return output;
	}

	public MassUpdateValueTransferParameterOutPut linkTemplateWithCIs(
			MassUpdateLinkTemplateParameterInput input) {
		MassUpdateValueTransferParameterOutPut outPut = new MassUpdateValueTransferParameterOutPut();
		try {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				if (input.getCiTypeId() == AirKonstanten.TABLE_ID_APPLICATION) {
					outPut = linkApplicationsWithTemplate(input);
				} else {
					if (input.getCiTypeId() == AirKonstanten.TABLE_ID_IT_SYSTEM) {
						outPut = linkItSystemWithTemplate(input);
					} else {
						outPut = linkLocationCIsWithTemplate(input);
					}
				}
			}

		} catch (Exception e) {
			outPut.setResult(AirKonstanten.RESULT_ERROR);
			outPut.setMessages(new String[] { e.getMessage() });
		
		}

		return outPut;

	}

	private MassUpdateValueTransferParameterOutPut linkLocationCIsWithTemplate(
			MassUpdateLinkTemplateParameterInput input) {
		MassUpdateValueTransferParameterOutPut output = new MassUpdateValueTransferParameterOutPut();
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		CiBase1 locationCiTemplate=null;

		Long ciTypeId = input.getCiTypeId();
		String sql = "";
		if (ciTypeId == AirKonstanten.TABLE_ID_POSITION) {

			sql = "select h from Schrank as h where h.id in("
					+ input.getSelectedCIs() + ")";
			locationCiTemplate = SchrankHbn.findById(input.getTemplateCiId());
		} else {
			if (ciTypeId == AirKonstanten.TABLE_ID_ROOM) {
				sql = "select h from Room as h where h.id in("
						+ input.getSelectedCIs() + ")";
				locationCiTemplate = RoomHbn.findById(input.getTemplateCiId());
			} else {
				if (ciTypeId == AirKonstanten.TABLE_ID_BUILDING) {

					sql = "select h from Building as h where h.id in("
							+ input.getSelectedCIs() + ")";
					locationCiTemplate = BuildingHbn.findById(input.getTemplateCiId());
				} else {
					if (ciTypeId == AirKonstanten.TABLE_ID_BUILDING_AREA) {
						sql = "select h from BuildingArea as h where h.id in("
								+ input.getSelectedCIs() + ")";
						locationCiTemplate = BuildingHbn.findBuildingAreaById(input.getTemplateCiId());
					} else {
						if (ciTypeId == AirKonstanten.TABLE_ID_TERRAIN) {
							sql = "select h from Terrain as h where h.id in("
									+ input.getSelectedCIs() + ")";
							locationCiTemplate = TerrainHbn.findById(input.getTemplateCiId());
						} else {
							if (ciTypeId == AirKonstanten.TABLE_ID_SITE) {
								sql = "select h from Standort as h where h.id in("
										+ input.getSelectedCIs() + ")";
								
								locationCiTemplate = StandortHbn.findById(input.getTemplateCiId());
							}
						}
					}

				}
			}
		}
		try {
			if (!sql.isEmpty()) {
				ScrollableResults locationCIs = session.createQuery(sql)
						.setCacheMode(CacheMode.IGNORE)
						.scroll(ScrollMode.FORWARD_ONLY);
				int count = 0;
				while (locationCIs.next()) {
					CiBase1 locationCi = (CiBase1) locationCIs.get(0);
					locationCi.setRefId(input.getTemplateCiId());
					locationCi.setItsecGroupId(locationCiTemplate.getItsecGroupId());

					if (++count % 20 == 0) {
						session.flush();
						session.clear();
					}
				}
				session.flush();
				session.clear();
				tx.commit();
				toCommit = true;
			} else {
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "invalid CI Type" });
			}

		} catch (Exception e) {
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { e.getCause().getMessage() });
		} finally {
			if (toCommit) {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (null == hbnMessage) {
					output.setResult(AirKonstanten.RESULT_OK);
					output.setMessages(new String[] { "" });
				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { hbnMessage });
				}
			}
		}

		return output;
	}

	private MassUpdateValueTransferParameterOutPut linkItSystemWithTemplate(
			MassUpdateLinkTemplateParameterInput input) {
		MassUpdateValueTransferParameterOutPut output = new MassUpdateValueTransferParameterOutPut();
		ItSystem itSystemTemplate = ItSystemHbn.findItSystemById(input.getTemplateCiId());
		Session session = HibernateUtil.getSession();
		
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			ScrollableResults itSystems = session
					.createQuery(
							"select h from ItSystem as h where h.id in("
									+ input.getSelectedCIs() + ")")
					.setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (itSystems.next()) {

				ItSystem itSystem = (ItSystem) itSystems.get(0);
				itSystem.setRefId(input.getTemplateCiId());
				itSystem.setItsecGroupId(itSystemTemplate.getItsecGroupId());

				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			toCommit = true;

		} catch (Exception e) {
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { e.getCause().getMessage() });
		} finally {
			if (toCommit) {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (null == hbnMessage) {
					output.setResult(AirKonstanten.RESULT_OK);
					output.setMessages(new String[] { "" });
				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { hbnMessage });
				}
			}
		}
		return output;

	}

	private MassUpdateValueTransferParameterOutPut linkApplicationsWithTemplate(
			MassUpdateLinkTemplateParameterInput input) {
		MassUpdateValueTransferParameterOutPut output = new MassUpdateValueTransferParameterOutPut();
		Session session = HibernateUtil.getSession();
		;
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			Application applicationTemplate = (Application)AnwendungHbn.findApplicationById(input.getTemplateCiId());
			ScrollableResults applications = session
					.createQuery(
							"select h from Application as h where h.applicationId in("
									+ input.getSelectedCIs() + ")")
					.setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (applications.next()) {

				Application application = (Application) applications.get(0);
				application.setRefId(input.getTemplateCiId());
				application.setItsecGroupId(applicationTemplate.getItsecGroupId());

				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			toCommit = true;

		} catch (Exception e) {
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { e.getCause().getMessage() });
		} finally {
			if (toCommit) {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (null == hbnMessage) {
					output.setResult(AirKonstanten.RESULT_OK);
					output.setMessages(new String[] { "" });
				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { hbnMessage });
				}
			}
		}
		return output;

	}

	public MassUpdateValueTransferParameterOutPut changeAttrMassUpdateSave(
			MassUpdateChangeAttrParameterInput mAttrParameterInput) {
		MassUpdateValueTransferParameterOutPut parameterOutPut = new MassUpdateValueTransferParameterOutPut();
		try {
			if (LDAPAuthWS.isLoginValid(mAttrParameterInput.getCwid(),
					mAttrParameterInput.getToken())) {
				if (mAttrParameterInput.getCiTypeId() == AirKonstanten.TABLE_ID_APPLICATION) {
					parameterOutPut = applicationSelectAttrMassUpdate(mAttrParameterInput);
				} else if (mAttrParameterInput.getCiTypeId() == AirKonstanten.TABLE_ID_IT_SYSTEM)
					parameterOutPut = itSystemSelectAttMassUpdate(mAttrParameterInput);

				else {
					if(mAttrParameterInput.getCiTypeId()== AirKonstanten.TABLE_ID_FUNCTION){
						parameterOutPut = functionSelectAttrMassUpdate(mAttrParameterInput);
					}else{
						Long ciTypeId = mAttrParameterInput.getCiTypeId();
						String sql = "";
						if (ciTypeId == AirKonstanten.TABLE_ID_POSITION) {
							sql = "select h from Schrank as h where h.id in("
									+ mAttrParameterInput.getSelectedCIs() + ")";
						} else {
							if (ciTypeId == AirKonstanten.TABLE_ID_ROOM) {
								sql = "select h from Room as h where h.id in("
										+ mAttrParameterInput.getSelectedCIs()
										+ ")";
							} else {
								if (ciTypeId == AirKonstanten.TABLE_ID_BUILDING) {
									sql = "select h from Building as h where h.id in("
											+ mAttrParameterInput.getSelectedCIs()
											+ ")";
								} else {
									if (ciTypeId == AirKonstanten.TABLE_ID_BUILDING_AREA) {
										sql = "select h from BuildingArea as h where h.id in("
												+ mAttrParameterInput
														.getSelectedCIs() + ")";
									} else {
										if (ciTypeId == AirKonstanten.TABLE_ID_TERRAIN) {
											sql = "select h from Terrain as h where h.id in("
													+ mAttrParameterInput
															.getSelectedCIs() + ")";
										} else {
											if (ciTypeId == AirKonstanten.TABLE_ID_SITE) {
												sql = "select h from Standort as h where h.id in("
														+ mAttrParameterInput
																.getSelectedCIs()
														+ ")";
											}else{
												if (ciTypeId == AirKonstanten.TABLE_ID_WAYS) {
													sql = "select h from Ways as h where h.id in("
														+ mAttrParameterInput
																.getSelectedCIs()
														+ ")";
												}
												
											}
										}
									}

								}
							}
						}
						parameterOutPut = locationCISelectAttrMassUpdate(
								mAttrParameterInput, sql);

					
					}
				}

			}
		} catch (Exception e) {
			// handle exception
			parameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			parameterOutPut.setMessages(new String[] { e.getCause()
					.getMessage() });
		}
		return parameterOutPut;

	}

	private MassUpdateValueTransferParameterOutPut locationCISelectAttrMassUpdate(
			MassUpdateChangeAttrParameterInput mAttrParameterInput, String sql) {
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		MassUpdateValueTransferParameterOutPut maParameterOutPut = new MassUpdateValueTransferParameterOutPut();
		boolean toCommit = false;
		try {
			ScrollableResults locationCIS = session.createQuery(sql)
					.setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (locationCIS.next()) {
				CiBase1 locationCi = null;
				if (mAttrParameterInput.getCiTypeId() == AirKonstanten.TABLE_ID_ROOM) {
					Room room = (Room) locationCIS.get(0);
					if (mAttrParameterInput.getSeverityLevelId() != null
							&& mAttrParameterInput.getSeverityLevelId() != 0) {
						room.setSeverityLevelId(mAttrParameterInput
								.getSeverityLevelId());
					}
					if (mAttrParameterInput.getBusinessEssentialId() != null
							&& mAttrParameterInput.getBusinessEssentialId() != 0) {
						room.setBusinessEssentialId(mAttrParameterInput
								.getBusinessEssentialId());
					}
					locationCi = room;
				} else {
					if (mAttrParameterInput.getCiTypeId() == AirKonstanten.TABLE_ID_POSITION) {
						Schrank schrank = (Schrank) locationCIS.get(0);
						if (mAttrParameterInput.getSeverityLevelId() != null
								&& mAttrParameterInput.getSeverityLevelId() != 0) {
							schrank.setSeverityLevelId(mAttrParameterInput
									.getSeverityLevelId());
						}
						if (mAttrParameterInput.getBusinessEssentialId() != null
								&& mAttrParameterInput.getBusinessEssentialId() != 0) {
							schrank.setBusinessEssentialId(mAttrParameterInput
									.getBusinessEssentialId());
						}
						locationCi = schrank;
					} else
						locationCi = (CiBase1) locationCIS.get(0);
				}

				if (mAttrParameterInput.getSlaId() != null) {
					locationCi.setSlaId(mAttrParameterInput.getSlaId());
				}
				if (mAttrParameterInput.getServiceContractId() != null
						&& mAttrParameterInput.getServiceContractId() != 0) {
					locationCi.setServiceContractId(mAttrParameterInput
							.getServiceContractId());
				}
				if (mAttrParameterInput.getItSecSbAvailability() != null
						&& mAttrParameterInput.getItSecSbAvailability() != 0) {
					locationCi.setItSecSbAvailability(mAttrParameterInput
							.getItSecSbAvailability());
				}
				if (mAttrParameterInput.getItsecGroupId() != null
						&& mAttrParameterInput.getItsecGroupId() != 0) {
					locationCi.setRefId(null);
					locationCi.setItsecGroupId(mAttrParameterInput
							.getItsecGroupId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getItSecSbAvailabilityTxt())) {
					locationCi.setItSecSbAvailabilityTxt(mAttrParameterInput
							.getItSecSbAvailabilityTxt());
				}
				if (mAttrParameterInput.getClassInformationId() != null
						&& mAttrParameterInput.getClassInformationId() != 0) {
					locationCi.setClassInformationId(mAttrParameterInput
							.getClassInformationId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getClassInformationExplanation())) {
					locationCi.setClassInformationTxt(mAttrParameterInput
							.getClassInformationExplanation());
				}
				if (mAttrParameterInput.getItSecSbIntegrityId() != null
						&& mAttrParameterInput.getItSecSbIntegrityId() != 0) {
					locationCi.setItSecSbIntegrityId(mAttrParameterInput
							.getItSecSbIntegrityId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getItSecSbIntegrityTxt())) {
					locationCi.setItSecSbIntegrityTxt(mAttrParameterInput
							.getItSecSbIntegrityTxt());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerPrimaryPerson())) {
					locationCi.setCiOwner(mAttrParameterInput
							.getCiOwnerPrimaryPerson());
					Long itSet = null;
					String strItSet = ApplReposHbn.getItSetFromCwid(mAttrParameterInput.getCiOwnerPrimaryPerson());
					if (null != strItSet) {
						itSet = Long.parseLong(strItSet);
						locationCi.setItset(itSet);
					}

				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerDelegateHidden())) {
					if(isNumeric(mAttrParameterInput
							.getCiOwnerDelegateHidden())){
						locationCi.setCiOwnerDelegate(mAttrParameterInput
								.getCiOwnerDelegate());
					}else{
						locationCi.setCiOwnerDelegate(mAttrParameterInput
								.getCiOwnerDelegateHidden());
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1435())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1435())) {
						locationCi.setRelevanceITSEC(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1920())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1920())) {
						locationCi.setRelevanceICS(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getGxpFlag())) {
					if ("null".equals(mAttrParameterInput.getGxpFlag())) {
						locationCi.setGxpFlag(null);
					} else {
						locationCi.setGxpFlag(mAttrParameterInput.getGxpFlag());
					}
				}
				locationCi.setUpdateUser(mAttrParameterInput.getCwid());
				locationCi.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				locationCi
						.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			if (mAttrParameterInput.getItsecGroupId() != null) {
				tx = session.beginTransaction();
				String sqlItsec = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";

				Connection conn = session.connection();

				CallableStatement stmt = conn.prepareCall(sqlItsec);
				String selectedCIsArray[] = mAttrParameterInput
						.getSelectedCIs().split(",");
				int size = selectedCIsArray.length;
				for (int i = 0; i < size; i++) {
					stmt.setLong(1, mAttrParameterInput.getCiTypeId());
					stmt.setLong(2, Long.valueOf(selectedCIsArray[i]));
					stmt.setLong(3,
							Long.valueOf(mAttrParameterInput.getItsecGroupId()));
					stmt.addBatch();
				}
				int[] updateCounts = stmt.executeBatch();
				tx.commit();
				System.out.println(updateCounts);
			}

			toCommit = true;
		} catch (Exception e) {
			maParameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			maParameterOutPut.setMessages(new String[] { e.getCause()
					.getMessage() });
		} finally {
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

	private MassUpdateValueTransferParameterOutPut applicationSelectAttrMassUpdate(
			MassUpdateChangeAttrParameterInput mAttrParameterInput) {
		MassUpdateValueTransferParameterOutPut parameterOutPut = new MassUpdateValueTransferParameterOutPut();
		Session session = HibernateUtil.getSession();
		;
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			ScrollableResults applications = session
					.createQuery(
							"select h from Application as h where h.applicationId in("
									+ mAttrParameterInput.getSelectedCIs()
									+ ")").setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (applications.next()) {

				Application application = (Application) applications.get(0);
				if (mAttrParameterInput.getApplicationCat2Id() != null
						&& mAttrParameterInput.getApplicationCat2Id() != 0) {
					application.setApplicationCat2Id(mAttrParameterInput
							.getApplicationCat2Id());
				}
				if (mAttrParameterInput.getLifecycleStatusId() != null
						&& mAttrParameterInput.getLifecycleStatusId() != 0) {
					application.setLifecycleStatusId(mAttrParameterInput
							.getLifecycleStatusId());
				}
				if (mAttrParameterInput.getOperationalStatusId() != null
						&& mAttrParameterInput.getOperationalStatusId() != 0) {
					application.setOperationalStatusId(mAttrParameterInput
							.getOperationalStatusId());
				}
				if (mAttrParameterInput.getPriorityLevelId() != null
						&& mAttrParameterInput.getPriorityLevelId() != 0) {
					application.setPriorityLevelId(mAttrParameterInput
							.getPriorityLevelId());
				}
				if (mAttrParameterInput.getSeverityLevelId() != null
						&& mAttrParameterInput.getSeverityLevelId() != 0) {
					application.setSeverityLevelId(mAttrParameterInput
							.getSeverityLevelId());
				}
				if (mAttrParameterInput.getItsecGroupId() != null
						&& mAttrParameterInput.getItsecGroupId() != 0) {
					application.setRefId(null);
					application.setItsecGroupId(mAttrParameterInput
							.getItsecGroupId());
				}
				if (mAttrParameterInput.getSlaId() != null
						&& mAttrParameterInput.getSlaId() != 0) {
					application.setSlaId(mAttrParameterInput.getSlaId());
				}
				if (mAttrParameterInput.getServiceContractId() != null
						&& mAttrParameterInput.getServiceContractId() != 0) {
					application.setServiceContractId(mAttrParameterInput
							.getServiceContractId());
				}
				if (mAttrParameterInput.getItSecSbAvailability() != null
						&& mAttrParameterInput.getItSecSbAvailability() != 0) {
					application.setItSecSbAvailability(mAttrParameterInput
							.getItSecSbAvailability());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getItSecSbAvailabilityTxt())) {
					application.setItSecSbAvailabilityTxt(mAttrParameterInput
							.getItSecSbAvailabilityTxt());
				}
				if (mAttrParameterInput.getClassInformationId() != null
						&& mAttrParameterInput.getClassInformationId() != 0) {
					application.setClassInformationId(mAttrParameterInput
							.getClassInformationId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getClassInformationExplanation())) {
					application
							.setClassInformationExplanation(mAttrParameterInput
									.getClassInformationExplanation());
				}
				if (mAttrParameterInput.getItSecSbIntegrityId() != null
						&& mAttrParameterInput.getItSecSbIntegrityId() != 0) {
					application.setItSecSbIntegrityId(mAttrParameterInput
							.getItSecSbIntegrityId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getItSecSbIntegrityTxt())) {
					application.setItSecSbIntegrityTxt(mAttrParameterInput
							.getItSecSbIntegrityTxt());
				}				
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getApplicationOwner())) {
					application.setApplicationOwner(mAttrParameterInput
							.getApplicationOwner());
					String itSet=ApplReposHbn.getItSetFromCwid(mAttrParameterInput.getApplicationOwner());
					if (null != itSet) {
						application.setItset(Long.parseLong(itSet));//getItset(responsible, subResponsible, tableId, itemId, source);
					}
					if (null == itSet) {
						// set default itSet
						application.setItset(new Long(AirKonstanten.IT_SET_GERMANY));//nicht IT_SET_DEFAULT ?
					}

				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getApplicationDelegateHidden())) {
					if(isNumeric(mAttrParameterInput
						.getApplicationDelegateHidden())){
						application.setApplicationOwnerDelegate(mAttrParameterInput
								.getApplicationDelegate());
					}else{
						application.setApplicationOwnerDelegate(mAttrParameterInput
								.getApplicationDelegateHidden());
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getApplicationSteward())) {
					application.setApplicationSteward(mAttrParameterInput
							.getApplicationSteward());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerPrimaryPerson())) {
					application.setResponsible(mAttrParameterInput
							.getCiOwnerPrimaryPerson());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerDelegateHidden())) {
					if(isNumeric(mAttrParameterInput
						.getCiOwnerDelegateHidden())){
						application.setSubResponsible(mAttrParameterInput
								.getCiOwnerDelegate());
					}else{
						application.setSubResponsible(mAttrParameterInput
								.getCiOwnerDelegateHidden());
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getVersion())) {
					application.setVersion(mAttrParameterInput.getVersion());
				}
				if (mAttrParameterInput.getOperationalStatusId() != null
						&& mAttrParameterInput.getOperationalStatusId() != 0) {
					application.setOperationalStatusId(mAttrParameterInput
							.getOperationalStatusId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getComments())) {
					application.setComments(mAttrParameterInput.getComments());
				}
				if (mAttrParameterInput.getCategoryBusinessId() != null
						&& mAttrParameterInput.getCategoryBusinessId() != 0) {
					application.setCategoryBusiness(mAttrParameterInput
							.getCategoryBusinessId());
				}
				if (mAttrParameterInput.getClassDataId() != null
						&& mAttrParameterInput.getClassDataId() != 0) {
					application.setClassDataId(mAttrParameterInput
							.getClassDataId());
				}
				if (mAttrParameterInput.getBusinessEssentialId() != null
						&& mAttrParameterInput.getBusinessEssentialId() != 0) {
					application.setBusinessEssentialId(mAttrParameterInput
							.getBusinessEssentialId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getOrganisationalScope())) {
					application.setOrganisationalScope(mAttrParameterInput
							.getOrganisationalScope());
				}
				//ENFZM: C0000145157
				/*if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getBarRelevance())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getBarRelevance())
							|| AirKonstanten.NO_SHORT
									.equals(mAttrParameterInput
											.getBarRelevance())) {
						application.setBarRelevance(mAttrParameterInput
								.getBarRelevance());
					}

					if (AirKonstanten.NO_SHORT.equals(mAttrParameterInput
							.getBarRelevance())) {
						application.setBarApplicationId(null);
					}
				}*/
				//ENFZM: C0000145157
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1435())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1435())) {
						application.setRelevanzITSEC(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1920())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1920())) {
						application.setRelevanceICS(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR2008())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR2008())) {
						application.setRelevance2008(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR2059())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR2059())) {
						application.setRelevance2059(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getGxpFlag())) {
					if ("null".equals(mAttrParameterInput.getGxpFlag())) {
						application.setGxpFlag(null);
					} else {
						application
								.setGxpFlag(mAttrParameterInput.getGxpFlag());
					}
				}
				application.setUpdateUser(mAttrParameterInput.getCwid());
				application.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				application.setUpdateTimestamp(ApplReposTS
						.getCurrentTimestamp());

				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			if (mAttrParameterInput.getItsecGroupId() != null) {
				tx = session.beginTransaction();
				String sql = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";

				Connection conn = session.connection();

				CallableStatement stmt = conn.prepareCall(sql);
				String selectedCIsarray[] = mAttrParameterInput
						.getSelectedCIs().split(",");
				int size = selectedCIsarray.length;
				for (int i = 0; i < size; i++) {
					stmt.setLong(1, mAttrParameterInput.getCiTypeId());
					stmt.setLong(2, Long.valueOf(selectedCIsarray[i]));
					stmt.setLong(3,
							Long.valueOf(mAttrParameterInput.getItsecGroupId()));
					stmt.addBatch();
				}
				int[] updateCounts = stmt.executeBatch();
				tx.commit();
				System.out.println(updateCounts);
			}
			toCommit = true;

		} catch (Exception e) {
			parameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			parameterOutPut.setMessages(new String[] { e.getCause()
					.getMessage() });
		} finally {
			if (toCommit) {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (null == hbnMessage) {
					parameterOutPut.setResult(AirKonstanten.RESULT_OK);
					parameterOutPut.setMessages(new String[] { "" });
				} else {
					parameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
					parameterOutPut.setMessages(new String[] { hbnMessage });
				}
			}
		}
		return parameterOutPut;
	}
	
	private MassUpdateValueTransferParameterOutPut functionSelectAttrMassUpdate(
			MassUpdateChangeAttrParameterInput mAttrParameterInput) {
		MassUpdateValueTransferParameterOutPut parameterOutPut = new MassUpdateValueTransferParameterOutPut();
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			ScrollableResults functions = session
					.createQuery(
							"select h from Function as h where h.id in("
									+ mAttrParameterInput.getSelectedCIs()
									+ ")").setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (functions.next()) {
				Function function = (Function) functions.get(0);
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerPrimaryPerson())) {
					function.setCiOwner(mAttrParameterInput
							.getCiOwnerPrimaryPerson());
					Long itSet = null;
					String strItSet = ApplReposHbn
							.getItSetFromCwid(mAttrParameterInput
									.getCiOwnerPrimaryPerson());
					if (null != strItSet) {
						itSet = Long.parseLong(strItSet);
					}
					if (null == itSet) {
						// set default itSet
						itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
					}
					function.setItset(itSet);
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerDelegateHidden())) {
					if(isNumeric(mAttrParameterInput
							.getCiOwnerDelegateHidden())){
						function.setCiOwnerDelegate(mAttrParameterInput
								.getCiOwnerDelegate());
					}else{
						function.setCiOwnerDelegate(mAttrParameterInput
								.getCiOwnerDelegateHidden());
					}
				}
				if (mAttrParameterInput.getItsecGroupId() != null
						&& mAttrParameterInput.getItsecGroupId() != 0) {
					function.setRefId(null);
					function.setItsecGroupId(mAttrParameterInput
							.getItsecGroupId());
				}

				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1435())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1435())) {
						function.setRelevanceITSEC(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1920())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1920())) {
						function.setRelevanceICS(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getGxpFlag())) {
					if ("null".equals(mAttrParameterInput.getGxpFlag())) {
						function.setGxpFlag(null);
					} else {
						function.setGxpFlag(mAttrParameterInput.getGxpFlag());
					}
				}
				function.setUpdateUser(mAttrParameterInput.getCwid());
				function.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				function.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			if (mAttrParameterInput.getItsecGroupId() != null) {
				tx = session.beginTransaction();
				String sql = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";

				Connection conn = session.connection();

				CallableStatement stmt = conn.prepareCall(sql);
				String selectedCIsarray[] = mAttrParameterInput
						.getSelectedCIs().split(",");
				int size = selectedCIsarray.length;
				for (int i = 0; i < size; i++) {
					stmt.setLong(1, mAttrParameterInput.getCiTypeId());
					stmt.setLong(2, Long.valueOf(selectedCIsarray[i]));
					stmt.setLong(3,
							Long.valueOf(mAttrParameterInput.getItsecGroupId()));
					stmt.addBatch();
				}
				int[] updateCounts = stmt.executeBatch();
				tx.commit();
				System.out.println(updateCounts);
			}
			toCommit = true;
		} catch (Exception e) {
			parameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			parameterOutPut.setMessages(new String[] { e.getCause()
					.getMessage() });
		} finally {
			if (toCommit) {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (null == hbnMessage) {
					parameterOutPut.setResult(AirKonstanten.RESULT_OK);
					parameterOutPut.setMessages(new String[] { "" });
				} else {
					parameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
					parameterOutPut.setMessages(new String[] { hbnMessage });
				}
			}
		}
		return parameterOutPut;
	}

	private MassUpdateValueTransferParameterOutPut itSystemSelectAttMassUpdate(
			MassUpdateChangeAttrParameterInput mAttrParameterInput) {
		MassUpdateValueTransferParameterOutPut parameterOutPut = new MassUpdateValueTransferParameterOutPut();
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		boolean toCommit = false;
		try {
			ScrollableResults itSystems = session
					.createQuery(
							"select h from ItSystem as h where h.id in("
									+ mAttrParameterInput.getSelectedCIs()
									+ ")").setCacheMode(CacheMode.IGNORE)
					.scroll(ScrollMode.FORWARD_ONLY);
			int count = 0;
			while (itSystems.next()) {

				ItSystem itSystem = (ItSystem) itSystems.get(0);
				if (mAttrParameterInput.getLifecycleStatusId() != null
						&& mAttrParameterInput.getLifecycleStatusId() != 0) {
					itSystem.setLifecycleStatusId(mAttrParameterInput
							.getLifecycleStatusId().intValue());
				}
				if (mAttrParameterInput.getOperationalStatusId() != null
						&& mAttrParameterInput.getOperationalStatusId() != 0) {
					itSystem.setEinsatzStatusId(mAttrParameterInput
							.getOperationalStatusId().intValue());
				}
				if (mAttrParameterInput.getPriorityLevelId() != null
						&& mAttrParameterInput.getPriorityLevelId() != 0) {
					itSystem.setPriorityLevelId(mAttrParameterInput
							.getPriorityLevelId());
				}
				if (mAttrParameterInput.getSeverityLevelId() != null
						&& mAttrParameterInput.getSeverityLevelId() != 0) {
					itSystem.setSeverityLevelId(mAttrParameterInput
							.getSeverityLevelId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getClusterCode())) {
					itSystem.setClusterCode(mAttrParameterInput
							.getClusterCode());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getClusterType())) {
					itSystem.setClusterType(mAttrParameterInput
							.getClusterType());
				}
				if (mAttrParameterInput.getItsecGroupId() != null
						&& mAttrParameterInput.getItsecGroupId() != 0) {
					itSystem.setRefId(null);
					itSystem.setItsecGroupId(mAttrParameterInput
							.getItsecGroupId());
				}
				if (mAttrParameterInput.getSlaId() != null
						&& mAttrParameterInput.getSlaId() != 0) {
					itSystem.setSlaId(mAttrParameterInput.getSlaId());
				}
				if (mAttrParameterInput.getServiceContractId() != null
						&& mAttrParameterInput.getServiceContractId() != 0) {
					itSystem.setServiceContractId(mAttrParameterInput
							.getServiceContractId());
				}
				if (mAttrParameterInput.getItSecSbAvailability() != null
						&& mAttrParameterInput.getItSecSbAvailability() != 0) {
					itSystem.setItSecSbAvailability(mAttrParameterInput
							.getItSecSbAvailability());
				}
				if (mAttrParameterInput.getBusinessEssentialId() != null
						&& mAttrParameterInput.getBusinessEssentialId() != 0) {
					itSystem.setBusinessEssentialId(mAttrParameterInput
							.getBusinessEssentialId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getItSecSbAvailabilityTxt())) {
					itSystem.setItSecSbAvailabilityTxt(mAttrParameterInput
							.getItSecSbAvailabilityTxt());
				}
				if (mAttrParameterInput.getItSecSbConfidentialityId() != null
						&& mAttrParameterInput.getItSecSbConfidentialityId() != 0) {
					itSystem.setClassInformationId(mAttrParameterInput
							.getClassInformationId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getItSecSbConfidentialityTx())) {
					itSystem.setClassInformationTxt(mAttrParameterInput
							.getClassInformationExplanation());
				}
				if (mAttrParameterInput.getItSecSbIntegrityId() != null
						&& mAttrParameterInput.getItSecSbIntegrityId() != 0) {
					itSystem.setItSecSbIntegrityId(mAttrParameterInput
							.getItSecSbIntegrityId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getItSecSbIntegrityTxt())) {
					itSystem.setItSecSbIntegrityTxt(mAttrParameterInput
							.getItSecSbIntegrityTxt());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerPrimaryPerson())) {
					itSystem.setCiOwner(mAttrParameterInput
							.getCiOwnerPrimaryPerson());
					Long itSet = null;
					String strItSet = ApplReposHbn.getItSetFromCwid(mAttrParameterInput.getCiOwnerPrimaryPerson());
					if (null != strItSet) {
						itSet = Long.parseLong(strItSet);
					}
					if (null == itSet) {
						// set default itSet
						itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
					}
					itSystem.setItset(itSet);
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getCiOwnerDelegateHidden())) {
					if(isNumeric(mAttrParameterInput
							.getCiOwnerDelegateHidden())){
						itSystem.setCiOwnerDelegate(mAttrParameterInput
								.getCiOwnerDelegate());

					}else{
						itSystem.setCiOwnerDelegate(mAttrParameterInput
								.getCiOwnerDelegateHidden());
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getClusterCode())) {
					itSystem.setClusterCode(mAttrParameterInput
							.getClusterCode());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getClusterType())) {
					itSystem.setClusterType(mAttrParameterInput
							.getClusterType());
				}
				if (mAttrParameterInput.getPrimaryFunctionId() != null
						&& mAttrParameterInput.getPrimaryFunctionId() != 0) {
					itSystem.setPrimaryFunctionId(mAttrParameterInput
							.getPrimaryFunctionId());
				}
				if (mAttrParameterInput.getOsNameId() != null
						&& mAttrParameterInput.getOsNameId() != 0) {
					itSystem.setOsNameId(mAttrParameterInput.getOsNameId());
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getVirtualHardwareSoftware())) {
					itSystem.setVirtualHardwareSoftware(mAttrParameterInput
							.getVirtualHardwareSoftware());
				}

				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1435())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1435())) {
						itSystem.setRelevanceITSEC(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getRelevanceGR1920())) {
					if (AirKonstanten.YES_SHORT.equals(mAttrParameterInput
							.getRelevanceGR1920())) {
						itSystem.setRelevanceICS(-1l);
					}
				}
				if (StringUtils.isNotNullOrEmpty(mAttrParameterInput
						.getGxpFlag())) {
					if ("null".equals(mAttrParameterInput.getGxpFlag())) {
						itSystem.setGxpFlag(null);
					} else {
						itSystem.setGxpFlag(mAttrParameterInput.getGxpFlag());
					}
				}
				itSystem.setUpdateUser(mAttrParameterInput.getCwid());
				itSystem.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				itSystem.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
				if (++count % 20 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.flush();
			session.clear();
			tx.commit();
			if (mAttrParameterInput.getItsecGroupId() != null) {
				tx = session.beginTransaction();
				String sql = "{call pck_Logical_Integrity.P_CI_Safeguard_Assignment (?,?,?)}";

				Connection conn = session.connection();

				CallableStatement stmt = conn.prepareCall(sql);
				String selectedCIsarray[] = mAttrParameterInput
						.getSelectedCIs().split(",");
				int size = selectedCIsarray.length;
				for (int i = 0; i < size; i++) {
					stmt.setLong(1, mAttrParameterInput.getCiTypeId());
					stmt.setLong(2, Long.valueOf(selectedCIsarray[i]));
					stmt.setLong(3,
							Long.valueOf(mAttrParameterInput.getItsecGroupId()));
					stmt.addBatch();
				}
				int[] updateCounts = stmt.executeBatch();
				tx.commit();
				System.out.println(updateCounts);
			}
			toCommit = true;

		} catch (Exception e) {
			parameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
			parameterOutPut.setMessages(new String[] { e.getCause()
					.getMessage() });
		} finally {
			if (toCommit) {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (null == hbnMessage) {
					parameterOutPut.setResult(AirKonstanten.RESULT_OK);
					parameterOutPut.setMessages(new String[] { "" });
				} else {
					parameterOutPut.setResult(AirKonstanten.RESULT_ERROR);
					parameterOutPut.setMessages(new String[] { hbnMessage });
				}
			}
		}
		return parameterOutPut;
	}
	public boolean isNumeric(String s) {
	    return java.util.regex.Pattern.matches("\\d+", s);
	}
}
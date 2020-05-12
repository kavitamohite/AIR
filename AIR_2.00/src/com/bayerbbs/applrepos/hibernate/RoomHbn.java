package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiBase;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;

public class RoomHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(RoomHbn.class);
	
	public static Room findById(Long id) {
		return findById(Room.class, id);
	}
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.RAUM_TYPE_LOCATION, ciId);
	}
	
	public static List<ItSystem> getSystemPlatformsById(Long roomId) {
		List<ItSystem> itSystems = new ArrayList<ItSystem>();
				
		return itSystems;
	}
	
	//CiItemDTO[]
	public static CiItemsResultDTO findRoomsBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("raum_id", "raum_name", "raumalias", "land_kennzeichen,standort_code,terrain_name,gebaeude_name,area_name", "Room", "raum", AirKonstanten.TABLE_ID_ROOM,AirKonstanten.PROVIDER_NAME, AirKonstanten.PROVIDER_ADDRESS,AirKonstanten.IT_HEAD);//land_name_en,standort_name
		return findLocationCisBy(input, metaData);
	}


	public static CiEntityEditParameterOutput deleteRoom(String cwid, RoomDTO dto) {
		return deleteCi(cwid, dto.getId(), Room.class);
	}

	
	public static CiEntityEditParameterOutput saveRoom(String cwid,	RoomDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			boolean hasBusinessEssentialChanged = false;
			Long businessEssentialIdOld = null;
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
				List<String> messages = validateRoom(dto, true);//validateCi

				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Room room = (Room) session.get(Room.class, id);

					if (null == room) {
						// room was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != room.getDeleteTimestamp()) {
						// room is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {
						
						hasBusinessEssentialChanged = false;
						businessEssentialIdOld = room.getBusinessEssentialId();
						if (null == dto.getBusinessEssentialId()) {
							if (null == room.getBusinessEssentialId()) {
								// set the default value
								room.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
								hasBusinessEssentialChanged = true;
							}
						}
						else {
							if (null == room.getBusinessEssentialId() || room.getBusinessEssentialId().longValue() != dto.getBusinessEssentialId().longValue()) {
								hasBusinessEssentialChanged = true;
							}
							room.setBusinessEssentialId(dto.getBusinessEssentialId());
						}

						
						setUpCi(room, dto, cwid, false);
						//EUGXS
						//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
						ComplianceHbn.setComplienceRequest(dto.getId(),dto,cwid);
						room.setProvider_Name(dto.getProviderName());
						room.setProvider_Address(dto.getProviderAddress());
						//C0000069237
						if (null != dto.getItHeadHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getItHeadHidden())) {
								room.setIt_Head(dto.getItHeadHidden());
							}
							else {
								room.setIt_Head(dto.getItHeadHidden());
							}
						}
						//C0000069237


						if (null != dto.getAlias()) {
							room.setAlias(dto.getAlias());
						}
						if (null != dto.getFloor()) {
							room.setFloor(dto.getFloor());
						}
						
						if (null != dto.getAreaId() && !room.getBuildingAreaId().equals(dto.getAreaId())) {
							BuildingArea area = BuildingHbn.findBuildingAreaById(dto.getAreaId());
							room.setBuildingArea(area);
							room.setBuildingAreaId(dto.getAreaId());
						}
						
						
						/*if (null != dto.getSeverityLevelId()) {
							if (-1 == dto.getSeverityLevelId()) {
								room.setSeverityLevelId(null);
							}
							else {
								room.setSeverityLevelId(dto.getSeverityLevelId());
							}
						}*/

					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != room && null == room.getDeleteTimestamp()) {
								session.saveOrUpdate(room);
								session.flush();
								
								toCommit = true;
								
								if (hasBusinessEssentialChanged) {
									sendBusinessEssentialChangedMail(room, dto, businessEssentialIdOld);
								}

							}
						}
					} catch (Exception e) {
						String message = e.getMessage();
						log.error(message);
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						message = ApplReposHbn.getOracleTransbaseErrorMessage(message);
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session, toCommit);
						if (toCommit && null != room) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}
						
						if (room.getRefId() == null && room.getItsecGroupId() != null) {
							// Anlegen der ITSec Massnahmen
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(dto.getTableId(), room.getId(), room.getItsecGroupId());
						}
					}
				} else {
					// messages
					output.setResult(AirKonstanten.RESULT_ERROR);
					String astrMessages[] = new String[messages.size()];
					for (int i = 0; i < messages.size(); i++) {
						astrMessages[i] = messages.get(i);
					}
					output.setMessages(astrMessages);
				}

			} else {
				// application id is missing
				output.setErrorMessage("1003");
			}

		} else {
			// cwid missing
			output.setErrorMessage("100");
		}

		if (AirKonstanten.RESULT_ERROR.equals(output.getResult())) {
			// errorcodes / Texte
			if (null != output.getMessages() && output.getMessages().length > 0) {
				output.setDisplayMessage(output.getMessages()[0]);
			}
		}
		
		return output;
	}
	

	
	/**
	 * reactivates an marked as deleted room. Clears all data attributes !!!
	 * @param cwid
	 * @param dto
	 * @param application
	 * @return
	 */
	public static CiEntityEditParameterOutput reactivateRoom(String cwid, RoomDTO dto, Room room) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == room) {
			// application was not found in database
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the room was not found in database" });
		} else {
			Timestamp tsNow = ApplReposTS.getCurrentTimestamp();
			
			// application found - change values
			room.setUpdateUser(cwid);
			room.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			room.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			room.setInsertUser(cwid);
			room.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			room.setInsertTimestamp(tsNow);
			
			// reactivate DELETE-attributes
			room.setDeleteTimestamp(null);
			room.setDeleteQuelle(null);
			room.setDeleteUser(null);


			room.setRoomName(null);
			room.setAlias(null);
			room.setRoomType(null);
			room.setFloor(null);
			room.setBuildingAreaId(null);

			room.setCiOwner(null);
			room.setCiOwnerDelegate(null);
			
			
			room.setItset(null);
			room.setTemplate(null);
			room.setItsecGroupId(null);
			room.setRefId(null);
			/*--ELERJ ICS--*/
//			room.setRelevanceICS(null);
			room.setRelevanceITSEC(null);
			/*--ELERJ GXP---*/
//			room.setGxpFlag(null);
		}

		boolean toCommit = false;
		try {
			if (null != room) {
				session.saveOrUpdate(room);
				session.flush();
			}
			toCommit = true;
		} catch (Exception e) {
			log.error(e.getMessage());
			// handle exception
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { e.getMessage() });
		} finally {
			String hbnMessage = HibernateUtil.close(tx, session, toCommit);
			if (toCommit && null != room) {
				if (null == hbnMessage) {
					output.setResult(AirKonstanten.RESULT_OK);
					output.setMessages(new String[] { EMPTY });
				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { hbnMessage });
				}
			}
		}
		
		return output;
	}
	
	public static CiEntityEditParameterOutput createRoom(String cwid, RoomDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() && 0 == dto.getId()) {

				// check der InputWerte
				List<String> messages = validateRoom(dto, false);//validateCi

				if (messages.isEmpty()) {
					Room room = new Room();
					boolean isNameAndAliasNameAllowed = true;

					
					
					if (isNameAndAliasNameAllowed) {
						// create the ci
						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();


						// ci - attributes
						room.setAlias(dto.getAlias());
						room.setFloor(dto.getFloor());
						room.setRoomType(dto.getRoomType());
						
						setUpCi(room, dto, cwid, true);
						
						room.setBuildingAreaId(dto.getAreaId());
						BuildingArea buildingArea = BuildingHbn.findBuildingAreaById(dto.getAreaId());
						room.setBuildingArea(buildingArea);
						
	                    //kaushal
						
						room.setProvider_Name(dto.getProviderName());
						room.setProvider_Address(dto.getProviderAddress());
						if (null != dto.getItHeadHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getItHeadHidden())) {
								room.setIt_Head(dto.getItHeadHidden());
							}
							else {
								room.setIt_Head(dto.getItHeadHidden());
							}
						}
						//kaushal
						

						if (null == dto.getBusinessEssentialId()) {
							// messages.add("business essential is empty");
							// TODO 1 TESTCODE getBusinessEssentialId
							dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
						}
						room.setBusinessEssentialId(dto.getBusinessEssentialId());
						
						
						boolean toCommit = false;
						try {
							//EUGXS
							//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
							Long id = (Long)session.save(room);
							ComplianceHbn.setComplienceRequest(id,dto,cwid);
							session.flush();
							toCommit = true;
						} catch (Exception e) {
							// handle exception
							output.setResult(AirKonstanten.RESULT_ERROR);
							output.setMessages(new String[] { e.getMessage() });
						} finally {
							String hbnMessage = HibernateUtil.close(tx, session, toCommit);
							if (toCommit) {
								if (null == hbnMessage) {
									output.setResult(AirKonstanten.RESULT_OK);
									output.setMessages(new String[] { EMPTY });
									output.setTableId(AirKonstanten.TABLE_ID_ROOM);
								} else {
									output.setResult(AirKonstanten.RESULT_ERROR);
									output.setMessages(new String[] { hbnMessage });
								}
							}
						}
					}
				} else {
					// messages
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(messages.toArray(new String[0]));
				}
			} else {
				// ci id not 0
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the ci id should not be 0" });
			}
		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}

	public static KeyValueDTO[] findRoomsByBuildingAreaId(Long id) {
		BuildingArea buildingArea = BuildingHbn.findBuildingAreaById(id);
		Set<Room> rooms = buildingArea.getRooms();
		
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		for(Room room : rooms) {
			if (null == room.getDeleteTimestamp()) {
				data.add(new KeyValueDTO(room.getId(), room.getName()));
			}
		}
			
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}
	
	public static List<Room> findByNameOrAliasAndBuildingAreaId(String name, String alias, Long buildingAreaId) {
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findByNameOrAliasAndBuildingAreaId");
		q.setParameter("name", name);
		q.setParameter("alias", alias);
		q.setParameter("buildingAreaId", buildingAreaId);

		@SuppressWarnings("unchecked")
		List<Room> rooms = q.list();
		
		return rooms;
	}
	
	public static Room findByNameAndBuildingAreaId(String name, Long buildingAreaId) {
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findByNameAndBuildingAreaId");
		q.setParameter("name", name);
		q.setParameter("buildingAreaId", buildingAreaId);

		Room room = (Room)q.uniqueResult();
		
		return room;
	}
	
	private static List<String> validateRoom(RoomDTO dto, boolean isUpdate) {
//		List<String> messages = BaseHbn.validateCi(dto);//, listCi
		List<Room> rooms = findByNameOrAliasAndBuildingAreaId(dto.getName(), dto.getAlias(), dto.getAreaId());
		
		List<String> messages = validateCi(dto);//new ArrayList<String>();
		
		//über evtl. alle Räume anstatt nur den ersten?
//		boolean alreadyExists = isUpdate ? rooms.size() > 0 && rooms.get(0).getId().longValue() != dto.getId().longValue() :
//										   rooms.size() > 0;
		
		boolean alreadyExists = false;
		
		if(isUpdate) {
			for(Room room : rooms) {
				//wenn es nicht das selbe CI ist, gibt es schon ein CI mit diesem Namen und dieser terrain id
				if(room.getId().longValue() != dto.getId().longValue()) {
					alreadyExists = true;
					break;
				}
			}
		} else {
			alreadyExists = rooms.size() > 0;
		}
		
		
		if(alreadyExists) {
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();
			
//			Room room = rooms.get(0);
//			if(room.getDeleteTimestamp() == null)
				messages.add(errorCodeManager.getErrorMessage("3000", null));
//			else
//				messages.add(errorCodeManager.getErrorMessage("3001", null));
		}
		
		return messages;
	}

	public static void getRoom(RoomDTO dto, Room room) {
		dto.setTableId(AirKonstanten.TABLE_ID_ROOM);
		BaseHbn.getCi((CiBaseDTO) dto, (CiBase) room);

		dto.setFloor(room.getFloor());
		dto.setRoomType(room.getRoomType());	
		dto.setBuildingAreaData(room.getBuildingArea().getBuildingAreaName());
		//dto.setSeverityLevelId(room.getSeverityLevelId());
		dto.setBusinessEssentialId(room.getBusinessEssentialId());
		//vandana
		dto.setProviderName(room.getProvider_Name());
		dto.setProviderAddress(room.getProvider_Address());
		dto.setItHead(room.getIt_Head());
	}

	
	public static CiEntityEditParameterOutput copyRoom(String cwid, Long roomIdSource, Long roomIdTarget, String ciNameTarget, String ciAliasTarget) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
				// check der InputWerte
				List<String> messages = new ArrayList<String>();

				if (messages.isEmpty()) {

					Session session = HibernateUtil.getSession();
					Transaction tx = null;
					tx = session.beginTransaction();
					
					Room roomSource = (Room) session.get(Room.class, roomIdSource);
					Room roomTarget = null;
					if (null == roomIdTarget) {
						// Komplette Neuanlage des Datensatzes mit Insert/Update-Feldern
						
						roomTarget = new Room();
						// room - insert values
						roomTarget.setInsertUser(cwid);
						roomTarget.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						roomTarget.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// room - update values
						roomTarget.setUpdateUser(roomTarget.getInsertUser());
						roomTarget.setUpdateQuelle(roomTarget.getInsertQuelle());
						roomTarget.setUpdateTimestamp(roomTarget.getInsertTimestamp());
						
						roomTarget.setRoomName(ciNameTarget);
						roomTarget.setAlias(ciAliasTarget);
						// 
						roomTarget.setCiOwner(cwid.toUpperCase());
						roomTarget.setCiOwnerDelegate(roomSource.getCiOwnerDelegate());
						roomTarget.setTemplate(roomSource.getTemplate());
						
						roomTarget.setRelevanceITSEC(roomSource.getRelevanceITSEC());
						/*--ELERJ ICS--*/
//						roomTarget.setRelevanceICS(roomSource.getRelevanceICS());

					}
					else {
						// Reaktivierung / Übernahme des bestehenden Datensatzes
						roomTarget = (Room) session.get(Room.class, roomIdTarget);
						// room found - change values
						output.setCiId(roomIdTarget);
						
						roomTarget.setUpdateUser(cwid);
						roomTarget.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						roomTarget.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
					}

					if (null == roomSource) {
						// room was not found in database
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the room id "	+ roomIdSource + " was not found in database" });
					} else if (null != roomTarget.getDeleteTimestamp()) {
						// room is deleted
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the room id "	+ roomIdTarget + " is deleted" });
					} else {

						roomTarget.setBuildingAreaId(roomSource.getBuildingAreaId());
						
						// ==========
					//	roomTarget.setSeverityLevelId(roomSource.getSeverityLevelId());
						roomTarget.setBusinessEssentialId(roomSource.getBusinessEssentialId());

						// ==============================
						roomTarget.setItSecSbAvailability(roomSource.getItSecSbAvailability());
						roomTarget.setItSecSbAvailabilityTxt(roomSource.getItSecSbAvailabilityTxt());
						
						// der kopierende User wird Responsible
						roomTarget.setCiOwner(cwid);
						roomTarget.setCiOwnerDelegate(roomSource.getCiOwnerDelegate());
						
						// ==========
						// compliance
						// ==========
						
						// IT SET only view!
						roomTarget.setItset(roomSource.getItset());
						roomTarget.setTemplate(roomSource.getTemplate());
						roomTarget.setItsecGroupId(null);
						roomTarget.setRefId(null);
						
					}

					boolean toCommit = false;
					try {
						if (null == validationMessage) {
							if (null != roomTarget && null == roomTarget.getDeleteTimestamp()) {
								session.saveOrUpdate(roomTarget);
								session.flush();
								
								output.setCiId(roomTarget.getId());
							}
							toCommit = true;
						}
					} catch (Exception e) {
						String message = e.getMessage();
						log.error(message);
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						
						if (null != message && message.startsWith("ORA-20000: ")) {
							message = message.substring("ORA-20000: ".length());
						}
						
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session, toCommit);
						if (toCommit && null != roomTarget) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}
					}
				} else {
					// messages
					output.setResult(AirKonstanten.RESULT_ERROR);
					String astrMessages[] = new String[messages.size()];
					for (int i = 0; i < messages.size(); i++) {
						astrMessages[i] = messages.get(i);
					}
					output.setMessages(astrMessages);
				}

		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		if (AirKonstanten.RESULT_ERROR.equals(output.getResult())) {
			// TODO errorcodes / Texte
			if (null != output.getMessages() && output.getMessages().length > 0) {
				output.setDisplayMessage(output.getMessages()[0]);
			}
		}
		
		return output;
	}

	public static void sendBusinessEssentialChangedMail(Room room, RoomDTO dto, Long businessEssentialIdOld) {
		
		ApplReposHbn.sendBusinessEssentialChangedMail(room.getCiOwner(), "Room", room.getName(), room.getAlias(), dto.getBusinessEssentialId(), businessEssentialIdOld, dto.getTableId(), dto.getId());
	
	}

	public static KeyValueDTO[] findRoomsByBuildingId(Long id) {

		Building building = BuildingHbn.findById(id);
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		
		for(BuildingArea buildingArea : building.getBuildingAreas()){
			Set<Room> rooms = buildingArea.getRooms();
			
			for(Room room : rooms) {
				if (null == room.getDeleteTimestamp()) {
					data.add(new KeyValueDTO(room.getId(), room.getName()+", Alias : "+room.getAlias()));
				}
			}
		}
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}
	
	/**
	 * This method provides the Building for a buildingId and building name
	 * @author enqmu
	 * 
	 */
	@SuppressWarnings("unchecked")
	public static Long findRoomIdByWhereName(Long buildingId, String name)
    {
		Long roomId = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
    	try {
    		Connection conn = session.connection();
			PreparedStatement pstmt = conn.prepareStatement("SELECT RAUM_ID FROM RAUM r WHERE AREA_ID IN (SELECT  AREA_ID FROM BUILDING_AREA ba WHERE GEBAEUDE_ID = ? AND DEL_QUELLE IS NULL) AND DEL_QUELLE IS NULL AND RAUM_NAME=?");
			pstmt.setLong(1, buildingId);
			pstmt.setString(2, name);
			ResultSet rs = pstmt.executeQuery();
			
			while (rs.next()) {
				roomId = rs.getLong(1);
				break;
			}
			rs.close();
			pstmt.close();
			conn.close();
    	} catch(Exception ex)
    	{
    		System.out.println("Error -------> "+ex.getMessage());
    		ex.printStackTrace();
    	}finally{
    		session.close();
    	}
    	return roomId;
    }


}
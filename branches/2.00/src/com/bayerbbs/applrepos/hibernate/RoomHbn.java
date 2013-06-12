package com.bayerbbs.applrepos.hibernate;

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
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Room;
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
		
//		select its.it_system_name, its.hw_ident_or_trans from it_system its 
//		join it_system_hw itshw on itshw.it_system_id = its.it_system_id 
//		join hardwarekomponente hwk on hwk.hw_id = itshw.hw_id 
//		join schrank s on s.schrank_id = hwk.schrank_id 
//		where s.raum_id = roomId 
//		order by its.it_system_name
		
		return itSystems;
	}
	
	//CiItemDTO[]
	public static CiItemsResultDTO findRoomsBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("raum_id", "raum_name", "raumalias", "land_kennzeichen,standort_code,terrain_name,gebaeude_name,area_name", "Room", "raum", AirKonstanten.TABLE_ID_ROOM);//land_name_en,standort_name
		return findLocationCisBy(input, metaData);
	}


	public static CiEntityEditParameterOutput deleteRoom(String cwid, RoomDTO dto) {
		return deleteCi(cwid, dto, Room.class);
	}

	
	public static CiEntityEditParameterOutput saveRoom(String cwid,	RoomDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
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
						// validate template
//						if (null != room.getTemplate() && -1 == room.getTemplate().longValue()) {
//							if (null != dto.getTemplate()) {
//								if (0 == dto.getTemplate().longValue()) {
//									// user wants to change to non template
//									// check if there are referencing values
//									if (!"0".equals(ApplReposHbn.getCountReferencingTemplates(id))) {
//										output.setErrorMessage("1002");
//									}
//								}
//							}
//						}
						
						setUpCi(room, dto, cwid, false);


						if (null != dto.getAlias()) {
							room.setAlias(dto.getAlias());
						}
						if (null != dto.getFloor()) {
							room.setFloor(dto.getFloor());
						}
//						if (null != dto.getRoomType()) {
//							room.setRoomType(dto.getRoomType());
//						}
						
						if (null != dto.getAreaId() && !room.getBuildingAreaId().equals(dto.getAreaId())) {
							BuildingArea area = BuildingHbn.findBuildingAreaById(dto.getAreaId());
							room.setBuildingArea(area);
							room.setBuildingAreaId(dto.getAreaId());
						}
						
						
						if (null != dto.getSeverityLevelId()) {
							if (-1 == dto.getSeverityLevelId()) {
								room.setSeverityLevelId(null);
							}
							else {
								room.setSeverityLevelId(dto.getSeverityLevelId());
							}
						}

						if (null == dto.getBusinessEssentialId()) {
							// messages.add("business essential is empty");
							// TODO 1 TESTCODE getBusinessEssentialId
							dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
						}
						room.setBusinessEssentialId(dto.getBusinessEssentialId());
					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != room && null == room.getDeleteTimestamp()) {
								session.saveOrUpdate(room);
								session.flush();
								
								toCommit = true;
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
			
			room.setRelevanceICS(null);
			room.setRelevanceITSEC(null);
			room.setGxpFlag(null);
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
					
					/*List<CiBaseDTO> listCI = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, true);
					
					if (isNameAndAliasNameAllowed) {
						
						if (null != listCI && 0 < listCI.size()) {
							// name is not allowed
							isNameAndAliasNameAllowed = false;
							output.setResult(AirKonstanten.RESULT_ERROR);
							if (null != listCI.get(0).getDeleteQuelle()) {
								boolean override = forceOverride != null && forceOverride.booleanValue();
								
								if(override) {
									// ENTWICKLUNG RFC8279
									Session session = HibernateUtil.getSession();
									Room roomDeleted = (Room)session.get(Room.class, listCI.get(0).getId());
									
									// reactivate
									reactivateRoom(cwid, dto, roomDeleted);
									// save the data
									dto.setId(roomDeleted.getId());
									return saveRoom(cwid, dto);

								} else {
									output.setMessages(new String[] {"Room Name '" + listCI.get(0).getName() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
								}
							}
							else {
								output.setMessages(new String[] {"Room Name '" + listCI.get(0).getName() + "' already exists."});
							}
						}
					}
					
					if (isNameAndAliasNameAllowed) {
						if(listCI == null)
							listCI = CiEntitiesHbn.findCisByNameOrAlias(dto.getAlias(), AirKonstanten.TABLE_ID_ROOM, true);
						
						if (null != listCI && 0 < listCI.size()) {
							// alias is not allowed
							isNameAndAliasNameAllowed = false;
							output.setResult(AirKonstanten.RESULT_ERROR);
							if (null != listCI.get(0).getDeleteQuelle()) {
								output.setMessages(new String[] {"Room Alias '" + listCI.get(0).getAlias() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
							}
							else {
								output.setMessages(new String[] {"Room Alias '" + listCI.get(0).getAlias() + "' already exists."});
							}
						}						
					}*/
					
					
					if (isNameAndAliasNameAllowed) {
						// create the ci
						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();

						
						// calculates the ItSet
						/*Long itSet = null;
						String strItSet = ApplReposHbn.getItSetFromCwid(dto.getCiOwner());
						if (null != strItSet) {
							itSet = Long.parseLong(strItSet);
						}
						if (null == itSet) {
							// set default itSet
							itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
						}

						// ci - insert values
						room.setInsertUser(cwid);
						room.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						room.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// ci - update values
						room.setUpdateUser(room.getInsertUser());
						room.setUpdateQuelle(room.getInsertQuelle());
						room.setUpdateTimestamp(room.getInsertTimestamp());*/

						// ci - attributes
						room.setAlias(dto.getAlias());
						room.setFloor(dto.getFloor());
						room.setRoomType(dto.getRoomType());
						
						setUpCi(room, dto, cwid, true);
						
						room.setBuildingAreaId(dto.getAreaId());
						BuildingArea buildingArea = BuildingHbn.findBuildingAreaById(dto.getAreaId());
						room.setBuildingArea(buildingArea);
						

						if (null == dto.getBusinessEssentialId()) {
							// messages.add("business essential is empty");
							// TODO 1 TESTCODE getBusinessEssentialId
							dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
						}
						room.setBusinessEssentialId(dto.getBusinessEssentialId());
						
						
						boolean toCommit = false;
						try {
							session.save(room);
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
					
					
//					String astrMessages[] = new String[messages.size()];
//					for (int i = 0; i < messages.size(); i++) {
//						astrMessages[i] = messages.get(i);
//					}
//					output.setMessages(astrMessages);
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
		for(Room room : rooms)
			data.add(new KeyValueDTO(room.getId(), room.getName()));
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}
	
	public static List<Room> findByNameOrAliasAndBuildingAreaId(String name, String alias, Long buildingAreaId) {
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findByNameOrAliasAndBuildingAreaId");
		q.setParameter("name", name);
		q.setParameter("alias", alias);
		q.setParameter("buildingAreaId", buildingAreaId);

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
}
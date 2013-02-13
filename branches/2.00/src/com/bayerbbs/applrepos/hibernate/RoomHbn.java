package com.bayerbbs.applrepos.hibernate;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;

public class RoomHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(RoomHbn.class);
	private static final String EMPTY = "";
	
	public static Room findById(Long id) {
		Room room = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		
		try {
			tx = session.beginTransaction();
			List<Room> list = session.createQuery("select h from Room as h where h.roomId=" + id).list();

			if (null != list && 0 < list.size()) {
				room = (Room) list.get(0);
			}

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				throw e;
			}
		}
		return room;
	}
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.RAUM_TYPE_LOCATION, ciId);
	}
	
	public static List<ItSystem> getSystemPlatformsById(Long roomId) {
		List<ItSystem> itSystems = null;
		
//		select its.it_system_name, its.hw_ident_or_trans from it_system its 
//		join it_system_hw itshw on itshw.it_system_id = its.it_system_id 
//		join hardwarekomponente hwk on hwk.hw_id = itshw.hw_id 
//		join schrank s on s.schrank_id = hwk.schrank_id 
//		where s.raum_id = roomId 
//		order by its.it_system_name
		
		return itSystems;
	}


	public static CiEntityEditParameterOutput deleteRoom(String cwid, RoomDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId()	&& 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				Room room = (Room) session.get(Room.class, id);
				
				if (null == room) {
					// application was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the room id " + id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == room.getDeleteTimestamp()) {
					room.setDeleteUser(cwid);
					room.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					room.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(room);
						session.flush();
						toCommit = true;
					} catch (Exception e) {
						log.error(e.getMessage());
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { e.getMessage() });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session, toCommit);
						
						if (toCommit) {
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
					// application is already deleted
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the room is already deleted" });
				}
			} else {
				// application id is missing
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the room id is missing or invalid" });
			}
		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}

	
	public static CiEntityEditParameterOutput saveRoom(String cwid,	RoomDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
				List<String> messages = RoomHbn.validateRoom(dto);

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
						// room found - change values
						
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
						

						room.setUpdateUser(cwid);
						room.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						room.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
						// RFC8344 change Insert-Quelle? // RFC 8532
//						if (ApplreposConstants.INSERT_QUELLE_ANT.equals(application.getInsertQuelle()) ||
//							ApplreposConstants.INSERT_QUELLE_RFC.equals(application.getInsertQuelle())  ||
//							ApplreposConstants.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())) {
//							application.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
//						}

						// ======
						// Basics
						// ======

						if (null != dto.getName()) {
							room.setRoomName(dto.getName());
						}
						if (null != dto.getAlias()) {
							room.setAlias(dto.getAlias());
						}
						if (null != dto.getFloor()) {
							room.setFloor(dto.getFloor());
						}
						if (null != dto.getRoomType()) {
							room.setRoomType(dto.getRoomType());
						}
						if (null != dto.getAreaId()) {
							room.setBuildingAreaId(dto.getAreaId());
						}
						
						// ================
						// Owner / Delegate
						// ================
						if (null != dto.getCiOwnerHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerHidden())) {
								room.setCiOwner(null);
							}
							else {
								room.setCiOwner(dto.getCiOwnerHidden());
							}
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerDelegateHidden())) {
								room.setCiOwnerDelegate(null);
							}
							else {
								room.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
							}
						}

						
						// ==========
						// compliance
						// ==========
						// Template
						if (null != dto.getTemplate()) {
//							if (-1 == dto.getTemplate()) {
//								application.setTemplate(null);
//							}
//							else {
							room.setTemplate(dto.getTemplate());
//							}
						}
						
						if (null != dto.getItsecGroupId() && 0 != dto.getItsecGroupId()) {
							if (-1 == dto.getItsecGroupId()) {
								room.setItsecGroupId(null);
							}
							else {
								room.setItsecGroupId(dto.getItsecGroupId());
							}
						}
						
						if (null != dto.getRefId()) {
							if (-1 == dto.getRefId()) {
								room.setRefId(null);
							}
							else {
								room.setRefId(dto.getRefId());
							}
						}
						
						if (null != dto.getRelevanceICS()) {
							room.setRelevanceICS(dto.getRelevanceICS());
						}

						if (null != dto.getRelevanzItsec()) {//getRelevanceITSEC
							room.setRelevanceITSEC(dto.getRelevanzItsec());//getRelevanceITSEC
						}

						if (null == dto.getGxpFlagId()) {
							//	we don't know, let the current value 
						}
						else {
							if (EMPTY.equals(dto.getGxpFlagId())) {
								room.setGxpFlag(null);
							}
							else {
								room.setGxpFlag(dto.getGxpFlagId());
							}
						}

						
					}
					boolean toCommit = false;
					try {
						if (null == validationMessage) {
						
							if (null != room
									&& null != room.getDeleteTimestamp()) {
								session.saveOrUpdate(room);
								session.flush();
							}
							toCommit = true;
							
						}
					} catch (Exception e) {
						
						String message = e.getMessage();
						log.error(message);
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						
						message = ApplReposHbn.getOracleTransbaseErrorMessage(message);
						
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								toCommit);
						if (toCommit && null != room) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output
										.setResult(AirKonstanten.RESULT_ERROR);
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
	
	private static List<String> validateRoom(RoomDTO dto) {
		List<String> messages = new ArrayList<String>();
		
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();

		if (StringUtils.isNullOrEmpty(dto.getName())) {
			messages.add("room name is empty");
		}
		else {
			List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, false);
			if (!listCi.isEmpty()) {
				// check if the name is unique
				if (dto.getId().longValue() != listCi.get(0).getId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1100", dto.getName()));
				}
			}
		}

		if (StringUtils.isNullOrEmpty(dto.getAlias())) {
			// messages.add("application alias is empty");
			dto.setAlias(dto.getName());
		}
		else {
			List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, false);
			if (!listCi.isEmpty()) {
				// check if the alias is unique
				if (dto.getId().longValue() != listCi.get(0).getId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1101", dto.getAlias()));
				}
			}
		}

		return messages;
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
			Timestamp tsNow = ApplReposTS
			.getCurrentTimestamp();
			
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
				List<String> messages = RoomHbn.validateRoom(dto);

				if (messages.isEmpty()) {
					Room room = new Room();
					boolean isNameAndAliasNameAllowed = true;
					
					if (isNameAndAliasNameAllowed) {
						List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, true);
						if (null != listCi && 0 < listCi.size()) {
							// name is not allowed
							isNameAndAliasNameAllowed = false;
							output.setResult(AirKonstanten.RESULT_ERROR);
							if (null != listCi.get(0).getDeleteQuelle()) {
								boolean override = forceOverride != null && forceOverride.booleanValue();
								
								if(override) {
									// ENTWICKLUNG RFC8279
									Session session = HibernateUtil.getSession();
									Room roomDeleted = (Room)session.get(Room.class, listCi.get(0).getId());
									
									// reactivate
									reactivateRoom(cwid, dto, roomDeleted);
									// save the data
									dto.setId(roomDeleted.getId());
									return saveRoom(cwid, dto);

								} else {
									output.setMessages(new String[] {"Room Name '" + listCi.get(0).getName() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
								}
							}
							else {
								output.setMessages(new String[] {"Room Name '" + listCi.get(0).getName() + "' already exists."});
							}
						}
					}
					
					if (isNameAndAliasNameAllowed) {
						List<CiBaseDTO> listCI = CiEntitiesHbn.findCisByNameOrAlias(dto.getAlias(), AirKonstanten.TABLE_ID_ROOM, true);
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
					}
					
					
					if (isNameAndAliasNameAllowed) {
						// create the ci

						// calculates the ItSet
						Long itSet = null;
						String strItSet = ApplReposHbn.getItSetFromCwid(dto.getCiOwner());
						if (null != strItSet) {
							itSet = Long.parseLong(strItSet);
						}
						if (null == itSet) {
							// set default itSet
							itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
						}


						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();

						// ci - insert values
						room.setInsertUser(cwid);
						room.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						room.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// ci - update values
						room.setUpdateUser(room.getInsertUser());
						room.setUpdateQuelle(room.getInsertQuelle());
						room.setUpdateTimestamp(room.getInsertTimestamp());

						// ci - attributes
						room.setRoomName(dto.getName());
						room.setAlias(dto.getAlias());
						room.setFloor(dto.getFloor());
						room.setRoomType(dto.getRoomType());
						room.setBuildingAreaId(dto.getAreaId());
						
						if (null != dto.getCiOwnerHidden()) {
							room.setCiOwner(dto.getCiOwnerHidden());
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							room.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
						}

						
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
					String astrMessages[] = new String[messages.size()];
					for (int i = 0; i < messages.size(); i++) {
						astrMessages[i] = messages.get(i);
					}
					output.setMessages(astrMessages);
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
}
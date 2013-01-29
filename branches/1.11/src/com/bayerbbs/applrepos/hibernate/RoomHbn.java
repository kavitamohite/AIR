package com.bayerbbs.applrepos.hibernate;

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
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.BaseDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.service.ApplicationEditParameterOutput;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;

public class RoomHbn {

	private static final Log log = LogFactory.getLog(AnwendungHbn.class);
	
	private static final String EMPTY = "";
	
	public static Room findById(Long id) {
		Room room = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			List<Room> list = session.createQuery(
					"select h from Room as h where h.roomId= "
							+ id).list();

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


	public static CiEntityEditParameterOutput deleteRoom(String cwid,
			RoomDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			if (null != dto.getId()
					&& 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// TODO check der InputWerte
				Session session = HibernateUtil.getSession();
				Transaction tx = null;
				tx = session.beginTransaction();
				Room room = (Room) session.get(
						Room.class, id);
				if (null == room) {
					// application was not found in database
					output.setResult(ApplreposConstants.RESULT_ERROR);
					output.setMessages(new String[] { "the room id "
							+ id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == room.getDeleteTimestamp()) {
					room.setDeleteUser(cwid);
					room
							.setDeleteQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
					room.setDeleteTimestamp(ApplReposTS
							.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(room);
						session.flush();
						toCommit = true;
					} catch (Exception e) {
						log.error(e.getMessage());
						// handle exception
						output.setResult(ApplreposConstants.RESULT_ERROR);
						output.setMessages(new String[] { e.getMessage() });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								toCommit);
						if (toCommit) {
							if (null == hbnMessage) {
								output.setResult(ApplreposConstants.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output
										.setResult(ApplreposConstants.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}
					}

				} else {
					// application is already deleted
					output.setResult(ApplreposConstants.RESULT_ERROR);
					output
							.setMessages(new String[] { "the room is already deleted" });
				}

			} else {
				// application id is missing
				output.setResult(ApplreposConstants.RESULT_ERROR);
				output
						.setMessages(new String[] { "the room id is missing or invalid" });
			}

		} else {
			// cwid missing
			output.setResult(ApplreposConstants.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}

	
	public static CiEntityEditParameterOutput saveRoom(String cwid,	RoomDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			if (null != dto.getId()
					|| 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
				List<String> messages = RoomHbn.validateRoom(dto);

				if (messages.isEmpty()) {

					Session session = HibernateUtil.getSession();
					Transaction tx = null;
					tx = session.beginTransaction();
					Room room = (Room) session.get(
							Room.class, id);

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
						

						// TODO check if allowed
						room.setUpdateUser(cwid);
						room.setUpdateQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
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
							room
								.setRoomName(dto.getName());
						}
						if (null != dto.getAlias()) {
							room.setRoomAlias(dto
									.getAlias());
						}
						if (null != dto.getFloor()) {
							room.setFloor(dto.getFloor());
						}
						if (null != dto.getRoomType()) {
							room.setRoomType(dto.getRoomType());
						}
						if (null != dto.getAreaId()) {
							room.setAreaId(dto.getAreaId());
						}
						
						// ==========
						// compliance
						// ==========
						
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
						output.setResult(ApplreposConstants.RESULT_ERROR);
						
						message = ApplReposHbn.getOracleTransbaseErrorMessage(message);
						
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								toCommit);
						if (toCommit && null != room) {
							if (null == hbnMessage) {
								output.setResult(ApplreposConstants.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output
										.setResult(ApplreposConstants.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}
					}
				} else {
					// messages
					output.setResult(ApplreposConstants.RESULT_ERROR);
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

		if (ApplreposConstants.RESULT_ERROR.equals(output.getResult())) {
			// TODO errorcodes / Texte
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
			List<BaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), ApplreposConstants.TABLE_ID_ROOM);
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
			List<BaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), ApplreposConstants.TABLE_ID_ROOM);
			if (!listCi.isEmpty()) {
				// check if the alias is unique
				if (dto.getId().longValue() != listCi.get(0).getId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1101", dto.getAlias()));
				}
			}
		}

		return messages;
	}
}

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
import com.bayerbbs.applrepos.domain.CiBase;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.SchrankDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;

public class SchrankHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(SchrankHbn.class);
	
	public static Schrank findById(Long id) {
		return findById(Schrank.class, id);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.SCHRANK_TYPE_LOCATION, ciId);
	}


	public static CiItemsResultDTO findSchraenkeBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("schrank_id", "schrank_name", null, "land_kennzeichen,standort_code,terrain_name,gebaeude_name,area_name,raum_name", "Position", "schrank", AirKonstanten.TABLE_ID_POSITION,null,null,null);
		return findLocationCisBy(input, metaData);
	}

	public static CiEntityEditParameterOutput saveSchrank(String cwid, SchrankDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			boolean hasBusinessEssentialChanged = false;
			Long businessEssentialIdOld = null;
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());
	
				// check der InputWerte
//				List<String> messages = validateCi(dto);
				List<String> messages = validateSchrank(dto, true);
	
				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Schrank schrank = findById(id);//(Schrank)session.get(Schrank.class, id);
	
					if (null == schrank) {
						// schrank was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != schrank.getDeleteTimestamp()) {
						// schrank is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {
						// schrank found - change values

						hasBusinessEssentialChanged = false;
						businessEssentialIdOld = schrank.getBusinessEssentialId();
						if (null == dto.getBusinessEssentialId()) {
							if (null == schrank.getBusinessEssentialId()) {
								// set the default value
								schrank.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
								hasBusinessEssentialChanged = true;
							}
						}
						else {
							if (null == schrank.getBusinessEssentialId() || schrank.getBusinessEssentialId().longValue() != dto.getBusinessEssentialId().longValue()) {
								hasBusinessEssentialChanged = true;
							}
							schrank.setBusinessEssentialId(dto.getBusinessEssentialId());
						}

						
						setUpCi(schrank, dto, cwid, false);
						//EUGXS
						//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
						ComplianceHbn.setComplienceRequest(dto.getId(),dto,cwid);
						
						/*
						if(dto.getRoomId() != null && schrank.getRoomId() != null && !schrank.getRoomId().equals(dto.getRoomId())) {
//							ORA-20000: Rack 101526 cannot be moved to another room. Set parameter CHECK_LOCATION_INTEGRITY to N to disable this check.
//							ORA-06512: at "TBADM.TRG_013_BIU", line 224
							
							Room room = RoomHbn.findById(dto.getRoomId());
							schrank.setRoomId(dto.getRaumId());
							schrank.setRoom(room);
						}*/
						
						// validate template
	//					if (null != schrank.getTemplate() && -1 == schrank.getTemplate().longValue()) {
	//						if (null != dto.getTemplate()) {
	//							if (0 == dto.getTemplate().longValue()) {
	//								// user wants to change to non template
	//								// check if there are referencing values
	//								if (!"0".equals(ApplReposHbn.getCountReferencingTemplates(id))) {
	//									output.setErrorMessage("1002");
	//								}
	//							}
	//						}
	//					}
						
						/*
						schrank.setUpdateUser(cwid);
						schrank.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						schrank.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
						// RFC8344 change Insert-Quelle? // RFC 8532
	//					if (ApplreposConstants.INSERT_QUELLE_ANT.equals(application.getInsertQuelle()) ||
	//						ApplreposConstants.INSERT_QUELLE_RFC.equals(application.getInsertQuelle())  ||
	//						ApplreposConstants.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())) {
	//						application.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
	//					}

						if (null != dto.getCiOwnerHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerHidden())) {
								schrank.setCiOwner(null);
							}
							else {
								schrank.setCiOwner(dto.getCiOwnerHidden());
							}
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerDelegateHidden())) {
								schrank.setCiOwnerDelegate(null);
							}
							else {
								schrank.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
							}
						}

						
						if (null != dto.getSlaId()) {
							if (-1 == dto.getSlaId()) {
								schrank.setSlaId(null);
							}
							else {
								schrank.setSlaId(dto.getSlaId());
							}
						}
						if (null != dto.getServiceContractId() || null != dto.getSlaId()) {
							// wenn SLA gesetzt ist, und ServiceContract nicht, dann muss der Service Contract gelöscht werden
							schrank.setServiceContractId(dto.getServiceContractId());
						}
						


						
						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								schrank.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								schrank.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							schrank.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						
						
						// ==========
						// compliance
						// ==========
						// Template
						if (null != dto.getTemplate()) {
	//						if (-1 == dto.getTemplate()) {
	//							application.setTemplate(null);
	//						}
	//						else {
							schrank.setTemplate(dto.getTemplate());
	//						}
						}
						
						if (null != dto.getItsecGroupId() && 0 != dto.getItsecGroupId()) {
							if (-1 == dto.getItsecGroupId()) {
								schrank.setItsecGroupId(null);
							}
							else {
								schrank.setItsecGroupId(dto.getItsecGroupId());
							}
						}
						
						if (null != dto.getRefId()) {
							if (-1 == dto.getRefId()) {
								schrank.setRefId(null);
							}
							else {
								schrank.setRefId(dto.getRefId());
							}
						}
						
	//					if (null != dto.getRelevanceICS()) {
	//						room.setRelevanceICS(dto.getRelevanceICS());
	//					}
	//					if (null != dto.getRelevanzItsec()) {//getRelevanceITSEC
	//						room.setRelevanceITSEC(dto.getRelevanzItsec());//getRelevanceITSEC
	//					}
						
	//					if (null != dto.getRelevanceICS()) {
	//						room.setRelevanceICS(dto.getRelevanceGR1920());
	//					}
	//					if (null != dto.getRelevanzItsec()) {
	//						room.setRelevanceITSEC(dto.getRelevanceGR1435());
	//					}
					
						if (null == dto.getRelevanzItsec()) {
							if ("Y".equals(dto.getRelevanceGR1435())) {
								dto.setRelevanzItsec(new Long(-1));
							}
							else if ("N".equals(dto.getRelevanceGR1435())) {
								dto.setRelevanzItsec(new Long(0));
							}
						}
						if (null == dto.getRelevanceICS()) {
							if ("Y".equals(dto.getRelevanceGR1920())) {
								dto.setRelevanceICS(new Long(-1));
							}
							else if ("N".equals(dto.getRelevanceGR1920())) {
								dto.setRelevanceICS(new Long(0));
							}
						}
						
						schrank.setRelevanceITSEC(dto.getRelevanzItsec());
						schrank.setRelevanceICS(dto.getRelevanceICS());
						
	
						if (null == dto.getGxpFlag()) {
							//	we don't know, let the current value 
						}
						else {
							if (EMPTY.equals(dto.getGxpFlag())) {
								schrank.setGxpFlag(null);
							}
							else {
								schrank.setGxpFlag(dto.getGxpFlag());
							}
						}
	
						
						*/
						
						/*if (null != dto.getSeverityLevelId()) {
							if (-1 == dto.getSeverityLevelId()) {
								schrank.setSeverityLevelId(null);
							} else {
								schrank.setSeverityLevelId(dto.getSeverityLevelId());
							}
						}*/
						
						if (null == dto.getBusinessEssentialId()) {
							if (null == schrank.getBusinessEssentialId()) {
								// set the default value
								schrank.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
							}
						} else {
							schrank.setBusinessEssentialId(dto.getBusinessEssentialId());
						}
						
	//					Long businessEssentialIdOld = schrank.getBusinessEssentialId();
	//					if (hasBusinessEssentialChanged) {
	//						sendBusinessEssentialChangedMail(schrank, dto, businessEssentialIdOld);
	//					}
						
	//					if (null != dto.getClassInformationId()) {
	//						if (-1 == dto.getClassInformationId()) {
	//							schrank.setClassInformationId(null);
	//						} else {
	//							schrank.setClassInformationId(dto.getClassInformationId());
	//						}
	//					}
	//					if (null != dto.getClassInformationExplanation()) {
	//						schrank.setClassInformationExplanation(dto.getClassInformationExplanation());
	//					}
					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != schrank && null == schrank.getDeleteTimestamp()) {
								session.saveOrUpdate(schrank);
								session.flush();
								
								toCommit = true;
								
								if (hasBusinessEssentialChanged) {
									sendBusinessEssentialChangedMail(schrank, dto, businessEssentialIdOld);
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
						if (toCommit && null != schrank) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}
						
						if (schrank.getRefId() == null && schrank.getItsecGroupId() != null) {
							// Anlegen der ITSec Massnahmen
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(dto.getTableId(), schrank.getId(), schrank.getItsecGroupId());
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
	 * reactivates an marked as deleted schrank. Clears all data attributes !!!
	 * @param cwid
	 * @param dto
	 * @param application
	 * @return
	 */
	public static CiEntityEditParameterOutput reactivateSchrank(String cwid, SchrankDTO dto, Schrank schrank) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == schrank) {
			// application was not found in database
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the schrank was not found in database" });
		} else {
			Timestamp tsNow = ApplReposTS.getCurrentTimestamp();
			
			// application found - change values
			schrank.setUpdateUser(cwid);
			schrank.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			schrank.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			schrank.setInsertUser(cwid);
			schrank.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			schrank.setInsertTimestamp(tsNow);
			
			// reactivate DELETE-attributes
			schrank.setDeleteTimestamp(null);
			schrank.setDeleteQuelle(null);
			schrank.setDeleteUser(null);


			schrank.setName(null);

			schrank.setCiOwner(null);
			schrank.setCiOwnerDelegate(null);
			
			
			schrank.setItset(null);
			schrank.setTemplate(null);
			schrank.setItsecGroupId(null);
			schrank.setRefId(null);
			/*--ELERJ ICS--*/
//			schrank.setRelevanceICS(null);
			schrank.setRelevanceITSEC(null);
			/*--ELERJ GXP---*/
//			schrank.setGxpFlag(null);
		}

		boolean toCommit = false;
		try {
			if (null != schrank) {
				session.saveOrUpdate(schrank);
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
			if (toCommit && null != schrank) {
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
	
	public static CiEntityEditParameterOutput createSchrank(String cwid, SchrankDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() && 0 == dto.getId()) {

				// check der InputWerte
				List<String> messages = validateSchrank(dto, false);//validateCi

				if (messages.isEmpty()) {
					Schrank schrank = new Schrank();
					boolean isNameAndAliasNameAllowed = true;
					
					
					
					if (isNameAndAliasNameAllowed) {
						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();

						setUpCi(schrank, dto, cwid, true);
						
						// ci - attributes
						schrank.setRoomId(dto.getRoomId());
						Room room = RoomHbn.findById(dto.getRoomId());
						schrank.setRoom(room);
						
						
						/*if (null != dto.getSeverityLevelId()) {
							if (-1 == dto.getSeverityLevelId()) {
								schrank.setSeverityLevelId(null);
							}
							else {
								schrank.setSeverityLevelId(dto.getSeverityLevelId());
							}
						}*/
						schrank.setBusinessEssentialId(dto.getBusinessEssentialId());

						
						boolean toCommit = false;
						try {
							//EUGXS
							//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
							Long id = (Long) session.save(schrank);
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
									output.setTableId(AirKonstanten.TABLE_ID_POSITION);
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


	public static CiEntityEditParameterOutput deleteSchrank(String cwid, SchrankDTO dto) {
		return deleteCi(cwid, dto.getId(), Schrank.class);
	}


	public static Schrank findByNameAndRoomId(String name, Long roomId) {
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findByNameAndRoomId");
		q.setParameter("name", name);
		q.setParameter("roomId", roomId);

		Schrank schrank = (Schrank)q.uniqueResult();
		
		return schrank;
	}
	
	private static List<String> validateSchrank(SchrankDTO dto, boolean isUpdate) {
		
		Schrank schrank = findByNameAndRoomId(dto.getName(), dto.getRoomId());
		
		boolean alreadyExists = isUpdate ? schrank != null && schrank.getId().longValue() != dto.getId().longValue() : schrank != null;
		
		List<String> messages = validateCi(dto);//new ArrayList<String>();
		
		if(alreadyExists) {//schrank != null
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();

				messages.add(errorCodeManager.getErrorMessage("2000", null));

		}
		
		if (null == dto.getBusinessEssentialId()) {
			// messages.add("business essential is empty");
			// TODO 1 TESTCODE getBusinessEssentialId
			dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
		}
		
		return messages;
	}

	public static void getSchrank(SchrankDTO dto, Schrank schrank) {
		dto.setTableId(AirKonstanten.TABLE_ID_POSITION);
		BaseHbn.getCi((CiBaseDTO) dto, (CiBase) schrank);

		dto.setRaumId(schrank.getRoomId());
		
		//dto.setSeverityLevelId(schrank.getSeverityLevelId());
		dto.setBusinessEssentialId(schrank.getBusinessEssentialId());
	}

	// ein Schrank hat keinen Alias // String ciAliasTarget
	public static CiEntityEditParameterOutput copyPosition(String cwid, Long positionIdSource, Long positionIdTarget, String ciNameTarget) {
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
					
					Schrank positionSource = (Schrank) session.get(Schrank.class, positionIdSource);
					Schrank positionTarget = null;
					if (null == positionIdTarget) {
						// Komplette Neuanlage des Datensatzes mit Insert/Update-Feldern
						
						positionTarget = new Schrank();
						// schrank - insert values
						positionTarget.setInsertUser(cwid);
						positionTarget.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						positionTarget.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// schrank - update values
						positionTarget.setUpdateUser(positionTarget.getInsertUser());
						positionTarget.setUpdateQuelle(positionTarget.getInsertQuelle());
						positionTarget.setUpdateTimestamp(positionTarget.getInsertTimestamp());
						
						positionTarget.setSchrankName(ciNameTarget);
						// schrankTarget.setAlias(ciAliasTarget); - no alias
						// 
						positionTarget.setCiOwner(cwid.toUpperCase());
						positionTarget.setCiOwnerDelegate(positionSource.getCiOwnerDelegate());
						positionTarget.setTemplate(positionSource.getTemplate());
						
						positionTarget.setRelevanceITSEC(positionSource.getRelevanceITSEC());
						/*--ELERJ ICS--*/
//						positionTarget.setRelevanceICS(positionSource.getRelevanceICS());

					}
					else {
						// Reaktivierung / Übernahme des bestehenden Datensatzes
						positionTarget = (Schrank) session.get(Schrank.class, positionIdTarget);
						// room found - change values
						output.setCiId(positionIdTarget);
						
						positionTarget.setUpdateUser(cwid);
						positionTarget.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						positionTarget.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
					}

					if (null == positionSource) {
						// schrank was not found in database
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the position id "	+ positionIdSource + " was not found in database" });
					} else if (null != positionTarget.getDeleteTimestamp()) {
						// room is deleted
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the position id "	+ positionIdTarget + " is deleted" });
					} else {

						positionTarget.setRoomId(positionSource.getRoomId());
						
						// ==========
					//	positionTarget.setSeverityLevelId(positionSource.getSeverityLevelId());
						positionTarget.setBusinessEssentialId(positionSource.getBusinessEssentialId());

						// ==============================
						positionTarget.setItSecSbAvailability(positionSource.getItSecSbAvailability());
						positionTarget.setItSecSbAvailabilityTxt(positionSource.getItSecSbAvailabilityTxt());
						
						// der kopierende User wird Responsible
						positionTarget.setCiOwner(cwid);
						positionTarget.setCiOwnerDelegate(positionSource.getCiOwnerDelegate());
						
						// ==========
						// compliance
						// ==========
						
						// IT SET only view!
						positionTarget.setItset(positionSource.getItset());
						positionTarget.setTemplate(positionSource.getTemplate());
						positionTarget.setItsecGroupId(null);
						positionTarget.setRefId(null);
						
					}

					boolean toCommit = false;
					try {
						if (null == validationMessage) {
							if (null != positionTarget && null == positionTarget.getDeleteTimestamp()) {
								session.saveOrUpdate(positionTarget);
								session.flush();
								
								output.setCiId(positionTarget.getId());
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
						if (toCommit && null != positionTarget) {
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

	public static void sendBusinessEssentialChangedMail(Schrank position, SchrankDTO dto, Long businessEssentialIdOld) {
		
		ApplReposHbn.sendBusinessEssentialChangedMail(position.getCiOwner(), "Position", position.getName(), null, dto.getBusinessEssentialId(), businessEssentialIdOld, dto.getTableId(), dto.getId());
	
	}

	public static KeyValueDTO[] findSchrankByRoomId(Long id) {
		Room room = RoomHbn.findById(id);
		Set<Schrank> schranks = room.getSchranks();
		
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		for(Schrank schrank: schranks) {
			if (null == schrank.getDeleteTimestamp()) {
				data.add(new KeyValueDTO(schrank.getId(), schrank.getName()));
			}
		}
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}
}
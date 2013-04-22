package com.bayerbbs.applrepos.hibernate;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;

public class StandortHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(StandortHbn.class);
	
	public static Standort findById(Long id) {
		return findById(Standort.class, id);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.STANDORT_TYPE_LOCATION, ciId);
	}


	public static CiItemsResultDTO findSitesBy(ApplicationSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("standort_id", "standort_name", null, "land_kennzeichen", "Site", "standort", AirKonstanten.TABLE_ID_SITE);
		return findLocationCisBy(input, metaData);
	}

	public static CiEntityEditParameterOutput deleteStandort(String cwid, StandortDTO dto) {
		return deleteCi(cwid, dto, Standort.class);
		
		/*CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId()	&& 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				Standort standort = (Standort) session.get(Standort.class, id);
				
				if (null == standort) {
					// application was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the standort id " + id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == standort.getDeleteTimestamp()) {
					standort.setDeleteUser(cwid);
					standort.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					standort.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(standort);
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
					output.setMessages(new String[] { "the standort is already deleted" });
				}
			} else {
				// application id is missing
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the standort id is missing or invalid" });
			}
		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;*/
	}

	
	public static CiEntityEditParameterOutput saveStandort(String cwid,	StandortDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
//				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), dto.getTableId(), true);
//				List<CiItemDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName());
//				List<String> messages = validateCi(dto);//, listCi
				List<String> messages = validateStandort(dto, true);

				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Standort standort = (Standort) session.get(Standort.class, id);

					if (null == standort) {
						// standort was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != standort.getDeleteTimestamp()) {
						// standort is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {
						// standort found - change values
						
						// validate template
//						if (null != standort.getTemplate() && -1 == standort.getTemplate().longValue()) {
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
						

						standort.setUpdateUser(cwid);
						standort.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						standort.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
						// RFC8344 change Insert-Quelle? // RFC 8532
//						if (ApplreposConstants.INSERT_QUELLE_ANT.equals(application.getInsertQuelle()) ||
//							ApplreposConstants.INSERT_QUELLE_RFC.equals(application.getInsertQuelle())  ||
//							ApplreposConstants.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())) {
//							application.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
//						}

						// ======
						// Basics
						// ======

//						if (null != dto.getName()) {
//							standort.setStandortName(dto.getName());
//						}

						

						
						// ================
						// Owner / Delegate
						// ================
						if (null != dto.getCiOwnerHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerHidden())) {
								standort.setCiOwner(null);
							}
							else {
								standort.setCiOwner(dto.getCiOwnerHidden());
							}
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerDelegateHidden())) {
								standort.setCiOwnerDelegate(null);
							}
							else {
								standort.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
							}
						}
						
//						standort.setSlaId(dto.getSlaId());
//						standort.setServiceContractId(dto.getServiceContractId());
						
						if (null != dto.getSlaId()) {
							if (-1 == dto.getSlaId()) {
								standort.setSlaId(null);
							}
							else {
								standort.setSlaId(dto.getSlaId());
							}
						}
						if (null != dto.getServiceContractId() || null != dto.getSlaId()) {
							// wenn SLA gesetzt ist, und ServiceContract nicht, dann muss der Service Contract gelöscht werden
							standort.setServiceContractId(dto.getServiceContractId());
						}



						
//						Long businessEssentialIdOld = standort.getBusinessEssentialId();
//						if (hasBusinessEssentialChanged) {
//							sendBusinessEssentialChangedMail(standort, dto, businessEssentialIdOld);
//						}
						
						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								standort.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								standort.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							standort.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
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
							standort.setTemplate(dto.getTemplate());
//							}
						}
						
						if (null != dto.getItsecGroupId() && 0 != dto.getItsecGroupId()) {
							if (-1 == dto.getItsecGroupId()) {
								standort.setItsecGroupId(null);
							}
							else {
								standort.setItsecGroupId(dto.getItsecGroupId());
							}
						}
						
						if (null != dto.getRefId()) {
							if (-1 == dto.getRefId()) {
								standort.setRefId(null);
							}
							else {
								standort.setRefId(dto.getRefId());
							}
						}
						
//						if (null != dto.getRelevanceICS()) {
//							standort.setRelevanceICS(dto.getRelevanceICS());
//						}
//						if (null != dto.getRelevanzItsec()) {//getRelevanceITSEC
//							standort.setRelevanceITSEC(dto.getRelevanzItsec());//getRelevanceITSEC
//						}
						
//						if (null != dto.getRelevanceICS()) {
//							standort.setRelevanceICS(dto.getRelevanceGR1920());
//						}
//						if (null != dto.getRelevanzItsec()) {
//							standort.setRelevanceITSEC(dto.getRelevanceGR1435());
//						}
						
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
						
						standort.setRelevanceITSEC(dto.getRelevanzItsec());
						standort.setRelevanceICS(dto.getRelevanceICS());
						

						if (null == dto.getGxpFlag()) {
							//	we don't know, let the current value 
						}
						else {
							if (EMPTY.equals(dto.getGxpFlag())) {
								standort.setGxpFlag(null);
							}
							else {
								standort.setGxpFlag(dto.getGxpFlag());
							}
						}

						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								standort.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								standort.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							standort.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						
						
//						if (null != dto.getClassInformationId()) {
//							if (-1 == dto.getClassInformationId()) {
//								standort.setClassInformationId(null);
//							} else {
//								standort.setClassInformationId(dto.getClassInformationId());
//							}
//						}
//						if (null != dto.getClassInformationExplanation()) {
//							standort.setClassInformationExplanation(dto.getClassInformationExplanation());
//						}
						
						standort.setStandortCode(dto.getStandortCode());
					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != standort && null == standort.getDeleteTimestamp()) {
								session.saveOrUpdate(standort);
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
						if (toCommit && null != standort) {
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
	 * reactivates an marked as deleted standort. Clears all data attributes !!!
	 * @param cwid
	 * @param dto
	 * @param application
	 * @return
	 */
	public static CiEntityEditParameterOutput reactivateStandort(String cwid, StandortDTO dto, Standort standort) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == standort) {
			// application was not found in database
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the standort was not found in database" });
		} else {
			Timestamp tsNow = ApplReposTS.getCurrentTimestamp();
			
			// application found - change values
			standort.setUpdateUser(cwid);
			standort.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			standort.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			standort.setInsertUser(cwid);
			standort.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			standort.setInsertTimestamp(tsNow);
			
			// reactivate DELETE-attributes
			standort.setDeleteTimestamp(null);
			standort.setDeleteQuelle(null);
			standort.setDeleteUser(null);


			standort.setStandortName(null);

			standort.setCiOwner(null);
			standort.setCiOwnerDelegate(null);
			
			
			standort.setItset(null);
			standort.setTemplate(null);
			standort.setItsecGroupId(null);
			standort.setRefId(null);
			
			standort.setRelevanceICS(null);
			standort.setRelevanceITSEC(null);
			standort.setGxpFlag(null);
		}

		boolean toCommit = false;
		try {
			if (null != standort) {
				session.saveOrUpdate(standort);
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
			if (toCommit && null != standort) {
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
	
	public static CiEntityEditParameterOutput createStandort(String cwid, StandortDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() && 0 == dto.getId()) {

				// check der InputWerte
//				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), dto.getTableId(), true);
//				List<CiItemDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName());
				List<String> messages = validateStandort(dto, false);//validateCi , listCi

				if (messages.isEmpty()) {
					Standort standort = new Standort();
					boolean isNameAndAliasNameAllowed = true;
					
					/*
					if (isNameAndAliasNameAllowed) {
						listCi = CiEntitiesHbn.findExistantCisByNameOrAlias(dto.getName(), true);
						
						if (null != listCi && 0 < listCi.size()) {
							// name is not allowed
							isNameAndAliasNameAllowed = false;
							output.setResult(AirKonstanten.RESULT_ERROR);
							if (null != listCi.get(0).getDeleteQuelle()) {
								boolean override = forceOverride != null && forceOverride.booleanValue();
								
								if(override) {
									// ENTWICKLUNG RFC8279
									Session session = HibernateUtil.getSession();
									Standort standortDeleted = (Standort)session.get(Standort.class, listCi.get(0).getId());
									
									// reactivate
									reactivateStandort(cwid, dto, standortDeleted);
									// save the data
									dto.setId(standortDeleted.getId());
									return saveStandort(cwid, dto);

								} else {
									output.setMessages(new String[] {"Standort Name '" + listCi.get(0).getName() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
								}
							}
							else {
								output.setMessages(new String[] {"Standort Name '" + listCi.get(0).getName() + "' already exists."});
							}
						}
					}
					
					if (isNameAndAliasNameAllowed) {
						listCi = CiEntitiesHbn.findExistantCisByNameOrAlias(dto.getAlias(), true);
						if (null != listCi && 0 < listCi.size()) {
							// alias is not allowed
							isNameAndAliasNameAllowed = false;
							output.setResult(AirKonstanten.RESULT_ERROR);
							if (null != listCi.get(0).getDeleteQuelle()) {
								output.setMessages(new String[] {"Standort Alias '" + listCi.get(0).getAlias() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
							}
							else {
								output.setMessages(new String[] {"Standort Alias '" + listCi.get(0).getAlias() + "' already exists."});
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
						standort.setInsertUser(cwid);
						standort.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						standort.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// ci - update values
						standort.setUpdateUser(standort.getInsertUser());
						standort.setUpdateQuelle(standort.getInsertQuelle());
						standort.setUpdateTimestamp(standort.getInsertTimestamp());

						// ci - attributes
						standort.setStandortName(dto.getName());
						standort.setLandId(dto.getLandId());
						
						
						if (null != dto.getCiOwnerHidden()) {
							standort.setCiOwner(dto.getCiOwnerHidden());
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							standort.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
						}

						standort.setTemplate(dto.getTemplate());

						standort.setRelevanceITSEC(dto.getRelevanzItsec());
						standort.setRelevanceICS(dto.getRelevanceICS());*/
						
						setUpCi(standort, dto, cwid, true);
						
						standort.setLandId(dto.getLandId());
						standort.setStandortCode(dto.getStandortCode());
						
						boolean toCommit = false;
						try {
							session.save(standort);
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
									output.setTableId(AirKonstanten.TABLE_ID_SITE);
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

	public static KeyValueDTO[] findSitesByLandId(Long id) {//DefaultDataInput input
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findSitesByLandId");
		q.setParameter("landId", id);//input.getId()

		List<Standort> sites = q.list();
		
		
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		for(Standort site : sites)
			data.add(new KeyValueDTO(site.getId(), site.getName()));
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}
	
	public static Standort findByNameAndCountryId(String name, Long landId) {
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findByNameAndCountryId");
		q.setParameter("name", name);
		q.setParameter("landId", landId);

		Standort standort = (Standort)q.uniqueResult();
		
		return standort;
	}
	
	private static List<String> validateStandort(StandortDTO dto, boolean isUpdate) {
		Standort standort = findByNameAndCountryId(dto.getName(), dto.getLandId());
		
		boolean alreadyExists = isUpdate ? standort.getId().longValue() != dto.getId().longValue() : standort != null;
		
		List<String> messages = validateCi(dto);//new ArrayList<String>();
		if(alreadyExists) {
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();
			
//			Building building = buildings.get(0);
//			if(building.getDeleteTimestamp() == null)
				messages.add(errorCodeManager.getErrorMessage("7000", null));
//			else
//				messages.add(errorCodeManager.getErrorMessage("7001", null));
		}
		
		return messages;
	}



}
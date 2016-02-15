package com.bayerbbs.applrepos.hibernate;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiBase;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Land;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueEnDTO;
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
		return deleteCi(cwid, dto.getId(), Standort.class);
	}

	
	public static CiEntityEditParameterOutput saveStandort(String cwid,	StandortDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
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
						
						setUpCi(standort, dto, cwid, false);
						
						if (null != dto.getNameEn()) {
							if (EMPTY.equals(dto.getNameEn())) {
								standort.setNameEn(null);
							}
							else {
								standort.setNameEn(dto.getNameEn());
							}
						}

						if(dto.getStandortCode() != null)
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
						
						if (standort.getRefId() == null && standort.getItsecGroupId() != null) {
							// Anlegen der ITSec Massnahmen
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(dto.getTableId(), standort.getId(), standort.getItsecGroupId());
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
				List<String> messages = validateStandort(dto, false);//validateCi , listCi

				if (messages.isEmpty()) {
					Standort standort = new Standort();
					boolean isNameAndAliasNameAllowed = true;
					
					
					if (isNameAndAliasNameAllowed) {
						// create the ci

						Session session = HibernateUtil.getSession();
						Transaction tx = session.beginTransaction();
						
						// calculates the ItSet
						
						setUpCi(standort, dto, cwid, true);
						
						standort.setLandId(dto.getLandId());
						standort.setStandortCode(dto.getStandortCode());
						
						if (null != dto.getNameEn()) {
							if (EMPTY.equals(dto.getNameEn())) {
								standort.setNameEn(null);
							}
							else {
								standort.setNameEn(dto.getNameEn());
							}
						}
						
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

	public static KeyValueEnDTO[] findSitesByLandId(Long id) {//DefaultDataInput input
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findSitesByLandId");
		q.setParameter("landId", id);//input.getId()

		@SuppressWarnings("unchecked")
		List<Standort> sites = q.list();
		
		
		List<KeyValueEnDTO> data = new ArrayList<KeyValueEnDTO>();
		for(Standort site : sites) {
			if (null == site.getDeleteTimestamp()) {
				data.add(new KeyValueEnDTO(site.getId(), site.getName(), site.getNameEn()));
			}
		}
			
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueEnDTO[0]);
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
		
		boolean alreadyExists = isUpdate ? standort != null && standort.getId().longValue() != dto.getId().longValue() : standort != null;
		
		List<String> messages = validateCi(dto);//new ArrayList<String>();
		if(alreadyExists) {
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();
			messages.add(errorCodeManager.getErrorMessage("7000", null));
		}
		
		return messages;
	}


	public static void getSite(StandortDTO dto, Standort site) {
		dto.setTableId(AirKonstanten.TABLE_ID_SITE);
		BaseHbn.getCi((CiBaseDTO) dto, (CiBase) site);

		dto.setLandId(site.getLandId());
	}

	
	public static CiEntityEditParameterOutput copySite(String cwid, Long siteIdSource, Long siteIdTarget, String ciNameTarget, String ciAliasTarget) {
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
					
					Standort siteSource = (Standort) session.get(Standort.class, siteIdSource);
					Standort siteTarget = null;
					if (null == siteIdTarget) {
						// Komplette Neuanlage des Datensatzes mit Insert/Update-Feldern
						
						siteTarget = new Standort();
						// room - insert values
						siteTarget.setInsertUser(cwid);
						siteTarget.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						siteTarget.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// room - update values
						siteTarget.setUpdateUser(siteTarget.getInsertUser());
						siteTarget.setUpdateQuelle(siteTarget.getInsertQuelle());
						siteTarget.setUpdateTimestamp(siteTarget.getInsertTimestamp());
						
						siteTarget.setStandortName(ciNameTarget);
						// siteTarget.setAlias(ciAliasTarget);
						// 
						siteTarget.setCiOwner(cwid.toUpperCase());
						siteTarget.setCiOwnerDelegate(siteSource.getCiOwnerDelegate());
						siteTarget.setTemplate(siteSource.getTemplate());
						
						siteTarget.setRelevanceITSEC(siteSource.getRelevanceITSEC());
						siteTarget.setRelevanceICS(siteSource.getRelevanceICS());

					}
					else {
						// Reaktivierung / Übernahme des bestehenden Datensatzes
						siteTarget = (Standort) session.get(Standort.class, siteIdTarget);
						// room found - change values
						output.setCiId(siteIdTarget);
						
						siteTarget.setUpdateUser(cwid);
						siteTarget.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						siteTarget.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
					}

					if (null == siteSource) {
						// site was not found in database
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the site id "	+ siteIdSource + " was not found in database" });
					} else if (null != siteTarget.getDeleteTimestamp()) {
						// site is deleted
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the site id "	+ siteIdTarget + " is deleted" });
					} else {

						siteTarget.setLandId(siteSource.getLandId());
						
						// ==========
						// siteTarget.setSeverityLevelId(siteSource.getSeverityLevelId());
						// siteTarget.setBusinessEssentialId(siteSource.getBusinessEssentialId());

						// ==============================
						siteTarget.setItSecSbAvailability(siteSource.getItSecSbAvailability());
						siteTarget.setItSecSbAvailabilityTxt(siteSource.getItSecSbAvailabilityTxt());
						
						// der kopierende User wird Responsible
						siteTarget.setCiOwner(cwid);
						siteTarget.setCiOwnerDelegate(siteSource.getCiOwnerDelegate());
						
						// ==========
						// compliance
						// ==========
						
						// IT SET only view!
						siteTarget.setItset(siteSource.getItset());
						siteTarget.setTemplate(siteSource.getTemplate());
						siteTarget.setItsecGroupId(null);
						siteTarget.setRefId(null);
						
					}

					boolean toCommit = false;
					try {
						if (null == validationMessage) {
							if (null != siteTarget && null == siteTarget.getDeleteTimestamp()) {
								session.saveOrUpdate(siteTarget);
								session.flush();
								
								output.setCiId(siteTarget.getId());
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
						if (toCommit && null != siteTarget) {
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
	
	/**
	 * This method provides the typeId for a Type name
	 * @author enqmu
	 * 
	 */
	@SuppressWarnings("unchecked")
	public static Standort findSiteByNameAndLandId(String name, Long landId)
    {
		Standort site = null;
    	try {
    		Session session = HibernateUtil.getSessionFactory().openSession();
    		Criteria criteria = session.createCriteria(Standort.class);
    		criteria.add(Restrictions.or(Restrictions.eq("standortName", name), Restrictions.eq("nameEn", name)));
    		criteria.add(Restrictions.eq("landId", landId));
    		
			List<Standort> values = criteria.list();
			
			if(values != null && !values.isEmpty()) {
				site = values.get(0);
			}
			
    	} catch(Exception ex)
    	{
    		ex.printStackTrace();
    	}
    	return site;
    }

}
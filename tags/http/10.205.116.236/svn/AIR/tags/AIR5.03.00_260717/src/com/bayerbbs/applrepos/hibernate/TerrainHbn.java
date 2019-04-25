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
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.TerrainDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;

public class TerrainHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(TerrainHbn.class);
	
	public static Terrain findById(Long id) {
		return findById(Terrain.class, id);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.TERRAIN_TYPE_LOCATION, ciId);
	}


	public static CiItemsResultDTO findTerrainsBy(ApplicationSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("terrain_id", "terrain_name", null, "land_kennzeichen,standort_code", "Terrain", "terrain", AirKonstanten.TABLE_ID_TERRAIN,null,null,null);
		return findLocationCisBy(input, metaData);
	}

	public static CiEntityEditParameterOutput deleteTerrain(String cwid, TerrainDTO dto) {
		return deleteCi(cwid, dto.getId(), Terrain.class);
		

	}

	
	public static CiEntityEditParameterOutput saveTerrain(String cwid,	TerrainDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte				
				List<String> messages = validateTerrain(dto, true);

				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Terrain terrain = (Terrain) session.get(Terrain.class, id);

					if (null == terrain) {
						// terrain was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != terrain.getDeleteTimestamp()) {
						// terrain is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {

						
						setUpCi(terrain, dto, cwid, false);

					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != terrain && null == terrain.getDeleteTimestamp()) {
								session.saveOrUpdate(terrain);
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
						if (toCommit && null != terrain) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}
						
						if (terrain.getRefId() == null && terrain.getItsecGroupId() != null) {
							// Anlegen der ITSec Massnahmen
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(dto.getTableId(), terrain.getId(), terrain.getItsecGroupId());
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
	 * reactivates an marked as deleted terrain. Clears all data attributes !!!
	 * @param cwid
	 * @param dto
	 * @param application
	 * @return
	 */
	public static CiEntityEditParameterOutput reactivateTerrain(String cwid, TerrainDTO dto, Terrain terrain) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == terrain) {
			// application was not found in database
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the terrain was not found in database" });
		} else {
			Timestamp tsNow = ApplReposTS.getCurrentTimestamp();
			
			// application found - change values
			terrain.setUpdateUser(cwid);
			terrain.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			terrain.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			terrain.setInsertUser(cwid);
			terrain.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			terrain.setInsertTimestamp(tsNow);
			
			// reactivate DELETE-attributes
			terrain.setDeleteTimestamp(null);
			terrain.setDeleteQuelle(null);
			terrain.setDeleteUser(null);


			terrain.setTerrainName(null);

			terrain.setCiOwner(null);
			terrain.setCiOwnerDelegate(null);
			
			
			terrain.setItset(null);
			terrain.setTemplate(null);
			terrain.setItsecGroupId(null);
			terrain.setRefId(null);
			
			terrain.setRelevanceICS(null);
			terrain.setRelevanceITSEC(null);
			terrain.setGxpFlag(null);
		}

		boolean toCommit = false;
		try {
			if (null != terrain) {
				session.saveOrUpdate(terrain);
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
			if (toCommit && null != terrain) {
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
	
	public static CiEntityEditParameterOutput createTerrain(String cwid, TerrainDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() && 0 == dto.getId()) {


				List<String> messages = validateTerrain(dto, false);//validateCi , listCi

				if (messages.isEmpty()) {
					Terrain terrain = new Terrain();
					boolean isNameAndAliasNameAllowed = true;
					

					
					
					if (isNameAndAliasNameAllowed) {
						// create the ci

						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();
						
						setUpCi(terrain, dto, cwid, true);
						
						terrain.setStandortId(dto.getStandortId());
						Standort standort = StandortHbn.findById(dto.getStandortId());
						terrain.setStandort(standort);

						
						boolean toCommit = false;
						try {
							session.save(terrain);
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
									output.setTableId(AirKonstanten.TABLE_ID_TERRAIN);
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

	public static KeyValueDTO[] findTerrainsBySiteId(Long id) {
		Standort site = StandortHbn.findById(id);
		Set<Terrain> terrains = site.getTerrains();
		
//		Session session = HibernateUtil.getSession();
//		Query q = session.getNamedQuery("findTerrainsBySiteId");
//		q.setParameter("standortId", id);
//		List<Terrain> terrains = q.list();
		
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		for(Terrain terrain : terrains) {
			if (null == terrain.getDeleteTimestamp()) {
				data.add(new KeyValueDTO(terrain.getId(), terrain.getName()));
			}
		}
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}

	public static Terrain findByNameAndSiteId(String name, Long standortId) {
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findByNameAndSiteId");
		q.setParameter("name", name);
		q.setParameter("standortId", standortId);

		Terrain terrain = (Terrain)q.uniqueResult();
		
		return terrain;
	}
	
	private static List<String> validateTerrain(TerrainDTO dto, boolean isUpdate) {
		Terrain terrain = findByNameAndSiteId(dto.getName(), dto.getStandortId());
		
		boolean alreadyExists = isUpdate ? terrain != null && terrain.getId().longValue() != dto.getId().longValue() : terrain != null;
		
		List<String> messages = validateCi(dto);//new ArrayList<String>();
		if(alreadyExists) {
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();
			
//			Building building = buildings.get(0);
//			if(building.getDeleteTimestamp() == null)
				messages.add(errorCodeManager.getErrorMessage("6000", null));
//			else
//				messages.add(errorCodeManager.getErrorMessage("6001", null));
		}
		
		return messages;
	}

	
	public static void getTerrain(TerrainDTO dto, Terrain terrain) {
		dto.setTableId(AirKonstanten.TABLE_ID_TERRAIN);
		BaseHbn.getCi((CiBaseDTO) dto, (CiBase) terrain);

		dto.setStandortId(terrain.getStandortId());

	}

	
	public static CiEntityEditParameterOutput copyTerrain(String cwid, Long terrainIdSource, Long terrainIdTarget, String ciNameTarget) {
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
					
					Terrain terrainSource = (Terrain) session.get(Terrain.class, terrainIdSource);
					Terrain terrainTarget = null;
					if (null == terrainIdTarget) {
						// Komplette Neuanlage des Datensatzes mit Insert/Update-Feldern
						
						terrainTarget = new Terrain();
						// terrain - insert values
						terrainTarget.setInsertUser(cwid);
						terrainTarget.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						terrainTarget.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// terrain - update values
						terrainTarget.setUpdateUser(terrainTarget.getInsertUser());
						terrainTarget.setUpdateQuelle(terrainTarget.getInsertQuelle());
						terrainTarget.setUpdateTimestamp(terrainTarget.getInsertTimestamp());
						
						terrainTarget.setTerrainName(ciNameTarget);
						// terrainTarget.setAlias(ciAliasTarget);
						// 
						terrainTarget.setCiOwner(cwid.toUpperCase());
						terrainTarget.setCiOwnerDelegate(terrainSource.getCiOwnerDelegate());
						terrainTarget.setTemplate(terrainSource.getTemplate());
						
						terrainTarget.setRelevanceITSEC(terrainSource.getRelevanceITSEC());
						terrainTarget.setRelevanceICS(terrainSource.getRelevanceICS());

					}
					else {
						// Reaktivierung / Übernahme des bestehenden Datensatzes
						terrainTarget = (Terrain) session.get(Terrain.class, terrainIdTarget);
						// room found - change values
						output.setCiId(terrainIdTarget);
						
						terrainTarget.setUpdateUser(cwid);
						terrainTarget.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						terrainTarget.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
					}

					if (null == terrainSource) {
						// room was not found in database
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the terrain id "	+ terrainIdSource + " was not found in database" });
					} else if (null != terrainTarget.getDeleteTimestamp()) {
						// room is deleted
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { "the terrain id "	+ terrainIdTarget + " is deleted" });
					} else {

						terrainTarget.setStandortId(terrainSource.getStandortId());
						


						// ==============================
						terrainTarget.setItSecSbAvailability(terrainSource.getItSecSbAvailability());
						terrainTarget.setItSecSbAvailabilityTxt(terrainSource.getItSecSbAvailabilityTxt());
						
						// der kopierende User wird Responsible
						terrainTarget.setCiOwner(cwid);
						terrainTarget.setCiOwnerDelegate(terrainSource.getCiOwnerDelegate());
						
						// ==========
						// compliance
						// ==========
						
						// IT SET only view!
						terrainTarget.setItset(terrainSource.getItset());
						terrainTarget.setTemplate(terrainSource.getTemplate());
						terrainTarget.setItsecGroupId(null);
						terrainTarget.setRefId(null);
						
					}

					boolean toCommit = false;
					try {
						if (null == validationMessage) {
							if (null != terrainTarget && null == terrainTarget.getDeleteTimestamp()) {
								session.saveOrUpdate(terrainTarget);
								session.flush();
								
								output.setCiId(terrainTarget.getId());
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
						if (toCommit && null != terrainTarget) {
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

}
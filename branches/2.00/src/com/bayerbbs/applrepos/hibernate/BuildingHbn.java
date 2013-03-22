package com.bayerbbs.applrepos.hibernate;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.service.CiDetailParameterInput;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.KeyValueOutput;

public class BuildingHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(BuildingHbn.class);
	
	public static Building findById(Long id) {
		return findById(Building.class, id);
	}
	public static BuildingArea findBuildingAreaById(Long id) {
		return findById(BuildingArea.class, id);
	}
	
	
	public static CiItemsResultDTO findBuildingsBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("gebaeude_id", "gebaeude_name", "alias", "Bulding", "gebaeude", AirKonstanten.TABLE_ID_BUILDING);
		return findLocationCisBy(input, metaData);
	}
	public static CiItemsResultDTO findBuildingAreasBy(CiSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("area_id", "area_name", null, "Bulding Area", "building_area", AirKonstanten.TABLE_ID_BUILDING_AREA);
		return findLocationCisBy(input, metaData);
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.GEBAEUDE_TYPE_LOCATION, ciId);
	}
	public static CiLokationsKette findLokationsKetteByAreaId(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.BUILDING_AREA_TYPE_LOCATION, ciId);
	}
	
	public static CiEntityEditParameterOutput createBuilding(String cwid, BuildingDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() && 0 == dto.getId()) {

				// check der InputWerte
				List<String> messages = validateCi(dto);

				if (messages.isEmpty()) {
					Building building = new Building();
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
									Building buildingDeleted = (Building)session.get(Building.class, listCi.get(0).getId());
									
									// reactivate
									reactivateBuilding(cwid, dto, buildingDeleted);
									// save the data
									dto.setId(buildingDeleted.getId());
									return saveBuilding(cwid, dto);

								} else {
									output.setMessages(new String[] {"Building Name '" + listCi.get(0).getName() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
								}
							}
							else {
								output.setMessages(new String[] {"Building Name '" + listCi.get(0).getName() + "' already exists."});
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
								output.setMessages(new String[] {"Building Alias '" + listCI.get(0).getAlias() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
							}
							else {
								output.setMessages(new String[] {"Building Alias '" + listCI.get(0).getAlias() + "' already exists."});
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
						building.setInsertUser(cwid);
						building.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						building.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// ci - update values
						building.setUpdateUser(building.getInsertUser());
						building.setUpdateQuelle(building.getInsertQuelle());
						building.setUpdateTimestamp(building.getInsertTimestamp());

						// ci - attributes
						building.setBuildingName(dto.getName());
						building.setAlias(dto.getAlias());
						
						if (null != dto.getCiOwnerHidden()) {
							building.setCiOwner(dto.getCiOwnerHidden());
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							building.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
						}

						
						boolean toCommit = false;
						try {
							session.save(building);
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
	
	public static CiEntityEditParameterOutput createBuildingArea(String cwid, BuildingAreaDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() && 0 == dto.getId()) {

				// check der InputWerte
				List<String> messages = validateCi(dto);

				if (messages.isEmpty()) {
					BuildingArea buildingArea = new BuildingArea();
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
									BuildingArea buildingAreaDeleted = (BuildingArea)session.get(BuildingArea.class, listCi.get(0).getId());
									
									// reactivate
									reactivateBuildingArea(cwid, dto, buildingAreaDeleted);
									// save the data
									dto.setId(buildingAreaDeleted.getId());
									return saveBuildingArea(cwid, dto);

								} else {
									output.setMessages(new String[] {"Building Name '" + listCi.get(0).getName() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
								}
							}
							else {
								output.setMessages(new String[] {"Building Name '" + listCi.get(0).getName() + "' already exists."});
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
								output.setMessages(new String[] {"Building Alias '" + listCI.get(0).getAlias() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
							}
							else {
								output.setMessages(new String[] {"Building Alias '" + listCI.get(0).getAlias() + "' already exists."});
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
						buildingArea.setInsertUser(cwid);
						buildingArea.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						buildingArea.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// ci - update values
						buildingArea.setUpdateUser(buildingArea.getInsertUser());
						buildingArea.setUpdateQuelle(buildingArea.getInsertQuelle());
						buildingArea.setUpdateTimestamp(buildingArea.getInsertTimestamp());

						// ci - attributes
						buildingArea.setName(dto.getName());
						
						if (null != dto.getCiOwnerHidden()) {
							buildingArea.setCiOwner(dto.getCiOwnerHidden());
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							buildingArea.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
						}

						
						boolean toCommit = false;
						try {
							session.save(buildingArea);
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
	
	
	
	public static CiEntityEditParameterOutput saveBuilding(String cwid,	BuildingDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
				List<String> messages = validateCi(dto);

				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Building building = (Building) session.get(Building.class, id);

					if (null == building) {
						// building was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != building.getDeleteTimestamp()) {
						// building is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {
						// building found - change values
						
						// validate template
//						if (null != building.getTemplate() && -1 == building.getTemplate().longValue()) {
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
						

						building.setUpdateUser(cwid);
						building.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						building.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
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
//							building.setBuildingName(dto.getName());
//						}
						if (null != dto.getAlias()) {
							building.setAlias(dto.getAlias());
						}

						

						
						// ================
						// Owner / Delegate
						// ================
						if (null != dto.getCiOwnerHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerHidden())) {
								building.setCiOwner(null);
							}
							else {
								building.setCiOwner(dto.getCiOwnerHidden());
							}
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerDelegateHidden())) {
								building.setCiOwnerDelegate(null);
							}
							else {
								building.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
							}
						}
						
//						building.setSlaId(dto.getSlaId());
//						building.setServiceContractId(dto.getServiceContractId());
						if (null != dto.getSlaId()) {
							if (-1 == dto.getSlaId()) {
								building.setSlaId(null);
							}
							else {
								building.setSlaId(dto.getSlaId());
							}
						}
						if (null != dto.getServiceContractId() || null != dto.getSlaId()) {
							// wenn SLA gesetzt ist, und ServiceContract nicht, dann muss der Service Contract gelöscht werden
							building.setServiceContractId(dto.getServiceContractId());
						}


						
//						Long businessEssentialIdOld = building.getBusinessEssentialId();
//						if (hasBusinessEssentialChanged) {
//							sendBusinessEssentialChangedMail(building, dto, businessEssentialIdOld);
//						}
						
						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								building.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								building.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							building.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
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
							building.setTemplate(dto.getTemplate());
//							}
						}
						
						if (null != dto.getItsecGroupId() && 0 != dto.getItsecGroupId()) {
							if (-1 == dto.getItsecGroupId()) {
								building.setItsecGroupId(null);
							}
							else {
								building.setItsecGroupId(dto.getItsecGroupId());
							}
						}
						
						if (null != dto.getRefId()) {
							if (-1 == dto.getRefId()) {
								building.setRefId(null);
							}
							else {
								building.setRefId(dto.getRefId());
							}
						}
						
//						if (null != dto.getRelevanceICS()) {
//							building.setRelevanceICS(dto.getRelevanceICS());
//						}
//						if (null != dto.getRelevanzItsec()) {//getRelevanceITSEC
//							building.setRelevanceITSEC(dto.getRelevanzItsec());//getRelevanceITSEC
//						}
						
//						if (null != dto.getRelevanceICS()) {
//							building.setRelevanceICS(dto.getRelevanceGR1920());
//						}
//						if (null != dto.getRelevanzItsec()) {
//							building.setRelevanceITSEC(dto.getRelevanceGR1435());
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
						
						building.setRelevanceITSEC(dto.getRelevanzItsec());
						building.setRelevanceICS(dto.getRelevanceICS());
						

						if (null == dto.getGxpFlag()) {
							//	we don't know, let the current value 
						}
						else {
							if (EMPTY.equals(dto.getGxpFlag())) {
								building.setGxpFlag(null);
							}
							else {
								building.setGxpFlag(dto.getGxpFlag());
							}
						}

						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								building.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								building.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							building.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						
						
//						if (null != dto.getClassInformationId()) {
//							if (-1 == dto.getClassInformationId()) {
//								building.setClassInformationId(null);
//							} else {
//								building.setClassInformationId(dto.getClassInformationId());
//							}
//						}
//						if (null != dto.getClassInformationExplanation()) {
//							building.setClassInformationExplanation(dto.getClassInformationExplanation());
//						}
					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != building && null == building.getDeleteTimestamp()) {
								session.saveOrUpdate(building);
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
						if (toCommit && null != building) {
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
	

	public static CiEntityEditParameterOutput saveBuildingArea(String cwid,	BuildingAreaDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
				List<String> messages = validateCi(dto);

				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					BuildingArea buildingArea = (BuildingArea) session.get(BuildingArea.class, id);

					if (null == buildingArea) {
						// building was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != buildingArea.getDeleteTimestamp()) {
						// building is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {
						// building found - change values
						
						// validate template
//						if (null != building.getTemplate() && -1 == building.getTemplate().longValue()) {
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
						

						buildingArea.setUpdateUser(cwid);
						buildingArea.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						buildingArea.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
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
//							building.setBuildingName(dto.getName());
//						}
						
						if (null != dto.getBuildingId()) {
							//ORA-20000: Building area 1157 cannot be moved to another building. Set parameter CHECK_LOCATION_INTEGRITY to N to disable this check.
							//ORA-06512: at "TBADM.TRG_088_BIU", line 210
							//ORA-04088: error during execution of trigger 'TBADM.TRG_088_BIU'
							Building building = findById(dto.getBuildingId());
							buildingArea.setBuilding(building);
							buildingArea.setBuildingId(dto.getBuildingId());
						}
						
						// ================
						// Owner / Delegate
						// ================
						if (null != dto.getCiOwnerHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerHidden())) {
								buildingArea.setCiOwner(null);
							}
							else {
								buildingArea.setCiOwner(dto.getCiOwnerHidden());
							}
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerDelegateHidden())) {
								buildingArea.setCiOwnerDelegate(null);
							}
							else {
								buildingArea.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
							}
						}
						
//						buildingArea.setSlaId(dto.getSlaId());
//						buildingArea.setServiceContractId(dto.getServiceContractId());
						
						if (null != dto.getSlaId()) {
							if (-1 == dto.getSlaId()) {
								buildingArea.setSlaId(null);
							}
							else {
								buildingArea.setSlaId(dto.getSlaId());
							}
						}
						if (null != dto.getServiceContractId() || null != dto.getSlaId()) {
							// wenn SLA gesetzt ist, und ServiceContract nicht, dann muss der Service Contract gelöscht werden
							buildingArea.setServiceContractId(dto.getServiceContractId());
						}
						


						
//						Long businessEssentialIdOld = building.getBusinessEssentialId();
//						if (hasBusinessEssentialChanged) {
//							sendBusinessEssentialChangedMail(building, dto, businessEssentialIdOld);
//						}
						
						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								buildingArea.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								buildingArea.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							buildingArea.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
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
							buildingArea.setTemplate(dto.getTemplate());
//							}
						}
						
						if (null != dto.getItsecGroupId() && 0 != dto.getItsecGroupId()) {
							if (-1 == dto.getItsecGroupId()) {
								buildingArea.setItsecGroupId(null);
							}
							else {
								buildingArea.setItsecGroupId(dto.getItsecGroupId());
							}
						}
						
						if (null != dto.getRefId()) {
							if (-1 == dto.getRefId()) {
								buildingArea.setRefId(null);
							}
							else {
								buildingArea.setRefId(dto.getRefId());
							}
						}
						
//						if (null != dto.getRelevanceICS()) {
//							building.setRelevanceICS(dto.getRelevanceICS());
//						}
//						if (null != dto.getRelevanzItsec()) {//getRelevanceITSEC
//							building.setRelevanceITSEC(dto.getRelevanzItsec());//getRelevanceITSEC
//						}
						
//						if (null != dto.getRelevanceICS()) {
//							building.setRelevanceICS(dto.getRelevanceGR1920());
//						}
//						if (null != dto.getRelevanzItsec()) {
//							building.setRelevanceITSEC(dto.getRelevanceGR1435());
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
						
						buildingArea.setRelevanceITSEC(dto.getRelevanzItsec());
						buildingArea.setRelevanceICS(dto.getRelevanceICS());
						

						if (null == dto.getGxpFlag()) {
							//	we don't know, let the current value 
						}
						else {
							if (EMPTY.equals(dto.getGxpFlag())) {
								buildingArea.setGxpFlag(null);
							}
							else {
								buildingArea.setGxpFlag(dto.getGxpFlag());
							}
						}

						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								buildingArea.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								buildingArea.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							buildingArea.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						
						
//						if (null != dto.getClassInformationId()) {
//							if (-1 == dto.getClassInformationId()) {
//								building.setClassInformationId(null);
//							} else {
//								building.setClassInformationId(dto.getClassInformationId());
//							}
//						}
//						if (null != dto.getClassInformationExplanation()) {
//							building.setClassInformationExplanation(dto.getClassInformationExplanation());
//						}
					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != buildingArea && null == buildingArea.getDeleteTimestamp()) {
								session.saveOrUpdate(buildingArea);
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
						if (toCommit && null != buildingArea) {
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
	 * reactivates an marked as deleted building. Clears all data attributes !!!
	 * @param cwid
	 * @param dto
	 * @param application
	 * @return
	 */
	public static CiEntityEditParameterOutput reactivateBuilding(String cwid, BuildingDTO dto, Building building) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == building) {
			// application was not found in database
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the building was not found in database" });
		} else {
			Timestamp tsNow = ApplReposTS.getCurrentTimestamp();
			
			// application found - change values
			building.setUpdateUser(cwid);
			building.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			building.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			building.setInsertUser(cwid);
			building.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			building.setInsertTimestamp(tsNow);
			
			// reactivate DELETE-attributes
			building.setDeleteTimestamp(null);
			building.setDeleteQuelle(null);
			building.setDeleteUser(null);


			building.setBuildingName(null);
			building.setAlias(null);


			building.setCiOwner(null);
			building.setCiOwnerDelegate(null);
			
			
			building.setItset(null);
			building.setTemplate(null);
			building.setItsecGroupId(null);
			building.setRefId(null);
			
			building.setRelevanceICS(null);
			building.setRelevanceITSEC(null);
			building.setGxpFlag(null);
		}

		boolean toCommit = false;
		try {
			if (null != building) {
				session.saveOrUpdate(building);
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
			if (toCommit && null != building) {
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
	
	/**
	 * reactivates an marked as deleted building. Clears all data attributes !!!
	 * @param cwid
	 * @param dto
	 * @param application
	 * @return
	 */
	public static CiEntityEditParameterOutput reactivateBuildingArea(String cwid, BuildingAreaDTO dto, BuildingArea buildingArea) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == buildingArea) {
			// application was not found in database
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the building was not found in database" });
		} else {
			Timestamp tsNow = ApplReposTS.getCurrentTimestamp();
			
			// application found - change values
			buildingArea.setUpdateUser(cwid);
			buildingArea.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			buildingArea.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			buildingArea.setInsertUser(cwid);
			buildingArea.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			buildingArea.setInsertTimestamp(tsNow);
			
			// reactivate DELETE-attributes
			buildingArea.setDeleteTimestamp(null);
			buildingArea.setDeleteQuelle(null);
			buildingArea.setDeleteUser(null);


			buildingArea.setName(null);


			buildingArea.setCiOwner(null);
			buildingArea.setCiOwnerDelegate(null);
			
			
			buildingArea.setItset(null);
			buildingArea.setTemplate(null);
			buildingArea.setItsecGroupId(null);
			buildingArea.setRefId(null);
			
			buildingArea.setRelevanceICS(null);
			buildingArea.setRelevanceITSEC(null);
			buildingArea.setGxpFlag(null);
		}

		boolean toCommit = false;
		try {
			if (null != buildingArea) {
				session.saveOrUpdate(buildingArea);
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
			if (toCommit && null != buildingArea) {
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
	
	public static CiEntityEditParameterOutput deleteBuilding(String cwid, BuildingDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId()	&& 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				Building building = (Building) session.get(Building.class, id);
				
				if (null == building) {
					// application was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the building id " + id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == building.getDeleteTimestamp()) {
					building.setDeleteUser(cwid);
					building.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					building.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(building);
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
					output.setMessages(new String[] { "the building is already deleted" });
				}
			} else {
				// application id is missing
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the building id is missing or invalid" });
			}
		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}
	
	public static CiEntityEditParameterOutput deleteBuildingArea(String cwid, BuildingAreaDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId()	&& 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				BuildingArea buildingArea = (BuildingArea) session.get(BuildingArea.class, id);
				
				if (null == buildingArea) {
					// application was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the building id " + id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == buildingArea.getDeleteTimestamp()) {
					buildingArea.setDeleteUser(cwid);
					buildingArea.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					buildingArea.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(buildingArea);
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
					output.setMessages(new String[] { "the building is already deleted" });
				}
			} else {
				// application id is missing
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the building id is missing or invalid" });
			}
		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}
	
	public static KeyValueOutput getBuildingsByBuildingArea(CiDetailParameterInput detailInput) {
		KeyValueOutput output = new KeyValueOutput();
		List<KeyValueDTO> buildingDataList = new ArrayList<KeyValueDTO>();
		
		BuildingArea buildingArea = BuildingHbn.findById(BuildingArea.class, detailInput.getCiId());//findBuildingAreaById(detailInput.getCiId());
		Terrain terrain = buildingArea.getBuilding().getTerrain();
		Set<Building> buildings = terrain.getBuildings();
		
		if(buildings != null && buildings.size() > 0)
			for(Building building : buildings)
				buildingDataList.add(new KeyValueDTO(building.getId(), building.getName()));
		
		Collections.sort(buildingDataList);
		output.setKeyValueDTO(buildingDataList.toArray(new KeyValueDTO[0]));
		
		return output;
	}
	
	public static KeyValueDTO[] findBuildingsByTerrainId(Long id) {
		Terrain terrain = TerrainHbn.findById(id);
		Set<Building> buildings = terrain.getBuildings();
		
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		for(Building building : buildings)
			data.add(new KeyValueDTO(building.getId(), building.getName()));
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}
	
	public static KeyValueDTO[] findBuildingAreasByBuildingId(Long id) {
		Building building = BuildingHbn.findById(id);
		Set<BuildingArea> buildingAreas = building.getBuildingAreas();
		
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		for(BuildingArea buildingArea : buildingAreas)
			data.add(new KeyValueDTO(buildingArea.getId(), buildingArea.getName()));
		
		Collections.sort(data);
		
		return data.toArray(new KeyValueDTO[0]);
	}
}
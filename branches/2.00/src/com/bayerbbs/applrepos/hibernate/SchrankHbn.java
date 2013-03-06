package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Schrank;
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
		CiMetaData metaData = new CiMetaData("schrank_id", "schrank_name", null, "Position", "schrank", AirKonstanten.TABLE_ID_POSITION);
		return findLocationCisBy(input, metaData);
	}

	public static CiEntityEditParameterOutput saveSchrank(String cwid, SchrankDTO dto) {
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
					Schrank schrank = (Schrank)session.get(Schrank.class, id);
	
					if (null == schrank) {
						// schrank was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != schrank.getDeleteTimestamp()) {
						// schrank is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {
						// schrank found - change values
						
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
						
	
						schrank.setUpdateUser(cwid);
						schrank.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						schrank.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
						// RFC8344 change Insert-Quelle? // RFC 8532
	//					if (ApplreposConstants.INSERT_QUELLE_ANT.equals(application.getInsertQuelle()) ||
	//						ApplreposConstants.INSERT_QUELLE_RFC.equals(application.getInsertQuelle())  ||
	//						ApplreposConstants.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())) {
	//						application.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
	//					}
	

	//					if (null != dto.getName()) {
	//						schrank.setRoomName(dto.getName());
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
						
						schrank.setSlaId(dto.getSlaId());
						schrank.setServiceContractId(dto.getServiceContractId());
						schrank.setSeverityLevelId(dto.getSeverityLevelId());
	
						boolean hasBusinessEssentialChanged = false;
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
						
	//					Long businessEssentialIdOld = schrank.getBusinessEssentialId();
	//					if (hasBusinessEssentialChanged) {
	//						sendBusinessEssentialChangedMail(schrank, dto, businessEssentialIdOld);
	//					}
						
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
	
	public static CiEntityEditParameterOutput createSchrank(String cwid, SchrankDTO dto, boolean b) {

		return null;
	}


	public static CiEntityEditParameterOutput deleteSchrank(String cwid, SchrankDTO dto) {

		return null;
	}


}
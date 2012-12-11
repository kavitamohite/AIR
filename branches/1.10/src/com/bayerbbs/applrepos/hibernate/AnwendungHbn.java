package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;

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
import com.bayerbbs.applrepos.dto.ApplicationCat2DTO;
import com.bayerbbs.applrepos.dto.ApplicationContact;
import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.ConnectionsViewDataDTO;
import com.bayerbbs.applrepos.dto.GroupsDTO;
import com.bayerbbs.applrepos.dto.HistoryViewDataDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.ReferenzDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.service.ApplicationEditParameterOutput;

/**
 * @author evafl
 *
 */
/**
 * @author evafl
 *
 */
public class AnwendungHbn {

//	private static final String PARAMETER_QUERYMODE_BEGINS_WITH = "BEGINS_WITH";
//	private static final String PARAMETER_QUERYMODE_CONTAINS = "CONTAINS";
//	private static final String PARAMETER_QUERYMODE_EMPTYSTRING = "";
	
	private static final String Y = "Y";
	private static final String COMMA = ",";
	
	private static final String NOT_EQUAL = "<>";
	private static final String EQUAL = "=";
	
	private static final String NOT_LIKE = "not like";
	private static final String LIKE = "like";
	
	private static final String EMPTY = "";
	

	private static final Log log = LogFactory.getLog(AnwendungHbn.class);
	
	/**
	 * only for testing
	 */
	public static void listAnwendungenHbn() {
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Application> honeys = session.createQuery(
					"select h from Anwendung as h").list();
			for (Iterator<Application> iter = honeys.iterator(); iter.hasNext();) {
				Application element = (Application) iter.next();
				// logger.debug("{}", element);
				// System.out.println(element);
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
	}

	public static Application findApplicationById(Long applicationId) {
		Application application = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			List<Application> list = session.createQuery(
					"select h from Application as h where h.applicationId= "
							+ applicationId).list();

			if (null != list && 0 < list.size()) {
				application = (Application) list.get(0);
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
		return application;
	}


	public static List<Application> findDeletedApplicationByName(String applicationName) {
		List<Application> listApplications = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			listApplications = session
					.createQuery(
							"select h from Application as h where h.deleteTimestamp is not null and upper(h.applicationName)= '"
									+ applicationName.toUpperCase() + "'").list();
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
		return listApplications;
	}


	public static List<Application> findApplicationByName(String applicationName) {
		List<Application> listApplications = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			listApplications = session
					.createQuery(
							"select h from Application as h where h.deleteTimestamp is null and upper(h.applicationName)= '"
									+ applicationName.toUpperCase() + "'").list();
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
		return listApplications;
	}


	public static ApplicationEditParameterOutput saveAnwendung(String cwid,	ApplicationDTO dto) {
		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			if (null != dto.getApplicationId()
					|| 0 < dto.getApplicationId().longValue()) {
				Long id = new Long(dto.getApplicationId());

				// check der InputWerte
				List<String> messages = AnwendungHbn.validateApplication(dto);

				if (messages.isEmpty()) {

					Session session = HibernateUtil.getSession();
					Transaction tx = null;
					tx = session.beginTransaction();
					Application application = (Application) session.get(
							Application.class, id);

					if (null == application) {
						// application was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != application.getDeleteTimestamp()) {
						// application is deleted
						output.setErrorMessage("1001", EMPTY+id);
						
// TODO reactivate RFC 8279
//						reactivateApplication(cwid, dto, application);
//						application = (Application)session.get(Application.class, id);
					} else {
						// application found - change values
						
						// validate template
						if (null != application.getTemplate() && -1 == application.getTemplate().longValue()) {
							if (null != dto.getTemplate()) {
								if (0 == dto.getTemplate().longValue()) {
									// user wants to change to non template
									// check if there are referencing values
									if (!"0".equals(ApplReposHbn.getCountReferencingTemplates(id))) {
										output.setErrorMessage("1002");
									}
								}
							}
						}
						

						// TODO check if allowed
						application.setUpdateUser(cwid);
						application.setUpdateQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
						application.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
						// RFC8344 change Insert-Quelle? // RFC 8532
						if (ApplreposConstants.INSERT_QUELLE_ANT.equals(application.getInsertQuelle()) ||
							ApplreposConstants.INSERT_QUELLE_RFC.equals(application.getInsertQuelle())  ||
							ApplreposConstants.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())) {
							application.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
						}

						// ======
						// Basics
						// ======

						if (null != dto.getApplicationName()) {
							application
								.setApplicationName(dto.getApplicationName());
						}
						if (null != dto.getApplicationAlias()) {
							application.setApplicationAlias(dto
									.getApplicationAlias());
						}
						if (null != dto.getVersion()) {
							application.setVersion(dto.getVersion());
						}
						if (null != dto
								.getApplicationCat2Id()) {
							if (-1 == dto.getApplicationCat2Id()) {
								application.setApplicationCat2Id(null);
							}
							else {
								application.setApplicationCat2Id(dto
								.getApplicationCat2Id());
							}
						}
						// primary function only view

						if (null != dto.getLifecycleStatusId()) {
							if (-1 == dto.getLifecycleStatusId()) {
								application.setLifecycleStatusId(null);
							}
							else {
								application.setLifecycleStatusId(dto.getLifecycleStatusId());
							}
						}
						
						
						if (null != dto
								.getOperationalStatusId()) {
							if (-1 == dto.getOperationalStatusId()) {
								application.setOperationalStatusId(null);
							}
							else {
								application.setOperationalStatusId(dto
								.getOperationalStatusId());
							}
						}
						if (null != dto.getComments()) {
							application.setComments(dto.getComments());
						}
						// TODO business category
						// -------
						
						
						// ==========
						// Agreements
						// ==========
						if (null != dto.getSlaId()) {
							if (-1 == dto.getSlaId()) {
								application.setSlaId(null);
							}
							else {
								application.setSlaId(dto.getSlaId());
							}
						}
						if (null != dto.getServiceContractId() || null != dto.getSlaId()) {
							// wenn SLA gesetzt ist, und ServiceContract nicht, dann muss der Service Contract gelöscht werden
							application.setServiceContractId(dto.getServiceContractId());
						}

						if (null != dto.getPriorityLevelId()) {
							if (-1 == dto.getPriorityLevelId()) {
								application.setPriorityLevelId(null);
							}
							else {
								application.setPriorityLevelId(dto.getPriorityLevelId());
							}
						}
						if (null != dto.getSeverityLevelId()) {
							if (-1 == dto.getSeverityLevelId()) {
								application.setSeverityLevelId(null);
							}
							else {
								application.setSeverityLevelId(dto.getSeverityLevelId());
							}
						}

						boolean hasBusinessEssentialChanged = false;
						Long businessEssentialIdOld = application.getBusinessEssentialId();
						if (null == dto.getBusinessEssentialId()) {
							if (null == application.getBusinessEssentialId()) {
								// set the default value
								application
								.setBusinessEssentialId(ApplreposConstants.BUSINESS_ESSENTIAL_DEFAULT);
								hasBusinessEssentialChanged = true;
							}
						}
						else {
							if (null == application.getBusinessEssentialId() || application.getBusinessEssentialId().longValue() != dto.getBusinessEssentialId().longValue()) {
								hasBusinessEssentialChanged = true;
							}
							application.setBusinessEssentialId(dto
										.getBusinessEssentialId());
						}
						
						if (hasBusinessEssentialChanged) {
							sendBusinessEssentialChangedMail(application, dto, businessEssentialIdOld);
						}
						// ----------
						
						// TODO edit more Attributes

						// TODO welche?
						// TODO check ob alle Variablen gesetzt worden sind!
						// ==============================

						
						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								application.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								application.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}

						if (null != dto.getItSecSbAvailabilityDescription()) {
							application.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						
						if (null != dto.getClusterCode()) {
							application.setClusterCode(dto.getClusterCode());
						}
						if (null != dto.getClusterType()) {
							application.setClusterType(dto.getClusterType());
						}
						
						if (null != dto.getResponsibleHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getResponsibleHidden())) {
								application.setResponsible(null);
							}
							else {
								application.setResponsible(dto.getResponsibleHidden());
							}
						}
						if (null != dto.getSubResponsibleHidden()) {
							application.setSubResponsible(dto.getSubResponsibleHidden());
						}

						if (null != dto.getApplicationOwnerHidden()) {
							application.setApplicationOwner(dto.getApplicationOwnerHidden());
						}
						
						if (null != dto.getApplicationStewardHidden()) {
							application.setApplicationSteward(dto.getApplicationStewardHidden());
						}
						
						if (null != dto.getApplicationOwnerDelegateHidden()) {
							application.setApplicationOwnerDelegate(dto.getApplicationOwnerDelegateHidden());
						}
						
						
						// ==========
						// compliance
						// ==========
						
						// IT SET only view!
						if (null == dto.getItset()) {
							if (null == application.getItset()) {
								application.setItset(ApplreposConstants.IT_SET_DEFAULT);
							}
						}
						else {
							application.setItset(dto.getItset());
						}
						
						// Template
						if (null != dto.getTemplate()) {
//							if (-1 == dto.getTemplate()) {
//								application.setTemplate(null);
//							}
//							else {
								application.setTemplate(dto.getTemplate());
//							}
						}
						
						if (null != dto.getItsecGroupId() && 0 != dto.getItsecGroupId()) {
							if (-1 == dto.getItsecGroupId()) {
								application.setItsecGroupId(null);
							}
							else {
								application.setItsecGroupId(dto.getItsecGroupId());
							}
						}
						
						if (null != dto.getRefId()) {
							if (-1 == dto.getRefId()) {
								application.setRefId(null);
							}
							else {
								application.setRefId(dto.getRefId());
							}
						}
						
						if (null != dto.getRelevanceICS()) {
								application.setRelevanceICS(dto.getRelevanceICS());
						}

						if (null != dto.getRelevanzItsec()) {
							application.setRelevanzITSEC(dto.getRelevanzItsec());
						}

						if (null != dto.getRelevance1775()) {
							application.setRelevance1775(dto.getRelevance1775());
						}
						if (null != dto.getRelevance2008()) {
							application.setRelevance2008(dto.getRelevance2008());
						}
						
						if (null == dto.getGxpFlagId()) {
							//	we don't know, let the current value 
						}
						else {
							if (EMPTY.equals(dto.getGxpFlagId())) {
								application.setGxpFlag(null);
							}
							else {
								application.setGxpFlag(dto.getGxpFlagId());
							}
						}
						
//						if (null != dto.getRiskAnalysisYN()) {
//							application
//							.setRiskAnalysisYN(dto.getRiskAnalysisYN());
//						}
						// ----------------
						
						// ===============
						// License & Costs
						// ===============
						if (null != dto.getLicenseTypeId()) {
							if (-1 == dto.getLicenseTypeId()) {
								application.setLicenseTypeId(null);
							} else {
								application.setLicenseTypeId(dto.getLicenseTypeId());
							}
						}

						if (null != dto.getAccessingUserCount()) {
							if (-1 == dto.getAccessingUserCount()) {
								application.setAccessingUserCount(null);
							} else {
								application.setAccessingUserCount(dto.getAccessingUserCount());
							}
						}

						if (null != dto.getAccessingUserCountMeasured()) {
							if (-1 == dto.getAccessingUserCountMeasured()) {
								application.setAccessingUserCountMeasured(null);
							} else {
								application.setAccessingUserCountMeasured(dto.getAccessingUserCountMeasured());
							}
						}

						if (null != dto.getDedicated()) {
							if ("-1".equals(dto.getDedicated())) {
								application.setDedicated(null);
							} else {
								application.setDedicated(dto.getDedicated());
							}
						}
						if (null != dto.getLoadClass()) {
							if ("-1".equals(dto.getLoadClass())) {
								application.setLoadClass(null);
							} else {
								application.setLoadClass(dto.getLoadClass());
							}
						}
						
						if (null != dto
								.getCostRunAccountId()) {
							if (-1 == dto
								.getCostRunAccountId()) {
								application.setCostRunAccountId(null);
							} else {
								application.setCostRunAccountId(dto
										.getCostRunAccountId());
							}
							
						}
						if (null != dto.getCostChangeAccountId()) {
							if (-1 == dto.getCostChangeAccountId()) {
								application.setCostChangeAccountId(null);
							} else {
								application.setCostChangeAccountId(dto
										.getCostChangeAccountId());
							}
						}

						
						// ----------------
						
						if (null != dto.getCostRunPa()) {
							if (-1 == dto.getCostRunPa()) {
								application.setCostRunPa(null);
							} else {
								application.setCostRunPa(dto.getCostRunPa());
							}
							
						}
						if (null != dto.getCostChangePa()) {
							if (-1 == dto.getCostChangePa()) {
								application.setCostChangePa(null);
							}
							else {
								application.setCostChangePa(dto.getCostChangePa());
							}
						}
						if (null != dto.getCurrencyId()) {
							if (-1 == dto.getCurrencyId()) {
								application.setCurrencyId(null);
							}
							else {
								application.setCurrencyId(dto.getCurrencyId());
							}
						}
						
						if (null != dto.getCategoryBusinessId()) {
							if (-1 == dto.getCategoryBusinessId()) {
								application.setCategoryBusiness(null);
								// we have to delete the data class 
								dto.setClassDataId(new Long(-1));
							} else {
								application.setCategoryBusiness(dto.getCategoryBusinessId());
							}
						}
						
						if (null != dto.getClassDataId()) {
							if (0 != dto.getClassDataId().longValue()) {
								if (-1 == dto.getClassDataId()) {
									application.setClassDataId(null);
								} else {
									application.setClassDataId(dto.getClassDataId());
								}
							}
						}
						
						if (null != dto.getClassInformationId()) {
							if (-1 == dto.getClassInformationId()) {
								application.setClassInformationId(null);
							}
							else {
								application.setClassInformationId(dto.getClassInformationId());
							}
						}
						
						if (null != dto.getClassInformationExplanation()) {
							application.setClassInformationExplanation(dto.getClassInformationExplanation());
						}
						
						if (null != dto.getServiceModel()) {
							if (" ".equals(dto.getServiceModel())) {
								application.setServiceModel(null);
							}
							else {
								application.setServiceModel(dto.getServiceModel());
							}
						}
						
						if (null != dto.getOrganisationalScope()) {
							if ("-1".equals(dto.getOrganisationalScope())) {
								application.setOrganisationalScope(null);
							}
							else {
								application.setOrganisationalScope(dto.getOrganisationalScope());
							}
						}
						
						if (null != dto.getBarRelevance()) {
							dto.setBarRelevance(dto.getBarRelevance().toUpperCase());
							if (!"Y".equals(application.getBarRelevance())) {
								if ("Y".equals(dto.getBarRelevance()) || "N".equals(dto.getBarRelevance())) {
									application.setBarRelevance(dto.getBarRelevance());
								}
							}
						}
						
					}

					boolean toCommit = false;
					try {
						if (null == validationMessage) {
						
							if (null != application
									&& null != application.getDeleteTimestamp()) {
								session.saveOrUpdate(application);
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
						if (toCommit && null != application) {
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

	/**
	 * creates a new application
	 * 
	 * @param cwid
	 * @param dto
	 * @return
	 */
	public static ApplicationEditParameterOutput createAnwendung(String cwid, ApplicationDTO dto, Boolean forceOverride) {
		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		// TODO check validate token

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			if (null != dto.getApplicationId() && 0 == dto.getApplicationId()) {

				// check der InputWerte
				List<String> messages = AnwendungHbn.validateApplication(dto);

				if (messages.isEmpty()) {

					Application application = new Application();
					
					boolean isApplicationNameAndAliasNameAllowed = true;
					
					
					if (isApplicationNameAndAliasNameAllowed) {
						List<ApplicationDTO> listApplications = CiEntitiesHbn.findExistantCisByNameOrAlias(dto.getApplicationName(), true);
						if (null != listApplications && 0 < listApplications.size()) {
							// application name is not allowed
							isApplicationNameAndAliasNameAllowed = false;
							output.setResult(ApplreposConstants.RESULT_ERROR);
							if (null != listApplications.get(0).getDeleteQuelle()) {
								boolean override = forceOverride != null && forceOverride.booleanValue();
								
								if(override) {
									// TODO ENTWICKLUNG RFC8279
									Session session = HibernateUtil.getSession();
									Application applicationDeleted = (Application)session.get(Application.class, listApplications.get(0).getApplicationId());
									
									// reactivate application
									reactivateApplication(cwid, dto, applicationDeleted);
									// save the data
									dto.setApplicationId(applicationDeleted.getApplicationId());
									return saveAnwendung(cwid, dto);

								} else {
									output.setMessages(new String[] {"Application Name '" + listApplications.get(0).getApplicationName() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
								}
							}
							else {
								output.setMessages(new String[] {"Application Name '" + listApplications.get(0).getApplicationName() + "' already exists."});
							}
						}
					}
					
					if (isApplicationNameAndAliasNameAllowed) {
						List<ApplicationDTO> listApplications = CiEntitiesHbn.findExistantCisByNameOrAlias(dto
								.getApplicationAlias(), true);
						if (null != listApplications && 0 < listApplications.size()) {
							// application alias is not allowed
							isApplicationNameAndAliasNameAllowed = false;
							output.setResult(ApplreposConstants.RESULT_ERROR);
							if (null != listApplications.get(0).getDeleteQuelle()) {
								output.setMessages(new String[] {"Application Alias '" + listApplications.get(0).getApplicationAlias() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
							}
							else {
								output.setMessages(new String[] {"Application Alias '" + listApplications.get(0).getApplicationAlias() + "' already exists."});
							}
						}						
					}
					
					
					if (isApplicationNameAndAliasNameAllowed) {
						// create the application

						// calculates the ItSet
						Long itSet = null;
						String strItSet = ApplReposHbn.getItSetFromCwid(dto
								.getResponsible());
						if (null != strItSet) {
							itSet = Long.parseLong(strItSet);
						}
						if (null == itSet) {
							// set default itSet
							itSet = new Long(ApplreposConstants.IT_SET_DEFAULT);
						}

						if (0 == dto.getBusinessEssentialId().longValue()) {
							dto
									.setBusinessEssentialId(new Long(
											ApplreposConstants.BUSINESS_ESSENTIAL_DEFAULT));
						}

						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();

						// application - insert values
						application.setInsertUser(cwid);
						application
								.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
						application.setInsertTimestamp(ApplReposTS
								.getCurrentTimestamp());

						// application - update values
						application.setUpdateUser(application.getInsertUser());
						application.setUpdateQuelle(application
								.getInsertQuelle());
						application.setUpdateTimestamp(application
								.getInsertTimestamp());

						// application - attributes
						application
								.setApplicationName(dto.getApplicationName());
						application.setApplicationAlias(dto
								.getApplicationAlias());
						application.setComments(dto.getComments());
						application.setClusterCode(dto.getClusterCode());
						application.setClusterType(dto.getClusterType());
						application.setApplicationCat2Id(dto
								.getApplicationCat2Id());
						application.setLifecycleStatusId(dto
								.getLifecycleStatusId());
						application.setOperationalStatusId(dto
								.getOperationalStatusId());

						if (null != dto.getResponsibleHidden()) {
							application.setResponsible(dto.getResponsibleHidden());
						}
						if (null != dto.getSubResponsibleHidden()) {
							application.setSubResponsible(dto.getSubResponsibleHidden());
						}

						if (null != dto.getApplicationOwnerHidden()) {
							application.setApplicationOwner(dto.getApplicationOwnerHidden());
						}
						
						if (null != dto.getApplicationStewardHidden()) {
							application.setApplicationSteward(dto.getApplicationStewardHidden());
						}
						
						if (null != dto.getApplicationOwnerDelegateHidden()) {
							application.setApplicationOwnerDelegate(dto.getApplicationOwnerDelegateHidden());
						}
						
						application.setBusinessEssentialId(dto
								.getBusinessEssentialId());
						application.setItset(itSet);

						// TODO !!!
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
						
						if (null == dto.getRelevance1775()) {
							if ("Y".equals(dto.getRelevanceGR1775())) {
								dto.setRelevance1775(new Long(-1));
							}
							else if ("N".equals(dto.getRelevanceGR1775())) {
								dto.setRelevance1775(new Long(0));
							}
						}

						if (null == dto.getRelevance2008()) {
							if ("Y".equals(dto.getRelevanceGR2008())) {
								dto.setRelevance2008(new Long(-1));
							}
							else if ("N".equals(dto.getRelevanceGR2008())) {
								dto.setRelevance2008(new Long(0));
							}
						}
						
						// TODO
						application.setTemplate(dto.getTemplate());
						application.setRelevanzITSEC(dto.getRelevanzItsec());
						application.setRelevanceICS(dto.getRelevanceICS());
						application.setRelevance1775(dto.getRelevance1775());
						application.setRelevance2008(dto.getRelevance2008());
						application.setGxpFlag(dto.getGxpFlagId());
						application.setSlaId(dto.getSlaId());
						application.setServiceContractId(dto.getServiceContractId());
						application.setSeverityLevelId(dto.getSeverityLevelId());
						
						//--- neu seit Wizard RFC 8271 - required Attributes (Attribute aus Sub-Tabellen werden im Anschluss gespeichert.
						if (null != dto.getClassInformationId()) {
							application.setClassInformationId(dto.getClassInformationId());
						}
						if (null != dto.getItSecSbAvailabilityId()) {
							application.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
						}
						if (StringUtils.isNotNullOrEmpty(dto.getItSecSbAvailabilityDescription())) {
							application.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						if (StringUtils.isNotNullOrEmpty(dto.getOrganisationalScope())) {
							application.setOrganisationalScope(dto.getOrganisationalScope());
						}

						if (null != dto.getBarRelevance()) {
							dto.setBarRelevance(dto.getBarRelevance().toUpperCase());
							if (!"Y".equals(application.getBarRelevance())) {
								if ("Y".equals(dto.getBarRelevance()) || "N".equals(dto.getBarRelevance())) {
									application.setBarRelevance(dto.getBarRelevance());
								}
							}
						}
						
						boolean toCommit = false;
						try {
							session.save(application);
							session.flush();
							toCommit = true;
						} catch (Exception e) {
							// handle exception
							output.setResult(ApplreposConstants.RESULT_ERROR);
							output.setMessages(new String[] { e.getMessage() });
						} finally {
							String hbnMessage = HibernateUtil.close(tx,
									session, toCommit);
							if (toCommit) {
								if (null == hbnMessage) {
									output
											.setResult(ApplreposConstants.RESULT_OK);
									output.setMessages(new String[] { EMPTY });
								} else {
									output
											.setResult(ApplreposConstants.RESULT_ERROR);
									output
											.setMessages(new String[] { hbnMessage });
								}
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
				// application id not 0
				output.setResult(ApplreposConstants.RESULT_ERROR);
				output
						.setMessages(new String[] { "the application id should be 0" });
			}
		} else {
			// cwid missing
			output.setResult(ApplreposConstants.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}

	/**
	 * reactivates an marked as deleted application. Clears all data attributes !!!
	 * @param cwid
	 * @param dto
	 * @param application
	 * @return
	 */
	public static ApplicationEditParameterOutput reactivateApplication(String cwid, ApplicationDTO dto, Application application) {
		
		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == application) {
			// application was not found in database
			output.setResult(ApplreposConstants.RESULT_ERROR);
			output.setMessages(new String[] { "the application was not found in database" });
		} else {

			Timestamp tsNow = ApplReposTS
			.getCurrentTimestamp();
			
			// application found - change values
			application.setUpdateUser(cwid);
			application
					.setUpdateQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
			application.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			application.setInsertUser(cwid);
			application.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
			application.setInsertTimestamp(tsNow);
			
			// reactivate DELETE-attributes
			application.setDeleteTimestamp(null);
			application.setDeleteQuelle(null);
			application.setDeleteUser(null);

			
//			application
//					.setApplicationName(dto.getApplicationName());
//			application.setApplicationAlias(dto
//					.getApplicationAlias());
//			application.setComments(dto.getComments());
//			if (null == dto.getResponsible()) {
//				dto.setResponsible(cwid.toUpperCase());
//			}

			// calculates the ItSet
//			Long itSet = null;
//			String strItSet = ApplReposHbn.getItSetFromCwid(dto
//					.getResponsible());
//			if (null != strItSet) {
//				itSet = Long.parseLong(strItSet);
//			}
//			if (null == itSet) {
//				// set default itSet
//				itSet = new Long(ApplreposConstants.IT_SET_DEFAULT);
//			}


			// Daten setzen
			// ============
			
			// applicationId bleibt natürlich
			application.setBarApplicationId(null);	// Bayer application register id
			application.setApplicationAlias(null);
			application.setVersion(null);
			application.setApplicationCat2Id(null);
			
//			ORA-20000: The table ID of lifecycle substatus (null) does not match the destination table ID 2.
//			ORA-06512: at "TBADM.TRG_002_BIUD", line 307
//			ORA-04088: error during execution of trigger 'TBADM.TRG_002_BIUD'
//			application.setLifecycleStatusId(null);
			application.setOperationalStatusId(null);
			application.setComments(null);

			// contacts
			application.setResponsible(null);
			application.setSubResponsible(null);
			
			// agreements
			application.setSlaId(null);
			application.setPriorityLevelId(null);
			application.setServiceContractId(null);
			application.setSeverityLevelId(null);
			
//			ORA-01407: cannot update ("TBADM"."ANWENDUNG"."BUSINESS_ESSENTIAL_ID") to NULL
//			application.setBusinessEssentialId(null);

			// protection
			application.setItSecSbAvailability(null);
			application.setItSecSbAvailabilityText(null);

			// compliance
			
			// ORA-20000: In case of securing the multiple client capabilities the column itset must have a value.
			// ORA-06512: at "TBADM.TRG_002_BIUD", line 307
			// ORA-04088: error during execution of trigger 'TBADM.TRG_002_BIUD'
			// application.setItset(null);
			
//			ORA-01407: cannot update ("TBADM"."ANWENDUNG"."TEMPLATE") to NULL
//			application.setTemplate(null);
			application.setItsecGroupId(null);
			application.setRefId(null);
			
//			ORA-02290: check constraint (TBADM.CHK_002_RELEVANCE_ICS) violated
//			application.setRelevanceICS(null);

//			ORA-02290: check constraint (TBADM.CHK_002_RELEVANZ_ITSEC) violated
//			application.setRelevanzITSEC(null);

			application.setGxpFlag(null);
			
			// license & costs
			application.setLicenseTypeId(null);
			
			application.setDedicated(null);
			application.setAccessingUserCount(null);
			application.setAccessingUserCountMeasured(null);
			application.setLoadClass(null);
			application.setCostRunPa(null);
			application.setCostChangePa(null);
			application.setCurrencyId(null);
			application.setCostRunAccountId(null);
			application.setCostChangeAccountId(null);
			
			
			// unsorted
			application.setClusterCode(null);

			application.setClusterType(null);
			
			application.setApplicationOwner(cwid);
			application.setApplicationOwnerDelegate(null);
			
			application.setCategoryBusiness(null);

			
			application.setClassDataId(null);
			application.setClassInformationId(null);
			application.setClassInformationExplanation(null);
			
			application.setServiceModel(null);
			application.setOrganisationalScope(null);
			// ==============================
		}

		boolean toCommit = false;
		try {
			if (null != application) {
				session.saveOrUpdate(application);
				session.flush();
			}
			toCommit = true;
		} catch (Exception e) {
			log.error(e.getMessage());
			// handle exception
			output.setResult(ApplreposConstants.RESULT_ERROR);
			output.setMessages(new String[] { e.getMessage() });
		} finally {
			String hbnMessage = HibernateUtil.close(tx, session,
					toCommit);
			if (toCommit && null != application) {
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
	return output;
	}
	
	
	/**
	 * validates the input ApplicationDTO
	 * 
	 * @param dto
	 * @return
	 */
	private static List<String> validateApplication(ApplicationDTO dto) {
		List<String> messages = new ArrayList<String>();
		
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();

		if (StringUtils.isNullOrEmpty(dto.getApplicationName())) {
			// messages.add("application name is empty");
		}
		else {
			List<ApplicationDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getApplicationName());
			if (!listCi.isEmpty()) {
				// check if the name is unique
				if (dto.getApplicationId().longValue() != listCi.get(0).getApplicationId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1100", dto.getApplicationName()));
				}
			}
		}

		if (StringUtils.isNullOrEmpty(dto.getApplicationAlias())) {
			// messages.add("application alias is empty");
			dto.setApplicationAlias(dto.getApplicationName());
		}
		else {
			List<ApplicationDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getApplicationAlias());
			if (!listCi.isEmpty()) {
				// check if the alias is unique
				if (dto.getApplicationId().longValue() != listCi.get(0).getApplicationId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1101", dto.getApplicationAlias()));
				}
			}
		}

		if (null == dto.getTemplate()) {
			// TODO 1 TESTCODE Template
			dto.setTemplate(new Long (0)); // no template
		}

		if (null == dto.getBusinessEssentialId()) {
			// messages.add("business essential is empty");
			// TODO 1 TESTCODE getBusinessEssentialId
			dto.setBusinessEssentialId(null);
		}

		// =================
		// validate contacts
		// =================
		// responsible
		if (StringUtils.isNullOrEmpty(dto.getResponsibleHidden())) {
			// messages.add(errorCodeManager.getErrorMessage("1102"));
			// darf jetzt leer sein
		}
		else {
			List<PersonsDTO> listPersons = PersonsHbn.findPersonByCWID(dto.getResponsibleHidden());
			if (null == listPersons || listPersons.isEmpty()) {
				messages.add(errorCodeManager.getErrorMessage("1103"));
			}
			else if (1 != listPersons.size()) {
				messages.add(errorCodeManager.getErrorMessage("1104"));
			}
		}

		// application owner delegate
		if (!StringUtils.isNullOrEmpty(dto.getApplicationOwnerDelegateHidden())) {
			List<PersonsDTO> listPersons = PersonsHbn.findPersonByCWID(dto.getApplicationOwnerDelegateHidden());
			if (null == listPersons || listPersons.isEmpty()) {
				// not a valid person, maybe a group?
				GroupsDTO group = GroupHbn.findGroupByName(dto.getApplicationOwnerDelegate());
				if (null == group) {
					messages.add(errorCodeManager.getErrorMessage("1105"));
				}
				else {
					// sub responsible is a valid group
					dto.setApplicationOwnerDelegateHidden(dto.getApplicationOwnerDelegate());
				}
			}
			else if (1 != listPersons.size()) {
				messages.add(errorCodeManager.getErrorMessage("1106"));
			}
			
		}		
		// subresponsible
		if (!StringUtils.isNullOrEmpty(dto.getSubResponsibleHidden())) {
			List<PersonsDTO> listPersons = PersonsHbn.findPersonByCWID(dto.getSubResponsibleHidden());
			if (null == listPersons || listPersons.isEmpty()) {
				// not a valid person, maybe a group?
				GroupsDTO group = GroupHbn.findGroupByName(dto.getSubResponsible());
				if (null == group) {
					messages.add(errorCodeManager.getErrorMessage("1107")); // "subresponsible is not valid");
				}
				else {
					// sub responsible is a valid group
					dto.setSubResponsibleHidden(dto.getSubResponsible());
				}
			}
			else if (1 != listPersons.size()) {
				messages.add(errorCodeManager.getErrorMessage("1108")); 
			}
			
		}
		
		return messages;
	}

	/**
	 * mark an application as deleted
	 * 
	 * @param cwid
	 * @param dto
	 * @return
	 */
	public static ApplicationEditParameterOutput deleteAnwendung(String cwid,
			ApplicationDTO dto) {
		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		// TODO check validate token

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			if (null != dto.getApplicationId()
					&& 0 < dto.getApplicationId().longValue()) {
				Long id = new Long(dto.getApplicationId());

				// TODO check der InputWerte
				Session session = HibernateUtil.getSession();
				Transaction tx = null;
				tx = session.beginTransaction();
				Application application = (Application) session.get(
						Application.class, id);
				if (null == application) {
					// application was not found in database
					output.setResult(ApplreposConstants.RESULT_ERROR);
					output.setMessages(new String[] { "the application id "
							+ id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == application.getDeleteTimestamp()) {
					application.setDeleteUser(cwid);
					application
							.setDeleteQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
					application.setDeleteTimestamp(ApplReposTS
							.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(application);
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
							.setMessages(new String[] { "the application is already deleted" });
				}

			} else {
				// application id is missing
				output.setResult(ApplreposConstants.RESULT_ERROR);
				output
						.setMessages(new String[] { "the application id is missing or invalid" });
			}

		} else {
			// cwid missing
			output.setResult(ApplreposConstants.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}

	public static ApplicationDTO getApplicationDetail(Long applicationId) {

		ApplicationDTO applicationDTO = null;

		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select ");
		sql.append("  anw.anwendung_id");
		sql.append(", anw.BAR_APPLICATION_ID");
		sql.append(", anw.BAR_RELEVANCE_Y_N");
		sql.append(", anw.anwendung_name");
		sql.append(", anw.anwendung_kat2_id");
		sql.append(", kat2.anwendung_kat2_txt");
		sql.append(", kat2.anwendung_kat1_id");
		sql.append(", kat1.anwendung_kat1_en");
		sql.append(", anw.RELEVANZ_ITSEC");
		sql.append(", anw.TEMPLATE");
		sql.append(", anw.itsec_gruppe_id");
		sql.append(", anw.ref_id");
		sql.append(", anwref.anwendung_name as REF_TXT");
		
		sql.append(", itsgrp.itsec_gruppe");
		
		sql.append(", anw.ITSEC_SB_INTEG_ID, anw.ITSEC_SB_INTEG_TXT");
		sql.append(", anw.ITSEC_SB_VERFG_ID, anw.ITSEC_SB_VERFG_TXT");
		sql.append(", anw.ITSEC_SB_VERTR_ID, anw.ITSEC_SB_VERTR_TXT");
		
		sql.append(", anw.einsatz_status_id");
		sql.append(", einsstat.einsatz_status_en");
		sql.append("		  , anw.lc_status_id");
		sql.append("		  , lcstat.lc_status_en || ' :: ' || lcsubstat.lc_sub_stat_staten as LIFECYCLE_STATUS");
		sql.append("		  , anw.user_create");
		sql.append("		  , anw.cluster_code");
		sql.append("		  , anw.cluster_type");
		sql.append("		  , anw.del_timestamp");
		sql.append("		  , anw.del_user");
		sql.append("		  , anw.del_quelle");
		sql.append("		  , anw.insert_timestamp");
		sql.append("		  , anw.insert_user");
		sql.append("		  , anw.insert_quelle");
		sql.append("		  , anw.update_timestamp");
		sql.append("		  , anw.update_user");
		sql.append("		  , anw.update_quelle");
		sql.append("		  , anw.cwid_verantw_betr");
		sql.append("		  , anw.sub_responsible");
		sql.append("		  , anw.application_owner");
		sql.append("		  , anw.application_steward");
		sql.append("		  , anw.application_owner_delegate");
		sql.append("		  , anw.itset");
		sql.append("		  , itsverb.it_verbund_name");
		sql.append("		  , anw.relevance_ics");
		sql.append("		  , anw.relevance_1775");
		sql.append("		  , anw.relevance_2008");
		sql.append("		  , anw.gxp_flag");
		sql.append("		  , anw.sla_id");
		sql.append("		  , sla.sla_name");
		sql.append("		  , anw.service_contract_id");
		sql.append("		  , servcontr.service_contract");
		sql.append("		  , anw.root_dir");
		sql.append("		  , anw.data_dir");
		sql.append("		  , anw.services");
		sql.append("		  , anw.machine_users");
		sql.append("		  , anw.comments");
		sql.append("		  , anw.alias");
		sql.append("		  , anw.priority_level_id");
		sql.append("		  , priolev.priority_level");
		sql.append("		  , anw.severity_level_id");
		sql.append("		  , sevlev.severity_level");
		sql.append("		  , anw.location_path");
		sql.append("		  , anw.business_essential_id");
		sql.append("		  , busess.severity_level as BUSINESS_ESSENTIAL");
		sql.append("		  , anw.risk_analysis_yn");
		sql.append("		  , anw.license_type_id");
		sql.append("          , lic.LICENSE_TYPE_NAME as LICENSE_TYPE_TXT");
		sql.append("		  , anw.dedicated_Y_N");
		sql.append("		  , anw.accessing_user_count");
		sql.append("		  , anw.accessing_user_count_measured");
		sql.append("		  , anw.load_class");
		sql.append("		  , anw.service_model");
		sql.append("		  , anw.ORG_SCOPE");
		sql.append("		  , anw.version");
		sql.append("		  , anw.cost_run_pa");
		sql.append("		  , anw.cost_change_pa");
		sql.append("		  , anw.currency_id");
		sql.append("          , cicurrency.CURRENCY_NAME as CURRENCY_TXT");
		sql.append("		  , anw.cost_run_account_id");
		sql.append("		  , costrun.KONTO_NAME as COST_RUN_ACCOUNT_TXT");
		sql.append("		  , anw.cost_change_account_id");
		sql.append("		  , costchange.KONTO_NAME as COST_CHANGE_ACCOUNT_TXT");
		sql.append("          , itsecsbinteg.SB_TEXT_EN as ITSECSBINTEG");
		sql.append("          , itsecsbverfg.SB_TEXT_EN as ITSECSBVERFG");
		sql.append("          , itsecsbvertr.SB_TEXT_EN as ITSECSBVERTR");
		sql.append("          , anw.CATEGORY_BUSINESS_ID");
		sql.append("          , katbus.CATEGORY_BUSINESS_NAME");
		sql.append("          , anw.CLASS_DATA_ID");
		sql.append("          , classdata.CLASS_DATA_NAME");
		sql.append("          , anw.CLASS_INFORMATION_ID");
		sql.append("          , classinfo.CLASS_INFORMATION_NAME");
		sql.append("          , anw.CLASS_INFORMATION_EXPLANATION");
		sql.append("          , classinfo.CLASS_PROTECTION_NAME");

		sql.append("		from anwendung anw");
		sql
		.append("		left join category_business katbus on anw.category_business_id = katbus.category_business_id");
		
		sql
				.append("		left join anwendung_kat2 kat2 on anw.anwendung_kat2_id = kat2.anwendung_kat2_id");
		sql
				.append("		left join anwendung_kat1 kat1 on kat2.anwendung_kat1_id = kat1.anwendung_kat1_id");
		sql
				.append("		left join itsec_gruppe itsgrp on anw.itsec_gruppe_id = itsgrp.ITSEC_GRP_GSTOOLID");
		sql.append(" left join anwendung anwref on anw.ref_id = anwref.anwendung_id");
		sql
				.append("		left join einsatz_status einsstat on anw.einsatz_status_id = einsstat.einsatz_status_id");
		sql
				.append("		left join lifecycle_sub_stat lcsubstat on anw.lc_status_id = lcsubstat.lc_sub_stat_id and lcsubstat.tabelle_id = 2");
		sql
				.append("		left join lifecycle_status lcstat on lcsubstat.lc_status_id = lcstat.lc_status_id and lcstat.tabelle_id = 2");
		sql
				.append("		left join itsec_it_verbund itsverb on anw.itset = itsverb.gstool_zob_id");
		sql.append("		left join sla sla on anw.sla_id = sla.sla_id");
		sql
				.append("		left join service_contract servcontr on anw.service_contract_id = servcontr.service_contract_id");
		sql
				.append("		left join priority_level priolev on anw.priority_level_id = priolev.priority_level_id");
		sql
				.append("		left join severity_level sevlev on anw.severity_level_id = sevlev.severity_level_id");
		sql
				.append("		left join severity_level busess on anw.business_essential_id = busess.severity_level_id");
		sql.append(" left join LICENSE_TYPE lic on anw.license_type_id = lic.license_type_id");
		sql.append(" left join CURRENCY cicurrency on anw.currency_id = cicurrency.currency_id");
		sql.append(" left join KONTO costrun on anw.cost_run_account_id = costrun.konto_id");
		sql.append(" left join KONTO costchange on anw.cost_change_account_id = costchange.konto_id");
		sql.append(" left join ITSEC_SB_WERTE itsecsbinteg on anw.ITSEC_SB_INTEG_ID = itsecsbinteg.ITSEC_SB_ID");
		sql.append(" left join ITSEC_SB_WERTE itsecsbverfg on anw.ITSEC_SB_VERFG_ID = itsecsbverfg.ITSEC_SB_ID");
		sql.append(" left join ITSEC_SB_WERTE itsecsbvertr on anw.ITSEC_SB_VERTR_ID = itsecsbvertr.ITSEC_SB_ID");
		
		sql.append(" left join CLASS_DATA classdata on anw.CLASS_DATA_ID = classdata.CLASS_DATA_ID and classdata.DEL_TIMESTAMP is null");
		sql.append(" left join CLASS_INFORMATION classinfo on anw.CLASS_INFORMATION_ID = classinfo.CLASS_INFORMATION_ID and classinfo.DEL_TIMESTAMP is null");
		
		sql.append("		where anw.anwendung_id=").append(applicationId);

		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				rsMessage.next();
				applicationDTO = new ApplicationDTO();
				applicationDTO.setApplicationId(rsMessage
						.getLong("ANWENDUNG_ID"));
				applicationDTO.setBarApplicationId(rsMessage.getString("BAR_APPLICATION_ID"));
				applicationDTO.setBarRelevance(rsMessage.getString("BAR_RELEVANCE_Y_N"));
				applicationDTO.setApplicationName(rsMessage
						.getString("ANWENDUNG_NAME"));
				applicationDTO.setApplicationCat2Id(rsMessage
						.getLong("ANWENDUNG_KAT2_ID"));
				applicationDTO.setApplicationCat2Txt(rsMessage
						.getString("ANWENDUNG_KAT2_TXT"));
				applicationDTO.setApplicationCat1Id(rsMessage
						.getLong("ANWENDUNG_KAT1_ID"));
				applicationDTO.setApplicationCat1Txt(rsMessage
						.getString("ANWENDUNG_KAT1_EN"));

				Long relevanzItsec = rsMessage.getLong("RELEVANZ_ITSEC");

				applicationDTO.setRelevanzItsec(relevanzItsec);

				applicationDTO.setItsecGroupId(rsMessage
						.getLong("ITSEC_GRUPPE_ID"));
				applicationDTO.setItsecGroup(rsMessage
						.getString("ITSEC_GRUPPE"));
				applicationDTO.setRefId(rsMessage.getLong("REF_ID"));
				applicationDTO.setRefTxt(rsMessage.getString("REF_TXT"));
				applicationDTO.setOperationalStatusId(rsMessage
						.getLong("EINSATZ_STATUS_ID"));
				applicationDTO.setOperationalStatusTxt(rsMessage
						.getString("EINSATZ_STATUS_EN"));
				applicationDTO.setLifecycleStatusId(rsMessage
						.getLong("LC_STATUS_ID"));

				applicationDTO.setLifecycleStatusTxt(rsMessage
						.getString("LIFECYCLE_STATUS"));
				if (" :: ".equals(applicationDTO.getLifecycleStatusTxt())) {
					// attributes are combined, must be handled as single
					// attributes, because of
					// null-attributes results => " :: "
					// so change to empty string for display
					applicationDTO
							.setLifecycleStatusTxt(ApplreposConstants.STRING_EMPTY);
				}

				applicationDTO
						.setUserCreate(rsMessage.getString("USER_CREATE"));
				applicationDTO.setClusterCode(rsMessage
						.getString("CLUSTER_CODE"));
				applicationDTO.setClusterType(rsMessage
						.getString("CLUSTER_TYPE"));
				applicationDTO.setDeleteTimestamp(ApplReposTS.getTimestampDisp(rsMessage
						.getTimestamp("DEL_TIMESTAMP")));
				applicationDTO.setDeleteUser(rsMessage.getString("DEL_USER"));
				applicationDTO.setDeleteQuelle(rsMessage
						.getString("DEL_QUELLE"));
				applicationDTO.setInsertTimestamp(ApplReposTS.getTimestampDisp(rsMessage
						.getTimestamp("INSERT_TIMESTAMP")));
				applicationDTO
						.setInsertUser(rsMessage.getString("INSERT_USER"));
				applicationDTO.setInsertQuelle(rsMessage
						.getString("INSERT_QUELLE"));
				applicationDTO.setUpdateTimestamp(ApplReposTS.getTimestampDisp(rsMessage
						.getTimestamp("UPDATE_TIMESTAMP")));
				applicationDTO
						.setUpdateUser(rsMessage.getString("UPDATE_USER"));
				applicationDTO.setUpdateQuelle(rsMessage
						.getString("UPDATE_QUELLE"));
				applicationDTO.setResponsible(rsMessage
						.getString("CWID_VERANTW_BETR"));
				applicationDTO.setResponsibleHidden(rsMessage
						.getString("CWID_VERANTW_BETR"));
				applicationDTO.setSubResponsible(rsMessage
						.getString("SUB_RESPONSIBLE"));
				applicationDTO.setSubResponsibleHidden(rsMessage
						.getString("SUB_RESPONSIBLE"));

				applicationDTO.setApplicationOwner(rsMessage
						.getString("APPLICATION_OWNER"));
				applicationDTO.setApplicationSteward(rsMessage
						.getString("APPLICATION_STEWARD"));
				applicationDTO.setApplicationOwnerDelegate(rsMessage
						.getString("APPLICATION_OWNER_DELEGATE"));
				
				applicationDTO.setApplicationOwnerHidden(rsMessage
						.getString("APPLICATION_OWNER"));
				applicationDTO.setApplicationStewardHidden(rsMessage
						.getString("APPLICATION_STEWARD"));
				applicationDTO.setApplicationOwnerDelegateHidden(rsMessage
						.getString("APPLICATION_OWNER_DELEGATE"));
				
				applicationDTO.setItset(rsMessage.getLong("ITSET"));
				applicationDTO.setItsetName(rsMessage
						.getString("IT_VERBUND_NAME"));

				Long relevanceICS = rsMessage.getLong("RELEVANCE_ICS");
				applicationDTO.setRelevanceICS(relevanceICS);
				
				Long relevance1775 = rsMessage.getLong("RELEVANCE_1775");
				applicationDTO.setRelevance1775(relevance1775);

				Long relevance2008 = rsMessage.getLong("RELEVANCE_2008");
				applicationDTO.setRelevance2008(relevance2008);

				Long template = rsMessage.getLong("TEMPLATE");
				if (-1 == template.longValue()) {
					// TODO -1 != 1 - Achtung beim Speichern
					template = new Long(1);
				}

				applicationDTO.setTemplate(template);

				
				applicationDTO.setSlaId(rsMessage.getLong("SLA_ID"));
				applicationDTO.setSlaName(rsMessage.getString("SLA_NAME"));
				applicationDTO.setServiceContractId(rsMessage
						.getLong("SERVICE_CONTRACT_ID"));
				applicationDTO.setServiceContract(rsMessage
						.getString("SERVICE_CONTRACT"));
				applicationDTO.setComments(rsMessage.getString("COMMENTS"));
				applicationDTO
						.setApplicationAlias(rsMessage.getString("ALIAS"));
				applicationDTO.setPriorityLevelId(rsMessage
						.getLong("PRIORITY_LEVEL_ID"));
				applicationDTO.setPriorityLevel(rsMessage
						.getString("PRIORITY_LEVEL"));
				applicationDTO.setSeverityLevelId(rsMessage
						.getLong("SEVERITY_LEVEL_ID"));
				applicationDTO.setSeverityLevel(rsMessage
						.getString("SEVERITY_LEVEL"));
				applicationDTO.setLocationPath(rsMessage
						.getString("LOCATION_PATH"));
				applicationDTO.setBusinessEssentialId(rsMessage
						.getLong("BUSINESS_ESSENTIAL_ID"));
				applicationDTO.setBusinessEssential(rsMessage
						.getString("BUSINESS_ESSENTIAL"));
				// set both values!
				applicationDTO.setGxpFlagId(rsMessage.getString("GXP_FLAG"));
				applicationDTO.setGxpFlagTxt(rsMessage.getString("GXP_FLAG"));

				// TODO neue Attribute

// task 142				
//				if (ApplreposConstants.YES_SHORT.equals(rsMessage
//						.getString("RISK_ANALYSIS_YN"))) {
//					applicationDTO.setRiskAnalysisYN("true");
//				} else {
//					applicationDTO.setRiskAnalysisYN("false");
//				}
				applicationDTO.setLicenseTypeId(rsMessage
						.getLong("LICENSE_TYPE_ID"));
				applicationDTO.setLicenseTypeTxt(rsMessage
						.getString("LICENSE_TYPE_TXT"));
				
				applicationDTO.setDedicated(rsMessage.getString("DEDICATED_Y_N"));
				
				String testAccessingUserCount = rsMessage.getString("ACCESSING_USER_COUNT");
				if (null == testAccessingUserCount) {
					applicationDTO.setAccessingUserCount(null);
				}
				else {
					applicationDTO.setAccessingUserCount(rsMessage
							.getLong("ACCESSING_USER_COUNT"));
				}
				
				String testAccessingUserCountMeasured = rsMessage.getString("ACCESSING_USER_COUNT_MEASURED");
				if (null == testAccessingUserCountMeasured) {
					applicationDTO.setAccessingUserCountMeasured(null);
				}
				else {
					applicationDTO.setAccessingUserCountMeasured(rsMessage
							.getLong("ACCESSING_USER_COUNT_MEASURED"));
				}

				applicationDTO.setLoadClass(rsMessage.getString("LOAD_CLASS"));
				
				applicationDTO.setServiceModel(rsMessage.getString("SERVICE_MODEL"));
				
				applicationDTO.setOrganisationalScope(rsMessage.getString("ORG_SCOPE"));
				
				applicationDTO.setVersion(rsMessage.getString("VERSION"));

				String testCostRunPa = rsMessage.getString("COST_RUN_PA");
				if (null == testCostRunPa) {
					applicationDTO.setCostRunPa(null);
				}
				else {
					applicationDTO.setCostRunPa(rsMessage.getLong("COST_RUN_PA"));
				}

				String testCostChangePa = rsMessage.getString("COST_CHANGE_PA");
				if (null == testCostChangePa) {
					applicationDTO.setCostChangePa(null);
				}
				else {
					applicationDTO.setCostChangePa(rsMessage
							.getLong("COST_CHANGE_PA"));
				}
				
				applicationDTO.setCurrencyId(rsMessage.getLong("CURRENCY_ID"));
				applicationDTO.setCurrencyTxt(rsMessage.getString("CURRENCY_TXT"));
				applicationDTO.setCostRunAccountId(rsMessage
						.getLong("COST_RUN_ACCOUNT_ID"));
				applicationDTO.setCostRunAccountTxt(rsMessage
						.getString("COST_RUN_ACCOUNT_TXT"));
				applicationDTO.setCostChangeAccountId(rsMessage
						.getLong("COST_CHANGE_ACCOUNT_ID"));
				applicationDTO.setCostChangeAccountTxt(rsMessage
						.getString("COST_CHANGE_ACCOUNT_TXT"));
				
				
				// itSec
				applicationDTO.setItSecSbIntegrityId(rsMessage.getLong("ITSEC_SB_INTEG_ID"));
				applicationDTO.setItSecSbIntegrityTxt(rsMessage.getString("ITSECSBINTEG"));
				applicationDTO.setItSecSbIntegrityDescription(rsMessage.getString("ITSEC_SB_INTEG_TXT"));
				applicationDTO.setItSecSbAvailabilityId(rsMessage.getLong("ITSEC_SB_VERFG_ID"));
				applicationDTO.setItSecSbAvailabilityTxt(rsMessage.getString("ITSECSBVERFG"));
				applicationDTO.setItSecSbAvailabilityDescription(rsMessage.getString("ITSEC_SB_VERFG_TXT"));
				applicationDTO.setItSecSbConfidentialityId(rsMessage.getLong("ITSEC_SB_VERTR_ID"));
				applicationDTO.setItSecSbConfidentialityTxt(rsMessage.getString("ITSECSBVERTR"));
				applicationDTO.setItSecSbConfidentialityDescription(rsMessage.getString("ITSEC_SB_VERTR_TXT"));

				
				if (null == applicationDTO.getItSecSbIntegrityId()) {
					applicationDTO.setItSecSbIntegrityId(new Long(0));
				}
				if (null == applicationDTO.getItSecSbAvailabilityId()) {
					applicationDTO.setItSecSbAvailabilityId(new Long(0));
				}
				if (null == applicationDTO.getItSecSbConfidentialityId()) {
					applicationDTO.setItSecSbConfidentialityId(new Long(0));
				}
				
				applicationDTO.setCategoryBusinessId(rsMessage.getLong("CATEGORY_BUSINESS_ID"));
				applicationDTO.setCategoryBusiness(rsMessage.getString("CATEGORY_BUSINESS_NAME"));
				
				applicationDTO.setClassDataId(rsMessage.getLong("CLASS_DATA_ID"));
				applicationDTO.setClassData(rsMessage.getString("CLASS_DATA_NAME"));
				
				applicationDTO.setClassInformationId(rsMessage.getLong("CLASS_INFORMATION_ID"));
				applicationDTO.setClassInformationExplanation(rsMessage.getString("CLASS_INFORMATION_EXPLANATION"));
				applicationDTO.setApplicationProtection(rsMessage.getString("CLASS_PROTECTION_NAME"));
				
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
			tx.commit();
		} catch (Exception e) {
			log.error(e.getMessage());
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				// throw e;
			}

		}
		return applicationDTO;
	}


	/**
	 * find the application contacts
	 * @param applicationId
	 * @return
	 */
	public static List<ApplicationContact> findApplicationContacts(
			Long applicationId) {

		ArrayList<ApplicationContact> listResult = new ArrayList<ApplicationContact>();

		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select ");
		sql.append(" gt.group_type_id");
		sql.append(", gt.group_type_name");
		sql.append(", gt.individual_contact_y_n");
		sql.append(", gt.min_contacts");
		sql.append(", gt.max_contacts");
		sql.append(", cipers.cwid");
		sql.append(", pers.vorname");
		sql.append(", pers.nachname");
		sql.append(", grp.group_id");
		sql.append(", grp.group_name");

		sql.append(" from group_types gt");

		sql
				.append(
						" left join ci_groups cigr on gt.GROUP_TYPE_ID = cigr.GROUP_TYPE_ID and cigr.table_id=2 and cigr.ci_id=")
				.append(applicationId);
		sql.append(" and cigr.del_timestamp is null");
		sql
				.append(
						" left join ci_persons cipers on gt.INDIVIDUAL_CONTACT_Y_N='Y' and gt.group_type_id = cipers.group_type_id and cipers.table_id=2 and cipers.del_timestamp is null and cipers.ci_id=")
				.append(applicationId);
		sql.append(" left join persons pers on cipers.cwid = pers.cwid");

		sql
				.append(" left join groups grp on gt.INDIVIDUAL_CONTACT_Y_N='N' and cigr.group_id= grp.group_id");

		sql
				.append(" where gt.visible_application = 1 and gt.del_timestamp is null");

		sql.append(" order by gt.group_type_id, gt.INDIVIDUAL_CONTACT_Y_N, gt.GROUP_TYPE_NAME");
		
		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			//System.out.println(sql.toString());
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ApplicationContact contact = new ApplicationContact();
					contact.setGroupTypeId(rsMessage.getLong("GROUP_TYPE_ID"));
					
					contact.setGroupTypeName(rsMessage.getString("GROUP_TYPE_NAME"));
					
					contact.setIndividualContactYN(rsMessage
							.getString("INDIVIDUAL_CONTACT_Y_N"));
					contact.setMinContacts(rsMessage.getLong("MIN_CONTACTS"));
					contact.setMaxContacts(rsMessage.getLong("MAX_CONTACTS"));
					contact.setCwid(rsMessage.getString("CWID"));

					String vorname = rsMessage.getString("VORNAME");
					String nachname = rsMessage.getString("NACHNAME");

					if (null == vorname && null == nachname) {
						contact.setPersonName(EMPTY);
					} else {
						contact.setPersonName(nachname+ ", " + vorname);
					}
					contact.setGroupId(rsMessage.getLong("GROUP_ID"));
					contact.setGroupName(rsMessage.getString("GROUP_NAME"));

					listResult.add(contact);
				}
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
			tx.commit();
		} catch (Exception e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				// throw e;
			}

		}
		return listResult;
	}


	/**
	 * find the references
	 * @return
	 */
	public static List<ReferenzDTO> findApplicationReferenz() {

		ArrayList<ReferenzDTO> listResult = new ArrayList<ReferenzDTO>();

		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

//		sql.append("select anw.anwendung_id, anw.anwendung_name, anw.itsec_gruppe_id, i.it_verbund_zob_id1 from anwendung anw ");//orig: ohne anw.itsec_gruppe_id
//		sql.append(" join anwendung_kat2 anwkat2 on anw.anwendung_kat2_id = anwkat2.anwendung_kat2_id");
//		sql.append(" join anwendung_kat1 anwkat1 on anwkat2.anwendung_kat1_id= anwkat1.anwendung_kat1_id");
//		sql.append(" join itverbund_itsecgrp i on i.itsec_gruppe_zobid = anw.itsec_gruppe_id");
//		sql.append(" where ");
//		sql.append(" anw.del_timestamp is null");
//		sql.append(" and anw.template = -1");
//		sql.append(" and anwkat1.anwendung_kat1_id = 5");
//		sql.append(" order by anw.anwendung_name");
		
		
		sql.append("SELECT ANW.Anwendung_Id, ANW.Anwendung_Name, ANW.itset, ANW.itsec_gruppe_id, AK2.Anwendung_Kat1_Id ");
		sql.append("FROM ANWENDUNG ANW ");
		sql.append("INNER JOIN Anwendung_KAT2 AK2 ON ANW.Anwendung_Kat2_Id = AK2.Anwendung_Kat2_Id ");
//		sql.append(" join itverbund_itsecgrp i on i.itsec_gruppe_zobid = anw.itsec_gruppe_id");
//		sql.append("WHERE AK2.Anwendung_Kat1_Id = 5 ");
//		sql.append("AND ANW.Itset = 10002 ");
		sql.append("WHERE ANW.Del_Timestamp is NULL ");//AND
		sql.append("AND ANW.Template = -1 ");
//		sql.append("AND ANW.Anwendung_Id <> 8675--11568 10346 um nicht template auf sich selbst auswählen zu können");
//		sql.append("AND pck_SISec.ReferencedBy('ANWENDUNG', ANW.Anwendung_Id, 2) = 0");
		sql.append("ORDER BY ANW.Anwendung_Name");
		
		
		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ReferenzDTO ref = new ReferenzDTO();
					ref.setId(rsMessage.getLong("ANWENDUNG_ID"));
					ref.setName(rsMessage.getString("ANWENDUNG_NAME"));
					ref.setItsetId(rsMessage.getLong("ITSET"));//it_verbund_zob_id1
					ref.setItsecGroupId(rsMessage.getLong("ITSEC_GRUPPE_ID"));//itsec_gruppe_id
					ref.setCiKat1(rsMessage.getLong("ANWENDUNG_KAT1_ID"));
					listResult.add(ref);
				}
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
			tx.commit();
		} catch (Exception e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				// throw e;
			}

		}
		return listResult;
	}

	/**
	 * find the application upstream
	 * @return
	 */
	public static List<ViewDataDTO> findApplicationUpStream(Long applicationId) {

		ArrayList<ViewDataDTO> listResult = new ArrayList<ViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select");
		sql.append(" anwanw.app_higher_id");
		sql.append(" , anw.anwendung_name");
		sql.append(" , anwkat2.anwendung_kat2_txt");
		sql.append(" , anwkat1.anwendung_kat1_en");
		sql.append(" from anw_anw anwanw");
		sql.append(" join anwendung anw on anwanw.app_higher_id = anw.anwendung_id");
		sql.append(" join anwendung_kat2 anwkat2 on anw.anwendung_kat2_id = anwkat2.anwendung_kat2_id");
		sql.append(" join anwendung_kat1 anwkat1 on anwkat2.anwendung_kat1_id= anwkat1.anwendung_kat1_id");
		sql.append(" where anwanw.app_lower_id = ");
		sql.append(applicationId);
		sql.append("  and anwanw.del_timestamp is null");
		
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ViewDataDTO dto = new ViewDataDTO();
					dto.setId(EMPTY +rsMessage.getLong("APP_HIGHER_ID"));

					dto.setText(rsMessage
							.getString("ANWENDUNG_NAME"));
					dto.setType(rsMessage
							.getString("ANWENDUNG_KAT1_EN"));

					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			//
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}
		
		return listResult;
	}


	/**
	 * find the application downstream
	 * @return
	 */
	public static List<ViewDataDTO> findApplicationDownStream(Long applicationId) {

		ArrayList<ViewDataDTO> listResult = new ArrayList<ViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select");
		sql.append(" anwanw.app_lower_id");
		sql.append(" , anw.anwendung_name");
		sql.append(" , anwkat2.anwendung_kat2_txt");
		sql.append(" , anwkat1.anwendung_kat1_en");
		sql.append(" from anw_anw anwanw");
		sql.append(" join anwendung anw on anwanw.app_lower_id = anw.anwendung_id");
		sql.append(" join anwendung_kat2 anwkat2 on anw.anwendung_kat2_id = anwkat2.anwendung_kat2_id");
		sql.append(" join anwendung_kat1 anwkat1 on anwkat2.anwendung_kat1_id= anwkat1.anwendung_kat1_id");
		sql.append(" where anwanw.app_higher_id = ");
		sql.append(applicationId);
		sql.append("  and anwanw.del_timestamp is null");
		
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ViewDataDTO dto = new ViewDataDTO();
					dto.setId(EMPTY +rsMessage.getLong("APP_LOWER_ID"));
					
					dto.setText(rsMessage
							.getString("ANWENDUNG_NAME"));
					dto.setType(rsMessage
							.getString("ANWENDUNG_KAT1_EN"));
					

					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			//
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}
 

	/**
	 * find the application process
	 * @return
	 */
	public static List<ViewDataDTO> findApplicationProcess(Long applicationId) {

		ArrayList<ViewDataDTO> listResult = new ArrayList<ViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select");
		sql.append("  anwprocess.process_id");
		sql.append(" , anwprocess.application_id");
		sql.append(" , proc.process_name");
		sql.append(" , proc.process_owner");
		sql.append(" , proc.process_manager");
		sql.append(" , proc.del_timestamp");
		sql.append(" from application_process anwprocess");
		sql.append(" join process proc on anwprocess.process_id = proc.process_id");
		sql.append(" where anwprocess.application_id  = ");
		sql.append(applicationId);
		sql.append("  and anwprocess.del_timestamp is null");
	
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ViewDataDTO dto = new ViewDataDTO();
					dto.setId(EMPTY +rsMessage.getLong("PROCESS_ID"));
					
					StringBuffer sb = new StringBuffer();
					sb.append(rsMessage
							.getString("PROCESS_NAME"));
					
					if (null != rsMessage.getTimestamp("DEL_TIMESTAMP")) {
						sb.append(" (DELETED)");
					}					
					dto.setText(sb.toString());

					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			//
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	
	/**
	 * find the application connections (up- and downstream)
	 * @return
	 */
	public static List<ViewDataDTO> findApplicationConnections(Long applicationId) {
		ArrayList<ViewDataDTO> listResult = new ArrayList<ViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select 'H' as DIRECTION, dwh_entity.* from dwh_entity where upper(TYPE) <> 'PROCESS' and (TABLE_ID, CI_ID) IN");
		sql.append(" (select HIGHER_TABLE_ID, HIGHER_ci_ID from DWH_RELATION where LOWER_TABLE_ID=2 and LOWER_CI_ID=").append(applicationId).append(") and UPPER(deleted) = 'NO'");
		sql.append(" UNION");
		sql.append(" select 'L' as DIRECTION, dwh_entity.* from dwh_entity where (TABLE_ID, CI_ID) IN");
		sql.append(" (select LOWER_TABLE_ID, LOWER_ci_ID from DWH_RELATION where upper(TYPE) <> 'PROCESS' and HIGHER_TABLE_ID=2 and HIGHER_CI_ID=").append(applicationId).append(") and UPPER(deleted) = 'NO'");
		sql.append(" order by 1,2,4");
	
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ViewDataDTO dto = new ViewDataDTO();
					dto.setDirection(rsMessage.getString("DIRECTION"));
					dto.setType(rsMessage.getString("TYPE"));
					dto.setId(rsMessage.getString("ID"));
					dto.setName(rsMessage.getString("NAME"));
					dto.setAlias(rsMessage.getString("ASSET_ID_OR_ALIAS"));
					dto.setResponsible(rsMessage.getString("RESPONSIBLE"));
					dto.setSubResponsible(rsMessage.getString("SUB_RESPONSIBLE"));
					dto.setCategory(rsMessage.getString("CATEGORY"));
					dto.setTableId(rsMessage.getLong("TABLE_ID"));
					dto.setCiId(rsMessage.getLong("CI_ID"));
					
					dto.setGroupsort(rsMessage
							.getString("DIRECTION") +"::" + rsMessage.getString("TYPE"));

					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	/**
	 * find the connection entries for the picker
	 * @return
	 */
	public static List<ViewDataDTO> findConnectionEntries(String type, String searchparam) {

		ArrayList<ViewDataDTO> listResult = new ArrayList<ViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		searchparam = searchparam.toUpperCase();
		
		StringBuffer sql = new StringBuffer();

		sql.append("select * from dwh_entity");
		sql.append(" where upper(type) = upper('").append(type).append("') and UPPER(deleted) = 'NO'"); 
		sql.append(" and (upper(name) like ('%").append(searchparam).append("%') or upper(asset_id_or_alias) like ('%").append(searchparam).append("%')) order by name");
		
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ViewDataDTO dto = new ViewDataDTO();
					dto.setDirection(rsMessage.getString("DIRECTION"));
					dto.setType(rsMessage.getString("TYPE"));
					dto.setId(rsMessage.getString("ID"));
					dto.setName(rsMessage.getString("NAME"));
					dto.setAlias(rsMessage.getString("ASSET_ID_OR_ALIAS"));
					dto.setResponsible(rsMessage.getString("RESPONSIBLE"));
					dto.setSubResponsible(rsMessage.getString("SUB_RESPONSIBLE"));
					dto.setCategory(rsMessage.getString("CATEGORY"));
					dto.setTableId(rsMessage.getLong("TABLE_ID"));
					dto.setCiId(rsMessage.getLong("CI_ID"));

					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			//
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	
	/**
	 * find the application it systems
	 * @return
	 */
	public static List<ViewDataDTO> findApplicationItSystems(Long applicationId) {

		ArrayList<ViewDataDTO> listResult = new ArrayList<ViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select");
		sql.append(" anwits.it_system_id");
		sql.append(" , its.it_system_name");
		sql.append(" from  anwend_it_system anwits");
		sql.append(" join it_system its on its.it_system_id = anwits.it_system_id");
		sql.append(" where   anwits.anwendung_id = ");
		sql.append(applicationId);
		sql.append(" and anwits.del_timestamp is null");
		
		
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ViewDataDTO dto = new ViewDataDTO();
					dto.setId(EMPTY +rsMessage.getLong("IT_SYSTEM_ID"));
					dto.setText(rsMessage
							.getString("IT_SYSTEM_NAME"));
					
					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			//
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	
	public static List<ApplicationDTO> findApplications(
			String query, String queryMode, String advsearchappowner, String advsearchappownerHidden, String advsearchappdelegate, 
			String advsearchappdelegateHidden, String advsearchciowner, String advsearchciownerHidden, String advsearchcidelegate, 
			String advsearchcidelegateHidden, boolean onlyapplications, Long kat1Id, String sort, String dir,
			Long advsearchcitypeid, String advsearchdescription, Long advsearchoperationalstatusid,
			Long advsearchapplicationcat2id,
			Long advsearchlifecyclestatusid,
			Long advsearchprocessid,
			String template,
			String advsearchsteward,
			String advsearchstewardHidden,
			String barRelevance,
			String organisationalScope,
			String itSetId,
			String itSecGroupId,
			String source,
			String businessEssentialId,
			String ciTypeOptions, String itSetOptions, String descriptionOptions,
			String appOwnerOptions, String appOwnerDelegateOptions, String appStewardOptions, String ciOwnerOptions, String ciOwnerDelegateOptions,
			String generalUsageOptions, String itCategoryOptions, String lifecycleStatusOptions, String organisationalScopeOptions,
			String itSecGroupOptions, String processOptions, String sourceOptions, String businessEssentialOptions) {
		
//		String advsearchcountry;
//		String advsearchsite;
//		String advsearchbuilding;
//		String advsearchroom;
//		Long advsearchcitypeid,
//		Long advsearchapplicationcat2id,

		
		if (null != advsearchappownerHidden) {//advsearchappowner
			advsearchappownerHidden = advsearchappownerHidden.replace("*", "%");//advsearchappowner
		}
		if (null != advsearchappdelegate) {
			advsearchappdelegate = advsearchappdelegate.replace("*", "%");
		}
		if (null != advsearchciownerHidden) {//advsearchciowner
			advsearchciownerHidden = advsearchciownerHidden.replace("*", "%");//advsearchciowner
		}
		if (null != advsearchcidelegate) {
			advsearchcidelegate = advsearchcidelegate.replace("*", "%");
		}
		if (null != advsearchstewardHidden) {//advsearchsteward
			advsearchstewardHidden = advsearchstewardHidden.replace("*", "%");//advsearchsteward
		}
		
		ArrayList<ApplicationDTO> listResult = new ArrayList<ApplicationDTO>();

		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("SELECT anw.* , kat2.anwendung_kat2_txt , kat1.anwendung_kat1_en from ANWENDUNG anw");
		sql.append(" left join anwendung_kat2 kat2 on anw.anwendung_kat2_id = kat2.anwendung_kat2_id");
		sql.append(" left join anwendung_kat1 kat1 on kat2.anwendung_kat1_id = kat1.anwendung_kat1_id");
		
		if (null != advsearchprocessid) {
			sql.append(" left join application_process appproc on anw.ANWENDUNG_ID = appproc.application_id");
		}
		sql.append(" where");
		
		// ANWENDUNG_NAME
		sql.append(" (UPPER (anw.ANWENDUNG_NAME) like '");
		
		// alles andere führt zu einer exacten Suche
		
		if (CiEntitiesHbn.isLikeStart(queryMode)) {
			sql.append("%");
		}
		
		sql.append(query.toUpperCase());
		
		if (CiEntitiesHbn.isLikeEnd(queryMode)) {
			sql.append("%");
		}
		sql.append("'");
		
		// ALIAS
		sql.append(" or UPPER (anw.ALIAS) like '");
		
		if (CiEntitiesHbn.isLikeStart(queryMode)) {
			sql.append("%");
		}
		
		sql.append(query.toUpperCase());
		
		if (CiEntitiesHbn.isLikeEnd(queryMode)) {
			sql.append("%");
		}
		sql.append("' )");
		
		
		boolean isNot = false;

		
		if (StringUtils.isNotNullOrEmpty(advsearchappownerHidden)) {//advsearchappowner
			isNot = isNot(appOwnerOptions);
			
			sql.append(" and (");
			if(isNot)
				sql.append("UPPER(anw.APPLICATION_OWNER) is null or ");
			
			sql.append("UPPER(anw.APPLICATION_OWNER) "+ getLikeNotLikeOperator(isNot) +" '").append(advsearchappownerHidden.toUpperCase()).append("')");//advsearchappowner
		}
		
		if (StringUtils.isNotNullOrEmpty(advsearchappdelegate)) {
			boolean isCwid = advsearchappdelegate.indexOf(')') > -1;
			String delegate = isCwid ? advsearchappdelegateHidden : advsearchappdelegate;//gruppe oder cwid?
			
			isNot = isNot(appOwnerDelegateOptions);
			
			sql.append(" and (");
			if(isNot)
				sql.append("UPPER(anw.APPLICATION_OWNER_DELEGATE) is null or ");
			
			sql.append("UPPER(anw.APPLICATION_OWNER_DELEGATE) "+ getLikeNotLikeOperator(isNot) +" '").append(delegate.toUpperCase()).append("')");
			
			if(!isCwid)
				sql.insert(sql.length() - 2, '%');
			
			
			
//			isNot = isNot(appOwnerDelegateOptions);
//			sql.append(" and UPPER(anw.APPLICATION_OWNER_DELEGATE) "+ getLikeNotLikeOperator(isNot) +" '").append(delegate.toUpperCase()).append("'");
//			if(advsearchappdelegate.indexOf('_') == -1)
//				sql.insert(sql.length() - 1, '%');
		}

		if (StringUtils.isNotNullOrEmpty(advsearchciownerHidden)) {//advsearchciowner
			isNot = isNot(ciOwnerOptions);
			
			sql.append(" and (");
			if(isNot)
				sql.append("UPPER(anw.CWID_VERANTW_BETR) is null or ");
			
			sql.append("UPPER(anw.CWID_VERANTW_BETR) "+ getLikeNotLikeOperator(isNot) +" '").append(advsearchciownerHidden.toUpperCase()).append("')");//advsearchciowner
		}
		
		if (StringUtils.isNotNullOrEmpty(advsearchcidelegate)) {//advsearchcidelegateHidden
			boolean isCwid = advsearchcidelegate.indexOf(')') > -1;
			String delegate = isCwid ? advsearchcidelegateHidden : advsearchcidelegate;//gruppe oder cwid?
			
			isNot = isNot(ciOwnerDelegateOptions);
			
			sql.append(" and (");
			if(isNot)
				sql.append("UPPER(anw.SUB_RESPONSIBLE) is null or ");
			
			sql.append("UPPER(anw.SUB_RESPONSIBLE) "+ getLikeNotLikeOperator(isNot) +" '").append(delegate.toUpperCase()).append("')");
						
			if(!isCwid)
				sql.insert(sql.length() - 2, '%');
		}

		if (StringUtils.isNotNullOrEmpty(advsearchstewardHidden)) {//advsearchsteward
			isNot = isNot(appStewardOptions);
			
			sql.append(" and (");
			if(isNot)
				sql.append("UPPER(anw.APPLICATION_STEWARD) is null or ");
			
			sql.append("UPPER(anw.APPLICATION_STEWARD) "+ getLikeNotLikeOperator(isNot) +" '").append(advsearchstewardHidden.toUpperCase()).append("')");//advsearchsteward
		}

		if (StringUtils.isNotNullOrEmpty(advsearchdescription)) {
			isNot = isNot(descriptionOptions);
			sql.append(" and UPPER(anw.COMMENTS) "+ getLikeNotLikeOperator(isNot) +" '%").append(advsearchdescription.toUpperCase()).append("%'");
		}
		
		
		
		if (null != advsearchapplicationcat2id) {
			isNot = isNot(itCategoryOptions);
			sql.append(" and anw.ANWENDUNG_KAT2_ID "+ getEqualNotEqualOperator(isNot) +" ").append(advsearchapplicationcat2id.longValue());
		}
		if (null != advsearchoperationalstatusid) {
			isNot = isNot(generalUsageOptions);
			sql.append(" and anw.EINSATZ_STATUS_ID "+ getEqualNotEqualOperator(isNot) +" ").append(advsearchoperationalstatusid.longValue());
		}
		if (null != advsearchlifecyclestatusid) {
			isNot = isNot(lifecycleStatusOptions);
			sql.append(" and anw.LC_STATUS_ID "+ getEqualNotEqualOperator(isNot) +" ").append(advsearchlifecyclestatusid.longValue());
		}
		if(StringUtils.isNotNullOrEmpty(itSetId)) {
			isNot = isNot(itSetOptions);
			sql.append(" and anw.ITSET "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(itSetId));
		}
		if(StringUtils.isNotNullOrEmpty(itSecGroupId)) {
			isNot = isNot(itSecGroupOptions);
			sql.append(" and anw.ITSEC_GRUPPE_ID "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(itSecGroupId));
		}
		if(StringUtils.isNotNullOrEmpty(source)) {
			isNot = isNot(sourceOptions);
			sql.append(" and anw.INSERT_QUELLE "+ getEqualNotEqualOperator(isNot) +" '").append(source).append("'");
		}
		if(StringUtils.isNotNullOrEmpty(businessEssentialId)) {
			isNot = isNot(businessEssentialOptions);
			sql.append(" and anw.BUSINESS_ESSENTIAL_ID "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(businessEssentialId));
		}

		if (null != template) {
			String searchTemplate = null;
			if ("Y".equals(template)) {
				searchTemplate = "-1";
			}
			else if ("N".equals(template)) {
				searchTemplate = "0";
			}
			
			if (null != searchTemplate) {
				sql.append(" and anw.template = ").append(searchTemplate);
			}
		}
		
		if (null != advsearchprocessid) {
			isNot = isNot(processOptions);
			sql.append(" and appproc.del_timestamp is null");
			sql.append(" and appproc.process_id "+ getEqualNotEqualOperator(isNot) +" ").append(advsearchprocessid.longValue());
		}
		
		// TODO LOCATION
//		if (StringUtils.isNotNullOrEmpty(advsearchcidelegate)) {
//			sql.append(" and UPPER(anw.SUB_RESPONSIBLE) = '").append(advsearchcidelegate.toUpperCase()).append("'");
//		}
		
		if (onlyapplications) {
			sql.append(" and kat1.anwendung_kat1_id=5"); // TODO ANWENDUNG_KAT1 Constante
		}
		
		if (null != kat1Id) {
			isNot = isNot(ciTypeOptions);
			sql.append(" and kat1.anwendung_kat1_id "+ getEqualNotEqualOperator(isNot) +" ").append(kat1Id);
		}

		if (null != barRelevance && !EMPTY.equals(barRelevance)) {
			if ("U".equals(barRelevance)) {
				sql.append(" and anw.BAR_RELEVANCE_Y_N is null");
			}
			else {
				sql.append(" and anw.BAR_RELEVANCE_Y_N='").append(barRelevance).append("'");
			}
		}
		
		if (null != organisationalScope && !EMPTY.equals(organisationalScope)) {
			isNot = isNot(organisationalScopeOptions);
			
			sql.append(" and (");
			
			int count = 0;
			StringTokenizer tk = new StringTokenizer(organisationalScope, ",");
			while (tk.hasMoreTokens()) {
				String temp = tk.nextToken();
				if (count != 0) {
					sql.append(" or ");
				}
				sql.append("anw.ORG_SCOPE "+ getEqualNotEqualOperator(isNot) +" '").append(temp).append("'");
				count++;
			}
			
			sql.append(")");
		}

		
		sql.append("  and anw.DEL_TIMESTAMP is null");
		
		if (StringUtils.isNotNullOrEmpty(sort)) {
			if ("applicationName".equals(sort)) {
				sql.append(" order by anw.ANWENDUNG_NAME");
			}
			else if ("applicationAlias".equals(sort)) {
				sql.append(" order by anw.ALIAS");
			}
			else if ("applicationCat1Txt".equals(sort)) {
				sql.append(" order by kat1.anwendung_kat1_en");
			}
			else if ("applicationCat2Txt".equals(sort)) {
				sql.append(" order by kat2.anwendung_kat2_txt");
			}
			else if ("responsible".equals(sort)) {
				sql.append(" order by anw.CWID_VERANTW_BETR");
			}
			else if ("subResponsible".equals(sort)) {
				sql.append(" order by anw.SUB_RESPONSIBLE");
			}
			else if ("applicationOwner".equals(sort)) {
				sql.append(" order by anw.APPLICATION_OWNER");
			}
			else if ("applicationOwnerDelegate".equals(sort)) {
				sql.append(" order by anw.APPLICATION_OWNER_DELEGATE");
			}
			
			if (StringUtils.isNotNullOrEmpty(dir)) {
				sql.append(" ").append(dir);
			}

		}
		else {
			sql.append(" order by anw.ANWENDUNG_NAME");
		}
		

		
		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			//System.out.println(sql.toString());
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				while (rset.next()) {
					long anwendungId = rset.getLong("ANWENDUNG_ID");
					String barApplicationId = rset.getString("BAR_APPLICATION_ID");
					String anwendungName = rset.getString("ANWENDUNG_NAME");
					String anwendungAlias = rset.getString("ALIAS");
					//--
					String responsible = rset.getString("CWID_VERANTW_BETR");
					String subResponsible = rset.getString("SUB_RESPONSIBLE");
					String applicationCat2Txt = rset.getString("anwendung_kat2_txt");
					String applicationCat1Txt = rset.getString("anwendung_kat1_en");
					String applicationOwner = rset.getString("APPLICATION_OWNER");
					String applicationOwnerDelegate = rset.getString("APPLICATION_OWNER_DELEGATE");
					String applicationSteward = rset.getString("APPLICATION_STEWARD");
					
					ApplicationDTO anw = new ApplicationDTO();
					anw.setApplicationId(anwendungId);
					anw.setBarApplicationId(barApplicationId);
					anw.setApplicationName(anwendungName);
					anw.setApplicationAlias(anwendungAlias);
					anw.setResponsible(responsible);
					anw.setSubResponsible(subResponsible);
					anw.setApplicationCat1Txt(applicationCat1Txt);
					anw.setApplicationCat2Txt(applicationCat2Txt);
					anw.setApplicationOwner(applicationOwner);
					anw.setApplicationOwnerDelegate(applicationOwnerDelegate);
					anw.setApplicationSteward(applicationSteward);
					anw.setTableId(ApplreposConstants.TABLE_ID_APPLICATION);
					listResult.add(anw);
				}
			}

			if (null != rset) {
				rset.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
			tx.commit();
		} catch (Exception e) {
			log.error(e.toString());
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
			}

		}
		return listResult;
	}

	
	public static List<HistoryViewDataDTO> findApplicationHistory(Long applicationId) {

		ArrayList<HistoryViewDataDTO> listResult = new ArrayList<HistoryViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

//		StringBuffer sql = new StringBuffer();
//
//		sql.append("select");
//		sql.append(" * from history ");
//		sql.append(" where table_id = ").append(ApplreposConstants.TABLE_ID_APPLICATION).append(" and primarykey = ");
//		sql.append(applicationId);
//		sql.append(" order by datetime desc");
		
		String sql = "SELECT * FROM TABLE(PCK_AIR.ft_history("+applicationId+"))";
		
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			Long id = new Long(0);
			
			if (null != rsMessage) {
				while (rsMessage.next()) {
					HistoryViewDataDTO dto = new HistoryViewDataDTO();
					dto.setId(id++);
					/*dto.setTableId(rsMessage.getLong("TABLE_ID"));
					dto.setCiId(rsMessage.getLong("PRIMARYKEY"));
					dto.setDatetime(rsMessage.getTimestamp("DATETIME").toString());	//toLocaleString TODO History Datumsformat
					dto.setChangeSource(rsMessage.getString("CHANGESOURCE"));
					dto.setChangeDBUser(rsMessage.getString("DBUSER"));
					dto.setChangeUserCWID(rsMessage.getString("CHANGEUSER"));
					dto.setChangeUserName(EMPTY);
					
					String change = rsMessage.getString("CHANGES");
					
					if (null != change && change.contains("|")) {
						 StringTokenizer strTk  = new StringTokenizer(change, "|");

						 while (strTk.hasMoreTokens()) {
							 String temp = strTk.nextToken().toString();
							 
							 if (2 < temp.length()) {
								 String changeAttributeName = temp.substring(1, temp.indexOf(": "));
								 String changeAttributeOldValue = temp.substring(temp.indexOf(": ")+2, temp.indexOf(" => "));
								 String changeAttributeNewValue = temp.substring(temp.indexOf(" => ")+4);
								 
								 dto.setChangeAttributeName(changeAttributeName);
								 dto.setChangeAttributeOldValue(changeAttributeOldValue);
								 dto.setChangeAttributeNewValue(changeAttributeNewValue);
							 }
							 
							 listResult.add(dto);
							 dto = new HistoryViewDataDTO();
							 
								dto.setDatetime(EMPTY);
								dto.setChangeSource(EMPTY);
								dto.setChangeDBUser(EMPTY);
								dto.setChangeUserCWID(EMPTY);
								dto.setChangeUserName(EMPTY);
							 
							 dto.setId(id++);
						 }
						
					}*/
					
					dto.setCiId(rsMessage.getLong("CI_ID"));
					dto.setDatetime(rsMessage.getTimestamp("DATETIME").toString());	//toLocaleString TODO History Datumsformat
					dto.setChangeSource(rsMessage.getString("SOURCE"));
					dto.setChangeUserCWID(rsMessage.getString("USERNAME"));
					dto.setChangeDBUser(rsMessage.getString("DBUSER"));
					dto.setChangeAttributeName(rsMessage.getString("COLUMN_NAME"));
					dto.setChangeAttributeOldValue(rsMessage.getString("OLD_VALUE"));
					dto.setChangeAttributeNewValue(rsMessage.getString("NEW_VALUE"));
					dto.setInfoType(rsMessage.getString("TABLE_NAME"));
					
					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			System.out.println(e.toString());
			//
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	
	
	/**
	 * updates an existing entry
	 * 
	 * @param cwid
	 * @param dto
	 * @return
	 */
	public static ApplicationEditParameterOutput copyApplication(String cwid,
			Long applicationIdSource, Long applicationIdTarget) {
		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
				// check der InputWerte
				List<String> messages = new ArrayList<String>();

				if (messages.isEmpty()) {

					Session session = HibernateUtil.getSession();
					Transaction tx = null;
					tx = session.beginTransaction();
					Application applicationSource = (Application) session.get(
							Application.class, applicationIdSource);
					
					Application applicationTarget = (Application) session.get(
							Application.class, applicationIdTarget);

					if (null == applicationSource) {
						// application was not found in database
						output.setResult(ApplreposConstants.RESULT_ERROR);
						output.setMessages(new String[] { "the application id "
								+ applicationIdSource + " was not found in database" });
					}
					else if (null == applicationTarget) {
							// application was not found in database
							output.setResult(ApplreposConstants.RESULT_ERROR);
							output.setMessages(new String[] { "the application id "
									+ applicationIdTarget + " was not found in database" });
					} else if (null != applicationTarget.getDeleteTimestamp()) {
						// application is deleted
						output.setResult(ApplreposConstants.RESULT_ERROR);
						output.setMessages(new String[] { "the application id "
								+ applicationIdTarget + " is deleted" });
					} else {
						// application found - change values

						output.setApplicationId(applicationIdTarget);
						
						applicationTarget.setUpdateUser(cwid);
						applicationTarget
								.setUpdateQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
						applicationTarget.setUpdateTimestamp(ApplReposTS
								.getCurrentTimestamp());

						// ======
						// Basics
						// ======
						applicationTarget.setVersion(applicationSource.getVersion());
						applicationTarget.setApplicationCat2Id(applicationSource.getApplicationCat2Id());
						// primary function only view

						applicationTarget.setLifecycleStatusId(applicationSource.getLifecycleStatusId());
						applicationTarget.setOperationalStatusId(applicationSource.getOperationalStatusId());
						applicationTarget.setComments(applicationSource.getComments());
						// TODO business category
						// -------
						
						
						// ==========
						// Agreements
						// ==========
						applicationTarget.setSlaId(applicationSource.getSlaId());
						applicationTarget.setServiceContractId(applicationSource.getServiceContractId());
						applicationTarget.setPriorityLevelId(applicationSource.getPriorityLevelId());
						applicationTarget.setSeverityLevelId(applicationSource.getSeverityLevelId());
						applicationTarget
								.setBusinessEssentialId(applicationSource.getBusinessEssentialId());
						// ----------
						
						// TODO edit more Attributes

						// TODO welche?
						// TODO check ob alle Variablen gesetzt worden sind!
						// ==============================

						applicationTarget.setItSecSbAvailability(applicationSource.getItSecSbAvailability());

						applicationTarget.setItSecSbAvailabilityText(applicationSource.getItSecSbAvailabilityText());
						
						applicationTarget.setClusterCode(applicationSource.getClusterCode());

						applicationTarget.setClusterType(applicationSource.getClusterType());
						
						// der kopierende User wird Responsible
						applicationTarget.setResponsible(cwid);
						// applicationTarget.setResponsible(applicationSource.getResponsible());

						applicationTarget.setSubResponsible(applicationSource.getSubResponsible());

						applicationTarget.setApplicationOwner(applicationSource.getApplicationOwner());
						
						// RFC 8539 
						// applicationTarget.setApplicationSteward(applicationSource.getApplicationSteward());
						applicationTarget.setApplicationSteward(cwid);
						
						applicationTarget.setApplicationOwnerDelegate(applicationSource.getApplicationOwnerDelegate());
						
						
						// ==========
						// compliance
						// ==========
						
						// IT SET only view!
						applicationTarget.setItset(applicationSource.getItset());
						
						applicationTarget.setTemplate(applicationSource.getTemplate());
						
						applicationTarget.setItsecGroupId(null);
						
						applicationTarget.setRefId(null);
						
// TODO anderes Feld?
//						applicationTarget.setRelevanceICS(applicationSource.getRelevanceICS());

//						applicationTarget.setRelevanzITSEC(applicationSource.getRelevanzITSEC());

						applicationTarget.setGxpFlag(applicationSource.getGxpFlag());
						
						
						// ===============
						// License & Costs
						// ===============
						applicationTarget.setLicenseTypeId(applicationSource.getLicenseTypeId());

						applicationTarget.setDedicated(applicationSource.getDedicated());
						applicationTarget.setAccessingUserCount(applicationSource.getAccessingUserCount());
						applicationTarget.setAccessingUserCountMeasured(applicationSource.getAccessingUserCountMeasured());
						applicationTarget.setLoadClass(applicationSource.getLoadClass());
						
						applicationTarget.setCostRunAccountId(applicationSource
										.getCostRunAccountId());
						applicationTarget.setCostChangeAccountId(applicationSource
										.getCostChangeAccountId());

						
						// ----------------
						applicationTarget.setCostRunPa(applicationSource.getCostRunPa());

						applicationTarget.setCostChangePa(applicationSource.getCostChangePa());

						applicationTarget.setCurrencyId(applicationSource.getCurrencyId());
						
						applicationTarget.setCategoryBusiness(applicationSource.getCategoryBusiness());
						
						applicationTarget.setClassDataId(applicationSource.getClassDataId());
						
						applicationTarget.setClassInformationId(applicationSource.getClassInformationId());
						
						applicationTarget.setClassInformationExplanation(applicationSource.getClassInformationExplanation());
						
						applicationTarget.setServiceModel(applicationSource.getServiceModel());
						
						applicationTarget.setOrganisationalScope(applicationSource.getOrganisationalScope());
						
					}

					boolean toCommit = false;
					try {
						if (null == validationMessage) {
						
							if (null != applicationTarget
									&& null != applicationTarget.getDeleteTimestamp()) {
								session.saveOrUpdate(applicationTarget);
								session.flush();
							}
							toCommit = true;
							
						}
					} catch (Exception e) {
						
						String message = e.getMessage();
						log.error(message);
						// handle exception
						output.setResult(ApplreposConstants.RESULT_ERROR);
						
						if (null != message && message.startsWith("ORA-20000: ")) {
							message = message.substring("ORA-20000: ".length());
						}
						
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								toCommit);
						if (toCommit && null != applicationTarget) {
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
			// cwid missing
			output.setResult(ApplreposConstants.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		if (ApplreposConstants.RESULT_ERROR.equals(output.getResult())) {
			// TODO errorcodes / Texte
			if (null != output.getMessages() && output.getMessages().length > 0) {
				output.setDisplayMessage(output.getMessages()[0]);
			}
		}
		
		return output;
	}

	/**
	 * find the connection entries for the tree view
	 * @return
	 */
	public static List<ConnectionsViewDataDTO> findConnectionTreeEntries(String id) {

		ArrayList<ConnectionsViewDataDTO> listResult = new ArrayList<ConnectionsViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		String searchparam = id.toUpperCase();
		
		if (null != searchparam && !searchparam.startsWith("APP-")) {
			searchparam = "APP-" + searchparam;
		}

		
		StringBuffer sql = new StringBuffer();

		sql.append("SELECT level, id, name,  NVL(pid,-1) as pid");
		sql.append(" FROM (");
		sql.append("SELECT lower_id as id, lower_name as name, higher_id as pid");
		sql.append(" FROM TABLE ( PCK_DWH.TREE('").append(searchparam).append("')))"); 
		sql.append(" CONNECT BY NOCYCLE PRIOR id = pid START WITH pid IS NULL");
		
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ConnectionsViewDataDTO dto = new ConnectionsViewDataDTO();
					dto.setLevel(rsMessage.getString("LEVEL"));
					dto.setId(rsMessage.getString("ID"));
					dto.setName(rsMessage.getString("NAME"));
					dto.setPid(rsMessage.getString("PID"));
					listResult.add(dto);
				}
				commit = true;
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			//
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}


	/**
	 * marks all actual references as deleted
	 * @param cwid
	 * @param ciId
	 * @return
	 */
	public static boolean deleteApplicationApplication(String cwid, Long ciId) {
		boolean result = false;

		cwid = cwid.toUpperCase();

		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		String stampSQL = "update ANW_ANW set DEL_QUELLE = '" + ApplreposConstants.APPLICATION_GUI_NAME +"', DEL_TIMESTAMP = current_timestamp, DEL_USER = ? WHERE APP_HIGHER_ID = ? OR APP_LOWER_ID = ? AND del_timestamp IS NULL";
		try {
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setString(1, cwid);
			stmt.setLong(2, ciId);
			stmt.setLong(3, ciId);
			stmt.executeUpdate();
			result = true;
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}

		HibernateUtil.close(tx, session, true);

		return result;
	}

	/**
	 * marks all actual references as deleted
	 * @param cwid
	 * @param ciId
	 * @return
	 */
	public static boolean deleteApplicationItSystem(String cwid, Long ciId) {
		boolean result = false;

		cwid = cwid.toUpperCase();

		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		String stampSQL = "update ANWEND_IT_SYSTEM set DEL_QUELLE = '" + ApplreposConstants.APPLICATION_GUI_NAME +"', DEL_TIMESTAMP = current_timestamp, DEL_USER = ? WHERE ANWENDUNG_ID = ? AND del_timestamp IS NULL";
		try {
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setString(1, cwid);
			stmt.setLong(2, ciId);
			stmt.executeUpdate();
			result = true;
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}

		HibernateUtil.close(tx, session, true);

		return result;
	}

	public static void sendBusinessEssentialChangedMail(Application application, ApplicationDTO dto, Long businessEssentialIdOld) {

		String sendTo = null;
		PersonsDTO personDTO = null;
		
		if (null != application.getApplicationOwner()) {
			List<PersonsDTO> listPersonsDTO = PersonsHbn.findPersonByCWID(application.getApplicationOwner());
			if (1 == listPersonsDTO.size()) {
				personDTO = listPersonsDTO.get(0);
				sendTo = personDTO.getMail();
			}
		}
		
		String cat2TXT = null;
		
		List<ApplicationCat2DTO> listCat2 = ApplicationCat2Hbn.listApplicationCat2Hbn();
		Iterator<ApplicationCat2DTO> itCat2 = listCat2.iterator();
		while (null == cat2TXT && itCat2.hasNext()) {
			ApplicationCat2DTO cat2 = itCat2.next();
			if (cat2.getApplicationCat2Id() == application.getApplicationCat2Id().longValue()) {
				cat2TXT = cat2.getApplicationCat2Text();
			}
		}
		if (null == cat2TXT) {
			cat2TXT = EMPTY + application.getApplicationCat2Id().longValue();
		}
		
		
		String businessEssentialNew = null;
		String businessEssentialOld = null;
		List<BusinessEssentialDTO> listBE = BusinessEssentialHbn.listBusinessEssentialHbn();
		Iterator<BusinessEssentialDTO> itBE = listBE.iterator();
		while (itBE.hasNext()) {
			BusinessEssentialDTO be = itBE.next();
			if (be.getSeverityLevelId().longValue() == application.getBusinessEssentialId().longValue()) {
				businessEssentialNew = be.getSeverityLevel();
			}
			if (be.getSeverityLevelId().longValue() == businessEssentialIdOld.longValue()) {
				businessEssentialOld = be.getSeverityLevel();
			}
		}
		if (null == businessEssentialNew) {
			businessEssentialNew = "---";
		}
		if (null == businessEssentialOld) {
			businessEssentialOld = "---";
		}
		
		
		if (null != sendTo) {
			String copyTo = "itilcenter@bayer.com";
			
			StringBuffer sbSubject = new StringBuffer();
			sbSubject.append(cat2TXT);
			sbSubject.append(" ");
			sbSubject.append(application.getApplicationName());
			sbSubject.append(" is ");
			sbSubject.append(businessEssentialNew);

			StringBuffer sb = new StringBuffer();
			sb.append("Dear ").append(personDTO.getFirstname()).append(" ").append(personDTO.getLastname()).append(",\r\n\r\n");
			sb.append("your CI was set from \"").append(businessEssentialOld).append("\" to \"").append(businessEssentialNew).append("\"\r\n\r\n");
			sb.append("If you have questions about this please contact ITILcenter@bayer.com.\r\n\r\n");
			sb.append("Best Regards\r\n");
			sb.append("ITILcenter Administration");
			ApplReposHbn.sendMail(sendTo, copyTo, sbSubject.toString(), sb.toString(), ApplreposConstants.APPLICATION_GUI_NAME);
		}
		
	}

	private static boolean isNot(String options) {
		if(options == null)
			return false;
		
		boolean isNot = options.indexOf(',') > 0 ? options.split(COMMA)[0].equals(Y) : options.equals(Y);//options != null && 
		
		return isNot;
	}
	
	private static String getLikeNotLikeOperator(boolean isNot) {
		return isNot ? NOT_LIKE : LIKE;
	}
	
	private static String getEqualNotEqualOperator(boolean isNot) {
		return isNot ? NOT_EQUAL : EQUAL;
	}
}

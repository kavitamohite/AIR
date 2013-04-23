package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiBase;
import com.bayerbbs.applrepos.domain.CiBase1;
import com.bayerbbs.applrepos.domain.CiBase2;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.GroupsDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;

public class BaseHbn {
	protected static final String NOT_EQUAL = "<>";
	protected static final String EQUAL = "=";
	protected static final String EMPTY = "";
	protected static final String KOMMA = ",";
	
	protected static final String NOT_LIKE = "not like";
	protected static final String LIKE = "like";
	
	protected static final String Y = "Y";
	protected static final String N = "N";
	protected static final String DELETE = "-1";
	
	
	public static <T> T findById(Class<T> ci, Long id) {
		Session session = HibernateUtil.getSession();

		T t = (T)session.get(ci, id);

		return t;
	}
	
	protected static List<String> validateCi(CiBaseDTO dto) {//, List<CiBaseDTO> listCi
		List<String> messages = new ArrayList<String>();
		
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();


		if (!StringUtils.isNullOrEmpty(dto.getCiOwnerDelegateHidden())) {//getSubResponsibleHidden
			List<PersonsDTO> listPersons = PersonsHbn.findPersonByCWID(dto.getCiOwnerDelegateHidden());
			if (null == listPersons || listPersons.isEmpty()) {
				// not a valid person, maybe a group?
				GroupsDTO group = GroupHbn.findGroupByName(dto.getCiOwnerDelegate());//getSubResponsible
				if (null == group) {
					messages.add(errorCodeManager.getErrorMessage("1107")); // "subresponsible is not valid");
				}
				else {
					// sub responsible is a valid group
//					dto.setSubResponsibleHidden(dto.getSubResponsible());
					dto.setCiOwnerDelegateHidden(dto.getCiOwnerDelegate());//
				}
			}
			else if (1 != listPersons.size()) {
				messages.add(errorCodeManager.getErrorMessage("1108")); 
			}
		}
		
		return messages;
		
		/*
		if (StringUtils.isNullOrEmpty(dto.getName())) {
			messages.add("name must not be is empty");
		}
		else {
			List<CiItemDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName());
//			List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), dto.getTableId(), false);//true
			
			if (!listCi.isEmpty()) {
				// check if the name is unique
				if (dto.getId().longValue() != listCi.get(0).getId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1100", dto.getName()));
				}
			}
		}

		//evtl. ber�cksichtigen, dass nicht alle CI-Typen einen alias haben. Z.B wenn CI-Typ ohne Alias "-1" zur�ckgibt
		//nicht den Namen f�r den Alias setzen.
		if (StringUtils.isNullOrEmpty(dto.getAlias())) {
			// messages.add("application alias is empty");
			dto.setAlias(dto.getName());
		}
		else {
			List<CiItemDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getAlias());
//			List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getAlias(), dto.getTableId(), false);//true

			if (!listCi.isEmpty()) {
				// check if the alias is unique
				if (dto.getId().longValue() != listCi.get(0).getId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1101", dto.getAlias()));
				}
			}
		}
		
		if (null == dto.getTemplate()) {
			// TODO 1 TESTCODE Template
			dto.setTemplate(new Long(0)); // no template
		}


		return messages;*/
	}

	
	protected static boolean isNot(String options) {
		if(options == null)
			return false;
		
		boolean isNot = options.indexOf(',') > 0 ? options.split(KOMMA)[0].equals(Y) : options.equals(Y);//options != null && 
		
		return isNot;
	}
	
	protected static String getLikeNotLikeOperator(boolean isNot) {
		return isNot ? NOT_LIKE : LIKE;
	}
	
	protected static String getEqualNotEqualOperator(boolean isNot) {
		return isNot ? NOT_EQUAL : EQUAL;
	}
	
	protected static void setUpCi(CiBase1 ci, CiBaseDTO ciDTO, String cwid, boolean isCiCreate) {
		if (null != ciDTO.getCiOwnerHidden()) {
			if(StringUtils.isNullOrEmpty(ciDTO.getCiOwnerHidden())) {
				ci.setCiOwner(null);
			}
			else {
				ci.setCiOwner(ciDTO.getCiOwnerHidden());
			}
		}
		
		Long itSet = null;
		String strItSet = ApplReposHbn.getItSetFromCwid(ciDTO.getCiOwner());
		if (null != strItSet) {
			itSet = Long.parseLong(strItSet);
			ci.setItset(itSet);
		}
		
		
		CiBase ci0 = (CiBase)ci;
		setUpCi(ci0, ciDTO, cwid, isCiCreate);
	}
	
	protected static void setUpCi(CiBase2 ci, CiBaseDTO ciDTO, String cwid, boolean isCiCreate) {
		if (null != ciDTO.getCiOwnerHidden()) {
			if(StringUtils.isNullOrEmpty(ciDTO.getCiOwnerHidden())) {
				ci.setCiOwner(null);
			}
			else {
				ci.setCiOwner(ciDTO.getCiOwnerHidden());
			}
		}
		
		Long itSet = null;
		String strItSet = ApplReposHbn.getItSetFromCwid(ciDTO.getCiOwner());
		if (null != strItSet) {
			itSet = Long.parseLong(strItSet);
		}
		if (null == itSet) {
			// set default itSet
			itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
		}
		ci.setItset(itSet);
		
		
		CiBase ci0 = (CiBase)ci;
		setUpCi(ci0, ciDTO, cwid, isCiCreate);
	}
	
	private static void setUpCi(CiBase ci, CiBaseDTO ciDTO, String cwid, boolean isCiCreate) {
//	protected <T extends CiBase>  void setUpCi(T ci, CiBaseDTO ciDTO, String cwid) {
		ci.setName(ciDTO.getName());
		
		
		if(isCiCreate) {
			ci.setInsertUser(cwid);
			ci.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			ci.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
	
			// ci - update values
			ci.setUpdateUser(ci.getInsertUser());
			ci.setUpdateQuelle(ci.getInsertQuelle());
			ci.setUpdateTimestamp(ci.getInsertTimestamp());
		} else {
			ci.setUpdateUser(cwid);
			ci.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			ci.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
		}
		
		
//		if (null != ciDTO.getCiOwnerHidden()) {
//			if(StringUtils.isNullOrEmpty(ciDTO.getCiOwnerHidden())) {
//				ci.setCiOwner(null);
//			}
//			else {
//				ci.setCiOwner(ciDTO.getCiOwnerHidden());
//			}
//		}
		if (null != ciDTO.getCiOwnerDelegateHidden()) {
			if(StringUtils.isNullOrEmpty(ciDTO.getCiOwnerDelegateHidden())) {
				ci.setCiOwnerDelegate(null);
			}
			else {
				ci.setCiOwnerDelegate(ciDTO.getCiOwnerDelegateHidden());
			}
		}
		
		
		if (null != ciDTO.getSlaId()) {
			if (-1 == ciDTO.getSlaId()) {
				ci.setSlaId(null);
			}
			else {
				ci.setSlaId(ciDTO.getSlaId());
			}
		}
		if (null != ciDTO.getServiceContractId() || null != ciDTO.getSlaId()) {
			// wenn SLA gesetzt ist, und ServiceContract nicht, dann muss der Service Contract gel�scht werden
			ci.setServiceContractId(ciDTO.getServiceContractId());
		}
		
		
		if (null != ciDTO.getItSecSbAvailabilityId()) {
			if (-1 == ciDTO.getItSecSbAvailabilityId()) {
				ci.setItSecSbAvailability(null);
			}
			else if (0 != ciDTO.getItSecSbAvailabilityId().longValue()) {
				ci.setItSecSbAvailability(ciDTO.getItSecSbAvailabilityId());
			}
		}
		if (null != ciDTO.getItSecSbAvailabilityTxt()) {//getItSecSbAvailabilityDescription
			ci.setItSecSbAvailabilityTxt(ciDTO.getItSecSbAvailabilityTxt());//getItSecSbAvailabilityDescription
		}
		
		
		if (null != ciDTO.getItSecSbIntegrityId()) {
			if (-1 == ciDTO.getItSecSbIntegrityId()) {
				ci.setItSecSbIntegrityId(null);
			}
			else if (0 != ciDTO.getItSecSbIntegrityId().longValue()) {
				ci.setItSecSbIntegrityId(ciDTO.getItSecSbIntegrityId());
			}
		}
		if (null != ciDTO.getItSecSbIntegrityTxt()) {
			ci.setItSecSbIntegrityTxt(ciDTO.getItSecSbIntegrityTxt());
		}
		
		
		if (null != ciDTO.getItSecSbConfidentialityId()) {
			if (-1 == ciDTO.getItSecSbConfidentialityId()) {
				ci.setItSecSbConfidentialityId(null);
			}
			else if (0 != ciDTO.getItSecSbConfidentialityId().longValue()) {
				ci.setItSecSbConfidentialityId(ciDTO.getItSecSbConfidentialityId());
			}
		}
		if (null != ciDTO.getItSecSbConfidentialityTxt()) {
			ci.setItSecSbConfidentialityTxt(ciDTO.getItSecSbConfidentialityTxt());
		}
		

		
		if (isCiCreate && null == ciDTO.getTemplate()) {
			ciDTO.setTemplate(new Long(0)); // no template
		}
		if (null != ciDTO.getTemplate()) {
			if (-1 == ciDTO.getTemplate()) {
				ci.setTemplate(null);
			}
			else {
				ci.setTemplate(ciDTO.getTemplate());
			}
		}
		
		if (null != ciDTO.getItsecGroupId() && 0 != ciDTO.getItsecGroupId()) {
			if (-1 == ciDTO.getItsecGroupId()) {
				ci.setItsecGroupId(null);
			}
			else {
				ci.setItsecGroupId(ciDTO.getItsecGroupId());
			}
		}
		
		if (null != ciDTO.getRefId()) {
			if (-1 == ciDTO.getRefId()) {
				ci.setRefId(null);
			}
			else {
				ci.setRefId(ciDTO.getRefId());
			}
		}
		
		if (null == ciDTO.getRelevanzItsec()) {
			if (Y.equals(ciDTO.getRelevanceGR1435())) {
				ciDTO.setRelevanzItsec(new Long(-1));
			}
			else if (N.equals(ciDTO.getRelevanceGR1435())) {
				ciDTO.setRelevanzItsec(new Long(0));
			}
		}
		if (null == ciDTO.getRelevanceICS()) {
			if (Y.equals(ciDTO.getRelevanceGR1920())) {
				ciDTO.setRelevanceICS(new Long(-1));
			}
			else if (N.equals(ciDTO.getRelevanceGR1920())) {
				ciDTO.setRelevanceICS(new Long(0));
			}
		}
		
		ci.setRelevanceITSEC(ciDTO.getRelevanzItsec());
		ci.setRelevanceICS(ciDTO.getRelevanceICS());
		
		
		if (null == ciDTO.getGxpFlag()) {
			//	we don't know, let the current value 
		}
		else {
			if (EMPTY.equals(ciDTO.getGxpFlag())) {
				ci.setGxpFlag(null);
			}
			else {
				ci.setGxpFlag(ciDTO.getGxpFlag());
			}
		}
	}
	
	static <T> CiEntityEditParameterOutput deleteCi(String cwid, CiBaseDTO dto, Class<T> clazz) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			if (null != dto.getId()	&& 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// TODO check der InputWerte
				Session session = HibernateUtil.getSession();
				Transaction tx = null;
				tx = session.beginTransaction();
				
//				T ci = findById(clazz, id);
				CiBase ci = (CiBase) session.get(clazz, id);
				
				if (null == ci) {
					// application was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the "+clazz.getClass().getName()+" id "	+ id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == ci.getDeleteTimestamp()) {
					ci.setDeleteUser(cwid);
					ci.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					ci.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(ci);
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
					output.setMessages(new String[] { "the "+clazz.getClass().getName()+" is already deleted" });
				}

			} else {
				// application id is missing
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the "+clazz.getClass().getName()+" id is missing or invalid" });
			}

		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}
	
	private static final Log log = LogFactory.getLog(BaseHbn.class);

}

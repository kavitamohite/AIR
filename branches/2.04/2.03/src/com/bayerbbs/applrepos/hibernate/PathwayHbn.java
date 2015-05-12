package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
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

import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;



public class PathwayHbn extends BaseHbn{

	private static final Log log = LogFactory.getLog(PathwayHbn.class);

	public static Ways findById(Long Id) {
		return findById(Ways.class,Id);
	}


public static CiEntityEditParameterOutput createPathway(String cwid,
		PathwayDTO pathwayDTO, boolean forceOverride) {
	CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

	if (null != cwid) {

		cwid = cwid.toUpperCase();

		if (null != pathwayDTO.getId() && pathwayDTO.getId() == 0) {
			List<String> messages = validatePathway(pathwayDTO, false);
			
			if(messages.isEmpty()){
				Ways way = new Ways();
				Session session = HibernateUtil.getSession();
				Transaction tx = null;
				tx = session.beginTransaction();
				setUpCi(way, pathwayDTO, cwid, true);
				
				boolean autoCommit = false;
				try{
					session.save(way);
					session.flush();
					autoCommit = true;
					
				}catch (Exception e) {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[]{e.getMessage()});
				}finally{
					String hbnMessage = HibernateUtil.close(tx, session, autoCommit);
					if(autoCommit){
						if(hbnMessage == null){
							output.setResult(AirKonstanten.RESULT_OK);
							output.setMessages(new String[]{EMPTY});
							output.setTableId(AirKonstanten.TABLE_ID_WAYS);
						}else{
							output.setResult(AirKonstanten.RESULT_ERROR);
							output.setMessages(new String[]{hbnMessage});
						}
					}
					
				}
			}else {
				// messages
				output.setResult(AirKonstanten.RESULT_ERROR);
				String astrMessages[] = new String[messages.size()];
				for (int i = 0; i < messages.size(); i++) {
					astrMessages[i] = messages.get(i);
				}
				output.setMessages(astrMessages);
			}

		}else{
			// ci id not 0
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the ci id should be 0" });
		}

	} else {
		// cwid missing
		output.setResult(AirKonstanten.RESULT_ERROR);
		output.setMessages(new String[] { "cwid missing" });
	}
	return output;

}
private static List<String> validatePathway(PathwayDTO pathwayDTO,
		boolean isUpdate) {
	Ways way = findByName(pathwayDTO.getName());
	
	boolean alreadyExist = isUpdate ? way !=null && way.getId().longValue()!= pathwayDTO.getId().longValue():way != null;
	List<String> messages = new ArrayList<String>();
	if(alreadyExist){
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();
		messages.add(errorCodeManager.getErrorMessage("10000",null));
	}
	return messages;

}
public static Ways findByName(String name) {
	Session session = HibernateUtil.getSession();
	Query q = session.getNamedQuery("findPathwayByName");
	q.setParameter("name", name);

	Ways way = (Ways) q.uniqueResult();
	return way;

}
private static void setUpCi(Ways ci, PathwayDTO ciDTO, String cwid, boolean isCiCreate) {
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
		
		
		if (null != ciDTO.getCiOwnerHidden()) {
			if(StringUtils.isNullOrEmpty(ciDTO.getCiOwnerHidden())) {
			ci.setCiOwner(null);
			}
			else {
				ci.setCiOwner(ciDTO.getCiOwnerHidden());
			}
		}
		if (null != ciDTO.getCiOwnerDelegate()) {
			if(StringUtils.isNullOrEmpty(ciDTO.getCiOwnerDelegateHidden())) {
				ci.setCiOwnerDelegate(null);
			}
			else {
				ci.setCiOwnerDelegate(ciDTO.getCiOwnerDelegate());
			}

		
		if (isCiCreate && null == ciDTO.getTemplate()) {
			ciDTO.setTemplate(new Long(0)); // no template
		}
		if (null != ciDTO.getTemplate()) {

			ci.setTemplate(ciDTO.getTemplate());

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
			if (-1 == ciDTO.getRefId() || 0 == ciDTO.getRefId()) {
				ci.setRefId(null);
				// Anlegen der ITSec Massnahmen
				ItsecMassnahmeStatusHbn.saveSaveguardAssignment(ciDTO.getTableId(), ci.getId(), ci.getItsecGroupId());
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
}

public static CiItemsResultDTO findPathwayBy(ApplicationSearchParamsDTO input) {
	CiMetaData metaData = new CiMetaData("WAYS_ID", "WAYS_NAME", null, "land_kennzeichen", "Ways", "way", AirKonstanten.TABLE_ID_WAYS);
	return findPathwayCisBy(input, metaData);
}
public static CiItemsResultDTO findPathwayCisBy(CiSearchParamsDTO input, CiMetaData metaData) {
	if(!LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
		return new CiItemsResultDTO();//new CiItemDTO[0];
	
	StringBuilder sql = getAdvSearchCiBaseSql(input, metaData);
	
	List<CiItemDTO> cis = new ArrayList<CiItemDTO>();

	Session session = null;
	Transaction ta = null;
	Statement stmt = null;//PreparedStatement
	ResultSet rs = null;
	
	Integer start = input.getStart();
	Integer limit = input.getLimit();
	Integer i = 0;
	boolean commit = false;
	
	try {
		session = HibernateUtil.getSession();
		ta = session.beginTransaction();
		@SuppressWarnings("deprecation")
		Connection conn = session.connection();
		stmt = conn.createStatement();
		rs = stmt.executeQuery(sql.toString());

		
		if(null == start)
			start = 0;
		if(null == limit)
			limit = 20;
		
		CiItemDTO ci = null;
		
		while(rs.next()) {
			if(i >= start && i < limit + start) {
				ci = new CiItemDTO();
				ci.setId(rs.getLong(metaData.getIdField()));
				ci.setName(rs.getString(metaData.getNameField()));
				if(metaData.getAliasField() != null)
					ci.setAlias(rs.getString(metaData.getAliasField()));
				ci.setApplicationCat1Txt(metaData.getTypeName());
				ci.setCiOwner(rs.getString("responsible"));
				ci.setCiOwnerDelegate(rs.getString("sub_responsible"));
				ci.setTableId(metaData.getTableId());
				ci.setDeleteQuelle(rs.getString("del_quelle"));
				
				cis.add(ci);
				//i++;
			}// else break;
			
			i++;
		}
					
		ta.commit();
		rs.close();
		stmt.close();
		conn.close();
		
		commit = true;
	} catch(SQLException e) {
		if(ta.isActive())
			ta.rollback();
		
		System.out.println(e);
	} finally {
		HibernateUtil.close(ta, session, commit);

	}
	
	CiItemsResultDTO result = new CiItemsResultDTO();
	result.setCiItemDTO(cis.toArray(new CiItemDTO[0]));
	result.setCountResultSet(i);//i + start
	return result;
}	
protected static StringBuilder getAdvSearchCiBaseSql(CiSearchParamsDTO input, CiMetaData metaData) {
	StringBuilder sql = new StringBuilder();
	
	sql.
	append("SELECT ").append(metaData.getIdField()).append(", ").append(metaData.getNameField());
	

	
	
	//cwid_verantw_betr statt responsible
	sql.append(", responsible, sub_responsible, del_quelle FROM ").append(metaData.getTableName()).append(" WHERE 1=1 ");

//	append(" hw_ident_or_trans = ").append(input.getCiSubTypeId()).
	if(input.getShowDeleted() == null || !input.getShowDeleted().equals(AirKonstanten.YES_SHORT))
		sql.append(" AND del_quelle IS NULL");
	
	sql.append(" AND UPPER(").append(metaData.getNameField()).append(") LIKE '");
	
	if(CiEntitiesHbn.isLikeStart(input.getQueryMode()))
		sql.append("%");
	
	sql.append(input.getCiNameAliasQuery().toUpperCase());
	
	if(CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
		sql.append("%");
	
	sql.append("'");

	boolean isNot = false;
	
	
	if(StringUtils.isNotNullOrEmpty(input.getItSetId())) {
		isNot = isNot(input.getItSetOptions());
		sql.append(" AND NVL(itset, 0) "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getItSetId()));
	}
	
	if(StringUtils.isNotNullOrEmpty(input.getBusinessEssentialId())) {
		isNot = isNot(input.getBusinessEssentialOptions());
		sql.append(" AND business_essential_id "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getBusinessEssentialId()));
	}
	
	if(StringUtils.isNotNullOrEmpty(input.getItSecGroupId())) {
		isNot = isNot(input.getItSecGroupOptions());
		sql.append(" AND NVL(itsec_gruppe_id, -1) "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getItSecGroupId()));
	}
	
	if(StringUtils.isNotNullOrEmpty(input.getSource())) {
		isNot = isNot(input.getSourceOptions());
		sql.append(" AND insert_quelle "+ getEqualNotEqualOperator(isNot) +" '").append(input.getSource()).append("'");
	}
	
	if(StringUtils.isNotNullOrEmpty(input.getCiOwnerHidden())) {
		isNot = isNot(input.getCiOwnerOptions());
		
		sql.append(" AND ");
		if(isNot)
			sql.append("UPPER(responsible) IS NULL OR ");
		
		sql.append("UPPER(responsible) " + getLikeNotLikeOperator(isNot) + " '").append(input.getCiOwnerHidden().toUpperCase()).append("'");
	}
	
	if(StringUtils.isNotNullOrEmpty(input.getCiOwnerDelegate())) {
		boolean isCwid = input.getCiOwnerDelegate().indexOf(')') > -1;
		String delegate = isCwid ? input.getCiOwnerDelegateHidden() : input.getCiOwnerDelegate();//gruppe oder cwid?
		
		isNot = isNot(input.getCiOwnerDelegateOptions());
		
		sql.append(" AND ");
		if(isNot)
			sql.append("UPPER(sub_responsible) IS NULL OR ");
		
		sql.append("UPPER(sub_responsible) "+ getLikeNotLikeOperator(isNot) +" '").append(delegate.toUpperCase()).append("'");
		
		if(!isCwid)
			sql.insert(sql.length() - 2, '%');
	}
	


	return sql;
}


}
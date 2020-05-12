/**
 * 
 */
package com.bayerbbs.applrepos.hibernate;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.regex.Pattern;

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
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.CiBase;
import com.bayerbbs.applrepos.domain.CiBase1;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.domain.Function;
import com.bayerbbs.applrepos.domain.FunctionDTO;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.dto.TerrainDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;

/**
 * @author equuw
 * 
 */
public class functionHbn extends BaseHbn {

	private static final Log log = LogFactory.getLog(functionHbn.class);

	public static Function findById(Long Id) {
		return findById(Function.class, Id);
	}

	public static CiEntityEditParameterOutput createFunction(String cwid,
			FunctionDTO functionDTO, boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		Long id = null;

		if (null != cwid) {

			cwid = cwid.toUpperCase();

			if (null != functionDTO.getId() && functionDTO.getId() == 0) {
				List<String> messages = validateFunction(functionDTO, false);

				if (messages.isEmpty()) {
					Function function = new Function();
					Session session = HibernateUtil.getSession();
					Transaction tx = null;
					tx = session.beginTransaction();
					setUpCi(function, functionDTO, cwid, true);

					boolean autoCommit = false;
					try {
						id = (Long) session.save(function);
						//EUGXS
						//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
						ComplianceHbn.setComplienceRequest(id,functionDTO,cwid);
						session.flush();
						autoCommit = true;

					} catch (Exception e) {
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { e.getMessage() });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								autoCommit);
						if (autoCommit) {
							if (hbnMessage == null) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
								output.setTableId(AirKonstanten.TABLE_ID_FUNCTION);
								output.setCiId(id);
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
	//EUGXS
	//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
	
	public static CiEntityEditParameterOutput copyFunction(String cwid, Long pathwayIdSource, Long pathwayIdTarget, String ciNameTarget, String ciAliasTarget) {
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
				Function pathwaySource = (Function) session.get(Function.class, pathwayIdSource);
				Function pathwayTarget = null;
				if (null == pathwayIdSource) {
					// Komplette Neuanlage des Datensatzes mit Insert/Update-Feldern
					
					pathwayTarget = new Function();
					// schrank - insert values
					pathwayTarget.setInsertUser(cwid);
					pathwayTarget.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					pathwayTarget.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

					// schrank - update values
					pathwayTarget.setUpdateUser(pathwayTarget.getInsertUser());
					pathwayTarget.setUpdateQuelle(pathwayTarget.getInsertQuelle());
					pathwayTarget.setUpdateTimestamp(pathwayTarget.getInsertTimestamp());
					
					
					pathwayTarget.setFunctionName(ciNameTarget); 
					 
					pathwayTarget.setCiOwner(cwid.toUpperCase());
					pathwayTarget.setCiOwnerDelegate(pathwaySource.getCiOwnerDelegate());
					pathwayTarget.setTemplate(pathwaySource.getTemplate());
					
					pathwayTarget.setRelevanceITSEC(pathwaySource.getRelevanceITSEC());
					/*--ELERJ ICS--*/
//					pathwayTarget.setRelevanceICS(pathwaySource.getRelevanceICS());

				}
				else {
					// Reaktivierung / Übernahme des bestehenden Datensatzes
					pathwayTarget = (Function) session.get(Function.class, pathwayIdTarget);
					// room found - change values
					output.setCiId(pathwayIdTarget);
					
					pathwayTarget.setUpdateUser(cwid);
					pathwayTarget.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					pathwayTarget.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
				}
				if (null == pathwaySource) {
					// itsystem was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the function id "	+ pathwayIdSource + " was not found in database" });
				}
				else if (null != pathwayTarget.getDeleteTimestamp()) {
					// room is deleted
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the function id "	+ pathwayIdTarget + " is deleted" });
				}else {

					//pathwayTarget.setSeverityLevelId(pathwaySource.getSeverityLevelId());
					//pathwayTarget.setBusinessEssentialId(pathwaySource.getBusinessEssentialId());

					// ==============================
					
					
					// der kopierende User wird Responsible
					pathwayTarget.setCiOwner(cwid);
					pathwayTarget.setCiOwnerDelegate(pathwaySource.getCiOwnerDelegate());
					
					// ==========
					// compliance
					// ==========
					
					// IT SET only view!
					pathwayTarget.setItset(pathwaySource.getItset());
					pathwayTarget.setTemplate(pathwaySource.getTemplate());
					pathwayTarget.setItsecGroupId(null);
					pathwayTarget.setRefId(null);
					
				}
				boolean toCommit = false;
				try {
					if (null == validationMessage) {
						if (null != pathwayTarget && null == pathwayTarget.getDeleteTimestamp()) {
							session.saveOrUpdate(pathwayTarget);
							session.flush();
							
							output.setCiId(pathwayTarget.getId());
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
				}finally {
					String hbnMessage = HibernateUtil.close(tx, session, toCommit);
					if (toCommit && null != pathwayTarget) {
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
	
	
	
	
	public static void getFunction(FunctionDTO dto, Function function) {
		dto.setTableId(AirKonstanten.TABLE_ID_FUNCTION);
		getCiFunction((CiBaseDTO) dto,  function);

		//dto.setLandId(site.getLandId());
	}
	
	public static void getCiFunction(CiBaseDTO ciDTO, Function ci)  
	{

		ciDTO.setCiOwnerDelegate(ci.getCiOwnerDelegate());
		/*--ELERJ GXP---*/
//		ciDTO.setGxpFlag(ci.getGxpFlag()); 
		ciDTO.setItsecGroupId(ci.getItsecGroupId());
		
		ciDTO.setItset(ci.getItset());
		ciDTO.setRefId(ci.getRefId());
//		ciDTO.setRelevanceICS(ci.getRelevanceICS());
		ciDTO.setRelevanzItsec(ci.getRelevanceITSEC());
		
		ciDTO.setTemplate(ci.getTemplate());
		

		String strSQL = "SELECT DBMS_LOB.SUBSTR(WM_CONCAT(Group_Type_Name),4000,1) FROM V_MD_GROUP_TYPE";
		switch (ciDTO.getTableId())
		{
		case AirKonstanten.TABLE_ID_APPLICATION:
			strSQL +=  " WHERE Visible_Application = 1";
			break;
		case AirKonstanten.TABLE_ID_IT_SYSTEM:
			strSQL +=  " WHERE Visible_Itsystem = 1";
			break;
		case AirKonstanten.TABLE_ID_POSITION:
		case AirKonstanten.TABLE_ID_ROOM:
		case AirKonstanten.TABLE_ID_BUILDING_AREA: 
		case AirKonstanten.TABLE_ID_BUILDING: 
		case AirKonstanten.TABLE_ID_TERRAIN: 
		case AirKonstanten.TABLE_ID_SITE:
		case AirKonstanten.TABLE_ID_FUNCTION:
			strSQL +=  " WHERE Visible_Location = 1";
			break;			
		}
		Pattern pattern = Pattern.compile("\\([A-Z]{2,8}\\)$");						// look for CWID 
    	Pattern replace = Pattern.compile("[\\(\\)]");								// replace parentheses
		Hashtable<String,String> tableContacts = new Hashtable<String,String>();
		Session session = HibernateUtil.getSession();
		//ciDTO.setDownStreamAdd((String) session.createSQLQuery("SELECT DBMS_LOB.SUBSTR(WM_CONCAT(Id), 4000, 1) FROM TABLE(Pck_Air.FT_RelatedCIs(:Table_Id, :Id, :Direction)) WHERE Table_Id IN (1, 2)").setLong("Table_Id", ciDTO.getTableId()).setLong("Id", ci.getId()).setString("Direction",AirKonstanten.DN).uniqueResult());
		// ETNTX - IM0006168023 - Copy was not working for Location CI for Function CR will be created seperatly
		ciDTO.setDownStreamAdd((String) session.createSQLQuery("SELECT DBMS_LOB.SUBSTR(listagg(Id) within group(order by Id), 4000, 1) FROM TABLE(Pck_Air.FT_RelatedCIs(:Table_Id, :Id, :Direction)) WHERE Table_Id IN (1, 2)").setLong("Table_Id", ciDTO.getTableId()).setLong("Id", ci.getId()).setString("Direction",AirKonstanten.DN).uniqueResult());
		session.close();
		for (String[] grouptype : AirKonstanten.GPSCGROUP_MAPPING) 
		{
			if (tableContacts.containsKey(grouptype[3]))
			{
				String contact = tableContacts.get(grouptype[3]);
				char d[] = grouptype[1].toCharArray();
				d[0] = String.valueOf(d[0]).toUpperCase().charAt(0);
				String method = "set" + new String(d);
				String methodHidden = "set" + new String(d) + AirKonstanten.GPSCGROUP_HIDDEN_DESCRIPTOR;
				try
				{
					CiBaseDTO.class.getMethod(method, new Class[]{ String.class }).invoke( ciDTO, new Object[]{ contact} );
				}
				catch (Exception e)
				{
					System.out.println(e.toString());					
				}
				try
				{
					CiBaseDTO.class.getMethod(methodHidden, new Class[]{ String.class }).invoke( ciDTO, new Object[]{ contact} );
				}
				catch (Exception e)
				{
					System.out.println(e.toString());					
				}
			}
		}
	
		
	}


			//EUGXS 
			//IM0008125159 - Cleanup function CI BS-ITO-ITPI-APM-CPS Group head => 18-2,19-2

	public static CiEntityEditParameterOutput deleteFunction(String cwid, Long id) {
		
		
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		// TODO check validate token

		if (null != cwid) {
			cwid = cwid.toUpperCase();
//			if (null != dto.getId()	&& 0 < dto.getId().longValue()) {
//				Long id = new Long(dto.getId());
			if(id != null) {

				// TODO check der InputWerte
				Session session = HibernateUtil.getSession();
				Transaction tx = null;
				tx = session.beginTransaction();
				Function function = (Function) session.get(Function.class, id);
				if (null == function) {
					// Function was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the Function id "	+ id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == function.getDeleteTimestamp()) {
					function.setDeleteUser(cwid);
					function.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					function.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(function);
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
					// function is already deleted
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the Function is already deleted" });
				}

			} else {
				// application id is missing
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the Function id is missing or invalid" });
			}

		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
		

	}
	
	
	

	private static List<String> validateFunction(FunctionDTO functionDTO,
			boolean isUpdate) {
		Function function = findByName(functionDTO.getName());

		List<String> messages = validateCi(functionDTO);

		boolean alreadyExist = isUpdate ? function != null
				&& function.getId().longValue() != functionDTO.getId()
						.longValue() : function != null;
		if (alreadyExist) {
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();
			messages.add(errorCodeManager.getErrorMessage("10000", null));
		}
		return messages;

	}

	public static Function findByName(String name) {
		Session session = HibernateUtil.getSession();
		Query q = session.getNamedQuery("findFunctionByName");
		q.setParameter("name", name);

		Function function = (Function) q.uniqueResult();
		return function;

	}

	public static CiItemsResultDTO findFunctionBy(
			ApplicationSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("FUNCTION_ID", "FUNCTION_NAME",
				null, "land_kennzeichen", "Function", "function",
				AirKonstanten.TABLE_ID_FUNCTION, null, null, null);
		return findFunctionCisBy(input, metaData);
	}

	public static CiItemsResultDTO findFunctionCisBy(CiSearchParamsDTO input,
			CiMetaData metaData) {
		if (!LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			return new CiItemsResultDTO();// new CiItemDTO[0];

		StringBuilder sql = getAdvSearchCiBaseSql(input, metaData);

		List<CiItemDTO> cis = new ArrayList<CiItemDTO>();

		Session session = null;
		Transaction ta = null;
		Statement stmt = null;// PreparedStatement
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

			if (null == start)
				start = 0;
			if (null == limit)
				limit = 20;

			CiItemDTO ci = null;

			while (rs.next()) {
				if (i >= start && i < limit + start) {
					ci = new CiItemDTO();
					ci.setId(rs.getLong(metaData.getIdField()));
					ci.setName(rs.getString(metaData.getNameField()));
					if (metaData.getAliasField() != null)
						ci.setAlias(rs.getString(metaData.getAliasField()));
					ci.setApplicationCat1Txt(metaData.getTypeName());
					ci.setCiOwner(rs.getString("responsible"));
					ci.setCiOwnerDelegate(rs.getString("sub_responsible"));
					ci.setTableId(metaData.getTableId());
					ci.setDeleteQuelle(rs.getString("del_quelle"));

					cis.add(ci);
					// i++;
				}// else break;

				i++;
			}

			ta.commit();
			rs.close();
			stmt.close();
			conn.close();

			commit = true;
		} catch (SQLException e) {
			if (ta.isActive())
				ta.rollback();

			System.out.println(e);
		} finally {
			HibernateUtil.close(ta, session, commit);

		}

		CiItemsResultDTO result = new CiItemsResultDTO();
		result.setCiItemDTO(cis.toArray(new CiItemDTO[0]));
		result.setCountResultSet(i);// i + start
		return result;
	}

	protected static StringBuilder getAdvSearchCiBaseSql(
			CiSearchParamsDTO input, CiMetaData metaData) {
		StringBuilder sql = new StringBuilder();
		// Start Adding for C0000241362 
		String complainceGR1435=input.getComplainceGR1435();
//		String complainceICS=input.getComplainceICS();
				long complainceGR1435Long=0;
//				long complainceICSLong=0;
				System.out.println("complainceGR1435"+complainceGR1435);
//				System.out.println("complainceICS"+complainceICS);
				//IM0005978424 
				if(complainceGR1435!=null&&complainceGR1435.equalsIgnoreCase("Yes"))
					
					complainceGR1435Long = -1;
				//IM0005978424 
				if(complainceGR1435!=null&&complainceGR1435.equalsIgnoreCase("No"))
					complainceGR1435Long=0;
				//IM0005978424 
				/*if(complainceICS!=null&&complainceICS.equalsIgnoreCase("Yes"))
					complainceICSLong = -1;
				//IM0005978424 
				if(complainceICS!=null&&complainceICS.equalsIgnoreCase("No"))
					complainceICSLong=0;
				*/// End Adding for C0000241362
		sql.append("SELECT ").append(metaData.getIdField()).append(", ")
				.append(metaData.getNameField());

		// cwid_verantw_betr statt responsible
		sql.append(", responsible, sub_responsible, del_quelle FROM ")
				.append(metaData.getTableName()).append(" WHERE 1=1 ");

		// append(" hw_ident_or_trans = ").append(input.getCiSubTypeId()).
		if (input.getShowDeleted() == null
				|| !input.getShowDeleted().equals(AirKonstanten.YES_SHORT))
			sql.append(" AND del_quelle IS NULL");
		// start Adding for C0000241362
				// RELEVANCE_ICS
	/*	if(complainceICS!=null&&complainceICS.length()>0)
		{
				sql.append(" AND UPPER (RELEVANCE_ICS) = '"+complainceICSLong+"'");
				
				System.out.println("complainceGR1435Long appened"+complainceICSLong);
		}*/
				// RELEVANZ_ITSEC
		if(complainceGR1435!=null&&complainceGR1435.length()>0)
		{
				sql.append("AND  UPPER (RELEVANZ_ITSEC) = '"+complainceGR1435Long+"'");
				
		System.out.println("complainceGR1435Long appened"+complainceGR1435Long);
		}
				// End Adding for C0000241362
		sql.append(" AND UPPER(").append(metaData.getNameField())
				.append(") LIKE '");

		if (CiEntitiesHbn.isLikeStart(input.getQueryMode()))
			sql.append("%");

		sql.append(input.getCiNameAliasQuery().toUpperCase());

		if (CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
			sql.append("%");

		sql.append("'");

		boolean isNot = false;

		if (StringUtils.isNotNullOrEmpty(input.getItSetId())) {
			isNot = isNot(input.getItSetOptions());
			sql.append(
					" AND NVL(itset, 0) " + getEqualNotEqualOperator(isNot)
							+ " ").append(Long.parseLong(input.getItSetId()));
		}

		if (StringUtils.isNotNullOrEmpty(input.getBusinessEssentialId())) {
			isNot = isNot(input.getBusinessEssentialOptions());
			sql.append(
					" AND business_essential_id "
							+ getEqualNotEqualOperator(isNot) + " ").append(
					Long.parseLong(input.getBusinessEssentialId()));
		}

		if (StringUtils.isNotNullOrEmpty(input.getItSecGroupId())) {
			Long itsec = Long.parseLong(input.getItSecGroupId());
			isNot = isNot(input.getItSecGroupId());
			if(1234567<=itsec && itsec<=1234578){
				sql.append(" and NVL(ITSEC_GRUPPE_ID, -1) "+ getEqualNotEqualOperator(isNot) +" ").append(10136);
			}else{
				sql.append(" and NVL(ITSEC_GRUPPE_ID, -1) "+ getEqualNotEqualOperator(isNot) +" ").append(itsec);
			}
		}

		if (StringUtils.isNotNullOrEmpty(input.getSource())) {
			isNot = isNot(input.getSourceOptions());
			sql.append(
					" AND insert_quelle " + getEqualNotEqualOperator(isNot)
							+ " '").append(input.getSource()).append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerHidden())) {
			isNot = isNot(input.getCiOwnerOptions());

			sql.append(" AND ");
			if (isNot)
				sql.append("UPPER(responsible) IS NULL OR ");

			sql.append(
					"UPPER(responsible) " + getLikeNotLikeOperator(isNot)
							+ " '")
					.append(input.getCiOwnerHidden().toUpperCase()).append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerDelegate())) {
			boolean isCwid = input.getCiOwnerDelegate().indexOf(')') > -1;
			String delegate = isCwid ? input.getCiOwnerDelegateHidden() : input
					.getCiOwnerDelegate();// gruppe oder cwid?

			isNot = isNot(input.getCiOwnerDelegateOptions());

			sql.append(" AND ");
			if (isNot)
				sql.append("UPPER(sub_responsible) IS NULL OR ");

			sql.append(
					"UPPER(sub_responsible) " + getLikeNotLikeOperator(isNot)
							+ " '").append(delegate.toUpperCase()).append("'");

			if (!isCwid)
				sql.insert(sql.length() - 2, '%');
		}
		
		sql.append(" order by nlssort(").append(metaData.getNameField())
		.append(", 'NLS_SORT = GENERIC_M')");
		System.out.println("SQL in Function"+sql);
		return sql;
	}

	public static CiEntityEditParameterOutput saveFunction(
			FunctionDTO functionDTO, String cwid) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		boolean toCommit = false;

		if (StringUtils.isNotNullOrEmpty(cwid)) {
			if (null != functionDTO.getId()
					|| 0 < functionDTO.getId().longValue()) {
				List<String> messages = validateCi(functionDTO);
				if (messages.isEmpty()) {
					Long id = functionDTO.getId();
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Function function = (Function) session.get(Function.class,
							id);
					if (null == function) {
						// Ways was not found in database
						output.setErrorMessage("1000", EMPTY + id);
					} else if (null != function.getDeleteTimestamp()) {
						// Ways is deleted
						output.setErrorMessage("1001", EMPTY + id);
					} else {
						
						setUpCi(function, functionDTO, cwid, false);
					}
					try {
						if (null != function
								&& null == function.getDeleteTimestamp()) {
							session.saveOrUpdate(function);
							session.flush();
							//EUGXS
							//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
							ComplianceHbn.setComplienceRequest(function.getFunctionId(),functionDTO,cwid);
							toCommit = true;
						}
					} catch (Exception e) {
						String message = e.getMessage();
						log.error(message);
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						message = ApplReposHbn
								.getOracleTransbaseErrorMessage(message);
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								toCommit);
						if (toCommit && null != function) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}

						if (function.getRefId() == null
								&& function.getItsecGroupId() != null) {
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
									functionDTO.getTableId(),
									functionDTO.getId(),
									functionDTO.getItsecGroupId());
						}
					}
				}
			}
		}
		return output;

	}
	
	
		
	protected static void setUpCi(Function ci, CiBaseDTO ciDTO, String cwid,
			boolean isCiCreate) {
		if (null != ciDTO.getCiOwnerHidden()) {
			if (StringUtils.isNullOrEmpty(ciDTO.getCiOwnerHidden())) {
				ci.setCiOwner(null);
			} else {
				ci.setCiOwner(ciDTO.getCiOwnerHidden());
			}
		}

		Long itSet = null;
		String strItSet = ApplReposHbn.getItSetFromCwid(ciDTO.getCiOwner());
		if (null != strItSet) {
			itSet = Long.parseLong(strItSet);
			ci.setItset(itSet);
		}
		ci.setName(ciDTO.getName());
		if (isCiCreate) {
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
		if (null != ciDTO.getCiOwnerDelegateHidden()) {
			if (StringUtils.isNullOrEmpty(ciDTO.getCiOwnerDelegateHidden())) {
				ci.setCiOwnerDelegate(null);
			} else {
				ci.setCiOwnerDelegate(ciDTO.getCiOwnerDelegateHidden());
			}
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
			} else {
				ci.setItsecGroupId(ciDTO.getItsecGroupId());
			}
		}

		if (null != ciDTO.getRefId()) {
			if (-1 == ciDTO.getRefId() || 0 == ciDTO.getRefId()) {
				ci.setRefId(null);
				// Anlegen der ITSec Massnahmen
				ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
						ciDTO.getTableId(), ci.getId(), ci.getItsecGroupId());
			} else {
				ci.setRefId(ciDTO.getRefId());
			}
		}

		if (null == ciDTO.getRelevanzItsec()) {
			if (Y.equals(ciDTO.getRelevanceGR1435())) {
				ciDTO.setRelevanzItsec(new Long(-1));
			} else if (N.equals(ciDTO.getRelevanceGR1435())) {
				ciDTO.setRelevanzItsec(new Long(0));
			}
		}
	/*	if (null == ciDTO.getRelevanceICS()) {
			if (Y.equals(ciDTO.getRelevanceGR1920())) {
				ciDTO.setRelevanceICS(new Long(-1));
			} else if (N.equals(ciDTO.getRelevanceGR1920())) {
				ciDTO.setRelevanceICS(new Long(0));
			}
		}*/

		ci.setRelevanceITSEC(ciDTO.getRelevanzItsec());
//		ci.setRelevanceICS(ciDTO.getRelevanceICS());

		/*if (StringUtils.isNotNullOrEmpty(ciDTO.getGxpFlag())) {
			if ("null".equals(ciDTO.getGxpFlag())) {
				ci.setGxpFlag(null);
			} else {
				ci.setGxpFlag(ciDTO.getGxpFlag());
			}
		}*/
	}

}

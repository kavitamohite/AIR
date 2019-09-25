package com.bayerbbs.applrepos.hibernate;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.CiTypeDTO;
import com.bayerbbs.applrepos.dto.DirectLinkCIDTO;
import com.bayerbbs.applrepos.dto.DwhEntityDTO;
import com.bayerbbs.applrepos.dto.LinkCIDTO;
import com.bayerbbs.applrepos.dto.ReferenzDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.service.CiEntityParameterInput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.ComplianceControlDTO;
import com.bayerbbs.applrepos.service.DwhEntityParameterOutput;

public class CiEntitiesHbn {
	
	//ApplicationDTO
	public static List<CiItemDTO> findExistantCisByNameOrAlias(String searchName, boolean withDeletedApplications) {
		ArrayList<CiItemDTO> listResult = new ArrayList<CiItemDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

//		Connection conn = null;

		searchName = searchName.toUpperCase();
		
		StringBuffer sql = new StringBuffer();

		sql.append("select * from V_DWH_ENTITY  where");
		// sql.append(" upper(deleted) = 'NO'");
		sql.append(" TABLE_ID in (");
			sql.append(AirKonstanten.TABLE_ID_IT_SYSTEM);
			sql.append(",");
			sql.append(AirKonstanten.TABLE_ID_APPLICATION);
			sql.append(",");
			sql.append(AirKonstanten.TABLE_ID_WAYS);
		sql.append(")");
		
		sql.append(" and (upper(name) = '" + searchName + "'  or upper(ASSET_ID_OR_ALIAS) = '" +searchName + "')");
		
		if (withDeletedApplications) {
			sql.append(" and (TABLE_ID in ").append(AirKonstanten.TABLE_ID_APPLICATION).append(" and upper(DELETED) = 'YES')");
		}
		else {
			sql.append(" and upper(DELETED) = 'NO'");
		}
		
		sql.append(" order by name");
		
		
		try {
			tx = session.beginTransaction();

			@SuppressWarnings("deprecation")
			Connection conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				while (rset.next()) {
					CiItemDTO anwendung = getApplicationDTOFromResultSet(rset);//ApplicationDTO
					listResult.add(anwendung);
				}
				commit = true;
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
		} catch (Exception e) {
			//
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	
	//ApplicationDTO
	public static List<CiItemDTO> findCisByNameOrAlias(String searchName) {
		
		boolean showDeleted = false;
		
		return findCisByNameOrAlias(searchName, showDeleted, AirKonstanten.PARAMETER_QUERYMODE_EXACT, false, null, null, 0, 1000);
	}	 
 
	public static boolean isLikeStart(String queryMode) {
		boolean isLikeStart = false;
		
		if (null == queryMode || AirKonstanten.PARAMETER_QUERYMODE_EMPTYSTRING.equals(queryMode) || AirKonstanten.PARAMETER_QUERYMODE_CONTAINS.equals(queryMode)) {
			isLikeStart = true;
		}
		
		return isLikeStart;
	}
	
	public static boolean isLikeEnd(String queryMode) {
		boolean isLikeEnd = false;

		if (null == queryMode || AirKonstanten.PARAMETER_QUERYMODE_EMPTYSTRING.equals(queryMode) || AirKonstanten.PARAMETER_QUERYMODE_CONTAINS.equals(queryMode) || AirKonstanten.PARAMETER_QUERYMODE_BEGINS_WITH.equals(queryMode)) {
			isLikeEnd = true;
		}
		return isLikeEnd;
	}
	

	//ApplicationDTO
	public static List<CiItemDTO> findCisByNameOrAlias(String searchName, boolean showDeleted, String queryMode, boolean onlyApplications, String sort, String dir, Integer startwert, Integer limit) {
		ArrayList<CiItemDTO> listResult = new ArrayList<CiItemDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
//		Connection conn = null;

		searchName = searchName.toUpperCase();
		
		StringBuffer sql = new StringBuffer();

		sql.append("select * from V_DWH_ENTITY  where");
		sql.append(" 1=1");
		if (!showDeleted) {
			sql.append(" and upper(deleted) = 'NO'");
		}
		
		sql.append(" and UPPER(type) in (");
		sql.append(AirKonstanten.CITypes_ANWENDUNG.toUpperCase()); // Suche auf UPPER(type) besser als auf table_id

		
   if (onlyApplications) {
			sql.append(") and UPPER(type) = UPPER('Application')"); // sieht etwas merkwürdig aus, wird aber in diesem Fall vom Oracle-Optimizer richtig interpretiert.
	} else {
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_IT_SYSTEM.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_SCHRANK.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_RAUM.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_GEBAEUDE.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_BUILDING_AREA.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_TERRAIN.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_STANDORT.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_WAYS.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_FUNCTION.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_BUSINESS_APPLICATION.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_SERVICE.toUpperCase());
			sql.append(")");
		
		} 
		
		sql.append(" and (upper(name) like '");
		if (isLikeStart(queryMode)) {
			sql.append("%");
		}
		
		sql.append(searchName);
		if (isLikeEnd(queryMode)) {
			sql.append("%");
		}

		sql.append("'  or upper(ASSET_ID_OR_ALIAS) like '");
		if (isLikeStart(queryMode)) {
			sql.append("%");
		}
		
		sql.append(searchName);
		if (isLikeEnd(queryMode)) {
			sql.append("%");
		}
		
		sql.append("')");
		sql.append(" order by nlssort(");
				
		if (StringUtils.isNotNullOrEmpty(sort)) {
			if ("applicationName".equals(sort)) {
				sql.append("NAME");
			}
			else if ("applicationAlias".equals(sort)) {
				sql.append("ASSET_ID_OR_ALIAS");
			}
			else if ("alias".equals(sort)) {
				sql.append("ASSET_ID_OR_ALIAS");
			}			
			else if ("applicationCat1Txt".equals(sort)) {
				sql.append("TYPE");
			}
			else if ("applicationCat2Txt".equals(sort)) {
				sql.append("CATEGORY");
			}
			else if ("ciOwner".equals(sort)) {
				sql.append("RESPONSIBLE");
			}
			else if ("ciOwnerDelegate".equals(sort)) {
				sql.append("SUB_RESPONSIBLE");
			}
			else if ("applicationOwner".equals(sort)) {
				sql.append("APP_OWNER");
			}
			else if ("applicationOwnerDelegate".equals(sort)) {
				sql.append("APP_OWNER_DELEGATE");
			}else if ("applicationSteward".equals(sort)) {
				sql.append("APP_STEWARD");
			} else {
				sql.append(sort);
			}
		}
		else {
			sql.append("name");
		}
		sql.append(", 'NLS_SORT = GENERIC_M')");
		
		if (StringUtils.isNotNullOrEmpty(dir)) {
			sql.append(" ").append(dir);
		}
		
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			selectStmt = conn.createStatement();
			System.out.println(sql.toString());
			ResultSet rset = selectStmt.executeQuery(sql.toString());
			
			if (null != rset) {

				long counter = 0;
				
				while (rset.next() && (counter < startwert + limit)) {
					
					if (counter < startwert + limit) {
						CiItemDTO anwendung = getApplicationDTOFromResultSet(rset);//ApplicationDTO
						
//						if (null != anwendung.getDeleteQuelle() && !"No".equals(anwendung.getDeleteQuelle())) {
//							anwendung.setName(anwendung.getName() + " (DELETED)");
//						}
						
						listResult.add(anwendung);
					}
					counter++;
				}
				commit = true;
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
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	public static Long findCountCisByNameOrAlias(String searchName, boolean showDeleted, String queryMode, boolean onlyApplications) {
		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
//		Connection conn = null;

		searchName = searchName.toUpperCase();
		
		StringBuffer sql = new StringBuffer();

		sql.append("select count(*) from V_DWH_ENTITY  where");
		
		sql.append(" 1=1");
		
		if (!showDeleted) {
			sql.append(" and upper(deleted) = 'NO'");
		}
		
		sql.append(" and UPPER(type) in (");
		sql.append(AirKonstanten.CITypes_ANWENDUNG.toUpperCase()); // Suche auf UPPER(type) besser als auf table_id

		if (onlyApplications) {
			sql.append(") and UPPER(type) = UPPER('Application')"); // sieht etwas merkwürdig aus, wird aber in diesem Fall vom Oracle-Optimizer richtig interpretiert.
		} else {
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_IT_SYSTEM.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_SCHRANK.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_RAUM.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_GEBAEUDE.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_BUILDING_AREA.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_TERRAIN.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_STANDORT.toUpperCase());
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.CITypes_BUSINESS_APPLICATION.toUpperCase());
			sql.append(")");
		}
		
		sql.append(" and (upper(name) like '");
		if (isLikeStart(queryMode)) {
			sql.append("%");
		}
		
		sql.append(searchName);
		if (isLikeEnd(queryMode)) {
			sql.append("%");
		}

		sql.append("'  or upper(ASSET_ID_OR_ALIAS) like '");
		if (isLikeStart(queryMode)) {
			sql.append("%");
		}
		
		sql.append(searchName);
		if (isLikeEnd(queryMode)) {
			sql.append("%");
		}
		
		sql.append("')");
		
		Long anzahlDatensaetze = 0L;
		
		
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			selectStmt = conn.createStatement();
			if ("BY03DF".equals(java.net.InetAddress.getLocalHost().getHostName())) 
				System.out.println(sql.toString());
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				rset.next();
				anzahlDatensaetze = rset.getLong(1);
			}
			commit = true;
			
			if (null != rset) {
				rset.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return anzahlDatensaetze;
	}

	
	
	public static List<CiBaseDTO> findCisByNameOrAlias(String searchName, int ciTableId, boolean withDeleted) {
		ArrayList<CiBaseDTO> listResult = new ArrayList<CiBaseDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
//		Connection conn = null;

		searchName = searchName.toUpperCase();
		StringBuffer sql = new StringBuffer();
		sql.append("select * from V_DWH_ENTITY  where");

		if (!withDeleted) {
			sql.append(" upper(deleted) = 'NO' and ");
		}
		sql.append(" TABLE_ID in (");
		sql.append(ciTableId);
		sql.append(")");
		
		sql.append(" and (upper(name) like '");
		sql.append(searchName);

		sql.append("'  or upper(ASSET_ID_OR_ALIAS) like '");
		sql.append(searchName);
		sql.append("')");
		
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();

			selectStmt = conn.createStatement();
			if ("BY03DF".equals(java.net.InetAddress.getLocalHost().getHostName())) 
				System.out.println(sql.toString());
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				while (rset.next()) {
//					ApplicationDTO anw = getApplicationDTOFromResultSet(rset);
					CiBaseDTO baseDTO = new CiBaseDTO();
					baseDTO.setId(rset.getLong("CI_ID"));
					baseDTO.setName(rset.getString("NAME"));
					baseDTO.setAlias(rset.getString("ASSET_ID_OR_ALIAS"));
						
					listResult.add(baseDTO);
				}
				commit = true;
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
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}


	public static List<ViewDataDTO> findCisByTypeAndNameOrAlias(String typename, String searchName) {
		ArrayList<ViewDataDTO> listResult = new ArrayList<ViewDataDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
//		Connection conn = null;

		searchName = searchName.toUpperCase();
		StringBuffer sql = new StringBuffer();

		sql.append("select * from V_DWH_ENTITY  where");
		sql.append(" upper(deleted) = 'NO'");
		sql.append(" and upper(type) = upper('").append(typename).append("')");
		
		sql.append(" and (upper(name) like '%" + searchName + "%'  or upper(ASSET_ID_OR_ALIAS) like '%" +searchName + "%')");
		sql.append(" order by NAME");
		
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ViewDataDTO dto = new ViewDataDTO();
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
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	
	private static CiItemDTO getApplicationDTOFromResultSet(ResultSet rset) {//ApplicationDTO
		String type = null;
//		String id = null;
		String name = null;
		String assetIdOrAlias = null;
		String responsible = null;
		String subResponsible = null;
		String applicationOwner = null;
		String applicationSteward = null;
		String applicationOwnerDelegate = null;
		String location = null;
		Long ci_id = null;
		String category = null;
		Integer tableId = null;
		String deleted = null;
		
		try {
			
			type = rset.getString("TYPE");
//			id = rset.getString("ID");
			if ("secret".equals(rset.getString("CONFIDENTIALITY")))
				name = "<img src='/AIR/images/secured_10x10.png' border='0' title='Secure System'>&nbsp;" + rset.getString("NAME");
			else
				name = rset.getString("NAME");
			assetIdOrAlias = rset.getString("ASSET_ID_OR_ALIAS");
			responsible = rset.getString("RESPONSIBLE");
			subResponsible = rset.getString("SUB_RESPONSIBLE");
			category = rset.getString("CATEGORY");
			ci_id = rset.getLong("CI_ID");
			location = rset.getString("LOCATION");
			applicationOwner = rset.getString("APP_OWNER");
			applicationOwnerDelegate = rset.getString("APP_OWNER_DELEGATE");
			tableId = rset.getInt("TABLE_ID");
			deleted = rset.getString("DELETED");
			applicationSteward = rset.getString("APP_STEWARD");
			
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
/*
		Long ciEntityId = new Long(0);
		if (null != id && id.startsWith("APP-")) {
			// only for apps (by now)
			String idTemp = id.substring("APP-".length());
			try {
				ciEntityId = Long.parseLong(idTemp);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
*/		
		
		// TODO rename fields application to ci entities
		CiItemDTO anw = new CiItemDTO();//ApplicationDTO
		anw.setId(ci_id);
		anw.setName(name);
		anw.setAlias(assetIdOrAlias);
		anw.setCiOwner(responsible);
		anw.setCiOwnerDelegate(subResponsible);
		anw.setApplicationCat1Txt(type);
		anw.setApplicationCat2Txt(category);
		anw.setLocation(location);
		anw.setApplicationOwner(applicationOwner);
		anw.setApplicationOwnerDelegate(applicationOwnerDelegate);
		anw.setApplicationSteward(applicationSteward);
		anw.setDeleteQuelle(deleted);
		anw.setTableId(tableId);
		
		return anw;
	}

	//ApplicationDTO
	public static List<CiItemDTO> findCisByOUunit(String ouCiType, String ouUnit, String ciOwnerType, String ouQueryMode, String sort, String dir) {
		if (null == ouUnit || null == ciOwnerType) {
			return new ArrayList<CiItemDTO>();//ApplicationDTO
		}
		else {
			StringBuffer sql = new StringBuffer();
			sql.append("SELECT * FROM TABLE (PCK_AIR.FT_OU_Owner('");
			sql.append(ouUnit);
			sql.append("', '");
			sql.append(ciOwnerType);
			sql.append("', '");
			sql.append(ouQueryMode);
			
			if (null != ouCiType && ouCiType.length() > 0) {
				sql.append("', '");
				sql.append(ouCiType);
			}
			
			sql.append("')) ");
			sql.append(" order by nlssort(");
			if (StringUtils.isNotNullOrEmpty(sort)) {
				if ("applicationName".equals(sort)) {
					sql.append("NAME");
				}
				else if ("alias".equals(sort)) {
					sql.append("ASSET_ID_OR_ALIAS");
				}
				else if ("applicationCat1Txt".equals(sort)) {
					sql.append("TYPE");
				}
				else if ("applicationCat2Txt".equals(sort)) {
					sql.append("CATEGORY");
				}
				else if ("ciOwner".equals(sort)) {
					sql.append("RESPONSIBLE");
				}
				else if ("ciOwnerDelegate".equals(sort)) {
					sql.append("SUB_RESPONSIBLE");
				}
				else if ("applicationOwner".equals(sort)) {
					sql.append("APP_OWNER");
				}
				else if ("applicationOwnerDelegate".equals(sort)) {
					sql.append("APP_OWNER_DELEGATE");
				}else if ("applicationSteward".equals(sort)) {
					sql.append("APP_STEWARD");
				} else {
					sql.append(sort);
				}
			}
			else {
				sql.append("name");
			}
			sql.append(", 'NLS_SORT = GENERIC_M')");			
			if (StringUtils.isNotNullOrEmpty(dir)) {
				sql.append(" ").append(dir);
			}
		
			
			return findCis(sql.toString());
		}
	}	

	//ApplicationDTO
	public static List<CiItemDTO> findMyCisOwner(String cwid, String sort, String dir, boolean onlyApplications) {
		return findMyCisOwnerOrDelegate("pck_air.FT_App_Owner", cwid, sort, dir, onlyApplications);
	}
	
	//ApplicationDTO
	public static List<CiItemDTO> findMyCisDelegate(String cwid, String sort, String dir, boolean onlyApplications) {
		return findMyCisOwnerOrDelegate("pck_air.FT_App_Owner_Delegate", cwid, sort, dir, onlyApplications);
	}
	
	//ApplicationDTO
	public static List<CiItemDTO> findMyCisForDelete(String cwid, String sort, String dir, boolean onlyApplications, String query) {
		return findMyCisToDelete("pck_air.FT_My_CIs", cwid, sort, dir, onlyApplications, query);
	}
	
	//ApplicationDTO
	private static List<CiItemDTO> findMyCisOwnerOrDelegate(String ownerDelegate, String cwid, String sort, String dir, boolean onlyApplications) {
		StringBuffer sql = new StringBuffer();
		
		sql.append("SELECT * FROM TABLE (").append(ownerDelegate).append("('").append(cwid.toUpperCase()).append("'))");

		if (onlyApplications) {
			sql.append(" WHERE type = 'Application'"); 
		}
		
		// Order
		sql.append(" order by nlssort(");
		if (StringUtils.isNotNullOrEmpty(sort)) {
			if ("applicationName".equals(sort)) {
				sql.append("NAME");
			}
			else if ("alias".equals(sort)) {
				sql.append("ASSET_ID_OR_ALIAS");
			}
			else if ("applicationCat1Txt".equals(sort)) {
				sql.append("TYPE");
			}
			else if ("applicationCat2Txt".equals(sort)) {
				sql.append("CATEGORY");
			}
			else if ("ciOwner".equals(sort)) {
				sql.append("RESPONSIBLE");
			}
			else if ("ciOwnerDelegate".equals(sort)) {
				sql.append("SUB_RESPONSIBLE");
			}
			else if ("applicationOwner".equals(sort)) {
				sql.append("APP_OWNER");
			}
			else if ("applicationSteward".equals(sort)) {
				sql.append("APP_STEWARD");
			}			
			else if ("applicationOwnerDelegate".equals(sort)) {
				sql.append("APP_OWNER_DELEGATE");
			}			
			else {
				sql.append(sort);
			}
			
		}
		else {
			sql.append("name");
		}
		sql.append(", 'NLS_SORT = GENERIC_M')");
		// Order direction
		if (StringUtils.isNotNullOrEmpty(dir)) {
			sql.append(" ").append(dir);
		}
			
		return findCis(sql.toString());
	}
	
	//ApplicationDTO
	private static List<CiItemDTO> findMyCisToDelete(String functionName, String cwid, String sort, String dir, boolean onlyApplications, String query) {
		StringBuffer sql = new StringBuffer();
		
		sql.append("SELECT * FROM TABLE (").append(functionName).append("('").append(cwid.toUpperCase()).append("'");

		if (onlyApplications) {
			sql.append(",'Application'"); 
		} else {
			sql.append(", NULL");
		}
		if (query!=null) {
			sql.append(",'").append(query).append("'"); 
		}
		
		sql.append("))");
		sql.append(" order by nlssort(");
		// Order
		if (StringUtils.isNotNullOrEmpty(sort)) {
			if ("applicationName".equals(sort)) {				
				sql.append("NAME");
			}else 
				if ("alias".equals(sort)) {
				sql.append("ASSET_ID_OR_ALIAS");
			}
			else if ("applicationCat1Txt".equals(sort)) {
				sql.append("TYPE");
			}
			else if ("applicationCat2Txt".equals(sort)) {
				sql.append("CATEGORY");
			}
			else if ("ciOwner".equals(sort)) {
				sql.append("RESPONSIBLE");
			}
			else if ("ciOwnerDelegate".equals(sort)) {
				sql.append("SUB_RESPONSIBLE");
			}
			else if ("applicationOwner".equals(sort)) {
				sql.append("APP_OWNER");
			}
			else if ("applicationOwnerDelegate".equals(sort)) {
				sql.append("APP_OWNER_DELEGATE");
			}			
			else if ("applicationSteward".equals(sort)) {
				sql.append("APP_STEWARD");
			}
			else {
				sql.append(sort);
			}
			
		}
		else {
			sql.append("name");
		}
		sql.append(", 'NLS_SORT = GENERIC_M')");
		// Order direction
		if (StringUtils.isNotNullOrEmpty(dir)) {
			sql.append(" ").append(dir);
		}
		System.out.println(sql.toString());	
		return findCis(sql.toString());
	}

	
	private static List<CiItemDTO> findCis(String sql) {//ApplicationDTO
		ArrayList<CiItemDTO> listeAnwendungen = new ArrayList<CiItemDTO>();//ApplicationDTO
		//System.out.println("findCis "+sql);
		boolean commit = false;
		Transaction ta = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

//		Connection conn = null;
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			
			selectStmt = conn.createStatement();
			ResultSet rset = selectStmt.executeQuery(sql);
			
			while (rset.next()) {
				// TODO rename fields application to ci entities
				CiItemDTO anw = getApplicationDTOFromResultSet(rset);//ApplicationDTO
				listeAnwendungen.add(anw);
			}

			// disconnect
			ta.commit();
			rset.close();
			selectStmt.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			HibernateUtil.close(ta, session, commit);
		}
		return listeAnwendungen;
	}
	
			//EPCHI
			// IM0008810274 Problem in linking application platforms to other application platforms.		
	
	public static DwhEntityParameterOutput findByTypeAndName(String ciType, String ciName, int start, int limit, long ciId, long tableId) {
		
		String sql = "SELECT * FROM TABLE (pck_air.ft_findcis('" + ciName.trim() + "', '" + ciType + "'  ,  "+ tableId + " ,  "+ ciId + "))";//IM0007439349
		System.out.println("sql query for relation search"+sql);
		Transaction ta = null;																	
		Statement stmt = null;
//		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;


		List<DwhEntityDTO> dwhEntities = new ArrayList<DwhEntityDTO>();
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();
		int i = 0;
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = stmt.executeQuery(sql);
			
			if (0 != start) { 
				rs.absolute(start + 1);//relative
			}
//			rs.setFetchSize(limit);
			
			DwhEntityDTO dwhEntity = null;
			
			while (rs.next()) {
				//EUGXS
				//IM0008472651 - Intolerable Business Application Relationships

				if(Long.parseLong(rs.getString("CI_ID")) != ciId ){
					if(i < limit) {
						dwhEntity = new DwhEntityDTO();
						
						dwhEntity.setCiId(rs.getString("CI_ID"));
						dwhEntity.setCiType(rs.getString("TYPE"));
						dwhEntity.setCiName(rs.getString("NAME"));
						dwhEntity.setCiAlias(rs.getString("ASSET_ID_OR_ALIAS"));
						dwhEntity.setDwhEntityId(rs.getString("ID"));
						dwhEntity.setTableId(rs.getString("TABLE_ID"));
						dwhEntity.setCiOwner(rs.getString("RESPONSIBLE"));
						dwhEntity.setCiOwnerDelegate(rs.getString("SUB_RESPONSIBLE"));
						dwhEntity.setAppOwner(rs.getString("APP_OWNER"));
						dwhEntity.setAppOwnerDelegate(rs.getString("APP_OWNER_DELEGATE"));
						dwhEntity.setAppSteward(rs.getString("APP_STEWARD"));
						dwhEntity.setCategoryIt(rs.getString("CATEGORY"));
						dwhEntity.setLifecycleStatus(rs.getString("LIFECYCLE"));
						dwhEntity.setSource(rs.getString("SOURCE"));
						dwhEntity.setTemplate(rs.getString("TEMPLATE"));
		
		//				dwhEntity.setOperationalStatus(rs.getString("OPERATIONAL_STATUS"));
		//				dwhEntity.setGxpRelevance(rs.getString("GXP_RELEVANCE"));
		//				dwhEntity.setItSet(rs.getString("ITSET"));
		//				dwhEntity.setServiceContract(rs.getString("SERVICE_CONTRACT"));
		//				dwhEntity.setSeverityLevel(rs.getString("SEVERITY_LEVEL"));
		//				dwhEntity.setPriorityLevel(rs.getString("PRIORITY_LEVEL"));
		//				dwhEntity.setSla(rs.getString("SLA"));
		//				dwhEntity.setBusinessEssential(rs.getString("BUSINESS_ESSENTIAL"));
						//evtl. mehr
						
						dwhEntities.add(dwhEntity);
					}
					
					i++;
				}
			}
			
			ta.commit();
			rs.close();
			stmt.close();
			conn.close();
			
			commit = true;
			
//			System.out.println("CiEntitesHbn::findByTypeAndName: ciTypes="+dwhEntities.size());
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		
		output.setDwhEntityDTO(dwhEntities.toArray(new DwhEntityDTO[0]));
		output.setTotal(i + start);// + 1
		
		return output;
	}
	
	public static String saveCiRelations(Integer tableId, Long ciId, String ciRelationsAddList, String ciRelationsDeleteList, String direction, String cwid)   {
		String sql = "{call pck_air.p_save_relations(?,?,?,?,?,?)}";//"begin pck_air.p_save_relations(?,?,?,?,?,?);//"EXEC pck_air.p_save_relations ("+tableId+", "+ciId+", "+ciRelationsAddList+", "+ciRelationsDeleteList+", "+direction+", "+cwid+")";
		
		Transaction ta = null;
		Session session = HibernateUtil.getSession();
		String message=null;
		boolean commit = false;
		System.out.println("cwid inside save relation "+cwid);
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			System.out.println("In save relationship tableId: "+tableId +" ciId:  "+ciId+" ciRelationsAddList :"+ciRelationsAddList+" ciRelationsDeleteList: "+ciRelationsDeleteList+" direction: "+direction);
			System.out.println("Started at "+new Date());
			CallableStatement stmt = conn.prepareCall(sql);
			stmt.setLong(1, tableId);
			stmt.setLong(2, ciId);
			stmt.setString(3, ciRelationsAddList);
			stmt.setString(4, ciRelationsDeleteList);
			stmt.setString(5, direction);
			stmt.setString(6, cwid);
			stmt.executeUpdate();
			
			System.out.println("saved successfull relationship tableId: "+tableId +" ciId:  "+ciId+" ciRelationsAddList :"+ciRelationsAddList+" ciRelationsDeleteList: "+ciRelationsDeleteList+" direction: "+direction);
			System.out.println("Ended at "+new Date());
			ta.commit();
			stmt.close();
			conn.close();
			
			commit = true;
		}
		//IM0007113591 - Start
		 catch (SQLException e) {
				System.out.println("In SQLException for relationship");
				System.out.println("In SQLException relationship tableId: "+tableId +" ciId:  "+ciId+" ciRelationsAddList :"+ciRelationsAddList+" ciRelationsDeleteList: "+ciRelationsDeleteList+" direction: "+direction);
				
				System.out.println("Exception at "+new Date());
				e.printStackTrace();
				
				message= e.getMessage();
				// TODO: handle exception
				
				System.out.println(e.toString());
			}
		
		// IM0007113591 - End
		catch (Exception e) {
			System.out.println("In exception for relationship");
			System.out.println("In exception relationship tableId: "+tableId +" ciId:  "+ciId+" ciRelationsAddList :"+ciRelationsAddList+" ciRelationsDeleteList: "+ciRelationsDeleteList+" direction: "+direction);
			
			System.out.println("Exception at "+new Date());
			e.printStackTrace();
			
			message= e.getMessage();
			// TODO: handle exception
			
			System.out.println(e.toString());
		}finally {
			System.out.println("In Finally");
			HibernateUtil.close(ta, session, commit);
		}
		return message;
	}


	public static DwhEntityParameterOutput getDwhEntityRelations(Long tableId, Long ciId, String direction) {
		String sql = "SELECT ci_id, type, name, id, source, contains_hw FROM TABLE (pck_air.ft_relatedcis("+tableId+","+ciId+",'"+direction+"'))";//"begin pck_air.p_save_relations(?,?,?,?,?,?);//"EXEC pck_air.p_save_relations ("+tableId+", "+ciId+", "+ciRelationsAddList+", "+ciRelationsDeleteList+", "+direction+", "+cwid+")";
		
		Transaction ta = null;
		Statement stmt = null;
//		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		List<DwhEntityDTO> dwhEntities = new ArrayList<DwhEntityDTO>();
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery(sql);

			boolean isReferenced = false;
			DwhEntityDTO dwhEntity = null;
			
			while (rs.next()) {
				dwhEntity = new DwhEntityDTO();
				
				dwhEntity.setCiId(rs.getString("CI_ID"));
				dwhEntity.setCiType(rs.getString("TYPE"));
				dwhEntity.setCiName(rs.getString("NAME"));
//				dwhEntity.setCiAlias(rs.getString("ASSET_ID_OR_ALIAS"));
				dwhEntity.setDwhEntityId(rs.getString("ID"));
				dwhEntity.setSource(rs.getString("SOURCE"));
				isReferenced = rs.getString("CONTAINS_HW") != null && rs.getString("CONTAINS_HW").equals(AirKonstanten.YES);
				dwhEntity.setIsReferenced(isReferenced);
				
				dwhEntities.add(dwhEntity);
			}
			
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		
		output.setDwhEntityDTO(dwhEntities.toArray(new DwhEntityDTO[0]));
		
		return output;
	}
	
	public static List<ReferenzDTO> getTemplateCIs() {
		List<ReferenzDTO> templates = new ArrayList<ReferenzDTO>();
		
		Transaction ta = null;
		Statement stmt = null;
//		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		//evtl. and r.del_timestamp IS NULL weg UND r.del_timestamp dazu, damit man untersuchen kann ob 
		//gesetztes template löschmarkiert und damit invalid ist auf der Compliance Seite.
		//wenn r.del_timestamp hier dazukommt, spart man zwei joins beim Laden der CI Detaildaten,
		//wenn man den Text/Namen des Templates und der ItSecGruppe als ungültig anzeigen will.
		StringBuilder sql = new StringBuilder();//"SELECT ci_id, table_id, type, name, itset, FROM dwh_entity WHERE template = 'Yes'";
		sql.
		append("SELECT r.raum_name as ci_name, r.raum_id as ci_id, r.itset, r.itsec_gruppe_id, r.del_timestamp, (3) as table_id, (0) as ci_sub_type FROM raum r ").
		append("WHERE r.template = -1 ").// and r.del_timestamp IS NULL
		append("UNION ").// --all
		append("SELECT g.gebaeude_name, g.gebaeude_id, g.itset, g.itsec_gruppe_id, g.del_timestamp, (4) as table_id, (0) as ci_sub_type FROM gebaeude g ").
		append("WHERE g.template = -1 ").// and g.del_timestamp IS NULL
		append("UNION ").// --all
		append("SELECT ba.area_name, ba.area_id, ba.itset, ba.itsec_gruppe_id, ba.del_timestamp, (88) as table_id, (0) as ci_sub_type FROM building_area ba ").
		append("WHERE ba.template = -1 ").// and ba.del_timestamp IS NULL
		append("UNION ").// --all
		append("SELECT i.it_system_name, i.it_system_id, i.itset, i.itsec_gruppe_id, i.del_timestamp, (1) as table_id, i.hw_ident_or_trans as ci_sub_type FROM it_system i ").
		append("WHERE i.template = -1 ").// and i.del_timestamp IS NULL
		append("UNION ").// --all
		append("SELECT s.schrank_name as ci_name, s.schrank_id as ci_id, s.itset, s.itsec_gruppe_id, s.del_timestamp, (13) as table_id, (0) as ci_sub_type FROM schrank s ").
		append("WHERE s.template = -1 ").// and s.del_timestamp IS NULL
		append("UNION ").// --all
		append("SELECT st.standort_name as ci_name, st.standort_id as ci_id, st.itset, st.itsec_gruppe_id, st.del_timestamp, (12) as table_id, (0) as ci_sub_type FROM standort st ").
		append("WHERE st.template = -1 ").// and st.del_timestamp IS NULL
		append("UNION ").// --all
		append("SELECT t.terrain_name as ci_name, t.terrain_id as ci_id, t.itset, t.itsec_gruppe_id, t.del_timestamp, (30) as table_id, (0) as ci_sub_type FROM terrain t ").
		append("WHERE t.template = -1 ").// and t.del_timestamp IS NULL
		append("UNION ").// --all
		append("SELECT an.anwendung_name, an.anwendung_id, an.itset, an.itsec_gruppe_id, an.del_timestamp, (2) as table_id, ak2.anwendung_kat1_id FROM anwendung an ").
		append("INNER JOIN anwendung_kat2 ak2 on an.anwendung_kat2_id = ak2.anwendung_kat2_id ").
		append("WHERE an.template = -1 ").// and an.del_timestamp IS NULL
		append("ORDER BY table_id, ci_sub_type");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			ReferenzDTO templateDTO = null;
			
			while (rs.next()) {
				templateDTO = new ReferenzDTO();
				templateDTO.setId(rs.getLong("CI_ID"));
				templateDTO.setName(rs.getString("CI_NAME"));
				templateDTO.setItsetId(rs.getLong("ITSET"));
				templateDTO.setItsecGroupId(rs.getLong("ITSEC_GRUPPE_ID"));
				templateDTO.setDelTimestamp(rs.getTimestamp("DEL_TIMESTAMP") != null ? rs.getTimestamp("DEL_TIMESTAMP").getTime() : null);
				templateDTO.setTableId(rs.getInt("TABLE_ID"));
				templateDTO.setCiKat1(rs.getLong("CI_SUB_TYPE"));
				
				templates.add(templateDTO);
			}
			
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		
		return templates;
	}
	
	public static List<CiTypeDTO> getCiTypes(boolean shortlist) {
		List<CiTypeDTO> ciTypes = new ArrayList<CiTypeDTO>();
		
		Transaction ta = null;
		Statement stmt = null;
		Session session = HibernateUtil.getSession();
			
		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.
		append("select t.tabelle_name, cit.config_item_type_name, tcit.table_id, ").
		append("  case when tcit.table_id = 2 then ak1.anwendung_kat1_id ").
		append("       when cit.config_item_type_name = 'Hardware System' then 1 ").
		append("       when cit.config_item_type_name = 'Transient System Platform' then 2 ").
		append("       else null end as ci_sub_type_id ").
		append("from table_config_item_type tcit ").
		append("join config_item_type cit on cit.config_item_type_id = tcit.config_item_type_id ").
		append("join tabellen t on t.tabelle_id = tcit.table_id ");
		if (shortlist)
			sql.append("AND t.tabelle_id NOT IN (88, 4, 3, 13, 12, 30) ");
		sql.append("left join anwendung_kat1 ak1 on ak1.anwendung_kat1_en = cit.config_item_type_name ").
		append("where (t.type = 'CI TABLE (class 1)' AND TCIT.DEL_TIMESTAMP is null AND t.tabelle_id NOT IN (19)) OR (t.type = 'CI TABLE (class 2)' AND t.tabelle_id = 12) ").				
		append("order by t.tabelle_id ");
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());
			
			int i = 0;
			while (rs.next()) {
				//roles getRolePerson(cwid): just load roles that will fit to role of user
				CiTypeDTO ciTypeDTO = new CiTypeDTO(i++, rs.getString("CONFIG_ITEM_TYPE_NAME"), rs.getInt("TABLE_ID"), rs.getInt("CI_SUB_TYPE_ID"));
				
				ciTypeDTO.setSortId(AirKonstanten.CI_TYPE_ORDERING.get(ciTypeDTO.getCiTypeName()));
				ciTypes.add(ciTypeDTO);
				Collections.sort(ciTypes);
			}
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		
		return ciTypes;
	}
	
	public static String findCIisLinkWithTemplate(Long ciId,Integer tableID){
		String isLink="N";
		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
//		Connection conn = null;
		//String sql="SELECT COUNT(*) AS Link# FROM ITSEC_MASSN_STATUS WHERE Ref_Table_Id ="+tableID +" AND Ref_Pk_Id ="+ciId+
		         //  " AND pck_SISec.Is_Deleted(Tabelle_Id, Tabelle_PK_ID) = 0";

		//ETNTX- IM0006852855
		String sql="SELECT COUNT(*) AS Link# FROM TABLE(pck_SISec.FT_Linkages("+tableID+","+ciId+"))"; 
		System.out.println("SQL Is template new :="+sql);
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			selectStmt = conn.createStatement();
			if ("BY03DF".equals(java.net.InetAddress.getLocalHost().getHostName())) 
				System.out.println(sql.toString());
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				rset.next();
				Long count = rset.getLong(1);
				System.out.println("count Is template new count :="+count);
				if(count >0)
					 isLink="Y";
				
			}
			commit = true;
			
			if (null != rset) {
				rset.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}		
		
		 

		
		return isLink;
		
	}
	public static List<DirectLinkCIDTO> findAllDirectLinkCIWithTemplate(Long tableId,Long refId){
		List<DirectLinkCIDTO> linkCIDTOs = new ArrayList<DirectLinkCIDTO>();
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
		//String sql="SELECT   pck_SISec.Get_Ident(Table_Id, Id) AS Name " + 
		//" FROM ALL_CI WHERE Del_Quelle is NULL AND Table_Id ="+ tableId+" AND Ref_Id ="+refId+" ORDER BY Name";

		//ETNTX- IM0006852855
		String sql="SELECT Name,Type,Complete_Link FROM TABLE(pck_SISec.FT_Linkages("+tableId+","+refId+")) ORDER BY Name";

		try{
			tx=session.beginTransaction();
			Connection con=session.connection();
			 selectStmt=con.createStatement();
			ResultSet resultSet=selectStmt.executeQuery(sql);
			if(resultSet != null){
				Long index=0L;
				while(resultSet.next()){
					DirectLinkCIDTO  directLinkCIDTO = new DirectLinkCIDTO();
					directLinkCIDTO.setId(++index);
					directLinkCIDTO.setName(resultSet.getString(1));

					//ETNTX- IM0006852855
					directLinkCIDTO.setType(resultSet.getString(2));
					directLinkCIDTO.setCompleteLink(resultSet.getString(3));
					
					linkCIDTOs.add(directLinkCIDTO);
				}
			}
			
			if (null != resultSet) {
				resultSet.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != con) {
				con.close();
			}
		}
		catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, false);
		}	
		return linkCIDTOs;
	}
	public static String getCIName(Integer tableId ,Long ID){
		String ciName="";
		String sql = "SELECT NAME FROM ALL_CI WHERE DEL_QUELLE is NULL AND TABLE_ID ="+ tableId+" AND Id ="+ID;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
		try{
			tx=session.beginTransaction();
			Connection con=session.connection();
			 selectStmt=con.createStatement();
			ResultSet resultSet=selectStmt.executeQuery(sql);
			if(resultSet != null){
				resultSet.next();
               ciName = resultSet.getString("NAME");
			}
			
			if (null != resultSet) {
				resultSet.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != con) {
				con.close();
			}
		}
		catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, false);
		}
		return ciName;
	}
	public static List<ComplianceControlDTO> findAllCIComplianceControl(Long tableId ,Long ciID){
		List<ComplianceControlDTO> compControlDTOs = new ArrayList<ComplianceControlDTO>();
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
		String sql="SELECT   STA.Itsec_Massn_St_Id,"+
         "TO_CHAR(MAS.Katalog_Id, 'fm00') || '.' || TO_CHAR(MAS.Massnahme_Nr, 'fm000') AS Ident,"+
         "MTX.Massnahme_Titel AS Control,"+
         "STW.Status_Wert_En AS Compliance_Status,"+
         "STA.Status_Kommentar AS Justification "+
         "FROM ITSEC_MASSN_STATUS STA "+
         "INNER JOIN ITSEC_MASSN_STWERT STW ON pck_SISec.EffStatusId(STA.Itsec_Massn_St_Id)=STW.Itsec_Massn_Wertid "+ 
         "INNER JOIN ITSEC_MASSN MAS ON STA.Massnahme_Gstoolid=MAS.Massnahme_Id " + 
         "LEFT OUTER JOIN ITSEC_MASSNT MTX ON MAS.Massnahme_Id=MTX.Massnahme_Id AND MTX.Langu = 'en' "+
         "WHERE STA.Itsec_Massn_St_Id IN (SELECT   STA.Itsec_Massn_St_Id "+
         "FROM  TABLE(pck_SISec.FT_Compliance("+tableId+","+ciID+")) STA "+     
         "WHERE (pck_SISec.EffStatusId(STA.Itsec_Massn_St_Id) <> 5 "+
         "OR  STA.Ref_Table_Id IS NOT NULL)"+
         "AND (NVL(STA.Ref_Table_ID, 0) <> STA.Tabelle_ID "+
         "OR  NVL(STA.Ref_PK_ID, 0) <> "+ciID+"))ORDER BY MAS.Katalog_Id, MAS.Massnahme_Nr";
		
		try{
			tx=session.beginTransaction();
			Connection con=session.connection();
			selectStmt=con.createStatement();
			ResultSet resultSet = selectStmt.executeQuery(sql);
			if(resultSet != null){
				while(resultSet.next()) {
					ComplianceControlDTO controlDTO = new ComplianceControlDTO();
					controlDTO.setItsec_Massn_St_Id(resultSet.getLong("Itsec_Massn_St_Id"));
					controlDTO.setControl(resultSet.getString("Control"));
					controlDTO.setCompliance_status(resultSet.getString("Compliance_Status"));
					controlDTO.setJustification(resultSet.getString("Justification"));
					controlDTO.setIdent(resultSet.getString("Ident"));
					compControlDTOs.add(controlDTO);
				}
			}
			if (null != resultSet) {
				resultSet.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != con) {
				con.close();
			}
			 
		}catch (Exception e) {
			System.out.println(e.toString());
		}finally{
			HibernateUtil.close(tx, session, false);
		}
     
		return compControlDTOs;
	}
			
}
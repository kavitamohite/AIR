package com.bayerbbs.applrepos.hibernate;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.CiTypeDTO;
import com.bayerbbs.applrepos.dto.DwhEntityDTO;
import com.bayerbbs.applrepos.dto.ReferenzDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.DwhEntityParameterOutput;

public class CiEntitiesHbn {
	
	//ApplicationDTO
	public static List<CiItemDTO> findExistantCisByNameOrAlias(String searchName, boolean withDeletedApplications) {
		ArrayList<CiItemDTO> listResult = new ArrayList<CiItemDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		searchName = searchName.toUpperCase();
		
		StringBuffer sql = new StringBuffer();

		sql.append("select * from DWH_ENTITY  where");
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

			conn = session.connection();

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
		return findCisByNameOrAlias(searchName, AirKonstanten.PARAMETER_QUERYMODE_EXACT, false, null, null, 0, 1000);
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
	public static List<CiItemDTO> findCisByNameOrAlias(String searchName, String queryMode, boolean onlyApplications, String sort, String dir, Integer startwert, Integer limit) {
		ArrayList<CiItemDTO> listResult = new ArrayList<CiItemDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
		Connection conn = null;

		searchName = searchName.toUpperCase();
		
		StringBuffer sql = new StringBuffer();

		sql.append("select /*+ INDEX (DWH_ENTITY FIX_143_16) */ * from DWH_ENTITY  where");
		sql.append(" upper(deleted) = 'NO'");
		sql.append(" and TABLE_ID in (");
		sql.append(AirKonstanten.TABLE_ID_APPLICATION);

		if (onlyApplications) {
			sql.append(") and UPPER(type) = UPPER('Application')");
		} else {
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_IT_SYSTEM);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_ROOM);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_BUILDING);//TABLE_ID_WAYS
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_BUILDING_AREA);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_TERRAIN);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_POSITION);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_SITE);
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
		
		
		if (StringUtils.isNotNullOrEmpty(sort)) {
			if ("applicationName".equals(sort)) {
				sql.append(" order by NAME");
			}
			else if ("applicationAlias".equals(sort)) {
				sql.append(" order by ASSET_ID_OR_ALIAS");
			}
			else if ("applicationCat1Txt".equals(sort)) {
				sql.append(" order by TYPE");
			}
			else if ("applicationCat2Txt".equals(sort)) {
				sql.append(" order by CATEGORY");
			}
			else if ("responsible".equals(sort)) {
				sql.append(" order by RESPONSIBLE");
			}
			else if ("subResponsible".equals(sort)) {
				sql.append(" order by SUB_RESPONSIBLE");
			}
			else if ("applicationOwner".equals(sort)) {
				sql.append(" order by APP_OWNER");
			}
			else if ("applicationOwnerDelegate".equals(sort)) {
				sql.append(" order by APP_OWNER_DELEGATE");
			}
		}
		else {
			sql.append(" order by name");
		}
		
		if (StringUtils.isNotNullOrEmpty(dir)) {
			sql.append(" ").append(dir);
		}
		
		try {
			tx = session.beginTransaction();
			conn = session.connection();
			selectStmt = conn.createStatement();
			
			ResultSet rset = selectStmt.executeQuery(sql.toString());
			
			if (null != rset) {

				long counter = 0;
				
				while (rset.next() && (counter < startwert + limit)) {
					
					if (counter < startwert + limit) {
						CiItemDTO anwendung = getApplicationDTOFromResultSet(rset);//ApplicationDTO
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

	public static Long findCountCisByNameOrAlias(String searchName, String queryMode, boolean onlyApplications) {
		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
		Connection conn = null;

		searchName = searchName.toUpperCase();
		
		StringBuffer sql = new StringBuffer();

		sql.append("select count(*) from DWH_ENTITY  where");
		sql.append(" upper(deleted) = 'NO'");
		sql.append(" and TABLE_ID in (");
		sql.append(AirKonstanten.TABLE_ID_APPLICATION);

		if (onlyApplications) {
			sql.append(") and UPPER(type) = UPPER('Application')");
		} else {
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_IT_SYSTEM);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_ROOM);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_BUILDING);//TABLE_ID_WAYS
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_BUILDING_AREA);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_TERRAIN);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_POSITION);
			sql.append(AirKonstanten.KOMMA);
			sql.append(AirKonstanten.TABLE_ID_SITE);
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
			conn = session.connection();
			selectStmt = conn.createStatement();
			
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
		Connection conn = null;

		searchName = searchName.toUpperCase();
		StringBuffer sql = new StringBuffer();
		sql.append("select /*+ INDEX (DWH_ENTITY FIX_143_16) */ * from DWH_ENTITY  where");

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
			conn = session.connection();

			selectStmt = conn.createStatement();
			//System.out.println(sql.toString());
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
		Connection conn = null;

		searchName = searchName.toUpperCase();
		StringBuffer sql = new StringBuffer();

		sql.append("select * from DWH_ENTITY  where");
		sql.append(" upper(deleted) = 'NO'");
		sql.append(" and upper(type) = upper('").append(typename).append("')");
		
		sql.append(" and (upper(name) like '%" + searchName + "%'  or upper(ASSET_ID_OR_ALIAS) like '%" +searchName + "%')");
		sql.append(" order by NAME");
		
		try {
			tx = session.beginTransaction();
			conn = session.connection();

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
		Long ci_id = null;
		String category = null;
		Integer tableId = null;
		String deleted = null;
		
		try {
			type = rset.getString("TYPE");
//			id = rset.getString("ID");
			name = rset.getString("NAME");
			assetIdOrAlias = rset.getString("ASSET_ID_OR_ALIAS");
			responsible = rset.getString("RESPONSIBLE");
			subResponsible = rset.getString("SUB_RESPONSIBLE");
			category = rset.getString("CATEGORY");
			ci_id = rset.getLong("CI_ID");
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
		anw.setApplicationOwner(applicationOwner);
		anw.setApplicationOwnerDelegate(applicationOwnerDelegate);
		anw.setApplicationSteward(applicationSteward);
		anw.setDeleteQuelle(deleted);
		anw.setTableId(tableId);
		
		return anw;
	}

	//ApplicationDTO
	public static List<CiItemDTO> findCisByOUunit(String ouCiType, String ouUnit, String ciOwnerType, String ouQueryMode) {
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
			
			sql.append("')) order by name");
			
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
	public static List<CiItemDTO> findMyCisForDelete(String cwid, String sort, String dir, boolean onlyApplications) {
		return findMyCisOwnerOrDelegate("pck_air.FT_My_CIs", cwid, sort, dir, onlyApplications);
	}
	
	//ApplicationDTO
	private static List<CiItemDTO> findMyCisOwnerOrDelegate(String ownerDelegate, String cwid, String sort, String dir, boolean onlyApplications) {
		StringBuffer sql = new StringBuffer();
		
		sql.append("SELECT * FROM TABLE (").append(ownerDelegate).append("('").append(cwid.toUpperCase()).append("'))");

		if (onlyApplications) {
			sql.append(" where TYPE= 'Application'"); 
		}
		
		// Order
		if (StringUtils.isNotNullOrEmpty(sort)) {
			if ("applicationName".equals(sort)) {
				sql.append(" order by NAME");
			}
			else if ("applicationAlias".equals(sort)) {
				sql.append(" order by ASSET_ID_OR_ALIAS");
			}
			else if ("applicationCat1Txt".equals(sort)) {
				sql.append(" order by TYPE");
			}
			else if ("applicationCat2Txt".equals(sort)) {
				sql.append(" order by CATEGORY");
			}
			else if ("responsible".equals(sort)) {
				sql.append(" order by RESPONSIBLE");
			}
			else if ("subResponsible".equals(sort)) {
				sql.append(" order by SUB_RESPONSIBLE");
			}
			else if ("applicationOwner".equals(sort)) {
				sql.append(" order by APP_OWNER");
			}
			else if ("applicationOwnerDelegate".equals(sort)) {
				sql.append(" order by APP_OWNER_DELEGATE");
			}
			
		}
		else {
			sql.append(" order by name");
		}

		// Order direction
		if (StringUtils.isNotNullOrEmpty(dir)) {
			sql.append(" ").append(dir);
		}
			
		return findCis(sql.toString());
	}

	
	private static List<CiItemDTO> findCis(String sql) {//ApplicationDTO
		ArrayList<CiItemDTO> listeAnwendungen = new ArrayList<CiItemDTO>();//ApplicationDTO

		boolean commit = false;
		Transaction ta = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;
		
		try {
			ta = session.beginTransaction();
			conn = session.connection();
			
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
	
	public static DwhEntityParameterOutput findByTypeAndName(String ciType, String ciName, int start, int limit) {
		String sql = "SELECT * FROM TABLE (pck_air.ft_findcis('" + ciName + "', '" + ciType + "'))";
		
		Transaction ta = null;
		Statement stmt = null;
		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		List<DwhEntityDTO> dwhEntities = new ArrayList<DwhEntityDTO>();
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();
		int i = 0;
		
		try {
			ta = session.beginTransaction();
			conn = session.connection();
			stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = stmt.executeQuery(sql);
			
			if (0 != start) { 
				rs.absolute(start + 1);//relative
			}
//			rs.setFetchSize(limit);
			
			DwhEntityDTO dwhEntity = null;
			
			while (rs.next()) {
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
	
	public static void saveCiRelations(Integer tableId, Long ciId, String ciRelationsAddList, String ciRelationsDeleteList, String direction, String cwid) {
		String sql = "{call pck_air.p_save_relations(?,?,?,?,?,?)}";//"begin pck_air.p_save_relations(?,?,?,?,?,?);//"EXEC pck_air.p_save_relations ("+tableId+", "+ciId+", "+ciRelationsAddList+", "+ciRelationsDeleteList+", "+direction+", "+cwid+")";
		
		Transaction ta = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;
		
		try {
			ta = session.beginTransaction();
			Connection conn = session.connection();
			
			CallableStatement stmt = conn.prepareCall(sql);
			stmt.setLong(1, tableId);
			stmt.setLong(2, ciId);
			stmt.setString(3, ciRelationsAddList);
			stmt.setString(4, ciRelationsDeleteList);
			stmt.setString(5, direction);
			stmt.setString(6, cwid);
			stmt.executeUpdate();
			ta.commit();
			
			stmt.close();
			conn.close();
			
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
	}


	public static DwhEntityParameterOutput getDwhEntityRelations(Long tableId, Long ciId, String direction) {
		String sql = "SELECT * FROM TABLE (pck_air.ft_relatedcis("+tableId+","+ciId+",'"+direction+"'))";//"begin pck_air.p_save_relations(?,?,?,?,?,?);//"EXEC pck_air.p_save_relations ("+tableId+", "+ciId+", "+ciRelationsAddList+", "+ciRelationsDeleteList+", "+direction+", "+cwid+")";
		
		Transaction ta = null;
		Statement stmt = null;
		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		List<DwhEntityDTO> dwhEntities = new ArrayList<DwhEntityDTO>();
		DwhEntityParameterOutput output = new DwhEntityParameterOutput();
		
		try {
			ta = session.beginTransaction();
			conn = session.connection();
			stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery(sql);

			
			DwhEntityDTO dwhEntity = null;
			
			while (rs.next()) {
				dwhEntity = new DwhEntityDTO();
				
				dwhEntity.setCiId(rs.getString("CI_ID"));
				dwhEntity.setCiType(rs.getString("TYPE"));
				dwhEntity.setCiName(rs.getString("NAME"));
//				dwhEntity.setCiAlias(rs.getString("ASSET_ID_OR_ALIAS"));
				dwhEntity.setDwhEntityId(rs.getString("ID"));
				dwhEntity.setSource(rs.getString("SOURCE"));
				
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
		Connection conn = null;
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
			conn = session.connection();
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
	
	public static List<CiTypeDTO> getCiTypes() {
		List<CiTypeDTO> ciTypes = new ArrayList<CiTypeDTO>();
		
		Transaction ta = null;
		Statement stmt = null;
		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		StringBuilder sql = new StringBuilder();//"SELECT ci_id, table_id, type, name, itset, FROM dwh_entity WHERE template = 'Yes'";
		sql.
		append("select t.tabelle_name, cit.config_item_type_name, tcit.table_id, ").
		append("  case when tcit.table_id = 2 then ak1.anwendung_kat1_id ").
		append("       when cit.config_item_type_name = 'Hardware System' then 1 ").
		append("       when cit.config_item_type_name = 'Transient System Platform' then 2 ").
		append("       else null end as ci_sub_type_id ").
		append("from table_config_item_type tcit ").
		append("join config_item_type cit on cit.config_item_type_id = tcit.config_item_type_id ").
		append("join tabellen t on t.tabelle_id = tcit.table_id ").
		append("left join anwendung_kat1 ak1 on ak1.anwendung_kat1_en = cit.config_item_type_name ").
//		append("where t.type = 'CI TABLE (class 1)' ").
		append("where (t.type = 'CI TABLE (class 1)' AND t.tabelle_id NOT IN (19,37,123)) OR (t.type = 'CI TABLE (class 2)' AND t.tabelle_id = 12)").
		append("order by t.tabelle_id ");
		
		try {
			ta = session.beginTransaction();
			conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());
			
			int i = 0;
			while (rs.next()) {
				//roles getRolePerson(cwid): evtl. nur zu Rollen passende CI-Typen liefern
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
}
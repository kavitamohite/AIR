package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.dto.LinkCIDTO;
import com.bayerbbs.applrepos.dto.LinkCITypeDTO;

public class ComplianceHbn {

	public static LinkCITypeDTO[] getArrayFromList(List<LinkCITypeDTO> input) {
		LinkCITypeDTO output[] = new LinkCITypeDTO[input.size()];
		int i = 0;
		for (final LinkCITypeDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}
	
	
	public static List<LinkCITypeDTO> findLinkCIType() {

		List<LinkCITypeDTO> listResult = new ArrayList<LinkCITypeDTO>();
		
		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT   Zielotyp_Gstoolid, Zielobjekt_Typ, Zielobjekt_Typ_En, tabelle_id ");
		// sql.append("DECODE('").append(language).append("', 'de', Zielobjekt_Typ, Zielobjekt_Typ_En) AS Type ");
		sql.append("FROM     ITSEC_ZIELOBJ_TYP ");
		sql.append("WHERE    Tabelle_Id <> 0 ");
		sql.append("ORDER BY Sort");

		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				while (rset.next()) {
					long zielotyp_gstoolid = rset.getLong("ZIELOTYP_GSTOOLID");
					String typeDE = rset.getString("ZIELOBJEKT_TYP");
					String typeEN = rset.getString("ZIELOBJEKT_TYP_EN");
					String tableId = rset.getString("TABELLE_ID");
					
					listResult.add(new LinkCITypeDTO(zielotyp_gstoolid, "de", typeDE, tableId));
					listResult.add(new LinkCITypeDTO(zielotyp_gstoolid, "en", typeEN, tableId));
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
	
	public static LinkCIDTO[] getArrayFromListLinkCIList(List<LinkCIDTO> input) {
		LinkCIDTO output[] = new LinkCIDTO[input.size()];
		int i = 0;
		for (final LinkCIDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

//	public static List<LinkCIDTO> findLinkCIList(long zielotypGSToolId, long itSetId, long applicationId, long massnahmeId) {
//		return findLinkCIList(zielotypGSToolId, itSetId, applicationId, massnahmeId, 0);
//	}

	public static List<LinkCIDTO> findLinkCIList(long zielotypGSToolId, long itSetId, long applicationId, long massnahmeId, long applicationCat1Id) {
		List<LinkCIDTO> listResult = new ArrayList<LinkCIDTO>();
		
		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;
		
		StringBuffer sql = new StringBuffer();
		//TODO: prüfen ob if richtig:
		boolean isAnwendungCi = isAnwendungCi(zielotypGSToolId);
		if (isAnwendungCi) {
			sql.append("");
			// ANWENDUNG:
			sql.append("SELECT   CI.Anwendung_Id AS Id, CAT.Application_Cat1_Id AS subTypeId,");
			sql.append(" '(' || VBD.It_Verbund_Name || ') ' || CI.Anwendung_Name AS Name,");
			sql.append("  CASE VBD.Gstool_Zob_Id"); 
			sql.append("	WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name");
			sql.append("	ELSE It_Verbund_Name"); 
			sql.append(" END AS Sort1");
			sql.append(" FROM     ANWENDUNG CI"); 
			sql.append(" INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append(" INNER JOIN V_MD_APPLICATION_CAT CAT ON CI.Anwendung_Kat2_Id=CAT.Application_Cat2_Id"); 
			sql.append(" INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append("	AND      CI.Template = -1");
			sql.append("	AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append("	AND      CAT.Application_Cat1_Id = ").append(applicationCat1Id);//applicationCat1Id zielotypGSToolId
			sql.append("	AND      CI.Anwendung_Id <> ").append(applicationId);
			sql.append("	ORDER BY Sort1, CI.Anwendung_Name");
		}
		else if (4 == zielotypGSToolId) {
			// NET_SECURITY_ZONES:
			sql.append("SELECT   CI.Net_Security_Zone_Id AS Id,");
			sql.append(" '(' || VBD.It_Verbund_Name || ') ' || CI.Net_Security_Zone_Name AS Name,");
			sql.append(" CASE VBD.Gstool_Zob_Id"); 
			sql.append(" WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name");
			sql.append(" ELSE It_Verbund_Name"); 
			sql.append(" END AS Sort1");
			sql.append(" FROM     NET_SECURITY_ZONES CI"); 
			sql.append(" INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append(" INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Net_Security_Zone_Name");
		}
		else if (3 == zielotypGSToolId) {
			// IT_SYSTEM:
			sql.append("SELECT   CI.It_System_Id AS Id,");
			sql.append(" '(' || VBD.It_Verbund_Name || ') ' || CI.It_System_Name AS Name,");
			sql.append(" CASE VBD.Gstool_Zob_Id"); 
			sql.append(" WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append("  ELSE It_Verbund_Name"); 
			sql.append("  END AS Sort1");
			sql.append(" FROM     IT_SYSTEM CI"); 
			sql.append("         INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("         INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.It_System_Name");
		}
		else if (-10015 == zielotypGSToolId) {
			// SCHRANK:
			sql.append("SELECT   CI.Schrank_Id AS Id,");
			sql.append(" '(' || VBD.It_Verbund_Name || ') ' || CI.Schrank_Name AS Name,");
			sql.append("        CASE VBD.Gstool_Zob_Id"); 
			sql.append(" WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append(" ELSE It_Verbund_Name"); 
			sql.append(" END AS Sort1");
			sql.append(" FROM     SCHRANK CI"); 
			sql.append(" INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append(" INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Schrank_Name");
		}
		else if (2 == zielotypGSToolId) {
			// RAUM:
			sql.append("SELECT   CI.Raum_Id AS Id,");
			sql.append(" '(' || VBD.It_Verbund_Name || ') ' || CI.Raum_Name AS Name,");
			sql.append("         CASE VBD.Gstool_Zob_Id"); 
			sql.append(" WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append(" ELSE It_Verbund_Name"); 
			sql.append(" END AS Sort1");
			sql.append(" FROM     RAUM CI"); 
			sql.append("	INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("	INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Raum_Name");
		}
		else if (-10005 == zielotypGSToolId) {
			// BUILDING_AREA:
			sql.append("SELECT   CI.Area_Id AS Id,");
			sql.append(" '(' || VBD.It_Verbund_Name || ') ' || CI.Area_Name AS Name,");
			sql.append(" CASE VBD.Gstool_Zob_Id"); 
			sql.append(" WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append(" ELSE It_Verbund_Name"); 
			sql.append(" END AS Sort1");
			sql.append(" FROM     BUILDING_AREA CI"); 
			sql.append("         INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("         INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Area_Name");
		}
		else if (1 == zielotypGSToolId) {
			// GEBAEUDE:
			sql.append("SELECT   CI.Gebaeude_Id AS Id,");
			sql.append("         '(' || VBD.It_Verbund_Name || ') ' || CI.Gebaeude_Name AS Name,");
			sql.append("         CASE VBD.Gstool_Zob_Id"); 
			sql.append("              WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append("              ELSE It_Verbund_Name"); 
			sql.append("         END AS Sort1");
			sql.append(" FROM     GEBAEUDE CI"); 
			sql.append("			         INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("         INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Gebaeude_Name");
		}
		else if (-10012 == zielotypGSToolId) {
			// TERRAIN:
			sql.append("SELECT   CI.Terrain_Id AS Id,");
			sql.append("         '(' || VBD.It_Verbund_Name || ') ' || CI.Terrain_Name AS Name,");
			sql.append("         CASE VBD.Gstool_Zob_Id"); 
			sql.append("              WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append("              ELSE It_Verbund_Name"); 
			sql.append("         END AS Sort1");
			sql.append(" FROM     TERRAIN CI"); 
			sql.append("         INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("         INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Terrain_Name");
		}
		else if (-10011 == zielotypGSToolId) {
			// STANDORT:
			sql.append("SELECT   CI.Standort_Id AS Id,");
			sql.append("         '(' || VBD.It_Verbund_Name || ') ' || CI.Standort_Name AS Name,");
			sql.append("         CASE VBD.Gstool_Zob_Id"); 
			sql.append("              WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append("              ELSE It_Verbund_Name"); 
			sql.append("         END AS Sort1");
			sql.append(" FROM     STANDORT CI"); 
			sql.append("         INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("         INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      CI.Template = -1");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Standort_Name");
		}
		else if (-10014 == zielotypGSToolId || -10017 == zielotypGSToolId) {
			// WAYS:
			sql.append("SELECT   CI.Ways_Id AS Id,");
			sql.append("	         '(' || VBD.It_Verbund_Name || ') ' || CI.Ways_Name AS Name,");
			sql.append("	         CASE VBD.Gstool_Zob_Id"); 
			sql.append("	              WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append("	              ELSE It_Verbund_Name"); 
			sql.append("	         END AS Sort1");
			sql.append("	FROM     WAYS CI"); 
			sql.append("	         INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("	         INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append("	WHERE    CI.Del_Timestamp is NULL");
			sql.append("	AND      CI.Template = -1");
			sql.append("	AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append("	ORDER BY Sort1, CI.Ways_Name");
		}
		else if (6 == zielotypGSToolId) {
			// FUNCTION:
			sql.append("SELECT   CI.Function_Id AS Id,");
			sql.append("         '(' || VBD.It_Verbund_Name || ') ' || CI.Function_Name AS Name,");
			sql.append("         CASE VBD.Gstool_Zob_Id"); 
			sql.append("              WHEN ").append(itSetId).append(" THEN ' ' || It_Verbund_Name"); 
			sql.append("              ELSE It_Verbund_Name"); 
			sql.append("         END AS Sort1");
			sql.append(" FROM     FUNCTION CI"); 
			sql.append("         INNER JOIN ITSEC_MOD MOD ON CI.Itsec_Gruppe_Id=MOD.Itsec_Gruppe_Id"); 
			sql.append("         INNER JOIN ITSEC_IT_VERBUND VBD ON CI.Itset=VBD.Gstool_Zob_Id");
			sql.append(" WHERE    CI.Del_Timestamp is NULL");
			sql.append(" AND      MOD.Massnahme_Id = ").append(massnahmeId);
			sql.append(" ORDER BY Sort1, CI.Function_Name");
		}


		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rset = selectStmt.executeQuery(sql.toString());
			LinkCIDTO linkCI = null;
			Long subTypeId = null;

			if (null != rset) {
				while (rset.next()) {
					long id = rset.getLong("Id");
					String name = rset.getString("Name");
					String sort = rset.getString("Sort1");
					
					if(isAnwendungCi) {
						subTypeId = rset.getLong("subTypeId");
						linkCI = new LinkCIDTO(id, name, sort, subTypeId);
					} else {
						linkCI = new LinkCIDTO(id, name, sort);
					}
					
					listResult.add(linkCI);
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


	private static boolean isAnwendungCi(long zielotypGSToolId) {
		return 5 == zielotypGSToolId || -10006 == zielotypGSToolId || -10013 == zielotypGSToolId || -10007 == zielotypGSToolId;
	}

}

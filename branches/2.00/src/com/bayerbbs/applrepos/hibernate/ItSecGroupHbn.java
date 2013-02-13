package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ItSecGroup;
import com.bayerbbs.applrepos.dto.ItSecGroupDTO;


public class ItSecGroupHbn {

	/** The logger. */
	private static final Log log = LogFactory.getLog(ItSecGroupHbn.class);

	
	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ItSecGroupDTO[] getArrayFromList(
			List<ItSecGroupDTO> input) {
		ItSecGroupDTO output[] = new ItSecGroupDTO[input.size()];
		int i = 0;
		for (final ItSecGroupDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	
	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<ItSecGroupDTO> getDTOList(
			List<ItSecGroup> input) {
		ArrayList<ItSecGroupDTO> listDTO = new ArrayList<ItSecGroupDTO>();

		for (Iterator<ItSecGroup> iter = input.iterator(); iter.hasNext();) {
			ItSecGroup data = iter.next();
			ItSecGroupDTO dto = new ItSecGroupDTO();

			dto.setItSecGroupId(data.getId());
			dto.setItSecGroupName(data.getName());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ItSecGroupDTO> getListItSecGroupWerteOLD() {

		List<ItSecGroupDTO> listResult = new ArrayList<ItSecGroupDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ItSecGroup> values = session.createQuery(
						"select h from ItSecGroup as h order by h.sort, h.name").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}


	//für alle CI Typen, die tableId dazu
	public static List<ItSecGroupDTO> getListItSecGroupWerte() {
		ArrayList<ItSecGroupDTO> listResult = new ArrayList<ItSecGroupDTO>();
		StringBuffer sql = new StringBuffer();

		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();
		Connection conn = null;

//		sql.append("select h.itsec_grp_gstoolid, h.itsec_gruppe, i.it_verbund_zob_id1 from ItSec_Gruppe h ");// --order by h.sort, h.name --ItSecGroup
//		sql.append("join itverbund_itsecgrp i on i.itsec_gruppe_zobid = h.itsec_grp_gstoolid order by h.itsec_gruppe");
		
		sql.append("SELECT distinct VBD.It_Verbund_Zob_Id1, GRP.Itsec_Grp_Gstoolid, ZOT.Zielotyp_Gstoolid, ZOT.tabelle_id, ");
		sql.append("CASE GRP.Itsec_Grp_Gstoolid WHEN 10136 THEN NULL ELSE GRP.Itsec_Gruppe END AS Itsec_Gruppe ");//--" & gclngDefault_ItsecGrp & " 
		sql.append("FROM ITSEC_GRUPPE GRP ");
		sql.append("INNER JOIN ITVERBUND_ITSECGRP VBD ON GRP.Itsec_Grp_Gstoolid=VBD.Itsec_Gruppe_Zobid ");
		sql.append("INNER JOIN ITSEC_ZIELOBJ_TYP ZOT ON GRP.Zielotyp_Gstoolid=ZOT.Zielotyp_Gstoolid ");
//		sql.append("WHERE ZOT.Zielotyp_Gstoolid = -10006 ");// -10006 -10013 5 vcitCITyp
//		sql.append("AND VBD.It_Verbund_Zob_Id1 = 10002 ");
		//UNION SELECT Itsec_Grp_GstoolId, NULL FROM ITSEC_GRUPPE WHERE Itsec_Grp_Gstoolid = 10136--" & gclngDefault_ItsecGrp
		sql.append("ORDER BY Itsec_Gruppe");
		
		try {
			tx = session.beginTransaction();
			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					ItSecGroupDTO dto = new ItSecGroupDTO();
					dto.setItSecGroupId(rsMessage.getLong("ITSEC_GRP_GSTOOLID"));
					dto.setItSecGroupName(rsMessage.getString("ITSEC_GRUPPE"));
					dto.setItsetId(rsMessage.getLong("IT_VERBUND_ZOB_ID1"));
					dto.setCiKat1(rsMessage.getLong("ZIELOTYP_GSTOOLID"));
					dto.setTableId(rsMessage.getLong("TABELLE_ID"));
					
					listResult.add(dto);
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
}
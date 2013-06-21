package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.dto.ItsecMassnahmeDetailDTO;
import com.bayerbbs.applrepos.dto.ItsecMassnahmenDTO;
import com.bayerbbs.applrepos.dto.ItsecMassnahmenStatusWertDTO;

public class ItsecHbn {

	
	/** The logger. */
	private static final Log log = LogFactory.getLog(ItsecHbn.class);


	
	public static List<ItsecMassnahmenDTO> findItsecMassnahmen(Long tableId, Long ciId, String language) {
		
		long itVerbundZobId = 10002;
		
		ArrayList<ItsecMassnahmenDTO> listDTO = new ArrayList<ItsecMassnahmenDTO>();
		
		if (null != tableId && null != ciId && StringUtils.isNotNullOrEmpty(language)) {

			boolean commit = false;
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

//			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			
			sql.append("SELECT   STA.Itsec_Massn_St_Id,");
			sql.append(" TO_CHAR(MAS.Katalog_Id, 'fm00') || '.' || TO_CHAR(MAS.Massnahme_Nr,'fm000') AS Ident,");
			sql.append(" MTX.Massnahme_Titel,");
//			sql.append(" DECODE(MTX.Langu, '").append("de").append("', STW.Status_Wert, STW.Status_Wert_En) AS Status_Wert,");//language.toLowerCase()
			sql.append(" STW.Status_Wert, STW.Status_Wert_En,");//language.toLowerCase()

			// für die Liste laut Simon
//			sql.append(" STW.ITSEC_MASSN_WERTID AS STATUS_WERT_ID,");
			
			sql.append(" STA.Massnahme_Gstoolid,");
			sql.append(" STA.Zob_Id,");
			sql.append(" MAS.Link,");
			
			// sub-select für die choco-Funktion
			sql.append("(SELECT COUNT(*) AS Cnt FROM ITSEC_MOD MOD INNER JOIN ITVERBUND_ITSECGRP V2G ON MOD.Itsec_Gruppe_Id=V2G.Itsec_Gruppe_Zobid");
			sql.append(" INNER JOIN ITSEC_GRUPPE GRP ON MOD.Itsec_Gruppe_Id=GRP.Itsec_Grp_Gstoolid WHERE MOD.Massnahme_Id = STA.Massnahme_Gstoolid AND");
			sql.append(" V2G.It_Verbund_Zob_Id1 = ").append(itVerbundZobId).append(" AND GRP.Zielotyp_Gstoolid = 6) AS Choco");
			
			sql.append(" FROM     TABLE(pck_SISec.FT_Compliance(").append(tableId).append(",").append(ciId).append(")) STA ");
			sql.append(" INNER JOIN ITSEC_MASSN MAS ON STA.Massnahme_Gstoolid=MAS.Massnahme_Id"); 
			sql.append(" INNER JOIN ITSEC_MASSN_STWERT STW ON STW.Itsec_Massn_Wertid=NVL(pck_SISec.EffStatusId(STA.Itsec_Massn_St_Id), 5)"); 
			sql.append(" LEFT OUTER JOIN ITSEC_MASSNT MTX ON STA.Massnahme_Gstoolid=MTX.Massnahme_Id AND MTX.Langu='").append(language.toLowerCase()).append("'");//"de" language
			sql.append(" ORDER BY MAS.Katalog_ID, MAS.Massnahme_Nr");
			
			
			
			try {
				tx = session.beginTransaction();

				@SuppressWarnings("deprecation")
				Connection conn = HibernateUtil.getSession().connection();

				selectStmt = conn.createStatement();
				ResultSet rsSet = selectStmt
						.executeQuery(sql.toString());

				if (null != rsSet) {
					while (rsSet.next()) {
						ItsecMassnahmenDTO dto = new ItsecMassnahmenDTO();
						dto.setItsecMassnahmenStatusId(rsSet.getLong("ITSEC_MASSN_ST_ID"));
						dto.setIdent(rsSet.getString("IDENT"));
						dto.setMassnahmeTitel(rsSet.getString("MASSNAHME_TITEL"));
						dto.setStatusWertEn(rsSet.getString("STATUS_WERT"));//STATUS_WERT STATUS_WERT_EN
						dto.setStatusWert(rsSet.getString("STATUS_WERT_EN"));//STATUS_WERT_EN STATUS_WERT
//						dto.setStatusWertId(rsSet.getLong("STATUS_WERT_ID"));
						dto.setMassnahmeGstoolId(rsSet.getLong("MASSNAHME_GSTOOLID"));
						dto.setZobId(rsSet.getLong("ZOB_ID"));
						dto.setMassnahmeLink(rsSet.getString("Link"));
						dto.setChocoMerkmal(rsSet.getInt("Choco"));	// Choco-Merkmal, ob diese Massnahme auf eine Funktion verlinkt werden darf
						listDTO.add(dto);
					}
				}
				commit = true;
				
			} catch (Exception e) {
				log.error(e);
			}
			finally {
				HibernateUtil.close(tx, session, commit);
			}

			
		}

		return listDTO;
	}

	
	public static ItsecMassnahmeDetailDTO findItsecMassnahmeDetail(Long itsecGruppenId, Long itsecMassnahmenStatusId) { 
		
		ItsecMassnahmeDetailDTO dto = null;
		
		if (null != itsecGruppenId && null != itsecMassnahmenStatusId) {

			boolean commit = false;
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

//			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			
			sql.append("SELECT");
			sql.append(" STA.Itsec_Massn_St_Id,");
			sql.append(" MAS.Massnahme_Id AS Massnahme_Gstoolid,");
			sql.append(" MAS.Katalog_Id,");
			sql.append(" MAS.Massnahme_Nr,");
			sql.append(" NVL(MTX.Massnahme_Titel,'') AS Massnahme_Titel,");
			sql.append(" MAS.Link,");
			sql.append(" STA.Status_Id,");
			sql.append(" CASE GRP.Itsec_Grp_Gstoolid");
			sql.append("      WHEN ").append(itsecGruppenId).append(" THEN NULL ");
			sql.append("      ELSE GRP.Itsec_Gruppe ");
			sql.append(" END AS Itsec_Gruppe,");
			sql.append(" STA.Status_Kommentar,");
			sql.append(" STA.Template_Exception,");
			sql.append(" STA.Gap,");
			sql.append(" STA.Gap_Responsible,");
			sql.append(" STA.Gap_Measure,");
			sql.append(" STA.Gap_End_Date,");
			sql.append(" NVL(MAS.Secu03_Relevance, 0) + NVL(MAS.Secu04_Relevance, 0) + NVL(MAS.Secu05_Relevance, 0) + NVL(MAS.Secu06_Relevance, 0) + NVL(MAS.Secu07_Relevance, 0) + NVL(MAS.Secu08_Relevance, 0) AS Secu_Relevance,");
			sql.append(" NVL(MAS.Accs01_Relevance, 0) + NVL(MAS.Accs02_Relevance, 0) + NVL(MAS.Accs03_Relevance, 0) + NVL(MAS.Accs04_Relevance, 0) + NVL(MAS.Accs05_Relevance, 0) + NVL(MAS.Accs06_Relevance, 0) + NVL(MAS.Accs07_Relevance, 0) AS Accs_Relevance,");
			sql.append(" NVL(MAS.Itop01_Relevance, 0) + NVL(MAS.Itop02_Relevance, 0) + NVL(MAS.Itop03_Relevance, 0) + NVL(MAS.Itop04_Relevance, 0) + NVL(MAS.Itop05_Relevance, 0) AS Itop_Relevance,");
			sql.append(" STA.Gap_Priority,");
			sql.append(" STA.Ref_Table_Id,");
			sql.append(" STA.Ref_Pk_Id,");
			sql.append(" STA.Expense,");
			sql.append(" STA.Prob_Occurence,");
			sql.append(" STA.Damage,");
			sql.append(" STA.Mitigation_Potential,");
			sql.append(" STA.Signee,");
			sql.append(" STA.Gap_Class_Approved,");
			sql.append(" STA.Expense_T,");
			sql.append(" STA.Prob_Occurence_T,");
			sql.append(" STA.Damage_T,");
			sql.append(" STA.Mitigation_Potential_T,");
			sql.append(" NVL(STA.Risk_Analysis_As_Freetext, 0) AS Risk_Analysis_As_Freetext,");
			sql.append(" STA.Gap_End_Date_Increased,");
			sql.append(" STA.Currency");
			sql.append(" FROM     ITSEC_MASSN_STATUS STA");
			sql.append("   INNER JOIN ITSEC_GRUPPE GRP ON STA.Zob_Id=GRP.Itsec_Grp_Gstoolid");
			sql.append("   INNER JOIN ITSEC_MASSN MAS ON MAS.Massnahme_Id=STA.Massnahme_Gstoolid");
			sql.append("  LEFT OUTER JOIN ITSEC_MASSNT MTX ON MAS.Massnahme_Id=MTX.Massnahme_Id AND MTX.Langu='de'");
			sql.append(" WHERE    STA.Itsec_Massn_St_Id = ").append(itsecMassnahmenStatusId);
			
			
			try {
				tx = session.beginTransaction();

				@SuppressWarnings("deprecation")
				Connection conn = HibernateUtil.getSession().connection();

				selectStmt = conn.createStatement();
				ResultSet rsSet = selectStmt
						.executeQuery(sql.toString());

				if (null != rsSet) {
					while (rsSet.next()) {
						dto = new ItsecMassnahmeDetailDTO();
						dto.setItsecMassnahmenStatusId(rsSet.getLong("ITSEC_MASSN_ST_ID"));
						dto.setMassnahmeGstoolId(rsSet.getLong("MASSNAHME_GSTOOLID"));
						// --
						dto.setKatalogId(rsSet.getLong("KATALOG_ID"));
						dto.setMassnahmeNr(rsSet.getLong("MASSNAHME_NR"));
						// --
						dto.setMassnahmeTitel(rsSet.getString("MASSNAHME_TITEL"));
//						dto.setLink(rsSet.getString("LINK"));
						
						dto.setStatusId(rsSet.getLong("STATUS_ID"));
						dto.setStatusKommentar(rsSet.getString("STATUS_KOMMENTAR"));
						
						// -- erweiterte Attribute
						
						dto.setItsecGruppeTxt(rsSet.getString("ITSEC_GRUPPE"));
						
						dto.setTemplateException(rsSet.getLong("TEMPLATE_EXCEPTION"));
						dto.setGap(rsSet.getString("GAP"));
						dto.setGapResponsible(rsSet.getString("GAP_RESPONSIBLE"));
						dto.setGapResponsibleHidden(rsSet.getString("GAP_RESPONSIBLE"));
						
						dto.setGapMeasure(rsSet.getString("GAP_MEASURE"));
						
						Date dateGapEnd = rsSet.getDate("GAP_END_DATE");
						if (null != dateGapEnd) {
							dto.setGapEndDate(dateGapEnd.getTime());
						}
						// dto.setGapEndDate(rsSet.getDate("GAP_END_DATE").getTime());//.toString() date in Javascript?
						
						dto.setSecuRelevance(rsSet.getLong("SECU_RELEVANCE"));
						dto.setAccsRelevance(rsSet.getLong("ACCS_RELEVANCE"));
						dto.setItopRelevance(rsSet.getLong("ITOP_RELEVANCE"));
						dto.setGapPriority(rsSet.getLong("GAP_PRIORITY"));
						// refTableId
						// refPkId
						// ---
						dto.setExpense(rsSet.getFloat("EXPENSE"));
						dto.setProbOccurence(rsSet.getFloat("PROB_OCCURENCE"));
						dto.setDamage(rsSet.getFloat("DAMAGE"));
						Float mitigationPotential = rsSet.getFloat("MITIGATION_POTENTIAL");
						
//						if(mitigationPotential < 1)
//							mitigationPotential = new Float(String.format(Locale.ENGLISH, "%.2f", mitigationPotential)) * 100;
						dto.setMitigationPotential(mitigationPotential);
						
						dto.setSignee(rsSet.getString("SIGNEE"));
						
						Date gapClassApproved = rsSet.getDate("GAP_CLASS_APPROVED");
						if (null != gapClassApproved) {
							dto.setGapClassApproved(gapClassApproved.getTime());
						}
						// dto.setGapClassApproved(rsSet.getDate("GAP_CLASS_APPROVED").getTime());//.toString()
						// Text
						dto.setExpenseText(rsSet.getString("EXPENSE_T"));
						dto.setProbOccurenceText(rsSet.getString("PROB_OCCURENCE_T"));
						dto.setDamageText(rsSet.getString("DAMAGE_T"));
						dto.setMitigationPotentialText(rsSet.getString("MITIGATION_POTENTIAL_T"));
						dto.setRiskAnalysisAsFreetext(rsSet.getLong("RISK_ANALYSIS_AS_FREETEXT"));
						dto.setGapEndDateIncreased(rsSet.getLong("GAP_END_DATE_INCREASED"));
						dto.setCurrency(rsSet.getString("CURRENCY"));
						
						// für die Weiterverlinkung
						dto.setRefTableID(rsSet.getLong("Ref_Table_Id"));
						dto.setRefPKID(rsSet.getLong("Ref_Pk_Id"));

						
					}
				}
				commit = true;
				
			} catch (Exception e) {
				log.error(e);
			}
			finally {
				HibernateUtil.close(tx, session, commit);
			}
			
			
		}
		
		return dto;
	}
	

	
	public static ItsecMassnahmeDetailDTO findItsecMassnahmeDetailWeiterverlinkt(Long tabelleId, Long tabellePkId, Long massnahmeGStoolId) { 
		
		ItsecMassnahmeDetailDTO dto = null;
		
		if (null != tabelleId && null != tabellePkId && null != massnahmeGStoolId) {

			boolean commit = false;
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

//			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			
			if (null != tabelleId && null != tabellePkId && null != massnahmeGStoolId) {
				sql.append("SELECT * FROM ITSEC_MASSN_STATUS WHERE Ref_Table_Id IS NULL AND Ref_Pk_Id IS NULL");
				sql.append(" CONNECT BY Tabelle_Id = PRIOR Ref_Table_Id AND Tabelle_Pk_Id = PRIOR Ref_Pk_Id");
				sql.append(" AND Massnahme_Gstoolid = PRIOR Massnahme_Gstoolid START WITH Tabelle_Id = ").append(tabelleId);
				sql.append(" AND Tabelle_Pk_Id = ").append(tabellePkId);
				sql.append(" AND Massnahme_Gstoolid = '").append(massnahmeGStoolId).append("'");
			}

			try {
				tx = session.beginTransaction();

				@SuppressWarnings("deprecation")
				Connection conn = HibernateUtil.getSession().connection();

				selectStmt = conn.createStatement();
				ResultSet rsSet = selectStmt
						.executeQuery(sql.toString());

				if (null != rsSet) {
					while (rsSet.next()) {
						dto = new ItsecMassnahmeDetailDTO();
						dto.setItsecMassnahmenStatusId(rsSet.getLong("ITSEC_MASSN_ST_ID"));
						dto.setMassnahmeGstoolId(rsSet.getLong("MASSNAHME_GSTOOLID"));
						// --
						// -- dto.setKatalogId(rsSet.getLong("KATALOG_ID"));
						// -- dto.setMassnahmeNr(rsSet.getLong("MASSNAHME_NR"));
						// --
						// -- dto.setMassnahmeTitel(rsSet.getString("MASSNAHME_TITEL"));
//						dto.setLink(rsSet.getString("LINK"));
						
						dto.setStatusId(rsSet.getLong("STATUS_ID"));
						dto.setStatusKommentar(rsSet.getString("STATUS_KOMMENTAR"));
						
						// -- erweiterte Attribute
						
						// -- dto.setItsecGruppeTxt(rsSet.getString("ITSEC_GRUPPE"));
						
						dto.setTemplateException(rsSet.getLong("TEMPLATE_EXCEPTION"));
						dto.setGap(rsSet.getString("GAP"));
						dto.setGapResponsible(rsSet.getString("GAP_RESPONSIBLE"));
						dto.setGapResponsibleHidden(rsSet.getString("GAP_RESPONSIBLE"));
						
						dto.setGapMeasure(rsSet.getString("GAP_MEASURE"));
						
						Date dateGapEnd = rsSet.getDate("GAP_END_DATE");
						if (null != dateGapEnd) {
							dto.setGapEndDate(dateGapEnd.getTime());
						}
						// dto.setGapEndDate(rsSet.getDate("GAP_END_DATE").getTime());//.toString() date in Javascript?
						
						// -- dto.setSecuRelevance(rsSet.getLong("SECU_RELEVANCE"));
						// -- dto.setAccsRelevance(rsSet.getLong("ACCS_RELEVANCE"));
						// -- dto.setItopRelevance(rsSet.getLong("ITOP_RELEVANCE"));
						
						dto.setGapPriority(rsSet.getLong("GAP_PRIORITY"));
						// refTableId
						// refPkId
						// ---
						dto.setExpense(rsSet.getFloat("EXPENSE"));
						dto.setProbOccurence(rsSet.getFloat("PROB_OCCURENCE"));
						dto.setDamage(rsSet.getFloat("DAMAGE"));
						
						Float mitigationPotential = rsSet.getFloat("MITIGATION_POTENTIAL");
						if(mitigationPotential < 1)
							mitigationPotential = new Float(String.format(Locale.ENGLISH, "%.2f", mitigationPotential)) * 100;
						dto.setMitigationPotential(mitigationPotential);//%.2f %.2g%n
						
						dto.setSignee(rsSet.getString("SIGNEE"));
						
						Date gapClassApproved = rsSet.getDate("GAP_CLASS_APPROVED");
						if (null != gapClassApproved) {
							dto.setGapClassApproved(gapClassApproved.getTime());
						}
						// dto.setGapClassApproved(rsSet.getDate("GAP_CLASS_APPROVED").getTime());//.toString()
						// Text
						dto.setExpenseText(rsSet.getString("EXPENSE_T"));
						dto.setProbOccurenceText(rsSet.getString("PROB_OCCURENCE_T"));
						dto.setDamageText(rsSet.getString("DAMAGE_T"));
						dto.setMitigationPotentialText(rsSet.getString("MITIGATION_POTENTIAL_T"));
						dto.setRiskAnalysisAsFreetext(rsSet.getLong("RISK_ANALYSIS_AS_FREETEXT"));
						dto.setGapEndDateIncreased(rsSet.getLong("GAP_END_DATE_INCREASED"));
						dto.setCurrency(rsSet.getString("CURRENCY"));
						
						// für die Weiterverlinkung
						dto.setRefTableID(rsSet.getLong("Ref_Table_Id"));
						dto.setRefPKID(rsSet.getLong("Ref_Pk_Id"));
					}
				}
				commit = true;
				
			} catch (Exception e) {
				log.error(e);
			}
			finally {
				HibernateUtil.close(tx, session, commit);
			}
			
			
		}
		
		return dto;
	}

	
	/**
	 * save one ItSecMassnahme (actual only statusId and StatusKommentar)
	 * 
	 * @param dto
	 * @return
	 */
	public static boolean saveItsecMassnahmeDetail(ItsecMassnahmeDetailDTO dto) {
		boolean result = false;
		
		boolean commit = false;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();

//		Connection conn = null;

		
		if (null != dto.getStatusId() && null != dto.getItsecMassnahmenStatusId()) {
		
			try {
				tx = session.beginTransaction();

				@SuppressWarnings("deprecation")
				Connection conn = session.connection();

			
				String updateSQL = "UPDATE ITSEC_MASSN_STATUS SET STATUS_ID = ?, STATUS_KOMMENTAR = ? WHERE ITSEC_MASSN_ST_ID = ?";
				PreparedStatement stmt = conn.prepareStatement(updateSQL);
				stmt.setLong(1, dto.getStatusId());
				stmt.setString(2, dto.getStatusKommentar());
				stmt.setLong(3, dto.getItsecMassnahmenStatusId());
				int rcCode = stmt.executeUpdate();
				
				if (1 == rcCode) {
					// update erfolgreich
					result = true;
					commit = true;
				}
				stmt.close();

			} catch (Exception e) {
				// handle exception
				log.error(e.toString());
			}
			finally {
				HibernateUtil.close(tx, session, commit);
			}
			
		}
		
		return result;
	}
	
	
	public static List<ItsecMassnahmenStatusWertDTO>findItsecMassnahmenStatusWerte() {
		
		ArrayList<ItsecMassnahmenStatusWertDTO> listDTO = new ArrayList<ItsecMassnahmenStatusWertDTO>();
		
			boolean commit = false;
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

//			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			
			sql.append("SELECT * from ITSEC_MASSN_STWERT order by ITSEC_MASSN_WERTID");
			
			try {
				tx = session.beginTransaction();

				@SuppressWarnings("deprecation")
				Connection conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsSet = selectStmt
						.executeQuery(sql.toString());

				if (null != rsSet) {
					while (rsSet.next()) {
						ItsecMassnahmenStatusWertDTO dto = new ItsecMassnahmenStatusWertDTO();
						dto.setItsecMassnahmenWertId(rsSet.getLong("ITSEC_MASSN_WERTID"));
						dto.setStatusWert(rsSet.getString("STATUS_WERT"));
						dto.setStatusWertEn(rsSet.getString("STATUS_WERT_EN"));
						listDTO.add(dto);
					}
				}
				commit = true;
				
			} catch (Exception e) {
				log.error(e);
			}
			finally {
				HibernateUtil.close(tx, session, commit);
			}

		return listDTO;
	}

	
}

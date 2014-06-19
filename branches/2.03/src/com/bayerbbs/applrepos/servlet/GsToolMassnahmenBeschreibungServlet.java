package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;

import com.bayerbbs.applrepos.hibernate.HibernateUtil;

public class GsToolMassnahmenBeschreibungServlet extends HttpServlet {

	private static final long serialVersionUID = -6275379151948444485L;

	private static final String STMT_SELECT_MASSN_BESCHREIBUNG = "SELECT   TXT.Beschreibung FROM BBS_Prod.DBO.MB_MASSN_TXT TXT"
		+ " INNER JOIN BBS_Prod.DBO.MB_MASSN MAS ON TXT.Mas_Id=MAS.Mas_Id AND TXT.Mas_Imp_Id=MAS.Mas_Imp_Id"
		+ " WHERE    MAS.Mas_Imp_Id IN (-1, 1)"
		+ " AND      MAS.Loesch_Datum IS NULL"
		+ " AND      MAS.Cm_Sta_Id IN (1, 5)"
		+ " AND      MAS.Mas_Id = ?"
		+ " AND      TXT.Spr_Id = ?";


	private static final String STMT_SELECT_BAUSTEIN_BESCHREIBUNG = "SELECT BTX.Beschreibung FROM [BBS_Prod].[dbo].MB_BAUST BST" +
		" INNER JOIN [BBS_Prod].[dbo].MB_BAUST_TXT BTX ON BST.Bau_Id=BTX.Bau_Id AND BST.Bau_Imp_Id=BTX.Bau_Imp_Id" +
		" WHERE BST.Loesch_Datum IS NULL" +
		" AND BST.Bau_Imp_Id IN (-1, 1)" +
		" AND SUBSTRING(BTX.Beschreibung, 1, 6) = '<html>'" +
		" AND BTX.Spr_Id = ?" +
		" AND REPLACE(BST.Nr, '.', '') = ?";
	
	private static String STMT_SELECT_MAS_ID = "SELECT Mas_Id FROM [BBS_Prod].[dbo].V_TRANSBASE_SAFEGUARD "
			+ "WHERE  Msk_Id = ? " + "AND Mas_Nr = ?";


	
	private static final int LANG_GSTOOL_DE = 1;
	private static final int LANG_GSTOOL_EN = 2;
	
	private static final String REQ_LANG = "lang";
	private static final String REQ_BAUSTEIN_ID = "bausteinId";
	private static final String REQ_MASSNAHME_GSTOOL_ID = "massnahmeGstoolId";

	private static final String PARAM_VALUE_DE = "de";
	private static final String PARAM_VALUE_EN = "en";
	
	private static final String SQL_RESULT_BESCHREIBUNG = "BESCHREIBUNG";

	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String bausteinId = req.getParameter(REQ_BAUSTEIN_ID);
		if (null == bausteinId) {
			doMassnahme(req, res);
		}
		else {
			doBaustein(req, res);
		}
	}
	
	private int getLanguageId(String lang) {
		int langId;
		if (null == lang) {
			lang = PARAM_VALUE_EN;
		}
		if (PARAM_VALUE_DE.equals(lang.toLowerCase())) langId = LANG_GSTOOL_DE;
		else langId = LANG_GSTOOL_EN;
		return langId;
	}
		
	
	public void doMassnahme(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String massnahmeGstoolId = req.getParameter(REQ_MASSNAHME_GSTOOL_ID);
		String lang = req.getParameter(REQ_LANG);
		
		Session session = HibernateUtil.getSession(HibernateUtil.DATASOURCE_ID_GSTOOL);
		ResultSet rs = null;
		
		String massnBeschreibung = null;
//		String massnTitel = null;
		
		configureResponse(req, res);
		PrintWriter writer = res.getWriter();
		
		try {
			@SuppressWarnings("deprecation")
			PreparedStatement statement = session.connection().prepareStatement(STMT_SELECT_MASSN_BESCHREIBUNG);
			statement.setString(1, massnahmeGstoolId);
			statement.setInt(2, getLanguageId(lang));
			rs = statement.executeQuery();
	
			if(rs.next()) {//Achtung es gibt mehrere Treffer für die massnahmeGstoolId. Weiteres Kriterium welche die richtige Massnahmenversion ist.
//				massnTitel = rs.getString("NAME");
				massnBeschreibung = rs.getString(SQL_RESULT_BESCHREIBUNG);
				massnBeschreibung = massnBeschreibung.replaceAll("/baust/", "/AIR/massnbeschreibung?lang=" + lang + "&bausteinId=");
				String pattern = "/[m|s]/[m|s]\\d\\d\\d\\d\\d";
				Pattern r = Pattern.compile(pattern);
				Matcher m = r.matcher(massnBeschreibung);
				while(m.find()){
					String value=m.group(0);
					System.out.println("Found value: " + value );
					PreparedStatement statement1 = session.connection().prepareStatement(STMT_SELECT_MAS_ID);
					statement1.setString(1, value.substring(4, 6));
					statement1.setString(2, value.substring(6, 9));					
					rs = statement1.executeQuery();
					if(rs.next()){
					String masId=rs.getString("Mas_Id");
					massnBeschreibung=StringUtils.replace(massnBeschreibung, value+".html", "/AIR/massnbeschreibung?massnahmeGstoolId="+masId+"&lang="+lang);
					}
				}

				
				writer.write("<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>\n");
				writer.write(massnBeschreibung);
			} else {
				writer.write("There is no control with id="+massnahmeGstoolId);
			}

		} catch (SQLException e) {
			throw new ServletException("Description of control id=" + massnahmeGstoolId + " cannot be retrieved from GsTool Database", e);
		} finally {
			try {
				if(rs != null)
					rs.close();
			} catch (SQLException e) {
			}
			
			session.close();
			writer.close();
		}
	}
	
	
	private void doBaustein(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		Session session = HibernateUtil.getSession(HibernateUtil.DATASOURCE_ID_GSTOOL);
		ResultSet rs = null;
		
		String bausteinId = req.getParameter(REQ_BAUSTEIN_ID);
		String lang = req.getParameter(REQ_LANG);
		
		// http://by02wp:8080/AIR/massnbeschreibung?bausteinId=b14350841.html
		// Anzeige "1435.08.4.1", Parameter ist jedoch "b14350841.html" 
		// für den SQL verwenden wir: "14350841" 
		
		bausteinId = bausteinId.replace("b", "").replace(".html", "");
		String bausteinBeschreibung = null;
		
		configureResponse(req, res);
		PrintWriter writer = res.getWriter();
		
		try {
			@SuppressWarnings("deprecation")
			PreparedStatement statement = session.connection().prepareStatement(STMT_SELECT_BAUSTEIN_BESCHREIBUNG);
			statement.setInt(1, getLanguageId(lang));
			statement.setString(2, bausteinId);
			
			rs = statement.executeQuery();
	
			if(rs.next()) {
				bausteinBeschreibung = rs.getString(SQL_RESULT_BESCHREIBUNG);
				
				writer.write(bausteinBeschreibung);
			} else {
				writer.write("There is no sample  with id="+bausteinId);
			}

		} catch (SQLException e) {
			throw new ServletException("Description of control id=" + bausteinId + " cannot be retrieved from GsTool Database", e);
		} finally {
			try {
				rs.close();
			} catch (SQLException e) {
			}
			
			session.close();
			writer.close();
		}
	}
	
	private void configureResponse(HttpServletRequest req, HttpServletResponse res) {
		String userAgent = req.getHeader("user-agent");
		String encoding = userAgent.contains("MSIE") ? "Windows-1252" : "UTF-8";//ISO-8859-1

		res.setContentType("text/html");
		res.setCharacterEncoding(encoding);//Windows-1252 UTF-8 ISO-8859-1
	}
}
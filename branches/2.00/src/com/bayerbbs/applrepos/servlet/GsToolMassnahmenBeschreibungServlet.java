package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;

import com.bayerbbs.applrepos.hibernate.HibernateUtil;

public class GsToolMassnahmenBeschreibungServlet extends HttpServlet {

	private static final long serialVersionUID = -6275379151948444485L;

	private static final String STMT_SELECT_MASSN_BESCHREIBUNG = "select BESCHREIBUNG from mb_massn_txt where mas_id = ? and spr_id = ?"; //AND Spr_Id = ? and MAS_IMP_ID in (-1, 1)";//NAME,

	private static final String STMT_SELECT_BAUSTEIN_BESCHREIBUNG = "SELECT BTX.Beschreibung FROM DBO.MB_BAUST BST" +
		" INNER JOIN DBO.MB_BAUST_TXT BTX ON BST.Bau_Id=BTX.Bau_Id AND BST.Bau_Imp_Id=BTX.Bau_Imp_Id" +
		" WHERE BST.Loesch_Datum IS NULL" +
		" AND BST.Bau_Imp_Id IN (-1, 1)" +
		" AND SUBSTRING(BTX.Beschreibung, 1, 6) = '<html>'" +
		" AND BTX.Spr_Id = ?" +
		" AND REPLACE(BST.Nr, '.', '') = ?";

	
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
			PreparedStatement statement = session.connection().prepareStatement(STMT_SELECT_MASSN_BESCHREIBUNG);
			statement.setString(1, massnahmeGstoolId);
			statement.setInt(2, getLanguageId(lang));
			rs = statement.executeQuery();
	
			if(rs.next()) {//Achtung es gibt mehrere Treffer für die massnahmeGstoolId. Weiteres Kriterium welche die richtige Massnahmenversion ist.
//				massnTitel = rs.getString("NAME");
				massnBeschreibung = rs.getString(SQL_RESULT_BESCHREIBUNG);
				massnBeschreibung = massnBeschreibung.replaceAll("/baust/", "/AIR/massnbeschreibung?lang=" + lang + "&bausteinId=");
				
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
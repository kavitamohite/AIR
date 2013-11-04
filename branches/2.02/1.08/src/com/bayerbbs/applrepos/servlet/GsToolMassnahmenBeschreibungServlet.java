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

	private static final String STMT_SELECT_MASSN_BESCHREIBUNG = "select BESCHREIBUNG from mb_massn_txt where mas_id = ?";//NAME,

	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String massnahmeGstoolId = req.getParameter("massnahmeGstoolId");
		
		
		Session session = HibernateUtil.getSession(HibernateUtil.DATASOURCE_ID_GSTOOL);
		ResultSet rs = null;
		
		String massnBeschreibung = null;
//		String massnTitel = null;
		res.setCharacterEncoding("ISO-8859-1");//Windows-1252 UTF-8 ISO-8859-1
		PrintWriter writer = res.getWriter();
		
		try {
			PreparedStatement statement = session.connection().prepareStatement(STMT_SELECT_MASSN_BESCHREIBUNG);
			statement.setString(1, massnahmeGstoolId);
			rs = statement.executeQuery();
	
			if(rs.next()) {//Achtung es gibt mehrere Treffer für die massnahmeGstoolId. Weiteres Kriterium welche die richtige Massnahmenversion ist.
//				massnTitel = rs.getString("NAME");
				massnBeschreibung = rs.getString("BESCHREIBUNG");
				writer.write(massnBeschreibung);
			} else {
				writer.write("There is no control with id="+massnahmeGstoolId);
			}

		} catch (SQLException e) {
			throw new ServletException("Description of control id=" + massnahmeGstoolId + " cannot be retrieved from GsTool Database", e);
		} finally {
			try {
				rs.close();
			} catch (SQLException e) {
			}
			
			session.close();
			writer.close();
		}
	}
}
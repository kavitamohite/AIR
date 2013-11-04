package com.bayerbbs.air;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.cfg.Configuration;

public class AirRedirectServlet extends HttpServlet {
	private static final long serialVersionUID = 3518333389804966101L;
	
	private static final String TRANSBASE_PROD_HOST = "byob01.bayer-ag.com";
	private String redirectPath;
	
	public void init(ServletConfig config) {
		Configuration conf = new AnnotationConfiguration().configure();
		String dbConnectionUrl = conf.getProperty("hibernate.connection.url");
		
		redirectPath = dbConnectionUrl.contains(TRANSBASE_PROD_HOST) ? "/P" : "/Q";//"/AIR-P" : "/AIR-Q"
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
//		req.getRequestDispatcher(redirectPath).forward(req, res);r
		res.sendRedirect(redirectPath);
	}
}
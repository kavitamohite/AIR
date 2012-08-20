package com.bayerbbs.applrepos.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServlet;

import com.bayerbbs.air.error.ErrorCodeReader;
import com.bayerbbs.applrepos.validation.ValidationReader;

public class AirInitServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	public AirInitServlet() {
		super();
	}

	public void init(ServletConfig config) {
		String configFile = config.getServletContext().getRealPath("htdocs/config/AttributeProperties.xml");
		ValidationReader.setValidationConfigFile(configFile);
		
		String errorMessageFile = config.getServletContext().getRealPath("htdocs/lang/english_errormessages.xml");
		ErrorCodeReader.setErrorMessageConfigFile(errorMessageFile);
		
//		String connectionPropertiesFile = config.getServletContext().getRealPath("htdocs/config/ConnectionProperties.xml");
//		ConnectionPropertiesReader.setConfigFile(connectionPropertiesFile);
	}
	
}

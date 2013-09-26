package com.bayerbbs.bov;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BovApplicationServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		String strApplicationId = (String) req.getParameter("applicationId");
		String cwidSteward = (String) req.getParameter("cwidSteward");
		
		String strDrlevel = (String) req.getParameter("drlevel");
		String strSeveritylevel = (String) req.getParameter("severitylevel");
		
		String strGxpRelevant = (String) req.getParameter("gxprelevant");
		String strGiscRelevant = (String) req.getParameter("icsrelevant");
		
		String strInformationClassification = (String) req.getParameter("informationclassification");
		
		long applicationId = Long.parseLong(strApplicationId);
		
		
		BovApplicationInputDTO dto = new BovApplicationInputDTO();
		if (null != strDrlevel) {
			dto.setDrLevel(Long.parseLong(strDrlevel));	
		}
		if (null != strSeveritylevel) {
			dto.setSeverityLevel(Long.parseLong(strSeveritylevel));	
		}
		if (null != strGxpRelevant) {
			dto.setGxpRelevant(strGxpRelevant);
		}
		if (null != strGiscRelevant) {
			dto.setGiscRelevant(strGiscRelevant);
		}
		
		if (null != strInformationClassification) {
			dto.setInformationClassification(strInformationClassification);
		}
		
		
		if (null != cwidSteward && !"null".equals(cwidSteward)) {
			// was dann ??? 
		}
		else {
			
		}

		
		boolean result = BovApplicationHbn.saveBovApplication(cwidSteward, applicationId, dto);
		
		if (true) {
			res.getWriter().write("data saved");
		}
		else {
			res.getWriter().write("!!! Could not save data - please check the data !!!");
		}
		
	}
	

}

package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitesHbn;
import com.bayerbbs.applrepos.service.ApplicationParameterInput;
import com.bayerbbs.applrepos.service.ApplicationWS;

public class AirCiExcelExportServlet extends HttpServlet {
	private static final long serialVersionUID = 3569239290421829949L;
	
	private static final String SEARCH_POINT_SEARCH = "search";
	private static final String SEARCH_POINT_OUSEARCH = "ouSearch";
	private static final String SEARCH_POINT_MY_CIS = "myCis";
	private static final String SEARCH_POINT_MY_DELEGATE_CIS = "myCisSubstitute";
	
	private static final String[] COLUMNS = { "Name", "Alias", "Type", "Category IT", "CI Owner/Application Manager", "CI Owner Delegate", "Application Owner", "Application Steward" };
	private static final String UNDERSCORE = "_";
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}
	 

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		setUpResponse(req, res);
		
		Workbook workbook = createWorkbook(req, res);
		workbook.write(res.getOutputStream());
	}
	
	private void setUpResponse(HttpServletRequest req, HttpServletResponse res) {
		String query = req.getParameter("query");
		String cwid = req.getParameter("cwid");
		String searchAction = req.getParameter("searchAction");
		
		String fileName = "AirCIExport_".concat(cwid);
		if(searchAction != null && searchAction.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(searchAction);
		if(query != null && query.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(query);

		
		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");//xlsx: vnd.openxmlformats-officedocument.spreadsheetml.sheet, xls: vnd.ms-excel
		res.setHeader("Content-Disposition", "attachment; filename="+fileName);
		res.setCharacterEncoding("application/x-www-form-urlencoded");
	}

	private Workbook createWorkbook(HttpServletRequest req, HttpServletResponse res) {//String query, String cwid, String token, String searchAction
		String searchAction = req.getParameter("searchAction");
		
		Workbook workbook = new XSSFWorkbook();
		
		Sheet sheet = workbook.createSheet(searchAction);
		((XSSFSheet)sheet).setDefaultColumnWidth(25);
		
		
		Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("WARNING: This data was exported by AIR at "+DateFormat.getInstance().format(new Date(System.currentTimeMillis()))+" and may now be incorrect or old!!!");
        
        Row spaceRow = sheet.createRow(1);
        Cell spaceCell = spaceRow.createCell(0);
        spaceCell.setCellValue("");
		
        Row headerRow = sheet.createRow(2);
        Cell headerCell = null;
        
        
        CellStyle headerRowStyle = workbook.createCellStyle();
        headerRowStyle.setWrapText(true);
        headerRowStyle.setAlignment(CellStyle.ALIGN_CENTER);
//        headerRowStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        
        
        for(int i = 0; i < COLUMNS.length; i++) {
            headerCell = headerRow.createCell(i);
            headerCell.setCellValue(COLUMNS[i]);
            headerCell.setCellStyle(headerRowStyle);
        }
        
        int i = 3;
        Row row = null;
        Cell cell = null;
        
        List<ApplicationDTO> applications = getCIs(req);
        
        for(ApplicationDTO app : applications) {
        	row = sheet.createRow(i++);
        	cell = row.createCell(0);
        	cell.setCellValue(app.getApplicationName());
        	
        	cell = row.createCell(1);
        	cell.setCellValue(app.getApplicationAlias());
        	
        	cell = row.createCell(2);
        	cell.setCellValue(app.getApplicationCat1Txt());
        	
        	cell = row.createCell(3);
        	cell.setCellValue(app.getApplicationCat2Txt());
        	
        	cell = row.createCell(4);
        	cell.setCellValue(app.getResponsible());
        	
        	cell = row.createCell(5);
        	cell.setCellValue(app.getSubResponsible());
        	
        	cell = row.createCell(6);
        	cell.setCellValue(app.getApplicationOwner());
        	
        	cell = row.createCell(7);
        	cell.setCellValue(app.getApplicationOwnerDelegate());
        }
        
        sheet.setAutoFilter(new CellRangeAddress(2, applications.size()+2, 0, 7));
		
		return workbook;
	}
	
	private List<ApplicationDTO> getCIs(HttpServletRequest req) {
		String query = req.getParameter("query");
		String cwid = req.getParameter("cwid");
		String token = req.getParameter("token");
		String searchAction = req.getParameter("searchAction");
		
        List<ApplicationDTO> applications = null;
        
        if(searchAction.equals(SEARCH_POINT_SEARCH)) {
        	boolean isAdvancedSearch = Boolean.parseBoolean(req.getParameter("advancedsearch"));
        	
        	applications = isAdvancedSearch ?
    			AnwendungHbn.findApplications(query, 
					req.getParameter("queryMode"),
					req.getParameter("hadvsearchappowner"),
					req.getParameter("hadvsearchappdelegate"),
					req.getParameter("hadvsearchciowner"),
					req.getParameter("hadvsearchcidelegate"),
					false,
					req.getParameter("hadvsearchObjectTypeId").length() > 0 ? Long.parseLong(req.getParameter("hadvsearchObjectTypeId")) : null,
					null/*req.getParameter("sort?")*/,
					null/*req.getParameter("dir?")*/,
					null/*req.getParameter("advsearchcitypeid")*/,
					req.getParameter("hadvsearchdescription"),
					req.getParameter("hadvsearchoperationalStatusid").length() > 0 ? Long.parseLong(req.getParameter("hadvsearchoperationalStatusid")) : null,
					req.getParameter("hadvsearchapplicationcat2id").length() > 0 ? Long.parseLong(req.getParameter("hadvsearchapplicationcat2id")) : null,
					req.getParameter("hadvsearchlifecyclestatusid").length() > 0 ? Long.parseLong(req.getParameter("hadvsearchlifecyclestatusid")) : null,
					req.getParameter("hadvsearchprocessid").length() > 0 ? Long.parseLong(req.getParameter("hadvsearchprocessid")) : null,
					null/*req.getParameter("template?")*/) :
        		AnwendungHbn.findApplications(query, null, null, null, null, null, true, null, null, null, null, null, null, null, null, null, null);
        } else if(searchAction.equals(SEARCH_POINT_MY_DELEGATE_CIS) || searchAction.equals(SEARCH_POINT_MY_CIS)) {
        	ApplicationParameterInput input = new ApplicationParameterInput();
        	input.setSearchAction(searchAction);
        	input.setCwid(cwid);
        	input.setToken(token);
        	input.setLimit(10000L);
        	
        	applications = Arrays.asList(new ApplicationWS().findApplications(input).getApplicationDTO());
        } else if(searchAction.equals(SEARCH_POINT_OUSEARCH)) {
        	applications = CiEntitesHbn.findCisByOUunit(
    			req.getParameter("hciType"),
    			req.getParameter("houUnit"),
				req.getParameter("hciOwnerType"),
				req.getParameter("houQueryMode")
        	);
        }
        
        return applications;
	}
}
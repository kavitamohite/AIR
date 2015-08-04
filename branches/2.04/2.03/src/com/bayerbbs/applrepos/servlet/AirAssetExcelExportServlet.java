package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.SoftwareComponentHbn;
import com.bayerbbs.applrepos.service.AssetManagementParameterInput;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;

public class AirAssetExcelExportServlet extends HttpServlet {
	private static final long serialVersionUID = 3569239290421829949L;

	private static final String[] COLUMNS = { "SAP Description", "PSP Element",
			"Cost center", "Site", "Serial Number", "Technical Master",
			"Technical Number", "Inventory Number", "Organizational Unit" };
	private static final String UNDERSCORE = "_";

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		setUpResponse(req, res);

		Workbook workbook = createWorkbook(req, res);
		workbook.write(res.getOutputStream());
	}

	private void setUpResponse(HttpServletRequest req, HttpServletResponse res) {
		String query = req.getParameter("query");
		String cwid = req.getParameter("cwid");
		String searchAction = req.getParameter("searchAction");

		String fileName = "AirAssetExport";

		if (cwid != null && cwid.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(cwid);
		if (searchAction != null && searchAction.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(searchAction);
		if (query != null && query.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(query);

		fileName = fileName.concat(".xlsx");

		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
		res.setCharacterEncoding("application/x-www-form-urlencoded");
	}

	private Workbook createWorkbook(HttpServletRequest req,
			HttpServletResponse res) {

		String searchAction = req.getParameter("searchAction");

		Workbook workbook = new XSSFWorkbook();

		Sheet sheet = workbook.createSheet(searchAction);
		((XSSFSheet) sheet).setDefaultColumnWidth(25);

		Row titleRow = sheet.createRow(0);
		Cell titleCell = titleRow.createCell(0);
		titleCell.setCellValue("WARNING: This data was exported by AIR at "
				+ DateFormat.getInstance().format(
						new Date(System.currentTimeMillis()))
				+ " and may now be incorrect or old!!!");

		Row spaceRow = sheet.createRow(1);
		Cell spaceCell = spaceRow.createCell(0);
		spaceCell.setCellValue("");

		Row headerRow = sheet.createRow(2);
		Cell headerCell = null;

		CellStyle headerRowStyle = workbook.createCellStyle();
		headerRowStyle.setWrapText(true);
		headerRowStyle.setAlignment(CellStyle.ALIGN_CENTER);

		for (int i = 0; i < COLUMNS.length; i++) {
			headerCell = headerRow.createCell(i);
			headerCell.setCellValue(COLUMNS[i]);
			headerCell.setCellStyle(headerRowStyle);
		}

		int i = 3;
		Row row = null;
		Cell cell = null;

		AssetManagementParameterOutput output = getAssets(req);

		for (AssetViewDataDTO hwComp : output.getAssetViewDataDTO()) {
			row = sheet.createRow(i++);
			cell = row.createCell(0);
			cell.setCellValue(hwComp.getSapDescription());

			cell = row.createCell(1);
			cell.setCellValue(hwComp.getPspElement());

			cell = row.createCell(2);
			cell.setCellValue(hwComp.getCostCenter());

			cell = row.createCell(3);
			cell.setCellValue(hwComp.getSite());

			cell = row.createCell(4);
			cell.setCellValue(hwComp.getSerialNumber());

			cell = row.createCell(5);
			cell.setCellValue(hwComp.getTechnicalMaster());

			cell = row.createCell(6);
			cell.setCellValue(hwComp.getTechnicalNumber());

			cell = row.createCell(7);
			cell.setCellValue(hwComp.getInventoryNumber());

			cell = row.createCell(8);
			cell.setCellValue(hwComp.getOrganizationalunit());

		}

		return workbook;
	}

	private AssetManagementParameterOutput getAssets(HttpServletRequest req) {

		String query = req.getParameter("query");
		String cwid = req.getParameter("cwid");
		String queryMode = req.getParameter("queryMode");
		String sort = req.getParameter("sort");
		String dir = req.getParameter("dir");
		
		AssetManagementParameterInput input = new AssetManagementParameterInput();
		input.setCwid(cwid);
		input.setQuery(query);
		input.setQueryMode(queryMode);
		input.setStart(0);
		input.setLimit(10000);
		input.setSort(sort);
		input.setDir(dir);
		
		AssetManagementParameterOutput out = null;

		if (input.getQueryMode().equalsIgnoreCase("hardware")) {
			out = HardwareComponentHbn.searchAsset(input);
		} else if (input.getQueryMode().equalsIgnoreCase("software")) {
			out = SoftwareComponentHbn.searchAsset(input);
		}

		return out;
	}
}
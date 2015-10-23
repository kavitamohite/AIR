package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;

public class AirNewExcelExportServlet extends HttpServlet {
	private static final long serialVersionUID = 3569239290421829949L;

	private static final String[] COLUMNS = { "Manufacturer","Sub Category","Type","Model","SAP Description", "PSP Element",
			"Cost center", "Site", "Serial Number", "Technical Master",
			"Technical Number/Asset-Id", "Inventory Number", "Organizational Unit" };
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
		String cwid = req.getParameter("cwid");
		String fileName = "AirNewAssetExport";

		if (cwid != null && cwid.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(cwid);
		
 	      fileName = fileName.concat(".xlsx");

		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
		res.setCharacterEncoding("application/x-www-form-urlencoded");
		
		
	}

	private Workbook createWorkbook(HttpServletRequest req,
			HttpServletResponse res) {
		Workbook workbook = new XSSFWorkbook();
		
		Sheet sheet = workbook.createSheet();
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

		Row row = null;
		Cell cell = null;
			for(int i=3;i<=Integer.parseInt(req.getParameter("multipleasset"))+3;){
			row = sheet.createRow(i++);
			
			cell = row.createCell(0);
			cell.setCellValue(req.getParameter("manufacturer"));
			
			cell = row.createCell(1);
			cell.setCellValue(req.getParameter("subCategory"));
			
			cell = row.createCell(2);
			cell.setCellValue(req.getParameter("type"));			

			cell = row.createCell(3);
			cell.setCellValue(req.getParameter("model"));
			
			cell = row.createCell(4);
			cell.setCellValue(req.getParameter("sapDescription"));	
			
		
			}		
			return workbook;
	}
}

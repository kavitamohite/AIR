package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bayerbbs.applrepos.domain.HardwareCategory4;
import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.domain.Land;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CostcenterHbn;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.LokationItemHbn;
import com.bayerbbs.applrepos.hibernate.ManufacturerHbn;
import com.bayerbbs.applrepos.hibernate.ModelHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;

/**
 * Servlet implementation class AirExcelImportServletUpdate
 */
public class AirExcelImportServletUpdate extends HttpServlet {

	private final static Logger logger = Logger.getLogger(AirExcelImportServletUpdate.class);
	
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		
		response.setContentType("text/html");
		java.io.PrintWriter out = response.getWriter();
		
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		logger.info("isMultipart :: "+isMultipart);
		
		// None files upload message to Client.
		if(!isMultipart) {
			out.println("<html>");
			out.println("<head>");
			out.println("<title>Servlet upload</title>");  
			out.println("</head>");
			out.println("<body style='background-color: #D3E1F1;'>");
			out.println("<p>No file uploaded</p>"); 
			out.println("</body>");
			out.println("</html>");
			return;
		}
		
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);
		
		try { 
			// Parse the request to get file items.
			List<FileItem> fileItems = upload.parseRequest(request);
			
			// Response for No any file(s) uploaded.
			if(fileItems == null || fileItems.isEmpty() || fileItems.get(0).getSize() == 0)
			{
				logger.info("fileItems is empty.");
				out.println("<html>");
				out.println("<head>");
				out.println("<title>Servlet upload</title>");  
				out.println("</head>");
				out.println("<body style='background-color: #D3E1F1;'>");
				out.println("<p>No file uploaded.</p>"); 
				out.println("</body>");
				out.println("</html>");
				return;
			}
			logger.info("fileItems size :: "+fileItems.size());
			// Declaring variable for CWID
			String cwid = null;
			// Process the uploaded file items
			Iterator<FileItem> filesIterator = fileItems.iterator();

			out.println("<html>");
			out.println("<head>");
			out.println("<title>File upload</title>");  
			out.println("</head>");
			out.println("<body style='background-color: #D3E1F1;'>");
			
			// List of errors existing in the CSV or Excel file.
			List<String> errors = new ArrayList<String>();
			// List of assets populated from CSV or Excel file. 
			List<AssetViewDataDTO> assests = new ArrayList<AssetViewDataDTO>();
			// List of errors generated while saving hardware assets.
//			List<String> errorsInSaving = new ArrayList<String>();
			// List of imported Inventory numbers
			List<String> inventoryNumbers = new ArrayList<String>();
			List<String> techNumbers = new ArrayList<String>();
			// List of serial DC Numbers
			List<String> serialNumbers = new ArrayList<String>();
			String message = null;
			
			while (filesIterator.hasNext()) 
			{
				FileItem fi = filesIterator.next();
				// Form field obtained.

				if(fi.isFormField())
			    {
			        if(fi.getFieldName().equals("usercwid") || fi.getFieldName().equals("importCwid"))
			        {
			        	cwid = fi.getString();
			        	logger.info("CWID >>>>>>>>> "+fi.getString()); 
			        }
			    }
				// Uploaded file is obtained.
				else if(!fi.isFormField())
				{
					logger.info("Uploaded file is obtained.");
					
					if(fi.getName().endsWith(".xls") || fi.getName().endsWith(".xlsx") || fi.getName().endsWith(".csv"))
					{
						Workbook workbook = new XSSFWorkbook(fi.getInputStream());

						Sheet sheet = workbook.getSheetAt(0);

						// Every sheet has rows, iterate over them
						Iterator<Row> rowIterator = sheet.iterator();

						// Reaching to the row where records exists.
						/*for(int j = 0; j < 3; j++)
						{
							if(rowIterator.hasNext())
							{
								rowIterator.next();
							}
						}*/
						
						// Escaping Headers row
						if(rowIterator.hasNext())
						{
							rowIterator.next();
						}
						int rowNum = 0;
						
						// Creating instances of AssetViewDataDTO class for each row of records in the uploaded file.
						while (rowIterator.hasNext()) 
						{
							
							
							
							AssetViewDataDTO obAssetViewDataDTO = new AssetViewDataDTO();
							assests.add(obAssetViewDataDTO);
							try {
								Row row = rowIterator.next();
								rowNum = row.getRowNum();
								obAssetViewDataDTO.setCwid(cwid);
								
								
								String techNr = getExcelDataByColumnNumber(row, 6);
								
								if(techNr !=null && ! techNr.isEmpty())
								{
									if(!techNumbers.contains(techNr))	
									{
									
											techNumbers.add(techNr);
									
											obAssetViewDataDTO.setTechnicalNumber(techNr.trim());
											
											int count= HardwareComponentHbn.findByTechnicalNumberCount(obAssetViewDataDTO.getTechnicalNumber());
											
											if(count == 0)
											{
												errors.add("Technical Number ( "+obAssetViewDataDTO.getTechnicalNumber()+ ") at row number "+ rowNum + " does not exists for any Assets.  So please remove row number "+ rowNum + " and try again.");
												//break;
											}
											
											if(count > 1)
											{
												errors.add("Technical Number ("+obAssetViewDataDTO.getTechnicalNumber()+ ") at row number "+ rowNum + " already exists for more then one Asset. So please remove row number "+ rowNum + " and try again.");
									

												//break;
											}
											
										
		
											String inventoryNumber = getExcelDataByColumnNumber(row, 12);
											
											if(inventoryNumber != null && !inventoryNumber.isEmpty())
											{
												if(!inventoryNumbers.contains(inventoryNumber)) {
												inventoryNumbers.add(inventoryNumber);
												
												boolean exists = HardwareComponentHbn.isHardwareComponentByInventoryNumberExistsUpdate(inventoryNumber.trim(),obAssetViewDataDTO.getTechnicalNumber());
												
												if(! exists)
												{
													errors.add("Inventory number ("+ inventoryNumber +") at row number "+rowNum + " already exists. Please change it and try again later.");
												}
												else
												{
													obAssetViewDataDTO.setInventoryNumber(inventoryNumber.trim());
												}
											}
											else
											{
												errors.add("Please remove duplicate inventory number ("+ inventoryNumber +") at row number "+rowNum + " and try again later.");
											}
											}
											
											
											//obAssetViewDataDTO.setSerialNumber(getExcelDataByColumnNumber(row, 5));
											String serialNr = getExcelDataByColumnNumber(row, 5);
											
											if(serialNr != null && !serialNr.isEmpty())
											{
												
												if(!serialNumbers.contains(serialNr)) {
													serialNumbers.add(serialNr);
													
												boolean exists = HardwareComponentHbn.isHardwareComponentBySerialNumberExistsUpdate(serialNr.trim(),obAssetViewDataDTO.getTechnicalNumber());
												
												if(! exists)
												{
													errors.add("Serial number ("+ serialNr +") at row number "+rowNum + " already exists. Please change it and try again later.");
												}
												else
												{
													obAssetViewDataDTO.setSerialNumber(serialNr.trim());
												}
											}
											else
											{
												errors.add("Please remove duplicate Serial number ("+ serialNr +") at row number "+rowNum + " and try again later.");
											}
											}
										}
									else{
											errors.add("Please remove duplicate Tech Nr ("+ techNr +") at row number "+rowNum + " and try again later.");
									}
										
									}
								else{
									errors.add("Technical Number is not present at row number "+ rowNum + ". So Can't update any records present in excel. ");
									//break;
								}
								
								
							} catch(Exception ex)
							{
								ex.printStackTrace();
								logger.error(ex.getMessage(), ex);
								errors.add(ex.getMessage() + " at row number : " +rowNum);
							}
							
						}
					}
					else
					{
						out.println("<html>");
						out.println("<head>");
						out.println("<title>Servlet upload</title>");  
						out.println("</head>");
						out.println("<body style='background-color: #D3E1F1;'>");
						out.println("<p>Please upload either Excel or CSV file only.</p>"); 
						out.println("</body>");
						out.println("</html>");
						return;
					}
				}
				
			}
			// Displaying list of errors found in Excel or CSV file.
			if(!errors.isEmpty())
			{
				out.println("<html>");
				out.println("<head>");
				out.println("<title>Servlet upload</title>");  
				out.println("</head>");
				out.println("<body style='background-color: #D3E1F1;'>");
				for(String error : errors)
				{
					out.println(error);
					out.println("<br/>");
				}
				out.println("</body>");
				out.println("</html>");
				return;
			}
			else if(!assests.isEmpty())
			{
				
				for(AssetViewDataDTO objAssetViewDataDTO : assests)
				{
					if(cwid != null)
					{
						objAssetViewDataDTO.setCwid(cwid);
					}
				}
				
				message =HardwareComponentHbn.updateHardwareAssetExcel(assests);
				
			}
			
			
			// Displaying list of errors generating while saving hardware assets.
			if(message != null)
			{
					out.println(message);
					out.println("<br/>");
			}
			else
			{
				out.println("File is not imported. Please contact ITILCenter Help Desk." );
				out.println("<br/>");
			}
			
//			else {
//				out.println("File uploaded successfully.");
//				out.println("<br/><br/>");
//			}
			out.println("</body>");
			out.println("</html>");
		}catch(Exception ex) {
			logger.error(ex.getMessage(), ex);
			System.out.println("Error ------> "+ex.getMessage());
			ex.printStackTrace();
		}
	}
	
	/**
	 * This method return Excel data in String at a particular row by column number
	 * @param row
	 * @param columnNumber
	 * @return String - Excel data by column number at a particular row.
	 */
	private String getExcelDataByColumnNumber(Row row, int columnNumber)
	{
		
		if(row == null || columnNumber < 0)
		{
			return null;
		}
		
		String returnValue = null; 
		try {
			Cell cell = row.getCell(columnNumber);

			if(cell == null)
			{
				return null;
			}

			//check the cell type and process accordingly
			switch(cell.getCellType()) {
			case Cell.CELL_TYPE_STRING:
				returnValue = cell.getStringCellValue();
				break;
			case Cell.CELL_TYPE_NUMERIC:
				
				double fractionalPart = cell.getNumericCellValue() % 1;
				if(fractionalPart == 0d)
				{
					returnValue = String.valueOf((int)cell.getNumericCellValue());
				}
				else {
					returnValue = String.valueOf(cell.getNumericCellValue());
				}
				
				break;
			}
		} catch(Exception ex)
		{
			ex.printStackTrace();
			logger.error(ex.getMessage(), ex);
		}
		
		if(returnValue != null && !returnValue.isEmpty())
		{
			return returnValue.trim();
		}
		return returnValue;
	}
}

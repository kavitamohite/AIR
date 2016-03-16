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

import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.HardwareCategory4;
import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.domain.Land;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CostcenterHbn;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.LokationItemHbn;
import com.bayerbbs.applrepos.hibernate.ManufacturerHbn;
import com.bayerbbs.applrepos.hibernate.ModelHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;

/**
 * This class implements the Servlet to import Excel or CSV file.
 * @author ENQMU
 *
 */
public class AirExcelImportServlet extends HttpServlet {

	private final static Logger logger = Logger.getLogger(AirExcelImportServlet.class);
	
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
							
							String manufacturer = null;
//							String subCategory = null;
							String type = null;
							String model = null;
							String companyCode = null;
							String companyName = null;
							
							
							AssetViewDataDTO obAssetViewDataDTO = new AssetViewDataDTO();
							assests.add(obAssetViewDataDTO);
							try {
								Row row = rowIterator.next();
								rowNum = row.getRowNum();
								obAssetViewDataDTO.setCwid(cwid);
								
								try {
								if(getExcelDataByColumnNumber(row, 0) != null && !getExcelDataByColumnNumber(row, 0).isEmpty() && getExcelDataByColumnNumber(row, 1) != null && !getExcelDataByColumnNumber(row, 1).isEmpty())
								{
									companyCode = getExcelDataByColumnNumber(row, 0); 
									companyName = getExcelDataByColumnNumber(row, 1); 
									Long ownerId = ManufacturerHbn.findPartnerByPartnerNameAndNumber(companyName, Long.parseLong(companyCode));
									if(ownerId == null)
									{
										errors.add("Please correct either company code and company name ("+ companyName + " : " + companyCode +") at row number : "+rowNum + " and try again later.");
									}
									else
									{
										obAssetViewDataDTO.setOwnerId(ownerId);
									}
								}
								
								} catch(Exception ex)
								{
									logger.error(ex.getMessage(), ex);
									ex.printStackTrace();
								}
								
								if(getExcelDataByColumnNumber(row, 2) != null)
								{
									manufacturer = getExcelDataByColumnNumber(row, 2).trim(); 
								}

								if(getExcelDataByColumnNumber(row, 3) != null)
								{
									type = getExcelDataByColumnNumber(row, 3).trim();
								}
								
								if(getExcelDataByColumnNumber(row, 4) != null)
								{
									model = getExcelDataByColumnNumber(row, 4).trim();
								}
								
								// getting Model object
								HardwareCategory4 objModel = null;
								// When model name is found in the file.
								if(model != null && !model.equalsIgnoreCase("unknown"))
								{
									objModel = ModelHbn.findModelIdByWhereName(model);
									// When model name is found in the database.
									if(objModel != null)
									{
										String dbManufacturer = objModel.getHwCategory3().getPartner().getName();
										if(manufacturer != null && dbManufacturer != null && !dbManufacturer.equalsIgnoreCase(manufacturer))
										{
											errors.add("Please input correct manufacturer name ("+ dbManufacturer +") at row number : "+rowNum + " and try again later.");
										}
										String dbSubCategory = objModel.getHwCategory3().getHwCategory2().getHwKategory2();
										if(dbSubCategory != null && dbSubCategory.equalsIgnoreCase("Server"))
										{
											String dcName =  getExcelDataByColumnNumber(row, 17);
											if(dcName != null && !dcName.isEmpty() && dcName.matches("^DC[0-9]*{4}?[0-9]*$"))
											{
												obAssetViewDataDTO.setSystemPlatformName(dcName);
											}
											else
											{
												errors.add("The DC name format should be DCXXXX(DC = text constants and  xxxx four digit numbers) at row number : "+rowNum + ".");
											}
										}
										String dbType = objModel.getHwCategory3().getHwKategory3();
										if(dbType != null && type != null && !dbType.equalsIgnoreCase(type))
										{
											errors.add("Please input correct type name ("+ dbType +") at row number : "+rowNum + " and try again later.");
										}

										obAssetViewDataDTO.setManufacturer(objModel.getHwCategory3().getPartner().getName());
										obAssetViewDataDTO.setManufacturerId(objModel.getHwCategory3().getPartnerId());
										obAssetViewDataDTO.setSubCategory(objModel.getHwCategory3().getHwCategory2().getHwKategory2());
										obAssetViewDataDTO.setSubcategoryId(objModel.getHwCategory3().getHwCategory2().getId());
										obAssetViewDataDTO.setTypeId(objModel.getHwCategory3().getId());
										obAssetViewDataDTO.setModel(model);
										obAssetViewDataDTO.setModelId(objModel.getId());

									}
									else
									{
										errors.add("Please correct invalid model name ("+ model +") at row number : "+rowNum + " and try again later.");
									}
								}
								else
								{
									errors.add("Please input model name at row number : "+rowNum + " and try again later.");
								}
								
								String pspElement = getExcelDataByColumnNumber(row, 14);
								if(pspElement != null && !pspElement.isEmpty())
								{
									boolean isExists = HardwareComponentHbn.isPSPElementExists(pspElement);
									if(isExists)
									{
										obAssetViewDataDTO.setPspElement(getExcelDataByColumnNumber(row, 14));
									}
									else
									{
										errors.add("Please input correct PspElement name ("+ pspElement +") at row number : "+rowNum + " and try again later.");
									}
								}
								

								Konto konto = null;
								String costCenter =  getExcelDataByColumnNumber(row, 15);
//								String dbOrganizationalUnitValue = null;
								if(costCenter != null && !costCenter.isEmpty())
								{
									obAssetViewDataDTO.setCostCenter(costCenter);  
									konto = CostcenterHbn.findCostCenterIdByName(costCenter);
									if(konto != null) {
										obAssetViewDataDTO.setCostCenterId(konto.getId());
										obAssetViewDataDTO.setCostCenterManagerId(konto.getCwidVerantw());
										
										if(konto.getCwidVerantw() != null) {
											List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(konto.getCwidVerantw());
//											if(persons != null && !persons.isEmpty())
//											{
//												dbOrganizationalUnitValue = persons.get(0).getOrgUnit();
//												logger.info("Company name >>>>>>> "+ dbOrganizationalUnitValue);
//											}
										}
										
									}
									else
									{
										errors.add("Please correct invalid Cost center name ("+ costCenter +") at row number : "+rowNum + " and try again later.");
									}
									
									/*String organizationalUnitValue = getExcelDataByColumnNumber(row, 1); 
									if(organizationalUnitValue != null)
									{
										if(dbOrganizationalUnitValue != null && !organizationalUnitValue.trim().equals(dbOrganizationalUnitValue))
										{
											errors.add("Please input correct company name ("+ dbOrganizationalUnitValue +") at row number "+rowNum + " and try again later.");
										}
										else if(organizationalUnitValue.trim().equals(dbOrganizationalUnitValue) || dbOrganizationalUnitValue == null)
										{
											obAssetViewDataDTO.setOrganizationalunit(organizationalUnitValue.trim());
										}

									}*/
									
								}

								Standort standort = null;
								String country = getExcelDataByColumnNumber(row, 7);
								String site = getExcelDataByColumnNumber(row, 8);
								String building = getExcelDataByColumnNumber(row, 9);
								String room = getExcelDataByColumnNumber(row, 10);
								String rackPosition = getExcelDataByColumnNumber(row, 11);
								logger.info("Country >>>>>>>>>>>>>> "+country); 

								Land land = null;
								if(country != null &&  !country.isEmpty())
								{
									land = LokationItemHbn.findLandByWhereName(country);
									if(land == null)
									{
										errors.add("Please correct invalid country name ("+ country +") at row number : "+rowNum + " and try again later.");
									}
									else
									{
										standort = StandortHbn.findSiteByNameAndLandId(site, land.getId());
										if(standort != null) 
										{
											Long buildingId = null;
											if(building != null && !building.isEmpty())
											{
												Building buildingObj = BuildingHbn.findLandByWhereName(standort.getId(), building);
												if(buildingObj != null)
												{
													logger.info("Building Id >>>>> "+buildingObj.getBuildingId());
													logger.info("Building name >>>>> "+buildingObj.getBuildingName());
													buildingId = buildingObj.getBuildingId();
												}
												
												if(buildingId == null)
												{
													errors.add("Please correct invalid building name ("+ building +") at row number : "+rowNum + " and try again later.");
												}
												else
												{
													if(room != null && !room.isEmpty()) {
														Long roomId = RoomHbn.findRoomIdByWhereName(buildingId, room);
														
														// If room name is not found in database.
														if(roomId == null)
														{
															errors.add("Please correct invalid room name ("+ room +") at row number : "+rowNum + " and try again later.");
														}
														else
														{
															if(rackPosition != null && !rackPosition.isEmpty())
															{
																Schrank objSchrank = SchrankHbn.findByNameAndRoomId(rackPosition, roomId);
																
																Long schrankId = null;
																if(objSchrank !=  null)
																{
																	schrankId = objSchrank.getSchrankId();
																	logger.info("Rack Position Id >>>>>>>>>>>>>>> "+ schrankId);
																}

																if(schrankId == null)
																{
																	errors.add("Please correct invalid rack position name ("+ rackPosition +") at row number : "+rowNum + " and try again later.");
																}
																else 
																{
																	obAssetViewDataDTO.setRackId(schrankId);
																}
															}

														}

													}
												}

											}
										}
										else {
											errors.add("Please correct site name ("+ site +") at row number : "+rowNum + " and try again later.");
										}
									}
								}

								obAssetViewDataDTO.setSerialNumber(getExcelDataByColumnNumber(row, 5));
								obAssetViewDataDTO.setTechnicalNumber(getExcelDataByColumnNumber(row, 6));

								String inventoryNumber = getExcelDataByColumnNumber(row, 12);
								if(inventoryNumber != null)
								{
									boolean exists = HardwareComponentHbn.isHardwareComponentByInventoryNumberExists(inventoryNumber.trim());
									if(exists)
									{
										errors.add("Inventory number ("+ inventoryNumber +") at row number "+rowNum + " already exists. Please change it and try again later.");
									}
									else
									{
										obAssetViewDataDTO.setInventoryNumber(inventoryNumber.trim());
									}
								}
								
								obAssetViewDataDTO.setOrderNumber(getExcelDataByColumnNumber(row, 13));
								
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
				/*for(AssetViewDataDTO objAssetViewDataDTO : assests)
				{
					if(cwid != null)
					{
						objAssetViewDataDTO.setCwid(cwid);
					}
					AssetViewDataDTO savedAssetViewDataDTO = HardwareComponentHbn.saveHardwareAsset(objAssetViewDataDTO);
					if(savedAssetViewDataDTO.getError() != null)
					{
						errorsInSaving.add(savedAssetViewDataDTO.getError() + " : Inventory number >> "+savedAssetViewDataDTO.getInventoryNumber());
					}
					
				}*/
				for(AssetViewDataDTO objAssetViewDataDTO : assests)
				{
					if(cwid != null)
					{
						objAssetViewDataDTO.setCwid(cwid);
					}
				}
				message = HardwareComponentHbn.saveHardwareAssets(assests);
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

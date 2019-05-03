package com.bayerbbs.air.error;

import java.io.File;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class ErrorCodeReader {

	private static String AIR_ERROR_MESSAGE_FILE;
	
	public static void setErrorMessageConfigFile(String filename) {
		AIR_ERROR_MESSAGE_FILE = filename;
	}

	public HashMap<String, ErrorCode> readErrorMessageData() {
		
		HashMap<String, ErrorCode> hmErrorMessages = new HashMap<String, ErrorCode>();
		
		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory
			.newInstance();
			dbFactory.setValidating(false);
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(new File( AIR_ERROR_MESSAGE_FILE ));
			doc.getDocumentElement().normalize();

			NodeList paramsList = doc.getElementsByTagName("ErrorCodeItems");
	
			if (null != paramsList) {
				
				NodeList propertyList = ((Element) paramsList.item(0)).getElementsByTagName("Error");
				
				for (int i = 0; i < propertyList.getLength(); i++) {
					
					Element currentZeile = (Element) propertyList.item(i);
					String errorCode = getValue(currentZeile, "code");
					String errorMessage = getValue(currentZeile, "message");
					
					ErrorCode data = new ErrorCode();
					data.setErrorCode(errorCode);
					data.setErrorMessage(errorMessage);
					
					hmErrorMessages.put(data.getErrorCode() , data);
					
					// System.out.println(data.getId() + " " + data.getMandatory() + " " + data.getRelevance());
					
				}
			}
			
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.toString());
		}
		System.out.println("XML Ende");
		return hmErrorMessages;
	}
	
	protected String getValue(Element currentZeile, String key) {
		String result = null;
		
		if (null != currentZeile) {
			NodeList nodelist = currentZeile.getElementsByTagName(key);
			
			if (null != nodelist && 0 < nodelist.getLength()) {
				Element element = (Element) nodelist.item(0);
				if (null != element) {
					result = element.getTextContent();
				}
			}
			
		}

		return result;
	}
	
}

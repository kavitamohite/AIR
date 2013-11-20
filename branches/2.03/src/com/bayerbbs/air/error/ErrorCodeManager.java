package com.bayerbbs.air.error;

import java.util.HashMap;

public class ErrorCodeManager {

	private static HashMap<String, ErrorCode> hmErrorMessages = new HashMap<String, ErrorCode>();
	
	public String getErrorMessage(String errorCode) {
		return getErrorMessage(errorCode, null);
	}
	
	public String getErrorMessage(String errorCode, String test) {
		
		String errorMessageDisplay = null;
		
		ErrorCodeReader reader = new ErrorCodeReader();
		
		// TODO Optimierung nicht jedesmal einlesen / nur für Entwicklung
		hmErrorMessages = reader.readErrorMessageData();
		
		ErrorCode errorCodeData = hmErrorMessages.get(errorCode);
		
		if (null != errorCodeData) {
			errorMessageDisplay = errorCodeData.getErrorMessage();
			if (-1 != errorMessageDisplay.indexOf("###")) {
				errorMessageDisplay = errorMessageDisplay.replace("###", test);
			}
		}
		else {
			errorMessageDisplay = "ERROR code: " + errorCode;
		}
		return errorMessageDisplay;
	}
	
}

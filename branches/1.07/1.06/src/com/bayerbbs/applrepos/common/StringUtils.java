package com.bayerbbs.applrepos.common;

public class StringUtils {


	public static boolean isNotNullOrEmpty(String input) {
		boolean result = false;
		if (null != input && !"".equals(input)) {
			result = true;
		}
		return result;
	}
	
	public static boolean isNullOrEmpty(String input) {
		boolean result = false;
		if (null == input || "".equals(input)) {
			result = true;
		}
		return result;
	}
	
	
}

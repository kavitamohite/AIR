package com.bayerbbs.applrepos.common;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class ApplReposTS {

	
	/**
	 * returns the current Timestamp (for inserts and updates)
	 * @return
	 */
	public static Timestamp getCurrentTimestamp() {
		return new Timestamp(System.currentTimeMillis());
	}
	

	/**
	 * returns the deletion timestamp (meaning 10 years from today) 
	 * @return
	 */
	public static Timestamp getDeletionTimestamp() {
		Calendar cal = new GregorianCalendar();
		cal.add(Calendar.YEAR, 10);
		return new Timestamp(cal.getTimeInMillis());
	}


	/**
	 * returns the timestamp formatted for display purpose
	 * @param timestamp
	 * @return
	 */
	public static String getTimestampDisp(Timestamp timestamp) {
		if (null == timestamp) {
			return "";
		}
		String DATE_FORMAT = "yyyy-MM-dd HH:mm";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		return sdf.format(timestamp);
	}
	
}

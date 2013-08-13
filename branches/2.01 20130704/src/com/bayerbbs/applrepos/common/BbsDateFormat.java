package com.bayerbbs.applrepos.common;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Provides an application wide SimpleDateFormat
 */

public class BbsDateFormat {

	/** the date format */
	private static final String DATE_FORMAT = "yyyy-MM-dd HH:mm";

	private static BbsDateFormat instance;

	/** the formater */
	private static SimpleDateFormat sdf;

	/**
	 * @return
	 */
	public static BbsDateFormat getInstance() {
		if (instance == null) {
			instance = new BbsDateFormat();
		}
		return instance;
	}

	private BbsDateFormat() {
		sdf = new SimpleDateFormat(DATE_FORMAT);
	}

	/**
	 * Formats a {@link Timestamp} instance
	 * 
	 * @return a date string
	 */
	public String format(Timestamp timestamp) {
		return sdf.format(timestamp);
	}

	/**
	 * Formats a {@link Date} instance
	 * 
	 * @return a date string
	 */
	public String format(Date date) {
		return sdf.format(date);
	}
}

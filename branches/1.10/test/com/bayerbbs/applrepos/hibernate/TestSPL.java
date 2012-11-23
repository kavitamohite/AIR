package com.bayerbbs.applrepos.hibernate;

import org.hibernate.Session;
import org.hibernate.cfg.AnnotationConfiguration;

import com.bayerbbs.applrepos.domain.SystemPlatform;
import com.bayerbbs.applrepos.hibernate.SystemPlatformHbn;

public class TestSPL {
	static Session session = null;
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		session = new AnnotationConfiguration().configure().buildSessionFactory().openSession();
		
		//SystemPlatformHbn.listSystemPlatform();
		SystemPlatform spl =  SystemPlatformHbn.findSystemPlatformByName("BY7437");
		System.out.println(spl.getAlias());		
		System.out.println(spl.getAvailability().getSbTextEn());
		System.out.println(spl.getAvailabilityText());
		System.out.println(spl.getClusterCode());
		System.out.println(spl.getClusterType());
		System.out.println(spl.getConfidentiality().getSbTextEn());
		System.out.println(spl.getConfidentialityText());
		System.out.println(spl.getSystemPlatformName());
		session.close();
	}

}

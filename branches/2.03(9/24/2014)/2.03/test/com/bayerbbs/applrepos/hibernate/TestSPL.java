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
		session = new AnnotationConfiguration().configure("hibernate.qa.cfg.xml").buildSessionFactory().openSession();
		
		//SystemPlatformHbn.listSystemPlatform();
		SystemPlatform spl =  SystemPlatformHbn.findSystemPlatformByName("BY7437");
		System.out.println("System Platform ID: "+spl.getID());
		System.out.println("System Platform Name: "+spl.getName());
		System.out.println("Alias: "+spl.getAlias());		
		System.out.println("Responsible: "+spl.getResponsible());
		//System.out.println("Availability: "+spl.getAvailability().getPLTextEn());
		System.out.println("Availability Text: "+spl.getAvailabilityText());
		System.out.println("Cluster Code: "+spl.getClusterCode());
		System.out.println("Cluster Type: "+spl.getClusterType());
		//System.out.println("Confidentiality: "+spl.getConfidentiality().getPLTextEn());
		System.out.println("Confidentiality Text: "+spl.getConfidentialityText());
		session.close();
	}

}

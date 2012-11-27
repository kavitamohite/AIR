package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import org.hibernate.annotations.Entity;

import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name="SEVERITY_LEVEL")
@SequenceGenerator(name = "MySeqSeverityLevel", sequenceName = "TBADM.SEQ_SEVERITY_LEVEL")

public class SeverityLevel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 168789052260094674L;

}

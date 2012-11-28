package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Entity;


@Entity
@Table(name="SEVERITY_LEVEL")
@SequenceGenerator(name = "MySeqSeverityLevel", sequenceName = "TBADM.SEQ_SEVERITY_LEVEL")

public class SeverityLevel implements Serializable {
	private static final long serialVersionUID = 168789052260094674L;


	
	@Id @GeneratedValue
	public Long getID() {
		return id;
	}
	public void setID(Long id) {
		this.id = id;
	}
	protected Long id;
}

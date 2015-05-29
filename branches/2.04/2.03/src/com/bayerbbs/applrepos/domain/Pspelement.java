package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "IMP_APT_HWK")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "PspSeq", sequenceName = "TBADM.SEQ_IMP_APT_HWK")
public class Pspelement {
	
	private Long id;
	private String name;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "PspSeq")
	@Column(name = "IMP_APT_HWK_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "HWK_FULL_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}

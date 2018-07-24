package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.WhereJoinTable;

@Entity
@Table(name = "IT_SYS_IT_SYS")
@org.hibernate.annotations.Entity(dynamicInsert = true)
//Added new class for IM0006774604
public class IT_SYS_IT_SYS extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 2374268074399112605L;

	private long IT_SYS_H_ID;
	
	
	private long IT_SYS_L_ID;


	
	private long id;

	
	@Id
	@Column(name = "IT_SYS_IT_SYS_ID")
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	

	
	@Column(name = "IT_SYS_HIGHER_ID")
	public long getIT_SYS_H_ID() {
		return IT_SYS_H_ID;
	}

	

	public void setIT_SYS_H_ID(long iT_SYS_H_ID) {
		IT_SYS_H_ID = iT_SYS_H_ID;
	}
	@Column(name = "IT_SYS_LOWER_ID")
	public long getIT_SYS_L_ID() {
		return IT_SYS_L_ID;
	}

	public void setIT_SYS_L_ID(long iT_SYS_L_ID) {
		IT_SYS_L_ID = iT_SYS_L_ID;
	}
	
	

}

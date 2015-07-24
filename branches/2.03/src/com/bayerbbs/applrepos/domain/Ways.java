/**
 * 
 */
package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * @author equuw
 * 
 */
@Entity
@Table(name = "WAYS")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "mySeqWays", sequenceName = "TBADM.SEQ_WAYS")
@NamedQueries({ @NamedQuery(name = "findPathwayByName", query = "FROM Ways w where w.wayName=:name") })
public class Ways extends CiBase1 implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8312261318052495894L;

	private String connection;
	private String vendorCircuitName;

	private Long id;
	private String name;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "mySeqWays")
	@Column(name = "WAYS_ID")
	public Long getWaysId() {
		return getId();
	}

	public void setWaysId(Long waysId) {
		setId(waysId);
	}

	@Column(name = "WAYS_NAME")
	public String getWayName() {
		return getName();
	}

	public void setWayName(String wayName) {
		setName(wayName);
	}

	@Transient
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Transient
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "CONNECTION")
	public String getConnection() {
		return connection;
	}

	public void setConnection(String connection) {
		this.connection = connection;
	}

	@Column(name = "VENDOR_CIRCUIT_NAME")
	public String getVendorCircuitName() {
		return vendorCircuitName;
	}

	public void setVendorCircuitName(String vendorCircuitName) {
		this.vendorCircuitName = vendorCircuitName;
	}

}

/**
 * 
 */
package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * @author equuw
 * 
 */
@Entity
@Table(name = "WAYS")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "mySeqWays", sequenceName = "SEQ_WAYS")
public class Ways extends CiBase1 implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8312261318052495894L;

	private String connection;
	private String vendorCircuitName;

	@Column(name = "WAYS_NAME")
	public String getWayName() {
		return getName();
	}

	public void setWayName(String wayName) {
		setName(wayName);
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

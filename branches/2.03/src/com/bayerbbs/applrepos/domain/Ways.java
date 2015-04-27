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
@NamedQueries({
@NamedQuery(name="findPathwayByName", query="FROM Ways w where w.wayName=:name")
}
		)
public class Ways extends DeletableRevisionInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8312261318052495894L;

	private String connection;
	private String vendorCircuitName;
	
	private Long id;
	private String name;
	
	private String ciOwner;
	private String ciOwnerDelegate;

	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanceITSEC;
	private String gxpFlag;
	
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

	
	@Column(name = "RESPONSIBLE")
	public String getCiOwner() {
		return ciOwner;
	}

	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}

	@Column(name = "SUB_RESPONSIBLE")
	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}

	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}
	
	
	
	@Column(name = "CONNECTION")
	public String getConnection() {
		return connection;
	}

	public void setConnection(String connection) {
		this.connection = connection;
	}

	@Column(name = "ITSET")
	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}

	@Column(name = "TEMPLATE")
	public Long getTemplate() {
		return template;
	}

	public void setTemplate(Long template) {
		this.template = template;
	}

	@Column(name = "ITSEC_GRUPPE_ID")
	public Long getItsecGroupId() {
		return itsecGroupId;
	}

	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}

	@Column(name = "REF_ID")
	public Long getRefId() {
		return refId;
	}

	public void setRefId(Long refId) {
		this.refId = refId;
	}
	
	
	@Column(name = "RELEVANCE_ICS")
	public Long getRelevanceICS() {
		return relevanceICS;
	}

	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}

	@Column(name = "RELEVANZ_ITSEC")
	public Long getRelevanceITSEC() {
		return relevanceITSEC;
	}

	public void setRelevanceITSEC(Long relevanceITSEC) {
		this.relevanceITSEC = relevanceITSEC;
	}

	@Column(name = "GXP_FLAG")
	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
		
	
	
	@Column(name = "VENDOR_CIRCUIT_NAME")
	public String getVendorCircuitName() {
		return vendorCircuitName;
	}

	public void setVendorCircuitName(String vendorCircuitName) {
		this.vendorCircuitName = vendorCircuitName;
	}

}

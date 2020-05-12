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
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import javax.persistence.NamedQueries;

/**
 * @author equuw
 *
 */
@Entity
@Table(name ="FUNCTION")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name="mySeqFunction" ,sequenceName="SEQ_FUNCTION")
@NamedQueries({
@NamedQuery(name="findFunctionByName", query="FROM Function f where f.functionName=:name")
}
		)
public class Function extends DeletableRevisionInfo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1852655805032263959L;
	
	private Long id;
	private String name;
	
	private String ciOwner;
	private String ciOwnerDelegate;
	
	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	/*--ELERJ ICS--*/
//	private Long relevanceICS;
	private Long relevanceITSEC;
	/*--ELERJ GXP---*/
//	private String gxpFlag;
	

	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "mySeqFunction")
	@Column(name = "FUNCTION_ID")
	public Long getFunctionId() {
		return getId();
	}
	public void setFunctionId(Long functionId) {
		setId(functionId);
	}	
	
	@Column(name = "FUNCTION_NAME")
	public String getFunctionName() {
		return getName();
	}

	public void setFunctionName(String functionName) {
		setName(functionName);
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
	
	
	/*@Column(name = "RELEVANCE_ICS")
	public Long getRelevanceICS() {
		return relevanceICS;
	}

	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
*/
	@Column(name = "RELEVANZ_ITSEC")
	public Long getRelevanceITSEC() {
		return relevanceITSEC;
	}

	public void setRelevanceITSEC(Long relevanceITSEC) {
		this.relevanceITSEC = relevanceITSEC;
	}

	/*@Column(name = "GXP_FLAG")
	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
*/		
	
	

}

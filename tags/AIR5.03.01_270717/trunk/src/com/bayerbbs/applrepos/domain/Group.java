package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
@Entity
@Table(name = "V_MD_GROUP")
public class Group implements Serializable {

	private static final long serialVersionUID = 2010107075766308936L;

	private Long groupId;
	private String groupName;
	private String cwidResponsible;
	private String managerCwid;
	private String managerSubstituteCwid;
	
	// search parameter attributes
	private String changeTeamYN;
	private String ciOwnerYN;
	private String escalationListYN;
	private String impactedBusinessGroupYN;
	private String implementationTeamYN;
	private String owningBusinessGroupYN;
	private String serviceCoordinatorYN;
	private String supportGroupImResolverYN;
	
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Group() {
	}

	// ------------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------------

	/**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 */
	@Transient
	public Long getId() {
		return getGroupId();
	}

	/**
	 * Returns the value of the field {@link #groupId}.
	 * 
	 * @return Value of the {@link #groupId} field.
	 */
	@Id
	@Column(name = "GROUP_ID")
	public Long getGroupId() {
		return groupId;
	}

	/**
	 * Sets the value of the {@link #groupId} field.
	 * 
	 * @param groupId
	 *            The value to set.
	 */
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	/**
	 * Returns the value of the field {@link #groupName}.
	 * 
	 * @return Value of the {@link #groupName} field.
	 */
	@Column(name = "GROUP_NAME")
	public String getGroupName() {
		return groupName;
	}

	/**
	 * Sets the value of the {@link #groupName} field.
	 * 
	 * @param groupName
	 *            The value to set.
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	/**
	 * Returns the value of the field {@link #cwidResponsible}.
	 * 
	 * @return Value of the {@link #cwidResponsible} field.
	 */
	@Column(name = "CWID_RESPONSIBLE")
	public String getCwidResponsible() {
		return cwidResponsible;
	}

	/**
	 * Sets the value of the {@link #cwidResponsible} field.
	 * 
	 * @param cwidResponsible
	 *            The value to set.
	 */
	public void setCwidResponsible(String cwidResponsible) {
		this.cwidResponsible = cwidResponsible;
	}
	
	/**
	 * Returns the value of the field {@link #managerCwid}.
	 * 
	 * @return Value of the {@link #managerCwid} field.
	 */
	@Column(name = "MANAGER_CWID")
	public String getManagerCwid() {
		return managerCwid;
	}

	/**
	 * Sets the value of the {@link #managerCwid} field.
	 * 
	 * @param managerCwid
	 *            The value to set.
	 */
	public void setManagerCwid(String managerCwid) {
		this.managerCwid = managerCwid;
	}

	/**
	 * Returns the value of the field {@link #managerSubstituteCwid}.
	 * 
	 * @return Value of the {@link #managerSubstituteCwid} field.
	 */
	@Column(name = "MANAGER_SUBSTITUTE_CWID")
	public String getManagerSubstituteCwid() {
		return managerSubstituteCwid;
	}

	/**
	 * Sets the value of the {@link #managerSubstituteCwid} field.
	 * 
	 * @param managerSubstituteCwid
	 *            The value to set.
	 */
	public void setManagerSubstituteCwid(String managerSubstituteCwid) {
		this.managerSubstituteCwid = managerSubstituteCwid;
	}

	/**
	 * Returns the value of the field {@link #changeTeamYN}.
	 * 
	 * @return Value of the {@link #changeTeamYN} field.
	 */
	@Column(name = "CHANGE_TEAM_Y_N")
	public String getChangeTeamYN() {
		return changeTeamYN;
	}

	/**
	 * Sets the value of the {@link #changeTeamYN} field.
	 * 
	 * @param changeTeamYN
	 *            The value to set.
	 */
	public void setChangeTeamYN(String changeTeamYN) {
		this.changeTeamYN = changeTeamYN;
	}

	/**
	 * Returns the value of the field {@link #ciOwnerYN}.
	 * 
	 * @return Value of the {@link #ciOwnerYN} field.
	 */
	@Column(name = "CI_OWNER_Y_N")
	public String getCiOwnerYN() {
		return ciOwnerYN;
	}

	/**
	 * Sets the value of the {@link #ciOwnerYN} field.
	 * 
	 * @param ciOwnerYN
	 *            The value to set.
	 */
	public void setCiOwnerYN(String ciOwnerYN) {
		this.ciOwnerYN = ciOwnerYN;
	}

	/**
	 * Returns the value of the field {@link #escalationListYN}.
	 * 
	 * @return Value of the {@link #escalationListYN} field.
	 */
	@Column(name = "ESCALATION_LIST_Y_N")
	public String getEscalationListYN() {
		return escalationListYN;
	}

	/**
	 * Sets the value of the {@link #escalationListYN} field.
	 * 
	 * @param escalationListYN
	 *            The value to set.
	 */
	public void setEscalationListYN(String escalationListYN) {
		this.escalationListYN = escalationListYN;
	}

	
	
	/**
	 * Returns the value of the field {@link #impactedBusinessGroupYN}.
	 * 
	 * @return Value of the {@link #impactedBusinessGroupYN} field.
	 */
	@Column(name = "IMPACTED_BUSINESS_GROUP_Y_N")
	public String getImpactedBusinessGroupYN() {
		return impactedBusinessGroupYN;
	}

	/**
	 * Sets the value of the {@link #impactedBusinessGroupYN} field.
	 * 
	 * @param impactedBusinessGroupYN
	 *            The value to set.
	 */
	public void setImpactedBusinessGroupYN(String impactedBusinessGroupYN) {
		this.impactedBusinessGroupYN = impactedBusinessGroupYN;
	}

	/**
	 * Returns the value of the field {@link #implementationTeamYN}.
	 * 
	 * @return Value of the {@link #implementationTeamYN} field.
	 */
	@Column(name = "IMPLEMENTATION_TEAM_Y_N")
	public String getImplementationTeamYN() {
		return implementationTeamYN;
	}

	/**
	 * Sets the value of the {@link #implementationTeamYN} field.
	 * 
	 * @param implementationTeamYN
	 *            The value to set.
	 */
	public void setImplementationTeamYN(String implementationTeamYN) {
		this.implementationTeamYN = implementationTeamYN;
	}

	/**
	 * Returns the value of the field {@link #owningBusinessGroupYN}.
	 * 
	 * @return Value of the {@link #owningBusinessGroupYN} field.
	 */
	@Column(name = "OWNING_BUSINESS_GROUP_Y_N")
	public String getOwningBusinessGroupYN() {
		return owningBusinessGroupYN;
	}

	/**
	 * Sets the value of the {@link #owningBusinessGroupYN} field.
	 * 
	 * @param owningBusinessGroupYN
	 *            The value to set.
	 */
	public void setOwningBusinessGroupYN(String owningBusinessGroupYN) {
		this.owningBusinessGroupYN = owningBusinessGroupYN;
	}

	/**
	 * Returns the value of the field {@link #serviceCoordinatorYN}.
	 * 
	 * @return Value of the {@link #serviceCoordinatorYN} field.
	 */
	@Column(name = "SERVICE_COORDINATOR_Y_N")
	public String getServiceCoordinatorYN() {
		return serviceCoordinatorYN;
	}

	/**
	 * Sets the value of the {@link #serviceCoordinatorYN} field.
	 * 
	 * @param serviceCoordinatorYN
	 *            The value to set.
	 */
	public void setServiceCoordinatorYN(String serviceCoordinatorYN) {
		this.serviceCoordinatorYN = serviceCoordinatorYN;
	}

	/**
	 * Returns the value of the field {@link #supportGroupImResolverYN}.
	 * 
	 * @return Value of the {@link #supportGroupImResolverYN} field.
	 */
	@Column(name = "SUPPORT_GROUP_IM_RESOLVER_Y_N")
	public String getSupportGroupImResolverYN() {
		return supportGroupImResolverYN;
	}

	/**
	 * Sets the value of the {@link #supportGroupImResolverYN} field.
	 * 
	 * @param supportGroupImResolverYN
	 *            The value to set.
	 */
	public void setSupportGroupImResolverYN(String supportGroupImResolverYN) {
		this.supportGroupImResolverYN = supportGroupImResolverYN;
	}

}

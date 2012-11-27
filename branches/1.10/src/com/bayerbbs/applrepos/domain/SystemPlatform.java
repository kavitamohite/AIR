package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "IT_SYSTEM")
@SequenceGenerator(name = "MySeqITSystem", sequenceName = "TBADM.SEQ_IT_SYSTEM")
@AttributeOverrides({
	@AttributeOverride(name = "id", column = @Column(name = "IT_SYSTEM_ID", insertable = false, updatable = false)),
	@AttributeOverride(name = "name", column = @Column(name = "IT_SYSTEM_NAME")),
	@AttributeOverride(name = "responsible", column = @Column(name = "CWID_VERANTW_BETR"))
})
public class SystemPlatform extends ControlItem implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2407052791148141236L;
	//private Long systemPlatformID;
	private String systemPlatformName;
	private String alias;
	private Long hwIdentOrTrans;
	private OperatingSystem operatingSystem;
	private PrimaryFunction primaryFunction;
	private OperationalStatus operationalStatus;
	private String clusterCode;
	private String clusterType;
	private Character virtualHW;
	private Character virtualHost;
	private String virtualHostSW;
	private Lifecycle lifecycle;
	private LicenseScanning licenseScanning;
		
	/**
	 * 
	 */
	public SystemPlatform() {
		super();
		this.setCiType(CIType.SYSTEM_PLATFORM);
	}
	@Override
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqITSystem")
	@AttributeOverride(name = "id", column = @Column(name = "IT_SYSTEM_ID", insertable = false, updatable = false))
	public Long getID() {
		return this.id;
	}
	@Override
	@NaturalId
	@AttributeOverride(name = "name", column = @Column(name = "IT_SYSTEM_NAME"))
	public String getName() {
		return this.systemPlatformName;
	}
	public void setName(String name) {
		this.systemPlatformName = name;
	}
	
	@Column(name = "ALIAS")
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	@Column(name = "HW_IDENT_OR_TRANS")
	public Long getHwIdentOrTrans() {
		return hwIdentOrTrans;
	}
	public void setHwIdentOrTrans(Long hwIdentOrTrans) {
		this.hwIdentOrTrans = hwIdentOrTrans;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "OS_NAME_ID", nullable = true)
	public OperatingSystem getOperatingSystem() {
		return operatingSystem;
	}
	public void setOperatingSystem(OperatingSystem operatingSystem) {
		this.operatingSystem = operatingSystem;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PRIMARY_FUNCTION_ID", nullable = true)
	public PrimaryFunction getPrimaryFunction() {
		return primaryFunction;
	}
	public void setPrimaryFunction(PrimaryFunction primaryFunction) {
		this.primaryFunction = primaryFunction;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "EINSATZ_STATUS_ID", nullable = true)
	public OperationalStatus getOperationalStatus() {
		return operationalStatus;
	}
	public void setOperationalStatus(OperationalStatus operationalStatus) {
		this.operationalStatus = operationalStatus;
	}
	@Column(name = "CLUSTER_CODE")
	public String getClusterCode() {
		return clusterCode;
	}
	public void setClusterCode(String clusterCode) {
		this.clusterCode = clusterCode;
	}
	@Column(name = "CLUSTER_TYPE")
	public String getClusterType() {
		return clusterType;
	}
	public void setClusterType(String clusterType) {
		this.clusterType = clusterType;
	}
	@Type(type="yes_no")
	@Column(name = "VIRTUAL_HW_Y_N")
	public Boolean getVirtualHW() {
		if (virtualHW == null) return null;
		return virtualHW == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}
	public void setVirtualHW(Boolean virtualHW) {
		if (virtualHW == null)
		{
			this.virtualHW = null;
		}
		else
		{
			this.virtualHW = virtualHW == true  ? 'Y' : 'N';
		}
	}
	@Type(type="yes_no")
	@Column(name = "VIRTUAL_HOST_Y_N")
	public Boolean getVirtualHost() {
		if (virtualHost == null) return null;
		return virtualHost == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}
	public void setVirtualHost(Boolean virtualHost) {
		if (virtualHost == null)
		{
			this.virtualHost = null;
		}
		else
		{
			this.virtualHost = virtualHost == true  ? 'Y' : 'N';
		}
	}
	
	@Column(name = "VIRTUAL_HOST_SW")
	public String getVirtualHostSW() {
		return virtualHostSW;
	}
	public void setVirtualHostSW(String virtualHostSW) {
		this.virtualHostSW = virtualHostSW;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LC_SUB_STATUS_ID", nullable = true)
	public Lifecycle getLifecycle() {
		return lifecycle;
	}
	public void setLifecycle(Lifecycle lifecycle) {
		this.lifecycle = lifecycle;
	}
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "LICENSE_SCANNING")
	public LicenseScanning getLicenseScanning() {
		return licenseScanning;
	}
	public void setLicenseScanning(LicenseScanning licenseScanning) {
		this.licenseScanning = licenseScanning;
	}
/*	@Override
	@AttributeOverride(name = "RESPONSIBLE", column = @Column(name = "CWID_VERANTW_BETR"))
	public Person getResponsible() {
		return this.responsible;
	}
	public void setResponsible(Person responsible) {
		this.responsible = responsible;
	}
*/}
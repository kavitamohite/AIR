package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ITSEC_MASSN_STATUS")
@org.hibernate.annotations.Entity(dynamicInsert = true)
public class ItsecCompliance extends RevisionInfo implements Serializable {

	private static final long serialVersionUID = -2270858009018028854L;
	
	private Long itsecMassnStId;
	private Long zobId;
	private Long tabelleId;
	private Long tabellePkId;
	private Long statusId;
	private String statusKommentar;
	private Long massnahmeGSTOOLID;
	private String noUpdateYN;
	private String gap;
	private String gapResponsible;
	private String gapMeasure;
	private Date gapEndDate;
	private Long gapPriority;
	private Long refTableID;
	private Long refPKID;
	private Float expense;
	private Float probOccurence;
	private Float damage;
	private Float mitigationPotential;
	private String signee;
	private Date gapClassApproved;
	private String expenseT;
	private String probOccucrenceT;
	private String damageT;
	private String mitigationPotentialT;
	private Long riskAnalysisAsFreetext;
	private Long gapEndDateIncreased;
	private String currency;
	private Long templateException;
	
	
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ItsecCompliance() {
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
		return getItsecMassnStId();
	}

	/**
	 * Returns the value of the field {@link #itsecMassnStId}.
	 * 
	 * @return Value of the {@link #itsecMassnStId} field.
	 */
	@Id
	@Column(name = "ITSEC_MASSN_ST_ID")
	public Long getItsecMassnStId() {
		return itsecMassnStId;
	}

	/**
	 * Sets the value of the {@link #itsecMassnStId} field.
	 * 
	 * @param itsecMassnStId
	 *            The value to set.
	 */
	public void setItsecMassnStId(Long itsecMassnStId) {
		this.itsecMassnStId = itsecMassnStId;
	}

	@Column(name = "ZOB_ID")
	public Long getZobId() {
		return zobId;
	}

	public void setZobId(Long zobId) {
		this.zobId = zobId;
	}

	@Column(name = "TABELLE_ID")
	public Long getTabelleId() {
		return tabelleId;
	}

	public void setTabelleId(Long tabelleId) {
		this.tabelleId = tabelleId;
	}

	@Column(name = "TABELLE_PK_ID")
	public Long getTabellePkId() {
		return tabellePkId;
	}

	public void setTabellePkId(Long tabellePkId) {
		this.tabellePkId = tabellePkId;
	}

	@Column(name = "STATUS_ID")
	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	@Column(name = "STATUS_KOMMENTAR")
	public String getStatusKommentar() {
		return statusKommentar;
	}

	public void setStatusKommentar(String statusKommentar) {
		this.statusKommentar = statusKommentar;
	}

	@Column(name = "MASSNAHME_GSTOOLID")
	public Long getMassnahmeGSTOOLID() {
		return massnahmeGSTOOLID;
	}

	public void setMassnahmeGSTOOLID(Long massnahmeGSTOOLID) {
		this.massnahmeGSTOOLID = massnahmeGSTOOLID;
	}

	@Column(name = "NO_UPDATE_Y_N")
	public String getNoUpdateYN() {
		return noUpdateYN;
	}

	public void setNoUpdateYN(String noUpdateYN) {
		this.noUpdateYN = noUpdateYN;
	}

	@Column(name = "GAP")
	public String getGap() {
		return gap;
	}

	public void setGap(String gap) {
		this.gap = gap;
	}

	@Column(name = "GAP_RESPONSIBLE")
	public String getGapResponsible() {
		return gapResponsible;
	}

	public void setGapResponsible(String gapResponsible) {
		this.gapResponsible = gapResponsible;
	}

	@Column(name = "GAP_MEASURE")
	public String getGapMeasure() {
		return gapMeasure;
	}

	public void setGapMeasure(String gapMeasure) {
		this.gapMeasure = gapMeasure;
	}

	@Column(name = "GAP_END_DATE")
	public Date getGapEndDate() {
		return gapEndDate;
	}

	public void setGapEndDate(Date gapEndDate) {
		this.gapEndDate = gapEndDate;
	}

	@Column(name = "GAP_PRIORITY")
	public Long getGapPriority() {
		return gapPriority;
	}

	public void setGapPriority(Long gapPriority) {
		this.gapPriority = gapPriority;
	}

	@Column(name = "REF_TABLE_ID")
	public Long getRefTableID() {
		return refTableID;
	}

	public void setRefTableID(Long refTableID) {
		this.refTableID = refTableID;
	}

	@Column(name = "REF_PK_ID")
	public Long getRefPKID() {
		return refPKID;
	}

	public void setRefPKID(Long refPKID) {
		this.refPKID = refPKID;
	}

	@Column(name = "EXPENSE")
	public Float getExpense() {
		return expense;
	}

	public void setExpense(Float expense) {
		this.expense = expense;
	}

	@Column(name = "PROB_OCCURENCE")
	public Float getProbOccurence() {
		return probOccurence;
	}

	public void setProbOccurence(Float probOccurence) {
		this.probOccurence = probOccurence;
	}

	@Column(name = "DAMAGE")
	public Float getDamage() {
		return damage;
	}

	public void setDamage(Float damage) {
		this.damage = damage;
	}

	@Column(name = "MITIGATION_POTENTIAL")
	public Float getMitigationPotential() {
		return mitigationPotential;
	}

	public void setMitigationPotential(Float mitigationPotential) {
		this.mitigationPotential = mitigationPotential;
	}

	@Column(name = "SIGNEE")
	public String getSignee() {
		return signee;
	}

	public void setSignee(String signee) {
		this.signee = signee;
	}

	@Column(name = "GAP_CLASS_APPROVED")
	public Date getGapClassApproved() {
		return gapClassApproved;
	}

	public void setGapClassApproved(Date gapClassApproved) {
		this.gapClassApproved = gapClassApproved;
	}

	@Column(name = "EXPENSE_T")
	public String getExpenseT() {
		return expenseT;
	}

	public void setExpenseT(String expenseT) {
		this.expenseT = expenseT;
	}

	@Column(name = "PROB_OCCURENCE_T")
	public String getProbOccucrenceT() {
		return probOccucrenceT;
	}

	public void setProbOccucrenceT(String probOccucrenceT) {
		this.probOccucrenceT = probOccucrenceT;
	}

	@Column(name = "DAMAGE_T")
	public String getDamageT() {
		return damageT;
	}

	public void setDamageT(String damageT) {
		this.damageT = damageT;
	}

	@Column(name = "MITIGATION_POTENTIAL_T")
	public String getMitigationPotentialT() {
		return mitigationPotentialT;
	}

	public void setMitigationPotentialT(String mitigationPotentialT) {
		this.mitigationPotentialT = mitigationPotentialT;
	}

	@Column(name = "RISK_ANALYSIS_AS_FREETEXT")
	public Long getRiskAnalysisAsFreetext() {
		return riskAnalysisAsFreetext;
	}

	public void setRiskAnalysisAsFreetext(Long riskAnalysisAsFreetext) {
		this.riskAnalysisAsFreetext = riskAnalysisAsFreetext;
	}

	@Column(name = "GAP_END_DATE_INCREASED")
	public Long getGapEndDateIncreased() {
		return gapEndDateIncreased;
	}

	public void setGapEndDateIncreased(Long gapEndDateIncreased) {
		this.gapEndDateIncreased = gapEndDateIncreased;
	}

	@Column(name = "CURRENCY")
	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	@Column(name = "TEMPLATE_EXCEPTION")
	public Long getTemplateException() {
		return templateException;
	}

	public void setTemplateException(Long templateException) {
		this.templateException = templateException;
	}
	
	
	
	
	
	
}

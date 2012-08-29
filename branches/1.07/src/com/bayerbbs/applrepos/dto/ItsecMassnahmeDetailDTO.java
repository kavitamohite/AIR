package com.bayerbbs.applrepos.dto;

public class ItsecMassnahmeDetailDTO {

	private Long itsecMassnahmenStatusId;
	private Long massnahmeGstoolId;
	
	private Long zobId;
	private Long tabelleId;
	private Long tabellePkId;

	private String noUpdateYN;
	private Long refTableID;
	private Long refPKID;

	
	private Long katalogId;
	private Long massnahmeNr;
	
	private String massnahmeTitel;
	
	private Long statusId;
	
	private String statusKommentar;
	
	
	private String itsecGruppeTxt;
	private Long templateException;
	private String gap;
	private String gapResponsible;
	private String gapMeasure;
	private Long gapEndDate;	//String date in Javascript?
	
	private Long secuRelevance;
	private Long accsRelevance;
	private Long itopRelevance;
	private Long gapPriority;
	// refTableId
	// refPkId
	
	// ---
	private Float expense;
	private Float probOccurence;
	private Float damage;
	private Float mitigationPotential;
	
	// Text
	private String expenseText;
	private String probOccurenceText;
	private String damageText;
	private String mitigationPotentialText;
	
	private String signee;
	private Long gapClassApproved;//String
	
	private Long riskAnalysisAsFreetext;
	private Long gapEndDateIncreased;
	private String currency;

	
	
	
	public Long getItsecMassnahmenStatusId() {
		return itsecMassnahmenStatusId;
	}

	public void setItsecMassnahmenStatusId(Long itsecMassnahmenStatusId) {
		this.itsecMassnahmenStatusId = itsecMassnahmenStatusId;
	}

	public Long getMassnahmeGstoolId() {
		return massnahmeGstoolId;
	}

	public void setMassnahmeGstoolId(Long massnahmeGstoolId) {
		this.massnahmeGstoolId = massnahmeGstoolId;
	}

	public Long getKatalogId() {
		return katalogId;
	}

	public void setKatalogId(Long katalogId) {
		this.katalogId = katalogId;
	}

	public Long getMassnahmeNr() {
		return massnahmeNr;
	}

	public void setMassnahmeNr(Long massnahmeNr) {
		this.massnahmeNr = massnahmeNr;
	}

	public String getMassnahmeTitel() {
		return massnahmeTitel;
	}

	public void setMassnahmeTitel(String massnahmeTitel) {
		this.massnahmeTitel = massnahmeTitel;
	}

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	public String getStatusKommentar() {
		return statusKommentar;
	}

	public void setStatusKommentar(String statusKommentar) {
		this.statusKommentar = statusKommentar;
	}

	public String getItsecGruppeTxt() {
		return itsecGruppeTxt;
	}

	public void setItsecGruppeTxt(String itsecGruppeTxt) {
		this.itsecGruppeTxt = itsecGruppeTxt;
	}

	public Long getTemplateException() {
		return templateException;
	}

	public void setTemplateException(Long templateException) {
		this.templateException = templateException;
	}

	public String getGap() {
		return gap;
	}

	public void setGap(String gap) {
		this.gap = gap;
	}

	public String getGapResponsible() {
		return gapResponsible;
	}

	public void setGapResponsible(String gapResponsible) {
		this.gapResponsible = gapResponsible;
	}

	public String getGapMeasure() {
		return gapMeasure;
	}

	public void setGapMeasure(String gapMeasure) {
		this.gapMeasure = gapMeasure;
	}

	public Long getGapEndDate() {//String
		return gapEndDate;
	}

	public void setGapEndDate(Long gapEndDate) {//String
		this.gapEndDate = gapEndDate;
	}

	public Long getSecuRelevance() {
		return secuRelevance;
	}

	public void setSecuRelevance(Long secuRelevance) {
		this.secuRelevance = secuRelevance;
	}

	public Long getAccsRelevance() {
		return accsRelevance;
	}

	public void setAccsRelevance(Long accsRelevance) {
		this.accsRelevance = accsRelevance;
	}

	public Long getItopRelevance() {
		return itopRelevance;
	}

	public void setItopRelevance(Long itopRelevance) {
		this.itopRelevance = itopRelevance;
	}

	public Long getGapPriority() {
		return gapPriority;
	}

	public void setGapPriority(Long gapPriority) {
		this.gapPriority = gapPriority;
	}

	public Float getExpense() {
		return expense;
	}

	public void setExpense(Float expense) {
		this.expense = expense;
	}

	public Float getProbOccurence() {
		return probOccurence;
	}

	public void setProbOccurence(Float probOccurence) {
		this.probOccurence = probOccurence;
	}

	public Float getDamage() {
		return damage;
	}

	public void setDamage(Float damage) {
		this.damage = damage;
	}

	public Float getMitigationPotential() {
		return mitigationPotential;
	}

	public void setMitigationPotential(Float mitigationPotential) {
		this.mitigationPotential = mitigationPotential;
	}

	public String getSignee() {
		return signee;
	}

	public void setSignee(String signee) {
		this.signee = signee;
	}

	public Long getGapClassApproved() {//String
		return gapClassApproved;
	}

	public void setGapClassApproved(Long gapClassApproved) {//String
		this.gapClassApproved = gapClassApproved;
	}

	public String getExpenseText() {
		return expenseText;
	}

	public void setExpenseText(String expenseText) {
		this.expenseText = expenseText;
	}

	public String getProbOccurenceText() {
		return probOccurenceText;
	}

	public void setProbOccurenceText(String probOccurenceText) {
		this.probOccurenceText = probOccurenceText;
	}

	public String getDamageText() {
		return damageText;
	}

	public void setDamageText(String damageText) {
		this.damageText = damageText;
	}

	public String getMitigationPotentialText() {
		return mitigationPotentialText;
	}

	public void setMitigationPotentialText(String mitigationPotentialText) {
		this.mitigationPotentialText = mitigationPotentialText;
	}

	public Long getRiskAnalysisAsFreetext() {
		return riskAnalysisAsFreetext;
	}

	public void setRiskAnalysisAsFreetext(Long riskAnalysisAsFreetext) {
		this.riskAnalysisAsFreetext = riskAnalysisAsFreetext;
	}

	public Long getGapEndDateIncreased() {
		return gapEndDateIncreased;
	}

	public void setGapEndDateIncreased(Long gapEndDateIncreased) {
		this.gapEndDateIncreased = gapEndDateIncreased;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public Long getZobId() {
		return zobId;
	}

	public void setZobId(Long zobId) {
		this.zobId = zobId;
	}

	public Long getTabelleId() {
		return tabelleId;
	}

	public void setTabelleId(Long tabelleId) {
		this.tabelleId = tabelleId;
	}

	public Long getTabellePkId() {
		return tabellePkId;
	}

	public void setTabellePkId(Long tabellePkId) {
		this.tabellePkId = tabellePkId;
	}

	public String getNoUpdateYN() {
		return noUpdateYN;
	}

	public void setNoUpdateYN(String noUpdateYN) {
		this.noUpdateYN = noUpdateYN;
	}

	public Long getRefTableID() {
		return refTableID;
	}

	public void setRefTableID(Long refTableID) {
		this.refTableID = refTableID;
	}

	public Long getRefPKID() {
		return refPKID;
	}

	public void setRefPKID(Long refPKID) {
		this.refPKID = refPKID;
	}
}

package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "STANDORT")
@NamedQueries({
	@NamedQuery(name="findSitesByLandId", query="FROM Standort s WHERE s.landId=:landId"),
	@NamedQuery(name="findByNameAndCountryId", query="FROM Standort s WHERE s.standortName=:name AND s.landId=:landId")
})
@SequenceGenerator(name = "MySeqStandort", sequenceName = "TBADM.SEQ_STANDORT")
public class Standort extends CiBase1 implements Serializable {
	private static final long serialVersionUID = -3547134682025456121L;
	
    private Set<Terrain> terrains;
    //PLANT_SAP, SITE_CATEGORY wie in SISec?
    private Long landId;
    
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqStandort")
	@Column(name = "STANDORT_ID")
	public Long getStandortId() {
		return getId();
	}
	public void setStandortId(Long terrainId) {
		setId(terrainId);
	}
	
	@Column(name = "STANDORT_NAME")
	public String getStandortName() {
		return getName();
	}
	public void setStandortName(String standortName) {
		setName(standortName);
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "standort")//EAGER
	public Set<Terrain> getTerrains() {
		return terrains;
	}
	public void setTerrains(Set<Terrain> terrains) {
		this.terrains = terrains;
	}
	
	@Column(name = "LAND_ID")
	public Long getLandId() {
		return landId;
	}
	public void setLandId(Long landId) {
		this.landId = landId;
	}
}
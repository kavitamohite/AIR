package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TERRAIN")
//@NamedQueries(
//	@NamedQuery(name="findTerrainsBySiteId", query="FROM Terrain t WHERE t.standortId=:standortId")
//)
@SequenceGenerator(name = "MySeqTerrain", sequenceName = "TBADM.SEQ_TERRAIN")
public class Terrain extends CiBase1 implements Serializable {
	private static final long serialVersionUID = -3547134682025456121L;
	
	private Long standortId;
	
    private Set<Building> buildings;
	private Standort standort;

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqTerrain")
	@Column(name = "TERRAIN_ID")
	public Long getTerrainId() {
		return getId();
	}
	public void setTerrainId(Long terrainId) {
		setId(terrainId);
	}

	
	@Column(name = "TERRAIN_NAME")
	public String getTerrainName() {
		return getName();
	}
	public void setTerrainName(String terrainName) {
		setName(terrainName);
	}

	@ManyToOne
	@JoinColumn(name="STANDORT_ID")
	public Standort getStandort() {
		return standort;
	}
	public void setStandort(Standort standort) {
		this.standort = standort;
	}
	@Column(name = "STANDORT_ID", insertable=false, updatable=false)
	public Long getStandortId() {
		return standortId;
	}
	public void setStandortId(Long standortId) {
		this.standortId = standortId;
	}
	
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "terrain")//EAGER
	public Set<Building> getBuildings() {
		return buildings;
	}
	public void setBuildings(Set<Building> buildings) {
		this.buildings = buildings;
	}
}
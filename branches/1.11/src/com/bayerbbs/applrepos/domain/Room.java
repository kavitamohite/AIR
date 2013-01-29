package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "RAUM")
public class Room extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -1270064907617489118L;
	
	private Long roomId;
	private String roomName;
	private String roomAlias;
	private String roomType;
	private String floor;
	private Long areaId;
	
	private String responsible;
	private String subResponsible;
	
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Room() {
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
		return getRoomId();
	}

	/**
	 * Returns the value of the field {@link #roomId}.
	 * 
	 * @return Value of the {@link #roomId} field.
	 */
	@Id
	@Column(name = "RAUM_ID")
	public Long getRoomId() {
		return roomId;
	}

	/**
	 * Sets the value of the {@link #roomId} field.
	 * 
	 * @param roomId
	 *            The value to set.
	 */
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}
	
	/**
	 * Returns the value of the field {@link #roomName}.
	 * 
	 * @return Value of the {@link #roomName} field.
	 */
	@Column(name = "RAUM_NAME")
	public String getRoomName() {
		return roomName;
	}

	/**
	 * Sets the value of the {@link #roomName} field.
	 * 
	 * @param roomName
	 *            The value to set.
	 */
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	@Column(name = "RAUMALIAS")
	public String getRoomAlias() {
		return roomAlias;
	}

	public void setRoomAlias(String roomAlias) {
		this.roomAlias = roomAlias;
	}

	@Column(name = "RAUM_TYP")
	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	@Column(name = "ETAGE")
	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	@Column(name = "RESPONSIBLE")
	public String getResponsible() {
		return responsible;
	}

	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}

	@Column(name = "SUB_RESPONSIBLE")
	public String getSubResponsible() {
		return subResponsible;
	}

	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}
	
	@Column(name = "AREA_ID")
	public Long getAreaId() {
		return areaId;
	}

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}
}

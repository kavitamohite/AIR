package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SCHRANK")
public class Schrank extends CiBase implements Serializable {
	private static final long serialVersionUID = -3547134682025456121L;
	
//	private Long roomId;
//	
//	private Room room;

	
	@Id
	@Column(name = "SCHRANK_ID")
	public Long getSchrankId() {
		return getId();
	}
	public void setSchrankId(Long schrankId) {
		setId(schrankId);
	}

	
	@Column(name = "SCHRANK_NAME")
	public String getSchrankName() {
		return getName();
	}
	public void setSchrankName(String schrankName) {
		setName(schrankName);
	}

	
//	@ManyToOne
//	@JoinColumn(name="RAUM_ID")
//	public Room getRoom() {
//		return room;
//	}
//	public void setRoom(Room room) {
//		this.room = room;
//	}
//	
//	
//	@Column(name = "RAUM_ID", insertable=false, updatable=false)
//	public Long getRoomId() {
//		return roomId;
//	}
//	public void setRoomId(Long roomId) {
//		this.roomId = roomId;
//	}
}
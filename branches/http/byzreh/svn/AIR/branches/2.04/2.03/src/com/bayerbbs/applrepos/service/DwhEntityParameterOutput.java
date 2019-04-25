package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.DwhEntityDTO;

public class DwhEntityParameterOutput {
	private DwhEntityDTO dwhEntities[] = null;
	private int total = 0;

	public DwhEntityDTO[] getDwhEntityDTO() {
		return dwhEntities;
	}

	public void setDwhEntityDTO(DwhEntityDTO[] dwhEntities) {
		this.dwhEntities = dwhEntities;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getTotal() {
		return total;
	}
	
}

package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;

public class KeyValueOutput {
	private KeyValueDTO keyValueDTO[] = null;

	public KeyValueDTO[] getKeyValueDTO() {
		return keyValueDTO;
	}

	public void setKeyValueDTO(KeyValueDTO[] keyValueDTO) {
		this.keyValueDTO = keyValueDTO;
	}	
}

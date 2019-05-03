package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class AccountDTO  implements Serializable {
	
	private Long accountId;
	private String accountName;
	
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public String getAccountName() {
		return accountName;
	}
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	
}

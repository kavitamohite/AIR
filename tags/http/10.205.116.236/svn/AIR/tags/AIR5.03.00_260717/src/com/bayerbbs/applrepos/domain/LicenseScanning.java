package com.bayerbbs.applrepos.domain;

public enum LicenseScanning {
	NO_EXECPTION(0,	"no exception from scanning"),
	OS_NOT_SUPPORTED(1, "OS not supported"),
	EMBEDDED_SYSTEM(2, "Embedded System, no scanner can be installed"),
	CUSTOMER_DECLINED(3, "Customer declined"),
	OEM_SOFTWARE_INSTALLED(4, "OEM Software installed, loss of warranty by scanner installation"),
	ACCESS_NOT_POSSIBLE(5, "Access to system not possible"),
	OTHER_METHOD_USED(6, "Other Scanning Method Used"),
	INTERNAL(7,	"Internal Lab / Test Systems");
	private final int id;
	private final String text;
	LicenseScanning(int id, String text)
	{
		this.id= id;
		this.text = text;
	}
	public int getId() {
		return id;
	}
	public String getText() {
		return text;
	}
}

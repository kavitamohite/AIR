package com.bayerbbs.applrepos.dto;

public class SpecialAttributeViewDataDTO {

	private Long id;
	private Long attributeId;
	private String attributeName;

	private Long toBeValueId;

	private Long asIsValueId;

	private String group;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAttributeId() {
		return attributeId;
	}

	public void setAttributeId(Long attributeId) {
		this.attributeId = attributeId;
	}

	public String getAttributeName() {
		return attributeName;
	}

	public void setAttributeName(String attributeName) {
		this.attributeName = attributeName;
	}

	public Long getToBeValueId() {
		return toBeValueId;
	}

	public void setToBeValueId(Long toBeValueId) {
		this.toBeValueId = toBeValueId;
	}

	public Long getAsIsValueId() {
		return asIsValueId;
	}

	public void setAsIsValueId(Long asIsValueId) {
		this.asIsValueId = asIsValueId;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((attributeId == null) ? 0 : attributeId.hashCode());
		result = prime * result
				+ ((attributeName == null) ? 0 : attributeName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SpecialAttributeViewDataDTO other = (SpecialAttributeViewDataDTO) obj;
		if (attributeId == null) {
			if (other.attributeId != null)
				return false;
		} else if (!attributeId.equals(other.attributeId))
			return false;
		if (attributeName == null) {
			if (other.attributeName != null)
				return false;
		} else if (!attributeName.equals(other.attributeName))
			return false;
		return true;
	}

}

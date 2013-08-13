
	package com.bayerbbs.applrepos.service;

	import java.io.Serializable;

import com.bayerbbs.applrepos.dto.ItSystemDTO;

	public class ItSystemParamOutput implements Serializable {
		private static final long serialVersionUID = 1262335938798520815L;
		
		private long countResultSet;
		private ItSystemDTO[] ItSystemDTO;
		private String informationText;
		
		public ItSystemParamOutput() {
		}
		
		public long getCountResultSet() {
			return countResultSet;
		}
		public String getInformationText() {
			return informationText;
		}

		public ItSystemDTO[] getItSystemDTO() {
			return ItSystemDTO;
		}

		public void setCountResultSet(long countResultSet) {
			this.countResultSet = countResultSet;
		}

		public void setInformationText(String informationText) {
			this.informationText = informationText;
		}

		public void setItSystemDTO(ItSystemDTO[] ItSystemDTO) {
			this.ItSystemDTO = ItSystemDTO;
		}

		public void setResult(String resultError) {
			// TODO Auto-generated method stub
			
		}

		public Object getMessages() {
			// TODO Auto-generated method stub
			return null;
		}

		public Object getDisplayMessage() {
			// TODO Auto-generated method stub
			return null;
		}
		
	}


	package com.bayerbbs.applrepos.service;

	import java.io.Serializable;

	import com.bayerbbs.applrepos.dto.*;

	public class ApplicationParamOutput implements Serializable {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1262335938798520815L;
		
		private long countResultSet;
		private ApplicationDTO[] applicationDTO;
		private String informationText;
		
		public ApplicationParamOutput() {
		}
		
		public long getCountResultSet() {
			return countResultSet;
		}
		public void setCountResultSet(long countResultSet) {
			this.countResultSet = countResultSet;
		}

		public ApplicationDTO[] getApplicationDTO() {
			return applicationDTO;
		}

		public void setApplicationDTO(ApplicationDTO[] applicationDTO) {
			this.applicationDTO = applicationDTO;
		}

		public String getInformationText() {
			return informationText;
		}

		public void setInformationText(String informationText) {
			this.informationText = informationText;
		}
		
	}

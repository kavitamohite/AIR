package com.bayerbbs.applrepos.hibernate;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.PersonOption;
import com.bayerbbs.applrepos.dto.PersonOptionDTO;

public class PersonOptionHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static PersonOptionDTO[] getArrayFromList(List<PersonOptionDTO> input) {
		PersonOptionDTO output[] = new PersonOptionDTO[input.size()];
		int i = 0;
		for (final PersonOptionDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<PersonOptionDTO> getDTOList(List<PersonOption> input) {
		ArrayList<PersonOptionDTO> listDTO = new ArrayList<PersonOptionDTO>();

		for (Iterator<PersonOption> iter = input.iterator(); iter.hasNext();) {
			PersonOption data = iter.next();
			PersonOptionDTO dto = new PersonOptionDTO();

			dto.setPersonOptionId(data.getPersonOptionId());
			dto.setInterfaceId(data.getInterfaceId());
			dto.setCWID(data.getCWID());
			dto.setName(data.getName());
			dto.setValue(data.getValue());
			
			dto.setInsertTimestamp(data.getInsertTimestamp());
			dto.setInsertQuelle(data.getInsertQuelle());
			dto.setInsertUser(data.getInsertUser());

			dto.setUpdateTimestamp(data.getUpdateTimestamp());
			dto.setUpdateQuelle(data.getUpdateQuelle());
			dto.setUpdateUser(data.getUpdateUser());

			dto.setDeleteTimestamp(data.getDeleteTimestamp());
			dto.setDeleteQuelle(data.getDeleteQuelle());
			dto.setDeleteUser(data.getDeleteUser());

			listDTO.add(dto);
		}
		return listDTO;
	}

	public static List<PersonOptionDTO> findPersonOptions(String cwid) {
		return findPersonOptions(cwid, true);
	}

	public static List<PersonOptionDTO> findPersonOptionsWithDeleted(String cwid) {
		return findPersonOptions(cwid, false);
	}

	@SuppressWarnings("unchecked")
	private static List<PersonOptionDTO> findPersonOptions(String cwid, boolean withoutDeleted) {

		List<PersonOptionDTO> listResult = new ArrayList<PersonOptionDTO>();

		// Long interfaceId = new Long(value);

		String interfaceAIRid = ApplReposHbn.getInterfaceIdFromApplication();

		StringBuffer sb = new StringBuffer();
		sb.append("select h from PersonOption as h");
		sb.append(" where h.interfaceId = ").append(interfaceAIRid);
		sb.append(" and h.CWID = '").append(cwid.toUpperCase()).append("'");
		if (withoutDeleted) {
			sb.append(" and h.deleteTimestamp is null");
		}

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			List<PersonOption> values = session.createQuery(sb.toString()).list();

			listResult = getDTOList(values);

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}

		return listResult;
	}

	public static boolean savePersonOption(String cwid,
			PersonOption personOption) {

		boolean result = false;

		cwid = cwid.toUpperCase();

		if (null != personOption) {
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();
			boolean toCommit = false;

			// Update data
			personOption.setUpdateUser(cwid);
			personOption.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			personOption.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());

			// Insert Quelle
			if (null == personOption.getId() || null == personOption.getInsertQuelle() || null != personOption.getDeleteTimestamp()) {
				// Insert data
				personOption.setInsertQuelle(personOption.getUpdateQuelle());
				personOption.setInsertUser(personOption.getUpdateUser());
				personOption.setInsertTimestamp(personOption
						.getUpdateTimestamp());
			}

			// Delete Data
			if (null != personOption.getDeleteTimestamp()) {
				personOption.setDeleteTimestamp(null);
				personOption.setDeleteQuelle(null);
				personOption.setDeleteUser(null);
			}
			
			try {
				session.saveOrUpdate(personOption);
				session.flush();
				toCommit = true;
				result = true;
			} catch (Exception e) {
				// handle exception
				System.out.println(e.toString());
				// output.setResult(ApplreposConstants.RESULT_ERROR);
				// output.setMessages(new String[] { e.getMessage() });
			} finally {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (toCommit) {
					if (null == hbnMessage) {
						// output
						// .setResult(ApplreposConstants.RESULT_OK);
						// output.setMessages(new String[] { "" });
					} else {
						// output
						// .setResult(ApplreposConstants.RESULT_ERROR);
						// output
						// .setMessages(new String[] { hbnMessage });
					}
				}
			}
		}

		return result;
	}

	public static boolean savePersonOptions(String cwid,
			List<PersonOptionDTO> listOptions, String key, String value) {
		boolean result = false;

		boolean isUpdate = false;

		String strInterfaceAIRid = ApplReposHbn.getInterfaceIdFromApplication();

		Long interfaceAirId = Long.parseLong(strInterfaceAIRid);

		if (null != listOptions && !listOptions.isEmpty()) {
			for (Iterator<PersonOptionDTO> iterator = listOptions.iterator(); iterator.hasNext();) {
				PersonOptionDTO personOptionDTO = (PersonOptionDTO) iterator
						.next();
				if (personOptionDTO.getName().equals(key)) {
					// found
					PersonOption option = new PersonOption();
					option.setInterfaceId(interfaceAirId);
					option.setPersonOptionId(personOptionDTO
							.getPersonOptionId());
					option.setCWID(personOptionDTO.getCWID());
					option.setName(personOptionDTO.getName());
					option.setValue(value);
					
					option.setInsertTimestamp(personOptionDTO.getInsertTimestamp());
					option.setInsertQuelle(personOptionDTO.getInsertQuelle());
					option.setInsertUser(personOptionDTO.getInsertUser());
					
					option.setUpdateTimestamp(personOptionDTO.getUpdateTimestamp());
					option.setUpdateQuelle(personOptionDTO.getUpdateQuelle());
					option.setUpdateUser(personOptionDTO.getUpdateUser());

					option.setDeleteTimestamp(personOptionDTO.getDeleteTimestamp());
					option.setDeleteQuelle(personOptionDTO.getDeleteQuelle());
					option.setDeleteUser(personOptionDTO.getDeleteUser());

					result = savePersonOption(cwid, option);
					isUpdate = true;
				}

			}
		}

		if (!isUpdate) {
			// create new
			PersonOption option = new PersonOption();
			option.setInterfaceId(interfaceAirId);
			option.setCWID(cwid.toUpperCase());
			option.setName(key);
			option.setValue(value);

			result = savePersonOption(cwid, option);

		}

		return result;
	}

	public static void saveLastLogon(String cwid) {
		List<PersonOptionDTO> listOptions = findPersonOptionsWithDeleted(cwid);
		savePersonOptions(cwid, listOptions, "LAST_LOGON", ApplReposTS
				.getCurrentTimestamp().toString());
	}

	public static void saveLastLogoff(String cwid) {
		List<PersonOptionDTO> listOptions = findPersonOptionsWithDeleted(cwid);
		savePersonOptions(cwid, listOptions, "LAST_LOGOFF", ApplReposTS
				.getCurrentTimestamp().toString());
	}

	@SuppressWarnings("unchecked")
	public static String findLastLogon(String cwid) {

		String lastLogon = null;

		List<PersonOptionDTO> listResult = new ArrayList<PersonOptionDTO>();

		// Long interfaceId = new Long(value);

		String interfaceAIRid = ApplReposHbn.getInterfaceIdFromApplication();

		StringBuffer sb = new StringBuffer();
		sb.append("select h from PersonOption as h");
		sb.append(" where h.interfaceId = ").append(interfaceAIRid);
		sb.append(" and h.CWID = '").append(cwid.toUpperCase()).append("'");
		sb.append(" and h.deleteTimestamp is null and h.name='").append(
				"LAST_LOGON").append("'");

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			List<PersonOption> values = session.createQuery(sb.toString())
					.list();

			listResult = getDTOList(values);

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}

		if (0 < listResult.size()) {
			lastLogon = listResult.get(0).getValue();

			Timestamp timestamp = Timestamp.valueOf(lastLogon);

			if (null != timestamp) {
				// String DATE_FORMAT = "dd-MM-yyyy HH:mm";
				String DATE_FORMAT = "yyyy-MM-dd HH:mm";
				SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
				lastLogon = sdf.format(timestamp);
			}

		}

		return lastLogon;
	}

}

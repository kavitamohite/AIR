package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.ItsecUserOption;
import com.bayerbbs.applrepos.dto.ItsecUserOptionDTO;

public class ItsecUserOptionHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ItsecUserOptionDTO[] getArrayFromList(
			List<ItsecUserOptionDTO> input) {
		ItsecUserOptionDTO output[] = new ItsecUserOptionDTO[input.size()];
		int i = 0;
		for (final ItsecUserOptionDTO data : input) {
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
	private static List<ItsecUserOptionDTO> getDTOList(
			List<ItsecUserOption> input) {
		ArrayList<ItsecUserOptionDTO> listDTO = new ArrayList<ItsecUserOptionDTO>();

		for (Iterator<ItsecUserOption> iter = input.iterator(); iter.hasNext();) {
			ItsecUserOption data = (ItsecUserOption) iter.next();
			ItsecUserOptionDTO dto = new ItsecUserOptionDTO();

			dto.setItsecUserOptionId(data.getItsecUserOptionId());
			dto.setItsecUserOptionInterfaceId(data
					.getItsecUserOptionInterfaceId());
			dto.setItsecUserOptionCWID(data.getItsecUserOptionCWID());
			dto.setItsecUserOptionName(data.getItsecUserOptionName());
			dto.setItsecUserOptionValue(data.getItsecUserOptionValue());

			listDTO.add(dto);
		}
		return listDTO;
	}

	@SuppressWarnings("unchecked")
	public static List<ItsecUserOptionDTO> findItSecUserOptions(String cwid) {

		List<ItsecUserOptionDTO> listResult = new ArrayList<ItsecUserOptionDTO>();

		// Long interfaceId = new Long(value);

		String interfaceAIRid = ApplReposHbn.getInterfaceIdFromApplication();
		
		StringBuffer sb = new StringBuffer();
		sb.append("select h from ItsecUserOption as h");
		sb.append(" where h.itsecUserOptionInterfaceId = ").append(
				interfaceAIRid);
		sb.append(" and h.itsecUserOptionCWID = '").append(cwid.toUpperCase())
				.append("'");

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			List<ItsecUserOption> values = session.createQuery(sb.toString())
					.list();

			listResult = getDTOList(values);

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}

		return listResult;
	}

	public static boolean saveUserOption(ItsecUserOption userOption) {

		boolean result = false;

		if (null != userOption) {
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();
			boolean toCommit = false;
			try {
				session.saveOrUpdate(userOption);
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

	
	public static boolean saveUserOptions(String cwid, List<ItsecUserOptionDTO> listOptions, String key, String value) {
		boolean result = false;
		
		boolean isUpdate = false;
		
		String strInterfaceAIRid = ApplReposHbn.getInterfaceIdFromApplication();
		
		Long interfaceAirId = Long.parseLong(strInterfaceAIRid);
		
		if (null != listOptions && !listOptions.isEmpty()) {
			for (Iterator iterator = listOptions.iterator(); iterator.hasNext();) {
				ItsecUserOptionDTO itsecUserOptionDTO = (ItsecUserOptionDTO) iterator
						.next();
				if (itsecUserOptionDTO.getItsecUserOptionName().equals(key)) {
					// found
					ItsecUserOption option = new ItsecUserOption();
					option.setItsecUserOptionInterfaceId(interfaceAirId);
					option.setItsecUserOptionId(itsecUserOptionDTO.getItsecUserOptionId());
					option.setItsecUserOptionCWID(itsecUserOptionDTO.getItsecUserOptionCWID());
					option.setItsecUserOptionName(itsecUserOptionDTO.getItsecUserOptionName());
					option.setItsecUserOptionValue(value);
					
					result = saveUserOption(option);
					isUpdate = true;
				}
				
			}
		}

		if (!isUpdate) {
			// create new
			ItsecUserOption option = new ItsecUserOption();
			option.setItsecUserOptionInterfaceId(interfaceAirId);
			option.setItsecUserOptionCWID(cwid.toUpperCase());
			option.setItsecUserOptionName(key);
			option.setItsecUserOptionValue(value);
			
			result = saveUserOption(option);
			
		}
		
		return result;
	}
}

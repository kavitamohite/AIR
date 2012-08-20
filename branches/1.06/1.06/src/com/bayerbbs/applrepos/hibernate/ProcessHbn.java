package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Process;
import com.bayerbbs.applrepos.dto.ProcessDTO;

public class ProcessHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<ProcessDTO> getDTOList(
			List<Process> input) {
		ArrayList<ProcessDTO> listDTO = new ArrayList<ProcessDTO>();

		for (Iterator<Process> iter = input.iterator(); iter.hasNext();) {
			Process data = (Process) iter.next();
			ProcessDTO dto = new ProcessDTO();

			dto.setProcessId(data.getProcessId());
			dto.setProcessName(data.getProcessName());
			dto.setProcessManager(data.getProcessManager());
			dto.setProcessOwner(data.getProcessOwner());

			listDTO.add(dto);
		}
		return listDTO;
	}

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ProcessDTO[] getArrayFromList(
			List<ProcessDTO> input) {
		ProcessDTO output[] = new ProcessDTO[input.size()];
		int i = 0;
		for (final ProcessDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	public static List<ProcessDTO> listProcessHbn() {

		List<ProcessDTO> listResult = new ArrayList<ProcessDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Process> values = session
					.createQuery(
							"select h from Process as h where h.deleteTimestamp is null order by h.processName")
					.list();

			listResult = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}

	
}

package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.dto.EditorGroupDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.KeyValueEnDTO;

public class EditorGroupHbn {
	private static final String SQL_EDITOR_GROUP = "select * From (Select g.group_name, NVL (Tools.Query2CSV ('SELECT pg.cwid ' || 'FROM groups g, person_groups pg, persons p ' || 'WHERE g.group_name = ''' || g.group_name || ''' ' || 'AND g.group_id = pg.group_id ' ||'AND p.del_timestamp IS NULL ' || 'AND pg.del_timestamp IS NULL ' || 'AND pg.cwid = p.cwid ' ||'AND p.pstat = ''PRIMARY CWID'' ' || 'ORDER BY 1'), g.group_name) members From (Select DISTINCT group_name From v_md_group WHERE NVL (company_code, '1251') = '1251' And insert_source In ('CWIDDB', 'BBSam', 'RFC')) g ORDER BY 1) WHERE 1 = 1";

	public static EditorGroupDTO[] getEditorGroupById() {
		List<EditorGroupDTO> data = new ArrayList<EditorGroupDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(SQL_EDITOR_GROUP);
			EditorGroupDTO  editorDTO=null;
			while(rs.next()){
				editorDTO=new EditorGroupDTO();
				editorDTO.setName(rs.getString(1));
				editorDTO.setMembers(rs.getString(2));
				System.out.println("rs next values "+rs);
				data.add(editorDTO);
			}
			//Query selectEditorQuery = session.createSQLQuery(SQL_EDITOR_GROUP);
			System.out.println("rs values "+rs.toString());
				
			tx.commit();
			rs.close();
			stmt.close();
			conn.close();
		} catch (Exception e) {
			System.out.println(e);
			if (tx != null && tx.isActive()) {
				try {
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				
			}

		}
		return data.toArray(new EditorGroupDTO[0]);

	}

}

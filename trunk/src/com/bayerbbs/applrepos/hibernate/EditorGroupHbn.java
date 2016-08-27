package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.bayerbbs.applrepos.dto.EditorGroupDTO;

public class EditorGroupHbn {
	private static final String SQL_EDITOR_GROUP = "select * From (Select g.group_name, NVL (Tools.Query2CSV ('SELECT pg.cwid ' || 'FROM groups g, person_groups pg, persons p ' || 'WHERE g.group_name = ''' || g.group_name || ''' ' || 'AND g.group_id = pg.group_id ' ||'AND p.del_timestamp IS NULL ' || 'AND pg.del_timestamp IS NULL ' || 'AND pg.cwid = p.cwid ' ||'AND p.pstat = ''PRIMARY CWID'' ' || 'ORDER BY 1'), g.group_name) members From (Select DISTINCT group_name From v_md_group WHERE NVL (company_code, '1251') = '1251' And insert_source In ('CWIDDB', 'BBSam', 'RFC')) g ORDER BY 1) WHERE 1 = 1";

	@SuppressWarnings("deprecation")
	public static EditorGroupDTO[] getEditorGroupById() {
		List<EditorGroupDTO> data = new ArrayList<EditorGroupDTO>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Connection conn = session.connection();
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(SQL_EDITOR_GROUP);
			while (rs.next()) {
				EditorGroupDTO editorDTO = new EditorGroupDTO();
				editorDTO.setName(rs.getString(1));
				editorDTO.setMembers(rs.getString(2));
				data.add(editorDTO);
			}
			rs.close();
			stmt.close();
			conn.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return data.toArray(new EditorGroupDTO[data.size()]);
	}

}

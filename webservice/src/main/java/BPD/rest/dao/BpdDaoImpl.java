package BPD.rest.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import BPD.rest.dao.model.User;

public class BpdDaoImpl implements BpdDao{
	private static final Logger logger = LoggerFactory.getLogger(BpdDaoImpl.class);
	private DataSource dataSource;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public void insertUser(User user) {
		// TODO Auto-generated method stub
		
	}

	public User getUser(int userId) {
		System.out.println("Getting user info");
//		String sql = "SELECT AU.FIRST_NAME, AU.LAST_NAME, "+ //UD.LAST_ACCESS_DATE," +
//					 "SL.SUBSCRIPTION_LOCATION, SL.SUBSCRIPTION_LOC_DESC " +
//					 "FROM APP_USERS AU" +
//					 "JOIN USER_DEVICES UD " +
//					 "ON (AU.USER_ID = UD.USER_ID) " +
//					 "JOIN SUBSCRIPTION_LOCATIONS SL " +
//					 "ON ((UD.PRIMARY_SUB_LOCATION_ID = SL.SUBSCRIPTION_LOCATION_ID) OR " +
//					 "(UD.SECONDARY_SUB_LOCATION_ID = SL.SUBSCRIPTION_LOCATION_ID)) " +
//					 "WHERE (AU.USER_ID = 1) " +
//					 "ORDER BY SL.SUBSCRIPTION_LOCATION_ID ASC;";
		String sql = "SELECT AU.FIRST_NAME, AU.LAST_NAME, UD.LAST_ACCESS_DATE, SL.SUBSCRIPTION_LOCATION, SL.SUBSCRIPTION_LOC_DESC FROM APP_USERS AU JOIN USER_DEVICES UD ON (AU.USER_ID = UD.USER_ID) JOIN SUBSCRIPTION_LOCATIONS SL ON ((UD.PRIMARY_SUB_LOCATION_ID = SL.SUBSCRIPTION_LOCATION_ID) OR (UD.SECONDARY_SUB_LOCATION_ID = SL.SUBSCRIPTION_LOCATION_ID)) WHERE (AU.USER_ID = ?) ORDER BY SL.SUBSCRIPTION_LOCATION_ID ASC";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, userId);
			User user = null;
			ResultSet rs = ps.executeQuery();
			ArrayList<String> subLocation = new ArrayList<String>();
			ArrayList<String> locationDesc = new ArrayList<String>();
			user = new User();
			while(rs.next()) {
			
				user.setFirst_name(rs.getString("FIRST_NAME"));
				user.setLast_name(rs.getString("LAST_NAME"));
				user.setLast_access_date(rs.getString("LAST_ACCESS_DATE"));
				subLocation.add(rs.getString("SUBSCRIPTION_LOCATION"));
				locationDesc.add(rs.getString("SUBSCRIPTION_LOC_DESC"));
				
			}
			user.setSubscription_loc_desc(locationDesc);
			user.setSubscription_location(locationDesc);
			rs.close();
			ps.close();
			return user;
		} catch (SQLException e) {
			System.out.println("SqlException getUser : " + e.getMessage());
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
	return new User();
	}
	public void updateUserDevices(int userId) {
		String sql = "UPDATE USER_DEVICES SET LAST_ACCESS_DATE = (SELECT SYSDATE FROM DUAL) WHERE (USER_DEVICES.USER_ID = ?)";
		System.out.println("updating user devices");
		Connection conn = null;

		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, userId);
			int update = ps.executeUpdate();
			ps.close();
			System.out.println("updating user devices");
		} catch (SQLException e) {
			System.out.println("Sql exception updateUserDevices : " + e.getMessage());

		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {System.out.println("exception : " + e.getMessage());}
			}
		}
		
		
	}

}

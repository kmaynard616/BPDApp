package BPD.rest.dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import BPD.rest.dao.model.BpdAppMessage;
import BPD.rest.dao.model.ReturnMessage;
import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;

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
		logger.debug("Getting user info");
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
		String sql = "SELECT AU.FIRST_NAME, AU.LAST_NAME, UD.SUBSCRIPTION_DATE, SL.SUBSCRIPTION_LOCATION, SL.SUBSCRIPTION_LOC_DESC FROM APP_USERS AU JOIN USER_DEVICES UD ON (AU.USER_ID = UD.USER_ID) JOIN SUBSCRIPTION_LOCATIONS SL ON ((UD.PRIMARY_SUB_LOCATION_ID = SL.SUBSCRIPTION_LOCATION_ID) OR (UD.SECONDARY_SUB_LOCATION_ID = SL.SUBSCRIPTION_LOCATION_ID)) WHERE (AU.USER_ID = ?) ORDER BY SL.SUBSCRIPTION_LOCATION_ID ASC";
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
				user.setLast_access_date(rs.getString("SUBSCRIPTION_DATE"));
				subLocation.add(rs.getString("SUBSCRIPTION_LOCATION"));
				locationDesc.add(rs.getString("SUBSCRIPTION_LOC_DESC"));
				
			}
			user.setSubscription_loc_desc(locationDesc);
			user.setSubscription_location(locationDesc);
			rs.close();
			ps.close();
			return user;
		} catch (SQLException e) {
			logger.debug("SqlException getUser : " + e.getMessage());
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
	
	public void updateUserDevices(UserSelection selections) {
		//String sql = "UPDATE USER_DEVICES SET LAST_ACCESS_DATE = (SELECT SYSDATE FROM DUAL), PRIMARY_SUB_LOCATION_ID = ?, SECONDARY_SUB_LOCATION_ID = ? WHERE (USER_DEVICES.USER_ID = ?)";
		String sql = "UPDATE USER_DEVICES SET SUBSCRIPTION_DATE = (SELECT SYSDATE FROM DUAL), PRIMARY_SUB_LOCATION_ID = ?, SECONDARY_SUB_LOCATION_ID = ? WHERE (USER_DEVICES.USER_ID = ?)";
		
		logger.debug("updating user devices");
		Connection conn = null;

		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, selections.getPrimaryLocationId());
			ps.setInt(2, selections.getSecondaryLocationId());
			ps.setInt(3, selections.getUserId());
			int update = ps.executeUpdate();
			ps.close();
			logger.debug("updating user devices for user " + selections.getUserId());
			logger.debug("updateing primary location " + selections.getPrimaryLocationId());
			logger.debug("updateing seondary location " + selections.getSecondaryLocationId());
		} catch (SQLException e) {
			logger.debug("Sql exception updateUserDevices : " + e.getMessage());

		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {logger.debug("exception : " + e.getMessage());}
			}
		}
	}
	
	public void uploadAttatchment(InputStream uploadedInputStream) {
		
		logger.debug("upload Attatchment");
		Connection conn = null;
		
		try{ 
			conn = dataSource.getConnection();
			PreparedStatement pstmt = conn.prepareStatement("insert into ATTACHMENTS (CREATOR_ID, BLOB_TYPE_ID, DATE_CREATED, BLOB) values (?, ?, ?, ?)");
			
			Date utilDate = new Date();
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
			
			pstmt.setInt(1, 1);
			pstmt.setInt(2, 2);
			pstmt.setDate(3, sqlDate);
			pstmt.setBinaryStream(4, uploadedInputStream);
			pstmt.executeUpdate();
			conn.commit();
		
		} catch (SQLException e) {
			logger.debug("Sql exception uploading attatchment : " + e.getMessage());

		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					logger.debug("exception : " + e.getMessage());}
			}
		}

	}
	public void uploadMessage(BpdAppMessage message) {
		String sql = "insert into BPD_APP_MESSAGES (MESSAGE_TYPE_ID, MESSAGE, CREATED_BY, DEVICE_ID, DATE_CREATED, SUBSCRIPTION_LOC_ID, ADDRESS_ID) values (?, ?, ?, ?, ?, ?, ?)";
		
		logger.debug("upload message");
		Connection conn = null;

		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, message.getTypeId());
			ps.setString(2, message.getMessage());
			ps.setInt(3, message.getCreatedBy());
			ps.setInt(4,message.getDeviceId());
			Date utilDate = new Date();
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
			ps.setDate(5,sqlDate);
			ps.setInt(6,message.getSubLocId());
			ps.setInt(7, message.getAddressId());
			int update = ps.executeUpdate();
			ps.close();
			
		} catch (SQLException e) {
			logger.debug("Sql exception upload message : " + e.getMessage());

		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					logger.debug("exception : " + e.getMessage());}
			}
		}
		
	}
	public ArrayList<ReturnMessage> getUserMessages(int userId) {
		// TODO Auto-generated method stub
		String sql = "SELECT MESSAGE, CREATED_BY, DATE_CREATED from BPD_APP_MESSAGES WHERE SUBSCRIPTION_LOC_ID in(?,?)";
		String subSql = "SELECT PRIMARY_SUB_LOCATION_ID, SECONDARY_SUB_LOCATION_ID from USER_DEVICES where USER_ID = ?";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps1 = conn.prepareStatement(subSql);
			ps1.setInt(1, userId);
			
			ResultSet rs = ps1.executeQuery();
			int primaryId = 0;
			int secondaryId = 0;

			while(rs.next()) {
				primaryId = rs.getInt("PRIMARY_SUB_LOCATION_ID");
				secondaryId = rs.getInt("SECONDARY_SUB_LOCATION_ID");
				
			}
			rs.close();
			ps1.close();
			
			PreparedStatement ps2 = conn.prepareStatement(sql);
			ps2.setInt(1, primaryId);
			ps2.setInt(2, secondaryId);
			
			ResultSet rs2 = ps2.executeQuery();
			ArrayList<ReturnMessage> returnList = new ArrayList<ReturnMessage>();
			while(rs2.next()) {
				ReturnMessage rm = new ReturnMessage(rs2.getInt("CREATED_BY"), rs2.getString("Message"), rs2.getDate("DATE_CREATED"));
				returnList.add(rm);
				
			}
			rs2.close();
			ps2.close();
			
			return returnList;
		} catch (SQLException e) {
			logger.debug("SqlException getUser : " + e.getMessage());
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		return new ArrayList<ReturnMessage>();
	}

}

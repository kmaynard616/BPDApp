package BPD.rest.dao;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.sql.DataSource;





import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

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
	
	public void uploadAttatchment(InputStream uploadedInputStream, String messageId) {

		logger.debug("upload Attatchment for messageId " + messageId);
		Connection conn = null;

		try {
			conn = dataSource.getConnection();
			PreparedStatement pstmt = conn
					.prepareStatement(
							"insert into ATTACHMENTS (CREATOR_ID, BLOB_TYPE_ID, DATE_CREATED, BLOB) values (?, ?, ?, ?)",
							new String[] { "attachment_id" });

			String attachmentId = null;

			Date utilDate = new Date();
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

			pstmt.setInt(1, 1);
			pstmt.setInt(2, 2);
			pstmt.setDate(3, sqlDate);
			pstmt.setBinaryStream(4, uploadedInputStream);
			// execute the insert statement, if success get the primary key
			// value
			if (pstmt.executeUpdate() > 0) {

				ResultSet generatedKeys = pstmt.getGeneratedKeys();

				if (null != generatedKeys && generatedKeys.next()) {

					attachmentId = String.valueOf(generatedKeys.getLong(1));
				}
				generatedKeys.close();
			}
			pstmt.close();
			PreparedStatement ps = conn.prepareStatement("insert into MSG_ATTACHMENTS (MESSAGE_ID, ATTACHMENT_ID) values (?, ?)");
			ps.setInt(1, Integer.valueOf(messageId));
			ps.setInt(2, Integer.valueOf(attachmentId));
			int update = ps.executeUpdate();
			ps.close();
			
			
			conn.commit();

		} catch (SQLException e) {
			logger.debug("Sql exception uploading attatchment : "
					+ e.getMessage());

		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					logger.debug("exception : " + e.getMessage());
				}
			}
		}

	}
	public String uploadMessage(BpdAppMessage message) {
		String sql = "insert into BPD_APP_MESSAGES (MESSAGE_TYPE_ID, MESSAGE, CREATED_BY, DEVICE_ID, DATE_CREATED, SUBSCRIPTION_LOC_ID, ADDRESS_ID) values (?, ?, ?, ?, ?, ?, ?)";
		
		logger.debug("upload message");
		Connection conn = null;
		String messageId = null;

		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql, new String[] { "message_id" });
			ps.setInt(1, message.getTypeId());
			ps.setString(2, message.getMessage());
			ps.setInt(3, message.getCreatedBy());
			ps.setInt(4,message.getDeviceId());
			Date utilDate = new Date();
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
			ps.setDate(5,sqlDate);
			ps.setInt(6,message.getSubLocId());
			ps.setInt(7, message.getAddressId());
			
			if (ps.executeUpdate() > 0) {

				ResultSet generatedKeys = ps.getGeneratedKeys();

				if (null != generatedKeys && generatedKeys.next()) {

					messageId = String.valueOf(generatedKeys.getLong(1));
				}
				generatedKeys.close();
			}
			ps.close();
			
		} catch (SQLException e) {
			logger.debug("Sql exception upload message : " + e.getMessage());

		} finally {
			if (conn != null) {
				try {
					conn.close();
					return messageId;
				} catch (SQLException e) {
					logger.debug("exception : " + e.getMessage());}
			}
			
		}
		return messageId;
		
	}
	public ArrayList<ReturnMessage> getUserMessages(int userId) {
		// TODO Auto-generated method stub
		//String sql = "SELECT MESSAGE, CREATED_BY, DATE_CREATED from BPD_APP_MESSAGES WHERE SUBSCRIPTION_LOC_ID in(?,?)";
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT BPD.MESSAGE_ID, MAV.ATTACHMENT_ID, BPD.MESSAGE_TYPE_ID, M.MESSAGE_TYPE_DESC, BPD.MESSAGE, U.USER_ID, U.BPD_USER_ID, U.LAST_NAME, U.FIRST_NAME, D.DEVICE_ID, D.DEVICE_NAME, ");
		sb.append("BPD.DATE_CREATED, TO_CHAR(BPD.DATE_CREATED, 'HH24:MI:SS') AS TIME_MESSAGE_CREATED, ");
		sb.append("BPD.SUBSCRIPTION_LOC_ID AS MESSAGE_LOCATION_ID, SL.SUBSCRIPTION_LOC_DESC AS MESSAGE_LOCATION, ");
		sb.append("BPD.SECONDARY_LOC_ID AS SECONDARY_LOCATION_ID, ");
		sb.append("(SELECT SUBSCRIPTION_LOC_DESC FROM SUBSCRIPTION_LOCATIONS WHERE SUBSCRIPTION_LOCATION_ID = BPD.SECONDARY_LOC_ID) AS SEC_MESSAGE_LOCATION ");
		sb.append("FROM BPD_APP_MESSAGES BPD ");
		sb.append("INNER JOIN APP_USERS U ");
		sb.append("ON BPD.CREATED_BY = U.USER_ID ");
		sb.append("INNER JOIN DEVICES D ");
		sb.append("ON BPD.DEVICE_ID = D.DEVICE_ID ");
		sb.append("INNER JOIN SUBSCRIPTION_LOCATIONS SL ");
		sb.append("ON SL.SUBSCRIPTION_LOCATION_ID = BPD.SUBSCRIPTION_LOC_ID ");
		sb.append("INNER JOIN MESSAGE_TYPES M ");
		sb.append("ON BPD.MESSAGE_TYPE_ID = M.MESSAGE_TYPE_ID ");
		sb.append("LEFT JOIN MSG_ATTACHMENTS_VIEW MAV ");
		sb.append("ON BPD.MESSAGE_ID = MAV.MESSAGE_ID ");
		sb.append("WHERE BPD.SUBSCRIPTION_LOC_ID in(?,?) ");
		sb.append("ORDER BY BPD.DATE_CREATED");
		String sql = sb.toString();
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
			logger.debug("GetMessages primaryId " + primaryId + ", secondaryID " + secondaryId);
			logger.debug("GetMessages SQL " + sql);
			PreparedStatement ps2 = conn.prepareStatement(sql);
			ps2.setInt(1, primaryId);
			ps2.setInt(2, secondaryId);
			
			ResultSet rs2 = ps2.executeQuery();
			ArrayList<ReturnMessage> returnList = new ArrayList<ReturnMessage>();
			while(rs2.next()) {
				ReturnMessage rm = new ReturnMessage(rs2.getInt("USER_ID"), rs2.getString("Message"), rs2.getDate("DATE_CREATED"), 
						rs2.getString("LAST_NAME"), rs2.getString("FIRST_NAME"), rs2.getString("TIME_MESSAGE_CREATED"), rs2.getString("MESSAGE_TYPE_ID"));
				rm.setAttatchmentId(rs2.getInt("ATTACHMENT_ID"));
				returnList.add(rm);
				
			}
			rs2.close();
			ps2.close();
			
			return returnList;
		} catch (SQLException e) {
			logger.debug("SqlException getMessages : " + e.getMessage());
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
	
	public Response getAttachment(int id) throws SQLException {     
		Response response = null;
	    Connection conn = null;
	    PreparedStatement ps = null;
	    
	    String sql ="select attachment_id, blob, blob_type, date_created, file_name from msg_attachments_view where attachment_id = ?" ;
	    
	    logger.info("Inside getattatcment...");
	    logger.info("ID: " + id);

	    try {
			conn = dataSource.getConnection();
			ps = conn.prepareStatement(sql);
	          
		    ps.setInt(1, id);
		    ResultSet result = ps.executeQuery();
		    if (result.next()) {
		     
		        String date_created = result.getDate("date_created").toString();
		        String blobType = result.getString("blob_type");
		       
		        logger.info("filename: " + date_created);
		        
		        final InputStream in = result.getBinaryStream("blob");
		        
		        ByteArrayOutputStream out = new ByteArrayOutputStream();
		        int data = in.read();
		        while (data >= 0) {
		          out.write((char) data);
		          data = in.read();
		        }
		        out.flush();
		          
		        ResponseBuilder builder = Response.ok(out.toByteArray());
		        builder.header("Content-Disposition", "attachment; blobType=" + blobType);
		        response = builder.build();
		      } else {
		        logger.info("Unable to find record with ID: " + id);
		        response = Response.status(404).
		                entity("Unable to find record with ID: " + id).
		                type("text/plain").
		                build();
		      }
		      
		    } catch (SQLException e) {
		      logger.error(String.format("Inside downloadFilebyID==> Unable to get file with ID: %s", 
		          id));
		      
		      response = Response.status(404).
		              entity(" Unable to get file with ID: " + id).
		              type("text/plain").
		              build();
		      e.printStackTrace();
		    } catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
		      try {
		        ps.close();
		      } catch (SQLException e) {
		        e.printStackTrace();
		      }
		      conn.close();
		    }
		    
		    return response;
	  }
}

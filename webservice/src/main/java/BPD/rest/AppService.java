package BPD.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

import BPD.rest.dao.BpdDao;
import BPD.rest.dao.model.BpdAppMessage;
import BPD.rest.dao.model.ReturnMessage;
import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;

@Path("/bpd")
public class AppService {
	private static final Logger logger = LoggerFactory.getLogger(AppService.class);
	ApplicationContext context =
    		new ClassPathXmlApplicationContext("dao-context.xml");

    BpdDao bpdDAO = (BpdDao) context.getBean("bpdDAO");
    private static final String SERVER_UPLOAD_LOCATION_FOLDER = "C://Users/nikos/Desktop/Upload_Files/";
    
	
	@GET
	@Path("/getUserInfo/{user}")
	public Response getUserInfo(@PathParam("user") int user){
		User output = bpdDAO.getUser(user);
		
		JSONObject jo = new JSONObject();
		jo.put("firstName", output.getFirst_name());
		jo.put("lastName", output.getLast_name());
		jo.put("lastAccess", output.getLast_access_date());
		JSONArray subLocArray = new JSONArray(output.getSubscription_location());
		JSONArray locDescArray = new JSONArray(output.getSubscription_loc_desc());
		jo.put("subscriptionLocation", subLocArray);
		jo.put("locDesc", locDescArray);
		
		return Response.status(200).entity(jo.toString()).build();
				
	}
	/*
	 * http://localhost:8080/webservice/v1/bpd/getMessages/1
	 */
	@GET
	@Path("/getMessages/{user}")
	public Response getUserMessages(@PathParam("user") int user){
		ArrayList<ReturnMessage> output = bpdDAO.getUserMessages(user);
		JSONArray ja = new JSONArray();
		for (ReturnMessage msg : output){
			JSONObject jo = new JSONObject();
			jo.put("createdBy",msg.getCreatedBy());
			jo.put("message", msg.getMessage());
			jo.put("dateCreated", msg.getDateCreated());
			jo.put("attatchmentId", msg.getAttatchmentId());
			ja.put(jo);
		}
		
		
		return Response.status(200).entity(ja.toString()).build();
				
	}
	
	@POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
	@Path("/updateUserSettings")
	public Response updateUserSettings(UserSelection userSelection){
		String output = "userSettings updated for user id : " + userSelection.getUserId();
		bpdDAO.updateUserDevices(userSelection);
		
		return Response.status(200).entity(output).build();
				
	}
	/**
	 * submit a message
	 * {"typeId":"1", "message":"This is test1", "createdBy":"1", "deviceId":"1", "subLocId":"1", "addressId":"1"}
	 * @param message
	 * @return
	 */
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
	@Path("/submitMessage")
	public Response submitMessage(BpdAppMessage message){
		 String output = bpdDAO.uploadMessage(message);
		return Response.status(200).entity(output).build();
				
	}

	/**
	 * Upload a File
	 * http://localhost:8080/webservice/
	 */

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response uploadFile(
		@FormDataParam("file") InputStream uploadedInputStream,
		@FormDataParam("file") FormDataContentDisposition fileDetail,
		@FormDataParam("messageId") String  messageId) {
		logger.debug("upmessageId upload attatchment for messageId " + messageId);
		bpdDAO.uploadAttatchment(uploadedInputStream, messageId);
		
		String output = "File uploaded saved to db";

		return Response.status(200).entity(output).build();

	}
	
	/**
	 * get Attatchments
	 * @throws SQLException 
	 */
	@GET
	@Path("/download/attatchemet/{id}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachmentByID(@PathParam("id")  int msgId) throws IOException, SQLException {
	  
	  Response response = bpdDAO.getAttatchment(msgId);
	  return response;
	} 
	
}

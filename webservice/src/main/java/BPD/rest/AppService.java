package BPD.rest;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import BPD.rest.dao.BpdDao;
import BPD.rest.dao.model.User;

@Path("/bpd")
public class AppService {
	private static final Logger logger = LoggerFactory.getLogger(AppService.class);
	ApplicationContext context =
    		new ClassPathXmlApplicationContext("dao-context.xml");

    BpdDao bpdDAO = (BpdDao) context.getBean("bpdDAO");
    
	
	@GET
	@Path("/getUserInfo/{user}")
	public Response getUserInfo(@PathParam("user") int user){
		User output = bpdDAO.getUser(user);
		
		JSONObject jo = new JSONObject();
		jo.put("firstName", output.getFirst_name());
		jo.put("lastName", output.getLast_name());
		JSONArray subLocArray = new JSONArray(output.getSubscription_location());
		JSONArray locDescArray = new JSONArray(output.getSubscription_loc_desc());
		jo.put("subscriptionLocation", subLocArray);
		jo.put("locDesc", locDescArray);
		
		return Response.status(200).entity(jo.toString()).build();
				
	}
	@POST
	@Path("/updateUserSettings/{userId}")
	public Response updateUserSettings(@PathParam("userId") int userId){
		System.out.println("XXXXXXX");
		String output = "userSettings updated for user id : " + userId;
		bpdDAO.updateUserDevices(userId);
		System.out.println("XXXXXXX2");
		
		return Response.status(200).entity(output).build();
				
	}
	
	@POST
	@Path("/submitMessage")
	public Response submitUser(String data){
		String output = "Post data is " + data;
		return Response.status(200).entity(output).build();
				
	}
}

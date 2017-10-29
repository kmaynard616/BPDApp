package BPD.rest;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/bpd")
public class AppService {
	@GET
	@Path("/getUserSettings/{user}")
	public Response getUserSettings(@PathParam("user") String user){
		String output = "get user settings for user  " + user;
		return Response.status(200).entity(output).build();
				
	}
	@POST
	@Path("/updateUserSettings")
	public Response updateUserSettings(String data){
		String output = "Post data is " + data;
		return Response.status(200).entity(output).build();
				
	}
	
	@POST
	@Path("/submitMessage")
	public Response submitUser(String data){
		String output = "Post data is " + data;
		return Response.status(200).entity(output).build();
				
	}
}

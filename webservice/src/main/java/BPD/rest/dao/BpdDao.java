package BPD.rest.dao;

import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.core.Response;

import BPD.rest.dao.model.BpdAppMessage;
import BPD.rest.dao.model.ReturnMessage;
import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;

public interface BpdDao {
	
	public void insertUser(User user);
	public User getUser(int userId);
	public void updateUserDevices(UserSelection selection);
	public void uploadAttatchment(InputStream uploadedInputStream, String messageId);
	public String uploadMessage(BpdAppMessage message);
	public ArrayList<ReturnMessage> getUserMessages(int user);
	public Response getAttatchment(int id) throws SQLException;
}

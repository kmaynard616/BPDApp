package BPD.rest.dao;

import java.io.InputStream;
import java.util.ArrayList;

import BPD.rest.dao.model.BpdAppMessage;
import BPD.rest.dao.model.ReturnMessage;
import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;

public interface BpdDao {
	
	public void insertUser(User user);
	public User getUser(int userId);
	public void updateUserDevices(UserSelection selection);
	public void uploadAttatchment(InputStream uploadedInputStream);
	public void uploadMessage(BpdAppMessage message);
	public ArrayList<ReturnMessage> getUserMessages(int user);
}

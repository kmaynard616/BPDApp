package BPD.rest.dao;

import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;

public interface BpdDao {
	
	public void insertUser(User user);
	public User getUser(int userId);
	public void updateUserDevices(UserSelection selection);

}

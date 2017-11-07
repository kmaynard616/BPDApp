package BPD.rest.dao.model;

import java.util.ArrayList;

public class User {

	public String first_name;
	public String last_name;
	public String last_access_date;
	public ArrayList<String> subscription_location;
	public ArrayList<String> subscription_loc_desc;
	
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getLast_access_date() {
		return last_access_date;
	}
	public void setLast_access_date(String last_access_date) {
		this.last_access_date = last_access_date;
	}
	public ArrayList<String> getSubscription_location() {
		return subscription_location;
	}
	public void setSubscription_location(ArrayList<String> subscription_location) {
		this.subscription_location = subscription_location;
	}
	public ArrayList<String> getSubscription_loc_desc() {
		return subscription_loc_desc;
	}
	public void setSubscription_loc_desc(ArrayList<String> subscription_loc_desc) {
		this.subscription_loc_desc = subscription_loc_desc;
	}
	
}

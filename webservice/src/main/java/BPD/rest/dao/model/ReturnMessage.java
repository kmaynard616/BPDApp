package BPD.rest.dao.model;

import java.sql.Date;

public class ReturnMessage {
	
	String message;
	int createdBy;
	Date dateCreated;
	public ReturnMessage(){
		
	}
	public ReturnMessage(int createdBy, String message, Date dateCreated){
		this.message = message;
		this.createdBy = createdBy;
		this.dateCreated = dateCreated;
		
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public Date getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
	
	
}

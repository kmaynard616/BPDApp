package BPD.rest.dao.model;

import java.sql.Date;

public class ReturnMessage {
	
	String message;
	int createdBy;
	Date dateCreated;
	int attatchmentId;
	String lastName;
	String firstName;
	String timeCreated;
	String messageType;
	
	public ReturnMessage(){
		
	}
	public ReturnMessage(int createdBy, String message, Date dateCreated, 
			String lastName, String firstName,
			String timeCreated, String messageType){
		this.message = message;
		this.createdBy = createdBy;
		this.dateCreated = dateCreated;
		this.lastName = lastName;
		this.firstName = firstName;
		this.timeCreated = timeCreated;
		this.messageType = messageType;
		
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
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public int getAttatchmentId() {
		return attatchmentId;
	}
	public void setAttatchmentId(int attatchmentId) {
		this.attatchmentId = attatchmentId;
	}	
	
	public String getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(String timeCreated) {
		this.timeCreated = timeCreated;
	}

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}	
}

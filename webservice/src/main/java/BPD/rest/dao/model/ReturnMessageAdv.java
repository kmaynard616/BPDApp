package BPD.rest.dao.model;

import java.sql.Date;

public class ReturnMessageAdv {
	String message;
	int createdBy;
	int  userId;
	String lastName;
	String firstName;
	String messageLocation;
	String secondaryLocation;
	Date dateCreated;
	String timeCreated;
	String messageType;
	int attatchmentId;
	
	public ReturnMessageAdv(){
		
	}

	public ReturnMessageAdv(int createdBy, String message, Date dateCreated,
			int userId, String lastName, String firstName,
			String messageLocation, String secondaryLocation,
			String timeCreated, String messageType) {
		this.message = message;
		this.createdBy = createdBy;
		this.dateCreated = dateCreated;
		this.userId = userId;
		this.lastName = lastName;
		this.firstName = firstName;
		this.messageLocation = messageLocation;
		this.secondaryLocation = secondaryLocation;
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
	public int getAttatchmentId() {
		return attatchmentId;
	}
	public void setAttatchmentId(int attatchmentId) {
		this.attatchmentId = attatchmentId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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

	public String getMessageLocation() {
		return messageLocation;
	}

	public void setMessageLocation(String messageLocation) {
		this.messageLocation = messageLocation;
	}

	public String getSecondaryLocation() {
		return secondaryLocation;
	}

	public void setSecondaryLocation(String secondaryLocation) {
		this.secondaryLocation = secondaryLocation;
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

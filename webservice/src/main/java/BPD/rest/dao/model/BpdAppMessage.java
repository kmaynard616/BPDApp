package BPD.rest.dao.model;

import java.sql.Date;


public class BpdAppMessage {
	int typeId;
	String message;
	int createdBy;
	int deviceId;
	int subLocId;
	int addressId;
	
	public BpdAppMessage(){
		
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
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

	public int getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(int deviceId) {
		this.deviceId = deviceId;
	}

	public int getSubLocId() {
		return subLocId;
	}

	public void setSubLocId(int subLocId) {
		this.subLocId = subLocId;
	}

	public int getAddressId() {
		return addressId;
	}

	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}
	
	
}

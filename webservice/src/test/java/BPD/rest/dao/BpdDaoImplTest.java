package BPD.rest.dao;

import BPD.rest.dao.model.BpdAppMessage;
import BPD.rest.dao.model.ReturnMessage;
import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;
import static org.junit.Assert.*;
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.sql.DataSource;
import javax.ws.rs.core.Response;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;



import static org.junit.Assert.assertNotNull;

@RunWith(MockitoJUnitRunner.class)
public class BpdDaoImplTest {
    @Mock
    private DataSource dataSource;
    @Mock
    private Connection connection;
    @Mock
    private PreparedStatement stmt;
    @Mock
    private ResultSet resultSet;

    private User user;

    @Before
    public void setUp() throws Exception {
        assertNotNull(dataSource);
        System.out.println(dataSource);
        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.prepareStatement(any(String.class))).thenReturn(stmt);
        when(connection.prepareStatement(any(String.class), Mockito.any(String[].class))).thenReturn(stmt);
        when(stmt.getGeneratedKeys()).thenReturn(resultSet);

        user = new User();
        user.setFirst_name("John");
        user.setLast_access_date("2017-11-02");
        user.setLast_name("Doe");
        ArrayList<String> locations = new ArrayList<String>();
        locations.add("Location 1");
        user.setSubscription_location(locations);
        ArrayList<String> locationDescs = new ArrayList<String>();
        locationDescs.add("Location 1 Desc");
        user.setSubscription_loc_desc(locationDescs);
/*
				user.setFirst_name(rs.getString("FIRST_NAME"));
				user.setLast_name(rs.getString("LAST_NAME"));
				//user.setLast_access_date(rs.getString("LAST_ACCESS_DATE"));
				subLocation.add(rs.getString("SUBSCRIPTION_LOCATION"));
				locationDesc.add(rs.getString("SUBSCRIPTION_LOC_DESC"));
 */
        when(resultSet.next()).thenReturn(true).thenReturn(false);
        when(resultSet.getString("FIRST_NAME")).thenReturn(user.getFirst_name());
        when(resultSet.getString("LAST_NAME")).thenReturn(user.getLast_name());
        when(resultSet.getString("SUBSCRIPTION_DATE")).thenReturn(user.getLast_access_date());
        when(resultSet.getString("SUBSCRIPTION_LOCATION")).thenReturn("Location 1");
        when(resultSet.getString("SUBSCRIPTION_LOC_DESC")).thenReturn("Location 1 Desc");
        when(stmt.executeQuery()).thenReturn(resultSet);
        when(stmt.executeUpdate()).thenReturn(1);
        when(resultSet.getInt("PRIMARY_SUB_LOCATION_ID")).thenReturn(1);
        when(resultSet.getInt("SECONDARY_SUB_LOCATION_ID")).thenReturn(1);
        when(resultSet.getInt("USER_ID")).thenReturn(1);
        when(resultSet.getString("Message")).thenReturn("Hi There");
        when(resultSet.getDate("DATE_CREATED")).thenReturn(new Date(System.currentTimeMillis()));
        when(resultSet.getString("TIME_MESSAGE_CREATED")).thenReturn("2017-11-19");
        when(resultSet.getString("MESSAGE_TYPE_ID")).thenReturn("Intelligence");
        when(resultSet.getInt("ATTACHMENT_ID")).thenReturn(1);
        when(resultSet.getString("blob_type")).thenReturn("image");
        Class clazz = BpdDaoImplTest.class;
        InputStream inputStream = clazz.getResourceAsStream("/test.png");
        when(resultSet.getBinaryStream("blob")).thenReturn(inputStream);
        when(resultSet.getDate("date_created")).thenReturn(new Date(System.currentTimeMillis()));
    }

    @Test
    public void getUser() throws Exception {
        BpdDaoImpl bpdDao = new BpdDaoImpl();
        bpdDao.setDataSource(dataSource);
        User actual = bpdDao.getUser(1);
        assert(user.getFirst_name().equals(actual.getFirst_name()));
        assert(user.getLast_name().equals(actual.getLast_name()));
        assert(user.getLast_access_date().equals(actual.getLast_access_date()));
        assert(user.getSubscription_location().get(0).equals(user.getSubscription_location().get(0)));
        assert(user.getSubscription_loc_desc().get(0).equals(user.getSubscription_loc_desc().get(0)));
    }

    @Test
    public void updateUserDevices() throws Exception {
        BpdDaoImpl bpdDao = new BpdDaoImpl();
        bpdDao.setDataSource(dataSource);
        UserSelection us  = new UserSelection();
        us.setUserId(1);
        us.setPrimaryLocationId(2);
        us.setSecondaryLocationId(3);
        bpdDao.updateUserDevices(us);
        assert true;
    }

    @Test
    public void uploadMessage(){
        BpdDaoImpl bpdDao = new BpdDaoImpl();
        bpdDao.setDataSource(dataSource);
        BpdAppMessage message = new BpdAppMessage();
        message.setAddressId(1);
        message.setCreatedBy(1);
        message.setDeviceId(1);
        message.setMessage("Test");
        message.setSubLocId(1);
        message.setTypeId(1);
        bpdDao.uploadMessage(message);
        assert true;
    }

    @Test
    public void uploadAttachment(){
        BpdDaoImpl bpdDao = new BpdDaoImpl();
        bpdDao.setDataSource(dataSource);
        bpdDao.uploadAttatchment(new ByteArrayInputStream("test data".getBytes()), "1");
        assert true;
    }

    @Test
    public void getUserMessages(){
        BpdDaoImpl bpdDao = new BpdDaoImpl();
        bpdDao.setDataSource(dataSource);
        ArrayList<ReturnMessage> messages = bpdDao.getUserMessages(1);
        assert messages != null;
    }

    @Test
    public void getAttachment(){
        BpdDaoImpl bpdDao = new BpdDaoImpl();
        bpdDao.setDataSource(dataSource);
        try {
            Response response = bpdDao.getAttachment(1);
            assert response != null;
        } catch (SQLException e) {
            e.printStackTrace();
            assert false;
        }

    }


}

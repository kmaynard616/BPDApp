package BPD.rest.dao;

import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;
import static org.junit.Assert.*;
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.sql.DataSource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
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
        when(resultSet.getString("LAST_ACCESS_DATE")).thenReturn(user.getLast_access_date());
        when(resultSet.getString("SUBSCRIPTION_LOCATION")).thenReturn("Location 1");
        when(resultSet.getString("SUBSCRIPTION_LOC_DESC")).thenReturn("Location 1 Desc");
        when(stmt.executeQuery()).thenReturn(resultSet);
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

}

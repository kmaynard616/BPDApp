package BPD.rest;
import BPD.rest.dao.BpdDao;
import BPD.rest.dao.BpdDaoImpl;
import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.ws.rs.core.Response;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(MockitoJUnitRunner.class)

public class AppServiceTest {

    @Mock
    private ApplicationContext context = new ClassPathXmlApplicationContext("test-dao-context.xml");
    @Mock
    private BpdDao bpdDAO = new BpdDaoImpl();
    @InjectMocks
    private AppService appService;

    private User user;
    private UserSelection userSelection;

    @Before
    public void setUp() throws Exception {
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
        when(context.getBean("bpdDAO")).thenReturn(bpdDAO);
        when(bpdDAO.getUser(1)).thenReturn(user);
    }


    @Test
    public void getUserInfo() {
        String expectedOutput = "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"subscriptionLocation\":[\"Location 1\"],\"lastAccess\":\"2017-11-02\",\"locDesc\":[\"Location 1 Desc\"]}";
        Response response = appService.getUserInfo(1);
        assertEquals(200, response.getStatus());
        assertNotNull(response.getEntity());
        assertEquals(expectedOutput, response.getEntity().toString());
        
    }

    @Test
    public void updateUserSettings() {
    	
        UserSelection us  = new UserSelection();
        us.setUserId(1);
        us.setPrimaryLocationId(2);
        us.setSecondaryLocationId(3);
        String expected = "userSettings updated for user id : " + us.getUserId();
        Response response = appService.updateUserSettings(us);
        assertEquals(200, response.getStatus());
        assertNotNull(response.getEntity());
        assertNotNull(expected, response.getEntity());
    }

}

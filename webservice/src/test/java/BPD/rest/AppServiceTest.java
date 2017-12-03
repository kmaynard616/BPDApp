package BPD.rest;
import BPD.rest.dao.BpdDao;
import BPD.rest.dao.BpdDaoImpl;
import BPD.rest.dao.model.BpdAppMessage;
import BPD.rest.dao.model.ReturnMessage;
import BPD.rest.dao.model.User;
import BPD.rest.dao.model.UserSelection;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.ws.rs.core.Response;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.spy;
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

//    @Test
//    public void submitUserTest() {
//        String data = "test data";
//        String expected = "Post data is "+data;
//        Response response = appService.submitUser(data);
//        assertEquals(200, response.getStatus());
//        assertNotNull(response.getEntity());
//        assertNotNull(expected, response.getEntity());
//    }

    @Test
    public void getUserMessages() {
        ReturnMessage msg =new ReturnMessage();
        ArrayList<ReturnMessage> listMsg = new ArrayList<ReturnMessage>();
        listMsg.add(msg);
        when(bpdDAO.getUserMessages(1)).thenReturn(listMsg);
        Response response = appService.getUserMessages(1);
        assertNotNull(response);
    }

    @Test
    public void testSubmitMessage(){
        BpdAppMessage msg = new BpdAppMessage();
        when(bpdDAO.uploadMessage(msg)).thenReturn("success");
        Response response = appService.submitMessage(msg);
        assertNotNull(response);
        assertEquals(200, response.getStatus());
        assertEquals("success", response.getEntity());

    }

    @Test
    public void testGetAttachmentById() throws SQLException {
        Response response = Response.ok().build();
        when(bpdDAO.getAttachment(1)).thenReturn(response);
        try {
            response = appService.getAttachmentByID(1);
        } catch (IOException e) {
            e.printStackTrace();
            assert false;
        } catch (SQLException e) {
            e.printStackTrace();
            assert false;
        }
        assertNotNull(response);
        assertEquals(200,response.getStatus());
    }
}

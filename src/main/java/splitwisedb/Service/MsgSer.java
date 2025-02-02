package splitwisedb.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class MsgSer {

	    @Value("${twilio.account_sid}")
	    private String accountSid;

	    @Value("${twilio.auth_token}")
	    private String authToken;

	    @Value("${twilio.phone_number}")
	    private String twilioPhoneNumber;
	    
	    
	    
	    public void initTwilio() {
	        Twilio.init(accountSid, authToken);
	    }

	    public void sendSms(String toPhoneNumber, String messageContent) {
	        Message.creator(
	            new PhoneNumber(toPhoneNumber),
	            new PhoneNumber(twilioPhoneNumber),
	            messageContent
	        ).create();
	    }
	
}

package splitwisedb.Controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import splitwisedb.Modal.Expense;
import splitwisedb.Modal.ExpenseShare;
import splitwisedb.Modal.GroupData;
import splitwisedb.Modal.GroupMember;
import splitwisedb.Modal.Messsage;
import splitwisedb.Modal.Smodel;
import splitwisedb.Service.MsgSer;
import splitwisedb.Service.Sservice;


@RestController
//@CrossOrigin(origins = "http://localhost:3000") 
@CrossOrigin(origins= "https://splitwise-base.onrender.com")
public class Scontroller {

	@Autowired
	Sservice ser;
	
	@Autowired
	MsgSer msgser;
	
	@PostMapping("/register")
	public String userRegister(@RequestBody Smodel m)
	{
		 Optional<Smodel> sm=ser.addUser(m);
		 System.out.println("Registering user: " + m);
		 if(sm.isPresent())
		 {
			 return "User registered successfully!Login Now";
		 }
		 return "User registration having an issue";
	}
	@PostMapping("/login")
	public String userLogin(@RequestBody Smodel m)
	{
		String e=m.getEmail();
		String password=m.getPassword();
		Optional<Smodel> sm=ser.checkUser(e);
		String mail=null;
		String pass=null;
		if(sm.isPresent())
		{
			 Smodel user=sm.get();
			 mail=user.getEmail();
			 pass=user.getPassword();
		}
		if (e.equals(mail) && pass.equals(password)) {
		    return "Login successful";
		} else if (!e.equals(mail)) {
		    return("Invalid Username Or Password");
		} else if (!password.equals(pass)) {
		    return ("Invalid Password");
		    
		}
		return ("Invalid Username or Password");
		
	}
	@PostMapping("/groupdata")
	public  String groupdata(@RequestParam("gName") String gName,@RequestParam("img") MultipartFile img,@RequestParam("username") String username) throws IOException
	{

		GroupData data=new GroupData();
		data.setgName(gName);
		data.setUsername(username);
		System.out.println(username);
		
		if (img != null && !img.isEmpty()) {
	        byte[] file = img.getBytes();
	        data.setImg(file);
	    }
		ser.addGroup(data);
		System.out.println(data);
		if(data!=null)
		{
			 return"Group Created Succefully";
		}
		return "Error:Group Creation having an Issue";
	}
	@PostMapping("/data")
	public List<GroupData> dataFetch(@RequestBody String email)
	{
		 System.out.println(email);
		 List<GroupData> data=ser.findGroup(email);
		 System.out.println(data);
		 return data;
		
	}
	@DeleteMapping("/delete")
	public String deleteData(@RequestParam("i") int id)
	{
		boolean flag=ser.deleteData(id);
		System.out.println(id);
		 if (flag)
		 {    
		    return "Group Deleted Successfully";
		 }
		  return "Error: Group Deletion encountered an issue";
	}
	@PostMapping("/member")
	public String saveMember(@RequestBody GroupMember member)
	{
		System.out.println(member.getUser());
		
		Optional<GroupMember> group=ser.addmemeber(member);
		if(group.isPresent())
		{
			return "Member added succefully";
		}
		return "Error:Member adding encountered an issue";
	}
	
	@PostMapping("/id")
	public int numMember(@RequestParam("groupId") int id)
	{
		System.out.println(id);
		int count=ser.findMember(id);
		System.out.println(count);
		return count;
	}
	@PostMapping("/sms")
	public String sendMsg(@RequestBody Messsage msg)
	{   
		msgser.initTwilio();
	    String phone=msg.getPhoneNumber();
		String sms=msg.getMessage();
		msgser.sendSms(phone, sms);
		return "Message Sent succefully";
	}
	@PostMapping("/memberName")
	public List<String> memberName(@RequestParam("groupId") int id)
	{
		List<String> users=ser.findUsers(id);
		System.err.println(users);
		return users;
	}
	@PostMapping("/expense")
	public Optional<Expense> expense(@RequestBody Expense ex)
	{
		System.err.println(ex.getCreatedAt());
		Optional<Expense> expense=ser.expenseAdd(ex);
		System.out.println(expense);
		return expense;
	}
	@PostMapping("/expenseShare")
	public void expenseShare(@RequestBody List<ExpenseShare> ex)
	{
		 System.out.println(ex);
		 
		 ser.addShare(ex);
		 
	}
	@PostMapping("/expensedata")
	public List<Expense> expensedata(@RequestParam("id") int id)
	{
		 System.out.println(id);
		 List<Expense> exp=ser.getExpensedata(id);
		 System.out.println("dddd"+exp);
		 return exp;
	}

	@PostMapping("/sharedata")
	public List<Integer> sharedata(@RequestParam List<Integer> id)
	{
		 List<Integer> ex=ser.getshare(id);
		 return ex;
	}
	
	@PostMapping("/shares")
	public List<Integer> shares(@RequestParam List<Integer> id)
	{
		 List<Integer> ex=ser.getpaid(id);
		 return ex;
	}
	@PostMapping("/owes")
	public int owesdata(@RequestParam int id)
	{
		 int ex=ser.getOwed(id);
		 return ex;
	}
	
	@PostMapping("/pays")
	public int paysdata(@RequestParam int id)
	{
		 int ex=ser.getPaid(id);
		 return ex;
	}
	
	@PostMapping("/expenses")
	public Optional<Expense> expenseShare(@RequestParam int id)
	{
		return ser.getExpenseShare(id);
	}
	@PostMapping("/draftshare")
	public List<ExpenseShare> dratshare(@RequestParam int id)
	{
		return ser.getdraft(id);
	}
	@PostMapping("/settledata")
	public Map<String, List<Object[]>> settledata(@RequestParam List<Integer> ids)
	{
		return ser.settle(ids);
	}
	
	@PostMapping("/getName")
	public void getName(@RequestParam String name)
	{
		  ser.getData(name);
	}
	@PostMapping("/resetdata")
	public void setReset(@RequestParam String name)
	{
		  System.out.println(name);
		  ser.getReset(name);
	}
	@PostMapping("/spending")
	public Object spending(@RequestParam int gId )
	{
		System.out.println("hey"+gId);
		return ser.getSpending(gId);
	}
	
	@PostMapping("/summary")
	public int summary(@RequestParam List<Integer> ids )
	{
		return ser.getSummary(ids);
	}
	@PostMapping("/getExpId")
	public List<Integer> getExpId(@RequestParam int id)
	{
		 return ser.getId(id);
	}
	
	@PostMapping("/getFriends")
	public  List<String> getFriends()
	{
       return ser.friends();
	}
	
	@PostMapping("/getBalance")
	public List<Object[]> getbalance(@RequestParam List<Integer> ids)
	{
		return ser.balance(ids);
	}
}

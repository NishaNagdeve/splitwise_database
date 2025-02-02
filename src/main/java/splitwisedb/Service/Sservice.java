package splitwisedb.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import ch.qos.logback.core.model.Model;
import jakarta.transaction.Transactional;
import splitwisedb.Modal.Expense;
import splitwisedb.Modal.ExpenseShare;
import splitwisedb.Modal.GroupData;
import splitwisedb.Modal.GroupMember;
import splitwisedb.Modal.Smodel;
import splitwisedb.Repo.ExpenseRepo;
import splitwisedb.Repo.ExpenseShareRepo;
import splitwisedb.Repo.ImageRepo;
import splitwisedb.Repo.MemberRepo;
import splitwisedb.Repo.Srepo;

@Service
public class Sservice {

	@Autowired
	Srepo repo;
	
	@Autowired
	ImageRepo imgRepo;
	
	@Autowired
	MemberRepo memRepo;
	
	@Autowired 
	ExpenseRepo exRepo;
	
	@Autowired
	ExpenseShareRepo shareRepo;
	
	public Optional<Smodel> addUser(Smodel m) {
		
		Optional<Smodel> sm=Optional.ofNullable(repo.save(m));
		return sm;
	}
	public Optional<Smodel> checkUser( String e) {
		Optional<Smodel> m=(repo.findByEmail(e));
		return m;
		
	}
	public GroupData addGroup(GroupData g) {
		
		GroupData data=imgRepo.save(g);
		return data;
	}
	public List<GroupData> findGroup(String e)
	{
		List<GroupData> data=imgRepo.findByUsername(e);
		return data;
	}
	public boolean deleteData(int id) {
		
		
		imgRepo.deleteById(id);
		System.out.println(id);
		Optional<GroupData> data=imgRepo.findById(id);
		return data.isEmpty();
	}
	public Optional<GroupMember> addmemeber(GroupMember member) {
		
	    Optional<GroupMember> group=Optional.ofNullable(memRepo.save(member));
	    return group;
		
	}
	public int findMember(int id) {
		
		  int count=memRepo.findMember(id);
		  return count;
	}
	public List<String> findUsers(int id) {
		
		List<String> user=memRepo.findUsersById(id);
		
		return user;
	}
	public Optional<Expense> expenseAdd(Expense ex) {
		
		Optional<Expense> expense=Optional.ofNullable(exRepo.save(ex));
		return expense;
	     
	}
	public void addShare(List<ExpenseShare> ex) {
		
		for(ExpenseShare share:ex)
		{ 
			ExpenseShare obj=new ExpenseShare();
			obj.setExpId(share.getExpId());
			obj.setMemberName(share.getMemberName());
			obj.setOwed(share.getOwed());
			obj.setPaid(share.getPaid());
			System.out.println(shareRepo.save(obj));
		}
		
       
	}
	public  List<Expense> getExpensedata(int id) {
		 List<Expense> exp=exRepo.findExpData(id);
		 return exp;
		
	}
	public List<Integer> getshare(List<Integer> id)
	{
		return shareRepo.findshare(id);
	}
	public List<Integer> getpaid(List<Integer> id) {
		
		 return shareRepo.getShares(id);
	}
	public int getOwed(int id) {
		return shareRepo.findowed(id);
	}
	public int getPaid(int id) {
		
		return shareRepo.findpaid(id);
		
	}
	public Optional<Expense> getExpenseShare(int id) {
		return exRepo.findById(id);
		
	}
	public List<ExpenseShare> getdraft(int id) {
		
		return shareRepo.findshares(id);
			
	}
	public Map<String, List<Object[]>> settle(List<Integer> ids) {
		
		List<Object[]> l1= shareRepo.settlement(ids);
		List<Object[]> l2=shareRepo.statment(ids);
		
		Map<String, List<Object[]>> mv=new HashMap<>();
		mv.put("m1", l1);
		mv.put("m2", l2);
		return mv;

	}
	@Transactional
	public void getData(String name) {
		
		shareRepo.getDataByName(name);
	}
	
	@Transactional
	public void getReset(String name) {
		shareRepo.resetData(name);
		
	}
	public Object getSpending(int gId) {

		  List<Integer> ids=exRepo.getIds(gId);
          Object obj=exRepo.spend(gId);
          Map<String, Object> mv=new HashMap<>();
          mv.put("ids", ids);
          mv.put("obj", obj);
          return mv;
		
	}
	public int getSummary(List<Integer> ids) {
		
		 return shareRepo.getSolution(ids);
		
	}
	public List<Integer> getId(int id) {
		List<Integer> ids=exRepo.getIds(id);
		return ids;
		
	}
	public  List<String> friends() {
		
		return memRepo.findfriends();
	}
	public List<Object[]> balance(List<Integer> ids) {
		
		return shareRepo.getBalance(ids);
	} 
	

	
}

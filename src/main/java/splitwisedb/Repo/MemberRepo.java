package splitwisedb.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import splitwisedb.Modal.GroupMember;

public interface MemberRepo extends JpaRepository<GroupMember, Integer>{
	
	   @Query("SELECT COUNT(g.user) FROM GroupMember g WHERE g.groupId = ?1")
	   int findMember(int id);
	   
	   @Query("Select g.user from GroupMember g where g.groupId=?1")
	   List<String> findUsersById(int id);

	   @Query("select distinct g.user from GroupMember g")
	   List<String> findfriends();
	   
	   
 
}

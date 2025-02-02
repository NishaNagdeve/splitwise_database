package splitwisedb.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import splitwisedb.Modal.GroupData;

public interface ImageRepo extends JpaRepository<GroupData, Integer> {
  
	  List<GroupData> findByUsername(String username);
	  
	  @Query("delete from GroupData where id=?1")
      public void deleteByUsername(int id);
	
}

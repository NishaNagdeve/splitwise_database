package splitwisedb.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import splitwisedb.Modal.Expense;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Integer>{

	@Query("select e from Expense e where e.groupId = ?1")
	List<Expense> findExpData(int id);

	
	@Query("select sum(e.amount),sum(CASE WHEN e.paidBy = 'you' THEN e.amount ELSE 0 END) from Expense e where e.groupId=?1 group by e.groupId")
	Object spend(int gId);
	
	@Query("select e.expId from Expense e where e.groupId=?1")
	List<Integer> getIds(int gId);
	

}

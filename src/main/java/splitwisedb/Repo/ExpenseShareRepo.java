package splitwisedb.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import splitwisedb.Modal.ExpenseShare;

@Repository
public interface ExpenseShareRepo extends JpaRepository<ExpenseShare, Integer> {

	
  @Query("select ex.owed from ExpenseShare ex where ex.expId in ?1 and memberName='you'")
  List<Integer> findshare(List<Integer> id);

  @Query("select ex.paid from ExpenseShare ex where ex.expId in ?1 and memberName='you'")
  List<Integer> getShares(List<Integer> id);

  @Query("select ex.owed from ExpenseShare ex where ex.expId in ?1 and memberName='you'")
  int findowed(int id);

  @Query("select ex.paid from ExpenseShare ex where ex.expId in ?1 and memberName='you'")
  int findpaid(int id);

  @Query("select e from ExpenseShare e where e.expId=?1")
  List<ExpenseShare> findshares(int id);
  
  @Query("select ex.memberName,sum(ex.owed) from ExpenseShare ex where ex.expId in(select x.expId from ExpenseShare x where x.memberName='you' and x.paid>0) and ex.expId in (?1) group by ex.memberName")
  List<Object[]> settlement(List<Integer> ids);
  
  @Query("select e2.memberName,sum(e1.owed) from ExpenseShare e1 join ExpenseShare e2 on e1.expId=e2.expId and e1.shareId!=e2.shareId where e1.memberName='you' and e2.paid>0 and e2.memberName!='you' and e1.expId in (?1 ) group by e2.memberName")
  List<Object[]> statment(List<Integer> ids);
  
  @Modifying
  @Query("update ExpenseShare e set e.owed=0 where e.memberName=?1")
  void getDataByName(String name);
  
  @Modifying
  @Query(value = "WITH CTE AS ( " +
          "  SELECT exp_id " +
          "  FROM Expense_Share " +
          "  WHERE (member_name = ?1 AND paid > 0) OR (member_name = 'you' AND paid > 0) " +
          ") " +
          "UPDATE Expense_Share e " +
          "SET e.owed = 0 " +
          "WHERE e.exp_id IN (SELECT exp_id FROM CTE) " +
          "  AND (e.member_name = 'you' OR e.member_name = ?1)", 
  nativeQuery = true)
  void resetData(String name);

 @Query("select sum(e.owed) from ExpenseShare e where e.expId in ?1 and e.memberName='you' group by e.memberName")
 int getSolution(List<Integer> ids);

 @Query("select ex.memberName,sum(ex.owed) as owed,sum(ex.paid) as paid,sum(ex.paid)-sum(ex.owed) as netbalance from ExpenseShare ex where ex.expId in(?1) group by ex.memberName")
 List<Object[]>getBalance(List<Integer> ids);
 
}

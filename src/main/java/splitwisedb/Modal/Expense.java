package splitwisedb.Modal;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Expense {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int expId;
	private int groupId;
	private String description;
	private long amount;
	private String paidBy;
	private String splitBy;
	private Date createdAt;
	
	public int getExpId() {
		return expId;
	}
	public void setExpId(int expId) {
		this.expId = expId;
	}
	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public String getPaidBy() {
		return paidBy;
	}
	public void setPaidBy(String paidBy) {
		this.paidBy = paidBy;
	}
	public String getSplitBy() {
		return splitBy;
	}
	public void setSplitBy(String splitBy) {
		this.splitBy = splitBy;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	@Override
	public String toString() {
		return "Expense [expId=" + expId + ", groupId=" + groupId + ", description=" + description + ", amount="
				+ amount + ", paidBy=" + paidBy + ", SplitBy=" + splitBy + ", CreatedAt=" + createdAt + "]";
	}
	
}

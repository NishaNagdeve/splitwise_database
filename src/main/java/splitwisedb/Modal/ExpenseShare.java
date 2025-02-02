package splitwisedb.Modal;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ExpenseShare {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int shareId;
	private int expId;
	private String memberName;
	private long owed;
	private long paid;
	
	
	public int getShareId() {
		return shareId;
	}
	public void setShareId(int shareId) {
		this.shareId = shareId;
	}
	public int getExpId() {
		return expId;
	}
	public void setExpId(int expId) {
		this.expId = expId;
	}
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public long getOwed() {
		return owed;
	}
	public void setOwed(long owed) {
		this.owed = owed;
	}
	public long getPaid() {
		return paid;
	}
	public void setPaid(long paid) {
		this.paid = paid;
	}
	@Override
	public String toString() {
		return "ExpenseShare [shareId=" + shareId + ", expId=" + expId + ", memberName=" + memberName + ", owed=" + owed
				+ ", paid=" + paid + "]";
	}
	
}

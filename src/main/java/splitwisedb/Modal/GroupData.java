package splitwisedb.Modal;

import java.util.Arrays;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class GroupData {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	private String gName;
	@Lob
	private byte[] img;
	private String username;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getgName() {
		return gName;
	}
	public void setgName(String gName) {
		this.gName = gName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public byte[] getImg() {
		return img;
	}
	public void setImg(byte[] img) {
		this.img = img;
	}
	
	public String toString() {
		return "GroupData [id=" + id + ", gName=" + gName + ", img=" + Arrays.toString(img) + ", username=" + username+ "]";
	}
	
	
}

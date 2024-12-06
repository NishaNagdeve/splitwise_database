import React, { useState,useRef} from 'react';
import { Link} from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import EditNoteIcon from '@mui/icons-material/EditNote';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import checkimg from '../Images/study.jpg';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const[showModal,setShowModal]=useState(false);
  const[group,setGroup]=useState([]);
  const handleClose=()=>setShowModal(false);
  const [selectedImage, setSelectedImage] = useState(checkimg);
  const fileInputRef = useRef(null); 
  const n1="Group Expense";
  const [name,setName]=useState(n1);
  const[modalName,setModalName]=useState(name);
  const[modalImage,setModalImage]=useState(selectedImage);
 


  useEffect(() => {
        const data=JSON.parse(localStorage.getItem("data"));
        if (data) {
          setGroup(data);
        }
  } ,[]);   

  const addNewGroup = (newGroup) => {
    setGroup((prevGroups) => [...prevGroups, newGroup]);
  };
  const handleshow=()=>
    {
      setName(name);
      setSelectedImage(selectedImage);
      setShowModal(true);
    }
 
  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
   
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModalImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };
  
  const handleIconClick = () => {
    fileInputRef.current.click(); 
  };
  const email=localStorage.getItem("email");
  const handleGroup=async()=>{
    const newGroup={name: modalName,image:modalImage};
    setGroup([...group,newGroup]);
    handleClose();
    const formData = new FormData();
    formData.append('gName', modalName);
    if (fileInputRef.current.files.length > 0) {
      formData.append('img', fileInputRef.current.files[0]); 
    } else {
      const response = await fetch(checkimg); 
      const blob = await response.blob();
      formData.append('img', blob); 
    }
    formData.append('username', email);
    console.log(email);
    try{
       const response=await axios.post('http://localhost:8080/groupdata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       });
          alert(response.data);
      }
      catch(error)
      {
        console.error(error);
        alert("An error occurred: " + error.message);
      }   
      try{
        const response=await axios.post('http://localhost:8080/data',email,{
         headers: {
           'Content-Type': 'text/plain'
         }
        });
         const data=response.data;
          if (data) {
            setGroup(data);
            }
        }
        catch(error)
        {
        console.log(error);
        }

  }
  
  const handleDelete=async(id)=>
  {  
    try{
      const response=await axios.post('http://localhost:8080/data',email,{
       headers: {
         'Content-Type': 'text/plain'
       }
      });
       const  data=(response.data);
        if (data) {
          setGroup(data);
          console.log(data.gName);
        }
      }
      catch(error)
      {
      console.log(error);
      }
     console.log(id);
     const i=id;
     try{
          const res=await axios.delete('http://localhost:8080/delete',{
             params:{
               i
             }
          });
           alert(res.data);
           setGroup((prevGroups) => prevGroups.filter((group)=>group.id!==i));
        }
    catch(error)
    {
      console.error(error);
    }
     
  }
   
  const navigate = useNavigate(); // Add this line

  const handleMember = async (id, gName,img) => { 
    try {
      const res=await axios.post(`http://localhost:8080/expensedata?id=${id}`);
      // const{expId,amount,paidBy,splitBy,description,createdAt}=res.data;
      console.log(res.data);
      const expense=res.data;
      const exp=expense.map(expense=>expense.expId);
      console.log(exp);
      
      const res2=await axios.post(`http://localhost:8080/sharedata?id=${exp.join(',')}`);
      const res3=await axios.post(`http://localhost:8080/shares?id=${exp.join(',')}`);
      const res1 = await axios.post(`http://localhost:8080/id?groupId=${id}`); 
      const share=res2.data;
      const shares=res3.data;
      console.log(share);
      // const{owed,paid}=res2.data;
      navigate("/people", { 
        state: { 
          groupName: gName, 
          groupImg: img ? `data:image/jpeg;base64,${img}` : modalImage, 
          id: id, 
          num: res1.data,
          expenses: expense.map(exp => ({
            expId: exp.expId,
            amount: exp.amount,
            paidBy: exp.paidBy,
            splitBy: exp.splitBy,
            description: exp.description,
            createdAt:exp.createdAt
          })),
          
          shares: share.map(sh => ({
            owed: sh
          })),
          draft:shares.map(d=>({
            paid:d
          }))
        } 
      });
  
      if (res1.data === 0) {
        localStorage.setItem("flag", 0);
      } else {
        localStorage.setItem("flag", 1);
      }
  
    } catch (error) {
      console.error(error);
    }
    
  };
  
  
  return (
    <>
    <Header addGroup={addNewGroup} />
    <div style={{ display: 'flex', alignItems: 'center' ,marginTop:'20px'}}>
  <h5 style={{ marginRight: '10px' ,marginLeft:'40px'}}>Overall, You are owed <span style={{color:'#66CDAA'}}>$160.00</span></h5>
  <TuneIcon style={{ fontSize: '40px',marginLeft:'950px'}} />
</div>
        <div>
          {group.map((groups,index)=>(
             <div key={index} style={{marginTop:'20px'}}>
             <img src={groups.img?`data:image/jpeg;base64,${groups.img}`:modalImage} alt="Selected" style={{ width: '200px', height: '200px', objectFit: 'cover',marginLeft:'-1000px',marginTop:'40px',borderRadius:"10px"}} onClick={() => handleMember(groups.id, groups.gName, groups.img)} />
             <h3 style={{marginTop:'-100px',marginLeft:'-400px',color:'black'}}>{groups.gName || modalName|| n1}</h3>
             <h4 style={{marginLeft:'-450px',color:'gray'}}>no expenses</h4>
             <DeleteIcon onClick={()=>handleDelete(groups.id)}  style={{fontSize:'40px',marginLeft:'1250px',marginTop:'-100px',color:'red',cursor:'pointer'}} ></DeleteIcon>
             </div>
          ))}
        </div>
<div style={{ display: 'flex', alignItems: 'center',borderRadius:'7px',borderColor:'#3CB371',border:'2px solid #3CB371',width:'260px' ,marginLeft:'550px',marginTop:'100px'}}>
  <GroupAddIcon style={{color:'#3CB371',paddingLeft:'20px',fontSize:'50px'}}/>
  <a href="#" onClick={handleshow} style={{textDecoration:'none'}}><h5 style={{color:'#3CB371',marginLeft:'20px'}}>Start a new group</h5></a>
</div>
 
<div  style={{ display: 'flex', alignItems: 'center',borderRadius:'50px',backgroundColor:'#3CB371',width:'200px' ,marginLeft:'1100px',marginTop:'100px'}}>
  <EditNoteIcon style={{color:'white',paddingLeft:'20px',fontSize:'50px'}}/>
  <h5 style={{color:'white',marginLeft:'10px'}}>Add Expense</h5>
</div>

<input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }} 
        onChange={handleImageChange}
/>
<Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{display:'flex'}}>
         <AddAPhotoOutlinedIcon onClick={handleIconClick}  style={{fontSize:'30px',textAlign:'center'}}/>
         <img
              src={checkimg || modalImage} // Default image displayed if no image is selected
              alt="Group Icon"
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginLeft: '20px' }}
        />
            </div>
          <p style={{marginLeft:'50px',fontWeight:'bold'}}>Group name</p>
         <input type='text' name="name" value={modalName} style={{marginLeft:'50px'}} onChange={(e) => setModalName(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/home"><Button variant="secondary" onClick={handleClose}>
            Close
          </Button></Link>
          <Link to="/home"><Button variant="primary" onClick={handleGroup}>
            Save changes
          </Button></Link>
        </Modal.Footer>
      </Modal>
      <Footer/>
    </>
  )
}

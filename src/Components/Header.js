import React, { useState,useRef } from 'react';
import { Navbar,Container,Nav, NavbarCollapse } from 'react-bootstrap';
import split from "../Images/splitwise-icon.png";
import SearchIcon from '@mui/icons-material/Search';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Link } from "react-router-dom";
import { Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import checkimg from '../Images/study.jpg';
import { useNavigate } from 'react-router-dom';

function Header({addGroup}){

  const[showModal,setShowModal]=useState(false);
  const[group,setGroup]=useState([]);
  const handleClose=()=>setShowModal(false);
  
  const [selectedImage, setSelectedImage] = useState(checkimg);
  const fileInputRef = useRef(null); 
 
  const n1="Group Expense";
  const [name,setName]=useState(n1);

  const[modalName,setModalName]=useState(name);
  const[modalImage,setModalImage]=useState(selectedImage);
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

  const handleSaveChanges=()=>
  {
    const newGroup={name: modalName,image:modalImage};
    addGroup(newGroup); 
    setShowModal(false);
  }
    return(
      <>
        <Navbar className='navbar' expand="sm" style={{ backgroundColor: 'white', borderBottom: "2px solid #333" }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={split} height={80} width={120} style={{ marginTop: '10px', display: 'inline-block',marginLeft:'-80px' }} alt="Splitwise logo" />
        </Navbar.Brand>
        
        
        <Nav className='ml-auto' style={{ display: 'flex', alignItems: 'center' }}>
          <Nav.Link as={Link} to="/search">
            <SearchIcon style={{ fontSize: '40px', marginRight: '40px',color:'#66CDAA' }} />
          </Nav.Link>
          <Nav.Link as={Link} to="#" onClick={handleshow} style={{textDecoration:'none'}}>
            <PeopleOutlineIcon style={{ fontSize: '40px',marginRight:'-50px' ,color:'#66CDAA'}} />
           </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
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
          src={modalImage || checkimg} 
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
     <Button variant="primary" onClick={handleSaveChanges}>
        Save changes
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  );
}

export default Header;
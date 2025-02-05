import React,{useState} from 'react';
import split from "../Images/splitwise-icon.png";
import '../Styles/Welcome.css';
import { Button } from 'react-bootstrap';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import {Link} from 'react-router-dom';


export default function Welcome() {

   
  return (
    <>
    
    <img src={split} style={{height:'100px',width:'120px',marginTop:'200px'}} alt='logo' className='logo1'></img>
    <p style={{fontFamily:'sans-serif',wordSpacing:'4px',fontSize:'30px'}} className='text'>WE ARE GLAD YOU ARE HERE !!</p>
     <Link to="/account"><Button style={{backgroundColor:'#66CDAA',borderColor:'black',color:'black'}} className='btn'>Sign up to access it
        <EmojiPeopleIcon style={{fontSize:'25px'}}></EmojiPeopleIcon>
     </Button></Link>
    </>
  )
}

import React from 'react';
import Header1 from '../Components/Header1';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Footer from '../Components/Footer';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Account() {
    
  const baseUrl="https://splitwise-database.onrender.com";
  const navigate=useNavigate();
  const[color,setColor]=useState('#66CDAA');
  const[colors,setColors]=useState('white');
  const[login,setLogin]=useState(true);
  const[data,setData]=useState(null);
  const[loginData,setLoginData]=useState({
      title:'',
      pass:''
  });
  const[registerData,setRegisterData]=useState({
      name:'',
      email:'',
      password:'',
      confirmPassword:'' 

  });
  const handleLogin=()=>{
       setColor('#66CDAA');
       setColors('white');
       setLogin(true);
  }
  const handleRegister=()=>{
    setColors('#66CDAA');
    setColor('white');
    setLogin(false);
  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (login) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };
  const handleForm = async () => {
    const { name, email, password, confirmPassword } = registerData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/register`, {
        name, 
        email, 
        password
      });
      if(response.data=="User registered successfully!Login Now")
      {
        localStorage.setItem("username",name);
        handleLogin();
      }
     alert(response.data); 
    } catch (error) {
          console.error(error)
    }
  };

  const handleSubmit= async ()=>{
       const {title,pass}= loginData;
       try{
        const res= await axios.post(`${baseUrl}/login`,{
           email:title,
           password:pass
        });
        console.log(res);
        if(res.data=="Login successful")
        {
            console.log(title);
            try{
                     const response=await axios.post(`${baseUrl}/data`,title,{
                      headers: {
                        'Content-Type': 'text/plain'
                      }
                     });
                         setData(response.data);
                         console.log(response.data);
                         localStorage.setItem("data",JSON.stringify(response.data));
                         navigate('/home');
            }
            catch(error)
            {
               console.log(error);
            }
        }
        alert(res.data);
      }
        catch(error)
        {
          if (error.response.status === 401) {
            alert(error.response.data); 
        }
            console.error(error)
        }

        localStorage.setItem("email",loginData.title);
  }

  return (
    <>
    <Header1/>
    <Form style={{border:'2px solid grey',height:'400px',width:'500px',marginTop:'100px',marginLeft:'400px',marginBottom:'100px',position:'relative'}}>
    <div style={{marginTop:'40px'}}>
     <div style={{height:'40px',width:'250px',backgroundColor:'white',borderRadius:'25px',marginLeft:'120px',position:'relative',border:'2px solid black'}}>
      <div onClick={handleLogin} style={{height:'25px',width:'110px',borderRadius:'25px',backgroundColor:color,position:'absolute',top:'6px',left:'10px',cursor:'pointer'}}>Login</div>
      <div onClick={handleRegister} style={{height:'25px',width:'110px',backgroundColor:colors,borderRadius:'25px',marginLeft:'120px',position:'absolute',top:'6px',left:'8px',cursor:'pointer'}}>Register</div>
      </div><br></br>
      {login?(
        <>
        <input type='text' placeholder="Username" name="title" style={{width:'250px',borderRadius:'25px'}} onChange={handleInput}required/><br></br><br></br>
        <input type='password' placeholder="Password" name="pass" style={{width:'250px',borderRadius:'25px'}} onChange={handleInput} required/><br></br>
        <a href='/'style={{fontSize:'10px',marginLeft:'-150px'}}>forgot passsword?</a><br></br><br></br>
        <Button onClick={handleSubmit} style={{width:'250px',borderRadius:'25px',backgroundColor:'#66CDAA',borderColor:'#66CDAA'}}>Login</Button><br></br>
         </>
         ):(
        <>
        <input type='text' placeholder="Name" name="name" value={registerData.name} style={{width:'250px',borderRadius:'25px'}} onChange={handleInput} required/><br></br><br></br>
        <input type='email' placeholder="Email" name="email" value={registerData.email} style={{width:'250px',borderRadius:'25px'}} onChange={handleInput} required/><br></br><br></br>
        <input type='password' placeholder="Password" name="password" value={registerData.password} style={{width:'250px',borderRadius:'25px'}} onChange={handleInput} required/><br></br><br></br>
        <input type='password' placeholder="Confirm Password" name="confirmPassword" value={registerData.confirmPassword} style={{width:'250px',borderRadius:'25px'}} onChange={handleInput} required/><br></br><br></br>
        <Button onClick={handleForm} style={{width:'250px',borderRadius:'25px',backgroundColor:'#66CDAA',borderColor:'#66CDAA'}}>Login</Button><br></br>
      </>
      )}
      </div>
    </Form>
    {/* <Footer/> */}
    </>
    
  )
}

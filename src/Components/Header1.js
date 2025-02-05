import React from 'react';
import { Navbar,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import split from "../Images/splitwise-icon.png";
import '../Styles/Header1.css';

export default function Header1() {
  return (
    <>
     <Navbar className='navbar' expand="sm" style={{ backgroundColor: 'white', borderBottom: "2px solid #333" }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={split} height={80} width={120} style={{ marginTop: '10px', display: 'inline-block',marginLeft:'-80px' }} alt="Splitwise logo" className='img'/>
        </Navbar.Brand>
      </Container>
    </Navbar>
    </>
  )
}

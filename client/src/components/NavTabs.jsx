import React from 'react';
import { Link } from 'react-router-dom';
// Bootstrap css
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// https://react-bootstrap.netlify.app/docs/components/navbar/ 
export default function NavTabs() {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark" fixed="top">
          <Container> 
            <Link to='/'>
              <Navbar.Brand><h1>Farm Management</h1></Navbar.Brand>
            </Link>
            <Nav className="me-auto">
              <Link to='/'>
                Home
              </Link>
              <Link to='/Farm'>
                My Farm
              </Link>
              <Link to='/Weather'>
                Weather
              </Link>
              <Link to='/Login'>
                Log In
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
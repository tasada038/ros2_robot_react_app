import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <Navbar className="mt-4" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/qt_ros_logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        ROS 2 Web App
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Footer
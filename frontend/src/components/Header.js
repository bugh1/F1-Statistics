import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Header = () => {
    return (
        <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
            <Navbar.Brand as={NavLink} to="/">Formula 1 Statistics</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" activeKey="navbar">
                    <Nav.Link as={NavLink} to="/" exact eventKey="home">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/championship" eventKey="championship">Championship</Nav.Link>
                    <Nav.Link as={NavLink} to="/records" eventKey="records">Records</Nav.Link>
                    <Nav.Link as={NavLink} to="/drivers" eventKey="drivers">Drivers</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
import React from 'react';
import {Navbar, Nav,NavDropdown, Form, FormControl, Button} from 'react-bootstrap/';
import logo from '../logo.png'

/*
    The navigation that will appear on every page. Has links
    to the homepage, profile page, and search bar.
*/
class NavBar extends React.Component {
    render() {
        return (
            <div class="test">
                <Navbar bg="primary" variant="dark" >
                    <Navbar.Brand href="/" active> 
                        <img
                            src={logo}
                            width="120"
                            height="40"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                     </Navbar.Brand>
                     <Form inline className="mr-auto">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search notes/courses</Button>
                    </Form>
                    <Nav className="d-flex justify-content-end">
                        { <Nav.Link href="/manage">Manage</Nav.Link> }
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link href="/take">Take</Nav.Link>
                        {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
                        <NavDropdown title="Jon" id="Profile Options">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/manage">Manage Notes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            <br />
            </div>
        );
    }
}

export default NavBar;
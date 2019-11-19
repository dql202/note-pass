import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap/';
import logo from '../logo.png'

/*
    The navigation that will appear on every page. Has links
    to the homepage, profile page, and search bar.
*/

const API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/user/read/?userID=';
const USER = window.localStorage.getItem("userID");

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }
    componentDidMount() {
        if (USER === "") { 
            this.setState({ data: "Profile"})
            return; }
        fetch(API + USER)
            .then(response => response.json())
            .then(data => this.setState({ data: data.username }));
    }
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark" >
                    <Navbar.Brand href="/" active="true">
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
                        <NavDropdown title={this.state.data} id="Profile Options">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/manage">Manage Notes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                        {<Nav.Link href="/manage">Manage</Nav.Link>}
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link href="/take">Take</Nav.Link>
                        {/* <Nav.Link href="/profile">Profile</Nav.Link> */}

                    </Nav>
                </Navbar>
                <br />
            </div>
        );
    }
}

export default NavBar;
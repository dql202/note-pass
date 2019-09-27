import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/';

/*
    The navigation that will appear on every page. Has links
    to the homepage, profile page, and search bar.
*/
class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/" active>NotePass</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/manage">Manage</Nav.Link>
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link href="/take">Take</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                    
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search courses</Button>
                    </Form>
                </Navbar>
            <br />
            </div>
        );
    }
}

export default NavBar;
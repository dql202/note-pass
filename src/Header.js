import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap/';
//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

/*
    The navigation that will appear on every page. Has links
    to the homepage, profile page, and search bar.
*/
class Header extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/">NotePass</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/Profile">Profile</Nav.Link>
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

export default Header;
import React from 'react';
import '../App.css';
import {Jumbotron,CardGroup,Card, Button} from 'react-bootstrap/';
import {Redirect} from 'react-router-dom';

const USER = window.localStorage.getItem("userID");
/* 
    The buttons on the homepage that allow users to 
    upload notes, take notes, and manage their notes.
*/
class Home extends React.Component {
    render() {
        if (window.localStorage.getItem("userID") === "null") {
            return <Redirect to='/' />
        }
        return (
            <React.Fragment>
                <div><h1><center>Hello, {window.localStorage.userID}</center></h1></div>
                <div>
                <Jumbotron>
                    <h1>Upload to the world</h1>
                    <p>
                        Share your knowledge with the Notepass Community
                    </p>
                    <p>
                        <Button variant="primary" href="/upload">Upload</Button>
                    </p>
                </Jumbotron>
                </div>
                <div>
                <CardGroup>
                    <Card>
                        <Card.Body>
                        <Card.Title>Explore our collection</Card.Title>
                        <Button variant="primary" href="/search">Search</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>Take Notes</Card.Title>
                        <Button variant="primary" href="/take">Notepad</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>View saved notes</Card.Title>
                        <Button variant="primary" href="/profile">Notebook</Button>
                        </Card.Body>
                    </Card>
                    {/* <Card>
                        <Card.Body>
                        <Card.Title>Manage</Card.Title>
                        <Card.Text>
                            Manage your Uploaded Notes
                        </Card.Text>
                        <Button variant="primary">Uploads</Button>
                        </Card.Body>
                    </Card> */}
                    </CardGroup>
                </div>
            </React.Fragment>
            
        );
    }
}

export default Home;
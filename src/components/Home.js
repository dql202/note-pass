import React from 'react';
import '../App.css';
import {Jumbotron,CardGroup,Card, Button} from 'react-bootstrap/';
import {Redirect} from 'react-router-dom';


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
                <div><h1><center>Hello Jon</center></h1></div>
                <div>
                <Jumbotron>
                    <h1>Upload to the world</h1>
                    <p>
                        Share your knowledge with the Notepass Community
                    </p>
                    <p>
                        <Button variant="primary">Upload</Button>
                    </p>
                </Jumbotron>
                </div>
                <div>
                <CardGroup>
                    <Card>
                        <Card.Body>
                        <Card.Title>Search</Card.Title>
                        <Card.Text>
                            Explore our collection
                        </Card.Text>
                        <Button variant="primary">Search</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>Take</Card.Title>
                        <Card.Text>
                            Take notes with our in-site editor
                            <br></br>
                        </Card.Text>
                        <Button variant="primary">Compose</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>Notebook</Card.Title>
                        <Card.Text>
                            View all your saved notes
                        </Card.Text>
                        <Button variant="primary">Profile</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>Manage</Card.Title>
                        <Card.Text>
                            Manage your Uploaded Notes
                        </Card.Text>
                        <Button variant="primary">Uploads</Button>
                        </Card.Body>
                    </Card>
                    </CardGroup>
                </div>
            </React.Fragment>
            
        );
    }
}

export default Home;
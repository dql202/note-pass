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
                            Explore a library compiled by students and professionals
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>Friends and Groups</Card.Title>
                        <Card.Text>
                            Find fellow classmates and friends and collaborate 
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>Manage</Card.Title>
                        <Card.Text>
                            Collect and manage all notes taken or discovered by you
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </CardGroup>
                </div>
            </React.Fragment>
            
        );
    }
}

export default Home;
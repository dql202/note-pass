/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { ListGroup, Accordion, Card, Button, Row, Col } from 'react-bootstrap/';
import './Profile.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/user/read/?userID=';
const DEFAULT_QUERY = '1b8c1e94-ab75-4398-90d6-e81ce4dda21c';
const NOTES_API='http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/all'
const NOTES_API2='http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/mine/?userID='
const SCHOOL_API='http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/?schoolID='


//Displays all uploaded and starred notes
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            schoolInfo: [],
        };
    }
    componentDidMount() {
        fetch(API + window.localStorage.userID)
          .then(response => response.json())
          .then(data => this.setState({ data:data }))
      }
    
    getSchool(id) {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/?schoolID="+ id
        fetch(url)
          .then(response => response.json())
          .then(data => this.setState({ schoolInfo:data }))
    }
    
    render() {
        const profile = this.state.data;
        this.getSchool(profile.schoolID)
        return (
            <ul>
                <h1><center>{profile.username}</center></h1> 
                <p><center>{this.state.schoolInfo.school}</center></p>

            </ul>
        );
    }
}
class Profile2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
      }
      componentDidMount() {
        fetch(NOTES_API2+window.localStorage.userID)
            .then(response => (response.json()))
            .then(data => this.setState({ data: data }));
    }
    render() {
        if (window.localStorage.getItem("userID") === "null") {
            return <Redirect to='/' />
        }
        return (
            <React.Fragment>
                <div>
                    <h2>My Uploaded Notes</h2>
                    <Accordion>
                        {
                            this.state.data.map((data, i) =>
                                <Card key={i}>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={i}>{data.topic}</Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={i}>
                                        <Card.Body>{data.time.slice(0, 10)} </Card.Body>
                                    </Accordion.Collapse>
                                </Card>)
                        }
                    </Accordion>
                </div>
            </React.Fragment>


        )
    }
}
class Profile3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
      }
      componentDidMount() {
        fetch(NOTES_API2+window.localStorage.userID)
            .then(response => (response.json()))
            .then(data => this.setState({ data: data }));
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <h2>My Starred Notes</h2>
                </div>
                <div>
                    <p>Coming Soon...</p>
                    {/* <ListGroup variant='flush' >
                        <ListGroup.Item action href="#link1">
                            New York University
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            CM 1004 A1
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link3">
                            Data Structures Study Group
                        </ListGroup.Item>
                    </ListGroup> */}
                </div>
            </React.Fragment> 




        )
    }
}
class ProfData extends React.Component {
    render() {
        // if (window.localStorage.getItem("userID") !== "") {
        //     return <Redirect to='/homepage' />
        // }
        return (
            <React.Fragment>
                <div>
                    <Profile />
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                <div >
                    <Row>
                        <Col >
                            <Profile2 />
                        </Col>
                        <Col>
                            <Profile3 />
                        </Col>
                        
                    </Row>
                    
                    <br></br>
                    <br></br>
                </div>
                {/* <div class="profile3">
                    <Profile3 />

                </div> */}

            </React.Fragment>

        );
    }
}

export default ProfData
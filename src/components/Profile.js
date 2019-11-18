/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap/';
import './Profile.css';
//import axios from 'axios';
import { Redirect } from 'react-router-dom';

const API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/user/read/?userID=';
const DEFAULT_QUERY = '1b8c1e94-ab75-4398-90d6-e81ce4dda21c';
const NOTES_API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/all'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            schoolInfo: [],
        };
    }
    componentDidMount() {
        fetch(API + DEFAULT_QUERY)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));



    }
    getSchoolInfo() {
        fetch('http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/?schoolID=' + this.state.data.schoolID)
            .then(response => response.json())
            .then(schoolInfo => this.setState({ schoolInfo: schoolInfo }));
    }
    render() {
        const prof = this.state.data;
        this.getSchoolInfo();
        return (
            <ul>
                <h1><center>{prof.username}</center></h1>

            </ul>
        );
        // return (
        //     <React.Fragment>
        //         <div>

        //             <center><img src={image} alt="avi"  class="avi"/></center>
        //             <h1><center>Jon</center></h1>
        //             <p><center>Student at New York University</center></p>
        //             <br />
        //             <br />
        //         </div>


        //     </React.Fragment>


        // )
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
        fetch(NOTES_API)
            .then(response => (response.json()))
            .then(data => this.setState({ data: data }));
    }
    //   componentDidMount() {
    //     fetch(NOTES_API)
    //       .then(response => response.json())
    //       .then(data => this.setState({ notes: data.map(item=>({
    //             topic:item.topic


    //       })
    //       )}));
    //   }
    render() {
        if (window.localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }
        return (
            <React.Fragment>
                <div>
                    <h2>Notes</h2>
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
    render() {
        return (
            <React.Fragment>
                <div>
                    <h2>Affliated Groups</h2>
                </div>
                <div>
                    <ListGroup variant='flush' >
                        <ListGroup.Item action href="#link1">
                            New York University
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            CM 1004 A1
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link3">
                            Data Structures Study Group
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </React.Fragment>




        )
    }
}
class ProfData extends React.Component {
    render() {
        if (window.localStorage.getItem("userID") !== "") {
            return <Redirect to='/homepage' />
        }
        return (
            <React.Fragment>
                <div>
                    <Profile />
                </div>
                <div class="profile2">
                    <Profile2 />
                    <br></br>
                    <br></br>
                </div>
                <div class="profile3">
                    <Profile3 />

                </div>

            </React.Fragment>

        );
    }
}

export default ProfData
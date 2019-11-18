import React from 'react'
import {Image,ListGroup,Accordion,Card, Button} from 'react-bootstrap/';
import { Redirect } from 'react-router-dom';

//import axios from 'axios';
const API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/user/read/?userID=';
const DEFAULT_QUERY = '1b8c1e94-ab75-4398-90d6-e81ce4dda21c';
const NOTES_API='http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/all'

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }
      componentDidMount() {
        fetch(NOTES_API)
            .then(response => (response.json()))
            .then(data => this.setState({ data:data }));
        }
    render() {
        if (localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1><center>Manage</center></h1>
                <Accordion>
                        {
                            this.state.data.map((data,i)=>
                            <Card key={i}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>{data.topic}</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body>
                                        {data.time.slice(0,10)}
                                        <p></p>
                                        <a href="#download">Download</a>
                                        <p></p>
                                        <a href="#delete">Delete</a>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>)
                        }
                     </Accordion>
            </div>
        )
    }
}

export default Manage
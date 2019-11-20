import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap/';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            downloadLink : "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/blob/?noteID=",
            deleteLink : "http://notepass.us-east-2.elasticbeanstalk.com/api/note/delete/?noteID="
        };
    }

    // Get all the notes uploaded by the user that is logged in.
    componentDidMount() {
        var url = 'http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/mine/?userID=';
        fetch(url + window.localStorage.getItem("userID"))
            .then(response => (response.json()))
            .then(data => this.setState({ data: data }));
    }

    // downloadNote(id) {
    //     const FileDownload = require('js-file-download');

    //     Axios.get(`http://localhost/downloadFile`)
    //         .then((response) => {
    //             FileDownload(response.data, 'report.csv');
    //         });
    // }

    render() {
        console.log(this.state.data)
        if (window.localStorage.getItem("userID") === "null") {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1><center>Manage</center></h1>
                <Accordion>
                    {this.state.data.map((data, i) =>
                            <Card key={i}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>{data.topic}</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body>
                                        {data.time.slice(0, 10)}
                                        <p></p>
                                        {console.log(this.state.downloadLink + data.noteID)}
                                        <a href={this.state.downloadLink + data.noteID} download="temp">Download</a>
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
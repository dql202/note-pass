import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap/';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            downloadLink: "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/blob/?noteID=",
            deleteLink: "http://notepass.us-east-2.elasticbeanstalk.com/api/note/delete/?noteID="
        };

        this.downloadTxtFile = this.downloadTxtFile.bind(this);
    }

    // Get all the notes uploaded by the user that is logged in.
    componentDidMount() {
        var url = 'http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/mine/?userID=';
        fetch(url + window.localStorage.getItem("userID"))
            .then(response => (response.json()))
            .then(data => this.setState({ data: data }));
    }

    downloadTxtFile = (event) => {

        axios.get(this.state.downloadLink + event.target.getAttribute('arg'))
            .then(res => {
                console.log(res)
                const element = document.createElement("a");
                const file = new Blob([res.data], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = "Note.txt";
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    render() {
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
                                    <button onClick={this.downloadTxtFile} arg={data.nodeID}>Download</button>
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
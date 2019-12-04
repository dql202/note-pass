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

        this.downloadPdfFile = this.downloadPdfFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    // Get all the notes uploaded by the user that is logged in.
    componentDidMount() {
        var url = 'http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/mine/?userID=';
        fetch(url + window.localStorage.getItem("userID"))
            .then(response => (response.json()))
            .then(data => this.setState({ data: data }));
    }

    downloadPdfFile = (event) => {
        var id = event.target.getAttribute('arg')
        console.log(this.state.downloadLink + id)
        axios({
            method: 'get',
            url: this.state.downloadLink + id,
            responseType: 'blob'
          }).then(res => {
                console.log(res)
                const element = document.createElement("a");
                const file = new Blob([res.data], { type: 'application/pdf' });
                console.log(file);
                element.href = URL.createObjectURL(file);
                window.open(element.href)
                //element.download = "Note";
                //document.body.appendChild(element);
                //element.click();
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    deleteFile = (event) => {
        var id = event.target.getAttribute('arg')
        axios.delete(this.state.deleteLink + id).then( res => {
            window.location.reload(true)
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
                                    <p>
                                        {"Date: " + data.time.slice(0, 10)}<br></br>
                                        {"Course: " + data.course}<br></br>
                                        {"Privacy: "}
                                        {(data.public) ? "Public" : "Private"}<br></br>
                                    </p>
                                    <button onClick={this.downloadPdfFile} arg={data.noteID}>Download</button>
                                    <button onClick={this.deleteFile} arg={data.noteID}>Delete</button><br></br>
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
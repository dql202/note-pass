/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap/';
import './Profile.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/user/read/?userID=';
const NOTES_API2 = 'http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/mine/?userID='
const STARRED_API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/starredBy/?userID='


//Displays all uploaded and starred notes
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            schoolInfo: [],
        };
        this.getProfile = this.getProfile.bind(this);
        this.getSchool = this.getSchool.bind(this);

        this.getProfile()
        this.getSchool(this.state.data.schoolID)
    }

    getProfile() {
        fetch(API + window.localStorage.userID)
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
    }

    getSchool(id) {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/?schoolID=" + id
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ schoolInfo: data }))
    }

    render() {
        const profile = this.state.data;
        console.log('profile');
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
            downloadLink: "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/blob/?noteID=",
            deleteLink: "http://notepass.us-east-2.elasticbeanstalk.com/api/note/delete/?noteID="
        };
        this.getData = this.getData.bind(this);
        this.downloadPdfFile = this.downloadPdfFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);

        this.getData();
    }

    getData() {
        fetch(NOTES_API2 + window.localStorage.userID)
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
            })}

    deleteFile = (event) => {
        var id = event.target.getAttribute('arg')
        axios.delete(this.state.deleteLink + id).then(res => {
            window.location.reload(true)
        })
    }

    render() {
        if (window.localStorage.getItem("userID") === "null") {
            return <Redirect to='/' />
        }
        console.log("In Profile2")
        return (
            <div>
                <h2>My Uploaded Notes</h2>
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

class Profile3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            downloadLink: "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/blob/?noteID="
        };
        this.downloadPdfFile = this.downloadPdfFile.bind(this);
        this.getData = this.getData.bind(this);

        this.getData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
    }

    getData() {
        fetch(STARRED_API + window.localStorage.userID)
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

    render() {
        console.log("In Profile3")
        return (
            <div>
                <h2>My Starred Notes</h2>
                <Accordion>
                    {
                        this.state.data.map((data, i) =>
                            <Card key={i}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>{data.topic}</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body>
                                        <p>
                                            {"Date: " + data.time.slice(0, 10)}<br></br>
                                            {"Course: " + data.course}<br></br>
                                        </p>
                                        <button onClick={this.downloadPdfFile} arg={data.noteID}>Download</button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>)
                    }
                </Accordion>
            </div>
        );
    }
}

class ProfData extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }

    render() {
        if (window.localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }
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
            </React.Fragment>
        );
    }
}

export default ProfData
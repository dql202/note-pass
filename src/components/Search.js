import React from 'react'
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Accordion, Button, Card, Row, Col } from 'react-bootstrap';

//Search our notes

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            profs: [],
            notes: [],
            courses: [],
            schools: [],
            school: "",
            professor: "",
            topic: "",
            professorSelected: false,
            schoolSelected: false,
            noteSelected: false
        }

        this.sendQuery = this.sendQuery.bind(this);
        this.handleChangeProfessor = this.handleChangeProfessor.bind(this)
        this.handleChangeSchool = this.handleChangeSchool.bind(this)
        this.handleChangeTopic = this.handleChangeTopic.bind(this)
        this.getSchools = this.getSchools.bind(this)
        this.getProfs = this.getProfs.bind(this)
        this.getTopics = this.getTopics.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.search= this.search.bind(this)
        this.clear= this.clear.bind(this)

    }

    // Call API with the current filters set.
    sendQuery() {

    }

    handleChangeSchool(option) {
        this.setState({
            school: option.value,
            schoolSelected: true,
            profs: this.getProfs(option.value)
        });
        window.sessionStorage.setItem("school",option.value)
        console.log("State.profs", this.state.profs)
    }

    handleChangeProfessor(option) {
        this.setState({
            professor: option.value,
            professorSelected: true,
            topics: this.getTopics(option.value)
        })
        window.sessionStorage.setItem("professor",option.value)
    }

    handleChangeTopic(option) {
        this.setState({
            topic: option.value,
            noteSelected: true
        })
        window.sessionStorage.setItem("topic",option.value)
    }
    getSchools() {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/all"
        var schools = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => schools.push({ "label": item.school, "value": item.schoolID }));
            })
        return schools
    }
    getProfs(id) {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/prof/read/from/?schoolID=" + id
        var profs = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => profs.push({ "label": item.name, "value": item.profID }));
            })
        return profs
    }
    getTopics(id) {
    
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/taughtBy/?profID=" + id + "&userID=" + window.localStorage.userID
        var topics = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => topics.push({ "label": item.topic, "value": item.noteID }));
            })
        console.log(topics)
        return topics
    }
    onSearch(e) {
        e.preventDefault()
        if (this.state.noteSelected) {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/?noteID=" + this.topic
            axios.get(url)
                .then(res => {
                    this.setState({ notes: res.data })
                })

        }
        else if (this.state.professorSelected) {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/taughtBy/?profID=" + this.professor + "&userID=" + window.localStorage.userID
            axios.get(url)
                .then(res => {
                    this.setState({ notes: res.data })
                })
        }
        else if (this.state.schoolSelected) {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/taughtAt/?schoolID=" + this.school + "&userID=" + window.localStorage.userID
            axios.get(url)
                .then(res => {
                    this.setState({ notes: res.data })
                })
        }
        else {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/visible/?userID=" + window.localStorage.userID
            axios.get(url)
                .then(res => {
                    this.setState({ notes: res.data })
                })
        }
        console.log(this.state.notes)
    }
    clear(){
        window.sessionStorage.removeItem("professor")
        window.sessionStorage.removeItem("school")
        window.sessionStorage.removeItem("topic")
        window.location.reload()

    }
    search() {

        if (window.sessionStorage.getItem("topic")!=null) {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/?noteID=" + window.sessionStorage.getItem("topic")
            axios.get(url)
                .then(res => {
                    this.setState({ notes: [res.data] })
                })

        }
        else if (window.sessionStorage.getItem("professor")!=null) {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/taughtBy/?profID=" + window.sessionStorage.getItem("professor") + "&userID=" + window.localStorage.userID
            axios.get(url)
                .then(res => {
                    this.setState({ notes: res.data })
                })
        }
        else if (window.sessionStorage.getItem("school")!=null) {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/taughtAt/?schoolID=" + window.sessionStorage.getItem("school") + "&userID=" + window.localStorage.userID
            axios.get(url)
                .then(res => {
                    this.setState({ notes: res.data })
                })
        }
        else {
            const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/visible/?userID=" + window.localStorage.userID
            axios.get(url)
                .then(res => {
                    this.setState({ notes: res.data })
                })
        }
    }
    render() {

        if (window.localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }
        this.search()
        var schools = this.getSchools()
        return (
            //Topic, Tag, School, Course, Professor, 
            <div>
                <Row>
                    <Col>
                    <form onSubmit={this.onSearch}>
                    {/* <h1>Upload your notes here</h1> */}
                    <div style={{ width: '400px' }}>
                        School:
                            <Select options={schools} onChange={this.handleChangeSchool} />
                        Professor:
                            <Select options={this.state.profs} onChange={this.handleChangeProfessor} disabled={this.state.schoolSelected ? null : true} />
                        Topic:
                            <Select options={this.state.topics} onChange={this.handleChangeTopic} disabled={this.state.professorSelected ? null : true} />
                    </div>
                    
                    </form>
                    <br></br>
                    <br></br>
                    <button onClick={this.clear}>Clear</button>
                    </Col>
                    <Col>
                        <Accordion >
                            {
                                this.state.notes.map((data, i) =>
                                    <Card key={i}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={i}>{data.topic}</Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={i}>
                                            <Card.Body>
                                                {data.time.slice(0, 10)}
                                                <br></br>
                                                <a href="#download">Download</a>
                                                <br></br>
                                                <a href="#save">Save</a>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>)
                            }
                        </Accordion>
                    </Col>
                </Row>
                
                <div>

                    
                </div>
            </div>
        )
    }
}

export default Search
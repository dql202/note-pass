import React from 'react'
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Accordion, Button, Card, Row, Col } from 'react-bootstrap';

//Search through the notes database

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            profs: [],
            schools : [],
            notes: [],
            courses: [],
            school: "",
            professor: "",
            topic: "",
            professorSelected: false,
            schoolSelected: false,
            noteSelected: false,
            downloadLink : "http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/blob/?noteID=",
            saveLink : "http://notepass.us-east-2.elasticbeanstalk.com/api/note/star"
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
        this.downloadPdfFile = this.downloadPdfFile.bind(this)
        this.saveTxtFile = this.saveTxtFile.bind(this)

        this.getSchools()
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
                this.setState({schools : schools })
            })        
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
    }
    
    //clears the current fields
    clear(){
        window.sessionStorage.removeItem("professor")
        window.sessionStorage.removeItem("school")
        window.sessionStorage.removeItem("topic")
        window.location.reload()

    }

    //displays notes based off which fields have been selected
    search() {
        if (window.sessionStorage.getItem("topic") != null) {
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

    saveTxtFile = (event) => {
        var id = event.target.getAttribute('arg')
        var params = {
            userID : window.localStorage.getItem("userID"),
            noteID : id
        }
        axios.post(this.state.saveLink, params)
            .then(res => {
                alert("This note is now saved to your profile")
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    render() {
        if (window.localStorage.getItem("userID") === null) {
            return <Redirect to='/' />
        }
        this.search()

        return (
            <div>
                <Row>
                    <Col>
                    <form onSubmit={this.onSearch}>
                       <div style={{ width: '400px' }}>
                        School:
                            <Select options={this.state.schools} onChange={this.handleChangeSchool} />
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
                                                <button onClick={this.downloadPdfFile} arg={data.noteID}>Download</button>
                                                <br></br>
                                                <button onClick={this.saveTxtFile} arg={data.noteID}>Save</button>
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
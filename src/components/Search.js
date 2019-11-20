import React from 'react'
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

//Search our notes

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic : [],
            profs : [],
            notes : [],
            courses : [],
            schools : []
        }

        this.sendQuery = this.sendQuery.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.handleChangeProfessor = this.handleChangeProfessor.bind(this)
        this.handleChangePublic = this.handleChangePublic.bind(this)
        this.handleChangeSchool = this.handleChangeSchool.bind(this)
        this.handleChangeTopic = this.handleChangeTopic.bind(this)
        this.getSchools = this.getSchools.bind(this)
        this.getProfs = this.getProfs.bind(this)

    }

    // Call API with the current filters set.
    sendQuery() {

    }

    handleChangeSchool(option) {
        this.setState({ school : option.value,
                        schoolSelected : true,
                        profs : this.getProfs(option.value)
        })
    }

    handleChangePublic(e) {
        this.setState({ isPublic: e.target.value })
    }

    handleChangeProfessor(option) {
        this.setState({ professor: option.value })
    }

    handleChangeCourse(e) {
        this.setState({ course: e.target.value })
    }

    handleChangeTopic(e) {
        this.setState({ topic: e.target.value })
    }
    getSchools() {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/all"
        var schools = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => schools.push({"label" : item.school, "value" : item.schoolID}));
            })
        return schools
    }
    getCourses(id) {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/course/read/from/?schoolID=" + id
        var courses = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => courses.push({"label" : item.school, "value" : item.schoolID}));
            })
        return courses
    }

    getProfs(id) {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/prof/read/from/?courseID=" + id
        var profs = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => profs.push({"label" : item.name, "value" : item.profID}));
            })
        return profs
    }
    getTopics(id) {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/notes/read/from/?profID=" + id
        var topics = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => topics.push({"label" : item.school, "value" : item.schoolID}));
            })
        return topics
    }
    
    render() {
        if (window.localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }
        var schools = this.getSchools()
        return (
            //Topic, Tag, School, Course, Professor, 
            <div>
                <div style={{ width: '250px' }}>
                    School:
                    <Select options={schools} onChange={this.handleChangeSchool} />
                    Course:
                    <Select options={schools} onChange={this.handleChangeSchool} />
                    Professor:
                    <Select options={this.state.profs} onChange={this.handleChangeProfessor} disabled={this.state.schoolSelected ? null : true}/>
                    Topic:
                    <Select options={this.state.profs} onChange={this.handleChangeProfessor} disabled={this.state.schoolSelected ? null : true}/>
                    {/* Topic:
                    <Select options={this.state.topic} onChange={this.handleChangeTopic} />
                    Tags:
                    <Select isMulti options={this.state.tags} onChange={this.handleChangeTag}/>                    
                    Schools:
                    <Select isMulti options={this.state.schools} 
                            onChange={this.handleChangeSchool} 
                            disabled={this.state.schoolSelected ? null : true}/> */}
                    
                </div>
                            
                <div>
                
                        {/* <Accordion>
                        {
                            this.state.notes.map((data,i)=>
                            <Card key={i}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>{data.topic}</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body>
                                        {data.time.slice(0,10)}
                                        <p>{data.time}</p>
                                        <br></br>
                                        <a href="#download">Download</a>
                                        <br></br>
                                        <a href="#save">Save</a>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>)
                        }
                        </Accordion> */}
                </div>
            </div>
        )
    }
}

export default Search
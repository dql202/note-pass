import React from 'react'
import "./Draft.css"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {Col,Row} from 'react-bootstrap';
import "./upload/Upload.css";

class Take extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            text: '' ,
            file: null,
            note: "",
            owner: "",
            school: "",
            isPublic: true,
            professor: "",
            course: "",
            topic: "",
            buttonStates: ["success", "secondary"],
            schoolSelected : false,
            profs : [],
            fileID : ""
        } 
        this.handleChange = this.handleChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.handleChangeProfessor = this.handleChangeProfessor.bind(this)
        this.handleChangePublic = this.handleChangePublic.bind(this)
        this.handleChangeSchool = this.handleChangeSchool.bind(this)
        this.handleChangeTopic = this.handleChangeTopic.bind(this)
        this.setPrivate = this.setPrivate.bind(this)
        this.setPublic = this.setPublic.bind(this)
        this.getSchools = this.getSchools.bind(this)
        this.getProfs = this.getProfs.bind(this)
      }
    
    handleChange(value) {
        this.setState({ text: value })
      }
       //Called when the user hits submit.
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        var url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/create"
        var params = {
            "ownerID": window.localStorage.getItem("userID"),
            "schoolID": this.state.school,
            "professorID": this.state.professor,
            "public": this.state.isPublic,
            "course": this.state.course,
            "topic": this.state.topic
        }
        var id = ""
        let state = this.state
        axios.post(url, params)
            .then(function (response) {
                id = response.data;
                state["noteID"] = id;
            })
            .then((resp) => {
                // Upload the file to the database
                const file = new Blob([this.state.text], { type: 'text/plain' });

                var url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/blob"
                const fileObj = new FormData();
                fileObj.append('file', file)
                fileObj.append("noteID", this.state.noteID)
                axios.post(url, fileObj)
                    .then(function (response) {
                        alert("Your file has been uploaded.")
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Store the file the user uploaded in a state variable
    handleFileChange = (event) => {
        this.setState({ file : event.target.files[0]})
    }

    // Called when the user selects a file to upload.
    handleChangeFile(e) {
        this.setState({ file: e.target.files[0] })
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

    setPrivate() {
        this.setState({ isPublic: false })
        this.setState({ buttonStates: ["secondary", "danger"] })
    }

    setPublic() {
        this.setState({ isPublic: true })
        this.setState({ buttonStates: ["success", "secondarye"] })
    }

    // Returns a list of schools from the database
    getSchools() {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/all"
        var schools = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => schools.push({"label" : item.school, "value" : item.schoolID}));
            })
        return schools
    }

    getProfs(id) {
        const url = "http://notepass.us-east-2.elasticbeanstalk.com/api/prof/read/from/?schoolID=" + id
        var profs = []
        axios.get(url)
            .then(res => {
                res.data.map((item) => profs.push({"label" : item.name, "value" : item.profID}));
            })
        return profs
    }


    render() {
        if (window.localStorage.getItem("userID") === "null") {
            return <Redirect to='/' />
        }
        var schools = this.getSchools()
        return (
            <React.Fragment>
                <div>
                <center>
                    <h1>Take Note of Something...
                    </h1>
                    <Row>
                        <Col>
                        <form onSubmit={this.onFormSubmit}>
                            <div style={{ width: '175px' }}>
                                School:
                                <Select options={schools} onChange={this.handleChangeSchool} />
                                    Professor:
                                <Select options={this.state.profs} onChange={this.handleChangeProfessor} disabled={this.state.schoolSelected ? null : true}/>
                            </div>
                            <label>Course:<br /><input type="text" value={this.state.course} onChange={this.handleChangeCourse} /></label><br />
                            <label>Topic:<br /><input type="text" value={this.state.topic} onChange={this.handleChangeTopic} /></label><br />
                            <Button variant={this.state.buttonStates[0]} onClick={this.setPublic}>Public</Button>
                            <Button variant={this.state.buttonStates[1]} onClick={this.setPrivate}>Private</Button><br /><br />
                            
                            <br></br>
                            <button className="submitButton" type="submit">Save note</button>
                        </form>
                        </Col>
                        <div className="textinfo">
                                <ReactQuill value={this.state.text}
                                onChange={this.handleChange} />
                            
                            </div>
                        <Col>

                        </Col>
                    </Row>
                    
                </center>
            </div>
            <div className="textpageWrapper">
                
                
            </div>
            </React.Fragment>

            

           
          
        )
      }
}

export default Take
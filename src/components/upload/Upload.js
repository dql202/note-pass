import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            note: "",
            owner: "",
            school: "",
            isPublic: true,
            professor: "",
            course: "",
            topic: "",
            buttonStates: ["primary", "secondary"],
            schoolSelected: false,
            profs: [],
            noteID: ""
        }

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
        this.sendBlob = this.sendBlob.bind(this)
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
            .then(function (resp) {
                var url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/blob"
                const fileObj = new FormData();
                fileObj.append('file', state.file)
                fileObj.append("noteID", state.noteID)
                axios.post(url, fileObj)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    sendBlob(id) {
        var url = "http://notepass.us-east-2.elasticbeanstalk.com/api/note/blob"
        const fileObj = new FormData();
        fileObj.append('file', this.state.file)
        fileObj.append("noteID", id)
        axios.post(url, fileObj)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // Store the file the user uploaded in a state variable
    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0] })
    }

    handleChangeSchool(option) {
        this.setState({
            school: option.value,
            schoolSelected: true,
            profs: this.getProfs(option.value)
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
        this.setState({ buttonStates: ["secondary", "primary"] })
    }

    setPublic() {
        this.setState({ isPublic: true })
        this.setState({ buttonStates: ["primary", "secondary"] })
    }

    // Returns a list of schools from the database
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

    render() {
        if (window.localStorage.getItem("userID") === "null") {
            return <Redirect to='/' />
        }
        var schools = this.getSchools()
        return (
            <div>
                <center>
                    <form onSubmit={this.onFormSubmit}>
                        <h1>Upload your notes here</h1>
                        <div style={{ width: '175px' }}>
                            School:
                            <Select options={schools} onChange={this.handleChangeSchool} />
                            Professor:
                            <Select options={this.state.profs} onChange={this.handleChangeProfessor} disabled={this.state.schoolSelected ? null : true} />
                        </div>
                        <label>Course:<br /><input type="text" value={this.state.course} onChange={this.handleChangeCourse} /></label><br />
                        <label>Topic:<br /><input type="text" value={this.state.topic} onChange={this.handleChangeTopic} /></label><br />
                        <Button variant={this.state.buttonStates[0]} onClick={this.setPublic}>Public</Button>
                        <Button variant={this.state.buttonStates[1]} onClick={this.setPrivate}>Private</Button><br /><br />
                        <input type="file" accept=".txt" name="upl" ref="file" onChange={this.handleFileChange} /><br /><br />
                        <button type="submit">Upload</button>
                    </form>
                </center>
            </div>
        )
    }
}

export default Upload
import React from 'react'
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

//Search our notes

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic : [],
            profs : [],
            tags : [],
            courses : [],
            schools : []
        }

        this.sendQuery = this.sendQuery.bind(this);
        this.handleChangeTag = this.handleChangeTag.bind(this);
        this.handleChangeTopic = this.handleChangeTopic.bind(this);

    }

    // Call API with the current filters set.
    sendQuery() {

    }

    handleChangeTag(e) {
        this.setState({ tags : e });
    }

    handleChangeTopic(e) {
        this.setState({ topic : e.value });
    }

    handleChangeSchool(e) {
        this.setState({ schools : e });
    }

    getSchools() {

    }

    getTags() {
        
    }

    handleCHangeSchool
    render() {
        if (window.localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }

        this.state.schools = this.getSchools();
        this.state.tags = this.getTags();
        return (
            //Topic, Tag, School, Course, Professor, 
            <div>
                <div style={{ width: '250px' }}>
                    Topic:
                    <Select options={this.state.topic} onChange={this.handleChangeTopic} />
                    Tags:
                    <Select isMulti options={this.state.tags} onChange={this.handleChangeTag}/>                    
                    Schools:
                    <Select isMulti options={this.state.schools} 
                            onChange={this.handleChangeSchool} 
                            disabled={this.state.schoolSelected ? null : true}/>
                    
                </div>
            </div>
        )
    }
}

export default Search
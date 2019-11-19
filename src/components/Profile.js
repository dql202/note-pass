/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import {ListGroup,Accordion,Card, Button} from 'react-bootstrap/';
import './Profile.css';
//import axios from 'axios';
const API = 'http://notepass.us-east-2.elasticbeanstalk.com/api/user/read/?userID=';
const DEFAULT_QUERY = '1b8c1e94-ab75-4398-90d6-e81ce4dda21c';
const NOTES_API='http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/all'
const NOTES_API2='http://notepass.us-east-2.elasticbeanstalk.com/api/note/read/visible/?userID='
const SCHOOL_API='http://notepass.us-east-2.elasticbeanstalk.com/api/school/read/?schoolID='

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          school: [],
        };
      }
      componentDidMount() {
        fetch(API + DEFAULT_QUERY)
          .then(response => response.json())
          .then(data => this.setState({ data:data }))
          .then(console.log(this.state.data.username))
          .then(
            fetch( SCHOOL_API+ this.state.data.schoolID)
            .then(response => response.json())
            .then(schoolInfo => this.setState({ school:schoolInfo.school }))
          );
        

        
      }
    //   getSchoolInfo(sid){
    //     fetch( SCHOOL_API+ sid)
    //       .then(response => response.json())
    //       .then(schoolInfo => this.setState({ schoolInfo:schoolInfo }));
    //   }
    render() {
        const prof = this.state.data;
        //console.log(this.state.schoolInfo)
        // this.getSchoolInfo(prof.schoolID);
        return (
        <ul>
            <h1><center>{prof.username}</center></h1>
            
        </ul>
        );
        // return (
        //     <React.Fragment>
        //         <div>
                    
        //             <center><img src={image} alt="avi"  class="avi"/></center>
        //             <h1><center>Jon</center></h1>
        //             <p><center>Student at New York University</center></p>
        //             <br />
        //             <br />
        //         </div>

                
        //     </React.Fragment>
            
            
        // )
    }
}
class Profile2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }
      componentDidMount() {
        fetch(NOTES_API2+DEFAULT_QUERY)
            .then(response => (response.json()))
            .then(data => this.setState({ data:data }));
        }
    //   componentDidMount() {
    //     fetch(NOTES_API)
    //       .then(response => response.json())
    //       .then(data => this.setState({ notes: data.map(item=>({
    //             topic:item.topic


    //       })
    //       )}));
    //   }
    render() {
        const notes = [{"id":{"$oid":"5dd0735efc13ae7e8f000000"},"topic":"Astro","professor":"Australian spiny anteater"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000001"},"topic":"S-Class","professor":"Nubian bee-eater"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000002"},"topic":"Diamante","professor":"Raccoon dog"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000003"},"topic":"Blazer","professor":"Red-tailed phascogale"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000004"},"topic":"Spyder","professor":"White-necked stork"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000005"},"topic":"CL-Class","professor":"Raccoon dog"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000006"},"topic":"S10","professor":"Goose, spur-winged"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000007"},"topic":"E150","professor":"Lizard, desert spiny"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000008"},"topic":"Neon","professor":"Groundhog"},
        {"id":{"$oid":"5dd0735efc13ae7e8f000009"},"topic":"S60","professor":"Dolphin, common"}]
        return (
            
            <React.Fragment>
                <div>
                    <h2>Notes</h2>
                    <Accordion>
                        {
                            this.state.data.map((data,i)=>
                            <Card key={i}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>{data.topic}</Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body>{data.time.slice(0,10)} </Card.Body>
                                </Accordion.Collapse>
                            </Card>)
                        }
                     </Accordion>
                 </div>
                
             </React.Fragment>
            
            
        )
    }
}
class Profile3 extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <h2>Affliated Groups</h2>
                </div>
                <div>
                    <ListGroup variant= 'flush' >
                        <ListGroup.Item action href="#link1">
                            New York University
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            CM 1004 A1
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link3">
                            Data Structures Study Group
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </React.Fragment>
            
            
            
            
        )
    }
}
class ProfData extends React.Component {
    render(){
       return (
        
        <React.Fragment>
            <div>
               <Profile />
            </div>
            <div className="profile2"> 
                <Profile2 />
                <br></br>
                <br></br>
            </div>
            <div className="profile3">
                <Profile3 />
                
            </div>
                
        </React.Fragment>
           
       );
       }
}

export default ProfData
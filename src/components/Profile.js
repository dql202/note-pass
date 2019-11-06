import React from 'react'
import {Image,ListGroup,Accordion,Card, Button} from 'react-bootstrap/';
import image from '../icon1.jpg'


class Profile extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    
                    <center><img src={image} alt="avi"  class="avi"/></center>
                    <h1><center>Jon</center></h1>
                    <p><center>Student at New York University</center></p>
                    <br />
                    <br />
                </div>

                
            </React.Fragment>
            
            
        )
    }
}
class Profile2 extends React.Component {
    render() {
        return (
            <React.Fragment>
                
                <div align="left">
                    <h2>Notes</h2>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">Chemistry Ch.1</Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Date: 11/2/19 Link:</Card.Body>
                             

                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">Data Structures Ch.4</Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>Date: 11/5/19 Link:</Card.Body>
                            </Accordion.Collapse>
                        </Card>
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
            <div >
                <Profile2 />
                <br></br>
                <br></br>
                <Profile3 />
                
            </div>
                
        </React.Fragment>
           
       );
       }
}

export default ProfData
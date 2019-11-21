import React from 'react';
import { Form, Button,Card,Accordion,Col } from 'react-bootstrap/';
import './UserLogIn.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import logo from '../logo.png';
import Select from 'react-select';

//Acts as both a sign up and sign in page
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated: false,
            nameLogin: "",
            passwordLogin: "",
            schoolID : "",
            isLoggedIn : false,
            passwordSignup : "",
            nameSignup : "",
            schools : [],
            emailSignup : ""
        };
        this.handleChangeNameLogin = this.handleChangeNameLogin.bind(this);
        this.handleChangePasswordLogin = this.handleChangePasswordLogin.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);

        this.handleChangeNameSignup = this.handleChangeNameSignup.bind(this);
        this.handleChangePasswordLogin = this.handleChangePasswordLogin.bind(this);
        this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
    }

    handleSubmitLogin = event => {
        event.preventDefault();
        event.stopPropagation();
        var url = "http://notepass.us-east-2.elasticbeanstalk.com/api/user/login/?name=" + this.state.nameLogin + "&password=" + this.state.passwordLogin;
        axios.get(url)
            .then(res => {
                if (res.data === "") {
                    alert("Unable to log you in. Try again.");                
                }
                else {
                    console.log(res.data)
                    window.localStorage.setItem("userID", res.data.username)
                    this.forceUpdate()
                }
            })
    }

    handleChangeNameLogin = event => {
        this.setState({ nameLogin: event.target.value });
    }

    handleChangePasswordLogin = event => {
        this.setState({ passwordLogin: event.target.value });
    }

    // Call API with information to store user into the database.
    handleSubmitSignup = event => {
        event.preventDefault();
        var url = "http://notepass.us-east-2.elasticbeanstalk.com/api/user/create"
        var params = {
            "email" : this.state.emailSignup,
            "schoolID" : this.state.school,
            "name" : this.state.nameSignup,
            "password" : this.state.passwordSignup
        }
        axios.post(url, params)
            .then(response => {
                console.log(response)
                window.localStorage.setItem("userID", response.data);
                alert("Your account has been created. You can now log in")
            })
            .catch(function (error) {
                window.localStorage.setItem("userID", null)
            });
        this.forceUpdate();
    }

    handleChangeNameSignup = event => {
        this.setState({ nameSignup: event.target.value });
    }

    handleChangePasswordSignup = event => {
        this.setState({ passwordSignup: event.target.value });
    }

    handleChangeEmailSignup = event => {
        this.setState({ emailSignup: event.target.value });
    }

    handleChangeSchoolSignup = event => {
        this.setState({ school : event.value });
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

    render() {
        if (window.localStorage.getItem("userID") !== "null") {
            return <Redirect to='/homepage' />
        }
        var schools = this.getSchools();
        return (
            <div className="loginWrapper">
                <img
                    src={logo}
                    width="180"
                    height="60"
                    className="d-inline-block align-top"
                    alt="logo"
                />
                <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Login
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmitLogin}>
                         <Form.Group controlId="formEmail">
                                 <Form.Label>User Email</Form.Label>
                                 <Form.Control
                                    required
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={this.handleChangeNameLogin}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your email.
								</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={this.handleChangePasswordLogin}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your password.
								</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">Log In</Button>
                        </Form>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>

                {/* Sign up accordian */}
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Sign Up
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                    <Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmitSignup}>
							<Form.Row>
								<Form.Group as={Col} controlId="formFirstName">
									<Form.Label>Username</Form.Label>
									<Form.Control
										required
										type="text"
                                        placeholder="username"
                                        onChange={this.handleChangeNameSignup}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your username
									</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>

							<Form.Group controlId="formEmailSignup">
								<Form.Label>Email</Form.Label>
                                <Form.Control 
                                    required type="email" 
                                    placeholder="Email" 
                                    onChange={this.handleChangeEmailSignup}/>
								<Form.Control.Feedback type="invalid">
									Please enter your email.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId="formSchool">
                                School
                            <Select options={schools} onChange={this.handleChangeSchoolSignup} />
							</Form.Group>

							<Form.Group controlId="formPasswordSignup">
								<Form.Label>Password</Form.Label>
								<Form.Control
									required
									type="password"
                                    placeholder="Password"
                                    onChange={this.handleChangePasswordSignup}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter your password.
								</Form.Control.Feedback>
							</Form.Group>

							<Button variant="primary" type="submit">Sign Up</Button>
						</Form>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
            </div>
        )
    }
}

export default Login
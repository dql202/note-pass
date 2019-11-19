import React from 'react';
import { Form, Button,Card,Accordion,Col } from 'react-bootstrap/';
import './UserLogIn.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import logo from '../logo.png'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated: false,
            name: "",
            password: "",
            isLoggedIn : false
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        var url = "http://notepass.us-east-2.elasticbeanstalk.com/api/user/login/?name=" + this.state.name + "&password=" + this.state.password;
        axios.get(url)
            .then(res => {
                if (res.data === "") {
                    alert("Unable to log you in. Try again.");                }
                else {
                    this.setState({ isLoggedIn : true });
                    this.forceUpdate()
                }
            })
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to='/homepage' />
        }
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
                        <Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmit}>
                         <Form.Group controlId="formEmail">
                                 <Form.Label>User Email</Form.Label>
                                 <Form.Control
                                    required
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={this.handleChangeName}
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
                                    onChange={this.handleChangePassword}
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
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Sign Up
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                    <Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmit}>
							<Form.Row>
								<Form.Group as={Col} controlId="formFirstName">
									<Form.Label>First name</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="First name"
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your first name
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group as={Col} controlId="formLastName">
									<Form.Label>Last name</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="Last name"
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your last name
									</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>

							<Form.Group controlId="formEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control required type="email" placeholder="Email" />
								<Form.Control.Feedback type="invalid">
									Please enter your email.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId="formPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									required
									type="password"
									placeholder="Password"
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
           



            // <div class="pageWrapper">
            //     <div class="centerWrapper">
            //         <div class="info">
            //             <h1>Login</h1>
            //             <Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmit}>
            //                 <Form.Group controlId="formEmail">
            //                     <Form.Label>User Email</Form.Label>
            //                     <Form.Control
            //                         required
            //                         type="email"
            //                         placeholder="Enter your email"
            //                         onChange={this.handleChangeName}
            //                     />
            //                     <Form.Control.Feedback type="invalid">
            //                         Please enter your email.
			// 					</Form.Control.Feedback>
            //                 </Form.Group>

            //                 <Form.Group controlId="formPassword">
            //                     <Form.Label>Password</Form.Label>
            //                     <Form.Control
            //                         required
            //                         type="password"
            //                         placeholder="Enter your password"
            //                         onChange={this.handleChangePassword}
            //                     />
            //                     <Form.Control.Feedback type="invalid">
            //                         Please enter your password.
			// 					</Form.Control.Feedback>
            //                 </Form.Group>
            //                 <Button variant="primary" type="submit">Log In</Button>
            //             </Form>
            //         </div>
            //     </div>
            // </div>

        )
    }
}

export default Login
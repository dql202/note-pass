import React from 'react';
import { Form, Button } from 'react-bootstrap/';
import './UserLogIn.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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
                    localStorage.setItem("userID", res.data.userID)
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
        if (localStorage.getItem("userID") !== "") {
            return <Redirect to='/homepage' />
        }
        return (
            <div class="pageWrapper">
                <div class="centerWrapper">
                    <div class="info">
                        <h1>Login</h1>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
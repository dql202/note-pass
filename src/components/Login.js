import React from 'react';
import {Form, FormControl, Button} from 'react-bootstrap/';
import './Login.css';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isValidated: false,
		};
	}

	handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({isValidated: true});
	}

	render() {
		return (
			<div class="pageWrapper">
				<div class="loginWrapper">
					<div class="loginInfo">
						<h1>Login</h1>
						<Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmit}>
							<Form.Group controlId="formEmail">
								<Form.Label>User Email</Form.Label>
								<Form.Control
									required
									type="email"
									placeholder="Enter your email"
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
import React from 'react';
import {Form, FormControl, Button, Col} from 'react-bootstrap/';
import './SignUp.css';


class SignUp extends React.Component {
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
				<div class="signupWrapper">
					<div class="signupInfo">
						<h1>SignUp</h1>
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
					</div>
				</div>
			</div>
		)
	}
}

export default SignUp
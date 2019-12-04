import React from 'react';
import {Form, Button, Col} from 'react-bootstrap/';
import './UserLogIn.css';


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
				<div class="centerWrapper">
					<div class="info">
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

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			renderLogin: false,
			renderSignUp: false,
		};
	}

	handleLogIn = event => {
		this.setState({renderLogin: true});
	}

	handleSignUp = event => {
		this.setState({renderSignUp: true});
	}

	handleChooseButton = event => {
		this.setState({renderLogin: false, renderSignUp: false});
		this.render();
	}



	render() {
		let logInBut = <LogInButton onClick={this.handleLogIn} />;
		let signUpBut = <SignUpButton onClick={this.handleSignUp} />;
		let backBut = <ChooseButton onClick={this.handleChooseButton} />;
		if (this.state.renderLogin) 
			return (
				<div>
					<Login/>
					{backBut}
				</div>
			);
		else if (this.state.renderSignUp) 
			return (
				<div>
					<SignUp/>
					{backBut}
				</div>
			);
		else {
			return (
				<div>
					<h1>Test</h1>
					{logInBut}
					{signUpBut}
				</div>
			);
		}
	}
}

function LogInButton(props) {
	return (
		<button onClick={props.onClick}>
			Log In
		</button>
	);
}

function SignUpButton(props) {
	return (
		<button onClick={props.onClick}>
			Sign Up
		</button>
	);
}

function ChooseButton(props) {
	return (
		<button onClick={props.onClick}>
			Back
		</button>
	);
}

export default Test
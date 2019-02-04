import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}
		console.log(newUser);

	}

  render() {
    return (
			<Container>
				<Row className="mt-5">
					<Col className="col-md-6 m-auto">
						<Card>
							<CardBody>
								<h1 className="text-center mb-3"><i className="fas fa-user-plus"></i> Register</h1>
								<Form onSubmit={this.onSubmit}>             
									<FormGroup>
											<Label for="name">Name</Label>
											<Input type="text" name="name" id="name" value={this.state.name} placeholder="Enter Name" onChange={this.onChange}></Input>
									</FormGroup>
									<FormGroup>
											<Label for="email">Email</Label>
											<Input type="email" name="email" id="email" value={this.state.email} placeholder="Enter Email" onChange={this.onChange}></Input>
									</FormGroup>
									<FormGroup>
											<Label for="password">Password</Label>
											<Input type="password" name="password" id="password" value={this.state.password} placeholder="Enter Password" onChange={this.onChange}></Input>
									</FormGroup>
									<FormGroup>
											<Label for="password">Confirm Password</Label>
											<Input type="password" name="password2" id="password2" value={this.state.password2} placeholder="Confirm Password" onChange={this.onChange}></Input>
									</FormGroup>
									<Button type="submit" color="primary" className="btn-block">Register</Button>
								</Form>
								<p className="lead mt-4">
										Have An Account? <Link to="/login">Login</Link>
								</p>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
    )
  }
}

export default Register;
import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

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
		
		axios.post('/api/users/register', newUser)
			.then(res => console.log(res.data))
			.catch(err => this.setState({errors: err.response.data}));

	}

  render() {
		const { errors } = this.state;

    return (
			<Container>
				<Row className="mt-5">
					<Col className="col-md-6 m-auto">
						<Card>
							<CardBody>
								<h1 className="text-center mb-3"><i className="fas fa-user-plus"></i> Register</h1>
								<Form noValidate onSubmit={this.onSubmit}>             
									<FormGroup>
											<Label for="name">Name</Label>
											<Input className={classnames({"is-invalid" : errors.name})} type="text" name="name" id="name" value={this.state.name} placeholder="Enter Name" onChange={this.onChange}></Input>
											{errors.name && <div className="invalid-feedback">{errors.name}</div>}
									</FormGroup>
									<FormGroup>
											<Label for="email">Email</Label>
											<Input className={classnames({"is-invalid" : errors.email})} type="email" name="email" id="email" value={this.state.email} placeholder="Enter Email" onChange={this.onChange}></Input>
											{errors.email && <div className="invalid-feedback">{errors.email}</div>}
									</FormGroup>
									<FormGroup>
											<Label for="password">Password</Label>
											<Input className={classnames({"is-invalid" : errors.password})} type="password" name="password" id="password" value={this.state.password} placeholder="Enter Password" onChange={this.onChange}></Input>
											{errors.password && <div className="invalid-feedback">{errors.password}</div>}
									</FormGroup>
									<FormGroup>
											<Label for="password">Confirm Password</Label>
											<Input className={classnames({"is-invalid" : errors.password2})} type="password" name="password2" id="password2" value={this.state.password2} placeholder="Confirm Password" onChange={this.onChange}></Input>
											{errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}

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
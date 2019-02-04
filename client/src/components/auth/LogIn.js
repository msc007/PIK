import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class LogIn extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = (e) => {
		e.preventDefault();

		const user = {
			email: this.state.email,
			password: this.state.password,
		}
		console.log(user);
	}

  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col className="col-md-6 m-auto">
            <Card>
              <CardBody>
                <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.onChange}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChange}></Input>
                  </FormGroup>
                  <Button type="submit" color="primary" className="btn-block">Login</Button>
                </Form>
                <p className="lead mt-4">
                	No Account? <Link to="/register">Register</Link>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LogIn;
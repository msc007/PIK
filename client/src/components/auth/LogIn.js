import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import classnames from 'classnames';

class LogIn extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	}

  componentDidMount = () => {
    //if user already loggedin than redirected to home
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }
	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = (e) => {
    e.preventDefault();
    
		const userData = {
			email: this.state.email,
			password: this.state.password,
    }
    
		this.props.signIn(userData);
	}

  render() {
    const { errors } = this.state;

    return (
      <Container>
        <Row className="mt-5">
          <Col className="col-md-6 m-auto">
            <Card>
              <CardBody>
                <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
                <Form noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input className={classnames({"is-invalid" : errors.email})} type="email" name="email" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.onChange}></Input>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input className={classnames({"is-invalid" : errors.password})} type="password" name="password" id="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChange}></Input>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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

//For type checking props
LogIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
//get updated state if any (i.e from other component)
const mapStateToProps = (state) => ({
	auth: state.auth,
  errors: state.errors
});
//dispatch an action event
const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (userData) => dispatch(signIn(userData))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
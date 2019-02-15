import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


class AppBar extends Component {
    //State
    state = {
        collapsed: true
    };
    //Collapsed menue handler
    toggleNavbar = () => {
        this.setState({
          collapsed: !this.state.collapsed
        });
    }
    //Logout button handler
    onClickLogout = (e) => {
        e.preventDefault();
        this.props.signOut();
    }
    //Render
    render() {
        const { isAuthenticated } = this.props.auth;

        const authLink = (
            <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/Create">Create New</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/logout" onClick={this.onClickLogout}><i className="fas fa-sign-out-alt"/> Logout</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        );

        const guestLink = (
            <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/login"><i className="fas fa-sign-in-alt"></i> Login</NavLink>
                    </NavItem>
                </Nav>
             </Collapse>
        );

        return (
            <Navbar className="navbar-expand-lg navbar-dark" color="primary" light>
                <NavbarBrand href="/" className="mr-auto"><i className="fa fa-trophy"></i> PIKU</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                {isAuthenticated ? authLink : guestLink}
            </Navbar>
        )
    }
}

//Checking Peoptypes 
AppBar.PropTypes = {
    signOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

//Connect redux state to this component's props
const mapStateToProps = (state) => ({
    auth: state.auth
});

//Set signOut action as  this component's props
const mapDispatchToProps = (dispatch) => {
	return {
        signOut: () => dispatch(signOut())
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
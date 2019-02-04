import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


class AppBar extends Component {
    state = {
        collapsed: true
    };

    toggleNavbar = () => {
        this.setState({
          collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <Navbar className="navbar-expand-lg navbar-dark" color="primary" light>
                <NavbarBrand href="/" className="mr-auto"><i className="fa fa-trophy"></i> PIKU</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/Create">Create New</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/logout"><i className="fas fa-sign-out-alt"/> Logout</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login"><i className="fas fa-sign-in-alt"></i> Login</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default AppBar;
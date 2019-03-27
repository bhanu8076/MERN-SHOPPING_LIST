import React, { Component, Fragment } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

//import the registration link into navbar
import RegisterModal from "./auth/RegisterModal";

//import the logout link
import Logout from "./auth/Logout";

//import the login link
import LoginModal from "./auth/LoginModal";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  //toggle for burger button: if the state is open then close it
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {/* if authenticated show different links */}
                {isAuthenticated ? authLinks : guestLinks}
                {/* <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <LoginModal />
                </NavItem> */}
                {/* <NavItem>
                  <Logout />
                </NavItem> */}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

//get auth out to be able to render differently if logged in
const mapStateToProps = state => ({
  auth: state.auth
});

// prettier-ignore
//get auth out to be able to render differently if logged in
export default connect(mapStateToProps, null) (AppNavbar);

//very similar to ItemModal

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearErrors } from "../../actions/errorActions";

//registration action, export it at bottom as prop (this.props.register)f
import { register } from "../../actions/authActions";
//import uuid from "uuid";
class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  //declare Prop Types for debugging purposes n stuff.
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  //whaen we map the error state to our props we want to see if it changed.
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        //can see this structure in chrome redux tools
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //if modal state is true (it is up)
    if (this.state.modal) {
      //if this.props.isAuthenticated is true, CLOSE MODAL
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      //this could be "name: this.target.value" but would have to create multiple onChange functions, this is dynamic so works for many forms:
      [e.target.name]: e.target.value
    });
  };

  //create the form submit handler
  onSubmit = e => {
    e.preventDefault();

    //destructure i.e. pull out of this.state
    const { name, email, password } = this.state;

    //Create user object
    const newUser = {
      name,
      email,
      password
    };

    //Attemppt to regsiter (register was mapped to props from state i think)
    this.props.register(newUser);
  };

  // prettier-ignore
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
          {/* check for errors */}
          { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }

            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  //= has to be state name
                  name="name"
                  id="name"
                  placeholder="Name"
                  //this fires off the function
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Label for="name">Email</Label>
                <Input
                  type="email"
                  //= has to be state name
                  name="email"
                  id="email"
                  placeholder="email"
                  //this fires off the function
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Label for="password">Password</Label>
                <Input
                  type="text"
                  //= has to be state password
                  name="password"
                  id="password"
                  placeholder="password"
                  //this fires off the function
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //same name as the root reducer in reducers index.js
  // once we register, if we're authenticated, we want to close the modal.
  isAuthenticated: state.auth.isAuthenticated,
  //error state so that we can output the error message
  error: state.error
});

// prettier-ignore
//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
export default connect(mapStateToProps,{ register, clearErrors })(RegisterModal);

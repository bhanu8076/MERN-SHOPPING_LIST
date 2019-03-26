import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
//import uuid from "uuid";
class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  toggle = () => {
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

    //create an item with an id and name
    const newItem = {
      //id: uuid(),
      name: this.state.name
    };

    //add item via the addItem Action
    this.props.addItem(newItem);

    //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{
            marginBottom: "2rem",
            marginLeft: "50%",
            transform: "translateX(-50%)"
          }}
          align="center"
          onClick={this.toggle}
          mx="auto"
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item" />
                <Input
                  type="text"
                  //= has to be state name
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  //this fires off the function
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
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
  //same name as the reducer in reducers index.js
  item: state.item
});

// prettier-ignore
//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
export default connect(mapStateToProps,{ addItem })(ItemModal);

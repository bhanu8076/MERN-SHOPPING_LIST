import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
import { connect } from "react-redux";
//when you bring in actions from Redux it's gonna be stored as a prop (this.props.getItems)
import { getItems, deleteItem } from "../actions/itemActions";
//whenever you have component properties you should put them inside of prop types,  which is a form of validation for the type of the prop.
import PropTypes from "prop-types";

class ShoppingList extends Component {
  //for now use static state, later can change to Redux

  //whenever you have component properties you should put them inside of prop types, which is a form of validation, we also add isRequired.
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    //item represents our state (it is a prop, but we're mapping it from the state), whicch is an object
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  //_id is what mongoDB calls it
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    //destructuring so you don't have to use this.state.items every time (we're "pulling" out items from this.props.item)
    const { items } = this.props.item;
    return (
      <Container>
        {/* <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            //for now use a prompt box to get the item
            const name = prompt("Enter Item");
            //check to see if that was filled
            if (name) {
              this.setState(state => ({
                //take the state items and add another item with random id and the name the user just input.
                items: [...state.items, { id: uuid(), name: name }]
              }));
            }
          }}
        >
          Add Item
        </Button> */}
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {/* we want the id and the name */}
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      //bind the id to this so that we can use it up there out of scope
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

// moved this into the class with static
// //whenever you have component properties you should put them inside of prop types, which is a form of validation, we also add isRequired.
// ShoppingList.propTypes = {
//   getItems: PropTypes.func.isRequired,
//   //item represents our state (it is a prop, but we're mapping it from the state), whicch is an object
//   item: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  //same name as the reducer in reducers index.js
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

// prettier-ignore
//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
export default connect(mapStateToProps,{ getItems, deleteItem })(ShoppingList);

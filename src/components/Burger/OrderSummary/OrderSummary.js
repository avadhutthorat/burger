import React, { Component } from "react";
import Aux from "../../../hoc/_Aux";
import classes from "./CheckoutButton.module.css";

class OrderSummary extends Component {
  // componentWillUpdate() {
  //   console.log("[OrderSummary] componant will update");
  // }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger along with following ingredients : </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price : Rs.{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout ?</p>
        <button className={classes.Danger} onClick={this.props.cancelled}>
          CANCEL
        </button>
        <button className={classes.Success} onClick={this.props.continued}>
          CONTINUE
        </button>
      </Aux>
    );
  }
}

export default OrderSummary;

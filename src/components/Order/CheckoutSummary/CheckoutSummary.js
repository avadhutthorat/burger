import React from "react";
import Burger from "../../Burger/Burger";
import btnclasses from "../../Burger/OrderSummary/CheckoutButton.module.css";
import classes from "./CheckoutSummary.module.css";
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>This taste Well</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <button className={btnclasses.Success} onClick={props.checkoutContinued}>
        Continue
      </button>
      <button className={btnclasses.Danger} onClick={props.checkoutCancelled}>
        Cancel
      </button>
    </div>
  );
};

export default checkoutSummary;

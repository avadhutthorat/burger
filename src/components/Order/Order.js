import React from "react";
import classes from "./Order.module.css";
const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          border: "1px solid #eee",
          margin: "0px 3px",
          padding: "5px"
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <div>
        <b>Ingredients </b>: {ingredientsOutput}
      </div>
      <div>
        <b>Bill Amount </b>: Rs {props.price.toFixed(2)}
      </div>
    </div>
  );
};

export default order;

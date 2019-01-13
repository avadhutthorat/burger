import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  // Check if Burger Contains any ingredients
  if (transformedIngredients.length === 0) {
    transformedIngredients = <h4>Please Add Some Ingredients</h4>;
  }

  return (
    <div className={classes.Burger}>
      <div className={classes.child}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    </div>
  );
};

export default burger;

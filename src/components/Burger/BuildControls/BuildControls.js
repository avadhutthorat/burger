import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Salad", type: "salad" }
];
const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <h3>
        Total Price : <strong>{props.price.toFixed(2)}</strong>
      </h3>

      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disableItem={props.disableItem[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;

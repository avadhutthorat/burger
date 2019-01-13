import React from "react";
import burgerLogo from "../../assests/Images/burger-logo.png";
import classes from "./Logo.module.css";
const logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="My Burger" />
    </div>
  );
};

export default logo;

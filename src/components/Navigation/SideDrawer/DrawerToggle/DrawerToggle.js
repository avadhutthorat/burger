import React from "react";
import classes from "./DrawerToggle.module.css";

const drawerToggle = props => {
  return (
    <div onClick={props.opened} className={classes.DrawerToggle}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default drawerToggle;

import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const navigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        activeClassName={classes.active}
        // onClick={{ transform: "translateX(-100vh)" }}
        exact
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;

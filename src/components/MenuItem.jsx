import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const MenuItem = ({ linkTo, classes, ...props }) => (
  <li className={classes.menuListItem}>
    <Link to={linkTo} className={classes.menuListAnchor} {...props}></Link>
  </li>
);

MenuItem.propTypes = {
  linkTo: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

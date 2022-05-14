import React from "react";
import PropTypes from "prop-types";
import { MenuItem } from "./components/MenuItem";
import { Link } from "react-router-dom";

/**
 *
 * @param {MenuProps} param0
 * @returns
 */
export const Menu = ({ classNames, ...props }) => {
  const classes = {
    menu: classNames.menu.join(" "),
    menuList: classNames.menuList.join(" "),
    menuListItem: classNames.menuListItem.join(" "),
    menuListAnchor: classNames.menuListAnchor.join(" "),
  };

  return (
    <div className={classes.menu} {...props}>
      <Link to="/" className="pure-menu-heading pure-menu-link">
        HOME
      </Link>
      <ul className={classes.menuList}>
        <MenuItem classes={classes} linkTo="/register">
          Register
        </MenuItem>
        <MenuItem classes={classes} linkTo="/login">
          Login
        </MenuItem>
        <MenuItem classes={classes} linkTo="/get">
          Get/Delete/Update
        </MenuItem>
      </ul>
    </div>
  );
};

Menu.propTypes = {
  classNames: PropTypes.object.isRequired,
};

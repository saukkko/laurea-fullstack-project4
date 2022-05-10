import React from "react";
import { MenuItem } from "./components/MenuItem";

export const Menu = ({ classNames, ...props }) => {
  const classes = {
    menu: classNames.menu.join(" "),
    menuList: classNames.menuList.join(" "),
    menuListItem: classNames.menuListItem.join(" "),
    menuListAnchor: classNames.menuListAnchor.join(" "),
  };

  /**
   *
   * @param {import("react").MouseEvent<HTMLAnchorElement>} evt
   */
  const handleClick = (evt) => {
    evt.preventDefault();
    evt.currentTarget.id;
  };

  return (
    <div className={classes.menu} {...props}>
      <ul className={classes.menuList}>
        <MenuItem classes={classes} onClick={handleClick} href="#" id="reg">
          Register
        </MenuItem>
        <MenuItem classes={classes} onClick={handleClick} href="#" id="login">
          Login
        </MenuItem>
        <MenuItem classes={classes} onClick={handleClick} href="#" id="get">
          Get/Update/Delete
        </MenuItem>
      </ul>
    </div>
  );
};

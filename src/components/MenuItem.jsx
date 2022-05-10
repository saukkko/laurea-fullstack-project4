import React from "react";
export const MenuItem = ({ classes, ...props }) => (
  <li className={classes.menuListItem}>
    <a {...props} className={classes.menuListAnchor} id="get"></a>
  </li>
);

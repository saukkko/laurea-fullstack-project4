import React, { useEffect } from "react";
import { Menu } from "./Menu";
import { Form } from "./Form";

export const App = () => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.className = classNames.body.join(" ");
  });

  const classNames = {
    body: ["bg-moccasin"],
    container: ["pure-g"],
    form: ["flex", "flex-col", "pure-u-2-3"],
    menu: ["pure-menu", "pure-menu-horizontal", "bg-whitesmoke"],
    menuList: ["pure-menu-list"],
    menuListItem: ["pure-menu-item"],
    menuListAnchor: ["pure-menu-link"],
  };

  return (
    <div className={classNames.container.join(" ")}>
      <div className="pure-u-1 max-w-sm mx-auto">
        <Menu classNames={classNames} />
        <h1 className="">Hello</h1>
        <Form action="#" method="post" className={classNames.form.join(" ")} />
      </div>
    </div>
  );
};

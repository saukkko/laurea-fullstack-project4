import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Menu } from "./Menu";
import { Page } from "./Page";

export const App = () => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.className = classNames.body.join(" ");
  });

  const classNames = {
    body: ["bg-whitesmoke"],
    container: ["pure-g"],
    header: ["font-bold", "font-open-sans", "my-2"],
    form: ["pure-form", "pure-form-stacked"],
    formInput: ["pure-input-1"],
    primaryButton: ["pure-button", "pure-button-primary"],
    secondaryButton: ["pure-button", "button-secondary"],
    errorButton: ["pure-button", "button-error"],
    menu: ["pure-menu", "pure-menu-horizontal", "flex", "justify-center"],
    menuList: ["pure-menu-list"],
    menuListItem: ["pure-menu-item"],
    menuListAnchor: ["pure-menu-link"],
  };

  return (
    <div className={classNames.container.join(" ")}>
      <div className="pure-u-1 max-w-md mx-auto">
        <header className="mb-2">
          <Menu classNames={classNames} />
        </header>
        <main>
          <Routes>
            <Route
              path="*"
              element={
                <span className={"text-lg " + classNames.header.join(" ")}>
                  Select function
                </span>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <span className={"text-lg " + classNames.header.join(" ")}>
                    Register
                  </span>
                  <Page
                    page={{ name: "Register", id: "register" }}
                    classNames={classNames}
                  />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <span className={"text-lg " + classNames.header.join(" ")}>
                    Login
                  </span>
                  <Page
                    page={{ name: "Login", id: "login" }}
                    classNames={classNames}
                  />
                </>
              }
            />
            <Route
              path="/get"
              element={
                <>
                  <span className={"text-lg " + classNames.header.join(" ")}>
                    Get/Delete/Update
                  </span>
                  <Page
                    page={{ name: "Get", id: "getdelupdate" }}
                    classNames={classNames}
                  />
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

import React from "react";

export const Button = ({ ...props }) => {
  return <input type="button" {...props} />;
};

export const TextInput = ({ ...props }) => {
  return <input type="text" {...props} />;
};

export const PasswordInput = ({ ...props }) => {
  return <input type="password" {...props} />;
};

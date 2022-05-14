import React from "react";
import PropTypes from "prop-types";

export const Button = ({ ...props }) => {
  return <input type="button" {...props} />;
};

export const TextInput = ({ errMsg, ...props }) => {
  return (
    <label>
      <span className="text-xs text-error">{errMsg}</span>
      <input type="text" {...props} />
    </label>
  );
};

export const PasswordInput = ({ errMsg, ...props }) => {
  return (
    <label>
      <span className="text-xs text-error">{errMsg}</span>
      <input type="password" {...props} />
    </label>
  );
};

const inputPropTypes = {
  errMsg: PropTypes.string,
};

TextInput.propTypes = inputPropTypes;
PasswordInput.propTypes = inputPropTypes;

import React from "react";
import PropTypes from "prop-types";
import { TextInput, PasswordInput, Button } from "./components/Inputs";

export const Fields = ({
  page,
  formData,
  classes,
  handleChange,
  hasErrors,
  errors,
  disabledButtons,
}) => {
  const props = {
    page,
    formData,
    classes,
    handleChange,
    hasErrors,
    errors,
    disabledButtons,
  };

  if (page.id == "register") return <Register {...props} />;
  if (page.id == "login") return <Login {...props} />;
  if (page.id == "getdelupdate") return <GetDelUpdate {...props} />;
};

const Register = (props) => {
  const { page, formData, classes, handleChange, hasErrors, errors } = props;
  return (
    <>
      <TextInput
        name="name"
        placeholder="Full name"
        className={classes.input}
        onChange={handleChange}
        value={formData.name}
        errMsg={errors.name}
        required
      />
      <TextInput
        name="username"
        placeholder="Username"
        className={classes.input}
        onChange={handleChange}
        value={formData.username}
        errMsg={errors.username}
        required
      />
      <PasswordInput
        name="plaintext"
        placeholder="Password"
        className={classes.input}
        onChange={handleChange}
        value={formData.plaintext}
        errMsg={errors.plaintext}
        required
      />
      <PasswordInput
        name="plaintext-verify"
        placeholder="Verify password"
        className={classes.input}
        onChange={handleChange}
        value={formData.plaintextVerify}
        errMsg={errors.plaintextVerify}
        required
      />
      <div className="flex flex-row gap-2 my-1">
        <Button
          disabled={hasErrors}
          className={classes.primaryButton}
          type="submit"
          value={page.name}
        />
        <Button
          className={classes.secondaryButton}
          type="reset"
          value="Reset"
        />
      </div>
    </>
  );
};

const Login = (props) => {
  const { page, formData, classes, handleChange, hasErrors, errors } = props;
  return (
    <>
      <TextInput
        name="username"
        placeholder="Username"
        className={classes.input}
        onChange={handleChange}
        value={formData.username}
        errMsg={errors.username}
        required
      />
      <PasswordInput
        name={"plaintext"}
        placeholder="Password"
        className={classes.input}
        onChange={handleChange}
        value={formData.plaintext}
        errMsg={errors.plaintext}
        required
      />
      <div className="flex flex-row gap-2 my-1">
        <Button
          className={classes.primaryButton}
          type="submit"
          value={page.name}
          disabled={hasErrors}
        />
        <Button
          className={classes.secondaryButton}
          type="reset"
          value="Reset"
        />
      </div>
    </>
  );
};

const GetDelUpdate = (props) => {
  const {
    formData,
    classes,
    handleChange,
    hasErrors,
    errors,
    disabledButtons,
  } = props;
  return (
    <>
      <TextInput
        name="id"
        placeholder="ID"
        className={classes.input}
        onChange={handleChange}
        value={formData.id}
        errMsg={errors.id}
      />
      <TextInput
        name="name"
        placeholder="Full name"
        className={classes.input}
        onChange={handleChange}
        value={formData.name}
        errMsg={errors.name}
      />
      <div className="flex flex-row gap-2 my-1">
        <Button
          className={classes.primaryButton}
          type="submit"
          id="get"
          value="Get"
          disabled={hasErrors || disabledButtons.includes("get")}
        />
        <Button
          className={classes.primaryButton}
          type="submit"
          id="update"
          value="Update"
          disabled={hasErrors || disabledButtons.includes("update")}
        />
        <Button
          className={classes.errorButton}
          type="submit"
          id="delete"
          value="Delete"
          disabled={hasErrors || disabledButtons.includes("delete")}
        />

        <Button
          className={classes.secondaryButton}
          type="reset"
          value="Reset"
        />
      </div>

      <Separator text="OR" />
      <Button
        className={classes.primaryButton}
        type="submit"
        id="getall"
        value="Get all"
      />
    </>
  );
};

const Separator = ({ text }) => (
  <div className="flex items-center py-2">
    <span className="flex-1 h-0.5 p-0 bg-black"></span>
    <span className="text-lg px-2">{text}</span>
    <span className="flex-1 h-0.5 p-0 bg-black"></span>
  </div>
);

Separator.propTypes = { text: PropTypes.string.isRequired };

Fields.propTypes = {
  formData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  hasErrors: PropTypes.bool,
  errors: PropTypes.object,
  disabledButtons: PropTypes.arrayOf(PropTypes.string),
};

Register.propTypes = Fields.propTypes;
Login.propTypes = Fields.propTypes;
GetDelUpdate.propTypes = Fields.propTypes;

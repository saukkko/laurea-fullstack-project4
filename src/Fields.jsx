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
}) => {
  const props = { page, formData, classes, handleChange, hasErrors, errors };

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
  const { page, formData, classes, handleChange } = props;
  return (
    <>
      <TextInput
        className={classes.input}
        name="username"
        onChange={handleChange}
        value={formData.username}
        placeholder="Username"
        required
      />
      <PasswordInput
        className={classes.input}
        name={"plaintext"}
        onChange={handleChange}
        value={formData.plaintext}
        placeholder="Password"
        required
      />
      <div className="flex flex-row gap-2 my-1">
        <Button
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

const GetDelUpdate = (props) => {
  const { formData, classes, handleChange } = props;
  return (
    <>
      <TextInput
        className={classes.input}
        name="id"
        onChange={handleChange}
        value={formData.id}
        placeholder="ID"
      />
      <TextInput
        className={classes.input}
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="Full name"
      />
      <div className="flex flex-row gap-2 my-1">
        <Button
          className={classes.primaryButton}
          type="submit"
          id="getall"
          value="Get all"
        />
        <Button
          className={classes.primaryButton}
          type="submit"
          id="get"
          value="Get"
        />
        <Button
          className={classes.primaryButton}
          type="submit"
          id="update"
          value="Update"
        />
        <Button
          className={classes.errorButton}
          type="submit"
          id="delete"
          value="Delete"
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

Fields.propTypes = {
  formData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  hasErrors: PropTypes.bool,
  errors: PropTypes.object,
};

Register.propTypes = Fields.propTypes;
Login.propTypes = Fields.propTypes;
GetDelUpdate.propTypes = Fields.propTypes;

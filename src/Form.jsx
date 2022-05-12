import React, { useRef, useState } from "react";
import { Button, PasswordInput, TextInput } from "./components/Input";
import { Rest } from "./util/Rest";

/**
 *
 * @returns {[Error[], (newError: Error) => void, () => void]}
 */

export const Form = ({ ...props }) => {
  const formInit = {
    name: "",
    username: "",
    plaintext: "",
    plaintextVerify: "",
  };
  const [formData, setFormData] = useState(formInit);
  const [hasErrors, setHasErrors] = useState(true);

  const errorInit = { nameErr: "", usernameErr: "", passwordErr: "" };
  const errorRef = useRef(errorInit);

  const classNames = {
    input: ["pure-input-1"],
  };

  /**
   *
   * @param {import("react").ChangeEvent<HTMLInputElement>} evt
   */
  const handleChange = async (evt) => {
    let { name, username, plaintext, plaintextVerify } = formData;
    if (evt.target.name === "name") name = evt.target.value;
    if (evt.target.name === "username") username = evt.target.value;
    if (evt.target.name === "plaintext") plaintext = evt.target.value;
    if (evt.target.name === "plaintext-verify")
      plaintextVerify = evt.target.value;

    setFormData({
      name: name,
      username: username.trim(),
      plaintext: plaintext,
      plaintextVerify: plaintextVerify,
    });
    validateForm();
  };

  const validateForm = () => {
    setHasErrors(false);
    errorRef.current = errorInit;

    if (formData.name.length < 3) {
      setHasErrors(true);
      errorRef.current.nameErr = "- Minimum length is three characters";
    }
    if (formData.username.length < 3) {
      setHasErrors(true);
      errorRef.current.usernameErr = "- Minimum length is three characters";
    }
    if (!formData.username.match(/[\x21-\x7E]+/g)) {
      setHasErrors(true);
      errorRef.current.usernameErr +=
        "\n- Only valid ascii characters are allowed (must match regexp '/[\\x21-\\x7E]+/')";
    }
    if (formData.plaintext !== formData.plaintextVerify) {
      setHasErrors(true);
      errorRef.current.passwordErr = "Passwords don't match";
    }
  };

  /**
   *
   * @param {import("react").FormEvent<HTMLFormElement>} evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateForm();

    if (hasErrors) return;

    Rest.add({
      name: formData.name,
      username: formData.username,
      plaintext: formData.plaintext,
    }).then((data) => console.log(data));

    setFormData({ name: "", username: "", plaintext: "", plaintextVerify: "" });
    setHasErrors(true);
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      <TextInput
        className={classNames.input.join(" ")}
        name="name"
        onChange={handleChange}
        onBlur={handleChange}
        value={formData.name}
        placeholder="Full name"
        required
      />
      <TextInput
        className={classNames.input.join(" ")}
        name="username"
        onChange={handleChange}
        onBlur={handleChange}
        value={formData.username}
        placeholder="Username"
        required
      />
      <PasswordInput
        className={classNames.input.join(" ")}
        name="plaintext"
        onChange={handleChange}
        onBlur={handleChange}
        value={formData.plaintext}
        placeholder="Password"
        required
      />
      <PasswordInput
        className={classNames.input.join(" ")}
        name="plaintext-verify"
        onChange={handleChange}
        onBlur={handleChange}
        value={formData.plaintextVerify}
        placeholder="Verify password"
        required
      />

      <Button
        className={
          hasErrors
            ? "pure-button cursor-not-allowed"
            : "pure-button pure-button-primary"
        }
        type="submit"
        value="Register"
        disabled={hasErrors}
      />
      <Button
        className="pure-button button-secondary"
        type="reset"
        value="Reset"
      />
    </form>
  );
};

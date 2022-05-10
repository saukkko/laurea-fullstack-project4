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
        className="my-1"
        name="name"
        placeholder="Full name"
        onChange={handleChange}
        onBlur={handleChange}
        onFocus={handleChange}
        value={formData.name}
      />
      <TextInput
        className="my-1"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        onBlur={handleChange}
        onFocus={handleChange}
        value={formData.username}
      />
      <PasswordInput
        className="my-1"
        name="plaintext"
        onChange={handleChange}
        onBlur={handleChange}
        onFocus={handleChange}
        value={formData.plaintext}
        placeholder="Password"
      />
      <PasswordInput
        className="my-1"
        name="plaintext-verify"
        onChange={handleChange}
        onBlur={handleChange}
        onFocus={handleChange}
        value={formData.plaintextVerify}
        placeholder="Verify password"
      />

      <Button
        className={hasErrors ? "" : ""}
        type="submit"
        value="Register"
        disabled={hasErrors}
      />
    </form>
  );
};

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Fields } from "./Fields";
import { Rest } from "./util/Rest";

export const Form = ({ page, classNames, ...props }) => {
  const formInit = {
    id: "",
    name: "",
    username: "",
    plaintext: "",
    plaintextVerify: "",
  };
  const [formData, setFormData] = useState(formInit);
  const [errors, setErrors] = useState(formInit);
  const [hasErrors, setHasErros] = useState(true);
  const [apiResponse, setApiResponse] = useState({});

  const classes = {
    form: classNames.form.join(" "),
    input: classNames.formInput.join(" "),
    primaryButton: classNames.primaryButton.join(" "),
    secondaryButton: classNames.secondaryButton.join(" "),
    errorButton: classNames.errorButton.join(" "),
  };

  const handleChange = (evt) => {
    let { id, name, username, plaintext, plaintextVerify } = formData;
    const target = evt.target;

    if (target.name === "id") id = target.value;
    if (target.name === "name") name = target.value;
    if (target.name === "username") username = target.value.trim();
    if (target.name === "plaintext") plaintext = target.value;
    if (target.name === "plaintext-verify") plaintextVerify = target.value;

    validateInput({ id, name, username, plaintext, plaintextVerify });

    setFormData({
      id: id,
      name: name,
      username: username,
      plaintext: plaintext,
      plaintextVerify: plaintextVerify,
    });
  };

  const handleReset = (evt) => {
    evt.preventDefault();
    setFormData(formInit);
    setHasErros(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateInput(formData);

    if (hasErrors) return;
    const submitter = evt.nativeEvent.submitter;

    switch (page.id) {
      case "register":
        Rest.add({
          name: formData.name,
          username: formData.username,
          plaintext: formData.plaintext,
        }).then((data) => {
          setApiResponse(data);
          console.log(data);
        });
        break;

      case "login":
        Rest.login({
          username: formData.username,
          plaintext: formData.plaintext,
        }).then((data) => {
          setApiResponse(data);
          console.log(data);
        });
        break;

      case "getdelupdate":
        switch (submitter.id) {
          case "getall":
            Rest.getAll().then((data) => {
              setApiResponse(data);
              console.log(data);
            });
            break;

          case "get":
            Rest.get(formData.id).then((data) => {
              setApiResponse(data);
              console.log(data);
            });
            break;

          case "update":
            Rest.update(formData.id, { name: formData.name }).then((data) => {
              setApiResponse(data);
              console.log(data);
            });
            break;

          case "delete":
            Rest.delete(formData.id).then((data) => {
              setApiResponse(data);
              console.log(data);
            });
            break;

          default:
            break;
        }
        break;
      default:
        break;
    }

    setFormData(formInit);
  };

  const validateInput = (data) => {
    setHasErros(false);

    if (data.name.length < 3) {
      setErrors({ ...errors, name: "Name must be at least 3 characters" });
      setHasErros(true);
    } else setErrors({ ...errors, name: "" });

    if (data.username.match(/\s/g) || !data.username.match(/[\x21-\x7E]+/g)) {
      setErrors({ ...errors, username: "Only ascii with no whitespace" });
      setHasErros(true);
    } else setErrors({ ...errors, username: "" });
  };

  return (
    <>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
        action="#"
        method="POST"
        {...props}
      >
        <Fields
          page={page}
          formData={formData}
          classes={classes}
          handleChange={handleChange}
          hasErrors={hasErrors}
          errors={errors}
        />
      </form>
      <RawView apiResponse={apiResponse} />
    </>
  );
};

const RawView = ({ apiResponse }) => {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <>
      <p
        onClick={() => setShowRaw(!showRaw)}
        className="cursor-pointer text-xs underline mt-4"
      >
        Toggle raw
      </p>
      <div
        hidden={!showRaw}
        className="bg-whitesmoke shadow-lg p-2 m-0 md:my-2 md:rounded-lg"
      >
        <pre className="font-roboto-mono text-sm overflow-scroll">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      </div>
    </>
  );
};

RawView.propTypes = {
  apiResponse: PropTypes.object,
};

Form.propTypes = {
  page: PropTypes.object.isRequired,
  classNames: PropTypes.object.isRequired,
};

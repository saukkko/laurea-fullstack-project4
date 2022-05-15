import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Fields } from "./Fields";
import { Table } from "./Table";
import { Rest } from "./util/Rest";

export const Page = ({ page, classNames, ...props }) => {
  const formInit = {
    id: "",
    name: "",
    username: "",
    plaintext: "",
    plaintextVerify: "",
  };
  const disabledInit = ["get", "update", "delete"];
  const [formData, setFormData] = useState(formInit);
  const [errorMessages, setErrorMessages] = useState(formInit);
  const hasErrors = useRef(true);
  const [apiResponse, setApiResponse] = useState({});
  const [disabledButtons, setDisabledButtons] = useState(disabledInit);

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
    setErrorMessages(formInit);
    hasErrors.current = true;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const submitter = evt.nativeEvent.submitter;

    if (submitter.id !== "getall") validateInput(formData);
    if (submitter.id !== "getall" && hasErrors.current) return;
    hasErrors.current = true;

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
    let errors = errorMessages;
    let disabled = disabledButtons;

    // handle each page validation separately based on which site we are currently
    /* Register page */
    if (page.id === "register") {
      if (data.name && data.name.length < 3) {
        errors = { ...errors, name: "Name must be at least 3 characters" };
      } else {
        errors = { ...errors, name: "" };
      }

      if (
        data.username &&
        (data.username.match(/\s/g) || !data.username.match(/[\x21-\x7E]+/g))
      ) {
        errors = {
          ...errors,
          username: "Only ascii characters with no whitespace",
        };
      } else {
        errors = { ...errors, username: "" };
      }

      if (data.plaintext && data.plaintext.length < 6) {
        errors = { ...errors, plaintext: "Minimum length is 6 characters" };
      } else {
        errors = { ...errors, plaintext: "" };
      }

      if (data.plaintextVerify && data.plaintextVerify !== formData.plaintext) {
        errors = { ...errors, plaintextVerify: "Passwords don't match" };
      } else {
        errors = { ...errors, plaintextVerify: "" };
      }
    }

    /* Login page */
    if (page.id === "login") {
      if (!data.username) {
        errors = { ...errors, username: "Field cannot be empty" };
      } else {
        errors = { ...errors, username: "" };
      }
      if (!data.plaintext) {
        errors = { ...errors, plaintext: "Field cannot be empty" };
      } else {
        errors = { ...errors, plaintext: "" };
      }
    }

    /* Get/Delete/Update page */
    if (page.id === "getdelupdate") {
      if (!data.id && !data.name) {
        const msg = "Both fields can't be empty";
        errors = { ...errors, id: msg, name: msg };
      } else {
        errors = { ...errors, id: "", name: "" };
      }
      if (!data.id) disabled = disabledInit;
      else disabled = [];
      if (!data.name) disabled = ["update"];
      else disabled = [...disabled];
    }

    setErrorMessages(errors);
    setDisabledButtons(disabled);
    hasErrors.current = !Object.values(errors).every((val) => val === "");
  };

  return (
    <div>
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
          hasErrors={hasErrors.current}
          errors={errorMessages}
          disabledButtons={disabledButtons}
        />
      </form>
      <RawView apiResponse={apiResponse} />
      <Table rawData={apiResponse} />
    </div>
  );
};

const RawView = ({ apiResponse }) => {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div>
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
    </div>
  );
};

RawView.propTypes = {
  apiResponse: PropTypes.object,
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
  classNames: PropTypes.object.isRequired,
};

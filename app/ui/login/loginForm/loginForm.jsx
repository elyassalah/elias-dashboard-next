"use client";
import React, { useState } from "react";
import styles from "./loginForm.module.css";
import { authenticate } from "../../../lib/actions";
import { useFormState } from "react-dom";
const LoginForm = () => {
  // const [err, setError] = useState();
  // const handleLogin = async (formData) => {
  //   const data = await authenticate(formData);
  //   data.error && setError(data.error);
  // };
  // another way to handle error in form
  // and also if we disable the javascript in browser its also work the handle
  // with the same handle you TODO: can make the else component like add user add product with the same handle error
  // and show it bellow with make it client component
  // -- useFormState it take the function the work with state and the initial state we make it (undefined)
  const [state, formAction] = useFormState(authenticate, undefined);
  return (
    <form
      action={formAction}
      className={styles.form}
    >
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        // should use name to can use it in form data in actions
        name="username"
      />
      <input
        type="password"
        placeholder="password"
        name="password"
      />
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;

import React from "react";
import styles from "../ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
const LoginPage = () => {
  /* 
  cause we use the form inside server component so its not possible to catch the error and show it so 
  we create t error layer in app , and make the login form in component and make it client
  */
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

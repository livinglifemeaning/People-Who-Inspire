import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import classes from "../../styles/AuthHome.module.css";
import logostyle from "../../styles/Logo.module.css";
import { useRouter } from "next/router";

const AuthHome = () => {
  const [signingUp, setSigningUp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  

  const closeModals = () => {
    setLoggingIn(false);
    setSigningUp(false);
  };

  const openSignUp = () => {
    setLoggingIn(false);
    setSigningUp(true);
  };

  const openLogin = () => {
    setSigningUp(false);
    setLoggingIn(true);
  };
  return (
    <>
      <div className={classes.authpage}>
        <div className={classes.nav}>
          <p className={`${logostyle.logo} ${logostyle.white}`}>
            people who inspire me
          </p>
          <ul className={classes.appOptions}>
            <li onClick={openLogin}>Login</li>
            <li onClick={openSignUp}>Sign up</li>
          </ul>
        </div>
        <div onClick={closeModals} className={classes.body}>
          <h1 className={classes.heading}>
            Be reminded of those who make your life a bit more
            <span>inspirational</span>
          </h1>
          <img
            className={classes.heroImage}
            src="/hero-image.png"
            alt="Example Page"
          />
        </div>
      </div>
      {signingUp && <SignUp />}
      {loggingIn && <Login />}
    </>
  );
};

export default AuthHome;

import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import classes from "../../styles/AuthHome.module.css"

const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const {GoogleLogin, login}  = useAuth(); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError("");
        setLoading(true);
        login(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        console.log(error)
        setError("Failed to sign in");
      }
      setLoading(false);
    };
  
    return (
      <div className={classes.modal}>
        <h2 className={classes.modalHeading}>Login to your account</h2>
        <div onClick={GoogleLogin} className={classes.googleSignIn}>
          <p className={classes.signInOption}>Login with Google</p>
          <img src="/google-logo.png" alt="" />
        </div>
        <p className={classes.signInOption}>Login with email</p>
        {error && <p>{error}</p>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <label className={classes.label} htmlFor="email">
            Email
          </label>
          <input
            className={classes.input}
            name="email"
            id="email"
            type="email"
            ref={emailRef}
            required
          />
  
          <label className={classes.label} htmlFor="password">
            Password
          </label>
          <input
            className={classes.input}
            name="password"
            id="password"
            type="password"
            ref={passwordRef}
            required
          />
  
  
          <button className={classes.formBtn} disabled={loading} type="submit">
            Login
          </button>
        </form>
      </div>
    );
  };
export default Login

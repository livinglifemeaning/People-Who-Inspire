import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import classes from "../../styles/AuthHome.module.css";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, GoogleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div className={classes.modal}>
      <h2 className={classes.modalHeading}>Create an account</h2>
      <div onClick={GoogleLogin} className={classes.googleSignIn}>
        <p className={classes.signInOption}>Sign up with Google</p>
        <img src="/google-logo.png" alt="" />
      </div>
      <p className={classes.signInOption}>Or, sign up with email</p>
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

        <label className={classes.label} htmlFor="passwordConfirm">
          Password Confirmation
        </label>
        <input
          className={classes.input}
          name="passwordConfirm"
          id="passwordConfirm"
          type="password"
          ref={passwordConfirmRef}
          required
        />

        <button className={classes.formBtn} disabled={loading} type="submit">
          Create account
        </button>
      </form>
    </div>
  );
};

export default SignUp;

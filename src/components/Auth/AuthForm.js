import { useState, useRef,useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from '../store/auth-context'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const authctx = useContext(AuthContext)
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    setIsSending(true);
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try {
      let url;
      if (isLogin) {
        url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdWaec3CQD6wpKWWdd0ezQhHACyW41ZcM";
      } 
      else {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdWaec3CQD6wpKWWdd0ezQhHACyW41ZcM";
      }
      const response = await fetch(url,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        
      const data = await response.json();
      setIsSending(false);
      if(response.ok){
        authctx.login(data.idToken)
      }
      else {
        let errorMessage = "Auth Failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      } 
    } catch (err) {
      alert(err.message)
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isSending && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isSending && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

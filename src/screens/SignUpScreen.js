import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";
function SignUpScreen() {
  const emailRef = useRef(null); // this is the updated version so we need reference to these like
  // reference to email is registered
  // before using these references we need to attach them to the input forms

  const passwordRef = useRef(null);
  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        //it will take the current value in the input field of the email
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
        // by this we can use the user details it is returning
      })
      .catch((error) => {
        alert(error.message);
        // so it will catch the error and show it on the screen
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
        // by this we can use the user details it is returning
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen_gray"> New to Netflix? </span>
          <span className="signupScreen_link" onClick={register}>
            {" "}
            Sign Up now
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;

import React, { useState } from "react";
import "./login.css";
import whtsupimage from "../../images/whtsapp2.webp";
import { Button } from "@mui/material";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider/stateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  // to sign in by email
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img src={whtsupimage} />
        <div>
          <h1>Sign in to whatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;

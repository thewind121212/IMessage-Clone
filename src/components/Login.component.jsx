import React from "react";
import { Button } from "@mui/material";
import "./login.style.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

const Login = (props) => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        console.log(credential.accessToken);
        console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeXAxzQe2cz_jquntksXvQPhE7KTdPEXJg5xpPP8bu4FsCAA6ySM55qlhRGw2mPjq_CEA&usqp=CAU" />
        <h1>iMessage</h1>
      </div>

      <Button onClick={signIn}> Sign In</Button>
    </div>
  );
};

export default Login;

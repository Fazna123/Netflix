import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import netflix from "../images/netflix.png";
import { auth, googleAuth } from "../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const navigate = useNavigate();

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      setTimeout(() => {
        auth.currentUser?.emailVerified && navigate("/");
      }, 2000);
      toast.success("Signed in successfully");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser);

  return (
    <div
      style={{ backgroundColor: "#181818", height: "100vh", padding: "30px" }}
    >
      <ToastContainer autoClose={2000} />
      <img style={{ width: "130px", height: "50px" }} src={netflix} />
      <div style={{ position: "fixed", left: "45%", top: "35%" }}>
        <Button onClick={googleSignin} variant="contained" color="error">
          SignIn with Google
        </Button>
        <br />
        <h2 style={{ color: "white" }}>
          Let's start to explore movies
          <br /> from here.
        </h2>
      </div>
    </div>
  );
}

export default Signin;

import React, { useState, useEffect } from "react";
import netflix from "../images/netflix.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";

function Navbar() {
  const logout = async () => {
    console.log("Logout button clicked");
    try {
      await signOut(auth);
      toast.success("Logged out successfully", {
        theme: "dark",
      });
      getMovie();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    try {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=b0648b2f1edd34ff07e11ff1c4ae55a9"
      )
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
    } catch (error) {
      console.error(error);
    }
  };

  const signinClick = () => {
    navigate("/signin");
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(auth.currentUser?.email);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[9]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "600px",
        width: "100%",
      }}
    >
      <ToastContainer autoClose={2000} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "30px",
        }}
      >
        <img style={{ width: "160px", height: "50px" }} src={netflix} />
        <div>
          {auth.currentUser?.emailVerified ? (
            <Button
              onClick={logout}
              variant="contained"
              color="error"
              sx={{ height: "40px", marginLeft: "10px" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={signinClick}
              color="error"
              variant="contained"
              style={{ height: "40px" }}
            >
              SignIn
            </Button>
          )}
        </div>
      </div>
      <div style={{ padding: "30px" }}>
        <h1
          style={{ color: "#F1F1F1", fontSize: "60px", fontFamily: "initial" }}
        >
          {movies[9]?.original_title}
        </h1>
        <h3 style={{ color: "#F1F1F1", fontFamily: "initial" }}>
          {movies[9]?.overview}
        </h3>
        <Trailer movieId={movies[9]?.id} />
      </div>
    </div>
  );
}

export default Navbar;

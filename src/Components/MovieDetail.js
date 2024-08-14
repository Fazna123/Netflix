import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";

function MovieDetail() {
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const location = useLocation();

  const movieRef = doc(database, "Movies", `${location.state.movie.id}`);
  const reviewRef = collection(movieRef, "Reviews");

  const addReview = async () => {
    try {
      auth.currentUser &&
        (await addDoc(reviewRef, {
          movieReview: review,
          email: auth.currentUser?.email,
          username: auth.currentUser?.displayName,
          profile_image: auth.currentUser?.photoURL,
        }));
      auth.currentUser
        ? toast.success("Review Added", {
            theme: "dark",
          })
        : toast.warning("Please Login");
    } catch (err) {
      console.error(err);
    }
  };

  const showReview = async () => {
    try {
      const data = await getDocs(reviewRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviewData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    showReview();
  });

  console.log(reviewData);

  return (
    <div style={{ backgroundColor: "black", height: "100%" }}>
      <Grid container>
        <Grid item xs={8}>
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state.movie?.poster_path})`,
              height: "100vh",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <ToastContainer autoClose={1000} />
            <div
              style={{
                paddingTop: "200px",
                paddingLeft: "30px",
                paddingRight: "10px",
                fontFamily: "initial",
              }}
            >
              <h1 style={{ color: "red", fontSize: "50px" }}>
                {location.state.movie?.original_title}
              </h1>

              <div style={{ display: "flex" }}>
                <h3 style={{ color: "white" }}>
                  Location: {location.state.movie?.original_language} -
                </h3>
                <h3 style={{ color: "white" }}>
                  {" "}
                  Release Date: {location.state.movie?.release_date}
                </h3>
              </div>

              <h2 style={{ color: "white", fontWeight: "100" }}>
                {location.state.movie?.overview}
              </h2>
              <Trailer location={location} />
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              padding: "20px",
            }}
          >
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>
                ADD REVIEW
              </h5>
              <TextField
                onChange={(e) => setReview(e.target.value)}
                size="small"
                label="Review"
                variant="outlined"
                style={{ backgroundColor: "white", borderRadius: "5px" }}
              />
              <Button
                onClick={addReview}
                sx={{ ml: "10px", bgcolor: "red", color: "white" }}
                variant="contained"
              >
                Submit
              </Button>
            </div>

            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>REVIEW</h5>
              {reviewData.map((each) => {
                return (
                  <>
                    <div style={{ display: "flex" }}>
                      <img
                        style={{ width: "20px", borderRadius: "50px" }}
                        src={each.profile_image}
                      />
                      <li style={{ color: "gray", paddingLeft: "10px" }}>
                        {each.username}
                      </li>
                    </div>
                    <h6 style={{ color: "gray" }}>{each.movieReview}</h6>
                  </>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MovieDetail;

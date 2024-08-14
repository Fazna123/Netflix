import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../firebase/setup";

function Home() {
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
  console.log(movies);

  useEffect(() => {
    getMovie();
  }, []);

  const addMovie = async (movie) => {
    const movieRef = doc(database, "Movies", `${movie.id}`);
    try {
      await setDoc(movieRef, {
        movieName: movie.original_title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <Grid container spacing={2}>
        {movies.map((movie) => {
          {
            addMovie(movie);
          }
          return (
            <Grid
              item
              xs={3}
              style={{
                paddingTop: "20px",
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
            >
              <Box key={movie.id}>
                <Link to="/movieDetail" state={{ movie: movie }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    />
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;

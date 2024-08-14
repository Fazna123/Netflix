import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "@mui/material";
import Youtube from "react-youtube";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Trailer({ location, movieId }) {
  const [trailerView, setTrailerView] = useState([]);

  console.log("trailerview", trailerView);
  //console.log('Video ID:', trailerView[0]?.key);
  console.log("location", location);
  console.log("movieid", movieId);
  console.log("id", location?.state?.movie?.id);

  const showTrailer = async () => {
    try {

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          movieId ? movieId : location?.state?.movie?.id
        }/videos?api_key=b0648b2f1edd34ff07e11ff1c4ae55a9&language=en-US`
      );

      const json = await response.json();
      console.log("Trailer API response:", json);
      setTrailerView(json.results);
    } catch (error) {
      console.error("Error fetching trailer data:", error);
    }
  };

  useEffect(() => {
    showTrailer();
  });

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button
        variant="contained"
        sx={{ color: "black", bgcolor: "white" }}
        onClick={openModal}
      >
        PLAY TRAILER
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        {trailerView && trailerView.length > 0 && (
          <Youtube videoId={trailerView[0]?.key} />
        )}
      </Modal>
    </div>
  );
}

export default Trailer;

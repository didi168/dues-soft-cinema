import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./firstSection.module.css";

function FirstSection() {
  const TMDB_API_KEY = "fb2e806bcdf39297b44b6a06de5b1f6f";
  
  const [movie, setMovie] = useState(null); // State to hold movie data

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/550?api_key=${TMDB_API_KEY}&language=en-US`
        );
        setMovie(response.data); // Store the fetched movie data
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
  
    fetchMovie();
  }, []);

  return (
    <div id={styles.main}>
      <section
        className={styles.firstDiv}
        style={{
          backgroundImage: movie ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` : "none", // Set the background image to the movie poster
        }}
      >
        {movie ? (
          <>
            <h1>
              {movie.title}</h1>
              <h3>{movie.tagline}</h3>
          
            <p className={styles.rating}>Rating: {movie.vote_average}</p> {/* Display the rating */}
            <span className={styles.secondSpan}>
              <input id={styles.playBtn} type="button" value="Play" />
              <input id={styles.downloadBtn} type="button" value="Download" />
            </span>
          </>
        ) : (
          <p>Loading movie...</p> // Display a loading message while fetching data
        )}
      </section>
    </div>
  );
}

export default FirstSection;

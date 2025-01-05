import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./firstSection.module.css";

function FirstSection({ tvSeries: propTvSeries }) {
  const TMDB_API_KEY = "fb2e806bcdf39297b44b6a06de5b1f6f";
  
  const [randomTvSeries, setRandomTvSeries] = useState(null); // State to hold TV series data
  
  useEffect(() => {
    const fetchRandomTvSeries = async () => {
      try {
        // Fetch the popular TV series list
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );

        // Get a random TV series from the results
        const randomTvSeries = response.data.results[Math.floor(Math.random() * response.data.results.length)];
        setRandomTvSeries(randomTvSeries); // Store the fetched TV series data
      } catch (error) {
        console.error("Error fetching TV series data:", error);
      }
    };

    fetchRandomTvSeries(); // Trigger the fetch on page load
  }, []); // Empty array ensures it runs only once when the component mounts (reload)

  return (
    <div id={styles.main}>
      <section
        className={styles.firstDiv}
        style={{
          backgroundImage: randomTvSeries ? `url(https://image.tmdb.org/t/p/w500${randomTvSeries.poster_path})` : 'none', // Set the background image to the TV series poster
        }}
      >
        {randomTvSeries ? (
          <>
            <h1>{randomTvSeries.name}</h1> {/* Display the TV series name */}
            <h3>{randomTvSeries.tagline}</h3> {/* Display the TV series tagline */}
            <p className={styles.rating}>Rating: {randomTvSeries.vote_average}</p> {/* Display the rating */}
            <span className={styles.secondSpan}>
              <input id={styles.playBtn} type="button" value="Play" />
              <input id={styles.downloadBtn} type="button" value="Download" />
            </span>
          </>
        ) : (
          <p>Loading TV series...</p> // Display a loading message while fetching data
        )}
      </section>
    </div>
  );
}

export default FirstSection;

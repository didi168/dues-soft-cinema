import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./firstSection.module.css";

function FirstSection() {
  const TMDB_API_KEY = "fb2e806bcdf39297b44b6a06de5b1f6f";
  const [randomTvSeries, setRandomTvSeries] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRandomTvSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );

        if (response?.data?.results?.length > 0) {
          const randomIndex = Math.floor(Math.random() * response.data.results.length);
          setRandomTvSeries(response.data.results[randomIndex]);
        } else {
          setError(true); // Handle empty results
        }
      } catch (error) {
        console.error("Error fetching TV series data:", error);
        setError(true); // Handle fetch error
      }
    };

    fetchRandomTvSeries();
  }, [TMDB_API_KEY]); // Include TMDB_API_KEY in dependency array for clarity

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load TV series. Please try again later.</p>
      </div>
    );
  }

  return (
    <div id={styles.main}>
      <section
        className={`${styles.firstDiv} ${randomTvSeries ? styles.loaded : styles.loading}`}
        style={{
          backgroundImage: randomTvSeries
            ? `url(https://image.tmdb.org/t/p/w500${randomTvSeries.poster_path})`
            : "none",
        }}
      >
        {randomTvSeries ? (
          <>
            <h1>{randomTvSeries.name}</h1>
            <h3>{randomTvSeries.tagline || "No tagline available"}</h3>
            <p className={styles.rating}>
              Rating: {randomTvSeries.vote_average || "N/A"}
            </p>
            <span className={styles.secondSpan}>
              <button id={styles.playBtn}>Play</button>
              <button id={styles.downloadBtn}>Download</button>
            </span>
          </>
        ) : (
          <p>Loading TV series...</p>
        )}
      </section>
    </div>
  );
}

export default FirstSection;

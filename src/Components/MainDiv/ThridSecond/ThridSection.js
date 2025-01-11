import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./thirdSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// Helper function for debounce
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function ThirdSection() {
  const TMDB_API_KEY = "fb2e806bcdf39297b44b6a06de5b1f6f";

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (loading) return;

      setLoading(true);
      setError(null); // Reset error before fetching
      const randomPage = Math.floor(Math.random() * 500) + 1;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${randomPage}`
        );

        console.log("API response:", response.data);

        const movieData = response.data.results || [];

        const moviesWithTrailers = await Promise.all(
          movieData.slice(0, 10).map(async (movie) => {
            // 'movie' is scoped correctly here
            const trailerResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
            );
            const trailer = trailerResponse.data.results.find(
              (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            );

            // Safely handle release_date
            // const releaseYear = movie?.release_date ? movie.release_date.split("-")[0] : "N/A";

            return {
              id: movie?.id || "N/A",
              title: movie?.title || "Unknown Title",
              rating: movie?.vote_average || "N/A",
              // year: releaseYear, // 'releaseYear' is scoped here
              poster: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
              trailer: trailer
                ? `https://www.youtube.com/watch?v=${trailer.key}`
                : null
            };
          })
        );

        console.log("Movies with Trailers:", moviesWithTrailers);

        const shuffledMovies = moviesWithTrailers.sort(
          () => Math.random() - 0.5
        );
        setMovies((prevMovies) => [...prevMovies, ...shuffledMovies]);

        if (response.data.page >= response.data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching movies:", error.response?.data || error.message);
        setError(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 300); // 300ms debounce time

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div id={styles.main}>
      <h1>Popular Movies</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id}>
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              ) : (
                <p>No image available</p>
              )}
              <h3>
                {movie.title || ""}
              </h3>
              <p>
                <FontAwesomeIcon className={styles.icons} icon={faStar} />{" "}
                {movie.rating || ""}
              </p>
              {movie.trailer ? (
                <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                  Watch Trailer
                </a>
              ) : (
                <span>Trailer not available</span>
              )}
            </div>
            
          ))
        ) : (
          <p className="laodingText">No movies available.</p>
        )}
      </div>
      {loading && <p className="laodingText">Loading more movies...</p>}
      {!hasMore && <p className="laodingText">No more movies to load.</p>}
    </div>
  );
}

export default ThirdSection;

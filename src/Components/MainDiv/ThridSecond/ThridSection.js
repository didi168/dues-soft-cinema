import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./thirdSection.module.css";

function ThirdSection() {
  const TMDB_API_KEY = "fb2e806bcdf39297b44b6a06de5b1f6f";

  const [movies, setMovies] = useState([]); // All loaded movies
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Whether more movies are available

  useEffect(() => {
    // Fetch movies on page load or when `page` changes
    const fetchMovies = async () => {
      if (loading) return; // Prevent multiple simultaneous calls
      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
        );

        const movieData = response.data.results;

        // Fetch trailers for each movie
        const moviesWithTrailers = await Promise.all(
          movieData.map(async (movie) => {
            const trailerResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
            );
            const trailer = trailerResponse.data.results.find(
              (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            );

            return {
              id: movie.id,
              title: movie.title,
              rating: movie.vote_average,
              poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              trailer: trailer
                ? `https://www.youtube.com/watch?v=${trailer.key}`
                : null,
            };
          })
        );

        // Append new movies to the existing list
        setMovies((prevMovies) => [...prevMovies, ...moviesWithTrailers]);

        // Check if there are more pages
        if (response.data.page >= response.data.total_pages) {
          setHasMore(false); // No more movies to fetch
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchMovies();
  }, [page]); // Trigger fetchMovies when `page` changes

  // Scroll event listener to detect when user scrolls near the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup listener
  }, [loading, hasMore]);

  return (
    <div id={styles.main}>
      <h1>Popular Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "200px" }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.rating}</p>
            {movie.trailer && (
              <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                Watch Trailer
              </a>
            )}
          </div>
        ))}
      </div>
      {loading && <p>Loading more movies...</p>}
      {!hasMore && <p>No more movies to load.</p>}
    </div>
  );
}

export default ThirdSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./thirdSection.module.css";

function ThirdSection() {
  const TMDB_API_KEY = "fb2e806bcdf39297b44b6a06de5b1f6f";

  const [movies, setMovies] = useState([]); // All loaded movies
  const [page, setPage] = useState(1); // Current page for infinite scroll
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Whether more movies are available

  useEffect(() => {
    // Function to fetch movies from a random page
    const fetchMovies = async () => {
      if (loading) return; // Prevent multiple simultaneous calls
      setLoading(true);

      // Generate a random page number between 1 and 500 (adjust according to your needs)
      const randomPage = Math.floor(Math.random() * 500) + 1;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${randomPage}`
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

        // Shuffle the movies array randomly
        const shuffledMovies = moviesWithTrailers.sort(() => Math.random() - 0.5);

        setMovies((prevMovies) => [...prevMovies, ...shuffledMovies]);

        // If there are no more pages, set `hasMore` to false
        if (response.data.page >= response.data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchMovies();
  }, [page]); // Fetch movies when page changes

  // Scroll event listener to detect when user scrolls near the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next random page
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

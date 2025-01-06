import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./thirdSection.module.css";

function ThirdSection() {
  const TMDB_API_KEY = "fb2e806bcdf39297b44b6a06de5b1f6f";

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      if (loading) return;

      setLoading(true);
      const randomPage = Math.floor(Math.random() * 500) + 1;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${randomPage}`
        );

        console.log("API response:", response.data);

        const movieData = response.data.results || [];

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
              poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
              trailer: trailer
                ? `https://www.youtube.com/watch?v=${trailer.key}`
                : null,
            };
          })
        );

        console.log("Movies with trailers:", moviesWithTrailers);

        const shuffledMovies = moviesWithTrailers.sort(() => Math.random() - 0.5);
        setMovies((prevMovies) => [...prevMovies, ...shuffledMovies]);

        if (response.data.page >= response.data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching movies:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div id={styles.main}>
      <h1>Popular Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} style={{ width: "200px" }}>
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              ) : (
                <p>No image available</p>
              )}
              <h3>{movie.title || "Untitled"}</h3>
              <p>Rating: {movie.rating || "N/A"}</p>
              {movie.trailer ? (
                <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                  Watch Trailer
                </a>
              ) : (
                <p>No trailer available</p>
              )}
            </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
      {loading && <p>Loading more movies...</p>}
      {!hasMore && <p>No more movies to load.</p>}
    </div>
  );
}

export default ThirdSection;

// // import styles from "./secondSection.module.css";

// // function SecondSection({ tvSeries }) {
// //   // Function to break seasons into chunks of a specific size
// //   const chunkSeasons = (seasons, chunkSize) => {
// //     const result = [];
// //     for (let i = 0; i < seasons.length; i += chunkSize) {
// //       result.push(seasons.slice(i, i + chunkSize));
// //     }
// //     return result;
// //   };

// //   const seasonsChunks = chunkSeasons(tvSeries.seasons, 3); // 3 seasons per section

// //   return (
// //     <div id={styles.main}>
// //       <h2>Seasons:</h2>
// //       {seasonsChunks.map((chunk, index) => (
// //         <div key={index} id={styles.episodes}>
// //           {chunk.map((season, index) => (
// //             <div key={index} className={styles.episodeContainer}>
// //               <h3>Season {index + 1}</h3>
// //               {season.episodes.map((episode, i) => (
// //                 <div key={i} className={styles.episode}>
// //                   <p>{episode.title}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default SecondSection;


// import React, { useEffect } from "react";
// import axios from "axios";

// const FetchMovies = () => {
//   const TMDB_API_KEY = "your_tmdb_api_key"; // Replace with your actual TMDb API key
//   const movieId = "550"; // Replace with the movie ID you want to fetch (e.g., 550 for Fight Club)

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
//         );
        
//         // Log the entire API response to the console
//         console.log("TMDb API Response:", response.data);
//       } catch (error) {
//         console.error("Error fetching data from TMDb API:", error);
//       }
//     };

//     fetchMovieDetails();
//   }, []);

//   return <div>Check your console for the API data!</div>;
// };

// export default FetchMovies;

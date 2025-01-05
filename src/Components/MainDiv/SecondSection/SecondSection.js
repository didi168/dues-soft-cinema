import styles from "./secondSection.module.css";

function SecondSection({ tvSeries }) {
  // Function to break seasons into chunks of a specific size
  const chunkSeasons = (seasons, chunkSize) => {
    const result = [];
    for (let i = 0; i < seasons.length; i += chunkSize) {
      result.push(seasons.slice(i, i + chunkSize));
    }
    return result;
  };

  const seasonsChunks = chunkSeasons(tvSeries.seasons, 3); // 3 seasons per section

  return (
    <div id={styles.main}>
      <h2>Seasons:</h2>
      {seasonsChunks.map((chunk, index) => (
        <div key={index} id={styles.episodes}>
          {chunk.map((season, index) => (
            <div key={index} className={styles.episodeContainer}>
              <h3>Season {index + 1}</h3>
              {season.episodes.map((episode, i) => (
                <div key={i} className={styles.episode}>
                  <p>{episode.title}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SecondSection;

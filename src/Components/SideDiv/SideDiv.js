import React, { useEffect } from 'react';
import styles from "./sideDiv.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSafari } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faBookmark, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { 
  faHatWizard, 
  faGhost, 
  faRobot, 
  faTheaterMasks, 
  faTv 
} from '@fortawesome/free-solid-svg-icons';

function SideDiv() {
  return (
    <div id={styles.sideDiv}>
      <h1>Dues-Soft.Cinema</h1>

      <section className={styles.firstDiv}>
        <h3>News Feed</h3>
        <ul>
        <li><FontAwesomeIcon className={styles.icons} icon={faCompass} /> Browse</li>
        <li><FontAwesomeIcon className={styles.icons} icon={faBookmark} /> Watchlist</li>
        <li><FontAwesomeIcon className={styles.icons} icon={faCalendar} /> Coming Soon</li>
      </ul>
      
      </section>

      <section className={styles.secondDiv}>
        <h3>For you</h3>
        <ul>
            <li><FontAwesomeIcon className={styles.icons} icon={faHatWizard} /> Anime</li>
            <li><FontAwesomeIcon className={styles.icons} icon={faGhost} /> Horror</li>
            <li><FontAwesomeIcon className={styles.icons} icon={faRobot} /> Sci-Fi</li>
            <li><FontAwesomeIcon className={styles.icons} icon={faTheaterMasks} /> Tragedy</li>
            <li><FontAwesomeIcon className={styles.icons} icon={faTv} /> Series</li>
        </ul>
      </section>
    </div>
  );
}

export default SideDiv;

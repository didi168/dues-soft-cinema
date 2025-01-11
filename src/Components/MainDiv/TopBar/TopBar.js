import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSafari } from '@fortawesome/free-brands-svg-icons';
import styles from "./topBar.module.css"
import { faAngleLeft, faAngleRight, faArrowRight,  faBars,  faBell,  faDownload,  faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
function TopBar () {
 return(
     <div id={styles.main}>
        <h1 id={styles.heading}><span><FontAwesomeIcon className={styles.icons} icon={faBars} /></span>Dues Soft Cinema</h1>
     <nav className={styles.navigation}>
        <p><FontAwesomeIcon className={styles.icons} icon={faAngleLeft} /></p>
        <p><FontAwesomeIcon className={styles.icons} icon={faAngleRight} /></p>
     </nav>

    <div className={styles.search}>
    <p><FontAwesomeIcon className={styles.icons} icon={faSearch} /></p>
    <input type="search" placeholder="Search" />
    <p><FontAwesomeIcon className={styles.icons} icon={faArrowRight} /></p>
    </div>

    <section className={styles.account}>
        <p><FontAwesomeIcon className={styles.icons} icon={faDownload} /></p>
        <p><FontAwesomeIcon className={styles.icons} icon={faBell} /></p>
        <p><FontAwesomeIcon className={styles.icons} icon={faUser} /></p>
        </section>
        
     </div>
 );
 
}
export default TopBar;
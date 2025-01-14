import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FirstSection from "./FirstSection/FirstSection";
import styles from "./mainDiv.module.css"
// import FetchMovies from "./SecondSection/SecondSection";
import ThirdSection from "./ThridSecond/ThridSection";
import TopBar from "./TopBar/TopBar";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
function MainDiv () {
 return(
  <div id={styles.mainDiv}>
  <TopBar />
  <FirstSection /> 
  <ThirdSection  />
  <a id={styles.backToTop} href={<TopBar/>}><FontAwesomeIcon className={styles.icons} icon={faArrowUp} /></a>
   </div>
 );
 
}
export default MainDiv;
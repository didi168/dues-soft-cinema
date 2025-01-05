import FirstSection from "./FirstSection/FirstSection";
import styles from "./mainDiv.module.css"
import SecondSection from "./SecondSection/SecondSection";
import ThirdSection from "./ThridSecond/ThridSection";
import TopBar from "./TopBar/TopBar";
function MainDiv () {
 return(
  <div id={styles.mainDiv}>
        {TopBar()}
        {FirstSection()}
        {SecondSection()}
        {ThirdSection()}
   </div>
 );
 
}
export default MainDiv;
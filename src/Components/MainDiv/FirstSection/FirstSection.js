import styles from "./firstSection.module.css"
function FirstSection() {



 return(
  <div id={styles.main}>
    <section className={styles.firstDiv}>

     <h1>
     THE SOUL <br /> CONDUCTOR
      </h1>

     <span className={styles.firstSpan}>
     
     </span>

     <span className={styles.secondSpan}>
     <input id={styles.playBtn} type="button" value="Play" />
    
     <input id={styles.downloadBtn} type="button" value="Download" />
     </span>
    </section>

   
  </div>
 );
 
}
export default FirstSection;
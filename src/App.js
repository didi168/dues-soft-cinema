
import styles from './App.module.css';
import MainDiv from './Components/MainDiv/MainDiv';
import SideDiv from './Components/SideDiv/SideDiv';

function App() {
  return (
    <div className={styles.App}>
    <p className={styles.space}>
    <p>.</p>
    </p>
   
     {SideDiv()} 
      {MainDiv()}
    </div>
  );
}

export default App;

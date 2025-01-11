
import styles from './App.module.css';
import MainDiv from './Components/MainDiv/MainDiv';
import SideDiv from './Components/SideDiv/SideDiv';

function App() {
  return (
    <div className={styles.App}>
     {SideDiv()} 
      {MainDiv()}
    </div>
  );
}

export default App;

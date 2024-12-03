import styles from './App.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import useWindowDimensions from './misc/WindowDimensions.js';
import HomePage from './pages/HomePage.js';
import { ToastContainer, createNotification } from "./misc/toast.js";

function App() {
  const { s_width, s_height } = useWindowDimensions();

  return (
    <div className={styles.app}>
      <div className={styles.dimensions}>{s_width}</div>
      <div className={styles.dimensions} style={{top: "40px"}}>{s_height}</div>
      <HomePage />
      <ToastContainer />
   </div>
  );
}

export default App;

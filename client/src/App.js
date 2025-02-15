import styles from './App.module.scss';

import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage.js';
import { ToastContainer, createNotification } from "./misc/toast.js";

function App() {
  return (
    <div className={styles.app}>
      <HomePage />
      <ToastContainer />
   </div>
  );
}

export default App;

import { useState } from 'react';
import styles from './HomePage.module.scss';

import Navbar from '../components/Navbar';
import ChooseComponents from '../components/ChooseComponents';
import Items from '../components/Items';
import Basket from '../components/Basket';

function HomePage() {
  const [selectedComponent, setSelectedComponent] = useState({type: "cpu", name: "procesor"});

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles["main-wrapper"]}>
        <ChooseComponents setSelectedComponent={ setSelectedComponent }/>
        <Items selectedComponent={ selectedComponent }/>
        <Basket />
        <div id="portal-root" className={styles["portal-root"]}></div>
      </div>
    </div>
  );  


}

export default HomePage;
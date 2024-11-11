import { useState } from 'react';
import styles from './HomePage.module.scss';

import Navbar from '../components/Navbar';
import ChooseComponents from '../components/ChooseComponents';
import Items from '../components/Items';
import Basket from '../components/Basket';

function HomePage() {

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles["main-wrapper"]}>
        <ChooseComponents />
        <Items />
        <Basket />
      </div>
    </div>
  );  


}

export default HomePage;
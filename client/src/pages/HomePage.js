import { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChooseComponents from '../components/ChooseComponents';
import Items from '../components/Items';
import Basket from '../components/Basket';

function HomePage() {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [z_counter, setZ_counter] = useState(3);

  return (
    <div className={styles.home}>
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className={styles["main-wrapper"]}>
        <ChooseComponents />
        <Items z_counter={z_counter} setZ_counter={setZ_counter} />
        <Basket />
        <div id="portal-root" className={styles["portal-root"]}></div>
        <Sidebar openSidebar={openSidebar} z_counter={z_counter} />
      </div>
    </div>
  );  


}

export default HomePage;
import { useState } from 'react';

import styles from './Navbar.module.scss';
import PhoneImage from '../images/phone.png';
import DiscordImage from '../images/discord.png';
import InstagramImage from '../images/instagram.png';
import TwitterImage from '../images/twitter.png';
import FacebookImage from '../images/facebook.png';
import BasketPhone from './BasketPhone';
import FiltersPhone from './FiltersPhone';
import SearchPhone from './SearchPhone';

const Navbar = ({ openSidebar, setOpenSidebar, z_counter }) => {

  const toggleMenu = () => setOpenSidebar(!openSidebar);

  return (
    <nav className={styles.navbar}>
      <div className={styles["logo-wrapper"]}>logo</div>
      <div className={styles["main-right-wrapper"]}>
        <div className={`${styles["main-upper"]} ${styles["hide-on-mobile"]}`}>
          <div className={`${styles["upper-left"]} ${styles["hide-on-mobile"]}`}>
            <p className={styles["text-nav"]}>FAQ</p>
            <p className={styles["text-nav"]}>POMOČ</p>
            <p className={styles["text-nav"]}>O NAS</p>
            <div className={styles.coupon}>€5.00 kupon</div>
            <div className={styles.phone}>
              <img src={PhoneImage}/>
              <p>040 765 061</p>
            </div>
          </div>
          <div className={`${styles["upper-right"]}`}>
            <img style={{width: "16px", height: "17px"}} src={DiscordImage}/>
            <img src={InstagramImage}/>
            <img style={{width: "18px", height: "14px"}} src={TwitterImage}/>
            <img src={FacebookImage}/>
          </div>
        </div>
        <div className={styles["main-lower"]}>
          <div className={styles["lower-left"]}>
            <div className={`${styles["nav-item"]} ${styles["hide-on-mobile"]}`}>Trgovina</div>
            <div className={`${styles["nav-item"]} ${styles["hide-on-mobile"]}`} style={{color: "#f6f6f6", borderBottom: "1px solid white", paddingTop: "1px"}}>Sestavi PC</div>
            <div className={`${styles["nav-item"]} ${styles["hide-on-mobile"]}`}>Prodaj nam</div>
            <div className={`${styles["nav-item"]} ${styles["hide-on-mobile"]}`}>Servis in storitve</div>
          </div>
          <div className={styles["lower-right"]}>
            <SearchPhone z_counter={z_counter} />
            <FiltersPhone z_counter={z_counter} />
            <BasketPhone z_counter={z_counter} />
            <div className={`${styles.spacer} ${styles["hide-on-pc"]}`}></div>
            <div className={`${styles["login-button"]} ${styles["hide-on-mobile"]}`}>Prijava</div>
            <div className={styles["hamburger-wrapper"]} onClick={toggleMenu}>
              <div className={styles.hamburger}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;

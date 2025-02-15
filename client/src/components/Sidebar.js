import React from 'react';
import styles from './Sidebar.module.scss';
import PhoneImage from '../images/phone.png';
import DiscordImage from '../images/discord.png';
import InstagramImage from '../images/instagram.png';
import TwitterImage from '../images/twitter.png';
import FacebookImage from '../images/facebook.png';

const Sidebar = ({ openSidebar, z_counter }) => {
  return (
    <nav className={`${styles.sidebar} ${openSidebar && styles.open}`} style={{zIndex: z_counter+4}}>
      <div className={styles["nav-button"]}>Trgovina</div>
      <div className={styles["nav-button"]} style={{color: "#f6f6f6", background: "#313131"}}>Sestavi PC</div>
      <div className={styles["nav-button"]}>Prodaj nam</div>
      <div className={styles["nav-button"]}>Servis in storitve</div>

      <div className={styles["login-button"]}>Prijava</div>
      <div className={styles["coupon-button"]}>€5.00 Kupon</div>

      <div className={styles["spacer"]}></div> {/* Spacer */}

      <div className={styles["bottom-info"]}>
        <div className={styles["nav-text"]}>
          <div>FAQ</div>
          <div>POMOČ</div>
          <div>O NAS</div>
        </div>

        <div className={styles.phone}>
          <img src={PhoneImage}/>
          <p>040 765 061</p>
        </div>

        <div className={styles.socials}>
          <img style={{width: "26px", height: "27px"}} src={DiscordImage}/>
          <img src={InstagramImage}/>
          <img style={{width: "28px", height: "24px"}} src={TwitterImage}/>
          <img src={FacebookImage}/>
        </div>
      </div>
    </nav>
  )
};

export default Sidebar;

import React from 'react';
import styles from './Basket.module.scss';

function Basket(props) {
  return (
    <div className={styles["main-wrapper"]}>
       <div className={styles.title}>KOŠARICA</div>
    </div>
  );
}

export default Basket;
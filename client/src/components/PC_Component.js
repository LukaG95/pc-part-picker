import React from 'react';
import styles from './PC_Component.module.scss';

function PC_Component({ type, name, setSelectedComponent, product }) {
  return (
    <div className={styles["main-wrapper"]} onClick={()=> setSelectedComponent({type, name})}>
      <div className={styles["img-wrapper"]}> <img src={`/images/${type}.png`} className={styles[type]}/> </div>
      <div className={styles["info-wrapper"]}> 
       
        <div className={styles["component-name"]}>{name}</div>
        <div className={styles["product-name"]}>{product ? product.name : "Izberi"}</div>
    
        <div className={styles["product-price"]}>{product ? `€${product.price}` : ""}</div>
      </div>
    </div>
  );
}

export default PC_Component;
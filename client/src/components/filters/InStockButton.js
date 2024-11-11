import { useState } from 'react';
import styles from './InStockButton.module.scss';

function InStockButton(props) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div onClick={()=> setIsSelected(!isSelected)} className={styles["checkbox-wrapper"]}>
      <div className={`${styles.checkbox} ${isSelected ? styles.selected : ""}`}>
        {isSelected && <div className={styles.tick}></div>}
      </div>
      <label>Na zalogi</label>
    </div>
  );
}

export default InStockButton;
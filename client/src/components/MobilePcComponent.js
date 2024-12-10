import { useEffect, useState, useContext } from 'react';
import styles from './MobilePcComponent.module.scss';
import { ProductsContext } from "../context/ProductsContext.js";

function MobilePcComponent({ component }) {
  const [isComponentSelected, setIsComponentSelected] = useState(false);

  const { selectedComponent, setSelectedComponent } = useContext(ProductsContext);
  const { type, name, plural, products } = component;

  useEffect(()=> {
    if (type === selectedComponent.type) {
      setIsComponentSelected(true);
    } else {
      setIsComponentSelected(false);
    }
  }, [selectedComponent])

  console.log(selectedComponent.type, type)

  return (
    <div className={`${styles["component-wrapper"]} ${isComponentSelected ? styles.selected : ""}`} onClick={()=> setSelectedComponent({type, name, plural})}>
      <div className={styles["img-wrapper"]}> <img src={`/images/${type}.png`} className={styles[type]}/> </div>
      <div className={styles["component-name"]}>{name}</div>
    </div>
  );

}

export default MobilePcComponent;
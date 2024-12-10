import { useState, useContext, useEffect } from 'react';
import styles from './CheckBoxButton.module.scss';
import { ProductsContext } from "../../context/ProductsContext.js";

// checkbox button SHOULD reflect the true state which is in productsContext
function InStockButton({ label, type, componentType, pushDown, showFilters, brandFilter }) {
  const [isSelected, setIsSelected] = useState(false);
  const { products, setInStock, addOrRemoveBrand, selectedComponent } = useContext(ProductsContext);

  let count, stock_count;
  if (products){
    count = products.filter(p => p.brand === label && p.type === componentType).length;
    stock_count = products.filter(item => item.stock > 0).length;

  }

  // close filters when changing component
  useEffect(()=> {
    if (brandFilter) setTimeout(()=> setIsSelected(false), 250)
  }, [selectedComponent])

  return (
    <div 
      onClick={()=> {
        setIsSelected(!isSelected)
        if (!brandFilter) setInStock(!isSelected)
        else addOrRemoveBrand(label)
      }} 
      className={`${styles["checkbox-wrapper"]} ${styles[type]}`} style={showFilters ? {bottom: -pushDown + "px"} : {bottom: "0px"}}
    >
      <div className={`${styles.checkbox} ${isSelected ? styles.selected : ""}`}>
        {isSelected && <div className={styles.tick}></div>}
      </div>
      <label>{ label }</label>
      { type === "component-filter" && <div className={styles["stock-indicator"]}>{count}</div>}
      { type === "mobile-component-filter" && <div className={styles["stock-indicator"]}>{stock_count}</div>}
    </div>
  );
}

export default InStockButton;
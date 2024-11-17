import { useEffect, useRef, useState, useContext } from 'react';
import styles from './Product.module.scss';
import products from '../assets/products.json';
import amdImage from '../images/amd.png';
import intelImage from '../images/intel.png';
import { SelectionContext  } from "../context/SelectionContext.js";

let leaveTimeout;

function Product({ stock_item, z_counter, setZ_counter }) {
  const found_product = products.find(product => product.id === stock_item.id);
  const product = {...found_product, ...stock_item}; 
  const { userSelections, updateSelection } = useContext(SelectionContext);

  const productRef = useRef(null);
  const chooseButtonRef = useRef(null);


    console.log(userSelections[product.type]) 

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout);
    productRef.current.style.zIndex = z_counter+2;
    chooseButtonRef.current.style.zIndex = z_counter+1;
    setZ_counter(prev => prev+2)
  };

  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(()=> {
      productRef.current.style.zIndex = z_counter-1;
      chooseButtonRef.current.style.zIndex = z_counter-2;
    }, 150)
  };

  return (
    <div 
      className={styles["product_wrapper"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div  
        className={`${styles.product} ${isThisProductSelected() && styles.selected}`} 
        ref={productRef}
      >
        <div className={styles.location} style={stockStyle(stock_item)}>{stock_item.location}</div>  
        { isThisProductSelected() && <div className={styles["selected-text"]}>Izbrano</div> }
        { !stock_item.isNew && <div className={styles.used}>Rabljeno</div> }
        <div className={styles["img-wrapper"]}><img src={product.brand === "Intel" ? intelImage : amdImage }/></div>
        <div className={styles["product_info_wrapper"]}>
          <div>
            <div className={styles["price-wrapper"]}>
              <div className={styles.price}>€{product.price}</div>
              {product.discount && <div className={styles.discount}>-{product.discount}%</div>}
            </div>
            <div className={styles["regular_price"]}>Običajna cena: €{product.regular_price}</div>
          </div>
          <div>
          <div className={styles["product_name"]}>{product.name}</div>
          <div className={styles["product_description"]}>{product.description}</div>
          </div>
        </div>
      </div>
     
        { 
          isThisProductSelected() ? 
            <div ref={chooseButtonRef} onClick={() => updateSelection(product, true)} className={`${styles["choose-button"]} ${styles["remove-button"]}`}>Odstrani</div>  
              :
            <div ref={chooseButtonRef} onClick={() => updateSelection(product)} className={styles["choose-button"]}>Izberi</div>
        }
      

    </div>  
  );

  function isThisProductSelected(){
    if (!userSelections[product.type].product) return false;
    if (userSelections[product.type].product.id !== product.id) return false;

    return true;
  }

}

const stockStyle = (item) => {
  let color;
  if (item.location === "Na zalogi") color = "#00C999";
  if (item.location === "Pri dobavitelju") color = "#B8BA54";
  if (item.location === "Ni na zalogi") color = "#EA4F4F";
  return { color }
}

export default Product;
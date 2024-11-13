import { useEffect, useRef, useState } from 'react';
import styles from './Product.module.scss';
import products from '../assets/products.json';
import amdImage from '../images/amd.png';
import intelImage from '../images/intel.png';

let leaveTimeout;

function Product({ stock_item, z_counter, setZ_counter }) {
  const found_product = products.find(product => product.id === stock_item.id);
  const product = {...found_product, ...stock_item}; 

  const productRef = useRef(null);
  const chooseButtonRef = useRef(null);


  const handleMouseEnter = () => {
    console.log(leaveTimeout)
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
        className={styles.product} 
        ref={productRef}
      >
        <div className={styles.location} style={stockStyle(stock_item)}>{stock_item.location}</div>  
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
     
      <div ref={chooseButtonRef} className={styles["choose-button"]}>Izberi</div>

    </div>  
  );
}

const stockStyle = (item) => {
  let color;
  if (item.location === "Na zalogi") color = "#00C999";
  if (item.location === "Pri dobavitelju") color = "#B8BA54";
  if (item.location === "Ni na zalogi") color = "#EA4F4F";
  return { color }
}

export default Product;



{/* <div 
      className={styles["product_wrapper"]}
      onMouseEnter={(e) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // prevent removing z-index on very fast mouse re-enter
        if (productRef.current) productRef.current.style.zIndex = i+50;
      }}
      onMouseLeave={(e) => {

        timeoutRef.current = setTimeout(() => {
          if (productRef.current) productRef.current.style.zIndex = (i) * 2;
        }, 150);
       
      }}
    >
 */}
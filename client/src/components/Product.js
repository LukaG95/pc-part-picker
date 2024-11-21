import { useEffect, useRef, useState, useContext } from 'react';
import styles from './Product.module.scss';
import { sleep } from '../misc/sleep.js';
import { SelectionContext  } from "../context/SelectionContext.js";

let leaveTimeout;

function Product({ product, z_counter, setZ_counter }) {

  const { userSelections, updateSelection } = useContext(SelectionContext);

  const productRef = useRef(null);
  const chooseButtonRef = useRef(null);
  const containerRef = useRef(null);

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

   const handleProductClick = async () => {
    const product = productRef.current;
    const productRect = product.getBoundingClientRect(); // Get product's position and dimensions

    // Create a clone of the product
    const clone = product.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.top = `${productRect.top-93}px`; // Set top based on viewport position
    clone.style.left = `${productRect.left}px`; // Set left based on viewport position
    clone.style.width = `${productRect.width}px`;
    clone.style.height = `${productRect.height}px`;
    clone.style.transition = "transform 0.75s ease, opacity 0.75s ease";
    clone.style.zIndex = z_counter+5;

    // Append to the portal root
    const portalRoot = document.getElementById("portal-root");
    portalRoot.appendChild(clone);

    // Get the target element (basket)
    await sleep(10); // so that the basket element with id=basket exists (has time to be created)
    const target = document.getElementById("basket"); // Replace 'basket' with your actual target element's ID
    const targetRect = target.getBoundingClientRect();

    // Calculate the translation values
    const translateX = targetRect.left + targetRect.width / 2 - (productRect.left + productRect.width / 2);
    const translateY = targetRect.top + targetRect.height / 2 - (productRect.top + productRect.height / 2);

    // Start animation
    setTimeout(() => {
      clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.5)`;
      clone.style.opacity = "0";
    }, 0);

    // Remove the clone after animation ends
    clone.addEventListener("transitionend", () => {
      clone.remove();
    });
  };
  

  return (
    <div 
      className={styles["product_wrapper"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <div  
        className={`${styles.product} ${isThisProductSelected() && styles.selected}`} 
        ref={productRef}
      >
        <div className={styles.location} style={stockStyle(product)}>{product.location}</div>  
        { isThisProductSelected() && <div className={styles["selected-text"]}>Izbrano</div> }
        { !product.isNew && <div className={styles.used}>Rabljeno</div> }
        <div className={styles["img-wrapper"]}><img src={require(`../images/${product.image}`)}/></div>
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
            <div ref={chooseButtonRef} onClick={(e) => {handleProductClick(e); updateSelection(product)}} className={styles["choose-button"]}>Izberi</div>
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
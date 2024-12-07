import { useState, useEffect, useRef, useContext } from 'react';
import styles from './BasketPhone.module.scss';
import { ProductsContext } from "../context/ProductsContext.js";
import { SelectionContext } from "../context/SelectionContext.js";
import BasketImage from '../images/basket.png';
import useWindowDimensions from '../misc/WindowDimensions.js';

function BasketPhone({ z_counter }) {
  const { s_width } = useWindowDimensions();
  const { userSelections } = useContext(SelectionContext);
  const object_keys = Object.keys(userSelections);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buildExists = () => {
    return Object.values(userSelections).some((selection) => selection.products.length > 0);
  };

  if (s_width < 1150)
  return (
    <div className={`${styles["dropdown-wrapper"]} ${isOpen ? styles.open : ""}`} ref={dropdownRef} id="basket">

      <div className={styles["basket-button"]} onClick={() => setIsOpen((prev) => !prev)}>
        <img src={BasketImage} alt="Basket" />
        <div>{buildExists() ? 1 : 0}</div>
      </div>

      <div className={styles["dropdown-menu"]} style={{ zIndex: z_counter + 3 }}>
        <div className={styles.title}>
          KOŠARICA
          <div className={styles["x-button"]} onClick={()=> setIsOpen(false)}></div>
        </div>
        { displayCustomBuild() }

        <div className={styles["floating-register-wrapper"]}>
          <div className={styles["total-amount-wrapper"]}>
            <div>ZNESEK</div>
            <div>€{price()}</div>
          </div>
          <div className={styles["cash-register-button"]}>NA BLAGAJNO</div>
        </div>
      </div>
      
    </div>
  );

  function price(){
    let price = 0;
    object_keys.forEach(key => userSelections[key].products.forEach(product => price+=product.price));
    return Math.ceil(price*100)/100;
  }

  function displayCustomBuild(){
    
    let build_exists = false;
    object_keys.forEach(key => { 
      if (userSelections[key].products.length > 0) { 
        build_exists = true; 
      }
    });

    if (build_exists)
      return (
        <div className={styles["basket-item"]}>
          <div className={styles["title-price-wrapper"]}>
            <div>Sestavljen PC</div>
            <div>€{price()}</div>
          </div>
          {
            object_keys.map(key => {
              const component = userSelections[key];
              if (component.products.length > 0)
              return (
                  component.products.map(product => 
                    <div className={styles["basket-item-name-wrapper"]}>
                    <div className={styles.dot}></div>
                    <div className={styles["product-name"]}>{product.name}</div>
                  </div>
                  )
            
              )
            })
          }
        </div>
      )
    
  }
}

export default BasketPhone;
import { useContext, useState } from 'react';
import styles from './Basket.module.scss';
import useWindowDimensions from '../misc/WindowDimensions.js';
import { SelectionContext  } from "../context/SelectionContext.js";

function Basket(props) {
  const { s_width } = useWindowDimensions();
  const { userSelections, updateSelection } = useContext(SelectionContext);
  const object_keys = Object.keys(userSelections);

  const [openBasket, setOpenBasket] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  if (s_width > 1150)
  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles.title}>KOŠARICA</div>
      <div className={styles["basket-items-wrapper"]}>
        { displayCustomBuild() }
      </div>
      <div className={styles["floating-register-wrapper"]}>
        <div className={styles["total-amount-wrapper"]}>
          <div>ZNESEK</div>
          <div>€{price()}</div>
        </div>
        <div className={styles["to-register-button"]}>NA BLAGAJNO</div>
      </div>
    </div>
  );

  else return (
    <div className={styles["floating-wrapper"]}>
      <div className={styles["filter-button"]}> 
        <span />
        <span />
        <span />
      </div>
      <div className={styles["basket-button"]} onClick={()=> setOpenBasket(!openBasket)}><p>KOŠARICA</p><p>0x</p></div>
      {/* <div className={`${styles["floating-filters"]} ${openFilters && styles.open}`}></div> */}
      <div className={`${styles["floating-basket"]} ${openBasket ? styles.open : ""}`}></div>
    </div>
  )

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
        <div className={styles["basket-item"]} id="basket">
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

export default Basket;
import { useContext } from 'react';
import styles from './Basket.module.scss';
import { SelectionContext  } from "../context/SelectionContext.js";

function Basket(props) {
  
  const { userSelections, updateSelection } = useContext(SelectionContext);

  console.log(userSelections)

  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles.title}>KOŠARICA</div>
      <div className={styles["basket-items-wrapper"]}>
        { displayCustomBuild() }
        
      </div>
      <div className={styles["floating-register-wrapper"]}>
        <div className={styles["total-amount-wrapper"]}>
          <div>ZNESEK</div>
          <div>€0</div>
        </div>
        <div className={styles["to-register-button"]}>NA BLAGAJNO</div>
      </div>
    </div>
  );

  function displayCustomBuild(){
    const object_keys = Object.keys(userSelections);

    let build_exists = false, price=0;
    object_keys.forEach(key => { if (userSelections[key].product) { build_exists = true; price+=userSelections[key].product.price}});

    if (build_exists)
      return (
        <div className={styles["basket-item"]} id="basket">
          <div className={styles["title-price-wrapper"]}>
            <div>Sestavljen PC</div>
            <div>€{Math.floor(price*100)/100}</div>
          </div>
          {
            object_keys.map(key => {
              const component = userSelections[key];
              if (component.product)
              return (
                <div className={styles["basket-item-name-wrapper"]}>
                  <div></div>
                  <div>{component.product.name}</div>
                </div>
              )
            })
          }
        </div>
      )
    
  }
}

export default Basket;
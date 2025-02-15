import { useEffect, useState, useContext } from 'react';
import styles from './PC_Component.module.scss';
import CheckBoxButton from './filter buttons/CheckBoxButton.js';
import { ProductsContext } from "../context/ProductsContext.js";

function PC_Component({ component }) {
  const [showFilters, setShowfilters] = useState(false);
  const { selectedComponent, setSelectedComponent } = useContext(ProductsContext);
  const { type, name, plural, products, filters } = component;

  useEffect(()=> {
    if (type === selectedComponent.type) {
      setShowfilters(!showFilters);
    } else {
      setShowfilters(false);
    }
  }, [selectedComponent])

  return (
    <div className={styles["main-wrapper"]} style={showFilters && filters.length > 0 ? {marginBottom: filters.length * 33 + 30 + "px"} : {marginBottom: "15px"}}>
      <div className={styles["component-wrapper"]} onClick={()=> setSelectedComponent({type, name, plural})}>
        <div className={styles["img-wrapper"]}> <img src={`/images/${type}.png`} className={styles[type]}/> </div>
        <div className={styles["info-wrapper"]}> 
          <div className={styles["component-name"]}>{name}</div>
          <div className={styles["product-name"]}>{products.length > 1 ? "Izbranih je več opcij" : products.length === 1 ? products[0].name : "Izberi"}</div>
          <div className={styles["product-price"]}>{products.length > 0 ? `€${price()}` : ""}</div>
        </div>
      </div>
      {
        filters.map((filter, i) => <CheckBoxButton label={ filter.name } type={"component-filter"} componentType={type} pushDown={(i+1)*33 + 11 + filters.length} showFilters={showFilters} brandFilter={true}/>)
      }
    </div>
  );

  function price(){
    let price = 0;
    products.forEach(product => price+=product.price)
    return Math.ceil(price*100)/100;
  }
}

export default PC_Component;
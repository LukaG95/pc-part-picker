import { useState, useEffect, useRef, useContext } from 'react';
import styles from './FiltersPhone.module.scss';
import { ProductsContext } from "../context/ProductsContext.js";
import { SelectionContext  } from "../context/SelectionContext.js";
import FilterImage from '../images/filter.png';
import useWindowDimensions from '../misc/WindowDimensions.js';
import SortByButton from './filter buttons/SortByButton';
import CheckBoxButton from './filter buttons/CheckBoxButton';

function FiltersPhone({ z_counter }) {
  const { s_width } = useWindowDimensions();
  const { userSelections } = useContext(SelectionContext);
  const { selectedComponent, setSelectedComponent } = useContext(ProductsContext);

  let filters = [];
  Object.keys(userSelections).map(i => {
    const component = userSelections[i];
    if (component.type === selectedComponent.type)
      filters = component.filters;
    
  })

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

  if (s_width < 1151)
  return (
    <div className={`${styles["dropdown-wrapper"]} ${isOpen ? styles.open : ""}`} ref={dropdownRef}> 

      <div className={styles["filter-button"]} onClick={() => setIsOpen(prev => !prev)} >
        <img src={FilterImage}/>
      </div>

      <div className={styles["dropdown-menu"]} style={{ zIndex: z_counter + 3 }}>
        <div className={styles.title}>
          FILTRI
          <div className={styles["x-button"]} onClick={()=> setIsOpen(false)}></div>
        </div>
        <SortByButton mobile={true}/>
        <div className={styles.spacer}><span></span></div>
        {
          filters.map((filter, i) => <CheckBoxButton label={ filter.name } type={"component-filter"} componentType={selectedComponent.type} pushDown={(i+1)*33 + 11 + filters.length} showFilters={true} brandFilter={true}/>)
        }
        <div className={styles.spacer2}></div>
        <CheckBoxButton label={"Na zalogi"} brandFilter={false} showFilters={true} type={"mobile-component-filter"}/>
      </div>

    </div>
  );

}

export default FiltersPhone;
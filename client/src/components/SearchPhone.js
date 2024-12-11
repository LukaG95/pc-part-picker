import { useState, useEffect, useRef, useContext } from 'react';
import styles from './SearchPhone.module.scss';
import { ProductsContext } from "../context/ProductsContext.js";
import { SelectionContext  } from "../context/SelectionContext.js";
import SearchImage from '../images/search.png';
import useWindowDimensions from '../misc/WindowDimensions.js';

function SearchPhone({ z_counter }) {
  const { s_width } = useWindowDimensions();
  const { searchText, setSearchText } = useContext(ProductsContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {

  };

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
    <div className={`${styles["dropdown-wrapper"]} ${isOpen ? styles.open : ""}`} ref={dropdownRef} value={searchText} onChange={e => setSearchText(e.target.value)}> 

      <div className={styles["search-button"]} onClick={() => setIsOpen((prev) => !prev)}>
        <img src={SearchImage}/>
      </div>

      <div className={styles["dropdown-menu"]} style={{ zIndex: z_counter + 2 }}>

        <input className={styles.search} placeholder="išči izdelke..." type="text"/>
      </div>

    </div>
  );

}

export default SearchPhone;
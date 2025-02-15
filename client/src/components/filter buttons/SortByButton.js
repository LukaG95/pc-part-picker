import { useState, useEffect, useRef, useContext } from 'react';
import styles from './SortByButton.module.scss';
import { ProductsContext } from "../../context/ProductsContext.js";

function SortByButton({ mobile }) {
  const { setSortBy } = useContext(ProductsContext);

  const options = [
    { label: "Po ceni padajoče", value: "price_desc" },
    { label: "Po ceni naraščajoče", value: "price_asc" },
    { label: "Po popularnosti", value: "popularity" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option.label);
    setSortBy(option.value);
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

  return (
    <div onClick={() => setIsOpen(prev => !prev)} className={`${styles["dropdown-wrapper"]} ${isOpen ? styles.open : ""} ${mobile ? styles.mobile : ""}`} ref={dropdownRef}> 
      <div className={styles.shader}>
        <label>{selectedOption}</label>
        <div className={styles.triangle}></div>
      </div>
        <div className={styles["dropdown-menu"]}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles["dropdown-item"]}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
    </div>
  );
}

export default SortByButton;
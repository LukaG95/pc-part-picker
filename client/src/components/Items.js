import { useRef, useState, useEffect, useContext } from 'react';
import styles from './Items.module.scss';
import SortByButton from './filter buttons/SortByButton';
import CheckBoxButton from './filter buttons/CheckBoxButton';
import Product from './Product.js';
import useWindowDimensions from '../misc/WindowDimensions.js';
import { ProductsContext } from "../context/ProductsContext.js";

function Items({ z_counter, setZ_counter}) {
  const { s_width } = useWindowDimensions();
  const [showSpace, setShowSpace] = useState(false);
  const itemsRef = useRef(null);
  const { products, selectedComponent, searchText, setSearchText } = useContext(ProductsContext);

  useEffect(() => {
    // this if for the bottom part of the items (the .space)
    const handleScroll = () => {
      const items = itemsRef.current;
      if (!items) return;

      const scrollTop = items.scrollTop;
      const scrollHeight = items.scrollHeight;
      const clientHeight = items.clientHeight;

      // Calculate scroll percentage
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      // Check if container is scrollable (overflowing)
      const isScrollable = scrollHeight > clientHeight;

      // Show `.space` if scrolled 98.5% or if items container is not overflowing
      setShowSpace((scrollPercentage >= 98.5 || !isScrollable) && s_width >= 1150);
    };

    const items = itemsRef.current;
    items.addEventListener('scroll', handleScroll);

    // Initial check for whether `.items` is scrollable or not
    handleScroll();

    // Cleanup the event listener on component unmount
    return () => {
      items.removeEventListener('scroll', handleScroll);
    };
  }, [s_width]);

  return (
    <div className={styles["main-wrapper"]}>
      <div
        className={`${styles["top-search-wrapper"]} ${styles["hide-on-mobile"]}`}
        style={{ zIndex: z_counter + 1 }}
      >
        <input
          className={styles.search}
          placeholder="Išči izdelke..."
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <CheckBoxButton label="Na zalogi" />
        <SortByButton />
      </div>

      <div ref={itemsRef} className={styles.items}>
        <div className={`${styles.space2} ${styles["hide-on-mobile"]}`}>
          {selectedComponent.plural.toUpperCase()}
          <span>{products?.length} artiklov</span>
        </div>

        {products?.map((item) => (
          <Product
            key={item.id}
            product={item}
            z_counter={z_counter}
            setZ_counter={setZ_counter}
          />
        ))}
      </div>

      {/* Extra Space if Needed */}
      {showSpace && <div className={styles.space}></div>}
    </div>
  );
}

export default Items;
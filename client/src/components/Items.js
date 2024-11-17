import { useRef, useState, useEffect } from 'react';
import styles from './Items.module.scss';
import SortByButton from './filters/SortByButton';
import InStockButton from './filters/InStockButton';
import Product from './Product.js';
import stock from '../assets/stock.js';

function Items(props) {
  const [showSpace, setShowSpace] = useState(false);
  const [z_counter, setZ_counter] = useState(3);
  const itemsRef = useRef(null);

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
      setShowSpace(scrollPercentage >= 98.5 || !isScrollable);
    };

    const items = itemsRef.current;
    items.addEventListener('scroll', handleScroll);

    // Initial check for whether `.items` is scrollable or not
    handleScroll();

    // Cleanup the event listener on component unmount
    return () => {
      items.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles["top-search-wrapper"]} style={{zIndex: z_counter}}>
        <input className={styles.search} placeholder="išči..." type="text"/>
        <InStockButton />
        <SortByButton />
      </div>

      <div ref={itemsRef} className={styles["items"]}>
      
        {
          stock.map(item => <Product key={item.id} stock_item={item} z_counter={z_counter} setZ_counter={setZ_counter} />)
        }
      </div>

      {showSpace && <div className={styles["space"]}></div>}
    </div>
  );
}

export default Items;
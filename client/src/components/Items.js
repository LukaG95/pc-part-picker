import { useRef, useState, useEffect } from 'react';
import styles from './Items.module.scss';
import SortByButton from './filters/SortByButton';
import InStockButton from './filters/InStockButton';
import Product from './Product.js';
import stock from '../assets/stock.js';

import cpu from '../assets/products/cpu.json';
import gpu from '../assets/products/gpu.json';
import psu from '../assets/products/psu.json';
import motherboard from '../assets/products/motherboard.json';
import desktop_case from '../assets/products/case.json';
import storage from '../assets/products/storage.json';
import service from '../assets/products/service.json';

function Items({ selectedComponent }) {
  const [showSpace, setShowSpace] = useState(false);
  const [z_counter, setZ_counter] = useState(3);
  const itemsRef = useRef(null);

  const hard_info = [...cpu, ...gpu, ...storage, ...psu, ...motherboard, ...desktop_case, ...service];
  
  // combination of hard_info and stock
  const combinedData = hard_info.map(product => {
    const stockInfo = stock.find(item => item.id === product.id) || {};
    return {
      ...product,
      ...stockInfo
    };
  });

  const [products, setProducts] = useState(combinedData.filter(item => item.type === selectedComponent.type));
  
  useEffect(()=> {
    setProducts(combinedData.filter(item => item.type === selectedComponent.type))
  }, [selectedComponent])

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

      <div className={styles["top-search-wrapper"]} style={{zIndex: z_counter+1}}>
        <input className={styles.search} placeholder="išči..." type="text"/>
        <InStockButton />
        <SortByButton />
      </div>
    
      <div ref={itemsRef} className={styles["items"]}>

        <div className={styles["space2"]}>{selectedComponent.name}<span>&nbsp;&nbsp;({products.length}x)</span></div>

        {
          products.map(item => <Product key={item.id} product={item} z_counter={z_counter} setZ_counter={setZ_counter} />)
        }

      </div>

      { showSpace && <div className={styles["space"]}></div> }
    </div>
  );

}

export default Items;
import React, { useState, useEffect } from "react";
import axios from "axios";
import route from '../misc/route';

import stock from '../assets/stock.js';

import cpu from '../assets/products/cpu.json';
import gpu from '../assets/products/gpu.json';
import psu from '../assets/products/psu.json';
import motherboard from '../assets/products/motherboard.json';
import desktop_case from '../assets/products/case.json';
import storage from '../assets/products/storage.json';
import service from '../assets/products/service.json';

const ProductsContext = React.createContext();

function ProductsContextProvider({ children }) {
  const [inStock, setInStock] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState({type: "cpu", name: "Procesor", plural: "Procesorji"});
  const [sortBy, setSortBy] = useState("popularity");
  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState("");

  const hard_info = [...cpu, ...gpu, ...storage, ...psu, ...motherboard, ...desktop_case, ...service];
  
  // combination of hard_info and stock
  const combinedData = hard_info.map(product => {
    const stockInfo = stock.find(item => item.id === product.id) || {};
    return {
      ...product,
      ...stockInfo
    };
  });
  
  const [products, setProducts] = useState();

  useEffect(()=> {
    setBrands([]);
  }, [ selectedComponent ])

  useEffect(() => {
    let filteredProducts = combinedData;

    // filter by component type
    filteredProducts = combinedData.filter(item => item.type === selectedComponent.type)

    // filter by "in stock"
    if (inStock) filteredProducts = filteredProducts.filter(product => product.stock > 0)

    // filter by "sort by"
    if (sortBy === "popularity") filteredProducts = sortByPopularity(filteredProducts);
    if (sortBy === "price_desc") filteredProducts = sortByPriceDesc(filteredProducts);
    if (sortBy === "price_asc") filteredProducts = sortByPriceAsc(filteredProducts);

    // filter by brand
    if (brands.length > 0) filteredProducts = filteredProducts.filter(product => brands.includes(product.brand))

    // filter by search text
    if (searchText) {
      const searchTokens = searchText.toLowerCase().split(/\s+/); // Split search text into tokens
    
      filteredProducts = filteredProducts.filter((product) => {
        const combinedFields = `${product.name} ${product.description} ${product.brand}`.toLowerCase();
    
        // Check if all search tokens are found in the combined product fields
        return searchTokens.every((token) => combinedFields.includes(token));
      });
    }

    setProducts(filteredProducts);

  }, [inStock, selectedComponent, sortBy, brands, searchText]);

  const sortByPopularity = (products) => {
    return [...products].sort((a, b) => b.popularity - a.popularity);
  };

  const sortByPriceDesc = (products) => {
    return [...products].sort((a, b) => b.price - a.price);
  };

  const sortByPriceAsc = (products) => {
    return [...products].sort((a, b) => a.price - b.price);
  };

  function addOrRemoveBrand(brand) {
    setBrands((prevArray) => {
      if (prevArray.includes(brand)) {
        return prevArray.filter((item) => item !== brand);
      } else {
        return [...prevArray, brand];
      }
    });
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        setInStock,
        selectedComponent,
        setSelectedComponent,
        setSortBy,
        addOrRemoveBrand,
        setSearchText,
        combinedData
      }}
    >
      {children}
    </ProductsContext.Provider>
  );


}



export { ProductsContextProvider, ProductsContext };
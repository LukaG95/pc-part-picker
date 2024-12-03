import React, { createContext, useContext, useState } from 'react';
import { components } from "../assets/configurator.js";

const SelectionContext = createContext();

function SelectionProvider({ children }) {
  const [userSelections, setUserSelections] = useState(components);

  const updateSelection = (product, remove) => {
    setUserSelections((prev) => {
      const updatedSelections = { ...prev };
    
      const currentProducts = updatedSelections[product.type].products;
    
      if (remove) {
        // Remove the product (if present) from the array
        updatedSelections[product.type].products = currentProducts.filter(
          (item) => item.id !== product.id
        );
      } else {
        if (product.type === "services") {
          // Allow multiple services but prevent duplicate additions
          const isProductAlreadyAdded = currentProducts.some(
            (item) => item.id === product.id
          );
    
          if (!isProductAlreadyAdded) {
            updatedSelections[product.type].products = [...currentProducts, product];
          }
        } else {
          // Replace any existing product with the new one
          updatedSelections[product.type].products = [product];
        }
      }
    
      return updatedSelections;
    });
  };
  

  return (
    <SelectionContext.Provider value={{ userSelections, updateSelection }}>
      {children}
    </SelectionContext.Provider>
  );
}

export { SelectionProvider, SelectionContext };
import React, { createContext, useContext, useState } from 'react';
import { components } from "../assets/configurator.js";

const SelectionContext = createContext();

function SelectionProvider({ children }) {
  const [userSelections, setUserSelections] = useState(components);

  const updateSelection = (product, remove) => {
    setUserSelections(prev => {
      const updatedSelections = { ...prev };
  
      if (remove) delete updatedSelections[product.type].product;
      else {
        updatedSelections[product.type] = {
          ...prev[product.type], 
          product: product,      
        };
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
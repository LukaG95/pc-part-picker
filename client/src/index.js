import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from "./context/UserContext";
import { SelectionProvider } from "./context/SelectionContext";
import { ProductsContextProvider } from "./context/ProductsContext";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <SelectionProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </SelectionProvider>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

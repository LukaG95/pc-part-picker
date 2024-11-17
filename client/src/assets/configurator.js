const brandFilter = (products, brand) => products.filter(product => product.brand === brand);
const priceFilter = (products, minPrice, maxPrice) => products.filter(product => product.price >= minPrice && product.price <= maxPrice);

export const components = {
  cpu: {
    type: "cpu",
    name: "Procesor",
    filters: [
      { type: "checkbox", name: "AMD", applyFilter: (products) => brandFilter(products, "AMD") },
      { type: "checkbox", name: "Intel", applyFilter: (products) => brandFilter(products, "Intel") },
    ],
  },
  gpu: {
    type: "gpu",
    name: "Grafična kartica",
    filters: [
      { type: "checkbox", name: "Nvidia", applyFilter: (products) => brandFilter(products, "Nvidia") },
      { type: "checkbox", name: "AMD", applyFilter: (products) => brandFilter(products, "AMD") },
    ],
  },
  storage: {
    type: "storage",
    name: "Shramba",
    filters: [
      
    ],
  },
  psu: {
    type: "psu",
    name: "Napajalnik",
    filters: [
      
    ],
  },
  case: {
    type: "case",
    name: "Ohišje",
    filters: [
      
    ],
  },
  motherboard: {
    type: "motherboard",
    name: "Matična plošča",
    filters: [
      
    ],
  },
  services: {
    type: "services",
    name: "Dodatne storitve",
    filters: [
      
    ],
  },
  
}; 
const brandFilter = (products, brand) => products.filter(product => product.brand === brand);
const priceFilter = (products, minPrice, maxPrice) => products.filter(product => product.price >= minPrice && product.price <= maxPrice);

export const components = {
  cpu: {
    type: "cpu",
    name: "Procesor",
    plural: "Procesorji",
    filters: [
      { type: "checkbox", name: "AMD", applyFilter: (products) => brandFilter(products, "AMD") },
      { type: "checkbox", name: "Intel", applyFilter: (products) => brandFilter(products, "Intel") },
    ],
    products: []
  },
  gpu: {
    type: "gpu",
    name: "Grafična kartica",
    plural: "Grafične kartice",
    filters: [
      { type: "checkbox", name: "NVIDIA", applyFilter: (products) => brandFilter(products, "NVIDIA") },
      { type: "checkbox", name: "AMD", applyFilter: (products) => brandFilter(products, "AMD") }
    ],
    products: []
  },
  storage: {
    type: "storage",
    name: "Shramba",
    plural: "Shramba",
    filters: [
      { type: "checkbox", name: "Samsung", applyFilter: (products) => brandFilter(products, "Samsung") },
      { type: "checkbox", name: "Western Digital", applyFilter: (products) => brandFilter(products, "Western Digital") },
      { type: "checkbox", name: "Seagate", applyFilter: (products) => brandFilter(products, "Seagate") },
      { type: "checkbox", name: "Crucial", applyFilter: (products) => brandFilter(products, "Crucial") }
    ],
    products: []
  },
  psu: {
    type: "psu",
    name: "Napajalnik",
    plural: "Napajalniki",
    filters: [
      { type: "checkbox", name: "Corsair", applyFilter: (products) => brandFilter(products, "Corsair") },
      { type: "checkbox", name: "Seasonic", applyFilter: (products) => brandFilter(products, "Seasonic") },
      { type: "checkbox", name: "EVGA", applyFilter: (products) => brandFilter(products, "EVGA") },
      { type: "checkbox", name: "Cooler Master", applyFilter: (products) => brandFilter(products, "Cooler Master") }
    ],
    products: []
  },
  case: {
    type: "case",
    name: "Ohišje",
    plural: "Ohišja",
    filters: [
      { type: "checkbox", name: "NZXT", applyFilter: (products) => brandFilter(products, "NZXT") },
      { type: "checkbox", name: "Corsair", applyFilter: (products) => brandFilter(products, "Corsair") },
      { type: "checkbox", name: "Cooler Master", applyFilter: (products) => brandFilter(products, "Cooler Master") },
      { type: "checkbox", name: "Lian Li", applyFilter: (products) => brandFilter(products, "Lian Li") }
    ],
    products: []
  },
  motherboard: {
    type: "motherboard",
    name: "Matična plošča",
    plural: "Matične plošče",
    filters: [
      { type: "checkbox", name: "ASUS", applyFilter: (products) => brandFilter(products, "ASUS") },
      { type: "checkbox", name: "MSI", applyFilter: (products) => brandFilter(products, "MSI") },
      { type: "checkbox", name: "Gigabyte", applyFilter: (products) => brandFilter(products, "Gigabyte") },
      { type: "checkbox", name: "ASRock", applyFilter: (products) => brandFilter(products, "ASRock") }
    ],
    products: []
  },
  services: {
    type: "services",
    name: "Dodatne storitve",
    plural: "Dodatne storitve",
    filters: [
      
    ],
    products: []
  },
  
}; 
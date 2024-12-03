const stockData = [

  // cpu
  { id: 1, stock: 15, location: "Na zalogi", isNew: true, price: 629.99, regular_price: 629.99, discount: null },
  { id: 2, stock: 0, location: "Pri dobavitelju", isNew: true, price: 809.99, regular_price: 899.99, discount: 10 },
  { id: 3, stock: 5, location: "Na zalogi", isNew: false, price: 1099.99, regular_price: 1099.99, discount: null },
  { id: 4, stock: 20, location: "Na zalogi", isNew: true, price: 249.99, regular_price: 249.99, discount: null },
  { id: 5, stock: 0, location: "Pri dobavitelju", isNew: true, price: 424.99, regular_price: 499.99, discount: 15 },
  { id: 6, stock: 8, location: "Na zalogi", isNew: false, price: 389.99, regular_price: 389.99, discount: null },
  { id: 7, stock: 12, location: "Na zalogi", isNew: true, price: 575.99, regular_price: 719.99, discount: 20 },
  { id: 8, stock: 0, location: "Pri dobavitelju", isNew: true, price: 189.99, regular_price: 189.99, discount: null },
  { id: 9, stock: 25, location: "Na zalogi", isNew: false, price: 139.99, regular_price: 139.99, discount: null },
  { id: 10, stock: 0, location: "Ni na zalogi", isNew: true, price: 1399.99, regular_price: 1399.99, discount: null },
  { id: 11, stock: 14, location: "Na zalogi", isNew: true, price: 712.49, regular_price: 749.99, discount: 5 },
  { id: 12, stock: 0, location: "Pri dobavitelju", isNew: true, price: 279.99, regular_price: 279.99, discount: null },
  { id: 13, stock: 2, location: "Na zalogi", isNew: true, price: 2049.99, regular_price: 599.99, discount: 70 },
  { id: 14, stock: 16, location: "Na zalogi", isNew: false, price: 119.99, regular_price: 119.99, discount: null },
  { id: 15, stock: 0, location: "Pri dobavitelju", isNew: true, price: 429.99, regular_price: 429.99, discount: null },
  { id: 16, stock: 7, location: "Na zalogi", isNew: false, price: 179.99, regular_price: 199.99, discount: 10 },
  { id: 17, stock: 0, location: "Ni na zalogi", isNew: true, price: 449.99, regular_price: 599.99, discount: 25 },
  { id: 18, stock: 12, location: "Na zalogi", isNew: true, price: 99.99, regular_price: 99.99, discount: null },
  { id: 19, stock: 30, location: "Na zalogi", isNew: true, price: 209.99, regular_price: 209.99, discount: null },
  { id: 20, stock: 0, location: "Pri dobavitelju", isNew: true, price: 237.99, regular_price: 279.99, discount: 15 },
  { id: 21, stock: 0, location: "Ni na zalogi", isNew: true, price: 1129.99, regular_price: 1129.99, discount: null },
  { id: 22, stock: 25, location: "Na zalogi", isNew: true, price: 519.99, regular_price: 649.99, discount: 20 },
  { id: 23, stock: 0, location: "Pri dobavitelju", isNew: true, price: 329.99, regular_price: 329.99, discount: null },
  { id: 24, stock: 6, location: "Na zalogi", isNew: true, price: 299.99, regular_price: 299.99, discount: null },
  { id: 25, stock: 0, location: "Ni na zalogi", isNew: true, price: 314.99, regular_price: 449.99, discount: 30 },
  { id: 26, stock: 4, location: "Na zalogi", isNew: false, price: 849.99, regular_price: 849.99, discount: null },
  { id: 27, stock: 0, location: "Pri dobavitelju", isNew: true, price: 99.99, regular_price: 99.99, discount: null },
  { id: 28, stock: 8, location: "Na zalogi", isNew: true, price: 413.99, regular_price: 459.99, discount: 10 },
  { id: 29, stock: 0, location: "Pri dobavitelju", isNew: true, price: 299.99, regular_price: 299.99, discount: null },
  { id: 30, stock: 13, location: "Na zalogi", isNew: false, price: 611.99, regular_price: 679.99, discount: null },
  { id: 31, stock: 0, location: "Ni na zalogi", isNew: true, price: 1479.99, regular_price: 1479.99, discount: null },
  { id: 32, stock: 17, location: "Na zalogi", isNew: true, price: 179.99, regular_price: 179.99, discount: null },
  { id: 33, stock: 0, location: "Pri dobavitelju", isNew: true, price: 169.99, regular_price: 169.99, discount: null },
  { id: 34, stock: 20, location: "Na zalogi", isNew: true, price: 289.99, regular_price: 289.99, discount: null },
  { id: 35, stock: 11, location: "Na zalogi", isNew: true, price: 731.49, regular_price: 769.99, discount: 5 },
  { id: 36, stock: 0, location: "Pri dobavitelju", isNew: true, price: 239.99, regular_price: 239.99, discount: null },
  { id: 37, stock: 5, location: "Na zalogi", isNew: true, price: 449.99, regular_price: 529.99, discount: 15 },
  { id: 38, stock: 8, location: "Na zalogi", isNew: true, price: 314.99, regular_price: 349.99, discount: null },
  { id: 39, stock: 0, location: "Pri dobavitelju", isNew: true, price: 80.99, regular_price: 89.99, discount: 10 },
  { id: 40, stock: 16, location: "Na zalogi", isNew: true, price: 439.99, regular_price: 439.99, discount: null },

  // gpu
  { id: 41, stock: 8, location: "Na zalogi", isNew: true, price: 1799.99, regular_price: 1999.99, discount: 10 },
  { id: 42, stock: 0, location: "Pri dobavitelju", isNew: true, price: 949.99, regular_price: 1049.99, discount: 10 },
  { id: 43, stock: 20, location: "Na zalogi", isNew: false, price: 479.99, regular_price: 519.99, discount: 8 },
  { id: 44, stock: 0, location: "Pri dobavitelju", isNew: false, price: 339.99, regular_price: 359.99, discount: 5 },

  // storage
  { id: 45, stock: 25, location: "Na zalogi", isNew: true, price: 149.99, regular_price: 179.99, discount: 17 },
  { id: 46, stock: 0, location: "Pri dobavitelju", isNew: true, price: 299.99, regular_price: 329.99, discount: 9 },
  { id: 47, stock: 40, location: "Na zalogi", isNew: false, price: 89.99, regular_price: 99.99, discount: 10 },
  { id: 48, stock: 30, location: "Na zalogi", isNew: false, price: 94.99, regular_price: 109.99, discount: 13 },

  // psu
  { id: 45, stock: 10, location: "Na zalogi", isNew: true, price: 149.99, regular_price: 169.99, discount: 12 },
  { id: 46, stock: 0, location: "Pri dobavitelju", isNew: true, price: 129.99, regular_price: 149.99, discount: 13 },
  { id: 47, stock: 5, location: "Na zalogi", isNew: false, price: 199.99, regular_price: 229.99, discount: 13 },
  { id: 48, stock: 0, location: "Pri dobavitelju", isNew: false, price: 79.99, regular_price: 89.99, discount: 11 },

  // motherboards
  { id: 49, stock: 8, location: "Na zalogi", isNew: true, price: 399.99, regular_price: 439.99, discount: 9 },
  { id: 50, stock: 0, location: "Pri dobavitelju", isNew: true, price: 219.99, regular_price: 249.99, discount: 12 },
  { id: 51, stock: 10, location: "Na zalogi", isNew: false, price: 189.99, regular_price: 209.99, discount: 10 },
  { id: 52, stock: 25, location: "Na zalogi", isNew: false, price: 99.99, regular_price: 119.99, discount: 16 },
  
  // cases
  { id: 53, stock: 20, location: "Na zalogi", isNew: true, price: 159.99, regular_price: 179.99, discount: 11 },
  { id: 54, stock: 0, location: "Pri dobavitelju", isNew: true, price: 139.99, regular_price: 159.99, discount: 13 },
  { id: 55, stock: 10, location: "Na zalogi", isNew: false, price: 99.99, regular_price: 109.99, discount: 9 },
  { id: 56, stock: 8, location: "Na zalogi", isNew: false, price: 139.99, regular_price: 149.99, discount: 7 },

  // services
  { id: 57, stock: 1, location: "Na zalogi", isNew: true, price: 0, regular_price: 20, discount: 100 },
  { id: 58, stock: 1, location: "Na zalogi", isNew: true, price: 9.99, regular_price: 9.99, dicount: null},
  { id: 59, stock: 1, location: "Na zalogi", isNew: true, price: 29.99, regular_price: 29.99, discount: null },
  { id: 60, stock: 1, location: "Na zalogi", isNew: true, price: 19.99, regular_price: 19.99, discount: null }

];





export default stockData;

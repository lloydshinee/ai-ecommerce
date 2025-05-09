export type Product = {
  name: string;
  description: string;
  category: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imageUrl: string;
  brand?: string;
  color?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export const products: Product[] = [
  {
    name: "Branded Shoes",
    description: "High-performance branded athletic shoes.",
    category: "Footwear",
    price: 120,
    discountedPrice: 95,
    quantity: 20,
    imageUrl: "/products/branded shoes.jpg",
    brand: "Nike",
    color: "Red & Blue",
  },
  {
    name: "Branded Cap",
    description: "Stylish branded baseball cap.",
    category: "Accessories",
    price: 30,
    discountedPrice: 25,
    quantity: 50,
    imageUrl: "/products/cap branded.jpg",
    brand: "New Era",
    color: "Gray",
  },
  {
    name: "Sandals",
    description: "Comfortable leather sandals perfect for casual wear.",
    category: "Footwear",
    price: 45,
    discountedPrice: 39,
    quantity: 35,
    imageUrl: "/products/sandals.jpg",
    color: "Brown",
  },
  {
    name: "Green High Heels",
    description: "Elegant green high heels for formal events.",
    category: "Footwear",
    price: 100,
    discountedPrice: 85,
    quantity: 15,
    imageUrl: "/products/shoes green.jpg",
    color: "Green",
  },
  {
    name: "Black T-Shirt",
    description: "Plain black t-shirt made of 100% cotton.",
    category: "Apparel",
    price: 25,
    discountedPrice: 20,
    quantity: 60,
    imageUrl: "/products/t shirt black.jpg",
    color: "Black",
  },
  {
    name: "White T-Shirt",
    description: "Classic white t-shirt, breathable and stylish.",
    category: "Apparel",
    price: 25,
    discountedPrice: 20,
    quantity: 60,
    imageUrl: "/products/thsirt white.jpg",
    color: "White",
  },
  {
    name: "Gold Watch",
    description: "Luxury gold wristwatch with a sleek design.",
    category: "Accessories",
    price: 250,
    discountedPrice: 199,
    quantity: 10,
    imageUrl: "/products/watch gold.jpg",
    color: "Gold",
  },
];

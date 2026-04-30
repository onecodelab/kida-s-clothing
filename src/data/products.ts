export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
}

export const products: Product[] = [
  { 
    id: 1, 
    name: "Authentic Habesha Kemis", 
    price: "18,500 ETB", 
    description: "Hand-woven from the finest Ethiopian cotton, this traditional Habesha Kemis features intricate 'Tilet' embroidery in vibrant purple and gold. A masterpiece of Ethiopian heritage, perfect for weddings and special ceremonies.",
    images: ["/p1.png", "/p4.png", "/p5.png"], 
    colors: ['#FFFFFF', '#8E44AD', '#F1C40F'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 2, 
    name: "Men's Habesha Shirt, Classic", 
    price: "11,200 ETB", 
    description: "A modern take on traditional Ethiopian men's attire. This crisp white shirt features vertical Tilet patterns along the placket and cuffs. Elegant, comfortable, and breathable.",
    images: ["/p2.png", "/p1.png", "/p4.png"], 
    colors: ['#FFFFFF', '#34495E'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  { 
    id: 3, 
    name: "Modern Red-Belt Dress", 
    price: "16,800 ETB", 
    description: "A chic fusion of traditional embroidery and modern silhouette. Features a striking red embroidered belt that accentuates the waist. Hand-crafted with passion in Addis Ababa.",
    images: ["/p3.png", "/p5.png", "/p1.png"], 
    colors: ['#FFFFFF', '#C0392B'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  { 
    id: 4, 
    name: "Emerald Habesha Gown", 
    price: "19,500 ETB", 
    description: "Turn heads in this stunning emerald green Habesha gown. The intricate gold and green Tilet work represent growth and prosperity. A truly regal piece for the modern Ethiopian woman.",
    images: ["/p4.png", "/p1.png", "/p2.png"], 
    colors: ['#FFFFFF', '#27AE60', '#F1C40F'],
    sizes: ['S', 'M', 'L']
  },
  { 
    id: 5, 
    name: "Golden Tilet Dress", 
    price: "17,400 ETB", 
    description: "Luxurious white cotton adorned with royal gold Tilet embroidery. This dress embodies the sunny warmth of Ethiopian hospitality. Lightweight yet deeply traditional.",
    images: ["/p5.png", "/p3.png", "/p4.png"], 
    colors: ['#FFFFFF', '#F1C40F'],
    sizes: ['S', 'M', 'L', 'XL']
  },
]

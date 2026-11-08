export type CategoryId =
  | 'fruits'
  | 'oil'
  | 'meat'
  | 'bakery'
  | 'dairy'
  | 'beverages'
  | 'groceries';

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  emoji: string;
  /** Optional remote image. If set, it is shown instead of the emoji. */
  image?: string;
  category: CategoryId;
  description: string;
  tags?: Array<'exclusive' | 'bestSelling' | 'grocery'>;
}

export interface Category {
  id: CategoryId;
  title: string;
  emoji: string;
  background: string;
  border: string;
}

export const categories: Category[] = [
  { id: 'fruits', title: 'Fresh Fruits\n& Vegetable', emoji: '🥬', background: '#EEF7F1', border: '#53B17580' },
  { id: 'oil', title: 'Cooking Oil\n& Ghee', emoji: '🫒', background: '#FEF6ED', border: '#F8A44C80' },
  { id: 'meat', title: 'Meat & Fish', emoji: '🥩', background: '#FDE8E4', border: '#F7A59380' },
  { id: 'bakery', title: 'Bakery & Snacks', emoji: '🥐', background: '#F4EBF7', border: '#D3B0E080' },
  { id: 'dairy', title: 'Dairy & Eggs', emoji: '🥚', background: '#FFF8E5', border: '#FDE59880' },
  { id: 'beverages', title: 'Beverages', emoji: '🥤', background: '#EDF7FC', border: '#B7DFF580' },
];

export const groceryTypes = [
  { id: 'pulses', title: 'Pulses', emoji: '🫘', background: '#FEF1E4' },
  { id: 'rice', title: 'Rice', emoji: '🍚', background: '#E5F3EA' },
  { id: 'spices', title: 'Spices', emoji: '🌶️', background: '#FDE8E4' },
];

export const products: Product[] = [
  {
    id: 'banana',
    name: 'Organic Bananas',
    unit: '7pcs, Price',
    price: 4.99,
    emoji: '🍌',
    category: 'fruits',
    tags: ['exclusive'],
    description:
      'Bananas are nutritious. They are a good source of fiber, potassium, vitamin B6 and vitamin C.',
  },
  {
    id: 'apple',
    name: 'Naturel Red Apple',
    unit: '1kg, Price',
    price: 4.99,
    emoji: '🍎',
    category: 'fruits',
    tags: ['exclusive'],
    description:
      'Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart. As part of a healthful and varied diet.',
  },
  {
    id: 'pepper',
    name: 'Red Pepper',
    unit: '1kg, Price',
    price: 4.99,
    emoji: '🫑',
    category: 'fruits',
    tags: ['bestSelling'],
    description: 'Fresh bell pepper, crunchy and sweet. Rich in vitamin C and antioxidants.',
  },
  {
    id: 'ginger',
    name: 'Ginger',
    unit: '250gm, Price',
    price: 3.99,
    emoji: '🫚',
    category: 'fruits',
    tags: ['bestSelling'],
    description: 'Fresh ginger root with a warm, spicy flavor. Great for tea and cooking.',
  },
  {
    id: 'beef',
    name: 'Beef Bone',
    unit: '1kg, Price',
    price: 4.99,
    emoji: '🥩',
    category: 'meat',
    tags: ['grocery'],
    description: 'Fresh beef bones, perfect for soups and broths.',
  },
  {
    id: 'chicken',
    name: 'Broiler Chicken',
    unit: '1kg, Price',
    price: 4.99,
    emoji: '🍗',
    category: 'meat',
    tags: ['grocery'],
    description: 'Farm fresh broiler chicken, cleaned and ready to cook.',
  },
  {
    id: 'diet-cola',
    name: 'Diet Cola',
    unit: '355ml, Price',
    price: 1.99,
    emoji: '🥫',
    category: 'beverages',
    description: 'Refreshing sugar-free cola drink.',
  },
  {
    id: 'lemon-soda',
    name: 'Lemon Soda Can',
    unit: '325ml, Price',
    price: 1.5,
    emoji: '🧃',
    category: 'beverages',
    description: 'Crisp lemon-lime sparkling soda.',
  },
  {
    id: 'apple-grape',
    name: 'Apple & Grape Juice',
    unit: '2L, Price',
    price: 15.99,
    emoji: '🍇',
    category: 'beverages',
    description: 'A sweet blend of apple and grape juice.',
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    unit: '2L, Price',
    price: 15.99,
    emoji: '🍊',
    category: 'beverages',
    description: '100% squeezed orange juice, no added sugar.',
  },
  {
    id: 'cola-can',
    name: 'Cola Can',
    unit: '325ml, Price',
    price: 4.99,
    emoji: '🥤',
    category: 'beverages',
    description: 'Classic cola in a convenient can.',
  },
  {
    id: 'classic-soda',
    name: 'Classic Soda Can',
    unit: '330ml, Price',
    price: 4.99,
    emoji: '🧋',
    category: 'beverages',
    description: 'Sparkling soft drink with a bold taste.',
  },
  {
    id: 'egg-red',
    name: 'Egg Chicken Red',
    unit: '4pcs, Price',
    price: 1.99,
    emoji: '🥚',
    category: 'dairy',
    description: 'Farm fresh brown chicken eggs.',
  },
  {
    id: 'egg-white',
    name: 'Egg Chicken White',
    unit: '180g, Price',
    price: 1.5,
    emoji: '🍳',
    category: 'dairy',
    description: 'Fresh white chicken eggs.',
  },
  {
    id: 'egg-pasta',
    name: 'Egg Pasta',
    unit: '30gm, Price',
    price: 15.99,
    emoji: '🍝',
    category: 'bakery',
    description: 'Italian egg pasta made with durum wheat.',
  },
  {
    id: 'egg-noodles',
    name: 'Egg Noodles',
    unit: '2L, Price',
    price: 15.99,
    emoji: '🍜',
    category: 'bakery',
    description: 'Quick-cooking egg noodles.',
  },
  {
    id: 'mayonnaise',
    name: 'Mayonnais Eggless',
    unit: '325ml, Price',
    price: 4.99,
    emoji: '🫙',
    category: 'oil',
    description: 'Creamy eggless mayonnaise.',
  },
  {
    id: 'egg-noodles-2',
    name: 'Egg Noodles',
    unit: '330ml, Price',
    price: 4.99,
    emoji: '🍲',
    category: 'bakery',
    description: 'Wholegrain egg noodles.',
  },
  {
    id: 'sunflower-oil',
    name: 'Sunflower Oil',
    unit: '1L, Price',
    price: 6.49,
    emoji: '🌻',
    category: 'oil',
    description: 'Refined sunflower cooking oil.',
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    unit: '2pcs, Price',
    price: 2.99,
    emoji: '🥐',
    category: 'bakery',
    description: 'Freshly baked butter croissants.',
  },
  {
    id: 'salmon',
    name: 'Fresh Salmon',
    unit: '500g, Price',
    price: 12.99,
    emoji: '🐟',
    category: 'meat',
    description: 'Atlantic salmon fillet, rich in omega-3.',
  },
  {
    id: 'milk',
    name: 'Fresh Milk',
    unit: '1L, Price',
    price: 1.29,
    emoji: '🥛',
    category: 'dairy',
    description: 'Whole pasteurized cow milk.',
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byTag = (tag: NonNullable<Product['tags']>[number]) =>
  products.filter((p) => p.tags?.includes(tag));
export const byCategory = (id: CategoryId) => products.filter((p) => p.category === id);
export const formatPrice = (value: number) => `$${value.toFixed(2)}`;
